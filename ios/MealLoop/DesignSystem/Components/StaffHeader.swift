import SwiftUI

/// The MealLoop mark. Approximation of the "Plate loop" mark until the final logo file exists (open decision).
struct OrbitMarkView: View {
    var body: some View {
        ZStack(alignment: .leading) {
            Capsule()
                .fill(MLColor.ink)
                .frame(width: 24, height: 16)
            Circle()
                .fill(MLColor.lime)
                .frame(width: 10, height: 10)
                .padding(.leading, 3)
        }
        .accessibilityHidden(true)
    }
}

/// Header shared by the staff homes: mark and wordmark on the left, initials avatar on the right.
struct StaffHeader: View {
    let initials: String
    var onAvatarTap: (() -> Void)?

    var body: some View {
        HStack {
            HStack(spacing: MLSpacing.s8) {
                OrbitMarkView()
                Text("MealLoop")
                    .font(MLType.bodyEmphasis)
                    .foregroundStyle(MLColor.ink)
            }
            .accessibilityElement(children: .combine)
            Spacer()
            Button {
                onAvatarTap?()
            } label: {
                Text(initials)
                    .font(MLType.bodyEmphasis)
                    .foregroundStyle(MLColor.lime)
                    .frame(width: MLSize.avatar, height: MLSize.avatar)
                    .background(Circle().fill(MLColor.ink))
            }
            .buttonStyle(.plain)
            .frame(minWidth: MLSize.hit, minHeight: MLSize.hit)
            .accessibilityLabel("Me")
        }
    }
}

/// Large title with one secondary line ("Lunch" / "Main Mess · 12–2 PM").
struct ScreenTitleBlock: View {
    let title: String
    let subtitle: String

    var body: some View {
        VStack(alignment: .leading, spacing: MLSpacing.s4) {
            Text(title)
                .font(MLType.largeTitle)
                .foregroundStyle(MLColor.ink)
            Text(subtitle)
                .font(MLType.body)
                .foregroundStyle(MLColor.inkSecondary)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
    }
}
