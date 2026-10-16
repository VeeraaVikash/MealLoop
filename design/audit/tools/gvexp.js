// GUARDIAN-VIDEO export helper (stored as mealloop/gvexp). Body of async function(figma, args). args: { from, to }.
// Removes every "EXPORT TMP / …" clone on every page, then for plan entries [from, to) of mealloop/gv_export_plan
// ([fileName, frameId] pairs) clones the frame 8000 pt above itself, scales the clone 2× and names it "EXPORT TMP / <file>".
// Returns [file, cloneId] pairs; each clone is captured with get_screenshot (maxDimension 1704). { from: 0, to: 0 } only cleans up.
const plan = JSON.parse(figma.root.getSharedPluginData('mealloop', 'gv_export_plan'));
for (const p of figma.root.children) { await p.loadAsync(); for (const n of p.children.filter(n => n.name.startsWith('EXPORT TMP / '))) n.remove(); }
const out = [];
for (const [file, id] of plan.slice(args.from, args.to)) { const f = await figma.getNodeByIdAsync(id); const c = f.clone(); const pg = (() => { let p = f; while (p.type !== 'PAGE') p = p.parent; return p; })(); pg.appendChild(c); c.x = f.absoluteTransform[0][2]; c.y = f.absoluteTransform[1][2] - 8000; c.rescale(2); c.name = 'EXPORT TMP / ' + file; out.push([file, c.id]); }
return out;
