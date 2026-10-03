// Run 2 Stage 3d: gap 105 student weekly bars (stored as mealloop/wb105). Body of async function(figma, args) -> report.
// args.frameIds: student Waste frames holding a WeekBars instance. The instance becomes a plain screen-level frame
// ("Week bars", same layout, no detached-instance link), and each data bar becomes a ChartBar instance sized from the
// printed number: Kind=Expected for past weeks, Kind=On target for the current week (lime, outlined), height =
// grams x 109/84 pt (84 g = 109 pt, the existing scale). Weeks printed "-" keep the hatched "not measured" block.
figma.skipInvisibleInstanceChildren = false;
const set = await figma.getNodeByIdAsync('887:1840');
const KIND = n => set.children.find(c => c.name === 'Kind=' + n);
const K = 109 / 84;
const rep = [];
for (const id of args.frameIds) {
  const f = await figma.getNodeByIdAsync(id); const wb = f.findOne(n => n.name === 'WeekBars' && n.type === 'INSTANCE');
  if (!wb) { rep.push({ id, name: f.name, skip: 'no WeekBars instance' }); continue; }
  const par = wb.parent, idx = par.children.indexOf(wb), sh = wb.layoutSizingHorizontal, sv = wb.layoutSizingVertical;
  const d = wb.detachInstance();
  const nf = figma.createFrame(); par.insertChild(idx, nf); nf.name = 'Week bars';
  for (const p of ['layoutMode', 'itemSpacing', 'paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom', 'primaryAxisAlignItems', 'counterAxisAlignItems', 'clipsContent']) nf[p] = d[p];
  nf.fills = []; nf.resize(d.width, d.height);
  for (const c of [...d.children]) nf.appendChild(c);
  d.remove(); nf.layoutSizingHorizontal = sh; nf.layoutSizingVertical = sv;
  const plot = nf.findOne(n => n.name.startsWith('Plot')); const out = [];
  for (const col of plot.children) {
    const t = col.children.find(n => n.type === 'TEXT'); const v = parseFloat(t.characters);
    const bar = col.children.find(n => n.type === 'RECTANGLE');
    if (!bar || isNaN(v)) { out.push(col.name.replace('Week / ', '') + ' ' + t.characters + ' hatched ' + Math.round(col.children[1].height)); continue; }
    const cur = /current/.test(bar.name); const inst = KIND(cur ? 'On target' : 'Expected').createInstance();
    col.insertChild(col.children.indexOf(bar), inst); inst.name = bar.name; const h = +(v * K).toFixed(2); inst.resize(bar.width, h); bar.remove();
    out.push(col.name.replace('Week / ', '') + ' ' + v + ' g → ' + h + ' pt');
  }
  rep.push({ id, name: f.name, bars: out.join(' ; '), size: Math.round(nf.width) + 'x' + Math.round(nf.height) });
}
return rep;
