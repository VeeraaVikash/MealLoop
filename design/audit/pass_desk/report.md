# Run PASS-DESK · final report (2026-10-17)

**Brief.** design/reference/pass_desk_2026-10/prompt/COWORK_PROMPT_PASS_DESK.md.
- **Spec:** data/pass_desk_spec.md.
- **Images:** P01–P17, drawn at 292 pt (× 1.346). The pack was not in the repo; it was copied from the upload and committed (14ec9ea).

**Scope.** The Pass Desk family on page 09: 46 new frames in four sections.
- "Pass Desk · Entry and Home"
- "Checking and outcomes"
- "Reissue, report and shortage"
- "SOS, Alerts and Me"

Two small, named touches outside it:
- One "Food short at the pass desk" card on the shared Kitchen Staff Alerts (MS-E1).
- A canvas note beside the student Special pass page on 04 and 07 (no student frame changed).

Not touched: Door Scanner, Kitchen and Supervisor screens, and pages 05, 10 and 11.

Nothing was deleted. The 12 old desk frames are on page 99 "Pass Desk · archived states" with links stripped: MS-2 Start shift, MS-H Home, and MS-B1–B7.

**Commits.** By VeeraaVikash on claude/mealloop-ios-design-e9n1n5, with no co-author line, pushed after every stage. Flow starts were 14 at every snapshot (automatic "Flow 1" starts were removed when they appeared).

## Stages

| Stage | Result | Snapshot | Why / notes |
|---|---|---|---|
| Q0 Preflight | done | st335 = st334 | HEAD 25413e3; push dry run OK; pack committed (17 images); Pass Desk family 12 frames, shared 12 (preflight.md). |
| Q1 Foundation | done | st336 (03 +5) | design_intent "PASS DESK 2026-10". Flagged components: CodeCard, HomeKeypad, PassResultScreen, RequestRow, ShortageChips. Decisions 1–8. |
| Q2 Entry | done | st337 | PD-0 What you do (P01), Don't show this again. MS-1 Pass Desk → sheet → shared Password — Pass Desk ("Pass Desk" chip confirmed). Decision 9. |
| Q3 Home | done | st338 | Before / During / After (P02, P03, P13); Typing 1–3; Not found (0999); Offline banner; During · 42 of 214; Meal ended while checking. Password → Home. Simulated meal-state and connection hotspots. Decisions 10–17. |
| Q4 Checking and outcomes | done | st339 | Check this pass (fresh, changed, expired). Results: Pass verified, No special pass, Wrong meal, Already recorded, Doesn't match, Can't check right now. Look up a student plus 4 results. Every outcome is reachable. Decisions 18–25. |
| Q5 Reissue, report and shortage | done | st340 | Request a new pass plus toast; New pass requests (4 statuses); Report a problem (4); Which food is short?; Open problems ×3; kitchen alert card; student-side note. Decisions 26–32. |
| Q6 SOS, Alerts, Me | done | st341 | Home with SOS tab, both panels, claimed Home, Marked as checked; Alerts ×5; Me. Tabs wired everywhere. Decisions 33–38. |
| Q7 Spacing and checks | partly | st342 | Fixed: rows 56, "of 214", a 44 pt hotspot. Partly: lime on SOS frames, short-list bands, two scrolling Home states (checks.md). Decision 39. |
| Q8 Wiring, export, docs | done | st343 | Reach 46 / 46, 0 dead ends, 0 dangling; 47 exports; contract, gaps 486–502, STATE, MASTER_CONTEXT, DEMO (14-step walk). Decisions 40–42. |
| Q9 Report | done | st343 (no Figma change) | This file. |

## Functional, simulated, needs a backend

