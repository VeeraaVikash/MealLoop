// Final-2 G8 report builder (stored as mealloop/rb8). Body of async function(figma, args) -> R.
// A4 portrait pages (595 x 842 pt) as components in the "AD-4f Weekly report" section on page 10.
// Typography is the document's own (A4 exception: 10 pt minimum; body 10.5-11 pt): Inter + JetBrains Mono for numbers.
// R.page(n, title) -> { pg, c }: running header "MealLoop · Weekly report" / "5–11 Aug" + hairline, footer
//   "All data is sample" / "Page N of 9"; c = 499-wide content stack at x 48, y 76.
// R.t(parent, chars, size, weight, paint, {mono:false|'all', align, hug}); numbers become JetBrains Mono.
// R.h(parent, num, title); R.cap(parent, text); R.box(parent, {fill, stroke, dashed, pad, gap, r, dir});
// R.table(parent, head[], rows[][], {w: [], hi: rowIndex}); R.bullets(parent, items).
const AF = Object.getPrototypeOf(async function(){}).constructor;
const H = await new AF('figma', 'args', figma.root.getSharedPluginData('mealloop', 'h24'))(figma, {});
const R = { H }; R.C = {};
const CV = { ink: '45:6', ink2: '45:7', lime: '45:15', hero: '51:3', border: '45:8', onHero: '45:28', onHero2: '51:5', quiet: '45:13', surface: '45:4', onLime: '58:2' };
for (const k of Object.keys(CV)) R.C[k] = await H.paint(CV[k]);
for (const s of ['Regular', 'Medium', 'Semi Bold', 'Bold']) await figma.loadFontAsync({ family: 'Inter', style: s });
for (const s of ['Medium', 'Bold']) await figma.loadFontAsync({ family: 'JetBrains Mono', style: s });
R.page10 = await figma.getNodeByIdAsync('811:21055');
R.section = R.page10.children.find(n => n.type === 'SECTION' && n.name === 'AD-4f Weekly report');
R.RX = /[−+-]?(?:Rs\s)?\d+(?:[:.,]\d+)*(?:–\d+(?:[:.,]\d+)*)?(?:%|\s?(?:AM|PM|kg|L|min)\b)?/g;
R.t = (parent, chars, size, weight, paint, o) => {
  o = o || {}; const t = figma.createText(); parent.appendChild(t); t.fontName = { family: o.mono === 'all' ? 'JetBrains Mono' : 'Inter', style: o.mono === 'all' ? (weight === 'Bold' || weight === 'Semi Bold' ? 'Bold' : 'Medium') : weight || 'Regular' }; t.fontSize = size; t.characters = chars; t.fills = [paint || R.C.ink]; t.lineHeight = { unit: 'PERCENT', value: 140 }; t.name = o.name || chars.slice(0, 40);
  if (o.mono !== false && o.mono !== 'all') { let m; R.RX.lastIndex = 0; while ((m = R.RX.exec(chars))) if (/\d/.test(m[0])) t.setRangeFontName(m.index, m.index + m[0].length, { family: 'JetBrains Mono', style: weight === 'Bold' || weight === 'Semi Bold' ? 'Bold' : 'Medium' }); }
  if (parent.layoutMode && parent.layoutMode !== 'NONE') { if (o.hug) { t.layoutSizingHorizontal = 'HUG'; t.textAutoResize = 'WIDTH_AND_HEIGHT'; } else { t.layoutSizingHorizontal = 'FILL'; t.textAutoResize = 'HEIGHT'; } } else t.textAutoResize = 'WIDTH_AND_HEIGHT';
  if (o.align) t.textAlignHorizontal = o.align; return t; };
