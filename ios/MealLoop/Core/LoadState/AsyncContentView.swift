import SwiftUI

/// Renders a LoadState the same way on every screen:
/// loading, empty, failed with retry, stale (content with a note) and offline (banner, last saved content).
struct AsyncContentView<Value, Content: View>: View {
    let state: LoadState<Value>
    var emptyTitle: String = "Nothing here yet"
    var emptyMessage: String = ""
    var timeZone: TimeZone = .current
    let retry: () async -> Void
    @ViewBuilder let content: (Value) -> Content

    var body: some View {
        switch state {
        case .idle, .loading:
            LoadingStateView()
        case .loaded(let value):
            content(value)
        case .empty:
            EmptyStateView(title: emptyTitle, message: emptyMessage)
        case .failed(let failure):
            ErrorRetryView(failure: failure) {
                Task { await retry() }
            }
        case .stale(let value, let asOf):
            VStack(alignment: .leading, spacing: MLSpacing.s8) {
                StaleNote(text: "Updated \(MLFormat.time(asOf, in: timeZone)) · reconnecting")
                content(value)
            }
        case .offline(let value, let savedAt):
            VStack(alignment: .leading, spacing: MLSpacing.s12) {
                OfflineBanner(savedAt: savedAt.map { MLFormat.time($0, in: timeZone) }) {
                    Task { await retry() }
                }
                if let value {
                    content(value)
                } else {
                    EmptyStateView(title: "No connection", message: "Nothing saved on this phone yet.")
                }
            }
        }
    }
}
