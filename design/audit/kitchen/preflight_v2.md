# KITCHEN · pack v2 · W0 preflight (2026-10-19, read-only)

- **HEAD:** e8b9bc3 (KITCHEN W10) before this pass; the refreshed pack is committed as 1432935. `git push --dry-run`: up to date. Identity VeeraaVikash <veeraavikashs21@gmail.com>.
- **Snapshot:** st354 = st353 on all 18 pages (0 differences); flow starts 14.
- **Pack:** design/reference/kitchen_2026-10/ now holds **18 images** (K01–K18), the new spec and the new prompt. The v1 pack (17 images, spec, prompt, README) is kept in `archive_v1/`.

## What changed in the pack

| Change | Images |
|---|---|
| **No approval loop.** The waste report is saved by the kitchen and is simply Recorded; no Waiting, Returned or Approved. Statuses are Not started, Draft, Recorded, Not recorded. | K05, K08 (Check and save), K09 (Not recorded), K10 (Recorded, editable), K11, K12, K15 (Recorded), K16, K18 (editing closed, new) |
| **6-hour edit window:** "You can edit until <time>." / "Editing closed after 6 hours." | K10, K15, K18 |
| **Status is a small dot + plain text**, never a pill | K05, K09–K11, K15, K16 |
| **Forecasted attendance** card (number + "expected diners", nothing else); not ready = "—" + "Forecast not ready yet" | K01 |
| **No "recorded at the door"** anywhere; after the meal "Final entries" | K02, K03, K05, K15, K16 |
| **"Done N of M" is plain text**; "Review and save" | K06, K14 |
| **Menu: dish names only** (no units, no tags) | K17 |
| **Meal history: ended meals only**, plain status, "Today's meal appears here after it ends." | K11 |
| **Alerts:** "Waste not recorded" replaces "Report returned" | K12 |
| Unchanged | K04, K07, K13 |

## Page 09 Kitchen family today (run KITCHEN v1, 67 frames in five sections)

| Section | Frames | v2 plan |
|---|---|---|
| Kitchen · Entry and Home (16) | KS-0 sheet; Home Before ×4; During, Entries stale, Offline, Shortage sent, Two shortage reports, Shortage reports; After · Not started / Draft / Waiting; Menu for Lunch; Meal ended while reporting | **Modify in place:** the sheet's third item (no review), Before ×4 (ForecastCard), After ×3 (Final entries, dot status, Waiting → **Recorded**), Menu (names only). During frames change through the LiveCard component (the note goes). |
| Kitchen · Shortage (8) | sheets ×4, toast, seen, couldn't send, duplicate | Keep (LiveCard updates through the component) |
| Kitchen · Record waste (17) | Record waste ×7, quantity ×5, Check and send ×2, Sent for review, draft prompt, Add a dish | **Modify in place:** progress as plain text, "Review and save", **Check and save** / "Save report" / "You can edit this later.", **Report saved** instead of Sent for review |
| Kitchen · Reports and history (13) | Returned, Edit and resubmit, Sent entries, Approved, Waiting, Draft, Not started, Missing, Meal history ×5 | **Archive** the approval-loop pages (Returned, Edit and resubmit, Sent entries, Approved, Waiting, Draft, Not started, Missing, Resubmitted); **rebuild** Meal history and the past meals (Not recorded K09, Recorded K10, editing closed K18, today's Lunch recorded); keep Empty / Loading / Error |
| Kitchen · SOS, Alerts and Me (13) | SOS ×6, Alerts ×5, Food short, Me | **Modify:** "Report returned" rows → "Waste not recorded"; row targets. Me and SOS kept. |

Shared and other roles (not redesigned): MS-0, MS-1 (Kitchen Staff row), Password — Kitchen Staff, Language, Help; the MS-C / E / F / G frames kept for the Supervisor; Door Scanner and Pass Desk.

**Components (page 03):** LiveCard (remove the "Recorded at the door" note), new **ForecastCard**, new **StatusText**, new **HistoryRow** (StatusText on the right; the v1 set is renamed and kept), KitchenAlertRow (Waste not recorded kind). HeadcountCard and ReportStatusChip are kept and marked superseded.
