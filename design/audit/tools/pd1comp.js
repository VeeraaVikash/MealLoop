// PASS-DESK Q1 component builder (page 03). Body of async function(figma, args); loads ds2b as D.
// Builds flagged sets CodeCard, HomeKeypad, PassResultScreen (cloned from ResultScreen), RequestRow, ShortageChips under the Door Scanner components.
// IDs saved to mealloop/pd_ids.
const D = await new (Object.getPrototypeOf(async function(){}).constructor)('figma','args',figma.root.getSharedPluginData('mealloop','ds2b'))(figma,{});
const pg = await figma.getNodeByIdAsync('44:5355'); await figma.setCurrentPageAsync(pg);
const ref = await figma.getNodeByIdAsync(D.DS.problem); const last = await figma.getNodeByIdAsync(D.DS.alertRow);
const PD = JSON.parse(figma.root.getSharedPluginData('mealloop','pd_ids') || '{}');
const styleSet = s => { s.fills = ref.fills; s.strokes = ref.strokes; s.strokeWeight = ref.strokeWeight; s.dashPattern = ref.dashPattern; s.cornerRadius = ref.cornerRadius; s.layoutMode = 'HORIZONTAL'; s.itemSpacing = 40; s.counterAxisAlignItems = 'MIN'; s.paddingLeft = s.paddingRight = s.paddingTop = s.paddingBottom = 30; s.primaryAxisSizingMode = 'AUTO'; s.counterAxisSizingMode = 'AUTO'; };
const comp = name => { const c = figma.createComponent(); c.name = name; c.fills = []; pg.appendChild(c); return c; };
const V = (c, gap) => { c.layoutMode = 'VERTICAL'; c.itemSpacing = gap; c.primaryAxisSizingMode = 'AUTO'; c.counterAxisSizingMode = 'FIXED'; c.resize(353, 100); };
const stroke = (n, col, w, dash) => { n.strokes = [D.paint(col)]; n.strokeWeight = w; n.strokeAlign = 'INSIDE'; if (dash) n.dashPattern = [6, 4]; };
const pill = async (parent, label, bg, fg, outline) => { const p = D.frame(parent, 'Colour pill · ' + label, { dir: 'H', radius: 999, fill: bg }); p.primaryAxisSizingMode = 'FIXED'; p.counterAxisSizingMode = 'FIXED'; p.resize(220, 52); p.primaryAxisAlignItems = 'CENTER'; p.counterAxisAlignItems = 'CENTER'; if (outline) stroke(p, 'ink', 1.5); await D.t(p, label, 'ML/Body Semibold', fg, { name: 'Colour' }); return p; };
const timer = async (parent, n) => { const r = D.frame(parent, 'Timer', { dir: 'H', gap: 4 }); r.counterAxisAlignItems = 'BASELINE'; await D.t(r, 'Changes in', 'ML/Footnote', 'ink-secondary', { name: 'Timer label' }); await D.t(r, n + ' s', 'ML/Mono Footnote', 'ink-secondary', { name: 'Seconds' }); return r; };
let y = last.y + last.height + 60; const place = s => { s.x = 0; s.y = y; y += s.height + 60; };

