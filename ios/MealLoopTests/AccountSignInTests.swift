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
#endif
