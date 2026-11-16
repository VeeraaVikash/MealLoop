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
