# Attendance: inventory before the redesign (read-only, 2026-09-30)

No Figma changes were made.

## Frames

| Page | Frame | Role |
|---|---|---|
| 04 / 05 / 07 | **Entry history** (O7 "Attendance history") | The screen the **You · ATTENDANCE** tile opens. Inline title "Attendance", tab bar = You. |
| 04 / 05 / 07 | **Entry · History** (E7) | Detailed list, opened by tapping the HeroNumber on Entry history. Inline title "Attendance", tab bar = **Home** (wrong: it is reached from You). |
| 04 / 05 / 07 | Entry · Under review | A copy of E7 in which Tue dinner shows "Request sent … Seen". Back is fixed to Entry history. |
| 04 / 05 / 07 | Entry · Discrepancy, — sending, — failed | The "Report a problem" flow: a full screen (not a sheet) with "What's wrong?" options: I ate, but it says not scanned / Wrong meal recorded / Other. There is also an optional note and "Send request". Its meal is hard-coded to "Dinner · Tue 13 Aug". |

Pages 04 and 05 have **no "(full scroll)" copies** of these frames.

## Entry history (page 07, `221:64717`)

The content, top to bottom:
- **HeroNumber**: "AUGUST SO FAR · 41 meals · Scanned at the door". Tapping it opens E7.
- **Three days**, each a date label plus MetaChips:
  - Breakfast / Lunch / Dinner with times.
  - A missed meal is an On-light chip, e.g. "Breakfast · not scanned".
  - The chips are **not tappable**.
- **Button (Text) "Report a problem"** at the bottom, which opens Entry · Discrepancy.

## Entry · History (E7, page 07, `221:63036`)

The content, top to bottom:
- **SegmentedControl**: This week / This month.
- **Two days** as grouped rows: meal name, time, StatusTag "Scanned" and a chevron.
- **Tue 13 Aug dinner:** the plain text "Not scanned" with a chevron.
- **None of the row chevrons are linked.** There are **dead chevrons** on all 5 rows, including the "Not scanned" one.

## Findings that affect the build

1. **There are two attendance screens with overlapping jobs.** The one from You is a summary, and the drill-in is a detailed list. They also disagree on the data. For example, Wed 14 breakfast is "not scanned" on Entry history but "Scanned 8:02 AM" on E7, and Tue 13 lunch is 1:10 PM vs 12:31 PM.
2. **The data is not consistent.** "41 meals, August so far" cannot happen with the missed meals shown: 14 days × 3 = 42 possible, with at least 2 missed.
3. **Dead affordances:** E7 has 5 unlinked chevrons, and "Not scanned" is a plain label.
4. **Wrong tab:** E7 highlights **Home** although it sits under You.
5. **"Report a problem" floats at the bottom** of Entry history and always opens the same hard-coded meal (Tue dinner).
6. **Scroll:** neither screen scrolls (`overflow NONE`), but neither overflows today, because each shows only 2–3 days.
   - Entry history: the content ends at 741, with the last item "Report a problem" ending at 617.
   - Entry · History: the content ends at 620.
   - A week-grouped month view **will** overflow, so the redesign must be built with the **R9 + R9c inline-title scroll pattern from the start**, the same as Waste and Spending.
7. **Links today (page 07):**
   - You · Tile / ATTENDANCE → Entry history (Move in)
   - Entry history · HeroNumber → Entry · History (Move in)
   - Entry history · Report a problem → Entry · Discrepancy (Move in)
   - Entry · Under review · Back → Entry history (Move out)
   - Discrepancy → sending (the failed state is gallery-only)
