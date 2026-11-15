import Foundation
@testable import MealLoop

/// Answers every request of a `URLSession` built by `StubURLProtocol.session()` from a test's handler, so the real
/// `URLSession` and `HTTPClient` code runs without a server. It records each request with its body.
final class StubURLProtocol: URLProtocol {
    enum Reply {
        case json(Int, String)
        case empty(Int)
        case failure(URLError.Code)
    }

    private static let lock = NSLock()
    private static var handler: ((URLRequest) -> Reply)?
    private static var recorded: [URLRequest] = []

    /// A session whose every request goes to `handler`. Replaces the previous handler and clears the record.
    static func session(_ handler: @escaping (URLRequest) -> Reply) -> URLSession {
        lock.lock()
        self.handler = handler
        recorded = []
        lock.unlock()
        let configuration = URLSessionConfiguration.ephemeral
        configuration.protocolClasses = [StubURLProtocol.self]
        return URLSession(configuration: configuration)
    }

    static var requests: [URLRequest] {
        lock.lock(); defer { lock.unlock() }
        return recorded
    }

    /// The JSON body of a recorded request, decoded as a dictionary.
    static func jsonBody(_ request: URLRequest) -> [String: Any]? {
        guard let data = request.httpBody else { return nil }
        return (try? JSONSerialization.jsonObject(with: data)) as? [String: Any]
    }

    override class func canInit(with request: URLRequest) -> Bool { true }
    override class func canonicalRequest(for request: URLRequest) -> URLRequest { request }

    override func startLoading() {
        var request = self.request
        // URLSession moves the body into a stream before a protocol sees it.
        if request.httpBody == nil, let stream = request.httpBodyStream {
            request.httpBody = Self.read(stream)
        }
        Self.lock.lock()
        Self.recorded.append(request)
        let handler = Self.handler
        Self.lock.unlock()

        switch handler?(request) ?? .failure(.notConnectedToInternet) {
        case .failure(let code):
            client?.urlProtocol(self, didFailWithError: URLError(code))
        case .empty(let status):
            respond(status, data: Data())
        case .json(let status, let text):
            respond(status, data: Data(text.utf8), contentType: status < 300 ? "application/json" : "application/problem+json")
        }
    }

    override func stopLoading() {}

    private func respond(_ status: Int, data: Data, contentType: String = "application/json") {
        let response = HTTPURLResponse(url: request.url!, statusCode: status, httpVersion: "HTTP/1.1",
                                       headerFields: ["Content-Type": contentType])!
        client?.urlProtocol(self, didReceive: response, cacheStoragePolicy: .notAllowed)
        client?.urlProtocol(self, didLoad: data)
        client?.urlProtocolDidFinishLoading(self)
    }

    private static func read(_ stream: InputStream) -> Data {
        stream.open(); defer { stream.close() }
        var data = Data()
        var buffer = [UInt8](repeating: 0, count: 4096)
        while stream.hasBytesAvailable {
            let count = stream.read(&buffer, maxLength: buffer.count)
            guard count > 0 else { break }
            data.append(buffer, count: count)
        }
        return data
    }
}

/// A placeholder backend address. `.invalid` is reserved (RFC 2606), so it can never reach a real server.
let stubBaseURL = URL(string: "https://api.example.invalid/v1")!
