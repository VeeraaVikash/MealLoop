# Overnight run · morning report (2026-10-01)

Unattended run on `claude/mealloop-ios-design-e9n1n5`. Every commit is authored by VeeraaVikash <veeraavikashs21@gmail.com>, with no co-author line. All stages ran in order, and **no stage hit a STOP**.

The brief arrived three times, unchanged: once at the start, then mid-Stage 3 and at the start of Stage 6. It was treated as one run each time. Restarting would have duplicated the frames Stages 1–3 had already built and committed.

**Key renders:**
- `overnight/key_renders.png` is a contact sheet of 10 frames at scale 1.
- Per-stage folders: `overnight/stage1/`, `stage2/`, `stage3/` and `stage5/`.
- The full audit table is in `overnight/stage4_audit.md`.

## At a glance

| Stage | Status | Commit | Snapshots (start → end) | In one line |
|---|---|---|---|---|
| 0 · Preflight | **Done** | – | `st100` (baseline, = `st99`) | Branch, identity and HEAD (b6e3d3e, after f19f824) confirmed; files read. |
| 1 · Insights content pass | **Partly** | 19cb787 | `st101` → `st102` | Built as briefed, but the 12-text rule hid the three locked bento tiles, so AD-4a shows 2 of the 5 tiles. |
| 2 · Gap 152, Vote open | **Done** | 8051a78 | `st103` → `st104` | New Vote open frame; the confirm sheet SWAPs to it. |
| 3 · Empty and Offline for AD-1 to AD-3 | **Done** | 8e80420 | `st105` → `st106` | 14 frames (5 Empty, 9 Offline). Three needed a second fix attempt; none were undone. |
| 4 · Audit of page 10 | **Done** (report only) | afdb955 | `st107` | 19 of 60 screens miss a rule. Nothing fixed. |
| 5 · Grid | **Done** | 35855a7 | `st108` → `st109` | All 406 nodes checked and planned by id; 0 moves needed. |
| 6 · Morning report | **Done** | (this commit) | – | This file and `overnight/key_renders.png`. |

**Page 10 across the run:**
- Nodes: 346 → 406 (+60, which is 15 new frames × 4 nodes).
- Links: 223 → 238 in the default walk (241 in the full walk; see the snapshot-tool note).
- Flow starts: the approved 4 at every stage end (Admin · Today, Issues, Insights, Manage).
- Every other page: unchanged throughout.

## Stage 0 · Preflight

| Item | Status | Note |
|---|---|---|
| Read `design_intent.md`, `prototype_contract.md`, `prototype_gaps.md` | Done | |
| Branch | Done | `claude/mealloop-ios-design-e9n1n5` |
| Identity | Done | VeeraaVikash / veeraavikashs21@gmail.com |
| Latest commit f19f824 or later | Done | HEAD was b6e3d3e, which descends from f19f824. |
| Baseline snapshot | Done | `st100` equals `st99` on all 13 pages: page 10 has 346 nodes, 223 links and 4 flow starts. |

## Stage 1 · Insights content pass

Most of this brief had already been built on 2026-09-30 (b6e3d3e) from the owner's interactive answers. Stage 1 therefore reconciled that work with tonight's brief: the newer instruction won over the earlier answers, and the design rules won over the brief.

| Item | Status | What was done / why not |
|---|---|---|
| 1a · AD-4c delta chip "· all messes", same layer, 12 texts | Done | It reads "−13% since 8 Jul · all messes" (1 layer). The screen is at 12 texts. |
| 1a · Bar layers named with values | Done | "Bar · 742 kg" … "Bar · not measured (drawn at the median, 699 kg)". |
| 1b · Paired black hero, 642 kg (−38 kg) beside 4 shortages (flat) | Done | Each side carries its own arrow, sign and words, so the pair still reads if the two move in opposite directions. 4 matches AD-2c's 4 dishes at risk. |
| 1b · Five bento tiles (Turnout, Prep accuracy, Dishes locked; Trends, Reports linked) | **Partly** | All five exist, and the three locked tiles carry no link (gaps 155, 156, 157). The **12-text rule** (19 texts as briefed) hid the locked-tile row, so Success and Offline show Trends and Reports only (gap 163). |
| 1b · Look-closer row → AD-4e | Done | It moved inside the bento container so that Offline stays at 3 blocks. |
| 1b · Scope pills, centred Empty, Offline banner and saved values | Done | Offline: "Offline · saved at 2:05 PM", with 642 kg, −38 kg, 4 shortages, no change, and −13%. |
| 1c · AD-4e hero and paired measures | Done | "Lunch · Main Mess", with 18 kg left on plates beside 1 shortage. |
| 1c · Up to 4 ranked Pill-bar rows, each traced, never "caused by" | Done (3 rows) | The rows are Sambar 42 → 50 L (+19%), 712 of 860 (−17%, i.e. 83% of forecast) and 18 of 214 passes (8%). "Too salty · 6 reports" is a note, because it has no plan to compare against. Rice 7 kg was left out because it is an outcome, not a cause (gap 161). |
| 1c · Back → AD-4a | Done | Plain BACK. |
| 1d · Analytics rules in `design_intent.md` and the contract | Done | Rules 14–19. Turnout now uses the brief's three groups, replacing the earlier "Came / On leave / Didn't come". |

