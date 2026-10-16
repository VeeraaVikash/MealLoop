// Reachability for one page (stored as mealloop/gvreach). args: { pageId, extraStarts? }. BFS over reactions from the page's flow starts.
// Returns reached / total phone frames, unreached names, dead ends (no outgoing link and no Back) and dangling links (destination missing).
const pg = await figma.getNodeByIdAsync(args.pageId); await pg.loadAsync();
const frames = pg.findAll(n => n.type === 'FRAME' && Math.abs(n.width - 393) < 1 && n.parent && (n.parent.type === 'PAGE' || n.parent.type === 'SECTION') && !/^Moment/.test(n.name));
const byId = new Map(frames.map(f => [f.id, f])); const edges = new Map(); const dead = []; const dangling = [];
for (const f of frames) { const out = new Set(); let back = false;
  for (const n of [f, ...f.findAll(x => x.reactions && x.reactions.length)]) for (const r of (n.reactions || [])) for (const a of (r.actions || [])) { if (a.type === 'BACK') back = true; if (a.destinationId) { const d = await figma.getNodeByIdAsync(a.destinationId); if (!d) dangling.push(f.name + ' → ' + a.destinationId); else { let t = d; while (t && !byId.has(t.id) && t.parent) t = t.parent; if (t && byId.has(t.id)) out.add(t.id); else out.add('ext:' + a.destinationId); } } }
  edges.set(f.id, out); if (!out.size && !back) dead.push(f.name); }
const starts = pg.flowStartingPoints.map(s => s.nodeId).concat(args.extraStarts || []); const seen = new Set(starts); const q = [...starts];
while (q.length) { const id = q.shift(); for (const d of (edges.get(id) || [])) if (!seen.has(d) && byId.has(d)) { seen.add(d); q.push(d); } }
const un = frames.filter(f => !seen.has(f.id)).map(f => f.name);
return { reached: frames.length - un.length, total: frames.length, unreached: un, dead, dangling };
