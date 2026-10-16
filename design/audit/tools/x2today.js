// ADMIN-REDESIGN X2 Today builder (stored as mealloop/x2today). Body of async function(figma, args). args: { items: [spec] }
// spec: { name, x, y, time, now, tiles: [[phase, mess, number, line?]...] | 'loading', needs: [[title, sub, chipStyle, chipLabel]...],
//         seeAll?, nothing?, safety?, offline?, moment? }
// Layout per A01: logo row + DR avatar, "Hey Devi" + date, DayLine, 2 × 2 MessTiles, "Needs you" (max two rows, then See all).
const AF = Object.getPrototypeOf(async function(){}).constructor;
const A = await new AF('figma', 'args', figma.root.getSharedPluginData('mealloop', 'adm'))(figma, {});
const pg = await figma.getNodeByIdAsync('2237:2'); const out = [];
for (const it of args.items) {
  const { f, c } = await A.screen(pg, it.name, it.x, it.y, { noNav: true, tab: 'Today', time: it.time || '11:10', gap: 12, moment: it.moment });
  c.paddingTop = 0;
  const top = A.frame(c, 'Brand row', { dir: 'H', gap: 8 }); top.layoutSizingHorizontal = 'FILL'; top.counterAxisAlignItems = 'CENTER';
  const om = await A.v(A.ID.orbit, { Size: '24' }, null, top); om.name = 'OrbitMark';
  await A.t(top, 'MealLoop', 'ML/Body Semibold', 'ink'); const sp = A.frame(top, 'Space', {}); sp.resize(1, 1); sp.layoutGrow = 1;
  const av = A.frame(top, 'Avatar · DR', { dir: 'H', radius: 22, fill: 'hero-bg' }); av.resize(44, 44); av.primaryAxisSizingMode = 'FIXED'; av.counterAxisSizingMode = 'FIXED'; av.primaryAxisAlignItems = 'CENTER'; av.counterAxisAlignItems = 'CENTER';
  await A.t(av, 'DR', 'ML/Tag', 'on-hero');
  const gr = A.frame(c, 'Greeting', { dir: 'H', gap: 8 }); gr.layoutSizingHorizontal = 'FILL'; gr.counterAxisAlignItems = 'BASELINE';
  const h = await A.t(gr, 'Hey Devi', 'ML/Large Title', 'ink'); h.layoutGrow = 1; await A.t(gr, 'Wed 14 Aug', 'ML/Secondary', 'ink-secondary');
  if (it.offline) { const b = await A.v(A.ID.offline, {}, null, c); b.layoutSizingHorizontal = 'FILL'; const tx = b.findOne(n => n.type === 'TEXT'); await A.setText(tx, it.offline); }
  const dl = await A.use(c, 'dayline', { Now: it.now || 'Lunch' }); dl.name = 'DayLine';
  if (it.safety) { const s = A.hero(c, 'Safety card', { gap: 10 });
    const e = A.frame(s, 'Open', { dir: 'H', gap: 8 }); e.counterAxisAlignItems = 'CENTER'; A.dot(e, 'lime', 10); await A.t(e, 'OPEN · 55 MIN', 'Label/Eyebrow', 'on-hero-secondary', { ls: 6 });
    await A.t(s, 'Found something in food', 'ML/Section', 'on-hero', { fill: true }); await A.t(s, 'Main Mess · Sambar · reported 12:45 PM', 'ML/Secondary', 'on-hero-secondary', { fill: true });
    await A.btn(s, 'Open case', 'outline', { on: true, h: 48 }); }
  if (it.tiles === 'loading') { for (let r = 0; r < 2; r++) { const row = A.frame(c, 'Tiles ' + (r + 1), { dir: 'H', gap: 12 }); row.layoutSizingHorizontal = 'FILL'; for (let k = 0; k < 2; k++) { const sk = A.frame(row, 'Skeleton tile', { radius: 28, fill: 'fill-quiet' }); sk.layoutGrow = 1; sk.counterAxisSizingMode = 'FIXED'; sk.resize(170, 188); sk.primaryAxisSizingMode = 'FIXED'; } } }
  else for (let r = 0; r < 2; r++) { const row = A.frame(c, 'Tiles ' + (r + 1), { dir: 'H', gap: 12 }); row.layoutSizingHorizontal = 'FILL';
    for (let k = 0; k < 2; k++) { const [ph, mess, num, line] = it.tiles[r * 2 + k]; const t = await A.use(row, 'tile', { Phase: ph }, { Mess: mess }); t.name = 'MessTile / ' + mess; t.layoutGrow = 1;
      const n = t.findOne(x => x.name === 'Number'); if (num !== undefined && num !== null) n.characters = num; const l = t.findOne(x => x.name === 'Line'); if (l && line) l.characters = line; } }
  if (it.nothing) { const nb = A.card(c, 'Nothing needs you', { gap: 4, pad: 20 }); await A.t(nb, 'Nothing needs you.', 'ML/Body Semibold', 'ink', { fill: true }); await A.t(nb, it.nothing, 'ML/Secondary', 'ink-secondary', { fill: true }); }
  if (it.needs === 'loading') { await A.label(c, 'Needs you'); for (let k = 0; k < 2; k++) { const sk = A.frame(c, 'Skeleton row', { radius: 8, fill: 'fill-quiet' }); sk.layoutSizingHorizontal = 'FILL'; sk.counterAxisSizingMode = 'FIXED'; sk.primaryAxisSizingMode = 'FIXED'; sk.resize(353, 44); } }
  else if (it.needs && it.needs.length) { const nl = A.frame(c, 'Needs you', { gap: 0 }); nl.layoutSizingHorizontal = 'FILL'; await A.label(nl, 'Needs you'); const g = A.frame(nl, 'Space', {}); g.resize(1, 8);
    for (const [title, sub, sty, lab] of it.needs) await A.row(nl, title, sub, async r => { await A.use(r, 'chip', { Style: sty }, { Label: lab }); }, { py: 10 });
    if (it.seeAll) await A.row(nl, it.seeAll, null, undefined, { titleStyle: 'ML/Body Semibold' });
    const last = A.sep(nl); }
  if (it.loadingNote) await A.t(c, it.loadingNote, 'ML/Secondary', 'ink-secondary');
  A.fade(f); out.push(f.id + ' ' + f.name + ' h' + Math.round(c.y + c.height));
}
return out;
