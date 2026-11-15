import Foundation

/// What the vendor account reads. Acknowledging stays on `HeadcountRepository.acknowledgeHeadcount`.
protocol VendorRepository: Sendable {
    /// The mess this vendor account serves.
    func vendorMess(for account: AccountID) async throws -> Mess
    /// Today's meals whose headcount reached the vendor, earliest first. A meal not sent is left out.
    func vendorHistory(for account: AccountID) async throws -> [VendorHeadcountEntry]
}
