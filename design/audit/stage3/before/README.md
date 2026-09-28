# Stage 3: snapshot and before-renders

Taken before any Stage 3 edit. Frames were rendered at 1× from link-free clones in a temporary capture, which was deleted afterwards.

## Preconditions (read-only; all pass)

- **"≈":** none in the 16 section-H frames on page 04 (H1–H14, H2b, H6b), including hidden layers.
- **KcalGauge Goal=Off:** the 630, 720 and 870 variants are Estimate pill → Ring → Caption → Legend block (the composition ring). Hidden is Pill space → Ring → Readout.
- **H8:** has the Estimate pill.
- **Save bar clearance:** H10 does not scroll (312 pt); H12 scrolls and clears by 22 pt.

## Snapshot (`st3_*` in root plugin data; `st26_*` cleared)

| Page | Top-level nodes | Links |
|---|---|---|
| 03 | 264 | 0 |
| 04 | 1036 | 7 |
| 05 | 847 | 7 |
| 07 | 265 | 1054 |

The full page-07 link dump (1054 rows: source node, source frame, layer, trigger, timeout, action, destination, navigation, transition, direction, duration, easing) is stored under `st3_1lnyf7e_*`. The frame order used for the page-07 grid renders is stored under `st3_p07order`.

### Page-07 link summary

**By trigger:**
- ON_CLICK: 1032
- AFTER_TIMEOUT: 21
- ON_PRESS: 1

**By action and transition:**

| Action / transition | Count |
|---|---|
| Dissolve 0.15 s (tabs, Search) | 351 |
| Move in, left, 0.3 s (drill-in) | 216 |
| Plain navigate with no transition (states gallery halves) | 184 |
| Dissolve 0.25 s | 110 |
| BACK | 88 |
| Smart animate 0.25 s | 56 |
| Dissolve 0.2 s | 46 |
| Move out, right, 0.3 s (fixed back links, R1b) | 3 |

## Before-renders

- **`p04_H1`, `p04_H12`, `p04_H13`:** the page-04 sources that Stage 3 will call unchanged. The same capture rendered twice differs by 0 px.
- **`p04_*You*` and `p05_*You*`:** You, Request correction, Correction · Sent, Correction · Failed, Sign out, You · Offline, plus the two full-scroll frames. These will get the Nutrition row.
- **`p07_Home_After_cutoff`:** gets the PlateSummaryCard.
- **`p07_You`, `p07_Request_correction`, `p07_Correction_Sent`, `p07_Correction_Failed`, `p07_Sign_out`, `p07_You_Offline`:** these will get the Nutrition row.
- **`p07_Meals_Meal_detail`, `p07_Answer_Yes_Saved_dinner`:** reference only. Page 07 has no lunch Meal detail "Answer Yes · Saved", so it will be copied from page 04 section D (`303:22257`).
- **All 228 page-07 frames:** rendered in four 12-column grids (kept in the working scratchpad, not the repo). These are the baseline for "no pixel above 6" on every page-07 frame that Stage 3 does not touch.
