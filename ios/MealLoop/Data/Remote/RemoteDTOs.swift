import Foundation

// Wire shapes of docs/backend/openapi.yaml and their mapping to Domain. Domain types stay free of wire concerns: the
// domain enums with associated values would otherwise encode in Swift's own shape, not the contract's.
// Every mapping keeps missing data missing: an absent count stays `.unavailable`, an absent forecast `.notReady`.
// A response that breaks a rule of the contract (a `ready` forecast without diners) is rejected, never patched.

/// A field the contract says must be present when another field has a given value. A response that breaks this is
/// unreadable, so the call fails as `unavailable`: nothing is shown as if the server had said it.
private func require<T>(_ value: T?, _ detail: @autoclosure () -> String) throws -> T {
    guard let value else {
        throw RepositoryError.unavailable(reason: "The server's answer could not be read (\(detail())).")
    }
    return value
}

// MARK: - Meals

struct MessDTO: Codable, Sendable, Equatable {
    let id: String
    let name: String
    let timeZone: String

    var domain: Mess { Mess(id: MessID(id), name: name, timeZoneIdentifier: timeZone) }
}

struct DishDTO: Codable, Sendable, Equatable {
    let id: String
    let name: String
    let isHighlight: Bool
    let diet: Diet
    let wasteUnit: WasteUnit

    var domain: Dish { Dish(id: DishID(id), name: name, isHighlight: isHighlight, diet: diet, wasteUnit: wasteUnit) }
}

/// `Meal` in the contract: one meal of a mess with its state. `startedAt` and `closedAt` are null until they happen.
struct MealDTO: Codable, Sendable, Equatable {
    let id: String
    let messId: String
    let slot: MealSlot
    let startsAt: Date
    let endsAt: Date
    let state: MealState
    let startedAt: Date?
    let closedAt: Date?

    var meal: Meal { Meal(id: MealID(id), messID: MessID(messId), slot: slot, startsAt: startsAt, endsAt: endsAt) }
    var status: MealStatus { MealStatus(meal: meal, state: state, startedAt: startedAt, closedAt: closedAt) }
}

/// `MealStatus` in the contract: the state together with the meal it belongs to.
struct MealStatusDTO: Codable, Sendable, Equatable {
    let meal: MealDTO

    var domain: MealStatus { meal.status }
}

struct CountReadingDTO: Codable, Sendable, Equatable {
    enum Status: String, Codable, Sendable { case available, unavailable }
    let status: Status
    let count: Int?
    let asOf: Date?

    func domain() throws -> CountReading {
        switch status {
        case .unavailable: return .unavailable
        case .available:
            return .available(try require(count, "An available count has no count"),
                              asOf: try require(asOf, "An available count has no asOf"))
        }
    }
}

struct MealRecordDTO: Codable, Sendable, Equatable {
    struct ShortageLine: Codable, Sendable, Equatable {
        let dishName: String?
        let status: ShortageDTO.Status
        let resolvedAt: Date?
    }

    struct Waste: Codable, Sendable, Equatable {
        enum Status: String, Codable, Sendable { case notRecorded, recorded }
        let status: Status
        let recordedAt: Date?
    }

    let mealId: String
    let messId: String
    let slot: MealSlot
    let day: Date
    let closedAt: Date?
    let finalEntries: CountReadingDTO
    let shortages: [ShortageLine]
    let waste: Waste
    let wasteReport: WasteReportDTO?

    func domain() throws -> MealRecord {
        MealRecord(
            mealID: MealID(mealId), messID: MessID(messId), slot: slot, day: day, closedAt: closedAt,
            finalEntries: try finalEntries.domain(),
            shortages: shortages.map { line in
                MealRecord.ShortageLine(dishName: line.dishName,
                                        outcome: line.status == .resolved ? .resolved(at: line.resolvedAt) : .active)
            },
            waste: waste.status == .recorded ? .recorded(at: waste.recordedAt) : .notRecorded,
            wasteReport: try wasteReport?.domain())
    }
}

// MARK: - Headcount

struct ForecastDTO: Codable, Sendable, Equatable {
    enum Status: String, Codable, Sendable { case ready, notReady }
    let status: Status
    let diners: Int?
    let setAt: Date?

    func domain() throws -> Forecast {
        switch status {
        case .notReady: return .notReady
        case .ready:
            return .ready(diners: try require(diners, "A ready forecast has no diners"),
                          setAt: try require(setAt, "A ready forecast has no setAt"))
        }
    }
}

struct HeadcountAdjustmentDTO: Codable, Sendable, Equatable {
    let from: Int
    let to: Int
    let reason: String
    let adjustedBy: Role
    let adjustedAt: Date

