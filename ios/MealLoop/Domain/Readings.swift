import Foundation

/// A count that may be missing. A missing count is shown as "Unavailable" or "—", never as 0.
enum CountReading: Codable, Sendable, Hashable {
    case available(Int, asOf: Date)
    case unavailable

    var value: Int? {
        if case .available(let count, _) = self { return count }
        return nil
    }

    var asOf: Date? {
        if case .available(_, let date) = self { return date }
        return nil
    }
}

/// A leftover measurement for one dish. Missing data never becomes zero:
/// - `entered`: a measured quantity greater than zero, in the dish's own unit;
/// - `noneLeft`: a confirmed zero ("None left");
/// - `notMade`: the dish was not cooked for this meal;
/// - `notEntered`: nobody has recorded it yet.
enum LeftoverMeasurement: Codable, Sendable, Hashable {
    case entered(Double)
    case noneLeft
    case notMade
    case notEntered

    /// The measured quantity, if there is one. `noneLeft` is a measured zero; `notMade` and `notEntered` have no quantity.
    var measuredQuantity: Double? {
        switch self {
        case .entered(let value): return value
        case .noneLeft: return 0
        case .notMade, .notEntered: return nil
        }
    }

    /// True once the kitchen has said something about this dish (a quantity, None left or Not made).
    var isComplete: Bool { self != .notEntered }

    /// An entered quantity must be a finite number above zero; a zero is recorded as `noneLeft`.
    var isValid: Bool {
        if case .entered(let value) = self { return value.isFinite && value > 0 }
        return true
    }
}

/// Plate waste is one total for the whole meal, in kilograms, never per dish.
enum PlateWasteMeasurement: Codable, Sendable, Hashable {
    /// A measured total. Zero is allowed here because it is an explicit measurement, not a default.
    case entered(kilograms: Double)
    case notEntered

    var measuredKilograms: Double? {
        if case .entered(let value) = self { return value }
        return nil
    }

    var isComplete: Bool { self != .notEntered }

    var isValid: Bool {
        if case .entered(let value) = self { return value.isFinite && value >= 0 }
        return true
    }
}
