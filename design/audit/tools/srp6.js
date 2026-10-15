// Student-redesign P6 Community builder (stored as mealloop/srp6). Body of async function(figma, args).
// args {pageId, notes, issueCard, items:[{id?, x, y, name, kind:'list'|'issue', state}]}
// list states: Default, Sending, Backed, Failed, Offline, Fixed, Fixed empty, Empty, Loading, Info sheet
// issue states: Default, Sending, Backed, Offline, Hidden
const AF = Object.getPrototypeOf(async function(){}).constructor;
const S = await new AF('figma', 'args', figma.root.getSharedPluginData('mealloop', 'srh'))(figma, {});
const pg = await figma.getNodeByIdAsync(args.pageId); const out = [];
const OPEN = [['Long wait at counter 3 after 1 PM', 'Main Mess · updated 5 h ago', 2, 'Seen by the team', '64'], ['Sambar too watery at dinner', 'Main Mess · updated 2 d ago', 3, 'Fixing · the second batch now uses the same recipe', '38'], ['Curd runs out by 8:45 PM', 'Main Mess · updated 1 d ago', 1, 'Reported', '21'], ['Rice undercooked on Mondays', 'Main Mess · updated 3 d ago', 2, 'Seen · the team needs more details', '17']];
const FIXED = [['Cold idli at breakfast', 'Main Mess · fixed Mon 12 Aug', 4, 'Fixed · idli now comes out in smaller batches', '29'], ['Spoons missing at counter 2', 'Main Mess · fixed Sat 10 Aug', 4, 'Fixed · a spoon tray is kept at each counter', '12']];
const card = async (c, d, act) => { const k = await S.v(args.issueCard, { Action: act }, { Title: d[0], Meta: d[1], Status: d[3], Count: d[4] }, c); k.layoutSizingHorizontal = 'FILL'; k.name = 'IssueCard / ' + d[0];
  for (let i = 1; i <= 4; i++) { const r = k.findOne(n => n.name === 'Step ' + i); if (r) r.fills = [S.paint(i <= d[2] ? 'ink' : 'track')]; } return k; };
