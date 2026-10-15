// Student-redesign P9 builder (stored as mealloop/srp9). Body of async function(figma, args).
// args {pageId, notes, items:[{kind, state, id?, x, y, name}]}
// kinds: you, notif, credits, ticket, attendance, spending, help.  states per kind: Default, Loading, Offline, Error, Empty, Sending, Failed, Used, Saved
const AF = Object.getPrototypeOf(async function(){}).constructor;
const S = await new AF('figma', 'args', figma.root.getSharedPluginData('mealloop', 'srh'))(figma, {});
const pg = await figma.getNodeByIdAsync(args.pageId); const out = [];
const empty = async (c, t, b, act) => { const e = await S.v(S.ID.empty, {}, null, c); e.layoutSizingHorizontal = 'FILL'; e.name = 'EmptyState'; const set = {}; for (const k of Object.keys(e.componentProperties)) { if (k.startsWith('Title')) set[k] = t; if (k.startsWith('Body')) set[k] = b; if (k.startsWith('Show Action')) set[k] = !!act; } e.setProperties(set); if (act) { const at = e.findAll(n => n.type === 'TEXT').find(n => n.characters.length < 16 && n.characters !== t); if (at) await S.setText(at, act); } return e; };
const offline = async (c, m) => { const o = await S.v(S.ID.offline, {}, { Message: m }, c); o.layoutSizingHorizontal = 'FILL'; o.name = 'OfflineBanner'; };
const skel = (c, hs) => { for (const h of hs) { const r = figma.createFrame(); r.name = 'Skeleton'; c.appendChild(r); r.layoutSizingHorizontal = 'FILL'; r.resize(353, h); r.cornerRadius = 24; r.fills = [S.paint('track')]; } };
const err = async (c, t) => { const e = S.card(c, 'Error card', { fill: 'urgent-tint', stroke: 'urgent', dir: 'H', gap: 12 }); S.icon(e, 'exclamationmark.triangle', 22, 'urgent'); const tx = await S.text(e, t, 'ML/Body Semibold', 'ink'); tx.layoutGrow = 1; tx.textAutoResize = 'HEIGHT'; };
const group = (c, nm) => { const g = S.frame(c, nm, { fill: 'surface', radius: 26 }); g.layoutSizingHorizontal = 'FILL'; g.paddingLeft = g.paddingRight = 16; g.paddingTop = g.paddingBottom = 6; return g; };
const row = async (g, label, icon, opts = {}) => { const r = S.frame(g, 'Row / ' + label, { dir: 'H', gap: 14 }); r.layoutSizingHorizontal = 'FILL'; r.counterAxisAlignItems = 'CENTER'; r.minHeight = 60; r.paddingTop = r.paddingBottom = 8;
  if (g.children.length > 1) { r.strokes = [S.paint('border')]; r.strokeTopWeight = 1; r.strokeBottomWeight = 0; r.strokeLeftWeight = 0; r.strokeRightWeight = 0; }
  const ic = S.frame(r, 'Icon', { dir: 'H', radius: 14, fill: 'fill-quiet' }); ic.primaryAxisAlignItems = 'CENTER'; ic.counterAxisAlignItems = 'CENTER'; ic.counterAxisSizingMode = 'FIXED'; ic.resize(44, 44); ic.primaryAxisSizingMode = 'FIXED'; S.icon(ic, icon, 22, 'ink');
  const tx = S.frame(r, 'Text', { gap: 2 }); tx.layoutGrow = 1; await S.text(tx, label, 'ML/Body Semibold', 'ink');
  if (opts.sub) { const s = S.frame(tx, 'Status', { dir: 'H', gap: 6 }); s.counterAxisAlignItems = 'CENTER'; if (opts.dot) { const d = figma.createEllipse(); d.resize(10, 10); d.fills = [S.paint('lime')]; d.strokes = [S.paint('lime-outline')]; d.strokeWeight = 1.2; s.appendChild(d); } await S.text(s, opts.sub, 'ML/Secondary', 'ink-secondary'); }
  if (opts.trail) await S.text(r, opts.trail, 'ML/Metric Unit', 'ink-secondary');
  S.icon(r, 'chevron.right', 18, 'ink-secondary'); return r; };
