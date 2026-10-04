# Back audit (final-fix F4)

Every admin and staff frame that is not a tab root and not a sheet now has the standard iOS back control top-left:
- a chevron plus the short title of the screen it was opened from;
- 44 pt tall.

**Components:**
- the existing GlassButton got a **Kind=Titled** variant (flagged, F1);
- **NavHeader** got **Back=Titled** variants (flagged). The student pages keep Back=Icon, so student instances are untouched;
- **StaffTopBar Type=Task** now uses the titled back.

**How the label and target are chosen** (`tools/back4.js`, `mealloop/back4`):
- **Label:** the origin is the frame's nearest predecessor in the link graph from the role's homes.
  - Search is used only when no other path exists, and a sheet passes through to the screen behind it.
  - The label is the origin's short title, or "Back" when that is longer than 13 characters (none were).
- **Target:**
  - Base screens use the prototype Back action, so they return to wherever the user came from.
  - State frames (Sending, Saved, Approved, Changed, the meal pills…) navigate to their family's origin, Move out 0.3. A Back never lands on a "Sending" frame that would auto-advance.
- **Old styles removed:**
  - the icon-only glass circle on 115 admin frames and 37 staff frames;
  - the run-3 "Back → shift home" fixed target on staff.

**Sheets:**
- All 33 admin sheets and the staff profile sheet keep the grab handle and Close.
- Close and tap-outside (Dismiss) now go Back.
- The three End shift confirms (MS-A6, MS-B8, MS-E2) are alerts, not sheets: they keep Cancel. Logged.

**Not changed (intentional):**
- tab roots;
- the sign-in flows (AD-0, MS-0);
- MS-C1 Pick your shift (setup step);
- MS-H5 End shift summary (end of flow; Done → Sign in).

**Student (report only):**
- 156 of 261 page-07 frames use the icon-only back (NavHeader Back=Icon); 27 more have a NavHeader with no back.
- Examples: Recheck · Inbox, Meals · Dish detail, Meals · Meal detail, Entry · QR, Entry · Scanned, Entry · Discrepancy, Pass · Available, Pass · Confirm.
- To adopt the titled back: switch these instances to Back=Titled and set the label (04 source → 05 → 07).

## Admin (page 10)

Frames in the same family are grouped. "glass circle back (icon only)" is the old control.

