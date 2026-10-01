# Page 10 audit · fill and density (overnight Stage 4, report only)

**Method:**
- The audit ran on snapshot `st107`, which equals the Stage 3 end state.
- It covers every 393 × 852 frame on page 10 (Admin), 99 in all: 60 screens, 16 frames named "(Empty)" and 23 sheets.
- `tools/filltool.js` measured fill: the lowest content item at rest ÷ 748, with the floor at y 561. `densitytool` (plugin data `mealloop/densitytool`) counted blocks and visible text layers, not counting the status bar, tab bar, Moment note or sample chip.
- Results are stored in plugin data `mealloop/st4_audit`.
- **Nothing was changed.**

**Rules:** rules 6 and 9–12 in `design_intent.md`:
- fill floor 75% (lowest item at y 561 or lower);
- at most 3 blocks;
- at most 12 texts;
- Empty states centred within 8 pt;
- sheets not held to the fill floor.

## Non-Empty screens that miss a rule

19 of the 60 screens miss at least one check. A failing value is in bold. A fill of 100% means the content runs past the tab bar (a scrolling screen).

| Screen | Id | Lowest item (y) | Fill | Blocks | Texts | Misses |
|---|---|---|---|---|---|---|
| AD-1a · Today — Overview | `811:21056` | Destination · Shortages (816) | 100% | **5** | **23** | blocks, texts |
| AD-1b · Today — Mess detail | `811:21211` | Page dots (770) | 100% | 3 | **19** | texts |
| AD-2a · Crowd — All messes | `824:21262` | Crowd strip (568) | 76% | 2 | **20** | texts |
| AD-2b · Crowd — Mess detail | `824:21454` | Freshness (488) | **65%** | **4** | 12 | fill, blocks |
| AD-2c · Shortage alerts | `824:21543` | Shortages (405) | **54%** | 1 | **18** | fill, texts |
| AD-3a · Issues — Overview | `849:564` | Group · Community (1035) | 100% | **4** | **23** | blocks, texts |
| AD-3b · Issue detail — Safety report | `849:1014` | Button · Add to log (1442) | 100% | 3 | **18** | texts |
| AD-3c · Issue detail — Dish feedback | `849:1299` | Button · Confirm action (784) | 100% | **5** | **15** | blocks, texts |
| AD-3d · Community moderation | `849:1500` | Field · Owner (821) | 100% | **4** | **23** | blocks, texts |
| AD-4d · Reports & exports | `877:2272` | Button · Export as PDF (680) | 91% | 3 | **24** | texts |
| AD-5-0 · Manage hub (Success) | `968:3292` | Bento (1025) | 100% | 2 | **15** | texts |
| AD-5-0 · Manage hub (Offline) | `969:90286` | Bento (882) | 100% | 2 | **14** | texts |
| AD-5b · Edit dish — Sambar | `912:2298` | Save (672) | 90% | 3 | **18** | texts |
| AD-5b · Edit dish (Offline) | `912:2697` | Save (732) | 98% | **4** | **19** | blocks, texts |
| AD-5c · Menu voting (Success) | `934:2558` | Row · New proposals (706) | 94% | 3 | **13** | texts |
| AD-6c · Rewards (Success) | `957:89699` | Coupons (718) | 96% | 2 | **26** | texts |
| AD-6c · Rewards (Offline) | `957:90009` | Coupons (722) | 97% | 3 | **26** | texts |
| AD-6d2 · Pickup detail (Success) | `969:90826` | Handover steps (747) | 100% | 3 | **20** | texts |
| AD-6d2 · Pickup detail (Offline) | `969:90982` | Handover steps (807) | 100% | **4** | **20** | blocks, texts |

**Totals:**
- Below the fill floor: 2 (AD-2b, AD-2c).
- Over 3 blocks: 8.
- Over 12 texts: 17.

**Blocks found on the screens that go over 3:**
- **AD-1a:** Filters, LiveDial, Mess strip, Destination · Crowd, Destination · Shortages.
- **AD-2b:** LiveDial, Crowd legend, Trend, Freshness.
- **AD-3a:** Category chips, SOS card, Feedback cards, Community group.
- **AD-3c:** ResultCard, ResultCard, Recheck chip, Sambar card, Confirm action.
- **AD-3d:** Duplicate stack, Merge button, Open issues, Owner field.
- **AD-5b Offline:** banner, Dish, Nutrition, Save.
- **AD-6d2 Offline:** banner, Offered dishes, Curd chip, Handover steps.

**Patterns:**
- The nine AD-1 to AD-3 Success screens were built before the content diet and the fill floor existed (2026-09-30). They were never put through a diet pass, which accounts for 9 of the 19 misses.
- Their new Offline states from Stage 3 all pass.
- The other misses are screens that the owner chose to keep at full spec in earlier stages (AD-4d, AD-5b, AD-6c coupons, AD-6d2 handover steps), plus the Manage hub, whose bento tiles carry a label and a number each.

## Frames named "(Empty)"

14 of the 16 are centred EmptyState cards and pass rule 10:

