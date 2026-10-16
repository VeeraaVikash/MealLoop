# Guardian video approval: rules, wording and sample data

All data is sample. Sample outing: Aarav ••0238, Express Avenue Mall, Sat 17 Aug 2024, 2 to 8 PM, Shopping. Guardian number +91 98••• ••214. Warden: WB, Block B. Today is Wed 14 Aug 2024 for the app; the outing flow uses Fri 16 evening for the guardian reply (reply by Fri 11 PM) and Sat 12 PM for the warden decision.

## The flow
1. Guardian opens the SMS link (mobile web, OTP). First time: consent page (G00).
2. Choose: "I accept" (record a 10-second video) or "I reject" (one tap, optional reason chips, no video) (G01, G08).
3. Record (G02): live camera only (no upload, no gallery), front camera, 10 seconds maximum, minimum 4 seconds ("Too short, try again" under 4 s). A random 3-digit code and the phrase are shown: "I accept <student>'s outing. Code 4 7 2." A new code for every request and every try. Countdown ring. The page stores a server timestamp.
4. Check (server): speech-to-text in the chosen language (English, Tamil, Hindi first). The phrase and the code must match (tolerant of accent, strict on the 3 digits). Match -> sent to the warden as "Video, auto-checked".
5. No match: "We couldn't hear that" (G03), up to 3 tries. After the third: G04 "Send video to the warden": the last video goes as "Video, please watch" with no green checks.
6. Video cannot upload (camera works, network does not, after 2 upload retries): G05 "Take a photo of your face instead": live photo only, type "I accept <code>", enter the 6-digit code sent to the guardian's phone. Sent as "Photo and text, no video".
7. No working camera: the guardian cannot approve in the app. The request goes to Escalated; the warden phones the guardian and records "Confirmed by call".
8. NEVER text-only. The parent's face is always captured (video or photo) except the call path, which is recorded by the warden.
9. Sent (G06): "Sent to the warden." with the answer, method and time, Withdraw approval, Call the warden, Past answers (G07).

## What the warden sees (own block only)
Queue (closest deadline first, one card at a time): decide-by, student (name, masked ID, block, initials avatar), outing (day, times, place, reason), Guardian video block: thumbnail with play, "Live · 0:09" chip, transcript, three checks (Phrase, Code, Number), "Past answers: 3 by video". Method tag variants: "Live · 0:09" (auto-checked), "Please watch" (no checks), "Photo and text", "Confirmed by call". Actions: Approve (signs the pass), Ask (asks the guardian to change), No (rejects), Call the guardian.
Out now: count of students out from the block, due back by, late; rows by urgency (Late first, black chip), tap -> pass and gate times; Call.
Escalated: past deadline, "please watch" waiting, no camera (call needed).
History: own decisions with how the guardian answered (Video, Photo and text, Call, No video); videos kept 30 days, then only transcript and a fingerprint.
NOT visible: other blocks, meals, credits, spending, feedback, raw video after 30 days.

## Privacy and policy (OWNER items, shown as gaps)
- Recording a parent's face and voice needs SRM approval and a written retention period (draft 30 days; keep transcript and a fingerprint after deletion). Access: warden role only, audit-logged. Consent screen G00 on first use.
- Languages: English, Tamil, Hindi first; the phrase translations need a fluent writer. In frames, write only the single word on the language pill; other languages appear only on the language sheet as the three language names.
- Speech-to-text accuracy for Indian languages must be measured before relying on "auto-checked".
- "Cannot be manipulated" is not claimed: the random code, live-only capture, server timestamp and 10-second cap make a replay or an old video fail, but it is evidence, not proof.

## Student side
Outing tracker shows "Guardian approved by video · Fri 7:42 PM" (or "by photo and text", "by call"). A guardian reject shows "Your guardian said no" (no video detail). Notifications: "Guardian answered" with the circle style.

## Open items
Retention days; languages list; who verifies the guardian number (SRM source); whether the call path is allowed; gate offline fallback unchanged.
