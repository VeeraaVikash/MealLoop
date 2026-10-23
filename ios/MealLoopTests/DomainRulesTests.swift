import XCTest
@testable import MealLoop

final class DomainRulesTests: XCTestCase {
    private let ist = TimeZone(identifier: "Asia/Kolkata")!

    private func date(_ hour: Int, _ minute: Int) -> Date {
        var calendar = Calendar(identifier: .gregorian)
        calendar.timeZone = ist
        return calendar.date(from: DateComponents(year: 2024, month: 8, day: 14, hour: hour, minute: minute))!
    }

    // MARK: Intentions

    func testCutoffIsTwoHoursBeforeTheMeal() {
        let meal = Meal(id: MealID("lunch"), messID: MessID("mess"), slot: .lunch, startsAt: date(12, 0), endsAt: date(14, 0))
        XCTAssertEqual(IntentionPolicy.cutoff(for: meal), date(10, 0))
        XCTAssertTrue(IntentionPolicy.canAnswer(meal, at: date(9, 59)))
        XCTAssertFalse(IntentionPolicy.canAnswer(meal, at: date(10, 0)))
    }

    func testNoResponseIsNotASkip() {
        XCTAssertNotEqual(IntentionResponse.noResponse, .answered(.skipping, at: date(9, 0)))
        XCTAssertEqual(MealIntention.attending.rawValue, "in")
    }

    // MARK: Outings

    private let evidence = GuardianEvidence(method: .liveVideoAutoChecked, capturedAt: Date(timeIntervalSince1970: 0))

    func testApprovalDoesNotMeanTheStudentLeft() throws {
        var state = OutingState.awaitingGuardian
        state = try state.applying(.guardianAnswered(.approved(evidence)))
        state = try state.applying(.wardenApproved)
        XCTAssertEqual(state, .passIssued)
        XCTAssertFalse(state.studentHasLeft)
        state = try state.applying(.gateExit(at: date(14, 4)))
        XCTAssertTrue(state.studentHasLeft)
        state = try state.applying(.gateReturn(at: date(19, 41)))
        XCTAssertEqual(state, .returned(exitedAt: date(14, 4), returnedAt: date(19, 41)))
    }

    func testMissedDeadlineEscalatesAndNeverApproves() throws {
        let state = try OutingState.awaitingWarden(evidence).applying(.deadlinePassed)
        XCTAssertEqual(state, .escalated(previous: .awaitingWarden))
    }

    func testReturnWithoutExitIsRejected() {
        XCTAssertThrowsError(try OutingState.passIssued.applying(.gateReturn(at: date(19, 0))))
    }

    func testGuardianCallPathCapturesNoFaceButEveryOtherMethodDoes() {
        for method in GuardianEvidenceMethod.allCases {
            let captured = GuardianEvidence(method: method, capturedAt: Date()).capturesGuardianFace
            XCTAssertEqual(captured, method != .confirmedByCall, "\(method)")
        }
    }

    // MARK: Community

    func testIssueCannotBeMarkedFixedWithoutARecordedAction() {
        var issue = CommunityIssue(id: CommunityIssueID("i"), messID: MessID("m"), title: "Long wait",
                                   supporters: Set([StudentID("a"), StudentID("a"), StudentID("b")]), status: .seen, actions: [])
        XCTAssertEqual(issue.supportCount, 2, "Each student counts once")
        XCTAssertFalse(issue.canMarkFixed)
        issue.actions.append(CorrectiveAction(owner: "Kitchen", investigated: "Queue", actionTaken: "Second counter", at: Date()))
        XCTAssertTrue(issue.canMarkFixed)
        XCTAssertNil(CommunityPolicy.supportThreshold, "The threshold is an open decision")
    }

    // MARK: Formatting

    func testElapsedTime() {
        XCTAssertEqual(MLFormat.elapsed(minutes: 100), "1 h 40 min")
        XCTAssertEqual(MLFormat.elapsed(minutes: 55), "55 min")
        XCTAssertEqual(MLFormat.elapsed(minutes: 120), "2 h")
    }

    func testTimesUseTheMessTimeZone() {
        XCTAssertEqual(MLFormat.time(date(13, 40), in: ist), "1:40 PM")
        XCTAssertEqual(MLFormat.timeRange(date(12, 0), date(14, 0), in: ist), "12–2 PM")
        XCTAssertEqual(MLFormat.timeRange(date(7, 30), date(9, 30), in: ist), "7:30–9:30 AM")
        XCTAssertEqual(MLFormat.timeRange(date(11, 30), date(13, 0), in: ist), "11:30 AM–1 PM")
    }
}
