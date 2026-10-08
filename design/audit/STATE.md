# MealLoop · STATE (2026-10-08, after the brand audit)

The short "where are we" card. The full context is in `PROJECT_CONTEXT.md`, the rules are in `design_intent.md`, and the run logs are in `run_status.md`.

- **Figma:** `nzzTAm9YnJRSdKEeYUWUEb`.
- **Branch:** `claude/mealloop-ios-design-e9n1n5`. Commits are authored by VeeraaVikash, with no co-author line.
- **Last snapshot:** st240 (2026-10-08, end of the brand audit). Snapshots are stored in shared plugin data `mealloop/st###_<page>`. Each stage must start equal to the previous stage's end.
- **Flow starts (exactly 7):**
  - 07: Student · Sign in.
  - 09: Mess staff · Sign in.
  - 10: Admin · Sign in, Admin · Today, Admin · Issues, Admin · Insights, Admin · Manage.

## Frames

| Page | Phone frames | Role |
|---|---|---|
| 04 Student Light | 300 | Student design source |
| 05 Student Dark | 300 | Dark twin; the Dark mode (collection 45:2, mode 45:1) is set on each frame |
| 07 Prototype & QA | 262 | Student prototype and state gallery (no start) |
| 09 Mess Staff | 77 | Staff design and prototype |
| 10 Admin | 163 + 13 (AD-4f section) | Admin design and prototype, plus 9 A4 report page components |
| 99 Archive | 153 | Replaced frames, links stripped |

## Health (latest checks)

| Check | Result | When |
|---|---|---|
| Targets, all layer names | 0 under 44 pt on 07 / 09 / 10. Staff: only the 3 status-bar time skips are under 56 pt (a demo shortcut). | Final-3 H1 |
| Real truncation | 0 on all phone pages (1,499 texts with truncation turned on, all fitting) | Final-3 H2 |
| Student balance strings | All read "Credits"; admin reads "Rewards" | Final-3 H3 |
| Fill floor | Exemptions written down (rule 9a, empty states; rule 9b, AD-2b). 12 student list screens are still open (gap 330). | Final-3 H4 |
| iOS check | 0 tab roots with Back; tab bars 3–4 items, navigation only; 0 targets under 44 pt; status bar and home indicator clear on all pages | Final-3 H6 |
| Fill | 07: 12 list screens under 75% (gap 330); 09: 0; 10: 0 open (AD-8c is covered by rule 9a, AD-2b by rule 9b) | Final-3 H6 |
| Reachability | 07 165 / 262, 09 66 / 77, 10 98 / 163 + 13 in the section; 0 bugs, 0 dead ends; the three Sign in walks pass | Final-3 H6 |

## Brand audit (2026-10-08)

- Report: `brand_audit_report.md`; checklist: `RELEASE_CHECKLIST.md`; detail: `final_audit/`; exports: `export/` (27 at 2×).
- Page 03 now ends with the **Deprecated** section (5 zero-instance components) and the **Brand sheet · new** board.
- Invisible fixes made: 28 paints bound to tokens, 132 text styles applied, 4 descriptions, 26 text boxes to auto height.
- Top VISIBLE items: mono words on 04 / 05 (gap 342), HoldToConfirm in Dark (gap 343), ink-secondary on black (gap 344). Gaps 342–355 are new.

## Where things are

- **Gaps:** `prototype_gaps.md`; the latest is 355.
- **Controls with no destination yet:** `still_absent.md`.
- **Demo walks:** `DEMO.md`.
- **iOS checklist:** `ios_checklist.md`.
- **Reports:** `final2_report.md` and `final3_report.md`.

## Open decisions for the owner

1. **iOS 27 kit:** none was available, so the file uses the iOS 26 Liquid Glass components. Swap them when a kit exists?
2. **Turnout and reasons page:** build an in-app Insights screen (three turnout groups plus reasons), or keep it in the weekly report only?
3. **Admin coupon wallet:** a per-student view of coupons issued, used and outstanding. Is it needed, and what may it show?

## How to resume

1. Take a snapshot of all 14 pages and compare it with the last stored snapshot (snaptool). Stop if they differ.
2. Keep the seven flow starts. Reset the starts after any link edit.
3. Work in chunks of about 90 frames, since each call times out at 60 s.
4. After each stage: render at scale 1, take the snapshot diff (frames, links, flow starts), commit, push, and add a row to `run_status.md`.

## Done 2026-10-07 (owner requests)

1. **AD-5a Menu:**
   - "+" (Add dish) moved from 20, 54 (on top of the Back) to the top-right at 333, 58 on Lunch, Breakfast, Dinner, Empty and Offline. The Back is visible again.
   - A scan of 04 / 05 / 07 / 09 / 10 found no other control on top of a Back.
2. **Staff homes:** the eight MS-H homes have a demo Back at 16, 58, with a 56 pt hit area that goes to MS-1 Pick your job.
   - Header and content moved down 44 pt.
   - Door scanner, Door scanner (Empty) and Pass desk now scroll with fixed bars.
   - The last card clears the tab bar by 20 pt on all eight.
   - Logged in design_intent.md as a demo exception.
3. **Page 05:** removed a stray prototype link (Issue hero on "Community · Suggestion · Me too Offline") and the "Flow 1" start Figma had added with it. The file is back to exactly 7 starts.
4. **Snapshot:** st228. Renders are in owner_fixes/.

## Still queued

- **iOS 27 swap** (agreed: keep 393 pt; our own tab bars on the iOS 27 glass).
  - The library is added, but the connector can't import from it ("Not permitted to upsert").
  - Waiting on the owner to place one instance each of these on page 03, in a frame named "iOS 27 kit": Status bar - iPhone 17 Pro, Home Indicator, Tab Bar - iPhone, Sheet - iPhone, Grabber, Button - Liquid Glass - Symbol, Alert, Action Sheet.
