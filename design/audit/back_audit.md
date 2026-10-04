# Back audit · Final-2 G1 (2026-10-04)

This replaces the Final-fix F4 audit (titled back). The standard is in design_intent.md ("BACK STANDARD", UIKit `backButtonDisplayMode = .minimal`): one round 44 pt glass circle with the system chevron, at x 16 and y 58 on every drill-in, for every role.

## Count per page

| Page | Frames changed | Old control | New control | After: Back controls (size @ offset) |
|---|---|---|---|---|
| 10 Admin | 115 | 90 NavHeader titled back (NavHeader Back=Titled), 25 "Drill-in header" titled back (F1) | 90 NavHeader Back=Icon; 25 GlassButton Kind=Icon positioned at 16, 58 | 141 × 44×44 @ 16,58 (incl. the screens drawn behind sheets) |
| 09 Mess staff | 42 (via the StaffTopBar Type=Task component) | titled back (GlassButton Kind=Titled) | GlassButton Kind=Icon; bar padding 4 / 8 so the button sits at y 58 | 41 × 44×44 @ 16,58 |
| 07 Prototype | 0 | round chevron | unchanged (already 44×44 @ 16,58) | 156 × 44×44 @ 16,58 |
| 04 / 05 Student | 0 | round chevron | unchanged | 180 / 180 × 44×44 @ 16,58 |

**Components (flagged):**
- NavHeader (74:136): the two Back=Titled variants were deleted, leaving 0 instances. The Back variant property now has a single option, Icon.
- GlassButton (74:101): the Kind=Titled variant and its Label property were deleted. Its last 2 uses were inside the deleted NavHeader variants.
- StaffTopBar Type=Task (1427:2320): Back swapped to Kind=Icon; padding top 4, bottom 8; height still 56.

**Checks:**
- **Bindings:** checked on a sample (AD-1b, AD-7b, Entry · QR, Crowd · Detail) before and after; titles, subtitles, Back and trailing visibility are unchanged.
- **Titles:** no title changed on any of the 115 admin frames (the tool compared each title before and after).
- **Links:** every Back kept its link. Back (where the user came from) or, on result states, the flow's origin.

**Titles:** the screen title stays as each screen had it.
- NavHeader Inline Title: centred.
- NavHeader Large Title and the F1 drill-in header: the iOS large title under the bar, which collapses to the centred inline title on scroll.

These were not switched to Inline (decision logged), because that would move the content of 63 frames by 76 pt.

**Sheets:** the "round (unchanged) · none" rows are the screens drawn behind a sheet's scrim; they cannot be tapped. Each sheet itself closes with Close (×) and a tap outside.

Staff page 09 is rebuilt in G2. These rows record the state of the old frames before they were archived.

Key: NH = NavHeader, DH = F1 "Drill-in header", Back = Back (where the user came from).

## 10 Admin

