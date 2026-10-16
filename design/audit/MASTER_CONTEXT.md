# MealLoop · MASTER_CONTEXT

This file did not exist before run OUTINGS (2026-10-13). The full master context is **PROJECT_CONTEXT.md** (pages, components, rules, decisions); the rules are in **design_intent.md**; the current state card is **STATE.md**; run logs are in **run_status.md**. This file adds the Outing Pass module so the brief's pointer resolves.

## Outing Pass module (run OUTINGS, 2026-10-13)

**What it is.** A student asks to leave the hostel for a set window; the guardian approves first, the warden next (within the review window); the system issues a signed, time-bound pass; the gate records one exit and one return; overdue returns and missed deadlines escalate — never auto-approve. An approved outing is not an absence: the meal forecast uses confirmed exits only. Definitions, status map, workflow and the draft weekend policy are in design_intent.md ("OUTING PASS").

**Pages and starts (10 approved starts).**

| Page | Role | Start | Frames |
|---|---|---|---|
| 04 / 05 / 07 | Student (Aarav ·0238, Block B) | Student · Sign in (07) — You → Outings | 28 each (05 Dark; only 07 linked) |
| 10 Admin | Hostel administrator, section AD-9 · Outings + Manage hub tile + Insights chain row + report page 9 line | Admin starts (existing) | 19 |
| 13 Guardian | Aarav's guardian, mobile web | **Guardian · Sign in** | 18 |
| 14 Warden | Block B warden, senior warden | **Warden · Sign in** | 18 |
| 15 Gate | Main Gate security | **Gate · Sign in** | 23 |

