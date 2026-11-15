import Foundation
import Security

/// Where the signed-in account's bearer credential is kept. The credential is opaque to the app (ADR-005): it is never
/// parsed, logged or shown, and the app never decides a role from it.
protocol TokenStore: Sendable {
    func read() async -> String?
    func save(_ token: String) async throws
    func clear() async throws
}

/// The device Keychain (ADR-005: iOS credentials go in the Keychain).
///
/// Accessibility is `afterFirstUnlockThisDeviceOnly`: readable by background refreshes once the phone was unlocked,
/// never synced to iCloud and never restored to another device. The exact access-control settings are an open
/// decision (docs/OPEN_DECISIONS.md, NET-3); change them only through that decision.
struct KeychainTokenStore: TokenStore {
    enum KeychainError: Error, Equatable {
        case status(OSStatus)
    }

    let service: String
    let account: String

    init(service: String = "in.mealloop.app.session", account: String = "access") {
        self.service = service
        self.account = account
    }

    private var query: [String: Any] {
        [kSecClass as String: kSecClassGenericPassword,
         kSecAttrService as String: service,
         kSecAttrAccount as String: account]
    }

    func read() async -> String? {
        var request = query
        request[kSecReturnData as String] = true
        request[kSecMatchLimit as String] = kSecMatchLimitOne
        var item: CFTypeRef?
        guard SecItemCopyMatching(request as CFDictionary, &item) == errSecSuccess,
              let data = item as? Data else { return nil }
        return String(data: data, encoding: .utf8)
    }

    func save(_ token: String) async throws {
        let data = Data(token.utf8)
        let update: [String: Any] = [kSecValueData as String: data,
                                     kSecAttrAccessible as String: kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly]
        let status = SecItemUpdate(query as CFDictionary, update as CFDictionary)
        if status == errSecItemNotFound {
            var add = query
            add.merge(update) { _, new in new }
            let added = SecItemAdd(add as CFDictionary, nil)
            guard added == errSecSuccess else { throw KeychainError.status(added) }
        } else if status != errSecSuccess {
            throw KeychainError.status(status)
        }
    }

    func clear() async throws {
        let status = SecItemDelete(query as CFDictionary)
        guard status == errSecSuccess || status == errSecItemNotFound else { throw KeychainError.status(status) }
    }
}

/// Holds the credential in memory only. For tests and for a build with no backend; nothing survives a relaunch.
actor InMemoryTokenStore: TokenStore {
    private var token: String?

    init(_ token: String? = nil) {
        self.token = token
    }

    func read() -> String? { token }
    func save(_ token: String) { self.token = token }
    func clear() { token = nil }
}
