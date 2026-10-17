# Pass Desk: rules, wording and sample data

All data is sample. Main Mess, Lunch special (the Wednesday special meal), Wed 14 Aug 2024, 12 to 2 PM. Staff initials SK. Supervisor: Ravi. Student example: Aarav ••0238. Special meals: 214 passes, 41 checked so far, 42 after Aarav, 196 final.

## What the Pass Desk does
Checks a student's special-meal pass and records the special-meal entry. Also: look up a student's pass status, request a new pass, report problems and food shortage. Nothing else: no analytics, no waste, no vendor tasks.

## How a pass is checked (DECISION: no camera)
The approved student pass shows a live code and a colour that keep changing and says "No scan needed. The desk checks your code and colour." So the desk does NOT scan. The staff type the last 4 digits of the SRM ID on Home (keypad on Home during the meal). On the 4th digit a sheet "Check this pass" shows the code and colour the student's phone should show right now (from the live pass data; the sample 218 and Lime are illustrations only, never real credentials) with "Changes in N s". The staff compare with the student's phone and tap "Matches · record entry" or "Doesn't match". Respect the code's validity window: the sheet re-fetches when it changes; an old screenshot cannot match. Do not invent a verification algorithm: the expected code and colour come from the pass service (SIMULATED in Figma). A lookup alone never records anything. Duplicates for the same student and meal are prevented. If camera scanning is wanted later, it needs a QR on the student's pass (OWNER item).

## Meal lifecycle (controlled by the Supervisor)
- Before: black card with the dimmed ticket and "Checking opens at 12:00 PM". Rows: Look up a student (status only), Request a new pass, Report a problem. No keypad, no count.
- During: lime chip "Meal in progress · N of 214", the black card "STUDENT'S LAST 4 DIGITS" with four boxes and the keypad on Home, two quiet rows (Request a new pass, Report a problem). SOS tab only when active.
- After: "Lunch special has ended", "Checking is closed.", final "Special meals recorded 196 of 214", rows "New pass requests · 1 waiting" and "Open problems · 0", Report a problem. Staff are not forced to end their shift.
- When the supervisor ends the meal for a mess, it ends for every staff role in that mess. SIMULATED in Figma (hidden time-skip hotspot); real behaviour needs a shared backend (OWNER item).

## Outcomes
1. Pass verified (full lime, auto-return after about 1 s to Home, "Check next" backup): masked ID, "Valid special-meal pass for Lunch.", "Special meals recorded 42 of 214 +1". Recorded only after "Matches · record entry".
2. No special pass: "<ID> has no valid special-meal pass for Lunch." Nothing is recorded. "They can still have the regular meal." (the Door Scanner handles normal entry). Actions: Check next student, Request a new pass. Wrong meal variant: title "Wrong meal", line "This pass is for Dinner." Also nothing recorded. No supervisor approval step.
3. Already recorded: "<ID> took the special meal at 12:18 PM.", first recorded time, "Count stays 42", nothing added.
4. Doesn't match: shows what it should show (code and colour), "Ask them to refresh their pass and try again. Nothing was recorded." Actions: Check again, Back to Home.
5. Can't check right now (offline or unavailable data): reuse the Door Scanner offline screen with pass wording ("This pass is NOT checked."). Never show success when the entry was not verified and saved. No offline queue in this version.
6. Look up a student (status only): four boxes, result card with a Valid chip, Pass, Used, "This does not count as an entry.", "Look up another".

## Request a new pass (reissue)
Form: the student's last 4 digits, a student card, a reason (Phone lost, App problem, Wrong code, Other), "Send request". It connects to the existing admin pass-exception flow; do not build a separate approval system. Status list "New pass requests": Waiting (sent), Approved (the admin said yes), Done (the student actually has the new pass), Rejected (ask the pass admin). "Approved" is never shown as "Done".

## Report a problem (always reachable)
Four options, one tap sends to the supervisor (Ravi): Can't check passes (The phone or app is not working), Crowd at the desk (The line is not moving), Food running short (Tell the kitchen now), Something else (Anything else at the desk). Food running short opens the sheet "Which food is short?" (Chicken Biryani, Paneer Biryani, Raita, Something else; the dishes come from the day's menu), then "Send to the kitchen". It goes to the kitchen team of that mess and appears in their alerts: "Ravi and the kitchen team get it at once." After sending: toast and the item under Open problems.

## SOS, Alerts, Me
Same as the Door Scanner: right-edge SOS tab under the avatar only while an SOS is active; panel "SOS · 1 active" with "I'll go and check" (wording for this role: "Keep checking passes first if the desk is busy."), claimed state, "Mark as checked" records "Checked by the desk" and does not close the case. Alerts: at most three quiet rows with circles (Meal started, New pass approved, Food shortage seen) and an SOS card on top when active. Me: initials avatar, "Pass Desk", mess, "On shift" chip, tiles "Passes checked" and "Problems reported", rows Switch role, Language, Help, Sign out. Normal alerts never appear on Home.

## Open items
1. Shared meal state, pass service, reissue approval link and SOS routing need a backend (simulated here).
2. Camera scanning would need a QR on the student pass.
3. Whether a student without a pass may get the special meal (draft: no; they use the regular meal).
4. Offline policy (never record vs queue).
5. Who sees the list of special-meal entries (desk and supervisor draft).
