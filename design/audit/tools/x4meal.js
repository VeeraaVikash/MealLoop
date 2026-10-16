// ADMIN-REDESIGN X4 Meal pages builder (stored as mealloop/x4meal). Body of async function(figma, args). args: { items: [spec] }
// spec.kind: 'live' (A03: Live chip, ChainStepper, came-in card with "usual by now" tick and "This is not the final count", Rice card with
// Tell the vendor, staff-reported foods), 'report' (A04: ReportTicket, facts with done / missing marks, actions), 'safety' (A05: case card
// with live-photo proof, SafetyRail, closing note, actions). Other keys: name, x, y, title, subtitle, time, moment, banner, eyebrow, came,
// status, noHistory, rice, foods, facts, cnt, actions, closed, stage, note. The Live chip was later moved to y 149 (decision 36).
const AF = Object.getPrototypeOf(async function(){}).constructor;
const A = await new AF('figma', 'args', figma.root.getSharedPluginData('mealloop', 'adm'))(figma, {});
const pg = await figma.getNodeByIdAsync('2237:2'); const out = [];
for (const it of args.items) {
  const tab = it.kind === 'report' ? 'Results' : 'Today';
  const { f, c } = await A.screen(pg, it.name, it.x, it.y, { title: it.title, subtitle: it.subtitle, back: true, tab, time: it.time, gap: 16, moment: it.moment });
  if (it.banner) { const b = await A.v(A.ID.offline, {}, null, c); b.layoutSizingHorizontal = 'FILL'; await A.setText(b.findOne(n => n.type === 'TEXT'), it.banner); }
  if (it.kind === 'live') {
    const lc = await A.use(f, 'chip', { Style: 'Lime' }, { Label: 'Live' }); lc.name = 'Live chip'; lc.x = 393 - 20 - lc.width; lc.y = 138;
    const ch = await A.use(c, 'chain', { Steps: '4', Current: '4' }, { 'Label 1': 'Forecast', 'Label 2': 'Sent', 'Label 3': 'Vendor', 'Label 4': 'Serving' }); ch.name = 'ChainStepper';
    const h = A.hero(c, 'Came in card', { gap: 8 });
    await A.t(h, it.eyebrow || 'CAME IN SO FAR · 1:40 PM', 'Label/Eyebrow', 'on-hero-secondary', { ls: 6 });
    const r = A.frame(h, 'Count', { dir: 'H', gap: 8 }); r.counterAxisAlignItems = 'BASELINE'; const n = await A.t(r, it.came || '712', 'ML/Hero Metric', 'on-hero', { name: 'Came in' }); n.fontSize = 88; await A.t(r, 'of 860 expected', 'ML/Body', 'on-hero-secondary');
    const bar = figma.createFrame(); bar.name = 'Progress'; bar.fills = []; h.appendChild(bar); bar.layoutSizingHorizontal = 'FILL'; bar.resize(313, 14); bar.clipsContent = false;
    const tr = figma.createRectangle(); bar.appendChild(tr); tr.resize(313, 10); tr.y = 2; tr.cornerRadius = 5; tr.fills = [A.paint('ink-secondary')];
    const fl = figma.createRectangle(); bar.appendChild(fl); fl.name = 'Came in'; fl.resize(Math.round(313 * Number((it.came || '712')) / 860), 10); fl.y = 2; fl.cornerRadius = 5; fl.fills = [A.paint('on-hero')];
    if (!it.noHistory) { const tk = figma.createRectangle(); bar.appendChild(tk); tk.name = 'Usual by now'; tk.resize(2, 18); tk.x = Math.round(313 * 690 / 860); tk.y = -2; tk.fills = [A.paint('ink')]; }
    const u = await A.t(h, it.noHistory ? 'Not enough history yet' : 'usual by now ~690', 'ML/Footnote', 'on-hero-secondary', { fill: true }); u.textAlignHorizontal = 'RIGHT';
    await A.t(h, it.status || 'On track. This is not the final count.', 'ML/Secondary Medium', 'on-hero', { fill: true, name: 'Status' });
    await A.label(c, 'Food left · reported by staff');
    if (it.rice) { const k = A.card(c, 'Rice card', { gap: 8, pad: 16, stroke: 'ink', radius: 24 });
      const tr2 = A.frame(k, 'Top', { dir: 'H', gap: 10 }); tr2.layoutSizingHorizontal = 'FILL'; tr2.counterAxisAlignItems = 'CENTER'; const p = await A.v(A.ID.pic, { Type: 'Rice', Tone: 'Ink' }, null, tr2); p.resize(28, 28);
      const nm = await A.t(tr2, 'Rice', 'ML/Card Heading', 'ink'); nm.layoutGrow = 1; await A.use(tr2, 'chip', { Style: it.rice[0] }, { Label: it.rice[1] });
      await A.t(k, it.rice[2], 'ML/Secondary', 'ink-secondary', { fill: true }); await A.btn(k, 'Tell the vendor', 'black', { h: 48 }); }
    const list = A.frame(c, 'Foods', { gap: 0 }); list.layoutSizingHorizontal = 'FILL';
    for (const [type, nm, right] of (it.foods || [['Curry', 'Sambar', '12 L left · OK'], ['Bread', 'Chapati', 'OK']])) {
      const row = await A.row(list, nm, null, async r => { await A.t(r, right, 'ML/Secondary', 'ink-secondary'); }, { py: 10, titleStyle: 'ML/Body' });
      const p = await A.v(A.ID.pic, { Type: type, Tone: 'Ink' }, null, null); row.insertChild(0, p); p.resize(28, 28); }
    A.sep(list);
  }
  if (it.kind === 'report') {
    const tk = await A.use(c, 'ticket', { Status: it.status || 'Needs review' }); tk.name = 'ReportTicket'; tk.layoutSizingHorizontal = 'FILL';
    const cl = A.frame(c, 'Facts', { gap: 10 }); cl.layoutSizingHorizontal = 'FILL';
    for (const [done, txt] of (it.facts || [[1, 'Headcount raised 800 → 860 · staff event'], [1, '786 came in, 74 fewer than sent'], [0, 'Did the event add diners? Not recorded']])) {
      const r = A.frame(cl, 'Fact', { dir: 'H', gap: 10 }); r.layoutSizingHorizontal = 'FILL'; r.counterAxisAlignItems = 'CENTER';
      const d = A.frame(r, 'Mark', { dir: 'H', radius: 12 }); d.resize(24, 24); d.primaryAxisSizingMode = 'FIXED'; d.counterAxisSizingMode = 'FIXED'; d.primaryAxisAlignItems = 'CENTER'; d.counterAxisAlignItems = 'CENTER'; d.strokes = [A.paint('ink')]; d.strokeWeight = 1.5; d.strokeAlign = 'INSIDE';
      if (done) A.icon(d, 'checkmark', 14, 'ink'); else d.dashPattern = [3, 3];
      const t = await A.t(r, txt, 'ML/Secondary', 'ink'); t.layoutGrow = 1; t.textAutoResize = 'HEIGHT'; }
    if (it.cnt) await A.row(c, 'Check next time started', 'Wednesday lunch · testing until 2 comparable meals', undefined, { titleStyle: 'ML/Body Semibold' });
    const act = A.frame(c, 'Actions', { dir: 'H', gap: 12 }); act.layoutSizingHorizontal = 'FILL';
    for (const [l, k] of (it.actions || [['Tell the vendor', 'outline'], ['Check next time', 'black']])) { const b = await A.btn(act, l, k, { h: 56, px: 12 }); b.layoutGrow = 1; }
  }
  if (it.kind === 'safety') {
    const h = A.hero(c, 'Case card', { gap: 12 });
    const e = A.frame(h, 'Status', { dir: 'H', gap: 8 }); e.counterAxisAlignItems = 'CENTER'; A.dot(e, it.closed ? 'next' : 'lime', 10); await A.t(e, it.eyebrow || 'OPEN · 55 MIN', 'Label/Eyebrow', 'on-hero-secondary', { ls: 6 });
    await A.t(h, 'Found something in food', 'ML/Section', 'on-hero', { fill: true });
    const pr = A.frame(h, 'Proof', { dir: 'H', gap: 12, radius: 16 }); pr.layoutSizingHorizontal = 'FILL'; pr.fills = [A.paint('ink-secondary')]; pr.paddingLeft = pr.paddingRight = 14; pr.paddingTop = pr.paddingBottom = 10; pr.counterAxisAlignItems = 'CENTER';
    const ph = A.frame(pr, 'Photo', { radius: 20 }); ph.resize(40, 40); ph.primaryAxisSizingMode = 'FIXED'; ph.counterAxisSizingMode = 'FIXED'; ph.fills = [A.paint('hero-bg')];
    const pt = A.frame(pr, 'Proof text', { gap: 2 }); pt.layoutGrow = 1; await A.t(pt, 'Main Mess · Block A · ±8 m', 'ML/Secondary Medium', 'on-hero', { fill: true }); await A.t(pt, '12:45 PM · photo taken live', 'ML/Footnote', 'on-hero', { fill: true });
    await A.label(c, 'Who did what');
    const rl = await A.use(c, 'rail', { Stage: it.stage || 'Open' }); rl.name = 'SafetyRail'; rl.layoutSizingHorizontal = 'FILL';
    if (it.note) { const k = A.card(c, 'Closing note', { gap: 4, pad: 16, radius: 20 }); await A.t(k, 'Closing note · Devi', 'ML/Footnote', 'ink-secondary'); await A.t(k, it.note, 'ML/Secondary', 'ink', { fill: true }); }
    if (it.actions) { const act = A.frame(c, 'Actions', { dir: 'H', gap: 12 }); act.layoutSizingHorizontal = 'FILL'; for (const [l, k] of it.actions) { const b = await A.btn(act, l, k, { h: 56, px: 12 }); b.layoutGrow = 1; } }
  }
  A.fade(f); out.push(f.id + ' ' + f.name + ' h' + Math.round(c.y + c.height));
}
return out;
