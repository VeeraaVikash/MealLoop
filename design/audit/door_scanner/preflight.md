# DOOR-SCANNER · D0 preflight (2026-10-17, read-only)

- **HEAD:** 959e165 (GUARDIAN-VIDEO V7) before this run; pack committed as 4ffe625. `git push --dry-run` OK.
- **Snapshot:** st320 = st319 on all 18 pages (0 differences); flow starts 14 (page 09: **Mess staff · Sign in**).
- **Pack:** design/reference/door_scanner_2026-10/ — README, data/door_scanner_spec.md, prompt, 16 images (D01–D16) and 16 SVGs.

## Page 09 Mess Staff (77 phone frames, no sections)

| Family | Frames | Count | Door Scanner? |
|---|---|---|---|
| MS-0 Sign in | Sign in, Verifying, Confirm profile | 3 | Shared by all roles (flow start) |
| MS-1 Pick your job | Pick your job | 1 | **Shared** role selection (D01 updates it) |
| MS-2 Start shift | Door scanner, Pass desk, Kitchen, Supervisor | 4 | **Door scanner: 1** (replaced: no Start Shift for the door) |
| MS-H Home | Door scanner, Door scanner (Empty), Pass desk, Kitchen, Kitchen (Alert), Kitchen (Offline), Supervisor, Supervisor (Alert) | 8 | **Door scanner: 2** |
| MS-A Door scanner | A1 Scan, A2 Welcome, A2 Welcome (Wednesday pass), A3 Already in, A4 Not valid, A5 Wrong meal, A6 Offline, A7 Can't scan?, A8 Count, A9 Report a problem, A10 Sent to Ravi | 11 | **Door scanner: 11** |
| MS-B Pass desk | B1 ×3, B2, B3 ×2, B4, B5, B6, B7 | 10 | No |
| MS-C Kitchen | C1 ×3, C2, C3 ×3, C4 ×2, C5 ×4, C6, C7 ×2, C8 ×4 | 21 | No |
| MS-D Supervisor | D1, D2 ×3, D3 ×2 | 6 | No |
| MS-E Alerts | Alerts, Alerts (Empty), Alert detail | 3 | Shared (kitchen content; Door Home Alerts tab opens it) |
| MS-F Confirm hold | F1–F5 | 5 | Kitchen / Supervisor (SOS hold) |
| MS-G Me | Me, My shifts, Waiting to send, Language, Help, End shift summary | 6 | Shared (Door Home: Me tab, End shift row) |

**Door Scanner family: 14 frames** (MS-2 Door scanner, MS-H ×2, MS-A ×11). **Shared with other roles: 13** (MS-0 ×3, MS-1, MS-E ×3, MS-G ×6).

## Links into the Door Scanner family

- MS-1 Pick your job → MS-2 Start shift — Door scanner → MS-H Home — Door scanner.
- MS-H Door Home: tiles → A1 Scan, A7 Can't scan?, A8 Count, A9 Report a problem; End shift → G6; tabs → E1 Alerts, G1 Me; Back → MS-1.
- Every Home (all roles) Back → MS-1; Me → Switch job → MS-1, Sign out → MS-0.

## Components to reuse (page 03)

OrbitBackdrop (2129:2343), AppWordmark (420:1689), warden Logo row with Avatar (cloned), GlassSheet (74:275), Button (74:81), Toast (75:225), OfflineBanner (75:187), StatusPill, Symbols (qrcode, ticket, fork.knife, camera, person.2, text.bubble, flag, wifi.slash, exclamationmark.triangle, checkmark, clock, bell, house, person.crop.circle). The existing StaffTabBar (1507:120513) is used by Pass Desk, Kitchen and Supervisor; it is not changed (a new flagged tab bar is added for the door).
