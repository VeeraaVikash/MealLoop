# Run DOOR-SCANNER · pack v2 · final report (2026-10-17)

**Brief:** design/reference/door_scanner_2026-10/prompt/COWORK_PROMPT_DOOR_SCANNER.md (18-image version), spec data/door_scanner_spec.md (new section "Alerts and Me (kept short)"), images D01–D18 drawn at 292 pt (× 1.346).

**What this pass is.** The first DOOR-SCANNER run (report.md, D0–D9, st320–st328) had already built the Door Scanner role from the 16-image pack. In the resent pack, D01–D16 differ only by a signed metadata block; the drawings are identical. So this pass rebuilt only what is new: **Alerts (D17)** and **Me (D18)**. It then ran the checks, wiring, export and docs for those pages. Pass Desk, Kitchen and Supervisor screens and pages 05, 10 and 11 were not edited. Nothing was deleted.

**Commits.** By VeeraaVikash on claude/mealloop-ios-design-e9n1n5, with no co-author line, pushed after every stage. Flow starts were 14 at every snapshot, and no automatic start was created.

## Stages

| Stage | Result | Snapshot | Why / notes |
|---|---|---|---|
| D0 Preflight | done | st329 = st328 | HEAD 40fe234, push dry run OK; pack refreshed (18 images); the D01–D16 diff is metadata only (preflight_r2.md). |
| D1 Foundation | done | st331 (03 +2) | design_intent block "Alerts and Me (pack v2)"; SOSAlertCard and AlertRow flagged on 03. Decisions 42–46. |
| D2 Entry flow | skipped | — | D01–D03 unchanged; built in the first run (st322). |
| D3 Home | skipped | — | D04, D05, D12 unchanged; built in the first run (st323). |
| D4 Scan outcomes | skipped | — | D06–D10 unchanged; built in the first run (st324). |
| D5 Report and lists | skipped | — | D11, D15, D16 unchanged; built in the first run (st325). |
| D6 SOS, Alerts and Me | done | st332 (09 +39 −14 L+73 L−51; 99 +14) | 7 Alerts pages and Me in a new section; 3 old frames archived; 38 tab links retargeted by page state. The SOS claim flow is unchanged. Decisions 47–53. |
| D7 Spacing and checks | partly | st333 (0) | All checks are 0 on the 8 new frames. Fixed: Me rows (56 pt) and the Empty band (24 pt). Partly: the bands on the short lists and on Me are NEEDS REVIEW (checks_r2.md). |
| D8 Wiring, export, docs | done | st334 (0) | Reach 44 / 44, 0 dead ends, 0 dangling; 8 exports at 2×; contract, gaps 478–485, STATE, MASTER_CONTEXT, DEMO step 14, tools README. |
| D9 Report | done | st334 (no Figma change) | This file. |

## Functional, simulated, needs a backend (Alerts and Me; the rest is unchanged from report.md)

| Behaviour | In the Figma prototype | Product |
|---|---|---|
| Tab bar Home / Alerts / Me; Alerts tab opens the page for the current state | FUNCTIONAL (links per page state) | FUNCTIONAL |
| SOS card on Alerts; "I'll go and check" claims; card opens the panel | SIMULATED (the SOS is started by a hotspot; the claim is a link) | NEEDS BACKEND: SOS routing and claims (gaps 459, 478) |
| "Checked by the door · Ravi will close it" | SIMULATED | NEEDS BACKEND: the claim record; the case closes with the supervisor |
| Alerts feed (Problem seen, Meal started / ended, Meal ends soon, Breakfast closed) | SIMULATED (drawn rows; status-bar hotspots on During and Empty) | NEEDS BACKEND: the alerts feed (gap 478) |
| See all only when more than 3 alerts → All alerts → Back | FUNCTIONAL (link) | FUNCTIONAL (rule in the client) |
| Empty Alerts before the meal | SIMULATED (by page) | FUNCTIONAL once the feed exists |
| Me: Recorded in 714, Problems reported 1, On shift since 11:40 AM | SIMULATED (drawn) | NEEDS BACKEND: the shift record (gap 478) |
| Me: Switch role, Language, Help, Sign out | FUNCTIONAL (links to MS-1, MS-G4, MS-G5, MS-0) | FUNCTIONAL |

## Decisions made without asking (decisions_r2.md 42–53)

- **42** A delta pass only: D01–D16 are unchanged, so D2–D5 are skipped.
- **43** New flagged components:
  - SOSAlertCard and AlertRow.
  - Me reuses CountTile and StaffTabBar3.
  - SOSPanel is not reused, because its card part cannot hold the action button.