| Behaviour | In the Figma prototype | Product |
|---|---|---|
| Role → What you do → shared password → Home | FUNCTIONAL (links); password any digit = correct | NEEDS BACKEND: password check, lock and reset (as gap 464) |
| Meal state Before / During / After for every staff role | SIMULATED (status-bar hotspots) | NEEDS BACKEND: shared meal state (487) |
| Typing the last 4 digits | FUNCTIONAL for the sample 0 2 3 8; other keys static | FUNCTIONAL on the device |
| Expected code and colour, re-fetch, expiry | SIMULATED (sample 7A3F · Lime / K2M9 · Blue; status-bar thirds) | NEEDS BACKEND: pass service; no verification algorithm in the design (487) |
| Matches · record entry → +1, 42 of 214 | SIMULATED (link; the Home chip shows 42 on a separate frame) | NEEDS BACKEND: record the entry once (duplicates prevented) |
| No pass, Wrong meal, Already recorded, Not found, Can't check | SIMULATED (hidden zones on the digit boxes / card) | NEEDS BACKEND: pass service answers |
| Look up a student (status only) | SIMULATED (key 0 + box zones) | NEEDS BACKEND: read-only lookup; never records |
| Offline | SIMULATED (status bar); nothing recorded | OWNER: offline policy (490) |
| Request a new pass → statuses | SIMULATED (toast, drawn statuses) | NEEDS BACKEND: admin pass-exception link (488) |
| Report a problem, Food short → kitchen | SIMULATED (toasts; drawn kitchen card) | NEEDS BACKEND: delivery to Ravi and the kitchen |
| SOS tab, claim, Mark as checked | SIMULATED (wordmark hotspot) | NEEDS BACKEND: SOS routing (as gap 459) |
| Alerts feed, Me numbers | SIMULATED (drawn) | NEEDS BACKEND: feed and shift record |
| Tabs, Back, Close, Switch role, Sign out, Language, Help | FUNCTIONAL (links) | FUNCTIONAL |

## Decisions made without asking (pass_desk/decisions.md 1–42)

- **Samples (2, 11, 7):**
  - Codes follow the student pass page: 7A3F · Lime, then K2M9 · Blue (P04 draws 218).
  - The not-found sample is 0999, because 0238 is Aarav, who has a pass.
  - Shortage chips use the menu spelling "Briyani".
- **Components (3–8):**
  - Five flagged sets on page 03.
  - Labels are in sans and codes in mono.
  - The code uses Hero Metric (52 pt).
  - The changed and expired states.
  - Existing tokens only: action-pressed and on-hero-error.
- **Entry and Home (9–17):**
  - What you do is a clone of the Door Scanner sheet.
  - Home is tightened so it fits like P03.
  - Only the sample key sequence is wired.
  - Simulated meal-state and connection hotspots.
  - Offline Home keeps the keypad.
  - Meal ended while checking is a grey result.
  - A 42 of 214 Home is the target after Pass verified.
  - The old Start shift and Home are archived.
- **Outcomes (18–25):**
  - Check this pass is a Large sheet.
  - Outcome hotspots on the digit boxes.
  - Pass verified is a copy of Entry recorded.
  - The primary button is at y 754 on every result page.
  - Can't check right now is a copy of the Door Scanner offline page.
  - Look up has its own page with the Tall keypad.
  - The old MS-B frames are archived.
- **Reissue and report (26–32):**
  - The request flow connects to the admin pass-exception flow.
  - Request rows use the masked IDs from the pack.
  - The student-side note.
  - ProblemOption gets Pass check and Food short kinds.
  - The food sheet.
  - Three Open problems states.
  - The kitchen card, with the kitchen Alerts page now scrolling.
- **SOS, Alerts and Me (33–38):**
  - The SOS Home starts with an empty keypad.
  - The panel says "Back to checking passes" (no scan wording).
  - Alerts use one calendar: Food shortage seen at 12:55 PM.
  - AlertRow gets a Food kind.
  - Me shows Passes checked 41 and Problems reported 1.
  - MS-B6 and MS-B7 are archived.
- **Checks and export (39–42):** spacing and mono fixes; two wrap fixes; 47 exports; the DEMO walk.

