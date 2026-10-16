# gvchk

`mealloop/gvchk` in shared plugin data is `tools/x9chk.js` with one change: the page is `args.pageId || '2237:2'`
(so the same checks run on pages 13, 14 and 15). Run in chunks: `{ pageId, from, to }`.