| Frame | Old control | New control | Destination |
|---|---|---|---|
| AD-1a · Today — Now | tab root | no Back | — |
| AD-1b · Today — Mess detail | glass circle back (icon only) | < Today | Back (opened from AD-1a · Today — Now) |
| AD-2a · Crowd — All messes | glass circle back (icon only) | < Alerts | Back (opened from AD-1f · Today — Watch) |
| AD-2b · Crowd — Mess detail | glass circle back (icon only) | < Crowd | Back (opened from AD-2a · Crowd — All messes) |
| AD-2c · Shortage alerts | glass circle back (icon only) | < Alerts | Back (opened from AD-1f · Today — Watch) |
| AD-3a · Issues — SOS | tab root | no Back | — |
| AD-3b · Safety case | glass circle back (icon only) | < Today | Back (opened from AD-1a · Today — Now) |
| AD-3c · Issue detail — Dish feedback | glass circle back (icon only) | < Meal | Back (opened from AD-4e · Insights — Meal (Success)) |
| AD-3d · Community moderation | glass circle back (icon only) | < Issues | Back (opened from AD-3a · Issues — Community (Success)) |
| AD-4a · Insights — Overview (Success / Empty / Offline) | tab root | no Back | — |
| AD-4b · Forecast vs actual — Main Mess | glass circle back (icon only) | < Meal | Back (opened from AD-4e · Insights — Meal (Success)) |
| AD-4c · Insights — Waste (Success / Offline / Empty) | titled back (F1) | < Insights | Back (opened from AD-4a · Insights — Overview (Success)) |
| AD-4d · Reports & exports | glass circle back (icon only) | < Insights | Back (opened from AD-4a · Insights — Overview (Success)) |
| AD-5b · Edit dish — Sambar | glass circle back (icon only) | < Menu | Back (opened from AD-5a · Menu — Lunch · new) |
| AD-5b · Add dish (Empty) | glass circle back (icon only) | < Menu | Back (opened from AD-5a · Menu — Lunch · new) |
| AD-5b · Edit dish (Offline) | glass circle back (icon only) | < Menu | Back (opened from AD-5a · Menu — Lunch · new) |
| AD-5c · Menu voting (Success / Empty / Offline) | glass circle back (icon only) | < Manage | Back (opened from AD-5-0 · Manage hub (Success)) |
| AD-5d · Vote result → final decision | glass circle back (icon only) | < Menu votes | Back (opened from AD-5c · Menu voting (Success)) |
| AD-6a · Special passes (Success / Empty / Offline) | glass circle back (icon only) | < Manage | Back (opened from AD-5-0 · Manage hub (Success)) |
| AD-6b · Pass exception (Open) | glass circle back (icon only) | < Passes | Back (opened from AD-6a · Special passes (Success)) |
| AD-6b · Pass exception (Declining / Sending / Approved) | glass circle back (icon only) | < Passes | navigate to AD-6a · Special passes (Success) |
| AD-6b · Pass exception (Failed) | glass circle back (icon only) | < Passes | Back |
| AD-6c · Rewards (Success / Empty / Offline) | glass circle back (icon only) | < Manage | Back (opened from AD-5-0 · Manage hub (Success)) |
| AD-6c3 · Rewards — Redemptions · new | glass circle back (icon only) | < Rewards | Back (opened from AD-6c · Rewards (Success)) |
| AD-6d · Surplus (Accepted / Empty / Offline / Offered / Collected / Late) | glass circle back (icon only) | < Manage | Back (opened from AD-5-0 · Manage hub (Success)) |
| AD-6d2 · Pickup detail (Success / Offline) | glass circle back (icon only) | < Spare food | Back (opened from AD-6d · Surplus (Accepted)) |
| AD-5c2 · Proposals (Success / Empty / Offline / Vote open) | glass circle back (icon only) | < Manage | Back (opened from AD-5-0 · Manage hub (Success)) |
| AD-7a · People (Success / Empty / Offline) | glass circle back (icon only) | < Manage | Back (opened from AD-5-0 · Manage hub (Success)) |
| AD-7b · Staff list (Success / Offline) | glass circle back (icon only) | < Manage | Back (opened from AD-5-0 · Manage hub (Success)) |
| AD-7b · Staff by role | glass circle back (icon only) | < People | Back (opened from AD-7a · People (Success)) |
| AD-7b · Staff access — Ravi (Request / Offline / Failed) | glass circle back (icon only) | < Staff | Back (opened from AD-7b · Staff list (Success)) |
| AD-7b · Staff access — Ravi (Changed / Sending / Saved) | glass circle back (icon only) | < Staff | navigate to AD-7b · Staff list (Success) |
| AD-7b · Staff access — Lakshmi (Give) | glass circle back (icon only) | < Manage | Back (opened via the hub Give access sheet) |
| AD-7c · Access request — Suresh | glass circle back (icon only) | < People | Back (opened from AD-7a · People (Success)) |
| AD-7c · Access request — Lakshmi | glass circle back (icon only) | < Staff | Back (opened from AD-7b · Staff list (Success)) |
| AD-7c · Access request (Offline) | glass circle back (icon only) | < People | Back (opened from AD-7a · People (Success)) |
| AD-7d · Audit log (Success / Empty / Offline) | glass circle back (icon only) | < Manage | Back (opened from AD-5-0 · Manage hub (Success)) |
| AD-7d · All activity | glass circle back (icon only) | < History | Back (opened from AD-7d · Audit log (Success)) |
| AD-4e · Insights — Meal (Success / Offline / Empty) | titled back (F1) | < Insights | Back (opened from AD-4a · Insights — Overview (Success)) |
| AD-1a · Today — Now (Empty / Offline) | tab root | no Back | — |
| AD-2a · Crowd — All messes (Empty / Offline) | glass circle back (icon only) | < Alerts | Back (opened from AD-1f · Today — Watch) |
| AD-2c · Shortage alerts (Empty / Offline) | glass circle back (icon only) | < Alerts | Back (opened from AD-1f · Today — Watch) |
| AD-3a · Issues — SOS (Empty / Offline), Dishes and Community views (S / E / O) | tab root | no Back | — |
| AD-3d · Community moderation (Empty / Offline) | glass circle back (icon only) | < Issues | Back (opened from AD-3a · Issues — Community (Success)) |
| AD-1b · Today — Mess detail (Offline) | glass circle back (icon only) | < Today | Back (opened from AD-1a · Today — Now) |
| AD-3b · Safety case (Offline / Notified / Failed / Confirmed) | glass circle back (icon only) | < Today | Back (opened from AD-1a · Today — Now) |
| AD-3c · Issue detail — Dish feedback (Offline) | glass circle back (icon only) | < Meal | Back |
| AD-2b · Crowd — Mess detail (Offline) | glass circle back (icon only) | < Crowd | Back |
| AD-1c · Today — Decisions (S / E / O) | titled back (F1) | < Today | Back (opened from AD-1a · Today — Now) |
| AD-1d · Decision — Curd override (Lapsed / Open / Read-only / Offline) | glass circle back (icon only) | < Main Mess | Back (opened from AD-1b · Today — Mess detail) |
| AD-1e · Today — Messes (S / E / O) | titled back (F1) | < Today | Back (opened from AD-1a · Today — Now) |
| AD-1f · Today — Watch (S / E / O) | titled back (F1) | < Today | Back (opened from AD-1a · Today — Now) |
| AD-2d · Data gaps | glass circle back (icon only) | < Alerts | Back (opened from AD-1f · Today — Watch) |
| AD-3a2 · All safety cases | glass circle back (icon only) | < Issues | Back (opened from AD-3a · Issues — SOS) |
| AD-1b · Mess detail — North / South · new / Annexe · new | glass circle back (icon only) | < Messes | Back (opened from AD-1e · Today — Messes) |
| AD-4f · Report preview · new | glass circle back (icon only) | < Reports | Back (opened from AD-4d · Reports & exports) |
| AD-4f · Report preview (Exported) · new | glass circle back (icon only) | < Reports | navigate to AD-4d · Reports & exports |
| AD-8b · Notifications · new (and Empty) | glass circle back (icon only) | < Today | Back (opened via the Profile sheet) |
| AD-8c · Search — Recent / No results · new | glass circle back (icon only) | < Today | Back (opened from the Search circle) |
| AD-8c · Search — Results · new | glass circle back (icon only) | < Today | navigate to AD-1a · Today — Now |
| AD-8d · Help · new | glass circle back (icon only) | < Today | Back (opened via the Profile sheet) |
| AD-5a · Menu — Lunch · new, Menu (Empty) · new, Menu (Offline) · new | titled back (F3) | < Manage | Back (opened from AD-5-0 · Manage hub (Success)) |
| AD-5a · Menu — Breakfast · new, Menu — Dinner · new | titled back (F3) | < Manage | navigate to AD-5-0 · Manage hub (meal pills switch in place) |
| AD-0 · Sign in / Verifying / Confirm profile | skipped (sign-in flow) | — | — |
| All 33 sheets (Rules, Scope, Type, Needs review, Look the same, More nutrients ×2, Open vote, Awaiting others, Data freshness ×2, Possible causes ×2, Verify and close ×4, Give access, Profile, Entry ×6) | sheet | grab handle + Close + Dismiss (tap outside) | Back (closes the sheet) |

