# Run KITCHEN · final report (2026-10-18 – 19)

**Brief.** design/reference/kitchen_2026-10/prompt/COWORK_PROMPT_KITCHEN.md.
- **Spec:** data/kitchen_spec.md.
- **Images:** K01–K17, drawn at 292 pt (× 1.346). The pack was copied from the upload and committed (9ac468e). A resend of the same prompt and zip mid-run was checked byte for byte: identical.

**Scope.** The Kitchen Staff family on page 09: 67 new frames in five sections.
- "Kitchen · Entry and Home" (16)
- "Kitchen · Shortage" (8)
- "Kitchen · Record waste" (17)
- "Kitchen · Reports and history" (13)
- "Kitchen · SOS, Alerts and Me" (13)

Three small, named touches outside it:
- MS-1's Kitchen Staff row now opens the new sheet.
- The shared Password — Kitchen Staff keys now open the new Home.
- A canvas note sits beside the Pass Desk food-short toast.

Not touched: Door Scanner, Pass Desk and Supervisor screens, and pages 05, 10 and 11. The old MS-C, MS-E, MS-F and MS-G frames stay, because the Supervisor Home still links to them.

Nothing was deleted. Four Kitchen-only frames are on page 99 "Kitchen · archived states" with links stripped: MS-2 Start shift — Kitchen and MS-H Home — Kitchen, (Alert), (Offline).

**Commits.** By VeeraaVikash on claude/mealloop-ios-design-e9n1n5, with no co-author line, pushed after every stage. Flow starts were 14 at every snapshot. Automatic "Flow N" starts appeared while linking and were removed each time.

## Stages

| Stage | Result | Snapshot | Why / notes |
|---|---|---|---|
| W0 Preflight | done | st344 = st343 | HEAD 7fe94a1; push dry run OK; pack committed (17 images). Kitchen family 24 frames: 4 Kitchen only, 20 MS-C shared with the Supervisor (preflight.md). |
| W1 Foundation | done | st345 (03 +8 ~1) | design_intent "KITCHEN STAFF 2026-10". Eight flagged sets plus KeyPad + Size=Decimal. Decisions 1–11. |
| W2 Entry | done | st346 | KS-0 What you do sheet; role row and the "Kitchen Staff" password chip confirmed; role → sheet → password. Decision 12. |
| W3 Home | done | st347 (09 +75 −16; 99 +16) | 15 frames: Before (K01) and headcount states, During (K02), stale, offline, shortage rows and See all, After ×3 (K05, K16, K15), Menu (K17), meal ended while reporting. Password → Home. 4 old frames archived. pdarch fixed. Decisions 13–21. |
| W4 Shortage | done | st348 (09 +40) | Sheet (K04) empty / selected / note, toast, seen, couldn't send + Retry, duplicate prompt. Decisions 22–25. |
| W5 Record waste | done | st349 (09 +85) | 17 frames: K06, K07, K08, errors, blocked "Enter 2 more", sent, draft prompt, Add a dish; the full sample sequence is wired. Decisions 26–32. |
| W6 Report states and history | done | st350 (09 +65) | Returned (K09), Approved (K10), Waiting, Draft, Not started, Missing; Edit and resubmit with the entries kept; Meal history (K11) with Empty, Loading and Error. No approve action. Decisions 33–37. |
| W7 Alerts, Me, SOS | done | st351 (09 +66) | SOS Home, panel ×2, claimed, marked; Record waste with the SOS tab (K14); Alerts (K12) ×5; Food short at the pass desk; Me (K13); 24 tab bars. Decisions 38–44. |
| W8 Spacing and checks | partly | st352 (0) | All checks clean except as listed here. Rows fixed to 56 / 52. Partly: lime 4–9 and short-page bands, both as drawn (checks.md). |
| W9 Wiring, export, docs | done | st353 (09 ~1 L+8) | Pill links re-set; reach 67 / 67, 0 dead ends, 0 dangling; 67 exports; contract, gaps 503–522, STATE, MASTER_CONTEXT, DEMO (15-step walk). Decisions 45–46. |
| W10 Report | done | st353 (no Figma change) | This file. |

## Functional, simulated, needs a backend

