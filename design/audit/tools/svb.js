// SUPERVISOR page builders (stored as mealloop/svb). Body of async function(figma, args) -> D (extends ktw / ktb / pdb / ds2b / dsb / dsh / adm).
// D.SV component IDs (mealloop/sv_ids); D.SF frame IDs (mealloop/sv_frames, D.saveS()). D.ssec(name, y, w) section on page 09.
// D.sinst(parent, key, variant, texts) instance of an sv_ids set (texts by property or layer name). D.rv(logoRow) RV initials in lime.
// D.stx(parent, status, label, time) StatusText instance. D.svhome(sec, name, x, o) Supervisor Home:
//   o = { state: 'Not started'|'In service'|'Closed', unavailable, waste: n, short: n, sos: 'Active'|'Claimed', offline, time, moment, chip }.
// D.dlg(f, lines, texts) scrim + ConfirmDialog at x 16, centred. D.svpage(sec, name, x, o) pushed page (back, large title).
// D.svalerts(sec, name, x, o) Alerts: o = { sos: SOSCard state, short: bool, waste: ['Closed'|'Entries'], empty, time, moment }.
// D.svpanel(f, state, o) SOS GlassSheet "SOS · 1 active" with an SOSPanel · Supervisor instance. D.svme(sec, name, x, o) Me (S16).
const D = await new (Object.getPrototypeOf(async function(){}).constructor)('figma','args',figma.root.getSharedPluginData('mealloop','ktw'))(figma,{});
D.SV = JSON.parse(figma.root.getSharedPluginData('mealloop','sv_ids') || '{}');
D.SF = JSON.parse(figma.root.getSharedPluginData('mealloop','sv_frames') || '{}');
D.saveS = () => figma.root.setSharedPluginData('mealloop','sv_frames', JSON.stringify(D.SF));
D.ssec = async (name, y, w) => D.section(name, y, w || 5400);
D.sinst = async (parent, key, variant, texts) => { const s = await figma.getNodeByIdAsync(D.SV[key]); const c = s.children.find(x => x.name === variant) || s.defaultVariant; const i = c.createInstance(); if (parent) parent.appendChild(i);
  if (texts) for (const [nm, v] of Object.entries(texts)) { const pk = Object.keys(i.componentProperties).find(k => k.split('#')[0] === nm); if (pk) i.setProperties({ [pk]: v }); else { const t = i.findOne(n => n.type === 'TEXT' && n.name === nm); if (t) await D.setText(t, v); } } return i; };
D.rv = async lr => { const av = lr.findOne(n => n.name.startsWith('Avatar')); av.name = 'Avatar · RV'; const t = av.findOne(n => n.type === 'TEXT'); await D.setText(t, 'RV'); t.name = 'RV'; t.fills = [D.paint('lime')]; return av; };
D.stx = async (parent, st, label, time) => { const s = await figma.getNodeByIdAsync(D.SV.statusText); const i = s.children.find(v => v.name === 'Status=' + st).createInstance(); parent.appendChild(i); i.name = 'StatusText';
  if (label) await D.setText(i.findOne(n => n.name === 'Label'), label);
  if (time) { const k = Object.keys(i.componentProperties).find(k => k.startsWith('Show time')); i.setProperties({ [k]: true }); await D.setText(i.findOne(n => n.name === 'Time'), time); } return i; };
D.offDot = async lr => { const av = lr.findOne(n => n.name.startsWith('Avatar')); const par = av.parent; const i = par.children.indexOf(av); const w = D.frame(null, 'Right', { dir: 'H', gap: 12 }); par.insertChild(i, w); w.counterAxisAlignItems = 'CENTER';
  const g = D.frame(w, 'Offline', { dir: 'H', gap: 6 }); g.counterAxisAlignItems = 'CENTER'; D.dot(g, 'done', 8); await D.t(g, 'Offline', 'ML/Footnote', 'ink-secondary', { name: 'Label' }); w.appendChild(av); return g; };
D.followRows = async (c, waste, short, order) => { const list = D.frame(c, 'Rows', { gap: 0 }); list.layoutSizingHorizontal = 'FILL'; const rows = {};
  const items = order === 'me' ? [['short', 'Active shortages', short], ['waste', 'Waste not recorded', waste]] : [['waste', 'Waste not recorded', waste], ['short', 'Active shortages', short]];
  for (const [k, l, n] of items) { const i = await D.sinst(list, 'followUp', n === null ? 'State=Unavailable' : 'State=Count', { Label: l }); if (n !== null) await D.setText(i.findOne(x => x.name === 'Count'), String(n)); i.layoutSizingHorizontal = 'FILL'; i.name = 'FollowUpRow / ' + l; rows[k] = i; }
  const lw = D.frame(list, 'Bottom rule', {}); lw.resize(353, 1); lw.layoutSizingHorizontal = 'FILL'; lw.fills = [D.paint('border')]; return { list, rows }; };
