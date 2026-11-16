#if DEMO_DATA || REVIEW_DATA
import SwiftUI
import XCTest
@testable import MealLoop

/// A clock the tests own.
private final class FixedClock: StoryClock, @unchecked Sendable {
    private var current: Date
    init(_ date: Date) { current = date }
    func now() -> Date { current }
    func set(_ date: Date) { current = date }
}

/// The Demo sheet's controls and the shared clock. Sign in and Register are in `AccountSignInTests`.
final class GettingStartedAndDemoTests: XCTestCase {
    private let lunch = DemoSeed.lunch
    private let aarav = DemoSeed.sampleStudent.id

    private func clean() -> (DemoDataProvider, FixedClock) {
        let clock = FixedClock(DemoSeed.storyStartNow)
        return (DemoDataProvider(scenario: .storyStart, clock: clock), clock)
    }

    // MARK: Shared clock

    func testStartingAndClosingTheMealDoesNotMoveTheClock() async throws {
        let (demo, clock) = clean()
        _ = try await demo.startMeal(lunch.id, by: .supervisor)
        XCTAssertEqual(clock.now(), DemoSeed.storyStartNow)
        _ = try await demo.closeMeal(lunch.id, by: .supervisor)
        XCTAssertEqual(clock.now(), DemoSeed.storyStartNow)
    }

    func testApprovingTheHeadcountDoesNotMoveTheClock() async throws {
        let (demo, clock) = clean()
        _ = try await demo.approveHeadcount(DemoSeed.forecastDiners, reason: nil, for: lunch.id, by: .admin)
        XCTAssertEqual(clock.now(), DemoSeed.storyStartNow)
    }

    func testTheRunningClockStartsAtTheSeedAndMovesOn() async throws {
        let clock = RunningDemoClock(startingAt: DemoSeed.storyStartNow)
        let first = clock.now()
        XCTAssertGreaterThanOrEqual(first, DemoSeed.storyStartNow)
        XCTAssertLessThan(first, DemoSeed.storyStartNow.addingTimeInterval(5))
        try await Task.sleep(for: .milliseconds(50))
        XCTAssertGreaterThan(clock.now(), first)
    }

    // MARK: Switch role (keeps data)

    /// The Student answers, the Demo sheet switches to the Food Head: the answer and the time are both still there.
    func testSwitchingRoleKeepsTheDataAndTheTime() async throws {
        let (demo, clock) = clean()
        _ = try await demo.setIntention(.skipping, of: aarav, for: lunch.id)
        let before = clock.now()

        let foodHead = await demo.demoSession(for: .admin)
        XCTAssertEqual(foodHead?.account.role, .admin)
        let student = await demo.demoSession(for: .student)
        XCTAssertEqual(student?.student?.student.id, aarav)

        XCTAssertEqual(clock.now(), before)
        let answer = try await demo.response(of: aarav, for: lunch.id)
        guard case .answered(.skipping, _) = answer else { return XCTFail("The answer was lost: \(answer)") }
    }

    func testEveryRoleOnTheSheetHasASeededAccount() async {
        let (demo, _) = clean()
        for role in [Role.student, .admin, .superAdmin, .supervisor, .kitchenStaff, .doorScanner, .passDesk, .vendor,
                     .guardian, .warden, .gate] {
            let session = await demo.demoSession(for: role)
            XCTAssertEqual(session?.account.role, role)
        }
    }
}
#endif

#if DEMO_DATA || REVIEW_DATA
/// Student type scaling.
final class StudentTypeScalingTests: XCTestCase {
    func testStudentTextScalesAndIsCappedForTheDesignedRows() {
        XCTAssertEqual(StudentType.largestSize, .accessibility1)
        XCTAssertEqual(StudentType.body, Font.custom("Inter-Regular", size: 17, relativeTo: .body))
    }
}
#endif
