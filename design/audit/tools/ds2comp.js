// DOOR-SCANNER pack v2 · D1 component builder (page 03). Run as the body of async function(figma, args) with dsh loaded as D.
// Builds two flagged component sets under the Door Scanner components: SOSAlertCard (State = Not claimed / Claimed by you / Checked by you)
// and AlertRow (Kind = Done / Seen / Reminder / See all; text properties Title, Time, Line). IDs saved to mealloop/ds_ids (alertCard, alertRow).
const D = await new (Object.getPrototypeOf(async function(){}).constructor)('figma','args',figma.root.getSharedPluginData('mealloop','dsh'))(figma,{});
const pg = await figma.getNodeByIdAsync('44:5355'); await figma.setCurrentPageAsync(pg);
const ref = await figma.getNodeByIdAsync(D.DS.problem);
const styleSet = s => { s.fills = ref.fills; s.strokes = ref.strokes; s.strokeWeight = ref.strokeWeight; s.dashPattern = ref.dashPattern; s.cornerRadius = ref.cornerRadius; };
const comp = (name) => { const c = figma.createComponent(); c.name = name; c.fills = []; pg.appendChild(c); return c; };
const vstack = (c, gap) => { c.layoutMode = 'VERTICAL'; c.itemSpacing = gap; c.primaryAxisSizingMode = 'AUTO'; c.counterAxisSizingMode = 'FIXED'; };

// SOSAlertCard
const cards = [];
for (const [state, ago, chip, chipKind, btn] of [
  ['Not claimed', '· 5 min ago', 'Nobody has taken this yet', 'outline', ['I\'ll go and check', 'limeOnDark']],
  ['Claimed by you', '· 6 min ago', 'You\'re checking this', 'lime', ['Open the SOS', 'outline']],
  ['Checked by you', '· 6 min ago', 'Checked by the door · Ravi will close it', 'outline', null]]) {
  const c = comp('State=' + state); vstack(c, 6); c.resize(353, 100); c.fills = [D.paint('hero-bg')]; c.cornerRadius = 32; c.paddingLeft = c.paddingRight = 24; c.paddingTop = c.paddingBottom = 24;
  const m = D.frame(c, 'Meta', { dir: 'H', gap: 8 }); m.counterAxisAlignItems = 'CENTER'; D.dot(m, 'lime', 10);
  await D.t(m, 'SOS ·', 'ML/Secondary Medium', 'on-hero-secondary', { name: 'Kind' }); await D.t(m, '12:45 PM', 'ML/Mono Body', 'on-hero-secondary', { name: 'Time' }); await D.t(m, ago, 'ML/Secondary', 'on-hero-secondary', { name: 'Ago' });
  await D.t(c, 'Found something in food', 'ML/Section', 'on-hero', { fill: true, name: 'Title' });
  await D.t(c, 'Main Mess · Block A', 'ML/Secondary', 'on-hero-secondary', { fill: true, name: 'Place' });
  const sp = D.frame(c, 'Spacer', {}); sp.resize(10, 6);
  const ch = D.frame(c, 'Chip · ' + chip, { dir: 'H', radius: 999 }); ch.paddingLeft = ch.paddingRight = 14; ch.paddingTop = ch.paddingBottom = 7; ch.counterAxisAlignItems = 'CENTER';
  if (chipKind === 'lime') ch.fills = [D.paint('lime')]; else { ch.strokes = [D.paint('on-hero-secondary')]; ch.strokeWeight = 1; ch.strokeAlign = 'INSIDE'; }
  const cl = await D.t(ch, chip, 'ML/Secondary Medium', chipKind === 'lime' ? 'on-lime' : 'on-hero', { name: 'Chip label' });
  if (btn) { const sp2 = D.frame(c, 'Spacer', {}); sp2.resize(10, 10); const b = await D.btn(c, btn[0], btn[1], { on: true }); b.name = 'Button / ' + btn[0]; }
  else { cl.textAutoResize = 'HEIGHT'; }
  cards.push(c); }
const cs = figma.combineAsVariants(cards, pg); cs.name = 'SOSAlertCard'; styleSet(cs); cs.layoutMode = 'HORIZONTAL'; cs.itemSpacing = 40; cs.counterAxisAlignItems = 'MIN'; cs.paddingLeft = cs.paddingRight = cs.paddingTop = cs.paddingBottom = 30; cs.primaryAxisSizingMode = 'AUTO'; cs.counterAxisSizingMode = 'AUTO';
cs.x = 0; cs.y = ref.y + ref.height + 60;
cs.description = 'DOOR SCANNER 2026-10 pack v2 (new, flagged). The SOS card at the top of Alerts (D17). Only while an SOS is active. States: Not claimed (outline chip "Nobody has taken this yet", lime "I\'ll go and check"), Claimed by you (lime chip, outline "Open the SOS"), Checked by you (outline chip "Checked by the door · Ravi will close it"; the case stays open). SOS routing is SIMULATED in Figma.';

