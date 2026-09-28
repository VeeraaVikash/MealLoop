# Stage 2.5 — before-renders

1× renders taken before any Stage 2.5 change. Each frame was cloned into a temporary `TMP capture` frame with its links stripped, rendered, and the capture was deleted.

- `light_H1…H14, H2b, H6b.png`: page 04, 393×852 each.
- `dark_H2.png`, `dark_H6.png`: page 05.

## Noise floor

| Comparison | Differing px | Max channel diff |
|---|---|---|
| Same 16-frame capture rendered twice | 0 (all 16 frames) | 0 |
| Two separate clones of H2 in one capture | 8,420 | 3 |

Pass rule for "unchanged" claims in Stage 2.5: no pixel above 15, the same threshold as Stage 2. The measured floor is max 3.

## State at snapshot

| Page | Top-level nodes | Links |
|---|---|---|
| 03 | 263 | — |
| 04 | 1036 | 7 |
| 05 | 847 | 7 |
| 07 | 265 | 1054 reactions (966 navigate + 88 back) |
