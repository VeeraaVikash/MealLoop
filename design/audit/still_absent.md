# Still absent (Final-2 G11)

These are the controls that still lead nowhere after G11. The source is the wire7 manifest re-run on 2026-10-05, stored as `man12_*` in the file. Every control the manifest marks "missing" falls into one of three groups:

1. **Absent:** the screen it should open does not exist yet. The list below covers all of them.
2. **In-place:** the control works without a new screen (a pick-one choice, switch, segmented control, expand toggle, the button pressed in a Sending state, or an avatar). These are not destination-absent.
3. **Destination exists:** the screen exists but the control isn't linked yet. G12 wires these; reachability_final.md lists what is left.

Manifest "missing" counts at the G11 end:
- **07:** 207.
- **09:** 24, all pick-one pills on C3, C4, C7 and D1 (in-place).
- **10:** 127.

## Built in G11

| Screen | Page | Opened from | Note |
|---|---|---|---|
| AD-8a · Profile sheet | 10 | Avatar on the tab roots | Already existed from run 3; verified. Shows name, role and where. Rows: Notifications → AD-8b, Help → AD-8d, Sign out → AD-0 Sign in. Close and tap-outside both go Back. |
| AD-8b · Notifications (+ Empty) | 10 | Profile sheet | Already existed; verified. A rail matching the To do list, including "Kitchen confirmed the hold 1:48 PM"; every row opens its case. |
| AD-8b · Notifications (Offline) · **new** | 10 | State | Banner reads "Offline · saved 1:38 PM". The 1:48 PM row is left out because it arrived after the save. Rows open their saved screens. |
| AD-8c · Search — Recent / Results / No results | 10 | Search button on every tab bar | Already existed; verified. Built from SearchField and SearchResultRow. Results are grouped into Dishes, Messes, People and Cases, and each opens an existing screen. |
| AD-8c · Search (Offline) · **new** | 10 | Search button on the 33 offline frames | The field reads "Search needs a connection" and has no link. Recent searches still open their saved screens. |
| AD-1b · Mess detail — North / South / Annexe | 10 | AD-1e Messes tiles, Search | Already existed; verified. North: 640 of 700, Rice running out. South: 520 of 800, Chapati at risk. Annexe: not counted, last synced 12:10 PM. **Fixed:** the Annexe freshness row said "updated 1:40 PM" and now says "last synced 12:10 PM". **Added links:** How counted → freshness sheet on South and Annexe; Updated → freshness sheet (South); last synced → Data gaps (Annexe). |
| AD-6c3 · Rewards — Redemptions | 10 | AD-6c Catalogue / Redemptions switch | Already existed; verified. A rail of today's 5 redemptions. Budget: Rs 2,370 of Rs 5,000 = 63 juices × Rs 30 + 12 ice creams × Rs 40. |
| AD-8d · Help | 10 | Profile sheet | Already existed; verified. Five Q&A. |
| Community · Info sheet · **new** | 04, 05 (Dark), 07 | ⓘ on Community · List / Empty / Loading / Offline (07) | A Large-detent GlassSheet with grab handle, Close and tap-outside. Four reused BentoTiles: who sees it, what to write, same problem, what happens next. |

## Absent: screens still to build

