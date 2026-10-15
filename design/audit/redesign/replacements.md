# Replacements log (STUDENT-REDESIGN)

Every data replacement made to reach the sample day (Wed 14 Aug 2024, week Mon 12 – Sun 18 Aug, Aarav ••0238, Main Mess, 120 pts) and the real mess board. Page codes: 04 Student Light, 06 Accessibility, 07 Prototype & QA, 10 Admin, 13 Guardian, 14 Warden, 15 Gate.

## Earlier stages (summary)

| Stage | What changed | Where |
|---|---|---|
| P4 | Placeholder menus replaced by the board: 28 Meals frames (Mon 12 – Sun 18 × Breakfast / Lunch / Snacks / Dinner) generated from `menu_tiers.json` | 04, 07 |
| P9 | Spending entries dated Thu 15 – Sat 17 Aug (after "today") recomputed to stop at Wed 14 (decision 46) | 04, 07 |
| P9 | You header full register number → "Aarav" / "••0238 · Main Mess" (decision 45) | 04, 07 |
| P10 | Outing dates shifted by 427 days (61 weeks; weekday kept): Sat 18 Oct 2025 → Sat 17 Aug 2024, history to Jul / Aug 2024, week strips 13–19 → 12–18; 81 text layers (decision 52) | 04, 07, 10, 13, 14 |
| P11 | Admin Dishes labels → board dish names (decision 58) | 10 |

## P12 (68 text layers)

| Page | Frame | Before | After |
|---|---|---|---|
| 04, 07 | Pass · Live 1 / 2 / 3, Live (Reduce Motion), Used, Not today (12) | Aarav ·0238 | Aarav ••0238 |
| 04, 07 | Outing pass · Valid / Out / Returned / Overdue / Revoked / Expired unused / Cancel pass (14) | Aarav ·0238 | Aarav ••0238 |
| 13 | G-A1 Activate account, G-A2 Confirm link | Aarav ·0238 | Aarav ••0238 |
| 13 | G-A3 Done | Linked to Aarav ·0238 · Block B | Linked to Aarav ••0238 · Block B |
| 14 | W-1 Ask, W-1 No, W-3 All requests | Aarav ·0238 · Sat 2–8 PM | Aarav ••0238 · Sat 2–8 PM |
| 14 | W-1 Review window closed | Aarav ·0238 | Aarav ••0238 |
| 15 | GA-3 Verify Exit / Return, GA-5 Find student, GA-6 (7 results), GA-7 Out now, GA-8 Overdue returns (12) | Aarav ·0238 | Aarav ••0238 |
| 15 | GA-5 Find student (typed SRM ID) | RA22110030•0238 (did not match the student) | RA2411003010238 (the file's register number) |
| 04, 07 | Sign out; 04 You (full scroll), You · Offline (full scroll) | RA2411003010238 | ••0238 |
| 04, 07 | Lock screen previews, Recheck · Lock · No answer (+ expanded), Recheck · Inbox, Lock · Stack (10) | Chapati, paneer masala, dal. Decide by 6 PM. | Chappathi, Panneer Butter Masala, Dal Tadka. Decide by 6 PM. (board, Wed dinner) |
| 06 | AX · Home · Afternoon (full scroll) + Dark | Chapati, paneer masala, dal, rice | Chappathi, Panneer Butter Masala, Dal Tadka, Steamed Rice |
| 06 | Tamil length · Home · Afternoon + Dark | Chapati, paneer masala, dal, rice ~~~ | Chappathi, Panneer Butter Masala, Dal Tadka, Steamed Rice ~~~ |
| 06 | Tamil length · Intent · Reason sheet + Dark | Chapati ~~~~~ | Chappathi ~~~~~ |
| 13 | G-4 History (month header over the Jul entries) | September | July |
| 10 | AD-3a Issues — Dishes (Success, Offline) | Masala Sambar · Too salty | Sambar · Too salty (matches the student feedback: Sambar is on the Wed breakfast board; Masala Sambar is lunch) |

## Kept on purpose

- Request correction / Correction · Sent / Failed keep the full register number RA2411003010238: the screen is about correcting that number.
- Dish spellings follow the board as written (Chappati, Chappathi, Chapathi, Panneer); not normalised.
- "Search · Typing" query "Sambar" and "Search · No results" query "paneer" are typed queries, not dish names.
- "Sambar too watery at dinner" (Community) is the file's existing issue.
- Outing · Rejected quote "Outings open again on Sat 24 Aug." is a future date by design.
- Page 05 frames are stale (not edited).
- Weekday / date check: every "Wkd d Mon" on 04, 06, 07, 10, 13, 14, 15 and the docs page matches the 2024 calendar (0 mismatches).
