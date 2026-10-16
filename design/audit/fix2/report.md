# Run FIX-2 · final report (2026-10-16)

**Brief:** design/reference/fix2_2026-10/prompt/COWORK_PROMPT_FIX2.md. Reference images F01–F05 drawn ×1.346.

**Scope.** Student pages 04 and 07 (prototype start, one new notification frame) and page 12 Admin Redesign (new F01–F05 frames, clean-up into sections). Pages 10 and 11 were not edited; page 05 stays stale. Nothing was deleted: 52 frames are archived on page 99 with links stripped.

**Commits.** By VeeraaVikash on branch claude/mealloop-ios-design-e9n1n5, pushed after every stage.

## Stages

| Stage | Result | Snapshot | Why / notes |
|---|---|---|---|
| R0 Start | done | st306 = st305 | Reference pack committed (d3dd996); 14 starts. |
| R1 Student prototype start | done | st307 | Getting your details → Home · Not answered; Skip → Home · Skipped; "Home" renamed Home · You're in (04, 07). Decisions 1–4. |
| R2 To check (F01) | done | st308 | To check rebuilt; Tue dinner Meal report and North scanner page added so every row opens a page. Decisions 5–9. |
| R3 Weekly report and PDF (F02, F03) | done | st309 | 3 periods, Preparing, Report ready sheet, CSV / PDF toasts, vendor summary sheet, 2 A4 pages. Share does not draw the iOS share sheet (gap 430). Decisions 10–16. |
| R4 Easier menu editing (F04, F05) | done | st310 | Edit day Thu 15 (4 meals, 13 states, 2 sheets); Change today's dinner with 6 sub-sheets and a toast; student Notifications · Dinner changed. Partly limited: only Thu 15 is editable (gap 429) and the F05 message is not redrawn per option (gap 428). Decisions 17–22. |
| R5 Admin cleanup | done | st311 | 84 frames kept in 9 sections; 52 archived; every link retargeted; reach 84 / 84. Kept more than the literal list where R2–R4 need the frames (decision 24). Decisions 23–27. |
| R6 Checks, export, docs | done | st312 | x9chk 0 failures (1 intentional overflow); 3 fixes (thumbnails, 44 pt hit areas, Remove confirm title). 41 exports + README. Contract, gaps 422–435, STATE, MASTER_CONTEXT, DEMO (16 admin steps). Decisions 28–33. |
| R7 Report | done | st312 (no Figma change) | This file. |

## Decisions made without asking (decisions.md 1–33)

- **Student start (1–4):** renamed the answered Home rather than duplicating it; no new flow start on page 04 (starts stay 14).
- **To check (5–9):** built the missing Tue dinner Meal report and North scanner page from existing frames; Tue dinner rice ran out at **8:34 PM**, not the 1:34 PM in F01 / F03 (one calendar).
- **Weekly report (10–16):** no tab bar, as F02; check marks ink-outlined instead of lime (brand rule V2); Last week / Month sample numbers that add up to the 4-week totals; Preparing moves on after 1.2 s, toasts after 2 s; the vendor summary carries only meal counts and reasons.
- **Edit day (17–20):** dishes from the real board; "or" items split into separate dishes; highlight stars ink with a white star (only the switch is lime); "Copy last Thursday" uses the board's own Thursday because Thu 8 Aug is not in the data.
- **Change today's dinner (21–22):** sub-sheets use the real Wed 14 dinner; the student notification is a new 11:20 AM frame, the 7:00 AM list is untouched.
- **Clean-up (23–27):** kept the frames R2–R4 need; one Meal report vendor sheet serves Headcount, Rice low and Safety case; Safety case is Open → Closed; two kept frames given a way in (Today · Offline, Meal report · Data missing).
- **Checks (28–33):** thumbnails rasterized; 44 pt hit areas around small controls; Remove confirm title shortened; the snapshot section artifact recorded once.

## New gaps (prototype_gaps.md 422–435)

| # | Gap | Who decides |
|---|---|---|
| 422 | PDF branding (college logo or letterhead) and where Share goes. | OWNER |
| 423 | Who receives the vendor summary (vendor owner, site manager, food committee). | OWNER |
| 424 | Whether menu edits need an approval step before students see them. | OWNER |
| 425 | Sample data not in the data file: Tue dinner numbers, Last week / Month, "Thu 8 Aug". | NEEDS REVIEW |
| 426 | Tue dinner time set to 8:34 PM instead of 1:34 PM. | NEEDS REVIEW |
| 427 | Headcount, Rice low and Safety case vendor callers open the Wed lunch Meal report message. | NEEDS REVIEW |
| 428 | Change today's dinner message is not redrawn per option. | NEEDS REVIEW |
| 429 | Only Thu 15 opens Edit day. | NEEDS REVIEW |
| 430 | Share does not draw the iOS share sheet. | Info |
| 431 | Snacks Add a dish suggestions are the same earlier-week chips. | NEEDS REVIEW |
| 432 | Weekly report has no tab bar (as F02). | NEEDS REVIEW |
| 433 | Safety chain shortened to Open → Closed. | NEEDS REVIEW |
| 434 | Toasts cover the bottom buttons for 2 s. | Info |
| 435 | Reach 84 / 84; closes gap 421. | Info |

## NEEDS REVIEW by frame name (page 12 unless noted; names end in " · new")

- **Results · To check:** Tue dinner row time 8:34 PM (426).
- **Meal report · Main · Tue dinner:** sample numbers (425); its Tell the vendor message is about Wed lunch (427).
- **Check next time · North scanner:** sample owner and dates from the brief's data gap.
- **Weekly report · Last week / Month:** sample totals (425). **Weekly report · This week:** no tab bar (432).
- **Weekly report · Report ready (sheet):** Share closes the sheet (430).
- **Report PDF · Page 1 / Page 2:** branding (422); Ran out line at 8:34 PM (426).
- **Tell the vendor (sheet) · Weekly summary:** recipient (423).
- **Weekly menu · Edit day · Thu 15 Lunch · Copied last Thursday:** Thu 8 Aug not in the data (425).
- **Weekly menu · Edit day · Thu 15 Snacks:** generic suggestions (431).
- **Weekly menu · Edit day · Thu 15 Lunch · Saved / Saved quietly**, **Weekly menu · Send to students (sheet):** no approval step (424).
- **Weekly menu · Change today's dinner (sheet):** fixed message (428).
- **Weekly menu · Published:** only Thu 15 is linked (429).
- **Headcount · North, Live meal · Main · Rice low, Safety case · Open:** Tell the vendor opens the Meal report sheet (427).
- **Safety case · Open:** goes straight to Closed (433).
- **Notifications · Dinner changed (04, 07):** reached by the status-bar time skip.

## Checks at the end (R6)

Contrast lowest 5.72 : 1 · mono words 0 · lime at most 3 per frame · small text 0 · targets under 44 pt 0 · truncation 0 · overflow 1 intentional · banned words 0 · reach 84 / 84, 0 dead ends, 0 dangling links · flow starts 14 · pages 10 and 11 unedited.
