# Page 10 layout grid (2026-09-30)

A position-only stage: every node was moved by id; no content, size, link, flow-start or layer changes. The only additions are the three sheet-row titles.

**Snapshots:** before = `st88`, after = `st89`. The before x/y of all 331 top-level nodes is stored in plugin data `mealloop/st88_xy_811`, and the full move plan (331 entries, each with its before and after position and, for annotations, its offset from its frame) is in `mealloop/layout_plan_st88`.

## Grid

- **Rows:** one per section, AD-1 to AD-7. Sections with sheets (AD-5, AD-6, AD-7) have a second row directly below for the sheets.
- **Frames:** 393 × 852. 80 pt between frames, so x = 0, 473, 946, … Every row starts at x 0, and all frames in a row share one y.
- **Rows:** 240 pt between rows (frame bottom to next frame top), so the row y values are 0, 1092, 2184, 3276, 4368, 5460, 6552, 7644, 8736, 9828.
- **Annotations travel with their frame at unchanged offsets:** label (0, −36), Moment note (0, +868), sample chip (0, +940). All 243 were checked after the move (81 frames × 3).
- **Section titles:** one above each row at (0, row y − 80), in the existing title style.
  - The 7 existing titles moved from row y − 100 to row y − 80, so each title sits nearer its own row than the chips of the row above.
  - Clearance: 31 pt from the chip above to the title, and 10 pt from the title to the first label.
  - The 3 new sheet-row titles ("AD-5 · Sheets", "AD-6 · Sheets", "AD-7 · Sheets") are clones of the AD-5 title, so they carry the same text style.

## Order within a row

