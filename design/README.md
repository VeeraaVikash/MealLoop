# MealLoop · iOS design

Figma: https://www.figma.com/design/nzzTAm9YnJRSdKEeYUWUEb/MealLoop

| Page | Contents |
| --- | --- |
| 00 MoodBoard | Yours (empty when the file was built) |
| 01 Foundations | Concept, principles, semantic colour in Light/Dark, type ramp, spacing, radii, elevation, texture |
| 02 Components | 29 components/sets with variants, properties, states and a usage note beside each |
| 03 Screens – Light | 33 screens in 6 sections: Onboarding, Home, Meals, Feedback & SOS, Community, You. Prototype-linked |
| 04 Screens – Dark | Same 33 screens; Semantic collection set to Dark on each section |
| 05 States | Offline, after-cutoff, errors, empty, loading, Accessibility XL (AX3), Tamil localization |
| 06 Flow | Six journeys drawn with live thumbnails and labeled arrows |

`tokens.json` is the exported token set (primitives → semantic Light/Dark, layout, type).

## Concept: "The mess, crafted"

Paper and ink, taken from the printed meal token and the hand-lettered menu board. Curry leaf for action, turmeric for moments, chilli for real trouble.
The meal pass is a physical object: paper grain, a perforation with canvas-coloured notches, a stub and a mono serial number.
Everything else stays quiet. Hierarchy comes from type, hairlines and whitespace, and data is shown like instrumentation.

## Key design decisions

- **One accent per screen.** `action/primary` (curry leaf) is the only action colour. Turmeric (`highlight`) is fill-only; text uses `highlight/text` (turmeric-deep, AA). Chilli appears only on SOS and destructive actions.
- **Meal intent as a ledger, not tiles.** Eating · Skipping · Not sure sit in one hairline-bordered row with dividers, like a register. After 10:30 the row switches to *Locked* variants and a walk-in message replaces the prompt.
- **Editorial menu.** Dish names in Instrument Serif. FSSAI-style veg/non-veg/egg marks, which students already recognise. Specials get a dotted leader to a "Special" label, as on a menu board. No cards.
- **Pass lifecycle as component states.** Available → hold-to-redeem sheet (1.5 s hold, not a tap) → Live (rotating 4-character code, QR, 60 s ring) → Redeemed (rotated curry-leaf stamp). Offline shows the last valid code with its timestamp.
- **Instruments, not infographics.** The crowd meter is 12 rising ticks. Stats are separated by hairlines, not boxes. Charts use ink bars with a single turmeric "now" bar.
- **Privacy as a visible promise.** The `Privacy Note` component sits on every tracker screen. The `ID Fallback` component sits on every pass/QR screen. QR tokens stay dark-on-light in Dark mode so scanners keep working.
- **Voice.** Warm and specific: "Thanks for saying so. The kitchen will cook for one less, and you still get your 5 points." / "Suspiciously peaceful."

## Where the wireframe was changed, and why

| Wireframe | Now | Why |
| --- | --- | --- |
| 2×2 tile grid + quick-action row on Home | Greeting → meal-intent ledger → menu board → pass stub → crowd line → one impact line | One primary job per screen (answer by 10:30); removes the templated grid |
| Food-waste section (3 screens, kg charts) | One positive line on Home | Rule 7 |
| Community feed with names, avatars, comments, "Add a post" | Anonymous issues, "I faced this too" once per student, public at 3 reports | Rule 3 |
| Issue statuses Resolved / In progress / Escalated | Reported → Verified → Action taken → Student recheck → Resolved timeline, plus a Recheck screen | Rule 4 |
| Free-text "Request a menu change" + open voting | Replace-from-approved-alternatives form, 150-supporter threshold, committee review, final vote on Home (30% turnout, 60% yes, results hidden until close), one-cycle trial | Rule 5 |
| "Hold to redeem" as a button tap | Press-and-hold control inside a native sheet, plus the SRM ID fallback | Irreversible action; the app is never required to eat |
| Rewards: Extra dessert / merchandise / priority slot | Extra fruit, Fresh juice, Ice cream, Priority menu-vote access, monthly badge; points for answering (eating = skipping) | Rule 6 |
| Outside-food tracker in the profile list | Private tracker with lock line, Face ID option, log-on-skip in the Skip sheet | Rule 2 |
| Attendance "Absent" in red | "Missed · no answer" in a neutral tone | Never policing |
| Separate Crowd tile | Crowd line on Home + Live crowd screen with an hourly chart and "usually quieter after 1:30" | Useful, calm |

## QA (checked by script in the file)

- 0 unbound solid paints across Screens, States and Components (~1,850 paints on Screens alone). All colour goes through Semantic variables; spacing and radii are bound to Layout variables inside components.
- 0 detached instances, 0 hidden layers outside instance property toggles. 533 component instances on the Light page.
- Hit targets ≥ 44 pt on buttons, rows, nav, tabs, close and stars (52). Choice chips are 40 pt with a 4 pt gap (documented).
- `ID Fallback` on all 8 pass/QR screens. `Privacy Note` on all 4 tracker screens (Skip sheet, Tracker, Add expense, Empty tracker).
- Community screens contain no names, avatars, comments or posts.
- Contrast (WCAG 2.1): text/primary 15.6:1; text/secondary 6.6:1; text/tertiary 4.9:1 (ink-3 is 3.25:1, so a darker `ink-3-text` was added); action label 7.3:1; `status/danger-text` 5.9:1 (chilli is 4.39:1 on paper, so text uses `chilli-deep`); turmeric-deep 5.3:1. Dark: bone 15.5:1, bone-2 8.8:1, bone-3 5.0:1, curry-leaf-dark 8.3:1.

## What the tools couldn't do

- **SF Pro didn't render** in the cloud renderer: text measured 0 px wide, and SF Symbol glyphs from `getSfSymbolCharacter` came out blank. All `iOS/*`, `Numeric/*` and `AX3/*` styles use **Inter as a stand-in** with the exact SF sizes, line heights and tracking. The style descriptions record the spec. With SF Pro installed, switch the family on those styles and every screen re-measures.
- **Icons** are hand-drawn SVGs in one Icon component set. The variant names are the exact SF Symbol names, so they map 1:1 to `Image(systemName:)`. A free-text property wasn't practical because the glyphs can't render here; you pick the symbol from a dropdown instead.
- **SF Mono** isn't available: the `Mono/*` styles use Geist Mono.
- **Tabular figures** can't be set through the plugin API. Use `.monospacedDigit()` in code, or turn on "tnum" on the Numeric styles.
- **Photography**: no network access to image sources. Food photos are a `Photo` component (warm soft fill, grain, thali-rim motif, caption as alt text) to replace.
- Instance child position and size overrides aren't writable here. The Progress Meter is therefore a variant set (Value in 5% steps × Threshold 30/60) with scale constraints.
- Dark mode is applied per section (explicit variable mode) rather than as a document-level switch.
- Moodboard page was empty, so the five "crafted" observations on 01 Foundations come from the brief's reference objects.
