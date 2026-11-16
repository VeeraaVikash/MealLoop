#if DEMO_DATA || REVIEW_DATA
import XCTest
@testable import MealLoop

/// The Demo menu's Student states (owner decision, 16 Nov 2026): each moves the story through the data layer, so the
/// screens show the state from the data. SIMULATED prototype data.
final class DemoStatesTests: XCTestCase {
    private let aarav = DemoSeed.sampleStudent.id
    private let mess = DemoSeed.mess.id

    private func request(_ key: String) -> StudentReportRequest {
        StudentReportRequest(student: aarav, messID: mess, category: .ranOut, note: nil, place: "Main Mess",
                             meal: .lunch, idempotencyKey: IdempotencyKey(key))
    }

    func testLunchServingStartsLunchAndAfterLunchClosesIt() async throws {
        let demo = DemoDataProvider(scenario: .storyStart)
        await demo.jump(to: .lunchServing)
        XCTAssertEqual(demo.clock.now(), DemoMoment.lunchServing.time)
        let serving = try await demo.currentMeal(for: mess)
        XCTAssertEqual(serving?.state, .inService)
        await demo.jump(to: .afterLunch)
        let after = try await demo.currentMeal(for: mess)
        XCTAssertEqual(after?.state, .closed)
    }

    func testAnEntryIsRecordedOnlyWhileAMealIsServed() async throws {
        let demo = DemoDataProvider(scenario: .storyStart)
        let before = await demo.recordSampleEntry()
        XCTAssertFalse(before, "No meal is being served at 7 AM")
        await demo.jump(to: .lunchServing)
        let during = await demo.recordSampleEntry()
        XCTAssertTrue(during)
        let standing = try await demo.entryStanding(of: aarav, for: DemoSeed.lunch.id, at: mess)
        XCTAssertTrue(standing.isRecorded)
    }

    func testOfflineIsRefusedThenWorksAgain() async throws {
        let demo = DemoDataProvider(scenario: .storyStart)
        await demo.setOffline(true)
        let offline = await demo.isOfflineNow
        XCTAssertTrue(offline)
        do {
            _ = try await demo.currentMeal(for: mess)
            XCTFail("Offline must refuse")
        } catch {}
        await demo.setOffline(false)
        _ = try await demo.currentMeal(for: mess)
    }

    /// A report sent in the run is listed on My reports and moves Sent, Seen, Working on it, Fixed.
    func testASentReportIsListedAndMovesOneStepAtATime() async throws {
        let demo = DemoDataProvider(scenario: .storyStart)
        let records = demo.makeRepositories().student.records
        let moved = await demo.advanceLatestReport()
        XCTAssertFalse(moved, "Nothing to move before a report is sent")
        let receipt = try await demo.submitReport(request("demo-states-1"))
        var listed = try await records.reports(for: aarav)
        XCTAssertEqual(listed.first?.reference, receipt.reference)
        XCTAssertEqual(listed.first?.stage, .sent)
        for stage in [StudentFiledReportStage.seen, .workingOnIt, .fixed] {
            let step = await demo.advanceLatestReport()
            XCTAssertTrue(step)
            listed = try await records.reports(for: aarav)
            XCTAssertEqual(listed.first { $0.reference == receipt.reference }?.stage, stage)
        }
        let done = await demo.advanceLatestReport()
        XCTAssertFalse(done, "A fixed report does not move")
        let opened = try await records.report(StudentFiledReportID("run-\(receipt.reference)"), for: aarav)
        XCTAssertEqual(opened.stage, .fixed)
    }
}
#endif
