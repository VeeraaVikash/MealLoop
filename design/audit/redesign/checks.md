# STUDENT-REDESIGN · P14 checks (2026-10-15)

Scope: page 04 Student Light (285 phone frames after this stage), page 07 Prototype & QA (296), Guardian 13 (30), Warden 14 (18), Gate 15 (23). Page 05 is stale (not checked). Tools: `fa16` (per-frame: overflow, detached, raw paints, small text, lime text on light, contrast in the text's own colour mode), `fa16near` (fa16 with the contrast cut-off raised by 1.5 to list the lowest passing pairs), `mw10` (mono words, the authority), `tgt14` (44 pt targets), `trunc13` (real truncation), `reach8` (P13), plus one-off scans for lime kinds, backdrop, banned words, key facts and 04 / 07 parity.

## Results

| Check | Before fixes | After | Fixes made in P14 |
|---|---|---|---|
| Contrast (4.5:1; 3:1 for 18 pt+ or 14 pt+ bold) | 07: 27 pairs on 11 frames; 15: 11 pairs on 2 frames | 0 real failures (1 tool artefact, below) | "Open Settings" on SOS · Camera denied was cream on cream in Dark mode (1:1): label bound to `on-lime` (#111111). Lock-screen notification headers ("MealLoop", "now", "12m ago") were #3C3C43 at 70% (3.02:1): opacity 100% (52 layers, 20 frames, 04 and 07). Gate GA-6 Back late / Already exited had lost their black fill to the P10 backdrop pass (white text on canvas, 1.17:1): fill `hero-bg` restored, backdrop removed. |
| Mono words (mono only for numbers) | 07: 6; 04: 423 (old instance overrides: CommentRow, TimelineStep, IssueCard, BentoTile, MetricHero, MealRow) | 0 on 04, 07, 13, 14, 15 and page 03 | `mw10` apply: words moved to the matching sans style. |
| Lime elements (≤ 3 kinds beyond the backdrop; logo / AppIcon exempt; repeats count once) | 07: 0 frames over | 0 | — (SOS camera: 4 viewfinder brackets = one kind). Distribution on 07: 0 kinds 122 frames, 1: 114, 2: 34, 3: 24. |
| Lime text on a light surface | 0 | 0 | — |
| OrbitBackdrop present | 07: 88 frames without; 04: 85 | Without, by rule: OS lock-screen mockups (Lock · …, Recheck · Lock / Inbox, Lock screen previews), Gallery frames, SOS camera (dark); Guardian Messages board; Gate Scan and the GA-6 full-colour results | `srlight` on 53 frames (07) and 64 (04): Pass, Crowd, Entry discrepancy, Dish detail, Search, Spending sheets, Rewards history, settings legacy, Request correction, Sign out, Recheck · Home. Old "Meal wash" / "Header backdrop" layers replaced. |
| 44 pt targets | 07: 33 small (21 text links, 8 segments, 2 Undo, 1 Service card 3 pt tall, 1 SOS proof link); 13 / 14 / 15: 0 | 0 on all | 18 text links in sheets wrapped in a 44 pt "… hit area" frame (the same wrap on 04 so layouts match); 14 transparent 44 pt hit areas over controls inside instances (segments, Undo, SOS Review link, Onboarding tagline link); the More dishes "Service" card had collapsed to 3 pt (FILL in a hugging sheet) → hug, min 44. |
| Truncation (real, by re-layout) | 0 (07 173 checked, 04 187) | 0 | — |
| Horizontal overflow | 0 | 0 | — (P12 OutingPass Student column fix held) |
| Text under 12 pt | 0 | 0 | — |
| Raw paints (unbound hex) | 07: 14 Gallery helper frames only | same | Gallery frames are presenter tools, not screens. |
| Detached instances | 0 | 0 | — |
| 04 / 07 parity | 282 shared frames; text and height identical | 282 / 282 identical | Stale 04 copies archived (decision 72). Only on 04: Report · My reports / Report · Fixed / Settings · System off "(full scroll)" references. Only on 07: 14 Gallery frames. |
| Banned words (calories, nutrition, kcal, plate tracker, Waste screen, "How this is measured", "or" between dishes) | "Nutrition" settings row behind the Request correction / Correction / Sign out sheets (04, 07) and on the old 04 You full-scroll frames; Search · Typing "110 kcal" (fixed in P13) | 0 | Rows hidden; old full-scroll You frames archived. Every "or" left is plain copy (e.g. "Food smells or tastes off", "Class or exam"), never between two dishes. The onboarding tagline "Hostel meals, without the waste." stays (it is not the Waste screen; NEEDS REVIEW). |

## Lowest 15 contrast pairs (07, 13, 14, 15; after fixes)

| # | Page · frame | Text | Size | Ratio | Needs |
|---|---|---|---|---|---|
| 1 | 13 · G-2 · Request · Approved | "Approved" | 17 | 1.00 (tool) | 3 |
| 2 | 07 · Community · Fixed | "Fixed" (segment) | 15 | 4.88 | 4.5 |
| 3 | 07 · Meals · Wed 14 · Lunch | "Breakfast" (segment) | 15 | 5.11 | 4.5 |
| 4 | 07 · Meals · Wed 14 · Lunch | "Snacks" | 15 | 5.11 | 4.5 |
| 5 | 07 · Meals · Wed 14 · Lunch | "Dinner" | 15 | 5.11 | 4.5 |
| 6 | 07 · Meals · Wed 14 · Dinner | "Lunch" | 15 | 5.11 | 4.5 |
| 7 | 07 · New outing · Offline | "S" (week strip) | 13 | 5.11 | 4.5 |
| 8 | 07 · Feedback · What's wrong · Sambar | "A bit" (severity) | 17 | 5.11 | 4.5 |
| 9 | 07 · Feedback · What's wrong · Sambar | "Very" | 17 | 5.11 | 4.5 |
| 10 | 07 · Recheck · Lock · No answer (expanded) | "MealLoop" | 13 | 5.30 | 4.5 |
| 11 | 07 · Recheck · Lock · No answer (expanded) | "now" | 13 | 5.30 | 4.5 |
| 12 | 07 · Recheck · Lock · No answer | "MealLoop" | 13 | 5.39 | 4.5 |
| 13 | 07 · Recheck · Lock · No answer | "now" | 13 | 5.39 | 4.5 |
| 14 | 07 · Lock screen previews | "12m ago" | 13 | 5.39 | 4.5 |
| 15 | 07 · Lock screen previews | "1h ago" | 13 | 5.39 | 4.5 |

Row 1 is a tool artefact: the checker composites only the label's ancestors (the Track, `hero-bg`), but the label sits on its sibling "Progress (lime)" rectangle, so the real pair is ink on lime, 15.1:1.

## Key facts (visible text on 04 / 07)

| Fact | Hits 07 | Hits 04 | Notes |
|---|---|---|---|
| Wed 14 Aug / Wednesday 14 Aug | 46 | 50 | Sample day everywhere; "Home · No Special pass" is Thursday 15 Aug on purpose. |
| 120 pts | 30 | 36 | Juice 50 pts, Ice cream 80, Biryani coupon 200 ("80 more"); ticket "50 pts used · 70 left". |
| ••0238 | 26 | 28 | No "·0238" left on 04, 07, 13, 14, 15 (staff page 09 unchanged: MS-A2 still "Aarav ·0238"). Request correction keeps the full register number. |
| Main Mess | 129 | 132 | No "North mess" or "Annexe" on student pages. |
| Express Avenue Mall | 28 | 28 | Outing destination. |
| 7F3K | 7 | 7 | Outing pass code (Juice ticket 7A3F is separate). |
| Sat 17 Aug | 16 | 20 | Outing day; every weekday / date pair matches 2024 (P12 check). |

## Reachability (from P13)

07: 147 of 296 frames reached from Student · Sign in, 0 dead ends; 13: 26 / 30; 14: 15 / 18; 15: 16 / 23; 10: 107 / 187. Unreached frames are states shown by control and the legacy frames listed in DEMO.md.
