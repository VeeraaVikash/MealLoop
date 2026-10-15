// Student-redesign Home builder (stored as mealloop/srhome). Body of async function(figma, args).
// args {items:[{id, name, kind, time, date}], dest:{qr, pass, answer, recheck, sos, bell, credits, feedbackGood, feedbackBad, skip, next}}
// kind: Home | Not answered | Skipped | Breakfast open | After a meal | After cutoff | Mess closed | No Special pass | Offline | Loading | Empty
const AF = Object.getPrototypeOf(async function(){}).constructor;
const S = await new AF('figma', 'args', figma.root.getSharedPluginData('mealloop', 'srh'))(figma, {});
const credits = await figma.getNodeByIdAsync(args.creditsComp), glass = await figma.getNodeByIdAsync(args.glassComp);
const D = args.dest; const out = [];
for (const it of args.items) {
  const f = await figma.getNodeByIdAsync(it.id); const old = f.name;
  const { c } = await S.reframe(f, { noNav: true, tab: 'Home', time: it.time || '7:00' });
  f.name = it.name; c.itemSpacing = 16;
  // header
  const h = S.frame(c, 'Home header', { dir: 'H', gap: 6 }); h.layoutSizingHorizontal = 'FILL'; h.counterAxisAlignItems = 'CENTER';
  const lg = S.frame(h, 'Brand', { dir: 'H', gap: 6 }); lg.counterAxisAlignItems = 'CENTER';
  const om = await S.v(S.ID.orbit, { Size: '32' }, null, lg); om.name = 'OrbitMark';
  await S.text(lg, 'MealLoop', 'ML/Card Heading', 'ink');
  const sp = figma.createFrame(); sp.name = 'Spacer'; sp.fills = []; h.appendChild(sp); sp.resize(1, 1); sp.layoutGrow = 1;
  const cr = credits.createInstance(); h.appendChild(cr); cr.name = 'Credits';
  const pt = cr.findOne(n => n.type === 'TEXT' && /pts|\d/.test(n.characters)); if (pt) await S.setText(pt, '120 pts');
  const mk = async (icon, name) => { const g = glass.createInstance(); h.appendChild(g); g.name = name; g.resize(44, 44); const ic = g.findOne(n => n.name === 'Icon'); if (ic) ic.swapComponent(S.sym(icon)); return g; };
  const sos = await mk('exclamationmark.bubble', 'SOS'); const bell = await mk('bell', 'Notifications');
  if (D.credits) await S.link(cr, D.credits); if (D.sos) await S.link(sos, D.sos); if (D.bell) await S.link(bell, D.bell);
  // greeting
  const g = S.frame(c, 'Greeting', { gap: 2 }); g.layoutSizingHorizontal = 'FILL';
  await S.text(g, 'Hey Aarav', 'ML/Large Title', 'ink'); await S.text(g, it.date || 'Wednesday 14 Aug', 'ML/Body', 'ink-secondary');
  if (it.kind === 'Loading') {
    for (const [nm, hh, fill] of [['Hero', 214, 'track'], ['Row', 72, 'track'], ['Row', 72, 'track'], ['Row', 103, 'track']]) { const r = figma.createFrame(); r.name = 'Skeleton / ' + nm; c.appendChild(r); r.layoutSizingHorizontal = 'FILL'; r.resize(353, hh); r.cornerRadius = nm === 'Hero' ? 30 : 22; r.fills = [S.paint(fill)]; }
    const t = await S.text(c, 'Getting today\'s meals…', 'ML/Footnote', 'ink-secondary'); out.push(f.id + ' ' + old + ' → ' + f.name); continue; }
  if (it.kind === 'Offline') { const o = await S.v(S.ID.offline, {}, { Message: "You're offline. Showing what was saved at 6:58 AM." }, c); o.layoutSizingHorizontal = 'FILL'; o.name = 'OfflineBanner'; }
  if (it.kind === 'Empty') { const e = await S.v(S.ID.empty, {}, null, c); e.layoutSizingHorizontal = 'FILL'; e.name = 'EmptyState'; { const bk = Object.keys(e.componentProperties).find(k => /^Show (Button|Action)/i.test(k)); if (bk) e.setProperties({ [bk]: false }); else { const bt = e.findOne(n => /button/i.test(n.name)); if (bt) bt.visible = false; } }
    for (const t of e.findAll(n => n.type === 'TEXT')) { if (/title|heading/i.test(t.name) || t.fontSize >= 20) await S.setText(t, 'No meals planned today'); else if (t.characters.length > 12) await S.setText(t, "The mess hasn't put up today's menu yet. Your QR still works if it opens."); }
    out.push(f.id + ' ' + old + ' → ' + f.name); continue; }
  // hero
  const HC = { Home: ['In', 'THIS MORNING', "You're in for breakfast", 'Serving 7:30–9:30 AM'], 'Not answered': ['NotAnswered', 'THIS MORNING', 'Breakfast today?', 'Serving 7:30–9:30 AM'], Skipped: ['Skipped', 'THIS MORNING', 'You skipped breakfast', 'Changed your mind? You can still eat.'], 'Breakfast open': ['In', 'NOW SERVING', 'Breakfast is open', 'Till 9:30 AM · Main Mess'], 'After a meal': ['QRAvailable', 'NEXT MEAL', 'Lunch at 12 PM', 'Serving 12–2 PM · Main Mess'], 'After cutoff': ['In', 'THIS MORNING', "You're in for breakfast", 'Serving 7:30–9:30 AM'], 'Mess closed': ['QRAvailable', 'THIS MORNING', 'Mess opens at 7:30', 'Breakfast 7:30–9:30 AM · Main Mess'], 'No Special pass': ['In', 'THIS MORNING', "You're in for breakfast", 'Serving 7:30–9:30 AM'], Offline: ['In', 'THIS MORNING', "You're in for breakfast", 'Saved QR works offline · 7:30–9:30 AM'] }[it.kind];
  const hero = await S.v(S.ID.hero, { Case: HC[0] }, { Eyebrow: HC[1], Title: HC[2], Detail: HC[3] }, c); hero.layoutSizingHorizontal = 'FILL'; hero.name = 'HeroCard';
  for (const b of hero.findAll(n => /^Button \/ (Show entry QR|Entry QR)/.test(n.name))) if (D.qr) await S.link(b, D.qr);
  const im = hero.findOne(n => n.name === "Button / I'm in"); if (im && D.next) await S.link(im, D.next);
  const sk = hero.findOne(n => n.name === 'Button / Skip'); if (sk && D.skip) await S.link(sk, D.skip);
  // after a meal card
  if (it.kind === 'After a meal') { const cd = S.card(c, 'How was breakfast', { gap: 12, stroke: 'border' }); cd.paddingLeft = cd.paddingRight = 20; cd.paddingTop = cd.paddingBottom = 18;
    await S.text(cd, 'How was breakfast?', 'ML/Card Heading', 'ink'); const r = S.frame(cd, 'Faces', { dir: 'H', gap: 10 }); r.layoutSizingHorizontal = 'FILL';
    const gb = await S.btn(r, 'Good', 'Primary', 'fill', 48); gb.layoutGrow = 1; const nb = await S.btn(r, 'Not good', 'Secondary', 'fill', 48); nb.layoutGrow = 1;
    if (D.feedbackGood) await S.link(gb, D.feedbackGood); if (D.feedbackBad) await S.link(nb, D.feedbackBad); }
  // answer row
  const AS = { 'After a meal': 'Cutoff', 'After cutoff': 'Cutoff' }[it.kind] || 'Unanswered';
  const AT = AS === 'Cutoff' ? { Title: 'Lunch answers closed', Detail: 'Cutoff 9 AM passed · your QR still works' } : { Title: 'You in for lunch?', Detail: 'Decide by 9 AM · 2h left' };
  const ar = await S.v(S.ID.answer, { State: AS }, AT, c); ar.layoutSizingHorizontal = 'FILL'; ar.name = 'AnswerRow';
  if (D.answer && AS !== 'Cutoff') await S.link(ar, D.answer);
  if (it.kind === 'Offline') ar.opacity = 0.5;
  // special pass (Wednesday only)
  if (it.kind !== 'No Special pass') { const tk = await S.v(S.ID.ticket, { Status: 'Open' }, { Title: 'Special pass', Detail: 'Wed 12–2 PM' }, c); tk.layoutSizingHorizontal = 'FILL'; tk.name = 'TicketStrip / Special pass';
    const dot = tk.findOne(n => n.name === 'Lime dot'); if (dot) { dot.fills = [S.paint('ink')]; dot.strokes = []; }
    if (D.pass) await S.link(tk, D.pass); if (it.kind === 'Offline') tk.opacity = 0.5; }
  // crowd
  const CL = { 'Breakfast open': ['Busy', 'Busy now', 'Quieter after 8:45 AM'], 'Mess closed': ['Closed', 'Closed now', 'Opens 7:30 AM'], Offline: ['Closed', 'Crowd not available', 'Last updated 6:58 AM'], 'After a meal': ['Quiet', 'Quiet now', 'Lunch opens 12 PM'] }[it.kind] || ['Quiet', 'Quiet now', 'Best time 1:30 PM'];
  const cw = await S.v(S.ID.crowd, { Level: CL[0] }, { Level: CL[1], Detail: CL[2] }, c); cw.layoutSizingHorizontal = 'FILL'; cw.name = 'CrowdRow';
  // feedback row
  const dv = figma.createRectangle(); dv.name = 'Divider'; c.appendChild(dv); dv.layoutSizingHorizontal = 'FILL'; dv.resize(353, 1); dv.fills = [S.paint('border')];
  const fr = S.frame(c, 'Feedback row', { dir: 'H', gap: 12 }); fr.layoutSizingHorizontal = 'FILL'; fr.counterAxisAlignItems = 'CENTER'; fr.paddingTop = fr.paddingBottom = 4; fr.paddingLeft = 4;
  S.icon(fr, 'arrow.clockwise', 24, 'ink-secondary'); const ft = S.frame(fr, 'Text', { gap: 2 }); ft.layoutGrow = 1;
  const a = await S.text(ft, 'You said the sambar was too salty.', 'ML/Body Semibold', 'ink'); a.layoutSizingHorizontal = 'FILL'; a.textAutoResize = 'HEIGHT';
  const b = await S.text(ft, 'Better today? Tell us in 5 seconds', 'ML/Secondary', 'ink-secondary'); b.layoutSizingHorizontal = 'FILL'; b.textAutoResize = 'HEIGHT';
  if (D.recheck) await S.link(fr, D.recheck);
  if (it.chain) { const st = f.findOne(n => n.name === 'Status Bar'); await S.link(st, it.chain); }
  out.push(f.id + ' ' + old + ' → ' + f.name + ' h' + Math.round(c.height));
}
return out;
