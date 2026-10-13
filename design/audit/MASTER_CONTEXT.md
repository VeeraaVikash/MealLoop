# MealLoop · MASTER_CONTEXT

This file did not exist before run OUTINGS (2026-10-13). The full master context is **PROJECT_CONTEXT.md** (pages, components, rules, decisions); the rules are in **design_intent.md**; the current state card is **STATE.md**; run logs are in **run_status.md**. This file adds the Outing Pass module so the brief's pointer resolves.

## Outing Pass module (run OUTINGS, 2026-10-13)

**What it is.** A student asks to leave the hostel for a set window; the guardian approves first, the warden next (within the review window); the system issues a signed, time-bound pass; the gate records one exit and one return; overdue returns and missed deadlines escalate — never auto-approve. An approved outing is not an absence: the meal forecast uses confirmed exits only. Definitions, status map, workflow and the draft weekend policy are in design_intent.md ("OUTING PASS").

**Pages and starts (10 approved starts).**

| Page | Role | Start | Frames |
|---|---|---|---|
| 04 / 05 / 07 | Student (Aarav ·0238, Block B) | Student · Sign in (07) — You → Outings | 28 each (05 Dark; only 07 linked) |
| 10 Admin | Hostel administrator, section AD-9 · Outings + Manage hub tile + Insights chain row + report page 9 line | Admin starts (existing) | 19 |
| 13 Guardian | Aarav's guardian, mobile web | **Guardian · Sign in** | 18 |
| 14 Warden | Block B warden, senior warden | **Warden · Sign in** | 18 |
| 15 Gate | Main Gate security | **Gate · Sign in** | 23 |

**Components (page 03, flagged NEW, reworked to the owner's reference):** RangeSlider (1835:2157), SlideToApprove (1835:2192), OutingRibbon (1836:2223), LoopTracker (1837:2353), OutingPass (1838:3006), DeckCard (1839:2258), GateVerify (1839:2327).

**Sample story (consistent across roles):** Sat 18 Oct, out 2–8 PM, Express Avenue Mall, Shopping; sent Fri 6:00 PM; guardian replies by Fri 11 PM (approved 7:42 PM); warden decides by Sat 12 PM (approved 10:40 AM, pass issued); pass 7F3K; exit Sat 2:04 PM; return 7:41 PM.

**Owner decisions open:** gaps 356 (guardian verification source), 358 (official policy and cutoffs), 359 (emergency authorities), 360 (security fallback, photo source), 361 (pilot thresholds), 362 (guardian channel), 363 (data retention), plus 364 / 365 / 369.

**Where to look:** outings/outings_spec.md, outings_audit.md, outings_report.md, DEMO.md ("Outing Pass module"), prototype_contract.md (last section), export_outings/.
