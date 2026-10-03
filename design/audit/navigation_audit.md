# Navigation audit (run 3, R2-3 simple navigation)

**Tool:** `tools/nav3.js` (stored as `mealloop/nav3`). It walks the link graph of each page's 393-wide frames.
- **Depth** is the fewest taps from the role's home. A timed transition costs 0 taps.
- **Way back:**
  - a tab root (or a Today pill view) needs a tab bar;
  - a sheet (visible Scrim) needs a Close, Dismiss or Cancel link;
  - every other screen needs a linked, visible `Back`.
- **Dead chevron:** a visible `chevron.right` with no link on itself or any parent. Chevrons on the dimmed background of a sheet are not counted.
- **Swipe row:** a horizontally scrolling row. It needs page dots, and each card must open on tap.
- **State frames** (names ending in `(Empty)`, `(Offline)`, `(Sending)`, `(Sent)`, `(Saved)`, `(Failed)`, `(Changed)` and similar) are listed apart. They are states of a screen, not separate screens. Decision logged.
- **Sheets** are counted as their own frames.

**Homes:**
- **Admin:** AD-1a · Today — Now. Roots: the four tab roots plus the Today pill views (AD-1c, AD-1e, AD-1f).
- **Staff:** each account's shift home:
  - MS-E · Shift home (kitchen supervisor, after MS-C1 shift select);
  - MS-A1 · Scanning (entry scanner);
  - MS-B1 · Scan the pass (pass desk).
- **Student:** Home · Afternoon. Roots: the tab roots Home, Meals · Menu, Community · List, You and Search.

## Summary

| Check | Admin before | Admin after | Staff before | Staff after | Student (report only) |
|---|---|---|---|---|---|
| Screens deeper than 3 taps (excl. states) | 19 | 3 sheets (see below) | 0 (from MS-E only) | 1 (MS-C1, pre-home) | 57 |
| Unreachable from home (excl. states) | 4 (AD-0 ×3, Remove access sheet) | 3 (AD-0 sign-in, before home) | 22 (A and B rows were not counted as homes) | 8 (result and state frames) | 97 (mostly states reached from the Gallery frames) |
| No way back | 3 Today pill views flagged by the old tool (they are roots); AD-0 ×3 | AD-0 ×3 (sign-in, intentional) | 31 | 0 task screens; listed exceptions only | 144 (see student section) |
| Orphaned sheets | 2 | 1 (state frame) | 0 | 0 | 0 |
| Dead chevrons (frames) | 35 frames (most on dimmed sheet backgrounds) | 1 frame (AD-4d, 5 rows → R2-4 Reports) | 1 frame (4) | 0 | 44 frames |
| Swipe rows | 7 | 7: all have dots or a single card; 4 AD-5a dish cards have no destination | 0 | 0 | 0 |

## Admin (page 10)

### Frames deeper than 3 taps

| Before | Depth | Fix | After |
|---|---|---|---|
| AD-7b · Staff by role | 4 | People → Role bar and Legend link to Staff by role; Staff list is now 2 from the hub | 3 |
| AD-7b · Staff access — Ravi (Request) | 4 | Hub row "Staff list" → Staff list (2) → Ravi; hub row "Give access" → sheet (2) → Ravi | 3 |
| AD-7c · Access request — Lakshmi | 4 | Hub row "Staff list" | 3 |
| AD-7b · Staff access — Lakshmi (Give) | 4 | Hub row "Give access" opens the Give access sheet (2) | 3 |
| AD-7d · All activity, Type sheet, Entry — Biryani / Sambar fix / Waste logged | 4 | Hub row "Audit log" → Audit log (2) | 3 |
| AD-7d · Entry — Pass desk offline, Curd 60 → 45 L, Sambar 42 → 50 L | 5 | Audit log hero dots now open their entries (2:20, 1:32, 12:52, 12:41, 11:05, 10:47) | 3 |
| AD-5c2 · Needs review / Look the same / Open vote sheets | 4 | Hub row "Student proposals" → Proposals (2) | 3 |
| AD-7b · Scope sheet | 4 | Staff list is now 2 | 3 |
| AD-5b · Rules sheet, AD-5b · More nutrients sheet | 4 | not fixed: sheets of Edit dish (3) | 4 (accepted: overlay of a 3-tap screen; logged) |
| AD-7b · Rules sheet (Ravi) | 5 | Ravi is now 3 | 4 (accepted: overlay of a 3-tap screen; logged) |

