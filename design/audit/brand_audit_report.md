# Run BRAND-AUDIT · final report (2026-10-08)

Figma `nzzTAm9YnJRSdKEeYUWUEb`, branch `claude/mealloop-ios-design-e9n1n5`. Brand component refinement, final audit, safe fixes and sign-off. Every stage opened with a full-walk snapshot equal to the previous end (st229 → st240), was committed and pushed, and has a row in run_status.md. No stop condition was hit. The file ends with exactly 7 flow starts. Detail files are in `final_audit/`.

## Stages

| Stage | Result | Snapshot | What changed in Figma | Output |
|---|---|---|---|---|
| B0 Preflight | done | st229 = st228 | — | run_status.md |
| A1 Inventory | done | st229 (read only) | — | component_inventory.md |
| A2 Tokens | done | st230 → st231 (07: 15 gallery cards, 03: 1 set) | 27 raw paints bound to tokens; 10 / 10 renders identical | token_audit.md |
| A3 Text styles | done | st232 → st233 (nested only) | 132 exact-match styles applied; 10 / 10 renders identical | text_style_audit.md |
| A4 Hygiene | done | st233 → st234 (nested only) | 4 descriptions; 26 fixed text boxes → auto height; 17 / 17 renders identical | component_hygiene.md |
| A5 Deprecations | done | st234 → st235 (03: −5 top level, +1 section) | "Deprecated" section; 5 zero-instance components moved | deprecations.md |
| A6 Brand rule V2 | done (report) | st235 | — | brand_rule_components.md |
| A7 Brand sheet | done | st235 → st236 (03: +1 board) | "Brand sheet · new" board | brand_sheet.png |
| B1–B9 | done (report) | st237 = st236 | — | frame_checks, card_weight_and_pattern, conformance, consistency, prototype_check, ios_checklist_final, doc_sync, audit_summary |
| C1 SAFE fixes | done | st238 → st239 (03: 1 section fill) | Deprecated section fill bound to surface (1 / 1 identical); doc facts corrected | run_status.md |
| C2 Re-check | done | st239 | — | before_after.md |
| D1 Exports | done | st239 → st240 = st239 | temporary 2× clones, removed in the stage | export/ (27 PNG) |
| D2 Release checklist | done | st240 | — | RELEASE_CHECKLIST.md |
| D3 Report | done | st240 | — | this file, STATE.md, PROJECT_CONTEXT.md |

## Decisions made without asking

