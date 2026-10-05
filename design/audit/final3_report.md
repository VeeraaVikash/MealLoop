# Run FINAL-3 (small) · final report (2026-10-05)

Figma `nzzTAm9YnJRSdKEeYUWUEb`, branch `claude/mealloop-ios-design-e9n1n5`. Six stages. Each opened with a full-walk snapshot equal to the previous end (st214 → st225), closed with a diff of frames, links and flow starts, and was committed and pushed. No stop condition was hit. The file has exactly the 7 allowed flow starts.

## Stages

| Stage | Result | Snapshot | What changed | Doc |
|---|---|---|---|---|
| H1 Hit areas | done | st214 → st215 | **Hit areas:** 81 invisible 44 pt hit areas (07: 26, 10: 55), links moved onto them; controls unchanged. **Dish rows:** 99 menu DishLine rows grown 36 → 44 pt (04 / 05 / 07). **Layout:** the AD-4d chip row padded to 44 pt; the AD-4d Back unclipped. | hit_areas.md |
| H2 Truncation | done | st216 → st217 | Home · Crowd stale "Show at the counter" wraps to two lines; the tile grows 80 → 85 pt; font unchanged at 13 pt (04 / 05 / 07 and the full-scroll copies). | run_status.md |
| H3 Credits name | done | st218 → st219 | **Frames:** 40 student strings now read Credits (Rewards titles, "Rewards are coming soon", "Rewards history", the You tile). **Component:** CreditsChip "Rewards soon" → "Credits soon", plus its doc note and 1 canvas note. **Admin** keeps Rewards. | credits_rename.md |
| H4 Exceptions | done | st220 → st221 (no Figma change) | **Rules:** design_intent rule 9a (empty states exempt, with reasons) and rule 9b (AD-2b accepted). **Gaps:** 327–341 recorded; 313, 323, 327, 328, 329, 332, 333 and 334 closed. | design_intent.md, prototype_gaps.md |
| H5 Handoff files | done | st222 → st223 (no Figma change) | PROJECT_CONTEXT.md (11 sections) and STATE.md created (they were absent); the three owner decisions appended. | PROJECT_CONTEXT.md, STATE.md |
| H6 Final checks | done | st224 → st225 (no Figma change) | iOS check, fill check and reachability re-run (below); rule 9a extended to the loading and typing states the fill tool already skipped. | this file |

## H1 · 44 pt targets, all layer names (tgt14)

| Page | Before | After |
|---|---|---|
| 07 | 36 | **0** |
| 09 | 0 (3 under the 56 pt staff rule) | **0** (the same 3: status-bar time skips, a demo shortcut) |
| 10 | 55 | **0** |

**Before, by layer name:**
- **07:** Pill 10, Dish row 10, Segment 6, Expand 4, Chevron 4, Grabber 1, Estimate pill 1.
- **10:** Pill 26, Scope 10, Updated 7, Icon 6, Votes 5, Chip 1.

**Overlaps:** no hit area overlaps another. On the AD-1a Offline frame the info and chevron hit areas reach 9 pt into the tab bar at rest; the fixed tab bar stays on top.

## H6 · iOS check (ios13)

