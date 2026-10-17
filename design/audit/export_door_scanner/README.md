# export_door_scanner · run DOOR-SCANNER (2026-10-17)

40 PNG files at 2× (786 × 1704 px), one per new or changed Door Scanner frame on page 09 (plus the shared role selection MS-1 and the shared password page for the other three roles). Names follow the reference images in `design/reference/door_scanner_2026-10/` (D01–D16) with a suffix per state; `DS_` files have no reference image (Alerts, Alerts empty, Me).

How they were made: the stored tool `dsexp` (gvexp reading `mealloop/ds_export_plan`) clones each frame 8000 pt above itself, scales the clone 2×, and the clone is captured at 1704 px. The clones were removed afterwards. Node IDs below are the frames.

| File | Frame | Node |
|---|---|---|
| D01_role_selection@2x.png | MS-1 · Choose your role | 1508:235 |
| D02_what_you_do_sheet@2x.png | DS-0 · What you do (sheet) | 2469:1927 |
| D03_password@2x.png | DS-0 · Password — Door Scanner | 2469:2102 |
| D03_password_wrong@2x.png | DS-0 · Password — Wrong | 2469:2229 |
| D03_password_locked@2x.png | DS-0 · Password — Locked | 2469:2355 |
| D03_password_pass_desk@2x.png | DS-0 · Password — Pass Desk | 2469:2480 |
| D03_password_kitchen_staff@2x.png | DS-0 · Password — Kitchen Staff | 2469:2607 |
| D03_password_supervisor@2x.png | DS-0 · Password — Supervisor | 2469:2734 |
| D04_home_before_meal@2x.png | DS-1 · Home — Before the meal | 2471:2234 |
| D05_home_during_meal@2x.png | DS-1 · Home — During the meal | 2471:2437 |
| D05_home_during_meal_sos@2x.png | DS-1 · Home — During · SOS active | 2471:2581 |
| D05_home_camera_denied@2x.png | DS-1 · Home — Camera denied | 2471:2868 |
| D05_home_low_light@2x.png | DS-1 · Home — Low light | 2471:3003 |
| D05_home_offline@2x.png | DS-1 · Home — Offline | 2471:3146 |
| D06_type_last4_typing@2x.png | DS-2 · Type the last 4 digits — Typing | 2472:2645 |
| D06_type_last4_sheet@2x.png | DS-2 · Type the last 4 digits — One match | 2472:2910 |
| D06_type_last4_several_matches@2x.png | DS-2 · Type the last 4 digits — Several matches | 2472:3110 |
| D06_type_last4_no_match@2x.png | DS-2 · Type the last 4 digits — No match | 2472:3317 |
| D06_type_last4_offline@2x.png | DS-2 · Type the last 4 digits — Offline | 2482:186231 |
| D07_entry_recorded@2x.png | DS-3 · Entry recorded | 2472:172058 |
| D07_entry_recorded_no_response@2x.png | DS-3 · Entry recorded — No meal response | 2472:172162 |
| D08_already_scanned@2x.png | DS-3 · Already scanned | 2472:172269 |
| D09_qr_not_recognised@2x.png | DS-3 · QR not recognised | 2472:172371 |
| D09_wrong_meal@2x.png | DS-3 · Wrong meal | 2472:172486 |
| D10_cant_verify_offline@2x.png | DS-3 · Can't check right now | 2472:172595 |
| D11_report_a_problem@2x.png | DS-5 · Report a problem | 2474:3212 |
| D11_report_a_problem_sent_toast@2x.png | DS-5 · Report a problem — Sent to Ravi (toast) | 2474:3359 |
| D12_home_meal_ended@2x.png | DS-1 · Home — After the meal | 2471:2732 |
| D12_meal_ended_during_scan@2x.png | DS-3 · Meal ended during a scan | 2471:3284 |
| D13_sos_panel_not_claimed@2x.png | DS-7 · SOS panel — Not claimed | 2476:3498 |
| D14_sos_panel_claimed@2x.png | DS-7 · SOS panel — Claimed by you | 2476:3747 |
| D14_home_sos_claimed@2x.png | DS-7 · Home — During · SOS claimed by you | 2476:3925 |
| D14_home_marked_as_checked@2x.png | DS-7 · Home — Marked as checked (toast) | 2476:4075 |
| D15_entered_without_voting@2x.png | DS-6 · Entered without voting | 2474:3748 |
| D15_entered_without_voting_during@2x.png | DS-6 · Entered without voting — During the meal | 2474:3886 |
| D16_open_problems@2x.png | DS-6 · Open problems | 2474:3490 |
| D16_open_problems_after_report@2x.png | DS-6 · Open problems — After your report | 2474:3613 |
| D17_alerts@2x.png | DS-8 · Alerts — SOS active (pack v2) | 2512:3778 |
| D17_alerts_sos_claimed@2x.png | DS-8 · Alerts — SOS claimed by you | 2512:172793 |
| D17_alerts_sos_checked@2x.png | DS-8 · Alerts — SOS checked by you | 2512:172948 |
| D17_alerts_during_meal@2x.png | DS-8 · Alerts — During the meal | 2512:173100 |
| D17_alerts_after_meal@2x.png | DS-8 · Alerts — After the meal (See all) | 2512:173241 |
| D17_alerts_all@2x.png | DS-8 · All alerts | 2512:173386 |
| D17_alerts_empty@2x.png | DS-8 · Alerts — Empty | 2512:173545 |
| D18_me@2x.png | DS-8 · Me (pack v2) | 2512:173663 |

## Pack v2 (2026-10-17)

The pack was resent with D17 Alerts and D18 Me. The three `DS_` files (old Alerts, Alerts empty, Me, now archived on page 99) moved to `archive_before_v2/`; eight new files replace them (`D17_…`, `D18_me`), 45 PNGs in the folder's top level in all. The figma.com asset host is blocked by this session's network policy, so each 2× clone was captured inline and the saved PNG copied here (786 × 1704 px); the clones were removed afterwards (plan in `mealloop/ds2_export_plan`).
