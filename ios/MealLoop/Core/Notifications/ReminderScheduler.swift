import Foundation
import UserNotifications

/// Whether the phone lets MealLoop show notifications.
enum ReminderPermission: Sendable, Equatable {
    case notAsked
    case allowed
    case denied
}

/// Local reminders on this phone. One instance, made at the composition root.
protocol ReminderScheduling: Sendable {
    func permission() async -> ReminderPermission
    /// Asks once; answers what the person chose.
    func requestPermission() async -> ReminderPermission
    /// Replaces every pending reminder with `id` prefix `prefix` by these. `now` is the app clock's time, so a reminder
    /// fires after the same interval in the Review build's story time as on a real clock.
    func replace(prefix: String, with reminders: [(id: String, title: String, body: String, fireAt: Date)], now: Date) async
    /// The ids still waiting to fire.
    func pendingIDs(prefix: String) async -> [String]
}

/// The system notification centre. Only time-interval triggers are used, so the app clock decides when.
struct LocalReminderScheduler: ReminderScheduling {
    private var center: UNUserNotificationCenter { .current() }

    func permission() async -> ReminderPermission {
        switch await center.notificationSettings().authorizationStatus {
        case .authorized, .provisional, .ephemeral: return .allowed
        case .denied: return .denied
        case .notDetermined: return .notAsked
        @unknown default: return .denied
        }
    }

    func requestPermission() async -> ReminderPermission {
        _ = try? await center.requestAuthorization(options: [.alert, .sound])
        return await permission()
    }

    func replace(prefix: String, with reminders: [(id: String, title: String, body: String, fireAt: Date)], now: Date) async {
        let old = await pendingIDs(prefix: prefix)
        center.removePendingNotificationRequests(withIdentifiers: old)
        guard await permission() == .allowed else { return }
        for reminder in reminders {
            let interval = reminder.fireAt.timeIntervalSince(now)
            guard interval > 0 else { continue }
            let content = UNMutableNotificationContent()
            content.title = reminder.title
            content.body = reminder.body
            let trigger = UNTimeIntervalNotificationTrigger(timeInterval: interval, repeats: false)
            try? await center.add(UNNotificationRequest(identifier: prefix + reminder.id, content: content, trigger: trigger))
        }
    }

    func pendingIDs(prefix: String) async -> [String] {
        await center.pendingNotificationRequests().map(\.identifier).filter { $0.hasPrefix(prefix) }
    }
}
