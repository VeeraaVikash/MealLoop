# DOOR-SCANNER · D7 spacing and checks (2026-10-17)

Scope: the 40 Door Scanner frames on page 09 (sections Entry and password, Home, Scan outcomes, Report and lists, SOS, Alerts and Me) plus the shared MS-1 Choose your role. Tools: `dsspace` (gvspace on a list of frame IDs; mixed corner radius and mixed font size tolerated) and `dschk` (gvchk / x9chk on a list of frame IDs), both in shared plugin data.

## Spacing: before → after

| Frame | Band above tab bar / safe area (≤ 24) | Other fixes |
|---|---|---|
| MS-1 · Choose your role | 168 → 16 | gap 16 → 24; RoleRow vertical padding 20 → 36 (rows 136 pt, large targets) |
| DS-0 · What you do (sheet) (page behind) | 168 → 16 | same as MS-1 |
| DS-0 · Password — Door Scanner / Pass Desk / Kitchen Staff / Supervisor | 130 → 22 | KeyPad **Tall** variant (keys 80 pt, added to the component); gap 16 → 24; code boxes 72 → 84 |
| DS-0 · Password — Wrong | 90 → 16 | KeyPad Tall; code boxes 72 → 82 |
| DS-0 · Password — Locked | 104 → 16 | KeyPad Tall; gap 16 → 24 |
| DS-1 · Home — Before the meal | 132 → 16 | ScannerCard (Before) grows 328 → 444 (main element) |
| DS-1 · Home — After the meal | 134 → 16 | Meal ended card padding 24 → 20; the card grows (space above the final count) |
| DS-1 · Home — Camera denied | 82 → 16 | ScannerCard (Camera denied) grows 252 → 318 |
| DS-1 · Home — During / Low light / SOS / Offline | 10 / 10 / 10 / 18 | none needed |
| DS-3 · result pages (Entry recorded ×2, Already, QR not recognised, Wrong meal, Can't check, Meal ended) | 8 | primary button 56 pt at y 754 on every result page; secondary at y 682 |
| DS-3 · Can't check right now | 8 | content gap 20 → 16 |
| DS-3 · Info cards (Already, Wrong meal, Can't check, Meal ended) | — | card padding 8 → 12; rows 52 / 53 → 52 |
| DS-6 · Open problems (both) | 12 | rows 77 → 56 (two-line rows, centred) |
| DS-6 · Entered without voting — During | 288 → 295 | rows 56 / 63 → 56 (NEEDS REVIEW: band) |
| DS-8 · Alerts — Empty | 430 → 16 | empty card padding 32 → 20; the card grows (main element) |
| DS-8 · Alerts / Me | 159 → 208 / 223 → 293 | rows 72–93 → 56; Me "Switch role" hint shortened to one line (NEEDS REVIEW: band) |

**Margins:** one left margin (20) on every frame (the extra values in the raw audit are hotspots and the SOS tab).
**Card gaps:** 12 (Home), 16 (lists, sheets), 24 (results, password, role selection). **Card padding:** 12, 16 or 20 everywhere (the 7/14 value is the meal chip, not a card).
**List rows:** 52 (info cards) or 56 (lists, After-meal rows). The Home "Report a problem" card is 76 (44 pt circle + 2 × 16 padding), drawn as a card in D05.
**Centred result pages:** ResultScreen is 353 wide at x 20 on every result page (one centre axis, x 196.5).
**Same role, same size:** page titles 34 (ML/Large Title) on every Door Scanner page; subtitles 15; result titles 34.

## Checks (dschk, 40 frames, 639 texts)

| Check | Result |
|---|---|
| Contrast | lowest **5.51 : 1** ("Wrong password. 2 tries left.", urgent on canvas); 0 under 4.5 |
| Words in mono | 0 (MEAL ENDED and the SOS "min ago" set in sans) |
| Text under 12 pt | 0 |
| Targets under 44 pt | 0 |
| Truncation | 0 |
| Horizontal overflow | 0 |
| Unbound paints | 0 |
| OrbitBackdrop missing | only DS-3 · Entry recorded and Entry recorded — No meal response (full lime, allowed) |
| Lime > 3 | **5 frames with the SOS tab**: Home — During · SOS active (6), SOS panel — Not claimed (7), SOS panel — Claimed by you (6), Home — SOS claimed by you (4), Marked as checked (6). The checker counts the MealLoop logo's lime mark and the three lime parts of the spec's SOS tab (outline, badge, icon) separately. Conflict between the spec and the rule; NEEDS REVIEW. Low light was fixed (torch-on is now white). |
| Banned words | 0: no "decline", no "approval", no "sync" / "queued", no kcal or cook amounts (639 texts searched) |
| Success on an unverified entry | none: Entry recorded is reached only from the simulated "recorded" answers (camera zones, Record entry, picking Dev). Offline paths end on Can't check right now or on the new **Type the last 4 digits — Offline** sheet (Record entry disabled). |

## NEEDS REVIEW (not safe to auto-fix)

- **DS-5 · Report a problem** (band 189) and **Sent to Ravi (toast)** (38): three ProblemOption cards as drawn in D11, no tab bar; growing the cards to fill would make each about 180 pt tall.
- **DS-6 · Entered without voting** (148) and **— During the meal** (295): lists with a few rows; nothing to grow.
- **DS-8 · Alerts** (208) and **DS-8 · Me** (293): short lists.
- **Lime on the SOS frames** (above).
