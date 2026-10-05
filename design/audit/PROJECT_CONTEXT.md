# MealLoop · project context (handoff)

Updated 2026-10-05 by run Final-3 (H5). Figma file `nzzTAm9YnJRSdKEeYUWUEb` ("MealLoop"). Branch `claude/mealloop-ios-design-e9n1n5`.

**Note:** no earlier PROJECT_CONTEXT.md existed in the repository or its history; G0 of Final-2 also found it absent. This file was created in Final-3 H5:
- **Rewritten from the current file:** sections 4, 7, 9 and 11.
- **The owner's taste (section 3) and lessons (section 10)** are taken from the owner's notes already in `design_intent.md` and from the lessons recorded in the run logs. The wording is unchanged in substance.

`STATE.md` is the short "where are we" card. Read this file first, then `design_intent.md`, then `STATE.md`.

## 1. What MealLoop is

MealLoop is an iOS app for institutional hostel messes, starting with SRM. It has three logins: student, mess staff and admin.

Its purpose is to cut food waste and shortages by knowing who is coming. The main parts are:
- students answer per meal (I'm in / Skip / Not sure) before a cutoff;
- the door counts entries;
- the kitchen gets a recommended plan;
- admins see turnout, waste, issues and decisions.

The mentor called the first version "basically an attendance app". The 2026-level direction is a **Prep Agent** (recommends how much to cook, escalates when unsure) and a **Crowd Agent** (live crowd level). The demand, change-to-plan, crowd and shortage screens are their surfaces.

## 2. Roles and logins

| Login | Who | Signs in as (sample) |
|---|---|---|
| Student | Hostel students | Aarav Sharma, RA2411003010238, masked "Aarav ·0238", Main Mess, Block A |
| Mess staff | One login with permission bundles: Door scanner, Pass desk, Kitchen, Supervisor | Ravi (supervisor), Main Mess |
| Admin | Food head and admins, all messes | Devi Raman, Food head (DR), 4 messes: Main, North, South, Annexe |

The demo admin holds every approval. In production each approval stays with its role.

## 3. The owner's taste (kept)

- **"Generic" is the number-one complaint.** A default ListRow with a pill and chevron on white cards reads as boilerplate SaaS. Reuse a distinctive pattern first: LiveDial, Mess / Crowd / Metric badges, PrepCard swipe cards, stacked cards, filter-chip rows, the black hero card.
- **Rejected:**
  - too much per card;
  - several elements fighting to be loudest;
  - "bits and pieces" screens;
  - unexplained gaps.
- **One fact per line, and one clear hero per screen.**
- **Status colours** are muted and consistent. Never full-card traffic-light fills.
- **Lime `#D4F25A`** is the only brand accent (rule V2 in `design_intent.md`):
  - the wash on every page;
  - otherwise only the primary action on black, the current step, Success, filled arcs on black, one highlight per hero, and tickets and coupons;
  - at most three lime elements per frame;
  - never lime text on white.
- **"Lab" direction:** canvas #EDEDE8, white cards, #111 ink, numbers in mono. iOS Liquid Glass only on the floating tab capsule, 44 pt nav circles, sheets and menus.
- **Horizontal swipe** only for four or more rich cards where stacking would push key content off screen. Never use it when there is blank space below.
- **Plain words on screen** (UI words table in `design_intent.md`): To do, Alerts, Urgent, Spare food, Came in, Credits, and so on.
- **Readability:**
  - body 15 pt, secondary 13, meta 12; staff primary content 17 pt or more;
  - contrast 4.5:1;
  - targets 44 pt (staff 56);
  - wrap, never truncate; never shrink fonts;
  - disabled controls are outlined or dashed, never faded;
  - mono only for numbers, times, units and IDs.
- **Fill floor:** content reaches 75% of the way to the tab bar by enlarging the data visual, never by adding blocks. Empty states are exempt (rule 9a), and AD-2b is an accepted exception (rule 9b).
- **Commits:** author VeeraaVikash, no co-author line.

## 4. Product by role (current file)

### Student (04 Light is the source, 05 is the Dark twin, 07 is the prototype)

- **Home:** changes with the time of day. It has:
  - the meal hero with I'm in / Skip / Not sure;
  - a cutoff (lunch 9 AM, dinner 6 PM, shown to students);
  - a 3-hour recheck, also shown on the lock screen;
  - tiles for Entry QR and the Special pass;
  - the crowd row, the "You said…" follow-up, and the credits chip (120 pts, or "Credits soon" before launch).
- **Meals:**
  - a day strip and Breakfast / Lunch / Dinner;
  - the black Current meal card, with dish rows at 44 pt;
  - dish detail with a nutrition bento;
  - menu changed, not published, no menu, loading, offline and error states.
- **Meal detail and answers:** Answer Yes / No / Not sure, each with Sending → Saved and Failed. The reason sheet ("Why skipping?") uses the same reason list as admin.
- **Plate tracker (private):**
  - first run;
  - Your plate expanded, adjusting, saved and offline;
  - You · Daily breakdown, nutrients detail, weekly view and quick add;
  - Settings · Nutrition and Daily goal.
- **Special pass** (Wednesday special): Pass · Available → Hold to use → Live 1–3 as a BigTicket (rotating code and colour: 7A3F lime, K2M9 blue, 4XQD orange) → Used. Also Not today, Expired, Already used, Wrong mess and Unavailable.
- **Entry QR:** QR, Scanned, Discrepancy (Sending, Failed, Under review) and Entry history.
- **Crowd:** a dial hero, today-so-far chart, "About this estimate" sheet, and Stale / Unavailable states.
- **Credits** (the points balance; the Rewards frames, titled "Credits" since G9 and H3):
  - a black balance hero (120 pts, 80 more for the Biryani coupon);
  - tickets: Juice 50, Ice cream 80, Biryani coupon 200 (launches Friday);
  - Get → Sending → Ticket · Juice (BigTicket Live) → Used;
  - Credits history, balance issue, coming soon, loading, offline and error states.
- **Community:**
  - a list of reports from students at the student's mess (Active / Fixed / Supported);
  - detail, Support (Me too), comments sheet, suggestion, hidden, archived, empty, loading and offline states;
  - an ⓘ Community info sheet (H11).
- **Report a problem:** categories → urgent or details → Sending → Receipt → My reports, each with a step bar.
- **Feedback:** rate a dish in two steps, plus Recheck.
- **You:**
  - ID card;
  - tiles: Spending (private), Credits, Attendance, Reports;
  - Notifications settings, Privacy & data, Feedback history, Help, About and Sign out.
- **Also:** Notifications inbox (unread = lime mark), Search (Empty, Typing, Menu result, No results, Offline), Waste (student view), and the lock-screen previews.

### Mess staff (09)

- **Sign in and job:** Sign in → Verifying → Confirm profile → **Pick your job** (Door scanner, Pass desk, Kitchen, Supervisor) → Start shift → the job's **Home**.
- **Homes:** at most 4 big tiles plus rows, and a shared tab bar with Home, Alerts and Me.
- **Door scanner (A1–A10):**
  - Scan (viewfinder) and full-screen results: Welcome, Already in, Not valid, Wrong meal, Offline;
  - a "Can't scan?" keypad, the Count (713 in, by 15-minute slot), Report a problem and Sent.
- **Pass desk (B1–B7):** Pass check (Live / Changing / Offline; there is no redeem), Check ID, Has a pass / No pass today, Log by hand, Pass problem → Sent to Devi.
- **Kitchen (C1–C8):**
  - How much to cook (Plan ready / Confirmed / Offline) and the Sambar dish detail;
  - Running out? (alert), Add a batch, Record waste (a three-step modal);
  - Fixes and Log a fix, and Spare food (Offered / Accepted / Collected / Late).
- **Supervisor (D1–D3):** Change the plan (Saved · Devi told / Waiting for Devi / Cutoff passed) and Queue check.
- **Alerts (E1–E2)** and **Confirm hold (F1–F5):** a full-screen modal with three steps, plus Failed and Offline.
- **Me (G1–G6):** My shifts, Waiting to send, Language, Help (Kitchen job only), Switch job, End shift summary, Sign out.

### Admin (10)

- **Sign-in and chrome:** AD-0 Sign in → Verifying → Confirm profile. Four tabs plus a Search circle; the avatar opens the Profile sheet (Notifications, Help, Sign out).
- **Today:**
  - Now (AD-1a): greeting, one question with one action, the meal time rail, mess rings;
  - To do (AD-1c Decisions) and the Curd change-to-plan decision (AD-1d);
  - Messes (AD-1e), with mess details for Main, North (640 of 700), South (520 of 800) and Annexe (not counted, last synced 12:10 PM);
  - Alerts (AD-1f Watch), Crowd (AD-2a / 2b), Shortage alerts (AD-2c), Missing data (AD-2d) and the "How fresh is this?" sheet.
- **Issues:** Urgent (SOS) / Dishes / Community views (AD-3a), the Safety case with Notify kitchen → Confirmed → Check and close (AD-3b), dish feedback (AD-3c) and community moderation (AD-3d).
- **Insights:**
  - Overview (AD-4a), Waste (AD-4c), Meal record (AD-4e);
  - Reports & exports (AD-4d) and the **Weekly report**: 9 A4 pages, a preview, an Export sheet, Exported, and the AD-4f section.
- **Manage hub (AD-5-0):**
  - Menu (AD-5a) and Edit dish (AD-5b);
  - Votes and Proposals (AD-5c / 5c2 / 5d);
  - Special passes and Pass exception (AD-6a / 6b);
  - **Rewards** (admin keeps the word): Catalogue / Redemptions (AD-6c / 6c3; 63 juices, 12 ice creams, Rs 2,370 of Rs 5,000);
  - Spare food and Pickup (AD-6d / 6d2);
  - People, Staff access (Who can do what), Access request and History (AD-7a–7d).
- **AD-8:** Profile sheet, Notifications (+ Empty / Offline), Search (Recent / Results / No results / Offline) and Help.

### Cross-role loops

They are drawn to match, but the prototypes are separate:
- Notify kitchen (admin) → Confirm hold (staff) → "Kitchen confirmed the hold 1:48 PM" (admin).
- Running out? (staff) → Shortage alerts (admin).
- Pass problem (staff) → Pass exception (admin) → reissued pass (student).

## 5. Rules and definitions

These live in `design_intent.md`: the BACK STANDARD, brand rule V2, the design rules (20–29), the fill floor (9–12, 9a, 9b), definitions (intent, forecast, entered, served, crowd, donated), permissions, offline rules, reasons for absence, sample rules and UI words. Stage-by-stage rules are in `prototype_contract.md`.

## 6. Sample data rules

- All data is sample. Every new frame carries the "All data is sample" chip.
- Run default times: Today 1:40 PM, Insights 2:35 PM, offline banner "Offline · saved 1:38 PM".
- People:
  - Devi (food head), Ravi (supervisor), Aarav ·0238 (student);
  - Karan ·5518 (pass reissue), Suresh and Lakshmi (access requests), Meena (Give access).
- Do not invent new people. New numbers are logged in the run's report.

## 7. File map and components (current file)

| Page | Id | Contents |
|---|---|---|
| 00 MoodBoard | 0:1 | References |
| 00 Before | 44:2 | The first version (81 frames in sections), kept for comparison |
| 01 Foundations | 44:5353 | Colour variables (Light / Dark modes), type, spacing, radii, glass recipe |
| 02 Mood Frames | 44:5354 | 24 approved review frames |
| 03 Components | 44:5355 | 97 component sets and 38 single components, each with a usage note |
| 04 Student Light | 44:5356 | 300 student frames (source), with labels, Moment notes and sample chips |
| 05 Student Dark | 44:5357 | The same 300 frames with the Dark mode set on the frame |
| 06 States & Accessibility | 44:5358 | 14 frames: accessibility XL and the Tamil length test |
| 07 Prototype & QA | 44:5359 | 262 frames: the student prototype (start **Student · Sign in**) and the state gallery (Gallery · A–O, no start) |
| 08 Voice & Patterns | 147:2 | Glossary, format rules, copy check |
| 09 Mess Staff | 732:2 | 77 staff frames (start **Mess staff · Sign in**) |
| 10 Admin | 811:21055 | 163 admin frames, plus the "AD-4f Weekly report" section (9 A4 page components and 13 phone frames). Starts: **Admin · Sign in, Admin · Today, Admin · Issues, Admin · Insights, Admin · Manage** |
| 11 Admin Dark | 1214:2 | 3 stale frames, not in the prototype |
| 99 Archive | 221:2 | 153 replaced frames, links stripped |

**Flow starts:** exactly the seven above. Never copy a flow start, and reset starts after any link edit, because Figma adds "Flow 1" on its own.

### Components to know (page 03)

- **BackButton standard:** the one Back used everywhere is **GlassButton** (74:101) `Kind=Icon` with the `chevron.left` symbol. It is a 44 pt Liquid Glass circle, top-left at x 16, y 58, with no title text (UIKit `backButtonDisplayMode = .minimal`).
  - **NavHeader** (74:136) has `Type=Large Title | Inline Title`, `Back=Icon`.
  - Tab roots have no Back.
  - Staff screens wrap the Back in a transparent 56 pt hit area.
  - **Deprecated and deleted in Final-2 G1:** the titled-back variants, i.e. NavHeader `Back=Titled` ×2 and GlassButton `Kind=Titled` with its Label property. Do not rebuild them.
- **BigTicket** (1527:125830): State=Live / Used / Not today. A large notched ticket used for the Credits ticket detail and the Special pass. Live shows the rotating code and colour pill, "Changes in N s", the stub (Aarav ·0238) and a Valid tag.
- **MenuDishTile** (1468:119999): Kind=Dish / Ticket / Add × Diet. The admin menu dish tiles on AD-5a.
- **PlateRingHero** (1469:2051): Meal=Breakfast / Lunch / Dinner. The plate-ring hero of the plate tracker.
- **DishLine** (102:1260): the dish row in the black Current meal card. Rows on the menu frames are 44 pt (instance padding 10, Final-3 H1).
- **IntentChoice** (77:183): I'm in / Skip / Not sure. `State=Disabled` is outlined and dashed at full opacity (Final-2 G12).
- **Others:**
  - CreditsChip (100:1096, "Credits soon" before launch), BentoTile (100:1142), CouponCard (993:1881);
  - IssueCard (101:1470) and ReportTicket (101:1285), whose list cards show the current step in ink;
  - NotificationRow (75:408; read rows show a white mark), StepBar (100:1045);
  - LiveDial (820:87165), MessBadge (814:87225), MetricBadge (881:1850), DecisionActions (1290:2031), HeroActions (1311:1990);
  - StaffTopBar (1427:2333), **StaffTabBar** (1507:120513), AdminTabBar (808:86775), TabBar (74:236), TabSearchButton (426:1681);
  - SearchField (428:1725), SearchResultRow (428:1760), GlassSheet (74:275), ScopeSheet (967:1838), RulesSheet (967:1862);
  - EmptyState (75:270), OfflineBanner (75:187), SampleNote (75:257), StatusBar (74:2), HomeIndicator (74:21).
- **Report pages** (page 10, AD-4f section): 9 A4 components (595 × 842), reused by the preview thumbnails and the viewers.

### Variables (selected)

- **Colour:** ink 45:6, ink2 45:7, surface 45:4, border 45:8, lime 45:15, hero 51:3, onHero 45:28, onHero2 51:5, onLime 58:2, quiet 45:13, canvas 45:3.
- **Wash:** 838:89661 / 838:89662.
- **Mode:** the Dark mode is collection 45:2, mode 45:1, set on the frame.

### Tools

Tools live in `design/audit/tools/` and are also stored in the file's shared plugin data, namespace `mealloop`:

| Tool | What it does |
|---|---|
| snaptool | Full-walk snapshots and diffs (frames, links, flow starts) |
| sb2 | Staff builder |
| rb8 | Report builder |
| an11 | Label, Moment note and sample chip |
| ios13 | iOS check |
| trunc13 | Real truncation |
| tgt14 | 44 pt targets, all layer names |
| hit14 | Hit areas |
| wire7 | Link manifest |
| reach8 | Reachability |
| qc8 / fa1 | Lime, fill and clearance checks |
| mw10 | Mono words |

## 8. Prototype

The owner creates three prototype links (Present → pick the start → Share), one per Sign in start. `DEMO.md` holds the 13 / 14 / 15-step walks and the cross-role loops. The 96-frame student state gallery has no start; present it from **Gallery · A · Sign in**.

Reachability (Final-3 H6) is in `final3_report.md`. There are 0 dead ends; every unreached frame is a state.

## 9. Decisions log

| When | Decision |
|---|---|
| 2026-09-30 | Three logins. Mess staff is one login with permission bundles. Admin has four tabs by intent (Today, Issues, Insights, Manage). |
| 2026-09-30 | Supervisor changes to the plan go live with a mandatory reason; the food head is told afterwards; large changes need approval first (limits are drafts). |
| 2026-09-30 | Privacy: masked student IDs; feedback is aggregate; the calorie and spending trackers are private and never feed admin data. |
| 2026-09-30 | Voting: a hard gate for "Doesn't qualify", a soft warning plus a logged override for "Needs review". A vote never changes the menu by itself. |
| 2026-10-01 | Definitions: intent, forecast (with rule version and cutoff), entered, served, crowd (a level, never "inside"), donated (only once collected). No approvals offline. A mess that is not reporting is "not comparable". |
| 2026-10-01 | Design rules 20–29: never hide, only order; every number opens its source; charts show values; one page layout; no text below 12 pt; mono only for numbers. |
| run 3 | Brand rule V2: lime wash everywhere, and lime only in the listed roles, at most 3 per frame. Plain UI words on pages 09 and 10. |
| Final-2 G1 | BACK STANDARD: one 44 pt round glass Back at 16, 58 (`.minimal`); tab roots have none; sheets have a grab handle, Close and tap-outside; sequences are modal. Large titles kept. Titled-back variants deleted. |
| Final-2 G2–G7 | Staff rebuilt around **Pick your job**. At most 4 tiles per home; task pages hide the tab bar and keep one fixed bottom action; staff targets 56 pt (44 pt visual Back inside a 56 pt hit area); one shared staff tab bar (Home, Alerts, Me). |
| Final-2 G8 | The weekly report is 9 A4 page components (body text 10 pt minimum on A4). The preview thumbnails keep the document's own lime (a logged exception). |
| Final-2 G9 | The student points balance is **Credits**. Tickets are BigTickets. Get goes straight to Sending → ticket (the confirm sheet was archived). Frame names keep "Rewards / Offer" for link continuity. |
| Final-2 G10 | List cards show the current step in ink; only unread notifications carry the lime mark. 145 component texts moved off mono. |
| Final-2 G11–G12 | Offline admin Notifications and Search; the Community info sheet; links copied from each screen's main version; locked answers stay unlinked; IntentChoice Disabled is outlined, not faded. |
| Final-3 H1 | Every control has a 44 pt tap area (an invisible hit area with the link moved onto it; the control's look is unchanged). Menu dish rows are 44 pt. |
| Final-3 H2 | Long tile text wraps (Crowd stale "Show at the counter"); the font is never shrunk. |
| Final-3 H3 | Student strings that mean the balance read **Credits**; admin keeps **Rewards**. |
| Final-3 H4 | Empty states (including AD-8c No results) are exempt from the fill floor (rule 9a). AD-2b is an accepted exception at 65% (rule 9b). |

## 10. Lessons (kept)

- **Snapshot first.** Every stage opens with a full-walk snapshot that must equal the previous end, and closes with a diff that includes links and flow starts. Nested changes don't show in the frame signature, so check them by render.
- **Figma adds a "Flow 1" start** when links are added on a page. Reset the starts after every link edit, and never clone a frame that carries a start.
- **Cloning a variant drops its text-property bindings.** Re-bind and check every clone.
- **`resize()` resets auto-layout sizing.** Set `primaryAxisSizingMode` or the layout sizing again after resizing.
- **A check is only as good as its layer names.** read6 skipped Pill, Chip, Scope, Icon and similar names, so 91 small targets went unseen until Final-3 checked every name.
- **Truncation turned on is not the same as text being cut off.** Measure by laying the text out with wrapping; only 5 of about 1,500 texts were really cut.
- **Layers under a sheet's scrim** are counted by fa1 / qc8. Read their dead-chevron and lime counts with that in mind.
- **The plugin runtime has no locale formatting.** Insert thousands separators by hand.
- **Calls time out at 60 s and roll back fully.** Work in chunks of about 90 frames, store tools in shared plugin data, and never use backticks or `${` in stored bodies.
- **Instance sublayers can't take children.** Hit areas go on the phone frame's top level, inside the fixed group when the control sits in a fixed bar.
- **Two fix attempts, then log it and undo it.** For example, the AD-2b dial resize left empty bands twice.

## 11. Status and what remains (2026-10-05)

**Done:**
- Every brief through Final-3 H5. H6 (the final checks and final3_report.md) closes the run.
- 0 controls under 44 pt on 07, 09 and 10; 0 real truncations; 0 mono words on 07 and 10; no frame with 4 or more lime elements on 07 or 10.
- Reachability: 0 bugs and 0 dead ends.

**Open gaps** (`prototype_gaps.md`):
- **330:** 12 student list screens under the fill floor; not empty states.
- **331:** the student sign-in wash.
- **335:** Pass confirm and Reminder sheets have no round Close.
- **336:** no unanswered lunch Meal detail.
- **337:** admin status bar shows 9:41.
- **338:** repeated mess-detail sample.
- **339:** mono spaces in ReportTicket.
- **340–341:** tooling.
- Earlier open gaps carried by the owner include 303 / 312 (Ravi's role), 304 (lunch cutoff) and 315 (state frames shown on the canvas only).

**Destination-absent screens:** `still_absent.md`. The main ones are Edit dish ×10 dishes, expense edit, scope results, community report detail and Merge, data-feed detail, surplus per dish, audit log by type, help articles, staff dish detail, and the ice cream ticket.

### Open decisions for the owner

1. **iOS 27 kit.** The file uses the iOS 26 Liquid Glass components; no iOS 27 kit was available. Decide whether to move to an iOS 27 kit when one exists, and which components to swap: StatusBar, HomeIndicator, NavHeader, GlassButton, GlassSheet and the tab bars.
2. **Turnout and reasons page.** Insights has Overview, Meal record and Waste, and the weekly report has a Turnout page. There is no in-app Turnout & reasons screen yet: three groups (said yes and came in, said yes and did not come in, no response and came in) plus the reason breakdown. Decide whether to build it and where it lives.
3. **Admin coupon wallet.** Redemptions shows what was redeemed. There is no view of coupons issued, used and outstanding per student. Decide whether admins need it and what it may show, given the privacy rules.
