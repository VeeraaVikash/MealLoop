import Foundation

/// The messes other than the signed-in Food Head's own, and what a live meal is compared with.
/// Separate from the other Admin repositories, so their callers and stubs stay as they were.
protocol AdminMessRepository: Sendable {
    func messDay(for slot: MealSlot) async throws -> AdminMessDay
    func messHeadcount(_ id: String, slot: MealSlot) async throws -> AdminMessHeadcount
    /// SIMULATED: nothing reaches a vendor. A repeat with the same key changes nothing.
    func sendHeadcount(mess id: String, slot: MealSlot, key: IdempotencyKey, by role: Role) async throws -> AdminMessHeadcount
    /// A changed number needs a reason, as it does for the headcount of the story meal.
    func adjustHeadcount(mess id: String, slot: MealSlot, to count: Int, reason: String?, by role: Role) async throws -> AdminMessHeadcount
    func liveReference(for meal: MealID) async throws -> AdminLiveReference
    func notAnsweredByMess() async throws -> [AdminMessCount]
}
