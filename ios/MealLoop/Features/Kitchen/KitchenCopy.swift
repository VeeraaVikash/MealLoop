import Foundation

/// Kitchen Staff wording from design/reference/kitchen_2026-10/data/kitchen_spec.md and the K01–K05 exports.
enum KitchenCopy {
    static let forecastEyebrow = "Forecasted attendance"
    static let forecastCaption = "expected diners"
    static let forecastNotReady = "Forecast not ready yet"
    static let liveEyebrow = "Live"
    /// Students entered at the door. Never "meals served" and never "recorded at the door".
    static let liveCaption = "students entered"
    static let reportShortage = "Report food running short"
    static let mealClosedEyebrow = "Meal closed"
    static let finalEntriesLabel = "Final entries"
    static let unavailable = "Unavailable"
    static let menuRow = "Menu for"
    static let pastMealsRow = "Past meals"
    static let seeAll = "See all"
    static let wasteReportTitle = "Waste report"
    static let recordWaste = "Record waste"
    static let continueWaste = "Continue"
    static let viewReport = "View report"
    static let retry = "Retry"
    static let couldNotSend = "Couldn't send"

    static func mealInProgress(_ elapsed: String) -> String { "Meal in progress · \(elapsed)" }
    static func hasEnded(_ mealName: String) -> String { "\(mealName) has ended" }
    static func ended(at time: String) -> String { "ended \(time)" }
    static func shortageTitle(dish: String, level: String) -> String { "\(dish), \(level)" }
    static func seenBy(_ name: String) -> String { "\(name) saw it" }
    static func draftProgress(done: Int, total: Int) -> String { "\(done) of \(total) done · saved" }
    static func recorded() -> String { "Recorded ·" }
    static func editUntil(_ time: String) -> String { "You can edit until \(time)." }
    static let editingClosed = "Editing closed after 6 hours."
}
