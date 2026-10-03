// Stage 5A Manage hub transform (stored as mealloop/hub5a). Body of async function(figma, args) -> report.
// args: { frameId, cfg } with cfg = { needs, decisions, banner, passes: [num, of, chip, frac], menu: { num|null, unit, filled },
//   vote: { chip, pct|null, num|null, unit }, rewards: [num, unit, frac], surplus: { text, done }, people: [num, unit] }.
// Keeps every tile node (ids and links), swaps the NavHeader for the tab-root header, replaces the NeedsYouCard with a
// slim black row, restyles labels (Inter) and word units (Inter, mono numbers), and redraws every visual from its data.
const { frameId, cfg } = args;
const AF = Object.getPrototypeOf(async function(){}).constructor;
const B = await new AF('figma', figma.root.getSharedPluginData('mealloop', 'ins3a'))(figma);
const f = await figma.getNodeByIdAsync(frameId); await B.loadAll(f);
const rep = { frame: f.name };
// header
const sos = await figma.getNodeByIdAsync('849:564'); f.fills = sos.fills;
const nav = f.children.find(n => n.name === 'Nav Header'); if (nav) nav.remove();
const hs = await figma.getNodeByIdAsync('1312:10850'); await B.loadAll(hs);
const hdr = hs.clone(); f.insertChild(1, hdr); hdr.x = 0; hdr.y = 54; await B.strip(hdr);
hdr.findOne(n => n.name === 'Title').characters = 'Manage';
const st = hdr.findOne(n => n.name === 'Subtitle'); await st.setTextStyleIdAsync(B.S('ML/Secondary').id); st.characters = 'Menu, votes, passes, rewards, people';
const c = f.children.find(n => /Content$/.test(n.name)); c.y = 182; c.itemSpacing = 12;
// needs-you card -> slim row
const ny = c.children.find(n => n.name === 'Needs you'); if (ny) ny.remove();
const banner = c.children.find(n => /banner/i.test(n.name));
if (banner) { await B.loadAll(banner); B.setP(banner, { Message: cfg.banner }); const t = banner.findOne(n => n.type === 'TEXT'); await B.loadAll(t); await t.setRangeTextStyleIdAsync(0, t.characters.length, B.S('ML/Footnote').id); await B.mono(t, 'ML/Footnote'); }
const row = figma.createAutoLayout('HORIZONTAL', { name: 'Row · Needs you', itemSpacing: 8 }); row.fills = [await B.paint(B.C.heroBg)]; row.cornerRadius = 22;
c.insertChild(banner ? 1 : 0, row); row.layoutSizingHorizontal = 'FILL'; row.resize(row.width, 44); row.layoutSizingVertical = 'FIXED';
row.paddingLeft = 20; row.paddingRight = 14; row.primaryAxisAlignItems = 'SPACE_BETWEEN'; row.counterAxisAlignItems = 'CENTER';
const lt = figma.createText(); row.appendChild(lt); lt.name = 'Count'; await lt.setTextStyleIdAsync(B.S('ML/Secondary Medium').id); lt.characters = cfg.needs; lt.fills = [await B.paint(B.C.onHero)]; await B.mono(lt, 'ML/Secondary Medium');
const right = figma.createAutoLayout('HORIZONTAL', { name: 'Decisions', itemSpacing: 2 }); right.fills = []; right.counterAxisAlignItems = 'CENTER'; row.appendChild(right);
const rt = figma.createText(); right.appendChild(rt); rt.name = 'Label'; await rt.setTextStyleIdAsync(B.S('ML/Secondary').id); rt.characters = 'Decisions'; rt.fills = [await B.paint(B.C.onHero2)];
const sym = await figma.getNodeByIdAsync('73:163'); const ch = sym.children.find(s => s.name === 'Name=chevron.right').createInstance(); right.appendChild(ch); ch.resize(16, 16);
for (const v of ch.findAll(n => n.type === 'VECTOR')) { v.strokes = [await B.paint(B.C.onHero2)]; }
const drill = (await figma.getNodeByIdAsync('1291:8351')).reactions[0].actions[0].transition;
await row.setReactionsAsync([{ trigger: { type: 'ON_CLICK' }, actions: [{ type: 'NODE', destinationId: cfg.decisions, navigation: 'NAVIGATE', transition: drill, resetScrollPosition: true, preserveScrollPosition: false }] }]);
// bento: equal columns, 12 pt gaps
const bento = c.children.find(n => n.name === 'Bento'); bento.itemSpacing = 12;
for (const r of bento.children.filter(n => /^Row/.test(n.name))) { r.itemSpacing = 12; for (const t of r.children) t.layoutSizingHorizontal = 'FILL'; }
const tile = nm => bento.findOne(n => n.name === 'Tile · ' + nm);
const ink = await B.paint(B.C.ink), ink2 = await B.paint(B.C.ink2);
// labels and units
const inInst = n => { let p = n.parent; while (p && p !== bento) { if (p.type === 'INSTANCE') return true; p = p.parent; } return false; };
for (const t of bento.findAll(n => n.type === 'TEXT' && n.name === 'Label' && !inInst(n))) { await t.setTextStyleIdAsync(B.S('ML/Footnote').id); t.fills = [ink2]; }
const setUnit = async (tl, text, style) => { const u = tl.findOne(n => n.name === 'Unit'); u.visible = true; await u.setTextStyleIdAsync(B.S(style || 'ML/Secondary').id); u.characters = text; u.fills = [ink2]; await B.mono(u, style || 'ML/Secondary'); return u; };
const setNum = (tl, v) => { const n = tl.findOne(x => x.name === 'Number'); if (v === null) { n.visible = false; } else { n.visible = true; n.characters = v; } };
const chip = async (tl, text) => { const lab = tl.findOne(n => n.name === 'Label' && n.type === 'TEXT' && !inInst(n)); let head = lab.parent.name === 'Label row' ? lab.parent : null;
  if (!head) { head = figma.createAutoLayout('HORIZONTAL', { name: 'Label row', itemSpacing: 8 }); head.fills = []; head.counterAxisAlignItems = 'CENTER'; const p = lab.parent; p.insertChild(p.children.indexOf(lab), head); head.appendChild(lab); }
  let cp = head.children.find(n => n.name === 'Chip'); if (!cp) { const set = await figma.getNodeByIdAsync('100:1079'); const v = set.children.find(x => x.name === 'Surface=Selected'); await B.loadAll(v); cp = v.createInstance(); head.appendChild(cp); cp.name = 'Chip'; }
  await B.loadAll(cp); B.setP(cp, { Label: text, 'Show Icon': false }); const t = cp.findOne(n => n.type === 'TEXT'); await B.loadAll(t); await B.mono(t, 'ML/Footnote'); return cp; };
