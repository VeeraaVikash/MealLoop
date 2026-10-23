import CoreGraphics

/// Spacing tokens from the Figma "ML Layout" collection (space 4–32, margin 20).
enum MLSpacing {
    static let s4: CGFloat = 4
    static let s8: CGFloat = 8
    static let s12: CGFloat = 12
    static let s16: CGFloat = 16
    static let s20: CGFloat = 20
    static let s24: CGFloat = 24
    static let s32: CGFloat = 32
    /// Screen side margin.
    static let margin: CGFloat = 20
}

/// Radius tokens (card 24, compact 16, icon 12, input 12, pill 999).
enum MLRadius {
    static let card: CGFloat = 24
    static let compact: CGFloat = 16
    static let icon: CGFloat = 12
    static let input: CGFloat = 12
    static let pill: CGFloat = 999
}

/// Size tokens (button 52 / 48, hit 44, icon square 40) and the staff rule of 56 pt primary actions.
enum MLSize {
    static let button: CGFloat = 52
    static let buttonCompact: CGFloat = 48
    /// Staff primary buttons and staff tap targets.
    static let staffButton: CGFloat = 56
    /// Minimum tap target everywhere.
    static let hit: CGFloat = 44
    static let iconSquare: CGFloat = 40
    static let avatar: CGFloat = 44
    static let statusDot: CGFloat = 8
    /// Reference frame width used by the design (393 pt).
    static let designWidth: CGFloat = 393
}
