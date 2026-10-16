# RUN POLISH · Q7 spacing and alignment audit (2026-10-16)

Scope: all student phone frames on 04 (285 + new) and 07 (305), plus 13 Guardian (30), 14 Warden (18), 15 Gate (23). Tools: `q7audit` (measure) and `q7fix` (fix, logs before → after), both in design/audit/tools and stored in the file. Page 04 was fixed first, then 07 with the same rules; 07 matches 04 except where noted.

## Rules and results

| Check | Rule | Result |
|---|---|---|
| 1 Left margin | Every frame uses the Home margin (20 pt content inset); left edges within 1 pt | 0 off-margin frames on 04 / 07 / 14 / 15. 13 "Messages (reference)" uses 16 pt (an SMS-app mockup, not an app screen; exempt). Centred elements (hit areas, results) are excluded. |
| 2 Dead space | Non-scrolling frames: band from last content to the tab bar (or the 818 pt safe area) ≤ 24 pt; fix by enlarging the main element (≤ 100 pt) or the standard closing row, never filler | Fixed by construction in this run: Crowd (8 frames, chart grows; band 20), ticket pages (16 frames, card fills; band 20). q7fix: Attendance 25 → 20 (month card +5). Growing list cards (Help, Settings, Warden / Gate rails) left empty bands inside the list, so those were reverted (treated as filler). State screens (empty, error, loading, offline, sent, sign-in steps, search, camera) are exempt; everything else is listed under NEEDS REVIEW. |
| 3 Rhythm | Gaps between cards 8 / 12 / 16 / 24; card padding 12 / 16 / 20; list rows 52 or 56 | Content gaps snapped on 116 frames on 04 and 113 on 07 (14 → 16, 20 → 16, 10 → 12) plus 4 on 13–15; card paddings snapped on 36 frames on 04, 35 on 07 and 4 on 13–15 (24 → 20, 22 → 20, 18 → 20, 14 → 16, 8 → 12, 28 → 20); single-line rows 59–60 → 56 (History, Help: 7 frames per page). Two-line rows (You rows with a 44 pt icon tile, 61–63; Gate student rows 79) are NEEDS REVIEW. |
| 4 Centre axis | Centred pages share one axis within 1 pt | 0 off-axis centred texts (tickets, results, loaders, sign-in, Crowd). |
| 5 Type roles | Same role, same size | 0 style-size overrides on 04 / 07 / 13–15 except the ticket code (80 pt on ML/Hero Metric, used on every ticket page alike). Tab-bar labels are 11 pt (the shared iOS tab bar component, ML/Tab Label); exempt and logged. |
| 6 Two columns | Equal widths and gutters | 8 pairs on 04 (7 on 07) were 1–31 pt uneven (outlined button beside a filled one, ProblemTile pair): set to equal fixed halves (e.g. 169 / 172 → 171 / 171). |

After the fixes: contrast 0 real failures (the Guardian "Approved" label is the known tool artefact), targets 0 under 44 pt, truncation 0, horizontal overflow 0, small text 0, detached 0, raw paints only on Gallery frames, 04 / 07 parity 291 / 291 (text).

## Fixed frames (04; 07 identical unless noted)

