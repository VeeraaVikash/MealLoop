import SwiftUI

/// Builds the view model from the environment and reloads whenever the shared data changes.
struct KitchenHomeScreen: View {
    @Environment(AppEnvironment.self) private var environment
    let session: StaffSession

    var body: some View {
        KitchenHomeView(model: KitchenHomeViewModel(session: session, repositories: environment.repositories,
                                                    clock: environment.clock))
    }
}

/// Kitchen Home: K01 (before), K02 (during), K03 (shortage reported) and K05 / K15 (after the meal).
struct KitchenHomeView: View {
    @Environment(AppEnvironment.self) private var environment
    @Environment(AppRouter.self) private var router
    @State private var model: KitchenHomeViewModel

    init(model: KitchenHomeViewModel) {
        _model = State(initialValue: model)
    }

    var body: some View {
        ZStack {
            OrbitBackground()
            ScrollView {
                VStack(alignment: .leading, spacing: MLSpacing.s16) {
                    StaffHeader(initials: model.session.staffInitials) {
                        router.selectedStaffTab = .me
                    }
                    AsyncContentView(state: model.state,
                                     emptyTitle: "No meal today",
                                     emptyMessage: "The next meal will show here.",
                                     timeZone: model.session.mess.timeZone,
                                     retry: { await model.load() }) { content in
                        KitchenHomeBody(content: content, now: environment.clock.now()) { title in
                            router.staffHomePath.append(.notImplemented(title: title))
                        }
                    }
                }
                .padding(.horizontal, MLSpacing.margin)
                .padding(.bottom, 120)
            }
            .refreshable { await model.load() }
        }
        .task(id: environment.dataRevision) {
            await model.load()
        }
    }
}

/// The loaded screen. Pure layout: every value comes from `KitchenHomeContent`.
struct KitchenHomeBody: View {
    let content: KitchenHomeContent
    let now: Date
    /// Opens a "Not implemented" page for actions that are not built yet.
    let openNotImplemented: (String) -> Void

    private var timeZone: TimeZone { content.mess.timeZone }
    private var mealName: String { MLFormat.mealSlot(content.meal.slot) }

    var body: some View {
        VStack(alignment: .leading, spacing: MLSpacing.s16) {
            ScreenTitleBlock(title: mealName, subtitle: subtitle)
            switch content.phase {
            case .beforeMeal(let forecast):
                beforeMeal(forecast)
            case .duringMeal(let entered, let minutes, _):
                duringMeal(entered: entered, minutes: minutes)
            case .afterMeal(let finalEntries, _, let waste):
                afterMeal(finalEntries: finalEntries, waste: waste)
            }
        }
    }

    private var subtitle: String {
        if case .afterMeal(_, let closedAt?, _) = content.phase {
            return "\(content.mess.name) · \(KitchenCopy.ended(at: MLFormat.time(closedAt, in: timeZone)))"
        }
        return "\(content.mess.name) · \(MLFormat.timeRange(content.meal.startsAt, content.meal.endsAt, in: timeZone))"
    }

    // MARK: K01 · before the meal

    @ViewBuilder
    private func beforeMeal(_ forecast: Forecast) -> some View {
        HeroCard {
            HeroEyebrow(label: KitchenCopy.forecastEyebrow)
            HeroCount(value: forecast.diners, caption: KitchenCopy.forecastCaption)
                .padding(.top, MLSpacing.s12)
            if forecast.diners == nil {
                Text(KitchenCopy.forecastNotReady)
                    .font(MLType.body)
                    .foregroundStyle(MLColor.onHeroSecondary)
                    .padding(.top, MLSpacing.s4)
            }
        }
        VStack(spacing: 0) {
            Rectangle().fill(MLColor.border).frame(height: 1)
            QuietRow(title: "\(KitchenCopy.menuRow) \(mealName)") {
                openNotImplemented("\(KitchenCopy.menuRow) \(mealName)")
            }
            QuietRow(title: KitchenCopy.pastMealsRow) {
                openNotImplemented(KitchenCopy.pastMealsRow)
            }
        }
    }

    // MARK: K02 / K03 · during the meal

    @ViewBuilder
    private func duringMeal(entered: CountReading, minutes: Int) -> some View {
        MealProgressChip(text: KitchenCopy.mealInProgress(MLFormat.elapsed(minutes: minutes)))
        HeroCard {
            HeroEyebrow(label: KitchenCopy.liveEyebrow, showsDot: true,
                        time: entered.asOf.map { MLFormat.time($0, in: timeZone) })
            HeroCount(value: entered.value, caption: KitchenCopy.liveCaption)
                .padding(.top, MLSpacing.s12)
            LimeActionButton(title: KitchenCopy.reportShortage, systemImage: "exclamationmark.triangle") {
                openNotImplemented(KitchenCopy.reportShortage)
            }
            .padding(.top, MLSpacing.s20)
        }
        // No row at all when nothing has been reported.
        ForEach(content.visibleShortages) { shortage in
            shortageRow(shortage)
        }
        if content.hiddenShortageCount > 0 {
            QuietRow(title: KitchenCopy.seeAll, value: "\(content.hiddenShortageCount)") {
                openNotImplemented(KitchenCopy.seeAll)
            }
        }
        VStack(spacing: 0) {
            Rectangle().fill(MLColor.border).frame(height: 1)
            QuietRow(title: KitchenCopy.pastMealsRow) {
                openNotImplemented(KitchenCopy.pastMealsRow)
            }
        }
    }

