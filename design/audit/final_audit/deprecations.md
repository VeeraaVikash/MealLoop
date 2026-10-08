# Deprecations · Brand audit A5 (2026-10-08)

## Moved to the "Deprecated" section (page 03)

A new section named **Deprecated** (1734:124658) sits below all existing page-03 content (x 0, y 17,220). Each component was re-counted with `getInstancesAsync` immediately before the move (0 instances on every page, including 99 Archive and the page-03 usage boards). The node ids are unchanged, so nothing that referred to them breaks. Each description now starts with "Deprecated: use … Zero instances at the 2026-10-08 brand audit (A5); kept for reference, do not use."

| Component | Id | Use instead |
|---|---|---|
| KcalRing | 325:1653 | KcalGauge |
| PlateDishRow | 326:1725 | DishPortionRow |
| MessBadge | 814:87225 | CrowdBadge, or StatusPill for the mess state |
| MetricBadge | 881:1850 | BentoTile (or HeroNumber on the black hero) |
| WasteBar | 881:1872 | ChartBar (Never served / Left on plates / Donated) |

**Snapshot diff (st234 → st235):** page 03: 5 removed from the page top level (the five above, now inside the section) and 1 added (the section); 0 changed; every other page 0; 7 flow starts. Moves only, as required.

## Still has instances: not moved (deprecation candidates)

| Component | Id | Where its instances are | Proposed replacement | Note |
|---|---|---|---|---|
| PortionSlider | 326:1724 | Only inside PlateDishRow (now deprecated) | PortionControl | Becomes zero-instance once PlateDishRow is deleted by the owner |
| ScrollEdge | 74:288 | Page 03 "Usage / ScrollEdge" board only | ScrollEdgeFade (Style Plain / Wash) | Remove the usage instance, then deprecate |
| SupportButton | 81:973 | Page 03 "Usage / SupportButton" board only | IssueHero (has Support / Sending / Supported) | same |
| WeekBars | 81:1082 | Page 03 "Usage / WeekBars" board only | ChartBar | same |
| MealSectionHeader | 78:1798 | Page 03 usage board; 99: MS-E-empty, MS-C5, MS-H3, MS-E2, MS-E | Meals menu section titles (the 4A menu layout) | Archive-only users |
| StaffTopBar | 1427:2333 | 50 instances, all on 99 (MS-A / B / C / E / F / G archived staff frames) | NavHeader + BackButton + StaffTabBar | Archive-only |
| ShiftCounter | 732:13 | 16 on 99 (MS-A1–A6, MS-B1–B8) | Staff home cards (G run) | Archive-only |
| Viewfinder | 732:20 | 4 on 99 (MS-A1, MS-A6, MS-B1, MS-B8) | The live scanner frame on 09 (built as a loose "Viewfinder" frame) | Archive-only |
| KitchenSeesBlock | 764:84423 | 5 on 99 (MS-C4a, C4b, C5, D1a, D3) | PrepCard | Archive-only |
| NeedsYouCard | 993:1882 | 1 on 99 (AD-5-0 Manage hub (Success) · before) | Today · Now hero (F1) | Archive-only |
| DishRow | 78:1834 | 04 / 05 / 07: Feedback · Pick dish ×3 and Search · Menu result ×1 each; 03 usage board | DishLine (On light) | Swap is VISIBLE (63 pt row vs 56 pt) → B9 |
| StatusTag | 75:177 | 04 / 05 / 07 Rewards · Coming soon (1 each); inside RewardCard; 99 (MS-B7 ×6, retired Entry · History ×12); 03 usage board | StatusPill (Success / Hold / Stop / Offline / Sent / Lapsed) | 19 values, several outside the A6 vocabulary; swap is VISIBLE → B9 |
| RewardCard | 103:1408 | 04 / 05 / 07 Rewards · Balance issue ×2 each; 99 Offer · Juice ×6, Offer · Not enough ×6 | CouponCard | Different layout; VISIBLE → B9 |
| AtMessTile, variants Pass Available / Pass Redeemed / Pass Now | 77:340 | 0 live instances of these three variants (all 198 live tiles are Type=Attendance) | SpecialPassTile | A variant cannot leave its set without breaking the set; listed only |

Archive-only components stay where they are: deleting or moving them would break the 99 Archive frames, and the rule allows a move only at zero instances.
