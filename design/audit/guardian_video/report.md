# Run GUARDIAN-VIDEO · final report (2026-10-16)

**Brief:** design/reference/guardian_2026-10/prompt/COWORK_PROMPT_GUARDIAN_VIDEO.md, spec data/guardian_video_spec.md. Reference images G00–G08, W01–W04 and S01 drawn ×1.346.

**Scope.** Page 13 Guardian (video approval), page 14 Warden (four-tab app), student outing tracker on 04 and 07, spacing on 13 / 14 / 15, nine components on page 03. Pages 10 and 11 were not edited; page 05 stays stale. Nothing was deleted: 30 frames are archived on page 99 with links stripped (archive_index.md).

**Commits.** By VeeraaVikash on branch claude/mealloop-ios-design-e9n1n5, no co-author line, pushed after every stage. Flow starts 14 at every snapshot.

## Stages

| Stage | Result | Snapshot | Why / notes |
|---|---|---|---|
| V0 Preflight | done | st313 = st312 | Pack committed (f636ca5, 14 images); inventory in preflight.md (13: 30 frames, 14: 18, 15: 23, student outing 33 + 33). |
| V1 Foundation | done | st314 | design_intent section "GUARDIAN VIDEO APPROVAL 2026-10"; 9 flagged components with states on 03. Decisions 1–6. |
| V2 Guardian pages | done | st315 | 30 frames: consent, choose, record (with too short, too dark, camera blocked, uploading, checking, upload failed), retry 2 / 3, send video, photo and code, sent (5 variants), withdraw, past answers, reject sheet, language sheet, deadline passed, already answered. 16 archived. Decisions 7–17. |
| V3 Warden app | done | st316 | 22 frames: four method cards, Video loading / Empty / Offline, Ask and No sheets, three results, Out now + student, Escalated + 2 call sheets, History + All + Record + Video expired, Me. 14 archived. Partly: Reassign and Emergency override have no place in the four tabs and are archived (gap 448). Decisions 18–25. |
| V4 Student side | done | st317 | Tracker by video, by photo and text, by call, Guardian said no (Ask again), Notifications · Guardian answered on 04 and 07; 07 wired. Partly: LoopTracker has no "guardian said no" state (gap 449). Decisions 26–29. |
| V5 Spacing and alignment | partly | st318 | Margins, bands ≤ 24, paddings, rows, titles 34, gate buttons 56 at one y, GateVerify photo 352. Not auto-fixed: W-6 Alerts band, gate rail rows 79, scrolling gate pages (spacing.md). Checks clean. Decisions 30–37. |
| V6 Wiring, export, docs | done | st319 | Reach 13 43 / 44, 14 26 / 26, 15 16 / 23 (results by control), 07 all new; 0 dead ends. 86 exports + README. Contract, gaps 436–457, STATE, MASTER_CONTEXT, DEMO (guardian 15 steps, warden 12 steps). Decisions 38–40. |
| V7 Report | done | st319 (no Figma change) | This file. |

## Decisions made without asking (decisions.md 1–40)

- **Brand and type (1–4, 11, 33):** EvidenceCard checks are ink outlines (lime would make 4 lime elements); "REC", "Code", the typed phrase, pass codes and day-name times are sans, only digits are mono; warden tabs are text at 15 pt.
- **Sizes (5, 8, 17, 20, 31, 32):** rows 56; guardian primary buttons 64; recorder camera 342; queue thumbnail 104; gate buttons 56 with their bottom at 810; titles 34 across Guardian, Warden and Gate.
- **Flow (9–15):** a new code each try (472, 815, 306); prototype time skips stand in for server outcomes; Camera blocked → "Ask the warden to call me" → Sent · Call requested (no approval without a face or a call); Already answered reached from Past answers.
- **Warden (18–24):** "Decide by Sat 12 PM" from the spec; four students for the four methods (Aarav, Meera, Arjun, Kiran); Approve / Ask / No lead to result states with Undo; only Kiran's Out now row opens; Me as a drill-in from the avatar.
- **Student (26–29):** no video or photo shown to the student; Fri 7:43 PM notification frame; tracker variants by status-bar time skip.
- **Post-V5 fixes (35–37):** sheets fitted to content; Meera's transcript; the spec guardian number on Sign in and Activate.
- **Docs (38–40):** export naming; gate results left reachable by control; old walks kept in DEMO.md as "before GUARDIAN-VIDEO".