// 1 CodeCard
const cc = [];
for (const st of ['Fresh', 'Changed', 'Expired']) { const c = comp('State=' + st); V(c, 8); c.cornerRadius = 28; c.paddingLeft = c.paddingRight = 20; c.paddingTop = c.paddingBottom = 20; c.counterAxisAlignItems = 'CENTER';
  if (st === 'Expired') { stroke(c, 'ink-secondary', 1.5, true); c.paddingTop = c.paddingBottom = 28;
    await D.t(c, 'Code expired', 'ML/Card Heading', 'ink', { name: 'Title' }); await D.t(c, 'Check again for the new code.', 'ML/Secondary', 'ink-secondary', { name: 'Line' }); cc.push(c); continue; }
  c.fills = [D.paint('canvas')];
  if (st === 'Changed') { stroke(c, 'ink', 2); const ch = D.frame(c, 'Chip · Just changed', { dir: 'H', radius: 999, fill: 'surface' }); ch.paddingLeft = ch.paddingRight = 12; ch.paddingTop = ch.paddingBottom = 4; stroke(ch, 'ink', 1); await D.t(ch, 'Just changed', 'ML/Footnote', 'ink', { name: 'Chip label' }); }
  await D.t(c, 'Their screen should show', 'ML/Secondary', 'ink-secondary', { name: 'Label' });
  await D.t(c, st === 'Fresh' ? '7A3F' : 'K2M9', 'ML/Hero Metric', 'ink', { name: 'Code' });
  if (st === 'Fresh') await pill(c, 'Lime', 'live/1-bg', 'live/1-fg', true); else await pill(c, 'Blue', 'live/2-bg', 'live/2-fg', false);
  await timer(c, st === 'Fresh' ? 7 : 10); cc.push(c); }
const ccs = figma.combineAsVariants(cc, pg); ccs.name = 'CodeCard'; styleSet(ccs); place(ccs);
ccs.description = 'PASS DESK 2026-10 (new, flagged). What the student\'s pass should show right now (P04): the code in large mono, the colour pill (live colour tokens), "Changes in N s". States: Fresh; Changed (re-fetched while the sheet is open: ink outline and a "Just changed" chip as the brief highlight); Expired (dashed, "Code expired", no code shown). Codes and colours are SAMPLE values from the pass service (SIMULATED in Figma); never real credentials.';

// 2 HomeKeypad
const kpSet = await figma.getNodeByIdAsync(D.DS.keypad); const kpCompact = kpSet.children.find(c => c.name === 'Size=Compact');
const hk = [];
for (const [st, digits] of [['Empty', ['', '', '', '']], ['Typing', ['0', '2', '', '']], ['Checking', ['0', '2', '3', '8']], ['Not found', ['0', '2', '3', '8']]]) {
  const c = comp('State=' + st); V(c, 12);
  const card = D.frame(c, 'Digits card', { gap: 12, fill: 'hero-bg', radius: 28 }); card.layoutSizingHorizontal = 'FILL'; card.paddingLeft = card.paddingRight = card.paddingTop = card.paddingBottom = 20;
  await D.t(card, 'STUDENT\'S LAST 4 DIGITS', 'ML/Tag', 'on-hero-secondary', { name: 'Label', ls: 6 });
  const row = D.frame(card, 'Boxes', { dir: 'H', gap: 12 }); row.layoutSizingHorizontal = 'FILL';
  for (let i = 0; i < 4; i++) { const b = D.frame(row, 'Box ' + (i + 1), { dir: 'H', radius: 16, fill: 'action-pressed' }); b.counterAxisSizingMode = 'FIXED'; b.resize(70, 56); b.layoutSizingHorizontal = 'FILL'; b.primaryAxisAlignItems = 'CENTER'; b.counterAxisAlignItems = 'CENTER';
    if (st === 'Not found') stroke(b, 'on-hero-error', 2); await D.t(b, digits[i], 'ML/Metric', 'on-hero', { name: 'Digit ' + (i + 1) }); }
  if (st === 'Checking') await D.t(card, 'Checking 0238 with the pass service…', 'ML/Secondary', 'on-hero-secondary', { fill: true, name: 'Status' });
  if (st === 'Not found') { await D.t(card, 'No student with 0238 in Main Mess.', 'ML/Body Semibold', 'on-hero', { fill: true, name: 'Status' }); const b = await D.btn(card, 'Try again', 'outline', { on: true, h: 44 }); b.name = 'Button / Try again'; }
  const k = kpCompact.createInstance(); c.appendChild(k); k.layoutSizingHorizontal = 'FILL'; k.name = 'KeyPad';
  hk.push(c); }
