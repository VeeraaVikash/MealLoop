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
