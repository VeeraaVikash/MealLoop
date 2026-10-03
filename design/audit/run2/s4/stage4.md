# Stage 4 · AD-4c Waste (run 2)

Start `st143` (= `st142`), end `st144`. Tool: `tools/wst4.js` (`mealloop/wst4`, built on `ins3a`). Archive: the old AD-4c Trends is on 99 Archive, slot 41 (`1378:2`, x 29393), links stripped, no flow start.

## Frames (page 10, AD-4 row, y 3276)

| Frame | Id | x | Notes |
|---|---|---|---|
| AD-4c · Insights — Waste (Success) | 877:2037 | 1892 | Rebuilt in place, so inbound links are kept. |
| AD-4c · Insights — Waste (Empty) | 1380:11667 | 5203 | Clone of the Meal Empty pattern. "No waste logged yet" is centred. |
| AD-4c · Insights — Waste (Offline) | 1380:11505 | 5676 | Success plus the banner "Offline · saved 2:32 PM". |

Every frame has a label, a Moment note "Wed 2:35 PM" and the "All data is sample" chip.

## Success layout

- **Tab-root header:** "Insights", subtitle "Since 8 Jul · all messes", pills Overview / Meal / **Waste** (selected).
- **One black hero:**
  - eyebrow "Change since 8 Jul";
  - **−13%** "waste" │ **−1** "shortages a week" (ML/Hero Metric, mono);
  - a hairline, then the mirrored chart and captions "Dashed: not measured" and "↑ waste · ↓ shortages".
- **Mirrored chart (ChartBar at screen level, pill width 26, columns 45.5 pt):**

| Week | 8 Jul | 15 Jul | 22 Jul | 29 Jul | 5 Aug | 12 Aug |
|---|---|---|---|---|---|---|
| Waste kg (sample) | 742 | 718 | — | 680 | 642 | — |
| Up pill (pt, ×110/742) | 110.00 | 106.44 | ghost 103.63 (median 699) | 100.81 | 95.18 lime | ghost 103.63 |
| Shortages (sample) | 3 | 3 | — | 2 | 2 | — |
| Down pill (pt, ×18) | 54 | 54 | ghost 45 (median 2.5) | 36 | 36 lime outline | ghost 45 |

- **Pill styles:**
  - waste pills are `Kind=Pill` (white), with 5 Aug as `Kind=Pill lime`;
  - shortage pills are `Kind=Pill` with the fill removed and a 1.5 pt `on-hero` outline (hollow white), with 5 Aug outlined in lime;
  - ghosts are `Kind=Pill ghost` (dashed).
- Every bar is within 0.005 pt of its value. The scales start from zero.
- **Values** are in ML/Mono Footnote (13): waste above its pill, shortages below. **Week labels** sit under the chart (ML/Footnote, mono numbers).
- **Arithmetic:** (642 − 742) / 742 = −13.5% → −13%. Shortages 3 → 2 = −1 a week.
- **White row** "Look closer · Wed lunch" / "Main Mess · 3 possible causes" → AD-4e Meal (Move in 0.3).
- **Fill and clearance:** content ends at 750 at rest. The scroll range is 22, and the last item is at 728 at max scroll (20 pt above the tab bar). On Offline: range 82, last item 728.
- **Lime:** only the 5 Aug pills (one data highlight).

## Links (page 10: 365 → 371, +14 −8)

- **Success:**
  - Overview → AD-4a Overview (Dissolve 0.25);
  - Meal → AD-4e Meal;
  - Look closer → AD-4e Meal.
- **Empty:**
  - Overview → Overview Empty;
  - Meal → Meal Empty.
- **Offline:**
  - Overview → Overview Offline;
  - Meal → Meal Offline;
  - Look closer → Meal Offline.
- **State for state (retargeted):**
  - Overview Empty and Meal Empty: Waste → **AD-4c Empty**.
  - Overview Offline (Waste pill, Trends tile, "Waste and shortages · 4 weeks" row) and Meal Offline (Waste pill) → **AD-4c Offline**.
- **Flow starts:** the approved four are unchanged (Admin · Today / Issues / Insights / Manage).

## Decisions and conflicts (logged)

- **Brief text vs typography:** the brief's "up waste · down shortages" is set as "↑ waste · ↓ shortages", and "-13%" / "-1" use the typographic minus (−), as elsewhere in Insights.
- **Filter chips:** the old By week / By month / By year chips were dropped, because the brief's layout has no period control.
- **Offline banner:** "saved 2:32 PM" follows the run default. Overview Offline still reads "saved 1:38 PM" (pre-existing; logged as gap 291).
- **New sample numbers:** −13%, −1 a week, and the medians 699 kg and 2.5 (ghost heights only, not printed). Waste 742/718/680/642 and shortages 3/3/2/2 come from the brief.
