// SUPERVISOR U1 components (page 03). Body of async function(figma, args); loads ktw as D.
// New flagged sets: MealCard (Not started / In service / Closed / Closed · Unavailable), FollowUpRow (Count / Unavailable),
// SupervisorShortageRow (Active / Resolved), WasteRow (Closed / Entries), ConfirmDialog (Lines=1 / Lines=2), SOSCard (Not taken / Claimed by you / Checked),
// SOSPanel · Supervisor (Not taken / Claimed by you / Checked). StatusText gains Status=Active (filled ink dot). Saves ids in mealloop/sv_ids.
const D = await new (Object.getPrototypeOf(async function(){}).constructor)('figma','args',figma.root.getSharedPluginData('mealloop','ktw'))(figma,{});
const pg = await figma.getNodeByIdAsync('44:5355'); await figma.setCurrentPageAsync(pg);
const ref = await figma.getNodeByIdAsync(D.DS.problem);
const KT = JSON.parse(figma.root.getSharedPluginData('mealloop','kt_ids'));
const SV = {};
const styleSet = s => { s.fills = ref.fills; s.strokes = ref.strokes; s.strokeWeight = ref.strokeWeight; s.dashPattern = ref.dashPattern; s.cornerRadius = ref.cornerRadius; s.layoutMode = 'HORIZONTAL'; s.itemSpacing = 40; s.counterAxisAlignItems = 'MIN'; s.paddingLeft = s.paddingRight = s.paddingTop = s.paddingBottom = 30; s.primaryAxisSizingMode = 'AUTO'; s.counterAxisSizingMode = 'AUTO'; };
const comp = name => { const c = figma.createComponent(); c.name = name; c.fills = []; pg.appendChild(c); return c; };
const vcomp = (name, w) => { const c = comp(name); c.layoutMode = 'VERTICAL'; c.primaryAxisSizingMode = 'AUTO'; c.counterAxisSizingMode = 'FIXED'; c.resize(w || 353, 100); return c; };
const topLine = n => { n.strokes = [D.paint('border')]; n.strokeTopWeight = 1; n.strokeBottomWeight = 0; n.strokeLeftWeight = 0; n.strokeRightWeight = 0; n.strokeAlign = 'INSIDE'; };
let y = 0; { for (const n of pg.children) if (n.x < 2000) y = Math.max(y, n.y + n.height); y += 60; }
const place = s => { s.x = 0; s.y = y; y += s.height + 60; };
const sp = (p, h) => { const s = D.frame(p, 'Spacer', {}); s.resize(10, h); return s; };
const chev = p => D.icon(p, 'chevron.right', 18, 'ink-secondary');

// StatusText: add Status=Active (filled ink dot) for Active and Closed
const sts = await figma.getNodeByIdAsync(KT.statusText);
if (!sts.children.find(v => v.name === 'Status=Active')) { const base = sts.children.find(v => v.name === 'Status=Not started'); const a = base.clone(); sts.appendChild(a); a.name = 'Status=Active';
  const d = a.findOne(n => n.name === 'Dot'); d.fills = [D.paint('ink')]; await D.setText(a.findOne(n => n.name === 'Label'), 'Active');
  sts.description += ' SUPERVISOR 2026-10: Status=Active (filled ink dot) for "Active" shortages and "Closed" meals; "Resolved" uses Status=Recorded with the label overridden.'; }
const stInst = async (p, st, label, time) => { const i = sts.children.find(v => v.name === 'Status=' + st).createInstance(); p.appendChild(i); i.name = 'StatusText';
  if (label) await D.setText(i.findOne(n => n.name === 'Label'), label);
  if (time) { const k = Object.keys(i.componentProperties).find(k => k.startsWith('Show time')); i.setProperties({ [k]: true }); await D.setText(i.findOne(n => n.name === 'Time'), time); }
  return i; };

