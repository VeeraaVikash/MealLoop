// PASS-DESK page builders (stored as mealloop/pdb). Body of async function(figma, args) -> D (extends ds2b / dsb / dsh / adm).
// D.PD component IDs (mealloop/pd_ids); D.P frame IDs (mealloop/pd_frames, D.saveP()). D.psec(name, y) section on page 09 (5000 wide).
// D.pbase(sec, name, x, o) Pass Desk page with logo row + "Lunch" title (Home family). D.phome(sec, name, x, o) Home:
//   o = { state: 'Before'|'During'|'After', count: 41, kp: 'Empty'|'Typing'|'Checking'|'Not found', digits: [..4], offline, sos: 'Active'|'Claimed', time }.
// D.navCard(c, icon, title, sub) quiet card row; D.qrow(list, title, right, o) quiet list row; D.presult(sec, name, x, o) result page with PassResultScreen.
// D.kp(f) / D.key(f, d) find the HomeKeypad instance and a key in it. D.closeOf(f) Close button of a GlassSheet.
const D = await new (Object.getPrototypeOf(async function(){}).constructor)('figma','args',figma.root.getSharedPluginData('mealloop','ds2b'))(figma,{});
D.PD = JSON.parse(figma.root.getSharedPluginData('mealloop','pd_ids') || '{}');
D.P = JSON.parse(figma.root.getSharedPluginData('mealloop','pd_frames') || '{}');
D.saveP = () => figma.root.setSharedPluginData('mealloop','pd_frames', JSON.stringify(D.P));
D.psec = async (name, y) => D.section(name, y, 5000);
D.pinst = async (parent, key, variant, texts) => { const s = await figma.getNodeByIdAsync(D.PD[key]); const c = s.children.find(x => x.name === variant) || s.defaultVariant; const i = c.createInstance(); if (parent) parent.appendChild(i);
  if (texts) for (const [nm, v] of Object.entries(texts)) { const t = i.findOne(n => n.type === 'TEXT' && n.name === nm); if (t) await D.setText(t, v); } return i; };
D.navCard = async (c, icon, title, sub) => { const r = D.frame(c, 'Row / ' + title, { dir: 'H', gap: 14, fill: 'surface', radius: 24 }); r.layoutSizingHorizontal = 'FILL'; r.paddingLeft = r.paddingRight = 16; r.paddingTop = r.paddingBottom = 16; r.counterAxisAlignItems = 'CENTER';
  const ci = D.frame(r, 'Circle', { dir: 'H', radius: 22, fill: 'fill-quiet' }); ci.primaryAxisSizingMode = 'FIXED'; ci.counterAxisSizingMode = 'FIXED'; ci.resize(44, 44); ci.primaryAxisAlignItems = 'CENTER'; ci.counterAxisAlignItems = 'CENTER'; D.icon(ci, icon, 22, 'ink');
  const tx = D.frame(r, 'Text', { gap: 2 }); tx.layoutGrow = 1; await D.t(tx, title, 'ML/Body Semibold', 'ink', { fill: true, name: 'Label' }); if (sub) await D.t(tx, sub, 'ML/Secondary', 'ink-secondary', { fill: true, name: 'Sub' });
  D.icon(r, 'chevron.right', 20, 'ink-secondary'); return r; };
D.qrow = async (list, title, right, o) => { o = o || {}; const r = await D.row(list, title, null, right ? async rr => { await D.t(rr, right, o.mono ? 'ML/Code' : 'ML/Secondary', o.mono ? 'ink' : 'ink-secondary', { name: 'Value' }); D.icon(rr, 'chevron.right', 18, 'ink-secondary'); } : undefined, { py: 16, titleStyle: o.style || 'ML/Body' }); const tx = r.findOne(n => n.name === 'Text'); if (tx) tx.itemSpacing = 0; return r; };
D.pbase = async (sec, name, x, o) => { o = o || {};
  const r = await D.screen(sec, name, x, 150, { noNav: true, tab: o.tab === false ? undefined : 'Home', noTab: o.tab === false, time: o.time || '12:50', gap: 12, moment: 'Wed 14 Aug 2024, ' + (o.moment || o.time || '12:50') });
  await D.logoRow(r.c); await D.titles(r.c, 'Lunch', o.sub || 'Main Mess · Special meal'); return r; };
