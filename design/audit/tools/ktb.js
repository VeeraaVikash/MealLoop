// KITCHEN page builders (stored as mealloop/ktb). Body of async function(figma, args) -> D (extends pdb / ds2b / dsb / dsh / adm).
// D.K component IDs (mealloop/kt_ids); D.KF frame IDs (mealloop/kt_frames, D.saveK()). D.ksec(name, y, w) section on page 09.
// D.kinst(parent, key, variant, texts) instance of a kt_ids set (texts by layer name). D.ak(logoRow) AK initials in lime.
// D.kbase(sec, name, x, o) Kitchen page with logo row + "Lunch" title (Home family). D.khome(sec, name, x, o) Home:
//   o = { state: 'Before'|'During'|'After', hc: ForecastCard state, live: LiveCard state, short: [[state, title, time]], seeAll, waste: 'Not started'|'Draft'|'Recorded', offline, sos, time, moment }.
//   Pack v2: ForecastCard before the meal, "Final entries" with no note, StatusText (dot + text) on the waste card, "You can edit until 8:40 PM." when Recorded.
// D.kpage(sec, name, x, o) pushed page (back, large title, no tab unless o.tab). D.bar(f, left, right) the K06 bottom bar (outline + black).
// D.mix(parent, name, parts, sans, mono, colour) words in sans and times in mono on one baseline.
const D = await new (Object.getPrototypeOf(async function(){}).constructor)('figma','args',figma.root.getSharedPluginData('mealloop','pdb'))(figma,{});
D.K = JSON.parse(figma.root.getSharedPluginData('mealloop','kt_ids') || '{}');
D.KF = JSON.parse(figma.root.getSharedPluginData('mealloop','kt_frames') || '{}');
D.saveK = () => figma.root.setSharedPluginData('mealloop','kt_frames', JSON.stringify(D.KF));
D.ksec = async (name, y, w) => D.section(name, y, w || 8000);
D.kinst = async (parent, key, variant, texts) => { const s = await figma.getNodeByIdAsync(D.K[key]); const c = s.children.find(x => x.name === variant) || s.defaultVariant; const i = c.createInstance(); if (parent) parent.appendChild(i);
  if (texts) for (const [nm, v] of Object.entries(texts)) { const pk = Object.keys(i.componentProperties).find(k => k.split('#')[0] === nm); if (pk) i.setProperties({ [pk]: v }); else { const t = i.findOne(n => n.type === 'TEXT' && n.name === nm); if (t) await D.setText(t, v); } } return i; };
D.mix = async (parent, name, parts, sans, mono, colour) => { const r = D.frame(parent, name, { dir: 'H', gap: 4 }); r.counterAxisAlignItems = 'BASELINE';
  for (const [tx, m] of parts) await D.t(r, tx, m ? mono : sans, colour, { name: m ? 'Time' : 'Words' }); return r; };
D.ak = async lr => { const av = lr.findOne(n => n.name.startsWith('Avatar')); av.name = 'Avatar · AK'; const t = av.findOne(n => n.type === 'TEXT'); await D.setText(t, 'AK'); t.name = 'AK'; t.fills = [D.paint('lime')]; return av; };
D.kbase = async (sec, name, x, o) => { o = o || {};
  const r = await D.screen(sec, name, x, 150, { noNav: true, tab: o.tab === false ? undefined : (o.tab || 'Home'), time: o.time || '1:40', gap: 12, moment: 'Wed 14 Aug 2024, ' + (o.moment || ((o.time || '1:40') + ' PM')) });
  const lr = await D.logoRow(r.c); await D.ak(lr); await D.titles(r.c, o.title || 'Lunch', o.sub || 'Main Mess · 12–2 PM'); return r; };