const hks = figma.combineAsVariants(hk, pg); hks.name = 'HomeKeypad'; styleSet(hks); place(hks);
hks.description = 'PASS DESK 2026-10 (new, flagged). The check on Home during the meal (P03): a black card "STUDENT\'S LAST 4 DIGITS" with four boxes, and the KeyPad (Compact) under it. States: Empty, Typing (digits are text overrides Digit 1–4), Checking, Not found ("No student with 0238 in Main Mess." + Try again). On the 4th digit the Check this pass sheet opens. A lookup never records an entry.';

// 3 PassResultScreen (from ResultScreen)
const rsSet = await figma.getNodeByIdAsync(D.DS.result); const src = k => rsSet.children.find(c => c.name === 'Kind=' + k);
const prs = [];
const icoSwap = async (v, kind) => { const circ = v.findOne(n => n.name === 'Circle'); const old = circ.children[0]; const s = old.width; old.remove(); const f = figma.createFrame(); f.name = 'Icon / ticket ' + kind; f.fills = []; f.resize(s, s); f.clipsContent = false; circ.appendChild(f); const t = D.icon(f, 'ticket', s, 'ink'); t.x = 0; t.y = 0;
  if (kind === 'slash') D.vec(f, 'Slash', 'M3 21 L21 3', s, 'ink', 1.9 * s / 24); else D.vec(f, 'X', 'M9.3 9.3 L14.7 14.7 M14.7 9.3 L9.3 14.7', s, 'ink', 1.9 * s / 24); };
for (const [k, from, title, sub, ico] of [['Verified', 'Success', 'Pass verified', 'Aarav ••0238'], ['No pass', 'Not recognised', 'No special pass', 'Aarav ••0238 has no valid special-meal pass for Lunch.', 'slash'], ['Wrong meal', 'Not recognised', 'Wrong meal', 'This pass is for Dinner.', 'slash'], ['Already', 'Already', 'Already recorded', 'Aarav ••0238 took the special meal at 12:18 PM.'], ['Mismatch', 'Not recognised', 'Doesn\'t match', 'The code or colour on their phone is different.', 'x'], ['Offline', 'Offline', 'Can\'t check right now', 'No connection. This pass is NOT checked.']]) {
  const v = src(from).clone(); pg.appendChild(v); v.name = 'Kind=' + k; await D.setText(v.findOne(n => n.name === 'Title'), title); await D.setText(v.findOne(n => n.name === 'Subtitle'), sub); if (ico) await icoSwap(v, ico); prs.push(v); }
const prss = figma.combineAsVariants(prs, pg); prss.name = 'PassResultScreen'; styleSet(prss); place(prss);
prss.description = 'PASS DESK 2026-10 (adapted from ResultScreen, flagged). The top of a Pass Desk result page. Verified (black check; page is full lime; only after "Matches · record entry"), No pass and Wrong meal (ticket with a slash; nothing recorded), Already (count stays), Mismatch (ticket with an x; nothing recorded), Offline ("This pass is NOT checked."). Title and Subtitle are text overrides.';

// 4 RequestRow
const rr = [];
for (const [st, name, line] of [['Waiting', 'Aarav ••0238', 'Sent 12:20 PM'], ['Approved', 'Meera ••0412', 'Approved 12:08 PM'], ['Done', 'Kiran ••0377', 'New pass issued 11:52 AM'], ['Rejected', 'Dev ••0190', 'Rejected · ask the pass admin']]) {
  const c = comp('Status=' + st); c.layoutMode = 'HORIZONTAL'; c.itemSpacing = 12; c.counterAxisAlignItems = 'CENTER'; c.primaryAxisSizingMode = 'FIXED'; c.counterAxisSizingMode = 'AUTO'; c.resize(353, 56); c.minHeight = 56; c.paddingTop = 6; c.paddingBottom = 5;
  c.strokes = [D.paint('border')]; c.strokeTopWeight = 1; c.strokeBottomWeight = 0; c.strokeLeftWeight = 0; c.strokeRightWeight = 0; c.strokeAlign = 'INSIDE';
  const tx = D.frame(c, 'Text', { gap: 0 }); tx.layoutGrow = 1; await D.t(tx, name, 'ML/Body Semibold', 'ink', { fill: true, name: 'Name' }); await D.t(tx, line, 'ML/Secondary', 'ink-secondary', { fill: true, name: 'Line' });
  const ch = D.frame(c, 'Chip · ' + st, { dir: 'H', radius: 999 }); ch.paddingLeft = ch.paddingRight = 16; ch.paddingTop = ch.paddingBottom = 7; ch.counterAxisAlignItems = 'CENTER';
  if (st === 'Waiting') stroke(ch, 'ink-secondary', 1.5, true); else if (st === 'Done') { ch.fills = [D.paint('lime')]; stroke(ch, 'ink', 1.5); } else stroke(ch, 'ink', 1.5);
  await D.t(ch, st, 'ML/Secondary Medium', 'ink', { name: 'Status' }); rr.push(c); }
