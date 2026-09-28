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
