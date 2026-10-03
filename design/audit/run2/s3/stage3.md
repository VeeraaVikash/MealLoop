# Stage 3 · Student mechanical (run 2)

Start snapshot `st141` (= `st140` on all 14 pages). End snapshot `st142`. Tools: `tools/scr52.js`, `tools/din77.js`, `tools/wb105.js` (stored as `mealloop/scr52`, `din77`, `wb105`).

## (a) Gap 52 · Overflow frames get the scroll treatment

Recount at the start (page 07, last visible item past R9b clearance, frame not scrolling): 16 frames. Nine are screens and seven are sheet backgrounds.

**Fixed (9, page 07):** the R9 + R9c inline-title pattern from Meals · Meal detail (`221:62964`):
- the MealWash layer becomes the fixed frame-fill wash (bound `wash/top` → `wash/clear` at 300 pt);
- HeaderBackdrop and ScrollEdgeFade `Style=Status` ("Top edge fade") are cloned in above the content;
- `overflowDirection = VERTICAL`, and every layer except the content is fixed;
- the content's bottom padding gives R9b clearance.

| Frame | Id | Bottom padding | Scroll range | Last item at max scroll | Clearance |
|---|---|---|---|---|---|
| Feedback · Step 2 · Not good | 221:63337 | 188 | 72 | 664 | 20 pt above the Send footer (684) |
| Feedback · Sending | 221:63365 | 188 | 72 | 664 | 20 pt above the footer |
| Feedback · Failed | 221:65404 | 188 | 21 | 664 | 20 pt above the footer |
| Report · My reports | 221:63573 | 124 | 32 | 728 | 20 pt above the tab bar |
| Report · Fixed | 221:63606 | 124 | 111 | 728 | 20 pt |
| Rewards | 221:64313 | 124 | 80 | 728 | 20 pt |
| Rewards · Offline | 221:65917 | 124 | 140 | 728 | 20 pt |
| Settings · System off | 221:65964 | 124 | 26 | 728 | 20 pt |
| Notifications · Offline | 221:66026 | 124 | 51 | 728 | 20 pt |

- **Invisible at rest (R9c pixel test):** all 9 frames: max difference 4, 0 pixels above 6 (`before/`, `after/`).
- **Max scroll:** rendered on temporary clones (deleted): `s3a_report_fixed_maxscroll.png`, `s3a_feedback_sending_maxscroll.png`.
- **Not changed (7 sheet backgrounds, logged):** Waste · How this is measured, Request correction, Correction · Sent, Correction · Failed, and Entry · Discrepancy / — sending / — failed. They show the screen behind a sheet at scroll 0, so clipped content there is correct. R9 does not cover the sheet pattern.
- **Pages 04 and 05 (logged conflict):** the rule says page 04 is the source, but scrolling is a prototype-only property. Pages 04 and 05 are static design pages, and some of these frames already have "(full scroll)" copies there. Following the precedent of the Student 1 Waste fix and §1.8, 04 and 05 were not touched.

## (b) Gap 77 · Dinner Meal detail answer screens

Eight frames per page were built from the lunch versions:
- the MealHero becomes dinner: "Tonight · 7:30–9:30 PM", "Chapati, paneer masala, dal, rice", "You in for dinner?", "Change till 6 PM";
- the dish list is a clone of the dinner Meal detail's list (Chapati, Paneer masala, Dal, Rice, Egg bhurji);
- Nav title "Dinner", status time 2:00;
- each frame has a label, a Moment note "Wed 2:00 PM" and the "All data is sample" chip.

| # | Frame | 04 | 05 | 07 | Hero |
|---|---|---|---|---|---|
| 1 | Answer Yes · Sending | 1373:115 | 1373:2103 | 1373:3647 | Sending · I'm in |
| 2 | Answer Yes · Saved | 1373:298 | 1373:2279 | 1373:3826 | In |
| 3 | Answer Yes · Failed | 1373:472 | 1373:2451 | 1373:4001 | Failed · I'm in |
| 4 | Track this meal? | 1373:651 | 1373:2626 | 1373:4176 | In + Track card |
| 5 | Answer No · Why not | 1373:843 | 1373:2815 | 1373:4368 | Skipping + "Why skipping?" sheet |
| 6 | Answer No · Saved | 1373:1038 | 1373:3005 | 1373:4558 | Skipping |
| 7 | Answer Not sure · Sending | 1373:1221 | 1373:3188 | 1373:4744 | Sending · Not sure |
| 8 | Answer Not sure · Saved | 1373:1417 | 1373:3379 | 1373:4938 | Not sure yet · "we'll ask again at 4:30" |

