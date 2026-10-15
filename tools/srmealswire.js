// Student-redesign Meals wiring (stored as mealloop/srmealswire). Body of async function(figma, args).
// args {pageId, sheet: id of the Highlight info sheet, pass: Special pass frame id}. Uses mealloop/sr_meals_<pageId>.
const AF = Object.getPrototypeOf(async function(){}).constructor;
const S = await new AF('figma', 'args', figma.root.getSharedPluginData('mealloop', 'srh'))(figma, {});
const map = JSON.parse(figma.root.getSharedPluginData('mealloop', 'sr_meals_' + args.pageId));
let n = 0;
for (const [k, id] of Object.entries(map)) {
  const [day, slot] = k.split('-'); const f = await figma.getNodeByIdAsync(id); if (!f) continue;
  for (const ch of f.findAll(x => x.name && x.name.startsWith('DateChip / '))) { const d = ch.name.split(' / ')[1]; const t = map[d + '-' + slot]; if (t && t !== id) { await S.link(ch, t); n++; } }
  const sg = f.findOne(x => x.name === 'MealSegments4');
  if (sg) for (const s of sg.findAll(x => x.name && x.name.startsWith('Segment / '))) { const sl = s.name.split(' / ')[1]; const t = map[day + '-' + sl]; if (t && t !== id) { await S.link(s, t); n++; } }
  for (const c of f.findAll(x => x.name === 'HighlightChip')) { const info = c.findOne(x => x.name && /info/.test(x.name)) || c; await S.link(c, args.sheet); n++; }
  const tk = f.findOne(x => x.name === 'TicketStrip / Alternate Wednesday'); if (tk && args.pass) { await S.link(tk, args.pass); n++; }
}
for (const p of figma.root.children) p.flowStartingPoints = p.flowStartingPoints.filter(s => !/^Flow \d+$/.test(s.name));
return n;
