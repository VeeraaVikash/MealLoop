// Polish Q2 Crowd page builder (stored as mealloop/q2crowd). Body of async function(figma, args).
// args: { pid, notes?, items: [{ id?, name, x, y, time, eyebrow, status, bestLabel, best, bars:[0..1], cur, bestIdx, axis:[a,b,c], chartTitle, t1:[label,value,sub], t2:[label,value,sub], offline?, barsH?, moment? }] }
// Layout per design/reference/polish_2026-10/P03: back, large title "Crowd" + "Main Mess", black card, chart card, two equal tiles.
// Content ends 20 pt above the tab bar (barsH 138); the bottom fade is hidden when the content does not scroll.
const AF = Object.getPrototypeOf(async function(){}).constructor;
const S = await new AF('figma', 'args', figma.root.getSharedPluginData('mealloop', 'srh'))(figma, {});
const pg = await figma.getNodeByIdAsync(args.pid); const out = [];
for (const it of args.items) {
  const o = { title: 'Crowd', subtitle: 'Main Mess', back: true, tab: 'Home', time: it.time };
  let f, c;
  if (it.id) { f = await figma.getNodeByIdAsync(it.id); ({ c } = await S.reframe(f, o)); f.name = it.name; }
  else ({ f, c } = await S.screen(pg, it.name, it.x, it.y, o));
  c.itemSpacing = 16;
  if (it.offline) { const b = await S.v(S.ID.offline, {}, null, c); b.layoutSizingHorizontal = 'FILL'; const tx = b.findOne(n => n.type === 'TEXT'); if (tx) await S.setText(tx, it.offline); }
  const h = S.frame(c, 'Crowd hero', { gap: 10, fill: 'hero-bg', radius: 28 }); h.layoutSizingHorizontal = 'FILL'; h.paddingLeft = h.paddingRight = h.paddingTop = h.paddingBottom = 20;
  const e = await S.text(h, it.eyebrow, 'Label/Eyebrow', 'on-hero-secondary'); e.letterSpacing = { unit: 'PERCENT', value: 6 };
  await S.text(h, it.status, 'ML/Large Title', 'on-hero');
  const br = S.frame(h, 'Best time', { dir: 'H', gap: 12 }); br.counterAxisAlignItems = 'BASELINE';
  await S.text(br, it.bestLabel || 'Best time', 'ML/Body', 'on-hero-secondary'); await S.text(br, it.best, 'ML/Hero Unit', 'lime');
  const ch = S.card(c, 'Crowd chart', { gap: 16, stroke: null }); ch.paddingLeft = ch.paddingRight = ch.paddingTop = ch.paddingBottom = 20;
  await S.text(ch, it.chartTitle || 'Today, every 15 minutes', 'ML/Secondary', 'ink-secondary');
  const bars = S.frame(ch, 'Bars', { dir: 'H', gap: 10 }); bars.layoutSizingHorizontal = 'FILL'; bars.counterAxisSizingMode = 'FIXED'; bars.resize(313, it.barsH || 138); bars.counterAxisAlignItems = 'MAX';
  it.bars.forEach((v, i) => { const col = S.frame(bars, 'Slot ' + (i + 1), { gap: 6 }); col.layoutGrow = 1; col.layoutSizingVertical = 'FILL'; col.primaryAxisAlignItems = 'MAX'; col.counterAxisAlignItems = 'CENTER';
    if (i === it.bestIdx) { const d = figma.createEllipse(); d.name = 'Best time dot'; d.resize(12, 12); d.fills = [S.paint('lime')]; d.strokes = [S.paint('lime-outline')]; d.strokeWeight = 1.5; col.appendChild(d); }
    const r = figma.createRectangle(); r.name = 'Bar ' + (i + 1); r.resize(26, Math.max(12, Math.round(((it.barsH || 138) - 20) * v))); r.cornerRadius = 8; col.appendChild(r);
    if (i === it.cur) { r.fills = [S.paint('lime')]; r.strokes = [S.paint('lime-outline')]; r.strokeWeight = 1.5; r.strokeAlign = 'INSIDE'; r.name = 'Bar ' + (i + 1) + ' · now'; } else { r.fills = [S.paint('ink')]; if (it.offline) r.opacity = 0.5; } });
  const ax = S.frame(ch, 'Axis', { dir: 'H' }); ax.layoutSizingHorizontal = 'FILL'; ax.primaryAxisAlignItems = 'SPACE_BETWEEN'; for (const t of it.axis) await S.text(ax, t, 'ML/Mono Footnote', 'ink-secondary');
  const tiles = S.frame(c, 'Tiles', { dir: 'H', gap: 12 }); tiles.layoutSizingHorizontal = 'FILL';
  for (const [k, tv] of [['Tile 1', it.t1], ['Tile 2', it.t2]]) { const t = S.card(tiles, k + ' · ' + tv[0], { gap: 4, stroke: null }); t.paddingLeft = t.paddingRight = t.paddingTop = t.paddingBottom = 16; t.layoutGrow = 1; t.layoutSizingHorizontal = 'FILL';
    await S.text(t, tv[0], 'ML/Secondary', 'ink-secondary'); await S.text(t, tv[1], 'ML/Metric', 'ink'); await S.text(t, tv[2], /\d/.test(tv[2]) ? 'ML/Metric Unit' : 'ML/Secondary', 'ink-secondary'); }
  { const tb = f.findOne(n => n.name === 'Tab Bar'); const fd = f.findOne(n => n.name === 'Scroll edge fade'); const cb = c.y + c.height - (c.paddingBottom || 0); if (tb && fd) fd.visible = cb > tb.y - 19.5; }
  const back = f.findOne(n => n.name === 'Back' || /BackButton/.test(n.name)); if (back) await S.back(back);
  if (args.notes) { const near = pg.children.filter(n => n !== f && n.x >= f.x - 2 && n.x < f.x + 393 && ((n.y >= f.y - 80 && n.y < f.y) || (n.y >= f.y + 852 && n.y < f.y + 1010))); for (const n of near) n.remove(); await S.notes(f, it.name, it.moment || 'Wed 14 Aug 2024'); }
  out.push(f.id + ' ' + f.name);
}
return out;