| Behaviour | In the Figma prototype | Product |
|---|---|---|
| Role → What you do → shared password → Home (no Start Shift) | FUNCTIONAL (links); any digit = correct password | NEEDS BACKEND: password check (as gap 464) |
| Meal state Before / During / After | SIMULATED (status-bar hotspots "the supervisor starts / ends the meal") | NEEDS BACKEND: shared meal state (509); a local timer never ends a meal |
| Headcount sent 860 and its loading / stale / not sent states | SIMULATED (card hotspots) | NEEDS BACKEND: headcount feed (509); OWNER: headcount sent vs raw forecast (503) |
| Live entries 714, stale, offline | SIMULATED (card / status-bar hotspots) | NEEDS BACKEND: door entries feed (509) |
| Report food running short (dish, how bad, note) | FUNCTIONAL sheet; Send → toast → Sent row | NEEDS BACKEND: routing to Ravi and the mess kitchen flow (509) |
| Ravi saw it / Couldn't send + Retry / duplicate within 10 min | SIMULATED (row and status-bar hotspots; drawn dialog) | NEEDS BACKEND: seen receipt, delivery, duplicate check; OWNER: offline policy (510) |
| Record waste rows, quantity sheet, None left / Not made, Save | FUNCTIONAL for the sample sequence (Veg Pulao, Chappathi); other rows static | FUNCTIONAL on the device; OWNER: units from the menu (505), limits (508) |
| Validation errors (over the limit, not a number, negative) | SIMULATED (field hotspots "typed …") | FUNCTIONAL on the device |
| Missing data blocks sending ("Enter 2 more") | FUNCTIONAL (Draft → blocked Check and send) | FUNCTIONAL (client rule) |
| Save draft, leave → "Save this as a draft?" | FUNCTIONAL (links) | NEEDS BACKEND: draft storage |
| Send to Ravi for review → Waiting | SIMULATED (sent page after the server accepts) | NEEDS BACKEND: review service; OWNER: reviewer (506), editing a Waiting report (507) |
| Returned (reason, Edit and resubmit), Approved (locked) | SIMULATED (drawn states) | NEEDS BACKEND: review service (509) |
| Meal history and its states | SIMULATED (drawn; status-bar hotspots) | NEEDS BACKEND: history, own mess only (509) |
| Alerts feed (unread, rows open the meal or report) | FUNCTIONAL links; feed SIMULATED | NEEDS BACKEND: alerts feed (509) |
| Food short at the pass desk | SIMULATED (drawn target page; note beside the Pass Desk toast) | NEEDS BACKEND: routing by mess |
| SOS tab, claim, Mark as checked | SIMULATED (MealLoop-mark hotspot) | NEEDS BACKEND: SOS routing (as gap 459) |
| Tabs, Back, Close, Switch role, Language, Help, Sign out | FUNCTIONAL (links) | FUNCTIONAL |

## Decisions made without asking (kitchen/decisions.md 1–46)

- **Scope (2, 20):** only the 4 Kitchen-only frames are archived. The MS-C frames stay for the Supervisor. Inbound links from shared frames now open the Supervisor Home.
- **Components (3–11):**
  - Eight flagged sets and KeyPad Size=Decimal.
  - Numbers use Hero Metric 52 (no new style).
  - Eyebrows are in sans.
  - Stale sample times fit one calendar.
  - Card padding is 20 and rows are 56.
  - Per-variant samples are text overrides.
- **Home (13–19):**
  - AK initials in lime as drawn.
  - "8 dishes" (K01: 12).
  - "1 h 40 min" (K02: 55 min).
  - Simulated feed and meal-state hotspots.
  - Two rows plus See all 3 reports.
  - Meal ended while reporting is a grey result.
  - All 8 dishes and "6 of 8".
- **Shortage (22–25):**
  - All 8 menu dishes as chips.
  - Sent / Seen / Couldn't send only on evidence.
  - Duplicate at 1:36 PM.
  - Earlier frames reuse the 1:40 PM count.
- **Record waste (26–32):**
  - The K06 bottom bar.
  - The wired sample sequence.
  - Validation reached by hotspots.
  - A blocked Check and send.
  - The lime Sent for review page.
  - No Discard on the draft prompt.
  - Poriyal as the added dish.
- **Reports (33–37):**
  - One past-meal layout.
  - Menu spelling "Millet Idli".
  - Tuesday dinner board dishes with sample values.
  - History states.
  - Entry points.
- **SOS, Alerts, Me (38–44):**
  - Panel cloned from the Pass Desk with the kitchen helper.
  - The SOS tab moved off the first row.
  - SOS at 12:50 PM.
  - Alerts newest first, with Food short at 12:53 PM.
  - The Food short target page.
  - Me as K13.
  - Tab targets per state.
- **Wiring and export (45–46):** pill links re-set; a hotspot to Two shortage reports; 67 exports.

## Conflicts between the brief and a rule

