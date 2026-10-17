// DOOR-SCANNER pack v2 · D6 page builders (stored as mealloop/ds2b). Body of async function(figma, args) -> D (extends dsb).
// D.sec2() section "Door Scanner · Alerts and Me (pack v2)" on page 09. D.alerts(name, x, o) Alerts page (D17):
//   o = { time, card: 'Not claimed'|'Claimed by you'|'Checked by you'|null, rows: [[kind, title, time, line]], seeAll: n, empty, back, title, sub }.
// D.me(name, x, o) Me page (D18). D.tabLinks(f, {Home, Alerts, Me}) links the StaffTabBar3 tabs. D.fixChrome(f) keeps chrome and hotspots fixed.
const D = await new (Object.getPrototypeOf(async function(){}).constructor)('figma','args',figma.root.getSharedPluginData('mealloop','dsb'))(figma,{});
D.sec2 = async () => D.section('Door Scanner · Alerts and Me (pack v2)', 17400, 4000);
D.fixChrome = f => { const c = f.findOne(n => n.name === 'Content'); const i = f.children.indexOf(c); f.numberOfFixedChildren = f.children.length - 1 - i; };
D.row2 = async (parent, kind, title, time, line) => { const set = await figma.getNodeByIdAsync(D.DS.alertRow); const v = set.children.find(c => c.name === 'Kind=' + kind); const i = v.createInstance(); parent.appendChild(i); i.layoutSizingHorizontal = 'FILL';
  const p = {}; for (const k of Object.keys(i.componentProperties)) { if (k.startsWith('Title')) p[k] = title; if (k.startsWith('Time') && time !== undefined) p[k] = time; if (k.startsWith('Line') && line !== undefined) p[k] = line; } i.setProperties(p); i.name = 'AlertRow / ' + title; return i; };
D.alerts = async (sec, name, x, o) => { o = o || {};
  const r = await D.screen(sec, name, x, 150, { title: o.title || 'Alerts', subtitle: o.sub || 'Main Mess · Lunch', back: !!o.back, tab: 'Alerts', time: o.time, gap: 24, moment: 'Wed 14 Aug 2024, ' + o.moment });
  const c = r.c; const out = { f: r.f, c, rows: {} };
  if (o.card) { const set = await figma.getNodeByIdAsync(D.DS.alertCard); const v = set.children.find(n => n.name === 'State=' + o.card); const i = v.createInstance(); c.appendChild(i); i.layoutSizingHorizontal = 'FILL'; i.name = 'SOSAlertCard'; out.card = i; }
  if (o.empty) { const e = D.frame(c, 'Empty', { gap: 8 }); e.layoutSizingHorizontal = 'FILL'; e.primaryAxisAlignItems = 'CENTER'; e.counterAxisAlignItems = 'CENTER'; e.primaryAxisSizingMode = 'FIXED'; e.resize(353, o.emptyH || 520);
    const ci = D.frame(e, 'Circle', { dir: 'H', radius: 32 }); ci.primaryAxisSizingMode = 'FIXED'; ci.counterAxisSizingMode = 'FIXED'; ci.resize(64, 64); ci.primaryAxisAlignItems = 'CENTER'; ci.counterAxisAlignItems = 'CENTER'; ci.strokes = [D.paint('ink')]; ci.strokeWeight = 1.5; ci.strokeAlign = 'INSIDE'; D.icon(ci, 'bell', 28, 'ink');
    const sp = D.frame(e, 'Spacer', {}); sp.resize(10, 8);
    await D.t(e, 'Nothing new', 'ML/Card Heading', 'ink', { name: 'Title', align: 'CENTER' });
    const s = await D.t(e, 'Alerts from your supervisor show here.', 'ML/Secondary', 'ink-secondary', { name: 'Sub', align: 'CENTER' }); s.textAutoResize = 'HEIGHT'; s.resize(300, s.height); s.textAlignHorizontal = 'CENTER'; }
  if (o.rows && o.rows.length) { const g = D.frame(c, 'Earlier', { gap: 8 }); g.layoutSizingHorizontal = 'FILL';
    if (o.group !== false) await D.t(g, o.group || 'Earlier', 'ML/Secondary Medium', 'ink-secondary', { name: 'Group label' });
    const list = D.frame(g, 'Rows', { gap: 0 }); list.layoutSizingHorizontal = 'FILL'; list.strokes = [D.paint('border')]; list.strokeTopWeight = 0; list.strokeLeftWeight = 0; list.strokeRightWeight = 0; list.strokeBottomWeight = 1; list.strokeAlign = 'INSIDE';
    for (const [k, t, tm, ln] of o.rows) out.rows[t] = await D.row2(list, k, t, tm, ln);
    if (o.seeAll) out.rows.seeAll = await D.row2(list, 'See all', 'See all · ' + o.seeAll + ' alerts'); }
  D.fixChrome(r.f); return out; };
