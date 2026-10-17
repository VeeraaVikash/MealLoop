# Run DOOR-SCANNER · final report (2026-10-17)

**Brief:** design/reference/door_scanner_2026-10/prompt/COWORK_PROMPT_DOOR_SCANNER.md, spec data/door_scanner_spec.md, images D01–D16 drawn ×1.346.

**Scope.** Page 09 Door Scanner family (40 frames in five sections) plus two shared pieces: the role selection (MS-1, rebuilt in place) and the shared password page (built for all four roles). Pass Desk, Kitchen and Supervisor screens were not redesigned; pages 05, 10 and 11 were not edited. Nothing was deleted: 14 old door frames are archived on page 99 with links stripped.

**Commits.** By VeeraaVikash on branch claude/mealloop-ios-design-e9n1n5, no co-author line, pushed after every stage. Flow starts 14 at every snapshot (two automatic "Flow 1" starts added by Figma were removed).

## Stages

| Stage | Result | Snapshot | Why / notes |
|---|---|---|---|
| D0 Preflight | done | st320 = st319 | Pack committed (4ffe625, 16 images); Door Scanner family 14 frames, 13 shared (preflight.md). |
| D1 Foundation | done | st321 | design_intent "DOOR SCANNER 2026-10"; 10 flagged component sets on 03. Decisions 1–6. |
| D2 Entry flow | done | st322 | Choose your role (D01), What you do sheet (D02), password (D03) with Wrong and Locked, and the shared page for the other roles. Decisions 7–11. |
| D3 Home | done | st323 | Before / During / After (D04, D05, D12), SOS active, Camera denied, Low light, Offline (banner), Meal ended during a scan; meal-state hotspots. Decisions 12–17. |
| D4 Scan outcomes | done | st324 | Type the last 4 digits (typing, one, several, none), Entry recorded (D07, 1 s), no meal response, Already scanned (D08), QR not recognised and Wrong meal (D09), Can't check right now (D10); six camera-card hotspots. Decisions 18–25. |
| D5 Report and lists | done | st325 | Report a problem (D11) + Sent to Ravi toast, Open problems (D16) with Waiting / Seen / Fixed, Entered without voting (D15) during and after. Decisions 26–30. |
| D6 SOS | done | st326 | SOS tab, panel Not claimed (D13) / Claimed (D14), claim flow and toast, Alerts (SOS + normal), Alerts empty, Me; 14 old frames archived. Decisions 31–34. |
| D7 Spacing and checks | partly | st327 | 12 frames fixed (bands, rows, paddings, gaps), KeyPad Tall, torch white, new offline Type sheet. Partly: lime > 3 on the SOS frames (spec vs rule) and bands on short lists (NEEDS REVIEW). Decisions 35–38. |
| D8 Wiring, export, docs | done | st328 | Reach 40 / 40, 0 dead ends; 40 exports + README; contract, gaps 458–477, STATE, MASTER_CONTEXT, DEMO (14-step walk). Decisions 39–41. |
| D9 Report | done | st328 (no Figma change) | This file. |

## Functional, simulated, needs a backend

| Behaviour | In the Figma prototype | Product |
|---|---|---|
| Role selection, What you do sheet, Don't show this again | FUNCTIONAL (links) | The "don't show" choice is a device setting (local) |
| Shared role password, 3 tries, Locked | SIMULATED (any digit = correct; status bar = wrong try) | NEEDS BACKEND: password check, lock and supervisor reset |
| Meal state Before / During / After | SIMULATED (status-bar hotspots "Supervisor starts / ends the meal") | NEEDS BACKEND: shared meal state for every staff phone in the mess (gap 458) |
| Scanning a QR and the server's answer | SIMULATED (six invisible zones on the camera card) | NEEDS BACKEND: verify and save the entry, duplicate check, meal check |
| Entry recorded only after save; count +1 | SIMULATED (shown only from "recorded" answers; Home tile stays 714) | NEEDS BACKEND: recorded-entry count |
| No meal response → Entered without voting | SIMULATED (Dev path, list during and after) | NEEDS BACKEND: the list per mess and meal; visibility (gap 462) |
| Type the last 4 digits: one / several / none | SIMULATED (keys 2 / 1 / 9) | NEEDS BACKEND: lookup in the mess; ambiguity (gap 461) |
| Offline: Can't check right now, banner, offline Type sheet | SIMULATED (status-bar hotspots for connection lost / back) | NEEDS BACKEND + OWNER: offline policy (gap 460) |
| Camera denied, Open Settings, Low light / torch | SIMULATED (meal chip and torch hotspots) | FUNCTIONAL on the device (OS permission and torch) |
| Report a problem → Sent to Ravi → Open problems | SIMULATED (toast after one tap; statuses drawn) | NEEDS BACKEND: delivery to the supervisor and status updates |
| SOS tab, panel, claim, Mark as checked | SIMULATED (wordmark hotspot starts an SOS) | NEEDS BACKEND: SOS routing and claims (gap 459) |
| Alerts list and empty state | SIMULATED (status-bar switch) | NEEDS BACKEND: alerts feed |
| Tab bar Home / Alerts / Me, Back, Switch role, Sign out | FUNCTIONAL (links) | FUNCTIONAL |
| Meal ended during a scan | SIMULATED (sheet status bar) | NEEDS BACKEND: meal end reaching the phone mid-scan |

