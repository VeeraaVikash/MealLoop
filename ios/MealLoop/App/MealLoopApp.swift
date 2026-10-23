import SwiftUI

@main
struct MealLoopApp: App {
    @State private var environment = AppEnvironment.make()
    @State private var router = AppRouter()

    var body: some Scene {
        WindowGroup {
            AppRootView()
                .environment(environment)
                .environment(router)
        }
    }
}
