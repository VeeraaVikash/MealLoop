#if DEMO_DATA || REVIEW_DATA
import XCTest
@testable import MealLoop

/// A clock the tests move by hand.
private final class RedesignClock: StoryClock, @unchecked Sendable {
    private var current: Date
    init(_ date: Date) { current = date }
    func now() -> Date { current }
    func set(_ date: Date) { current = date }
}

/// The student redesign of 15 Nov 2026: current-meal QR, Change answer, Rate a dish after a recorded entry, the
/// Meals serving highlight, Spending, credit rules, the recheck, SOS reasons, reminders and first-visit guides.
@MainActor
final class StudentRedesignTests: XCTestCase {
    private let aarav = DemoSeed.sampleStudent
    private let lunch = DemoSeed.lunch

    private var session: Session {
        get throws {
            Session(account: try XCTUnwrap(DemoSeed.accounts.first { $0.role == .student }), staff: nil,
                    student: StudentContext(student: DemoSeed.sampleStudent, mess: DemoSeed.mess))
        }
    }

    private func world(at time: Date = DemoSeed.storyStartNow) -> (DemoDataProvider, RedesignClock, Repositories) {
        let clock = RedesignClock(time)
        let demo = DemoDataProvider(scenario: .storyStart, clock: clock)
        // The scenario sets its own start time; the test's time comes after it.
        clock.set(time)
        return (demo, clock, demo.makeRepositories())
    }

    private func home(_ repositories: Repositories, _ clock: RedesignClock) throws -> StudentHomeViewModel {
        try XCTUnwrap(StudentHomeViewModel(session: try session, repositories: repositories, clock: clock))
    }

    private func entry(_ key: String, meal: MealID? = nil) -> EntryRequest {
        EntryRequest(mealID: meal ?? lunch.id, student: aarav, method: .typedLastFour, idempotencyKey: IdempotencyKey(key))
    }

    // MARK: Current-meal QR and Change answer

    /// Nothing is served at 7:00: no meal offers the QR. Breakfast serves from 7:30, and lunch only once started.
    func testOnlyTheMealBeingServedOffersTheEntryQR() async throws {
        let (demo, clock, repositories) = world()
        let model = try home(repositories, clock)
        await model.load()
        XCTAssertNil(model.state.value?.servingMeal)

        clock.set(DemoSeed.time(7, 45))
        await model.load()
        XCTAssertEqual(model.state.value?.servingMeal?.meal.slot, .breakfast)
        XCTAssertEqual(model.state.value?.heroCase, .nowServing)

        clock.set(DemoSeed.time(12, 10))
        await model.load()
        XCTAssertNil(model.state.value?.servingMeal, "Between breakfast and the start of lunch nothing is served")
        _ = try await demo.startMeal(lunch.id, by: .supervisor)
        await model.load()
        XCTAssertEqual(model.state.value?.servingMeal?.id, lunch.id)
        XCTAssertEqual(model.entryMeal?.id, lunch.id, "The QR is for the meal being served")
    }

    /// Change answer shows only before the cutoff; after it the repository refuses a change even from an open page.
    func testChangeAnswerIsOnlyOpenBeforeTheCutoffAndTheSaveIsCheckedAgain() async throws {
        let (_, clock, repositories) = world()
        let model = try home(repositories, clock)
        await model.load()
        // Lunch: its answers stay open until 9 AM (owner decision, 16 Nov 2026).
        await model.answer(.attending, for: DemoSeed.lunch.id)
        let card = try XCTUnwrap(model.card(id: DemoSeed.lunch.id))
        XCTAssertEqual(card.answer, .attending)
        XCTAssertTrue(card.isAnswerOpen, "Before the cutoff, Change answer is offered")
        await model.answer(.skipping, for: DemoSeed.lunch.id)
        XCTAssertEqual(model.card(id: DemoSeed.lunch.id)?.answer, .skipping, "The change shows at once")

        clock.set(IntentionPolicy.cutoff(for: DemoSeed.lunch).addingTimeInterval(1))
        await model.answer(.attending, for: DemoSeed.lunch.id)
        let after = try await repositories.intentions.response(of: aarav.id, for: DemoSeed.lunch.id)
        guard case .answered(.skipping, _) = after else { return XCTFail("A change after the cutoff was stored: \(after)") }
        XCTAssertFalse(IntentionPolicy.canAnswer(DemoSeed.lunch, at: clock.now()), "Change answer is gone after the cutoff")
    }

