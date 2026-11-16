import Observation
import Charts
import SwiftUI

// Spending (221:63988) with Add expense (221:64118), Saving (221:64141), Failed (221:65703), Saved (221:64164), Edit
// expense (221:64238), Delete confirm (221:64262), Deleting (221:64288), Empty (221:65727), Loading (221:65739),
// Offline (221:65753) and Error (221:65828). Private: only the student sees it.

/// Words of the Spending frames. Wording only; every amount and day comes from `StudentSpendingRepository`.
enum SpendingCopy {
    static let addSpending = "Add spending"
    static let addExpense = "Add expense"
    static let editExpense = "Edit expense"
    static let amount = "Amount"
    static let date = "Date"
    static let category = "Category"
    static let place = "Place (optional)"
    static let placePrompt = "Add a place"
    static let note = "Note (optional)"
    static let notePrompt = "Add a note"
    static let save = "Save"
    static let tryAgain = "Try again"
    static let didNotSave = "Didn't save. Try again."
    static let deleteExpense = "Delete expense"
    static let deleteTitle = "Delete this expense?"
    static let deleteDetail = "You can't undo this."
    static let cancel = "Cancel"
    static let delete = "Delete"
    static let didNotDelete = "Didn't delete. Try again."
    static let emptyTitle = "Nothing added yet"
    static let couldntLoad = "Couldn't load your spending"
    static let emptyDetail = "Add what you spend outside the mess. Only you can see it."
    static let amountHint = "Amount in rupees"
    static func saved(_ category: StudentExpenseCategory, _ amount: Int) -> String {
        "Saved · \(title(category)) \(RecordsCopy.rupees(amount))"
    }

    static func title(_ category: StudentExpenseCategory) -> String {
        switch category {
        case .foodDelivery: "Food delivery"
        case .canteen: "Canteen"
        case .snacks: "Snacks"
        case .groceries: "Groceries"
        case .other: "Other"
        }
    }
}

// MARK: - View model

/// Spending screen state. Totals, weeks and what may be saved belong to the repository and `StudentSpendingMath`.
@MainActor
@Observable
final class StudentSpendingViewModel {
    enum Write: Equatable { case idle, working, failed }

    private(set) var state: LoadState<StudentSpendingSummary> = .idle
    private(set) var write: Write = .idle
    /// "Saved · Canteen ₹60" after a save, until the next change.
    private(set) var savedLine: String?

    let context: StudentContext
    private let spending: any StudentSpendingRepository
    private let clock: any AppClock
    /// The saved entries the chart, the totals and the list are all computed from, so the four never disagree.
    private var entries: [StudentExpense] = []

    init?(session: Session, repositories: Repositories, clock: any AppClock) {
        guard session.account.role == .student, let context = session.student else { return nil }
        self.context = context
        self.spending = repositories.student.spending
        self.clock = clock
    }

    var timeZone: TimeZone { context.mess.timeZone }
    var today: Date { clock.now() }
    private var student: StudentID { context.student.id }

    func load() async {
        if state.value == nil { state = .loading }
        do {
            entries = try await spending.expenses(for: student)
            recompute()
        } catch RepositoryError.offline(let savedAt) {
            state = .offline(state.value, savedAt: savedAt)
        } catch {
            state = .failed(LoadFailure(error))
        }
    }

    /// One summary from `entries`: chart, month total, this week and the list.
    private func recompute() {
        state = .loaded(StudentSpendingMath.summary(of: entries, today: today, timeZone: timeZone))
    }

    func beginEditing() {
        write = .idle
    }

    /// True when the repository saved it; the form then closes.
    func save(_ draft: StudentExpenseDraft, replacing id: StudentExpenseID?) async -> Bool {
        write = .working
        do {
            let saved = if let id {
                try await spending.updateExpense(id, with: draft, for: student)
            } else {
                try await spending.addExpense(draft, for: student)
            }
            savedLine = SpendingCopy.saved(saved.category, saved.amount)
            write = .idle
            // The saved entry shows at once; the reload then confirms it against the source.
            entries.removeAll { $0.id == saved.id }
            entries.append(saved)
            recompute()
            await load()
            return true
        } catch {
            write = .failed
            return false
        }
    }

    func delete(_ id: StudentExpenseID) async -> Bool {
        write = .working
        do {
            try await spending.deleteExpense(id, for: student)
            savedLine = nil
            write = .idle
            entries.removeAll { $0.id == id }
            recompute()
            await load()
            return true
        } catch {
            write = .failed
            return false
        }
    }

