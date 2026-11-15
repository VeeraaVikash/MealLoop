#if DEMO_DATA || REVIEW_DATA
import XCTest
@testable import MealLoop

enum TestStudent {
    /// The seeded directory record (Aarav) and the shared prototype credential, as Register would send them.
    static var request: StudentRegistrationRequest {
        let entry = DemoSeed.studentDirectory[0]
        return StudentRegistrationRequest(email: entry.email, registrationNumber: entry.registrationNumber,
                                          password: DemoSeed.prototypePassword, hostel: nil, phone: "9876543210")
    }

    static var form: StudentRegistrationForm {
        StudentRegistrationForm(email: request.email, registrationNumber: request.registrationNumber,
                                password: request.password, hostel: "", phone: request.phone)
    }
}

extension AuthRepository {
    /// Register → Is this you? → account created: the seeded student's session, as the unified entry gives it.
    func registeredStudentSession() async throws -> Session {
        guard let registration = self as? any StudentRegistrationRepository else { throw RepositoryError.notFound }
        return try await registration.registerStudent(TestStudent.request)
    }
}
#endif
