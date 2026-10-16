// GUARDIAN-VIDEO archive tool (stored as mealloop/gvarch). Body of async function(figma, args).
// args: { pageId, section, suffix, items: [{ id, reason }], retarget: { archivedId: keptId } }. Same rules as fx2arch: moves each
// frame with its own "Label / …" text and the Moment / Sample notes just below it into the named section on page 99, renames it
// "<name> (<suffix>)", strips its reactions, and on the source page retargets links that pointed at it (or removes them).
// Appends { page, frame, id, reason, from } to shared plugin data mealloop/gv_archive.
figma.skipInvisibleInstanceChildren = false;
const src = await figma.getNodeByIdAsync(args.pageId); await src.loadAsync(); const p99 = await figma.getNodeByIdAsync('221:2'); await p99.loadAsync();
let sec = p99.children.find(n => n.type === 'SECTION' && n.name === args.section);
if (!sec) { let maxY = 0; for (const n of p99.children) maxY = Math.max(maxY, n.y + n.height); sec = figma.createSection(); sec.name = args.section; p99.appendChild(sec); sec.x = 0; sec.y = maxY + 400; sec.resizeWithoutConstraints(5000, 1300); }
const isScreen = n => n.type === 'FRAME' && Math.abs(n.width - 393) < 1 && !/^Moment/.test(n.name);
const log = JSON.parse(figma.root.getSharedPluginData('mealloop', 'gv_archive') || '[]'); const out = [];
const retarget = args.retarget || {}; const gone = new Set(args.items.map(i => i.id));
for (const n of src.findAll(x => x.reactions && x.reactions.length)) {
  let topN = n; while (topN && topN.parent !== src && topN.parent && topN.parent.type !== 'SECTION') topN = topN.parent; if (gone.has(n.id) || (topN && gone.has(topN.id))) continue; const topId = topN ? topN.id : null;
  let changed = false; const rs = [];
  for (const r of JSON.parse(JSON.stringify(n.reactions))) { if (r.action) delete r.action; const acts = [];
    for (const a of (r.actions || [])) { if (a.destinationId && gone.has(a.destinationId)) { changed = true; if (retarget[a.destinationId] && retarget[a.destinationId] !== topId) { a.destinationId = retarget[a.destinationId]; acts.push(a); } } else acts.push(a); }
    if (acts.length) { r.actions = acts; rs.push(r); } }
  if (changed) { await n.setReactionsAsync(rs); out.push('relinked ' + n.name.slice(0, 24)); } }
for (const it of args.items) { const f = await figma.getNodeByIdAsync(it.id); if (!f || f.parent !== src) { out.push('skip ' + it.id); continue; }
  const from = { x: Math.round(f.x), y: Math.round(f.y) };
  const comp = src.children.filter(n => n !== f && !isScreen(n) && Math.abs(n.x - f.x) < 2 && (n.name === 'Label / ' + f.name || (!/^Label \//.test(n.name) && n.y >= f.y + f.height - 1 && n.y <= f.y + f.height + 150)));
  for (const n of [f, ...f.findAll(x => x.reactions && x.reactions.length)]) if (n.reactions && n.reactions.length) await n.setReactionsAsync([]);
  const idx = sec.children.filter(isScreen).length; const nx = 100 + (idx % 10) * 473, ny = 150 + Math.floor(idx / 10) * 1200;
  const dx = nx - f.x, dy = ny - f.y; const oldName = f.name;
  for (const n of [f, ...comp]) { const ox = n.x + dx, oy = n.y + dy; sec.appendChild(n); n.x = ox; n.y = oy; }
  f.name = oldName + ' (' + args.suffix + ')';
  const need = Math.ceil((Math.floor(idx / 10) + 1) * 1200 + 300); if (sec.height < need) sec.resizeWithoutConstraints(sec.width, need);
  log.push({ page: src.name, frame: oldName, id: f.id, reason: it.reason, from }); out.push('archived ' + oldName + ' +' + comp.length); }
figma.root.setSharedPluginData('mealloop', 'gv_archive', JSON.stringify(log));
return out;
