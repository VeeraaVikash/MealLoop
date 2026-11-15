import Foundation

// Repository protocols shared by several roles, and the `Repositories` container. Views and view models depend only
// on these protocols; they never touch data directly. A protocol used by one feature only lives beside that feature
// (for example Features/Student/Meals/StudentMealsRepository.swift). Implementations live in Data/Demo (seeded, Debug
// and Review only) and Data/Remote (HTTP).

/// Menus and meals. Used by Kitchen (Menu for Lunch), Student (Meals) and Admin (Weekly menu).
protocol MealRepository: Sendable {
    func menu(for meal: MealID) async throws -> [Dish]
}

/// The meal lifecycle for one mess. Started and closed by the Supervisor; read by every staff role.
protocol MealStateRepository: Sendable {
    /// The meal the mess is in or about to start, or nil when there is none today.
    func currentMeal(for mess: MessID) async throws -> MealStatus?
    /// Every meal of the day for one mess, earliest first.
    func meals(for mess: MessID) async throws -> [MealStatus]
    func startMeal(_ meal: MealID, by role: Role) async throws -> MealStatus
    func closeMeal(_ meal: MealID, by role: Role) async throws -> MealStatus
    /// Closed meals of one mess, newest first, with their final entries, shortages and waste status. Read only.
    func mealHistory(for mess: MessID) async throws -> [MealRecord]
}

/// The six headcount quantities of a meal and the vendor's acknowledgment.
protocol HeadcountRepository: Sendable {
    func headcount(for meal: MealID) async throws -> Headcount
    /// Food Head / Admin only. A count that differs from the forecast or an earlier approval needs a reason.
    /// A repeat of the same count changes nothing. Refused once the headcount has been sent.
    func approveHeadcount(_ count: Int, reason: String?, for meal: MealID, by role: Role) async throws -> Headcount
    /// Sends the approved headcount to the vendor account. Food Head / Admin only. A repeat changes nothing.
    func publishHeadcount(for meal: MealID, by role: Role) async throws -> Headcount
    /// Records receipt by the vendor account. Throws `notAllowed` for any other account or before publication.
    /// A repeat returns the first acknowledgment unchanged.
    func acknowledgeHeadcount(for meal: MealID, by account: AccountID) async throws -> Headcount
}

/// Verified entry at the door. Scans are idempotent and a student is never counted twice for one meal.
protocol EntryRepository: Sendable {
    func recordEntry(_ request: EntryRequest) async throws -> EntryResult
    /// Students who have entered so far (live, never final).
    func liveCount(for meal: MealID) async throws -> CountReading
    /// Final entries after the meal closed, or `.unavailable` (never zero).
    func finalCount(for meal: MealID) async throws -> CountReading
    func enteredWithoutVoting(for meal: MealID) async throws -> [EnteredWithoutVoting]
    /// Always available: never gated by the answer, the cutoff or a lost connection.
    func entryCode(for student: StudentID) async throws -> EntryCode
    /// Checks a scanned or typed credential. It records nothing; `recordEntry` does that.
    func resolveEntry(_ credential: EntryCredential, for meal: MealID) async throws -> EntryCredentialResult
}

/// Student answers (I'm in / Skip / Not sure) before the cutoff.
protocol IntentionRepository: Sendable {
    func response(of student: StudentID, for meal: MealID) async throws -> IntentionResponse
    /// The same answer again changes nothing. Throws `notAllowed` after the meal's cutoff.
    func setIntention(_ intention: MealIntention, of student: StudentID, for meal: MealID) async throws -> IntentionResponse
    func answerCounts(for meal: MealID) async throws -> MealAnswerCounts
}

/// Shortages reported by the kitchen or the pass desk, followed up by the Supervisor.
protocol ShortageRepository: Sendable {
    func reportShortage(_ report: ShortageReport) async throws -> Shortage
    func shortages(for meal: MealID) async throws -> [Shortage]
    func markResolved(_ shortage: ShortageID, by role: Role) async throws -> Shortage
    /// The Supervisor has read the report, so the kitchen may show "Ravi saw it". Supervisor only.
    /// A repeat keeps the first sighting.
    func markSeen(_ shortage: ShortageID, by role: Role) async throws -> Shortage
}

/// Leftovers per dish and one plate-waste total, recorded after the meal only.
protocol WasteReportRepository: Sendable {
    func summary(for meal: MealID) async throws -> WasteReportSummary
    func report(for meal: MealID) async throws -> WasteReport
    /// Kitchen Staff only; every other role reads the report. Throws `notAllowed` for any other role.
    func saveDraft(_ report: WasteReport, by role: Role) async throws -> WasteReport
    /// Throws `validationFailed` while any field is missing or invalid.
    func save(_ report: WasteReport, by role: Role) async throws -> WasteReport
}

/// SOS cases. Staff claim and check; only the Supervisor closes.
protocol SOSRepository: Sendable {
    /// Opens a case for the mess. A repeat with the same idempotency key returns the case already opened.
    func raise(_ report: SOSReport) async throws -> SOSCase
    func activeCases(for mess: MessID) async throws -> [SOSCase]
    func claim(_ sos: SOSCaseID, by role: Role) async throws -> SOSCase
    func markChecked(_ sos: SOSCaseID, by role: Role) async throws -> SOSCase
    func close(_ sos: SOSCaseID, by role: Role) async throws -> SOSCase
}

