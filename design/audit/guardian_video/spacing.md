# GUARDIAN-VIDEO · V5 spacing and alignment (2026-10-16)

Measured with tools/gvspace.js on every phone frame of pages 13 Guardian, 14 Warden and 15 Gate; fixed with tools/gvfix.js and
by hand. "Band" = empty space between the last content and the bottom limit (the top of the tab bar, or the 818 pt safe area),
non-scrolling frames only. Target: band ≤ 24, gaps 8 / 12 / 16 / 24, card padding 12 / 16 / 20, rows 52 / 56, one left margin.

**How the bands were closed.** Where the main element is media or a card, it grows (video preview, live photo, camera, queue
card, result hero, Out now hero, gate photo, report choices). Otherwise the trailing action group (button, links, note) is
anchored to the bottom ("Bottom actions"), the iOS bottom-action pattern, so the band above the safe area or tab bar is 16 pt.
No filler shapes were added.

## 1 · Left margin

The Guardian choose page margin is 20 pt. Every content block on pages 13, 14 and 15 starts at 20 pt. The only other values are
full-bleed blocks (sign-in onboarding cards, the gate scan camera, full-width lists whose rows pad 20 inside) and one invisible
hit area on G-3 · Status · Out (x 196). Nothing to fix.

## 2 · Dead space (before → after, pt)

| Frame | Before | After | Fix |
|---|---|---|---|
| GV-00 Before you record | 150 | 16 | anchor Agree + Continue + note |
| GV-01 Choose | 63 | 16 | anchor note + links + Verified |
| GV-01 Deadline passed | 186 | 16 | anchor note + link |
| GV-01 Already answered | 340 | 16 | answer card grows (176 pt video preview) + anchor links |
| GV-02 Record (6 frames) | 26 | 24 | camera 340 → 342 |
| GV-02 Camera blocked | 166 | 16 | anchor buttons + note |
| GV-02 Uploading | 405 | 16 | anchor note |
| GV-02 Checking | 272 | 16 | anchor checks card |
| GV-03 Retry (2) | 286 | 16 | anchor Record again + note |
| GV-04 Send video | 101 | 16 | video preview grows 150 → 235 |
| GV-02 Upload failed | 203 | 16 | anchor buttons + note |
| GV-05 Photo and code | 66 | 16 | live photo grows 196 → 246 |
| GV-06 Sent, Please watch, Photo and text | 261 | 16 | answer card grows (176 pt preview) + anchor links |
| GV-06 Call requested, Rejected, Withdrawn | 240–264 | 16 | anchor links + note |
| GV-07 Past answers | 276 | 16 | anchor note + links |
| G-3 Status (6 frames) | 143–188 | 16 | anchor info line + links |
| G-0 Sign in / Verify code | 113 / 369 | 16 | anchor button + link |
| G-A1 / A2 / A3 | 184 / 263 / 380 | 16 | anchor note / buttons |
| WV-1 Queue (6 frames) | 58–153 | 16 | queue card grows; evidence block takes the height |
| WV-1 Empty | 324 | 16 | empty card grows, content centred |
| WV-1 Approved / Change asked / Rejected | 222–243 | 16 | anchor Undo link |
| WV-2 Out now | 75 | 16 | Out now hero grows |
| WV-2 Out now · Kiran | 63 | 16 | anchor Call buttons + note |
| WV-3 History / All | 147 / 35 | 16 | anchor footnote |
| WV-3 Record / Video expired | 87 / 118 | 16 | anchor footnote |
| WV-4 Escalated | 304 | 16 | anchor "Nothing else needs you." |
| WV-5 Me | 118 | 16 | anchor Alerts / Help / Sign out |
| GA-3 Verify Exit / Return | 52 | 8 | gate photo 300 → 352 (leads and fills its card) |
| GA-5 Find student | 336 | 16 | anchor "No match?" note |
| GA-7 Out now | 29 | 16 | anchor footnote |
| GA-9 Report a problem | 178 | 16 | the three choice cards grow equally |

## 3 · Gaps, padding, rows

| Where | Before | After |
|---|---|---|
| DecisionButtons (component) card padding | 18 | 20 |
| Recording banners (Too short / Too dark) padding | 10 | 12 |
| WV-1 Empty, result heroes, Out now hero padding | 24 | 20 |
| WV-5 Me details padding | 8 | 12 |
| WV-4 Escalated rows (and its call sheets) | 68 | 56 |
| WV-2 Out now "See all 12" row | 59 | 56 |

Content gaps are 12 or 16 everywhere (8 on gate scan and report).

## 4 · Centre axis

Gate results (GA-6 × 10, GA-9 Sent) and the gate loader: every centred element and the button sit on x = 196.5 (0 pt deviation).

## 5 · Same role, same size

Page titles are ML/Large Title 34 on Guardian, Warden and Gate (the old Guardian status / sign-in titles were 28 and now use
the style). Body 17, secondary 15, footnote 13, tags 13 come from the shared styles on all three apps. Gate result titles (52)
have no counterpart elsewhere.

## 6 · Gate

The student photo leads GA-3 and is 352 pt tall (was 300). Every gate bottom button is 56 pt with its bottom at 810: the primary
at y 754 on GA-2, GA-3 ("Doesn't match"), GA-4, GA-6 × 10 and GA-9 Sent; a second button sits 16 pt above (y 682).

## NEEDS REVIEW (not safe to auto-fix)

- **W-6 · Alerts:** band 285; the alert list is the only content. It needs more alerts or a decision to show fewer screens.
- **GA-7 · Out now, GA-8 · Overdue returns:** rail rows are 79 pt (time + name + status); the 52 / 56 rule would cut the rail.
- **GA-1 · Gate home, GA-8:** they scroll (content is taller than the screen), so the band rule does not apply; buttons inside the
  scroll are not at the shared y.
- **G-M · Messages:** a reference picture of SMS, not an app screen (margin 16, no backdrop) — left as it is.
- **Sheets:** frames with an open sheet are measured by their sheet (fitted to content), not by the page behind.

## Checks after V5 (pages 13, 14, 15)

Contrast lowest 4.61 : 1 (G-3 Back late, warning text, pre-existing); words in mono 0 (Sent times now sans; pass codes 4QZ8 and
7F3K now sans); lime ≤ 3; text under 12 pt 0; targets under 44 pt 0 (Past answers "Help" link widened); truncation 0; overflow 0;
banned words 0; raw paints 0. Backdrop missing only where allowed: the dark recording screens, gate scan and full-lime gate results.
