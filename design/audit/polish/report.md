# Run POLISH · final report (2026-10-16)

Brief: design/reference/polish_2026-10/prompt/COWORK_PROMPT_POLISH.md. Reference images P01–P04 (drawn 292 pt wide, ×1.346). Page 04 was edited first and the same change applied to 07; page 05 Dark stays stale. Flow starts stayed at exactly 10 at the end of every stage. Commits by VeeraaVikash, branch claude/mealloop-ios-design-e9n1n5, pushed after every stage.

## Stages

| Stage | Result | Snapshot | Why / notes |
|---|---|---|---|
| Q0 Preflight | done | st291 = st290 | On the first pass the reference pack was missing, so the run stopped after Q1 and Q3 (missing-pack rule). The pack was then committed from the upload, and the run resumed from a snapshot check against the end of Q3. |
| Q1 Credits coupons | done | st291 | The original CouponCard tickets (Juice, Ice cream, Biryani coupon locked at "80 more") are back under the black 120 pts hero on Credits, Getting a ticket, Failed and Offline (04, 07). Get, ticket open and Back are rewired. |
| Q3 Highlight chip | done | st292 | HighlightChip: a fixed 18 pt circle with the "i" centred, a 6 pt gap and equal padding. All 112 student instances were checked and none is detached. |
| Q2 Crowd page | done | st293 | Crowd · Main Mess per P03 with the states Quiet, Busy, Packed, Closed and Offline, plus Breakfast, Snacks and Dinner. The Home crowd row is wired on every Home variant. There is no list of other messes. |
| Q4 Notifications | done | st294 | P01 cards: a 36 pt type circle (lime check, ink fork and knife, outlined bubble, outlined ticket) and no app logo. Today and Earlier groups and the wiring are kept. Empty and Offline are covered. |
| Q5 Swipe to remind | done | st295 | Two cases (the Home "Not answered" card and the lunch row), each with three frames: revealed, reminder set and reminder fired. On drag → revealed → after 0.7 s → set; Undo goes back; the status bar steps to fired. The buttons on the normal frames still work. |
| Q6 Special pass | done | st296 | 8 ticket pages per page rebuilt to P04: Pass · Live 1–3, Reduce Motion, Used, Not today, Ticket · Juice and Juice · Used. They share one centred axis and the ticket fills the page height. |
| Q7 Spacing audit | done; some items need review | st297 | Gaps, card padding, single-line rows and two-column pairs were snapped. Margin, centre axis and text-size roles had 0 deviations. One dead band was fixed (Attendance). The rest of the dead bands, and the two-line rows, are under NEEDS REVIEW. All re-checks are clean. Details in polish/spacing.md. |
| Q8 Wiring, export, docs | done | st298 | reach8 on 07: 160 of 305 frames reached, 0 dead ends, and every POLISH frame is reachable from Home. A Crowd time skip was added. 17 exports at 2× are in export_polish/. Contract, gaps 398–407, STATE, MASTER_CONTEXT and DEMO (18 steps) are updated. |
| Q9 Report | done | st298 (no Figma change) | This file. |

## Decisions made without asking (polish/decisions.md 1–31)

- **Crowd values (D10–12):**
  - The current slot is the bar that contains the clock time, so at 12:10 it is the first bar; P03 marks the second.
  - Sample values come from P03 and the Home rows.
  - Snacks uses a draft window, 4:30–5:30 PM.
- **Crowd frames (D13):** Crowd · Detail and Crowd · Stale were rebuilt in place. Unavailable, Loading and About this estimate were archived on 99 with their links stripped.
- **Notifications content (D17):** the file's content was kept rather than P01's sample. The day is 7:00 AM, so the guardian approval is at 6:52 AM and the warden is still pending. Titles were shortened to fit on one line with the time.
- **Reminder time (D18):** the reminder is 8:00 AM, one hour after the sample day's 7:00 AM; P02 shows 10:41 AM.
- **Copied links (D19):** cloned frames lost their frame-level links, so the links were copied by layer path.
- **Ticket content (D22):** "Show this at the counter", the codes and the note are kept from the file. The item reads "Chicken Briyani · Panneer Briyani" (no "or" between dishes) on the tickets, Pass · Available and the Confirm frames.
- **Pass · Used (D23):** it lost its "Next at your mess" card because the P04 layout has none.
- **Scope (D24):** admin AD-6a Special passes is outside the student app and is unchanged.
- **Spacing rules (D25–30):**
  - snap tables for gaps and padding;
  - two-line rows are not forced to 56;
  - list-card grows were reverted as filler;
  - the main element grows by at most 100 pt;
  - tab labels (11 pt iOS chrome) are exempt;
  - Report bottom padding is 124 on 04 and 07.