    func isSaveable(_ draft: StudentExpenseDraft) -> Bool {
        StudentSpendingMath.problems(in: draft, today: today, timeZone: timeZone).isEmpty
    }
}

// MARK: - Screen

/// What the expense form is open for.
enum SpendingForm: Identifiable, Hashable {
    case add
    case edit(StudentExpense)

    var id: String {
        switch self {
        case .add: "add"
        case .edit(let expense): expense.id.rawValue
        }
    }
}

struct StudentSpendingScreen: View {
    @Environment(AppEnvironment.self) private var environment
    let session: Session

    var body: some View {
        if let model = StudentSpendingViewModel(session: session, repositories: environment.repositories,
                                                clock: environment.clock) {
            StudentSpendingView(model: model)
        } else {
            NotImplementedView(title: YouCopy.spending)
        }
    }
}

struct StudentSpendingView: View {
    /// The week picked on the chart; nil shows the whole month.
    @State private var selectedWeek: Date?
    @State private var model: StudentSpendingViewModel
    @State private var form: SpendingForm?
    /// A form to open once loaded (previews and the verification captures).
    private let opening: SpendingForm?

    init(model: StudentSpendingViewModel, opening: SpendingForm? = nil) {
        _model = State(initialValue: model)
        self.opening = opening
    }

    var body: some View {
        // Add is the + at the top right (owner decision, 16 Nov 2026).
        MLScreen(YouCopy.spending) {
            if canAddFromBar {
                Button {
                    model.beginEditing()
                    form = .add
                } label: {
                    Image(systemName: "plus")
                }
                .accessibilityLabel(SpendingCopy.addSpending)
            }
        } content: {
            VStack(alignment: .leading, spacing: MLSpacing.s16) {
                content
            }
        }
        .task {
            await model.load()
            if let opening { form = opening }
        }
        .refreshable { await model.load() }
        .mlSheet(item: $form, isWorking: model.write == .working) { form in
            ExpenseFormSheet(model: model, form: form) { self.form = nil }
        }
        .sensoryFeedback(trigger: model.savedLine) { _, line in line == nil ? nil : .success }
    }

    /// The + shows once the page has loaded and is online, like the old Add button.
    private var canAddFromBar: Bool {
        switch model.state {
        case .loaded, .stale, .empty: true
        default: false
        }
    }

    @ViewBuilder
    private var content: some View {
        switch model.state {
        case .idle, .loading:
            SpendingPrivateChip()
            YouSkeleton(heights: [259, 216], label: YouCopy.spending)
        case .failed(let failure):
            SpendingPrivateChip()
            RetryCard(title: SpendingCopy.couldntLoad, message: failure.message) { Task { await model.load() } }
        case .empty:
            page(nil)
        case .loaded(let summary), .stale(let summary, _):
            page(summary)
        case .offline(let summary, _):
            StudentOfflineBanner(text: RecordsCopy.spendingOffline)
            if let summary { page(summary, canAdd: false) }
        }
    }

    @ViewBuilder
    private func page(_ summary: StudentSpendingSummary?, canAdd: Bool = true) -> some View {
        SpendingPrivateChip()
        if let line = model.savedLine {
            SpendingSavedBanner(text: line)
                .mlTransition(.fromTop)
        }
        if let summary, !summary.weeks.isEmpty {
            // Drawn even with no entries, so deleting the last one leaves an empty chart, not a jump.
            SpendingHero(summary: summary, timeZone: model.timeZone, selectedWeek: $selectedWeek)
        }
        if let summary, !summary.isEmpty {
            Text(RecordsCopy.recent)
                .font(StudentType.secondaryMedium)
                .foregroundStyle(MLColor.inkSecondary)
                .accessibilityAddTraits(.isHeader)
                .padding(.top, MLSpacing.s4)
            VStack(spacing: 0) {
                // A picked week narrows Recent to that week's lines (owner decision, 16 Nov 2026).
                ForEach(summary.recent.filter { expense in
                    guard let week = summary.weeks.first(where: { $0.id == selectedWeek }) else { return true }
                    return SpendingHero.contains(week, expense.day, timeZone: model.timeZone)
                }) { expense in
                    Rectangle().fill(MLColor.border).frame(height: 1)
                    SpendingRow(expense: expense, timeZone: model.timeZone) {
                        model.beginEditing()
                        form = .edit(expense)
                    }
                    .disabled(!canAdd)
                }
            }
        } else {
            SpendingEmptyCard()
        }
    }
}

