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
