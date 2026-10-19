# SUPERVISOR · U0 preflight (2026-10-19, read-only)

- **HEAD:** 1014e9b (KITCHEN v2 W10) after a fast-forward pull of 41 remote commits (PASS-DESK, KITCHEN, KITCHEN v2, DOOR-SCANNER v2). The pack commit is dfc87f6. `git push --dry-run`: 1014e9b..dfc87f6 accepted. Identity VeeraaVikash <veeraavikashs21@gmail.com>.
- **Snapshot:** st364 = st363 on all 18 pages (0 differences, links and starts included); flow starts 14.
- **Pack:** `design/reference/supervisor_2026-10/` was missing; copied from the attached zip and committed: README, data/supervisor_spec.md, prompt (identical to the brief), **20 images S00–S19** with SVGs.
- **Kitchen pack v3** (also attached): adds K19 (SOS tab on Home in every meal state) and K20 (SOS panel, "Checked by the kitchen"); README, spec and prompt updated. Committed into `design/reference/kitchen_2026-10/`; the v2 README, spec and prompt are kept in `archive_v2/`. Kitchen redesign is out of scope for this run; coverage noted below and in gaps.

## Supervisor frames on page 09 today (v1 mess-staff family, not in a section)

| Family | Frames | Count | Shared? |
|---|---|---|---|
| MS-0 Sign in, Verifying, Confirm profile | 3 | 3 | **Shared** by all staff roles (flow start "Mess staff · Sign in") |
| MS-1 Choose your role | 1 | 1 | **Shared**; the Supervisor row goes straight to the password (no What you do sheet yet) |
| DS-0 Password — Supervisor (Door Scanner · Entry and password) | 1 | 1 | **Shared** password pattern; keys → MS-2 Start shift — Supervisor |
| MS-2 Start shift — Supervisor | 1 | 1 | Supervisor only |
| MS-H Home — Supervisor, (Alert) | 2 | 2 | Supervisor only |
| MS-D1 Change the plan, MS-D2 ×3 (Devi told, Waiting, Cutoff), MS-D3 ×2 (Queue check, Sent) | 6 | 6 | Supervisor only |
| MS-C1–C8 (How much to cook ×3, Dish detail, Running out? ×3, Add a batch ×2, Record waste ×4, Fixes, Log a fix ×2, Spare food ×4) | 20 | 20 | v1 kitchen tasks, now reached **only** from the v1 Supervisor Home (the Kitchen v2 pages link to KS frames) |
| MS-E1 Alerts, Alerts (Empty), MS-E2 Alert detail | 3 | 3 | v1 Supervisor alerts |
| MS-F1–F5 Confirm hold | 5 | 5 | v1 Supervisor safety hold (from Home (Alert)) |
| MS-G1 Me, G2 My shifts, G3 Waiting to send, G6 End shift summary | 4 | 4 | v1 Supervisor Me |
| MS-G4 Language, MS-G5 Help | 2 | 2 | **Shared** with the other staff roles |

**Supervisor-only v1: 48 frames** (MS-2, MS-H ×2, MS-D ×6, MS-C ×20, MS-E ×3, MS-F ×5, MS-G ×4, plus their labels, moments and notes). **Shared, kept: 8** (MS-0 ×3, MS-1, Password — Supervisor, Language, Help, and the role chip).

None of the v1 frames matches the pack: v1 is a kitchen-plan dashboard (tiles for cooking, waste and spare food, a safety hold). The pack Supervisor runs the meal (start, close), follows up shortages and missing waste reports, reads waste, and closes SOS cases.

## Plan

- Build the new Supervisor family as **SV-*** frames in new sections on page 09 (below the Kitchen sections, y ≥ 31400): Entry and Home; Alerts, shortages and waste; SOS; Me and history.
- **Reuse** StaffTabBar3, SOSEdgeTab, SOSPanel, SOSAlertCard, StatusText, the warden logo row, KeyPad password and the Kitchen dialog pattern; add **MealCard, FollowUpRow, ShortageRow (supervisor), WasteRow, ConfirmDialog (side-by-side), SOSCard and SOSPanel supervisor variants** only where nothing fits.
- Retarget the shared entry: Supervisor row → new SV-0 What you do sheet → shared password → SV-1 Home. MS-2 Start shift — Supervisor is no longer reached.
- At U9, **archive** to page 99 (links stripped, never deleted) the v1 Supervisor-only frames that nothing reaches any more; keep Language and Help.

## Kitchen v3 coverage (no change in this run)

| v3 image | Existing frame | Coverage |
|---|---|---|
| K19 SOS tab on Home, every meal state | KS-1 Home — SOS active, SOS claimed, Marked as checked (all during the meal); KS-3 Record waste — SOS tab | **Partly:** during the meal and on forms; no Before or After Home with the tab |
| K20 SOS panel ("Checked by the kitchen") | KS-5 SOS panel — Not claimed, Claimed by you; KS-1 Home — Marked as checked | Covered in shape; wording checked in U6 |

Logged as a gap for a later Kitchen pass.
