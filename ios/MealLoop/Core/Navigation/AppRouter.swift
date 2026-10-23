import Foundation
import Observation

/// The separate apps (logins) MealLoop has.
enum AppSurface: String, CaseIterable, Identifiable, Hashable, Sendable {
    case student
    case messStaff
    case admin
    case guardian
    case warden
    case gate

    var id: String { rawValue }

    var title: String {
        switch self {
        case .student: return "Student"
        case .messStaff: return "Mess staff"
        case .admin: return "Admin (Food head)"
        case .guardian: return "Guardian"
        case .warden: return "Warden"
        case .gate: return "Gate"
        }
    }
}

/// Routes inside the staff entry flow (role selection → What you do sheet → shared password).
enum StaffEntryRoute: Hashable, Sendable {
    case password(Role)
}

/// The shared staff tab pattern: Home, Alerts, Me. There is no fourth tab.
enum StaffTab: String, CaseIterable, Identifiable, Hashable, Sendable {
    case home
    case alerts
    case me

    var id: String { rawValue }
}

/// Pushed screens inside a staff tab. Add cases here as screens are built; keep one enum for all staff roles.
enum StaffRoute: Hashable, Sendable {
    case notImplemented(title: String)
}

/// The one router shared by the whole app.
@Observable
final class AppRouter {
    var surface: AppSurface?
    var staffEntryPath: [StaffEntryRoute] = []
    var staffSession: StaffSession?
    var selectedStaffTab: StaffTab = .home
    var staffHomePath: [StaffRoute] = []

    func open(_ surface: AppSurface) {
        self.surface = surface
    }

    func signIn(_ session: StaffSession) {
        staffSession = session
        staffEntryPath = []
        selectedStaffTab = .home
        staffHomePath = []
    }

    /// Sign out returns to role selection (Supervisor spec: "Sign out → role selection").
    func signOut() {
        staffSession = nil
        staffEntryPath = []
        staffHomePath = []
        selectedStaffTab = .home
    }

    func leaveSurface() {
        signOut()
        surface = nil
    }
}
