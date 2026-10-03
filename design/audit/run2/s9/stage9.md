# Stage 9 · Student "Me too" (gap 76) (run 2)

Start `st152` (= end of Stage 8), end `st153`. Tool: `tools/me9.js` (`mealloop/me9`, driver `mealloop/me9drv`). **Community · List is unchanged.**

The control already exists: the **IssueHero** on Community · Suggestion holds an **IntentChoice** "Me too" (`Support`), so nothing was added under the count. Four state frames per page, cloned from the Suggestion screen:

| State | 04 | 05 | 07 | Control |
|---|---|---|---|---|
| Default | 112:14712 | 172:48117 | 221:63679 | IssueHero Support, "Me too", 112 |
| Sending | 1403:608 | 1403:14327 | 1403:14739 | IssueHero Sending; IntentChoice `Sending` (spinner), neutral fill, opacity 0.6 (dimmed) |
| Backed | 1403:13924 | 1403:14433 | 1403:14841 | IssueHero Supported; **113**; black pill (hero-bg) with a 1.5 pt white outline and a white check; "You backed this · tap to undo" (Undo hidden) |
| Failed | 1403:14046 | 1403:14538 | 1403:14942 | Dashed on-hero-secondary outline, no fill, "Try again"; line under the hero "Didn't send." |
| Offline | 1403:14135 | 1403:14623 | 1403:15023 | IntentChoice `Disabled` "Me too"; line under the hero "Needs a connection" |

- **Placement:** 04 and 05 row J at x 4930 + k·493, y 12646, labels J11–J14. On 07 at x 2465 + k·493, y 12800, with labels, Moment "Wed 2:00 PM" and sample chips added.
- **Wiring (07):**
  - Default · Me too → Sending (Smart animate 0.25), replacing the defect link to Community · List;
  - Sending → after 1.2 s → Backed;
  - Backed · tap → Default (undo);
  - Failed · Try again → Sending;
  - Offline has no link.
  - Back, tabs, search and "Report it privately" are copied on every state.
- **Page 07 links:** 1,335 → 1,366 (+32 −1). Flow starts unchanged.
- **Lime:** Backed uses the black pill (the brief) instead of the component's lime Selected fill, so the only lime left on the screen is the step bar's current segment.
- **Gap 76 closed.**
