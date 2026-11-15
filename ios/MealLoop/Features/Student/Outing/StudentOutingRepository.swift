import Foundation

/// The student's own outings, on the same source the Guardian, Warden and Gate screens use, so a request the student
/// sends is the one the guardian answers. Separate from `OutingCaseRepository`, so no existing operation changes.
protocol StudentOutingRepository: Sendable {
    /// The time the outing screens show. In the prototype it is the outing story clock.
    func now() async -> Date
    func outings(for student: StudentID) async throws -> StudentOutings
    func outing(_ id: OutingRequestID, for student: StudentID) async throws -> OutingCase
    /// Sends a request to the guardian. It enters at Waiting for guardian; the same key returns the first request.
    /// Refused without a linked guardian, for a time in the past, or when a request for that day is still open.
    func requestOuting(_ draft: StudentOutingDraft, by student: StudentID) async throws -> OutingCase
    /// Withdraws a request or an unused pass. Refused once the gate recorded an exit.
    func cancelOuting(_ id: OutingRequestID, by student: StudentID) async throws -> OutingCase
}
