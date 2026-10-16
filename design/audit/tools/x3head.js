// ADMIN-REDESIGN X3 Headcount builder (stored as mealloop/x3head). Body of async function(figma, args). args: { items: [spec] }
// spec: { name, x, y, title, subtitle, time, moment, banner?, cur?, eyebrow?, num?, range?, lowData?, note?, stats?, changed?, vendor?,
//         btn?, btnKind?, btn2?, adjust?, history? }. Layout per A02: ChainStepper (Forecast / Send / Vendor reply), black headcount card
// (88 pt number, 660–740 range with the forecast knob, stats), vendor reply chip, Send button, Adjust headcount, "Sent before" rows.
// Only a headcount is ever sent; no dish quantities.
const AF = Object.getPrototypeOf(async function(){}).constructor;
const A = await new AF('figma', 'args', figma.root.getSharedPluginData('mealloop', 'adm'))(figma, {});
const pg = await figma.getNodeByIdAsync('2237:2'); const out = [];
const range = async (parent, lo, hi, val, onDark) => { const f = figma.createFrame(); f.name = 'Range'; f.fills = []; parent.appendChild(f); f.layoutSizingHorizontal = 'FILL'; f.resize(313, 44); f.clipsContent = false;
  const W = 313, x = v => (v - 600) / 200 * W; const tr = figma.createRectangle(); f.appendChild(tr); tr.name = 'Track'; tr.resize(W, 8); tr.y = 6; tr.cornerRadius = 4; tr.fills = [A.paint('ink-secondary')];
  const lm = figma.createRectangle(); f.appendChild(lm); lm.name = 'Range 660–740'; lm.resize(x(hi) - x(lo), 8); lm.x = x(lo); lm.y = 6; lm.cornerRadius = 4; lm.fills = [A.paint('lime')];
  const k = figma.createEllipse(); f.appendChild(k); k.name = 'Forecast'; k.resize(18, 18); k.x = x(val) - 9; k.y = 1; k.fills = [A.paint('on-hero')]; k.strokes = [A.paint('ink')]; k.strokeWeight = 2;
  for (const v of [lo, hi]) { const t = await A.t(f, String(v), 'ML/Mono Footnote', 'on-hero-secondary'); t.x = x(v) - t.width / 2; t.y = 24; } return f; };
for (const it of args.items) {
  const { f, c } = await A.screen(pg, it.name, it.x, it.y, { title: it.title, subtitle: it.subtitle, back: true, tab: 'Today', time: it.time || '11:10', gap: 16, moment: it.moment });
  if (it.banner) { const b = await A.v(A.ID.offline, {}, null, c); b.layoutSizingHorizontal = 'FILL'; await A.setText(b.findOne(n => n.type === 'TEXT'), it.banner); }
  const ch = await A.use(c, 'chain', { Steps: '3', Current: it.cur || '2' }, { 'Label 1': 'Forecast', 'Label 2': 'Send', 'Label 3': 'Vendor reply' }); ch.name = 'ChainStepper';
  const h = A.hero(c, 'Headcount card', { gap: 6, pad: 20 });
  await A.t(h, it.eyebrow || 'EXPECTED DINERS', 'Label/Eyebrow', 'on-hero-secondary', { ls: 6, name: 'Eyebrow' });
  const big = await A.t(h, it.num || '700', 'ML/Hero Metric', it.num === '—' ? 'on-hero-secondary' : 'on-hero', { name: 'Headcount' }); big.fontSize = 88;
  if (it.range !== false) await range(h, 660, 740, 700);
  if (it.lowData) await A.t(h, 'Based on little data', 'ML/Secondary', 'on-hero-secondary', { fill: true });
  else if (it.note) await A.t(h, it.note, 'ML/Secondary', 'on-hero-secondary', { fill: true });
  else { const st = A.frame(h, 'Stats', { dir: 'H', gap: 12 }); st.layoutSizingHorizontal = 'FILL';
    for (const [v, l, mono] of (it.stats || [['2,310', 'said yes', 1], ['692', 'usual Wed', 1], ['None', 'events', 0]])) { const col = A.frame(st, 'Stat · ' + l, { gap: 2 }); col.layoutGrow = 1; await A.t(col, v, mono ? 'ML/Hero Unit' : 'ML/Body Semibold', 'on-hero'); await A.t(col, l, 'ML/Footnote', 'on-hero-secondary'); } }
  if (it.changed) { const r = A.frame(c, 'Changed', { dir: 'H', gap: 8 }); r.counterAxisAlignItems = 'CENTER'; A.icon(r, 'checkmark.circle', 20, 'ink'); await A.t(r, it.changed, 'ML/Body', 'ink'); }
  if (it.vendor) { const r = A.frame(c, 'Vendor reply', { dir: 'H', gap: 12 }); r.layoutSizingHorizontal = 'FILL'; r.counterAxisAlignItems = 'CENTER'; const t = await A.t(r, it.vendor[1], 'ML/Body', 'ink'); t.layoutGrow = 1; await A.use(r, 'vendor', { State: it.vendor[0] }, { Label: it.vendor[2] || it.vendor[0] }); }
  if (it.btn) await A.btn(c, it.btn, it.btnKind || 'black', { h: 64 });
  if (it.btn2) { const r = A.frame(c, 'Actions', { dir: 'H', gap: 12 }); r.layoutSizingHorizontal = 'FILL'; for (const [l, k] of it.btn2) { const b = await A.btn(r, l, k, { h: 56 }); b.layoutGrow = 1; } }
  if (it.adjust !== false) { await A.row(c, 'Adjust headcount', null); }
  if (it.history !== false) { const hs = A.frame(c, 'Sent before', { gap: 0 }); hs.layoutSizingHorizontal = 'FILL'; await A.label(hs, 'Sent before'); const g = A.frame(hs, 'Space', {}); g.resize(1, 6);
    await A.row(hs, 'Main · Breakfast · 410', null, async r => { const q = A.frame(r, 'Replied 7:05', { dir: 'H', gap: 6 }); q.counterAxisAlignItems = 'BASELINE'; await A.t(q, 'replied', 'ML/Secondary', 'ink-secondary'); await A.t(q, '7:05', 'ML/Mono Body', 'ink-secondary'); }, { titleStyle: 'ML/Body Semibold', py: 10 });
    await A.row(hs, 'Main · Lunch · 860', null, async r => { await A.use(r, 'vendor', { State: 'Not acknowledged' }, { Label: 'Not acknowledged' }); }, { titleStyle: 'ML/Body Semibold', py: 10 }); }
  A.fade(f); out.push(f.id + ' ' + f.name + ' h' + Math.round(c.y + c.height));
}
return out;
