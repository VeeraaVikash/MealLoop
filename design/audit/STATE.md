# MealLoop · STATE (2026-10-19, after run SUPERVISOR)

The short "where are we" card. The full context is in `PROJECT_CONTEXT.md`, the rules are in `design_intent.md` (latest section "SUPERVISOR 2026-10"), the run logs are in `run_status.md`, and the latest reports are `supervisor/report.md` (SUPERVISOR), `kitchen/report_v2.md` (KITCHEN pack v2), `kitchen/report.md` (KITCHEN), `pass_desk/report.md` (PASS-DESK), `door_scanner/report_r2.md` and `door_scanner/report.md` (DOOR-SCANNER), `guardian_video/report.md` (GUARDIAN-VIDEO), `fix2/report.md` (FIX-2), `admin_redesign/report.md` (ADMIN-REDESIGN), `polish/report.md` (POLISH) and `redesign/report.md` (STUDENT-REDESIGN).

- **Figma:** `nzzTAm9YnJRSdKEeYUWUEb`.
- **Branch:** `claude/mealloop-ios-design-e9n1n5`. Commits are authored by VeeraaVikash, with no co-author line.
- **Last snapshot:** st374 (2026-10-19, end of SUPERVISOR U9; 18 pages). Earlier baseline note: Since FIX-2 R5 the snapshot tool (snaptool / snapb) lists frames inside sections as top-level frames; st312 is the first like-for-like baseline. Snapshots must be taken with `figma.skipInvisibleInstanceChildren = false` (the `snapb` wrapper sets it). Snapshots are stored in shared plugin data `mealloop/st###_<page>`. Each stage must start equal to the previous stage's end. The snapshot compares frames, text and links; it does not see size or visibility changes.
- **Sample day:** Wed 14 Aug 2024, 7:00 AM (week Mon 12 – Sun 18 Aug); Aarav ••0238, Main Mess, 120 pts; outing Sat 17 Aug, Express Avenue Mall, pass 7F3K.
- **Flow starts (exactly 14):**
  - 07: Student · Sign in.
  - 09: Mess staff · Sign in.
  - 10: Admin · Sign in, Admin · Today, Admin · Issues, Admin · Insights, Admin · Manage.
  - 12: Admin redesign · Today, Admin redesign · Students, Admin redesign · Results, Admin redesign · More.
  - 13: Guardian · Sign in. 14: Warden · Sign in. 15: Gate · Sign in.

## Run SUPERVISOR (2026-10-19)