D.closedCard = async (c, o) => { const h = D.hero(c, 'Meal closed card'); h.cornerRadius = 28; h.paddingLeft = h.paddingRight = h.paddingTop = h.paddingBottom = 20; h.itemSpacing = 6;
  const e = D.frame(h, 'Eyebrow', { dir: 'H', gap: 8 }); e.counterAxisAlignItems = 'CENTER'; D.dot(e, 'lime', 10); await D.t(e, 'MEAL CLOSED', 'ML/Tag', 'on-hero-secondary', { name: 'Eyebrow', ls: 6 });
  await D.t(h, 'Lunch has ended', 'ML/Title', 'on-hero', { fill: true, name: 'Title' }); const sp = D.frame(h, 'Spacer', {}); sp.resize(10, 8);
  await D.t(h, 'Final entries', 'ML/Secondary', 'on-hero-secondary', { fill: true, name: 'Label' });
  const v = D.frame(h, 'Value', { dir: 'H', gap: 12 }); v.layoutSizingHorizontal = 'FILL'; v.counterAxisAlignItems = 'MAX'; await D.t(v, o && o.count || '774', 'ML/Hero Metric', 'on-hero', { name: 'Count' }); return h; };
D.wasteCard = async (c, st) => { const k = D.card(c, 'Waste report card', { gap: 12, radius: 24 });
  const hd = D.frame(k, 'Header', { dir: 'H', gap: 12 }); hd.layoutSizingHorizontal = 'FILL'; hd.counterAxisAlignItems = 'CENTER'; const t = await D.t(hd, 'Waste report', 'ML/Card Heading', 'ink', { name: 'Title' }); t.layoutGrow = 1;
  const ch = await D.kinst(hd, 'statusText', 'Status=' + st); ch.name = 'StatusText';
  if (st === 'Recorded') { const pk = Object.keys(ch.componentProperties).find(k => k.startsWith('Show time')); ch.setProperties({ [pk]: true }); await D.setText(ch.findOne(n => n.name === 'Label'), 'Recorded ·'); await D.setText(ch.findOne(n => n.name === 'Time'), '2:40 PM'); }
  let b;
  if (st === 'Not started') b = await D.btn(k, 'Record waste', 'black', { h: 56 });
  if (st === 'Draft') { await D.mix(k, 'Progress', [['6 of 8 done · saved', 0], ['2:05 PM', 1]], 'ML/Secondary', 'ML/Mono Body', 'ink-secondary'); b = await D.btn(k, 'Continue', 'black', { h: 56 }); }
  if (st === 'Recorded') { await D.mix(k, 'Edit window', [['You can edit until', 0], ['8:40 PM.', 1]], 'ML/Secondary', 'ML/Mono Body', 'ink-secondary'); b = await D.btn(k, 'View report', 'outline', { h: 56 }); }
  b.name = 'Button / ' + b.children[0].characters; return { k, b }; };