**State frames still at 4** (results of an action taken on a 3-tap screen):
- Ravi (Changed), (Sending), (Saved);
- Proposals (Vote open);
- More nutrients (Add);
- the Empty states of AD-5a, AD-6a, AD-6d and AD-7a.

Depth histogram, before → after:
- 0:1, 1:9, 2:21, 3:22, 4:20, 5:8;
- 0:1, 1:9, 2:25, 3:34, 4:12. All twelve at 4 are the 3 accepted sheets or state frames.

### Frames with no way back

| Frame | Before | After |
|---|---|---|
| AD-1c Decisions, AD-1e Messes, AD-1f Watch (+ Empty/Offline) | flagged "tab bar only" | Not a defect: these are Today pill views (Greeting header), so roots. Tool corrected |
| AD-0 · Sign in / Verifying / Confirm profile | no Back | Intentional: sign-in flow before home |

### Dead chevrons

| Frame | Chevrons | Fix |
|---|---|---|
| AD-6b · Pass exception (all 5 states), AD-3a Dishes / Community (Success, Offline) | 1 each (hero eyebrow "· Main Mess ›") | Hidden (no destination) |
| AD-7a · Give access sheet, Row · Meena | 1 | Hidden (Meena has no Staff access frame, gap 298) |
| Sheet backgrounds (Scope, Rules, Type, More nutrients, Open vote, Awaiting others, Data freshness, Verify and close, Possible causes, Entry sheets) | 1–4 each | Not a defect: dimmed background under the Scrim. Tool corrected |
| AD-4d · Reports & exports | 5 report rows | Left for R2-4 (Reports preview is built there and the rows get linked) |

### Orphaned sheets

| Sheet | Fix |
|---|---|
| AD-7b · Remove access sheet | Archived to 99 (slot 50, links stripped). The Remove access action was dropped in run 2 Stage 6 |
| AD-3b2 · Verify and close sheet (Failed) | Kept: a failure state with no trigger in the prototype (like the other Failed states) |

### Swipe-only actions

| Frame | Row | Dots | Cards open on tap |
|---|---|---|---|
| AD-1b · Today — Mess detail | Prep cards | yes | now yes: Biryani → AD-3b Safety case, Curd → AD-1d Curd decision, Paneer → AD-5a Menu (new dish, low data) |
| AD-1b · Mess detail — North | Prep cards (1 card) | n/a (one card) | now yes: Rice → AD-2c Shortage alerts |
| AD-5a · Menu & nutrition | Dish cards | yes | Sambar only. Rice, Paneer, Chapati and Curd have no Edit dish frame (new gap) |
| AD-4d · Reports & exports | Filter chips | — | Chips are a pill bar (no essential action) |
| AD-1b Offline, AD-5a Offline, AD-5a Scope sheet | — | — | State frames and a sheet background |

### Direct links added (admin)

- **Manage hub** (Success): a "Shortcuts" group of four destination rows under the bento (reused ListRow; the AD-5a "Menu voting" row pattern):
  - Staff list · 38 people · roles and access;
  - Give access · Add someone to a role;
  - Audit log · 6 entries today;
  - Student proposals · 3 proposals · 1 needs review.

  Content grows to 1,068 pt. The last row sits 20 pt above the tab bar at max scroll (bottom padding 124 unchanged). The hub Empty and Offline states are unchanged (logged).
