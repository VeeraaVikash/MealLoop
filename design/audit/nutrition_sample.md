# Nutrition sample table (Stage 4B, 2026-10-03)

**All values are SAMPLE DATA, not verified.** They are typical per-serving values chosen for sizing and arithmetic only. They are not IFCT 2017 values and not lab values; the admin chip stays "Arithmetic check · not a lab value". Replace them with verified values before any real use (gap 110, decision 2).

Source of the dish list: the Main Mess prep list (gap 110). The sample plate is Rice, Sambar, Paneer butter masala and Chapati (decision 1, option a: four rows; Curd is on the menu and in AD-5a, not on this plate). Rice, Sambar and the snack keep their Stage 2.1 values.

## Per dish (one serving, whole numbers)

| Dish | Serving | kcal | Protein g | Carbs g | Fat g | Fibre g | Sugar g | Sodium mg | 4P + 4C + 9F | Off by |
|---|---|---|---|---|---|---|---|---|---|---|
| Rice | 1 cup cooked | 180 | 4 | 40 | 0 | 2 | 0 | 4 | 176 | 2.2% |
| Rice 1.5× | 1.5 cups | 270 | 6 | 60 | 0 | 3 | 0 | 6 | 264 | 2.2% |
| Sambar | 1 katori | 110 | 5 | 14 | 4 | 4 | 3 | 420 | 112 | 1.8% |
| Paneer butter masala | 1 katori (150 g) | 300 | 11 | 11 | 23 | 2 | 6 | 520 | 295 | 1.7% |
| Chapati | 2 pieces | 240 | 7 | 40 | 6 | 5 | 1 | 200 | 242 | 0.8% |
| Curd | 1 katori (100 g) | 60 | 3 | 5 | 3 | 0 | 5 | 40 | 59 | 1.7% |
| Snack, medium | 1 portion | 150 | 3 | 20 | 6 | 1 | 8 | 180 | 146 | 2.7% |

Every dish passes the check (4P + 4C + 9F within 5% of kcal) on the displayed whole numbers. Snack sizes stay small 90 kcal and large 250 kcal (macros shown for medium only).

## Screen totals (sums of the displayed dish values)

| Screen | kcal | P | C | F | Fibre | Sugar | Sodium mg | 4P + 4C + 9F | Off by | P / C / F % |
|---|---|---|---|---|---|---|---|---|---|---|
| Plate 1× (H2 expanded, H14 About estimates, H2b per-dish macros): 110 + 180 + 300 + 240 | **830** | 27 | 105 | 33 | 13 | 10 | 1,144 | 825 | 0.6% | **13 / 51 / 36** |
| Plate, rice 1.5× (H3 adjusting, H4 saved, H5 offline, H11 numbers hidden): 110 + 270 + 300 + 240 | **920** | 29 | 125 | 33 | 14 | 10 | 1,146 | 913 | 0.8% | **13 / 55 / 32** |
| Day = plate 920 + snack 150 (H6 Day, H6b goal on, H7 Nutrients, H9 Quick add, Home plate tile) | **1,070** | 32 | 145 | 39 | 15 | 18 | 1,326 | 1,059 | 1.0% | **12 / 55 / 33** |

- Percentages are energy shares (4P, 4C, 9F over their sum), rounded by largest remainder so they add up to 100.
- H8 Week: today's bar is 1,070 (shown "1.1k"). The six full days (1.8k, 2.0k, 1.6k, 2.1k, 1.7k, 2.0k) and the 1,870 average do not change; today is not in the average.
- H6b goal on (daily references 2,000 kcal, 50 g P, 275 g C, 70 g F, 28 g fibre): 1,070 of 2,000; left 18 g P, 130 g C, 31 g F, 13 g fibre.
- H7 references: sugar 18 of 50 g, sodium 1,326 of 2,300 mg.

## How the drawings follow the data

- **Composition rings** (KcalGauge 168 pt, stroke 14, radius 77; Today's plate 64 pt / stroke 8 and 36 pt / stroke 5): each visible arc length = its energy share × (circumference − 3 visible gaps of 3 pt). The path is the visible length minus two round caps (half the stroke each); the first path starts one cap past 12 o'clock and runs clockwise P, C, F.

| Total | Energy P / C / F | KcalGauge path P / C / F (r 77, stroke 14) | Plate tile Full (r 28, stroke 8) | Plate tile Compact (r 15.5, stroke 5) |
|---|---|---|---|---|
| 830 | 108 / 420 / 297 = 825 | 35.8° / 169.4° / 116.8° | — | — |
| 920 | 116 / 500 / 297 = 913 | 34.5° / 183.1° / 104.5° | — | — |
| 1,070 | 128 / 580 / 351 = 1,059 | 32.3° / 183.1° / 106.7° | 24.9° / 170.7° / 96.8° | 21.0° / 160.5° / 89.8° |

- **Goal arcs** (H6b): kcal 1,070 / 2,000 = 53.5% of the 270° gauge; macro rings 32/50, 145/275, 39/70, 15/28 of a full turn.
- **Bars:** H7 fills = value ÷ reference × 321 pt; H8 bars = kcal × 0.05453 pt (the existing scale: 1,870 = 101.96 pt); MacroBar segments = energy share × (200 pt − 2 pt per gap): Sambar 35.00 / 98.00 / 63.00, Rice 18.00 / 180.00, Paneer butter masala 29.23 / 29.23 / 137.53, Chapati 22.68 / 129.59 / 43.74.
