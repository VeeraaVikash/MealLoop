import SwiftUI

/// Everything before sign-in. The stack root is the walkthrough on a phone that has not finished it, otherwise Sign in.
/// Owner decision, 16 Nov 2026: in Debug and Review, Get Started opens the sample student's Home directly (no Register);
/// the release build has no such shortcut and goes to Sign in.
struct EntryFlowView: View {
    @Environment(AppEnvironment.self) private var environment
    @Environment(AppRouter.self) private var router
    @Environment(DevicePreferences.self) private var preferences
    @Environment(SessionStore.self) private var sessionStore

    var body: some View {
        @Bindable var router = router
        NavigationStack(path: $router.entryPath) {
            Group {
                if preferences.hasSeenWalkthrough {
                    AccountSignInView(model: AccountSignInViewModel(auth: environment.repositories.auth))
                } else {
                    WalkthroughView(onFinish: finishWalkthrough)
                }
            }
            .navigationDestination(for: EntryRoute.self) { route in
                switch route {
                case .signIn:
                    AccountSignInView(model: AccountSignInViewModel(auth: environment.repositories.auth))
                }
            }
        }
    }

    private func finishWalkthrough() {
        Task {
            #if DEMO_DATA || REVIEW_DATA
            if let session = await environment.demoControls?.demoSession(for: .student) {
                sessionStore.signIn(session)
                preferences.markWalkthroughSeen()
                return
            }
            #endif
            preferences.markWalkthroughSeen()
        }
    }
}

// MARK: - Walkthrough

/// For Students → Attendance & Meals → Crowd Tracking → Credits & Incentives (SVG pack `screens/for-students.svg`,
/// `attendance-and-meals.svg`, `crowd-tracking.svg`, `credits-and-incentives.svg`). Next and Back move one page; swiping
/// does too. Get Started on the last page finishes it.
struct WalkthroughView: View {
    let onFinish: () -> Void
    @State private var page = 0
    @Environment(\.accessibilityReduceMotion) private var reduceMotion

    private var pages: [EntryCopy.Page] { EntryCopy.pages }
    private var isLast: Bool { page == pages.count - 1 }

    var body: some View {
        ZStack {
            OrbitBackground()
            VStack(spacing: 0) {
                topBar
                TabView(selection: $page) {
                    ForEach(pages) { item in
                        WalkthroughPageView(page: item).tag(item.id)
                    }
                }
                .tabViewStyle(.page(indexDisplayMode: .never))
                bottomBar
            }
        }
        .toolbar(.hidden, for: .navigationBar)
        .overlay(alignment: .topTrailing) { DemoEntryButton().padding(.trailing, MLSpacing.margin).padding(.top, MLSpacing.s8) }
    }

    /// The round Back control, top left. On the first page there is nothing to go back to, so it is not drawn and its
    /// space is kept, so the brand does not jump between pages.
    private var topBar: some View {
        HStack {
            BackButton { move(-1) }
                .accessibilityLabel(EntryCopy.back)
                .opacity(page > 0 ? 1 : 0)
                .disabled(page == 0)
                .accessibilityHidden(page == 0)
            Spacer()
        }
        .frame(minHeight: MLSize.hit)
        .padding(.horizontal, MLSpacing.margin)
        .padding(.top, MLSpacing.s8)
    }

    private var bottomBar: some View {
        HStack(spacing: MLSpacing.s16) {
            Spacer(minLength: 0)
            PageDots(count: pages.count, current: page)
            Spacer(minLength: MLSpacing.s8)
            Button {
                if isLast { onFinish() } else { move(1) }
            } label: {
                HStack(spacing: MLSpacing.s8) {
                    Text(isLast ? EntryCopy.getStarted : EntryCopy.next)
                    Image(systemName: isLast ? "checkmark" : "arrow.right")
                        .accessibilityHidden(true)
                }
                .font(MLType.staffPrimary)
                .foregroundStyle(MLColor.onHero)
                .padding(.horizontal, MLSpacing.s24)
                .frame(minHeight: MLSize.button)
                .background(Capsule().fill(MLColor.ink))
                .contentShape(Capsule())
            }
            .buttonStyle(.plain)
        }
        .padding(.horizontal, MLSpacing.margin)
        .padding(.bottom, MLSpacing.s16)
    }

    private func move(_ step: Int) {
        let target = min(max(page + step, 0), pages.count - 1)
        if reduceMotion { page = target } else { withAnimation(.snappy) { page = target } }
    }
}

