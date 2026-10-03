# Stage 6 · Pass exception, Staff access, Give access (run 2)

Start `st147` (= `st146`), end `st148`. Archive on 99 Archive, links stripped:
- slot 44: AD-6b;
- slots 45–47: AD-7b Person — Ravi (Success, changed, Offline).

## (a) AD-6b · Pass exception (page 10, AD-6 row, y 6552)

| State | Id | x | DecisionActions |
|---|---|---|---|
| Open | 957:89611 (rebuilt in place) | 1419 | Open: **Approve reissue** / Decline |
| Declining | 1389:106206 | 5676 | Declining (reason required; Decline turns on once a reason is entered) |
| Sending | 1389:106361 | 6149 | Approving |
| Approved | 1389:106513 | 6622 | Approved: "Reissue approved 1:42 PM · valid Wed 21 Aug" |
| Failed | 1389:106661 | 7095 | Approve failed: "Didn't approve. Try again." |

- **Question hero:** "Pass exception · Main Mess ›", "Reissue Karan's pass / for next Wednesday?", "•••0733 · desk offline 12:41 PM". It holds two **CouponCard** tickets with a down arrow between them:
  - **Wed 14 Aug · Missed:** dashed outline, no fill, Tag `Lapsed`, "Expired unused 2:00 PM".
  - **Wed 21 Aug · New pass:** lime, Tag `Sent`, "Biryani coupon · 12–2 PM".
  - The points stub is hidden on both.
- **White card "What happened":** AuditRow rail with 12:41 PM "Desk offline · pass refused" (Incident) and 2:00 PM "Pass expired unused" (Pending).
- **Note:** "A reissue is for next Wednesday. Today's meal isn't restored."
- **Links:**
  - Open: Approve reissue → Sending, Decline → Declining.
  - Declining: Approve reissue → Sending.
  - Sending → after 1.2 s → Approved.
  - Failed: Try again → Sending.
  - Failed is an error state with no inbound link (intentional).
  - Inbound links (AD-6a row, AD-1c decision) are kept.
- **Component change (page 03, flagged):** CouponCard variants now resize. Card and Body stretch; the notches, perforation and stub are anchored right. At 353 pt nothing moves (AD-6c Rewards is unchanged).

## (b) AD-7b · Staff access — Ravi (replaces the person screen)

| State | Id | x |
|---|---|---|
| Request | 1015:7377 (in place) | 2838 |
| Changed | 1015:7471 (in place) | 3784 |
| Offline | 1015:7565 (in place) | 3311 |
| Sending | 1391:12667 | 7568 |
| Saved | 1391:12812 | 8041 |
| Failed | 1391:12956 | 8514 |

- **Black person card:**
  - avatar "R", **Ravi**, mono •••4417;
  - chips: role "Kitchen staff" and dashed "Asked 10:52 AM";
  - "Main Mess · permissions apply here only".
- **White card of four SettingsRow switches:**
  - Kitchen staff on;
  - **Attendance scanner**, asked: lime fill, dashed ink outline, detail "Asked 10:52 AM", switch shown on as the proposal;
  - Special-pass checker off;
  - Supervisor off.
- **Reason (required):** FormField, helper "Logged with the change". Then **DecisionActions** Open: **Approve access** / **Decline**.
- **Changed:** Special-pass checker flipped on, and the primary reads **Save changes**.
- **Rules pill** → AD-7b Rules sheet (already reads "Nobody edits their own permissions", "The last admin can't be removed").
- **Sending:** Approving. **Saved:** "Access approved 1:42 PM · Attendance scanner on"; the row shows "Approved 1:42 PM" and the Asked chip is gone. **Failed:** Try again.
- **Offline:** banner "Offline · saved 1:38 PM", DecisionActions `Offline` ("Approvals need a connection").
- **Links:**
  - Request: Special-pass toggle ↔ Changed;
  - Approve access / Save changes → Sending → 1.2 s → Saved;
  - Decline → Staff list;
  - Failed: Try again → Sending.
- **Staff list (Success, Offline):** Ravi's role now reads Kitchen staff, matching the new switches.

## (c) AD-7a · Give access

- **"＋ Give access" pill** (MetaChip Tappable, plus icon) next to the scope chip on People Success, Empty and Offline. Offline has no link.
- **AD-7a · Give access sheet** (`1393:12947`, x 5203, y 9828): GlassSheet Large "Give access to", SearchField "Search staff", rows:
  - Ravi → his Staff access (Request);
  - Suresh → AD-7c Suresh;
  - Lakshmi → **AD-7b · Staff access — Lakshmi (Give)** (`1393:12790`, x 8987);
  - Meena (no link);
  - See all · 38 → Staff list.
  Close and tap-outside → People.
- **Lakshmi (Give):** nothing highlighted. Kitchen staff on, the rest off, Reason field, Save changes / **Cancel** → People.

## Decisions and conflicts (logged)

- **"Six staff rows" vs "invent no new people" (rule wins):** only four staff exist in the file (Ravi, Suresh, Lakshmi, Meena). The sheet shows four rows plus "See all · 38". Meena's line uses her known task ("Logs plate waste · Main Mess").
- **Ravi's role:** he was Supervisor on the Staff list; the brief's switches make him Kitchen staff, and the Staff list was updated.
- **Pending asks:** AD-7a still says "2 access requests · Suresh · Lakshmi", which doesn't count Ravi's 10:52 AM ask (gap 296).
- **Reason field:** shown empty on Request and Changed, with Approve still enabled so the prototype can continue. It is filled in on Sending, Saved and Failed.
- **Remove access:** the old button is gone (not in the brief), so the Remove access sheet `1021:6400` is now unreachable (gap 297).
- **AD-6b time order:** Approved at 1:42 PM (brief) is earlier than the 2:00 PM expiry on the same card (gap 295).
- **Initials:** single letters ("R", "L"), so no surname is invented.
