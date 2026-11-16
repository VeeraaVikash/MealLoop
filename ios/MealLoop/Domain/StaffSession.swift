import Foundation

/// The mess context of a signed-in mess staff account.
/// Staff are shown by initials only; the design never invents a staff name.
struct StaffSession: Codable, Sendable, Hashable {
    let role: Role
    let mess: Mess
    let staffInitials: String
    /// The Supervisor of this mess, named on "Send to …" and "… saw it" lines.
    let supervisorName: String
}
