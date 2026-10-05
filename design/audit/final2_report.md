# Run FINAL-2 (v2) · final report (2026-10-05)

Figma file nzzTAm9YnJRSdKEeYUWUEb. Branch claude/mealloop-ios-design-e9n1n5. Every stage opened with a full-walk snapshot that matched the previous stage's end (st187 → st213), closed with a snapshot diff, renders at scale 1, a commit and a push. Nothing stopped the run: no snapshot mismatch, no authorization prompt, no failed push. Stage details are in run_status.md.

## Stages

| Stage | Result | Snapshot (start = previous end) | What changed | Docs |
|---|---|---|---|---|
| G0 Preflight | done | st187 = st186 | Read-only. Open list carried from the last run. | run_status.md |
| G1 One Back button | done | st187 → st188 | **Back:** every Back is a 44 pt round glass button at 16, 58; tab roots have none. **Frames:** 10 has 115 frames changed and 09 has 42; links re-keyed to the same destinations. **Deleted:** the titled Back variants. | back_audit.md, design_intent.md (BACK STANDARD) |
| G2–G7 Mess staff rebuild | done | st189 → st200 | **Built:** 77 new staff frames on 09: sign in, Pick your job, Start shift ×4, homes ×8, Door scanner A1–A10, Pass desk B1–B7, Kitchen C1–C8, Supervisor D1–D3, Alerts, Confirm hold F1–F5, Me G1–G6. **Archived:** the old 54 frames to 99. **Links:** 218 linked; 47 hit areas of 56 pt. | staff_wiring.md |
| G8 Weekly report | done | st201 → st202 | **Pages:** 9 A4 page components. **Phone frames:** preview, Export sheet, Exported, Needs a full week, 9 viewers. **Header:** AD-4d. | run_status.md |
| G9 Student tickets | done | st203 → st204 | **Credits:** rebuilt in place on 04 / 05 / 07. **New frames:** Ticket · Juice (Live and Used); Pass · Not today. **Redrawn:** Special pass as BigTicket. **Archived:** Offer · Juice, Offer · Not enough and Rewards · Got it. | run_status.md |
| G10 Open fixes | done (2 fill items not fixed) | st205 → st206 | **Mono:** mono words 0 on 07 and 10. **Small targets:** 10 small tappables → 0. **Lime:** frames with 4+ lime elements 12 → 0. **Clearance:** under 20 pt → 0. **Fill:** AD-2b and AD-8c reverted after 2 attempts. | open_fixes.md |
| G11 Destination-absent screens | done | st207 → st208 | **Verified:** the admin Profile sheet, Notifications, Search, Help, North / South / Annexe and Redemptions screens (already built in run 3). **New:** Notifications (Offline), Search (Offline), Community · Info sheet (04 / 05 / 07). **Fixed:** Annexe text. **Annotations:** label, Moment note and sample chip added to the G9 frames. | still_absent.md |
| G12 Full wiring and reachability | done | st209 → st210 | **Links:** 07 +50 net, 10 +4. **Component:** IntentChoice Disabled is now outlined. **Reachability:** 0 bugs and 0 dead ends on 07, 09 and 10. | reachability_final.md, DEMO.md |
| G13 iOS check | done (report only) | st211 → st212 (no change) | **Scope:** 1,115 frames checked. | ios_checklist.md |
| G14 Final report | done | st213 = st212 | This file. | final2_report.md |

## Decisions

1. **Back:** UIKit `backButtonDisplayMode = .minimal`, so the round Back has no title. Large titles stay, because switching would move 63 frames by 76 pt.
2. **Staff homes:** at most 4 tiles; extra jobs are plain 64 pt rows. Task pages hide the tab bar and keep one fixed primary action at the bottom.
3. **Staff tab bar:** one shared bar (Home, Alerts, Me) for the four jobs. Home from Alerts or Me goes to the Kitchen home.
4. **Staff Help** (MS-G5) is written for the Kitchen job only.
5. **Pass desk:** the live code changes every 10 s, so the timer reads "Changes in 8 s" (the brief said 12 s). There is no redeem step at the pass desk.
6. **Report pages** are components, so the preview thumbnails and the viewers reuse them. The report's safety case is dated Wed 7 Aug, while the app's live case is 14 Aug.
7. **Credits:** frame names keep "Rewards / Offer" so existing links still hold. Tapping Get goes straight to Sending → ticket; the confirm sheet was archived.
8. **Lime (G10):**
   - Sheet backgrounds copy their base screen's fixes.
   - IssueCard and ReportTicket list cards use ink for the current step.
   - Read notifications use a white app mark.
