import SwiftUI

/// Lime primary action, 56 pt (staff). On a light surface it gets the 1 pt ink outline (brand rule V2).
struct LimeActionButton: View {
    let title: String
    var systemImage: String?
    var onLightSurface: Bool = false
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            HStack(spacing: MLSpacing.s8) {
                if let systemImage {
                    Image(systemName: systemImage)
                }
                Text(title)
            }
            .font(MLType.staffPrimary)
            .foregroundStyle(MLColor.onLime)
            .frame(maxWidth: .infinity, minHeight: MLSize.staffButton)
            .background(Capsule().fill(MLColor.lime))
            .overlay {
                if onLightSurface {
                    Capsule().stroke(MLColor.limeOutline, lineWidth: 1)
                }
            }
        }
        .buttonStyle(.plain)
    }
}

/// Black primary action, 56 pt (staff).
struct InkActionButton: View {
    let title: String
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Text(title)
                .font(MLType.staffPrimary)
                .foregroundStyle(MLColor.onHero)
                .frame(maxWidth: .infinity, minHeight: MLSize.staffButton)
                .background(Capsule().fill(MLColor.ink))
        }
        .buttonStyle(.plain)
    }
}
