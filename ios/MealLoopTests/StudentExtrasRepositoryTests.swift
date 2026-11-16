#if DEMO_DATA || REVIEW_DATA
import XCTest
@testable import MealLoop

private final class ExtrasClock: StoryClock, @unchecked Sendable {
    private var current = Date(timeIntervalSince1970: 0)
    func now() -> Date { current }
    func set(_ date: Date) { current = date }
}

/// The additive Student operations on the prototype backend.
final class StudentExtrasRepositoryTests: XCTestCase {
    private let aarav = DemoSeed.sampleStudent.id
    private let mess = DemoSeed.mess.id
    private let lunch = DemoSeed.lunch.id

    private func make() -> (DemoDataProvider, ExtrasClock) {
        let clock = ExtrasClock()
        return (DemoDataProvider(scenario: .storyStart, clock: clock), clock)
    }

    private func entry(_ key: String) -> EntryRequest {
        EntryRequest(mealID: lunch, student: DemoSeed.sampleStudent, method: .typedLastFour, idempotencyKey: IdempotencyKey(key))
    }

    // MARK: Home extras

    func testTheSamplesAreTheOnesDrawnOnHome() async throws {
        let (demo, clock) = make()
        clock.set(DemoSeed.storyStartNow)
        let extras = try await demo.homeExtras(for: aarav, mess: mess)
        XCTAssertEqual(extras.credits, 120)
        XCTAssertEqual(extras.pass, StudentPassRow(meal: DemoSeed.lunch, status: .open))
        XCTAssertFalse(extras.isMessClosed)
        XCTAssertEqual(extras.laterMeal, DemoSeed.dinner)
    }

    // MARK: Crowd: recorded entries only

    /// Before any entry, Entered so far is a real zero and Still expected counts the I'm in answers.
    func testHomeCrowdComesFromTheRecordsNotFromSamples() async throws {
        let (demo, clock) = make()
        clock.set(DemoSeed.storyStartNow)
        let extras = try await demo.homeExtras(for: aarav, mess: mess)
        let crowd = try XCTUnwrap(extras.crowd)
        let page = try await demo.crowd(at: mess)
        XCTAssertEqual(crowd.enteredSoFar, page.enteredSoFar, "Home and Crowd read the same counts")
        XCTAssertEqual(crowd.stillExpected, page.stillExpected)
        XCTAssertNotNil(page.enteredSoFar.value)
    }

    /// A recorded entry raises Entered so far and lowers Still expected for a student who said I'm in. A repeat scan
    /// changes neither; a walk-in raises Entered so far without lowering Still expected.
    func testEntriesWalkInsAndRepeatsCountAsRecorded() async throws {
        let (demo, clock) = make()
        clock.set(DemoSeed.time(8, 30))
        _ = try await demo.setIntention(.attending, of: aarav, for: lunch)
        clock.set(DemoSeed.time(12, 10))
        _ = try await demo.startMeal(lunch, by: .supervisor)
        let before = try await demo.crowd(at: mess)
        let enteredBefore = try XCTUnwrap(before.enteredSoFar.value)
        let expectedBefore = try XCTUnwrap(before.stillExpected.value)

        _ = try await demo.recordEntry(entry("crowd-aarav"))
        let after = try await demo.crowd(at: mess)
        XCTAssertEqual(after.enteredSoFar.value, enteredBefore + 1)
        XCTAssertEqual(after.stillExpected.value, expectedBefore - 1)
        XCTAssertEqual(after.intervals.map(\.entries).reduce(0, +), enteredBefore + 1, "The chart sums to Entered so far")

        _ = try await demo.recordEntry(EntryRequest(mealID: lunch, student: DemoSeed.sampleStudent, method: .typedLastFour,
                                                    idempotencyKey: IdempotencyKey("crowd-aarav-again")))
        let repeated = try await demo.crowd(at: mess)
        XCTAssertEqual(repeated.enteredSoFar, after.enteredSoFar, "A repeat scan changes nothing")
        XCTAssertEqual(repeated.stillExpected, after.stillExpected)
    }

