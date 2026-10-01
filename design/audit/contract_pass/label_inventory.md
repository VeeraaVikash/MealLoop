# Label inventory (contract pass, Stage 0, 2026-10-01, read-only)

**Method:** every TEXT node on all 13 pages was scanned on snapshot `st110`. The scan used a full walk (`skipInvisibleInstanceChildren = false`), so it also found layers hidden inside instances.
- Matching is case-insensitive and on whole words: "served" does not match "unserved", but it does match "Never served".
- "Hidden" means the layer exists but is not visible at rest (hidden by an earlier stage or inside an instance).
- **Nothing in Figma was changed.**

**Fix stages** (defined in the contract under "Contract pass · stage plan"):

| Stage | Covers |
|---|---|
| CP-1 | Words and numbers |
| CP-2 | Components |
| CP-3 | Never hide |
| CP-4 | Today |
| CP-5 | Issues |
| CP-6 | Insights |
| CP-7 | Manage |
| CP-8 | Links |

**Pages:** 04 Student Light, 05 Student Dark, 07 Prototype, 03 Components, 09 Mess Staff, 10 Admin. 00 Before and 02 Mood Frames are legacy or exploration pages and are listed only for completeness. 99 Archive is out of scope.

## 1 · The listed words

| # | Word | Page | Frame(s) | Text as found | Proposed fix | Stage |
|---|---|---|---|---|---|---|
| L1 | served | 10 | AD-1a Today — Overview (Success, Offline; hidden in Empty) | LiveDial unit "served" under **2,418** | "entered" (people are entered, food is served) | CP-1 |
| L2 | served | 10 | AD-1b Mess detail (Success, Offline) | LiveDial unit "served" under **712** | "entered" | CP-1 |
| L3 | served | 03 | LiveDial (component) | `Unit` default "served" | Default "entered" | CP-2 |
| L4 | served | 10 | AD-1a (Empty) | Title "No meals served yet" | "No entries yet" (body stays "Counts show after the first scan.") | CP-1 |
| L5 | served | 10 | AD-4b Forecast vs actual | Legend "Served" (diner counts 596 / 838 / 697) | "Entered" | CP-1 |
| L6 | served | 03 | MealSectionHeader (component) | State pill "Served" (also MS-E's "Served" state) | "Ended": "served" is a food quantity, not a service state | CP-2 |
| L7 | served | 04, 05, 07 | Meals · Menu, Menu changed, Offline (+ full-scroll copies) | "7:30–9:30 AM · SERVED" | "7:30–9:30 AM · ENDED" | CP-1 |
| L8 | served | 04, 05, 07 | Meals · Service ended | "SERVED 12–2 PM" | "ENDED · 12–2 PM" | CP-1 |
| L9 | served | 04, 05, 07 | Meals · Dish detail — not provided | "You can rate this once it's served." | "You can rate this after the meal." | CP-1 |
| L10 | served | 04, 05, 07 | Search · Menu result | Label "Served" | "Ended" | CP-1 |
| L11 | served | 09, 10 | MS-D3a; AD-3c (Success, Offline) | "Next served Fri lunch · recheck then" | "Back on the menu Fri lunch · recheck then" | CP-1 |
| L12 | served | 10 | AD-7d · Entry — Waste logged · lunch | "Unserved is calculated from served counts" | "Unserved is prepared minus served" (both food quantities) | CP-1 |
| L13 | served | 09 | MS-D1 (5 rows) | "Prepared 95 kg · served 88 kg" and the other 4 | **Keep.** This is the defined use (a food quantity). | – |
| L14 | served | 10 | AD-6d Surplus (Empty) | "…once the kitchen counts what was served." | **Keep** (food). | – |
| L15 | served | 04, 05, 07, 03, 06, 08 | Home ImpactCard, Waste family, ShareBar, WasteBar, Glossary | "Never served", "Cooked, not served; weighed after service" | **Keep.** A food category (unserved = prepared − served). | – |
| L16 | inside | 10 | AD-2a, AD-2b (Success, Offline; hidden in AD-2a Empty) | LiveDial unit "inside" under **410** | Remove the head count. The hero shows the level ("Packed"), the method ("from entry scans") and freshness ("2 min ago"). | CP-4 (CP-1 if the number must stay until then: "410 entries in the last 15 min") |
| L17 | expected | 09 | MS-C2 Demand dashboard | Eyebrow "EXPECTED · LUNCH" | "FORECAST · LUNCH", plus the line "rule v0 · set 9:00 AM" | CP-1 |
| L18 | expected | 09 | MS-C2 | "Not sure counts as half toward the expected number" | "…toward the forecast" | CP-1 |
| L19 | expected | 09 | MS-C2 | "Expected is 6% higher" | "Forecast is 6% above the 812 average" (rule 23: show the denominator) | CP-1 |
| L20 | expected | 03 | DemandRingCard (component) | `Eyebrow` default "EXPECTED · LUNCH" | "FORECAST · LUNCH" | CP-2 |
| L21 | expected | 10 | AD-4b | Legend "Expected" | "Forecast" | CP-1 |
| L22 | expected | 03 | ChartBar (component) | Variant `Kind=Expected` (used by AD-4b and the hub Voting tile) | Rename the variant `Kind=Forecast`. Instances keep their node ids. | CP-2 |
| L23 | expected | 10 | AD-4e Meal drilldown (Success, Offline) | "712 came of 860 expected" | "712 entered of 860 forecast · at 1:40 PM" (see N10) | CP-1 |
| L24 | expected | 10 | AD-1a, AD-1b, AD-2a, AD-2b (all states) | LiveDial layer named "Max · expected" (texts 2,960 / 860 / 480 seats) | Rename the layer "Max · forecast". The dial's max reads as the forecast, never "expected". | CP-2 |
| L25 | expected | 04 | "Open decision" canvas note | "Expected staff reply time for dish feedback." | A canvas note, not UI. **Keep.** | – |
| L26 | arrived | – | – | **Not found on any page.** | – | – |
| L27 | donated | 04, 05, 07 | Waste · Last week, Partial, Corrected, Not comparable, No baseline, Dish breakdown | "Donated (not waste) · 18 kg" | **Keep.** Last week's surplus was collected. Add "collected" if the sample can't guarantee it: "Donated (collected, not waste) · 18 kg". | CP-1 |
| L28 | donated | 04, 05, 07 | Waste · How this is measured | Label "DONATED" | Keep the label. Its value line should state the rule: "Counted once the partner collects it". | CP-1 |
| L29 | donated | 03 | WasteBar (component) | "Donated · not waste" | **Keep.** | – |
| L30 | donated | 10 | AD-6d2 Pickup detail (Success, Offline) | Step "Counted as donated" (after pickup) | **Keep.** It already follows "only once collected". | – |
| L31 | seats | 10 | AD-2a, AD-2b (Success, Offline; hidden in Empty) | "480 seats" (dial max) | Remove until seat capacity has an owner (gap 175). | CP-4 |
| L32 | seats | 04, 05, 07 | Recheck · Lock · Said yes (+ expanded) | "We'll keep your seat counted unless you change it." | "We'll keep your yes unless you change it." (an intent, not a seat) | CP-1 |
| L33 | overdue | – | – | **Not found on any page.** The rule now requires "lapsed" for a missed cutoff; see the lapsed rows below. | – | – |
| L34 | (lapsed) | 10 | AD-1b Mess detail (Success, Offline) | "Awaiting approval · Curd · 60 → 45 L · Food head decides · kitchen cooks 60 L" (moment 1:41 PM) | Past the 11:30 AM override cutoff: "Lapsed 11:30 AM · Curd stays at 60 L" | CP-1 |
| L35 | (lapsed) | 09 | MS-E Shift home (12:30 PM); MS-D4 Shift history | "1 needs approval"; "Override pending · Curd 60 → 45 L" | "1 lapsed"; "Override lapsed · Curd 60 → 45 L" | CP-1 |
| L36 | (lapsed) | 10 | AD-7d · Entry — Curd 60 → 45 L · pending | Title "Curd 60 → 45 L · pending" | "Curd 60 → 45 L · lapsed 11:30 AM" | CP-1 |
| L37 | Log pickup | 10 | AD-6d Surplus (Success; also in the AD-6d Scope sheet background) | Primary button "Log pickup" | **Remove from admin.** Logging the pickup is an Execute for the supervisor at the gate (permissions, surplus). Admin sees "Pickup not logged yet", then "Collected · 14 kg · 2:52 PM · Ravi". The verifier's control is "Confirm donated" (gap 180). | CP-7 |
| L38 | Confirm action | 10 | AD-3c Dish feedback (Success, Offline) | Primary "Confirm action" | "Verify after Fri recheck", disabled until the recheck has run. | CP-5 |
| L39 | Biryani plate | 10 | AD-6c Rewards (Success, Offline; also in the Rules sheet background) | Coupon "Biryani plate · ₹120 each · 0 claimed · Launches Fri" | Rename "Extra biryani plate", so it can't be read as the Wednesday special pass. The fact becomes "₹120 each · launches Fri": "0 claimed" is not data before launch (rule: missing data is never zero). | CP-7 |
| L40 | Merge | 10 | AD-3d Community moderation (Success, Offline; hidden in Empty) | "Merge 3 into one" | "Group as one issue · keeps all 3" (never hide: the 3 reports stay readable inside the group) | CP-5 |
| L41 | Merge | 10 | AD-5c2 · Look the same sheet | "Merge 3 into one" | "Group as one proposal · keeps all 3" | CP-7 |
| L42 | Hold the batch | – | – | **Not found on any page.** The nearest text is the AD-3b log entry "Batch set aside · biryani 30 kg" (visible on Success, hidden on Offline). | If a hold control is wanted, it is a supervisor Execute on the staff side (safety case), and the admin log keeps "Batch set aside". | CP-5 |
| L43 | legacy | 00 Before, 02 | 3 · Meals; V1/V2 Home and Menu | "Served", "inside now", "seats", "Never served", "7:30–9:30 AM · SERVED" | Out of scope (legacy and exploration pages). | – |

## 2 · Other labels the definitions reach

| # | Page | Frame(s) | Text as found | Proposed fix | Stage |
|---|---|---|---|---|---|
| L44 | 04, 05, 07; 03 | Waste · Last week (+ family); MetricHero (component) | "g per meal" | "g per diner" | CP-1, CP-2 |
| L45 | 10 | AD-4d Reports & exports | "5–11 Aug · 71 g per meal" (and 64 / 58 / 49) | "71 g per diner" | CP-1 |
| L46 | 04, 05, 07 | Waste · Last week | "7 g less than the week before" | "7 g less per diner than the week before" | CP-1 |
| L47 | 04, 05, 07 | Waste · Last week | "2 shortages this week" (inside the Last week view) | "2 shortages last week" | CP-1 |
| L48 | 04, 05, 07 | Waste · Dish breakdown | "By dish (logged meals only)" | "Never served, by dish (logged meals only)". Plate waste is total only, so the per-dish values must be unserved. | CP-1 |
| L49 | 10 | Manage hub (Empty) | Surplus tile "0 dishes" (South hasn't logged waste) | "Not logged yet". Missing data is never zero. | CP-7 |
| L50 | 10 | AD-1a (Success) | "4 messes · updated 1:40 PM", over a 2,418 / 2,960 total that includes Annexe's 12:10 PM sync | "3 of 4 messes · Annexe not comparable", with the total over the reporting messes (1,872 of 2,360) | CP-1, CP-4 |
| L51 | 10 | AD-4b | "2 of 3 meals on target" | "2 of 3 within 5% (draft band)". The band has no owner. | CP-6 |
| L52 | 10 | AD-5b Edit dish; AD-5b Rules sheet | "within 5% of 110"; "kcal within 5% of 4P + 4C + 9F" | Keep the check, but mark it "draft" until it has an owner. This is the nutrition energy check, a different "within 5%" from the forecast band (conflict C16). | CP-1 |
| L53 | 03 | MetricBadge (component) | Lime target tick drawn at 65 g | Keep the tick, labelled "65 g draft target" where it is shown, or hide the tick from the visual (not the data) until the target has an owner. | CP-2 |
| L54 | 10 | AD-2c Shortage alerts | "15% below forecast", "8% below forecast" | Add the denominator: "38 L of 45 L forecast" (rule 23). | CP-4 |
| L55 | 10 | AD-5b Edit dish (Offline) | Banner "Offline · changes save when you reconnect", while Save is disabled | "Offline · editing needs a connection" (offline rules: no edits while unsynced) | CP-1 |

## 3 · Text under 12 pt (visible, every page)

The only readable text under 12 pt is the **tab-bar label**. No other visible text on any page is below 12 pt (canvas labels, Moment notes and sample chips excluded).

| Component | Style | Size | Where | Instances | Fix | Stage |
|---|---|---|---|---|---|---|
| TabBar (student) | ML/Tab Label | 11 pt | 04 (190 frames), 05 (190), 07 (141), 06 (3), definition on 03 | 776 + 776 + 568 + 24 labels | Raise ML/Tab Label to 12 pt (one style change). Check that the four labels still fit the glass pill. | CP-2 |
| AdminTabBar | ML/Tab Label | 11 pt | 10 (96 frames), definition on 03 | 396 labels | Same style change. | CP-2 |

## 4 · Numbers that disagree across student, staff and admin

| # | What | Student | Staff | Admin | Proposed resolution | Stage |
|---|---|---|---|---|---|---|
| N1 | Biryani safety report time | – | MS-D2 lists "Chicken biryani · Foreign object found · 1 report" at **"Updated 12:45 PM"**; MS-E (12:30 PM) shows "1 safety report" | AD-3b: received **1:25 PM** (moved there in AD-3.1 for the 30-min auto-escalation); AD-7d agrees | Owner picks the canonical time (gap 199). Either remove the safety row from the pre-1:25 staff moments, or move the whole case earlier and re-time the escalation. "found" vs "reported" stays as gap 98. | CP-1 |
| N2 | The student's urgent report | Report · Urgent: "Found something in my food · **Small stone in the rice** · Lunch · 12:40 PM · Sent 12:41 PM" (Aarav, •••0238) | Not present (MS-D2's only Safety row is the biryani) | SOS is **Chicken biryani · Foreign object** by Student •••2231 at 1:25 PM | Align the student sample with the one SOS case, or add the rice report to staff and admin as a second case (gap 200). | CP-1 |
| N3 | Wednesday lunch menu | Intent frames: "Sambar, rice, poriyal, chicken curry"; Meals · Menu changed: "Egg curry is now Chicken curry" | MS-C3 and MS-C5: Rice, Sambar, Paneer butter masala, Chapati, Curd, plus Chicken biryani (special) | AD-1b agrees with staff. **AD-5a Menu still lists Sambar, Rice, Beetroot poriyal, Chicken curry, Curd.** | Gap 110 already names the prep list as canonical. Add AD-5a to that fix: admin disagrees with itself. | CP-1 |
| N4 | Intent count and cutoff | Lunch: "Decide by 9 AM", "Change till 9 AM"; dinner: "Decide by 6 PM" | MS-C2 at **10:42 AM**: "412 intents **so far** · 48%"; MS-E at 12:30 PM: "412 intents so far" | – | After the 9:00 AM cutoff the count is frozen: "412 intents at the 9:00 AM cutoff". The forecast line carries the cutoff (definition: Forecast). | CP-1 |
| N5 | All-mess total | – | – | AD-1a: **2,418 of 2,960** = Main 712/860 + North 640/700 + South 520/800 + **Annexe 546/600 from its 12:10 PM sync**, labelled "4 messes · updated 1:40 PM". AD-2a marks Annexe "Old data · 12:10 PM". | A non-reporting mess is "not comparable": the total is 1,872 of 2,360 for 3 of 4 messes, with Annexe shown apart. | CP-1, CP-4 |
| N6 | North Mess, two measures | – | – | AD-1a: North **91%** (640 of 700 entered). AD-2a: North **410 inside · 480 seats · 85%** | Cumulative entries and an occupancy estimate share one dial style. The crowd definition removes the occupancy number, so only entered vs forecast remains. | CP-4 |
| N7 | Sambar too salty | Feedback history "Sambar · Too salty · **Fixed**" (Mon 5 Aug, breakfast); FB-2210 sent at Wed **breakfast** 8:32 AM; Home asks "Rate it at breakfast?" | MS-D2: 6 reports, **lunch** shift | AD-3a and AD-3c: 6 reports, Hold "**Recheck Fri**" | Pick one story for the sample: either the student's report is one of the 6 lunch reports (then the student sees "Recheck Fri", not "Fixed"), or the breakfast case is a separate, closed issue (gap 201). | CP-1 |
| N8 | Community title | "Long wait at counter 3 **after 1 PM**" · 64 | – | AD-3a and AD-3d: "Long wait at counter 3" · 64 | Use the student's full title verbatim (AD-3 already keeps student titles verbatim elsewhere). | CP-1 |
| N9 | Shortages, last week | Waste · Last week (Main Mess): "2 shortages **this week**" | – | AD-4a: "4 shortages" last week, all messes | The scope difference is fine (Main is 2 of 4); the student label is wrong (L47). | CP-1 |
| N10 | Meal record turnout | – | – | AD-4e (a record viewed at 2:09 PM): "712 … of 860" is the **1:40 PM** mid-service count; lunch runs to 2:00 PM | The meal record shows the final entered count at close, or labels the time it was taken. | CP-6 |
| N11 | Curd request status | – | MS-E 12:30 PM "1 needs approval"; MS-D4 "pending" | AD-1b 1:41 PM "Awaiting approval"; AD-7d "pending" | With the 11:30 AM override cutoff (sample rule), the request lapsed at 11:30. Every place reads "lapsed" (L34–L36). | CP-1 |
| N12 | Vote tallies | **No student voting screen exists.** The legacy critique map on 00 Before reads "DROP: menu proposals, final vote" | – | AD-5c and AD-5d: "1,204 for · 388 against" | The admin numbers have no student source. Owner decides whether students vote (gap 202). | CP-7 |

**Checked and consistent across roles:**

| Item | Values | Where it agrees |
|---|---|---|
| Entry scan | 12:14 PM | student Entry · Scanned, MS-A2 |
| Biryani special pass | 12:32 PM; 214 passes; 196 used | student Pass · Used, MS-B3b, MS-C5, AD-1b, AD-6a, hub |
| Community counts | 64 / 38 / 21 / 17 / 112 | student Community, AD-3a, AD-3d |
| Main Mess waste, last week | 212 kg (131 + 81); 18 kg donated; 71 g | student Waste, AD-4d |
| Rewards | Juice 50 pts, Ice cream 80 pts; earn rules +5 / +2 / +2 | student Rewards, AD-6c |
| Unserved by dish | 7 kg, 4 L, 3 kg, 60 pcs, 5 L | MS-D1 (prepared − served), AD-6d2 |
| Main Mess crowd level | "Getting busy" | student Crowd · Detail (1:08 PM), AD-2a (1:42 PM) |
