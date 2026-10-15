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
| 11 | P2 | Frames that stay in the flow (Sign in with the "Student · Sign in" start, Getting your details, Offline, and the failed state) are rebuilt in place so their node IDs, inbound links and start survive; a copy of each old version goes to 99 Archive ("(before redesign)", links stripped). | Never delete; never copy a start (a copied start on 99 was removed at once; srarc now drops copied starts). |
| 12 | P2 | "Onboarding · Request correction — failed" sat in the 07 QA gallery chain (Gallery A Sign in → … → Offline). | Rebuilt in place as "Onboarding · Sign in failed" ("Couldn't sign in. Try again"), so the gallery chain and its Back / Next halves still work. |
| 13 | P2 | 04 has no frame named "Home"; links into the archived onboarding frames on 04 go to "Home · Morning" (106:10991); on 07 to Home (221:62548). | — |
| 14 | P2 | SRM down, Session expired, Not eligible are OnboardingPage instances. | Restyled without detaching: instance fill cleared, "Art" hidden, OrbitBackdrop and OrbitMark added. |
| 15 | P3 | Home frames rebuilt in place (IDs and inbound links kept): Afternoon → Home (the tab and sign-in destination, 7:00 AM), Morning → Not answered, During meal → Breakfast open (8:10), After last meal → After a meal (9:40), After cutoff (9:20), Hero unavailable → Mess closed (6:30, "Mess opens at 7:30", the card keeps the QR), Modules hidden → Empty, Pass hidden → No Special pass (Thu 15 Aug), Offline, Loading, Crowd stale → Skipped. The old 04 versions are on 99 as "(before redesign)" copies (07 held identical copies of the same designs). | Never delete. |
| 16 | P3 | The Home reference shows four lime elements (points star, "I'm in" chip, ticket dot, crowd bar). | At most three lime elements per frame: the Special pass dot is ink on Home. |
| 17 | P3 | Archived: Home · Rewards soon (rewards module gone; the 07 gallery is bridged Rewards · Coming soon ↔ Offer · Failed), Home · After last meal · Trackers empty (plate tracker banned), the nine 04 "(full scroll)" duplicates (each screen now scrolls in place). | — |
| 18 | P3 | The status-bar "time travel" chain is kept: Home 7:00 → Breakfast open 8:10 → After a meal 9:40 → Not answered → Home. | — |
| 19 | P3 | Instances of a variant set take the set's shared text-property default, not the variant's own text. | Every builder passes explicit text for each instance (fixed two Cutoff rows that showed the Unanswered copy). |
| 20 | P3 | Header row: orbit mark + "MealLoop" 18, existing CreditsChip ("120 pts"), existing GlassButton icons (exclamationmark.bubble → SOS, bell) at 44 pt; gaps 6 to fit 353 pt. | Existing header icons kept; no SF Symbols. |
