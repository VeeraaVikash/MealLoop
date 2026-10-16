# Run FIX-2 · decisions and conflicts log

| # | Stage | Decision | Rule followed |
|---|---|---|---|
| 1 | R1 | The answered Home frame was named "Home" and already shows "You're in for breakfast". It is renamed **Home · You're in** on 04 and 07 rather than duplicated. Links point at frame IDs, so every link to it still works; text that still says "Home" means this frame. | Brief R1 names the frame; never duplicate. |
| 2 | R1 | Onboarding · Getting your details now moves on (after its timeout) to **Home · Not answered** instead of the answered Home (04 and 07). | Brief R1. |
| 3 | R1 | **Skip** on Home · Not answered, and on its Swipe revealed and Reminder fired variants, now opens **Home · Skipped**. It used to open the lunch "Why skipping" sheet, which did not match the breakfast card. I'm in → Home · You're in and Entry QR → Entry QR (Back returns) were already right. | Brief R1. |
| 4 | R1 | Page 04 is the design source and has no flow start, so none was added. The only student start is still **Student · Sign in** on 07 (on Onboarding · Sign in), and no Home frame has a start. Flow starts stay at 14. | "The count of flow starts on the student pages stays the same." |
