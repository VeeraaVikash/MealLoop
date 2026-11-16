import Charts
import SwiftUI

// Crowd (student redesign, 15 Nov 2026): recorded entries per interval, Entered so far and Still expected. The earlier
// estimate frames (Busy, Packed, Best time, wait minutes) are retired: nothing here predicts.

/// Builds the view model from the environment.
struct StudentCrowdScreen: View {
    @Environment(AppEnvironment.self) private var environment
    let session: Session
    let onBack: () -> Void

    var body: some View {
        if let model = StudentCrowdViewModel(session: session, repositories: environment.repositories) {
            StudentCrowdView(model: model, onBack: onBack)
        } else {
            NotImplementedView(title: MLFormat.roleName(session.account.role))
        }
    }
}

/// Crowd · Main Mess (221:63246) and its Offline frame (221:65361), own mess only. Counts of recorded door entries:
/// an entry proves entry, not that food was served.
struct StudentCrowdView: View {
    @Environment(AppEnvironment.self) private var environment
    @State private var model: StudentCrowdViewModel
    let onBack: () -> Void

    init(model: StudentCrowdViewModel, onBack: @escaping () -> Void) {
        _model = State(initialValue: model)
        self.onBack = onBack
    }

    /// On `MLScreen`: the system back button and swipe-back pop the page; `onBack` stays for callers.
    var body: some View {
        MLScreen(MealsCopy.crowd, subtitle: model.context.mess.name) {
            VStack(alignment: .leading, spacing: MLSpacing.s16) {
                content
            }
        }
        .refreshable { await model.load() }
        .task(id: environment.dataRevision) {
            await model.load()
        }
    }

    @ViewBuilder
    private var content: some View {
        switch model.state {
        case .idle, .loading:
            ForEach([143, 249, 118], id: \.self) { height in
                RoundedRectangle(cornerRadius: StudentMetric.highlightRadius, style: .continuous)
                    .fill(MLColor.track.opacity(0.8))
                    .frame(height: CGFloat(height))
            }
        case .loaded(let crowd), .stale(let crowd, _):
            CrowdBody(crowd: crowd, isOffline: false, timeZone: model.timeZone)
        case .offline(let crowd?, _):
            StudentOfflineBanner(text: MealsCopy.crowdOffline(MLFormat.time(crowd.observedAt, in: model.timeZone)))
            CrowdBody(crowd: crowd, isOffline: true, timeZone: model.timeZone)
        case .offline(nil, _):
            StudentOfflineBanner(text: MealsCopy.crowdOfflineNothing)
        case .empty:
            MealsStateCard(symbol: "chart.bar", title: MealsCopy.crowdFailed, detail: "")
        case .failed(let failure):
            MealsStateCard(symbol: "exclamationmark.circle", title: MealsCopy.crowdFailed,
                           detail: failure.isNotImplemented ? failure.message : "")
        }
    }
}

/// Crowd in a native sheet from Home (owner decision, 16 Nov 2026): Quiet, Normal or Busy, who is present, and the
/// chart. Nothing more.
struct StudentCrowdSheet: View {
    @Environment(AppEnvironment.self) private var environment
    @State private var model: StudentCrowdViewModel
    let onClose: () -> Void

    init(model: StudentCrowdViewModel, onClose: @escaping () -> Void) {
        _model = State(initialValue: model)
        self.onClose = onClose
    }

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: MLSpacing.s16) {
                    content
                }
                .padding(.horizontal, MLSpacing.margin)
                .padding(.bottom, MLSpacing.s16)
            }
            .navigationTitle(MealsCopy.crowd)
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button(MealsCopy.close, action: onClose)
                }
            }
        }
        .presentationDetents([.medium, .large])
        .presentationDragIndicator(.visible)
        .task(id: environment.dataRevision) { await model.load() }
    }

    @ViewBuilder
    private var content: some View {
        switch model.state {
        case .loaded(let crowd), .stale(let crowd, _):
            summary(crowd)
            CrowdSheetChart(crowd: crowd, timeZone: model.timeZone)
        case .offline(let crowd?, _):
            StudentOfflineBanner(text: MealsCopy.crowdOffline(MLFormat.time(crowd.observedAt, in: model.timeZone)))
            summary(crowd)
            CrowdSheetChart(crowd: crowd, timeZone: model.timeZone)
        case .offline(nil, _):
            StudentOfflineBanner(text: MealsCopy.crowdOfflineNothing)
        case .failed, .empty:
            Text(MealsCopy.crowdFailed).font(StudentType.secondary).foregroundStyle(MLColor.inkSecondary)
        case .idle, .loading:
            ProgressView().frame(maxWidth: .infinity, minHeight: 200)
        }
    }

    private func summary(_ crowd: StudentCrowd) -> some View {
        VStack(alignment: .leading, spacing: 2) {
            Text(crowd.level.map(MealsCopy.level) ?? MealsCopy.crowd)
                .font(StudentType.section)
                .foregroundStyle(MLColor.ink)
            if let present = crowd.enteredSoFar.value {
                Text(MealsCopy.presentLine(present, expected: crowd.stillExpected.value) + " · " + model.context.mess.name)
                    .font(StudentType.secondary)
                    .foregroundStyle(MLColor.inkSecondary)
            }
        }
        .accessibilityElement(children: .combine)
    }
}

