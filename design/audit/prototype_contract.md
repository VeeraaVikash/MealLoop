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

## Admin AD-1.1: reference-pattern treatments (2026-09-30)

The snapshot `st57` was taken first. Only the visual treatment changed; the content, numbers and statuses stay as in AD-1.

1. **AD-1a hero is a live dial, not a closed ring.**
   - It is a local composition, "Live dial": a black card with the eyebrow "ALL MESSES · LUNCH · LIVE".
   - The gauge is a **240° sweep** from 150° to 390°, with the gap at the bottom:
     - a hollow `on-hero-secondary` track (expected);
     - a `lime` fill to the current position (2,418 / 2,960 = 82%);
     - a **lime needle** from an `on-hero` hub at that angle;
     - end labels "0" and "2,960";
     - the Metric "2,418" and "served" under the hub.
   - Line: "4 messes · updated 1:40 PM".
   - **Rule:** a dial means *live, in motion*. Closed composition rings stay for completed periods (Attendance, Waste, Today's plate).
2. **AD-1a messes are a badge strip.** The ListRow + StatusPill list became one white card with **four `MessBadge`s** in a row:
   - Main 83% (Stop ✕), North 91% (Hold clock), South 65% (Success ✓), Annexe 91% (Offline wifi-slash).
   - **New component `MessBadge`** (page 03, `ids.messBadge`), with `State` = Success / Hold / Stop / Offline, `Name` and `Percent`. It is a 64 pt ring: `ink` served arc (`ink-secondary` when Offline) on a `border` track, the percent inside, the name below, and a 22 pt status glyph at the top-right. The served arc is set per use.
   - The Main badge links to AD-1b (Move in, 0.3).
3. **AD-1b prep is a swipeable card sequence.** The vertical list became **"Prep cards (swipe)"**:
   - A 353 pt clip frame with `overflowDirection = HORIZONTAL` holds a row of six **`PrepCard`**s (272 wide, 12 apart, equal height 172), so the second card peeks.
   - Order, status first: Chicken biryani (Stop "Safety report"), Curd (Hold "Awaiting approval"), Paneer butter masala (Hold "Low data"), Sambar (Success "Adjusted"), Rice (Success "On plan"), Chapati (Success "On plan").
   - Page dots follow the cards.
   - **New component `PrepCard`** (page 03, `ids.prepCard`): an exposed StatusPill, then the name (Section), the quantity (Metric mono) and one fact line.
   - The Curd approval card (ResultCard Hold) and the mess ring stay as they were. **Still read-only.**

**Diff vs `st57`:**
- Page 03: +2 components (MessBadge, PrepCard).
- Page 10: only AD-1a and AD-1b changed. The link is now on the Main badge instead of the Main row, and Back is unchanged.
- No other page changed. Links: 7 / 7 / 1192.
- Renders: `admin_ad1/ad1_v2_frames.png`, `admin_ad1/ad1b_card_sequence.png`.

**Decisions:**
- AD-1b stays read-only. Approval oversight, if ever needed, goes into AD-3 Issues as an escalation queue.
- Other mess badges stay unlinked (samples), and no second mess-detail screen is built.

## Admin AD-1.2: LiveDial component (2026-09-30)

The snapshot `st58` was taken first.

1. **`LiveDial`** (page 03, `ids.liveDial`) was promoted from the AD-1a dial.
   - **Text properties:** `Eyebrow`, `Number`, `Unit`, `Max`, `Line`.
   - **Parts:** a 240° sweep with the gap at the bottom; a hollow `on-hero-secondary` track; a `lime` "Served so far" arc; a lime **needle**; an `on-hero` hub; the number and unit centred in an auto-layout "Readout"; and "0" and Max centred at the arc ends.
   - The needle is a **thin wedge arc** (±1.2°) rather than a rotated line. Instances cannot override rotation, but they can override `arcData`.
   - **Per use:** angle a = 150° + share × 240°. Set the "Served so far" arc end to a, and the "Needle" arc to a ± 1.2°.
2. **AD-1a** now uses a LiveDial instance with the same numbers (2,418 served, 2,960 max, 82%).
3. **AD-1b:** the closed DemandRingCard became a LiveDial: "MAIN MESS · LUNCH · LIVE · **712** served · max 860 · Serving now · updated 1:40 PM" (83%).
   - The card is 134 pt taller (262 vs 128), so the content below moved down. The frame now scrolls 42 pt, and the last item ends 20 pt above the tab bar at max scroll.
   - Both frames now share the identical dial treatment.

**Diff vs `st58`:**
- Page 03: +LiveDial.
- Page 10: only AD-1a and AD-1b changed, and the page-10 link list is identical.
- No other page changed. Links: 7 / 7 / 1192.
- Render: `admin_ad1/ad1_livedial_shared.png`.

## Admin AD-2: Today — crowd and shortages (2026-09-30)

The snapshot `st59` was taken first.

The section **"AD-2 · Today — Crowd & shortages"** is on page 10 at y 1100, with frames at y 1200. It is Light only, with labels, Moment notes (Wed 1:42 / 1:43 / 1:45 PM) and sample chips.

**Crowd vocabulary decision:**
- Crowd uses the **existing student crowd vocabulary**: **Quiet / Getting busy / Packed**, plus **Stale ("Old data · hh:mm") / Unavailable / Closed**. It comes from CrowdDial, CrowdRow and CrowdLegend, the same words students already see.
- It does **not** reuse Success / Hold / Stop. That would drift their meaning.
- It does **not** introduce a new Quiet / Busy / Packed set either. That would fork the words students already see.
- As on the student side, no wait minutes are shown, and every reading carries its freshness.

**New component (flagged): `CrowdBadge`** (page 03, `ids.crowdBadge`):
- An exposed **CrowdDial Compact** (the student tick dial), with the `Name`, `Level` and `Updated` texts.
- It is the crowd counterpart of MessBadge: MessBadge carries Success/Hold/Stop glyphs, which must not stand for crowd levels.

| Frame | Content |
|---|---|
| **AD-2a · Crowd — All messes** | Inline "Crowd". **LiveDial** "NORTH MESS · BUSIEST NOW · **410** inside · max 480 seats · Packed · updated 2 min ago" (85%). "MESSES · CROWD NOW" strip of 4 CrowdBadges: Main *Getting busy · 3 min ago*; North *Packed · 2 min ago*; South *Quiet · 1 min ago*; Annexe *Old data · 12:10 PM* (Stale dial, no ticks). The North badge links to AD-2b. |
| **AD-2b · Crowd — Mess detail** | Inline "North Mess" with Back. LiveDial "NORTH MESS · CROWD · LIVE · 410 inside / 480 seats". CrowdLegend (On light, **Packed**). One trend fact: "Busier than last Wednesday at 1:40 PM". Freshness chip: "Updated 2 min ago via Entry QR". Read-only. |
| **AD-2c · Shortage alerts** | Inline "Shortages". "AT RISK · LUNCH · 4 DISHES", then ListRows with status: Rice · North Mess · 60 still due · **Stop "Running out"** · 12 kg; Curd · North Mess · 15% below forecast · **Hold "At risk"** · 38 L; Chapati · South Mess · 8% below forecast · **Hold "At risk"** · 140; Paneer butter masala · Main Mess · new dish · **Hold "Low data"** · 38 kg (the MS-C low-confidence flag). Read-only, with no actions. |

**Links (page 10):**
- North badge → AD-2b (Move in, 0.3).
- AD-2b Back → BACK.
- The Back buttons on AD-2a and AD-2c are **unlinked**. There is no entry point from AD-1a yet, and adding one would change AD-1a.

**Diff vs `st59`:**
- Page 03: +CrowdBadge.
- Page 10: +13 nodes (1 section, 3 frames, 3 labels, 3 Moment notes, 3 sample chips) and +2 links. AD-1 is unchanged.
- No other page changed. Links: 7 / 7 / 1192.
- Render: `admin_ad2/ad2_section.png`.

## Admin AD-2.1 · Today entry rows

The snapshot `st60` was taken first.

**AD-1a · Today — Overview:** two entry cards now sit under the MessBadge strip. Each reuses the MS-E destination-card pattern: a white card (radius 20) holding a ListRow (Stacked, Divider Off) with a reason line and a chevron. No new row style was added.

| Row | Fact line | Links to |
|---|---|---|
| **Crowd** | Busiest: North Mess · Packed | AD-2a · Crowd — All messes (Move in, 0.3) |
| **Shortages** | 4 at risk · 1 running out | AD-2c · Shortage alerts (Move in, 0.3) |

- AD-1a now scrolls 88 pt. At max scroll the Shortages card ends at y 728, which keeps the 20 pt clearance above the tab bar.
- **The Back buttons on AD-2a and AD-2c now go to BACK.** This closes the unlinked Backs noted in AD-2, because both frames now have an entry point.

**Decisions:**
- **Stop is kept as-is** for both the mess status (Main Mess) and the shortage rows (Rice "Running out"). Both mean "act now". The urgency is the same, so the meaning has not drifted.
- **Open decision: the capacity number needs an owner.** Is it fixed seating, or an estimated safe occupancy? It is used in AD-2a and AD-2b ("max 480 seats"). There is no Figma change until an owner decides.

**Diff vs `st60`:**
- Page 10: only AD-1a changed. There are +4 links (2 rows, plus the 2 Backs on AD-2a and AD-2c), taking page 10 from 4 to 8 reactions.
- No other page changed. Links: 7 / 7 / 1192.
- Render: `admin_ad2/ad2_1_ad1a_entry_rows.png` (at rest, and at max scroll).

## Admin AD-2.2 · Badge rule, AD-1a status fade, Shortages wording

The snapshot `st61` was taken first.

**Rule MB1: MessBadge shows the worst open issue.** A mess's badge reflects the single most severe open issue affecting it, whatever its category. Safety reports, pending approvals and shortage risks all count on the same scale.
- Order: **Stop > Hold > Success**. **Offline** is its own case: it means missing data, not a severity level.
- **Offline** shows only when a mess is not reporting and no Stop or Hold issue is known for it. *Interpretation, to confirm: a known Stop or Hold still outranks Offline.*
- **Crowd is not an issue.** Crowd levels (Quiet / Getting busy / Packed) never set the badge (see AD-2).

**Re-check of every mess against the sample data:**

| Mess | Open issues in the sample data | Should be | Was | Now |
|---|---|---|---|---|
| Main | Safety report, chicken biryani (Stop, AD-1b); Curd awaiting approval (Hold); Paneer low data (Hold) | Stop | Stop | Stop |
| North | Rice running out (Stop, AD-2c); Curd at risk (Hold, AD-2c) | Stop | Hold | **Stop** |
| South | Chapati at risk (Hold, AD-2c) | Hold | Success | **Hold** |
| Annexe | Not reporting; no known issues | Offline | Offline | Offline |

South was a second mismatch, found by the re-check.

**AD-1a fixes:**
- **Status fade added.** `ScrollEdgeFade / Style=Status` is cloned from Meals · Menu and placed at the same position. Layer order is now Meal wash, Content, Nav Header, **Top edge fade**, Status Bar, Scroll edge fade, Tab Bar, Home Indicator. Fixed children go from 4 to **5**, matching You and Meals · Menu. The large title now scrolls under the fade (R9c) and no longer collides with the status-bar time. This closes gap 93.
- **Shortages line** now reads "4 dishes · 1 running out" (was "4 at risk · 1 running out"). This closes gap 95.

**Diff vs `st61`:**
- Page 10: only AD-1a changed (the fade layer, the 2 badge states, the Shortages line). There are no link changes; page 10 has 8 reactions.
- No other page changed. Links: 7 / 7 / 1192.
- Renders:
  - `admin_ad2/ad2_2_ad1a_rest_mid_max.png` (at rest, 66 pt, and max scroll at 88 pt)
  - `admin_ad2/ad2_2_badge_strip.png`

## Status fade investigation (report only, no Figma change)

The snapshot `st62` was taken first. The diff vs `st62` after cleanup shows no change on any page.

**Symptom:** at full scroll, the `ScrollEdgeFade / Style=Status` band (y 0–42) shows as a pale lime strip.

**Cause:**
- The fade itself is correct. What sits behind it moves.
- The **Meal wash** (`MealWash`, `#E9F7B0` → clear over 300 pt) is a *scrolling* layer (R9: "the Meal wash scrolls"). The fade is a *fixed*, opaque band tinted to the wash's top colour.
- After a scroll of s pt, the wash behind the band is the paler colour it has at y s, or bare canvas once s passes 300. So the band no longer matches.

**Scope:** 90 frames use the Status fade (04: 5, 05: 5, 07: 75, 10: 5). All use the same MealWash; no frame uses the fade without the wash. Page 09 has none.

**Options tested** on temporary copies of Meals · Menu (range 126) and AD-1a (range 88). The step is the largest RGB channel difference between the band (y 36) and the background just below it (y 46), measured in the frame margin:

| Option | Meals · Menu, rest / max | AD-1a, rest / max | Verdict |
|---|---|---|---|
| Current (lime fade, scrolling wash) | 2 / **26** | 2 / **20** | Invisible at rest, band at scroll |
| Neutral scrim (canvas `#EDEDE8`, opaque) | **48** / 24 | **48** / 30 | Grey band at rest, and still a band at scroll |
| **Fixed wash** (wash moved to the frame's own fill; fade unchanged) | 2 / 2 | 2 / 2 | **Invisible at both** |

- A semi-transparent or blurred scrim was rejected on paper. The fade has to stay opaque behind the status text to keep the 16.5:1 contrast, because black cards scroll under it.
- Render: `status_fade/fade_options_comparison.png`. Columns, left to right: current rest, current max, scrim rest, scrim max, fixed-wash rest, fixed-wash max. Rows: Meals · Menu, AD-1a.

**Proposed fix (awaiting approval):**
- **The wash stops scrolling.** This reverses the R9 note "the Meal wash scrolls".
- On each of the 90 frames, remove the `Meal wash` instance and add a gradient fill to the frame itself, over the canvas fill. The frame background stays still while content scrolls.
- The gradient stops bind to two new colour tokens:
  - `wash/top`: Light `#E9F7B0`, Dark `#2A3312`
  - `wash/clear`: the same colours at alpha 0

  This keeps page 05 (Dark mode) correct. Binding a colour variable to a gradient stop was tested and works.
- The fade component (`486:2`) is **not** changed, so no other screen's fade changes.
- **Cost:**
  - 90 frames lose the MealWash component link.
  - MealWash stays on page 03 for frames that don't scroll.
- **To confirm:** that Figma's player keeps a scrolling frame's own fill still. Check once in presentation mode after the change.

## Fixed wash: the Meal wash becomes the frame background (90 frames)

The snapshot `st63` was taken first. This carries out the proposal from "Status fade investigation".

**Tokens (ML Color, Light/Dark):**

| Token | Light | Dark |
|---|---|---|
| `wash/top` | `#E9F7B0` | `#2A3312` |
| `wash/clear` | `#E9F7B0` at alpha 0 | `#2A3312` at alpha 0 |

These are the exact colours of the MealWash gradient stops.

**Change:**
- On each of the 90 frames that use `ScrollEdgeFade / Style=Status` (04: 5, 05: 5, 07: 75, 10: 5), the `Meal wash` instance was removed.
- A linear gradient was added as a second frame fill, over the canvas fill: `wash/top` at 0 → `wash/clear` at 300 pt (position 300/852). Both stops are bound to the tokens.
- A frame's own fill doesn't scroll, so the wash now stays put.
- All 90 frames are absolute layout (no auto layout), so removing the layer shifted nothing.
- Page 05 frames resolve Dark through their explicit mode.

**R9 amended:** on a scrolling screen, the Meal wash is the frame's fixed background, not a scrolling layer. The Nav Header (large title) and content still scroll.

**Unchanged:**
- The `MealWash` component and its 626 other instances (non-scrolling screens).
- `ScrollEdgeFade` (all styles) and `HeaderBackdrop`.

**Visible side effect:** **Sign out** (alert over a You list scrolled 215 pt) had its wash offset to y −215 to show the scroll. Under the new model the background doesn't scroll, so its wash now sits at the top like every other scrolled state.

**Edge measurement:**
- Method as in the investigation: the largest RGB step, frame margin x 2–10.
- The status edge is measured at y 36 | 46, and the inline-title header-backdrop edge at y 96 | 108.
- Values are shown as rest / full scroll.

| Frame | Status edge before | Status edge after | Backdrop edge before | Backdrop edge after |
|---|---|---|---|---|
| Meals · Menu (07, light, large title) | 2 / **26** | 2 / 2 | — | — |
| You (07, light, large title) | 2 / **50** | 2 / 2 | — | — |
| Spending · This week (07, light, inline) | 2 / 2 | 2 / 2 | 4 / **39** | 4 / 4 |
| Entry · Under review (05, **Dark**, inline) | 1 / 1 | 1 / 1 | 2 / **22** | 2 / 3 |
| AD-1a (10, admin, large title) | 2 / **19** | 2 / 2 | — | — |
| AD-1b (10, admin, inline) | 2 / 2 | 2 / 2 | 4 / **10** | 4 / 4 |

- The inline-title `HeaderBackdrop` had the same mismatch, and it is fixed by the same change.
- **Pixel diff at rest, before vs after (6 frames):**
  - 2–4 pixels over the threshold per frame, at most 15 levels.
  - These are all at the status-bar Wi-Fi glyph (x 320–327, y 26–29), identically on every frame, plus one pixel in the AD-1b tab-bar glass.
  - This is the documented glass/antialias noise. There is no content shift.
- Renders:
  - `status_fade/fixed_wash_before.png` and `status_fade/fixed_wash_after.png`
  - Top row at rest, bottom row at full scroll.
  - Columns: Meals · Menu, You, Spending · This week, Entry · Under review (Dark), AD-1a, AD-1b.

**Diff vs `st63`:**
- Exactly 90 top-level frames changed, and every one is on the target list. There were no unexpected changes.
- In each changed frame, only these differ: child count −1, instance count −1, fills, and the child-id list. Position, size, text and modes are unchanged.
- All 90 have 2 fills, both gradient stops bound, and no Meal wash left.
- Pages 00–03, 06, 08, 09 and 99 are unchanged. Links are unchanged: 7 / 7 / 1192 / 8.

**Still to confirm:** in presentation mode, a scrolling frame's own fill stays fixed. The renders simulate scroll by moving the non-fixed children.

## AD-3 precondition · Today tab after the fixed-wash change

The snapshot `st64` was taken first.

All five Today frames (AD-1a, AD-1b, AD-2a, AD-2b, AD-2c) were rendered at rest and at full scroll: `admin_ad3/precondition_today_tab.png`.

| Frame | Scroll range | Status edge, rest / max | Backdrop edge, rest / max | Last item at max | Background |
|---|---|---|---|---|---|
| AD-1a | 88 | 2 / 2 | — | 728 | 2 fills, both stops bound |
| AD-1b | 42 | 2 / 2 | 4 / 4 | 728 | as above |
| AD-2a | 0 (content fits) | 2 / 2 | 4 / 4 | 568 | as above |
| AD-2b | 0 | 2 / 2 | 4 / 4 | 488 | as above |
| AD-2c | 0 | 2 / 2 | 4 / 4 | 405 | as above |

- **Result:** pass. There is no seam or band on any frame. AD-2a, AD-2b and AD-2c don't scroll, so for them "full scroll" is the same image as rest, and a scroll seam can't occur.
- The diff vs `st64` after cleanup shows no change on any page. **`st65` was stored as the AD-3 baseline.**

**Live-run checks, batched for one presentation-mode pass before the review:**
- **Gap 96:** does Back return AD-1a to its earlier scroll position?
- **Gap 97 (remainder):** does a scrolling frame's own fill (the wash) stay still during a real scroll gesture?

## Admin AD-3 · Issues (2026-09-30)

The baseline is `st65` (see the AD-3 precondition). The section "AD-3 · Issues" is on page 10 at y 2300, with frames at y 2400, x = 0 / 493 / 986 / 1479. It is Light only, with a label, Moment note (Wed 1:50–1:53 PM) and sample chip on every frame.

**Reused, nothing new on page 03:** NavHeader, AdminTabBar (Selected = Issues), MetaChip, ListRow (+ StatusPill), ResultCard, FormField (Filled / Default), Button, the MS-D4 history-row composition (cloned from page 09), the MS-D3a recheck MetaChip, HeaderBackdrop, ScrollEdgeFade, and the fixed-wash frame fill.

| Frame | Id | Content |
|---|---|---|
| AD-3a · Issues — Overview | `ids.admin.ad3[0]` | Large title "Issues" / "Wed 14 Aug · 10 open". Filters: All messes · Open · This week. Three groups, urgent first: **SOS · SAFETY · 1 OPEN**: Chicken biryani · Foreign object · Main Mess · Stop "Safety report". **FEEDBACK · MAIN MESS · 4 OPEN** (MS-D2 data): Sambar · Too salty · 6 reports · Hold "Recheck Fri"; Rice · Undercooked in batch 2 · 4 reports · Hold "Open"; Paneer butter masala · Too oily · 3 reports · Open; Curd · Sour · 2 reports · Open. **COMMUNITY · STUDENT REPORTS · 5 OPEN** (student Community data): Long wait at counter 3 · 64 · Seen; Sambar too watery at dinner · 38 · Working on it; Curd runs out by 8:45 PM · 21 · Sent; Rice undercooked on Mondays · 17 · Need more info; More breakfast options · Suggestion · 112 · Seen; Drinking water too warm · North Mess · fixed today · **Success "Fixed"** (the resolved item shown briefly). Scroll range 384. |
| AD-3b · Issue detail — Safety report | `[1]` | ResultCard **Stop** "Safety report · Chicken biryani · Main Mess · Foreign object reported · 1 report", the same facts as AD-1b. REPORT card: What · Found something · 1 photo; When · Wed 14 Aug · 1:12 PM · lunch; Where · Main Mess · Block A · counter 2; Reported by · Student · •••2231 (masked, kept for follow-up per gap 87); Open for · 38 min. OWNER: FormField Filled "Assigned to · Ravi · •••4417 · Kitchen supervisor · Sees it in the safety queue". Button Secondary **Escalate**. RESOLUTION LOG · NEWEST FIRST (MS-D4 rows): Assigned to Ravi · 1:25 PM · Admin · •••0912; Batch set aside · biryani 30 kg · 1:20 PM · Ravi · •••4417; Report received (Hold icon) · 1:12 PM · Student · •••2231. Primary **Add to log**. Range 420. |
| AD-3c · Issue detail — Dish feedback | `[2]` | ResultCard **Hold** "Recheck Fri · Sambar · Main Mess · Too salty · 6 reports". CORRECTIVE ACTION · FROM KITCHEN: ResultCard **Success** "Logged 12:52 PM · Sambar · salt cut by a third · Logged · approved by Ravi · •••4417" (the MS-D3a entry, read-only; admin doesn't re-log it). The MS-D3a MetaChip "Next served Fri lunch · recheck then". REPORTS: Too salty · Grouped by dish · names never shown · 6. Primary **Confirm action**. No scroll. |
| AD-3d · Community moderation | `[3]` | LOOK THE SAME · 3 REPORTS: Long wait at counter 3 · 64 students · Seen; Counter 3 queue too slow · 12 · Sent; Waited 20 min for plates · 5 · Sent. Secondary **Merge 3 into one**. OPEN · WHAT STUDENTS SEE (owner in the reason line, student-visible step in the pill): Sambar too watery at dinner · Food head · Working on it; Rice undercooked on Mondays · Food head · Need more info; More breakfast options · Mess committee · Seen; Curd runs out by 8:45 PM · No owner yet · **Sent** (outline pill). FormField Default "Owner · Curd runs out by 8:45 PM · Choose a person · Students see "Seen" once assigned". Range 139. |

**Consistency checks:**
- **Biryani:** the facts match AD-1a (Main badge Stop), AD-1b (PrepCard "Foreign object reported · 1 report", Stop "Safety report") and AD-3b.
- **Sambar:** the complaint (6 reports) and the action (salt cut by a third, Ravi, 12:52 PM, recheck Fri lunch) match MS-D2 / D3 / D3a / D4.
- **Community counts and steps** match the student Community · List. Sambar shows 38, the count before the student's own "Me too".
- **Row copy:** every SOS and feedback row is one line. Two student-written community titles wrap to two lines and are kept verbatim.

**Links (page 10, +11):**
- AD-3a biryani → AD-3b; Sambar → AD-3c; all 6 community rows → AD-3d (Move in, 0.3).
- AD-3b / AD-3c / AD-3d Back → BACK.
- Flow start "Admin · Issues" (AD-3a).
- Page 10 also has a pre-existing flow start named "Flow 1", left as is.

**Diff vs `st65`:**
- Page 10: +17 nodes (1 section, 4 frames, 4 labels, 4 Moment notes, 4 sample chips) and +11 links, all in AD-3.
- No existing frame changed. Every other page is unchanged, with links at 7 / 7 / 1192.
- Renders:
  - `admin_ad3/ad3_section.png`: top row at rest; bottom row at full scroll. Column 5 is a TMP-only alternative, not in the file.
  - `admin_ad3/ad3a_squint_current_vs_alt.png`

**Two-second test (open decision):**
- In AD-3a as built, the SOS row differs from the feedback rows only by the pill's shade (Stop `ink` vs Hold `ink-secondary`). The pills have the same shape and size, and the rows are the same height.
- Blurred (the "squint" render), the biryani row doesn't stand out from the Sambar row.
- The alternative renders the SOS item as the **black ResultCard Stop**, the same card that opens AD-3b and appears on AD-1b. It reads as urgent without the tag text.
- The alternative is **not applied**; awaiting a decision.

## Admin AD-3.1 · SOS card, escalation, closing, chevrons, Sent pill (2026-09-30)

The snapshot `st66` was taken first.

1. **SOS as a Stop card (AD-3a).** The SOS group is now the **ResultCard Stop** "Safety report · Chicken biryani · Main Mess · Foreign object reported · 1 report", the same component and facts as AD-1b and AD-3b. It replaces the row, and the card links to AD-3b. Gap 101 is closed.
2. **Escalation: food head, two paths (AD-3b).**
   - The button is now **"Escalate to food head"** (manual).
   - Under it is a MetaChip (clock) **"Auto-escalates to food head at 1:55 PM"**. The rule: the report auto-escalates to the food head when unresolved **30 min after it was received**.
   - To keep the timeline honest at the 1:51 PM moment (not yet escalated), the report time moved from 1:12 to **1:25 PM**:
     - When: Wed 14 Aug · 1:25 PM · lunch
     - Open for: 26 min
     - Log: Report received 1:25 · Batch set aside 1:30 · Assigned to Ravi 1:32

     These times appear only on AD-3b. AD-1a (1:40) and AD-1b (1:41) already show the report, so the new time is consistent with them.
3. **Closing an SOS is an explicit flow (AD-3b).** Section "TO CLOSE · ASSIGNED STAFF ONLY", a card of **TimelineStep** instances (reused):
   1. **Current:** Ravi marks it resolved · Assigned staff only · not admin
   2. **Upcoming:** Reporter notified · Student · •••2231 · in the app
   3. **Upcoming:** Resolved · Only after the reporter is notified

   Admin has **no close control**. The admin's actions are Escalate and Add to log.
4. **Chevrons removed** on Rice, Paneer butter masala and Curd (AD-3a). They were never linked, so no link changed. Gap 99 was rewritten as a future item (below).
5. **Student "Sent" gets its own pill.**
   - New **StatusPill `State=Sent`** (page 03): `fill-quiet` fill, `ink` label, no outline. It matches the student StatusTag "Sent", so both roles show "Sent" the same way.
   - It is distinct from **Offline** (outline, `ink-secondary`), which keeps its meaning: lost connection / missing data.
   - Used on "Curd runs out by 8:45 PM" in AD-3a (was Hold) and AD-3d (was Offline). Gap 100 is closed.
   - The variant's Label binding was re-linked after cloning.

**StatusPill states now:**
- Success (lime)
- Hold (ink-secondary)
- Stop (ink)
- Offline (outline)
- **Sent (fill-quiet)**

Instances: 29.

**Diff vs `st66`:**
- Page 03: StatusPill only (+1 variant).
- Page 10: AD-3a and AD-3b changed, and AD-3d's pill switched state (not visible to the frame signature, which tracks text and structure).
- Links: −1 (the SOS row) +1 (the SOS card, same destination). Page 10 stays at 19.
- All other pages unchanged: 7 / 7 / 1192.
- AD-3a range 468; AD-3b range 714.
- Renders:
  - `admin_ad3/ad3_1_corrections.png`: AD-3a rest / max; AD-3b rest / 357 / max; AD-3d max.
  - `admin_ad3/statuspill_states.png`

## Admin AD-3.2 · Category chips, PrepCards for dish feedback, duplicate stack (2026-09-30)

The snapshot `st67` was taken first.

1. **AD-3a category chips.**
   - The three grey-caps group labels were removed.
   - The top chip row (AD-1a filter-chip pattern, MetaChip) is now the category switch: **All · 10** (selected) · SOS · 1 · Feedback · 4 · Community · 5.
   - The scope moved into the subtitle: "Wed 14 Aug · All messes · This week".
   - To fit 353 pt: gap 6, chip side padding 8 (instance overrides, AD-3a only). The row is 340 pt.
   - The chips are unlinked; there are no per-category frames yet (samples).
   - **Flagged, new: `MetaChip Surface=Selected`** (page 03): `ink` fill, `surface` label and icon, no stroke. MetaChip had no selected state; "On dark" is for chips on black cards and read as blank on the canvas. Label and icon property references were re-linked after cloning. No existing MetaChip instance changed.
2. **PrepCards for dish feedback.**
   - AD-3a: the four feedback rows are now **PrepCards** in AD-1b's swipe row (clipped, 4 page dots).

     | Dish | Quantity | Fact | Status |
     |---|---|---|---|
     | Sambar | 6 reports | Too salty · Main Mess | Hold "Recheck Fri" |
     | Rice | 4 reports | Undercooked in batch 2 · Main Mess | Open |
     | Paneer butter masala | 3 reports | Too oily · Main Mess | Open |
     | Curd | 2 reports | Sour · Main Mess | Open |

   - The Sambar card → AD-3c (the link moved from the old row).
   - AD-3c: the "Report summary" ListRow card is now a full-width PrepCard (Sambar · 6 reports · Too salty · names never shown · Recheck Fri). AD-3c now scrolls 56.
3. **AD-3d duplicate stack.**
   - The three look-alike reports are a stack: front card "Long wait at counter 3 · 64 students · Seen" at full width.
   - Two cards behind it peek **10 pt** below, each inset 8 pt a side, with an `outline` stroke so the edges read.
   - "Merge 3 into one" sits under the stack. The open-issues list is unchanged.

**Diff vs `st67`:**
- Page 03: MetaChip only (+1 variant).
- Page 10: AD-3a, AD-3c and AD-3d.
- Links: −1 (Row · Sambar) +1 (Card · Sambar), same destination. Page 10 stays at 19.
- All other pages unchanged: 7 / 7 / 1192.
- Render: `admin_ad3/ad3_2_patterns.png` (AD-3a rest / max, AD-3c rest / max, AD-3d rest / max).

## Admin AD-3.3 · Wallet-style duplicate stack (2026-09-30)

The snapshot `st68` was taken first.

**AD-3d "Duplicate stack":**
- Restacked Wallet-style. The back cards now peek **above** the front card, so each title shows.
- Back to front:

  | Card | Position | Size |
  |---|---|---|
  | Waited 20 min for plates | x 16, y 0 | 321 wide |
  | Counter 3 queue too slow | x 8, y 42 | 337 wide |
  | Long wait at counter 3 (front, full) | x 0, y 84 | 353 × 72 |

- **Peek is 42 pt, not 34.** The card title spans 15–39 pt from the card top, so 34 pt would clip it. The two back titles end at 39 and 81, clear of the next card (42, 84).
- **Height:** the stack is 92 → **156 pt** (+64).
  - AD-3d scroll range goes 29 → **93**.
  - At max scroll the last item ("Students see "Seen" once assigned") ends at **y 728**: 20 pt above the tab bar (R9b). Fixed children are still 7, overflow vertical.

**Diff vs `st68`:**
- No top-level signature change on any page. The frame signature doesn't capture nested layer positions.
- Verified directly:
  - only the stack's three card positions and widths, and the stack height, changed;
  - text and links are unchanged on every page.
- Renders: `admin_ad3/ad3_3_stack_before.png`, `admin_ad3/ad3_3_stack_after.png` (rest and max scroll).

## Admin AD-4 · Insights (2026-09-30)

The snapshot `st69` was taken first. The section "AD-4 · Insights" is on page 10 at y 3500, with frames at y 3600, x = 0 / 493 / 986 / 1479 / 1972 / 2465. It is Light only, with a label, Moment note (Wed 2:05–2:08 PM) and sample chip on every frame. The tab bar is Selected = Insights.

**Patterns used:**
- The AD-3a chip row (MetaChip Tappable + Selected) for period, mess, grouping and type switching. Rows wider than 353 pt run to the screen edge and clip (a scrolling chip row).
- A black hero in the admin card family (`hero-bg`, `on-hero`, `on-hero-secondary`, the LiveDial eyebrow style), **static**: no LiveDial, since Insights is retrospective.
- MessBadge (cloned AD-1a strip) with new data.
- **WeekBars** (the student "Per meal, by week" component) reused as an instance with value and bar-height overrides.
- The AD-1a entry-card pattern (ListRow in a white card) for Trends and Reports.
- ListRow + quantity for the report list only (AD-4d).

**Flagged local compositions (not on page 03 yet):**
- `Share bar · on dark`: three segments. Never served `on-hero` · Left on plates `on-hero-secondary` · Donated `lime`, with a vertical legend.
  - The student ShareBar has no dark surface and no Donated segment.
  - It diverges from the student bar on purpose: Left on plates is grey here, **not hatched**, because hatching means "not measured" in WeekBars.
- `Expected vs served` paired bars (AD-4b): the WeekBars bar style (radius 8, mono values above, mono axis).
  - Expected is `chart-past`, on target is `chart-current` + `lime-outline`, off target is `ink-secondary`.

| Frame | Id | Content |
|---|---|---|
| AD-4a · Insights — Waste (Success) | `ids.admin.ad4[0]` | Large title "Insights" / "Wed 14 Aug · Waste". Chips: All messes · This week · **Last week** · This month · This year. Hero "ALL MESSES · LAST WEEK · 5–11 AUG · **642** kg wasted"; bar + legend: Never served 389 · Left on plates 253 · Donated · not waste 45; "38 kg less than the week before". "WASTE PER MEAL · BY MESS · TARGET 65 G" strip: Main 71 g (Hold, over target), North 64 g, South 58 g, Annexe 49 g (Success). Ring = g / 100 g. Entry cards: Trends · Waste down 13% since 8 Jul; Reports · 5 ready for last week. Range 72. |
| AD-4a · Insights — Waste (Empty) | `[1]` | Chip **This week**. Hero "ALL MESSES · THIS WEEK · 12–18 AUG · — kg wasted", empty track, "No waste logged yet for this period". No badge strip. Secondary "See last week". This matches the student chart, where the 12 Aug week is "not measured yet". |
| AD-4a · Insights — Waste (Offline) | `[2]` | As Success, but the hero reads "3 OF 4 MESSES · … · **546** kg" (331 / 215 / 39) with "Not comparable · Annexe has not reported" (wifi.slash). The Annexe badge is **Offline "—"**, with no arc (the AD-1a Annexe treatment). |
| AD-4b · Forecast vs actual — Main Mess | `[3]` | Inline "Main Mess" + Back. "Tue 13 Aug · 2 of 3 meals on target". Chart card: Breakfast 610 / 596 (on target), Lunch 860 / 838 (on target), Dinner 820 / 697 (off target); key. Facts, one per line: Breakfast · 14 fewer · within 5%; Lunch · 22 fewer · within 5%; Dinner · 123 fewer · **15% below forecast** (AD-2c wording); Dinner cause · not logged. |
| AD-4c · Trends | `[4]` | Large title + Back. Chips **By week** · By month · By year. Summary "Waste down 13% since 8 Jul". WeekBars "Kg wasted, by week": 742 · 718 · — · 680 · **642 (lime, last complete week)** · —. Both "—" weeks match the student chart's not-measured weeks (22 Jul, 12 Aug). |
| AD-4d · Reports & exports | `[5]` | Large title + Back, "Last week · 5–11 Aug". Chips **Weekly** · Monthly · Mess-wise · Dish-wise · Year-wise. Rows with a preview stat: All messes · 4 messes · 642 kg; Main Mess · 71 g per meal · 212 kg; North · 64 g · 176 kg; South · 58 g · 158 kg; Annexe · 49 g · 96 kg. Primary "Export 5 reports · CSV", Secondary "Export as PDF". |

**Data checks:**
- Main Mess 131 + 81 = 212 kg, donated 18 kg, 71 g per meal: the student Waste · Last week figures.
- Cross-mess sums: 389 / 253 / 45 / 642.
- Offline sums without Annexe: 331 / 215 / 39 / 546.
- Trends: 680 → 642 = −38 kg; 742 → 642 = −13%.
- AD-4b dinner: 697 / 820 = −15%.

**Links (+13):**

| From | Links |
|---|---|
| Success and Offline | Main badge → AD-4b; Trends → AD-4c; Reports → AD-4d (Move in 0.3); chip "This week" → Empty (Dissolve 0.25) |
| Empty | chip "Last week" and "See last week" → Success (Dissolve 0.25) |
| AD-4b / AD-4c / AD-4d | Back → BACK |

- Flow start "Admin · Insights".
- The other badges, the other chips and the export buttons are unlinked (samples).

**Diff vs `st69`:**
- Page 10: +25 nodes, all AD-4 (1 section, 6 frames, 6 labels, 6 Moment notes, 6 sample chips); +13 links, all within AD-4. No existing frame changed.
- Page 03 is unchanged, with no new components. All other pages are unchanged: 7 / 7 / 1192.
- Renders: `admin_ad4/ad4_section.png` and `admin_ad4/badge_confusion_compare.png`.

**Open (badge confusion):**
- AD-4a's waste strip and AD-1a's turnout strip share the ring, the arc range (49–91%) and the status glyphs. Only the unit ("%" vs "g") and a grey caption differ.
- Main reads **Stop** on AD-1a (safety report, worst open issue) and **Hold** on AD-4a (over the waste target).
- Recommended: a stronger distinguisher than a label (see the gaps file, gap 102).

## Admin AD-4.1 · One hero module, scrolling chips, MetricBadge, promoted components (2026-09-30)

The snapshot `st70` was taken first.

**New components (page 03, x 1300–1780, y 13584–13760):**
- **`MetricBadge`** `State=Value / No data`; text props Name and Value.
  - Parts:
    - dim track: `on-hero-secondary` at 30% layer opacity;
    - white value arc: `on-hero`, 0–100 g scale, set per instance via arcData;
    - **lime target tick** at 65 g, a thin arc wedge so it survives instancing;
    - mono value; Inter Semi Bold 15 name.
  - **No status glyph slot.** Status glyphs stay reserved for MessBadge (worst open issue). Waste badges only say on or over target, through arc vs tick.
- **`WasteBar`** `State=Measured / Empty`; text props Never served, Left on plates, Donated.
  - Measured: three segments (Never served `on-hero` · Left on plates `on-hero-secondary` solid · Donated `lime`), 2 pt gaps, 313 wide, set per instance; vertical legend.
  - Empty: a dim track.
- **`ForecastPair`** `State=On target / Off target`; text props Meal, Expected, Served.
  - WeekBars bar style: Expected `chart-past`; served `chart-current` + `lime-outline` (on target) or `ink-secondary` (off target).
  - Bar heights set per instance.

This closes gap 103 (the local compositions are replaced by instances).

**AD-4a (Success / Offline / Empty):**
1. **One hero module.** The badge strip is now the hero's footer: after the trend line comes "PER MEAL · TARGET 65 G", then four MetricBadges (space-between). The separate caption and white badge card are gone.
   - Hero: gap 8, padding 16 top/bottom, WasteBar instance.
   - Screen pieces: **chips · hero module · Trends + Reports** (was chips · hero · caption · badge card · entry rows).
   - Offline: Annexe is `No data` "—".
   - Empty: a WasteBar `Empty` instance, no footer.
2. **Entry rows.** Reports ("5 ready for last week") already sat below Trends, but at rest it was hidden under the tab bar (the page scrolled 72). After consolidation AD-4a **doesn't scroll**, and both rows are fully visible at rest; the last one ends at **y 728**.
3. **Badge semantics.** MetricBadge replaces MessBadge on waste. Gap 102 is closed.
4. **Chips scroll for real (AD-4a ×3, AD-4d).** The chip row is 373 wide (bleeding to the screen edge), clipped, `overflowDirection = HORIZONTAL`, with 20 pt trailing padding. Every chip is reachable by a horizontal drag. Gap 104 is closed.

**AD-4b:** the three meal groups are now `ForecastPair` instances (same values and heights).

**Links:** Main badge → AD-4b moved from `Waste · Main` to `Metric · Main` on Success and Offline (−2 / +2). Page 10 stays at 32.

**Diff vs `st70`:**
- Page 03: +3 component sets.
- Page 10: AD-4a ×3 and AD-4b changed. AD-4d's chip-row change is nested, so it isn't visible to the frame signature; it's verified in the render.
- All other pages unchanged: 7 / 7 / 1192.
- Renders:
  - `admin_ad4/ad4_1_before_after.png`
  - `admin_ad4/ad4_1_after.png` (Success, Offline, Empty, AD-4b, AD-4d)
  - `admin_ad4/ad4_1_components.png`

## Admin AD-4.2 · Row check, charts that show the change, hero scale (2026-09-30)

The snapshot `st71` was taken first.

**1. Trends/Reports rows: no change needed (measured).**
- Each row is a ListRow (64 pt, `counterAxisAlignItems = CENTER`) in a 72 pt card with 4 pt padding.
- The title + subtitle block is inset **10 / 10** (top / bottom), and the chevron is centred (y 22–42).
- What made Reports look "low" is that at rest it sits under the bottom Scroll edge fade (y 688+), which greys its subtitle. That's the R9 pattern, not misalignment.
- Close-up: `admin_ad4/ad4_2_rows_before_after.png`.

**2. Charts show the change.**
- **AD-4c** (WeekBars **detached** in this frame only, so the bars can carry true heights: 742 → 109, 718 → 105, 680 → 100, 642 → 94; before they were component defaults 109 / 104 / 101 / 92):
  - A trend line joins the bar tops: `lime` 2 pt over an `ink` 4 pt edge, the same pairing as the lime bar's ink outline.
  - It is **dotted across the unmeasured 22 Jul week**.
  - Endpoint dots mark 742 and 642.
  - A `hero-bg` pill reads **"−100 kg"** above the 12 Aug column.
  - The summary line "Waste down 13% since 8 Jul" stays.
- **AD-4b:** each served bar carries a **dashed "Gap" block** up to the expected height, and the key gains "Gap".

  | Meal | Expected | Served | Gap |
  |---|---|---|---|
  | Breakfast | 85 | 83 | 2 |
  | Lunch | 120 | 117 | 3 |
  | **Dinner** | 114 | 97 | **17** |

**3. Type hierarchy.**
- **Hero number** (AD-4a ×3): JetBrains Mono Bold **40 → 52**, tracking −1.5; unit Medium **15 → 20**. This matches MetricHero and KcalGauge (the student hero numbers).
  - Side effect: AD-4a Success / Offline scroll **16 pt** again. At rest the Reports row ends at y 744 (above the tab bar at 748, under the fade); at max scroll it ends at 728 (R9b).
- **Large titles:** Insights / Trends / Reports already use NavHeader Large Title = **Inter Bold 34** (+0.4), identical to You and Home. No change.

**Defect found and fixed: data bars inside instances.**
- Figma doesn't allow resizing layers **inside** an instance (the size override is silently ignored; min/max size is refused).
- As a result:
  - since AD-4.1, **AD-4b's ForecastPair bars all rendered at the component default** (my AD-4.1 note "same values and heights" was wrong);
  - AD-4c's WeekBars bars and the WasteBar segments sat at component defaults (they happened to be within 1–2 pt, because the defaults came from the same data).
- **Fix:**
  - New **`ChartBar`** component (page 03) `Kind = Expected / On target / Off target / Gap`: one bar per instance. The instance itself is resized to the data height (instance roots *can* be resized).
  - AD-4b pairs are rebuilt as local layouts of ChartBar instances at true heights.
  - **`ForecastPair` was removed** (0 instances; it can't carry data).
  - AD-4c's chart is a detached WeekBars (see above).
- Open: **WasteBar** segment widths are still fixed at 175 / 114 / 20 (right for the current sample proportions only). See gap 105.

**Diff vs `st71`:**
- Page 03: +ChartBar, −ForecastPair.
- Page 10: AD-4b and AD-4c changed. The AD-4a hero type change is nested and not visible to the signature; it's verified in renders.
- Links unchanged; page 10 stays at 32. All other pages unchanged.
- Close-ups: `admin_ad4/ad4_2_hero_before_after.png`, `ad4_2_rows_before_after.png`, `ad4_2_trends_chart_before_after.png`, `ad4_2_forecast_chart_before_after.png`.

## Admin AD-4.3 · Data-driven waste bar (2026-09-30)

The snapshot `st72` was taken first.

**Change:**
- **ChartBar** gains three segment kinds (radius 0): **Never served** `on-hero`, **Left on plates** `on-hero-secondary`, **Donated** `lime`.
- **WasteBar `State=Measured` is now the legend only.** Its fixed-width bar was removed. `State=Empty` (no-data track) is unchanged.
- In AD-4a **Success** and **Offline**, each hero has a screen-level **"Share bar"** row: 313 × 10, clipped, radius 5, 2 pt gaps, holding three ChartBar segment instances.
- Each segment **instance** is resized to 309 × value / total, rounded to whole points by largest remainder (the total stays 309). Whole points avoid the anti-aliased seam that fractional x positions produced (seen at x 292.76 in a first pass).
- Hero side effect: the bar-to-legend gap is now the hero's 8 pt (was 10 inside WasteBar), so the hero is 2 pt shorter.

**Verification (expected from values vs node width vs rendered pixels, measured on the bar's centre row):**

| State | Values (kg) | Expected (pt) | Set (pt) | Rendered (px) | Max error |
|---|---|---|---|---|---|
| Success | 389 / 253 / 45 | 174.97 / 113.79 / 20.24 | 175 / 114 / 20 | 175 / 114 / 20 | 0.24 |
| Offline | 331 / 215 / 39 | 174.84 / 113.56 / 20.60 | 175 / 113 / 21 | 175 / 113 / 21 | 0.56 |

- The old fixed 175 / 114 / 20 was already within 0.6 pt, because both samples split about 57 / 37 / 6. The widths now **follow the data**: Offline correctly becomes 175 / 113 / 21.
- Empty: no segments (WasteBar Empty, unchanged). AD-4b and AD-4c are untouched.

**Diff vs `st72`:**
- Page 03: WasteBar and ChartBar changed.
- Page 10: only AD-4a Success and Offline changed.
- No link changes; all other pages unchanged.
- Close-up with measured widths: `admin_ad4/ad4_3_wastebar_before_after.png`.

## Roadmap update (after AD-4)

| Stage | Status |
|---|---|
| AD-1, AD-2, AD-3, AD-4 | Done |
| AD-5–7 (Manage) | Next |
| Admin state-coverage backfill (AD-1–3) | Deferred |
| Student track leftovers | Paused |
| Stitch all three roles into one prototype | Waiting |

**Student-track resumption list (add to the paused items above):**
- Link cleanup: the 8 unclassified links + gap 92.
- The 13 overflow frames.
- Stage 4 verification.
- Cosmetic cleanup.
- **New (gap 105):** the student Waste screen's "Per meal, by week" chart (`WeekBars`) draws its bars at the component's fixed default heights. Figma ignores size overrides inside instances. The current sample values happen to match, but any other data would draw wrong heights. Fix as in AD-4: build data bars from `ChartBar` instances (or a detached chart), sized from the values, and verify the rendered heights against the data.

**Batched presentation-mode checks before the review:** gap 96 (Back scroll position), gap 97 (fixed wash during a real scroll), and the AD-4 horizontal chip scroll (gap 104).

## AD-5 precondition · Insights tab check (2026-09-30), NOT PASSED

The snapshot `st73` was taken first. There was no Figma change: the diff vs `st73` after cleanup is clean. **No AD-5 baseline was taken**, because the precondition found two defects.

**Renders:** all six AD-4 frames at rest (top) and full scroll (bottom). The scroll range is 14 on AD-4a Success/Offline and 0 elsewhere. Render: `admin_ad5/precondition_insights_tab.png`. Visually clean.

**Links:** all 13 AD-4 links resolve.

| From | Links |
|---|---|
| Success and Offline | chip This week → Empty; Metric · Main → AD-4b; Trends → AD-4c; Reports → AD-4d |
| Empty | chip Last week and See last week → Success |
| AD-4b / AD-4c / AD-4d | Back |

**Numbers: consistent.**

| Figure | Where it appears |
|---|---|
| **642** | AD-4a Success hero, AD-4c 5 Aug bar, AD-4d "All messes 642 kg" |
| **546** | AD-4a Offline = 212 + 176 + 158, the AD-4d Main / North / South rows |
| **−38 kg** | "38 kg less than the week before" = AD-4c 680 → 642 |
| **−100 kg** | the AD-4c pill = 742 → 642 |
| **71 g** | AD-4a Main MetricBadge, AD-4d Main row, and the student Waste · Last week hero (with 212 kg = 131 + 81 and donated 18 kg in the 45 kg cross-mess total) |

**Defects found (not fixed; this was a report-only step):**
1. **Stray flow starts (gap 106).** Page 10 has 8 flow starting points. Cloning a frame copies its flow start, so:
   - **"Admin · Issues"** is set on AD-3a (correct) and also on AD-4a Empty, AD-4a Offline, AD-4c and AD-4d (cloned from AD-3a);
   - **"Flow 1"** is on AD-2a (cloned from AD-1a).

   Correct set: Admin · Today (AD-1a), Admin · Issues (AD-3a), Admin · Insights (AD-4a Success).
2. **Offline trend row claims an all-mess figure (gap 107).** AD-4a Offline's Trends row reads "Waste down 13% since 8 Jul · 3 messes". The 13% is the 4-mess series (742 → 642); a 3-mess figure isn't shown anywhere.

## AD-5 precondition fixes: flow starts, offline trend row (2026-09-30)

The snapshot `st74` was taken first. It now also records each page's flow starting points.

1. **Flow starts (gap 106 closed).**
   - Removed "Flow 1" (AD-2a) and the four copied "Admin · Issues" starts (AD-4a Empty, AD-4a Offline, AD-4c, AD-4d).
   - Page 10 now has exactly **3**: **Admin · Today** → AD-1a, **Admin · Issues** → AD-3a, **Admin · Insights** → AD-4a Success.
   - Other pages' flow starts are unchanged: 00 Before 4, 04 2, 05 2, 07 25.
2. **AD-4a Offline Trends row (gap 107 closed):** "Waste down 13% since 8 Jul · 3 messes" → **"Trend needs all 4 messes"**.

**Diff vs `st74`:**
- Page 10: only AD-4a Offline changed (row text), and flow starts −5 / +0.
- Links unchanged; all other pages unchanged.
- Renders: `admin_ad5/flow_starts_before_after.png` (API readout) and `admin_ad5/ad4a_offline_trend_fixed.png`.

**Rule D1: duplicate hygiene.** Figma copies a frame's prototype flow start onto its duplicate.
- **After duplicating any frame** (clone, duplicate-and-modify, or TMP capture copies left in the file), immediately check the page's `flowStartingPoints` and **remove any start that points at the duplicate** before continuing. The only exception is a new, intended flow start, added explicitly by name.
- This check is part of **every** duplicate-and-modify step, not only the end-of-stage review.
- Each stage diff now also compares flow starting points per page (added / removed).

## Admin AD-5 · Manage, part 1: menu & nutrition, voting (2026-09-30)

**Precondition re-run: PASS.**
- 13/13 AD-4 links resolve.
- Flow starts are exactly Admin · Today / Issues / Insights.
- 642 / 546 / −38 / −100 / 71 g agree on every screen that shows them.
- The Offline trend row reads "Trend needs all 4 messes".
- Render: `admin_ad5/precondition_rerun_insights.png`.

**Baseline:** `st75` (signatures + links + flow starts).

The section "AD-5 · Manage, part 1" is on page 10 at y 4700, with frames at y 4800, x = 0 … 4437 (step 493). It is Light only, with a label, Moment note (Wed 2:15–2:19 PM) and sample chip on every frame. The tab bar is Selected = Manage.

**Components reused (no new component):** PrepCard (swipe row + dots, from AD-1b), SpecialPassTile, SegmentedControl (3 and 2 items), EmptyState, OfflineBanner, FormField (Filled / Default), Button (incl. Disabled), MetaChip, ResultCard, ListRow + StatusPill, the AD-3d Wallet duplicate stack, the AD-1a destination row, and the filter-chip rows.

**Nutrition data shape (verified against H7 "You · Nutrients detail", page 04):**
- H7 shows Energy kcal · Protein g · Carbs g · Fat g · Fibre g · Sugar g · Sodium mg.
- AD-5b's fields are exactly **Energy · kcal, Protein · g, Carbs · g, Fat · g, Fibre · g, Sugar · g, Sodium · mg**, per serving.
- The Sambar values are the Stage 2.1 table's: 110 / 5 / 14 / 4 / 4 / 3 / 420.
- The AD-5b check chip repeats the Stage 2 rule: "4P + 4C + 9F = 112 · within 5% of 110".

| Frame | State | Content |
|---|---|---|
| AD-5a · Menu & nutrition | **Success** | Large title "Menu"; mess chips (Main Mess selected); SegmentedControl Breakfast / **Lunch** / Dinner. "LUNCH · 5 DISHES · PER SERVING": PrepCard swipe row. Sambar 110 kcal · Veg · P 5 · C 14 · F 4 · Fibre 4 g; Rice 180; Beetroot poriyal 90; Chicken curry 250 · Non-veg (all Success "In tracker"); **Curd · — kcal · Hold "Nutrition missing"** (not in the tracker table, so students can't count it). "WEDNESDAY SPECIAL · SPECIAL PASS": SpecialPassTile Available "Chicken biryani · Wed 14 Aug · 12–2 PM · 214 passes"; Not today "Paneer tikka · Wed 21 Aug". Secondary "Add dish". Destination row "Menu voting · 1 result needs your decision". Range 122. |
| AD-5a | **Empty** | Chip **Annexe**. EmptyState (fork.knife) "No dishes added yet · Annexe has no lunch menu. Students there have nothing to plan or track." Primary "Add first dish". |
| AD-5a | **Offline** | OfflineBanner "Offline · showing the menu saved at 12:10 PM"; same content; "Add dish" Disabled. |
| AD-5b · Edit dish — Sambar | Success | Inline "Edit dish" + Back. Dish name; Veg / Non-veg; "PER SERVING · SAME FIELDS STUDENTS SEE"; 7 fields in a 2-column grid; the check chip; Primary "Save dish"; Text "Cancel". |
| AD-5b · Add dish | Empty | Blank fields ("—", "e.g. Masala dosa"); chip "Source: IFCT 2017 · one standard serving"; Save **Disabled** until filled. |
| AD-5b · Edit dish | Offline | OfflineBanner "Offline · changes save when you reconnect"; Save Disabled. |
| AD-5c · Menu voting | **Success** | Large title + Back, chips This week / Past votes. **NEEDS YOUR DECISION**: ResultCard Hold "Vote closed · decide · Idli sambar on Sundays · 1,204 for · 388 against" + chip (lock) **"A vote never changes the menu by itself"**. **VOTING NOW**: "Masala dosa at breakfast · Closes Fri 16 Aug · 8:00 PM · 2 d 6 h". **NEW PROPOSALS · CRITERIA CHECK**: Pongal on Tuesdays · 47 students · 290 kcal · veg · Success "Meets criteria"; Egg curry on Mondays · 64 · 18% over budget · Hold "Needs review"; Fried chicken daily · 51 · 38 g fat a serving · Stop "Doesn't qualify". Primary "Open vote · Pongal on Tuesdays" + chip (clock) "Vote runs 48 h from when you open it". **LOOK THE SAME · 3 PROPOSALS**: Wallet stack (More paneer dishes 9 · Paneer for dinner 18 · Paneer tikka on Fridays 42) + "Merge 3 into one". Range 438. |
| AD-5c | **Empty** | EmptyState (hand.raised) "No proposals this week · Students propose dishes from Community. New ones land here with a criteria check." |
| AD-5c | **Offline** | OfflineBanner "Offline · votes can't open or close until you reconnect"; "Open vote" and "Merge" Disabled. |
| AD-5d · Vote result → final decision | — | ResultCard Hold "Needs your decision · Idli sambar on Sundays · Vote closed Tue 13 Aug · 8:00 PM". Tally (one line): "1,204 for · 388 against · 76% for". Chip "Meets criteria · 290 kcal · veg · within budget". "The vote is advice. The menu changes only when you approve." YOUR DECISION: Primary "Approve · add to Sunday breakfast"; FormField "Reason to decline (required)" · "Students see this reason" (MS-C4 reason pattern); Secondary "Decline" **Disabled** until a reason is entered. |

**ListRow use (flagged, deliberate):**
- ListRow + StatusPill carries the proposals list (a flat list of short text items, each with a pass / review / fail tag) and the single "Voting now" row.
- Dishes use PrepCard; the decision uses a ResultCard; duplicates use the Wallet stack.

**Links (+21):**

| From | Links |
|---|---|
| 5a Success | Sambar card → 5b Edit; Add dish → 5b Add; Menu voting → 5c; chip Annexe → 5a Empty (Dissolve) |
| 5a Empty | chip Main Mess → 5a Success; Add first dish → 5b Add |
| 5a Offline | Menu voting → 5c |
| 5b | Back and Cancel → BACK; Edit Save → BACK |
| 5c Success / Offline | decision card → 5d |
| 5c ×3, 5d | Back |
| 5d | Approve → 5a Success |

- Flow start **"Admin · Manage"** → 5a Success.

**Rule D1 amended:** Figma also **auto-creates** a flow start ("Flow N") when a link is added from a top-level frame that isn't in a flow yet. That's where AD-2a's "Flow 1" came from, and it recurred here on AD-5a Success. After wiring links, reset the page's flow starts to the approved list.

**Diff vs `st75`:**
- Page 10: +41 nodes, all at y ≥ 4700 (1 section, 10 frames, 10 labels, 10 Moment notes, 10 sample chips); +21 links, all inside AD-5; flow starts +1 (Admin · Manage), −0. No existing frame changed.
- All other pages unchanged. Links on page 10: 53.
- Renders: `admin_ad5/ad5_menu_and_dish.png`, `admin_ad5/ad5_voting_and_decision.png`. They were taken before the vote-window chip was reworded from "closes Fri 16 Aug, 8:00 PM"; 48 h from now would be Fri 2:18 PM.

**Open questions:**
- **Criteria check: hard gate or soft warning?** As built it's a soft signal, so all three tags remain actionable. Recommendation below and in the gaps file. **Decided in AD-5.1:** hard gate for Stop, soft gate with a logged override for Hold.
- **Curd has no nutrition data.** It's served but invisible to the tracker, so it needs an IFCT value.
- **Past votes chip:** not built (sample).

## Admin AD-5.1 · Criteria gates decided (gap 108) (2026-09-30)

The snapshot `st76` was taken first (all pages, links, flow starts).

**Snapshot method from `st76` on:**
- The tool is stored in root shared plugin data as `mealloop/snaptool` and in the repo as `design/audit/tools/snaptool.js`. Call it once per page, in parallel; it stores chunks as `<stage>_<pageId>_<i>` and diffs against any earlier `st76+` snapshot.
- Node signature: `id|type|name|x|y|w|h|kids|instances|texts|textHash|fills|modes|overflow|fixed|childIds`. Link signature: one line per action, with trigger, timeout, destination, navigation, transition and reset-scroll. Flow starts per page.
- Hashes are djb2 / base36, so they are **not comparable** with `st75` and earlier. `st76` was checked against `st75` on the hash-free fields (type, name, geometry, child / instance / text counts, overflow, fixed children), on links in the old format, and on flow starts. Every page matched, except that page 10 differed by exactly AD-5's 41 nodes, 21 links and the "Admin · Manage" start.
- Format note: `st75` stored the page-07 H1 "Track" conditional as its inner actions; `st76` records it as one `CONDITIONAL` action. Page 07 has 1,192 reactions in both.
- Page 03 keeps the Stage 3.2 rule: instance count, text count and text hash are advisory there.

**Decision (final):**
- **Doesn't qualify (Stop) is a hard gate.** The proposal fails a nutrition or safety limit. It can't go to a vote, and the failing reason is shown.
- **Needs review (Hold) is a soft gate.** Budget or feasibility. The admin can open the vote after reviewing; opening it takes a reason, and the override is logged.
- **Meets criteria (Success)** can be opened directly.
- A vote still never changes the menu by itself (AD-5d).

**AD-5c Success and Offline:**
1. **Fried chicken daily (Stop):** the reason line "51 students · 38 g fat a serving" is now **"No vote · 38 g fat a serving"**. It stays one line (18 pt), and the row stays 65 pt.
2. **New rule chip** directly under the proposals card: a clone of the existing rule chip (MetaChip `Surface=On light`), icon `square.and.pencil`, **"Needs review opens with a logged reason"** (302 × 30). Content order: proposals card → rule chip → Open vote → "Vote runs 48 h from when you open it".
3. **Egg curry on Mondays (Hold)** is unchanged: "64 students · 18% over budget".
- **Scroll:** Success 438 → **480**, Offline 498 → **540**. At max scroll "Merge 3 into one" ends at y 728, 20 pt above the tab bar (R9b).
- **At rest** both frames are pixel-identical to before (max 2 levels, 0 pixels above 6): the proposal rows sit under the tab bar at rest.
- **Not built:** the review step that opens a vote for a Hold proposal. AD-5c states the rule, but there is no control for it yet (gap 111).

**Diff vs `st76`:**
- Page 10: only AD-5c Success and Offline changed (instances +2 and texts +1 each: the chip and its icon). Links 53 (+0 −0); flow starts unchanged (4).
- Pages 04, 05, 07 and 09 unchanged. Page 03: stable fields unchanged; one set's nested counts flipped (advisory, §3.2.0).
- D1: every temporary render clone was removed in the same script, and the page-10 flow starts were compared before and after (unchanged).
- Renders: `admin_ad5_1/before/` and `admin_ad5_1/after/` (Success and Offline, at rest and at max scroll).

### Gap 110 decision (recorded 2026-09-30)

- **The Main Mess prep list is the canonical Wednesday lunch:** Rice, Sambar, Paneer butter masala, Chapati, Curd, with Chicken biryani as the Wednesday special (special pass).
- The student-side alignment is a **data-integrity fix**, so it is the one student-track item that proceeds despite the pause. Its scope is in `design/audit/gap110_student_menu_inventory.md`. **No student frame changes until that scope is approved.**

## Admin AD-6 · Manage, part 2: special passes, rewards, surplus (2026-09-30)

The baseline is `st76` (with the AD-5.1 change on top). The section "AD-6 · Manage, part 2" is on page 10 at y 5900, with frames at y 6000, x = 0 … 4437 (step 493). It is Light only, with a label, Moment note (Wed 2:25–2:30 PM) and sample chip on every frame. The tab bar is Selected = Manage.

**No new components.** Reused:
- chrome and scroll setup from AD-5c (Large Title + Back, Status fade, fixed wash) and AD-5d (Inline Title, HeaderBackdrop);
- DemandRingCard as a **closed ring** for completed periods (lime arc set per instance, "Not sure" arc hidden, as on MS-D1);
- ResultCard, PrepCard swipe row + page dots, ListRow (Stacked and Inline), StatusPill;
- TimelineStep card (from AD-3b), MetaChip rule chips (AD-5c pattern), EmptyState, OfflineBanner, FormField, Button;
- the AD-5a mess chip row and the AD-5c period chip row.

**Data, checked against the other roles:**
- **Passes:** Chicken biryani, 214 passes, window 12–2 PM (AD-5a, MS-C5, student Pass screens). At 2:25 PM, 196 were used and 18 expired unused. The Offline state shows the 1:58 PM sync (188 used). The exception ties to MS-B6: the pass desk was offline from 12:40 PM (gap 80).
- **Rewards:** offers and earning rules are the student Rewards screen's (Juice 50 pts, Ice cream 80 pts; +5 answer before the cutoff, +2 rate a dish, +2 answer a recheck). The pilot budget is sample data: ₹5,000 for August = 120 juices × ₹30 + 35 ice creams × ₹40. Used: 63 × ₹30 + 12 × ₹40 = **₹2,370** (57 and 23 left). Offline at 1:58 PM: 61 juices, ₹2,310.
- **Surplus:** the offered quantities are MS-D1's calculated unserved amounts (Rice 7 kg, Sambar 4 L, Paneer butter masala 3 kg, Chapati 60 pcs); Curd (5 L) is kept back. Donated food is never counted as waste (Waste screen, AD-4).

| Frame | State | Content |
|---|---|---|
| AD-6a · Special passes | **Success** | Large title "Passes" + Back, "Wed 14 Aug · Special pass". Mess chips (Main Mess selected). Hero DemandRingCard "BIRYANI · CLOSED 2 PM · **196** of 214 used · 18 expired unused" (ring 91.6%). **NEEDS YOUR DECISION · 1**: one ListRow card "Karan · •••0733 · Desk offline · 12:41 PM" with Hold "Reissue asked" and a chevron. **RULES · SET BY SRM**: three rule chips: "One pass per student · single use" (lock), "Window 12–2 PM · SRM to confirm" (clock), "Reissues need a reason · logged" (square.and.pencil). No scroll. |
| AD-6a | **Empty** | Chip **North**. EmptyState (ticket) "No special pass this week · North Mess has no special on the menu. Passes are issued when SRM sets one." |
| AD-6a | **Offline** | OfflineBanner "Offline · counts from 1:58 PM". Hero "BIRYANI · AT 1:58 PM · **188** of 214 used · Open till 2:00 PM". Decision row and rules as in Success. |
| AD-6b · Pass exception → reissue decision | — | The AD-5d pattern. Inline "Pass exception" + Back. ResultCard Hold "Needs your decision · Karan · •••0733 · Turned away 12:41 PM · desk offline". "Chicken biryani · Wed 12–2 PM · not used". Chip (wifi.slash) "Desk log · offline from 12:40 PM". "The pass expired unused at 2:00 PM. A reissue is for the next special." YOUR DECISION: Primary "Reissue for Wed 21 Aug"; FormField "Reason to decline (required)" · "Karan sees this reason"; Secondary "Decline" **Disabled** until a reason is entered. |
| AD-6c · Rewards | **Success** | Large title "Rewards" + Back, "August · Pilot". Chips **August** · July. Hero DemandRingCard "PILOT BUDGET · AUGUST · **₹2,370** of ₹5,000 · 63 juices · 12 ice creams" (ring 47.4%). **OFFERS · 3**: PrepCard swipe row: Juice 50 pts "₹30 each · 57 left in August" (Success "Live"); Ice cream 80 pts "₹40 each · 23 left in August" (Success "Live"); Fruit bowl 60 pts "Not shown to students yet" (Hold "Awaiting SRM"). **HOW STUDENTS EARN**: three inline ListRows with mono quantities. Rule chip (lock.shield) "Absences never cost points". Range 74. |
| AD-6c | **Empty** | "No pilot yet". EmptyState (gift) "No rewards pilot yet · Students see "Rewards are coming soon" until SRM approves a budget and offers." This matches the student Rewards · Coming soon. |
| AD-6c | **Offline** | OfflineBanner "Offline · counts from 1:58 PM"; hero ₹2,310 · 61 juices; Juice "59 left". Range 134. |
| AD-6d · Surplus | **Success** | Large title "Surplus" + Back, "Wed 14 Aug · Lunch". Mess chips. Hero ResultCard **Hold** "Awaiting pickup · Lunch surplus · Main Mess · Partner NGO · pickup by 3:00 PM". **OFFERED · 4 DISHES**: inline ListRows (Rice 7 kg, Sambar 4 L, Paneer butter masala 3 kg, Chapati 60 pcs). Chip (info.circle) "Curd kept back · dairy". **HANDOVER**: TimelineStep card: Done "Offered · 2:10 PM" (Ravi · •••4417 · kitchen supervisor); Done "Accepted · 2:14 PM" (Partner NGO · van on the way); Current "Pickup · by 3:00 PM" (Weighed at the gate); Upcoming "Counted as donated" (Not waste · shows in Insights). Primary "Log pickup". Range 297. |
| AD-6d | **Empty** | Chip **South**. EmptyState (leaf) "No surplus logged yet · South Mess hasn't logged lunch waste. Surplus shows once the kitchen counts what was served." |
| AD-6d | **Offline** | OfflineBanner "Offline · handover status from 2:12 PM". Hero Hold "Offered · … · Partner NGO · not confirmed yet". Step 2 is Current "Waiting for the partner · Offer sent 2:10 PM"; Pickup is Upcoming; "Log pickup" **Disabled**. Range 357. |

**Checks:**
- **R9b:** every scrolling frame (AD-6c Success / Offline, AD-6d Success / Offline) ends its last item at y 728, 20 pt above the tab bar, at max scroll. The others fit without scrolling: last item at 614 / 435 / 674 / 657 / 393 / 456.
- **One hero per screen:** one black card each (ring, ResultCard, or the AD-5d decision card). Status is shown by pill and icon only, with no full-card status fills; lime appears only in the ring arcs, "Live" pills and the Current timeline dot.
- Renders: `admin_ad6/ad6_section_rest.png` (all 10 at rest), `admin_ad6/ad6_rest_vs_max_scroll.png` (Rewards and Surplus, rest vs max scroll), and `admin_ad6/frames/` (one PNG per frame).

**Links (+18; page 10: 53 → 71):**

| From | Links |
|---|---|
| AD-5a Success | Special · Chicken biryani → AD-6a Success (Move in, 0.3) |
| AD-6a Success | Chip North → Empty (Dissolve 0.25); Row · Karan → AD-6b (Move in 0.3); Back → BACK |
| AD-6a Empty | Chip Main Mess → Success (Dissolve 0.25); Back → BACK |
| AD-6a Offline | Row · Karan → AD-6b; Back → BACK |
| AD-6b | Back → BACK; "Reissue for Wed 21 Aug" → BACK |
| AD-6c × 3 | Back → BACK |
| AD-6d Success / Empty | Chip South → Empty; Chip Main Mess → Success (Dissolve 0.25) |
| AD-6d × 3 | Back → BACK |

- The transition objects were copied from AD-5a (drill-in, chip) and AD-5c (BACK).
- **Flow starts:** +2, **Admin · Rewards** → AD-6c Success and **Admin · Surplus** → AD-6d Success. Page 10 now has 6: Today, Issues, Insights, Manage, Rewards, Surplus.
- **Entry points:** Passes is reached in-app from AD-5a's Wednesday special tile. Rewards and Surplus have **no in-app entry yet** (flow starts only; their Back does nothing at the start of a flow). See gap 114.

**Rule D1 amended again (nested clones):** cloning a *nested* element (here the AD-5a chip row) carries its reactions too; the Annexe chip arrived still linked to AD-5a Empty. And a reaction removed from a cloned frame can survive on a nested instance layer (the NavHeader Back). **After any clone, strip reactions on every descendant, re-wire, and check the page's link list in the stage diff.** The first AD-6 diff caught 6 stray Annexe links and 4 doubled Back actions; both were fixed before this record.

**Diff vs `st76`:**
- Page 10: +41 nodes (1 section, 10 frames, 10 labels, 10 Moment notes, 10 sample chips), all at y ≥ 5900. Changed: AD-5c Success and Offline (AD-5.1). The AD-5a link sits on a nested layer, so AD-5a's frame signature is unchanged. Links +18 / −0; flow starts +2 / −0.
- Pages 00–09 and 99: unchanged (page 03 stable fields equal; one advisory nested-count flip, §3.2.0).
- `st77` stored for all 13 pages as the next baseline.

**Open (need owners; sample values until then):** the pass window and the reissue policy (SRM); the rewards budget, prices and stock (SRM); the surplus partner, the dairy exclusion and the pickup deadline (food head); the Fruit bowl offer.

**File hygiene (report only):** root plugin data holds 14.9 MB, of which 13.8 MB is 338 old snapshot chunks from `st37` to `st75`. Earlier sections say those chunks were cleared, but they were not. Nothing was deleted; clearing them (keeping `st75` as the last old-format baseline) needs approval.

## Admin AD-5 / AD-6 · Content diet and Manage hub (2026-09-30)

The snapshot `st78` was taken first; it matched `st77` on every page. The brief asked to read `design/audit/design_intent.md` and its RULES block. The file did not exist, locally or on the remote. It was created from the owner's design-intent notes plus this brief's content-diet standard, which is its RULES section. Please confirm it or supply the intended RULES block.

**The standard (now in `design_intent.md` → RULES):**
- at most 3 blocks above the fold (hero, one thing that needs the admin, one row that goes deeper);
- rules behind a Rules pill that opens a sheet with at most 3 one-line rules;
- one scope pill instead of four-chip mess rows;
- lists of at most 3 rows plus "See all";
- one big number;
- at most 12 text layers at rest.

### Components (page 03)

| Component | Id | What |
|---|---|---|
| **BentoTile** (extended, flagged) | `100:1142` | An existing set (Half / Full, used by MS-C2). Rather than a second set with the same name, it gains **Size=Square** (172 × 172) and **Size=Wide** (353 × 132), both Kind=Text. They have an icon badge top-left (36 pt, `fill-quiet`), label and value grouped at the bottom, and a value in ML/Section 22 that wraps. New properties: **Icon** (instance swap, default fork.knife) and **Show lock** (default off; replaces the chevron). The Half / Full variants are untouched: MS-C2 was checked by render. The set grew to 1370 × 288, so its "Usage / BentoTile" board moved from x 12408 to **13000** (canvas only). |
| **ScopeSheet** (new) | `967:1838` | The MS-C1 row pattern: four ReasonPicker rows (Main Mess · Block A, North Mess · Block C, South Mess · Block B, Annexe), with one row set to Selected per use. **Show meal** adds the Breakfast / Lunch / Dinner control. |
| **RulesSheet** (new) | `967:1862` | At most three one-line rules: Rule 1–3 (text), Icon 1–3 (swap), Show rule 3. |

**Local compositions (not components; flagged as candidates):**
- the hub's black "Needs you" card (eyebrow plus three 44 pt rows with chevrons);
- the Surplus "Hero · Pickup" wrapper: ResultCard (still 4 slots, A.3) plus a 3-dot progress row and caption, inside one `hero-bg` card;
- the "Header controls" row (scope pill = MetaChip Tappable with fork.knife; Rules pill = EstimatePill On light, label "Rules");
- the "Evidence" / "Decision" / "Actions" / "Duplicates" groups.

### Screens (page 10)

- **AD-5-0 · Manage hub** (Success / Empty / Offline; x −1479 / −986 / −493, y 4800). Closes gap 114.
  - Large title "Manage", no Back (tab root).
  - Black **Needs you · 3** card: "Vote · Idli sambar on Sundays" → AD-5d; "Pass · Karan · reissue asked" → AD-6b; "Surplus · pickup by 3:00 PM" → AD-6d.
  - Bento: **Passes** (wide) 196 of 214; **Menu** 5 dishes; **Voting** 1 to decide; **Rewards** (wide) ₹2,370 of ₹5,000; **Surplus** Awaiting pickup; **People** Locked (lock, no chevron, no link, until AD-7).
  - Empty: no card, since nothing needs the admin (Voting 0 to decide, Surplus None today). Offline: banner plus cached tiles (188 of 214, ₹2,310, Not confirmed).
  - Flow start **Admin · Manage** now points here.
- **AD-5a Menu:** Back (→ hub) and a header **+** (Add dish → 5b Add, as H6 Add food). Scope pill "Main Mess · Lunch" → scope sheet with mess and meal. Dish cards widened to 333 pt (8 pt peek). **One** Wednesday tile (next week's removed). Voting row "Voting · 1 to decide". The eyebrows, the meal control and the Add dish button are gone from the surface. Empty: pill and EmptyState. Offline: banner and cards; the pill becomes a non-tappable label and there is no +.
- **AD-5b Edit / Add / Offline:** Rules pill → sheet (per serving, IFCT 2017, the 5% energy check). The PER SERVING eyebrow, the source chip and Cancel are removed (Back remains). Fields are grouped into three blocks: Dish, Nutrition, Save.
- **AD-5c Voting:** Rules pill → sheet (a vote never changes the menu; 48 h; Needs review opens with a logged reason).
  - Hero ResultCard Hold "Vote closed · Idli sambar on Sundays · **Advice only · you decide**" → AD-5d.
  - "Vote in progress · Masala dosa at breakfast · 2 d 6 h" (no chevron).
  - "New proposals · 3" → **AD-5c2**.
  - Empty: EmptyState. Offline: banner and hero.
- **AD-5c2 Proposals** (new; Success / Empty / Offline; x 6409 / 6902 / 7395):
  - The three-row criteria list is unchanged (the Stop row reads "No vote · 38 g fat a serving").
  - **Actions** group: "Open vote · Pongal on Tuesdays" and **"Review · Egg curry on Mondays"** → **Needs review sheet**: required reason ("Logged · the food head can see it") and Open vote Disabled until a reason is entered, using the AD-5d decline pattern. Closes gap 111.
  - **Duplicates** group: Wallet stack and Merge.
  - Offline: banner and list.
  - A chevron on the Needs-review row wrapped its title, so the review is a button, not a row tap.
- **AD-5d:** ResultCard "Closed Tue 13 Aug · Idli sambar on Sundays · 1,204 for · 388 against · 76% for". **Evidence:** the criteria chip. **Decision:** Approve, reason, Decline. The advice sentence and the eyebrow are removed; the rule is in the AD-5c sheet and hero.
- **AD-6a Passes:** scope pill "Main Mess" → scope sheet; Rules pill → sheet (one pass, window, "A reissue is for the next special · logged"). Hero ring 196 of 214, then the Karan exception card. The rule chips, eyebrows and subtitle are removed. Empty: pill "North Mess" and EmptyState. Offline: label pill, banner and hero (188).
- **AD-6b:** ResultCard. **Evidence:** "Biryani pass · expired unused 2:00 PM" and the desk-log chip. **Decision:** Reissue, reason, Decline.
- **AD-6c Rewards:** Rules pill → sheet (+5 answer before the cutoff; +2 rate a dish or answer a recheck; absences never cost points). Hero is the budget ring only. **Needs:** "Fruit bowl · 60 pts · Waiting for SRM sign-off" (Hold) → AD-6c2. Row **"Offers · 2 live"** → AD-6c2. The sample data has 2 live offers and 1 awaiting; the brief said "3 live".
- **AD-6c2 Offers** (new; Success / Offline): the three offer cards at 333 pt with an 8 pt peek, and dots.
- **AD-6d Surplus:** scope pill.
  - Hero: ResultCard "Awaiting pickup · Lunch surplus · **4 dishes** · Partner NGO · by 3:00 PM", then dots (done, done, current) and "2 of 3 steps · pickup next". No kg total.
  - One primary, **Log pickup**; row **"See dishes and steps"** → **AD-6d2**. Does not scroll (content ends at 700).
  - Offline: label pill, banner and hero (1 of 3 · waiting for the partner).
- **AD-6d2 Pickup detail** (new; Success / Offline): the four dishes (7 kg, 4 L, 3 kg, 60 pcs), "Curd kept back · dairy", and the full 4-step handover.
- **Sheets** (8, H14 pattern: background, Scrim, Dismiss → BACK, GlassSheet Medium with Close → BACK, Sheet Content, Home Indicator):
  - AD-5a scope (mess and meal); AD-5b rules; AD-5c rules; AD-5c2 Needs review;
  - AD-6a scope; AD-6a rules; AD-6c rules; AD-6d scope.
  - Background links under the scrim were cleared.

### Links (page 10: 71 → 127; +69, −13)

- Transition roles as §0.5.1: drill-in Move in 0.3; sheet open Dissolve 0.25; Back / Close / Dismiss BACK.
- **Scope-sheet selections use navigation SWAP** (Dissolve 0.25): Main Mess → the Success screen, Annexe / North / South → the Empty screen. The closed sheet leaves history, so Back returns to the screen the admin came from. R1a asks for approval before SWAP is used; please confirm. Rows with no destination frame are unlinked samples.
- **Removed (intended):** the old chip-row links (5a S/E, 6a S/E, 6d S/E); Add dish and Add first dish (now the header +); the three 5b Cancel links; the 5a Offline Voting row and the 6a Offline Karan row (Offline states were simplified).
- Every Back returns where it came from: 5a gained Back; the new screens and sheets use BACK. No dead chevrons: People has no chevron; the Offline scope pills are non-tappable labels.
- **Flow starts (D1):** Admin · Today, Admin · Issues, Admin · Insights, **Admin · Manage → hub**. The stopgaps Admin · Rewards and Admin · Surplus were removed, since the hub now gives them an entry.

### Checks

- **Density:** `admin_diet/density.md`. The 20 existing frames went from 345 to 182 text layers.
  - Target met everywhere except AD-5b (7 required fields), AD-5c2 Success (17; the list and duplicate stack must share the screen) and AD-6d2 (20; the detail holds 4 dishes and 4 steps, and rule 4 conflicts with it being the "see all").
- **R9b:** every scrolling frame's last item ends at y 728, 20 pt above the tab bar (hub 294, 5b 36 / 96, 5c2 8, 6d2 19 / 79). AD-6d does not scroll.
- **Numbers:** 196 / 214 (6a, hub), 188 / 214 Offline (6a, hub), ₹2,370 / ₹5,000 (6c, hub), ₹2,310 Offline (6c, hub), and 7 kg · 4 L · 3 kg · 60 pcs (6d2, the MS-D1 values) agree on every screen that shows them. Surplus shows "4 dishes", never a mixed-unit total.
- **Diff vs `st78`:**
  - Page 10: +72 nodes (18 frames, 54 labels / notes / chips); the 20 redesigned frames changed; nothing removed.
  - Page 03: +ScopeSheet, +RulesSheet; BentoTile set changed (w 778 → 1370, 4 → 6 variants); Usage / BentoTile moved.
  - Every other page unchanged, links included. `st79` stored.
- **Nested blind spot:** the diff can't see nested changes, so these were confirmed by render (`admin_diet/after/`, the before/after composites) and by a full link audit of every AD-5 / AD-6 frame.
- **Tools:** `tools/densitytool.js`, `tools/diethelp.js`, `tools/sheethelp.js` (also stored in `mealloop/*` plugin data).

## Admin AD-5 / AD-6 · Coupons, hub visuals, vote hero, fill floor (2026-09-30)

**Baseline:** snapshot `st80`, taken before any edit, matched `st79` on all 13 pages (links 7 / 7 / 1192 / 127, the same flow starts). `st81` is stored after the stage.

**Renders:** `www.figma.com` is blocked by this session's network policy, so the screenshot URLs could not be downloaded. The renders were saved through the base64 screenshot path instead (same renderer, 1×). They are in `admin_coupons/before/` and `admin_coupons/after/`. The composites `admin_coupons/<screen>_before_after.png` show Success, Empty and Offline, before and after, for the hub, Rewards, Voting, Passes and Surplus.

### Decisions applied (from the brief)

- Scope-sheet selections use navigation **SWAP** (R1a approved; gap 118 closed).
- **AD-5b** keeps all seven nutrition fields. It shows Energy, Protein, Carbs and Fat, and puts Fibre, Sugar and Sodium behind a "More nutrients" row.
- **AD-5c2:** the duplicate stack moves behind a "Look the same · 3" row. Detail screens (AD-6d2) may exceed the three-row rule.
- Proposals keep the separate "Review · Egg curry" button.
- The admin tab bar is wired in the linking stage, not here (gap 119 stays open). Gap 110 is not part of this stage.

### New rule: fill floor

Added to `design_intent.md` as rules 9–12:
- On every non-Empty screen, content at rest reaches at least 75% of the way down to the tab bar: the lowest content item ends at y 561 or lower on the screen, with the tab bar top at 748.
- The floor is reached by enlarging the hero number or the data visual, never by adding blocks.
- Empty and Offline states centre their message vertically.
- **Reading used (to confirm):** an Offline state that still shows cached data counts as non-Empty and meets the floor, with its banner at the top. An Offline state with no data is a message and is centred.
- The tool is `tools/filltool.js` (also stored as `mealloop/filltool`). The before/after table is in `admin_coupons/fill_floor.md`.

### Components (page 03, all at y 14100)

| Component | Id | What | Status |
|---|---|---|---|
| **CouponCard** | set `993:1881`: `State=Live` `993:1851`, `State=Awaiting` `993:1866` | A 353 × 80 ticket. Body (Name, one Fact line, exposed StatusPill `Tag`) and stub (Points in ML/Metric, "pts" in ML/Mono Footnote), joined by a dashed perforation (`border`, 1.5, dash 4/4). The notches are **boolean SUBTRACT cutouts** (card rectangle minus two 18 pt circles at the perforation x), so the canvas shows through. Live: `surface` fill, lime Success tag. Awaiting: no fill, dashed `ink-secondary` outline (5/4), grey type, Hold tag "Awaiting SRM". | **New, flagged** (named by the brief) |
| **NeedsYouCard** | `993:1882` | `hero-bg`, 353 wide. Number (ML/Hero Metric) and Label (ML/Hero Unit), then three equal outline chips (icon plus one word). Properties: Number, Label, Chip 1–3, Icon 1–3 (instance swap). | Promoted (gap 123, part) |
| **DemandRingCard** | set `995:1946`: `Size=Default` `764:84405` (the original component), `Size=Large` `995:1947` | Large: a 176 pt closed ring centred, the Number (ML/Hero Metric) and Unit inside, the Eyebrow above and the Line below. Same property names and arc layer names, so a variant swap keeps overrides. | **New variant, flagged** |
| **PrepCard** | set `995:1957`: `Size=Default` `814:87226` (the original component), `Size=Hero` `995:1958` | Hero: `hero-bg`, 333 wide. Status, Name, then a 112 pt P/C/F composition ring (lime / on-hero / on-hero-secondary, the KcalGauge language; arcs set per instance) beside the Quantity in ML/Hero Metric with a new **Unit** property, then Fact. | **New variant, flagged** |

- **Combining existing components into sets:** the property keys change (for example `Number#764:1` → `Number#995:1`), but every existing instance kept its values. This was tested on a throwaway component first. Instance counts: DemandRingCard Default 5, Large 4; PrepCard Default 29, Hero 15.
- **Canvas moves (page 03 only):** the two sets moved from (0, 12700) and (456, 13584) into free canvas, because the new variants would have overlapped their neighbours.
- **BentoTile `Size=Square` and `Size=Wide`** (added in the content-diet stage) now have **0 instances**. The hub tiles replaced them. They are kept; see gap 127.

### Local compositions (flagged, candidates for page 03 after review)

- **Metric tile** (hub): a `surface` card with radius 20. Wide is 353 × 132; Square is 172 × 172. Each has one mini visual, a big number (ML/Metric) with a unit (ML/Metric Unit), and a small label (ML/Mono Label), and nothing else.
  - **Passes:** 88 pt ring, `ink` arc on a `border` track.
  - **Rewards:** half-circle budget arc.
  - **Voting:** for/against bar made of two ChartBar instances (Expected / Off target, corner radius 0) in a clipped 140 × 10 bar.
  - **Menu:** 5 dots, 4 filled and 1 hollow for Curd (nutrition missing).
  - **Surplus:** 3 step dots.
  - **People:** lock badge, no link.
  - The tiles are local because a data bar cannot be resized inside an instance (AD-4.2).
- **Hero · Vote** (AD-5c Success and Offline, AD-5d):
  - `hero-bg`, padding 24.
  - StatusPill Hold tag, then "76%" (ML/Hero Metric) with "for".
  - A 305 × 10 bar of ChartBar Donated (lime) 229 pt and Left on plates 74 pt: 1,204 / 1,592 of 303 pt, rounded.
  - "1,204 for · 388 against", then the dish, then "Advice only · you decide" (5c only), then Button Secondary "Decide" (5c only).
- **Number row** inside AD-6d's `Hero · Pickup` ("4" ML/Hero Metric plus "dishes"). The ResultCard stays at 4 slots (A.3); its title is now "Lunch surplus".

### Screens (page 10)

**AD-6c Rewards**
- **Success and Offline:** the budget ring (unchanged: ₹2,370 of ₹5,000 · 63 juices · 12 ice creams; Offline ₹2,310 · 61 juices), then a **vertical** stack of four coupons (8 pt gap):

  | Coupon | Tag | Fact | Points |
  |---|---|---|---|
  | Juice | Live | ₹30 each · 57 left (Offline: 59 left) | 50 |
  | Ice cream | Live | ₹40 each | 80 |
  | Biryani plate | "Launches Fri" | ₹120 each · 0 claimed | 200 |
  | Fruit bowl | Awaiting SRM | Not shown to students yet | 60 |

- All four fit at rest (the last ends at y 718 / 722), so there is no "See all" and no scroll.
- The old "Fruit bowl" and "Offers · 2 live" rows were removed with their links.
- The Rules pill and the Rules sheet are unchanged. Empty: EmptyState centred.

**AD-6c2 Offers (Success, Offline)**
- Moved to **99 Archive** at (8800, 100) and (9293, 100), with their label, Moment note and sample chip.
- Renamed "Retired · …". Their 2 BACK links were removed, so the archive has 0 links. No link points at them.

**AD-5-0 Manage hub**
- **Success:** the NeedsYouCard ("3 · need you"; chips Vote → AD-5d, Pass → AD-6b, Pickup → AD-6d, drill-in 0.3), then metric tiles in the same bento sizes. Passes (wide) 196 of 214; Menu 5 dishes; Voting 76% for; Rewards (wide) ₹2,370 of ₹5,000; Surplus 4 dishes (2 done, pickup current); People Locked.
- **Empty:** no card. Voting shows "0 to decide" with an empty track; Surplus shows "0 dishes" with all steps hollow.
- **Offline:** banner, then 188 of 214, ₹2,310, Surplus with step 1 done and step 2 current.
- Tile links are unchanged in destination.

**AD-5c Menu voting**
- **Success:** Rules pill, Hero · Vote with Decide → AD-5d (the link moved from the card to the button), "Vote in progress", "New proposals · 3".
- **Offline:** banner, then the hero with Decide **disabled** and no link. The old Offline card → AD-5d link is removed, because deciding needs a connection.

**AD-5d:** Hero · Vote with the tag "Closed Tue 13 Aug" and no button replaces the ResultCard. Evidence and Decision are unchanged.

**AD-6a Passes (Success, Offline):** the hero instance is swapped to DemandRingCard `Size=Large`. Arc: 196/214 (Success) and 188/214 (Offline).

**AD-6d Surplus (Success, Offline):** the hero has the big "4 dishes". The dots and caption are unchanged.

**AD-5a Menu (Success, Offline)**
- The five dish cards are PrepCard `Size=Hero`. Quantity and Unit come from the old "110 kcal" strings.
- Rings use 4P / 4C / 9F of the Stage 2.1 values. Curd shows the track only (nutrition missing).
- The swipe clip is 260 tall.

**AD-5b (Edit, Add, Offline)**
- Field rows 3–4 are replaced by a destination row "More nutrients". Reason: "Fibre 4 g · sugar 3 g · sodium 420 mg" on Edit and Offline, "Not filled yet" on Add.
- The removed field instances moved into the new sheets.

**AD-5c2 Proposals**
- **Success and Offline:** the three proposals are full-width PrepCards (Default): pill, name, students (ML/Metric) and the criteria fact.
  - Pongal on Tuesdays · Meets criteria · 47 students · 290 kcal · veg
  - Egg curry on Mondays · Needs review · 64 students · 18% over budget
  - Fried chicken daily · Doesn't qualify · 51 students · No vote · 38 g fat a serving
- **Success only:** the Actions group ("Open vote · Pongal", "Review · Egg curry" → Needs review sheet) is unchanged. The duplicate stack is replaced by the row **"Look the same · 3"** → Look the same sheet.

**New sheets** (H14 pattern via `sheethelp`; each with a label, Moment note and sample chip)

| Sheet | Id | Position | Content |
|---|---|---|---|
| AD-5c2 · Look the same sheet | `1005:4562` | (8381, 4800) | Wallet stack and "Merge 3 into one" |
| AD-5b · More nutrients sheet | `1005:4734` | (8874, 4800) | Fibre 4, Sugar 3, Sodium 420 |
| AD-5b · More nutrients sheet (Add) | `1005:4865` | (9367, 4800) | Blank fields |

**Empty states centred** (rule 10): 5a, 5c, 5c2, 6a, 6c and 6d. The EmptyState centre is within 0–1 pt of the middle of the free band. This was done with the content column's top padding or gap only; no node was added.

**Sheet backgrounds refreshed:** the backgrounds of 8 existing sheets were re-cloned from their current screens, with links stripped, so the dimmed screen behind matches. The 8 sheets are AD-5a scope, 5b rules, 5c rules, 5c2 Needs review, 6a scope, 6a rules, 6c rules and 6d scope. Their Close, Dismiss and scope-row links are unchanged.

### Links (page 10: 127 → 132; +29, −24)

- **Re-wired, same destination and transition (18):**
  - 15 hub tiles across the three states (the tiles are new nodes).
  - 3 Needs-you rows → 3 chips.
- **New (11):**
  - 3 × "More nutrients" (Edit and Offline → Edit sheet, Add → Add sheet; Dissolve 0.25).
  - "Look the same · 3" → sheet (Dissolve 0.25).
  - 6 sheet Close / Dismiss → BACK.
  - AD-5c Decide → AD-5d (drill-in; it replaces the card link).
- **Removed (6):**
  - AD-5c Success card (moved to Decide).
  - AD-5c Offline card (Decide disabled).
  - Rewards "Fruit bowl" and "Offers" → AD-6c2.
  - AD-6c2 Success / Offline Back.
- The Fruit bowl coupon has **no link**: its row's only destination was the archived Offers screen. It has no chevron, so rule 8 holds.
- Flow starts are unchanged: Admin · Today, Issues, Insights, Manage.
  - **D1:** Figma auto-created "Flow 1" on hub Offline when the tile links were added; it was removed straight away.
  - Every script that added links re-checked the page's starts.

### Checks

- **Fill floor:** 16 misses before (18 with the archived Offers screens), 0 after. See `admin_coupons/fill_floor.md`.
- **R9b:** every scrolling frame ends its last item at y 728 at max scroll (hub 297 / 94 / 154, 5c2 182 / 50). Rewards fits without scrolling (718 / 722).
- **Numbers** (scripted text check):
  - 196 of 214: hub Success and Empty, 6a Success.
  - 188 of 214: hub Offline, 6a Offline.
  - ₹2,370 of ₹5,000 with 63 juices and 57 left: hub, 6c Success.
  - ₹2,310 with 61 juices and 59 left: hub Offline, 6c Offline.
  - 4 dishes: hub, 6d Success and Offline. 7 kg · 4 L · 3 kg · 60 pcs: 6d2 Success and Offline.
  - 76% and 1,204 / 388: hub, 5c, 5d.
  - All agree.
- **Diff vs `st80`:**
  - Page 10: +12 nodes (3 sheets, 9 annotations); −8 (AD-6c2 and its annotations, moved to Archive); 25 frames changed.
  - Nested-only changes don't show in the frame signature: the AD-6a hero swap, the six Empty centrings and the AD-6c Empty padding. They were confirmed by render and by the fill tool.
  - Page 03: +CouponCard, +NeedsYouCard. DemandRingCard and PrepCard are now sets (new top-level ids; the old component ids live on as the Default variants). Advisory nested counts only otherwise (§3.2.0).
  - 99 Archive: +8 nodes, 0 links.
  - Pages 00–02, 04–09: unchanged, links included (7 / 7 / 1192, page 09 0).

### Logged, not built

- Student coupon wallet: buy with points, show a QR (gap 124).
- Mess-staff coupon redeem, reusing the pass desk (gap 125).
- Per-student purchase limits, undecided (gap 126).

## Admin AD-7 · People, access and audit (2026-09-30)

**Baseline:** snapshot `st82`, taken before any edit, matched `st81` on all 13 pages. `st83` is stored after the stage. Renders (1×, base64 screenshot path, since `www.figma.com` is blocked) are in `admin_ad7/`, with the composite `admin_ad7/ad7_section.png`.

**Roles and sample:**
- 38 people: kitchen staff 14, attendance scanners 8, special-pass checkers 6, supervisors 6 (mess-side, one mess each), food heads 2 and admins 2 (admin-side).
- Staff identity uses the masked format: Ravi · •••4417 (supervisor, existing), Meena · •••2291 (kitchen staff, existing, MS-D4), Admin · •••0912 (existing, AD-3b). **New sample:** Suresh · •••3306 (pass checker, North Mess) and Lakshmi · •••7182 (new kitchen staff, Main Mess).
- Students appear only as masked IDs inside incident entries: •••2231 (the biryani report) and •••0733 (the pass-desk incident).

### Components

- **ScopeSheet** (`967:1838`, flagged): a new boolean **Show all messes** (default off) adds an "All messes" row above the four messes. The 3 existing instances are unchanged (232 / 232 / 288 pt).
- **Nothing else new on page 03.**
- **Reused:** ScopeSheet, RulesSheet, GlassSheet (Medium, and Large for the type sheet), StatusPill, ChartBar, ResultCard and the AD-5d / AD-6b decision pattern (cloned from AD-6b), MetaChip (Tappable, On light, On dark), SettingsRow Toggle On/Off, ReasonPicker, FormField, Button, EmptyState, OfflineBanner, and the destination row.
- **NeedsYouCard and PrepCard were considered and not used:**
  - A second black NeedsYouCard would compete with the People hero (FA-2b).
  - Person rows need a role tag plus four permission cells, which PrepCard doesn't carry.

### Local compositions (flagged, candidates for page 03 after review)

- **Role-bar hero** (AD-7a):
  - `hero-bg`, with "38" (ML/Hero Metric) and "people".
  - A 313 × 12 bar of 6 ChartBar segments, widths from the data by largest remainder, 2 pt gaps: 111 / 64 / 48 / 48 / 16 / 16. Kinds: Donated (lime), Never served, Left on plates, Off target, Donated at 40%, and an outline segment for Admins.
  - A two-column legend (each column is one 3-line text layer beside 3 swatches).
  - "See all people" at the foot.
- **Mini role bar** (hub People tile): the same 6 segments on white, 48 / 27 / 21 / 20 / 7 / 7 of 140. Kinds: Expected, Off target, Left on plates, then the same three at 50%.
- **Permissions matrix** (staff list):
  - A white card with a header row of 4 icons (Supervisor `person.crop.circle`, Kitchen `fork.knife`, Scanner `qrcode`, Pass checker `ticket`).
  - Person rows: name with masked ID; role tag (MetaChip On light) with the mess; 4 dot cells; chevron.
  - Dots: filled `ink` = has the permission; hollow `border` = doesn't; **lime with an ink outline = requested** (lime marks the thing that needs the admin).
- **Activity hero** (audit log): "6 entries today" and an hourly ChartBar histogram (10 AM 1 · 11 AM 1 · 12 PM 3 · 1 PM 1 lime (latest) · 2 PM none), with one axis line. *Superseded by the AD-7d redesign below: one dot per entry.*
- **Audit row:** a 36 pt icon badge (type icon), the action, a mono "time · actor" line and a chevron. *Superseded by the AD-7d redesign below: AuditRow on a time rail.*

### Screens (page 10, section "AD-7 · People, access and audit", frames at y 7200, sheets at y 8400)

| Frame | Id | Content |
|---|---|---|
| AD-7a · People (Success) | `1015:6573` | Large title and Back. Scope pill "All messes" → scope sheet. Role-bar hero, whose "See all people" → staff list. Needs row "2 access requests · Suresh · Lakshmi" (Hold "To decide") → AD-7c Suresh. Row "Audit log" → AD-7d. |
| AD-7a · People (Empty) | `1015:6715` | Pill "Annexe", then EmptyState "No staff added yet", centred (offset 0). Reached from the scope sheet (Annexe, SWAP). |
| AD-7a · People (Offline) | `1015:6857` | Label pill, banner "Offline · people saved at 2:12 PM", hero, and Audit log (→ AD-7d Offline). No requests row, because deciding needs a connection. |
| AD-7b · Staff list (Success) | `1015:6999` | Scope pill (→ AD-7b scope sheet) and the permissions matrix (Ravi → Person; Suresh → AD-7c Suresh; Lakshmi → AD-7c Lakshmi), then "See all · 38" → Staff by role. |
| AD-7b · Staff list (Offline) | `1015:7141` | Label pill, banner and matrix (Ravi → Person Offline, Suresh → AD-7c Offline). Lakshmi's row has no chevron (no offline request screen). No "See all", to stay within 12 text layers. |
| AD-7b · Staff by role | `1015:7283` | Six role rows, "Kitchen staff · 14" and so on, each with a ChartBar share-of-38 bar (321 × 12). No chevrons: per-role lists are not built. |
| AD-7b · Person — Ravi (Success) | `1015:7377` | Rules pill → rules sheet. Hero: role tag, "Ravi · •••4417", "Main Mess · permissions apply here only". Four toggles (Supervisor on, Kitchen staff on, Attendance scanner off, Special-pass checker off). **Save changes disabled.** "Remove access" → remove sheet. |
| AD-7b · Person — Ravi · changed | `1015:7471` | Attendance scanner on, the required reason field filled ("Covers the North Mess scanner desk"), and **Save changes enabled** → staff list. Remove access is hidden while an edit is open. |
| AD-7b · Person — Ravi (Offline) | `1015:7565` | Banner "Offline · editing needs a connection", hero, toggles dimmed to 50% (disabled), no buttons. |
| AD-7c · Access request — Suresh | `1015:7659` | AD-6b pattern: ResultCard Hold "Needs your decision · Suresh · •••3306 · Asks for scanner rights · North Mess". Evidence: "Now a pass checker · North Mess" and the chip "Scanner rights · North Mess only". Decision: "Approve · add scanner rights" (→ BACK), reason (required; "Suresh sees this reason"), Decline disabled. |
| AD-7c · Access request — Lakshmi | `1015:7753` | "Lakshmi · •••7182 · New kitchen staff · Main Mess", "No MealLoop access yet", chip "Kitchen staff · Main Mess only", "Approve · give kitchen access". |
| AD-7c · Access request (Offline) | `1015:7847` | Banner "Offline · decisions need a connection", request card, and the decision block with Approve and the field disabled. No evidence block (3 blocks). |
| AD-7d · Audit log (Success) | `1015:7941` | Type pill "All types" → type sheet, activity hero, the 3 newest rows (each → its entry sheet), "See all · 6" → All activity. |
| AD-7d · Audit log (Empty) | `1015:8083` | EmptyState "No activity yet", centred (offset 1). |
| AD-7d · Audit log (Offline) | `1015:8225` | Label pill, banner "Offline · log saved at 2:12 PM", hero, 3 rows (read-only, still open their sheets). |
| AD-7d · All activity | `1015:8367` | Inline title and Back, the hero, and all 6 rows. *Since the AD-7d redesign: no hero; the rail with times and titles only.* |

**Sheets:**

| Sheet | Id | Content |
|---|---|---|
| AD-7a · Scope sheet | `1021:5906` | "Show people for", ScopeSheet with All messes. All messes → AD-7a (SWAP); Annexe → AD-7a Empty (SWAP); Main, North and South are unlinked samples. |
| AD-7b · Scope sheet | `1021:6063` | All messes → staff list (SWAP). |
| AD-7b · Rules sheet | `1021:6257` | Nobody edits their own permissions · The last admin can't be removed · Every change or removal needs a reason · logged. |
| AD-7b · Remove access sheet | `1021:6400` | "Ravi · •••4417 · Main Mess", "Reason to remove (required)", "Logged · the food head can see it", and Remove access disabled until a reason is given. |
| AD-7d · Type sheet | `1021:6537` | Large detent: All types (selected → BACK), Approvals, Overrides, Edits, Corrections, Incidents. The filtered views are unlinked samples. |
| AD-7d · Entry — … (six sheets) | `1021:6692` … `1021:7408` | One per entry; the facts are in the table below. |

### Audit-log facts (each traced to the screen it comes from)

| Row (newest first) | Type | Sheet facts | Source |
|---|---|---|---|
| Biryani report assigned · 1:32 PM · Admin · •••0912 | Incidents | Open → assigned to Ravi · •••4417; Foreign object reported · 1 report; notified Ravi · safety queue; reported by Student · •••2231 · 1:25 PM | AD-3b resolution log and report card |
| Sambar fix · salt cut · 12:52 PM · Ravi · •••4417 | Corrections | Too salty → salt cut by a third; 6 reports · too salty; approved by Ravi · 12:52 PM; notified Admin · Issues · recheck Fri lunch | MS-D3a, MS-D4, AD-3c |
| Pass desk offline · 12:41 PM · Main Mess desk | Incidents | Pass unused → reissue asked; desk offline from 12:40 PM; notified Admin · needs your decision; student •••0733 · turned away 12:41 PM | AD-6b |
| Waste logged · lunch · 12:40 PM · Meena · •••2291 | Edits | Plate waste → 18 kg · weighed; logged by Meena; unserved calculated from served counts | MS-D1a, MS-D4 |
| Curd 60 → 45 L · pending · 11:05 AM · Ravi · •••4417 | Approvals | 60 L → 45 L · awaiting approval; until then the kitchen cooks 60 L; notified the food head (decides) | MS-D4, MS-E, AD-1b |
| Sambar 42 → 50 L · 10:47 AM · Ravi · •••4417 | Overrides | 42 L → 50 L; staff event; food head notified 10:47 AM | MS-C4a, MS-D4 |

**Deviations from the brief, to keep facts matching screens:**
- **Biryani time:** the brief said "assigned to Ravi, 1:25 PM", but AD-3b shows the report received at 1:25 PM and assigned at **1:32 PM** by Admin · •••0912. The row uses 1:32; the sheet shows the 1:25 report.
- **Karan:** the brief's "Karan pass" row shows a student name, which the no-students rule forbids. It is logged as the pass-desk **incident**, with the student as •••0733 only.

### Hub

The locked People tile is replaced on all three hub states by a metric tile: the mini role bar, "38 people", label "People". It links to AD-7a (Success and Empty hubs) and AD-7a Offline (Offline hub). "3 need you" is unchanged; access requests appear inside People, not on the hub.

### Links (page 10: 132 → 214; +82, −0)

- **Hub:** 3 (People tiles, newly linked).
- **AD-7a:**
  - Success: 5 (Back, scope, See all, requests, audit).
  - Empty: 2 (Back, scope).
  - Offline: 3 (Back, See all, audit).
- **Staff list:** Success 6 (Back, scope, 3 people, See all); Offline 3 (Back, 2 people).
- **Staff by role:** 1 (Back).
- **Person:**
  - Rest: 4 (Back, Rules, scanner toggle → changed, Remove access).
  - Changed: 4 (Back → staff list, fixed; Rules; scanner toggle → rest; Save → staff list).
  - Offline: 2 (Back, Rules).
- **AD-7c:** Suresh 2 and Lakshmi 2 (Back, Approve → BACK); Offline 1 (Back).
- **AD-7d:**
  - Success: 6 (Back, type, 3 rows, See all).
  - Empty: 1.
  - Offline: 4 (Back, 3 rows).
  - All activity: 7 (Back, 6 rows).
- **Sheets:** 26 (Close and Dismiss ×11, 3 scope selections, 1 type selection).
- **Transitions:**
  - drill-in Move in 0.3;
  - sheet open Dissolve 0.25;
  - scope selections Dissolve 0.25 with **SWAP** (approved);
  - Person state change Dissolve 0.25;
  - Person-changed Back and Save are fixed Move out right 0.3 to the staff list (R1b / R1c). This is the only fixed Back: the changed state is a state of the same screen, so BACK would land on the unchanged state instead of the list.
- **Flow starts:** still exactly Admin · Today, Issues, Insights and Manage. D1: Figma auto-created "Flow 1" and "Flow 2" when links were added to AD-7a; both were removed in the same script, and every later script re-checked.

### Checks

- **Fill, density and blocks:** all 16 AD-7 screens meet the floor (76–98%), and both Empty states are centred (offsets 0 and 1). See the table in `admin_ad7/fill_density.md`.
  - Every screen has at most 3 blocks.
  - Every screen has at most 12 text layers, except **AD-7d · All activity (16)**, the "see all" detail.
  - The legends on AD-7a are two 3-line text layers, so they count as 2 layers but show 6 visible items.
- **Back:** every Back is BACK, except the Person-changed fixed link above.
  - No AD-7 frame is entered by a timer.
  - Every sheet closes with BACK.
  - The link-graph audit found every screen reachable except **AD-7d Empty**, which is a design state like AD-6c Empty, AD-5c2 Empty and the hub Empty (gap 134).
- **Diff vs `st82`:**
  - Page 10: +109 nodes (the section, 16 screens, 11 sheets, 81 labels / Moment notes / sample chips); changed: the three hub frames only.
  - Page 03: ScopeSheet only (one hidden row plus the property; advisory nested counts otherwise).
  - Pages 00–02, 04–09 and 99: unchanged, links included (7 / 7 / 1192 / 0).

## Admin AD-7d redesign · The audit log as a timeline (2026-09-30)

**Brief:** redesign AD-7d (Success, Empty, Offline, All activity, and the six entry sheets). The data, facts and links stay the same, and so do the fill floor and the content diet. The new rule 13 in `design_intent.md` reads: "A log is a timeline. Rows are quiet unless they are exceptions. Mono is for numbers, times and IDs only."

This section replaces the AD-7 activity hero, the audit row and the entry-sheet layout described above. The facts table above still applies.

### New component (flagged): AuditRow `1028:1887`

- **Where:** page 03 at (0, 14600), with variants `State=Done / Pending / Incident`.
- **Why it is new:** TimelineStep (`81:872`) has no time column, so a small new row was built rather than force-fitting it. It reuses TimelineStep's rail styles: a 2 pt `border` line and a 12 pt node.
- **Layout (321 wide, gap 12):**
  - Time column (64 wide): ML/Mono Footnote, ink-secondary.
  - Rail (16 wide, fills the row height): the node, then a line that grows to the row bottom.
  - Body: the title (ML/Secondary Medium, Inter Medium 15, ink) and an exposed StatusPill.
- **Properties:** `Time`, `Title`, `Show pill`, `Show line`, `State`.
- **Nodes:**
  - Done: lime with a lime-outline stroke.
  - Pending: hollow, ink-secondary 1.5 pt stroke.
  - Incident: solid ink.
- **Spacing:** the gap between rows is set by the Body's bottom padding: 24 pt plus 1 pt per minute to the next older entry. The space on the rail shows time; the longest gap is the 95-minute quiet morning on All activity. The last row in a list has no line.

### Hero (Success and Offline)

- "**6** entries today": the 6 in ML/Hero Metric on-hero, the rest in ML/Card Heading on-hero-secondary.
- One strip on the next line:
  - Left: 6 dots (14 pt) joined by 16 × 2 links at 50% on-hero-secondary.
  - Right: "**1** pending", ML/Secondary with the 1 in ML/Mono Body. Putting it on the dots' line keeps See all above the tab bar.
- **Dot order: newest first** (left = newest), the same order as the list. Dots 1–3 are the three rows below; dots 4–6 are the entries behind See all. The brief said "time order"; this is reverse time order, chosen so the dots map one to one onto the rows as you read them. It can be flipped.
- **Dot colours:** lime = done, hollow = pending, white = incident.
  - In the list, an incident node is solid ink instead, because white is invisible on the white card.
  - Done and pending look the same in both places.

### Rows (row frames kept with the same ids and names, so every link is unchanged)

| Time | Title | State | Pill (Success / Offline only) | Actor (now in the sheet) |
|---|---|---|---|---|
| 1:32 PM | Biryani report assigned | Incident | Stop "Safety" | Admin · •••0912 |
| 12:52 PM | Sambar salt cut | Done | – | Ravi · •••4417 |
| 12:41 PM | Pass turned away | Incident | Offline "Desk offline" | Main Mess desk |
| 12:40 PM | Lunch waste logged | Done | – | Meena · •••2291 |
| 11:05 AM | Curd cut to **45** L | Pending | Hold "Pending" | Ravi · •••4417 |
| 10:47 AM | Sambar raised to **50** L | Done | – | Ravi · •••4417 |

- **Routine rows have no pill.**
- **Where the pills show:** only Success and Offline show pills, and they list only the 3 newest rows. The curd row's Hold pill is set but is not visible at rest, because All activity shows times and titles only. Its hollow node still marks it as pending.
- **Chevrons:** there are none. The whole row is the tap target, and each row still opens its sheet.
- **Mono:** only the times and the digits in titles ("45", "50") are mono. Units stay in Inter.

### Screens

| Frame | Id | Content (at rest) |
|---|---|---|
| AD-7d · Audit log (Success) | `1015:7941` | Type pill, hero (234–363), rail card with the 3 newest rows (375–661), See all · 6 (673–725). |
| AD-7d · Audit log (Empty) | `1015:8083` | Unchanged: EmptyState "No activity yet", centred (+1). |
| AD-7d · Audit log (Offline) | `1015:8225` | Type pill, banner, hero (294–423), rail card with 3 rows (435–721). |
| AD-7d · All activity | `1015:8367` | Inline title and Back. No hero. A rail of 6 rows with times and titles only (110–579). |

### Entry sheets (GlassSheet Medium; the title is the subject)

Each sheet leads with the change as a big line:
- A number uses ML/Hero Metric. The old value and the arrow are ink-secondary, and the arrow and unit use ML/Hero Unit.
- Words use ML/Large Title.

Below the big line are at most 3 lines:
- the reason (ML/Body, ink);
- who and when (ML/Secondary, ink-secondary);
- one more fact (ML/Secondary, ink-secondary).

IDs, times and numbers in these lines are ML/Mono Body. The CHANGE / REASON / NOTIFIED caps labels are gone.

| Sheet | Id | Title | Big line | Lines |
|---|---|---|---|---|
| Biryani | `1021:6692` | Biryani · safety queue | Assigned to Ravi | Foreign object · 1 report at 1:25 PM / Admin · •••0912 · 1:32 PM / Reported by •••2231 · Ravi •••4417 notified |
| Sambar fix | `1021:6831` | Sambar fix | Salt cut by a third | 6 reports said too salty / Approved by Ravi · •••4417 · 12:52 PM / Admin notified in Issues · recheck Friday lunch |
| Pass desk | `1021:6970` | Pass desk offline | Reissue asked | Desk offline from 12:40 PM · pass unused / Main Mess desk · 12:41 PM / Student •••0733 turned away · you decide |
| Waste | `1021:7109` | Lunch waste | 18 kg | Plate waste, weighed / Logged by Meena · •••2291 · 12:40 PM / Unserved is calculated from served counts |
| Curd | `1021:7257` | Curd · pending | 60 → 45 L | Kitchen cooks 60 L until approved / Asked by Ravi · •••4417 · 11:05 AM / Food head notified · they decide |
| Sambar override | `1021:7408` | Sambar override | 42 → 50 L | Staff event / Ravi · •••4417 · 10:47 AM / Kitchen supervisor · food head notified |

**Fact mapping:** every fact in the facts table above is still present; a few were reworded to fit the 3-line limit.
- The row actor has moved into the "who and when" line.
- "Safety queue" has moved into the Biryani title.
- "Awaiting approval" and "until then" have become "until approved".
- "Needs your decision" has become "you decide".
- **Curd has no recorded reason** (none was ever given), so its first line is its status. No reason was invented.

**Backgrounds:** refreshed from the redesigned screens.
- The Biryani, Sambar fix and Pass desk sheets and the type sheet use Success.
- The Waste, Curd and Sambar override sheets use All activity.
- Every link in the background layers was stripped, including the nav Back inside the background.

### Checks

- **Fill:** Success 97%, Offline 96%, All activity 77%. Empty is still centred (+1). See `admin_ad7d/fill_density.md`.
- **Density:** Success 13, Offline 13, All activity 13 (was 16); sheets 5 each (were 7 to 9).
  - The three 13s each come from items the brief asked for: two exception pills and the "1 pending" subline on Success and Offline, and the nav title plus 6 × 2 on All activity.
  - Options to reach 12:
    - drop the "1 pending" subline (the hollow dot already shows it);
    - show 2 rows on Success and Offline;
    - use hour markers on All activity.
  - Not applied; waiting for a decision (gap 142).
- **Mono audit:** no name or sentence is set in mono. "See all · 6" and the banner time are Inter, set by their shared components.
- **Diff vs `st84` (snapshot `st85`):**
  - **Page 10:** 331 nodes, +0 / −0 nodes. Ten frames changed: Success, Offline, All activity, the type sheet and the six entry sheets. Links: 214, +0 / −0. Flow starts are still exactly Admin · Today, Issues, Insights and Manage.
  - **Page 03:** +1 node (AuditRow).
  - **Every other page:** unchanged, links included (04 / 05 / 07: 7 / 7 / 1192; page `44:2`: 139).
- **Renders:** `admin_ad7d/before/`, `admin_ad7d/after/` and `admin_ad7d/before_after.png`.

### AD-7d pass 2 (2026-09-30)

**Brief:** remove "1 pending"; All activity must be at 12 text layers or fewer; mark "now" at the first dot; cap rail gaps at 80 pt with a break marker; the curd sheet has no reason line.

**Decisions by the owner** (asked before building, because the literal item 2 would have broken the pass's own checks):
- **All activity → hour markers**, not "2 rows + See all". Taken literally, item 2 would have caused four problems:
  - See all would have had no target.
  - The Waste, Curd and Sambar override sheets would have been orphaned.
  - Fill would have dropped to about 47%.
  - The capped gap would have been hidden.
- **"now" is a non-text marker.** A "now" text layer would have kept Success and Offline at 13.

**Changes:**
- **Hero (Success, Offline):** "1 pending" removed and the dots kept, newest first.
  - A 24 pt ring ("Now · halo on the newest dot", 1.5 pt on-hero-secondary) is centred on the first dot. It has no text.
  - The ring is absolutely positioned, so the strip stays 14 pt tall and the hero is 122 pt tall (was 129).
- **AuditRow `1028:1887`:** two new booleans.
  - `Show time` (default on) hides the time text while keeping the column width.
  - `Show break` (default off) shows "Break": two short slanted ink-secondary strokes (1.5 pt, 12 × 8). A second rail line ("Line · after break") follows it, so the break sits mid-gap.
- **Rail spacing** (the gap below each row, all three screens): min(32 + 1 pt per minute, 80). The last row is 24.
  - Where the cap applies, `Show break` is on. Today that is only the 12:40 PM row on All activity (95 minutes, so 80 pt plus the break).
  - The base went from 24 to 32 so that All activity stays above the floor under the cap.
- **All activity:** hour markers in the time column (1 PM, 12 PM, 11 AM, 10 AM). The 12:41 and 12:40 rows hide their time. All 6 rows and their links stay. There are still no pills.
- **Curd sheet `1021:7257`:** the reason line was removed. Three ML/Secondary lines remain: "Asked by Ravi · •••4417 · 11:05 AM", "Food head notified · they decide", "Kitchen cooks **60** L until approved". The missing reason is logged as gap 147.
- **Sheet backgrounds:** refreshed from the new screens, and the background links stripped again.

**Checks:**

| Screen | Fill | Texts | Blocks |
|---|---|---|---|
| Success | 98% (See all ends at y 734) | 12 | 3 |
| Empty | centred (+1), unchanged | 3 | 1 |
| Offline | 98% (y 730) | 12 | 3 |
| All activity | 76% (y 572) | 11 | 1 |
| Entry sheets | – | 5 each | – |

- **Diff vs `st86` (snapshot `st87`):**
  - **Page 10:** 331 nodes, +0 / −0 nodes. Ten frames changed: Success, Offline, All activity, the type sheet and six entry sheets. Links: 214, +0 / −0. Flow starts: still exactly Admin · Today, Issues, Insights and Manage.
  - **Page 03:** reads as unchanged, because the snapshot tool signs top-level nodes only; the AuditRow edit is nested (gap 149).
  - **Every other page:** unchanged, links included.
- **Renders:** `admin_ad7d/pass2/before/`, `admin_ad7d/pass2/after/` and `admin_ad7d/before_after_pass2.png`.

## Admin AD-5c2 redesign · Proposals as one ranked card (2026-09-30)

**Brief:**
- Replace the three tall proposal cards with one black card of ranked bars. The data and links stay the same.
- Show status with an icon plus a bar style, never colour alone. Mono is for numbers only.
- Targets: 3 blocks, 12 texts or fewer, and fill of 75% or more.

**Order:** the brief asked for this after, or inside, the Trends and Forecast chart pass, because it reuses ChartBar's Pill variant.
- That pass has not run, and ChartBar had no Pill variant.
- The owner chose to add the Pill kinds now, in this pass, for the chart pass to reuse.

### ChartBar (page 03): new kinds

Three kinds, each radius 4, 120 × 8 by default, with the instance width resized to the data:

| Kind | Id | Look |
|---|---|---|
| Pill | `1057:1857` | on-hero fill (white, for dark cards) |
| Pill lime | `1057:1858` | lime fill |
| Pill ghost | `1057:1859` | no fill; dashed on-hero-secondary outline, 1.5 pt, dash 4/3, inside |

The existing kinds and instances are untouched. The set description now documents the Pill kinds.

### Screen

- **Card "3 proposals":**
  - Black (hero-bg), radius 24, padding 20.
  - The title is ML/Section, Inter only (no mono).
  - Rows are ranked by students.

  | Rank | Row | Icon | Bar | Status |
  |---|---|---|---|---|
  | 1 | Egg curry on Mondays · **64** students | clock (white) | Pill, 285 pt | Needs review |
  | 2 | Fried chicken daily · **51** students | xmark (on-hero-secondary) | Pill ghost, 227 pt | Doesn't qualify |
  | 3 | Pongal on Tuesdays · **47** students | checkmark (lime) | Pill lime, 209 pt | Meets criteria |

- **Row type:**
  - The name is ML/Secondary Medium.
  - The count is ML/Secondary, with only the number in ML/Mono Body.
- **Bars:**
  - Bars start under the name, on an 18 + 10 pt icon indent.
  - Width = 285 × students ÷ 64.
- **Status:** each status is shown three ways: icon shape, bar style (solid, dashed ghost, lime) and colour. There is no status text, and colour is never the only cue.
- **Note under the card:** "Fried chicken · no vote · **38** g fat a serving". It sits in one group with the card, so the card and note count as one block.
- **Below the note:** the two buttons, unchanged ("Open vote · Pongal on Tuesdays", and "Review · Egg curry on Mondays" → Needs review sheet), then "Look the same · 3" → its sheet. Links are unchanged.
- **Where the facts went:**
  - "18% over budget" is in the Needs review sheet, which the Review button opens. It was already there.
  - "38 g fat a serving" is in the note, which is Fried chicken's only home, because it has no action or sheet.
  - "290 kcal · veg" left AD-5c2. It is still on AD-5d, the Pongal vote result. "Open vote" has no link and no sheet, so it cannot carry the fact without changing the button (gap 150).
- **Offline:** the banner, the same card and note (saved data), and the two buttons in `State=Disabled` with no links. There is no Look the same row, as before. The Empty screen is unchanged.
- **Sheet backgrounds:** the Needs review and Look the same sheets now show the new Success screen, with background links stripped.

### Checks

| Screen | Fill | Blocks | Texts |
|---|---|---|---|
| Success | 85% (y 634) | 3 | 12 |
| Offline | 84% (y 630) | 3 | 12 |
| Empty | centred (+1) | 1 | 3 |

- **Bars:** every bar is within 0.3 pt of its data width (see `admin_5c2/fill_density.md`).
- **Diff vs `st90` (snapshot `st91`):**
  - **Page 10:** the two Proposals screens and their two sheets changed. 334 nodes, +0 / −0.
  - **Links:** 214, identical, including the Review → Needs review sheet link (Dissolve 0.25). **Flow starts:** identical.
  - **Page 03:** ChartBar gained 3 kinds.
  - **Every other page:** unchanged.
- **Renders (scale 1):** `admin_5c2/before/`, `admin_5c2/after/` and `admin_5c2/before_after.png`.

## Page 10 layout grid (2026-09-30, position only)

- **Layout:**
  - One row per section (AD-1 to AD-7), and a sheet row directly below for AD-5, AD-6 and AD-7.
  - 80 pt between frames and 240 pt between rows. Every row starts at x 0, and all frames in a row share one y.
  - Labels, Moment notes and sample chips keep their offsets: (0, −36), (0, +868), (0, +940).
  - A section title sits above each row at row y − 80. The three sheet-row titles are new; the seven existing titles moved from −100.
- **Order:**
  - Each screen group runs Success, Empty, Offline, then its other variants, with groups in journey order.
  - The AD-5 hub now starts its row. 5c2 follows 5c.
  - Two groups were reordered to put states first: AD-7b Person is now Success, Offline, changed; AD-7c is now Suresh, Offline, Lakshmi.
  - Sheets are ordered by the screen that opens them.
- **Checks:**
  - The diff (`st89` vs `st88`) shows x and y changes only, on 327 nodes, plus the 3 new titles.
  - Links (214) and flow starts are identical, and no nodes overlap.
- **Record:** the full before/after table is in `admin_layout/positions.md`, and a low-zoom page screenshot is in `admin_layout/page10_overview.png`.

## Planned stage: Final audit (FA) (recorded 2026-09-30, not started)

**When:** after AD-7 (people, permissions, audit log), the student-track resume (link cleanup, overflow frames, Stage 4 verification, cosmetic clean-up, gap 110) and the linking stage (the role-select entry and the admin tab bar, gap 119).

**How:** read-only first. Every check reports a table before anything is fixed. Fixes then go in small stages, worst first, each with its own snapshot, diff and renders, like every earlier stage.

**Scope:** pages 04 Student Light, 07 Prototype & QA, 09 Mess Staff and 10 Admin. Page 05 is covered through page 04 (it is the Dark twin), and 99 Archive is out of scope.

### FA-0 Tooling (prerequisite)

- `tools/filltool.js` and `tools/densitytool.js` are written for page 10 only. They hard-code the page id (`811:21055`) and read the content column named `Admin / Content`.
- Before FA-1, generalise them:
  - take a page id;
  - find each frame's content column by structure, not name (student frames use names such as `tmp / Content` and `Waste / Content`);
  - take the floor reference per frame: the tab bar top (y 748) where there is a tab bar; the top of a sticky footer or Save bar where there is one (student Spending, H2–H5); the frame bottom less the home indicator on staff screens, which have no tab bar (A.1).
- Mark sheet frames, gallery states and full-scroll copies so they are reported separately.
- Store the tools in the repo and in `mealloop/*` plugin data, as before.

### FA-1 Fill and density

- Run the fill tool on every screen on pages 04, 07, 09 and 10.
- Report every non-Empty screen that is:
  - below the 75% fill floor (rules 9–11);
  - above 3 blocks at rest;
  - above 12 text layers at rest (rule 6).
- Also report Empty and message-only Offline states that are not centred (rule 10).
- **Note:** the fill floor and the content diet were written for admin. Applying them to student and staff screens is part of what this audit reports. Nothing on those pages is changed to meet them without a decision.

| Page | Screen | State | Fill % | Blocks | Text layers | Fails |
|---|---|---|---|---|---|---|

### FA-2 Card weight

Proposed thresholds, to be adjusted after the first run:

- **a.** Flag any card taller than 25% of the screen (213 pt of 852) that is not the hero.
- **b.** Flag any screen where two cards carry the same visual weight. Proposed test: the same fill family (black hero vs white card) and a height within 15% of each other, or two hero-size numbers.
  - The test compares **distinct cards only**. Siblings in one list, stack or swipe row (for example the Rewards coupons, the AD-5c2 proposal cards, a PrepCard swipe row, a Wallet stack) are never compared with each other.
  - A **hero-size number** means the 52 pt hero style (`ML/Hero Metric`, the HeroNumber scale). The 22–30 pt tile and card numbers (`ML/Section`, `ML/Metric`) don't count.
- **c.** Flag any card whose height comes from padding rather than content. Proposed test: vertical padding plus empty space is more than 40% of the card height, or more than 24 pt of empty space below the last child.
  - The test **skips Empty-state message cards** (EmptyState instances), whose padding is intended.

| Page | Screen | Card | Height | Share of screen | Rule (a / b / c) | Note |
|---|---|---|---|---|---|---|

### FA-3 Design-rule conformance

Report:
- detached instances (frames that were once instances);
- fills and strokes that are raw hex instead of bound variables (outside components' own internals);
- text without a text style;
- ListRow used where a distinctive pattern exists (dial, badge, swipe card, stacked cards, coupon; see `design_intent.md`);
- status colours outside Success / Hold / Stop / Offline / Sent;
- lime used as anything other than the accent: as text, as a full-card fill, or on a light surface without the ink outline where one is required.

| Page | Screen | Layer | Rule | What was found | Suggested fix |
|---|---|---|---|---|---|

### FA-4 Consistency

Report:
- numbers that disagree between screens (for example 196 / 214, ₹2,370 / ₹5,000, 642 kg, 71 g, 36 of 41, 870 kcal, the surplus quantities);
- dead chevrons;
- Backs that don't return where they came from (R1a / R1b / R1c; BACK on a frame entered by a timer);
- missing Moment notes or sample chips (pages 04, 09 and 10);
- stray flow starts (rule D1; compare each page against its approved list).

| Page | Screen | Issue | Expected | Found |
|---|---|---|---|---|

### FA-5 Integration

List the student screens that should adopt the admin patterns:
- **CouponCard:** the student Rewards and the future coupon wallet (gap 124);
- **NeedsYouCard:** a Home "needs you" moment (for example an unanswered meal plus a pending report);
- **the metric tile:** a bento tile with one visual, one number and one label (You tiles, the Home dashboard);
- **the fill-floor treatment:** a screen that would meet the floor by enlarging its hero.

This is a proposal list only; nothing is built from it without approval.

| Student screen | Pattern | Why | Effort |
|---|---|---|---|

### Output

- `design/audit/final_audit/`: one Markdown table per check (FA-1 to FA-5), the tool output, and renders of every flagged screen.
- A ranked fix list (High / Med / Low, by the gaps-file severity scale).
- The fixes then run as stages FA.1, FA.2 and so on, worst first.
