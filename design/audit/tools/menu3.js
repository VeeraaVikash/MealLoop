// Final-fix F3 menu builder (stored as mealloop/menu3). Body of async function(figma, args) -> { id, bottom }.
// args: { name, x, y, mode: 'meal' | 'empty' | 'offline', meal, sub, dishes: [{ n, diet, kcal, P, C, F, to }], extra: 'ticket' | 'add' | null,
//         pills: { Breakfast, Lunch, Dinner } (frame ids, optional), ticketTo, addTo, votesTo, moment }
// Base: the To do drill-in (1291:8170) for its header (titled Back), tab bar and wash. Content is rebuilt from
// PlateRingHero (1469:2051) and MenuDishTile (1468:119999). Bars: energy share x (inner width - 2 pt per gap).
figma.skipInvisibleInstanceChildren = false;
const AF = Object.getPrototypeOf(async function(){}).constructor;
const H = await new AF('figma', 'args', figma.root.getSharedPluginData('mealloop', 'h24'))(figma, {});
const p = await figma.getNodeByIdAsync('811:21055'); await figma.setCurrentPageAsync(p);
const f = (await figma.getNodeByIdAsync('1291:8170')).clone(); p.appendChild(f); f.name = args.name; f.x = args.x; f.y = args.y || 4368; await H.strip(f);
const hdr = f.findOne(n => n.name === 'Drill-in header'); await H.loadAll(hdr);
const back = hdr.findOne(n => n.name === 'Back'); H.setP(back, { Label: 'Manage' }); await H.go(back, null, 'back');
const tr = hdr.findOne(n => n.name === 'Trailing'); tr.primaryAxisAlignItems = 'SPACE_BETWEEN';
const gbs = await figma.getNodeByIdAsync('74:101'); const plus = gbs.children.find(c => c.name === 'Kind=Icon, State=Default').createInstance(); tr.appendChild(plus); plus.name = 'Add dish'; H.setP(plus, { Icon: '73:102' });
if (args.mode === 'offline') { plus.fills = []; plus.effects = []; plus.strokes = [await H.paint('45:7')]; plus.strokeWeight = 1.5; plus.dashPattern = [4, 3]; plus.name = 'Add dish (needs a connection)'; }
else await H.go(plus, args.addTo, 'drill');
const title = hdr.findOne(n => n.type === 'TEXT' && n.name === 'Title'); await H.setT(title, 'Menu', false);
const row = figma.createAutoLayout('HORIZONTAL', { name: 'Title row', itemSpacing: 12 }); row.fills = []; row.counterAxisAlignItems = 'CENTER'; hdr.insertChild(hdr.children.indexOf(title), row); row.appendChild(title); title.textAutoResize = 'WIDTH_AND_HEIGHT';
const pillSet = (await figma.getNodeByIdAsync('1312:10871')).children[0].mainComponent.parent;
const vp = pillSet.children.find(v => v.name === 'Surface=Selected').createInstance(); row.appendChild(vp); await H.loadAll(vp); H.setP(vp, { Label: 'Votes · 1' }); vp.name = 'Votes · 1'; await H.go(vp, args.votesTo, 'drill');
await H.txt(hdr, 'Line', args.sub || 'Main Mess · Wed 14 Aug');
const tb = f.findOne(n => n.name === 'Tab Bar'); H.setP(tb, { Selected: 'Manage' });
const tabTr = JSON.parse(JSON.stringify((await figma.getNodeByIdAsync('811:21056')).findOne(n => n.name === 'Tab / Issues').reactions[0].actions[0].transition));
for (const [k, d] of Object.entries({ 'Tab / Today': '811:21056', 'Tab / Issues': '849:564', 'Tab / Insights': '877:983', 'Tab / Manage': '968:3292' })) { const t = tb.findOne(n => n.name === k); if (t) await t.setReactionsAsync([{ trigger: { type: 'ON_CLICK' }, actions: [{ type: 'NODE', destinationId: d, navigation: 'NAVIGATE', transition: tabTr, preserveScrollPosition: false, resetVideoPosition: false }] }]); }
const srch = tb.findOne(n => n.name === 'Search'); if (srch) await H.go(srch, '1441:13992', 'diss');
const c = f.findOne(n => n.name === 'Admin / Content'); for (const k of [...c.children]) k.remove(); c.itemReverseZIndex = false;
const tileSet = await figma.getNodeByIdAsync('1468:119999'); const V = nm => tileSet.children.find(v => v.name === nm);
const S = n => H.S(n); await figma.loadFontAsync(S('ML/Card Heading').fontName); await figma.loadFontAsync(S('ML/Footnote').fontName);
if (args.mode === 'offline') { const ob = await H.put('1103:7721', c); ob.name = 'Offline banner'; H.setP(ob, { Message: 'Offline · saved 1:38 PM' });
  const nt = figma.createText(); c.appendChild(nt); await nt.setTextStyleIdAsync(S('ML/Footnote').id); nt.characters = 'Add and edit need a connection. Saved values below.'; nt.fills = [await H.paint('45:7')]; nt.layoutSizingHorizontal = 'FILL'; nt.textAutoResize = 'HEIGHT'; nt.name = 'Note · disabled'; }
