import Foundation

/// Words of the Notifications, You and Credits frames (page 07). This is wording, not data.
enum YouCopy {
    static let notifications = "Notifications"
    static let today = "Today"
    static let earlier = "Earlier"
    static let yesterday = "Yesterday"
    static let unread = "Unread"
    static let noNotificationsTitle = "No notifications"
    static let noNotificationsDetail = "Meal reminders, outing updates and replies to your feedback show here."
    static let offline = "You're offline."
    static let notificationsOffline = "You're offline. These are the notifications you last saw."
    static let gettingNotifications = "Getting notifications"
    /// Offline with nothing saved: never shown as an empty inbox.
    static let nothingSaved = "Your notifications will show when you're back online."

    static let you = "You"
    static let outings = "Outings"
    static let credits = "Credits"
    static let spending = "Spending"
    static let myFeedback = "My feedback"
    static let help = "Help"
    static let terms = "Terms and privacy"
    static let signOut = "Sign out"
    static let youOffline = "You're offline. Some details may be out of date."
    static func idAndMess(_ maskedID: String, _ mess: String) -> String { maskedID.isEmpty ? mess : "\(maskedID) · \(mess)" }
    static func points(_ value: Int) -> String { "\(value) pts" }

    static let creditsSubtitle = "Earned by answering meals before the cutoff."
    static let recentActivity = "Recent activity"
    static let seeAll = "See all"
    static let noActivityTitle = "No activity yet"
    static let noActivityDetail = "Answer I'm in or Skip before a meal's cutoff to earn credits."
    static let couldntLoadCredits = "Couldn't load your credits"
    static let ruleAnswer = "Answer I'm in or Skip before the cutoff"
    static let ruleNotSure = "Answer Not sure, or don't answer"
    static let ruleNoCredits = "0"
    static let ruleTicket = "Get a ticket at your mess counter"
    static let ruleTicketCost = "Its cost"
    static let rulesSubtitle = "Only your meal answers earn credits."
    static let rulesSamples = "Review build: point amounts are sample values and not final."
    static let rulesAmountUnknown = "Amount not set"
    static let pts = "pts"
    static let creditsWord = "credits"
    static let tickets = "Tickets"
    static let get = "Get"
    static let history = "History"
    static let creditsHistory = "Credits history"
    static let balance = "BALANCE"
    static let noBalance = "Your balance isn't available right now."
    static let creditsOffline = "You're offline. Tickets can't be got until you're back."
    static let noHistoryTitle = "No credits yet"
    static let noHistoryDetail = "Answer a meal question to earn your first credits."
    static func moreFor(_ missing: Int, _ ticket: String) -> String { "\(missing) more for the \(ticket)" }
    static func more(_ missing: Int) -> String { "\(missing) more" }
    static func signed(_ points: Int) -> String { points >= 0 ? "+\(points) pts" : "−\(-points) pts" }
    static func entryLine(_ title: String, _ day: String) -> String { "\(title) · \(day)" }

}
