import SwiftUI

/// Everything before sign-in. The stack root is the walkthrough on a phone that has not finished it, otherwise Sign in;
/// Register is pushed from Sign in, so the system back button and swipe-back work.
struct EntryFlowView: View {
    @Environment(AppEnvironment.self) private var environment
    @Environment(AppRouter.self) private var router
    @Environment(DevicePreferences.self) private var preferences

    var body: some View {
        @Bindable var router = router
        NavigationStack(path: $router.entryPath) {
            Group {
                if preferences.hasSeenWalkthrough {
                    AccountSignInView(model: AccountSignInViewModel(auth: environment.repositories.auth))
                } else {
                    WalkthroughView { preferences.markWalkthroughSeen() }
                }
            }
            .navigationDestination(for: EntryRoute.self) { route in
                switch route {
                case .signIn:
                    AccountSignInView(model: AccountSignInViewModel(auth: environment.repositories.auth))
                case .register:
                    StudentRegisterView(model: StudentRegisterViewModel(registration: environment.repositories.registration))
                }
            }
        }
    }
}

// MARK: - Walkthrough

/// For Students → Attendance & Meals → Crowd Tracking → Credits & Incentives (walkthrough reference, 15 Nov 2026).
/// Next and Back move one page; swiping does too. "Sign in" at the top skips straight to Sign in, and Get started on the
/// last page finishes it. Either way the phone remembers, so a returning student opens on Sign in.
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
        .overlay(alignment: .top) { DemoEntryButton().padding(.top, MLSpacing.s4) }
    }

    private var topBar: some View {
        HStack {
            if page > 0 {
                BackButton { move(-1) }
                    .accessibilityLabel(EntryCopy.back)
            }
            Spacer(minLength: MLSpacing.s8)
            Button(action: onFinish) {
                Text(EntryCopy.skipToSignIn)
                    .mlFont(.bodyEmphasis)
                    .foregroundStyle(MLColor.ink)
                    .underline()
                    .frame(minWidth: MLSize.hit, minHeight: MLSize.hit)
                    .contentShape(Rectangle())
            }
            .buttonStyle(.plain)
            .accessibilityLabel(EntryCopy.skipToSignInLabel)
        }
        .frame(minHeight: MLSize.hit)
        .padding(.horizontal, MLSpacing.margin)
        .padding(.top, MLSpacing.s8)
    }

    private var bottomBar: some View {
        HStack(spacing: MLSpacing.s16) {
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

/// One walkthrough page: the brand, the title, one line and the illustration. Scrolls at large text sizes and on a
/// small iPhone, so nothing is cut off.
private struct WalkthroughPageView: View {
    let page: EntryCopy.Page

    var body: some View {
        ScrollView {
            VStack(spacing: MLSpacing.s16) {
                BrandLockup()
                Text(page.title)
                    .mlFont(.largeTitle)
                    .foregroundStyle(MLColor.ink)
                    .multilineTextAlignment(.center)
                    .accessibilityAddTraits(.isHeader)
                Text(page.body)
                    .mlFont(.staffBody)
                    .foregroundStyle(MLColor.inkSecondary)
                    .multilineTextAlignment(.center)
                    .fixedSize(horizontal: false, vertical: true)
                Image(page.art)
                    .resizable()
                    .scaledToFit()
                    .frame(maxWidth: 300, maxHeight: 280)
                    .padding(.top, MLSpacing.s8)
                    .accessibilityLabel(page.artLabel)
            }
            .padding(.horizontal, MLSpacing.margin)
            .padding(.vertical, MLSpacing.s16)
            .frame(maxWidth: .infinity)
        }
        .scrollBounceBehavior(.basedOnSize)
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

/// The mark and the wordmark, centred.
private struct BrandLockup: View {
    var body: some View {
        HStack(spacing: MLSpacing.s8) {
            OrbitMarkView(size: MLSize.avatar)
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
            HStack(spacing: MLSpacing.s12) {
                Rectangle().fill(MLColor.border).frame(height: 1)
                Text(EntryCopy.noAccount)
                    .mlFont(.meta)
                    .foregroundStyle(MLColor.inkSecondary)
                    .fixedSize()
                Rectangle().fill(MLColor.border).frame(height: 1)
            }
            .accessibilityElement(children: .combine)
            OutlineActionButton(title: EntryCopy.register) { router.entryPath.append(.register) }
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

// MARK: - Register

/// Register as Student (Register reference, 15 Nov 2026): email, registration number, password, optional hostel and
/// phone, then the directory lookup and "Is this you?". The Institution tab and the role picker of the reference are
/// out of scope: staff accounts are created by an administrator.
struct StudentRegisterView: View {
    @Environment(AppRouter.self) private var router
    @Environment(SessionStore.self) private var sessionStore
    @State private var model: StudentRegisterViewModel
    @State private var isPasswordVisible = false
    @FocusState private var focus: Field?

    enum Field: Hashable { case email, number, password, hostel, phone }

    init(model: StudentRegisterViewModel) {
        _model = State(initialValue: model)
    }

    var body: some View {
        @Bindable var model = model
        MLScreen(EntryCopy.registerTitle, subtitle: EntryCopy.registerSubtitle) {
            fields
        } bottom: {
            if model.phase == .lookingUp {
                Text(EntryCopy.checking)
                    .mlFont(.secondary)
                    .foregroundStyle(MLColor.inkSecondary)
            }
            InkActionButton(title: EntryCopy.continueAction, isLoading: model.isWorking) {
                focus = nil
                Task { await model.continueTapped() }
            }
        }
        .mlSheet(isPresented: Binding(get: { model.confirmation != nil || model.phase == .creating },
                                      set: { if !$0 { model.cancelConfirmation() } }),
                 isWorking: model.phase == .creating) {
            if let record = model.confirmation ?? lastRecord {
                ConfirmIdentitySheet(record: record, isCreating: model.phase == .creating,
                                     onConfirm: confirm, onNotMe: { model.cancelConfirmation() })
            }
        }
        .onChange(of: model.confirmation) { _, record in if let record { lastRecord = record } }
    }

    /// Keeps the sheet's content while "Creating" runs, after the phase has left `.confirming`.
    @State private var lastRecord: StudentDirectoryRecord?

    private var fields: some View {
        @Bindable var model = model
        return VStack(alignment: .leading, spacing: MLSpacing.s16) {
            Image("entry-student-id-cards")
                .resizable()
                .scaledToFit()
                .frame(maxHeight: 120)
                .frame(maxWidth: .infinity)
                .accessibilityHidden(true)
            EntryField(label: EntryCopy.emailLabel,
                       error: model.problem(.email) ? EntryCopy.emailProblem : emailOutcome) {
                TextField(EntryCopy.emailLabel, text: $model.form.email, prompt: nil)
                    .keyboardType(.emailAddress)
                    .textContentType(.username)
                    .textInputAutocapitalization(.never)
                    .autocorrectionDisabled()
                    .focused($focus, equals: .email)
                    .submitLabel(.next)
                    .onSubmit { focus = .number }
            }
            if model.outcome == .alreadyRegistered {
                Button(EntryCopy.signInInstead) { router.entryPath = [.signIn] }
                    .font(MLType.bodyEmphasis)
                    .foregroundStyle(MLColor.ink)
                    .frame(minHeight: MLSize.hit)
            }
            EntryField(label: EntryCopy.registrationNumber,
                       error: model.problem(.registrationNumber) ? EntryCopy.registrationNumberProblem
                           : (model.outcome == .registrationNumberMismatch ? EntryCopy.mismatch : nil)) {
                TextField(EntryCopy.registrationNumber, text: $model.form.registrationNumber, prompt: nil)
                    .textInputAutocapitalization(.characters)
                    .autocorrectionDisabled()
                    .focused($focus, equals: .number)
                    .submitLabel(.next)
                    .onSubmit { focus = .password }
            }
            EntryField(label: EntryCopy.passwordLabel,
                       error: model.problem(.password) ? EntryCopy.passwordProblem(StudentRegistrationPolicy.minimumPasswordLength) : nil) {
                PasswordInput(title: EntryCopy.passwordLabel, text: $model.form.password, isVisible: $isPasswordVisible,
                              contentType: .newPassword)
                    .focused($focus, equals: .password)
                    .submitLabel(.next)
                    .onSubmit { focus = .hostel }
            }
            EntryField(label: EntryCopy.hostelOptional) {
                TextField(EntryCopy.hostelOptional, text: $model.form.hostel, prompt: nil)
                    .focused($focus, equals: .hostel)
                    .submitLabel(.next)
                    .onSubmit { focus = .phone }
            }
            EntryField(label: EntryCopy.phone, error: model.problem(.phone) ? EntryCopy.phoneProblem : nil) {
                TextField(EntryCopy.phone, text: $model.form.phone, prompt: nil)
                    .keyboardType(.phonePad)
                    .textContentType(.telephoneNumber)
                    .focused($focus, equals: .phone)
            }
            if case .lookupFailed(let message) = model.outcome {
                RetryCard(title: EntryCopy.lookupFailedTitle, message: message) {
                    Task { await model.continueTapped() }
                }
            }
            if case .creationFailed(let message) = model.outcome {
                InlineErrorText(message: message)
            }
        }
        .disabled(model.phase == .creating)
        .mlAnimation(.snappy, value: model.outcome)
    }

    private var emailOutcome: String? {
        switch model.outcome {
        case .emailNotFound: EntryCopy.emailNotFound
        case .alreadyRegistered: EntryCopy.alreadyRegistered
        default: nil
        }
    }

    private func confirm() {
        Task {
            if let session = await model.confirm() {
                router.reset()
                sessionStore.signIn(session)
            }
        }
    }
}

/// "Is this you?": only what the student needs to recognise the record, with the number masked.
private struct ConfirmIdentitySheet: View {
    let record: StudentDirectoryRecord
    let isCreating: Bool
    let onConfirm: () -> Void
    let onNotMe: () -> Void

    var body: some View {
        VStack(alignment: .leading, spacing: MLSpacing.s16) {
            SheetHeader(title: EntryCopy.isThisYou, subtitle: EntryCopy.isThisYouDetail, onClose: isCreating ? nil : onNotMe)
            VStack(spacing: 0) {
                row(EntryCopy.name, record.name)
                Divider()
                row(EntryCopy.registrationNumber, record.maskedRegistrationNumber, mono: true)
                Divider()
                row(EntryCopy.emailLabel, record.email)
                Divider()
                row(EntryCopy.mess, record.messName)
                if let hostel = record.hostelName {
                    Divider()
                    row(EntryCopy.hostel, hostel)
                }
            }
            .padding(.horizontal, MLSpacing.s16)
            .background(RoundedRectangle(cornerRadius: MLRadius.compact, style: .continuous).fill(MLColor.fillQuiet))
            InkActionButton(title: EntryCopy.confirm, isLoading: isCreating, action: onConfirm)
            OutlineActionButton(title: EntryCopy.notMe, action: onNotMe)
                .disabled(isCreating)
        }
    }

    private func row(_ label: String, _ value: String, mono: Bool = false) -> some View {
        HStack(alignment: .firstTextBaseline) {
            Text(label)
                .mlFont(.body)
                .foregroundStyle(MLColor.inkSecondary)
            Spacer(minLength: MLSpacing.s8)
            Text(value)
                .font(mono ? MLType.monoBody : MLType.bodyEmphasis)
                .foregroundStyle(MLColor.ink)
                .multilineTextAlignment(.trailing)
        }
        .frame(minHeight: MLSize.hit)
        .accessibilityElement(children: .combine)
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
