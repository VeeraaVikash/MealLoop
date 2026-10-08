# Before and after · Brand audit C2 (2026-10-08)

"Before" is the file at the start of the run (B0, snapshot st229, equal to the Final-3 / owner-fix state). "After" is the end of C1 (st239). Part B was re-checked after C1: the snapshot shows one change since Part B (the Deprecated section's fill, bound in C1), and the fast scans were re-run.

| Check | Before (st229) | After (st239) | Changed by |
|---|---|---|---|
| Raw solid paints (03 / 04 / 05 / 07 / 09 / 10) | 942 / 0 / 0 / 60 / 0 / 21 | 940 / 0 / 0 / 45 / 0 / 12 (03 includes the new Deprecated section's outline) | A2 (27 bound), C1 (1 bound) |
| Exact-match bindable paints left | 35 (27 invisible, bound in A2) | 17 on 03, all lock-screen mock / CreditsChip (binding would change page 05 Dark) | A2 |
| Unstyled texts (03 / 04 / 05 / 07 / 09 / 10) | 72 / 38 / 38 / 68 / 2 / 266 | 39 / 0 / 0 / 45 / 2 / 266 | A3 (132 styles) |
| Exact-match styles left | 132 | 0 | A3 |
| Components with no description | 4 | 0 | A4 |
| Fixed-size text boxes in components | 41 | 15 | A4 |
| Zero-instance components outside Deprecated | 5 | 0 | A5 |
| Brand sheet | none | "Brand sheet · new" on page 03 | A7 |
| Mono words 04 / 05 / 07 / 09 / 10 | 1,165 / 1,229 / 8 / 9 / 0 | same | (VISIBLE, not applied) |
| Contrast failures (frames, mock aside) 04 / 05 / 07 / 09 / 10 | 0 / 3 / 0 / 0 / 6 | same | (VISIBLE) |
| Fill under 75% (not exempt) 04 / 05 / 07 / 09 / 10 | 14 / 14 / 14 / 10 / 0 | same | (VISIBLE) |
| Targets under the minimum | 0 (09: 3 accepted) | same | — |
| Real truncation | 0 | 0 | — |
| Reachability 07 / 09 / 10 | 165 / 66 / 98, 0 bugs, 0 dead ends | same | — |
| DEMO.md hops failing | not measured hop-by-hop at B0 | 0 of 91 | — |
| Flow starts | 7 | 7 | — |
| Frames per page 04 / 05 / 07 / 09 / 10 / 99 | 300 / 300 / 262 / 77 / 163 / 153 | same | — |

**Render proof for every component or token edit:** A2 10 / 10, A3 10 / 10, A4 17 / 17, C1 1 / 1 byte-identical PNG exports at scale 1 (px15). The A5 moves and the A7 board are the two named changes; their diffs show only those nodes.

**Docs fixed in C1:** PROJECT_CONTEXT (components to know, page 03 contents), design_intent (retired MessBadge / MetricBadge), DEMO.md (staff demo Back note), prototype_contract.md ("Superseded facts" note).
