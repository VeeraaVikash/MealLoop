# Token audit · Brand audit A2 (2026-10-08)

Tool: `tools/tok15.js` (`mealloop/tok15`). It walks every SOLID fill and stroke on loose layers, plus fill and stroke overrides on instances (the rest of an instance belongs to its main component, which is counted on page 03). It looks up the frame's ML Color mode, then matches the raw hex and opacity against the preferred token for the paint's role (text, fill or stroke). Only an exact match is bound. Render check: `tools/px15.js` (`mealloop/px15`) hashes PNG exports at scale 1; identical bytes mean identical pixels.

## Variable collections and modes

| Collection | Id | Modes | Variables | Light and Dark both set | Bound paints (03/04/07/09/10) |
|---|---|---|---|---|---|
| ML Color | 45:2 | Light 45:0, Dark 45:1 | 55 (52 colour, 2 boolean, 1 alias) | yes, 55 / 55 | all current bindings |
| ML Layout | 45:30 | Value | 17 (space 4–32, margin 20, radius card 24 / compact 16 / icon 12 / input 12 / pill 999, button 52 / 48, hit 44, icon square 40) | n/a | — |
| Semantic (pre-rebrand) | 7:46 | Light 7:1, Dark 7:2 | 31 (aliases to Primitives) | yes, 31 / 31 | **0** |
| Primitives (pre-rebrand) | 7:8 | Value | 37 (paper, curry leaf, turmeric, chilli, night, bone) | n/a | **0** |
| Layout (pre-rebrand) | 7:76 | Value | 14 | n/a | **0** (no node on page 03 binds any 7:x variable) |
| Prototype state | 572:20517 | Mode 1 | 1 boolean (seenPlateIntro) | n/a | prototype variable |

**Light and Dark parity:** every ML Color variable has a value in both modes (no missing values). The variable set is the same in both modes, because modes in one collection always share variables.

**Unused ML Color variables** (0 bound fills or strokes on 03 / 04 / 07 / 09 / 10, and no gradient-stop binding on page 03): surface-raised, live/4-bg, live/4-fg, live/5-bg, live/5-fg, elevation/card, wash/top, wash/clear. The wash look is drawn by the MealWash component's own gradient. art-light and art-dark are booleans bound to the visibility of the OnboardingArt ribbon and dark-ribbon placeholder.

