# Prototype gaps (Stage 0 audit, 2026-09-28)

This audit was read-only and nothing was changed. The file-wide diff is empty; see `prototype_contract.md` §0.8.

**Severity:**
- **High:** a flow is broken, or a requested path is missing.
- **Med:** the prototype works but behaves inconsistently.
- **Low:** cosmetic or documentation only.

| # | Frame(s) | Issue | Severity | Suggested fix (stage) |
|---|---|---|---|---|
| 1 | Section H, H1–H13 (pages 04 and 05) | Not reachable from the app prototype on page 07. Meal detail has no path into the tracker. | High | Stage 3: add Answer Yes · Saved → H1 and the rest of the tracker path. |
| 2 | H14 "About estimates" | The frame does not exist. | High | Stage 2: build it as a bottom sheet, opened from the Estimate pill and closed with BACK. |
| 3 | H5 Your plate · offline | No links in or out. | High | Stage 3: H2 Save → H5 when offline; H5 retry → H4. |
| 4 | H8 Weekly view | No links in or out. | High | Stage 3: H6 week toggle → H8; back → H6. |
| 5 | H9 Quick add | No links in or out. | High | Stage 3: H6 "+" → H9; close → BACK. |
| 6 | H11 Your plate · numbers hidden | No links in or out. | High | Stage 3: H13 toggle → H11. |
| 7 | H7 Nutrients detail, H10 Daily goal | Dead ends: there is no back link. | High | Stage 3: add BACK on the nav chevron. |
| 8 | H13 Settings · Nutrition | Not reachable from You. There is no "Nutrition" row. | High | Stage 3: add the row on You → H13. |
| 9 | Pages 04/05 "Flow 1/2", "Flow 2/3" | Figma created these starting points automatically at H1 and H12. Their names don't follow the contract. | Low | Stage 3: keep one start point, "Plate tracker", at H1. Leave H12 as a first-run branch. |
| 10 | Page 07, whole prototype | There is no Dark prototype at all: page 05 has no app-level links. Every Light link lacks a Dark twin. | Med | Needs a decision (open question 1). The brief's R5 requires Dark twins for new links. |
| 11 | Entry · Under review | Nav back NAVIGATEs to Entry history instead of BACK. | Med | Stage 1: switch it to BACK. |
| 12 | Pass · Live 1, Live 2, Live 3 and Pass · Used | Nav back NAVIGATEs to Home · Afternoon instead of BACK. | Med | Stage 1: switch to BACK, unless Pass is meant to always return Home (open question 2). |
| 13 | 10 sheet-close links on page 07 | Close uses NAVIGATE to a fixed frame; the other 12 use BACK. The same action has two behaviours. | Med | Stage 1: normalise to BACK (R2). |
| 14 | Onboarding Carousel 1–3, Sign in, Verifying, All set (L, D, 07) | Neither the "MealLoop" name nor the ribbon mark appears. | Med | Stage 1: add AppWordmark to splash, welcome and sign-in. |
| 15 | Home · Morning, Afternoon, During meal, After last meal (L, D, 07) | No app name in the header. | Med | Stage 1: Home header component with the wordmark. |
| 16 | You / Settings | No "About MealLoop" row. | Low | Stage 1. |
| 17 | TabBar `74:236` | Has no Search button or Search section; S1–S5 do not exist. | High | Stage 1. |
| 18 | 03 Components: NavHeader, GlassSheet, IssueCard, OnboardingPage | Instance and text counts vary with lazy loading. The API can't check them against version history. | Low | Report only. Treat as a snapshot artifact (see §0.8). |
| 19 | 00 Before (139 links, 4 flows) | Legacy prototype still clickable in the file. | Low | Leave as is. It is out of scope. |
| 20 | Waste · How this is measured, Crowd · About this estimate, Offer · Not enough | These exit only through BACK. That is correct for info sheets. | – | None. Recorded so later audits don't flag them. |

## Open questions

1. **Dark prototype.** Should Stage 1 and later build a Dark twin of the whole page-07 prototype, or only Dark twins of new links on page 05? The brief requires Dark to match Light, but no Dark prototype exists today.
2. **Pass back links.** Pass · Live and Pass · Used send "back" to Home · Afternoon. Is that a deliberate "done, go home", or should it be BACK?
3. **Prototype variables.** "First run only" for H12 in Stage 3 needs a boolean prototype variable. Is it OK to introduce one (R7)?

## Stage 0.5 update (2026-09-28)

| # | Status |
|---|---|
| 11 | **Kept fixed.** Entry · Under review is only reachable by a timeout, so BACK would loop. See contract §0.5.3. |
| 12 | **Kept fixed**, for the same reason: all Pass · Live/Used frames are entered by timeouts. |
| 13 | **Partly fixed.** 4 of 11 Close/Cancel links are now BACK. 7 stay fixed because BACK would land on a sheet state or loop (§0.5.3). |
| 9 | Starting points on 04 and 05 renamed to "Plate tracker (design page)". |

### New findings (already in the file before this stage, not changed)

| # | Frame(s) | Issue | Severity | Suggested fix |
|---|---|---|---|---|
| 21 | Community · Supported | Its BACK link returns to Community · Sending, which times out back to Supported. The user is stuck. | High | Make Community · Sending → Supported `navigation: SWAP` (it then leaves no history), or make Back a fixed link to Community · Detail. |
| 22 | Comments · Pending | BACK → Comments · Sending → timeout → Pending. Loop. | High | SWAP on the Sending → Pending timeout. |
| 23 | Community · Comments | Reachable from Comments · Reported through a timeout, and it has a BACK link. BACK can reopen Comments · Reported. | Med | SWAP on the Reported → Comments timeout. |
| 24 | Spending · This week | Reachable from Deleting through a timeout, and it has a BACK link. BACK returns to the Deleting sheet, which times out again. | High | SWAP on the Deleting → This week timeout. |
| 25 | Spending · Saved | Reachable from Add expense · Saving through a timeout, and it has a BACK link. Loop. | High | SWAP on the Saving → Saved timeout. |
| 26 | Community · Suggestion | "Me too" goes to Community · List. Probably intended to go to a supported state. | Low | Confirm the intended destination. |

## Stage 1 update (2026-09-28)

| # | Status |
|---|---|
| 21–25 | **Fixed.** The looping BACK links were replaced with fixed parent links (contract §1.0). |
| 14 | **Partly fixed.** Wordmark added on Sign in only, as instructed. Carousel 1–3, Verifying and All set still have no name (by decision). |
| 15 | **Fixed.** HomeHeader carries the wordmark on every Home state. |
| 16 | **Fixed.** About MealLoop screen and You row added. |
| 17 | **Fixed.** Search button, Search variant, S1–S5. |

### New findings

| # | Frame(s) | Issue | Severity | Suggested fix |
|---|---|---|---|---|
| 27 | Logo component (Type=Mark/Lockup) | The tile fill is hard-coded white. In Dark the ink strokes turn light and the mark disappears. This affects Onboarding · Welcome (Dark) and the lock and notification marks. AppWordmark works around it by binding the tile to `surface`. | Med | Bind the Logo tile to `surface` in the component (needs approval; it changes the Welcome screen). |
| 28 | 62 States-gallery frames (page 07) | The tab bar has no tab links, but the Search button now opens S1. | Low | Decide: wire the gallery tabs too, or remove Search links from gallery frames. |
| 29 | Search suggestion chips (MetaChip "On light") | In Light the chip fill is barely distinguishable from the canvas, so the chips read as plain text. | Low | Use a MetaChip surface with a visible fill or outline for tappable chips. |
| 30 | TabBar selected state | The selected highlight (tab or Search) is a low-contrast fill (existing pattern). Selection is also shown by the filled icon and bold label on tabs, but the Search button has only the fill. | Low | Consider a filled or bolder magnifying-glass glyph for Search · Selected. |
| 31 | 02 Mood Frames, 99 Archive | HomeHeader and TabBar changes flow into these pages' instances (8 + 26 tab bars, 20 headers). | Info | None. Traced in the diff. |

## Stage 1.5 update (2026-09-28)

| # | Status |
|---|---|
| 27 | **Fixed.** Logo tile bound to `surface`; all 267 instances follow. |
| 28 | **Fixed.** 62 gallery Search links removed. |
| 29 | **Fixed.** MetaChip Surface=Tappable (1 pt outline, 5.7:1 / 7.4:1) used for the Search suggestions. |
| 30 | **Fixed.** Search Selected uses the tab highlight and a bold glyph. |

### New findings

| # | Frame(s) | Issue | Severity | Suggested fix |
|---|---|---|---|---|
| 32 | 07 You (and You · Offline) | The Sign out row is outside the non-scrolling 852 pt frame after the About row, so the Sign out flow can't be reached in the prototype. | High | Make the frame scroll vertically, with the chrome fixed, or move About into the Account group. |
| 33 | 04/05 You (full scroll), You · Offline (full scroll) | The Sign out row sits behind the tab bar (pre-existing overlap). | Low | Add bottom padding so the last row clears the tab bar in full-scroll frames. |
| 34 | TabBar at 375 pt | "Community" has only 1.4 pt per side at 375 pt. It would not fit at 320 pt. | Low | Allow tab labels to shrink to 10 pt at compact widths, or hide the labels in a compact variant. |
| 35 | 05 Onboarding · Welcome | Dark art is still a placeholder ("DARK RIBBON RENDER NEEDED"). | Med | Supply the dark ribbon render (pre-existing). |

## Stage 1.6 update (2026-09-28)

| # | Status |
|---|---|
| 32 | **Fixed.** Page-07 You and You · Offline scroll with fixed chrome; Sign out is reachable with 21 pt clearance. |
| 33 | **Fixed.** Full-scroll You frames on 04 and 05 resized to the content bottom; Sign out clears the tab bar by 21 pt. |
| 35 | **Blocked.** The ribbon art is a raster image, so a Dark version can't be built from variables. It needs a dark render, or a redrawn vector ribbon. |

### New findings

| # | Frame(s) | Issue | Severity | Suggested fix |
|---|---|---|---|---|
| 36 | 07 You, You · Offline (scrolled) | The fixed Nav Header is a transparent Large Title. Scrolled content passes under the "You" title and the status bar; the status-bar text becomes unreadable over the black identity card. | Med | Let the large title scroll away and keep only the status bar fixed (iOS pattern; needs one layer reorder), or add a collapsed inline-title bar with a glass background to NavHeader. |
| 37 | 07 Sign out (alert frame) | The background shows You at scroll 0, so the Sign out row the student tapped isn't visible behind the alert. | Low | Show the background scrolled to the bottom (shift the content 215 pt in that frame only). |

## Stage 1.7 update (2026-09-28)

| # | Status |
|---|---|
| 36 | **Fixed.** The large title scrolls; a top ScrollEdgeFade keeps the status bar readable (16.1:1). |
| 37 | **Fixed.** The Sign out alert shows the list scrolled to the bottom, with the Sign out row visible. |

### New findings

| # | Frame(s) | Issue | Severity | Suggested fix |
|---|---|---|---|---|
| 38 | 07 Meals · Menu, Community · List, Meals · Menu changed, Meals · Loading, Meals · Offline, Community · Offline | Content runs under the tab bar or past the frame, and these screens don't scroll, so the last items can't be reached in the prototype. | Med | Apply rule R9 (scroll, large title scrolls, top fade) to each. |
| 39 | 07 Request correction, Correction · Sent, Correction · Failed | Their You-list container is a fixed 655 pt and clips, so the About and Sign out rows are cut off in the background (the same cause as the alert, fixed there). | Low | Let the list hug its content (background only). |
| 40 | 07 You (at rest) | The top fade replaces the lime wash tint in the top 63 pt. | Info | Accept, or use a wash-tinted fade variant for screens with a Meal wash. |

## Stage 1.8 update (2026-09-28)

| # | Status |
|---|---|
| 38 | **Fixed** for the six named frames (R9 + Wash fade). The other 49 swept frames are listed in contract §1.8.6. |
| 39 | **Fixed.** The three sheet backgrounds hug their lists. |
| 40 | **Fixed.** The ScrollEdgeFade Style=Wash fade is invisible over the Meal wash at rest. |

### New findings

| # | Frame(s) | Issue | Severity | Suggested fix |
|---|---|---|---|---|
| 41 | 07 Spending · This week / This month / Saved | The Expense / Canteen row, the only way into Edit expense (and then Delete confirm and Deleting), is off-frame. That flow can't be reached in the prototype. | High | Apply R9 scrolling (keeping the Footer fixed), or move the expense list above the fold. |
| 42 | 07 Home ×3, Answer ×13 | The Impact card and Method (i) are partly or fully under the tab bar. On Home · Morning they're fully hidden. | Med | Apply R9 to the Home family (the header is HomeHeader, not NavHeader). |
| 43 | 07 Meals · Meal detail | Crowd row hidden under the tab bar; the inline-title header needs a fixed bar with a material background to scroll correctly. | Med | Decide the inline-header scroll pattern, then apply. |
| 44 | 6 R9 frames | Clearance is 20 pt (You has 21). | Low | Add 1 pt bottom padding to the content frames, or accept 20 pt as the standard. |

## Stage 1.9 update (2026-09-28)

| # | Status |
|---|---|
| 41 | **Fixed.** Spending family scrolls (R9); the Expense row, Edit expense and the Delete flow are reachable. |
| 42 | **Blocked.** Home family not changed; the family rule stopped it because of Meal detail and Intent (§1.9.2). |
| 43 | **Blocked.** Meal detail's Back is inside the NavHeader instance. |
| 44 | **Closed.** Rule R9b: at least 20 pt. |

### New findings

