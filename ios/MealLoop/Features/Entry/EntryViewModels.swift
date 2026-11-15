import Foundation
import Observation

/// The one Sign in for every account. The disabled, loading and error states of the form live here.
@MainActor
@Observable
final class AccountSignInViewModel {
    var email = ""
    var password = ""
    private(set) var isSubmitting = false
    private(set) var errorMessage: String?
    private(set) var showsForgotPasswordMessage = false
    private let auth: any AuthRepository

    init(auth: any AuthRepository) {
        self.auth = auth
    }

    var canSubmit: Bool {
        !isSubmitting && !email.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty && !password.isEmpty
    }

    func showForgotPasswordMessage() {
        showsForgotPasswordMessage = true
    }

    /// Returns the session when the account is accepted. The role comes from that account only. A second tap during a
    /// request does nothing; a failure keeps the typed email so the person can correct the password and try again.
    func submit() async -> Session? {
        guard canSubmit else { return nil }
        isSubmitting = true
        errorMessage = nil
        defer { isSubmitting = false }
        do {
            return try await auth.signIn(email: email, password: password)
        } catch RepositoryError.invalidCredentials {
            errorMessage = EntryCopy.wrongCredentials
        } catch {
            errorMessage = LoadFailure(error).message
        }
        return nil
    }
}

/// Student Register: the form, the directory lookup, "Is this you?" and account creation.
/// The match rule is `StudentRegistrationPolicy`; this model only holds screen state.
@MainActor
@Observable
final class StudentRegisterViewModel {
    enum Phase: Equatable {
        case editing
        case lookingUp
        /// "Is this you?" is open for this record.
        case confirming(StudentDirectoryRecord)
        case creating
    }

    /// What the last lookup said, shown on the form. Cleared when the field it is about changes.
    enum Outcome: Equatable {
        case emailNotFound
        case registrationNumberMismatch
        case alreadyRegistered
        case lookupFailed(String)
        case creationFailed(String)
    }

    var form = StudentRegistrationForm() {
        didSet {
            // A changed email or number makes the earlier answer stale; other fields keep it.
            if oldValue.identity != form.identity { outcome = nil }
        }
    }
    private(set) var phase: Phase = .editing
    private(set) var outcome: Outcome?
    /// Field problems, shown only after the first Continue so an empty form is not all red.
    private(set) var problems: [StudentRegistrationPolicy.Problem] = []
    private var hasTriedContinue = false
    private let registration: any StudentRegistrationRepository

    init(registration: any StudentRegistrationRepository) {
        self.registration = registration
    }

    var isWorking: Bool { phase == .lookingUp || phase == .creating }

    var confirmation: StudentDirectoryRecord? {
        if case .confirming(let record) = phase { return record }
        return nil
    }

    func problem(_ field: StudentRegistrationPolicy.Problem) -> Bool {
        hasTriedContinue && StudentRegistrationPolicy.problems(in: form).contains(field)
    }

    /// Validates, then asks the directory. A second tap while it runs does nothing. If the email or number changes
    /// while the lookup is in flight, its answer is dropped: it was about other values.
    func continueTapped() async {
        guard !isWorking else { return }
        hasTriedContinue = true
        problems = StudentRegistrationPolicy.problems(in: form)
        guard problems.isEmpty else { return }
        let query = form.identity
        phase = .lookingUp
        outcome = nil
        do {
            let record = try await registration.directoryRecord(forEmail: query.email)
            guard form.identity == query else { phase = .editing; return }
            switch StudentRegistrationPolicy.match(record, to: query) {
            case .confirm(let record): phase = .confirming(record); return
            case .emailNotFound: outcome = .emailNotFound
            case .registrationNumberMismatch: outcome = .registrationNumberMismatch
            case .alreadyRegistered: outcome = .alreadyRegistered
            }
        } catch {
            if form.identity == query { outcome = .lookupFailed(LoadFailure(error).message) }
        }
        phase = .editing
    }

    /// "No, that's not me", or the sheet swiped away: back to the form with every value kept.
    func cancelConfirmation() {
        guard case .confirming = phase else { return }
        phase = .editing
    }

    /// Creates the account for the confirmed record. Returns the session; a failure keeps the form as typed.
    func confirm() async -> Session? {
        guard case .confirming(let record) = phase, form.identity.email == record.email.lowercased() else { return nil }
        phase = .creating
        let hostel = form.hostel.trimmingCharacters(in: .whitespacesAndNewlines)
        let request = StudentRegistrationRequest(email: form.identity.email, registrationNumber: form.identity.registrationNumber,
                                                 password: form.password, hostel: hostel.isEmpty ? nil : hostel,
                                                 phone: form.phone.filter(\.isNumber))
        do {
            let session = try await registration.registerStudent(request)
            phase = .editing
            return session
        } catch {
            phase = .editing
            outcome = .creationFailed(LoadFailure(error).message)
            return nil
        }
    }
}
