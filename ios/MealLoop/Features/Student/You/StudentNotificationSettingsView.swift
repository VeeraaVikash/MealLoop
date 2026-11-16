import Observation
import SwiftUI

/// Notification settings (Figma "Notification settings" 93:9459, updated 15 Nov 2026): the night-before reminder
/// first, then the day-of reminder, each with its own switch. The times come from `StudentReminderSchedule`; this model
/// keeps the choices per student on the phone and replaces the pending reminders whenever one changes.
@MainActor
@Observable
final class StudentNotificationSettingsViewModel {
    private(set) var settings = StudentReminderSettings()
    private(set) var permission: ReminderPermission = .notAsked
    /// Still to come, earliest first. Empty while notifications are not allowed: nothing is shown as scheduled then.
    private(set) var scheduled: [StudentScheduledReminder] = []
    private(set) var meals: [Meal] = []

    let context: StudentContext
    private let mealState: any MealStateRepository
    private let scheduler: any ReminderScheduling
    private let preferences: DevicePreferences
    private let clock: any AppClock

    init(context: StudentContext, repositories: Repositories, scheduler: any ReminderScheduling,
         preferences: DevicePreferences, clock: any AppClock) {
        self.context = context
        self.mealState = repositories.mealState
        self.scheduler = scheduler
        self.preferences = preferences
        self.clock = clock
        if let data = preferences.data(forKey: storageKey),
           let saved = try? JSONDecoder().decode(StudentReminderSettings.self, from: data) {
            settings = saved
        }
    }

    var timeZone: TimeZone { context.mess.timeZone }
    private var storageKey: String { "reminders.\(context.student.id.rawValue)" }
    private var prefix: String { "ml.\(context.student.id.rawValue)." }

    /// The night-before time as a date today, for the time picker.
    var nightBeforeTime: Date {
        var calendar = Calendar(identifier: .gregorian)
        calendar.timeZone = timeZone
        return calendar.date(bySettingHour: settings.nightBeforeHour, minute: settings.nightBeforeMinute, second: 0,
                             of: clock.now()) ?? clock.now()
    }

    func load() async {
        meals = ((try? await mealState.meals(for: context.mess.id)) ?? []).map(\.meal)
        permission = await scheduler.permission()
        await apply()
    }

    func setNightBefore(_ on: Bool) async {
        settings.nightBefore = on
        await save()
    }

    func setDayOf(_ on: Bool) async {
        settings.dayOf = on
        await save()
    }

    func setNightBeforeTime(_ date: Date) async {
        var calendar = Calendar(identifier: .gregorian)
        calendar.timeZone = timeZone
        settings.nightBeforeHour = calendar.component(.hour, from: date)
        settings.nightBeforeMinute = calendar.component(.minute, from: date)
        await save()
    }

    private func save() async {
        if let data = try? JSONEncoder().encode(settings) { preferences.set(data, forKey: storageKey) }
        if (settings.nightBefore || settings.dayOf) && permission == .notAsked {
            permission = await scheduler.requestPermission()
        }
        await apply()
    }

    /// Replaces this student's pending reminders with what the settings say now. With notifications not allowed it
    /// cancels them and shows none as scheduled.
    private func apply() async {
        let now = clock.now()
        let wanted = StudentReminderSchedule.reminders(for: meals, settings: settings, now: now, timeZone: timeZone)
        guard permission == .allowed else {
            scheduled = []
            await scheduler.replace(prefix: prefix, with: [], now: now)
            return
        }
        await scheduler.replace(prefix: prefix, with: wanted.map { reminder in
            (id: reminder.id, title: NotificationSettingsCopy.title(reminder), body: NotificationSettingsCopy.body(reminder), fireAt: reminder.fireAt)
        }, now: now)
        let pending = Set(await scheduler.pendingIDs(prefix: prefix))
        scheduled = wanted.filter { pending.contains(prefix + $0.id) }
    }
}

enum NotificationSettingsCopy {
    static let title = "Notification settings"
    static let sendMe = "Send me"
    static let nightBefore = "Night-before reminder"
    static func nightBeforeDetail(_ time: String) -> String { "\(time) the night before" }
    static let nightBeforeTime = "Time"
    static let dayOf = "Day-of reminder"
    static let dayOfDetail = "2 hours before each meal's cutoff"
    static let upcoming = "Coming up"
    static let noneComing = "No reminders left today."
    static let deniedTitle = "Notifications are off for MealLoop"
    static let deniedDetail = "Your choices are saved, but no reminder will show until you turn notifications on in Settings."
    static let openSettings = "Open Settings"
    static let swipeNote = "Swipe a meal on Home to set a one-off reminder for it."
    static func title(_ reminder: StudentScheduledReminder) -> String {
        switch reminder.kind {
        case .nightBefore: return "Tomorrow's meals"
        case .dayOf: return reminder.meal.map { "\(MLFormat.mealSlot($0.slot)) today?" } ?? "Meal today?"
        }
    }
    static func body(_ reminder: StudentScheduledReminder) -> String {
        switch reminder.kind {
        case .nightBefore: return "Say if you're eating tomorrow, so the kitchen can plan."
        case .dayOf: return "Answers close in 2 hours."
        }
    }
    static func line(_ reminder: StudentScheduledReminder, _ time: String, cutoff: String?) -> String {
        switch reminder.kind {
        case .nightBefore: return "Night before · \(time)"
        case .dayOf:
            let meal = reminder.meal.map { MLFormat.mealSlot($0.slot) } ?? ""
            return "\(meal) · \(time)" + (cutoff.map { " · cutoff \($0)" } ?? "")
        }
    }
}