| # | Frame(s) | Issue | Severity | Suggested fix |
|---|---|---|---|---|
| 45 | 07 Spending · This week, This month, Saved, Offline | At max scroll the last expense row is behind the sticky Add expense footer (684–740). | Low | Bottom padding = footer height + 20 above the footer, or accept. |
| 46 | 07 Meals · Meal detail | Content bottom padding is 120, not 124. With the Stage 3 plate card the last item would sit 16 pt above the tab bar. | Med | Set bottom padding to 124 before Stage 3. |
| 47 | NavHeader Inline Title (Meal detail, Intent ×3, Spending ×7) | Back and title are one instance, so Back can't stay fixed while the title scrolls. | Med | Add a NavHeader variant, or split out a floating Back GlassButton (needs approval). |

## Stage 1.10 update (2026-09-28)

| # | Status |
|---|---|
| 42 | **Still open.** Part A worked mechanically, but at rest the fixed Wash fade covers the HomeHeader chip row; all 22 frames reverted. |
| 43 | **Still open.** Part B's Tall fade covers content starting at y 110; stopped. |
| 46 | **Still open.** Meal detail padding not changed (Part B stopped). |

### New findings

| # | Frame(s) | Issue | Severity | Suggested fix |
|---|---|---|---|---|
| 48 | 07 Spending ×7 (from Stage 1.9) | At rest, the Back button and "Spending" title sit under the Wash top fade, about 54% covered. | High | Status-bar-only fade (R9c), or keep the NavHeader fixed above the fade once it has a material background. |
| 49 | 07 Community · List, Community · Offline (from Stage 1.8) | At rest, the (i) trailing button sits under the Wash top fade, about 54% covered. | Med | Same as #48. |
| 50 | ScrollEdgeFade | There is no status-bar-only style (opaque 0–44, clear by 54). Every header whose controls start at y 54 conflicts with the current 100 pt fades. | High | Add a `Style=Status` (Wash and Plain colours) and use it wherever a header row starts at y 54. |

## Stage 1.11 update (2026-09-28)

| # | Status |
|---|---|
| 42 | **Fixed.** Home and Answer (22 frames) scroll; Impact and its (i) are reachable on Home · Morning. |
| 43 | **Fixed.** Meal detail: fixed NavHeader over HeaderBackdrop; Crowd is reachable. |
| 45 | **Fixed.** Spending's last row clears Add expense by 20 pt (padding 188). |
| 46 | **Fixed.** Meal detail padding is 124. |
| 47 | **Fixed** without changing NavHeader, using HeaderBackdrop. |
| 48 | **Fixed.** Spending Back and title fully visible at rest (Status fade). |
| 49 | **Fixed.** Community (i) fully visible at rest. |
| 50 | **Fixed.** ScrollEdgeFade Style=Status added (R9c). |

### New findings

| # | Frame(s) | Issue | Severity | Suggested fix |
|---|---|---|---|---|
| 51 | ScrollEdgeFade Style=Wash | It now has no instances. | Info | Keep it for reference, or remove it in a later clean-up. |
| 52 | 19 frames (Waste, Feedback, Rewards, Report, Notifications · Offline, Settings · System off, sheets) | They still overflow without scrolling. | Med | Apply R9c by family. |
| 52 | **Updated (Waste scroll fix, 2026-09-30):** the 6 overflowing Waste frames now scroll (R9 + R9c inline-title pattern), so the list is **13**: Feedback 3, Rewards 2, Report 2, Notifications · Offline 1, Settings · System off 1, sheet backgrounds 4. **Waste · How this is measured** stays in the sheet-backgrounds group, because the sheet pattern is not covered by R9. |

## Stage 2 update (2026-09-28)

| # | Status |
|---|---|
| 2 | **Fixed.** H14 About estimates built (04 and 05). |

### New findings

| # | Frame(s) | Issue | Severity | Suggested fix |
|---|---|---|---|---|
| 53 | H10 Daily goal, H12 First run (04/05) | The last item ends 18 pt above the Save bar at the end of the scroll (padding 120). | Low | Padding 124 when these frames are copied to the prototype (Stage 3). |
| 54 | H8 Weekly view | Shows a computed average but has no Estimate pill (H8 is outside the H2–H7 / H9 list). | Low | Decide whether H8 gets the pill. |
| 55 | H11 | Digits remain in portion chips, the date chip and the status bar (not nutrition values). | Info | Confirm that "digit-free" means nutrition values only. |
| 56 | KcalGauge Goal=Off | The 240 pt readout sits centred in a 353 pt hero card; the split bar is only 200 pt. It reads lighter than the old arc. | Med | Stretch the hero to card width, with a full-width split bar and a larger legend (awaiting direction). |

## Stage 2.5 update (2026-09-28)

| # | Status |
|---|---|
| 53 | **Fixed.** H10 and H12 padding is now 124. H12 clears its Save bar by 22 pt; H10 does not scroll (312 pt). |
| 54 | **Fixed.** H8 has the Estimate pill (04 and 05). |
| 55 | **Confirmed.** H11's hero shows no digits: an empty track plus "Numbers hidden / Portions only". |
| 56 | **Fixed.** The hero is full width with a 168 pt composition ring and a full-width legend. |

### New findings

| # | Frame(s) | Issue | Severity | Suggested fix |
|---|---|---|---|---|
| 57 | H4 Your plate · saved | The two-line chip row ("Planned · counts after Entry QR") leaves only 10 pt between the first row's chips and the Save bar at rest. | Low | Put both chips on one line, or shorten the planned-state chip, if the fit gets tighter. |
| 58 | H6 Day view | The legend (P/C/F grams and %) and the Macro rings card (P/C/F/Fibre grams) repeat the same grams. Kept as instructed. | Info | Revisit if H6 gets a goal-off Macro rings variant without P/C/F. |
| 59 | H8 Weekly view | The Estimate pill is an absolute layer over the Average card instance. | Low | Re-check the pill's position if the card's padding or height changes. |

## Stage 2.6 update (2026-09-28)

| # | Status |
|---|---|
| 58 | **Fixed on H6.** The Macro rings card is replaced by the Nutrients card, so P/C/F grams now show only in the hero legend. |

### New findings

| # | Frame(s) | Issue | Severity | Suggested fix |
|---|---|---|---|---|
| 60 | H6 Day view (04/05) | Two entries open H7: the new Nutrients card (Stage 3 link) and the "All nutrients" row. | Low | **Stage 3:** remove the "All nutrients" row once the Nutrients card links to H7. |
| 61 | Page 03 canvas | The KcalGauge set (2532 pt wide) overlaps the MacroRing, MacroBar, DishPortionRow and EstimatePill sets. It dates from Stage 2. | Low | Move the neighbouring sets (or wrap KcalGauge onto two rows) in a tidy-up stage. |
| 59 | H8 Weekly view | (Re-stated.) The Estimate pill is an absolute layer over the Average card instance: a fragile spot. | Low | Add an Estimate-pill slot to the Average component, or re-check the pill's position on every H8 edit. |

## Stage 3 update (2026-09-28)

| # | Status |
|---|---|
| 60 | **Fixed on the page-07 copy:** H6 "All nutrients" row removed once the Nutrients card linked to H7. |

### New findings

| # | Frame(s) | Issue | Severity | Suggested fix |
|---|---|---|---|---|
| 62 | H6 (04 source) | No "+" control and no week toggle. The prototype uses the Snack row (→ Quick add) and the DatePillStrip (→ Weekly view) as substitutes. | Med | Add a "+" button (Quick add) and a Day/Week segment on H6 in page 04, then re-copy. |
| 63 | H6 (04 source) | No goal link to H10. The goal is reachable only via You → Nutrition → Daily goal. | Low | Add an "Add a daily goal" link row on H6 if the goal should be reachable from the Day view. |
| 64 | H10 Daily goal | The Save button is drawn Disabled (goal toggle off), so the prototype saves by tapping an option row. There is no goal-on H10 state. | Med | Add an H10 state with the toggle on and an option selected, where Save is enabled and goes to H6b. |
| 65 | H6 on pages 04/05 | Still shows the "All nutrients" row. The page-07 copy no longer does (source rule). | Low | Remove it on page 04/05 in the next tracker stage, then re-copy. |
| 66 | H13 Nutrition | No "Today" entry to H6, as the Stage 3 brief asked. | Low | Add a "Today" row or link on H13 in page 04, then re-copy. |
| 67 | Other Home states | PlateSummaryCard is placed on Home · After last meal only. | Info | Morning, Afternoon, During meal and the answer/recheck Home frames would need it for consistency. |
| 68 | H9 / H14 sheets | The Estimate pill and tab bar under the scrim can still receive taps (Figma passes taps through the non-interactive scrim). | Low | Give the scrim a BACK/close interaction in a later pass. |

## Stage 3.1 update (2026-09-28)

| # | Status |
|---|---|
| 62 | **Fixed.** H6 has "Add food" (header plus → Quick add) and a Day \| Week toggle (→ Weekly view) on 04/05/07. |
| 63 | **Closed by rule:** goal setup lives only in Settings; H6 gets no goal link. |
| 64 | **Fixed.** H10b · Option selected (Save enabled → H6b) on 04/05/07. |
| 65 | **Fixed.** "All nutrients" removed on 04/05. |
| 66 | **Superseded:** H6 is reached from You → Nutrition and from the gear → H13 → Back; no "Today" row on H13. |
| 68 | **Fixed.** H9 and H14 have a transparent "Dismiss · tap outside" layer → BACK. |

### New findings

| # | Frame(s) | Issue | Severity | Suggested fix |
|---|---|---|---|---|
| 69 | H6 on 04/05 | The removed "All nutrients" row carried the only design-page link on H6 (→ H7). Pages 04/05 are at 6 links. | Low | If the design pages should keep 7, give the Nutrients card the same Dissolve 0.2 link to H7 on 04/05. |
| 70 | H6 (all) | With the toggle, the Lunch row is 32/72 pt visible at rest (accepted). | Info | Revisit if the Day view gains more above-the-fold content. |
| 71 | Page 03 structure read | The NavHeader set's nested-instance count keeps flipping between reads (10/11/12) with no edits. | Info | Exclude nested-instance counts inside component sets from the fingerprint, or compare variant-level signatures only. |
| 72 | You → Nutrition | The product rule sends tracking-off users to H12. The prototype has no tracking-off You state, so the Nutrition row always opens H6. | Low | Add a conditional on a `trackingOn` variable if the off path must be demoable. |

## Stage 3.2 update (2026-09-28)

| # | Status |
|---|---|
| 69 | **Fixed.** Nutrients card → H7 on 04/05; both pages are back to 7 links. |
| 71 | **Closed by rule:** page 03 is compared on geometry, fills and layer order; nested counts are advisory. |
| 72 | **Recorded as an engineering rule** (contract 3.2.3a); not in the prototype. |

### New findings

| # | Frame(s) | Issue | Severity | Suggested fix |
|---|---|---|---|---|
| 73 | H6 (04/05/07) | The "Today" title sits 26 pt left of centre because the two trailing slots make the right side 52 pt wider than the left. | Low | Override the `Center` frame's left padding to 52 on the H6 NavHeader instance (no component edit). |

## Stage 3.3 update (2026-09-28)

| # | Status |
|---|---|
| 73 | **Fixed.** H6 title centred via a `Center` paddingLeft = 52 instance override on 04/05/07. It reverts if the header instance is reset or swapped (contract 3.3). |

## Stage 3.4 update (2026-09-28)

29 of 46 unclassified page-07 links now have roles; **17 remain** (contract 3.4.2).

### New findings

| # | Frame(s) | Issue | Severity | Suggested fix |
|---|---|---|---|---|
| 74 | Onboarding · All set → Home | Drill-in into Home: Home is a tab root, and Back from Home would return into onboarding. | Low | Consider Dissolve 0.25 plus SWAP for this last step (needs approval under R1a). |
| 75 | Fixed back arrows (5) | Still Dissolve 0.2, not R1b Move out right. | Low | Apply R1b when approved. |

## Stage 3.5 update (2026-09-28)

| # | Status |
|---|---|
| 74 | **Fixed.** All set → Home is Dissolve 0.25 with SWAP (contract 3.5.5 for the history caveat). |
| 75 | **Fixed.** The 5 fixed back arrows use R1b (Move out right 0.3 s). |

### New findings

| # | Frame(s) | Issue | Severity | Suggested fix |
|---|---|---|---|---|
| 76 | Community · Suggestion (04/05/07) | **Defect:** "Me too" opens Community · List instead of showing agreement. No supported state of the Suggestion card exists anywhere in the file (99 Archive included). | **High** | Build "Community · Suggestion · Supported" (count 113, "You said me too" + Undo, like Community · Supported for issues). Link Me too → it (Dissolve 0.25 or Smart animate), and Undo → back. |
| 77 | Meals · Meal detail (dinner) → answer | I'm in / Skip / Not sure go to Home-area Answer · Tap frames, so the tap changes both screen and tab. Lunch has Meals-area answer frames (Meal detail · Answer Yes · Sending / Saved); dinner has none. | Med | Build dinner-parity Meal detail answer frames (Tap / Sending / Saved for Yes / No / Not sure), then relink. |

## Stage 3.6 update (2026-09-29)

