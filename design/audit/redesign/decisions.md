# Run STUDENT-REDESIGN · decisions and conflicts log

| # | Stage | Decision / conflict | Rule followed |
|---|---|---|---|
| 1 | P0 | The brief lists "the 10 approved starts, which include the four admin tab starts". The file has exactly ten, four of them admin tabs. | Kept ten. |
| 2 | P1 | Reference eyebrows ("THIS MORNING") are set in mono. | Mono only for numbers, times and units: eyebrows use Inter Semi Bold 12 caps (Label/Eyebrow). |
| 3 | P1 | Reference copy "Chicken or Paneer Briyani" (05_meals_lunch). | No "or" between dishes: shown as "Chicken Briyani · Paneer Briyani". |
| 4 | P1 | Brief DishTile sizes S 80×84, M 124×86, L 258×96 are sketch points. | × 1.346 and fitted to the 353 pt content width: S 109×113, M 170×116, L 353×129. |
| 5 | P1 | Figma cannot pin a layer behind scrolling content (fixed layers must be the top N children; `scrollBehavior` is not in the plugin API). | OrbitBackdrop is the bottom child of each 852 pt screen, like the old "Meal wash"; it moves with the page, as the large title does. The frame fill is the canvas token so the area below stays canvas. |
| 6 | P1 | Veg / non-veg marks need their regulatory colours. | Two tokens added to ML Color: `veg` (#2F7A1E / dark #5FB548) and `non-veg` (#B3412E / dark #E2725E); no raw hex. On black tiles the mark sits on a 4 pt cream backing so it stays legible. |
| 7 | P1 | The pack has six problem glyphs; the dish problem sets name 14 problems. | Mapped to the nearest glyph (see the ProblemGlyph description); listed as a gap. |
| 8 | P1 | ClockDial already has Request, Status, Out, Returned, Late, Not going, Overnight in Large and Medium (OUTINGS-FIX). | Reused unchanged. |
| 9 | P1 | Dot texture: 7% ink dots every 14 sketch pt. | A 47 px PNG tile (one dot, alpha 7%) at scale 0.4 → 18.8 pt tile, r 1.2 pt. |
| 10 | P1 | HighlightChip info target. | 44 pt hit frame around a 32 pt pill. |