    var domain: HeadcountAdjustment {
        HeadcountAdjustment(from: from, to: to, reason: reason, adjustedBy: adjustedBy, adjustedAt: adjustedAt)
    }
}

/// The six headcount values of FR-HC-002, each separate. Null `approved` and `sentToVendor` mean not yet.
struct HeadcountDTO: Codable, Sendable, Equatable {
    struct Approved: Codable, Sendable, Equatable {
        let count: Int
        let approvedBy: Role
        let approvedAt: Date
        let adjustments: [HeadcountAdjustmentDTO]
    }

    struct Sent: Codable, Sendable, Equatable {
        let count: Int
        let sentBy: Role
        let sentAt: Date
    }

    struct Acknowledgment: Codable, Sendable, Equatable {
        let acknowledgedBy: String
        let acknowledgedAt: Date
    }

    let mealId: String
    let liveForecast: ForecastDTO
    let cutoffForecast: ForecastDTO
    let approved: Approved?
    let sentToVendor: Sent?
    let actualEntries: CountReadingDTO
    let finalEntries: CountReadingDTO
    let acknowledgment: Acknowledgment?

    func domain() throws -> Headcount {
        Headcount(
            mealID: MealID(mealId),
            liveForecast: try liveForecast.domain(),
            cutoffForecast: try cutoffForecast.domain(),
            approved: approved.map {
                .approved(ApprovedHeadcount(count: $0.count, approvedBy: $0.approvedBy, approvedAt: $0.approvedAt,
                                            adjustments: $0.adjustments.map(\.domain)))
            } ?? .notApproved,
            sentToVendor: sentToVendor.map { .sent(SentHeadcount(count: $0.count, sentBy: $0.sentBy, sentAt: $0.sentAt)) }
                ?? .notSent,
            actualEntries: try actualEntries.domain(),
            finalEntries: try finalEntries.domain(),
            acknowledgment: acknowledgment.map {
                VendorAcknowledgment(acknowledgedBy: AccountID($0.acknowledgedBy), acknowledgedAt: $0.acknowledgedAt)
            })
    }
}

struct ApproveHeadcountRequestDTO: Codable, Sendable, Equatable {
    let count: Int
    let reason: String?
}

// MARK: - Entries

struct StudentRefDTO: Codable, Sendable, Equatable {
    let id: String
    let maskedId: String

    var domain: StudentRef { StudentRef(id: StudentID(id), maskedID: maskedId) }
}

struct EntryRequestDTO: Codable, Sendable, Equatable {
    let method: EntryMethod
    let studentId: String
}

struct EntryRecordedDTO: Codable, Sendable, Equatable {
    let entryId: String
    let mealId: String
    let student: StudentRefDTO
    let method: EntryMethod
    let recordedAt: Date
    let hadMealResponse: Bool
    let count: Int

    var domain: EntryResult {
        .recorded(EntryRecord(id: EntryID(entryId), mealID: MealID(mealId), student: student.domain,
                              recordedAt: recordedAt, method: method, hadMealResponse: hadMealResponse),
                  count: count)
    }
}

struct EnteredWithoutVotingDTO: Codable, Sendable, Equatable {
    let mealId: String
    let student: StudentRefDTO
    let enteredAt: Date

    var domain: EnteredWithoutVoting {
        EnteredWithoutVoting(mealID: MealID(mealId), student: student.domain, enteredAt: enteredAt)
    }
}

struct EntryCodeDTO: Codable, Sendable, Equatable {
    let payload: String
    let lastFour: String

    var domain: EntryCode { EntryCode(payload: payload, lastFour: lastFour) }
}

struct ResolveEntryRequestDTO: Codable, Sendable, Equatable {
    enum Kind: String, Codable, Sendable { case qrPayload, lastFour }
    let kind: Kind
    let value: String

    init(_ credential: EntryCredential) {
        switch credential {
        case .qrPayload(let payload): kind = .qrPayload; value = payload
        case .lastFour(let digits): kind = .lastFour; value = digits
        }
    }
}

struct ResolveEntryResponseDTO: Codable, Sendable, Equatable {
    enum Result: String, Codable, Sendable { case student, notRecognised, wrongMeal }
    let result: Result
    let student: StudentRefDTO?
    let servingNow: MealSlot?

    func domain() throws -> EntryCredentialResult {
        switch result {
        case .student: return .student(try require(student, "A resolved credential has no student").domain)
        case .notRecognised: return .notRecognised
        case .wrongMeal: return .wrongMeal(servingNow: servingNow)
        }
    }
}

// MARK: - Intentions

struct IntentionRequestDTO: Codable, Sendable, Equatable {
    let intention: MealIntention
}

