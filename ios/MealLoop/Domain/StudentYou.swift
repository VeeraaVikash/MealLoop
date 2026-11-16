import Foundation

// The Student "You" area: Notifications, the profile, Credits and Attendance. Additive models; nothing existing uses them.

enum StudentNotificationTag {}
typealias StudentNotificationID = Identifier<StudentNotificationTag>

/// What a notification is about. It picks the icon only; the words come with the notification.
enum StudentNotificationKind: String, Codable, Sendable, Hashable, CaseIterable {
    case outingGuardianApproved
    case outingUpdate
    case mealQuestion
    case menuChanged
    case feedbackSeen
    case specialPass
}

/// One notification as the student's inbox stores it. It never says a message reached a person; it says what the
/// mess or the outing record shows.
struct StudentNotification: Codable, Sendable, Hashable, Identifiable {
    let id: StudentNotificationID
    let kind: StudentNotificationKind
    let title: String
    let detail: String
    let at: Date
    var isRead: Bool
}

/// A ticket the student can get with credits (Credits 221:64313).
struct StudentCreditTicket: Codable, Sendable, Hashable, Identifiable {
    enum Availability: Codable, Sendable, Hashable {
        case available
        /// Not yet offered. The note is the mess's own words ("Launches Friday").
        case notYet(note: String)
    }

    let id: String
    let name: String
    let place: String
    let cost: Int
    let availability: Availability
}

/// One line of Credits history (221:64443). `points` is negative for a redeemed ticket.
struct StudentCreditEntry: Codable, Sendable, Hashable, Identifiable {
    let id: String
    let title: String
    let day: Date
    let points: Int
}

/// The student's credits. `balance` is nil when the source has none; it is never shown as zero.
struct StudentCredits: Codable, Sendable, Hashable {
    let balance: Int?
    let tickets: [StudentCreditTicket]
    /// Newest first, as the ledger orders it.
    let history: [StudentCreditEntry]
    /// What "Vote Yes and attend" earns. Nil when the source has no number.
    var pointsPerAnswer: Int? = nil

    /// The cheapest ticket the balance does not reach yet, and how many points are missing.
    var nextGoal: (ticket: StudentCreditTicket, missing: Int)? {
        guard let balance else { return nil }
        return tickets.filter { $0.cost > balance }.min { $0.cost < $1.cost }.map { ($0, $0.cost - balance) }
    }
}

/// Participation credits, owner decision of 16 Nov 2026 (credits rules reference): every student starts with 20; after
/// a meal the answer and whether an entry was recorded decide the change. "Not sure" is not in that table, so it neither
/// earns nor costs (open decision SR-16).
enum StudentCreditRule {
    static let startingBalance = 20

    /// Whether an entry was recorded for the meal. Only known once the meal has ended.
    enum Outcome: Sendable, Hashable { case attended, missed }

    static let yesAttend = 5
    static let yesMiss = -3
    static let noVote = -2
    static let skipAttend = -2
    static let skipSkip = 2

    static func points(for response: IntentionResponse, outcome: Outcome) -> Int {
        switch (response, outcome) {
        case (.answered(.attending, _), .attended): yesAttend
        case (.answered(.attending, _), .missed): yesMiss
        case (.answered(.skipping, _), .attended): skipAttend
        case (.answered(.skipping, _), .missed): skipSkip
        case (.noResponse, _): noVote
        case (.answered(.notSure, _), _): 0
        }
    }
}

/// The You page's header and its rows' small values.
struct StudentProfileSummary: Codable, Sendable, Hashable {
    let firstName: String?
    let maskedID: String
    let messName: String
    let credits: Int?
}
