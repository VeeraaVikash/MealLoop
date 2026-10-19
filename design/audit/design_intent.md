# MealLoop · design intent

Written down on 2026-09-30 from the owner's notes in the design chat and the content-diet brief. **Updated 2026-10-01 by the contract pass** (definitions, new design rules, permissions, offline rules, reasons for absence, sample rules, admin page plan).

It is not a stage record; `prototype_contract.md` still holds every stage rule, and its section "Contract pass · Stage 0" holds the full tables behind the summaries here. Read this before any design stage.

## How the owner judges design

- "Generic" is the #1 complaint. Default ListRow + pill + chevron on white cards reads as boilerplate SaaS. Before reaching for a list, reuse a distinctive pattern: LiveDial, CrowdBadge, BentoTile tiles (MessBadge and MetricBadge were retired in the 2026-10-08 brand audit), PrepCard swipe cards, stacked duplicate cards, filter-chip rows, black hero card.
- Also rejected: too much content per card, several elements competing to be the loudest, screens that feel like "bits and pieces", and unexplained gaps. One fact per line. Every screen has one clear hero.
- Status colours may differ by state but must be muted and consistent. Never full-card traffic-light fills. Lime is the only brand accent.
- **BACK STANDARD (Final-2 G1, replaces the Final-fix F4 titled back).** Apple's UIKit documentation for `UINavigationItem.backButtonDisplayMode` describes three modes:
  - `.default` shows the previous screen's title, then falls back to the generic "Back", then to nothing as space runs out;
  - `.generic` shows "Back";
  - `.minimal` shows only the back indicator (the chevron).

  MealLoop uses **minimal**. Every drill-in screen has ONE BackButton: a round 44 pt glass circle with the system chevron (GlassButton Kind=Icon, chevron.left), top-left at x 16, y 58. It has the same size and offset on every screen of every role. The screen's own title is the navigation title (centred inline, or the iOS large title under the bar), and the button never holds title text.
  - Tab roots have no Back. **Demo exception (owner, 2026-10-07):** the eight mess-staff job homes (MS-H Door scanner, Pass desk, Kitchen, Supervisor and their Empty / Alert / Offline states) have the round Back at 16, 58, with a 56 pt hit area that goes to MS-1 Pick your job, so a demo can switch jobs quickly. In the real app, switching jobs stays under Me → Switch job.
  - Sheets have a grab handle and a Close (×) top-right, and close on a tap outside.
  - Multi-step sequences (Confirm hold, Record waste, Running out?) are modal: Close (×) top-right; inside, Back steps back.
  - Edge-swipe back is the system behaviour in the real app; the prototype shows only the button.
  - Back on a result state (Sent, Saved, Approved) goes to the screen the flow started from, so it never re-runs a Sending timer.
- **BRAND RULE V2 (run 3, replaces the 2B lime rule).** Lime (`#D4F25A`, token `lime`) is the brand colour for every role: student, mess staff and admin.
  - **Allowed:**
    1. the lime wash on every page background (all roles);
    2. the primary action on a black card;
    3. the current step in any progress (stepper, rail, progress segment);
    4. Success / live / on-track status;
    5. the filled part of rings, arcs and bars on BLACK cards;
    6. one lime chip or highlight per black hero;
    7. tickets and coupons.
  - **Not allowed:**
    - lime text on white;
    - lime card fills (except tickets and coupons);
    - lime without ink text or an ink outline.
  - **Count rule:** every non-sheet screen of every role shows the wash AND at least one lime element beyond the wash, and at most three.
  - **Contrast:** ink `#111111` on lime `#D4F25A` is 15.1:1 (AAA); wordmark lime is the logo and counts neither toward the minimum nor the maximum; a repeated element (a list of identical status pills, rail dots or legend swatches) counts as one kind.
- Reference set (Dribbble inventory and restaurant-ops dashboards): circular capacity badges, gauge / dial, swipeable stacked cards, filter chips with a sticky action footer, directory list with role tags, inventory-dashboard bento. Take the mechanics, never their palettes or illustrations.
- Full state coverage (Success / Empty / Offline) from AD-4 on. Empty and Offline are simpler than Success, not copies of it.
- **Admin home pattern (Today · Now, since 1A.3):** wordmark row (since 1A.4), greeting, then one question with one action, then the meal time rail, then the mess rings. Lime follows the lime rule above (on Now: the primary action, the rail fill as progress and the now dot as "now", over the fixed wash).

## Definitions (2026-10-01)

- **Intent:** a student's answer for one meal: yes, no or not sure, given before the intent cutoff. **No response** is its own group and **is never a skip**.
- **Forecast:** the diners the kitchen plans for. It always shows its **rule version** and the **cutoff time** it was set at ("Forecast 860 · rule v0 · set 9:00 AM"). **"Expected" is retired; say "forecast".**
- **Entered:** a student counted at the door by a **valid entry scan or an approved ID fallback**, once per student per meal. **A scan never means "served".**
- **Served:** a **kitchen food quantity only** (kg, L, pcs).
- **Crowd:** a **level** (Quiet / Getting busy / Packed, plus Old data / Unavailable / Closed), its **method** (entry scans at the door) and its **freshness**. **"Inside" is not allowed.** Seat capacity has no owner, so no capacity number is shown.
- **Donated:** counted **only once the partner has collected it**. Before that it is "offered".

- **Outing request (2026-10-13):** a student's ask to leave the hostel for a set window (day, out time, back-by time, place, reason). It is only a request until the guardian and the warden both approve.
- **Planned leave:** an outing that is approved and has a pass, but the student has **not left yet**.
- **Confirmed exit:** the gate (security) **recorded the departure** by scanning or checking the pass.
- **Returned:** the gate recorded the student coming back; the outing is closed.
- **Rule:** an approved outing is **not an absence**. The meal forecast uses **only confirmed exits, never approvals** (planned leave does not change any meal count).

**Data rules:**
- The forecast is preserved as it stood at the cutoff.
- The recommended, approved and actual quantities are all kept, along with served and unserved.
- Waste is labelled **per meal** or **per diner**.
- **Donated food is not waste.**
- **Plate waste is a total only** (one number per meal; unserved is per dish).
- **Missing data is marked, never zero** ("—", "Not logged yet", "Old data", "Not comparable").
- **The 65 g target and "within 5%" are drafts with no owner.**

## RULES · design (2026-10-01, replaces the content-diet caps)

