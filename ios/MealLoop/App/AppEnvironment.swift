import Foundation
import Observation

// Seeded data may exist only in Debug (DEMO_DATA) and Review (REVIEW_DATA). If either flag reaches any other
// configuration (a pilot or production build), compilation stops here. Release can have neither.
#if DEMO_DATA && !DEBUG
#error("DEMO_DATA is set outside the Debug configuration. Demo data must never ship in a pilot or production build.")
#endif
#if REVIEW_DATA && !REVIEW_CONFIGURATION
#error("REVIEW_DATA is set outside the Review configuration. Seeded data must never ship in a pilot or production build.")
#endif
#if REVIEW_DATA && (DEBUG || DEMO_DATA)
#error("REVIEW_DATA cannot be combined with DEBUG or DEMO_DATA. The Review build must not contain the demo controls.")
#endif

enum DataSourceKind: String, Sendable {
    /// Seeded sample data (Debug only).
    case demo
    /// The same seeded data for the external review (Review only).
    case review
    /// The real backend through `RemoteAPI`. No backend address is configured yet, so every call throws
    /// `notImplemented`.
    case api
}

/// The Debug and Review demo shortcuts (the Demo sheet). Only the seeded provider conforms, and neither it nor the sheet
/// is compiled into Release. Nothing here moves the clock or replaces data.
protocol DemoControlling: Sendable {
    /// A session for the seeded account of a role, for Switch role (keeps data). Nil when the role has no account.
    func demoSession(for role: Role) async -> Session?
    /// The next student directory lookup on Register fails once, so its retry can be shown. Try again then succeeds.
    func failNextDirectoryLookup() async
    /// Moves the story clock to a moment of the day and runs lunch as the Supervisor would by then.
    func jump(to moment: DemoMoment) async
    func setOffline(_ offline: Bool) async
    var isOfflineNow: Bool { get async }
    /// A door entry for the sample student at the meal being served. False when no meal is being served.
    func recordSampleEntry() async -> Bool
    /// The mess moves the student's latest report one step on. False when there is none to move.
    func advanceLatestReport() async -> Bool
}

/// The story moments the Demo menu can jump to (owner decision, 16 Nov 2026: show every state in a demo).
enum DemoMoment: String, CaseIterable, Sendable {
    case storyStart, breakfastServing, lunchServing, afterLunch, dinner

    /// Wed 14 Aug in the mess time zone.
    var time: Date {
        var calendar = Calendar(identifier: .gregorian)
        calendar.timeZone = IntentionPolicy.messTimeZone
        let (hour, minute): (Int, Int) = switch self {
        case .storyStart: (7, 0)
        case .breakfastServing: (8, 0)
        case .lunchServing: (12, 30)
        case .afterLunch: (14, 30)
        case .dinner: (19, 45)
        }
        return calendar.date(from: DateComponents(year: 2024, month: 8, day: 14, hour: hour, minute: minute)) ?? Date()
    }
}

/// Selects exactly one data source for the running app. Demo and real data are never mixed.
@Observable
final class AppEnvironment {
    let kind: DataSourceKind
    let repositories: Repositories
    let clock: any AppClock
    /// Non-nil only in the Debug and Review environments.
    let demoControls: (any DemoControlling)?
    /// Local reminders on this phone (Notification settings).
    let reminders: any ReminderScheduling
    /// Bumped when data changes outside a screen,
    /// so screens can reload with `.task(id: environment.dataRevision)`.
    private(set) var dataRevision = 0

    init(kind: DataSourceKind, repositories: Repositories, clock: any AppClock, demoControls: (any DemoControlling)?,
         reminders: any ReminderScheduling = LocalReminderScheduler()) {
        self.kind = kind
        self.repositories = repositories
        self.clock = clock
        self.demoControls = demoControls
        self.reminders = reminders
    }

    func dataDidChange() {
        dataRevision += 1
    }

    /// The environment for this build configuration: demo in Debug, review in Review, api in every other configuration.
    static func make() -> AppEnvironment {
        #if DEMO_DATA
        return makeDemo()
        #elseif REVIEW_DATA
        return makeReview()
        #else
        return makeAPI()
        #endif
    }

    #if DEMO_DATA
    /// A clean Debug launch: Wed 14 Aug, 7:00 AM, breakfast not answered, lunch not started. The clock then runs in
    /// real time from there; nothing jumps it.
    static func makeDemo() -> AppEnvironment {
        let provider = DemoDataProvider(scenario: .storyStart, clock: RunningDemoClock(startingAt: DemoSeed.storyStartNow))
        return AppEnvironment(kind: .demo, repositories: provider.makeRepositories(), clock: provider.clock,
                              demoControls: provider)
    }
    #endif

    #if REVIEW_DATA
    /// A clean Review launch, the same start as Debug.
    static func makeReview() -> AppEnvironment {
        let provider = DemoDataProvider(scenario: .storyStart, clock: RunningDemoClock(startingAt: DemoSeed.storyStartNow))
        return AppEnvironment(kind: .review, repositories: provider.makeRepositories(), clock: provider.clock,
                              demoControls: provider)
    }
    #endif

    /// The Release environment: `RemoteAPI` over one `HTTPClient`, with the credential kept in the Keychain.
    /// No backend address exists yet (docs/OPEN_DECISIONS.md, NET-1), so `baseURL` is nil and every call answers
    /// `notImplemented`. Setting the address is the only change needed to talk to a server.
    static func makeAPI(baseURL: URL? = nil) -> AppEnvironment {
        let tokens = KeychainTokenStore()
        let client = HTTPClient(baseURL: baseURL, credential: { await tokens.read() })
        let api = RemoteAPI(client: client, tokens: tokens)
        return AppEnvironment(kind: .api, repositories: api.makeRepositories(), clock: SystemClock(), demoControls: nil)
    }
}
