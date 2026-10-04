# MealLoop prototype · demo guide (Final-fix F7, 2026-10-04)

All data is sample. Each role has exactly one flow start, and admin has four extra tab starts. Figma makes a shareable link per flow start, so **the owner creates three prototype links in Figma**: Present → pick the flow start → Share prototype, once for each of the three Sign in starts below. All links use the iPhone 15 frame (393 pt).

| Role | Flow start | Page | Home after sign-in |
|---|---|---|---|
| Student (Aarav) | **Student · Sign in** | 07 Prototype & QA | Home · Afternoon |
| Mess staff (Ravi, supervisor) | **Mess staff · Sign in** | 09 Mess Staff | MS-E · Shift home |
| Admin (Devi, food head) | **Admin · Sign in** (+ Admin · Today, Issues, Insights, Manage) | 10 Admin | AD-1a · Today — Now |

## Student · Sign in (page 07)

1. **Onboarding · Sign in**: tap **Sign in with SRM** → **Onboarding · Verifying** (moves on by itself) → **Onboarding · Confirm profile** ("Is this you?" Aarav).
2. Tap **Yep, that's me** → **Onboarding · All set** → **Home · Afternoon**.
3. On Home tap **I'm in** → **Answer Yes · Tap** → Sending → **Answer Yes · Saved** (moves on by itself).
4. Tap the **Crowd** card → **Crowd · Detail** → info → **Crowd · About this estimate** → Close → Back to Home.
5. **Meals** tab → **Meals · Menu** (lunch) → tap **Sambar** → **Meals · Dish detail** → **Rate this dish** → **Feedback · Step 1**.
6. **Not good** → **Feedback · Step 2 · Not good** → Send → **Feedback · Sending** → **Feedback · Receipt** → Home.
7. Meals → **Dinner** pill → **Meals · Menu — Dinner** → current meal → **Meals · Meal detail** → **I'm in** → Sending → Saved → **Meal detail (dinner) · Track this meal?**
8. **Track** → **Plate tracker · First run** → **Turn on** → **Your plate · expanded** → Save plate → **Your plate · saved** → **Done** → **You · Daily breakdown**.
9. Home → **Special pass** tile → **Pass · Available** → **Use Meal** → **Pass · Confirm (holding)** → hold → Sending → **Pass · Live 1–3** → **Pass · Used**.
10. Home → **Entry QR** → **Entry · QR** → tap the card → **Entry · Scanned**.
11. **Community** tab → **Community · List** → Long wait at counter 3 → **Community · Detail** → **Support** → Sending → **Community · Supported** → Comments → **Community · Comments**.
12. Home → **Report a problem** → **Report · What's wrong** → Not clean → **Report · Details** → Send → **Report · Sending** → **Report · Receipt** → My reports.
13. **You** tab → **You** → Rewards → **Rewards** → Use (Juice) → **Offer · Juice** → **Offer · Sending** → **Rewards · Got it**.
14. You → **Sign out** → **Onboarding · Welcome**.

Optional: present from **Gallery · A · Sign in** to walk the 96 state frames (tap right for next, left for previous). The gallery has no flow start, because the brief allows one student start.

## Mess staff · Sign in (page 09)