**Components (page 03, flagged NEW, reworked to the owner's reference):** RangeSlider (1835:2157), SlideToApprove (1835:2192), OutingRibbon (1836:2223), LoopTracker (1837:2353), OutingPass (1838:3006), DeckCard (1839:2258), GateVerify (1839:2327).

**Sample story (consistent across roles):** Sat 18 Oct, out 2–8 PM, Express Avenue Mall, Shopping; sent Fri 6:00 PM; guardian replies by Fri 11 PM (approved 7:42 PM); warden decides by Sat 12 PM (approved 10:40 AM, pass issued); pass 7F3K; exit Sat 2:04 PM; return 7:41 PM.

**Owner decisions open:** gaps 356 (guardian verification source), 358 (official policy and cutoffs), 359 (emergency authorities), 360 (security fallback, photo source), 361 (pilot thresholds), 362 (guardian channel), 363 (data retention), plus 364 / 365 / 369.

**Where to look:** outings/outings_spec.md, outings_audit.md, outings_report.md, DEMO.md ("Outing Pass module"), prototype_contract.md (last section), export_outings/.

## Run OUTINGS-FIX (2026-10-13)

- **New components (page 03, flagged NEW):** ClockDial (1902:2358; a 12-hour ring showing the outing window: Request, Request 6–9 PM, Status, Out, Returned, Late, Not going, Overnight × Large / Medium), RuleTag (1902:2194; Weekday, Weekend, Too soon), token `track` (#E1E1DA). Extended: DateChip (+ Weekend, Past; Today = ink outline), OutingRibbon (Weekday single-day axis, Weekday 2–6 PM, Too soon; Weekend-Saturday / Weekend-Sunday), RangeSlider (+ four ranges).
- **Week strip:** New outing on 04 / 05 / 07 has one frame per day, Mon 13 – Sun 19 Oct (today Mon 13 Oct 1:40 PM); the WeekStrip is the student Menu DateStrip (M T W T F S S), the RuleTag names the rule, the ribbon shows the deadlines; Mon is "Too soon". Weekday rule (draft, gap 370): guardian by leave − 7 h, warden by leave − 3 h, not before 8 AM.
- **Guardian redesign (page 13):** the opened SMS link is a minimal Request page (sentence, place, ClockDial, "Reply by Fri 11 PM", SlideToApprove, Ask to change · Decline, More about this outing, verified footnote); after approving, a minimal Status page follows the outing (Waiting → Pass ready → Out → Back, or Back late / Not going / Withdrawn) by status-bar time skips; detail lives on "About this outing"; sheets Ask to change, Decline, Withdraw approval, Language; History, Notifications, Help; a Messages reference frame. Start: Guardian · Sign in.
- **Scrolling rule:** frames scroll only when content is taller than the frame, with the file's frame-level method (VERTICAL, content HUG, chrome fixed, last item 20 pt above the bar); lists that are the main content have at least 7 rows.
- **Where to look:** outings_fix/report.md (decisions, conflicts, NEEDS REVIEW, OWNER), run_status.md (Q0–Q9), gaps 370–380, DEMO.md (Student outing and Guardian walkthroughs).

## Run STUDENT-REDESIGN (2026-10-14 – 15)

**What changed.** The student app (pages 04 and 07) was rebuilt from the reference pack design/reference/redesign_2026-10/ (34 images, menu board data, prompt). Page 05 Dark was not rebuilt: its 333 frames are marked " · stale". Staff and admin are unchanged except the admin Menu (four slots + Snacks) and Dishes.

**Sample day (all roles).** Wed 14 Aug 2024, 7:00 AM; week Mon 12 – Sun 18 Aug; Aarav ••0238, Block B, Main Mess, 120 pts; Juice ticket 7A3F; outing Sat 17 Aug 2–8 PM, Express Avenue Mall, Shopping, pass 7F3K (outing dates moved by 427 days from Oct 2025, weekday kept). Menus come from the real mess board (redesign/menu_tiers.json; NEEDS CHECK items in redesign/needs_check.md).

**Brand rule V2 (Orbit).** OrbitBackdrop is a fixed bottom layer on every app frame (exceptions: OS lock-screen mockups, Gallery, SOS camera, Guardian Messages board, Gate Scan and full-colour results); lime on light only as an ink-outlined element; never lime text on white; at most 3 lime kinds per frame beyond the backdrop (logo and AppIcon exempt); mono only for numbers.

**Banned in the student UI.** Calories, nutrition, kcal, plate tracker, the Waste screen, "How this is measured", "or" between dishes, "served" for scans.

**Components (page 03, this run).** OrbitBackdrop 2129:2343, DietMark 2129:2198, OrbitMark 2129:2211, AppIcon 2129:2240, DishPictogram 2129:2299, ProblemGlyph 2129:2324, HighlightChip 2132:2197, DishTile 2132:2406, MealSegments4 2133:2323, TicketStrip 2133:2374, CrowdRow 2133:2427, HeroCard 2135:2336, AnswerRow 2135:2382, FaceButton 2136:2321, ProblemTile 2136:2360, SeveritySegmented 2136:2382, ProofCard 2137:2399, ProofChecks 2137:2448, EntryQRCard 2153:3742, IssueCard 2156:2702.

**Tools.** design/audit/tools/ (srh, srarc, srhome, srmeals, srmealswire, srp5–srp9 and wires, srlight, oust, menu_tiers.py); stored in the file's shared plugin data under the same keys. The builders clone the archived "Help (before redesign)" frame 2174:33148 on page 99 — do not move or delete it.

**Owner items.** Gaps 381–386 (yellow highlight meaning, snacks intent, ** gravies, final logo file, Tamil text, SF Symbols), 395 (admin nutrition inputs), plus the NEEDS REVIEW list in redesign/report.md.

## Run POLISH (2026-10-16)

**What changed.** Fixes on the student app (04, then 07; 05 stays stale) from design/reference/polish_2026-10/ (P01–P04): Credits shows the original coupon cards again under the points hero; HighlightChip has a fixed 18 pt info circle; the Home crowd row opens a new **Crowd · Main Mess** page (black card, 15-minute chart, two tiles; states Quiet, Busy, Packed, Closed, Offline, plus Breakfast, Snacks, Dinner); Notifications cards use 36 pt type circles and no app logo (lock-screen mockups keep it); a right swipe on the Home "Not answered" card and the lunch row sets a 1-hour reminder (revealed → reminder set → reminder fired); every ticket page shares the P04 ticket layout; a spacing audit snapped gaps to 8/12/16/24, card padding to 12/16/20, single-line rows to 56 and equalised two-column pairs.

**Rules added.** Crowd: the current slot is the bar containing the clock time; the bottom fade shows only when the content scrolls. Dead space: grow the main element by at most 100 pt; never grow a list card (that is filler). Swipe: On drag needs Smart animate; the revealed frame auto-advances after 0.7 s.

**Tools.** design/audit/tools/q2crowd.js, q4notif.js, q5swipe.js, q6ticket.js, q7audit.js, q7fix.js (also stored in shared plugin data under the same keys).

**Owner items.** Gaps 398–407 (crowd sample data, snacks window, lime budget on the revealed frames, ticket layout trade-offs, NEEDS REVIEW dead bands and two-line rows, 05 Dark) and NEEDS REVIEW in polish/report.md.

