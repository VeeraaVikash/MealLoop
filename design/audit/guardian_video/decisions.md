# GUARDIAN-VIDEO · decisions made without asking

| # | Stage | Decision | Rule followed |
|---|---|---|---|
| 1 | V1 | EvidenceCard checks (Phrase, Code, Number) are ink-outlined circles with an ink check. W01 draws them lime; with the lime Live tag that is 4 lime elements. | Brand rule V2 (at most 3 lime elements). |
| 2 | V1 | The four lime viewfinder brackets on the recorder are one vector, so the recording screen has 3 lime elements: viewfinder, code digits, countdown ring. | Brand rule V2. |
| 3 | V1 | "REC" and "Code" are set in sans; only the digits (0:07, 4 7 2) are mono. G02 draws "REC 0:07" and "Code 4 7 2" fully in mono. | Mono only for numbers, times and units. |
| 4 | V1 | WardenTabBar4 has text-only tabs (as W01–W04 draw them) at 15 pt (17 pt Semibold when selected), not the 11 pt icon labels of the other tab bars. | Text never below 12; images. |
| 5 | V1 | OutNowRow and HistoryRow are 56 pt rows (W02 / W03 draw about 74 pt). | V5 rule: list rows 52 or 56. |
| 6 | V1 | MethodTag "No video" (guardian rejected) uses a quiet ink-secondary outline; the spec lists "No video" as the fifth tag. "Confirmed by call" and "Photo and text" are dashed (not a video). | Spec; images W03. |
| 7 | V2 | Guardian page titles use ML/Large Title 34 (the warden title size), so a heading has one size across Guardian and Warden. The old request page used 28. | V5 (5): same role, same size. |
| 8 | V2 | Guardian primary buttons are 64 pt (G00–G08 draw about 47 pt × 1.346); secondary actions are underlined text links in 44 pt hit areas. | Guardian primary buttons at least 56 pt. |
| 9 | V2 | The code is new for every try: 4 7 2 (try 1), 8 1 5 (try 2), 3 0 6 (try 3). Record · Try 2 and Try 3 frames show their own code. | Spec: a new code every try. |
| 10 | V2 | Prototype shortcuts for server outcomes (logged like earlier time skips): Uploading moves to Checking after 1.5 s, Checking to Sent after 1.5 s (a match). The status bar on Uploading opens Upload failed, on Checking opens Retry (no match), on Record · Ready opens Too dark, on Record · 0:07 opens Too short, on Before you record opens Camera blocked, on Choose opens Deadline passed (Fri 11:05 PM), on Sent opens G-3 Pass ready (Sat 12 PM). Record · Try 2 stops into Retry · try 3, Try 3 into Send video. | Every state reachable; one calendar. |
| 11 | V2 | Upload failed offers "Try again · 1 left" and "Take a photo instead"; the spec allows 2 upload retries before the photo. Photo and code shows the typed phrase "I accept 472" in sans (G05 draws it in mono). | Spec; mono only for numbers. |
| 12 | V2 | "Ask the warden to call me" (Camera blocked) opens **Sent · Call requested** ("The warden will call you"): the request goes to Escalated as No camera. There is no way to accept without a face or a call. | Never text-only. |
| 13 | V2 | Ask to change (sheet) sends to the kept G-3 · Status · Change asked. Reject sends to Sent · Rejected ("You said no. Aarav is told."). | Brief V2. |
| 14 | V2 | Already answered is reached from Past answers (opening the first answer again = the SMS link opened twice). Past answers also links Messages (G-5 Notifications) and Help (G-6) so they stay reachable; G-3 Change asked's status bar opens G-3 Not going (time skip). | No dead ends. |
| 15 | V2 | G-0 · Verify code now says "+91 98••• ••214" (the spec number). Sign-in still ends on Choose; Before you record shows on first accept. | One calendar; spec. |
| 16 | V2 | 16 frames archived to page 99 "Guardian · archived states" (guardian_video/archive_index.md). Kept from the old set: sign-in (5), G-3 Pass ready / Out / Back / Back late / Not going / Change asked, G-5, G-6, G-M. | Never delete. |
| 17 | V2 | The recorder camera is 340 pt tall (G02 draws about 404 pt) so the recording screen ends at 792, above the home indicator. | No overflow. |
