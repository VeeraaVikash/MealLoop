import Foundation

/// The Release data source: the shared dining repositories over the MealLoop HTTP API (docs/backend/openapi.yaml).
///
/// `RemoteAPI` says *what* to call: the path, the body and how the answer maps to `Domain`. `HTTPClient` does the
/// *how*: the request, the bearer credential, JSON, status codes. Every operation follows an OpenAPI operation that is
/// still an unreviewed draft (ADR-005, FE-6), and no server exists yet, so nothing here has run against a backend.
///
/// - A failed, timed-out or unreadable call throws; nothing is ever returned as if the server had confirmed it.
/// - The `by role:` arguments are not sent. The server takes the role from the credential (NET-12).
/// - Writes that must not apply twice carry an `Idempotency-Key`; a retry of the same call reuses it.
struct RemoteAPI: MealRepository, MealStateRepository, HeadcountRepository, EntryRepository, IntentionRepository,
    ShortageRepository, WasteReportRepository, SOSRepository, AuthRepository {
    let client: HTTPClient
    let tokens: any TokenStore

    init(client: HTTPClient, tokens: any TokenStore) {
        self.client = client
        self.tokens = tokens
    }

    /// A source with no backend address answers every call with `notImplemented`, as before the client existed.
    init(baseURL: URL?, tokens: any TokenStore = InMemoryTokenStore()) {
        self.init(client: HTTPClient(baseURL: baseURL, credential: { await tokens.read() }), tokens: tokens)
    }

    func makeRepositories() -> Repositories {
        Repositories(meals: self, mealState: self, headcount: self, entries: self, intentions: self,
                     shortages: self, wasteReports: self, sos: self, auth: self)
    }

    // MARK: Meals

    func menu(for meal: MealID) async throws -> [Dish] {
        let dishes: [DishDTO] = try await call("menu", Endpoint(method: .get, path: "/meals/\(meal)/menu"))
        return dishes.map(\.domain)
    }

    func currentMeal(for mess: MessID) async throws -> MealStatus? {
        let current: CurrentMealDTO = try await call("current meal",
                                                     Endpoint(method: .get, path: "/messes/\(mess)/meals/current"))
        return current.meal?.status
    }

    func meals(for mess: MessID) async throws -> [MealStatus] {
        let meals: [MealDTO] = try await call("meals", Endpoint(method: .get, path: "/messes/\(mess)/meals"))
        return meals.map(\.status)
    }

    func startMeal(_ meal: MealID, by role: Role) async throws -> MealStatus {
        let status: MealStatusDTO = try await call("start meal", Endpoint(method: .post, path: "/meals/\(meal)/start",
                                                                          idempotencyKey: .make()))
        return status.domain
    }

    func closeMeal(_ meal: MealID, by role: Role) async throws -> MealStatus {
        let status: MealStatusDTO = try await call("close meal", Endpoint(method: .post, path: "/meals/\(meal)/close",
                                                                          idempotencyKey: .make()))
        return status.domain
    }

    func mealHistory(for mess: MessID) async throws -> [MealRecord] {
        let records: [MealRecordDTO] = try await call("meal history",
                                                      Endpoint(method: .get, path: "/messes/\(mess)/meal-history"))
        return try records.map { try $0.domain() }
    }

    // MARK: Headcount

    func headcount(for meal: MealID) async throws -> Headcount {
        let headcount: HeadcountDTO = try await call("headcount", Endpoint(method: .get, path: "/meals/\(meal)/headcount"))
        return try headcount.domain()
    }

    func approveHeadcount(_ count: Int, reason: String?, for meal: MealID, by role: Role) async throws -> Headcount {
        let headcount: HeadcountDTO = try await call(
            "approve headcount",
            Endpoint(method: .put, path: "/meals/\(meal)/headcount/approval",
                     body: ApproveHeadcountRequestDTO(count: count, reason: reason)))
        return try headcount.domain()
    }

    func publishHeadcount(for meal: MealID, by role: Role) async throws -> Headcount {
        let headcount: HeadcountDTO = try await call(
            "publish headcount",
            Endpoint(method: .post, path: "/meals/\(meal)/headcount/publication", idempotencyKey: .make()))
        return try headcount.domain()
    }

    func acknowledgeHeadcount(for meal: MealID, by account: AccountID) async throws -> Headcount {
        let headcount: HeadcountDTO = try await call(
            "acknowledge headcount",
            Endpoint(method: .post, path: "/meals/\(meal)/headcount/acknowledgment", idempotencyKey: .make()))
        return try headcount.domain()
    }

    // MARK: Entries

    /// A `409 already_recorded` is a result, not a failure: the count did not change and the screen says so.
    func recordEntry(_ request: EntryRequest) async throws -> EntryResult {
        let endpoint = Endpoint(method: .post, path: "/meals/\(request.mealID)/entries",
                                body: EntryRequestDTO(method: request.method, studentId: request.student.id.rawValue),
                                idempotencyKey: request.idempotencyKey)
        do {
            let recorded: EntryRecordedDTO = try await client.send(endpoint)
            return recorded.domain
        } catch HTTPError.status(409, let problem?) where problem.code == "already_recorded" {
            guard let first = problem.firstRecordedAt, let count = problem.count else {
                throw RepositoryError.unavailable(reason: "The server's answer could not be read. Nothing was recorded.")
            }
            return .alreadyRecorded(firstRecordedAt: first, count: count)
        } catch {
            throw Self.repositoryError(error, feature: "record entry")
        }
    }

    func liveCount(for meal: MealID) async throws -> CountReading {
        try await count(meal, kind: "live", feature: "live entries")
    }

    func finalCount(for meal: MealID) async throws -> CountReading {
        try await count(meal, kind: "final", feature: "final entries")
    }

    private func count(_ meal: MealID, kind: String, feature: String) async throws -> CountReading {
        let reading: CountReadingDTO = try await call(
            feature, Endpoint(method: .get, path: "/meals/\(meal)/entries/count",
                              query: [URLQueryItem(name: "kind", value: kind)]))
        return try reading.domain()
    }

    func enteredWithoutVoting(for meal: MealID) async throws -> [EnteredWithoutVoting] {
        let rows: [EnteredWithoutVotingDTO] = try await call(
            "entered without voting", Endpoint(method: .get, path: "/meals/\(meal)/entries/without-answer"))
        return rows.map(\.domain)
    }

    func entryCode(for student: StudentID) async throws -> EntryCode {
        let code: EntryCodeDTO = try await call("entry code", Endpoint(method: .get, path: "/students/\(student)/entry-code"))
        return code.domain
    }

    /// Records nothing: a `POST` only because the credential must not appear in a URL or a server log.
    func resolveEntry(_ credential: EntryCredential, for meal: MealID) async throws -> EntryCredentialResult {
        let result: ResolveEntryResponseDTO = try await call(
            "resolve entry", Endpoint(method: .post, path: "/meals/\(meal)/entry-credentials",
                                      body: ResolveEntryRequestDTO(credential)))
        return try result.domain()
    }

    // MARK: Intentions

    /// The signed-in student's own answer. `student` is not sent; the credential says who is asking (NET-12).
    func response(of student: StudentID, for meal: MealID) async throws -> IntentionResponse {
        let response: IntentionResponseDTO = try await call(
            "intention", Endpoint(method: .get, path: "/meals/\(meal)/intentions/me"))
        return try response.domain()
    }

    func setIntention(_ intention: MealIntention, of student: StudentID, for meal: MealID) async throws
        -> IntentionResponse {
        let response: IntentionResponseDTO = try await call(
            "set intention", Endpoint(method: .put, path: "/meals/\(meal)/intentions/me",
                                      body: IntentionRequestDTO(intention: intention)))
        return try response.domain()
    }

    func answerCounts(for meal: MealID) async throws -> MealAnswerCounts {
        let counts: AnswerCountsDTO = try await call(
            "answer counts", Endpoint(method: .get, path: "/meals/\(meal)/intentions/counts"))
        return counts.domain
    }

    // MARK: Shortages

    func reportShortage(_ report: ShortageReport) async throws -> Shortage {
        let shortage: ShortageDTO = try await call(
            "report shortage",
            Endpoint(method: .post, path: "/meals/\(report.mealID)/shortages",
                     body: ShortageReportDTO(dishName: report.dishName, level: report.level, note: report.note,
                                             reportedBy: report.reportedBy),
                     idempotencyKey: report.idempotencyKey))
        return try shortage.domain()
    }

    func shortages(for meal: MealID) async throws -> [Shortage] {
        let rows: [ShortageDTO] = try await call("shortages", Endpoint(method: .get, path: "/meals/\(meal)/shortages"))
        return try rows.map { try $0.domain() }
    }

    func markResolved(_ shortage: ShortageID, by role: Role) async throws -> Shortage {
        let row: ShortageDTO = try await call("resolve shortage",
                                              Endpoint(method: .put, path: "/shortages/\(shortage)/resolution"))
        return try row.domain()
    }

    func markSeen(_ shortage: ShortageID, by role: Role) async throws -> Shortage {
        let row: ShortageDTO = try await call("mark shortage seen",
                                              Endpoint(method: .put, path: "/shortages/\(shortage)/seen"))
        return try row.domain()
    }

    // MARK: Waste reports

    func summary(for meal: MealID) async throws -> WasteReportSummary {
        let summary: WasteSummaryDTO = try await call(
            "waste report summary", Endpoint(method: .get, path: "/meals/\(meal)/waste-report/summary"))
        return try summary.domain()
    }

    func report(for meal: MealID) async throws -> WasteReport {
        let report: WasteReportDTO = try await call("waste report",
                                                    Endpoint(method: .get, path: "/meals/\(meal)/waste-report"))
        return try report.domain()
    }

    func saveDraft(_ report: WasteReport, by role: Role) async throws -> WasteReport {
        try await saveWaste(report, action: .saveDraft, feature: "save waste draft")
    }

    func save(_ report: WasteReport, by role: Role) async throws -> WasteReport {
        try await saveWaste(report, action: .record, feature: "save waste report")
    }

    private func saveWaste(_ report: WasteReport, action: SaveWasteReportRequestDTO.Action, feature: String) async throws
        -> WasteReport {
        let saved: WasteReportDTO = try await call(
            feature, Endpoint(method: .put, path: "/meals/\(report.mealID)/waste-report",
                              body: SaveWasteReportRequestDTO(report, action: action)))
        return try saved.domain()
    }

    // MARK: SOS

    func raise(_ report: SOSReport) async throws -> SOSCase {
        let raised: SOSCaseDTO = try await call(
            "raise SOS", Endpoint(method: .post, path: "/messes/\(report.messID)/sos-cases",
                                  body: SOSReportDTO(title: report.title, place: report.place),
                                  idempotencyKey: report.idempotencyKey))
        return try raised.domain()
    }

    func activeCases(for mess: MessID) async throws -> [SOSCase] {
        let cases: [SOSCaseDTO] = try await call(
            "SOS cases", Endpoint(method: .get, path: "/messes/\(mess)/sos-cases",
                                  query: [URLQueryItem(name: "status", value: "open")]))
        return try cases.map { try $0.domain() }
    }

    func claim(_ sos: SOSCaseID, by role: Role) async throws -> SOSCase {
        try await sosAction(sos, "claim", feature: "claim SOS")
    }

    func markChecked(_ sos: SOSCaseID, by role: Role) async throws -> SOSCase {
        try await sosAction(sos, "check", feature: "check SOS")
    }

    func close(_ sos: SOSCaseID, by role: Role) async throws -> SOSCase {
        try await sosAction(sos, "close", feature: "close SOS")
    }

    /// Each action is a `PUT` of a state the server keeps once, so repeating it changes nothing.
    private func sosAction(_ sos: SOSCaseID, _ action: String, feature: String) async throws -> SOSCase {
        let updated: SOSCaseDTO = try await call(feature, Endpoint(method: .put, path: "/sos-cases/\(sos)/\(action)"))
        return try updated.domain()
    }

    // MARK: Sign-in

    /// Saves the returned credential in the token store before answering, so the next call is signed in.
    /// A wrong email or password is `invalidCredentials`, never which of the two.
    func signInStaff(email: String, password: String) async throws -> Session {
        let endpoint = Endpoint(method: .post, path: "/sessions", body: SignInRequestDTO(email: email, password: password),
                                requiresAuthentication: false)
        let session: SessionDTO
        do {
            session = try await client.send(endpoint)
        } catch HTTPError.status(401, _) {
            throw RepositoryError.invalidCredentials
        } catch HTTPError.notConfigured {
            // The sign-in screen's wording: "Remote sign in isn't available yet".
            throw RepositoryError.notImplemented(feature: "Remote sign in")
        } catch {
            throw Self.repositoryError(error, feature: "sign in")
        }
        do {
            try await tokens.save(session.token)
        } catch {
            throw RepositoryError.unavailable(reason: "This phone could not keep you signed in. Try again.")
        }
        return session.domain
    }

    /// Not connected on purpose: SRM single sign-on is unverified and no SRM integration exists (P14, NET-9).
    func signInWithSRM() async throws -> Session {
        throw RepositoryError.notImplemented(feature: "Remote · Sign in with SRM")
    }

    /// Not connected on purpose: the shared four-digit role password is a prototype interaction only and must never
    /// become production authentication (CLAUDE.md, contracts-and-security rules; NET-9).
    func verifyRolePassword(_ password: String, for role: Role) async throws -> RolePasswordResult {
        throw RepositoryError.notImplemented(feature: "Remote · role password")
    }

    // MARK: Errors

    /// Sends the call and turns every failure into a `RepositoryError` the screens already know.
    private func call<Response: Decodable>(_ feature: String, _ endpoint: Endpoint) async throws -> Response {
        do {
            return try await client.send(endpoint)
        } catch {
            throw Self.repositoryError(error, feature: feature)
        }
    }

    /// The mapping every operation shares. A timeout is never "done": whether the server applied it is unknown.
    static func repositoryError(_ error: Error, feature: String) -> Error {
        if error is RepositoryError || error is CancellationError { return error }
        guard let http = error as? HTTPError else {
            return RepositoryError.unavailable(reason: "Something went wrong. Nothing was saved.")
        }
        switch http {
        case .notConfigured:
            return RepositoryError.notImplemented(feature: "Remote · \(feature)")
        case .offline:
            return RepositoryError.offline(lastSavedAt: nil)
        case .timedOut:
            return RepositoryError.unavailable(reason: "The server did not answer in time. Check before trying again.")
        case .notSignedIn:
            return RepositoryError.notAllowed(reason: "Sign in again to continue.")
        case .invalidResponse:
            return RepositoryError.unavailable(reason: "The server's answer could not be read.")
        case .status(let code, let problem):
            let detail = problem?.detail ?? problem?.title
            switch code {
            case 400, 422:
                let fields = problem?.errors?.map { "\($0.field): \($0.message)" } ?? []
                return RepositoryError.validationFailed(fields.isEmpty ? [detail ?? "The request was not valid."] : fields)
            case 401:
                return RepositoryError.notAllowed(reason: "Your session has ended. Sign in again.")
            case 403:
                return RepositoryError.notAllowed(reason: detail ?? "Your role can't do this here.")
            case 404:
                return RepositoryError.notFound
            case 409, 423:
                return RepositoryError.notAllowed(reason: detail ?? "This can't be done right now.")
            default:
                return RepositoryError.unavailable(reason: "The server could not do this (\(code)). Nothing was saved.")
            }
        }
    }
}

/// `GET /messes/{messId}/meals/current`: the meal the mess is in or about to start, or null when there is none today.
struct CurrentMealDTO: Decodable, Sendable {
    let meal: MealDTO?
}
