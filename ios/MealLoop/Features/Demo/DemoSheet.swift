#if DEMO_DATA || REVIEW_DATA
import SwiftUI

/// The Demo states sheet (Debug and Review). Getting started, Student states, then Switch role (keeps data).
/// Getting started signs out and opens the real entry screens at a step. Student states move the story through the
/// data layer (owner decision, 16 Nov 2026): a time of day, offline, a door entry, the mess acting on a report. Screens
/// then show the state from the data, never from a value set on a view. Switch role signs in the role's seeded account.
struct DemoSheet: View {
    @Environment(AppEnvironment.self) private var environment
    @Environment(AppRouter.self) private var router
    @Environment(SessionStore.self) private var sessionStore
    @Environment(DemoMenu.self) private var demoMenu
    @Environment(DevicePreferences.self) private var preferences
    @State private var isOffline = false
    @State private var note: String?

    /// The order of the role list: the people of the core story first.
    static let roles: [Role] = [.student, .admin, .superAdmin, .supervisor, .kitchenStaff, .doorScanner, .passDesk,
                                .vendor, .guardian, .warden, .gate]

    /// The role named by the `-demoRole` launch argument, for verification runs.
    static func launchRole(_ arguments: [String] = ProcessInfo.processInfo.arguments) -> Role? {
        guard let index = arguments.firstIndex(of: "-demoRole"), arguments.indices.contains(index + 1) else { return nil }
        return Role(rawValue: arguments[index + 1])
    }

    var body: some View {
        NavigationStack {
            List {
                Section {
                    row("Walkthrough") {
                        preferences.resetWalkthrough()
                        start([])
                    }
                    row("Sign in") {
                        preferences.markWalkthroughSeen()
                        start([.signIn])
                    }
                    row("Student · show first-visit guides again") {
                        if let student = sessionStore.current?.student?.student.id {
                            preferences.clearFlags(withPrefix: StudentGuide.flagPrefix(for: student))
                        }
                        demoMenu.isPresented = false
                    }
                } header: {
                    Text(DemoCopy.gettingStarted)
                } footer: {
                    Text(DemoCopy.gettingStartedFooter)
                }

                Section {
                    ForEach(DemoMoment.allCases, id: \.self) { moment in
                        row(DemoCopy.moment(moment)) { await act { await $0.jump(to: moment) } }
                    }
                    row(isOffline ? DemoCopy.goOnline : DemoCopy.goOffline) {
                        await act { await $0.setOffline(!isOffline) }
                    }
                    row(DemoCopy.recordEntry) {
                        await act { controls in
                            if !(await controls.recordSampleEntry()) { note = DemoCopy.noMealServing }
                        }
                    }
                    row(DemoCopy.advanceReport) {
                        await act { controls in
                            if !(await controls.advanceLatestReport()) { note = DemoCopy.noReportToMove }
                        }
                    }
                } header: {
                    Text(DemoCopy.studentStates)
                } footer: {
                    Text(note ?? DemoCopy.studentStatesFooter)
                }

                Section {
                    ForEach(Self.roles, id: \.self) { role in
                        let isCurrent = sessionStore.current?.account.role == role
                        row(MLFormat.roleName(role), isCurrent: isCurrent) { await switchTo(role) }
                            .disabled(isCurrent)
                    }
                } header: {
                    Text(DemoCopy.switchRole)
                } footer: {
                    Text(DemoCopy.switchRoleFooter)
                }
            }
            .listStyle(.insetGrouped)
            .navigationTitle(DemoCopy.sheetTitle)
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .confirmationAction) {
                    Button(DemoCopy.done) { demoMenu.isPresented = false }
                }
            }
        }
        .presentationDetents([.medium, .large])
        .presentationDragIndicator(.visible)
        .task { isOffline = await environment.demoControls?.isOfflineNow ?? false }
    }

    /// Runs a data change as the sample student, tells every screen to reload, and closes the sheet unless there is a
    /// note to read.
    private func act(_ change: (any DemoControlling) async -> Void) async {
        guard let controls = environment.demoControls else { return }
        note = nil
        await change(controls)
        isOffline = await controls.isOfflineNow
        if sessionStore.current?.account.role != .student { await switchTo(.student) }
        environment.dataDidChange()
        if note == nil { demoMenu.isPresented = false }
    }

    private func row(_ title: String, isCurrent: Bool = false, action: @escaping () async -> Void) -> some View {
        Button {
            Task { await action() }
        } label: {
            HStack {
                Text(title)
                    .foregroundStyle(Color.primary)
                Spacer(minLength: MLSpacing.s8)
                if isCurrent {
                    Image(systemName: "checkmark")
                        .foregroundStyle(Color.secondary)
                        .accessibilityLabel("Current")
                }
            }
            .contentShape(Rectangle())
        }
    }

    /// Signs out and opens the entry stack at the given steps. Nothing else changes.
    private func start(_ path: [EntryRoute]) {
        demoMenu.isPresented = false
        router.reset()
        sessionStore.signOut()
        router.entryPath = path
    }

    /// Opens the role's normal landing screen with every navigation path cleared. Data and the clock are untouched.
    private func switchTo(_ role: Role) async {
        guard let session = await environment.demoControls?.demoSession(for: role) else { return }
        demoMenu.isPresented = false
        router.reset()
        sessionStore.signIn(session)
    }
}
#endif