/// Sign-in. Every method returns the session the data source vouches for; the client never picks a role itself.
protocol AuthRepository: Sendable {
    /// The one sign-in for every account. The role comes from the account the email belongs to; the email domain,
    /// a typed role name or local UI state never grant one. Throws `invalidCredentials` for a wrong password or an
    /// unknown email, without saying which.
    func signIn(email: String, password: String) async throws -> Session
}

/// The special-meal pass: lookup, recording and reissue requests (Pass Desk). There is no camera and no scan.
protocol SpecialPassRepository: Sendable {
    /// Status only: it never records and never changes a count.
    func lookUpPass(lastFour: String, for meal: MealID) async throws -> SpecialPassLookup
    /// The next code and colour, once the current window has run out.
    func refreshPassCode(for student: StudentID, meal: MealID) async throws -> LivePassCode
    /// Pass Desk only. A student is recorded at most once per meal; the same idempotency key returns the first result.
    func recordPassEntry(_ request: SpecialPassEntryRequest) async throws -> SpecialPassEntryResult
    func specialMealCount(for meal: MealID) async throws -> SpecialMealCount
    /// Readable by any role: the entries recorded for this meal, oldest first.
    func specialMealEntries(for meal: MealID) async throws -> [SpecialPassEntry]
    func reissueRequests(for mess: MessID) async throws -> [PassReissueRequest]
    /// Pass Desk only. A new request is always Waiting; only the admin pass-exception flow moves it on.
    func requestReissue(_ submission: PassReissueSubmission) async throws -> PassReissueRequest
}

// MARK: - The container

/// The repositories the app runs with, grouped by who uses them. Exactly one source (demo, review or api) per running
/// app; never mixed. Only a source's `makeRepositories()`, called from the composition root (`AppEnvironment.make`),
/// builds one; screens read it from `AppEnvironment.repositories`.
///
/// The shared dining operations sit at the top level because nearly every role uses them. Everything else is in a
/// group named after the roles that read it. A group a source does not supply answers `NotConnected`, which throws
/// `notImplemented` and never fakes a result.
struct Repositories: Sendable {
    // Shared dining operations (Student, staff and Admin).
    let meals: any MealRepository
    var mealState: any MealStateRepository
    var headcount: any HeadcountRepository
    let entries: any EntryRepository
    let intentions: any IntentionRepository
    let shortages: any ShortageRepository
    let wasteReports: any WasteReportRepository
    let sos: any SOSRepository
    let auth: any AuthRepository
    /// Student Register: the directory lookup and account creation.
    var registration: any StudentRegistrationRepository = NotConnected()
    /// Names and shift times for the Door Scanner and Pass Desk.
    var staffDirectory: any StaffDirectoryRepository = NotConnected()

    var passes = PassRepositories()
    var outings = OutingRepositories()
    var student = StudentRepositories()
    var admin = AdminRepositories()
    var vendor: any VendorRepository = NotConnected()
}

/// The special-meal pass, read by the Student and the Pass Desk, and requested from the Admin.
struct PassRepositories: Sendable {
    var special: any SpecialPassRepository = NotConnected()
    /// The clock-derived live pass code (P-PASS-9 a).
    var liveCodes: any LivePassCodeRepository = NotConnected()
    /// The student's hold is the entry; 30 s of validity.
    var use: any PassUseRepository = NotConnected()
    /// Requests for next week's Special pass.
    var requests: any PassRequestRepository = NotConnected()
}

/// Outings, one source for the Student, Guardian, Warden and Gate so a request the student sends is the one the
/// guardian answers. `student` and `cases` are usually the same object.
struct OutingRepositories: Sendable {
    var cases: any OutingCaseRepository = NotConnected()
    var student: any StudentOutingRepository = NotConnected()
}

/// Student-only screens (Features/Student). Each protocol lives beside the screen that uses it.
struct StudentRepositories: Sendable {
    /// Home, the answer page and Entry QR beyond the shared operations.
    var extras: any StudentExtrasRepository = NotConnected()
    var meals: any StudentMealsRepository = NotConnected()
    var community: any StudentCommunityRepository = NotConnected()
    /// Notifications, You, Credits and Attendance.
    var you: any StudentYouRepository = NotConnected()
    /// My reports, My feedback, Help and Community updates.
    var records: any StudentRecordsRepository = NotConnected()
    /// The student's private spending ledger.
    var spending: any StudentSpendingRepository = NotConnected()
    /// Reward tickets got with credits.
    var rewards: any StudentRewardsRepository = NotConnected()
    /// Good / Not good on a meal or a dish.
    var ratings: any FeedbackRatingRepository = NotConnected()
    /// Dish feedback after Not good (2159:149347).
    var dishFeedback: any DishFeedbackRepository = NotConnected()
}

/// Food Head and Super Admin screens (Features/Admin, Features/SuperAdmin).
struct AdminRepositories: Sendable {
    var people: any PeopleRepository = NotConnected()
    var results: any AdminResultsRepository = NotConnected()
    var students: any AdminStudentsRepository = NotConnected()
    var more: any AdminMoreRepository = NotConnected()
    var messes: any AdminMessRepository = NotConnected()
    /// Menu vote decisions and reward redemptions.
    var votesRewards: any AdminVotesRewardsRepository = NotConnected()
    /// Rewards the Admin adds and deletes; Credits reads them.
    var rewardCatalogue: any RewardCatalogueRepository = NotConnected()
    /// The Super Admin's accounts list (simulated actions).
    var superAdmin: any SuperAdminRepository = NotConnected()
}
