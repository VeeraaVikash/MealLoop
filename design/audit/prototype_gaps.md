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
| 150 | AD-5c2 Success, AD-5d | "290 kcal · veg" (Pongal) left the proposal rows. It still appears on AD-5d (the vote result), but "Open vote · Pongal on Tuesdays" has no link or sheet to carry it, and the brief kept the button unchanged. | Low | Link Open vote to AD-5d or a confirm sheet that shows the fact, or accept that it lives on AD-5d only. |
| 151 | ChartBar (page 03) | The Pill kinds (Pill, Pill lime, Pill ghost) were defined in this pass, ahead of the Trends and Forecast chart pass that was meant to introduce them. | Info | The chart pass should reuse these kinds, or rename them in one place. The instances on AD-5c2 follow any change to the component. |