/// Builds the view model from the environment.
struct StudentNotificationSettingsScreen: View {
    @Environment(AppEnvironment.self) private var environment
    @Environment(DevicePreferences.self) private var preferences
    let context: StudentContext

    var body: some View {
        StudentNotificationSettingsView(model: StudentNotificationSettingsViewModel(
            context: context, repositories: environment.repositories, scheduler: environment.reminders,
            preferences: preferences, clock: environment.clock))
    }
}

struct StudentNotificationSettingsView: View {
    @State var model: StudentNotificationSettingsViewModel

    var body: some View {
        MLScreen(NotificationSettingsCopy.title) {
            VStack(alignment: .leading, spacing: MLSpacing.s16) {
                if model.permission == .denied {
                    RetryCard(title: NotificationSettingsCopy.deniedTitle, message: NotificationSettingsCopy.deniedDetail) {
                        if let url = URL(string: UIApplication.openSettingsURLString) { UIApplication.shared.open(url) }
                    }
                }
                Text(NotificationSettingsCopy.sendMe.uppercased())
                    .font(StudentType.eyebrow)
                    .tracking(0.72)
                    .foregroundStyle(MLColor.inkSecondary)
                YouCard {
                    toggleRow(symbol: "moon", title: NotificationSettingsCopy.nightBefore,
                              detail: NotificationSettingsCopy.nightBeforeDetail(MLFormat.time(model.nightBeforeTime, in: model.timeZone)),
                              isOn: model.settings.nightBefore) { on in Task { await model.setNightBefore(on) } }
                    if model.settings.nightBefore {
                        DatePicker(NotificationSettingsCopy.nightBeforeTime,
                                   selection: Binding(get: { model.nightBeforeTime },
                                                      set: { date in Task { await model.setNightBeforeTime(date) } }),
                                   displayedComponents: .hourAndMinute)
                            .environment(\.timeZone, model.timeZone)
                            .font(StudentType.body)
                            .frame(minHeight: MLSize.hit)
                    }
                    YouDivider()
                    toggleRow(symbol: "fork.knife", title: NotificationSettingsCopy.dayOf, detail: NotificationSettingsCopy.dayOfDetail,
                              isOn: model.settings.dayOf) { on in Task { await model.setDayOf(on) } }
                }
                if model.permission == .allowed {
                    Text(NotificationSettingsCopy.upcoming.uppercased())
                        .font(StudentType.eyebrow)
                        .tracking(0.72)
                        .foregroundStyle(MLColor.inkSecondary)
                    YouCard {
                        if model.scheduled.isEmpty {
                            Text(NotificationSettingsCopy.noneComing)
                                .font(StudentType.secondary)
                                .foregroundStyle(MLColor.inkSecondary)
                                .frame(maxWidth: .infinity, minHeight: MLSize.hit, alignment: .leading)
                        }
                        ForEach(Array(model.scheduled.enumerated()), id: \.element.id) { index, reminder in
                            if index > 0 { YouDivider() }
                            Text(NotificationSettingsCopy.line(reminder, MLFormat.time(reminder.fireAt, in: model.timeZone),
                                                   cutoff: reminder.meal.map { MLFormat.time(IntentionPolicy.cutoff(for: $0), in: model.timeZone) }))
                                .font(StudentType.mono)
                                .foregroundStyle(MLColor.ink)
                                .frame(maxWidth: .infinity, minHeight: MLSize.hit, alignment: .leading)
                        }
                    }
                }
                Text(NotificationSettingsCopy.swipeNote)
                    .font(StudentType.footnote)
                    .foregroundStyle(MLColor.inkSecondary)
            }
        }
        .task { await model.load() }
    }

    private func toggleRow(symbol: String, title: String, detail: String, isOn: Bool,
                           onChange: @escaping (Bool) -> Void) -> some View {
        Toggle(isOn: Binding(get: { isOn }, set: onChange)) {
            HStack(spacing: MLSpacing.s16) {
                Image(systemName: symbol)
                    .font(.system(size: 16, weight: .medium))
                    .foregroundStyle(MLColor.ink)
                    .frame(width: MLSize.hit, height: MLSize.hit)
                    .background(RoundedRectangle(cornerRadius: MLRadius.input, style: .continuous).fill(MLColor.fillQuiet))
                    .accessibilityHidden(true)
                VStack(alignment: .leading, spacing: 2) {
                    Text(title).font(StudentType.bodySemibold).foregroundStyle(MLColor.ink)
                    Text(detail).font(StudentType.secondary).foregroundStyle(MLColor.inkSecondary)
                }
            }
        }
        .tint(MLColor.ink)
        .padding(.vertical, MLSpacing.s8)
        .frame(minHeight: 60)
    }
}
