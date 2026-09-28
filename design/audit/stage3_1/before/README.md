# Stage 3.1: snapshot and before-renders

Taken before any Stage 3.1 edit. Frames were rendered at 1× from link-free clones in a temporary capture, which was deleted afterwards.

## Snapshot (`st31_*` in root plugin data; old `st3_*` page chunks cleared, `st3_copies` kept)

| Page | Top-level nodes | Links (reactions / actions) |
|---|---|---|
| 03 | 265 | 0 |
| 04 | 1036 | 7 |
| 05 | 847 | 7 |
| 07 | 285 | 1156 / 1158 |

- **Page-07 link dump:** stored in full under `st31_1lnyf7e_*`. The +2 actions come from the conditional "Track my plate" link, which holds a set-variable and two navigate actions.
- **Page 03 read until two reads agree:**
  - The first read (inside the snapshot run) gave `jiwuwv` twice.
  - Three reads in two later runs all gave `lis4qm`.
  - The stored page-03 snapshot was replaced with the agreed `lis4qm` read. `jiwuwv` was the first-load flip.

## Before-renders

- **`p04_*` / `p05_*`:** H1, H6, H6b, H7, H8, H10, H12, H13 (Light / Dark). The same capture rendered twice differs by 0 px in all eight.
- **`p07copy_*`:** the page-07 copies of H6, H10 and H13, plus H9 and H14 (they will get hit layers).
- **All 246 page-07 frames:** rendered in five 12-column grids (kept in the working scratchpad). These are the "no pixel above 6" baseline. Frame order is stored under `st31_p07order`.

## Found while inspecting (for the build)

- **H6's trailing icon today:** none. The NavHeader instance has `Show Trailing` = false (and `Show Trailing 2` = false); its Trailing Group frame is an empty 44×44 slot.
- **H8's Day/Week toggle:** `SegmentedControl`, `Items=2, Selected=2` (Week), 353×48.
- **H6's meals section:** it has no section title. Its content is DatePillStrip → Hero → Nutrients → Meals card (Lunch / Snack / Breakfast / Dinner rows).
