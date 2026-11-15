import Foundation
import Observation

/// Pushed screens before sign-in. The stack root is the walkthrough on a phone that has not seen it, otherwise Sign in.
/// Every account uses the one Sign in; Register is for students only.
enum EntryRoute: Hashable, Sendable {
    case signIn
    case register
}

/// The shared staff tab pattern: Home, Alerts, Me. There is no fourth tab.
enum StaffTab: String, CaseIterable, Identifiable, Hashable, Sendable {
    case home
    case alerts
    case me

    var id: String { rawValue }
}

/// Navigation state only. Who is signed in lives in `SessionStore`.
@Observable
final class AppRouter {
    var entryPath: [EntryRoute] = []
    var selectedStaffTab: StaffTab = .home

    /// Clears every path, so the next account never inherits the previous account's position.
    func reset() {
        entryPath = []
        selectedStaffTab = .home
    }
}
