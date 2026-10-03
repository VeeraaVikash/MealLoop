# Unattended run 2 · final report (2026-10-03)

Branch `claude/mealloop-ios-design-e9n1n5`. Each stage opened with a full-walk snapshot that matched the previous end state (Stage 9 is the exception, noted below), and was rendered, committed and pushed, with a row in `run_status.md`. No stage hit a STOP condition, and no push failed.

## Stages

| Stage | Result | Snapshots | Commit | Main changes |
|---|---|---|---|---|
| 0 Preflight | done | st139 = st138 | 4c02f50 | ids checked, push dry-run OK |
| 1 Gaps 274–280 | skipped | — | — | already closed in 4C |
| 2 Label pass | done | → st140 | 5e30130 | 32 label rules on 04/05/07/09/10 |
| 3 Student mechanical | done | st141 = st140 → st142 | a571f22 | gap 52 (9 screens scroll), gap 77 (8 dinner answer frames × 3 pages, wired), gap 92 (already wired), gap 105 (28 weekly charts → ChartBar) |
| 4 AD-4c Waste | done | st143 → st144 | 19a1f07 | mirrored waste/shortage chart, Empty, Offline |
| 5 Issues views | done | st145 → st146 | 008a910 | Dishes and Community rebuilt, plus Empty and Offline for each |
| 6 AD-6b / AD-7b / AD-7a | done | st147 → st148 | bbc99c7 | pass exception (5 states), Staff access (6 states), Give access pill + picker sheet |
| 7 Surplus oversight | done | st149 → st150 | 76fb2d8 | Offered / Accepted / Collected / Late with a 3-step track; Log pickup removed |
| 8 Small admin fixes | done | st151 → st152 | 4ed5528 | Biryani coupon, bells hidden, page 11 renamed, hub Empty People, 99 starts removed |
| 9 Me too (gap 76) | done | st152 → st153 | 745dbd5 | 4 states × 3 pages, wired on 07 |
| 10 Admin tab bar (gap 119) | done | st154 → st155 | 037044b | 456 tab links on 115 screens |
| 11 Linking | done | st156 → st157 | 9768e30 | sign-in for staff and admin, page 09 wired (71 links), reachability, DEMO.md |
| 12 Audit | done (report only) | st158 = st157 | 5b95493 | final_audit/ |
| 13 Report | done | — | this commit | this file |

**Link totals:** 07 1,229 → 1,366; 09 0 → 71; 10 365 → 895.

**Flow starts:**
- 07: 25 → 26.
- 09: 0 → 3.
- 10: the approved 4 plus Admin · Sign in.
- 99: 2 → 0.

## Decisions made without asking

1. **Gap 52:** the scroll treatment went on page 07 only, since 04 and 05 are static design pages (Waste-fix precedent). The 7 sheet backgrounds were left at rest.
2. **Gap 77:** added No · Saved and Not sure Sending / Saved (beyond the five in the brief) so every answer stays in Meals.
3. **AD-4c:** dropped the period chips. Captions use ↑ / ↓ arrows and the typographic minus.
4. **Issues Community:** used a Button pair instead of HeroActions, which clipped "Compare and merge". "See reports" and "Review fix" both go to AD-3c; "Not now" has no link.
5. **AD-6b:** made CouponCard resizable (constraints only) so the tickets fit the hero. Shortened the ticket facts.
6. **AD-7b:**
   - reused DecisionActions for Approve access / Decline;
   - the asked switch is shown on (the proposal);
   - Decline → Staff list;
   - the Reason field is empty on Request, with Approve still enabled;
   - Ravi's Staff list role is now Kitchen staff;
   - Remove access was dropped.
7. **AD-7a:** the picker's rows go to Ravi's Request, Suresh's AD-7c, and Lakshmi (Give). Meena has no link.
8. **AD-6d:** the existing Success became the Accepted state, and Call Ravi has no link (phone).
9. **Me too:** the Backed state uses a black pill with a white outline (brief), not the component's lime.
10. **Admin tabs:** Empty and Offline frames go to the Success roots. Self-links were skipped.
11. **Staff prototype:**
    - a tap on the top bar returns to MS-E (no back control exists);
    - End shift is wired only where a confirm dialog exists;
    - extra starts were added for the Entry scanner and Pass desk roles.
12. **Sign-in profiles:** single-letter initials ("R"), "DR" for Devi (her header avatar). Student-only lines were hidden.

## Conflicts between briefs and rules (rule followed)