| # | Status |
|---|---|
| 67 | **Partly done.** Home · After last meal has the two-up dashboard (Today's plate + Spending); a "Trackers empty" variant frame was added. The other Home states are still without cards. |

### New findings

| # | Frame(s) | Issue | Severity | Suggested fix |
|---|---|---|---|---|
| 78 | Home dashboard | The Spending tile is visible to anyone looking over the student's shoulder on Home, while Spending itself is labelled "Only you can see this". | Low | **Build item (decided):** hidden by default; opt in via "Show spending on Home" in Settings. When hidden, Today's plate uses the full-width card. Toggle not built yet (contract 3.6.5). |
| 79 | Home · After last meal · Trackers empty | Its copied links go to the same destinations as the populated Home (for example the "You said the sambar…" follow-up). | Info | **Closed:** this is a daily/weekly empty state, not first-run, so the other modules correctly stay (contract 3.6.5). |

## Mess Staff — Stage A

| # | Frame(s) | Issue | Severity | Suggested fix |
|---|---|---|---|---|
| 80 | Pass desk · Offline | Offline redemption is blocked, which can stall a queue when the mess Wi-Fi drops. | Medium | Decide: keep it blocked (safe), or queue with a per-device lock plus conflict review on sync. |
| 81 | 09 Mess Staff | The staff components (StaffTopBar, ShiftCounter, Viewfinder) are local to page 09, not page 03. | Low | Move them to 03 Components once the staff designs are approved. |
| 82 | 09 Mess Staff | No prototype links or flow starts for staff screens. | Low | Add a staff flow in a later stage (page 07 or its own prototype page). |
| 83 | MS-C4 override | There is no state for a food head **rejecting** a large override (what the supervisor sees, and what the kitchen cooks). | Medium | Build MS-C4c "Override rejected" (ResultCard Stop: "Not approved · cook 42 L", with the reason from the food head). Deferred by decision. |
| 84 | MS-D1 | **Closed (D.1):** unserved is now calculated, so the dish rows are read-only. Was: DishRow has no editable quantity. The typed "unserved" value looks the same as a read-only number, and entry happens in an unseen tap target. | Medium | Add a DishRow `Entry` variant (quantity in an input box, with a focused state), or a numeric-entry sheet frame. |
| 85 | MS-D4 | History rows are a local composition (ResultCard icon head + two lines). | Low | Promote as `HistoryRow` on page 03 after review, or add an icon slot to DishRow. |
| 86 | MS-D1a | **Partly resolved (D.1):** unserved is shown per dish in its own unit, with no mixed total; only plate waste is one number. Was: the unserved total mixes units (kg · L · pcs), because dishes are cooked in different units. | Low | Decide whether unserved is always weighed in kg (a single total) or reported per unit. |
| 87 | MS-D2 | **Decided, not built:** D2 stays names-free. A **Safety** tag on the dish row (DishRow `Show safety`) marks safety complaints and routes to a separate **food-head safety queue that keeps student identity**, not visible to kitchen staff. Was: "No identity shown" has no path for safety reports (foreign object, illness) that need follow-up with a specific student. | Medium | Keep D2 aggregate-only; route safety reports to a separate food-head queue with identity, outside kitchen staff view (decision needed). |
| 88 | MS-E-empty | DishRow has no Disabled state; the pre-shift destination cards are dimmed with card opacity 0.45. | Low | Add DishRow `State=Disabled` (secondary text, no chevron) if the pattern is approved. |
| 89 | Waste · Partial (page 07) | Pre-existing: in the "131 kg unserved last week" legend, "Left on plates not measured" is clipped at the card edge (visible at rest before this fix too). | Low | Cosmetic cleanup step: shorten to "Left on plates · not measured" or let the legend wrap. |
| 90 | Attendance (07) | Every day row opens the same sample report sheet (Dinner · Tue 13 Aug). A real build pre-fills the tapped day and meal. | Info | Demo limitation; no action unless per-row sheets are wanted. |
| 91 | Attendance (04/05) | The merged screen scrolls (range 471) but has no "(full scroll)" static copy on pages 04 and 05, unlike Waste and You. | Low | Add full-scroll copies in the cosmetic step if static review of the full month is needed. |
| 92 | Entry · Discrepancy — sending (07) | Pre-existing: no link from Sending to the "Request sent" state (Entry · Under review); that state is only reached by the gallery. | Low | Add an After-delay link Sending → Under review in the link-cleanup step. |
| 93 | AD-1a | **Closed (AD-2.2):** Status fade added, 5 fixed. Was: AD-1a has no fixed `ScrollEdgeFade / Style=Status`, so at max scroll the large title "Today" shows sharp under the status-bar time. It is the only large-title scrolling frame on pages 04/05/07/09/10 missing it (R9c). | Medium | Add the Status fade under the Status Bar and set fixed children to 5, as on You and Meals · Menu. Frame-only fix; the components are correct. |
| 94 | AD-1a / AD-2c | **Closed (AD-2.2):** rule MB1 (worst open issue) adopted; North → Stop, South → Hold. Was: North Mess has a dish "Running out" (Stop) on AD-2c, but its badge on AD-1a is Hold. Main's Stop is a safety report. The badge strip has no stated rule for which issues set a mess's status. | Medium | Decide the MessBadge rule (worst open issue of any kind, or safety/approvals only), then align North's badge or add the rule to the contract. |
| 95 | AD-1a | **Closed (AD-2.2):** reworded. Was: "4 at risk · 1 running out" can read as 5 dishes; AD-2c has 4 dishes in total (1 Running out, 2 At risk, 1 Low data). | Low | Reword to "4 dishes · 1 running out". |
| 96 | AD-1a → Back | Forward links reset the destination's scroll to the top (correct). Whether Back restores AD-1a's earlier scroll offset is decided by the Figma player and was not verified in presentation mode. | Info | Check once in presentation view; no file setting controls it. |
| 97 | Status fade (04/05/07/10, 90 frames) | **Closed (fixed wash):** the wash is now the frame fill, with tokens `wash/top` and `wash/clear`. Presentation-mode check pending. Was: the fixed Status fade matches the Meal wash only at rest; the wash scrolls, so at scroll the fade shows as a lime band (step 20–26 levels). | Medium | Proposed: move the wash into each frame's own fill (fixed), with tokens `wash/top` and `wash/clear`. Awaiting approval. |
| 98 | MS-D2 (09) vs AD-1b / AD-3 (10) | The biryani safety row says "Foreign object **found**" on MS-D2 but "Foreign object **reported**" in admin. Unverified student reports should read "reported". | Low | Change MS-D2 to "reported" in the next page-09 touch. |
| 99 | AD-3a | **Future item (AD-3.1):** chevrons removed; no placeholder built. Build a real feedback detail for these dishes once they have admin-relevant content (a logged kitchen action or an escalation). Was: Rice, Paneer and Curd feedback rows show a chevron but are unlinked; AD-3c is built for Sambar only (a row with a logged action). A "no action yet" detail state does not exist. | Low | Build AD-3c "no action yet" (ResultCard Hold without the kitchen action block, "Ask kitchen to log a fix") or remove the chevrons on those rows. |
| 100 | AD-3d | **Closed (AD-3.1):** new StatusPill `State=Sent` (fill-quiet). Was: the student step "Sent" (nobody has picked it up) uses the StatusPill **Offline** style (outline). Offline means missing data; here it means not seen yet. | Low | Decide whether student steps get their own pill mapping (e.g. StatusTag on light) or keep the outline for "not yet seen". |
| 101 | AD-3a | **Closed (AD-3.1):** SOS is now a ResultCard Stop. Was: two-second test: SOS vs feedback rows are distinguished by pill shade only. | Medium | Proposed: SOS items as ResultCard Stop cards above the lists (rendered as a TMP alternative). Awaiting decision. |
| 102 | AD-4a vs AD-1a | **Closed (AD-4.1):** new MetricBadge (no glyph, lime target tick). Was: waste-per-meal badges reuse MessBadge unchanged: same ring, similar arc range and the same status glyphs as the turnout badges. Main reads Stop on AD-1a and Hold on AD-4a, which looks like a status change rather than a different metric. | Medium | Pick a distinguisher: (a) drop the status glyph on waste badges and show the value only, with a target tick on the ring; (b) render the waste arc in `chart-past` / `chart-current` bar colours instead of ink; or (c) a MessBadge `Kind=Metric` variant without the glyph. Recommended: (a) + (c). |
| 103 | AD-4 | **Closed (AD-4.1):** promoted as WasteBar and ForecastPair. Was: two local compositions are not yet components: `Share bar · on dark` (3 segments incl. Donated) and the paired `Expected vs served` bars. | Low | Promote to page 03 after review (ShareBar `Surface=On dark`; a WeekBars `Kind=Paired` or a new ForecastBars). |
| 104 | AD-4a / AD-4c / AD-4d | **Closed (AD-4.1):** horizontal-scroll chip rows on AD-4a and AD-4d (AD-4c fits). Was: chip rows wider than 353 pt run to the screen edge and clip (horizontal-scroll chip row). There is no scrolling in the prototype; the clipped chips aren't reachable in the demo. | Low | Accept as a static cue, or make the chip row a horizontal-scroll frame. |
| 105 | WasteBar / WeekBars (03) | **Closed for WasteBar (AD-4.3):** screen-level ChartBar segments sized from the data. Student WeekBars keeps its defaults (its sample values match). Was: bar sizes inside instances cannot be overridden. WasteBar segments are fixed at 175 / 114 / 20 (correct only for the current ~57 / 37 / 6% split); the student WeekBars bars are fixed at their defaults. | Medium | Rebuild WasteBar as legend component + local bar of 3 segment instances (a ChartBar-style `Segment` kind), and use ChartBar for any data bar chart. The student WeekBars keeps its defaults (its sample values match). |
| 106 | Page 10 flows | **Closed:** 5 stray starts removed; 3 remain; rule D1 added. Was: cloning a frame copies its flow start: 4 stray "Admin · Issues" starts on AD-4a Empty / Offline, AD-4c and AD-4d, and "Flow 1" on AD-2a. Reviewers picking "Admin · Issues" may land on an Insights frame. | Medium | Remove the 5 stray starts; keep Admin · Today (AD-1a), Admin · Issues (AD-3a), Admin · Insights (AD-4a Success). Strip copied flow starts after every clone from now on. |
| 107 | AD-4a Offline | **Closed:** now "Trend needs all 4 messes". Was: the Trends row says "Waste down 13% since 8 Jul · 3 messes", but 13% is the all-messes series. | Low | Either "Waste down 13% since 8 Jul · all messes" (and keep the Trends screen all-mess), or drop the % in the Offline state ("Trend needs all 4 messes"). |
| 108 | AD-5c | **Closed (AD-5.1):** decided: hard gate for Stop (no vote, reason shown: "No vote · 38 g fat a serving"), soft gate for Hold (opens with a logged reason; rule chip on AD-5c). The Hold review step itself is gap 111. Was: criteria enforcement is undecided. Proposals tagged "Doesn't qualify" (Stop) currently still sit in the list, and "Open vote" is shown only for a "Meets criteria" proposal. | Medium | Recommended: a **hard gate for Stop** (fails a nutrition / safety limit; can't open a vote, with the reason shown), a **soft gate for Hold** (budget or feasibility; the admin can open the vote after reviewing, and the override is logged). Awaiting decision. |
| 109 | AD-5a / tracker | Curd is on the lunch menu but has no nutrition row (Hold "Nutrition missing"), so students' plates can't include it. | Low | Add a Curd per-serving row from IFCT to the tracker table, and flip the card to "In tracker". |
| 110 | AD-5a vs AD-1b | **Decided (2026-09-30):** the Main Mess prep list is canonical (Rice, Sambar, Paneer butter masala, Chapati, Curd; Chicken biryani is the Wednesday special). The student-side scope is in `gap110_student_menu_inventory.md`; frames change only after approval. MS-C, AD-1b, AD-2c and AD-3 already match. Was: the student lunch menu (Sambar, Rice, Beetroot poriyal, Chicken curry, Curd) differs from the Main Mess prep list on AD-1b / MS-C (Rice, Sambar, Paneer butter masala, Chapati, Curd, Chicken biryani). This is pre-existing and AD-5a follows the student menu. | Medium | Pick one Wednesday-lunch menu and align MS-C, AD-1b, AD-3 and the student screens in the backfill pass. |
| 111 | AD-5c | **Closed (content diet):** AD-5c2 "Review · Egg curry on Mondays" opens the Needs review sheet (required reason, Open vote disabled until given, logged). Was: the Needs-review (Hold) path has no screen. The rule is stated ("Needs review opens with a logged reason"), but nothing opens a vote for Egg curry, and nothing captures the reason. | Medium | Build "AD-5c · Review — Egg curry": the criteria issue (18% over budget) as the hero, FormField "Reason to open anyway (required)" (the AD-5d decline pattern), Primary "Open vote anyway" Disabled until a reason is entered, and a chip "Logged · the food head can see it". Link the Egg curry row to it. |
| 112 | Search S1 / S4 (04, 05, 07) | Found during the gap-110 inventory: S4 shows "No results for "biryani"", and says search covers this week's menu. But Chicken biryani is this Wednesday's special on the canonical menu and on the student Pass screens. | Low | Use a query that isn't on any menu, and update the S1 recent search that links to S4. Part of the gap-110 student pass. |
| 113 | Student dinner (04, 05, 07) | Found during the gap-110 inventory: Wednesday dinner is "Chapati, paneer masala, dal, rice". Once lunch follows the prep list, paneer and chapati are served at both meals. | Info | Confirm the dinner menu when the food head confirms the week. Gap 110 covers lunch only. |
| 114 | Page 10 · Manage tab | **Closed (content diet):** AD-5-0 Manage hub is the tab root (flow start Admin · Manage); every AD-5 / AD-6 screen is reachable from it and returns to it. Was: Manage has no hub. AD-5a (Menu) is the tab root, and Passes is reachable from its Wednesday special tile, but Rewards and Surplus have no in-app entry (flow starts only), and AD-7 (people, permissions, audit log) will add more areas. | Medium | Decide the Manage root with AD-7: a hub with one hero and destination cards (MS-E / AD-1a pattern), with AD-5a becoming a drill-in (Show Back on its NavHeader, and the "Admin · Manage" start moving to the hub). |
| 115 | MS-B5 (09) vs AD-5a (10) | Rahul's expired pass on MS-B5 is "Paneer tikka · Tue 12–2 PM", but AD-5a schedules Paneer tikka as next week's **Wednesday** special (Wed 21 Aug). The special is a Wednesday entitlement everywhere else. | Low | Change MS-B5 to last week's special (for example "Chicken biryani · Wed 7 Aug"), with the fact "Pass was for Wed 7 Aug". |
| 116 | Student Rewards · Balance issue (07) vs AD-3 | The student is told "We'll reply in My reports", but AD-3 Issues has no place where a points dispute lands. | Low | Add rewards disputes to the AD-3 backfill (a Community / report category, or a row on AD-6c once a Rewards issue exists). |
| 117 | File (root plugin data) | 13.8 MB of old snapshot chunks (`st37`–`st75`, 338 keys) are still stored, although the contract says each stage cleared them. | Info | With approval, delete them and keep `st75` as the last old-format baseline. From `st76` on, keep only the two latest snapshots. |
| 118 | Page 10 · scope sheets | Scope-sheet selections use navigation **SWAP**, so the closed sheet leaves history and Back returns to the screen the admin came from. R1a asks for approval before SWAP is used. | Medium | Approve SWAP, or use fixed back links on the Empty states. |
| 119 | Page 10 · AdminTabBar | Admin tab links are still unwired on every admin frame (since AD-1). The Manage tab should open the hub. | Low | Wire the four admin tabs in the stitch stage (Today → AD-1a, Issues → AD-3a, Insights → AD-4a, Manage → AD-5-0). |
| 120 | Page 10 · scope sheets | Rows with no destination frame (for example South and Annexe on Passes) are unlinked samples. The Empty screens open the same sheet, which shows Main Mess selected. | Info | Demo limitation, as gap 90. |
| 121 | AD-6c | The brief asked for "Offers · 3 live", but the sample data has 2 live offers (Juice, Ice cream) and Fruit bowl awaiting SRM. The row reads "Offers · 2 live". | Info | Confirm the wording, or make Fruit bowl live. |
| 122 | AD-5b, AD-5c2, AD-6d2 | Over the content-diet target: AD-5b 21–22 text layers (7 required fields); AD-5c2 Success 17 (proposals and duplicate stack on one screen); AD-6d2 20 (4 dishes and 4 steps; rule 4 vs a "see all" detail). | Medium | Decide: split the 5b form into two steps; move the duplicate stack behind a "Look the same · 3" row; allow detail screens to exceed rule 4. |
| 123 | Page 10 · local compositions | The Needs-you card, the Pickup hero (ResultCard plus progress dots) and the Header-controls row are local compositions, used several times. | Low | Promote to page 03 after review (like the MS-C promotions). |

## Admin coupons, hub visuals, fill floor update (2026-09-30)

| # | Status |
|---|---|
| 118 | **Closed.** SWAP for scope-sheet selections is approved (R1a). |
| 119 | **Still open.** The admin tab bar is wired in the linking stage, by decision. |
| 121 | **Superseded.** AD-6c2 Offers is archived. Rewards shows all four offers as coupons (2 Live, 1 "Launches Fri", 1 Awaiting SRM). |
| 122 | **Decided and applied.** AD-5b: Fibre, Sugar and Sodium sit behind "More nutrients" (17–19 text layers, down from 21–22). AD-5c2: the duplicate stack sits behind "Look the same · 3" (sheet). AD-6d2 may exceed the three-row rule. |
| 123 | **Partly done.** The Needs-you card is promoted as **NeedsYouCard** (redesigned: one number and three icon chips). The Pickup hero wrapper and the Header-controls row are still local. |

### New findings

| # | Frame(s) | Issue | Severity | Suggested fix |
|---|---|---|---|---|
| 124 | Student side | **Logged, not built:** a student coupon wallet (buy a coupon with points, show a QR at the counter). | – | Design it when the rewards pilot is approved. |
| 125 | 09 Mess Staff | **Logged, not built:** a mess-staff coupon redeem screen, reusing the pass desk (MS-B scan / ID fallback / redeemed / already redeemed). | – | Build it with gap 124. |
| 126 | AD-6c / student wallet | **Logged, undecided:** purchase limits per student (for example one Biryani plate a week). | – | Needs an owner (SRM or the food head). |
| 127 | 03 · BentoTile | `Size=Square` and `Size=Wide` (added in the content-diet stage) have 0 instances after the hub moved to metric tiles. | Low | Keep them for future text tiles, or remove them in a clean-up stage (needs approval). |
| 128 | AD-1b, AD-3a, AD-4a, AD-4d, AD-5a | The brief says "No horizontal scroll anywhere" (Rewards). Horizontal scrolling remains elsewhere: the prep, feedback and dish swipe rows (AD-1b, AD-3a, AD-5a) and the chip rows (AD-4a ×3, AD-4d). | Med | Confirm whether the rule is admin-wide. If so, convert those rows to vertical stacks or a "See all" in a later stage. |
| 129 | Page 10 · local compositions | Metric tiles (6 visuals), Hero · Vote (5c and 5d) and the AD-6d Number row are local compositions. | Low | Promote them after review. The tiles' data bars can't live inside an instance (AD-4.2), so a tile component would take the number and label while the bar stays screen-level. |
| 130 | AD-6c Fruit bowl coupon | The Fruit bowl row's only link went to AD-6c2, which is now archived, so the Awaiting coupon has no link (it has no chevron). | Info | If an "Awaiting SRM" detail is wanted, build it and link the coupon. |
| 131 | AD-5c Offline | With Decide disabled, Offline no longer opens AD-5d (the old card did). | Info | Accept (deciding needs a connection), or add an AD-5d Offline state. |
| 132 | Rules 9–11 (fill floor) | Reading to confirm: an Offline state with cached data meets the 75% floor (banner at the top); only message-only Offline states are centred. | Low | Confirm the reading. |
| 133 | AD-6c Biryani plate | The two coupon states have no "scheduled" state. Biryani plate uses the Live state with the tag "Launches Fri", and its fact is "₹120 each · 0 claimed". | Low | Confirm, or add `State=Scheduled` to CouponCard. |

## Admin AD-7 update (2026-09-30)

### New findings

| # | Frame(s) | Issue | Severity | Suggested fix |
|---|---|---|---|---|
| 134 | AD-6c Empty, AD-5c2 Empty, hub Empty, AD-7d Empty | These Empty states have no incoming link; they are design states only. | Low | Wire them in the linking stage (for example a first-run or new-pilot entry), or keep them as gallery states. |
| 135 | AD-7a, AD-7b, AD-7c | New sample identities: Suresh · •••3306 and Lakshmi · •••7182 (the brief gave names only). | Info | Keep as sample data. |
| 136 | AD-7d | The brief listed the biryani assignment at 1:25 PM. AD-3b shows the report received at 1:25 PM and assigned at 1:32 PM; the log uses 1:32. | Info | None, unless AD-3b's times change. |
| 137 | AD-7d vs AD-6b | The audit log never shows a student name ("Karan"), only •••0733 inside the pass-desk incident. AD-6b still shows "Karan · •••0733" to the admin on the decision screen. | Low | Decide whether admin decision screens also drop student first names (AD-6b), for consistency with the no-students rule. |
| 138 | AD-7b | "See all · 38" opens a by-role summary (6 rows), not a list of all 38 people; per-role lists are not built. | Low | Build a scrolling directory (or per-role lists) if it is needed for the review. |
| 139 | AD-7d type sheet, AD-7a/7b scope sheets | Only "All types" / "All messes" / "Annexe" are linked; other rows are unlinked samples (as gap 120). All-activity rows 1–3 open sheets drawn over AD-7d, not All activity. | Info | Demo limitation. |
| 140 | Page 10 · local compositions | Role-bar hero, mini role bar, permissions matrix, activity hero and audit row are local. | Low | Promote after review. The data bars stay screen-level (AD-4.2). |
| 141 | AD-7b Person | A permission change is shown for Ravi only (scanner on). The "last admin" and "own permissions" rules are stated in the Rules sheet but have no blocked-state screen. | Low | Add a blocked state (for example the admin opening their own permissions) if it is needed. |

## Admin AD-7d redesign update (2026-09-30)

### New findings

| # | Frame(s) | Issue | Severity | Suggested fix |
|---|---|---|---|---|
| 142 | AD-7d Success, Offline, All activity | 13 text layers each (the target is 12). Every item was asked for in the brief: two exception pills and "1 pending" on Success and Offline; the nav title plus 6 times and 6 titles on All activity. | Low | Pick one: drop "1 pending" (the hollow dot shows it), show 2 rows on Success and Offline, or use hour markers on All activity. |
| 143 | AD-7d hero | The dots run newest first, matching the list, so dots 1–3 are the visible rows. The brief said "time order", and oldest first is the usual reading. | Info | Confirm, or flip the order. |
| 144 | AD-7d rail | Rows are spaced by time (24 pt plus 1 pt per minute). On All activity this makes the 12:40 PM row 140 pt tall, for the 95 minutes before 11:05 AM. | Low | Confirm, or switch to even spacing (about 80 pt pitch on All activity to keep the floor). |
| 145 | AD-7d curd entry | The curd row's Hold pill is never visible at rest: Success and Offline show only the 3 newest rows, and All activity has no pills. (The missing reason is now gap 147.) | Info | None; the hollow node marks it as pending. |
| 146 | AuditRow `1028:1887` | New component, not named in the brief. Flagged under rule 7. | Low | Review; merge into TimelineStep as a `Time` variant if preferred. |

## Admin AD-7d pass 2 update (2026-09-30)

### Resolved

- **142** (13 text layers): Success 12, Offline 12, All activity 11. "1 pending" was removed; All activity uses hour markers (owner's choice); "now" is a non-text marker.
- **143** (dot order): newest first, confirmed by the owner.
- **144** (rail spacing): gaps are capped at 80 pt, with a break marker where the cap applies.

### New findings

| # | Frame(s) | Issue | Severity | Suggested fix |
|---|---|---|---|---|
| 147 | AD-7d curd entry (`1021:7257`), MS-D4, AD-1b | **Missing reason.** The curd change (60 → 45 L, awaiting the food head) has no recorded reason anywhere it appears, so its sheet has no reason line. Overrides need a mandatory reason (product decisions), but it is not stated whether an approval request needs one too. | Low | Owner to decide: (a) approval requests also need a reason, so add one at the source (MS-D4 request, AD-1b) and show it on the sheet; or (b) requests don't need one, so keep the sheet as it is. |
| 148 | AD-7d All activity | The hour markers show each hour once (1 PM, 12 PM, 11 AM, 10 AM), so rows 3 and 4 (12:41, 12:40) have no time label. Exact times are in each sheet and on the Success and Offline rows. | Info | None. |
| 149 | Snapshot tool | `snaptool` signs top-level nodes only, so the AuditRow change on page 03 (two new properties, break marker) reads as unchanged. | Info | Extend the signature to count all descendants if nested changes should show. |

## Admin AD-5c2 redesign update (2026-09-30)

### New findings

| # | Frame(s) | Issue | Severity | Suggested fix |
|---|---|---|---|---|
| 150 | AD-5c2 Success, AD-5d | "290 kcal · veg" (Pongal) left the proposal rows. It still appears on AD-5d (the vote result). **Interim (AD-5c2 pass 2):** "Open vote · Pongal on Tuesdays" now links to AD-5d (Dissolve 0.25; AD-5d Back is BACK), so the fact is one tap away. AD-5d is the *result* screen, though, not the moment of opening a vote. | Low | **Proper fix:** a confirm sheet opened from "Open vote": "Open the vote on Pongal on Tuesdays?", the fact "Meets criteria · 290 kcal · veg · within budget", "Runs 48 h · ends Fri 2:18 PM" (48 h from the Wed 2:18 PM moment), and "Open vote". Retarget the button from AD-5d to the sheet. |
| 151 | ChartBar (page 03) | The Pill kinds (Pill, Pill lime, Pill ghost) were defined in this pass, ahead of the Trends and Forecast chart pass that was meant to introduce them. | Info | The chart pass should reuse these kinds, or rename them in one place. The instances on AD-5c2 follow any change to the component. |

## Admin AD-5c2 confirm sheet update (2026-09-30)

### Resolved

- **150** ("290 kcal · veg" had no home): **closed.** "Open vote · Pongal on Tuesdays" now opens the confirm sheet `1062:6997`, which shows "Meets criteria · 290 kcal · veg" and "Runs 48 h · ends Fri 2:18 PM". The stopgap link to AD-5d was removed.

### New findings

| # | Frame(s) | Issue | Severity | Suggested fix |
|---|---|---|---|---|
| 152 | AD-5c2 Proposals, Open vote sheet `1062:6997` | After "Open vote" on the confirm sheet, BACK returns to Proposals, which still shows Pongal as a proposal (check, lime bar, "Open vote" button). Nothing shows that its vote is open. | Low | Add a Proposals state after opening, for example Pongal's row marked "Vote open · ends Fri 2:18 PM" with the Open vote button removed or replaced, and point the sheet's "Open vote" at that state (SWAP) instead of BACK. |

## Admin AD-4b / AD-4c chart pass update (2026-09-30)

### Resolved

- **151** (Pill kinds defined ahead of the chart pass): the chart pass reuses them. It extended them to full radius and added no new variant.

### New findings

| # | Frame(s) | Issue | Severity | Suggested fix |
|---|---|---|---|---|
| 153 | AD-4c Trends, AD-4b Forecast | **Some numbers are now shown only as bar heights.** Trends prints 642 and −100 kg; the week values 742, 718 and 680 are no longer printed. Forecast prints only Dinner's 123 and 15%; the Breakfast and Lunch counts (610 / 596, 860 / 838) and Dinner's 820 / 697 are no longer printed. | Low | Add tap-to-reveal values on the pills, or a VoiceOver label per bar with its value, and check that a reviewer doesn't need the printed numbers. |
| 154 | AD-4c Trends | The nav subtitle "All messes · Waste" is hidden to stay within 12 texts, so the screen no longer says the trend covers all 4 messes. AD-4a's "Trend needs all 4 messes" relies on that scope. | Low | Put the scope in the delta chip ("−13% since 8 Jul · all messes"), or drop the callout and bring the subtitle back. |

## Admin AD-4 Insights content pass update (2026-09-30)

### Resolved

- **154** (Trends scope hidden): the delta chip now reads "−13% since 8 Jul · all messes".

### New findings

| # | Frame(s) | Issue | Severity | Suggested fix |
|---|---|---|---|---|
| 155 | AD-4a · Turnout tile | **Locked: no screen yet.** It shows sample last-week turnout (84% came, 6% on leave, 10% didn't come). | Low | Build a Turnout screen with the three groups (rule 16), showing scan failures and ID fallbacks beside low counts and keeping pass scans out (rule 19). |
| 156 | AD-4a · Dishes tile | **Locked: no screen yet.** Its "4 flagged" and bars (6 / 4 / 3 / 2) are AD-3a's open Main Mess dish feedback. | Low | Build a Dishes screen (per-dish waste and feedback), or link the tile to AD-3a if that's enough. |
| 157 | AD-4a · Prep accuracy tile → AD-4b | The brief listed Prep accuracy as having no screen. AD-4b is that screen and would have been orphaned, so the tile links to it. The tile's "2 of 3" is AD-4b's single-mess, single-day figure (Main Mess, Tue 13 Aug), under an index scoped to "All messes · Last week". | Low | Give AD-4b an all-mess, last-week view to match the index, or label the tile with its scope. |
| 158 | AD-4a | The waste breakdown (never served 389 · left on plates 253 · donated 45 kg) left the index and is not shown on any other admin screen. | Low | Show it on a Waste detail screen or on AD-4d. |
| 159 | AD-4a bento | BentoTile was not reused: its label is mono caps words (against rule 13) and it has no slot for a mini visual. The tiles follow the Manage hub's local bento pattern. | Low | Update BentoTile (Inter label and a visual slot), then swap both the hub and AD-4a tiles to it. |
| 160 | AD-4a Success, AD-4a Offline, AD-4e Offline | Over the 12-text target: AD-4a has 19 (full spec, owner's choice), and AD-4e Offline has 13 (the banner). | Info | Accepted for now. |
| 161 | AD-4e | "Rice 7 kg unserved" was left out of the causes: it is an outcome, offered as surplus (AD-6d). "Too salty · 6 reports" has no plan to compare against, so it is a note, not a bar. | Info | None, unless a shared metric (for example kg possibly linked) is defined. |

## Overnight run, Stage 1 (2026-10-01)

### Resolved

- **160** (over the 12-text target): every AD-4 screen is now at 12 or fewer, by hiding layers (see gap 163).

### Updated

- **157:** the Prep accuracy tile is now locked (overnight brief), so it no longer links to AD-4b. See gap 162.
- **155:** the Turnout tile shows the brief's three groups (said yes and came 76% · said yes and didn't 14% · no answer and came 10%, sample).

### New findings

| # | Frame(s) | Issue | Severity | Suggested fix |
|---|---|---|---|---|
| 162 | AD-4b · Forecast vs actual | **No incoming link.** Its last entry point, the Prep accuracy tile, is locked by the overnight brief, so AD-4b is now a design state that can't be reached. | Medium | Unlock the Prep accuracy tile and link it to AD-4b, or link AD-4b from AD-4e. |
| 163 | AD-4a (all states), AD-4e Offline | **Hidden, not deleted, to meet the 12-text rule:** the AD-4a nav subtitle "Wed 14 Aug · Waste"; the AD-4a row of three locked tiles (Turnout, Prep accuracy, Dishes); the AD-4a Offline Reports number "5 ready"; the AD-4e Offline "Also reported: sambar too salty · 6 reports" note. | Low | Unhide any of them if the owner accepts going over 12 texts. |

## Overnight run, Stage 2 (2026-10-01)

### Resolved

- **152** (Proposals didn't show the vote as open): the new "AD-5c2 · Proposals (Vote open)" frame shows it, and the confirm sheet SWAPs to it.

### New findings

| # | Frame(s) | Issue | Severity | Suggested fix |
|---|---|---|---|---|
| 164 | AD-5c2 Proposals (Vote open) | A second fixed Back (to Menu voting), following R1b/R1c. With the SWAP, plain BACK would return to the stale Success state. | Info | None. Recorded as a deliberate exception. |
| 165 | AD-5c Menu voting, AD-5c2 Success | Only the Vote open frame knows the vote is open. Menu voting and Proposals (Success) still show Pongal as not yet opened if reached another way. | Low | Add vote-open states on AD-5c if the review needs a consistent flow. |

## Overnight run, Stage 3 (2026-10-01)

### New findings

| # | Frame(s) | Issue | Severity | Suggested fix |
|---|---|---|---|---|
| 166 | AD-2a Offline, AD-2c Offline, AD-3d Offline | **No incoming link.** AD-1a Offline hides its Crowd and Shortages destination rows, and AD-3a Offline hides its Community group, to stay at 12 texts. So these three Offline frames can only be opened from the canvas. Their Back is a plain BACK and works once they are reached. | Low | Accept that the prototype has no path to these three frames, or let AD-1a and AD-3a Offline go over 12 texts and unhide those rows. |
| 167 | AD-1a, AD-1b, AD-2a, AD-2b, AD-2c, AD-3a, AD-3b, AD-3c, AD-3d (Offline) | **Hidden, not deleted, to meet the 12-text rule.** Each Offline frame lists the layers that are visible on its Success screen:<br>• **AD-1a:** scope chips; nav subtitle; "MESSES · LUNCH" eyebrow; badge percentages; Crowd and Shortages rows.<br>• **AD-1b:** prep eyebrow; prep cards; page dots.<br>• **AD-2a:** dial eyebrow; min, max and unit; "MESSES · CROWD NOW"; per-mess updated times.<br>• **AD-2b:** dial min.<br>• **AD-2c:** eyebrow (its content moved into the hero); row reasons; 4th row (Paneer).<br>• **AD-3a:** category chips; Rice, Paneer and Curd cards; page dots; Community group; nav subtitle.<br>• **AD-3b:** report facts; resolution log; close steps (each with its eyebrow).<br>• **AD-3c:** two eyebrows; the second Sambar card.<br>• **AD-3d:** reach counts; 2 open rows; the owner field. | Low | Unhide any of them if the owner accepts going over 12 texts. |
| 168 | AD-3d Community moderation (Success `849:1500`, and hidden inside AD-3d Empty) | **Rule 17 (no wait-time minutes):** the duplicate stack's back card reads "Waited 20 min for plates". Only the new Offline copy was changed, to "Waited long for plates". Stage 4 is report-only, so the Success screen was left as it is. | Low | Change the Success text to "Waited long for plates". |
| 169 | AD-2c Offline | **Offline is not simpler than Success here.** To reach the fill floor, the Offline state turns the eyebrow into a black hero ("4 / dishes at risk · lunch", with the number set at 120 pt as a local override of ML/Hero Metric). The Success screen has no hero. | Info | Give AD-2c Success the same hero if the pattern is liked, or accept the difference. |
| 170 | AD-3b Safety report | **The brief's "disable Close" has no control to disable.** The Success screen has no Close button; closing is the step list (assigned staff only). On Offline, both write actions (Escalate, Add to log) are disabled and the step list is hidden. | Info | None, unless a Close button is wanted. |

## Overnight run, Stage 6 (2026-10-01, found while writing the report)

| # | Frame(s) | Issue | Severity | Suggested fix |
|---|---|---|---|---|
| 171 | AD-1a, AD-1b, AD-2a, AD-2b, AD-3b, AD-3c, AD-3d (Success and the new Offline states) | **Rule 13 (mono for numbers, times and IDs only):** words are set in JetBrains Mono on screens built before the rule. Examples: the LiveDial eyebrow, unit and line ("MAIN MESS · LUNCH · LIVE", "served", "inside", "Old data · saved at 1:38 PM"); the crowd legend ("QUIET", "GETTING BUSY", "PACKED"); Mono-light chips ("Old data · last scan 1:38 PM", "Auto-escalates to food head at 1:55 PM"); section eyebrows ("OWNER", "LOOK THE SAME · 3 REPORTS"). The Stage 3 Offline frames inherit these from their Success screens and components, with new words in the same layers ("SAVED", "Old data"). The Stage 1 and 2 frames (AD-4a, AD-4c, AD-4e, AD-5c2 Vote open) have no mono words. | Low | A component pass: set the LiveDial eyebrow, unit and line, the crowd-legend labels, the Mono-light chip and the section eyebrow in Inter, and keep mono for the digits. One change covers both the Success and Offline states. |

## Contract pass, Stage 0 (2026-10-01)

One gap for each open decision raised by the contract pass (`prototype_contract.md` → "Contract pass · Stage 0"). The "Stage" column names the later stage that carries the fix, once the decision is made.

| # | Area | Open decision | Severity | Proposed default (until decided) | Stage |
|---|---|---|---|---|---|
| 172 | Forecast | No forecast has a **rule version**, and no owner is named for the forecast rule (today: last 4 same weekdays × an adjustment, with "not sure" at half). | Medium | Show "rule v0 · draft" plus the cutoff time on every forecast. | CP-1 |
| 173 | Intent cutoffs | Lunch 9:00 AM and dinner 6:00 PM come from the student screens. **Breakfast's cutoff is not shown anywhere**, and no owner is named. | Medium | Keep 9:00 AM / 6:00 PM; the owner sets breakfast's. | CP-1 |
| 174 | Prep override cutoff | The **11:30 AM sample cutoff has no owner**. Also undecided: what a lapsed request falls back to, and who is told. | Medium | Lapsed means the quantity in effect stays (recommended or last approved); the requester and the food head see "lapsed". | CP-1 |
| 175 | Crowd | **Seat capacity has no owner** (fixed seats or a safe-occupancy estimate). This was the AD-2.1 open decision, not logged as a gap until now. | Medium | Show no capacity and no head count; crowd is level, method and freshness. | CP-4 |
| 176 | Waste target | The **65 g per-diner target** is a draft with no owner. | Low | Label it "65 g · draft target" wherever it shows (MetricBadge tick). | CP-2, CP-6 |
| 177 | "Within 5%" | Two drafts with no owner: the **forecast accuracy band** ("on target", AD-4b) and the **nutrition energy check** (AD-5b, Stage 2.1). | Low | Both read as drafts; name an owner for each. | CP-1, CP-6 |
| 178 | Entry ID fallback | "Entered" counts an **approved ID fallback**, but only the pass desk has a typed-ID path (MS-B2). There is none at the entry door, and no approver. | Medium | The supervisor approves an entry ID fallback; the scanner shows it as pending until approved. | CP-4 |
| 179 | Safety case | **Who verifies that a case is resolved** before it closes, and whether the admin's "Add to log" counts as a correction. | Medium | The food head verifies; the admin assigns, escalates and adds to the log (no close control). | CP-5 |
| 180 | Surplus | **Who logs the pickup** (weight at the gate) and **who confirms it counts as donated**. Partner, dairy rule and deadline still have no owner (AD-6). | Medium | The supervisor logs it, the food head confirms, the admin views. "Log pickup" leaves AD-6d. | CP-7 |
| 181 | Moderation | **Who moves a community item** through the student-visible steps (Seen, Working on it, Need more info, Fixed). "Mess committee" is an owner on AD-3d but not a role. | Low | The item's owner moves it; the admin groups and assigns. Decide whether the mess committee becomes a role. | CP-5 |
| 182 | Corrections | **Which records can be corrected**, by whom, with what reason, and whether a correction needs approval (plate-waste re-weigh, entry records, overrides). | Medium | The supervisor corrects with a required reason, and the food head sees it in the log; no approval is needed. | CP-5, CP-7 |
| 183 | Attendance disputes | The student's "Something's wrong?" request has **no named reviewer** (supervisor, mess office or SRM). | Low | The mess supervisor reviews; the admin can see it. | CP-4 |
| 184 | Reasons for absence | Add **"Long queue"** and **"Food quality"** to both lists (student "Why skipping?" and admin)? Logged as optional by the brief. | Low | Not added; both lists change together if they are. | CP-6 |
| 185 | Reasons coverage | Do **"Other"** and **"Prefer not to say"** count as answered? | Low | Yes, as answered, each shown as its own row. | CP-6 |
| 186 | Offline (staff) | Kitchen **waste entry** and supervisor **overrides and corrections** while unsynced: queue or block? | Medium | Waste entry queues ("waiting to sync"); overrides and corrections are blocked. | CP-4 |
| 187 | Offline (student) | Does an intent answer **queued offline before the cutoff** count if it syncs after the cutoff? | Low | Yes, if the phone's timestamp is before the cutoff; otherwise it shows "Cutoff passed". | CP-1 |
| 188 | Page plan | **AD-4d Reports & exports** has no place in the new Insights plan. | Low | An "Export" action on Insights › Overview opens AD-4d. | CP-6 |
| 189 | Page plan | Today › Decisions and the Manage hub's **"3 need you"** card would be two decision lists. | Medium | Decisions is the only list; the hub card is removed (its links move to Decisions). | CP-4, CP-7 |
| 190 | Voting | The **48-hour vote lead time** is an open question for the **food department**. | Low | Keep "Runs 48 h" as a sample. | CP-7 |
| 191 | Rule 20 | Confirm that **"3 rows plus See all"** and **rules behind a pill** count as ordering, not hiding. | Low | Yes, they count as ordering: the full list is one tap away. | CP-3 |
| 192 | Waste entry | MS-D4 shows **kitchen staff (Meena) logging waste**, while the MS-D screens are drawn for the supervisor. May kitchen staff execute waste entry? | Low | Yes (the matrix gives kitchen staff E). | CP-1 |
| 193 | Menu decision | In production, who **approves a menu change** after a vote: the admin (AD-5d "you decide") or the food head? | Medium | The admin, as built; the food head sees it in the log. | CP-7 |
| 194 | Pass reissue | In production, who **approves a reissue**: the admin (AD-6b) or SRM (which sets the pass rules)? | Low | The admin, under SRM's rule. | CP-7 |
| 195 | Prep override | May the **food head reverse a live override** (one within the limits that is already in effect)? | Low | Yes, with a reason, and the supervisor is told. | CP-4 |
| 196 | Decisions by role | Only the demo Admin's Decisions list is designed. **Other roles' lists** (supervisor, food head) are not, and staff see approvals inside MS-E's cards today. | Low | Build food head and supervisor states of Decisions in CP-4. | CP-4 |
| 197 | Demo approvals | The demo Admin holds **every approval**. How are approvals that belong to another role in production marked? | Low | A role tag on the row, for example "Food head approval". | CP-4 |
| 198 | Reasons display | Below what **coverage** should a reasons breakdown be withheld (for example 3 of 640 who skipped)? | Low | Always show the coverage count. Withhold the breakdown when fewer than 10 answered (rule 15). | CP-6 |
| 199 | Biryani report time (inventory N1) | Staff MS-D2 lists the safety report at 12:45 PM (and MS-E at 12:30 PM), but admin says it was received at **1:25 PM** (AD-3.1). Which is canonical? | Medium | Keep 1:25 PM (the escalation timeline depends on it) and remove the row from the pre-1:25 staff moments. | CP-1 |
| 200 | Student urgent report (N2) | The student sample reports a **stone in the rice** at 12:41 PM, but the only SOS case is the **biryani foreign object** at 1:25 PM. | Low | Re-point the student sample to the biryani case at 1:25 PM. The student app's user is Aarav, so the admin's reporter mask becomes •••0238 (it is •••2231 today on AD-3b and AD-7d). | CP-1 |
| 201 | Sambar story (N7) | The student sees Sambar "Too salty" as **Fixed** (breakfast, 5 Aug), while staff and admin show **6 lunch reports, Recheck Fri**. | Low | Make the student's report one of the 6 lunch reports, showing "Recheck Fri". | CP-1 |
| 202 | Student voting (N12) | Admin vote tallies (1,204 / 388) have **no student vote screen** behind them, and the legacy critique dropped "final vote". | Medium | Owner decides: add a student vote surface, or make votes a mess-committee action. | CP-7 |

## Stage 1 · Today, 1A (2026-10-01)

### Resolved

- **199** (biryani report time): the owner set 12:45 PM, with auto-escalation at 1:15 PM. AD-3b and the AD-7d sheet now match. MS-D2's "Updated 12:45 PM" now agrees.
- **Inventory L50 / N5** (all-mess total): Now shows 1,872 of 2,360 for 3 of 4 messes, with Annexe named apart.

### New findings

| # | Frame(s) | Issue | Severity | Suggested fix |
|---|---|---|---|---|
| 203 | Today · Now (all states) | The **bell** (asked for by the brief) has no destination. There is no admin notifications page in the page plan, and an unlinked control is a dead control. | Low | Add an admin notifications page to the plan (Today › Now › bell), or drop the bell. |
| 204 | Today · Now (Empty) | Rules 10 and 20 conflict. The Empty state keeps blocks 2 and 3 (never hide), so "Nothing needs you right now" can't be vertically centred. | Info | Accept: on a page with other evidence, the Empty message takes block 1's slot. Reword rule 10 to apply to pages whose only content is the empty message. |
| 205 | MS-E Shift home (09), MS-D4, AD-7d | At 12:30 PM MS-E shows "1 safety report", before the 12:45 report. MS-E, MS-D4 and AD-7d still show the Curd request as pending or "needs approval", although it lapsed at 11:30. | Low | Staff text pass (CP-1): MS-E Feedback reads "No safety reports" at 12:30; Curd reads "lapsed" everywhere (inventory L35–L36). |
| 206 | AD-3b resolution log | The When · who lines set words in mono (rule 27, gap 171), and the new escalation and hold rows copy that style. | Low | Fix with gap 171 in the components or Issues stage: mono for times and IDs, Inter for the words. |

## Stage 1 · Today, 1A.1 (2026-10-01)

| # | Frame(s) | Issue | Severity | Suggested fix |
|---|---|---|---|---|
| 207 | Now · Needs-you card (and 1B) | StatusPill has no dark-surface version. On black, Stop and Lapsed pills use instance overrides (fill, stroke, label colour) that follow ResultCard's tag vocabulary. | Low | Add `Surface = Light / Dark` to StatusPill in the components stage (CP-2), then drop the overrides. |
| 208 | Now · Entered card | The "How counted" info pill has no destination until the data-freshness sheet exists (1E). | Info | Wire it in 1E. |

## Stage 1 · Today, 1A.3 (2026-10-01)

The 1A.2 run ("dark and circular") was stopped before it was written up. Its planned gaps are not filed; the ones that still apply are folded in below.

### Status of earlier gaps

- **207** (StatusPill on black): no longer used on Now, because the hero card has no pills. It still applies if 1B puts pills on a black card.
- **208** (info destination): carries over to the Messes card's info icon, which opens the data-freshness sheet in 1E.

### New findings

| # | Frame(s) | Issue | Severity | Suggested fix | Stage |
|---|---|---|---|---|---|
| 209 | QuestionCard (page 03), Now Success and Offline | Button has **no on-dark style**. "Call Ravi" (lime fill, `on-lime` label and icon) and "Open case" (no fill, `on-hero-secondary` outline, `on-hero` label) are instance overrides inside the new component. | Low | Add `Surface = Dark` to Button (Primary in lime, Secondary outlined) in the components stage, then drop the overrides. | CP-2 |
| 210 | Now (Offline) | **Closed (1A.4):** both actions stay live offline, view only; "Needs a connection" is gone and the saved-case link moved from the question text to "Open case". Was: "Open case" is **dimmed** as the brief asks, but AD-3b has an Offline state and viewing is allowed offline (CP0.4). The saved case now opens from the question text, which is less discoverable. | Low | Owner decides: keep "Open case" live offline (view only) and dim only "Call Ravi", or keep both dimmed. | 1B |
| 211 | Now (Success) | **The vote link is retired.** The Idli sambar vote has no row on Now; it sits behind "5 more need you". AD-5d stays reachable from AD-5c (Decide) and the Manage hub (Chip · Vote). | Info | Restore the link as the vote's row on Decisions. | 1B |
| 212 | TimeRail | **Lime on a light track:** the fill reads 1.16:1 against the `border` track and 1.26:1 against white. Elapsed time is also carried by the ink-ringed now dot (14.97:1 on lime, 18.88:1 on white) and the "now 1:40 PM" text, so the fill is never the only carrier. | Low | Accept, or give the fill an ink edge (or darken the track) if the fill alone must reach 3:1. | CP-2 |
| 213 | Now (3 frames) vs every other admin frame | **Closed (1A.4):** the owner restored the fixed lime wash on Now, as on every other admin frame; lime stays off the cards. Was: Rule f (lime only on the primary button, the rail fill and the now dot) removed the **lime wash** from the three Now frames: canvas only, with the Plain top fade. Every other admin frame keeps the wash. | Low | Owner decides: apply the rule page-wide and drop the wash from all admin frames, or keep it as a Now-only rule. | CP-3 |
| 214 | Now · Messes card | **The status dot is colour-only.** Stop (`ink`) and Hold (`ink-secondary`) dots differ only in shade; Offline is a ring. 1A.1 used glyphs for this. | Low | Give Hold a different shape (half dot or small clock), or accept, since every ring opens its mess detail. | 1D |
| 215 | Now · Watch row | **Small tap targets:** "4 shortages" and "1 crowd" are 18 pt text links inside a 72 pt row. They keep the AD-2c and AD-2a links until Watch exists. | Low | When Watch (1E) is built, the whole row opens Watch and the word links retire. | 1E |
| 216 | Now (all states) | **Unlinked controls waiting on later substages:** "5 more need you" (→ Decisions, 1B), the info icon (→ freshness sheet, 1E), the Messes chevron and denominators (→ Messes, 1D), the Watch row (→ Watch, 1E), "Call Ravi" (a system call, no screen) and the bell (203). | Info | Wire each one in its substage. | 1B–1E |
| 217 | Now · header and hero | **Persona vs demo approvals:** the header reads "Food head" (sample: Devi Raman), but the demo rule is "Admin with all approvals". The 6 items (biryani plus "5 more") include the pass reissue and the 2 access requests, which are Admin approvals in production. | Low | In 1B, tag items outside the food head's approvals with their role (gap 197), or show the true food-head count. | 1B |
| 218 | Now (Empty) | **Closed (1A.4):** the line now reads "Lunch closes 2:00 PM" (the end of service). Was: **"Next check 2:00 PM" has no definition.** Is it the next Prep or Crowd Agent check, the end of service, or the next escalation sweep? | Low | Owner defines it, then 1E's freshness sheet names it. | 1E |
| 219 | QuestionCard · "Call Ravi" | A phone action needs **Ravi's number on file** (AD-7b) and a fallback when there is none. The call is not logged on the case timeline. | Low | Owner decides whether calls are logged on AD-3b; the fallback is "No number on file · Open case". | 1C |
| 220 | Page 11 Admin Dark | **The Dark page is stale.** It holds the 1A.2 design (ring hero, tiles) in Dark mode, with 0 links and no flow start. `elevation/card` (flagged) is now used only there. | Info | Rebuild the Dark twin from the 1A.3 frames when the owner asks. Until then, read page 11 as a superseded study. | Later |
| 221 | Now · Greeting header | The greeting header is a **local frame** that follows HomeHeader (same structure and text styles). HomeHeader itself carries student-only items: the wordmark, credits and report button. | Low | Add a `Role = Student / Staff` variant to HomeHeader (avatar and bell for staff) in the components stage. | CP-2 |

## Stage 1 · Today, 1A.4 (2026-10-03)

### Status of earlier gaps

- **210** (Offline actions): **closed.** "Call Ravi" and "Open case" stay live offline, view only. "Needs a connection" is removed from the hero. The saved case (AD-3b Offline) now opens from "Open case", not from the question text.
- **213** (lime wash on Now): **closed.** The owner restored the fixed wash (`wash/top` → `wash/clear`, 0 to 300 pt) on the three Now frames, as on every other admin frame. Lime stays off the cards.
- **218** ("Next check"): **closed.** The Empty line reads "Lunch closes 2:00 PM".
- **221** (greeting header is a local frame): still open. The row now carries the AppWordmark like the student HomeHeader, which makes a `Role = Staff` HomeHeader variant simpler.

### New findings

| # | Frame(s) | Issue | Severity | Suggested fix | Stage |
|---|---|---|---|---|---|
| 222 | QuestionCard (page 03) | **Meal-phase questions are logged, not built.** Only During ("Safe to keep serving lunch?") exists. Before ("Is lunch ready to serve?") and After ("Ready to close lunch?") have no variant, sublines or actions. | Info | Add a `Phase = Before / During / After` property when the owner defines each phase's line and actions. | 1B |
| 223 | QuestionCard lines | **Times in the hero line are Inter**, for example "Lunch closes 2:00 PM" (and "escalated 1:15 PM" before 1A.4). The TimeRail on the same screen sets its times in mono ("now 1:40 PM"). Rule 27 allows both readings. | Low | Owner decides: times in mono everywhere (as on the rail), or Inter inside sentences. | CP-2 |

## Stage 1 · Today, 1B + 1C (2026-10-03)

### Status of earlier gaps

- **211** (vote link retired on Now): **closed.** The vote's row on Decisions → AD-5d.
- **216** (unlinked controls on Now): "5 more need you" → Decisions is now linked. The info icon, the Messes chevron, the Watch row, "Call Ravi" and the bell remain.
- **207** (StatusPill on black): applies again. The Decisions hero chips and the AD-1d Lapsed pill use on-dark overrides.

### New findings

| # | Frame(s) | Issue | Severity | Suggested fix | Stage |
|---|---|---|---|---|---|
| 224 | AD-1c hero | **The type chips are display only** (as briefed): "1 safety", "1 lapsed", "1 vote", "1 pass", "2 access" don't filter the rail. | Info | Make them filters (single select, with "All") when the list grows past one screen. | Later |
| 225 | AD-1d evidence card | **ChartBar `Pill` kinds are built for dark cards.** `Pill` is white, so on the white evidence card the Cooked / Plans bar fill is overridden to `ink`. `Pill ghost` uses `on-hero-secondary`. | Low | Add `Surface = Light` to the Pill kinds (ink, lime, dashed `ink-secondary`) in the components stage. | CP-2 |
| 226 | AD-1d Offline, Read-only | **The Offline and Read-only details are drawn before the cutoff (11:18 AM)**, because both still have a decision to make. So AD-1c Offline (1:40 PM, Curd lapsed) has no matching detail, and its Curd row is unlinked. | Low | Owner decides: add a Lapsed-offline detail (Record outcome dimmed), or accept the unlinked row. | 1C |
| 227 | AD-1c Offline | **Vote and pass rows are unlinked** (AD-5d and AD-6b have no Offline frames). The Awaiting others row has no chevron and no link offline. | Low | Add view-only Offline states to AD-5d and AD-6b, or keep them unlinked. | Later |
| 228 | Page 10 grid | **AD-1 has no sheet row.** The Awaiting others sheet sits in the AD-2 row at x 3784 (the first free slot), because AD-2c fills the slot under AD-1c. | Info | Add an "AD-1 · Sheets" row (moves every row below by 1,092), or keep it. | Later |
| 229 | AD-1d actions | **"Record outcome" and "Approve" have no destination.** The decline reason is a component state (Declining), with no typed or submitted state, and no sent, failed or saved receipt. | Medium | Build the outcome sheet and the approve/decline confirmations with sending and failed states (rule: no receipt before the server confirms). | 1C |
| 230 | Now ↔ Decisions | **No transition rule for sub-tab pills.** The Decisions pill uses Dissolve 0.25, and the Now pill on AD-1c returns with BACK. | Info | Add a pill-switch role to §0.5.1, for example an instant swap. | Later |
| 231 | AD-1c Empty | **Chips at 0 are all plain outlines.** The white "safety" and dashed "lapsed" styles mark something that needs attention, so at 0 they fall back to the plain outline. | Info | Confirm. | 1B |
| 232 | AD-1c rows | **Times mix formats:** today's rows show "12:45" with no AM/PM (as briefed), but "Tue 8 PM" does. AD-7d writes "12:52 PM". | Low | Pick one rule for rails: today's times without AM/PM, older items with day and AM/PM, or AM/PM everywhere. | CP-1 |

## Stage 1 · Today, 1D + 1E + 1C.1 (2026-10-03)

### Status of earlier gaps

- **215** (Watch word links): **closed.** The whole Watch row opens Watch, and the "4 shortages" / "1 crowd" word links are retired.
- **226** (AD-1d Offline before the cutoff): **closed.** AD-1d Offline is now Lapsed at 1:40 PM (saved 1:38 PM), and AD-1c Offline's Curd row opens it.
- **229** (no results for Record outcome / Approve): **mostly closed.** Record outcome → Sending → Saved, with a Failed state; Approve → Approving → Approved. The rest is in gap 235.
- **208 / 216** (info and freshness destinations): the Data freshness sheet now exists and opens from every "updated" label. Now's info icon and its Messes chevron are still unlinked (gap 236).
- **214** (colour-only status dot): carries over to the Messes tiles' issue dots.

### New findings

| # | Frame(s) | Issue | Severity | Suggested fix | Stage |
|---|---|---|---|---|---|
| 233 | AD-1d, DecisionActions | **Lime rule (1D/1E brief: "wash, logo and one action") vs earlier asks:** the Usual use bar (1C brief) and the ResultCard Success icon and tag in `Saved` and `Approved` are lime. | Low | Owner decides: allow lime on data bars and success receipts, or switch those to ink. | CP-2 |
| 234 | AD-1b | **The PrepCard row shows only the 3 dish risks.** Sambar (Adjusted), Rice and Chapati (On plan) carried lime pills and aren't risks, so they are no longer on a live screen (the archived copy keeps them). | Low | Add a "Full prep list" row to a mess prep screen, or accept risks-only. | 1D |
| 235 | DecisionActions | **Approve has no Failed state, and Decline has no submit / sending / failed / receipt states.** | Medium | Add `Approve failed` and a Decline submit path with the same sending → saved / failed pattern. | 1C |
| 236 | Now | **The info icon (→ freshness sheet) and the Messes chevron (→ Messes) are still unlinked.** Both destinations now exist, but these links were not in the brief. | Low | Link them in the next Now pass. | 1F |
| 237 | Freshness sheet | **One background (Watch).** Opened from AD-1b, AD-2a, AD-2c or AD-2d, the dimmed screen behind is Watch. | Info | Add per-opener sheet copies, or accept for the prototype. | Later |
| 238 | AD-1e, AD-1f | **Only the Main tile opens a detail** (AD-1b is Main only); North, South and Annexe are unlinked. The Offline Data gaps tile is unlinked (there is no AD-2d Offline), and Offline "saved" labels don't open the sheet. | Low | Build North/South/Annexe details (or one parameterised detail) and AD-2d Offline. | Later |
| 239 | AD-1e / AD-1f Empty | **EmptyState with no body line** (hidden, so no copy is invented) and the people icon reused from Crowd's Empty state. | Info | Owner supplies the body copy and icon. | 1D/1E |
| 240 | AD-2c, AD-2a Moment notes | Rebuilt frames keep their Moment notes (AD-2a 1:42 PM, AD-2c 1:45 PM), while Watch at 1:40 PM opens them. | Info | Re-time to 1:40 PM, or accept as later moments. | Later |

## Stage 2A · Issues root and the safety case (2026-10-03)

### Status of earlier gaps

- **209** (Button has no on-dark style): **partly closed.** HeroActions now carries the on-dark lime and outlined buttons; QuestionCard still uses instance overrides.
- **199 / 200** (biryani report time and reporter): unchanged; the case keeps 12:45 PM and •••2231.

### New findings

| # | Frame(s) | Issue | Severity | Suggested fix | Stage |
|---|---|---|---|---|---|
| 241 | AD-3a Dishes, Community views | **Kept content, not rebuilt** (as briefed). The Dishes view fills 55% (below the floor), its cards set "6 reports" in mono, and Community keeps a lime "Fixed" pill. Neither view has Empty or Offline. | Medium | Full rebuild of both views on the tab-root template (hero, rails), with Empty and Offline. | 2B |
| 242 | AD-3c Offline | **No longer reachable.** The old Offline overview linked Sambar → AD-3c Offline, and the Dishes view is Success only. | Low | Comes back with the Dishes Offline view (241). | 2B |
| 243 | AD-3b Notified, AD-7d | **New event type "Kitchen notified"** on the case timeline. AD-7d's type sheet and the audit log don't list it. | Low | Add it to the audit-log types (who notified, when, which kitchen). | Later |
| 244 | HeroActions `Sending` | The outline of the Loading Secondary renders fainter than the other on-dark outlines. | Info | Add `Surface = Dark` to Button (gap 209) and drop the overrides. | CP-2 |
| 245 | AD-3b2 sheet | **Sheet states are drawn frames.** Verify and send → Sending → Sent / Failed are not wired (the brief linked only Close and Reopen). | Low | Make the sheet's action block a component with in-place states (like DecisionActions). | Later |
| 246 | AD-3b Confirmed | The enabled close row also opens the Verify and close sheet (the same action as the lime button), so it is not a dead control. The brief didn't list this link. | Info | Confirm, or make the row non-interactive. | 2B |
| 247 | AD-3a SOS Empty / Offline | **Pills are not linked** (the Dishes and Community views are Success only). | Low | Link them once the views have Empty and Offline (241). | 2B |
| 248 | AD-3a2 | The open biryani row doesn't open the case (no link was briefed). | Low | Link the open row → AD-3b. | 2B |

## Stage 2B · Open items (2026-10-03)

### Status of earlier gaps

- **233** (lime rule): **closed.** design_intent.md now carries the owner's lime rule.
- **235** (Approve failed, Decline states): **closed.**
- **236** (Now info icon and Messes chevron): **closed.**
- **238** (only Main had a detail): **partly closed.** North detail built; see 249.
- **239** (Empty bodies): **closed** (see 250).
- **243** (Kitchen notified type): **closed** in the AD-7d Type sheet.
- **245** (verify sheet states): **closed.** Wired with SWAP.
- **248** (AD-3a2 open case): **closed.**

### New findings

| # | Frame(s) | Issue | Severity | Suggested fix | Stage |
|---|---|---|---|---|---|
| 249 | AD-1e Messes | **South and Annexe tiles stay unlinked**, and the Offline North tile has no North Offline detail. | Low | Build South (and an Annexe "not reporting" detail) and North Offline from the AD-1b pattern. | Later |
| 250 | AD-1f Watch Empty | **The body repeats the title** ("Nothing to watch right now" / "Nothing to watch right now."), as briefed. | Info | Owner picks one, or a different body line. | Later |
| 251 | DecisionActions `Decline ready` | The entered reason "Usual use is 55 L" is sample text (taken from the evidence). The field-tap step stands in for typing. | Info | Confirm. | Later |
| 252 | Sheets, Now icons | Now Offline's info icon, and the AD-1b Offline pill, open the online freshness sheet (a view-only reference). | Info | Accept, or add an Offline freshness sheet. | Later |

## Stage 3A · Insights root, Overview and Meal record (2026-10-03)

### Status of earlier gaps

- **242** (AD-3c Offline unreachable): **closed.** Meal Offline's Feedback row opens it.
- **250** (Watch Empty body): **closed.**
- **252** (no Offline freshness sheet): **partly closed.** The sheet exists and opens from Meal Offline's Intent row; see 260.

### New findings

| # | Frame(s) | Issue | Severity | Suggested fix | Stage |
|---|---|---|---|---|---|
| 253 | AD-4e Meal | **Timing conflict, kept as is:** MS-D logged plate waste at 12:40 PM while lunch runs to 2:00 PM, and the record shows "Plate waste 18 kg" at 1:40 PM. | Medium | Owner decides when plate waste is logged (after close?) and the record's moment. | Later |
| 254 | AD-4e chain | **Prep, Unserved and Plate waste rows are unlinked** (no destination briefed). | Low | Prep → AD-1d or the audit log; Unserved and Plate waste → a waste-log detail. | Later |
| 255 | AD-4a | "Waste and shortages · 4 weeks" opens AD-4c, which shows waste only. | Low | The paired waste-and-shortages view. | Later |
| 256 | AD-4a Empty, AD-4e | Overview Empty's **Meal pill is unlinked** (Meal has no Empty), and the Empty subtitle drops "of 4 reporting" (no count was given). | Low | Add a Meal Empty, or route the pill to it. | Later |
| 257 | Data freshness sheets | The **Intent row opens a sheet with no intent feed** (the "356 yes · 412 answered" source and time are not listed). | Low | Add an "Intent · answered by …" feed row. | Later |
| 258 | AD-4a Trends tile | Draws the four measured weeks (742 / 718 / 680 / 642) and **skips 22 Jul** (not measured, dashed on AD-4c); the "4 weeks" row spans five calendar weeks. | Info | Confirm, or add a dashed slot. | Later |
| 259 | AD-4a Offline | Counts 3 messes (546 kg) but keeps the 4-mess comparison "−38 kg" and 2 shortages from the saved values. | Info | Owner supplies 3-mess figures, or the line says "4 messes". | Later |
| 260 | Now Offline, AD-1b Offline | Their freshness openers (gap 252) still open the **online** sheet; no relink was briefed. | Low | Retarget both to `1333:100350`. | Later |
| 261 | AD-4e Prep row | The dashed **Override** pill reuses StatusPill `Lapsed` (the only dashed pill) with a new label. | Info | Add a StatusPill `Override` variant (new component state). | Later |
| 262 | AD-4e, AD-4c | Now tab-root views, so **no Back**: arriving from "Look closer" or a tile shows pills, not Back. | Info | Confirm. | Later |
| 263 | AD-4c | Moment note stays 2:07 PM (content unchanged) while the other Insights views read 1:40 PM. | Info | Align on the next AD-4c pass. | Later |

## Stage 4A · Student Meals menu layout and lunch dish names (2026-10-03)

### Status of earlier gaps

- **110** (student lunch menu): **partly closed.** Names are aligned on the Meals menu family, Service ended, Intent, the lunch Meal detail frames and page 06. Tracker numbers, rings, Your plate and AD-5a remain (264); decisions 1 and 2 of the inventory are still open.

### New findings

| # | Frame(s) | Issue | Severity | Suggested fix | Stage |
|---|---|---|---|---|---|
| 264 | Your plate (21 frames), plate tracker H frames, Home plate tile, AD-5a (3) | **Deferred as briefed:** still list Beetroot poriyal and Chicken curry, with the old numbers and rings. | Medium | Run after the sample plate and IFCT values are decided (gap-110 decisions 1–2). | Later |
| 265 | Meals family | Besides "You’re in", the **Special pass tile carries lime** (its dot; the icon tile in Dark) and the **Dark selected date** is lime, from component tokens. | Low | Set the SpecialPassTile dot to ink, or accept both as "now" markers. | Later |
| 266 | Meals · Offline (04/05/07) | **Pills, tiles and rows are unlinked** (no offline Dinner or Breakfast variant). Loading has no pills. | Low | Add offline variants, or link the pills to the online ones. | Later |
| 267 | Menu — Breakfast | The card keeps the old Breakfast row's link to **Meals · Meal detail, which is dinner**; breakfast dishes are unlinked (no breakfast dish detail). | Low | A breakfast Meal detail. | Later |
| 268 | Menu — Breakfast | **Breakfast dishes (Idli, Sambar, Coconut chutney)** come from Feedback · Pick dish, the only breakfast list in the file. | Info | Confirm. | Later |
| 269 | Meals family | The special pass appears twice: the "Wednesday special" row and the Special pass tile, both → Pass · Available, as briefed. | Info | Confirm, or drop one. | Later |
| 270 | Menu (07) | Dish details are positional: Paneer butter masala and Curd → "not provided", Rice, Sambar and Chapati → the Sambar detail. | Info | Per-dish details for the new dishes. | Later |
| 271 | Meals · Offline | The banner wraps "AM" onto a second line (pre-existing). | Info | No-break space before AM in the banner text. | Later |
| 272 | Menu — Dinner / Breakfast | No full-scroll copies on 04 / 05. | Info | Add them in the next gallery pass. | Later |
| 273 | DishLine, CrowdRow | The small veg mark, sentence-case "Veg" and the non-mono "Updated" are **instance overrides** on the Meals family only; Meal detail and Intent keep the 44 pt circle and the mono "VEG" tag. | Low | DishLine `Size=Compact` variant (new component state), and fix the mono words in both components (rule 27). | Later |

## Stage 4B · Canonical dishes in the tracker and the admin menu (2026-10-03)

### Status of earlier gaps

- **109** (Curd nutrition): **closed.** Curd is in AD-5a with sample nutrition.
- **110 / 264** (tracker and AD-5a on the old lunch): **closed** with sample values (`nutrition_sample.md`); verified values are still owed.
- **252, 256, 257, 263, 267:** **closed** (relinks, Meal Empty, intent row, Moment notes, Breakfast card).
- **253** (waste timing): **closed.** Waste is logged after close (2:20 PM); Insights moments 2:35 PM.

### New findings

| # | Frame(s) | Issue | Severity | Suggested fix | Stage |
|---|---|---|---|---|---|
| 274 | H6, H9 Quick add (04/05/07) | **"1,070" (ML/Hero Metric 52) is wider than the ring's 140 pt opening** and runs into the ring stroke. Not shrunk, as briefed. | Medium | Owner picks: a smaller style for 4-digit totals, no thousands comma in the ring, or a larger ring. | Next |
| 275 | Home · After last meal (07) | Today's plate tile: **"1,070 kcal" pushes "kcal" past the tile edge.** | Low | Same decision as 274 (or "1.1k"). | Next |
| 276 | AD-5b | **No "Arithmetic check · not a lab value" chip exists.** The check chip reads "Check: 4P + 4C + 9F = 112 · within 5% of 110" and was left as is. | Low | Confirm the wording (replace, or add a second line). | Next |
| 277 | AD-4 row | The brief set the Waste view note to 1:40 PM and all Insights notes to 2:35 PM; **all AD-4 frames now read 2:35 PM**. | Info | Confirm. | Next |
| 278 | AD-4e Meal (Offline) | The banner "saved 1:38 PM" predates the 2:20 PM waste entry, yet the record shows plate waste 18 kg. | Low | Banner "saved 2:30 PM", or hide plate waste offline. | Later |
| 279 | AD-7d Audit log (Success, Type sheet, entry backgrounds) | The 3-row preview (1:32, 12:52, 12:41 PM) **doesn't show the newer 2:20 PM waste entry**. MS-D1a's "2:20 PM" is set in Inter (pre-existing). | Low | Refresh the preview to the 3 newest; mono on the time. | Later |
| 280 | Meals · Dish detail (04/05/07) | The lunch dish detail shows **Dal tadka 320 kcal**, which isn't on the lunch list; lunch dish rows open it. | Medium | Make it Sambar (110 kcal, from the table). | Later |
| 281 | PrepCard rings, MacroBar | Redrawing to the rule fixed a pre-existing drift (Sambar arcs and bars were up to 1.3 pt off). | Info | — | — |

## Stage 4C · Small fixes from 4B (2026-10-03)

### Status of earlier gaps

- **274, 275, 276, 278, 279, 280:** **closed** (see the contract, Stage 4C).
- **277** (Insights Moment notes): **closed** as applied in 4B (all AD-4 frames 2:35 PM).

### New findings

| # | Frame(s) | Issue | Severity | Suggested fix | Stage |
|---|---|---|---|---|---|
| 282 | Meals · Dish detail (04/05/07) | The portion and allergen chips still read "1 bowl", "Mustard seeds", "Curry leaves" (Dal tadka's). The brief changed the name, kcal and macros only. | Low | Owner supplies the Paneer butter masala portion and allergens (e.g. milk). | Next |
| 283 | Meals · Dish detail — not provided | Still titled Dal tadka; the menu's Paneer butter masala and Curd rows open it (positional links from 4A). | Low | Retarget the Paneer row to the full detail, or retitle this one Curd. | Next |
| 284 | Meals · Dish detail | NutritionBento is detached in 3 frames (bars to data). | Info | A bar-width property on the component. | Later |

## Stage 5A · Manage tab root (2026-10-03)

### New findings

| # | Frame(s) | Issue | Severity | Suggested fix | Stage |
|---|---|---|---|---|---|
| 285 | AD-5-0 | The NeedsYouCard chips (Vote, Pass, Pickup) and their links are gone with the card; their destinations (AD-5d, AD-6b, AD-6d) are now reached through Decisions and the tiles only. | Info | Confirm. | Later |
| 286 | AD-5-0 Empty | People keeps "38 people" (people exist on an empty day); every other tile reads zero. | Info | Confirm. | Later |
| 287 | 99 Archive | Two older archive copies (AD-3a SOS, AD-4a Overview) still carry flow starts ("Admin · Issues", "Admin · Insights"). | Info | Remove them in a cleanup pass. | Later |

## Run 2 · Stage 3 · Student mechanical (2026-10-03)

### Closed

| # | Status |
|---|---|
| 52 | **Closed for screens.** The 9 overflowing page-07 screens (Feedback · Step 2 Not good / Sending / Failed, Report · My reports / Fixed, Rewards / Rewards · Offline, Settings · System off, Notifications · Offline) scroll with the R9 + R9c inline pattern; the last item is 20 pt above the tab bar or the Send footer. The 7 sheet backgrounds (Waste · How measured, Request correction ×3, Entry · Discrepancy ×3) stay at rest by design. See run2/s3/stage3.md. |
| 77 | **Closed.** Dinner Meal detail answer frames exist on 04, 05 and 07 (Yes Sending / Saved / Failed, Track this meal?, No · Why not, No · Saved, Not sure Sending / Saved). The three Meal detail answer links stay inside Meals. |
| 92 | **Closed (already in place).** Discrepancy — sending → after 1.5 s → Under review ("Request sent"). |
| 105 | **Closed for student WeekBars.** The bars are screen-level ChartBar instances drawn from the printed grams (×109/84 pt) on 28 Waste frames (04/05/07). |

### New findings

| # | Frame(s) | Issue | Severity | Suggested fix | Stage |
|---|---|---|---|---|---|
| 288 | 07 lunch Meal detail copies (Sending, Saved, Track) | No content links (dishes, tiles) unlike the dinner copies; Crowd only. | Low | Copy the Meal detail content links. | Later |
| 289 | 04 / 05 dinner Track this meal? | The lunch H1 on 04/05 has a design-page link Track → Your plate · expanded; the dinner copy does not (the clone dropped it). | Info | Add it if the design-page flow needs dinner too. | Later |
| 290 | Meals · Meal detail (dinner, 07) | Back has no link on the source frame (copies use Back → Meals · Menu). | Low | Add Back → Meals · Menu (Move out 0.3). | Stage 11 |

## Run 2 · Stage 4 · AD-4c Waste (2026-10-03)

| # | Frame(s) | Issue | Severity | Suggested fix | Stage |
|---|---|---|---|---|---|
| 291 | AD-4a Overview (Offline) | Banner reads "Offline · saved 1:38 PM", while the run default for Insights is "saved 2:32 PM" (AD-4c Offline uses 2:32). | Low | Align the Insights offline banners. | Audit |

## Run 2 · Stage 5 · Issues views (2026-10-03)

| # | Frame(s) | Issue | Severity | Suggested fix | Stage |
|---|---|---|---|---|---|
| 292 | IssueCard (page 03) | The current-step segment is lime in every card, so a list shows several lime data highlights. The admin Community view overrides it to ink per instance. | Medium | Add a `Highlight` boolean or an ink variant, and decide for the student list too. | Audit |
| 293 | IssueCard (page 03) | "UPDATED 5H AGO" is set in mono caps with words, which breaks "mono only for numbers". | Low | Footnote style with mono numbers only. | Audit |
| 294 | AD-3a Dishes / Community | Other dish rows (Rice, Paneer, Curd) and "Not now" have no destination. | Info | Add per-dish detail states if needed. | Later |

## Run 2 · Stage 6 (2026-10-03)

| # | Frame(s) | Issue | Severity | Suggested fix | Stage |
|---|---|---|---|---|---|
| 295 | AD-6b Approved | "Reissue approved 1:42 PM" (brief) comes before the 2:00 PM expiry shown on the same card. | Low | Move the approval after 2:00 PM, or the expiry before it. | Owner |
| 296 | AD-7a People | "2 access requests · Suresh · Lakshmi" doesn't count Ravi's 10:52 AM scanner ask. | Low | Make it 3, or move Ravi's ask into AD-7c. | Later |
| 297 | AD-7b Remove access sheet | Unreachable now that Staff access has no Remove access button. | Low | Add a text button under DecisionActions, or archive the sheet. | Stage 11 |
| 298 | AD-7a Give access sheet | Meena's row has no destination (no Staff access frame for her). | Info | Build one if needed. | Later |

## Run 2 · Stage 7 (2026-10-03)

| # | Frame(s) | Issue | Severity | Suggested fix | Stage |
|---|---|---|---|---|---|
| 299 | AD-6d2 Pickup detail | Offered step reads "Ravi · •••4417 · kitchen supervisor"; Staff access now has Ravi as Kitchen staff with Supervisor off. | Low | Say who offered (the supervisor) or drop the role. | Audit |
| 300 | AD-6d Offered / Collected / Late | Reachable only by the gallery; no live trigger moves Accepted to Collected or Late. | Info | Intentional states; add a timeout if a demo needs it. | Stage 11 |

## Run 2 · Stage 11 (2026-10-03)

| # | Frame(s) | Issue | Severity | Suggested fix | Stage |
|---|---|---|---|---|---|
| 301 | Page 09 staff screens | No back or home control. The prototype uses a tap on the StaffTopBar to return to MS-E. | Medium | Add a Home affordance to StaffTopBar. | Later |
| 302 | Page 10 Empty / Offline families | 54 state frames are reachable only on canvas (no live toggle). | Info | Use a states gallery start like page 07's. | Later |
| 303 | MS-E vs Staff access | MS-E shows Ravi as Supervisor; admin Staff access now has him as Kitchen staff with Supervisor off. | Low | Pick one role for Ravi across 09 and 10. | Owner |

## Run 2 · Stage 12 audit (2026-10-03)

The full findings are in `final_audit/README.md`. New gaps from the audit:

| # | Frame(s) | Issue | Severity | Suggested fix | Stage |
|---|---|---|---|---|---|
| 304 | Student lunch (07) vs admin (10) | The student lunch answer says "Change till 9 AM", while admin uses an 11:30 cutoff for lunch. | Medium | Decide one lunch cutoff. | Owner |
| 305 | 09 MS-0 and 10 AD-0 sign-in rows | No Moment note or sample chip (missed in Stage 11). | Low | Add them. | Next |
| 306 | MealHero, StepBar, IssueCard, eyebrow text style | Words set in mono on about 175 prototype screens (eyebrows in mono caps, meal window lines, step labels, "UPDATED 5H AGO"). | Medium | Fix in the components and the eyebrow style. | Next |
| 307 | 07 dead chevrons (186 in 66 screens) | Rows with chevrons and no link: Entry history, Entry · Discrepancy, the You list behind the sheets, Report · No one on duty. | Medium | Link the rows or drop the chevrons. | Next |
| 308 | 09 MS-A1 / MS-B1 avatar | The StaffTopBar avatar shows on the scanner and pass-desk homes, but only the supervisor (Ravi) has a profile sheet. The avatar there is unlinked. | Low | Add account profiles, or hide the avatar on those homes. | Next |
| 309 | 10 AD-4d Reports | Only "All messes" has a preview (AD-4f). The Main / North / South / Annexe rows have no destination (chevrons hidden). | Low | Build per-mess previews, or one preview with a mess picker. | Next |
| 310 | 10 AD-5a Menu dish cards | Only Sambar opens (Edit dish). The Rice, Paneer, Chapati and Curd cards do not open on tap (swipe-row rule). | Medium | Add Edit dish frames for the four dishes. | Next |
| 311 | Cross-role shortage | Staff MS-G2 sends a Main Mess Rice alert (1:52 PM). Admin AD-2c lists Rice for North Mess only. | Low | Add the Main Mess alert to AD-2c, or change the staff sample. | Next |
| 312 | 09 MS-E-empty | The shift line reads "Kitchen staff", while MS-E reads "Supervisor" (gap 303 family). | Low | Align it with the supervisor account. | Next |
| 313 | 09 result screens | 21 frames sit under the 75% fill floor (42–72%): scanner and pass-desk results, C4a, C4b, D3a, D4. | Medium | Centred result + next action, or a recent-scans rail. | Next |
| 314 | 09 MS-D1 Waste entry | The last item is 16 pt above the footer (rule 20). | Low | Trim the spacing or scroll. | Next |
| 315 | 09 / 10 state frames | About 80 state frames (Failed, Offline, Empty, scan outcomes) cannot be reached in the prototype. Only page 07 has state galleries. | Medium | Add a "States" gallery start per role, or accept them as canvas-only. | Owner |
| 316 | 10 AD-1b Annexe hero | "—" in the hero metric renders as a long bar. | Low | Use a chip "Not counted" and hide the number. | Next |
| 317 | 07 student navigation (report only) | Report · Receipt and Urgent receipt have no Back. Reminder prompt has no Close. 41 state frames have an unlinked Back. 44 frames have dead chevrons. | Medium | A student pass (student edits: 04 source → 05 → 07). | Owner |

## Final-fix run (2026-10-04)

| # | Where | Gap | Severity | Fix | When |
|---|---|---|---|---|---|
| 318 | 09 staff starts | Scanner (MS-A1–A6) and pass desk (MS-B1–B8) are unreachable from the only staff start (Mess staff · Sign in); no duty picker exists. | Medium | Add a duty picker after Confirm profile, or allow two more staff starts. | Next |
| 319 | 07 state gallery | The 96 gallery frames lost their flow start (one student start allowed). | Low | Present from Gallery · A · Sign in, or add a hidden debug link. | Owner |
| 320 | 07 / 09 / 10 | 83 controls lead to destination-absent screens (finalfix_report.md). | Medium | Build the listed screens. | Next |
| 321 | 09 / 10 mono words | Eyebrows and word parts in mono on 19 staff and 28 admin frames. | Medium | Sans style for words, mono for numbers only. | Next |
| 322 | 09 / 10 lime | 12 frames with ≥ 4 lime elements; AD-6c3 (6) and MS-F4 (5) need a by-kind review. | Low | Review under rule V2. | Next |
| 323 | 10 AD-7a / AD-7d | 10 tappables under 44 pt (Give access, Role bar, Type pill, timeline dots). | Low | 44 pt hit areas. | Next |
| 324 | 07 lunch Meal detail | No unanswered / Skip / Not sure states for the lunch Meal detail. | Low | Build them or route to Home answer states. | Next |
| 325 | tools/fa1.js | Counts layers under a sheet's scrim. | Low | Skip under-scrim layers. | Next |
| 326 | 10 AD-5a menus | 10 dish tiles have no Edit dish frame (gap 310 widened by F3). | Medium | One Edit dish template per dish. | Next |
