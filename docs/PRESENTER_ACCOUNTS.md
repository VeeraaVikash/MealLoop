# Presenter accounts

For the person presenting the prototype. These accounts are not shown anywhere in the app.

**Use the `MealLoop Review` scheme.** All data is seeded in memory. Nothing here is a real account, and no backend is involved.

The one prototype password is `DemoSeed.prototypePassword` in `ios/MealLoop/Data/Demo/DemoSeed.swift`. It is deliberately not repeated here.

| Role | Sign in with | Email | Shown as | Lands on |
|---|---|---|---|---|
| Student | Register first, then Sign in | `student@mealloop.example` (registration number `RA2311003010238`) | Aarav | Student Home |
| Super Admin | Sign in | `superadmin@mealloop.example` | SRM admin | Home and Me (placeholder) |
| Food Head / Admin | Sign in | `foodhead@mealloop.example` | Devi Raman | Today, Students, Results, More (placeholder) |
| Supervisor | Sign in | `supervisor@mealloop.example` | Ravi | Staff tabs (placeholder Home) |
| Kitchen Staff | Sign in | `kitchen@mealloop.example` | AK | Staff tabs, **Kitchen Home** |
| Door Scanner | Sign in | `door@mealloop.example` | SK | Staff tabs (placeholder Home) |
| Pass Desk | Sign in | `passdesk@mealloop.example` | SK | Staff tabs (placeholder Home) |
| Vendor | Sign in | `vendor@mealloop.example` | Mess vendor | Home and Me (placeholder) |
| Guardian | Sign in | `guardian@mealloop.example` | Aarav's guardian | One page, no tabs (placeholder) |
| Warden | Sign in | `warden@mealloop.example` | Hostel warden | Queue, Out now, Escalated, History (placeholder) |
| Gate Security | Sign in | `gate@mealloop.example` | Main gate | Home and Me (placeholder) |

**One Sign in (15 Nov 2026):** every account uses the same email and password form; the role comes from the account, never from the email. The SRM screen and the staff role picker with its 4-digit password were removed (SR-6 in `docs/OPEN_DECISIONS.md`).

**Student:** in a fresh launch the student has no password yet. Tap **Register**, type the email and registration number above, any password of 8 characters or more and a phone number, then confirm **Is this you?**. That signs Aarav in; after signing out, Sign in with the same email and the password you chose. The directory is seeded (SR-1); nothing reaches SRM.

**Switching roles:** sign out returns to Sign in, then sign in again. The app remembers nothing about an account, so every switch means typing the email and password.

**Kitchen Home in Review** opens before the meal at 7:00 AM, showing the forecast. The clock then runs in real time; nothing moves it. The meal starts and closes when the Supervisor does it, and every role sees the change. Relaunching resets to 7:00 AM. Switch roles from **Demo states** (Welcome, or Me, You or More); data and time are kept.

**Live count in Review** starts at 0 and counts only recorded entries. To raise it, type the last four digits of a sample student at the door: 0238, 0412, 0377 or 0190.
