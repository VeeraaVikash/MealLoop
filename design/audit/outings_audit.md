# Outings audit (run OUTINGS, stage O8, 2026-10-13)

Scope: every new frame of the module — 04 (28), 05 Dark (28), 07 (28), 10 AD-9 (19), 13 Guardian (18), 14 Warden (18), 15 Gate (23) = **162 frames**, plus the edited You frames, Manage hubs, chain frames and report page 9 (checked by render). Tools: `fa16` (per-frame driver over `fa1`), `tgt14` (targets), `reach8` (O7), and two one-off scans in this stage (truncation by re-layout; key facts by text search). Before = first sweep (`ou8`), after = sweep after the safe fixes (`ou9`).

| Check | Before | After | Notes |
|---|---|---|---|
| Frames checked | 162 | 162 | |
| Contrast under 4.5:1 (3:1 large) | 4 frames | 4 frames | 3 are checker artefacts: text over a sibling layer the tool does not composite (OutingPass lime band "MEALLOOP · OUTING PASS" / "Sat 18 Oct" on 05; SlideToApprove Done "Approved" on lime). **1 real:** 05 Emergency outing · Sent, ResultCard Hold tag "Sent" in Dark 2.26:1 — a component colour (VISIBLE, gap 357). Lowest real pairs otherwise ≥ 4.5 (all text tokens: ink / ink-secondary on surface or canvas, on-hero / on-hero-secondary on hero-bg, on-lime on lime). |
| Words in mono | 64 frames (68 runs) | **22 frames** | Fixed: ribbon time labels ("by Fri 11 PM") and the tracker's "in 14 h" moved to Inter; weekday words removed from notification times; gate "3 out now" and the ABC key to Inter. Left: the pass code 7F3K (a code, like an ID) on the 7 pass frames ×3 pages and the gate pass-code field — accepted. |
| Lime elements > 3 per frame | 6 | **0** | The guardian request family had 4 (wordmark, eyebrow dot, verified check, slider); the eyebrow dot is now an ink-secondary ring (the owner's mockup shows lime; the three-element rule wins, logged). |
| Wash present | 151 / 162 | 151 / 162 | The 11 without are full-screen gate results (lime, black, white) and the camera Scan, exactly like the 09 MS-A results they reuse — accepted staff pattern. |
| Lime text on a light surface | 0 | 0 | Lime text only on black (ribbon headline, "You're out", tracker time left, WB avatar). |
| Text under 12 pt | 0 | 0 | Tab labels 11 pt are the existing tab-bar exception. |
| Targets under 44 pt (gate 56 pt) | 15: 7 (Backs 44 pt, one link) | **0** everywhere | 56 pt hit areas carry the Back links on the gate (as on 09); the SRM link is 56 pt tall. 07 192 targets, 10 131, 13 32, 14 57, 15 36: all pass. |
| Real truncation | 0 | 0 | 16 texts have truncation switched on (BentoTile meta inside the component); re-laid out without it, none is cut. One long meta shortened anyway. |
| Horizontal overflow | 0 | 0 | |
| Raw hex paints | 0 | 0 | Dim tracks use a bound colour with layer opacity. |
| Detached instances | 0 | 0 | |
| Unstyled text | 0 | 0 | |
| Banned words | 4 frames | **0** | "forecast" on AD-9a / AD-9c → "Expected vs came in" (UI words: forecast → expected). "Overdue" is kept: it is this module's status (design_intent: a missed cutoff is never "overdue"; an outing past its back-by time is). No "served", "inside" or "redeem" anywhere. |
| Fill floor (75%) / clearance (20 pt) | — | — | fa1 cannot see the inner scroll container, so it reports "clearance" below 20 for stacks that scroll (48 frames, by design: Content clips and scrolls with a 124 pt bottom pad). Screens that fit were measured directly: New outing 727 / 748, trackers 703–716, passes 706, Queue 729 (See all link), gate Verify 758 / 818. Empty states and results are exempt. |
| Student parity 04 / 05 / 07 | — | equal | Built by the same builders and reworked by the same operation; 28 frames each, same names and structure; 05 carries the Dark mode; only 07 has links (plus You → Outings on 04 and 05). |
| Key facts across roles | — | consistent | Pass code **7F3K** (22 texts, no other code); place **Express Avenue Mall** (88, no other); **Sat 2–8 PM** (34), reply by **Fri 11 PM** (36), decision by **Sat 12 PM** (34), **Sat 18 Oct** (41), guardian approved **7:42 PM** (18), exit **2:04 PM** (10), return **7:41 PM** (6), back by **8 PM**. The audit rail was corrected in O6 to tell the same story. |
| Flow starts | 10 | 10 | No "Flow N" starts left. |
| Reachability (O7) | — | 0 bugs, 0 dead ends | |
