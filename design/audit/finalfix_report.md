# Final-fix run ("RUN FINAL-FIX") · final report (2026-10-04)

**Branch:** `claude/mealloop-ios-design-e9n1n5`.

**How each stage ran:**
- It opened with a full-walk snapshot, which matched the previous end state. Exception: F6's start snapshot covered four pages, and the other ten were confirmed during the stage (logged).
- It was checked with a snapshot diff (nodes, links, flow starts) and renders at scale 1.
- It was committed and pushed with a row in `run_status.md`.

No STOP condition was hit: no snapshot mismatch, no Figma authorization prompt, no failed push. No questions were asked.

## Stages

| Stage | Result | Reason / notes | Snapshots |
|---|---|---|---|
| F0 Preflight | done | ids resolve, push dry-run OK, PROJECT_CONTEXT.md absent | st171 = st170 |
| F1 Today and Insights homes | done | pills removed; 15 pill views → drill-ins with titled Back; peek stack; Insights hero, Trends line, sparkline | st172 → st173 |
| F2 Manage hub | done | "To do" row removed, tiles +14 pt; lime current step (conflict below) | st174 → st175 |
| F3 Menu redesign | done (partly: Edit dish exists only for Sambar) | 5 new frames, 2 new components; 10 dish tiles have no editor yet | st176 → st177 |
| F4 iOS back | done (student report only) | titled Back on 115 admin + 37 staff drill-ins; sheets close with Back | st178 → st179 |
| F5 Swipe rows | done | 4 prep-card rows → vertical stacks; the AD-4d chip row is not a card row (left) | st180 → st181 |
| F6 Readability | done (10 sub-44 pt pills and dots left) | mono 12 → 13, faded → dashed, wraps, 44 pt rows; nothing shrunk | st182 → st183 |
| F7 Wiring | done (partly: scanner and pass desk have no start) | manifest, link fixes, one start per role, reachability, DEMO.md | st184 → st185 |
| F8 Quick check | done (report only) | final_fix_check.md, ranked list of 9 | st186 = st185 |
| F9 Final report | done | this file; gaps 318–326 | — |

## Decisions made without asking

1. **F1:**
   - The 15 pill views became drill-ins, titled after their pill (To do, Messes, Alerts, Meal, Waste).
   - Wordmark and avatar are hidden on drill-ins.
   - The 6 sheets drawn over them were updated to match.
2. **F1:** Empty drill-ins keep their top-aligned card (46–53% fill). They were not padded out, because "Change ONLY what a stage names".
3. **F1:** the Insights hero highlight is the lime "−38 kg" pill, the one highlight per hero.
4. **F3:**
   - Breakfast and Dinner dish values are new sample numbers that pass 4P + 4C + 9F within 5%.
   - The macro bars are one bar with hard gradient stops, because instance overrides cannot resize segments.
5. **F3:** the Offline menu has no meal pills, a dashed and unlinked "+", and a note "Add and edit need a connection".
6. **F4:**
   - The back label is the origin's short title (≤ 13 characters), else "Back".
   - State frames go back to their family's origin; base screens use Back.
   - Student frames are report only, under the student scope rule.
7. **F6:** sizes are minimums only. Nothing was shrunk, and nothing moved to a detail screen. Task-screen shift lines were shortened so the StaffTopBar wraps on at most 2 lines.
8. **F7 manifest:** it has one row per frame instead of one row per element (about 3,500 elements). The raw lines are kept in plugin data.
9. **F7, interactive components:** DecisionActions and HeroActions variant changes count as "in place" and are not missing links.
10. **F7, comment-author avatars:** the 33 links to "You" (added earlier in F7) were removed, because those avatars show other students. Students reach their profile from the You tab; the student app has no own-avatar.
11. **F7, Kitchen confirmed the hold:** that notification now opens AD-3b Safety case (Confirmed), which also makes Verify and close reachable.
12. **F7, dinner Track:** the button only set a variable. It now uses the lunch conditional (Your plate or First run).
13. **F7, background controls:** controls under a sheet's scrim were not linked (Answer No · Why not links reverted).
14. **F7, starts on other pages:** all starts on pages 00, 04 and 05 were removed (8), following "remove every other start".
15. **F7, sign-in chains:** the student All set step and the staff Start your shift step were kept between Confirm profile and home.
16. **F8 scope:** all 217 staff and admin frames, since F4, F6 and F7 touched every one of them. Sheets were excluded from the counts, because the tool measures the background behind the scrim.

