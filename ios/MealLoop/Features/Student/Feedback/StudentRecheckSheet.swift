import SwiftUI

/// The recheck sheet (reference: "Was the sambar better today?", 15 Nov 2026): the student's own issue, the kitchen's
/// recorded change when there is one, and Better, Still a problem, I didn't eat it today. Opens only for a dish whose
/// fix is recorded and whose recheck is unanswered. I didn't eat it today records no rating.
struct StudentRecheckSheet: View {
    let item: StudentFeedbackItem
    let isSending: Bool
    let error: String?
    let onAnswer: (StudentRecheckAnswer) -> Void
    let onClose: () -> Void

    var body: some View {
        VStack(spacing: MLSpacing.s16) {
            HStack {
                Spacer()
                SheetCloseButton(action: onClose)
            }
            Image("student-recheck-chef")
                .resizable()
                .scaledToFit()
                .frame(width: 72, height: 72)
                .accessibilityHidden(true)
            Text(RecordsCopy.wasItBetter(item.dish))
                .font(MLType.heroTitle)
                .foregroundStyle(MLColor.ink)
                .multilineTextAlignment(.center)
                .fixedSize(horizontal: false, vertical: true)
                .accessibilityAddTraits(.isHeader)
            Text(detail)
                .font(StudentType.body)
                .foregroundStyle(MLColor.inkSecondary)
                .multilineTextAlignment(.center)
                .fixedSize(horizontal: false, vertical: true)
            HStack(spacing: MLSpacing.s12) {
                InkActionButton(title: RecordsCopy.better, isLoading: isSending) { onAnswer(.better) }
                OutlineActionButton(title: RecordsCopy.stillAProblem) { onAnswer(.stillAProblem) }
            }
            .disabled(isSending)
            Button { onAnswer(.didntEat) } label: {
                Text(RecordsCopy.didntEat)
                    .font(StudentType.bodySemibold)
                    .foregroundStyle(MLColor.inkSecondary)
                    .frame(minHeight: MLSize.hit)
                    .contentShape(Rectangle())
            }
            .buttonStyle(.plain)
            .disabled(isSending)
            if let error {
                InlineErrorText(message: error)
            }
        }
    }

    /// The student's issue, then what the kitchen recorded. Without a recorded change that sentence is left out.
    private var detail: String {
        let said = RecordsCopy.youSaidProblem(item.dish, item.problem)
        guard let note = item.fixNote else { return said }
        return "\(said) \(RecordsCopy.kitchenRecorded(note))"
    }
}