    // MARK: Rate a dish after a recorded entry

    func testRateADishAppearsOnlyAfterTheDoorRecordsTheEntryForThatMeal() async throws {
        let (demo, clock, repositories) = world(at: DemoSeed.time(12, 5))
        _ = try await demo.startMeal(lunch.id, by: .supervisor)
        let model = try home(repositories, clock)
        await model.load()
        await model.loadEntryCode()
        XCTAssertNil(model.recordedEntry, "Showing the QR unlocks nothing")

        _ = try await demo.recordEntry(entry("door-1"))
        await model.tickEntryQR()
        await model.refreshRecordedEntry()
        XCTAssertEqual(model.recordedEntry?.meal.id, lunch.id)

        _ = try await demo.recordEntry(entry("door-2"))
        await model.refreshRecordedEntry()
        XCTAssertEqual(model.recordedEntry?.meal.id, lunch.id, "A repeat scan keeps it, once")
    }

    func testAnOfflineScanOrAnotherMealsScanNeverUnlocksRateADish() async throws {
        let (demo, clock, repositories) = world(at: DemoSeed.time(12, 5))
        _ = try await demo.startMeal(lunch.id, by: .supervisor)
        let model = try home(repositories, clock)
        await model.load()
        let other = try await repositories.extras(aarav.id, meal: DemoSeed.dinner.id)
        XCTAssertFalse(other.isRecorded)
        await model.refreshRecordedEntry()
        XCTAssertNil(model.recordedEntry)

        let offline = DemoDataProvider(scenario: .offline)
        do {
            _ = try await offline.recordEntry(entry("offline"))
            XCTFail("An offline scan is never recorded")
        } catch RepositoryError.offline {}
        XCTAssertFalse(StudentEntryStanding.notScanned.isRecorded)
        XCTAssertFalse(StudentEntryStanding.wrongMess(homeMess: "Main Mess").isRecorded)
    }

    // MARK: Meals

    func testMealsMarksTheSameServingMealAsHome() async throws {
        let (demo, clock, repositories) = world(at: DemoSeed.time(12, 5))
        _ = try await demo.startMeal(lunch.id, by: .supervisor)
        let meals = try XCTUnwrap(StudentMealsViewModel(session: try session, repositories: repositories, clock: clock))
        await meals.load()
        let model = try home(repositories, clock)
        await model.load()
        XCTAssertEqual(meals.servingMeal?.id, model.state.value?.servingMeal?.id)
        XCTAssertEqual(meals.selectedSlot, .lunch, "Meals opens on the meal being served")

        _ = try await demo.closeMeal(lunch.id, by: .supervisor)
        await meals.refreshServing()
        await model.load()
        XCTAssertNil(meals.servingMeal)
        XCTAssertNil(model.state.value?.servingMeal)
    }

    // MARK: Spending

    func testSpendingChartTotalsAndListMoveTogetherAndEmptyAfterTheLastDelete() async throws {
        let (_, clock, repositories) = world()
        let model = try XCTUnwrap(StudentSpendingViewModel(session: try session, repositories: repositories, clock: clock))
        await model.load()
        let start = model.state.value?.recent.count ?? 0
        let draft = StudentExpenseDraft(amount: 75, day: clock.now(), category: .canteen, place: nil, note: nil)
        let saved = await model.save(draft, replacing: nil)
        XCTAssertTrue(saved)
        let summary = try XCTUnwrap(model.state.value)
        XCTAssertEqual(summary.recent.count, start + 1)
        XCTAssertEqual(summary.weeks.compactMap(\.amount).reduce(0, +), summary.monthTotal)

        for expense in summary.recent { _ = await model.delete(expense.id) }
        let empty = try XCTUnwrap(model.state.value)
        XCTAssertTrue(empty.isEmpty)
        XCTAssertNil(empty.monthTotal, "Nothing written is missing, never ₹0")
        XCTAssertFalse(empty.weeks.isEmpty, "The chart stays, empty")
    }

