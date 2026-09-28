# Special pass tile audit (written before any change)

Scope: Student Light (04), Student Dark (05), States & Accessibility (06), Prototype (07). 99 Archive skipped.
Source component: `AtMessTile` (Type = Attendance / Pass Available / Pass Redeemed / Pass Now), 170×80, radius 16, surface fill, 30×30 glyph square (radius 8), Title = Body-semibold style, Detail = Secondary style. Entry QR uses Type=Attendance with the same metrics.

| # | Count | Variant (state) | Glyph | Tile size | Radius | Tile / glyph-square fill | Dot position (in tile) | Label | Where | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 40 | Pass Available | ticket 20 pt | 173×80 | 16 | surface / action (black) | x 40–50, y 22–32: on the glyph square's corner, 1 pt from the title text | "Special pass" / "Wed 12–2 PM" | Meal detail, Intent (D row), Home · Morning, full-scroll copies, Tamil test | STATE correct. DRIFT: dot sits against the text instead of on the tile's top-right corner. |
| 2 | 8 | Pass Now | ticket 20 pt | 173×80 (5), 353×80 (3) | 16 | surface / action | same as #1 | "Special pass" / "Show at the counter" | Home · Crowd stale, Home · During meal (+ full scroll) | STATE correct (redeeming). DRIFT: same dot position. |
| 3 | 109 | Pass Redeemed | ticket 20 pt | 173×80 (104), 353×80 (5) | 16 | surface / fill-quiet (grey) | none | "Special pass" / "Used at 12:32 PM" | Most Home and Answer frames, Recheck Home, prototype copies, Tamil test | STATE correct. DRIFT vs spec: the Used state should show a check, not the ticket. |
| 4 | – | – | – | 173 / 353 wide | – | – | – | – | two-tile rows vs single-tile rows | Intentional sizing (fill width in the row), not drift. |
| 5 | 1 set | component | – | – | – | – | – | – | `AtMessTile` set | DRIFT: "Pass Now" and "Pass Redeemed" variants sit on top of each other (both at x 412). |
| 6 | 2 frames × 2 modes | detached | ticket | – | – | – | – | – | AX · Home · Afternoon (06) | Intentional: AX frames are detached copies with scaled text by design. Reported, not changed. |
| 7 | – | layer names | – | – | – | – | – | – | "AtMessTile" on Meal detail/Intent vs "Special pass tile" on Home | Naming drift only (no visual effect). |

Total instances: 157 (04, 05, 06, 07). There is no "Not today" instance anywhere yet.

Fix plan: one `SpecialPassTile` component (State = Available / Redeeming / Used / Not today) copied from the Entry QR tile's metrics. The dot is anchored to the tile's top-right corner (constraint Right/Top), the glyph is one ticket at 20 pt, and Used shows a check on grey. Every instance in #1–#3 is swapped in place (same node, same size, same labels, reactions kept).
