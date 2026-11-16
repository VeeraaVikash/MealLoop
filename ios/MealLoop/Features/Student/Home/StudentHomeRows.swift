import SwiftUI

/// The answer row (AnswerRow 2135:2382). Unanswered and Not sure: black Answer. In and Skipped: outlined Change.
/// After the cutoff: dashed Closed, and "your QR still works".
struct StudentAnswerRow: View {
    let card: StudentMealCard
    let now: Date
    let timeZone: TimeZone
    let onOpen: () -> Void

    private var slot: MealSlot { card.meal.slot }
    private var cutoffTime: String { StudentFormat.shortTime(card.cutoff, in: timeZone) }
    private var timeLeft: String {
        StudentFormat.compactLeft(MLFormat.elapsed(minutes: MLFormat.minutes(from: now, to: card.cutoff)))
    }

    private var title: String {
        guard card.isAnswerOpen else { return StudentCopy.answersClosedRow(slot) }
        switch card.answer {
        case .attending?: return StudentCopy.youreIn(slot)
        case .skipping?: return StudentCopy.youSkipped(slot)
        case .notSure?, nil: return StudentCopy.youInFor(slot)
        }
    }

    private var detail: String {
        guard card.isAnswerOpen else { return StudentCopy.cutoffPassed(cutoffTime) }
        switch card.answer {
        case .attending?, .skipping?: return StudentCopy.changeBy(cutoffTime, left: timeLeft)
        case .notSure?, nil: return StudentCopy.decideBy(cutoffTime, left: timeLeft)
        }
    }

    @Environment(\.dynamicTypeSize) private var typeSize

    var body: some View {
        // At the accessibility text sizes the button moves under the text instead of squeezing it.
        if typeSize.isAccessibilitySize {
            VStack(alignment: .leading, spacing: MLSpacing.s12) {
                rowLabel
                action
            }
            .padding(MLSpacing.s16)
            .frame(maxWidth: .infinity, alignment: .leading)
            .studentNativeCard()
        } else {
            HStack(spacing: 14) {
                rowLabel
                Spacer(minLength: 0)
                action
            }
            .padding(.leading, MLSpacing.s16)
            .padding(.trailing, MLSpacing.s12)
            .padding(.vertical, 14)
            .studentNativeCard()
        }
    }

    private var rowLabel: some View {
        HStack(spacing: 14) {
            Image(systemName: "fork.knife")
                .font(.system(size: 19))
                .foregroundStyle(MLColor.ink)
                .frame(width: MLSize.hit, height: MLSize.hit)
                .background(RoundedRectangle(cornerRadius: 14, style: .continuous).fill(MLColor.fillQuiet))
                .accessibilityHidden(true)
            VStack(alignment: .leading, spacing: 2) {
                Text(title)
                    .font(StudentType.bodySemibold)
                    .foregroundStyle(MLColor.ink)
                    .fixedSize(horizontal: false, vertical: true)
                Text(detail)
                    .font(StudentType.footnote)
                    .foregroundStyle(MLColor.inkSecondary)
                    .fixedSize(horizontal: false, vertical: true)
            }
        }
    }

    @ViewBuilder
    private var action: some View {
        if !card.isAnswerOpen {
            Button(action: onOpen) {
                Text(StudentCopy.closed)
                    .font(StudentType.secondaryMedium)
                    .foregroundStyle(MLColor.inkSecondary)
                    .padding(.horizontal, MLSpacing.s20)
                    .frame(minHeight: MLSize.hit)
                    .background(Capsule().strokeBorder(MLColor.inkSecondary, style: StrokeStyle(lineWidth: 1.5, dash: [5, 4])))
            }
            .buttonStyle(.plain)
        } else if card.answer == .attending || card.answer == .skipping {
            Button(action: onOpen) {
                Text(StudentCopy.change)
                    .font(StudentType.secondaryMedium)
                    .foregroundStyle(MLColor.ink)
                    .padding(.horizontal, MLSpacing.s20)
                    .frame(minHeight: MLSize.hit)
                    .background(Capsule().strokeBorder(MLColor.ink, lineWidth: 1.5))
            }
            .buttonStyle(.plain)
        } else {
            Button(action: onOpen) {
                Text(StudentCopy.answer)
                    .font(StudentType.secondaryMedium)
                    .foregroundStyle(MLColor.onHero)
                    .padding(.horizontal, MLSpacing.s20)
                    .frame(minHeight: MLSize.hit)
                    .background(Capsule().fill(MLColor.ink))
            }
            .buttonStyle(.plain)
        }
    }
}

