# Reachability · Final-fix F7 (2026-10-04)

All data is sample. Each page's links were walked from its flow starts. The walk was a breadth-first search over every visible link, including links inside conditional actions (Track this meal?). It used `mealloop/reach8`, an updated version of `tools/reach` that reads conditionals.

Not counted as edges:
- interactive-component variant changes (`CHANGE_TO`), which stay on the same screen;
- Back and Close.

A frame **with no way out** is a reached frame with no link, Back or Close at all. Intended ends are the lock-screen "Saved" toasts, which leave on a timer.

## Starts (after F7)

| Page | Starts | Chain to home |
|---|---|---|
| 07 Prototype & QA | **Student · Sign in** (on Onboarding · Sign in) | Onboarding · Sign in → Verifying (timer) → Confirm profile ("Aarav") → **All set** → Home · Afternoon |
| 09 Mess Staff | **Mess staff · Sign in** (on MS-0 · Sign in) | MS-0 · Sign in → Verifying (timer) → Confirm profile ("Ravi", "Mess staff · Main Mess") → **MS-C1 · Shift and mess select** → MS-E · Shift home |
| 10 Admin | **Admin · Sign in** (AD-0 · Sign in) + Admin · Today, Admin · Issues, Admin · Insights, Admin · Manage | AD-0 · Sign in → Verifying (timer) → Confirm profile ("Devi", "Food head · 4 messes") → AD-1a · Today — Now |

The student chain keeps its existing **All set** step, and the staff chain keeps **Start your shift**, between Confirm profile and home. The brief says Confirm profile → home. Both steps already exist and are linked, so no visuals were changed. Logged as a decision.

Removed in F7:
- 07: 25 starts (the States gallery start, feature starts and the lock-screen starts);
- 09: Entry scanner and Pass desk.

Every other page has 0 starts.

## Result

| Page | Frames | Reached | Unreachable · state | Unreachable · other account | Unreachable · bug | With no way out |
|---|---|---|---|---|---|---|
| 07 | 261 | 165 | 96 | — | 0 | 0 |
| 09 | 54 | 30 (incl. MS-E-empty as a state) | 8 | 16 | 0 | 0 |
| 10 | 163 | 99 | 64 | — | 0 | 0 |

**Bugs found by the walk and fixed by adding a link** (no frame was hidden):
- 10: AD-3b Safety case (Confirmed) and the AD-3b2 Verify and close sheet (Ready, Sent) were not reachable. The notification "Kitchen confirmed the hold" now opens the Confirmed case.
- 07: Plate tracker · First run was not reachable. The first walk did not read conditional actions; it is reachable through Track this meal?. The dinner Track button, which navigated nowhere, now uses the same conditional.
- 07: Answer and Meal-detail states had dead Change, Skip and Not sure buttons; they are now linked (see wiring_manifest.md).

## 09 · frames reached only by another account (16)

Unreachable frames:
- the attendance scanner flow: MS-A1 · Scanning, MS-A2 · Scanned, MS-A3 · Duplicate, MS-A4 · Invalid, MS-A5 · Offline, MS-A6 · End shift confirm;
- the pass-desk flow: MS-B1 · Scan the pass, MS-B2 · ID fallback, MS-B2b · Typing the SRM ID, MS-B3 · Valid — available, MS-B3b · Redeemed, MS-B4 · Already redeemed, MS-B5 · Invalid / expired, MS-B6 · Offline, MS-B7 · Redemption log, MS-B8 · End shift confirm.

These flows belong to the scanner and pass-desk accounts. Until F7 they had their own starts (Entry scanner, Pass desk). The brief allows exactly one staff start ("Mess staff · Sign in"), which signs in as Ravi, the supervisor. No existing element can switch duty:
- MS-C1 has mess and shift pickers only;
- the profile sheet's Role row has no destination.

F7 allows no visuals, so a duty picker cannot be drawn.

**Conflict, logged:** the brief's exact starts against "never lose a working path".
- The brief was followed for starts.
- The frames are not hidden, and their internal links are intact (each flow is fully wired from its home).
- **Duty picker** (on Sign in or Confirm profile: Supervisor / Entry scanner / Pass desk) is listed as a destination-absent screen in finalfix_report.md.
- To demo these flows today, the owner can present from MS-A1 or MS-B1 directly in Figma.

## 09 · state frames (8)

These are reached only by their own control or by time:
- MS-E-empty · Before shift starts (the shift home before Start shift);
- MS-C4b · Override awaiting approval (an override above the limit);
- MS-F5 · Confirm hold — Failed and MS-F6 · Confirm hold — Offline;
- MS-G3 · Report a shortage — Offline;
- MS-G4 · Spare food — Offered and MS-G7 · Spare food — Late (time states of the pickup);
- MS-H1 · Notifications (Empty).

## 10 · state frames (64)

Empty and Offline sets of every family (S/E/O): Today, Messes, Watch, To do, Mess detail, Crowd, Shortage alerts, Issues SOS / Dishes / Community, Safety case, Dish feedback, Community moderation, Insights Overview / Meal / Waste, Possible causes and Data freshness sheets, Manage hub, Menu, Edit dish, Menu voting, Proposals, Special passes, Rewards, Surplus, Pickup detail, People, Staff list, Staff access, Access request, Audit log, Notifications (Empty).

Others:
- AD-1d Curd override **Open** (before the 11:30 cutoff), **Read-only** and **Offline**;
- AD-3b Safety case **Notified** and **Failed**, and AD-3b2 Verify and close **Failed**;
- AD-6b Pass exception **Failed**;
- AD-7b Staff access — Ravi **Failed**;
- AD-6d Surplus **Offered**, **Collected** and **Late** (time states).

Sending → Saved / Sent happens in place, after a delay. Failed frames are reached only by their own control (they are not linked from Sending).

## 07 · state frames (96)

The **States gallery**: Gallery · A–O, plus every frame they walk through:
- onboarding errors;
- Home states (After cutoff, Hero unavailable, Modules hidden, Pass hidden, Offline, Loading, Crowd stale, Rewards soon);
- Answer Failed ×3;
- Meals states;
- Intent states (Reason failed, Cutoff passed, Correction requested, No response);
- Entry states (Expired, Wrong mess, Offline, Discrepancy failed);
- Pass states (Confirm failed, Not eligible, Expired, Already used, Wrong mess, Unavailable, Live Reduce Motion);
- Crowd states;
- Feedback Failed;
- Report Failed and No one on duty;
- Community states;
- Comments Failed and Empty;
- Waste states;
- Spending states;
- Rewards states;
- Notifications and Settings states;
- You states.

Also: Home · After last meal · Trackers empty, Meal detail (dinner) · Answer Yes · Failed, and Community · Suggestion · Me too Failed and Offline.

Every gallery frame is wired left and right to its neighbours. The gallery lost its start in F7, because the brief allows one student start. To review the gallery, present from **Gallery · A · Sign in** in Figma. Logged.

## Frames with no way out

None on 07, 09 or 10. Every reached frame has a link, a Back or a Close. The end screens are:
- MS-H5 · End shift summary (Done → Sign in);
- MS-F4 · Inspected (Back → Shift home);
- AD-4f · Report preview (Exported) (Back → Reports);
- Sign out alerts (→ Sign in).