| Frame | Centring offset | Blocks | Texts |
|---|---|---|---|
| AD-1a Empty | 0 | 2 | 8 |
| AD-2a Empty | 0 | 1 | 3 |
| AD-2c Empty | 0 | 1 | 3 |
| AD-3a Empty | +1 | 1 | 4 |
| AD-3d Empty | 0 | 1 | 3 |
| AD-4a Empty | +1 | 1 | 6 |
| AD-5a Empty | +1 | 1 | 4 |
| AD-5c Empty | +1 | 1 | 3 |
| AD-5c2 Empty | +1 | 1 | 3 |
| AD-6a Empty | +1 | 1 | 4 |
| AD-6c Empty | +1 | 1 | 3 |
| AD-6d Empty | 0 | 1 | 4 |
| AD-7a Empty | 0 | 1 | 4 |
| AD-7d Empty | +1 | 1 | 3 |

Two frames are named Empty but are not message cards. Recorded for the owner; the brief limits the table to non-Empty screens.

| Frame | What it is | Lowest item | Blocks | Texts |
|---|---|---|---|---|
| AD-5-0 · Manage hub (Empty) `969:90191` | The hub with empty tiles (no EmptyState card) | 822 | 1 | **13** |
| AD-5b · Add dish (Empty) `912:2500` | A blank form | 630 | 3 | **17** |

## Sheets

None of the 23 sheets is held to the fill floor. All are within 12 texts: 4 to 7 above the scrim, and 0 blocks (a sheet is a single overlay).

## Every screen (for the report's before/after)

Fill is shown as % (lowest y).

| Screen | Fill | Blocks | Texts |
|---|---|---|---|
| AD-1a Offline | 85% (638) | 3 | 12 |
| AD-1b Offline | 80% (600) | 3 | 11 |
| AD-2a Offline | 76% (566) | 3 | 12 |
| AD-2b Offline | 75% (564) | 3 | 12 |
| AD-2c Offline | 76% (572) | 3 | 12 |
| AD-3a Offline | 77% (578) | 3 | 9 |
| AD-3b Offline | 85% (636) | 3 | 12 |
| AD-3c Offline | 81% (604) | 3 | 10 |
| AD-3d Offline | 80% (599) | 3 | 12 |
| AD-4a Success | 77% (577) | 2 | 12 |
| AD-4a Offline | 85% (637) | 3 | 12 |
| AD-4b | 83% (623) | 2 | 9 |
| AD-4c | 90% (674) | 1 | 12 |
| AD-4e Success | 77% (573) | 2 | 12 |
| AD-4e Offline | 80% (602) | 3 | 12 |
| AD-5a Success | 89% (668) | 3 | 10 |
| AD-5a Offline | 76% (572) | 2 | 8 |
| AD-5c Offline | 75% (562) | 2 | 9 |
| AD-5c2 Success | 84% (626) | 3 | 12 |
| AD-5c2 Offline | 83% (622) | 3 | 12 |
| AD-5c2 Vote open | 84% (626) | 3 | 12 |
| AD-5d | 84% (626) | 3 | 12 |
| AD-6a Success | 79% (592) | 2 | 10 |
| AD-6a Offline | 76% (568) | 2 | 7 |
| AD-6b | 78% (581) | 3 | 11 |
| AD-6d Success | 86% (646) | 3 | 10 |
| AD-6d Offline | 77% (574) | 2 | 9 |
| AD-7a Success | 81% (608) | 3 | 11 |
| AD-7a Offline | 78% (584) | 3 | 9 |
| AD-7b Staff list (Success) | 80% (601) | 2 | 12 |
| AD-7b Staff list (Offline) | 80% (597) | 2 | 12 |
| AD-7b Staff by role | 79% (593) | 1 | 7 |
| AD-7b Ravi (Success) | 90% (670) | 3 | 11 |
| AD-7b Ravi (Offline) | 80% (602) | 3 | 10 |
| AD-7b Ravi · changed | 93% (698) | 3 | 12 |
| AD-7c Suresh | 78% (581) | 3 | 11 |
| AD-7c Offline | 76% (566) | 3 | 10 |
| AD-7c Lakshmi | 78% (581) | 3 | 11 |
| AD-7d Success | 98% (734) | 3 | 12 |
| AD-7d Offline | 98% (730) | 3 | 12 |
| AD-7d All activity | 76% (572) | 1 | 11 |
| + the 19 screens in the first table | | | |

## Other findings while auditing (not fixed)

- **Rule 17:** AD-3d Success still shows "Waited 20 min for plates" (gap 168). Other "N min" texts on the page were checked and are not wait times:
  - the "updated N min ago" texts on AD-2a and AD-2b are data freshness;
  - AD-3b's "26 min" is the report's age.
- **Snapshot tool:** its nested counts (instances, texts, text hash) depend on how the tree is walked.
  - A cold walk with Figma's default `skipInvisibleInstanceChildren = true` skipped hidden layers inside the 12 new Stage 3 frames that a warm walk had counted.
  - From `st107` on, every snapshot is taken with `skipInvisibleInstanceChildren = false` (a full walk), noted in plugin data `mealloop/snap_method`.
  - The full walk also finds 3 existing Back links that sit inside hidden nav layers on the three Manage hub frames, so the link count reads 241 instead of 238. They are not new links.
