# MealLoop prototype · demo guide (Final-2 G12, 2026-10-05)

All data is sample. Each role has exactly one flow start, and admin has four extra tab starts. Figma makes one shareable link per flow start, so **the owner creates three prototype links in Figma**: Present → pick the flow start → Share prototype, once for each Sign in start below. All three use the iPhone frame at 393 pt.

| Role | Flow start | Page | Home after sign-in |
|---|---|---|---|
| Student (Aarav ••0238) | **Student · Sign in** | 07 Prototype & QA | Home (Wed 14 Aug, 7:00 AM) |
| Mess staff (Ravi, supervisor) | **Mess staff · Sign in** | 09 Mess Staff | MS-H · Home for the job picked |
| Admin (Devi, food head) | **Admin · Sign in** (+ Admin · Today, Issues, Insights, Manage) | 10 Admin | AD-1a · Today — Now |

Each walk below was traced link by link on 2026-10-05 (reachability_final.md).

## Student · Sign in (page 07) · 21 steps (STUDENT-REDESIGN 2026-10-15; POLISH 2026-10-16; FIX-2 2026-10-16)

Sample day: **Wed 14 Aug 2024, 7:00 AM**, Aarav ••0238, Main Mess, 120 pts. Every tab bar on page 07 now works (Home, Meals, Community, You, Search). Traced link by link on 2026-10-15 and again on 2026-10-16 after run POLISH (reach8: 160 of 305 frames reached from the start, 0 dead ends; the rest are states shown by control, listed below).

