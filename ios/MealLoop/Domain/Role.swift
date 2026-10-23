import Foundation

/// Every person who uses MealLoop. Mess staff share one login with four roles (role selection + shared password).
enum Role: String, Codable, Sendable, CaseIterable, Hashable, Identifiable {
    case student
    /// Food head and administrators (the admin app: Today, Students, Results, More).
    case admin
    case doorScanner
    case passDesk
    case kitchenStaff
    case supervisor
    case guardian
    case warden
    case gate

    /// The four roles offered on "Choose your role" (D01), in the order the design shows them.
    static let staffRoles: [Role] = [.doorScanner, .passDesk, .kitchenStaff, .supervisor]

    var isMessStaff: Bool { Role.staffRoles.contains(self) }

    var id: String { rawValue }
}
