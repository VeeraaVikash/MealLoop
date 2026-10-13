# Run OUTINGS-FIX · Q4 scrolling audit (2026-10-13)

**Method (the file's, recorded in Q0):** a frame that scrolls has `overflowDirection = VERTICAL` and clips its content; its content stack hugs its content (`… / Content`, vertical auto layout, height HUG, no overflow of its own); the chrome (header, status bar, edge fades, tab bar or bottom action, home indicator) are the last N children and N = `numberOfFixedChildren`; the stack's bottom padding puts the last item 20 pt above the bar at maximum scroll (124 above a student / admin tab bar, 126 above the staff tab bar, 54 with no bar). The bottom "Scroll edge fade" now starts 20 pt above the bar (y 728, or 726 on the warden tab bar, 798 with no bar), so at maximum scroll it never covers the last item or a button.

**Content height** = the bottom of the last visible item in the stack + the stack's bottom padding (what the frame must show at maximum scroll). Frame height is 852 for every frame. "Converted" = the stack was FIXED (with its own overflow) and is now HUG inside a scrolling frame; "already" = the frame already scrolled with this method.

Measured with `q4meas` / `q4fix` (stored in plugin data `mealloop/q4meas`, `mealloop/q4fix`).

## 04 Student Light (05 Dark and 07 identical: same frames, same results; You · Outings content 1,112 on 05 and 07, see checks.md)

| Frame | Content | Frame | Scrolls | Fixed elements |
|---|---|---|---|---|
| You · Outings | 1,132 | 852 | yes (converted; history now 7 rows) | Status Bar, Nav Header, Scroll edge fade, Tab Bar, Home Indicator |
| Outings · Empty | 597 | 852 | no (fits) | — |
| Outings · Not enabled | 478 | 852 | no (fits) | — |
| New outing · Mon / Tue / Wed / Thu / Fri / Sat / Sun | 802 / 849 ×6 | 852 | no (fits one screen; last item 725, 23 pt above the tab bar) | — |
| New outing · Offline | 931 | 852 | yes (converted) | Status Bar, Nav Header, Scroll edge fade, Tab Bar, Home Indicator |
| New outing · No guardian | 984 | 852 | yes (converted) | same |
| New outing · Duplicate | 1,011 | 852 | yes (converted) | same |
| New outing · Sending | 873 | 852 | yes (converted) | Status Bar, Nav Header, Tab Bar, Home Indicator |
| New outing · Sent | 792 | 852 | no (fits) | — |
| Outing · Waiting for guardian / Under warden review / Escalated | 827 | 852 | no (fits) | — |
| Outing · Changes requested / Rejected / Approved / Expired | 840 | 852 | no (fits) | — |
| Outing · Edit warning (sheet), Cancel confirm (sheet) | 827 | 852 | no (sheet over its page) | — |
| Outing pass · Valid / Out | 830 | 852 | no (fits) | — |
| Outing pass · Returned / Overdue / Revoked / Expired unused | 898 | 852 | yes (converted) | Status Bar, Nav Header, Scroll edge fade, Tab Bar, Home Indicator |
| Outing pass · Cancel pass (sheet) | 830 | 852 | no (sheet) | — |
| Emergency outing | 788 | 852 | no (fits) | — |
| Emergency outing · Sent | 674 | 852 | no (fits) | — |

## 10 Admin · AD-9

| Frame | Content | Frame | Scrolls | Fixed elements |
|---|---|---|---|---|
| AD-9a Overview (Success / Empty / Offline) | 1,772 / 1,166 / 1,836 | 852 | yes (converted: the stacks were FIXED 670) | Top edge fade, Status Bar, Scroll edge fade, Tab Bar, Home Indicator (Nav Header and the scope pill scroll, as on every admin page) |
| AD-9b Policy (Success / Offline) | 1,128 / 1,192 | 852 | yes (converted) | same |
| AD-9b Edit policy (sheet) | 1,128 | 852 | no (sheet) | — |
| AD-9c Activation | 903 | 852 | yes (converted) | same |
| AD-9d Guardian enrolment (Success / Offline) | 936 / 1,000 | 852 | yes (converted; now 7 rows) | same |
| AD-9d Guardian enrolment (Empty) | 529 | 852 | no (fits) | — |
| AD-9e Staff and assignments (Success / Offline) | 958 / 1,022 | 852 | yes (converted; 7 rows) | same |
| AD-9e Staff and assignments (Empty) | 591 | 852 | no (fits) | — |
| AD-9f Emergency authorities (Success / Empty / Offline) | 712 / 570 / 776 | 852 | no (fits) | — |
| AD-9g Outing audit (Success / Offline) | 1,019 / 1,083 | 852 | yes (converted; 7 audit rows: 5 + 2 overrides) | same |
| AD-9g Outing audit (Empty) | 529 | 852 | no (fits) | — |

## 13 Guardian

| Frame | Content | Frame | Scrolls | Fixed elements |
|---|---|---|---|---|
| G-0 Sign in / Verify code | 759 / 503 | 852 | no | — |
| G-A1 Activate / G-A2 Confirm link / G-A3 Done | 688 / 609 / 492 | 852 | no | — |
| G-2 Request · Ready / Dragging / Approved / Overnight / Weekday | 807 | 852 | no | — |
| G-2 Request · Offline / Expired | 819 / 633 | 852 | no | — |
| G-2A About this outing | 1,111 | 852 | yes (built scrolling in Q3) | Header backdrop, Status Bar, Nav Header, Home Indicator |
| G-3 Status (9 states) | 684–729 | 852 | no | — |
| Sheets (Ask to change, Decline, Withdraw approval, Language) | 705–807 | 852 | no (sheet) | — |
| G-4 History (7 rows) / G-5 Notifications (7 rows) / G-6 Help | 908 / 924 / 856 | 852 | yes (built scrolling in Q3) | Header backdrop, Status Bar, Nav Header, Home Indicator |
| Messages (reference) | 647 | 852 | no | — |

## 14 Warden

| Frame | Content | Frame | Scrolls | Fixed elements |
|---|---|---|---|---|
| W-0 Sign in / Verifying / Confirm profile | — (single screen) | 852 | no | — |
| W-1 Queue — Decide next / Approved | 855 / 907 | 852 | yes (converted) | Header, Status Bar, Scroll edge fade, Tab Bar, Home Indicator |
| W-1 Ask (sheet) / No (sheet) | 900 | 852 | no (sheet) | — |
| W-2 Review request | 951 | 852 | yes (converted) | Status Bar, Nav Header, Scroll edge fade, Home Indicator |
| W-3 All requests (7 rows) | 801 | 852 | no (fits) | — |
| W-1 Queue (Empty) | 541 | 852 | no | — |
| W-1 Queue (Offline) / Review window closed | 871 / 893 | 852 | yes (converted) | Header, Status Bar, Scroll edge fade, Tab Bar, Home Indicator |
| W-4 Escalated | 1,010 | 852 | yes (converted) | same |
| W-4 Reassign (sheet) / Emergency override (sheet) | 957 | 852 | no (sheet) | — |
| W-4 Decision recorded / W-5 Me / W-6 Alerts | 492 / 795 / 587 | 852 | no | — |

## 15 Gate

| Frame | Content | Frame | Scrolls | Fixed elements |
|---|---|---|---|---|
| GA-0 ×3, GA-6 results ×10, GA-9 Sent | — (single screen) | 852 | no | — |
| GA-1 Gate home | 894 | 852 | yes (already) | StatusBar, HomeIndicator |
| GA-2 Scan / GA-4 Pass code / GA-5 Find student / GA-9 Report | 581 / 668 / 536 / 634 | 852 | no | — |
| GA-3 Verify — Exit / Return | 820 | 852 | no | — |
| GA-7 Out now (now 7 rows) | 843 | 852 | no (fits) | — |
| GA-8 Overdue returns (now 7 rows) | 943 | 852 | yes (converted) | Status Bar, Nav Header, Home Indicator, Back · hit area 56 pt |

## Lists that are the main content (≥ 7 rows)

| List | Before | After | New masked IDs (unused in the file; checked against every page) |
|---|---|---|---|
| Student Outings history (You · Outings, 04 / 05 / 07) | 3 | 7 | — (rows are Aarav's own; dates match the guardian History) |
| Guardian History | 5 (old) | 7 | — |
| Guardian Notifications | 5 (old) | 7 | — |
| Warden review list (W-3 All requests) | 7 | 7 | — |
| Gate Out now (GA-7) | 3 | 7 | ·3471, ·5167, ·6832, ·7405 (Gate home "Out now" 3 → 7) |
| Gate Overdue returns (GA-8) | 1 | 7 | ·1356, ·2584, ·4093, ·8619, ·9026, ·3958 (Gate home "Overdue returns" 1 → 7) |
| Admin Outing audit (AD-9g) | 7 (5 + 2) | 7 | — |
| Admin Guardian enrolment (AD-9d, Success and Offline) | 5 | 7 | ·6714, ·1820 |
| Admin Staff and assignments (AD-9e) | 7 | 7 | — |

IDs found in use before this stage (all pages): 0044, 0102, 0238, 0317, 0452, 0655, 0733, 0771, 0890, 0912, 1187, 1468, 2231, 2291, 2648, 3092, 3306, 4410, 4417, 4962, 5518, 5841, 6127, 6390, 7182, 7319, 7764, 8253, 9375 (and 2026 from the spec, avoided).

## Bottom fade

Every "Scroll edge fade" on the module's frames (student 6 per page, warden 13, AD-9 19) now starts 20 pt above the bar, so no button is under the fade at maximum scroll; at rest a button that sits in the scrolled part is below the fold, not faded. 07 history rows: the four new rows open the matching tracker or pass (Returned → Outing pass · Returned, Rejected → Outing · Rejected, Expired → Outing · Expired).
