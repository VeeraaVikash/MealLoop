# Component hygiene · Brand audit A4 (2026-10-08)

Scope: the 135 components and sets on page 03. Edits were made only where a render proves them invisible. Data: shared plugin data `mealloop/a4_rows`.

## (a) Descriptions

131 of 135 had a description. The 4 empty ones were written (description fields do not render):

| Component | Description written |
|---|---|
| DatePill 349:1928 | Plate tracker day pill in DatePillStrip (04 / 05 / 07); Day and Date; State Default / Selected; Logged dot; 44 × 64. |
| StaffTopBar 1427:2333 | Archived first staff top bar, replaced by NavHeader + BackButton + StaffTabBar in the G run; instances only on 99. |
| MenuDishTile 1468:119999 | Admin menu tile for AD-5a (172 × 140): Kind Dish / Ticket / Add; Diet Veg / Egg / Non-veg. |
| PlateRingHero 1469:2051 | Admin plate ring per meal (protein / carbs / fat, kcal total, sample numbers); Meal Breakfast / Lunch / Dinner. |

Now 135 / 135 have a description. A5 adds "Deprecated: use …" to the deprecated ones.

## (b) Property naming

The file mixes two conventions for boolean and text properties:

| Convention | Examples | Components |
|---|---|---|
| Title Case (majority, the iOS kit style) | Show Icon, Show Back, Show Trailing, Show Close, Show Detail, Show Helper, Show Chevron, Show Note, Show Line, Show Category, Show Progress, Show Meta, Show Wordmark, Confirm Label | Button, NavHeader, GlassSheet, SettingsRow, FormField, DishRow, TimelineStep, ReportTicket, BentoTile, OnboardingPage, Alert, InlineError, EmptyState, HeroNumber, SlotChart, LockActions |
| Sentence case | Show fibre, Show lock, Show reason, Show adjusted, Show chevron, Show safety, Show status, Show pill, Show line, Show time, Show break, Show detail, Show delta, Show second row, Show meal, Show all messes, Show rule 3, Unserved value, Never served, Left on plates | KcalGauge, BentoTile (Show lock), ListRow, AuditRow, ShiftCounter, KitchenSeesBlock, ScopeSheet, RulesSheet, ShareBar, WasteBar |

BentoTile mixes both (Show Meta, Show Chevron, Show lock). Variant properties are consistent (State, Type, Kind, Size, Surface, Diet, Meal, Selected).

**Decision: not renamed.** A rename is invisible in the file, but the stored builders (sb2, rb8, hub5a and others in `tools/`) set properties by name, so a rename would break them. Proposed convention for new work: Title Case ("Show Reason"). Listed as OWNER.

## (c) Layout

**Fixed-size text boxes** (textAutoResize NONE inside a component, "fixed-height text frames"): 41 before.

| Component / text | Count | Result |
|---|---|---|
| ReportTicket Category | 2 | → auto height (kept) |
| IssueCard Title | 6 | → auto height (kept) |
| LockScreen Clock | 5 | → auto height (kept) |
| MacroRing Grams | 8 | → auto height (kept) |
| MessBadge Percent | 4 | → auto height (kept; 0 instances) |
| LiveDial Min | 1 | → auto height (kept) |
| OnboardingPage Title | 5 | **left fixed**: one variant would grow 41 → 82; in instances the box would shrink 82 → 41 |
| LockScreen Date | 5 | **left fixed**: auto height is 24, the box is 26 |
| LiveDial "Max · expected" | 1 | **left fixed**: on AD-2a / AD-2b instances the text wraps to two lines (18 → 36). Listed for B2 as a possible overflow. |
| MetricBadge Value | 2 | **left fixed**: 18 → 17 (0 instances) |
| ListRow Name, Inline layout | 2 | **left fixed**: the box fills the row height by design |

26 converted, 15 left. A conversion was kept only when the box size stayed exactly the same in the main component and no instance on 04 / 05 / 07 / 09 / 10 / 99 changed height (checked on 806 instance texts).

**Logged mistake and repair:** the first revert pass also caught the two ListRow Name texts in the Stacked layout, which were auto height before this stage, and set them to fixed. Those instances would have clipped long names (24 instead of 48 pt on AD-3d). They were restored to auto height in the same stage; long names read 48 pt again and every sample render is identical to the stage-start render.

**Proof:** 17 renders at scale 1 (04: Community frame with ReportTicket, IssueCard frame, lock-screen frame, Plate tracker with MacroRing; 07: ReportTicket and Onboarding frames; 10: ListRow, LiveDial and IssueCard frames; 09 MS-0 Sign in; and the 7 sets) were byte-identical before and after. Property bindings checked on ListRow, ReportTicket, LiveDial and NavHeader instances (Title, Subtitle, Show Back, Show Trailing, Show reason, Show chevron and text values): all match.

