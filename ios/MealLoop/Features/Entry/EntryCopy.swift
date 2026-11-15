import Foundation

/// Interface copy for the walkthrough, Sign in and Register. This is wording, not data.
/// Layout from the student redesign references (walkthrough, Sign In and Register as Student, 15 Nov 2026); the
/// sample cutoff times, crowd cadence and credit amounts in those images are illustrations and are not used here.
enum EntryCopy {
    static let wordmark = "MealLoop"
    static let tagline = "Hostel meals, without the waste."
    static let termsLead = "By continuing, you agree to the"
    static let termsLink = "Terms and Privacy Policy"

    // MARK: Walkthrough

    struct Page: Identifiable, Hashable {
        let id: Int
        let title: String
        let body: String
        /// An illustration from the MealLoop SVG pack, recoloured to the brand tokens.
        let art: String
        let artLabel: String
    }

    static let pages: [Page] = [
        Page(id: 0, title: "For Students", body: "Your mess companion at SRM: meals, entry and feedback in one place.",
             art: "entry-student-with-phone", artLabel: "A student using MealLoop on a phone"),
        Page(id: 1, title: "Attendance & Meals",
             body: "Say if you're eating before each meal's cutoff, then show your entry QR at the mess. Home shows every cutoff.",
             art: "entry-qr-phone", artLabel: "A phone showing an entry QR"),
        Page(id: 2, title: "Crowd Tracking",
             body: "See how many students have entered so far and how many are still expected.",
             art: "entry-crowd-chart", artLabel: "A bar chart of entries"),
        // Only what the ledger does: a definite answer before the cutoff earns; tickets cost credits.
        Page(id: 3, title: "Credits & Incentives",
             body: "Earn credits when you answer I'm in or Skip before the cutoff. Spend them on tickets at your mess counter.",
             art: "entry-credits-gift", artLabel: "Coins and a gift"),
    ]

    static let next = "Next"
    static let back = "Back"
    static let getStarted = "Get started"
    static let skipToSignIn = "Sign in"
    static let skipToSignInLabel = "Skip to Sign in"
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
    static let noAccount = "Don't have an account?"
    static let register = "Register"
    static let wrongCredentials = "The email or password is incorrect."
    static let staffNote = "Staff accounts are created by your administrator."

    // MARK: Register

    static let registerTitle = "Register"
    static let registerSubtitle = "Students register here. We check your details with the student directory."
    static let registrationNumber = "Registration number"
    static let hostelOptional = "Hostel (optional)"
    static let phone = "Phone number"
    static let continueAction = "Continue"
    static let checking = "Checking the student directory…"
    static let emailProblem = "Enter your college email."
    static let registrationNumberProblem = "Enter your registration number."
    static func passwordProblem(_ minimum: Int) -> String { "Use at least \(minimum) characters." }
    static let phoneProblem = "Enter a phone number with 10 to 13 digits."
    static let emailNotFound = "No student with this email is in the directory. Check it, or ask your hostel office."
    static let mismatch = "This registration number doesn't match the directory record for this email."
    static let alreadyRegistered = "This email already has an account."
    static let signInInstead = "Sign in instead"
    static let lookupFailedTitle = "Couldn't check the directory"
    static let tryAgain = "Try again"

    // MARK: Is this you?

    static let isThisYou = "Is this you?"
    static let isThisYouDetail = "This is what the student directory has for the email you entered."
    static let name = "Name"
    static let mess = "Mess"
    static let hostel = "Hostel"
    static let confirm = "Yes, create my account"
    static let notMe = "No, that's not me"
}
