// KITCHEN Record waste builders (stored as mealloop/ktw). Body of async function(figma, args) -> D (extends ktb).
// D.DISH the Wed lunch dishes [name, unit] in menu order. D.vals(over) sample values: 'v:<value>' entered, 'z' none left, 'n' not made, null not entered.
// D.waste(sec, name, x, o) Record waste page: o = { vals, done, plate: '18 kg' | null, extra: [[name, unit]], time, sos }. Returns { f, c, rows: {dish: instance}, add, plate, bar }.
// D.qsheet(f, dish, state, o) quantity sheet over a waste page (QuantitySheet instance; o.sub, o.value). D.checkSheet(f, vals, o) Check and send sheet (o.blocked = N missing).
// D.dialog(f, title, body, primary, secondary) centred dialog card over a scrim.
const D = await new (Object.getPrototypeOf(async function(){}).constructor)('figma','args',figma.root.getSharedPluginData('mealloop','ktb'))(figma,{});
D.DISH = [['Bhindi Aloo Bujjiya', 'kg'], ['Steamed Rice', 'kg'], ['Chappathi', 'pieces'], ['Muttar Masala', 'kg'], ['Veg Pulao', 'kg'], ['Masala Sambar', 'L'], ['Tomato Dal', 'L'], ['Garlic Rasam', 'L']];
D.vals = over => Object.assign({ 'Bhindi Aloo Bujjiya': 'v:2 kg', 'Steamed Rice': 'v:3 kg', 'Chappathi': null, 'Muttar Masala': 'z', 'Veg Pulao': null, 'Masala Sambar': 'v:4 L', 'Tomato Dal': 'n', 'Garlic Rasam': 'v:3 L' }, over || {});
D.waste = async (sec, name, x, o) => { o = o || {}; const vals = o.vals || D.vals();
  const r = await D.kpage(sec, name, x, { title: 'Record waste', sub: 'Lunch · Main Mess · Wed 14 Aug', time: o.time || '2:05', gap: 12 }); const c = r.c; const out = { f: r.f, c, rows: {} };
  const ch = await D.chip(c, o.done, 'outline', { px: 16, py: 8 }); ch.name = 'Chip · progress';
  if (o.sos) { const tab = await D.ds(r.f, 'sostab', 'State=' + o.sos); tab.name = 'SOSEdgeTab'; tab.x = 335; tab.y = 196; out.sos = tab; }
  await D.t(c, 'Food left over · each dish in its own unit', 'ML/Secondary', 'ink-secondary', { fill: true, name: 'Section · Food left over' });
  const list = D.frame(c, 'Dish rows', { gap: 0 }); list.layoutSizingHorizontal = 'FILL'; let last;
  for (const [d, u] of D.DISH.concat(o.extra || [])) { const v = vals[d] === undefined ? null : vals[d];
    const st = v === null ? 'Not entered' : v === 'z' ? 'None left' : v === 'n' ? 'Not made' : 'Entered';
    const val = st === 'Not entered' ? 'Enter ' + u : st === 'None left' ? '0 ' + u : st === 'Not made' ? 'Not made' : v.slice(2);
    const i = await D.kinst(list, 'dishRow', 'State=' + st, { Dish: d, Value: val }); i.layoutSizingHorizontal = 'FILL'; i.name = 'DishRow / ' + d; out.rows[d] = i; last = i; }
  last.strokeBottomWeight = 1;
  const add = D.frame(c, 'Link / Add a dish', { dir: 'H' }); add.counterAxisSizingMode = 'FIXED'; add.resize(120, 44); add.primaryAxisSizingMode = 'AUTO'; add.counterAxisAlignItems = 'CENTER'; const at = await D.t(add, 'Add a dish', 'ML/Body', 'ink', { name: 'Label' }); at.textDecoration = 'UNDERLINE'; out.add = add;
  await D.t(c, 'Plate waste · the whole meal, one total', 'ML/Secondary', 'ink-secondary', { fill: true, name: 'Section · Plate waste' });
  const pc = D.frame(c, 'Plate waste card', { dir: 'H', gap: 12, radius: 20, fill: 'surface' }); pc.layoutSizingHorizontal = 'FILL'; pc.counterAxisSizingMode = 'AUTO'; pc.minHeight = 56; pc.paddingLeft = pc.paddingRight = 16; pc.paddingTop = pc.paddingBottom = 6; pc.counterAxisAlignItems = 'CENTER';
  const pl = await D.t(pc, 'Plate waste', 'ML/Body Semibold', 'ink', { name: 'Label' }); pl.layoutGrow = 1;
  if (o.plate === null) { const p = D.frame(pc, 'Enter pill', { dir: 'H', radius: 999 }); p.counterAxisSizingMode = 'FIXED'; p.resize(120, 44); p.primaryAxisSizingMode = 'AUTO'; p.paddingLeft = p.paddingRight = 20; p.primaryAxisAlignItems = 'CENTER'; p.counterAxisAlignItems = 'CENTER'; p.strokes = [D.paint('ink')]; p.strokeWeight = 1.5; p.dashPattern = [5, 4]; p.strokeAlign = 'INSIDE'; await D.t(p, 'Enter kg', 'ML/Secondary Medium', 'ink', { name: 'Value' }); }
  else await D.t(pc, o.plate || '18 kg', 'ML/Code', 'ink', { name: 'Value' });
  out.plate = pc; out.bar = await D.bar(r.f, 'Save draft', 'Review and send');
  if (out.sos) r.f.appendChild(out.sos); D.fixChrome(r.f); return out; };
