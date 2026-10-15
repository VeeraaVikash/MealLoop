// Student-redesign Meals generator (stored as mealloop/srmeals). Body of async function(figma, args).
// Menu tiers come from mealloop/sr_menu (design/audit/redesign/menu_tiers.json, compact).
// args {pageId, notes:bool, items:[{key:'Wed-Lunch', id?:rebuild in place, x, y, state?:'Offline'|'Loading'|'Not published'|'No menu'|'Error'|'Menu changed'|'Service ended', name?}]}
// Each frame: Meals large title, week strip (DateChip ×7), MealSegments4, Highlight L tile, mains (S×3 / M×2), Wed Lunch ticket,
// "Curries" row (M), non-veg rows (outlined, chip if highlighted), "Comes with it" list in board order. Map key→id saved to mealloop/sr_meals_<pageId>.
const AF = Object.getPrototypeOf(async function(){}).constructor;
const S = await new AF('figma', 'args', figma.root.getSharedPluginData('mealloop', 'srh'))(figma, {});
const MENU = JSON.parse(figma.root.getSharedPluginData('mealloop', 'sr_menu'));
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], DATE = { Mon: 12, Tue: 13, Wed: 14, Thu: 15, Fri: 16, Sat: 17, Sun: 18 };
const LONG = { Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday', Sun: 'Sunday' };
const pg = await figma.getNodeByIdAsync(args.pageId);
const key = 'sr_meals_' + args.pageId; const map = JSON.parse(figma.root.getSharedPluginData('mealloop', key) || '{}');
const label = async (parent, t) => { const x = await S.text(parent, t, 'ML/Secondary Medium', 'ink-secondary'); x.name = 'Label / ' + t; return x; };
const out = [];
for (const it of args.items) {
  const [day, slot] = it.key.split('-'); const m = MENU.find(r => r[0] === day && r[1] === slot);
  const name = it.name || ('Meals · ' + day + ' ' + DATE[day] + ' · ' + slot + (it.state ? ' · ' + it.state : ''));
  let f, c;
  const o = { title: 'Meals', subtitle: 'Main Mess', tab: 'Meals', time: '7:00' };
  if (it.id) { f = await figma.getNodeByIdAsync(it.id); ({ c } = await S.reframe(f, o)); f.name = name; if (it.x !== undefined) { f.x = it.x; f.y = it.y; } }
  else ({ f, c } = await S.screen(pg, name, it.x, it.y, o));
  c.itemSpacing = 16;
  // week strip
  const ws = S.frame(c, 'WeekStrip', { dir: 'H' }); ws.layoutSizingHorizontal = 'FILL'; ws.primaryAxisAlignItems = 'SPACE_BETWEEN';
  for (const d of DAYS) { const st = d === day ? 'Selected' : d === 'Wed' ? 'Today' : 'Default';
    const ch = await S.v(S.ID.date, { State: st }, { Weekday: d, Day: String(DATE[d]) }, ws); ch.name = 'DateChip / ' + d; }
  const sg = await S.v(S.ID.seg, { Selected: slot }, null, c); sg.layoutSizingHorizontal = 'FILL'; sg.name = 'MealSegments4';
  if (it.state === 'Offline') { const ob = await S.v(S.ID.offline, {}, { Message: "You're offline. This is the menu saved at 6:58 AM." }, c); ob.layoutSizingHorizontal = 'FILL'; ob.name = 'OfflineBanner'; }
  if (it.state === 'Menu changed' || it.state === 'Service ended') { const b = S.card(c, 'Notice', { dir: 'H', gap: 12, fill: 'fill-quiet', stroke: 'border' }); b.counterAxisAlignItems = 'CENTER';
    S.icon(b, it.state === 'Menu changed' ? 'arrow.clockwise' : 'clock', 22, 'ink'); const tx = await S.text(b, it.state === 'Menu changed' ? 'The mess updated this menu at 11:10 AM.' : 'Lunch service has ended for today. Dinner opens 7:30 PM.', 'ML/Secondary', 'ink'); tx.layoutGrow = 1; tx.textAutoResize = 'HEIGHT'; }
  if (it.state === 'Loading') { for (const [nm, hh] of [['Highlight', 129], ['Mains', 113], ['List', 90]]) { const r = figma.createFrame(); r.name = 'Skeleton / ' + nm; c.appendChild(r); r.layoutSizingHorizontal = 'FILL'; r.resize(353, hh); r.cornerRadius = 22; r.fills = [S.paint('track')]; }
    await S.text(c, 'Getting the menu…', 'ML/Footnote', 'ink-secondary'); }
  else if (it.state === 'Not published' || it.state === 'No menu' || it.state === 'Error') {
    const e = await S.v(S.ID.empty, {}, null, c); e.layoutSizingHorizontal = 'FILL'; e.name = 'EmptyState';
    const T = { 'Not published': ["This menu isn't up yet", 'The mess usually posts it by 6 AM. Your entry QR works either way.', false], 'No menu': ['No ' + slot.toLowerCase() + ' this day', 'The mess is not serving this meal. Check the other meals.', false], Error: ["Couldn't load the menu", 'Check your connection and try again.', true] }[it.state];
    const ks = Object.keys(e.componentProperties); const set = {};
    for (const k of ks) { if (k.startsWith('Title')) set[k] = T[0]; if (k.startsWith('Body')) set[k] = T[1]; if (k.startsWith('Show Action')) set[k] = T[2]; } e.setProperties(set);
    const at = e.findOne(n => n.type === 'TEXT' && /report|try|action/i.test(n.characters)); if (at && T[2]) await S.setText(at, 'Try again'); }
  else {
    const [, , hl, mains, cur, nvr, comes] = m;
    if (hl) { const t = await S.tile(c, hl[0], 'L', 'Highlight', hl[1]); t.layoutSizingHorizontal = 'FILL'; }
    if (mains.length) { const r = S.frame(c, 'Mains', { dir: 'H', gap: 12 }); r.layoutSizingHorizontal = 'FILL';
      for (const d of mains) { const t = await S.tile(r, d[0], mains.length === 3 ? 'S' : 'M', 'Default', d[1]); t.layoutGrow = 1; } }
    if (day === 'Wed' && slot === 'Lunch') { const tk = await S.v(S.ID.ticket, { Status: 'Limited' }, { Title: 'Chicken Briyani · Panneer Briyani', Detail: 'Alternate Wednesday special' }, c); tk.layoutSizingHorizontal = 'FILL'; tk.name = 'TicketStrip / Alternate Wednesday';
      const sl = tk.findOne(n => n.name === 'Status label'); if (sl) await S.setText(sl, 'Limited'); }
    if (cur.length) { await label(c, 'Curries'); const r = S.frame(c, 'Curries', { dir: 'H', gap: 12 }); r.layoutSizingHorizontal = 'FILL';
      for (const d of cur) { const t = await S.tile(r, d[0], 'M', 'Default', d[1]); t.layoutGrow = 1; if (cur.length === 1) { t.layoutGrow = 0; } } }
    for (const d of nvr) { const r = S.frame(c, 'Non-veg row / ' + d[0], { dir: 'H', gap: 12, radius: 22 }); r.layoutSizingHorizontal = 'FILL'; r.counterAxisAlignItems = 'CENTER'; r.paddingLeft = 18; r.paddingRight = 12; r.paddingTop = r.paddingBottom = 8; r.minHeight = 60;
      r.strokes = [S.paint('border')]; r.strokeWeight = 1.5; const dm = await S.v(S.ID.diet, { Diet: 'Non-veg' }, null, r); dm.name = 'NonVegMark';
      const tx = await S.text(r, d[0], 'ML/Body Semibold', 'ink'); tx.layoutGrow = 1; tx.textAutoResize = 'HEIGHT';
      if (d[2]) { const ch = await S.v(S.ID.chip, { On: 'Light' }, { Label: 'Highlight' }, r); ch.name = 'HighlightChip'; } }
    if (comes.length) { await label(c, 'Comes with it'); const p = await S.text(c, comes.join(' · '), 'ML/Body', 'ink', { w: 353 }); p.name = 'Comes with it list'; p.layoutSizingHorizontal = 'FILL'; p.lineHeight = { unit: 'PIXELS', value: 26 }; }
    if (slot === 'Snacks') { const n = await S.text(c, 'Snacks are shown for information. No answer or entry QR needed (draft).', 'ML/Footnote', 'ink-secondary', { w: 353 }); n.layoutSizingHorizontal = 'FILL'; }
  }
  if (args.notes) { const near = pg.children.filter(n => n !== f && n.x >= f.x - 2 && n.x < f.x + 393 && ((n.y >= f.y - 80 && n.y < f.y) || (n.y >= f.y + 852 && n.y < f.y + 1010))); for (const n of near) n.remove();
    await S.notes(f, 'Meals · ' + LONG[day] + ' ' + DATE[day] + ' Aug · ' + slot + (it.state ? ' · ' + it.state : '') + (it.id ? '' : ' · new'), 'Wed 14 Aug 2024, 7:00 AM (Meals at any time)'); }
  if (!it.id && !/ · new$/.test(f.name)) f.name = f.name + ' · new';
  if (!it.state) map[it.key] = f.id; else map[it.key + '-' + it.state] = f.id;
  out.push(it.key + (it.state ? '/' + it.state : '') + ' ' + f.id + ' h' + Math.round(c.height));
}
figma.root.setSharedPluginData('mealloop', key, JSON.stringify(map));
return out;
