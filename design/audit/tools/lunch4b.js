// Stage 4A part B: canonical lunch dish names (stored as mealloop/lunch4b). Body of async function(figma, args) -> report.
// args: { frameIds }. Names only: the MealHero "Menu" headline and every DishLine list that holds the old lunch
// (Sambar, Rice, Beetroot poriyal, Chicken curry[, Curd]) becomes Rice, Sambar, Paneer butter masala, Chapati, Curd (all Veg).
// Rows keep their ids and links by position; a missing fifth row (Curd) is cloned from the last row.
// Full-scroll copies grow by the added height (tab bar, home indicator and scroll fade move down).
// Tamil-length placeholders keep their "~" padding. The headline wraps to two lines (truncation off).
figma.skipInvisibleInstanceChildren = false;
const NEW = ['Rice', 'Sambar', 'Paneer butter masala', 'Chapati', 'Curd'];
const HEAD = 'Rice, sambar, paneer butter masala, chapati, curd';
const OLD = /^(Sambar|Rice|Beetroot poriyal|Chicken curry|Curd)$/;
const loadAll = async root => { const ts = root.type === 'TEXT' ? [root] : root.findAllWithCriteria({ types: ['TEXT'] }); const m = new Map(); for (const t of ts) for (const s of t.getStyledTextSegments(['fontName'])) m.set(s.fontName.family + '|' + s.fontName.style, s.fontName); await Promise.all([...m.values()].map(x => figma.loadFontAsync(x))); };
const setP = (inst, obj) => { const o = {}; for (const [n, v] of Object.entries(obj)) { const k = Object.keys(inst.componentProperties).find(x => x.split('#')[0] === n); if (!k) throw new Error('No prop ' + n + ' on ' + inst.name); o[k] = v; } inst.setProperties(o); };
const dishOf = i => { const t = i.findOne(n => n.type === 'TEXT' && n.name === 'Dish'); return t ? t.characters : ''; };
const report = [];
for (const id of args.frameIds) {
  const f = await figma.getNodeByIdAsync(id); const r = { id, name: f.name, head: 0, lists: [] };
  const content = f.children.find(c => /Content$/.test(c.name)); const c0 = content ? content.height : 0;
  // headline
  for (const h of f.findAll(n => n.type === 'INSTANCE' && n.componentProperties && Object.keys(n.componentProperties).some(k => k.startsWith('Menu#')))) {
    const k = Object.keys(h.componentProperties).find(x => x.startsWith('Menu#'));
    if (/poriyal|chicken curry/i.test(String(h.componentProperties[k].value))) { await loadAll(h); h.setProperties({ [k]: HEAD }); r.head++; for (const t of h.findAll(n => n.type === 'TEXT' && n.characters === HEAD)) { t.textTruncation = 'DISABLED'; t.maxLines = null; t.textAutoResize = 'HEIGHT'; } }
  }
  // dish lists: containers whose DishLine children carry the old lunch
  const lines = f.findAll(n => n.type === 'INSTANCE' && n.mainComponent && n.mainComponent.parent && n.mainComponent.parent.name === 'DishLine');
  const parents = [...new Set(lines.map(l => l.parent))].filter(p => { const ds = p.children.filter(c => lines.includes(c)).map(c => dishOf(c).replace(/\s*~+$/, '')); return ds.includes('Beetroot poriyal') && ds.every(d => OLD.test(d)); });
  let grow = 0;
  for (const p of parents) {
    const rows = p.children.filter(c => lines.includes(c));
    const h0 = p.height;
    while (rows.length < NEW.length) { const last = rows[rows.length - 1]; const c = last.clone(); p.insertChild(p.children.indexOf(last) + 1, c); rows.push(c); if (c.reactions && c.reactions.length) await c.setReactionsAsync(c.reactions.map(x => ({ trigger: x.trigger, actions: x.actions.map(a => a.destinationId ? Object.assign({}, a, { destinationId: (a.destinationId === '221:62916' ? '221:62940' : a.destinationId) }) : a) }))); }
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i]; await loadAll(row);
      const tail = (dishOf(row).match(/\s*~+$/) || [''])[0];
      const set = row.mainComponent.parent; const surf = /Surface=On dark/.test(row.mainComponent.name) ? 'On dark' : 'On light';
      if (!/Diet=Veg/.test(row.mainComponent.name)) { row.swapComponent(set.children.find(c => c.name === 'Surface=' + surf + ', Diet=Veg')); await loadAll(row); }
      setP(row, { Dish: NEW[i] + tail });
      if (/^Dish \//.test(row.name)) row.name = 'Dish / ' + NEW[i];
    }
    grow += p.height - h0;
    r.lists.push([p.name, rows.length, Math.round(p.height - h0)]);
  }
  if (content) grow = content.height - c0;
  if (grow && /full scroll/.test(f.name)) {
    f.resizeWithoutConstraints(f.width, f.height + grow);
    for (const c of f.children) if (['Tab Bar', 'Home Indicator', 'Scroll edge fade'].includes(c.name)) c.y += grow;
    r.grew = grow;
  }
  report.push(r);
}
return report;
