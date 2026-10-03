# MealLoop prototype · demo guide

All data is sample. The prototype needs **three prototype links**, one per role. Figma creates a shareable link per flow start, and **the owner creates them in Figma** (Prototype → flow start → Share). The starts named below already exist.

| Role | Flow start | Page | Device |
|---|---|---|---|
| Student (Aarav) | **Student · Sign in** | 07 Prototype & QA | iPhone 15 / 393 pt |
| Mess staff (Ravi) | **Mess staff · Sign in** (also Entry scanner, Pass desk) | 09 Mess Staff | iPhone 15 |
| Admin (Devi, food head) | **Admin · Sign in** (also Admin · Today / Issues / Insights / Manage) | 10 Admin | iPhone 15 |

## Student · Sign in (page 07)

1. **Sign in with SRM** → Verifying (moves on by itself) → "Is this you?" (Aarav). Tap **Yep, that's me** → All set → **Home · Afternoon**.
2. Home: **Meals** tab → Meals · Menu (lunch) → tap the current meal → Meal detail · Sending → Saved → **Track this meal?**
3. **Track my plate** → Your plate. Adjust the rice portion, then save, and come back via the tab bar.
4. Meals → **Dinner** → Meals · Meal detail (dinner) → **I'm in** → Sending → Saved → Track this meal? (dinner).
5. Back on dinner Meal detail, tap **Skip** → "Why skipping?" sheet → **Save** → Skipping dinner.
6. Tap **Not sure** → Not sure yet · "we'll ask again at 4:30".
7. **Community** tab → Community · List → **More breakfast options** → Suggestion → **Me too** → Sending → **Backed (113)** → tap to undo.
8. Home → **Rate a dish** (from a meal card) → Not good → pick reasons → **Send**.
9. **You** tab → **Rewards** (scroll to see History), then **Waste** from Home → Last week chart.
10. You → **Report · My reports** → ML-0998 (Fixed) → "Is it better now?"
11. Entry QR from Home → **Entry · QR** → Something's wrong → Discrepancy → Sending → **Request sent**.
12. Optional: the **States gallery** start walks every error, offline and empty state with left and right taps.

## Mess staff · Sign in (page 09)

1. **Sign in with SRM** → Verifying → "Is this you?" (**Ravi**) → **Yep, that's me** → **MS-C1 Start your shift** (Main Mess, Lunch) → **Start shift**.
2. **MS-E Shift home** shows only the supervisor's tasks as cards. **End shift** and the avatar **R** are in the top bar.
3. **Confirm the hold** (Safety) → "Is the biryani off the line?" (asked by Devi 1:41 PM) → lime **Yes, it's held** → Sending → **Held 1:48 PM** → **Mark inspected** → **Inspected 1:50 PM**. Then **Back** → Shift home.
4. **Report a shortage** → pick **Rice** → stepper **12 kg** → lime **Send alert** (on the black card) → **Alert sent 1:52 PM** → Back.
5. **Spare food pickup** → Accepted (Offered 2:10, Accepted 2:14, due 3:00 PM) → lime **Log pickup** → **Collected 3:05 PM** → Back.
6. **Who's coming** → MS-C2 → **See prep plan** → MS-C3 → **Adjust a quantity** → MS-C4 → **Save change** → C4a → Back.
7. **Record waste** → MS-D1 → **Save waste log** → D1a → Back. **Feedback** → MS-D2 → **Sambar** → MS-D3 → **Save action** → D3a.
8. Avatar **R** → **Profile sheet** (Kitchen supervisor, Main Mess, lunch) → **Notifications** (4 today) → **Devi asked you to confirm the hold** opens the hold.
9. Avatar → **Waiting to send** (3 actions, Try again) → Back. Avatar → **Help** (5 questions) → Back.
10. **End shift** → "End lunch shift?" → **End shift** → **Lunch shift done** (712 entered, waste logged 2:20 PM, 1 open item) → **Done** → Sign in.
11. Optional starts:
    - **Mess staff · Entry scanner:** Tap to scan → Scanned → Back → End shift.
    - **Mess staff · Pass desk:** the Redemption counter opens the log; Check → type the SRM ID → Valid → **Redeem pass** → Redeemed → Back.

## Admin · Sign in (page 10)

1. **Sign in with SRM** → Verifying → "Is this you?" (**Devi · Food head · 4 messes**) → **Yep, that's me** → **Today · Now**.
2. **Messes** pill → tap **South** → Mess detail South (520 of 800, Chapati at risk) → Back → tap **Annexe** → last synced 12:10 PM, not counted.
3. Avatar **DR** → **Profile sheet** → **Notifications** → top row **Kitchen confirmed the hold 1:48 PM** → Safety case.
4. **Search circle** (any tab bar) → Recent → tap the field → Results for "Main" (Dishes, Messes, People, Cases) → **Ravi** → Staff access.
5. **Issues** tab → SOS → **Dishes · 4** pill → "Will the sambar fix hold?" → **Review fix**.
6. **Insights** tab → Overview → **Waste** pill → mirrored chart. Then Reports & exports → **All messes** → Report preview (5–11 Aug) → lime **Export CSV** → **Exported 2:36 PM**.
7. **Manage** tab → hub → **Rewards** → **Redemptions** pill → today's 5 redemptions (₹2,370 of ₹5,000 used).
8. Hub shortcut rows: **Staff list** → Ravi; **Give access** → Lakshmi; **Audit log** → tap a dot on the hero → its entry.
9. Today → **To do** → **Karan pass reissue** → **Approve reissue** → Approved 1:42 PM.
10. Avatar → **Help** (5 questions) → Back. Avatar → **Sign out** → Sign in.

**Known limits:**
- Empty, Offline, Failed and other state frames have no live toggle, so they are seen on the canvas. The lists are in prototype_contract.md (Run 3 · R2-5).
- Turnout and reasons, and Prep accuracy, are deferred.
