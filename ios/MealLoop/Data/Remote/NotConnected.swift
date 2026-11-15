import Foundation

/// The answer of a data source for every service that has no backend endpoint and no seeded store yet.
///
/// One type stands in for all of them, so a missing service is easy to find and impossible to mistake for data:
/// every call throws `RepositoryError.notImplemented` and never fakes a result. The few reads that must not break a
/// staff screen (the staff directory, kept dish feedback, the pass-code instant) answer "not known" instead.
/// The Release (`api`) source uses it until each service has an endpoint; seeded sources replace it per group.
struct NotConnected: Sendable {
    fileprivate static func missing(_ feature: String) -> RepositoryError { .notImplemented(feature: feature) }
}

// MARK: LivePassCodeRepository

extension NotConnected: LivePassCodeRepository {
    func passCodeInstant() async -> Date { Date(timeIntervalSince1970: 0) }
    func currentPassCode(for student: StudentID, meal: MealID, at instant: Date) async throws -> CurrentPassCode {
        throw Self.missing("Live pass code")
    }
    func recordPassEntryForCurrentCode(_ request: SpecialPassEntryRequest) async throws -> SpecialPassEntryResult {
        throw Self.missing("Live pass code")
    }
}

// MARK: OutingCaseRepository

extension NotConnected: OutingCaseRepository {
    func now() async -> Date { Date() }
    func begin(as role: Role) async throws { throw Self.missing("Outings · outings") }
    func guardianLink(for guardian: AccountID) async throws -> GuardianLink { throw Self.missing("Outings · guardian link") }
    func guardianRequest(for guardian: AccountID) async throws -> OutingCase? { throw Self.missing("Outings · guardian request") }
    func guardianPastAnswers(for guardian: AccountID) async throws -> [GuardianPastAnswer] { throw Self.missing("Outings · past answers") }
    func hasConsented(_ guardian: AccountID) async throws -> Bool { throw Self.missing("Outings · consent") }
    func recordConsent(_ guardian: AccountID, by role: Role) async throws { throw Self.missing("Outings · consent") }
    func startCapture(_ outing: OutingRequestID, guardian: AccountID, by role: Role) async throws -> CaptureChallenge {
        throw Self.missing("Outings · video capture")
    }
    func submitVideo(_ challenge: CaptureChallenge, seconds: Int, guardian: AccountID, by role: Role) async throws
        -> VideoSubmissionResult { throw Self.missing("Outings · video check") }
    func sendVideoForReview(_ outing: OutingRequestID, guardian: AccountID, by role: Role) async throws -> OutingCase {
        throw Self.missing("Outings · send video")
    }
    func startPhotoFallback(_ outing: OutingRequestID, guardian: AccountID, by role: Role) async throws -> PhotoChallenge {
        throw Self.missing("Outings · photo and code")
    }
    func submitPhoto(_ outing: OutingRequestID, typed: String, phoneCode: String, guardian: AccountID, by role: Role)
        async throws -> OutingCase { throw Self.missing("Outings · photo and code") }
    func requestWardenCall(_ outing: OutingRequestID, guardian: AccountID, by role: Role) async throws -> OutingCase {
        throw Self.missing("Outings · warden call")
    }
    func rejectAsGuardian(_ outing: OutingRequestID, reason: String?, guardian: AccountID, by role: Role) async throws
        -> OutingCase { throw Self.missing("Outings · guardian reject") }
    func askStudentToChange(_ outing: OutingRequestID, fields: [String], guardian: AccountID, by role: Role) async throws
        -> OutingCase { throw Self.missing("Outings · ask to change") }
    func withdrawApproval(_ outing: OutingRequestID, guardian: AccountID, by role: Role) async throws -> OutingCase {
        throw Self.missing("Outings · withdraw approval")
    }
    func wardenProfile(for warden: AccountID) async throws -> WardenProfile { throw Self.missing("Outings · warden profile") }
    func wardenQueue(for warden: AccountID) async throws -> [OutingCase] { throw Self.missing("Outings · warden queue") }
    func wardenOutNow(for warden: AccountID) async throws -> [OutingCase] { throw Self.missing("Outings · out now") }
    func wardenEscalated(for warden: AccountID) async throws -> [OutingCase] { throw Self.missing("Outings · escalated") }
    func wardenHistory(for warden: AccountID) async throws -> [WardenHistoryItem] { throw Self.missing("Outings · history") }
    func outing(_ outing: OutingRequestID, for warden: AccountID) async throws -> OutingCase { throw Self.missing("Outings · outing") }
    func recordGuardianCall(_ outing: OutingRequestID, note: String, warden: AccountID, by role: Role) async throws
        -> OutingCase { throw Self.missing("Outings · record call") }
    func approve(_ outing: OutingRequestID, warden: AccountID, by role: Role) async throws -> OutingCase {
        throw Self.missing("Outings · approve")
    }
    func askForChange(_ outing: OutingRequestID, fields: [String], note: String?, warden: AccountID, by role: Role)
        async throws -> OutingCase { throw Self.missing("Outings · ask for change") }
    func reject(_ outing: OutingRequestID, reason: String, warden: AccountID, by role: Role) async throws -> OutingCase {
        throw Self.missing("Outings · reject")
    }
    func closeRequest(_ outing: OutingRequestID, warden: AccountID, by role: Role) async throws -> OutingCase {
        throw Self.missing("Outings · close request")
    }
    func undoDecision(_ outing: OutingRequestID, warden: AccountID, by role: Role) async throws -> OutingCase {
        throw Self.missing("Outings · undo")
    }
    func gateOverview(by role: Role) async throws -> GateOverview { throw Self.missing("Outings · gate") }
    func checkPassCode(_ code: String, by role: Role) async throws -> GateCheck { throw Self.missing("Outings · pass check") }
    func checkPass(of outing: OutingRequestID, by role: Role) async throws -> GateCheck { throw Self.missing("Outings · pass check") }
    func findStudent(srmID: String, by role: Role) async throws -> [OutingCase] { throw Self.missing("Outings · find student") }
    func recordExit(_ outing: OutingRequestID, by role: Role) async throws -> GateRecord { throw Self.missing("Outings · record exit") }
    func recordReturn(_ outing: OutingRequestID, by role: Role) async throws -> GateRecord { throw Self.missing("Outings · record return") }
    func gateOutNow(by role: Role) async throws -> [OutingCase] { throw Self.missing("Outings · out now") }
    func gateOverdue(by role: Role) async throws -> [OutingCase] { throw Self.missing("Outings · overdue") }
    func reportGateProblem(_ problem: GateProblem, by role: Role) async throws -> GateProblemReport {
        throw Self.missing("Outings · report a problem")
    }
}

