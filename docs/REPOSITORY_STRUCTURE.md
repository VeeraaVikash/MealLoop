# Repository structure

```
design/                      Figma design documentation (read only for app work; owned by the design runs)
docs/
  SCREEN_INVENTORY.md        Every exported screen and state, status, owner and priority
  REPOSITORY_STRUCTURE.md    This file
  OPEN_DECISIONS.md          Decisions the owner still has to make
  FOUNDATION_REPORT.md       What the foundation contains and what was verified
  adr/                       Architecture decision records
  backend/                   Backend proposal and the first-slice OpenAPI contract
ios/
  README.md                  How to build and run the iOS app
  MealLoop.xcodeproj         Xcode 16 project (folder-synchronised groups, shared scheme "MealLoop")
  MealLoop/
    App/                     Entry point, AppEnvironment (demo or api), root routing, AppClock
    Core/
      Navigation/            AppRouter, AppSurface, StaffTab, route enums
      LoadState/             LoadState<T>, LoadFailure, AsyncContentView
      Formatting/            Times, ranges, elapsed time, plain words for enums
    DesignSystem/
      Tokens/                MLColor, MLType, MLSpacing, MLRadius, MLSize
      Components/            Shared views (OrbitBackground, HeroCard, buttons, rows, StaffTabBar, KeyPad, state views)
    Domain/                  The one set of models and enums (no UI types)
    Data/
      Repositories/          Protocols shared by several roles, the grouped Repositories container, RepositoryError
      Demo/                  DemoSeed and DemoDataProvider (compiled only with DEMO_DATA in Debug or REVIEW_DATA in Review)
      Remote/                RemoteAPI (Release data source) and NotConnected, the one placeholder for unbuilt services
    Features/
      Entry/                 Welcome, Staff sign in, Sign in with SRM
      Shell/                 Role roots
      StaffEntry/            Retired role selection and shared password (Debug only, nothing opens it)
      Staff/                 Pieces shared by several staff roles (Me page, home rows, meal summary)
      Student/ Admin/ Kitchen/ DoorScanner/ PassDesk/ Supervisor/
                             One folder per screen (Home/, Meals/, Today/ ...): View, ViewModel, screen-only models
                             and any repository protocol only that screen uses
      Guardian/ Warden/ Gate/ Vendor/ SuperAdmin/
                             Flat: every screen of the role shares one ViewModel
  MealLoopTests/             Unit tests (XCTest)
```

`Features/Staff/` holds what several staff roles share, so it does not belong to any one role's folder. Where each kind of file goes, with examples: [`architecture/ARCHITECTURE_MAP.md`](architecture/ARCHITECTURE_MAP.md).

## Who owns what

| Folder | Owns | Changes need |
|---|---|---|
| `Domain/` | Every model and enum used by more than one screen | Review by one other person; update the OpenAPI file if the model crosses the network |
| `Data/Repositories/` and `*Repository.swift` in `Features/` | Repository protocols and the `Repositories` container | The same, plus the demo implementation and the `NotConnected` or `RemoteAPI` conformance in the same pull request |
| `Data/Demo/` | Seeded sample data and simulated behaviour | Each value cites its source document |
| `DesignSystem/` | Tokens and shared components | Values must exist in the design (Figma variables or the documented rules) |
| `Features/<Role>/` | That role's screens, view models, copy and feature-only repository protocols | The person assigned in `docs/SCREEN_INVENTORY.md` |

## Rules

1. **Features import Domain and never redefine models.** If a screen needs a new field, add it to `Domain/` once. No feature-local copy of `Meal`, `Shortage` and so on.
2. **Views never hold demo data.** A view gets every value from its view model, and the view model gets it from a repository. Interface wording lives in a `<Feature>Copy` enum; sample values live only in `Data/Demo/DemoSeed.swift`.
3. **Seeded data never reaches Release.** Everything in `Data/Demo/` is compiled only with `DEMO_DATA` (Debug) or `REVIEW_DATA` (Review). Debug and Review carry the Demo states sheet (Getting started, Switch role); it moves no time and replaces no data. Release has neither flag, and `App/AppEnvironment.swift` stops any build that breaks these rules.
4. **Missing is not zero.** Use `CountReading`, `Forecast`, `LeftoverMeasurement` and `PlateWasteMeasurement`. Never use a bare `Int` or `Double` for something that can be missing, and never default it to 0.
5. **Nothing fakes success.** Unbuilt actions open a "Not implemented" page; a service with no data source answers `NotConnected`, which throws `RepositoryError.notImplemented`; an offline write is an error, never a result.
6. **Every screen loads through `LoadState` and renders through `AsyncContentView`**, so loading, empty, error, stale and offline look the same everywhere.
7. **View models are `@MainActor @Observable`** and take repositories and an `AppClock` in their initialiser. Use the clock for "now", never `Date()` in a view model, so tests and the demo can fix the time.
8. **Tokens only.** No hex values, font sizes or spacing literals in feature code. If a value is missing, add a token after checking the design, and record anything measured rather than documented.
9. **Staff navigation is Home, Alerts and Me.** Push screens with `StaffRoute`; do not add a fourth tab.
10. **AI stays optional.** No AI service exists in the app; if one is added, nothing in a dining flow may depend on it.
11. **New files need no project edit.** Folders are synchronised with the targets. A new `.md` file inside `ios/MealLoop/` must be added to the target's exceptions so it is not copied into the app bundle.

## Pointers

- Build and run: [`ios/README.md`](../ios/README.md)
- Architecture: [`adr/ADR-001-ios-architecture.md`](adr/ADR-001-ios-architecture.md), [`adr/ADR-002-backend-shape.md`](adr/ADR-002-backend-shape.md)
- Backend contract: [`backend/openapi.yaml`](backend/openapi.yaml)
