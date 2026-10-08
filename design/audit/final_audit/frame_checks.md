# Per-frame checks (FA-1) · Brand audit B2 (2026-10-08)

Tools: `fa16` (wrapping `fa1`) for fill, clearance, text size, lime, horizontal overflow and contrast; `mw10` for mono words; `tgt14` for targets; `trunc13` for truncation. Scope: every 393 pt frame on 04, 05, 07, 09 and 10 (10 with its sections), 1,115 frames; nothing named "Deprecated"; not 99 or 11. Snapshot st237 = st236 (B is report only). Raw rows: shared plugin data `mealloop/b2_<page>_<offset>`.

## Summary

| Check | 04 | 05 | 07 | 09 | 10 |
|---|---|---|---|---|---|
| Frames | 300 | 300 | 262 | 77 | 176 |
| Fill under 75% (not exempt) | 14 | 14 | 14 | 10 (task frames, see note) | 0 |
| Fill under 75%, exempt (sheets, rule 9a / 9b) | 30 | 30 | 30 | 0 | 13 |
| Last item under 20 pt above the bar (scrolling and full-scroll frames) | 38 (full-scroll copies) | 38 | 0 | 0 | 0 |
| Text under 12 pt (tab labels excepted) | 0 | 0 | 0 | 0 | 0 (AD-4f report thumbnails scale the A4 page: accepted exception) |
| Mono words (mw10) | **1,165 in 203 frames** | **1,229 in 218 frames** | 8 (kept units) | 9 (placeholder) | 0 |
| Frames with 4+ lime elements | 0 | 0 | 0 | 0 | 3 (AD-4f report thumbnails: accepted) |
| Lime text on a light surface | 0 | 0 | 0 | 0 | 0 |
| Horizontal overflow (unclipped) | 3 | 3 | 2 | 0 | 0 |
| Targets under 44 pt (staff 56) | – (no links) | – | 0 | 3 (status-bar time skips: accepted) | 0 |
| Real truncation | 0 / 547 | 0 / 547 | 0 / 401 | 0 | 0 / 4 |
| Contrast under 4.5:1 (3:1 large) | 10 frames (lock-screen mock only) | 13 (adds HoldToConfirm ×2, Entry · Under review) | 10 (lock-screen mock only) | 0 | **6 (AD-6b ×5, AD-3a Offline)** |

## 04 Student Light (failing frames)

| Frame | Fails |
|---|---|
| Entry · Offline | fill 42% (offline one-liner: check against rule 9a) |
| Pass · Available | fill 61% (gap 330) |
| Feedback · Pick meal / Pick dish / Recheck | fill 73% / 74% / 71% (gap 330) |
| Rewards history | fill 72% (gap 330) |
| Help | fill 60% (gap 330) |
| Recheck · Inbox | fill 70% (gap 330) |
| You · Weekly view | fill 29% (new: not in gap 330) |
| Settings · Daily goal, · option selected | fill 58% (gap 330) |
| Search · Menu result | fill 56% (gap 330) |
| Search · Offline | fill 66% (offline one-liner: check rule 9a) |
| About MealLoop | fill 58% (gap 330) |
| Waste · Partial, Waste · Partial (full scroll) | horizontal overflow 2 |
| Waste · How this is measured | horizontal overflow 3 |
| 38 "(full scroll)" copies (Home ×8, Answer Yes / No / Not sure ×13, Meals · Meal detail, Meals · Loading, Intent ×3, Report ×2, Community ×2, Waste ×6, Rewards · Offline, Settings · System off) | last card 16 pt above the tab bar (11–19 on 4; −9 / −12 on Home · Morning, Answer Yes · Near meal, Answer Not sure · Saved). These are documentation copies of the scroll end; the 07 prototype frames pass. |
| Lock screen previews, Recheck · Lock ×6, Lock · Stack, Lock · Fix check ×2 | contrast 3.02–3.05 on the iOS "MealLoop" app label (system mock, accepted) |
| 203 frames | mono words (the brand rule) — see A3 |

## 05 Student Dark

Same as 04, plus three Dark-only contrast failures:

| Frame | Fails |
|---|---|
| Pass · Confirm (holding) | "Hold to use" 1.04:1 (black on #161616 past the lime fill) |
| Pass · Confirm (failed) | "Hold to use" 1.04:1 (no fill behind it) |
| Entry · Under review | "Request sent" tag 2.26:1 |

## 07 Prototype (failing frames)

| Frame | Fails |
|---|---|
| Recheck · Inbox; Pass · Available; Feedback · Pick meal / Pick dish / Recheck; Rewards history; Help; Search · Menu result; About MealLoop; Settings · Daily goal ×2 | fill 56–74% (gap 330, open) |
| Entry · Offline; Search · Offline | fill 42% / 66% (offline one-liners; rule 9a candidates) |
| You · Weekly view | fill 29% (new) |
| Waste · Partial; Waste · How this is measured | horizontal overflow 2 / 3 |
| Lock screen previews, Recheck · Lock ×6, Lock · Stack, Lock · Fix check ×2 | iOS lock-screen label contrast (accepted) |

Community · Archived (69%) is covered by rule 9a (one message), as in Final-3.

## 09 Mess staff (failing frames)

| Frame | Fails |
|---|---|
| MS-A1 Scan; MS-A7 Can't scan?; MS-B2 Check ID; MS-C3 Running out?; MS-C4 Add a batch; MS-C5 Record waste — 2 Plate waste; MS-E2 Alert detail; MS-F1 Confirm hold — 1 Stop; MS-F2 — 2 Check; MS-G3 Waiting to send | fill 69–73% measured to the frame bottom − 34. These task frames end in a fixed bottom action, which is the rule's reference (Final-3 H6); against it they read 77–88%. Not a new failure; listed for completeness. |

0 targets under 56 pt except the 3 logged status-bar time skips; 0 contrast failures.

## 10 Admin (failing frames)

| Frame | Fails |
|---|---|
| AD-6b · Pass exception (Open, Declining, Sending, Approved, Failed) | contrast 2.81:1 ×3 each: the "Missed" tag text is ink-secondary (#5C5C58) on the black ticket |
| AD-3a · Issues — Community (Offline) | contrast 2.81:1: "Not now" (secondary action) is ink-secondary on the black hero |
| AD-4f Weekly report, Export sheet, Exported, Report viewer pages 1–9 | report thumbnails: text renders at 5.5–10.7 pt and the document lime shows 7–8 times (accepted: the A4 document is shown scaled) |

AD-2b (65%, rule 9b) and AD-8c No results (rule 9a) are exempt.
