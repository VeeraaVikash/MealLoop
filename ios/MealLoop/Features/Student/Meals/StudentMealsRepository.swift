import Foundation

/// What the Student Meals tab, the Special pass and Crowd need. Separate from the core repositories, so no existing
/// operation changes. The live pass code still comes from `SpecialPassRepository.refreshPassCode`.
protocol StudentMealsRepository: Sendable {
    func week(for mess: MessID) async throws -> StudentWeek
    func mealMenu(on day: Date, slot: MealSlot, mess: MessID) async throws -> StudentMealMenu
    func dishDetail(_ dish: DishID, on day: Date, slot: MealSlot, mess: MessID) async throws -> StudentDishDetail
    /// Dishes of this week whose name contains `text`, ignoring case. An empty text finds nothing.
    func findDishes(_ text: String, mess: MessID) async throws -> [StudentDishMatch]
    func passStanding(of student: StudentID, at mess: MessID) async throws -> StudentPassStanding
    /// "Hold to use". The same idempotency key returns the first result. Refused unless the pass is available.
    func startPass(of student: StudentID, key: IdempotencyKey) async throws -> StudentPassStanding
    func crowd(at mess: MessID) async throws -> StudentCrowd
}
