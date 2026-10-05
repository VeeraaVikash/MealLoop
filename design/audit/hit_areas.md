# Hit areas (Final-3 H1, 2026-10-05)

**Rule:** every control needs a tap area of at least 44 × 44 pt (staff: 56 pt).

**Check:** `tools/tgt14.js` (stored as mealloop/tgt14) looks at every visible node with a click, press, hover or drag link, whatever its layer name. It skips the frame itself, timer-only links and layers under a sheet's scrim. A control passes if its own box is at least 44 pt each way, or if an invisible "… hit area …" layer with the same destination is. The previous check (read6) skipped the names Pill, Chip, Scope, Dot, Icon, Search, Avatar, Link, Votes and Back, which is why it missed these controls.

**Fix:** `tools/hit14.js` (stored as mealloop/hit14) adds an invisible frame named "<control> · hit area 44 pt" for each small control.
- **Size and position:** at least 44 × 44, centred on the control, at the phone frame's top level.
- **Layering:** under the fixed bars, so it scrolls with the content; inside the fixed group when the control is in a fixed bar.
- **Link:** moved from the control onto the hit area. The control keeps its size and look.
- **Overlaps:** the tool checks for overlap with any other tappable and trims a side where needed.

## Counts (all layer names)

| Page | Tappables checked | Under 44 pt before | Under 44 pt after | Hit areas added | Other fixes |
|---|---|---|---|---|---|
| 07 Prototype | 1,799 | 36 | **0** | 26 | 10 menu dish rows grown to 44 pt (see below) |
| 09 Mess Staff | 218 | 0 (3 under the 56 pt staff rule) | **0** (3 under 56: the status-bar time skips, a demo shortcut, 393 × 54) | 0 | — |
| 10 Admin (+ AD-4f section) | 1,275 | 55 | **0** | 55 | the Dish-wise chip row padded from 30 to 44 pt so its hit area scrolls with it; the AD-1a info and chevron hit areas split at their midpoint (44 + 44) |

**Before, by layer name:**
- **07:** Pill 10, Dish row 10, Segment 6, Expand 4, Chevron 4, Grabber 1, Estimate pill 1.
- **10:** Pill 26, Scope 10, "Updated · time" 7, Icon 6, Votes 5, Chip 1.

**Overlap check:**
- No hit area overlaps another hit area.
- No hit area newly covers another tappable, apart from one case on AD-1a · Today — Now (Offline). There the info and chevron hit areas sit 35 pt above the tab bar's top edge at rest, and the fixed tab bar stays on top.

## Menu dish rows

The DishLine rows in the black "Current meal" card were 36 pt; their instance padding goes from 6 to 10 pt, so they are now 44 pt. The DishLine component is not changed.

That is 99 rows on these frames:
- 04 and 05: Meals · Menu, Menu changed, Offline, Menu — Dinner, Menu — Breakfast, and the three full-scroll copies;
- 07: Meals · Menu, Menu changed, Offline, Menu — Dinner, Menu — Breakfast.

The card grows by 40 pt (24 on Breakfast).
- **07:** the frames scroll and still clear the tab bar by 20 pt.
- **04/05:** the three full-scroll copies are 44 pt taller, and their tab bar, home indicator and scroll fade move down with them (20 pt clearance).

## Also fixed

AD-4d · Reports & exports: the round Back sat at x −4 inside a clipping "Trailing" row, which cut its edge (a G8 placement). Clipping is now off. No other Back on 04, 05, 07, 09 or 10 is clipped.

Renders: final3/h1/.
