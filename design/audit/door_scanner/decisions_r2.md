# DOOR-SCANNER pack v2 · decisions made without asking

Numbering continues from door_scanner/decisions.md (1–41).

| # | Stage | Decision | Rule or reason |
|---|---|---|---|
| 42 | D0 | The new pack's D01–D16 are the same drawings as the first run (only a signed metadata block was added to each file), so this pass rebuilds only D17 Alerts and D18 Me; D2–D5 are logged as skipped (already done from the same drawings). | Change nothing the run does not need; no rework without a changed source. |
| 43 | D1 | Two new flagged component sets on page 03 under the Door Scanner components: **SOSAlertCard** (Not claimed / Claimed by you / Checked by you) and **AlertRow** (Done / Seen / Reminder / See all; text properties Title, Time, Line). SOSPanel is not reused for the card: its card part cannot hold the action button (children cannot be added to an instance). Me reuses **CountTile** (Small) for its two tiles and **StaffTabBar3**. | Reuse first; flag new ones. |
| 44 | D1 | AlertRow circles are 44 pt (D17 draws 32 at 292 pt = 43 pt; the spec says 36 pt). Rows are 56 pt with a top divider. | Image × 1.346; list rows 52 or 56. |
| 45 | D1 | The SOS line is split: "SOS ·" and "· 5 min ago" in sans, "12:45 PM" in mono (D17 draws the whole line in mono), as on the SOSPanel. | Mono only for numbers, times and units (decision 4). |
| 46 | D1 | SOSAlertCard has Claimed by you ("You're checking this", outline "Open the SOS") and Checked by you ("Checked by the door · Ravi will close it", no action) besides D17's Not claimed, so Alerts matches the SOS panel state on every page that links to it. | The case closes only with the supervisor; one state per frame. |
