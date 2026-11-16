import XCTest
@testable import MealLoop

/// Every `RemoteAPI` operation against a stubbed server: the request it sends (method, path, query, idempotency key,
/// body) and how the contract's answer maps to `Domain`. These check the client side of docs/backend/openapi.yaml;
/// no MealLoop server exists yet, so nothing here proves the server keeps the same contract.
final class RemoteAPIContractTests: XCTestCase {
    private let meal = MealID("lunch-1")
    private let mess = MessID("main")
    private let at = "2026-08-14T07:30:00Z"
    private var instant: Date { ISO8601.parse(at)! }

    private func api(token: String? = UUID().uuidString,
                     _ handler: @escaping (URLRequest) -> StubURLProtocol.Reply) -> (RemoteAPI, InMemoryTokenStore) {
        let tokens = InMemoryTokenStore(token)
        let client = HTTPClient(baseURL: stubBaseURL, session: StubURLProtocol.session(handler),
                                credential: { await tokens.read() })
        return (RemoteAPI(client: client, tokens: tokens), tokens)
    }

    /// A server that answers every request with `json` and status 200.
    private func server(_ json: String) -> RemoteAPI {
        server(200, json)
    }

    private func server(_ status: Int, _ json: String) -> RemoteAPI {
        api { _ in .json(status, json) }.0
    }

    /// The one request sent, checked against the contract.
    @discardableResult
    private func assertSent(_ method: String, _ path: String, query: String? = nil, idempotent: Bool = false,
                            file: StaticString = #filePath, line: UInt = #line) throws -> URLRequest {
        XCTAssertEqual(StubURLProtocol.requests.count, 1, "One call, one request", file: file, line: line)
        let request = try XCTUnwrap(StubURLProtocol.requests.first, file: file, line: line)
        let components = URLComponents(url: request.url!, resolvingAgainstBaseURL: false)!
        XCTAssertEqual(request.httpMethod, method, file: file, line: line)
        XCTAssertEqual(components.path, "/v1" + path, file: file, line: line)
        XCTAssertEqual(components.query, query, file: file, line: line)
        XCTAssertEqual(request.value(forHTTPHeaderField: "Idempotency-Key") != nil, idempotent,
                       "Idempotency-Key", file: file, line: line)
        XCTAssertNotNil(request.value(forHTTPHeaderField: "Authorization"), file: file, line: line)
        return request
    }

    // MARK: Fixtures (sample wire values, not product data)

    private var mealJSON: String {
        #"{"id":"lunch-1","messId":"main","slot":"lunch","startsAt":"2026-08-14T07:00:00Z","endsAt":"2026-08-14T09:30:00Z","state":"inService","startedAt":"2026-08-14T07:02:00Z","closedAt":null}"#
    }
    private let studentJSON = #"{"id":"s1","maskedId":"••0238"}"#
    private let dishJSON = #"{"id":"d1","name":"Sambar","isHighlight":false,"diet":"veg","wasteUnit":"kg"}"#
    private var shortageJSON: String {
        #"{"id":"sh1","mealId":"lunch-1","dishName":"Sambar","level":"almostOut","note":null,"reportedAt":"\#(at)","reportedBy":"kitchenStaff","delivery":{"status":"seen","at":"\#(at)","by":"Ravi"},"status":"active","resolvedAt":null}"#
    }
    private var wasteJSON: String {
        #"{"mealId":"lunch-1","leftovers":[{"dishId":"d1","dishName":"Sambar","unit":"L","measurement":{"state":"entered","value":4.5}},{"dishId":"d2","dishName":"Rice","unit":"kg","measurement":{"state":"notEntered","value":null}},{"dishId":"d3","dishName":"Payasam","unit":"L","measurement":{"state":"noneLeft","value":null}}],"plateWaste":{"state":"notEntered","kilograms":null},"status":"draft","savedAt":"\#(at)"}"#
    }
    private var sosJSON: String {
        #"{"id":"sos1","messId":"main","title":"Spill","place":"Counter 2","raisedAt":"\#(at)","claim":{"role":"doorScanner","at":"\#(at)"},"checks":[],"status":{"state":"open","at":null,"by":null}}"#
    }
    private var headcountJSON: String {
        #"{"mealId":"lunch-1","liveForecast":{"status":"ready","diners":812,"setAt":"\#(at)"},"cutoffForecast":{"status":"notReady","diners":null,"setAt":null},"approved":{"count":800,"approvedBy":"admin","approvedAt":"\#(at)","adjustments":[{"from":812,"to":800,"reason":"Exam week","adjustedBy":"admin","adjustedAt":"\#(at)"}]},"sentToVendor":null,"actualEntries":{"status":"available","count":120,"asOf":"\#(at)"},"finalEntries":{"status":"unavailable","count":null,"asOf":null},"acknowledgment":null}"#
    }

