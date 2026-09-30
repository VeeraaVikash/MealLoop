# Gap 110 · Student lunch menu alignment: scope (2026-09-30)

Read-only inventory. **Nothing on the student pages has changed.** The student track stays paused; this one data-integrity fix goes ahead only after the scope below is approved.

**Canonical Wednesday lunch (Main Mess prep list, MS-C3 / AD-1b):** Rice, Sambar, Paneer butter masala, Chapati, Curd. Chicken biryani is the Wednesday special (special pass).

**Student lunch today:** Sambar, Rice, Beetroot poriyal, Chicken curry, Curd. Two dishes differ: Beetroot poriyal and Chicken curry are replaced by Paneer butter masala and Chapati. All five canonical dishes are veg, so the only NON-VEG tag on the regular lunch goes away (biryani stays non-veg on the pass).

## What changes

### A. Dish names only (text, no numbers)

| Frames | 04 | 05 | 07 | Change |
|---|---|---|---|---|
| Meals · Menu, Menu changed, Service ended, Offline | 4 + 3 full-scroll | 4 + 3 | 4 | Lunch list → canonical five, VEG tags |
| Meals · Menu changed: "Changed 11:40 · Egg curry is now Chicken curry" | 2 | 2 | 1 | Needs new wording (decision 3) |
| Intent · Reason failed, Cutoff passed, Correction requested, No response | 4 + 3 full-scroll | 4 + 3 | 4 | Headline "Sambar, rice, poriyal, chicken curry" and the ON THE MENU list |
| Lunch Meal detail · Answer Yes · Sending / Saved / Failed, Answer No · Why not | 4 | 4 | 2 (LS, LV copies) | Headline and ON THE MENU list |
| 06 Tamil length · Intent · Reason sheet (Light, Dark) | – | – | – | 2 frames on page 06: the dish placeholders |

Found on the way: Intent and lunch Meal detail list **4** dishes (no Curd), while Meals · Menu lists **5**. After the fix all of them list the same five.

### B. Plate tracker (dish names, nutrition numbers, ring geometry)

Source rule (§3.0, §3.2.3b): page 04 first, then the page-05 Dark twin and the page-07 copy, with the same script on each.

| Frames | 04 | 05 | 07 |
|---|---|---|---|
| H1, H2, H3, H4, H5, H11, H14, H2b (dish rows) | 8 | 8 | 8 |
| H6, H6b, H7, H8, H9 (day totals, nutrients, goal-on arcs, week bar for today) | 5 | 5 | 5 |
| Home · After last meal (Today's plate tile: 870 and its ring) | – | – | 1 |

Everything that comes from the Stage 2.1 data table changes:
- the plate totals (630 at 1×, 720 with rice 1.5×) and the day total (870, including the 150 kcal snack);
- P / C / F grams, the largest-remainder percentages, and the three ring arcs in every KcalGauge instance (arcData, set per instance);
- the Fibre line, the Nutrients card (Fibre 12 g, Sugar 21 g, Sodium 1,446 mg) and all seven H7 rows;
- H6b "870 of 2,000 a day" and the four "… left" MacroRing values;
- H6 "Lunch · 720 kcal · 4 dishes · planned";
- H8's bar for today (0.9k). The six past days and the 1,870 average don't change;
- the TodaysPlateCard on Home.

Component defaults on page 03 (KcalGauge, TodaysPlateCard, NutrientsCard, DishPortionRow) carry the same sample numbers. Updating them is optional but keeps new instances consistent.

### C. Found on the way (gap 112)

Search S4 "No results for "biryani"" says search covers this week's menu, but biryani is this Wednesday's special. Change the query, and the S1 recent search that links to S4 (2 frames × 04 / 05 / 07).

### D. Admin mirror (not paused, same data)

AD-5a Menu & nutrition (Success, Offline) follows the student menu: Sambar 110, Rice 180, Beetroot poriyal 90, Chicken curry 250, Curd "Nutrition missing". It should move to the canonical five in the same pass, so the admin "In tracker" tags match what students can log.

**Total:** about 96 frames (04: 31, 05: 31, 07: 24, 06: 2, 10: 2, plus 6 Search frames), plus optional component defaults.

## Unchanged (checked)

- **Dinner** screens: Home heroes, recheck notifications, lock screens, dinner Meal detail ("Chapati, paneer masala, dal, rice"). Gap 110 covers lunch only; see gap 113.
- Feedback (Sambar), Community titles, Report ("stone in the rice"), Pass (Chicken biryani), Waste · Dish breakdown (Rice / Sambar / Chapati already match).
- Mess staff (MS-C, MS-D) and admin AD-1b, AD-2c, AD-3: they already use the canonical list.

## Decisions needed before editing

1. **Sample plate.**
   - (a) Four rows: Rice, Sambar, Paneer butter masala, Chapati. Curd stays on the menu but isn't on this plate. No layout change.
   - (b) Five rows including Curd. This adds a 190 pt dish row to 8 plate frames × 3 pages, so every scroll and clearance check (R9b) has to be re-measured.
   - Recommended: (a).
2. **Nutrition values** per serving for Paneer butter masala, Chapati and Curd, in all seven fields (kcal, protein, carbs, fat, fibre, sugar, sodium). The contract requires IFCT 2017 per-serving values that pass the 4P + 4C + 9F check within 5%.
   - Typical values, **for sizing only and not verified**: Paneer butter masala, 1 katori (150 g), ≈ 300 kcal (P 11, C 11, F 23); Chapati, 2 pieces, ≈ 240 kcal (P 7, C 40, F 6); Curd, 1 katori (100 g), ≈ 60 kcal (P 3, C 5, F 3).
   - With (a) and these values, the plate goes from 630 to about 830 (920 with rice 1.5×), and the day from 870 to about 1,070.
   - Please supply the IFCT values, or approve using typical values marked as sample data.
3. **Menu-changed note.** Proposed: "Changed 11:40 · Egg curry is now Paneer butter masala". This matches MS-C3, where Paneer butter masala is the new, low-confidence dish.
4. **Search S4 query.** Proposed: "pasta", a dish on no menu.
5. **Dish order.** Proposed: prep-list order (Rice, Sambar, Paneer butter masala, Chapati, Curd), so staff and students see the same sequence.
6. **Intent / Meal detail headline.** Proposed: "Rice, sambar, paneer, chapati, curd" (one line; to be measured).
7. **Include AD-5a** in the same pass. Recommended.
