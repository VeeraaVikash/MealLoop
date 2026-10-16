// ADMIN-REDESIGN helpers (stored as mealloop/adm). Body of async function(figma, args) -> A (extends srh S).
// A.t text, A.dot step nodes, A.stepper (DayLine / ChainStepper drawing), A.chip, A.btn, A.row, A.label, A.card, A.sep,
// A.screen (S.screen + AdminTabBar swap + notes), A.sheet (GlassSheet + grab handle + Close), A.tabSet / A.comp lookups.
const AF = Object.getPrototypeOf(async function(){}).constructor;
const S = await new AF('figma', 'args', figma.root.getSharedPluginData('mealloop', 'srh'))(figma, {});
const A = S;
for (const f of [['Inter', 'Regular'], ['Inter', 'Medium'], ['Inter', 'Semi Bold'], ['Inter', 'Bold'], ['JetBrains Mono', 'Medium'], ['JetBrains Mono', 'Bold']]) await figma.loadFontAsync({ family: f[0], style: f[1] });
A.CID = JSON.parse(figma.root.getSharedPluginData('mealloop', 'adm_ids') || '{}');
A.t = async (parent, chars, style, colour, o) => { o = o || {}; const t = await S.text(parent, chars, style, colour || 'ink', {}); t.name = o.name || chars.slice(0, 40);
  if (o.fill && parent && parent.layoutMode) { t.layoutSizingHorizontal = 'FILL'; t.textAutoResize = 'HEIGHT'; }
  if (o.w) { t.textAutoResize = 'HEIGHT'; t.resize(o.w, t.height); }
  if (o.align) t.textAlignHorizontal = o.align; if (o.ls) t.letterSpacing = { unit: 'PERCENT', value: o.ls }; return t; };
A.dot = (parent, kind, size, onDark) => { const e = figma.createEllipse(); e.resize(size, size); e.name = 'Dot · ' + kind;
  if (kind === 'done') e.fills = [S.paint(onDark ? 'on-hero' : 'ink')];
  else if (kind === 'now') { e.fills = [S.paint('lime')]; e.strokes = [S.paint('ink')]; e.strokeWeight = 2; e.strokeAlign = 'INSIDE'; }
  else if (kind === 'lime') { e.fills = [S.paint('lime')]; }
  else { e.fills = [S.paint('canvas')]; e.strokes = [S.paint('ink-secondary')]; e.strokeWeight = 1.5; e.dashPattern = [3, 3]; e.strokeAlign = 'INSIDE'; }
  if (parent) parent.appendChild(e); return e; };
// labels: array; cur: index of the current step (labels.length = all done). o.day: done nodes get a check; o.w width.
A.stepper = async (parent, labels, cur, o) => { o = o || {}; const W = o.w || 353, n = labels.length; const f = figma.createFrame(); f.name = o.name || 'Stepper'; f.fills = []; f.resize(W, 60); f.clipsContent = false; if (parent) parent.appendChild(f);
  const x0 = 31, x1 = W - 31, cx = i => x0 + (x1 - x0) * i / (n - 1), cy = 14; const texts = [];
  for (let i = 0; i < n - 1; i++) { const r = figma.createRectangle(); r.name = 'Line ' + (i + 1); f.appendChild(r); r.resize(cx(i + 1) - cx(i), 3); r.x = cx(i); r.y = cy - 1.5; r.fills = [S.paint(i < cur ? 'ink' : 'track')]; }
  for (let i = 0; i < n; i++) { const k = i < cur ? 'done' : i === cur ? 'now' : 'next'; const sz = k === 'now' ? 28 : k === 'done' ? (o.day ? 24 : 16) : 20;
    const d = A.dot(f, k, sz); d.name = 'Node ' + (i + 1) + ' · ' + k; d.x = cx(i) - sz / 2; d.y = cy - sz / 2;
    if (k === 'done' && o.day) { const ic = S.icon(f, 'checkmark', 14, 'on-hero'); ic.x = cx(i) - 7; ic.y = cy - 7; }
    const t = await A.t(f, labels[i], k === 'now' ? 'ML/Secondary Medium' : 'ML/Secondary', k === 'now' ? 'ink' : 'ink-secondary', { name: 'Label ' + (i + 1) });
    t.x = Math.round(Math.max(-6, Math.min(W - t.width + 6, cx(i) - t.width / 2))); t.y = 34; texts.push(t); }
  return { f, texts }; };
