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
