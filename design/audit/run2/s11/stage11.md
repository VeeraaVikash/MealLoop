# Stage 11 · Linking (run 2)

Start `st156` (= `st155`), end `st157`. Tool: `tools/reach11.js` (`mealloop/reach11`).

## 1. Student (page 07)

- **Chain confirmed:** Sign in → Button → Verifying → after timeout → Confirm profile → "Yep, that's me" → All set → Home · Afternoon. Confirm profile goes through **All set**, which is the existing onboarding step.
- **New flow start "Student · Sign in"** on `221:62499`. Page 07 now has 26 starts.

## 2. Mess staff (page 09)

- **New row "MS-0 · Sign in"** at y 6000 (x 0 / 493 / 986): Sign in `1406:370`, Verifying `1406:405`, Confirm profile `1406:433`.
  - Cloned from page 07 with text changes only: initials "R", **Ravi**, •••4417, **Mess staff · Main Mess**, Block A. The student year line is hidden.
  - "Something's wrong" has no link (there is no staff correction flow).
- **Starts:** **Mess staff · Sign in**. Also **Mess staff · Entry scanner** (MS-A1) and **Mess staff · Pass desk** (MS-B1), because the scanner and desk roles don't go through shift select (logged).
- **Wiring (71 links, page 09 previously had 0):**
  - **Sign in path:** Confirm → MS-C1 → Start shift → **MS-E**.
  - **MS-E cards:** Demand → C2, Prep & override → C3, Waste entry → D1, Feedback → D2, Shift history → D4.
  - **C row:**
    - C2 See prep plan → C3;
    - C3 Adjust a quantity → C4, Menu and special meal → C5;
    - C4 Save change → C4a, Cancel → C3;
    - C4a and C4b Back to prep plan → C3; C4b Withdraw → C3.
  - **D row:**
    - D1 Save waste log → D1a → Open shift history → D4;
    - D2 Sambar → D3 → Save action → D3a → Back to feedback → D2; D3 Cancel → D2.
  - **Return home:** on every C and D screen, a tap on the **staff top bar** → MS-E. Staff screens have no back control (logged as gap 301).
  - **A row:**
    - Tap to scan or the viewfinder → A2;
    - Scan next (A2–A5) → A1;
    - End shift (A1–A5) → A6; A6 Cancel → A1, End shift → staff Sign in.
  - **B row:**
    - Viewfinder → B3; Check → B2 → field → B2b → Check ID → B3;
    - Scan QR instead → B1;
    - Redeem pass → B3b; Cancel → B1;
    - Check next pass (B3b, B4, B5, B7) → B1; B6 Try again → B1;
    - End shift → B8; B8 Cancel → B1, End shift → Sign in.
- **No cross-page links.**

## 3. Admin (page 10)

- **New row "AD-0 · Sign in"** at y 10920 (x 0 / 473 / 946): Sign in `1406:493`, Verifying `1406:528`, Confirm profile `1406:556`.
  - Profile: "DR", **Devi**, **Food head · 4 messes**. The roll and year lines are hidden.
  - Confirm → **AD-1a · Today — Now**.
- **Approved admin starts (recorded):** Admin · Today (`811:21056`), Admin · Issues (`849:564`), Admin · Insights (`877:983`), Admin · Manage (`968:3292`) and **Admin · Sign in** (`1406:493`).

## 4. Reachability (breadth-first walk over every action from all starts; BACK counts as an exit)

| Page | Frames | Reached | Unreachable | Dead ends |
|---|---|---|---|---|
| 07 | 261 | 257 | 4 | 0 |
| 09 | 34 | 25 | 9 | 0 |
| 10 | 151 | 84 | 67 | 0 |

- **07 unreachable (all intentional):**
  - Plate tracker · First run: an engineering rule (§3.2.3a).
  - Meal detail (dinner) · Answer Yes · Failed: an error state.
  - Me too Failed and Me too Offline: state frames.
- **09 unreachable (intentional):**
  - result and error states with no live trigger: A3 Duplicate, A4 Invalid, A5 Offline, B4 Already redeemed, B5 Invalid / expired, B6 Offline, B7 Redemption log;
  - C4b Awaiting approval (needs a >20% change; the demo uses +19%);
  - MS-E-empty (before 12:00 PM).
- **10 unreachable:**
  - **Intentional:** the Empty and Offline families (no live state toggle, 54 frames) and the event-driven states:
    - AD-1d Open, Read-only and Offline;
    - AD-3b Notified, Failed and Confirmed, and the AD-3b2 sheets (Ravi's confirmation is an outside event; Notify kitchen swaps the component in place);
    - AD-6b Failed, AD-7b Failed;
    - AD-6d Offered, Collected and Late.
  - **Real but not fixed (design change needed):** AD-7b Remove access sheet (gap 297).
- **Fixed in this stage:** page 09 had no links at all (now wired). Dinner Meal detail answers and admin tabs were fixed in Stages 3 and 10.

## 5. Demo

- `design/audit/DEMO.md` gives per-role starts and 10–15 step walkthroughs.
- **Three prototype links are needed**, and the owner creates them in Figma.