struct IntentionResponseDTO: Codable, Sendable, Equatable {
    enum Response: String, Codable, Sendable { case answered, noResponse }
    let mealId: String
    let response: Response
    let intention: MealIntention?
    let answeredAt: Date?

    func domain() throws -> IntentionResponse {
        switch response {
        case .noResponse: return .noResponse
        case .answered:
            return .answered(try require(intention, "An answer has no intention"),
                             at: try require(answeredAt, "An answer has no answeredAt"))
        }
    }
}

/// Counts per answer. The wire names follow `MealIntention` (`in`, `skip`, `notSure`) plus `noResponse`.
struct AnswerCountsDTO: Codable, Sendable, Equatable {
    let `in`: Int
    let skip: Int
    let notSure: Int
    let noResponse: Int

    var domain: MealAnswerCounts {
        MealAnswerCounts(attending: `in`, skipping: skip, notSure: notSure, noResponse: noResponse)
    }
}

// MARK: - Shortages

struct ShortageReportDTO: Codable, Sendable, Equatable {
    let dishName: String
    let level: ShortageLevel
    let note: String?
    let reportedBy: Role
}

struct ShortageDTO: Codable, Sendable, Equatable {
    enum Status: String, Codable, Sendable { case active, resolved }

    struct Delivery: Codable, Sendable, Equatable {
        enum Status: String, Codable, Sendable { case sent, seen }
        let status: Status
        let at: Date
        /// Who saw it; present only when `status` is `seen`.
        let by: String?
    }

    let id: String
    let mealId: String
    let dishName: String
    let level: ShortageLevel
    let note: String?
    let reportedAt: Date
    let reportedBy: Role
    let delivery: Delivery
    let status: Status
    let resolvedAt: Date?

    func domain() throws -> Shortage {
        let delivery: ShortageDelivery
        switch self.delivery.status {
        case .sent: delivery = .sent(at: self.delivery.at)
        case .seen: delivery = .seen(at: self.delivery.at, by: try require(self.delivery.by, "A seen shortage has no by"))
        }
        let status: ShortageStatus
        switch self.status {
        case .active: status = .active
        case .resolved: status = .resolved(at: try require(resolvedAt, "A resolved shortage has no resolvedAt"))
        }
        return Shortage(id: ShortageID(id), mealID: MealID(mealId), dishName: dishName, level: level, note: note,
                        reportedAt: reportedAt, reportedBy: reportedBy, delivery: delivery, status: status)
    }
}

// MARK: - Waste reports

struct LeftoverMeasurementDTO: Codable, Sendable, Equatable {
    enum State: String, Codable, Sendable { case entered, noneLeft, notMade, notEntered }
    let state: State
    let value: Double?

    init(_ measurement: LeftoverMeasurement) {
        switch measurement {
        case .entered(let value): state = .entered; self.value = value
        case .noneLeft: state = .noneLeft; value = nil
        case .notMade: state = .notMade; value = nil
        case .notEntered: state = .notEntered; value = nil
        }
    }

    func domain() throws -> LeftoverMeasurement {
        switch state {
        case .entered: return .entered(try require(value, "An entered leftover has no value"))
        case .noneLeft: return .noneLeft
        case .notMade: return .notMade
        case .notEntered: return .notEntered
        }
    }
}

struct DishLeftoverDTO: Codable, Sendable, Equatable {
    let dishId: String
    let dishName: String
    let unit: WasteUnit
    let measurement: LeftoverMeasurementDTO

    init(_ leftover: DishLeftover) {
        dishId = leftover.dishID.rawValue
        dishName = leftover.dishName
        unit = leftover.unit
        measurement = LeftoverMeasurementDTO(leftover.measurement)
    }

    func domain() throws -> DishLeftover {
        DishLeftover(dishID: DishID(dishId), dishName: dishName, unit: unit, measurement: try measurement.domain())
    }
}

struct PlateWasteDTO: Codable, Sendable, Equatable {
    enum State: String, Codable, Sendable { case entered, notEntered }
    let state: State
    let kilograms: Double?

    init(_ measurement: PlateWasteMeasurement) {
        switch measurement {
        case .entered(let kilograms): state = .entered; self.kilograms = kilograms
        case .notEntered: state = .notEntered; kilograms = nil
        }
    }

    func domain() throws -> PlateWasteMeasurement {
        switch state {
        case .entered: return .entered(kilograms: try require(kilograms, "Entered plate waste has no kilograms"))
        case .notEntered: return .notEntered
        }
    }
}

struct WasteStatusDTO: Codable, Sendable, Equatable {
    enum Status: String, Codable, Sendable { case notStarted, draft, recorded }
    let status: Status
    let savedAt: Date?

