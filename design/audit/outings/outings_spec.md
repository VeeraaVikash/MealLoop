# Outings · Outing Pass module · spec (run OUTINGS, 2026-10-13)

## How this spec was made

The run brief arrived **cut off** after "lime as the primary action on black, the current step, Success status, filled arcs and bars". Its stage list, screen list and the phone sketches it refers to ("drawn on a 300 px phone at 11 to 12 px") never arrived, and neither the repo nor the Figma file holds any Outings material. The brief also says nobody can answer questions. **Decision:** design the module from what did arrive — the five roles, pages 13 / 14 / 15, the three new flow starts, the You row, the readability and brand rules — and from the app's existing patterns. Every choice below is a decision, logged so it can be checked against the sketches later.

## Roles and pages

| Role | Page | Flow start | Shell |
|---|---|---|---|
| Student (Aarav ·0238, Block A) | 04 source → 05 Dark twin → 07 prototype | none new (reached from You → Outings) | the student app: wash, inline NavHeader with the BackButton, TabBar (You selected) |
| Guardian (Rajesh Sharma, father) | **13 Guardian** | **Guardian · Sign in** | light; StaffTabBar (Home, Alerts, Me) |
| Warden (Mr. Senthil, Block A) | **14 Warden** | **Warden · Sign in** | light; StaffTabBar |
| Gate (Murugan, Main gate) | **15 Gate** | **Gate · Sign in** | staff style: primary text 17 pt+, targets 56 pt, full-screen results like MS-A2 |
| Hostel administrator (Dr. Meena, chief warden) | **12 Hostel Admin** | none (the brief adds exactly three starts) | light; read-only overview, no tab bar |

**Decisions:** flow-start names use the file's " · " separator ("Guardian · Sign in"), as with every other start. The hostel administrator gets page 12 without a start, because the brief allows exactly three new starts; present it from its first frame.

## The rule set (sample policy)

- Every outing needs the **guardian**, then the **warden**. Then the pass is ready. (One chain for every outing keeps the demo to one path.)
- Two kinds: **Day outing** (back the same day) and **Overnight** (home leave).
- Back by **9:00 PM** curfew on any day; a student still out after the "back by" time is **late**; warden and guardian are told.
- The pass is shown at the gate: **scan out**, **scan in**. It works offline (code stored on the phone).
- Status words (StatusPill vocabulary): Sent (waiting), Success (approved, back in), Stop (declined, not allowed), Hold (late), Offline.

## Sample data (all sample, logged)

| Item | Value |
|---|---|
| Student | Aarav Sharma ·0238 · Block A · Room 312 |
| Guardian | Rajesh Sharma (father) · +91 ••••• •2210 |
| Warden | Mr. Senthil · Block A · 412 students |
| Gate | Murugan · Main gate |
| Hostel admin | Dr. Meena · Chief warden · 4 blocks |
| The demo outing | Day outing · Sat 17 Aug · out 10:00 AM · back by 7:00 PM · T. Nagar, Chennai · "Shopping with my cousin" |
| Times in the walk | asked Wed 14 Aug 8:12 PM · guardian approved 8:20 PM · warden approved 9:05 PM · scanned out Sat 10:04 AM · back in 6:42 PM |
| Past outing | Overnight · Fri 9 Aug 5:00 PM → Sun 11 Aug 7:00 PM · Home, Coimbatore · back 6:15 PM |
| Pass code | OP-7K2Q |
| Warden today | 6 waiting · 37 out now · 2 late |
| Gate today | 128 out · 91 back in |
| Hostel admin, this week | 1,148 outings · 236 out now · 14 late (1.2%) · 22 min median approval |

## Screens

### Student (04, 05 Dark, 07 prototype)

| # | Frame | What it shows |
|---|---|---|
| — | You (+ Offline, + full-scroll copies) | **one new row "Outings"** at the top of the settings card. Nothing else changes. |
| S1 | Outings | Black hero: the next outing and its state; primary "New outing" (lime on black). Below: "Your outings" list (OutingRow) |
| S2 | Outings (Empty) | EmptyState + New outing |
| S3 | Outings (Offline) | OfflineBanner; the saved pass still opens |
| S4 | New outing | Kind (segmented), date, out time, back by, where, why (FormFields); Next |
| S5 | New outing · Check | The summary, who approves (guardian, then warden), Send |
| S6 | New outing · Sending | the same, Sending button |
| S7 | New outing · Failed | InlineError, Try again |
| S8 | Outing · Sent | progress rail: Sent ✓ → Guardian (current) → Warden → Pass |
| S9 | Outing · Waiting for warden | guardian approved 8:20 PM; warden current |
| S10 | Outing · Declined | warden declined with the reason; Plan another |
| S11 | Outing pass · Ready | the **OutingPass** ticket (Ready): QR, code, out / back-by times, "Show this at the gate" |
| S12 | Outing pass · Out | pass (Out): scanned out 10:04 AM, back by 7:00 PM |
| S13 | Outing pass · Late | pass (Late) after 7:00 PM; "Tell the warden" |
| S14 | Outing pass · Late notice sent | Toast; the warden and guardian were told |
| S15 | Outing · Back in | completed: back in 6:42 PM; the outing joins the list |

### Guardian (13)

G0 Sign in → G0b Verify code → G1 Home (a request waits: black hero with Approve) → G2 Request (detail; Approve / Decline) → G3 Approved (sent to the warden) · G3b Decline (reason) → G3c Declined · G4 Home · Aarav is out (live) · G5 Alerts (scanned out, back in, late) · G6 Me.

### Warden (14)

W0 Sign in → W1 Today (hero: 6 waiting; Out now 37; Late 2) → W2 Requests (list) → W3 Request (guardian approved ✓; Approve / Decline) → W4 Approved · W5 Out now · W6 Late (call guardian / student) · W7 Student (record).

### Gate (15)

GA0 Sign in → GA1 Home (Scan out / Scan in, counts) → GA2 Scan → GA3 Go out (lime result, like MS-A2) · GA4 Welcome back · GA5 Not allowed (Stop) · GA6 Late back (Hold, warden told) · GA7 Check ID (when the QR fails) · GA8 Offline (saved, sends later).

### Hostel administrator (12)

HA1 Overview (week numbers, out now by block) · HA2 Late returns · HA3 Rules (curfew, approval chain, kinds).

## Components (page 03, new)

- **OutingPass** — the student's pass as a ticket. Variants State = Ready, Out, Late, Back. White ticket with notches (a ticket, so a lime status band is allowed), QR zone, code in mono, out / back-by times.
- **OutingRow** — one outing in a list: title, when, a StatusPill, chevron; 64 pt tall.

Everything else reuses existing components: StatusBar, HomeIndicator, NavHeader, GlassButton (BackButton), TabBar, StaffTabBar, Button, FormField, SegmentedControl, TimelineStep, StatusPill, SettingsRow, EmptyState, OfflineBanner, InlineError, Toast, BentoTile, OnboardingPage (sign in).

## Prototype

Approved flow starts after this run (10): Student · Sign in, Mess staff · Sign in, Admin · Sign in, Admin · Today, Admin · Issues, Admin · Insights, Admin · Manage, **Guardian · Sign in, Warden · Sign in, Gate · Sign in**.