20. **Never hide, only order.** Nothing is hidden to meet a count; everything is placed in priority order.
21. **Every number opens its source.**
22. **Charts show their values** (reverses gap 153).
23. **Every rate shows its denominator.**
24. **One page layout:** header, context line, hero, evidence, actions.
25. **The fill floor stays** (rules 9–12). **The 12-text cap is retired.**
26. **No readable text below 12 pt.**
27. **Mono only for numbers, times and IDs**, on every screen (rule 13 widened).
28. **Empty, Offline and lapsed are states, not pages.**
29. **Horizontal swipe (owner, 4A):** "Horizontal swipe is only for four or more rich cards where stacking would push key content off screen, and never when there is blank space below. Date strips, short lists and two cards use a fitted layout."

## RULES · content diet (admin, from the 2026-09-30 brief; partly retired)

1. ~~At rest, a screen has at most 3 blocks above the fold: (a) one hero, (b) one thing that needs the admin, (c) one row that goes deeper.~~ **Retired 2026-10-01, replaced by rule 24.** What needs the admin now lives on Today › Decisions.
2. Policy and rule text never sits on the main surface. One "Rules" pill (Estimate pill style) opens a sheet (H14 sheet pattern) with at most 3 one-line rules. *(Kept; counts as ordering under rule 20.)*
3. A mess filter is ONE scope pill ("Main Mess") that opens a single-select sheet (MS-C1 row pattern), never a four-chip row.
4. Lists show at most 3 rows plus "See all". *(Kept as ordering, pending confirmation: gap 191.)*
5. One big number per screen.
6. ~~Density target at rest: 3 blocks and 12 visible text layers or fewer.~~ **Retired 2026-10-01 (rule 25).** Every layer hidden to meet it is restored (stage CP-3).
7. Reuse first. New components only when a brief names them; flag anything else.
8. Every Back returns where it came from. No dead chevrons.

## RULES · fill floor (admin, from the 2026-09-30 coupons brief)

The fill floor stays (rule 25).

9. On every non-Empty screen, content at rest reaches at least 75% of the way down to the tab bar: the lowest content item ends at y 561 or lower (the tab bar top is at y 748). Reach it by enlarging the hero number or the data visual, never by adding blocks.
9a. **Empty states are exempt from the 75% floor (Final-3 H4, 2026-10-05).** This covers every screen whose content is one message with no data behind it:
    - Empty and No results screens, including **AD-8c Search — No results** and the student Search · No results;
    - first-use and "coming soon" messages;
    - error and unavailable messages (Error, Unavailable, Not published, No menu, Not eligible, Expired, Already used, Wrong mess, Hidden, Pending).
    - Loading skeletons and the search Typing state. These are transient, and the fill tool has skipped Loading since Final-2 G10; written down here in Final-3 H6.

    **Why:** the message is the whole content. Reaching 75% would mean adding blocks, which rule 9 forbids, or inflating one line of text into a poster, which breaks rule 5 (one big number per screen) and the type scale. These screens follow rule 10 (centred message) instead, and the fill check skips them.
9b. **AD-2b Crowd — Mess detail is an accepted exception (fill 65%, Final-3 H4).**

    **Why:**
    - The screen answers one question, "how busy is this one mess right now?". It has one LiveDial hero, the level, its method and its freshness, so nothing on it can be cut and nothing is hidden (rule 20).
    - The dial is already the largest data visual the card holds. G10 made two attempts to enlarge it; both left empty bands inside the card and were reverted (max two attempts).
    - Adding blocks to reach 75% would break rule 9.

    Review it again if the screen gains real content, for example a per-slot turnout strip.
10. Empty and Offline states centre their message vertically. They must not sit at the top with dead space below.
11. Reading used from 2026-09-30, to confirm: an Offline state that still shows cached data (banner plus hero) counts as non-Empty and meets rule 9, with its banner at the top. An Offline state with no data is a message and follows rule 10.
12. Measured by `tools/filltool.js` (fill = lowest content item at rest ÷ 748; an Empty card is centred when its centre is within 8 pt of the middle of the free band between whatever sits above it and y 748).

## RULES · logs (from the 2026-09-30 AD-7d brief)

13. A log is a timeline. Rows are quiet unless they are exceptions. Mono is for numbers, times and IDs only. *(Since 2026-10-01 the mono rule applies to every screen: rule 27.)*

## RULES · analytics (admin, from the 2026-09-30 AD-4 content brief)

14. There are two year controls, and they are never merged:
    - **Student year** is the cohort (1st year, 2nd year and so on).
    - **Academic year** is time, compared across years.

    An academic-year comparison shows "Needs a full year of data" until a full year exists.
15. Hide any student-year group with fewer than 10 students, and show "Too few to show" in its place.
16. Turnout is not a funnel. Show it as three groups: **said yes and entered**, **said yes and not entered**, and **no response and entered** (worded with the 2026-10-01 definitions: intent and entered). Show scan failures and ID fallbacks beside low counts.
17. No wait-time minutes anywhere.
18. Admin analytics never include the private calorie or spending trackers.
19. Pass scans stay separate from entrance attendance.

## Permissions (2026-10-01)

**Matrix:**
- Actions: **view, propose, approve, execute, verify, correct**.
- Domains: prep override, menu and vote, pass exception, access request, safety case, moderation, surplus, waste entry, scans.
- Roles: student, scanner, pass checker, kitchen staff, supervisor, food head, admin.
- The table is in the contract (CP0.3). Cells not yet decided by an owner are marked ° and each has a gap.

**Demo and Decisions:**
- **The demo user is Admin with all approvals.** In production each approval stays with its role; the demo tags it with that role.
- **Today's Decisions list is filtered by the signed-in role:** it holds the items waiting on that role's approvals.
- **Sample signed-in person on admin Today (1A.3): Devi Raman, Food head** (initials DR, 4 messes). The demo still holds every approval (gap 217).

## Offline rules (2026-10-01)

- One table in the contract (CP0.4) says what each role may view, decide or correct while unsynced.
- **No approvals offline.**
- **A mess that isn't reporting is "not comparable".** It stays out of totals and comparisons and is shown apart with its last sync time.
- **Pass redemption stays blocked offline** (gap 80).

## Reasons for absence (2026-10-01)

- **The admin list equals the student "Why skipping?" sheet exactly:** Class or exam · Home or leave · Eating elsewhere · Don't like the dish · Dietary reason · Not hungry · Other · Prefer not to say.
- **Coverage counts only students who skipped and answered.** Everyone else is **"unknown"**.
- Hide any group under 10 ("Too few to show").
- **The spending tracker never feeds admin data.**
- "Long queue" and "Food quality" are logged as optional additions to both lists (gap 184).