    func domain() throws -> WasteReportStatus {
        switch status {
        case .notStarted: return .notStarted
        case .draft: return .draft(savedAt: try require(savedAt, "A draft has no savedAt"))
        case .recorded: return .recorded(savedAt: try require(savedAt, "A recorded report has no savedAt"))
        }
    }
}

struct WasteReportDTO: Codable, Sendable, Equatable {
    let mealId: String
    let leftovers: [DishLeftoverDTO]
    let plateWaste: PlateWasteDTO
    let status: WasteStatusDTO.Status
    let savedAt: Date?

    func domain() throws -> WasteReport {
        WasteReport(mealID: MealID(mealId), leftovers: try leftovers.map { try $0.domain() },
                    plateWaste: try plateWaste.domain(),
                    status: try WasteStatusDTO(status: status, savedAt: savedAt).domain())
    }
}

struct WasteSummaryDTO: Codable, Sendable, Equatable {
    let mealId: String
    let status: WasteStatusDTO.Status
    let savedAt: Date?
    let completedFieldCount: Int
    let totalFieldCount: Int

    func domain() throws -> WasteReportSummary {
        WasteReportSummary(mealID: MealID(mealId), status: try WasteStatusDTO(status: status, savedAt: savedAt).domain(),
                           completedFieldCount: completedFieldCount, totalFieldCount: totalFieldCount)
    }
}

struct SaveWasteReportRequestDTO: Codable, Sendable, Equatable {
    enum Action: String, Codable, Sendable { case saveDraft, record }
    let action: Action
    let leftovers: [DishLeftoverDTO]
    let plateWaste: PlateWasteDTO

    init(_ report: WasteReport, action: Action) {
        self.action = action
        leftovers = report.leftovers.map(DishLeftoverDTO.init)
        plateWaste = PlateWasteDTO(report.plateWaste)
    }
}

// MARK: - SOS

struct SOSReportDTO: Codable, Sendable, Equatable {
    let title: String
    let place: String
}

struct SOSCaseDTO: Codable, Sendable, Equatable {
    struct Mark: Codable, Sendable, Equatable {
        let role: Role
        let at: Date
    }

    struct Status: Codable, Sendable, Equatable {
        enum State: String, Codable, Sendable { case open, closed }
        let state: State
        let at: Date?
        let by: Role?
    }

    let id: String
    let messId: String
    let title: String
    let place: String
    let raisedAt: Date
    let claim: Mark?
    let checks: [Mark]
    let status: Status

    func domain() throws -> SOSCase {
        let status: SOSStatus
        switch self.status.state {
        case .open: status = .open
        case .closed: status = .closed(at: try require(self.status.at, "A closed case has no at"),
                                       by: try require(self.status.by, "A closed case has no by"))
        }
        return SOSCase(id: SOSCaseID(id), messID: MessID(messId), title: title, place: place, raisedAt: raisedAt,
                       claim: claim.map { SOSClaim(role: $0.role, at: $0.at) },
                       checks: checks.map { SOSCheck(role: $0.role, at: $0.at) }, status: status)
    }
}

// MARK: - Sessions

struct SignInRequestDTO: Codable, Sendable, Equatable {
    let email: String
    let password: String
}

/// A signed-in session. The credential is opaque to the app (ADR-005); it is stored in the Keychain, never logged.
struct SessionDTO: Decodable, Sendable {
    struct AccountDTO: Decodable, Sendable {
        struct Scope: Decodable, Sendable {
            enum Kind: String, Decodable, Sendable { case mess, hostel }
            let kind: Kind
            let id: String
        }

        let id: String
        let displayName: String
        let email: String
        let role: Role
        let scope: Scope
    }

    struct StaffDTO: Decodable, Sendable {
        let role: Role
        let mess: MessDTO
        let staffInitials: String
        let supervisorName: String
    }

    struct StudentDTO: Decodable, Sendable {
        let student: StudentRefDTO
        let mess: MessDTO
    }

    let token: String
    let account: AccountDTO
    let staff: StaffDTO?
    let student: StudentDTO?

    var domain: Session {
        let scope: AccountScope
        switch account.scope.kind {
        case .mess: scope = .mess(MessID(account.scope.id))
        case .hostel: scope = .hostel(HostelID(account.scope.id))
        }
        return Session(
            account: Account(id: AccountID(account.id), displayName: account.displayName, email: account.email,
                             role: account.role, scope: scope),
            staff: staff.map { StaffSession(role: $0.role, mess: $0.mess.domain, staffInitials: $0.staffInitials,
                                            supervisorName: $0.supervisorName) },
            student: student.map { StudentContext(student: $0.student.domain, mess: $0.mess.domain) })
    }
}
