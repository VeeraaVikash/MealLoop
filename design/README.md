# MealLoop · iOS design (Lab)

Figma: https://www.figma.com/design/nzzTAm9YnJRSdKEeYUWUEb/MealLoop

| Page | Contents |
| --- | --- |
| 00 MoodBoard / 00 Before | References and the first version, kept for comparison |
| 01 Foundations | Lab colour tokens (Light/Dark), type, spacing, radii, glass recipe |
| 02 Mood Frames | Approved review frames: Home, Attendance, Special Meal Pass flow, Waste |
| 03 Components | 50+ components bound to variables, each with a usage note |
| 04 Student Light | Sections A–O plus Home by time of day, the three answer paths, the 3-hour recheck, lock screens, the comments sheet and full-scroll copies (273 screens) |
| 05 Student Dark | The same 273 screens in Dark mode, regenerated from 04 |
| 06 States & Accessibility | Section P: Accessibility XL (Home, Attendance, Pass live, Report step 1), Tamil length test (Translation pending), both in Light and Dark |
| 07 Prototype & QA | 21 prototype flows with starting points, plus the QA summary |
| 08 Voice & Patterns | Glossary, format rules, UX patterns and the Copy check table |

`tokens.json` is from the first (v1) system and is out of date. The source of truth is the variable collections in the Figma file.

## Direction: "Lab"

- Canvas #EDEDE8, white cards and #111 ink. Lime #D4F25A is a fill only: on light surfaces it always has a 1 px #111 outline and is never used for text. Numbers are set in mono.
- iOS 26 Liquid Glass is used only on the floating tab capsule, 44 pt nav circles, sheets and menus.
- Dark: canvas #0B0B0B, cards #161616, ink #F2F2EC.

## Rules the screens follow

- Instances only. Anything unknown gets an Open decision note, and the UI shows neutral placeholders such as "Cutoff: set by mess".
- Saved, Received, Redeemed, Checked in and Resolved appear only in server-confirmed states. Every submit has a sending state and a failed state with a retry, and a failed state never shows a receipt.
- Silence is "No response", never "No". Points never depend on attendance or reports.
- The Special Meal Pass works like this: Hold to Confirm records a single use, then Live Verification starts. It rotates colour and code, the clock ticks, and a countdown ends in Redeemed. A small fallback QR stays in the corner.

## Round 3 changes

- Lab rules everywhere: one black hero or big mono number per screen, no label/value tables (bento tiles instead), mono caps labels, a 4-step progress bar (done ink, current lime, pending hatched), lime only on the current thing.
- Realistic sample values in the UI (Aarav Sharma · RA2411003010238 · Main Mess, Block A; "Answer by 4 PM"; 120 pts). Notes about unknowns sit outside the frames.
- Plain status words: Sent → Seen → Working on it → Fixed, plus Need more info and Reopened.
- Home: new header with credits chip, compact tiles, slim crowd row, time-of-day variants. Collapsed hero after each answer, and a 3-hour recheck (lock screen, hero, inbox, settings toggle).
- Report: plain categories with examples; urgent categories skip to "Tell the counter staff now". Ticket receipt, My reports with progress bars.
- Redesigned: Menu, Dish detail (nutrition bento), Community, Crowd (dial hero, today-so-far chart), Dish feedback (2 steps), You (ID card + bento), Rewards.
- New components: StepBar, MetaChip, CreditsChip, BentoTile, HeroNumber, HomeHeader, CategoryRow, ReportSummary, ReportTicket, IssueCard, IssueHero, UpdateCard, CommentsRow, DishLine, MealRow, NutritionBento, CrowdLegend, SlotChart, FeelingChoice, RewardCard, IdentityCard, PointsRow, LockActions; MealHero gained In, Skipping, Not sure yet, In near meal, Recheck (×3), During meal and Day done.

## Round 4 changes

- Onboarding: one `OnboardingPage` template (ribbon art on top, bold text block below, fixed positions) for 16 screens: Welcome, 3 carousel pages, Sign in, Verifying, Confirm, the correction flow, All set and 4 errors. `OnboardingArt` rotates the ribbon a little per page. In dark mode, the `art-light` / `art-dark` variables swap in a "dark ribbon render needed" placeholder.
- Category icons: `CategoryIcon` (40 pt, radius 12) is the single icon per report category: triangle, nose, drop, fork and knife, people, ellipsis. ✕ is only for close.
- Home copy: "Hey Aarav", "You in for dinner?", "I'm in / Skip / Not sure" (the data is still Yes / No / Not sure), "Decide by 6 PM · 4h left", YOUR PASSES, crowd "Quiet / Getting busy / Packed" and "Mess is closed".
- Every Home frame shows one moment (7:00 AM, 12:30 PM, 2:00 PM, 4:30 PM, 6:30 PM, 7:00 PM or 10:00 PM), stated in a note under the frame. The dinner cutoff is 6 PM; the recheck at 4:30 PM comes before it.
- Picked: logo A "Plate loop" (`Logo` component, on onboarding Welcome) and background V2. `MealWash` (breakfast warm, lunch lime, dinner dusk; 18% in dark), dish photos in the Home hero (`MealHero` Show Photo), round thumbnails on menu rows (`DishLine` Show Photo) and a photo header on Dish detail (`DishHeaderPhoto`). Photos are labelled placeholders until real SRM mess photos exist.

