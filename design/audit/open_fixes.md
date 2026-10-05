# Open fixes (Final-2 G10)

Scope: pages 07 Prototype & QA and 10 Admin. Fixes were made at component level first (page 03), then per frame, and then the checks were re-run. The "before" counts come from the G0 preflight list (final_fix_check.md) and the G10 opening scan. The "after" counts come from the closing scan (qc8, fa1, mw10, read6) on 2026-10-05.

| Item | Before | After | How |
|---|---|---|---|
| (a) Mono words | 07: 1,578 words in 175 frames · 10: 351 words in 52 frames | 07: 0 · 10: 0 | **Components:** 145 texts on page-03 components moved from mono styles to their Inter twins (mw10). The mapping is Mono Label → Label/Eyebrow, Mono Footnote → Footnote, Mono Body → Secondary Medium, Code → Body Semibold, Metric Unit → Secondary Medium, Hero Unit → Title 3, Metric → Title, Hero Metric → AX3 Large Title. **Frames:** frame overrides on 07 and 10 were fixed the same way. Numbers, times, units and codes (for example 7A3F, ML-1031) stay mono. |
| (b) Tappables under 44 pt | 10 (AD-7a, AD-7d) | 0 | **Give access ×2:** grown to 44 pt. **AD-7d Type pill:** 44 pt. **AD-7a Role bar and the 6 AD-7d timeline dots:** each got a transparent 44 pt hit area. Their links were moved from the 12–14 pt visuals onto the hit areas, so each control has one link to the same destination. |
| (c) Frames with 4 or more lime elements | 12 frames (G0) | 10: 0 · 07: 0 | See "Lime changes" below. |
| (d) Fill under 75% | 20 staff frames, AD-2b, AD-8c No results | **Staff:** superseded by the G2–G7 rebuild (all task frames ≥ 74–100%). **AD-2b:** 65%, not fixed. **AD-8c:** 57%, not fixed. **07:** 33 real flags, all logged (see "Fill on page 07" below). | **AD-2b and AD-8c:** two attempts each to enlarge the data visual (the LiveDial; the EmptyState art) left empty bands, so both were reverted (max 2 attempts; the rule says never add blocks). Logged for review. |
| (e) Under 20 pt above the tab bar at max scroll | 4 frames on 07 (plus their 04/05 twins); MS-D1 16 pt | 07: 0 · 10: 0 | **Credits frames:** bottom padding = 852 − tab top + 20. Status bar, header, tab bar and home indicator are now fixed children. **Credits Sending and Failed:** these frames had no tab bar, so one was added, copied from Rewards on each page. **Pass · Used and Not today:** content resized and the frame scrolls. MS-D1 was superseded by the rebuild. |

## Lime changes (item c)

**Page 10 frames:**
- AD-4a: end dot changed to ink.
- AD-6c Rewards: the hero's lime changed to white. The 3 coupons stay lime (tickets and coupons are allowed).
- AD-6c3 Redemptions: rows changed to ink.
- AD-7a: the Food heads segment and swatch changed to ink2.
- AD-7d: Done dots changed to ink.

**Page 10 sheet frames:** 8 frames had the old screen still drawn behind the scrim. The same base-frame fixes were copied onto those backgrounds, matched by layer path:
- AD-6c Rules;
- AD-7a Scope and Give access;
- AD-7d Type sheet and the 3 Entry sheets.

AD-6d Scope sheet: the two "done" step dots behind the scrim changed to ink (only the current step stays lime).

**Components (page 03), flagged as edited:**
- **IssueCard and ReportTicket:** the current progress segment is ink in these list cards, so a list of four or more tickets stays within 3 lime elements. This fixed 07 Report · My reports and Community · List (and their 04/05 twins). The StepBar on detail screens keeps the lime current step.
- **NotificationRow State=Read:** the app mark is white. Only unread rows keep the lime mark, so lime now means unread. This fixed Notifications · Inbox and Offline on 04/05/07 (5 → 2).

**Exception kept (logged as a conflict):** the AD-4f Weekly report preview and Exported frames show thumbnails of the document itself. A thumbnail carries the document's own lime (cover band and chart highlights), so it is shown as it really looks.

## Fill on page 07 (item d)

The qc8 fill check flagged 34 frames on 07. That check measures the bottom of the last child. Re-measured with the lowest child instead:
- **False positive, 1 frame:** You · Weekly view. The absolute Estimate pill was the last child, so it measured 29%; the true fill is 100%.
- **State and error screens, 21 frames, exempt in the same way as Empty and Loading:** each is a centred message with no data visual. Meals · Not published / No menu / Error, Entry · Offline, Pass · Not eligible / Expired / Already used / Wrong mess / Unavailable, Crowd · Unavailable, Community · Hidden, Waste · Pending / Unavailable, Spending · Error, Rewards · Coming soon / Error, Notifications · Error, You · Error, Search · Typing / No results / Offline.
- **List and text screens, 12 frames, NEEDS REVIEW:** none has a data visual to enlarge, and adding rows would add blocks. Recheck · Inbox 70, Pass · Available 61, Feedback · Pick meal 73, Feedback · Pick dish 74, Feedback · Recheck 71, Rewards history 72, Help 60, Community · Archived 69, Search · Menu result 56, About MealLoop 58, Settings · Daily goal 58 (×2, including the option-selected copy).

## Left as is

- **"5H, 2D, 1D, 3D"** on AD-3a Community (Success and Offline): qc8 lists these as mono words. They are number + unit ("5 h ago") and stay mono under the rule.
- **"Need more info" on ReportTicket step labels:** the spaces carry the mono font. This does not change how the text reads.
- **26 dead-chevron flags and 3 "no Back" flags on page 10:** these go to G12 wiring and the G13 iOS check.

## Verification

- **Snapshot:** st206 against st205.
  - 10: links +7 −7 (links moved to the hit areas), 0 frames added or removed.
  - 03: 3 component sets changed (IssueCard, ReportTicket, NotificationRow).
  - 04 and 05: 6 frames changed each (Credits clearance, Pass Used / Not today).
  - 07: 4 frames changed, links +10 (the tab bars added to Credits Sending and Failed).
  - Every other page: 0.
  - Flow starts unchanged.
- **Renders:** final2/g10/ (Notifications · Inbox, My reports, Credits · Failed, AD-7d Type sheet).
