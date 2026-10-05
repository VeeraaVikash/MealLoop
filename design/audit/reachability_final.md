# Reachability · final (Final-2 G12, 2026-10-05)

Every flow start was walked with the reach8 breadth-first search over the prototype links on its page. Timers count as links. In-place component swaps (CHANGE_TO) do not count, because they never leave the frame. A frame counts as a **state** when no control in the main walk opens it; it is shown on the canvas or reached from its own state control.

## Flow starts (unchanged in G12)

| Page | Flow starts |
|---|---|
| 07 Prototype & QA | Student · Sign in |
| 09 Mess Staff | Mess staff · Sign in |
| 10 Admin | Admin · Sign in, Admin · Today, Admin · Issues, Admin · Insights, Admin · Manage |

## Results

| Page | Top-level phone frames | Reached from the starts | Unreached states | Unreached gallery | Bugs (non-state, unreached) | Dead ends |
|---|---|---|---|---|---|---|
| 07 | 262 | 165 | 82 | 15 | 0 | 0 |
| 09 | 77 | 66 | 11 | 0 | 0 | 0 |
| 10 | 163 (+13 in the AD-4f section) | 98 (+13) | 65 | 0 | 0 | 0 |

**Notes:**
- **07:** the tool's state pattern flagged 11 frames as "bug". All 11 are home and onboarding states in the student state gallery: Onboarding · Request correction — failed / SRM down / Session expired; Home · After cutoff / Hero unavailable / Modules hidden / Pass hidden / Crowd stale / Rewards soon / After last meal · Trackers empty; Entry · Discrepancy — failed. They are counted with the states.
- **10:** "AD-1d · Decision — Curd override (Open)" (the decision before the cutoff) is a state as well. The AD-4f Weekly report frames sit inside a section, which the tool does not scan. Checked by hand: AD-4d → All messes → Weekly report → page thumbnails → Viewer 1–9 (Next page chain); Export → Export sheet → Exported → Done → AD-4d; Annexe row → Needs a full week; Dish-wise chip → Viewer page 6.
- **09:** the 11 states are Door scanner (Empty), Kitchen (Offline), Pass check (Offline), How much to cook (Offline), Running out? — Offline, Spare food (Offered) / (Late), Cutoff passed, Alerts (Empty), Confirm hold — Failed / — Offline.

## The three Sign in walks (shortest link paths)

| Start | Target | Path |
|---|---|---|
| Student · Sign in | Home | Sign in → Verifying [Button] → Confirm profile [timer] → All set [Button] → Home · Afternoon [Button] |
| Student · Sign in | Ticket · Juice · new | … Home · Afternoon → Rewards [Credits] → Ticket · Juice · new [CouponCard] |
| Student · Sign in | Community · Info sheet · new | … Home · Afternoon → Community · List [Tab / Community] → Info sheet [ⓘ Trailing] |
| Mess staff · Sign in | Kitchen home | MS-0 Sign in → Verifying [Button] → Confirm profile [timer] → MS-1 Pick your job [Button] → MS-2 Start shift — Kitchen [Job · Kitchen] → MS-H Home — Kitchen [Start shift] |
| Mess staff · Sign in | MS-F1 Confirm hold | … MS-1 → Start shift — Door scanner → Home — Door scanner → MS-E1 Alerts [Tab / Alerts] → MS-F1 [Alert · Safety (open)] |
| Admin · Sign in | Today | AD-0 Sign in → Verifying [Button] → Confirm profile [timer] → AD-1a Today — Now [Button] |
| Admin · Sign in | AD-8b Notifications | … AD-1a → AD-8a Profile sheet [Avatar · DR] → AD-8b [Row · Notifications] |
| Admin · Sign in | AD-1b Annexe | … AD-1a → AD-1e Messes [Messes] → AD-1b Mess detail — Annexe [Mess · Annexe] |

Every step in DEMO.md was also checked link by link: 32 student, 48 staff and 36 admin steps. A first automated pass reported 9 hops as missing (the first hops of each walk, plus two answer flows). The raw reaction dumps showed each of those links present. The admin Approve on AD-6b and AD-7b goes through a frame link plus an in-place DecisionActions swap.

## Sending → Saved advances in place

Every Sending frame moves on by itself with an AFTER_TIMEOUT timer of 1.2–1.5 s:
- **07 (17 frames):** onboarding request, Answer Yes / No / Not sure, Entry discrepancy, Pass confirm (sending), Feedback, Report, Community support, Comments, Add expense, Deleting, Offer (→ Ticket · Juice), Meal detail lunch / dinner answers, and Me too.
- **10 (3 frames):** AD-3b2 Verify and close (Sending) changes in place to Sent (SWAP); AD-6b Pass exception (Sending) → Approved; AD-7b Ravi (Sending) → Saved. On the last two, the DecisionActions component also switches to Approved in place.
- **Pass · Confirm (holding):** moves on by press-and-hold (ON_PRESS) to Pass · Confirm (sending).
- **09:** staff results open directly ("Saved. Will send." when offline); there are no separate Sending frames.

## Links applied in G12

**07: 54 links added, 4 later reverted, net +50**
- **Copied from each frame's main screen by matching layer path:**
  - Offer · Sending: 3 links (ticket card, History, Something wrong).
  - Offer · Failed: 4 links, including its **Back**, which had no link.
  - You · Offline: 5.
  - Meals · Offline: 6.
  - Pass · Not today · new: 5 (tab bar and Search; this tab bar was left unwired in G9).
  - Intent · No response: 6.
  - Intent · Cutoff passed and Correction requested: 4 each. These are tab, crowd and At-mess tiles only; the answer buttons stay unlinked because the answer is locked.
  - Report · No one on duty: 6 category rows.
- **Try again:** Meals · Error → Meals · Menu; Spending · Error → Spending · This week; Rewards · Error → Rewards; Notifications · Error → Inbox; You · Error → You; Pass · Unavailable → Pass · Available.
- **Intent · Reason failed:** Try again and Skip this → Answer No · Saved.
- **Intent · Cutoff passed:** Ask to change → Intent · Correction requested.
- **Reverted after checking:**
  - Intent · No response Skip / Not sure. It is a locked lunch state and the copied links pointed at dinner answers.
  - The "Change" buttons on Meal detail · Answer Yes · Saved and Meal detail · Track this meal? (lunch). Their only candidate was the dinner Meal detail, and no unanswered lunch Meal detail exists, so this is listed as a gap.

**10: 4 links added**
- AD-1c Awaiting others: Hold confirmation → AD-3b Safety case (Notified); Karan's original pass → AD-6b Pass exception (Open).
- AD-2 Data freshness sheet and its Offline twin: Entry scans · Annexe → AD-2d Data gaps.
- Also, from G11: 33 offline Search buttons now open AD-8c Search (Offline), and the South / Annexe mess-detail links were added.

**Component (03): IntentChoice State=Disabled**, on light and on dark, flagged as edited. It was a 50% faded fill and is now outlined and dashed at full opacity. This fixes the locked choices on Intent · Cutoff passed / Correction requested / No response and in the Sending states (37 instances on 04, 37 on 05, 22 on 07). Renders: final2/g12/.

## Manifest after G12

| Page | Missing before G12 | Missing after G12 | In-place (not absent) | Left (absent, see still_absent.md) |
|---|---|---|---|---|
| 07 | 207 | 171 | 121 | 50 |
| 09 | 24 | 24 | 24 | 0 |
| 10 | 127 | 123 | 36 | 87 |

The 07 "missing" count also includes 2 reverted lunch "Change" buttons and Settings · System off → Open Settings, which opens iOS Settings and has no screen.
