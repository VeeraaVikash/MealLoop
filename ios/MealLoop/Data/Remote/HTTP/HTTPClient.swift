import Foundation

/// The HTTP methods the MealLoop API uses.
enum HTTPMethod: String, Sendable {
    case get = "GET"
    case post = "POST"
    case put = "PUT"
    case delete = "DELETE"
}

/// One backend operation: what to call, never how. `RemoteAPI` builds these; `HTTPClient` performs them.
struct Endpoint: Sendable {
    var method: HTTPMethod
    /// Relative to the client's base URL (which already ends in the API version, for example `/v1`).
    var path: String
    var query: [URLQueryItem] = []
    var body: (any Encodable & Sendable)?
    /// Sent as `Idempotency-Key` on writes that must not apply twice (OpenAPI `IdempotencyKey`).
    var idempotencyKey: IdempotencyKey?
    /// False only for the operations the OpenAPI draft marks `security: []` (signing in).
    var requiresAuthentication = true

    init(method: HTTPMethod, path: String, query: [URLQueryItem] = [], body: (any Encodable & Sendable)? = nil,
         idempotencyKey: IdempotencyKey? = nil, requiresAuthentication: Bool = true) {
        self.method = method
        self.path = path
        self.query = query
        self.body = body
        self.idempotencyKey = idempotencyKey
        self.requiresAuthentication = requiresAuthentication
    }

    /// Whether repeating the request cannot apply it twice: reads, `PUT`, and writes that carry an idempotency key.
    var isSafeToRepeat: Bool {
        method == .get || method == .put || idempotencyKey != nil
    }
}

/// RFC 9457 problem details, as every error response of the OpenAPI draft carries them.
struct APIProblem: Decodable, Equatable, Sendable {
    struct FieldError: Decodable, Equatable, Sendable {
        let field: String
        let message: String
    }

    let type: String?
    let title: String?
    let status: Int?
    let detail: String?
    /// The stable machine-readable code (`already_recorded`, `cutoff_passed`, `invalid_state`, ...).
    let code: String?
    let errors: [FieldError]?
    /// `WrongPasswordProblem`.
    let triesLeft: Int?
    /// `AlreadyRecordedProblem`.
    let firstRecordedAt: Date?
    let count: Int?
}

/// Every way an HTTP call can fail. `RemoteAPI` maps these to `RepositoryError` for the screens.
enum HTTPError: Error, Equatable, Sendable {
    /// No backend address is configured for this build.
    case notConfigured
    /// The device has no connection, or the request never reached the server. Nothing was recorded.
    case offline
    /// The server did not answer in time. Whether a write was applied is unknown, so it is never shown as done.
    case timedOut
    /// The request needs a signed-in account and there is no credential.
    case notSignedIn
    /// A non-2xx answer, with the problem details when the server sent them.
    case status(Int, APIProblem?)
    /// A 2xx answer whose body does not match the contract.
    case invalidResponse(String)
}

/// Performs `Endpoint`s over `URLSession`: builds the request, adds the bearer credential, encodes and decodes JSON,
/// checks the status code and turns failures into `HTTPError`. It knows nothing about meals or headcounts.
struct HTTPClient: Sendable {
    /// Repeats only requests that are safe to repeat (`Endpoint.isSafeToRepeat`), and only after the request did not
    /// reach the server. The number of attempts is an open decision (docs/OPEN_DECISIONS.md, NET-2), so the default is one.
    struct RetryPolicy: Sendable, Equatable {
        var maxAttempts: Int
        var delay: Duration

        static let none = RetryPolicy(maxAttempts: 1, delay: .zero)
    }

    let baseURL: URL?
    private let session: URLSession
    private let credential: @Sendable () async -> String?
    private let retry: RetryPolicy
    private let timeout: TimeInterval

    /// - Parameters:
    ///   - baseURL: The API root including the version (for example `https://api.example.invalid/v1`). Nil means the
    ///     build has no backend, and every call throws `notConfigured`.
    ///   - credential: The current bearer credential, read before every call (for example from `KeychainTokenStore`).
    ///   - timeout: Seconds per attempt. The value is an open decision (NET-4); 30 s is URLSession's usual request timeout.
    init(baseURL: URL?, session: URLSession = .shared, credential: @escaping @Sendable () async -> String? = { nil },
         retry: RetryPolicy = .none, timeout: TimeInterval = 30) {
        self.baseURL = baseURL
        self.session = session
        self.credential = credential
        self.retry = retry
        self.timeout = timeout
    }

