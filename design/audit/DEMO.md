# MealLoop prototype · demo guide (Final-2 G12, 2026-10-05)

All data is sample. Each role has exactly one flow start, and admin has four extra tab starts. Figma makes one shareable link per flow start, so **the owner creates three prototype links in Figma**: Present → pick the flow start → Share prototype, once for each Sign in start below. All three use the iPhone frame at 393 pt.

| Role | Flow start | Page | Home after sign-in |
|---|---|---|---|
| Student (Aarav ·0238) | **Student · Sign in** | 07 Prototype & QA | Home · Afternoon |
| Mess staff (Ravi, supervisor) | **Mess staff · Sign in** | 09 Mess Staff | MS-H · Home for the job picked |
| Admin (Devi, food head) | **Admin · Sign in** (+ Admin · Today, Issues, Insights, Manage) | 10 Admin | AD-1a · Today — Now |

Each walk below was traced link by link on 2026-10-05 (reachability_final.md).

## Student · Sign in (page 07)

1. **Onboarding · Sign in**: tap **Sign in with SRM**. **Onboarding · Verifying** moves on by itself to **Onboarding · Confirm profile** ("Is this you?").
2. **Yep, that's me** → **Onboarding · All set** → **Home · Afternoon**.
3. On Home tap **I'm in** → **Answer Yes · Tap** → Sending → **Answer Yes · Saved** (moves on by itself).
4. **Crowd** card → **Crowd · Detail** → ⓘ → **Crowd · About this estimate** (sheet) → Close.
5. **Meals** tab → **Meals · Menu** → **Sambar** → **Meals · Dish detail** → **Rate this dish** → **Feedback · Step 1** → Not good → Send → **Feedback · Sending** → **Feedback · Receipt**.
6. Meals → **Dinner** pill → **Meals · Menu — Dinner** → current meal → **Meals · Meal detail** → **I'm in** → Sending → Saved → **Meal detail (dinner) · Track this meal?**
7. **Track** → **Plate tracker · First run** → **Turn on** → **Your plate · expanded** → Save → **Your plate · saved** → **Done** → **You · Daily breakdown**.
8. Home → **Special pass** → **Pass · Available** → **Use** → **Pass · Confirm (holding)** → hold → Sending → **Pass · Live 1** → 2 → 3 (the code and colour change every few seconds) → **Pass · Used**.
9. Home → **Credits** → **Rewards** (titled "Credits"). On the Juice ticket tap **Get** → **Offer · Sending** → **Ticket · Juice · new** (code 7A3F, lime colour pill).
10. On the ticket tap the status bar (time skip) → **Ticket · Juice (Used) · new** → **Done** → Credits.
11. **Community** tab → **Community · List** → ⓘ → **Community · Info sheet · new** → Close. Then tap Long wait at counter 3 → **Community · Detail** → **Support** → Sending → **Community · Supported**.
12. Home → **Report a problem** → **Report · What's wrong** → Not clean → **Report · Details** → Send → **Report · Sending** → **Report · Receipt** → My reports.
13. **You** tab → **You** → Sign out → **Onboarding · Welcome**.

**State gallery:** the 96 student state frames have no flow start, because the brief allows one student start. To walk them, present from the **Gallery · A · Sign in** frame on page 07 (Figma: select the frame → Present). Tap the right half for next and the left half for previous.

## Mess staff · Sign in (page 09)

Demo shortcut (2026-10-07): every MS-H home has a round Back at the top left that returns to **MS-1 · Pick your job**, so the presenter can switch jobs in one tap. Its link sits on a 56 pt hit area. Re-checked hop by hop in the 2026-10-08 brand audit: all 91 hops in the three walks pass.

