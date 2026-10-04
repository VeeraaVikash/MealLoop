# Readability audit (final-fix F6)

**Scope:** every page-09 and page-10 frame not created in this run (54 staff frames; 158 admin frames). The F3 menu frames were already built to the standard.

**Tool:** `tools/read6.js` (`mealloop/read6`).

**How the standard was applied:**
- The sizes (body 15, secondary 13, meta 12, mono times 13) are treated as minimums.
- Nothing was made smaller, and no content was moved to a detail screen: nothing overflowed.

## Summary

| Check | Staff (09) | Admin (10) | Fix |
|---|---|---|---|
| Text under 12 pt (tab labels excepted) | 0 | 0 | — |
| Mono numbers or times under 13 pt | 1 | 27 | ML/Mono Label 12 → ML/Mono Footnote 13 |
| Grey text lighter than #6B6B66 on white or the wash | 0 | 0 | — (secondary text is ink 2, #5C5C58, 6.6:1 on white) |
| Essential text in a faded (disabled) style | 16 | 19 | Opacity → 1; the control gets a dashed ink-2 outline (disabled stays readable) |
| Truncated text | 13 (+ the StaffTopBar texts, fixed in the component) | 22 | Truncation off, text wraps, containers grow |
| Rows or buttons under 44 pt | 0 | 14 | 4 raised to 44 (See all people ×2, Row · Sambar ×2); 10 left (pills and the 14 pt audit-log dots: see below) |
| Under 12 pt between rows | 0 | 0 | Separate cards already sit 12 pt apart; divided lists inside one card count as one card (decision) |

**Component changes (staff only):**
- **StaffTopBar Home and Task:** the texts wrap instead of truncating, the bar height grows (minimum 56), and the Shift column fills.
- **Task screens:** shift lines shortened as on the homes ("Lunch · 12–2 PM · Pass desk"), so nothing wraps today.

**Left as is (logged):**
- Pills and chips under 44 pt: Give access 30, Type · All types 30, the meal and filter pills. A pill's height is the pattern; making it 44 pt changes the look on every root.
- The six 14 pt audit-log dots (R2-3). Each entry is also reachable from its 44 pt+ row.
- The People role bar (12 pt). Its legend opens the same screen and is 44 pt+.

## Per frame (size changes and other fixes)

| Frame | Changes |
|---|---|
| MS-B3 · Valid — available, MS-B3b · Redeemed, MS-B4 · Already redeemed | truncation → wrap: "Special pass", "Chicken biryani · Wed 12–2 PM" |
| MS-B5 · Invalid / expired | faded text (0.60) → full; truncation → wrap: "Special pass", "Paneer tikka · Tue 12–2 PM" |
| MS-C2 · Demand dashboard | mono 12 → 13: "LAST 4 WEDNESDAYS"; truncation → wrap: "Replies so far", "counted at half", "Expected is 6% above the 812 average" |
| MS-E-empty · Before shift starts | 5 faded task cards (0.45) → full opacity + dashed outline (not available before the shift) |
| MS-F6 · Confirm hold — Offline · new | Approve / Decline buttons (0.40) → full + dashed outline |
| MS-G2 · Report a shortage — Sent · new, MS-G3 … Offline · new | 4 unselected dish options (0.50) → full + dashed outline |
| MS-H5 · End shift summary · new | truncation → wrap: "Lunch · by you", "Biryani case" |
| All staff screens with a top bar | StaffTopBar texts wrap (component) |
| AD-3b · Safety case (+ Offline, Notified, Failed) | "Row · Close case" (0.50) → full + dashed outline; Offline: "Notify kitchen" (0.40) → full + dashed |
| AD-3c · Issue detail — Dish feedback | mono 12 → 13: "REPORTS · LUNCH · WED 14 AUG" |
| AD-3d · Community moderation (+ Offline) | mono 12 → 13: "LOOK THE SAME · 3 REPORTS" |
| AD-6a · Special passes (Success, Offline) | mono 12 → 13: "BIRYANI · CLOSED 2 PM", "BIRYANI · AT 1:58 PM" |
| AD-6b · Pass exception (Open, Declining, Sending, Approved, Failed) | truncation → wrap: "Expired unused 2:00 PM", "Biryani coupon · 12–2 PM" |
| AD-6c · Rewards (Success, Offline) | truncation → wrap: coupon facts ("₹30 each · 57 left", "₹40 each", "₹120 each · 0 claimed", "Not shown to students yet") |
| AD-6d2 · Pickup detail (Success, Offline) | mono 12 → 13: "OFFERED · 4 DISHES" |
| AD-7a · People (Success, Offline) | "See all people" 28 → 44 pt |
| AD-7b · Staff access — Ravi (Offline) | Approve / Decline (0.40) → full + dashed outline |
| AD-3a · Issues — SOS (Offline) | "Notify kitchen" (0.40) → full + dashed outline |
| AD-2c · Shortage alerts (Offline), AD-1c · Today — Decisions (Offline) | 4–5 faded pills (0.40) → full + dashed outline |
| AD-1d · Decision — Curd override (Offline) | "Record outcome" (0.40) → full + dashed outline |
| AD-3a · Issues — Dishes (Success, Offline) | "Row · Sambar" 39 → 44 pt; Offline: "See reports" (0.40) → full + dashed |
| AD-3a · Issues — Community (Success, Offline) | mono 12 → 13: step counts "2/4", "3/4", "1/4" and "UPDATED 5H AGO" ×5 (IssueCard) |
| AD-4f · Report preview · new (+ Exported) | truncation → wrap: tile meta "13% less", "1 fewer" |