| Brief or image says | Rule | Done |
|---|---|---|
| K06 / K16 draw 6 dishes, "Done 4 of 6" | Dishes come from the day's menu; missing data never becomes zero | All 8 menu dishes, "Done 6 of 8" (512) |
| K01 "Menu for Lunch · 12 dishes" | One sample; K17 lists 8 dishes | "8 dishes"; the board's 4 sides are an OWNER item (505) |
| K01 / K02 numbers at about 100 pt | Existing fonts and sizes; no new tokens | Hero Metric 52 (511) |
| K01 / K02 / K05 eyebrows in mono | Mono only for numbers, times and units | Words in sans, times in mono |
| K02 "Meal in progress · 55 min" at 1:40 PM | One calendar | "1 h 40 min" (519) |
| Spec stale examples 1:12 PM and 8:50 AM | One calendar | 1:40 PM and 9:00 AM (513) |
| K12 "Food short 1:20 PM", rows not in time order | One calendar; newest first | 12:53 PM (the Pass Desk report), newest first (518) |
| K14 tab drawn beside the first row's value | The SOS tab never covers a field | Beside the title, above the first row |
| "Exactly as the images" on short pages | Dead space ≤ 24 pt | Built as drawn; bands NEEDS REVIEW (516) |
| K09 "Masala Sambar" in Tue dinner entries | Menu spelling for that meal | "Sambar" (Tuesday dinner board) |

## New gaps (prototype_gaps.md 503–522)

- **OWNER (503–510):**
  - Headcount sent vs raw forecast.
  - Omitting the shortage row when none.
  - Dishes and units from the menu.
  - The reviewer.
  - Editing a Waiting report.
  - Maximum quantities.
  - Every backend item.
  - Offline policy for kitchen reports.
- **NEEDS REVIEW (511–519):** listed below.
- **Info (520–522):** the shared MS frames kept for the Supervisor; the hidden hotspots; the pdarch fix.

## NEEDS REVIEW by frame name

- **KS-1 · Home — During, Entries stale, Offline, Shortage sent / seen / couldn't send, Two shortage reports:**
  - Hero number 52 pt (511).
  - "1 h 40 min" (519).
  - Lime 4–5 (515).
- **KS-1 · Home — Before the meal, Headcount loading / stale / not sent:**
  - Bands 177–230 pt (516).
  - "8 dishes" (505).
  - "Updated 9:00 AM" (513).
- **KS-1 · Home — Two shortage reports, Shortage couldn't send:** the page scrolls under the tab bar (516).
- **KS-2 · Which food is short? (all), Sent to Ravi (toast), Already reported, KS-1 · Home — Shortage couldn't send:** the live card shows the 1:40 PM sample at 1:30 / 1:36 PM (514).
- **KS-3 · Record waste (all 12), Enter a quantity, Check and send:**
  - 8 dishes and "6 of 8" vs K06 (512).
  - The pages scroll under the bottom bar (516).
- **KS-1 · Home — After · Draft, KS-4 · Past meal — Draft:** "6 of 8 done" vs K16's "4 of 6" (512).
- **KS-4 · Meal history:** Tue 13 · Lunch not wired (517).
- **KS-4 · Edit and resubmit, Sent entries:** Tuesday dinner sample values and units (517).
- **KS-4 · Past meal — Draft / Not started / Missing / Approved, Sent entries, Meal history states:** bands 199–442 pt (516).
- **KS-5 · Alerts (all):**
  - Newest-first order.
  - 12:53 PM Food short (518).
  - Bands 126–397 pt (516).
- **KS-1 · Home — SOS active / claimed / Marked as checked, KS-5 · SOS panels, KS-3 · Record waste — SOS tab:**
  - Lime 4–9 (515).
  - The SOS at 12:50 PM beside the 1:40 PM count (514).
- **KS-5 · Me:** a 170 pt band (516).
- **Page 03 KitchenAlertRow:** unread titles use Body Semibold (the spec says medium).

## End checks

- **67 Kitchen frames:**
  - Contrast is at least 5.72 : 1.
  - Text under 12 pt, targets under 44 pt, truncation, overflow, raw paints and banned words: all 0.
  - Mono hits are units only.
  - The backdrop is missing only on the full-lime Sent for review page.
- **Kitchen word checks, all 0:**
  - Needs attention.
  - Remind.
  - "meals served" as a count label.
  - Forecast beside the live count.
  - Remaining count.
  - Approve or supervisor actions.
  - Success without evidence.
- **Reachability:** 67 / 67, 0 dead ends, 0 dangling. Page 09 is 196 / 204; the 8 unreached are old Supervisor / shared states.
- **Snapshot:** flow starts 14; snapshot st353.
- **Exports:** 67 at 2×.
