# Document sync · Brand audit B8 (2026-10-08)

MASTER_CONTEXT.md does not exist; PROJECT_CONTEXT.md is the master context (B0 decision). Checked against the live file (page counts read with `loadAsync` on every page).

## PROJECT_CONTEXT.md vs the file

| Statement | File | Verdict |
|---|---|---|
| 00 Before: 81 frames in sections | 15 sections, 81 frames | ✓ |
| 02 Mood Frames: 24 review frames | 24 phone frames | ✓ |
| 03 Components: 97 sets and 38 single components | 97 sets, 38 single (5 of them now in the "Deprecated" section) | ✓ count; **add** the Deprecated section and the Brand sheet (C1) |
| 04 / 05: 300 frames each | 300 / 300 | ✓ |
| 06: 14 frames | 14 | ✓ |
| 07: 262 frames, start Student · Sign in | 262, 1 start | ✓ |
| 09: 77 frames, start Mess staff · Sign in | 77, 1 start | ✓ |
| 10: 163 frames + AD-4f section (9 A4 page components, 13 phone frames), 5 starts | 163; the section holds 26 frames (13 phone frames and 13 other report frames) and the 9 components; 5 starts | ✓ (section frame count could be stated more precisely) |
| 11: 3 stale frames | 3 | ✓ |
| 99 Archive: 153 replaced frames | 153 phone frames | ✓ |
| "Components to know" lists **MessBadge (814:87225), MetricBadge (881:1850)** as live | Both have 0 instances and were moved to Deprecated (A5) | **stale → fix in C1** (use CrowdBadge, BentoTile) |
| Owner decision 1: iOS 27 kit not available | Still true (B7) | ✓ |
| Snapshot facts | STATE.md says st228 | **stale → st237+ after this run** |

## design_intent.md

- Line 9 (owner's taste) names "MessBadge / CrowdBadge / MetricBadge" as distinctive patterns. MessBadge and MetricBadge are deprecated. **Fix in C1** to "CrowdBadge, BentoTile".
- Rules 9a / 9b, the BACK STANDARD demo exception and the lime rule V2 match the file.

## prototype_contract.md

The last section is "Run 3 · R2-5 · Prototype wiring (2026-10-03)". It predates the F, G, Final-2 and Final-3 runs, so its facts are superseded:
- staff task screens "use StaffTopBar Type=Task" (StaffTopBar is now archive-only; the G run uses NavHeader + BackButton + StaffTabBar);
- reachability 10: 162 / 94, 09: 54 / 40 (now 163 / 98 and 77 / 66);
- staff frame names MS-E / MS-H5 (the G run renamed and rebuilt them).

**Fix in C1:** append a short "Superseded" note at the end that points to reachability_final.md, final3_report.md and this audit, without rewriting history.

## prototype_gaps.md

| Gap | State in the file | Verdict |
|---|---|---|
| 330 (12 list screens under 75% fill) | Still open: the same 11 frames on 07, plus Community · Archived under rule 9a | open ✓ |
| 331 (onboarding wash under the art only) | unchanged | open ✓ |
| 335 (Pass confirm / Reminder close with Cancel / Not now) | unchanged | open ✓ |
| 336 (lunch "Change" leads nowhere) | unchanged | open ✓ |
| 337 (admin status bars 9:41 vs the Moment) | Confirmed in B5: every admin status bar reads 9:41 | open ✓ |
| 338 (repeated "Last: Hair in dal" on three messes) | unchanged | open ✓ |
| 339 (ReportTicket mono spaces) | unchanged | open ✓ |
| 340 (reach8 skips sections) | still true; AD-4f checked through fa16 instead | open ✓ |
| 341 (fa1 / qc8 count chevrons under a scrim as dead) | still true; it explains the 26 admin sheet "dead chevrons" in B4 / B6 | open ✓ |

No gap is closed by the file without the doc saying so. New gaps from this audit are numbered in B9 (from 342).