R.al = (parent, dir, o) => { o = o || {}; const f = figma.createFrame(); parent.appendChild(f); f.layoutMode = dir; f.primaryAxisSizingMode = 'AUTO'; f.counterAxisSizingMode = 'AUTO'; f.itemSpacing = o.gap !== undefined ? o.gap : 8; const px = o.padX !== undefined ? o.padX : (o.pad || 0), py = o.padY !== undefined ? o.padY : (o.pad || 0); f.paddingLeft = px; f.paddingRight = px; f.paddingTop = py; f.paddingBottom = py; f.fills = o.fill ? [o.fill] : []; f.cornerRadius = o.r || 0; f.name = o.name || 'Group'; f.clipsContent = false; if (o.align) f.counterAxisAlignItems = o.align; if (o.main) f.primaryAxisAlignItems = o.main; if (parent.layoutMode && parent.layoutMode !== 'NONE') f.layoutSizingHorizontal = o.hug ? 'HUG' : 'FILL'; if (o.stroke) { f.strokes = [o.stroke]; f.strokeWeight = o.sw || 1; if (o.dashed) f.dashPattern = [4, 3]; } return f; };
R.rule = (parent, paint) => { const l = figma.createFrame(); parent.appendChild(l); l.name = 'Hairline'; l.resize(10, 1); l.fills = [paint || R.C.border]; if (parent.layoutMode && parent.layoutMode !== 'NONE') l.layoutSizingHorizontal = 'FILL'; return l; };
R.page = (n, title) => {
  const pg = figma.createComponent(); R.section.appendChild(pg); pg.name = 'Report page ' + n + ' · ' + title + ' · new'; pg.resize(595, 842); pg.x = 80 + (n - 1) * 675; pg.y = 80; pg.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]; pg.clipsContent = true;
  pg.description = 'Weekly report, A4 portrait (595 × 842 pt), page ' + n + ' of 9 (Final-2 G8, flagged: report pages are components so the in-app preview and viewer reuse them).';
  if (n > 1) { const hd = R.al(pg, 'VERTICAL', { gap: 8, name: 'Running header' }); hd.x = 48; hd.y = 28; hd.layoutSizingHorizontal = 'FIXED'; hd.resize(499, 10); hd.primaryAxisSizingMode = 'AUTO'; const row = R.al(hd, 'HORIZONTAL', { gap: 8, name: 'Row', main: 'SPACE_BETWEEN' }); R.t(row, 'MealLoop · Weekly report', 10, 'Semi Bold', R.C.ink, { hug: true }); R.t(row, '5–11 Aug', 10, 'Medium', R.C.ink2, { hug: true }); R.rule(hd, R.C.ink); }
  const ft = R.al(pg, 'HORIZONTAL', { gap: 8, name: 'Footer', main: 'SPACE_BETWEEN' }); ft.x = 48; ft.y = 806; ft.layoutSizingHorizontal = 'FIXED'; ft.resize(499, 14); R.t(ft, 'All data is sample', 10, 'Regular', R.C.ink2, { hug: true }); R.t(ft, 'Page ' + n + ' of 9', 10, 'Medium', R.C.ink2, { hug: true });
  const c = R.al(pg, 'VERTICAL', { gap: 14, name: 'Body' }); c.x = 48; c.y = n > 1 ? 72 : 0; c.layoutSizingHorizontal = 'FIXED'; c.resize(499, 10); c.primaryAxisSizingMode = 'AUTO';
  return { pg, c }; };
R.h = (parent, num, title) => { const r = R.al(parent, 'HORIZONTAL', { gap: 10, name: 'Section ' + num, align: 'BASELINE' }); R.t(r, String(num), 16, 'Bold', R.C.ink2, { hug: true, mono: 'all' }); R.t(r, title, 18, 'Bold', R.C.ink, { hug: true }); return r; };
R.cap = (parent, text) => R.t(parent, text, 10, 'Regular', R.C.ink2, { name: 'Caption' });
R.box = (parent, o) => R.al(parent, o.dir || 'VERTICAL', { gap: o.gap !== undefined ? o.gap : 8, pad: o.pad !== undefined ? o.pad : 14, fill: o.fill, r: o.r !== undefined ? o.r : 8, stroke: o.stroke, dashed: o.dashed, name: o.name || 'Box' });
R.table = (parent, head, rows, o) => {
  o = o || {}; const sum = o.w.reduce((a, b) => a + b, 0); const w = o.w.map(x => Math.floor(x * (sum > 487 ? 487 / sum : 1))); const tb = R.al(parent, 'VERTICAL', { gap: 0, name: o.name || 'Table' });
  const mk = (cells, kind, i) => { const r = R.al(tb, 'HORIZONTAL', { gap: 0, padY: 6, padX: 6, name: kind === 'head' ? 'Head' : 'Row ' + (i + 1), fill: (o.hi !== undefined && kind !== 'head' && o.hi === i) ? R.C.quiet : null, align: 'CENTER' });
    cells.forEach((c, j) => { const t = R.t(r, String(c), kind === 'head' ? 10 : 10.5, kind === 'head' ? 'Semi Bold' : (o.hi === i ? 'Semi Bold' : 'Regular'), kind === 'head' ? R.C.ink2 : R.C.ink, { mono: kind === 'head' ? false : (j > 0 && /^[\d.,:\s−+%–-]+(?:\s?(?:kg|L|min|AM|PM))?$/.test(String(c)) ? 'all' : undefined) }); t.layoutSizingHorizontal = 'FIXED'; t.resize(w[j], t.height); t.textAutoResize = 'HEIGHT'; if (j > 0) t.textAlignHorizontal = 'RIGHT'; });
    R.rule(tb, kind === 'head' ? R.C.ink : R.C.border); };
  mk(head, 'head'); rows.forEach((r, i) => mk(r, 'row', i)); return tb; };
R.bullets = (parent, items) => { const g = R.al(parent, 'VERTICAL', { gap: 6, name: 'Bullets' }); for (const it of items) { const r = R.al(g, 'HORIZONTAL', { gap: 8, name: 'Bullet' }); R.t(r, '•', 11, 'Bold', R.C.ink, { hug: true }); R.t(r, it, 11, 'Regular', R.C.ink); } return g; };
R.n = v => String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
return R;
