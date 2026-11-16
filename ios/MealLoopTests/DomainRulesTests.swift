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

    /// Owner decision, 16 Nov 2026: breakfast before 10 PM the night before, lunch by 9 AM, dinner by 2 PM; snacks
    /// keeps the two-hour rule.
    func testTheCutoffsAreTheOwnersTimes() {
        let lunch = Meal(id: MealID("lunch"), messID: MessID("mess"), slot: .lunch, startsAt: date(12, 0), endsAt: date(14, 0))
        XCTAssertEqual(IntentionPolicy.cutoff(for: lunch), date(9, 0))
        XCTAssertTrue(IntentionPolicy.canAnswer(lunch, at: date(8, 59)))
        XCTAssertFalse(IntentionPolicy.canAnswer(lunch, at: date(9, 0)))
        let dinner = Meal(id: MealID("dinner"), messID: MessID("mess"), slot: .dinner, startsAt: date(19, 30), endsAt: date(21, 30))
        XCTAssertEqual(IntentionPolicy.cutoff(for: dinner), date(14, 0))
        let breakfast = Meal(id: MealID("breakfast"), messID: MessID("mess"), slot: .breakfast, startsAt: date(7, 30), endsAt: date(9, 30))
        XCTAssertEqual(IntentionPolicy.cutoff(for: breakfast), date(22, 0).addingTimeInterval(-24 * 3600))
        let snacks = Meal(id: MealID("snacks"), messID: MessID("mess"), slot: .snacks, startsAt: date(16, 30), endsAt: date(17, 30))
        XCTAssertEqual(IntentionPolicy.cutoff(for: snacks), date(14, 30))
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