// 1 MealCard
const mc = [];
for (const st of ['Not started', 'In service', 'Closed', 'Closed · Unavailable']) { const c = vcomp('State=' + st); c.fills = [D.paint('hero-bg')]; c.cornerRadius = 28; c.itemSpacing = 4; c.paddingLeft = c.paddingRight = c.paddingTop = c.paddingBottom = 20;
  const h = D.frame(c, 'Header', { dir: 'H', gap: 8 }); h.counterAxisAlignItems = 'CENTER';
  if (st !== 'Not started') D.dot(h, 'lime', 10);
  if (st === 'In service') { const ht = D.frame(h, 'Header text', { dir: 'H', gap: 4 }); ht.counterAxisAlignItems = 'BASELINE'; await D.t(ht, 'LIVE ·', 'ML/Tag', 'on-hero-secondary', { name: 'Words', ls: 6 }); await D.t(ht, '1:40 PM', 'ML/Tag', 'on-hero-secondary', { name: 'Time', ls: 6 }); }
  else await D.t(h, st === 'Not started' ? 'FORECASTED ATTENDANCE' : 'MEAL CLOSED', 'ML/Tag', 'on-hero-secondary', { name: 'Words', ls: 6 });
  sp(c, 4);
  if (st === 'Not started' || st === 'In service') {
    await D.t(c, st === 'Not started' ? '860' : '714', 'ML/Hero Metric', 'on-hero', { name: 'Count' });
    await D.t(c, st === 'Not started' ? 'expected diners' : 'students entered', 'ML/Body', 'on-hero-secondary', { fill: true, name: 'Label' }); sp(c, 12);
    const b = st === 'Not started' ? await D.btn(c, 'Start meal', 'limeOnDark', { h: 56 }) : await D.btn(c, 'Close meal', 'outline', { h: 56, on: true });
    if (st === 'In service') b.strokes = [D.paint('on-hero-secondary')];
  } else {
    await D.t(c, 'Lunch has ended', 'ML/Title', 'on-hero', { fill: true, name: 'Title' }); sp(c, 16);
    await D.t(c, 'Final entries', 'ML/Secondary', 'on-hero-secondary', { name: 'Final label' });
    if (st === 'Closed') await D.t(c, '774', 'ML/Hero Metric', 'on-hero', { name: 'Count' });
    else { sp(c, 4); await D.t(c, 'Unavailable', 'ML/Title', 'on-hero-secondary', { name: 'Unavailable' }); await D.t(c, 'The final count did not arrive.', 'ML/Secondary', 'on-hero-secondary', { fill: true, name: 'Note' }); }
  }
  mc.push(c); }
const mcs = figma.combineAsVariants(mc, pg); mcs.name = 'MealCard'; styleSet(mcs); place(mcs);
mcs.description = 'SUPERVISOR 2026-10 (new, flagged). The black meal card on the Supervisor Home (S01, S02, S06). Not started: "FORECASTED ATTENDANCE", 860, "expected diners", lime "Start meal" (56 pt). In service: lime dot, "LIVE · 1:40 PM", 714, "students entered", a quiet outlined "Close meal"; no forecast. Closed: "MEAL CLOSED", "Lunch has ended", "Final entries" 774; Closed · Unavailable shows "Unavailable", never 0. Meal state, entries and the forecast are SIMULATED in Figma.';
SV.mealCard = mcs.id;

// 2 FollowUpRow
const fr = [];
for (const st of ['Count', 'Unavailable']) { const c = comp('State=' + st); c.layoutMode = 'HORIZONTAL'; c.itemSpacing = 12; c.counterAxisAlignItems = 'CENTER'; c.primaryAxisSizingMode = 'FIXED'; c.counterAxisSizingMode = 'AUTO'; c.resize(353, 56); c.minHeight = 56; c.paddingTop = c.paddingBottom = 14; topLine(c);
  const t = await D.t(c, 'Waste not recorded', 'ML/Body', 'ink', { name: 'Label' }); t.layoutGrow = 1; t.textAutoResize = 'HEIGHT';
  if (st === 'Count') await D.t(c, '2', 'ML/Mono Body', 'ink', { name: 'Count' }); else await D.t(c, 'Unavailable', 'ML/Secondary', 'ink-secondary', { name: 'Count' });
  chev(c); fr.push(c); }
