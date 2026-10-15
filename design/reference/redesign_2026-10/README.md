# MealLoop student redesign: reference pack

One image per screen, drawn from the approved sketches in the design chat. **They are layout, hierarchy and copy references, not pixel-perfect art.**

## How to read the images
- Each image is a 320 x 652 phone (shown at 2x, so 640 x 1304 px). The screen is 292 pt wide. **Multiply every size by 1.346 to get the 393 pt design.** The sketch text (11 to 13 px) becomes 15 to 17 pt, which matches the readability standard (body 15, secondary 13, meta 12, primary actions 17 or more).
- Fonts in the images are stand-ins (Liberation Sans). The design uses Inter for text and the mono font for numbers, times and units only.
- All data is sample. The week is Mon 12 to Sun 18 Aug 2024, with Wed 14 Aug as "today" (it matches the real mess menu board).
- Dish names in screens 07, 12, 13 and 15 (Rice, Sambar, Paneer, Chapati, Curd) are placeholders. Real dishes come from `data/mess_menu_2024-08-12.md`.
- Icons: the **drawn icon set is kept** (dish pictograms, feedback glyphs, brand mark): see `assets/`. The existing tab bar and header icons already in the Figma file stay.

## Background ("Orbit")
Flat canvas #EDEDE8 with a faint 14 px dot texture at 7% ink. A lime disc (#D4F25A) sits in the top-right corner, with four hairline rings around it (12 to 14%, 12%, 10%, 8% ink), one small black dot on the first ring, and a fainter two-ring cluster at the bottom-left. One fixed layer behind scrolling content. Used on every student screen, except the SOS camera (dark) and the gate result (full lime).

## Manifest
| File | Screen | Notes |
|---|---|---|
| 01_sign_in | Sign in | One "Sign in with SRM" button. Small mark above the centred name. Terms line in small text. |
| 02_getting_details | Getting your details | Centred, aligned. Goes straight to Home. No "Is this you?" screen. No carousel. |
| 03_home | Home | Wed 14 Aug, 7:00 AM. Crowd appears once (one row). Entry QR appears once (top card). |
| 04_home_top_card_cases | Home: top card cases | If you said yes / no / not answered. The QR is never locked. |
| 05_meals_lunch | Meals: Wed Lunch | Four slots. Highlight tile, mains, alternate-Wednesday ticket, "Comes with it". |
| 06_meals_dinner | Meals: Wed Dinner | Both curries are plain dishes ("Curries"). No "or". Non-veg Chicken Gravy row. |
| 07_lunch_answer | Lunch answer | Menu tiles above, answer buttons at the bottom. |
| 08_entry_qr | Entry QR | Live QR with refresh countdown. |
| 09_community_list | Community list | "Me too" on each card. Backed state with Undo. |
| 10_community_issue | Community issue | Count, four-step progress, Me too, "when the wait is longest". |
| 11_feedback_step1_good_or_not | Feedback 1 | Good sends at once. Not good continues. |
| 12_feedback_step2_which_dish | Feedback 2 | Most reported today (one-tap Me too), or pick the dish. Service goes to Community. |
| 13_feedback_step3_whats_wrong | Feedback 3 | Specific problem, how bad, Send. |
| 14_my_feedback | My feedback | Summary, the one report that needs an answer, progress per report. |
| 15_sos_choose_problem | SOS 1 | Four options. Button reads "Next: take a photo". |
| 16_sos_camera_proof | SOS 2 | Live camera only. GPS chip and time stamp on the frame. |
| 17_sos_review_proof | SOS 3 | Photo, place and time, three checks, Send SOS. |
| 18_sos_sent_with_proof | SOS 4 | Status rail with the proof attached. |
| 19_you | You | Outings replaces Waste. No Waste, Nutrition or plate tracker. |
| 20_notifications | Notifications | Native-style cards with the app icon. |
| 21_credits | Credits | Notched tickets. |
| 22_juice_ticket | Ticket | Live code and colour. |
| 23_attendance | Attendance | Ring and month grid. |
| 24_spending_private | Spending | Private tracker. |
| 25_outing_new_weekday | New outing (weekday) | Week strip, rule tag, ribbon (single day). |
| 26_outing_new_weekend | New outing (weekend) | Two-day ribbon with earlier deadlines. |
| 27_outing_tracker | Outing tracker | Loop ring with the decision deadline. |
| 28_outing_pass | Outing pass | Boarding pass with QR stub. |
| 29_guardian_request | Guardian: request | Mobile web page. Clock dial, slide to approve. Only the word "தமிழ்" is Tamil. |
| 30_guardian_status | Guardian: status | Same dial. Withdraw approval, Call the warden. |
| 31_warden_decide_next | Warden | Deck of requests, one at a time. |
| 32_gate_verify | Gate: verify | The student's photo leads. |
| 33_gate_exit_recorded | Gate: result | Full-screen lime. |
| 34_brand_mark_and_app_icon | Brand mark | Drawn from the Home screenshot. Replace with the final logo file. |

`overview_1.png` to `overview_5.png` show all screens in grids.

## Not shown (build them in the same style)
- Meals Breakfast and Snacks tabs and the other six days (generate from `data/`).
- States: offline, loading, failed, empty, cutoff passed, "Why skipping?" sheet, Community info sheet, notification states.
- Dark mode (page 05). It stays as it is and is marked stale.
- Staff and admin screens. They keep their layouts. Two admin changes are in the prompt.

## Contents
- `images/` PNG per screen (2x). `svg/` the same as vectors.
- `assets/pictograms`, `assets/glyphs`, `assets/brand`: import these as vector components.
- `data/mess_menu_2024-08-12.md`: the real menu, transcribed from the photo (check the "(?)" items).
- `prompt/COWORK_PROMPT.md`: the build prompt.