for (const it of args.items) {
  let f, c; const st = it.state;
  if (it.kind === 'list') {
    const o = { title: 'Community', subtitle: 'Problems students want fixed', tab: 'Community', time: '7:00' };
    if (it.id) { f = await figma.getNodeByIdAsync(it.id); ({ c } = await S.reframe(f, o)); } else ({ f, c } = await S.screen(pg, it.name, it.x, it.y, o));
    f.name = it.name; c.itemSpacing = 14;
    const nav = f.findOne(n => n.name === 'Nav Header'); const tk = Object.keys(nav.componentProperties).find(k => k.startsWith('Show Trailing#')); if (tk) nav.setProperties({ [tk]: true });
    const tr = nav.findOne(n => n.name === 'Icon' && n.type === 'INSTANCE'); if (tr) { const ic = nav.findAll(n => n.name === 'Icon' && n.type === 'INSTANCE'); const last = ic[ic.length - 1]; last.swapComponent(S.sym('info.circle')); }
    const fixedTab = /^Fixed/.test(st);
    const sg = await S.v('74:326', { Items: '2', Selected: fixedTab ? '2' : '1' }, { 'Label 1': 'Open', 'Label 2': 'Fixed' }, c); sg.layoutSizingHorizontal = 'FILL'; sg.name = 'Tabs';
    if (st === 'Offline') { const ob = await S.v(S.ID.offline, {}, { Message: "You're offline. Me too will send when you're back." }, c); ob.layoutSizingHorizontal = 'FILL'; ob.name = 'OfflineBanner'; }
    if (st === 'Loading') { for (let i = 0; i < 3; i++) { const r = figma.createFrame(); r.name = 'Skeleton / Card'; c.appendChild(r); r.layoutSizingHorizontal = 'FILL'; r.resize(353, 168); r.cornerRadius = 26; r.fills = [S.paint('track')]; } }
    else if (st === 'Empty' || st === 'Fixed empty') { const e = await S.v(S.ID.empty, {}, null, c); e.layoutSizingHorizontal = 'FILL'; e.name = 'EmptyState'; const set = {};
      for (const k of Object.keys(e.componentProperties)) { if (k.startsWith('Title')) set[k] = st === 'Empty' ? 'No open problems' : 'Nothing fixed yet'; if (k.startsWith('Body')) set[k] = st === 'Empty' ? 'When students report the same thing, it shows here.' : 'Fixed problems stay here for 30 days.'; if (k.startsWith('Show Action')) set[k] = false; } e.setProperties(set); }
    else if (fixedTab) { for (const d of FIXED) await card(c, d, 'Fixed'); const n = await S.text(c, 'Fixed problems stay here for 30 days.', 'ML/Footnote', 'ink-secondary', { w: 353 }); n.textAlignHorizontal = 'CENTER'; n.layoutSizingHorizontal = 'FILL'; }
    else { const act2 = { Sending: 'Sending', Backed: 'Backed', Failed: 'Failed' }[st] || 'Me too'; for (let i = 0; i < OPEN.length; i++) await card(c, OPEN[i], i === 1 ? act2 : 'Me too'); }
    if (!fixedTab && st !== 'Loading') { const b = await S.btn(c, 'Report a problem', 'Primary', 'fill', 60); b.name = 'Button / Report a problem'; }
    if (st === 'Info sheet') { f.numberOfFixedChildren = 0; const { sh, c: sc } = await S.sheet(f, 'How Community works', 'Medium');
      for (const [h, b] of [['Who sees it', 'Your mess food head and the mess team. Others see how many back a report, never who.'], ['What to write', 'The dish or the place, not a person.'], ['Same problem?', 'Tap Me too instead of a new report. You can undo it.']]) { const g = S.frame(sc, 'Info / ' + h, { gap: 2 }); g.layoutSizingHorizontal = 'FILL'; await S.text(g, h, 'ML/Body Semibold', 'ink'); const t = await S.text(g, b, 'ML/Secondary', 'ink-secondary', { w: 353 }); t.layoutSizingHorizontal = 'FILL'; }
      sh.resize(393, Math.max(420, sc.height + 120)); sh.y = 852 - sh.height; sc.y = sh.y + 72; const cl = sh.findOne(n => /close/i.test(n.name)); if (cl) await S.back(cl); }
  } else {
    const o = { title: 'Issue', inline: true, back: true, tab: 'Community', time: '7:00' };
    if (it.id) { f = await figma.getNodeByIdAsync(it.id); ({ c } = await S.reframe(f, o)); } else ({ f, c } = await S.screen(pg, it.name, it.x, it.y, o));
    f.name = it.name; c.itemSpacing = 14;
    const h = await S.text(c, OPEN[0][0], 'ML/Title', 'ink', { w: 353 }); h.layoutSizingHorizontal = 'FILL'; h.name = 'Issue title';
    await S.text(c, 'Main Mess · reported Mon 12 Aug', 'ML/Secondary', 'ink-secondary');
    if (st === 'Offline') { const ob = await S.v(S.ID.offline, {}, { Message: "You're offline. Me too will send when you're back." }, c); ob.layoutSizingHorizontal = 'FILL'; ob.name = 'OfflineBanner'; }
    if (st === 'Hidden') { const e = S.card(c, 'Hidden notice', { dir: 'H', gap: 12, fill: 'fill-quiet', stroke: 'border' }); S.icon(e, 'lock', 22, 'ink'); const t = await S.text(e, 'The mess team hid this report because it named a person. The count is kept.', 'ML/Secondary', 'ink'); t.layoutGrow = 1; t.textAutoResize = 'HEIGHT'; }
    const hero = S.frame(c, 'Backing hero', { gap: 12, fill: 'hero-bg', radius: 30 }); hero.layoutSizingHorizontal = 'FILL'; hero.paddingLeft = hero.paddingRight = hero.paddingTop = hero.paddingBottom = 24;
    const e = await S.text(hero, 'STUDENTS BACKING THIS', 'Label/Eyebrow', 'on-hero-secondary'); e.letterSpacing = { unit: 'PERCENT', value: 6 };
    const cr = S.frame(hero, 'Count', { dir: 'H', gap: 10 }); cr.counterAxisAlignItems = 'BASELINE'; await S.text(cr, st === 'Backed' ? '65' : '64', 'ML/Hero Metric', 'on-hero'); await S.text(cr, 'students', 'ML/Body', 'on-hero-secondary');
    const pr = S.frame(hero, 'Progress', { dir: 'H', gap: 6 }); pr.layoutSizingHorizontal = 'FILL';
    for (let i = 1; i <= 4; i++) { const r = figma.createRectangle(); r.name = 'Step ' + i; r.resize(70, 8); r.cornerRadius = 4; pr.appendChild(r); r.layoutGrow = 1; r.fills = [S.paint(i <= 2 ? 'lime' : 'on-hero')]; if (i > 2) r.opacity = 0.2; }
    const lb = S.frame(hero, 'Step labels', { dir: 'H', gap: 6 }); lb.layoutSizingHorizontal = 'FILL';
    for (const [i, l] of ['Reported', 'Seen', 'Fixing', 'Fixed'].entries()) { const t = await S.text(lb, l, i === 1 ? 'ML/Secondary Medium' : 'ML/Secondary', i === 1 ? 'on-hero' : 'on-hero-secondary'); t.layoutGrow = 1; }
    if (st !== 'Hidden') { const b = S.frame(hero, 'Button / Me too', { dir: 'H', gap: 8, radius: 30 }); b.layoutSizingHorizontal = 'FILL'; b.primaryAxisAlignItems = 'CENTER'; b.counterAxisAlignItems = 'CENTER'; b.counterAxisSizingMode = 'FIXED'; b.resize(305, 60);
      if (st === 'Backed') { b.fills = []; b.strokes = [S.paint('on-hero')]; b.strokeWeight = 1.5; S.icon(b, 'checkmark', 20, 'on-hero'); await S.text(b, 'Backed', 'ML/Body Semibold', 'on-hero'); const u = await S.text(hero, 'Undo', 'ML/Secondary Medium', 'on-hero'); u.textDecoration = 'UNDERLINE'; u.name = 'Undo'; }
      else { b.fills = [S.paint('lime')]; await S.text(b, st === 'Sending' ? 'Sending…' : 'Me too', 'ML/Body Semibold', 'on-lime'); if (st === 'Sending') b.opacity = 0.7; } }
    const ch = S.card(c, 'Wait chart', { gap: 6, stroke: null }); ch.paddingLeft = ch.paddingRight = 20; ch.paddingTop = ch.paddingBottom = 18;
    await S.text(ch, 'When the wait is longest · lunch', 'ML/Secondary', 'ink-secondary'); await S.text(ch, 'Peak at 1:15 PM, about 18 min', 'ML/Body Semibold', 'ink');
    const bars = S.frame(ch, 'Bars', { dir: 'H', gap: 10 }); bars.layoutSizingHorizontal = 'FILL'; bars.counterAxisAlignItems = 'MAX'; bars.counterAxisSizingMode = 'FIXED'; bars.resize(313, 92); bars.paddingTop = 8;
    [0.2, 0.3, 0.45, 0.6, 0.8, 0.98, 0.6, 0.35].forEach((v, i) => { const r = figma.createRectangle(); r.name = 'Bar ' + (i + 1); r.resize(30, Math.round(84 * v)); r.cornerRadius = 10; bars.appendChild(r); r.layoutGrow = 1; if (i === 5) { r.fills = [S.paint('lime')]; r.strokes = [S.paint('lime-outline')]; r.strokeWeight = 1.5; } else r.fills = [S.paint('ink')]; });
    const ax = S.frame(ch, 'Axis', { dir: 'H' }); ax.layoutSizingHorizontal = 'FILL'; ax.primaryAxisAlignItems = 'SPACE_BETWEEN'; for (const t of ['12:00', '1:00', '2:00']) await S.text(ax, t, 'ML/Metric Unit', 'ink-secondary');
    const tl = S.frame(c, 'Timeline', { gap: 6 }); tl.layoutSizingHorizontal = 'FILL'; tl.paddingLeft = 8;
    for (const [done, t] of [[true, 'Seen by the team · Tue 13 Aug, 3:10 PM'], [false, 'Next: the team picks an owner']]) { const r = S.frame(tl, 'Step / ' + t, { dir: 'H', gap: 12 }); r.counterAxisAlignItems = 'CENTER'; r.minHeight = 32; const d = figma.createEllipse(); d.resize(14, 14); r.appendChild(d); if (done) d.fills = [S.paint('ink')]; else { d.fills = []; d.strokes = [S.paint('ink')]; d.strokeWeight = 1.5; d.dashPattern = [2, 2]; } await S.text(r, t, 'ML/Body', 'ink'); }
    const cm = S.frame(c, 'Comments row', { dir: 'H', gap: 12 }); cm.layoutSizingHorizontal = 'FILL'; cm.counterAxisAlignItems = 'CENTER'; cm.minHeight = 48; cm.paddingLeft = 8; S.icon(cm, 'text.bubble', 22, 'ink'); const ct = await S.text(cm, '4 comments', 'ML/Body Semibold', 'ink'); ct.layoutGrow = 1; S.icon(cm, 'chevron.right', 18, 'ink-secondary');
    const n = await S.text(c, 'Me too counts you. You can undo it.', 'ML/Footnote', 'ink-secondary', { w: 353 }); n.textAlignHorizontal = 'CENTER'; n.layoutSizingHorizontal = 'FILL';
  }
  if (args.notes) { const near = pg.children.filter(n => n !== f && n.x >= f.x - 2 && n.x < f.x + 393 && ((n.y >= f.y - 80 && n.y < f.y) || (n.y >= f.y + 852 && n.y < f.y + 1010))); for (const n of near) n.remove(); await S.notes(f, it.name, 'Wed 14 Aug 2024, 7:00 AM'); }
  out.push(f.id + ' ' + f.name + ' h' + Math.round(c.height));
}
return out;
