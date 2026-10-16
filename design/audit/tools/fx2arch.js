// FIX-2 archive tool (stored as mealloop/fx2arch). Body of async function(figma, args).
// args: { items: [{ id, reason }], retarget: { archivedId: keptId } }
// Moves each page-12 frame (with its "Label / …" text, Sample note and Moment note) into the section "Admin · archived states" on
// page 99, renames it "<name> (before FIX-2)", strips every reaction inside it, and on page 12 retargets links that pointed at it
// (retarget map; a retarget that would point a frame at itself is dropped) or removes them. Appends { frame, id, reason, from } to shared plugin data mealloop/fx2_archive.
figma.skipInvisibleInstanceChildren = false;
const p12 = await figma.getNodeByIdAsync('2237:2'); const p99 = await figma.getNodeByIdAsync('221:2'); await p99.loadAsync();
let sec = p99.children.find(n => n.type === 'SECTION' && n.name === 'Admin · archived states');
if (!sec) { sec = figma.createSection(); sec.name = 'Admin · archived states'; p99.appendChild(sec); sec.x = 0; sec.y = 46500; sec.resizeWithoutConstraints(5000, 1300); }
const isScreen = n => n.type === 'FRAME' && Math.abs(n.width - 393) < 1 && !/^Moment/.test(n.name);
const log = JSON.parse(figma.root.getSharedPluginData('mealloop', 'fx2_archive') || '[]'); const out = [];
const retarget = args.retarget || {};
const gone = new Set(args.items.map(i => i.id));
// 1. fix links on page 12 that point at frames being archived
for (const n of p12.findAll(x => x.reactions && x.reactions.length)) {
  let topN = n; while (topN && topN.parent !== p12) topN = topN.parent; if (gone.has(n.id) || (topN && gone.has(topN.id))) continue; const topId = topN ? topN.id : null;
  let changed = false; const rs = [];
  for (const r of JSON.parse(JSON.stringify(n.reactions))) { if (r.action) delete r.action; const acts = [];
    for (const a of (r.actions || [])) { if (a.destinationId && gone.has(a.destinationId)) { changed = true; if (retarget[a.destinationId] && retarget[a.destinationId] !== topId) { a.destinationId = retarget[a.destinationId]; acts.push(a); } } else acts.push(a); }
    if (acts.length) { r.actions = acts; rs.push(r); } }
  if (changed) { await n.setReactionsAsync(rs); out.push('relinked ' + n.name.slice(0, 24)); } }
// 2. move frames and companions
for (const it of args.items) { const f = await figma.getNodeByIdAsync(it.id); if (!f || f.parent !== p12) { out.push('skip ' + it.id); continue; }
  const from = { x: Math.round(f.x), y: Math.round(f.y) };
  // companions: its own label above, and the Moment / Sample note just below it (never the next row's label)
  const comp = p12.children.filter(n => n !== f && !isScreen(n) && Math.abs(n.x - f.x) < 2 && (n.name === 'Label / ' + f.name || (!/^Label \//.test(n.name) && n.y >= f.y + f.height - 1 && n.y <= f.y + f.height + 150)));
  for (const n of [f, ...f.findAll(x => x.reactions && x.reactions.length)]) if (n.reactions && n.reactions.length) await n.setReactionsAsync([]);
  const idx = sec.children.filter(isScreen).length; const nx = 100 + (idx % 10) * 473, ny = 150 + Math.floor(idx / 10) * 1200;
  const dx = nx - f.x, dy = ny - f.y; const oldName = f.name;
  for (const n of [f, ...comp]) { const ox = n.x + dx, oy = n.y + dy; sec.appendChild(n); n.x = ox; n.y = oy; }
  f.name = oldName + ' (before FIX-2)';
  const need = Math.ceil((Math.floor(idx / 10) + 1) * 1200 + 300); if (sec.height < need) sec.resizeWithoutConstraints(sec.width, need);
  log.push({ frame: oldName, id: f.id, reason: it.reason, from }); out.push('archived ' + oldName + ' +' + comp.length); }
figma.root.setSharedPluginData('mealloop', 'fx2_archive', JSON.stringify(log));
return out;
