import Foundation

struct Mess: Codable, Sendable, Hashable, Identifiable {
    let id: MessID
    let name: String
    /// Meal times are shown in the mess's own time zone, never the device's.
    let timeZoneIdentifier: String

    var timeZone: TimeZone { TimeZone(identifier: timeZoneIdentifier) ?? .current }
}

enum MealSlot: String, Codable, Sendable, CaseIterable, Hashable {
    case breakfast
    case lunch
    case snacks
    case dinner
}

/// The meal lifecycle. Only the Supervisor starts and closes a meal, and that drives every staff role in the mess.
enum MealState: String, Codable, Sendable, Hashable {
    case notStarted
    case inService
    case closed
}

enum Diet: String, Codable, Sendable, Hashable {
    case veg
    case nonVeg
}

/// The unit a dish's leftovers are recorded in. Units are never combined or converted.
enum WasteUnit: String, Codable, Sendable, CaseIterable, Hashable {
    case kilograms = "kg"
    case litres = "L"
    case pieces

    var symbol: String { rawValue }
}

struct Dish: Codable, Sendable, Hashable, Identifiable {
    let id: DishID
    let name: String
    /// Marked by the mess on the printed menu board. What the highlight means is an open decision.
    let isHighlight: Bool
    let diet: Diet
    let wasteUnit: WasteUnit
}

struct Meal: Codable, Sendable, Hashable, Identifiable {
    let id: MealID
    let messID: MessID
    let slot: MealSlot
    let startsAt: Date
    let endsAt: Date
}

/// The current meal of a mess together with its lifecycle state.
struct MealStatus: Codable, Sendable, Hashable {
    let meal: Meal
    var state: MealState
    var startedAt: Date?
    var closedAt: Date?
}
