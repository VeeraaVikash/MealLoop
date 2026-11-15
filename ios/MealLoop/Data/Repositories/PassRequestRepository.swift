import Foundation

/// Requests for next week's Special pass. A student requests and cancels; only the Admin and Super Admin decide.
protocol PassRequestRepository: Sendable {
    /// The student's request for next week, nil when there is none (a cancelled one is nil too).
    func status(for student: StudentID) async throws -> PassRequest?
    /// Refused (`notAllowed`) while a request for next week is waiting or accepted.
    func request(for student: StudentRef, at mess: Mess) async throws -> PassRequest
    /// Only a waiting request can be cancelled.
    func cancel(for student: StudentID) async throws
    func queue(by role: Role) async throws -> PassRequestQueue
    func accept(_ id: PassRequestID, by role: Role) async throws -> PassRequest
    func decline(_ id: PassRequestID, by role: Role) async throws -> PassRequest
    /// Whether the student may use a Special pass on `date`: this week's issued pass, or next week's once accepted.
    func isPassUsable(for student: StudentID, on date: Date) async throws -> Bool
}
