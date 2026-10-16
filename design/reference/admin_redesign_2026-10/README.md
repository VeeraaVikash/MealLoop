# MealLoop admin redesign: reference pack

One image per screen. They are layout, hierarchy and copy references, not pixel-perfect art.

## How to read the images
- Each image is a 320 x 652 phone (shown at 2x). The screen is 292 pt wide. **Multiply every size by 1.346 for the 393 pt frames.** Take text sizes from the readability standard (body 15, secondary 13, meta 12, primary actions 17 or more).
- Fonts in the images are stand-ins. The design uses Inter, with the mono font only for numbers, times and units.
- All data is sample. Today is Wed 14 Aug 2024 (the same week as the student pack).
- Keep the drawn icon set (dish pictograms in `assets/`). The Orbit background is the same as the student app.

## Decisions baked into these screens
1. **Management sends the vendor only a headcount.** There is no dish-quantity plan, no ingredient data and no vendor login in MealLoop. "Vendor cooked" shows as Missing.
2. **Four tabs: Today, Students, Results, More.** There is no Meals tab and no date strip. A meal is reached from Today (to send, live) or from Results (needs review, or Find a meal).
3. **Today is one tile per mess.** The tile that needs action is the black one. Each tile has one big number, a four-step bar (forecast, sent, replied, served) and one bottom line.
4. **Results is about reasons, in plain words.** Tags are Sure, Probably and Can't tell. Every number is labelled "meals". A meal can have more than one reason.
5. **Live entries are never final.**
6. **Check next time** cannot be closed as "worked" until 2 comparable meals are recorded.

## Manifest
| File | Screen |
|---|---|
| A01_today | Today: day line, four mess tiles, Needs you |
| A02_headcount_north | Headcount for one mess: send to the vendor |
| A03_meal_live | Live meal: entries so far, food reported low |
| A04_meal_report | Meal report ticket for one closed meal |
| A05_safety_case | Safety case across student, staff, vendor and you |
| A06_students | Students: answered, feedback to act on, Community |
| A07_results_left_over | Results, Left over: reasons ranked |
| A08_results_ran_out | Results, Ran out: reasons ranked |
| A09_reason_detail_foods | A reason opened: foods left over and the meals |
| A10_check_next_time | A change being tested |
| A11_more | More hub |
| A12_weekly_menu | Weekly menu: upload, read, check, publish |
| A13_people_access | People and access, vendor contact |
| A14_outings_admin | Outings at a glance |

`overview_1.png` and `overview_2.png` show all screens in grids.

## Not drawn (build in the same style from the prompt)
Today states (safety open, all sent, nothing needs you, offline, loading, mess closed); Adjust headcount sheet; Tell the vendor sheet; Students sub-pages (feedback detail, Community issue, Why students skip, Remind sheet); Results To check, Find a meal, Weekly report preview, Safety cases list, Make it a change sheet; reason detail pages for the other reasons; Announce to students; restyled existing Passes, Votes, Rewards, Spare food and History.

## Contents
`images/` PNG per screen. `svg/` vectors. `assets/` pictograms, glyphs and brand marks. `data/admin_sample_data.md` numbers, wording and tag rules. `prompt/COWORK_PROMPT_ADMIN.md` the build prompt.