D.qsheet = async (f, dish, state, o) => { o = o || {}; const s = await D.sheet(f, dish, 'Large'); const q = await D.kinst(s.c, 'quantity', 'State=' + state); q.name = 'QuantitySheet'; q.layoutSizingHorizontal = 'FILL';
  if (o.sub) await D.setText(q.findOne(n => n.name === 'Sub'), o.sub); if (o.value) await D.setText(q.findOne(n => n.name === 'Value'), o.value);
  D.fitSheet(f); return { q, save: q.findOne(n => n.name === 'Button / Save'), none: q.findOne(n => n.name === 'Button / None left'), notMade: q.findOne(n => n.name === 'Button / Not made'), field: q.findOne(n => n.name === 'Field'), close: D.closeOf(f) }; };
D.checkSheet = async (f, vals, o) => { o = o || {}; const s = await D.sheet(f, 'Check and send', 'Large'); const c = s.c; c.itemSpacing = 0;
  await D.t(c, 'Lunch · Main Mess', 'ML/Secondary', 'ink-secondary', { fill: true, name: 'Sub' }); const sp = D.frame(c, 'Spacer', {}); sp.resize(10, 12);
  const line = async (label, v, bold, grey) => { const r = D.frame(c, 'Line / ' + label, { dir: 'H', gap: 12 }); r.layoutSizingHorizontal = 'FILL'; r.counterAxisAlignItems = 'CENTER'; r.paddingTop = r.paddingBottom = 6;
    const l = await D.t(r, label, bold ? 'ML/Body Semibold' : 'ML/Body', grey ? 'ink-secondary' : 'ink', { name: 'Label' }); l.layoutGrow = 1; return r; };
  const div = () => { const d = D.sep(c); return d; };
  div(); const sp2 = D.frame(c, 'Spacer', {}); sp2.resize(10, 6);
  for (const [d, u] of D.DISH) { const v = vals[d] === undefined ? null : vals[d]; const r = await line(d, v, false, v === 'n');
    if (v === null) { const t = await D.t(r, 'Not entered', 'ML/Secondary Medium', 'ink', { name: 'Value' }); }
    else if (v === 'n') await D.t(r, 'not made', 'ML/Secondary', 'ink-secondary', { name: 'Value' });
    else if (v === 'z') await D.mix(r, 'Value', [['0 ' + u, 1], ['· none left', 0]], 'ML/Secondary', 'ML/Mono Body', 'ink');
    else await D.t(r, v.slice(2), 'ML/Code', 'ink', { name: 'Value' }); }
  const sp3 = D.frame(c, 'Spacer', {}); sp3.resize(10, 6); div(); const sp4 = D.frame(c, 'Spacer', {}); sp4.resize(10, 6);
  const pr = await line('Plate waste, whole meal', null, true); await D.t(pr, '18 kg', 'ML/Code', 'ink', { name: 'Value' });
  const sp5 = D.frame(c, 'Spacer', {}); sp5.resize(10, 16);
  const out = {};
  if (o.blocked) { await D.note(c, 'Every dish needs an amount, None left or Not made.'); const s6 = D.frame(c, 'Spacer', {}); s6.resize(10, 16);
    const b = await D.btn(c, 'Enter ' + o.blocked + ' more to send', 'dashed', { h: 56 }); b.name = 'Button / Enter ' + o.blocked + ' more (blocked)'; const s7 = D.frame(c, 'Spacer', {}); s7.resize(10, 12); out.back = await D.btn(c, 'Back to edit', 'black', { h: 56 }); out.back.name = 'Button / Back to edit'; }
  else { await D.note(c, 'Ravi reviews this. You can edit it until he does.'); const s6 = D.frame(c, 'Spacer', {}); s6.resize(10, 16);
    out.send = await D.btn(c, 'Send to Ravi for review', 'black', { h: 56 }); out.send.name = 'Button / Send to Ravi for review'; const s7 = D.frame(c, 'Spacer', {}); s7.resize(10, 12); out.back = await D.btn(c, 'Back to edit', 'outline', { h: 56 }); out.back.name = 'Button / Back to edit'; }
  D.fitSheet(f); out.close = D.closeOf(f); return out; };
D.dialog = async (f, title, body, primary, secondary) => { const sc = figma.createRectangle(); sc.name = 'Scrim'; sc.resize(393, 852); sc.fills = [D.paint('scrim')]; f.appendChild(sc);
  const card = D.frame(f, 'Dialog', { gap: 12, radius: 28, fill: 'surface' }); card.primaryAxisSizingMode = 'AUTO'; card.counterAxisSizingMode = 'FIXED'; card.resize(337, 100); card.paddingLeft = card.paddingRight = card.paddingTop = card.paddingBottom = 20;
  await D.t(card, title, 'ML/Card Heading', 'ink', { fill: true, name: 'Title' }); await D.t(card, body, 'ML/Body', 'ink-secondary', { fill: true, name: 'Body' }); const sp = D.frame(card, 'Spacer', {}); sp.resize(10, 4);
  const a = await D.btn(card, primary, 'black', { h: 56 }); a.name = 'Button / ' + primary; const b = await D.btn(card, secondary, 'outline', { h: 56 }); b.name = 'Button / ' + secondary;
  card.x = 28; card.y = Math.round((852 - card.height) / 2); return { card, a, b }; };
return D;