9. **Fill:** state and error screens are exempt in the same way as Empty and Loading. List screens with no data visual are logged rather than given extra blocks.
10. **Offline admin screens:** rows still open their saved screens. The offline Search field has no link and reads "Search needs a connection".
11. **G12 link copies** come from each screen's main version, matched by layer path. Locked answer buttons (Cutoff passed, Correction requested, No response) stay unlinked. The lunch "Change" buttons stay unlinked because no unanswered lunch Meal detail exists.
12. **Demo shortcuts** (logged): status-bar time skips on the staff homes, the Record waste step and the Juice ticket; keypad keys 1 / 2 / 3 / 0 on MS-A7.

## Conflicts (rule followed, brief logged)

| Brief | Rule | Followed |
|---|---|---|
| 44 pt round Back on staff screens | Staff targets 56 pt | Both: a 44 pt visual inside a 56 pt transparent hit area (47 controls) |
| Staff tile titles 15 pt | Staff primary content 17 pt or more | 17 pt |
| Report preview thumbnails | At most 3 lime elements per frame | The thumbnails show the document's own lime (more than 3); logged as a document exception |
| AD-4d tab-root header template | No Back on tab roots, Back on drill-ins | AD-4d is a drill-in, so it keeps the round Back |
| G10 (d): reach the fill floor | Enlarge the data visual, never add blocks | AD-2b and AD-8c reverted after 2 attempts; left below the floor |
| Mono words → 0 | Mono only for numbers, times, units | "5H / 2D / 1D / 3D" (time-ago units) stay mono |
| Community · Info sheet with full sentences in tiles | Wrap, never truncate | Tile values shortened; the detail moved to the wrapping intro text |

## New gaps (from 327)

| # | Gap | Where |
|---|---|---|
| 327 | The You tile still reads "REWARDS" after the Credits rename | 04 / 05 / 07 You |
| 328 | AD-2b Crowd — Mess detail fill is 65% (2 attempts reverted) | 10 |
| 329 | AD-8c Search — No results fill is 57% (2 attempts reverted) | 10 |
| 330 | 12 student list screens have fill of 56–74% and no data visual to enlarge (Recheck · Inbox, Pass · Available, Feedback ×3, Rewards history, Help, Community · Archived, Search · Menu result, About, Daily goal ×2) | 07 (and 04 / 05 twins) |
| 331 | Student sign-in has the lime wash only under the onboarding art | 04 / 05 / 07 Onboarding |
| 332 | Pills, chips and scope pills are 30 pt tall, and menu dish rows 36 pt, under the 44 pt target. read6 skipped these names, so G10 missed them | 07, 10 |
| 333 | AD-1a info.circle and chevron.right icon targets are 20 pt | 10 |
| 334 | Home · Crowd stale: "Show at the counter" is cut off (needs 36 pt, gets 18) | 04 / 05 / 07 |
| 335 | Pass · Confirm sheets (Cancel) and the Reminder prompt (Not now) have no round Close | 04 / 05 / 07 |
| 336 | No unanswered lunch Meal detail exists, so the lunch "Change" buttons lead nowhere | 07 |
| 337 | Admin status bars read 9:41 while the content's Moment is 1:40 PM or later | 10 |
| 338 | Mess detail "Last: Hair in dal · Mon · closed" is repeated on North, South and Annexe (clone sample) | 10 |
| 339 | In ReportTicket step labels the spaces carry the mono font (cosmetic) | 03 |
| 340 | reach8 does not scan frames inside sections; the AD-4f frames were checked by hand | tooling |
| 341 | fa1 / qc8 count chevrons under a scrim as dead (sheet backgrounds) | tooling |

## Sample data added this run (all sample)

