import Foundation

/// A student as staff see them: a masked SRM ID only (for example "••0238").
struct StudentRef: Codable, Sendable, Hashable, Identifiable {
    let id: StudentID
    let maskedID: String
}

enum EntryMethod: String, Codable, Sendable, Hashable {
    case qrScan
    /// The manual fallback: the last 4 digits of the SRM ID.
    case typedLastFour
}

/// A verified entry at the door. It confirms entry only, not that food was served or eaten.
struct EntryRecord: Codable, Sendable, Hashable, Identifiable {
    let id: EntryID
    let mealID: MealID
    let student: StudentRef
    let recordedAt: Date
    let method: EntryMethod
    /// False when the student gave no meal answer. Such entries also go on the "Entered without voting" list.
    let hadMealResponse: Bool
}

struct EntryRequest: Codable, Sendable, Hashable {
    let mealID: MealID
    let student: StudentRef
    let method: EntryMethod
    let idempotencyKey: IdempotencyKey
}

/// The outcome of a scan. There is no decline step and no supervisor approval.
/// An offline or unverifiable scan is an error (`RepositoryError.offline`), never a result.
enum EntryResult: Codable, Sendable, Hashable {
    case recorded(EntryRecord, count: Int)
    /// The student was already recorded for this meal. Nothing was added to the count.
    case alreadyRecorded(firstRecordedAt: Date, count: Int)
}

/// A student who entered without answering. This is not a vote and is never mixed with answers.
struct EnteredWithoutVoting: Codable, Sendable, Hashable {
    let mealID: MealID
    let student: StudentRef
    let enteredAt: Date
}
