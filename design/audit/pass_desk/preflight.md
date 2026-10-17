# PASS-DESK · Q0 preflight (2026-10-17, read-only)

- **HEAD:** 25413e3 (DOOR-SCANNER v2 D9) before this run; pack committed as 14ec9ea. `git push --dry-run`: up to date. Identity VeeraaVikash <veeraavikashs21@gmail.com>.
- **Snapshot:** st335 = st334 on all 18 pages (0 differences); flow starts 14 (page 09: **Mess staff · Sign in**). Taken in five calls (60 s tool limit).
- **Pack:** design/reference/pass_desk_2026-10/ — README, data/pass_desk_spec.md, prompt, **17 images** (P01–P17) and 17 SVGs. It was not in the repo; it was copied from the upload (the brief's fallback) and committed.

## Page 09 Mess Staff: Pass Desk family (12 frames, on the page grid, no section)

| Family | Frames | Count | Notes |
|---|---|---|---|
| MS-2 Start shift | Start shift — Pass desk (1509:72) | 1 | Replaced: the desk goes straight to Home (no Start Shift) |
| MS-H Home | Home — Pass desk (1509:383) | 1 | Tiles Pass check, Check ID, Log by hand, Pass problem; End shift; tabs to the shared MS-E Alerts and MS-G Me |
| MS-B Pass desk | B1 Pass check (Live), (Changing), (Offline); B2 Check ID; B3 Has a Wednesday pass, No pass today; B4 Log by hand; B5 Logged; B6 Pass problem; B7 Sent to Devi | 10 | The old flow: live code check, ID check, hand log, reissue to Devi |

**Pass Desk family: 12 frames.** In the old model the desk could "Log by hand" (a manual record) and B3 "Has a Wednesday pass" ended with Done without a code comparison; both are replaced by the new check-then-record flow.

## Shared with the other roles (not redesigned)

| Frame | Use for the Pass Desk |
|---|---|
| MS-0 Sign in, Verifying, Confirm profile | Entry (flow start) |
| MS-1 · Choose your role (rebuilt in DOOR-SCANNER) | Pass Desk row → **DS-0 · Password — Pass Desk** |
| DS-0 · Password — Pass Desk (2469:2480, shared password page, role chip "Pass Desk") | Today: any digit → MS-2 Start shift — Pass desk (to be rewired to the What you do sheet / Home) |
| MS-E1 Alerts, Alerts (Empty), MS-E2 Alert detail | Kitchen Staff alerts (Q5 adds "Food short at the pass desk") |
| MS-G1–G6 Me, My shifts, Waiting to send, Language, Help, End shift summary | Language and Help reused from the Pass Desk Me |
| Door Scanner components (03): StaffTabBar3, SOSEdgeTab, SOSPanel, KeyPad, ResultScreen, ProblemOption, RoleRow, SOSAlertCard, AlertRow, CountTile | Reused |
| DS-3 · Can't check right now (Door Scanner offline screen) | Copied with pass wording (Q4) |