    func testCountingRuleKeepsMissingApartFromZero() {
        let meal = DemoSeed.lunch
        let missing = StudentCrowd.counted(meal: meal, state: .inService, now: DemoSeed.time(12, 20), entries: nil, attending: nil)
        XCTAssertEqual(missing.enteredSoFar, .unavailable)
        XCTAssertEqual(missing.stillExpected, .unavailable)
        XCTAssertTrue(missing.intervals.isEmpty)

        let none = StudentCrowd.counted(meal: meal, state: .inService, now: DemoSeed.time(12, 20), entries: [], attending: [])
        XCTAssertEqual(none.enteredSoFar.value, 0)
        XCTAssertEqual(none.stillExpected.value, 0)
        XCTAssertEqual(none.intervals.count, 2, "12:00 and 12:15 so far, every 15 minutes")
        XCTAssertEqual(none.currentInterval, 1)
    }

    func testCountingRuleDeduplicatesAndBucketsByFirstEntry() {
        let meal = DemoSeed.lunch
        let a = StudentRef(id: StudentID("a"), maskedID: "••0001")
        let walkIn = StudentRef(id: StudentID("walk-in"), maskedID: "••0002")
        func record(_ ref: StudentRef, _ hour: Int, _ minute: Int, meal id: MealID = DemoSeed.lunch.id) -> EntryRecord {
            EntryRecord(id: EntryID(UUID().uuidString), mealID: id, student: ref, recordedAt: DemoSeed.time(hour, minute),
                        method: .typedLastFour, hadMealResponse: true)
        }
        let entries = [record(a, 12, 20), record(a, 12, 50), record(walkIn, 12, 40), record(a, 12, 5, meal: DemoSeed.dinner.id)]
        let crowd = StudentCrowd.counted(meal: meal, state: .closed, now: DemoSeed.time(15, 0), entries: entries,
                                         attending: [a.id, StudentID("b")])
        XCTAssertEqual(crowd.enteredSoFar.value, 2, "Each student once; another meal's entry is not counted")
        XCTAssertEqual(crowd.stillExpected.value, 1, "Only b said I'm in and has no entry; the walk-in lowers nothing")
        XCTAssertEqual(crowd.intervals[1].entries, 1, "a's first entry, 12:20")
        XCTAssertEqual(crowd.intervals[2].entries, 1, "the walk-in, 12:40")
        XCTAssertNil(crowd.currentInterval, "Nothing is current once the meal closed")
    }

    func testBeforeServiceThereIsNoChart() {
        let crowd = StudentCrowd.counted(meal: DemoSeed.lunch, state: .notStarted, now: DemoSeed.time(9, 0), entries: [], attending: [])
        XCTAssertTrue(crowd.intervals.isEmpty)
        XCTAssertEqual(crowd.enteredSoFar.value, 0)
    }

    func testAStudentWithNoPassHasNoRow() async throws {
        let (demo, _) = make()
        let extras = try await demo.homeExtras(for: StudentID("demo-student-0412"), mess: mess)
        XCTAssertNil(extras.pass)
    }

    /// Owner decision, 16 Nov 2026: the demo pass is not closed by the clock; only using it ends it.
    func testThePassRowStaysOpenAfterItsMealUntilUsed() async throws {
        let (demo, _) = make()
        _ = try await demo.startMeal(lunch, by: .supervisor)
        _ = try await demo.closeMeal(lunch, by: .supervisor)
        let extras = try await demo.homeExtras(for: aarav, mess: mess)
        XCTAssertEqual(extras.pass?.status, .open)
    }

    func testExtrasAreNotServedOffline() async throws {
        let demo = DemoDataProvider(scenario: .offline)
        do {
            _ = try await demo.homeExtras(for: aarav, mess: mess)
            XCTFail("Expected offline")
        } catch RepositoryError.offline {}
    }

