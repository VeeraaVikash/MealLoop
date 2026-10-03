// Stage 3A Insights builders (stored as mealloop/ins3a). Body of async function(figma) -> B.
// Shared parts for the Insights tab-root frames: frame reset, tab-root header, pills, black hero,
// white rows, square tiles, mono runs. Sources: AD-3a SOS (849:564) for the header, pills, row and card.
figma.skipInvisibleInstanceChildren = false;
const page = await figma.getNodeByIdAsync('811:21055');
await figma.setCurrentPageAsync(page);
const styles = await figma.getLocalTextStylesAsync();
const S = n => styles.find(s => s.name === n);
const V = async id => figma.variables.getVariableByIdAsync('VariableID:' + id);
const paint = async id => figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 1 }, 'color', await V(id));
for (const f of [['Inter', 'Regular'], ['Inter', 'Medium'], ['Inter', 'Semi Bold'], ['Inter', 'Bold'], ['JetBrains Mono', 'Bold'], ['JetBrains Mono', 'Medium']]) await figma.loadFontAsync({ family: f[0], style: f[1] });
const loadAll = async root => { const ts = root.type === 'TEXT' ? [root] : root.findAllWithCriteria({ types: ['TEXT'] }); const m = new Map(); for (const t of ts) for (const s of t.getStyledTextSegments(['fontName'])) m.set(s.fontName.family + '|' + s.fontName.style, s.fontName); await Promise.all([...m.values()].map(f => figma.loadFontAsync(f))); };
const strip = async n => { const all = [n, ...('findAll' in n ? n.findAll(x => x.reactions && x.reactions.length) : [])]; for (const x of all) if (x.reactions && x.reactions.length) await x.setReactionsAsync([]); };
const setP = (inst, obj) => { const o = {}; for (const [n, v] of Object.entries(obj)) { const k = Object.keys(inst.componentProperties).find(x => x.split('#')[0] === n); if (!k) throw new Error('No prop ' + n + ' on ' + inst.name); o[k] = v; } inst.setProperties(o); return inst; };
const C = { ink: '45:6', ink2: '45:7', surface: '45:4', heroBg: '51:3', onHero: '45:28', onHero2: '51:5', border: '45:8', lime: '45:15' };
const MONO = { 'ML/Secondary': 'ML/Mono Body', 'ML/Secondary Medium': 'ML/Mono Body', 'ML/Eyebrow': 'ML/Mono Body', 'ML/Footnote': 'ML/Mono Footnote', 'ML/Body': 'ML/Mono Body' };
const RX = /[−+]?\d+(?:[:.,]\d+)*(?:%|[\s ](?:AM|PM))?/g;
const B = { page, S, paint, C, loadAll, strip, setP };
// Apply mono to number runs, keeping the base style elsewhere.
B.mono = async (t, base) => { const ms = S(MONO[base]); if (!ms) return; let m; RX.lastIndex = 0; const s = t.characters; while ((m = RX.exec(s))) await t.setRangeTextStyleIdAsync(m.index, m.index + m[0].length, ms.id); };
B.text = async (parent, name, chars, style, color, opts = {}) => {
  const t = figma.createText(); t.name = name; parent.appendChild(t);
  await t.setTextStyleIdAsync(S(style).id); t.characters = chars; t.fills = [await paint(color)];
  if (opts.fill !== false && parent.layoutMode && parent.layoutMode !== 'NONE') { if (parent.layoutMode === 'VERTICAL') { t.layoutSizingHorizontal = 'FILL'; t.textAutoResize = 'HEIGHT'; } }
  if (opts.mono !== false) await B.mono(t, style);
  return t;
};
B.frame = (parent, name, dir, gap, pad) => { const f = figma.createAutoLayout(dir, { name, itemSpacing: gap || 0 }); f.fills = []; if (pad) { [f.paddingTop, f.paddingRight, f.paddingBottom, f.paddingLeft] = pad; } parent.appendChild(f); if (parent.layoutMode && parent.layoutMode !== 'NONE') { try { f.layoutSizingHorizontal = 'FILL'; } catch (e) {} } return f; };
// Reset a frame to the tab-root shell: keep the five fixed layers, add header and content.
B.reset = async (f, title, subtitle) => {
  const keep = ['Top edge fade', 'Status Bar', 'Scroll edge fade', 'Tab Bar', 'Home Indicator'];
  for (const c of [...f.children]) if (!keep.includes(c.name)) c.remove();
  const sos = await figma.getNodeByIdAsync('849:564');
  f.fills = sos.fills;
  const hdrSrc = await figma.getNodeByIdAsync('1312:10850'); await loadAll(hdrSrc);
  const hdr = hdrSrc.clone(); f.insertChild(0, hdr); hdr.x = 0; hdr.y = 54; await strip(hdr);
  const tt = hdr.findOne(n => n.name === 'Title'); tt.characters = title;
  const st = hdr.findOne(n => n.name === 'Subtitle'); await st.setTextStyleIdAsync(S('ML/Secondary').id); st.characters = subtitle; await B.mono(st, 'ML/Secondary');
  const c = figma.createAutoLayout('VERTICAL', { name: 'Admin / Content', itemSpacing: 12 }); c.fills = [];
  f.insertChild(0, c); c.x = 0; c.y = 182; c.resize(393, 100); c.paddingTop = 0; c.paddingRight = 20; c.paddingBottom = 124; c.paddingLeft = 20;
  c.primaryAxisSizingMode = 'AUTO'; c.counterAxisSizingMode = 'FIXED';
  f.numberOfFixedChildren = 5; f.overflowDirection = 'VERTICAL'; f.clipsContent = true;
  return { header: hdr, content: c };
};
B.pills = async (content, labels, sel) => {
  const src = await figma.getNodeByIdAsync('1312:10871'); await loadAll(src);
  const p = src.clone(); content.appendChild(p); p.layoutSizingHorizontal = 'FILL'; await strip(p);
  const kids = [...p.children];
  for (let i = kids.length; i < labels.length; i++) { const c = kids[0].clone(); p.appendChild(c); kids.push(c); }
  for (let i = 0; i < kids.length; i++) {
    if (i >= labels.length) { kids[i].remove(); continue; }
    const set = kids[i].mainComponent.parent; const v = set.children.find(x => x.name === 'Surface=' + (i === sel ? 'Selected' : 'Tappable'));
    kids[i].swapComponent(v); await loadAll(kids[i]); setP(kids[i], { Label: labels[i] }); kids[i].name = 'Pill · ' + labels[i];
  }
  return p;
};
// Black hero with two figures split by a vertical hairline, a hairline, and a fact line.
B.hero = async (content, o) => {
  const h = B.frame(content, o.name, 'VERTICAL', 12, [20, 20, 20, 20]); h.fills = [await paint(C.heroBg)]; h.cornerRadius = 24;
  await B.text(h, 'Eyebrow', o.eyebrow, 'ML/Eyebrow', C.onHero2);
  const pair = B.frame(h, 'Pair', 'HORIZONTAL', 16); pair.counterAxisAlignItems = 'MIN';
  const fig = async (name, num, unit, unitMonoWords) => {
    const col = B.frame(pair, name, 'VERTICAL', 2); col.layoutSizingHorizontal = 'FILL';
    await B.text(col, 'Number', num, 'ML/Hero Metric', C.onHero, { mono: false });
    const u = await B.text(col, 'Unit', unit, 'ML/Secondary', C.onHero2);
    for (const w of unitMonoWords || []) { const i = unit.indexOf(w); if (i >= 0) await u.setRangeTextStyleIdAsync(i, i + w.length, S('ML/Mono Body').id); }
    return col;
  };
  const a = await fig(o.a[0], o.a[1], o.a[2], o.a[3]);
  if (o.b) {
    const div = figma.createRectangle(); div.name = 'Hairline · vertical'; div.resize(1, 60); div.fills = [await paint(C.onHero2)]; div.opacity = 0.4; pair.appendChild(div); div.layoutSizingVertical = 'FILL';
    await fig(o.b[0], o.b[1], o.b[2], o.b[3]);
  }
  const hl = figma.createRectangle(); hl.name = 'Hairline'; hl.resize(313, 1); hl.fills = [await paint(C.onHero2)]; hl.opacity = 0.4; h.appendChild(hl); hl.layoutSizingHorizontal = 'FILL';
  if (o.line) await B.text(h, 'Line', o.line, 'ML/Footnote', C.onHero2);
  return h;
};
// White row (surface, radius 24) holding a ListRow with chevron; cloned from the SOS "All safety cases" row.
B.row = async (content, name, title, reason) => {
  const src = await figma.getNodeByIdAsync('1312:10948'); await loadAll(src);
  const r = src.clone(); content.appendChild(r); r.layoutSizingHorizontal = 'FILL'; await strip(r); r.name = 'Row · ' + name;
  const lr = r.children[0]; lr.name = 'Row · ' + name; await loadAll(lr);
  setP(lr, { Name: title, Reason: reason || '', 'Show reason': !!reason, 'Show chevron': true });
  const nm = lr.findOne(n => n.name === 'Name'); await nm.setTextStyleIdAsync(S('ML/Secondary Medium').id); await B.mono(nm, 'ML/Secondary Medium');
  const rs = lr.findOne(n => n.name === 'Reason'); if (rs && reason) await B.mono(rs, 'ML/Footnote');
  return r;
};
B.tile = async (parent, name) => { const t = B.frame(parent, name, 'VERTICAL', 0, [14, 14, 14, 14]); t.fills = [await paint(C.surface)]; t.cornerRadius = 24; t.layoutSizingHorizontal = 'FILL'; t.layoutSizingVertical = 'FIXED'; t.resize(t.width, 175); t.primaryAxisAlignItems = 'SPACE_BETWEEN'; return t; };
B.chartBar = async (parent, kind, w, h, name, fillVar) => { const set = await figma.getNodeByIdAsync('887:1840'); const v = set.children.find(c => c.name === 'Kind=' + kind); const b = v.createInstance(); parent.appendChild(b); b.resize(w, h); b.name = name; if (fillVar) b.fills = [await paint(fillVar)]; return b; };
B.chip = async (parent, label, surface) => { const set = await figma.getNodeByIdAsync('100:1079'); const v = set.children.find(c => c.name === 'Surface=' + surface); await loadAll(v); const c = v.createInstance(); parent.appendChild(c); await loadAll(c); setP(c, { Label: label, 'Show Icon': false }); c.name = 'Chip · ' + label; return c; };
B.banner = async (content, msg, index) => { const src = await figma.getNodeByIdAsync('957:89570'); await loadAll(src); const b = src.clone(); content.insertChild(index, b); b.layoutSizingHorizontal = 'FILL'; await loadAll(b); setP(b, { Message: msg }); b.name = 'Offline banner'; const t = b.findOne(n => n.type === 'TEXT'); if (t) await B.mono(t, 'ML/Footnote'); return b; };
B.empty = async (content, title, iconName) => { const sym = await figma.getNodeByIdAsync('73:163'); const ic = sym.children.find(c => c.name === 'Name=' + iconName); const es = (await figma.getNodeByIdAsync('75:270')).createInstance(); es.name = 'Empty · ' + title; content.appendChild(es); es.layoutSizingHorizontal = 'FILL'; await loadAll(es); setP(es, { Title: title, 'Show Action': false, Icon: ic.id }); const body = es.findOne(n => n.type === 'TEXT' && n.characters !== title); if (body) body.visible = false; return es; };
return B;