const frs = figma.combineAsVariants(fr, pg); frs.name = 'FollowUpRow'; styleSet(frs); place(frs);
frs.description = 'SUPERVISOR 2026-10 (new, flagged). A follow-up row on Home and Me (56 pt): label ("Waste not recorded", "Active shortages"), a mono count, chevron. The row opens the matching Alerts group: the same task in every place, the same count. Unavailable when the count is missing (never 0). Label and Count are text overrides. Counts are SIMULATED.';
SV.followUp = frs.id;

// 3 SupervisorShortageRow
const sr = [];
for (const st of ['Active', 'Resolved']) { const c = comp('State=' + st); c.layoutMode = 'HORIZONTAL'; c.itemSpacing = 12; c.counterAxisAlignItems = 'CENTER'; c.primaryAxisSizingMode = 'FIXED'; c.counterAxisSizingMode = 'AUTO'; c.resize(353, 56); c.minHeight = 56; c.paddingTop = c.paddingBottom = 12; topLine(c);
  const tx = D.frame(c, 'Text', { gap: 2 }); tx.layoutGrow = 1; await D.t(tx, 'Steamed Rice', 'ML/Body Semibold', 'ink', { fill: true, name: 'Title' }); await D.t(tx, 'Almost out · posted 1:30 PM', 'ML/Secondary', 'ink-secondary', { fill: true, name: 'Line' });
  if (st === 'Active') await stInst(c, 'Active'); else await stInst(c, 'Recorded', 'Resolved');
  chev(c); sr.push(c); }
const srs = figma.combineAsVariants(sr, pg); srs.name = 'SupervisorShortageRow'; styleSet(srs); place(srs);
srs.description = 'SUPERVISOR 2026-10 (new, flagged). A shortage the kitchen reported, as the Supervisor sees it in Alerts (S07): item, "Almost out · posted 1:30 PM", StatusText "Active" (filled dot) or "Resolved" (lime dot), chevron to Shortage details. Not the Kitchen ShortageRow (Sent / Seen). Reporting and resolving are SIMULATED.';
SV.shortageRow = srs.id;

// 4 WasteRow
const wr = [];
for (const st of ['Closed', 'Entries']) { const c = comp('Line=' + st); c.layoutMode = 'HORIZONTAL'; c.itemSpacing = 12; c.counterAxisAlignItems = 'CENTER'; c.primaryAxisSizingMode = 'FIXED'; c.counterAxisSizingMode = 'AUTO'; c.resize(353, 56); c.minHeight = 56; c.paddingTop = c.paddingBottom = 12; topLine(c);
  const tx = D.frame(c, 'Text', { gap: 2 }); tx.layoutGrow = 1; await D.t(tx, st === 'Closed' ? 'Lunch · Wed 14' : 'Dinner · Tue 13', 'ML/Body Semibold', 'ink', { fill: true, name: 'Title' });
  if (st === 'Closed') await D.t(tx, 'Closed 2:00 PM', 'ML/Secondary', 'ink-secondary', { fill: true, name: 'Line' });
  else { const ln = D.frame(tx, 'Line', { dir: 'H', gap: 4 }); ln.counterAxisAlignItems = 'BASELINE'; await D.t(ln, '598', 'ML/Mono Body', 'ink-secondary', { name: 'Count' }); await D.t(ln, 'entered', 'ML/Secondary', 'ink-secondary', { name: 'Words' }); }
  await stInst(c, 'Not recorded'); chev(c); wr.push(c); }
const wrs = figma.combineAsVariants(wr, pg); wrs.name = 'WasteRow'; styleSet(wrs); place(wrs);
wrs.description = 'SUPERVISOR 2026-10 (new, flagged). A meal whose waste report the kitchen has not saved (S07): meal and day, "Closed 2:00 PM" or "598 entered" (number in mono), StatusText "Not recorded" (empty dot), chevron to the read-only Waste report. No remind, forward or approve action. Waste data is SIMULATED.';
SV.wasteRow = wrs.id;