| Frame | Before → after |
|---|---|
| Answer · Lunch · Cutoff passed · Skipped | gap 14→16 |
| Answer · Dinner · Cutoff passed · In | gap 14→16 |
| Answer · Dinner · Not sure | gap 14→16; cols Decide 169/172→171/171 |
| Answer · Breakfast · Cutoff passed · Not answered | gap 14→16 |
| Entry QR | gap 20→16 |
| Entry QR · Scanned | gap 20→16 |
| Entry QR · Already scanned | gap 20→16 |
| Entry QR · Refreshing | gap 20→16 |
| Entry QR · Wrong mess | gap 20→16 |
| Entry QR · Offline (Saved QR) | gap 20→16 |
| Report · What's wrong | gap 10→12 |
| SOS · Sent | gap 14→16; pad Sent card 24/24/24/24→20/20/20/20 |
| Report · Details | gap 14→16; pad Next 8/8/8/8→12/12/12/12 |
| Report · Sending | gap 14→16; pad Next 8/8/8/8→12/12/12/12 |
| Report · Failed | gap 14→16; pad Next 8/8/8/8→12/12/12/12 |
| Report · Receipt | gap 14→16; pad Next 8/8/8/8→12/12/12/12; cols Actions 174/171→173/173 |
| Report · No one on duty | gap 10→12; pad Off duty 12/14/12/14→12/16/12/16 |
| Report · My reports | gap 10→12; content bottom padding 120→124 (parity with 07) |
| Report · Need more info | gap 14→16; pad Timeline 8/8/8/8→12/12/12/12 |
| Report · Fixed | gap 14→16; pad Timeline 8/8/8/8→12/12/12/12; cols Actions 154/157→156/156; content bottom padding 120→124 |
| Community | gap 14→16 |
| Community · Issue | gap 14→16; pad Backing hero 24→20; pad Wait chart 18/20/18/20→20/20/20/20 |
| Community · Me too sending | gap 14→16 |
| Community · Backed | gap 14→16 |
| Community · Issue · Backed | gap 14→16; pad Backing hero 24→20; pad Wait chart 18/20→20/20 |
| Community · Empty | gap 14→16 |
| Community · Issue · Hidden | gap 14→16; pad Backing hero 24→20; pad Wait chart 18/20→20/20 |
| Community · Fixed · Empty | gap 14→16 |
| Community · Loading | gap 14→16 |
| Community · Offline | gap 14→16 |
| Spending | gap 14→16; pad Spending hero 24/24/22/24→20/20/20/20 |
| Add expense | gap 20→16 |
| Add expense · Saving | gap 20→16 |
| Add expense · Failed | gap 20→16 |
| Spending · Saved | gap 14→16; pad Spending hero 24/24/22/24→20/20/20/20 |
| Edit expense | gap 20→16 |
| Delete confirm | gap 20→16 |
| Deleting | gap 20→16 |
| Spending · Empty | gap 14→16 |
| Spending · Loading | gap 14→16 |
| Spending · Offline | gap 14→16; pad Spending hero 24/24/22/24→20/20/20/20 |
| Spending · Error | gap 14→16 |
| Credits · Empty | gap 14→16; pad Points hero 24→20 |
| Credits | gap 14→16; pad Points hero 24→20; row History 60→56 |
| Credits · Getting a ticket | gap 14→16; pad Points hero 24→20; row History 60→56 |
| Credits · Failed | gap 14→16; pad Points hero 24→20; row History 60→56 |
| Rewards · Balance issue | gap 14→16; pad Points hero 24→20; row History 60→56 |
| Credits · Loading | gap 14→16 |
| Credits · Offline | gap 14→16; pad Points hero 24→20; row History 60→56 |
| Credits · Error | gap 14→16; pad Points hero 24→20 |
| Notifications | gap 14→16 |
| Notifications · Empty | gap 14→16 |
| Reminder prompt | gap 20→16 |
| Notification settings | gap 20→16 |
| Quiet hours | gap 20→16 |
| Settings · System off | gap 20→16 |
| Settings · Failed | gap 20→16 |
| Notifications · Loading | gap 14→16 |
| Notifications · Offline | gap 14→16 |
| Notifications · Error | gap 14→16 |
| You | gap 14→16; row Help 60→56 |
| Attendance | gap 14→16; pad Attendance hero 22→20; pad Month 18→20; dead 25→20 (grow Month 369→374) |
| Help | gap 14→16 |
| You · Loading | gap 14→16 |
| You · Offline | gap 14→16; row Help 60→56 |
| You · Error | gap 14→16 |
| Home · After a meal | pad How was breakfast 18/20/18/20→20/20/20/20; cols Faces 149/152→151/151 |
| Answer · Lunch | gap 14→16 |
| Answer · Lunch · Sending | gap 14→16 |
| Answer · Lunch · I'm in | gap 14→16 |
| Answer · Lunch · Cutoff passed · In | gap 14→16 |
| Answer · Lunch · Failed | gap 14→16 |
| Answer · Lunch · Offline | gap 14→16 |
| Answer · Lunch · Why skipping · Reason picked (sheet) | gap 14→16 |
| Answer · Lunch · Why skipping (sheet) | gap 14→16 |
| Answer · Lunch · Skipped | gap 14→16 |
| Answer · Lunch · Failed (skipping) | gap 14→16 |
| Answer · Lunch · Not sure | gap 14→16; cols Decide 169/172→171/171 |
| Answer · Lunch · Cutoff passed · Not answered | gap 14→16 |
| Recheck · Inbox | gap 20→16 |
| Report · From feedback | gap 10→12 |
| Report · My reports (full scroll) | gap 10→12 |
| Report · Fixed (full scroll) | gap 14→16; pad Timeline 8→12; cols Actions 154/157→156/156 |
| Settings · System off (full scroll) | gap 20→16 (list grow tried, reverted) |
| About MealLoop | pad About card 28/20/28/20→20/20/20/20 |
| Community · Issue · Sending | gap 14→16; pad Backing hero 24→20; pad Wait chart 18/20→20/20 |
| Community · Fixed | gap 14→16 |
| Community · Me too failed | gap 14→16 |
| Community · Issue · Offline | gap 14→16; pad Backing hero 24→20; pad Wait chart 18/20→20/20 |
| Community · Info sheet | gap 14→16 |
| Outings · Not enabled · new | pad Not enabled 24→20 |
| New outing · Offline · new | gap 10→12 |
| New outing · No guardian · new | gap 10→12; pad Blocked 14→16 |
| New outing · Duplicate · new | gap 10→12; pad Blocked 14→16 |
| New outing · Sending · new | gap 10→12 |
| Answer · Breakfast · new | gap 14→16 |
| Answer · Breakfast · I'm in / Why skipping / Failed · new | gap 14→16 |
| Answer · Breakfast · Not sure · new | gap 14→16; cols Decide 169/172→171/171 |
| Answer · Breakfast · Offline · new | gap 14→16 |
| Answer · Dinner · new | gap 14→16 |
| Answer · Dinner · I'm in · new | gap 14→16 |
| Answer · Dinner · Why skipping / Failed · new | gap 14→16 |
| Answer · Dinner · Offline · new | gap 14→16 |
| Entry QR · Walk-in · new | gap 20→16 |
| Feedback · What's wrong · Milk (sheet) · new | cols Problem row 186/155→171/171 |
| My feedback · new / Better saved / Offline | gap 14→16; pad Reports hero 24→20; pad Needs your answer 18/20→20/20 |
| My feedback · Empty · new | gap 14→16 |
| SOS · new / SOS · I feel unwell · new | gap 14→16; pad 4 options 12/16/12/14→12/16/12/16 |
| SOS · Review · new / GPS unavailable / Offline / Failed | gap 14→16 |
| SOS · Review · No photo · new | gap 14→16 |
| Attendance · Offline · new | gap 14→16; pad Attendance hero 22→20; pad Month 18→20 |

