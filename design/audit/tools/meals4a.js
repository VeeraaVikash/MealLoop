// Stage 4A Meals menu builder (stored as mealloop/meals4a). Body of async function(figma, args) -> report.
// args: { frameId, meal: 'lunch'|'dinner'|'breakfast', state: 'menu'|'changed'|'loading'|'offline', fullScroll: bool }
// Rebuilds the content of a Meals · Menu family frame in place (same script on pages 04, 05 and 07).
// Keeps the frame, its content frame, DateStrip, Current meal card frame, OfflineBanner and Changed note (ids and links);
// removes the old SERVING NOW / title row / dish rows and the Dinner and Breakfast accordion rows.
figma.skipInvisibleInstanceChildren = false;
const { frameId, meal, state, fullScroll } = args;
const f = await figma.getNodeByIdAsync(frameId);
let pg = f; while (pg.type !== 'PAGE') pg = pg.parent; await figma.setCurrentPageAsync(pg);
const styles = await figma.getLocalTextStylesAsync();
const S = n => styles.find(s => s.name === n);
const paint = async id => figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 1 }, 'color', await figma.variables.getVariableByIdAsync('VariableID:' + id));
for (const ff of [['Inter', 'Regular'], ['Inter', 'Medium'], ['Inter', 'Semi Bold'], ['Inter', 'Bold'], ['JetBrains Mono', 'Bold'], ['JetBrains Mono', 'Medium']]) await figma.loadFontAsync({ family: ff[0], style: ff[1] });
const loadAll = async root => { const ts = root.type === 'TEXT' ? [root] : root.findAllWithCriteria({ types: ['TEXT'] }); const m = new Map(); for (const t of ts) for (const s of t.getStyledTextSegments(['fontName'])) m.set(s.fontName.family + '|' + s.fontName.style, s.fontName); await Promise.all([...m.values()].map(x => figma.loadFontAsync(x))); };
const setP = (inst, obj) => { const o = {}; for (const [n, v] of Object.entries(obj)) { const k = Object.keys(inst.componentProperties).find(x => x.split('#')[0] === n); if (!k) throw new Error('No prop ' + n + ' on ' + inst.name); o[k] = v; } inst.setProperties(o); return inst; };
const RX = /\d+(?:[:.,–]\d+)*(?:[\s ](?:AM|PM))?/g;
const mono = async (t, monoStyle) => { let m; RX.lastIndex = 0; const s = t.characters; while ((m = RX.exec(s))) await t.setRangeTextStyleIdAsync(m.index, m.index + m[0].length, S(monoStyle).id); };
const DATA = {
  lunch: { title: 'Lunch', eyebrow: 'Serving now · 12–2 PM', chip: ['lime', 'You’re in'], dishes: [['Rice', 'Veg'], ['Sambar', 'Veg'], ['Paneer butter masala', 'Veg'], ['Chapati', 'Veg'], ['Curd', 'Veg']] },
  dinner: { title: 'Dinner', eyebrow: 'Tonight · 7:30–9:30 PM', chip: ['outline', 'Decide by 6 PM'], dishes: [['Chapati', 'Veg'], ['Paneer masala', 'Veg'], ['Dal', 'Veg'], ['Rice', 'Veg'], ['Egg bhurji', 'Egg']] },
  breakfast: { title: 'Breakfast', eyebrow: 'Served · 7:30–9:30 AM', chip: null, dishes: [['Idli', 'Veg'], ['Sambar', 'Veg'], ['Coconut chutney', 'Veg']] }
};
const D = DATA[meal];
const kids = f.children;
const content = kids.find(n => /Content$/.test(n.name));
const nav = kids.find(n => n.name === 'Nav Header');
await loadAll(nav); setP(nav, { 'Show Subtitle': true, Subtitle: 'Wed 14 Aug · Main Mess' });
const sub = nav.findOne(n => n.name === 'Subtitle' && n.type === 'TEXT'); if (sub) { await loadAll(sub); await mono(sub, 'ML/Mono Body'); }
const banner = content.children.find(n => n.name === 'OfflineBanner');
const strip = content.children.find(n => /date ?strip/i.test(n.name));
const changed = content.children.find(n => n.name === 'Changed');
let card = content.children.find(n => n.name === 'Current meal');
const keep = new Set([banner, strip, changed, card].filter(Boolean));
for (const c of [...content.children]) if (!keep.has(c)) c.remove();
content.itemSpacing = 12; content.paddingTop = 0; content.paddingBottom = 124;
content.y = Math.round(nav.y + nav.height + 8);
// pills
const chipSet = await figma.getNodeByIdAsync('100:1079');
const pills = figma.createAutoLayout('HORIZONTAL', { name: 'Meal pills', itemSpacing: 8 }); pills.fills = [];
content.insertChild(content.children.indexOf(strip) + 1, pills); pills.layoutSizingHorizontal = 'FILL';
for (const [lab, key] of [['Breakfast', 'breakfast'], ['Lunch', 'lunch'], ['Dinner', 'dinner']]) {
  if (state === 'loading') break;
  const v = chipSet.children.find(c => c.name === 'Surface=' + (key === meal ? 'Selected' : 'Tappable')); await loadAll(v);
  const p = v.createInstance(); pills.appendChild(p); await loadAll(p); setP(p, { Label: lab, 'Show Icon': false }); p.name = 'Pill · ' + lab;
}
const report = { frame: f.name };
if (state === 'loading') {
  pills.remove();
  const sk = await figma.getNodeByIdAsync('75:238');
  for (const [nm, h] of [['Skeleton · pills', 30], ['Skeleton · meal card', 300], ['Skeleton · special row', 72], ['Skeleton · tiles', 80], ['Skeleton · crowd', 54]]) { const s = sk.createInstance(); content.appendChild(s); s.layoutSizingHorizontal = 'FILL'; s.resize(s.width, h); s.name = nm; }
} else {
  // card
  for (const c of [...card.children]) if (c.name !== 'Divider') c.remove();
  const div = card.children[0];
  card.itemSpacing = 6; card.paddingTop = 18; card.paddingBottom = 14; card.paddingLeft = card.paddingRight = 20;
  const mk = async (name, chars, style, color, idx) => { const t = figma.createText(); t.name = name; card.insertChild(idx, t); await t.setTextStyleIdAsync(S(style).id); t.characters = chars; t.fills = [await paint(color)]; t.layoutSizingHorizontal = 'FILL'; t.textAutoResize = 'HEIGHT'; return t; };
  const eb = await mk('Eyebrow', D.eyebrow, 'ML/Eyebrow', '51:5', 0); await mono(eb, 'ML/Mono Body');
  const row = figma.createAutoLayout('HORIZONTAL', { name: 'Title row', itemSpacing: 12 }); row.fills = []; row.counterAxisAlignItems = 'CENTER';
  card.insertChild(1, row); row.layoutSizingHorizontal = 'FILL';
  const tt = figma.createText(); tt.name = 'Title'; row.appendChild(tt); await tt.setTextStyleIdAsync(S('ML/Title').id); tt.characters = D.title; tt.fills = [await paint('45:28')];
  if (D.chip) {
    if (D.chip[0] === 'lime') { const sp = (await figma.getNodeByIdAsync('808:86801')).children.find(c => c.name === 'State=Success'); await loadAll(sp); const c = sp.createInstance(); row.appendChild(c); await loadAll(c); setP(c, { Label: D.chip[1] }); c.name = 'Chip · ' + D.chip[1]; }
    else { const v = chipSet.children.find(c => c.name === 'Surface=On dark'); await loadAll(v); const c = v.createInstance(); row.appendChild(c); await loadAll(c); setP(c, { Label: D.chip[1], 'Show Icon': false }); c.name = 'Chip · ' + D.chip[1]; const t = c.findOne(n => n.type === 'TEXT'); await loadAll(t); await mono(t, 'ML/Mono Footnote'); }
  }
  card.insertChild(2, div); div.layoutSizingHorizontal = 'FILL';
  const dl = await figma.getNodeByIdAsync('102:1260');
  for (const [name, diet] of D.dishes) {
    const v = dl.children.find(c => c.name === 'Surface=On dark, Diet=' + (diet === 'Egg' ? 'Egg' : diet === 'Non-veg' ? 'Non-veg' : 'Veg')); await loadAll(v);
    const d = v.createInstance(); card.appendChild(d); d.layoutSizingHorizontal = 'FILL'; d.name = 'Dish / ' + name; await loadAll(d);
    setP(d, { Dish: name });
    const circle = d.findOne(n => n.name === 'Diet circle'); circle.layoutSizingHorizontal = 'HUG'; circle.layoutSizingVertical = 'HUG'; circle.fills = []; circle.strokes = [];
    const tag = d.findOne(n => n.name === 'Diet tag'); await tag.setTextStyleIdAsync(S('ML/Footnote').id); tag.textCase = 'ORIGINAL'; tag.characters = diet;
  }
  // changed note text
  if (changed) { const t = changed.findOne(n => n.type === 'TEXT'); await loadAll(t); t.characters = 'Changed 11:40 · Egg curry is now Paneer butter masala'; await t.setRangeTextStyleIdAsync(0, t.characters.length, S('ML/Footnote').id); await mono(t, 'ML/Mono Footnote'); content.insertChild(content.children.indexOf(card) + 1, changed); }
  // special row: surface card + ListRow (Stacked, chevron right), cloned from the AD-3a SOS row (1312:10948)
  const rs = await figma.getNodeByIdAsync('1312:10948'); await loadAll(rs);
  const sr = rs.clone(); content.appendChild(sr); sr.layoutSizingHorizontal = 'FILL'; sr.name = 'Row · Wednesday special';
  for (const n of [sr, ...sr.findAll(x => x.reactions && x.reactions.length)]) if (n.reactions && n.reactions.length) await n.setReactionsAsync([]);
  const lr = sr.children[0]; lr.name = 'Row · Wednesday special'; await loadAll(lr);
  setP(lr, { Name: 'Wednesday special · Chicken biryani', Reason: 'Pass · Wed 12–2\u00A0PM', 'Show reason': true, 'Show chevron': true });
  const nm = lr.findOne(n => n.name === 'Name'); await nm.setTextStyleIdAsync(S('ML/Secondary Medium').id);
  const meta = lr.findOne(n => n.name === 'Reason'); await meta.setTextStyleIdAsync(S('ML/Footnote').id); await mono(meta, 'ML/Mono Footnote');
  // tiles and crowd, cloned from Meals · Meal detail (page 04)
  const tiles = (await figma.getNodeByIdAsync('115:38093')); await loadAll(tiles); const tc = tiles.clone(); content.appendChild(tc); tc.layoutSizingHorizontal = 'FILL'; tc.name = 'At the mess';
  for (const t of tc.children) { t.layoutSizingHorizontal = 'FILL'; }
  const crowd = (await figma.getNodeByIdAsync('115:38115')); await loadAll(crowd); const cc = crowd.clone(); content.appendChild(cc); cc.layoutSizingHorizontal = 'FILL'; cc.name = 'Crowd'; for (const t of cc.findAll(n => n.type === 'TEXT' && /Updated/.test(n.characters))) { await loadAll(t); await t.setRangeTextStyleIdAsync(0, t.characters.length, S('ML/Footnote').id); await mono(t, 'ML/Mono Footnote'); }
  for (const n of [tc, cc, ...tc.findAll(x => x.reactions && x.reactions.length), ...cc.findAll(x => x.reactions && x.reactions.length)]) if (n.reactions && n.reactions.length) await n.setReactionsAsync([]);
}
// full-scroll copies: grow the frame to the content and move the bottom chrome
const vis = content.children.filter(n => n.visible);
const last = vis[vis.length - 1];
const lastBottom = Math.round(content.y + last.y + last.height);
report.lastBottom = lastBottom;
if (fullScroll) {
  const H = Math.max(852, lastBottom + 120);
  f.resizeWithoutConstraints(393, H);
  for (const c of f.children) {
    if (c.name === 'Tab Bar') c.y = H - 104; else if (c.name === 'Home Indicator') c.y = H - 34; else if (c.name === 'Scroll edge fade') c.y = H - 164;
  }
  report.height = H;
}
report.items = content.children.map(n => [n.name, Math.round(content.y + n.y), Math.round(n.height)]);
return report;
