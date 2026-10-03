# Missing screens (run 3, R2-4)

**Status key:**
- **present:** a frame covers the task.
- **partly:** a frame exists but lacks a state or an entry point.
- **absent → built:** the frame was missing and was built in this stage. Frame names end in " · new".

Every new frame has:
- a label, a Moment note, and the "All data is sample" note;
- a place on the page grid (80 pt gaps, 240 pt between rows);
- only approved patterns: question hero + evidence + DecisionActions, AuditRow rail, BentoTile, pill bar, GlassSheet, EmptyState, OfflineBanner, ListRow / SettingsRow / SearchField / SearchResultRow.

**New components:** none. The stepper on Report a shortage is two GlassButton instances (minus, plus) around a number. It is a composition, not a component (flagged).

**Component change (flagged):** StaffTopBar Type=Home gained a "Trailing" group (End shift + an avatar "R", 40 pt). Its Shift text now fills and truncates. The home screens' shift lines were shortened (Scanner, Pass desk, Supervisor) so nothing truncates.

## A. Inventory

### Mess staff (page 09)

| Task | Status | Frames |
|---|---|---|
| Sign in, verify, confirm profile | present | MS-0 · Sign in / Verifying / Confirm profile |
| Choose shift and mess | present | MS-C1 · Shift and mess select |
| Shift home with only this account's tasks | present (R2-3 + 3 cards here) | MS-E · Shift home (supervisor), MS-A1 (scanner), MS-B1 (pass desk) |
| Scan entry QR (+ duplicate, invalid, offline) | present | MS-A1–A5 |
| Check special pass (+ ID fallback, results, log) | present | MS-B1–B7, B2b, B3b |
| Who's coming, prep plan, change a quantity | present | MS-C2, C3, C4, C4a, C4b, C5 |
| Record waste | present | MS-D1, D1a |
| Feedback and corrective action | present | MS-D2, D3, D3a |
| Shift history | present | MS-D4 |
| End shift (confirm) | present (supervisor sheet added in R2-3) | MS-A6, MS-B8, MS-E2 · End shift confirm · new |
| **Confirm hold** (kitchen) | absent → built | MS-F1 Ask, F2 Sending, F3 Held 1:48 PM, F4 Inspected 1:50 PM, F5 Failed, F6 Offline · new |
| **Report a shortage** | absent → built | MS-G1 Default, G2 Sent, G3 Offline ("Saved, will send") · new |
| **Spare food: log pickup** (supervisor) | absent → built | MS-G4 Offered, G5 Accepted, G6 Collected 3:05 PM, G7 Late · new |
| **Notifications** | absent → built | MS-H1 · Notifications · new, MS-H1 · Notifications (Empty) · new |
| **Profile** (avatar sheet) | absent → built | MS-H3 · Profile sheet · new |
| **Waiting to send** (offline queue) | absent → built | MS-H4 · Waiting to send · new |
| **End shift summary** | absent → built | MS-H5 · End shift summary · new |
| **Help** | absent → built | MS-H6 · Help · new |
| Profile for the scanner and pass-desk accounts | partly | The avatar shows on A1 and B1 but is not linked. Only Ravi's (supervisor) sheet exists. **Gap** |

### Admin (page 10)

| Task | Status | Frames |
|---|---|---|
| Sign in | present | AD-0 ×3 |
| Today: now, decisions, messes, watch | present | AD-1a, AD-1c, AD-1e, AD-1f (+ states) |
| Mess detail Main / North | present | AD-1b · Today — Mess detail, AD-1b · Mess detail — North |
| **Mess detail South, Annexe** | absent → built | AD-1b · Mess detail — South · new (520 of 800, Chapati at risk), AD-1b · Mess detail — Annexe · new (last synced 12:10 PM, not counted). The Messes tiles are linked |
| Crowd, shortages, data gaps | present | AD-2a–2d, AD-2 sheet |
| Safety case, issues, moderation | present | AD-3a–3d (+ states, sheets) |
| Insights overview, forecast, waste, meal | present | AD-4a, 4b, 4c, 4e |
| Reports list | present | AD-4d · Reports & exports |
| **Report preview + export** | absent → built | AD-4f · Report preview · new, AD-4f · Report preview (Exported) · new (Exported 2:36 PM) |
| Menu, dish edit, voting, proposals | present | AD-5a–5d, AD-5c2 |
| Passes, pass exception | present | AD-6a, AD-6b |
| Rewards catalogue | present | AD-6c (+ Catalogue / Redemptions pill switch added) |
| **Rewards redemptions** | absent → built | AD-6c3 · Rewards — Redemptions · new |
| Spare food oversight | present | AD-6d, AD-6d2 |
| People, staff access, audit log | present | AD-7a–7d |
| **Profile** (avatar sheet) | absent → built | AD-8a · Profile sheet · new |
| **Notifications** | absent → built | AD-8b · Notifications · new, AD-8b · Notifications (Empty) · new |
| **Search** | absent → built | AD-8c · Search — Recent / Results / No results · new |
| **Help** | absent → built | AD-8d · Help · new |
| Turnout and reasons | absent → **deferred** (brief) | — |
| Prep accuracy | absent → **deferred** (brief) | — |
| Per-mess report previews (Main, North, South, Annexe) | partly | Only "All messes" has a preview. The other four rows had their chevrons hidden. **Gap** |
| Edit dish for Rice, Paneer, Chapati, Curd | partly | Only Sambar has an Edit dish frame (gap from R2-3) |

### Student (page 07, verify only, nothing changed)

