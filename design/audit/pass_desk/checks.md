# PASS-DESK · Q7 spacing and checks (2026-10-17)

Scope: the 46 Pass Desk frames on page 09 (sections "Pass Desk · Entry and Home", "Checking and outcomes", "Reissue, report and shortage", "SOS, Alerts and Me"). Tools: `dschk` and `dsspace` (stored as plugin data), plus a text scan for the brief's banned wording.

## Checks (before → after)

| Check | Before | After | Note |
|---|---|---|---|
| Lowest text contrast | 5.72 : 1 | 5.72 : 1 | ink-secondary on canvas |
| Words in mono | 4 | 3 (accepted) | Fixed: "of 214" split into "of" (sans) + "214" (mono) on Pass verified and Home after; "196 of 214" on Meal ended set in sans. Left: the codes **7A3F** / **K2M9** (pass codes are IDs; mono allowed for codes) |
| More than 3 lime elements | 3 frames (4) | 4 frames (5–6) | Home SOS active, both SOS panels, Marked as checked: meal chip + SOS tab parts (outline, badge, icon) + the mark; same as DOOR-SCANNER gap 465 (NEEDS REVIEW) |
| OrbitBackdrop missing | 1 | 1 | Pass verified (full lime by the brief) |
| Text under 12 pt | 0 | 0 | |
| Targets under 44 pt | 1 | 0 | The "Student not found" hotspot 353 × 30 → 353 × 44 |
| Truncation | 0 | 0 | |
| Overflow (horizontal) | 0 | 0 | |
| Raw paints | 0 | 0 | |
| Banned words ("decline", "approval", "sync") | 0 | 0 | |
| Scan or camera wording in Pass Desk copy | 0 | 0 | The panel's "Back to scanning" is overridden to "Back to checking passes"; the only hit is the Door Scanner row on the dimmed role page behind the What you do sheet |
| Success on an unverified entry | 0 | 0 | Pass verified is reached only from "Matches · record entry"; No pass, Wrong meal, Already, Doesn't match, Can't check say nothing was recorded |
| "Approved" shown as "Done" | 0 | 0 | RequestRow chips Waiting / Approved / Done / Rejected are distinct |

## Spacing

| Rule | Result |
|---|---|
| One left margin per page | 20 on every frame (other values are hidden hotspots, the SOS tab at 335 and toasts) |
| Card gaps 8 / 12 / 16 / 24 | Home 12; result and form pages 24 / 16; lists 16; Alerts 24 / 8 |
| Card padding 12 / 16 / 20 | 16–20 (digits card 16 / 20; info cards 8 / 20; result cards 20; the black meal cards 24 as in the Door Scanner Home, unchanged) |
| List rows 52 or 56 | Quiet rows **57 / 58 → 56** (Home rows, After rows, Me); info rows 52–53; AlertRow and RequestRow 56 |
| Centred result pages on one axis | Yes (PassResultScreen centred; buttons at x 20) |
| Same role same text size | Large titles 34 on every page; body 17; secondary 15 |
| Primary buttons 56 pt at the same y on result pages | y 754 on Pass verified, No pass, Wrong meal, Already, Doesn't match, Can't check, Meal ended, Look up results, Request a new pass |
| Dead space above the bottom bar ≤ 24 | Home during / typing / SOS 12, Before 21, result pages 8, Open problems 20, Alerts — Empty 24. **NEEDS REVIEW:** Home after 88, New pass requests 307, Report a problem 61, Look up (empty) 151, Alerts 145–368, Me 98 (short by spec, no blocks added; as DOOR-SCANNER decision 38). **Scrolling:** Home — Student not found and Home — Offline are taller than the screen (79 / 51 pt) and scroll. |
