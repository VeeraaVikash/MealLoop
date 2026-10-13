# Run OUTINGS-FIX · final report (2026-10-13)

Seven-day New outing, a minimal Guardian, scrolling and completeness across the Outing Pass module. The run began in an earlier session, which finished Q0 and stopped at Q1 when Figma asked to sign in again (no Figma edit had been made). This session resumed at Q1 after the connector was re-authorized. Snapshots st256 → st273; every stage started equal to the previous end. **Flow starts: 10** throughout.

## Stages

| Stage | Result | Why / notes |
|---|---|---|
| Q0 Preflight | done (earlier session) | HEAD, push dry run, contract IDs, st255 = st254; scrolling method recorded; outing frame heights listed (preflight.md). |
| Q1 Docs and components | done | Weekday rule (draft), weekend pointer and clock sentence in design_intent.md; token `track`; DateChip Weekend / Past; RuleTag; ClockDial; OutingRibbon Weekday / Weekday 2–6 PM / Too soon and Weekend renames; RangeSlider ranges. ClockDial Medium needed 2 fix attempts. |
| Q2 Student New outing, all days | done | Mon–Sun frames on 04 / 05 / 07 replace the two-tile frames (archived); state frames follow the new header; 07 wired. One fix (DateChip text bindings). |
| Q3 Guardian rebuild | done | 30 frames on 13; the old 18 archived with links stripped; start moved to the new Sign in; full wiring with time skips. Two fixes (Messages bubbles; drag trigger needs Smart animate). |
| Q4 Scrolling audit | done | Frame-level scrolling on 34 tall frames; fades start 20 pt above the bar; four lists to ≥ 7 rows (12 new unused masked IDs); scroll_audit.md. |
| Q5 Completeness | done | Built AD-9b Policy (Empty), AD-9c Activation (Empty, Offline), the full-height Manage hub clone; weekday rule and Too soon on Policy and the Edit sheet; completeness.md. |
| Q6 Wiring and reachability | done | 17 links added where a destination exists; 0 dead ends; unreached frames are states; DEMO.md walkthroughs. |
| Q7 Checks | done (partly fixed) | 193 frames; lime > 3 fixed on 04 / 07, guardian target and lime, parity; 05 Dark lime and frames without lime left with reasons; checks.md. |
| Q8 Export and docs | done | 6 exports at true 2×; contract, gaps 370–380, STATE, MASTER_CONTEXT. |
| Q9 Final report | done | This file. |

## Decisions made without asking

1. **Resumed from a partial clone.** The session's checkout was 120 commits behind and the network slow; the run worked in a partial clone of the same branch and pushed there. The local repo folder was left untouched.
2. **Starts:** the brief's "ten approved plus the four admin tab starts" is the file's ten (the admin tab starts are among them) — kept exactly ten (Q0).
3. **Friday** uses Tuesday's 2–6 PM slider (the brief gave none).
4. **WeekStrip** reuses the student Menu DateStrip (letters M T W T F S S); no new component.
5. **Today** on the DateChip is the ink outline; its lime dot was hidden to keep the New outing form at three lime elements.
6. **New outing entry** opens on Sat (the cross-role sample); only Saturday's Send is wired (Sending / Sent / tracker exist for Saturday only).
7. **New outing states** (Offline, No guardian, Duplicate, Sending) keep their Friday moments, so their week strip shows Fri as today and Mon–Thu as past (dashed).
8. **Fit to one screen** by spacing only: content gap 10 → 8, ribbon padding 14 → 10 / 12 and gap 10 → 6, RuleTag padding 6, destination 48, Send 52 (the button token); type unchanged.
9. **Guardian:** Status · Declined and Status · Change asked added as the sheets' destinations; History, Notifications and Help reached from rows at the end of About; Withdraw approval only while the pass is unused; after leaving, only "Call the warden" remains; a right-half status-bar hit area gives the alternative endings (Not going, Back late).
10. **Guardian dials** on Status enlarged to 293 pt (one size for all states) to meet the fill floor; Verify code and Confirm link stay under it as accepted sparse pages.
11. **Lists to 7 rows** with unused masked IDs (·3471 ·5167 ·6832 ·7405 ·1356 ·2584 ·4093 ·8619 ·9026 ·3958 ·6714 ·1820), checked against every page; the Gate home tiles changed to 7 / 7 to match the lists they open.
12. **Student history** rows rewritten to match the guardian history (Sat 11 Oct … Sat 30 Aug), and 07 history rows open the matching tracker or pass.
13. **Parity:** You · Outings item spacing differed (16 on 04, 12 on 05 / 07); the 04 source wins.
14. **Exports** made from temporary ×2 clones (removed afterwards; proven by st272 = st271); About exported at full height.
15. **Process:** snapshots are taken with hidden instance children included (as `snapb` does); one early pass without it was overwritten.

