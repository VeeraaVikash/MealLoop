import Foundation
import Observation

/// Small memory kept on this phone that is not account data: whether the walkthrough was seen, which first-visit guides
/// a student has seen, and a student's reminder choices. It survives relaunches and later sign-ins, unlike the seeded
/// data, which resets on every launch. One instance, made at the app root; tests pass their own `UserDefaults` suite.
/// It holds no password, token or personal detail, only flags and times keyed by an opaque student ID.
@Observable
final class DevicePreferences {
    @ObservationIgnored private let defaults: UserDefaults
    private(set) var hasSeenWalkthrough: Bool
    /// Every flag that is set, so views re-render when one changes.
    private(set) var seenFlags: Set<String>

    private static let walkthroughKey = "ml.walkthrough.seen"
    private static let flagsKey = "ml.flags.seen"

    init(defaults: UserDefaults = .standard) {
        self.defaults = defaults
        hasSeenWalkthrough = defaults.bool(forKey: Self.walkthroughKey)
        seenFlags = Set(defaults.stringArray(forKey: Self.flagsKey) ?? [])
    }

    func markWalkthroughSeen() {
        hasSeenWalkthrough = true
        defaults.set(true, forKey: Self.walkthroughKey)
    }

    /// Debug and Review: the walkthrough shows again on the next start.
    func resetWalkthrough() {
        hasSeenWalkthrough = false
        defaults.removeObject(forKey: Self.walkthroughKey)
    }

    func hasSeen(_ flag: String) -> Bool { seenFlags.contains(flag) }

    func markSeen(_ flag: String) {
        guard !seenFlags.contains(flag) else { return }
        seenFlags.insert(flag)
        defaults.set(Array(seenFlags).sorted(), forKey: Self.flagsKey)
    }

    /// Debug and Review: clears every flag whose key starts with `prefix` (one student's guides).
    func clearFlags(withPrefix prefix: String) {
        seenFlags = seenFlags.filter { !$0.hasPrefix(prefix) }
        defaults.set(Array(seenFlags).sorted(), forKey: Self.flagsKey)
    }

    func data(forKey key: String) -> Data? { defaults.data(forKey: key) }

    func set(_ data: Data, forKey key: String) { defaults.set(data, forKey: key) }
}
