# MealLoop · release checklist (brand audit D2, 2026-10-08)

Figma `nzzTAm9YnJRSdKEeYUWUEb`, state st240. Evidence links point into `design/audit/`.

## Pass / fail

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Exactly 7 flow starts (Student · Sign in; Mess staff · Sign in; Admin · Sign in, Today, Issues, Insights, Manage) | **Pass** | snapshot st240; final_audit/prototype_check.md |
| 2 | Every DEMO.md step links through in the file | **Pass** (91 / 91 hops) | final_audit/prototype_check.md |
| 3 | No reachability bug, no dead end | **Pass** (07 165 / 262, 09 66 / 77, 10 98 / 163; the rest are states) | prototype_check.md |
| 4 | Sending / Saving / Verifying frames advance | **Pass** (0 stall) | prototype_check.md |
| 5 | Every Back is the one BackButton; no tab root has a Back | **Pass** (staff-home demo Back accepted) | conformance.md, ios_checklist_final.md |
| 6 | Sheets have a grab handle and a way to close | **Pass** (Cancel / Not now sheets and two iOS alerts accepted) | conformance.md |
| 7 | Targets 44 pt (staff 56) | **Pass** (3 staff time skips accepted) | frame_checks.md |
| 8 | No real truncation; no text under 12 pt | **Pass** | frame_checks.md |
| 9 | Contrast 4.5:1 | **Fail** — 05 HoldToConfirm "Hold to use" 1.04:1 (gap 343); 10 AD-6b "Missed" and AD-3a Offline "Not now" 2.81:1 (gap 344); 05 Entry · Under review tag 2.26:1 (gap 345) | frame_checks.md, brand_rule_components.md, final_audit/a6_holdtoconfirm_dark_failed_05.png |
| 10 | Mono only for numbers, times, units and IDs | **Fail on 04 / 05** (1,165 / 1,229 words; 07 and 10 pass) (gap 342) | text_style_audit.md |
| 11 | Lime rule V2 | **Pass on screens** (0 lime text on white, 0 frames with 4+ lime elements outside the report thumbnails); **13 components** use lime on light outside the list (gap 346) | brand_rule_components.md |
| 12 | Fill floor 75% | **Open** — gap 330 (11 list screens) and gap 347 (You · Weekly view); exemptions per rules 9a / 9b | frame_checks.md |
| 13 | Colours bound to tokens; text on styles | **Pass** with logged exceptions (A2 / A3) | token_audit.md, text_style_audit.md |
| 14 | Every component described; zero-instance components retired | **Pass** (135 / 135; 5 in Deprecated) | component_hygiene.md, deprecations.md |
| 15 | Student parity 04 = 05 = 07 | **Partial** — 04 = 05 (Dark ribbon art aside); 07 has an extra Home tracker card (gap 348) and the mono fix | consistency.md |
| 16 | Key numbers consistent; Moment notes and sample chips present | **Pass** | consistency.md |
| 17 | Brand sheet present | **Pass** | final_audit/brand_sheet.png |
| 18 | iOS 27 system parts | **Not done** — no kit in the file | ios_checklist_final.md |
| 19 | Exports of the key screens | **Pass** (27 at 2×) | export/README.md |

## What the owner must do

1. **Create the three prototype links.** In Figma: Present → choose the flow start (Student · Sign in, then Mess staff · Sign in, then Admin · Sign in) → Share prototype. Use the iPhone 393 pt frame.
2. **Presentation-mode check.** Walk each link once on a phone or in Present mode with DEMO.md open: the timed hops (Verifying, Sending, Pass · Live, staff Pass check) and the hit areas only work in presentation, not on the canvas.
3. **Confirm the sample numbers with SRM.** Every screen says "All data is sample". Check the key numbers (2,360 diners, 196 / 214 passes, 642 kg waste, ₹5,000 budget, …) against real figures before showing them outside the team. 600 and 920 from the brief appear on no screen.
4. **Dark ribbon art.** The onboarding art shows a "DARK RIBBON RENDER NEEDED" placeholder in Dark mode (05 and the staff sign-in). Supply the dark render.
5. **iOS 27 kit.** Place one instance each of Status bar - iPhone 17 Pro, Home Indicator, Tab Bar - iPhone, Sheet - iPhone, Grabber, Button - Liquid Glass - Symbol, Alert and Action Sheet in a frame named "iOS 27 kit" on page 03. The swap (keep 393 pt, keep our tab bars on the iOS 27 glass) can then run.
6. **Decide the VISIBLE fixes** in final_audit/audit_summary.md, starting with the Dark HoldToConfirm (gap 343), the ink-secondary-on-black labels (gap 344) and the 04 / 05 mono words (gap 342).
