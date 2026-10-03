# Stage 5 · Issues views (run 2)

Start `st145` (= `st144`), end `st146`. Tool: `tools/iss5.js` (`mealloop/iss5`, on `ins3a`). Archive: the 2A Success-only views are on 99 Archive, slots 42 and 43 (`1382:84`, `1382:304`), links stripped.

## Frames (page 10, AD-3 row, y 2184)

| Frame | Id | x |
|---|---|---|
| AD-3a · Issues — Dishes (Success) | 1312:98953 (rebuilt in place) | 4730 |
| AD-3a · Issues — Community (Success) | 1312:99107 (rebuilt in place) | 5203 |
| AD-3a · Issues — Dishes (Empty) | 1384:11731 | 9460 |
| AD-3a · Issues — Dishes (Offline) | 1384:11891 | 9933 |
| AD-3a · Issues — Community (Empty) | 1384:11814 | 10406 |
| AD-3a · Issues — Community (Offline) | 1384:11986 | 10879 |

Every frame has a label, a Moment note "Wed 1:40 PM" and the sample chip.

## Dishes

- **Question hero** (clone of the SOS hero):
  - "Dish · Main Mess ›", "Will the sambar / fix hold?", "Salt cut by a third · recheck Fri lunch";
  - HeroActions: lime **Review fix** → AD-3c, outlined **See reports** → AD-3c;
  - the phone icon is off.
- **White card** "Complaints this week" / "of 712 entered · dashed = fix on trial". Rows are ranked by count, and ChartBar bars use 24 pt per complaint (track 149 pt):

| Dish | Reason | Count | Bar |
|---|---|---|---|
| Sambar | Too salty · fix on trial | 6 | 144 pt, `Kind=Gap` (dashed) |
| Rice | Undercooked | 4 | 96 pt, `Kind=Expected` |
| Paneer butter masala | Too oily | 3 | 72 pt |
| Curd | Sour | 2 | 48 pt |

- **Sambar row** → AD-3c.
- **Content height:** 757 at rest, last item 728 at max scroll.

## Community

- **Question hero:** "Community · Main Mess ›", "Merge the 3 / long-wait reports?", "Look alike · 81 students in all", lime **Compare and merge** → AD-3d, outlined **Not now** (no link).
- **"Open · 5":** the student **IssueCard** (page 03 component, unchanged), with an owner line under each card:

| Card | Step | Students | Owner |
|---|---|---|---|
| Long wait at counter 3 after 1 PM | Seen | 64 | Ravi |
| Sambar too watery at dinner | Working on it | 38 | Ravi |
| Curd runs out by 8:45 PM | Sent | 21 | Devi |
| Rice undercooked on Mondays | Need more info | 17 | Ravi |
| More breakfast options | Seen | 112 | Devi |

- Each card → AD-3d.

## Empty and Offline

- **Empty:** centred EmptyState, one plain line each:
  - Dishes: "No dish complaints this week" (fork.knife);
  - Community: "No open community reports" (person.3).
  Each Empty zeroes its own count (SOS · 0 as on SOS Empty).
- **Offline:** banner "Offline · saved 1:38 PM".
  - **Dishes:** HeroActions `State=Offline`. Review fix → AD-3c Offline (read-only), Sambar row → AD-3c Offline.
  - **Community:** both buttons `State=Disabled`, and cards → AD-3d Offline.
- **Pills, state for state:** SOS ↔ Dishes ↔ Community within Success, Empty and Offline. SOS Empty and SOS Offline previously had no pill links; they now link to their Dishes and Community twins.

## Decisions and conflicts (logged)

- **Community actions:** the HeroActions buttons are fixed equal-width, so "Compare and merge" was clipped. The Community hero uses the same two **Button** instances (Primary / Secondary) in a row, with the primary filling and the secondary hugging. No new component.
- **Lime rule vs "do not restyle" (rule wins):**
  - The IssueCard's current-step segment is lime, which would make five data highlights on one page. On these admin instances only, the segment is overridden to `ink`; the component is unchanged.
  - The step stays readable from the status text and the n/4 counter.
- **Owner line:** IssueCard has no owner field. The line sits under each card (ML/Footnote, 16 pt inset), not inside it.
- **Owners:** only existing people, Ravi and Devi.
- **New sample values:**
  - "More breakfast options" card: UPDATED 1D AGO, Step Seen.
  - Eyebrows "Dish · Main Mess" and "Community · Main Mess".
  - "Not now" has no link (it dismisses the suggestion; there is no dismissed state).