## Stage 2 · Gap 152 (Pongal vote open)

| Item | Status | Note |
|---|---|---|
| New frame "AD-5c2 · Proposals (Vote open)" `1096:94066` | Done | A clone of Success, at AD-5 slot 15, with a label, Moment note and chip. AD-5d moved one slot (x only). |
| Pongal's icon shows an open state | Done | Hourglass, lime. |
| Button disabled, "Vote open · ends Fri 2:18 PM", same layer, 12 texts | Done | `Style=Secondary, State=Disabled`. The screen is at 12 texts. |
| Confirm sheet's "Open vote" → this frame (SWAP, Dissolve 0.25) | Done | Logged in the contract as an extension of R1a. |
| Back → Menu voting | Done | A fixed link (Move out right 0.3), because BACK after a SWAP would land on the stale Success state (gap 164). |

## Stage 3 · Empty and Offline backfill for AD-1 to AD-3

| Item | Status | Note |
|---|---|---|
| Empty: AD-1a "No meals served yet", AD-2a "No crowd data yet", AD-2c "No shortages", AD-3a "No open issues", AD-3d "No student reports" | Done | Centred EmptyState cards with no action. Centring offsets are 0 to +1 pt. |
| Offline: AD-1a, 1b, 2a, 2b, 2c, 3a, 3b, 3c, 3d | Done | Each has a banner, saved values, editing disabled and the 75% fill floor, and all nine pass (75–85%). |
| AD-2a Offline: every mess "Old data" | Done | |
| AD-3b: disable Escalate and Close | Done (interpreted) | There is no Close button. Escalate and Add to log are disabled, and the close step list is hidden (gap 170). |
| Every Back returns where it came from | Done | Every new Back is a plain BACK. Forward links copy the Success links. Three Offline frames have no way in (gap 166). |
| Badge rule | Done | AD-1a Offline keeps Main and North on Stop and South on Hold. Only Annexe shows Offline. |
| Grid | Done | Each row runs Success, Empty, Offline per screen group. The Success frames slid right (x only). |

## Stage 4 · Report-only audit

Done. See `overnight/stage4_audit.md`.
- 99 frames were measured: 60 screens, 16 Empty and 23 sheets.
- **19 screens miss a rule:** 2 are below the fill floor (AD-2b 65%, AD-2c 54%), 8 are over 3 blocks and 17 are over 12 texts.
- Nine of the 19 are the AD-1 to AD-3 Success screens, which have never had a diet pass.
- Two frames are named Empty but are not message cards: Manage hub (Empty) and Add dish (Empty).

## Stage 5 · Grid

Done. Every top-level x/y was recorded first (`mealloop/st108_xy_811`), and a grid plan for all 406 nodes was built and applied by id (`mealloop/layout_plan_st108`).
- **0 moves were needed.**
- All 99 frames are on their slots, all 297 annotations are at their offsets and all 10 titles are at row y − 80. There are no stray nodes.
- `st109` vs `st108`: no changes on any page, with links and flow starts identical.
- Render: `overnight/stage5/page10_grid.png`.

## Decisions made without asking

