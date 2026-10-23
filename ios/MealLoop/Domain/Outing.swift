import Foundation

/// How the guardian's approval was captured. There is deliberately no text-only method.
enum GuardianEvidenceMethod: String, Codable, Sendable, CaseIterable, Hashable {
    /// 10-second live video; phrase and random code matched automatically.
    case liveVideoAutoChecked
    /// The video did not pass the automatic check after 3 tries; the warden must watch it.
    case videoNeedsReview
    /// Live photo, the typed phrase and a code sent to the guardian's phone.
    case photoAndText
    /// The warden phoned the guardian and recorded the answer.
    case confirmedByCall
}

/// Evidence, not proof. Retention (draft 30 days) and the policy are not approved yet.
struct GuardianEvidence: Codable, Sendable, Hashable {
    let method: GuardianEvidenceMethod
    let capturedAt: Date

    /// The guardian's face is always captured, except on the call path, which the warden records.
    var capturesGuardianFace: Bool { method != .confirmedByCall }
}

enum GuardianDecision: Codable, Sendable, Hashable {
    case approved(GuardianEvidence)
    case rejected(reason: String?)
}

/// The digital outing journey:
/// request → guardian verification → warden decision → pass issued → gate exit → gate return.
/// An approval does not prove the student left; only gate events do.
enum OutingState: Codable, Sendable, Hashable {
    case awaitingGuardian
    case guardianRejected
    case awaitingWarden(GuardianEvidence)
    case changeRequested
    case wardenRejected
    case passIssued
    case out(exitedAt: Date)
    case returned(exitedAt: Date, returnedAt: Date)
    /// A deadline passed or a return is overdue. Escalated to a person; never approved automatically.
    case escalated(previous: EscalatedFrom)
    case withdrawn
}

enum EscalatedFrom: String, Codable, Sendable, Hashable {
    case awaitingGuardian
    case awaitingWarden
    case overdueReturn
}

enum OutingEvent: Sendable, Hashable {
    case guardianAnswered(GuardianDecision)
    case wardenApproved
    case wardenRejected
    case wardenAskedForChange
    case gateExit(at: Date)
    case gateReturn(at: Date)
    case deadlinePassed
    case returnOverdue
    case withdrawn
}

enum OutingTransitionError: Error, Equatable, Sendable {
    case notAllowed(from: OutingState, event: String)
}

extension OutingState {
    /// Applies one event. Anything the journey does not allow throws instead of guessing.
    func applying(_ event: OutingEvent) throws -> OutingState {
        switch (self, event) {
        case (.awaitingGuardian, .guardianAnswered(.approved(let evidence))):
            return .awaitingWarden(evidence)
        case (.awaitingGuardian, .guardianAnswered(.rejected)):
            return .guardianRejected
        case (.awaitingGuardian, .deadlinePassed):
            return .escalated(previous: .awaitingGuardian)
        case (.awaitingWarden, .wardenApproved):
            return .passIssued
        case (.awaitingWarden, .wardenRejected):
            return .wardenRejected
        case (.awaitingWarden, .wardenAskedForChange):
            return .changeRequested
        case (.awaitingWarden, .deadlinePassed):
            return .escalated(previous: .awaitingWarden)
        case (.passIssued, .gateExit(let at)):
            return .out(exitedAt: at)
        case (.out(let exitedAt), .gateReturn(let at)):
            return .returned(exitedAt: exitedAt, returnedAt: at)
        case (.out, .returnOverdue):
            return .escalated(previous: .overdueReturn)
        case (.awaitingGuardian, .withdrawn), (.awaitingWarden, .withdrawn), (.passIssued, .withdrawn), (.changeRequested, .withdrawn):
            return .withdrawn
        default:
            throw OutingTransitionError.notAllowed(from: self, event: String(describing: event))
        }
    }

    /// Only a verified gate exit counts as evidence that the student left.
    var studentHasLeft: Bool {
        switch self {
        case .out, .returned: return true
        case .escalated(let previous): return previous == .overdueReturn
        default: return false
        }
    }
}

struct OutingRequest: Codable, Sendable, Hashable, Identifiable {
    let id: OutingRequestID
    let student: StudentRef
    let leaveAt: Date
    let returnBy: Date
    let place: String
    let reason: String
    var state: OutingState
}