    // MARK: Credits

    func testCreditRulesComeFromTheLedgerAndClaimNoFeedbackCredits() async throws {
        let (_, clock, repositories) = world()
        let you = try XCTUnwrap(StudentYouViewModel(session: try session, repositories: repositories, clock: clock))
        await you.loadCredits()
        let credits = try XCTUnwrap(you.credits.value)
        XCTAssertEqual(credits.pointsPerAnswer, StudentCreditRule.yesAttend)
        XCTAssertFalse(credits.history.contains { $0.title.localizedCaseInsensitiveContains("rated") })
        XCTAssertFalse(credits.history.contains { $0.title.localizedCaseInsensitiveContains("recheck") })
        XCTAssertEqual(YouCopy.creditRules.map(\.points), [5, -3, -2, -2, 2])
    }

    // MARK: Recheck

    func testRecheckRecordsOnceAndDidntEatIsNotARating() async throws {
        let (_, clock, repositories) = world()
        let records = try XCTUnwrap(StudentRecordsViewModel(session: try session, repositories: repositories, clock: clock))
        await records.loadFeedback()
        let due = try XCTUnwrap(records.rechecksDue.first)
        XCTAssertNotNil(due.fixNote, "The kitchen's recorded change is available for the sheet")
        await records.answerRecheck(due.id, .didntEat)
        let answered = records.feedback.value?.items.first { $0.id == due.id }
        XCTAssertEqual(answered?.recheck, .didntEat)
        XCTAssertFalse(StudentRecheckAnswer.didntEat.isAboutTheDish)
        XCTAssertTrue(records.rechecksDue.isEmpty)

        await records.answerRecheck(due.id, .better)
        XCTAssertEqual(records.feedback.value?.items.first { $0.id == due.id }?.recheck, .didntEat, "No second answer")

        let reopened = try XCTUnwrap(StudentRecordsViewModel(session: try session, repositories: repositories, clock: clock))
        await reopened.loadFeedback()
        XCTAssertTrue(reopened.rechecksDue.isEmpty, "Reopening does not ask again")
    }

    func testRecheckCopyUsesTheStudentsIssueAndOmitsAMissingKitchenNote() {
        XCTAssertEqual(RecordsCopy.wasItBetter("Sambar"), "Was the sambar better today?")
        XCTAssertEqual(RecordsCopy.youSaidProblem("Sambar", "Too salty"), "You said the sambar was too salty.")
    }

    // MARK: SOS

    private func sos(_ repositories: Repositories, _ clock: RedesignClock) throws -> StudentSOSViewModel {
        StudentSOSViewModel(context: try XCTUnwrap(try session.student), repositories: repositories, clock: clock)
    }

    func testEachSOSReasonAsksForItsOwnFields() throws {
        let (_, clock, repositories) = world()
        let model = try sos(repositories, clock)
        for reason in [StudentSOSCategory.foundInFood, .smellsBad, .looksBad, .platesNotClean] {
            model.choose(reason)
            XCTAssertTrue(reason.asksForDish)
            XCTAssertEqual(model.detailProblems, [.dish])
        }
        XCTAssertEqual(StudentSOSCategory.foundInFood.photo, .required)
        XCTAssertEqual(StudentSOSCategory.smellsBad.photo, .required, "Owner decision, 16 Nov 2026")
        XCTAssertEqual(StudentSOSCategory.looksBad.photo, .required)
        XCTAssertEqual(StudentSOSCategory.unwell.photo, .none)
        XCTAssertEqual(StudentSOSCategory.otherSafety.photo, .none)

        // Where the student is comes from the phone, so only the tapped answers can be missing.
        model.choose(.unwell)
        XCTAssertEqual(model.detailProblems, [.meal, .symptoms, .startedWhen])
        model.toggle(symptom: StudentSOSCopy.symptomOptions[0])
        model.pick(started: StudentSOSCopy.startedOptions[0])
        XCTAssertEqual(model.detailProblems, [.meal])
        model.choose(.otherSafety)
        XCTAssertEqual(model.detailProblems, [.whatHappened])
        model.pick(problem: StudentSOSCopy.problemOptions[0])
        XCTAssertEqual(model.detailProblems, [])
    }