if (args.mode === 'empty') {
  const box = figma.createAutoLayout('VERTICAL', { name: 'Empty · No dishes yet', itemSpacing: 16 }); box.fills = []; box.counterAxisAlignItems = 'CENTER'; c.appendChild(box); box.layoutSizingHorizontal = 'FILL';
  const t = figma.createText(); box.appendChild(t); await t.setTextStyleIdAsync(S('ML/Card Heading').id); t.characters = 'No dishes yet'; t.fills = [await H.paint('45:6')]; t.name = 'Title';
  const a = V('Kind=Add, Diet=Non-veg').createInstance(); box.appendChild(a); a.name = 'Tile · Add dish'; await H.go(a, args.addTo, 'drill');
  const mid = (182 + 748) / 2; c.paddingTop = Math.round(mid - box.height / 2 - 182);
  await H.ann('811:21055', f, args.name, args.moment || '1:40 PM'); return { id: f.id, bottom: Math.round(182 + c.paddingTop + box.height) };
}
if (args.mode === 'meal') { const pb = await H.put('1312:10871', c); pb.name = 'Meal pills'; const kids = [...pb.children]; while (kids.length < 3) { const k = kids[0].clone(); pb.appendChild(k); kids.push(k); } for (let i = 3; i < kids.length; i++) kids[i].remove();
  const ms = ['Breakfast', 'Lunch', 'Dinner']; for (let i = 0; i < 3; i++) { kids[i].swapComponent(pillSet.children.find(v => v.name === 'Surface=' + (ms[i] === args.meal ? 'Selected' : 'Tappable'))); await H.loadAll(kids[i]); H.setP(kids[i], { Label: ms[i] }); kids[i].name = 'Pill · ' + ms[i]; if (ms[i] !== args.meal && args.pills && args.pills[ms[i]]) await H.go(kids[i], args.pills[ms[i]], 'diss'); } }