// 5 ConfirmDialog (iOS-style centred card, two actions side by side)
const cd = [];
for (const st of ['1', '2']) { const c = vcomp('Lines=' + st, 361); c.fills = [D.paint('surface')]; c.cornerRadius = 28; c.itemSpacing = 0; c.clipsContent = true;
  const body = D.frame(c, 'Body', { gap: 6 }); body.layoutSizingHorizontal = 'FILL'; body.paddingLeft = body.paddingRight = 24; body.paddingTop = 24; body.paddingBottom = 20; body.counterAxisAlignItems = 'CENTER';
  await D.t(body, st === '2' ? 'Start this meal?' : 'Mark shortage as resolved?', 'ML/Card Heading', 'ink', { fill: true, name: 'Title', align: 'CENTER' });
  if (st === '2') await D.t(body, 'Lunch · Main Mess', 'ML/Body', 'ink', { fill: true, name: 'Line 1', align: 'CENTER' });
  await D.t(body, st === '2' ? 'Door scanner and pass desk will open.' : 'Steamed Rice', 'ML/Secondary', 'ink-secondary', { fill: true, name: st === '2' ? 'Line 2' : 'Line 1', align: 'CENTER' });
  const acts = D.frame(c, 'Actions', { dir: 'H', gap: 0 }); acts.layoutSizingHorizontal = 'FILL'; topLine(acts);
  for (const [nm, sty] of [['Cancel', 'ML/Body'], [st === '2' ? 'Start meal' : 'Mark resolved', 'ML/Body Semibold']]) { const b = D.frame(acts, 'Button / ' + nm, { dir: 'H' }); b.layoutSizingHorizontal = 'FILL'; b.counterAxisSizingMode = 'FIXED'; b.resize(180, 64); b.layoutSizingHorizontal = 'FILL'; b.primaryAxisAlignItems = 'CENTER'; b.counterAxisAlignItems = 'CENTER'; b.paddingLeft = b.paddingRight = 8;
    if (nm === 'Cancel') { b.strokes = [D.paint('border')]; b.strokeRightWeight = 1; b.strokeTopWeight = 0; b.strokeBottomWeight = 0; b.strokeLeftWeight = 0; b.strokeAlign = 'INSIDE'; }
    await D.t(b, nm, sty, 'ink', { name: nm === 'Cancel' ? 'Cancel label' : 'Action label' }); }
  cd.push(c); }
const cds = figma.combineAsVariants(cd, pg); cds.name = 'ConfirmDialog'; styleSet(cds); place(cds);
cds.description = 'SUPERVISOR 2026-10 (new, flagged). iOS-style centred confirmation card, 361 wide, placed at x 16 and centred vertically over the scrim; identical size and position on every frame that uses it. Title, one or two optional lines, then Cancel (left) and the action (right, semibold) side by side, each 64 pt high. Used for Start this meal?, Close this meal?, Mark shortage as resolved?, Sign out?. Title, Line 1, Line 2, Cancel label and Action label are text overrides.';
SV.dialog = cds.id;

// 6 SOSCard (Alerts and the panel): the Door Scanner SOSAlertCard without its button
const ac = await figma.getNodeByIdAsync(D.DS.alertCard); const base = ac.children.find(v => v.name === 'State=Not claimed');
const sc = [];
for (const st of ['Not taken', 'Claimed by you', 'Checked']) { const c = vcomp('State=' + st); c.fills = [D.paint('hero-bg')]; c.cornerRadius = 28; c.itemSpacing = 6; c.paddingLeft = c.paddingRight = c.paddingTop = c.paddingBottom = 20;
  for (const ch of base.children) { if (ch.name.startsWith('Button') || (ch.name === 'Spacer' && ch.height === 10)) continue; const k = ch.clone(); c.appendChild(k); if (k.type === 'TEXT') { k.layoutSizingHorizontal = 'FILL'; } }
  if (ac.children.find(v => v.name === 'State=Not claimed').cornerRadius) c.cornerRadius = base.cornerRadius;
  const chip = c.findOne(n => n.name.startsWith('Chip')); const lab = chip.findOne(n => n.type === 'TEXT');
  if (st === 'Claimed by you') { chip.name = 'Chip · You\'re checking this'; await D.setText(lab, 'You\'re checking this'); }
  if (st === 'Checked') { chip.name = 'Chip · Checked'; await D.setText(lab, 'Checked by the door · 12:52 PM'); chip.fills = [D.paint('lime')]; chip.strokes = []; lab.fills = [D.paint('on-lime')];
    await D.t(c, 'Close the case when you are satisfied.', 'ML/Secondary', 'on-hero-secondary', { fill: true, name: 'Note' });
    await D.setText(c.findOne(n => n.name === 'Ago'), '· 14 min ago'); }
  sc.push(c); }