    func testFoundSomethingCannotSendWithoutAPhoto() async throws {
        let (_, clock, repositories) = world()
        let model = try sos(repositories, clock)
        model.choose(.foundInFood)
        model.dish = StudentSOSCopy.notListed
        model.continueWithoutPhoto()
        XCTAssertFalse(model.withoutPhoto, "No without-photo path for this reason")
        XCTAssertEqual(model.problems, [.photo])
        let sent = await model.send()
        XCTAssertFalse(sent)
        model.takePhoto()
        XCTAssertTrue(model.problems.isEmpty)
        let sentWithPhoto = await model.send()
        XCTAssertTrue(sentWithPhoto)
    }

    func testSwitchingReasonClearsTheOldBranchAndItsPhoto() throws {
        let (_, clock, repositories) = world()
        let model = try sos(repositories, clock)
        model.choose(.smellsBad)
        model.dish = "Sambar"
        model.takePhoto()
        model.choose(.unwell)
        XCTAssertNil(model.dish)
        XCTAssertFalse(model.hasPhoto, "Unwell takes no photo, so the earlier one is dropped")
        model.unwellMeal = .breakfast
        model.symptoms = "Stomach ache"
        model.startedWhen = "8:30 AM"
        model.whereNow = "Room B-214"
        XCTAssertTrue(model.problems.isEmpty)
        XCTAssertFalse(model.subject.contains("Sambar"))
        XCTAssertEqual(model.place, "Room B-214")
        model.choose(.otherSafety)
        XCTAssertTrue(model.symptoms.isEmpty)
        model.whereHappened = "Dining hall"
        model.whatHappened = "Wet floor near the counter"
        model.needsHelpNow = true
        XCTAssertTrue(model.subject.hasPrefix(StudentSOSCopy.needsHelpTag))
        XCTAssertEqual(model.place, "Dining hall")
    }

    // MARK: Reminders

    func testDayOfRemindersAreTwoHoursBeforeEachAnswerableCutoff() {
        let settings = StudentReminderSettings()
        let reminders = StudentReminderSchedule.reminders(for: [DemoSeed.breakfast, lunch], settings: settings,
                                                          now: DemoSeed.time(6, 0), timeZone: DemoSeed.mess.timeZone)
        let dayOf = reminders.filter { $0.kind == .dayOf }
        XCTAssertEqual(dayOf.first { $0.meal?.slot == .lunch }?.fireAt, IntentionPolicy.cutoff(for: lunch).addingTimeInterval(-7200))
        XCTAssertNil(dayOf.first { $0.meal?.slot == .breakfast }, "Breakfast closed at 10 PM the night before")
        let night = reminders.first { $0.kind == .nightBefore }
        XCTAssertEqual(night?.fireAt, DemoSeed.time(20, 0), "8:00 PM by default, mess time")
    }

    /// A cutoff the night before (as a breakfast cutoff may be) puts the two-hour reminder that night as well.
    func testAReminderBeforeAPreviousNightCutoffFallsThatNight() {
        // Snacks keeps the two-hour rule, so a very early one has its cutoff the evening before.
        let early = Meal(id: MealID("early"), messID: DemoSeed.mess.id, slot: .snacks,
                         startsAt: DemoSeed.time(0, 30), endsAt: DemoSeed.time(2, 0))
        let at = StudentReminderSchedule.dayOfTime(for: early)
        XCTAssertEqual(at, DemoSeed.time(0, 30).addingTimeInterval(-4 * 3600))
        XCTAssertLessThan(at, DemoSeed.time(0, 0), "The reminder is on the evening before")
    }

    func testEachReminderToggleIsIndependentAndPastTimesAreSkipped() {
        var settings = StudentReminderSettings()
        settings.nightBefore = false
        let dayOnly = StudentReminderSchedule.reminders(for: [lunch], settings: settings, now: DemoSeed.time(6, 0),
                                                        timeZone: DemoSeed.mess.timeZone)
        XCTAssertEqual(dayOnly.map(\.kind), [.dayOf])
        settings.nightBefore = true
        settings.dayOf = false
        let nightOnly = StudentReminderSchedule.reminders(for: [lunch], settings: settings, now: DemoSeed.time(6, 0),
                                                          timeZone: DemoSeed.mess.timeZone)
        XCTAssertEqual(nightOnly.map(\.kind), [.nightBefore])
        settings.dayOf = true
        let late = StudentReminderSchedule.reminders(for: [lunch], settings: settings, now: DemoSeed.time(9, 0),
                                                     timeZone: DemoSeed.mess.timeZone)
        XCTAssertFalse(late.contains { $0.kind == .dayOf }, "8:00 AM has passed: never fired late")
    }

