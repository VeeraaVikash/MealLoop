# SUPERVISOR · U8 spacing and checks (2026-10-19)

Scope: the 45 Supervisor frames (SV-0 … SV-7) in the four page 09 sections "Supervisor · Entry and Home" (11), "Supervisor · Alerts, shortages and waste" (13), "Supervisor · SOS" (6) and "Supervisor · Me and history" (16), minus the section labels. Tools: `dschk` and `dsspace` (as in the Door Scanner, Pass Desk and Kitchen runs) plus an inline meaning-rule scan of every visible text and instance. Frame list in plugin data `mealloop/sv_all`.

## Checks

| Check | Result | Notes |
|---|---|---|
| Contrast | min **5.72 : 1** (ink-secondary on canvas) | No text below 4.5 : 1 |
| Text under 12 pt | 0 | |
| Targets under 44 pt | 0 (after fix) | 4 hidden demo hotspots were 120 × 32; moved into the status bar at 120 × 54. Buttons 56 pt, dialog actions 64 pt, rows 52–56 pt, View report link 44 pt |
| Truncation / overflow | 0 / 0 | Lunch Wed 14 · Recorded is a scrolling frame (8 dishes) |
| Raw paints / new tokens | 0 / 0 | |
| OrbitBackdrop | 45 / 45 | |
| Mono words | units only | "pieces" (12 pieces, 6 pieces) |
| Banned words (dschk list) | 0 | |
| Waste: forward, approve, review, edit, return | **0** | No action buttons on any waste page; "Read only. The kitchen records this report." |
| Forecast beside the live count | **0** | No frame has both FORECASTED / expected diners and LIVE / students entered |
| Zero for missing data | **0** | Every "0" is a real count (Active shortages 0) or a confirmed zero ("0 kg · none left"); missing counts say "Unavailable", missing reports "Not recorded" |
| Pill-style status | **0** | Status is StatusText (dot + text) everywhere; the SOS card chips are the shared SOS case state (NEEDS REVIEW, decision 6) |
| "Close case" outside the Supervisor | **0** | Page 09 scan |
| Remaining count, "meals served" | 0 / 0 | "Unserved food" is the pack's label for leftovers |
| Lime > 3 elements | 10 frames, NEEDS REVIEW | In-service Homes (lime chip, live dot, backdrop, + tab) and SOS frames (6–8 with the tab, card dot and chip), as on the other staff roles |

## Spacing

| Rule | Result | Notes |
|---|---|---|
| One left margin | 20 | Other x values: dialogs (16), SOS tab (335), toast, hotspots |
| Card gaps | 0 / 12 / 16 / 24 | |
| Card padding | 20 | SOS chip 7 / 14 is inside the shared card |
| List rows 52 or 56 | **fixed** | Me rows were 57, Meal history rows 60, Past meal Final entries 60 → all 56; summary rows 52; read-only dish lines 44 (not tappable, decision 22) |
| Same role, same text size | yes | Large Title 34 on every page; Body 17; Secondary 15 |
| Dialogs identical in size and position | **fixed** | ConfirmDialog Lines=1 now has the Lines=2 body height: all four dialogs 361 × 189 at x 16, y 332 |
| Dead space above the bottom bar ≤ 24 | NEEDS REVIEW | As drawn in the pack (S07, S09, S16, S18 leave the lower half empty): Homes 143–178, Alerts 26–480, Me 167, history 229–331, waste 98–385 |

Snapshot st372 = st371 (0 differences): the snapshot tool records names, texts, links, starts and frame sizes; the padding, minimum-height and hotspot-position fixes above do not register in it.