// MARK: PassRequestRepository

extension NotConnected: PassRequestRepository {
    func status(for student: StudentID) async throws -> PassRequest? { throw Self.missing("Pass requests") }
    func request(for student: StudentRef, at mess: Mess) async throws -> PassRequest { throw Self.missing("Pass requests") }
    func cancel(for student: StudentID) async throws { throw Self.missing("Pass requests") }
    func queue(by role: Role) async throws -> PassRequestQueue { throw Self.missing("Pass requests") }
    func accept(_ id: PassRequestID, by role: Role) async throws -> PassRequest { throw Self.missing("Pass requests") }
    func decline(_ id: PassRequestID, by role: Role) async throws -> PassRequest { throw Self.missing("Pass requests") }
    func isPassUsable(for student: StudentID, on date: Date) async throws -> Bool { throw Self.missing("Pass requests") }
}

// MARK: PassUseRepository

extension NotConnected: PassUseRepository {
    func usePass(of student: StudentID, meal: MealID, key: IdempotencyKey) async throws -> PassUseState { throw Self.missing("Pass use") }
    func passUseState(of student: StudentID, meal: MealID, at instant: Date) async throws -> PassUseState { throw Self.missing("Pass use") }
    func checkLastFour(_ lastFour: String, meal: MealID, at instant: Date) async throws -> PassDigitCheck { throw Self.missing("Pass use") }
    func deskCode(for meal: MealID, at instant: Date) async throws -> CurrentPassCode { throw Self.missing("Pass use") }
}

