// Run 3 R2-1 brand fixes (stored as mealloop/brand2). Body of async function(figma, args) -> log. One step per call:
// args.step:
//  'wash9'    page 09 + AD-0 frames: frame fills = admin wash fills (canvas + wash/top -> wash/clear), Top edge fade (Status) under the status bar.
//  'topbar'   StaffTopBar component: a lime "on shift" dot (8 pt, ink 1 pt outline) before the mess name.
//  'ontrack'  pages 09 + 10: StatusPill instances reading "On track" in State=Hold -> State=Success (lime fill, ink text).
//  'heroes'   page 10: ring arc -> lime (AD-1b family); first hero MetaChip -> lime chip with ink text (AD-1c, AD-1f, Lakshmi Give);
//             "Live" lime chip under the eyebrow of live heroes (AD-2a, AD-2c, AD-1e families); hub "Decisions" action -> lime pill.
//  'signin'   hide empty profile chips on the AD-0 / MS-0 Confirm profile frames.
figma.skipInvisibleInstanceChildren = false;
const V = async id => figma.variables.getVariableByIdAsync('VariableID:' + id);
const paint = async id => figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 1 }, 'color', await V(id));
const LIME = '45:15', INK = '45:6', HERO = 'VariableID:51:3', ONHERO = '45:28';
const loadAll = async root => { const ts = root.type === 'TEXT' ? [root] : root.findAllWithCriteria({ types: ['TEXT'] }); const m = new Map(); for (const t of ts) for (const s of t.getStyledTextSegments(['fontName'])) m.set(s.fontName.family + s.fontName.style, s.fontName); await Promise.all([...m.values()].map(x => figma.loadFontAsync(x))); };
const log = [];
const p9 = await figma.getNodeByIdAsync('732:2'), p10 = await figma.getNodeByIdAsync('811:21055');
if (args.step === 'wash9') {
  const src = await figma.getNodeByIdAsync('849:564'); const fade = (await figma.getNodeByIdAsync('877:2037')).children.find(c => c.name === 'Top edge fade');
  const frames = [...p9.children.filter(n => n.type === 'FRAME' && n.width === 393), ...p10.children.filter(n => n.type === 'FRAME' && /^AD-0 · /.test(n.name))];
  for (const f of frames) {
    f.fills = src.fills;
    if (!f.children.some(c => c.name === 'Top edge fade')) { const sb = f.children.find(c => c.name === 'Status Bar'); const t = fade.clone(); f.insertChild(sb ? f.children.indexOf(sb) : f.children.length, t); t.relativeTransform = fade.relativeTransform; }
    log.push(f.name);
  }
}
if (args.step === 'topbar') {
  const top = await figma.getNodeByIdAsync('732:4'); await loadAll(top);
  const shift = top.findOne(n => n.name === 'Shift'); const mess = shift.findOne(n => n.name === 'Mess');
  if (!top.findOne(n => n.name === 'On shift dot')) {
    const row = figma.createAutoLayout('HORIZONTAL', { name: 'Mess row', itemSpacing: 6 }); row.fills = []; row.counterAxisAlignItems = 'CENTER';
    shift.insertChild(shift.children.indexOf(mess), row);
    const dot = figma.createEllipse(); dot.name = 'On shift dot'; dot.resize(8, 8); dot.fills = [await paint(LIME)]; dot.strokes = [await paint(INK)]; dot.strokeWeight = 1; dot.strokeAlign = 'INSIDE';
    row.appendChild(dot); row.appendChild(mess);
    log.push('dot added; mess id ' + mess.id);
  }
}
if (args.step === 'ontrack') {
  for (const pg of [p9, p10]) { let n = 0;
    for (const i of pg.findAllWithCriteria({ types: ['INSTANCE'] })) { if (!i.mainComponent || !i.mainComponent.parent || i.mainComponent.parent.name !== 'StatusPill' || i.mainComponent.name !== 'State=Hold') continue;
      const t = i.findOne(x => x.type === 'TEXT'); if (!t || t.characters !== 'On track') continue;
      await loadAll(i); i.swapComponent(i.mainComponent.parent.children.find(v => v.name === 'State=Success')); await loadAll(i); const t2 = i.findOne(x => x.type === 'TEXT'); if (t2.characters !== 'On track') t2.characters = 'On track'; n++; }
    log.push(pg.name + ' on track → Success ' + n); }
}
if (args.step === 'heroes') {
  const fr = re => p10.children.filter(n => n.type === 'FRAME' && re.test(n.name));
  const isHero = n => n.fills && n.fills !== figma.mixed && n.fills.some(q => q.boundVariables && q.boundVariables.color && q.boundVariables.color.id === HERO);
  for (const f of fr(/^AD-1b · /)) { const arc = f.findOne(n => n.type === 'ELLIPSE' && /^Arc/.test(n.name)); if (arc) { if (arc.fills.length) arc.fills = [await paint(LIME)]; if (arc.strokes.length) arc.strokes = [await paint(LIME)]; log.push(f.name + ' arc lime'); } }
  for (const f of fr(/^AD-1c · Today — Decisions(?! \(Empty)|^AD-1f · Today — Watch(?! \(Empty)|Staff access — Lakshmi/)) { const h = f.findAll(n => isHero(n))[0]; const chip = h && h.findAll(n => n.type === 'INSTANCE' && n.mainComponent && n.mainComponent.name === 'Surface=On dark')[0];
    if (chip) { await loadAll(chip); chip.fills = [await paint(LIME)]; chip.strokes = [await paint(INK)]; for (const t of chip.findAll(x => x.type === 'TEXT')) t.fills = [await paint(INK)]; for (const v of chip.findAll(x => x.type === 'VECTOR')) { if (v.fills.length) v.fills = [await paint(INK)]; if (v.strokes.length) v.strokes = [await paint(INK)]; } log.push(f.name + ' chip ' + chip.name); } }
  const chipSet = await figma.getNodeByIdAsync('100:1079'); const od = chipSet.children.find(v => v.name === 'Surface=On dark'); await loadAll(od);
  for (const f of fr(/^AD-2a · Crowd — All messes(?! \(Empty)|^AD-2c · Shortage alerts(?! \(Empty)|^AD-1e · Today — Messes(?! \(Empty)/)) { const h = f.findAll(n => isHero(n))[0]; if (!h || h.findOne(n => n.name === 'Chip · Live')) continue;
    const c = od.createInstance(); const eb = h.children.findIndex(k => k.name === 'Eyebrow'); h.insertChild(eb >= 0 ? eb + 1 : 0, c); await loadAll(c);
    const k = Object.keys(c.componentProperties); const lk = k.find(x => x.startsWith('Label')); const ik = k.find(x => x.startsWith('Show Icon')); const o = {}; o[lk] = 'Live'; if (ik) o[ik] = false; c.setProperties(o);
    c.name = 'Chip · Live'; c.fills = [await paint(LIME)]; c.strokes = [await paint(INK)]; for (const t of c.findAll(x => x.type === 'TEXT')) t.fills = [await paint(INK)];
    try { c.layoutSizingHorizontal = 'HUG'; } catch (e) {} log.push(f.name + ' + Live chip'); }
  for (const f of fr(/^AD-5-0 · Manage hub/)) { const d = f.findOne(n => n.name === 'Decisions' && n.type === 'FRAME'); if (!d) continue; await loadAll(d);
    d.fills = [await paint(LIME)]; d.strokes = [await paint(INK)]; d.cornerRadius = 999; d.paddingLeft = 12; d.paddingRight = 8; d.paddingTop = 4; d.paddingBottom = 4;
    for (const t of d.findAll(x => x.type === 'TEXT')) t.fills = [await paint(INK)]; for (const v of d.findAll(x => x.type === 'VECTOR')) { if (v.strokes.length) v.strokes = [await paint(INK)]; if (v.fills.length) v.fills = [await paint(INK)]; }
    log.push(f.name + ' Decisions → lime pill'); }
}
if (args.step === 'signin') {
  for (const f of [...p9.children, ...p10.children].filter(n => /^(MS|AD)-0 · Confirm profile/.test(n.name))) {
    for (const t of f.findAll(n => n.type === 'TEXT' && n.name === 'Label' && !n.visible)) { let p = t.parent; if (p && p.type !== 'PAGE') { p.visible = false; log.push(f.name + ' hid ' + p.name); } }
  }
}
return log;
