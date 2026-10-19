# Kitchen Staff: rules, wording and sample data

All data is sample. Main Mess, Lunch, Wed 14 Aug 2024, 12 to 2 PM. Kitchen staff initials AK. Supervisor: Ravi. Headcount sent 860 (9:00 AM). Entries 714 at 1:40 PM; final 774. Dishes (Wed lunch, from the mess menu): Bhindi Aloo Bujjiya (Highlight), Steamed Rice, Chappathi, Muttar Masala, Veg Pulao, Masala Sambar, Tomato Dal, Garlic Rasam. Units by dish: kg, L or pieces (Chappathi = pieces, Sambar, Dal and Rasam = L, the rest kg).

## What Kitchen Staff does
Prepares food, watches how many students have entered, reports shortages, records leftovers and plate waste after the meal, and sends the waste report for the Supervisor's review. Nothing else: no inventory, no weighing devices, no vendor management, no supervisor actions.

## Flow
Role selection -> What you do sheet -> shared role password -> Kitchen Home. No Start Shift screen. Bottom bar Home, Alerts, Me (no fourth tab). Past meals is reached from a quiet row on Home and from Meal history in Me.

## Home by meal state (the Supervisor controls it; SIMULATED in Figma)
- Before: a black card "HEADCOUNT SENT · 9:00 AM" with the number the management sent the vendor, "expected diners", "A forecast. Entries start at 12:00 PM." DECISION: this is the approved headcount, not a raw forecast, and never a dish quantity. Rows: Menu for Lunch (N dishes), Past meals. States: loading (skeleton number), stale ("Updated 8:50 AM, may be out of date" chip), unavailable ("Headcount not sent yet." with no number).
- During: lime chip "Meal in progress · N min"; a black card "LIVE · time", the count of students ENTERED (large mono), "students entered", "Recorded at the door. Not meals served."; inside the card a lime pill "Report food running short". NO forecast, NO remaining count. States: stale ("Updated 1:12 PM · reconnecting"), offline banner.
- Shortage status: when no shortage has been reported the shortage row is OMITTED (default; no "No shortages reported" line). After a report one slim row appears under the card: a small icon, "<Dish>, <level>", and a second line "Sent 1:30 PM". Row states: Sent <time>; "Ravi saw it" (only when the server confirms); "Couldn't send" with a Retry button (never shows "Sent" if it did not send). NO "Needs attention" chip and NO "Remind" link. More than one report: stack up to two rows, then "See all".
- After: black card "MEAL CLOSED", "Lunch has ended", "Final recorded entries 774", "Recorded at the door. Not meals served."; below it a "Waste report" card with a status chip and one action: Not started -> "Record waste"; Draft -> "Continue" ("4 of 6 done · saved 2:05 PM"); Waiting -> "Waiting for Ravi" with "View report" ("Sent 2:12 PM. You can edit until he reviews it."); Returned and Approved appear on the meal page. The closed meal never blocks waste recording. A local timer never ends a meal.

## Report food running short
Sheet "Which food is short?": dish chips from the day's menu (one required), "How bad?" (optional: Getting low default, Almost out, Out), "Add a note (optional)", "Send to Ravi". It goes to the Supervisor and to the kitchen alert flow of that mess. Duplicate: a second report for the same dish within 10 minutes opens "Already reported at 1:30 PM. Report again?". Offline: "Couldn't send" with Retry; nothing claims delivery. Success: the slim row and a short toast.

## Record waste
Two separate kinds: (1) Food left over (unserved), one row per dish with its own unit shown beside the value; (2) Plate waste, ONE total for the whole meal, never per dish. Row states: entered ("3 kg"), confirmed zero (lime check, "None left", "0 kg"), "Not made" (not applicable, grey), not entered (dashed "Enter kg" / "Enter pieces"). MISSING DATA NEVER BECOMES ZERO. A dashed row blocks "Review and send" ("Enter 2 more"); "Save draft" is always available and saves automatically when leaving. Tapping a row opens the quantity sheet: large value with the unit, "Up to 99.9 kg" (pieces up to 999), keypad with decimal and the standard backspace, "None left", "Not made", "Save". Validation: numbers only, one decimal, not negative, unit limits; error under the field, e.g. "Enter a number up to 99.9." Leaving with unsaved changes asks "Save this as a draft?". "Add a dish" adds a dish not on the menu with its unit. "Review and send" opens "Check and send" listing every entry; "Send to Ravi for review"; "Back to edit". After sending the report is read-only until it is returned.

## Report states in the kitchen UI
Draft (edit freely), Waiting (read-only, can view; editable until the Supervisor starts reviewing), Returned (black chip, the reason visible, "Edit and resubmit"), Approved (lime chip with a check, locked, "Approved reports are locked."). The Kitchen UI has no approve action.

## Meal history
From Past meals and Me. Compact list for the kitchen's own mess only (no mess selector): meal and date, "N entered", status chip (Not started dashed, Approved lime, Returned black, Waiting outlined, Missing dashed). Opening a meal shows the correct summary and report (Returned and Approved pages). States: empty ("No past meals yet."), loading, error with Retry, unavailable count ("No count recorded").

## Alerts, Me, SOS
Alerts: at most the latest rows with circles on one axis; unread = lime dot and medium title, read = regular; rows: Meal ended (Record waste), Food short (from the pass desk), Shortage seen, Report returned; tapping opens that meal or report. SOS card on top when active. Me: initials avatar, "Kitchen Staff", mess, "On shift" chip, rows Meal history (first), Switch role, Language, Help, Sign out. SOS: the same right-edge tab and panel as the Door Scanner (tab under the avatar, above the first row on forms; "Keep cooking first if the kitchen is busy" for the panel helper), no new SOS design.

## Backend (SIMULATED here)
Shared meal state, the headcount feed, live entry counts, shortage routing and acknowledgement, waste report review and returned reasons, history, alerts. Label every one SIMULATED; never imply live sync.

## Open items
1. Headcount sent vs raw forecast (draft: headcount sent).
2. Omit the shortage row when none (draft: omit).
3. Dishes and units come from the day's menu (draft: yes; the unit per dish needs an owner).
4. Reviewer for the waste report (Supervisor).
5. Whether the kitchen can edit a Waiting report (draft: until review starts).
6. Maximum quantities per unit.
