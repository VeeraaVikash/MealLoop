// Stage 4B tracker pass (stored as mealloop/trk4b). Body of async function(figma, args) -> per-frame change log.
// args.frameIds: tracker frames (pages 04, 05, 07) and Home · After last meal. Applies nutrition_sample.md:
// dish rows (Beetroot poriyal -> Paneer butter masala, Chicken curry -> Chapati), KcalGauge numbers and Fibre lines,
// the H6 planned line and Nutrients card, H6b goal arcs and macro rings, H7 values and bars, H8 today's bar, and the
// Home plate tile. Ring geometry lives in the page-03 variants (redrawn separately).
figma.skipInvisibleInstanceChildren = false;
const log = [];
const fonts = async root => { const ts = root.type === 'TEXT' ? [root] : root.findAllWithCriteria({ types: ['TEXT'] }); const m = new Map(); for (const t of ts) for (const s of t.getStyledTextSegments(['fontName'])) m.set(s.fontName.family + '|' + s.fontName.style, s.fontName); await Promise.all([...m.values()].map(x => figma.loadFontAsync(x))); };
const key = (inst, n) => Object.keys(inst.componentProperties).find(x => x.split('#')[0] === n);
const setP = (inst, obj, where) => { const o = {}; for (const [n, v] of Object.entries(obj)) { const k = key(inst, n); if (!k) continue; if (inst.componentProperties[k].value !== v) { log.push(where + ' · ' + n + ': ' + inst.componentProperties[k].value + ' → ' + v); o[k] = v; } } if (Object.keys(o).length) inst.setProperties(o); };
const setT = (t, v, where) => { if (t.characters !== v) { log.push(where + ': ' + t.characters + ' → ' + v); t.characters = v; } };
const NUM = { 'Value=830': ['830', 'Fibre 13 g'], 'Value=920': ['920', 'Fibre 14 g'], 'Value=1070': ['1,070', 'Fibre 15 g'] };
const DISH = { 'Beetroot poriyal': ['Paneer butter masala', '300 kcal', 'P 11 · C 11 · F 23 g'], 'Chicken curry': ['Chapati', '240 kcal', 'P 7 · C 40 · F 6 g'] };
const H7 = { Energy: ['1,070 kcal', 1070 / 2000], Protein: ['32 g', 32 / 50], Carbs: ['145 g', 145 / 275], Fat: ['39 g', 39 / 70], Fibre: ['15 g', 15 / 28], Sugar: ['18 g', 18 / 50], Sodium: ['1,326 mg', 1326 / 2300] };
const RINGS = { Protein: ['32 g', '18 g left', 32 / 50], Carbs: ['145 g', '130 g left', 145 / 275], Fat: ['39 g', '31 g left', 39 / 70], Fibre: ['15 g', '13 g left', 15 / 28] };
for (const id of args.frameIds) {
  const f = await figma.getNodeByIdAsync(id); const W = f.name; await fonts(f);
  const comp = i => (i.mainComponent && i.mainComponent.parent && i.mainComponent.parent.type === 'COMPONENT_SET') ? i.mainComponent.parent.name : (i.mainComponent ? i.mainComponent.name : '');
  // dish rows
  for (const row of f.findAll(n => n.type === 'INSTANCE' && comp(n) === 'DishPortionRow')) {
    const dl = row.findOne(n => n.type === 'INSTANCE' && comp(n) === 'DishLine'); const dt = dl.findOne(n => n.type === 'TEXT' && n.name === 'Dish'); const old = dt.characters;
    if (!DISH[old]) continue; const [nn, kc, mac] = DISH[old];
    if (!/Diet=Veg/.test(dl.mainComponent.name)) { const v = dl.mainComponent.parent.children.find(c => c.name === dl.mainComponent.name.replace(/Diet=[^,]+/, 'Diet=Veg')); dl.swapComponent(v); await fonts(dl); log.push(W + ' · ' + old + ' diet → Veg'); }
    setP(dl, { Dish: nn }, W + ' · row');
    setP(row, { Kcal: kc, Macros: mac }, W + ' · ' + nn);
    row.name = 'Dish / ' + nn;
  }
  // KcalGauge numbers and fibre
  for (const g of f.findAll(n => n.type === 'INSTANCE' && comp(n) === 'KcalGauge')) {
    const m = g.mainComponent.name.match(/Value=\d+/); if (!m || !NUM[m[0]]) continue;
    setP(g, { Number: NUM[m[0]][0], Fibre: NUM[m[0]][1] }, W + ' · gauge');
    if (/Goal=On/.test(g.mainComponent.name)) {
      const prog = g.findOne(n => n.name === 'Progress' && n.type === 'ELLIPSE'); const ad = prog.arcData; const frac = Number(m[0].slice(6)) / 2000; const end = ad.startingAngle + frac * 1.5 * Math.PI;
      if (Math.abs(ad.endingAngle - end) > 1e-4) { prog.arcData = { startingAngle: ad.startingAngle, endingAngle: end, innerRadius: ad.innerRadius }; log.push(W + ' · gauge goal arc → ' + (frac * 100).toFixed(1) + '%'); }
    }
  }
  // macro rings with goal (H6b)
  for (const r of f.findAll(n => n.type === 'INSTANCE' && comp(n) === 'MacroRing' && /Goal=On/.test(n.mainComponent.name))) {
    const mac = r.mainComponent.name.match(/Macro=(\w+)/)[1]; const [gr, cap, frac] = RINGS[mac];
    setP(r, { Grams: gr, Caption: cap }, W + ' · ring ' + mac);
    const prog = r.findOne(n => n.name === 'Progress' && n.type === 'ELLIPSE'); const ad = prog.arcData; const end = ad.startingAngle + frac * 2 * Math.PI;
    prog.arcData = { startingAngle: ad.startingAngle, endingAngle: end, innerRadius: ad.innerRadius }; log.push(W + ' · ring ' + mac + ' arc → ' + (frac * 100).toFixed(1) + '%');
  }
  // nutrients card (H6)
  for (const c of f.findAll(n => n.type === 'INSTANCE' && comp(n) === 'NutrientsCard')) setP(c, { Fibre: '15 g', Sugar: '18 g', Sodium: '1,326 mg' }, W + ' · nutrients');
  // home plate tile
  for (const c of f.findAll(n => n.type === 'INSTANCE' && comp(n) === 'TodaysPlateCard' && /Populated/.test(n.mainComponent.name))) setP(c, { Number: '1,070', Macros: 'P 32 g · C 145 g · F 39 g' }, W + ' · plate tile');
  // planned line (H6, H6b)
  for (const t of f.findAll(n => n.type === 'TEXT' && n.characters === '720 kcal · 4 dishes · planned')) setT(t, '920 kcal · 4 dishes · planned', W + ' · planned');
  // H7 nutrients detail
  for (const blk of f.findAll(n => n.type === 'FRAME' && /^Nutrient \/ /.test(n.name))) {
    const nm = blk.name.replace('Nutrient / ', ''); if (!H7[nm]) continue; const [val, frac] = H7[nm];
    const vt = blk.findOne(n => n.name === 'Value' && n.type === 'TEXT'); setT(vt, val, W + ' · ' + nm);
    const bar = blk.findOne(n => n.name === 'Bar'); const fill = bar.findOne(n => n.name === 'Fill'); const w = +(bar.width * frac).toFixed(2);
    if (Math.abs(fill.width - w) > 0.01) { log.push(W + ' · ' + nm + ' bar: ' + fill.width.toFixed(2) + ' → ' + w); fill.resize(w, fill.height); }
  }
  // H8 today's bar
  const wedBar = f.findAll(n => n.name === 'Bar / Wed' && n.type === 'RECTANGLE').find(b => b.parent.findOne(n => n.name === 'Average line'));
  if (wedBar) {
    const chart = wedBar.parent; const bottom = wedBar.y + wedBar.height; const avg = chart.findOne(n => n.name === 'Average line'); const scale = (bottom - avg.y) / 1870;
    const h = +(1070 * scale).toFixed(2); log.push(W + ' · Wed bar: ' + wedBar.height.toFixed(2) + ' → ' + h + ' (scale ' + scale.toFixed(5) + ')'); wedBar.resize(wedBar.width, h); wedBar.y = bottom - h;
    const vt = chart.findOne(n => n.name === 'Value / Wed'); setT(vt, '1.1k', W + ' · Wed value');
  }
}
return log;
