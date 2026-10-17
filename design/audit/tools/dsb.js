// DOOR-SCANNER page builders (stored as mealloop/dsb). Body of async function(figma, args) -> D (extends dsh).
// D.F / D.save(): frame IDs in plugin data mealloop/ds_frames. D.section(name, y, w) section on page 09.
// D.titles, D.mealChip (lime chip with ink dot), D.reportRow, D.valueRow, D.home(section, name, x, {state:'Before'|'During'|'After', card, sos, offline, ...}),
// D.rel(frame, node) position inside the frame, D.infoCard(c, rows), D.absBtn(frame, label, kind, y), D.result(section, name, x, {kind, title, sub, back, primary, secondary, build}).
const D = await new (Object.getPrototypeOf(async function(){}).constructor)('figma','args',figma.root.getSharedPluginData('mealloop','dsh'))(figma,{});
D.F = JSON.parse(figma.root.getSharedPluginData('mealloop','ds_frames') || '{}');
D.save = () => figma.root.setSharedPluginData('mealloop','ds_frames', JSON.stringify(D.F));
D.section = async (name, y, w) => { const pg = await figma.getNodeByIdAsync('732:2'); await pg.loadAsync(); let s = pg.children.find(n => n.type === 'SECTION' && n.name === name); if (!s) { s = figma.createSection(); s.name = name; pg.appendChild(s); s.x = 0; s.y = y; s.resizeWithoutConstraints(w || 5000, 1260); } return s; };
D.titles = async (c, title, sub) => { const g = D.frame(c, 'Title group', { gap: 4 }); g.layoutSizingHorizontal = 'FILL'; const t = await D.t(g, title, 'ML/Large Title', 'ink', { fill: true, name: 'Title' }); if (sub) await D.t(g, sub, 'ML/Secondary', 'ink-secondary', { fill: true, name: 'Subtitle' }); return g; };
D.mealChip = async (c, label) => { const ch = await D.chip(c, label, 'lime', { px: 14, py: 7 }); const d = figma.createEllipse(); d.name = 'Dot'; d.resize(8, 8); d.fills = [D.paint('ink')]; ch.insertChild(0, d); ch.itemSpacing = 8; return ch; };
D.reportRow = async (c) => { const r = D.frame(c, 'Row / Report a problem', { dir: 'H', gap: 14, fill: 'surface', radius: 24 }); r.layoutSizingHorizontal = 'FILL'; r.paddingLeft = 16; r.paddingRight = 16; r.paddingTop = r.paddingBottom = 16; r.counterAxisAlignItems = 'CENTER';
  const ci = D.frame(r, 'Circle', { dir: 'H', radius: 22, fill: 'fill-quiet' }); ci.primaryAxisSizingMode = 'FIXED'; ci.counterAxisSizingMode = 'FIXED'; ci.resize(44, 44); ci.primaryAxisAlignItems = 'CENTER'; ci.counterAxisAlignItems = 'CENTER'; D.icon(ci, 'exclamationmark.triangle', 22, 'ink');
  const t = await D.t(r, 'Report a problem', 'ML/Body Semibold', 'ink', { name: 'Label' }); t.layoutGrow = 1; D.icon(r, 'chevron.right', 20, 'ink-secondary'); return r; };