/// One walkthrough page: the brand, the title, one line, the illustration and the page's card. The illustration takes
/// whatever height is left, so the page fills the screen without gaps; at accessibility text sizes the page scrolls.
private struct WalkthroughPageView: View {
    let page: EntryCopy.Page
    @Environment(\.dynamicTypeSize) private var typeSize

    var body: some View {
        if typeSize.isAccessibilitySize {
            ScrollView { content(fill: false) }
                .scrollBounceBehavior(.basedOnSize)
        } else {
            content(fill: true)
        }
    }

    private func content(fill: Bool) -> some View {
        VStack(spacing: MLSpacing.s12) {
            BrandLockup(stacked: true)
            VStack(spacing: MLSpacing.s8) {
                Text(page.title)
                    .mlFont(.largeTitle)
                    .foregroundStyle(MLColor.ink)
                    .multilineTextAlignment(.center)
                    .lineLimit(1)
                    .minimumScaleFactor(0.7)
                    .accessibilityAddTraits(.isHeader)
                if let body = page.body {
                    Text(body)
                        .mlFont(.staffBody)
                        .foregroundStyle(MLColor.inkSecondary)
                        .multilineTextAlignment(.center)
                        .fixedSize(horizontal: false, vertical: true)
                        .padding(.horizontal, MLSpacing.s24)
                }
            }
            .padding(.top, MLSpacing.s8)
            Image(page.art)
                .resizable()
                .scaledToFit()
                .frame(maxWidth: .infinity, minHeight: 90, maxHeight: fill ? .infinity : 220)
                .accessibilityLabel(page.artLabel)
            switch page.extra {
            case .none: EmptyView()
            case .cutoffs: WalkthroughCutoffCard()
            case .crowd: WalkthroughCrowdCard()
            case .credits: WalkthroughCreditsCard()
            }
        }
        .padding(.horizontal, MLSpacing.margin)
        .padding(.bottom, MLSpacing.s8)
        .frame(maxWidth: .infinity, maxHeight: fill ? .infinity : nil, alignment: .top)
    }
}

/// The white card the reference puts under an illustration.
private struct WalkthroughCard<Content: View>: View {
    @ViewBuilder let content: Content

    var body: some View {
        content
            .padding(MLSpacing.s16)
            .frame(maxWidth: .infinity)
            .background(RoundedRectangle(cornerRadius: MLRadius.card, style: .continuous).fill(MLColor.surface))
            .overlay(RoundedRectangle(cornerRadius: MLRadius.card, style: .continuous).stroke(MLColor.border, lineWidth: 1))
    }
}

/// The reference's time pill: a soft lime fill, no outline, one width for every row so the column lines up.
private struct WalkthroughLimeChip: View {
    let text: String
    var note: String?

    var body: some View {
        VStack(spacing: 0) {
            Text(text).mlFont(.eyebrow)
            if let note { Text(note).mlFont(.meta) }
        }
        .foregroundStyle(MLColor.ink)
        .multilineTextAlignment(.center)
        .padding(.horizontal, MLSpacing.s12)
        .padding(.vertical, MLSpacing.s4)
        .frame(width: 140)
        .frame(minHeight: 32)
        .background(Capsule().fill(MLColor.lime.opacity(0.75)))
    }
}

/// Attendance & Meals: Breakfast, Lunch and Dinner on a timeline, each with its answer cutoff (reference card).
private struct WalkthroughCutoffCard: View {
    var body: some View {
        WalkthroughCard {
            VStack(spacing: MLSpacing.s16) {
                ForEach(Array(EntryCopy.cutoffMeals.enumerated()), id: \.element) { index, slot in
                    row(slot, isLast: index == EntryCopy.cutoffMeals.count - 1)
                }
            }
        }
    }

    private func row(_ slot: MealSlot, isLast: Bool) -> some View {
        let chip = EntryCopy.cutoffChip(slot)
        return HStack(spacing: MLSpacing.s12) {
            Circle()
                .fill(MLColor.lime)
                .overlay(Circle().strokeBorder(MLColor.limeOutline, lineWidth: 1.5))
                .frame(width: 12, height: 12)
                .background(alignment: .top) {
                    if !isLast {
                        Rectangle().fill(MLColor.border).frame(width: 1.5, height: 48).offset(y: 12)
                    }
                }
            Image(systemName: icon(slot))
                .font(.system(size: 18, weight: .regular))
                .foregroundStyle(MLColor.ink)
                .frame(width: 26)
                .accessibilityHidden(true)
            Text(MLFormat.mealSlot(slot))
                .mlFont(.bodyEmphasis)
                .foregroundStyle(MLColor.ink)
            Spacer(minLength: MLSpacing.s8)
            WalkthroughLimeChip(text: chip.main, note: chip.note)
        }
        .accessibilityElement(children: .combine)
    }