// MARK: - Parts

struct SpendingPrivateChip: View {
    var body: some View {
        HStack(spacing: MLSpacing.s8) {
            Image(systemName: "lock").font(StudentType.secondaryMedium).accessibilityHidden(true)
            Text(RecordsCopy.privateChip).font(StudentType.secondaryMedium)
        }
        .foregroundStyle(MLColor.ink)
        .padding(.horizontal, MLSpacing.s16)
        .frame(minHeight: 40)
        .overlay(Capsule().strokeBorder(MLColor.ink, lineWidth: 1.5))
        .accessibilityElement(children: .combine)
    }
}

/// "Saved · Canteen ₹60" (Spending · Saved 221:64164).
struct SpendingSavedBanner: View {
    let text: String

    var body: some View {
        HStack(spacing: MLSpacing.s8) {
            Image(systemName: "checkmark.circle").font(StudentType.bodySemibold).accessibilityHidden(true)
            Text(text).font(StudentType.bodySemibold)
            Spacer(minLength: 0)
        }
        .foregroundStyle(MLColor.ink)
        .padding(.horizontal, MLSpacing.s16)
        .frame(minHeight: 48)
        .background(Capsule().fill(MLColor.surface))
        .accessibilityElement(children: .combine)
    }
}

/// The empty card of Spending · Empty (221:65727).
struct SpendingEmptyCard: View {
    var body: some View {
        VStack(spacing: MLSpacing.s12) {
            Image(systemName: "checkmark.circle")
                .font(StudentType.section)
                .foregroundStyle(MLColor.ink)
                .frame(width: 52, height: 52)
                .background(RoundedRectangle(cornerRadius: 14, style: .continuous).fill(MLColor.fillQuiet))
                .accessibilityHidden(true)
            Text(SpendingCopy.emptyTitle).font(StudentType.bodySemibold).foregroundStyle(MLColor.ink)
            Text(SpendingCopy.emptyDetail)
                .font(StudentType.secondary)
                .foregroundStyle(MLColor.inkSecondary)
                .multilineTextAlignment(.center)
                .fixedSize(horizontal: false, vertical: true)
        }
        .padding(MLSpacing.s24)
        .frame(maxWidth: .infinity)
        .background(RoundedRectangle(cornerRadius: MLRadius.card, style: .continuous).fill(MLColor.surface))
        .accessibilityElement(children: .combine)
    }
}

/// The black month card: total, this week and one bar per week.
struct SpendingHero: View {
    let summary: StudentSpendingSummary
    let timeZone: TimeZone
    /// The picked week (its start). It stays picked after the finger lifts; tapping it again shows the month.
    @Binding var selectedWeek: Date?

    private var picked: StudentSpendingWeek? {
        guard let selectedWeek else { return nil }
        return summary.weeks.first { $0.id == selectedWeek }
    }

    /// Whether a day falls inside a week, by calendar day in the mess time zone.
    static func contains(_ week: StudentSpendingWeek, _ day: Date, timeZone: TimeZone) -> Bool {
        var calendar = Calendar(identifier: .gregorian)
        calendar.timeZone = timeZone
        let start = calendar.startOfDay(for: week.start)
        let end = calendar.date(byAdding: .day, value: 1, to: calendar.startOfDay(for: week.end)) ?? week.end
        return day >= start && day < end
    }

    /// The touched week is lime and the others fade; untouched, this week is lime.
    private func barColor(_ week: StudentSpendingWeek) -> Color {
        if let picked { return picked.id == week.id ? MLColor.lime : MLColor.track.opacity(0.4) }
        return week.isCurrent ? MLColor.lime : MLColor.track
    }