## Conflicts between the brief and a rule

| Brief or image says | Rule | Done |
|---|---|---|
| W01 deadline "Today 8 PM" | One calendar; spec weekend rule (Sat 12 PM) | Sat 12 PM (decision 18, gap 442) |
| W01 lime check pills + lime Live tag | At most 3 lime elements | Ink-outlined checks (decision 1) |
| G02 "REC 0:07", "Code 4 7 2" and G05 typed phrase in mono | Mono only for numbers, times and units | Words in sans, digits mono (decisions 3, 11) |
| W02 / W03 rows about 74 pt | V5: rows 52 or 56 | 56 pt (decision 5, gap 444) |
| W01–W04 tab labels | Text never below 12 | 15 pt text tabs (decision 4) |
| G00–G08 buttons about 47 pt × 1.346 | Guardian primary buttons ≥ 56 pt | 64 pt (decision 8) |
| G02 camera about 404 pt; W01 thumbnail about 120 pt | No overflow; no overlap with tab bar or home indicator | 342 / 104 pt (decisions 17, 20, gap 445) |
| V3 "tab bar of four" | Never delete | Reassign, Emergency override and W-5 Me tab archived; Me is a drill-in (decision 24, gap 448) |

## New gaps (prototype_gaps.md 436–457)

- **OWNER (436–441):** retention days (30-day draft); languages and translations; speech-to-text accuracy for Indian languages; guardian number verification source; whether the call path is allowed; consent wording approval by SRM.
- **NEEDS REVIEW (442–454, 457):** see below.
- **Info (455–456):** status-bar time skips; gate results reached by control.

## NEEDS REVIEW by frame name

- **WV-1 · Queue · Live video / Please watch / Photo and text / Confirmed by call:** deadline Sat 12 PM, not W01's Today 8 PM (442); thumbnail 104 pt (445).
- **WV-1 · Queue · Photo and text, WV-1 · Change asked, WV-1 · Rejected:** Arjun ••0356 is a new sample name (451).
- **WV-1 · Approved:** names Aarav whichever card was approved (452).
- **WV-2 · Out now:** only Kiran's row opens; "See all 12" is display only (453).
- **W-6 · Alerts:** 285 pt empty band (446).
- **W-4 · Reassign (sheet), W-4 · Emergency override (sheet)** (page 99): no place in the new app (448).
- **GA-1 · Gate home, GA-7 · Out now, GA-8 · Overdue returns:** rail rows 79 pt; GA-1 and GA-8 scroll (447).
- **G-3 · Status · Not going:** older page, "You approved" with the warden's no; reached only by time skip (454).
- **Outing · Guardian said no (04, 07):** LoopTracker cross on the Warden node (449).
- **Notifications (Wed 7:00 AM, 04, 07):** older "Guardian approved · 6:52 AM" card (450).
- **EvidenceCard, VideoRecorder, GV-05 · Photo and code:** ink checks and sans words instead of the drawn lime and mono (443).
- **OutNowRow, HistoryRow, WardenTabBar4:** 56 pt rows and 15 pt text tabs (444).
- **Page 05 (Dark):** S01 changes not applied (457).

## End checks

Contrast lowest 4.61 : 1 (G-3 Back late, older); mono words 0; lime ≤ 3; text under 12 pt 0; targets under 44 pt 0; truncation 0; overflow 0; backdrop missing only on the dark recording screens, gate scan and full-colour gate results. Tamil appears only as the pill word and the sheet row; Hindi only as the sheet row. No "cannot be manipulated" anywhere. Flow starts 14; snapshot st319.