const rrs = figma.combineAsVariants(rr, pg); rrs.name = 'RequestRow'; styleSet(rrs); place(rrs);
const kN = rrs.addComponentProperty('Name', 'TEXT', 'Aarav ••0238'), kL = rrs.addComponentProperty('Line', 'TEXT', 'Sent 12:20 PM');
for (const v of rrs.children) { v.findOne(n => n.name === 'Name').componentPropertyReferences = { characters: kN }; v.findOne(n => n.name === 'Line').componentPropertyReferences = { characters: kL }; }
rrs.description = 'PASS DESK 2026-10 (new, flagged). A new-pass request (P10): name with the masked ID, a status line, and the status chip: Waiting (dashed: sent), Approved (outlined: the admin said yes), Done (lime: the student actually has the new pass), Rejected (outlined: ask the pass admin). Approved is never shown as Done. Status comes from the admin pass-exception flow (SIMULATED).';

// 5 ShortageChips
const sc = [];
for (const sel of ['Chicken Briyani', 'None']) { const c = comp('Selected=' + sel); c.layoutMode = 'HORIZONTAL'; c.layoutWrap = 'WRAP'; c.itemSpacing = 12; c.counterAxisSpacing = 12; c.primaryAxisSizingMode = 'FIXED'; c.counterAxisSizingMode = 'AUTO'; c.resize(353, 124);
  for (const lab of ['Chicken Briyani', 'Panneer Briyani', 'Raita', 'Something else']) { const on = lab === sel; const ch = D.frame(c, 'Chip · ' + lab, { dir: 'H', radius: 999, fill: on ? 'hero-bg' : undefined }); ch.primaryAxisSizingMode = 'FIXED'; ch.counterAxisSizingMode = 'FIXED'; ch.resize(170.5, 56); ch.primaryAxisAlignItems = 'CENTER'; ch.counterAxisAlignItems = 'CENTER'; if (!on) stroke(ch, 'ink', 1.5);
    await D.t(ch, lab, 'ML/Body', on ? 'on-hero' : 'ink', { name: 'Label' }); }
  sc.push(c); }
const scs = figma.combineAsVariants(sc, pg); scs.name = 'ShortageChips'; styleSet(scs); place(scs);
scs.description = 'PASS DESK 2026-10 (new, flagged). "Which food is short?" (P12): one chip per dish of the day\'s menu (sample: the Wednesday special Chicken Briyani, Panneer Briyani, plus Raita and Something else). Selected = black. The dishes come from the menu service (SIMULATED).';

Object.assign(PD, { codeCard: ccs.id, homeKeypad: hks.id, passResult: prss.id, requestRow: rrs.id, shortage: scs.id }); figma.root.setSharedPluginData('mealloop', 'pd_ids', JSON.stringify(PD));
return { PD, sizes: [ccs, hks, prss, rrs, scs].map(s => s.name + ' ' + Math.round(s.width) + 'x' + Math.round(s.height) + ' @' + s.y + ' :: ' + s.children.map(v => v.name + ' ' + Math.round(v.height)).join(', ')) };
