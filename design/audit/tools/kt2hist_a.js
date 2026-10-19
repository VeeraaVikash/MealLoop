// KITCHEN pack v2 W6 part A (page 09, section "Kitchen · Reports and history"). Body of async function(figma, args); loads ktw as D.
// Builds Meal history (K11, during Lunch, today's meal absent) and Meal history — After Lunch, and the past meal pages:
// Not recorded (K09, Tue 13 Dinner), Recorded with the edit window open (K10, Wed 14 Breakfast), Recorded with editing closed (K18, Tue 13 Lunch), today's Lunch recorded.
// D.pm(sec, name, x, o): o = { title, time, count, status, stime, line, after, entries: [[dish, 'v:<value>' | 'z:<unit>']], plate, edit, record }.
const D = await new (Object.getPrototypeOf(async function(){}).constructor)('figma','args',figma.root.getSharedPluginData('mealloop','ktw'))(figma,{});
const sec = await figma.getNodeByIdAsync('2581:144'); if (sec.width < 11200) sec.resizeWithoutConstraints(11200, sec.height);
const X0 = 6249, DX = 473; const out = [];
const row = (c, name, py) => { const r = D.frame(c, name, { dir: 'H', gap: 12 }); r.layoutSizingHorizontal = 'FILL'; r.counterAxisAlignItems = 'CENTER'; r.paddingTop = r.paddingBottom = py; r.minHeight = 44; return r; };
const grow = t => { t.layoutGrow = 1; return t; };
const space = (c, h) => { const s = D.frame(c, 'Spacer', {}); s.resize(10, h); return s; };
D.pm = async (name, x, o) => { const r = await D.kpage(sec, name, x, { title: o.title, sub: 'Main Mess', time: o.time, moment: o.time + ' PM', gap: 0 }); const f = r.f, c = r.c; const res = { f };
  const fe = row(c, 'Row / Final entries', 8); grow(await D.t(fe, 'Final entries', 'ML/Secondary', 'ink-secondary', { name: 'Label' })); await D.t(fe, o.count, 'ML/Code', 'ink', { name: 'Value' }); D.sep(c);
  const wr = row(c, 'Row / Waste report', 10); grow(await D.t(wr, 'Waste report', 'ML/Card Heading', 'ink', { name: 'Title' }));
  const st = await D.kinst(wr, 'statusText', 'Status=' + o.status); st.name = 'StatusText';
  if (o.stime) { const pk = Object.keys(st.componentProperties).find(k => k.startsWith('Show time')); st.setProperties({ [pk]: true }); await D.setText(st.findOne(n => n.name === 'Label'), 'Recorded ·'); await D.setText(st.findOne(n => n.name === 'Time'), o.stime); }
  if (o.record) { D.sep(c); space(c, 20); await D.t(c, o.line, 'ML/Body', 'ink-secondary', { fill: true, name: 'Line' }); space(c, 20); res.btn = await D.btn(c, 'Record waste', 'black', { h: 56 }); res.btn.name = 'Button / Record waste'; return res; }
  if (Array.isArray(o.line)) await D.mix(c, 'Line', o.line, 'ML/Secondary', 'ML/Mono Body', 'ink-secondary'); else await D.t(c, o.line, 'ML/Secondary', 'ink-secondary', { fill: true, name: 'Line' });
  space(c, 12); D.sep(c); space(c, 16);
  await D.t(c, 'Food left over', 'ML/Secondary', 'ink-secondary', { fill: true, name: 'Section · Food left over' }); space(c, 4);
  for (const [d, v] of o.entries) { const e = row(c, 'Line / ' + d, 0); grow(await D.t(e, d, 'ML/Body', 'ink', { name: 'Label' }));
    if (v.startsWith('z:')) await D.mix(e, 'Value', [['0 ' + v.slice(2), 1], ['· none left', 0]], 'ML/Secondary', 'ML/Mono Body', 'ink'); else await D.t(e, v.slice(2), 'ML/Code', 'ink', { name: 'Value' }); }
  space(c, 8); D.sep(c); const pr = row(c, 'Line / Plate waste, whole meal', 6); grow(await D.t(pr, 'Plate waste, whole meal', 'ML/Body Semibold', 'ink', { name: 'Label' })); await D.t(pr, o.plate, 'ML/Code', 'ink', { name: 'Value' }); D.sep(c);
  if (o.edit) { space(c, 12); const a = D.frame(c, 'Link / Edit report', { dir: 'H' }); a.counterAxisSizingMode = 'FIXED'; a.resize(120, 44); a.primaryAxisSizingMode = 'AUTO'; a.counterAxisAlignItems = 'CENTER'; const t = await D.t(a, 'Edit report', 'ML/Body', 'ink', { name: 'Label' }); t.textDecoration = 'UNDERLINE'; res.edit = a; }
  return res; };
D.hist = async (name, x, o) => { const r = await D.kpage(sec, name, x, { title: 'Meal history', sub: 'Main Mess', time: o.time, moment: o.time + ' PM', gap: 0 }); const c = r.c; const res = { f: r.f, rows: {} };
  const list = D.frame(c, 'Rows', { gap: 0 }); list.layoutSizingHorizontal = 'FILL';
  for (const [title, n, s] of o.rows) { const i = await D.kinst(list, 'historyRow', 'Status=' + s, { Title: title, Count: n }); i.layoutSizingHorizontal = 'FILL'; i.name = 'HistoryRow / ' + title; res.rows[title] = i; }
  const last = list.children[list.children.length - 1]; last.strokeBottomWeight = 1;
  if (o.foot) { space(c, 24); await D.note(c, o.foot); } return res; };