1. **MS-0 · Sign in**: tap **Sign in with SRM**. **MS-0 · Verifying** moves on by itself to **MS-0 · Confirm profile** (Ravi, "Mess staff · Main Mess").
2. **Yep, that's me** → **MS-1 · Pick your job** (Door scanner, Pass desk, Kitchen, Supervisor).
3. **Door scanner** → **MS-2 · Start shift — Door scanner** → **Start shift** → **MS-H · Home — Door scanner** → **Scan** → **MS-A1 · Scan** → tap the viewfinder → **MS-A2 · Welcome** (Aarav ·0238) → Scan next.
4. On Scan tap **Can't scan?** → **MS-A7** keypad → **Check ID** → Welcome (Wednesday pass). Keys 1 / 2 / 3 / 0 show Already in / Not valid / Wrong meal / Offline.
5. **Me** tab → **MS-G1 · Me** → **Switch job** → Pick your job → **Pass desk** → Start shift → **MS-H · Home — Pass desk** → **Pass check** → **MS-B1 · Pass check (Live)** (7A3F, lime) → it changes by itself to K2M9, blue.
6. **Check ID** → **MS-B2** → **MS-B3 · Has a Wednesday pass**. Then home → **Pass problem** → **MS-B6** → **Ask for a reissue** → **MS-B7 · Sent to Devi**.
7. Me → Switch job → **Supervisor** → Start shift → **MS-H · Home — Supervisor** → **How much to cook** → **MS-C1 (Plan ready)** → **Sambar** → **MS-C2 · Dish detail — Sambar** → Back → **Got it, cooking** → **MS-C1 (Confirmed)**.
8. Home → **Change the plan** → **MS-D1** → stepper + → **Save** → **MS-D2 · Waiting for Devi** (big change) or **Change saved — Devi told**.
9. Home → **Running out?** → **MS-C3** → Sambar, 12 L → **Send alert** → **MS-C3 · Running out? — Sent**.
10. Home → tap the status bar (time skip to 1:41 PM) → **MS-H · Home — Supervisor (Alert)** → **Open alert** → **MS-F1 · Confirm hold — 1 Stop** → **I've stopped serving** → **MS-F2 · 2 Check** → **MS-F3 · 3 Done** → Home.
11. Home → **Record waste** → **MS-C5 (Not yet)** → time skip → **1 Left over** → **2 Plate waste** → **3 Done** ("Waste logged 2:20 PM").
12. Home → **Spare food** → **MS-C8 (Accepted)** → **Log pickup** → **MS-C8 (Collected)**.
13. **Alerts** tab → **MS-E1 · Alerts** → "Devi approved Sambar 50 L" → **MS-E2 · Alert detail**.
14. Home → **End shift** → **MS-G6 · End shift summary** → **Done** → MS-0 · Sign in.

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

Three new flow starts, each on its own page; the owner makes one prototype link per start (Present → pick the start → Share prototype). **Approved starts now: 10** — Student · Sign in, Mess staff · Sign in, Admin · Sign in, Admin · Today, Admin · Issues, Admin · Insights, Admin · Manage, **Guardian · Sign in** (13), **Warden · Sign in** (14), **Gate · Sign in** (15). All data is sample. Checked with reach8 on 2026-10-13: 0 bugs, 0 dead ends on 07, 10, 13, 14, 15.

### Student outing (page 07, from Student · Sign in) · 13 steps

1. Sign in as usual → Home → **You** tab → **You**.
2. **Outings** row (top of the settings card) → **You · Outings** (one active request, history).
3. **New outing** → **New outing** (Sat 18 Oct, 2 PM – 8 PM, Express Avenue Mall, Shopping; ribbon "You'll know by Sat 12 PM").
4. Tap **Sun 19 Oct** → **New outing · Sunday 10 AM** (ribbon: guardian by Sat 3 PM, warden Sat 3–8 PM).
5. Tap **Sat 18 Oct** (or the slider) → back to the Saturday preview.
6. **Send to guardian** → **New outing · Sending** → moves on by itself to **New outing · Sent**.
7. **See your request** → **Outing · Waiting for guardian** (Fri 11 PM, in 5 h).
8. Tap the ring (demo: time passes) → **Outing · Under warden review** (Sat 12 PM, in 14 h; guardian approved Fri 7:42 PM).
9. **Edit request** → **Edit warning** sheet → Keep it as it is. **Cancel request** → **Cancel confirm** sheet → Keep it.
10. Tap the ring (demo) → **Outing · Approved** → **Open pass** → **Outing pass · Valid** (7F3K, 2:00 PM – 8:00 PM).
11. **Cancel pass** link → **Cancel pass** sheet → Keep my pass.
12. Tap the pass (demo: the gate scanned it) → **Outing pass · Out** → tap again → **Outing pass · Returned**.
13. **Back to Outings** → **You · Outings** → **Emergency outing** row → **Emergency outing** → Send to the duty warden → **Emergency outing · Sent**.

