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
    /// What the ledger gives a definite answer (I'm in or Skip) before the cutoff. Nil when the source has no number.
    var pointsPerAnswer: Int? = nil
    /// True when the amounts are the Review build's sample values, not an approved rule (open decision P1).
    var amountsAreSamples = false

    /// The cheapest ticket the balance does not reach yet, and how many points are missing.
    var nextGoal: (ticket: StudentCreditTicket, missing: Int)? {
        guard let balance else { return nil }
        return tickets.filter { $0.cost > balance }.min { $0.cost < $1.cost }.map { ($0, $0.cost - balance) }
    }
}

/// Participation credits. A definite answer (I'm in or Skip) earns; Not sure and No response earn nothing.
/// How many points a definite answer earns is not decided (open decision P1); the source passes its own number.
enum StudentCreditRule {
    static func points(for response: IntentionResponse, perDefiniteAnswer: Int) -> Int {
        switch response {
        case .answered(.attending, _), .answered(.skipping, _): return perDefiniteAnswer
        case .answered(.notSure, _), .noResponse: return 0
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