const scs = figma.combineAsVariants(sc, pg); scs.name = 'SOSCard'; styleSet(scs); place(scs);
{ const k = scs.addComponentProperty('Show kind', 'BOOLEAN', true); for (const v of scs.children) { const n = v.findOne(n => n.name === 'Kind'); if (n) n.componentPropertyReferences = { visible: k }; } }
scs.description = 'SUPERVISOR 2026-10 (new, flagged; from the Door Scanner SOSAlertCard). The incident card in Alerts (S08, top, only while an SOS is active) and in the Supervisor SOS panel (S04, S05; "Show kind" off). Not taken: "Nobody has taken this yet". Claimed by you: "You\'re checking this". Checked: lime "Checked by the door · 12:52 PM" (or the desk, the kitchen, the supervisor) and "Close the case when you are satisfied." The chips are the SOS case state drawn in the pack, not report status. Tapping opens the SOS panel. SOS routing is SIMULATED.';
SV.sosCard = scs.id;

// 7 SOSPanel · Supervisor (panel body: card, helper, actions)
const pn = [];
const panelDef = { 'Not taken': ['Only if you\'re free. Keep the meal running first if it is busy.', 'I\'ll go and check', 'Not now'], 'Claimed by you': ['When you have seen it, mark it as checked. You can close the case after.', 'Mark as checked', 'Back to meal'], 'Checked': [null, 'Close case', 'Not yet'] };
for (const st of ['Not taken', 'Claimed by you', 'Checked']) { const [help, a, b] = panelDef[st]; const c = vcomp('State=' + st); c.itemSpacing = 16;
  const card = scs.children.find(v => v.name === 'State=' + st).createInstance(); c.appendChild(card); card.name = 'SOSCard'; card.layoutSizingHorizontal = 'FILL'; card.setProperties({ [Object.keys(card.componentProperties).find(k => k.startsWith('Show kind'))]: false });
  if (help) { const h = await D.t(c, help, 'ML/Secondary', 'ink-secondary', { fill: true, name: 'Helper' }); h.textAlignHorizontal = 'CENTER'; }
  const p = await D.btn(c, a, 'black', { h: 56 }); const s2 = await D.btn(c, b, 'outline', { h: 56 }); pn.push(c); }
const pns = figma.combineAsVariants(pn, pg); pns.name = 'SOSPanel · Supervisor'; styleSet(pns); place(pns);
pns.description = 'SUPERVISOR 2026-10 (new, flagged; the SOSPanel layout with the Supervisor actions). Inside the GlassSheet "SOS · 1 active". Not taken: I\'ll go and check / Not now, helper "Only if you\'re free. Keep the meal running first if it is busy." Claimed by you: Mark as checked (records "Checked by the supervisor") / Back to meal. Checked by someone else: Close case / Not yet. CLOSE CASE EXISTS ONLY HERE: the Door Scanner, Pass Desk and Kitchen panels only mark a case checked. After closing: toast "Case closed" and the SOS tab disappears. SOS routing and closing are SIMULATED.';
SV.sosPanel = pns.id;

SV.statusText = sts.id;
figma.root.setSharedPluginData('mealloop', 'sv_ids', JSON.stringify(SV));
return JSON.stringify(SV);
