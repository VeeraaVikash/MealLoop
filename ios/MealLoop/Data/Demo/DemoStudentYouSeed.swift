#if DEMO_DATA || REVIEW_DATA
import Foundation

/// SAMPLE, NOT MEASURED. Student Notifications, Credits and Attendance, each value cited to its Figma frame (file
/// nzzTAm9YnJRSdKEeYUWUEb, page 07). No value here is a real balance, a real message or a real attendance record.
extension DemoSeed {
    /// Notifications (221:64480): two unread today (filled icon), two read earlier (outlined icon).
    /// "Guardian approved · 6:52 AM", "Breakfast today? · 5:30 AM", "Feedback seen · Yesterday", "Special pass · Mon".
    static let sampleNotifications: [StudentNotification] = [
        StudentNotification(id: StudentNotificationID("demo-note-guardian-approved"), kind: .outingGuardianApproved,
                            title: "Guardian approved", detail: "Your Sat 17 Aug outing, 2–8 PM. Now waiting for the warden.",
                            at: time(6, 52), isRead: false),
        StudentNotification(id: StudentNotificationID("demo-note-breakfast"), kind: .mealQuestion,
                            title: "Breakfast today?", detail: "Tell us by 6 AM so the kitchen can plan.",
                            at: time(5, 30), isRead: false),
        StudentNotification(id: StudentNotificationID("demo-note-feedback-seen"), kind: .feedbackSeen,
                            title: "Feedback seen", detail: "The kitchen saw it. 6 others said the sambar was too salty.",
                            at: date(13, 20, 10), isRead: true),
        StudentNotification(id: StudentNotificationID("demo-note-special-pass"), kind: .specialPass,
                            title: "Special pass", detail: "Wednesday 14 Aug, 12–2 PM at the pass desk.",
                            at: date(12, 9, 0), isRead: true),
    ]

    /// Credits (221:64313): Juice 50 pts and Ice cream 80 pts "At your mess counter"; Biryani coupon 200 pts,
    /// "Launches Friday".
    static let sampleCreditTickets: [StudentCreditTicket] = [
        StudentCreditTicket(id: "juice", name: "Juice", place: "At your mess counter", cost: 50, availability: .available),
        StudentCreditTicket(id: "ice-cream", name: "Ice cream", place: "At your mess counter", cost: 80,
                            availability: .available),
        StudentCreditTicket(id: "biryani-coupon", name: "Biryani coupon", place: "Launches Friday", cost: 200,
                            availability: .notYet(note: "Launches Friday")),
    ]

    /// Credits history (221:64443): the August answer lines as drawn. The frame's "Rated a dish +2" and "Answered a
    /// recheck +2" were removed (student redesign, 15 Nov 2026): the ledger gives no credit for feedback (P-FINAL-8).
    /// The balance stays `sampleCredits` (120, Credits 221:64313 and Home 221:62529).
    static let sampleCreditHistory: [StudentCreditEntry] = [
        StudentCreditEntry(id: "demo-credit-dinner", title: "Answered dinner", day: date(11, 17, 0), points: 5),
        StudentCreditEntry(id: "demo-credit-lunch", title: "Answered lunch", day: date(10, 9, 0), points: 5),
    ]

}
#endif