- **States come first:** each screen group runs Success, Empty, Offline (where they exist), then its other variants. Groups follow the section's journey order (the letter sequence a, b, c, c2, d).
- **AD-5:** the Manage hub (the section's entry) moved from negative x to the start of the row. 5c2 Proposals now follows 5c Menu voting (it opens from 5c), and 5d Vote result closes the row.
- **AD-7b Person:** Success, Offline, then "changed" (was Success, changed, Offline).
- **AD-7c:** Suresh (Success), Offline, then Lakshmi (a second request) — was Suresh, Lakshmi, Offline.
- **Sheets:** ordered by the first screen that opens them, in row order, then by where the trigger sits on that screen (top to bottom, left to right). The openers were read from the links.

## Before → after (frames and titles)

### AD-1

| # | Frame | Id | Before x, y | After x, y |
|---|---|---|---|---|
| 1 | AD-1a · Today — Overview | `811:21056` | 0, 0 | 0, 0 |
| 2 | AD-1b · Today — Mess detail | `811:21211` | 493, 0 | 473, 0 |
| title | Section / AD-1 · Shell & Today overview | `811:21375` | 0, -100 | 0, -80 |

### AD-2

| # | Frame | Id | Before x, y | After x, y |
|---|---|---|---|---|
| 1 | AD-2a · Crowd — All messes | `824:21262` | 0, 1200 | 0, 1092 |
| 2 | AD-2b · Crowd — Mess detail | `824:21454` | 493, 1200 | 473, 1092 |
| 3 | AD-2c · Shortage alerts | `824:21543` | 986, 1200 | 946, 1092 |
| title | Section / AD-2 · Today — Crowd & shortages | `824:21663` | 0, 1100 | 0, 1012 |

### AD-3

| # | Frame | Id | Before x, y | After x, y |
|---|---|---|---|---|
| 1 | AD-3a · Issues — Overview | `849:564` | 0, 2400 | 0, 2184 |
| 2 | AD-3b · Issue detail — Safety report | `849:1014` | 493, 2400 | 473, 2184 |
| 3 | AD-3c · Issue detail — Dish feedback | `849:1299` | 986, 2400 | 946, 2184 |
| 4 | AD-3d · Community moderation | `849:1500` | 1479, 2400 | 1419, 2184 |
| title | Section / AD-3 · Issues | `849:1804` | 0, 2300 | 0, 2104 |

### AD-4

| # | Frame | Id | Before x, y | After x, y |
|---|---|---|---|---|
| 1 | AD-4a · Insights — Waste (Success) | `877:983` | 0, 3600 | 0, 3276 |
| 2 | AD-4a · Insights — Waste (Empty) | `877:1329` | 493, 3600 | 473, 3276 |
| 3 | AD-4a · Insights — Waste (Offline) | `877:1553` | 986, 3600 | 946, 3276 |
| 4 | AD-4b · Forecast vs actual — Main Mess | `877:1877` | 1479, 3600 | 1419, 3276 |
| 5 | AD-4c · Trends | `877:2037` | 1972, 3600 | 1892, 3276 |
| 6 | AD-4d · Reports & exports | `877:2272` | 2465, 3600 | 2365, 3276 |
| title | Section / AD-4 · Insights | `877:2551` | 0, 3500 | 0, 3196 |

### AD-5

| # | Frame | Id | Before x, y | After x, y |
|---|---|---|---|---|
| 1 | AD-5-0 · Manage hub (Success) | `968:3292` | -1479, 4800 | 0, 4368 |
| 2 | AD-5-0 · Manage hub (Empty) | `969:90191` | -986, 4800 | 473, 4368 |
| 3 | AD-5-0 · Manage hub (Offline) | `969:90286` | -493, 4800 | 946, 4368 |
| 4 | AD-5a · Menu & nutrition (Success) | `912:1481` | 0, 4800 | 1419, 4368 |
| 5 | AD-5a · Menu & nutrition (Empty) | `912:1793` | 493, 4800 | 1892, 4368 |
| 6 | AD-5a · Menu & nutrition (Offline) | `912:1995` | 986, 4800 | 2365, 4368 |
| 7 | AD-5b · Edit dish — Sambar | `912:2298` | 1479, 4800 | 2838, 4368 |
| 8 | AD-5b · Add dish (Empty) | `912:2500` | 1972, 4800 | 3311, 4368 |
| 9 | AD-5b · Edit dish (Offline) | `912:2697` | 2465, 4800 | 3784, 4368 |
| 10 | AD-5c · Menu voting (Success) | `934:2558` | 2958, 4800 | 4257, 4368 |
| 11 | AD-5c · Menu voting (Empty) | `934:2829` | 3451, 4800 | 4730, 4368 |
| 12 | AD-5c · Menu voting (Offline) | `934:2973` | 3944, 4800 | 5203, 4368 |
| 13 | AD-5c2 · Proposals (Success) | `971:3699` | 6409, 4800 | 5676, 4368 |
| 14 | AD-5c2 · Proposals (Empty) | `971:3867` | 6902, 4800 | 6149, 4368 |
| 15 | AD-5c2 · Proposals (Offline) | `971:3936` | 7395, 4800 | 6622, 4368 |
| 16 | AD-5d · Vote result → final decision | `934:3241` | 4437, 4800 | 7095, 4368 |
| title | Section / AD-5 · Manage, part 1 | `934:3407` | 0, 4700 | 0, 4288 |

### AD-5 sheets

| # | Frame | Id | Before x, y | After x, y |
|---|---|---|---|---|
| title | Section / AD-5 · Sheets (new) | `1052:7041` | –, – | 0, 5380 |
| 1 | AD-5a · Scope sheet | `972:3787` | 4930, 4800 | 0, 5460 |
| 2 | AD-5b · Rules sheet | `972:3951` | 5423, 4800 | 473, 5460 |
| 3 | AD-5b · More nutrients sheet | `1005:4734` | 8874, 4800 | 946, 5460 |
| 4 | AD-5b · More nutrients sheet (Add) | `1005:4865` | 9367, 4800 | 1419, 5460 |
| 5 | AD-5c · Rules sheet | `972:4100` | 5916, 4800 | 1892, 5460 |
| 6 | AD-5c2 · Needs review sheet | `973:4241` | 7888, 4800 | 2365, 5460 |
| 7 | AD-5c2 · Look the same sheet | `1005:4562` | 8381, 4800 | 2838, 5460 |

### AD-6

| # | Frame | Id | Before x, y | After x, y |
|---|---|---|---|---|
| 1 | AD-6a · Special passes (Success) | `957:2423` | 0, 6000 | 0, 6552 |
| 2 | AD-6a · Special passes (Empty) | `957:89396` | 493, 6000 | 473, 6552 |
| 3 | AD-6a · Special passes (Offline) | `957:89506` | 986, 6000 | 946, 6552 |
| 4 | AD-6b · Pass exception → reissue decision | `957:89611` | 1479, 6000 | 1419, 6552 |
| 5 | AD-6c · Rewards (Success) | `957:89699` | 1972, 6000 | 1892, 6552 |
| 6 | AD-6c · Rewards (Empty) | `957:89910` | 2465, 6000 | 2365, 6552 |
| 7 | AD-6c · Rewards (Offline) | `957:90009` | 2958, 6000 | 2838, 6552 |
| 8 | AD-6d · Surplus (Success) | `957:90140` | 3451, 6000 | 3311, 6552 |
| 9 | AD-6d · Surplus (Empty) | `957:90369` | 3944, 6000 | 3784, 6552 |
| 10 | AD-6d · Surplus (Offline) | `957:90476` | 4437, 6000 | 4257, 6552 |
| 11 | AD-6d2 · Pickup detail (Success) | `969:90826` | 7395, 6000 | 4730, 6552 |
| 12 | AD-6d2 · Pickup detail (Offline) | `969:90982` | 7888, 6000 | 5203, 6552 |
| title | Section / AD-6 · Manage, part 2 | `957:2422` | 0, 5900 | 0, 6472 |

### AD-6 sheets

| # | Frame | Id | Before x, y | After x, y |
|---|---|---|---|---|
| title | Section / AD-6 · Sheets (new) | `1052:7042` | –, – | 0, 7564 |
| 1 | AD-6a · Scope sheet | `973:4391` | 4930, 6000 | 0, 7644 |
| 2 | AD-6a · Rules sheet | `973:4501` | 5423, 6000 | 473, 7644 |
| 3 | AD-6c · Rules sheet | `973:4613` | 5916, 6000 | 946, 7644 |
| 4 | AD-6d · Scope sheet | `973:4732` | 8381, 6000 | 1419, 7644 |

### AD-7

| # | Frame | Id | Before x, y | After x, y |
|---|---|---|---|---|
| 1 | AD-7a · People (Success) | `1015:6573` | 0, 7200 | 0, 8736 |
| 2 | AD-7a · People (Empty) | `1015:6715` | 493, 7200 | 473, 8736 |
| 3 | AD-7a · People (Offline) | `1015:6857` | 986, 7200 | 946, 8736 |
| 4 | AD-7b · Staff list (Success) | `1015:6999` | 1479, 7200 | 1419, 8736 |
| 5 | AD-7b · Staff list (Offline) | `1015:7141` | 1972, 7200 | 1892, 8736 |
| 6 | AD-7b · Staff by role | `1015:7283` | 2465, 7200 | 2365, 8736 |
| 7 | AD-7b · Person — Ravi (Success) | `1015:7377` | 2958, 7200 | 2838, 8736 |
| 8 | AD-7b · Person — Ravi (Offline) | `1015:7565` | 3944, 7200 | 3311, 8736 |
| 9 | AD-7b · Person — Ravi · changed | `1015:7471` | 3451, 7200 | 3784, 8736 |
| 10 | AD-7c · Access request — Suresh | `1015:7659` | 4437, 7200 | 4257, 8736 |
| 11 | AD-7c · Access request (Offline) | `1015:7847` | 5423, 7200 | 4730, 8736 |
| 12 | AD-7c · Access request — Lakshmi | `1015:7753` | 4930, 7200 | 5203, 8736 |
| 13 | AD-7d · Audit log (Success) | `1015:7941` | 5916, 7200 | 5676, 8736 |
| 14 | AD-7d · Audit log (Empty) | `1015:8083` | 6409, 7200 | 6149, 8736 |
| 15 | AD-7d · Audit log (Offline) | `1015:8225` | 6902, 7200 | 6622, 8736 |
| 16 | AD-7d · All activity | `1015:8367` | 7395, 7200 | 7095, 8736 |
| title | Section / AD-7 · People, access and audit | `1015:6572` | 0, 7100 | 0, 8656 |

### AD-7 sheets

| # | Frame | Id | Before x, y | After x, y |
|---|---|---|---|---|
| title | Section / AD-7 · Sheets (new) | `1052:7043` | –, – | 0, 9748 |
| 1 | AD-7a · Scope sheet | `1021:5906` | 0, 8400 | 0, 9828 |
| 2 | AD-7b · Scope sheet | `1021:6063` | 493, 8400 | 473, 9828 |
| 3 | AD-7b · Rules sheet | `1021:6257` | 986, 8400 | 946, 9828 |
| 4 | AD-7b · Remove access sheet | `1021:6400` | 1479, 8400 | 1419, 9828 |
| 5 | AD-7d · Type sheet | `1021:6537` | 1972, 8400 | 1892, 9828 |
| 6 | AD-7d · Entry — Biryani report assigned | `1021:6692` | 2465, 8400 | 2365, 9828 |
| 7 | AD-7d · Entry — Sambar fix · salt cut | `1021:6831` | 2958, 8400 | 2838, 9828 |
| 8 | AD-7d · Entry — Pass desk offline | `1021:6970` | 3451, 8400 | 3311, 9828 |
| 9 | AD-7d · Entry — Waste logged · lunch | `1021:7109` | 3944, 8400 | 3784, 9828 |
| 10 | AD-7d · Entry — Curd 60 → 45 L · pending | `1021:7257` | 4437, 8400 | 4257, 9828 |
| 11 | AD-7d · Entry — Sambar 42 → 50 L | `1021:7408` | 4930, 8400 | 4730, 9828 |

## Checks

- **Positions:** all 331 planned targets match the live positions, and all 243 annotation offsets are unchanged. No two top-level nodes overlap (334 checked).
- **Diff vs `st88` (snapshot `st89`), from a full comparison of the stored signatures for every page-10 node:**
  - 327 nodes changed x and/or y only: x on 296, y on 323. No other field changed on any node: type, name, size, child counts, instances, texts, fills, modes, overflow, fixed children or child order.
  - 4 nodes are unchanged: AD-1a and its label, Moment note and chip stay at the origin.
  - 3 nodes were added: the sheet-row titles.
- **Links:** 214 before and after, identical including transitions. **Flow starts:** identical (Admin · Today, Issues, Insights, Manage).
- **Other pages:** unchanged, links included.
- **Screenshot:** `page10_overview.png` (the whole page at low zoom, 7488 × 10883 pt canvas).

## Changes since this record

- **2026-09-30, AD-5c2 confirm sheet:**
  - The new sheet "AD-5c2 · Open vote sheet" (`1062:6997`) takes AD-5 sheets slot 5 at 2365, 5460.
  - "AD-5c2 · Needs review sheet" moved 2365 → 2838 and "AD-5c2 · Look the same sheet" moved 2838 → 3311, each with its label, Moment note and chip at unchanged offsets.
  - The AD-5 sheets row now holds 8 sheets.
- **2026-09-30, AD-4 content pass:** the new frames "AD-4e · Meal drilldown (Success)" (`1085:7071`) and "(Offline)" (`1085:94067`) take AD-4 row slots 6 and 7 at 2838, 3276 and 3311, 3276, each with a label, Moment note and chip at the standard offsets. No other frame moved.
- **2026-10-01, overnight Stage 2:** "AD-5c2 · Proposals (Vote open)" (`1096:94066`) takes AD-5 slot 15 at 7095, 4368. AD-5d moved 7095 → 7568 with its annotations.