    var body: some View {
        VStack(alignment: .leading, spacing: MLSpacing.s12) {
            Text(picked.map(range) ?? RecordsCopy.monthSoFar).font(StudentType.secondary).foregroundStyle(MLColor.onHeroSecondary)
            HStack(alignment: .firstTextBaseline, spacing: MLSpacing.s12) {
                if let picked {
                    // The picked week's own total; a week with nothing written says so, never ₹0.
                    if let amount = picked.amount {
                        Text(RecordsCopy.rupees(amount))
                            .font(.system(size: 48, weight: .medium, design: .monospaced))
                            .foregroundStyle(MLColor.lime)
                            .lineLimit(1)
                            .minimumScaleFactor(0.6)
                            .mlNumericText(amount)
                    } else {
                        Text(RecordsCopy.nothingWritten).font(StudentType.bodySemibold).foregroundStyle(MLColor.onHero)
                    }
                } else if let total = summary.monthTotal {
                    Text(RecordsCopy.rupees(total))
                        .font(.system(size: 48, weight: .medium, design: .monospaced))
                        .foregroundStyle(MLColor.onHero)
                        .lineLimit(1)
                        .minimumScaleFactor(0.6)
                        .mlNumericText(total)
                } else {
                    Text(RecordsCopy.totalMissing).font(StudentType.bodySemibold).foregroundStyle(MLColor.onHero)
                }
                if picked == nil, let week = summary.thisWeek {
                    Text(RecordsCopy.thisWeek(week)).font(StudentType.secondary).foregroundStyle(MLColor.onHeroSecondary)
                }
            }
            .accessibilityElement(children: .combine)
            Text(picked == nil ? RecordsCopy.touchAWeek : RecordsCopy.tapAgainForMonth)
                .font(StudentType.secondaryMedium)
                .foregroundStyle(MLColor.onHeroSecondary)
            Chart(summary.weeks) { week in
                BarMark(x: .value(RecordsCopy.weekAxis, range(week)),
                        y: .value(RecordsCopy.amountAxis, week.amount ?? 0),
                        width: .ratio(0.6))
                    .cornerRadius(10)
                    .foregroundStyle(barColor(week))
            }
            .chartOverlay { proxy in
                // Tap or drag picks a week and keeps it; tapping the picked week again goes back to the month.
                Rectangle().fill(.clear).contentShape(Rectangle())
                    .gesture(DragGesture(minimumDistance: 0).onEnded { value in
                        guard let label: String = proxy.value(atX: value.location.x),
                              let week = summary.weeks.first(where: { range($0) == label }) else { return }
                        withAnimation(.snappy) { selectedWeek = selectedWeek == week.id ? nil : week.id }
                    })
            }
            .chartYAxis(.hidden)
            .chartXAxis {
                AxisMarks { _ in
                    AxisValueLabel().foregroundStyle(MLColor.onHeroSecondary)
                }
            }
            .frame(height: 118)
            .sensoryFeedback(.selection, trigger: selectedWeek)
            .accessibilityLabel(RecordsCopy.monthSoFar)
        }
        .padding(MLSpacing.s20)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(RoundedRectangle(cornerRadius: StudentMetric.heroRadius, style: .continuous).fill(MLColor.heroBackground))
    }

    private func range(_ week: StudentSpendingWeek) -> String {
        let start = RecordsFormat.dayNumber(week.start, in: timeZone)
        let end = RecordsFormat.dayNumber(week.end, in: timeZone) + " " + RecordsFormat.monthShort(week.end, in: timeZone)
        return week.start == week.end ? end : RecordsCopy.weekRange(start, end)
    }
}

/// One Recent row. A tap opens Edit expense.
struct SpendingRow: View {
    let expense: StudentExpense
    let timeZone: TimeZone
    let onEdit: () -> Void

    var body: some View {
        Button(action: onEdit) {
            HStack(alignment: .center) {
                VStack(alignment: .leading, spacing: MLSpacing.s4) {
                    Text(SpendingCopy.title(expense.category)).font(StudentType.bodySemibold).foregroundStyle(MLColor.ink)
                    Text([RecordsFormat.day(expense.day, in: timeZone), expense.place, expense.note].compactMap { $0 }
                        .joined(separator: " · "))
                        .font(StudentType.secondary)
                        .foregroundStyle(MLColor.inkSecondary)
                }
                Spacer(minLength: MLSpacing.s8)
                Text(RecordsCopy.rupees(expense.amount)).font(StudentType.mono).foregroundStyle(MLColor.ink)
            }
            .padding(.vertical, MLSpacing.s12)
            .frame(minHeight: MLSize.hit)
            .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
        .accessibilityElement(children: .combine)
        .accessibilityHint(SpendingCopy.editExpense)
    }
}

// MARK: - Add and Edit expense

/// Add expense (221:64118) and Edit expense (221:64238) in a sheet sized to its content.
struct ExpenseFormSheet: View {
    enum Field: Hashable { case amount, place, note }

