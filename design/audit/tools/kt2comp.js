// KITCHEN pack v2 W1 component changes (page 03). Body of async function(figma, args); loads pdb as D.
// LiveCard: the "Recorded at the door. Not meals served." note is removed (Live, Stale). New flagged sets: ForecastCard (Ready / Loading / Stale / Not ready),
// StatusText (dot + plain text: Recorded filled lime, Not recorded and Not started empty, Draft dashed; Label + optional mono Time), HistoryRow (v2, StatusText on the right).
// KitchenAlertRow: Kind "Report returned" becomes "Waste not recorded". HeadcountCard, ReportStatusChip and HistoryRow (v1) are renamed "(v1, superseded)" and kept.
const D = await new (Object.getPrototypeOf(async function(){}).constructor)('figma','args',figma.root.getSharedPluginData('mealloop','pdb'))(figma,{});
const pg = await figma.getNodeByIdAsync('44:5355'); await figma.setCurrentPageAsync(pg);
const ref = await figma.getNodeByIdAsync(D.DS.problem);
const KT = JSON.parse(figma.root.getSharedPluginData('mealloop','kt_ids'));
const styleSet = s => { s.fills = ref.fills; s.strokes = ref.strokes; s.strokeWeight = ref.strokeWeight; s.dashPattern = ref.dashPattern; s.cornerRadius = ref.cornerRadius; s.layoutMode = 'HORIZONTAL'; s.itemSpacing = 40; s.counterAxisAlignItems = 'MIN'; s.paddingLeft = s.paddingRight = s.paddingTop = s.paddingBottom = 30; s.primaryAxisSizingMode = 'AUTO'; s.counterAxisSizingMode = 'AUTO'; };
const comp = name => { const c = figma.createComponent(); c.name = name; c.fills = []; pg.appendChild(c); return c; };
const stroke = (n, col, w, dash) => { n.strokes = [D.paint(col)]; n.strokeWeight = w; n.strokeAlign = 'INSIDE'; if (dash) n.dashPattern = dash; };
let y = 0; { for (const n of pg.children) if (n.x < 2000) y = Math.max(y, n.y + n.height); y += 60; }
const place = s => { s.x = 0; s.y = y; y += s.height + 60; };
const out = [];
// 1 LiveCard: drop the note on Live and Stale
const lc = await figma.getNodeByIdAsync(KT.liveCard); let removed = 0;
for (const v of lc.children) { if (v.name === 'State=Offline') continue; const n = v.findOne(x => x.type === 'TEXT' && x.name === 'Note'); if (n) { n.remove(); removed++; } }
lc.description = lc.description.replace('"students entered", "Recorded at the door. Not meals served.", and', '"students entered", and') + ' Pack v2: no "recorded at the door" text.';
out.push('LiveCard notes removed ' + removed);
// 2 ForecastCard
const fc = [];
for (const st of ['Ready', 'Loading', 'Stale', 'Not ready']) { const w = comp('State=' + st); w.layoutMode = 'VERTICAL'; w.itemSpacing = 8; w.primaryAxisSizingMode = 'AUTO'; w.counterAxisSizingMode = 'FIXED'; w.resize(353, 100);
  const c = D.frame(w, 'Card', { gap: 4, fill: 'hero-bg', radius: 28 }); c.layoutSizingHorizontal = 'FILL'; c.paddingLeft = c.paddingRight = c.paddingTop = c.paddingBottom = 20;
  await D.t(c, 'FORECASTED ATTENDANCE', 'ML/Tag', 'on-hero-secondary', { name: 'Header', ls: 6 }); const sp = D.frame(c, 'Spacer', {}); sp.resize(10, 4);
  if (st === 'Loading') { const sk = D.frame(c, 'Skeleton', { gap: 10 }); for (const [ww, hh] of [[150, 52], [130, 18]]) { const r = figma.createRectangle(); r.name = 'Skeleton bar'; r.resize(ww, hh); r.cornerRadius = 10; r.fills = [D.paint('action-pressed')]; sk.appendChild(r); } await D.t(c, 'Loading the forecast…', 'ML/Body', 'on-hero-secondary', { fill: true, name: 'Label' }); }
  else if (st === 'Not ready') { await D.t(c, '—', 'ML/Hero Metric', 'on-hero-secondary', { name: 'Count' }); await D.t(c, 'Forecast not ready yet', 'ML/Body', 'on-hero-secondary', { fill: true, name: 'Label' }); }
  else { await D.t(c, '860', 'ML/Hero Metric', 'on-hero', { name: 'Count' }); await D.t(c, 'expected diners', 'ML/Body', 'on-hero-secondary', { fill: true, name: 'Label' }); }
  if (st === 'Stale') { const r = D.frame(w, 'Stale note', { dir: 'H', gap: 4 }); r.counterAxisAlignItems = 'BASELINE'; for (const [tx, m] of [['Updated', 0], ['8:50 AM,', 1], ['may be out of date', 0]]) await D.t(r, tx, m ? 'ML/Mono Footnote' : 'ML/Footnote', 'ink-secondary', { name: m ? 'Time' : 'Words' }); }
  fc.push(w); }
