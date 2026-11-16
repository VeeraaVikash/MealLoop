import SwiftUI

/// The small Demo entry: on Welcome and in a Me, You or More page. It opens the Demo sheet.
/// Debug and Review only; in Release it draws nothing and the sheet does not exist.
struct DemoEntryButton: View {
    @Environment(DemoMenu.self) private var demoMenu: DemoMenu?

    var body: some View {
        #if DEMO_DATA || REVIEW_DATA
        Button {
            demoMenu?.isPresented = true
        } label: {
            Text(DemoCopy.entry)
                .mlFont(.meta)
                .foregroundStyle(MLColor.ink)
                .padding(.horizontal, MLSpacing.s12)
                .frame(minHeight: 32)
                .background(Capsule().fill(MLColor.surface))
                .overlay(Capsule().stroke(MLColor.border, lineWidth: 1))
                .frame(minHeight: MLSize.hit)
                .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
        .accessibilityLabel(DemoCopy.entryAccessibility)
        #else
        EmptyView()
        #endif
    }
}

/// The Demo row of a Me, You or More list. Debug and Review only.
struct DemoEntryRow: View {
    @Environment(DemoMenu.self) private var demoMenu: DemoMenu?

    var body: some View {
        #if DEMO_DATA || REVIEW_DATA
        Button {
            demoMenu?.isPresented = true
        } label: {
            HStack {
                Text(DemoCopy.rowTitle)
                    .mlFont(.staffBody)
                    .foregroundStyle(MLColor.ink)
                Spacer(minLength: MLSpacing.s8)
                Image(systemName: "chevron.right")
                    .foregroundStyle(MLColor.inkSecondary)
                    .accessibilityHidden(true)
            }
            .frame(minHeight: MLSize.hit)
            .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
        .accessibilityLabel(DemoCopy.entryAccessibility)
        #else
        EmptyView()
        #endif
    }
}

enum DemoCopy {
    static let entry = "Demo"
    static let rowTitle = "Demo states"
    static let entryAccessibility = "Demo states. Opens the demo shortcuts."
    static let sheetTitle = "Demo states"
    static let gettingStarted = "Getting started"
    static let switchRole = "Switch role (keeps data)"
    static let switchRoleFooter = "Opens the role's Home. Answers, entries, reports and the time stay as they are."
    static let gettingStartedFooter = "Signs out and opens the real sign-in screens. Data and the time stay as they are."
    static let done = "Done"
    static let studentStates = "Student states"
    static let studentStatesFooter = "Moves the story for every role: the time, offline, a door entry, the mess acting on a report. Data you made stays."
    static func moment(_ moment: DemoMoment) -> String {
        switch moment {
        case .storyStart: "7:00 AM · story start, breakfast answers closed"
        case .breakfastServing: "8:00 AM · breakfast being served"
        case .lunchServing: "12:30 PM · lunch being served"
        case .afterLunch: "2:30 PM · lunch over, credits settle"
        case .dinner: "7:45 PM · dinner time"
        }
    }
    static let goOffline = "Go offline"
    static let goOnline = "Back online"
    static let recordEntry = "Record my entry at the door (meal being served)"
    static let advanceReport = "Mess moves my latest report on (Sent → Seen → Working on it → Fixed)"
    static let noMealServing = "No meal is being served. Pick 12:30 PM first."
    static let noReportToMove = "No report to move. Send one from You → My reports → Report a problem first."
}
