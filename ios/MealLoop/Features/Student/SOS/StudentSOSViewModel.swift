import Observation
import SwiftUI

// The restyled SOS flow (Figma file nzzTAm9YnJRSdKEeYUWUEb, page 07): SOS · new (2162:6), SOS · I feel unwell (2162:161),
// SOS · Camera · GPS unavailable (2162:405), SOS · Camera denied (2162:493), SOS · Review (2162:152142), Review · GPS
// unavailable (2162:152270), Review · No photo (2162:152398), Review · Offline (2162:152516), Review · Failed
// (2162:152648) and SOS Sent (221:63509).
// Rules: an urgent report raises an SOS through `SOSRepository.raise` (then the view calls `dataDidChange()`); offline
// nothing is sent or shown as sent, and it is sent once the app is back online; a failed send offers Try again with the
// same key, so a retry never opens a second case. The camera is a static preview and the location is the student's
// mess: neither is verified on a device.

/// The SOS reasons (student redesign, 15 Nov 2026; earlier the four choices of 2162:6). Each reason has its own fields
/// and photo rule; see `photo` and `asksForDish`.
enum StudentSOSCategory: String, CaseIterable, Hashable, Sendable {
    case foundInFood
    case smellsBad
    case looksBad
    case platesNotClean
    case unwell
    case otherSafety

    enum Photo: Equatable, Sendable { case required, optional, none }

    var title: String {
        switch self {
        case .foundInFood: return "Found something in my food"
        case .smellsBad: return "Smells bad"
        case .looksBad: return "Looks bad"
        case .platesNotClean: return "Plates not clean"
        case .unwell: return "I feel unwell after eating"
        case .otherSafety: return "Another safety problem"
        }
    }

    var symbol: String {
        switch self {
        case .foundInFood: return "magnifyingglass"
        case .smellsBad: return "nose"
        case .looksBad: return "eye"
        case .platesNotClean: return "fork.knife"
        case .unwell: return "hand.raised"
        case .otherSafety: return "exclamationmark.triangle"
        }
    }

    /// The food reasons pick a dish; the other two never show the dish picker.
    var asksForDish: Bool {
        switch self {
        case .foundInFood, .smellsBad, .looksBad, .platesNotClean: return true
        case .unwell, .otherSafety: return false
        }
    }

    var photo: Photo {
        switch self {
        case .foundInFood: return .required
        case .smellsBad, .looksBad, .platesNotClean: return .optional
        case .unwell, .otherSafety: return .none
        }
    }
}

/// What is still missing before the current reason can be sent. Checked again when Send is tapped.
enum StudentSOSProblem: Equatable, Sendable {
    case reason, dish, photo, meal, symptoms, startedWhen, whereNow, whereHappened, whatHappened
}

@MainActor
@Observable
final class StudentSOSViewModel {
    /// The phone's camera, as the prototype simulates it. The simulator has no camera.
    enum Camera: Equatable { case available, denied }
    /// The phone's location, as the prototype simulates it. Nothing is measured.
    enum Location: Equatable { case atMess, unavailable }
    enum SendState: Equatable { case idle, sending, failed, offline, waitingForConnection }

    let context: StudentContext
    let camera: Camera
    let location: Location
    private(set) var category: StudentSOSCategory?
    var dish: String?
    /// I feel unwell after eating.
    var unwellMeal: MealSlot?
    var symptoms = ""
    var startedWhen = ""
    var whereNow = ""
    /// Another safety problem.
    var whereHappened = ""
    var whatHappened = ""
    var needsHelpNow = false
    /// Today's meals that have started, for "Which meal?" on I feel unwell.
    private(set) var mealsToday: [MealSlot] = []
    private(set) var dishes: [String] = []
    private(set) var meal: MealSlot?
    /// When the live photo was taken; nil until then, and nil when sent without a photo.
    private(set) var photoAt: Date?
    private(set) var withoutPhoto = false
    private(set) var sendState: SendState = .idle
    private(set) var sos: SOSCase?
    private var key = IdempotencyKey.make()

    private let sosRepository: any SOSRepository
    private let mealState: any MealStateRepository
    private let meals: any StudentMealsRepository
    private let clock: any AppClock

    init(context: StudentContext, repositories: Repositories, clock: any AppClock, camera: Camera = .available,
         location: Location = .atMess) {
        self.context = context
        self.clock = clock
        self.camera = camera
        self.location = location
        sosRepository = repositories.sos
        mealState = repositories.mealState
        meals = repositories.student.meals
    }

    var now: Date { clock.now() }
    var timeZone: TimeZone { context.mess.timeZone }
    var canGoOn: Bool { problems.isEmpty }