| Screen | Opened from | Count |
|---|---|---|
| **ADMIN** | | |
| Edit dish for Rice, Paneer butter masala, Chapati, Curd, Idli, Coconut chutney, Paneer masala, Dal, Egg bhurji, and Rice at dinner | AD-5a Menu Lunch / Breakfast / Dinner tiles, and the Offline tiles | 15 |
| Per-mess weekly report (Main, North, South) | AD-4d rows | 3 |
| Monthly / Mess-wise / Year-wise reports | AD-4d chips (G8) | 3 |
| Community report detail and the Merge result | AD-3d rows ×7 (+2 Offline), Merge 3 into one | 10 |
| Proposal merge result; proposal rows | AD-5c2 Look the same sheet (3 rows + Merge) | 4 |
| Ranked proposals list | AD-5c2 "3 proposals, ranked by students" card (Success, Offline, Vote open) | 3 |
| Masala dosa vote in progress | AD-5c Menu voting row | 1 |
| Confirm dish action result | AD-3c "Verify after Fri recheck" | 1 |
| Dish feedback detail for Rice, Paneer butter masala and Curd | AD-3a Issues — Dishes rows (Success and Offline) | 6 |
| Dismissed-hero state ("Not now") | AD-3a Issues — Community | 1 |
| Surplus pickup per-dish detail | AD-6d2 Pickup detail rows (Success and Offline) | 8 |
| Scope results: passes South / Annexe; surplus North / Annexe; people Main / North / South; staff Main / North / South / Annexe | AD-6a, AD-6d, AD-7a and AD-7b Scope sheets | 11 |
| Audit log filtered by type | AD-7d Type sheet (6 rows) | 6 |
| Meena staff access; staff search results | AD-7a Give access sheet | 2 |
| Lakshmi saved state | AD-7b Lakshmi (Give) Approve | 1 |
| Role detail; mess scope detail | AD-8a Profile sheet rows | 2 |
| Feed detail for each data feed (Entry scans · Annexe opens AD-2d Data gaps; wired in G12) | AD-2 Data freshness sheet (Success and Offline) | 10 |
| **STUDENT** | | |
| Results for "special pass" | Search · Empty recent | 1 |
| Feedback for another meal or dish | Feedback · Pick meal rows, Pick dish chevrons | 4 |
| Shortage detail | Waste · Dish breakdown "2 shortages last week" | 1 |
| Expense edit for other rows | Spending · This week / This month / Saved / Offline chevrons | 15 |
| Inbox actions menu | Notifications · Inbox / Offline trailing ⋯ | 2 |
| Data export request | Privacy & data | 1 |
| Help articles ×5 | Help rows | 5 |
| Privacy policy and terms (web) | About MealLoop | 2 |
| Nutrient list with goal | You · Daily breakdown · goal on, "All nutrients" | 1 |
| Plate tracker for other meals | Meal detail (dinner) · Track this meal? | 1 |
| Ice cream ticket | Credits Ice cream Get (G9) | 1 |
| **MESS STAFF** | | |
| Dish detail for every dish except Sambar | MS-C1 rows (their chevrons were removed in G7) | 5 |
| Help for Door scanner, Pass desk and Supervisor | MS-G5 is written for the Kitchen job only | 3 |

## Deferred (named by the brief, not built)

- **Turnout and reasons:** a per-meal turnout screen with reason breakdowns. Report page 5 covers it for the week only.
- **Prep accuracy:** an in-app screen. Report page 4 covers it for the week only.
- **Admin coupon wallet:** how many coupons are issued, used and outstanding per student. The Redemptions view shows only redemptions.

## In-place controls (not destination-absent)

Exact counts from the stored manifests.

| Kind | Where | 07 | 09 | 10 |
|---|---|---|---|---|
| Pick-one choices | Reason pickers (Answer No, Intent Reason failed, Meal detail (dinner), Entry · Discrepancy), Daily goal options, Quick add Type, staff dish and reason pills | 37 | 24 | 0 |
| Segmented controls | Community Active / Fixed / Supported, Waste Last meal, Spending This week, Entry This week, AD-5b Veg / Non-veg | 14 | 0 | 3 |
| Switches | AD-7b staff toggles, Settings rows (System off, Failed, Nutrition), Use a daily goal | 17 | 0 | 20 |
| Expand toggles | You · Daily breakdown, Pass · Not today | 8 | 0 | 0 |
| Pressed or disabled during a Sending state | Answer / Meal detail Sending buttons, Add expense · Saving, Deleting, Feedback · Sending, AD-3b2 Sending | 9 | 0 | 1 |
| Avatars and display rows | Comments avatars, AD-7b avatars, AD-6c3 redemption rows, Plate tracker first-run points | 36 | 0 | 12 |
| **Left after the in-place groups** | Absent screens above, plus controls whose destination exists (G12) | 86 | 0 | 91 |
