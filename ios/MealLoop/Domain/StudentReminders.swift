import Foundation

/// A student's two meal reminders (Notification settings, student redesign 15 Nov 2026). Each has its own switch, so
/// turning one off keeps the other as it was.
struct StudentReminderSettings: Codable, Sendable, Hashable {
    /// The night-before reminder to answer the next day's meals. On by default at 8:00 PM, mess time.
    var nightBefore = true
    var nightBeforeHour = 20
    var nightBeforeMinute = 0
    /// The day-of reminder: two hours before each answerable meal's cutoff.
    var dayOf = true
}

/// One reminder the phone should deliver.
struct StudentScheduledReminder: Sendable, Hashable, Identifiable {
    enum Kind: String, Sendable, Hashable { case nightBefore, dayOf }

    let kind: Kind
    let fireAt: Date
    /// The meal a day-of reminder is for; nil for the night-before one.
    let meal: Meal?

    var id: String {
        switch kind {
        case .nightBefore: return "reminder.nightBefore.\(Int(fireAt.timeIntervalSince1970))"
        case .dayOf: return "reminder.dayOf.\(meal?.id.rawValue ?? "")"
        }
    }
}

/// When the reminders fire. Times come from the configured cutoff (`IntentionPolicy.cutoff`) and the mess time zone; a
/// cutoff the night before (as a breakfast cutoff may be) moves its reminder to that night too.
enum StudentReminderSchedule {
    /// The day-of reminder's lead before the cutoff.
    static let dayOfLead: TimeInterval = 2 * 60 * 60

    /// Meals the student answers: Snacks has no answer (P7), so it gets no reminder.
    static func isAnswerable(_ meal: Meal) -> Bool { meal.slot != .snacks }

    static func dayOfTime(for meal: Meal) -> Date {
        IntentionPolicy.cutoff(for: meal).addingTimeInterval(-dayOfLead)
    }

    /// The next night-before time after `now`, at the chosen time in the mess time zone.
    static func nextNightBefore(after now: Date, settings: StudentReminderSettings, timeZone: TimeZone) -> Date? {
        var calendar = Calendar(identifier: .gregorian)
        calendar.timeZone = timeZone
        let today = calendar.startOfDay(for: now)
        for offset in 0...1 {
            guard let day = calendar.date(byAdding: .day, value: offset, to: today),
                  let at = calendar.date(bySettingHour: settings.nightBeforeHour, minute: settings.nightBeforeMinute,
                                         second: 0, of: day) else { continue }
            if at > now { return at }
        }
        return nil
    }

    /// Every reminder still to come for `meals`, earliest first. A switched-off reminder has none; a time already past
    /// is left out, never fired late.
    static func reminders(for meals: [Meal], settings: StudentReminderSettings, now: Date,
                          timeZone: TimeZone) -> [StudentScheduledReminder] {
        var result: [StudentScheduledReminder] = []
        if settings.dayOf {
            for meal in meals where isAnswerable(meal) {
                let at = dayOfTime(for: meal)
                if at > now { result.append(StudentScheduledReminder(kind: .dayOf, fireAt: at, meal: meal)) }
            }
        }
        if settings.nightBefore, let at = nextNightBefore(after: now, settings: settings, timeZone: timeZone) {
            result.append(StudentScheduledReminder(kind: .nightBefore, fireAt: at, meal: nil))
        }
        return result.sorted { $0.fireAt < $1.fireAt }
    }
}
