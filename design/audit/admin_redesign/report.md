# Run ADMIN-REDESIGN · final report (2026-10-16)

**Brief:** design/reference/admin_redesign_2026-10/prompt/COWORK_PROMPT_ADMIN.md. Reference images A01–A14 are drawn ×1.346.

**Scope.** New page **12 Admin Redesign** with 99 phone frames: 85 new and 14 restyled copies of page-10 frames. The run did not edit page 10, page 11, or the student, staff, guardian, warden or gate pages, and nothing was deleted.

**Commits.** By VeeraaVikash on branch claude/mealloop-ios-design-e9n1n5, pushed after every stage.

## Stages

| Stage | Result | Snapshot | Notes |
|---|---|---|---|
| X0 Preflight | done | st299 = st298 (17 pages, 0 differences); 10 starts | Reference pack committed. Page 10 inventoried by family; restyle sources chosen (preflight.md). |
| X1 Foundation | done | st300: 03 +17; page 12 created; all other pages 0 | design_intent section ADMIN REDESIGN 2026-10 with the sample calendar. 16 admin components on page 03. Tool adm.js. Decisions 1–9. |
| X2 Today | done | st301 (X2–X4): page 12 +164; 03 ~1; all other pages 0 | 14 frames: A01 Lunch, Breakfast, Snacks, Dinner, Safety case open, All sent, Nothing needs you, Offline, Loading, Mess closed, North sending / sent / replied, Needs you (all). Decisions 10–13. |
| X3 Headcount | done | st301 | 11 frames: A02 North, Forecast pending, Low data, Adjust sheet, Sending, Sent, Vendor replied, South no reply, Failed, Main changed after sending, Tell the vendor sheet. Decisions 14–16. |
| X4 Meal pages | done | st301 | 16 frames: Live meal (A03 Rice low and 5 states + vendor sheet), Meal report (A04 and 3 states), Safety case (A05 and 4 states incl. close sheet). Decisions 17–20. |
| X5 Students | done | st302 (X5–X6): page 12 +112; 03 ~1; all other pages 0 | 11 frames: A06, Remind sheet, Reminder sent, Empty, Loading, Offline, Feedback, Community, Assign owner sheet, Why students skip, Not answered by mess. Decisions 21–22. |
| X6 Results | done | st302 | 17 frames: A07 Left over, A08 Ran out, To check, Not enough meals; 8 reason pages (A09); Check next time (A10); Make it a change sheet; Find a meal; Weekly report; Safety cases. Decisions 23–26. |
| X7 More | done | st303: page 12 +112; all other pages 0 | 15 new frames (A11 More, A12 Weekly menu ×5, A13 People ×4, A14 Outings, Announce ×3) and 14 restyled page-10 copies. Decisions 27–32. |
| X8 Wiring | done | st304: page 12 +8 frames, L+755 L−30; 14 starts; all other pages 0 | Tab bars, drill-ins, sheets, timers, time skips. reach8: 78 / 99, 0 dead ends. DEMO.md admin walkthrough (14 steps). Decisions 33–35. |
| X9 Checks | done | (verified in st305) | checks.md: contrast lowest 5.72 : 1; 0 mono words, small text, targets, truncation, raw paints, banned content; lime ≤ 3; backdrop 99 / 99; 1 overflow fixed. |
| X10 Export and docs | done | st305: page 12 ~8 (fixes); all other pages 0; 14 starts | 99 exports at 2× + README. The export review found 4 issues, all fixed and re-checked (decisions 36–41). Docs: gaps 408–421, contract, STATE, MASTER_CONTEXT. |
| X11 Report | done | st305 (no Figma change) | This file. |

## Decisions made without asking (decisions.md 1–41)

**Layout and content**

- **Today (D10–D13):**
  - Today keeps A01's composition at 11:10 AM, including the drawn Needs you rows.
  - Exactly one black tile, for the most urgent Send.
  - Tile numbers are 44 pt so Today fits.
- **Headcount (D14–D16):**
  - Number at 88 pt.
  - Range 660–740 around 700.
  - Tell the vendor prepares a message on the admin's phone. Nothing is sent by MealLoop and nothing asks the vendor to cook an amount.
- **Live meal (D17–D18):** every state says "This is not the final count". "Behind pace" uses sample numbers.
- **Results (D23–D26):**
  - Fixed wording; counts labelled "meals" ("1 meal" for one, D37).
  - Reason pages have wrapping 34 pt titles.
  - Sample meals are used only where the data names none.
  - Find a meal, Weekly report and Safety cases are rows under the Left over reasons.
- **More (D27–D31):**
  - The Weekly menu comes from the real menu file: Thu 15 has the two (?) words, so "Check 2".
  - People and access names only Devi and Ravi.
  - The 14 restyled copies keep their page-10 content.
- **Wiring (D33–D35):**
  - The search circle opens Find a meal.
  - DayLine nodes have 80 × 56 hit areas.
  - Status-bar time skips are demo shortcuts.
  - Four flow starts were added.

**Fixes found during the export review (D36–D40)**

