# MealLoop · design intent

Written down on 2026-09-30 from the owner's notes in the design chat and the content-diet brief. **Updated 2026-10-01 by the contract pass** (definitions, new design rules, permissions, offline rules, reasons for absence, sample rules, admin page plan).

It is not a stage record; `prototype_contract.md` still holds every stage rule, and its section "Contract pass · Stage 0" holds the full tables behind the summaries here. Read this before any design stage.

## How the owner judges design

- "Generic" is the #1 complaint. Default ListRow + pill + chevron on white cards reads as boilerplate SaaS. Before reaching for a list, reuse a distinctive pattern: LiveDial, MessBadge / CrowdBadge / MetricBadge, PrepCard swipe cards, stacked duplicate cards, filter-chip rows, black hero card.
- Also rejected: too much content per card, several elements competing to be the loudest, screens that feel like "bits and pieces", and unexplained gaps. One fact per line. Every screen has one clear hero.
- Status colours may differ by state but must be muted and consistent. Never full-card traffic-light fills. Lime is the only brand accent.
- **BACK STANDARD (Final-2 G1, replaces the Final-fix F4 titled back).** Apple's UIKit documentation for `UINavigationItem.backButtonDisplayMode` describes three modes:
  - `.default` shows the previous screen's title, then falls back to the generic "Back", then to nothing as space runs out;
  - `.generic` shows "Back";
  - `.minimal` shows only the back indicator (the chevron).

  MealLoop uses **minimal**. Every drill-in screen has ONE BackButton: a round 44 pt glass circle with the system chevron (GlassButton Kind=Icon, chevron.left), top-left at x 16, y 58. It has the same size and offset on every screen of every role. The screen's own title is the navigation title (centred inline, or the iOS large title under the bar), and the button never holds title text.
  - Tab roots have no Back.
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