/// The Crowd sheet's chart, straight on the sheet (no card). Bars grow in when it opens; touching or dragging across
/// it picks an interval and shows its time and count. Built with Apple's Charts framework.
struct CrowdSheetChart: View {
    let crowd: StudentCrowd
    let timeZone: TimeZone
    @State private var selected: String?
    @State private var grown = false
    @Environment(\.accessibilityReduceMotion) private var reduceMotion

    private func label(_ interval: StudentCrowdInterval) -> String { StudentFormat.shortTime(interval.startsAt, in: timeZone) }

    private var picked: StudentCrowdInterval? {
        guard let selected else { return nil }
        return crowd.intervals.first { label($0) == selected }
    }

    var body: some View {
        VStack(alignment: .leading, spacing: MLSpacing.s8) {
            Text(picked.map { MealsCopy.barReadout(label($0), entries: $0.entries) } ?? MealsCopy.entriesEvery)
                .font(StudentType.secondaryMedium)
                .foregroundStyle(picked == nil ? MLColor.inkSecondary : MLColor.ink)
            Chart(Array(crowd.intervals.enumerated()), id: \.offset) { index, interval in
                BarMark(x: .value(MealsCopy.timeAxis, label(interval)),
                        y: .value(MealsCopy.entriesAxis, grown ? interval.entries : 0),
                        width: .ratio(0.7))
                    .cornerRadius(6)
                    .foregroundStyle(color(index, interval))
            }
            .chartXSelection(value: $selected)
            .chartYAxis(.hidden)
            .chartXAxis {
                AxisMarks { value in
                    if let index = value.index as Int?, index % 2 == 0 { AxisValueLabel() }
                }
            }
            .frame(height: 200)
            .accessibilityLabel(MealsCopy.entriesEvery)
        }
        .onAppear {
            if reduceMotion { grown = true } else { withAnimation(.snappy(duration: 0.6)) { grown = true } }
        }
        .sensoryFeedback(.selection, trigger: selected)
    }

    /// The touched interval is lime and the rest fade; untouched, the current interval is lime and a zero is quiet.
    private func color(_ index: Int, _ interval: StudentCrowdInterval) -> Color {
        if let picked { return picked.startsAt == interval.startsAt ? MLColor.lime : MLColor.ink.opacity(0.25) }
        if index == crowd.currentInterval { return MLColor.lime }
        return interval.entries == 0 ? MLColor.track : MLColor.ink
    }
}

struct CrowdBody: View {
    let crowd: StudentCrowd
    let isOffline: Bool
    let timeZone: TimeZone

    var body: some View {
        VStack(alignment: .leading, spacing: MLSpacing.s16) {
            hero
            CrowdChart(crowd: crowd, isOffline: isOffline, timeZone: timeZone)
            Text(MealsCopy.countsNote)
                .font(StudentType.footnote)
                .foregroundStyle(MLColor.inkSecondary)
                .fixedSize(horizontal: false, vertical: true)
        }
    }

    /// Entered so far, large, and Still expected beside it. A count that could not be read says so; it is never 0.
    private var hero: some View {
        VStack(alignment: .leading, spacing: MLSpacing.s12) {
            Text(Self.eyebrow(crowd, isOffline: isOffline, timeZone: timeZone).uppercased())
                .font(StudentType.eyebrow)
                .tracking(0.72)
                .foregroundStyle(MLColor.onHeroSecondary)
            HStack(alignment: .firstTextBaseline, spacing: MLSpacing.s24) {
                count(MealsCopy.enteredSoFar, crowd.enteredSoFar, large: true)
                count(MealsCopy.stillExpected, crowd.stillExpected, large: false)
            }
            if crowd.mealState == .notStarted && (crowd.enteredSoFar.value ?? 0) == 0 {
                Text(MealsCopy.notStartedCrowd(StudentFormat.shortTime(crowd.meal.startsAt, in: timeZone)))
                    .font(StudentType.secondary)
                    .foregroundStyle(MLColor.onHeroSecondary)
            }
        }
        .padding(MLSpacing.s20)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(RoundedRectangle(cornerRadius: StudentMetric.heroRadius, style: .continuous).fill(MLColor.heroBackground))
        .accessibilityElement(children: .combine)
    }

