// KITCHEN W1 component builder (page 03). Body of async function(figma, args); loads pdb as D. args.part: 1 or 2.
// Part 1: LiveCard, HeadcountCard, ShortageRow, ReportStatusChip. Part 2: DishRow, KeyPad + Size=Decimal, QuantitySheet, HistoryRow, KitchenAlertRow.
// Text properties only where one default fits every variant (LiveCard Count, ShortageRow Title); per-variant samples stay as text overrides.
// Flagged sets go under the Pass Desk components (ShortageChips). IDs saved to mealloop/kt_ids.
const D = await new (Object.getPrototypeOf(async function(){}).constructor)('figma','args',figma.root.getSharedPluginData('mealloop','pdb'))(figma,{});
const pg = await figma.getNodeByIdAsync('44:5355'); await figma.setCurrentPageAsync(pg);
const ref = await figma.getNodeByIdAsync(D.DS.problem);
const KT = JSON.parse(figma.root.getSharedPluginData('mealloop','kt_ids') || '{}');
const styleSet = s => { s.fills = ref.fills; s.strokes = ref.strokes; s.strokeWeight = ref.strokeWeight; s.dashPattern = ref.dashPattern; s.cornerRadius = ref.cornerRadius; s.layoutMode = 'HORIZONTAL'; s.itemSpacing = 40; s.counterAxisAlignItems = 'MIN'; s.paddingLeft = s.paddingRight = s.paddingTop = s.paddingBottom = 30; s.primaryAxisSizingMode = 'AUTO'; s.counterAxisSizingMode = 'AUTO'; };
const comp = name => { const c = figma.createComponent(); c.name = name; c.fills = []; pg.appendChild(c); return c; };
const V = (c, gap) => { c.layoutMode = 'VERTICAL'; c.itemSpacing = gap; c.primaryAxisSizingMode = 'AUTO'; c.counterAxisSizingMode = 'FIXED'; c.resize(353, 100); };
const H = (c, gap) => { c.layoutMode = 'HORIZONTAL'; c.itemSpacing = gap; c.counterAxisAlignItems = 'CENTER'; c.resize(353, 56); c.primaryAxisSizingMode = 'FIXED'; c.counterAxisSizingMode = 'AUTO'; };
const stroke = (n, col, w, dash) => { n.strokes = [D.paint(col)]; n.strokeWeight = w; n.strokeAlign = 'INSIDE'; if (dash) n.dashPattern = [5, 4]; };
const topLine = n => { n.strokes = [D.paint('border')]; n.strokeTopWeight = 1; n.strokeBottomWeight = 0; n.strokeLeftWeight = 0; n.strokeRightWeight = 0; n.strokeAlign = 'INSIDE'; };
// words in sans, numbers and times in mono, one baseline: parts = [[text, mono], ...]
const mixed = async (parent, name, parts, sans, mono, colour) => { const r = D.frame(parent, name, { dir: 'H', gap: 4 }); r.counterAxisAlignItems = 'BASELINE';
  for (const [i, [tx, m]] of parts.entries()) await D.t(r, tx, m ? mono : sans, colour, { name: m ? 'Time' : 'Words ' + (i + 1) }); return r; };
const spacer = (parent, h) => { const s = D.frame(parent, 'Spacer', {}); s.resize(10, h); return s; };
let y = 0; { for (const n of pg.children) if (n.x < 2000) y = Math.max(y, n.y + n.height); y += 60; }
const place = s => { s.x = 0; s.y = y; y += s.height + 60; };
const bind = (set, prop, def, names) => { const k = set.addComponentProperty(prop, 'TEXT', def); for (const v of set.children) for (const t of v.findAll(n => n.type === 'TEXT' && names.includes(n.name))) t.componentPropertyReferences = { characters: k }; return k; };
const out = [];