/// A rounded row with a half circle cut from each end, 22 pt below the row's centre (TicketStrip 2133:2374).
struct StudentTicketShape: Shape {
    func path(in rect: CGRect) -> Path {
        let row = Path(roundedRect: rect, cornerRadius: StudentMetric.rowRadius, style: .continuous)
        let radius: CGFloat = 10
        let y = rect.midY + 22
        var notches = Path()
        notches.addEllipse(in: CGRect(x: rect.minX - radius, y: y - radius, width: radius * 2, height: radius * 2))
        notches.addEllipse(in: CGRect(x: rect.maxX - radius, y: y - radius, width: radius * 2, height: radius * 2))
        return row.subtracting(notches)
    }
}

/// The dashed line between a ticket's text and its status.
struct StudentPerforation: Shape {
    func path(in rect: CGRect) -> Path {
        var path = Path()
        path.move(to: CGPoint(x: rect.midX, y: rect.minY))
        path.addLine(to: CGPoint(x: rect.midX, y: rect.maxY))
        return path
    }
}

/// The Special pass row: a notched ticket, a dashed perforation and the status.
struct StudentTicketRow: View {
    let pass: StudentPassRow
    let timeZone: TimeZone
    let onOpen: () -> Void

    private var when: String {
        StudentCopy.passWhen(StudentFormat.shortDay(pass.meal.startsAt, in: timeZone),
                             range: MLFormat.timeRange(pass.meal.startsAt, pass.meal.endsAt, in: timeZone))
    }

    private var status: String {
        switch pass.status {
        case .open: return StudentCopy.open
        case .used: return StudentCopy.used
        case .closed: return StudentCopy.closed
        }
    }

    @Environment(\.dynamicTypeSize) private var typeSize

    var body: some View {
        Button(action: onOpen) {
            HStack(spacing: 14) {
                if !typeSize.isAccessibilitySize {
                    ticketIcon
                }
                VStack(alignment: .leading, spacing: 2) {
                    Text(StudentCopy.specialPass)
                        .font(StudentType.bodySemibold)
                        .foregroundStyle(MLColor.ink)
                    Text(when)
                        .font(StudentType.footnote)
                        .foregroundStyle(MLColor.inkSecondary)
                    // At the accessibility sizes the stub's status moves under the text instead of splitting words.
                    if typeSize.isAccessibilitySize { statusLabel.padding(.top, MLSpacing.s4) }
                }
                .fixedSize(horizontal: false, vertical: true)
                Spacer(minLength: 0)
                if !typeSize.isAccessibilitySize {
                    statusLabel
                }
                // A native disclosure in place of the ticket's perforation (owner decision, 16 Nov 2026).
                Image(systemName: "chevron.right")
                    .font(.system(size: 13, weight: .semibold))
                    .foregroundStyle(.tertiary)
                    .accessibilityHidden(true)
            }
            .padding(.horizontal, MLSpacing.s20)
            .padding(.vertical, 14)
            .studentNativeCard()
            .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
        .accessibilityElement(children: .combine)
        .accessibilityLabel("\(StudentCopy.specialPass), \(when), \(status)")
    }

    private var ticketIcon: some View {
        Image("student-ticket")
            .resizable()
            .frame(width: 22, height: 22)
            .frame(width: MLSize.hit, height: MLSize.hit)
            .background(Circle().fill(MLColor.heroBackground))
            .accessibilityHidden(true)
    }

    private var statusLabel: some View {
        HStack(spacing: MLSpacing.s4) {
            if pass.status == .open {
                Circle().fill(MLColor.ink).frame(width: 12, height: 12)
            }
            Text(status)
                .font(StudentType.bodySemibold)
                .foregroundStyle(pass.status == .open ? MLColor.ink : MLColor.inkSecondary)
        }
    }
}

/// The one Crowd row (CrowdRow 2133:2427): Entered so far and Still expected for the meal at hand, with the recorded
/// entries of the last intervals. Counts only; a count that could not be read says so.
struct StudentCrowdRow: View {
    /// Nil when the counts could not be read.
    let crowd: StudentCrowd?
    let mess: String
    let timeZone: TimeZone

    private var detail: String? {
        guard let present = crowd?.enteredSoFar.value else { return nil }
        return MealsCopy.presentLine(present, expected: nil)
    }

    /// Quiet, Normal or Busy; the count itself when the level can't be worked out.
    private var headline: String {
        if let level = crowd?.level { return MealsCopy.level(level) }
        return crowd?.enteredSoFar.value.map(StudentCopy.enteredSoFar) ?? StudentCopy.crowdUnavailable
    }

