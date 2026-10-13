# Outings · Outing Pass module · spec (run OUTINGS, full brief, 2026-10-13)

The first copy of the brief arrived cut off; a spec was drafted from it (kept as `outings_spec_truncated_brief.md`, **superseded**). The full brief then arrived mid-run. Everything below follows the full brief. The one Figma change made from the draft (an "OutingPass" set on page 03, never committed or referenced) was removed before the preflight was repeated; st244 = st243 proves it left nothing behind.

## Pages and starts

| Role | Page | Start |
|---|---|---|
| Student | 04 (source, Light) → 05 (every frame has the ML Color **Dark** explicit mode, so new 05 frames get Dark) → 07 (prototype) | none new; You → Outings row |
| Guardian | **13 Guardian** (new, Light, 393 pt mobile web, no tab bar) | **Guardian · Sign in** |
| Warden and senior warden | **14 Warden** (new, Light; tab bar Queue, Escalated, Me) | **Warden · Sign in** |
| Gate | **15 Gate** (new, Light, staff style, 56 pt targets, 17 pt+ primary text) | **Gate · Sign in** |
| Hostel administrator | **10 Admin** (existing shell, Light), new section AD-9 Outings | none new |

Pages 12–15 did not exist, so 13 / 14 / 15 are used as named (no 12 is created). Start names use the file's " · " separator, like the seven existing starts (the brief writes " . "). Approved set after the run: the seven existing (Student · Sign in, Mess staff · Sign in, Admin · Sign in, Admin · Today, Admin · Issues, Admin · Insights, Admin · Manage) + the three new = **10**; the four admin tab starts are among the seven.

## Sample data (defaults from the brief)

| Item | Value |
|---|---|
| Student | Aarav ·0238, Block B |
| Guardian | "Aarav's guardian" (no name shown) |
| Warden | "Block B warden"; senior warden "Senior warden"; duty warden "Duty warden" |
| Gate | "Main Gate security", Main Gate |
| Outing | Sat 18 Oct, out 2 PM–8 PM, Express Avenue Mall, Shopping |
| Deadlines | guardian by Fri 11 PM; warden reviews Sat 8 AM–12 PM; "You'll know by Sat 12 PM" |
| Pass code | 7F3K |
| Key times | guardian approved Fri 7:42 PM; tracker Moment Fri 10:00 PM; exit Sat 2:04 PM; return 7:41 PM |
| Other students | shown by masked ID only (rule: never invent people). Masked IDs already in the file: 0238, 0733, 0912, 1187, 2026, 2231, 2291, 3092, 3306, 4410, 4417, 5518, 7182, 7764. **New, unused:** ·5841 (warden's top card), ·6127, ·6390, ·8253, ·4962, ·9375, ·1468 |

## Status map (StatusPill variants only)

Pending, Escalated → Hold · Approved, Out, Returned → Success · Rejected, Overdue → Stop · Expired, missed cutoff → Lapsed · Offline → Offline.

## Decisions logged at O0

1. The entry row: the brief says "same row style as Credits", but Credits on You is a bento tile, not a row. The brief also says "a new row", so the Outings row is a SettingsRow (Type Link) at the top of the Settings card, the only row style on You.
2. Other students appear as "Student ·NNNN" with unused endings (never invent people).
3. The gate has no tab bar (single-task staff device; the home holds every route). The warden tab bar reuses StaffTabBar with its three labels overridden (Queue, Escalated, Me).
4. Guardian pages are mobile web: no tab bar, no iOS status-bar chrome beyond the shared StatusBar.
5. New components (flagged): RangeSlider, OutingRibbon, LoopTracker, OutingPass, SlideToApprove, DeckCard, GateVerify.

## Components added at O1 (page 03, all flagged NEW in their descriptions)

| Component | Node | Variants |
|---|---|---|
| RangeSlider | 1835:2157 | State Default, Dragging, Disabled (dashed) |
| SlideToApprove | 1835:2192 | State Default, Dragging, Done, Failed; "Use button instead" link built in |
| OutingRibbon | 1836:2223 | Day Saturday, Sunday, Weekday (black card) |
| LoopTracker | 1837:2353 | State × Size: 7 states × Full / Mini |
| OutingPass | 1838:3006 | State Valid, Out, Returned, Overdue, Revoked, Expired unused |
| DeckCard | 1839:2258 | State Due soon, Calm, Escalated |
| GateVerify | 1839:2327 | Direction Exit, Return |

Reused (no new component): BackButton (GlassButton), StatusPill, TabBar, StaffTabBar, GlassSheet, ResultCard, AuditRow, BentoTile, ListRow, SettingsRow, Button, OfflineBanner, EmptyState.