const base = [['Wed 14 · Breakfast', '402', 'Recorded'], ['Tue 13 · Dinner', '598', 'Not recorded'], ['Tue 13 · Lunch', '806', 'Recorded'], ['Tue 13 · Breakfast', '391', 'Recorded'], ['Mon 12 · Dinner', '577', 'Recorded']];
const h1 = await D.hist('KS-4 · Meal history', X0, { time: '1:40', rows: base, foot: 'Today\'s meal appears here after it ends.' });
const h2 = await D.hist('KS-4 · Meal history — After Lunch', X0 + DX, { time: '2:45', rows: [['Wed 14 · Lunch', '774', 'Recorded']].concat(base) });
const p1 = await D.pm('KS-4 · Past meal — Not recorded', X0 + 2 * DX, { title: 'Tue 13 · Dinner', time: '1:40', count: '598', status: 'Not recorded', record: true, line: 'You can still add it.' });
const p2 = await D.pm('KS-4 · Past meal — Recorded', X0 + 3 * DX, { title: 'Wed 14 · Breakfast', time: '1:40', count: '402', status: 'Recorded', stime: '10:05 AM', line: [['You can edit until', 0], ['4:05 PM.', 1]], entries: [['Millet Idli', 'v:20 pieces'], ['Sambar', 'v:2 L'], ['Pongal', 'v:1.5 kg'], ['Chutney', 'z:L']], plate: '9 kg', edit: true });
const p3 = await D.pm('KS-4 · Past meal — Editing closed', X0 + 4 * DX, { title: 'Tue 13 · Lunch', time: '1:40', count: '806', status: 'Recorded', stime: '2:40 PM', line: 'Editing closed after 6 hours.', entries: [['Steamed Rice', 'v:4 kg'], ['Tomato Rasam', 'v:3 L'], ['Meal Maker Curry', 'z:kg'], ['Millet Chappathi', 'v:12 pieces']], plate: '21 kg' });
const p4 = await D.pm('KS-4 · Today · Lunch — Recorded', X0 + 5 * DX, { title: 'Wed 14 · Lunch', time: '2:45', count: '774', status: 'Recorded', stime: '2:40 PM', line: [['You can edit until', 0], ['8:40 PM.', 1]], entries: [['Bhindi Aloo Bujjiya', 'v:2 kg'], ['Steamed Rice', 'v:3 kg'], ['Chappathi', 'v:6 pieces'], ['Muttar Masala', 'z:kg'], ['Veg Pulao', 'v:2.5 kg'], ['Masala Sambar', 'v:4 L'], ['Tomato Dal', 'n'], ['Garlic Rasam', 'v:3 L']].filter(e => e[1] !== 'n'), plate: '18 kg', edit: true });
// Tomato Dal was not made: listed as "not made" (grey), never as 0
{ const c = p4.f.findOne(n => n.name === 'Content'); const after = c.findOne(n => n.name === 'Line / Masala Sambar'); const e = row(c, 'Line / Tomato Dal', 0); c.insertChild(c.children.indexOf(after) + 1, e); grow(await D.t(e, 'Tomato Dal', 'ML/Body', 'ink-secondary', { name: 'Label' })); await D.t(e, 'not made', 'ML/Secondary', 'ink-secondary', { name: 'Value' }); }
for (const r of [h1, h2, p1, p2, p3, p4]) { const b = r.f.findOne(n => n.name === 'Back'); if (b) await D.goBack(b); }
Object.assign(D.KF, { histK11: h1.f.id, histAfter: h2.f.id, pmNot: p1.f.id, pmRec: p2.f.id, pmClosed: p3.f.id, pmToday: p4.f.id }); D.saveK();
for (const [r, k] of [[h1, 'Tue 13 · Dinner'], [h2, 'Tue 13 · Dinner']]) await D.go(r.rows[k], p1.f.id);
for (const r of [h1, h2]) { await D.go(r.rows['Wed 14 · Breakfast'], p2.f.id); await D.go(r.rows['Tue 13 · Lunch'], p3.f.id); }
await D.go(h2.rows['Wed 14 · Lunch'], p4.f.id);
await D.hot(h1.f, 'Feed: history loading (simulated)', 0, 0, 131, 54, D.KF.histLoading); await D.hot(h1.f, 'Feed: no past meals (simulated)', 131, 0, 131, 54, D.KF.histEmpty); await D.hot(h1.f, 'Feed: history error (simulated)', 262, 0, 131, 54, D.KF.histError);
await D.sim(h1.f, 'history from the server, own mess only, ended meals only; today\'s Lunch appears after it ends. Tue 13 Breakfast and Mon 12 Dinner have no sample page. Status bar thirds = loading / empty / error.');
await D.sim(h2.f, 'after the Supervisor ends Lunch, Wed 14 Lunch (774 entered, Recorded) joins the list. Tue 13 Breakfast and Mon 12 Dinner have no sample page.');
await D.sim(p1.f, 'Tue 13 Dinner has no saved report. How long a missed meal can still be recorded is an OWNER decision.');
await D.sim(p2.f, 'saved 10:05 AM; the server keeps it editable for 6 hours, until 4:05 PM. Breakfast dishes from the Wed board.');
await D.sim(p3.f, 'saved Tue 2:40 PM; editing closed at 8:40 PM Tue (6 hours). Read-only. Dishes from the Tue lunch board.');
await D.sim(p4.f, 'the report saved at 2:40 PM; editable until 8:40 PM. Nothing syncs in Figma.');
for (const r of [h1, h2, p1, p2, p3, p4]) D.fixChrome(r.f);
out.push(h1.f.id, h2.f.id, p1.f.id, p2.f.id, p3.f.id, p4.f.id); return out;
