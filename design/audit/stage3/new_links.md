# Stage 3: new links on page 07

Page 07 went from 1054 to **1156** links (+102). The table lists 62 individual links. The other 40 are the tab-bar links on the copies: 8 frames (lunch Sending, lunch Saved, H1, H6, H7, H8, H13, H6b), each with 5 links (Home → Home · Afternoon, Meals → Meals · Menu, Community → Community · List, You → You, Search → Search · Empty), all DISSOLVE 0.15.

| # | Source frame | Layer | Trigger | Destination | Transition | Note |
|---|---|---|---|---|---|---|
| 1 | Meals · Menu | Current meal | ON_CLICK | Meal detail · Answer Yes · Sending | MOVE_IN LEFT 0.3 |  |
| 2 | Meal detail · Answer Yes · Sending | (frame) | AFTER_TIMEOUT 1.2s | Meal detail · Answer Yes · Saved | SMART_ANIMATE 0.25 |  |
| 3 | Meal detail · Answer Yes · Sending | Back | ON_CLICK | BACK |  |  |
| 4 | Meal detail · Answer Yes · Saved | (frame) | AFTER_TIMEOUT 0.8s | Meal detail · Track this meal? | SMART_ANIMATE 0.25 | Track card appears in place |
| 5 | Meal detail · Answer Yes · Saved | Back | ON_CLICK | Meals · Menu | MOVE_OUT RIGHT 0.3 | R1b (entered by timer) |
| 6 | Meal detail · Track this meal? | Track | ON_CLICK | CONDITIONAL: seenPlateIntro ? Your plate · expanded : set true → Plate tracker · First run | MOVE_IN LEFT 0.3 |  |
| 7 | Meal detail · Track this meal? | Not now | ON_CLICK | Meals · Menu | MOVE_OUT RIGHT 0.3 | R1b (entered by timer) |
| 8 | Meal detail · Track this meal? | Back | ON_CLICK | Meals · Menu | MOVE_OUT RIGHT 0.3 | R1b |
| 9 | Plate tracker · First run | Turn on | ON_CLICK | Your plate · expanded | MOVE_IN LEFT 0.3 |  |
| 10 | Plate tracker · First run | Not now | ON_CLICK | BACK |  |  |
| 11 | Plate tracker · First run | Back | ON_CLICK | BACK |  |  |
| 12 | Your plate · expanded | Rice › Chip 1.5 | ON_CLICK | Your plate · adjusting | SMART_ANIMATE 0.25 |  |
| 13 | Your plate · expanded | Rice › Portion | ON_DRAG | Your plate · adjusting | SMART_ANIMATE 0.25 |  |
| 14 | Your plate · expanded | Dish / Sambar | ON_CLICK | Your plate · per-dish macros | SMART_ANIMATE 0.25 |  |
| 15 | Your plate · expanded | Dish / Rice | ON_CLICK | Your plate · per-dish macros | SMART_ANIMATE 0.25 |  |
| 16 | Your plate · expanded | Dish / Beetroot poriyal | ON_CLICK | Your plate · per-dish macros | SMART_ANIMATE 0.25 |  |
| 17 | Your plate · expanded | Dish / Chicken curry | ON_CLICK | Your plate · per-dish macros | SMART_ANIMATE 0.25 |  |
| 18 | Your plate · expanded | Save plate | ON_CLICK | Your plate · saved | SMART_ANIMATE 0.25 |  |
| 19 | Your plate · expanded | Back | ON_CLICK | BACK |  |  |
| 20 | Your plate · per-dish macros | Back | ON_CLICK | BACK |  |  |
| 21 | Your plate · per-dish macros | Save plate | ON_CLICK | Your plate · saved | SMART_ANIMATE 0.25 |  |
| 22 | Your plate · adjusting | Save plate | ON_CLICK | Your plate · offline | SMART_ANIMATE 0.25 | offline branch (labelled on canvas) |
| 23 | Your plate · adjusting | Back | ON_CLICK | BACK |  |  |
| 24 | Your plate · saved | Edit plate | ON_CLICK | Your plate · expanded | SMART_ANIMATE 0.25 |  |
| 25 | Your plate · saved | Done | ON_CLICK | You · Daily breakdown | MOVE_IN LEFT 0.3 |  |
| 26 | Your plate · saved | Back | ON_CLICK | BACK |  |  |
| 27 | Your plate · offline | Edit plate | ON_CLICK | Your plate · expanded | SMART_ANIMATE 0.25 |  |
| 28 | Your plate · offline | Done | ON_CLICK | You · Daily breakdown | MOVE_IN LEFT 0.3 |  |
| 29 | Your plate · offline | Back | ON_CLICK | BACK |  |  |
| 30 | Your plate · expanded | Estimate pill | ON_CLICK | Your plate · About estimates | DISSOLVE 0.25 |  |
| 31 | Your plate · adjusting | Estimate pill | ON_CLICK | Your plate · About estimates | DISSOLVE 0.25 |  |
| 32 | Your plate · saved | Estimate pill | ON_CLICK | Your plate · About estimates | DISSOLVE 0.25 |  |
| 33 | Your plate · offline | Estimate pill | ON_CLICK | Your plate · About estimates | DISSOLVE 0.25 |  |
| 34 | You · Daily breakdown | Estimate pill | ON_CLICK | Your plate · About estimates | DISSOLVE 0.25 |  |
| 35 | You · Nutrients detail | Estimate pill | ON_CLICK | Your plate · About estimates | DISSOLVE 0.25 |  |
| 36 | You · Quick add | Estimate pill | ON_CLICK | Your plate · About estimates | DISSOLVE 0.25 |  |
| 37 | Your plate · About estimates | Close | ON_CLICK | BACK |  |  |
| 38 | You · Daily breakdown | Meal / Lunch | ON_CLICK | Your plate · expanded | MOVE_IN LEFT 0.3 |  |
| 39 | You · Daily breakdown | Meal / Snack | ON_CLICK | You · Quick add | DISSOLVE 0.25 | substitute for "+" (no + control on H6) |
| 40 | You · Daily breakdown | Hero | ON_CLICK | You · Nutrients detail | MOVE_IN LEFT 0.3 |  |
| 41 | You · Daily breakdown | Nutrients (card) | ON_CLICK | You · Nutrients detail | MOVE_IN LEFT 0.3 |  |
| 42 | You · Daily breakdown | DatePillStrip | ON_CLICK | You · Weekly view | DISSOLVE 0.25 | substitute for week toggle (none on H6) |
| 43 | You · Daily breakdown | Back | ON_CLICK | BACK |  |  |
| 44 | You · Nutrients detail | Back | ON_CLICK | BACK |  |  |
| 45 | You · Weekly view | Back | ON_CLICK | BACK |  |  |
| 46 | You · Weekly view | Segment 1 (Day) | ON_CLICK | BACK |  |  |
| 47 | You · Quick add | Close | ON_CLICK | BACK |  |  |
| 48 | You · Quick add | Add snack | ON_CLICK | BACK |  |  |
| 49 | Settings · Daily goal | Option / Steady energy | ON_CLICK | You · Daily breakdown · goal on | DISSOLVE 0.25 | choosing a goal saves it (Save button is drawn Disabled) |
| 50 | Settings · Daily goal | Option / Active days | ON_CLICK | You · Daily breakdown · goal on | DISSOLVE 0.25 | as above |
| 51 | Settings · Daily goal | Back | ON_CLICK | BACK |  |  |
| 52 | You · Daily breakdown · goal on | Back | ON_CLICK | You · Daily breakdown | MOVE_OUT RIGHT 0.3 | explicit back to H6 |
| 53 | Your plate · numbers hidden | Back | ON_CLICK | BACK |  |  |
| 54 | Settings · Nutrition | Row / Hide numbers | ON_CLICK | Your plate · numbers hidden | MOVE_IN LEFT 0.3 |  |
| 55 | Settings · Nutrition | Row / Daily goal | ON_CLICK | Settings · Daily goal | MOVE_IN LEFT 0.3 |  |
| 56 | Settings · Nutrition | Back | ON_CLICK | BACK | returns to You |  |
| 57 | Meal detail · Answer Yes · Sending | Crowd | ON_CLICK | Crowd · Detail | MOVE_IN LEFT 0.3 |  |
| 58 | Meal detail · Answer Yes · Saved | Crowd | ON_CLICK | Crowd · Detail | MOVE_IN LEFT 0.3 |  |
| 59 | Meal detail · Track this meal? | Crowd | ON_CLICK | Crowd · Detail | MOVE_IN LEFT 0.3 |  |
| 60 | Home · After last meal | Home / Plate summary | ON_CLICK | You · Daily breakdown | MOVE_IN LEFT 0.3 |  |
| 61 | You | Row / Nutrition | ON_CLICK | Settings · Nutrition | MOVE_IN LEFT 0.3 |  |
| 62 | You · Offline | Row / Nutrition | ON_CLICK | Settings · Nutrition | MOVE_IN LEFT 0.3 |  |

Total: 62 listed + 40 tab links = 102.