## Brief vs rule (rule followed)

| Brief | Rule | Done |
|---|---|---|
| Tue / Thu: guardian by 9 AM, warden by 1 PM, "You'll know by Tue 1 PM" | The brief's own weekday rule (leave − 7 h, leave − 3 h, not before 8 AM) | Guardian by 8 AM, warden 8–11 AM, "You'll know by … 11 AM" (gap 370) |
| Guardian History and Notifications: six rows | Q4: lists that are the main content have at least 7 rows | 7 rows each |
| Separator " . " in labels and tags | File convention " · " | " · " |
| Today chip with a lime dot (the old Today) next to three other lime elements | At most three lime elements per frame | Today = outline only |

## New gaps

370–380 in prototype_gaps.md (OWNER 370, 371, 373, 374, 375; VISIBLE / review 372, 376, 377, 378; info 379, 380). Status updates: 365 (guardian drill-ins now have Back), 366 (fixed by frame-level scrolling).

## NEEDS REVIEW (by frame)

- 05 New outing · Mon … Sun, Offline, No guardian, Duplicate, Sending — 4–5 lime elements in Dark (action = lime) (gap 376).
- 07 New outing · Tue / Wed / Thu / Fri / Sun — Send is a preview, not wired; New outing · Sat → Sending jumps from Mon 1:40 PM to the story's Fri 6:00 PM (gap 377).
- 13 G-3 · Status · Declined and · Change asked — added states (gap 378).
- 13 G-2A · About this outing — carries the History / Notifications / Help rows (gap 378).
- 13 G-2 · Request · Overnight, · Weekday, · Offline — variant states, only the language pill is linked.
- 13 G-0 · Verify code, G-A2 · Confirm link — under the fill floor (gap 379).
- 15 GA-1, GA-7, GA-8 — 7 out / 7 overdue sample density (gap 380).
- 05 Emergency outing · Sent — ResultCard Hold tag 2.26:1 in Dark (existing gap 357).
- Frames with no lime element beyond the wash — list in checks.md (gap 372).

## OWNER decisions

1. The weekday rule, Friday, and the 8 AM floor (370).
2. The Tamil translation of messages and pages (371).
3. How much outing history a guardian sees (373).
4. Who may see exit and return times, and lateness (374).
5. The message channel: sender, link expiry, fallback, cost (375).
6. Still open from run OUTINGS: 356, 358–363, 364, 369.

## Reachability (Q6)

| Page | Reached | Not reached (all states shown by control) |
|---|---|---|
| 07 (outing frames) | all but the states | Outings · Empty / Not enabled; New outing · Offline / No guardian / Duplicate; Outing · Escalated / Changes requested; Outing pass · Overdue / Revoked / Expired unused |
| 10 AD-9 | every Success frame | Empty and Offline states; hub export clone |
| 13 | 26 / 30 | Request · Overnight, Weekday, Offline; Messages (reference) |
| 14 | 15 / 18 | Queue (Empty), Queue (Offline), Review window closed |
| 15 | 16 / 23 | GA-6 Already exited, Not valid, Pass withdrawn, Too early, Too late, Offline, Emergency exit recorded |

Dead ends: 0 on every page.
