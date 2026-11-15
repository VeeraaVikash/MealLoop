import Foundation

/// Words of the Meals, Dish, Search, Special pass and Crowd frames (page 07). Kept apart from `StudentCopy` so the
/// Home part stays as it was.
enum MealsCopy {
    // Serving now and meal details (student redesign, 15 Nov 2026).
    static let servingNow = "Serving now"
    static func servingNowTill(_ meal: String, _ time: String) -> String { "\(meal) is serving now · till \(time)" }
    static func otherServing(_ meal: String) -> String { "\(meal) is serving now" }
    static let nothingServing = "Nothing is being served right now."
    static func nothingServingNext(_ meal: String, _ time: String) -> String { "Nothing is being served right now. \(meal) starts at \(time)." }
    static let details = "Details"
    static let detailsHint = "Opens the meal details."
    static let notStartedYet = "Not started yet"
    static let served = "Served"
    static func answerBy(_ time: String) -> String { "Answer I'm in or Skip by \(time)." }
    static let noDishesYet = "The menu for this meal isn't published yet."
    static let showQROnHome = "Show entry QR on Home"

    // Meals.
    static let title = "Meals"
    static func changedAt(_ time: String) -> String { "The mess updated this menu at \(time)." }
    static let changed = "The mess updated this menu."
    static func serviceEnded(_ slot: MealSlot) -> String { "\(MLFormat.mealSlot(slot)) service has ended for today." }
    static func opensAt(_ slot: MealSlot, time: String) -> String { "\(MLFormat.mealSlot(slot)) opens \(time)." }
    static let notPublishedTitle = "Menu not published yet"
    /// Owner decision: no posting time is given, because no document sets one.
    static let notPublishedDetail = "Your entry QR works either way."
    static func noMealTitle(_ slot: MealSlot) -> String { "No \(MLFormat.mealSlot(slot).lowercased()) this day" }
    static let noMealDetail = "The mess is not serving this meal. Check the other meals."
    static let gettingMenu = "Getting the menu…"
    static func offlineMenu(_ time: String?) -> String {
        time.map { "You're offline. This is the menu saved at \($0)." } ?? "You're offline. This is the menu saved earlier."
    }
    static let offlineNothingSaved = "You're offline. No menu was saved for this meal."
    static let loadFailedTitle = "Couldn't load the menu"
    static let tryAgain = "Try again"
    static let report = "Report"
    static let curries = "Curries"
    static let comesWithIt = "Comes with it"
    static let snacksNote = "Snacks are shown for information. No answer or entry QR needed (draft)."
    static let limited = "Limited"
    static let highlight = "Highlight"
    static let highlightInfoTitle = "Highlight"
    static let highlightInfoLead = "Marked by the mess on the menu board."
    static let highlightInfoDetail = "These dishes are highlighted in yellow on the printed board. Ask the mess office if you're not sure what a highlight means."
    static let close = "Close"
    /// "Wednesday 14 Aug, today". Selected is spoken through the trait.
    static func weekday(_ day: String, isToday: Bool) -> String { isToday ? "\(day), today" : day }

    // Dish.
    static let dish = "Dish"
    static let portionAndAllergens = "PORTION AND ALLERGENS"
    static let noDetails = "The mess hasn't listed a portion or allergens for this dish."
    static func verifiedBy(_ day: String) -> String { "Verified by mess · \(day)" }
    static let notVerified = "Not checked by the mess yet"
    static let rateDish = "Rate a dish"
    static let veg = "VEG"
    static let nonVeg = "NON-VEG"

    // Search.
    static let search = "Search"
    static let clear = "Clear"
    static func noResults(_ text: String) -> String { "No results for \"\(text)\"" }
    static let noResultsDetail = "Search looks through this week's menu. Try another dish."
    static let tryLabel = "TRY"
    /// Over the dishes of the meal the Meals tab leads with, listed under the Search field before anything is typed.
    static func onTheMenu(_ slot: String) -> String { "\(slot.uppercased()) ON THE MENU" }
    /// Over the meal's other dishes on the dish page.
    static func alsoAt(_ slot: String) -> String { "ALSO AT \(slot.uppercased())" }
    static let searchHint = "Type a dish name, like sambar or paneer."
    static let searchOffline = "You're offline. Search needs a connection."
    static let searchSuggestions = ["sambar", "paneer"]

