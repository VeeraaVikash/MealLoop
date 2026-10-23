import Foundation

/// A typed identifier. `Tag` is only a marker, so a `MealID` can never be passed where a `MessID` is expected.
struct Identifier<Tag>: Hashable, Codable, Sendable, CustomStringConvertible {
    let rawValue: String

    init(_ rawValue: String) {
        self.rawValue = rawValue
    }

    init(from decoder: Decoder) throws {
        rawValue = try decoder.singleValueContainer().decode(String.self)
    }

    func encode(to encoder: Encoder) throws {
        var container = encoder.singleValueContainer()
        try container.encode(rawValue)
    }

    var description: String { rawValue }
}

typealias MessID = Identifier<Mess>
typealias MealID = Identifier<Meal>
typealias DishID = Identifier<Dish>
typealias StudentID = Identifier<StudentRef>
typealias EntryID = Identifier<EntryRecord>
typealias ShortageID = Identifier<Shortage>
typealias SOSCaseID = Identifier<SOSCase>
typealias FeedbackID = Identifier<Feedback>
typealias CommunityIssueID = Identifier<CommunityIssue>
typealias OutingRequestID = Identifier<OutingRequest>
typealias SpecialPassID = Identifier<SpecialPass>

/// Sent with every write that must not be applied twice (an entry scan, a shortage report).
/// The server returns the original result when it sees the same key again.
struct IdempotencyKey: Hashable, Codable, Sendable {
    let rawValue: String

    init(_ rawValue: String) {
        self.rawValue = rawValue
    }

    static func make() -> IdempotencyKey {
        IdempotencyKey(UUID().uuidString)
    }
}