// MARK: SpecialPassRepository

extension NotConnected: SpecialPassRepository {
    func lookUpPass(lastFour: String, for meal: MealID) async throws -> SpecialPassLookup { throw Self.missing("Special-meal passes") }
    func refreshPassCode(for student: StudentID, meal: MealID) async throws -> LivePassCode { throw Self.missing("Special-meal passes") }
    func recordPassEntry(_ request: SpecialPassEntryRequest) async throws -> SpecialPassEntryResult { throw Self.missing("Special-meal passes") }
    func specialMealCount(for meal: MealID) async throws -> SpecialMealCount { throw Self.missing("Special-meal passes") }
    func specialMealEntries(for meal: MealID) async throws -> [SpecialPassEntry] { throw Self.missing("Special-meal passes") }
    func reissueRequests(for mess: MessID) async throws -> [PassReissueRequest] { throw Self.missing("Special-meal passes") }
    func requestReissue(_ submission: PassReissueSubmission) async throws -> PassReissueRequest { throw Self.missing("Special-meal passes") }
}

// MARK: StaffDirectoryRepository

extension NotConnected: StaffDirectoryRepository {
    func studentName(_ student: StudentID) async throws -> String? { nil }
    func shiftStartedAt(for role: Role, mess: MessID) async throws -> Date? { nil }
}

// MARK: AdminResultsRepository, AdminStudentsRepository, AdminMoreRepository

extension NotConnected: AdminResultsRepository, AdminStudentsRepository, AdminMoreRepository {
    func overview() async throws -> AdminResultsOverview { throw Self.missing("Admin data") }
    func reason(_ kind: ReasonKind) async throws -> AdminReasonDetail { throw Self.missing("Admin data") }
    func meal(_ id: MealID) async throws -> AdminMealFacts { throw Self.missing("Admin data") }
    func findMeals(mess: String?, slot: MealSlot) async throws -> [AdminMealFacts] { throw Self.missing("Admin data") }
    func messNames() async throws -> [String] { throw Self.missing("Admin data") }
    func safetyCases() async throws -> [AdminSafetyCase] { throw Self.missing("Admin data") }
    func check(_ id: CheckID) async throws -> CheckNextTime { throw Self.missing("Admin data") }
    func saveChange(_ draft: ChangeDraft, by role: Role) async throws -> CheckNextTime { throw Self.missing("Admin data") }
    func addNote(_ note: String, to check: CheckID, by role: Role) async throws -> CheckNextTime { throw Self.missing("Admin data") }
    func closeAsWorked(_ check: CheckID, by role: Role) async throws -> CheckNextTime { throw Self.missing("Admin data") }
    func weeklyReport(_ period: ReportPeriod) async throws -> AdminWeeklyReport { throw Self.missing("Admin data") }

    func studentsOverview() async throws -> AdminStudentsOverview { throw Self.missing("Admin data") }
    func feedback(_ id: FeedbackItemID) async throws -> FeedbackItem { throw Self.missing("Admin data") }
    func community(_ id: CommunityIssueID) async throws -> AdminCommunityIssue { throw Self.missing("Admin data") }
    func skipReasons() async throws -> StudentSkipReasons { throw Self.missing("Admin data") }
    func ownerChoices() async throws -> [String] { throw Self.missing("Admin data") }
    func remind(key: IdempotencyKey, by role: Role) async throws -> AdminStudentsOverview { throw Self.missing("Admin data") }
    func assignOwner(_ owner: String, to issue: CommunityIssueID, by role: Role) async throws -> AdminCommunityIssue { throw Self.missing("Admin data") }
    func postNote(_ note: String, on issue: CommunityIssueID, by role: Role) async throws -> AdminCommunityIssue { throw Self.missing("Admin data") }