**Components without auto layout** (all are drawings or overlays, where absolute layout is expected): Symbol (55 icons), ScrollEdge, Skeleton, CrowdDial, HoldToConfirm, OnboardingArt, OnboardingPage, MealWash, LockScreen, Keyboard, KcalRing, PortionSlider, KcalGauge (4 of 8), PortionControl, MacroBar, ScrollEdgeFade, HeaderBackdrop, Viewfinder, ChartBar, CouponCard, MenuDishTile (1 of 4: Ticket), BigTicket.

**Hit areas at component level** (smallest variant height):

| Component | Smallest | Rule | Note |
|---|---|---|---|
| Button, GlassButton, FeedbackTag, CreditsChip, SearchField, EstimatePill, ListRow | 44 | 44 | pass |
| SegmentedControl, IntentChoice, SupportButton, ReasonPicker, RatingChoice | 48–52 | 44 | pass |
| DateChip, DatePill, TabSearchButton, CategoryRow, FeelingChoice | 62–74 | 44 | pass |
| HoldToConfirm, StaffTabBar | 56, 66 | 56 (staff) | pass |
| **MetaChip** Surface=Tappable / Selected | **30** | 44 | Under 44 at component level. On frames, the Final-3 H1 hit areas (44 pt invisible frames) carry the links, so the screens pass. A 44 pt hit area inside the component would be the clean fix (invisible, but it changes the chip's bounding box in every auto-layout row: VISIBLE risk → B9). |
| StatusPill 26, StepBar 32, CrowdLegend 26 | — | — | not tappable on their own (labels) |

## (d) Hidden layers with no visibility property

26 hidden layers are not bound to a boolean property or a variable, so nothing in the component can show them:

| Component | Hidden layers |
|---|---|
| MacroRing | 16 |
| DatePill | 2 |
| BigTicket | 2 |
| MealHero, CrowdRow, IdentityCard, DishPortionRow, MetricBadge, DemandRingCard | 1 each |

**Decision: not removed.** An instance can still override a hidden layer to visible, and deleting the layer would drop that override. Listed as SAFE-after-check for the owner (each one needs an instance scan first).

## (e) State coverage

Required where it applies: Default, Selected, Disabled (dashed or outlined, full opacity), Offline, Sending, Failed.

**Disabled look:** no Disabled variant, and no layer inside one, uses reduced opacity. Pass.

| Component | Has | Missing (where it applies) |
|---|---|---|
| Button | Default, Pressed, Disabled, Loading (= Sending) | Failed (shown by Toast / InlineError instead) |
| GlassButton | Default, Pressed, Disabled | — |
| IntentChoice | Default, Selected, Pending, Disabled, Sending | Failed, Offline (MealHero carries them) |
| FeedbackTag | Default, Selected, Disabled | — |
| DateChip | Default, Selected, Today, Disabled | — |
| FormField | Default, Focused, Filled, Error, Disabled, Locked | Offline |
| ReasonPicker, RatingChoice, FeelingChoice, CategoryRow, DatePill | Default, Selected | Disabled |
| MetaChip | On light / dark, Mono, Tappable, Selected | Disabled |
| SegmentedControl | Selected 1 / 2 / 3 | Disabled |
| TabSearchButton | Default, Selected | — |
| AmountField | Empty, Focused, Filled, Error | Disabled, Offline |
| SearchField | Empty, Typing, Offline | — |
| SupportButton | Support, Sending, Supported, Withdraw | Failed, Offline |
| IssueHero | Support, Sending, Supported | Failed, Offline |
| HoldToConfirm | Idle, Holding, Sending, Failed | Offline |
| CommentComposer | Empty, Typing, Near limit, Sending, Failed | Offline |
| MealHero | No response, Sending, Failed, Cutoff passed, Unavailable, answered states | Offline (the screens use OfflineBanner) |
| HeroActions | Default, Sending, Notified, Failed, Confirmed, Offline | complete |
| DecisionActions | Open, Sending, Saved, Failed, Offline, Read-only, Approve / Decline flows | complete |
| QuestionCard | Ask, All clear, Offline | — |
| ResultCard | Success, Offline, Hold, Stop | — |
| StatusTag | includes Sending, Failed, Offline | — |
| SettingsRow | Toggle On / Off, Link, Locked | — |

Missing states are reported only (adding variants is a visible addition no stage names).