States shown by control (no path; present the frame): Outings · Empty / Not enabled; New outing · Offline / No guardian / Duplicate; Outing · Escalated / Changes requested (Rejected and Expired open from the history rows); Outing pass · Overdue / Revoked / Expired unused. The same 28 frames are on 04 (Light) and 05 (Dark) without links, except You → Outings.

### Guardian · Sign in (page 13) · 12 steps

1. **G-0 · Sign in** ("We use the number SRM has on record") → **Send code**.
2. **G-0 · Verify code** (6 digits) → **Verify** → **G-1 · Waiting for you**.
3. Tap Aarav's card (reply by Fri 11 PM) → **G-2 · Request** ("Aarav is asking to go out.").
4. **Ask to change** → **Ask Aarav to change it** sheet (Day / Time / Place / Other) → Close.
5. **Decline** → **Decline this request?** sheet (reason required) → Cancel.
6. Drag or tap **Slide to approve** → **Request · Dragging** → moves on by itself to **Request · Approved** ("Thank you. The warden reviews it next."). ("Use button instead" goes straight to Approved.)
7. **Withdraw approval** → **Withdraw your approval?** sheet → Keep my approval.
8. **Back to requests** → **Waiting for you** → **History** (Back) → **Notifications** (Back) → **Help** (Back).
9. Activation path: on Sign in tap **First time here? Activate with your invite link** → **G-A1 · Activate account** → Continue.
10. **G-A2 · Confirm link** ("You're linked to Aarav · Block B") → **Yes, that's right**.
11. **G-A3 · Done** → **See requests** → Waiting for you.
12. States by control: Request · Offline, Request · Expired, Waiting for you (Empty) (reached after Decline or Ask).

### Warden · Sign in (page 14) · 12 steps

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
2. **Scan pass** → **GA-2 · Scan** → tap the viewfinder → **GA-3 · Verify — Exit** (photo, Aarav ·0238, Block B, three checks).
3. **Yes, let out** → **GA-6 · Exit recorded** (lime; back by Sat 8 PM; 3 students out now) → **Scan next**.
4. On Scan tap **Can't scan?** → **GA-4 · Pass code** (7F3K) → **Check code** → Verify — Exit.
5. On Verify tap **Doesn't match** → **GA-9 · Report a problem** → a choice → **Sent to the duty warden** → Done → home.
6. Pass code → **No phone? Find the student by SRM ID** → **GA-5 · Find student** → Aarav → Verify.
7. Home → **Out now** → **GA-7 · Out now** (3) → Aarav → **GA-3 · Verify — Return** → **Yes, record return** → **GA-6 · Return recorded** ("Welcome back", 7:41 PM).
8. Home → **Overdue returns** → **GA-8** → **Record a return** → **GA-6 · Back late · flagged** → Scan next.
9. Home → **Report a problem** → GA-9.
10. Home → **End shift** → Sign in.
11–13. Results by control (present the frame): Already exited, Not valid, Pass withdrawn, Too early, Too late, Offline (fail closed, Call the warden), Emergency exit recorded.

### The cross-role loop (present in this order; each role on its own page)

1. **Student sends** — 07 New outing → Sent (Fri 6:00 PM, reply by Fri 11 PM).
2. **Guardian approves** — 13 Request → Slide to approve → Approved (Fri 7:42 PM).
3. **Warden approves** — 14 Queue: Aarav is the third card (decide by Sat 12 PM); open it from All requests → Review request → Approve (Sat 10:40 AM).
4. **Pass issued** — 07 Outing · Approved → Open pass → Outing pass · Valid (7F3K).
5. **Gate exit** — 15 Scan → Verify — Exit → Exit recorded (Sat 2:04 PM).
6. **Gate return** — 15 Out now → Verify — Return → Return recorded (7:41 PM); 07 Outing pass · Returned.
7. **Admin** — 10 Manage → Outings tile → AD-9a Overview → Audit log (the same times).

## Known limits

- **States:** Empty, Offline, Failed and other states are reached only from their own control, or only on the canvas. reachability_final.md lists them.
- **Weekly report:** the 13 AD-4f frames sit inside the "AD-4f Weekly report" section on page 10. They are reached from AD-4d, but the reachability tool counts only top-level frames.
- **Controls that lead nowhere:** listed in still_absent.md.