// Passes
{ const t = tile('Passes'); const [num, of, ch2, frac] = cfg.passes; setNum(t, num); await setUnit(t, of); await chip(t, ch2);
  const used = t.findOne(n => n.name === 'Used'); if (frac > 0) { used.visible = true; used.arcData = { startingAngle: -Math.PI / 2, endingAngle: -Math.PI / 2 + frac * 2 * Math.PI, innerRadius: used.arcData.innerRadius }; } else used.visible = false;
  rep.passes = (frac * 100).toFixed(2) + '%'; }
// Menu
{ const t = tile('Menu'); const m = cfg.menu; setNum(t, m.num); await setUnit(t, m.unit, m.num === null ? 'ML/Secondary Medium' : 'ML/Secondary');
  const dots = t.findOne(n => n.name === 'Visual · dishes').children; dots.forEach((d, i) => { if (i < m.filled) { d.fills = [ink]; d.strokes = []; d.name = 'Dish · in tracker'; } else { d.fills = []; d.strokes = [ink2]; d.strokeWeight = 1.5; d.strokeAlign = 'INSIDE'; d.name = 'Dish · none yet'; } });
  rep.menu = m.filled + ' filled'; }
// Voting
{ const t = tile('Voting'); const v = cfg.vote; await chip(t, v.chip); setNum(t, v.num); await setUnit(t, v.unit, v.num === null ? 'ML/Secondary Medium' : 'ML/Secondary');
  const vis = t.findOne(n => n.name === 'Visual · for/against'); vis.layoutSizingHorizontal = 'FILL'; const W = vis.width; const fo = vis.children.find(n => n.name === 'For'), ag = vis.children.find(n => n.name === 'Against');
  if (v.pct === null && !fo) { for (const k of vis.children) { try { k.layoutSizingHorizontal = 'FILL'; } catch (e) {} } rep.vote = 'empty track ' + vis.children.map(k => k.name + ' ' + k.width).join(); } else if (v.pct === null) { fo.visible = false; const set = ag.mainComponent.parent; ag.swapComponent(set.children.find(x => x.name === 'Kind=Pill ghost')); ag.resize(W, ag.height); ag.name = 'No votes'; rep.vote = 'ghost ' + W; }
  else { fo.visible = true; const avail = W - vis.itemSpacing; fo.resize(+(avail * v.pct).toFixed(2), fo.height); ag.resize(+(avail * (1 - v.pct)).toFixed(2), ag.height); rep.vote = fo.width.toFixed(2) + '/' + ag.width.toFixed(2) + ' of ' + avail; } }
