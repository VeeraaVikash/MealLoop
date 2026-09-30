# Admin content diet · density before and after (2026-09-30)

**Method** (`tools/densitytool.js`, run in the file; the same code before and after):
- **Text layers:** visible, non-empty text layers at rest, including those inside instances, whose clipped bounds fall in y 54–748 (between the status bar and the tab bar). Status bar, tab bar, home indicator, Moment note and sample chip are excluded. In sheet frames only layers above the scrim count.
- **Blocks:** content-column items that start above the fold (y < 748). Eyebrow labels, page dots and control rows are not counted. Control rows are the old mess / period chip rows, the Breakfast / Lunch / Dinner control and the new pill row. Every other item counts as one block: cards, rule chips, banners, text lines, buttons and groups.
- The "before" blocks were recounted with this rule from the element lists captured before the edit, because the frames were edited in place. "Before" text counts are the tool's own measurement.
- **Target:** at most 3 blocks and at most 12 text layers.

| Screen | Before blocks | Before texts | After blocks | After texts | Target |
|---|---|---|---|---|---|
| AD-5-0 Manage hub · Success | new | new | 2 | 11 | met |
| AD-5-0 Manage hub · Empty | new | new | 1 | 9 | met |
| AD-5-0 Manage hub · Offline | new | new | 2 | 10 | met |
| AD-5a Menu · Success | 3 | 24 | 3 | 9 | met |
| AD-5a Menu · Empty | 2 | 12 | 1 | 4 | met |
| AD-5a Menu · Offline | 3 | 24 | 2 | 7 | met |
| AD-5b Edit dish | 8 | 22 | 3 | **22** | **not met:** 7 nutrition fields |
| AD-5b Add dish (Empty) | 8 | 22 | 3 | **21** | **not met:** 7 nutrition fields |
| AD-5b Edit dish · Offline | 9 | 22 | **4** | **22** | **not met:** 7 fields, plus the banner |
| AD-5c Voting · Success | 4 | 21 | 3 | 9 | met |
| AD-5c Voting · Empty | 1 | 6 | 1 | 3 | met |
| AD-5c Voting · Offline | 5 | 19 | 2 | 5 | met |
| AD-5c2 Proposals · Success | new | new | 3 | **17** | **not met:** proposals and duplicate stack on one screen |
| AD-5c2 Proposals · Empty | new | new | 1 | 3 | met |
| AD-5c2 Proposals · Offline | new | new | 2 | 11 | met |
| AD-5d Vote result | 7 | 13 | 3 | 10 | met |
| AD-6a Passes · Success | 5 | 18 | 2 | 10 | met |
| AD-6a Passes · Empty | 1 | 8 | 1 | 4 | met |
| AD-6a Passes · Offline | 6 | 19 | 2 | 7 | met |
| AD-6b Pass exception | 7 | 13 | 3 | 11 | met |
| AD-6c Rewards · Success | 3 | 24 | 3 | 10 | met |
| AD-6c Rewards · Empty | 1 | 4 | 1 | 3 | met |
| AD-6c Rewards · Offline | 4 | 23 | 2 | 6 | met |
| AD-6c2 Offers · Success | new | new | 1 | 5 | met |
| AD-6c2 Offers · Offline | new | new | 2 | 6 | met |
| AD-6d Surplus · Success | 4 | 22 | 3 | 8 | met (no scroll) |
| AD-6d Surplus · Empty | 1 | 8 | 1 | 4 | met |
| AD-6d Surplus · Offline | 4 | 21 | 2 | 7 | met |
| AD-6d2 Pickup detail · Success | new | new | 3 | **20** | **not met:** 4 dishes + 4 steps (it is the "see all") |
| AD-6d2 Pickup detail · Offline | new | new | **4** | **20** | **not met:** as above, plus the banner |
| 8 sheet frames (scope ×3, rules ×4, needs review ×1) | new | new | – | 4–6 each | met |

**The 20 existing frames:** 345 text layers before, 182 after (−47%). Without the AD-5b form, 279 → 117 (−58%).

**One big number per screen:** 5a (dish kcal), 6a (196), 6c (₹2,370), 6c2 (50 pts). The hub tiles use ML/Section 22, not the Metric / Hero styles. 5b, 5c, 5c2, 5d, 6b, 6d and 6d2 have no hero number.

**Still heavy** (plain assessment):
- **AD-5c2 Proposals (Success)** is the busiest screen: the three-row list, two buttons and the duplicate stack.
- **AD-5b** is still a seven-field form.
- **AD-6d2** is long, by design, as the detail.

**The opposite risk:** AD-6c2 Offers and the Empty states now leave a lot of empty canvas under one card.

Renders: `before/`, `after/`, `ad5_before_after.png`, `ad6_before_after.png`, `sheets_after.png`.