- **Placement:**
  - On 04 and 05, row D at x 3944 + k·493, y 4294.
  - On 07, row C · Meals at x 2958 + k·493, y 6440. Labels are C1d–C1k.
- **Copies on 07:** Sending, Saved and Track (and frames 6–8) come from the page-07 lunch copies (`570:43678`, `570:43818`, `570:43951`), so they already scroll. Failed and Why not come from the new page-04 frames. Failed got the scroll pattern (`scr52`: range 166, last item 728). Why not is a sheet background and is left at rest.
- **Decision (logged):** frames 6–8 were added beyond the five in the brief. Without them, Skip's sheet and Not sure have nowhere to land inside Meals (gap 77 asks for Yes, No and Not sure parity). Each one is a MealHero variant swap; no new component was needed.
- **Flow starts:** 04 (2), 05 (2) and 07 (25) are unchanged; no start was copied.

## (c) Gap 92 · Discrepancy sending → Request sent

Already in place: Entry · Discrepancy — sending (`221:63101`) goes after 1.5 s to Entry · Under review ("Request sent", `221:63120`), Dissolve 0.25. **No change.** The gap is closed as already fixed.

## (d) Gap 105 · Student weekly bars from the printed numbers

On every student Waste frame that holds the chart (04: 11, 05: 11, 07: 6, including the full-scroll copies and the How-this-is-measured background):
- the `WeekBars` instance becomes a plain screen-level frame "Week bars", with the same layout and no detached-instance link;
- each data bar becomes a **ChartBar** instance, `Kind=Expected` for past weeks and `Kind=On target` (lime, outlined) for the current week;
- bar height = grams × 109/84 pt (84 g = 109 pt, the existing scale).

| Week | 8 Jul | 15 Jul | 22 Jul | 29 Jul | 5 Aug | 12 Aug |
|---|---|---|---|---|---|---|
| Printed | 84 | 80 | — | 78 | 71 | — |
| Drawn (pt) | 109.00 | 103.81 | hatched 90 | 101.21 | 92.13 | hatched 90 |

- Every bar matches its number within 0.01 pt.
- The hatched "not measured" blocks are kept, because they carry no number.
- **Pixel diff, Waste · Last week (07):** changes stay inside the plot (x 94–299, y 634–674): sub-point bar tops and the label shift above them. No other pixel changed.

## (e) Link cleanup (page 07)

| Link | Before | After |
|---|---|---|
| Meals · Meal detail · I'm in | Answer Yes · Tap (Home) | Meal detail (dinner) · Answer Yes · Sending |
| Meals · Meal detail · Skip | Answer No · Tap (Home) | Meal detail (dinner) · Answer No · Why not |
| Meals · Meal detail · Not sure | Answer Not sure · Tap (Home) | Meal detail (dinner) · Answer Not sure · Sending |

**Added (106 net, +109 −3):**
- **Timeouts:**
  - dinner Yes Sending → after 1.2 s → Saved (Smart animate 0.25);
  - Saved → after 0.8 s → Track this meal?;
  - Not sure Sending → after 1.2 s → Not sure Saved.
- **Why not:** Close and both sheet buttons → Answer No · Saved (Dissolve 0.25, as on Home).
- **Failed:** I'm in (retry) → Answer Yes · Sending.
- **Track:** Not now → Meals · Menu.
- **Each non-sheet dinner frame:** the Meal detail's content links (5 dishes → Dish detail or Not provided, 2 At-the-Mess tiles, Crowd). Failed also got tab, search and Back links from its siblings.
- **The four intentional lock-screen jumps** (Settings → lock previews) are left unchanged.

**Intentional, not reachable by tap:** dinner Answer Yes · Failed. It is an error state, like the Home Failed frames, which are reached only by the gallery.
