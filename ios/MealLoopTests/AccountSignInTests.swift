#if DEMO_DATA || REVIEW_DATA
import XCTest
@testable import MealLoop

/// The one Sign in for every account (SIMULATED seeded accounts) and its form states.
@MainActor
final class AccountSignInTests: XCTestCase {
    private let password = DemoSeed.prototypePassword

    private func email(_ role: Role) throws -> String {
        try XCTUnwrap(DemoSeed.accounts.first { $0.role == role }).email
    }

    private func assertInvalid(_ demo: DemoDataProvider = DemoDataProvider(), email: String, password: String,
                               line: UInt = #line) async {
        do {
            _ = try await demo.signIn(email: email, password: password)
            XCTFail("Expected invalid credentials", line: line)
        } catch {
            XCTAssertEqual(error as? RepositoryError, .invalidCredentials, line: line)
        }
    }

    func testOneSeededAccountPerRole() {
        XCTAssertEqual(DemoSeed.accounts.map(\.role).sorted { $0.rawValue < $1.rawValue },
                       Role.allCases.sorted { $0.rawValue < $1.rawValue })
        XCTAssertEqual(Set(DemoSeed.accounts.map(\.email)).count, DemoSeed.accounts.count)
    }

    /// Every existing non-student account still reaches its own role's root through the unified Sign in.
    func testEveryNonStudentAccountReachesItsRoleThroughTheOneSignIn() async throws {
        for account in DemoSeed.accounts where account.role != .student {
            let session = try await DemoDataProvider().signIn(email: account.email, password: password)
            XCTAssertEqual(session.account, account)
            XCTAssertEqual(RoleRoot.destination(for: session.account.role), RoleRoot.destination(for: account.role))
            XCTAssertEqual(session.staff != nil, account.role.isMessStaff, "\(account.role)")
            XCTAssertEqual(session.staff?.role, account.role.isMessStaff ? account.role : nil)
        }
    }

    func testEmailIgnoresCaseAndSurroundingSpace() async throws {
        let email = try email(.warden)
        let session = try await DemoDataProvider().signIn(email: "  \(email.uppercased()) ", password: password)
        XCTAssertEqual(session.account.role, .warden)
    }

    func testWrongPasswordIsRejected() async throws {
        await assertInvalid(email: try email(.supervisor), password: password + "x")
    }

    func testUnknownEmailIsRejectedWithTheSameError() async {
        await assertInvalid(email: "nobody@mealloop.example", password: password)
    }

    /// The role comes from the account, never from the email: a student email with the staff credential gets nothing
    /// before Register, and a staff-looking address that is not an account gets nothing either.
    func testTheEmailDomainOrNameGrantsNoRole() async throws {
        await assertInvalid(email: try email(.student), password: password)
        await assertInvalid(email: "supervisor@srmist.edu.in", password: password)
        await assertInvalid(email: "admin@mealloop.example", password: password)
    }

    func testAStudentSignsInAfterRegisteringAndKeepsTheirAnswers() async throws {
        let demo = DemoDataProvider(scenario: .storyStart)
        let registered = try await demo.registerStudent(TestStudent.request)
        XCTAssertEqual(registered.account.role, .student)
        let aarav = try XCTUnwrap(registered.student?.student.id)
        _ = try await demo.setIntention(.attending, of: aarav, for: DemoSeed.lunch.id)

        let again = try await demo.signIn(email: TestStudent.request.email, password: TestStudent.request.password)
        XCTAssertEqual(again.account.role, .student)
        XCTAssertEqual(RoleRoot.destination(for: again.account.role), .student)
        let answer = try await demo.response(of: aarav, for: DemoSeed.lunch.id)
        guard case .answered(.attending, _) = answer else { return XCTFail("The saved answer was lost: \(answer)") }
        await assertInvalid(demo, email: TestStudent.request.email, password: password + "x")
    }

    func testFreshStudentStartsWithUnansweredBreakfast() async throws {
        let demo = DemoDataProvider(scenario: .storyStart)
        let session = try await demo.registerStudent(TestStudent.request)
        let breakfast = try await demo.response(of: try XCTUnwrap(session.student?.student.id), for: DemoSeed.breakfast.id)
        XCTAssertEqual(breakfast, .noResponse)
    }

    func testOfflineSignInFailsAndSignsNobodyIn() async throws {
        let model = AccountSignInViewModel(auth: DemoDataProvider(scenario: .offline))
        model.email = try email(.supervisor)
        model.password = password
        let session = await model.submit()
        XCTAssertNil(session)
        XCTAssertNotNil(model.errorMessage)
        XCTAssertEqual(model.email, try email(.supervisor), "The email stays for the retry")
    }

    func testFormIsDisabledUntilBothFieldsAreFilled() {
        let model = AccountSignInViewModel(auth: DemoDataProvider())
        XCTAssertFalse(model.canSubmit)
        model.email = "a@mealloop.example"
        XCTAssertFalse(model.canSubmit)
        model.email = "   "
        model.password = "x"
        XCTAssertFalse(model.canSubmit)
        model.email = "a@mealloop.example"
        XCTAssertTrue(model.canSubmit)
    }

    func testWrongCredentialsShowTheInlineMessage() async {
        let model = AccountSignInViewModel(auth: DemoDataProvider())
        model.email = "nobody@mealloop.example"
        model.password = "wrong"
        let session = await model.submit()
        XCTAssertNil(session)
        XCTAssertEqual(model.errorMessage, EntryCopy.wrongCredentials)
        XCTAssertFalse(model.isSubmitting)
    }

    func testRemoteSignInNeverFakesSuccess() async {
        do {
            _ = try await RemoteAPI(baseURL: nil).signIn(email: "a", password: "b")
            XCTFail("RemoteAPI must not sign anyone in yet")
        } catch {
            guard case .notImplemented? = error as? RepositoryError else { return XCTFail("\(error)") }
        }
    }
}

