# KITCHEN · W8 spacing and checks (2026-10-19)

Scope: the 67 Kitchen frames in the five page 09 sections "Kitchen · …". Tools: `dschk` (contrast, mono, lime, backdrop, small, targets, truncation, overflow, raw, banned), `dsspace` (margins, band above the bottom bar, gaps, padding, rows), and a Kitchen word scan run inline.

## Results

| Check | Result | Notes |
|---|---|---|
| Contrast | min **5.72 : 1** (ink-secondary on canvas) | No text below 4.5 : 1 |
| Text under 12 pt | 0 | |
| Targets under 44 pt | 0 | Primary buttons 56 pt; Retry, Enter pills, segments, Add a dish and Add a note links ≥ 44 pt |
| Truncation / overflow | 0 / 0 | Everything wraps |
| Raw paints | 0 | Variables only; no new tokens |
| Missing OrbitBackdrop | 1 accepted | KS-3 · Sent for review is the full-lime success page (as Pass verified and Entry recorded) |
| Mono words | units only | "pieces" (and "6 pieces", "20 pieces") is a unit; "8 of 8" on Sent for review was set in mono and is now sans |
| Banned words (dschk list) | 0 | |
| "Needs attention" | 0 | |
| "Remind" | 0 | |
| "meals served" as a count label | 0 | Only "Recorded at the door. Not meals served." |
| Forecast beside the live count | 0 | No LiveCard page shows "forecast", "expected diners" or 860 |
| Remaining count | 0 | |
| Approve / supervisor actions in the Kitchen UI | 0 | No Approve, Reject, Start / End the meal, Change the plan, Close the case |
| Success without evidence | 0 | The Couldn't send row never says Sent. Seen appears only after the simulated receipt. Waiting appears only after Sent for review. Approved appears only on the approved past meal. |
| Lime > 3 elements | 19 frames, NEEDS REVIEW | During Homes and sheets 4–5 (lime chip + dot + pill + backdrop + AK, as K02 / K03 draw). SOS frames 6–9 (adds the SOS tab, badge and panel chips, as on the Pass Desk) |

## Spacing

| Rule | Result | Notes |
|---|---|---|
| One left margin | 20 | Other x values are fixed elements: hotspots, SOS tab (335), bottom bar (16), dialog (28), toast |
| Card gaps 8 / 12 / 16 / 24 | 8, 12, 16, 20, 24 | 20 is the Alerts page rhythm (as Door Scanner Alerts) |
| Card padding 12 / 16 / 20 | 20 / 20 and 16 / 16 cards | Chips (7 / 14), segmented controls (4), the plate-waste row card (6 / 16, a 56 pt row) and the bottom bar (10) are controls, not cards |
| List rows 52 or 56 | **fixed** | 42 rows were 57–61 pt → 56; 3 info rows were 53 → 52. Check and send and past-meal entries are 36 pt summary lines ("Line /"), as K08 / K09 / K10 draw them |
| Same role, same text size | yes | Titles 34, card headings 18, rows 17, secondary 15, numbers Hero Metric 52 / Metric 30 / Code 17 |
| Primary buttons 56 pt at the same y on result pages | yes | Meal ended while reporting and Sent for review: primary at y 754, secondary at 682 |
| Dead space above the bottom bar ≤ 24 | NEEDS REVIEW | Short pages are built as drawn (K01, K02, K05, K10–K13 all leave a band): Homes 65–230 pt, Alerts 126–397, Meal history 212–315, past meals 77–442, Me 170. Negative bands are scrolling pages (Record waste ×12, Two shortage reports, Couldn't send, Waiting, Edit and resubmit) |

## Fixes made

1. Rows to 56 and 52 (above).
2. Sent for review: "Dishes · 8 of 8" in sans.
3. Record waste — SOS tab: the tab moved from y 196 (over the first row's value) to y 118 (W7).
4. KitchenAlertRow Meal ended circle black as K12 (W7).

Snapshot st352 vs st351: all pages 0 (row heights and fills are not seen by the snapshot); starts 14.
