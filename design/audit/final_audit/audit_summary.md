# Brand audit · summary (B9, 2026-10-08)

Scope: components (page 03), tokens and text styles, and every phone frame on 04, 05, 07, 09 and 10 (1,115 frames). Snapshots: st229 (B0) → st237 (Part B start, equal to the A7 end). The detail is in the stage files listed under each row.

## Per-check counts

| Check | Result | File |
|---|---|---|
| Components and sets | 135 (97 sets, 38 single); 120 in use, 5 only on page 03, 5 archive-only, 5 with zero instances (moved to Deprecated) | component_inventory.md, deprecations.md |
| Raw paints | 1,023 → 996 after 27 exact-match bindings; the rest are exceptions (886 boolean operands never render) | token_audit.md |
| Unstyled text | 484 → 352 after 132 exact-match styles; 263 are the A4 report's own scale | text_style_audit.md |
| Mono words (rule 13) | 04 1,165 · 05 1,229 · 07 8 (kept units) · 09 9 (placeholder) · 10 0 · components 0 | text_style_audit.md |
| Component descriptions | 135 / 135 | component_hygiene.md |
| Fixed-size text boxes in components | 41 → 15 | component_hygiene.md |
| Disabled shown by opacity | 0 | component_hygiene.md |
| Wash inside a component | 0 | brand_rule_components.md |
| Lime on light outside rule V2 (components) | 13 components | brand_rule_components.md |
| Lime text on white | 0 | brand_rule_components.md, frame_checks.md |
| Contrast under 4.5:1 (frames) | 04 10 · 05 13 · 07 10 · 09 0 · 10 6 (lock-screen mock aside: 05 3, 10 6) | frame_checks.md |
| Fill under 75% (not exempt) | 04 14 · 05 14 · 07 14 · 09 10 (bottom-action reference) · 10 0 | frame_checks.md |
| Text under 12 pt | 0 (tab labels, report thumbnails accepted) | frame_checks.md |
| Targets under 44 / 56 pt | 0 (09: 3 accepted time skips) | frame_checks.md |
| Real truncation | 0 | frame_checks.md |
| Horizontal overflow | 2 frames (+1 full-scroll copy) | frame_checks.md |
| Two equal black cards | 5 screens (OfflineBanner pairs excluded) | card_weight_and_pattern.md |
| Detached instances | 1 (×3 pages) | conformance.md |
| Non-standard Back | 0 | conformance.md |
| Sheets without grab / Close | 0 / 6 accepted | conformance.md, ios_checklist_final.md |
| Banned words (banned sense) | 0 (1 OWNER question) | conformance.md |
| Key numbers with two values | 0 | consistency.md |
| Frames without a Moment note / sample chip | 0 that need one | consistency.md |
| Stray flow starts / duplicate names | 0 / 0 | consistency.md |
| Reachability bugs / dead ends | 0 / 0 | prototype_check.md |
| DEMO.md hops failing | 0 of 91 | prototype_check.md |
| Sending frames that stall | 0 | prototype_check.md |
| Tab roots with Back | 0 (09 demo Back accepted) | ios_checklist_final.md |
| iOS 27 kit | absent | ios_checklist_final.md |

## Ranked fix list

### SAFE (applied in C1, in the brief's order)

| # | Item | Result |
|---|---|---|
| 1 | Tokens bound | Done in A2 (27). No exact-match paint is left that stays invisible in both modes. |
| 2 | Text styles applied | Done in A3 (132). None left on an exact match. |
| 3 | Hit areas | Nothing to do: 0 targets under the minimum. |
| 4 | Labels, Moment notes, sample chips | Nothing to do: every data frame has all three. |
| 5 | Stray starts | Nothing to do: exactly 7. |
| 6 | Banned words → standard words | Nothing to do: 0 in the banned sense. |
| 7 | Parity drift from the Light source | Nothing SAFE: the only drifts are VISIBLE (mono) or OWNER (07 tracker card). |
| 8 | Unreachable-by-bug links | Nothing to do: 0 bugs. |
| 9 | DEMO.md | All 91 hops pass. Add a note on the staff-home demo Back (doc only). |
| 10 | Close closed gaps | None newly closed by the file. |
| 11 | MASTER_CONTEXT facts | PROJECT_CONTEXT and design_intent: MessBadge / MetricBadge → CrowdBadge / BentoTile; add the Deprecated section and the Brand sheet; STATE.md snapshot; a "Superseded" pointer at the end of prototype_contract.md. |

