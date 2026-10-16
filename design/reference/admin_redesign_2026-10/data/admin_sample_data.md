# Admin redesign: sample data and rules

All data is sample ("All data is sample" chip on every frame). Week: Wed 14 Aug 2024 is "today". Food head: Devi (avatar "DR"). Messes: Main, North, South, Annexe. Staff example: Ravi (kitchen). Student example for the safety case: Aarav ••2231.

## What MealLoop does and does not know (hard constraints)
- Management sends the vendor ONLY a headcount. MealLoop has NO dish-quantity plan, NO ingredient data and NO vendor login.
- The vendor is a contact (phone or message), shown dashed. "Vendor cooked" is Missing unless staff typed it in.
- Live entries are never the final count. Final attendance exists only after the meal closes.
- Staff record: stock reported low or running out, food left over by dish (L or kg), plate waste (kg), and held or checked actions.

## Lunch headcount board (Today and Headcount)
| Mess | Expected | Steps done | State |
|---|---|---|---|
| Main | 860 | Forecast, Sent, Replied | Replied 11:02 |
| North | 700 (range 660 to 740; 2,310 said yes; usual Wednesday 692; no events) | Forecast | Ready to send (black tile, Send) |
| South | 612 | Forecast, Sent | No reply since 10:15 |
| Annexe | none | none | No data |
Steps: 1 Forecast ready, 2 Headcount sent to the vendor, 3 Vendor replied, 4 Meal served and counted.
Sent before: Main Breakfast 410, vendor replied 7:05. Main Lunch 860, Not acknowledged (state sample).

## Live meal (Main, Lunch, updated 1:40 PM)
712 came in so far of 860 expected; usual by now about 690 (shows "Not enough history yet" until 4 weeks of arrival data exist). Rice running low: 6 kg left, reported by Ravi at 1:30 PM. Sambar 12 L left. Chapati OK.

## Meal report (Main, Wed 14 Aug, Lunch, closed 2:00 PM)
Headcount sent 860 (raised 800 to 860 at 9:00 for a staff event), came in 786 (final, minus 9%), Sambar left over 4 L, plate waste 18 kg, data 80% complete. Vendor cooked: not shared. Open question: did the event add diners (not recorded).

## Safety case (Main, Wed lunch, Sambar)
Student Aarav ••2231 reported "Found something in food" at 12:45 with a live photo, Main Mess Block A, within 8 m. Rail: Reported (student) 12:45, Hold asked (staff, Ravi told 12:50), Hold confirmed (staff, waiting), Vendor told (not yet), Checked and closed (you, once the hold is confirmed). Actions: Call Ravi, Tell vendor.

## Students (tomorrow lunch, all messes)
3,500 students; 2,870 answered (82%): Yes 2,310, No 420, Not sure 140; not answered 630. Remind 630 students (sends a notification). Feedback to act on: Sambar too salty, Main, Wed lunch, 6 students (New). Community: Long wait at North, 48 students, needs an owner.

## Results (last 4 weeks, all messes): wording is fixed
Segments: Left over, Ran out, To check.
Tags: Sure (measured from records), Probably (indirect evidence), Can't tell (key data missing).
Every number is labelled "meals". A meal can have more than one reason, so the numbers can add up to more than the total.

| Left over: 9 of 56 meals | Meals | Tag |
|---|---|---|
| Fewer students came than we planned for | 5 | Sure |
| Students didn't like a dish | 3 | Probably |
| We raised the headcount late | 2 | Sure |
| Can't tell why (amount cooked not shared) | 4 | Can't tell |

| Ran out: 2 of 56 meals | Meals | Tag |
|---|---|---|
| More students came than we planned for | 1 | Sure |
| Most came in the last 30 minutes | 1 | Probably |
| It was reported late | 1 | Sure |
| Can't tell why | 1 | Can't tell |

"Planned for" means the headcount sent to the vendor.

### Rules behind the tags (DRAFT, owner to confirm the numbers)
- Fewer students came than we planned for: final entries are more than 5% below the headcount sent (margin is a draft).
- More students came than we planned for: final entries are more than 5% above the headcount sent.
- Students didn't like a dish: the dish left over at that meal also has at least 3 "not good" feedbacks for the same meal.
- We raised the headcount late: the headcount was raised after the forecast froze and entries ended below the raised number.
- Most came in the last 30 minutes: at least 40% of entries fall in the final 30 minutes of service.
- It was reported late: staff reported low stock more than 15 minutes after the first sign (first sign = entries pace above the usual curve or a staff note).
- Can't tell why: key data is missing (vendor amount cooked, scanner records, waste record).
No reason is ever shown as a percentage of the waste.

### Reason detail (tapping a reason)
Left over: top strip "Foods left over" (dish tiles with the count of meals), then the meals as cards (Wed 14 lunch Main 860 to 786 with Sambar 4 L and Rice 3 kg; Tue 13 dinner North 640 to 602 with Rice 6 kg; Mon 12 lunch Main 820 to 730 with Dal 3 L and Sambar 2 L; 2 more).
Ran out: strip "Foods that ran out" (Rice at 1:34 PM, Main) and the meals as cards.
Students didn't like a dish: dish tile plus feedback counts per problem (Sambar, too salty, 6).
We raised the headcount late: before and after numbers with time and reason.
Most came in the last 30 minutes: entries per 15 minutes bars for the meal with a dashed marker at the time the food ran out.
Can't tell why: the missing items as dashed chips with "Tell the vendor".

## Check next time
Wednesday lunch, Main, started Wed 14 Aug by Devi. Change: use the 4-week average (612) unless an event is confirmed. Owner Devi. Check after 2 comparable Wednesday lunches. Status chain Open, Testing, Result. Result cannot be set to "worked" until 2 comparable meals are recorded; also check for running out.

## Weekly menu (More)
Week of 12 to 18 Aug, published Mon 8:10 AM. Upload a photo of the printed board, the app reads it, the food head checks any word marked (?), then publishes. Day rows show four dots (B L S D): filled = confirmed, ring with "!" = a word to check. Thu 15 shows Check 2. Source data: the real menu in design/reference/redesign_2026-10/data/mess_menu_2024-08-12.md.

## People and access
Food heads 2, Mess supervisors 4, Door staff 12, Kitchen staff 20, Wardens 6, Gate security 4. Vendor contact: not a login, headcount goes by message (+91 98••• ••214).

## Outings (admin)
Out now 41, due back by 8 PM 36, late 0. Waiting for a warden 14 (oldest 2 h), escalated 1 (Block B), late returns 0, rules weekday and weekend (draft), gate log.

## Open items for the owner
1. How the vendor receives the headcount (message, call, email) and whether "vendor replied" is automatic or a "Mark as replied" tap.
2. The margin for "fewer or more came than planned for" (draft 5%) and the 30-minute and 15-minute thresholds.
3. Whether the vendor ever shares the amount cooked (if yes, staff type it in).
4. Whether "Announce to students" ships.
5. Four weeks of arrival history are needed before "usual by now" shows a number.
