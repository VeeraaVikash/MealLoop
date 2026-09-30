# AD-5c2 Proposals redesign · fill, density and bars (2026-09-30)

**Method:** the "after" values are measured with `filltool` and `densitytool`. The "before" values are counted from the `st90` layer tree, read at the start of the pass.

- **Before, Success:** 3 PrepCards with 4 texts each, plus the nav title, 2 buttons and Look the same.
- **Before, Offline:** the banner, 3 PrepCards and the nav title.

Before = snapshot `st90`, after = `st91`. All renders are at scale 1 (393 × 852).

## Screens

| Screen | Fill before → after | Blocks before → after | Texts before → after |
|---|---|---|---|
| Proposals (Success) | 100% (scrolled, ended at y 910) → **85%** (ends at y 634) | 3 → 3 | 16 → **12** |
| Proposals (Empty) | centred (+1) → centred (+1), unchanged | 1 → 1 | 3 → 3 |
| Proposals (Offline) | 100% (scrolled, ended at y 778) → **84%** (ends at y 630) | 2 → 3 | 14 → **12** |
| Needs review sheet | – | – | 6 → 6 (background refreshed) |
| Look the same sheet | – | – | 6 → 6 (background refreshed) |

**Blocks at rest:**
- **Success:** the card and its note (one group), the actions, and "Look the same · 3".
- **Offline:** the banner, the card and its note, and the actions (disabled).

## Bars against the data

- **Track:** 285 pt = the card's inner width (313) minus the icon column (18 + 10).
- **Width:** track × students ÷ 64 (the top proposal), rounded to whole points.

| Rank | Proposal | Students | ChartBar kind | Exact width | Drawn width | Error |
|---|---|---|---|---|---|---|
| 1 | Egg curry on Mondays | 64 | Pill (white) | 285.00 | 285 | 0.00 |
| 2 | Fried chicken daily | 51 | Pill ghost (dashed) | 227.11 | 227 | 0.11 |
| 3 | Pongal on Tuesdays | 47 | Pill lime | 209.30 | 209 | 0.30 |

Offline draws the same three widths. Every bar is within 1 pt of the data.