D.phome = async (sec, name, x, o) => { o = o || {}; const st = o.state || 'During';
  const time = o.time || (st === 'Before' ? '11:50' : st === 'After' ? '2:05' : '12:50');
  const r = await D.pbase(sec, name, x, { time, moment: o.moment || (time.startsWith('11') ? time + ' AM' : time + ' PM'), sub: st === 'After' ? 'Main Mess · special meal ended 2:00 PM' : 'Main Mess · Special meal' }); const c = r.c; const out = { f: r.f, c };
  if (o.offline) { const b = await D.inst(c, '75:187', {}, { Message: 'No connection. Passes can\'t be checked.' }); b.layoutSizingHorizontal = 'FILL'; b.name = 'Offline banner'; }
  if (st === 'Before') { const h = D.hero(c, 'Before card'); h.cornerRadius = 32; h.paddingLeft = h.paddingRight = 24; h.paddingTop = h.paddingBottom = 24; h.itemSpacing = 20; h.primaryAxisAlignItems = 'CENTER'; h.counterAxisAlignItems = 'CENTER'; h.primaryAxisSizingMode = 'FIXED'; h.resize(353, o.cardH || 260);
    D.icon(h, 'ticket', 56, 'on-hero-secondary'); await D.t(h, 'Checking opens at 12:00 PM', 'ML/Section', 'on-hero', { name: 'Line', align: 'CENTER' });
    out.lookup = await D.navCard(c, 'magnifyingglass', 'Look up a student', 'Status only. Nothing is recorded.'); out.request = await D.navCard(c, 'arrow.right', 'Request a new pass'); out.report = await D.navCard(c, 'exclamationmark.triangle', 'Report a problem'); }
  if (st === 'During') { await D.mealChip(c, 'Meal in progress · ' + (o.count || 41) + ' of 214');
    const kp = await D.pinst(c, 'homeKeypad', 'State=' + (o.kp || 'Empty')); kp.name = 'HomeKeypad'; kp.layoutSizingHorizontal = 'FILL'; out.kp = kp;
    if (o.digits) for (let i = 0; i < 4; i++) { const t = kp.findOne(n => n.name === 'Digit ' + (i + 1)); if (t) await D.setText(t, o.digits[i] || ''); }
    const list = D.frame(c, 'Rows', { gap: 0 }); list.layoutSizingHorizontal = 'FILL'; out.request = await D.qrow(list, 'Request a new pass'); out.report = await D.qrow(list, 'Report a problem'); out.report.strokeBottomWeight = 1;
    if (o.sos) { const tab = await D.ds(r.f, 'sostab', 'State=' + o.sos); tab.name = 'SOSEdgeTab'; tab.x = 335; tab.y = 118; } }
  if (st === 'After') { const h = D.hero(c, 'Meal ended card'); h.cornerRadius = 32; h.paddingLeft = h.paddingRight = 24; h.paddingTop = h.paddingBottom = 24; h.itemSpacing = 6;
    const e = D.frame(h, 'Eyebrow', { dir: 'H', gap: 8 }); e.counterAxisAlignItems = 'CENTER'; D.dot(e, 'lime', 10); await D.t(e, 'Meal ended', 'ML/Tag', 'on-hero-secondary', { name: 'Eyebrow' });
    await D.t(h, 'Lunch special has ended', 'ML/Title', 'on-hero', { fill: true, name: 'Title' }); await D.t(h, 'Checking is closed.', 'ML/Secondary', 'on-hero-secondary', { fill: true, name: 'Sub' });
    const sp = D.frame(h, 'Spacer', {}); sp.resize(10, 14); await D.t(h, 'Special meals recorded', 'ML/Secondary', 'on-hero-secondary', { name: 'Label' });
    const vr = D.frame(h, 'Value', { dir: 'H', gap: 10 }); vr.counterAxisAlignItems = 'BASELINE'; await D.t(vr, '196', 'ML/Hero Metric', 'on-hero', { name: 'Value' }); await D.t(vr, 'of 214', 'ML/Metric Unit', 'on-hero-secondary', { name: 'Unit' });
    const list = D.frame(c, 'Rows', {}); list.layoutSizingHorizontal = 'FILL'; out.requests = await D.qrow(list, 'New pass requests', '1 waiting'); out.problems = await D.qrow(list, 'Open problems', '0', { mono: true }); out.report = await D.qrow(list, 'Report a problem'); out.report.strokeBottomWeight = 1; }
  D.fixChrome(r.f); return out; };
D.kp = f => f.findOne(n => n.name === 'HomeKeypad');
D.key = (f, d) => { const k = D.kp(f); return k ? k.findOne(n => n.name === 'Key · ' + d) : null; };
D.closeOf = f => { const sh = f.findOne(n => n.name === 'Sheet'); return sh ? sh.findOne(n => /^Close/.test(n.name) && n.type !== 'TEXT') : null; };
D.presult = async (sec, name, x, o) => { o = o || {}; const lime = o.kind === 'Verified';
  const r = await D.screen(sec, name, x, 150, { noNav: !o.back, back: !!o.back, inline: true, title: '', time: o.time || '12:50', backdrop: lime ? 'None' : undefined, moment: 'Wed 14 Aug 2024, ' + (o.moment || ((o.time || '12:50') + ' PM')) });
  const c = r.c; c.itemSpacing = o.gap || 24; if (lime) { const ob = r.f.findOne(n => n.name === 'OrbitBackdrop'); if (ob) ob.remove(); r.f.fills = [D.paint('lime')]; c.paddingTop = 24; await D.t(c, 'Pass Desk · Lunch special', 'ML/Secondary', 'on-lime', { name: 'Context' }); }
  const h = await D.pinst(c, 'passResult', 'Kind=' + o.kind, { Title: o.title, Subtitle: o.sub }); h.name = 'PassResultScreen'; h.layoutSizingHorizontal = 'FILL';
  if (o.build) await o.build(c, r.f);
  const out = { f: r.f, c };
  if (o.primary) out.primary = await D.absBtn(r.f, o.primary, 'black', 754);
  if (o.secondary) out.secondary = await D.absBtn(r.f, o.secondary, 'outline', 682);
  const names = ['Status Bar', 'Nav Header', 'Home Indicator']; const ch = r.f.children.filter(n => names.includes(n.name)); for (const n of ch) r.f.appendChild(n); r.f.numberOfFixedChildren = ch.length;
  return out; };
D.note = async (c, text, align) => { const t = await D.t(c, text, 'ML/Secondary', 'ink-secondary', { fill: true, name: 'Note' }); t.textAlignHorizontal = align || 'CENTER'; return t; };
return D;
