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