    func hub() async throws -> AdminMoreHub { throw Self.missing("Admin data") }
    func weekMenu() async throws -> WeekMenu { throw Self.missing("Admin data") }
    func copySource(for day: Date, slot: MealSlot) async throws -> [MenuDish] { throw Self.missing("Admin data") }
    func earlierDishes() async throws -> [String] { throw Self.missing("Admin data") }
    func saveDay(_ day: MenuDay, by role: Role) async throws -> WeekMenu { throw Self.missing("Admin data") }
    func applyToTodaysDinner(_ change: QuickChange, by role: Role) async throws -> WeekMenu { throw Self.missing("Admin data") }
    func people() async throws -> AdminPeople { throw Self.missing("Admin data") }
    func invite(phone: String, role: String, by actor: Role) async throws -> AdminPeople { throw Self.missing("Admin data") }
    func saveVendorContact(_ contact: VendorContact, by role: Role) async throws -> AdminPeople { throw Self.missing("Admin data") }
    func announcementDraft() async throws -> AnnouncementDraft { throw Self.missing("Admin data") }
    func announce(_ message: String, to audience: String, by role: Role) async throws { throw Self.missing("Admin data") }
    func passes() async throws -> PassesPage { throw Self.missing("Admin data") }
    func votes() async throws -> VotesPage { throw Self.missing("Admin data") }
    func rewards() async throws -> RewardsPage { throw Self.missing("Admin data") }
    func spareFood() async throws -> SpareFoodPage { throw Self.missing("Admin data") }
    func history() async throws -> HistoryPage { throw Self.missing("Admin data") }
    func outings() async throws -> OutingsPage { throw Self.missing("Admin data") }
}

// MARK: AdminVotesRewardsRepository

extension NotConnected: AdminVotesRewardsRepository {
    func decision() async throws -> VoteDecisionRecord? { throw Self.missing("Menu votes and rewards") }
    func decide(_ decision: VoteDecision, by role: Role) async throws -> VoteDecisionRecord { throw Self.missing("Menu votes and rewards") }
    func proposals() async throws -> VoteProposals { throw Self.missing("Menu votes and rewards") }
    func respond(to proposal: String, _ response: ProposalResponse, by role: Role) async throws -> VoteProposal {
        throw Self.missing("Menu votes and rewards")
    }
    func redemptions() async throws -> RedemptionsSummary { throw Self.missing("Menu votes and rewards") }
}

// MARK: PeopleRepository

extension NotConnected: PeopleRepository {
    func directory(by session: Session) async throws -> AccessDirectory { throw Self.missing("People and access") }
    func givePassword(to person: AccountID, by session: Session) async throws -> GivenPassword { throw Self.missing("People and access") }
    func revokePassword(of person: AccountID, by session: Session) async throws { throw Self.missing("People and access") }
    func invite(name: String, contact: String, role: Role, mess: MessID, by session: Session) async throws -> GivenPassword { throw Self.missing("People and access") }
    func allot(_ person: AccountID, to mess: MessID, by session: Session) async throws { throw Self.missing("People and access") }
    func audit(by session: Session) async throws -> [AccessAudit] { throw Self.missing("People and access") }
}

// MARK: RewardCatalogueRepository

extension NotConnected: RewardCatalogueRepository {
    func items() async throws -> [StudentCreditTicket] { throw Self.missing("Reward catalogue") }
    func add(name: String, cost: Int, by role: Role) async throws -> StudentCreditTicket { throw Self.missing("Reward catalogue") }
    func delete(_ id: String, by role: Role) async throws { throw Self.missing("Reward catalogue") }
}