## Conflicts between the brief and a rule

| Brief or image says | Rule | Done |
|---|---|---|
| P04 / P08 code "218 · Lime" | One sample across roles (the desk compares with the student pass) | 7A3F · Lime / K2M9 · Blue from the student Special pass page (gap 492) |
| "No student with 0238 in Main Mess." | Never invent people; one sample | 0999 (gap 494) |
| P03 / P04 "STUDENT'S LAST 4 DIGITS", "Changes in 7 s" in mono | Mono only for numbers, times, units and codes | Words in sans, digits and seconds in mono |
| P06 / P08 black button above the outline one | Primary buttons at the same y on every result page | Primary at y 754 |
| P14 "Food shortage seen 1:20 PM" while the desk reports at 12:53 PM | One calendar | 12:55 PM (gap 498) |
| P12 "Chicken Biryani / Paneer Biryani" | Chips come from the day's menu | Menu spelling "Chicken Briyani / Panneer Briyani" (gap 501) |
| P15 / P16 lime SOS tab + lime chip + mark | At most 3 lime elements | Spec kept; 5–6 by the checker (gap 495) |
| "Exactly as the images" on short lists | Dead space ≤ 24 pt | Built as drawn; bands left (gap 496) |
| Spec: student pass "Marked used … at the door" | Change nothing the run does not name | Student pages unchanged; conflict logged (gap 493) |

## New gaps (prototype_gaps.md 486–502)

- **OWNER (486–491):**
  - Camera scanning needs a QR on the student pass.
  - The pass service and shared meal state need a backend.
  - The reissue approval link to the admin pass-exception flow.
  - A special meal without a pass (draft: not allowed).
  - The offline policy.
  - Who sees the list of special-meal entries.
- **NEEDS REVIEW (492–499, 501):** listed below.
- **Info (500, 502):** the Kitchen Alerts page now scrolls; the hidden hotspots.

## NEEDS REVIEW by frame name

- **PD-2 · Check this pass (all three), PD-3 · Doesn't match:**
  - Sample code format 7A3F vs P04's 218 (492).
- **PD-1 · Home — Student not found:**
  - 0999 (494).
  - The page scrolls under the tab bar (497).
- **PD-1 · Home — Offline:** scrolls under the tab bar (497).
- **PD-7 · Home — During · SOS active, PD-7 · SOS panel (both), PD-7 · Home — Marked as checked:** lime 5–6 (495).
- **Empty space above the bottom bar (496):**
  - PD-1 · Home — After the meal, 88 pt
  - PD-4 · New pass requests, 307 pt
  - PD-5 · Report a problem, 61 pt
  - PD-2 · Look up a student (empty), 151 pt
  - PD-8 · Alerts (all), 145–368 pt
  - PD-8 · Me, 98 pt
- **PD-8 · Alerts:** the 12:55 PM shortage row; P14's footnote left out (498).
- **PD-3 · No special pass, Wrong meal, Doesn't match, Can't check right now:** button order (499).
- **PD-5 · Which food is short?:** menu spelling (501).
- **PD-5 · Report a problem:** "Can't check passes" wraps to two lines (the title width comes from the reused ProblemOption).
- **04 / 07 Pass · Live 1 (student):** the door / desk wording and 12:41 vs 12:18 PM (493).
- **MS-E1 · Alerts (Kitchen Staff):** now scrolls with the added card (500).

## End checks

- **46 Pass Desk frames:**
  - Contrast is at least 5.72 : 1.
  - Text under 12 pt, targets under 44 pt, truncation, overflow, raw paints and banned words: all 0.
  - No scan or camera wording.
  - No success on an unverified entry.
  - Approved ≠ Done.
- **Accepted:** mono hits are the codes only; the backdrop is missing only on Pass verified (full lime).
- **Reachability:** reach 46 / 46, 0 dead ends, 0 dangling.
- **Snapshot:** flow starts 14; snapshot st343.
- **Exports:** 47 at 2×.