    var body: some View {
        HStack(spacing: MLSpacing.s12) {
            VStack(alignment: .leading, spacing: 2) {
                Text(StudentCopy.crowdAt(mess))
                    .font(StudentType.footnote)
                    .foregroundStyle(MLColor.inkSecondary)
                Text(headline)
                    .font(StudentType.section)
                    .foregroundStyle(crowd?.enteredSoFar.value == nil ? MLColor.inkSecondary : MLColor.ink)
                    .lineLimit(1)
                    .minimumScaleFactor(0.8)
                if let detail {
                    Text(detail)
                        .font(StudentType.footnote)
                        .foregroundStyle(MLColor.inkSecondary)
                }
            }
            Spacer(minLength: 0)
            if let crowd, !crowd.intervals.isEmpty {
                bars(crowd)
            }
        }
        .padding(.horizontal, MLSpacing.s20)
        .padding(.vertical, MLSpacing.s16)
        .studentNativeCard()
        .accessibilityElement(children: .ignore)
        .accessibilityLabel([StudentCopy.crowdAt(mess), headline, detail].compactMap { $0 }.joined(separator: ", "))
    }

    /// The last seven intervals, scaled to the busiest of them.
    private func bars(_ crowd: StudentCrowd) -> some View {
        let shown = Array(crowd.intervals.suffix(7))
        let offset = crowd.intervals.count - shown.count
        let tallest = max(1, shown.map(\.entries).max() ?? 1)
        return HStack(alignment: .bottom, spacing: 5) {
            ForEach(Array(shown.enumerated()), id: \.offset) { index, interval in
                let isNow = index + offset == crowd.currentInterval
                RoundedRectangle(cornerRadius: 6.5, style: .continuous)
                    .fill(interval.entries == 0 ? MLColor.track : (isNow ? MLColor.lime : MLColor.ink))
                    .overlay {
                        if isNow && interval.entries > 0 {
                            RoundedRectangle(cornerRadius: 6.5, style: .continuous).strokeBorder(MLColor.limeOutline, lineWidth: 1.2)
                        }
                    }
                    .frame(width: 13, height: max(6, 46 * CGFloat(interval.entries) / CGFloat(tallest)))
            }
        }
        .frame(height: 48, alignment: .bottom)
    }
}

// Home · After a meal: the How was … card is `StudentHowWasCard` (StudentRatingsViews.swift).

/// The follow-up on the student's own feedback (Feedback row 2147:620).
struct StudentRecheckRow: View {
    let title: String
    let detail: String
    let onOpen: () -> Void

    var body: some View {
        Button(action: onOpen) {
            HStack(spacing: MLSpacing.s12) {
                Image(systemName: "arrow.clockwise")
                    .font(.system(size: 19))
                    .foregroundStyle(MLColor.inkSecondary)
                    .frame(width: 24, height: 24)
                    .accessibilityHidden(true)
                VStack(alignment: .leading, spacing: 2) {
                    Text(title)
                        .font(StudentType.bodySemibold)
                        .foregroundStyle(MLColor.ink)
                    Text(detail)
                        .font(StudentType.secondary)
                        .foregroundStyle(MLColor.inkSecondary)
                }
                .multilineTextAlignment(.leading)
                Spacer(minLength: 0)
            }
            .padding(.leading, MLSpacing.s4)
            .padding(.vertical, MLSpacing.s4)
        }
        .buttonStyle(.plain)
    }
}

/// Rate a dish, shown once the door recorded this student's entry for the meal. It never blocks Home: the student
/// can rate now, later from here, or from My feedback.
struct StudentRateDishCard: View {
    let slot: MealSlot
    let recordedAt: String
    let isRated: Bool
    let onOpen: () -> Void

    var body: some View {
        Button(action: onOpen) {
            HStack(spacing: MLSpacing.s12) {
                Image(systemName: isRated ? "checkmark" : "hand.thumbsup")
                    .font(.system(size: 17, weight: .semibold))
                    .foregroundStyle(MLColor.onLime)
                    .frame(width: MLSize.hit, height: MLSize.hit)
                    .background(Circle().fill(MLColor.lime).overlay(Circle().strokeBorder(MLColor.limeOutline, lineWidth: 1)))
                    .accessibilityHidden(true)
                VStack(alignment: .leading, spacing: 2) {
                    Text(StudentCopy.rateDish)
                        .font(StudentType.bodySemibold)
                        .foregroundStyle(MLColor.ink)
                    Text(isRated ? StudentCopy.ratedDish(slot) : StudentCopy.rateDishDetail(slot, at: recordedAt))
                        .font(StudentType.secondary)
                        .foregroundStyle(MLColor.inkSecondary)
                        .fixedSize(horizontal: false, vertical: true)
                }
                .multilineTextAlignment(.leading)
                Spacer(minLength: 0)
                Image(systemName: "chevron.right")
                    .font(.system(size: 14, weight: .semibold))
                    .foregroundStyle(MLColor.ink)
                    .accessibilityHidden(true)
            }
            .padding(MLSpacing.s16)
            .background(RoundedRectangle(cornerRadius: StudentMetric.rowRadius, style: .continuous).fill(MLColor.surface))
            .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
        .accessibilityElement(children: .combine)
        .accessibilityAddTraits(.isButton)
    }
}
