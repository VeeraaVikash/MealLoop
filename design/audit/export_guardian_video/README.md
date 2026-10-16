# export_guardian_video · run GUARDIAN-VIDEO (2026-10-16)

86 PNG files at 2× (786 × 1704 px), one per new or changed phone frame. Names follow the reference images in `design/reference/guardian_2026-10/` (G00–G08, W01–W04, S01) with a suffix for each state. `V5_` files are older Guardian and Gate frames changed by the V5 spacing pass or the fixes after it.

How they were made: the stored tool `gvexp` (design/audit/tools/gvexp.js) clones each frame 8000 pt above itself, scales the clone 2×, and the clone is captured at 1704 px tall. The clones were removed afterwards (`gvexp {from:0,to:0}`). Figma node IDs below are the frames, not the clones.

## Guardian (page 13) · G00–G08, new · 30 files

| File | Frame | Node |
|---|---|---|
| G00_guardian_consent@2x.png | GV-00 · Before you record | 2387:1408 |
| G01_guardian_choose@2x.png | GV-01 · Choose | 2387:1536 |
| G01_guardian_choose_about_sheet@2x.png | GV-01 · About this outing (sheet) | 2387:1654 |
| G01_guardian_choose_ask_to_change_sheet@2x.png | GV-01 · Ask to change (sheet) | 2387:1822 |
| G01_guardian_choose_language_sheet@2x.png | GV-01 · Language (sheet) | 2387:2112 |
| G01_guardian_choose_deadline_passed@2x.png | GV-01 · Deadline passed | 2387:2257 |
| G01_guardian_choose_already_answered@2x.png | GV-01 · Already answered | 2387:2365 |
| G02_guardian_record@2x.png | GV-02 · Record · Try 1 · 0:07 | 2389:2244 |
| G02_guardian_record_ready@2x.png | GV-02 · Record · Ready | 2389:2127 |
| G02_guardian_record_too_short@2x.png | GV-02 · Record · Too short | 2389:2366 |
| G02_guardian_record_too_dark@2x.png | GV-02 · Record · Too dark | 2389:2492 |
| G02_guardian_record_try2@2x.png | GV-02 · Record · Try 2 · 0:07 | 2389:2614 |
| G02_guardian_record_try3@2x.png | GV-02 · Record · Try 3 · 0:07 | 2389:2736 |
| G02_guardian_record_camera_blocked@2x.png | GV-02 · Camera blocked | 2390:1937 |
| G02_guardian_record_uploading@2x.png | GV-02 · Uploading | 2390:2059 |
| G02_guardian_record_checking@2x.png | GV-02 · Checking | 2390:2156 |
| G02_guardian_record_upload_failed@2x.png | GV-02 · Upload failed | 2390:2572 |
| G03_guardian_retry@2x.png | GV-03 · Retry · try 2 of 3 | 2390:2264 |
| G03_guardian_retry_try3@2x.png | GV-03 · Retry · try 3 of 3 | 2390:2361 |
| G04_guardian_send_video@2x.png | GV-04 · Send video to the warden | 2390:2458 |
| G05_guardian_photo_and_code@2x.png | GV-05 · Photo and code | 2390:2673 |
| G06_guardian_sent@2x.png | GV-06 · Sent | 2390:2786 |
| G06_guardian_sent_please_watch@2x.png | GV-06 · Sent · Please watch | 2390:2894 |
| G06_guardian_sent_photo_and_text@2x.png | GV-06 · Sent · Photo and text | 2390:3002 |
| G06_guardian_sent_call_requested@2x.png | GV-06 · Sent · Call requested | 2390:3110 |
| G06_guardian_sent_rejected@2x.png | GV-06 · Sent · Rejected | 2390:3216 |
| G06_guardian_sent_withdraw_sheet@2x.png | GV-06 · Withdraw approval (sheet) | 2390:3320 |
| G06_guardian_sent_withdrawn@2x.png | GV-06 · Withdrawn | 2390:3440 |
| G07_guardian_past_answers@2x.png | GV-07 · Past answers | 2390:3544 |
| G08_guardian_reject_sheet@2x.png | GV-08 · Reject (sheet) | 2387:1967 |

## Warden (page 14) · W01–W04, new · 22 files

