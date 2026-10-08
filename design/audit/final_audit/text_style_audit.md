# Text style audit · Brand audit A3 (2026-10-08)

Tool: `tools/txt15.js` (`mealloop/txt15`). A TEXT node counts when it is a loose layer, or an instance child whose style, font or size is overridden (other instance text belongs to its main component, counted on page 03). "Unstyled" means no text style; "mixed" means several runs (reported, not touched). A style is applied only when family, weight, size, line height, letter spacing, case, decoration, paragraph spacing and indent all match exactly.

## Local text styles (64)

| Group | Styles | Sizes |
|---|---|---|
| ML (the app scale) | Large Title, Title, Section, Card Heading, Body, Body Semibold, Secondary, Secondary Medium, Footnote, Tag, Tab Label, Eyebrow; mono: Hero Metric, Hero Unit, Metric, Metric Unit, Code, Mono Body, Mono Footnote, Mono Label | 34, 28, 22, 18, 17, 17, 15, 15, 13, 13, 11, 15; mono 52, 20, 30, 15, 17, 15, 13, 12 |
| iOS (system scale) | Large Title, Title 1–3, Headline, Body (+ Emphasized), Callout (+ Emphasized), Subheadline (+ Emphasized), Footnote (+ Emphasized), Caption (+ Emphasized), Caption 2 | 34 → 11 |
| Label | Eyebrow | 12 caps |
| Display (Instrument Serif) | Greeting, Pass Title, Moment, Dish, Dish Small, Italic Note | 40, 38, 30, 24, 20, 20 |
| Numeric | Hero, Title, Body | 44, 28, 17 |
| Mono (Geist Mono) | Serial, Code | 13, 40 |
| Tamil | Title, Headline, Body, Footnote, Eyebrow | 30, 16, 15, 12, 11 |
| AX3 (accessibility size) | Large Title … Dish (10) | 52 → 28 |

16 styles have an empty description: the 6 Display styles, Mono/Serial, Mono/Code, the 5 Tamil styles, AX3/Display, AX3/Mono, AX3/Dish (A4 writes component descriptions; style descriptions are listed here only).

## Unstyled text: before and after

| Page | Texts counted | Styled | Mixed runs | Unstyled before | Exact match → styled | Unstyled after |
|---|---|---|---|---|---|---|
| 03 Components | 1,480 | 1,268 | 140 | 72 | 33 | 39 |
| 04 Student Light | 946 | 876 | 32 | 38 | 38 | 0 |
| 05 Student Dark | 946 | 876 | 32 | 38 | 38 | 0 |
| 07 Prototype | 746 | 487 | 191 | 68 | 23 | 45 |
| 09 Mess staff | 781 | 626 | 153 | 2 | 0 | 2 |
| 10 Admin (incl. AD-4f) | 1,557 | 848 | 443 | 266 | 0 | 266 |
| **Total** | 6,456 | 4,981 | 991 | 484 | **132** | 352 |

**Applied (132):**
- 04 / 05 / 07: the "Diet tag" text on DishLine instances in the Meals menu frames (Menu, Dinner, Breakfast and their copies), overridden to Inter Medium 13/18 → **ML/Footnote** (38 + 38 + 23).
- 03: LockNotification "MealLoop" and "Time" → ML/Footnote (8); ReportTicket "Title" → ML/Card Heading (2); IssueCard, MealRow and RewardCard titles → ML/Body Semibold (12); IssueCard "Count value" → ML/Metric (6); OnboardingPage "Title" → ML/Large Title (5).

**Proof:** 10 renders at scale 1 hashed before and after: 04 Meals · Menu, Menu — Dinner, Menu — Breakfast; 07 Meals · Menu, Menu — Dinner; 03 IssueCard, OnboardingPage, MealRow sets; 09 MS-0 Sign in (OnboardingPage); 10 AD-3 frame with IssueCards. 10 / 10 byte-identical. IssueCard (Title, Count, Updated) and OnboardingPage (Title, Line, Button, Link) instance text properties read back unchanged.

**Left unstyled (no exact match):**

| Page | Signature | Count | Where | Nearest style |
|---|---|---|---|---|
| 10 | Inter / JetBrains Mono 10–40 pt at 140% line height (21 signatures; body 10–11 pt) | 263 | The 9 A4 weekly-report pages (AD-4f) | None: the report has its own document type scale (10 pt minimum, body 10.5–11 pt), an accepted exception from G8 |
| 10 | Inter Semi Bold 17/auto | 3 | Admin frames | ML/Body Semibold (17/24): line height differs |
| 07 | Inter Bold 40/auto, Regular 17/auto, Medium 15/auto | 45 | The 15 "Gallery · A–O" header cards | iOS/Body, ML/Secondary Medium: line height differs (auto) |
| 09 | JetBrains Mono Bold 104/115% | 2 | Scan count hero | None (largest style is 52) |
| 03 | 13 signatures, e.g. Inter Medium 12/16 ×8, Inter Semi Bold 20/auto ×5, Inter Bold 104/112 ×5, JetBrains Mono Medium 13/auto ×5 | 39 | Component internals (lock-screen mock, ticket codes, gauges) | iOS/Caption Emphasized differs by letter spacing; others by line height |