    /// Everything the current reason still needs, photo excluded until the photo step.
    var detailProblems: [StudentSOSProblem] {
        guard let category else { return [.reason] }
        func blank(_ text: String) -> Bool { text.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty }
        var missing: [StudentSOSProblem] = []
        if category.asksForDish && dish == nil { missing.append(.dish) }
        if category == .unwell {
            if unwellMeal == nil { missing.append(.meal) }
            if blank(symptoms) { missing.append(.symptoms) }
            if blank(startedWhen) { missing.append(.startedWhen) }
            if blank(whereNow) { missing.append(.whereNow) }
        }
        if category == .otherSafety {
            if blank(whereHappened) { missing.append(.whereHappened) }
            if blank(whatHappened) { missing.append(.whatHappened) }
        }
        return missing
    }

    /// Everything still missing for sending, the required photo included.
    var problems: [StudentSOSProblem] {
        var missing = detailProblems
        if category?.photo == .required && photoAt == nil { missing.append(.photo) }
        return missing
    }
    var hasPhoto: Bool { photoAt != nil }
    var isSending: Bool { sendState == .sending }
    var isOffline: Bool { sendState == .offline || sendState == .waitingForConnection }

    /// What the report says, built only from the current reason's fields, so nothing of an earlier reason goes with it.
    var subject: String {
        guard let category else { return "" }
        func clean(_ text: String) -> String { text.trimmingCharacters(in: .whitespacesAndNewlines) }
        switch category {
        case .foundInFood, .smellsBad, .looksBad, .platesNotClean:
            return dish.map { "\(category.title) · \($0)" } ?? category.title
        case .unwell:
            return [category.title, unwellMeal.map(MLFormat.mealSlot), clean(symptoms).isEmpty ? nil : clean(symptoms),
                    clean(startedWhen).isEmpty ? nil : StudentSOSCopy.since(clean(startedWhen))]
                .compactMap { $0 }.joined(separator: " · ")
        case .otherSafety:
            return [needsHelpNow ? StudentSOSCopy.needsHelpTag : nil, category.title,
                    clean(whatHappened).isEmpty ? nil : clean(whatHappened)].compactMap { $0 }.joined(separator: " · ")
        }
    }

    /// The place sent with the SOS: where the student says they are or where it happened, else the mess. With no
    /// location for a food reason, it says so; nothing is guessed.
    var place: String {
        func clean(_ text: String) -> String { text.trimmingCharacters(in: .whitespacesAndNewlines) }
        switch category {
        case .unwell?: if !clean(whereNow).isEmpty { return clean(whereNow) }
        case .otherSafety?: if !clean(whereHappened).isEmpty { return clean(whereHappened) }
        default: break
        }
        return location == .atMess ? context.mess.name : StudentSOSCopy.placeNotRecorded
    }

    /// The dishes of the meal the mess is in or about to start, for "Which dish? (optional)".
    func load() async {
        mealsToday = ((try? await mealState.meals(for: context.mess.id)) ?? []).filter { $0.state != .notStarted }.map(\.meal.slot)
        guard dishes.isEmpty, let status = try? await mealState.currentMeal(for: context.mess.id) else { return }
        meal = status.meal.slot
        var calendar = Calendar(identifier: .gregorian)
        calendar.timeZone = context.mess.timeZone
        let day = calendar.startOfDay(for: status.meal.startsAt)
        if let menu = try? await meals.mealMenu(on: day, slot: status.meal.slot, mess: context.mess.id) {
            var seen = Set<String>()
            dishes = ([menu.highlight].compactMap { $0 } + menu.mains + menu.curries + menu.slimRows)
                .map(\.name).filter { seen.insert($0).inserted }
        }
    }

    /// Picks a reason and clears every field that belonged to another reason, the photo included, so an earlier
    /// branch never goes with the report.
    func choose(_ category: StudentSOSCategory) {
        guard category != self.category else { return }
        self.category = category
        dish = nil
        unwellMeal = nil
        symptoms = ""
        startedWhen = ""
        whereNow = ""
        whereHappened = ""
        whatHappened = ""
        needsHelpNow = false
        photoAt = nil
        withoutPhoto = false
        key = IdempotencyKey.make()
    }

    func toggle(dish name: String) { dish = dish == name ? nil : name }

    /// The shutter: a live photo at the clock's time (a static preview in the simulator).
    func takePhoto() {
        photoAt = clock.now()
        withoutPhoto = false
    }

    /// Camera denied: "Send without photo". It goes flagged so the team asks for details.
    func continueWithoutPhoto() {
        guard category?.photo != .required else { return }
        photoAt = nil
        withoutPhoto = category?.photo == .optional
    }

    /// Checks the connection on Review, so the Offline state shows before the student taps.
    func checkConnection() async {
        guard sendState == .idle || sendState == .offline else { return }
        do {
            _ = try await sosRepository.activeCases(for: context.mess.id)
            if sendState == .offline { sendState = .idle }
        } catch RepositoryError.offline {
            sendState = .offline
        } catch {}
    }

