import Foundation

/// Plain status words shared by feedback and Community issues.
enum FollowUpStatus: String, Codable, Sendable, Hashable {
    case sent
    case seen
    case workingOnIt
    /// Allowed only with a recorded corrective action (see `CommunityIssue.canMarkFixed`).
    case fixed
    case needMoreInfo
    case reopened
}

/// How bad the problem is. The design only documents "Quite" (the default), so this is an open set for now.
struct FeedbackSeverity: RawRepresentable, Codable, Sendable, Hashable {
    let rawValue: String
}

/// Dish feedback: the dish, the exact problem and how bad.
struct Feedback: Codable, Sendable, Hashable, Identifiable {
    let id: FeedbackID
    let mealID: MealID
    let dishName: String
    let problem: String
    let severity: FeedbackSeverity
    let note: String?
    let sentAt: Date
    var status: FollowUpStatus
}

/// Who owned an issue, what was investigated, what was done and when.
struct CorrectiveAction: Codable, Sendable, Hashable {
    let owner: String
    let investigated: String
    let actionTaken: String
    let at: Date
}

enum CommunityPolicy {
    /// The "Me too" support threshold is an open decision. Nil means "not decided"; do not invent a number.
    static let supportThreshold: Int? = nil
}

/// An issue published to Community by an admin. Students back it with "Me too"; each eligible student counts once.
struct CommunityIssue: Codable, Sendable, Hashable, Identifiable {
    let id: CommunityIssueID
    let messID: MessID
    let title: String
    var supporters: Set<StudentID>
    var status: FollowUpStatus
    var actions: [CorrectiveAction]

    var supportCount: Int { supporters.count }

    /// Nothing is Fixed just because a button was pressed: there must be a recorded corrective action.
    var canMarkFixed: Bool { !actions.isEmpty }
}
