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

1. **Sign in with SRM** → Verifying → "Is this you?" (**Ravi · Mess staff · Main Mess**) → **Yep, that's me**.
2. **MS-C1 Start your shift** (Main Mess, Lunch) → **Start shift** → **MS-E Shift home**.
3. Tap **Demand** → MS-C2 (860 expected, 412 intents) → **See prep plan** → MS-C3.
4. **Adjust a quantity** → MS-C4 Sambar 50 L with a reason → **Save change** → C4a "In effect now".
5. **Back to prep plan** → **Menu and special meal** → MS-C5. Tap the top bar → Shift home.
6. Tap **Waste entry** → MS-D1 → **Save waste log** → D1a → **Open shift history** → MS-D4.
7. Top bar → Shift home → **Feedback** → MS-D2 → **Sambar** → MS-D3 → **Save action** → D3a.
8. Optional starts:
   - **Mess staff · Entry scanner:** Tap to scan → Scanned → Scan next → End shift → confirm.
   - **Mess staff · Pass desk:** Check → type the SRM ID → Check ID → Valid → **Redeem pass** → Redeemed → Check next pass.

## Admin · Sign in (page 10)

1. **Sign in with SRM** → Verifying → "Is this you?" (**Devi · Food head · 4 messes**) → **Yep, that's me** → **Today · Now**.
2. Now: the hero "Safe to keep serving lunch?". Open **5 more need you** → Decisions.
3. Decisions → **Karan pass reissue** → AD-6b → **Approve reissue** → Approving → **Approved 1:42 PM**.
4. **Issues** tab → SOS. Use the **Dishes · 4** pill → "Will the sambar fix hold?" → **Review fix** → AD-3c.
5. **Community · 5** pill → "Merge the 3 long-wait reports?" → **Compare and merge** → AD-3d.
6. **Insights** tab → Overview → **Waste** pill → mirrored chart (waste up, shortages down) → **Look closer · Wed lunch** → Meal.
7. **Manage** tab → hub → **People** → **Give access** → pick **Lakshmi** → Staff access (nothing highlighted) → Cancel.
8. People → See all people → **Ravi** → Staff access (Attendance scanner asked 10:52 AM) → **Approve access** → Saved.
9. Manage → **Surplus** → Accepted (Offered → Accepted → Collected) → **See dishes and steps** → Pickup detail.
10. Tab bar anywhere → Today, Issues, Insights and Manage roots. Search is not linked.

**Known limits:** Empty and Offline states have no live toggle, so they are reached from the tab-root pills or only on canvas. See run2/s11/stage11.md for the reachability lists.
