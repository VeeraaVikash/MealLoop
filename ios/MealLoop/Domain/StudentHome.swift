import Foundation

enum StudentPassRowStatus: String, Codable, Sendable, Hashable {
    case open
    case used
    case closed
}

/// The Special pass row on Student Home.
struct StudentPassRow: Codable, Sendable, Hashable {
    let meal: Meal
    let status: StudentPassRowStatus
}

/// Everything on Student Home that is not the meal answer. Each part is optional: a missing value is hidden or
/// shown as missing, never as zero.
struct StudentHomeExtras: Codable, Sendable, Hashable {
    let credits: Int?
    /// The same counts as the Crowd page, so the two never disagree. Nil when they could not be read.
    let crowd: StudentCrowd?
    let pass: StudentPassRow?
    let isMessClosed: Bool
    /// A meal of the day after the staff-run ones, which the student can still answer.
    let laterMeal: Meal?
}

/// The "Why skipping?" list. It equals the admin list exactly (design_intent.md, "Reasons for absence").
enum MealSkipReason: String, Codable, Sendable, CaseIterable, Hashable {
    case classOrExam
    case homeOrLeave
    case eatingElsewhere
    case dislikeDish
    case dietary
    case notHungry
    case other
    case preferNotToSay
}

/// Where the student's entry stands for one meal, as the Entry QR shows it.
enum StudentEntryStanding: Sendable, Hashable {
    case notScanned
    case scanned(at: Date)
    /// The code was shown again after the entry was recorded. Nothing was added to any count.
    case scannedAgain(firstAt: Date)
    /// The student opened the code at another mess. `homeMess` is the mess it belongs to.
    case wrongMess(homeMess: String)
}

extension StudentEntryStanding {
    /// True only when the door recorded a valid entry for this student, meal and mess. Showing the code, a pending or
    /// rejected scan, an offline scan or a scan at another mess is never a recorded entry.
    var isRecorded: Bool {
        switch self {
        case .scanned, .scannedAgain: return true
        case .notScanned, .wrongMess: return false
        }
    }

    /// When the entry was first recorded.
    var recordedAt: Date? {
        switch self {
        case .scanned(let at): return at
        case .scannedAgain(let firstAt): return firstAt
        case .notScanned, .wrongMess: return nil
        }
    }
}

/// What the QR carries for one 12-second window: the seeded code plus a changing token.
/// SIMULATED: nothing verifies the token, because QR scanning is not built. The typed last four is unchanged.
struct RotatingEntryCode: Codable, Sendable, Hashable {
    let payload: String
    let lastFour: String
    let step: Int
}

/// A meal on the student's attendance record that they can ask to have checked.
struct AttendanceRecord: Codable, Sendable, Hashable {
    let mealID: MealID
    let slot: MealSlot
    let day: Date
    let wasScanned: Bool
}

enum EntryCorrectionReason: String, Codable, Sendable, CaseIterable, Hashable {
    case ateButNotScanned
    case wrongMeal
    case other
}

struct EntryCorrectionRequest: Codable, Sendable, Hashable {
    let student: StudentID
    let mealID: MealID
    let reason: EntryCorrectionReason
    let note: String?
    let idempotencyKey: IdempotencyKey
}

/// A correction request as stored. It is a request only: it changes no entry and no count.
struct EntryCorrection: Codable, Sendable, Hashable {
    let request: EntryCorrectionRequest
    let sentAt: Date
}
