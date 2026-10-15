// Student-redesign archive tool (stored as mealloop/srarc). Body of async function(figma, args).
// args {ids:[...], mode:'move'|'copy'}: puts each frame on 99 Archive in the "Student redesign 2026-10 · archived" grid,
// strips every reaction inside it, renames "Archived · <name>". 'move' also moves the frame's notes (label above, moment and sample chip below).
// args {retarget:{pageId, map:{oldId:newId}}}: rewrites NAVIGATE / OVERLAY destinations on that page first.
// Returns {moved:{id:newId}, retargeted:n}.
const arc = await figma.getNodeByIdAsync('221:2');
const out = { moved: {}, retargeted: 0 };
if (args.retarget) { const pg = await figma.getNodeByIdAsync(args.retarget.pageId); const map = args.retarget.map;
  for (const n of pg.findAll(n => n.reactions && n.reactions.length)) { let ch = false;
    const rs = n.reactions.map(r => { const acts = (r.actions || []).map(a => { if (a.destinationId && map[a.destinationId]) { ch = true; return Object.assign({}, a, { destinationId: map[a.destinationId] }); } return a; }); return Object.assign({}, r, { actions: acts }); });
    if (ch) { await n.setReactionsAsync(rs); out.retargeted++; } } }
let cur = JSON.parse(figma.root.getSharedPluginData('mealloop', 'sr_arc') || 'null');
if (!cur) { cur = { x: 0, y: 24120, n: 0 };
  const AF = Object.getPrototypeOf(async function(){}).constructor; const H = await new AF('figma', 'args', figma.root.getSharedPluginData('mealloop', 'ouh'))(figma, {});
  const l = await H.t(arc, 'Label / Student redesign 2026-10 · archived (replaced frames, links stripped)', 'Section', 'ink'); l.x = 0; l.y = 24000; l.name = 'Label / Student redesign 2026-10 · archived'; }
const strip = async node => { for (const n of [node, ...node.findAll(n => n.reactions && n.reactions.length)]) if (n.reactions && n.reactions.length) await n.setReactionsAsync([]); };
for (const id of args.ids || []) { const f = await figma.getNodeByIdAsync(id); if (!f) continue; const src = f.parent; const ox = f.x, oy = f.y;
  const notes = args.mode === 'move' ? src.children.filter(n => n !== f && !(n.type === 'FRAME' && n.width === 393 && n.height >= 600) && n.x >= ox - 2 && n.x < ox + 393 && ((n.y >= oy - 64 && n.y < oy) || (n.y >= oy + f.height + 4 && n.y < oy + f.height + 160))) : [];
  const t = args.mode === 'copy' ? f.clone() : f; arc.appendChild(t); t.x = cur.x; t.y = cur.y; t.name = 'Archived · ' + f.name.replace(/ · new$/, '') + (args.mode === 'copy' ? ' (before redesign)' : '');
  await strip(t); await strip(t); arc.flowStartingPoints = arc.flowStartingPoints.filter(p => p.nodeId !== t.id);
  for (const n of notes) { const dx = n.x - ox, dy = n.y - oy; arc.appendChild(n); n.x = cur.x + dx; n.y = cur.y + dy; }
  out.moved[id] = t.id; cur.n++; cur.x += 473; if (cur.x > 473 * 15) { cur.x = 0; cur.y += 1120; } }
figma.root.setSharedPluginData('mealloop', 'sr_arc', JSON.stringify(cur));
return out;