| Brief | Rule | Outcome |
|---|---|---|
| Community "Open · 5" with IssueCard, "do not restyle it" | lime only as the wash, the logo, actions or one data highlight per page | The current-step segment was overridden to ink on the 5 admin card instances; the component is unchanged (gap 292) |
| AD-7a picker: "six staff rows" | invent no new people | 4 existing staff (Ravi, Suresh, Lakshmi, Meena) + "See all · 38" |
| Student edits: page 04 is the source | scroll treatment is prototype-only (precedent) | Gap 52 applied on 07 only |
| AD-6b Approved "1:42 PM" | (consistency) | Kept the brief's time; it is earlier than the 2:00 PM expiry on the same card (gap 295) |
| Stage 12 "report only" | new frames need Moment + sample | The 6 sign-in frames from Stage 11 lack them; reported, not fixed (gap 305) |

**Process note:** Stage 9 had no separate start snapshot. Its end diff against Stage 8's end (st152) showed only Stage 9's own changes.

## New gaps

| # | Summary |
|---|---|
| 288 | 07 lunch Meal detail copies have only the Crowd content link |
| 289 | 04/05 dinner Track has no design-page link |
| 290 | Dinner Meal detail Back unlinked on the source |
| 291 | AD-4a Offline banner time 1:38 vs 2:32 |
| 292 | IssueCard current-step lime in lists |
| 293 | IssueCard "UPDATED …" mono words |
| 294 | Rice / Paneer / Curd rows and "Not now" have no destination |
| 295 | AD-6b approval time before expiry |
| 296 | "2 access requests" misses Ravi's ask |
| 297 | Remove access sheet unreachable |
| 298 | Meena has no Staff access frame |
| 299 | AD-6d2 calls Ravi "kitchen supervisor" |
| 300 | Surplus states reachable only by gallery |
| 301 | Staff screens have no home/back control |
| 302 | Admin Empty / Offline families have no gallery |
| 303 | Ravi's role differs between 09 and 10 |
| 304 | Lunch cutoff: 9 AM (student) vs 11:30 (admin) |
| 305 | Sign-in rows missing Moment / sample |
| 306 | Words in mono (~175 screens) |
| 307 | 186 dead chevrons on 07 |

**Closed:** 52 (screens), 76, 77, 92, 105, 119, 286, 287.

## New sample numbers (all logged as sample)

- **Waste view:** −13% waste (742 → 642 kg), −1 shortage a week (3 → 2). The ghost medians, 699 kg and 2.5, set heights only.
- **Dishes:** complaints 6 / 4 / 3 / 2 of 712 entered; "Salt cut by a third · recheck Fri lunch".
- **Community:** "81 students in all" (3 long-wait reports); More breakfast options "UPDATED 1D AGO"; owners Ravi / Devi.
- **Pass exception:** Karan •••0733, desk offline 12:41 PM, expired unused 2:00 PM, reissue approved 1:42 PM, valid Wed 21 Aug.
- **Staff access:** Ravi asked 10:52 AM; approved 1:42 PM; reason "Covers the evening scanner shift".
- **Surplus:** offered 2:10 PM, accepted 2:14 PM, collected 3:05 PM, due 3:00 PM.
- **Me too:** 112 → 113.
- **Dinner answers:** "Change till 6 PM", "we'll ask again at 4:30" (from the Home flow).
- **Offline banners:** Issues and Manage "saved 1:38 PM", Insights "saved 2:32 PM".

## Components

- **Added:** none.
- **Changed (flagged):** CouponCard. Its variants' constraints now stretch the card and body and anchor the notches, perforation and stub to the right. There is no visual change at 353 pt.
- **Reused:** ChartBar (Pill, Pill lime, Pill ghost, Expected, On target, Gap), HeroActions, Button, DecisionActions, CouponCard, AuditRow, SettingsRow, FormField, IssueCard, IntentChoice, IssueHero, MetaChip, GlassSheet, SearchField, ListRow, ResultCard, OfflineBanner, EmptyState.

## Screens that still feel heavy or sparse

- **Heavy:**
  - AD-3a Community (5 tall IssueCards, content 1,467 pt);
  - AD-7b Staff by role (483 pt list);
  - Your plate · per-dish macros (868 pt list);
  - AD-6b Pass exception (hero 365 pt + timeline + decision; scrolls);
  - student Offline screens with two black blocks (banner + hero).
- **Sparse:**
  - Pass · Not eligible / Unavailable (26%);
  - You · Weekly view (29%);
  - Waste · Unavailable (31%);
  - Community · Hidden (41%);
  - staff result screens MS-A2–A5, B2, D3a (42–56%).
