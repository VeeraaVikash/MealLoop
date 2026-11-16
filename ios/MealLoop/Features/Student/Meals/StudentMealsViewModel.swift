import Foundation
import Observation

/// The Meals tab: a week strip, four meals and the menu of the one picked. Screen state only; the menu, its layout and
/// whether it is published all come from `StudentMealsRepository`.
@MainActor
@Observable
final class StudentMealsViewModel {
    private(set) var week: StudentWeek?
    private(set) var selectedDay: Date?
    private(set) var selectedSlot: MealSlot = .lunch
    private(set) var state: LoadState<StudentMealMenu> = .idle
    /// The day's other meals, kept so "Dinner opens 7:30 PM" can be said without asking again.
    private(set) var dayMenus: [MealSlot: StudentMealMenu] = [:]

    /// Today's meals as the mess runs them: the same `MealStateRepository` Home reads, so the meal Meals marks
    /// Serving now is the meal Home offers the entry QR for. Empty when it could not be read.
    private(set) var todayMeals: [MealStatus] = []

    let context: StudentContext
    private let repository: any StudentMealsRepository
    private let mealState: any MealStateRepository
    private let clock: any AppClock
    /// Menus already shown, so an offline tap still shows what was saved, with when.
    private var saved: [String: (menu: StudentMealMenu, at: Date)] = [:]
    private var hasPickedSlot = false

    static let slots: [MealSlot] = [.breakfast, .lunch, .snacks, .dinner]

    init?(session: Session, repositories: Repositories, clock: any AppClock) {
        guard session.account.role == .student, let context = session.student else { return nil }
        self.context = context
        self.repository = repositories.student.meals
        self.mealState = repositories.mealState
        self.clock = clock
    }

    var timeZone: TimeZone { context.mess.timeZone }
    var now: Date { clock.now() }

    var isToday: Bool { selectedDay != nil && selectedDay == week?.today }

    /// The meal being served now, from the mess's meal state. Nil between serving windows.
    var servingMeal: Meal? { todayMeals.first { $0.state == .inService }?.meal }

    /// The next meal today that has not started, for "Nothing is being served right now".
    var nextMeal: Meal? { todayMeals.first { $0.state == .notStarted }?.meal }

    /// Today's meal for a slot, with its state, when the mess runs it.
    func todayStatus(_ slot: MealSlot) -> MealStatus? { todayMeals.first { $0.meal.slot == slot } }

    /// Reads the meal state again. Called on load and whenever the tab shows, so a start or close is picked up.
    func refreshServing() async {
        todayMeals = (try? await mealState.meals(for: context.mess.id)) ?? []
    }

    /// "Lunch service has ended for today." Only for today, and only when the backend gives the meal a time.
    var serviceEnded: (slot: MealSlot, next: (slot: MealSlot, from: Date)?)? {
        guard isToday, let menu = state.value, menu.status == .published, let until = menu.servedUntil, until <= now else { return nil }
        let later = Self.slots.drop { $0 != selectedSlot }.dropFirst()
            .compactMap { slot in dayMenus[slot]?.servedFrom.map { (slot: slot, from: $0) } }
            .first { $0.from > now }
        return (selectedSlot, later)
    }

    private func key(_ day: Date, _ slot: MealSlot) -> String { "\(day.timeIntervalSince1970)-\(slot.rawValue)" }

    /// The other dishes of the meal a dish belongs to, from a menu this model has already loaded (the one on screen or
    /// another meal of that day). Empty when that menu is not loaded or not published: nothing is fetched or invented.
    func otherDishes(than dish: DishID, day: Date, slot: MealSlot) -> [Dish] {
        var calendar = Calendar(identifier: .gregorian)
        calendar.timeZone = timeZone
        let menus = [state.value].compactMap { $0 } + Array(dayMenus.values)
        guard let menu = menus.first(where: { $0.slot == slot && $0.status == .published
                                              && calendar.isDate($0.day, inSameDayAs: day) }) else { return [] }
        return ([menu.highlight].compactMap { $0 } + menu.mains + menu.curries + menu.slimRows).filter { $0.id != dish }
    }

    func load() async {
        do {
            if week == nil {
                let loaded = try await repository.week(for: context.mess.id)
                week = loaded
                selectedDay = loaded.today
            }
            guard let day = selectedDay else { return }
            await refreshServing()
            if !hasPickedSlot && day == week?.today {
                await loadDay(day)
                selectedSlot = defaultSlot()
            }
            await loadMenu()
        } catch RepositoryError.offline(let savedAt) {
            state = .offline(nil, savedAt: savedAt)
        } catch {
            state = .failed(LoadFailure(error))
        }
    }

    /// The meal still to answer, as Home leads with: the first whose cutoff has not passed; then the first still being
    /// served; otherwise the last of the day. Snacks are never answered (P7), so they are never the default.
    private func defaultSlot() -> MealSlot {
        // The meal being served comes first, as on Home.
        if let serving = servingMeal?.slot { return serving }
        // With no times to go by, the meal on screen stays.
        guard !dayMenus.isEmpty else { return selectedSlot }
        let answerable = Self.slots.filter { $0 != .snacks }
        if let open = answerable.first(where: { slot in
            dayMenus[slot]?.servedFrom.map { now < $0.addingTimeInterval(-IntentionPolicy.cutoffBeforeMeal) } ?? false
        }) { return open }
        if let serving = answerable.first(where: { dayMenus[$0]?.servedUntil.map { now < $0 } ?? false }) { return serving }
        return .dinner
    }

    private func loadDay(_ day: Date) async {
        for slot in Self.slots {
            if let menu = try? await repository.mealMenu(on: day, slot: slot, mess: context.mess.id) {
                dayMenus[slot] = menu
            }
        }
    }

    private func loadMenu() async {
        guard let day = selectedDay else { return }
        let slot = selectedSlot
        if state.value?.day != day || state.value?.slot != slot {
            state = .loading
        }
        do {
            let menu = try await repository.mealMenu(on: day, slot: slot, mess: context.mess.id)
            guard day == selectedDay, slot == selectedSlot else { return }
            dayMenus[slot] = menu
            saved[key(day, slot)] = (menu, clock.now())
            state = .loaded(menu)
        } catch RepositoryError.offline {
            guard day == selectedDay, slot == selectedSlot else { return }
            let kept = saved[key(day, slot)]
            state = .offline(kept?.menu, savedAt: kept?.at)
        } catch {
            guard day == selectedDay, slot == selectedSlot else { return }
            state = .failed(LoadFailure(error))
        }
    }

    func select(day: Date) async {
        guard day != selectedDay else { return }
        selectedDay = day
        dayMenus = [:]
        if day == week?.today { await loadDay(day) }
        await loadMenu()
    }

    func select(slot: MealSlot) async {
        guard slot != selectedSlot else { return }
        hasPickedSlot = true
        selectedSlot = slot
        await loadMenu()
    }

    func dishDetail(_ dish: DishID, day: Date, slot: MealSlot) async throws -> StudentDishDetail {
        try await repository.dishDetail(dish, on: day, slot: slot, mess: context.mess.id)
    }
}