    /// Raises the SOS. True only when the case is open; offline it waits and nothing is shown as sent.
    func send() async -> Bool {
        // The current reason is checked again here: a required photo, a dish, or the unwell and safety details.
        guard category != nil, problems.isEmpty, sendState != .sending else { return false }
        let waiting = sendState == .offline || sendState == .waitingForConnection
        sendState = .sending
        let title = withoutPhoto ? "\(subject) · \(StudentSOSCopy.noPhotoTag)" : subject
        do {
            sos = try await sosRepository.raise(SOSReport(messID: context.mess.id, title: title, place: place,
                                                          idempotencyKey: key))
            sendState = .idle
            return true
        } catch RepositoryError.offline {
            sendState = waiting ? .waitingForConnection : .offline
            return false
        } catch {
            sendState = .failed
            return false
        }
    }

    /// "Send when online": kept until the app is back online, then sent with the same key.
    func sendWhenOnline() async -> Bool {
        sendState = .waitingForConnection
        return await send()
    }
}

/// Words of the SOS frames. Wording only.
enum StudentSOSCopy {
    // Camera and Sent wording, shared with SOS · Camera (221:63493) and SOS · Sent (221:63509).
    static let takePhoto = "Take a photo of the problem"
    static let keepInFrame = "Keep the problem in the frame."
    static let liveOnly = "Live camera only. Gallery photos aren't accepted."
    static let sosSent = "SOS sent"
    static let toldKitchen = "We've told the kitchen team."
    static let sosSteps = ["Reported", "Team told", "Food held", "Checked"]
    static let messageWhenChecked = "You'll get a message when it's checked."
    static let feelingUnwell = "Feeling unwell? Tell a warden or call for help now."
    static let title = "SOS"
    static let pickOne = "What's wrong? Pick one."
    static let whichDish = "Which dish?"
    static let notListed = "Not on this list"
    static let whichMeal = "Which meal?"
    static let symptoms = "Symptoms"
    static let symptomsPrompt = "For example: stomach ache, vomiting"
    static let startedWhen = "When did it start?"
    static let startedPrompt = "For example: 1:30 PM"
    static let whereNow = "Where are you now?"
    static let whereNowPrompt = "Room, block or place"
    static let whereHappened = "Where did it happen?"
    static let whatHappened = "What happened?"
    static let needHelpNow = "I need help now"
    static let needHelpDetail = "Marks the SOS as needing help at once."
    static let needsHelpTag = "Needs help now"
    static func since(_ when: String) -> String { "since \(when)" }
    static let photoRequired = "A photo is required for this reason."
    static let photoRequiredCameraOff = "A photo is required for this reason. Turn the camera on in Settings to send it."
    static let nextPhotoOptional = "Next: add a photo"
    static let continueWithoutPhoto = "Continue without a photo"
    static let reviewNext = "Next: review"
    static let pickWhatsMissing = "Fill in what's marked to go on."
    static let required = "Required"
    static func placeLine(_ place: String) -> String { "Place: \(place)" }
    static let next = "Next: take a photo"
    static let footnote = "The food head and mess supervisor are told once it sends."
    static let noGPS = "No GPS · place not recorded"
    static let noGPSShort = "No GPS"
    static let placeNotRecorded = "Place not recorded"
    static let cameraOff = "Camera is off for MealLoop"
    static let cameraOffDetail = "MealLoop needs the camera for a live photo. Turn it on in Settings, or send without a photo."
    static let openSettings = "Open Settings"
    static let sendWithoutPhoto = "Send without photo"
    static let flagged = "It is sent flagged: the team will ask you for details."
    static let review = "Review SOS"
    static let checkProof = "Check the proof, then send."
    static let retake = "Retake photo"
    static let noPhoto = "No photo"
    static let cameraWasOff = "Camera was off · sent without photo"
    static let takenLive = "Taken live in the app"
    static func atPlace(_ place: String) -> String { "At \(place) (GPS)" }
    static let noGPSAsk = "No GPS · the team will ask where you are"
    static let noPhotoFlagged = "No photo · flagged for the team"
    static func timeRecorded(_ time: String) -> String { "Time recorded · \(time)" }
    static let sendSOS = "Send SOS"
    static let sending = "Sending…"
    static let tryAgain = "Try again"
    static let sendWhenOnline = "Send when online"
    static let offline = "You're offline. SOS sends the moment you're back. Tell the counter staff now."
    static let failed = "Couldn't send SOS. Try again, and tell the counter staff now."
    static let toldAtOnce = "Once it sends, the food head and mess supervisor see it with the place you gave."
    static let photoAttached = "photo attached"
    static let noPhotoTag = "no photo"
    static func placeAndPhoto(_ place: String, photo: Bool) -> String { "\(place) · \(photo ? photoAttached : noPhoto.lowercased())" }
    static let back = "Back"
    static let close = "Close"
}