## Decisions made without asking (decisions.md 1–41)

- **Components (1–6):** 10 flagged sets; a new StaffTabBar3 so other roles keep theirs; drawn icons; SOS time split mono / sans; 44 pt torch.
- **Entry (7–11):** white SK initials (lime count); MS-1 rebuilt in place, SRM sign-in kept as the flow start; the password page for all four roles (others → their Start shift); simulated password outcomes; What you do only for the door.
- **Home (12–17):** built as drawn, then spaced in D7; hotspots for meal state and device events with "Simulated:" notes; camera-denied primary "Type the last 4 digits"; offline banner; Meal ended during a scan as a grey result; MEAL ENDED in sans.
- **Outcomes (18–25):** Type sheet states and sample IDs (0238, 0190, 0999); six camera zones; no-response uses the same Entry recorded; 1 s auto-return; one calendar (12:55 PM, 12:54 PM); primary button always at y 754; Wrong meal on the cream result; offline Try again never leads to success.
- **Report and lists (26–30):** one toast for all choices; Waiting / Seen / Fixed; two Entered without voting frames; report links on error screens; Home tab by meal state.
- **SOS, Alerts, Me (31–34):** claim flow and toast; door-only Alerts and Me; supervisor / kitchen SOS unchanged; 14 frames archived.
- **Checks (35–41):** KeyPad Tall, white torch-on, offline Type sheet, short lists left as they are, code boxes fill the row, export names, DEMO walk.

## Conflicts between the brief and a rule

| Brief or image says | Rule | Done |
|---|---|---|
| D04 / D12 / D15 etc. "exactly as the images" (large empty bands) | Dead space ≤ 24 pt (D7) | Built as drawn in D3, then main elements grown in D7 (12 frames); short lists left (NEEDS REVIEW) |
| D09 / D10 black button above the outline one | Primary buttons at the same y on every result page | Primary at y 754, secondary at 682 |
| SOS tab: lime outline, lime badge, lime icon; lime chip; lime brackets | At most 3 lime elements | Spec kept; the checker reports 4–7 on the SOS frames (NEEDS REVIEW) |
| D04 lime SK initials; lime torch-on | At most 3 lime elements | White initials; white torch-on button |
| D12 "MEAL ENDED" and D13 "12:45 PM · 5 min ago" in mono | Mono only for numbers, times and units | Words in sans, times in mono |
| D16 has no Report a problem button; brief D5 asks for one | Brief | Button added above the tab bar |
| Spec "No student with 0238" while 0238 is Aarav | One calendar / one sample | No-match sample 0999 |

## New gaps (prototype_gaps.md 458–477)

- **OWNER (458–464):** shared meal state and SOS routing need a backend; offline policy (never record vs queue); last-4-digit ambiguity; who sees Entered without voting; whether Pass Desk and Kitchen adopt the SOS tab; shared role password after the SRM sign-in.
- **NEEDS REVIEW (465–468, 470–473):** below.
- **Info (469, 474–477):** Home tile stays 714; drawn icons; hidden hotspots; shared Alerts / Me kept for other roles; pages 05 / 11 untouched.

## NEEDS REVIEW by frame name

- **DS-1 · Home — During · SOS active, DS-7 · Home — During · SOS claimed by you, DS-7 · Home — Marked as checked (toast), DS-7 · SOS panel — Not claimed, DS-7 · SOS panel — Claimed by you:** lime count 4–7 by the checker (465).
- **DS-3 · Already scanned, DS-3 · Can't check right now:** times changed to 12:55 PM / 12:54 PM (466).
- **DS-3 · QR not recognised, DS-3 · Wrong meal, DS-3 · Can't check right now:** button order (467).
- **DS-3 · Entry recorded — No meal response:** extra line and "See the list" link (468).
- **DS-5 · Report a problem — Sent to Ravi (toast), DS-6 · Open problems — After your report:** one toast for all choices (470).
- **DS-5 · Report a problem, DS-6 · Entered without voting (both), DS-8 · Alerts, DS-8 · Me:** empty bands 38–295 pt (471).
- **DS-6 · Open problems (both):** Seen / Fixed rows and the Report a problem button not in D16 (472).
- **DS-1 Homes:** white SK initials (473).
- **MS-1 · Choose your role:** rows 136 pt tall after the spacing fix (D01 draws about 106).

## End checks

Contrast lowest 5.51 : 1; mono words 0; text under 12 pt 0; targets under 44 pt 0; truncation 0; overflow 0; unbound paints 0; banned words 0 ("decline", "approval", "sync"); no success on an unverified entry; backdrop missing only on the full-lime Entry recorded pages. Reach 40 / 40, 0 dead ends, 0 dangling. Flow starts 14; snapshot st328.
