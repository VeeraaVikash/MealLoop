# Brand audit · pages 09 and 10 (run 3, R2-1)

Rule: BRAND RULE V2 (design_intent.md). Tool: `tools/brand1.js` (`mealloop/brand1`); fixes in `tools/brand2.js` (`mealloop/brand2`).

**Counting:**
- A lime element is any visible node painted with the `lime` token, grouped by its outermost instance.
- Elements are counted by **kind**: a list of identical pills, rail dots or legend swatches is one kind.
- The wordmark is the logo and is not counted.
- A sheet frame only needs the wash.
- Lime text without ink fails.

## Before (`st160`)

| Page | Frames | Wash | Pass |
|---|---|---|---|
| 09 Mess staff | 34 | **0 / 34** | 0 (no wash anywhere) |
| 10 Admin | 151 | 148 / 151 (AD-0 sign-in ×3 had none) | 98 |

**Before, page 09:**
- **Zero lime beyond the logo (16):** A3 Duplicate, A4 Invalid, A5 Offline, B4, B5, B6, B7, B2b, C3, C4, C4b, D2, D3, E-empty, MS-0 Verifying, MS-0 Confirm.
- **Lime text:** C5 "1 adjusted today", lime on black with no ink.

**Before, page 10:**
- **No lime beyond the wordmark (about 50):** among them AD-1b, AD-2a, AD-2c, AD-1c, AD-1e, AD-1f, the Manage hub ×3, AD-3d, AD-4d, AD-5b, AD-7b by role, AD-7c, AD-2d, AD-3a2, AD-4e and all Empty states.
- **Above three:** AD-5a (dish bars), AD-6c (coupons), AD-7a (role bar), AD-7d (rail). By kind, all of these are within 3.

## Fixes

| Fix | Scope | Where |
|---|---|---|
| Wash (canvas + wash/top → wash/clear, fixed frame fill) + `ScrollEdgeFade Style=Status` top fade | all 34 page-09 frames, 3 AD-0 frames | per frame |
| **StaffTopBar** (component, page 09 `732:4`): lime "on shift" dot, 8 pt with an ink 1 pt outline, before the mess name | every staff screen with a top bar | component |
| StatusPill "On track" State=Hold (grey) → **Success** (lime fill, ink text) | 45 on 09, 100 on 10 | instance swap; no student frame touched |
| Ring arc → lime (filled part on a black card) | AD-1b Mess detail, its Offline, North | per frame |
| First hero chip → lime chip, ink text and outline | AD-1c Decisions S/O, AD-1f Watch S/O, Staff access — Lakshmi (Give) | per frame |
| "Live" lime chip in the eyebrow row (live heroes) | AD-2a Crowd S/O, AD-2c Shortage alerts S/O, AD-1e Messes S/O | per frame |
| "Decisions ›" on the black hub row → lime pill (primary action on a black card) | Manage hub S/E/O | per frame |
| Lime text → on-hero | MS-C5 "1 adjusted today" | per frame |
| Empty profile chips hidden (Stage 11 bug) | MS-0 / AD-0 Confirm profile | per frame |

**Already compliant components (no change):** StatusPill Success (lime/ink), ResultCard Success (lime check), TimelineStep Current, StepBar current segment, ChartBar `Pill lime`, StatusTag Available.

## After (`st161`)

| Page | Frames | Wash | Pass | Listed |
|---|---|---|---|---|
| 09 | 34 | 34 / 34 | **31** | 3 |
| 10 | 151 | 151 / 151 | **115** | 36 |

**Exceptions (with reason):**

| Frames | Reason |
|---|---|
| MS-0 and AD-0 Sign in, Verifying, Confirm profile (6) | Clones of the student onboarding. Their lime is the brand ribbon art (an image, not a token), so the token audit can't see it; the student originals are unchanged by rule. |
| 16 admin Empty states (AD-4a, AD-5a, AD-5c, AD-6a, AD-6c, AD-6d, AD-5c2, AD-7a, AD-7d, AD-2a, AD-2c, AD-3d, AD-1e, AD-1f, AD-4e, AD-4c, AD-3a Dishes / Community) | The empty state is "centred with one plain line" by rule. There is nothing live, current or actionable to mark, and lime here would be decoration. |
| AD-3d Community moderation S / O / AD-3a Community Offline | Visible statuses are Working on it / Seen / Sent (not success); actions are disabled offline. |
| AD-4d Reports, AD-5b Edit dish ×3, AD-7b Staff by role | Light list or form screens with no black card; the primary action is on a light card, where lime is not allowed. |
| AD-7c Access request ×3 | The black ResultCard is a Hold ("Needs your decision"); the actions sit on the light surface. |
| AD-4e Meal S / O, AD-2d Missing data, AD-3a2 All safety cases | The heroes hold counts with no progress, live or action element. Adding one would invent content. |

**Contrast:** ink `#111111` on lime `#D4F25A` is **15.1:1** (passes AAA). Every lime element added carries ink text or an ink outline.
