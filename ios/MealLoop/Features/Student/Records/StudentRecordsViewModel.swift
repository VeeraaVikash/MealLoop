import Foundation
import Observation

/// My reports, a report page, My feedback, Spending, Help and the updates under a Community problem. Screen state only:
/// stages, counts, totals and what may be answered belong to `StudentRecordsRepository`.
@MainActor
@Observable
final class StudentRecordsViewModel {
    enum Send: Equatable { case idle, sending, failed(String) }

    private(set) var reports: LoadState<[StudentFiledReport]> = .idle
    private(set) var report: LoadState<StudentFiledReport> = .idle
    private(set) var feedback: LoadState<StudentFeedbackSummary> = .idle
    private(set) var spending: LoadState<StudentSpending> = .idle
    private(set) var help: LoadState<StudentHelp> = .idle
    private(set) var updates: [StudentIssueUpdate] = []
    private(set) var replySend: Send = .idle
    private(set) var recheckSend: Send = .idle
    private(set) var fixSend: Send = .idle
    private(set) var dataRequestSend: Send = .idle
    private(set) var dataRequests: [StudentDataRequestReceipt] = []

    /// The latest meal today whose entry the door recorded: Rate a dish on My feedback opens its rating. Nil when
    /// there is none, and the tile then says why.
    private(set) var rateTarget: Meal?

    let context: StudentContext
    private let records: any StudentRecordsRepository
    private let mealState: any MealStateRepository
    private let extras: any StudentExtrasRepository
    private let clock: any AppClock

    init?(session: Session, repositories: Repositories, clock: any AppClock) {
        guard session.account.role == .student, let context = session.student else { return nil }
        self.context = context
        self.records = repositories.student.records
        self.mealState = repositories.mealState
        self.extras = repositories.student.extras
        self.clock = clock
    }

    /// Rechecks waiting for an answer, newest first.
    var rechecksDue: [StudentFeedbackItem] { (feedback.value?.items ?? []).filter(\.isRecheckDue) }

    /// Reads the same entry records Home reads; nothing here can mark an entry.
    /// The meal Rate a dish opens: the latest one with a recorded entry, otherwise (owner decision, 16 Nov 2026: Rate a
    /// dish is always open on My feedback) the latest meal that has started, or today's first meal.
    func loadRateTarget() async {
        let all = ((try? await mealState.meals(for: context.mess.id)) ?? []).sorted { $0.meal.startsAt > $1.meal.startsAt }
        let started = all.filter { $0.state != .notStarted }
        for status in started {
            let standing = try? await extras.entryStanding(of: student, for: status.meal.id, at: context.mess.id)
            if standing?.isRecorded == true { rateTarget = status.meal; return }
        }
        rateTarget = started.first?.meal ?? all.last?.meal
    }

    var timeZone: TimeZone { context.mess.timeZone }
    var now: Date { clock.now() }
    private var student: StudentID { context.student.id }

    var activeReports: [StudentFiledReport] { (reports.value ?? []).filter { !$0.stage.isClosed } }
    var closedReports: [StudentFiledReport] { (reports.value ?? []).filter { $0.stage.isClosed } }

    func loadReports() async {
        reports = await Self.load(reports) { [records, student] in try await records.reports(for: student) }
    }

    func loadReport(_ id: StudentFiledReportID) async {
        report = await Self.load(report) { [records, student] in try await records.report(id, for: student) }
    }

    /// Records the reply. A failure or offline keeps the text and never shows it as recorded.
    @discardableResult
    func reply(_ text: String, to id: StudentFiledReportID) async -> Bool {
        guard replySend != .sending else { return false }
        replySend = .sending
        do {
            report = .loaded(try await records.reply(to: id, text: text, by: student))
            replySend = .idle
            return true
        } catch {
            replySend = .failed(LoadFailure(error).message)
            return false
        }
    }

    /// "Is it better now?" A student signal only; the report stays Fixed.
    func answerFixCheck(_ answer: StudentFixCheckAnswer, for id: StudentFiledReportID) async {
        guard fixSend != .sending else { return }
        fixSend = .sending
        do {
            report = .loaded(try await records.answerFixCheck(id, answer, by: student))
            fixSend = .idle
        } catch {
            fixSend = .failed(LoadFailure(error).message)
        }
    }

    func loadDataRequests() async {
        dataRequests = (try? await records.dataRequests(for: student)) ?? dataRequests
    }

    /// Shown as recorded only after the repository records it.
    func recordDataRequest(_ kind: StudentDataRequestKind) async {
        guard dataRequestSend != .sending else { return }
        dataRequestSend = .sending
        do {
            let receipt = try await records.recordDataRequest(kind, by: student)
            if !dataRequests.contains(receipt) { dataRequests.append(receipt) }
            dataRequestSend = .idle
        } catch {
            dataRequestSend = .failed(LoadFailure(error).message)
        }
    }

    func loadFeedback() async {
        feedback = await Self.load(feedback) { [records, student] in try await records.feedback(for: student) }
    }

    /// Records the answer once. A second tap while it sends, or an item already answered, does nothing.
    func answerRecheck(_ id: StudentFeedbackID, _ answer: StudentRecheckAnswer) async {
        guard recheckSend != .sending,
              feedback.value?.items.first(where: { $0.id == id })?.recheck == nil else { return }
        recheckSend = .sending
        do {
            feedback = .loaded(try await records.answerRecheck(id, answer, by: student))
            recheckSend = .idle
        } catch {
            recheckSend = .failed(LoadFailure(error).message)
        }
    }

    func loadSpending() async {
        spending = await Self.load(spending) { [records, student] in try await records.spending(for: student) }
    }

    func loadHelp() async {
        help = await Self.load(help) { [records, context] in try await records.help(at: context.mess.id) }
    }

    /// The updates are extra: when they can't load, the Issue page shows none rather than an error.
    func loadUpdates(for issue: CommunityIssueID) async {
        updates = (try? await records.updates(for: issue)) ?? []
    }

    /// Keeps the last value under the offline banner; a failure is never shown as an empty result.
    private static func load<Value>(_ current: LoadState<Value>, _ fetch: () async throws -> Value) async -> LoadState<Value> {
        do {
            return .loaded(try await fetch())
        } catch RepositoryError.offline(let savedAt) {
            return .offline(current.value, savedAt: savedAt)
        } catch {
            return .failed(LoadFailure(error))
        }
    }
}