| Task | Status | Frames |
|---|---|---|
| Help | present | Help (5 dead chevrons: rows have no answers; R2-3 finding) |
| Notifications | present | Notifications · Inbox, Notification settings, Notifications · Empty / Loading / Offline / Error |
| Privacy | present | Privacy & data (1 dead chevron) |
| Sign out | present | Sign out (confirm), linked from You |
| About | present | About MealLoop (2 dead chevrons) |

## Cross-role dependencies

| From | To | How it shows | Consistent |
|---|---|---|---|
| Admin AD-3b Safety case "Notify kitchen" (Devi asks 1:41 PM) | Staff MS-F1 Confirm hold "Safety · asked by Devi 1:41 PM" | Staff notification "Devi asked you to confirm the hold 1:41 PM" | yes |
| Staff MS-F3 Held 1:48 PM | Admin AD-8b Notifications "Kitchen confirmed the hold 1:48 PM" | Admin rail, top row → AD-3b | yes |
| Staff MS-F4 Inspected 1:50 PM | Admin AD-3b2 Verify and close | "Devi closes the case" | yes (admin close flow already exists) |
| Staff MS-G2 shortage sent 1:52 PM (Rice, Main Mess, 12 kg left) | Admin AD-2c Shortage alerts | Not added to the admin list (Rice there is North Mess) | **Gap**: the admin list has no Main Mess Rice alert |
| Staff MS-G6 Collected 3:05 PM | Admin AD-6d Surplus (Collected 3:05 PM) | Same times | yes |
| Staff MS-H1 "Pass desk was offline 12:41 PM" | Admin AD-6b Pass exception (desk offline 12:41 PM) | Same time | yes |
| Staff MS-H1 "Curd plan missed the 11:30 cutoff" | Admin AD-1d Curd override (Lapsed 11:30) | Same cutoff | yes (the student 9 AM cutoff, gap 304, is still open) |
| Staff MS-H5 summary "712 entered of 860 expected" | Admin AD-1b Main "712 of 860" | Same | yes |
| Admin AD-6c3 redemptions ₹30 × 63 + ₹40 × 12 = ₹2,370 | Admin hero "₹2,370 of ₹5,000" | Totals match | yes |

## B. Built: links wired in this stage

**Staff:**
- MS-E cards:
  - Confirm the hold → F1;
  - Report a shortage → G1;
  - Spare food pickup → G5.
- MS-E avatar → H3 Profile sheet. Its rows: Notifications → H1, Help → H6, Sign out → MS-0 Sign in.
- Confirm hold: F1 "Yes, it's held" → F2 Sending → (timer) F3 Held → "Mark inspected" → F4. F5 "Try again" → F2.
- G1 "Send alert" → G2. G5 and G7 "Log pickup" → G6.
- The Offline banners on F6 and G3 → H4 Waiting to send.
- MS-E2 End shift → H5 Summary → "Done" → MS-0 Sign in.
- H1 rows open:
  - Shift history;
  - Confirm hold;
  - Prep plan.
- Every new task screen has Back → MS-E.

**Admin:**
- Messes tiles South and Annexe → new Mess detail screens.
- AD-4d "All messes" → AD-4f. Export CSV / PDF → Exported.
- AD-6c pill Redemptions ↔ AD-6c3 Catalogue.
- AD-8a sheet:
  - Notifications → AD-8b;
  - Help → AD-8d;
  - Sign out → AD-0 Sign in.
- AD-8b rows → AD-3b, AD-6b, AD-1d, AD-7c, AD-5d.
- Search:
  - field → Results;
  - recent rows and results → Edit dish Sambar, Mess detail Main / North / South, Staff access Ravi, AD-7c Suresh, Safety case, Pass exception, Curd decision.

**Left for R2-5:**
- the avatar on every admin root → AD-8a;
- the Search circle on every tab bar → AD-8c Recent;
- reachability of state frames.

## Not finished / skipped

| Item | Why |
|---|---|
| Staff Confirm hold "Not yet" path | The brief named only the lime "Yes, it's held". The second action is "Call Devi" (a phone call, no link) |
| Profile sheets for the scanner and pass-desk accounts | No second demo staff person (invent no new people). The avatar on A1 and B1 is unlinked (gap) |
| Admin Notifications Offline | Not in the brief's state list for admin notifications (Empty only) |
| Admin Search Offline | Not requested. SearchField has an Offline variant if needed |

## New sample data (all logged as sample)

**Staff:**
- Hold: asked 1:41 PM, held 1:48 PM, inspected 1:50 PM; "Batch set aside · 30 kg".
- Shortage: Rice 12 kg left, about 30 kg needed till 2 PM; sent 1:52 PM.
- Queue:
  - Waste entry Curd 4 L (1:38 PM);
  - Corrective action Sambar salt cut (1:35 PM);
  - shortage 1:52 PM.
- Notifications yesterday:
  - Dinner waste logged 9:35 PM;
  - Paneer ran short 7:10 PM.
- Summary: ended 2:25 PM; 1 open item; Ravi •••4417 on shift.
- E2 message: "1 open item · waste logged 2:20 PM".

**Admin:**
- South: 520 of 800 (65%), Chapati 200 pcs, 150 still due.
- Annexe: last synced 12:10 PM, not counted.
- Report All messes 5–11 Aug: waste 642 kg (13% less), shortages 2 (1 fewer); exported 2:36 PM.
- Redemptions today (5 rows, 2:31–1:52 PM, students •••4410, •••1187, •••3092, •••5518, •••7764).
- Search recents and results.
- Notifications: 10:52 AM access requests and Tue 8 PM vote (from existing data).

## Renders

`run3/r4/` holds 19 renders. The `ad-4f_report_preview.png` render was taken before the period fix: it shows "12–18 Aug", and the frame now reads "5–11 Aug" to match AD-4d's "Last week · 5–11 Aug".