D.svhome = async (sec, name, x, o) => { o = o || {}; const st = o.state || 'In service';
  const time = o.time || (st === 'Not started' ? '11:55' : st === 'Closed' ? '2:05' : '1:40');
  const r = await D.screen(sec, name, x, 150, { noNav: true, tab: 'Home', time, gap: 12, moment: 'Wed 14 Aug 2024, ' + (o.moment || (/^1[01]:/.test(time) ? time + ' AM' : time + ' PM')) });
  const c = r.c; const out = { f: r.f, c }; const lr = await D.logoRow(c); out.avatar = await D.rv(lr); if (o.offline) out.offline = await D.offDot(lr);
  await D.titles(c, 'Lunch', 'Main Mess · 12–2 PM');
  if (st === 'Not started') out.status = await D.stx(c, 'Not started');
  if (st === 'In service') out.status = await D.mealChip(c, o.chip || 'In service · 1 h 40 min');
  if (st === 'Closed') out.status = await D.stx(c, 'Active', 'Closed ·', '2:00 PM');
  const card = await D.sinst(c, 'mealCard', 'State=' + (st === 'Closed' && o.unavailable ? 'Closed · Unavailable' : st)); card.name = 'MealCard'; card.layoutSizingHorizontal = 'FILL'; out.card = card;
  out.start = card.findOne(n => n.name === 'Button / Start meal'); out.close = card.findOne(n => n.name === 'Button / Close meal');
  const fr = await D.followRows(c, o.waste === undefined ? 1 : o.waste, o.short === undefined ? 1 : o.short); out.rows = fr.rows;
  if (o.sos) { const tab = await D.ds(r.f, 'sostab', 'State=' + o.sos); tab.name = 'SOSEdgeTab'; tab.x = 335; tab.y = 118; out.sos = tab; }
  D.fixChrome(r.f); return out; };
D.dlg = async (f, lines, texts) => { const sc = figma.createRectangle(); sc.name = 'Scrim'; sc.resize(393, 852); sc.fills = [D.paint('scrim')]; f.appendChild(sc);
  const d = await D.sinst(f, 'dialog', 'Lines=' + lines, texts); d.name = 'ConfirmDialog'; d.x = 16; d.y = Math.round((852 - d.height) / 2);
  const hi = f.findOne(n => n.name === 'Home Indicator'); if (hi) f.appendChild(hi); D.fixChrome(f);
  return { d, cancel: d.findOne(n => n.name === 'Button / Cancel'), action: d.findOne(n => n.name.startsWith('Button / ') && n.name !== 'Button / Cancel') }; };
D.svpage = async (sec, name, x, o) => { o = o || {};
  const r = await D.screen(sec, name, x, 150, { title: o.title, subtitle: o.sub, back: true, tab: o.tab, time: o.time || '2:05', gap: o.gap === undefined ? 16 : o.gap, moment: 'Wed 14 Aug 2024, ' + (o.moment || ((o.time || '2:05') + ' PM')) }); return r; };
D.group = async (c, label) => { const g = D.frame(c, 'Group / ' + label, { gap: 8 }); g.layoutSizingHorizontal = 'FILL'; await D.t(g, label, 'ML/Secondary Medium', 'ink-secondary', { name: 'Group label' });
  const list = D.frame(g, 'Rows', { gap: 0 }); list.layoutSizingHorizontal = 'FILL'; list.strokes = [D.paint('border')]; list.strokeTopWeight = 0; list.strokeLeftWeight = 0; list.strokeRightWeight = 0; list.strokeBottomWeight = 1; list.strokeAlign = 'INSIDE'; return { g, list }; };
