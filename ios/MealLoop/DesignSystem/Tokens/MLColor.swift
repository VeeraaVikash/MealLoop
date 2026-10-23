import SwiftUI

/// Colour tokens (Light). Names follow the Figma "ML Color" variables.
/// Sources: design/README.md, design_intent.md, final_audit/token_audit.md, and the measured colours of the
/// Figma exports in design/audit/export_kitchen and export_door_scanner (see docs/FOUNDATION_REPORT.md).
/// Lime is the only accent. Do not add colours the design does not have.
enum MLColor {
    /// canvas #EDEDE8: the Orbit background and screen canvas.
    static let canvas = Color(hex: 0xEDEDE8)
    /// surface #FFFFFF: cards, rows, the tab bar capsule.
    static let surface = Color(hex: 0xFFFFFF)
    /// fill-quiet #F2F2EC: quiet fills (icon circles, the selected tab, keypad keys).
    static let fillQuiet = Color(hex: 0xF2F2EC)
    /// ink #111111: primary text, black buttons.
    static let ink = Color(hex: 0x111111)
    /// ink-secondary #5C5C58: secondary text.
    static let inkSecondary = Color(hex: 0x5C5C58)
    /// border #D6D6D0: hairlines and card borders.
    static let border = Color(hex: 0xD6D6D0)
    /// track #E1E1DA: progress tracks.
    static let track = Color(hex: 0xE1E1DA)
    /// lime #D4F25A: the single accent. Fill only, never text on a light surface.
    static let lime = Color(hex: 0xD4F25A)
    /// on-lime #111111: text and icons on lime.
    static let onLime = Color(hex: 0x111111)
    /// lime-outline #111111: the 1 pt outline drawn around lime fills on light surfaces.
    static let limeOutline = Color(hex: 0x111111)
    /// hero-bg #111111: the black hero card.
    static let heroBackground = Color(hex: 0x111111)
    /// Text on the black hero. Measured #FFFFFF in the K02 export; confirm against the on-hero variable.
    static let onHero = Color(hex: 0xFFFFFF)
    /// Secondary text on the black hero. Measured #B5B5AE in the K02 export; confirm against on-hero-secondary.
    static let onHeroSecondary = Color(hex: 0xB5B5AE)
    /// Error text ("Wrong password. 2 tries left."). Measured #B32635 in the D03 export; no token name is documented.
    static let danger = Color(hex: 0xB32635)
}

extension Color {
    /// A colour from a 0xRRGGBB literal (sRGB).
    init(hex: UInt32, opacity: Double = 1) {
        let red = Double((hex >> 16) & 0xFF) / 255
        let green = Double((hex >> 8) & 0xFF) / 255
        let blue = Double(hex & 0xFF) / 255
        self.init(.sRGB, red: red, green: green, blue: blue, opacity: opacity)
    }
}
