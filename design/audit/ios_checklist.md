# iOS checklist (Final-2 G13, report only, 2026-10-05)

**Kit:** iOS 27 kit not available; the iOS 26 Liquid Glass components in the file were used. These are StatusBar, HomeIndicator, NavHeader, GlassButton, GlassSheet, the tab bars and the Search circle.

**Method:** tools/ios13.js (stored as mealloop/ios13) checked every 393 pt phone frame on 04, 05, 07, 09 and 10, including the AD-4f section on 10. tools trunc13 (stored as mealloop/trunc13) re-measured every text that has truncation turned on: it lays the same text out with wrapping and compares heights.
- **Root:** a frame some tab opens, plus the student tab-root names on 04/05 and the job homes on 09.
- **Back:** a visible Back near 16, 58.
- **Sheet:** a frame with a visible Scrim.

The run changed nothing in the file.

## Summary

| Check | 04 Student Light | 05 Student Dark | 07 Prototype | 09 Mess Staff | 10 Admin |
|---|---|---|---|---|---|
| Frames checked | 300 | 300 | 262 | 77 | 176 (163 + 13 in the section) |
| Back on drill-ins, none on tab roots | ✓ 0 roots with Back | ✓ 0 | ✓ 0 | ✓ 0 (10 roots = 4 job homes and their states, Alerts, Me) | ✓ 0 |
| Drill-ins without Back or Close | ✓ none outside allowed kinds (1) | ✓ same | ✓ same | ✓ none outside allowed kinds (2) | ✓ none outside allowed kinds (3) |
| Tab bar: 5 items or fewer, navigation only | ✓ 4 tabs + Search circle; every tab NAVIGATE | ✓ same | ✓ same | ✓ 3 tabs (Home, Alerts, Me) | ✓ 4 tabs + Search circle |
| Sheets have a grab handle and Close | ✓ 38 sheets; exceptions (4) | ✓ 38; same exceptions | ✓ 37 (9 + 20 + 8); same exceptions | – none (sequences are full-screen modals) | ✓ 33 (21 + 12); 0 exceptions |
| Sequences are modal | ✓ Feedback and Report steps hide the tab bar | ✓ | ✓ | ✓ Record waste 1–3 and Confirm hold 1–3 / Failed / Offline: no tab bar, Close on every step (step 2 also has Back) | ✓ Export sheet, Verify and close sheet |
| Targets 44 pt (staff 56 pt) | see (5) | – (design page, no links) | see (5) | ✓ every task control 56 pt or more; 47 Back / Close have 56 pt hit areas; only the status-bar time skip is 54 pt (demo shortcut) | see (5) |
| Status bar and home indicator clear | ✓; the Lock frames use the lock-screen clock (6) | ✓ same | ✓ same; 15 Gallery title cards are not phones | ✓ (content starts at 118–152, below the bar; scrolling frames pin them) | ✓ |
| Scrolling frames pin bars and actions | ✓ | ✓ | ✓ | ✓ | ✓ |
| No truncation | 1 real (7) | 1 real (7) | 1 real (7) | ✓ 0 | ✓ 0 |
| No custom gesture fighting edge-swipe | ✓ no drag gestures | ✓ | ✓ one drag, starting at x 36 (8) | ✓ | ✓ |

## Notes

1. **Allowed kinds without Back or Close:** tab-root states (Empty, Loading, Offline, Error and the Answer / Recheck Home states); onboarding and sign-in; full-screen receipts and results that end with a primary action (Feedback · Receipt, Report · Receipt, Report · Urgent receipt, Recheck thanks); the Lock-screen previews; and the views a root's pills switch between (Meals Dinner / Breakfast).
2. **09:** the 22 frames without Back are the sign-in trio and the full-screen results (Welcome, Already in, Not valid, Wrong meal, Offline, Sent, Logged, Saved, Change saved, Waiting for Devi, Cutoff passed), plus Alerts (Empty), which is a tab root state. Each result has one large primary action (Scan next, Done, Home).
3. **10:** the frames without Back are the root states (Today, Insights and Manage hub Empty / Offline), the Issues — Dishes / Community views (Issues pills on the tab root) and the AD-0 sign-in trio.
4. **Sheet exceptions (04/05/07):**
   - *Request deletion* and *Sign out* are iOS alerts (centred, two buttons), not sheets. They correctly have no grab handle.
   - *Pass · Confirm (holding / sending / failed)* are confirm sheets with a Cancel button instead of Close.
   - *Reminder prompt* is dismissed by "Not now".
   - NEEDS REVIEW: should the Pass confirm and Reminder sheets also get the round Close of the BACK STANDARD?
5. **Targets under 44 pt.** NEEDS REVIEW, report only; nothing was changed in G13.
   - **07:**
     - Meal pills (Breakfast / Lunch / Dinner): 30 pt tall.
     - Menu dish rows: 36 pt.
     - Pass · Used / Expired / Already used / Wrong mess: an Expand control at 16 pt and a chevron at 18 pt.
     - Comments grabber: 28 pt.
     - Waste / Spending / You segment controls: 38 pt.
     - Nutrients Estimate pill: 30 pt.
   - **10:**
     - Issues view pills (SOS, Dishes, Community): 30 pt.
     - Scope pills on AD-6a / AD-6d / AD-7a / AD-7b: 30 pt.
     - AD-4d Dish-wise chip, AD-6c Redemptions / Catalogue pill, AD-5a meal pills and the Votes pill: 30 pt.
     - AD-1a info.circle and chevron.right icons: 20 pt; the rows around them are tappable too.
   - read6 skips the names Pill, Chip, Scope, Dot and Icon, which is why G10 reported 0. Proposed fix (G14 NEEDS REVIEW): transparent 44 pt hit areas, as used for AD-7a / AD-7d in G10, or 44 pt pill height in the Pill component.
6. **Lock frames:** Lock screen previews and the Lock / Recheck · Lock frames on 04/05/07 have no status bar on purpose. They draw the iOS lock-screen clock.
7. **Real truncation:** Home · Crowd stale and its full-scroll copy, on 04, 05 and 07. The At-mess tile's "Show at the counter" needs 36 pt and gets 18. Of the 1,504 texts with truncation turned on (402 on 07, 4 on 10, 549 on 04, 549 on 05), the other 1,499 fit their boxes, so nothing is cut. Proposed fix: let the tile text wrap to two lines, as on Home · Afternoon (logged as a gap).
8. **Drag gesture:** Your plate · expanded has a Portion drag (ON_DRAG) that starts at x 36. That is outside the 20 pt left edge used by the iOS back-swipe, so it does not fight it. There are no other drag or swipe gestures. The gallery's left-half and right-half taps are plain taps on a presentation aid.