    private func icon(_ slot: MealSlot) -> String {
        switch slot {
        case .breakfast: "cup.and.saucer"
        case .lunch: "fork.knife"
        case .snacks: "takeoutbag.and.cup.and.straw"
        case .dinner: "moon.stars"
        }
    }
}

/// Crowd Tracking: "Updates every 15 min" and "See current crowd count", side by side.
private struct WalkthroughCrowdCard: View {
    var body: some View {
        WalkthroughCard {
            HStack(spacing: 0) {
                half(icon: "clock", lead: EntryCopy.crowdUpdatesLead, value: EntryCopy.crowdUpdatesValue, boldValue: true)
                Rectangle().fill(MLColor.border).frame(width: 1, height: 56)
                half(icon: "person.3", lead: EntryCopy.crowdCountLead, value: EntryCopy.crowdCountValue, boldValue: false)
            }
        }
    }

    private func half(icon: String, lead: String, value: String, boldValue: Bool) -> some View {
        VStack(spacing: MLSpacing.s4) {
            Image(systemName: icon)
                .font(.system(size: 22, weight: .regular))
                .foregroundStyle(MLColor.ink)
                .accessibilityHidden(true)
            Text(lead).mlFont(.body).foregroundStyle(MLColor.ink)
            Text(value).mlFont(boldValue ? .bodyEmphasis : .body).foregroundStyle(MLColor.ink)
        }
        .multilineTextAlignment(.center)
        .frame(maxWidth: .infinity)
        .accessibilityElement(children: .combine)
    }
}

/// Credits & Incentives: the starting balance and all five rules from `StudentCreditRule` (owner table, 16 Nov 2026),
/// then what credits are for.
private struct WalkthroughCreditsCard: View {
    var body: some View {
        VStack(spacing: MLSpacing.s8) {
            WalkthroughCard {
                VStack(spacing: MLSpacing.s8) {
                    HStack {
                        Text(EntryCopy.startWith).mlFont(.body).foregroundStyle(MLColor.inkSecondary)
                        Spacer(minLength: MLSpacing.s8)
                        Text(EntryCopy.startingCredits(StudentCreditRule.startingBalance))
                            .mlFont(.bodyEmphasis)
                            .foregroundStyle(MLColor.ink)
                    }
                    .accessibilityElement(children: .combine)
                    Rectangle().fill(MLColor.border).frame(height: 1)
                    ForEach(EntryCopy.creditRules, id: \.title) { rule in
                        row(rule.title, points: rule.points)
                    }
                }
            }
            WalkthroughCard {
                HStack(spacing: MLSpacing.s12) {
                    Image(systemName: "gift")
                        .font(.system(size: 18, weight: .regular))
                        .foregroundStyle(MLColor.ink)
                        .frame(width: 36, height: 36)
                        .background(Circle().fill(MLColor.lime.opacity(0.35)))
                        .accessibilityHidden(true)
                    (Text(EntryCopy.useCreditsLead + " ") + Text(EntryCopy.useCreditsValue).bold())
                        .mlFont(.body)
                        .foregroundStyle(MLColor.ink)
                    Spacer(minLength: 0)
                }
                .accessibilityElement(children: .combine)
            }
        }
    }

    /// A gain is lime with an ink outline; a loss is a soft tint of the danger colour. Both carry a sign and a symbol,
    /// so colour is never the only signal.
    private func row(_ title: String, points: Int) -> some View {
        let earns = points > 0
        let fill = earns ? MLColor.lime.opacity(0.75) : MLColor.danger.opacity(0.22)
        return HStack(spacing: MLSpacing.s12) {
            Image(systemName: earns ? "checkmark" : "xmark")
                .font(.system(size: 12, weight: .bold))
                .foregroundStyle(MLColor.ink)
                .frame(width: 26, height: 26)
                .background(Circle().fill(fill))
                .accessibilityHidden(true)
            Text(title)
                .mlFont(.bodyEmphasis)
                .foregroundStyle(MLColor.ink)
            Spacer(minLength: MLSpacing.s8)
            Text(EntryCopy.points(points))
                .mlFont(.eyebrow)
                .foregroundStyle(MLColor.ink)
                .frame(width: 72, height: 28)
                .background(Capsule().fill(fill))
        }
        .accessibilityElement(children: .combine)
    }
}

/// The page indicator: the current page is a lime dot with an ink outline, the others quiet; never colour alone.
struct PageDots: View {
    let count: Int
    let current: Int

