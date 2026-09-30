# AD-7d redesign · fill and density (2026-09-30)

**Method:** the same code before and after. `tools/filltool.js` measures fill and `densitytool` (plugin data `mealloop/densitytool`) counts blocks and text layers. Before = snapshot `st84`. After = `st85`.

**Rules:**
- Fill floor (rules 9–12): the lowest item at rest must end at y 561 or lower on the screen (75% of 748). An Empty card must be centred within 8 pt.
- Diet (rule 6): at most 3 blocks and at most 12 text layers.
- Sheets are not held to the fill floor.

## Screens

| Screen | Fill before | Fill after | Lowest item after | Blocks | Texts before | Texts after |
|---|---|---|---|---|---|---|
| AD-7d · Audit log (Success) | 95% | 97% (y 725) | See all · 6 | 3 | 12 | **13** |
| AD-7d · Audit log (Empty) | centred (+1) | centred (+1) | EmptyState (unchanged) | 1 | 3 | 3 |
| AD-7d · Audit log (Offline) | 95% | 96% (y 721) | Entries | 3 | 12 | **13** |
| AD-7d · All activity | 98% | 77% (y 579) | Entries | 1 | **16** | **13** |

Every screen meets the floor.

**Why the counts are 13:**
- **Success:**
  - nav title, type pill, "6 entries today", "1 pending";
  - 3 times and 3 titles;
  - 2 exception pills ("Safety" Stop, "Desk offline" Offline);
  - See all.
- **Offline:** the same, with the banner in place of See all.
- **All activity:** the nav title, plus 6 times and 6 titles. The list alone is 12.

Each item was asked for in the brief. Nothing was cut to reach 12; the options are in the contract.

## Entry sheets (the texts above the scrim)

| Sheet | Texts before | Texts after | Lines under the big line |
|---|---|---|---|
| Biryani · safety queue | 9 | 5 | 3 |
| Sambar fix | 9 | 5 | 3 |
| Pass desk offline | 9 | 5 | 3 |
| Lunch waste | 7 | 5 | 3 |
| Curd · pending | 9 | 5 | 3 |
| Sambar override | 9 | 5 | 3 |
| Type sheet (layout unchanged, background refreshed) | 7 | 7 | – |

## Mono audit (rule 13)

Every JetBrains Mono range on the AD-7d screens and sheets was scanned, and each holds only digits, times, masked IDs, the arrow, or a unit inside a hero number (ML/Hero Unit). No name or sentence is set in mono.

Two numbers still use Inter, because they belong to shared components: "See all · 6" (SettingsRow) and the banner's "2:12 PM". Rule 13 limits where mono can be used; it doesn't require every number to be mono.