if (args.part === 1) {
  // 1 LiveCard
  const lc = [];
  for (const st of ['Live', 'Stale', 'Offline']) { const c = comp('State=' + st); V(c, 4); c.fills = [D.paint('hero-bg')]; c.cornerRadius = 28; c.paddingLeft = c.paddingRight = c.paddingTop = c.paddingBottom = 20;
    const hd = D.frame(c, 'Header', { dir: 'H', gap: 8 }); hd.counterAxisAlignItems = 'CENTER';
    if (st === 'Live') D.dot(hd, 'lime', 10); else { const e = figma.createEllipse(); e.name = 'Dot · grey'; e.resize(10, 10); e.fills = [D.paint('on-hero-secondary')]; hd.appendChild(e); }
    const parts = st === 'Live' ? [['LIVE ·', 0], ['1:40 PM', 1]] : st === 'Stale' ? [['Updated', 0], ['1:40 PM', 1], ['· reconnecting', 0]] : [['OFFLINE · last count', 0], ['1:40 PM', 1]];
    await mixed(hd, 'Header text', parts, 'ML/Tag', 'ML/Mono Footnote', 'on-hero-secondary');
    spacer(c, 4);
    await D.t(c, '714', 'ML/Hero Metric', st === 'Offline' ? 'on-hero-secondary' : 'on-hero', { name: 'Count' });
    await D.t(c, 'students entered', 'ML/Body', 'on-hero-secondary', { fill: true, name: 'Label' });
    await D.t(c, st === 'Offline' ? 'No connection. The count updates when you are back online.' : 'Recorded at the door. Not meals served.', 'ML/Secondary', 'on-hero-secondary', { fill: true, name: 'Note' });
    spacer(c, 12);
    const b = await D.btn(c, 'Report food running short', 'limeOnDark', { h: 56 }); b.name = 'Button / Report food running short'; b.itemSpacing = 10; const ic = D.icon(b, 'exclamationmark.triangle', 22, 'on-lime'); b.insertChild(0, ic);
    lc.push(c); }
  const lcs = figma.combineAsVariants(lc, pg); lcs.name = 'LiveCard'; styleSet(lcs); place(lcs); bind(lcs, 'Count', '714', ['Count']);
  lcs.description = 'KITCHEN STAFF 2026-10 (new, flagged). Home during the meal (K02): the count of students ENTERED at the door (never meals served), "students entered", "Recorded at the door. Not meals served.", and the lime "Report food running short" pill inside the card. Never a forecast beside it and never a remaining count. States: Live (lime dot, "LIVE · time"); Stale (grey dot, "Updated 1:40 PM · reconnecting", last value kept); Offline (grey count, "OFFLINE · last count"). The count comes from the door entries feed (SIMULATED in Figma).';

  // 2 HeadcountCard
  const hc = [];
  for (const st of ['Ready', 'Loading', 'Stale', 'Unavailable']) { const c = comp('State=' + st); V(c, 4); c.fills = [D.paint('hero-bg')]; c.cornerRadius = 28; c.paddingLeft = c.paddingRight = c.paddingTop = c.paddingBottom = 20;
    if (st === 'Stale') { const ch = D.frame(c, 'Chip · stale', { dir: 'H', gap: 4, radius: 999 }); ch.paddingLeft = ch.paddingRight = 12; ch.paddingTop = ch.paddingBottom = 6; stroke(ch, 'on-hero-secondary', 1.5, true); ch.counterAxisAlignItems = 'BASELINE';
      for (const [tx, m] of [['Updated', 0], ['9:00 AM,', 1], ['may be out of date', 0]]) await D.t(ch, tx, m ? 'ML/Mono Footnote' : 'ML/Footnote', 'on-hero', { name: m ? 'Time' : 'Words' });
      spacer(c, 8); }
    const parts = st === 'Unavailable' || st === 'Loading' ? [['HEADCOUNT SENT', 0]] : [['HEADCOUNT SENT ·', 0], ['9:00 AM', 1]];
    await mixed(c, 'Header', parts, 'ML/Tag', 'ML/Mono Footnote', 'on-hero-secondary');
    spacer(c, 4);
    if (st === 'Ready' || st === 'Stale') { await D.t(c, '860', 'ML/Hero Metric', 'on-hero', { name: 'Count' }); await D.t(c, 'expected diners', 'ML/Body', 'on-hero-secondary', { fill: true, name: 'Label' }); }
    if (st === 'Loading') { const sk = D.frame(c, 'Skeleton', { gap: 10 }); spacer(sk, 2); for (const [w, h] of [[150, 52], [130, 18]]) { const r = figma.createRectangle(); r.name = 'Skeleton bar'; r.resize(w, h); r.cornerRadius = 10; r.fills = [D.paint('action-pressed')]; sk.appendChild(r); }
      await D.t(c, 'Loading the headcount…', 'ML/Body', 'on-hero-secondary', { fill: true, name: 'Label' }); }
    if (st === 'Unavailable') { await D.t(c, 'Headcount not sent yet.', 'ML/Section', 'on-hero', { fill: true, name: 'Title' }); await D.t(c, 'It shows here once it is sent to the vendor.', 'ML/Body', 'on-hero-secondary', { fill: true, name: 'Label' }); }
    spacer(c, 12);
    await D.t(c, st === 'Unavailable' ? 'Entries start at 12:00 PM.' : 'A forecast. Entries start at 12:00 PM.', 'ML/Secondary', 'on-hero-secondary', { fill: true, name: 'Note' });
    hc.push(c); }
  const hcs = figma.combineAsVariants(hc, pg); hcs.name = 'HeadcountCard'; styleSet(hcs); place(hcs);
  hcs.description = 'KITCHEN STAFF 2026-10 (new, flagged). Home before the meal (K01): "HEADCOUNT SENT · 9:00 AM", the approved headcount the management sent the vendor (a forecast, never a dish quantity), "expected diners", "A forecast. Entries start at 12:00 PM." States: Ready; Loading (skeleton, no number); Stale (chip "Updated 9:00 AM, may be out of date", number kept); Unavailable ("Headcount not sent yet.", no number, never 0). The headcount feed is SIMULATED in Figma.';

  // 3 ShortageRow
  const sr = [];
  for (const st of ['Sent', 'Seen', "Couldn't send"]) { const c = comp('State=' + st); H(c, 14); c.fills = [D.paint('surface')]; c.cornerRadius = 24; c.paddingLeft = c.paddingRight = 16; c.paddingTop = c.paddingBottom = 12;
    const ci = D.frame(c, 'Circle', { dir: 'H', radius: 22, fill: 'fill-quiet' }); ci.primaryAxisSizingMode = 'FIXED'; ci.counterAxisSizingMode = 'FIXED'; ci.resize(44, 44); ci.primaryAxisAlignItems = 'CENTER'; ci.counterAxisAlignItems = 'CENTER';
    if (st === 'Seen') D.ico(ci, 'check', 22, 'ink'); else if (st === 'Sent') D.ico(ci, 'pot', 22, 'ink'); else D.icon(ci, 'exclamationmark.triangle', 22, 'ink');
    const tx = D.frame(c, 'Text', { gap: 0 }); tx.layoutGrow = 1; await D.t(tx, 'Steamed Rice, almost out', 'ML/Body Semibold', 'ink', { fill: true, name: 'Title' });
    if (st === 'Sent') await mixed(tx, 'Line', [['Sent', 0], ['1:30 PM', 1]], 'ML/Secondary', 'ML/Mono Body', 'ink-secondary');
    if (st === 'Seen') await mixed(tx, 'Line', [['Ravi saw it ·', 0], ['1:34 PM', 1]], 'ML/Secondary', 'ML/Mono Body', 'ink-secondary');
    if (st === "Couldn't send") { const lr = D.frame(tx, 'Line row', { dir: 'H', gap: 12 }); lr.layoutSizingHorizontal = 'FILL'; lr.counterAxisAlignItems = 'CENTER'; const l = await D.t(lr, "Couldn't send", 'ML/Secondary Medium', 'ink', { name: 'Line' }); l.layoutGrow = 1; const b = await D.btn(lr, 'Retry', 'outline', { h: 44, w: 88 }); b.name = 'Button / Retry'; }
    sr.push(c); }
  const srs = figma.combineAsVariants(sr, pg); srs.name = 'ShortageRow'; styleSet(srs); place(srs); bind(srs, 'Title', 'Steamed Rice, almost out', ['Title']);
  srs.description = 'KITCHEN STAFF 2026-10 (new, flagged). The slim row under the live card after a shortage report (K03): icon, "<Dish>, <level>", and a status line. States: Sent <time>; Seen ("Ravi saw it", only when the server confirms); Couldn\'t send (with Retry; never says Sent). No "Needs attention" chip and no Remind link. Omitted entirely when nothing was reported. Routing and the seen receipt are SIMULATED in Figma.';

  // 4 ReportStatusChip
  const rc = [];
  for (const st of ['Not started', 'Draft', 'Waiting', 'Returned', 'Approved', 'Missing']) { const c = comp('Status=' + st); c.layoutMode = 'HORIZONTAL'; c.primaryAxisSizingMode = 'AUTO'; c.counterAxisSizingMode = 'AUTO'; c.itemSpacing = 6; c.counterAxisAlignItems = 'CENTER'; c.cornerRadius = 999; c.paddingLeft = c.paddingRight = 16; c.paddingTop = c.paddingBottom = 7;
    let fg = 'ink';
    if (st === 'Not started' || st === 'Draft' || st === 'Missing') stroke(c, 'ink', 1.5, true);
    else if (st === 'Waiting') stroke(c, 'ink', 1.5);
    else if (st === 'Returned') { c.fills = [D.paint('hero-bg')]; fg = 'on-hero'; }
    else { c.fills = [D.paint('lime')]; stroke(c, 'ink', 1.5); fg = 'on-lime'; D.ico(c, 'check', 16, 'on-lime', 2.2); }
    await D.t(c, st, 'ML/Secondary Medium', fg, { name: 'Label' }); rc.push(c); }
  const rcs = figma.combineAsVariants(rc, pg); rcs.name = 'ReportStatusChip'; styleSet(rcs); place(rcs);
  rcs.description = 'KITCHEN STAFF 2026-10 (new, flagged). Waste report status (K05, K09–K11, K15, K16). Not started, Draft and Missing dashed; Waiting outlined (label "Waiting for Ravi" on Home); Returned black; Approved lime with a check. Label is a text override ("Waiting for Ravi" on Home). Status comes from the review service (SIMULATED). The Kitchen UI never approves.';

  Object.assign(KT, { liveCard: lcs.id, headcount: hcs.id, shortageRow: srs.id, statusChip: rcs.id }); out.push(lcs, hcs, srs, rcs);
}