// MARK: AdminMessRepository

extension NotConnected: AdminMessRepository {
    func messDay(for slot: MealSlot) async throws -> AdminMessDay { throw Self.missing("Admin mess data") }
    func messHeadcount(_ id: String, slot: MealSlot) async throws -> AdminMessHeadcount { throw Self.missing("Admin mess data") }
    func sendHeadcount(mess id: String, slot: MealSlot, key: IdempotencyKey, by role: Role) async throws -> AdminMessHeadcount { throw Self.missing("Admin mess data") }
    func adjustHeadcount(mess id: String, slot: MealSlot, to count: Int, reason: String?, by role: Role) async throws -> AdminMessHeadcount { throw Self.missing("Admin mess data") }
    func liveReference(for meal: MealID) async throws -> AdminLiveReference { throw Self.missing("Admin mess data") }
    func notAnsweredByMess() async throws -> [AdminMessCount] { throw Self.missing("Admin mess data") }
}

// MARK: StudentCommunityRepository

extension NotConnected: StudentCommunityRepository {
    func issues(at mess: MessID, for student: StudentID) async throws -> [StudentIssue] { throw Self.missing("Student Community") }
    func issue(_ id: CommunityIssueID, for student: StudentID) async throws -> StudentIssue { throw Self.missing("Student Community") }
    func back(_ id: CommunityIssueID, by student: StudentID) async throws -> StudentIssue { throw Self.missing("Student Community") }
    func unback(_ id: CommunityIssueID, by student: StudentID) async throws -> StudentIssue { throw Self.missing("Student Community") }
    func submitReport(_ report: StudentReportRequest) async throws -> StudentReportReceipt { throw Self.missing("Student Community") }
    func isReportDeskStaffed(at mess: MessID) async throws -> Bool { throw Self.missing("Student Community") }
}

// MARK: DishFeedbackRepository

extension NotConnected: DishFeedbackRepository {
    func problems(forDish name: String) async throws -> [DishProblemOption] { throw Self.missing("Dish feedback") }
    func otherCounts(dish name: String, day: Date, slot: MealSlot, at mess: MessID, excluding student: StudentID)
        async throws -> [String: Int] { throw Self.missing("Dish feedback") }
    func mostReported(day: Date, slot: MealSlot, at mess: MessID) async throws -> DishMostReported? { throw Self.missing("Dish feedback") }
    func send(_ submission: DishFeedbackSubmission, at mess: MessID, by student: StudentID) async throws
        -> DishFeedbackReceipt { throw Self.missing("Dish feedback") }
    func keepForLater(_ submission: DishFeedbackSubmission, at mess: MessID, by student: StudentID) async {}
    func kept(by student: StudentID) async -> [DishFeedbackSubmission] { [] }
    func sendKept(by student: StudentID) async throws -> [DishFeedbackReceipt] { throw Self.missing("Dish feedback") }
}

// MARK: FeedbackRatingRepository

extension NotConnected: FeedbackRatingRepository {
    func ratingWindow(day: Date, slot: MealSlot, at mess: MessID) async throws -> StudentRatingWindow { throw Self.missing("Ratings") }
    func rateMeal(day: Date, slot: MealSlot, _ answer: StudentRatingAnswer, at mess: MessID, for student: StudentID)
        async throws -> StudentRating? { throw Self.missing("Ratings") }
    func rateDish(_ dish: DishID, day: Date, slot: MealSlot, _ answer: StudentRatingAnswer, at mess: MessID,
                  for student: StudentID) async throws -> StudentRating? { throw Self.missing("Ratings") }
    func myRating(_ target: StudentRatingTarget, for student: StudentID) async throws -> StudentRating? { throw Self.missing("Ratings") }
    func goodCount(_ target: StudentRatingTarget, at mess: MessID) async throws -> Int { throw Self.missing("Ratings") }
}

