import Foundation

/// The week the Meals tab shows: seven days and which one is today in the mess.
struct StudentWeek: Sendable, Hashable {
    let days: [Date]
    let today: Date
}

/// Whether the mess has posted a menu for one meal of one day.
enum StudentMenuStatus: Sendable, Hashable {
    case published
    /// The mess has not posted this menu yet.
    case notPublished
    /// The mess does not serve this meal on this day.
    case noMeal
}

/// The alternate-Wednesday ticket on the Meals page. "Special items are limited" is a tag, never a count.
struct StudentSpecialMeal: Sendable, Hashable {
    let dishes: [String]
    let note: String
    let isLimited: Bool
}

/// One meal of one day, laid out the way the Meals frames draw it. Which dish sits in which part is menu data from
/// the mess, not a rule of the screen.
struct StudentMealMenu: Sendable, Hashable {
    let day: Date
    let slot: MealSlot
    let status: StudentMenuStatus
    /// When the meal is served. Nil when no time is known for that day.
    let servedFrom: Date?
    let servedUntil: Date?
    /// The black tile.
    let highlight: Dish?
    /// The tiles under it, with no heading.
    let mains: [Dish]
    /// The tiles under "Curries".
    let curries: [Dish]
    /// The slim rows: the board's non-veg lines and the `**` gravies (P9 default: drawn as a slim non-veg row).
    let slimRows: [Dish]
    /// "Comes with it", as one line.
    let sides: [Dish]
    let special: StudentSpecialMeal?
    /// When the mess last changed this menu. Nil when it has not changed since it was posted.
    let changedAt: Date?
    /// False for Snacks: the menu only, no answer and no entry QR (P7 default).
    let isAnswerable: Bool

    var allDishes: [Dish] {
        [highlight].compactMap { $0 } + mains + curries + slimRows + sides
    }
}

/// What the Dish page knows about one dish. Missing details stay missing: nothing is filled in.
struct StudentDishDetail: Sendable, Hashable {
    let dish: Dish
    let slot: MealSlot
    let day: Date
    let servedFrom: Date?
    let servedUntil: Date?
    /// "1 bowl". Nil when the mess has not said.
    let portion: String?
    /// Empty when the mess has not listed any.
    let allergens: [String]
    /// When the mess checked these details. Nil when it never has.
    let verifiedOn: Date?
}

/// The special-meal pass as its holder sees it.
struct StudentPassTicket: Sendable, Hashable {
    let meal: Meal
    let dishes: [String]
    let holderName: String
    let maskedID: String
    let messName: String
}

/// Where the student's special-meal pass stands. The live code itself comes from `SpecialPassRepository.refreshPassCode`.
enum StudentPassStanding: Sendable, Hashable {
    /// No pass this week.
    case notEligible
    /// The student is at another mess. `passMess` is where the pass works.
    case wrongMess(passMess: String)
    case available(StudentPassTicket)
    /// The student chose to use it: the phone shows the live code until the door records the entry.
    case live(StudentPassTicket, startedAt: Date)
    /// The entry was recorded. `wasShowingCode` is true when the student had the live code open in the app.
    case used(StudentPassTicket, at: Date, wasShowingCode: Bool)
    /// The meal ended before the pass was used.
    case expired(StudentPassTicket, endedAt: Date)
}

/// Recorded entries in one interval of the Crowd chart.
struct StudentCrowdInterval: Codable, Sendable, Hashable {
    let startsAt: Date
    /// Distinct students whose first valid entry for the meal falls in this interval. Zero is a real zero.
    let entries: Int
}

/// Crowd for one meal at one mess, counted from the entry records and the meal answers. Nothing here predicts: no
/// best time, no estimated wait and no level. A count that cannot be read is `.unavailable`, never zero.
struct StudentCrowd: Codable, Sendable, Hashable {
    /// The chart's interval. Crowd · Main Mess (221:63246) draws "every 15 minutes".
    static let intervalLength: TimeInterval = 15 * 60

    let meal: Meal
    let mealState: MealState
    let observedAt: Date
    /// Distinct students with a valid entry for this meal and mess. A walk-in counts; a repeat scan does not.
    let enteredSoFar: CountReading
    /// Students who answered I'm in for this meal and mess and have no valid entry yet. A walk-in never lowers it.
    let stillExpected: CountReading
    /// From the start of service to now (or to its end), one per interval. Empty before service starts.
    let intervals: [StudentCrowdInterval]

    /// How full the mess is: the share of this meal's students (present plus still expected) already inside.
    /// PROTOTYPE thresholds (owner asked for Quiet, Normal and Busy on 16 Nov 2026; the cut-offs are open, SR-17):
    /// under 40% Quiet, under 75% Normal, otherwise Busy. Nil when either count is missing, never a guess.
    enum Level: Sendable, Hashable { case quiet, normal, busy }

    var level: Level? {
        guard let present = enteredSoFar.value, let expected = stillExpected.value, present + expected > 0 else { return nil }
        let share = Double(present) / Double(present + expected)
        return share < 0.4 ? .quiet : (share < 0.75 ? .normal : .busy)
    }

    /// The interval the clock is in, while the meal is being served.
    var currentInterval: Int? {
        guard mealState == .inService, !intervals.isEmpty else { return nil }
        return intervals.lastIndex { $0.startsAt <= observedAt }
    }

    /// Builds the counts from the entry records of one meal. `entries` may hold repeats and other meals' records;
    /// only the first valid entry per student for `meal` counts.
    static func counted(meal: Meal, state: MealState, now: Date, entries: [EntryRecord]?,
                        attending: Set<StudentID>?) -> StudentCrowd {
        guard let entries else {
            return StudentCrowd(meal: meal, mealState: state, observedAt: now, enteredSoFar: .unavailable,
                                stillExpected: .unavailable, intervals: [])
        }
        var first: [StudentID: Date] = [:]
        for entry in entries where entry.mealID == meal.id {
            first[entry.student.id] = min(first[entry.student.id] ?? entry.recordedAt, entry.recordedAt)
        }
        let entered = Set(first.keys)
        let expected: CountReading = attending.map { .available($0.subtracting(entered).count, asOf: now) } ?? .unavailable
        var intervals: [StudentCrowdInterval] = []
        if state != .notStarted || !first.isEmpty {
            let end = state == .closed ? meal.endsAt : min(max(now, meal.startsAt), meal.endsAt)
            let count = max(1, Int(ceil(end.timeIntervalSince(meal.startsAt) / intervalLength)))
            var buckets = Array(repeating: 0, count: count)
            for at in first.values {
                let index = Int(floor(at.timeIntervalSince(meal.startsAt) / intervalLength))
                buckets[min(max(index, 0), count - 1)] += 1
            }
            intervals = buckets.enumerated().map { index, value in
                StudentCrowdInterval(startsAt: meal.startsAt.addingTimeInterval(Double(index) * intervalLength), entries: value)
            }
        }
        return StudentCrowd(meal: meal, mealState: state, observedAt: now, enteredSoFar: .available(entered.count, asOf: now),
                            stillExpected: expected, intervals: intervals)
    }
}
