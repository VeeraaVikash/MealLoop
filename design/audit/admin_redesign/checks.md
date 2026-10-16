# ADMIN-REDESIGN · X9 checks (2026-10-16)

Scope: the 99 phone frames on page **12 Admin Redesign** (85 new + 14 restyled copies of page-10 frames). Tool: `x9chk` (shared plugin data), run in four chunks of 25; texts checked: 1,906.

| Check | Result |
|---|---|
| Contrast (lowest 15 pairs) | Lowest pair **5.72 : 1**: `ink-secondary` on `canvas` (dates, section labels, row details, unselected tab labels); every lowest-15 pair is this one. On the black hero cards the lowest is `on-hero-secondary` on `hero-bg` (well above 7 : 1). 0 pairs under 4.5 : 1. Sheets measured over their own surface; the dimmed page behind a scrim is not measured. |
| Words in mono | 0 (numbers, times and units only: 860, 7:05, 4 L, 18 kg, 80%, +91 98••• ••214). |
| Lime elements | 0 frames over 3 beyond the backdrop (counted per element; the OrbitMark logo is exempt). Decisions 4, 13, 17, 19. |
| Lime text on a light surface | 0. |
| Backdrop | OrbitBackdrop on 99 / 99 frames (restyled copies included). |
| Text under the standard | 0 texts under 12 pt outside the tab bar (tab labels 11 pt are the shared iOS tab bar component, exempt as in every run). Body 15 / 17, secondary 13 / 15, meta 12. |
| Targets under 44 pt | 0 linked layers under 44 × 44 (DayLine nodes have 80 × 56 hit areas; Call is a 44 pt circle; Edit has a 44 pt hit area). Status-bar time skips are 393 × 54. |
| Real truncation | 0 texts with truncation. Long titles (reason pages) wrap in a 34 pt content title. |
| Horizontal overflow | 1 found and fixed (Find a meal: four meal segments wider than the row → equal fill). 0 left. |
| Raw hex | 0 unbound solid paints on page-12 nodes (all fills and strokes bound to ML tokens; instance internals come from library components). |
| Detached instances | 0: all tiles, chips, tags, steppers, reason cards / rows, food tiles / chips, meal cards, tickets, rails and stat bars are instances of the page-03 components. |
| Banned content | 0 kcal / nutrition / calorie; 0 "cook" instructions (only "Vendor cooked: not shared", "Quantity cooked", "Amount cooked (vendor)" as missing data); 0 planned dish quantities; 0 "or" between dishes ("Export PDF or CSV" reworded to "PDF and CSV export"). |
| Percentages | No percentage split of causes. Percentages shown: −9% (came vs sent on the report), data completeness 80% / 60%, "8% more than the headcount sent" and "41% of entries in the last 30 minutes" (the rule thresholds, on one meal each). |
| Every count labelled "meals" | Results and reason pages: every count carries "meals" (ReasonCard, ReasonRow, FoodTile "in N meals", "N more meals", "9 of 56 meals"); the Weekly report "56" sits on the row "Meals". |
| Wording = data file | Segments Left over / Ran out / To check; tags Sure / Probably / Can't tell; the eight reason sentences; "Vendor cooked: not shared"; "This is not the final count" on every live state. |
| Numbers consistent | 860 (52 texts), 700 (21), 612 (17), 786 (22), 712 (6), 2,870 of 3,500 (4 each), Left over 5 / 3 / 2 / 4 and Ran out 1 / 1 / 1 / 1, Wed 14 Aug (27). Sample numbers not in the data file are listed in decisions 11, 18, 22 and 24 (NEEDS REVIEW). |
| Other pages unchanged | Snapshots st300–st304: pages 04, 05, 07, 09, 10, 11, 13, 14, 15, 99 and the rest 0 differences in every stage; page 03 changed only by the new admin components (+17, then 2 component tweaks). Flow starts 10 → 14 (4 added on page 12). |

Known limits (logged, not failures): the contrast tool resolves each text's background as the nearest solid fill (glass tab bar measured against the canvas); images are references, so the renders were compared by eye at scale 1 for A01–A14 (screenshots during X2–X7).
