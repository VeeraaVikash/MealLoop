# DOOR-SCANNER · decisions made without asking

| # | Stage | Decision | Rule followed |
|---|---|---|---|
| 1 | D1 | Ten new component sets on page 03, each flagged "DOOR SCANNER 2026-10 (new)" in its description: ScannerCard (Ready, Low light, Camera denied, Offline, **Before**), CountTile (Small, Large), TypeIdButton (Default, Disabled), ResultScreen (Success, Already, Not recognised, Offline, **Ended**), KeyPad (Regular, Compact), SOSEdgeTab (Active, Claimed), SOSPanel (Not claimed, Claimed), RoleRow (4 roles), StaffTabBar3 (Home, Alerts, Me), ProblemOption (3 kinds). Before and Ended are extra states for the before-meal card and the "meal ended during a scan" result. | Reuse first; flag new ones. |
| 2 | D1 | A new **StaffTabBar3** is added instead of restyling the existing StaffTabBar (1507:120513): that one is used on Pass Desk, Kitchen and Supervisor screens, which this run must not redesign. | Scope: Door Scanner only. |
| 3 | D1 | Icons the Symbols set lacks are drawn as vectors in the components (keyboard, torch, backspace, person with check, QR, QR with slash, shield with check, pot, camera with slash, check). No new tokens. | Use existing colours; no new tokens. |
| 4 | D1 | SOS time is split: "12:45 PM" in mono, "· 5 min ago" in sans (D13 draws the whole line in mono). | Mono only for numbers, times and units. |
| 5 | D1 | The camera brackets are one vector, and the SOS tab is one component, so Home during the meal has at most 3 lime elements (meal chip, brackets, SOS tab). | At most 3 lime elements. |
| 6 | D1 | The torch button is a 44 pt circle (D05 draws about 38 pt); the SOS tab is 58 × 108. | Targets at least 44 pt. |
