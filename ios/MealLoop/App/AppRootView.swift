import SwiftUI

/// Root routing: one surface per login. Only Mess staff has screens in this foundation.
struct AppRootView: View {
    @Environment(AppRouter.self) private var router

    var body: some View {
        ZStack(alignment: .bottomLeading) {
            switch router.surface {
            case .none:
                SurfaceLauncherView()
            case .messStaff?:
                StaffRootView()
            case .some(let surface):
                NotImplementedView(title: surface.title,
                                   detail: "This app's screens are not built yet. See docs/SCREEN_INVENTORY.md.",
                                   actionTitle: "Back") {
                    router.surface = nil
                }
            }
            #if DEMO_DATA
            DemoDataBadge()
                .padding(.leading, MLSpacing.s16)
                .padding(.bottom, 96)
            #endif
        }
    }
}

/// Development launcher: pick which app to open. Real sign-in for each app is not implemented.
struct SurfaceLauncherView: View {
    @Environment(AppRouter.self) private var router

    var body: some View {
        ZStack {
            OrbitBackground()
            VStack(alignment: .leading, spacing: MLSpacing.s16) {
                Text("MealLoop")
                    .font(MLType.largeTitle)
                    .foregroundStyle(MLColor.ink)
                Text("Development launcher. Pick an app to open.")
                    .font(MLType.secondary)
                    .foregroundStyle(MLColor.inkSecondary)
                VStack(spacing: 0) {
                    ForEach(AppSurface.allCases) { surface in
                        QuietRow(title: surface.title) {
                            router.open(surface)
                        }
                    }
                }
                Spacer()
            }
            .padding(.horizontal, MLSpacing.margin)
            .padding(.top, MLSpacing.s32)
        }
    }
}
