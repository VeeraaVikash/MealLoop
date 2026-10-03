# Stage 2 · Label pass (text only)

Start snapshot `st139` (= `st138`), end `st140`. Links and flow starts unchanged on every page. Tool: `mealloop/lblfix` (exact-text match per page; mono kept on numbers; bound texts set through their instance property).

## Labels changed (frame · old → new · count)

| Page | Frame(s) | Old | New | n |
|---|---|---|---|---|
| 04 / 05 / 07 | Meals · Dish detail — not provided | You can rate this once it's served. | You can rate this after the meal. | 1 / 1 / 1 |
| 04 / 05 / 07 | Meals · Service ended | SERVED 12–2 PM | ENDED · 12–2 PM | 1 / 1 / 1 |
| 04 / 05 / 07 | Search · Menu result | Served | Ended | 1 / 1 / 1 |
| 04 / 05 / 07 | Waste family (Last week, Partial, Corrected, Not comparable, No baseline, Dish breakdown, How measured, full-scroll copies) | g per meal | g per diner | 13 / 13 / 7 |
| 04 / 05 / 07 | Waste family | 7 g less than the week before | 7 g less per diner than the week before | 9 / 9 / 5 |
| 04 / 05 / 07 | Waste family | Donated (not waste) · 18 kg | Donated (collected, not waste) · 18 kg | 13 / 13 / 7 |
| 04 / 05 / 07 | Waste family | 2 shortages this week | 2 shortages last week | 13 / 13 / 7 |
| 04 / 05 / 07 | Waste · Dish breakdown | By dish (logged meals only) | Never served, by dish (logged meals only) | 2 / 2 / 1 |
| 04 / 05 / 07 | Recheck · Lock · Said yes (+ expanded) | We'll keep your seat counted unless you change it. | We'll keep your yes unless you change it. | 2 / 2 / 2 |
| 09 | MS-C2 Demand dashboard | EXPECTED · LUNCH | FORECAST · LUNCH | 1 |
| 09 | MS-C2 | Not sure counts as half toward the expected number | Not sure counts as half toward the forecast | 1 |
| 09 | MS-C2 | Expected is 6% higher | Forecast is 6% above the 812 average | 1 |
| 09 | MS-C2 | 412 intents so far · 48% | 412 intents at cutoff · 48% | 1 |
| 09 | MS-E Shift home | 412 intents so far | 412 intents at cutoff | 1 |
| 09 | MS-E | 1 needs approval | 1 lapsed | 1 |
| 09 | MS-E | 11:05 AM · Override pending · Curd | 11:05 AM · Override lapsed · Curd | 1 |
| 09 | MS-D4 Shift history | Override pending · Curd 60 → 45 L | Override lapsed · Curd 60 → 45 L | 1 |
| 09 | MS-D3a | Next served Fri lunch · recheck then | Back on the menu Fri lunch · recheck then | 1 |
| 10 | AD-3c (Success, Offline) | Next served Fri lunch · recheck then | Back on the menu Fri lunch · recheck then | 2 |
| 10 | AD-3c (Success, Offline) | Confirm action | Verify after Fri recheck | 2 |
| 10 | AD-3a Community, AD-3d (S/E/O) | Long wait at counter 3 | Long wait at counter 3 after 1 PM | 4 |
| 10 | AD-3d (S/E/O) | Merge 3 into one | Group as one issue · keeps all 3 | 3 |
| 10 | AD-5c2 Look the same sheet | Merge 3 into one | Group as one proposal · keeps all 3 | 1 |
| 10 | AD-4b | 2 of 3 meals on target · Expected · Served | 2 of 3 within 5% (draft band) · Forecast · Entered | 3 |
| 10 | AD-4e Possible causes sheets | 712 came of 860 expected | 712 entered of 860 forecast · at 1:40 PM | 2 |
| 10 | AD-4d | 5–11 Aug · 71 / 64 / 58 / 49 g per meal | … g per diner | 4 |
| 10 | AD-5b Edit dish (Offline) | Offline · changes save when you reconnect | Offline · editing needs a connection | 1 |
| 10 | AD-5b Rules sheet | kcal within 5% of 4P + 4C + 9F | kcal within 5% of 4P + 4C + 9F (draft) | 1 |
| 10 | AD-7d Entry — Waste logged | Unserved is calculated from served counts | Unserved is prepared minus served | 1 |
| 10 | AD-7d All activity + entry backgrounds | Curd cut to 45 L | Curd cut to 45 L · lapsed | 4 |
| 10 | AD-7d Entry — Curd | Curd · pending | Curd · lapsed 11:30 AM | 1 |
| 10 | AD-2b (S, O), AD-2a Empty (hidden) | inside | entered | 3 |

**Wraps (checked, fit their cards):** AD-3a Community first row (2 lines); AD-4e causes rank 2 (2 lines, "1:40 PM" kept together with a no-break space).

## Already true (no change needed)

Safety report time: no "1:25" remains; every safety time reads 12:45 PM (L-N1). AD-1a "served" dial, AD-1a Empty title, AD-1b "Awaiting approval" and AD-2a "inside" were rebuilt away in stages 1A–1E. MS-C4b "Awaiting approval" is the 11:05 AM moment, before the 11:30 cutoff (kept).

## Skipped (layout or non-text) · logged

- L16 / L31 AD-2b "480 seats" (needs removal of the dial max; layout) — the unit now reads "entered".
- L17 second line "rule v0 · set 9:00 AM" on MS-C2 (needs a new text line).
- L28 Waste "DONATED" value line (no single value line to retarget).
- L38 AD-3c "Verify after Fri recheck" should be disabled until the recheck (state change, not text).
- L39 "Biryani plate" (Stage 8 renames it to "Biryani coupon"); L49 hub Surplus (rebuilt in 5A; Stage 8 handles People).
- L22 / L24 / L3 / L6 / L20 component renames (page 03, not in this pass).
- MS-D4 Curd row keeps its Hold clock icon (icon, not text).
