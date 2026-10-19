# design/audit/tools

Every tool is the body of `async function (figma, args)`. It is stored in the Figma file as shared plugin data under namespace `mealloop` (key = tool name) and run with:

```js
const T = new (Object.getPrototypeOf(async function(){}).constructor)('figma', 'args',
  figma.root.getSharedPluginData('mealloop', '<tool>'));
const result = await T(figma, { /* args */ });
```

Tools are kept in this folder as `.js` files. Some older ones exist only in the file (snaptool, wire7, reach8, trunc13, mw10, qc8, tgt14, read6).

## Audit tools (brand audit, 2026-10-08)

| Tool | What it does | Scope |
|---|---|---|
| `fa16.js` | **Part B per-frame driver.** Runs `fa1` on each phone frame, then adds: wash present, top-level lime elements, lime text on a light surface, contrast of every visible text in its own ML Color mode (4.5:1, or 3:1 for 18 pt+ or 14 pt+ bold), banned words, Back nodes and whether each is the GlassButton BackButton, tab bar, sheet (Scrim) with grab handle and Close, StatusTag instances, flow starts. Stores rows in `mealloop/<store>_<page>_<from>`. | Pages **04, 05, 07, 09, 10** (10 with its sections). Every 393 pt frame; a frame or section whose name contains "Deprecated" is skipped. Pages 99 and 11 are never passed in. |
| `fa1.js` | The original collector (fill, 20 pt clearance, small text, mono runs, lime count, horizontal overflow, tall non-hero cards, hero count, detached, raw paints, unstyled text, ListRow count, dead chevrons, Back destinations). Fill: bottom of the last visible item in the child named `…Content`, against the top of the Tab Bar, else the Footer, else frame height − 34. | Any page (frameIds) |
| `tgt14` (file) | 44 pt target check over **all layer names**: every visible node with a click / press / hover / drag reaction is measured, whatever it is called; the node that carries the link is the one measured. A node passes when its own "… hit area …" layer with the same destination is at least the minimum. `min: 56` for staff. | 07, 09 (56), 10 |
| `trunc13` (file) | Real truncation: each text with truncation on is re-laid out off-canvas and compared. | All phone pages |
| `mw10` (file) | Mono words (rule 13: mono only for numbers, times, units and IDs). The authority for mono counts; `fa1`'s mono runs are broader. | Pages or components |
| `tok15.js` | A2: raw-colour scan; binds a raw paint to a token only on an exact match for its role and mode. | 03, 04, 05, 07, 09, 10 |
| `txt15.js` | A3: unstyled text; applies a style only on an exact match. | same |
| `brand16.js` | A6: component-level lime, wash and contrast in Light and Dark. | page 03 components |
| `px15.js` | Render check: PNG export at scale 1, hashed (FNV-1a + length). Identical hashes mean identical pixels. | any nodes |
| `bs17.js` | A7 brand-sheet builder helpers (bound paints, text styles, instances). | page 03 |
| `hit14.js`, `ios13.js`, `an11.js`, `rb8.js`, `sb2.js` | Earlier runs: hit areas, iOS check, annotations, report builder, staff builder. | — |

## Fill and density, generalised (B1)

`fa1` no longer assumes page 10: it finds the content stack by the `…Content` suffix (`Admin / Content`, `Staff / Content`, `Content`) and the bar by name. `fa16` adds the page sweep and the exclusions above. The fill floor (75%) exemptions are applied when the tables are written, not in the tool:

- sheets (a visible Scrim);
- rule 9a states (empty, one message, loading, typing, error, offline one-liners, receipts, results);
- rule 9b (AD-2b);
- staff task frames are measured to the frame bottom − 34 by `fa1`; the rule's reference for them is the fixed bottom action, so they are listed with that note.

The old `filltool.js` and `densitytool.js` were page-10 only and are kept for history.

## Outings run tools (2026-10-13)

