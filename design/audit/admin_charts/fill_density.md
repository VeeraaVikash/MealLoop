# AD-4b / AD-4c chart pass · data, fill and density (2026-09-30)

**Method:** `filltool` and `densitytool`, the same code before and after, measured before at `st96` and after at `st97`. Bar heights and line points were read back from the file after the build. All renders are at scale 1 (393 × 852).

## Fill and density

| Screen | Fill before → after | Blocks before → after | Texts before → after |
|---|---|---|---|
| AD-4c · Trends | 72% → **85%** (y 634) | 2 → **1** (plus the chip control) | 21 → **12** |
| AD-4b · Forecast vs actual | 68% → **83%** (y 623) | 2 → **2** | 20 → **9** |

**AD-4c texts:** 642 kg · −13% since 8 Jul · 8 Jul · 15 Jul · 29 Jul · 5 Aug · −100 kg · Dashed = not measured yet · By week · By month · By year · Trends.
- The nav subtitle "All messes · Waste" is hidden.
- The two dashed ghost pills carry no label. This was the owner's choice to reach 12.

**AD-4b texts:** Tue 13 Aug · 2 of 3 meals on target · Breakfast · Lunch · Dinner · Expected · Served · Dinner · 123 fewer · 15% below forecast · Main Mess.

## AD-4c bars: zero baseline, 742 kg = 250 pt (k = 0.33693 pt/kg)

| Week | Kind | Value | Expected height | Drawn height | Error | Label |
|---|---|---|---|---|---|---|
| 8 Jul | Pill (white) | 742 | 250.00 | 250.00 | 0.00 | inside, bottom |
| 15 Jul | Pill (white) | 718 | 241.91 | 241.91 | 0.00 | inside, bottom |
| 22 Jul | Pill ghost | not measured, drawn at the median 699 | 235.51 | 235.51 | 0.00 | none |
| 29 Jul | Pill (white) | 680 | 229.11 | 229.11 | 0.00 | inside, bottom |
| 5 Aug | Pill lime (latest) | 642 | 216.31 | 216.31 | 0.00 | inside, bottom |
| 12 Aug | Pill ghost | not measured, drawn at the median 699 | 235.51 | 235.51 | 0.00 | none |

The median is (680 + 718) ÷ 2 = 699, the median of the four measured weeks. All bars share one baseline at the bottom of the chart (y 268).

## AD-4c line: spline through the measured bar tops

The line is lime, 3 pt, with round caps. It is a Catmull-Rom spline converted to cubic Béziers: 4 anchors and 3 curved segments with handles, not straight lines.

| Week | Anchor x (bar centre) | Top from data | Anchor y | Error |
|---|---|---|---|---|
| 8 Jul (742) | 20.0 | 18.00 | 18.00 | 0.00 |
| 15 Jul (718) | 74.6 | 26.09 | 26.09 | 0.00 |
| 29 Jul (680) | 183.8 | 38.89 | 38.89 | 0.00 |
| 5 Aug (642) | 238.4 | 51.69 | 51.69 | 0.00 |

The end dot is centred at (238.4, 51.69), on 642. The segment from 15 Jul to 29 Jul crosses the unmeasured 22 Jul slot.

## AD-4b pills: zero baseline, 860 = 280 pt (k = 0.32558 pt/meal)

| Meal | Pill | Value | Expected height | Drawn height | Error |
|---|---|---|---|---|---|
| Breakfast | Expected (Pill) | 610 | 198.60 | 198.60 | 0.00 |
| Breakfast | Served (Pill lime) | 596 | 194.05 | 194.05 | 0.00 |
| Lunch | Expected (Pill) | 860 | 280.00 | 280.00 | 0.00 |
| Lunch | Served (Pill lime) | 838 | 272.84 | 272.84 | 0.00 |
| Dinner | Expected (Pill) | 820 | 266.98 | 266.98 | 0.00 |
| Dinner | Served (Pill, grey override) | 697 | 226.93 | 226.93 | 0.00 |
| Dinner | Shortfall (Pill ghost), top at expected | 820 | 266.98 | 266.98 | 0.00 |

**Dinner's shortfall:** the ghost is drawn at the full expected height, behind the grey served pill. Only its top 40.05 pt shows, which is 123 meals, the shortfall. On its own, a 37 pt ghost pill rounded into a dashed circle.
