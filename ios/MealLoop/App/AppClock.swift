import Foundation

/// The source of "now". Injected so the demo and tests can show fixed moments.
protocol AppClock: Sendable {
    func now() -> Date
}

struct SystemClock: AppClock {
    func now() -> Date { Date() }
}