1. **Onboarding · Sign in** (the flow start) → **Sign in with SRM** → **Onboarding · Getting your details** moves on by itself → **Home · Not answered** ("Hey Aarav", Wednesday 14 Aug, 7:00 AM; the top card asks **Breakfast today?** with **I'm in**, **Skip** and **Entry QR**).
2. **Entry QR** → **Entry QR** (live code) → **Back** → Home · Not answered.
3. **I'm in** → **Home · You're in** ("You're in for breakfast", lime "I'm in" chip, Show entry QR).
4. Hero **Show entry QR** → **Entry QR** → tap the card (demo: the door scanned it) → **Entry QR · Scanned** → **Home** tab (Home · You're in).
5. To see the other answer, restart from Sign in and tap **Skip** on Home · Not answered → **Home · Skipped** ("You skipped breakfast · Changed your mind? You can still eat", Show entry QR still works).
6. Lunch row **You in for lunch?** → **Answer · Lunch** (Bhindi Aloo Bujjiya highlight) → **I'm in** → Sending moves on → **Answer · Lunch · I'm in** → **Home** tab.
7. **Special pass** strip → **Pass · Available** → **Use pass** → **Pass · Confirm (holding)** → **Hold to use** → **Pass · Live 1 → 2 → 3** (moves on) → **Pass · Used**.
8. **Meals** tab → **Meals · Wed 14 · Lunch** → date strip **Thu 15** → **Meals · Thu 15 · Lunch**; on any day the segments **Breakfast / Snacks / Dinner** switch the meal; **Highlight** chip → info sheet.
9. Meals · Wed 14 · Lunch → Wednesday ticket strip (Chicken Briyani · Panneer Briyani) → **Pass · Available** → **Home** tab.
10. On Home tap the status bar (time skip) → **Home · Breakfast open** (8:10) → status bar again → **Home · After a meal** (9:40, "How was breakfast?").
11. **Not good** → **Feedback · Which dish** (Most reported: Sambar · Too salty) → tile **Sambar** → **What's wrong · Sambar** → **Send** → Sending moves on → **Feedback · Sent** ("The kitchen saw it") → **See it in My feedback** → **My feedback**.
12. Back on **Feedback · Which dish**: **Me too** → **Community · Issue** → **Me too** → Sending moves on → **Backed**; **4 comments** → **Community · Comments**. (**Service › Community** on the same sheet → **Community**.)
13. **Community** tab → **Community** (Open / Fixed) → **Fixed** → Community · Fixed → **Open**; ⓘ → **Community · Info sheet**.
14. Home → **SOS** → **SOS** (choose) → **I feel unwell after eating** → **Next: add a photo** → **SOS · Camera** → shutter → **SOS · Review** (proof checks) → **Send SOS** → **SOS · Sent** → **Done** → **Home**.
15. Home feedback row **You said the sambar was too salty** → **My feedback** → **Better** → **My feedback · Better saved**.
16. Bell → **Notifications** (type circles: lime check, fork and knife, bubble, ticket) → **Guardian approved** → **You · Outings** (the outing walk below starts here).
17. **You** tab → **You** → **Credits** (120 pts) → Juice **Get** → Getting a ticket moves on → **Ticket · Juice** (7A3F) → status bar (time skip) → **Ticket · Juice · Used**.
18. You → **Attendance** / **Spending** (tap Food delivery → **Edit expense**) / **My feedback** / **Help**; the profile row → **Request correction**.
19. Search circle on the tab bar → **Search** → recent **sambar** → **Search · Typing** → **Sambar · Wed · Breakfast** → **Search · Menu result** → the dish card → **Meals · Dish detail** (Sambar, Breakfast · Wed 14 Aug) → **Rate a dish** → **How was breakfast?**; finally You → **Sign out** → **Onboarding · Sign in**.

20. **Swipe to remind (POLISH Q5).** On Home drag the **You in for lunch?** row to the right → **Home · Lunch row · Swipe revealed** (lime "Remind me in 1 hr") → moves on by itself after 0.7 s → **Home · Lunch row · Reminder set** ("We'll ask again at 8:00 AM") → **Undo** returns to Home; or tap the status bar (time skip) → **Home · Lunch row · Reminder fired** (the row is back with a "Reminder" chip). The same works on the breakfast card: Home → status bar ×3 → **Home · Not answered** → drag the card right → Swipe revealed → Reminder set → status bar → Reminder fired.
21. **Crowd page (POLISH Q2).** On Home tap **Crowd at Main Mess** → **Crowd · Main Mess** (Lunch · 12:10 PM, "Quiet now", Best time 1:30 PM; chart every 15 minutes) → tap the status bar to step through the day: **Busy** (12:35) → **Packed** (12:50) → **Snacks** (4:35) → **Dinner** (7:40). Back → Home. From **Home · Breakfast open** the crowd row opens the **Breakfast** crowd page (8:10), which steps on to lunch.

**States by control** (present the frame; no link leads there in the sample day): Onboarding errors (Sign in failed, SRM down, Session expired, Not eligible, Offline); Home · Mess closed / After cutoff / Skipped / Empty / Offline / Loading / No Special pass; Answer · Cutoff passed (×4), Answer · Dinner family (the sample day's Home has no dinner row yet); Entry QR · Refreshing / Wrong mess / Walk-in / Already scanned, Entry · Discrepancy family; Pass · Expired / Not today · new / Not eligible / Already used / Wrong mess / Unavailable / Confirm (failed); Meals · Menu changed / Service ended / Not published / No menu; Crowd · Main Mess · Closed (from Home · Mess closed) and Offline (from Home · Offline); Community · Issue · Hidden / Me too failed; all Offline, Loading, Error, Empty, Failed variants; Outings states listed below. **Legacy frames kept without an entry** (no row on the new You): Notification settings, Quiet hours, Reminder prompt, Settings · System off, About MealLoop, Report · From feedback (NEEDS REVIEW in redesign/report.md).

**State gallery:** present from **Gallery · A · Sign in** on page 07 to walk the older state frames (right half next, left half previous).

## Mess staff · Sign in (page 09)

Demo shortcut (2026-10-07): every MS-H home has a round Back at the top left that returns to **MS-1 · Pick your job**, so the presenter can switch jobs in one tap. Its link sits on a 56 pt hit area. Re-checked hop by hop in the 2026-10-08 brand audit: all 91 hops in the three walks pass.

1. **MS-0 · Sign in**: tap **Sign in with SRM**. **MS-0 · Verifying** moves on by itself to **MS-0 · Confirm profile** (Ravi, "Mess staff · Main Mess").
2. **Yep, that's me** → **MS-1 · Choose your role** (Door Scanner, Pass Desk, Kitchen Staff, Supervisor; rebuilt in DOOR-SCANNER 2026-10-17).
3. **Door Scanner** → see the Door Scanner walk below (the old MS-2 / MS-H / MS-A door frames are archived on page 99).
4–5. **Me** tab → **MS-G1 · Me** → **Switch job** → Choose your role → **Pass Desk** → **Password — Pass Desk** → any digit → Start shift → **MS-H · Home — Pass desk** → **Pass check** → **MS-B1 · Pass check (Live)** (7A3F, lime) → it changes by itself to K2M9, blue.
6. **Check ID** → **MS-B2** → **MS-B3 · Has a Wednesday pass**. Then home → **Pass problem** → **MS-B6** → **Ask for a reissue** → **MS-B7 · Sent to Devi**.
7. Me → Switch job → **Supervisor** → **Password — Supervisor** → any digit → Start shift → **MS-H · Home — Supervisor** → **How much to cook** → **MS-C1 (Plan ready)** → **Sambar** → **MS-C2 · Dish detail — Sambar** → Back → **Got it, cooking** → **MS-C1 (Confirmed)**.
8. Home → **Change the plan** → **MS-D1** → stepper + → **Save** → **MS-D2 · Waiting for Devi** (big change) or **Change saved — Devi told**.
9. Home → **Running out?** → **MS-C3** → Sambar, 12 L → **Send alert** → **MS-C3 · Running out? — Sent**.
10. Home → tap the status bar (time skip to 1:41 PM) → **MS-H · Home — Supervisor (Alert)** → **Open alert** → **MS-F1 · Confirm hold — 1 Stop** → **I've stopped serving** → **MS-F2 · 2 Check** → **MS-F3 · 3 Done** → Home.
11. Home → **Record waste** → **MS-C5 (Not yet)** → time skip → **1 Left over** → **2 Plate waste** → **3 Done** ("Waste logged 2:20 PM").
12. Home → **Spare food** → **MS-C8 (Accepted)** → **Log pickup** → **MS-C8 (Collected)**.
13. **Alerts** tab → **MS-E1 · Alerts** → "Devi approved Sambar 50 L" → **MS-E2 · Alert detail**.
14. Home → **End shift** → **MS-G6 · End shift summary** → **Done** → MS-0 · Sign in.

### Door Scanner (page 09, from Mess staff · Sign in) · 14 steps (DOOR-SCANNER, 2026-10-17)

Hidden hotspots are SIMULATED server or device events; every Door Scanner frame has a "Simulated:" note under its Sample note. Sample: Main Mess, Lunch 12–2 PM, Wed 14 Aug 2024; door staff SK; supervisor Ravi.

1. **MS-0 · Sign in** → Sign in with SRM → Verifying → Confirm profile → **Yep, that's me** → **MS-1 · Choose your role**.
2. **Door Scanner** → **What you do (sheet)** → **Continue** (or **Don't show this again**) → **Password — Door Scanner**. (Tap the status bar = a wrong try → **Wrong** "2 tries left"; status bar again → **Locked** "Ask your supervisor to reset it".)
3. Tap any digit → **Home — Before the meal** ("Scanning opens at 12:00 PM", no count).
4. Tap the status bar (**Supervisor starts the meal**) → **Home — During the meal** (Meal in progress · 55 min, camera card, Recorded in 714, Type ID, Report a problem).
5. Camera card, top-left → **Entry recorded** (full lime, Aarav ••0238, 715 +1) → back to the camera after 1 s (or Scan next).
6. Camera card, top-middle → **Entry recorded — No meal response** (Dev ••0190, same screen) → **See the list** → **Entered without voting — During the meal** (3 so far) → Back.
7. Camera card, top-right → **Already scanned** (first scanned 12:55 PM, count stays 715) → Scan next. Bottom-left → **QR not recognised**; bottom-middle → **Wrong meal** ("This QR is for Dinner.").
8. **Type the last 4 digits** (from Type ID or a result page) → sheet: key **2** → One match (Aarav) → **Record entry** → Entry recorded; key **1** → Several matches → **Dev**; key **9** → No match → Try again. Tap the sheet's status bar → **Meal ended during a scan** → Back to Home.
9. Camera card, bottom-right → **Can't check right now** ("This entry is NOT recorded") → Try again → **Home — Offline** (banner) → Type ID → **Type the last 4 digits — Offline** (Record entry disabled) → tap the status bar = connection back.
10. Torch → **Low light** (torch on); the meal chip → **Camera denied** → Open Settings → back to During.
11. **Report a problem** → any choice → **Sent to Ravi** (toast) → (2 s) **Open problems — After your report** (Waiting, Seen, Fixed).
12. MealLoop wordmark (**an SOS starts**) → SOS tab appears → tap it → **SOS panel — Not claimed** → **I'll go and check** → **Claimed by you** → **Mark as checked** → toast "Marked as checked. Ravi will close it." → Home. (Back to scanning → lime tab; I can't go after all → Not claimed.)
13. Status bar, left part (**Supervisor ends the meal**) → **Home — After the meal** (774; Entered without voting 6; Open problems 1; Report a problem).
14. **Alerts** tab → SOS card + normal alerts (status bar → Alerts — Empty); **Me** tab → Switch role / Help / Sign out.

## Admin · Sign in (page 10)

1. **AD-0 · Sign in**: tap **Sign in with SRM**. **AD-0 · Verifying** moves on by itself to **AD-0 · Confirm profile** (Devi, "Food head · 4 messes").
2. **Yep, that's me** → **AD-1a · Today — Now**.
3. Tap the card stack "5 more need you" → **AD-1c · Today — Decisions** ("To do") → **Karan pass reissue** → **AD-6b · Pass exception (Open)** → **Approve** → Sending → **Approved**.
4. Today → **Messes** → **AD-1e · Today — Messes** → **North** → **AD-1b · Mess detail — North** (640 of 700) → **Rice** card → **AD-2c · Shortage alerts**.
5. Messes → **Annexe** → **AD-1b · Mess detail — Annexe** ("not counted", last synced 12:10 PM) → **How fresh is this?** → **AD-2d · Data gaps**.
6. **Issues** tab → **AD-3a · Issues — SOS** → hero → **AD-3b · Safety case** → **Notify kitchen** (changes in place: Sending → Notified).
7. Issues → **Dishes** → **AD-3a · Issues — Dishes** → **Review fix** → **AD-3c · Issue detail — Dish feedback** → Sambar → **AD-5b · Edit dish — Sambar**.
8. **Insights** tab → **AD-4a · Insights — Overview** → **Trends** → **AD-4c · Insights — Waste** → Look closer → **AD-4e · Insights — Meal**.
9. Overview → **Reports** → **AD-4d · Reports & exports** → **All messes** → **AD-4f · Weekly report** (9 A4 pages) → tap page 2 → **Report viewer — Page 2** → Next page.
10. Weekly report → **Export** → **Export sheet** → PDF → **AD-4f · Weekly report (Exported)** ("Exported 2:36 PM") → Done.
11. **Manage** tab → **AD-5-0 · Manage hub** → **Rewards** → **AD-6c · Rewards** → **Redemptions** → **AD-6c3 · Rewards — Redemptions** (63 juices, 12 ice creams).
12. Hub → **Staff list** → **AD-7b · Staff list** → Ravi → **Staff access — Ravi (Request)** → **Approve** → Sending → **Saved**.
13. Search circle (on any tab bar) → **AD-8c · Search — Recent** → tap the field → **AD-8c · Search — Results** (Dishes, Messes, People, Cases) → Chicken biryani → **AD-3b · Safety case**.
14. Avatar **DR** → **AD-8a · Profile sheet** → **Notifications** → **AD-8b · Notifications** → "Kitchen confirmed the hold 1:48 PM" → **AD-3b · Safety case (Confirmed)** → **Verify and close** → sheet → Sending → Sent.
15. Avatar → Profile sheet → **Help** → **AD-8d · Help**. Back → **Sign out** → AD-0 · Sign in.

## Cross-role loops

Run two prototype links side by side, on two phones or two windows. The prototypes do not talk to each other; the screens and times are drawn so they match.

| Loop | Admin (Devi) | Mess staff (Ravi) | Closes on |
|---|---|---|---|
| **Notify kitchen → Confirm hold** | AD-3b · Safety case → **Notify kitchen** (changes in place to Notified) | Supervisor or Kitchen home (Alert) → **Open alert** → MS-F1 Stop → F2 Check → F3 Done ("Held 1:48 PM, checked 1:50 PM") | Admin: AD-8b Notifications → "Kitchen confirmed the hold 1:48 PM" → AD-3b (Confirmed) → Verify and close |
| **Running out? → Alerts** | AD-1f · Today — Watch → **Shortages**, or a mess detail's dish card → **AD-2c · Shortage alerts** | MS-C3 Running out? → **Send alert** → Sent | AD-2c lists the dishes at risk across messes ("4 dishes at risk"); the kitchen's own alerts show on MS-E1 |
| **Pass problem → pass exception** | AD-1c To do → **Karan pass reissue** → **AD-6b · Pass exception (Open)** → Approve → Approved | Pass desk → **Pass problem** → **Ask for a reissue** → MS-B7 Sent to Devi | Student: Special pass → Pass · Live (the reissued pass) |

## Outing Pass module (run OUTINGS, 2026-10-13)

Three new flow starts, each on its own page; the owner makes one prototype link per start (Present → pick the start → Share prototype). **Approved starts now: 10** — Student · Sign in, Mess staff · Sign in, Admin · Sign in, Admin · Today, Admin · Issues, Admin · Insights, Admin · Manage, **Guardian · Sign in** (13), **Warden · Sign in** (14), **Gate · Sign in** (15). All data is sample. Checked with reach8 on 2026-10-13 (OUTINGS-FIX Q6): 0 dead ends on 07, 10, 13, 14, 15; unreached frames are states only (listed in outings_fix/report.md).

### Student outing (page 07, from Student · Sign in) · 14 steps (updated OUTINGS-FIX, 2026-10-13)

1. Sign in as usual → Home → **You** tab → **You**.
2. **Outings** row (top of the settings card) → **You · Outings** (one active request; Earlier: 7 past outings, scroll).
3. **New outing** → **New outing · Sat** (the week strip M T W T F S S, 12–18 Aug; Mon outlined as today, Sat and Sun shaded; Sat selected; RuleTag "Weekend rule · earlier deadline · draft"; 2 PM – 8 PM; ribbon "You'll know by Sat 12 PM").
4. Tap **M 12** → **New outing · Mon** (today, 1:40 PM, 3 – 6 PM): RuleTag and ribbon "Too soon"; the Send button is a dashed "Pick a later time".
5. Tap **W 14** → **New outing · Wed** (the weekday sample, 6 – 9 PM): "Weekday rule · same-day decision · draft"; guardian by 11 AM, warden 11 AM – 3 PM, "You'll know by Wed 3 PM".
6. Tap **T 13** / **T 15** / **F 16** → the same weekday rule for 2 – 6 PM (guardian by 8 AM, warden 8 – 11 AM, "You'll know by … 11 AM").
7. Tap **S 18** → **New outing · Sun** (10 AM – 4 PM; guardian by Sat 3 PM, warden Sat 3 – 8 PM, "You'll know by Sat 8 PM").
8. Tap **S 17** → back to Saturday → **Send to guardian** → **New outing · Sending** → moves on by itself to **New outing · Sent** (the story's send time, Fri 6:00 PM).
9. **See your request** → **Outing · Waiting for guardian** → tap the ring (demo: time passes) → **Outing · Under warden review**.
10. **Edit request** → **Edit warning** sheet → Keep it as it is. **Cancel request** → **Cancel confirm** sheet → Keep it.
11. Tap the ring (demo) → **Outing · Approved** → **Open pass** → **Outing pass · Valid** (7F3K, 2:00 PM – 8:00 PM).
12. **Cancel pass** link → **Cancel pass** sheet → Keep my pass.
13. Tap the pass (demo: the gate scanned it) → **Outing pass · Out** → tap again → **Outing pass · Returned**.
14. **Back to Outings** → **You · Outings** → **Emergency outing** row → **Emergency outing** → Send to the duty warden → **Emergency outing · Sent**.

Only Saturday's **Send** is wired (Sending, Sent and the tracker are the Saturday sample); on the other days the button is a preview. States shown by control (present the frame): Outings · Empty / Not enabled; New outing · Offline / No guardian / Duplicate (their week strips show Fri as today and Mon–Thu dashed as past); Outing · Escalated / Changes requested (Rejected and Expired open from the history rows); Outing pass · Overdue / Revoked / Expired unused. The same frames are on 04 (Light) and 05 (Dark) without links, except You → Outings.

### Guardian · Sign in (page 13) · video approval · 15 steps (GUARDIAN-VIDEO, 2026-10-16)

1. **G-0 · Sign in** ("We use the number SRM has on record.") → **Send code** → **G-0 · Verify code** (+91 98••• ••214) → **Verify** → **GV-01 · Choose** ("Aarav wants to go out", Express Avenue Mall, Sat 2–8 PM, reply by Fri 11 PM).
2. **More about this outing** → sheet → Close. Tap **தமிழ்** → **Language** sheet (English, தமிழ், हिन्दी) → a row returns to Choose.
3. **Accept** → **GV-00 · Before you record** (first use: what is recorded, who sees it, 30-day draft) → **Continue**.
4. **GV-02 · Record · Ready** (dark; front camera, the phrase "I accept Aarav's outing" and the code 4 7 2) → record button → **Record · Try 1 · 0:07** (REC, Live video only, countdown ring) → record button.
5. **Uploading** → (1.5 s) **Checking** → (1.5 s) **GV-06 · Sent** ("Sent to the warden", Phrase, Code and Number checked).
6. Sent → **Withdraw approval** → sheet → **Keep it** (or Withdraw approval → **Withdrawn**).
7. Sent → status bar (time skip to Sat 10:40 AM) → **G-3 · Status · Pass ready** → status bar → **Out** → status bar → **Back** (right half on Out → Back late).
8. **No match path:** on Checking tap the status bar → **GV-03 · Retry · try 2 of 3** → Record again → **Record · Try 2** (code 8 1 5) → **Retry · try 3 of 3** → **Record · Try 3** (code 3 0 6) → **GV-04 · Send video to the warden** → **Sent · Please watch**.
9. **Upload failed path:** on Uploading tap the status bar → **Upload failed** → **Take a photo instead** → **GV-05 · Photo and code** (face photo and the typed phrase) → **Sent · Photo and text**. (Try again · 1 left → Uploading.)
10. **No camera:** on Before you record tap the status bar → **Camera blocked** → **Ask the warden to call me** → **Sent · Call requested** (Open Settings → Record · Ready).
11. Record · Ready status bar → **Too dark** ("Find more light"); Try 1 status bar → **Too short** (under 4 s); the record button returns to Ready.
12. **Reject:** on Choose → **Reject** → **GV-08 · Reject (sheet)** (Exam soon, Not safe, Other, optional) → **Reject outing** → **Sent · Rejected** ("You said no. Aarav is told.").
13. **Ask to change** on Choose → sheet → Send to Aarav → **G-3 · Status · Change asked**.
14. Choose status bar → **Deadline passed** ("This request has expired"). **Past answers** (from Choose or Sent) → first row → **Already answered**; Messages, Help and Back.
15. Activation path: Sign in → **First time here? Activate** → Activate account → Confirm link → Done → **Open the request** → Choose.

There is no way to approve without a face (video or photo) or the warden's call. **Messages (reference, not an app screen)** shows the SMS; its bubble opens Choose.

### Warden · Sign in (page 14) · queue · 12 steps (GUARDIAN-VIDEO, 2026-10-16)

1. **W-0 · Sign in** → Sign in with SRM → Verifying (moves on) → Confirm profile → **WV-1 · Queue · Live video** (Block B · 1 of 14; Aarav; decide by Sat 12 PM; tab bar Queue, Out now, Escalated, History).
2. The card: the guardian's 10-second video (Live 0:09), transcript, checks Phrase, Code, Number. Tap the video → **Video loading** → (1.5 s) back.
3. **Approve** → **WV-1 · Approved** (Undo for 10 seconds) → **Next: Meera** → **Queue · Please watch** (no checks; the warden watches the video).
4. **Ask** → **Ask (sheet)** (what to change) → Send → **Change asked** → **Next: Arjun** → **Queue · Photo and text** (face photo and typed phrase).
5. **No** → **No (sheet)** (reason) → Reject outing → **Rejected** (or Cancel).
6. **Escalated** tab → **WV-4 · Escalated**: **Watch** (Meera) → Please watch card; **Call** (Kiran, No camera) → **Call Kiran's guardian (sheet)** → **Record the answer** → **Queue · Confirmed by call** (the warden's note); **Call** (Dev, past deadline) → sheet → **Close the request**.
7. **Out now** tab → **WV-2 · Out now** (Late black chip, Due outlined) → Kiran → **Out now · Kiran** (pass 4QZ8, gate times, Call) → Back.
8. **History** tab → **WV-3 · History** → Aarav → **Record · Aarav** (decision and evidence; video until Mon 16 Sep) → Back.
9. History → **All** → Aarav Sat 13 Jul → **Record · Video expired** ("Video deleted after 30 days. Transcript kept.") → Back.
10. WB avatar → **WV-5 · Me** → **Alerts** → W-6 · Alerts → Back; **Sign out** → Sign in.
11. Queue status bar → **Offline** (and back); Approved status bar → **Empty** ("Nothing to decide").
12. The warden sees only Block B.

### Guardian · Sign in (page 13) · before GUARDIAN-VIDEO (OUTINGS-FIX, 2026-10-13; slide-to-approve frames archived on page 99, kept for history)

1. **G-0 · Sign in** ("We use the number SRM has on record.") → **Send code**.
2. **G-0 · Verify code** (6 digits) → **Verify** → **G-2 · Request · Ready** (the opened SMS link; demo shortcut).
3. Read the request: "Aarav wants / to go out.", Express Avenue Mall, Sat 17 Aug · Shopping; the clock shows 2 → 8 PM (6 hours); "Reply by Fri 11 PM".
4. **More about this outing** → **G-2A · About this outing** (scroll: Leave / Back by / Reason, last 30 days, What happens next, Call the warden, verified).
5. Back → the Request.
6. (Optional) **Ask to change** → sheet → Close; **Decline** → sheet → Cancel. Tap **தமிழ்** → **Language** sheet → English.
7. Drag the track (**Slide to approve**) → **Request · Dragging** → **Request · Approved** → moves on by itself to **G-3 · Status · Waiting for the warden** ("You approved." "The warden decides by Sat 12 PM."). "Use button instead" goes straight to Approved.
8. Tap the status bar (time skip to Sat 10:40 AM) → **Status · Pass ready** ("Pass issued 10:40 AM · Aarav hasn't left yet").
9. Tap the status bar (time skip to Sat 5:10 PM) → **Status · Out** (black dot at now; "Aarav left Main Gate at 2:04 PM").
10. Tap the status bar (time skip to 7:41 PM) → **Status · Back** ("Aarav is back at the hostel (7:41 PM)").
11. Alternative endings: on Out tap the right half of the status bar → **Back late** ("Aarav was 40 min late. The warden has been told."); on Waiting tap the right half → **Not going** (with the warden's reason).
12. On Waiting **Withdraw approval** → sheet ("This cancels Aarav's pass. Aarav is told.") → Withdraw approval → **Status · Withdrawn** (or Keep my approval → back).
13. About this outing → **History** (7 past outings with on time / late) → Back; **Notifications** (7) → Back; **Help** (5 questions, Call the warden) → Back.
14. Activation path: on Sign in tap **First time here? Activate with your invite link** → **Activate account** → **Confirm link** ("You're linked to Aarav · Block B") → **Done** → **Open the request**.

States by control (present the frame): Request · Overnight (Sat 2 PM → Sun 8 PM, "+1 day"), Request · Weekday (Wed 6 → 9 PM, "Reply by Wed 11 AM"), Request · Offline, Request · Expired (time skip on Ready); Status · Declined and Change asked (after the sheets). **Messages (reference, not an app screen)** shows the four SMS from SRM Hostels; it has no links.

### Warden · Sign in (page 14) · before GUARDIAN-VIDEO (W-1 … W-5 archived on page 99, kept for history)

1. **W-0 · Sign in** → **Sign in with SRM** → **Verifying** (moves on) → **Confirm profile** (Block B warden) → **Yep, that's me**.
2. **W-1 · Queue — Decide next** (Block B · 1 of 14; top card Student ·5841, decide by Fri 8 PM, 2 h).
3. Tap the student row → **W-2 · Review request** (guardian approval, history) → Back.
4. **Ask** → **Ask the student** sheet (Need exact time …, note required) → Close.
5. **No** → **Say no to this outing?** sheet (reason required) → Cancel.
6. **Approve** → **Queue — Approved** (toast "Approved. The pass is issued now."; ·9375 on top).
7. **See all 14** → **W-3 · All requests** (Escalated and Due soon pills) → tap ·6127 → **W-4 · Escalated**.
8. **Reassign** → sheet (Block C warden) → Reassign.
9. **Emergency override** → sheet (reason required, "Recorded for review") → Cancel.
10. On the escalated card **Approve** → **W-4 · Decision recorded** → **Back to Escalated**.
11. **Me** tab (or the WB avatar) → **W-5 · Me** (8 AM–8 PM) → **Alerts** → **W-6 · Alerts** ("Deadline in 30 min") → Back.
12. **Sign out** → Sign in. States by control: Queue (Empty), Queue (Offline), Review window closed.

### Gate · Sign in (page 15) · 13 steps

1. **GA-0 · Sign in** → Verifying (moves on) → **Confirm profile** (Main Gate security) → **GA-1 · Gate home**.
2. **Scan pass** → **GA-2 · Scan** → tap the viewfinder → **GA-3 · Verify — Exit** (photo, Aarav ••0238, Block B, three checks).
3. **Yes, let out** → **GA-6 · Exit recorded** (lime; back by Sat 8 PM; 3 students out now) → **Scan next**.
4. On Scan tap **Can't scan?** → **GA-4 · Pass code** (7F3K) → **Check code** → Verify — Exit.
5. On Verify tap **Doesn't match** → **GA-9 · Report a problem** → a choice → **Sent to the duty warden** → Done → home.
6. Pass code → **No phone? Find the student by SRM ID** → **GA-5 · Find student** → Aarav → Verify.
7. Home → **Out now** → **GA-7 · Out now** (7) → Aarav → **GA-3 · Verify — Return** → **Yes, record return** → **GA-6 · Return recorded** ("Welcome back", 7:41 PM).
8. Home → **Overdue returns** → **GA-8** → **Record a return** → **GA-6 · Back late · flagged** → Scan next.
9. Home → **Report a problem** → GA-9.
10. Home → **End shift** → Sign in.
11–13. Results by control (present the frame): Already exited, Not valid, Pass withdrawn, Too early, Too late, Offline (fail closed, Call the warden), Emergency exit recorded.

### The cross-role loop (present in this order; each role on its own page)

1. **Student sends** — 07 New outing → Sent (Fri 6:00 PM, reply by Fri 11 PM).
2. **Guardian approves** — 13 Sign in → Verify → Choose → Accept → Before you record → Record → Sent (Fri 7:42 PM, video checked); 07 Notifications · Guardian answered → Outing · Under warden review ("Guardian approved by video · Fri 7:42 PM"); later the guardian's Status page follows the outing by time skip (Pass ready → Out → Back).
3. **Warden approves** — 14 Queue · Live video: Aarav's card with the video and checks (decide by Sat 12 PM) → Approve (Sat 10:40 AM).
4. **Pass issued** — 07 Outing · Approved → Open pass → Outing pass · Valid (7F3K).
5. **Gate exit** — 15 Scan → Verify — Exit → Exit recorded (Sat 2:04 PM).
6. **Gate return** — 15 Out now → Verify — Return → Return recorded (7:41 PM); 07 Outing pass · Returned.
7. **Admin** — 10 Manage → Outings tile → AD-9a Overview → Audit log (the same times).

## Known limits

- **States:** Empty, Offline, Failed and other states are reached only from their own control, or only on the canvas. reachability_final.md lists them.
- **Weekly report:** the 13 AD-4f frames sit inside the "AD-4f Weekly report" section on page 10. They are reached from AD-4d, but the reachability tool counts only top-level frames.
- **Controls that lead nowhere:** listed in still_absent.md.

## Admin redesign (page 12, 2026-10-16; FIX-2 clean-up) · 16 steps

Flow starts on page 12: **Admin redesign · Today**, **· Students**, **· Results**, **· More** (Figma: Present → pick the start). All data is sample: Wed 14 Aug 2024, food head Devi.

After FIX-2, page 12 holds 84 frames in sections (Today, Headcount, Meal pages, Students, Results, Report, Export, Menu, More). Every one of them is reached from the four starts, with 0 dead ends. Loading, empty and Sending-type states are on page 99 under "Admin · archived states" (admin_redesign/archive_index.md).

1. **Admin redesign · Today** → **Today · Lunch** (11:10): DayLine, four mess tiles (North is the black action tile), Needs you. The **Dinner** node opens Today · Dinner; its status bar (time skip) shows **Today · Offline**.
2. Tap the **North** tile → **Headcount · North** (700, range 660–740). **Send 700 to vendor** → **Headcount · Sent** → status bar (time skip) → **Vendor replied**. **Adjust headcount** opens the sheet.
3. **Today** tab → Needs you **Rice running low** → **Live meal · Main · Rice low** ("This is not the final count") → **Tell the vendor** → sheet (prepared message, vendor contact, not a login) → **Message** / **Call** → back.
4. **Today** tab → **Sambar left over** → **Meal report · Wed lunch** → **Check next time** → **Make it a change (sheet)** → **Save** → **Check next time · Wednesday lunch**.
5. **Results** tab → **Results · Left over** → black card **Fewer students came than we planned for** → reason page → MealCard **Wed 14 · lunch · Main** → Meal report.
6. Results → **To check** (F01): **Review** on Wed lunch → Meal report; **Review** on Tue dinner → **Meal report · Tue dinner**; **Testing** → Check next time · Wednesday lunch; **Open** (North scanner) → **Check next time · North scanner**.
7. **Report export (FIX-2).** To check → **Weekly report** → **Weekly report · This week** (4 meals left over, 1 meal ran out, 92%). Tap **Last week** / **Month** to switch periods.
8. **Export PDF** → **Preparing the report** (moves on by itself) → **Report ready** sheet (page 1 and page 2 thumbnails) → **Save to Files** → toast "Saved to Files" → back to the report. The A4 pages themselves are **Report PDF · Page 1 / Page 2** in the section "Export".
9. **Export CSV** → toast "Saved · weekly-report-12-18-aug.csv". **Send to vendor** → **Tell the vendor · Weekly summary** (meal counts and reasons only, no names or IDs) → **Message**.
10. Results → **Find an older meal** → **Find a meal**. The Left over list also has **Safety cases**.
11. **Students** tab → **Remind 630 students** → sheet. Rows: **Sambar too salty** (feedback), **Long wait at North** (community), **Why students skip**.
12. **More** tab → **Weekly menu** → **Thu 15** → **Edit day · Thu 15 Lunch** (F04). Tap the star on Steamed Rice (highlight), the veg mark on Kadi Pakoda, drag Onion Pulao (reorder), swipe Steamed Rice left → **Delete** → toast with **Undo**. The **!** ring on Aloo Gobi Athiraki opens **Check this word** → **Aloo Gobi Adraki**. **Add a dish** → sheet → **Curd Rice**. **Copy last Thursday** fills the day. Switch tabs **Breakfast / Snacks / Dinner**.
13. **Tell students about this change** on → **Save changes** → toast "Saved. Students see it now." → Weekly menu. With the switch off, the toast reads "Saved.".
14. **Menu quick change (FIX-2).** Weekly menu → **Change today's dinner** → sheet (F05): **Swap a dish** (Dal Tadka → Tomato Dal), **Add a special** (Chicken Biryani, Limited, Non-veg), **Remove a dish** (Panneer Butter Masala → confirm). Each returns to the sheet.
15. **Continue** → **Send to students?** (preview of the student notification) → **Send** → toast "Sent. Students see the new dinner." → Weekly menu. On the student side (07), the Notifications status bar shows **Notifications · Dinner changed** at 11:20 AM.
16. **More** → People and access, Outings, Announce (compose → confirm), and the five restyled pages (Passes, Votes, Rewards, Spare food, History). **Today** tab → status bar (1:40 PM) → **Today · Safety case open** → **Safety case · Open** → **Safety case · Closed**.