// MARK: StudentExtrasRepository

extension NotConnected: StudentExtrasRepository {
    func homeExtras(for student: StudentID, mess: MessID) async throws -> StudentHomeExtras { throw Self.missing("Student Home extras") }
    func studentMenu(for meal: MealID) async throws -> [Dish] { throw Self.missing("Student Home extras") }
    func skipReason(of student: StudentID, for meal: MealID) async throws -> MealSkipReason? { throw Self.missing("Student Home extras") }
    func setSkipReason(_ reason: MealSkipReason, of student: StudentID, for meal: MealID) async throws { throw Self.missing("Student Home extras") }
    func entryStanding(of student: StudentID, for meal: MealID, at mess: MessID) async throws -> StudentEntryStanding { throw Self.missing("Student Home extras") }
    func rotatingEntryCode(for student: StudentID, step: Int) async throws -> RotatingEntryCode { throw Self.missing("Student Home extras") }
    func correctableRecord(for student: StudentID) async throws -> AttendanceRecord? { throw Self.missing("Student Home extras") }
    func requestEntryCorrection(_ request: EntryCorrectionRequest) async throws -> EntryCorrection { throw Self.missing("Student Home extras") }
}

// MARK: StudentMealsRepository

extension NotConnected: StudentMealsRepository {
    func week(for mess: MessID) async throws -> StudentWeek { throw Self.missing("Student Meals") }
    func mealMenu(on day: Date, slot: MealSlot, mess: MessID) async throws -> StudentMealMenu { throw Self.missing("Student Meals") }
    func dishDetail(_ dish: DishID, on day: Date, slot: MealSlot, mess: MessID) async throws -> StudentDishDetail { throw Self.missing("Student Meals") }
    func findDishes(_ text: String, mess: MessID) async throws -> [StudentDishMatch] { throw Self.missing("Student Meals") }
    func passStanding(of student: StudentID, at mess: MessID) async throws -> StudentPassStanding { throw Self.missing("Student Meals") }
    func startPass(of student: StudentID, key: IdempotencyKey) async throws -> StudentPassStanding { throw Self.missing("Student Meals") }
    func crowd(at mess: MessID) async throws -> StudentCrowd { throw Self.missing("Student Meals") }
}

// MARK: StudentOutingRepository

extension NotConnected: StudentOutingRepository {
    // `now()` is shared with OutingCaseRepository above.
    func outings(for student: StudentID) async throws -> StudentOutings { throw Self.missing("Student outings") }
    func outing(_ id: OutingRequestID, for student: StudentID) async throws -> OutingCase { throw Self.missing("Student outings") }
    func requestOuting(_ draft: StudentOutingDraft, by student: StudentID) async throws -> OutingCase { throw Self.missing("Student outings") }
    func cancelOuting(_ id: OutingRequestID, by student: StudentID) async throws -> OutingCase { throw Self.missing("Student outings") }
}

// MARK: StudentRecordsRepository

extension NotConnected: StudentRecordsRepository {
    func reports(for student: StudentID) async throws -> [StudentFiledReport] { throw Self.missing("Student records") }
    func report(_ id: StudentFiledReportID, for student: StudentID) async throws -> StudentFiledReport { throw Self.missing("Student records") }
    func reply(to id: StudentFiledReportID, text: String, by student: StudentID) async throws -> StudentFiledReport {
        throw Self.missing("Student records")
    }
    func answerFixCheck(_ id: StudentFiledReportID, _ answer: StudentFixCheckAnswer, by student: StudentID) async throws
        -> StudentFiledReport { throw Self.missing("Student records") }
    func recordDataRequest(_ kind: StudentDataRequestKind, by student: StudentID) async throws -> StudentDataRequestReceipt {
        throw Self.missing("Student records")
    }
    func dataRequests(for student: StudentID) async throws -> [StudentDataRequestReceipt] { throw Self.missing("Student records") }
    func feedback(for student: StudentID) async throws -> StudentFeedbackSummary { throw Self.missing("Student records") }
    func answerRecheck(_ id: StudentFeedbackID, _ answer: StudentRecheckAnswer, by student: StudentID) async throws
        -> StudentFeedbackSummary { throw Self.missing("Student records") }
    func spending(for student: StudentID) async throws -> StudentSpending { throw Self.missing("Student records") }
    func help(at mess: MessID) async throws -> StudentHelp { throw Self.missing("Student records") }
    func updates(for issue: CommunityIssueID) async throws -> [StudentIssueUpdate] { throw Self.missing("Student records") }
}

