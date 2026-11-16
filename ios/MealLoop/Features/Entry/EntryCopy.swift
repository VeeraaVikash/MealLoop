import Foundation

/// Interface copy for the walkthrough and Sign in. This is wording, not data.
/// Layout from the student redesign references (walkthrough, Sign In and Register as Student, 15 Nov 2026); the
/// sample cutoff times, crowd cadence and credit amounts in those images are illustrations and are not used here.
enum EntryCopy {
    static let wordmark = "MealLoop"
    static let tagline = "Hostel meals, without the waste."
    static let termsLead = "By continuing, you agree to the"
    static let termsLink = "Terms and Privacy Policy"

    // MARK: Walkthrough

    /// What sits under a page's illustration (SVG pack `screens/*.svg`, 16 Nov 2026).
    enum Extra: Hashable {
        case none
        case cutoffs
        case crowd
        case credits
    }

    struct Page: Identifiable, Hashable {
        let id: Int
        let title: String
        /// Nil when the reference has no line under the title (Credits & Incentives).
        let body: String?
        /// An illustration from the MealLoop SVG pack, recoloured to the brand tokens.
        let art: String
        let artLabel: String
        let extra: Extra
    }

    static let pages: [Page] = [
        Page(id: 0, title: "For Students", body: "Your all-in-one mess companion at SRM.",
             art: "entry-student-with-phone", artLabel: "A student using MealLoop on a phone", extra: .none),
        Page(id: 1, title: "Attendance & Meals", body: "Vote for meals and scan the QR at the mess to mark attendance.",
             art: "entry-qr-phone", artLabel: "A phone showing an entry QR", extra: .cutoffs),
        Page(id: 2, title: "Crowd Tracking", body: "See how busy the mess is in real time, updated every 15 minutes.",
             art: "entry-crowd-chart", artLabel: "A bar chart of the crowd", extra: .crowd),
        Page(id: 3, title: "Credits & Incentives", body: nil,
             art: "entry-credits-gift", artLabel: "Coins and a gift", extra: .credits),
    ]

    /// The meals on Attendance & Meals, in the reference's order. Snacks is not in it.
    static let cutoffMeals: [MealSlot] = [.breakfast, .lunch, .dinner]

    /// "Before 10:00 PM" with "(previous night)", or "By 9:00 AM", from `IntentionPolicy.fixedCutoff`.
    static func cutoffChip(_ slot: MealSlot) -> (main: String, note: String?) {
        guard let fixed = IntentionPolicy.fixedCutoff(for: slot) else { return ("", nil) }
        let hour12 = fixed.hour % 12 == 0 ? 12 : fixed.hour % 12
        let time = String(format: "%d:%02d %@", hour12, fixed.minute, fixed.hour < 12 ? "AM" : "PM")
        return fixed.daysBefore > 0 ? ("Before \(time)", "(previous night)") : ("By \(time)", nil)
    }

    static let crowdUpdatesLead = "Updates every"
    static let crowdUpdatesValue = "15 min"
    static let crowdCountLead = "See current"
    static let crowdCountValue = "crowd count"
    static let startWith = "You start with"
    static func startingCredits(_ credits: Int) -> String { "\(credits) credits" }
    /// The five rules (owner table, 16 Nov 2026), in its order; amounts from `StudentCreditRule`.
    static let creditRules: [(title: String, points: Int)] = [
        ("Vote Yes + Attend", StudentCreditRule.yesAttend),
        ("Vote Yes + Miss", StudentCreditRule.yesMiss),
        ("No voting", StudentCreditRule.noVote),
        ("Vote Skip + Attend", StudentCreditRule.skipAttend),
        ("Vote Skip + Skip", StudentCreditRule.skipSkip),
    ]
    static func points(_ value: Int) -> String { value > 0 ? "+\(value) pts" : "\u{2212}\(abs(value)) pts" }
    static let useCreditsLead = "Use credits to"
    static let useCreditsValue = "unlock incentives."

    static let next = "Next"
    static let back = "Back"
    static let getStarted = "Get Started"
    static func pageValue(_ index: Int, of count: Int) -> String { "Page \(index + 1) of \(count)" }

    // MARK: Sign in

    static let signInTitle = "Sign in"
    static let signInSubtitle = "Welcome back. Use the email of your MealLoop account."
    static let emailLabel = "Email"
    static let passwordLabel = "Password"
    static let showPassword = "Show password"
    static let hidePassword = "Hide password"
    static let forgotPassword = "Forgot password?"
    /// No reset flow exists yet (REG-4).
    static let forgotPasswordMessage = "Password reset isn't available yet. Ask your hostel office or administrator."
    static let signIn = "Sign in"
    static let wrongCredentials = "The email or password is incorrect."
    static let tryAgain = "Try again"
    static let staffNote = "Staff accounts are created by your administrator."
}
