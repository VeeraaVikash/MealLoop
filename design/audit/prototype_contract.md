# MealLoop prototype contract

One running file. Each stage appends a section. Every later stage must follow
everything above it. If a stage has to break a rule here, it says so in its own
section and in its report.

Figma file: `nzzTAm9YnJRSdKEeYUWUEb`.
Pages in scope: 04 Student Light, 05 Student Dark, 03 Components,
06 States & Accessibility, 07 Prototype & QA. 99 Archive is out of scope unless a
stage says otherwise.

---

## Stage 0 - Baseline (read-only audit, 2026-09-28)

### 0.1 Standing rules (from the brief)

- Lab tokens only:
  - Black `#111111` hero cards on an `#EDEDE8` canvas.
  - `#D4F25A` is the only accent.
  - Mono type for numbers.
- Never use:
  - purple, or glass on content
  - food photos
  - BMI or weight UI
  - red "over" states
  - scores
- Existing variables and components only.
  - Dark is built by switching the variable mode to Dark, never by recolouring.
  - Fix things in the component, not frame by frame.
  - No detached copies.
- Do not delete, rename, move or resize existing frames unless a stage allows it.
- Named versions cannot be saved: the plugin API has no `saveVersionHistoryAsync`. Every stage relies on the snapshot and diff in 0.8 instead, and says so in its report.

### 0.2 Where the prototype lives

- **Page 07 Prototype & QA** holds the clickable app. It is Light only, with 258 top-level nodes, 940 link actions and 23 flow starting points.
- **Pages 04 and 05** are design canvases. They have no app-level links. The only links there are the 7 section-H links on each page and two flows that Figma created automatically, starting at H1 and H12.
- **00 Before** is legacy: 139 links and 4 flows. It is not touched.

### 0.3 Transition vocabulary (as found; later stages use exactly these)

| Kind | Trigger | Action | Transition |
|---|---|---|---|
| Push (open a screen) | ON_CLICK on a hotspot, row, card or button | NAVIGATE to frame | DISSOLVE 0.2 s EASE_OUT |
| Back (nav bar chevron) | ON_CLICK on `Back` in the NavHeader | **BACK** | none |
| Sheet close / cancel | ON_CLICK on Close, Cancel or the scrim | **BACK** | none |
| Tab switch | ON_CLICK on a tab item in the TabBar instance | NAVIGATE to the tab's root frame | DISSOLVE 0.2 s EASE_OUT |
| Auto-advance (sending → saved, splash) | AFTER_TIMEOUT 0.8 / 1.2 / 1.5 / 2 / 3 s | NAVIGATE | DISSOLVE 0.2 s EASE_OUT |
| Press feedback | ON_PRESS | NAVIGATE | DISSOLVE 0.2 s EASE_OUT |
| States gallery jump | ON_CLICK | NAVIGATE | INSTANT (`transition: null`) |

Not used anywhere yet: overlays, push/slide transitions, Smart animate, and prototype variables.

**Rules for later stages:**
- **R1.** New screen-to-screen links use the Push row. New back links use BACK. They never NAVIGATE to a fixed frame.
- **R2.** A sheet opened over a screen closes with BACK.
- **R3.** Smart animate is allowed only where a stage asks for it: an in-frame state change, or the lunch "Saved" → H1 step in Stage 3. It is 0.3 s EASE_OUT, and it is only used between frames that share layer names.
- **R4.** A tab link is set on the TabBar component or its instances and goes to the canonical destination in 0.4. Tab links are never per-frame variations.
- **R5.** Every Light link has a Dark twin with the same trigger, action and transition. The destination is the Dark counterpart of the Light destination. Stages that add links do this on both pages.
- **R6.** A NAVIGATE action cannot target its own top-level frame, because Figma rejects it. Use an in-frame variant change instead.
- **R7.** Prototype variables (for example "first run seen") may be introduced only in the stage that needs them. Record each one here: name, type, default, and where it is set and read.

### 0.4 Canonical tab destinations (page 07)

| Tab | Destination |
|---|---|
| Home | Home · Afternoon |
| Meals | Meals · Menu |
| Community | Community · List |
| You | You |

All 256 tab links on page 07 already agree. There is one TabBar component (`74:236`, State Expanded/Minimized × Selected Home/Meals/Community/You). It has 188 instances on Light, 188 on Dark, 6 on page 06 and 127 on page 07, all real instances. None are detached or hand-built.

### 0.5 Flows (page 07)

- **"MealLoop app"** starts at Onboarding · Welcome. It and flows 1–21 each reach the same 130-frame connected app.
- **"States gallery"** starts at the gallery index and reaches 92 frames through INSTANT jumps.
- There are no dead ends and no orphan frames on page 07.
- Three frames exit only through BACK, which is intended for info sheets:
  - Waste · How this is measured
  - Crowd · About this estimate
  - Offer · Not enough

### 0.6 Naming

- A frame is named `Area · State`, for example `Your plate · saved`.
- On page 07, Dark twins, where they exist, carry the suffix ` · Dark`. On page 05, frames keep the Light name and differ only by page.
- Section letters and slot numbers (H1–H14, S1–S5) go in the Moment note beside the frame, not in the frame name.
- New flows are named after the user goal, for example "Plate tracker" or "Search".

### 0.7 Section H baseline (04 and 05 identical)

- All section-H links in and out are DISSOLVE 0.2 s EASE_OUT: H1→H2, H2→H3, H3→H4, H4→H6, H6→H7, H12→H13 and H13→H10.
- H5, H8, H9 and H11 have no links at all. H14 does not exist.
- No section-H frame is reachable from page 07. Stage 3 connects them.

### 0.8 Snapshot and diff method

- **Per top-level node signature:** id | type | name | x | y | w | h | child count | instance count | text count | text hash | fills hash | explicit-variable-modes hash.
- **Per link:** source id | trigger | timeout | action | destination id | navigation | transition | duration | easing, sorted.
- **Per page:** node count, node hash, link count, link hash and flow count.
- **Stage 0 baseline:**

  | Page | Nodes | Node hash | Links | Link hash | Flows |
  |---|---|---|---|---|---|
  | 00 MoodBoard | 19 | 1inbvcm | 0 | 45h | 0 |
  | 00 Before | 25 | 1l5678z | 139 | 97om1q | 4 |
  | 01 Foundations | 1 | u8e8b2 | 0 | 45h | 0 |
  | 02 Mood Frames | 63 | dvpv3d | 0 | 45h | 0 |
  | 03 Components | 256 | u1mrn9 | 0 | 45h | 0 |
  | 04 Student Light | 997 | 1ix5y1f | 7 | ufs5t8 | 2 |
  | 05 Student Dark | 808 | 1dq7m58 | 7 | yh9j5s | 2 |
  | 06 States & Accessibility | 29 | 1b0e5c7 | 0 | 45h | 0 |
  | 07 Prototype & QA | 258 | 155w2xd | 940 | 1j58rc | 23 |
  | 08 Voice & Patterns | 5 | 3our89 | 0 | 45h | 0 |
  | 99 Archive | 46 | 14e5ver | 0 | 45h | 0 |

- **Known artifact on 03 Components.** Instance and text counts inside four component sets change while their instances are still loading on the first pass through the page:
  - NavHeader `74:136`
  - GlassSheet `74:275`
  - IssueCard `101:1470`
  - OnboardingPage `133:43145`

  In this audit the first pass read `4p3kd0`, and three repeat reads all gave `u1mrn9`. A page-03 mismatch counts as a real change only if it survives a repeat read. It must also show up in the stable fields: id, type, name, x, y, w, h, child count, fills and modes. The hash of those stable fields is `o1q792`.
- **Positions to watch:** "Usage / MealHero" `77:286` must stay at (6990, 3).
- **Version history** is not readable from the plugin API. Comparisons "against version history" are reported as not possible.

---

## Stage 0.5 - Prototype hygiene (2026-09-28)

Scope: prototype link properties on page 07, plus the starting-point names on pages 04 and 05. No frames, layers, components or positions changed.

### 0.5.1 Final transition table (replaces the uniform 0.2 s dissolve; supersedes §0.3)

| Role | How it is recognised | Action | Transition |
|---|---|---|---|
| Tab switch | Source is inside a TabBar instance | NAVIGATE to the canonical tab root (§0.4) | DISSOLVE 0.15 s EASE_OUT |
| Drill-in | Click to a different screen that has a Nav Header, is not a tab root and is deeper in the hierarchy | NAVIGATE | MOVE_IN from right (API `direction: LEFT`) 0.3 s EASE_OUT |
| Back from a drill-in | Nav Header back chevron | BACK | None settable. Figma reverses the entry transition, so it moves out to the right. |
| Sheet open | The destination frame contains Scrim/Sheet and the source frame doesn't | NAVIGATE | DISSOLVE 0.25 s EASE_OUT. Never Move in from bottom: the sheet frame already contains the screen behind it. |
| Sheet close | Close, Cancel or scrim on a sheet frame | BACK where it is safe (§0.5.3), otherwise a fixed NAVIGATE | Fixed ones: DISSOLVE 0.25 s EASE_OUT. BACK reverses the dissolve. |
| Sheet primary action / result | Save, Send, Done or a timeout from a sheet to a result screen | NAVIGATE (fixed) | DISSOLVE 0.25 s EASE_OUT |
| Same-screen state change | Tap → Sending → Saved/Failed/Receipt, segment toggles, time-of-day demo, lock-screen expand and answer, sheet → sheet steps | NAVIGATE (click or AFTER_TIMEOUT) | SMART_ANIMATE 0.25 s EASE_OUT **only** when both frames have identical top-level layer names (ignoring Toast, Keyboard and Gallery hotspots). Otherwise DISSOLVE 0.25 s EASE_OUT. |
| States gallery | Gallery hotspots | NAVIGATE | INSTANT (`transition: null`). Unchanged. |
| Unclassified | See §0.5.4 | Unchanged | DISSOLVE 0.2 s EASE_OUT (legacy) until a stage assigns a role |

Rules R1–R7 from §0.3 still apply, with two amendments:

- **R1a.** Back is BACK only when Back is safe. Back is **unsafe** when the frame can be entered through an AFTER_TIMEOUT link, because BACK returns to the auto-advancing frame and bounces forward: a trap loop. On such frames use a fixed NAVIGATE to the sensible parent and record it here. The alternative is to make the feeding timeout link `navigation: SWAP` so that it doesn't enter history. Using SWAP needs the user's approval.
- **R3a.** Smart animate: 0.25 s EASE_OUT for same-screen state changes. The Stage 3 exception (Saved → H1) also uses 0.25 s.

### 0.5.2 Counts (page 07, 940 links, count unchanged)

| Role | Links changed |
|---|---|
| Tab switch → Dissolve 0.15 | 256 |
| Drill-in → Move in from right 0.3 | 210 |
| Sheet open (39) + fixed sheet close/result (20) → Dissolve 0.25 | 59 |
| State change → Smart animate 0.25 | 49 |
| State change → Dissolve 0.25 (layer names differ) | 49 |
| Sheet close NAVIGATE → BACK | 4 |
| **Total changed** | **627** |
| Unchanged: gallery (instant) | 184 |
| Unchanged: already BACK | 83 |
| Unchanged: unclassified | 46 |

### 0.5.3 Back changes

**Converted to BACK (4).** For each of these, the sheet has exactly one entry, which is the old destination, so BACK behaves exactly as before:

| Source frame · layer | Old | New |
|---|---|---|
| Pass · Confirm (holding) · Cancel | NAVIGATE → Pass · Available | BACK |
| Request correction · Close (X icon) | NAVIGATE → You | BACK |
| Request deletion · Cancel | NAVIGATE → Privacy & data | BACK |
| Sign out · Cancel | NAVIGATE → You | BACK |

**Kept as fixed links, deliberately (Back would be wrong).**

| Source | Current target | Why not BACK |
|---|---|---|
| Entry · Under review · Back | Entry history | Only entry is Entry · Discrepancy — sending [timeout]. BACK loops. |
| Pass · Live 1 · Back | Home · Afternoon | Only entry is Pass · Confirm (sending) [timeout]. BACK loops. |
| Pass · Live 2 · Back | Home · Afternoon | Only entry is Pass · Live 1 [timeout]. BACK loops. |
| Pass · Live 3 · Back | Home · Afternoon | Only entry is Pass · Live 2 [timeout]. BACK loops. |
| Pass · Used · Back | Home · Afternoon | Only entry is Pass · Live 3 [timeout]. BACK loops. |
| Answer No · Why not · Close | Answer No · Saved | Entered from Answer No · Sending [timeout]. BACK loops, and the answer is already saved. |
| Pass · Confirm (sending) · Cancel | Pass · Available | BACK would land on Confirm (holding), which is still a sheet, not Available. |
| Community · Comments · Close | Community · Detail | 7 entries, including Comments · Menu/Typing and a timeout. BACK would reopen a sheet state. |
| Comments · Large detent · Close | Community · Detail | BACK lands on the medium-detent sheet, not the screen. |
| Comments · Pending · Close | Community · Detail | Entered from Comments · Sending [timeout]. BACK loops. |
| Comments · Reported · Close | Community · Detail | BACK lands on Comments · Menu. |
| Correction · Sent · Close | You | BACK lands on the Request correction form that was just sent. |

Buttons labelled Done, Close (as text) or Home stay fixed links, as instructed.

### 0.5.4 Unclassified: left unchanged (46)

| Group | Links | Why it has no role yet |
|---|---|---|
| Onboarding forward steps: Welcome → Carousel 1–3 → Sign in → Verifying (timeout) → Confirm profile → All set / Request correction; Request sent → All set; All set → Home | 12 | Is this a drill-in or a step change? Needs a decision. |
| Opening the app from a notification or lock screen: Recheck · Inbox → Recheck Home and Meals · Menu; Notifications · Inbox → Recheck Home and Meals · Menu; Lock screen previews → Recheck Home; Recheck lock "Change" → Recheck Home yes/no; Lock · Saved (Not sure, Still in, Still skipping, Yes, better, Still bad) → Home · Afternoon | 12 | App launch or pop to root. No role defined. |
| Fixed Back arrows (§0.5.3) | 5 | Back would loop. |
| "Done" → Home · Afternoon: Feedback · Receipt, Feedback · Recheck thanks, Report · Urgent receipt, Report · Receipt, Rewards · Got it | 5 | Pop to root. No role defined. |
| Returns to a list: Report · Need more info → My reports; Report · Fixed → My reports ×2 and → What's wrong | 4 | Not a drill-in. It moves up the hierarchy. |
| Notification settings → Recheck lock, Lock screen previews, Lock · Stack, Lock · Fix check | 4 | Demo jump into the lock-screen previews. |
| Meals · Meal detail → Answer Yes/No/Not sure · Tap | 3 | Changes both screen and area (Meals → Home). |
| Community · Suggestion "Me too" → Community · List | 1 | Looks like a wrong destination (open question). |

### 0.5.5 Starting points

- Pages 04 and 05: "Flow 1", "Flow 2" (Light) and "Flow 2", "Flow 3" (Dark) → "Plate tracker (design page)". Two per page, at H1 (Meal detail · Track this meal?) and H12 (Plate tracker · First run). The names are identical, as instructed.
- Page 07's 23 flows are unchanged.

---

## Stage 1 - App shell (2026-09-28)

Before starting, a snapshot of the per-page fingerprints and a full page-07 link dump were stored in root shared plugin data (`mealloop` / `st1_*`). A named version still cannot be saved (the API has no `saveVersionHistoryAsync`).

### 1.0 Trap fix (replaces the 5 looping BACK links)

The 5 frames were entered by an automatic advance, so BACK looped. Each Back is now a fixed link to the parent screen in the flow map, with the transition for its role:

| Source · layer | Old action | New destination | Transition |
|---|---|---|---|
| Community · Supported · Back | BACK (looped via Community · Sending) | Community · List | Move out to right 0.3 s EASE_OUT. Supported is a state of Community · Detail, whose parent is the List. |
| Comments · Pending · Back | BACK (looped via Comments · Sending) | Community · Detail | Dissolve 0.25 s (sheet close) |
| Community · Comments · Back | BACK (could reopen Comments · Reported) | Community · Detail | Dissolve 0.25 s (sheet close) |
| Spending · This week · Back | BACK (looped via Deleting) | You | Move out to right 0.3 s |
| Spending · Saved · Back | BACK (looped via Add expense · Saving) | You | Move out to right 0.3 s |

**Rule R1b.** A fixed back link uses MOVE_OUT (direction RIGHT) 0.3 s EASE_OUT, the mirror of the drill-in. A fixed sheet close uses Dissolve 0.25 s.

### 1.1 Components (page 03)

| Component | What | Notes |
|---|---|---|
| **AppWordmark** (new) | Plate loop mark (logo option A) plus "MealLoop". Size=Header: 24 pt mark, 15 pt semibold, 100×24. Size=Large: 44 pt mark, 28 pt bold, 191×44. | All colours are variables, so it works in Light and Dark (see *Usage / AppWordmark*). The mark tile is bound to `surface`, because the Logo component's tile is hard-coded white and disappears in Dark. |
| **HomeHeader** (updated) | Wordmark added top-left in the existing 44 pt chip row. It is absolutely positioned, so the header stays 128 pt. | **The hero moves 0 pt.** All 154 instances were checked; the gap to the points chip is at least 8 pt in every one (the tightest is the Soon state). |
| **TabBar 74:236** (updated) | Each variant is now a transparent row: glass **Pill** (Home, Meals, Community, You) + 8 pt gap + round **Search** button (TabSearchButton, 62 pt). Pill 289 pt, tabs 70 pt ("Community" label 63 pt). New variant `State=Expanded, Selected=Search`. Minimized variants also get the button (136×64). | Outer size unchanged at 361×62, so no frame needed a clearance fix. The tab links (per-instance overrides) all survived; this was verified inside the change. |
| **TabSearchButton** (new) | State=Default/Selected. Same glass fill, effects and edge stroke as the pill. Selected uses the `tab-selected` highlight. | |
| **Symbol / magnifyingglass** (new) | Added to the Symbol set, filled with `ink`. | |
| **SearchField** (new) | State=Empty/Typing/Offline, 353×44. The Query text property carries the scope and query text. Typing has a 44×44 Clear hit frame. | |
| **SearchResultRow** (new) | Kind=Menu (Diet Veg/Non-veg), Community, Help. Properties Title, Meta and Kcal. Menu rows use the DishRow diet mark and show kcal in mono. | |

### 1.2 Screens

- **Sign in** (04, 05, 07): AppWordmark Large at (20, 66). It isn't added to Carousel 1–3, Verifying or All set.
- **About MealLoop** (new; 04, 05, 07): wordmark, version, tagline, Privacy policy, Terms of use, and a sample-data note.
- **"About MealLoop" row** (SettingsRow Link, info.circle) after Help in every You-based frame: You, You · Offline, Request correction, Correction · Sent, Correction · Failed and Sign out, on 04, 05 and 07.
  - The two full-scroll frames on 04 and 05 grew by 57 pt. Tab bar, home indicator and edge fade moved down 57 pt with them.
- **Search S1–S5** (new; section "S · Search and About" at y 37400 on 04 and 05; row "S · Search and About" at y 36520 on 07):

  | Slot | Frame | Contents |
  |---|---|---|
  | S1 | Search · Empty | Recent searches, device-only note, Clear history, suggestions |
  | S2 | Search · Typing | "sambar", with results grouped into Menu, Community and Help |
  | S3 | Search · Menu result | Sambar: Veg, served day, "Also on", kcal in mono, "Open in menu" |
  | S4 | Search · No results | "biryani" |
  | S5 | Search · Offline | Offline banner, recent searches still available |

  - On the design pages every frame has a Moment note and the Sample note. Search frames use TabBar `Selected=Search`.

### 1.3 Prototype additions (page 07 only; 940 → 1116 links, +176)

| Link | Count | Transition (role) |
|---|---|---|
| Search button → S1 on every tab bar except S1's own (self-link) | 132 | Dissolve 0.15 (tab) |
| Tab links on the 6 new frames (same destinations as §0.4) | 24 | Dissolve 0.15 |
| S1 field → S2; S1 recent "sambar" → S2; S1 recent "biryani" → S4 | 3 | Smart animate 0.25 (state; layer names match) |
| S1 status bar ↔ S5 (demo hotspot, as on Home) | 2 | Smart animate 0.25 |
| S2 Clear → S1; S4 Clear → S1 | 2 | Smart animate 0.25 |
| S2 Sambar ×2 → S3; S2 community → Community · Detail; S2 help → Help | 4 | Move in from right 0.3 (drill-in) |
| S3 "Open in menu" → Meals · Menu | 1 | Dissolve 0.15 (cross-tab jump, same as a tab switch) |
| Back on S1–S5 and About | 6 | BACK. Safe: every entry is a click, no timeouts. |
| You and You · Offline "About MealLoop" row → About | 2 | Move in from right 0.3 |

- **Plus** the 5 trap-fix replacements (§1.0). Removed: 5 BACK. Added: 5 fixed.
- **Component-level Search link isn't possible.** A reaction on the TabBar main component would be inherited by the instances on 02, 04, 05, 06 and 99 as cross-page links, which the brief forbids. So the Search link is set on each of the 132 page-07 instances, the same way the existing tab links are.
- **Tab destinations:** identical wherever they exist (Home · Afternoon, Meals · Menu, Community · List, You; 70 tab bars). The 62 States-gallery frames have never had tab links. That is unchanged, but their Search button now links to S1 as instructed.

### 1.4 Checks

- **Tab bar instances on the updated component:**

  | Page | Instances |
  |---|---|
  | 04 | 194 (188 + 6 new) |
  | 05 | 194 |
  | 06 | 6 |
  | 07 | 133 (127 + 6) |
  | 02 | 8 |
  | 99 Archive | 26 (inherited) |
  | 03 usage | 1 |

  None are detached, hand-built or resized.
- **44 pt targets:**
  - Search button 62; field 44; result rows 63; recent rows 56; nav back 44; Clear 44×44 (after the fix).
  - Suggestion chips are 30 pt visually, with 14 pt spacing, which gives a 44 pt hit area.
- **Contrast (WCAG):** search icon 18.4:1 Light / 16.1:1 Dark; field placeholder 6.0 / 6.0; section labels 5.7 / 7.4; meta and kcal 6.7 / 7.1; Veg label 5.5 / 10.5.
  - The button edge against the canvas is 1.1:1, the same as the existing pill; the drop shadow and edge stroke define it.
- **Walk (page 07):**
  - Home · Afternoon → Search (Dissolve 0.15) → S1 field → S2 (Smart animate) → Sambar → S3 (Move in) → Back (reverses to S2) → Tab Meals → Meals · Menu (Dissolve 0.15).
- **Content clearance:** all S frames and About end at or above y 602, and the tab bar top is at 748. The tab bar's footprint is unchanged, so no existing frame needed a clearance fix.

---

## Stage 1.5 - Shell follow-ups (2026-09-28)

Before starting, a snapshot of the per-page fingerprints, per-node signatures and all link dumps was stored in root plugin data (`st15_*`; the `st1_*` chunks were cleared). A named version still cannot be saved.

### 1.5.1 Logo in Dark

- **Change:** the Logo component (`140:1479`, both Type=Mark and Type=Lockup) had its mark tile fill changed from hard-coded `#FFFFFF` to the `surface` variable.
  - Light: `surface` = `#FFFFFF`, so Light looks identical.
  - Dark: `surface` = `#161616`, with the ink strokes turning light, so the mark is visible.