    func testDeniedPermissionShowsNothingAsScheduledAndSettingsAreKeptPerStudent() async throws {
        let (_, clock, repositories) = world(at: DemoSeed.time(6, 0))
        let defaults = try XCTUnwrap(UserDefaults(suiteName: "reminders-\(UUID().uuidString)"))
        let preferences = DevicePreferences(defaults: defaults)
        let denied = FakeScheduler(permission: .denied)
        let model = StudentNotificationSettingsViewModel(context: try XCTUnwrap(try session.student), repositories: repositories,
                                                         scheduler: denied, preferences: preferences, clock: clock)
        await model.load()
        XCTAssertTrue(model.scheduled.isEmpty)
        await model.setDayOf(false)
        let pending = await denied.pending
        XCTAssertTrue(pending.isEmpty)

        let allowed = FakeScheduler(permission: .allowed)
        let again = StudentNotificationSettingsViewModel(context: try XCTUnwrap(try session.student), repositories: repositories,
                                                         scheduler: allowed, preferences: preferences, clock: clock)
        await again.load()
        XCTAssertFalse(again.settings.dayOf, "The choice survived")
        XCTAssertTrue(again.settings.nightBefore)
        XCTAssertEqual(again.scheduled.map(\.kind), [.nightBefore])
        await again.setDayOf(true)
        XCTAssertTrue(again.scheduled.contains { $0.kind == .dayOf }, "Turning it on replaces the pending set")
    }

    // MARK: Guides

    func testGuidesAreSeenPerStudentAndPerGuideAcrossRelaunches() throws {
        let suite = "guides-\(UUID().uuidString)"
        let defaults = try XCTUnwrap(UserDefaults(suiteName: suite))
        let first = DevicePreferences(defaults: defaults)
        first.markSeen(StudentGuide.credits.flag(for: aarav.id))
        XCTAssertTrue(first.hasSeen(StudentGuide.credits.flag(for: aarav.id)))
        for guide in [StudentGuide.feedback, .community, .outingPass] {
            XCTAssertFalse(first.hasSeen(guide.flag(for: aarav.id)), "\(guide) stays eligible")
        }
        XCTAssertFalse(first.hasSeen(StudentGuide.credits.flag(for: StudentID("someone-else"))))

        let relaunched = DevicePreferences(defaults: try XCTUnwrap(UserDefaults(suiteName: suite)))
        XCTAssertTrue(relaunched.hasSeen(StudentGuide.credits.flag(for: aarav.id)))
        XCTAssertEqual(StudentGuide.allCases.map(\.title),
                       ["How points work", "How feedback works", "How Community works", "How the outing pass works",
                        "How SOS works"])
    }
}

private extension Repositories {
    func extras(_ student: StudentID, meal: MealID) async throws -> StudentEntryStanding {
        try await self.student.extras.entryStanding(of: student, for: meal, at: DemoSeed.mess.id)
    }
}

/// A notification centre the tests own.
private actor FakeScheduler: ReminderScheduling {
    private let state: ReminderPermission
    private(set) var pending: [String] = []

    init(permission: ReminderPermission) { state = permission }

    func permission() async -> ReminderPermission { state }
    func requestPermission() async -> ReminderPermission { state }
    func replace(prefix: String, with reminders: [(id: String, title: String, body: String, fireAt: Date)], now: Date) async {
        pending.removeAll { $0.hasPrefix(prefix) }
        guard state == .allowed else { return }
        pending += reminders.filter { $0.fireAt > now }.map { prefix + $0.id }
    }
    func pendingIDs(prefix: String) async -> [String] { pending.filter { $0.hasPrefix(prefix) } }
}
#endif