    // MARK: Menus and dinner

    func testTheStudentMenusAreTheDrawnOnes() async throws {
        let (demo, _) = make()
        let breakfast = try await demo.studentMenu(for: DemoSeed.breakfast.id)
        let lunchMenu = try await demo.studentMenu(for: lunch)
        let dinner = try await demo.studentMenu(for: DemoSeed.dinner.id)
        XCTAssertEqual(breakfast.map(\.name), ["Millet Idli", "Pongal"])
        XCTAssertEqual(lunchMenu.map(\.name), ["Bhindi Aloo Bujjiya", "Chappathi", "Veg Pulao", "Muttar Masala"])
        XCTAssertEqual(dinner.count, 5)
        XCTAssertEqual(dinner.first { $0.diet == .nonVeg }?.name, "Butter Chicken Masala")
    }

    func testTheKitchenMenuIsUnchanged() async throws {
        let (demo, _) = make()
        let menu = try await demo.menu(for: lunch)
        let breakfast = try await demo.menu(for: DemoSeed.breakfast.id)
        XCTAssertEqual(menu, DemoSeed.lunchMenu)
        XCTAssertEqual(breakfast, [])
    }

    func testDinnerTakesAnAnswerUntilItsOwnCutoff() async throws {
        let (demo, clock) = make()
        clock.set(DemoSeed.storyStartNow)
        _ = try await demo.setIntention(.attending, of: aarav, for: DemoSeed.dinner.id)
        let stored = try await demo.response(of: aarav, for: DemoSeed.dinner.id)
        guard case .answered(.attending, _) = stored else { return XCTFail("Expected the answer") }

        clock.set(IntentionPolicy.cutoff(for: DemoSeed.dinner).addingTimeInterval(1))
        do {
            _ = try await demo.setIntention(.skipping, of: aarav, for: DemoSeed.dinner.id)
            XCTFail("Expected the cutoff to refuse it")
        } catch RepositoryError.notAllowed {}
    }

    func testDinnerIsNotAStaffRunMeal() async throws {
        let (demo, _) = make()
        let meals = try await demo.meals(for: mess)
        XCTAssertEqual(meals.map(\.meal.slot), [.breakfast, .lunch])
    }

    // MARK: Skip reasons

    func testAReasonIsKeptForASkip() async throws {
        let (demo, _) = make()
        _ = try await demo.setIntention(.skipping, of: aarav, for: lunch)
        try await demo.setSkipReason(.eatingElsewhere, of: aarav, for: lunch)
        let reason = try await demo.skipReason(of: aarav, for: lunch)
        XCTAssertEqual(reason, .eatingElsewhere)
    }

    func testAReasonIsRefusedWithoutASkip() async throws {
        let (demo, _) = make()
        _ = try await demo.setIntention(.attending, of: aarav, for: lunch)
        do {
            try await demo.setSkipReason(.notHungry, of: aarav, for: lunch)
            XCTFail("Expected a refusal")
        } catch RepositoryError.notAllowed {}
    }

    func testTheReasonListEqualsTheAdminList() {
        XCTAssertEqual(MealSkipReason.allCases.map(StudentCopy.reason),
                       ["Class or exam", "Home or leave", "Eating elsewhere", "Don't like the dish", "Dietary reason",
                        "Not hungry", "Other", "Prefer not to say"])
    }

    // MARK: Entry standing and the rotating code

    func testStandingFollowsTheDoor() async throws {
        let (demo, clock) = make()
        var standing = try await demo.entryStanding(of: aarav, for: lunch, at: mess)
        XCTAssertEqual(standing, .notScanned)

        _ = try await demo.startMeal(lunch, by: .supervisor)
        let at = clock.now()
        _ = try await demo.recordEntry(entry("first"))
        standing = try await demo.entryStanding(of: aarav, for: lunch, at: mess)
        XCTAssertEqual(standing, .scanned(at: at))

        _ = try await demo.recordEntry(entry("second"))
        standing = try await demo.entryStanding(of: aarav, for: lunch, at: mess)
        XCTAssertEqual(standing, .scannedAgain(firstAt: at))
    }