- **People:** no new people. The run uses Devi, Ravi and Aarav ·0238, plus Karan ·5518 (already in the file).
- **Door scanner:** 713 came in. Per 15-minute slot: 88 / 132 / 156 / 141 / 98 / 61 / 37. 18 scan failures and 41 typed IDs. SRM ID RA2211003010238.
- **Pass desk:** codes 7A3F (lime), K2M9 (blue), 4XQD (orange), all from the existing pass cycle.
- **Kitchen plan:** Lunch, expect about 860, 712 in.
  - Rice 95 kg, Sambar 50 L (from 42 L), Paneer butter masala 38 kg, Chapati 1,700, Curd 60 L, Chicken biryani 30 kg (on hold).
  - Running out: Sambar 12 L.
  - Fixes ranked 6 / 4 / 3 / 2.
  - Plate waste 38 kg vs 41 kg.
  - My shifts: 19 h this week.
- **Weekly report (5–11 Aug):**
  - Special passes 214 / 196 / 1 / 18.
  - 63 juices and 12 ice creams: Rs 2,370 of Rs 5,000.
  - Prep within 5% on 4 of 6 dishes.
  - 9 complaints, and dish ratings out of 712.
- **Credits:** 120 pts, 80 more for the Biryani coupon. Juice 50, Ice cream 80, Biryani coupon 200 (launches Friday). After a juice, 70 left.
- **Times:** Used 1:05 PM, Notifications (Offline) saved 1:38 PM, Annexe last synced 12:10 PM. Moments: Wed 12:32 PM, Tue 12:32 PM, Wed 1:50 PM, Wed 2:00 PM.

## Components added, edited, deprecated

| Change | Component | Stage |
|---|---|---|
| Added | StaffTabBar 1507:120513 (flagged) | G2 |
| Added | Report page ×9 (A4 components 1524:13983 …) (flagged) | G8 |
| Added | BigTicket 1527:125830 (Live / Used / Not today) (flagged) | G9 |
| Edited | StaffTopBar (round Back, padding 4 / 8) | G1 |
| Edited | 145 component texts moved from mono styles to Inter twins | G10 |
| Edited | IssueCard and ReportTicket (current step in ink in list cards); NotificationRow Read (white mark) | G10 |
| Edited | IntentChoice State=Disabled (outlined and dashed, not faded) | G12 |
| Deprecated (deleted) | NavHeader Back=Titled ×2; GlassButton Kind=Titled and its Label prop | G1 |

Tools added to the repo: sb2.js (staff builder), rb8.js (report builder), an11.js (annotation tool), ios13.js (iOS check). Stored only in the file: trunc13, mw10, qc8, reach8, wire7 and snaptool.

## NEEDS REVIEW

1. **Small targets (gaps 332–333):** add transparent 44 pt hit areas to pills, chips and scope pills on 07 and 10, or make the Pill component 44 pt tall.
2. **Fill (gaps 328–330):** a layout change is needed for AD-2b, AD-8c No results and the 12 student list screens.
3. **Truncation (gap 334):** let the At-mess tile text wrap on Home · Crowd stale.
4. **Close on confirm sheets (gap 335):** should Pass confirm and Reminder prompt get the round Close?
5. **Report thumbnails:** do they keep the document's lime (more than 3 per frame)?
6. **Large titles:** kept rather than inline titles (G1). Confirm.
7. **Credits naming (gap 327):** rename the You tile and the internal frame names "Rewards / Offer" in one pass.
8. **Demo shortcuts:** status-bar time skips and keypad keys on 09 and 07. Keep them for demos?
9. **Admin status-bar times (gap 337):** align them with the Moments.
10. **Offline admin rows:** they open online (cached) screens rather than offline twins. Acceptable?
11. **Staff Help:** written for the Kitchen job only.

## Destination-absent screens

still_absent.md lists every control that leads nowhere, after G11 and G12:
- **07:** 171 "missing", of which 121 are in-place controls and 50 open absent screens.
- **09:** 24 "missing", all in-place pills.
- **10:** 123 "missing", of which 36 are in-place and 87 open absent screens.

The largest groups:
- Edit dish ×10 dishes (15 controls).
- Expense edit (15).
- Scope results (11).
- Community report detail and Merge (10).
- Data-feed detail (10).
- Surplus per-dish (8).
- Audit log by type (6).
- Help articles (5).
- Staff dish detail for non-Sambar dishes (5).

**Deferred by the brief:** Turnout and reasons, Prep accuracy (in-app), admin coupon wallet.
