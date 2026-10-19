# Kitchen Staff: rules, wording and sample data

All data is sample. Main Mess, Lunch, Wed 14 Aug 2024, 12 to 2 PM. Kitchen staff initials AK. Supervisor: Ravi (receives shortage reports only). Forecasted attendance 860. Entries 714 at 1:40 PM; final 774. Dishes (Wed lunch, from the mess menu): Bhindi Aloo Bujjiya (Highlight), Steamed Rice, Chappathi, Muttar Masala, Veg Pulao, Masala Sambar, Tomato Dal, Garlic Rasam. Units by dish (used only in Record waste): kg, L or pieces (Chappathi = pieces; Sambar, Dal and Rasam = L; the rest kg).

## What Kitchen Staff does
Prepares food, watches how many students have entered, reports shortages, and records leftovers and plate waste AFTER the meal has ended. Nothing else: no inventory, no weighing devices, no vendor management, no supervisor actions. THERE IS NO APPROVAL LOOP: the waste report is saved by the kitchen and is simply "Recorded". No Waiting, Returned or Approved states exist for waste. (Shortage reports still go to Ravi: that is an alert, not an approval.)

## Flow
Role selection -> What you do sheet -> shared role password -> Kitchen Home. No Start Shift screen. Bottom bar Home, Alerts, Me. Past meals is a quiet row on Home and Meal history in Me.

## Home by meal state (the Supervisor controls it; SIMULATED in Figma)
- Before: a black card "FORECASTED ATTENDANCE", the number (860), "expected diners". NO other text in the card. Rows: Menu for Lunch, Past meals. NO waste action anywhere before the meal ends. States: loading (skeleton number); stale ("Updated 8:50 AM, may be out of date" as small grey text under the card); NOT READY: the same card shows "—" and "Forecast not ready yet" (no separate screen). Menu for Lunch: a plain list of dish NAMES only; no units, no tags, no counts.
- During: lime chip "Meal in progress · N min"; a black card "LIVE · time", the count of students ENTERED (large mono), "students entered", and inside the card the lime pill "Report food running short". NO "recorded at the door" text, NO forecast, NO remaining count. States: stale ("Updated 1:12 PM · reconnecting"), offline banner. Past meals row below. Record waste is not available.
- Shortage status: when no shortage has been reported the shortage row is OMITTED. After a report one slim row appears under the card: a small icon, "<Dish>, <level>", second line "Sent 1:30 PM". Row states: Sent <time>; "Ravi saw it" (only when confirmed); "Couldn't send" with a Retry button. NO "Needs attention", NO "Remind". More than one report: stack up to two rows, then "See all".
- After the meal ends: black card "MEAL CLOSED", "Lunch has ended", "Final entries 774". NO "recorded at the door" text. Below it a "Waste report" card with a PLAIN status (small dot + text, never a pill): Not started -> "Record waste"; Draft -> "Continue" ("4 of 6 done · saved 2:05 PM"); Recorded -> "Recorded · 2:40 PM", "You can edit until 8:40 PM.", "View report". Record waste exists ONLY when the meal has ended. A local timer never ends a meal.

## Report food running short
Sheet "Which food is short?": dish chips from the day's menu (one required), "How bad?" (optional: Getting low default, Almost out, Out), "Add a note (optional)", "Send to Ravi". Duplicate: a second report for the same dish within 10 minutes asks "Already reported at 1:30 PM. Report again?". Offline: "Couldn't send" with Retry; nothing claims delivery.

## Record waste (after the meal only)
Two separate kinds: (1) Food left over, one row per dish with its own unit beside the value; (2) Plate waste, ONE total for the whole meal, never per dish. Row states: entered ("3 kg"), confirmed zero (lime check, "None left", "0 kg"), "Not made", not entered (dashed "Enter kg" / "Enter pieces"). MISSING DATA NEVER BECOMES ZERO. A dashed row blocks "Review and save" ("Enter 2 more"); "Save draft" is always available and saves automatically when leaving. "Done N of M" is plain text. Quantity sheet: large value with the unit, "Up to 99.9 kg" (pieces up to 999), keypad with decimal and the standard backspace, "None left", "Not made", "Save". Validation: numbers only, one decimal, not negative, unit limits; error under the field ("Enter a number up to 99.9."). Leaving with unsaved changes asks "Save this as a draft?". "Add a dish" for dishes not on the menu. "Review and save" opens "Check and save" listing every entry; buttons "Save report" and "Back to edit"; note "You can edit this later."

## Editing (DECISION: 6 hours)
A saved report can be edited for 6 hours after it was saved. Home and the past meal page show "You can edit until <time>." and an "Edit report" link. After 6 hours: "Editing closed after 6 hours." and no edit link (read-only). A meal with no report ("Not recorded") can still get its waste recorded (OWNER item: for how long).

## Meal history
From Past meals and Me. ONLY meals that have ended (today's meal appears after it ends). Compact list for the kitchen's own mess (no mess selector): meal and date, "N entered", and on the right a PLAIN status, a small dot plus text, not a pill or button: filled lime dot "Recorded", empty dot "Not recorded". Opening a meal shows its summary and report (Recorded within the edit window, Recorded with editing closed, Not recorded with "Record waste"). States: empty ("No past meals yet."), loading, error with Retry.

## Alerts, Me, SOS
Alerts: rows with circles on one axis; unread = lime dot and medium title; rows: Meal ended (Record waste), Food short (from the pass desk), Shortage seen, Waste not recorded; tapping opens that meal; SOS card on top when active. Me: initials avatar, "Kitchen Staff", mess, "On shift" chip, rows Meal history (first), Switch role, Language, Help, Sign out. SOS: the same right-edge tab and panel as the Door Scanner and Pass Desk. The tab sits under the avatar, only while an SOS is active, on Home (before, during and after) and above the first row on forms (K14, K19). The panel (K20): not claimed -> "I'll go and check" / "Not now", helper "Only if you're free. Keep cooking first if the kitchen is busy."; claimed -> "You're checking this", "Mark as checked" (records "Checked by the kitchen", does not close the case), "Back to cooking", "I can't go after all". The Supervisor closes the case.

## Backend (SIMULATED here)
Shared meal state, the forecast feed, live entry counts, shortage routing and acknowledgement, saving and editing windows, history, alerts. Label every one SIMULATED.

## Open items
1. For how long a missed meal's waste can still be recorded (draft: no limit).
2. Maximum quantities per unit.
3. Who owns the unit per dish.
4. Whether the supervisor or admin can see recorded waste (read-only) elsewhere in the app.
