# Final audit (run 2, Stage 12): report only, nothing fixed

Scope: pages 04 (299 screens), 05 (299), 07 (261), 09 (34) and 10 (151), on the state after Stage 11 (`st157`). The audit made no node changes (`st158` = `st157`).

- **Tools:** `tools/fa1.js` (`mealloop/fa1`) and the store and aggregate drivers (`mealloop/fa1store`). Raw rows are kept in root plugin data `mealloop/fa1_<pageId>_<offset>`.
- **FA-0:** the fill and density tools now take any page.
  - Content is the child named `/Content$/`.
  - The bar is the Tab Bar top, else the Footer top, else frame height − 34.
  - Tab labels are excluded from the small-text check.
- **Per-page tables:** `fa_04.md`, `fa_05.md`, `fa_07.md`, `fa_09.md`, `fa_10.md`.
- **Renders:**
  - `fa1_lowest_fill_07_pass_not_eligible.png` (26% fill);
  - `fa4_dead_chevrons_07_entry_history.png` (14 dead chevrons);
  - `fa1_mono_caps_example_community.png` (mono caps eyebrows);
  - `ref_AD4c_waste.png`.

## Summary

| Check | 04 | 05 | 07 | 09 | 10 |
|---|---|---|---|---|---|
| Fill < 75% (excl. sheets, Empty, Loading, Error, onboarding) | 34 | 34 | 34 | 22 | 1 |
| Last item < 20 pt above bar at max scroll | 0 | 0 | 0 | 0 | 0 |
| Text < 12 pt (tab labels excepted) | 0 | 0 | 0 | 0 | 0 |
| Screens with words in mono | 224 | 239 | 175 | 15 | 32 |
| Screens with ≥ 4 lime uses | 0 | 0 | 0 | 4 | 8 |
| Horizontal overflow (unclipped) | 3 | 3 | 2 | 0 | 0 |
| Non-hero card > 25% of screen (213 pt) | 84 | 84 | 65 | 7 | 58 |
| Two or more hero-weight (black) cards | 13 | 13 | 8 | 13 | 29 |
| Detached instances | 1 | 1 | 1 | 0 | 0 |
| Raw (unbound) solid paints outside instances | 0 | 0 | 45 (15 gallery hotspots) | 0 | 9 (3 frames) |
| Text without a style outside instances | 0 | 0 | 45 (gallery hotspots) | 0 | 3 |
| ListRow instances | 78 | 78 | 75 | 35 | 130 |
| Dead chevrons (no link on the chevron or any ancestor) | 404 in 159 screens | 404 | 186 in 66 screens | 4 | 47 in 35 screens |
| Back that navigates to a fixed frame instead of BACK | 0 | 0 | 18 | 0 | 2 |

Pages 04 and 05 are design pages with no prototype, so their dead chevrons are expected; only 07, 09 and 10 count.

## FA-4 · Key numbers across roles (pages 07, 09, 10)

| Number | Where it appears | Agreement |
|---|---|---|
| 196 | 10 only (×4) | One role; no student or staff counterpart |
| 214 | 10 "of 214 used", "214 passes"; 09 "Special meal · 214 passes" | Agrees |
| 2,360 / 1,872 | 10 "Entered 1,872 of 2,360" (×3) | Admin only; agrees |
| 712 | 10 (×16: "712 · 83% of forecast", "of 712 entered", "712 entered of 860 forecast · at 1:40 PM") | Agrees (712 / 860 = 82.8%, shown as 83%) |
| 860 | 10 (forecast) and 09 "Prep for 860" | Agrees |
| 12:45 | 10 "Reported 12:45" (safety); 09 "Updated 12:45 PM" (feedback) | Agrees |
| 1:15 | 10 only (×9) | — |
| 11:30 | 10 cutoff (lapsed 11:30, "cutoff 11:30"); 07 ×1 | **Possible disagreement:** the student lunch flow says "Change till 9 AM", while admin uses an 11:30 cutoff for lunch |
| 76% | 10 only (×6) | — |
| 1,204 / 388 | 10 "1,204 for · 388 against" (×4) | Admin only |

**Annotations (Moment note and sample chip under every frame):**
- 10: missing on the 3 **AD-0 sign-in** frames (Stage 11).
- 09: missing on the 3 **MS-0 sign-in** frames (Stage 11).
- 07: the prototype page carries no per-frame annotations by convention (247 frames); only the rows added in this run have them.

