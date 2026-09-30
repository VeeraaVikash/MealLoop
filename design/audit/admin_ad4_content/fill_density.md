# AD-4 Insights content pass · fill, density and numbers (2026-09-30)

**Method:** `filltool` and `densitytool`, the same code before and after. Before = snapshot `st98`, after = `st99`. All renders are at scale 1 (393 × 852).

## Fill and density

| Screen | Fill before → after | Blocks | Texts before → after |
|---|---|---|---|
| AD-4a · Insights (Success) | 99% (scrolled) → **95%** (y 707, no scroll) | 3 → 3 | 30 → **19** |
| AD-4a · Insights (Empty) | 60% (not an EmptyState) → **centred** (offset +1) | 2 → 1 | 12 → **7** |
| AD-4a · Insights (Offline) | 99% (scrolled) → **92%** (y 689) | 3 → 3 | 30 → **19** |
| AD-4c · Trends | 85% → **90%** (y 674) | 1 → 1 | 12 → **12** |
| AD-4e · Meal drilldown (Success) | new → **77%** (y 573) | 2 | **12** |
| AD-4e · Meal drilldown (Offline) | new → **85%** (y 633) | 3 | **13** |

**Why AD-4a has 19 texts** (the full spec, as the owner chose):
- nav title and subtitle (2);
- mess and period pills (2);
- hero: two numbers and two deltas (4);
- five tiles, each with a number and a label (10);
- the "look closer" row (1).

**Why AD-4e Offline has 13:** Success's 12 plus the Offline banner.

## Where each number comes from

| Number | Shown on | Source |
|---|---|---|
| 642 kg wasted | AD-4a hero | AD-4c hero, AD-4d "642 kg" |
| −38 kg vs last week | AD-4a hero | AD-4c weeks: 680 → 642 |
| −13% since 8 Jul · all messes | AD-4a Trends tile, AD-4c chip | AD-4c: 742 → 642 |
| 546 kg wasted (3 of 4 messes) | AD-4a Offline hero | the earlier AD-4a Offline (331 + 215) |
| 2 of 3 | AD-4a Prep accuracy tile | AD-4b "2 of 3 meals on target" (Main Mess, Tue 13 Aug) |
| 4 flagged (6 / 4 / 3 / 2 reports) | AD-4a Dishes tile | AD-3a "Feedback · 4" (Sambar, Rice, Paneer, Curd), MS-D2 |
| 5 ready | AD-4a Reports tile | AD-4d "Export 5 reports" |
| 18 kg left on plates | AD-4e hero | MS-D1 / D1a "Plate waste · whole meal · 18 kg", audit log 12:40 PM |
| 1 shortage alert | AD-4e hero | AD-2c: Paneer butter masala · Main Mess · at risk (low data) |
| Sambar 42 → 50 L · +19% | AD-4e cause 1 | MS-C4 / C4a / D4, AD-1b "Sambar · Override · 50 L", audit log 10:47 AM |
| 712 came of 860 expected · −17% | AD-4e cause 2 | AD-1a / AD-1b (1:40 PM). The −17% is derived: 148 ÷ 860 = 17.2% |
| 18 of 214 passes unused · 8% | AD-4e cause 3 | AD-6a "196 of 214 used · 18 expired unused". The 8% is derived: 18 ÷ 214 = 8.4% |
| sambar too salty · 6 reports | AD-4e note | AD-3a, MS-D2, MS-D3, audit log |

## New sample data (logged in the contract)

| Number | Where | Meaning |
|---|---|---|
| **6 shortage alerts**, last week (5–11 Aug), all messes | AD-4a Success hero | Count of AD-2c-style alerts (running out or at risk) across the week |
| **6** the week before (29 Jul – 4 Aug) | AD-4a Success delta "No change vs last week" | Flat week on week, while waste fell 38 kg |
| **5 shortage alerts**, 3 of 4 messes | AD-4a Offline hero | Annexe did not report |
| **Turnout 84%**: came 84%, on leave 6%, didn't come 10% (last week, all messes, all meals) | AD-4a Turnout tile (locked) | The three turnout groups (rule 16). The bar is 44 / 3 / 5 pt of 52, by largest remainder |

## AD-4e cause bars

- **Metric:** how far each factor was off plan.
- **Track:** 285 pt, which is 19.05% (the largest factor).

| Rank | Factor | Off plan (exact) | Bar exact | Bar drawn |
|---|---|---|---|---|
| 1 | Sambar raised 42 → 50 L | +19.05% | 285.00 | 285 |
| 2 | 712 came of 860 expected | −17.21% | 257.49 | 257 |
| 3 | 18 of 214 passes unused | 8.41% | 125.85 | 126 |

**Left out of the bars:**
- "Too salty · 6 reports" has no plan to compare against, so it appears as a one-line note instead.
- "Rice 7 kg unserved" is an outcome that was offered as surplus (AD-6d), not a cause.
