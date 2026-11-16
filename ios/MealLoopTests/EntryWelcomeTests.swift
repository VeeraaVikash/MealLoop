import XCTest
@testable import MealLoop

/// The front door: no recent account is offered and nothing about one is kept; the walkthrough, then Sign in.
@MainActor
final class EntryWelcomeTests: XCTestCase {
    func testSigningOutKeepsNoAccountForWelcomeToOffer() {
        let store = SessionStore()
        XCTAssertNil(store.current)
        // The store holds the current session and nothing else, so Welcome has no "Continue as" account to show.
        let stored = Mirror(reflecting: store).children.compactMap(\.label).filter { !$0.contains("observationRegistrar") }
        XCTAssertEqual(stored, ["_current"])
    }

    func testTheWalkthroughHasTheFourPacksPages() {
        XCTAssertEqual(EntryCopy.signIn, "Sign in")
        XCTAssertEqual(EntryCopy.pages.map(\.title), ["For Students", "Attendance & Meals", "Crowd Tracking", "Credits & Incentives"])
        XCTAssertEqual(EntryCopy.pages.map(\.extra), [.none, .cutoffs, .crowd, .credits])
        XCTAssertNil(EntryCopy.pages[3].body, "Credits & Incentives has no line under its title")
    }

    /// Owner decision, 16 Nov 2026: the cutoffs on Attendance & Meals are the rule the answer buttons follow.
    func testTheCutoffChipsComeFromTheCutoffRule() {
        XCTAssertEqual(EntryCopy.cutoffChip(.breakfast).main, "Before 10:00 PM")
        XCTAssertEqual(EntryCopy.cutoffChip(.breakfast).note, "(previous night)")
        XCTAssertEqual(EntryCopy.cutoffChip(.lunch).main, "By 9:00 AM")
        XCTAssertEqual(EntryCopy.cutoffChip(.dinner).main, "By 2:00 PM")
        XCTAssertNil(EntryCopy.cutoffChip(.lunch).note)
    }

    /// The amounts on Credits & Incentives are the ledger's own rule, never a separate number.
    func testTheCreditAmountsComeFromTheLedgerRule() {
        XCTAssertEqual(EntryCopy.points(StudentCreditRule.yesAttend), "+5 pts")
        XCTAssertEqual(EntryCopy.points(StudentCreditRule.yesMiss), "\u{2212}3 pts")
    }

    func testTheTermsAreTheFramesTwoLines() {
        XCTAssertEqual(EntryCopy.termsLead, "By continuing, you agree to the")
        XCTAssertEqual(EntryCopy.termsLink, "Terms and Privacy Policy")
    }
}