- **Supervisor role rebuilt** on page 09 from design/reference/supervisor_2026-10/ (S00–S19) in four sections: Entry and Home (11), Alerts, shortages and waste (13), SOS (6), Me and history (16) = 45 SV-* frames (one is the What you do sheet). The v1 Supervisor dashboard (41 frames: MS-2, MS-H, MS-C, MS-D, MS-E, MS-F, MS-G1/2/3/6) is archived on page 99 "Supervisor v1 · archived states".
- **Flow:** role → What you do sheet → shared password → Home (no Start Shift). Home Not started (FORECASTED ATTENDANCE 860, lime Start meal) → Start this meal? → In service (LIVE 714 students entered, outlined Close meal; never the forecast) → Close this meal? → Closed (Final entries 774 or Unavailable).
- **Follow-ups:** Waste not recorded and Active shortages are the same tasks and counts on Home, Alerts and Me (four moments: before, during, after, shortage resolved). Shortage details → Mark shortage as resolved? → gone from Alerts; history says "Shortage resolved".
- **Waste read only:** two values (Unserved food N dishes; Plate waste one total), Report details with each dish in its unit, "0 kg · none left", no actions; Not recorded pages say "Nothing to do here." Linked from the Kitchen's Report saved (hidden hotspot).
- **SOS:** the Supervisor closes cases: Not taken → Claimed by you → Mark as checked ("Checked by the supervisor") → Close case → toast "Case closed", tab gone; or Checked by the door → Close case. "Close case" appears on no other role.
- **Me and history:** Me (RV, Ravi, Supervisor · Main Mess; Meal history; Follow-ups; Sign out → Sign out? → role selection); Meal history list, Shortage resolved, Loading, Empty, Error + Retry; six read-only past-meal summaries.
- **Components (page 03, flagged):** MealCard, FollowUpRow, SupervisorShortageRow, WasteRow, ConfirmDialog (side-by-side actions, 361 × 189 at x 16, y 332), SOSCard, SOSPanel · Supervisor; StatusText + Active (`mealloop/sv_ids`).
- **SIMULATED:** meal state across roles, entries, forecast, shortages and resolving, waste data, SOS routing and closing, alerts, history, connection (hidden hotspots, "Simulated:" notes; DEMO.md Supervisor walk, 16 steps).
- **Health:** contrast ≥ 5.72; small text, targets, truncation, overflow, raw, banned words 0; meaning checks 0. NEEDS REVIEW: SOS chips vs no-pill rule, sample clocks, lime, bands (gaps 545–556). Reach page 09 209 / 209, 0 dead ends. Flow starts 14.
- **Reports:** supervisor/report.md, preflight.md, decisions.md (1–38), checks.md, archive_index.md; exports export_supervisor/ (45 at 2× + README); tools sv1comp.js, svb.js; gaps 537–556 (OWNER 537–544). Kitchen pack v3 (K19, K20) committed, not yet drawn (gap 553).

## Run KITCHEN · pack v2 (2026-10-19)

