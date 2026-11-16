#if DEMO_DATA || REVIEW_DATA
import XCTest
@testable import MealLoop

/// The additive Student You operations on the prototype backend: notifications, credits and attendance.
final class StudentYouRepositoryTests: XCTestCase {
    private let aarav = DemoSeed.sampleStudent.id
    private let stranger = StudentID("demo-student-unknown")
    private let mess = DemoSeed.mess.id

    private func make() -> (DemoDataProvider, any StudentYouRepository) {
        let demo = DemoDataProvider(scenario: .storyStart)
        return (demo, demo.makeRepositories().student.you)
    }

    func testNotificationsNewestFirstWithTheirReadState() async throws {
        let (_, you) = make()
        let notes = try await you.notifications(for: aarav)
        XCTAssertEqual(notes.map(\.title), ["Guardian approved", "Breakfast today?", "Feedback seen", "Special pass"])
        XCTAssertEqual(notes.map(\.isRead), [false, false, true, true])
    }

    func testMarkingReadIsKeptAndRepeatsChangeNothing() async throws {
        let (_, you) = make()
        let id = StudentNotificationID("demo-note-guardian-approved")
        let first = try await you.markRead(id, for: aarav)
        XCTAssertTrue(first.isRead)
        _ = try await you.markRead(id, for: aarav)
        let notes = try await you.notifications(for: aarav)
        XCTAssertEqual(notes.filter { !$0.isRead }.map(\.title), ["Breakfast today?"])
    }

    func testAStudentWithNoNotificationsGetsAnEmptyList() async throws {
        let (_, you) = make()
        let notes = try await you.notifications(for: stranger)
        XCTAssertTrue(notes.isEmpty)
    }

    /// Owner rules, 16 Nov 2026: +5, -3, -2, -2, +2, and every student starts with 20.
    func testTheRulesFollowTheOwnersTable() {
        let at = DemoSeed.storyStartNow
        XCTAssertEqual(StudentCreditRule.startingBalance, 20)
        XCTAssertEqual(StudentCreditRule.points(for: .answered(.attending, at: at), outcome: .attended), 5)
        XCTAssertEqual(StudentCreditRule.points(for: .answered(.attending, at: at), outcome: .missed), -3)
        XCTAssertEqual(StudentCreditRule.points(for: .noResponse, outcome: .missed), -2)
        XCTAssertEqual(StudentCreditRule.points(for: .noResponse, outcome: .attended), -2)
        XCTAssertEqual(StudentCreditRule.points(for: .answered(.skipping, at: at), outcome: .attended), -2)
        XCTAssertEqual(StudentCreditRule.points(for: .answered(.skipping, at: at), outcome: .missed), 2)
        XCTAssertEqual(StudentCreditRule.points(for: .answered(.notSure, at: at), outcome: .attended), 0)
    }

    func testTheSampleBalanceBeforeAnyAnswerInThisRun() async throws {
        let (_, you) = make()
        let credits = try await you.credits(for: aarav)
        XCTAssertEqual(credits.balance, 120)
        XCTAssertEqual(credits.nextGoal?.ticket.name, "Biryani coupon")
        XCTAssertEqual(credits.nextGoal?.missing, 80)
    }

    /// Owner rules, 16 Nov 2026: a meal settles once it has ended, by the answer and whether an entry was recorded.
    func testEachMealSettlesByTheRulesOnceItEnds() async throws {
        let (demo, you) = make()
        _ = try await demo.setIntention(.attending, of: aarav, for: DemoSeed.lunch.id)
        _ = try await demo.setIntention(.skipping, of: aarav, for: DemoSeed.dinner.id)
        let before = try await you.credits(for: aarav)
        XCTAssertEqual(before.balance, 120, "Nothing settles before a meal ends.")
        demo.clock.set(DemoSeed.lunch.endsAt.addingTimeInterval(60))
        let afterLunch = try await you.credits(for: aarav)
        // Breakfast had no answer (-2); lunch was a yes with no entry (-3).
        XCTAssertEqual(afterLunch.balance, 115)
        XCTAssertEqual(afterLunch.history.first?.title, "Said yes and missed lunch")
        XCTAssertEqual(afterLunch.history.first?.points, -3)
        demo.clock.set(DemoSeed.dinner.endsAt.addingTimeInterval(60))
        let afterDinner = try await you.credits(for: aarav)
        XCTAssertEqual(afterDinner.balance, 117, "Skip and skip earns 2.")
    }

    func testAnUnknownStudentHasNoBalanceRatherThanZero() async throws {
        let (_, you) = make()
        let credits = try await you.credits(for: stranger)
        XCTAssertNil(credits.balance)
        XCTAssertNil(credits.nextGoal)
        let profile = try await you.profile(for: stranger, at: mess)
        XCTAssertNil(profile.credits)
    }



    func testOfflineIsAnErrorNotAnEmptyInbox() async throws {
        let demo = DemoDataProvider(scenario: .offline)
        let you = demo.makeRepositories().student.you
        do {
            _ = try await you.notifications(for: aarav)
            XCTFail("Offline must throw.")
        } catch RepositoryError.offline {
        }
    }

    func testASourceWithoutTheServiceSaysSo() async {
        do {
            _ = try await NotConnected().credits(for: aarav)
            XCTFail("Must throw.")
        } catch RepositoryError.notImplemented {
        } catch {
            XCTFail("Unexpected \(error)")
        }
    }
}
#endif