### VISIBLE (needs a design change; ranked)

1. **Mono words on 04 / 05** (gap 342): 2,394 words. The fix exists (mw10, as G10 did on 07 / 10).
2. **HoldToConfirm in Dark** (gap 343): "Hold to use" 1.04:1 on 05 Pass · Confirm.
3. **ink-secondary on black** (gap 344): AD-6b "Missed" ×5 frames and AD-3a Offline "Not now", 2.81:1.
4. **Lime on light at component level** (gap 346): 13 components, CommentComposer Send first.
5. **Fill floor** (gap 330 + 347): 11 list screens plus You · Weekly view.
6. **Two equal black cards** (gap 352): 5 screens.
7. **Pattern upgrades** (B3): Entry history → week bento; AD-3d rows → IssueCard; Rewards history → CouponCard rows; You · Nutrients detail → bento.
8. **Contrast 05 Entry · Under review** (gap 345).
9. **Horizontal overflow** on Waste · Partial / How this is measured (gap 349).
10. **Live near-duplicates**: DishRow → DishLine, StatusTag → StatusPill, RewardCard → CouponCard.
11. **Missing component states**: Disabled on six pickers; Failed / Offline on SupportButton, IssueHero, HoldToConfirm, CommentComposer.
12. **MetaChip 30 pt** at component level (gap 351); fixed-size texts (gap 354).
13. **Admin status bars 9:41** vs the Moment (gap 337).
14. Full-scroll copies at 16 pt (gap 355); gallery header text 1/255 off the tokens.

### OWNER (a decision or an action outside the file)

1. Create the three prototype links (Present → pick the Sign in start → Share) and run a presentation-mode check.
2. iOS 27 kit: place the 8 kit instances in a frame named "iOS 27 kit" on page 03.
3. Confirm the sample numbers with SRM (600 and 920 appear on no screen).
4. Dark ribbon art for OnboardingArt (placeholder on 05 and 09).
5. 07-only Home tracker card (gap 348): add to 04 / 05 or remove from 07.
6. MS-C2 "Served so far" (a portion count, not scans): keep or "Given out so far".
7. Link the four unlinked tappables with existing destinations (gap 353).
8. Lime as a "current" marker on light (SlotChart Now, TimeRail, MealSectionHeader Serving now): treat as "current step" or switch to ink.
9. Naming: property names (Title Case), token groups, rename lime-outline, merge ink-strong, retire the pre-rebrand collections.
10. Delete the 5 deprecated components and, if wanted, the archive-only ones (StaffTopBar, ShiftCounter, Viewfinder, KitchenSeesBlock, NeedsYouCard) together with their 99 Archive frames.
11. The 26 hidden layers with no visibility property (after an instance scan).
12. Earlier decisions still open: Turnout and reasons page; admin coupon wallet.

## Accepted exceptions (not counted as failures)

- Rule 9a: empty, one-message, loading, typing, error and receipt states are exempt from the fill floor; rule 9b: AD-2b at 65%.
- Staff task frames measure fill against their fixed bottom action.
- The 96-frame student state gallery has no flow start.
- Page 11 Admin Dark is stale and out of scope; 99 Archive is out of scope.
- The 3 staff status-bar time skips (54 pt) and the staff-home demo Back.
- The AD-4f report thumbnails keep the document's lime and its 10 pt A4 type (scaled on screen).
- The Pass confirm and Reminder sheets close with Cancel / Not now; Request deletion and Sign out are iOS alerts.
- The iOS lock-screen mock (LockScreen, LockNotification) keeps the system colours and grey app label.
- Boolean-operation operands (#D9D9D9) never render; Figma's default component-set outline (#9959F2).
- Mono units "5H / 2D / 1D / 3D" on IssueCard (07).
- The 1:41 PM drill-downs and the 11:18 AM Curd decision in the Today family.

## New gaps

342–355 (prototype_gaps.md, "Brand audit" section).
