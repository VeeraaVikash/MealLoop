#if DEMO_DATA
import Foundation

/// DEMO DATA. Seeded sample values for the Debug build only. Never pilot data and never measured results.
/// Every value below is copied from the design documentation; the source is named next to it.
/// Sample names such as "Main Mess" are placeholders (the pilot is planned at Meenakshi Girls' Mess).
enum DemoSeed {
    // design/reference/kitchen_2026-10/data/kitchen_spec.md: "Main Mess, Lunch, Wed 14 Aug 2024, 12 to 2 PM".
    // The mess time zone is India's; the time zone is not a sample value.
    static let mess = Mess(id: MessID("demo-main-mess"), name: "Main Mess", timeZoneIdentifier: "Asia/Kolkata")

    static let lunch = Meal(
        id: MealID("demo-2024-08-14-lunch"),
        messID: mess.id,
        slot: .lunch,
        startsAt: time(12, 0),
        endsAt: time(14, 0)
    )

    // kitchen_spec.md: Wed lunch dishes and their units ("Chappathi = pieces; Sambar, Dal and Rasam = L; the rest kg").
    static let lunchMenu: [Dish] = [
        Dish(id: DishID("bhindi-aloo-bujjiya"), name: "Bhindi Aloo Bujjiya", isHighlight: true, diet: .veg, wasteUnit: .kilograms),
        Dish(id: DishID("steamed-rice"), name: "Steamed Rice", isHighlight: false, diet: .veg, wasteUnit: .kilograms),
        Dish(id: DishID("chappathi"), name: "Chappathi", isHighlight: false, diet: .veg, wasteUnit: .pieces),
        Dish(id: DishID("muttar-masala"), name: "Muttar Masala", isHighlight: false, diet: .veg, wasteUnit: .kilograms),
        Dish(id: DishID("veg-pulao"), name: "Veg Pulao", isHighlight: false, diet: .veg, wasteUnit: .kilograms),
        Dish(id: DishID("masala-sambar"), name: "Masala Sambar", isHighlight: false, diet: .veg, wasteUnit: .litres),
        Dish(id: DishID("tomato-dal"), name: "Tomato Dal", isHighlight: false, diet: .veg, wasteUnit: .litres),
        Dish(id: DishID("garlic-rasam"), name: "Garlic Rasam", isHighlight: false, diet: .veg, wasteUnit: .litres),
    ]

    // kitchen_spec.md: "Forecasted attendance 860. Entries 714 at 1:40 PM; final 774."
    static let forecastDiners = 860
    // kitchen_spec.md stale state: "Updated 8:50 AM, may be out of date".
    static let forecastSetAt = time(8, 50)
    static let liveEntries = 714
    static let liveEntriesAt = time(13, 40)
    // kitchen_spec.md stale state: "Updated 1:12 PM · reconnecting".
    static let staleEntriesAt = time(13, 12)
    static let finalEntries = 774
    // supervisor_spec.md: closed "2:00 PM".
    static let closedAt = time(14, 0)

    // Clock moments of the exported frames: K01 11:30 AM, K02 / K03 1:40 PM, K05 2:05 PM.
    static let beforeMealNow = time(11, 30)
    static let duringMealNow = time(13, 40)
    static let afterMealNow = time(14, 5)

    // supervisor_spec.md: "Shortage: Steamed Rice, almost out, posted 1:30 PM by the kitchen."
    static let shortageDish = "Steamed Rice"
    static let shortageLevel: ShortageLevel = .almostOut
    static let shortageReportedAt = time(13, 30)

    // kitchen_spec.md: "Recorded -> 'Recorded · 2:40 PM', 'You can edit until 8:40 PM.'"
    static let wasteRecordedAt = time(14, 40)

    // PROJECT_CONTEXT.md sample rules: offline banner "Offline · saved 1:38 PM".
    static let offlineSavedAt = time(13, 38)

    // Staff initials and the supervisor from the role specs (door SK, pass desk SK, kitchen AK, supervisor RV, Ravi).
    static let supervisorName = "Ravi"
    static func staffInitials(for role: Role) -> String {
        switch role {
        case .doorScanner, .passDesk: return "SK"
        case .kitchenStaff: return "AK"
        case .supervisor: return "RV"
        default: return "—"
        }
    }

    // STATE.md: "Aarav ••0238".
    static let sampleStudent = StudentRef(id: StudentID("demo-student-0238"), maskedID: "••0238")

    /// NOT FROM THE DESIGN. The design documents no password value; this placeholder exists only so the
    /// simulated password page can be tried. Recorded in docs/OPEN_DECISIONS.md.
    static let simulatedRolePassword = "1234"

    // MARK: - Helpers

    /// A time on the sample day, Wed 14 Aug 2024, in the mess time zone.
    static func time(_ hour: Int, _ minute: Int) -> Date {
        var calendar = Calendar(identifier: .gregorian)
        calendar.timeZone = TimeZone(identifier: "Asia/Kolkata") ?? .current
        let components = DateComponents(year: 2024, month: 8, day: 14, hour: hour, minute: minute)
        return calendar.date(from: components) ?? Date(timeIntervalSince1970: 0)
    }
}
#endif
