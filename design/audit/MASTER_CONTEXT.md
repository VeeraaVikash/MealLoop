# MealLoop · MASTER_CONTEXT

This file did not exist before run OUTINGS (2026-10-13). The full master context is **PROJECT_CONTEXT.md** (pages, components, rules, decisions); the rules are in **design_intent.md**; the current state card is **STATE.md**; run logs are in **run_status.md**. This file adds the Outing Pass module so the brief's pointer resolves.

## Outing Pass module (run OUTINGS, 2026-10-13)

**What it is.** A student asks to leave the hostel for a set window; the guardian approves first, the warden next (within the review window); the system issues a signed, time-bound pass; the gate records one exit and one return; overdue returns and missed deadlines escalate — never auto-approve. An approved outing is not an absence: the meal forecast uses confirmed exits only. Definitions, status map, workflow and the draft weekend policy are in design_intent.md ("OUTING PASS").

**Pages and starts (10 approved starts).**

| Page | Role | Start | Frames |
|---|---|---|---|
| 04 / 05 / 07 | Student (Aarav ·0238, Block B) | Student · Sign in (07) — You → Outings | 28 each (05 Dark; only 07 linked) |
| 10 Admin | Hostel administrator, section AD-9 · Outings + Manage hub tile + Insights chain row + report page 9 line | Admin starts (existing) | 19 |
| 13 Guardian | Aarav's guardian, mobile web | **Guardian · Sign in** | 18 |
| 14 Warden | Block B warden, senior warden | **Warden · Sign in** | 18 |
| 15 Gate | Main Gate security | **Gate · Sign in** | 23 |