    // Special pass.
    static let specialPass = "Special pass"
    static let available = "Available"
    static let oneUse = "One use only. Do this at the counter."
    static let usePass = "Use pass"
    static let useYourPass = "Use your Special pass?"
    static let holdToUse = "Hold to use"
    static let sending = "Sending…"
    static let couldntUse = "Couldn't use the pass. Try again."
    static let cancel = "Cancel"
    static let showAtCounter = "Show this at the counter"
    static let usedAtDoor = "Used at the door"
    static let code = "Code"
    static let colour = "Colour"
    static func changesIn(_ seconds: Int) -> String { "Changes in \(seconds) s" }
    static func changesEvery(_ seconds: Int) -> String { "Code changes every \(seconds) s (motion off)" }
    static func usedAt(_ time: String) -> String { "Used \(time)" }
    static let valid = "Valid"
    static let used = "Used"
    static let noScanNeeded = "No scan needed."
    static let markedWhenYouComeIn = "Marked used when you come in at the door."
    static let thisPassIsUsed = "This pass is used."
    static func markedUsedAt(_ time: String) -> String { "Marked used at the door at \(time)." }
    static let noPassThisWeek = "No Special pass this week"
    static func expired(_ time: String) -> String { "Pass expired · ended \(time)" }
    static func alreadyUsed(_ time: String) -> String { "Already used at \(time)" }
    static func passIsFor(_ mess: String) -> String { "This pass is for \(mess)" }
    static let couldntLoadPass = "Couldn't load your pass."
    static let nextAtYourMess = "NEXT AT YOUR MESS"
    static func dishesCount(_ count: Int) -> String { "\(count) DISHES" }
    static func updated(_ time: String) -> String { "Updated \(time)" }
    static func passWhen(_ day: String, range: String) -> String { "\(day) \(range)" }
    static func liveCodeLabel(_ code: String, colour: String) -> String {
        "Code \(code.map(String.init).joined(separator: " ")), colour \(colour)"
    }

    // Crowd.
    static let crowd = "Crowd"
    static let enteredSoFar = "Entered so far"
    static let stillExpected = "Still expected"
    static let noCount = "—"
    static func notAvailable(_ label: String) -> String { "\(label) · not available" }
    static let entriesEvery = "Recorded entries, every 15 minutes"
    static let countsNote = "Entered so far counts each student's first valid entry once. Still expected counts students who said I'm in and have no entry yet."
    static let countsSpoken = "Counts of recorded door entries."
    static func notStartedCrowd(_ time: String) -> String { "Service starts at \(time)." }
    static func notStartedChart(_ time: String) -> String { "No entries yet. Entries show here from \(time)." }
    static let crowdUnavailableDetail = "Entries can't be read right now."
    static func enteredShort(_ count: Int?) -> String { count.map { "\($0) entered so far" } ?? "Entries not available" }
    static func crowdEyebrow(_ slot: MealSlot, time: String) -> String { "\(MLFormat.mealSlot(slot)) · \(time)" }
    static func crowdUpdatedEyebrow(_ slot: MealSlot, time: String) -> String { "\(MLFormat.mealSlot(slot)) · Updated \(time)" }
    static func crowdOffline(_ time: String) -> String { "You're offline · Updated \(time)" }
    static let crowdOfflineNothing = "You're offline. No crowd reading was saved."
    static let crowdFailed = "Couldn't load the crowd."
    static func barLabel(_ time: String, entries: Int, isNow: Bool) -> String {
        "\(time), \(entries) \(entries == 1 ? "entry" : "entries")\(isNow ? ", now" : "")"
    }
}

enum MealsFormat {
    /// "12:08" and "1:00": the clock with minutes and without AM or PM, as the Crowd frames draw it.
    static func clock(_ date: Date, in timeZone: TimeZone) -> String {
        let formatter = DateFormatter()
        formatter.locale = Locale(identifier: "en_US_POSIX")
        formatter.timeZone = timeZone
        formatter.dateFormat = "h:mm"
        return formatter.string(from: date)
    }
}
