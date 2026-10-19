// KITCHEN pack v2 W6 part B (page 09, section "Kitchen · Reports and history"). Body of async function(figma, args); loads ktw as D.
// Record waste — Tue 13 Dinner (not started, from the Not recorded past meal), Edit report — Wed 14 Breakfast (entries kept) with its Check and save,
// Edit report — Wed 14 Lunch (entries kept), Meal history — After Lunch, not recorded. Wires Record waste and Edit report.
const D = await new (Object.getPrototypeOf(async function(){}).constructor)('figma','args',figma.root.getSharedPluginData('mealloop','ktw'))(figma,{});
const sec = await figma.getNodeByIdAsync('2581:144'); const X0 = 6249, DX = 473; const KF = D.KF;
const cancel = async w => { const l = w.bar.left; l.name = 'Button / Cancel'; const t = l.findOne(n => n.type === 'TEXT'); await D.setText(t, 'Cancel'); t.name = 'Cancel'; return l; };
const tue = [['Methi Chappathi', 'pieces'], ['Chilly Gobi Dry', 'kg'], ['Millet Dosa', 'pieces'], ['Black Chenna', 'kg'], ['Mutton Gravy', 'L'], ['Steamed Rice', 'kg'], ['Dal Fry', 'L'], ['Pepper Rasam', 'L']];
const w1 = await D.waste(sec, 'KS-3 · Record waste — Tue 13 Dinner', X0 + 6 * DX, { vals: {}, dish: tue, done: 'Done 0 of 8', plate: null, sub: 'Dinner · Main Mess · Tue 13 Aug', time: '1:41', moment: '1:41 PM' });
const bf = [['Millet Idli', 'pieces'], ['Sambar', 'L'], ['Pongal', 'kg'], ['Chutney', 'L']]; const bv = { 'Millet Idli': 'v:20 pieces', 'Sambar': 'v:2 L', 'Pongal': 'v:1.5 kg', 'Chutney': 'z' };
const w2 = await D.waste(sec, 'KS-3 · Edit report — Wed 14 Breakfast', X0 + 7 * DX, { vals: bv, dish: bf, done: 'Done 4 of 4', plate: '9 kg', sub: 'Breakfast · Main Mess · Wed 14 Aug', time: '1:41', moment: '1:41 PM' }); await cancel(w2);
const w3 = await D.waste(sec, 'KS-3 · Check and save — Wed 14 Breakfast', X0 + 8 * DX, { vals: bv, dish: bf, done: 'Done 4 of 4', plate: '9 kg', sub: 'Breakfast · Main Mess · Wed 14 Aug', time: '1:42', moment: '1:42 PM' }); await cancel(w3);
const keep = D.DISH; D.DISH = bf; const ck = await D.checkSheet(w3.f, bv); D.DISH = keep;
await D.setText(w3.f.findOne(n => n.type === 'TEXT' && n.name === 'Sub' && n.characters === 'Lunch · Main Mess'), 'Breakfast · Main Mess');
await D.setText(w3.f.findOne(n => n.name === 'Line / Plate waste, whole meal').findOne(n => n.name === 'Value'), '9 kg');
const w4 = await D.waste(sec, 'KS-3 · Edit report — Wed 14 Lunch', X0 + 9 * DX, { vals: D.vals({ 'Chappathi': 'v:6 pieces', 'Veg Pulao': 'v:2.5 kg' }), done: 'Done 8 of 8', plate: '18 kg', time: '2:46', moment: '2:46 PM' }); await cancel(w4);
// Meal history after Lunch while today's report is not recorded yet (Not started or Draft)
const hNR = await figma.getNodeByIdAsync(KF.histAfter); const h3 = hNR.clone(); sec.appendChild(h3); h3.x = X0 + 10 * DX; h3.y = hNR.y; h3.name = 'KS-4 · Meal history — After Lunch, not recorded';
{ const r = h3.findOne(n => n.name === 'HistoryRow / Wed 14 · Lunch'); const nr = (await figma.getNodeByIdAsync(D.K.historyRow)).children.find(v => v.name === 'Status=Not recorded'); r.swapComponent(nr); await D.setText(r.findOne(n => n.name === 'Title'), 'Wed 14 · Lunch'); await D.setText(r.findOne(n => n.name === 'Count'), '774'); await D.go(r, KF.aNS);
  const sb = h3.findOne(n => n.name === 'Status Bar'); const tt = sb.findOne(n => n.type === 'TEXT' && /^\d+:\d\d$/.test(n.characters)); if (tt) await D.setText(tt, '2:05'); }
// labels for the new part A and B frames
for (const f of [await figma.getNodeByIdAsync(KF.histK11), hNR, await figma.getNodeByIdAsync(KF.pmNot), await figma.getNodeByIdAsync(KF.pmRec), await figma.getNodeByIdAsync(KF.pmClosed), await figma.getNodeByIdAsync(KF.pmToday), w1.f, w2.f, w3.f, w4.f, h3]) {
  if (sec.children.some(n => n.name === 'Label / ' + f.name && Math.abs(n.x - f.x) < 2)) continue; const l = await D.t(sec, f.name, 'ML/Footnote', 'ink-secondary', { name: 'Label / ' + f.name }); l.x = f.x; l.y = f.y - 36; }
// wiring
const go = async (f, nm, id) => { const n = f.findOne(x => x.name === nm); if (!n) throw new Error('no ' + nm + ' in ' + f.name); await D.go(n, id); };
const pmNot = await figma.getNodeByIdAsync(KF.pmNot), pmRec = await figma.getNodeByIdAsync(KF.pmRec), pmToday = await figma.getNodeByIdAsync(KF.pmToday);
await go(pmNot, 'Button / Record waste', w1.f.id); await go(pmRec, 'Link / Edit report', w2.f.id); await go(pmToday, 'Link / Edit report', w4.f.id);
for (const w of [w1, w2, w3, w4]) { const b = w.f.findOne(n => n.name === 'Back'); if (b) await D.goBack(b); }
await go(w1.f, 'Button / Save draft', pmNot.id);
await go(w2.f, 'Button / Cancel', pmRec.id); await go(w2.f, 'Button / Review and save', w3.f.id);
await D.go(ck.send, pmRec.id); await D.go(ck.back, w2.f.id); if (ck.close) await D.go(ck.close, w2.f.id);
await go(w4.f, 'Button / Cancel', pmToday.id); await go(w4.f, 'Button / Review and save', KF.cSend);
await D.sim(w1.f, 'Tue 13 Dinner list from the Tue dinner board (cooked dishes). Entering works as in Lunch; this sample shows the start. Save draft keeps it on the server (the past meal Draft view is not drawn).');
await D.sim(w2.f, 'Edit report opens the saved form with every entry kept. Rows open the quantity sheet as in Lunch. Cancel keeps the saved report unchanged.');
await D.sim(w3.f, 'Save report updates the saved report; the edit window still ends at 4:05 PM (6 hours from the first save).');
await D.sim(w4.f, 'Today\'s report, entries kept; Review and save opens the same Check and save as the first save.');
await D.sim(h3, 'the same list after Lunch while today\'s report is Not started or Draft: history shows it as Not recorded and opens Home.');
for (const f of [w1.f, w2.f, w3.f, w4.f, h3]) D.fixChrome(f);
Object.assign(KF, { wTue: w1.f.id, wEditB: w2.f.id, cEditB: w3.f.id, wEditL: w4.f.id, histAfterNR: h3.id }); D.saveK();
return [w1.f.id, w2.f.id, w3.f.id, w4.f.id, h3.id];
