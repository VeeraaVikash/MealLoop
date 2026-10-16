# FIX-2 R6 checks (2026-10-16)

All checks ran on the **84 kept frames** on page 12 (x9chk, now section-aware) after R5, plus the two new student frames on 04 and 07.

| Check | Result |
|---|---|
| Contrast (text vs nearest solid fill) | Lowest 5.72 : 1; 0 pairs under 4.5 : 1 |
| Words in mono | 0 (mono only for numbers, times and units) |
| Lime elements per frame | at most 3 on every frame; 0 lime text on light; lime on light is ink-outlined |
| OrbitBackdrop | 84 / 84 phone frames (the two A4 PDF pages have none by design) |
| Text under 12 pt | 0 (after the fix below) |
| Linked layers under 44 pt | 0 (after the fixes below) |
| Truncation | 0 |
| Horizontal overflow | 1, intentional: **Edit day · Thu 15 Lunch · Swipe to delete** (the swiped row slides left to show Delete) |
| Banned words / content | 0 (no dish quantities, no "cook X", no vendor login, no "or" between dishes, no student names or IDs to the vendor) |
| Raw paints | 0 |
| Reachability | 84 / 84 from the four page-12 starts; 0 dead ends; 0 dangling links |
| Flow starts | 14 (page 12 keeps 4; Figma's automatic "Flow N" starts removed) |

## Fixes made during R6

1. **Thumbnail text under 12 pt.** The page 1 and page 2 thumbnails on Weekly report · Report ready (sheet) are 26% clones of the A4 pages, so their text measured 3–5 pt. They are rasterized into image rectangles (they are pictures of the pages, not readable text).
2. **Targets under 44 pt.** On the Edit day frames, the Check word ring, the Drag handle and the Veg mark were 24–28 pt. Each now sits in a 44 × 44 hit area (363 layers across the Edit day states). The 13 "Tell students" switches (51 × 31) are wrapped in 56 × 44 hit areas and their reactions moved onto the wrappers.
3. **Remove confirm title.** "Remove Panneer Butter Masala?" wrapped over the body. Title is now "Remove this dish?" and the dish name moved into the body; the sheet was refitted.

## Snapshot st312 (vs st311)

- Page 12: +0 −0 ~2 L+13 L−13 (Remove confirm text; switch reactions moved onto their hit areas). Page 99: 0. Pages 04 and 07: 0.
- Pages 10, 03 and 00 Before report section counts (10: −1 section +61 children; 03: −1 +5; 00 Before: −15 +177; links ± equal). This is a one-time artifact of the snapshot tool becoming section-aware in R5: frames inside existing sections are now listed as top-level. Their link targets and text are unchanged, so it is not an edit. Pages 10 and 11 were not edited.
- Flow starts: 14.