    var body: some View {
        HStack(spacing: MLSpacing.s8) {
            ForEach(0..<count, id: \.self) { index in
                let isCurrent = index == current
                Circle()
                    .fill(isCurrent ? MLColor.lime : MLColor.border)
                    .overlay { if isCurrent { Circle().strokeBorder(MLColor.limeOutline, lineWidth: 1.5) } }
                    .frame(width: isCurrent ? 12 : 8, height: isCurrent ? 12 : 8)
            }
        }
        .accessibilityElement(children: .ignore)
        .accessibilityLabel(EntryCopy.pageValue(current, of: count))
    }
}

/// The mark and the wordmark, centred: side by side on Sign in, stacked on the walkthrough (SVG pack screens).
private struct BrandLockup: View {
    var stacked = false

    var body: some View {
        let layout = stacked ? AnyLayout(VStackLayout(spacing: MLSpacing.s4)) : AnyLayout(HStackLayout(spacing: MLSpacing.s8))
        layout {
            OrbitMarkView(size: stacked ? 48 : MLSize.avatar)
            Text(EntryCopy.wordmark)
                .mlFont(.heroTitle)
                .foregroundStyle(MLColor.ink)
                .lineLimit(1)
                .minimumScaleFactor(0.6)
        }
        .accessibilityElement(children: .combine)
        .accessibilityLabel(EntryCopy.wordmark)
    }
}

/// "By continuing, you agree to the / Terms and Privacy Policy", drawn on two lines, the second underlined.
struct EntryTermsText: View {
    var body: some View {
        VStack(spacing: MLSpacing.s4) {
            Text(EntryCopy.termsLead)
            Text(EntryCopy.termsLink).underline()
        }
        .mlFont(.meta)
        .foregroundStyle(MLColor.inkSecondary)
        .multilineTextAlignment(.center)
        .fixedSize(horizontal: false, vertical: true)
        .accessibilityElement(children: .combine)
    }
}

// MARK: - Sign in

/// The one Sign in (Sign In reference, 15 Nov 2026): the brand, the title, email and password with "Forgot password?",
/// Sign in, then Register. Every account uses it; the account decides where it lands.
struct AccountSignInView: View {
    @Environment(AppRouter.self) private var router
    @Environment(SessionStore.self) private var sessionStore
    @State private var model: AccountSignInViewModel
    @State private var isPasswordVisible = false
    @FocusState private var focus: Field?

    enum Field: Hashable { case email, password }

    init(model: AccountSignInViewModel) {
        _model = State(initialValue: model)
    }

    var body: some View {
        MLScreen(EntryCopy.signInTitle, subtitle: EntryCopy.signInSubtitle, placement: .upperMiddle) {
            VStack(spacing: MLSpacing.s4) {
                BrandLockup()
                Text(EntryCopy.tagline)
                    .mlFont(.secondary)
                    .foregroundStyle(MLColor.inkSecondary)
            }
            .frame(maxWidth: .infinity)
            .padding(.bottom, MLSpacing.s8)
        } trailing: {
            EmptyView()
        } content: {
            form
        } bottom: {
            InkActionButton(title: EntryCopy.signIn, isLoading: model.isSubmitting, action: submit)
                .disabled(!model.canSubmit && !model.isSubmitting)
            EntryTermsText()
        }
        // Debug and Review only; kept clear of the centred brand.
        .overlay(alignment: .topLeading) { DemoEntryButton().padding(.leading, MLSpacing.margin) }
    }

    private var form: some View {
        @Bindable var model = model
        return VStack(alignment: .leading, spacing: MLSpacing.s16) {
            EntryField(label: EntryCopy.emailLabel) {
                TextField(EntryCopy.emailLabel, text: $model.email, prompt: nil)
                    .keyboardType(.emailAddress)
                    .textContentType(.username)
                    .textInputAutocapitalization(.never)
                    .autocorrectionDisabled()
                    .focused($focus, equals: .email)
                    .submitLabel(.next)
                    .onSubmit { focus = .password }
            }
            .mlKeepsVisible(id: Field.email, when: focus == .email)
            EntryField(label: EntryCopy.passwordLabel) {
                PasswordInput(title: EntryCopy.passwordLabel, text: $model.password, isVisible: $isPasswordVisible,
                              contentType: .password)
                    .focused($focus, equals: .password)
                    .submitLabel(.go)
                    .onSubmit(submit)
            }
            .mlKeepsVisible(id: Field.password, when: focus == .password)
            HStack {
                Spacer()
                Button { model.showForgotPasswordMessage() } label: {
                    Text(EntryCopy.forgotPassword)
                        .mlFont(.body)
                        .underline()
                        .foregroundStyle(MLColor.ink)
                        .frame(minHeight: MLSize.hit)
                        .contentShape(Rectangle())
                }
                .buttonStyle(.plain)
            }
            if model.showsForgotPasswordMessage {
                Text(EntryCopy.forgotPasswordMessage)
                    .mlFont(.body)
                    .foregroundStyle(MLColor.inkSecondary)
                    .fixedSize(horizontal: false, vertical: true)
            }
            if let message = model.errorMessage {
                InlineErrorText(message: message)
            }
        }
        .mlAnimation(.snappy, value: model.errorMessage)
        .mlHaptic(.warning, trigger: model.errorMessage) { _, new in new != nil }
    }