1. **MS-0 · Sign in**: tap **Sign in with SRM** → **MS-0 · Verifying** (moves on by itself) → **MS-0 · Confirm profile** ("Ravi", "Mess staff · Main Mess").
2. Tap **Yep, that's me** → **MS-C1 · Shift and mess select** (Main Mess, Lunch) → **Start shift** → **MS-E · Shift home**.
3. **Confirm the hold** → **MS-F1 · Confirm hold — Ask** → lime **Yes, it's held** → **MS-F2 · Sending** → **MS-F3 · Held** (moves on by itself).
4. **Mark inspected** → **MS-F4 · Inspected** → Back → MS-E.
5. **Report a shortage** → **MS-G1 · Report a shortage** → Rice, stepper 12 kg → **Send alert** → **MS-G2 · Sent** → Back.
6. **Spare food pickup** → **MS-G5 · Spare food — Accepted** → **Log pickup** → **MS-G6 · Collected** → Back.
7. **Who's coming** → **MS-C2 · Demand dashboard** → **See prep plan** → **MS-C3 · Prep recommendation**.
8. Tap the **Sambar** row → **MS-C4 · Override edit** → **Save change** → **MS-C4a · Override saved** → Back to prep plan.
9. Back to MS-E → **Record waste** → **MS-D1 · Waste entry** → **Save waste log** → **MS-D1a · Saved** → Open shift history → **MS-D4 · Shift history**.
10. **Feedback** → **MS-D2 · Feedback summary** → Sambar → **MS-D3 · Corrective-action log** → **Save action** → **MS-D3a · Saved**.
11. Avatar **R** → **MS-H3 · Profile sheet** → **Notifications** → **MS-H1 · Notifications** → "Devi asked you to confirm the hold" opens MS-F1.
12. Avatar → **Waiting to send** → **MS-H4 · Waiting to send** → Try again → MS-E.
13. **End shift** → **MS-E2 · End shift confirm** → End shift → **MS-H5 · End shift summary** → **Done** → MS-0 · Sign in.

The attendance scanner (MS-A1–A6) and pass desk (MS-B1–B8) belong to other staff accounts. They have no start (the brief allows one) and no duty picker exists yet. To show them, present from **MS-A1 · Scanning** or **MS-B1 · Scan the pass** in Figma.

## Admin · Sign in (page 10)

1. **AD-0 · Sign in**: tap **Sign in with SRM** → **AD-0 · Verifying** (moves on by itself) → **AD-0 · Confirm profile** ("Devi", "Food head · 4 messes").
2. Tap **Yep, that's me** → **AD-1a · Today — Now**.
3. Tap the peeking card stack "5 more need you" → **AD-1c · Today — Decisions** (titled "To do") → **Karan pass reissue** → **AD-6b · Pass exception (Open)** → **Approve** → **AD-6b · Sending** → **AD-6b · Approved**.
4. Back to Today → **Messes** → **AD-1e · Today — Messes** → **South** → **AD-1b · Mess detail — South** → Back.
5. Today → **Main** mess → **AD-1b · Today — Mess detail** → Curd card → **AD-1d · Decision — Curd override (Lapsed)**.
6. **Issues** tab → **AD-3a · Issues — SOS** → hero → **AD-3b · Safety case** → Back → **Dishes** pill → **AD-3a · Issues — Dishes** → **Review fix** → **AD-3c · Issue detail — Dish feedback**.
7. On AD-3c tap the Sambar card → **AD-5b · Edit dish — Sambar** → Back.
8. **Insights** tab → **AD-4a · Insights — Overview** → **Trends** tile → **AD-4c · Insights — Waste** → Look closer → **AD-4e · Insights — Meal**.
9. Back to Overview → **Reports** tile → **AD-4d · Reports & exports** → **All messes** → **AD-4f · Report preview** → Export CSV → **AD-4f · Report preview (Exported)**.
10. **Manage** tab → **AD-5-0 · Manage hub** → **Menu** tile → **AD-5a · Menu — Lunch** → Dinner pill → **AD-5a · Menu — Dinner** → Back.
11. Hub → **Rewards** → **AD-6c · Rewards** → **Redemptions** pill → **AD-6c3 · Rewards — Redemptions**.
12. Hub → **Staff list** → **AD-7b · Staff list** → Ravi → **AD-7b · Staff access — Ravi (Request)** → **Approve** → Sending → **AD-7b · Staff access — Ravi (Saved)**.
13. Search circle (any tab bar) → **AD-8c · Search — Recent** → tap the field → **AD-8c · Search — Results** → Chicken biryani → AD-3b · Safety case.
14. Avatar **DR** → **AD-8a · Profile sheet** → Notifications → **AD-8b · Notifications** → "Kitchen confirmed the hold" → **AD-3b · Safety case (Confirmed)** → **Verify and close** → **AD-3b2 · Verify and close sheet (Ready)** → Sending → Sent.
15. Avatar → **Sign out** → AD-0 · Sign in.

**Known limits:**
- Empty, Offline and Failed frames are reached only by their own control, so they are seen on the canvas. They are listed in reachability.md.
- Destination-absent controls are listed in wiring_manifest.md and finalfix_report.md.
