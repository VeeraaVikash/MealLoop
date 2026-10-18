# KITCHEN · W0 preflight (2026-10-18, read-only)

- **HEAD:** 7fe94a1 (PASS-DESK Q9) before this run; pack committed as 9ac468e. `git push --dry-run`: up to date. Identity VeeraaVikash <veeraavikashs21@gmail.com>.
- **Snapshot:** st344 = st343 on all 18 pages (0 differences); flow starts 14. Taken in five calls (60 s tool limit).
- **Pack:** design/reference/kitchen_2026-10/: README, data/kitchen_spec.md, prompt, **17 images** (K01–K17) and SVGs. It was copied from the upload (the brief's fallback) and committed.

## Page 09 Mess Staff: the Kitchen family (on the page grid, no section)

| Family | Frames | Count | Kitchen only or shared |
|---|---|---|---|
| MS-2 Start shift | Start shift — Kitchen (1509:130) | 1 | Kitchen only. Reached from DS-0 · Password — Kitchen Staff. Replaced: no Start Shift. |
| MS-H Home | Home — Kitchen (1509:451), (Alert) (1509:542), (Offline) (1509:643) | 3 | Kitchen only. Tiles How much to cook, Running out?, Add a batch, Record waste, Fixes, Spare food; End shift. |
| MS-C1 How much to cook | Plan ready, Confirmed, Offline | 3 | **Shared with Supervisor** (MS-H Home — Supervisor and (Alert) link to Plan ready) |
| MS-C2 Dish detail | Sambar | 1 | Shared (reached from C1) |
| MS-C3 Running out? | Form, Sent, Offline | 3 | **Shared with Supervisor** |
| MS-C4 Add a batch | Form, Saved | 2 | **Shared with Supervisor**. Also the target of the Pass Desk food-short card on MS-E1. |
| MS-C5 Record waste | Not yet, 1 Left over, 2 Plate waste, 3 Done | 4 | **Shared with Supervisor** |
| MS-C6 Fixes / MS-C7 Log a fix | Fixes; Log a fix, Saved | 3 | **Shared with Supervisor** |
| MS-C8 Spare food | Offered, Accepted, Collected, Late | 4 | **Shared with Supervisor** |

**Kitchen family: 24 frames.** 4 are Kitchen only (MS-2 ×1, MS-H ×3). The 20 MS-C frames are also reached from the Supervisor Home.

The old model had dish quantities ("How much to cook"), batches, fixes and spare food. The new Kitchen role drops all of these. It shows the headcount sent, live entries, a one-tap shortage report, and the waste report.

## Shared with the other roles (not redesigned)

| Frame | Use for Kitchen Staff |
|---|---|
| MS-0 Sign in, Verifying, Confirm profile | Entry (flow start) |
| MS-1 · Choose your role | The Kitchen Staff row currently goes straight to **DS-0 · Password — Kitchen Staff** (no What you do sheet yet) |
| DS-0 · Password — Kitchen Staff (2469:2607, role chip "Kitchen Staff") | Today: any digit → MS-2 Start shift — Kitchen (to be rewired to Home) |
| MS-E1 Alerts (with the PASS-DESK "Food short at the pass desk" card), Alerts (Empty), MS-E2 Alert detail | Kitchen and Supervisor alerts. The Supervisor Home links to MS-E1. |
| MS-F1–F5 Confirm hold | Kitchen (Alert) and Supervisor (Alert) safety hold. Supervisor flow, kept. |
| MS-G1 Me, G2 My shifts, G3 Waiting to send, G6 End shift summary | Kitchen and Supervisor (the Supervisor Home links to G1 and G6) |
| MS-G4 Language, MS-G5 Help | Shared by every staff Me page; reused |
| Supervisor: MS-2 Start shift — Supervisor, MS-H Home — Supervisor / (Alert), MS-D1–D3 | Not touched |
| Door Scanner and Pass Desk components (03): StaffTabBar3, SOSEdgeTab, SOSPanel, KeyPad, ResultScreen, AlertRow, SOSAlertCard, RoleRow, RequestRow, ShortageChips | Reused |

## Consequence for the archive plan

The Supervisor role is out of scope and must keep working. Only the 4 Kitchen-only frames will be archived (MS-2 Start shift — Kitchen, MS-H Home — Kitchen ×3), and only once their replacements exist. Their inbound links (the Kitchen password page) will be retargeted.

The shared MS-C, MS-E, MS-F and MS-G frames stay where they are for the Supervisor. Their outbound links to the archived Kitchen Home will be retargeted to the Supervisor Home or the new Kitchen Home, as the archive tool does. The new Kitchen pages link only to new KS frames and to the shared Language, Help, role selection and sign in.
