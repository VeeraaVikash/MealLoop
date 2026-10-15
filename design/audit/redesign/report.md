# Run STUDENT-REDESIGN · final report (2026-10-15)

The student app was rebuilt from `design/reference/redesign_2026-10/` on page 04 (source) and page 07 (prototype). The Outing, Guardian, Warden and Gate screens were restyled with the Orbit backdrop. Only the admin Menu and Dishes changed on the staff side. Page 05 Dark was marked stale, not rebuilt.

**Sample day used everywhere:** Wed 14 Aug 2024, 7:00 AM (week Mon 12 – Sun 18 Aug), Aarav ••0238, Main Mess, 120 pts, Juice 7A3F. The outing is Sat 17 Aug, 2–8 PM, Express Avenue Mall, pass 7F3K.

**Flow starts:** the 10 approved starts are unchanged; no automatic "Flow N" start is left.

**Snapshots:** st274 → st290; every stage started equal to the previous end, except P15 (see the table).

## Stages

| Stage | Status | Notes |
|---|---|---|
| P0 Preflight | Done | Snapshot equal; reference pack unpacked (34 images, SVGs, menu data); inventory by family in preflight.md. |
| P1 Foundation | Done | design_intent "STUDENT REDESIGN 2026-10"; 18 component sets on page 03; tokens `veg` / `non-veg`. |
| P2 Onboarding | Done | Sign in, Getting your details, failure / offline states rebuilt in place (start kept). |
| P3 Home | Done | 11 Home states with HeroCard, AnswerRow, TicketStrip, CrowdRow; lime budget kept at 3 (ticket dot ink). |
| P4 Meals | Done | 28 day × slot frames per page generated from the board (menu_tiers.json). |
| P5 Answer + Entry QR | Done | Answer families for breakfast, lunch and dinner; EntryQRCard. |
| P6 Community | Done | List, Fixed, info sheet, Issue page, comments; IssueCard. |
| P7 Feedback | Done | Three steps (face, which dish, what's wrong), Sending / Sent / Failed / Offline, My feedback. |
| P8 SOS with proof | Done | Choose, Camera (live only, GPS, time), Review (ProofCard, ProofChecks), Sent rail; admin Safety case shows the proof. |
| P9 You and the rest | Done | You, Notifications, Credits, Juice ticket, Attendance, Spending, Help. |
| P10 Outings restyle | Done | Backdrop on Outing / Guardian / Warden / Gate; dates moved to the Aug 2024 week; Guardian pill "தமிழ்". |
| P11 Removals and admin | Done | Waste, plate tracker, nutrition and Meal detail archived (04: 48, 07: 38); 05 stale (333); admin Menu (+ Snacks) and Dishes. |
| P12 Calendar and data | Done | ••0238 everywhere (68 layers); dinner preview from the board; replacements.md. |
| P13 Wiring | Done | All required links present. 626 tab-bar links on 07. reach8: 07 147 / 296 reached, 0 dead ends. DEMO.md student walk is 16 steps. |
| P14 Checks | Done | checks.md: contrast 0 real failures (lowest 4.88), mono 0, lime ≤ 3, backdrop, targets 0, truncation 0, overflow 0, parity 282 / 282, banned words 0. |
| P15 Exports and docs | Done, with a deviation | 34 PNGs at 2× in export_redesign/. Contract, gaps 381–397, STATE and MASTER_CONTEXT updated. **Deviation:** I skipped the stage-start snapshot. The end snapshot equals P14's (the P15 edits were size and visibility only). Three render findings were fixed (see checks.md addendum). |
| P16 Report | Done | This file. |

## Decisions made without asking

74 are logged in decisions.md. The ones most likely to matter:

- **Calendar shift (52):** outing dates moved 427 days, keeping weekdays.
  - Outing "today" is Mon 12 Aug, 1:40 PM, two days before the student sample day.
- **Masking (45, 60):** "••0238" everywhere except Request correction, which keeps the full register number.
- **Menu tiers (21):** Highlight, mains, curries and "Comes with it" follow the board's yellow marks. Board spellings are kept as written (Chappati / Chappathi / Chapathi, Panneer).
- **Dish detail (68):** the sample is Sambar · Breakfast (it was a dish not on Wednesday's lunch board).
- **Admin Dishes (62):** shows "Sambar · Too salty", to match the student feedback.
- **Removed from the student UI, archived not deleted (55, 72):**
  - Waste, plate tracker, nutrition and Meal detail families.
  - Old full-scroll You / Community / Spending / Rewards copies on 04.
  - The Recheck Home waste tile was hidden.
- **Backdrop (5, 71):** OrbitBackdrop is the bottom child of each frame, since Figma cannot pin a layer behind scrolling content. It is applied to every app frame, with exceptions listed.
- **Tab bars (65):** wired on 07 only; 04 had no tab links before and still has none.
- **Hit areas (73):**
  - Text links in sheets are wrapped in 44 pt frames, on both 04 and 07.
  - Controls inside instances get transparent 44 pt hit areas on 07.
- **Mono words (70):** 429 words moved to sans on 04 / 07.
- **Gate GA-6 (71):** Back late and Already exited regained their black fill. The P10 backdrop pass had turned them light, leaving white text on canvas.

## Conflicts between the brief and a rule

| Brief / reference | Rule | Outcome |
|---|---|---|
| Eyebrows in mono (reference) | Mono only for numbers | Inter Semi Bold caps (2) |
| "Chicken or Paneer Briyani" (reference) | No "or" between dishes | "Chicken Briyani · Panneer Briyani" (3) |
| Backdrop as a fixed layer | Plugin API cannot pin behind scroll | Bottom child, frame fill canvas (5) |
| Four lime elements on the reference Home | ≤ 3 lime | Ticket dot ink (16) |
| Lime "Sambar" tile in the reference Answer | ≤ 3 lime; no stated meaning | Not used (29) |
| Me too → Community issue | Real data (the issue is the counter-3 wait) | Brief wiring kept; NEEDS REVIEW (38) |
| Spending sample after "today" | Calendar rule | Stops at Wed 14 (46) |
| Outing story day (Sat) vs sample day (Wed 14) | One calendar | Outing "today" Mon 12; NEEDS REVIEW (52) |
| Nutrition banned | Admin layouts unchanged | Admin nutrition inputs kept; OWNER (59) |

## New gaps

These are 381–397 in prototype_gaps.md.

**OWNER:**
- 381: what the yellow highlight on the board means.
- 382: snacks intent.
- 383: the ** gravies.
- 384: final logo file.
- 385: Tamil text.
- 386: SF Symbols not used.
- 395: admin nutrition inputs.

**NEEDS REVIEW or CHECK:**
- 387: Answer · Dinner has no entry.
- 388: legacy settings frames.
- 389: guardian history date.
- 390: tagline.
- 391: "he" in guardian copy.
- 392: Dish detail lines.
- 393: Me too target.
- 394: stale 05.
- 396: staff ·0238.
- 397: 04 tab links.

## Components added (page 03)

| Component | Id | Component | Id |
|---|---|---|---|
| OrbitBackdrop | 2129:2343 | DietMark | 2129:2198 |
| OrbitMark | 2129:2211 | AppIcon | 2129:2240 |
| DishPictogram | 2129:2299 | ProblemGlyph | 2129:2324 |
| HighlightChip | 2132:2197 | DishTile | 2132:2406 |
| MealSegments4 | 2133:2323 | TicketStrip | 2133:2374 |
| CrowdRow | 2133:2427 | HeroCard | 2135:2336 |
| AnswerRow | 2135:2382 | FaceButton | 2136:2321 |
| ProblemTile | 2136:2360 | SeveritySegmented | 2136:2382 |
| ProofCard | 2137:2399 | ProofChecks | 2137:2448 |
| EntryQRCard | 2153:3742 | IssueCard | 2156:2702 |

Tokens: `veg`, `non-veg`. Reused unchanged: ClockDial, DateChip, SegmentedControl, GlassButton, CreditsChip, EmptyState, OfflineBanner, Toast, FormField, GlassSheet, StatusBar.

Fixed in this run: OutingPass (Pass column hugs) and ProofChecks (round check marks).

## Frames archived (page 99, links stripped)

Additions to page 99 per stage, from the snapshot diffs. The counts include before-redesign copies and their notes.

| Stage | 99 additions |
|---|---|
| P2 | +49 |
| P3 | +38 |
| P4 | +28 |
| P5 | +63 |
| P6 | +15 |
| P7 | +67 |
| P8 | +7 |
| P9 | +31 |
| P11 | +245 (Waste, plate tracker, nutrition, Meal detail) |
| P14 | +20 (10 stale 04 full-scroll copies) |

Page 99 now holds 455 phone frames. The builders clone the archived "Help (before redesign)" frame (2174:33148), so it must stay in place.

## NEEDS CHECK · menu items (from the board photo)

| Day · meal | Item as shown | Why |
|---|---|---|
| Mon 12 · Lunch | Drumstick Brinjal | Hard to read |
| Wed 14 · Breakfast | Pongal | Hard to read |
| Thu 15 · Lunch | Aloo Gobi Athiraki | Hard to read |
| Thu 15 · Dinner | Chole Pattora | Hard to read |
| Sat 17 · Lunch | AloThindeli | Hard to read |
| Wed 14 · Dinner | Panneer Butter Masala | Board also lists "Butter Panneer"; treated as one dish |
| Tue 13 · Dinner | Veg Gobi Dry · Chilly Gobi Dry | "Veg / Chilly Gobi Dry" split |
| Thu 15 · Breakfast | Lemon · Masala · Millet Idiyappam | Board "(Lemon (or) Masala) or Millet" |
| Sun 18 · Lunch | Pepper Chicken · Kadai Chicken | Board "Chicken (Pepper/Kadai)" |
| Sun 18 · Snacks | Corn Bajji · Bajji with Chutney | Reading unclear |
| Every day | Tea · Coffee · Milk | Split from "Tea/Coffee/Milk" |
| Sun 18 · Lunch | Chicken Gravy (no highlight) | Only gravy line without highlight |
| All ** gravies | Fish / Mutton / Chicken Gravy | Who they are for (gap 383) |

There are also non-menu checks:
- Meals · Dish detail lines (gap 392).
- Guardian history "Sat 17 Aug · Returned" (gap 389).

## Stale page 05

All 333 student frames on 05 Student Dark carry " · stale". Their layouts, links and notes are unchanged. Families and counts are in stale_05.md.

They show the pre-redesign app and must be regenerated from 04 before dark mode ships.

## NEEDS REVIEW · by frame name

**Page 07 / 04:**
- Answer · Dinner, Answer · Dinner · I'm in, Answer · Dinner · Why skipping (sheet): no entry on the sample day.
- Notification settings, Quiet hours, Reminder prompt, Settings · System off, About MealLoop, Report · From feedback: legacy, no entry.
- Feedback · Which dish (sheet) → Me too → Community · Issue: the issue sample is the wait issue.
- Onboarding · Sign in / Sign in failed / Offline: tagline "without the waste".
- Meals · Dish detail: Sambar sample lines.
- Recheck · Home · Recheck / yes / no: waste tile hidden; these older Home variants were not rebuilt.
- Lock screen previews, Recheck · Lock · …, Lock · …: OS mockups, no backdrop; header text raised to 100%.
- New outing · Mon … Sun: outing "today" Mon 12 Aug vs sample day Wed 14.
- The checker misreads one sample: the label sits on a sibling lime bar it doesn't composite, so it reports 1:1; the real ratio is 15.1:1 (checks.md row 1).

**Other pages:**
- 13 G-4 · History: "Sat 17 Aug · Returned".
- 13 G-3 · Status pages: "when he is back".
- 13 / 14 headers: AppWordmark vs the final logo.
- 09 MS-A2 · Welcome: "Aarav ·0238".
- 10 AD-5b Edit / Add dish, More nutrients, Rules sheet, AD-8c search: nutrition inputs kept.
- 10 AD-9 pilot: "Sat 17 Aug" (old weekday did not match; decision 52).