07 differences: Spending · Empty / Loading / Error, Outings · Empty and Emergency outing · Sent have slightly different dead bands (exempt states); Emergency outing · new 104 on 07 (REVIEW).

## Guardian, Warden, Gate

| Frame | Before → after |
|---|---|
| 13 · G-2 · Request · Ready / Dragging / Approved / Overnight / Weekday · new | gap 379 accepted the guardian pages as intentionally sparse) |
| 13 · G-2A · About this outing · new | pad Last 30 days 14/16/14/16→16/16/16/16 |
| 13 · G-M · Messages (reference, not an app screen) · new | gap 14→16; bubble padding 10/14→12/16; margin 16 (SMS mockup, exempt from the 20 pt margin) |
| 15 · GA-1 · Gate home · new | pad Row · End shift 14/16→16/16 |
| 15 · GA-2 · Scan · new | gap 20→16 |
| 15 · GA-4 · Can't scan? — Pass code · new | gap 14→16; pad ID field 18/20→20/20 |
| 15 · GA-7 · Out now · new | dead 29 (rail grow tried, reverted) |
| 15 · GA-9 · Report a problem · new | gap 14→16 |

## Exempt (state screens)

Dead space on these is the state itself (one message in the middle of the page): 13 · G-0 Sign in, Verify code, G-A1 Activate, G-A2 Confirm link, G-A3 Done · new, 13 · G-2 · Request · Offline / Expired · new, 13 · G-M · Messages (reference, not an app screen) · new, 14 · W-1 · Queue (Empty), W-4 · Decision recorded · new, Answer · Breakfast · Offline · new, Answer · Dinner · Offline · new, Answer · Lunch · Offline, Answer · Lunch · Sending, Community · Empty, Community · Fixed · Empty, Credits · Empty, Credits · Error, Emergency outing · Sent · new, Entry QR · Wrong mess, Home · Empty, Meals · Wed 14 · Lunch · Error, Meals · Wed 14 · Lunch · No menu (state sample), Meals · Wed 14 · Lunch · Not published, My feedback · Empty · new, New outing · Sent · new, Notifications · Empty, Notifications · Error, Notifications · Loading, Notifications · Offline, Outing · Expired · new, Outings · Empty · new, Outings · Not enabled · new, Pass · Already used, Pass · Expired, Pass · Not eligible, Pass · Unavailable, Pass · Wrong mess, Recheck · Inbox, Report · Failed, Report · Receipt, Report · Sending, SOS · Camera, SOS · Camera · GPS unavailable / Camera denied · new, SOS · Sent, Search · Empty / Typing / Menu result / No results / Offline, Settings · Failed, Spending · Empty, Spending · Error, Spending · Loading, You · Error.