/// Register: field rules, the directory lookup, "Is this you?" and its failure states (SIMULATED directory).
@MainActor
final class StudentRegisterTests: XCTestCase {
    private func model(_ registration: any StudentRegistrationRepository = DemoDataProvider(scenario: .storyStart))
        -> StudentRegisterViewModel {
        let model = StudentRegisterViewModel(registration: registration)
        model.form = TestStudent.form
        return model
    }

    func testMatchingRecordAsksIsThisYouThenCreatesTheAccount() async throws {
        let model = model()
        await model.continueTapped()
        let record = try XCTUnwrap(model.confirmation)
        XCTAssertEqual(record.name, "Aarav")
        XCTAssertFalse(record.maskedRegistrationNumber.contains(String(record.registrationNumber.dropLast(4).dropFirst(2))),
                       "The full registration number is never shown")
        let session = await model.confirm()
        XCTAssertEqual(session?.account.role, .student)
    }

    func testUnknownEmailIsNotFound() async {
        let model = model()
        model.form.email = "someone.else@srmist.example"
        await model.continueTapped()
        XCTAssertEqual(model.outcome, .emailNotFound)
        XCTAssertNil(model.confirmation)
    }

    func testWrongRegistrationNumberIsAMismatchAndKeepsTheOtherFields() async {
        let model = model()
        model.form.registrationNumber = "RA0000000000000"
        model.form.hostel = "Block B"
        await model.continueTapped()
        XCTAssertEqual(model.outcome, .registrationNumberMismatch)
        XCTAssertEqual(model.form.hostel, "Block B")
        XCTAssertEqual(model.form.email, TestStudent.form.email)
        model.form.registrationNumber = TestStudent.form.registrationNumber
        XCTAssertNil(model.outcome, "Editing the number clears the old answer")
        await model.continueTapped()
        XCTAssertNotNil(model.confirmation)
    }

    func testALookupFailureOffersRetryAndIsNotNotFound() async {
        let demo = DemoDataProvider(scenario: .storyStart)
        await demo.failNextDirectoryLookup()
        let model = model(demo)
        await model.continueTapped()
        guard case .lookupFailed = model.outcome else { return XCTFail("Expected lookup failed, got \(String(describing: model.outcome))") }
        XCTAssertEqual(model.form, TestStudent.form, "Nothing typed is lost")
        await model.continueTapped()
        XCTAssertNotNil(model.confirmation)
    }

    func testAnAlreadyRegisteredEmailSaysSo() async throws {
        let demo = DemoDataProvider(scenario: .storyStart)
        _ = try await demo.registerStudent(TestStudent.request)
        let model = model(demo)
        await model.continueTapped()
        XCTAssertEqual(model.outcome, .alreadyRegistered)
    }

    func testNotMeReturnsToTheFormWithEverythingKept() async {
        let model = model()
        await model.continueTapped()
        XCTAssertNotNil(model.confirmation)
        model.cancelConfirmation()
        XCTAssertNil(model.confirmation)
        XCTAssertEqual(model.form, TestStudent.form)
    }

    func testInvalidFieldsNeverReachTheDirectory() async {
        let spy = DirectorySpy()
        let model = model(spy)
        model.form.email = "not-an-email"
        model.form.password = "short"
        model.form.phone = "12"
        await model.continueTapped()
        XCTAssertTrue(model.problem(.email))
        XCTAssertTrue(model.problem(.password))
        XCTAssertTrue(model.problem(.phone))
        XCTAssertFalse(model.problem(.registrationNumber))
        let calls = await spy.calls
        XCTAssertEqual(calls, 0)
    }

    /// An answer for values the student has since changed never confirms the new values.
    func testAStaleLookupAnswerIsDropped() async {
        let spy = DirectorySpy(delay: true)
        let model = model(spy)
        let lookup = Task { await model.continueTapped() }
        await spy.waitForCall()
        model.form.email = "changed@srmist.example"
        await spy.release()
        await lookup.value
        XCTAssertNil(model.confirmation)
        XCTAssertNil(model.outcome)
        XCTAssertEqual(model.phase, .editing)
    }

    func testReleaseHasNoDirectoryAndSaysSo() async {
        let model = model(NotConnected())
        await model.continueTapped()
        guard case .lookupFailed(let message) = model.outcome else { return XCTFail("Expected a failure") }
        XCTAssertFalse(message.isEmpty)
        XCTAssertNil(model.confirmation)
    }
}

/// A directory that counts calls and can hold its answer until released.
private actor DirectorySpy: StudentRegistrationRepository {
    private(set) var calls = 0
    private let delay: Bool
    private var gate: CheckedContinuation<Void, Never>?
    private var called: CheckedContinuation<Void, Never>?
    private var hasBeenCalled = false

    init(delay: Bool = false) { self.delay = delay }

    func directoryRecord(forEmail email: String) async throws -> StudentDirectoryRecord? {
        calls += 1
        hasBeenCalled = true
        called?.resume()
        called = nil
        if delay { await withCheckedContinuation { gate = $0 } }
        let entry = DemoSeed.studentDirectory[0]
        return StudentDirectoryRecord(name: entry.name, email: entry.email, registrationNumber: entry.registrationNumber,
                                      messName: DemoSeed.mess.name, hostelName: nil, hasAccount: false)
    }

    func registerStudent(_ request: StudentRegistrationRequest) async throws -> Session { throw RepositoryError.notFound }

    func waitForCall() async {
        if hasBeenCalled { return }
        await withCheckedContinuation { called = $0 }
    }

    func release() {
        gate?.resume()
        gate = nil
    }
}
#endif
