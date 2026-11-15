import XCTest
@testable import MealLoop

/// The generic client: request building, the bearer credential, status codes and transport failures.
final class HTTPClientTests: XCTestCase {
    private struct Echo: Codable, Equatable { let value: String }

    private func client(token: String? = UUID().uuidString, retry: HTTPClient.RetryPolicy = .none,
                        _ handler: @escaping (URLRequest) -> StubURLProtocol.Reply) -> HTTPClient {
        HTTPClient(baseURL: stubBaseURL, session: StubURLProtocol.session(handler), credential: { token }, retry: retry)
    }

    func testARequestCarriesTheMethodPathQueryAndHeaders() async throws {
        let token = UUID().uuidString
        let key = IdempotencyKey.make()
        let client = client(token: token) { _ in .json(200, #"{"value":"ok"}"#) }
        let echo: Echo = try await client.send(Endpoint(method: .post, path: "/meals/m1/entries",
                                                        query: [URLQueryItem(name: "kind", value: "live")],
                                                        body: Echo(value: "sent"), idempotencyKey: key))
        XCTAssertEqual(echo, Echo(value: "ok"))
        let request = try XCTUnwrap(StubURLProtocol.requests.first)
        XCTAssertEqual(request.httpMethod, "POST")
        XCTAssertEqual(request.url?.absoluteString, "https://api.example.invalid/v1/meals/m1/entries?kind=live")
        XCTAssertEqual(request.value(forHTTPHeaderField: "Authorization"), "Bearer \(token)")
        XCTAssertEqual(request.value(forHTTPHeaderField: "Idempotency-Key"), key.rawValue)
        XCTAssertEqual(request.value(forHTTPHeaderField: "Content-Type"), "application/json")
        XCTAssertEqual(request.value(forHTTPHeaderField: "Accept"), "application/json")
        XCTAssertEqual(StubURLProtocol.jsonBody(request)?["value"] as? String, "sent")
    }

    func testAnOpenEndpointSendsNoCredential() async throws {
        let client = client(token: nil) { _ in .empty(204) }
        try await client.send(Endpoint(method: .post, path: "/sessions", requiresAuthentication: false))
        XCTAssertNil(StubURLProtocol.requests.first?.value(forHTTPHeaderField: "Authorization"))
    }

    func testWithoutACredentialNothingIsSent() async {
        let client = client(token: nil) { _ in .empty(200) }
        await XCTAssertThrowsHTTPError(.notSignedIn) { try await client.send(Endpoint(method: .get, path: "/x")) }
        XCTAssertTrue(StubURLProtocol.requests.isEmpty, "A signed-in call never goes out without a credential")
    }

    func testWithoutABackendAddressEveryCallIsNotConfigured() async {
        let client = HTTPClient(baseURL: nil)
        await XCTAssertThrowsHTTPError(.notConfigured) { try await client.send(Endpoint(method: .get, path: "/x")) }
    }

    func testAnErrorStatusKeepsTheProblemDetails() async {
        let client = client { _ in
            .json(409, #"{"type":"about:blank","title":"Too late","status":409,"code":"cutoff_passed","detail":"Answers closed at 10:00"}"#)
        }
        do {
            try await client.send(Endpoint(method: .put, path: "/x"))
            XCTFail("A 409 is never a success")
        } catch HTTPError.status(let code, let problem) {
            XCTAssertEqual(code, 409)
            XCTAssertEqual(problem?.code, "cutoff_passed")
            XCTAssertEqual(problem?.detail, "Answers closed at 10:00")
        } catch {
            XCTFail("\(error)")
        }
    }

    func testNoConnectionIsOfflineAndATimeoutIsKeptApart() async {
        await XCTAssertThrowsHTTPError(.offline) {
            try await self.client { _ in .failure(.notConnectedToInternet) }.send(Endpoint(method: .get, path: "/x"))
        }
        await XCTAssertThrowsHTTPError(.timedOut) {
            try await self.client { _ in .failure(.timedOut) }.send(Endpoint(method: .get, path: "/x"))
        }
    }

    func testABodyThatBreaksTheContractIsNotASuccess() async {
        let client = client { _ in .json(200, #"{"other":1}"#) }
        do {
            let _: Echo = try await client.send(Endpoint(method: .get, path: "/x"))
            XCTFail("An unreadable body is never a result")
        } catch HTTPError.invalidResponse {
        } catch {
            XCTFail("\(error)")
        }
    }

    func testRetryRepeatsOnlyWhatIsSafeToRepeat() async throws {
        var calls = 0
        let flaky = { (_: URLRequest) -> StubURLProtocol.Reply in
            calls += 1
            return calls < 3 ? .failure(.networkConnectionLost) : .json(200, #"{"value":"ok"}"#)
        }
        let retrying = HTTPClient.RetryPolicy(maxAttempts: 3, delay: .zero)

        let echo: Echo = try await client(retry: retrying, flaky).send(Endpoint(method: .get, path: "/x"))
        XCTAssertEqual(echo.value, "ok")
        XCTAssertEqual(calls, 3, "A read is repeated")

        calls = 0
        await XCTAssertThrowsHTTPError(.offline) {
            try await self.client(retry: retrying, flaky).send(Endpoint(method: .post, path: "/x"))
        }
        XCTAssertEqual(calls, 1, "A POST without an idempotency key is never repeated")

        calls = 0
        let key = IdempotencyKey.make()
        try await client(retry: retrying, flaky).send(Endpoint(method: .post, path: "/x", idempotencyKey: key))
        XCTAssertEqual(calls, 3)
        XCTAssertEqual(Set(StubURLProtocol.requests.compactMap { $0.value(forHTTPHeaderField: "Idempotency-Key") }),
                       [key.rawValue], "Every attempt carries the same key, so the server applies it once")
    }

    func testTheDefaultIsOneAttempt() async {
        var calls = 0
        let client = client { _ in calls += 1; return .failure(.networkConnectionLost) }
        await XCTAssertThrowsHTTPError(.offline) { try await client.send(Endpoint(method: .get, path: "/x")) }
        XCTAssertEqual(calls, 1, "The retry count is an open decision (NET-2)")
    }

    func testDatesAreReadWithAndWithoutFractionalSeconds() {
        XCTAssertEqual(ISO8601.parse("2026-08-14T07:30:00Z"), Date(timeIntervalSince1970: 1_786_692_600))
        XCTAssertEqual(ISO8601.parse("2026-08-14T13:00:00.250+05:30"), Date(timeIntervalSince1970: 1_786_692_600.25))
        XCTAssertNil(ISO8601.parse("14 Aug 2026"))
    }

    func testTheInMemoryStoreKeepsAndClearsACredential() async throws {
        let store = InMemoryTokenStore()
        let token = UUID().uuidString
        try await store.save(token)
        let saved = await store.read()
        XCTAssertEqual(saved, token)
        try await store.clear()
        let cleared = await store.read()
        XCTAssertNil(cleared)
    }
}

/// Fails unless `body` throws exactly `expected`.
func XCTAssertThrowsHTTPError(_ expected: HTTPError, file: StaticString = #filePath, line: UInt = #line,
                              _ body: () async throws -> Void) async {
    do {
        try await body()
        XCTFail("Expected \(expected), got a result", file: file, line: line)
    } catch let error as HTTPError {
        XCTAssertEqual(error, expected, file: file, line: line)
    } catch {
        XCTFail("Expected \(expected), got \(error)", file: file, line: line)
    }
}
