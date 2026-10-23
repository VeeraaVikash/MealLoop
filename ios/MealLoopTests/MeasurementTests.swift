import XCTest
@testable import MealLoop

/// Missing data must never become zero.
final class MeasurementTests: XCTestCase {
    private let mealID = MealID("test-meal")

    func testNotEnteredHasNoQuantityAndIsIncomplete() {
        XCTAssertNil(LeftoverMeasurement.notEntered.measuredQuantity)
        XCTAssertFalse(LeftoverMeasurement.notEntered.isComplete)
    }

    func testNoneLeftIsAMeasuredZero() {
        XCTAssertEqual(LeftoverMeasurement.noneLeft.measuredQuantity, 0)
        XCTAssertTrue(LeftoverMeasurement.noneLeft.isComplete)
    }

    func testNotMadeHasNoQuantityButIsComplete() {
        XCTAssertNil(LeftoverMeasurement.notMade.measuredQuantity)
        XCTAssertTrue(LeftoverMeasurement.notMade.isComplete)
    }

    func testEnteredZeroIsInvalidBecauseZeroIsNoneLeft() {
        XCTAssertFalse(LeftoverMeasurement.entered(0).isValid)
        XCTAssertFalse(LeftoverMeasurement.entered(-1).isValid)
        XCTAssertFalse(LeftoverMeasurement.entered(.nan).isValid)
        XCTAssertTrue(LeftoverMeasurement.entered(3).isValid)
    }

    func testMissingCountReadingHasNoValue() {
        XCTAssertNil(CountReading.unavailable.value)
        XCTAssertNil(Forecast.notReady.diners)
    }

    func testWasteReportWithAnEmptyFieldCannotBeSaved() {
        let report = WasteReport(
            mealID: mealID,
            leftovers: [
                DishLeftover(dishID: DishID("rice"), dishName: "Rice", unit: .kilograms, measurement: .entered(3)),
                DishLeftover(dishID: DishID("sambar"), dishName: "Sambar", unit: .litres, measurement: .notEntered),
            ],
            plateWaste: .entered(kilograms: 21),
            status: .notStarted
        )
        XCTAssertEqual(report.missingCount, 1)
        XCTAssertEqual(report.totalFieldCount, 3)
        XCTAssertEqual(report.completedFieldCount, 2)
        XCTAssertFalse(report.canSave)
    }

    func testMissingPlateWasteBlocksSaving() {
        let report = WasteReport(
            mealID: mealID,
            leftovers: [DishLeftover(dishID: DishID("rice"), dishName: "Rice", unit: .kilograms, measurement: .noneLeft)],
            plateWaste: .notEntered,
            status: .notStarted
        )
        XCTAssertEqual(report.missingCount, 1)
        XCTAssertFalse(report.canSave)
        XCTAssertNil(report.plateWaste.measuredKilograms)
    }

    func testCompleteReportCanBeSaved() {
        let report = WasteReport(
            mealID: mealID,
            leftovers: [
                DishLeftover(dishID: DishID("rice"), dishName: "Rice", unit: .kilograms, measurement: .entered(3)),
                DishLeftover(dishID: DishID("chappathi"), dishName: "Chappathi", unit: .pieces, measurement: .notMade),
                DishLeftover(dishID: DishID("dal"), dishName: "Dal", unit: .litres, measurement: .noneLeft),
            ],
            plateWaste: .entered(kilograms: 0),
            status: .notStarted
        )
        XCTAssertEqual(report.missingCount, 0)
        XCTAssertTrue(report.canSave)
    }

    func testNotEnteredSurvivesEncodingAndIsNeverDecodedAsZero() throws {
        let original = DishLeftover(dishID: DishID("rice"), dishName: "Rice", unit: .kilograms, measurement: .notEntered)
        let data = try JSONEncoder().encode(original)
        let decoded = try JSONDecoder().decode(DishLeftover.self, from: data)
        XCTAssertEqual(decoded.measurement, .notEntered)
        XCTAssertNil(decoded.measurement.measuredQuantity)
    }

    func testRecordedReportIsEditableForSixHoursOnly() {
        let saved = Date(timeIntervalSince1970: 1_000_000)
        let status = WasteReportStatus.recorded(savedAt: saved)
        XCTAssertEqual(WasteReportPolicy.editableUntil(status), saved.addingTimeInterval(6 * 60 * 60))
        XCTAssertTrue(WasteReportPolicy.canEdit(status, at: saved.addingTimeInterval(5 * 60 * 60)))
        XCTAssertFalse(WasteReportPolicy.canEdit(status, at: saved.addingTimeInterval(6 * 60 * 60)))
    }
}
