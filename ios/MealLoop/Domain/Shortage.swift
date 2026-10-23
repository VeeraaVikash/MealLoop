import Foundation

enum ShortageLevel: String, Codable, Sendable, CaseIterable, Hashable {
    case gettingLow
    case almostOut
    case out
}

/// Whether the report reached the Supervisor. "Seen" is shown only when it was confirmed.
enum ShortageDelivery: Codable, Sendable, Hashable {
    case sent(at: Date)
    case seen(at: Date, by: String)
    case couldNotSend
}

enum ShortageStatus: Codable, Sendable, Hashable {
    case active
    /// Only the Supervisor marks a shortage resolved.
    case resolved(at: Date)
}

struct Shortage: Codable, Sendable, Hashable, Identifiable {
    let id: ShortageID
    let mealID: MealID
    let dishName: String
    let level: ShortageLevel
    let note: String?
    let reportedAt: Date
    let reportedBy: Role
    var delivery: ShortageDelivery
    var status: ShortageStatus
}

struct ShortageReport: Codable, Sendable, Hashable {
    let mealID: MealID
    let dishName: String
    let level: ShortageLevel
    let note: String?
    let reportedBy: Role
    let idempotencyKey: IdempotencyKey
}
