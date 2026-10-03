// Run 2 Stage 11: reachability (stored as mealloop/reach11). Body of async function(figma, args) -> report.
// args: { pageId, starts?: [nodeId] }. Breadth-first walk over NODE actions (clicks, timeouts, presses, overlays) from
// every flow start (or the given starts). BACK / CLOSE count as an exit, not a dead end. Reports, for screen frames
// (393 wide): frames reached, frames unreachable, and dead ends (reached, no outgoing action at all).
figma.skipInvisibleInstanceChildren = false;
const page = await figma.getNodeByIdAsync(args.pageId); await page.loadAsync();
const frames = page.children.filter(n => n.type === 'FRAME' && Math.abs(n.width - 393) < 1);
const ids = new Set(frames.map(f => f.id));
const out = new Map(); const exits = new Set();
for (const f of frames) {
  const dests = new Set(); let exit = false;
  for (const n of [f, ...f.findAll(x => x.reactions && x.reactions.length)]) for (const r of (n.reactions || [])) for (const a of (r.actions || [])) {
    if (a.type === 'NODE' && a.destinationId) { let d = a.destinationId; if (!ids.has(d)) { const dn = await figma.getNodeByIdAsync(d); let t = dn; while (t && t.parent && t.parent.type !== 'PAGE') t = t.parent; d = t ? t.id : d; } dests.add(d); }
    if (a.type === 'BACK' || a.type === 'CLOSE') exit = true;
  }
  out.set(f.id, dests); if (exit) exits.add(f.id);
}
const starts = args.starts || page.flowStartingPoints.map(s => s.nodeId);
const seen = new Set(starts); const q = [...starts];
while (q.length) { const id = q.shift(); for (const d of (out.get(id) || [])) if (!seen.has(d) && ids.has(d)) { seen.add(d); q.push(d); } }
const name = id => frames.find(f => f.id === id).name;
const unreachable = frames.filter(f => !seen.has(f.id)).map(f => f.name);
const dead = frames.filter(f => seen.has(f.id) && out.get(f.id).size === 0 && !exits.has(f.id)).map(f => f.name);
return { page: page.name, frames: frames.length, starts: starts.length, reached: seen.size, unreachable, dead };