if (args.part === 2) {
  const chipSet = await figma.getNodeByIdAsync(KT.statusChip);
  // 5 DishRow
  const dr = [];
  for (const [st, dish, val] of [['Entered', 'Steamed Rice', '3 kg'], ['None left', 'Muttar Masala', '0 kg'], ['Not made', 'Tomato Dal', ''], ['Not entered', 'Veg Pulao', 'Enter kg']]) {
    const c = comp('State=' + st); H(c, 12); c.minHeight = 56; c.paddingTop = c.paddingBottom = 6; topLine(c);
    const d = await D.t(c, dish, st === 'Not made' ? 'ML/Body' : 'ML/Body Semibold', st === 'Not made' ? 'ink-secondary' : 'ink', { name: 'Dish' }); d.layoutGrow = 1; d.textAutoResize = 'HEIGHT';
    if (st === 'Entered') await D.t(c, val, 'ML/Code', 'ink', { name: 'Value' });
    if (st === 'None left') { const z = D.frame(c, 'None left', { dir: 'H', gap: 6 }); z.counterAxisAlignItems = 'CENTER'; const ci = D.frame(z, 'Check', { dir: 'H', radius: 12, fill: 'lime' }); ci.primaryAxisSizingMode = 'FIXED'; ci.counterAxisSizingMode = 'FIXED'; ci.resize(24, 24); ci.primaryAxisAlignItems = 'CENTER'; ci.counterAxisAlignItems = 'CENTER'; stroke(ci, 'ink', 1.5); D.ico(ci, 'check', 16, 'on-lime', 2.2);
      await D.t(z, 'None left', 'ML/Secondary', 'ink', { name: 'None left label' }); const sp = D.frame(c, 'Gap', {}); sp.resize(4, 4); await D.t(c, val, 'ML/Code', 'ink', { name: 'Value' }); }
    if (st === 'Not made') await D.t(c, 'Not made', 'ML/Secondary', 'ink-secondary', { name: 'Value' });
    if (st === 'Not entered') { const p = D.frame(c, 'Enter pill', { dir: 'H', radius: 999 }); p.counterAxisSizingMode = 'FIXED'; p.resize(120, 44); p.primaryAxisSizingMode = 'AUTO'; p.paddingLeft = p.paddingRight = 20; p.primaryAxisAlignItems = 'CENTER'; p.counterAxisAlignItems = 'CENTER'; stroke(p, 'ink', 1.5, true); await D.t(p, val, 'ML/Secondary Medium', 'ink', { name: 'Value' }); }
    dr.push(c); }
  const drs = figma.combineAsVariants(dr, pg); drs.name = 'DishRow'; styleSet(drs); place(drs);
  drs.description = 'KITCHEN STAFF 2026-10 (new, flagged). One "Food left over" row per dish of the day\'s menu, the value in the dish\'s own unit (K06). States: Entered ("3 kg"); None left (lime check, "None left", "0 kg": a confirmed zero); Not made (grey, not applicable); Not entered (dashed "Enter kg" / "Enter pieces"). Missing data never becomes zero: a Not entered row blocks Review and send. Dish and Value are text overrides (by layer name). Rows are 56 pt.';

  // 6 KeyPad + Size=Decimal (additive variant on the Door Scanner KeyPad)
  const kpSet = await figma.getNodeByIdAsync(D.DS.keypad); let dec = kpSet.children.find(c => c.name === 'Size=Decimal');
  if (!dec) { const cmp = kpSet.children.find(c => c.name === 'Size=Compact'); dec = cmp.clone(); kpSet.appendChild(dec); dec.name = 'Size=Decimal';
    const blank = dec.findOne(n => n.name === 'Key · Blank'); const k1 = dec.findOne(n => n.name === 'Key · 1'); blank.name = 'Key · Decimal'; blank.fills = k1.fills; blank.cornerRadius = k1.cornerRadius; blank.primaryAxisAlignItems = 'CENTER'; blank.counterAxisAlignItems = 'CENTER';
    if (blank.layoutMode === 'NONE') { blank.layoutMode = 'HORIZONTAL'; blank.primaryAxisSizingMode = 'FIXED'; blank.counterAxisSizingMode = 'FIXED'; blank.primaryAxisAlignItems = 'CENTER'; blank.counterAxisAlignItems = 'CENTER'; }
    const dg = k1.findOne(n => n.type === 'TEXT').clone(); blank.appendChild(dg); await D.setText(dg, '.'); dg.name = 'Digit';
    if (!kpSet.layoutMode || kpSet.layoutMode === 'NONE') { let mx = 0; for (const v of kpSet.children) if (v !== dec) mx = Math.max(mx, v.x + v.width); dec.x = mx + 40; dec.y = cmp.y; kpSet.resizeWithoutConstraints(Math.max(kpSet.width, dec.x + dec.width + 30), kpSet.height); } }
  kpSet.description = (kpSet.description || '') + (kpSet.description.includes('Size=Decimal') ? '' : ' KITCHEN 2026-10: Size=Decimal (Compact with a "." key in place of the blank key) for kg and L quantities.');

  // 7 QuantitySheet
  const qs = [];
  const QV = [['kg', 'Left over, in kg', '2.5', 'kg', '', 'Up to 99.9 kg'], ['Pieces', 'Left over, in pieces', '6', 'pieces', '', 'Up to 999 pieces, whole numbers'], ['Empty', 'Left over, in kg', '', 'kg', '', 'Up to 99.9 kg'],
    ['Over limit', 'Left over, in kg', '120', 'kg', 'Enter a number up to 99.9.', ''], ['Not a number', 'Left over, in kg', '2.5.', 'kg', 'Enter a number, like 2.5.', ''], ['Negative', 'Left over, in kg', '-1', 'kg', 'Can\'t be less than 0. Tap None left if nothing is left.', '']];
  for (const [st, sub, val, unit, err, help] of QV) { const c = comp('State=' + st); V(c, 12);
    await D.t(c, sub, 'ML/Secondary', 'ink-secondary', { fill: true, name: 'Sub' });
    const fd = D.frame(c, 'Field', { dir: 'H', gap: 8, radius: 24, fill: 'fill-quiet' }); fd.layoutSizingHorizontal = 'FILL'; fd.counterAxisSizingMode = 'FIXED'; fd.resize(353, 88); fd.paddingLeft = fd.paddingRight = 20; fd.counterAxisAlignItems = 'CENTER';
    if (err) stroke(fd, 'urgent', 2);
    if (val) { const v = await D.t(fd, val, 'ML/Hero Metric', 'ink', { name: 'Value' }); v.layoutGrow = 1; } else { const cw = D.frame(fd, 'Caret wrap', { dir: 'H' }); cw.layoutGrow = 1; const car = figma.createRectangle(); car.name = 'Caret'; car.resize(2, 44); car.fills = [D.paint('ink')]; cw.appendChild(car); }
    await D.t(fd, unit, 'ML/Hero Unit', 'ink-secondary', { name: 'Unit' });
    if (err) { const e = D.frame(c, 'Error', { dir: 'H', gap: 8 }); e.layoutSizingHorizontal = 'FILL'; e.counterAxisAlignItems = 'MIN'; D.icon(e, 'exclamationmark.triangle', 18, 'urgent'); await D.t(e, err, 'ML/Secondary Medium', 'ink', { fill: true, name: 'Error text' }); }
    else await D.t(c, help, 'ML/Secondary', 'ink-secondary', { fill: true, name: 'Limit' });
    const br = D.frame(c, 'Quick answers', { dir: 'H', gap: 12 }); br.layoutSizingHorizontal = 'FILL'; for (const l of ['None left', 'Not made']) { const b = await D.btn(br, l, 'outline', { h: 52 }); b.name = 'Button / ' + l; b.layoutSizingHorizontal = 'FILL'; }
    const kp = (kpSet.children.find(v => v.name === (st === 'Pieces' ? 'Size=Compact' : 'Size=Decimal'))).createInstance(); c.appendChild(kp); kp.layoutSizingHorizontal = 'FILL'; kp.name = 'KeyPad';
    const sv = await D.btn(c, 'Save', 'black', { h: 56 }); sv.name = 'Button / Save';
    qs.push(c); }
  const qss = figma.combineAsVariants(qs, pg); qss.name = 'QuantitySheet'; styleSet(qss); place(qss);
  qss.description = 'KITCHEN STAFF 2026-10 (new, flagged). Content of the "Enter a quantity" sheet (K07); the sheet title is the dish name. Large value with the unit, the limit ("Up to 99.9 kg", pieces up to 999 whole numbers), None left (a confirmed 0), Not made, the KeyPad (Decimal for kg and L; Compact for pieces, with the standard backspace), Save. States: kg, Pieces, Empty, and the validation errors under the field: Over limit, Not a number, Negative. Limits are draft values (OWNER).';

  // 8 HistoryRow
  const hr = [];
  for (const [st, title, n] of [['Not started', 'Wed 14 · Lunch', '774'], ['Approved', 'Wed 14 · Breakfast', '402'], ['Returned', 'Tue 13 · Dinner', '598'], ['Waiting', 'Tue 13 · Lunch', '806'], ['Missing', 'Mon 12 · Dinner', '']]) {
    const c = comp('Status=' + st); H(c, 12); c.minHeight = 56; c.paddingTop = 6; c.paddingBottom = 5; topLine(c);
    const tx = D.frame(c, 'Text', { gap: 0 }); tx.layoutGrow = 1; await D.t(tx, title, 'ML/Body Semibold', 'ink', { fill: true, name: 'Title' });
    if (n) await mixed(tx, 'Line', [[n, 1], ['entered', 0]], 'ML/Secondary', 'ML/Mono Body', 'ink-secondary'); else await D.t(tx, 'No count recorded', 'ML/Secondary', 'ink-secondary', { fill: true, name: 'Line' });
    const ci = chipSet.children.find(v => v.name === 'Status=' + st).createInstance(); c.appendChild(ci); ci.name = 'ReportStatusChip';
    hr.push(c); }
  const hrs = figma.combineAsVariants(hr, pg); hrs.name = 'HistoryRow'; styleSet(hrs); place(hrs);
  for (const v of hrs.children) { const t = v.findOne(n => n.type === 'TEXT' && n.name === 'Time'); if (t) t.name = 'Count'; }
  hrs.description = 'KITCHEN STAFF 2026-10 (new, flagged). A Meal history row (K11), own mess only: meal and date, "N entered" (the number in mono), and a ReportStatusChip (Not started, Approved, Returned, Waiting, Missing). A meal with no count shows "No count recorded", never 0. History is SIMULATED in Figma.';

  // 9 KitchenAlertRow (from AlertRow)
  const arSet = await figma.getNodeByIdAsync(D.DS.alertRow); const src = k => arSet.children.find(v => v.name === 'Kind=' + k);
  const ka = [];
  for (const [kind, from, title, time, line] of [['Meal ended', 'Done', 'Meal ended', '2:00 PM', 'Record waste for Lunch.'], ['Food short', 'Food', 'Food short', '12:53 PM', 'Chicken Briyani · pass desk'], ['Shortage seen', 'Done', 'Shortage seen', '1:34 PM', 'Ravi saw: Steamed Rice.'], ['Report returned', 'Reminder', 'Report returned', '9:12 AM', 'Tue 13 Dinner · open it']]) {
    for (const rd of ['Unread', 'Read']) { const v = src(from).clone(); pg.appendChild(v); v.name = 'Kind=' + kind + ', State=' + rd;
      const ti = v.findOne(n => n.name === 'Title'), tm = v.findOne(n => n.name === 'Time'), li = v.findOne(n => n.name === 'Line'); for (const t of [ti, tm, li]) t.componentPropertyReferences = {};
      await D.setText(ti, title); await D.setText(tm, time); await D.setText(li, line);
      if (kind === 'Shortage seen') { const ci = v.findOne(n => n.name === 'Circle'); ci.fills = []; stroke(ci, 'ink', 1.5); for (const p of ci.findAll(n => n.type === 'VECTOR')) { if (p.strokes.length) p.strokes = [D.paint('ink')]; if (p.fills.length) p.fills = [D.paint('ink')]; } }
      const top = v.findOne(n => n.name === 'Top'); const tr = D.frame(top, 'Title row', { dir: 'H', gap: 8 }); top.insertChild(0, tr); tr.counterAxisAlignItems = 'CENTER'; tr.layoutGrow = 1;
      if (rd === 'Unread') D.dot(tr, 'lime', 8); tr.appendChild(ti); ti.layoutGrow = 1;
      const s = (await figma.getLocalTextStylesAsync()).find(x => x.name === (rd === 'Unread' ? 'ML/Body Semibold' : 'ML/Body')); await ti.setTextStyleIdAsync(s.id);
      ka.push(v); } }
  const kas = figma.combineAsVariants(ka, pg); kas.name = 'KitchenAlertRow'; styleSet(kas); place(kas);
  kas.description = 'KITCHEN STAFF 2026-10 (adapted from AlertRow, flagged). Kitchen alerts (K12): Meal ended (Record waste), Food short (from the pass desk), Shortage seen, Report returned. Unread = lime dot and semibold title; Read = regular. Tapping opens that meal or report. Title, Time and Line are text overrides. The alerts feed is SIMULATED in Figma.';

  Object.assign(KT, { dishRow: drs.id, quantity: qss.id, historyRow: hrs.id, alertRow: kas.id, keypad: kpSet.id }); out.push(drs, qss, hrs, kas);
}
figma.root.setSharedPluginData('mealloop', 'kt_ids', JSON.stringify(KT));
return { KT, sizes: out.map(s => s.name + ' ' + Math.round(s.width) + 'x' + Math.round(s.height) + ' @' + s.y + ' :: ' + s.children.map(v => v.name + ' ' + Math.round(v.height)).join(', ')) };