1. **MASTER_CONTEXT.md does not exist:** PROJECT_CONTEXT.md is the master context (as the brief allows).
2. **Render proof** is a hash of the PNG export at scale 1 (`px15`): identical bytes mean identical pixels, so a 1 pt anti-aliasing allowance was never needed. A repeat export before each edit confirmed the hash is stable.
3. **Token binding (A2)** only when the raw value equals the token in the mode where the node renders. Paints inside components that are also used on 05 Dark (lock-screen mock, CreditsChip) were left raw, because binding would change the Dark render.
4. **Fixed text → auto height (A4)** kept only when the box and every instance on 04 / 05 / 07 / 09 / 10 / 99 stayed the same size. **Logged slip, repaired in the same stage:** the first revert pass also fixed the ListRow Stacked Name (originally auto height); it was restored and long names read 48 pt again.
5. **Property names and hidden layers (A4)** not changed: stored builders set properties by name, and instances may override hidden layers.
6. **A deprecated variant** (AtMessTile Pass ×3) cannot leave its set; listed only.
7. **Brand sheet name:** "Brand sheet · new" (the file's " · new" convention) instead of the brief's "Brand sheet . new".
8. **Renders at scale 2** come from temporary 2× clones, removed in the same stage: the screenshot service renders at natural size only and its download host is blocked here.
9. **Mono words on 04 / 05** (A3, B5) are a font change, so they are VISIBLE, not SAFE, although the fix already exists for 07 and 10.
10. **Fill exemptions** applied as written in rules 9a / 9b; staff task frames are measured against their fixed bottom action (Final-3 H6).
11. **Nearest names for D1:** "Plate tracker · Day" → You · Daily breakdown; "To do" → AD-1c Today — Decisions (its title).
12. **Report-only scans** (`fa16`, `brand16`) were written as new tools and stored in the file and in `tools/`; existing tools were reused for targets, truncation, mono words, reachability and the manifest.

## Brief versus rules

| Brief asked | Rule | What was done |
|---|---|---|
| C1.7 "parity drift corrected from the Light source" | NO REDESIGN; only named visible changes | The only drifts are visible (mono: 07 is right and the source is wrong; 07's extra tracker card). Not corrected; logged as VISIBLE / OWNER |
| A5 "move zero-instance components" for every near-duplicate | Move only at zero instances | Only the 5 true zero-instance components moved; 14 others listed |
| "Fix only if invisible" for lime and contrast (A6) | — | Every lime or contrast fix changes a colour, so none was applied |
| D1 "export at scale 2" | Never leave copies; diff must stay clean | Clones were created and removed within D1; st240 = st239 |

## Ranked VISIBLE list

1. Mono words on 04 / 05 (gap 342).
2. HoldToConfirm "Hold to use" in Dark, 1.04:1 (gap 343).
3. ink-secondary on black, 2.81:1: AD-6b "Missed", AD-3a Offline "Not now" (gap 344).
4. Lime on light in 13 components (gap 346).
5. Fill floor: 11 list screens (gap 330) and You · Weekly view (gap 347).
6. Two equal black cards on 5 screens (gap 352).
7. Pattern upgrades: Entry history week bento, AD-3d IssueCard, Rewards history CouponCard rows, You · Nutrients detail bento.
8. 05 Entry · Under review tag, 2.26:1 (gap 345).
9. Horizontal overflow on Waste · Partial / How this is measured (gap 349).
10. Swap live near-duplicates: DishRow, StatusTag, RewardCard.
11. Missing component states (Disabled on six pickers; Failed / Offline on four controls).
12. MetaChip 30 pt and 15 fixed text boxes (gaps 351, 354).
13. Admin status bars 9:41 vs the Moment (gap 337).
14. Full-scroll copies at 16 pt (gap 355); gallery header text 1/255 off the tokens.

## Ranked OWNER list

1. Create the three prototype links and run a presentation-mode check.
2. iOS 27 kit: place the 8 instances in "iOS 27 kit" on page 03.
3. Confirm the sample numbers with SRM.
4. Dark ribbon art.
5. 07-only Home tracker card (gap 348).
6. MS-C2 "Served so far" wording.
7. Link the unlinked tappables with existing destinations (gap 353).
8. Lime as a "current" marker on light: allowed or not.
9. Naming: property names, token groups, lime-outline, ink-strong, pre-rebrand collections.
10. Delete the deprecated and archive-only components (with their 99 frames).
11. The 26 hidden layers with no visibility property.
12. Earlier: Turnout and reasons page; admin coupon wallet.

## Components

| Change | Components |
|---|---|
| Added | none (the brand sheet is a board of instances, not a component) |
| Moved to Deprecated (0 instances) | KcalRing → KcalGauge; PlateDishRow → DishPortionRow; MessBadge → CrowdBadge / StatusPill; MetricBadge → BentoTile; WasteBar → ChartBar |
| Edited, invisible (proved by render) | MenuDishTile (2 fills bound), LockScreen (set background bound); LockNotification, ReportTicket, IssueCard, MealRow, RewardCard, OnboardingPage (text styles); ReportTicket, IssueCard, LockScreen, MacroRing, MessBadge, LiveDial (auto-height text); DatePill, StaffTopBar, MenuDishTile, PlateRingHero (descriptions) |
| Listed as deprecation candidates (have instances) | PortionSlider, ScrollEdge, SupportButton, WeekBars, MealSectionHeader, StaffTopBar, ShiftCounter, Viewfinder, KitchenSeesBlock, NeedsYouCard, DishRow, StatusTag, RewardCard, AtMessTile Pass variants |

## New gaps

342–355 (prototype_gaps.md, "Brand audit" section). None closed.

## Tools added

`tok15.js`, `txt15.js`, `px15.js`, `brand16.js`, `bs17.js`, `fa16.js`, and `tools/README.md` (new).