D.valueRow = async (c, title, value) => D.row(c, title, null, value === null ? undefined : async r => { await D.t(r, value, 'ML/Code', 'ink', { name: 'Value' }); D.icon(r, 'chevron.right', 18, 'ink-secondary'); }, { py: 14 });
D.home = async (sec, name, x, o) => { o = o || {}; const st = o.state || 'During';
  const r = await D.screen(sec, name, x, 150, { noNav: true, tab: 'Home', time: o.time || (st === 'Before' ? '11:50' : st === 'After' ? '2:05' : '12:55'), gap: 12, moment: o.moment || ('Wed 14 Aug 2024, ' + (o.time || (st === 'Before' ? '11:50 AM' : st === 'After' ? '2:05 PM' : '12:55 PM'))) });
  const c = r.c; await D.logoRow(c);
  await D.titles(c, 'Lunch', st === 'After' ? 'Main Mess · ended 2:00 PM' : 'Main Mess · 12–2 PM');
  if (o.offline) { const b = await D.inst(c, '75:187', {}, { Message: 'No connection. Entries are not being recorded.' }); b.layoutSizingHorizontal = 'FILL'; b.name = 'Offline banner'; }
  if (st === 'Before') { const card = await D.ds(c, 'scanner', 'State=Before'); card.name = 'ScannerCard'; await D.reportRow(c); }
  if (st === 'During') { if (!o.noChip) await D.mealChip(c, o.chip || 'Meal in progress · 55 min');
    const card = await D.ds(c, 'scanner', 'State=' + (o.card || 'Ready')); card.name = 'ScannerCard'; if (o.cardH) card.resize(353, o.cardH);
    if (o.card === 'Camera denied') { await D.btn(c, 'Type the last 4 digits', 'black'); const row = D.frame(c, 'Tiles', { dir: 'H', gap: 12 }); row.layoutSizingHorizontal = 'FILL'; const ct = await D.ds(row, 'count', 'Size=Small'); ct.name = 'CountTile'; const rp = await D.reportRow(row); rp.layoutSizingHorizontal = 'FIXED'; rp.resize(171, 84); rp.paddingLeft = 12; rp.itemSpacing = 10; rp.findOne(n => n.name === 'Label').textAutoResize = 'HEIGHT'; rp.findOne(n => n.name === 'Label').layoutSizingHorizontal = 'FILL'; const ch = rp.findOne(n => n.name.startsWith('Icon / chevron')); if (ch) ch.remove(); }
    else { const row = D.frame(c, 'Tiles', { dir: 'H', gap: 12 }); row.layoutSizingHorizontal = 'FILL'; const ct = await D.ds(row, 'count', 'Size=Small'); ct.name = 'CountTile'; const ti = await D.ds(row, 'typeid', 'State=Default'); ti.name = 'TypeIdButton'; await D.reportRow(c); }
    if (o.sos) { const tab = await D.ds(r.f, 'sostab', 'State=' + o.sos); tab.name = 'SOSEdgeTab'; tab.x = 335; tab.y = 118; r.f.numberOfFixedChildren = r.f.children.length - 2; } }
  if (st === 'After') { const h = D.hero(c, 'Meal ended card'); h.cornerRadius = 32; h.paddingLeft = h.paddingRight = 24; h.paddingTop = h.paddingBottom = 24; h.itemSpacing = 6;
    const e = D.frame(h, 'Eyebrow', { dir: 'H', gap: 8 }); e.counterAxisAlignItems = 'CENTER'; D.dot(e, 'lime', 10); await D.t(e, 'Meal ended', 'ML/Tag', 'on-hero-secondary', { name: 'Eyebrow' });
    await D.t(h, 'Lunch has ended', 'ML/Title', 'on-hero', { fill: true, name: 'Title' }); await D.t(h, 'Scanning is closed.', 'ML/Secondary', 'on-hero-secondary', { fill: true, name: 'Sub' });
    const sp = D.frame(h, 'Spacer', {}); sp.resize(10, 14); await D.t(h, 'Final recorded entries', 'ML/Secondary', 'on-hero-secondary', { name: 'Label' }); await D.t(h, '774', 'ML/Hero Metric', 'on-hero', { name: 'Value' });
    const list = D.frame(c, 'Rows', {}); list.layoutSizingHorizontal = 'FILL'; await D.valueRow(list, 'Entered without voting', '6'); await D.valueRow(list, 'Open problems', '1'); const last = await D.valueRow(list, 'Report a problem', null); last.strokeBottomWeight = 1; }
  return r; };

D.rel = (f, n) => ({ x: Math.round(n.absoluteBoundingBox.x - f.absoluteBoundingBox.x), y: Math.round(n.absoluteBoundingBox.y - f.absoluteBoundingBox.y), w: Math.round(n.width), h: Math.round(n.height) });
D.infoCard = async (c, rows) => { const k = D.card(c, 'Info card', { gap: 0, radius: 28 }); k.paddingTop = k.paddingBottom = 8;
  for (let i = 0; i < rows.length; i++) { const [l, v, mono] = rows[i]; const r = D.frame(k, 'Row / ' + l, { dir: 'H', gap: 12 }); r.layoutSizingHorizontal = 'FILL'; r.counterAxisAlignItems = 'CENTER'; r.paddingTop = r.paddingBottom = 14; r.minHeight = 52;
    if (i < rows.length - 1) { r.strokes = [D.paint('border')]; r.strokeTopWeight = 0; r.strokeLeftWeight = 0; r.strokeRightWeight = 0; r.strokeBottomWeight = 1; r.strokeAlign = 'INSIDE'; }
    const t = await D.t(r, l, 'ML/Body', 'ink-secondary', { name: 'Label' }); t.layoutGrow = 1; await D.t(r, v, mono ? 'ML/Code' : 'ML/Body Semibold', 'ink', { name: 'Value' }); }
  return k; };
D.absBtn = async (f, label, kind, y) => { const hold = D.frame(f, 'hold', {}); const b = await D.btn(hold, label, kind, { w: 353 }); f.appendChild(b); hold.remove(); b.x = 20; b.y = y; return b; };
D.result = async (sec, name, x, o) => { o = o || {}; const lime = o.kind === 'Success';
  const r = await D.screen(sec, name, x, 150, { noNav: !o.back, back: !!o.back, inline: true, title: '', time: o.time || '12:55', backdrop: lime ? 'None' : undefined, moment: 'Wed 14 Aug 2024, ' + (o.moment || o.time || '12:55') });
  const c = r.c; c.itemSpacing = o.gap || 24; if (lime) { const ob = r.f.findOne(n => n.name === 'OrbitBackdrop'); if (ob) ob.remove(); r.f.fills = [D.paint('lime')]; c.paddingTop = 24; await D.t(c, 'Door Scanner · Lunch', 'ML/Secondary', 'on-lime', { name: 'Context' }); }
  const h = await D.ds(c, 'result', 'Kind=' + o.kind, { Title: o.title, Subtitle: o.sub }); h.name = 'ResultScreen'; h.layoutSizingHorizontal = 'FILL';
  if (o.build) await o.build(c, r.f);
  const out = { f: r.f, c };
  if (o.primary) out.primary = await D.absBtn(r.f, o.primary, 'black', 754);
  if (o.secondary) out.secondary = await D.absBtn(r.f, o.secondary, 'outline', 682);
  const names = ['Status Bar', 'Nav Header', 'Home Indicator']; const ch = r.f.children.filter(n => names.includes(n.name)); for (const n of ch) r.f.appendChild(n); r.f.numberOfFixedChildren = ch.length;
  return out; };
return D;