Mixed-run texts (991) were not touched: each run would need its own style, and splitting is not invisible.

## Type scale check (readability standard)

| Standard | Styles that carry it | Rendered use (04 / 09 / 10) | Result |
|---|---|---|---|
| Body 15 pt or more | ML/Body 17, ML/Body Semibold 17, ML/Secondary 15, ML/Secondary Medium 15 | 2,571 / 433 / 1,105 | pass |
| Secondary 13 pt | ML/Footnote 13, ML/Tag 13, ML/Mono Footnote 13 | 1,911 / 101 / 898 | pass |
| Meta 12 pt | Label/Eyebrow 12, ML/Mono Label 12, iOS/Caption 12 | 725 / 31 / 7 | pass |
| Staff primary 17 pt or more | ML/Body Semibold 17 (331), ML/Body 17 (51), titles and metrics above | 09: 500 texts at 17 pt, 0 primary lines below 17 | pass |
| Nothing readable below 12 pt | ML/Tab Label 11 | 840 / 33 / 640, all tab-bar labels | accepted exception (tab labels, as in every earlier audit) |

Rendered sizes on 04: 11 (tab labels only), 12, 13, 15, 17, 18, 20, 22, 28, 30, 34, 52, 80, 104. A 22.1 pt size appears 4 times on 04 (a scaled instance; reported to B2).

## Near-duplicate styles (listed, not merged)

| Styles | Difference |
|---|---|
| iOS/Large Title = ML/Large Title | identical (Inter Bold 34/41, +0.4) |
| iOS/Body vs ML/Body; iOS/Body Emphasized vs ML/Body Semibold | line height 22 vs 24, tracking −0.43 vs −0.3 |
| iOS/Subheadline vs ML/Secondary | 15/20 vs 15/21 |
| iOS/Subheadline Emphasized vs ML/Eyebrow | Semi Bold 15/20, tracking −0.23 vs −0.1 |
| iOS/Footnote Emphasized vs ML/Tag | Semi Bold 13/18, tracking −0.08 vs 0 |
| iOS/Caption Emphasized vs Label/Eyebrow | 12/16 Medium vs Semi Bold caps |
| iOS/Title 1 vs ML/Title vs Numeric/Title | 28/34; Bold vs Semi Bold; tracking +0.38 / +0.2 / −0.3 |
| iOS/Title 2 vs ML/Section | 22/28 Bold vs Semi Bold |
| iOS/Headline vs Numeric/Body | 17/22 Semi Bold vs Medium |
| Mono/Serial (Geist Mono 13/18) vs ML/Mono Footnote (JetBrains Mono 13/18) | two mono families in the file |
| Mono/Code (Geist Mono 40/44) vs AX3/Mono (Geist Mono 40/48) | line height only |

## Mono-word check (mw10, rule 13: mono only for numbers, times, units and IDs)

| Scope | Expected | Found | Note |
|---|---|---|---|
| Page 03 components | 0 | **0** | |
| 10 Admin | 0 | **0** | |
| 07 Prototype | 0 | 8 words in 4 texts | IssueCard "UPDATED 5H AGO / 2D / 1D / 3D": number + unit, kept under the rule (G10 decision) |
| 09 Mess staff | 0 | 9 | The "DARK RIBBON RENDER NEEDED" placeholder in the OnboardingArt dark ribbon on the MS-0 frames (hidden in Light mode; owner art) |
| 04 Student Light | 0 | **1,165 words in 608 texts, 203 frames** | Not 0. G10 fixed mono words on 07 and 10 only; 04 and 05 kept the old frame overrides. Top strings: "YOUR PASSES" ×49, "Tonight · 7:30–9:30 PM" ×35, "ON THE MENU" ×22, "AT THE MESS" ×22, "Student · 2d" ×16, "Lunch · 12–2 PM" ×15. 319 texts are loose layers, the rest instance overrides (MealHero 70, IssueCard 33, TimelineStep 33, CommentRow 33, MetricHero 27, DishPortionRow 26, BentoTile 24, …). |
| 05 Student Dark | 0 | **1,229 words in 624 texts, 218 frames** | Same as 04, plus 16 dark-ribbon placeholders |

**Decision:** switching those words to Inter is a visible font change that no A-stage names, so it was not applied here. It goes to the B9 list as VISIBLE (rank high: it is a parity drift, since 07 already has the fix and 04 / 05 are meant to be its source).