- **44** Circles are 44 pt (from the image × 1.346) and rows are 56 pt.
- **45** In the SOS line, words are in sans and the time is in mono.
- **46** The card has Claimed and Checked states as well as Not claimed.
- **47** New section "Door Scanner · Alerts and Me (pack v2)"; the old section is renamed "Door Scanner · SOS".
- **48** Alerts has seven pages, one per state.
- **49** Earlier rows are newest first. During the meal, "Breakfast closed · 10:00 AM" replaces "Meal ends soon · 1:50 PM" (one calendar).
- **50** D16 vs D17 problem status: both kept as drawn.
- **51** SOS card actions and the Home tab target per state.
- **52** Me:
  - Lime SK initials, as D18 draws them.
  - The tiles reuse CountTile.
  - The rows link to the shared Language and Help pages.
  - Sign out → MS-0 Sign in, because there is no splash frame.
- **53** The simulated hotspots on Alerts — During and Empty, with "Simulated:" notes.

## Conflicts between the brief and a rule

| Brief or image says | Rule | Done |
|---|---|---|
| D17 "Meal ends soon · 1:50 PM" on the page at 12:50 PM | One calendar; never invent data | During the meal the row is "Breakfast closed · 10:00 AM" (sample from the old Alerts page); "Meal ends soon" appears after the meal |
| D17 "SOS · 12:45 PM · 5 min ago" all in mono | Mono only for numbers, times and units | "SOS ·" and "· 5 min ago" in sans, the time in mono |
| D17 card padding about 24 pt at 393 | Card padding 12, 16 or 20 | 20 |
| D18 rows about 65 pt at 393 | List rows 52 or 56 | 56 |
| D17 / D18 "exactly as the image" (short pages) | Dead space above the bar at most 24 pt | Built as drawn; bands 89–368 left (NEEDS REVIEW, as decision 38) |
| Spec "36 pt circle"; D17 draws 43 pt at 393 | Image × 1.346 | 44 pt |
| D18 lime SK initials; the Home avatar is white (decision 7) | At most 3 lime elements | Lime on Me (2 lime elements); Home unchanged |
| "Sign out returns to the splash" | Never invent screens | MS-0 · Sign in (the flow start) |

## New gaps (prototype_gaps.md 478–485)

- **478** (backend): the alerts feed and shift numbers need a backend.
- **479** (NEEDS REVIEW): D16 Waiting vs D17 Problem seen.
- **480** (NEEDS REVIEW): the third Earlier row during the meal.
- **481** (NEEDS REVIEW): bands on the Alerts lists and Me (supersedes 471 for them).
- **482** (NEEDS REVIEW): lime initials on Me vs white on Home.
- **483** (Info): Sign out → MS-0.
- **484** (Info): shared Language and Help.
- **485** (NEEDS REVIEW): the extra Claimed and Checked Alerts states.

OWNER items are unchanged from the first run (458–464). Shared meal state and SOS routing need a backend. Also still open: the offline policy, last-4-digit ambiguity, who sees Entered without voting, whether Pass Desk and Kitchen adopt the SOS tab, and the shared role password.

## NEEDS REVIEW by frame name

- **DS-8 · Alerts — SOS active, — SOS claimed by you, — SOS checked by you:**
  - Bands of 89, 91 and 167 pt above the tab bar (481).
  - The third row is "Breakfast closed" (480).
  - Claimed and Checked are not drawn in D17 (485).
- **DS-8 · Alerts — During the meal:** a 368 pt band (481); "Breakfast closed" row (480).
- **DS-8 · Alerts — After the meal, DS-8 · All alerts:**
  - Bands of 312 and 256 pt (481).
  - "Problem seen" vs D16 Waiting (479).
- **DS-8 · Me:**
  - A 98 pt band (481).
  - Lime initials (482).
  - Tiles are white (surface), not D18's cream.
- **Still open from the first run:** the items in report.md (465–473; 471 now covers only Report a problem and Entered without voting).

## End checks

- **8 new frames:**
  - Contrast is at least 5.72 : 1.
  - Mono words, lime > 3, lime text on light, missing backdrop, text under 12 pt, targets under 44 pt, truncation, overflow, raw paints and banned words: all 0.
- **Reachability:** reach 44 / 44 on the Door Scanner family, 0 dead ends, 0 dangling. Page 09 is 97 / 107; the 10 unreached are other roles' states, unchanged.
- **Snapshot:** flow starts 14; snapshot st334.
- **Exports:** 8 at 2× in export_door_scanner/.