## Sample rules (2026-10-01)

- **Prep override cutoff: 11:30 AM** (sample; owner unassigned).
- **A missed cutoff shows "lapsed", never "overdue".**
- Intent cutoffs as shown to students: lunch 9:00 AM, dinner 6:00 PM. Breakfast's is not shown (gap 173).
- **The 48-hour vote lead time is an open question for the food department.**

## Product decisions

- 3 logins: student, mess staff, admin. Mess staff = permission bundles (scanner, pass checker, kitchen, supervisor). Admin = 4 tabs by intent:
  - **Today:** Now, Decisions, Messes, Watch.
  - **Issues:** SOS, Dishes, Community.
  - **Insights:** Overview, Meal record, Waste vs shortages, Turnout & reasons.
  - **Manage:** a bento hub with pills inside each section.

  The page plan, with keep / rebuild / new for each page, is in the contract (CP0.7).
- Overrides: supervisor overrides go live with a mandatory reason; the food head is notified afterwards; large changes need prior approval (limits are drafts until the food head confirms).
- Privacy: masked student IDs; feedback is aggregate, never names; calorie and spending trackers are private; spending hidden on Home by default.
- Voting: hard gate for "Doesn't qualify", soft warning plus logged override for "Needs review". A vote never changes the menu by itself.
- Menu source of truth: the Main Mess prep list (gap 110).
- Commits: author VeeraaVikash, no Claude co-author line.

## Why these screens exist

- The mentor called the app "basically an attendance app" and asked for a 2026-level idea. Direction: a Prep Agent (recommends prep quantities, escalates when unsure) and a Crowd Agent (live turnout). The demand, override, crowd and shortage screens are their surfaces.
- Target customer: institutional hostel management (SRM first).

## UI words (run 3, R2-2)

On screen (pages 09 and 10), the plain word replaces the internal term. Layer and component names keep the internal term, and the definitions above still use it. Numbers, IDs and times never change. The tab names stay Today, Issues, Insights and Manage.

| Internal term | UI word |
|---|---|
| Decisions | To do |
| Watch | Alerts |
| SOS | Urgent |
| Surplus | Spare food |
| Voting | Votes |
| Audit log | History |
| Staff access | Who can do what |
| Permissions | What they can do |
| Verify and close | Check and close |
| Override | Change to plan (short form in tight rows: "Change") |
| Lapsed | Missed cutoff (short form in tight rows: "too late" / "Change late") |
| Unserved | Not served |
| Plate waste | Left on plates (in 72 pt time columns: "On plates") |
| Entered | Came in |
| forecast | expected (the How-counted text still says it is a forecast) |
| Intent answers / intents | Replies |
| Data gaps | Missing data |
| Data freshness | How fresh is this? |
| Escalated | Passed to you |
| Demand dashboard | Who's coming |
| Prep recommendation | How much to cook |
| Corrective action (log) | Fix (Fixes log) |
| Waste entry | Record waste |
| Shift select | Pick your shift |
| Scope | Where |


## OUTING PASS (run OUTINGS, 2026-10-13)

**Approved workflow.**
1. The student sends an outing request (day, out-between window, place, reason).
2. **The guardian approves first**, by the guardian deadline. The guardian can approve, ask to change, or decline; every reply is recorded with the guardian's name and the time.
3. **The warden reviews next, within the review window** (deadline). Approve, Ask (change requested), or No (rejected, reason required).
4. On both approvals the system issues a **signed, time-bound pass** (code, e.g. 7F3K; valid only inside the approved window).
5. **Gate exit, once:** security checks the pass and the student's face, and records the confirmed exit. A pass cannot be used to leave twice.
6. **Gate return:** security records the return; the outing closes.
7. **Overdue:** past the back-by time with no return, the outing is Overdue (Stop); the warden and the guardian are told.
8. **Escalation:** a request whose guardian or warden deadline passes goes to the senior (duty) warden. **There is no automatic approval on an SLA breach; a timeout is escalation, never permission.**
9. An emergency outing is handled by phone with the warden; any override is recorded with a reason for review.

**Status map (existing StatusPill variants only).**

| State | Pill |
|---|---|
| Pending (waiting for guardian or warden) | Hold |
| Escalated | Hold |
| Approved, Out, Returned | Success |
| Rejected, Overdue | Stop |
| Expired, missed cutoff | Lapsed |
| Offline | Offline |

**Weekend policy (draft; needs institutional approval).** Used by the live deadline preview (OutingRibbon) and the policy screens.

| Outing starts | Guardian replies by | Warden reviews |
|---|---|---|
| Saturday before 12 PM | Friday 3 PM | Friday 3–8 PM |
| Saturday at or after 12 PM | Friday 11 PM | Saturday 8 AM–12 PM |
| Sunday before 12 PM | Saturday 3 PM | Saturday 3–8 PM |
| Sunday at or after 12 PM | Saturday 11 PM | Sunday 8 AM–12 PM |
| Weekday (Monday to Thursday) | any time (submit any time) | warden works 8 AM–8 PM; decision within 12 working hours (draft) |

**WEEKDAY RULE (draft, institution to confirm; run OUTINGS-FIX, 2026-10-13).** Monday to Thursday and Friday outings: the student may request any time; the guardian replies by (leave time minus 7 h) and the warden decides by (leave time minus 3 h), both not earlier than the warden's 8 AM start; if that is already past on the same day the request is "Too soon". Friday uses the same draft rule until the institution decides otherwise.

| Sample (week Mon 13 – Sun 19 Oct; today Mon 13 Oct 1:40 PM) | Out | Guardian replies by | Warden decides | Shown |
|---|---|---|---|---|
| Mon 13 (today) | 3–6 PM | 8 AM (passed) | by 12 PM (passed) | Too soon |
| Tue 14, Thu 16, Fri 17 | 2–6 PM | 8 AM (7 AM → the 8 AM floor) | 8–11 AM | "You'll know by Tue / Thu / Fri 11 AM" |
| Wed 15 (the sample weekday) | 6–9 PM | 11 AM | 11 AM–3 PM | "You'll know by Wed 3 PM" |

The OUTINGS-FIX brief listed Tue / Thu as "Guardian by 9 AM, Warden by 1 PM"; those numbers do not follow the rule above (2 PM − 7 h = 7 AM → 8 AM; 2 PM − 3 h = 11 AM), so the rule is followed (logged in run_status.md and outings_fix/report.md).