| Frame | Old control | New control | Destination |
|---|---|---|---|
| AD-1b · Today — Mess detail | NH titled "< Today" | NH round | Back |
| AD-1b · Today — Mess detail (Offline) | NH titled "< Today" | NH round | Back |
| AD-1b · Mess detail — North | NH titled "< Messes" | NH round | Back |
| AD-1b · Mess detail — South · new | NH titled "< Messes" | NH round | Back |
| AD-1b · Mess detail — Annexe · new | NH titled "< Messes" | NH round | Back |
| AD-1c · Today — Decisions (S / Empty / Offline) | DH titled "< Today" | DH round | Back |
| AD-1d · Decision — Curd override (Lapsed / Open / Read-only / Offline) | NH titled "< Main Mess" | NH round | Back |
| AD-1e · Today — Messes (S / Empty / Offline) | DH titled "< Today" | DH round | Back |
| AD-1f · Today — Watch (S / Empty / Offline) | DH titled "< Today" | DH round | Back |
| AD-2a · Crowd — All messes (S / Empty / Offline) | NH titled "< Alerts" | NH round | Back |
| AD-2b · Crowd — Mess detail (S / Offline) | NH titled "< Crowd" | NH round | Back |
| AD-2c · Shortage alerts (S / Empty / Offline) | NH titled "< Alerts" | NH round | Back |
| AD-2d · Data gaps | NH titled "< Alerts" | NH round | Back |
| AD-3a2 · All safety cases | NH titled "< Issues" | NH round | Back |
| AD-3b · Safety case (S / Offline / Notified / Failed / Confirmed) | NH titled "< Today" | NH round | Back |
| AD-3c · Issue detail — Dish feedback (S / Offline) | NH titled "< Meal" | NH round | Back |
| AD-3d · Community moderation (S / Empty / Offline) | NH titled "< Issues" | NH round | Back |
| AD-4b · Forecast vs actual — Main Mess | NH titled "< Meal" | NH round | Back |
| AD-4c · Insights — Waste (S / Empty / Offline) | DH titled "< Insights" | DH round | Back |
| AD-4d · Reports & exports | NH titled "< Insights" | NH round | Back |
| AD-4e · Insights — Meal (S / Empty / Offline) | DH titled "< Insights" | DH round | Back |
| AD-4f · Report preview · new | NH titled "< Reports" | NH round | Back |
| AD-4f · Report preview (Exported) · new | NH titled "< Reports" | NH round | AD-4d · Reports & exports |
| AD-5a · Menu — Lunch · new | DH titled "< Manage" | DH round | Back |
| AD-5a · Menu — Breakfast · new | DH titled "< Manage" | DH round | AD-5-0 · Manage hub (Success) |
| AD-5a · Menu — Dinner · new | DH titled "< Manage" | DH round | AD-5-0 · Manage hub (Success) |
| AD-5a · Menu (Empty) · new | DH titled "< Manage" | DH round | Back |
| AD-5a · Menu (Offline) · new | DH titled "< Manage" | DH round | Back |
| AD-5b · Edit dish — Sambar / Add dish (Empty) / Edit dish (Offline) | NH titled "< Menu" | NH round | Back |
| AD-5c · Menu voting (S / Empty / Offline) | NH titled "< Manage" | NH round | Back |
| AD-5c2 · Proposals (S / Empty / Offline / Vote open) | NH titled "< Manage" | NH round | Back |
| AD-5d · Vote result → final decision | NH titled "< Menu votes" | NH round | Back |
| AD-6a · Special passes (S / Empty / Offline) | NH titled "< Manage" | NH round | Back |
| AD-6b · Pass exception (Open / Failed) | NH titled "< Passes" | NH round | Back |
| AD-6b · Pass exception (Declining / Sending / Approved) | NH titled "< Passes" | NH round | AD-6a · Special passes (Success) |
| AD-6c · Rewards (S / Empty / Offline) | NH titled "< Manage" | NH round | Back |
| AD-6c3 · Rewards — Redemptions · new | NH titled "< Rewards" | NH round | Back |
| AD-6d · Surplus (Accepted / Empty / Offline / Offered / Collected / Late) | NH titled "< Manage" | NH round | Back |
| AD-6d2 · Pickup detail (S / Offline) | NH titled "< Spare food" | NH round | Back |
| AD-7a · People (S / Empty / Offline) | NH titled "< Manage" | NH round | Back |
| AD-7b · Staff list (S / Offline) | NH titled "< Manage" | NH round | Back |
| AD-7b · Staff by role | NH titled "< People" | NH round | Back |
| AD-7b · Staff access — Ravi (Request / Offline / Failed) | NH titled "< Staff" | NH round | Back |
| AD-7b · Staff access — Ravi (Changed / Sending / Saved) | NH titled "< Staff" | NH round | AD-7b · Staff list (Success) |
| AD-7b · Staff access — Lakshmi (Give) | NH titled "< Manage" | NH round | Back |
| AD-7c · Access request — Suresh / (Offline) | NH titled "< People" | NH round | Back |
| AD-7c · Access request — Lakshmi | NH titled "< Staff" | NH round | Back |
| AD-7d · Audit log (S / Empty / Offline) | NH titled "< Manage" | NH round | Back |
| AD-7d · All activity | NH titled "< History" | NH round | Back |
| AD-8b · Notifications (· new / Empty) | NH titled "< Today" | NH round | Back |
| AD-8c · Search — Recent / Results / No results · new | NH titled "< Today" | NH round | Back |
| AD-8d · Help · new | NH titled "< Today" | NH round | Back |
| Sheets (33): Rules ×5, Scope ×4, Type, Entry ×6, Needs review, Look the same, More nutrients ×2, Open vote, Give access, Verify and close ×4, Awaiting others, Data freshness ×2, Possible causes ×2 | screen behind the scrim: round or titled | round (behind the scrim) | sheet closes with Close (×) / tap outside → Back |

Unchanged with the round chevron already: the 26 admin rows that had Back=Icon before (sheet backgrounds and pre-F4 frames).

## 09 Mess staff (old frames, archived in G2)

| Frame | Old control | New control | Destination |
|---|---|---|---|
| MS-A2–A5 (Scanned, Duplicate, Invalid, Offline) | StaffTopBar titled back | round chevron (component) | Back |
| MS-B2, B2b, B3, B3b, B4, B5, B6, B7 | StaffTopBar titled back | round chevron (component) | Back |
| MS-C2, C3, C4, C4a, C4b, C5 | StaffTopBar titled back | round chevron (component) | Back |
| MS-D1, D1a, D2, D3, D3a, D4 | StaffTopBar titled back | round chevron (component) | Back |
| MS-F1, F5, F6 · Confirm hold | StaffTopBar titled back | round chevron (component) | Back |
| MS-F2, F3, F4 · Confirm hold (Sending, Held, Inspected) | StaffTopBar titled back | round chevron (component) | MS-E · Shift home |
| MS-G1, G3, G4, G5, G7 | StaffTopBar titled back | round chevron (component) | Back |
| MS-G2 Sent, MS-G6 Collected | StaffTopBar titled back | round chevron (component) | MS-E · Shift home |
| MS-H1 (+ Empty), H4, H6 | StaffTopBar titled back | round chevron (component) | Back |
| MS-H5 · End shift summary | StaffTopBar titled back (hidden on the frame) | round chevron (component) | MS-E · Shift home |

## 07 Prototype, 04 / 05 Student

No change. All 156 (07) and 180 (04, 05) Back controls are already the round 44 pt chevron at 16, 58, the same size and offset as admin and staff.
