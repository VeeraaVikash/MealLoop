# R2-2 · Plain words · change report

Pages 09 and 10 only. Student pages are unchanged, because the stage names no student screen (decision logged). Tool: `mealloop/lblfix` (exact-text, mono kept on numbers, bound texts set through the instance property). The rules are stored in `mealloop/pw_rules`.

## Replacements (distinct strings; count = text nodes on 09 + 10 before the change)

| n | Old | New |
|---|---|---|
| 18 | Decisions | To do |
| 15 | Watch | Alerts |
| 11 | Audit log | History |
| 10 | Surplus | Spare food |
| 9 | Escalated to you | Passed to you |
| 9 | Main Mess · permissions apply here only | Main Mess · applies here only |
| 9 | Override · staff event | Change to plan · staff event |
| 9 | Verify and close | Check and close |
| 7 | Forecast | Expected |
| 7 | Staff access | Who can do what |
| 6 / 1 | 7 to watch / 6 to watch | 7 alerts / 6 alerts |
| 6 | Data freshness | How fresh is this? |
| 6 / 3 | SOS · 1 / SOS · 0 | Urgent · 1 / Urgent · 0 |
| 6 | Lunch surplus | Lunch spare food |
| 5 / 3 | Entered / entered | Came in / came in |
| 5 | Unserved | Not served |
| 5 | Plate waste | Left on plates |
| 5 | 2 data gaps | 2 missing (shortened from "2 with missing data", which wrapped) |
| 5 | Data gaps | Missing data |
| 4 | Lapsed 11:30 | Missed cutoff 11:30 |
| 4 | Menu voting | Menu votes |
| 4 | Curd cut to 45 L · lapsed | Curd cut to 45 L · too late (shortened, wrapped) |
| 4 | entered · 860 forecast | came in · 860 expected |
| 4 | Plate waste 18 kg · Sambar 4 L unserved | On plates 18 kg …, in 72 pt time columns "On plates" (shortened, wrapped) |
| 4 | Intent | Replies |
| 4 | Override | Change to plan |
| 4 | 712 · 83% of forecast | 712 · 83% of expected |
| 4 | 1 lapsed | 1 missed cutoff |
| 4 | Prep override · Main Mess | Change to plan · Main Mess |
| 4 | Curd override | Curd · change to plan |
| 4 / 1 | North · 15% under forecast / North Mess · 15% below forecast | … under expected / North Mess · 15% below (shortened, wrapped) |
| 3 | Entered 1,872 of 2,360 | Came in 1,872 of 2,360 |
| 3 / 2 | Voting / Voting · 1 to decide | Votes / Votes · 1 to decide |
| 3 | Lapsed | Missed cutoff |
| 2 | 5 more need you · 1 lapsed | 5 more need you · 1 missed cutoff |
| 2 / 1 | " · 2 data gaps" / " · 1 data gap" | " · 2 with missing data" / " · 1 with missing data" |
| 2 / 1 | entered of 860 / 700 forecast | came in of 860 / 700 expected |
| 2 | Kitchen cooked 60 L · cut lapsed | Kitchen cooked 60 L · cut too late (shortened, wrapped) |
| 2 + 2 | North / South Mess · % under forecast | … under expected |
| 2 | CORRECTIVE ACTION · FROM KITCHEN | FIX · FROM KITCHEN |
| 2 | Permissions | What they can do |
| 2 | Intent answers | Replies |
| 2 | of 712 entered · dashed = fix on trial | of 712 came in · dashed = fix on trial |
| 2 | 712 entered of 860 forecast · at 1:40 PM | 712 came in of 860 expected · at 1:40 PM (a direct splice first produced "expectedcast"; corrected) |
| 2 | UNSERVED BY DISH · CALCULATED | NOT SERVED BY DISH · CALCULATED |
| 2 | Demand | Who's coming |
| 2 | Waste entry | Record waste |
| 1 each | No surplus logged yet → No spare food logged yet; "…Surplus shows once…" → "…Spare food shows once…"; Offline · decisions need a connection → Offline · to-dos need a connection; Approvals, overrides, … → Approvals, changes to plan, …; Nobody edits their own permissions → Nobody changes what they can do themselves; Overrides → Changes to plan; Plate waste, weighed → Left on plates, weighed; Unserved is prepared minus served → Not served = prepared minus served; Curd · lapsed 11:30 AM → Curd · too late 11:30 AM; Sambar override → Sambar · change to plan; Dinner · 123 fewer · 15% below forecast → … below expected; 0 lapsed → 0 missed cutoff; Nothing to watch right now → No alerts right now; Shortages, crowd and data gaps are all clear. → … missing data …; Not recorded · Ravi · cutoff lapsed 11:30 → … too late 11:30; Logs plate waste · Main Mess → Logs what's left on plates · Main Mess; FORECAST · LUNCH → EXPECTED · LUNCH; 412 intents at cutoff (· 48%) → 412 replies at cutoff (· 48%); Meal Intent so far → Replies so far; Forecast is 6% above the 812 average → Expected is 6% above …; Plate waste not entered yet → Left on plates not recorded yet; Plate waste · whole meal → Left on plates · whole meal; Corrective action · Sambar salt cut → Fix · Sambar salt cut; Override lapsed · Curd 60 → 45 L → Change late · Curd 60 → 45 L; Override · Sambar 42 → 50 L → Change · Sambar 42 → 50 L; 11:05 AM · Override lapsed · Curd → 11:05 AM · Change late · Curd; Prep & override → Prep & changes to plan | |

**Total: page 09, 26 text nodes; page 10, about 230 text nodes** (the page-10 log was cut off in the tool output, so it was verified by a re-survey). After the change, the only old terms left are the intentional ones below.

## Kept on purpose

- "Needs your decision", "1 result needs your decision": not the Decisions section.
- "Decline turns on once a reason is entered": "entered" means typed here.
- "Not sure counts as half toward the forecast": the How-counted text must say it is a forecast.
- "Up 8% · hot day forecast": a weather forecast.
- Frame and layer names (for example "AD-1c · Today — Decisions", "MS-C2 · Demand dashboard"): the brief says keep layer names.
- No UI string used Shift select, Prep recommendation, Scope or Demand dashboard; those terms appear only in layer names.

## Wrap checks

Lines that newly wrapped were shortened (the new word, never the font):
- MS-D4: "Change late · Curd 60 → 45 L", "Change · Sambar 42 → 50 L"
- MS-E: "11:05 AM · Change late · Curd"
- AD-1b ×2: "cut too late"
- AD-7d ×5: "too late"
- AD-2d / AD-1f / freshness sheets: "2 missing"
- AD-2c Empty: "15% below"
- AD-4e ×4: "On plates"

The remaining multi-line hits are body sentences that were already multi-line.