    private func count(_ label: String, _ reading: CountReading, large: Bool) -> some View {
        VStack(alignment: .leading, spacing: 2) {
            Text(reading.value.map(String.init) ?? MealsCopy.noCount)
                .font(.system(size: large ? 44 : 28, weight: .bold, design: .monospaced))
                .foregroundStyle(large ? MLColor.lime : MLColor.onHero)
                .lineLimit(1)
                .minimumScaleFactor(0.6)
            Text(reading.value == nil ? MealsCopy.notAvailable(label) : label)
                .font(StudentType.secondary)
                .foregroundStyle(MLColor.onHeroSecondary)
        }
    }

    static func eyebrow(_ crowd: StudentCrowd, isOffline: Bool, timeZone: TimeZone) -> String {
        MealsCopy.crowdUpdatedEyebrow(crowd.meal.slot, time: MLFormat.time(crowd.observedAt, in: timeZone))
    }
}

/// Recorded entries per 15-minute interval, from the start of service. The interval the clock is in is lime. The
/// heights are counts, scaled to the busiest interval so far; an empty interval is a short track, a real zero.
struct CrowdChart: View {
    let crowd: StudentCrowd
    let isOffline: Bool
    let timeZone: TimeZone

    private let barArea: CGFloat = 120

    var body: some View {
        VStack(alignment: .leading, spacing: MLSpacing.s16) {
            Text(MealsCopy.entriesEvery)
                .font(StudentType.secondary)
                .foregroundStyle(MLColor.inkSecondary)
            if crowd.intervals.isEmpty {
                Text(crowd.enteredSoFar.value == nil ? MealsCopy.crowdUnavailableDetail
                     : MealsCopy.notStartedChart(StudentFormat.shortTime(crowd.meal.startsAt, in: timeZone)))
                    .font(StudentType.secondary)
                    .foregroundStyle(MLColor.inkSecondary)
                    .fixedSize(horizontal: false, vertical: true)
            } else {
                let tallest = max(1, crowd.intervals.map(\.entries).max() ?? 1)
                HStack(alignment: .bottom, spacing: 4) {
                    ForEach(Array(crowd.intervals.enumerated()), id: \.offset) { index, interval in
                        bar(index, interval, tallest: tallest)
                            .frame(maxWidth: .infinity)
                    }
                }
                .frame(height: barArea, alignment: .bottom)
                .accessibilityElement(children: .ignore)
                .accessibilityLabel(MealsCopy.entriesEvery)
                .accessibilityValue(spokenBars)
                axis
            }
        }
        .padding(MLSpacing.s20)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(RoundedRectangle(cornerRadius: StudentMetric.highlightRadius, style: .continuous).fill(MLColor.surface))
    }

    private func bar(_ index: Int, _ interval: StudentCrowdInterval, tallest: Int) -> some View {
        let isNow = index == crowd.currentInterval
        return VStack(spacing: 4) {
            Text("\(interval.entries)")
                .font(.system(size: 11, weight: .medium, design: .monospaced))
                .foregroundStyle(MLColor.inkSecondary)
                .lineLimit(1)
                .minimumScaleFactor(0.6)
            RoundedRectangle(cornerRadius: 6, style: .continuous)
                .fill(interval.entries == 0 ? MLColor.track : (isNow ? MLColor.lime : (isOffline ? MLColor.inkSecondary : MLColor.ink)))
                .overlay {
                    if isNow && interval.entries > 0 {
                        RoundedRectangle(cornerRadius: 6, style: .continuous).strokeBorder(MLColor.limeOutline, lineWidth: 1.5)
                    }
                }
                .frame(maxWidth: 26)
                .frame(height: max(6, (barArea - 20) * CGFloat(interval.entries) / CGFloat(tallest)))
        }
    }

    private var axis: some View {
        let first = crowd.intervals.first?.startsAt
        let last = crowd.intervals.last?.startsAt
        return HStack {
            if let first { Text(MealsFormat.clock(first, in: timeZone)) }
            Spacer()
            if let last, last != first { Text(MealsFormat.clock(last, in: timeZone)) }
        }
        .font(.system(size: 13, weight: .medium, design: .monospaced))
        .foregroundStyle(MLColor.inkSecondary)
        .accessibilityHidden(true)
    }

    private var spokenBars: String {
        crowd.intervals.enumerated().map { index, interval in
            let time = StudentFormat.shortTime(interval.startsAt, in: timeZone)
            return MealsCopy.barLabel(time, entries: interval.entries, isNow: index == crowd.currentInterval)
        }
        .joined(separator: "; ")
    }
}
