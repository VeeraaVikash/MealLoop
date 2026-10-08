# Card weight and pattern (FA-2, FA-5) · Brand audit B3 (2026-10-08)

Source: the B2 sweep (`fa16` rows). A "tall card" is a direct child of the content stack, filled with surface, not the hero, and taller than 25% of the screen (213 pt). "Two heroes" counts direct children filled with hero-bg. Exempt: sheets, empty states, loading / error, lock screens, the state gallery, full-scroll copies, and the Community list.

## Tall non-hero cards

Nearly every hit is a **list card**: one white card that holds a list of rows (dishes, toggles, timeline steps, expenses, log entries). It is tall because it has many rows, not because of padding, so the brand rule's concern (a weighty card competing with the hero) does not apply in the same way. They are listed by type.

| Kind | Student (04; 05 / 07 the same) | Staff (09) | Admin (10) |
|---|---|---|---|
| Lists of rows (OK by intent) | Dishes 294 (Meal detail, Intent, Answer states ×20); Your plate Dishes 760–868 ×6; Timeline 258 ×2; Weekly bars 301 ×5; Expenses 321 ×3; Toggles 301 ×3; Settings 343 ×2; History 239; Topics 229; Week · last week 322 ×2 | "What you do (display only)" 228–288 ×4; Dishes (display only) 216 ×4 | Messes 283–301; Shortages 414–424; Closed this week 245; Timeline 270–378 ×5; Open issues 315; Weekly reports 332; Handover steps 272 ×2; Staff · permissions 303 ×2; Roles 483; Entries 302–509 ×3; Decisions 515–528 ×2; Complaints 305 ×2; Cases 327; Rail · Today 412–523 ×3; Gaps 251 |
| **Single-content cards worth a look** | Entry · QR Verification Card 498 (this is the screen's hero in practice); Crowd · Detail / Stale "Today so far" 228; Waste · Dish breakdown 269; You · Daily breakdown "Meals card" 288 ×2; You · Weekly view "Bars card" 278; **You · Nutrients detail "Nutrients card" 582** | MS-B6 Pass problem "Explain" 380; MS-E2 Alert detail "Alert card" 309 | AD-4e Insights — Meal "Card · The chain" 416 ×2; AD-1f Watch "Tile · Shortages" 242 ×2 |
| Report thumbnails (accepted) | — | — | AD-4f thumbnails 521, report viewer page 500 |

**Padding-only height:** not machine-checked in this run (`fa1` measures card height, not inner slack). Spot check of the "worth a look" cards: none has a fixed height with empty padding; each hugs its content.

## Two cards of equal (hero) weight

| Page | Frames | Note |
|---|---|---|
| 04 / 05 / 07 | Home · Offline, Meals · Offline, Rewards · Offline, You · Offline, Your plate · offline | The second black block is the OfflineBanner, not a card: accepted |
| 04 / 05 / 07 | **Intent · Correction requested; Entry · Under review; Report · Urgent** | Two black cards: candidates (VISIBLE) |
| 10 | 23 Offline states (AD-1a … AD-7d, AD-5a) | OfflineBanner again: accepted |
| 10 | **AD-3c Issue detail — Dish feed (×2 frames); AD-1d Decision — Curd override** | Two black cards: candidates (VISIBLE) |
| 09 | — | 0 |

## ListRow + pill + chevron where a distinctive pattern exists

| Frame | ListRows | Distinctive pattern available | Class |
|---|---|---|---|
| 04 / 05 / 07 Entry history, Entry · Under review | 14 each (a week of attendance) | A week grid of BentoTile or a DateStrip with marks would show the week at a glance | VISIBLE (student screen that should use bento) |
| 10 AD-3d Community moderation | 7 (5 Offline) | IssueCard (already the admin pattern for issues) | VISIBLE |
| 10 AD-4d Reports & exports | 5 | report thumbnails (as AD-4f) | VISIBLE |
| 10 AD-5-0 Manage hub | 4 | BentoTile hub (F2 design) | check: the hub's rows are navigation, kept on purpose in F2 |
| 10 AD-6d2 Pickup detail | 4 | TimelineStep | VISIBLE |
| 10 AD-1f Watch | 3 | — | fine |

## Student screens that should use tickets or bento

| Screen | Now | Suggestion |
|---|---|---|
| Rewards history | list card "History" (239) | CouponCard rows in the Used state, the same object the student redeemed |
| Entry history / Entry · Under review | 14 ListRows | week bento (above) |
| You · Nutrients detail | one 582 pt card | KcalGauge + MacroRing bento, like Your plate |

All suggestions are VISIBLE: they go to the B9 list, none is applied.