| File | Frame | Node |
|---|---|---|
| W01_warden_decide_with_video@2x.png | WV-1 · Queue · Live video | 2393:1592 |
| W01_warden_decide_please_watch@2x.png | WV-1 · Queue · Please watch | 2393:1748 |
| W01_warden_decide_photo_and_text@2x.png | WV-1 · Queue · Photo and text | 2393:1890 |
| W01_warden_decide_confirmed_by_call@2x.png | WV-1 · Queue · Confirmed by call | 2393:2048 |
| W01_warden_decide_video_loading@2x.png | WV-1 · Queue · Video loading | 2393:2187 |
| W01_warden_decide_empty@2x.png | WV-1 · Queue · Empty | 2393:2346 |
| W01_warden_decide_offline@2x.png | WV-1 · Queue · Offline | 2393:2463 |
| W01_warden_decide_ask_sheet@2x.png | WV-1 · Ask (sheet) | 2395:1766 |
| W01_warden_decide_no_sheet@2x.png | WV-1 · No (sheet) | 2395:1895 |
| W01_warden_decide_approved@2x.png | WV-1 · Approved | 2395:2021 |
| W01_warden_decide_change_asked@2x.png | WV-1 · Change asked | 2395:2150 |
| W01_warden_decide_rejected@2x.png | WV-1 · Rejected | 2395:2267 |
| W01_warden_me@2x.png | WV-5 · Me | 2395:170898 |
| W02_warden_out_now@2x.png | WV-2 · Out now | 2395:2384 |
| W02_warden_out_now_student@2x.png | WV-2 · Out now · Kiran | 2395:2538 |
| W03_warden_history@2x.png | WV-3 · History | 2395:2982 |
| W03_warden_history_all@2x.png | WV-3 · History · All | 2395:3126 |
| W03_warden_history_record@2x.png | WV-3 · Record · Aarav | 2395:3282 |
| W03_warden_history_record_video_expired@2x.png | WV-3 · Record · Video expired | 2395:3424 |
| W04_warden_escalated@2x.png | WV-4 · Escalated | 2395:2675 |
| W04_warden_escalated_call_kiran_sheet@2x.png | WV-4 · Call Kiran's guardian (sheet) | 2395:2802 |
| W04_warden_escalated_call_dev_sheet@2x.png | WV-4 · Call Dev's guardian (sheet) | 2395:2892 |

## Student (page 07; same frames on 04) · S01, new · 5 files

| File | Frame | Node |
|---|---|---|
| S01_student_outing_tracker_video@2x.png | Outing · Under warden review | 1848:22655 |
| S01_student_outing_tracker_photo_and_text@2x.png | Outing · Under warden review · Photo and text | 2396:2557 |
| S01_student_outing_tracker_by_call@2x.png | Outing · Under warden review · By call | 2396:2657 |
| S01_student_outing_guardian_said_no@2x.png | Outing · Guardian said no | 2396:2757 |
| S01_student_notification_guardian_answered@2x.png | Notifications · Guardian answered | 2396:2858 |

## Guardian (page 13) · changed in V5 or after · 11 files

| File | Frame | Node |
|---|---|---|
| V5_guardian_status_pass_ready@2x.png | G-3 · Status · Pass ready | 1929:537 |
| V5_guardian_status_out@2x.png | G-3 · Status · Out | 1929:595 |
| V5_guardian_status_back@2x.png | G-3 · Status · Back | 1929:651 |
| V5_guardian_status_back_late@2x.png | G-3 · Status · Back late | 1929:704 |
| V5_guardian_status_not_going@2x.png | G-3 · Status · Not going | 1929:762 |
| V5_guardian_status_change_asked@2x.png | G-3 · Status · Change asked | 1929:912 |
| V5_guardian_sign_in@2x.png | G-0 · Sign in | 1929:131727 |
| V5_guardian_verify_code@2x.png | G-0 · Verify code | 1929:131799 |
| V5_guardian_activate_account@2x.png | G-A1 · Activate account | 1929:131872 |
| V5_guardian_confirm_link@2x.png | G-A2 · Confirm link | 1929:131931 |
| V5_guardian_done@2x.png | G-A3 · Done | 1929:132000 |

## Gate (page 15) · changed in V5 · 18 files

| File | Frame | Node |
|---|---|---|
| V5_gate_scan@2x.png | GA-2 · Scan | 1858:133 |
| V5_gate_verify_exit@2x.png | GA-3 · Verify — Exit | 1858:179 |
| V5_gate_verify_return@2x.png | GA-3 · Verify — Return | 1858:303 |
| V5_gate_pass_code@2x.png | GA-4 · Can’t scan? — Pass code | 1858:415 |
| V5_gate_find_student@2x.png | GA-5 · Find student | 1858:481 |
| V5_gate_exit_recorded@2x.png | GA-6 · Exit recorded | 1860:328 |
| V5_gate_return_recorded@2x.png | GA-6 · Return recorded | 1860:361 |
| V5_gate_back_late@2x.png | GA-6 · Back late | 1860:392 |
| V5_gate_already_exited@2x.png | GA-6 · Already exited | 1860:427 |
| V5_gate_not_valid@2x.png | GA-6 · Not valid | 1860:461 |
| V5_gate_pass_withdrawn@2x.png | GA-6 · Pass withdrawn | 1863:127216 |
| V5_gate_too_early@2x.png | GA-6 · Outside the window — Too early | 1863:127250 |
| V5_gate_too_late@2x.png | GA-6 · Outside the window — Too late | 1863:127283 |
| V5_gate_offline@2x.png | GA-6 · Offline | 1863:127316 |
| V5_gate_emergency_exit_recorded@2x.png | GA-6 · Emergency exit recorded | 1863:127354 |
| V5_gate_out_now@2x.png | GA-7 · Out now | 1864:454 |
| V5_gate_report_a_problem@2x.png | GA-9 · Report a problem | 1864:672 |
| V5_gate_sent_to_duty_warden@2x.png | GA-9 · Sent to the duty warden | 1864:724 |

Not exported: page 04 copies of the S01 frames (the same design without links) and page 05 (Dark), which stays stale (gap 406).
