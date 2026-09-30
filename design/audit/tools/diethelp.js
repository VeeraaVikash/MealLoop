// Shared helpers for the content-diet edits (stored as mealloop/diethelp). Load with:
//   const H = await new AF('figma', figma.root.getSharedPluginData('mealloop','diethelp'))(figma);
// H.controls(content, { scope: 'Main Mess', rules: true }) inserts the header-controls row:
//   scope pill = MetaChip Surface=Tappable + fork.knife; Rules pill = EstimatePill On light, label "Rules".
// Note: H.strip does not clear a BACK reaction that lives on a nested NavHeader layer (see contract D1 notes).
const H = {};
H.loadAll = async (root) => { const ts = root.type === 'TEXT' ? [root] : root.findAllWithCriteria({ types: ['TEXT'] }); const fonts = new Map(); for (const t of ts) for (const s of t.getStyledTextSegments(['fontName'])) fonts.set(s.fontName.family + '|' + s.fontName.style, s.fontName); await Promise.all([...fonts.values()].map(f => figma.loadFontAsync(f))); };
H.k = (inst, n) => Object.keys(inst.componentProperties).find(x => x.split('#')[0] === n);
H.set = (inst, obj) => { const o = {}; for (const [n, v] of Object.entries(obj)) { const key = H.k(inst, n); if (!key) throw new Error('No prop ' + n + ' on ' + inst.name); o[key] = v; } inst.setProperties(o); return inst; };
H.strip = async (node) => { for (const n of [node, ...(node.findAll ? node.findAll(x => 'reactions' in x && x.reactions.length > 0) : [])]) if (n.reactions && n.reactions.length) await n.setReactionsAsync([]); };
H.content = f => f.children.find(c => c.name === 'Admin / Content');
H.byName = (root, name) => root.findOne(n => n.name === name);
H.controls = async (content, opts) => {
  const row = figma.createAutoLayout('HORIZONTAL', { name: 'Header controls', itemSpacing: 8 });
  row.fills = []; row.counterAxisAlignItems = 'CENTER';
  content.insertChild(0, row); row.layoutSizingHorizontal = 'FILL'; row.resize(row.width, 44); row.layoutSizingVertical = 'FIXED';
  const ids = {};
  if (opts.scope) {
    const chipSet = await figma.getNodeByIdAsync('100:1079');
    const v = chipSet.children.find(c => c.name === 'Surface=Tappable');
    await H.loadAll(v);
    const c = v.createInstance(); row.appendChild(c);
    H.set(c, { 'Label': opts.scope, 'Show Icon': true, 'Icon': '73:21' });
    c.name = 'Scope · ' + opts.scope; ids.scope = c.id;
  }
  if (opts.rules) {
    const ep = await figma.getNodeByIdAsync('504:1725');
    await H.loadAll(ep);
    const r = ep.createInstance(); row.appendChild(r);
    const t = r.findOne(n => n.type === 'TEXT'); t.characters = 'Rules';
    r.name = 'Rules pill'; ids.rules = r.id;
  }
  ids.row = row.id; return ids;
};
H.banner = async (content, message, index) => { const src = await figma.getNodeByIdAsync('957:89570'); await H.loadAll(src); const b = src.clone(); content.insertChild(index, b); b.layoutSizingHorizontal = 'FILL'; H.set(b, { Message: message }); b.name = 'Offline banner'; return b; };
return H;