    // MARK: Meals

    func testMenu() async throws {
        let dishes = try await server("[\(dishJSON)]").menu(for: meal)
        try assertSent("GET", "/meals/lunch-1/menu")
        XCTAssertEqual(dishes, [Dish(id: DishID("d1"), name: "Sambar", isHighlight: false, diet: .veg, wasteUnit: .kilograms)])
    }

    func testCurrentMealAndNoMealToday() async throws {
        let current = try await server(#"{"meal":\#(mealJSON)}"#).currentMeal(for: mess)
        try assertSent("GET", "/messes/main/meals/current")
        XCTAssertEqual(current?.meal.id, meal)
        XCTAssertEqual(current?.state, .inService)
        let none = try await server(#"{"meal":null}"#).currentMeal(for: mess)
        XCTAssertNil(none)
    }

    func testMeals() async throws {
        let meals = try await server("[\(mealJSON)]").meals(for: mess)
        try assertSent("GET", "/messes/main/meals")
        XCTAssertEqual(meals.first?.startedAt, ISO8601.parse("2026-08-14T07:02:00Z"))
        XCTAssertNil(meals.first?.closedAt)
    }

    func testStartAndCloseMeal() async throws {
        let started = try await server(#"{"meal":\#(mealJSON)}"#).startMeal(meal, by: .supervisor)
        try assertSent("POST", "/meals/lunch-1/start", idempotent: true)
        XCTAssertEqual(started.state, .inService)
        _ = try await server(#"{"meal":\#(mealJSON)}"#).closeMeal(meal, by: .supervisor)
        try assertSent("POST", "/meals/lunch-1/close", idempotent: true)
    }

    func testMealHistoryKeepsMissingValuesMissing() async throws {
        let json = #"[{"mealId":"lunch-0","messId":"main","slot":"lunch","day":"2026-08-13T00:00:00+05:30","closedAt":null,"finalEntries":{"status":"unavailable","count":null,"asOf":null},"shortages":[{"dishName":null,"status":"resolved","resolvedAt":null}],"waste":{"status":"notRecorded","recordedAt":null},"wasteReport":null}]"#
        let records = try await server(json).mealHistory(for: mess)
        try assertSent("GET", "/messes/main/meal-history")
        let record = try XCTUnwrap(records.first)
        XCTAssertEqual(record.finalEntries, .unavailable, "Missing final entries are never 0")
        XCTAssertEqual(record.shortages, [.init(dishName: nil, outcome: .resolved(at: nil))])
        XCTAssertEqual(record.waste, .notRecorded)
        XCTAssertNil(record.wasteReport)
    }

    // MARK: Headcount

    func testHeadcountKeepsTheSixValuesSeparate() async throws {
        let headcount = try await server(headcountJSON).headcount(for: meal)
        try assertSent("GET", "/meals/lunch-1/headcount")
        XCTAssertEqual(headcount.liveForecast, .ready(diners: 812, setAt: instant))
        XCTAssertEqual(headcount.cutoffForecast, .notReady, "Not filled from the live forecast")
        XCTAssertEqual(headcount.approved.count, 800)
        XCTAssertEqual(headcount.sentToVendor, .notSent, "Not filled from the approval")
        XCTAssertEqual(headcount.actualEntries, .available(120, asOf: instant))
        XCTAssertEqual(headcount.finalEntries, .unavailable, "Not filled from actual entries, never 0")
        XCTAssertEqual(headcount.vendorAcknowledgmentStatus, .notPublished)
    }

    func testApprovePublishAndAcknowledgeHeadcount() async throws {
        _ = try await server(headcountJSON).approveHeadcount(800, reason: "Exam week", for: meal, by: .admin)
        let approval = try assertSent("PUT", "/meals/lunch-1/headcount/approval")
        XCTAssertEqual(StubURLProtocol.jsonBody(approval)?["count"] as? Int, 800)
        XCTAssertEqual(StubURLProtocol.jsonBody(approval)?["reason"] as? String, "Exam week")
        _ = try await server(headcountJSON).publishHeadcount(for: meal, by: .admin)
        try assertSent("POST", "/meals/lunch-1/headcount/publication", idempotent: true)
        _ = try await server(headcountJSON).acknowledgeHeadcount(for: meal, by: AccountID("vendor-1"))
        try assertSent("POST", "/meals/lunch-1/headcount/acknowledgment", idempotent: true)
    }

    func testAReadyForecastWithoutDinersIsRejectedNotZero() async {
        let broken = headcountJSON.replacingOccurrences(of: #""diners":812"#, with: #""diners":null"#)
        do {
            _ = try await server(broken).headcount(for: meal)
            XCTFail("A broken answer is never patched into a number")
        } catch RepositoryError.unavailable {
        } catch {
            XCTFail("\(error)")
        }
    }

    // MARK: Entries

    func testRecordEntrySendsTheKeyAndReturnsTheRecord() async throws {
        let key = IdempotencyKey.make()
        let request = EntryRequest(mealID: meal, student: StudentRef(id: StudentID("s1"), maskedID: "••0238"),
                                   method: .qrScan, idempotencyKey: key)
        let json = #"{"entryId":"e1","mealId":"lunch-1","student":\#(studentJSON),"method":"qrScan","recordedAt":"\#(at)","hadMealResponse":false,"count":121}"#
        let result = try await server(201, json).recordEntry(request)
        let sent = try assertSent("POST", "/meals/lunch-1/entries", idempotent: true)
        XCTAssertEqual(sent.value(forHTTPHeaderField: "Idempotency-Key"), key.rawValue)
        XCTAssertEqual(StubURLProtocol.jsonBody(sent)?["studentId"] as? String, "s1")
        XCTAssertEqual(StubURLProtocol.jsonBody(sent)?["method"] as? String, "qrScan")
        guard case .recorded(let record, let count) = result else { return XCTFail("\(result)") }
        XCTAssertEqual(count, 121)
        XCTAssertFalse(record.hadMealResponse)
    }

    func testASecondEntryIsAlreadyRecordedAndCountsNothing() async throws {
        let request = EntryRequest(mealID: meal, student: StudentRef(id: StudentID("s1"), maskedID: "••0238"),
                                   method: .typedLastFour, idempotencyKey: .make())
        let problem = #"{"type":"about:blank","title":"Already recorded","status":409,"code":"already_recorded","firstRecordedAt":"\#(at)","count":121}"#
        let result = try await server(409, problem).recordEntry(request)
        XCTAssertEqual(result, .alreadyRecorded(firstRecordedAt: instant, count: 121))
    }

    func testAnOfflineScanIsNeverRecorded() async {
        let request = EntryRequest(mealID: meal, student: StudentRef(id: StudentID("s1"), maskedID: "••0238"),
                                   method: .qrScan, idempotencyKey: .make())
        let (api, _) = api { _ in .failure(.notConnectedToInternet) }
        do {
            let result = try await api.recordEntry(request)
            XCTFail("An offline scan returned \(result)")
        } catch RepositoryError.offline {
        } catch {
            XCTFail("\(error)")
        }
    }

    func testATimedOutScanIsNotShownAsDone() async {
        let request = EntryRequest(mealID: meal, student: StudentRef(id: StudentID("s1"), maskedID: "••0238"),
                                   method: .qrScan, idempotencyKey: .make())
        do {
            _ = try await api { _ in .failure(.timedOut) }.0.recordEntry(request)
            XCTFail("A timeout is never a result")
        } catch RepositoryError.unavailable {
        } catch {
            XCTFail("\(error)")
        }
    }

    func testLiveAndFinalCounts() async throws {
        let live = try await server(#"{"status":"available","kind":"live","count":0,"asOf":"\#(at)"}"#).liveCount(for: meal)
        try assertSent("GET", "/meals/lunch-1/entries/count", query: "kind=live")
        XCTAssertEqual(live, .available(0, asOf: instant), "A measured zero stays a zero")
        let final = try await server(#"{"status":"unavailable","kind":"final","count":null,"asOf":null}"#).finalCount(for: meal)
        try assertSent("GET", "/meals/lunch-1/entries/count", query: "kind=final")
        XCTAssertEqual(final, .unavailable, "Missing stays missing")
    }

    func testEnteredWithoutVoting() async throws {
        let rows = try await server(#"[{"mealId":"lunch-1","student":\#(studentJSON),"enteredAt":"\#(at)"}]"#)
            .enteredWithoutVoting(for: meal)
        try assertSent("GET", "/meals/lunch-1/entries/without-answer")
        XCTAssertEqual(rows.first?.student.maskedID, "••0238")
    }

    func testEntryCode() async throws {
        let code = try await server(#"{"payload":"ML1:abc","lastFour":"0238"}"#).entryCode(for: StudentID("s1"))
        try assertSent("GET", "/students/s1/entry-code")
        XCTAssertEqual(code, EntryCode(payload: "ML1:abc", lastFour: "0238"))
    }

    func testResolveEntryKeepsTheCredentialOutOfTheURL() async throws {
        let result = try await server(#"{"result":"wrongMeal","student":null,"servingNow":"dinner"}"#)
            .resolveEntry(.qrPayload("ML1:abc"), for: meal)
        let sent = try assertSent("POST", "/meals/lunch-1/entry-credentials")
        XCTAssertFalse(sent.url!.absoluteString.contains("ML1"))
        XCTAssertEqual(StubURLProtocol.jsonBody(sent)?["kind"] as? String, "qrPayload")
        XCTAssertEqual(result, .wrongMeal(servingNow: .dinner))
        let found = try await server(#"{"result":"student","student":\#(studentJSON),"servingNow":null}"#)
            .resolveEntry(.lastFour("0238"), for: meal)
        XCTAssertEqual(found, .student(StudentRef(id: StudentID("s1"), maskedID: "••0238")))
    }

    // MARK: Intentions

    func testReadAndSetTheStudentsAnswer() async throws {
        let none = try await server(#"{"mealId":"lunch-1","response":"noResponse","intention":null,"answeredAt":null}"#)
            .response(of: StudentID("s1"), for: meal)
        try assertSent("GET", "/meals/lunch-1/intentions/me")
        XCTAssertEqual(none, .noResponse, "No response is its own group, never a skip")
        let set = try await server(#"{"mealId":"lunch-1","response":"answered","intention":"in","answeredAt":"\#(at)"}"#)
            .setIntention(.attending, of: StudentID("s1"), for: meal)
        let sent = try assertSent("PUT", "/meals/lunch-1/intentions/me")
        XCTAssertEqual(StubURLProtocol.jsonBody(sent)?["intention"] as? String, "in")
        XCTAssertEqual(set, .answered(.attending, at: instant))
    }

    func testAnAnswerAfterTheCutoffIsRefused() async {
        let problem = #"{"type":"about:blank","title":"Too late","status":409,"code":"cutoff_passed","detail":"Answers closed at 10:00 AM."}"#
        do {
            _ = try await server(409, problem).setIntention(.skipping, of: StudentID("s1"), for: meal)
            XCTFail("A refused answer is never saved")
        } catch RepositoryError.notAllowed(let reason) {
            XCTAssertEqual(reason, "Answers closed at 10:00 AM.")
        } catch {
            XCTFail("\(error)")
        }
    }

    func testAnswerCounts() async throws {
        let counts = try await server(#"{"in":500,"skip":120,"notSure":40,"noResponse":200}"#).answerCounts(for: meal)
        try assertSent("GET", "/meals/lunch-1/intentions/counts")
        XCTAssertEqual(counts, MealAnswerCounts(attending: 500, skipping: 120, notSure: 40, noResponse: 200))
    }

    // MARK: Shortages

    func testReportShortage() async throws {
        let key = IdempotencyKey.make()
        let report = ShortageReport(mealID: meal, dishName: "Sambar", level: .almostOut, note: nil,
                                    reportedBy: .kitchenStaff, idempotencyKey: key)
        let shortage = try await server(201, shortageJSON).reportShortage(report)
        let sent = try assertSent("POST", "/meals/lunch-1/shortages", idempotent: true)
        XCTAssertEqual(sent.value(forHTTPHeaderField: "Idempotency-Key"), key.rawValue)
        XCTAssertEqual(StubURLProtocol.jsonBody(sent)?["level"] as? String, "almostOut")
        XCTAssertEqual(shortage.delivery, .seen(at: instant, by: "Ravi"))
    }

    func testListResolveAndSeeShortages() async throws {
        let rows = try await server("[\(shortageJSON)]").shortages(for: meal)
        try assertSent("GET", "/meals/lunch-1/shortages")
        XCTAssertEqual(rows.first?.status, .active)
        let resolved = shortageJSON.replacingOccurrences(of: #""status":"active","resolvedAt":null"#,
                                                         with: #""status":"resolved","resolvedAt":"\#(at)""#)
        let done = try await server(resolved).markResolved(ShortageID("sh1"), by: .supervisor)
        try assertSent("PUT", "/shortages/sh1/resolution")
        XCTAssertEqual(done.status, .resolved(at: instant))
        _ = try await server(shortageJSON).markSeen(ShortageID("sh1"), by: .supervisor)
        try assertSent("PUT", "/shortages/sh1/seen")
    }

    // MARK: Waste reports

    func testWasteReportKeepsEveryMeasurementApart() async throws {
        let report = try await server(wasteJSON).report(for: meal)
        try assertSent("GET", "/meals/lunch-1/waste-report")
        XCTAssertEqual(report.leftovers.map(\.measurement), [.entered(4.5), .notEntered, .noneLeft])
        XCTAssertEqual(report.plateWaste, .notEntered, "Missing plate waste is never 0")
        XCTAssertEqual(report.status, .draft(savedAt: instant))
    }

    func testWasteSummary() async throws {
        let summary = try await server(#"{"mealId":"lunch-1","status":"notStarted","savedAt":null,"completedFieldCount":0,"totalFieldCount":4}"#)
            .summary(for: meal)
        try assertSent("GET", "/meals/lunch-1/waste-report/summary")
        XCTAssertEqual(summary.status, .notStarted)
        XCTAssertEqual(summary.totalFieldCount, 4)
    }

    func testSaveDraftAndRecordSendTheWholeReport() async throws {
        let report = WasteReport(mealID: meal, leftovers: [
            DishLeftover(dishID: DishID("d1"), dishName: "Sambar", unit: .litres, measurement: .entered(4.5)),
            DishLeftover(dishID: DishID("d2"), dishName: "Rice", unit: .kilograms, measurement: .notEntered),
        ], plateWaste: .notEntered, status: .notStarted)
        _ = try await server(wasteJSON).saveDraft(report, by: .kitchenStaff)
        let draft = try assertSent("PUT", "/meals/lunch-1/waste-report")
        let body = try XCTUnwrap(StubURLProtocol.jsonBody(draft))
        XCTAssertEqual(body["action"] as? String, "saveDraft")
        let leftovers = try XCTUnwrap(body["leftovers"] as? [[String: Any]])
        XCTAssertEqual((leftovers[1]["measurement"] as? [String: Any])?["state"] as? String, "notEntered")
        XCTAssertNil((leftovers[1]["measurement"] as? [String: Any])?["value"], "A missing value is not sent as 0")
        XCTAssertEqual((body["plateWaste"] as? [String: Any])?["state"] as? String, "notEntered")

        _ = try await server(wasteJSON).save(report, by: .kitchenStaff)
        let recorded = try assertSent("PUT", "/meals/lunch-1/waste-report")
        XCTAssertEqual(StubURLProtocol.jsonBody(recorded)?["action"] as? String, "record")
    }

    // MARK: SOS

    func testRaiseAndListSOS() async throws {
        let key = IdempotencyKey.make()
        let raised = try await server(201, sosJSON).raise(SOSReport(messID: mess, title: "Spill", place: "Counter 2",
                                                                 idempotencyKey: key))
        let sent = try assertSent("POST", "/messes/main/sos-cases", idempotent: true)
        XCTAssertEqual(sent.value(forHTTPHeaderField: "Idempotency-Key"), key.rawValue)
        XCTAssertEqual(raised.claim, SOSClaim(role: .doorScanner, at: instant))
        let cases = try await server("[\(sosJSON)]").activeCases(for: mess)
        try assertSent("GET", "/messes/main/sos-cases", query: "status=open")
        XCTAssertEqual(cases.first?.status, .open)
    }

    func testClaimCheckAndCloseSOS() async throws {
        _ = try await server(sosJSON).claim(SOSCaseID("sos1"), by: .doorScanner)
        try assertSent("PUT", "/sos-cases/sos1/claim")
        _ = try await server(sosJSON).markChecked(SOSCaseID("sos1"), by: .kitchenStaff)
        try assertSent("PUT", "/sos-cases/sos1/check")
        let closedJSON = sosJSON.replacingOccurrences(of: #""status":{"state":"open","at":null,"by":null}"#,
                                                      with: #""status":{"state":"closed","at":"\#(at)","by":"supervisor"}"#)
        let closed = try await server(closedJSON).close(SOSCaseID("sos1"), by: .supervisor)
        try assertSent("PUT", "/sos-cases/sos1/close")
        XCTAssertEqual(closed.status, .closed(at: instant, by: .supervisor))
    }

    func testAWrongRoleIsRefusedWithTheServersReason() async {
        let problem = #"{"type":"about:blank","title":"Forbidden","status":403,"code":"forbidden","detail":"Only the supervisor closes a case."}"#
        do {
            _ = try await server(403, problem).close(SOSCaseID("sos1"), by: .doorScanner)
            XCTFail("A refused close is never a result")
        } catch RepositoryError.notAllowed(let reason) {
            XCTAssertEqual(reason, "Only the supervisor closes a case.")
        } catch {
            XCTFail("\(error)")
        }
    }

    // MARK: Sign-in

    func testSignInSavesTheCredentialAndSendsNoneItself() async throws {
        let issued = UUID().uuidString
        let json = #"{"token":"\#(issued)","account":{"id":"a1","displayName":"Food Head","email":"foodhead@example.invalid","role":"admin","scope":{"kind":"mess","id":"main"}},"staff":null,"student":null}"#
        let (api, tokens) = api(token: nil) { _ in .json(201, json) }
        let session = try await api.signIn(email: "foodhead@example.invalid", password: UUID().uuidString)
        let sent = try XCTUnwrap(StubURLProtocol.requests.first)
        XCTAssertEqual(sent.httpMethod, "POST")
        XCTAssertEqual(sent.url?.path, "/v1/sessions")
        XCTAssertNil(sent.value(forHTTPHeaderField: "Authorization"))
        XCTAssertEqual(session.account.role, .admin)
        XCTAssertEqual(session.account.scope, .mess(MessID("main")))
        let saved = await tokens.read()
        XCTAssertEqual(saved, issued)
    }

    func testAWrongPasswordSaysNeitherWhichNorSavesAnything() async throws {
        let (api, tokens) = api(token: nil) { _ in
            .json(401, #"{"type":"about:blank","title":"Unauthorized","status":401,"code":"invalid_credentials"}"#)
        }
        do {
            _ = try await api.signIn(email: "someone@example.invalid", password: UUID().uuidString)
            XCTFail("A refused sign-in is never a session")
        } catch RepositoryError.invalidCredentials {
        } catch {
            XCTFail("\(error)")
        }
        let saved = await tokens.read()
        XCTAssertNil(saved)
    }


    func testAnExpiredSessionAsksToSignInAgain() async {
        do {
            _ = try await server(401, #"{"type":"about:blank","title":"Unauthorized","status":401,"code":"unauthorized"}"#)
                .menu(for: meal)
            XCTFail("An expired session is never a result")
        } catch RepositoryError.notAllowed(let reason) {
            XCTAssertEqual(reason, "Your session has ended. Sign in again.")
        } catch {
            XCTFail("\(error)")
        }
    }

    func testWithoutABackendAddressEveryOperationIsNotImplemented() async {
        let api = RemoteAPI(baseURL: nil)
        do {
            _ = try await api.headcount(for: meal)
            XCTFail("No backend, no result")
        } catch RepositoryError.notImplemented(let feature) {
            XCTAssertEqual(feature, "Remote · headcount")
        } catch {
            XCTFail("\(error)")
        }
    }
}
