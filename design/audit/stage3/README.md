# Stage 3: plate tracker in the prototype

## Screenshots

- `set_MealDetail_Saved.png`, left to right:
  - page-04 source, lunch Saved (before)
  - page-07 copy, lunch Saved at rest
  - H1 with the Track card at rest
  - H1 at the bottom of the scroll (Crowd row 20 pt above the tab bar)
- `set_Home_AfterLastMeal.png`: before, after at rest, and after at the bottom of the scroll (PlateSummaryCard).
- `set_H2_H4_H8_H6.png`: H2 with its sticky Save bar, H4 (chips 10 pt above the bar), H8 (pill position), and H6 (Nutrients card, no All nutrients row).
- `after/`: individual 1× renders. `before/`: the Stage 3 baseline.
- `new_links.md`: all 102 new links.

## Walks (checked link by link on page 07)

**a. From Home · After last meal**
- Plate summary → Day view (H6) → Back (returns to Home) ✓

**b. "MealLoop app" flow**
- Home → Tab Meals → Meals · Menu → Serving now · Lunch → Meal detail Sending → (1.2 s) Saved → (0.8 s) Meal detail with Track card (H1) ✓
- Track my plate → first time: First run (H12); `seenPlateIntro` is set true ✓
- Turn on → Your plate (H2) → tap a dish → per-dish macros (H2b) → Back → H2 ✓
- Save plate → Saved (H4) → Done → Day view (H6) ✓
- Tab You → You → Nutrition → H13 → Back → You ✓
- A second "Track my plate" goes straight to H2, because the conditional branch is true ✓

**c. Quick add and goal**
- Day view → Snack row (substitute for "+") → Quick add (H9) → Close → Day view ✓
- Nutrition (H13) → Daily goal (H10) → Steady energy → goal-on Day view (H6b) → Back → H6 ✓

**d. Search**
- Search from H6 → Search · Empty → Back (BACK returns to H6) ✓

The "Plate tracker" start (H1) runs the same path from step b's Track card.
