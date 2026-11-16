import Foundation

/// A student's answer for one meal. Shown as "I'm in", "Skip" and "Not sure".
/// (`in` is a Swift keyword, so the case is `attending`; the wire value stays "in".)
enum MealIntention: String, Codable, Sendable, CaseIterable, Hashable {
    case attending = "in"
    case skipping = "skip"
    case notSure
}

/// "No response" is its own group. It is never counted as a skip, and nobody is denied food for it.
enum IntentionResponse: Codable, Sendable, Hashable {
    case answered(MealIntention, at: Date)
    case noResponse
}

/// How many students gave each answer. These are counts only; a forecast is never derived from them here.
struct MealAnswerCounts: Codable, Sendable, Hashable {
    let attending: Int
    let skipping: Int
    let notSure: Int
    let noResponse: Int
}

enum IntentionPolicy {
    /// Snacks' planning cutoff: two hours before the meal starts (owner decision). The other meals have fixed times.
    static let cutoffBeforeMeal: TimeInterval = 2 * 60 * 60

    /// The mess clock. Cutoffs are wall-clock times in India Standard Time, as the server keeps them (NFR-REL-010).
    static let messTimeZone = TimeZone(identifier: "Asia/Kolkata") ?? .current

    /// A fixed cutoff on the wall clock: `daysBefore` 1 means the evening before the meal's day.
    struct FixedCutoff: Sendable, Hashable {
        let hour: Int
        let minute: Int
        let daysBefore: Int
    }

    /// Owner decision, 16 Nov 2026 (walkthrough reference "Attendance & Meals"): breakfast before 10:00 PM the night
    /// before, lunch by 9:00 AM, dinner by 2:00 PM. Snacks is not in that reference and keeps the two-hour rule.
    static func fixedCutoff(for slot: MealSlot) -> FixedCutoff? {
        switch slot {
        case .breakfast: FixedCutoff(hour: 22, minute: 0, daysBefore: 1)
        case .lunch: FixedCutoff(hour: 9, minute: 0, daysBefore: 0)
        case .dinner: FixedCutoff(hour: 14, minute: 0, daysBefore: 0)
        case .snacks: nil
        }
    }

    static func cutoff(for meal: Meal) -> Date {
        guard let fixed = fixedCutoff(for: meal.slot) else { return meal.startsAt.addingTimeInterval(-cutoffBeforeMeal) }
        var calendar = Calendar(identifier: .gregorian)
        calendar.timeZone = messTimeZone
        let day = calendar.startOfDay(for: meal.startsAt)
        let base = calendar.date(byAdding: .day, value: -fixed.daysBefore, to: day) ?? day
        return calendar.date(bySettingHour: fixed.hour, minute: fixed.minute, second: 0, of: base) ?? base
    }

    /// After the cutoff the answer buttons are disabled. The entry QR is never locked.
    static func canAnswer(_ meal: Meal, at now: Date) -> Bool {
        now < cutoff(for: meal)
    }
}