D.svalerts = async (sec, name, x, o) => { o = o || {}; const time = o.time || '2:05';
  const r = await D.screen(sec, name, x, 150, { title: 'Alerts', subtitle: 'Main Mess', tab: 'Alerts', time, gap: 24, moment: 'Wed 14 Aug 2024, ' + (o.moment || time + ' PM') });
  const c = r.c; const out = { f: r.f, c, waste: [] };
  if (o.sos) { const k = await D.sinst(c, 'sosCard', 'State=' + o.sos); k.name = 'SOSCard'; k.layoutSizingHorizontal = 'FILL'; out.card = k; }
  if (o.empty) { const e = D.frame(c, 'Empty', { gap: 8 }); e.layoutSizingHorizontal = 'FILL'; e.primaryAxisAlignItems = 'CENTER'; e.counterAxisAlignItems = 'CENTER'; e.primaryAxisSizingMode = 'FIXED'; e.resize(353, 520);
    const ci = D.frame(e, 'Circle', { dir: 'H', radius: 46 }); ci.primaryAxisSizingMode = 'FIXED'; ci.counterAxisSizingMode = 'FIXED'; ci.resize(92, 92); ci.primaryAxisAlignItems = 'CENTER'; ci.counterAxisAlignItems = 'CENTER'; ci.strokes = [D.paint('ink')]; ci.strokeWeight = 1.5; ci.strokeAlign = 'INSIDE'; D.ico(ci, 'check', 44, 'ink', 1.5);
    const sp = D.frame(e, 'Spacer', {}); sp.resize(10, 16);
    await D.t(e, 'You\'re all caught up', 'ML/Title', 'ink', { name: 'Title', align: 'CENTER' });
    const s = await D.t(e, 'No active shortages or missing waste reports.', 'ML/Body', 'ink-secondary', { name: 'Sub', align: 'CENTER' }); s.textAutoResize = 'HEIGHT'; s.resize(260, s.height); s.textAlignHorizontal = 'CENTER'; }
  if (o.short) { const g = await D.group(c, 'Shortages'); const i = await D.sinst(g.list, 'shortageRow', 'State=Active'); i.layoutSizingHorizontal = 'FILL'; i.name = 'ShortageRow / Steamed Rice'; out.short = i; out.shortGroup = g.g; }
  if (o.waste && o.waste.length) { const g = await D.group(c, 'Waste not recorded'); out.wasteGroup = g.g;
    for (const w of o.waste) { const i = await D.sinst(g.list, 'wasteRow', 'Line=' + w); i.layoutSizingHorizontal = 'FILL'; i.name = 'WasteRow / ' + (w === 'Closed' ? 'Lunch · Wed 14' : 'Dinner · Tue 13'); out.waste.push(i); } }
  D.fixChrome(r.f); return out; };
D.svpanel = async (f, state) => { const s = await D.sheet(f, 'SOS · 1 active'); const p = await D.sinst(s.c, 'sosPanel', 'State=' + state); p.name = 'SOSPanel · Supervisor'; p.layoutSizingHorizontal = 'FILL'; D.fitSheet(f);
  const btn = l => p.findOne(n => n.name === 'Button / ' + l); return { s, p, btn, close: D.closeOf(f) }; };
D.svme = async (sec, name, x, o) => { o = o || {};
  const r = await D.screen(sec, name, x, 150, { title: 'Me', tab: 'Me', time: o.time || '2:05', gap: 24, moment: 'Wed 14 Aug 2024, ' + (o.moment || ((o.time || '2:05') + ' PM')) }); const c = r.c; const out = { f: r.f, c };
  const p = D.frame(c, 'Profile', { dir: 'H', gap: 24 }); p.layoutSizingHorizontal = 'FILL'; p.counterAxisAlignItems = 'CENTER';
  const av = D.frame(p, 'Avatar · RV', { dir: 'H', radius: 46, fill: 'hero-bg' }); av.primaryAxisSizingMode = 'FIXED'; av.counterAxisSizingMode = 'FIXED'; av.resize(92, 92); av.primaryAxisAlignItems = 'CENTER'; av.counterAxisAlignItems = 'CENTER';
  await D.t(av, 'RV', 'ML/Title', 'lime', { name: 'Initials' });
  const tx = D.frame(p, 'Text', { gap: 4 }); tx.layoutGrow = 1; await D.t(tx, 'Ravi', 'ML/Title', 'ink', { fill: true, name: 'Name' }); await D.t(tx, 'Supervisor · Main Mess', 'ML/Secondary', 'ink-secondary', { fill: true, name: 'Role' });
  const l1 = D.frame(c, 'Rows / History', { gap: 0 }); l1.layoutSizingHorizontal = 'FILL'; l1.strokes = [D.paint('border')]; l1.strokeTopWeight = 0; l1.strokeLeftWeight = 0; l1.strokeRightWeight = 0; l1.strokeBottomWeight = 1; l1.strokeAlign = 'INSIDE';
  out.history = await D.qrow(l1, 'Meal history', null, { style: 'ML/Body Semibold' });
  const g = D.frame(c, 'Group / Follow-ups', { gap: 8 }); g.layoutSizingHorizontal = 'FILL'; await D.t(g, 'Follow-ups', 'ML/Secondary Medium', 'ink-secondary', { name: 'Group label' });
  const fr = await D.followRows(g, o.waste === undefined ? 2 : o.waste, o.short === undefined ? 1 : o.short, 'me'); out.rows = fr.rows;
  const l2 = D.frame(c, 'Rows / Sign out', { gap: 0 }); l2.layoutSizingHorizontal = 'FILL'; l2.strokes = [D.paint('border')]; l2.strokeTopWeight = 0; l2.strokeLeftWeight = 0; l2.strokeRightWeight = 0; l2.strokeBottomWeight = 1; l2.strokeAlign = 'INSIDE';
  out.signout = await D.row(l2, 'Sign out', null, null, { py: 16, titleStyle: 'ML/Body Semibold' });
  D.fixChrome(r.f); return out; };
return D;
