#if DEMO_DATA || REVIEW_DATA
import Foundation

/// SIMULATED. The read state of the sample notifications, kept for one run of the app.
actor DemoStudentYouStore {
    private var read: Set<StudentNotificationID> = []

    func markRead(_ id: StudentNotificationID) { read.insert(id) }
    func isRead(_ id: StudentNotificationID) -> Bool { read.contains(id) }
}

/// SIMULATED. Student You on top of the prototype data source. Credits count the student's own answers recorded in
/// `DemoDataProvider`, so an answer on Home shows here; nothing is confirmed by a server.
struct DemoStudentYou: StudentYouRepository {
    let core: DemoDataProvider
    let store: DemoStudentYouStore
    /// Reward tickets got in this run. Their cost comes off the balance and each one is a history line. Nil keeps the
    /// balance as it was before reward tickets existed.
    var rewards: DemoStudentRewardsStore?
    /// The Admin's reward catalogue. Nil keeps the seeded tickets.
    var catalogue: DemoRewardCatalogueStore?

    /// Today's meals a student can answer, in the order the day serves them.
    private static let todaysMeals = [DemoSeed.breakfast.id, DemoSeed.lunch.id, DemoSeed.dinner.id]

    func notifications(for student: StudentID) async throws -> [StudentNotification] {
        try await core.requireConnection()
        guard student == DemoSeed.sampleStudent.id else { return [] }
        var notes: [StudentNotification] = []
        for var note in DemoSeed.sampleNotifications {
            if await store.isRead(note.id) { note.isRead = true }
            notes.append(note)
        }
        return notes.sorted { $0.at > $1.at }
    }

    func markRead(_ id: StudentNotificationID, for student: StudentID) async throws -> StudentNotification {
        try await core.requireConnection()
        guard student == DemoSeed.sampleStudent.id,
              var note = DemoSeed.sampleNotifications.first(where: { $0.id == id }) else { throw RepositoryError.notFound }
        await store.markRead(id)
        note.isRead = true
        return note
    }

    func profile(for student: StudentID, at mess: MessID) async throws -> StudentProfileSummary {
        try await core.requireConnection()
        let isSample = student == DemoSeed.sampleStudent.id
        let credits = isSample ? try await self.credits(for: student).balance : nil
        // STATE.md: "Aarav ••0238".
        return StudentProfileSummary(firstName: isSample ? "Aarav" : nil,
                                     maskedID: isSample ? DemoSeed.sampleStudent.maskedID : "",
                                     messName: DemoSeed.mess.name, credits: credits)
    }

    func credits(for student: StudentID) async throws -> StudentCredits {
        try await core.requireConnection()
        let tickets = await catalogue?.items ?? DemoSeed.sampleCreditTickets
        guard student == DemoSeed.sampleStudent.id else {
            return StudentCredits(balance: nil, tickets: tickets, history: [])
        }
        // SIMULATED ledger. A meal that ended during this run settles by the owner's rules (16 Nov 2026): the answer and
        // whether an entry was recorded. The sample balance already holds the meals before the story starts.
        var earned: [StudentCreditEntry] = []
        let now = core.clock.now()
        for meal in [DemoSeed.breakfast, DemoSeed.lunch, DemoSeed.dinner]
        where meal.endsAt > DemoSeed.storyStartNow && meal.endsAt <= now {
            let response = try await core.response(of: student, for: meal.id)
            let standing = try await core.entryStanding(of: student, for: meal.id, at: DemoSeed.mess.id)
            let outcome: StudentCreditRule.Outcome
            switch standing {
            case .scanned, .scannedAgain: outcome = .attended
            default: outcome = .missed
            }
            let points = StudentCreditRule.points(for: response, outcome: outcome)
            guard points != 0 else { continue }
            earned.append(StudentCreditEntry(id: "run-\(meal.id.rawValue)", title: Self.settledTitle(meal.slot, response, outcome),
                                             day: meal.endsAt, points: points))
        }
        // Credits history (221:64443): "Juice redeemed · Mon 12 Aug · -50 pts".
        let redeemed = (await rewards?.list(for: student) ?? []).map {
            StudentCreditEntry(id: "reward-\($0.id.rawValue)", title: "\($0.name) redeemed", day: $0.gotAt, points: -$0.cost)
        }
        let lines = earned + redeemed
        let balance = DemoSeed.sampleCredits + lines.reduce(0) { $0 + $1.points }
        return StudentCredits(balance: balance, tickets: tickets,
                              history: lines.sorted { $0.day > $1.day } + DemoSeed.sampleCreditHistory,
                              pointsPerAnswer: StudentCreditRule.yesAttend)
    }


    /// The history line for a settled meal, in the rules' own words.
    private static func settledTitle(_ slot: MealSlot, _ response: IntentionResponse, _ outcome: StudentCreditRule.Outcome) -> String {
        let meal = MLFormat.mealSlot(slot).lowercased()
        switch (response, outcome) {
        case (.answered(.attending, _), .attended): return "Said yes and came to \(meal)"
        case (.answered(.attending, _), .missed): return "Said yes and missed \(meal)"
        case (.answered(.skipping, _), .attended): return "Skipped but came to \(meal)"
        case (.answered(.skipping, _), .missed): return "Skipped \(meal) as said"
        default: return "Didn't answer for \(meal)"
        }
    }
}
#endif
