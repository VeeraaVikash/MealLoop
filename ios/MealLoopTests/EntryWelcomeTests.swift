import XCTest
@testable import MealLoop

/// The front door: no recent account is offered and nothing about one is kept; one Sign in, one Register.
@MainActor
final class EntryWelcomeTests: XCTestCase {
    func testSigningOutKeepsNoAccountForWelcomeToOffer() {
        let store = SessionStore()
        XCTAssertNil(store.current)
        // The store holds the current session and nothing else, so Welcome has no "Continue as" account to show.
        let stored = Mirror(reflecting: store).children.compactMap(\.label).filter { !$0.contains("observationRegistrar") }
        XCTAssertEqual(stored, ["_current"])
    }

    func testTheEntryOffersOneSignInAndOneRegister() {
        XCTAssertEqual(EntryCopy.signIn, "Sign in")
        XCTAssertEqual(EntryCopy.register, "Register")
        XCTAssertEqual(EntryCopy.pages.map(\.title), ["For Students", "Attendance & Meals", "Crowd Tracking", "Credits & Incentives"])
    }

    /// The walkthrough copy claims only what the app does: no amounts, penalties, starting balances or cadence.
    func testTheWalkthroughMakesNoUnsupportedClaims() {
        for page in EntryCopy.pages {
            for word in ["pts", "+", "−", "penalt", "start with", "every 15", "minute"] {
                XCTAssertFalse(page.body.localizedCaseInsensitiveContains(word), "\(page.title): \(word)")
            }
        }
    }

    func testTheTermsAreTheFramesTwoLines() {
        XCTAssertEqual(EntryCopy.termsLead, "By continuing, you agree to the")
        XCTAssertEqual(EntryCopy.termsLink, "Terms and Privacy Policy")
    }
}