**WEEKEND RULE (draft).** The weekend table above ("Weekend policy").

**Clock.** A clock (ClockDial) shows the outing window on a 12-hour ring; a window longer than 12 hours is shown as a full ring with "+1 day".

**Words.** "Out" (not "absent"), "Back by", "Exit recorded", "Return recorded", "Overdue". A gate scan never means "served"; never "redeem" a pass.

## STUDENT REDESIGN 2026-10 (run STUDENT-REDESIGN, 2026-10-15)

Source: design/reference/redesign_2026-10 (34 screens drawn 292 pt wide; × 1.346 for the 393 pt frames). The images set layout, hierarchy and copy; sizes follow the readability standard (body 15, secondary 13, meta 12, primary actions 17 or more, never below 12).

**Hierarchy.** Each screen has one hero, at most one action card, and quiet rows below. Rows never compete with the hero: no second solid button and no second lime element in the row list.

**One place per feature.**
- Entry QR lives in the Home top card (HeroCard), and only there. No second Entry QR card.
- Crowd is one Home row (CrowdRow). There is no crowd screen in the student app.
- Passes (Special pass, tickets) show on Home only as a row, and on the day they apply (the sample: Wednesday).
- Outings live under You (first row) and in their own flow.

**The QR is never locked.** The meal answer (I'm in / Skip / Not sure) only helps the kitchen plan. Every HeroCard case (In, Skipped, Not answered, QR available) keeps "Show entry QR" as a solid button. A passed cutoff turns the answer buttons dashed; the QR still works.

**Feedback = dish + exact problem + how bad.** Step 1 Good or Not good (Good sends at once). Step 2 the dish (Most reported today with one-tap Me too; or pick a dish; a dashed Service tile goes to Community). Step 3 the specific problem for that dish type, How bad (Quite preselected), an optional note, Send. Problem sets per dish type:

| Dish type | Problems |
|---|---|
| Curries, dal, sambar, rasam | Too salty, Too spicy, Too watery, Too sour, Cold, Too little |
| Rice, pulao, briyani | Undercooked, Mushy, Hard, Stale, Cold, Too little |
| Breads (chapathi, paratha, poori, dosa, idli …) | Hard, Undercooked, Burnt, Stale, Cold, Too little |
| Paneer and dry dishes | Too oily, Too spicy, Too salty, Hard, Cold, Too little |
| Curd and sweets | Too sour, Watery, Not fresh, Warm, Too little |

**SOS needs proof.** A food SOS needs a live photo (no gallery) stamped with GPS and time, then three checks (photo, place, time) before Send SOS. "I feel unwell" may be sent without a photo. Camera denied → "Send without photo", flagged on the admin Safety case. The admin Safety case shows the proof (ProofCard).

**Not in the student app.** Calories, kcal, nutrition, the plate tracker, the student Waste screen and "How this is measured". Admin keeps its own waste analytics.

**Menu tiers (Meals).** Highlight = the first [H] dish, a large black tile with the HighlightChip ("Marked by the mess on the menu board"). Mains = up to three tiles (remaining [H] dishes, then breads, then rice / pulao / briyani, then dal or curries). "Curries" = a row of two tiles on Dinner and wherever there are two or more curries. Non-veg dishes carry the non-veg mark; the ** gravies are a slim outlined non-veg row. Everything else is the "Comes with it" list, in board order. Items joined by "or" or "/" on the board are separate dishes, all listed; the word "or" never appears between dishes. Wednesday Lunch carries the alternate-Wednesday ticket (Chicken Briyani, Paneer Briyani · Limited). (?) items are shown as transcribed and listed under NEEDS CHECK.

**Orbit (brand rule V2).** Background art on one fixed layer (OrbitBackdrop): canvas, 7% dot texture, a lime disc top right with four hairline rings and one black dot, a fainter ring pair bottom left. On a light card, lime appears only as an ink-outlined chip or arc; never lime text on white; at most three lime elements per frame beyond the backdrop. Mono only for numbers, times and units. Exceptions: SOS camera (dark) and the gate result (full lime) have no backdrop.

**Sample calendar.** Week Mon 12 – Sun 18 Aug 2024; today Wed 14 Aug (matches the real menu board, data/mess_menu_2024-08-12.md). Home at 7:00 AM; Meals at any time. Student Aarav ••0238, Main Mess, 120 points. Sample outing on Sat 17 Aug 2024 (Express Avenue Mall, pass 7F3K).

## ADMIN REDESIGN 2026-10 (run ADMIN-REDESIGN, 2026-10-16)

Source: design/reference/admin_redesign_2026-10 (A01–A14 drawn 292 pt wide; × 1.346 for 393 pt) and its data file `data/admin_sample_data.md` (numbers, wording, tag rules). The new admin app lives on page **12 Admin Redesign**; page 10 Admin and page 11 Admin Dark stay as they were.

**Hard constraints.**
- Management sends the vendor **only a headcount**. MealLoop has no dish-quantity plan, no ingredient data and no vendor login. Never show a planned dish quantity or a "cook X litres" instruction.
- The vendor is a contact (call or message), drawn dashed. "Vendor cooked" is **Missing** unless staff typed it in.
- **Live is never final.** Every live count says "not the final count" until the meal closes; final attendance exists only after close.
- Staff record: stock low or running out, food left over by dish (L or kg), plate waste (kg), held or checked actions.

**Four tabs.** Today, Students, Results, More (+ the search circle). No Meals tab and no date strip: a meal is reached from Today (send, live) or from Results (needs review, Find a meal).

**Today = one tile per mess.** Main, North, South, Annexe as MessTiles in a 2 × 2 grid. Each tile has one big number, a four-step bar (1 forecast ready, 2 headcount sent, 3 vendor replied, 4 meal served and counted) and one bottom line. Exactly one tile is black at a time: the most urgent action. Other ready tiles are cream with an outlined Send; a mess with no data is dashed. The DayLine (Breakfast, Lunch, Snacks, Dinner; done, now, next) switches the meal. "Needs you" shows at most two rows, then "See all".

**Reasons in plain words.** Results segments Left over, Ran out, To check. Each reason is a sentence with a count labelled **meals** and a tag: **Sure** (measured from records; lime chip), **Probably** (indirect evidence; outlined), **Can't tell** (key data missing; dashed). A meal can have more than one reason, so counts can add up to more than the total. Never a percentage split of causes. "Planned for" = the headcount sent.

**Draft tag rules (owner to confirm the numbers).** Fewer / more came than planned for: final entries more than 5% below / above the headcount sent. Didn't like a dish: the left-over dish has at least 3 "not good" feedbacks for that meal. Raised the headcount late: raised after the forecast froze and entries ended below the raised number. Most came in the last 30 minutes: at least 40% of entries in the final 30 minutes. Reported late: low stock reported more than 15 minutes after the first sign. Can't tell why: vendor amount cooked, scanner records or waste record missing.

**A meal has one page that changes with its phase.** Before sending: Headcount (forecast, send, vendor reply). During service: Live meal (came in so far, food left by staff, "not the final count"). After close: Meal report ticket (headcount sent → came in · final, left over, plate waste, data completeness, "Vendor cooked: not shared"). A safety case sits above all of these until closed.

**Check next time.** A change is Open → Testing → Result; it cannot be closed as "worked" until 2 comparable meals are recorded, and it is also checked for running out.

**Sample calendar.** Wed 14 Aug 2024 (week Mon 12 – Sun 18, the student week). Food head Devi (DR). Lunch headcount due 11:30; Today at 11:10 AM; live lunch 1:40 PM; lunch closes 2:00 PM; dinner headcount due 4:30 PM. Safety case reported 12:45 PM (open 55 min at 1:40 PM). Staff Ravi (kitchen); student Aarav ••2231 (the safety case reporter, from the data file).

**Brand.** OrbitBackdrop on every admin frame; Brand rule V2 (lime on light only as an ink-outlined chip or arc, never lime text on white, at most three lime elements per frame beyond the backdrop); mono only for numbers, times and units; readability standard; BackButton standard; sheets have a grab handle and Close.

## GUARDIAN VIDEO APPROVAL 2026-10 (run GUARDIAN-VIDEO, 2026-10-16)

Source: design/reference/guardian_2026-10 (G00–G08, W01–W04, S01 drawn 292 pt wide; × 1.346 for 393 pt) and `data/guardian_video_spec.md`. It replaces slide-to-approve on page 13 and rebuilds page 14 Warden around the evidence.

**The flow.**
1. The guardian opens the SMS link (mobile web, OTP). First use only: **Before you record** (consent).
2. **Choose:** "I accept" (record a 10-second video) or "I reject" (one tap, optional reason chips Exam soon / Not safe / Other, no video).
3. **Record:** live front camera only (no upload, no gallery), at most 10 s, at least 4 s ("Too short, try again"). A phrase and a random 3-digit code are shown: "I accept Aarav's outing. Code 4 7 2." A new code for every request and every try. Countdown ring 0–10 s. The server stores the time.
4. **Check (server):** speech-to-text in the chosen language (English, Tamil, Hindi first). The phrase must match (tolerant of accent) and the 3 digits must match exactly. Match → sent as **Video, checked**.
5. **No match:** "We couldn't hear that", up to 3 tries. After the third: **Send video to the warden** → the last video goes as **Video, please watch** (no checks).
6. **Upload fails** (camera works, network doesn't, after 2 retries): **Take a photo of your face instead** → live photo, type "I accept <code>", and the 6-digit code sent to the guardian's phone → **Photo and text, no video**.
7. **No working camera:** the guardian cannot approve in the app. "Ask the warden to call me" puts the request in Escalated as **No camera**; the warden phones the guardian and records **Confirmed by call** with a note.
8. **Never text-only.** The guardian's face is always captured (video or live photo). The only exception is the call path, which the warden records.
9. **Sent:** the answer, the method and the time; Withdraw approval, Call the warden, Past answers.

**Four evidence methods (MethodTag).**

| Method | Tag | Checks shown to the warden |
|---|---|---|
| Video, auto-checked | Live · 0:09 (lime, ink outline) | Phrase, Code, Number |
| Video, not matched after 3 tries | Please watch (outlined) | none |
| Photo and text (upload failed) | Photo and text (dashed) | Code, Number (typed phrase shown) |
| Phone call by the warden | Confirmed by call (dashed) | none; the warden's note |
| Rejected by the guardian | No video (quiet) | none |

**What the warden sees (own block only).** Queue, one card at a time, closest deadline first: decide-by ring, student (initials, name, masked ID), outing (day, times, place), the evidence block with its MethodTag, transcript and checks, "Past answers: N by video". Actions: Approve (signs the pass), Ask (sheet: what to change), No (sheet: reason). Out now (count, due back, late; rows with Late first), Escalated (past deadline, please watch, no camera → Call / Watch), History (own decisions with the method).
**Not visible to the warden:** other blocks, meals, credits, spending, feedback, the raw video after 30 days. **Not visible to the student:** any video or photo; the student sees only "Guardian approved by video · <time>" (or by photo and text, by call) or "Your guardian said no".

**Privacy and retention (draft, OWNER).** Recording a guardian's face and voice needs SRM approval and written consent wording. Retention draft **30 days**; after that only the transcript and a fingerprint stay ("Video deleted after 30 days. Transcript kept."). Access: warden role only, audit-logged.

**Wording.** "Live video only", "Live photo only", "checked", "please watch". Never claim a video "cannot be manipulated": the random code, live-only capture, server time and 10-second cap make a replay fail, but it is evidence, not proof.

**Languages.** The language pill shows one word (தமிழ்). The language sheet lists the three names (English, தமிழ், हिन्दी). No other Tamil or Hindi text in frames; translations need a fluent writer (OWNER).

**Brand.** OrbitBackdrop on every Guardian and Warden frame except the dark recording screen; Gate full-lime results keep no backdrop. Lime on light only as an ink-outlined chip or arc; at most 3 lime elements per frame. Mono only for numbers, times and units (the code digits, REC 0:07, 0:09). Guardian and Gate primary buttons 56 pt; all targets at least 44 pt; text at least 12 pt.

**Sample.** Aarav ••0238, Express Avenue Mall, Sat 17 Aug 2024, 2–8 PM, Shopping. Guardian +91 98••• ••214, reply by Fri 11 PM; video sent Fri 7:42 PM, code 4 7 2, 0:09. Warden WB, Block B, decides by Sat 12 PM.

## DOOR SCANNER 2026-10 (run DOOR-SCANNER, 2026-10-17)

Source: design/reference/door_scanner_2026-10/ (D01–D18, data/door_scanner_spec.md; D17 Alerts and D18 Me added in pack v2). Scope: the Door Scanner role on page 09 plus two pieces shared by every staff role (role selection, shared password page). Pass Desk, Kitchen and Supervisor screens are not redesigned.

**Principles.**

1. **One primary action.** During the meal the door has one job: scan. Every Door Scanner page has at most one black primary button (56 pt).
2. **QR scanning first.** Home during the meal *is* the scanner: an inline camera card, not a tile that opens a camera page. Type ID is the fallback, never the lead (except when the camera is denied).
3. **The count is supporting information.** "Recorded in N" is a small tile beside Type ID; it counts **recorded entries only** (verified and saved). It is never the hero of the page.
4. **Recorded entries only.** A success screen appears only after an entry is verified and saved. Offline or unavailable data shows "Can't check right now · This entry is NOT recorded." There is no offline queue in this version (OWNER).
5. **No decline, no approval step.** The door never refuses a student for not answering and never waits for a supervisor's approval. A student with **no meal response** gets the same "Entry recorded" screen; the count goes up and the student is added automatically to **"Entered without voting"** (masked ID, first name, time) for that mess and meal. It is not a vote and is never mixed with responses.
6. **Exceptions are quick.** Already scanned (grey, "Count stays N"), QR not recognised / Wrong meal (cream), Can't check right now (cream). Each has Scan next or Scan again, and Type the last 4 digits where it helps.
7. **Report a problem** is always reachable (before, during and after the meal; from the offline and error screens): three categories, one tap sends to the supervisor (Ravi), a "Sent to Ravi" toast, and the problem shows under Open problems (Waiting, Seen, Fixed).
8. **SOS** shows on Home only while an SOS is active: a right-edge tab under the avatar opens a compact panel. Claiming ("I'll go and check") and "Mark as checked" record that the door looked ("Checked by the door"); the case still closes with the supervisor or food head. Normal alerts stay in the Alerts tab, never on Home.
9. **Shared role password.** One password per role, 4 digits, 3 tries, then "Ask your supervisor to reset it". A correct Door Scanner password goes straight to Home: no Start Shift page.

**Meal states (set by the Supervisor).** Before: black card with a dimmed QR and "Scanning opens at 12:00 PM", no count. During: lime chip "Meal in progress · N min", camera card, Recorded in tile, Type ID, Report a problem. After: "Lunch has ended", final recorded entries, Entered without voting N, Open problems N, Report a problem.

**SIMULATED in the Figma prototype (needs a backend; OWNER).**

- Shared meal state: invisible hotspots "Supervisor starts the meal" / "Supervisor ends the meal" move the Door Scanner pages between Before, During and After. In the product, the supervisor's action must reach every staff phone in that mess (Door Scanner, Pass Desk).
- Scan outcomes: invisible hotspots on the camera card stand in for the server's answer (recorded, no response, already scanned, not recognised, wrong meal, can't check).
- SOS routing and claiming, the "Sent to Ravi" delivery, and connection loss.
- Nothing in the frames implies real synchronisation: notes on each frame say "Simulated".

**Brand.** OrbitBackdrop on every Door Scanner frame except the full-lime Entry recorded screen. At most 3 lime elements per frame (lime chip, camera brackets, SOS tab). Mono only for numbers, times and units (counts, 12:18 PM, digits on the keypad). Staff primary buttons 56 pt; targets 44 pt; text at least 12 pt.

**Alerts and Me (pack v2, D17 / D18, added 2026-10-17).**

- **Alerts** (D17): title "Alerts" and "Main Mess · Lunch". While an SOS is active, one black **SOSAlertCard** sits on top (SOS · time · minutes ago, the title, the place, a status chip and one action: lime "I'll go and check" when nobody has taken it; "Open the SOS" when you took it; no action once you marked it checked). Under it the group **"Earlier"**: at most three quiet **AlertRow**s (44 pt circle on one axis: lime check = done, ink bell = seen, outlined clock = reminder or closed; short title; time on the right in mono; one short line). Nothing else: no filters, no settings, no repeated cards, no footnote. A **"See all"** row appears only when more than 3 alerts exist and opens the full list. Empty: "Nothing new. Alerts from your supervisor show here."
- **Me** (D18): title "Me"; an initials avatar (SK, lime initials on black; no invented name), the role, the mess and a lime chip with an ink outline "On shift · since 11:40 AM"; two tiles "Recorded in" and "Problems reported" (CountTile); four quiet rows: Switch role (opens role selection), Language (English), Help, Sign out (back to the first sign-in page, the staff splash). No profile card, no extra rows.
- The alerts feed and the shift numbers are SIMULATED in Figma (needs a backend).

**Sample.** Main Mess, Lunch, Wed 14 Aug 2024, 12–2 PM. Door staff SK; supervisor Ravi. Aarav ••0238 (recorded 12:18 PM; 715 recorded). Final: 774 recorded, 6 entered without voting, 1 open problem. SOS 12:45 PM "Found something in food", Main Mess · Block A.

## PASS DESK 2026-10 (run PASS-DESK, 2026-10-17)

Source: design/reference/pass_desk_2026-10/ (P01–P17, data/pass_desk_spec.md). Scope: the Pass Desk role on page 09. Shared with the Door Scanner and not redrawn: role selection (MS-1, Pass Desk row), the shared password page (role chip "Pass Desk"), the offline screen pattern and Me. Door Scanner, Kitchen and Supervisor screens are not redesigned (Kitchen Staff Alerts only gains one "Food short at the pass desk" card).

**Principles.**

1. **One primary task: check a special-meal pass, then record it.** Nothing else lives on Home: no analytics, waste or vendor tasks.
2. **No camera.** The desk does not scan. Staff type the student's last 4 digits on the **keypad on Home** (during the meal). On the 4th digit the sheet **Check this pass** shows the code and colour the student's phone should show right now, with "Changes in N s".
3. **Check, then record.** The staff compare with the student's phone and tap **Matches · record entry** or **Doesn't match**. Only "Matches" records an entry (+1). A lookup alone never records anything ("Look up a student" is status only: "This does not count as an entry.").
4. **The code is live.** The sheet re-fetches when the code changes (a brief "Just changed" highlight); an expired window says "Code expired. Check again."; an old screenshot cannot match. Duplicates for the same student and meal are prevented ("Already recorded · Count stays N").
5. **Never success for an unverified entry.** No pass, Wrong meal, Doesn't match and Can't check right now all say what was recorded: nothing. No offline queue in this version.
6. **No supervisor approval step.** A student with no special pass is told they can still have the regular meal (the Door Scanner handles normal entry).
7. **Approved is not Done.** A new-pass request moves Waiting → Approved (the admin said yes) → Done (the student actually has the new pass) or Rejected (ask the pass admin). The student's Special pass page shows the new pass only when it is Done. Requests go to the existing admin pass-exception flow; there is no separate approval system.
8. **Report a problem** (always reachable): Can't check passes, Crowd at the desk, Food running short, Something else. One tap sends to Ravi; Food running short asks which dish (chips from the day's menu) and goes to the kitchen team of that mess ("Food short at the pass desk" in Kitchen Staff Alerts). After sending: a toast and the item under Open problems.
9. **SOS, Alerts, Me** as the Door Scanner: SOS tab only while active; "Keep checking passes first if the desk is busy."; Mark as checked records "Checked by the desk" and does not close the case.

