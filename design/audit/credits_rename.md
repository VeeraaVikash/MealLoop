# Student "Credits" rename (Final-3 H3, 2026-10-05)

Rule: every student string that means the **points balance** reads "Credits", on 04 Student Light, 05 Student Dark and 07 Prototype. Admin (page 10) keeps "Rewards".

**Not changed, on purpose:**
- coupon wording ("How a redeemed reward is collected" is about coupons);
- frame and layer names ("Rewards", "Offer", "Tile / REWARDS"), so that links and the audit tools keep matching;
- canvas section and label texts, and the page-07 gallery title card "M · Rewards".

**Bindings:** every on-screen string was changed through its component property, so no text was detached: NavHeader Title#74:44, EmptyState Title#75:8, BentoTile Label#100:18. On the You tile, the other properties were checked afterwards and are unchanged: Value 120, Unit pts, Meta "Next: Juice". The Label/Eyebrow style sets text case to UPPER, so the tile shows CREDITS, matching SPENDING, ATTENDANCE and REPORTS.

**Re-survey:** 0 strings containing "reward" are left in student phone frames on 04, 05 and 07.

## Component (page 03)

| Component | Old | New |
|---|---|---|
| CreditsChip (the "soon" state text) | Rewards soon | Credits soon |
| Doc / CreditsChip (component note) | Header chip that opens Rewards. Shows the live balance, or "Rewards soon" before … | Header chip that opens Credits. Shows the live balance, or "Credits soon" before … |

The CreditsChip change carries through to every instance that has no override. That covers the HomeHeader component and the Home · Rewards soon frames: 04 ×2, 05 ×2 and 07 ×1 now read "Credits soon".

## Strings changed in frames (40, plus 1 canvas note)

| Page | Frame | Old | New | How |
|---|---|---|---|---|
| 04 | Rewards · Coming soon | Rewards are coming soon | Credits are coming soon | property Title#75:8 |
| 04 | Rewards · Coming soon | Rewards | Credits | property Title#74:44 |
| 04 | Rewards history | Rewards history | Credits history | property Title#74:44 |
| 04 | Rewards · Balance issue | Rewards | Credits | property Title#74:44 |
| 04 | Rewards · Loading | Rewards | Credits | property Title#74:44 |
| 04 | Rewards · Error | Rewards | Credits | property Title#74:44 |
| 04 | You | REWARDS | Credits (shows CREDITS) | property Label#100:18 |
| 04 | Request correction | REWARDS | Credits (shows CREDITS) | property Label#100:18 |
| 04 | Correction · Sent | REWARDS | Credits (shows CREDITS) | property Label#100:18 |
| 04 | Correction · Failed | REWARDS | Credits (shows CREDITS) | property Label#100:18 |
| 04 | Sign out | REWARDS | Credits (shows CREDITS) | property Label#100:18 |
| 04 | You · Offline | REWARDS | Credits (shows CREDITS) | property Label#100:18 |
| 04 | You (full scroll) | REWARDS | Credits (shows CREDITS) | property Label#100:18 |
| 04 | You · Offline (full scroll) | REWARDS | Credits (shows CREDITS) | property Label#100:18 |
| 05 | Rewards · Coming soon | Rewards are coming soon | Credits are coming soon | property Title#75:8 |
| 05 | Rewards · Coming soon | Rewards | Credits | property Title#74:44 |
| 05 | Rewards history | Rewards history | Credits history | property Title#74:44 |
| 05 | Rewards · Balance issue | Rewards | Credits | property Title#74:44 |
| 05 | Rewards · Loading | Rewards | Credits | property Title#74:44 |
| 05 | Rewards · Error | Rewards | Credits | property Title#74:44 |
| 05 | You | REWARDS | Credits (shows CREDITS) | property Label#100:18 |
| 05 | Request correction | REWARDS | Credits (shows CREDITS) | property Label#100:18 |
| 05 | Correction · Sent | REWARDS | Credits (shows CREDITS) | property Label#100:18 |
| 05 | Correction · Failed | REWARDS | Credits (shows CREDITS) | property Label#100:18 |
| 05 | Sign out | REWARDS | Credits (shows CREDITS) | property Label#100:18 |
| 05 | You · Offline | REWARDS | Credits (shows CREDITS) | property Label#100:18 |
| 05 | You (full scroll) | REWARDS | Credits (shows CREDITS) | property Label#100:18 |
| 05 | You · Offline (full scroll) | REWARDS | Credits (shows CREDITS) | property Label#100:18 |
| 07 | Rewards history | Rewards history | Credits history | property Title#74:44 |
| 07 | Rewards · Balance issue | Rewards | Credits | property Title#74:44 |
| 07 | You | REWARDS | Credits (shows CREDITS) | property Label#100:18 |
| 07 | Request correction | REWARDS | Credits (shows CREDITS) | property Label#100:18 |
| 07 | Correction · Sent | REWARDS | Credits (shows CREDITS) | property Label#100:18 |
| 07 | Sign out | REWARDS | Credits (shows CREDITS) | property Label#100:18 |
| 07 | Rewards · Coming soon | Rewards are coming soon | Credits are coming soon | property Title#75:8 |
| 07 | Rewards · Coming soon | Rewards | Credits | property Title#74:44 |
| 07 | Rewards · Loading | Rewards | Credits | property Title#74:44 |
| 07 | Rewards · Error | Rewards | Credits | property Title#74:44 |
| 07 | Correction · Failed | REWARDS | Credits (shows CREDITS) | property Label#100:18 |
| 07 | You · Offline | REWARDS | Credits (shows CREDITS) | property Label#100:18 |

## Canvas note (page 04)

| Old | New |
|---|---|
| Credits chip opens Rewards. Before launch it reads "Rewards soon" (see …) | Credits chip opens Credits. Before launch it reads "Credits soon" (see …) |

Renders: final3/h3/.