- **Coverage:** all 267 Logo instances now resolve to `surface`; none overrides the tile.
- **Where Logo renders** (besides AppWordmark and HomeHeader, which already used `surface`):
  - Onboarding · Welcome (Lockup) on 04, 05 and 07.
  - LockScreen and LockNotification: Recheck · Lock · No answer / Said yes / Said no, with their expanded versions; Lock · Stack; Lock · Fix check (+ expanded); Lock screen previews ×4. All on 04, 05 and 07 where present.
  - NotificationRow: Notifications · Inbox ×5 and Notifications · Offline ×5 on 04, 05 and 07; Recheck · Inbox ×3 on 04, 05 and 07.
  - OnboardingPage (component), and the usage boards on page 03.
- **Checked by screenshot in both modes:** Welcome, a lock screen and Notifications · Inbox (see `stage1_5/`).
- **Not part of this change:** the Welcome Dark art still shows the existing "DARK RIBBON RENDER NEEDED" placeholder.

### 1.5.2 Tappable chips

- The MetaChip variant `Surface=On light` is used by 90 non-interactive labels, so it was left unchanged.
- **New variant `Surface=Tappable`:**
  - Same fill and text as On light, plus a 1 pt `ink-secondary` outline (inside, excluded from layout).
  - 30 pt tall.
  - Outline against the canvas: 5.7:1 Light, 7.4:1 Dark.
  - Place with 14 pt spacing for a 44 pt tap area.
- **Swapped to Tappable:** the S1 and S4 suggestion chips on 04, 05 and 07 (24 instances). Their labels are unchanged.
- **Rule:** use `Surface=Tappable` for any chip the student can tap. On light and On dark stay for labels.

### 1.5.3 Search selected state

- **TabSearchButton State=Selected:**
  - The highlight fill is the same as a selected tab's (the same `tab-selected` paint, 54 pt tall, radius 27).
  - The glyph is the new Symbol `magnifyingglass.bold`: ring 2.4 pt, handle 3 pt, against 1.7 / 2.2 pt for the default.
- **Two non-colour cues** mark the selected state: the highlight shape and the heavier glyph. This mirrors the tabs' filled icon.
- Checked in Light and Dark (`stage1_5/tabbar_selected_search_and_chips_light_dark.png`).

### 1.5.4 Gallery Search links

- **Removed:** 62 Search → S1 links from the States-gallery frames, whose tabs are not wired.
- **Kept:** 70 Search links on frames whose tabs work. S1's own button stays unlinked (self).
- Page 07 links: 1116 → 1054.
- **Rule:** the Search button is wired only where the tab items are wired.

### 1.5.5 Page-07 Search frames: source and demo hotspot

- **Source:** S1–S5 and About on page 07 are **clones** (independent copies), not instances. Figma can't instance a frame, and these frames aren't components. The source is **page 04** (Light), built in Stage 1. Page 05 holds Dark clones of the same page-04 frames with the Dark variable mode.
- **Keeping them in sync:** any later change to a Search frame must be made on 04 and repeated on 05 and 07. Shared parts come from components (SearchField, SearchResultRow, MetaChip, TabBar), so fixes made in those components reach all three pages automatically.
- **Status-bar hotspot (demo only):**
  - On page 07, the Status Bar instance of **Search · Empty (S1)** links to **Search · Offline (S5)**, and S5's Status Bar links back to S1. Smart animate 0.25 s EASE_OUT.
  - This follows the existing Home demo, where the status bar cycles the time of day. It simulates losing and regaining the connection; it isn't a real app control.
  - Testers reach S5 only this way.

### 1.5.6 Report-only findings (nothing changed)