1. **Stage 1 as a reconciliation:** the 2026-09-30 build was kept and changed to match tonight's brief, not rebuilt.
2. **Shortages:** "6 shortage alerts" became "4 shortages", flat, as the brief asked. AD-4e's "1 shortage alert" became "1 shortage" to keep the wording consistent.
3. **Prep accuracy locked as the brief asked**, which removed its link to AD-4b. AD-4b now has no way in (gap 162).
4. **Turnout groups:** the brief's three groups replace the owner's earlier "Came / On leave / Didn't come". The sample tile is 76 / 14 / 10, and its "84%" means 76 ÷ 90.
5. **AD-4a Offline:** the "Annexe missing / 546 kg" version was replaced by a device-offline banner with saved values, and 546 kg is retired.
6. **AD-4a Offline at 4 blocks:** fixed by moving the look-closer row into the bento container.
7. **Pongal's open icon** is the hourglass, in lime.
8. **AD-5c2 Vote open Back** is a fixed link to Menu voting, not BACK (gap 164).
9. **Empty-state icons:** fork.knife, person.3, checkmark.circle (×2) and text.bubble. AD-1a and AD-3a keep their headers above the card.
10. **Offline banners** are clones of the existing OfflineBanner instance. Saved times are set just before each frame's Moment: 1:38 PM (AD-1, AD-2a, AD-2b), 1:43 PM (AD-2c) and 1:48 PM (AD-3).
11. **AD-3b "Close"** was read as both write actions (gap 170).
12. **Fill-floor fixes, attempt 2:**
    - AD-2a and AD-2b Offline: the LiveDial card padding went 20 → 24 and 20 → 28. The dial itself can't be enlarged because its frame is fixed inside the component.
    - AD-2c Offline: the eyebrow became a 242 pt black hero with a 120 pt "4".
13. **Copy fixes on new frames:**
    - AD-2b Offline's trend time "1:40 PM" became "1:38 PM" to match the saved time.
    - Two Empty bodies were shortened to avoid a one-word last line.
    - AD-3d Offline's "Waited 20 min for plates" became "Waited long for plates" (rule 17).
14. **Stage 4 start check:**
    - `st107` showed 12 changes in nested count fields only. The investigation found no Figma writes between `st106` and `st107`, and a warm walk reproduced `st106` exactly.
    - This was ruled a measurement artefact, not a mismatch, so the run did not STOP.
    - From `st107` on, every snapshot uses a full walk (`skipInvisibleInstanceChildren = false`, noted in `mealloop/snap_method`).
15. **Stage 4 classification:** a frame with "sheet" in its name or a Scrim child counts as a sheet and is not held to fill. "(Empty)" in the name counts as Empty.
16. **The repeated brief** (twice) was treated as the same run.
17. **Rule 13 on the inherited styles** was logged (gap 171) rather than fixed during the report stage, because the fix is a component change that would also alter the Success screens.

## Brief vs rule conflicts

The rule won every time except rule 13, which was found too late and is logged instead (last row).

| Stage | The brief asked for | Rule | Outcome |
|---|---|---|---|
| 1 | AD-4a with a 4-text hero, 5 tiles × 2 texts, 2 pills, a nav title and subtitle, and a row: 19 texts | 12 texts | The nav subtitle (all 3 states), the locked-tile row (Success, Offline) and the Offline Reports number were hidden, not deleted (gap 163). |
| 1 | AD-4e Offline: Success content plus the banner (13 texts) | 12 texts | Missed by one layer, so the least important layer, the "Also reported" note, was hidden (gap 163). |
| 1 | AD-4a Offline: banner, hero, bento and row (4 blocks) | 3 blocks | The row moved inside the bento container. |
| 3 | Offline states with saved values for all of AD-1 to AD-3 | 12 texts | Layers were hidden on all nine Offline frames (gap 167). |
| 3 | AD-2c Offline with saved values | 75% fill floor | It gained a hero that Success lacks, which conflicts with "Offline is simpler than Success". The floor won (gap 169). |
| 3 | Copying AD-3d's student posts | Rule 17, no wait-time minutes | "Waited 20 min for plates" was reworded on the new frame. The Success screen still has it (gap 168, out of scope). |
| 3 | Offline states that reuse each Success screen's components | Rule 13, mono for numbers only | **Not followed, so logged instead (gap 171).** The AD-1 to AD-3 components and eyebrows set words in mono (LiveDial eyebrow, unit and line; crowd legend; Mono-light chips; section eyebrows). The new Offline frames inherit them, with new words in those layers ("SAVED", "Old data"). Fixing it means changing component text styles, which affects the Success screens too, so it was left for a component pass. It was found while writing this report. |

There were no conflicts with "one Pill variant". The Pill kinds used are the existing ChartBar Pill, Pill lime and Pill ghost. The Stage 1 and 2 frames have no mono words.

## Failing checks and fix attempts

