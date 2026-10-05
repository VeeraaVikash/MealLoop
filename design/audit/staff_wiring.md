# Staff wiring · Final-2 G7 (page 09, 2026-10-05)

All data is sample. Page 09 holds 77 rebuilt staff frames (G2–G6). It was checked with `tools/wire7.js` (manifest), `mealloop/reach8` (walk from the start, reading conditional actions) and a walk from each job's Home.

## Start and chain

**Start: Mess staff · Sign in** (on MS-0 · Sign in · new). It is the only start on page 09.

MS-0 · Sign in → Verifying (timer) → Confirm profile (Ravi, "Mess staff · Main Mess") → **MS-1 · Pick your job** → MS-2 · Start shift — <job> → that job's **MS-H · Home**.

| Job | Home | Tiles and rows → pages |
|---|---|---|
| Door scanner | MS-H · Home — Door scanner | Scan → MS-A1 Scan; Can't scan? → A7 keypad; Count → A8; Report a problem → A9 |
| Pass desk | MS-H · Home — Pass desk | Pass check → B1 (Live); Check ID → B2; Log by hand → B4; Pass problem → B6 |
| Kitchen | MS-H · Home — Kitchen | How much to cook → C1; Running out? → C3; Record waste → C5 (Not yet); Spare food → C8 (Accepted); rows Add a batch → C4, Fixes → C6 |
| Supervisor | MS-H · Home — Supervisor | the Kitchen tiles and rows + Change the plan → D1, Queue check → D3 |

Every home also has:
- an End shift row → MS-G6 End shift summary → Done → MS-0 · Sign in;
- the staff tab bar: Home, Alerts → MS-E1, Me → MS-G1.

## Flows

**Door scanner:**
- Scan: viewfinder → A2 Welcome.
- Can't scan? → A7. Check ID → A2 Welcome (Wednesday pass). The keypad keys are demo shortcuts: 1 → A3 Already in, 2 → A4 Not valid, 3 → A5 Wrong meal, 0 → A6 Offline.
- Every result's **Scan next** → A1 Scan.
- Report a problem: any of its 3 choices → A10 Sent to Ravi → Done → Home.

**Pass desk:**
- B1 Live ↔ Changing advance on a 2.5 s timer.
- Check ID → B2 → B3 Has a Wednesday pass (demo key 1: No pass today).
- Log by hand: a reason → B5 Logged.
- Pass problem → Ask for a reissue → B7 Sent to Devi.
- Results' Done → Home.

**Kitchen:**
- C1 Plan ready: Got it, cooking → C1 Confirmed. The Offline Got it, cooking also → Confirmed (it sends when online).
- C1 Sambar row → C2 Dish detail → Ask to change → D1 Change the plan.
- C3 Running out?: Send alert → Sent → Done → Home.
- C4 Add a batch: Save batch → Saved → Done → Home.
- C5 Not yet (status-bar time skip) → modal Record waste 1 Left over → 2 Plate waste → 3 Done → Home. Close (×) on every step → Home.
- C6 Fixes: Log a fix → C7 → Saved → Done → Fixes.
- C8 Accepted or Late: Log pickup → Collected → Done → Home.

**Supervisor:**
- D1 Change the plan: Save → D2 Saved · Devi told. The stepper "+" is the big-change demo → D2 Waiting for Devi. All their Done → Supervisor home.
- D3 Queue check: a choice → D3 Sent.

**Alerts:**
- E1 rows: Safety → F1 Confirm hold; Devi approved Sambar 50 L → E2 Alert detail (Open the plan → C1); Sambar running low → C3 Sent; Plan confirmed → C1 Confirmed; New plan → C1 Plan ready.

**Confirm hold** (a modal):
- Reached from the home alert card's lime **Open alert** and from Alerts.
- F1 Stop → I've stopped serving → F2 Check → Batch checked and set aside → F3 Done → Back to Home.
- F4 Failed: Try again → F2. F5 Offline → F2.
- Close (×) → Back. "I can't. Call Devi" is a phone call (no screen).
- The Kitchen and Supervisor home status bars time-skip to their (Alert) variants.

**Me:**
- My shifts → G2; Waiting to send → G3 (Try again → Me); Language → G4; Help → G5; Switch job → MS-1; Sign out → MS-0.

## Manifest (wire7, before the G7 fixes)

| Status | Elements |
|---|---|
| linked | 218 |
| current tab | 11 |
| display only | 21 |
| disabled (Confirmed button, dashed "Fix on trial", "Curd kept back") | 7 |
| phone call (no screen) | 4 |
| missing | 56 |

How the 56 missing elements were resolved:
- **21 are information** (Count tiles, Dish detail rows, Alert detail rows, End shift tiles and rows, Fixes status pills, the Late and Sent pills, the Me avatar). Renamed "(display only)".
- **27 are pick-one pills** (dish pills on C3, C4, C7 and D1; reason pills on D1). The groups are named "(in-place control: pick one)".
- **1 link added:** C1 Offline "Got it, cooking" → C1 Confirmed.
- **12 non-Sambar dish rows on the three C1 frames:** only Sambar has a dish detail. The other rows lost their chevron and are marked "display only: no dish detail yet". Listed in still_absent.md.

After the fixes, every tappable on page 09 is linked or classified, and nothing is left as missing.

**Targets:** the BackButton and Close stay the 44 pt glass circle (BACK STANDARD), but each has a transparent 56 pt hit area (47 added, same link). This meets the staff 56 pt target without changing the shared button. Logged as a conflict resolution.

## Reachability

From **Mess staff · Sign in**, the walk reaches 64 of 77 frames.

Each job's Home reaches the same 64, because Me → Switch job → Pick your job loops back to all four jobs.

**Unreachable: 13, all states.** They are reached by their own control, by time or by connection:
- MS-H Home — Door scanner (Empty) (before doors open);
- Kitchen (Offline);
- B1 Pass check (Offline);
- C1 How much to cook (Offline);
- C3 Running out? — Offline;
- C8 Spare food (Offered), (Late);
- D2 Cutoff passed;
- E1 Alerts (Empty);
- F4 Confirm hold — Failed, F5 — Offline.

The Kitchen (Alert) and Supervisor (Alert) homes are now reachable by the status-bar time skip (added in G7). Before that, they were also states.

**Bugs:** 0. **Frames with no way out:** 0. The intended end is MS-G6 → Sign in.

**Cross-role loops:** these are shown on their own pages (prototype links cannot cross pages):
- Running out? Sent → Devi's admin alerts;
- Pass problem → admin pass exception;
- admin Notify kitchen → staff Confirm hold.

## Decisions logged

- One tab bar is shared by four jobs, so the Home tab on Alerts and Me opens the Kitchen home.
- Task pages hide the tab bar (one primary action at the bottom).
- Shared kitchen results return to the Kitchen home.
- Demo shortcuts: keypad keys 0–3 on A7, key 1 on B2, the stepper "+" on D1, and the status-bar time skips on C5 and the Kitchen and Supervisor homes.