    func testARepeatOfTheSameRequestIsNotASecondScan() async throws {
        let (demo, clock) = make()
        _ = try await demo.startMeal(lunch, by: .supervisor)
        let at = clock.now()
        _ = try await demo.recordEntry(entry("same"))
        _ = try await demo.recordEntry(entry("same"))
        let standing = try await demo.entryStanding(of: aarav, for: lunch, at: mess)
        XCTAssertEqual(standing, .scanned(at: at))
    }

    func testARepeatScanAddsNothingToTheCount() async throws {
        let (demo, _) = make()
        _ = try await demo.startMeal(lunch, by: .supervisor)
        _ = try await demo.recordEntry(entry("first"))
        _ = try await demo.recordEntry(entry("second"))
        let count = try await demo.liveCount(for: lunch)
        XCTAssertEqual(count.value, 1)
    }

    func testAnotherMessIsTheWrongMess() async throws {
        let (demo, _) = make()
        let standing = try await demo.entryStanding(of: aarav, for: lunch, at: MessID("another-mess"))
        XCTAssertEqual(standing, .wrongMess(homeMess: "Main Mess"))
    }

    func testEachWindowHasItsOwnPayloadAndTheSameLastFour() async throws {
        let (demo, _) = make()
        let first = try await demo.rotatingEntryCode(for: aarav, step: 0)
        let second = try await demo.rotatingEntryCode(for: aarav, step: 1)
        let again = try await demo.rotatingEntryCode(for: aarav, step: 0)
        XCTAssertNotEqual(first.payload, second.payload)
        XCTAssertEqual(first, again)
        XCTAssertEqual(first.lastFour, "0238")
        XCTAssertEqual(second.lastFour, "0238")
    }

    func testTheRotatingCodeWorksOffline() async throws {
        let demo = DemoDataProvider(scenario: .offline)
        let code = try await demo.rotatingEntryCode(for: aarav, step: 3)
        XCTAssertEqual(code.step, 3)
    }

    func testTheTypedLastFourStillResolvesToTheStudent() async throws {
        let (demo, _) = make()
        _ = try await demo.startMeal(lunch, by: .supervisor)
        _ = try await demo.rotatingEntryCode(for: aarav, step: 7)
        let result = try await demo.resolveEntry(.lastFour("0238"), for: lunch)
        XCTAssertEqual(result, .student(DemoSeed.sampleStudent))
    }

    // MARK: Corrections

    private func correction(_ key: String, note: String? = nil) throws -> EntryCorrectionRequest {
        EntryCorrectionRequest(student: aarav, mealID: DemoSeed.sampleCorrectableRecord.mealID, reason: .ateButNotScanned,
                               note: note, idempotencyKey: IdempotencyKey(key))
    }

    func testTheSameKeyKeepsTheFirstRequest() async throws {
        let (demo, clock) = make()
        let first = try await demo.requestEntryCorrection(try correction("k", note: "first"))
        clock.set(DemoSeed.time(8, 0))
        let second = try await demo.requestEntryCorrection(try correction("k", note: "second"))
        XCTAssertEqual(first, second)
    }

    func testAnOfflineCorrectionIsNotStored() async throws {
        let demo = DemoDataProvider(scenario: .offline)
        do {
            _ = try await demo.requestEntryCorrection(try correction("k"))
            XCTFail("Expected offline")
        } catch RepositoryError.offline {}
    }

    func testOnlyTheSampleStudentHasARecordToCorrect() async throws {
        let (demo, _) = make()
        let mine = try await demo.correctableRecord(for: aarav)
        let other = try await demo.correctableRecord(for: StudentID("demo-student-0412"))
        XCTAssertEqual(mine, DemoSeed.sampleCorrectableRecord)
        XCTAssertNil(other)
    }
}
#endif
