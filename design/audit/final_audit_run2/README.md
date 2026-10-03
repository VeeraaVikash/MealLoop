# Quick audit (run 3, R2-6): report only, nothing fixed

**Scope:** page 09 (54 frames) and page 10 (162 frames), on the state after R2-5 (`st169`). No node was changed in this stage.

**Tools:**
- `tools/fa1.js`: fill, clearance, small text, mono words, overflow, heroes;
- `tools/brand1.js`: wash, lime elements;
- `tools/nav3.js`: tap depth, way back, dead chevrons, swipe rows;
- a BFS from the flow starts, for dead ends.

**Per-page detail:** `fa_09.md` (every frame) and `fa_10.md` (failures by check).

## Summary

| Check | 09 Staff | 10 Admin | Run 2 final audit (for comparison) |
|---|---|---|---|
| Fill < 75% (excl. sheets, Empty, sign-in) | 21 | 1 (AD-2b 65%) | 09: 22, 10: 1 |
| Last item < 20 pt above bar at max scroll | 1 (MS-D1, 16 pt) | 0 | 0 / 0 |
| Text < 12 pt (tab labels excepted) | 0 | 0 | 0 / 0 |
| Frames with words in mono | 15 | 36 | 15 / 32 |
| Frames without the wash | 0 | 0 | — (wash added in R2-1) |
| Frames with ≥ 4 lime elements (by element; by kind under rule V2 most are 1–2) | 5 (D4, F3, F4, H1, H5) | 18 | 4 / 8 |
| Horizontal overflow (unclipped) | 0 | 0 | 0 / 0 |
| Max tap depth for a screen (excl. states) | 4 (MS-C1, before home) | 4 (Report preview Exported) | — / 5 |
| Unreachable from home (non-state) | 0 | 0 (AD-0 trio has its own start) | 9 / 67 |
| Dead ends from the starts | 0 | 0 | 0 / 0 |
| Dead chevrons | 0 | 0 | 4 / 47 |

**Staff frames under the 75% fill floor (all from before run 3):**
- A1, C4: 71%;
- E-empty: 72%;
- A2, A3, A4: 48%;
- A5, B6: 56%;
- B2: 46%;
- B2b: 53%;
- B3: 65%;
- B3b, B4, B5: 60%;
- C1: 60%;
- C4a: 52%;
- C4b: 56%;
- D2, D3: 64%;
- D3a: 42%;
- D4: 56%.

All 19 new staff frames pass (78–96%).

## Ranked fix list

1. **Words in mono (51 frames).** Fix at the source, not per screen:
   - the mono caps eyebrow style in heroes (PILOT BUDGET, BIRYANI · CLOSED, OFFERED · 4 DISHES, KITCHEN SEES, EXPECTED · LUNCH, LUNCH · TODAY);
   - the BentoTile label style (SAID YES, WASTE LOGGED, WASTE);
   - IssueCard "UPDATED 5H AGO";
   - the unit words placed next to hero numbers ("dishes", "people", "for", "students").

   Move eyebrows to sans and keep mono only on the digits.
2. **Staff result screens are sparse (21 frames, 42–72%).** The scanner and pass-desk results (A2–A5, B2–B6) and the saved screens (C4a, C4b, D3a) put one card on an empty screen. Use a centred result (ResultCard plus one line), or bring up the next action (Scan next) with a recent-scans rail.
3. **MS-D1 Waste entry: last item 16 pt above the footer** (under 20). Trim one row of spacing or let the frame scroll.
4. **State frames cannot be reached in the prototype:**
   - 14 on 09: scan outcomes, F5/F6, G3/G4/G7, H1 Empty;
   - about 66 on 10.

   Add a per-role "States" gallery start (as on 07), or accept that they are canvas-only.
5. **AD-2b Crowd — Mess detail fill 65%.** Add the per-hour turnout chart, or move the seats card up.
6. **Two black blocks on Offline states (27 admin frames).** Make the offline banner a light chip on admin, as already suggested for students.
7. **Repeated lime dots** (AuditRow Done; AD-5a dish tracker dots). They are within rule V2 (one kind), but they read as busy on AD-7d, AD-6c3 and MS-F4. Consider an ink Done dot in AuditRow.
8. **Gaps from R2-4:**
   - profile sheets for the scanner and pass-desk accounts (the avatar is unlinked on A1 and B1);
   - per-mess report previews;
   - Edit dish for Rice, Paneer, Chapati and Curd;
   - the Main Mess Rice shortage (staff G2) is not on admin AD-2c.
9. **Student findings (R2-3, page 07, not changed):**
   - Report · Receipt and Urgent receipt have no Back;
   - Reminder prompt has no Close;
   - 41 state frames have an unlinked Back;
   - 44 frames have dead chevrons (You · Offline 9, Report · No one on duty 6, Help 5).
10. **AD-4f renders:** the stored render `run3/r4/ad-4f_report_preview.png` shows the old period. Re-render it when the deck is next refreshed.
