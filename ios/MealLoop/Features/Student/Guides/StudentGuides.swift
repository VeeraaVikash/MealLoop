import SwiftUI

/// The first-visit guides (Credits, feedback, Community, the outing pass and SOS). Each opens by itself the first time a student reaches its page after signing in, and
/// the ⓘ button in that page's navigation bar always opens it again. Seen state is kept per student and per guide in
/// `DevicePreferences`, so it survives relaunches and later sign-ins and dismissing one leaves the others eligible.
enum StudentGuide: String, CaseIterable, Identifiable, Sendable {
    case credits
    case feedback
    case community
    case outingPass
    case sos

    var id: String { rawValue }

    static func flagPrefix(for student: StudentID) -> String { "guide.\(student.rawValue)." }

    func flag(for student: StudentID) -> String { Self.flagPrefix(for: student) + rawValue }

    /// The help link and the sheet title.
    var title: String {
        switch self {
        case .credits: return "How points work"
        case .feedback: return "How feedback works"
        case .community: return "How Community works"
        case .outingPass: return "How the outing pass works"
        case .sos: return "How SOS works"
        }
    }

    /// What a student can do today. Credits builds its rows from the ledger instead (`StudentCreditsRulesSheet`).
    var items: [(title: String, detail: String)] {
        switch self {
        case .credits:
            return []
        case .feedback:
            return [
                ("Rate a dish", "It opens once your entry for a meal is recorded at the door. You can also start it here."),
                ("Say what was wrong", "Pick the dish and choose what was wrong, like too salty or cold. Your status shows on this page."),
                ("Something unsafe?", "Use SOS on Home for anything in your food, smells, dirty plates or feeling unwell."),
                ("Rechecks", "If the kitchen changes a dish you reported, we ask if it was better: Better, Still a problem, or I didn't eat it today."),
            ]
        case .community:
            return [
                ("Who sees it", "Your mess food head and the mess team. Others see how many back a report, never who."),
                ("Same problem?", "Tap Me too instead of a new report. You can undo it."),
                ("What the steps mean", "Reported, then Seen by the mess, then Fixing, then Fixed. Fixed ones move to the Fixed tab."),
                ("What to write", "The dish or the place, not a person. The mess team can hide a post and keeps its count."),
            ]
        case .outingPass:
            return [
                ("1 · You ask", "Send an outing request from Outings."),
                ("2 · Your guardian decides", "They approve or decline it."),
                ("3 · The warden decides", "Only after your guardian. Nothing is approved by waiting."),
                ("4 · Your pass", "Once the warden approves, your signed pass shows here."),
                ("5 · At the gate", "Show the pass when you leave and when you come back."),
            ]
        case .sos:
            return [
                ("Pick what happened", "Found something, looks bad, smells bad, feeling unwell, or another problem."),
                ("Tap, don't type", "Choose from the options. Add a note only if you want to."),
                ("Photo", "Found something, looks bad and smells bad need a photo of the food."),
                ("Sent with it", "Your location and your details go with the SOS, so the mess team can find you."),
            ]
        }
    }
}

/// A guide sheet: title, short items and Got it. Credits passes its own ledger rows instead.
struct StudentGuideSheet: View {
    let guide: StudentGuide
    let onClose: () -> Void

    var body: some View {
        VStack(alignment: .leading, spacing: MLSpacing.s16) {
            SheetHeader(title: guide.title, onClose: onClose)
            ForEach(guide.items, id: \.title) { item in
                VStack(alignment: .leading, spacing: 2) {
                    Text(item.title).font(StudentType.bodySemibold).foregroundStyle(MLColor.ink)
                    Text(item.detail).font(StudentType.secondary).foregroundStyle(MLColor.inkSecondary)
                        .fixedSize(horizontal: false, vertical: true)
                }
                .accessibilityElement(children: .combine)
            }
            InkActionButton(title: GuideCopy.gotIt, action: onClose)
        }
    }
}

enum GuideCopy {
    static let gotIt = "Got it"
}

/// The ⓘ button in the page's navigation bar, trailing. It stays in the bar when the large title collapses, and it
/// always reopens the page's guide. A plain bar button: the bar draws its own glass circle.
struct StudentGuideInfoButton: View {
    let guide: StudentGuide
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Image(systemName: "info.circle")
                .foregroundStyle(MLColor.ink)
        }
        .accessibilityLabel(guide.title)
        .accessibilityIdentifier("student.guide.\(guide.rawValue)")
    }
}

extension View {
    /// Opens `guide` the first time this student reaches the page, then marks only that guide seen when it closes.
    /// While `isBlocked` (another sheet of the page is up) it waits, and opens once the page is free.
    func studentGuide<Sheet: View>(_ guide: StudentGuide, student: StudentID, isPresented: Binding<Bool>,
                                   isBlocked: Bool = false, @ViewBuilder sheet: @escaping () -> Sheet) -> some View {
        modifier(StudentGuideModifier(guide: guide, student: student, isPresented: isPresented, isBlocked: isBlocked,
                                      sheet: sheet))
    }

    /// The same, with the standard guide sheet.
    func studentGuide(_ guide: StudentGuide, student: StudentID, isPresented: Binding<Bool>,
                      isBlocked: Bool = false) -> some View {
        studentGuide(guide, student: student, isPresented: isPresented, isBlocked: isBlocked) {
            StudentGuideSheet(guide: guide) { isPresented.wrappedValue = false }
        }
    }
}

private struct StudentGuideModifier<Sheet: View>: ViewModifier {
    @Environment(DevicePreferences.self) private var preferences
    let guide: StudentGuide
    let student: StudentID
    @Binding var isPresented: Bool
    let isBlocked: Bool
    let sheet: () -> Sheet
    @State private var isWaiting = false

    private var flag: String { guide.flag(for: student) }

    func body(content: Content) -> some View {
        content
            .task {
                guard !preferences.hasSeen(flag) else { return }
                // Let the push or tab switch finish first, so the sheet never fights the transition.
                try? await Task.sleep(for: .milliseconds(450))
                if isBlocked { isWaiting = true } else { isPresented = true }
            }
            .onChange(of: isBlocked) { _, blocked in
                if !blocked && isWaiting && !preferences.hasSeen(flag) {
                    isWaiting = false
                    isPresented = true
                }
            }
            .mlSheet(isPresented: $isPresented, isWorking: false, onDismiss: { preferences.markSeen(flag) }) {
                sheet()
            }
    }
}