- **Give access sheet:** Close and Dismiss now go Back, so the sheet returns to the hub or to People.
- **AD-7a People:** Role bar and Legend → Staff by role.
- **AD-7d Audit log:** six hero dots → their entries.
- **Mess detail:** prep cards → the cases above.

## Staff (page 09)

**Logged decision:** each staff account has its own shift home:
- the kitchen supervisor's is MS-E (after MS-C1 shift select);
- the entry scanner's is MS-A1;
- the pass desk's is MS-B1.

Each home shows only that account's tasks:
- **MS-E:** five plain-worded task cards: Who's coming, Prep & changes to plan, Record waste, Feedback, Shift history.
- **MS-A1 and MS-B1:** the scanner itself.

**StaffTopBar** is now a component set with two variants:
- Type=Home: on-shift dot, mess, shift and End shift;
- Type=Task: a Back glass button and the mess and shift, with no End shift.

| Change | Frames |
|---|---|
| Type=Task + Back → MS-E (shift home) | C2, C3, C4, C4a, C4b, C5, D1, D1a, D2, D3, D3a, D4 (12) |
| Type=Task + Back → MS-A1 | A2, A3, A4, A5 |
| Type=Task + Back → MS-B1 | B2, B2b, B3, B3b, B4, B5, B6, B7 |
| Removed "tap the top bar to go home" links (run 2 workaround, gap 301) | 12 |
| Removed End shift from task screens (it is now only on the three homes) | 12 End shift links |
| End shift on MS-E → new **MS-E2 · End shift confirm · new**: "End lunch shift?", "Waste not logged yet · 1 safety report open", Cancel → MS-E, End shift → MS-0 Sign in (R2-4 inserts the summary) | 1 new frame |
| MS-B1 Redemption counter → MS-B7 Redemption log (B7 was unreachable) | 1 |
| MS-D2 Feedback summary: 4 complaint rows had chevrons with no destination; chevrons hidden (the linked row keeps its chevron) | 4 |

**After:**
- 27 of 35 frames are reached from the three homes, and no task screen lacks a way back.
- The End shift confirm sheets close with Cancel.

**Exceptions (intentional):**

| Frame | Why |
|---|---|
| MS-A1, MS-B1, MS-E "root: no tab bar" | Staff homes have no tab bar by design: one job per shift, End shift in the top bar |
| MS-C1 · Shift and mess select (no Back, 4 from home) | The setup step before the home (after sign-in) |
| MS-0 · Sign in / Verifying / Confirm profile | Sign-in flow |
| MS-E-empty · Before shift starts | A state of MS-E before the shift opens |
| Unreachable: A3 Duplicate, A4 Invalid, A5 Offline, B4 Already redeemed, B5 Invalid / expired, B6 Offline, C4b Override awaiting approval | Scan or approval outcomes. The prototype shows the happy path; R2-5 decides how to reach them |

## Student (page 07): findings only, nothing changed

From Home · Afternoon: 164 of 261 frames are reached.
- Depth histogram: 0:1, 1:23, 2:38, 3:45, 4:25, 5:16, 6:6, 7:4, 8:6.
- Snapshots st164 → st165 show no change on 04, 05 or 07.

### Deeper than 3 taps (57)

| Group | Frames | Note |
|---|---|---|
| Onboarding (10) | Carousel 1–3, Sign in, Verifying, Confirm profile, Request correction (+ sending, sent), All set | Before home: own start "Student · Sign in". Not a defect |
| Lock-screen and notification flows (17) | Recheck · Lock ·, Recheck · Home · Recheck yes/no, Lock · Saved ·, Lock · Fix check | Start from a notification, not from Home. Not a defect |
| Comments (6) | Large detent, Menu, Typing, Sending, Pending, Reported | Community → card → comments sheet → … **Finding:** reach 4–5 |
| Your plate and daily goal (8) | Your plate · adjusting / saved / offline / numbers hidden / per-dish macros; Settings · Daily goal (+ option selected); You · Daily breakdown · goal on (6) | **Finding:** the daily goal sits 4–6 deep |
| Dinner Meal detail answers (7) | Meal detail (dinner) · Answer Yes / No / Not sure · Sending / Saved / Why not, Track this meal? | **Finding:** Meals → Dinner → Meal detail → answer = 4 |
| Results of a flow (9) | Entry · Discrepancy — sending, Entry · Under review, Feedback · Step 2 (×2), Sending, Receipt, Report · From feedback, Add expense · Saving, Spending · Saved, Delete confirm, Deleting | Mostly states after an action at depth 3 |