| Stage | Check | Attempt 1 | Attempt 2 | Result |
|---|---|---|---|---|
| 1 | AD-4a Offline delta texts rendered black | node-level fill: fixed 1 of 2 | copied the resolved token paint: fixed both | Pass |
| 1 | AD-4a Offline at 4 blocks | row moved into the bento | – | Pass |
| 3 | AD-2a Offline fill | 558 (below 561) | 566 | Pass |
| 3 | AD-2b Offline fill | 548 | 564 | Pass |
| 3 | AD-2c Offline fill | 449 | 572 | Pass |

**Nothing was undone.** Script errors that rolled back atomically are not counted as fix attempts:
- Stage 2: the Back lookup;
- Stage 3: "Show reason" set on nested instances.

## New gaps

| # | Stage | Summary | Severity |
|---|---|---|---|
| 162 | 1 | AD-4b has no incoming link now that Prep accuracy is locked. | Medium |
| 163 | 1 | Layers hidden on AD-4a and AD-4e Offline for the 12-text rule. | Low |
| 164 | 2 | A second fixed Back, on Vote open (deliberate). | Info |
| 165 | 2 | Only the Vote open frame knows the vote is open. | Low |
| 166 | 3 | AD-2a, AD-2c and AD-3d Offline have no incoming link: their entry rows are hidden on AD-1a and AD-3a Offline. | Low |
| 167 | 3 | Layers hidden on the nine Offline frames for the 12-text rule. | Low |
| 168 | 3 | AD-3d Success still says "Waited 20 min for plates" (rule 17). | Low |
| 169 | 3 | AD-2c Offline has a hero that its Success screen lacks. | Info |
| 170 | 3 | AD-3b has no Close control for "disable Close" to act on. | Info |
| 171 | 6 | Rule 13: words are set in mono on AD-1 to AD-3 (Success and the new Offline frames), through the LiveDial, legend, chip and eyebrow styles. | Low |

**Updated:** 155 (turnout groups) and 157 (Prep accuracy now locked). **Resolved:** 152 (vote open) and 160 (AD-4 screens now at 12 texts or fewer).

## New sample numbers (all sample)

