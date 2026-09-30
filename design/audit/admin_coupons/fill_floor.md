# Fill floor audit · AD-5 and AD-6 (2026-09-30)

**Rule** (`design_intent.md` rules 9–12): on every non-Empty screen the lowest content item at rest ends at y 561 or lower on the screen, which is 75% of the way to the tab bar top (y 748). Empty states centre their card in the free band between whatever sits above it and y 748.

**Method:** `tools/filltool.js`, run in the file with the same code before and after. Fill = the bottom of the lowest item in `Admin / Content` at rest, clipped to 748, divided by 748. A screen whose content runs past 748 (it scrolls) reads 100%. For an Empty card, the value shown is its centre's offset from the band middle (negative = too high).

Before = snapshot `st80` (identical to `st79`). After = `st81`.

| Screen | Before | After | How it was reached |
|---|---|---|---|
| AD-5-0 Manage hub · Success | 100% | 100% | Scrolls (no fix needed). New NeedsYouCard and metric tiles. |
| AD-5-0 Manage hub · Empty | 100% | 100% | Scrolls. |
| AD-5-0 Manage hub · Offline | 100% | 100% | Scrolls. |
| AD-5a Menu · Success | 78% | 89% | Dish cards are PrepCard `Size=Hero` (kcal in ML/Hero Metric beside a P/C/F ring). |
| AD-5a Menu · Empty | card −143 pt | centred (+1) | Gap above the card set so it sits mid-band. |
| AD-5a Menu · Offline | **65%** | 76% | Same hero dish cards. |
| AD-5b Edit dish | 100% | 90% | Fibre, sugar and sodium moved behind "More nutrients" (decided); still above the floor. |
| AD-5b Add dish (Empty) | 97% | 84% | As above. |
| AD-5b Edit dish · Offline | 100% | 98% | As above. |
| AD-5c Menu voting · Success | **72%** | 94% | Vote hero: 76% for, a for/against bar, the dish, "Advice only · you decide", Decide. |
| AD-5c Menu voting · Empty | card −177 pt | centred (+1) | Top padding set so the card sits mid-band. |
| AD-5c Menu voting · Offline | **53%** | 75% (ends at y 562) | Same vote hero, Decide disabled. |
| AD-5c2 Proposals · Success | 98% | 100% | Proposals as full-width PrepCards (students as the number); duplicates behind "Look the same · 3". |
| AD-5c2 Proposals · Empty | card −177 pt | centred (+1) | Top padding. |
| AD-5c2 Proposals · Offline | **59%** | 100% | Same proposal cards (scrolls 50 pt). |
| AD-5d Vote result | **73%** | 84% | Vote hero without the Decide button (replaces the ResultCard). |
| AD-6a Passes · Success | **60%** | 79% | DemandRingCard `Size=Large` (176 pt ring, 196 inside). |
| AD-6a Passes · Empty | card −143 pt | centred (+1) | Gap above the card. |
| AD-6a Passes · Offline | **56%** | 76% | Same large ring (188). |
| AD-6b Pass exception | 78% | 78% | No change. |
| AD-6c Rewards · Success | **68%** | 96% | Budget ring plus four coupons (vertical). |
| AD-6c Rewards · Empty | card −177 pt | centred (+1) | Top padding. |
| AD-6c Rewards · Offline | **49%** | 97% | Budget ring plus four coupons. |
| AD-6c2 Offers · Success / Offline | 49% / 57% | archived | Moved to 99 Archive by the brief. |
| AD-6d Surplus · Success | 77% | 86% | The hero's "4 dishes" is now the big number (ML/Hero Metric). |
| AD-6d Surplus · Empty | card −133 pt | centred (0) | Gap above the card. |
| AD-6d Surplus · Offline | **67%** | 77% | Same big number. |
| AD-6d2 Pickup detail · Success / Offline | 100% / 100% | 100% / 100% | No change. |

**Result:** 16 misses before (bold, excluding the archived Offers screens) and 0 after. No block was added to reach the floor. The heroes were enlarged: a bigger number, a bigger ring, or a data bar or ring added inside the existing hero card.

## Density after (rule 6: at most 3 blocks and 12 text layers at rest)

Measured with `tools/densitytool.js` (same method as `admin_diet/density.md`).

| Screen | Blocks | Text layers | Before (texts) |
|---|---|---|---|
| Hub · Success / Empty / Offline | 2 / 1 / 2 | **15 / 13 / 14** | 11 / 9 / 10 |
| AD-5a · Success / Empty / Offline | 3 / 1 / 2 | 10 / 4 / 8 | 9 / 4 / 7 |
| AD-5b · Edit / Add / Offline | 3 / 3 / 4 | **18 / 17 / 19** | 22 / 21 / 22 |
| AD-5c · Success / Empty / Offline | 3 / 1 / 2 | **13** / 3 / 9 | 9 / 3 / 5 |
| AD-5c2 · Success / Empty / Offline | 2 / 1 / 2 | **14** / 3 / **14** | 17 / 3 / 11 |
| AD-5d | 3 | 12 | 10 |
| AD-6a · Success / Empty / Offline | 2 / 1 / 2 | 10 / 4 / 7 | 10 / 4 / 7 |
| AD-6b | 3 | 11 | 11 |
| AD-6c · Success / Empty / Offline | 2 / 1 / 3 | **26** / 3 / **26** | 10 / 3 / 6 |
| AD-6d · Success / Empty / Offline | 3 / 1 / 2 | 10 / 4 / 9 | 8 / 4 / 7 |
| AD-6d2 · Success / Offline | 3 / 4 | **20 / 20** | 20 / 20 |
| New sheets: Look the same / More nutrients / More nutrients (Add) | – | 6 / 7 / 7 | new |

Over the 12-text target: the hub (six tiles at 3 texts each plus the Needs-you card), AD-5b (a form), AD-5c Success (by 1), AD-5c2 (three proposal cards), AD-6c (four coupons at 5 texts each), AD-6d2 (a detail screen, allowed by decision).