for (const it of args.items) {
  const k = it.kind, st = it.state || 'Default'; let f, c;
  const TT = { you: ['You', '', false, 'You'], notif: ['Notifications', '', true, 'Home'], credits: ['Credits', 'Earned by showing up. Never lost for a missed meal.', true, 'You'], ticket: ['Juice ticket', '50 pts used · 70 left', true, 'You'], attendance: ['Attendance', 'The days you came to the mess', true, 'You'], spending: ['Spending', '', true, 'You'], help: ['Help', 'Answers in plain words', true, 'You'] }[k];
  const o = { title: TT[0], subtitle: TT[1], back: TT[2], tab: TT[3], time: '7:00' };
  if (it.id) { f = await figma.getNodeByIdAsync(it.id); ({ c } = await S.reframe(f, o)); if (it.x !== undefined) { f.x = it.x; f.y = it.y; } } else ({ f, c } = await S.screen(pg, it.name, it.x, it.y, o));
  f.name = it.name; c.itemSpacing = 14;
  if (st === 'Offline') await offline(c, k === 'ticket' ? "You're offline. The code still changes; show it at the counter." : "You're offline. Showing what was saved at 6:58 AM.");
  if (st === 'Loading') { skel(c, k === 'you' ? [88, 300, 180] : [200, 96, 96, 96]); out.push(f.id + ' ' + f.name); continue; }
  if (st === 'Error') { await err(c, "Couldn't load this. Pull down to try again."); }
  if (k === 'you') {
    const pr = S.frame(c, 'Profile', { dir: 'H', gap: 16 }); pr.counterAxisAlignItems = 'CENTER';
    const av = S.frame(pr, 'Avatar', { dir: 'H', radius: 44, fill: 'hero-bg' }); av.primaryAxisAlignItems = 'CENTER'; av.counterAxisAlignItems = 'CENTER'; av.counterAxisSizingMode = 'FIXED'; av.resize(88, 88); av.primaryAxisSizingMode = 'FIXED'; await S.text(av, 'A', 'ML/Title', 'on-hero');
    const nm = S.frame(pr, 'Name', { gap: 2 }); await S.text(nm, 'Aarav', 'ML/Title', 'ink'); await S.text(nm, '••0238 · Main Mess', 'ML/Secondary', 'ink-secondary');
    if (st !== 'Error') { const g1 = group(c, 'Group / Main'); await row(g1, 'Outings', 'arrow.right', { sub: 'Waiting for the warden', dot: true }); await row(g1, 'Credits', 'gift', { trail: '120 pts' }); await row(g1, 'Attendance', 'calendar'); await row(g1, 'Spending', 'indianrupeesign'); await row(g1, 'My feedback', 'text.bubble');
      const g2 = group(c, 'Group / Help'); await row(g2, 'Help', 'questionmark.circle'); await row(g2, 'Terms and privacy', 'lock.shield'); await row(g2, 'Sign out', 'arrow.up.right'); }
  }
  if (k === 'notif') {
    if (st === 'Empty') await empty(c, 'No notifications', 'Meal reminders, outing updates and replies to your feedback show here.');
    else if (st !== 'Error') { const N = [['Today', [['6:52 AM', 'Your guardian approved your outing', 'Sat 17 Aug, 2–8 PM. Now waiting for the warden.'], ['5:30 AM', 'Breakfast today?', 'Tell us by 6 AM so the kitchen can plan.']]], ['Earlier', [['Yesterday', 'The kitchen saw your feedback', '6 others said the sambar was too salty.'], ['Mon', 'Special pass on Wednesday', 'Wed 14 Aug, 12–2 PM at the pass desk.']]]];
      for (const [h, items] of N) { await S.text(c, h, 'ML/Secondary Medium', 'ink-secondary');
        for (const [t, ti, b] of items) { const cd = S.frame(c, 'Notification / ' + ti, { dir: 'H', gap: 14, fill: 'surface', radius: 24 }); cd.layoutSizingHorizontal = 'FILL'; cd.paddingLeft = cd.paddingRight = 16; cd.paddingTop = cd.paddingBottom = 16;
          const ai = await S.v(S.ID.appicon, { Style: 'Black', Size: '40' }, null, cd); ai.name = 'AppIcon';
          const tx = S.frame(cd, 'Text', { gap: 4 }); tx.layoutGrow = 1; const top = S.frame(tx, 'Top', { dir: 'H' }); top.layoutSizingHorizontal = 'FILL'; top.primaryAxisAlignItems = 'SPACE_BETWEEN';
          const ey = await S.text(top, 'MEALLOOP', 'Label/Eyebrow', 'ink-secondary'); ey.letterSpacing = { unit: 'PERCENT', value: 6 }; await S.text(top, t, 'ML/Footnote', 'ink-secondary');
          const a = await S.text(tx, ti, 'ML/Body Semibold', 'ink'); a.layoutSizingHorizontal = 'FILL'; a.textAutoResize = 'HEIGHT'; const bb = await S.text(tx, b, 'ML/Secondary', 'ink-secondary'); bb.layoutSizingHorizontal = 'FILL'; bb.textAutoResize = 'HEIGHT'; } } }
  }
  if (k === 'credits') {
    const hero = S.frame(c, 'Points hero', { gap: 10, fill: 'hero-bg', radius: 30 }); hero.layoutSizingHorizontal = 'FILL'; hero.paddingLeft = hero.paddingRight = hero.paddingTop = hero.paddingBottom = 24;
    const cr = S.frame(hero, 'Points', { dir: 'H', gap: 8 }); cr.counterAxisAlignItems = 'BASELINE'; await S.text(cr, '120', 'ML/Hero Metric', 'on-hero'); await S.text(cr, 'pts', 'ML/Hero Unit', 'on-hero-secondary');
    await S.text(hero, '80 more for the Biryani coupon', 'ML/Secondary', 'on-hero-secondary');
    const bar = figma.createFrame(); bar.name = 'Progress'; hero.appendChild(bar); bar.layoutSizingHorizontal = 'FILL'; bar.resize(305, 10); bar.cornerRadius = 5; bar.fills = [S.paint('on-hero')]; bar.opacity = 1; const tr = figma.createRectangle(); bar.appendChild(tr); tr.resize(305, 10); tr.fills = [S.paint('pass-bg')]; tr.opacity = 0.75; const fl = figma.createRectangle(); bar.appendChild(fl); fl.resize(183, 10); fl.cornerRadius = 5; fl.fills = [S.paint('lime')]; fl.name = 'Earned';
    if (st === 'Empty') await empty(c, 'No tickets yet', 'Tickets you can get with your points show here. The first ones launch Friday.');
    else if (st !== 'Error') { await S.text(c, 'Tickets', 'ML/Card Heading', 'ink');
      if (st === 'Failed') await err(c, "Couldn't get the Juice ticket. Your points are safe. Try again");
      for (const [t, sub, pts, act] of [['Juice', 'At your mess counter · today', '50 pts', 'Get'], ['Ice cream', 'At your mess counter · today', '80 pts', 'Get'], ['Biryani coupon', 'Launches Friday', '200 pts', '80 more']]) {
        const tk = S.frame(c, 'Ticket / ' + t, { dir: 'H', gap: 12, fill: act === 'Get' ? 'surface' : null, radius: 24 }); tk.layoutSizingHorizontal = 'FILL'; tk.counterAxisAlignItems = 'CENTER'; tk.paddingLeft = 20; tk.paddingRight = 16; tk.paddingTop = tk.paddingBottom = 16; tk.clipsContent = false;
        if (act !== 'Get') { tk.strokes = [S.paint('ink-secondary')]; tk.strokeWeight = 1.5; tk.dashPattern = [6, 5]; }
        const tx = S.frame(tk, 'Text', { gap: 2 }); tx.layoutGrow = 1; await S.text(tx, t, 'ML/Section', 'ink'); await S.text(tx, sub, 'ML/Secondary', 'ink-secondary');
        const pv = figma.createLine(); pv.name = 'Perforation'; tk.appendChild(pv); pv.rotation = -90; pv.resize(56, 0); pv.strokes = [S.paint('border')]; pv.strokeWeight = 1.5; pv.dashPattern = [4, 4];
        const rc = S.frame(tk, 'Cost', { gap: 6 }); rc.counterAxisAlignItems = 'CENTER'; await S.text(rc, pts, 'ML/Metric Unit', 'ink');
        const b = S.frame(rc, 'Button / ' + t, { dir: 'H', radius: 22 }); b.primaryAxisAlignItems = 'CENTER'; b.counterAxisAlignItems = 'CENTER'; b.counterAxisSizingMode = 'FIXED'; b.resize(10, 44); b.primaryAxisSizingMode = 'AUTO'; b.paddingLeft = b.paddingRight = 18;
        const sending = st === 'Sending' && t === 'Juice';
        if (act === 'Get') { b.fills = [S.paint('action')]; if (st === 'Offline') b.opacity = 0.4; if (sending) b.opacity = 0.6; await S.text(b, sending ? 'Getting…' : 'Get', 'ML/Body Semibold', 'on-action'); }
        else { b.fills = []; b.strokes = [S.paint('ink')]; b.strokeWeight = 1.5; b.dashPattern = [4, 3]; await S.text(b, act, 'ML/Secondary Medium', 'ink'); } }
      const g = group(c, 'Group / More'); await row(g, 'History', 'clock'); await row(g, 'Something wrong with your balance?', 'questionmark.circle'); }
  }
  if (k === 'ticket') { const used = st === 'Used';
    const tc = S.frame(c, 'Ticket card', { gap: 10, fill: 'surface', radius: 30 }); tc.layoutSizingHorizontal = 'FILL'; tc.counterAxisAlignItems = 'CENTER'; tc.paddingLeft = tc.paddingRight = 24; tc.paddingTop = 24; tc.paddingBottom = 24; tc.clipsContent = false;
    await S.text(tc, used ? 'Used at the counter' : 'Show this at the counter', 'ML/Secondary', 'ink-secondary'); await S.text(tc, 'Code', 'ML/Footnote', 'ink-secondary');
    const code = await S.text(tc, '7A3F', 'ML/Hero Metric', used ? 'ink-secondary' : 'ink'); code.fontSize = 72; code.name = 'Code';
    await S.text(tc, 'Colour', 'ML/Footnote', 'ink-secondary');
    const cp = S.frame(tc, 'Colour pill', { dir: 'H', radius: 32 }); cp.primaryAxisAlignItems = 'CENTER'; cp.counterAxisAlignItems = 'CENTER'; cp.counterAxisSizingMode = 'FIXED'; cp.resize(220, 64); cp.primaryAxisSizingMode = 'FIXED'; cp.fills = [S.paint(used ? 'fill-quiet' : 'lime')]; cp.strokes = [S.paint(used ? 'border' : 'lime-outline')]; cp.strokeWeight = 1.5; await S.text(cp, 'Lime', 'ML/Section', used ? 'ink-secondary' : 'on-lime');
    await S.text(tc, used ? 'Used 12:32 PM' : 'Changes in 9 s', 'ML/Secondary', 'ink-secondary');
    const pv = figma.createLine(); pv.name = 'Perforation'; tc.appendChild(pv); pv.layoutSizingHorizontal = 'FILL'; pv.strokes = [S.paint('border')]; pv.strokeWeight = 1.5; pv.dashPattern = [6, 5];
    const hr = S.frame(tc, 'Holder', { dir: 'H', gap: 8 }); hr.layoutSizingHorizontal = 'FILL'; hr.counterAxisAlignItems = 'CENTER'; const hx = S.frame(hr, 'Text', { gap: 2 }); hx.layoutGrow = 1; await S.text(hx, 'Aarav ••0238', 'ML/Section', 'ink'); await S.text(hx, used ? 'Juice · used today' : 'Juice · valid today', 'ML/Secondary', 'ink-secondary');
    const vc = S.frame(hr, 'Status chip', { dir: 'H', radius: 18 }); vc.counterAxisAlignItems = 'CENTER'; vc.paddingLeft = vc.paddingRight = 14; vc.counterAxisSizingMode = 'FIXED'; vc.resize(10, 36); vc.primaryAxisSizingMode = 'AUTO'; vc.fills = used ? [] : [S.paint('lime')]; vc.strokes = [S.paint(used ? 'ink-secondary' : 'lime-outline')]; vc.strokeWeight = 1.5; await S.text(vc, used ? 'Used' : 'Valid', 'ML/Secondary Medium', used ? 'ink-secondary' : 'on-lime');
    const n1 = await S.text(c, used ? 'This ticket is used.' : 'No scan needed.', 'ML/Body Semibold', 'ink', { w: 353 }); n1.textAlignHorizontal = 'CENTER'; n1.layoutSizingHorizontal = 'FILL';
    const n2 = await S.text(c, used ? 'Get another from Credits when you have the points.' : 'The counter checks your code and colour.', 'ML/Secondary', 'ink-secondary', { w: 353 }); n2.textAlignHorizontal = 'CENTER'; n2.layoutSizingHorizontal = 'FILL'; }
  if (k === 'attendance') {
    const hero = S.frame(c, 'Attendance hero', { dir: 'H', gap: 18, fill: 'hero-bg', radius: 30 }); hero.layoutSizingHorizontal = 'FILL'; hero.counterAxisAlignItems = 'CENTER'; hero.paddingLeft = hero.paddingRight = hero.paddingTop = hero.paddingBottom = 22;
    const ring = figma.createFrame(); ring.name = 'Ring'; ring.resize(112, 112); ring.fills = []; hero.appendChild(ring);
    const tr = figma.createEllipse(); tr.resize(112, 112); tr.arcData = { startingAngle: 0, endingAngle: Math.PI * 2, innerRadius: 0.8 }; tr.fills = [S.paint('on-hero')]; tr.opacity = 0.18; ring.appendChild(tr);
    const ar = figma.createEllipse(); ar.resize(112, 112); ar.arcData = { startingAngle: -Math.PI / 2, endingAngle: -Math.PI / 2 + Math.PI * 2 * 0.88, innerRadius: 0.8 }; ar.fills = [S.paint('lime')]; ring.appendChild(ar);
    const pc = await S.text(ring, '88%', 'ML/Metric Unit', 'on-hero'); pc.x = 56 - pc.width / 2; pc.y = 56 - pc.height / 2;
    const tx = S.frame(hero, 'Text', { gap: 4 }); tx.layoutGrow = 1; for (const [t, sty, col] of [['36 of 41 meals', 'ML/Section', 'on-hero'], ['you came this month so far', 'ML/Secondary', 'on-hero-secondary'], ['Best streak: 4 days', 'ML/Secondary Medium', 'lime']]) { const x = await S.text(tx, t, sty, col); x.layoutSizingHorizontal = 'FILL'; x.textAutoResize = 'HEIGHT'; }
    const cal = S.frame(c, 'Month', { gap: 10, fill: 'surface', radius: 26 }); cal.layoutSizingHorizontal = 'FILL'; cal.paddingLeft = cal.paddingRight = 18; cal.paddingTop = cal.paddingBottom = 18;
    await S.text(cal, 'August', 'ML/Card Heading', 'ink');
    const wk = S.frame(cal, 'Weekdays', { dir: 'H' }); wk.layoutSizingHorizontal = 'FILL'; wk.primaryAxisAlignItems = 'SPACE_BETWEEN'; for (const d of ['M', 'T', 'W', 'T', 'F', 'S', 'S']) { const t = await S.text(wk, d, 'ML/Footnote', 'ink-secondary'); t.resize(40, t.height); t.textAlignHorizontal = 'CENTER'; t.textAutoResize = 'HEIGHT'; }
    const part = new Set([3, 8, 10, 13]); let day = 1;
    for (let w = 0; w < 5; w++) { const r = S.frame(cal, 'Week ' + (w + 1), { dir: 'H' }); r.layoutSizingHorizontal = 'FILL'; r.primaryAxisAlignItems = 'SPACE_BETWEEN';
      for (let i = 0; i < 7; i++) { const cell = figma.createFrame(); cell.name = 'Day'; cell.resize(40, 40); cell.cornerRadius = 20; cell.fills = []; r.appendChild(cell); cell.layoutMode = 'HORIZONTAL'; cell.primaryAxisSizingMode = 'FIXED'; cell.counterAxisSizingMode = 'FIXED'; cell.resize(40, 40); cell.primaryAxisAlignItems = 'CENTER'; cell.counterAxisAlignItems = 'CENTER';
        const slot = w * 7 + i - 3; if (slot < 0 || slot >= 31) continue; const dn = slot + 1; cell.name = 'Day ' + dn;
        let col = 'ink-secondary';
        if (dn === 14) { cell.fills = [S.paint('lime')]; cell.strokes = [S.paint('lime-outline')]; cell.strokeWeight = 1.5; col = 'on-lime'; }
        else if (dn < 14 && part.has(dn)) { cell.strokes = [S.paint('ink')]; cell.strokeWeight = 1.5; col = 'ink'; }
        else if (dn < 14) { cell.fills = [S.paint('hero-bg')]; col = 'on-hero'; }
        await S.text(cell, String(dn), 'ML/Secondary Medium', col); } }
    const lg = S.frame(cal, 'Legend', { dir: 'H', gap: 16 }); for (const [l, fill] of [['Came to every meal', 1], ['Missed a meal', 0]]) { const g = S.frame(lg, 'Key / ' + l, { dir: 'H', gap: 6 }); g.counterAxisAlignItems = 'CENTER'; const d = figma.createEllipse(); d.resize(12, 12); g.appendChild(d); if (fill) d.fills = [S.paint('ink')]; else { d.fills = []; d.strokes = [S.paint('ink')]; d.strokeWeight = 1.5; } await S.text(g, l, 'ML/Footnote', 'ink-secondary'); }
    }
  if (k === 'spending') {
    const chip = S.frame(c, 'Private chip', { dir: 'H', gap: 8, radius: 20 }); chip.counterAxisAlignItems = 'CENTER'; chip.paddingLeft = chip.paddingRight = 14; chip.counterAxisSizingMode = 'FIXED'; chip.resize(10, 40); chip.primaryAxisSizingMode = 'AUTO'; chip.strokes = [S.paint('border-control')]; chip.strokeWeight = 1.5; S.icon(chip, 'lock', 18, 'ink'); await S.text(chip, 'Private · only you see this', 'ML/Secondary Medium', 'ink');
    if (st === 'Empty') await empty(c, 'Nothing added yet', 'Add what you spend outside the mess. Only you can see it.');
    else if (st !== 'Error') {
      if (st === 'Saved') { const t = await S.v(S.ID.toast, {}, { Message: 'Saved · Canteen ₹60' }, c); t.layoutSizingHorizontal = 'FILL'; t.name = 'Toast'; }
      const hero = S.frame(c, 'Spending hero', { gap: 8, fill: 'hero-bg', radius: 30 }); hero.layoutSizingHorizontal = 'FILL'; hero.paddingLeft = hero.paddingRight = hero.paddingTop = 24; hero.paddingBottom = 22;
      await S.text(hero, 'This month so far', 'ML/Secondary', 'on-hero-secondary'); const r = S.frame(hero, 'Total', { dir: 'H', gap: 10 }); r.counterAxisAlignItems = 'BASELINE'; await S.text(r, st === 'Saved' ? '₹3,060' : '₹3,000', 'ML/Hero Metric', 'on-hero'); await S.text(r, st === 'Saved' ? '₹560 this week' : '₹500 this week', 'ML/Secondary', 'on-hero-secondary');
      const bars = S.frame(hero, 'Weeks', { dir: 'H', gap: 16 }); bars.layoutSizingHorizontal = 'FILL'; bars.counterAxisAlignItems = 'MAX'; bars.paddingTop = 12;
      for (const [l, v, cur] of [['1–4 Aug', 1120, 0], ['5–11 Aug', 1380, 0], ['12–14 Aug', st === 'Saved' ? 560 : 500, 1]]) { const col = S.frame(bars, 'Week ' + l, { gap: 6 }); col.layoutGrow = 1; col.counterAxisAlignItems = 'CENTER'; const b = figma.createRectangle(); b.name = 'Bar'; b.resize(80, Math.round(90 * v / 1380)); b.cornerRadius = 14; col.appendChild(b); b.layoutSizingHorizontal = 'FILL'; b.fills = [S.paint(cur ? 'lime' : 'on-hero')]; if (!cur) b.opacity = 0.85; await S.text(col, l, cur ? 'ML/Footnote' : 'ML/Footnote', cur ? 'on-hero' : 'on-hero-secondary'); }
      await S.text(c, 'Recent', 'ML/Secondary Medium', 'ink-secondary');
      const list = S.frame(c, 'Recent list', {}); list.layoutSizingHorizontal = 'FILL';
      const items = [['Food delivery', 'Wed 14 Aug · dinner order', '₹320'], ['Canteen', 'Mon 12 Aug · snacks', '₹180'], ['Snacks', 'Sat 10 Aug', '₹90']]; if (st === 'Saved') items.unshift(['Canteen', 'Wed 14 Aug · snacks', '₹60']);
      for (const [a, b, v] of items) { const rr = S.frame(list, 'Spend / ' + a + ' ' + b, { dir: 'H', gap: 8 }); rr.layoutSizingHorizontal = 'FILL'; rr.counterAxisAlignItems = 'CENTER'; rr.paddingTop = rr.paddingBottom = 12; rr.strokes = [S.paint('border')]; rr.strokeTopWeight = 1; rr.strokeBottomWeight = 0; rr.strokeLeftWeight = 0; rr.strokeRightWeight = 0; const tx = S.frame(rr, 'Text', { gap: 2 }); tx.layoutGrow = 1; await S.text(tx, a, 'ML/Body Semibold', 'ink'); await S.text(tx, b, 'ML/Secondary', 'ink-secondary'); await S.text(rr, v, 'ML/Metric Unit', 'ink'); } }
    if (st !== 'Error') { const b = await S.btn(c, 'Add spending', 'Primary', 'fill', 60); b.name = 'Button / Add spending'; } }
  if (k === 'help') {
    const Q = [['How do meal answers work?', "Tell us I'm in, Skip or Not sure before the cutoff. It only helps the kitchen plan. You can always eat."], ['Is my entry QR ever locked?', 'No. Your QR works for every meal, even if you skipped or did not answer.'], ['How does the Special pass work?', 'On Wednesday 12–2 PM, show the pass at the pass desk. It is on Home only on that day.'], ['What happens when I send an SOS?', 'The food head and mess supervisor are told at once, with your live photo, place and time.'], ['Who sees my feedback?', 'The kitchen sees the dish, the problem and how bad. Never your name.']];
    const g = group(c, 'Questions'); for (const [i, [q, a]] of Q.entries()) { const r = S.frame(g, 'Question / ' + q, { gap: 6 }); r.layoutSizingHorizontal = 'FILL'; r.paddingTop = r.paddingBottom = 14; if (i) { r.strokes = [S.paint('border')]; r.strokeTopWeight = 1; r.strokeBottomWeight = 0; r.strokeLeftWeight = 0; r.strokeRightWeight = 0; }
      const h = S.frame(r, 'Q', { dir: 'H', gap: 8 }); h.layoutSizingHorizontal = 'FILL'; h.counterAxisAlignItems = 'CENTER'; const qt = await S.text(h, q, 'ML/Body Semibold', 'ink'); qt.layoutGrow = 1; qt.textAutoResize = 'HEIGHT'; S.icon(h, i === 0 ? 'minus' : 'plus', 18, 'ink-secondary');
      if (i === 0) { const at = await S.text(r, a, 'ML/Secondary', 'ink-secondary', { w: 321 }); at.layoutSizingHorizontal = 'FILL'; } }
    const ct = S.card(c, 'Contact', { gap: 4, stroke: null }); ct.paddingLeft = ct.paddingRight = 20; await S.text(ct, 'Contact the mess office', 'ML/Body Semibold', 'ink'); await S.text(ct, 'Mess office, Block A · 9 AM–5 PM', 'ML/Secondary', 'ink-secondary'); }
  if (args.notes) { const near = pg.children.filter(n => n !== f && n.x >= f.x - 2 && n.x < f.x + 393 && ((n.y >= f.y - 80 && n.y < f.y) || (n.y >= f.y + 852 && n.y < f.y + 1010))); for (const n of near) n.remove(); await S.notes(f, it.name, 'Wed 14 Aug 2024, 7:00 AM'); }
  out.push(f.id + ' ' + f.name);
}
return out;