| Number | Where | Basis |
|---|---|---|
| 4 shortages last week, 4 the week before (flat) | AD-4a hero | The brief. It matches AD-2c's 4 dishes at risk. |
| Turnout 76 / 14 / 10 (said yes and came / said yes and didn't / no answer and came), and 84% = 76 ÷ 90 | AD-4a Turnout tile (locked, hidden) | Sample. |
| "Offline · saved at 2:05 PM" | AD-4a Offline, AD-4e Offline | Sample time. |
| 1 shortage | AD-4e hero | AD-2c's Paneer (at risk). |
| +19%, −17%, 8% | AD-4e cause bars | Derived: 42 → 50 L; 712 ÷ 860 = 83% (so −17%); 18 ÷ 214. |
| "Offline · saved at 1:38 PM / 1:43 PM / 1:48 PM" | Stage 3 Offline frames | Sample times, just before each frame's Moment. |
| "North Mess · busiest at 1:38 PM" | AD-2a Offline | North is the highest saved value (91%). |
| "4 messes · saved at 1:38 PM", "Saved at 1:38 PM" | AD-1a and AD-1b Offline | Sample. |
| "Busier than last Wednesday at 1:38 PM" | AD-2b Offline | The Success copy with the saved time. |

Every other number on the new frames is copied from its Success screen: 2,418, 712, 410, 4 dishes, 12 kg, 38 L, 140, 6 reports and so on.

## Components added

**None.** Everything reuses existing components: EmptyState, OfflineBanner (cloned instance), Button (Disabled state), CrowdBadge, MessBadge, LiveDial, ListRow, the ChartBar Pill kinds and MetaChip.

**Local overrides to note:**
- the AD-2c Offline hero number is 120 pt, a size override of ML/Hero Metric (52 pt);
- the LiveDial card padding is overridden on AD-2a Offline (24) and AD-2b Offline (28).

**New helper script:** `tools/ovhelp.js` (also stored as plugin data `mealloop/ovhelp`), the clone, annotate, banner, hide, disable and centre helpers used in Stage 3.

## Fill and density, before → after

**Stage 1** (before is the 2026-09-30 state):

| Screen | Fill | Blocks | Texts |
|---|---|---|---|
| AD-4a Success | 95% → **77%** (y 577) | 3 → **2** | 19 → **12** |
| AD-4a Empty | centred → centred (+1) | 1 → 1 | 7 → **6** |
| AD-4a Offline | 92% → **85%** (y 637) | 3 → 3 | 19 → **12** |
| AD-4c | 90% → 90% | 1 → 1 | 12 → 12 |
| AD-4e Success | 77% → 77% | 2 → 2 | 12 → 12 |
| AD-4e Offline | 85% → **80%** (y 602) | 3 → 3 | 13 → **12** |

**Stage 2:** the new Vote open frame is 84% / 3 blocks / 12 texts, the same as Proposals (Success). No existing screen changed.

**Stage 3:** all frames are new, and their Success screens are unchanged.

| Screen | Fill | Blocks | Texts |
|---|---|---|---|
| AD-1a Offline | 85% | 3 | 12 |
| AD-1b Offline | 80% | 3 | 11 |
| AD-2a Offline | 76% | 3 | 12 |
| AD-2b Offline | 75% | 3 | 12 |
| AD-2c Offline | 76% | 3 | 12 |
| AD-3a Offline | 77% | 3 | 9 |
| AD-3b Offline | 85% | 3 | 12 |
| AD-3c Offline | 81% | 3 | 10 |
| AD-3d Offline | 80% | 3 | 12 |
| 5 Empty frames | centred (0 to +1) | 1 to 2 | 3 to 8 |

**Whole page:** see `overnight/stage4_audit.md` (every screen, plus the 19 misses).

## Screens that still feel heavy or sparse

**Heavy:**
- **AD-1a, AD-3a and AD-3d Success** (23 texts, 4 to 5 blocks): the busiest screens in the app. AD-1a still has the four-chip filter row and two destination rows under the badges. AD-3a stacks chips, an SOS card, swipe cards and a Community group.
- **AD-6c Rewards** (Success and Offline, 26 texts): the coupon list carries a value and status on every row.
- **AD-4d Reports** (24 texts) and **AD-6d2 Pickup detail** (20): long lists kept at full spec.
- **AD-3b Success:** 18 texts on a long scroll (lowest item at y 1442).
- **AD-2a Success** (20 texts): every badge carries a level and an "N min ago".
- **AD-2c Offline:** the 242 pt black hero with a 120 pt "4" is the loudest object on the AD-2 row. It meets the floor but leaves the top half of the card empty.

**Sparse:**
- **AD-2c Success** (54%) and **AD-2b Success** (65%): the only screens below the floor.
- **AD-4a Success** (77%): with the locked tiles hidden, the bento is two tiles and the screen reads thinner than the 2026-09-30 version (see the before/after on the contact sheet).
- **AD-2b Offline** (75%, borderline): the banner, the dial line and the freshness pill all say "saved / old data at 1:38 PM", which is repetitive.
- **AD-5c Offline** (75%, y 562) and **AD-2b Offline** (y 564) sit just over the line.
- **AD-3a Offline** (77%, 9 texts): only the SOS card and one feedback card, which reads bare next to its Success screen.

**Small visual notes:**
- On AD-1a Offline the dial max "2,960" is set in small JetBrains Mono, so at scale 1 the comma reads like a full stop.
- The disabled secondary button on AD-3b Offline differs from the enabled one only by its grey label.

## Snapshot tool note

- The tool's nested counts (instances, texts and the text hash) depend on how the tree is walked. A cold walk with Figma's default `skipInvisibleInstanceChildren = true` can skip hidden layers inside instances that a warm walk counts.
- From `st107` on, every snapshot uses a full walk.
- The full walk also finds three existing Back links inside hidden nav layers on the Manage hub frames, so it reports 241 links instead of 238. These are not new links.
- The tool still signs top-level nodes only, so every nested change in this run was checked by render at scale 1.

## Files

- **Contract sections:** "AD-4 overnight reconciliation (Stage 1)", "AD-5c2 Proposals (Vote open) (Stage 2)" and "AD-1 to AD-3 Empty and Offline backfill (Stage 3)".
- **Gaps:** "Overnight run, Stage 1/2/3".
- **Layout record:** `admin_layout/positions.md`, "Changes since this record" (Stages 2, 3 and 5).
- **Renders:**
  - `overnight/key_renders.png`;
  - `overnight/stage1/`: AD-4a Success, Empty and Offline, AD-4e Success and Offline, and before copies;
  - `overnight/stage2/ad5c2_vote_open.png`;
  - `overnight/stage3/`: all 14 new frames;
  - `overnight/stage5/page10_grid.png`.