## Staff (page 09)

| Frame | Old control | New control | Destination |
|---|---|---|---|
| MS-A1 · Scanning, MS-B1 · Scan the pass, MS-E · Shift home, MS-E-empty | home (no tab bar) | no Back | — |
| MS-A2 · Scanned | glass circle (icon only) → shift home | < Scanner | Back (opened from MS-A1) |
| MS-A3 · Duplicate, MS-A4 · Invalid, MS-A5 · Offline | glass circle (icon only) → shift home | < Scanner | Back (scan-result states) |
| MS-B2 · ID fallback, MS-B3 · Valid — available, MS-B7 · Redemption log | glass circle (icon only) → shift home | < Pass desk | Back (opened from MS-B1) |
| MS-B4 · Already redeemed, MS-B5 · Invalid / expired, MS-B6 · Offline | glass circle (icon only) → shift home | < Pass desk | Back (scan-result states) |
| MS-B3b · Redeemed | glass circle (icon only) → shift home | < Pass | Back (opened from MS-B3) |
| MS-B2b · Typing the SRM ID | glass circle (icon only) → shift home | < ID check | Back (opened from MS-B2) |
| MS-C2 · Demand dashboard, MS-C3 · Prep recommendation, MS-D1 · Waste entry, MS-D2 · Feedback summary, MS-D4 · Shift history | glass circle (icon only) → shift home | < Shift | Back (opened from MS-E) |
| MS-C4 · Override edit, MS-C5 · Menu and special meal | glass circle (icon only) → shift home | < Prep | Back (opened from MS-C3) |
| MS-C4a · Override saved, MS-C4b · Override awaiting approval | glass circle (icon only) → shift home | < Change | Back (opened from MS-C4) |
| MS-D1a · Waste entry saved | glass circle (icon only) → shift home | < Waste | Back (opened from MS-D1) |
| MS-D3 · Corrective-action log | glass circle (icon only) → shift home | < Feedback | Back (opened from MS-D2) |
| MS-D3a · Corrective action saved | glass circle (icon only) → shift home | < Fix | Back (opened from MS-D3) |
| MS-F1 · Confirm hold — Ask · new, F5 Failed, F6 Offline | glass circle (icon only) → shift home | < Shift | Back (opened from MS-E) |
| MS-F2 Sending, F3 Held, F4 Inspected · new | glass circle (icon only) → shift home | < Shift | navigate to MS-E · Shift home |
| MS-G1 · Report a shortage · new, G3 Offline | glass circle (icon only) → shift home | < Shift | Back (opened from MS-E) |
| MS-G2 · Report a shortage — Sent · new | glass circle (icon only) → shift home | < Shift | navigate to MS-E · Shift home |
| MS-G4 Offered, G5 Accepted, G7 Late · new | glass circle (icon only) → shift home | < Shift | Back (opened from MS-E) |
| MS-G6 · Spare food — Collected · new | glass circle (icon only) → shift home | < Shift | navigate to MS-E · Shift home |
| MS-H1 · Notifications · new (and Empty), MS-H4 · Waiting to send · new, MS-H6 · Help · new | glass circle (icon only) → shift home | < Shift | Back (opened via the Profile sheet) |
| MS-A6, MS-B8, MS-E2 · End shift confirm | alert | Cancel (kept) | the home it sits on |
| MS-H3 · Profile sheet · new | sheet | grab handle + Close + Dismiss | Back (closes the sheet) |
| MS-0 · Sign in / Verifying / Confirm profile, MS-C1 · Shift and mess select, MS-H5 · End shift summary · new | skipped (sign-in, setup, end of shift) | — | — |