// Rewards (semicircle, flat side down)
{ const t = tile('Rewards'); const [num, unit, frac] = cfg.rewards; setNum(t, num); await setUnit(t, unit);
  const used = t.findOne(n => n.name === 'Used'); if (frac > 0) { used.visible = true; used.arcData = { startingAngle: Math.PI, endingAngle: Math.PI + frac * Math.PI, innerRadius: used.arcData.innerRadius }; } else used.visible = false;
  rep.rewards = (frac * 100).toFixed(2) + '% of the half circle'; }
// Surplus
{ const t = tile('Surplus'); const s = cfg.surplus; setNum(t, null); await setUnit(t, s.text, 'ML/Secondary Medium');
  const steps = t.findOne(n => n.name === 'Visual · pickup steps').children.filter(n => n.type === 'ELLIPSE'); steps.forEach((d, i) => { if (i < s.done) { d.fills = [ink]; d.strokes = []; d.name = 'Step ' + (i + 1) + ' · done'; } else { d.fills = []; d.strokes = [ink]; d.strokeWeight = 1.5; d.strokeAlign = 'INSIDE'; d.name = 'Step ' + (i + 1) + ' · to do'; } });
  rep.surplus = s.done + ' of 3'; }
// People: AD-7a role bar proportions (14/8/6/6/2/2 of 38) scaled to the tile; on-light ChartBar kinds (AD-7a's on-dark kinds vanish on white)
{ const t = tile('People'); const [num, unit] = cfg.people; setNum(t, num); await setUnit(t, unit);
  const vis = t.findOne(n => n.name === 'Visual · role mix'); vis.layoutSizingHorizontal = 'FILL'; const W = vis.width; const avail = W - vis.itemSpacing * 5;
  const KIND = { 'Kitchen staff · 14': ['Expected', 14], 'Scanners · 8': ['Off target', 8], 'Pass checkers · 6': ['Left on plates', 6], 'Supervisors · 6': ['Expected', 6], 'Food heads · 2': ['Off target', 2], 'Admins · 2': ['Left on plates', 2] };
  const ws = [];
  for (const seg of vis.children) { const [kind, n] = KIND[seg.name]; const set = seg.mainComponent.parent; const v = set.children.find(x => x.name === 'Kind=' + kind); if (seg.mainComponent !== v) seg.swapComponent(v); seg.resize(+(avail * n / 38).toFixed(2), seg.height); ws.push(seg.width.toFixed(2)); }
  rep.people = ws.join('/') + ' of ' + avail; }
f.numberOfFixedChildren = 5;
const vis = c.children.filter(n => n.visible); const last = vis[vis.length - 1];
rep.bottom = Math.round(c.y + last.y + last.height); rep.items = c.children.map(n => n.name + '@' + Math.round(c.y + n.y) + '+' + Math.round(n.height));
return rep;
