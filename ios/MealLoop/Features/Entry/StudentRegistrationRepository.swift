import Foundation

/// Student Register: the directory lookup and account creation. Used only by the Entry feature.
/// SIMULATED in Debug and Review (seeded directory records); Release has no provider yet and throws `notImplemented`.
protocol StudentRegistrationRepository: Sendable {
    /// The directory record for an email, or nil when the directory has none. Throws when the directory cannot be
    /// reached, so a failure is never read as "not found".
    func directoryRecord(forEmail email: String) async throws -> StudentDirectoryRecord?
    /// Creates the account and signs the student in. The source checks the directory match again; the client's
    /// confirmation is never trusted on its own.
    func registerStudent(_ request: StudentRegistrationRequest) async throws -> Session
}
