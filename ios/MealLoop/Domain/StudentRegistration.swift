import Foundation

// Student Register: the form, the directory record and the "Is this you?" match. The directory provider and account
// creation are not integrated with any real SRM system (docs/OPEN_DECISIONS.md, REG-1 and REG-2): Debug and Review
// answer from seeded records, Release from `RemoteAPI`, which has no backend yet.

/// What the student types on Register. The password stays in memory only and is never logged or shown.
struct StudentRegistrationForm: Sendable, Hashable {
    var email = ""
    var registrationNumber = ""
    var password = ""
    var hostel = ""
    var phone = ""

    /// The values the directory is asked about. A lookup answer is used only while these are unchanged.
    var identity: StudentIdentityQuery {
        StudentIdentityQuery(email: StudentRegistrationPolicy.normalisedEmail(email),
                             registrationNumber: StudentRegistrationPolicy.normalisedRegistrationNumber(registrationNumber))
    }
}

/// The email and registration number a lookup was made for.
struct StudentIdentityQuery: Sendable, Hashable {
    let email: String
    let registrationNumber: String
}

/// A student as the directory knows them. Only what "Is this you?" needs: no date of birth, address or guardian.
struct StudentDirectoryRecord: Sendable, Hashable {
    let name: String
    let email: String
    let registrationNumber: String
    let messName: String
    /// The directory's hostel, when it has one.
    let hostelName: String?
    /// True when a MealLoop account already exists for this email.
    let hasAccount: Bool

    /// "RA••••••••0238": enough to recognise, never the full number.
    var maskedRegistrationNumber: String {
        let digits = registrationNumber
        guard digits.count > 6 else { return digits }
        return String(digits.prefix(2)) + String(repeating: "•", count: digits.count - 6) + String(digits.suffix(4))
    }
}

/// The outcome of matching a directory answer to what the student typed. Each is a different screen state.
enum StudentDirectoryMatch: Sendable, Hashable {
    /// "Is this you?"
    case confirm(StudentDirectoryRecord)
    case emailNotFound
    /// The email is known but belongs to another registration number. The student can correct it.
    case registrationNumberMismatch
    /// The student already has an account and should sign in instead.
    case alreadyRegistered
}

/// Field rules for Register. REG-3 in docs/OPEN_DECISIONS.md: no approved rule exists for password length or phone
/// format, so these are the prototype's minimum and are not product policy.
enum StudentRegistrationPolicy {
    static let minimumPasswordLength = 8
    static let phoneDigits = 10...13

    enum Problem: String, Sendable, Hashable, CaseIterable {
        case email, registrationNumber, password, phone
    }

    static func normalisedEmail(_ email: String) -> String {
        email.trimmingCharacters(in: .whitespacesAndNewlines).lowercased()
    }

    static func normalisedRegistrationNumber(_ number: String) -> String {
        number.trimmingCharacters(in: .whitespacesAndNewlines).uppercased()
    }

    /// The fields that stop a lookup, in screen order. Hostel is optional and never blocks.
    static func problems(in form: StudentRegistrationForm) -> [Problem] {
        var problems: [Problem] = []
        let email = normalisedEmail(form.email)
        let at = email.firstIndex(of: "@")
        if at == nil || email.hasPrefix("@") || !email[(at ?? email.endIndex)...].contains(".") || email.contains(" ") {
            problems.append(.email)
        }
        if normalisedRegistrationNumber(form.registrationNumber).count < 6 { problems.append(.registrationNumber) }
        if form.password.count < minimumPasswordLength { problems.append(.password) }
        let digits = form.phone.filter(\.isNumber)
        if !phoneDigits.contains(digits.count) || form.phone.contains(where: { !$0.isNumber && !" +-()".contains($0) }) {
            problems.append(.phone)
        }
        return problems
    }

    /// Matches the directory's answer for an email to the registration number the student typed.
    static func match(_ record: StudentDirectoryRecord?, to query: StudentIdentityQuery) -> StudentDirectoryMatch {
        guard let record else { return .emailNotFound }
        guard normalisedRegistrationNumber(record.registrationNumber) == query.registrationNumber else {
            return .registrationNumberMismatch
        }
        return record.hasAccount ? .alreadyRegistered : .confirm(record)
    }
}

/// Everything account creation needs once the student confirmed "Is this you?".
struct StudentRegistrationRequest: Sendable, Hashable {
    let email: String
    let registrationNumber: String
    let password: String
    let hostel: String?
    let phone: String
}