const fcs = figma.combineAsVariants(fc, pg); fcs.name = 'ForecastCard'; styleSet(fcs); place(fcs);
fcs.description = 'KITCHEN STAFF 2026-10 · pack v2 (new, flagged; replaces HeadcountCard). Home before the meal (K01): "FORECASTED ATTENDANCE", the number, "expected diners", nothing else in the card; never a dish quantity. States: Ready; Loading (skeleton, no number); Stale (card kept, small grey "Updated 8:50 AM, may be out of date" under it); Not ready ("—" and "Forecast not ready yet", never 0). The forecast feed is SIMULATED in Figma.';
// 3 StatusText
const stx = [];
for (const st of ['Recorded', 'Not recorded', 'Not started', 'Draft']) { const c = comp('Status=' + st); c.layoutMode = 'HORIZONTAL'; c.itemSpacing = 8; c.counterAxisAlignItems = 'CENTER'; c.primaryAxisSizingMode = 'AUTO'; c.counterAxisSizingMode = 'AUTO'; c.minHeight = 24;
  const d = figma.createEllipse(); d.name = 'Dot'; d.resize(14, 14); c.appendChild(d); d.fills = st === 'Recorded' ? [D.paint('lime')] : []; stroke(d, 'ink', 1.5, st === 'Draft' ? [2, 2] : null);
  const tx = D.frame(c, 'Text', { dir: 'H', gap: 4 }); tx.counterAxisAlignItems = 'BASELINE'; await D.t(tx, st, 'ML/Body', 'ink', { name: 'Label' }); const tm = await D.t(tx, '2:40 PM', 'ML/Code', 'ink', { name: 'Time' }); tm.visible = false;
  stx.push(c); }
const sts = figma.combineAsVariants(stx, pg); sts.name = 'StatusText'; styleSet(sts); place(sts);
{ const k = sts.addComponentProperty('Show time', 'BOOLEAN', false); for (const v of sts.children) v.findOne(n => n.name === 'Time').componentPropertyReferences = { visible: k }; }
sts.description = 'KITCHEN STAFF 2026-10 · pack v2 (new, flagged; replaces the pill-style ReportStatusChip). Plain status: a small dot plus text, never a pill or a button. Recorded = filled lime dot; Not recorded and Not started = empty dot; Draft = dashed dot. "Show time" adds a mono time (Label "Recorded ·", Time "2:40 PM"). Label and Time are text overrides.';
// 4 HistoryRow v2
const oldHr = await figma.getNodeByIdAsync(KT.historyRow); oldHr.name = 'HistoryRow (v1, superseded)'; oldHr.description = '(Superseded in KITCHEN pack v2 by HistoryRow: no approval statuses.) ' + oldHr.description;
const hr = [];
for (const [st, title, n] of [['Recorded', 'Wed 14 · Breakfast', '402'], ['Not recorded', 'Tue 13 · Dinner', '598']]) { const c = comp('Status=' + st); c.layoutMode = 'HORIZONTAL'; c.itemSpacing = 12; c.counterAxisAlignItems = 'CENTER'; c.resize(353, 56); c.primaryAxisSizingMode = 'FIXED'; c.counterAxisSizingMode = 'AUTO'; c.minHeight = 56; c.paddingTop = 6; c.paddingBottom = 5;
  c.strokes = [D.paint('border')]; c.strokeTopWeight = 1; c.strokeBottomWeight = 0; c.strokeLeftWeight = 0; c.strokeRightWeight = 0; c.strokeAlign = 'INSIDE';
  const tx = D.frame(c, 'Text', { gap: 0 }); tx.layoutGrow = 1; await D.t(tx, title, 'ML/Body Semibold', 'ink', { fill: true, name: 'Title' });
  const ln = D.frame(tx, 'Line', { dir: 'H', gap: 4 }); ln.counterAxisAlignItems = 'BASELINE'; await D.t(ln, n, 'ML/Mono Body', 'ink-secondary', { name: 'Count' }); await D.t(ln, 'entered', 'ML/Secondary', 'ink-secondary', { name: 'Words' });
  const si = sts.children.find(v => v.name === 'Status=' + st).createInstance(); c.appendChild(si); si.name = 'StatusText'; hr.push(c); }
const hrs = figma.combineAsVariants(hr, pg); hrs.name = 'HistoryRow'; styleSet(hrs); place(hrs);
hrs.description = 'KITCHEN STAFF 2026-10 · pack v2 (new, flagged). A Meal history row (K11), ended meals only, own mess: meal and date, "N entered" (number in mono), StatusText on the right (Recorded / Not recorded). Title and Count are text overrides. History is SIMULATED in Figma.';
// 5 KitchenAlertRow: Report returned -> Waste not recorded
const ar = await figma.getNodeByIdAsync(KT.alertRow); const sty = (await figma.getLocalTextStylesAsync()).find(s => s.name === 'ML/Footnote');
for (const v of ar.children.filter(v => v.name.startsWith('Kind=Report returned'))) { v.name = v.name.replace('Report returned', 'Waste not recorded');
  await D.setText(v.findOne(n => n.name === 'Title'), 'Waste not recorded'); const tm = v.findOne(n => n.name === 'Time'); await D.setText(tm, 'Tue'); await tm.setTextStyleIdAsync(sty.id); await D.setText(v.findOne(n => n.name === 'Line'), 'Tue 13 Dinner · add it'); }
ar.description = ar.description.replace('Report returned', 'Waste not recorded') + ' Pack v2: "Report returned" became "Waste not recorded" (time as a day word in sans).';
// 6 superseded sets
for (const k of ['headcount', 'statusChip']) { const s = await figma.getNodeByIdAsync(KT[k]); if (!/superseded/.test(s.name)) s.name += ' (v1, superseded)'; s.description = '(Superseded in KITCHEN pack v2: ' + (k === 'headcount' ? 'ForecastCard' : 'StatusText') + '.) ' + s.description; }
Object.assign(KT, { forecast: fcs.id, statusText: sts.id, historyRow: hrs.id, historyRowV1: oldHr.id }); figma.root.setSharedPluginData('mealloop', 'kt_ids', JSON.stringify(KT));
out.push(fcs.id, sts.id, hrs.id); return out;