**Codes and colours are sample.** The expected code and colour come from the pass service; frames use the student pass page's sample values (7A3F · Lime, K2M9 · Blue; live colour tokens). There is no verification algorithm in the design and no real credentials.

**SIMULATED in the Figma prototype (needs a backend; OWNER).** Shared meal state (hidden "Supervisor starts / ends the meal" hotspots move every Pass Desk page between Before, During and After); the pass service (lookups, the expected code, re-fetch, expiry, duplicates); the reissue approval link to the admin pass-exception flow; SOS routing; problem and shortage delivery; connection loss. Every Pass Desk frame carries a "Simulated:" note.

**Brand and layout.** OrbitBackdrop on every frame except the full-lime Pass verified page. Mono only for numbers, times, units and codes. Staff primary buttons 56 pt (result pages at y 754); targets 44 pt; text at least 12 pt. Lime: at most 3 elements per frame.

**Sample.** Main Mess, Lunch special (Wednesday special meal), Wed 14 Aug 2024, 12–2 PM. Staff SK; supervisor Ravi. Aarav ••0238. 214 passes; 41 checked, 42 after Aarav; 196 final. Requests: Aarav ••0238 Waiting (sent 12:20 PM), Meera ••0412 Approved (12:08 PM), Kiran ••0377 Done (11:52 AM), Dev ••0190 Rejected.

