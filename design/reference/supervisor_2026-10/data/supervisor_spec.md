# Supervisor: rules, wording and sample data

All data is sample. Main Mess, Lunch, Wed 14 Aug 2024, 12 to 2 PM. Supervisor: Ravi (initials RV). Forecasted attendance 860; entries 714 at 1:40 PM; final 774. Shortage: Steamed Rice, almost out, posted 1:30 PM by the kitchen. Waste not recorded: Lunch Wed 14 and Dinner Tue 13 (598 entered). SOS: Found something in food, Main Mess Block A, 12:45 PM.

## What the Supervisor does
Starts and closes the meal for the mess, follows up shortages the kitchen reports (marks them resolved), looks after SOS alerts (including closing a case), and can see the kitchen's recorded waste read-only. Nothing else: no approving or forwarding of waste, no analytics, no mess switcher, no editable profile.

## Flow
Role selection -> What you do sheet -> shared role password -> Supervisor Home. No Start Shift screen. Bottom bar Home, Alerts, Me. Meal history is reachable from Me only.

## Home by meal state
- Not started: plain status "Not started"; black card "FORECASTED ATTENDANCE", the number, "expected diners", a lime pill "Start meal" inside the card. Rows: Waste not recorded (count), Active shortages (count). "Start meal" is always available (draft; OWNER item whether it should unlock near the scheduled time).
- In service: lime chip "In service · N min"; black card "LIVE · time", the count of students ENTERED, "students entered", an outlined (quieter) pill "Close meal". NO forecast beside the live count. Same two rows.
- Closed: plain status "Closed · 2:00 PM"; black card "MEAL CLOSED", "Lunch has ended", "Final entries 774" (or "Unavailable" if missing, never zero). Same rows. No separate analytics and no closure flow.
- Header: avatar opens Me; a small offline dot in the header when offline (no redesign).
- Confirmations (iOS style, two actions side by side): "Start this meal?" (Lunch · Main Mess, "Door scanner and pass desk will open.", Cancel / Start meal) and "Close this meal?" ("Door scanner and pass desk will stop.", Cancel / Close meal). Starting or closing applies to every staff role of the mess (SIMULATED in Figma; needs a shared backend). Closing does not resolve a shortage and does not complete a waste report.

## Alerts
Groups in this order: SOS card on top only when active; Shortages (item, "Almost out · posted 1:30 PM", plain status dot + "Active", chevron); Waste not recorded (meal, "Closed 2:00 PM" or "598 entered", plain status "Not recorded", chevron). Empty: "You're all caught up" / "No active shortages or missing waste reports." No activity feed. The same task on Home, Alerts and Me is the same underlying task.

## Shortage
Shortage details: Item (large), level (Almost out), Posted time and "by the kitchen", Status Active, one button "Mark resolved". Dialog "Mark shortage as resolved?" (item name, Cancel / Mark resolved). After confirming: back to Alerts with the shortage gone from the active list; Meal history shows "Shortage resolved".

## Waste (read only)
Waste report page: status line "Recorded by the kitchen · 2:40 PM"; two separate values "Unserved food: 4 dishes" and "Plate waste: 21 kg"; expandable "Report details" with the dishes, each in its own unit, "0 kg · none left" for a confirmed zero, and "Plate waste, whole meal". Never combine units. Not recorded variant: "Not recorded", the entries count, "The kitchen has not saved this report yet. Nothing to do here." Missing data is never zero. NO forward, approve, edit or return actions.

## SOS (the same tab and panel as the Door Scanner, Pass Desk and Kitchen)
Right-edge tab under the avatar only while an SOS is active (count badge). Panel "SOS · 1 active" with the incident card. States: not taken ("Nobody has taken this yet", "I'll go and check" / "Not now", helper "Only if you're free. Keep the meal running first if it is busy."); claimed by you ("You're checking this", "Mark as checked" records "Checked by the supervisor", "Back to meal"); checked by someone else ("Checked by the door · 12:52 PM" or "Checked by the desk" or "Checked by the kitchen", "Close the case when you are satisfied.", "Close case" / "Not yet"). CLOSING THE CASE is a Supervisor action (the Door Scanner, Pass Desk and Kitchen only mark it checked). After closing: a toast "Case closed" and the tab disappears. SOS routing is SIMULATED.

## Me and History
Me: initials avatar, "Ravi", "Supervisor · Main Mess", Meal history row, a "Follow-ups" group (Active shortages count, Waste not recorded count; each opens the matching Alerts group), Sign out. Sign out dialog "Sign out?" (Cancel / Sign out) leads to the staff role selection. Meal history: compact rows, date and meal, "N entered" or "Unavailable", second line plain status text ("Shortage active · Waste not recorded"). Past meal summary: "Closed", Final entries, Shortages with resolution, Waste report status with "View report"; read only.

## Backend (SIMULATED here)
Shared meal state across roles, shortage reports and resolving, waste report data, SOS routing and closing, history. Label every one SIMULATED.

## Open items
1. Should Start meal unlock only near the scheduled time (draft: always available).
2. Whether the supervisor can also remind the kitchen about a missing waste report (draft: no action).
3. Who else can close an SOS case (draft: Supervisor only; the food head in the admin app).
