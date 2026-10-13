# Run OUTINGS-FIX · Q7 checks (2026-10-13)

Scope: every Outing frame of the module — 04 (33), 05 Dark (33), 07 (33), 10 AD-9 + hub export clone (23), 13 Guardian (30), 14 Warden (18), 15 Gate (23) = **193 frames** — plus the components changed on 03 (rendered in q1/). Tool: `q7chk` (stored in plugin data `mealloop/q7chk`): contrast with every variable resolved in the node's own mode (4.5:1, 3:1 for 18 pt+ or 14 pt+ semibold), mono runs containing words (units AM, PM, h, min, kg, L and codes with digits allowed), lime elements per frame (any visible fill or stroke that resolves to #D4F25A; one key per outermost instance or layer, so a repeated element counts once; the wash and the wordmark excluded), wash (MealWash, a gradient on the frame, or a full lime result frame), text under 12 pt (tab labels excepted), faded text, targets under 44 pt (56 on 15) unless a ≥ min "hit area" layer carries the same link, real truncation (re-laid out without truncation), horizontal overflow not clipped, raw paints outside instances, detached instances, banned words. Parity by text and shape signatures across 04 / 05 / 07; key facts by pattern search over 07, 10, 13, 14, 15. **Before** = first sweep (after Q6, st269), **after** = after the safe fixes (st270).

## Counts (frames with at least one finding)

| Check | 04 before → after | 05 before → after | 07 before → after | 10 | 13 before → after | 14 | 15 |
|---|---|---|---|---|---|---|---|
| Contrast under 4.5:1 (3:1 large) | 0 → 0 | 3 → 3 (2 artefacts, 1 real, see below) | 0 → 0 | 0 | 1 → 1 (artefact) | 0 | 0 |
| Words in mono | 0 → 0 | 0 → 0 | 0 → 0 | 0 | 0 → 0 | 0 | 0 |
| More than 3 lime elements | 10 → **0** | 11 → 11 (Dark, see below) | 10 → **0** | 0 | 0 → 0 | 0 | 0 |
| No lime beyond the wash (non-sheet) | 8 → 8 | 2 → 2 | 8 → 8 | 13 | 12 → **11** | 4 | 15 |
| Wash missing | 0 | 0 | 0 | 0 | 1 (Messages reference, by design) | 0 | 8 (scan camera + full-screen results, the accepted staff pattern) |
| Text under 12 pt | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Essential text faded | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Targets under 44 pt (gate 56) | 0 | 0 | 0 | 0 | 1 → **0** | 0 | 3 → 3 checker artefacts (the 44 pt Back icons on GA-2, GA-4, GA-9 are covered by their 56 pt "Back · hit area 56 pt" layers with the same link) |
| Real truncation | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Horizontal overflow | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Raw hex paints | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Detached instances | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Banned words ("served", "inside", "redeem") | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

## Safe fixes made

1. **Lime count on the New outing form (04, 07: 10 frames each → 0):** the DateChip **Today** state carried a lime dot (a fourth lime element next to the slider span, the Shopping chip and the ribbon). The dot is now hidden; Today is the ink outline the brief asks for (Today had no instances before this run).
2. **Guardian "Use button instead" (13):** the link sat on a 133 × 21 text inside SlideToApprove → moved to a 160 × 44 "Use button instead · hit area 44 pt" layer.
3. **Guardian Status · Back:** the status dot is now Success lime with an ink outline (it had no lime element).
4. **Student parity:** You · Outings had item spacing 16 on 04 and 12 on 05 / 07 (pre-existing); 05 and 07 now follow the 04 source (16).

## Left, with the reason

- **05 Dark, 11 frames with 4–5 lime elements (NEEDS REVIEW):** in Dark the `action` token is lime, so the selected day chip and the black "Send to guardian" (which is lime in Dark, as on every 05 screen) add to the slider span, the Shopping chip and the ribbon. Changing the Dark action colour or the DateChip Selected state would change every Dark screen and the student Menu; not done (rule: change nothing this run does not name).
- **05 contrast:** "MEALLOOP · OUTING PASS" and "Sat 18 Oct" on the OutingPass lime band, and the SlideToApprove "Approved" on lime (13), read 1.00 because the lime is a sibling layer the checker does not composite (artefacts; real ink on lime 15.1:1). **Real:** 05 Emergency outing · Sent, ResultCard Hold tag "Sent" 2.26:1 in Dark (existing gap 357).
- **No lime beyond the wash:** student Outings · Empty, Not enabled, Outing · Expired, Outing pass · Returned / Overdue / Revoked / Expired unused, Emergency outing · Sent; guardian Request · Expired, Status · Not going / Withdrawn / Declined, Sign in, Verify code, Activate, Confirm link, Help; warden W-0 ×3, W-3, W-6; AD-9 13 frames (Policy, Staff, Authorities, Empty states); gate 15 frames. These are error / closed / onboarding / list states with no Success status, no primary on black and no current step; adding a lime element would add a block (rule 9 / "never add blocks"). Pre-existing for the student, warden, gate and admin frames (OUTINGS run). Gap 372.
- **Fill:** Guardian Verify code 55% and Confirm link 68% (accepted exceptions, intentionally sparse, no dial); Done and Expired follow rule 9a.

## Student parity (04 / 05 / 07)

33 module frames on each page, same names; text signatures identical on all 33; shape signatures identical after fix 4. 05 carries the Dark mode; only 07 has links (plus You → Outings on 04 / 05).

## Key facts across roles (pattern counts over 07, 10, 13, 14, 15)

| Fact | Found | Conflicts |
|---|---|---|
| Sat 18 Oct, out 2–8 PM | "Sat 2–8 PM" ×16, "Sat 18 Oct, 2–8 PM" ×3, "2 → 8 PM" on the guardian clock | none (other Saturday windows belong to other students: ·5841 9 AM–6 PM, ·9375 10 AM–4 PM, ·1468 / others) |
| Guardian reply by Fri 11 PM | "Reply by Fri 11 PM" ×8, "reply by Fri 11 PM" ×5, "Guardian by Fri 11 PM" ×3 | none |
| Warden decides by Sat 12 PM | "know by Sat 12 PM" ×5, "decides by Sat 12 PM" ×2, "decide by Sat 12 PM" ×2 | none |
| Weekday sample Wed 6–9 PM | "6 PM – 9 PM", "6–9 PM", "6 → 9 PM", "know by Wed 3 PM", "Reply by Wed 11 AM" | none |
| Pass code | 7F3K ×8 (no other code) | none |
| Place | Express Avenue Mall ×50 (9 with a trailing space in a text box; same words) | none |
| Exit / return | 2:04 PM exit, 7:41 PM return everywhere the story is told | none |
