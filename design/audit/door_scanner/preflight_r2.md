# DOOR-SCANNER pack v2 · D0 preflight (2026-10-17, read-only)

The brief was sent again with a new pack (18 images). The first DOOR-SCANNER run (D0–D9, report.md) was built from the 16-image pack. This pass rebuilds only what the new pack changes.

- **HEAD:** 40fe234 (DOOR-SCANNER D9) before this pass. `git push --dry-run`: up to date. Identity VeeraaVikash <veeraavikashs21@gmail.com>.
- **Snapshot:** st329 = st328 on all 18 pages (0 differences); flow starts 14 (page 09: **Mess staff · Sign in**). Taken in five calls (a ten-page call timed out at 60 s and was rolled back).
- **Pack:** design/reference/door_scanner_2026-10/ refreshed from the upload: README, spec, prompt, **18 images** (D01–D18) and 18 SVGs.

## What changed in the pack

| Item | Change | Effect on this pass |
|---|---|---|
| D01–D16 PNG / SVG | Byte changes only: the files now carry a signed content-credentials block (SVG `<metadata>`). Drawing elements, text and geometry are identical (6 changed lines per SVG, all metadata). | Nothing to rebuild; stages D1–D5 are **skipped** (already done from the same drawings). |
| D17_alerts (new) | Alerts: title + "Main Mess · Lunch"; one black SOS card (time line, title, place, outline status chip, lime "I'll go and check"); "Earlier" with three quiet rows (36 pt circle: lime check, ink bell, outlined clock; title; mono time right; one line). | D6: rebuild DS-8 Alerts. |
| D18_me (new) | Me: title; 68 pt SK avatar (lime initials on black); Door Scanner, Main Mess, lime chip with ink outline "On shift · since 11:40 AM"; two tiles Recorded in 714 / Problems reported 1; rows Switch role, Language (English), Help, Sign out. | D6: rebuild DS-8 Me. |
| Spec | New section "Alerts and Me (kept short)": at most three quiet rows, empty text "Nothing new. Alerts from your supervisor show here.", See all only when more than 3; Me with initials only. | D6. |
| Prompt | D0 counts 18 images; D6 adds the D17 / D18 rebuild, archiving the old Door Scanner Alerts and Me and removing their extra cards. | D6. |

## Door Scanner family on page 09 now (40 frames, 5 sections)

| Section | Frames |
|---|---|
| Door Scanner · Entry and password | 7 (role selection MS-1 shared, What you do, 5 password pages incl. 3 shared) |
| Door Scanner · Home | 8 |
| Door Scanner · Scan outcomes | 11 |
| Door Scanner · Report and lists | 6 |
| Door Scanner · SOS, Alerts and Me | 7 — of which **DS-8 · Alerts** (2476:4229), **DS-8 · Alerts — Empty** (2476:4385), **DS-8 · Me** (2476:4501) are replaced in this pass |

Shared with the other roles (unchanged): MS-0 Sign in, Verifying, Confirm profile; MS-1 Choose your role; the shared password pages for Pass Desk, Kitchen Staff, Supervisor; MS-E Alerts and MS-G Me (kitchen content, used by the other roles).

## Links into the frames being replaced

- DS-8 · Alerts ← Tab / Alerts on 17 Door Scanner frames, + the Empty page's simulated hotspot.
- DS-8 · Alerts — Empty ← Home — Before the meal (Tab / Alerts), + the Alerts page's simulated hotspot.
- DS-8 · Me ← Tab / Me on 20 Door Scanner frames.