D.me = async (sec, name, x, o) => { o = o || {};
  const r = await D.screen(sec, name, x, 150, { title: 'Me', tab: 'Me', time: o.time, gap: 24, moment: 'Wed 14 Aug 2024, ' + o.moment }); const c = r.c; const out = { f: r.f, c, rows: {} };
  const p = D.frame(c, 'Profile', { dir: 'H', gap: 20 }); p.layoutSizingHorizontal = 'FILL'; p.counterAxisAlignItems = 'CENTER';
  const av = D.frame(p, 'Avatar · SK', { dir: 'H', radius: 46, fill: 'hero-bg' }); av.primaryAxisSizingMode = 'FIXED'; av.counterAxisSizingMode = 'FIXED'; av.resize(92, 92); av.primaryAxisAlignItems = 'CENTER'; av.counterAxisAlignItems = 'CENTER';
  await D.t(av, 'SK', 'ML/Title', 'lime', { name: 'Initials' });
  const tx = D.frame(p, 'Text', { gap: 4 }); tx.layoutGrow = 1;
  await D.t(tx, 'Door Scanner', 'ML/Title', 'ink', { fill: true, name: 'Role' }); await D.t(tx, 'Main Mess', 'ML/Secondary', 'ink-secondary', { fill: true, name: 'Mess' });
  const sp = D.frame(tx, 'Spacer', {}); sp.resize(10, 4); const chip = await D.mealChip(tx, 'On shift · since 11:40 AM'); chip.name = 'Chip · On shift';
  const tiles = D.frame(c, 'Tiles', { dir: 'H', gap: 12 }); tiles.layoutSizingHorizontal = 'FILL';
  for (const [l, v] of [['Recorded in', '714'], ['Problems reported', '1']]) { const t = await D.ds(tiles, 'count', 'Size=Small', { Label: l, Value: v }); t.name = 'CountTile / ' + l; t.layoutSizingHorizontal = 'FILL'; t.layoutSizingVertical = 'FIXED'; t.resize(t.width, o.tileH || 110); }
  const list = D.frame(c, 'Rows', { gap: 0 }); list.layoutSizingHorizontal = 'FILL';
  out.rows.switch = await D.row(list, 'Switch role', null, undefined, { py: 16 });
  out.rows.lang = await D.row(list, 'Language', null, async rr => { await D.t(rr, 'English', 'ML/Secondary', 'ink-secondary', { name: 'Value' }); D.icon(rr, 'chevron.right', 18, 'ink-secondary'); }, { py: 16 });
  out.rows.help = await D.row(list, 'Help', null, undefined, { py: 16 });
  out.rows.signout = await D.row(list, 'Sign out', null, null, { py: 16, titleStyle: 'ML/Body Semibold' }); out.rows.signout.strokeBottomWeight = 1;
  D.fixChrome(r.f); return out; };
D.tabLinks = async (f, m) => { const tb = f.findOne(n => n.name === 'Tab Bar'); for (const [k, id] of Object.entries(m)) { const t = tb.findOne(n => n.name === 'Tab / ' + k); if (t && id) await D.go(t, id); } };
return D;
