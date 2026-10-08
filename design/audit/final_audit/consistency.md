# Consistency (FA-4) · Brand audit B5 (2026-10-08)

## Key numbers

Counted on visible text of every phone frame (a number counts once per frame; it must not be part of a longer number or time). Pages 10 and 09 in full; 04 for the student-side numbers. Small numbers (12, 38, 63) occur in many unrelated places, so their counts are not meaningful.

| Number | 10 Admin | 09 Staff | 04 Student | First use (example) | Verdict |
|---|---|---|---|---|---|
| 2,360 / 1,872 | 8 / 8 | – | – | AD-1a "Came in 1,872 of 2,360" | consistent |
| 860 / 712 | 13 / 15 | 4 / 5 | – | AD-1b "712 came in of 860 expected"; MS-C1 "expect about 860 · 712 in" | consistent |
| 713 | – | 6 | – | MS-H Door scanner count (one scan later, 1:41 PM) | consistent with the moment (1:41 vs 1:40) |
| 640 / 700, 520 / 800 | 3 / 3, 3 / 3 | – | – | AD-1e Messes | consistent |
| 196 / 188 / 214 | 8 / 2 / 15 | – | – | AD-6a "196 of 214 used", "188" at 1:58 PM | consistent (two moments) |
| 546, 642 | 1, 9 | – | – | AD-4a Overview | consistent |
| 742 / 718 / 680 / 642 | 7 / 6 / 6 / 9 | – | – | AD-4c weekly shortages | consistent |
| 1,204 / 388 / 76% | 4 / 4 / 6 | – | – | AD-5c "1,204 for · 388 against" | consistent |
| 2,370 / 5,000 / 63 | 8 / 11 / 9 | – | – | AD-6c "₹2,370 of ₹5,000 · 63 juices" | consistent |
| 18 kg | 5 | – | 13 | AD-7d waste entry; Waste · Last week | consistent |
| 50 L / 42 L / 4 L | 12 / 4 / 10 | 6 / 4 / 2 | – | Sambar 42 → 50 L; 4 L left over | consistent |
| 830 | 2 | – | – | AD-5a plate ring Lunch 830 kcal | consistent |
| 1,070 | – | – | 1 | You · Nutrients detail "1,070 kcal of 2,000" | consistent with nutrition_sample.md |
| 920 | 0 | 0 | 0 | — | Only a KcalGauge variant value; on no screen |
| 600 | 0 | 0 | 0 | — | On no screen: dropped from the list or never used |
| 11:30, 12:45, 12:50, 1:15, 1:32, 1:41, 1:48, 1:50, 2:20 | 17, 22, 14, 13, 19, 1, 13, 9, 6 | 10, 1, 0, 1, 0, 8, 4, 1, 2 | – | safety case timeline, cutoff, waste logged 2:20 PM | consistent |

No key number appears with two different values for the same thing.

## Moment notes per family

Every phone frame has a canvas "Moment: Wed …" note 868 pt below it. Coverage: 09 77 / 77; 10 160 / 163 (AD-0 Sign in, Verifying, Confirm profile have none, and need none: no data on screen); 07 uses one moment per gallery group (17).

| Family | Rule | Frames off the rule | Verdict |
|---|---|---|---|
| Today (AD-1) | 1:40 PM | AD-1b Mess detail (and Offline, North) 1:41 PM; AD-1d Curd override ×3 11:18 AM, ×1 1:41 PM | The 1:41 drill-downs follow a tap one minute later; the Curd override is a decision taken before the 11:30 cutoff. Both follow the story: accepted, not changed |
| Insights (AD-4a–e) | 2:35 PM | 0 | pass |

## Sample chips and labels

| Check | 09 | 10 | 07 |
|---|---|---|---|
| Frames with a "Sample note" chip on the canvas | 77 / 77 | 160 / 163 (AD-0 ×3 show no data) | 18 group chips |
| Frames with a canvas label equal to the frame name | 77 / 77 | 163 / 163 | per gallery group |

## Flow starts and duplicate names

- Flow starts: exactly 7 (Student · Sign in; Mess staff · Sign in; Admin · Sign in, Today, Issues, Insights, Manage). No stray start.
- Duplicate frame names: 0 on 04, 05, 07, 09 and 10.

## Student parity (04 source, 05 Dark twin, 07 prototype)

| Pair | Frames compared | Differences | Verdict |
|---|---|---|---|
| 04 vs 05 | 300 / 300 (same names) | 16 onboarding frames: 05 shows "DARK RIBBON RENDER NEEDED" (the Dark-mode art placeholder, an owner item) | text parity holds |
| 04 vs 07 | 246 shared names | 50 differ only in text order (07 frames carry hit areas and full-scroll order); **1 real: 07 "Home · After last meal" has a Today's plate card (1,070) that 04 / 05 do not**; 07 also has "Home · After last meal · Trackers empty" and the 15 gallery cards, which 04 does not | drift (see below) |
| 04 / 05 vs 07, styling | — | **Mono words**: 04 1,165 and 05 1,229, 07 8 (G10 fixed 07 only) | drift |

**Decisions:**
1. The Home tracker card exists only on 07 (TodaysPlateCard and SpendingSummaryCard have 2 instances each, on 07 only). "Correct from the Light source" would delete them from the prototype, which is a visible removal. Not done; OWNER: add them to 04 / 05, or remove from 07.
2. The mono drift runs the other way (07 is right, the source is wrong). Fixing it on 04 / 05 changes fonts on 203 / 218 frames: VISIBLE, ranked first in B9.