    private func submit() {
        guard model.canSubmit else { return }
        focus = nil
        Task {
            if let session = await model.submit() {
                router.reset()
                sessionStore.signIn(session)
            }
        }
    }
}

// MARK: - Shared form parts

/// A labelled field on a white surface, with an optional error line under it (icon and words, never colour alone).
struct EntryField<Field: View>: View {
    let label: String
    var error: String?
    @ViewBuilder let field: () -> Field

    var body: some View {
        VStack(alignment: .leading, spacing: MLSpacing.s4) {
            Text(label)
                .mlFont(.bodyEmphasis)
                .foregroundStyle(MLColor.ink)
                .accessibilityHidden(true)
            field()
                .mlFont(.staffBody)
                .foregroundStyle(MLColor.ink)
                .padding(.horizontal, MLSpacing.s16)
                .frame(minHeight: MLSize.button)
                .background(RoundedRectangle(cornerRadius: MLRadius.input, style: .continuous).fill(MLColor.surface))
                .overlay(RoundedRectangle(cornerRadius: MLRadius.input, style: .continuous)
                    .stroke(error == nil ? MLColor.border : MLColor.danger, lineWidth: error == nil ? 1 : 1.5))
                .accessibilityLabel(label)
                .accessibilityHint(error ?? "")
            if let error {
                InlineErrorText(message: error)
            }
        }
    }
}

/// A password field with Show and Hide.
private struct PasswordInput: View {
    let title: String
    @Binding var text: String
    @Binding var isVisible: Bool
    let contentType: UITextContentType

    var body: some View {
        HStack(spacing: MLSpacing.s8) {
            Group {
                if isVisible {
                    TextField(title, text: $text, prompt: nil)
                } else {
                    SecureField(title, text: $text, prompt: nil)
                }
            }
            .textContentType(contentType)
            .textInputAutocapitalization(.never)
            .autocorrectionDisabled()
            Button { isVisible.toggle() } label: {
                Image(systemName: isVisible ? "eye" : "eye.slash")
                    .foregroundStyle(MLColor.inkSecondary)
                    .frame(width: MLSize.hit, height: MLSize.hit)
                    .contentShape(Rectangle())
            }
            .buttonStyle(.plain)
            .accessibilityLabel(isVisible ? EntryCopy.hidePassword : EntryCopy.showPassword)
        }
    }
}

/// An error under a form. It has an icon as well as colour, so it does not rely on colour alone.
struct InlineErrorText: View {
    let message: String

    var body: some View {
        Label(message, systemImage: "exclamationmark.circle")
            .mlFont(.body)
            .foregroundStyle(MLColor.danger)
            .frame(maxWidth: .infinity, alignment: .leading)
            .fixedSize(horizontal: false, vertical: true)
    }
}

/// A failed request that can be repeated: what happened, and Try again. Nothing was saved.
struct RetryCard: View {
    let title: String
    let message: String
    let onRetry: () -> Void

    var body: some View {
        VStack(alignment: .leading, spacing: MLSpacing.s8) {
            Label(title, systemImage: "exclamationmark.triangle")
                .mlFont(.bodyEmphasis)
                .foregroundStyle(MLColor.ink)
            Text(message)
                .mlFont(.body)
                .foregroundStyle(MLColor.inkSecondary)
                .fixedSize(horizontal: false, vertical: true)
            Button(EntryCopy.tryAgain, action: onRetry)
                .font(MLType.bodyEmphasis)
                .foregroundStyle(MLColor.ink)
                .frame(minHeight: MLSize.hit)
        }
        .padding(MLSpacing.s16)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(RoundedRectangle(cornerRadius: MLRadius.compact, style: .continuous).fill(MLColor.danger.opacity(0.09)))
        .overlay(RoundedRectangle(cornerRadius: MLRadius.compact, style: .continuous).stroke(MLColor.danger, lineWidth: 1))
    }
}
