// Run 2 Stage 4: AD-4c Waste view (stored as mealloop/wst4). Body of async function(figma, args) -> report.
// args: { frameId }. Rebuilds the frame in place (ids of the frame and its five fixed layers stay):
// tab-root header "Insights" / "Since 8 Jul · all messes", pills (Waste selected), one black hero with two figures
// (−13% waste │ −1 shortages a week) and a mirrored chart: white waste pills rise above a centre baseline, hollow
// white-outline shortage pills hang below. 22 Jul and 12 Aug are dashed ghosts at the median height; 5 Aug is lime
// on both sides. ChartBar Pill kinds at screen level, heights to the data. Then a white row "Look closer · Wed lunch".
const AF = Object.getPrototypeOf(async function(){}).constructor;
const B = await new AF('figma', figma.root.getSharedPluginData('mealloop', 'ins3a'))(figma);
const f = await figma.getNodeByIdAsync(args.frameId); await B.loadAll(f);
const { content } = await B.reset(f, 'Insights', 'Since 8 Jul · all messes');
await B.pills(content, ['Overview', 'Meal', 'Waste'], 2);
const WEEKS = ['8 Jul', '15 Jul', '22 Jul', '29 Jul', '5 Aug', '12 Aug'];
const WASTE = [742, 718, null, 680, 642, null], SHORT = [3, 3, null, 2, 2, null], HI = 4;
const med = a => { const s = a.filter(x => x !== null).sort((x, y) => x - y); const m = s.length / 2; return s.length % 2 ? s[m | 0] : (s[m - 1] + s[m]) / 2; };
const KW = 110 / 742, KS = 18, PW = 26, COLW = 45.5, GAP = 8;
const hero = await B.hero(content, { name: 'Hero · Waste and shortages', eyebrow: 'Change since 8 Jul', a: ['Waste', '−13%', 'waste'], b: ['Shortages', '−1', 'shortages a week'] });
const chart = B.frame(hero, 'Chart · waste up, shortages down', 'VERTICAL', 4);
const side = (name, align) => { const r = B.frame(chart, name, 'HORIZONTAL', GAP); r.counterAxisAlignItems = align; return r; };
const up = side('Waste · kg', 'MAX');
const base = figma.createRectangle(); base.name = 'Baseline'; base.resize(313, 1); base.fills = [await B.paint(B.C.onHero2)]; chart.appendChild(base); base.layoutSizingHorizontal = 'FILL';
const down = side('Shortages', 'MIN');
const labels = side('Weeks', 'MIN');
const rep = [];
const col = (row, name) => { const c = figma.createAutoLayout('VERTICAL', { name, itemSpacing: 4 }); c.fills = []; c.counterAxisAlignItems = 'CENTER'; row.appendChild(c); c.resize(COLW, 10); c.layoutSizingHorizontal = 'FIXED'; c.layoutSizingVertical = 'HUG'; return c; };
const val = async (parent, s, color) => { const t = await B.text(parent, 'Value', s, 'ML/Mono Footnote', color, { mono: false, fill: false }); t.textAlignHorizontal = 'CENTER'; return t; };
const mW = med(WASTE), mS = med(SHORT);
for (let i = 0; i < 6; i++) {
  const w = WASTE[i], s = SHORT[i], ghost = w === null, hi = i === HI;
  const cu = col(up, 'Week / ' + WEEKS[i]);
  await val(cu, ghost ? '—' : String(w), ghost ? B.C.onHero2 : B.C.onHero);
  const hw = +((ghost ? mW : w) * KW).toFixed(2);
  const pu = await B.chartBar(cu, ghost ? 'Pill ghost' : hi ? 'Pill lime' : 'Pill', PW, hw, ghost ? 'Waste · not measured' : 'Waste · ' + w + ' kg');
  const cd = col(down, 'Week / ' + WEEKS[i]);
  const hs = +((ghost ? mS : s) * KS).toFixed(2);
  const pd = await B.chartBar(cd, ghost ? 'Pill ghost' : 'Pill', PW, hs, ghost ? 'Shortages · not measured' : 'Shortages · ' + s);
  if (!ghost) { pd.fills = []; pd.strokes = [await B.paint(hi ? B.C.lime : B.C.onHero)]; pd.strokeWeight = 1.5; pd.strokeAlign = 'INSIDE'; }
  await val(cd, ghost ? '—' : String(s), ghost ? B.C.onHero2 : B.C.onHero);
  const cl = col(labels, 'Week / ' + WEEKS[i]); const lt = await B.text(cl, 'Week', WEEKS[i], 'ML/Footnote', B.C.onHero2, { fill: false }); lt.textAlignHorizontal = 'CENTER';
  rep.push(WEEKS[i] + ': ' + (ghost ? 'ghost ' + hw + ' / ' + hs : w + ' kg → ' + hw + ' pt (' + (w * KW).toFixed(3) + '), ' + s + ' → ' + hs + ' pt'));
}
const cap = B.frame(hero, 'Captions', 'HORIZONTAL', 8); cap.primaryAxisAlignItems = 'SPACE_BETWEEN';
await B.text(cap, 'Dashed', 'Dashed: not measured', 'ML/Footnote', B.C.onHero2, { fill: false });
await B.text(cap, 'Key', '↑ waste · ↓ shortages', 'ML/Footnote', B.C.onHero2, { fill: false });
const row = await B.row(content, 'Look closer · Wed lunch', 'Look closer · Wed lunch', 'Main Mess · 3 possible causes');
const vis = content.children.filter(n => n.visible); const last = vis[vis.length - 1];
return { rep, hero: Math.round(hero.height), bottom: Math.round(content.y + last.y + last.height), contentH: Math.round(content.height), row: row.id };
