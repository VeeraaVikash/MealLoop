// Student-redesign P7 Feedback builder (stored as mealloop/srp7). Body of async function(figma, args).
// args {pageId, notes, items:[{kind, x, y, name, dish?}]}
// kinds: good, thanks, dish, dishmore, wrong (dish), note, sending, sent, failed, offline, my, mybetter, myempty, myoffline
const AF = Object.getPrototypeOf(async function(){}).constructor;
const S = await new AF('figma', 'args', figma.root.getSharedPluginData('mealloop', 'srh'))(figma, {});
const pg = await figma.getNodeByIdAsync(args.pageId); const out = [];
const SETS = { Curry: ['Too salty', 'Too spicy', 'Too watery', 'Too sour', 'Cold', 'Too little'], Rice: ['Undercooked', 'Mushy', 'Hard', 'Stale', 'Cold', 'Too little'], Bread: ['Hard', 'Undercooked', 'Burnt', 'Stale', 'Cold', 'Too little'], Dry: ['Too oily', 'Too spicy', 'Too salty', 'Hard', 'Cold', 'Too little'], Curd: ['Too sour', 'Watery', 'Not fresh', 'Warm', 'Too little'] };
const GLY = { 'Too salty': 'Salt', 'Too spicy': 'Spicy', 'Too oily': 'Spicy', Burnt: 'Spicy', Warm: 'Spicy', 'Too watery': 'Drop', Watery: 'Drop', Mushy: 'Drop', 'Too sour': 'Sour', 'Not fresh': 'Sour', Stale: 'Sour', Cold: 'Cold', 'Too little': 'Little', Undercooked: 'Little', Hard: 'Little' };
const TYPE = { Sambar: 'Curry', Pongal: 'Rice', 'Millet Idli': 'Bread', 'Masala Omelet': 'Dry', Milk: 'Curd' };
const NV = { 'Masala Omelet': 1 };
const sheetBase = async (it, title, opts = {}) => {
  const { f, c } = await S.screen(pg, it.name, it.x, it.y, { noNav: true, tab: 'Home', time: '9:40' });
  const hero = await S.v(S.ID.hero, { Case: 'QRAvailable' }, { Eyebrow: 'NEXT MEAL', Title: 'Lunch at 12 PM', Detail: 'Serving 12–2 PM · Main Mess' }, c); hero.layoutSizingHorizontal = 'FILL';
  f.numberOfFixedChildren = 0; const { sh, c: sc } = await S.sheet(f, opts.headerRow ? ' ' : title, 'Large');
  if (opts.headerRow) { const hr = S.frame(sc, 'Sheet header', { dir: 'H', gap: 12 }); hr.counterAxisAlignItems = 'CENTER'; const b = await S.inst(hr, '74:92', {}, null); b.resize(44, 44); b.name = 'Back'; const ic = b.findOne(n => n.name === 'Icon'); if (ic) ic.swapComponent(S.sym('chevron.left'));
    if (opts.pic) { const p = await S.v(S.ID.pic, { Type: S.pic(opts.pic), Tone: 'Ink' }, null, hr); p.resize(36, 36); }
    await S.text(hr, title, 'ML/Title', 'ink'); await S.back(b); }
  return { f, c, sh, sc };
};
const fitSheet = (f, sh, sc) => { sh.resize(393, Math.min(800, Math.max(420, sc.height + 110))); sh.y = 852 - sh.height; sc.y = sh.y + (sh.getSharedPluginData('mealloop', 'hdr') ? 30 : 72); };
const closeBack = async sh => { const cl = sh.findOne(n => /close/i.test(n.name)); if (cl) await S.back(cl); };
const foot = async (p, t, link) => { const x = await S.text(p, t, link ? 'ML/Secondary Medium' : 'ML/Secondary', link ? 'ink' : 'ink-secondary', { w: 353 }); x.textAlignHorizontal = 'CENTER'; x.layoutSizingHorizontal = 'FILL'; if (link) { x.textDecoration = 'UNDERLINE'; x.name = 'Link / ' + t; } return x; };
const done = async (sc, title, sub, line) => { const box = S.frame(sc, 'Result', { gap: 10 }); box.layoutSizingHorizontal = 'FILL'; box.counterAxisAlignItems = 'CENTER'; box.paddingTop = 12;
  const ok = figma.createFrame(); ok.name = 'Done mark'; ok.resize(88, 88); ok.cornerRadius = 44; box.appendChild(ok); ok.fills = [S.paint('lime')]; ok.strokes = [S.paint('lime-outline')]; ok.strokeWeight = 2; ok.layoutMode = 'VERTICAL'; ok.primaryAxisAlignItems = 'CENTER'; ok.counterAxisAlignItems = 'CENTER'; S.icon(ok, 'checkmark', 40, 'ink');
  await S.text(box, title, 'ML/Title', 'ink'); const s = await S.text(box, sub, 'ML/Body', 'ink-secondary', { w: 313 }); s.textAlignHorizontal = 'CENTER'; if (line) { const l = await S.text(box, line, 'ML/Secondary', 'ink-secondary'); } };
