# MealLoop · design intent

Written down on 2026-09-30 from the owner's notes in the design chat and the content-diet brief. It is not a stage record; `prototype_contract.md` still holds every stage rule. Read this before any design stage.

## How the owner judges design

- "Generic" is the #1 complaint. Default ListRow + pill + chevron on white cards reads as boilerplate SaaS. Before reaching for a list, reuse a distinctive pattern: LiveDial, MessBadge / CrowdBadge / MetricBadge, PrepCard swipe cards, stacked duplicate cards, filter-chip rows, black hero card.
- Also rejected: too much content per card, several elements competing to be the loudest, screens that feel like "bits and pieces", and unexplained gaps. One fact per line. Every screen has one clear hero.
- Status colours may differ by state but must be muted and consistent. Never full-card traffic-light fills. Lime is the only brand accent.
- Reference set (Dribbble inventory and restaurant-ops dashboards): circular capacity badges, gauge / dial, swipeable stacked cards, filter chips with a sticky action footer, directory list with role tags, inventory-dashboard bento. Take the mechanics, never their palettes or illustrations.
- Full state coverage (Success / Empty / Offline) from AD-4 on. Empty and Offline are simpler than Success, not copies of it.

## RULES · content diet (admin, from the 2026-09-30 brief)

1. At rest, a screen has at most 3 blocks above the fold: (a) one hero, (b) one thing that needs the admin, (c) one row that goes deeper. If nothing needs the admin, omit that block; never invent one.
2. Policy and rule text never sits on the main surface. One "Rules" pill (Estimate pill style) opens a sheet (H14 sheet pattern) with at most 3 one-line rules.
3. A mess filter is ONE scope pill ("Main Mess") that opens a single-select sheet (MS-C1 row pattern), never a four-chip row.
4. Lists show at most 3 rows plus "See all".
5. One big number per screen.
6. Density target at rest: 3 blocks and 12 visible text layers or fewer (not counting status bar, tab bar, Moment note, sample chip).
7. Reuse first. New components only when a brief names them; flag anything else.
8. Every Back returns where it came from. No dead chevrons.

## RULES · fill floor (admin, from the 2026-09-30 coupons brief)

Content diet has a ceiling (3 blocks) and now a floor.

9. On every non-Empty screen, content at rest reaches at least 75% of the way down to the tab bar: the lowest content item ends at y 561 or lower (the tab bar top is at y 748). Reach it by enlarging the hero number or the data visual, never by adding blocks.
10. Empty and Offline states centre their message vertically. They must not sit at the top with dead space below.
11. Reading used from 2026-09-30, to confirm: an Offline state that still shows cached data (banner plus hero) counts as non-Empty and meets rule 9, with its banner at the top. An Offline state with no data is a message and follows rule 10.
12. Measured by `tools/filltool.js` (fill = lowest content item at rest ÷ 748; an Empty card is centred when its centre is within 8 pt of the middle of the free band between whatever sits above it and y 748).

## RULES · logs (from the 2026-09-30 AD-7d brief)

13. A log is a timeline. Rows are quiet unless they are exceptions. Mono is for numbers, times and IDs only.

## RULES · analytics (admin, from the 2026-09-30 AD-4 content brief)

14. There are two year controls, and they are never merged:
    - **Student year** is the cohort (1st year, 2nd year and so on).
    - **Academic year** is time, compared across years.

    An academic-year comparison shows "Needs a full year of data" until a full year exists.
15. Hide any student-year group with fewer than 10 students, and show "Too few to show" in its place.
16. Turnout is not a funnel. Show it as three groups: **said yes and came**, **said yes and didn't come**, and **no answer and came**. Show scan failures and ID fallbacks beside low counts.
17. No wait-time minutes anywhere.
18. Admin analytics never include the private calorie or spending trackers.
19. Pass scans stay separate from entrance attendance.

## Product decisions

- 3 logins: student, mess staff, admin. Mess staff = permission bundles (scanner, pass checker, kitchen, supervisor). Admin = 4 tabs by intent: Today / Issues / Insights / Manage.
- Overrides: supervisor overrides go live with a mandatory reason; the food head is notified afterwards; large changes need prior approval (limits are drafts until the food head confirms).
- Privacy: masked student IDs; feedback is aggregate, never names; calorie and spending trackers are private; spending hidden on Home by default.
- Voting: hard gate for "Doesn't qualify", soft warning plus logged override for "Needs review". A vote never changes the menu by itself.
- Menu source of truth: the Main Mess prep list (gap 110).
- Commits: author VeeraaVikash, no Claude co-author line.

## Why these screens exist

- The mentor called the app "basically an attendance app" and asked for a 2026-level idea. Direction: a Prep Agent (recommends prep quantities, escalates when unsure) and a Crowd Agent (live turnout). The demand, override, crowd and shortage screens are their surfaces.
- Target customer: institutional hostel management (SRM first).
