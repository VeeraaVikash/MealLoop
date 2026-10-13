# Run OUTINGS-FIX · Q0 Preflight (read-only)

- **HEAD:** `18d2fe8` (Outings O10: final report), fast-forwarded from the session's stale checkout (`e7459d7`, 97 behind). `git push --dry-run`: up to date. Identity repo-local: VeeraaVikash <veeraavikashs21@gmail.com>.
- **Node IDs from the contract:** `968:3292` → "AD-5-0 · Manage hub (Success)"; `1406:493` → "AD-0 · Sign in". Edit access proven by the snapshot write (plugin data `st255_*`).
- **Snapshot:** st255 (full walk, 17 pages) = st254 (O9 end): 0 differences on every page. 10 flow starts: Student · Sign in, Mess staff · Sign in, Admin · Today, Admin · Issues, Admin · Insights, Admin · Manage, Admin · Sign in, Guardian · Sign in, Warden · Sign in, Gate · Sign in.
- **Decision (starts):** the brief's "ten approved plus the four admin tab starts" — the file's ten already include the four admin tab starts (Today, Issues, Insights, Manage). Adding four more would duplicate them; the run keeps exactly these ten.

## Scrolling method used in the file (applied to every scrolling frame this run)

Taken from 07 "You", 10 AD-9a and 15 GA-1:

1. Frame `overflowDirection = VERTICAL`, `clipsContent = true`, no auto layout on the frame.
2. Child order, bottom to top: background (Meal wash, if a layer) → **content stack** (`… / Content`, vertical auto layout, **height HUG**, bottom padding 124 above a tab bar / 54 with no bar / 126 above a staff bottom action) → fixed chrome (Nav Header or Header, Top edge fade, Status Bar, Scroll edge fade, Tab Bar or bottom action, Home Indicator).
3. `numberOfFixedChildren` = the number of chrome layers at the top of the stack (the last children).
4. At maximum scroll the last content item ends 20 pt above the bar (bottom padding does it).

**Found in Q0:** the AD-9 frames are already VERTICAL with 5 fixed, but their content stacks are **FIXED height (629–670)** while the content reaches 712–1,836 pt, so the scroll range is the stack, not the content. Q4 sets those stacks to HUG.

## Outing frames: frame height vs content height ("need" = last visible item + stack bottom padding)

| Page | Frames | Taller than 852 (need) |
|---|---|---|
| 04 / 05 / 07 Student | 28 each, all 852, all static (NONE) | You · Outings 894; New outing · Offline 909, No guardian 962, Duplicate 989; Outing pass · Returned / Overdue / Revoked / Expired unused 898 |
| 10 AD-9 | 19, all 852, VERTICAL / 5 fixed (stack FIXED) | 9a ×3 (1,166–1,836), 9b ×3 (1,128–1,192), 9c 903, 9d Offline 872, 9e Success / Offline 958 / 1,022, 9g Success / Offline 1,019 / 1,083 |
| 13 Guardian | 18, all 852, static | Request · Approved 934, Withdraw approval (sheet) 934 |
| 14 Warden | 18, all 852, static (W-0 ×3 have no content stack) | Queue — Decide next 855, Approved 907, Ask / No (sheets) 900, Review request 951, Queue (Offline) 871, Review window closed 893, Escalated 1,010, Reassign / Emergency override (sheets) 957 |
| 15 Gate | 23, all 852; GA-1 VERTICAL / 2 fixed (stack HUG, content 894); the rest static (GA-0 ×3 and GA-6 results have no content stack) | GA-1 894 (already scrolls) |
