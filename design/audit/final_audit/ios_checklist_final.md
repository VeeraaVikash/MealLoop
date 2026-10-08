# iOS checklist, final · Brand audit B7 (2026-10-08)

Tool: `ios13` (all phone frames, run in chunks), `tgt14` for targets and `trunc13` for truncation (B2). Report only.

| Check | 04 | 05 | 07 | 09 | 10 |
|---|---|---|---|---|---|
| Frames | 300 | 300 | 262 | 77 | 176 |
| Tab roots with a Back | 0 | 0 | 0 of 4 | 1 of 3: MS-H Home — Kitchen (the staff-home demo Back, accepted 2026-10-07) | 0 of 4 |
| Tab bar items (navigation only) | 4, all navigation | 4 | 4 | 3 | 4 |
| Sheets with a grab handle | 38 / 38 | 38 / 38 | 37 / 37 | – | 33 / 33 |
| Sheets with Close | 32 / 38 | 32 / 38 | 31 / 37 | – | 33 / 33 |
| Sheets without Close | Pass · Confirm ×3 and Reminder prompt (Cancel / Not now, accepted); Request deletion and Sign out (iOS alerts with Cancel, accepted) | same | same | – | – |
| Targets under 44 pt (staff 56) | – (no links) | – | 0 | 3 status-bar time skips (accepted) | 0 |
| Status bar present | 283 (17 lock-screen frames show the iOS lock screen instead) | same | 230 (lock screens + the 15 gallery cards) | 77 | 176 |
| Home indicator present | 300 | 300 | 247 (the 15 gallery cards have none) | 77 | 176 |
| Scrolling frames keep status bar, nav and tab bar fixed | all | all | all | all | all |
| Real truncation | 0 | 0 | 0 | 0 | 0 |
| Drags that start within 20 pt of the left edge | 0 | 0 | 0 (Portion drag starts at x 36) | 0 | 0 |

Same result as Final-3 H6: no new iOS issue.

## iOS 27 kit

**No iOS 27 kit exists in the file.** Page 03 has no frame named "iOS 27 kit", and the community library cannot be imported through the connector ("Not permitted to upsert from library"). The file still uses the iOS 26 Liquid Glass parts (StatusBar, HomeIndicator, GlassButton, GlassSheet, Alert) plus the app's own tab bars.

To swap (agreed: keep 393 pt, keep our tab bars on the iOS 27 glass), the owner places one instance each of these in a frame named "iOS 27 kit" on page 03: Status bar - iPhone 17 Pro, Home Indicator, Tab Bar - iPhone, Sheet - iPhone, Grabber, Button - Liquid Glass - Symbol, Alert, Action Sheet.