- **Delta pass** on the Kitchen Staff family (page 09) from the refreshed pack design/reference/kitchen_2026-10/ (K01–K18; v1 pack in archive_v1/). 68 Kitchen frames in five sections: Entry and Home 16, Shortage 8, Record waste 17, Past meals and history 14, SOS / Alerts / Me 13.
- **No approval loop:** a saved waste report is just **Recorded**; it can be edited for **6 hours** ("You can edit until 8:40 PM."), then "Editing closed after 6 hours." (read-only). Ten approval-loop pages (Returned, Waiting, Approved, resubmit …) archived on page 99 ("Kitchen · archived states (pack v1 approval loop)").
- **Before the meal:** FORECASTED ATTENDANCE (860, expected diners), states Loading / Stale / Not ready ("—"); Menu = dish names only. **During:** students entered (714), no note, no forecast; shortage row omitted when none. **After:** Final entries 774 and a Waste report card with plain dot status (Not started / Draft / Recorded).
- **Record waste:** plain "Done N of M", Review and save → Check and save ("You can edit this later.", Save report) → Report saved. Only after the meal (Home after, a Not recorded past meal).
- **Past meals:** Meal history (K11; ended meals only, today's meal absent until it ends), Not recorded (K09), Recorded with edit window (K10, Edit report keeps entries), Editing closed (K18), today's Lunch Recorded.
- **Components (page 03):** new ForecastCard, StatusText, HistoryRow (v2); LiveCard note removed; KitchenAlertRow "Waste not recorded"; HeadcountCard, ReportStatusChip, HistoryRow (v1) kept as "(v1, superseded)".
- **Health:** contrast ≥ 5.72; small text, targets, truncation, overflow, raw, banned words 0; every pack v2 rule check 0. NEEDS REVIEW: lime, short-page bands, sample mapping (gaps 529–535). Reach: all 68 Kitchen frames, 0 dead ends. Flow starts 14.
- **Reports:** kitchen/report_v2.md, preflight_v2.md, decisions.md (47–72), checks.md ("Pack v2"), archive_index.md ("Pack v2"); exports export_kitchen/ (68 at 2×; v1 in archive_v1/); tools kt2comp.js, kt2waste.js, kt2hist_a.js, kt2hist_b.js, ktb.js / ktw.js updated; gaps 523–536 (OWNER 523–528).

## Run KITCHEN (2026-10-18 – 19)

> **Superseded in part by [`docs/PRD.md`](../../docs/PRD.md).** This is the pack v1 run. The headcount-sent wording before the meal and the Waiting, Returned and Approved report states were replaced by the pack v2 run above (Forecasted attendance; a saved report is simply Recorded, with no approval loop). See Conflicts C-6 in [`docs/OPEN_DECISIONS.md`](../../docs/OPEN_DECISIONS.md#conflicts). Kept as design history; do not build from the superseded text.

- **Page 09 Kitchen Staff rebuilt** from design/reference/kitchen_2026-10/ (K01–K17) in five sections: Entry and Home, Shortage, Record waste, Reports and history, SOS / Alerts / Me (67 frames). MS-2 Start shift — Kitchen and MS-H Home — Kitchen ×3 are archived on page 99 ("Kitchen · archived states"); the MS-C / E / F / G frames stay for the Supervisor.
- **Counting rule:** before the meal the headcount SENT to the vendor (860, a forecast); during it students ENTERED at the door (714, "Not meals served"); never a forecast beside the live count, never a remaining count; after it the final 774.
- **Shortage:** one-tap sheet (dish chips from the menu, How bad, note, Send to Ravi); slim row Sent / Ravi saw it / Couldn't send + Retry; no row when none; duplicate prompt.
- **Record waste:** all 8 menu dishes in their units, four row states (entered, None left, Not made, Enter …), one plate-waste total, quantity sheet with validation, Check and send (blocked "Enter 2 more"), Sent for review. Report states Draft, Waiting, Returned (Edit and resubmit), Approved (locked); no approve action. Meal history with Empty, Loading, Error.
- **SOS, Alerts (K12), Me (K13)** as the Door Scanner; "Keep cooking first if the kitchen is busy"; Food short at the pass desk is the Pass Desk report's kitchen target.
- **SIMULATED:** meal state, headcount and entries feeds, shortage routing and receipt, review, history, alerts, SOS, connection (hidden hotspots, "Simulated:" notes; DEMO.md Kitchen walk, 15 steps).
- **Components (page 03, flagged):** LiveCard, HeadcountCard, ShortageRow, ReportStatusChip, DishRow, QuantitySheet, HistoryRow, KitchenAlertRow (`mealloop/kt_ids`); KeyPad + Size=Decimal.
- **Health:** contrast ≥ 5.72; small text, targets, truncation, overflow, raw, banned words 0; Kitchen word checks 0. NEEDS REVIEW: lime 4–9, short-page bands, sample times. Reach 67 / 67, 0 dead ends. Flow starts 14.
- **Reports:** kitchen/report.md, decisions.md (1–44), checks.md, preflight.md, archive_index.md; exports export_kitchen/ (67 at 2× + README); tools kt1comp.js, ktb.js, ktw.js (pdarch.js fixed); gaps 503–522 (OWNER 503–510).

## Run PASS-DESK (2026-10-17)

- **Page 09 Pass Desk rebuilt** from design/reference/pass_desk_2026-10/ (P01–P17) in four sections: Entry and Home, Checking and outcomes, Reissue / report / shortage, SOS / Alerts / Me (46 frames). The 12 old desk frames (MS-2, MS-H, MS-B1–B7) are archived on page 99 ("Pass Desk · archived states").
- **No camera:** the keypad is on Home; the 4th digit opens **Check this pass** (code + colour + "Changes in N s"); only **Matches · record entry** records (+1). Lookup is status only. Outcomes: Pass verified, No special pass, Wrong meal, Already recorded, Doesn't match, Can't check right now, Student not found, Meal ended while checking.
- **Reissue:** Request a new pass → New pass requests (Waiting / Approved / Done / Rejected; Approved is not Done). **Report:** four options; Food running short → Which food is short? → kitchen ("Food short at the pass desk" on Kitchen Staff Alerts). SOS, Alerts (P14) and Me as the Door Scanner.
- **SIMULATED:** pass service, shared meal state, reissue link, SOS routing, delivery, connection (hidden hotspots, "Simulated:" notes; DEMO.md Pass Desk walk, 14 steps).
- **Components (page 03, flagged):** CodeCard, HomeKeypad, PassResultScreen, RequestRow, ShortageChips (`mealloop/pd_ids`); ProblemOption + Pass check / Food short; AlertRow + Food.
- **Health:** contrast ≥ 5.72; small text, targets, truncation, overflow, banned words 0; no scan / camera wording; no success on an unverified entry. NEEDS REVIEW: lime 5–6 on SOS frames, short-list bands, two scrolling Home states. Reach 46 / 46, 0 dead ends. Flow starts 14.
- **Reports:** pass_desk/report.md, decisions.md, checks.md, preflight.md; exports export_pass_desk/ (47 at 2× + README); tools pd1comp.js, pdb.js, pdarch.js; gaps 486–502 (OWNER 486–491).

## Run DOOR-SCANNER · pack v2 (2026-10-17)

- **Pack resent with D17 Alerts and D18 Me** (D01–D16 unchanged: only a signed metadata block). Stages D2–D5 skipped.
- **Alerts rebuilt as D17** in a new section "Door Scanner · Alerts and Me (pack v2)": SOS active, SOS claimed by you, SOS checked by you, During the meal, After the meal (See all), All alerts, Empty. **Me rebuilt as D18** (SK avatar, Door Scanner, Main Mess, On shift chip, Recorded in 714 / Problems reported 1, Switch role, Language, Help, Sign out). Old Alerts, Alerts — Empty and Me archived; 38 tab links retargeted by page state.
- **Components (page 03, flagged):** SOSAlertCard (3 states), AlertRow (Done / Seen / Reminder / See all).
- **Health (8 new frames):** contrast ≥ 5.72; mono words, lime > 3, small text, targets, truncation, overflow, raw paints, banned words 0. Bands on the short lists are NEEDS REVIEW. Reach 44 / 44 Door Scanner frames, 0 dead ends, 0 dangling. Flow starts 14.
- **Reports:** door_scanner/report_r2.md, decisions_r2.md (42–53), checks_r2.md, preflight_r2.md; exports D17_* and D18_me in export_door_scanner/; tools ds2comp.js, ds2b.js; gaps 478–485.

## Run DOOR-SCANNER (2026-10-17)

- **Page 09 Door Scanner rebuilt** from design/reference/door_scanner_2026-10/ (D01–D16) in five sections: Entry and password, Home, Scan outcomes, Report and lists, SOS / Alerts / Me (40 frames). 14 old door frames archived on page 99 ("Door Scanner · archived states").
- **Shared pieces:** MS-1 rebuilt in place as **Choose your role** (RoleRow, one-line hints); the shared **password page** (4 digits, 3 tries, Wrong, Locked) for all four roles. Door Scanner goes straight to Home (no Start Shift); the other roles keep their Start shift.
- **Home** in three meal states (Before, During, After) plus Camera denied, Low light, Offline, SOS active / claimed; scan outcomes Entry recorded (also for no meal response), Already scanned, QR not recognised, Wrong meal, Can't check right now; Type the last 4 digits (typing, one, several, none, offline); Report a problem with toast and Open problems; Entered without voting; SOS panel and claim flow; Alerts and Me.
- **SIMULATED** (needs a backend): the shared meal state, scan answers, SOS routing, problem delivery, connection loss — invisible hotspots, each frame with a "Simulated:" note; DEMO.md lists them.
- **Components (page 03):** ScannerCard, CountTile, TypeIdButton, ResultScreen, KeyPad (Regular, Compact, Tall), SOSEdgeTab, SOSPanel, RoleRow, StaffTabBar3, ProblemOption (`mealloop/ds_ids`).
- **Health:** contrast lowest 5.51 : 1; mono words, small text, targets, truncation, overflow, banned words 0; backdrop missing only on the full-lime Entry recorded pages; lime > 3 only on the SOS frames (spec vs rule, NEEDS REVIEW). Reach 40 / 40, 0 dead ends. Flow starts 14.
- **Reports:** door_scanner/report.md, decisions.md, checks.md, archive_index.md, preflight.md; exports export_door_scanner/ (40 at 2× + README); tools dsh, dsb, dschk, dsspace, dsexp; DEMO.md Door Scanner walk (14 steps); gaps 458–477 (OWNER 458–464).

## Run GUARDIAN-VIDEO (2026-10-16)

- **Guardian (page 13):** slide-to-approve replaced by a 10-second live video approval: GV-00 Before you record (first use), GV-01 Choose (Accept / Reject; About, Ask to change, Language, Deadline passed, Already answered), GV-02 Record (Ready, Try 1–3, Too short, Too dark, Camera blocked, Uploading, Checking, Upload failed), GV-03 Retry, GV-04 Send video to the warden, GV-05 Photo and code, GV-06 Sent (video, Please watch, Photo and text, Call requested, Rejected, Withdraw sheet, Withdrawn), GV-07 Past answers, GV-08 Reject sheet. 16 old frames archived. No text-only approval anywhere.
- **Warden (page 14):** four tabs (Queue, Out now, Escalated, History). Queue cards for the four methods (Live video, Please watch, Photo and text, Confirmed by call) with Video loading, Empty, Offline, Ask / No sheets and Approved / Change asked / Rejected; Out now + student; Escalated + two call sheets; History + All + Record + Video expired; Me as a drill-in. 14 old frames archived (Reassign and Emergency override are NEEDS REVIEW).
- **Student (04, 07):** tracker "Guardian approved by video · Fri 7:42 PM", variants by photo and text and by call, Guardian said no with Ask again, Notifications · Guardian answered. No video is shown to the student. Page 05 stays stale.
- **Spacing (V5):** one margin, bands ≤ 24 pt on non-scrolling frames, titles 34 pt across Guardian / Warden / Gate, gate buttons 56 pt at one y, GateVerify photo 352 pt. Details in guardian_video/spacing.md.
- **Components (page 03):** MethodTag, StepList, WardenTabBar4, OutNowRow, HistoryRow, PhraseCard, DecisionButtons, VideoRecorder, EvidenceCard (IDs in plugin data `mealloop/gv_ids`).
- **Health:** contrast lowest 4.61 : 1 (G-3 Back late, older); mono words, small text, targets under 44 pt, truncation and overflow 0 on 13 / 14 / 15; backdrop missing only where allowed (dark recording, full-colour gate results). Reach: 13 43 / 44, 14 26 / 26, 15 16 / 23 (results by control), 0 dead ends. Flow starts 14.
- **Reports:** guardian_video/report.md, decisions.md (1–40), spacing.md, archive_index.md, preflight.md; exports export_guardian_video/ (86 at 2× + README); tools gvh, gvarch, gvreach, gvspace, gvfix, gvchk, gvexp; DEMO.md guardian (15 steps) and warden (12 steps); gaps 436–457 (OWNER 436–441).

## Run FIX-2 (2026-10-16)

- **Student start (04, 07):** Getting your details → Home · Not answered; Skip → Home · Skipped; "Home" renamed Home · You're in.
- **Page 12 now holds 84 frames in 9 sections** (Today, Headcount, Meal pages, Students, Results, Report, Export, Menu, More). 52 frames are archived on page 99, section "Admin · archived states" (admin_redesign/archive_index.md).
- **New on page 12:** Results · To check (F01) with Tue dinner report and North scanner page; Weekly report This week / Last week / Month with Preparing, Report ready sheet, CSV / PDF toasts and the vendor summary sheet (F02); Report PDF · Page 1 / 2 as A4 frames (F03); Edit day · Thu 15 (4 meals, 13 states, 2 sheets) (F04); Change today's dinner with Swap / Add a special / Remove / Send (F05). Student Notifications · Dinner changed on 04 and 07.
- **Health:** contrast lowest 5.72 : 1; mono words, small text, targets under 44 pt, truncation, banned words 0; lime at most 3; 1 intentional overflow (Swipe to delete). Reach 84 / 84, 0 dead ends. Flow starts 14.
- **Reports:** fix2/report.md, decisions.md (1–33), checks.md; exports export_fix2/ (41 at 2× + README); tools fx2arch, fx2menu, snaptool (section-aware), x9chk (section-aware); DEMO.md student (21 steps) and admin (16 steps); gaps 422–435.

## Run ADMIN-REDESIGN (2026-10-16)

- **New page 12 Admin Redesign** (99 phone frames, built from design/reference/admin_redesign_2026-10/, A01–A14):
  - Four tabs: Today, Students, Results and More.
  - Today: DayLine, MessTiles and Needs you.
  - Headcount: only a headcount goes to the vendor.
  - Live meal: "not the final count".
  - Meal report with a ticket; Safety case with a rail.
  - Students: answers and reminders.
  - Results: Left over, Ran out and To check, with 8 reason pages and Check next time.
  - More: Weekly menu, People and access, Outings, Announce, and 14 restyled page-10 copies.
  - Page 10 and the other role pages are unchanged.
- **Components (page 03):** AdminTabBar, DayLine, ChainStepper, AdminChip, TagChip, VendorChip, MessTile, ReasonCard, ReasonRow, FoodTile, FoodChip, MealCard, ReportTicket, SafetyRailStep, SafetyRail and StatBars.
- **Health:**
  - Contrast: lowest 5.72 : 1.
  - Mono words: 0.
  - Lime: at most 3 elements per frame.
  - Backdrop: 99 / 99 frames.
  - Small text, targets under 44 pt, truncation, overflow and raw paints: 0 each.
  - Reach: 78 / 99 frames, 0 dead ends.
- **Reports:**
  - admin_redesign/report.md, decisions.md (1–41), checks.md and preflight.md.
  - Exports: export_admin_redesign/ (99 at 2×).
  - Tools: adm, x2today, x3head, x4meal, x6res, x8wire and x9chk.
  - DEMO.md admin walkthrough (14 steps).
  - Gaps 408–421.

## Run POLISH (2026-10-16)

- **Changed (04 and 07):** Credits with the original coupon cards (Q1); HighlightChip centred info circle (Q3); new Crowd page per P03 with Busy, Packed, Closed, Offline, Breakfast, Snacks, Dinner (Q2); Notifications cards with type circles per P01 (Q4); swipe to remind on the Home breakfast card and lunch row, 6 frames (Q5); ticket pages per P04 (Pass · Live 1–3, Reduce Motion, Used, Not today, Juice, Juice Used) (Q6); spacing audit on every student, Guardian, Warden and Gate frame (Q7, polish/spacing.md).
- **Health after POLISH:** contrast 0 real failures; targets 0 under 44 pt; truncation 0; overflow 0; mono words 0; 04 / 07 parity 291 / 291; reach8 07 160 / 305, 0 dead ends; flow starts 10.
- **Reports:** polish/report.md, polish/decisions.md (1–31), polish/spacing.md; exports export_polish/ (17 at 2×); tools q2crowd, q4notif, q5swipe, q6ticket, q7audit, q7fix.

## Frames

| Page | Phone frames | Role |
|---|---|---|
| 04 Student Light | 294 | Student design source (rebuilt in STUDENT-REDESIGN; Orbit backdrop) |
| 05 Student Dark | 333 | **Stale**: every frame named " · stale" (not rebuilt; redesign/stale_05.md) |
| 07 Prototype & QA | 305 | Student prototype and state gallery (no start other than Student · Sign in) |
| 09 Mess Staff | 77 | Staff design and prototype (unchanged) |
| 10 Admin | 187 | Admin (old); Menu (AD-5a, + Snacks) and Dishes rebuilt in STUDENT-REDESIGN; unchanged since |
| 12 Admin Redesign | 99 | New admin (ADMIN-REDESIGN): 85 new frames and 14 restyled copies of page-10 frames; 4 flow starts |
| 13 Guardian | 30 | Guardian mobile web (Orbit backdrop; dates Aug 2024) |
| 14 Warden | 18 | Warden (Orbit backdrop) |
| 15 Gate | 23 | Main Gate security (Orbit backdrop except Scan and results) |
| 99 Archive | 471 | Replaced frames, links stripped |

## Health (STUDENT-REDESIGN P14, 2026-10-15)

Contrast 0 real failures (lowest 4.88:1); mono words 0; lime ≤ 3 kinds per frame; backdrop on every app frame (exceptions listed in redesign/checks.md); targets 0 under 44 pt on 07, 13, 14, 15; truncation 0; overflow 0; detached 0; 04 / 07 parity 282 / 282; banned words 0 (tagline kept, gap 390). Exports: export_redesign/ (34 at 2×).

## Health (older checks)

| Check | Result | When |
|---|---|---|
| Targets, all layer names | 0 under 44 pt on 07 / 09 / 10. Staff: only the 3 status-bar time skips are under 56 pt (a demo shortcut). | Final-3 H1 |
| Real truncation | 0 on all phone pages (1,499 texts with truncation turned on, all fitting) | Final-3 H2 |
| Student balance strings | All read "Credits"; admin reads "Rewards" | Final-3 H3 |
| Fill floor | Exemptions written down (rule 9a, empty states; rule 9b, AD-2b). 12 student list screens are still open (gap 330). | Final-3 H4 |
| iOS check | 0 tab roots with Back; tab bars 3–4 items, navigation only; 0 targets under 44 pt; status bar and home indicator clear on all pages | Final-3 H6 |
| Fill | 07: 12 list screens under 75% (gap 330); 09: 0; 10: 0 open (AD-8c is covered by rule 9a, AD-2b by rule 9b) | Final-3 H6 |
| Reachability | 07 165 / 262, 09 66 / 77, 10 98 / 163 + 13 in the section; 0 bugs, 0 dead ends; the three Sign in walks pass | Final-3 H6 |

## Brand audit (2026-10-08)

- Report: `brand_audit_report.md`; checklist: `RELEASE_CHECKLIST.md`; detail: `final_audit/`; exports: `export/` (27 at 2×).
- Page 01 Foundations was rebuilt from the live tokens and styles (old board on 99 Archive).
- Page 03 now ends with the **Deprecated** section (5 zero-instance components) and the **Brand sheet · new** board.
- Invisible fixes made: 28 paints bound to tokens, 132 text styles applied, 4 descriptions, 26 text boxes to auto height.
- Top VISIBLE items: mono words on 04 / 05 (gap 342), HoldToConfirm in Dark (gap 343), ink-secondary on black (gap 344). Gaps 342–355 are new.

## Where things are

- **Gaps:** `prototype_gaps.md`; the latest is 435.
- **Controls with no destination yet:** `still_absent.md`.
- **Demo walks:** `DEMO.md`.
- **iOS checklist:** `ios_checklist.md`.
- **Reports:** `final2_report.md` and `final3_report.md`.

## Open decisions for the owner

1. **iOS 27 kit:** none was available, so the file uses the iOS 26 Liquid Glass components. Swap them when a kit exists?
2. **Turnout and reasons page:** build an in-app Insights screen (three turnout groups plus reasons), or keep it in the weekly report only?
3. **Admin coupon wallet:** a per-student view of coupons issued, used and outstanding. Is it needed, and what may it show?

## How to resume

1. Take a snapshot of all 14 pages and compare it with the last stored snapshot (snaptool). Stop if they differ.
2. Keep the seven flow starts. Reset the starts after any link edit.
3. Work in chunks of about 90 frames, since each call times out at 60 s.
4. After each stage: render at scale 1, take the snapshot diff (frames, links, flow starts), commit, push, and add a row to `run_status.md`.

## Done 2026-10-07 (owner requests)

1. **AD-5a Menu:**
   - "+" (Add dish) moved from 20, 54 (on top of the Back) to the top-right at 333, 58 on Lunch, Breakfast, Dinner, Empty and Offline. The Back is visible again.
   - A scan of 04 / 05 / 07 / 09 / 10 found no other control on top of a Back.
2. **Staff homes:** the eight MS-H homes have a demo Back at 16, 58, with a 56 pt hit area that goes to MS-1 Pick your job.
   - Header and content moved down 44 pt.
   - Door scanner, Door scanner (Empty) and Pass desk now scroll with fixed bars.
   - The last card clears the tab bar by 20 pt on all eight.
   - Logged in design_intent.md as a demo exception.
3. **Page 05:** removed a stray prototype link (Issue hero on "Community · Suggestion · Me too Offline") and the "Flow 1" start Figma had added with it. The file is back to exactly 7 starts.
4. **Snapshot:** st228. Renders are in owner_fixes/.

## Still queued

- **iOS 27 swap** (agreed: keep 393 pt; our own tab bars on the iOS 27 glass).
  - The library is added, but the connector can't import from it ("Not permitted to upsert").
  - Waiting on the owner to place one instance each of these on page 03, in a frame named "iOS 27 kit": Status bar - iPhone 17 Pro, Home Indicator, Tab Bar - iPhone, Sheet - iPhone, Grabber, Button - Liquid Glass - Symbol, Alert, Action Sheet.

## Run OUTINGS-FIX (2026-10-13)

- **New outing has all seven days** (Mon 13 – Sun 19 Oct; WeekStrip = the Menu DateStrip with letters; RuleTag; ribbon per day; Mon is "Too soon"). Draft weekday rule in design_intent.md (gap 370).
- **Guardian rebuilt** (page 13, 30 frames): minimal Request and Status pages around the new **ClockDial**; detail moved to "About this outing"; language pill "EN · தமிழ்"; Messages reference frame.
- **Scrolling rule:** a frame scrolls only when its content is taller than the frame (frame VERTICAL, content HUG, chrome fixed, last item 20 pt above the bar); main lists have ≥ 7 rows (outings_fix/scroll_audit.md).
- **Completeness:** AD-9b Policy (Empty), AD-9c Activation (Empty, Offline), Manage hub full-height export clone; weekday rule and Too soon on Policy and the Edit sheet.
- **Reports:** outings_fix/report.md, checks.md, completeness.md, scroll_audit.md; exports export_outings_fix/ (6 at 2×).

## Run STUDENT-REDESIGN (2026-10-14 – 15)

- **Student app rebuilt** from design/reference/redesign_2026-10/ on 04 and 07: Home, Meals (28 day × slot frames from the real board), Answer, Entry QR, Community, Feedback (3 steps), SOS with photo proof, You, Notifications, Credits, Juice ticket, Attendance, Spending, Help; Orbit brand V2 (OrbitBackdrop fixed layer, ≤ 3 lime kinds, mono only for numbers).
- **Removed from the student UI** (archived): Waste, plate tracker, nutrition, Meal detail; kcal text; Recheck Home waste tile hidden.
- **Outings, Guardian, Warden, Gate** restyled with the backdrop; dates moved to the Aug 2024 week.
- **Admin:** Menu (four slots + Snacks) and Dishes only.
- **Reports:** redesign/report.md, redesign/checks.md, redesign/decisions.md (1–74), redesign/replacements.md, redesign/needs_check.md; DEMO.md student walk (16 steps); gaps 381–397.
