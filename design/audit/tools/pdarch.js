// PASS-DESK archive tool (stored as mealloop/pdarch). Body of async function(figma, args).
// args: { items: [{ id, reason, to }], section: 'Pass Desk · archived states', suffix: 'before PASS-DESK' }.
// On page 09 every link to an archived frame is retargeted to its `to` (or dropped if none); then each frame moves to page 99 with
// its label and the notes just below it (page top level or the same section), is renamed "<name> (<suffix>)" and has its links stripped.
// Appends rows to mealloop/pd_archive.
figma.skipInvisibleInstanceChildren = false;
const pg = await figma.getNodeByIdAsync('732:2'); await pg.loadAsync(); const p99 = await figma.getNodeByIdAsync('221:2'); await p99.loadAsync();
let sec = p99.children.find(n => n.type === 'SECTION' && n.name === args.section);
if (!sec) { let maxY = 0; for (const n of p99.children) maxY = Math.max(maxY, n.y + n.height); sec = figma.createSection(); sec.name = args.section; p99.appendChild(sec); sec.x = 0; sec.y = maxY + 400; sec.resizeWithoutConstraints(5000, 1300); }
const isScreen = n => n.type === 'FRAME' && Math.abs(n.width - 393) < 1;
const gone = new Map(args.items.map(i => [i.id, i.to || null]));
const top = n => { let t = n; while (t.parent && t.parent.type !== 'SECTION' && t.parent.type !== 'PAGE') t = t.parent; return t; };
let relinked = 0;
for (const n of pg.findAll(x => x.reactions && x.reactions.length)) { const t = top(n); if (gone.has(t.id)) continue; let changed = false; const rs = [];
  for (const r of JSON.parse(JSON.stringify(n.reactions))) { if (!r.actions && r.action) r.actions = [r.action]; delete r.action; const acts = [];
    for (const a of (r.actions || [])) { if (a.destinationId && gone.has(a.destinationId)) { changed = true; const to = gone.get(a.destinationId); if (to && to !== t.id) { a.destinationId = to; acts.push(a); } } else acts.push(a); }
    if (acts.length) { r.actions = acts; rs.push(r); } }
  if (changed) { await n.setReactionsAsync(rs); relinked++; } }
const log = JSON.parse(figma.root.getSharedPluginData('mealloop', 'pd_archive') || '[]'); const out = [];
for (const it of args.items) { const f = await figma.getNodeByIdAsync(it.id); if (!f) { out.push('missing ' + it.id); continue; } const par = f.parent;
  const comp = par.children.filter(n => n !== f && !isScreen(n) && Math.abs(n.x - f.x) < 2 && (n.name === 'Label / ' + f.name || (!/^Label \//.test(n.name) && n.y >= f.y + f.height - 1 && n.y <= f.y + f.height + 220)));
  for (const n of [f, ...f.findAll(x => x.reactions && x.reactions.length)]) if (n.reactions && n.reactions.length) await n.setReactionsAsync([]);
  const idx = sec.children.filter(isScreen).length; const nx = 100 + (idx % 10) * 473, ny = 150 + Math.floor(idx / 10) * 1200; const dx = nx - f.x, dy = ny - f.y; const old = f.name;
  for (const n of [f, ...comp]) { const ox = n.x + dx, oy = n.y + dy; sec.appendChild(n); n.x = ox; n.y = oy; }
  f.name = old + ' (' + args.suffix + ')'; const lab = comp.find(n => n.name.startsWith('Label / ')); if (lab && lab.type === 'TEXT') { lab.name = 'Label / ' + f.name; await figma.loadFontAsync(lab.fontName); lab.characters = f.name; }
  const need = (Math.floor(idx / 10) + 1) * 1200 + 300; if (sec.height < need) sec.resizeWithoutConstraints(sec.width, need);
  log.push({ frame: old, id: f.id, reason: it.reason, to: it.to || null }); out.push('archived ' + old + ' +' + comp.length); }
figma.root.setSharedPluginData('mealloop', 'pd_archive', JSON.stringify(log));
return { relinked, out };
