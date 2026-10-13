# Run OUTINGS-FIX · Q5 completeness audit (2026-10-13)

Required list from the brief compared with the file after Q4 (st265). ✓ = exists (frame name), **built** = made in this stage from an existing pattern.

## Student (04 source, 05 Dark, 07 prototype; identical on all three)

| Required | Frame(s) | Status |
|---|---|---|
| You · Outings (active request card and history) | You · Outings · new (history now 7 rows, Q4) | ✓ |
| Empty, Not enabled | Outings · Empty · new, Outings · Not enabled · new | ✓ |
| New outing, seven days | New outing · Mon … Sun · new (Q2) | ✓ |
| Offline, Blocked ×2, Sending, Sent | New outing · Offline / No guardian / Duplicate / Sending / Sent · new | ✓ |
| Trackers: Waiting for guardian, Under warden review, Escalated, Changes requested, Rejected, Approved, Expired | Outing · … · new (7) | ✓ |
| Edit warning sheet, Cancel confirm sheet | Outing · Edit warning (sheet), Outing · Cancel confirm (sheet) | ✓ |
| Outing pass: Valid, Out, Returned, Overdue, Revoked, Expired unused; Cancel pass sheet | Outing pass · … · new (6) + Cancel pass (sheet) | ✓ |
| Emergency outing and Sent | Emergency outing · new, Emergency outing · Sent · new | ✓ |

## Warden (14)

| Required | Frame(s) | Status |
|---|---|---|
| Sign in, Verifying, Confirm profile | W-0 ×3 | ✓ |
| Queue (Decide next with the deck) | W-1 · Queue — Decide next | ✓ |
| Approved result | W-1 · Queue — Approved | ✓ |
| Ask sheet, No sheet | W-1 · Ask (sheet), W-1 · No (sheet) | ✓ |
| Review request | W-2 · Review request | ✓ |
| All 14 list | W-3 · All requests (7 rows + "+ 7 more on Sunday") | ✓ |
| Empty, Offline, Review window closed | W-1 · Queue (Empty), (Offline), Review window closed | ✓ |
| Escalated list, Reassign sheet, Emergency override sheet | W-4 · Escalated, Reassign (sheet), Emergency override (sheet) | ✓ |
| Decision results | W-4 · Decision recorded | ✓ |
| Me | W-5 · Me | ✓ |
| Reminder alert | W-6 · Alerts ("Deadline in 30 min · Student ·5841 · decide by Fri 8 PM") | ✓ |

## Gate (15)

| Required | Frame(s) | Status |
|---|---|---|
| Sign in, Verifying, Confirm profile | GA-0 ×3 | ✓ |
| Gate home, Scan, Verify | GA-1, GA-2, GA-3 Exit / Return | ✓ |
| Exit recorded, Return recorded, Back late, Already exited, Not valid, Pass withdrawn | GA-6 ×6 | ✓ |
| Outside the window (Too early, Too late) | GA-6 · Outside the window — Too early / Too late | ✓ |
| Offline | GA-6 · Offline | ✓ |
| Can't scan keypad | GA-4 · Can't scan? — Pass code | ✓ |
| Find student | GA-5 | ✓ |
| Out now, Overdue returns | GA-7 (7 rows), GA-8 (7 rows) (Q4) | ✓ |
| Emergency exit | GA-6 · Emergency exit recorded | ✓ |
| Report a problem | GA-9 + Sent to the duty warden | ✓ |

## Guardian (13, rebuilt in Q3)

All frames of the Q3 list exist (Sign in, Verify code, Activate, Confirm link, Done; Request ×7 states; About this outing; Status ×9; sheets ×4; History, Notifications, Help; Messages reference). See run_status.md Q3.

## Admin AD-9 (10)

| Required | Success | Empty | Offline |
|---|---|---|---|
| Overview | ✓ | ✓ | ✓ |
| Policy | ✓ | **built** (AD-9b · Outings — Policy (Empty) · new: EmptyState "No outing policy yet") | ✓ |
| Edit policy sheet | ✓ | — | — |
| Activation | ✓ (AD-9c · Outings — Activation) | **built** (EmptyState "No checks yet") | **built** (OfflineBanner "Offline · showing checks from 1:38 PM") |
| Guardian enrolment | ✓ (7 rows) | ✓ | ✓ (7 rows) |
| Staff and assignments | ✓ | ✓ | ✓ |
| Emergency authorities | ✓ | ✓ | ✓ |
| Audit | ✓ | ✓ | ✓ |

| Other admin items | Where | Status |
|---|---|---|
| Manage hub Outings tile | AD-5-0 · Manage hub (Success / Empty / Offline): tile "Outings · 14 waiting" | ✓ |
| Manage hub full-height clone for export | AD-5-0 · Manage hub (Success) · full height (export) · new (393 × 1,488, no links, no flow start) | **built** |
| Meal record row "On leave · 112 confirmed out" | AD-4e · Insights — Meal (Success / Offline) and the Possible causes sheets | ✓ |
| Report page 9 line | Report page 9 · Data and method, AD-4f report frames ("Outings") | ✓ |
| Weekday rule row and "Too soon" explanation on Policy | AD-9b Policy (Success, Offline, and the page behind the Edit sheet): row "Weekday (Mon–Fri) · Guardian by 7 h before leaving · warden by 3 h before · not before 8 AM · draft" (was "Weekday (Mon–Thu) · Send any time · decision within 12 working hours") + new row "Too soon · If those times have already passed today, the student sees “Too soon” and picks a later time or another day." | **built** |
| … and on the Edit sheet | AD-9b · Edit policy (sheet): field "Weekday rule (Mon–Fri) · Guardian 7 h · warden 3 h before leaving · Not before the warden's 8 AM start." + the Too soon line | **built** |

New frames have their grid label, Moment note and "All data is sample" chip, " · new" in the layer name, links copied from the frame they were built from (Back, tab bar, scope), and no flow start (a start Figma copied onto the hub clone was removed; starts = 10).
