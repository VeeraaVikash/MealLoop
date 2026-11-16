import SwiftUI

/// The Student tabs. Search was removed (student redesign, 15 Nov 2026).
enum StudentTab: String, CaseIterable, Hashable {
    case home = "Home"
    case meals = "Meals"
    case community = "Community"
    case you = "You"

    var symbol: String {
        switch self {
        case .home: return "house"
        case .meals: return "fork.knife"
        case .community: return "person.2"
        case .you: return "person.crop.circle"
        }
    }
}

/// The Student root: the system tab bar with Home, Meals, Community and You. The system draws the bar for the running
/// iOS version (Liquid Glass on iOS 26 and later), and every tab keeps its own navigation stack.
struct StudentRootView: View {
    @Environment(AppRouter.self) private var router
    @Environment(SessionStore.self) private var sessionStore
    let session: Session
    @State private var tab: StudentTab = .home
    /// Swipe-to-remind reminders (local, simulated), kept across tab switches.
    @State private var reminders = StudentMealReminders()

    var body: some View {
        TabView(selection: $tab) {
            StudentHomeScreen(session: session)
                .tabItem { Label(StudentTab.home.rawValue, systemImage: StudentTab.home.symbol) }
                .tag(StudentTab.home)
            StudentMealsScreen(session: session)
                .tabItem { Label(StudentTab.meals.rawValue, systemImage: StudentTab.meals.symbol) }
                .tag(StudentTab.meals)
            StudentCommunityScreen(session: session)
                .tabItem { Label(StudentTab.community.rawValue, systemImage: StudentTab.community.symbol) }
                .tag(StudentTab.community)
            StudentYouScreen(session: session) {
                router.reset()
                sessionStore.signOut()
            }
            .tabItem { Label(StudentTab.you.rawValue, systemImage: StudentTab.you.symbol) }
            .tag(StudentTab.you)
        }
        .tint(MLColor.ink)
        .environment(\.studentSelectTab, { tab = $0 })
        .studentReminders(reminders)
        .dynamicTypeSize(...StudentType.largestSize)
    }
}