| Check | 04 | 05 | 07 | 09 | 10 |
|---|---|---|---|---|---|
| Frames | 300 | 300 | 262 | 77 | 176 |
| Tab roots with Back | 0 | 0 | 0 | 0 | 0 |
| Tab bar ≤ 5 items, navigation only | 4, ✓ | 4, ✓ | 4, ✓ | 3, ✓ | 4, ✓ |
| Sheets without grab handle / Close | Same exceptions as G13 (2 iOS alerts; Pass confirm ×3 with Cancel; Reminder prompt with Not now) | same | same | – | 0 / 0 (33 sheets) |
| Targets under 44 pt (staff 56) | – (no links) | – | **0** (was 36 in G13's narrower check) | 3 time skips (logged) | **0** (was 55) |
| Status bar / home indicator clear; scrolling frames pin them | ✓ | ✓ | ✓ | ✓ | ✓ |
| Real truncation (H2, trunc13) | 0 | 0 | 0 | 0 | 0 |
| Drag gestures near the left edge | none | none | none (Portion drag starts at x 36) | none | none |

## H6 · fill check

| Page | Under 75% | Covered by rule 9a / 9b | Left open |
|---|---|---|---|
| 07 | 39 | 27 one-message, loading and typing states (rule 9a) | **12 list screens** (gap 330): Recheck · Inbox 70, Pass · Available 61, Feedback · Pick meal 73 / Pick dish 74 / Recheck 71, Rewards history 72, Help 60, Community · Archived 69, Search · Menu result 56, About 58, Daily goal 58 ×2 |
| 09 | 0 | — | 0. Five task frames read 70–73% against the home indicator, but 77–88% against their fixed bottom action, which is the rule's reference. |
| 10 | 2 | AD-8c No results 57% (rule 9a), AD-2b 65% (rule 9b) | 0 |
| 10 AD-4f section | 0 of 13 | — | 0 |

## H6 · reachability (reach8) and Sign in walks

| Page | Frames | Reached from starts | Unreached (all states or gallery) | Dead ends |
|---|---|---|---|---|
| 07 | 262 | 165 | 97 (82 states + 15 gallery cards) | 0 |
| 09 | 77 | 66 | 11 states | 0 |
| 10 | 163 (+13 in the section) | 98 (+13; the Sign in walk reaches 111) | 65 states | 0 |

These are the same as G12, so the hit areas kept every link.

**Sign in walks:**
- **Student:** Sign in → Home (4 hops); Meals · Menu (5); Credits (5); Ticket · Juice (6); Community info sheet (6).
- **Staff:** Sign in → Supervisor home (5); Confirm hold done, F3 (9); Pass problem sent, B7 (7).
- **Admin:** Sign in → Today (3); Notifications (5); Weekly report (6); Redemptions (6, through the new Redemptions pill hit area).

## Decisions and conflicts

1. **Hit areas are invisible top-level frames** named "… · hit area 44 pt". They sit in the fixed group when the control is in a fixed bar, otherwise just under it, so they scroll with the content. The visible control keeps its size and look, as the brief asked.
2. **Two cases needed more than a hit area:**
   - *AD-4d Dish-wise chip:* it sits inside a 30 pt clipped horizontal scroller, so the row was padded to 44 pt. The chip itself is unchanged.
   - *AD-1a info and chevron:* they are 8 pt apart, so the two hit areas split at the midpoint, 44 pt each.
3. **Staff 56 pt rule:** the three status-bar time skips (393 × 54) stay as a logged demo shortcut. A 56 pt hit area would overlap the Back's 56 pt hit area below it.
4. **Menu dish rows** grow through instance padding (6 → 10). The DishLine component is unchanged, because its default 56 pt rows are used elsewhere.
5. **You tile label:** set to "Credits" as the brief says. The Label/Eyebrow style uppercases it, so it shows CREDITS, matching SPENDING, ATTENDANCE and REPORTS (logged).
6. **Frame and layer names keep "Rewards / Offer"** so links and tools keep matching. Only on-screen strings changed.
7. **PROJECT_CONTEXT.md and STATE.md were missing:**
   - Neither the repo nor its history ever had them, so they were created rather than rewritten.
   - Sections 3 (owner's taste) and 10 (lessons) carry the owner's notes from design_intent.md and the lessons in the run logs. **NEEDS REVIEW:** if the owner has an older copy elsewhere, merge its taste and lessons sections in.
8. **Also fixed:** a G8 bug where the AD-4d round Back was clipped by its row.

## Sample data

No new sample data. H2 and H3 changed only layout and words.

## Components

| Change | Component | Stage |
|---|---|---|
| Edited | CreditsChip: "Rewards soon" → "Credits soon"; Doc / CreditsChip note | H3 |
| Instance overrides only | DishLine (padding 10 on 99 menu rows), Special pass tile (text wraps on Home · Crowd stale) | H1, H2 |

No components added or deprecated in this run.

## Gaps

- **Closed this run:**
  - 313 (staff results, superseded and rule 9a);
  - 323 (re-verified);
  - 327 (Credits);
  - 328 (AD-2b, rule 9b);
  - 329 (AD-8c, rule 9a);
  - 332, 333 (targets);
  - 334 (truncation).
- **New gaps:** none.
- **Still open:** 330, 331 and 335–341, plus the earlier owner items (303 / 312, 304, 315). See prototype_gaps.md.

## Open decisions for the owner

1. **iOS 27 kit:** none was available, so the file uses the iOS 26 Liquid Glass components. Swap StatusBar, HomeIndicator, NavHeader, GlassButton, GlassSheet and the tab bars when a kit exists?
2. **Turnout and reasons page:** build the in-app Insights screen (three turnout groups plus reasons), or keep it in the weekly report only?
3. **Admin coupon wallet:** a per-student view of coupons issued, used and outstanding. Is it needed, and what may it show under the privacy rules?

Renders: final3/h1, final3/h2, final3/h3.