const hero = (await figma.getNodeByIdAsync('1469:2051')).children.find(v => v.name === 'Meal=' + args.meal).createInstance(); c.appendChild(hero); hero.layoutSizingHorizontal = 'FILL'; hero.name = 'PlateRingHero · ' + args.meal;
const lab = figma.createText(); c.appendChild(lab); await lab.setTextStyleIdAsync(S('ML/Card Heading').id); lab.characters = 'Dishes · ' + args.dishes.length; lab.fills = [await H.paint('45:6')]; lab.name = 'Section · Dishes'; await H.setT(lab, 'Dishes · ' + args.dishes.length);
const grid = figma.createAutoLayout('VERTICAL', { name: 'Dish grid · 2 columns', itemSpacing: 12 }); grid.fills = []; c.appendChild(grid); grid.layoutSizingHorizontal = 'FILL';
const items = args.dishes.map(d => ({ kind: 'dish', d })); if (args.extra) items.push({ kind: args.extra });
let r = null;
for (let i = 0; i < items.length; i++) {
  if (i % 2 === 0) { r = figma.createAutoLayout('HORIZONTAL', { name: 'Row ' + (i / 2 + 1), itemSpacing: 8 }); r.fills = []; grid.appendChild(r); r.layoutSizingHorizontal = 'FILL'; }
  const it = items[i]; let t;
  if (it.kind === 'dish') { const d = it.d; t = V('Kind=Dish, Diet=' + (d.diet === 'Egg' ? 'Egg' : 'Veg')).createInstance(); r.appendChild(t); t.layoutSizingHorizontal = 'FILL'; t.name = 'Tile · ' + d.n; await H.loadAll(t);
    await H.setT(t.findOne(n => n.name === 'Name'), d.n, false); await H.setT(t.findOne(n => n.name === 'Number'), String(d.kcal), false);
    const e = [4 * d.P, 4 * d.C, 9 * d.F]; const tot = e[0] + e[1] + e[2]; const W = 144.5; const on = e.filter(v => v > 0).length; const avail = W - 2 * (on - 1);
    const COL = [{ r: 0.0667, g: 0.0667, b: 0.0667 }, { r: 0.3608, g: 0.3608, b: 0.3451 }, { r: 0.8392, g: 0.8392, b: 0.8157 }]; const stops = []; let xx = 0; let first = true;
    for (let k = 0; k < 3; k++) { if (e[k] === 0) continue; if (!first) { stops.push({ position: xx / W, color: { r: 0, g: 0, b: 0, a: 0 } }); xx += 2; stops.push({ position: xx / W, color: { r: 0, g: 0, b: 0, a: 0 } }); } first = false; const w = e[k] / tot * avail; stops.push({ position: xx / W, color: Object.assign({ a: 1 }, COL[k]) }); xx += w; stops.push({ position: Math.min(1, xx / W), color: Object.assign({ a: 1 }, COL[k]) }); }
    const bar = t.findOne(n => n.name === 'Bar'); bar.fills = [{ type: 'GRADIENT_LINEAR', gradientTransform: [[1, 0, 0], [0, 1, 0]], gradientStops: stops }]; bar.name = 'Bar · P ' + Math.round(e[0] / tot * 100) + ' / C ' + Math.round(e[1] / tot * 100) + ' / F ' + Math.round(e[2] / tot * 100);
    if (args.mode === 'offline') { } else if (d.to) await H.go(t, d.to, 'drill'); }
  else if (it.kind === 'ticket') { t = V('Kind=Ticket, Diet=Non-veg').createInstance(); r.appendChild(t); t.layoutSizingHorizontal = 'FILL'; t.name = 'Ticket · Chicken biryani · Wednesday special'; if (args.ticketTo) await H.go(t, args.ticketTo, 'drill'); }
  else if (it.kind === 'add') { t = V('Kind=Add, Diet=Non-veg').createInstance(); r.appendChild(t); t.layoutSizingHorizontal = 'FILL'; t.name = 'Tile · Add dish'; await H.go(t, args.addTo, 'drill'); }
}
if (items.length % 2 === 1) { const sp = figma.createFrame(); sp.name = 'Grid spacer'; sp.fills = []; r.appendChild(sp); sp.layoutSizingHorizontal = 'FILL'; sp.resize(sp.width, 140); }
await H.ann('811:21055', f, args.name, args.moment || '1:40 PM');
const v = c.children.filter(x => x.visible); const last = v[v.length - 1];
return { id: f.id, bottom: Math.round(c.y + last.y + last.height) };