A.chip = async (parent, label, kind, o) => { o = o || {}; const c = S.frame(parent, 'Chip · ' + label, { dir: 'H', gap: 6, radius: 999 }); c.paddingLeft = c.paddingRight = o.px || 14; c.paddingTop = c.paddingBottom = o.py || 6; c.counterAxisAlignItems = 'CENTER';
  if (kind === 'lime') { c.fills = [S.paint('lime')]; c.strokes = [S.paint('ink')]; c.strokeWeight = 1.5; c.strokeAlign = 'INSIDE'; }
  else if (kind === 'outline') { c.strokes = [S.paint(o.on ? 'on-hero' : 'ink')]; c.strokeWeight = 1.5; c.strokeAlign = 'INSIDE'; }
  else if (kind === 'dashed') { c.strokes = [S.paint(o.on ? 'on-hero-secondary' : 'ink')]; c.strokeWeight = 1.5; c.dashPattern = [5, 4]; c.strokeAlign = 'INSIDE'; }
  else if (kind === 'quiet') c.fills = [S.paint('fill-quiet')];
  else if (kind === 'black') c.fills = [S.paint('hero-bg')];
  if (o.dot) A.dot(c, 'lime', 8);
  await A.t(c, label, o.style || 'ML/Secondary Medium', kind === 'black' ? (o.fg || 'lime') : (o.fg || (o.on ? 'on-hero' : 'ink')));
  return c; };
A.btn = async (parent, label, kind, o) => { o = o || {}; const h = o.h || 56; const b = S.frame(parent, 'Button / ' + label, { dir: 'H', radius: h / 2 }); b.primaryAxisAlignItems = 'CENTER'; b.counterAxisAlignItems = 'CENTER'; b.paddingLeft = b.paddingRight = o.px || 20;
  b.counterAxisSizingMode = 'FIXED'; b.resize(o.w || 120, h); if (o.fill !== false && parent && parent.layoutMode) b.layoutSizingHorizontal = 'FILL'; if (o.w) { b.layoutSizingHorizontal = 'FIXED'; b.resize(o.w, h); }
  let fg = 'ink';
  if (kind === 'black') { b.fills = [S.paint('hero-bg')]; fg = 'on-hero'; }
  else if (kind === 'lime') { b.fills = [S.paint('lime')]; b.strokes = [S.paint('ink')]; b.strokeWeight = 1.5; b.strokeAlign = 'INSIDE'; fg = 'on-lime'; }
  else if (kind === 'limeOnDark') { b.fills = [S.paint('lime')]; fg = 'on-lime'; }
  else if (kind === 'outline') { b.strokes = [S.paint(o.on ? 'on-hero' : 'ink')]; b.strokeWeight = 1.5; b.strokeAlign = 'INSIDE'; fg = o.on ? 'on-hero' : 'ink'; }
  else if (kind === 'dashed') { b.strokes = [S.paint('ink-secondary')]; b.strokeWeight = 1.5; b.dashPattern = [6, 4]; b.strokeAlign = 'INSIDE'; fg = 'ink-secondary'; }
  else if (kind === 'surface') { b.fills = [S.paint('surface')]; fg = 'ink'; }
  await A.t(b, label, o.style || 'ML/Body Semibold', fg); return b; };
