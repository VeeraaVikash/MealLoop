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
| 67 | **Partly done.** Home · After last meal has the two-up dashboard (Today's plate + Spending); a "Nothing logged" variant frame was added. The other Home states are still without cards. |

### New findings

| # | Frame(s) | Issue | Severity | Suggested fix |
|---|---|---|---|---|
| 78 | Home dashboard | The Spending tile is visible to anyone looking over the student's shoulder on Home, while Spending itself is labelled "Only you can see this". | Low | **Build item (decided):** hidden by default; opt in via "Show spending on Home" in Settings. When hidden, Today's plate uses the full-width card. Toggle not built yet (contract 3.6.5). |
| 79 | Home · Nothing logged | Its copied links go to the same destinations as the populated Home (for example "You said the sambar…" follow-up), which may not fit a first-day state. | Info | Review which modules show on a first day. |
