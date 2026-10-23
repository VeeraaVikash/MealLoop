import SwiftUI

/// The "Orbit" backdrop: flat canvas, faint dot texture, a lime disc top right with four hairline rings,
/// one black dot, and a fainter ring pair bottom left. Geometry from design/audit/redesign/preflight.md
/// ("Orbit geometry", measured on the 393 × 852 frame). One fixed layer behind scrolling content.
struct OrbitBackground: View {
    var body: some View {
        Canvas { context, size in
            let scale = size.width / MLSize.designWidth
            let ink = MLColor.ink

            context.fill(Path(CGRect(origin: .zero, size: size)), with: .color(MLColor.canvas))

            // Dot texture: r 1.2 pt every 18.8 pt at 7% ink.
            let step = 18.8 * scale
            let radius = 1.2 * scale
            var dots = Path()
            var y = step / 2
            while y < size.height {
                var x = step / 2
                while x < size.width {
                    dots.addEllipse(in: CGRect(x: x - radius, y: y - radius, width: radius * 2, height: radius * 2))
                    x += step
                }
                y += step
            }
            context.fill(dots, with: .color(ink.opacity(0.07)))

            // Lime disc, top right, with four hairline rings.
            let discCentre = CGPoint(x: size.width - 5.4 * scale, y: 16.2 * scale)
            context.fill(circle(discCentre, 129.2 * scale), with: .color(MLColor.lime))
            for (ringRadius, opacity) in [(177.7, 0.14), (226.1, 0.12), (274.6, 0.10), (323.0, 0.08)] {
                context.stroke(circle(discCentre, ringRadius * scale), with: .color(ink.opacity(opacity)), lineWidth: 1)
            }

            // One black dot on the first ring.
            context.fill(circle(CGPoint(x: 233.8 * scale, y: 105.0 * scale), 6.7 * scale), with: .color(ink))

            // Fainter ring pair, bottom left.
            let lowerCentre = CGPoint(x: -24.2 * scale, y: size.height - 49.8 * scale)
            context.stroke(circle(lowerCentre, 94.2 * scale), with: .color(ink.opacity(0.10)), lineWidth: 1)
            context.stroke(circle(lowerCentre, 148.1 * scale), with: .color(ink.opacity(0.08)), lineWidth: 1)
        }
        .ignoresSafeArea()
        .accessibilityHidden(true)
    }

    private func circle(_ centre: CGPoint, _ radius: CGFloat) -> Path {
        Path(ellipseIn: CGRect(x: centre.x - radius, y: centre.y - radius, width: radius * 2, height: radius * 2))
    }
}
