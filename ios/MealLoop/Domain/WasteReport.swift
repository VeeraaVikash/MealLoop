import Foundation

struct DishLeftover: Codable, Sendable, Hashable, Identifiable {
    let dishID: DishID
    let dishName: String
    /// Each dish keeps its own unit; units are never combined.
    let unit: WasteUnit
    var measurement: LeftoverMeasurement

    var id: DishID { dishID }
}

/// A saved report is simply Recorded. There is no approval loop (no Waiting, Returned or Approved).
enum WasteReportStatus: Codable, Sendable, Hashable {
    case notStarted
    case draft(savedAt: Date)
    case recorded(savedAt: Date)
}

enum WasteReportPolicy {
    /// A recorded report can be edited for 6 hours after it was saved (owner decision).
    static let editWindow: TimeInterval = 6 * 60 * 60

    static func editableUntil(_ status: WasteReportStatus) -> Date? {
        if case .recorded(let savedAt) = status { return savedAt.addingTimeInterval(editWindow) }
        return nil
    }

    static func canEdit(_ status: WasteReportStatus, at now: Date) -> Bool {
        switch status {
        case .notStarted, .draft: return true
        case .recorded:
            guard let until = editableUntil(status) else { return false }
            return now < until
        }
    }
}

/// Recorded after the meal only: leftovers per dish (each in its own unit) and one plate-waste total.
struct WasteReport: Codable, Sendable, Hashable {
    let mealID: MealID
    var leftovers: [DishLeftover]
    var plateWaste: PlateWasteMeasurement
    var status: WasteReportStatus

    /// Fields still empty (dishes plus the plate-waste total). Missing data is never filled with zero.
    var missingCount: Int {
        leftovers.filter { !$0.measurement.isComplete }.count + (plateWaste.isComplete ? 0 : 1)
    }

    var totalFieldCount: Int { leftovers.count + 1 }

    var completedFieldCount: Int { totalFieldCount - missingCount }

    var hasInvalidValues: Bool {
        leftovers.contains { !$0.measurement.isValid } || !plateWaste.isValid
    }

    /// "Review and save" is blocked while any field is empty or invalid. "Save draft" is always allowed.
    var canSave: Bool { missingCount == 0 && !hasInvalidValues }
}

/// What a Home screen needs to show about a meal's waste report without loading every row.
struct WasteReportSummary: Codable, Sendable, Hashable {
    let mealID: MealID
    let status: WasteReportStatus
    let completedFieldCount: Int
    let totalFieldCount: Int
}