## Brief-vs-rule conflicts (rule followed, logged)

| Brief | Rule | Outcome |
|---|---|---|
| F2: remove the hub "To do" row | Rule V2: lime once per hero / screen | The current pickup step on the Spare food tile is lime with an ink outline (allowed: current step) |
| F7: exactly 3 Sign in starts; remove every other start | Never lose a working path; "never hide a frame" | Starts as briefed. Scanner and pass-desk frames kept and wired, but unreachable. Duty picker listed as destination-absent; present from MS-A1 / MS-B1 |
| F7: exactly one student start | The state gallery was reached from its own start | Gallery kept and wired, no start; present from Gallery · A · Sign in |
| F7: Sign in → Verifying → Confirm profile → home | Change only what a stage names; no visuals in F7 | The existing All set (student) and Start your shift (staff) steps were kept |
| F7: the avatar opens Profile on every frame | Links must make sense (rows open their own detail) | Comment-author avatars unlinked; student profile via the You tab |
| F7: admin tab bar on every frame; staff and student likewise | A sheet keeps the tab bar of the screen under it; staff have no tab bar | Sheets and the sign-in trio have no tab bar; staff use StaffTopBar (Back + avatar + End shift) |
| F7: columns frame, element, destination, status | Readable documents | Folded to one row per frame; every element keeps its destination and status |
| F6: rows ≥ 44 pt | Change only what a stage names; no restyle | 10 small pills and dots left and logged (AD-7a, AD-7d) |

## New gaps (also in prototype_gaps.md)

| # | Summary |
|---|---|
| 318 | Scanner (MS-A) and pass-desk (MS-B) flows are unreachable from the only staff start. Needs a duty picker (supersedes 308 for reachability). |
| 319 | The student state gallery (96 frames) has no flow start since F7 |
| 320 | 83 controls lead to destination-absent screens (list below) |
| 321 | Words set in mono on 19 staff and 28 admin frames: eyebrows, "dishes", "reports", "for · against" (gap 306 family) |
| 322 | 12 staff and admin frames have ≥ 4 lime elements. AD-6c3 (6) and MS-F4 (5) need a rule V2 review by kind. |
| 323 | 10 tappables under 44 pt: AD-7a Give access ×2 and Role bar, AD-7d Type pill and 6 timeline dots |
| 324 | The lunch Meal detail has no unanswered or Skip / Not sure states: Change, Skip and Not sure on lunch Meal detail · Answer Yes are destination-absent |
| 325 | The audit tool (`fa1`) counts layers under a sheet's scrim |
| 326 | Gap 310 is wider after F3: 10 menu dish tiles (Lunch, Breakfast, Dinner) have no Edit dish frame |

Still open: 303–307, 309, 311–317 (313 now 20 staff frames, 314 unchanged).

## New sample data

- **F1:**
  - Insights hero "−38 kg" vs week before, flat;
  - Waste sparkline 742 / 718 / 680 / 642 kg;
  - shortages 3 / 3 / 2 / 2.
- **F3** (finalfix/f3/menu_data.md):
  - Idli 140 kcal (4 / 29 / 1);
  - Coconut chutney 70 (1 / 3 / 6);
  - Paneer masala 280 (10 / 12 / 21);
  - Dal 150 (9 / 20 / 4);
  - Egg bhurji 190 (13 / 3 / 14);
  - plates: Breakfast 320 kcal (12 / 57 / 31%), Lunch 830 (13 / 51 / 36%), Dinner 850 (14 / 53 / 33%);
  - meal windows 7–9 AM, 12–2 PM, 7:30–9:30 PM.
- **F2, F4–F9:** none.

## Components

- **Added (flagged):**
  - **MenuDishTile** set (1468:119999): Kind = Dish, Ticket or Add; Diet = Veg, Egg or Non-veg;
  - **PlateRingHero** set (1469:2051): Meal = Breakfast, Lunch or Dinner.