    let model: StudentSpendingViewModel
    let form: SpendingForm
    let onClose: () -> Void

    @State private var amountText = ""
    @State private var day = Date()
    @State private var category: StudentExpenseCategory = .foodDelivery
    @State private var place = ""
    @State private var note = ""
    @State private var confirmsDelete = false
    @State private var lastAction: Action = .save
    @FocusState private var focus: Field?

    private enum Action { case save, delete }

    private var editing: StudentExpense? {
        if case .edit(let expense) = form { return expense }
        return nil
    }

    private var draft: StudentExpenseDraft {
        StudentExpenseDraft(amount: Int(amountText) ?? 0, day: day, category: category, place: place, note: note)
    }

    private var isWorking: Bool { model.write == .working }

    var body: some View {
        VStack(alignment: .leading, spacing: MLSpacing.s16) {
            SheetHeader(title: editing == nil ? SpendingCopy.addExpense : SpendingCopy.editExpense, onClose: onClose)
            labelled(SpendingCopy.amount) {
                HStack(spacing: MLSpacing.s8) {
                    Image(systemName: "indianrupeesign").font(StudentType.section).foregroundStyle(MLColor.inkSecondary)
                        .accessibilityHidden(true)
                    TextField("", text: $amountText, prompt: Text(verbatim: "0"))
                        .font(.system(size: 28, weight: .medium, design: .monospaced))
                        .keyboardType(.numberPad)
                        .focused($focus, equals: .amount)
                        .accessibilityLabel(SpendingCopy.amountHint)
                        .onChange(of: amountText) { _, text in
                            let digits = String(text.filter(\.isNumber).prefix(6))
                            if digits != text { amountText = digits }
                        }
                }
                .padding(.horizontal, MLSpacing.s16)
                .frame(minHeight: 64)
                .background(fieldBackground)
            }
            labelled(SpendingCopy.date) {
                DatePicker(SpendingCopy.date, selection: $day, in: ...model.today, displayedComponents: .date)
                    .labelsHidden()
                    .environment(\.timeZone, model.timeZone)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.horizontal, MLSpacing.s12)
                    .frame(minHeight: 52)
                    .background(fieldBackground)
            }
            labelled(SpendingCopy.category) {
                StudentFlowLayout(spacing: MLSpacing.s8) {
                    ForEach(StudentExpenseCategory.allCases, id: \.self) { option in
                        categoryChip(option)
                    }
                }
            }
            labelled(SpendingCopy.place) {
                textField(SpendingCopy.placePrompt, text: $place, field: .place, submit: .next)
            }
            labelled(SpendingCopy.note) {
                textField(SpendingCopy.notePrompt, text: $note, field: .note, submit: .done)
            }
            if model.write == .failed {
                HStack(spacing: MLSpacing.s8) {
                    Image(systemName: "exclamationmark.triangle").accessibilityHidden(true)
                    Text(lastAction == .delete ? SpendingCopy.didNotDelete : SpendingCopy.didNotSave)
                        .font(StudentType.secondaryMedium)
                    Spacer(minLength: 0)
                }
                .foregroundStyle(MLColor.danger)
                .padding(.horizontal, MLSpacing.s16)
                .frame(minHeight: 48)
                .background(RoundedRectangle(cornerRadius: MLRadius.input, style: .continuous).fill(StudentTint.errorFill))
                .mlTransition(.fade)
            }
            InkActionButton(title: model.write == .failed && lastAction == .save ? SpendingCopy.tryAgain : SpendingCopy.save,
                            isLoading: isWorking && lastAction == .save) {
                focus = nil
                lastAction = .save
                Task {
                    if await model.save(draft, replacing: editing?.id) { onClose() }
                }
            }
            .disabled(!model.isSaveable(draft) || isWorking)
            if editing != nil {
                Button {
                    focus = nil
                    confirmsDelete = true
                } label: {
                    HStack(spacing: MLSpacing.s8) {
                        if isWorking && lastAction == .delete {
                            ProgressView().tint(MLColor.ink)
                        } else {
                            Image(systemName: "trash").accessibilityHidden(true)
                        }
                        Text(SpendingCopy.deleteExpense).font(StudentType.bodySemibold)
                    }
                    .foregroundStyle(MLColor.ink)
                    .frame(maxWidth: .infinity, minHeight: MLSize.hit)
                }
                .buttonStyle(.plain)
                .disabled(isWorking)
            }
        }
        .onAppear(perform: fill)
        .alert(SpendingCopy.deleteTitle, isPresented: $confirmsDelete) {
            Button(SpendingCopy.cancel, role: .cancel) {}
            Button(SpendingCopy.delete, role: .destructive) {
                guard let id = editing?.id else { return }
                lastAction = .delete
                Task {
                    if await model.delete(id) { onClose() }
                }
            }
        } message: {
            Text(SpendingCopy.deleteDetail)
        }
    }

