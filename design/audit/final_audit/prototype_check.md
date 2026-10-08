# Prototype (FA-7) · Brand audit B6 (2026-10-08)

Tools: `wire7` (manifest), `reach8` (reachability), plus an in-file walk of every DEMO.md step. Report only; no links changed.

## Flow starts

Exactly 7: Student · Sign in (07), Mess staff · Sign in (09), Admin · Sign in, Admin · Today, Admin · Issues, Admin · Insights, Admin · Manage (10). The 99 Archive copies carry none.

## Reachability (reach8)

| Page | Frames | Reached from the starts | Unreached states | Unreached gallery | Bugs | Dead ends |
|---|---|---|---|---|---|---|
| 07 | 262 | 165 | 79 + 3 (below) | 15 | **0** | 0 |
| 09 | 77 | 66 | 11 | – | 0 | 0 |
| 10 | 163 (+13 in AD-4f) | 98 | 65 | – | 0 | 0 |

The tool's name pattern listed three 07 frames as "bugs": Onboarding · Request correction — failed, Home · Crowd stale, Entry · Discrepancy — failed. All three are state screens (lower-case "failed" / "stale" is missed by the pattern), the same 82 states as Final-3 H6. Same numbers as Final-3: the A-stage edits kept every link.

## DEMO.md walk

Every step of the three walks was resolved to frames and each consecutive pair was checked for a link path in the file.

| Walk | Hops checked | Pass | Notes |
|---|---|---|---|
| Student (13 steps) | 31 | 31 | The checker first mis-read "I'm in" and the ⓘ sheet; the real hops were verified directly: Meals · Meal detail → Answer → Answer → Track this meal? (3 hops); Community · List → Community · Detail (1) |
| Mess staff (14 steps) | 32 | 32 | MS-A7 Can't scan? → MS-A2 Welcome (Wednesday pass) verified directly (1 hop) |
| Admin (15 steps) | 28 | 28 | |

"Pass" includes 13 checker artefacts where a button label resolved to the frame it sits on (for example "Me" on MS-G1 · Me); none is a missing link. **DEMO.md needs no repair** (C1 step 9: nothing to do).

## Wiring manifest (wire7)

| Page | Tappables | Linked | Current tab / view | Display only | Disabled | Phone call | Missing |
|---|---|---|---|---|---|---|---|
| 07 | 2,132 | 1,853 | 69 | 15 | 15 | 0 | 180 |
| 09 | 382 | 276 | 11 | 54 | 5 | 4 | 32 |
| 10 | 1,444 | 1,182 | 19 | 76 | 37 | 7 | 123 |

Change since the G12 manifest (07 171, 09 24, 10 123):
- **09 +8:** the demo Back on the eight staff homes (owner fix, 2026-10-07). Its link sits on the 56 pt "Back · hit area" layer, which the manifest does not count as the Back. Working; not a gap.
- **07 +9:** the Final-3 H1 hit areas carry links that the manifest still attributes to the visible control (Pass · Used Expand / Chevron and the other Pass states, Feedback · Pick dish chevrons). Working; not a gap.
- **10:** unchanged.

The rest are, as in G12, in-place controls (pick-one rows, segmented controls, toggles, avatars, the pressed button in a Sending state) or absent destinations (still_absent.md).

### Unlinked tappables whose destination exists (not already in still_absent.md)

| Page | Frame :: control | Existing destination | Class |
|---|---|---|---|
| 07 | Feedback · Pick meal :: "Dinner · Tue 13 Aug", "Lunch · Tue 13 Aug" rows | Feedback · Pick dish | OWNER (confirm intent; adding a link is invisible) |
| 07 | Spending · This week / This month / Saved / Offline :: expense row chevrons (4 / 2 / 4 / 5) | Edit expense | OWNER |
| 07 | You · Daily breakdown · goal on :: "All nutrients" row | You · Nutrients detail | OWNER |
| 07 | Meal detail (dinner) · Track this meal? :: chevron | Your plate · expanded (via Plate tracker · First run) | OWNER |
| 10 | AD-3d Community moderation :: 7 issue rows | AD-3c Issue detail (Dish feedback) is the only detail screen; a Community issue detail is absent | absent (still_absent) |
| 10 | AD-6d2 Pickup detail :: 4 dish rows | none | display only in practice |

None of these frames is unreachable, so none is "unreachable by bug": C1 step 8 has nothing to add.

## Dead chevrons, wrong Backs, Sending frames, orphaned sheets

| Check | 07 | 09 | 10 |
|---|---|---|---|
| Chevrons with no link on them or their row | 42 frames (mostly state copies: You-list rows on Request correction / Sent / Failed / Sign out ×11 each; Entry · Discrepancy ×14) | MS-C1 How much to cook ×3 | 26 sheets, 1–4 each (Rules, Scope, More nutrients, Type, Give access, Profile) |
| Backs that go to a fixed frame instead of Back | 18, all after a finished sequence (Pass · Live / Used → Home, Meal detail answers → Meals · Menu, Spending saved → You) | 8 (the staff-home demo Back → MS-1, accepted) | 8 (AD-6b / AD-7b result states → their list; AD-5a Breakfast / Dinner → Manage hub) |
| Wrong Backs | 0 | 0 | 0 |
| Sending / Saving / Verifying frames that don't advance | 0 | 0 | 0 |
| Sheets with no way in | 0 of 37 | – | 1 of 32: AD-3b2 Verify and close sheet (Failed), a state |
