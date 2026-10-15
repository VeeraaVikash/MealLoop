// Student-redesign P8 SOS builder (stored as mealloop/srp8). Body of async function(figma, args).
// args {pageId, notes, items:[{kind, id?, x, y, name}]}
// kinds: choose, chooseUnwell, camera, cameraNoGps, cameraDenied, review, reviewNoGps, reviewNoPhoto, offline, failed, sent
const AF = Object.getPrototypeOf(async function(){}).constructor;
const S = await new AF('figma', 'args', figma.root.getSharedPluginData('mealloop', 'srh'))(figma, {});
const pg = await figma.getNodeByIdAsync(args.pageId); const out = [];
const OPTS = [['Found something in my food', 'magnifyingglass'], ['Food smells or looks spoiled', 'nose'], ['I feel unwell after eating', 'hand.raised'], ['Another safety problem', 'exclamationmark.triangle']];
const DISHES = ['Masala Sambar', 'Veg Pulao', 'Muttar Masala', 'Chappati', 'Tomato Dal', 'Bhindi Aloo Bujjiya'];
const darkStatus = f => { const st = f.findOne(n => n.name === 'Status Bar'); if (st) for (const n of st.findAll(n => 'fills' in n && n.type !== 'FRAME' && n.fills && n.fills.length)) n.fills = [S.paint('on-hero')]; };
const foot = async (c, t, cls) => { const x = await S.text(c, t, 'ML/Footnote', cls || 'ink-secondary', { w: 353 }); x.textAlignHorizontal = 'CENTER'; x.layoutSizingHorizontal = 'FILL'; return x; };
for (const it of args.items) {
  let f, c; const k = it.kind;
  const dark = /^camera/.test(k);
  const o = dark ? { noNav: true, noTab: true, backdrop: 'None', time: '12:45' } : { title: k === 'sent' ? 'SOS sent' : /^review|offline|failed/.test(k) ? 'Review SOS' : 'SOS', subtitle: k === 'sent' ? 'Found something in my food · Masala Sambar' : /^review|offline|failed/.test(k) ? 'Check the proof, then send.' : "What's wrong? Pick one.", back: k !== 'sent', noTab: true, time: '12:45' };
  if (it.id) { f = await figma.getNodeByIdAsync(it.id); ({ c } = await S.reframe(f, o)); if (it.x !== undefined) { f.x = it.x; f.y = it.y; } } else ({ f, c } = await S.screen(pg, it.name, it.x, it.y, o));
  f.name = it.name; c.itemSpacing = 14;
  if (dark) { f.setExplicitVariableModeForCollection(await figma.variables.getVariableCollectionByIdAsync('VariableCollectionId:45:2'), '45:1'); f.fills = [S.paint('hero-bg')]; darkStatus(f); c.itemSpacing = 16; { const sef = f.findOne(n => n.name === 'Scroll edge fade'); if (sef) sef.visible = false; }
    const top = S.frame(c, 'Camera top', { dir: 'H', gap: 12 }); top.layoutSizingHorizontal = 'FILL'; top.counterAxisAlignItems = 'CENTER';
    const x = S.frame(top, 'Close', { dir: 'H', radius: 22 }); x.primaryAxisAlignItems = 'CENTER'; x.counterAxisAlignItems = 'CENTER'; x.counterAxisSizingMode = 'FIXED'; x.resize(44, 44); x.primaryAxisSizingMode = 'FIXED'; x.fills = [S.paint('pass-bg')]; x.strokes = [S.paint('on-hero-secondary')]; x.strokeWeight = 1; S.icon(x, 'xmark', 20, 'on-hero');
    const gps = S.frame(top, 'GPS chip', { dir: 'H', gap: 8, radius: 22 }); gps.counterAxisAlignItems = 'CENTER'; gps.paddingLeft = gps.paddingRight = 16; gps.counterAxisSizingMode = 'FIXED'; gps.resize(10, 44); gps.primaryAxisSizingMode = 'AUTO'; gps.fills = [S.paint('pass-bg')]; gps.strokes = [S.paint('on-hero-secondary')]; gps.strokeWeight = 1;
    const d = figma.createEllipse(); d.resize(10, 10); gps.appendChild(d); d.fills = [S.paint(k === 'cameraNoGps' ? 'on-hero-error' : 'lime')];
    await S.text(gps, k === 'cameraNoGps' ? 'No GPS · place not recorded' : k === 'cameraDenied' ? 'Main Mess · ±8 m' : 'Main Mess · ±8 m', 'ML/Secondary Medium', 'on-hero');
    await S.text(c, k === 'cameraDenied' ? 'Camera is off for MealLoop' : 'Take a photo of the problem', 'ML/Section', 'on-hero');
    const vf = figma.createFrame(); vf.name = 'Viewfinder'; c.appendChild(vf); vf.layoutSizingHorizontal = 'FILL'; vf.resize(353, 420); vf.cornerRadius = 24; vf.fills = [S.paint('surface-raised')]; vf.clipsContent = false;
    if (k !== 'cameraDenied') { for (const [dd, a] of [[300, .06], [220, .08], [100, .12]]) { const e = figma.createEllipse(); e.resize(dd, dd); e.x = 176 - dd / 2; e.y = 210 - dd / 2; e.fills = [S.paint('on-hero')]; e.opacity = a; vf.appendChild(e); }
      for (const b of ['TL', 'TR', 'BL', 'BR']) { const l = figma.createVector(); vf.appendChild(l); const X = b[1] === 'L' ? -2 : 355, Y = b[0] === 'T' ? -2 : 422; const dx = b[1] === 'L' ? 40 : -40, dy = b[0] === 'T' ? 40 : -40; l.vectorPaths = [{ windingRule: 'NONE', data: 'M ' + X + ' ' + (Y + dy) + ' L ' + X + ' ' + Y + ' L ' + (X + dx) + ' ' + Y }]; l.strokes = [S.paint('lime')]; l.strokeWeight = 4; l.strokeCap = 'ROUND'; l.fills = []; l.name = 'Bracket ' + b; }
      const ts = S.frame(vf, 'Time stamp', { dir: 'H', radius: 16, fill: 'hero-bg' }); ts.paddingLeft = ts.paddingRight = 12; ts.paddingTop = ts.paddingBottom = 6; ts.x = 16; ts.y = 372; await S.text(ts, '12:45:12 PM', 'ML/Metric Unit', 'on-hero'); }
    else { vf.layoutMode = 'VERTICAL'; vf.primaryAxisAlignItems = 'CENTER'; vf.counterAxisAlignItems = 'CENTER'; vf.itemSpacing = 12; vf.primaryAxisSizingMode = 'FIXED'; vf.counterAxisSizingMode = 'FIXED'; vf.resize(353, 420); vf.paddingLeft = vf.paddingRight = 24;
      S.icon(vf, 'camera', 44, 'on-hero-secondary'); const t = await S.text(vf, 'MealLoop needs the camera for a live photo. Turn it on in Settings, or send without a photo.', 'ML/Body', 'on-hero', { w: 300 }); t.textAlignHorizontal = 'CENTER';
      const ob = S.frame(vf, 'Button / Open Settings', { dir: 'H', radius: 28 }); ob.primaryAxisAlignItems = 'CENTER'; ob.counterAxisAlignItems = 'CENTER'; ob.counterAxisSizingMode = 'FIXED'; ob.resize(10, 52); ob.primaryAxisSizingMode = 'AUTO'; ob.paddingLeft = ob.paddingRight = 24; ob.fills = [S.paint('hero-pill')]; await S.text(ob, 'Open Settings', 'ML/Body Semibold', 'ink'); }
    if (k !== 'cameraDenied') { const t1 = await S.text(c, 'Keep the problem in the frame.', 'ML/Body', 'on-hero', { w: 353 }); t1.textAlignHorizontal = 'CENTER'; t1.layoutSizingHorizontal = 'FILL';
      const t2 = await S.text(c, "Live camera only. Gallery photos aren't accepted.", 'ML/Footnote', 'on-hero-secondary', { w: 353 }); t2.textAlignHorizontal = 'CENTER'; t2.layoutSizingHorizontal = 'FILL';
      const sh = S.frame(c, 'Shutter row', { dir: 'H' }); sh.layoutSizingHorizontal = 'FILL'; sh.primaryAxisAlignItems = 'CENTER'; const ring = figma.createFrame(); ring.name = 'Shutter'; ring.resize(76, 76); ring.cornerRadius = 38; ring.fills = []; ring.strokes = [S.paint('on-hero')]; ring.strokeWeight = 4; sh.appendChild(ring); const inner = figma.createEllipse(); inner.resize(60, 60); inner.x = 8; inner.y = 8; inner.fills = [S.paint('on-hero')]; ring.appendChild(inner); }
    else { const s = S.frame(c, 'Button / Send without photo', { dir: 'H', radius: 30 }); s.layoutSizingHorizontal = 'FILL'; s.primaryAxisAlignItems = 'CENTER'; s.counterAxisAlignItems = 'CENTER'; s.counterAxisSizingMode = 'FIXED'; s.resize(353, 60); s.fills = []; s.strokes = [S.paint('on-hero')]; s.strokeWeight = 1.5; await S.text(s, 'Send without photo', 'ML/Body Semibold', 'on-hero');
      const t2 = await S.text(c, 'It is sent flagged: the team will ask you for details.', 'ML/Footnote', 'on-hero-secondary', { w: 353 }); t2.textAlignHorizontal = 'CENTER'; t2.layoutSizingHorizontal = 'FILL'; }
  } else if (k === 'choose' || k === 'chooseUnwell') {
    for (const [i, [label, icon]] of OPTS.entries()) { const sel = (k === 'choose' && i === 0) || (k === 'chooseUnwell' && i === 2);
      const r = S.frame(c, 'Option / ' + label, { dir: 'H', gap: 14, radius: 30 }); r.layoutSizingHorizontal = 'FILL'; r.counterAxisAlignItems = 'CENTER'; r.paddingLeft = 14; r.paddingRight = 16; r.paddingTop = r.paddingBottom = 12; r.minHeight = 68;
      r.fills = [S.paint(sel ? 'hero-bg' : 'surface')]; if (!sel) { r.strokes = [S.paint('border')]; r.strokeWeight = 1.5; }
      const ic = S.frame(r, 'Icon', { dir: 'H', radius: 22, fill: sel ? 'pass-bg' : 'fill-quiet' }); ic.primaryAxisAlignItems = 'CENTER'; ic.counterAxisAlignItems = 'CENTER'; ic.counterAxisSizingMode = 'FIXED'; ic.resize(44, 44); ic.primaryAxisSizingMode = 'FIXED'; S.icon(ic, icon, 22, sel ? 'on-hero' : 'ink');
      const t = await S.text(r, label, 'ML/Body', sel ? 'on-hero' : 'ink'); t.layoutGrow = 1; t.textAutoResize = 'HEIGHT';
      if (sel) { const ck = figma.createFrame(); ck.name = 'Selected'; ck.resize(32, 32); ck.cornerRadius = 16; ck.fills = [S.paint('lime')]; r.appendChild(ck); ck.layoutMode = 'HORIZONTAL'; ck.primaryAxisAlignItems = 'CENTER'; ck.counterAxisAlignItems = 'CENTER'; S.icon(ck, 'checkmark', 18, 'on-lime'); } }
    await S.text(c, 'Which dish? (optional)', 'ML/Secondary Medium', 'ink-secondary');
    const w = S.frame(c, 'Dish chips', { dir: 'H', gap: 8, wrap: true }); w.layoutSizingHorizontal = 'FILL'; w.counterAxisSpacing = 8;
    for (const d of DISHES) { const sel = k === 'choose' && d === 'Masala Sambar'; const p = S.frame(w, 'Dish chip / ' + d, { dir: 'H', radius: 22 }); p.counterAxisAlignItems = 'CENTER'; p.paddingLeft = p.paddingRight = 16; p.counterAxisSizingMode = 'FIXED'; p.resize(10, 44); p.primaryAxisSizingMode = 'AUTO'; p.fills = sel ? [S.paint('action')] : []; p.strokes = [S.paint(sel ? 'action' : 'border-control')]; p.strokeWeight = 1.5; await S.text(p, d, 'ML/Secondary Medium', sel ? 'on-action' : 'ink'); }
    const b = await S.btn(c, k === 'choose' ? 'Next: take a photo' : 'Next: add a photo (optional)', 'Primary', 'fill', 64); b.name = 'Button / Next';
    if (k === 'chooseUnwell') { const s = await S.btn(c, 'Send without photo', 'Secondary', 'fill', 56); s.name = 'Button / Send without photo'; }
    await foot(c, 'A live photo and your location go with it. The food head and mess supervisor are told at once.');
    const m = await foot(c, 'Medical emergency? Get help first.', 'ink'); m.name = 'Link / Medical emergency';
  } else if (k === 'sent') {
    const card = S.frame(c, 'Sent card', { gap: 14, fill: 'hero-bg', radius: 30 }); card.layoutSizingHorizontal = 'FILL'; card.paddingLeft = card.paddingRight = card.paddingTop = card.paddingBottom = 24;
    const r = S.frame(card, 'Sent at', { dir: 'H', gap: 8 }); r.counterAxisAlignItems = 'CENTER'; const d = figma.createEllipse(); d.resize(10, 10); d.fills = [S.paint('lime')]; r.appendChild(d); await S.text(r, 'Sent 12:45 PM', 'ML/Secondary', 'on-hero-secondary');
    const h = await S.text(card, "We've told the kitchen team.", 'ML/Title', 'on-hero', { w: 305 }); h.layoutSizingHorizontal = 'FILL';
    const loc = S.frame(card, 'Proof summary', { dir: 'H', gap: 14, fill: 'pass-bg', radius: 20 }); loc.layoutSizingHorizontal = 'FILL'; loc.counterAxisAlignItems = 'CENTER'; loc.paddingLeft = loc.paddingRight = 16; loc.paddingTop = loc.paddingBottom = 14;
    const th = figma.createFrame(); th.name = 'Photo thumb'; th.resize(48, 48); th.cornerRadius = 24; th.fills = [S.paint('ink-secondary')]; loc.appendChild(th); { const ci = S.icon(th, 'camera', 20, 'on-hero-secondary'); ci.x = 14; ci.y = 14; }
    const lt = S.frame(loc, 'Text', { gap: 2 }); await S.text(lt, 'Main Mess · photo attached', 'ML/Body', 'on-hero'); await S.text(lt, '12:45 PM · within 8 m', 'ML/Footnote', 'on-hero-secondary');
    const rail = S.frame(card, 'Status rail', { gap: 4 }); rail.layoutSizingHorizontal = 'FILL';
    for (const [i, [l, t]] of [['Reported', '12:45'], ['Team told', '12:50'], ['Food held', ''], ['Checked', '']].entries()) { const row = S.frame(rail, 'Step / ' + l, { dir: 'H', gap: 14 }); row.layoutSizingHorizontal = 'FILL'; row.counterAxisAlignItems = 'CENTER'; row.minHeight = 44;
      const dot = figma.createFrame(); dot.name = 'Mark'; dot.resize(28, 28); dot.cornerRadius = 14; row.appendChild(dot); dot.layoutMode = 'HORIZONTAL'; dot.primaryAxisAlignItems = 'CENTER'; dot.counterAxisAlignItems = 'CENTER';
      if (i === 0) { dot.fills = [S.paint('lime')]; S.icon(dot, 'checkmark', 16, 'on-lime'); } else if (i === 1) { dot.fills = []; dot.strokes = [S.paint('lime')]; dot.strokeWeight = 3; } else { dot.fills = []; dot.strokes = [S.paint('on-hero-secondary')]; dot.strokeWeight = 1.5; dot.dashPattern = [3, 3]; }
      const tx = await S.text(row, l, i === 1 ? 'ML/Body Semibold' : 'ML/Body', i < 2 ? 'on-hero' : 'on-hero-secondary'); tx.layoutGrow = 1; if (t) await S.text(row, t, 'ML/Metric Unit', 'on-hero-secondary'); }
    await S.text(card, "You'll get a message when it's checked.", 'ML/Secondary', 'on-hero-secondary');
    await foot(c, 'Feeling unwell? Tell a warden or call for help now.', 'ink');
    const dn = await S.btn(c, 'Done', 'Primary', 'fill', 64); dn.name = 'Button / Done';
  } else {
    if (k === 'offline') { const ob = await S.v(S.ID.offline, {}, { Message: "You're offline. SOS sends the moment you're back. Tell the counter staff now." }, c); ob.layoutSizingHorizontal = 'FILL'; ob.name = 'OfflineBanner'; }
    const st = k === 'reviewNoGps' ? 'GPS unavailable' : k === 'reviewNoPhoto' ? 'No photo' : 'Live';
    const pc = await S.v(S.ID.proof, { State: st, Context: 'Student' }, { What: k === 'reviewNoPhoto' ? 'I feel unwell after eating · Lunch' : 'Found something in my food · Masala Sambar' }, c); pc.layoutSizingHorizontal = 'FILL'; pc.name = 'ProofCard';
    const ch = await S.v(S.ID.checks, { State: k === 'reviewNoGps' ? 'GPS unavailable' : k === 'reviewNoPhoto' ? 'No photo' : 'All passed' }, null, c); ch.layoutSizingHorizontal = 'FILL'; ch.name = 'ProofChecks';
    if (k === 'failed') { const e = S.card(c, 'Error card', { fill: 'urgent-tint', stroke: 'urgent', dir: 'H', gap: 12 }); S.icon(e, 'exclamationmark.triangle', 22, 'urgent'); const tx = await S.text(e, "Couldn't send SOS. Try again, and tell the counter staff now.", 'ML/Body Semibold', 'ink'); tx.layoutGrow = 1; tx.textAutoResize = 'HEIGHT'; }
    const b = await S.btn(c, k === 'failed' ? 'Try again' : k === 'offline' ? 'Send when online' : 'Send SOS', 'Primary', 'fill', 64); b.name = 'Button / Send SOS';
    await foot(c, 'The food head and mess supervisor are told at once. The photo and location go with it.');
  }
  if (args.notes) { const near = pg.children.filter(n => n !== f && n.x >= f.x - 2 && n.x < f.x + 393 && ((n.y >= f.y - 80 && n.y < f.y) || (n.y >= f.y + 852 && n.y < f.y + 1010))); for (const n of near) n.remove(); await S.notes(f, it.name, 'Wed 14 Aug 2024, 12:45 PM (lunch)'); }
  out.push(f.id + ' ' + f.name + ' h' + Math.round(c.height));
}
for (const p of figma.root.children) p.flowStartingPoints = p.flowStartingPoints.filter(s => !/^Flow \d+$/.test(s.name));
return out;
