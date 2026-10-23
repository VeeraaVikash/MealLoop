import SwiftUI

/// The black hero card: one per screen.
struct HeroCard<Content: View>: View {
    @ViewBuilder let content: Content

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            content
        }
        .padding(MLSpacing.s20)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(RoundedRectangle(cornerRadius: MLRadius.card, style: .continuous).fill(MLColor.heroBackground))
    }
}

/// Caps label on a hero card, with an optional lime dot and a mono time ("● LIVE · 1:40 PM").
struct HeroEyebrow: View {
    let label: String
    var showsDot: Bool = false
    var time: String?

    var body: some View {
        HStack(spacing: MLSpacing.s8) {
            if showsDot {
                Circle().fill(MLColor.lime).frame(width: MLSize.statusDot, height: MLSize.statusDot)
            }
            Text(label.uppercased())
                .font(MLType.eyebrow)
                .tracking(1)
                .foregroundStyle(MLColor.onHeroSecondary)
            if let time {
                Text("· \(time)")
                    .font(MLType.monoSecondary)
                    .foregroundStyle(MLColor.onHeroSecondary)
            }
        }
        .accessibilityElement(children: .combine)
    }
}

/// A big count with its caption ("714" / "students entered"). Shows "—" when the count is missing, never 0.
struct HeroCount: View {
    let value: Int?
    let caption: String

    var body: some View {
        VStack(alignment: .leading, spacing: MLSpacing.s4) {
            Text(value.map { String($0) } ?? "—")
                .font(MLType.heroNumber)
                .foregroundStyle(MLColor.onHero)
            Text(caption)
                .font(MLType.staffBody)
                .foregroundStyle(MLColor.onHeroSecondary)
        }
        .accessibilityElement(children: .combine)
    }
}
