import Foundation

/// Dish feedback after Not good. Additive: no existing operation changes. Counts are aggregates; no operation ever
/// returns who said what.
protocol DishFeedbackRepository: Sendable {
    /// The "What's wrong?" choices for a dish, in the order its frame draws them.
    func problems(forDish name: String) async throws -> [DishProblemOption]
    /// How many other students reported each problem of this dish for this meal. A problem nobody reported is absent,
    /// never zero. The asking student's own sends are not counted.
    func otherCounts(dish name: String, day: Date, slot: MealSlot, at mess: MessID, excluding student: StudentID)
        async throws -> [String: Int]
    func mostReported(day: Date, slot: MealSlot, at mess: MessID) async throws -> DishMostReported?
    /// Sends now. Throws offline: nothing is recorded then. The same key returns the first receipt.
    func send(_ submission: DishFeedbackSubmission, at mess: MessID, by student: StudentID) async throws -> DishFeedbackReceipt
    /// Keeps a submission on the device while offline. Nothing is sent and nothing is counted.
    func keepForLater(_ submission: DishFeedbackSubmission, at mess: MessID, by student: StudentID) async
    /// What is kept and not yet sent.
    func kept(by student: StudentID) async -> [DishFeedbackSubmission]
    /// Sends what was kept. Throws offline and keeps everything; returns the receipts of what was sent.
    func sendKept(by student: StudentID) async throws -> [DishFeedbackReceipt]
}
