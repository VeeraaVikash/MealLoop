import Foundation

/// The special-meal pass (separate from hostel outing passes).
struct SpecialPass: Codable, Sendable, Hashable, Identifiable {
    let id: SpecialPassID
    let student: StudentRef
    let mealID: MealID
    var status: SpecialPassStatus
}

enum SpecialPassStatus: Codable, Sendable, Hashable {
    case valid
    case used(at: Date)
    case notToday
    case expired
}

/// What the student's phone should be showing right now. The desk compares it; it does not scan.
/// A lookup alone never records an entry; only "Matches · record entry" does.
struct LivePassCode: Codable, Sendable, Hashable {
    let code: String
    let colourName: String
    let changesAt: Date
}

/// A pass reissue request, handled by the existing admin pass-exception flow.
enum PassReissueStatus: String, Codable, Sendable, Hashable {
    case waiting
    /// The admin said yes. This is not Done.
    case approved
    /// The student actually has the new pass.
    case done
    case rejected
}