**a. You-based frames and Sign out, after the About row.** The Sign out row is at y 886–942 (You · Offline: 946–1002). Frame overflow is NONE (these frames don't scroll).

| Page | Frame (852 pt) | Sign out |
|---|---|---|
| 04, 05, 07 | You | **Clipped**, below the frame bottom (852) |
| 04, 05, 07 | You · Offline | **Clipped** (946–1002) |
| 04, 05, 07 | Request correction, Correction · Sent, Correction · Failed, Sign out | Clipped, under a sheet or alert (background only) |
| 04, 05 | You (full scroll) 1006, You · Offline (full scroll) 1066 | Inside the frame, but behind the tab bar (it overlapped the tab bar before Stage 1 too) |

**Prototype impact:** page 07 · You · Row / Sign out is the **only** way into the Sign out flow, and it now lies entirely outside the 852 pt viewport (before: 829–885, partly visible). The Sign out flow is therefore **unreachable** in the prototype. Suggested fix, not applied:
- set You and You · Offline on page 07 to vertical scrolling;
- keep the Status Bar, Nav Header, edge fade, Tab Bar and Home Indicator fixed;
- or move About into the Account group.

**b. Width.**
- No phone frame on 04, 05, 06 or 07 is narrower than 393 pt.
- **At 375 pt**, tested with a temporary TabBar instance at 343 pt: pill 273 pt, Search 62 pt, tabs 65.8 pt each. The longest label, "Community", is 63 pt, leaving 1.4 pt on each side. It fits, but only just. At 320 pt it would not fit.

---

## Stage 1.6 - Sign out and artwork (2026-09-28)

Before starting, a snapshot of the per-page fingerprints, node signatures (now including overflow direction and fixed-children count) and all link dumps was stored in root plugin data (`st16_*`; the `st15_*` chunks were cleared). A named version still cannot be saved.

### 1.6.1 Page 07: You scrolls

| Frame | Overflow | Fixed children (the top N layers, no reordering) | Scroll range | Sign out at max scroll |
|---|---|---|---|---|
| You | NONE → **VERTICAL** | 5: Status Bar, Nav Header, Scroll edge fade, Tab Bar, Home Indicator | 215 pt | ends at y 727; tab bar top 748, **21 pt clearance** |
| You · Offline (a States-gallery frame) | NONE → **VERTICAL** | 7: the same 5 + Gallery · Back / Next hotspots | 275 pt | ends at y 727, 21 pt clearance |

**Rule R8.** A scrolling frame keeps its chrome (status bar, nav header, edge fade, tab bar, home indicator, gallery hotspots) as the topmost layers, and marks them fixed with `numberOfFixedChildren`. The scroll range comes from the content frame, including its 124 pt bottom padding.

**Links:** unchanged (You 15, You · Offline 3). Walk checked:
- You · Row / Sign out → **Sign out** (Dissolve 0.25, reset scroll).
- Sign out · Cancel → **BACK** → You.
- Sign out · Alert → Onboarding · Welcome (Dissolve 0.25).

Also working from You: About MealLoop, Privacy & data (and on to Request deletion), Notifications, Feedback history, Help, the 4 tiles, Request correction, tabs and Search. There is **no Nutrition row yet**; it arrives in Stage 3.

**Reachability:** page 07 has **no orphans**; all 228 phone frames are reachable from a flow start. The Sign out screen is reachable only through You · Row / Sign out, and that row can now be reached by scrolling.

**Static sheet and alert frames** (left unchanged, overflow NONE): Request correction (sheet 92–852), Correction · Sent (sheet 432–852), Correction · Failed (sheet 92–852), Sign out (alert 337–516). All four have a full-frame scrim. In every one the You list behind is shown at scroll 0, so the Sign out row (886–942) is **off-frame and not visible**; the sheet doesn't cover it. On the Sign out alert frame this means the row the student tapped isn't visible behind the alert (see open question).

### 1.6.2 Pages 04 and 05: full-scroll You frames

- Resized to the content bottom, so the content's 124 pt bottom padding is no longer clipped:
  - You (full scroll): 1006 → **1067**.
  - You · Offline (full scroll): 1066 → **1127**.
  - Light and Dark (4 frames).
- Scroll edge fade, Tab Bar and Home Indicator moved down 61 pt to stay at the frame bottom.
- Sign out now ends 21 pt above the tab bar.
- These frames still don't scroll (design pages).

### 1.6.3 Ribbon art: report only, nothing built

- `OnboardingArt` (10 variants: Angle Welcome / Angle 1–3 / Verify × Size Large / Small) draws the light ribbon as a **rectangle with an IMAGE fill** (a raster 3D render, hash `3bb6b876…`), shown through the `art-light` variable.
- Dark shows a placeholder frame ("DARK RIBBON RENDER NEEDED") through `art-dark`.
- Because it is an image, it **can't be rebuilt as a variable-bound vector without redrawing the artwork**. Per the brief, the step stopped here. The 16 Dark onboarding frames keep the placeholder.

---

## Stage 1.7 - You screen header and alert background (2026-09-28)

Before starting, a snapshot was stored in root plugin data (`st17_*`, now including layer order and positions; the `st16_*` chunks were cleared). A named version still cannot be saved. Scope: page 07 You, You · Offline, and the Sign out alert frame. The NavHeader component and all other screens are unchanged.

### 1.7.1 Header scrolls, top edge fade (You, You · Offline)

**New layer order (bottom → top):**
- You: Meal wash, tmp / Content, **Nav Header**, **Top edge fade**, Status Bar, Scroll edge fade, Tab Bar, Home Indicator.
- You · Offline: the same, plus the Gallery · Back / Next hotspots on top.

**Fixed children** (`numberOfFixedChildren`):
- You: 5 (Top edge fade, Status Bar, Scroll edge fade, Tab Bar, Home Indicator).
- You · Offline: 7 (the same 5 plus the two gallery hotspots).

**What scrolls:** the Nav Header ("You" large title row), the Meal wash and the content.

**Top edge fade:**
- An instance of the same **ScrollEdgeFade** component as the bottom fade (same Light/Dark rectangles and visibility variable), rotated 180° and sized 393×100 at y 0.
- It is opaque canvas (`#EDEDE8`) from y 0 to 63, which covers the whole status bar, then fades to clear at y 100.

**Contrast (Light):**
- Status-bar text and icons (`ink`) over the fade: **16.1:1** at every scroll position, including over the black identity card.
- Without the fade it would be 1.0:1.

**At rest (visible change):** the top 63 pt is now plain canvas instead of the lime Meal-wash tint. The tint shows from about y 63 down.

**Rule R9.** On a scrolling screen, a large title scrolls with the content. Only system chrome stays fixed: status bar, top and bottom edge fades, tab bar, home indicator. A scrolling screen gets a top ScrollEdgeFade (rotated 180°, 100 pt) under the status bar.

### 1.7.2 Sign out alert background

- **Content shift:** Meal wash, the You list and the Nav Header moved up 215 pt, the full scroll range of You.
- **List container:** it was a fixed 655 pt and clipped, and since Stage 1 it had cut off the About and Sign out rows. It now hugs its content (904 pt).
- **Top edge fade:** added under the status bar, as on You.
- **Result:** the Sign out row shows at y 671–727, under the scrim and below the alert (337–516). The alert stays the top layer.

### 1.7.3 Links

- Page 07 is still **1054** links (+0 −0).
- **You (15, unchanged):**
  - Identity → Request correction.
  - Tiles: Spending → Spending · This week; Rewards → Rewards; Attendance → Entry history; Reports → Report · My reports.
  - Rows: Notifications → Notification settings; Privacy & data → Privacy & data; Feedback history → Feedback · History; Help → Help; About MealLoop → About MealLoop; Sign out → Sign out.
  - Tabs: Home, Meals, Community. Search → Search · Empty.
- **You · Offline (3):** About MealLoop, and the two gallery hotspots.
- **Sign out alert:** Cancel → BACK; Alert → Onboarding · Welcome.

### 1.7.4 Report-only: the fixed-title pattern elsewhere

- **No other screen scrolls** on any page. Only these two frames have overflow set, and neither keeps the title fixed. So no other screen shows the title/content overlap today.
- **Would need the same fix if made to scroll:** six page-07 screens have a Large-Title Nav Header and content that runs under the tab bar (past y 748) or past the frame:
  - Meals · Menu (content to 854)
  - Community · List (939)
  - Meals · Menu changed (908)
  - Meals · Loading (783)
  - Meals · Offline (914)
  - Community · Offline (997)
- **Content out of reach:** these don't scroll, so their lowest content can't be reached in the prototype (the same class of issue that Sign out had).

---

## Stage 1.8 - Scroll reachability and wash fade (2026-09-28)

Before starting, a snapshot was stored in root plugin data (`st18_*`, with layer order and child boxes; the `st17_*` chunks were cleared). A named version still cannot be saved. The NavHeader component is unchanged.

### 1.8.1 Sweep: page-07 frames whose content runs past the visible bottom and that don't scroll (55)

- "Past" means below the tab bar top (748), a sticky Footer, or the frame edge.
- **Links in the overflow:**
  - **partly:** under the tab bar, still partly tappable;
  - **hidden:** fully under the tab bar;
  - **off-frame:** outside the frame, can't be reached at all.
- **LT** = large-title Nav Header. All 55 have the Meal wash at the top.

| Family | Frame | Overflow | LT | Links in overflow | Note |
|---|---|---|---|---|---|
| Answer No | Tap / Sending / Saved / Failed | +117 / +117 / +36 / +143 | – | Impact, Method (i): partly (Failed: none) | Failed = gallery |
| Answer Not sure | Tap / Sending / Saved / Failed | +117 / +117 / +59 / +143 | – | Impact, Method (i): partly | Failed = gallery |
| Answer Yes | Tap / Sending / Saved / Near meal / Failed | +117 / +117 / +36 / +98 / +143 | – | Impact, Method (i): partly | Failed = gallery |
| Community | **List** | +191 | LT | Curd runs out: partly; **Rice undercooked: hidden** | **fixed** |
| Community | **Offline** | +249 | LT | none | gallery; **fixed** |
| Correction | Sent / Failed | +91 past frame | LT | none | sheet background |
| Feedback | Step 2 · Not good / Sending / Failed | +52 / +52 / +1 past footer | – | Action: partly (Not good) | |
| Home | Morning / Afternoon / After last meal | +171 / +117 / +98 | – | Morning: Follow-up partly, **Impact + Method (i) hidden**; others partly | |
| Home | After cutoff / Crowd stale / Hero unavailable / Offline / Pass hidden / Rewards soon | +117 / +79 / +47 / +177 / +117 / +117 | – | none | gallery |
| Intent | Correction requested / Cutoff passed / No response | +249 / +124 / +64 | – | none | gallery |
| Meals | **Menu** | +106 | LT | **Meal / Breakfast: hidden** | **fixed** |
| Meals | **Menu changed / Loading / Offline** | +160 / +35 / +166 | LT | none | gallery; **fixed** |
| Meals | Meal detail | +120 | – (Inline) | AtMessTile ×2 partly; **Crowd: hidden** | different pattern |
| Notifications | Offline | +31 | – | none | gallery |
| Report | My reports / Fixed | +12 / +91 | – | Food smells…: partly (My reports) | |
| Request correction | Request correction | +91 past frame | LT | none | sheet background |
| Rewards | Rewards / Offline | +60 / +120 | – | Something wrong…: partly (Rewards) | Offline = gallery |
| Settings | System off | +6 | – | none | gallery |
| Spending | This week / This month / Saved / Offline | +448 / +320 / +448 / +554 past footer | – | **Expense / Canteen: off-frame** (week, month, Saved) | Offline = gallery |
| Waste | Last week / Dish breakdown / Corrected / No baseline / Not comparable / Partial | +105 / +73 / +183 / +118 / +139 / +162 | – | none | 4 gallery |
| Waste | How this is measured | +1 past frame | – | none | sheet background |

### 1.8.2 Fix set (6 frames, R9)

The six named frames were fixed. **Meals · Meal detail** is the only other frame in the Meals and Community families with overflow. It uses an **Inline-title** header with a Back button, which is a different pattern: making it scroll would scroll the Back button away, and keeping it fixed leaves a transparent bar over the content. It is reported, not fixed.

| Frame | New layer order (bottom → top) | Fixed | Scroll range | Last item at max scroll | Clearance above tab bar |
|---|---|---|---|---|---|
| Meals · Menu | Meal wash, content, Nav Header, Top edge fade, Status Bar, Scroll edge fade, Tab Bar, Home Indicator | 5 | 126 | 854 → 728 | 20 pt |
| Community · List | same | 5 | 211 | 939 → 728 | 20 pt |
| Meals · Menu changed | same + Gallery · Back / Next | 7 | 180 | 908 → 728 | 20 pt |
| Meals · Loading | same + gallery | 7 | 55 | 783 → 728 | 20 pt |
| Meals · Offline | same + gallery | 7 | 186 | 914 → 728 | 20 pt |
| Community · Offline | same + gallery | 7 | 269 | 997 → 728 | 20 pt |

- **Clearance is 20 pt, not 21.** The content keeps its 124 pt bottom padding, and scroll range comes from the content frame. You reaches 21 pt only because it has a 1 pt gap after its last row. Getting 21 here needs 1 pt more bottom padding in these content frames, which isn't in this stage's allowed changes (see open question).
- **Links:** unchanged; page 07 is still 1054.

### 1.8.3 ScrollEdgeFade: Wash variant

- **Component set:** ScrollEdgeFade (`457:1097`) is now a set.
  - `Style=Plain` is the original component (`164:57923`); all 546 instances are still linked and unchanged.
  - `Style=Wash` (`457:1094`) is new.
- **Style=Wash colours:** it uses the same Light and Dark rectangles and visibility variables (art-light / art-dark). Its colour follows the Meal wash composite at each height.
  - Light: `#E9F7B0` at y 0, `#EAF5BC` at y 63, `#EAF4C3` at y 100.
  - Dark: `#2A3312`, `#252C12`, `#222812`.
- **Shape:** opaque from y 0 to 63 (behind the whole status bar), then clear by y 100. The wash is `#E9F7B0 → clear` over 300 pt on canvas, so its colour at 100 pt is still a light tint, not pure canvas. The fade matches that colour exactly, so **at rest it's invisible over the wash**.
- **Used rotated 180°, 393×100 at y 0**, on You, You · Offline, the Sign out alert, and the 6 frames above. That's every frame with a top fade; all of them have the Meal wash. Plain stays as the bottom fade everywhere.
- **Pages 04 and 05:** no frame there uses a top fade, so nothing changed.
- **Contrast (Light, status-bar `ink`):** 16.5:1 over the fade at y 0, 16.4:1 at y 54–63, the same over black content because the fade is opaque there. At y 80, below the status bar, the black card behind the fade still gives 5.4:1 against ink.

**Rule R9a.** A top edge fade uses `ScrollEdgeFade / Style=Wash` on screens with a Meal wash, and `Style=Plain` on screens without one.

### 1.8.4 Sheet backgrounds

- **Frames:** Request correction, Correction · Sent, Correction · Failed.
- **Change:** the background You list container now hugs its content, 655 → 904 pt. It stays at y 163 (scroll at the top), so nothing inside is clipped. The Sign out row is at y 886, below the frame edge, as it would be on the real screen at scroll 0.

### 1.8.5 Walks

1. Home · Afternoon · Tab / Meals → Meals · Menu (Dissolve 0.15).
2. Scroll 126 pt: **Meal / Breakfast** (last link row) moves 782 → 656 and becomes visible.
3. Meal / Breakfast → **Meals · Meal detail** (Move in 0.3).
4. Meals · Menu · Tab / Community → Community · List (Dissolve 0.15).
5. Scroll 211 pt: **Issue / Rice undercooked on Mondays** moves 767 → 556, ending at 728, and becomes visible.
6. That issue → **Community · Suggestion** (Move in 0.3).
7. Community · Suggestion · Back → **BACK**, returning to Community · List.

**Plate-tracker entry:** Meals · Meal detail is reachable **without scrolling**. **Meal / Dinner** (y 670–742) is visible at rest on Meals · Menu. Only Meal / Breakfast needs the scroll. Both open the same Meals · Meal detail frame; Stage 3 specifies the lunch Meal detail.

### 1.8.6 Not fixed (report only), with reason

| Frames | Count | Reason |
|---|---|---|
| Meals · Meal detail | 1 | Different pattern: an inline-title header with Back needs a fixed, material bar, not R9. |
| Request correction, Correction · Sent, Correction · Failed, Waste · How this is measured | 4 | Sheet backgrounds: static by design (scrim). The first three had their lists made to hug (§1.8.4). |
| Home (9), Answer Yes (5), Answer No (4), Answer Not sure (4), Intent (3) | 25 | Other families (Home layout, no large title); outside this stage's fix set. |
| Spending This week, This month, Saved, Offline | 4 | Other family (sticky Footer). **Expense / Canteen is off-frame on This week, This month and Saved, and those rows are the only way into Edit expense**, so the Edit / Delete expense flow can't be reached. |
| Waste (6), Rewards (2), Report (2), Feedback (3), Notifications · Offline, Settings · System off | 15 | Other families; outside this stage's fix set. |

Total: 55 swept, 6 fixed, 49 reported.

---

## Stage 1.9 - Reachability for the tracker path (2026-09-28)

Before starting, a snapshot was stored in root plugin data (`st19_*`; the `st18_*` chunks were cleared). A named version still cannot be saved. Scope: page 07. The NavHeader and HomeHeader components are unchanged.

### 1.9.0 Clearance rule (amends R9 and §1.8.2)

**R9b.** On a scrolling screen, at maximum scroll **the last item ends at least 20 pt above the tab bar** (y ≤ 728 with the tab bar at 748). Earlier frames keep their padding: You and You · Offline have 21 pt; the six Stage 1.8 frames have 20 pt. Both meet the rule.

### 1.9.1 Spending family: R9 applied (7 frames)

- **Change on each frame:**
  - The Status Bar moved above the scrolling layers.
  - A `ScrollEdgeFade / Style=Wash` top fade (rotated 180°, 393×100) went in under it.
  - Overflow was set to VERTICAL.
  - Fixed children: Top edge fade, Status Bar, Scroll edge fade, Tab Bar, **Footer** (Add expense), Home Indicator, and Toast / gallery hotspots where present.
- **What scrolls:** the Meal wash, the content, the Nav Header (Inline Title with Back; you didn't list it as fixed for this family), and the EmptyState / Error state overlays.

| Frame | Fixed | Scroll range | Last item at max scroll | Linked expense row at max scroll |
|---|---|---|---|---|
| Spending · This week | 6 | 404 | 1132 → 728 (20 pt) | Canteen 876 → **472–535** |
| Spending · This month | 6 | 276 | 1004 → 728 | Canteen 876 → **600–663** |
| Spending · Saved | 7 (+Toast) | 404 | 1132 → 728 | Canteen 876 → **472–535** |
| Spending · Offline | 8 (+gallery) | 510 | 1238 → 728 | none (gallery state) |
| Spending · Loading | 7 | 0 | 516 (fits) | – |
| Spending · Empty | 8 | 0 | 176 (fits) | – |
| Spending · Error | 7 | 0 | 176 (fits) | – |

**Caveat:** the sticky Footer (Add expense) sits at 684–740. At max scroll the last expense row (the second Canteen, 1068–1124 → 664–720) ends 20 pt above the tab bar, meeting R9b, but it is **behind the footer**. The linked row is fully visible.

### 1.9.2 Home / Answer / Intent / Meal detail family: stopped, not applied

**Why:** Meals · Meal detail needs "floating Back stays fixed while the title scrolls". Its Back button is **not a separate layer**. It sits inside the same Nav Header instance as the "Dinner" title (NavHeader Type=Inline Title, Show Back = true). Splitting Back from the title would mean detaching the instance, adding a layer, or editing the NavHeader component. None of these is allowed (only scroll settings and layer order). The three **Intent** frames (Cutoff passed, Correction requested, No response) use the same Inline Title with a built-in Back.

**The rule applied:** the brief defines Home, Answer, Intent and Meal detail as one family ("apply R9 to the whole family the same way"). Because some frames can't take the treatment, **no frame in the family was changed**. There was nothing to revert, because the check happened before any edit.

**Frames in the stopped family (32 non-sheet, 26 of them overflowing):**
- Home: Morning, Afternoon, During meal, After last meal, After cutoff, Hero unavailable, Modules hidden, Pass hidden, Offline, Loading, Crowd stale, Rewards soon.
- Recheck · Home: Recheck, Recheck yes, Recheck no.
- Answer Yes: Tap, Sending, Saved, Near meal, Failed.
- Answer No: Tap, Sending, Saved, Failed.
- Answer Not sure: Tap, Sending, Saved, Failed.
- Intent: Cutoff passed, Correction requested, No response.
- Meals · Meal detail.
- Sheet backgrounds, excluded: Answer No · Why not, Intent · Reason failed.

**Result:** step 3 isn't done.
- Home · Morning: Impact (782–919) and its (i) (797, which links to Waste · How this is measured) stay under the tab bar.
- Meal detail: Crowd (814–868, which links to Crowd · Detail) stays under the tab bar.

**HomeHeader frames alone would work.** Their header is one HomeHeader instance with no Back button, so it can scroll whole.

### 1.9.3 Links

- Page 07 is still **1054** (+0 −0).
- **Spending walk:**
  1. You · Tile / SPENDING → Spending · This week (Move in 0.3).
  2. Scroll 404 pt; Expense / Canteen is at 472.
  3. Expense / Canteen → **Edit expense** (Dissolve 0.25).
  4. Edit expense · Back / Close → BACK, returning to Spending.
- **Delete flow:**
  - Edit expense · Delete → Delete confirm.
  - Delete confirm · Delete → Deleting. Cancel → Edit expense; Back / Close → BACK.
  - Deleting → (timeout) Spending · This week. Save → Spending · Saved.
- **Home · Morning walk and Meal detail walk:** blocked (§1.9.2).

### 1.9.4 Stage 3 readiness (report only; no cards added)

| Frame | Content | Last item | Scroll range if R9 were applied | With the new card | Last item at max scroll | Clearance |
|---|---|---|---|---|---|---|
| Home · After cutoff | y 190, 799 pt, bottom padding 124, gap 12 | Home / Impact ends 865 | 137 | +120 pt card → content 931, range 269 | 728 | **20 pt: meets R9b** |
| Meals · Meal detail | y 110, 878 pt, bottom padding **120**, gap 12 | Crowd ends 868 | 136 | +200 pt card → content 1090, range 348 | 732 | **16 pt: fails R9b** (needs bottom padding 124) |

**Scrolling is required.** Both frames don't scroll today, so without R9 neither a new card nor the current last item can be reached.

### 1.9.5 Remaining overflowing frames outside this stage (report only)

| Family | Frames | Count |
|---|---|---|
| Waste | Last week, Dish breakdown, Corrected, No baseline, Not comparable, Partial | 6 |
| Feedback | Step 2 · Not good, Sending, Failed | 3 |
| Rewards | Rewards, Rewards · Offline | 2 |
| Report | My reports, Fixed | 2 |
| Notifications | Offline | 1 |
| Settings | System off | 1 |
| Sheet backgrounds | Request correction, Correction · Sent, Correction · Failed, Waste · How this is measured | 4 |
| Stopped family (§1.9.2) | Home 9, Answer 13, Intent 3, Meal detail 1 (overflowing) | 26 |

Total still overflowing: 45 (out of the 55 swept in 1.8, minus 6 fixed in 1.8 and 4 fixed here that overflowed: Spending This week, This month, Saved, Offline).

---

## Stage 1.10 - Header patterns and tracker-path reachability (2026-09-28)

Before starting, a snapshot was stored in root plugin data (`st110_*`; the `st19_*` chunks were cleared). Page 03 read `gxy1sk` on the first pass and `x9xc34` on the second and third (the known lazy-load flip); the stable value was stored. A named version still cannot be saved. The NavHeader and HomeHeader components are unchanged.

**Outcome: both parts stopped under their own stop rules and were reverted. Final diff against the snapshot is empty on every page; page 07 is still 1054 links (+0 −0).**

### 1.10.A Home and Answer: applied, then reverted

**HomeHeader frames on page 07:** 29 in total.
- **In scope (22):**
  - Home: Morning, Afternoon, After last meal, After cutoff, Crowd stale, Hero unavailable, Offline, Pass hidden, Rewards soon (9).
  - Answer Yes: Tap, Sending, Saved, Near meal, Failed.
  - Answer No: Tap, Sending, Saved, Failed.
  - Answer Not sure: Tap, Sending, Saved, Failed (13 Answer in total).
- **Not touched (7):** Home · During meal, Home · Modules hidden, Home · Loading, Recheck · Home · Recheck / Recheck yes / Recheck no, and the Answer No · Why not sheet.

**What was applied:** on all 22, Home Header moved into the scrolling layers, a Wash top fade was added, overflow set to VERTICAL, and the chrome fixed. The mechanics worked: links stayed at 1054, and every frame ended its last item exactly 20 pt above the tab bar. Home · Morning had a 191 pt range, with Impact at 591–728 and its (i) at 606.

**Why it was reverted:** at rest, the HomeHeader's top row (wordmark, points chip, message and bell buttons, y 54–98) sits under the fixed Wash top fade. The fade is opaque down to y 63 and fades out by y 100, so the row is washed out, about 54% covered at its centre. The screenshot compares Home · Morning and Answer Yes · Tap with the untouched Home · During meal. Every Part A frame has this row, so no frame can take the treatment without a visible defect. Per the stop rule, **all 22 were reverted** (the fade removed, Home Header returned to its original layer position, overflow NONE, fixed 0).

**Why no allowed change could fix it:** a fade that ends at the status bar (y 54) would be a new ScrollEdgeFade style, which wasn't in Part A's allowed changes.

### 1.10.B Inline-title screens: stopped at the at-rest check, reverted

**Style tested:** ScrollEdgeFade `Style=Tall` (393×142), built exactly as specified:
- opaque to the header's bottom edge (y 102), fading to transparent by y 142;
- colour tracking the wash: Light `#E9F7B0` / `#EAF4C3` / `#EBF2CB`; Dark `#2A3312` / `#222712` / `#1E2312`.

It was tried **only on temporary copies**.

**Result:** on all 11 frames, the first content item starts at **y 110**, 8 pt below the header, so it sits under the fade from 110 to 142 (80% opacity at the content's top edge).
- The top of the black Meal Hero card on Meal detail and the 3 Intent frames visibly washes out at rest.
- The PrivacyBanner, OfflineBanner or Skeleton on the 7 Spending frames does the same.

The frames are Meals · Meal detail; Intent · Cutoff passed, Correction requested, No response; and Spending · This week, This month, Saved, Offline, Loading, Empty, Error. Per the stop rule, **Part B stopped**:
- the Tall style was removed (it had no instances);
- no frame was changed;
- the bottom-padding changes (Meal detail 124, Spending footer clearance) weren't made.

### 1.10.C Defects from earlier stages found by this check (not fixed; outside this stage's allowed changes)

| Frames | Stage | What sits under the Wash top fade at rest | Coverage at centre (y 80) |
|---|---|---|---|
| Community · List, Community · Offline | 1.8 | NavHeader trailing (i) button | 54% |
| Spending · This week, This month, Saved, Offline, Loading, Empty, Error | 1.9 | NavHeader Back button and "Spending" title | 54% |

Not affected: You, You · Offline, Meals · Menu, Menu changed, Loading, Offline (their large-title top row is empty). The Sign out alert shows the list scrolled, so content under the fade there is intended.

**Rule R9c (proposed, needs approval).** Any header control or text that starts at y 54 or lower must not sit under a top fade at rest. Either:
- use a status-bar-only fade (opaque 0–44, clear by 54);
- or keep the header row fixed above the fade (needs a header with its own material background for content scrolling beneath).

### 1.10.D Checks

- **Links:** 1054 (+0 −0); all unchanged.
- **Walks:**
  - **Home · Morning → scroll → Impact (i):** not possible. Home · Morning doesn't scroll (Part A reverted); Impact (782–919) and its (i) (797) stay under the tab bar.
  - **Meals → Meal detail → scroll → Crowd → Back:** not possible. Meal detail doesn't scroll (Part B stopped); Crowd (814–868) stays under the tab bar.
  - **Spending → scroll → Canteen → Edit expense → Back → Back:** works, as in Stage 1.9. Spending scrolls 404 pt; Canteen is at 472; Canteen → Edit expense. Edit expense · Back → BACK, returning to Spending. Spending · Back → You (fixed link from Stage 1, Move out right). Caveat: at rest the Spending Back button is 54% covered by the fade (§1.10.C).
- **Readiness (unchanged from 1.9; no cards added):**

| Frame | Card | Scroll range if R9 applied | Last item at max scroll | Clearance |
|---|---|---|---|---|
| Home · After cutoff | +120 pt | 137 → 269 | 728 | **20 pt, meets R9b** (needs the frame to scroll, currently blocked) |
| Meals · Meal detail | +200 pt | 136 → 348 | 732 | **16 pt, fails R9b** (padding still 120; Part B stopped) |

- **Remaining overflowing frames:**

| Group | Count |
|---|---|
| Home / Answer / Intent / Meal detail (not fixed this stage) | 26 |
| Waste | 6 |
| Feedback | 3 |
| Rewards | 2 |
| Report | 2 |
| Notifications · Offline | 1 |
| Settings · System off | 1 |
| Sheet backgrounds | 4 |
| **Total** | **45** |

---

## Stage 1.11 - Status fade, Home/Answer scroll, inline-title backdrop (2026-09-28)

**Snapshot:** stored in root plugin data (`st111_*`; the `st110_*` chunks were cleared). Page 03 read `gxy1sk` and then `x9xc34` twice (the lazy-load flip); the stable value was stored. A named version still cannot be saved.

**Components untouched:** the NavHeader and HomeHeader components and all their variants.

**All three parts passed.**

**Pixel-test method:**
- Temporary copies were rendered at 1× and compared per pixel with PIL.
- The renderer isn't deterministic around glass effects. Two identical copies of the same frame differ in about 27–36k pixels below the status bar, by up to 4–15 levels (the noise floor).
- A test passes when the changed copy differs from the original by no more than that floor, with **no pixel above the noise ceiling (15)** in the region under test.

### 1.11.A Status fade

**Measurements (Part A.1):**

| Frame | Status content bottom | First header element | Layer top → gap | Rendered top incl. glass drop shadow → gap |
|---|---|---|---|---|
| Home · Morning | 37.5 | Credits chip | 54 → **16.5** | 42 → 4.5 |
| Meals · Menu | 37.5 | Title | 118 → 80.8 | 118 → 80.8 |
| Spending · This week | 37.5 | Back | 58 → **20.5** | 46 → 8.5 |

The stop rule was applied to the element itself (its layer top): gap ≥ 16.5, so Part A went ahead. To be safe with the glass shadow halos, the fade is still **clear by y 42**, above the highest halo.

**`ScrollEdgeFade / Style=Status`** (`486:2`):
- 393×42, used rotated 180° at y 0.
- Opaque from 0 to 38, behind all status text (bottom 37.5), then clear by 42.
- Colour follows the Meal wash composite:
  - Light: `#E9F7B0` → `#EAF6B7` at 38 → `#EAF6B8`.
  - Dark: `#2A3312` → `#272F12` → `#262E12`.
- Same visibility variables as the other styles.

**Pixel test (no-fade copy vs Status copy):**

| Frame | Below y 42 (all header-row elements) | Status band (y 0–42) |
|---|---|---|
| Home · Morning | noise level: 35,804 px differ, max 4 (identical-copy baseline 35,838, max 11) | 1–3 levels (the fade's colour vs the wash; no header element there) |
| Meals · Menu | 16,074, max 4 | 1–3 levels |
| Community · List | 29,605, max 15 (baseline 29,660) | as above |
| Spending · This week | 27,452, max 14 (baseline 27,426, max 15) | as above |

**Result:** Pass. Nothing above the noise ceiling.

**Swap (Part A.3):** 16 frames, each `Wash 100 pt → Status 0–42`: You, You · Offline, Sign out (alert), Meals · Menu, Community · List, Meals · Menu changed, Meals · Loading, Meals · Offline, Community · Offline, and Spending · This week, This month, Saved, Offline, Loading, Empty, Error.

**Verified:**
- The Community (i) buttons and the Spending Back button and title start rendering at y 46, below the fade (bottom 42), so they're fully visible at rest.
- Status text contrast (`ink`) over the fade: **16.5:1**. It's the same over dark content, because the fade is opaque behind the text.
- No top fade uses Wash or Plain any more. `Style=Wash` now has 0 instances (kept, unused). Plain remains the bottom fade.
- Links: 1054.

### 1.11.B Home and Answer (22 frames)

**Treatment** (as in 1.10 Part A, but with the Status fade), applied to:
- Home: Morning, Afternoon, After last meal, After cutoff, Crowd stale, Hero unavailable, Offline, Pass hidden, Rewards soon.
- Answer Yes: Tap, Sending, Saved, Near meal, Failed.
- Answer No: Tap, Sending, Saved, Failed.
- Answer Not sure: Tap, Sending, Saved, Failed.

**New layer order (bottom → top):** Meal wash, content, **Home Header** (scrolls), Top edge fade (Status), Status Bar, Scroll edge fade, Tab Bar, Home Indicator, [Toast], [gallery hotspots]. Fixed: 5, 6 (with Toast) or 7 (with the gallery hotspots).

**Every frame's last item ends at y 728, exactly 20 pt above the tab bar.**

| Frame | Scroll range |
|---|---|
| Home · Morning | 191 |
| Home · Afternoon | 137 |
| Home · After last meal | 118 |
| Home · After cutoff | 137 |
| Home · Crowd stale | 99 |
| Home · Hero unavailable | 67 |
| Home · Offline | 197 |
| Home · Pass hidden | 137 |
| Home · Rewards soon | 137 |
| Answer Yes, No, Not sure · Tap / Sending | 137 |
| Answer Yes · Near meal | 118 |
| Answer Yes · Saved, No · Saved | 56 |
| Answer Not sure · Saved | 79 |
| Answer · Failed ×3 | 163 |

**Pixel test:**
- Home · Morning and Answer Yes · Tap, before vs after, below y 42: noise only (max 4 / 5; 0 pixels above 15).
- **Header row (y 42–100) vs the untouched Home · During meal:** 4,400 px differ, max 15, 0 above 15. That's the same as the original Home · Morning vs During meal (4,586, max 15). So the wordmark, points, message and bell are unchanged at rest.

**Not touched:** Home · During meal, Home · Modules hidden, Home · Loading, Recheck · Home ×3, Answer No · Why not (sheet).

### 1.11.C Inline-title screens (11 frames)

**`HeaderBackdrop`** (new component, page 03, `489:1720`):
- 393×102, opaque from y 0 to the bottom of the header row.
- Colour follows the wash composite: Light `#E9F7B0` → `#EAF4C3`; Dark `#2A3312` → `#222712`.
- Hard bottom edge, no stroke or hairline.
- Same Light/Dark visibility variables as the fades.

**Pixel test (original vs treated), in the backdrop zone (y 0–102):**

| Frame | Pixels differing by ≤ 3 levels | Pixels above 3 |
|---|---|---|
| Meal detail | 30,314 | 4, all in the status-bar text, where the noise floor is 14–15 |
| Intent · Cutoff passed | 30,289 | 0 |
| Spending · This week | 20,077 | 4, also status text |

- **Hard edge (rows 100–104):** max 4.
- **Below y 102:** noise only, 0 above 15.

**Result:** Pass. The remaining ≤ 3-level differences come from rounding the wash gradient's end colours to whole values, and they're invisible.

**New layer order:** Meal wash, content, [EmptyState / Error overlays], **Header backdrop, Top edge fade (Status), Nav Header, Status Bar**, Scroll edge fade, Tab Bar, [Footer], Home Indicator, [Toast], [gallery hotspots]. Everything from the Header backdrop up is fixed.
- The NavHeader (title and Back) is fixed.
- The header's layers and text are unchanged.
- On Spending this reverses the Stage 1.9 scrolling of its title bar.

**Bottom padding and clearance:**

| Frame | Padding | Scroll range | Last item at max scroll | Clearance |
|---|---|---|---|---|
| Meals · Meal detail | 120 → **124** | 140 | Crowd 868 → 728 | 20 pt above the tab bar |
| Intent · Cutoff passed | 124 (checked, unchanged) | 144 | 728 | 20 pt |
| Intent · Correction requested | 124 | 269 | 728 | 20 pt |
| Intent · No response | 124 | 84 | 728 | 20 pt |
| Spending · This week, This month, Saved, Offline | 124 → **188** | 468 / 340 / 468 / 574 | 664 | **20 pt above Add expense** (84 above the tab bar) |
| Spending · Loading, Empty, Error | 124 (unchanged) | 0 | fits | – |

### 1.11.D Checks

**Links:** 1054 (+0 −0); every existing link is unchanged.

**Walks:**
- **Home · Morning:**
  1. Scroll 191 pt; the Home Header scrolls away.
  2. Impact moves 782 → **591–728**, and its (i) 797 → **606**.
  3. The (i) → Waste · How this is measured (Dissolve 0.25).
- **Meals → Meal detail → Crowd → Back:**
  1. Home · Afternoon · Tab / Meals → Meals · Menu (Dissolve 0.15).
  2. Meal / Dinner (visible at rest, at 670) → Meals · Meal detail (Move in 0.3).
  3. Scroll 140 pt; the header and Back stay fixed. Crowd moves 814 → **674–728**.
  4. Crowd → Crowd · Detail (Move in 0.3).
  5. Crowd · Detail · Back → BACK, returning to Meal detail.
  6. Meal detail · Back → BACK, returning to Meals · Menu.
- **Spending → Canteen → Edit expense → Back → Back:**
  1. You · Tile / SPENDING → Spending · This week (Move in 0.3).
  2. Scroll 468 pt; the header stays fixed. Canteen moves 876 → **408**.
  3. Canteen → Edit expense (Dissolve 0.25).
  4. Edit expense · Back → BACK, returning to Spending.
  5. Spending · Back → You (Move out right 0.3).

**Readiness (report only; no cards added):**

| Frame | Card | Scroll range now | Range with the card | Last item at max scroll | Result |
|---|---|---|---|---|---|
| Home · After cutoff | +120 pt | 137 | 269 | 728 (20 pt) | **Meets R9b** |
| Meals · Meal detail | +200 pt | 140 | 352 | 728 (20 pt) | **Meets R9b** |

**Remaining overflowing frames (not in this stage):**

| Group | Frames | Count |
|---|---|---|
| Waste | Last week, Dish breakdown, Corrected, No baseline, Not comparable, Partial | 6 |
| Feedback | Step 2 · Not good, Sending, Failed | 3 |
| Rewards | Rewards, Rewards · Offline | 2 |
| Report | My reports, Fixed | 2 |
| Notifications | Offline | 1 |
| Settings | System off | 1 |
| Sheet backgrounds | Request correction, Correction · Sent, Correction · Failed, Waste · How this is measured | 4 |
| **Total** | | **19** |

The Home, Answer, Intent, Meal detail and Spending families no longer overflow.

### 1.11.E Top-edge rule (R9c, adopted; supersedes R9a)

**R9c.** On a scrolling screen, the top edge uses **`ScrollEdgeFade / Style=Status`**: 42 pt, opaque behind the status text to y 38, clear by 42. It must never cover a header element at rest. Any header whose first element starts at or below y 42, including a glass shadow halo, keeps working unchanged.

- **Large title or HomeHeader:** the header scrolls with the content (R9). Fixed: Status fade, Status Bar, bottom fade, tab bar, home indicator, [footer, toast, hotspots].
- **Inline title with Back:** the NavHeader stays fixed, with **`HeaderBackdrop`** (0 to header bottom, hard edge, wash-tracked) and the Status fade behind it. Content scrolls beneath the backdrop.
- **Clearance:** the last item ends at least 20 pt above the tab bar (R9b), or at least 20 pt above a sticky footer when there is one.
- **Invisible at rest:** every top-edge treatment must pass a pixel test against the untouched frame, at the renderer's noise level.

---

## Stage 2 - Tracker content (section H, pages 04 and 05) (2026-09-28)

Before starting, a snapshot was stored in root plugin data (`st2_*`; the `st111_*` chunks were cleared). Page 03 read `44dov5` on the first pass, then `182o0p1` twice; the stable value was stored. A named version still cannot be saved.

**Scope:** section H on pages 04 and 05, plus the tracker components on page 03 and two notes in section D. Nothing on page 07 changed.

### 2.1 Data table (each dish rounded first; totals are sums of the displayed values)

| Dish (1×) | kcal | P g | C g | F g | Fibre | Sugar | Sodium mg | 4P+4C+9F | Δ |
|---|---|---|---|---|---|---|---|---|---|
| Sambar | 110 | 5 | 14 | 4 | 4 | 3 | 420 | 112 | 1.8% |
| Rice | 180 | 4 | 40 | 0 | 2 | 0 | 4 | 176 | 2.3% |
| Rice 1.5× | 270 | 6 | 60 | 0 | 3 | 0 | 6 | 264 | 2.3% |
| Beetroot poriyal | **90** (was 95) | 2 | 10 | 5 | 3 | 7 | 280 | 93 | 3.2% |
| Chicken curry | **250** (was 245) | 22 | 8 | 14 | 1 | 3 | 560 | 246 | 1.6% |
| Snack, medium | 150 | 3 | 20 | 6 | 1 | 8 | 180 | 146 | 2.7% |

- **Halfway cases:** 95 and 245 both sit exactly between two tens.
  - For Beetroot, 90 passes the 4P+4C+9F check on the displayed grams (100 would be 7.5% off).
  - Chicken curry rounds up to 250 (1.6% off).
- **Snack sizes:** small 90 kcal and large 250 kcal; macros are shown for medium only.

**Screen totals (checked on the displayed values on both pages):**

| Screen | kcal = sum of rows | P | C | F | Fibre | 4P+4C+9F | Δ |
|---|---|---|---|---|---|---|---|
| H2 Your plate (1×), H14 background, H2b | 110+180+90+250 = **630** | 33 | 72 | 23 | 10 | 627 | 0.5% |
| H3, H4, H5, H11 (rice 1.5×) | 110+270+90+250 = **720** | 35 | 92 | 23 | 11 | 715 | 0.7% |
| H6 Day, H6b, H9 background | 720 + 150 = **870** | 38 | 112 | 29 | 12 | 861 | 1.0% |
| H7 Nutrients | 870 | 38 | 112 | 29 | 12 | 861 | 1.0% |
| H8 Week average | 1,870 | 58 | 240 | 68 | 22 | 1,804 | 3.5% |

- **H7 also shows:** sugar 21 g, and sodium **1,446 mg**, the sum of the rounded dishes (420 + 6 + 280 + 560 + 180). It was shown as ≈ 1,450.
- **H8 average:** the six full days are 1.8k, 2.0k, 1.6k, 2.1k, 1.7k and 2.0k (avg 1,867, displayed as 1,870). Today is 0.9k (870).
- **"≈":** none remain on either page, including hidden layers. There were 100 per page.

### 2.2 Components (page 03)

- **KcalGauge** (hero), with a new variant property `Goal`:
  - `Goal=Off` (default, used everywhere): a big mono number, "kcal", a caption ("this plate" / "today"), a **thin P/C/F split bar** and a gram legend. The bar is 200×6: Protein lime, Carbs `on-hero`, Fat `on-hero-secondary`, with widths set by each macro's share of kcal (4P / 4C / 9F). Plus the Estimate pill. **No arc, no goal.**
  - `Goal=On`: the arc plus "of 2,000 a day", with the Estimate pill in the arc's bottom gap. Used only on H6b.
  - `Value=Hidden`: "Numbers hidden / Portions only". No pill and no digits.
- **MacroRing:** grams inside the ring, name below.
  - `Goal=Off` (default): no progress arc, no target line.
  - `Goal=On`: progress arc plus a target line ("12 g left"). Used only on H6b.
- **DishPortionRow** (now a set):
  - `Detail=Compact` (default): name, veg mark, kcal, slider and chips (190 pt).
  - `Detail=Expanded`: adds the P/C/F bar and grams (216 pt). Shown on H2b.
- **EstimatePill** (new): "Estimate" plus an info icon.
  - The visual chip is 28 pt; the tap target is 94×44.
  - `On dark` (hero): `hero-pill` fill with `on-lime` label and icon, dark in both modes.
  - `On light`: `surface` fill, a 1 pt `ink-secondary` outline and an `ink` label.
- **A lesson re-learned:** cloning a variant drops its text-property bindings. They were re-bound on every clone (KcalGauge On, MacroRing On, DishPortionRow Expanded) and checked.

### 2.3 Frames

- **Updated (pages 04 and 05):** H2–H5, H6, H7 (the Estimate pill replaces the "Estimates only" chip), H8, H9, H10, H11. H1, H12 and H13 had no edits.
- **Estimate pill:** on H2, H3, H4, H5, H6, H7, H9 (and on H14's background and on H2b / H6b). **Not** on H11.
- **H11 (numbers hidden):** no nutrition digits. The only digits it shows were already there before this stage: the portion multipliers (0×–2×), the date chip "Wed 14 Aug" and the status-bar time.
- **H10 Daily goal:**
  - The "Use a daily goal" toggle stays **off**, so the goal is opt-in.
  - The options (Steady energy 2,000, Active days 2,400, Custom) sit under "If you turn it on"; none is preselected or marked as suggested.
  - "≈" removed.
- **Bottom padding:** H2–H5 and H11 went from 120 to **124**, so the portion chips end at 728 at the end of the scroll, 22 pt above the sticky Save bar (750).
- **New frames** (Light at x 6409 / 6902 / 7395, y 36020; Dark clones on 05 via the Dark variable mode):
  - **H14 · About estimates** (`Your plate · About estimates`): a Medium sheet over H2 with a Close button. Its body says exactly: "Portions are standard servings. Actual plates vary, so values are estimates, not medical advice."
  - **H6b · Day view, goal on** (`You · Daily breakdown · goal on`): the Goal=On hero ("870 of 2,000 a day") and rings with "12 g / 163 g / 41 g / 16 g left". This is the result of opting in on H10.
  - **H2b · Per-dish macros** (`Your plate · per-dish macros`): H2 with the four rows set to Detail=Expanded.
  - Each has a label, a Moment note and a Sample note.
  - The clones carried 3 design-page links from H2 and H6. They were removed; pages 04 and 05 are back to 7 links each.
- **Motion notes** (3 per page): rewritten for the new hero (number roll-up and split-bar growth; no gauge sweep).
- **Section D notes** (both pages, y 5290):
  - Note at x 0: "Skip and Not sure on Meal detail reuse the same hero card as Home; only the meal name and clock differ."
  - Open decision at x 493: "Not sure follow-up time for lunch is unset (dinner uses 4:30 PM). Confirm with mentor."

### 2.4 Diff and pixel checks

- **Diff against the snapshot:**
  - Page 03: KcalGauge and MacroRing changed; DishPortionRow re-wrapped as a set; EstimatePill added.
  - Pages 04 and 05: 11 frames and 3 motion notes changed; 14 nodes added per page (3 frames with labels and notes, and 2 D notes).
  - Links: 04 and 05 are at 7 (+0 after the clone-link removal); page 07 is at 1054 (+0 −0).
- **Page 07 unchanged, pixel-verified** (paired renders, 1×, compared with the Stage 1.11 renders):

| Frame | Noise floor (two copies rendered now) | Now vs Stage 1.11 | Pixels above 15 |
|---|---|---|---|
| Home · Morning | 36,628 px, max 4 | 10 px, max 15 | 0 |
| Spending · This week | 26,960 px, max 15 | 26,510 px, max 15 | 0 |
| Meals · Meal detail | 22,466 px, max 15 | 22,223 px, max 15 | 0 |

- **H1, H12, H13 (no edits):** the structural diff shows no change. A pixel comparison isn't available, because no before-render of these frames was taken at the start of this stage. From Stage 3 on, before-renders are taken at the start of every stage.

## Stage 2.5 - Composition ring (section H, pages 04 and 05) (2026-09-28)

A snapshot was stored before any change (`st25_*`; the `st2_*` chunks were cleared). 1× before-renders of all 16 section-H frames on page 04, plus H2 and H6 on page 05, are in `design/audit/stage2_5/before/`.

**Noise floor:**
- The same capture rendered twice: 0 px differ.
- Two separate clones of H2: 8,420 px differ, max 3.
- Pass rule for frames that must not change: **no pixel above 6**.

**Scope:** the KcalGauge component (page 03) and its instances, Macro rings removed from H2–H5 / H14 / H2b, the Estimate pill on H8, and H10 / H12 padding. Page 07 is unchanged.

The first attempt stopped at the dish-row fit check: with the Macro rings card still in place, the first dish row's chips ended 78 pt under the Save bar on H2. The approved fix was option 1: remove the Macro rings card on the plate screens and move Fibre into the hero.

### 2.5.1 KcalGauge Goal=Off (page 03)

- **Width:** the gauge is now 321 pt, the full inner width of the Hero card. Its height hugs its content.
  - Numeric variants: 338 pt with the Fibre line, 314 pt without it.
  - Hidden: 285 pt.
  - Bottom padding is 0, so the card's own 16 pt padding balances the sides.
- **Order, top to bottom:** Estimate pill (unchanged, 94×44) → Ring → Caption → Legend block.
- **Ring:**
  - Closed, 168 pt across, 14 pt stroke, centre radius 77.
  - Three stroked vector arcs with round caps, starting at 12 o'clock and running clockwise: P, C, F.
  - Each arc's visible length (the path plus two 7 pt caps) is proportional to its energy share (4P, 4C, 9F on the displayed grams).
  - Visible gaps are 3 pt, so the path gap is 17 / 77 rad.
- **Ring colours** (variables only, so Dark comes from the Dark mode):
  - P: `lime`
  - C: `on-hero`
  - F: `on-hero-secondary`
- **Centre:** only the kcal number (ML/Hero Metric 52, bound to `Number`) and "kcal" (ML/Hero Unit). There is no target, no knob and no over state.
- **Caption:** one line, ML/Mono Footnote, `on-hero-secondary`, bound to `Caption` ("this plate" / "today").
- **Legend:** three equal columns across the full width. Each has a 10 pt swatch, the name (ML/Footnote, secondary), then grams (ML/Mono Footnote, `on-hero`) and percent (ML/Mono Footnote, secondary).
  - Percentages use largest-remainder rounding and add up to 100.

| Variant | Grams P / C / F | Energy 4P / 4C / 9F | Percentages | Arc angle (path) |
|---|---|---|---|---|
| 630 | 33 / 72 / 23 | 132 / 288 / 207 = 627 | **21 / 46 / 33** | 64.0° / 151.9° / 106.2° |
| 720 | 35 / 92 / 23 | 140 / 368 / 207 = 715 | **20 / 51 / 29** | 58.8° / 171.4° / 91.9° |
| 870 | 38 / 112 / 29 | 152 / 448 / 261 = 861 | **18 / 52 / 30** | 52.0° / 173.4° / 96.7° |

- **Fibre line:**
  - Sits 6 pt under the legend in the same Legend block, in ML/Mono Footnote, secondary.
  - Uses new component properties `Fibre` (text, default "Fibre 10 g") and `Show fibre` (boolean, default off).
  - It has no percentage and does not enter the energy split.
  - It is on only on H2–H5, H14 and H2b, which lost their Macro rings card:
    - "Fibre 10 g" on H2, H14 and H2b.
    - "Fibre 11 g" on H3, H4 and H5.
  - These are the values the removed Fibre ring displayed on each frame.
- **Value=Hidden:**
  - A 94×44 "Pill space" at the top, so the ring sits at the same y as on H3 (numbers toggled).
  - An empty track: an ellipse with a 14 pt `on-hero` stroke at layer opacity 0.18, matching the Goal=On track.
  - Below it, "Numbers hidden / Portions only". There are no digits.
- **Goal=On** (H6b) is untouched. The arc, knob and pill render pixel-identical.
- **Contrast on the hero card:**

| Mode | on-hero | on-hero-secondary | lime |
|---|---|---|---|
| Light | 18.9:1 | 9.2:1 | 15.0:1 |
| Dark | 15.2:1 | 6.7:1 | 13.5:1 |

  All pass AA for both text and graphics.
- **Rule for later stages:** moving a text node into a new parent inside a component dropped its `componentPropertyReferences`, the same as cloning does. Re-bind and check after any restructure.

### 2.5.2 Frames (pages 04 and 05)

- **H2–H5, H14, H2b:** the `Macro rings` card was removed; it had no links. `Show fibre` is on with the frame's value.
- **H6, H6b, H7:** untouched. H6 keeps its Macro rings card.
- **H8 Weekly view:** added an Estimate pill (`Surface=On dark`) at the top-right of the Average card, vertically centred on the "DAILY AVERAGE" eyebrow.
  - It is an absolute child of the scrolling Content (x 259, y 66), because the card is an instance.
  - The Dark render comes from the Dark mode.
- **H10, H12:** Content bottom padding went from 120 to **124**.

### 2.5.3 Checks

**At rest, first dish row: stepper and chips vs the Save bar (top at 750)**

| Frame | Hero (y) | First dish row | Stepper → chips | Clearance |
|---|---|---|---|---|
| H2 | 152–514 | 526–716 | 602–702 | **48 pt** |
| H3 | 152–514 | 526–716 | 602–702 | **48 pt** |
| H4 | 190–552 | 564–754 | 640–740 | **10 pt** (≥ 8) |
| H5 | 170–532 | 544–734 | 620–720 | **30 pt** |
| H11 | 152–461 | 473–663 | 549–649 | 101 pt |
| H14 (under sheet) | 152–514 | 526–716 | 602–702 | 48 pt |
| H2b | 152–514 | 526–742 | 628–728 | 22 pt |

Pages 04 and 05 give identical values.

**At the end of the scroll: last item vs the sticky bar**

| Frame | Content height (before → after) | Scrolls | Clearance |
|---|---|---|---|
| H2 / H3 / H14 | 1350 → 1348 | yes | 22 pt |
| H4 | 1388 → 1386 | yes | 22 pt |
| H5 | 1368 → 1366 | yes | 22 pt |
| H2b | 1454 → 1452 | yes | 22 pt |
| H11 | 1198 → 1277 | yes | 22 pt |
| H10 | 448 → 452 | no | 312 pt |
| H12 | 740 → 744 | yes (now 854 > 852) | 22 pt (was 20) |
| H6 (tab bar at 748) | 935 → 1043 | yes | 20 pt (R9b) |
| H9 | 430 → 554 | under sheet | — |

- **H6 layout:**
  - Hero at 186–524 (338 pt gauge), Macro rings at 536–658, Meals card from 670.
  - The legend and the macro rings are both on the first screen, above the tab bar (748). The Lunch row header starts at 670.
  - The Hero grew 108 pt: 124 for the ring, minus 16 for the bottom padding.
- **Totals** (both pages; hero value = sum of the displayed dish values):
  - H2 / H14 / H2b: 110+180+90+250 = 630. Dish macros sum to P 33, C 72, F 23 (as on H2b). Energy 627 (0.5% off).
  - H3–H5 / H11: 110+270+90+250 = 720. P 35, C 92, F 23. Energy 715 (0.7% off).
  - H6: 720 + 150 = 870. P 38, C 112, F 29. Energy 861 (1.0% off).
- **Links:** 04 = 7, 05 = 7, 07 = 1054 (966 navigate + 88 back). No change.
- **Structural diff against `st25`:**
  - Page 03 changed only in the KcalGauge set (Off variants and two new properties).
  - On pages 04 and 05, the top-level counts are unchanged (1036 / 847). The edits are inside the frames listed above.
  - Page 07: all 265 nodes are present with the same geometry and child counts.
- **Pixel diffs** (1×, paired renders, threshold "no pixel above 6"):

| Frame | Pixels differing | Pixels above 6 | Result |
|---|---|---|---|
| H1 | 0 | 0 | unchanged |
| H6b | 0 | 0 | unchanged |
| H7 | 0 | 0 | unchanged |
| H12 | 0 | 0 | unchanged (padding is below the fold) |
| H13 | 0 | 0 | unchanged |
| H10 | 0 | 0 | unchanged (padding only) |
| Page 07, all 228 frames (4 grid captures rendered before and after the frame edits) | 0 | 0 | unchanged |
| H8 | 2,368 | 2,368 | pill only |
| H2–H6, H9, H11, H14, H2b | changed as intended | | |

Evidence: `design/audit/stage2_5/`
- `before/` and `after/`: 1× frames.
- `pair_light_H2|H6|H7.png` and `pair_dark_H2|H6.png`: before and after side by side.
- `stopped/`: the first attempt.

## Stage 2.6 - H6 Nutrients card (pages 03, 04, 05) (2026-09-28)

A snapshot was stored before any change (`st26_*`; the `st25_*` chunks were cleared). This snapshot also records overflow, fixed-children count and child order per node.

1× before-renders of H1, H6, H7, H12 and H6b (page 04 Light, page 05 Dark) are in `design/audit/stage2_6/before/`. The same capture rendered twice differs by 0 px. The pass rule is **no pixel above 6**.

**Scope:** a new NutrientsCard component on page 03, which replaces the Macro rings card on H6 (pages 04 and 05). Nothing else changed.

### 2.6.1 NutrientsCard (page 03, `561:27699`, at 1400, 11500)

- **Card:** 353 pt wide, 108 pt tall (height hugs), radius 20, `surface` fill, padding 16, item spacing 12. It uses the same card shell as the removed Macro rings card.
- **Header row:** "Nutrients" (ML/Body Semibold, `ink`) and a right chevron (`chevron.right`, 24 pt). The chevron's stroke is bound to `ink-secondary`, and it is vertically centred on the title.
- **Stats row:** three equal columns (101.7 pt each, 8 pt gaps): Fibre, Sugar, Sodium.
  - Each column has the value with its unit (ML/Mono Body, `ink`) above the label (ML/Footnote, `ink-secondary`).
  - The values are text properties `Fibre` / `Sugar` / `Sodium`, defaulting to the H7 values.

| Stat | H6 card | H7 row | Width / column | Lines |
|---|---|---|---|---|
| Fibre | 12 g | 12 g | 36 / 101.7 | 1 |
| Sugar | 21 g | 21 g | 36 / 101.7 | 1 |
| Sodium | 1,446 mg | 1,446 mg | 72 / 101.7 | 1 (comma kept; the style was not reduced) |

- **Numbers:** whole numbers, with no "≈" anywhere.
- **Tap target:** the whole card, 353×108 (≥ 44). The link to H7 is added in Stage 3.
- **Colours:** variables only, so Dark comes from the Dark mode.

| Mode | ink on surface | ink-secondary on surface |
|---|---|---|
| Light (#111111 / #5c5c58 on #ffffff) | 18.9:1 | 6.7:1 |
| Dark (#f2f2ec / #a3a39c on #161616) | 16.1:1 | 7.1:1 |

  Both pass AA; the chevron is ≥ 3:1 as a graphic.

### 2.6.2 H6 (pages 04 and 05)

- The `Macro rings` card (no links) was replaced by a `Nutrients` instance set to FILL.
- The hero, Estimate pill, DatePillStrip, Meals card and "All nutrients" row are unchanged.
- **Height:** Content went from 1043 to **1029** pt (−14; the card is 108 instead of 122).
- **Layout:**
  - DatePillStrip 110–174
  - Hero 186–524
  - Nutrients 536–644
  - Meals card 656–944 (Lunch 656–728, Snack 728–800, …)
  - All nutrients 956–1015
  - Tab bar at 748
- **Visible above the tab bar at rest:** the date strip, the full hero (ring and legend), the full Nutrients card, and the whole Lunch row. The Snack row starts at 728 under the scroll-edge fade.
- **End of scroll:** the last item is 20 pt above the tab bar (padding 124, R9b).
- **H6b, H7 and all other frames are untouched.** H6b keeps its rings with progress arcs.

### 2.6.3 Checks

- **Structural diff against `st26`:**
  - Page 03: +1 (`NutrientsCard`), 0 changed, 0 removed.
  - Pages 04 and 05: 1 changed each (H6 `327:23368` / `329:71921`), 0 added, 0 removed.
  - Page 07: 0 / 0 / 0.
- **Links:** 04 = 7, 05 = 7, 07 = 1054, with 0 added and 0 removed on each.
- **Pixel diffs** (1×, paired renders, no pixel above 6):

| Frame | Light | Dark |
|---|---|---|
| H1 | 0 px | 0 px |
| H6b | 0 px | 0 px |
| H7 | 0 px | 0 px |
| H12 | 0 px | 0 px |
| H6, rows 0–535 (status bar, nav, date strip, hero) | 0 px | 0 px |
| H6, tab bar and home indicator (748–852) | 0 above 6 | 0 above 6 |
| H6, changed area | y 552–726 | y 552–731 |

The changed area on H6 is the new card, plus the Meals card that moved up 14 pt. Compared at the shifted position (after 656–688 against before 670–702), the Meals card differs only in 239 px (Light) / 260 px (Dark), max 47 / 50. Those are the rounded corners over the fixed background wash, which is not shifted.

### 2.6.4 Fragile spots (keep in mind for Stage 3 and later)

- **H8 Estimate pill** (pages 04 and 05) is an **absolute layer over a component instance** (the "Average" card). It sits in the scrolling Content at x 259, y 66 and is not part of the card.
  - If the Average card's padding, height or eyebrow position changes, or the card is swapped, the pill will not follow.
  - Re-check its position whenever H8 or that component is edited.
  - A cleaner fix would be an Estimate-pill slot inside the Average component.
- **KcalGauge set on page 03** (0, 10572, 2532 × 378) overlaps the MacroRing, MacroBar, DishPortionRow and EstimatePill sets on the canvas.
  - This dates from Stage 2, when the Goal=On variants took the set to about 2208 pt wide. Stage 2.5 widened it further.
  - Instances are unaffected; it is canvas tidiness only. It was not moved here because moving frames is outside this stage.

## Stage 3 - Plate tracker in the prototype (page 07, Light only) (2026-09-28)

**Preconditions** (all passed, read-only):
- No "≈" in the 16 section-H frames on page 04.
- KcalGauge Goal=Off shows the composition ring.
- H8 has the Estimate pill.
- H10 clears its Save bar by 312 pt (it doesn't scroll); H12 clears it by 22 pt.

**Snapshot and baseline:**
- A snapshot was stored before any edit (`st3_*`, including the full 1054-row page-07 link dump; `st26_*` cleared).
- 1× before-renders are in `design/audit/stage3/before/`. They cover H1, H12 and H13 (page 04), the You-list frames (pages 04 and 05), and all 228 page-07 frames (four grids, kept in the working scratchpad).
- The same capture rendered twice differs by 0 px.

### 3.0 Source rule (applies to all later stages)

- **Page 04 is the source** for the plate-tracker screens.
- The 18 frames in row **"P · Plate tracker"** on page 07 (y 37740) are **copies**. Frames can't be instanced, so copies do not inherit later fixes.
- Any change to a tracker screen is made on page 04 first, then re-copied, and the page-07 scroll pattern and links are re-applied.
- **Dark** stays on page 05 as a design page with no prototype. The prototype is Light only.
- Copying carried page 04's two "Plate tracker (design page)" flow starts onto the copies. They were replaced by a single start, **"Plate tracker"**, on the H1 copy. Page 07 now has 24 starts.

### 3.1 Copies and scroll pattern

- **Frames copied:** lunch "Meal detail · Answer Yes · Sending" (`303:22149`), lunch "Meal detail · Answer Yes · Saved" (`303:22257`), then H1–H14, H6b and H2b, placed at x = k·493.
- **H6** was copied in its Stage 2.6 state (with the Nutrients card).
- **Links stripped:** every copy's design-page links were removed.
- **Pattern applied to every copy** (the Meal detail / inline-title pattern):
  - Layer order: Meal wash → Content → **HeaderBackdrop** → **ScrollEdgeFade Style=Status** ("Top edge fade") → Status Bar, Nav Header, fades, bar or sheet layers, Home Indicator.
  - `numberOfFixedChildren = children − 2`, so only the wash and the content scroll.
  - `overflowDirection = VERTICAL`, clip on, bottom padding **124**.

| Frame | Before (page-04 source) | After (page-07 copy) | Bar | Scrolls | Last item vs bar |
|---|---|---|---|---|---|
| Lunch Sending | no scroll, not fixed | fixed 7 | Tab | yes | 20 |
| Lunch Saved | no scroll, not fixed | fixed 7 | Tab | yes | 20 |
| H1 | no scroll, not fixed | fixed 7 | Tab | yes | 20 |
| H2 / H3 / H4 / H5 / H11 / H2b | no scroll, not fixed | fixed 7 | Save | yes | 22 |
| H14 (sheet) | no scroll, not fixed | fixed 10 | Save | yes | 22 |
| H6 | no scroll, not fixed | fixed 7 | Tab | yes | 20 (after removing All nutrients: content 958) |
| H6b / H7 / H8 | no scroll, not fixed | fixed 7 | Tab | yes | 20 |
| H9 (sheet) | no scroll, not fixed | fixed 9 | Tab (under scrim) | no | — |
| H10 | no scroll, not fixed | fixed 6 | Save | no | 312 |
| H12 | no scroll, not fixed | fixed 6 | Save | yes | 22 |
| H13 | no scroll, not fixed | fixed 7 | Tab | no | 177 |

**Checks on the copies:**
- **H4:** the first dish row's chips end at 740 against the Save bar at 750, so **10 pt** (held).
- **H8:** the pill is at 259, 176, 20 pt in from the right edge of the Average card, level with its eyebrow (held).

### 3.2 Entry cards (measured)

**a. Meal detail (Answer Yes · Saved) → H1**
- The H1 "Track this meal?" card is **172 pt** tall and sits in place under the hero.
- On H1 the Crowd row is at 861–915. At the end of the scroll it ends **20 pt** above the tab bar, so it is reachable.
- The lunch Saved copy scrolls by 3 pt; its Crowd row is visible at rest (ends at 731, tab bar at 748).

**b. PlateSummaryCard** (page 03, `572:21676`, at 1800, 11500)
- **Card:** 353 × **106**, `hero-bg`, radius 20, padding 16.
- **Ring:** a 64 pt composition ring (stroke 8, 3 pt gaps, round caps) in lime / `on-hero` / `on-hero-secondary`, sized by 4P / 4C / 9F of 38 / 112 / 29 g.
- **Text:** "TODAY · ESTIMATE" (ML/Mono Label), "870" (ML/Metric) with "kcal" (ML/Metric Unit), "P 38 g · C 112 g · F 29 g" (ML/Mono Footnote), and a chevron.
- **No** target, goal arc, knob or over state.
- **Properties:** `Number` and `Macros` (text).
- **Tap target:** the whole card, 353 × 106.
- **Contrast** (same tokens as the hero): Light 18.9 / 9.2:1, Dark 15.2 / 6.7:1.
- **Placed only** on **Home · After last meal** (`221:62580`), between "At the Mess" and "Follow-up", at 603–709.
  - It is fully visible above the tab bar at rest.
  - Content grew from 780 to 898. At the end of the scroll the last item ends **20 pt** above the tab bar.
  - The frame is reached in the "MealLoop app" flow: Onboarding → All set → Home · Afternoon → (status-bar tap) During meal → After last meal.
- **Other Home states that would need it** (not changed in this stage): Home · Morning, Home · Afternoon, Home · During meal, and the Home-based answer states (Answer Yes / No / Not sure · Tap, Sending, Saved, Near meal), plus Recheck · Home.
  - After cutoff, Hero unavailable, Modules hidden, Pass hidden, Offline, Loading, Crowd stale and Rewards soon are gallery frames, so they are left as they are.

### 3.3 Nutrition row

- **Row:** "Row / Nutrition", a SettingsRow Type=Link (a clone of the About row, so still an instance), with icon `chart.bar` and title "Nutrition". It sits above "About MealLoop" with its own separator. Tap target: 351 × 56.
- **Frames:**
  - Page 07: You, Request correction, Correction · Sent, Correction · Failed, Sign out, You · Offline.
  - Pages 04 and 05: the same six, plus You (full scroll) and You · Offline (full scroll).
- **Full-scroll frames:** they grew by 57 pt (1067 → 1124, 1127 → 1184), and their Tab Bar, Home Indicator and scroll-edge fade moved down 57 pt.
- **Links:** on page 07, the You and You · Offline rows link to the H13 copy (drill-in). The rows in the four sheet or dialog frames sit under the scrim and have no link.
- **Sign out clearance:**
  - Page-07 You and You · Offline: **21 pt** above the tab bar at the end of the scroll.
  - Full-scroll frames on 04 and 05: 21 pt.
  - The 852 pt design frames on 04 and 05 do not scroll, and Sign out was already below their fold before this stage.

### 3.4 Links

**+102** on page 07 (1054 → **1156**). The full table is in `design/audit/stage3/new_links.md`. Pages 04 and 05 stay at 7.

- **Variable:** a new collection "Prototype state" with boolean **`seenPlateIntro`** (default false). The plugin could set it.
  - H1 "Track my plate" is a **conditional** action: if `seenPlateIntro` is true, go to H2. Otherwise set it to true and go to H12.
  - So H12 appears once per prototype session.
- **Menu entry:** Meals · Menu "Current meal" (Serving now · Lunch) goes to lunch Sending (drill-in).
  - Sending → Saved: timer 1.2 s, Smart animate 0.25, matching the other Sending frames.
  - Saved → H1: timer 0.8 s, Smart animate 0.25. The Track card appears in place.
- **R1a/R1b:** lunch Saved and H1 are entered by timers, so their Back and H1 "Not now" are **fixed back links (Move out right 0.3 s) to Meals · Menu**, not BACK. BACK there would return to a timer frame and loop.
- **Substitutes** (the copies have no matching control; recorded as gaps 62–64):
  - H6 "+" → H9 uses the **Snack row**.
  - H6 week toggle → H8 uses the **DatePillStrip**.
  - H6 goal link → H10 has no control on H6; H10 is reached from H13 → Daily goal.
  - H13 "Today" → H6 has no control on H13; H6 is reached from H4 Done, the Home card and the H6b back link.
  - H10 "saving a goal" uses the **Steady energy / Active days option rows**, because the Save button is drawn Disabled.
- **H6 "All nutrients" row:** removed on the page-07 copy once the Nutrients card linked to H7. H6 still ends 20 pt above the tab bar. The page-04/05 H6 still has the row (gap 65).
- **Checks:**
  - No orphans: every copy has at least one incoming link.
  - No dead ends: every copy has a back or close.
  - Walks a–d trace link by link (see the Stage 3 README).

### 3.5 Pixel and structure checks

- **Page 04 H1, H12, H13:** 0 px differ.
- **Page 07:** 226 of 228 baseline frames have no pixel above 6 (max 4).
  - The two that changed are Home · After last meal (the PlateSummaryCard) and Sign out (the Nutrition row is visible behind the dialog).
  - You, Request correction, Correction · Sent / Failed and You · Offline are unchanged at rest, because the new row is below the fold.
- **Structure against `st3`:**
  - Page 07: +20 top-level nodes (row label, 18 copies, offline note); 7 frames changed (Home · After last meal and the six You-list frames).
  - Pages 04 and 05: 8 You-list frames changed each.
  - Page 03: +1 (PlateSummaryCard).
  - Page 03 also reported five sets with different nested instance and text counts: NavHeader, MealHero, IssueCard, IdentityCard and OnboardingPage. A sixth, GlassSheet, showed only on the first comparison.
  - This is the known page-03 first-read flip: the `st3` snapshot read page 03 once. No script in this stage touched those sets, and two fresh reads agree with each other. From Stage 4 on, the snapshot reads page 03 until two reads agree.
- **NavHeader and HomeHeader:** not edited.
- **Fragile spot (from Stage 2.6):** the H8 Estimate pill is an absolute layer over the Average card instance. It was re-checked on the H8 copy and holds.

## Stage 3.1 - Tracker's missing controls (pages 03, 04, 05, 07) (2026-09-28)

**Snapshot and baseline:**
- A snapshot was stored before any edit (`st31_*`, including the full page-07 link dump).
- Page 03 was read until two reads agreed (`lis4qm`, three reads over two runs). The first read, `jiwuwv`, was the first-load flip.
- 1× before-renders are in `design/audit/stage3_1/before/`: H1, H6, H6b, H7, H8, H10, H12 and H13 on pages 04/05, the page-07 copies, and all 246 page-07 frames. The same capture rendered twice differs by 0 px.
- **Method:** every design edit was applied with the same script to page 04 (source), page 05 (Dark twin) and the page-07 copy. No frame was re-copied.
- **Equality check after editing:** H6 and H10b have identical content children, visible text and header instance list on all three pages.

### 3.1.1 Page 03: `gearshape` symbol (the only page-03 change)

- **Added** `Name=gearshape` (`583:2`) to the Symbol set (now 55 variants) at 216, 264.
- **Built as a clone of `plus`,** so it keeps the 24×24 frame, SCALE constraints, no fill, a 1.7 stroke with round caps and joins, and a stroke bound to `ink` (`45:6`). It follows Dark.
- **Drawing:** an 8-tooth gear (outer radius 8.4, root radius 6.5) plus a 2.7 hub circle. The glyph is 16.8 × 16.8, centred at 3.6, 3.6, the same optical size as `bell` and `clock`.
- **Structural diff:**
  - Symbol set: kids 54 → 55.
  - NavHeader set: its nested-instance count read 10 → 11. This field has also read 10 and 12 on earlier first-load reads (the Stage 3 flip), and no script edited NavHeader.
  - No other page-03 set differs on a stable read.

### 3.1.2 H6 (goal off) on pages 04, 05 and 07

- **"All nutrients" row removed** on pages 04 and 05 (page 07 had it removed in Stage 3).
- **Day | Week toggle:**
  - The same `SegmentedControl` as H8, `Items=2, Selected=1` (Day), labels Day / Week. It is the first content item at y **110–158**, FILL width 353.
  - The 8 pt gap above the content was **not** used, because the content start (110) is shared by the other inline-title frames.
- **Header trailing slots** (NavHeader instance properties only; the component is untouched):
  - `Show Trailing` and `Show Trailing 2` are turned on.
  - Slot 2, "**Add food**": `plus` icon, 44 × 44, at 281, 58.
  - Slot 1, "**Nutrition settings**": `gearshape` icon, 44 × 44, at 333, 58.
  - Both icons are `ink`, not lime.
  - The icon-to-header contrast, measured on the renders, is **18.3:1** (Light) and **14.7:1** (Dark).

**Heights (content frame):**

| Page | Before | After | Net |
|---|---|---|---|
| 04 | 1029 | 1018 | −11 (−71 row, +60 toggle) |
| 05 | 1029 | 1018 | −11 |
| 07 copy | 958 | 1018 | +60 (row already gone) |

All three are now the same frame at 1018.

**Layout** (all three pages):
- Toggle 110–158
- DatePillStrip 170–234
- Hero 246–584
- Nutrients 596–704
- Meals card 716–1004 (Lunch 716–788)
- Tab bar 748

**Checks:**
- **At rest** on the page-07 copy, the hero and the Nutrients card are fully visible above the tab bar. The Lunch row shows its top 32 of 72 pt (accepted).
- **End of scroll:** the last item ends **20 pt** above the tab bar.

### 3.1.3 H10b · Option selected (pages 04, 05, 07)

- **Frame:** "Settings · Daily goal · option selected", a copy of H10, 852 pt below it (04/05: 4437, 37092; 07: 5423, 38692). Labelled "**H10b · Option selected**".
- **Changes from H10:**
  - The "Use a daily goal" row is set to `Toggle On`.
  - The Options group goes from 50% to 100% opacity.
  - **Steady energy** shows a `checkmark.circle` icon (selected).
  - **Save** uses `Style=Primary, State=Default` (enabled).
- **H10 unchanged:** it keeps the disabled Save (0 px changed on 04/05).

### 3.1.4 Links (page 07 only)

The page-07 link count went from 1156 to **1162** (−6 removed, +12 added). The table is in `design/audit/stage3_1/links.md`.

- **Removed (substitutes and old targets):**
  - H6 Snack row → Quick add
  - H6 date strip → Weekly
  - H10 Steady energy → H6b
  - H10 Active days → H6b
  - You → Nutrition → H13
  - You · Offline → Nutrition → H13
- **Added:**
  - H6 **Add food** → H9 (Dissolve 0.25)
  - H6 **Week** segment → H8 (Dissolve 0.25; the layer names don't match, so no Smart animate)
  - H6 **Nutrition settings** → H13 (drill-in)
  - H10 **Steady energy / Active days / Custom** → H10b (Smart animate 0.25, in-frame)
  - H10b **Save** → H6b (Dissolve 0.25)
  - H10b **Back** → BACK
  - You and You · Offline **Nutrition** → H6 (drill-in)
  - H9 and H14 **Dismiss · tap outside** → BACK
- **Kept from Stage 3:**
  - H8 Day segment → BACK (returns to H6)
  - H13 Back → BACK (returns to H6 when entered from the gear)
  - H13 Hide numbers → H11 and Daily goal → H10
  - H6b Back → H6 (fixed MOVE_OUT)
  - H6 Back → BACK (returns to You when entered from Nutrition)
- **Sheet hit layers:** "Dismiss · tap outside" is a transparent 393 × 852 frame placed after the Scrim and before the Sheet, so it covers the background screen, its tab bar and Estimate pill. It is fixed with the chrome.
  - H9 is entered only by tap (Add food).
  - H14 is entered only by tap (7 Estimate pills).
  - So BACK cannot land on a timer frame.
- **No goal link on H6,** as instructed.
- **Orphans / dead ends:** none. Every copy and H10b has at least one incoming link and a back or close.

### 3.1.5 Pixel checks (no pixel above 6)

- **Pages 04 and 05:** H1, H6b, H7, H8, H10, H12 and H13 have **0 px** changed.
- **Page 07:** 245 of 246 baseline frames have 0 px changed (max 0). The only changed frame is the H6 copy.
  - The H9 and H14 copies are unchanged, because the hit layers are transparent.
  - The H10 and You frames are unchanged, because only their links changed.
- **Link side effect:** removing "All nutrients" on pages 04/05 also removed its design-page link (H6 All nutrients → H7, Dissolve 0.2). Pages 04 and 05 are now at **6** links each (were 7).

### 3.1.6 Accessibility spec (recorded here because Figma has no accessibility-label field)

| Element | Label | Trait / role |
|---|---|---|
| H6 trailing slot 2 (`plus`) | "Add food" | button |
| H6 trailing slot 1 (`gearshape`) | "Nutrition settings" | button |
| H6 / H8 Day \| Week | segments "Day", "Week" | segmented control: tab-group semantics; each segment is a button with the *selected* trait on the current one (Day on H6, Week on H8) |
| H9 / H14 dismiss layer | "Close" | button; not in the reading order after the sheet's own Close |

- **Tap targets:** trailing slots 44 × 44 each; segmented control 353 × 48, each segment 170 × 38 inside a 48 pt row. The row is the hit area; the segment bounds are recorded here as specified in the source file.

### 3.1.7 Product rules (apply to all later stages)

1. **PlateSummaryCard** shows on Home only when the plate tracker is **on** and a plate has been **saved today**.
2. **You → Nutrition** opens the Day view (H6) when tracking is on. When tracking is **off**, it opens the first-run screen (H12).
3. **Goal setup lives only in Settings** (Nutrition → Daily goal → H10/H10b). H6 has no goal link.

## Stage 3.2 - Design-page link, title report, source map (2026-09-28)

**Snapshot:** `st32_*` (the `st31_*` page chunks were cleared; `st31_h10b` and `st3_copies` are kept).

| Page | Top-level nodes | Links |
|---|---|---|
| 03 | 265 | 0 |
| 04 | 1038 | 6 |
| 05 | 849 | 6 |
| 07 | 287 | 1162 |

Page 03 was read twice under the new rule and gave the same value both times (`9s8v9i`).

### 3.2.0 Page-03 comparison rule (applies from this stage on)

- For page 03, "unchanged" means **geometry** (x, y, w, h), **direct child count**, **fills** and **layer order** (child id list) are equal.
- Nested instance counts, nested text counts and text hashes inside component sets are **advisory only**. They flip on the first load of a session (seen on NavHeader, MealHero, IssueCard, IdentityCard, OnboardingPage and GlassSheet) with no edits.
- Other pages keep the full signature.

### 3.2.1 Link (pages 04 and 05)

- **Added one link per page:** H6 **Nutrients** card → H7 Nutrients detail, ON_CLICK, Dissolve 0.2 s. This matches the design-page link the removed "All nutrients" row had.
  - 04: `561:27714` → `353:24728`
  - 05: `561:53168` → `354:73679`
- **Counts:** pages 04 and 05 are back to **7** links each. Page 07 stays at 1162, with 0 added and 0 removed.
- **No other link changed** (link-dump diff against `st32`).

### 3.2.2 H6 "Today" title position (report only, nothing changed)

| Page | Title centre x | Frame centre | Offset |
|---|---|---|---|
| 04 | 170.5 | 196.5 | **26 pt left** |
| 05 | 170.5 | 196.5 | **26 pt left** |
| 07 copy | 170.5 | 196.5 | **26 pt left** |

- **Cause:** the NavHeader "Bar" is Back (x16, w44), then Center (x60, w221), then Trailing Group (x281, w96).
  - The title hugs its text and is centred inside Center.
  - With two trailing slots on, the trailing side is 52 pt wider than the leading side, so Center's midpoint is 26 pt left of the frame's.
- **Can it be centred without editing NavHeader? Yes, as an instance override.** Set the `Center` frame's left padding to 52 on the H6 instance. The content box then runs from 112 to 281, and its midpoint is 196.5. Overriding padding on a nested instance layer is allowed and leaves the component untouched.
  - An alternative is an invisible 52 pt spacer in the leading slot, but that is a structural override and less clean.
  - Not applied here.

### 3.2.3 Engineering rules (not shown in the prototype)

- **(a)** "You → Nutrition shows first-run (H12) when tracking is off" is an **engineering rule**. The prototype has no tracking-off state, so You → Nutrition always opens H6. There is no `trackingOn` variable.
- **(b) Source map:**
  - **Page 04 is the source.**
  - **Page 07 holds Light prototype copies** (frames can't be instanced, so copies do not inherit changes).
  - **Page 05 is the Dark twin** of page 04, built from the Dark variable mode, with no prototype.
  - Every edit to a frame listed below must be made on all its places with the same operation, then checked for text and structure equality.

| Key | Frame | Page 04 (source) | Page 05 (Dark) | Page 07 (copy) |
|---|---|---|---|---|
| LS | Meal detail · Answer Yes · Sending | 303:22149 | 303:43698 | 570:43678 |
| LV | Meal detail · Answer Yes · Saved | 303:22257 | 303:43806 | 570:43818 |
| H1 | Meal detail · Track this meal? | 327:22544 | 329:71774 | 570:43951 |
| H2 | Your plate · expanded | 327:22639 | 329:71810 | 570:44104 |
| H3 | Your plate · adjusting | 327:22823 | 329:71837 | 570:44344 |
| H4 | Your plate · saved | 327:22998 | 329:71864 | 570:44579 |
| H5 | Your plate · offline | 327:23181 | 329:71894 | 570:44819 |
| H6 | You · Daily breakdown | 327:23368 | 329:71921 | 570:45054 |
| H7 | You · Nutrients detail | 353:24728 | 354:73679 | 570:45230 |
| H8 | You · Weekly view | 327:23511 | 329:71951 | 570:45349 |
| H9 | You · Quick add | 353:25011 | 354:73825 | 570:45488 |
| H10 | Settings · Daily goal | 353:25149 | 354:73860 | 570:45642 |
| H10b | Settings · Daily goal · option selected | 584:83377 | 584:83464 | 584:83549 |
| H11 | Your plate · numbers hidden | 353:25268 | 354:73883 | 570:45721 |
| H12 | Plate tracker · First run | 353:25506 | 354:73911 | 570:45925 |
| H13 | Settings · Nutrition | 327:23630 | 329:72001 | 570:46012 |
| H14 | Your plate · About estimates | 507:26490 | 507:52275 | 570:46121 |
| H6b | You · Daily breakdown · goal on | 507:26752 | 507:52312 | 570:46366 |
| H2b | Your plate · per-dish macros | 507:26970 | 507:52342 | 570:46540 |

- **Not copies:** the rest of page 07 (Home, Meals, You, Search, gallery and so on) was built on page 07 and exists there only.
  - Their page-04/05 counterparts with the same name (for example You, Sign out, You · Offline) are design versions kept in step by hand.
  - The Nutrition row (Stage 3) was added to all of them on 04, 05 and 07.
  - PlateSummaryCard is on page-07 Home · After last meal only.

### 3.2.4 Pixel check

- All 17 section-H frames plus H10b on pages 04 and 05 were rendered before and after the link change: **0 px** changed, max 0.
- Page 07 is structurally unchanged (0 nodes changed) and has no link changes, so no re-render was needed.

## Stage 3.3 - H6 title centred (instance override) (2026-09-28)

- **Change:** on H6's NavHeader instance, the `Center` layer (`74:130`) gets `paddingLeft` **0 → 52**, as an **instance override** on page 04 (`327:23368`), page 05 (`329:71921`) and the page-07 copy (`570:45054`).
  - The NavHeader component is not edited; its `Center` padding is still 0.
  - The override is listed on each instance as `74:130: paddingLeft`.
- **Result (all three pages):**
  - Title "Today" is centred at **196.5** (was 170.5).
  - The content box is 112–281 (169 pt) and the text is 49 pt wide, with auto width and truncation disabled, so it does not truncate.
  - Clearance to the back button (ends at x 60) is **112 pt**.
  - Light and Dark render the same.
- **Pixel check:**
  - On H6 (04, 05, 07), before vs after, the only pixels above 6 are inside **x 146–221, y 73–90** (the title glyphs moving). Outside the title area (x 60–281, y 58–102), 0 pixels are above 6.
  - Every other frame is structurally identical to the `st32` snapshot (0 nodes changed on 03, 04, 05 and 07), and no other frame was touched.
- **Links:** 7 / 7 / 1162 (unchanged).
- **Fragile spot:** this is an instance override. It **reverts to 0 padding (title 26 pt off-centre)** if H6's header instance is reset ("Reset all changes"), swapped to another NavHeader variant, or replaced. The same applies to the Stage 3.1 trailing-slot overrides (Show Trailing / Show Trailing 2 and the plus and gear icons).
  - If the header is ever rebuilt, re-apply the padding on all three places, and re-copy page 04 → 07 only through the source rule.
  - If a trailing slot is later hidden, remove the padding: it equals the 52 pt width difference between the two trailing slots and the back slot.

## Stage 3.4 - Classify the remaining links (page 07, transitions only) (2026-09-28)

**Snapshot:** `st34_*`, taken before any edit. It includes the full page-07 link dump. Page 03 was read by the Stage 3.2 rule; two reads agree (`9s8v9i`).

**Scope:** only `transition` objects on page-07 links changed. No destinations, triggers, navigation, frames, layers or components changed.

### 3.4.1 Changes (29 links; full table in `design/audit/stage3_4/changes.md`)

**Onboarding steps (12): Dissolve 0.2 → Move in from right 0.3 s ease-out (drill-in)**
- Welcome → Carousel 1
- Carousel 1 → Carousel 2 and Carousel 1 → Sign in
- Carousel 2 → Carousel 3 and Carousel 2 → Sign in
- Carousel 3 → Sign in
- Sign in → Verifying
- Verifying → Confirm profile (1.5 s timer)
- Confirm profile → All set and Confirm profile → Request correction
- Request sent → All set
- All set → Home · Afternoon

**"Done → Home" (5): Dissolve 0.2 → Dissolve 0.25 s**
- Feedback · Receipt
- Feedback · Recheck thanks
- Report · Urgent receipt
- Report · Receipt
- Rewards · Got it

All five go to Home · Afternoon.

**Notification and lock-screen launches (12): all Dissolve 0.25 s.** Every destination is Home, a Home state or a tab root; none is a detail screen.

| Source | Destination | Kind |
|---|---|---|
| Recheck · Inbox · "Dinner at 7:30. Eating here?" | Recheck · Home · Recheck | Home state |
| Recheck · Inbox · "Lunch menu is up" | Meals · Menu | tab root |
| Notifications · Inbox · "Eating dinner here?" | Recheck · Home · Recheck | Home state |
| Notifications · Inbox · "Lunch menu is up" | Meals · Menu | tab root |
| Lock screen previews · Notification 1 | Recheck · Home · Recheck | Home state |
| Recheck · Lock · Said yes (expanded) · Action 2 | Recheck · Home · Recheck yes | Home state |
| Recheck · Lock · Said no (expanded) · Action 2 | Recheck · Home · Recheck no | Home state |
| Lock · Saved · Not sure | Home · Afternoon | Home |
| Lock · Saved · Still in | Home · Afternoon | Home |
| Lock · Saved · Still skipping | Home · Afternoon | Home |
| Lock · Saved · Yes, better | Home · Afternoon | Home |
| Lock · Saved · Still bad | Home · Afternoon | Home |

### 3.4.2 Left unchanged (17, still Dissolve 0.2 s)

| Group | Link → where it goes today | Reason |
|---|---|---|
| Fixed back arrows (5) | Entry · Under review · Back → Entry history; Pass · Live 1 / Live 2 / Live 3 / Used · Back → Home · Afternoon | Entered by timers, so BACK would loop (R1a). They would take R1b (Move out right 0.3 s) once approved; left as instructed. |
| Return to a list (4) | Report · Need more info · Button → My reports; Report · Fixed · Button → My reports; Report · Fixed · "Didn't try" → My reports; Report · Fixed · Button → Report · What's wrong | They move **up** the hierarchy, so drill-in is wrong. BACK is not equivalent, since these frames are reached from several places. A pop transition needs a decision. |
| Settings → lock-screen previews (4) | Notification settings rows: 3-hour recheck → Recheck · Lock · No answer; Pass → Lock screen previews; Report updates → Lock · Stack; Fix checks → Lock · Fix check | Demo jumps out of the app into the lock-screen simulator. No real navigation role. |
| Meal detail → answer (3) | Meals · Meal detail I'm in / Skip / Not sure → Answer Yes / No / Not sure · Tap (Home frames) | The destination is a Home-area frame, so it changes both screen and tab. It needs either a Meals-area answer state (the lunch Meal detail answer frames exist) or a decision. |
| Community · Suggestion "Me too" (1) | Support → Community · List | Looks like a wrong destination (should toggle to a supported state on the same card). Open question since Stage 0.5. |

**Unclassified count:** 46 → **17**.

### 3.4.3 Verification

- The link count stays at **1162** (reactions and actions).
- **In-script comparison** of the before and after dumps: for every action it checked the trigger, type, destination, navigation and all non-transition fields. The script was set to throw and roll back on any difference.
  - **29** transition differences, all on the listed links.
  - **0** other differences.
- Node fingerprints on every page match `st34`.

### 3.4.4 Walks (page 07)

1. **Onboarding to Home:**
   - Welcome → (drill-in) Carousel 1 → (drill-in) Carousel 2 → (drill-in) Carousel 3 → (drill-in) Sign in → (drill-in) Verifying → [1.5 s timer, drill-in] Confirm profile → (drill-in) All set → (drill-in) Home · Afternoon.
   - Skip links on Carousel 1 and 2 → Sign in are also drill-ins.
2. **Notification launch:** Notifications · Inbox → "Eating dinner here?" → (Dissolve 0.25) Recheck · Home · Recheck.
3. **Done → Home:** Feedback · Receipt → Done → (Dissolve 0.25) Home · Afternoon.

## Stage 3.5 - Remaining link roles, "Me too" check (page 07) (2026-09-28)

**Snapshot:** `st35_*`, taken before any edit. It includes the full page-07 link dump. Page 03 was read by the 3.2 rule; two reads agree (`9s8v9i`).

**Scope:** transition (and, on one link, navigation) changes on 10 links. No destinations, frames, layers or components changed.

### 3.5.1 Changes (10 links)

| Group | Source · layer | Destination | Old | New |
|---|---|---|---|---|
| All set | Onboarding · All set · Button | Home · Afternoon | Move in right 0.3, NAVIGATE | **Dissolve 0.25 s, SWAP** |
| Fixed back (R1b) | Entry · Under review · Back | Entry history | Dissolve 0.2 | **Move out right 0.3 s ease-out** |
| Fixed back (R1b) | Pass · Live 1 · Back | Home · Afternoon | Dissolve 0.2 | Move out right 0.3 s |
| Fixed back (R1b) | Pass · Live 2 · Back | Home · Afternoon | Dissolve 0.2 | Move out right 0.3 s |
| Fixed back (R1b) | Pass · Live 3 · Back | Home · Afternoon | Dissolve 0.2 | Move out right 0.3 s |
| Fixed back (R1b) | Pass · Used · Back | Home · Afternoon | Dissolve 0.2 | Move out right 0.3 s |
| Return to a list | Report · Need more info · Button | Report · My reports | Dissolve 0.2 | **Move out right 0.3 s** |
| Return to a list | Report · Fixed · Button | Report · My reports | Dissolve 0.2 | Move out right 0.3 s |
| Return to a list | Report · Fixed · Button | Report · What's wrong | Dissolve 0.2 | Move out right 0.3 s |
| Return to a list | Report · Fixed · "Didn't try" | Report · My reports | Dissolve 0.2 | Move out right 0.3 s |

**New rule R1c.** A link that moves *up* the hierarchy to a list or parent (not BACK) uses the fixed-back style: Move out right 0.3 s ease-out.

### 3.5.2 "Me too" (Community · Suggestion)

- **Search:** every page, including 00 MoodBoard and 99 Archive, for frames or components named "Suggestion" and for any frame containing "More breakfast options".
- **Result:** only `Community · Suggestion` exists, once each on 04, 05 and 07, always in the not-supported state (count 112, button "Me too"). There is **no** supported or agreed state (no "You said me too", no 113).
- **Outcome:** the destination is unchanged (→ Community · List, Dissolve 0.2). It is logged as a **defect** (gap 76).

### 3.5.3 Left unchanged (8, Dissolve 0.2)

- **4 settings → lock-screen previews:**
  - Notification settings · 3-hour recheck → Recheck · Lock · No answer
  - Pass → Lock screen previews
  - Report updates → Lock · Stack
  - Fix checks → Lock · Fix check
- **3 Meal detail → answer:** Meals · Meal detail I'm in / Skip / Not sure → Answer Yes / No / Not sure · Tap (gap 77).
- **1 "Me too"** (defect, gap 76).

**Final unclassified count:** 17 → **8**, of which 7 are deliberate (demo jumps and the pending answer parity) and 1 is a defect.

### 3.5.4 Verification

- **Link count:** 1162 (unchanged; no "Me too" fix was possible).
- **In-script dump comparison:** exactly **10** transition differences, all on the listed links. The only navigation difference is All set (NAVIGATE → SWAP), which was allowed.
- **0** differences in trigger, destination, action type or any other field. The script would have thrown and rolled back otherwise.

### 3.5.5 Walks

1. **All set → Home → Back:**
   - All set → (Dissolve 0.25, SWAP) Home · Afternoon. SWAP replaces All set in the history with Home.
   - Home · Afternoon has **no BACK action** (0 BACK links; it is a tab root with no back arrow). So there is no Back tap from Home, and onboarding cannot be reached by Back from Home.
   - Every BACK from a screen drilled into from Home returns to Home, not past it.
   - **Caveat:** Figma's history still holds the earlier onboarding frames (Welcome … Confirm profile) *below* Home, because those steps are NAVIGATE drill-ins. They can only be reached by a BACK issued *on Home*, which doesn't exist. If a Back control is ever added to Home, the whole onboarding path would need SWAP.
2. **Entry · Under review → Back:** Move out right 0.3 s → Entry history (fixed, since this frame is entered by a timer).
3. **Return to a list:** Report · Fixed → Button → (Move out right 0.3 s) Report · My reports.
4. **"Me too":** Community · Suggestion → Me too → (Dissolve 0.2) Community · List. Unfixed; see the defect.

## Stage 3.6 - Home dashboard cards (pages 03, 07) (2026-09-29)

**Snapshot:** `st36_*`, taken before any edit. It includes the full page-07 link dump. Page 03 was read by the 3.2 rule; two reads agree (`9s8v9i`). All 247 page-07 frames were rendered as the pixel baseline.

### 3.6.0 Step 0: lunch hero check (report only, nothing changed)

- **Lunch "Answer Yes · Saved" and H1 on pages 04, 05 and the page-07 copy:** all six use the `MealHero` instance `State=In` at y 110–267, directly above the Track card (y 279). It reads "Lunch · 12–2 PM · I'm in · You're in for lunch · Change till 9 AM · Change".
- **Dinner "Answer Yes · Saved" (page 07):** uses the same `State=In` variant.
- **The question form** ("You in for lunch? I'm in / Skip / Not sure") is the Sending/Tap state, as it is for dinner.
- No frame was missing its hero, and nothing was restored.

### 3.6.1 Components (page 03)

- **`TodaysPlateCard`** (set `611:40968`; this is the former `PlateSummaryCard`, renamed and combined as variants, so existing instances keep working):
  - `Size=Full, State=Populated`: the original 353 × 106 card (ring + P/C/F).
  - `Size=Compact, State=Populated` (170 × 106, `hero-bg`):
    - "Today's plate" (ML/Footnote, `on-hero-secondary`) and a chevron.
    - A 36 pt P/C/F composition ring (lime / `on-hero` / `on-hero-secondary`), plus "870" (ML/Metric, `on-hero`) and "kcal".
    - No legend.
  - `Size=Compact, State=Empty` (170 × 106, `surface`): "Today's plate", then "Nothing logged yet" (ML/Secondary Medium, `ink`), then "+ Log a meal" (`plus` symbol + ML/Tag, `ink`).
- **`SpendingSummaryCard`** (set `611:40992`, at 2640, 11500):
  - `Size=Compact, State=Populated` (`surface`):
    - "Spending · week" and a chevron.
    - "₹1,240" (ML/Metric, `ink`; text property `Amount`).
    - A 7-bar mini chart from Spending · This week (Mon–Sun 180 / 0 / 320 / 90 / 240 / 410 / 0). Wed (today) is `ink`, the others `ink-secondary`, and zero days are shown at 35%.
  - `Size=Compact, State=Empty`: "This week's spending", then "Nothing logged yet", then "+ Add expense".
- **Lime:** used only in the plate ring, where it stays the sole accent.
- **Tap target:** the whole tile, 171 × 106, in every state (≥ 44).
- **Contrast (token pairs, both modes AA):**

| Pair | Light | Dark |
|---|---|---|
| `ink` on `surface` | 18.9:1 | 16.1:1 |
| `ink-secondary` on `surface` | 6.7:1 | 7.1:1 |
| `on-hero` on `hero-bg` | 18.9:1 | 15.2:1 |
| `on-hero-secondary` on `hero-bg` | 9.2:1 | 6.7:1 |

The rendered spot-checks agree (strongest text ≥ 15.6:1 in Dark).

### 3.6.2 Frames (page 07)

- **Home · After last meal** (`221:62580`): the full-width "Home / Plate summary" was replaced by **"Home / Dashboard"**, a horizontal row, 12 pt gap, holding the two compact **Populated** tiles at **603–709**.
  - Content height stays **898** (the row is 106, the same as the old card).
  - Both tiles are fully visible at rest: they end at 709, 39 pt above the tab bar at 748.
  - End-of-scroll clearance: **20 pt**.
- **Home · After last meal · Trackers empty** (`611:41024`, at 1972, 1140): a copy of the above with both tiles in the **Empty** state. It has the same heights and clearances.
  - It is a new flow starting point, **"Home · Trackers empty"** (page 07 now has 25 starts).
  - The copy keeps Home's other links (tabs, header, passes, follow-up, impact).
- **Product rule:** this state appears when the plate tracker is on but no plate has been saved today, and no expense has been added this week. For example, a first day after turning the tracker on, or a new week before the first expense. The two tiles are independent: each shows Empty from its own data.
- **Not added here** (same list as Stage 3): Home · Morning / Afternoon / During meal, the Home answer states (Answer Yes / No / Not sure · Tap, Sending, Saved, Near meal) and the three Recheck Homes. Page 05 has no cards (Dark renders were temporary).

### 3.6.3 Links

The page-07 link count went from 1162 to **1181** (+19).

| Change | Links |
|---|---|
| Home · After last meal: old Plate summary → H6 removed | −1 |
| Today's plate (Populated) → You · Daily breakdown (H6), drill-in 0.3 | +1 |
| Spending (Populated) → Spending · This week, drill-in 0.3 | +1 |
| New frame: 16 links copied from Home | +16 |
| New frame: Today's plate (Empty) → You · Quick add (H9), Dissolve 0.25 (sheet) | +1 |
| New frame: Spending (Empty) → Add expense (sheet), Dissolve 0.25 | +1 |

Pages 04 and 05 stay at 7.

### 3.6.4 Checks

- **Pixel check (no pixel above 6):** 246 of 247 baseline page-07 frames are unchanged (max 0). Only Home · After last meal changed.
- **Structure:** page 03 gained the two sets (the old `PlateSummaryCard` node now sits inside `TodaysPlateCard`). Pages 04 and 05 are unchanged. Page 07 has one frame changed and one frame added.
- **Screenshots:** `design/audit/stage3_6/` has Home populated and empty, Light and Dark. The Dark renders are temporary clones with Dark variable modes and were deleted.

### 3.6.5 Stage 3.6 follow-ups (2026-09-29)

1. **Spending on Home is opt-in (build item, from gap 78).**
   - `SpendingSummaryCard` on Home is **hidden by default**. It shows only after the student turns on **"Show spending on Home"** in Settings.
   - Spending stays private ("Only you can see this"), and Home can be seen by others over the student's shoulder.
   - **When hidden:** the Today's plate tile takes the full row, so Home uses `TodaysPlateCard` `Size=Full`.
   - **Not built in this stage.** The prototype frames show the opted-in state.
   - **Open design work for the build:** the toggle's place in Settings (Privacy & data or the Spending screen), its copy, and the Home layout when only the plate tile shows.
2. **Rename.**
   - "Home · After last meal · Nothing logged" is now **"Home · After last meal · Trackers empty"** (page 07, `611:41024`). Its flow start "Home · Nothing logged" is now **"Home · Trackers empty"**. The source notes above were updated.
   - This is a **daily / weekly empty state** of the trackers: no plate saved today, and no expense this week. It is **not a first-run screen**.
   - All other Home modules (passes, feedback follow-up, impact, community entry points) are correctly left in.
3. **Scope.** The dashboard cards are **not** extended to other Home states in this stage. Morning, Afternoon, During meal, the Home answer screens and the Recheck Homes stay without cards until a later stage.

## Mess Staff — Stage A (2026-09-29)

A new staff-facing page, **"09 Mess Staff"** (`732:2`), sits between 08 Voice & Patterns and 99 Archive. It is Light only and uses Lab tokens. It has no prototype links yet, and nothing was copied to pages 04, 05 or 07.

### A.1 Rules for staff screens

- These are single-purpose screens. There is **no tab bar**.
- Each screen has a minimal top bar with the mess name, the shift and role, and an **End shift** action. End shift also signs the staff member out of the phone.
- A running count is pinned under the top bar on every screen.
- **The two counts are never merged:**
  - The Entry QR scanner counts entries ("Entries this shift").
  - The Special pass desk counts redemptions ("Special passes redeemed").
- Colour:
  - Lime is still the only accent. It is used for the viewfinder brackets, the "+1" delta pill and the Available tag.
  - Success, warning and urgent result cards use the existing semantic tokens (`success` / `warning` / `urgent` and their `-tint` tokens). No new colours were added.
- Contrast (Light):

  | Pair | Ratio |
  |---|---|
  | `ink` on all tints | 16.4–17.2 |
  | `ink-secondary` on tints | 5.8–6.1 |
  | `on-hero-secondary` on `hero-bg` | 9.2 |
  | `surface` icon on `success` / `warning` / `urgent` circles | 5.5 / 5.4 / 6.5 |

  All pairs pass AA.

### A.2 Local components (on page 09, "Staff components" frame, y −1200)

| Component | Id | Props | Notes |
|---|---|---|---|
| StaffTopBar | `ids.top` | Mess, Shift | 393×56. Left: mess + shift/role. Right: Button Text "End shift". |
| ShiftCounter | `ids.cnt` | Count, Label, Sub, Show delta, Delta | 353×72, `hero-bg`. Metric count; lime "+1" pill when a scan or redemption was just counted. |
| Viewfinder | `ids.vf` | Hint | 353×300, `hero-bg`, lime corner brackets. The live camera fills the black area. |

Ids are stored in plugin data `mealloop/ms_ids`. These components stay on page 09 until staff screens move to page 03, which is an open question.

Reused from page 03:
- StatusBar, HomeIndicator
- Button (Primary / Secondary / Text)
- StatusTag (Scanned, Already scanned, Wrong mess, Offline, Available, Used, Already used, Expired)
- OfflineBanner, Alert, FormField (Focused)
- SpecialPassTile (Available, Used, Not today)
- Symbol set (qrcode, checkmark, clock, xmark, wifi.slash)

### A.3 Frames

**Row 1, Entry QR scanner** (y 0, x = k·493):

| Frame | Id | Shows |
|---|---|---|
| Entry scanner · Ready | `732:26` | Counter 142, viewfinder, "Tap to scan" (qrcode icon). Scans also start on their own. |
| Entry scanner · Success | `732:65` | Counter 143 +1. Green card: Scanned, name, SRM ID, meal + mess, "Entered 12:14 PM · counted once". |
| Entry scanner · Duplicate | `732:109` | Counter 143, "Not counted again". Warning card: Already scanned, first-scan time, where to send disputes. |
| Entry scanner · Invalid | `732:153` | Counter 143, "Not counted". Urgent card: Wrong mess / Not enrolled here, where the student is enrolled. |
| Entry scanner · Offline | `732:197` | OfflineBanner. Counter 144 +1, "1 waiting to sync". Quiet card: "Saved · will sync". Duplicates and wrong-mess codes are checked on sync. |
| Entry scanner · End shift | `732:246` | Alert "End lunch shift?" with the count and the pending sync. |

**Row 2, Special pass desk** (y 1060):

| Frame | Id | Shows |
|---|---|---|
| Pass desk · Verify | `734:171` | Two numbered paths: **1** Scan the pass QR (viewfinder), an "or" divider, then **2** Type the SRM ID (field + Check). |
| Pass desk · Manual entry | `734:225` | FormField Focused "SRM ID" with helper text. "Check ID" and "Scan QR instead". |
| Pass desk · Valid | `734:271` | Green card: Available, name, ID, SpecialPassTile Available. "Redeem pass" and Cancel. |
| Pass desk · Redeemed | `734:328` | Counter 13 +1. Card: Used, redeemed time, "Entry QR count isn't changed by this". |
| Pass desk · Already redeemed | `734:381` | Warning card: Already used, the redeemed time and desk. Don't serve again. |
| Pass desk · Invalid | `734:433` | Urgent card: Expired (other reasons listed: not eligible, wrong mess, no pass). SpecialPassTile Not today. |
| Pass desk · Offline | `734:486` | OfflineBanner. Quiet card: "Can't verify offline". Redemption is blocked offline, and the desk says to try again. |
| Pass desk · Redemption log | `734:533` | Counter 13. "Redeemed this shift" list (time, name, SRM ID, Used), "+ 7 earlier", and a note that entries are never added here. |
| Pass desk · End shift | `734:624` | Alert "End special pass desk?" with 13 redeemed; the staff member is signed out. |

### A.4 Product rules shown (for the build)

- An entry is **counted once per student per meal**. A duplicate scan shows the first scan time and is not counted again.
- An offline **entry** scan is saved on the phone and counted at once. Duplicates and wrong-mess codes are checked on sync.
- An offline **pass redemption** is **blocked**. A pass can be redeemed only once, so it needs a live check. This was chosen to avoid double redemption and is an open question.
- Manual SRM ID entry follows the same pass rules as a QR scan.

### A.5 Checks

- **Diff vs `st37`:** pages 00–08 and 99 are unchanged (page 03 compared by the Stage 3.2 rule). The only new page is 09 Mess Staff.
- **Link counts:** 04 is 7, 05 is 7, 07 is 1181. Page 09 has 0 links.
- **Tokens:** no unbound solid fills or strokes on page 09 outside instances.
- **Screenshots:** in `design/audit/mess_staff_a/`. The temporary captures were deleted.

## Mess Staff — Stage A.1: status colours, identity display, component move (2026-09-29)

The snapshot `st38` (all pages, plus a deep text and geometry snapshot of page 09) was taken before any edit.

**Not a component yet:** there is no `ResultCard` component. The result states on page 09 are auto-layout frames named "Result", one per frame. This stage changed only their colours.

### A1.1 Status colours

Every state now uses tokens from the Waste screen's family: `surface`, `fill-quiet`, `ink`, `ink-secondary`, `chart-hatch-line` and `lime`. No `success`, `warning` or `urgent` token (or their `-tint` versions) is used on page 09 any more. No variables were added.

The card fill is `surface` in every state. Only the icon circle and the tag differ:

| State (entry / pass) | Icon circle | Icon | Tag |
|---|---|---|---|
| Success: Scanned / Available, Redeemed | `lime` (was `success`) | `on-lime` | lime tag, the same style as StatusTag Available |
| Duplicate / Already redeemed | `ink-secondary` (was `warning`) | `surface` | `fill-quiet` + `ink` |
| Invalid / Expired | `ink` (was `urgent`) | `surface` | `fill-quiet` + `ink` |
| Offline (both) | `chart-hatch-line` (was `ink`) | `ink` | `fill-quiet` + `ink` (unchanged) |

- The three entry-scanner StatusTags (Scanned, Already scanned, Wrong mess) keep their words. Their colours are **instance overrides** on page 09. The StatusTag component on page 03 is unchanged, and so are the student screens.
- Contrast:

  | Pair | Ratio |
  |---|---|
  | `surface` icon on `ink-secondary` | 6.7 |
  | `ink` icon on `chart-hatch-line` | 10.0 |
  | `on-lime` on `lime` | 15.0 |
  | `surface` on `ink` | 18.9 |

  All pass AA.
- Card sizes are unchanged (for example Success 353×210 and Already redeemed 353×362).
- The before/after swatches are in `design/audit/mess_staff_a1/`.

### A1.2 Identity display (privacy)

Staff screens show **the first name and the last 4 digits of the SRM ID only**:
- On one line, the format is `Aarav · ...0238`.
- Where the name is the card title (Success, Valid) or a list row (Redemption log), the name is the first name only ("Aarav") and the line under it is `...0238`.

Changed frames:
- Entry scanner: Success, Duplicate, Invalid, Offline.
- Pass desk: Valid, Redeemed, Already redeemed, Invalid, and all 6 rows of the Redemption log.

Text layers that were named after the old full names were renamed to "Identity". The only full ID left is the value the staff member types into the SRM ID field on Pass desk · Manual entry. That is input, not a display.

### A1.3 Components moved to 03 Components

**StaffTopBar**, **ShiftCounter** and **Viewfinder** moved from page 09 to page 03. They sit in the shared-UI column (x 0), below AppWordmark, at y 12030 and x 0 / 433 / 826. The ids are unchanged, and the empty "Staff components" frame on page 09 was removed.

Instance counts on page 09 are the same before and after, and none are detached:

| Component | Instances |
|---|---|
| StaffTopBar | 15 |
| ShiftCounter | 15 |
| Viewfinder | 4 |

### A1.4 Diff vs `st38`

- Pages 00–02, 04–08 and 99 are unchanged.
- Links are unchanged: 7 / 7 / 1181.
- Page 03 has 3 added nodes (the moved components) and nothing else changed.
- Page 09:
  - 9 frames changed: colour and text only. Every frame's direct-child geometry is identical to `st38`.
  - 1 node removed: the empty "Staff components" frame.
- Text changes: 22, all identity strings.

### A1.5 Not done: earlier request

The earlier request (black hero result cards, MS-A/MS-B renames, Moment notes and sample chips, a `ResultCard` component set, count-chip styling) was **not applied**. The later request limited the diff to colour, identity and the component move.

## Mess Staff — Stage A.2: black ResultCard, one-line facts, naming, notes (2026-09-29)

The snapshot `st39` (all pages, plus a deep snapshot of page 09) was taken first.

### A2.1 ResultCard (page 03, `744:84111`)

ResultCard is a component set at page 03, x 0, y 12400, in the shared-UI column under the staff components.

- **Variants:** `State` = Success / Duplicate / Invalid / Offline.
- **Text properties:** `Tag`, `Title`, `Fact`.
- **Card, same in every state:**
  - Fill `hero-bg` (#111111), radius 24, padding 20, gap 8, 353 wide.
  - A 48 pt icon circle and a pill tag on one line.
  - Title: Section style, `on-hero`.
  - Fact: Body style, `on-hero-secondary`.
- **Only the icon circle and the tag change by state:**

| State | Icon circle | Glyph | Tag | Used for |
|---|---|---|---|---|
| Success | `lime` fill | checkmark, `on-lime` | `lime` / `on-lime` | Scanned, Available, Redeemed |
| Duplicate | `ink-secondary` fill | clock, `surface` | `ink-secondary` / `on-hero` | Already scanned, Already redeemed |
| Invalid | `surface` fill | xmark, `ink` | `surface` / `ink` | Not enrolled here, Expired |
| Offline | outline 1.5 `on-hero-secondary` | wifi.slash, `on-hero-secondary` | outline / `on-hero-secondary` | Saved offline, Offline |

**Contrast on black (text):**

| Text | Ratio |
|---|---|
| Title | 18.9 |
| Fact | 9.2 |
| Tag text: Success | 15.0 |
| Tag text: Duplicate | 6.7 |
| Tag text: Invalid | 18.9 |
| Tag text: Offline | 9.2 |

**Glyphs:** 15.0 / 6.7 / 18.9 / 9.2. All pass AA.

**Note:** the Duplicate circle (`ink-secondary`) is only 2.8:1 against the card. The meaning is carried by its white glyph (6.7:1) and the tag text.

**Instances:** all 9 result cards on page 09 are instances (Success 3, Duplicate 2, Invalid 2, Offline 2). They set only `State`, `Tag`, `Title` and `Fact`, and have **no overrides**. The per-frame "Result" frames and their StatusTag colour overrides are gone.

**Pass tile:** on MS-B3, B3b, B4 and B5, the SpecialPassTile now sits **below** the card on the canvas, not inside it, because the card has only the four slots.

### A2.2 One fact line per card

| Frame | Tag | Title | Fact |
|---|---|---|---|
| MS-A2 | Scanned | Aarav · •••0238 | Lunch · 12:14 PM |
| MS-A3 | Already scanned | Aarav · •••0238 | Recorded at 12:14 PM |
| MS-A4 | Not enrolled here | Priya · •••0771 | Enrolled at North Mess · Block C |
| MS-A5 | Saved offline | Rahul · •••0452 | Checks run when it syncs |
| MS-B3 | Available | Aarav · •••0238 | Valid for lunch · Main Mess |
| MS-B3b | Redeemed | Aarav · •••0238 | Redeemed 12:32 PM · just now |
| MS-B4 | Already redeemed | Aarav · •••0238 | Redeemed 12:32 PM · this desk |
| MS-B5 | Expired | Rahul · •••0452 | Pass was for Tue 12–2 PM |
| MS-B6 | Offline | Can’t verify offline | Redeeming needs a connection |

- **Other trims:**
  - MS-A1 tip: "Scans start when a code is in view".
  - MS-A6 alert: "144 entries · 1 still syncing".
  - MS-B2 note: "For when the QR won’t scan".
  - MS-B7 footer: "Special-pass redemptions only".
  - MS-B8 alert: "13 redeemed · you’ll be signed out".
- **No text on page 09 has more than one sentence.** Separators use "·", the file's convention, where the brief wrote "-".
- **Fix:** MS-B8's viewfinder hint said "Point at the student's Entry QR". It now uses the pass-desk hint.

### A2.3 Identity masking

- Every masked ID uses `•••` plus the last 4 digits, for example `Aarav · •••0238`. The Redemption log rows show the first name, with `•••0238` below it.
- **MS-B2 ID fallback** now shows the moment **after Check succeeds**: the field is Filled with `•••0238` and the helper reads "Checked". No full SRM ID is displayed anywhere on page 09.

### A2.4 Counter "+1"

The ShiftCounter delta is now an instance of **CreditsChip** (`State=Points`, the Home points chip), with text "+1" and the star layer hidden.
- **Shape:** `glass-fill` with a `glass-highlight` border, 44 tall, radius 22, Mono Body in `ink`.
- **Position:** right-aligned and vertically centred, as on Home.
- **Contrast:** 13.7 on the counter.
- **Property change:** the old `Delta` text property was removed from ShiftCounter. `Show delta` still toggles the chip.

### A2.5 Naming, notes and layout

- **Sections:** "MS-A · Entry QR scanner" and "MS-B · Special pass desk", in the file's section text style, 100 above each row.
- **Frames:**
  - MS-A1 · Scanning, A2 · Scanned, A3 · Duplicate, A4 · Invalid, A5 · Offline, A6 · End shift confirm.
  - MS-B1 · Scan the pass, B2 · ID fallback, B3 · Valid — available, **B3b · Redeemed** (the extra success state; B-row numbering kept to the list), B4 · Already redeemed, B5 · Invalid / expired, B6 · Offline, B7 · Redemption log, B8 · End shift confirm.
- Each frame now has:
  - a label 36 above it;
  - a Moment note 16 below it ("Moment: Wed 12:13 PM" … "2:05 PM", cloned from the page-04 pattern);
  - a SampleNote "All data is sample" 88 below it.
- The MS-B row moved from y 1060 to **y 1200** to make room for the notes.

### A2.6 Diff vs `st39`

- Pages 00–02, 04–08 and 99 are unchanged.
- Links: 7 / 7 / 1181 (page 09 has 0).
- **Page 03:**
  - +1 node: ResultCard.
  - ShiftCounter changed (the delta chip).
- **Page 09:**
  - 17 nodes changed: 15 frames (cards, copy, names, row-B position) and 2 section titles.
  - +45 nodes: 15 labels, 15 Moment notes and 15 sample chips.

## Mess Staff — Stage A.3: review follow-ups (2026-09-29)

The snapshot `st40` was taken first.

1. **MS-B3b · Redeemed is kept** as a distinct moment: right after redemption, before the next scan.
2. **New frame: MS-B2b · Typing the SRM ID** (placed right after MS-B2).
   - It shows FormField Focused with the full `RA2411003010238` visible. Nothing is confirmed yet, so nothing is masked. The helper reads "15 characters, starts with RA".
   - Its footer is **Check ID** and "Scan QR instead".
   - **MS-B2 · ID fallback** is now purely the after-Check moment. The field shows `•••0238` with the helper "Checked", and the footer is a single **disabled "Checked" button with a checkmark**. The leftover "Check ID" and "Scan QR instead" were removed.
   - Everything to the right of MS-B2 on row B moved +493: MS-B3 to B8 with their labels, Moment notes and sample chips.
3. **ResultCard `State=Duplicate`** now has a 1.5 `on-hero-secondary` ring on the icon circle (inside stroke), the same treatment as the Offline outline. The ring is 9.2:1 against the card, which replaces the 2.8:1 edge.
4. The star stays hidden on the counter's "+1" chip (no rewards signal on staff screens).
5. **The pass tile stays outside ResultCard**, as page composition below the card. **ResultCard stays at exactly 4 slots** (icon, tag, title, fact). Do not add slots for context-specific extras.

**Diff vs `st40`:**
- Only page 09 changed:
  - +4 nodes: MS-B2b and its label, Moment note and sample chip.
  - 28 nodes moved x+493 only.
  - MS-B2 changed its content only (the footer).
- The ResultCard ring is inside the component set, so page 03's top level is unchanged.
- Links: 7 / 7 / 1181.

**Carry forward to Stage B** (kitchen staff and supervisor):
- one fact per line;
- black hero cards with status shown only by icon and tag, reusing ResultCard where a result is shown;
- masked identities;
- the MS-style naming, labels, Moment notes and sample chips from the start.

## Mess Staff — Stage A.4: B2 order and the "Checked" signal (2026-09-29)

The snapshot `st41` was taken first.

1. **Canvas order now matches the real sequence.** **MS-B2b · Typing the SRM ID** sits in the left slot (x 493) and **MS-B2 · ID fallback** (after Check) is on its right (x 986). Their labels, Moment notes and sample chips moved with them. The frame names are unchanged.
2. **MS-B2's footer** is now a small **lime "Checked" tag** instead of the disabled button. It is a copy of the ResultCard Success tag: `lime` fill, `on-lime` Tag-style text, pill radius, padding 4/10. It sits left-aligned in the footer slot. It is a confirmation signal, not a control.

**Diff vs `st41`:**
- Only page 09 changed, 8 nodes:
  - the two frames, their labels, Moment notes and sample chips, which swapped x positions;
  - MS-B2's content (button → tag).
- Links: 7 / 7 / 1181.

## Mess Staff — Stage A.5: one confirmation on MS-B2 (2026-09-29)

- On MS-B2, the lime **"Checked" tag** now sits directly under the masked `•••0238` field. The FormField helper line "Checked" is hidden (`Show Helper` off) and the empty footer was removed. There is one confirmation signal, not two.
- **Diff vs `st42`:** only MS-B2 changed. Links: 7 / 7 / 1181.
- Render: `design/audit/mess_staff_a5/`.

## Mess Staff — Stage C: kitchen staff & supervisor, before service (2026-09-29)

The snapshot `st43` was taken first. The new section, **"MS-C · Kitchen staff & supervisor · before service"**, is on page 09 at y 2300. The frames are at y 2400, x = k·493. It is Light only, with the same labels, Moment notes (Wed 10:30–10:50 AM) and "All data is sample" chips as MS-A/B.

**Existing components used (nothing new on page 03):**
- StatusBar, HomeIndicator, StaffTopBar (Shift "Lunch · 12–2 PM · Kitchen supervisor"), Button.
- ReasonPicker (as the single-select mess option), SegmentedControl (Breakfast / Lunch / Dinner).
- MetaChip Mono light + clock (freshness), BentoTile.
- ResultCard (flags and override results), FormField.
- MealSectionHeader, InfoRow, SpecialPassTile.

| Frame | Id | Content |
|---|---|---|
| MS-C1 · Shift and mess select | `756:558` | There is no top bar yet: "Start your shift" and the role line. Mess: ReasonPicker Selected "Main Mess · Block A" and Default "North Mess · Block C". Shift: SegmentedControl with Lunch selected. Fact: "Lunch service 12–2 PM · prep from 9 AM". Footer: Start shift. |
| MS-C2 · Demand dashboard | `756:596` | Black hero in the TodaysPlateCard ring language. The ring is 88 pt: lime = said yes (356), `on-hero` = not sure (56), a hollow `on-hero-secondary` track = no answer yet. Eyebrow "EXPECTED · LUNCH", Metric "860 students", mono line "412 intents so far · 48%". Freshness chip "Updated 10:42 AM". Bento halves: Said yes 356 / Not sure 56. Bento full: "LAST 4 WEDNESDAYS 812 avg · Expected is 6% higher". Footer: See prep plan. |
| MS-C3 · Prep recommendation | `756:669` | "Prep for 860" and the freshness chip. A surface dish list, each row with a name, **one reason line** and a mono quantity: Rice 95 kg, Sambar 42 L, Chapati 1,700, Curd 60 L, Chicken biryani 30 kg. The **low-confidence flag** is a ResultCard `Duplicate` (grey ring + clock): "Low confidence · Paneer butter masala · 38 kg · New dish · no past weeks to compare". Footer: Adjust a quantity / Menu and special meal. |
| MS-C4 · Override edit | `756:739` | Dish title "Sambar" and "Suggested 42 L · lower than usual". FormField Filled "New quantity 50 L" (helper "Change of +19%"). FormField Focused "Reason (required)". Rule line: "Over 20% needs food head approval first". Footer: Save change / Cancel. |
| MS-C4a · Override saved | `756:780` | ResultCard **Success** (lime check): "In effect now · Sambar · 42 → 50 L · Food head notified · 10:47 AM". Under "KITCHEN SEES", the row reads **50 L** with "Override · staff event after lunch". |
| MS-C4b · Override awaiting approval | `756:820` | ResultCard **Duplicate** (grey ring + clock): "Awaiting approval · Sambar · 42 → 60 L · Cook 42 L until the food head approves". Under "KITCHEN SEES", the row still reads **42 L**, with "60 L waiting for approval". Footer: Back to prep plan / Withdraw request. |
| MS-C5 · Menu and special meal | `756:864` | Read-only. MealSectionHeader "Lunch 12–2 PM · Upcoming". InfoRow list: Rice 95 kg, Sambar 50 L, Paneer butter masala 38 kg, Chapati 1,700, Curd 60 L. "Wednesday special": SpecialPassTile Available (Chicken biryani · Wed 12–2 PM), then InfoRows "Special passes 214" and "Biryani to cook 30 kg". |

**How 4a and 4b differ at a glance:** they differ in three separate ways.
1. Lime check vs grey clock ring.
2. The tag says "In effect now" vs "Awaiting approval".
3. The "Kitchen sees" row shows the **new** quantity vs the **old** quantity.

**Local compositions, not components** (candidates for 03 once approved):
- the demand ring hero;
- the dish row (name + reason + mono quantity);
- the "Kitchen sees" block.

**The 20% threshold is a placeholder** until the approval rule is decided.

**Diff vs `st43`:**
- Only page 09 changed, with +29 nodes, all at y ≥ 2290: 1 section, 7 frames, 7 labels, 7 Moment notes and 7 sample chips.
- No other page changed. Links: 7 / 7 / 1181.
- There are no unbound colours, and the 3 ResultCard instances have 0 overrides.

## Mess Staff — Stage C.1: MS-C5 hierarchy and override traceability (2026-09-29)

The snapshot `st44` was taken first. MS-C5 stays read-only, with no edit controls.

1. **Summary hero** at the top of the dish list. It is a black card in the same family as C2 and C4a/b: eyebrow "LUNCH · TODAY", Metric "5 dishes", and the mono line "1 adjusted today" in **lime**. The line uses `on-hero-secondary` when the count is 0.
2. **Dish rows** use the C3 dish row (name, optional reason, mono quantity) instead of InfoRow. **Sambar** carries the reason "Override · staff event after lunch", the same wording as C4a's "Kitchen sees" row, plus a lime **"Adjusted"** tag next to "50 L". The tag is a copy of the ResultCard Success tag. Dishes that were not adjusted show only their name and quantity.
3. **Wednesday special** is now **one block** in the "Kitchen sees" pattern: the mono eyebrow "WEDNESDAY SPECIAL" over one surface card with two dish rows. "Chicken biryani · Special pass · Wed 12–2 PM · 30 kg" and "Special passes · Redeemed at the pass desk · 214". The separate SpecialPassTile, heading and stats card were removed.

**Diff vs `st44`:** only MS-C5 changed. The deep check confirms the other six MS-C frames are unchanged. Links: 7 / 7 / 1181. The before/after renders are in `design/audit/mess_staff_c1/`.

### Decisions from the Stage C review (recorded here; Figma not yet changed)

- **Approval threshold for an override:** approval triggers on **whichever comes first**, a percentage or a fixed per-unit amount. **Cuts get a tighter limit than increases**, because a shortage (empty plates) is a worse failure than a surplus. The working numbers, subject to the food head's confirmation:

  | Change | Needs approval over |
  |---|---|
  | Increase | +20%, or +10 kg / +10 L / +200 pcs |
  | Cut | −10%, or −5 kg / −5 L / −100 pcs |

- **ResultCard states** will be renamed **Success / Hold / Stop / Offline** (from Success / Duplicate / Invalid / Offline).
- **Kitchen staff** use the same screens as the supervisor, read-only by permission. "Adjust a quantity" and every override entry point are hidden for them. There is no separate frame set and no role split in C1.
- **"Not sure" at half weight** stays the default, but it must be **stated on screen**: C2 gets an info tap in the EstimatePill pattern that explains the weighting.
- **Withdraw request** stays on C4b. A **rejected override (4c)** is not built; it is logged as gap 83.
- **Promote to page 03** (demand ring hero, dish row, "Kitchen sees" block, the Adjusted/Checked tag) happens **after** the Stage C review, once the whole section is approved.

## Mess Staff — Stage C.2: ResultCard rename, C2 weighting info, C4 draft limits (2026-09-29)

The snapshot `st45` was taken first, including a deep snapshot of every page-09 frame.

1. **ResultCard states renamed** on page 03 (`744:84111`): `Duplicate` is now **Hold**, `Invalid` is now **Stop**, and Success and Offline are unchanged. The variant node ids are unchanged, so all **12 instances** on page 09 still resolve:

   | State | Count | Used for |
   |---|---|---|
   | Success | 4 | Scanned, Available, Redeemed, In effect now |
   | Hold | 4 | Already scanned, Already redeemed, Low confidence, Awaiting approval |
   | Stop | 2 | Not enrolled here, Expired |
   | Offline | 2 | Saved offline, Offline |

   Each instance has 0 overrides, none are detached, and the deep check shows no geometry or text change in those 12 frames. The component description was updated. Earlier contract sections that say `Duplicate` / `Invalid` now mean **Hold** / **Stop**.
2. **MS-C2:** an info row under the Said yes / Not sure tiles. It is an **EstimatePill** (On light; the same tap target as H14 "About estimates") plus one line: "Not sure counts as half toward the expected number".
3. **MS-C4:** the placeholder rule was replaced by an "Approval limits" block:
   - eyebrow "NEEDS APPROVAL · WHICHEVER FIRST" with a neutral **"Draft limit"** tag (`fill-quiet` / `ink`);
   - "Increase: over +20% or +10 kg/L, +200 pcs";
   - "Cut: over −10% or −5 kg/L, −100 pcs".

   These are working numbers until the food head confirms them.

**Diff vs `st45`:**
- Page 09: only MS-C2 and MS-C4 changed (top level and deep).
- Page 03: the top level is unchanged. Only the variant names inside the ResultCard set changed.
- Links: 7 / 7 / 1181.
- Renders are in `design/audit/mess_staff_c2/`.

## Mess Staff — Stage C.3: C4 limit wording (2026-09-29)

The snapshot `st46` was taken first, including a node-level snapshot of every page-09 frame.

- The MS-C4 limit lines now read:
  - **"Increase: over 20% or 10 kg/L or 200 pcs"**
  - **"Cut: over 10% or 5 kg/L or 100 pcs"**
- The +/− signs were dropped, because "Increase" and "Cut" already carry the direction, and the minus rendered close to a hyphen in mono. "or" is the only joining word.
- The header "NEEDS APPROVAL · WHICHEVER FIRST" and the "Draft limit" tag are unchanged.
- **Diff vs `st46`:** the node-level diff shows only the two text layers changed, with the same position and size (each 353×18, one line). No other frame or page changed. Links: 7 / 7 / 1181.
- Stage C is now clean. The next step is the full 7-frame read-through, then promoting the shared pieces to page 03.

## Mess Staff — Stage C.4: audit and promotion to page 03 (2026-09-29)

The snapshot `st47` was taken first.

### Part 1: audit of the 7 MS-C frames

| Check | Result |
|---|---|
| One fact per line | Pass on all 7 frames |
| ResultCard states Success / Hold / Stop / Offline only | Pass. C3 is Hold "Low confidence", C4a is Success "In effect now", C4b is Hold "Awaiting approval". No "Duplicate" or "Invalid" text or layer names. |
| Black hero where established | Pass: C2 demand card, C4a/b result cards, C5 summary |
| Masked identity | N/A: no student identity appears in MS-C |
| Terminology | **Failed first, then fixed.** C4a's "Kitchen sees" row had no "Adjusted" tag while C5 had one for the same in-effect override. The tag was added to C4a. |
| Label, Moment note and sample chip | Pass on all 7 frames |

**Wording rule (all frames):**
- The reason line is "Override · <reason>".
- The **"Adjusted"** tag appears only when an override **is in effect** (C4a, C5).
- There is **no tag** while a change is awaiting approval (C4b). Its row keeps the old quantity and reads "<new> waiting for approval".

### Part 2: components promoted to page 03 (shared-UI column, y 12700)

| Component | Id | Properties | Used in |
|---|---|---|---|
| **DemandRingCard** | `764:84405` | Eyebrow, Number, Unit, Line | C2 (1) |
| **DishRow** (set) | `764:84422` | `Divider` = Off / On; Name, Reason, Quantity; Show reason; Show adjusted | C3 (5), C5 (5), plus the rows inside KitchenSeesBlock |
| **KitchenSeesBlock** | `764:84423` | Eyebrow, Show second row. Row 1 and Row 2 are exposed DishRow instances. | C4a, C4b ("KITCHEN SEES"), C5 ("WEDNESDAY SPECIAL", 2 rows) |

- **DemandRingCard:** the ring arcs are sample geometry.
- **DishRow:** 321 wide and FILL in cards, padding 10. The lime "Adjusted" tag is inside it.
- **Not a pure move:** the local frames were replaced by linked instances. C2, C3, C4a, C4b and C5 changed their layers but not their content.
  - C4a/b rows went from padding 12 to 10, to match C3/C5.
  - Instance overrides are only sizing and the exposed row properties, with no style overrides.
- **Diff vs `st47`:**
  - Page 03: +3 components.
  - Page 09: C2, C3, C4a, C4b and C5 changed; C1 and C4 are untouched.
  - No other page changed. Links: 7 / 7 / 1181.
- Render: `design/audit/mess_staff_c4/ms_c_row.png`.

## Mess Staff — Stage C.5: shorter override reason (2026-09-29)

The snapshot `st48` was taken first.

- The Sambar reason **"Override · staff event after lunch"** is now **"Override · staff event"** on the two instances that show it: C4a (KitchenSeesBlock Row 1) and C5 (the Adjusted Sambar DishRow).
- The DishRow `Reason` default on page 03 was updated to the same string, so the sample value matches.
- It now fits on one line (192×18) next to the "Adjusted" tag in both frames. The row height went from 82/83 to 64/65, so the content below moves up by 18.
- **Diff vs `st48`:** node-level, only C4a and C5 changed: the text, plus the resulting row, card and content height and y-shifts. The page-03 top level is unchanged. No other frame or page changed. Links: 7 / 7 / 1181.

## Mess Staff — Stage C decisions (recorded 2026-09-29, no Figma change)

- **"Change of +19%" on C4 keeps its sign.** It is a live computed difference, not a policy limit, so the sign shows direction at a glance. The policy limit lines stay unsigned.
- **Verb split, used in every MS-C and MS-D frame:**
  - **"Adjust"** is the action a person takes (button: "Adjust a quantity").
  - **"Override"** is the record the food head sees (reason lines and history rows: "Override · …").
  - **"Adjusted"** is the lime tag, shown only while a change is in effect.

## Mess Staff — Stage D: kitchen staff & supervisor, after service (2026-09-29)

**Precondition:** C4a and C5 show "Override · staff event" on one line (18 pt) with the Adjusted tag visible. Pass.

The snapshot `st49` was taken first (pages, page-09 frames and the page-03 staff components). The section **"MS-D · Kitchen staff & supervisor · after service"** is at y 3500, and the frames are at y 3600, x = k·493. It is Light only, with a label, Moment note (Wed 12:35–12:55 PM) and sample chip on every frame.

**Reused components:** DemandRingCard, DishRow, KitchenSeesBlock, ResultCard, FormField (Focused / Locked), MetaChip, StaffTopBar and Button. **No new components were added.**

| Frame | Id | Content |
|---|---|---|
| MS-D1 · Waste entry (staff) | `770:868` | DemandRingCard "LUNCH · TODAY · 3 of 5 dishes logged · Plate waste not entered yet". The ring shows 60% (lime arc set per instance; the "not sure" arc is hidden). **DishRow** per dish: the reason line is the read-only "Prepared X · served Y", and the quantity is the typed **unserved** value, or "— unit" when not logged yet. Hint: "Tap a dish to enter what was left unserved". **One** FormField, "Plate waste · whole meal 18 kg". There is no per-dish plate waste. Footer: Save waste log. |
| MS-D1a · Waste entry saved | `770:948` | ResultCard **Success**: "Saved · Lunch waste · Waste logged · 12:40 PM". KitchenSeesBlock "LOGGED": Plate waste · Whole meal · 18 kg; Unserved · All 5 dishes · 10 kg · 9 L · 60 pcs. Footer: Open shift history (goes to D4). |
| MS-D2 · Feedback summary | `770:999` | "Repeated complaints" and "Updated 12:45 PM". DishRows sorted by count: Sambar · Too salty · 6 reports; Rice · Undercooked in the second batch · 4; Paneer butter masala · Too oily · 3; Curd · Sour · 2. Lines: "Grouped by dish · names never shown" and "Tap a dish to log what changed". **No student identity**, not even masked. |
| MS-D3 · Corrective-action log | `770:1057` | KitchenSeesBlock "COMPLAINT": Sambar · Too salty · 6 reports. FormField Focused "What changed (required)". FormField Locked "Approved by · Ravi · •••4417" (filled from sign-in). Footer: Save action / Cancel. |
| MS-D3a · Corrective action saved | `770:1117` | ResultCard **Success**: "Saved · Sambar · salt cut by a third · Logged · approved by Ravi · •••4417". MetaChip (calendar): "Next served Fri lunch · recheck then". |
| MS-D4 · Shift history | `770:1155` | "Shift history" and a "Read-only" chip (lock). Rows, newest first: the ResultCard icon head (Success lime check / Hold grey ring + clock), one action line, and one mono line with time · masked name. Entries: Corrective action · Sambar salt cut; Waste logged · lunch; **Override pending · Curd 60 → 45 L (Hold)**; Override · Sambar 42 → 50 L. No edit controls. |

**Not a component yet:** the D4 history row is a local composition. It is a ResultCard icon head at 32 pt with two text lines. It is flagged as a DishRow/ResultCard gap, a possible `HistoryRow` for page 03 after review.

**Diff vs `st49`:**
- Page 09: +25 nodes, all at y ≥ 3490 (1 section, 6 frames, 6 labels, 6 Moment notes, 6 sample chips). Every existing page-09 frame is unchanged (deep check).
- Page 03: the top level and all 7 staff components are unchanged.
- Links: 7 / 7 / 1181.
- Render: `design/audit/mess_staff_d/ms_d_row.png`.

## Mess Staff — Stage D.1: calculated unserved, D2 chevrons + Safety, D3 label (2026-09-30)

The snapshot `st50` was taken first (pages, plus a visible-layer deep snapshot of every page-09 frame).

**Data-model decision:**
- **Unserved = prepared − served.** It is calculated as soon as served is logged, and never typed.
- **Plate waste** is the only measured value staff enter, as one number for the whole meal. This matches the student Waste screen: measured unserved by dish plus total plate waste per meal, where unserved is the derived number.

1. **MS-D1:**
   - Every DishRow is read-only: the reason is "Prepared X · served Y", and the quantity is the **calculated unserved** in the dish's own unit (Rice 7 kg, Sambar 4 L, Paneer 3 kg, Chapati 60 pcs, Curd 5 L).
   - The new eyebrow reads "UNSERVED BY DISH · CALCULATED". The hint "Tap a dish to enter what was left unserved" was removed.
   - The DemandRingCard now reads "5 of 5 dishes counted · Plate waste not entered yet", with a full ring, because all served counts are in.
   - "Plate waste · whole meal" is unchanged. **Gap 84 is closed.**
2. **MS-D1a:**
   - KitchenSeesBlock "LOGGED" shows only **Plate waste · Whole meal · weighed · 18 kg**.
   - Under "UNSERVED BY DISH · CALCULATED", DishRows show each dish's unserved amount in its own unit. There is no mixed-unit total. **Gap 86 is partly resolved.**
   - The footer "Open shift history" goes to **MS-D4** (there is no D5). Page 09 has no prototype links yet, so this is the button's target by spec.
3. **MS-D2:**
   - Every row has a **chevron** (opens D3), and the hint "Tap a dish to log what changed" was removed.
   - A **Safety** row comes first: "Chicken biryani · Foreign object found · 1 report", with an ink "Safety" tag.
   - The Rice reason was shortened to "Undercooked in batch 2" so it fits on one line beside the chevron.
   - The Safety tag routes to the food-head safety queue (**gap 87**, not built).
4. **MS-D3:** the "From SRM" chip is hidden on the locked **Approved by** field. The masked name "Ravi · •••4417" stands alone, and the helper "Filled from your sign-in" stays as the one source fact.

**Page 03, DishRow:** two booleans were added, both **off by default**:
- **Show chevron** (Symbol chevron.right, `ink-secondary`, 20 pt, at the end of the row);
- **Show safety** (an ink pill with the `surface` text "Safety", before the quantity).

They were needed for item 3 without building a local row.

**Diff vs `st50`:**
- Page 09: only D1, D1a, D2 and D3 changed. The visible-layer deep check confirms every other MS-A/B/C/D frame is unchanged, including D3a, D4 and every other DishRow instance.
- Page 03: the top level is unchanged. Only the DishRow set gained the two hidden, off-by-default layers and properties.
- Links: 7 / 7 / 1181.

## Mess Staff — Stage E: shift home (2026-09-30)

The snapshot `st51` was taken first (pages, page-09 visible deep snapshot, page-03 staff components).

The section **"MS-E · Shift home"** is on page 09 at y 4700, with frames at y 4800. It is a **single landing screen, not a tab bar**. Light only, with a label, Moment note and sample chip on each frame. **No new components**, and no prototype links (page 09 still has 0).

**Layout:**
- **Top bar:** StaffTopBar.
- **Status strip:**
  - MealSectionHeader "Lunch · 12–2 PM" with the existing state pill: **Upcoming**, **Serving now** (the brief's "In service") or **Served** (the brief's "Wrapped up").
  - MetaChip (Mono light, clock) "Now 12:30 PM".
- **Destinations:** five separate white cards (radius 20). Each is one DishRow with the label in Name, **one live fact** in Reason, an empty Quantity and `Show chevron` on. The Feedback card uses `Show safety` when a Safety row exists. Each card's layer name records its target flow.

| Card | Opens | Live fact (MS-E, 12:30 PM, supervisor) |
|---|---|---|
| Demand | MS-C2 | "412 intents so far" |
| Prep & override | MS-C3 | "1 needs approval" (the pending Curd override, a Hold). Otherwise "All dishes on track". |
| Waste entry | MS-D1 | "Not started yet". After logging: "5 of 5 dishes counted". |
| Feedback | MS-D2 | "1 safety report" plus the Safety tag. The safety count takes priority over the plain count. |
| Shift history | MS-D4 | "11:05 AM · Override pending · Curd" (the latest action) |

| Frame | Id | State |
|---|---|---|
| MS-E · Shift home | `775:84867` | Supervisor, Serving now, the live facts above |
| MS-E-empty · Before shift starts | `775:84959` | **Kitchen staff**, Upcoming, "Now 11:40 AM". Every card is dimmed (card opacity 0.45), has no chevron and reads **"Starts at 12:00 PM"**. |

**Role scoping** (same permission logic as MS-C; no duplicated frames):
- For kitchen staff, the Prep card is labelled **"Prep plan"** and opens C3 read-only, with "Adjust a quantity" and every override entry point hidden.
- Supervisors see **"Prep & override"**.
- The empty frame shows the kitchen-staff label.

**Flow intent (not wired):**
- MS-A/B sign-in and C1 shift select land on MS-E.
- "End shift" returns to MS-E before confirming.

**Flagged:** DishRow has no Disabled state, so the pre-shift dimming is card opacity. That would be a DishRow `State=Disabled` variant if approved.

**Diff vs `st51`:**
- Page 09: +9 nodes (1 section, 2 frames, 2 labels, 2 Moment notes, 2 sample chips). Every existing page-09 frame is unchanged (visible deep check).
- Page 03: all 7 staff components are unchanged.
- Links: 7 / 7 / 1181.
- Render: `design/audit/mess_staff_e/ms_e_shift_home.png`.

## Mess Staff — Stage E.1: review decisions and chip removal (2026-09-30)

The snapshot `st52` was taken first.

**Decisions (final, do not re-ask):**
1. **Kitchen staff and supervisor share one layout, gated by permission.** Supervisor-only information goes inside an existing card's fact line (for example "1 waiting for food head"), never in a new card. This is the same principle as MS-C and the D2 Safety tag.
2. **Destination cards stay white.** This mirrors student Home: one black hero, then white cards. There is no new black card component. A lime accent on Demand's fact was offered as optional polish and **not built**.
3. **The "Now hh:mm" chip was removed** from both MS-E frames, because the status bar already shows the time. The status strip is now just MealSectionHeader: meal, window and state tag.
4. **"End shift" goes straight to the confirm dialog**, as MS-A6 and MS-B8 do. There is no pre-check screen, because MS-E's cards already show pending and unsynced state.
5. **Gap 88** (DishRow has no disabled look) stays logged. The opacity fade is an acceptable placeholder.

**Diff vs `st52`:**
- Only MS-E · Shift home and MS-E-empty · Before shift starts changed: the "Current time" chip was removed, and the cards moved up 38.
- The visible deep check confirms every other page-09 frame is unchanged. No other page changed.
- Links: 7 / 7 / 1181.
- Render: `design/audit/mess_staff_e1/`.

**Mess staff track A–E is complete.**

## Roadmap after mess staff (decided 2026-09-30)

Student-side leftovers come first, then Admin, then stitching all three tracks into one prototype. Admin moves first only if the next review is framed around the multi-role app.

1. Waste scroll fix
2. Attendance redesign
3. Link cleanup: the 8 unclassified links in §3.5.3 (4 settings → lock previews, 3 dinner Meal detail → answer (gap 77), 1 "Me too" defect (gap 76))
4. Overflowing frames (gap 52 family; recount at the start of this step)
5. Stage 4 end-to-end verification
6. Cosmetic cleanup

**Why links come before overflow:** the link cleanup and the overflow fixes touch the same frames' scroll and layout structure. Wiring first gives a clean baseline for the layout work, which avoids the Stage 1.9–1.11 tangle.

## Student 1: Waste scroll fix (2026-09-30)

The snapshot `st53` was taken first (all pages, plus every page's reaction list).

**Scope:** the 8 Waste frames on **page 07**: Last week, Dish breakdown, Pending, Partial, Corrected, Not comparable, No baseline, Unavailable.
- Pages 04 and 05 already have "(full scroll)" copies and were not touched.
- **Waste · How this is measured** is a sheet background (the sheet pattern). It stays in gap 52.

**Treatment:** the same as the Spending family after Stage 1.11, which is the R9 inline-title pattern with R9c.
- **Layer order (bottom → top):** Meal wash, Waste / Content, **Header backdrop** (HeaderBackdrop, 0–102), **Top edge fade** (ScrollEdgeFade / Style=Status, rotated), Nav Header, Status Bar, Scroll edge fade, Tab Bar, Home Indicator, [Gallery · Back / Next].
- The new layers were cloned from Spending · This week.
- `overflowDirection = VERTICAL`.
- **Fixed children:** 7, or 9 on the gallery-state frames (plus the two hotspots).
- **What scrolls:** the Meal wash and the content, including the Last meal / Last week / Last month switch.

| Frame | Scroll range | Last item at max scroll | Clearance above tab bar |
|---|---|---|---|
| Last week | 125 | 728 | 20 pt (R9b) |
| Dish breakdown | 93 | 728 | 20 pt |
| Partial | 182 | 728 | 20 pt |
| Corrected | 203 | 728 | 20 pt |
| Not comparable | 159 | 728 | 20 pt |
| No baseline | 138 | 728 | 20 pt |
| Pending | 0 (fits) | 368 | – |
| Unavailable | 0 (fits) | 230 | – |

Pending and Unavailable got the same structure so the whole family behaves alike, as Spending did with Loading, Empty and Error.

**Checks:**
- **Invisible at rest (R9c):** a pixel diff of all 8 frames against the before render shows a **max difference of 2, and 0 pixels above 6**.
- **Max scroll:** rendered by shifting the scrolling layers by each frame's range. The content passes under the fixed header backdrop with a hard edge, and the last card ends 20 pt above the tab bar.
- **Links:** the page-07 reaction list is **identical** to `st53` (1183 actions, 1181 reactions). Pages 04 and 05 still have 7.
- **Structure:** only the 8 Waste frames changed on page 07 (288 nodes, as before). No other page changed.

**Logs:**
- **Gap 52 was updated:** Waste is removed, and **13** overflowing frames remain for the overflow step.
- **Gap 89 was logged:** a pre-existing clipped legend on Waste · Partial, left for cosmetic cleanup.

**Renders** (`design/audit/student_waste_scroll/`): `at_rest_before.png`, `at_rest_after.png`, `max_scroll_after.png`.

## Student 2: Attendance redesign (2026-09-30)

The snapshot `st54` was taken first. The inventory is in `design/audit/student_attendance/inventory.md`.

**Decisions:**
- **One screen:** the two screens are merged, so there is one data source.
- **Retired frames are archived,** not deleted.
- **The report flow is a sheet.**
- **"Possible" means every meal that existed in the period.** Leave days are not excluded; the student adds that context with "Something's wrong?".
- **"Request sent" uses the ResultCard `Hold` state.** The staff status vocabulary transfers to the student side unchanged (Light and Dark).

### What changed (pages 04, 05, 07; built the same way on each)

**Entry history** (the You · ATTENDANCE tile opens it) is now the single Attendance screen. From top to bottom:

1. **SegmentedControl:** This week / This month, with This month selected. It scrolls with the content, as agreed for Waste.
2. **Black ring card:**
   - The ring (96 pt) shows attended out of possible.
   - Segments: Breakfast `lime`, Lunch `on-hero`, Dinner `on-hero-secondary`. Missed meals are the hollow track.
   - Text: "AUGUST SO FAR · **36** of 41 meals".
   - Per-meal legend, one fact per line: Breakfast 10 of 14 · Lunch 14 of 14 · Dinner 12 of 13.
3. **Weeks, newest first:**
   - Groups: THIS WEEK · 12–14 AUG, LAST WEEK · 5–11 AUG, and 1–4 AUG.
   - Each day is a **DishRow**: the date, then "n of 3" (or "n of 2" for today), then a chevron.
   - A day with a miss shows a reason line ("Breakfast not scanned").
   - **Every row opens the report sheet**, so "report a problem" is inline on the row and there are no dead chevrons.
4. **Scroll:** it uses the R9 + R9c inline pattern (HeaderBackdrop, Status fade, fixed nav, status bar, fades, tab bar and indicator). The range is 471, and the last item ends 20 pt above the tab bar.
5. **Removed:** the floating "Report a problem" button and the HeroNumber drill-in.

**Sample data** (Wed 14 Aug, 2:00 PM, 41 meals possible so far):
- Breakfast was missed on 14, 10, 8 and 3 Aug.
- Dinner was missed on 13 Aug.
- The **You · ATTENDANCE tile now reads 36** everywhere it appears: 8 tiles each on 04 and 05, and 6 on 07.

**Entry · Under review** is now a state of the same screen:
- **ResultCard `Hold`** at the top: "Request sent · Dinner · Tue 13 Aug · Sent Wed 14 Aug · awaiting review".
- The Tue 13 row reads "Dinner · request sent".
- The duplicate "Request sent" toast was removed.
- The tab bar now highlights **You** (it was Home).
- Back still goes to Entry history.

**Entry · Discrepancy / — sending / — failed** are now **sheets**:
- Structure: the Attendance screen as background (links stripped), Scrim, **GlassSheet `Detent=Large`** titled "Something's wrong?" with Close, and the original content: meal and record tiles, the three reasons, the optional note, and the error on the failed state.
- Send request / Sending… stays at the sheet's foot.
- The frame's own nav, tab bar and Back were removed.

**Entry · History (E7)** was moved to **99 Archive** on all three pages ("Retired 0x · Entry · History"; the label on 04 and 05 too). On the archived 07 copy, its 6 links were removed so the archive stays inert (Archive: 0 links).

### Links on page 07: 1181 → 1192 (+11)

| Change | Links |
|---|---|
| Day rows on Entry history and Under review → Entry · Discrepancy (sheet), Dissolve 0.25 | +28 |
| Sheet Close → Back (3 sheets) | +3 |
| Removed: Entry history · HeroNumber → E7, and the "Report a problem" button → Discrepancy | −2 |
| Removed: the Back, 4 tabs and Search on E7 (archived) | −6 |
| Removed: the Back, 4 tabs and Search on Discrepancy and Discrepancy — sending (they are sheets now) | −12 |

Pages 04 and 05 stay at 7.

### Checks

- **Diff vs `st54`:**
  - Pages 04 and 05: 13 frames changed. These are the 5 attendance frames plus the 8 frames that show the ATTENDANCE tile (You, You · Offline, the two full-scroll copies, Sign out, Request correction, Correction · Sent / Failed). The E7 frame and its label moved to Archive.
  - Page 07: 11 frames changed, and E7 was archived.
  - No other page changed.
- **Renders** (`design/audit/student_attendance/`): `p07_attendance_states.png` (Attendance at rest and at max scroll, Request sent, and the three sheet states), `p05_dark.png`, `ring_card.png`.
- **New gaps:** 90 (every row opens the same sample sheet), 91 (no "(full scroll)" copies on 04 and 05), 92 (pre-existing: no link from Sending to Request sent).

## Student 2.1: Attendance density (2026-09-30)

The snapshot `st55` was taken first.

1. **Hero card:** the three-line meal legend was removed from inside the black card. The card now holds only the ring and "AUGUST SO FAR · 36 of 41 meals". Its height is still 136, because the 96 pt ring sets it.
   - A **"Meal stats" row** sits under the card, in the content flow. It holds three label + value pairs side by side, each with a ring-coloured swatch: Breakfast 10/14 · Lunch 14/14 · Dinner 12/13. The Lunch swatch is `on-hero` with a `border` edge so it shows on canvas.
   - The row is **18 pt tall**, against about 58 pt for the old three lines (roughly a third).
2. **Day rows are one line in every state**, via a new **DishRow `Layout=Inline`** variant on page 03:
   - The name is followed by the reason on the same line, in Footnote / `ink-secondary`, truncating with an ellipsis if needed. The existing variants are now `Layout=Stacked` and are unchanged.
   - The spacing is 4, so the longest row ("Wed 14 Aug · 1 of 2 · Breakfast not scanned") fits without truncating. No row on 04, 05 or 07 truncates.
   - Rows read "Mon 12 Aug · 3 of 3" and "Wed 14 Aug · 1 of 2 · Breakfast not scanned". Under review: "Tue 13 Aug · 2 of 3 · Dinner · request sent". Every row is **44 pt** (a stacked row with a reason was 64).
   - The Name layer's width override (carried over from the stacked layout) was reset on each row so the date doesn't wrap.
3. The **sheet backgrounds** (Discrepancy, sending, failed) were re-cloned from the updated screen, so the screen behind the sheet matches.

**Result:**

| Frame | Content height before | After | Scroll range | Last item at max scroll |
|---|---|---|---|---|
| Entry history | 1323 | **1231** | 379 | 728 (20 pt above the tab bar) |
| Under review | 1491 | **1399** | 547 | 728 (20 pt above the tab bar) |

**Diff vs `st55`:**
- Pages 04, 05 and 07: only the 5 attendance frames on each page changed.
- Page 03: only DishRow changed (Inline variants added).
- **Link lists are identical on every page**, because the day rows kept their reactions through the variant swap. Links: 7 / 7 / 1192.

**Renders:** `student_attendance/density_before_after.png` (full-scroll, page 07, Entry history and Under review).

## Decisions (2026-09-30)

- **The Attendance ring stays at 96 pt.** It is not shrunk, for consistency with other rings, and to avoid another round of diffs.
- **Student track paused before Admin.** Paused: link cleanup (the 8 unclassified links + gap 92), the 13 overflow frames, Stage 4 verification and cosmetic cleanup. None are broken, just unfinished polish; resume from the roadmap above.
- **Admin plan:**

  | Stage | Covers |
  |---|---|
  | AD-1 | Shell and Today overview |
  | AD-2 | Today, remainder |
  | AD-3 | Issues |
  | AD-4 | Insights |
  | AD-5 | Manage: menu, nutrition and voting |
  | AD-6 | Manage: passes, rewards and surplus |
  | AD-7 | Manage: people, permissions and audit log |

  After all of Admin exists, a connection stage stitches student, mess staff and admin together behind a role-select entry.

## Admin AD-1: shell and Today overview (2026-09-30)

The snapshot `st56` was taken first (all pages, reaction lists, and a visible-layer deep snapshot of page 09).

### Page 03

- **DishRow → `ListRow`** (`764:84422`). Instance counts are the same before and after: 09 = 41, 04 / 05 / 07 = 70 each, 03 = 2. There are no broken or detached instances.
  - Instances that kept their default layer name now read "ListRow". That is the only change on page 09: the visible-layer deep check lists 7 frames whose only difference is that layer name. Geometry and text are unchanged, and the MS-C3 and MS-D1 renders match.
- **AdminTabBar** (`808:86775`) is a set with `Selected` = Today / Issues / Insights / Manage.
  - It was cloned from the student TabBar (Expanded), so it has the same glass pill and search button.
  - Tab icons: Today = calendar, Issues = exclamationmark.bubble, Insights = chart.bar, Manage = gearshape.
- **New: `StatusPill`** (`808:86801`), with `State` = Success / Hold / Stop / Offline and a text `Label`. This is the ResultCard vocabulary for **light surfaces**:

  | State | Fill | Text |
  |---|---|---|
  | Success | lime | on-lime |
  | Hold | ink-secondary | surface |
  | Stop | ink | surface |
  | Offline | outline, ink-secondary | ink-secondary |

  It was **needed** because ListRow had no status slot (flagged; this also covers gap 85's need).
- **ListRow** gained **`Show status`** (off by default), an exposed StatusPill before the quantity. Existing uses are unchanged.

### Page "10 Admin" (new, Light only)

The page sits before 99 Archive. Section "AD-1 · Shell & Today overview". The frames are at y 0, with labels, Moment notes (Wed 1:40 / 1:41 PM) and sample chips.

| Frame | Id | Content |
|---|---|---|
| AD-1a · Today — Overview | `ids.admin.a` | NavHeader Large Title "Today" / "Wed 14 Aug · Lunch". Filters: MetaChip Tappable "All messes · Lunch · Wed 14 Aug · All years". DemandRingCard "ALL MESSES · LUNCH · **2,418** served · 2,960 expected · 1:40 PM" (ring 82%). Messes as ListRows with status and chevron: Main Mess · Block A · 712 of 860 · **Stop "Safety report"** · 83%; North · Block C · 640 of 700 · **Hold "Shortage risk"** · 91%; South · Block B · 520 of 800 · **Success "On track"** · 65%; Annexe · Last sync 12:10 PM · **Offline "Not reporting"** · 91%. AdminTabBar Today. The large title scrolls with the content; it fits, with the last item at 655. |
| AD-1b · Today — Mess detail | `ids.admin.b` | Inline "Main Mess" with Back (R9 + R9c inline scroll, range 75). DemandRingCard "MAIN MESS · LUNCH · **712** served · 860 expected". **ResultCard Hold "Awaiting approval · Curd · 60 → 45 L · Food head decides · kitchen cooks 60 L"**, the admin view of the MS-C approval queue. "PREP · LUNCH" rows: Rice 95 kg; Sambar · Override · staff event · Adjusted · 50 L; Paneer butter masala · Hold "Low data" · 38 kg; Chapati 1,700; Curd · Cut to 45 L · Hold "Awaiting approval" · 60 L; Chicken biryani · 214 special passes · Stop "Safety report" · 30 kg. **Read-only: no override or adjust entry point.** |

**Data** matches MS-C and MS-D: Sambar 50 L adjusted, the pending Curd cut, the Paneer low-confidence flag, and the biryani safety report. The cross-mess totals are sums of the four messes.

**Links (page 10):**
- Main Mess row → AD-1b (Move in, left, 0.3).
- AD-1b Back → BACK.
- Flow start: "Admin · Today".
- The other mess rows and the 3 non-Today tabs are unlinked (samples only).

### Diff vs `st56`

- Page 03: ListRow changed, and AdminTabBar and StatusPill were added.
- Page 09: layer names only (see above).
- Page 10 is new.
- Pages 04, 05 and 07 are unchanged. Links: 7 / 7 / 1192.
- Renders: `design/audit/admin_ad1/`.