A.sep = (parent) => { const r = figma.createRectangle(); r.name = 'Divider'; r.resize(353, 1); r.fills = [S.paint('border')]; if (parent) { parent.appendChild(r); if (parent.layoutMode) r.layoutSizingHorizontal = 'FILL'; } return r; };
A.label = async (parent, chars) => { const t = await A.t(parent, chars, 'ML/Secondary', 'ink-secondary', { name: 'Section · ' + chars }); return t; };
// List row: divider on top, title 17 + optional sub 15, optional right node (built by fn(row)) or chevron.
A.row = async (parent, title, sub, right, o) => { o = o || {}; const r = S.frame(parent, 'Row / ' + title, { dir: 'H', gap: 12 }); r.layoutSizingHorizontal = 'FILL'; r.counterAxisAlignItems = 'CENTER'; r.paddingTop = r.paddingBottom = o.py || 12; r.minHeight = 56;
  if (o.divider !== false) { r.strokes = [S.paint('border')]; r.strokeTopWeight = 1; r.strokeBottomWeight = 0; r.strokeLeftWeight = 0; r.strokeRightWeight = 0; r.strokeAlign = 'INSIDE'; }
  if (o.icon) o.icon(r);
  const tx = S.frame(r, 'Text', { gap: 2 }); tx.layoutGrow = 1; const t1 = await A.t(tx, title, o.titleStyle || 'ML/Body', o.titleColour || 'ink', { fill: true });
  if (sub) await A.t(tx, sub, 'ML/Secondary', 'ink-secondary', { fill: true });
  if (right) await right(r); else if (right === undefined && o.chevron !== false) S.icon(r, 'chevron.right', 18, 'ink-secondary');
  return r; };
A.card = (parent, name, o) => { o = o || {}; const c = S.frame(parent, name, { gap: o.gap === undefined ? 12 : o.gap, fill: o.fill || 'surface', radius: o.radius || 24, dir: o.dir }); c.paddingLeft = c.paddingRight = c.paddingTop = c.paddingBottom = o.pad === undefined ? 20 : o.pad; if (parent && parent.layoutMode) c.layoutSizingHorizontal = 'FILL'; if (o.stroke) { c.strokes = [S.paint(o.stroke)]; c.strokeWeight = o.sw || 1.5; c.strokeAlign = 'INSIDE'; if (o.dash) c.dashPattern = [6, 4]; } return c; };
A.hero = (parent, name, o) => A.card(parent, name, Object.assign({ fill: 'hero-bg', radius: 28, gap: 10 }, o || {}));
A.comp = async (key, vp) => { const id = A.CID[key]; const n = await figma.getNodeByIdAsync(id); if (n.type !== 'COMPONENT_SET') return n; return n.children.find(c => Object.entries(vp || {}).every(([k, v]) => c.variantProperties[k] === v)) || n.defaultVariant; };
A.use = async (parent, key, vp, texts) => { const c = await A.comp(key, vp); const i = c.createInstance(); if (parent) parent.appendChild(i); if (texts) { const set = {}; for (const [k, v] of Object.entries(texts)) { const kk = Object.keys(i.componentProperties).find(x => x.split('#')[0] === k); if (kk) set[kk] = v; } if (Object.keys(set).length) i.setProperties(set); } return i; };
// Admin screen: S.screen with the student tab bar swapped to AdminTabBar (Selected = o.tab).
A.screen = async (pg, name, x, y, o) => { o = o || {}; const r = await S.screen(pg, name, x, y, { title: o.title, subtitle: o.subtitle, back: o.back, time: o.time || '11:10', noTab: o.noTab, noNav: o.noNav, inline: o.inline });
  const tb = r.f.findOne(n => n.name === 'Tab Bar'); if (tb && !o.noTab) { const v = await A.comp('tab', { Selected: o.tab || 'Today' }); tb.swapComponent(v); tb.name = 'Tab Bar'; }
  r.c.itemSpacing = o.gap === undefined ? 16 : o.gap;
  if (o.notes !== false) await S.notes(r.f, name, o.moment || ('Wed 14 Aug 2024, ' + (o.time || '11:10')));
  return r; };
// Sheet over a frame: scrim + GlassSheet (grab handle and Close come with the component) + content stack.
A.sheet = async (f, title, detent) => { const r = await S.sheet(f, title, detent || 'Medium'); r.c.itemSpacing = 16; return r; };
A.fade = (f) => { const tb = f.findOne(n => n.name === 'Tab Bar'); const fd = f.findOne(n => n.name === 'Scroll edge fade'); const c = f.findOne(n => n.name === 'Content'); if (!c) return; const cb = c.y + c.height - (c.paddingBottom || 0); if (fd && tb) fd.visible = cb > tb.y - 19.5; };
return A;