    @ViewBuilder
    private func shortageRow(_ shortage: Shortage) -> some View {
        let title = KitchenCopy.shortageTitle(dish: shortage.dishName, level: MLFormat.shortageLevel(shortage.level))
        switch shortage.delivery {
        case .sent(let at):
            ShortageRow(title: title, detail: "Sent", detailTime: MLFormat.time(at, in: timeZone))
        case .seen(_, let by):
            ShortageRow(title: title, detail: KitchenCopy.seenBy(by))
        case .couldNotSend:
            ShortageRow(title: title, detail: KitchenCopy.couldNotSend, retryTitle: KitchenCopy.retry) {
                openNotImplemented(KitchenCopy.retry)
            }
        }
    }

    // MARK: K05 / K15 / K16 · after the meal

    @ViewBuilder
    private func afterMeal(finalEntries: CountReading, waste: WasteReportSummary) -> some View {
        HeroCard {
            HeroEyebrow(label: KitchenCopy.mealClosedEyebrow, showsDot: true)
            Text(KitchenCopy.hasEnded(mealName))
                .font(MLType.heroTitle)
                .foregroundStyle(MLColor.onHero)
                .padding(.top, MLSpacing.s8)
            Text(KitchenCopy.finalEntriesLabel)
                .font(MLType.body)
                .foregroundStyle(MLColor.onHeroSecondary)
                .padding(.top, MLSpacing.s16)
            if let value = finalEntries.value {
                Text("\(value)")
                    .font(MLType.heroNumber)
                    .foregroundStyle(MLColor.onHero)
            } else {
                // Missing is never shown as zero.
                Text(KitchenCopy.unavailable)
                    .font(MLType.heroTitle)
                    .foregroundStyle(MLColor.onHero)
            }
        }
        wasteCard(waste)
        VStack(spacing: 0) {
            Rectangle().fill(MLColor.border).frame(height: 1)
            QuietRow(title: KitchenCopy.pastMealsRow) {
                openNotImplemented(KitchenCopy.pastMealsRow)
            }
        }
    }

    private func wasteCard(_ waste: WasteReportSummary) -> some View {
        VStack(alignment: .leading, spacing: MLSpacing.s16) {
            HStack(alignment: .firstTextBaseline) {
                Text(KitchenCopy.wasteReportTitle)
                    .font(MLType.staffPrimary)
                    .foregroundStyle(MLColor.ink)
                Spacer()
                wasteStatus(waste)
            }
            switch waste.status {
            case .notStarted:
                InkActionButton(title: KitchenCopy.recordWaste) { openNotImplemented(KitchenCopy.recordWaste) }
            case .draft(let savedAt):
                HStack(spacing: MLSpacing.s4) {
                    Text(KitchenCopy.draftProgress(done: waste.completedFieldCount, total: waste.totalFieldCount))
                    Text(MLFormat.time(savedAt, in: timeZone)).font(MLType.monoBody)
                }
                .font(MLType.body)
                .foregroundStyle(MLColor.inkSecondary)
                InkActionButton(title: KitchenCopy.continueWaste) { openNotImplemented(KitchenCopy.recordWaste) }
            case .recorded:
                if let until = WasteReportPolicy.editableUntil(waste.status) {
                    Text(now < until ? KitchenCopy.editUntil(MLFormat.time(until, in: timeZone)) : KitchenCopy.editingClosed)
                        .font(MLType.body)
                        .foregroundStyle(MLColor.inkSecondary)
                }
                InkActionButton(title: KitchenCopy.viewReport) { openNotImplemented(KitchenCopy.viewReport) }
            }
        }
        .padding(MLSpacing.s20)
        .background(RoundedRectangle(cornerRadius: MLRadius.card, style: .continuous).fill(MLColor.surface))
    }

    @ViewBuilder
    private func wasteStatus(_ waste: WasteReportSummary) -> some View {
        switch waste.status {
        case .notStarted:
            StatusText(text: "Not started", dot: .empty)
        case .draft:
            StatusText(text: "Draft", dot: .empty)
        case .recorded(let savedAt):
            StatusText(text: "\(KitchenCopy.recorded()) \(MLFormat.time(savedAt, in: timeZone))", dot: .filled)
        }
    }
}
