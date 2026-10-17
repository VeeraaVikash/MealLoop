# Door Scanner: rules, wording and sample data

All data is sample. Main Mess, Lunch, Wed 14 Aug 2024, 12 to 2 PM. Door staff initials SK. Supervisor: Ravi. Student example: Aarav ••0238.

## What the Door Scanner does
Records student entry at the door and handles exceptions quickly. Nothing else: no reports, no analytics, no waste, no vendor tasks.

## Flow
Role selection -> "What you do" sheet (can be skipped next time) -> shared role password -> Door Scanner Home. No separate Start Shift screen: starting the shift is part of a successful password. The password is one shared password per role (no individual staff passwords). Wrong password: 3 tries, then "Ask your supervisor to reset it".

## Meal lifecycle (controlled by the Supervisor)
- Before the meal: Home shows the black card with the dimmed QR and one line, "Scanning opens at <meal start time>", then Report a problem. No count, no SOS tab unless an SOS is active.
- During the meal: Home is the scanner. A lime chip "Meal in progress · N min", an inline camera card with lime corner brackets, a torch button, the line "Point at the student's QR", a "Recorded in N" tile (supporting information, recorded entries only), a "Type ID" button, and Report a problem.
- After the meal: "Lunch has ended", scanning closed, the final recorded entries, rows "Entered without voting N" and "Open problems N" (both open lists), Report a problem. The staff member is not forced to end their shift.
- When the supervisor ends the meal for a mess, the meal ends for every staff role in that mess (Door Scanner, Pass Desk). SIMULATED in the Figma prototype (a hidden time-skip link); real behaviour needs a shared backend (OWNER item).

## Scan outcomes
1. Entry recorded: full-lime screen, big black tick, "Entry recorded", the masked student ID, "Recorded in so far N" with a +1 chip, a progress bar, "Back to the camera in 1 s", and a "Scan next" button. It auto-returns to the camera after about 1 second. A student is never counted twice for one meal.
2. Student with NO meal response: there is NO exception screen. The scan shows the same "Entry recorded" screen, the count goes up, and the student is added automatically to the separate list "Entered without voting" (masked ID, time) for that mess and meal. It is not a vote and is never mixed with normal responses. (Decline is removed on purpose.)
3. Already scanned: grey screen, "Already scanned", "<ID> was recorded for Lunch", first scanned time, "Count stays N", "Nothing was added to the count.", Scan next.
4. QR not recognised: "This is not a MealLoop entry code." Causes shown: a QR for another meal (the screen then says "This QR is for Dinner."), an old screenshot. Actions: Scan again, Type the last 4 digits. Build the wrong-meal variant with the title "Wrong meal" and the line "This QR is for Dinner."
5. Can't check right now (offline or unavailable data): "No connection. This entry is NOT recorded.", last update time, entries waiting 0, Try again, Type the last 4 digits, Report a problem. NEVER show success when the entry is not verified and saved. No offline queue in this version (OWNER item).
6. Camera problems: camera permission denied -> explain, Open Settings, and "Type the last 4 digits" becomes the primary button; low light -> torch on state; camera busy -> Try again.

## Type the last 4 digits
A sheet over Home: four boxes, a number keypad (backspace icon standard), live matches below the boxes (masked ID, first name, mess). One match: "Record entry". More than one match: a short list to pick from. No match: "No student with 0238 in Main Mess." and Try again. Recording goes to the Entry recorded screen.

## Report a problem (always reachable, before and during the meal)
Three categories, one tap sends immediately to the supervisor (Ravi): Scanner not working (The camera or the phone has stopped working), Crowd at the door (The line is not moving), Something else (Anything else at the door). After tapping: a "Sent to Ravi" toast and the problem appears under "Open problems".

## SOS
A right-edge tab below the avatar, only while an SOS is active: black with a lime outline, a lime count badge, a lime warning icon, the word SOS. Tapping it opens a compact panel "SOS · N active": the incident card (time, title, place), a status chip. Not claimed: "Nobody has taken this yet" with "I'll go and check" (primary) and "Not now"; helper: "Only if you're free. Keep scanning first if the door is busy." Claimed: lime chip "You're checking this", "Ravi and the kitchen team can see you're on your way.", "Mark as checked" (records "Checked by the door"; the case itself still closes with the supervisor or food head), "Back to scanning", "I can't go after all" (releases it). The tab turns lime when claimed by you. Normal alerts stay in the Alerts tab and history; they never appear on Home.

## Alerts and Me (kept short)
Alerts: title and "Main Mess · Lunch"; when an SOS is active one black SOS card on top (time, title, place, status chip, lime "I'll go and check"); below it a group "Earlier" of at most three quiet rows, each a 36 pt circle on one axis (lime check, ink bell, outlined clock), a short title, the time on the right (mono) and one short line. Nothing else: no filters, no settings, no repeated cards. Empty: "Nothing new. Alerts from your supervisor show here." Alerts history beyond the shown rows is a "See all" row only when more than 3 exist.
Me: title; an initials avatar, the role name, the mess, a chip "On shift · since 11:40 AM"; two tiles "Recorded in" and "Problems reported"; four quiet rows: Switch role (opens role selection), Language, Help, Sign out. No name is invented: initials only.

## Navigation
Bottom bar stays Home, Alerts, Me. Entry screens have Back. Result screens return to Home.

## Open items
1. Shared meal state and SOS routing need a backend (simulated here).
2. Offline policy: never record vs queue and sync later (drawn: never record).
3. Last 4 digits can match more than one of ~3,500 students (list to pick from).
4. Who can see "Entered without voting" (door and supervisor draft).
5. Whether Pass Desk and Kitchen roles adopt the same SOS tab and panel.