- **Crowd entry (D31):** a status-bar time skip through the Crowd day, so Busy, Packed, Snacks and Dinner have an entry. Notification settings stays without an entry (gap 388).

## New gaps (prototype_gaps.md)

| # | Gap | Who decides |
|---|---|---|
| 398 | Crowd values are samples, not entry-scan data. | NEEDS REVIEW |
| 399 | Snacks crowd window is a 4:30–5:30 PM draft. | OWNER |
| 400 | The Swipe revealed frames show 4 lime kinds for 0.7 s. | NEEDS REVIEW |
| 401 | "Remind me in 1 hr" wraps to two lines on the lunch row panel. | NEEDS REVIEW |
| 402 | Pass · Used has no next-meal card; Not today shows an "Opens" date instead of a code. | NEEDS REVIEW |
| 403 | Juice ticket and Special pass both show code 7A3F. | NEEDS CHECK |
| 404 | Dead bands with no safe auto-fix (list in spacing.md). | NEEDS REVIEW |
| 405 | Two-line rows of 61–106 pt are off the 52 / 56 rhythm. | NEEDS REVIEW |
| 406 | 05 Dark has none of the POLISH changes. | Next run |
| 407 | The Crowd time skip is a demo shortcut. | Info |

## NEEDS REVIEW by frame name

- **Crowd · Main Mess (Quiet, Busy, Packed, Closed, Offline, Breakfast, Snacks, Dinner):** the values are samples (398). Snacks uses a draft window (399).
- **Home · Not answered · Swipe revealed, Home · Lunch row · Swipe revealed (04, 07):** 4 lime kinds (400). On the lunch row the panel text wraps (401).
- **Pass · Used, Pass · Not today · new:** the P04 layout trade-offs in 402.
- **Pass · Live 1 / Ticket · Juice:** both use code 7A3F (403).
- **Dead band above 24 pt (404):**
  - Answer · Lunch / Dinner / Breakfast (Cutoff passed, Not sure, base);
  - Entry QR, Scanned, Already scanned, Refreshing, Walk-in;
  - Pass · Available;
  - Report · What's wrong, Details, No one on duty, From feedback;
  - Notifications, Notification settings, Terms and privacy, About MealLoop, Help;
  - Rewards history, Meals · Dish detail, Recheck · Home, Community · Fixed;
  - Outing (Waiting, Review, Escalated, Changes requested, Rejected, Approved), Outing pass Valid / Out, Emergency outing, New outing · Mon;
  - Meals · Tue 13 / Thu 15 / Fri 16 / Sat 17 / Sun 18 · Breakfast, Meals · Mon 12 / Tue 13 · Snacks;
  - SOS · Review · No photo, Home · Not answered · Reminder set;
  - Guardian G-2 Request (5) and G-3 Status (9);
  - Warden W-3, W-5, W-6;
  - Gate GA-1, GA-2, GA-3, GA-4, GA-5, GA-7, GA-9.
- **Two-line rows (405):**
  - You (Outings, Credits, Attendance, Spending, My feedback, Terms and privacy, Sign out);
  - Credits "Something wrong with your balance?" (Credits, Getting a ticket, Failed, Offline, Balance issue);
  - Gate GA-7 / GA-8 student rows;
  - Warden rows.
- **Carried over and still open:** Notification settings, Quiet hours, Reminder prompt, Settings · System off, About MealLoop and Report · From feedback have no entry (388). The Answer · Dinner family also has no entry (387).

## Checks at the end

- Contrast: 0 real failures.
- Targets: 0 under 44 pt.
- Truncation: 0. Overflow: 0.
- Small text: 0 (tab labels are exempt as iOS chrome).
- Mono words: 0.
- Parity between 04 and 07: 291 / 291.
- Flow starts: 10.
- Reachability:

  | Page | Reached | Dead ends |
  |---|---|---|
  | 07 | 160 / 305 | 0 |
  | 13 | 26 / 30 | 0 |
  | 14 | 15 / 18 | 0 |
  | 15 | 16 / 23 | 0 |
