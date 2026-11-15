# iOS architecture map

Where new code goes in `ios/MealLoop`, and which file to open first. The decisions behind it are ADR-005 (FE-1 to
FE-6); the working rules are `.claude/rules/ios-architecture.md`. This page is a map, not a new decision.

## The layers

```
SwiftUI view                 Features/<Role>/<Screen>/<Role><Screen>View.swift
   ↓ reads state, sends intents
ViewModel (@MainActor @Observable)   Features/<Role>/<Screen>/<Role><Screen>ViewModel.swift
   ↓ calls
Repository protocol          beside the feature if one feature uses it; Data/Repositories/ if several roles do
   ↓ implemented by
Data source                  Data/Demo (seeded, Debug and Review only) or Data/Remote (Release)
```

A view never calls a repository and never builds a request. A ViewModel never decides a business rule (cutoffs,
duplicate entries, edit windows); the data source does.

## One feature, one folder per screen

```
Features/Student/
├── StudentRootView.swift          the tab shell of the role
├── StudentCopy.swift              wording shared by several screens
├── StudentStyle.swift
├── Home/
│   ├── StudentHomeView.swift
│   ├── StudentHomeViewModel.swift
│   ├── StudentHomeContent.swift   presentation models of this screen only
│   └── StudentExtrasRepository.swift   protocol used by this screen only
├── Meals/  Pass/  Feedback/  Community/  SOS/  Outing/  You/  Records/
```

- Roles with several screens and ViewModels (Student, Admin, Kitchen, Door Scanner, Pass Desk, Supervisor) have one
  folder per screen. Roles whose screens share one ViewModel (Gate, Guardian, Warden, Vendor, Super Admin, Entry) stay
  flat: a folder per screen would hold one file.
- Pieces shared by several staff roles (`StaffMePage`, `StaffHomeRow`, the meal summary) are in `Features/Staff/`.
- File names keep the role prefix (`StudentHomeView.swift`, not `HomeView.swift`). Swift refuses two files with the
  same name in one module, and Kitchen, Door Scanner, Pass Desk and Supervisor each have a Home.
- Screen-state classes end in `ViewModel` (`GateViewModel`, not `GateModel`).
- Models shared by more than one screen or crossing the network stay in `Domain/` (FE-5). A `<Screen>Content.swift`
  file holds presentation values for that screen only.

## Repositories

`Data/Repositories/Repositories.swift` defines the container, grouped by who reads it:

| Access | Holds | Used by |
|---|---|---|
| `repositories.meals`, `.mealState`, `.headcount`, `.entries`, `.intentions`, `.shortages`, `.wasteReports`, `.sos`, `.auth` | Shared dining operations | Nearly every role |
| `repositories.staffDirectory` | Names and shift times | Door Scanner, Pass Desk |
| `repositories.passes.special`, `.liveCodes`, `.use`, `.requests` | The special-meal pass | Student, Pass Desk, Admin |
| `repositories.outings.cases`, `.student` | Outings (one source) | Student, Guardian, Warden, Gate |
| `repositories.student.extras`, `.meals`, `.community`, `.you`, `.records`, `.spending`, `.rewards`, `.ratings`, `.dishFeedback` | Student-only screens | Student |
| `repositories.admin.people`, `.results`, `.students`, `.more`, `.messes`, `.votesRewards`, `.rewardCatalogue`, `.superAdmin` | Food Head and Super Admin screens | Admin, Super Admin |
| `repositories.vendor` | Vendor headcounts | Vendor |

A source that does not supply a group answers `NotConnected` (`Data/Remote/NotConnected.swift`): every call throws
`RepositoryError.notImplemented`, and nothing is faked as success. It is the one placeholder in the app.

## Networking (Release)

```
Repository protocol          for example HeadcountRepository
   ↓ implemented by
RemoteAPI                    Data/Remote/RemoteAPI.swift: what to call (path, body, Idempotency-Key) and DTO → Domain
   ↓ sends an Endpoint to
HTTPClient                   Data/Remote/HTTP/HTTPClient.swift: how (URLRequest, bearer credential, JSON, status codes,
   ↓                         typed HTTPError); knows nothing about meals or headcounts
URLSession → backend         docs/backend/openapi.yaml (0.2.0 draft; no server exists yet)
```

- Wire shapes live in `Data/Remote/RemoteDTOs.swift` and map to `Domain`. A response that breaks the contract (a
  `ready` forecast without diners) fails as `unavailable`; it is never patched into a number.
- `RemoteAPI.repositoryError` turns every `HTTPError` into the `RepositoryError` screens already render: no connection is
  `offline`, a timeout is `unavailable` ("did not answer in time"), a 409 is `notAllowed` with the server's reason.
  `409 already_recorded` on an entry is the result `alreadyRecorded`, not an error.
- The credential is opaque (ADR-005) and kept by `KeychainTokenStore` (`Data/Remote/HTTP/TokenStore.swift`).
- Open choices (address, retry, timeout, Keychain access, session expiry) are NET-1 to NET-12 in
  [`OPEN_DECISIONS.md`](../OPEN_DECISIONS.md).

## Composition root

`App/AppEnvironment.swift` is the only place that chooses a data source:

| Configuration | `AppEnvironment.make()` builds | From |
|---|---|---|
| Debug (`DEMO_DATA`) | `makeDemo()` | `DemoDataProvider.makeRepositories()` |
| Review (`REVIEW_DATA`) | `makeReview()` | `DemoDataProvider.makeRepositories()` |
| Release | `makeAPI(baseURL:)` | `RemoteAPI(client: HTTPClient(baseURL:credential:), tokens: KeychainTokenStore())` |

Screens get `AppEnvironment` from the SwiftUI environment and pass `environment.repositories` (or one repository from
it) and `environment.clock` into their ViewModel's initializer. Nothing else creates a repository: no static registry,
no singleton.

## Adding things

| To add | Put it in | Also |
|---|---|---|
| A screen | `Features/<Role>/<Screen>/` with its View and, if it has logic, its ViewModel | Wording in the role's `Copy` file; load through `LoadState` and `AsyncContentView` |
| A model used by several screens | `Domain/` | Teammate review; the OpenAPI schema if it crosses the network |
| A repository for one feature | `Features/<Role>/<Screen>/<Name>Repository.swift` | A property in that role's group in `Repositories.swift`, the demo implementation, a `NotConnected` conformance |
| A repository for several roles | `Data/Repositories/` | The same |
| An API call | The operation in `docs/backend/openapi.yaml` first (ADR-002), then an `Endpoint` in `RemoteAPI` and a DTO in `RemoteDTOs.swift` | A case in `RemoteAPIContractTests` checking the request and the mapping |
| Sample data | `Data/Demo/` only | Never in a view or `Domain/` |

## Dependency direction

`Features` depend on `Domain`, on repository protocols and on `DesignSystem`. `Data/Demo` and `Data/Remote` implement
those protocols, so they may import a feature's repository protocol file, never its views or ViewModels. `Domain`
imports no UI and no `Data`. `DesignSystem` and `Core` import no feature.
