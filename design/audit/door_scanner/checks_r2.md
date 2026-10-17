# DOOR-SCANNER pack v2 · D7 spacing and checks (2026-10-17)

Scope: the eight frames built in D6 (section "Door Scanner · Alerts and Me (pack v2)", page 09). The other 37 Door Scanner frames were not edited in this pass; their D7 results are in checks.md.

Tools: `dschk` (contrast, mono words, lime, backdrop, small text, targets, truncation, overflow, raw paints, banned words) and `dsspace` (margins, band above the tab bar, gaps, paddings, rows, title size), both stored as plugin data.

## Checks (before → after the fixes)

| Check | Before | After |
|---|---|---|
| Lowest text contrast | 5.72 : 1 (ink-secondary on canvas) | 5.72 : 1 |
| Words in mono | 0 | 0 |
| Frames with more than 3 lime elements | 0 | 0 |
| Lime text on a light surface | 0 | 0 |
| OrbitBackdrop missing | 0 | 0 |
| Text under 12 pt | 0 | 0 |
| Targets under 44 pt | 0 | 0 |
| Real truncation | 0 | 0 |
| Overflow | 0 | 0 |
| Raw (unbound) paints | 0 | 0 |
| Banned words ("decline", "approval", "sync") | 0 | 0 |

## Spacing

| Frame | Margin | Gaps | Card padding | Rows | Band above the tab bar | Result |
|---|---|---|---|---|---|---|
| Alerts — SOS active | 20 | 24 / 8 | 20 | 56 | 89 | NEEDS REVIEW (band) |
| Alerts — SOS claimed by you | 20 | 24 / 8 | 20 | 56 | 91 | NEEDS REVIEW (band) |
| Alerts — SOS checked by you | 20 | 24 / 8 | 20 | 56 | 167 | NEEDS REVIEW (band) |
| Alerts — During the meal | 20 | 24 / 8 | — | 56 | 368 | NEEDS REVIEW (short list) |
| Alerts — After the meal | 20 | 24 / 8 | — | 56 | 312 | NEEDS REVIEW (short list) |
| All alerts | 20 | 24 / 8 | — | 56 | 256 | NEEDS REVIEW (short list) |
| Alerts — Empty | 20 | 24 | — | — | 46 → **24** | fixed (empty state grown) |
| Me | 20 | 24 / 12 | — | 57 / 58 → **56** | 98 | rows fixed; band NEEDS REVIEW |

The hotspot frames (left 0) on Alerts — During and Empty are invisible simulated controls, not content, so they are not a second margin.

**Why the bands stay.** The spec limits Alerts to one SOS card and at most three quiet rows ("Nothing else"), and Me to a profile, two tiles and four rows. Filling the band would mean adding blocks or stretching rows past 56 pt or card padding past 20 pt, which the spacing rules forbid. As in the first run (decision 38), short lists keep their natural height and are listed under NEEDS REVIEW. D17 and D18 themselves leave about 46 pt and 38 pt above the bar at 393 pt.
