import SwiftUI

/// The staff tab bar: Home, Alerts, Me in a white capsule; the selected tab sits on a quiet pill.
/// SF Symbols stand in for the drawn icons (design gap 386).
struct StaffTabBar: View {
    @Binding var selection: StaffTab

    var body: some View {
        HStack(spacing: 0) {
            ForEach(StaffTab.allCases) { tab in
                Button {
                    selection = tab
                } label: {
                    VStack(spacing: 2) {
                        Image(systemName: symbol(for: tab))
                            .font(.system(size: 20, weight: .regular))
                        Text(title(for: tab))
                            .font(MLType.meta)
                    }
                    .foregroundStyle(MLColor.ink)
                    .frame(maxWidth: .infinity, minHeight: MLSize.staffButton)
                    .background {
                        if selection == tab {
                            Capsule().fill(MLColor.fillQuiet)
                        }
                    }
                }
                .buttonStyle(.plain)
                .accessibilityAddTraits(selection == tab ? .isSelected : [])
            }
        }
        .padding(MLSpacing.s4)
        .background(Capsule().fill(MLColor.surface))
        .overlay(Capsule().stroke(MLColor.border, lineWidth: 1))
    }

    private func title(for tab: StaffTab) -> String {
        switch tab {
        case .home: return "Home"
        case .alerts: return "Alerts"
        case .me: return "Me"
        }
    }

    private func symbol(for tab: StaffTab) -> String {
        switch tab {
        case .home: return "house"
        case .alerts: return "bell"
        case .me: return "person.crop.circle"
        }
    }
}