    static let decoder: JSONDecoder = {
        let decoder = JSONDecoder()
        decoder.dateDecodingStrategy = .custom { decoder in
            let text = try decoder.singleValueContainer().decode(String.self)
            if let date = ISO8601.parse(text) { return date }
            throw DecodingError.dataCorrupted(.init(codingPath: decoder.codingPath,
                                                    debugDescription: "Not an RFC 3339 date-time: \(text)"))
        }
        return decoder
    }()

    static let encoder: JSONEncoder = {
        let encoder = JSONEncoder()
        encoder.dateEncodingStrategy = .custom { date, encoder in
            var container = encoder.singleValueContainer()
            try container.encode(ISO8601.format(date))
        }
        encoder.outputFormatting = [.sortedKeys]
        return encoder
    }()

    /// Performs the call and decodes the 2xx body as `Response`.
    func send<Response: Decodable>(_ endpoint: Endpoint, as type: Response.Type = Response.self) async throws -> Response {
        let data = try await perform(endpoint)
        do {
            return try Self.decoder.decode(Response.self, from: data)
        } catch {
            throw HTTPError.invalidResponse(String(describing: error))
        }
    }

    /// Performs a call whose 2xx answer has no body the app needs.
    func send(_ endpoint: Endpoint) async throws {
        _ = try await perform(endpoint)
    }

    /// The request exactly as it is sent. Internal so tests can check headers without a server.
    func makeRequest(_ endpoint: Endpoint) async throws -> URLRequest {
        guard let baseURL else { throw HTTPError.notConfigured }
        let trimmed = endpoint.path.hasPrefix("/") ? String(endpoint.path.dropFirst()) : endpoint.path
        var url = baseURL.appendingPathComponent(trimmed)
        if !endpoint.query.isEmpty {
            var components = URLComponents(url: url, resolvingAgainstBaseURL: false)
            components?.queryItems = endpoint.query
            guard let withQuery = components?.url else { throw HTTPError.invalidResponse("Bad query for \(trimmed)") }
            url = withQuery
        }
        var request = URLRequest(url: url, timeoutInterval: timeout)
        request.httpMethod = endpoint.method.rawValue
        request.setValue("application/json", forHTTPHeaderField: "Accept")
        if let body = endpoint.body {
            request.httpBody = try Self.encoder.encode(AnyEncodable(body))
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        }
        if let key = endpoint.idempotencyKey {
            request.setValue(key.rawValue, forHTTPHeaderField: "Idempotency-Key")
        }
        if endpoint.requiresAuthentication {
            guard let token = await credential(), !token.isEmpty else { throw HTTPError.notSignedIn }
            request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
        }
        return request
    }

    private func perform(_ endpoint: Endpoint) async throws -> Data {
        let request = try await makeRequest(endpoint)
        let attempts = endpoint.isSafeToRepeat ? max(1, retry.maxAttempts) : 1
        var attempt = 1
        while true {
            do {
                return try await performOnce(request)
            } catch HTTPError.offline where attempt < attempts {
                attempt += 1
                try await Task.sleep(for: retry.delay)
            }
        }
    }

    private func performOnce(_ request: URLRequest) async throws -> Data {
        let data: Data
        let response: URLResponse
        do {
            (data, response) = try await session.data(for: request)
        } catch let error as URLError {
            throw Self.map(error)
        } catch is CancellationError {
            throw CancellationError()
        } catch {
            throw HTTPError.offline
        }
        guard let http = response as? HTTPURLResponse else {
            throw HTTPError.invalidResponse("Not an HTTP response")
        }
        guard (200..<300).contains(http.statusCode) else {
            throw HTTPError.status(http.statusCode, try? Self.decoder.decode(APIProblem.self, from: data))
        }
        return data
    }

    /// Transport failures. A timeout is kept apart from "offline": the request may have reached the server.
    static func map(_ error: URLError) -> HTTPError {
        switch error.code {
        case .timedOut: return .timedOut
        default: return .offline
        }
    }
}

/// RFC 3339 dates with and without fractional seconds, as Spring Boot writes them.
enum ISO8601 {
    private static let plain: ISO8601DateFormatter = {
        let formatter = ISO8601DateFormatter()
        formatter.formatOptions = [.withInternetDateTime]
        return formatter
    }()

    private static let fractional: ISO8601DateFormatter = {
        let formatter = ISO8601DateFormatter()
        formatter.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
        return formatter
    }()

    static func parse(_ text: String) -> Date? {
        fractional.date(from: text) ?? plain.date(from: text)
    }

    static func format(_ date: Date) -> String {
        plain.string(from: date)
    }
}

/// Lets `Endpoint` carry any encodable body.
private struct AnyEncodable: Encodable {
    let value: any Encodable

    init(_ value: any Encodable) { self.value = value }

    func encode(to encoder: Encoder) throws {
        try value.encode(to: encoder)
    }
}