- Live chip moved to y 149.
- StatBars "of" set in sans.
- Stray EmptyState action hidden.
- "1 meal".
- Mono spaces in the restyled copies set in Inter.
- "Check 2" chip no longer clipped.
- Announce confirm title shortened to one line.

## Conflicts between the images and the rules

| Conflict | Resolution |
|---|---|
| The images draw more than 3 lime elements (A01 tile bar and avatar, A03 bar / tick / status, A04 check marks). | Kept at most 3 lime elements per frame; the extras are white or ink (D4, D13, D17, D19). |
| A04 draws a lime ticket band on a light card. | The band stays; the ticket gets a 1.5 pt ink outline (D5). |
| The images draw words in mono ("MEAL REPORT", "EXPECTED DINERS", "replied"). | Words are set in sans; only numbers, times and units are mono (D6). |
| A01 shows later-day items (Rice low, Sambar left over) at 11:10 AM. | Kept as drawn; logged (D10, gap 414). |
| A08 draws "1 meals". | "1 meal" (D37). |
| The large-title header truncates long reason titles. | Inline header with a wrapping title (D24). |

## New gaps (prototype_gaps.md 408–421)

| # | Gap | Who decides |
|---|---|---|
| 408 | Vendor channel (SMS / WhatsApp / call) and how a reply gets recorded. | OWNER |
| 409 | Draft margin and thresholds: range 660–740, 5%, 3 "not good", 40% in the last 30 min, 15 min, 8 closed meals, 2 comparable meals. | OWNER |
| 410 | Does the vendor share the amount cooked? It is Missing until they do. | OWNER |
| 411 | Announce to students, in or out. | OWNER |
| 412 | Arrival history needed before "usual by now" shows. | OWNER |
| 413 | Sample numbers that are not in the data file. | NEEDS REVIEW |
| 414 | Today · Lunch shows later-day items. | NEEDS REVIEW |
| 415 | Fewer lime elements than drawn; ticket outline. | NEEDS REVIEW |
| 416 | Placement of the Results rows (Find a meal, Weekly report, Safety cases). | NEEDS REVIEW |
| 417 | Restyled copies keep their page-10 content; AD-6b actions are display only. | NEEDS REVIEW |
| 418 | The search circle opens Find a meal. | NEEDS REVIEW |
| 419 | Status-bar time skips. | Info |
| 420 | Page 10 or page 12 as the product admin. | OWNER |
| 421 | 21 frames are reached only by control state. | Info |

## Components added (page 03, flagged with descriptions)

AdminTabBar, DayLine, ChainStepper, AdminChip, TagChip (Sure / Probably / Can't tell × Chip / Inline on light / Inline on dark), VendorChip, MessTile (12 phases), ReasonCard, ReasonRow, FoodTile, FoodChip (Solid / Dashed), MealCard, ReportTicket (Needs review / Reviewed / Data missing), SafetyRailStep, SafetyRail (Open / Hold confirmed / Vendor told / Closed), StatBars (2). ProofCard is reused from the student set.

## NEEDS REVIEW by frame name (all on page 12, names end in " · new")

- **Today · Lunch:** later-day Needs you rows at 11:10 AM (414). The avatar is white on black, not lime (415).
- **Today · Breakfast / Snacks / Dinner:** sample tile numbers (413); Snacks uses the draft 4:30–5:30 PM window.
- **Headcount · North and its states:** the 660–740 range is a draft margin (409). Vendor replied / South · No reply depend on the reply channel (408).
- **Live meal · Main · Behind pace:** sample 640 by 1:40 PM (413).
- **Live meal · Main · Not enough history:** the history threshold (412).
- **Meal report · Main · Wed lunch / Data missing:** ink-outlined ticket and check marks (415); "Vendor cooked: not shared" (410).
- **Students · Why students skip / Not answered by mess:** sample counts (413).
- **Results · Left over:** where the Find a meal / Weekly report / Safety cases rows sit (416).
- **Reason · More students came / Most came in the last 30 minutes / It was reported late:** sample meals and times (413); the thresholds (409).
- **Reason · Can't tell why (Left over, Ran out):** depend on 410.
- **Check next time · Wednesday lunch:** the 2-comparable-meals rule (409).
- **Results · Weekly report:** the 4-week period and the PDF and CSV export.
- **Announce · Write / Confirm (sheet) / Sent:** in or out of the product (411).
- **AD-6b · Pass exception (Open) · restyled:** Approve and Decline are display only (417).
- **All 14 restyled copies:** content unchanged from page 10 (417).
- **Tab bar search circle (every frame):** opens Find a meal (418).

## Checks at the end (after X10)

- Contrast: lowest 5.72 : 1, 0 pairs under 4.5 : 1.
- Words in mono: 0.
- Lime: at most 3 elements per frame; 0 lime text on light.
- Backdrop: 99 / 99 frames.
- Small text: 0.
- Targets under 44 pt: 0.
- Truncation: 0. Overflow: 0.
- Raw paints: 0.
- Banned content: 0.
- No percentage split of causes.
- Reachability: 78 / 99, 0 dead ends.
- Flow starts: 14 (4 new on page 12).
- Other pages: 0 differences from st299 to st305 (page 03 changed only by the new components).
