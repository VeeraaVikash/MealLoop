import Foundation

/// The student's private spending ledger (Spending 221:63988). Every operation takes the student, and there is no
/// operation that lists another student's entries: no staff or Admin role can read it.
protocol StudentSpendingRepository: Sendable {
    /// Newest first. Empty when the student wrote nothing.
    func expenses(for student: StudentID) async throws -> [StudentExpense]
    /// Refused (`validationFailed`) when the amount is not above zero or the day is after today.
    func addExpense(_ draft: StudentExpenseDraft, for student: StudentID) async throws -> StudentExpense
    /// Replaces the entry's fields; the id stays. `notFound` when the entry is not the student's.
    func updateExpense(_ id: StudentExpenseID, with draft: StudentExpenseDraft, for student: StudentID) async throws
        -> StudentExpense
    /// `notFound` when the entry is not the student's.
    func deleteExpense(_ id: StudentExpenseID, for student: StudentID) async throws
}