    private func fill() {
        if let editing {
            amountText = String(editing.amount)
            day = editing.day
            category = editing.category
            place = editing.place ?? ""
            note = editing.note ?? ""
        } else {
            day = model.today
            focus = .amount
        }
    }

    private var fieldBackground: some View {
        RoundedRectangle(cornerRadius: MLRadius.input, style: .continuous)
            .fill(MLColor.surface)
            .overlay(RoundedRectangle(cornerRadius: MLRadius.input, style: .continuous).strokeBorder(MLColor.border))
    }

    private func labelled<Content: View>(_ label: String, @ViewBuilder content: () -> Content) -> some View {
        VStack(alignment: .leading, spacing: MLSpacing.s8) {
            Text(label).font(StudentType.footnote).foregroundStyle(MLColor.inkSecondary)
            content()
        }
    }

    private func textField(_ prompt: String, text: Binding<String>, field: Field, submit: SubmitLabel) -> some View {
        TextField(prompt, text: text)
            .font(StudentType.body)
            .textInputAutocapitalization(.sentences)
            .submitLabel(submit)
            .focused($focus, equals: field)
            .onSubmit { focus = field == .place ? .note : nil }
            .padding(.horizontal, MLSpacing.s16)
            .frame(minHeight: 52)
            .background(fieldBackground)
    }

    private func categoryChip(_ option: StudentExpenseCategory) -> some View {
        let selected = option == category
        return Button {
            category = option
        } label: {
            HStack(spacing: MLSpacing.s4) {
                if selected {
                    Image(systemName: "checkmark").font(StudentType.tag).accessibilityHidden(true)
                }
                Text(SpendingCopy.title(option)).font(StudentType.bodySemibold)
            }
            .foregroundStyle(MLColor.ink)
            .padding(.horizontal, MLSpacing.s16)
            .frame(minHeight: MLSize.hit)
            .background(Capsule().fill(selected ? MLColor.lime : MLColor.surface))
            .overlay(Capsule().strokeBorder(MLColor.ink, lineWidth: selected ? 1 : 1.5))
        }
        .buttonStyle(.plain)
        .accessibilityAddTraits(selected ? .isSelected : [])
        .sensoryFeedback(.selection, trigger: selected)
    }
}

#if DEMO_DATA || REVIEW_DATA
#Preview("Spending") {
    let demo = DemoDataProvider(scenario: .storyStart)
    let session = Session(account: DemoSeed.accounts.first { $0.role == .student }!, staff: nil,
                          student: StudentContext(student: DemoSeed.sampleStudent, mess: DemoSeed.mess))
    return NavigationStack {
        StudentSpendingView(model: StudentSpendingViewModel(session: session, repositories: demo.makeRepositories(),
                                                            clock: demo.clock)!)
    }
}

#Preview("Add expense") {
    let demo = DemoDataProvider(scenario: .storyStart)
    let session = Session(account: DemoSeed.accounts.first { $0.role == .student }!, staff: nil,
                          student: StudentContext(student: DemoSeed.sampleStudent, mess: DemoSeed.mess))
    return NavigationStack {
        StudentSpendingView(model: StudentSpendingViewModel(session: session, repositories: demo.makeRepositories(),
                                                            clock: demo.clock)!, opening: .add)
    }
}

#Preview("Offline") {
    let demo = DemoDataProvider(scenario: .offline)
    let session = Session(account: DemoSeed.accounts.first { $0.role == .student }!, staff: nil,
                          student: StudentContext(student: DemoSeed.sampleStudent, mess: DemoSeed.mess))
    return NavigationStack {
        StudentSpendingView(model: StudentSpendingViewModel(session: session, repositories: demo.makeRepositories(),
                                                            clock: demo.clock)!)
    }
}
#endif