**Pre-rebrand collections** (Primitives, Semantic, Layout) have no colour bindings left. They are kept (the brief says don't delete); listed as a cleanup candidate (OWNER).

## Raw colour scan: before and after

| Page | Solid paints | Bound before | Raw before | Bound in A2 | Raw after | Bound after |
|---|---|---|---|---|---|---|
| 03 Components (top level: components, sets, boards) | 4,602 | 3,660 | 942 | 3 | 939 | 3,663 |
| 04 Student Light | 2,033 | 2,033 | 0 | 0 | 0 | 2,033 |
| 05 Student Dark | 2,033 | 2,033 | 0 | 0 | 0 | 2,033 |
| 07 Prototype | 1,540 | 1,480 | 60 | 15 | 45 | 1,495 |
| 09 Mess staff | 1,619 | 1,619 | 0 | 0 | 0 | 1,619 |
| 10 Admin (incl. AD-4f section) | 2,975 | 2,954 | 21 | 9 | 12 | 2,963 |
| **Total** | 14,802 | 13,779 | 1,023 | **27** | 996 | 13,806 |

Gradients (not tokenised, reported only): 03 12, 04 5, 05 5, 07 93, 09 58, 10 194 (wash, scroll-edge fades, chart fills).

### What was bound (27 paints, all invisible)

| Where | Paints | Raw | Token | Mode where it renders |
|---|---|---|---|---|
| 07: the 15 "Gallery · A–O" header cards, frame fill | 15 | #111111 | hero-bg | Light only (07 has no Dark frames) |
| 10: the 9 "Report page N · new" A4 components, page fill | 9 | #FFFFFF | surface | Light only (admin) |
| 03: MenuDishTile, the two "Bar" rectangles in the macro bar | 2 | #5C5C58 | ink-secondary | Light only (MenuDishTile is used on page 10 only) |
| 03: LockScreen component-set background | 1 | #EDEDE8 | canvas | page 03 canvas only |

**Proof:** 10 sample renders at scale 1 (07 Gallery A / F / O; 10 Report page 1, Report page 2, AD-5a Menu — Lunch; 03 MenuDishTile set, LockScreen set; 04 Home · After cutoff; 09 MS-1 Pick your job) were hashed before and after. 10 / 10 byte-identical (a repeat export before the edit was also 10 / 10 identical, so the hash is stable). MenuDishTile instance properties (Kind, Diet) read back unchanged on 5 instances.

## Exceptions (raw, left as they are)

| Page | Raw | Count | Where | Why not bound |
|---|---|---|---|---|
| 03 | fill #D9D9D9 | 886 | Boolean-operation operands: 868 QR "Modules" in PassCard / VerificationCard, plus BigTicket, CouponCard, MenuDishTile ticket shapes | A boolean operation paints with its own fill, so the operand colour is never rendered. Not a token. |
| 03 | LockScreen, LockNotification, LockActions: #0D0D0F, #080A05@58, #FFFFFF@92/96/75/70/55/40, #000000@45, #3C3C43@70 (text), #3C3C43@29 (stroke), #111111 text ×6, #FFFFFF ×5, #F2F2EC ×3 | 39 | iOS lock-screen mock | System art. Several match a token in Light (ink, surface, fill-quiet) but these components are used on page 05 Dark, so binding would change the Dark render (VISIBLE). Kept raw on purpose. |
| 03 | fill #FFFFFF | 2 | CreditsChip frame | Equals surface in Light, but CreditsChip is on 05 Dark (51 instances), where surface is #161616. Binding is VISIBLE. Logged for A6 / B9. |
| 03 | stroke #111111 | 1 | Check symbol override in the LockScreen "Saved banner" | Same Dark problem (border-control is #F2F2EC in Dark). |
| 03 | stroke #000000 | 2 | DishRow and SearchResultRow chevron vectors | No token is pure black. |
| 03 | stroke #9959F2 | 3 | StaffTopBar, MenuDishTile, PlateRingHero component-set borders | Figma's default dashed component-set outline; page 03 only. |
| 07 | text #D4F259, #F2F2ED, #F2F2ED@70 | 45 | The 15 "Gallery · A–O" header cards: "STATES GALLERY", the title and the count line | 1/255 off lime (#D4F25A) and off #F2F2EC; no exact match. Lime text is also not a token scope (lime is fill-only). VISIBLE by 1/255 if bound. |
| 10 | stroke #D9D9D4 | 12 | "Stack card" frames in the Duplicate stack (AD-3d Community moderation ×9, AD-5c2 Look the same sheet ×3) | Close to border (#D6D6D0) but not equal. |

## New-token proposals (20+ uses, not created)

None. The only raw colour with 20+ uses is #D9D9D9 (886), and every one of those is a boolean operand that never renders. The next most common are the gallery header text colours at 15 each.

## Naming and duplicate values

**Naming:**
- ML Color mixes flat kebab-case (ink-secondary, on-hero-secondary) with slash groups (live/1-bg, wash/top, elevation/card). Proposal (OWNER, not done): group as text/…, bg/…, status/…, chart/…, live/…, wash/….
- "lime-outline" resolves to #111111 in both modes. It is the dark outline drawn around lime fills, but the name reads as a lime colour. Proposal: rename to "on-lime-outline" (a rename is invisible but changes every token name in dev handoff, so it is OWNER).
- art-light and art-dark are booleans inside a colour collection.

**Exact duplicates (same value in both modes):**

| Value (Light / Dark) | Variables |
|---|---|
| #111111 / #F2F2EC | ink, border-control, ink-strong |
| #D4F25A / #D4F25A | lime, chart-current, pass-border, live/1-bg |
| #111111 / #111111 | on-lime, lime-outline, qr-module, live/1-fg, live/3-fg, live/4-fg |
| #EDEDE8 / #111111 | canvas, onboarding-bg |
| #FFFFFF / #FFFFFF | qr-zone, live/2-fg, live/5-fg |

These keep separate names on purpose (role tokens: a chart or QR colour should be able to change on its own), so none is merged. ink-strong (5 uses, page 03 only) is the one with no separate role; listed as a merge candidate into ink (OWNER).

**Same in Light, different in Dark (correct, not duplicates):** surface / surface-raised / qr-zone (#FFFFFF), hero-bg / pass-bg / action (#111111), canvas / chart-hatch-bg (#EDEDE8).