## Consistency round (final)

- Page **08 Voice & Patterns** is the single source of truth: glossary, format rules, UX patterns and a Copy check table (old → new).
- V1 is final. There are no photo slots anywhere. One lime `MealWash` (#E9F7B0 → clear; dark #2A3312 → #111111) sits on every screen except onboarding, Entry QR, pass live and lock screens. Scrim is #111 at 40%. The dark canvas is #111111, and the dark hero is #1C1C1C with a border.
- All screens are 393 × 852. Long screens have a "(full scroll)" copy in section Z. Every frame's clock matches a "Moment" note under it.
- Shared patterns: the black ticket receipt (`ReportTicket`), inline error card + "Try again", centred EmptyState for empty and error, inline titles on pushed screens, the tab bar everywhere except flows and sheets, and the primary pill at the bottom.

## Fix round (answer selection, bottom edge, lock screen, comments)

- Meal answer: `MealHero` has a Selected property (I'm in / Skip / Not sure) × State Tap / Sending / Failed. The tapped pill is lime with a check. While sending, it shows a spinner and the other two pills are at 50%. On failure all pills go back to #F2F2EC and the line "Didn't save. Try again" shows. The saved card is a lime answer chip, then the line, then "Change till 6 PM" in mono, then Change. `IntentChoice` gained a Sending state.
- Bottom edge: a `ScrollEdgeFade` (canvas colour, 60 pt above the glass tab bar) sits on every tab screen. Screens without a tab bar keep 34 pt clear above the bottom.
- Lock screen: one `LockScreen` component (Single, Expanded, Stack, List, Saved) covers every lock frame. The wallpaper is a blurred, dimmed crop of the ribbon art. The glass notification (`LockNotification`) uses the Plate-loop app icon, and the long-press action group is `LockActions`. The same app icon and wording are used on the in-app inbox rows. Inter Bold stands in for SF Pro Display on the clock.
- Comments: a glass sheet sized to its content, with a close button, the line "Checked before they show. No names.", one white card of `CommentRow` rows (Visible / Hidden / Pending), and a sticky `CommentComposer`. There are frames for the large detent, the menu (`ContextMenu`), Typing (`Keyboard`), Sending, Pending, Failed, Reported and Empty. The Issue screen's "4 comments" row shows the newest visible comment.
- Prototype flows 16–21: lock-screen recheck (long press, then actions; Change opens the Home hero, and every other action shows a Saved banner), fix check, stack, and comments.

## Prototype (page 07)

The flows are: Sign in → Home · Intent Yes · Intent No + reason · Attendance · Special Meal Pass (While pressing to confirm, then Live 1→2→3 on a 3 s delay, then Redeemed) · Dish feedback → recheck · Report → receipt → timeline · Community → support · Spending add.

## Open decisions

- Sign-in provider. Access while a profile correction is pending, who reviews it, and the reply time. Contact route for students not linked to a mess.
- Meal cutoff times. Impact card only after staff measurement. Special Meal Pass eligibility and weeks. Crowd data source and freshness rule; whether to show a wait range.
- Who verifies nutrition and allergens. When dish rating opens. How menu changes are announced.
- How intent reasons are used and how long they are kept. Answer changes after the cutoff.
- SRM ID as the only offline entry route. Attendance correction window and reviewer.
- How counter staff know the live colour and code. Countdown length (60–90 s) and rotation interval.
- Feedback photos. Staff reply time.
- Report recipients and duty hours. Emergency numbers. Report photos. Acknowledgement target. Reopen policy.
- Minimum group size for support counts. Moderation and review time. Archive timing.
- Waste measurement method and cadence. Who can correct figures.
- Spending storage (server or device only). Category list.
- How points are earned and valued. Who sets offers and terms. How rewards are collected. Points disputes.
- Reminder timing. Whether safety-report updates can be turned off. Default quiet hours. Issue title on the lock screen.
- SRM fields on You. Profile corrections. Whether staff see who sent a report. Export and deletion scope. Help contact channel.
- Live pass at AX sizes (the code and ring stay fixed). Real Tamil copy (translation pending).
- Meal cutoff must be later than the 3-hour recheck (today dinner cutoff 4 PM is before the 4:30 PM recheck).
- Nutrition bar reference. "Usually quieter after 1:30 PM" needs real scan data. Scan timestamps for the slot chart.
- Urgent reports: photos, and whether anyone is alerted in real time. Category list and which ones are urgent.
- Point values and offer costs are sample. Who fills in a community issue's owner and next update. When Home switches to "during meal".

## Known limits

- SF Pro and SF Mono don't render in this environment, so Inter and JetBrains Mono stand in at SF sizes. Inter Display isn't available either, so the lock-screen clock uses Inter Bold.
- AX frames are detached copies with scaled text; the nav title and tab bar keep their instances. Build with Dynamic Type.
- The Tamil test uses "~" filler (+40%), not Tamil. It found that "Not sure" clips in the three-choice row.
- Figma prototypes can't animate the Live ring or tick the clock.