// AlertRow
const rows = [];
const kinds = [['Done', 'Meal started', '12:00 PM', 'Ravi opened Lunch.'], ['Seen', 'Problem seen', '12:24 PM', 'Scanner not working · Ravi'], ['Reminder', 'Meal ends soon', '1:50 PM', 'Lunch ends at 2:00 PM.'], ['See all', 'See all · 5 alerts', '', '']];
for (const [k, title, time, line] of kinds) {
  const c = comp('Kind=' + k); c.layoutMode = 'HORIZONTAL'; c.itemSpacing = 14; c.counterAxisAlignItems = 'CENTER'; c.primaryAxisSizingMode = 'FIXED'; c.counterAxisSizingMode = 'AUTO'; c.resize(353, 56); c.minHeight = 56;
  c.strokes = [D.paint('border')]; c.strokeTopWeight = 1; c.strokeBottomWeight = 0; c.strokeLeftWeight = 0; c.strokeRightWeight = 0; c.strokeAlign = 'INSIDE';
  if (k === 'See all') { c.paddingTop = c.paddingBottom = 16; const t = await D.t(c, title, 'ML/Body Semibold', 'ink', { name: 'Title' }); t.layoutGrow = 1; t.textAutoResize = 'HEIGHT'; D.icon(c, 'chevron.right', 18, 'ink-secondary'); rows.push(c); continue; }
  c.paddingTop = 6; c.paddingBottom = 5;
  const ci = D.frame(c, 'Circle', { dir: 'H', radius: 22 }); ci.primaryAxisSizingMode = 'FIXED'; ci.counterAxisSizingMode = 'FIXED'; ci.resize(44, 44); ci.primaryAxisAlignItems = 'CENTER'; ci.counterAxisAlignItems = 'CENTER';
  if (k === 'Done') { ci.fills = [D.paint('lime')]; ci.strokes = [D.paint('ink')]; ci.strokeWeight = 1.5; ci.strokeAlign = 'INSIDE'; D.ico(ci, 'check', 22, 'ink', 2.2); }
  if (k === 'Seen') { ci.fills = [D.paint('hero-bg')]; D.icon(ci, 'bell', 20, 'on-hero'); }
  if (k === 'Reminder') { ci.fills = []; ci.strokes = [D.paint('ink')]; ci.strokeWeight = 1.5; ci.strokeAlign = 'INSIDE'; D.icon(ci, 'clock', 20, 'ink'); }
  const tx = D.frame(c, 'Text', { gap: 0 }); tx.layoutGrow = 1;
  const top = D.frame(tx, 'Top', { dir: 'H', gap: 8 }); top.layoutSizingHorizontal = 'FILL'; top.counterAxisAlignItems = 'BASELINE';
  const t1 = await D.t(top, title, 'ML/Body Semibold', 'ink', { name: 'Title' }); t1.layoutGrow = 1; t1.textAutoResize = 'HEIGHT';
  await D.t(top, time, 'ML/Mono Footnote', 'ink-secondary', { name: 'Time' });
  await D.t(tx, line, 'ML/Secondary', 'ink-secondary', { fill: true, name: 'Line' });
  rows.push(c); }
const rs = figma.combineAsVariants(rows, pg); rs.name = 'AlertRow'; styleSet(rs); rs.layoutMode = 'HORIZONTAL'; rs.itemSpacing = 40; rs.counterAxisAlignItems = 'MIN'; rs.paddingLeft = rs.paddingRight = rs.paddingTop = rs.paddingBottom = 30; rs.primaryAxisSizingMode = 'AUTO'; rs.counterAxisSizingMode = 'AUTO';
rs.x = 0; rs.y = cs.y + cs.height + 60;
const kT = rs.addComponentProperty('Title', 'TEXT', 'Meal started'), kTi = rs.addComponentProperty('Time', 'TEXT', '12:00 PM'), kL = rs.addComponentProperty('Line', 'TEXT', 'Ravi opened Lunch.');
for (const v of rs.children) { const t = v.findOne(n => n.name === 'Title'); if (t) t.componentPropertyReferences = { characters: kT }; const ti = v.findOne(n => n.name === 'Time'); if (ti) ti.componentPropertyReferences = { characters: kTi }; const l = v.findOne(n => n.name === 'Line'); if (l) l.componentPropertyReferences = { characters: kL }; }
rs.description = 'DOOR SCANNER 2026-10 pack v2 (new, flagged). A quiet row under "Earlier" on Alerts (D17): a 44 pt circle on one axis (Done: lime check with ink outline; Seen: ink with a white bell; Reminder: outlined clock), a short title, the time on the right in mono and one short line. See all: shown only when more than 3 alerts exist. Rows are 56 pt with a top divider; at most three under Earlier.';
D.DS.alertCard = cs.id; D.DS.alertRow = rs.id; figma.root.setSharedPluginData('mealloop', 'ds_ids', JSON.stringify(D.DS));
return { card: cs.id, cardSize: [cs.width, cs.height], cardVariants: cs.children.map(v => v.name + ' ' + Math.round(v.height)), row: rs.id, rowSize: [rs.width, rs.height], rowVariants: rs.children.map(v => v.name + ' ' + Math.round(v.height)), props: Object.keys(rs.componentPropertyDefinitions) };
