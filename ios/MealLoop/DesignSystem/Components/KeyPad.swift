import SwiftUI

/// Number keypad shared by the role password, the Door Scanner "Type the last 4 digits" sheet and the Pass Desk.
struct KeyPad: View {
    var isEnabled: Bool = true
    let onDigit: (Int) -> Void
    let onDelete: () -> Void

    private let rows: [[Int]] = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

    var body: some View {
        VStack(spacing: MLSpacing.s12) {
            ForEach(rows, id: \.self) { row in
                HStack(spacing: MLSpacing.s12) {
                    ForEach(row, id: \.self) { digit in
                        key(digit)
                    }
                }
            }
            HStack(spacing: MLSpacing.s12) {
                Color.clear.frame(maxWidth: .infinity, minHeight: 72)
                key(0)
                Button(action: onDelete) {
                    Image(systemName: "delete.left")
                        .font(.system(size: 22))
                        .foregroundStyle(MLColor.ink)
                        .frame(maxWidth: .infinity, minHeight: 72)
                }
                .buttonStyle(.plain)
                .accessibilityLabel("Delete")
            }
        }
        .disabled(!isEnabled)
        .opacity(isEnabled ? 1 : 0.4)
    }

    private func key(_ digit: Int) -> some View {
        Button {
            onDigit(digit)
        } label: {
            Text("\(digit)")
                .font(.system(size: 24, weight: .medium, design: .monospaced))
                .foregroundStyle(MLColor.ink)
                .frame(maxWidth: .infinity, minHeight: 72)
                .background(RoundedRectangle(cornerRadius: MLRadius.compact, style: .continuous).fill(MLColor.surface))
        }
        .buttonStyle(.plain)
    }
}