D.khome = async (sec, name, x, o) => { o = o || {}; const st = o.state || 'During';
  const time = o.time || (st === 'Before' ? '11:30' : st === 'After' ? '2:05' : '1:40');
  const r = await D.kbase(sec, name, x, { time, moment: o.moment || (/^1[01]:/.test(time) ? time + ' AM' : time + ' PM'), sub: st === 'After' ? 'Main Mess · ended 2:00 PM' : 'Main Mess · 12–2 PM' }); const c = r.c; const out = { f: r.f, c, short: [] };
  if (o.offline) { const b = await D.inst(c, '75:187', {}, { Message: 'No connection. The count and reports can\'t update.' }); b.layoutSizingHorizontal = 'FILL'; b.name = 'Offline banner'; }
  if (st === 'Before') { const h = await D.kinst(c, 'forecast', 'State=' + (o.hc || 'Ready')); h.name = 'ForecastCard'; h.layoutSizingHorizontal = 'FILL'; out.card = h;
    const list = D.frame(c, 'Rows', { gap: 0 }); list.layoutSizingHorizontal = 'FILL'; out.menu = await D.qrow(list, 'Menu for Lunch'); out.past = await D.qrow(list, 'Past meals'); out.past.strokeBottomWeight = 1; }
  if (st === 'During') { await D.mealChip(c, 'Meal in progress · 1 h 40 min');
    const l = await D.kinst(c, 'liveCard', 'State=' + (o.live || 'Live')); l.name = 'LiveCard'; l.layoutSizingHorizontal = 'FILL'; out.card = l; out.pill = l.findOne(n => n.name === 'Button / Report food running short');
    if (o.short && o.short.length) { const g = D.frame(c, 'Shortage reports', { gap: 8 }); g.layoutSizingHorizontal = 'FILL';
      for (const [s, title, tm] of o.short) { const i = await D.kinst(g, 'shortageRow', 'State=' + s, { Title: title }); i.layoutSizingHorizontal = 'FILL'; i.name = 'ShortageRow / ' + title; if (tm) { const t = i.findOne(n => n.type === 'TEXT' && n.name === 'Time'); if (t) await D.setText(t, tm); } out.short.push(i); }
      if (o.seeAll) { const a = D.frame(g, 'Link / See all', { dir: 'H' }); a.layoutSizingHorizontal = 'FILL'; a.counterAxisSizingMode = 'FIXED'; a.resize(353, 44); a.counterAxisAlignItems = 'CENTER'; const t = await D.t(a, o.seeAll, 'ML/Body Semibold', 'ink', { name: 'Label' }); t.textDecoration = 'UNDERLINE'; out.seeAll = a; } }
    const list = D.frame(c, 'Rows', { gap: 0 }); list.layoutSizingHorizontal = 'FILL'; out.past = await D.qrow(list, 'Past meals'); out.past.strokeBottomWeight = 1;
    if (o.sos) { const tab = await D.ds(r.f, 'sostab', 'State=' + o.sos); tab.name = 'SOSEdgeTab'; tab.x = 335; tab.y = 118; out.sos = tab; } }
  if (st === 'After') { await D.closedCard(c); const w = await D.wasteCard(c, o.waste || 'Not started'); out.waste = w.b;
    const list = D.frame(c, 'Rows', { gap: 0 }); list.layoutSizingHorizontal = 'FILL'; out.past = await D.qrow(list, 'Past meals'); out.past.strokeBottomWeight = 1; }
  D.fixChrome(r.f); return out; };
D.kpage = async (sec, name, x, o) => { o = o || {};
  const r = await D.screen(sec, name, x, 150, { title: o.title, subtitle: o.sub, back: true, tab: o.tab, time: o.time || '2:05', gap: o.gap === undefined ? 12 : o.gap, moment: 'Wed 14 Aug 2024, ' + (o.moment || ((o.time || '2:05') + ' PM')) }); return r; };
D.bar = async (f, left, right) => { const b = D.frame(f, 'Bottom bar', { dir: 'H', gap: 8, fill: 'surface', radius: 38 }); b.primaryAxisSizingMode = 'FIXED'; b.counterAxisSizingMode = 'AUTO'; b.resize(361, 76); b.paddingLeft = b.paddingRight = b.paddingTop = b.paddingBottom = 10; b.counterAxisAlignItems = 'CENTER';
  b.strokes = [D.paint('border')]; b.strokeWeight = 1; b.strokeAlign = 'INSIDE';
  const l = await D.btn(b, left, 'outline', { h: 56, w: 140 }); l.name = 'Button / ' + left; const rr = await D.btn(b, right, 'black', { h: 56 }); rr.name = 'Button / ' + right; rr.layoutSizingHorizontal = 'FILL';
  b.x = 16; b.y = 852 - 34 - b.height; const c = f.findOne(n => n.name === 'Content'); if (c) c.paddingBottom = 852 - b.y + 16;
  const names = ['Status Bar', 'Nav Header', 'Bottom bar', 'Home Indicator']; const ch = f.children.filter(n => names.includes(n.name)); for (const n of ch) f.appendChild(n); f.numberOfFixedChildren = ch.length; return { b, left: l, right: rr }; };
return D;