for (const it of args.items) {
  let f, c, sh, sc; const k = it.kind;
  if (['good', 'thanks', 'dish', 'dishmore', 'wrong', 'note', 'sending', 'sent', 'failed', 'offline'].includes(k)) {
    const T = { good: 'How was breakfast?', thanks: 'Thanks', dish: 'Which dish?', dishmore: 'Which dish?', sent: 'Sent' }[k] || (it.dish || 'Sambar');
    const hdr = ['dish', 'dishmore', 'wrong', 'note', 'sending', 'failed', 'offline'].includes(k);
    ({ f, c, sh, sc } = await sheetBase(it, T, { headerRow: hdr, pic: ['wrong', 'note', 'sending', 'failed', 'offline'].includes(k) ? (it.dish || 'Sambar') : null })); if (hdr) sh.setSharedPluginData('mealloop', 'hdr', '1');
    if (k === 'good') { const r = S.frame(sc, 'Faces', { dir: 'H', gap: 24 }); r.layoutSizingHorizontal = 'FILL'; r.primaryAxisAlignItems = 'CENTER'; r.paddingTop = 24; r.paddingBottom = 16;
      const g = await S.v(S.ID.face, { Face: 'Good', State: 'Default' }, null, r); g.name = 'FaceButton / Good'; const b = await S.v(S.ID.face, { Face: 'Not good', State: 'Default' }, null, r); b.name = 'FaceButton / Not good';
      for (const fb of [g, b]) { const t = fb.findOne(n => n.name === 'Label'); if (t) await S.setText(t, fb === g ? 'Good' : 'Not good'); }
      await foot(sc, 'Good sends right away. Takes 2 seconds.'); await foot(sc, 'The kitchen never sees your name.'); }
    if (k === 'thanks') { await done(sc, 'Thanks', 'The kitchen saw it.', 'Breakfast · Good · 9:40 AM'); const d = await S.btn(sc, 'Done', 'Primary', 'fill', 60); d.name = 'Button / Done'; }
    if (k === 'dish' || k === 'dishmore') { await S.text(sc, 'About breakfast · Not good', 'ML/Secondary', 'ink-secondary');
      await S.text(sc, 'Most reported today', 'ML/Secondary Medium', 'ink-secondary');
      const mr = S.card(sc, 'Most reported', { gap: 10, stroke: 'lime-outline' }); mr.strokeWeight = 2; mr.paddingLeft = mr.paddingRight = 20; await S.text(mr, 'Sambar · Too salty', 'ML/Section', 'ink');
      const r = S.frame(mr, 'Count', { dir: 'H', gap: 8 }); r.counterAxisAlignItems = 'CENTER'; await S.text(r, '6 students said this', 'ML/Secondary', 'ink-secondary');
      const me = await S.btn(mr, 'Me too', 'Primary', 'fill', 56); me.name = 'Button / Me too';
      await S.text(sc, 'Or pick the dish', 'ML/Secondary Medium', 'ink-secondary');
      const r1 = S.frame(sc, 'Dish row', { dir: 'H', gap: 12 }); r1.layoutSizingHorizontal = 'FILL';
      for (const d of ['Millet Idli', 'Pongal', 'Sambar']) { const tl = await S.tile(r1, d, 'S', 'Default'); tl.layoutGrow = 1; }
      const special = async (parent, kind) => { const t = S.frame(parent, kind === 'more' ? 'More dishes' : 'Service', { gap: 4, radius: 20 }); t.counterAxisAlignItems = 'CENTER'; t.primaryAxisAlignItems = 'CENTER'; t.counterAxisSizingMode = 'FIXED'; t.resize(109, kind === 'more' ? 113 : 64); t.primaryAxisSizingMode = 'FIXED'; t.layoutGrow = 1;
        t.strokes = [S.paint(kind === 'more' ? 'border' : 'ink-secondary')]; t.strokeWeight = 1.5; if (kind !== 'more') t.dashPattern = [6, 4];
        if (kind === 'more') { S.icon(t, 'plus', 24, 'ink'); await S.text(t, 'More dishes', 'iOS/Subheadline Emphasized', 'ink'); } else { const h = S.frame(t, 'Service label', { gap: 2 }); h.counterAxisAlignItems = 'CENTER'; await S.text(h, 'Service', 'iOS/Subheadline Emphasized', 'ink'); await S.text(h, 'Community ›', 'ML/Footnote', 'ink-secondary'); } return t; };
      if (k === 'dish') { const r2 = S.frame(sc, 'Dish row', { dir: 'H', gap: 12 }); r2.layoutSizingHorizontal = 'FILL'; await special(r2, 'more'); const sv = await special(r2, 'service'); sv.resize(109, 113); const sp = figma.createFrame(); sp.name = 'Filler'; sp.fills = []; r2.appendChild(sp); sp.resize(109, 10); sp.layoutGrow = 1; }
      else { await S.text(sc, 'More dishes', 'ML/Secondary Medium', 'ink-secondary'); const w = S.frame(sc, 'More dish chips', { dir: 'H', gap: 8, wrap: true }); w.layoutSizingHorizontal = 'FILL'; w.counterAxisSpacing = 8;
        for (const d of ['Chutney', 'Mint Chutney', 'Idly Podi', 'Bread', 'Butter', 'Jam', 'Tea', 'Coffee', 'Milk', 'Masala Omelet']) { const p = S.frame(w, 'Dish chip / ' + d, { dir: 'H', gap: 6, radius: 22 }); p.counterAxisAlignItems = 'CENTER'; p.paddingLeft = 12; p.paddingRight = 16; p.counterAxisSizingMode = 'FIXED'; p.resize(10, 44); p.primaryAxisSizingMode = 'AUTO'; p.strokes = [S.paint('border')]; p.strokeWeight = 1.5;
          const dm = await S.v(S.ID.diet, { Diet: NV[d] ? 'Non-veg' : 'Veg' }, null, p); dm.resize(16, 16); await S.text(p, d, 'ML/Secondary Medium', 'ink'); }
        const sv = await special(sc, 'service'); sv.layoutSizingHorizontal = 'FILL'; }
      await foot(sc, 'Waiting, cleanliness, staff: use Community.'); await foot(sc, 'Unsafe or unwell? Use SOS', true); }
    if (['wrong', 'note', 'sending', 'failed', 'offline'].includes(k)) { const dish = it.dish || 'Sambar'; const set = SETS[TYPE[dish] || 'Curry'];
      if (k === 'offline') { const ob = await S.v(S.ID.offline, {}, { Message: "You're offline. Saved. Will send." }, sc); ob.layoutSizingHorizontal = 'FILL'; ob.name = 'OfflineBanner'; }
      await S.text(sc, "What's wrong?", 'ML/Secondary Medium', 'ink-secondary');
      let row = null; let i = 0;
      for (const p of set) { if (!row || row.children.length >= 2) { row = S.frame(sc, 'Problem row', { dir: 'H', gap: 12 }); row.layoutSizingHorizontal = 'FILL'; }
        const sel = i === 0; const cnt = i < 2 && dish === 'Sambar'; const t = await S.v(S.ID.problem, { Selected: sel ? 'Yes' : 'No', Count: cnt ? 'Yes' : 'No' }, cnt ? { Problem: p, Count: i === 0 ? '6 others' : '1 other' } : { Problem: p }, row); t.layoutGrow = 1; t.name = 'ProblemTile / ' + p;
        const g = t.findOne(n => n.name === 'ProblemGlyph'); if (g) g.setProperties({ Glyph: GLY[p] || 'Little' }); i++; }
      if (row.children.length < 2) { const sp = figma.createFrame(); sp.name = 'Filler'; sp.fills = []; row.appendChild(sp); sp.resize(170, 10); sp.layoutGrow = 1; }
      await S.text(sc, 'How bad?', 'ML/Secondary Medium', 'ink-secondary'); const sv = await S.v(S.ID.sev, { Value: 'Quite' }, null, sc); sv.layoutSizingHorizontal = 'FILL'; sv.name = 'SeveritySegmented';
      if (k === 'note') { const fld = await S.v('75:332', {}, { Label: 'Note (optional)', Value: 'Much saltier than usual. Could not finish it.', 'Show Helper': false }, sc); fld.layoutSizingHorizontal = 'FILL'; fld.name = 'Note'; }
      else { const nl = await S.text(sc, 'Add a note (optional)', 'ML/Secondary Medium', 'ink'); nl.textDecoration = 'UNDERLINE'; nl.name = 'Link / Add a note'; }
      if (k === 'failed') { const e = S.card(sc, 'Error card', { fill: 'urgent-tint', stroke: 'urgent', dir: 'H', gap: 12 }); S.icon(e, 'exclamationmark.triangle', 22, 'urgent'); const tx = await S.text(e, "Couldn't send. Try again", 'ML/Body Semibold', 'ink'); tx.layoutGrow = 1; tx.textAutoResize = 'HEIGHT'; }
      const sb = await S.btn(sc, k === 'sending' ? 'Sending…' : k === 'failed' ? 'Try again' : 'Send', 'Primary', 'fill', 60); sb.name = 'Button / Send'; if (k === 'sending') sb.opacity = 0.6;
      await foot(sc, 'The kitchen sees the dish, the problem and how bad. Never your name.'); await foot(sc, 'Unsafe or unwell? Use SOS', true); }
    if (k === 'sent') { await done(sc, 'The kitchen saw it', 'Sambar · Too salty · Quite', 'Sent 9:41 AM'); const m = await foot(sc, 'See it in My feedback', true); const d = await S.btn(sc, 'Done', 'Primary', 'fill', 60); d.name = 'Button / Done'; }
    fitSheet(f, sh, sc); await closeBack(sh);
  } else {
    ({ f, c } = await S.screen(pg, it.name, it.x, it.y, { title: 'My feedback', subtitle: 'What you reported and what happened', back: true, tab: 'You', time: '9:40' })); c.itemSpacing = 14;
    if (k === 'myoffline') { const ob = await S.v(S.ID.offline, {}, { Message: "You're offline. Showing what was saved at 9:12 AM." }, c); ob.layoutSizingHorizontal = 'FILL'; ob.name = 'OfflineBanner'; }
    if (k === 'myempty') { const e = await S.v(S.ID.empty, {}, null, c); e.layoutSizingHorizontal = 'FILL'; e.name = 'EmptyState'; const set = {}; for (const kk of Object.keys(e.componentProperties)) { if (kk.startsWith('Title')) set[kk] = 'No reports yet'; if (kk.startsWith('Body')) set[kk] = 'When you tell the kitchen about a dish, it shows here with what happened.'; if (kk.startsWith('Show Action')) set[kk] = false; } e.setProperties(set); }
    else {
      const hero = S.frame(c, 'Reports hero', { gap: 10, fill: 'hero-bg', radius: 30 }); hero.layoutSizingHorizontal = 'FILL'; hero.paddingLeft = hero.paddingRight = hero.paddingTop = hero.paddingBottom = 24;
      const e = await S.text(hero, 'YOUR REPORTS', 'Label/Eyebrow', 'on-hero-secondary'); e.letterSpacing = { unit: 'PERCENT', value: 6 };
      const cr = S.frame(hero, 'Count', { dir: 'H', gap: 10 }); cr.counterAxisAlignItems = 'BASELINE'; await S.text(cr, '3', 'ML/Hero Metric', 'on-hero'); await S.text(cr, 'this month', 'ML/Body', 'on-hero-secondary');
      const chips = S.frame(hero, 'Chips', { dir: 'H', gap: 8 }); for (const [t, lime] of [['2 fixed', 1], ['1 with the kitchen', 0]]) { const p = S.frame(chips, 'Chip / ' + t, { dir: 'H', radius: 18 }); p.counterAxisAlignItems = 'CENTER'; p.paddingLeft = p.paddingRight = 16; p.counterAxisSizingMode = 'FIXED'; p.resize(10, 36); p.primaryAxisSizingMode = 'AUTO'; if (lime) p.fills = [S.paint('lime')]; else { p.fills = []; p.strokes = [S.paint('on-hero-secondary')]; p.strokeWeight = 1.5; } await S.text(p, t, 'ML/Secondary Medium', lime ? 'on-lime' : 'on-hero'); }
      const ask = S.card(c, 'Needs your answer', { gap: 10, stroke: 'ink' }); ask.strokeWeight = 2; ask.paddingLeft = ask.paddingRight = 20; ask.paddingTop = ask.paddingBottom = 18;
      const tr = S.frame(ask, 'Title row', { dir: 'H', gap: 8 }); tr.layoutSizingHorizontal = 'FILL'; tr.counterAxisAlignItems = 'CENTER'; const tt = await S.text(tr, 'Sambar · Too salty', 'ML/Section', 'ink'); tt.layoutGrow = 1; tt.textAutoResize = 'HEIGHT';
      const fx = S.frame(tr, 'Fixed chip', { dir: 'H', radius: 16 }); fx.counterAxisAlignItems = 'CENTER'; fx.paddingLeft = fx.paddingRight = 12; fx.counterAxisSizingMode = 'FIXED'; fx.resize(10, 32); fx.primaryAxisSizingMode = 'AUTO'; fx.fills = [S.paint('lime')]; fx.strokes = [S.paint('lime-outline')]; fx.strokeWeight = 1.5; await S.text(fx, 'Fixed Thu', 'ML/Tag', 'on-lime');
      await S.text(ask, 'Less salt from Thursday 8 Aug.', 'ML/Secondary', 'ink-secondary');
      if (k === 'mybetter') { const r = S.frame(ask, 'Answered', { dir: 'H', gap: 8 }); r.counterAxisAlignItems = 'CENTER'; S.icon(r, 'checkmark.circle', 20, 'success'); await S.text(r, 'You said: better. Thanks, the kitchen sees it.', 'ML/Secondary Medium', 'ink'); }
      else { const r = S.frame(ask, 'Better row', { dir: 'H', gap: 8 }); r.layoutSizingHorizontal = 'FILL'; r.counterAxisAlignItems = 'CENTER'; const q = await S.text(r, 'Better today?', 'ML/Body Semibold', 'ink'); q.layoutGrow = 1; const b1 = await S.btn(r, 'Better', 'Primary', 100, 48); const b2 = await S.btn(r, 'Same', 'Secondary', 92, 48); }
      for (const [t, sub, steps] of [['Chappathi · Hard', 'Seen by the kitchen · Mon 12 Aug', 2], ['Veg Pulao · Mushy', 'Reported · Fri 9 Aug', 1]]) { const k2 = S.card(c, 'Report / ' + t, { gap: 8, stroke: null }); k2.paddingLeft = k2.paddingRight = 20; await S.text(k2, t, 'ML/Section', 'ink'); await S.text(k2, sub, 'ML/Secondary', 'ink-secondary');
        const pr = S.frame(k2, 'Progress', { dir: 'H', gap: 6 }); pr.layoutSizingHorizontal = 'FILL'; for (let i = 1; i <= 3; i++) { const r = figma.createRectangle(); r.name = 'Step ' + i; r.resize(90, 8); r.cornerRadius = 4; pr.appendChild(r); r.layoutGrow = 1; r.fills = [S.paint(i <= steps ? 'ink' : 'track')]; } }
    }
  }
  if (args.notes) await S.notes(f, it.name, k.startsWith('my') ? 'Wed 14 Aug 2024, 9:40 AM' : 'Wed 14 Aug 2024, 9:40 AM (after breakfast)');
  out.push(f.id + ' ' + f.name);
}
return out;
