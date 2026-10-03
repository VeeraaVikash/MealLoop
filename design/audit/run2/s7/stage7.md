# Stage 7 · Surplus oversight (run 2)

Start `st149` (= `st148`), end `st150`. Tool: `tools/sur7.js` (`mealloop/sur7`). Archive: AD-6d Success and Offline are on 99 Archive, slots 48–49, links stripped (two nested Back links found and removed after cloning).

| Frame | Id | x (y 6552) | Hero |
|---|---|---|---|
| AD-6d · Surplus (Accepted) | 957:90140 (was Success, in place) | 3311 | ResultCard Hold "Awaiting pickup", "Partner NGO · by 3:00 PM" |
| AD-6d · Surplus (Offered) | 1397:107618 | 7568 | Hold "Awaiting partner", "Partner NGO · offered 2:10 PM" |
| AD-6d · Surplus (Collected) | 1397:107742 | 8041 | Success "Collected", "Partner NGO · collected 3:05 PM" |
| AD-6d · Surplus (Late) | 1397:107874 | 8514 | Stop "Late", "Pickup is late · call Ravi" + lime **Call Ravi** (HeroActions primary; secondary hidden) |
| AD-6d · Surplus (Offline) | 957:90476 (in place) | 4257 | Offered state, under its banner |

- **"Log pickup" removed.** In its place: "Pickups are logged by the supervisor." (also added under the handover on AD-6d2 Success and Offline).
- **Three-step track** in the hero, replacing the dot progress. Each step has a dot and a label with its time under it:

| State | Offered | Accepted | Collected |
|---|---|---|---|
| Offered | ● 2:10 PM | lime, waiting | ○ by 3:00 PM |
| Accepted | ● 2:10 PM | ● 2:14 PM | lime, by 3:00 PM |
| Collected | ● 2:10 PM | ● 2:14 PM | ● 3:05 PM |
| Late | ● 2:10 PM | ● 2:14 PM | dashed lime ring, due 3:00 PM |

- **Dishes and quantities kept:** "4 dishes" in the hero, and "See dishes and steps" → AD-6d2 (Rice 7 kg, Sambar 4 L, Paneer butter masala 3 kg, Chapati 60 pcs).
- **AD-6d2:** the step "Pickup · by 3:00 PM" is renamed "Collected · by 3:00 PM". Both frames still meet R9b (last item 728 at max scroll).
- **Links:** the new states copy the dishes row → AD-6d2 and the scope chip → Scope sheet. "Call Ravi" is a phone action, so it has no link.
- **Logged:**
  - "Collected 3:05 PM" (brief) is 5 minutes after "by 3:00 PM".
  - AD-6d2 still calls Ravi "kitchen supervisor", while Stage 6 made him Kitchen staff (gap 299).