### No way back (144; 30 Gallery frames excluded below)

| Kind | Count | Frames |
|---|---|---|
| Onboarding and lock-screen frames with no Back | 35 | Onboarding ×16 (incl. failure states), Lock · / Recheck · Lock · ×17, Report · Receipt, Report · Urgent receipt |
| "Tab bar only" | 45 | Home states, Answer · Tap/Sending/Saved/Failed, Meals states, Community Empty/Loading/Offline, You Loading/Offline/Error, Feedback · Receipt, Rewards · Got it, **Meals · Menu — Dinner / Breakfast** (pill views; acceptable) |
| Back drawn but not linked | 41 | the state frames under Meals, Intent, Entry, Pass, Crowd, Feedback, Report, Community, Waste, Spending, Rewards, Notifications, Settings (reached from the Gallery frames) |
| Sheet with no Close link | 8 | Reminder prompt, Intent · Reason failed, Pass · Confirm (failed), Comments · Failed / Empty, Add expense · Failed, Offer · Failed, Correction · Failed |

**Real findings:**
- **Report · Receipt** and **Report · Urgent receipt** have no Back and no tab bar.
- The 41 state frames have an unlinked Back. They are only reachable from the galleries, so this is low impact.
- **Reminder prompt** has no Close.

### Dead chevrons (44 frames)

- **Highest:**
  - You · Offline 9;
  - Report · No one on duty 6;
  - Help 5;
  - Spending · Offline 5;
  - You · Daily breakdown · goal on 5;
  - Spending · This week 4;
  - Spending · Saved 4.
- **Also:**
  - Pass · Used 2;
  - Feedback · Pick meal 2 and Pick dish 2;
  - Privacy & data 1;
  - About MealLoop 2;
  - Search · Empty 1;
  - Search · Offline 3;
  - Settings · Daily goal · option selected 3;
  - Meal detail (dinner) · Track this meal? 1;
  - the remaining state frames 1–2 each.

The run 2 audit counted 186 dead chevrons in 66 screens. The difference comes from the sheet-background rule.

### Orphaned sheets and swipe-only actions

None.

## Decisions logged in this stage

1. **Depth counts screens.** State frames (results of an action, Empty, Offline) count as states of their screen. A sheet opened from a 3-tap screen is accepted at 4 (AD-5b Rules, AD-5b More nutrients, AD-7b Rules).
2. **Today pill views** (Greeting header) are roots like the tab roots.
3. **Staff homes:** one per account (MS-E, MS-A1, MS-B1). Every task screen's Back goes to its account's shift home, not to the previous screen (brief). Transition: Move out right, 0.3 s (the old top-bar link's transition).
4. **End shift** is shown only on the three homes. The kitchen home got its own confirm sheet (MS-E2), with a sample line "Waste not logged yet · 1 safety report open".
5. **Hub shortcuts:** four plain rows reusing the existing ListRow destination pattern. No new component.
6. **Paneer prep card → Menu & nutrition** (a new dish with low data has no case of its own).
7. **Remove access sheet archived** (the action was dropped in run 2).
8. **Dead chevrons with no possible destination are hidden**, not linked to an unrelated screen.

## Components

- **StaffTopBar** (03 Components) became a component set:
  - Type=Home: the old component, same id 732:4;
  - Type=Task: new, with a GlassButton named Back.

  Existing instances kept their text overrides. **Flagged** as a component change.
- ShiftCounter and Viewfinder on page 03 moved 60 pt right to make room.