## NEEDS REVIEW (not safe to auto-fix)

| Frame | Finding | Why not auto-fixed |
|---|---|---|
| Meals · Dish detail | dead 375 | list or data-length page: enlarging a card adds empty space inside it |
| Answer · Lunch · Cutoff passed · Skipped | dead 38 | no single main element to enlarge within 100 pt (hero is a component instance or several equal cards) |
| Answer · Dinner · Cutoff passed · In | dead 51 | no single main element to enlarge within 100 pt (hero is a component instance or several equal cards) |
| Answer · Dinner · Not sure | dead 72 | no single main element to enlarge within 100 pt (hero is a component instance or several equal cards) |
| Answer · Breakfast · Cutoff passed · Not answered | dead 35 | no single main element to enlarge within 100 pt (hero is a component instance or several equal cards) |
| Entry QR | dead 37 | no single main element to enlarge within 100 pt (hero is a component instance or several equal cards) |
| Entry QR · Scanned | dead 59 | no single main element to enlarge within 100 pt (hero is a component instance or several equal cards) |
| Entry QR · Already scanned | dead 59 | no single main element to enlarge within 100 pt (hero is a component instance or several equal cards) |
| Entry QR · Refreshing | dead 37 | no single main element to enlarge within 100 pt (hero is a component instance or several equal cards) |
| Pass · Available | dead 295 | no single main element to enlarge within 100 pt (hero is a component instance or several equal cards) |
| Report · What's wrong | dead 110 | list or data-length page: enlarging a card adds empty space inside it |
| Report · Details | dead 142 | list or data-length page: enlarging a card adds empty space inside it |
| Report · No one on duty | dead 68 | list or data-length page: enlarging a card adds empty space inside it |
| Credits | row Something wrong with your balance? 61 (two lines) | two-line row (icon tile 44 pt or two text lines): 56 pt does not fit |
| Credits · Getting a ticket | row Something wrong 61 (two lines) | two-line row (icon tile 44 pt or two text lines): 56 pt does not fit |
| Credits · Failed | row Something wrong 61 (two lines) | two-line row (icon tile 44 pt or two text lines): 56 pt does not fit |
| Rewards history | dead 212 | list or data-length page: enlarging a card adds empty space inside it |
| Rewards · Balance issue | row Something wrong 61 (two lines) | two-line row (icon tile 44 pt or two text lines): 56 pt does not fit |
| Credits · Offline | row Something wrong 61 (two lines) | two-line row (icon tile 44 pt or two text lines): 56 pt does not fit |
| Notifications | dead 121 | list or data-length page: enlarging a card adds empty space inside it |
| Notification settings | dead 162 | list or data-length page: enlarging a card adds empty space inside it |
| You | rows Outings 63, Credits / Attendance / Spending / My feedback / Terms and privacy / Sign out 61 (icon tile 44 + padding) | two-line row (icon tile 44 pt or two text lines): 56 pt does not fit |
| Terms and privacy | dead 116 | list or data-length page: enlarging a card adds empty space inside it |
| Help | dead 120 (list grow tried, reverted: it left empty bands inside the list) | list or data-length page: enlarging a card adds empty space inside it |
| You · Offline | rows as on You | two-line row (icon tile 44 pt or two text lines): 56 pt does not fit |
| Answer · Lunch | dead 98 | no single main element to enlarge within 100 pt (hero is a component instance or several equal cards) |
| Answer · Lunch · Cutoff passed · In | dead 38 | no single main element to enlarge within 100 pt (hero is a component instance or several equal cards) |
| Answer · Lunch · Not sure | dead 59 | no single main element to enlarge within 100 pt (hero is a component instance or several equal cards) |
| Answer · Lunch · Cutoff passed · Not answered | dead 38 | no single main element to enlarge within 100 pt (hero is a component instance or several equal cards) |
| Recheck · Home · Recheck / yes / no | dead 176 (older Home variants | no single main element to enlarge within 100 pt (hero is a component instance or several equal cards) |
| Report · From feedback | dead 138 | list or data-length page: enlarging a card adds empty space inside it |
| About MealLoop | dead 328 | list or data-length page: enlarging a card adds empty space inside it |
| Community · Fixed | dead 78 | list or data-length page: enlarging a card adds empty space inside it |
| Outing · Waiting for guardian / Under warden review / Escalated · new | dead 45 | no single main element to enlarge within 100 pt (hero is a component instance or several equal cards) |
| Outing · Changes requested / Rejected / Approved · new | dead 32 | no single main element to enlarge within 100 pt (hero is a component instance or several equal cards) |
| Outing pass · Valid / Out · new | dead 42 | no single main element to enlarge within 100 pt (hero is a component instance or several equal cards) |
| Emergency outing · new | dead 84 (07: 104) | no single main element to enlarge within 100 pt (hero is a component instance or several equal cards) |
| New outing · Mon · new | dead 70 | no single main element to enlarge within 100 pt (hero is a component instance or several equal cards) |
| Meals · Tue 13 / Sat 17 / Sun 18 · Breakfast · new | dead 48–51 | list or data-length page: enlarging a card adds empty space inside it |
| Meals · Thu 15 · Breakfast · new | dead 27 | list or data-length page: enlarging a card adds empty space inside it |
| Meals · Fri 16 · Breakfast · new | dead 170 | list or data-length page: enlarging a card adds empty space inside it |
| Meals · Mon 12 / Tue 13 · Snacks · new | dead 154 | list or data-length page: enlarging a card adds empty space inside it |
| Answer · Breakfast · new | dead 95 | no single main element to enlarge within 100 pt (hero is a component instance or several equal cards) |
| Answer · Breakfast · Not sure · new | dead 56 | no single main element to enlarge within 100 pt (hero is a component instance or several equal cards) |
| Answer · Dinner · new | dead 111 | no single main element to enlarge within 100 pt (hero is a component instance or several equal cards) |
| Answer · Dinner · I'm in · new | dead 30 | no single main element to enlarge within 100 pt (hero is a component instance or several equal cards) |
| Entry QR · Walk-in · new | dead 37 | no single main element to enlarge within 100 pt (hero is a component instance or several equal cards) |
| SOS · Review · No photo · new | dead 143 | no single main element to enlarge within 100 pt (hero is a component instance or several equal cards) |
| Home · Not answered · Reminder set · new | dead 83 | no single main element to enlarge within 100 pt (hero is a component instance or several equal cards) |
| 13 · G-2 · Request · Ready / Dragging / Approved / Overnight / Weekday · new | dead 65 (ClockDial page | no single main element to enlarge within 100 pt (hero is a component instance or several equal cards) |
| 13 · G-3 · Status · (9 states) · new | dead 143–188 | no single main element to enlarge within 100 pt (hero is a component instance or several equal cards) |
| 14 · W-3 · All requests · new | dead 71 (rail grow tried, reverted) | two-line row (icon tile 44 pt or two text lines): 56 pt does not fit |
| 14 · W-5 · Me · new | dead 77 | list or data-length page: enlarging a card adds empty space inside it |
| 14 · W-6 · Alerts · new | dead 285 | list or data-length page: enlarging a card adds empty space inside it |
| 15 · GA-1 · Gate home · new | dead 46 | no single main element to enlarge within 100 pt (hero is a component instance or several equal cards) |
| 15 · GA-2 · Scan · new | dead 241 (camera) | no single main element to enlarge within 100 pt (hero is a component instance or several equal cards) |
| 15 · GA-3 · Verify — Exit / Return · new | dead 52 | no single main element to enlarge within 100 pt (hero is a component instance or several equal cards) |
| 15 · GA-4 · Can't scan? — Pass code · new | dead 140 | no single main element to enlarge within 100 pt (hero is a component instance or several equal cards) |
| 15 · GA-5 · Find student · new | dead 336 | list or data-length page: enlarging a card adds empty space inside it |
| 15 · GA-7 · Out now · new | rows 79 (two-line student rows) | two-line row (icon tile 44 pt or two text lines): 56 pt does not fit |
| 15 · GA-8 · Overdue returns · new | rows 79 (two-line student rows) | two-line row (icon tile 44 pt or two text lines): 56 pt does not fit |
| 15 · GA-9 · Report a problem · new | dead 178 | list or data-length page: enlarging a card adds empty space inside it |