**Components (page 03, flagged NEW, reworked to the owner's reference):** RangeSlider (1835:2157), SlideToApprove (1835:2192), OutingRibbon (1836:2223), LoopTracker (1837:2353), OutingPass (1838:3006), DeckCard (1839:2258), GateVerify (1839:2327).

**Sample story (consistent across roles):** Sat 18 Oct, out 2–8 PM, Express Avenue Mall, Shopping; sent Fri 6:00 PM; guardian replies by Fri 11 PM (approved 7:42 PM); warden decides by Sat 12 PM (approved 10:40 AM, pass issued); pass 7F3K; exit Sat 2:04 PM; return 7:41 PM.

**Owner decisions open:** gaps 356 (guardian verification source), 358 (official policy and cutoffs), 359 (emergency authorities), 360 (security fallback, photo source), 361 (pilot thresholds), 362 (guardian channel), 363 (data retention), plus 364 / 365 / 369.

**Where to look:** outings/outings_spec.md, outings_audit.md, outings_report.md, DEMO.md ("Outing Pass module"), prototype_contract.md (last section), export_outings/.

## Run OUTINGS-FIX (2026-10-13)

- **New components (page 03, flagged NEW):** ClockDial (1902:2358; a 12-hour ring showing the outing window: Request, Request 6–9 PM, Status, Out, Returned, Late, Not going, Overnight × Large / Medium), RuleTag (1902:2194; Weekday, Weekend, Too soon), token `track` (#E1E1DA). Extended: DateChip (+ Weekend, Past; Today = ink outline), OutingRibbon (Weekday single-day axis, Weekday 2–6 PM, Too soon; Weekend-Saturday / Weekend-Sunday), RangeSlider (+ four ranges).
- **Week strip:** New outing on 04 / 05 / 07 has one frame per day, Mon 13 – Sun 19 Oct (today Mon 13 Oct 1:40 PM); the WeekStrip is the student Menu DateStrip (M T W T F S S), the RuleTag names the rule, the ribbon shows the deadlines; Mon is "Too soon". Weekday rule (draft, gap 370): guardian by leave − 7 h, warden by leave − 3 h, not before 8 AM.
- **Guardian redesign (page 13):** the opened SMS link is a minimal Request page (sentence, place, ClockDial, "Reply by Fri 11 PM", SlideToApprove, Ask to change · Decline, More about this outing, verified footnote); after approving, a minimal Status page follows the outing (Waiting → Pass ready → Out → Back, or Back late / Not going / Withdrawn) by status-bar time skips; detail lives on "About this outing"; sheets Ask to change, Decline, Withdraw approval, Language; History, Notifications, Help; a Messages reference frame. Start: Guardian · Sign in.
- **Scrolling rule:** frames scroll only when content is taller than the frame, with the file's frame-level method (VERTICAL, content HUG, chrome fixed, last item 20 pt above the bar); lists that are the main content have at least 7 rows.
- **Where to look:** outings_fix/report.md (decisions, conflicts, NEEDS REVIEW, OWNER), run_status.md (Q0–Q9), gaps 370–380, DEMO.md (Student outing and Guardian walkthroughs).

## Run STUDENT-REDESIGN (2026-10-14 – 15)

**What changed.** The student app (pages 04 and 07) was rebuilt from the reference pack design/reference/redesign_2026-10/ (34 images, menu board data, prompt). Page 05 Dark was not rebuilt: its 333 frames are marked " · stale". Staff and admin are unchanged except the admin Menu (four slots + Snacks) and Dishes.

**Sample day (all roles).** Wed 14 Aug 2024, 7:00 AM; week Mon 12 – Sun 18 Aug; Aarav ••0238, Block B, Main Mess, 120 pts; Juice ticket 7A3F; outing Sat 17 Aug 2–8 PM, Express Avenue Mall, Shopping, pass 7F3K (outing dates moved by 427 days from Oct 2025, weekday kept). Menus come from the real mess board (redesign/menu_tiers.json; NEEDS CHECK items in redesign/needs_check.md).

**Brand rule V2 (Orbit).** OrbitBackdrop is a fixed bottom layer on every app frame (exceptions: OS lock-screen mockups, Gallery, SOS camera, Guardian Messages board, Gate Scan and full-colour results); lime on light only as an ink-outlined element; never lime text on white; at most 3 lime kinds per frame beyond the backdrop (logo and AppIcon exempt); mono only for numbers.

**Banned in the student UI.** Calories, nutrition, kcal, plate tracker, the Waste screen, "How this is measured", "or" between dishes, "served" for scans.

**Components (page 03, this run).** OrbitBackdrop 2129:2343, DietMark 2129:2198, OrbitMark 2129:2211, AppIcon 2129:2240, DishPictogram 2129:2299, ProblemGlyph 2129:2324, HighlightChip 2132:2197, DishTile 2132:2406, MealSegments4 2133:2323, TicketStrip 2133:2374, CrowdRow 2133:2427, HeroCard 2135:2336, AnswerRow 2135:2382, FaceButton 2136:2321, ProblemTile 2136:2360, SeveritySegmented 2136:2382, ProofCard 2137:2399, ProofChecks 2137:2448, EntryQRCard 2153:3742, IssueCard 2156:2702.

**Tools.** design/audit/tools/ (srh, srarc, srhome, srmeals, srmealswire, srp5–srp9 and wires, srlight, oust, menu_tiers.py); stored in the file's shared plugin data under the same keys. The builders clone the archived "Help (before redesign)" frame 2174:33148 on page 99 — do not move or delete it.

**Owner items.** Gaps 381–386 (yellow highlight meaning, snacks intent, ** gravies, final logo file, Tamil text, SF Symbols), 395 (admin nutrition inputs), plus the NEEDS REVIEW list in redesign/report.md.

## Run POLISH (2026-10-16)

**What changed.** Fixes on the student app (04, then 07; 05 stays stale) from design/reference/polish_2026-10/ (P01–P04): Credits shows the original coupon cards again under the points hero; HighlightChip has a fixed 18 pt info circle; the Home crowd row opens a new **Crowd · Main Mess** page (black card, 15-minute chart, two tiles; states Quiet, Busy, Packed, Closed, Offline, plus Breakfast, Snacks, Dinner); Notifications cards use 36 pt type circles and no app logo (lock-screen mockups keep it); a right swipe on the Home "Not answered" card and the lunch row sets a 1-hour reminder (revealed → reminder set → reminder fired); every ticket page shares the P04 ticket layout; a spacing audit snapped gaps to 8/12/16/24, card padding to 12/16/20, single-line rows to 56 and equalised two-column pairs.

**Rules added.** Crowd: the current slot is the bar containing the clock time; the bottom fade shows only when the content scrolls. Dead space: grow the main element by at most 100 pt; never grow a list card (that is filler). Swipe: On drag needs Smart animate; the revealed frame auto-advances after 0.7 s.

**Tools.** design/audit/tools/q2crowd.js, q4notif.js, q5swipe.js, q6ticket.js, q7audit.js, q7fix.js (also stored in shared plugin data under the same keys).

**Owner items.** Gaps 398–407 (crowd sample data, snacks window, lime budget on the revealed frames, ticket layout trade-offs, NEEDS REVIEW dead bands and two-line rows, 05 Dark) and NEEDS REVIEW in polish/report.md.

## Run ADMIN-REDESIGN (2026-10-16)

**What changed.** The new admin is on page **12 Admin Redesign**. It was built from design/reference/admin_redesign_2026-10/ (images A01–A14, data file and prompt). Page 10 Admin and the student, staff, guardian, warden and gate pages were not edited.

The admin has four tabs:

- **Today:** DayLine (Breakfast / Lunch / Snacks / Dinner), four MessTiles with one black "act now" tile, and Needs you.
- **Students:** answer bars (2,870 of 3,500), Remind, feedback and community issues, why students skip.
- **Results:** Left over / Ran out / To check, eight reason pages, Check next time, Find a meal, Weekly report and Safety cases.
- **More:** Weekly menu upload → read → check → publish, People and access, Outings, Announce, and restyled Passes, Votes, Rewards, Spare food and History.

**Hard rules.**

- Only a headcount goes to the vendor.
- No dish quantities.
- No "cook X".
- No vendor login: Tell the vendor opens the admin's phone with a prepared message.
- "Vendor cooked" shows as Missing.
- Live counts always say "not the final count".
- Fixed wording:
  - Left over / Ran out / To check.
  - Sure / Probably / Can't tell.
  - Every count is labelled meals.
  - No percentage split of causes.
- Brand rule V2: OrbitBackdrop on every frame; at most 3 lime elements; mono only for numbers, times and units.

**Sample day.** Wed 14 Aug 2024. Devi is the food head; Ravi is the kitchen supervisor. Today is at 11:10 AM, with the lunch headcount due at 11:30. The live lunch is at 1:40 PM. Main lunch: 860 sent, 786 came. The forecast is 700 (range 660–740) for North. The safety case was reported at 12:45 PM.

**Components (page 03, flagged).** AdminTabBar, DayLine, ChainStepper, AdminChip, TagChip, VendorChip, MessTile (12 phases), ReasonCard, ReasonRow, FoodTile, FoodChip, MealCard, ReportTicket (3), SafetyRailStep, SafetyRail (4), StatBars (2); ProofCard is reused.

**Tools.** design/audit/tools/adm.js (helper library), x2today.js, x3head.js, x4meal.js, x6res.js, x8wire.js, x9chk.js. They are also stored in shared plugin data under the same keys.

**Owner items.**

- 408: vendor channel and reply.
- 409: draft margin and thresholds.
- 410: whether the vendor shares the amount cooked.
- 411: Announce, in or out.
- 412: arrival history needed for the usual pace.
- 420: page 10 or page 12 as the product admin.

Plus NEEDS REVIEW in admin_redesign/report.md.

## Run FIX-2 (2026-10-16)

**What changed.** Built from design/reference/fix2_2026-10/ (F01–F05, prompt COWORK_PROMPT_FIX2.md). Pages 10 and 11 were not edited; page 05 stays stale.

- **Student start:** the prototype now starts with an unanswered breakfast (Home · Not answered); Skip opens Home · Skipped; the answered Home is Home · You're in.
- **Results · To check (F01):** quiet rows "Review these meals" and "Changes being tested", each opening its own page.
- **Weekly report (F02):** three periods; Export PDF → Preparing → Report ready (Save to Files, Share); Export CSV; Send to vendor prepares a summary with meal counts and reasons only, no names or IDs.
- **Report PDF (F03):** two A4 pages in section "Export" on page 12.
- **Edit day (F04):** star to highlight, veg mark, drag to reorder, swipe to delete with Undo, check a word, add a dish, copy last Thursday, Tell students switch, Save.
- **Change today's dinner (F05):** Swap a dish, Add a special, Remove a dish → Send to students → the student notification "Dinner changed".
- **Clean-up:** page 12 keeps 84 frames in 9 sections; 52 loading / empty / in-between states are archived on page 99 with links stripped. Every kept frame is reachable (84 / 84).

**Hard rules kept.** The vendor is a contact; only meal counts and reasons go to the vendor; no dish quantities; live is never final; mono only for numbers, times and units; targets at least 44 pt; text at least 12 pt; at most 3 lime elements; one calendar (Tue dinner rice ran out at 8:34 PM).

**Tools.** design/audit/tools/fx2arch.js (archive), fx2menu.js (Edit day builder), snaptool.js and x9chk.js (section-aware). Also in shared plugin data under the same keys.

**Owner items.**

- 422: PDF branding and sharing route.
- 423: who receives the vendor summary.
- 424: whether menu edits need an approval step.

Plus NEEDS REVIEW in fix2/report.md.

## Run GUARDIAN-VIDEO (2026-10-16)

**What changed.** Built from design/reference/guardian_2026-10/ (G00–G08, W01–W04, S01, data/guardian_video_spec.md, prompt COWORK_PROMPT_GUARDIAN_VIDEO.md). Pages 10 and 11 were not edited; page 05 stays stale.

- **Guardian approval is a 10-second live video.** The guardian says a short phrase with a code that is new on every try; the check looks at the phrase, the code and the number. After 3 tries the video goes to the warden as "Please watch"; if the upload fails, a face photo and the typed phrase are sent instead; with no camera, the warden calls ("Confirmed by call"). The face is always captured: there is no text-only approval. Copy says "Live video only" and "checked", never "cannot be manipulated".
- **Warden app (page 14)** has four tabs: Queue (one card at a time, closest deadline first, EvidenceCard and MethodTag), Out now, Escalated (Call and Watch) and History (record with video until it expires, then "Video deleted after 30 days. Transcript kept."). The warden sees only their block.
- **Student** sees "Guardian approved by video · <time>" (or by photo and text, by call, or "Your guardian said no" with Ask again) and a "Guardian answered" notification; never the video.
- **Spacing** tightened on Guardian, Warden and Gate (guardian_video/spacing.md).
- **Language:** only the pill word தமிழ் and the three names on the language sheet are not English.

**Hard rules kept.** At most 3 lime elements (checks are ink outlines); mono only for numbers, times and units; guardian and gate primary buttons at least 56 pt; targets 44 pt; text at least 12 pt; orbit backdrop on every Guardian and Warden frame except the dark recording screen and full-lime gate results; never delete (30 frames archived on 99); flow starts 14.

**Tools.** design/audit/tools/gvh.js, gvarch.js, gvreach.js, gvspace.js, gvfix.js, gvchk.md, gvexp.js (also in shared plugin data under the same keys).

**Owner items.**

- 436: retention days (30-day draft).
- 437: languages and translations.
- 438: speech-to-text accuracy for Indian languages.
- 439: guardian number verification source.
- 440: whether the call path is allowed.
- 441: consent wording approval by SRM.

Plus NEEDS REVIEW in guardian_video/report.md.

## Run KITCHEN · pack v2 (2026-10-19)

**What changed.** A delta pass from the refreshed pack (K01–K18). Only the Kitchen Staff family on page 09 and its page-03 components; other roles are not touched.

- **No supervisor approval of waste.** The report is saved by the kitchen and is just Recorded; it stays editable for 6 hours after saving, then read-only. Waiting, Returned and Approved are gone (archived on page 99).
- **Forecasted attendance** before the meal (a number and "expected diners", nothing else); **students entered** during it (no note, no forecast, no remaining count); **Final entries** after it.
- **Plain status:** a small dot plus text (filled lime Recorded, empty Not recorded / Not started, dashed Draft), never a pill.
- **Record waste only after the meal:** from Home after the meal and from a Not recorded past meal. "Done N of M" plain text; Check and save; Report saved.
- **Past meals:** Meal history (ended meals only), Not recorded, Recorded (edit window), Editing closed; Edit report keeps the entries.
- **Alerts:** "Waste not recorded" replaces "Report returned".

**Tools.** kt2comp.js (components), kt2waste.js (Record waste in place), kt2hist_a.js / kt2hist_b.js (history and past meals); ktb.js and ktw.js updated for v2.

**Owner items.** 523 how long a missed meal can still be recorded; 524 maximum quantities; 525 unit owner; 526 whether Supervisor / Admin see recorded waste read-only; 527 whether an edit restarts the 6-hour window; 528 every backend item. Plus NEEDS REVIEW in kitchen/report_v2.md.

## Run KITCHEN (2026-10-18 – 19)

**What changed.** Built from design/reference/kitchen_2026-10/ (K01–K17, data/kitchen_spec.md). Only the Kitchen Staff family on page 09 (five "Kitchen · …" sections, 67 frames), plus a canvas note beside the Pass Desk food-short toast. Door Scanner, Pass Desk and Supervisor screens are not redesigned; the old MS-C / E / F / G frames stay for the Supervisor.

- **Three jobs:** watch the headcount and entries, report food running short in one tap, record leftovers and plate waste for Ravi's review. No dish quantities to cook, no inventory, no supervisor actions, no approve.
- **Counting rule:** the live number is students ENTERED at the door, never meals served, never beside the forecast, never a remaining count. Before the meal Home shows the headcount SENT to the vendor (a forecast). Missing data never becomes zero.
- **Shortage row:** omitted when none; Sent / Ravi saw it (only when confirmed) / Couldn't send + Retry; no Needs attention, no Remind; two rows then See all.
- **Waste report:** one row per menu dish in its unit (Entered, None left, Not made, Not entered), plate waste as one total, Check and send blocked until every dish is answered; Draft → Waiting → Returned (Edit and resubmit) / Approved (locked).
- **SOS, Alerts, Me** reuse the Door Scanner patterns; the panel says "Keep cooking first if the kitchen is busy".

**Tools.** design/audit/tools/kt1comp.js (components), ktb.js (`mealloop/ktb`, Home pages), ktw.js (`mealloop/ktw`, Record waste pages); pdarch.js fixed.

**Owner items.** 503 headcount sent vs raw forecast; 504 omit the shortage row when none; 505 dishes and units from the menu; 506 reviewer; 507 editing a Waiting report; 508 maximum quantities; 509 every backend item; 510 offline policy for kitchen reports. Plus NEEDS REVIEW in kitchen/report.md.

## Run PASS-DESK (2026-10-17)

**What changed.** Built from design/reference/pass_desk_2026-10/ (P01–P17, data/pass_desk_spec.md). Only the Pass Desk family on page 09 (plus one added card on the shared Kitchen Staff Alerts and a canvas note beside the student Special pass page on 04 / 07). Door Scanner, Kitchen and Supervisor screens are not redesigned.

- **The desk does not scan.** Staff type the last 4 digits on the keypad on Home; the 4th digit opens **Check this pass** with the code and colour the student's phone should show now (sample 7A3F · Lime, from the pass service; never real credentials). **Matches · record entry** records (+1); Doesn't match records nothing. The sheet re-fetches when the code changes; an expired window asks to check again.
- **Lookup never records.** Look up a student (before the meal) shows the status only.
- **Never success for an unverified entry.** No special pass, Wrong meal, Already recorded (count stays), Doesn't match, Can't check right now ("This pass is NOT checked") and Student not found all say nothing was recorded. No supervisor approval step.
- **Approved is not Done** for new-pass requests (admin pass-exception flow; the student sees the new pass only when Done).
- **Report a problem** (Can't check passes, Crowd at the desk, Food running short, Something else); food shortage goes to the kitchen team ("Food short at the pass desk").
- **SOS, Alerts, Me** reuse the Door Scanner patterns ("Checked by the desk").

**Tools.** design/audit/tools/pd1comp.js, pdb.js (`mealloop/pdb`), pdarch.js (`mealloop/pdarch`).

**Owner items.** 486 camera scanning needs a QR on the student pass; 487 pass service and shared meal state need a backend; 488 reissue approval link to the admin pass-exception flow; 489 special meal without a pass (draft: not allowed); 490 offline policy; 491 who sees the special-meal entry list. Plus NEEDS REVIEW in pass_desk/report.md.

## Run DOOR-SCANNER · pack v2 (2026-10-17)

**What changed.** The pack came back with **D17 Alerts** and **D18 Me** (and the spec section "Alerts and Me (kept short)"); D01–D16 are the same drawings. Only Alerts and Me were rebuilt.

- **Alerts:** title and "Main Mess · Lunch"; one black **SOSAlertCard** on top only while an SOS is active (Not claimed → lime "I'll go and check"; Claimed by you → "Open the SOS"; Checked by you → no action, the case stays with Ravi); **Earlier** with at most three quiet **AlertRow**s (44 pt circle: lime check, ink bell, outlined clock; title; mono time; one line); **See all** only when more than 3 alerts; Empty "Nothing new. Alerts from your supervisor show here." Seven pages, one per state; every Door Scanner page's Alerts tab opens the one for its state.
- **Me:** SK initials avatar (lime on black), Door Scanner, Main Mess, lime "On shift · since 11:40 AM" chip with an ink outline; tiles Recorded in 714 and Problems reported 1 (CountTile); Switch role, Language, Help, Sign out (→ MS-0 Sign in).
- **New flagged components:** SOSAlertCard, AlertRow (`mealloop/ds_ids` alertCard, alertRow).
- **SIMULATED:** the alerts feed and shift numbers (gap 478), with status-bar hotspots for "an SOS starts" and "the supervisor starts the meal" on the Alerts pages.

**Tools.** design/audit/tools/ds2comp.js (components) and ds2b.js (pages; also `mealloop/ds2b`).

## Run DOOR-SCANNER (2026-10-17)

**What changed.** Built from design/reference/door_scanner_2026-10/ (D01–D16, data/door_scanner_spec.md, prompt COWORK_PROMPT_DOOR_SCANNER.md). Only the Door Scanner family on page 09 plus two shared pieces (role selection, shared password page). Pass Desk, Kitchen and Supervisor screens are not redesigned; pages 05, 10 and 11 were not edited.

- **One primary action, scanning first.** Home during the meal is the scanner (inline camera card); the "Recorded in" count is a small tile and counts recorded entries only.
- **No decline, no approval step.** A student with no meal response gets the same Entry recorded screen and is added to "Entered without voting" (masked ID, first name, time).
- **Never success for an unverified entry.** Offline: "Can't check right now · This entry is NOT recorded", the offline banner, and an offline Type sheet with Record entry disabled. No offline queue in this version.
- **Meal states** Before / During / After are set by the supervisor; in Figma they are SIMULATED by invisible hotspots (status bar).
- **Report a problem** (three choices, one tap, "Sent to Ravi", Open problems Waiting / Seen / Fixed) is reachable before, during and after the meal and from the offline and error screens.
- **SOS** shows only while active: a right-edge tab, a compact panel, I'll go and check → Mark as checked ("Checked by the door"; the case stays open for Ravi).
- **Shared role password** (4 digits, 3 tries, then "Ask your supervisor to reset it"); Door Scanner goes straight to Home.

**Hard rules kept.** OrbitBackdrop everywhere except the full-lime Entry recorded; mono only for numbers, times and units; staff primary buttons 56 pt (result pages at y 754); targets 44 pt; text at least 12 pt; never delete (14 frames archived on 99); flow starts 14. Lime at most 3 except the SOS frames (spec vs rule, NEEDS REVIEW).

**Tools.** design/audit/tools/dsh.js, dsb.js, ds1comp.md; dschk, dsspace, dsexp in shared plugin data.

**Owner items.**

- 458: shared meal state needs a backend.
- 459: SOS routing needs a backend.
- 460: offline policy (never record vs queue).
- 461: last-4-digit ambiguity.
- 462: who sees Entered without voting.
- 463: whether Pass Desk and Kitchen adopt the SOS tab.
- 464: shared role password after the SRM sign-in.

Plus NEEDS REVIEW in door_scanner/report.md.