// MARK: StudentRewardsRepository

extension NotConnected: StudentRewardsRepository {
    func getTicket(_ rewardID: String, for student: StudentID) async throws -> StudentRewardTicket { throw Self.missing("Reward tickets") }
    func tickets(for student: StudentID) async throws -> [StudentRewardTicket] { throw Self.missing("Reward tickets") }
    func ticket(_ id: StudentRewardTicketID, for student: StudentID) async throws -> StudentRewardTicket {
        throw Self.missing("Reward tickets")
    }
    func recordCounterUse(of id: StudentRewardTicketID, for student: StudentID) async throws -> StudentRewardTicket {
        throw Self.missing("Reward tickets")
    }
    func reportBalanceIssue(_ text: String, for student: StudentID) async throws -> StudentBalanceIssueReceipt {
        throw Self.missing("Reward tickets")
    }
}

// MARK: StudentSpendingRepository

extension NotConnected: StudentSpendingRepository {
    func expenses(for student: StudentID) async throws -> [StudentExpense] { throw Self.missing("Spending") }
    func addExpense(_ draft: StudentExpenseDraft, for student: StudentID) async throws -> StudentExpense {
        throw Self.missing("Spending")
    }
    func updateExpense(_ id: StudentExpenseID, with draft: StudentExpenseDraft, for student: StudentID) async throws
        -> StudentExpense { throw Self.missing("Spending") }
    func deleteExpense(_ id: StudentExpenseID, for student: StudentID) async throws { throw Self.missing("Spending") }
}

// MARK: StudentYouRepository

extension NotConnected: StudentYouRepository {
    func notifications(for student: StudentID) async throws -> [StudentNotification] { throw Self.missing("Student You") }
    func markRead(_ id: StudentNotificationID, for student: StudentID) async throws -> StudentNotification { throw Self.missing("Student You") }
    func profile(for student: StudentID, at mess: MessID) async throws -> StudentProfileSummary { throw Self.missing("Student You") }
    func credits(for student: StudentID) async throws -> StudentCredits { throw Self.missing("Student You") }
    func attendance(for student: StudentID, at mess: MessID) async throws -> StudentAttendanceMonth { throw Self.missing("Student You") }
}

// MARK: SuperAdminRepository

extension NotConnected: SuperAdminRepository {
    func accounts(by role: Role) async throws -> [ManagedAccount] { throw Self.missing("Super Admin accounts") }
    func account(_ id: AccountID, by role: Role) async throws -> ManagedAccount { throw Self.missing("Super Admin accounts") }
    func deactivate(_ id: AccountID, by role: Role) async throws -> ManagedAccount { throw Self.missing("Super Admin accounts") }
    func startPasswordReset(_ id: AccountID, by role: Role) async throws -> ManagedAccount { throw Self.missing("Super Admin accounts") }
}

// MARK: VendorRepository

extension NotConnected: VendorRepository {
    func vendorMess(for account: AccountID) async throws -> Mess { throw Self.missing("Vendor headcounts") }
    func vendorHistory(for account: AccountID) async throws -> [VendorHeadcountEntry] { throw Self.missing("Vendor headcounts") }
}