## KITCHEN STAFF 2026-10 (run KITCHEN, 2026-10-18; revised for pack v2, 2026-10-19)

Source: design/reference/kitchen_2026-10/ (K01–K18, data/kitchen_spec.md; the v1 pack is in archive_v1/). Scope: the Kitchen Staff role on page 09. Shared with the Door Scanner and Pass Desk, not redrawn: role selection (MS-1, Kitchen Staff row), the shared password page (role chip "Kitchen Staff"), the SOS tab and panel, the offline pattern, Language and Help. The Supervisor screens and the old MS-C / MS-E / MS-F / MS-G frames the Supervisor Home still links to are not redesigned. Pack v2 replaced the v1 approval loop; the v1 rules (headcount sent, Waiting / Returned / Approved) no longer apply.

**Principles.**

1. **Three jobs, nothing else.** Watch how many students have come (the forecast before the meal, entries during it), report food running short in one tap, and record leftovers and plate waste **after the meal has ended**. No inventory, no dish quantities, no weighing devices, no vendor or supervisor action.
2. **Counting rule.** The live number is students **ENTERED** ("students entered"). It is never called meals served, never shown beside the forecast, and there is never a remaining count. The words "recorded at the door" are never used. After the meal: "Final entries 774".
3. **Forecasted attendance.** Before the meal Home shows a black card "FORECASTED ATTENDANCE", the number (860) and "expected diners", nothing else in the card, never a dish quantity. States: loading (skeleton, no number), stale (small grey "Updated 8:50 AM, may be out of date" under the card), not ready (the same card with "—" and "Forecast not ready yet", never 0; no separate screen).
4. **Shortage row omitted when none.** After a report one slim row: "<Dish>, <level>" and Sent <time>; "Ravi saw it" only when the server confirms; "Couldn't send" with Retry. No "Needs attention", no Remind. Two rows at most, then See all. A shortage report is an alert to Ravi, not an approval.
5. **Four waste-field states.** One "Food left over" row per menu dish in its unit: **Entered** ("3 kg"), **None left** (lime check, "0 kg"), **Not made** (grey), **Not entered** (dashed "Enter kg"). Missing data never becomes zero: a Not entered row blocks Review and save ("Enter 2 more"). Plate waste is **one total** for the whole meal. "Done N of M" is plain text. Record waste exists only after the meal has ended (Home after the meal, a Not recorded past meal, the Meal ended alert).
6. **Report statuses (plain dot + text, never a pill):** Not started (empty dot), Draft (dashed dot), Recorded (filled lime dot, with the time), Not recorded (empty dot, past meals). **No approval loop:** there is no Waiting, Returned or Approved, and the Kitchen UI has no approve action. Saving is "Save report" → "Report saved".
7. **6-hour edit window.** A saved report can be edited for 6 hours: "You can edit until <time>." with Edit report (back into the form, entries kept). After 6 hours: "Editing closed after 6 hours." and no edit link.
8. **No claims without evidence.** A shortage says Sent only after it sent and Seen only after Ravi saw it; a report says Recorded only after the server saved it.
9. **SOS, Alerts, Me** as the Door Scanner: the SOS tab only while an SOS is active (under the avatar; on forms above the first row), the helper "Keep cooking first if the kitchen is busy". Alerts: unread = lime dot and semibold title; rows Meal ended, Food short (from the pass desk), Shortage seen, Waste not recorded; tapping opens that meal. Me: AK, Kitchen Staff, Main Mess, On shift; Meal history first.