**Stray flow starts:** none.
- 10 has the approved five.
- 09 has three (Sign in, Entry scanner, Pass desk).
- 07 has 26.
- 04 and 05 have the two "Plate tracker (design page)" starts.
- 99 has 0.
- 00 Before keeps its 4 legacy starts (an old page, not in the prototype).

## FA-5 · Student screens that should adopt CouponCard or the bento tile

| Screen (04 / 05 / 07) | Today | Adopt | Why |
|---|---|---|---|
| Rewards, Rewards · Offline, Rewards · Got it | ListRow offers ("Juice · 50 pts · Get it") | **CouponCard** | Same data (name, fact, points); matches AD-6c admin rewards |
| Pass · Available / Live / Expired / Already used / Wrong mess / Not eligible | Special pass tile + plain card | **CouponCard** (ticket with stub) | Admin AD-6b now shows passes as tickets; the student pass should match |
| You (tiles: Spending, Rewards, Attendance, Reports) | 2×2 cards | **Bento tile** | Same pattern as the Manage hub |
| Home · At the mess (Entry QR, Special pass) | AtMessTile pair | **Bento tile** | Consistent tile height and label scale |
| Spending · This week (summary) | Hero + list | Bento for the totals row | The summary figures are tile-shaped |
| Pass · Not eligible (26% fill) | One card on an empty screen | CouponCard "Not this week" + one line | Fixes the sparse screen |

## Ranked fix list

1. **Moment notes and sample chips on the six new sign-in frames** (09 MS-0 ×3, 10 AD-0 ×3). These were missed in Stage 11, which breaks the "label, Moment, sample" rule. Trivial.
2. **Dead chevrons on 07 (186 in 66 screens), 10 (47 in 35) and 09 (4).** The worst are Entry history and Entry · Discrepancy (14 each), You and the correction sheet backgrounds (11 each), AD-4d Reports (5) and the Give access / Scope sheets. Either link the rows or remove the chevrons.
3. **Words set in mono** on about 175 prototype screens:
   - section eyebrows in mono caps ("ON THE MENU", "YOUR PASSES", "LATEST FROM THE MESS");
   - Meal hero lines ("Tonight · 7:30–9:30 PM", "Change till 6 PM");
   - IssueCard "UPDATED 5H AGO" and StepBar labels ("Working on it", "Seen").
   Fix at the component level (MealHero, StepBar, IssueCard, Eyebrow style), not per screen.
4. **Lunch cutoff disagreement:** the student "Change till 9 AM" vs admin "cutoff 11:30". Decide one cutoff (gap 304).
5. **Backs that navigate to a fixed frame on 07 (18):** the dinner Meal detail copies → Meals · Menu, and goal-on → Daily breakdown. They should be BACK, so that arriving from Dinner returns to Dinner.
6. **Low-fill screens (34 student, 22 staff):** Pass · Not eligible / Unavailable (26%), You · Weekly view (29%), Waste · Unavailable (31%), the staff result screens (42–60%). Use a centred one-line state or bring content up.
7. **Two hero-weight cards on one screen:** 13 student Offline frames (the offline banner and the hero are both black), 29 admin frames (mostly Offline, plus AD-3c), and 13 staff frames (counter + result card). Make the offline banner a light chip on student screens.
8. **Tall non-hero cards (> 213 pt):** long lists (Toggles 301, Settings 343, Dishes 294–868, Staff · permissions 303, Roles 483). These are mostly legitimate lists; consider sections or a "See all" row on the longest (Staff by role 483, per-dish macros 868).
9. **Horizontal overflow:** Waste · How this is measured (3 layers) and Waste · Partial (2), on 04, 05 and 07. These are hatch vectors that extend past the frame edge with no clipping ancestor. Turn on clipping for their hatch frames.
10. **Raw paints and unstyled text on 07 (45 each)** are the 15 "Gallery ·" hotspot frames (invisible tap zones). There are 9 raw paints in AD-3d and AD-5c2 Look the same; bind them to tokens.
11. **Detached instance:** Meals · Dish detail NutritionBento (gap 284), on 04, 05 and 07.
12. **Lime ≥ 4 uses:**
    - AD-5a Menu & nutrition (6) and its Scope sheet background;
    - AD-7a People and its sheets (role bar: Kitchen staff segment lime + legend dot);
    - staff scanners (viewfinder brackets, which are allowed by the staff rule).
    Review the AD-5a nutrient chart colours.
