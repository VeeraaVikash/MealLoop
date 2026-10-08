# Brand rule V2 at component level · Brand audit A6 (2026-10-08)

Tool: `tools/brand16.js` (`mealloop/brand16`), run over the 130 live components and sets on page 03 (the 5 in "Deprecated" excluded). Instance children inside a component are included, because they render. Contrast uses WCAG 2 ratios. The background is the stack of box-like layers under the text (frames, rectangles, full ellipses; not ring arcs or vectors), composited down to the first opaque one, or to the canvas (#EDEDE8 Light, #111111 Dark) if none. Both ML Color modes are resolved. Raw data: shared plugin data `mealloop/a6_0`, `a6_1`, `a6_2`.

**No component was changed:** every finding below needs a colour change, which is visible.

## 1. The wash is a frame fill only

0 of 130 components contain a MealWash instance or a ScrollEdgeFade Style=Wash instance. **Pass.**

## 2. Where lime is used (components)

**Allowed by rule V2** (tickets, coupons, primary actions on black, the current step, Success, filled arcs and bars on black):

| Use | Components |
|---|---|
| Primary action on black | MealHero (I'm in, Skip, Not sure, Show entry QR, answer chip), HeroActions (Primary), QuestionCard (Primary · Call Ravi), IssueHero (Support) |
| Current step | StepBar (Current 1–4, both surfaces; the lime "Need more info" / "Reopened" label on the On dark surface), TimelineStep (Current node), IssueCard (Current 3), IssueHero (Current 3), AuditRow (node) |
| Success on black | ResultCard (icon, tag), DecisionActions (icon, tag), AtMessTile indicator |
| Filled arcs and bars on black | KcalGauge (knob, swatch, protein arc on the black card), TodaysPlateCard, PlateRingHero, DemandRingCard ("Said yes"), LiveDial ("Served so far", needle), PrepCard (protein on black) |
| Tickets, coupons, passes | BigTicket (colour pill, chip), CouponCard (tag), PassCard (Available tag), SpecialPassTile (lime dot), MenuDishTile Ticket (live dot) |
| Brand mark | Logo, AppWordmark, HomeHeader, NotificationRow, LockNotification, LockScreen (the lime loop of the logo glyph; brand identity, accepted) |

**Outside the allowed list** (lime on a light surface, not a ticket, coupon or current step). All are VISIBLE fixes → B9:

| # | Component | Lime element | Surface | Proposed fix |
|---|---|---|---|---|
| 1 | CommentComposer | Send button (Typing, Near limit, Sending, Failed) | white composer | Black button with white arrow (primary on light = black) |
| 2 | ReasonPicker, ScopeSheet | Selected radio fill | white | Black radio dot |
| 3 | HoldToConfirm | Progress fill | white track | Allowed only if the track is black; otherwise ink progress |
| 4 | KcalGauge | Progress arcs ×3 | white card | Arcs on white in ink; lime only on the black variant |
| 5 | CrowdLegend (On light) | Level bar ×3 | light | ink bar |
| 6 | SlotChart | "Now" bar | white | ink bar with a lime outline (current) or keep as "current step" (OWNER) |
| 7 | TimeRail | fill and "Now" dot | #D6D6D0 / white | as 6 |
| 8 | DateChip | Today dot (outlined lime) | white | ink dot |
| 9 | DatePillStrip | selected day (Wed) | light | ink |
| 10 | MealSectionHeader | "Serving now" state | light | ink pill (or treat as current step: OWNER) |
| 11 | PortionControl, PortionSlider | thumb while dragging | light | ink thumb |
| 12 | CreditsChip | points glyph | white chip | ink glyph |
| 13 | PrepCard | Status on white | white | as Success tint |
| — | WeekBars, StaffTopBar | current bar, on-shift dot | light | archive / page-03 only, no action |

## 3. No lime text on white

The only lime text in any component is the StepBar status label ("Need more info", "Reopened") in the **On dark** variants. 0 lime text on white. **Pass.**

## 4. Contrast 4.5:1, the 10 lowest pairs

**Light** (5 pairs under 4.5:1, all in the iOS lock-screen mock):

| # | Ratio | Component | Text | Colours | Note |
|---|---|---|---|---|---|
| 1 | 3.02 | LockScreen, Expanded | "MealLoop", "now" (13 pt) | #3C3C43 on white glass over the wallpaper | iOS system notification style, kept raw (A2) |
| 2 | 3.05 | LockScreen, Single | "MealLoop" | same | same |
| 3 | 4.38 | LockNotification | "MealLoop", "now" | #3C3C43 @ 60% on white | same |
| 4 | 4.88 | StatusTag Scanned / Saved / Fixed | label 13 pt | success on success-tint | passes 4.5 |
| 5 | 4.88 | VerificationCard Valid | "Valid for today's lunch" | success on success-tint | passes |
| 6 | 4.92 | OpenDecisionNote | "Open decision" 12 pt | warning on warning-tint | passes |
| 7 | 4.92 | SampleNote | "All data is sample" | warning on warning-tint | passes |
| 8 | 5.41 | DishRow Egg; IssueCard Need more info / Reopened | 12–13 pt | warning on white | passes |
| 9 | 5.48 | DishRow Veg | 13 pt | success on white | passes |
| 10 | 5.62 | InlineError, SafetyBanner, CategoryRow Urgent | 13–15 pt | urgent on urgent-tint | passes |

**Dark** (9 pairs under 4.5:1):

| # | Ratio | Component | Text | Colours | Note |
|---|---|---|---|---|---|
| 1 | **1.04** | HoldToConfirm, Idle / Holding / Failed | "Hold to use" (17 pt) and hand icon | on-lime (#111111) on surface (#161616) | **Real bug on 05:** "Pass · Confirm (failed)" shows the label black on near-black (no progress fill behind it), and on "holding" the end of the label runs past the lime fill. VISIBLE fix (token change) → B9, rank high |
| 2 | 2.26 | ResultCard Hold | tag "Scanned" | on-hero on ink-secondary (Dark #A3A39C) | Staff is Light-only; not reachable in Dark (n/a) |
| 3 | 3.02 | LockScreen Expanded | "MealLoop" | system grey | iOS mock |
| 4 | 3.05 | LockScreen Single | "MealLoop" | system grey | iOS mock |
| 5 | 3.09 | LockNotification | "MealLoop" | system grey | iOS mock |
| 6 | 5.96 | Button Primary Disabled; FormField Disabled; SearchField placeholder; DecisionActions Decline sending | 17 pt | ink-secondary on fill-quiet | passes |
| 7 | 5.96 | MealSectionHeader Served; CommentRow Pending | 13 pt | ink-secondary on fill-quiet | passes |
| 8 | 6.72 | MealHero meal line; HeroNumber eyebrow; ReportTicket title | 12–18 pt | on-hero-secondary on hero-bg | passes |

The full lists are in the plugin data; the tool reports the 3 lowest pairs per component.

## 5. StatusPill vocabulary

| Check | Result |
|---|---|
| Variants | Success, Hold, Stop, Offline, Sent, Lapsed: exactly the vocabulary. **Pass.** |
| Lapsed label | "Missed cutoff 11:30" on the live instances (UI label rule). **Pass.** |
| Labels in use | Success "You're in" ×15, Stop "Action taken" ×4, Hold "Vote closed" ×3, Lapsed "Missed cutoff 11:30" ×2, Hold "Closed Tue 13 Aug" ×1 (top-level instances on 04 / 05 / 07 / 09 / 10; nested pills inside other components keep their component labels) |
| Component default | Every variant's default Label is "On track" (a property default; overridden on all live instances). Cosmetic: OWNER may set per-variant defaults. |
| Status colours outside the vocabulary | StatusTag (3 live instances, 19 values such as Available, Expired, Not eligible, Wrong mess, Coming soon, Seen, Working on it) is a separate older component (see deprecations.md). |
