// Student-redesign P5 builder (stored as mealloop/srp5). Body of async function(figma, args).
// args {pageId, notes, dest:{qr}, items:[{kind:'answer'|'entry', slot, state, id?, x, y, name}]}
// answer states: Unanswered, Sending, I'm in, Why skipping, Why skipping · picked, Skipped, Not sure, Cutoff passed · In, Cutoff passed · Skipped, Cutoff passed · Not answered, Offline, Failed
// entry states: EntryQRCard variants (Live, Refreshing, Offline, Walk-in, Scanned, Already scanned, Wrong mess)
const AF = Object.getPrototypeOf(async function(){}).constructor;
const S = await new AF('figma', 'args', figma.root.getSharedPluginData('mealloop', 'srh'))(figma, {});
const pg = await figma.getNodeByIdAsync(args.pageId); const out = [];
const SUB = { Breakfast: '7:30–9:30 AM · answer by 6 AM', Lunch: '12–2 PM · answer by 9 AM, 2 h left', Dinner: '7:30–9:30 PM · answer by 4 PM' };
const CUT = { Breakfast: '6 AM', Lunch: '9 AM', Dinner: '4 PM' };
const TILES = { Breakfast: [['Millet Idli', 'L', 'Highlight']], Lunch: [['Bhindi Aloo Bujjiya', 'L', 'Highlight'], ['Chappati', 'S'], ['Veg Pulao', 'S'], ['Muttar Masala', 'S']], Dinner: [['Chappathi', 'S'], ['Steamed Rice', 'S'], ['Dal Tadka', 'S'], ['Butter Chicken Masala', 'M', 'Default', 1], ['Panneer Butter Masala', 'M']] };
const REASONS = ['Class or exam', 'Home or leave', 'Eating elsewhere', "Don't like the dish", 'Dietary reason', 'Not hungry', 'Other', 'Prefer not to say'];
const dashBtn = async (parent, label) => { const b = S.frame(parent, 'Button / ' + label + ' (closed)', { dir: 'H', radius: 28 }); b.primaryAxisAlignItems = 'CENTER'; b.counterAxisAlignItems = 'CENTER'; b.counterAxisSizingMode = 'FIXED'; b.resize(100, 56); b.layoutGrow = 1; b.strokes = [S.paint('ink-secondary')]; b.strokeWeight = 1.5; b.dashPattern = [6, 5]; await S.text(b, label, 'ML/Body Semibold', 'ink-secondary'); return b; };
const card = async (c, title, detail) => { const k = S.card(c, 'Status card', { gap: 4, stroke: 'border' }); k.paddingLeft = k.paddingRight = 20; k.paddingTop = k.paddingBottom = 16; await S.text(k, title, 'ML/Card Heading', 'ink'); const d = await S.text(k, detail, 'ML/Secondary', 'ink-secondary', { w: 313 }); d.layoutSizingHorizontal = 'FILL'; return k; };
const foot = async (c, t) => { const x = await S.text(c, t, 'ML/Footnote', 'ink-secondary', { w: 353 }); x.textAlignHorizontal = 'CENTER'; x.layoutSizingHorizontal = 'FILL'; return x; };
for (const it of args.items) {
  let f, c; const nm = it.name;
  if (it.kind === 'answer') {
    const o = { title: it.slot, subtitle: /^Cutoff/.test(it.state) ? SUB[it.slot].split(' · ')[0] + ' · answers closed' : SUB[it.slot], back: true, tab: 'Home', time: /^Cutoff/.test(it.state) ? '9:20' : '7:00' };
    if (it.id) { f = await figma.getNodeByIdAsync(it.id); ({ c } = await S.reframe(f, o)); if (it.x !== undefined) { f.x = it.x; f.y = it.y; } } else ({ f, c } = await S.screen(pg, nm, it.x, it.y, o));
    f.name = nm; c.itemSpacing = 14;
    const T = TILES[it.slot]; let row = null;
    for (const [d, sz, fill, nv] of T) { if (sz === 'L') { const t = await S.tile(c, d, 'L', fill || 'Default', nv); t.layoutSizingHorizontal = 'FILL'; row = null; continue; }
      if (!row || row.children.length >= (sz === 'S' ? 3 : 2) || row.getSharedPluginData('mealloop', 'sz') !== sz) { row = S.frame(c, 'Dishes', { dir: 'H', gap: 12 }); row.layoutSizingHorizontal = 'FILL'; row.setSharedPluginData('mealloop', 'sz', sz); }
      const t = await S.tile(row, d, sz, fill || 'Default', nv); t.layoutGrow = 1; }
    if (it.slot === 'Breakfast') { const t = await S.tile(c, 'Pongal', 'M', 'Default'); }
    const st = it.state;
    if (st === 'Offline') { const ob = await S.v(S.ID.offline, {}, { Message: "You're offline. Your answer will send when you're back." }, c); ob.layoutSizingHorizontal = 'FILL'; ob.name = 'OfflineBanner'; }
    if (st === 'Failed') { const e = S.card(c, 'Error card', { fill: 'urgent-tint', stroke: 'urgent', dir: 'H', gap: 12 }); S.icon(e, 'exclamationmark.triangle', 22, 'urgent'); const tx = await S.text(e, "Couldn't save your answer. Try again", 'ML/Body Semibold', 'ink'); tx.layoutGrow = 1; tx.textAutoResize = 'HEIGHT'; }
    const sp = figma.createFrame(); sp.name = 'Gap'; sp.fills = []; sp.resize(10, 4); c.appendChild(sp);
    if (st === "I'm in") { await card(c, "You're in for " + it.slot.toLowerCase(), 'Saved 7:02 AM · you can change this until ' + CUT[it.slot] + '.'); const q = await S.btn(c, 'Show entry QR', 'Primary', 'fill', 60); if (args.dest.qr) await S.link(q, args.dest.qr); await S.btn(c, 'Change answer', 'Secondary', 'fill', 56); }
    else if (st === 'Skipped') { await card(c, 'You\'re skipping ' + it.slot.toLowerCase(), 'Reason: Eating elsewhere · change until ' + CUT[it.slot] + '.'); const q = await S.btn(c, 'Show entry QR', 'Primary', 'fill', 60); if (args.dest.qr) await S.link(q, args.dest.qr); await S.btn(c, 'Change answer', 'Secondary', 'fill', 56); await foot(c, 'You can still eat. Your QR always works.'); }
    else if (st === 'Not sure') { await card(c, 'Marked not sure', "We'll remind you at 8:30 AM. Decide by " + CUT[it.slot] + '.'); const r = S.frame(c, 'Decide', { dir: 'H', gap: 12 }); r.layoutSizingHorizontal = 'FILL'; const a = await S.btn(r, "I'm in", 'Primary', 'fill', 56); a.layoutGrow = 1; const b = await S.btn(r, 'Skip', 'Secondary', 'fill', 56); b.layoutGrow = 1; await foot(c, 'Your QR always works.'); }
    else if (/^Cutoff passed/.test(st)) { const who = st.split(' · ')[1]; await card(c, who === 'In' ? "You're in for " + it.slot.toLowerCase() : who === 'Skipped' ? "You're skipping " + it.slot.toLowerCase() : "You didn't answer", 'Answers closed at ' + CUT[it.slot] + '. Your QR still works.');
      const r = S.frame(c, 'Closed answers', { dir: 'H', gap: 8 }); r.layoutSizingHorizontal = 'FILL'; await dashBtn(r, "I'm in"); await dashBtn(r, 'Skip'); await dashBtn(r, 'Not sure');
      const q = await S.btn(c, 'Show entry QR', 'Primary', 'fill', 60); if (args.dest.qr) await S.link(q, args.dest.qr); }
    else { const a = await S.btn(c, st === 'Sending' ? 'Saving…' : st === 'Failed' ? 'Try again' : "I'm in", 'Primary', 'fill', 64); a.name = "Button / I'm in";
      const r = S.frame(c, 'More answers', { dir: 'H', gap: 12 }); r.layoutSizingHorizontal = 'FILL'; const b = await S.btn(r, 'Skip', 'Secondary', 'fill', 56); b.layoutGrow = 1; const d = await S.btn(r, 'Not sure', 'Secondary', 'fill', 56); d.layoutGrow = 1;
      if (st === 'Sending') { b.opacity = 0.4; d.opacity = 0.4; }
      await foot(c, 'You can still eat if you skip. Your QR always works.'); }
    if (/^Why skipping/.test(st)) { f.numberOfFixedChildren = 0; const { sh, c: sc } = await S.sheet(f, 'Why skipping?', 'Medium');
      const sub = await S.text(sc, 'Optional. It helps the mess plan. Never shown with your name.', 'ML/Secondary', 'ink-secondary', { w: 353 });
      const w = S.frame(sc, 'Reasons', { dir: 'H', gap: 8, wrap: true }); w.layoutSizingHorizontal = 'FILL'; w.counterAxisSpacing = 8;
      for (const r of REASONS) { const p = S.frame(w, 'Reason / ' + r, { dir: 'H', radius: 22 }); p.counterAxisAlignItems = 'CENTER'; p.paddingLeft = p.paddingRight = 16; p.counterAxisSizingMode = 'FIXED'; p.resize(10, 44); p.primaryAxisSizingMode = 'AUTO';
        const sel = st === 'Why skipping · picked' && r === 'Eating elsewhere'; p.fills = sel ? [S.paint('action')] : []; p.strokes = [S.paint(sel ? 'action' : 'border-control')]; p.strokeWeight = 1.5; await S.text(p, r, 'ML/Secondary Medium', sel ? 'on-action' : 'ink'); }
      const sk = await S.btn(sc, 'Skip ' + it.slot.toLowerCase(), 'Primary', 'fill', 60); sk.name = 'Button / Skip meal';
      const nr = await S.text(sc, 'Skip without a reason', 'ML/Secondary Medium', 'ink'); nr.textDecoration = 'UNDERLINE'; nr.name = 'Link / Skip without a reason';
      sh.resize(393, Math.max(420, sc.height + 120)); sh.y = 852 - sh.height; sc.y = sh.y + 72; const cl = sh.findOne(n => /close/i.test(n.name)); if (cl) await S.back(cl); }
  } else {
    const o = { title: 'Entry QR', subtitle: (it.slot || 'Breakfast') + ' · Main Mess', back: true, tab: 'Home', time: '7:40' };
    if (it.id) { f = await figma.getNodeByIdAsync(it.id); ({ c } = await S.reframe(f, o)); if (it.x !== undefined) { f.x = it.x; f.y = it.y; } } else ({ f, c } = await S.screen(pg, nm, it.x, it.y, o));
    f.name = nm; c.itemSpacing = 20;
    if (it.state === 'Offline') { const ob = await S.v(S.ID.offline, {}, { Message: "You're offline. Your saved QR still works." }, c); ob.layoutSizingHorizontal = 'FILL'; ob.name = 'OfflineBanner'; }
    const k = await S.v(args.qrCard, { State: it.state }, null, c); k.layoutSizingHorizontal = 'FILL'; k.name = 'EntryQRCard';
    const l = await S.text(c, "Can't scan? Give the door staff your SRM ID.", 'ML/Secondary Medium', 'ink', { w: 353 }); l.textAlignHorizontal = 'CENTER'; l.textDecoration = 'UNDERLINE'; l.layoutSizingHorizontal = 'FILL'; l.name = 'Link / ID fallback';
  }
  if (args.notes) { const near = pg.children.filter(n => n !== f && n.x >= f.x - 2 && n.x < f.x + 393 && ((n.y >= f.y - 80 && n.y < f.y) || (n.y >= f.y + 852 && n.y < f.y + 1010))); for (const n of near) n.remove(); await S.notes(f, nm, it.kind === 'entry' ? 'Wed 14 Aug 2024, 7:40 AM' : 'Wed 14 Aug 2024, 7:00 AM'); }
  out.push(f.id + ' ' + nm + ' h' + Math.round(c.height));
}
for (const p of figma.root.children) p.flowStartingPoints = p.flowStartingPoints.filter(s => !/^Flow \d+$/.test(s.name));
return out;