**SIMULATED in the Figma prototype (needs a backend; OWNER).** Shared meal state (hidden "Supervisor starts / ends the meal" hotspots), the forecast feed, live entry counts and their staleness, shortage routing and the "seen" receipt, saving and the edit window, meal history, the alerts feed, SOS routing, connection loss. Every Kitchen frame carries a "Simulated:" note.

**Brand and layout.** OrbitBackdrop on every frame. Mono only for numbers, times and units; words in sans. Staff primary buttons 56 pt; targets 44 pt; text at least 12 pt; rows 56 pt. Lime: at most 3 elements per frame where the drawing allows.

**Sample.** Main Mess, Lunch, Wed 14 Aug 2024, 12–2 PM. Kitchen staff AK; supervisor Ravi (shortage reports only). Forecasted attendance 860. Entries 714 at 1:40 PM; final 774. Dishes (Wed lunch, menu spelling and order): Bhindi Aloo Bujjiya (Highlight, kg), Steamed Rice (kg), Chappathi (pieces), Muttar Masala (kg), Veg Pulao (kg), Masala Sambar (L), Tomato Dal (L), Garlic Rasam (L); units appear only in Record waste. Today's report saved 2:40 PM, editable until 8:40 PM.

**Components (page 03, flagged).** LiveCard (Live / Stale / Offline; no "recorded at the door"), **ForecastCard** (Ready / Loading / Stale / Not ready), ShortageRow (Sent / Seen / Couldn't send), **StatusText** (Recorded / Not recorded / Not started / Draft; optional mono time), DishRow, QuantitySheet, **HistoryRow** (Recorded / Not recorded), KitchenAlertRow (Meal ended, Food short, Shortage seen, Waste not recorded × Unread / Read), KeyPad + Size=Decimal. HeadcountCard, ReportStatusChip and HistoryRow (v1) are kept, marked superseded.

## SUPERVISOR 2026-10 (run SUPERVISOR, 2026-10-19)

Source: design/reference/supervisor_2026-10/ (S00–S19, data/supervisor_spec.md). Scope: the Supervisor role on page 09 (new SV-* frames). Shared with the Door Scanner, Pass Desk and Kitchen, not redrawn: sign in, role selection (MS-1, Supervisor row), the shared password page (role chip "Supervisor"), StaffTabBar3, the SOS tab, the offline pattern, Language and Help. The v1 Supervisor dashboard (MS-H, MS-D, MS-F and the MS-C / E / G pages it linked to) is replaced and archived once nothing reaches it.

**Principles.**

1. **Four jobs, nothing else.** Start and close the meal; follow up shortages and mark them resolved; see whether the kitchen recorded waste (read only); look after SOS alerts and **close a case once it is checked**. No cooking plan, no batches, no holds, no waste approval.
2. **One meal, three states.** Home shows the meal as Not started (empty dot + "Not started"), In service (lime chip "In service · 55 min") or Closed (filled dot + "Closed · 2:00 PM"). Start and Close each ask once in a centred dialog: "Start this meal?" (Lunch · Main Mess, "Door scanner and pass desk will open.") and "Close this meal?" ("Door scanner and pass desk will stop."), Cancel on the left, the action on the right.
3. **Forecast before, entries during, final after.** Not started: black card "FORECASTED ATTENDANCE", 860, "expected diners", lime "Start meal". In service: "LIVE · 1:40 PM", 714, "students entered", a quiet outlined "Close meal". Closed: "MEAL CLOSED", "Lunch has ended", "Final entries" 774 or "Unavailable". The forecast is **never** shown beside the live count.
4. **One task, one place.** "Waste not recorded" and "Active shortages" are the same tasks on Home, in Alerts and on Me; the counts always match and each row opens its Alerts group.
5. **Shortages.** Item, "Almost out · posted 1:30 PM", dot + "Active". Shortage details → Mark resolved → "Mark shortage as resolved?" → the shortage leaves the active list and Meal history says "Shortage resolved". Closing a meal does **not** resolve a shortage.
6. **Waste is read only.** The report shows two separate values (Unserved food: N dishes; Plate waste: one total in kg) and expandable Report details with each dish in its own unit ("4 kg", "3 L", "12 pieces", "0 kg · none left"). There is **no forward, approve, edit or return action anywhere**; the line "Read only. The kitchen records this report." Not recorded: "The kitchen has not saved this report yet. Nothing to do here." Closing a meal does not complete a waste report.
7. **Missing data is never zero.** "Unavailable" for a missing count, "Not recorded" for a missing report.
8. **The Supervisor closes SOS cases.** The SOS tab sits under the avatar only while an SOS is active. Panel: Not taken ("Nobody has taken this yet", "Only if you're free. Keep the meal running first if it is busy.", I'll go and check / Not now) → Claimed by you ("You're checking this", Mark as checked → "Checked by the supervisor") → Checked ("Checked by the door · 12:52 PM", "Close the case when you are satisfied.", Close case / Not yet) → toast "Case closed" and the tab disappears. The door, pass desk and kitchen only mark a case checked; **"Close case" never appears on another role**.
9. **Status is a small dot plus plain text, never a pill.** Active (filled ink dot), Not recorded (empty dot), Recorded / Resolved (lime dot with ink ring), Closed (filled ink dot).
10. **Me and history.** Me: RV, Ravi, Supervisor · Main Mess; Meal history; Follow-ups (Active shortages, Waste not recorded); Sign out → "Sign out?" → role selection. Meal history is reachable from Me only (no fourth tab): compact rows "Wed 14 · Lunch", "774 entered" or "Unavailable", and a second line of plain status. Past meal summary is read only.

**SIMULATED in the Figma prototype (needs a backend; OWNER).** Shared meal state (Start and Close, and the hidden time-skip that moves the Door Scanner, Pass Desk and Kitchen to the same state), live and final entries, the forecast feed, shortage reporting and resolving, the waste data and the link from the kitchen's saved report, SOS routing, claiming, checking and closing, the alert feed, meal history, connection loss. Every Supervisor frame carries a "Simulated:" note.

**Brand and layout.** OrbitBackdrop on every frame. Mono only for numbers, times and units; words in sans. Staff primary buttons 56 pt; targets 44 pt; text at least 12 pt; list rows 56 pt. Dialogs: one centred card, identical size and position on every frame. No new tokens.

**Sample.** Main Mess, Lunch, Wed 14 Aug 2024, 12–2 PM. Supervisor Ravi (RV). Forecast 860. Entries 714 at 1:40 PM; final 774. Shortage: Steamed Rice, almost out, posted 1:30 PM by the kitchen. Waste not recorded: Lunch · Wed 14 (closed 2:00 PM) and Dinner · Tue 13 (598 entered). Waste report Lunch · Tue 13 Aug: recorded 2:40 PM; Steamed Rice 4 kg, Masala Sambar 3 L, Muttar Masala 0 kg · none left, Chappathi 12 pieces; plate waste 21 kg. SOS: Found something in food, Main Mess · Block A, 12:45 PM; checked by the door 12:52 PM.

**Components (page 03, flagged).** **MealCard** (Not started / In service / Closed / Closed · Unavailable), **FollowUpRow** (label, mono count, chevron), **SupervisorShortageRow** (Active), **WasteRow** (Not recorded; second line words or mono entries), StatusText (reused from the Kitchen), **ConfirmDialog** (title, optional lines, Cancel and action side by side), **SOSCard** (Not taken / Claimed by you / Checked by someone else) used in Alerts and the panel. SOSEdgeTab, StaffTabBar3 and the SOSPanel layout are reused.