- **Changed (flagged):**
  - **GlassButton** (74:101): new Kind=Titled variant with a Label property;
  - **NavHeader** (74:136): Back=Titled variants, properties re-bound;
  - **StaffTopBar**: Task type uses the titled back; texts wrap, min height 56.
- **Reused:**
  - patterns: Drill-in header, Tab Bar, DecisionActions, HeroActions, ListRow, OfflineBanner;
  - controls: pill bar, Button;
  - the student MacroBar colours.

## NEEDS REVIEW: new or changed screens

**New (F3, page 10):**
- AD-5a · Menu — Lunch · new;
- AD-5a · Menu — Breakfast · new;
- AD-5a · Menu — Dinner · new;
- AD-5a · Menu (Empty) · new;
- AD-5a · Menu (Offline) · new.

**Changed by F1 (page 10):**
- **Homes:** AD-1a · Today — Now (Success, Empty, Offline), with the peek stack on Success and Offline; AD-4a · Insights — Overview (Success, Empty, Offline); AD-8a · Profile sheet · new (background).
- **Today drill-ins:** AD-1c · Today — Decisions (Success, Empty, Offline); AD-1e · Today — Messes (Success, Empty, Offline); AD-1f · Today — Watch (Success, Empty, Offline).
- **Insights drill-ins:** AD-4c · Insights — Waste (Success, Empty, Offline); AD-4e · Insights — Meal (Success, Empty, Offline).
- **Sheets:** AD-1c · Awaiting others sheet; AD-2 · Data freshness sheet (and Offline); AD-4e · Possible causes sheet (and Offline).

**Changed by F2:** AD-5-0 · Manage hub (Success, Empty, Offline).

**Changed by F5:**
- AD-1b · Today — Mess detail (and Offline);
- AD-1b · Mess detail — North;
- AD-1b · Mess detail — South · new.

**Changed by F4 (titled Back, every drill-in):** listed frame by frame in back_audit.md. That covers 115 admin and 37 staff frames, including all the frames above.

**Changed by F6 (readability):** listed frame by frame in readability_audit.md. That includes MS-E-empty, every StaffTopBar task screen, and AD-6c Rewards.

**Changed by F7:** links only (no visuals). Listed in wiring_manifest.md under "Fixes applied in F7".

## Destination-absent screens (to build)

| Screen to build | Opened from |
|---|---|
| Edit dish for Rice, Paneer butter masala, Chapati, Curd, Idli, Coconut chutney, Paneer masala, Dal, Egg bhurji (and Rice at dinner) | AD-5a Menu Lunch / Breakfast / Dinner tiles |
| Per-mess report preview (Main, North, South, Annexe) | AD-4d rows |
| Community report detail ×7 and the Merge result | AD-3d rows, Merge 3 into one; AD-5c2 Look the same sheet |
| Dismissed-hero state ("Not now") | AD-3a Issues — Community |
| Confirm dish action result | AD-3c Confirm action |
| Masala dosa vote in progress | AD-5c Menu voting row |
| Scope results: passes South / Annexe, surplus North / Annexe, people and staff per mess | AD-6a / AD-6d / AD-7a / AD-7b Scope sheets |
| Audit log filtered by type (6 types) | AD-7d Type sheet |
| Meena staff access; Lakshmi saved state | AD-7a Give access sheet; AD-7b Lakshmi (Give) Approve |
| Awaiting others: hold confirmation, Karan's original pass | AD-1c Awaiting others sheet |
| Role detail, mess scope detail | AD-8a and MS-H3 profile sheets |
| Staff per-dish override edit (Rice, Paneer, Chapati, Curd), staff dish detail ×5, dish feedback detail ×4 | MS-C3, MS-C5, MS-D2 rows |
| Duty picker; scanner and pass-desk profiles | Staff sign-in; MS-A1 / MS-B1 avatar |
| Student: results for "special pass", lunch Meal detail answer states, plate for other meals ×7, nutrient list with goal, shortage detail, community guidelines ×4, inbox actions menu, expense edit for other rows, data export request, help articles ×5, privacy policy and terms (web), Feedback dish list for other meals / dishes | Search, Meal detail, You · Daily breakdown, Waste, Community, Notifications, Spending, Privacy, Help, About, Feedback |
