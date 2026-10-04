# Final-fix quick check · F8 (report only, 2026-10-04)

All data is sample. Nothing was changed in this stage: the start snapshot st186 equals st185 on all 14 pages.

**Scope:** every frame changed or created in this run, which means all 54 staff frames (page 09) and all 163 admin frames (page 10). F4, F6 and F7 touched every one of them. On page 07 only links changed (F7); the visual checks do not apply, and the link checks are in wiring_manifest.md and reachability.md.

**Tools:**
- `mealloop/qc8`, a wrapper over `tools/fa1.js`, measures fill, clearance, small text, mono words, overflow and dead chevrons, and adds wash, lime elements, lime text on light, and missing Back;
- `tools/read6.js` in report mode (`apply: false`) checks the readability standard.

## Summary

| Check | 09 Staff (54) | 10 Admin (163) |
|---|---|---|
| Fill floor < 75% (excl. sheets, Empty, sign-in trio, Loading, End shift confirms) | 20 | 2 (AD-2b 65%, AD-8c No results 57%) |
| Last item < 20 pt above the bar / footer at max scroll | 1 (MS-D1, 16 pt) | 0 |
| Text under 12 pt | 0 | 0 |
| Mono numbers / times under 13 pt | 0 | 0 |
| Grey text lighter than #6B6B66 on white or the wash | 0 | 0 |
| Faded (opacity) essential text | 0 | 0 |
| Truncated text | 0 | 0 |
| Tappables under 44 pt (pills, chips, dots excepted by the check) | 0 | 10 (see fix 5) |
| Frames with words in mono | 19 | 28 (sheets not counted) |
| Lime: frames with ≥ 4 lime elements (by element, not by kind) | 5 | 7 (sheets not counted) |
| Lime text on a light background | 0 | 0 |
| Frames without the wash | 0 | 0 |
| Horizontal overflow (unclipped) | 0 | 0 |
| Drill-ins without a working Back / Close | 0 | 0 |
| Dead chevrons (on the frame itself) | 0 | 0 |

**Not counted:**
- **Sheets.** The tool also measures the screen drawn behind a sheet's scrim. On MS-E2 and MS-H3 that gave "8 dead chevrons", and on 17 admin sheets "mono / lime / 1 dead chevron". These come from the background copy, which cannot be tapped under the scrim, so they are not defects of the sheet. Fixing the tool to skip under-scrim layers is listed as fix 9.
- **Destination-absent controls.** These are not dead chevrons: the controls exist and are listed in wiring_manifest.md, and the screens to build are listed in finalfix_report.md.

## Detail

**09: fill < 75%**
- MS-A1 71%, A2 / A3 / A4 48%, A5 56%;
- MS-B2 46%, B2b 53%, B3 65%, B3b / B4 / B5 60%, B6 56%;
- MS-C1 60%, C4 71%, C4a 52%, C4b 56%;
- MS-D2 64%, D3 64%, D3a 42%, D4 56%.

All are older result screens, and none was created in this run. F6 grew none of them, because the readability standard only raises sizes.

**09: mono words:**
- MS-B1 (pass ID "RA24…");
- MS-C1 "BEFORE SERVICE";
- MS-C2 eyebrows, "students", "replies at cutoff", "Updated";
- MS-C3 "Updated";
- MS-C4 rule lines;
- MS-C4a / C4b "KITCHEN SEES";
- MS-C5 eyebrows, "dishes", "adjusted today";
- MS-D1 eyebrows and notes;
- MS-D1a "LOGGED";
- MS-D2 "Updated", "reports";
- MS-D3 "COMPLAINT", "reports";
- MS-D3a quote line;
- MS-D4 "Read-only" and the audit rows' names;
- MS-0 Confirm profile "FROM SRM";
- MS-G4–G7 "dishes";
- MS-H5 tile labels.

**09: lime ≥ 4 elements:** MS-D4 4, MS-F3 4, MS-F4 5, MS-H1 4, MS-H5 4.

**10: mono words:**
- AD-2b S/O eyebrow, seats, "came in", crowd scale;
- AD-3c S/O and AD-3d S/O eyebrows;
- AD-3a Community S/O status words and "UPDATED 5H AGO";
- AD-5c S/O and AD-5d "for · against";
- AD-6a S/O pass eyebrows and "used / expired";
- AD-6c S/O and AD-6c3 "PILOT BUDGET · AUGUST", "juices · ice cream";
- AD-6d Accepted, Offline, Offered, Collected and Late: "dishes";
- AD-6d2 S/O step labels;
- AD-7a S/O role legend;
- AD-0 Confirm profile "FROM SRM";
- AD-4f ×2 tile labels;
- AD-8b "Tue 8 PM".

**10: lime ≥ 4 elements:** AD-4a Overview S/O 4, AD-6c Rewards S/O 4, AD-6c3 Redemptions 6, AD-7a People S/O 4, AD-7d Audit log S 5 / O 4.

**10: under 44 pt:**
- AD-7a People S/E "Give access" 30 pt;
- AD-7a S "Role bar" 12 pt (a chart that opens Staff by role);
- AD-7d "Type · All types" pill 30 pt;
- AD-7d hero timeline dots ×6, 14 pt (each also has its entry row below, which is 44 pt).

These are the 10 already logged in F6.

## Ranked fix list

| # | Fix | Frames | Why this rank |
|---|---|---|---|
| 1 | Set word parts of mono runs in the sans style (eyebrows, "dishes", "reports", "for · against", "Updated", tile labels). Keep only numbers, times and units in mono. | 19 staff + 28 admin | Broken rule ("mono only for numbers, times and units") on the most frames; text-style change only, no layout |
| 2 | Raise the 10 small tappables to 44 pt targets (Give access, Type pill: 44 pt hit area; Role bar and audit dots: a 44 pt invisible hit frame) | AD-7a S/E, AD-7d S | Readability standard ("rows and buttons at least 44 pt") |
| 3 | MS-D1 · Waste entry: last item 16 pt above the footer; add 4 pt bottom padding | MS-D1 | Rule "last item 20 pt above the bar" |
| 4 | Lime review by kind (rule V2) on the 12 frames with ≥ 4 lime elements. Most are allowed kinds (Success pills, current step, filled bars on black), but AD-6c3 (6) and MS-F4 (5) should be checked for a second hero highlight | 5 staff + 7 admin | Possible rule V2 breach; by element the count over-reads |
| 5 | Fill floor: grow the content on the 20 staff result screens (move the "what happens next" text and the row list up into a fuller result card), AD-2b, AD-8c No results | 22 | Rule "fill floor 75%"; all pre-date this run |
| 6 | Build the destination-absent screens (Edit dish ×10, per-mess report previews, community report detail and Merge result, Masala dosa vote, scope results, Meena / Lakshmi access, dish feedback detail, duty picker, help articles, student shortage detail, community guidelines, plate for other meals) | see finalfix_report.md | 83 controls lead nowhere today |
| 7 | Duty picker: let Ravi's sign-in reach the attendance scanner and pass desk, or give those accounts their own start again | 16 staff frames | Unreachable from the only staff start |
| 8 | Student state gallery: add a start (if the owner allows a fourth) or a hidden debug link from You | 96 student state frames | Unreachable from the only student start |
| 9 | Tool: make `fa1` skip layers under a sheet's scrim | — | Sheet results are noise today |