| Tool | What it does |
|---|---|
| `ouh.js` (`mealloop/ouh`) | bs17 plus icon (recoloured Symbol instance), pill (StatusPill), btn (Button), t (styled text), row, fill, dash, arc, `paint` (bound colour with the token's real value as base, so top-level fills never fall back to black) and `paintA` (bound colour with opacity; note: instances drop paint opacity, so dim tracks use layer opacity). |
| `oust.js` (`mealloop/oust`) | Student frame base (clone of 04 Help, scroll content stack), grid notes (label, Moment, Sample note cloned from 09), card, listRow, sheet. |
| `oustaff` / `ouadmin` (file only) | Staff base (large-title header or inline Back, StaffTabBar relabelled) and admin base (clone of AD-7a People). |
| `ou_rework` (file only) | The owner-reference rework applied by the same operation to 04, 05 and 07. |
| `snapb` (file only) | Runs snaptool over a list of pages and prints per-page differences, links and starts. |

## GUARDIAN-VIDEO run tools (2026-10-16)

| Tool | What it does |
|---|---|
| `gv1comp.js` | Summary of the V1 component builder (MethodTag, StepList, WardenTabBar4, OutNowRow, HistoryRow, PhraseCard, DecisionButtons, VideoRecorder, EvidenceCard on page 03; IDs in plugin data `mealloop/gv_ids`). |
| `gvh.js` (`mealloop/gvh`) | Helpers on top of `adm`: guardian and warden page bases (backdrop, logo row or WB header, WardenTabBar4), dark recording page, titles, links, notes, timers. |
| `gvarch.js` (`mealloop/gvarch`) | Archive to page 99 with links stripped and links on the source page retargeted; logs to `mealloop/gv_archive`. |
| `gvreach.js` (`mealloop/gvreach`) | Reachability for one page: reached / total, unreached, dead ends, dangling links. |
| `gvspace.js`, `gvfix.js` (`mealloop/gvspace`, `mealloop/gvfix`) | V5 spacing audit (margins, bands, gaps, paddings, rows, centre axes, title sizes, gate buttons) and the fixes (anchor, band, grow). |
| `gvchk.md` (`mealloop/gvchk`) | x9chk with a `pageId` argument (contrast, mono words, lime, backdrop, small text, targets, truncation, overflow). |
| `gvexp.js` (`mealloop/gvexp`) | 2× export clones for the plan in `mealloop/gv_export_plan`; `{from:0,to:0}` removes them. |

## DOOR-SCANNER run tools (2026-10-17)

| Tool | What it does |
|---|---|
| `dsh.js` (`mealloop/dsh`) | Helpers on top of `adm`: drawn icons (keyboard, torch, backspace, person check, QR, QR slash, shield check, pot, camera slash, check), camera brackets, ds component instances (`mealloop/ds_ids`), logo row with the SK avatar, code boxes, Door Scanner page base (StaffTabBar3), invisible hotspots, links, timers, "Simulated:" notes, toasts. |
| `dsb.js` (`mealloop/dsb`) | Page builders: sections on page 09, Home in three meal states, info cards, result pages with buttons at y 754 / 682; frame IDs in `mealloop/ds_frames`. |
| `ds1comp.md` | Summary of the D1 component builder (10 component sets on page 03). |
| `dschk` (plugin data only) | gvchk / x9chk on a list of frame IDs (`{ ids }`). |
| `dsspace` (plugin data only) | gvspace on a list of frame IDs; tolerates mixed corner radius and mixed font size. |
| `dsexp` (plugin data only) | gvexp reading `mealloop/ds_export_plan` (40 Door Scanner exports). |

## DOOR-SCANNER pack v2 tools (2026-10-17)

| Tool | What it does |
|---|---|
| `ds2comp.js` | D1 builder: SOSAlertCard (Not claimed / Claimed by you / Checked by you) and AlertRow (Done / Seen / Reminder / See all; Title, Time, Line) on page 03; IDs in `mealloop/ds_ids` (alertCard, alertRow). Run once. |
| `ds2b.js` (`mealloop/ds2b`) | Page builders on top of `dsb`: `sec2()` section "Door Scanner · Alerts and Me (pack v2)", `alerts(sec, name, x, {card, rows, seeAll, empty, back})`, `me(sec, name, x)`, `tabLinks(f, {Home, Alerts, Me})`, `fixChrome(f)` (keeps chrome and hotspots fixed). Frame IDs in `mealloop/ds_frames` (a2Sos, a2Claimed, a2Checked, a2During, a2After, a2All, a2Empty, me2). |
| `ds2_export_plan` (plugin data) | The 8 pack-v2 exports. The figma.com asset host is blocked here, so captures are taken with `get_screenshot` (base64) and the saved PNG copied. |

## PASS-DESK run tools (2026-10-17)

| Tool | What it does |
|---|---|
| `pd1comp.js` | Q1 builder: CodeCard, HomeKeypad, PassResultScreen (from ResultScreen), RequestRow, ShortageChips on page 03 (`mealloop/pd_ids`). Run once. |
| `pdb.js` (`mealloop/pdb`) | Page builders on top of `ds2b`: `psec`, `pbase`, `phome(sec, name, x, {state, kp, digits, count, offline, sos})`, `presult` (PassResultScreen pages, primary at y 754), `navCard`, `qrow`, `kp` / `key` (keypad keys inside the HomeKeypad instance), `closeOf` (GlassSheet Close), `note`. Frame IDs in `mealloop/pd_frames`. |
| `pdarch.js` (`mealloop/pdarch`) | Archive frames from page 09 (page level or sections) to a page-99 section, retargeting links first; logs to `mealloop/pd_archive`. KITCHEN W3: now keeps reactions stored as a single `action` (normalised to `actions` before editing). |
| `pd_export_plan` (plugin data) | The 47 Pass Desk exports (captured inline; the figma.com asset host is blocked here). |

## Run KITCHEN (2026-10-18)

| Tool | What it does |
|---|---|
| `kt1comp.js` | Builds the flagged Kitchen sets on page 03 (args.part 1: LiveCard, HeadcountCard, ShortageRow, ReportStatusChip; part 2: DishRow, KeyPad + Size=Decimal, QuantitySheet, HistoryRow, KitchenAlertRow). IDs in `mealloop/kt_ids`. |
| `ktb.js` (`mealloop/ktb`) | Page builders on top of `pdb`: `ksec`, `kinst`, `mix` (sans words + mono times), `ak`, `kbase`, `khome(sec, name, x, {state, hc, live, short, seeAll, waste, offline, sos})`, `closedCard`, `wasteCard`, `kpage`, `bar` (K06 bottom bar). Frame IDs in `mealloop/kt_frames`. |
| `ktw.js` (`mealloop/ktw`) | Record waste builders on top of `ktb`: `DISH`, `vals`, `waste(sec, name, x, {vals, done, plate, extra, sos})`, `qsheet`, `checkSheet` (o.blocked), `dialog`. |
