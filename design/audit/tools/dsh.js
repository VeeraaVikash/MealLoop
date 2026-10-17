// DOOR-SCANNER helpers (stored as mealloop/dsh). Body of async function(figma, args) -> D (extends adm A).
// D.ico(parent, kind, size, colour, sw) drawn icons (keyboard, torch, backspace, personcheck, qr, qrslash, shieldcheck, pot, camslash, check)
//   or a Symbols icon for any other name. D.brackets(parent, w, h, colour, sw) lime camera corners (one vector).
// D.ds(parent, key, variant, texts) instance of a ds_ids component. D.logoRow(parent) wordmark + SK avatar (cloned from the warden header).
// D.boxes(parent, items, o) 4 code boxes ('•' dot, digit, '' empty). D.screen(pg, name, x, y, o) Door Scanner page (A.screen, optional StaffTabBar3).
// D.hot(f, name, x, y, w, h, destId) invisible hotspot (fixed, topmost). D.go(node, destId) / D.goBack(node) / D.after(f, destId, s).
// D.sim(f, text) "Simulated" note under the frame's Sample note. D.toast(f, msg, y) Toast instance.
const AF = Object.getPrototypeOf(async function(){}).constructor;
const D = await new AF('figma', 'args', figma.root.getSharedPluginData('mealloop', 'adm'))(figma, {});
const baseA = D.screen;
D.DS = JSON.parse(figma.root.getSharedPluginData('mealloop', 'ds_ids') || '{}');
const sc = (d, k) => d.replace(/-?\d*\.?\d+/g, m => String(Math.round(parseFloat(m) * k * 100) / 100));
D.vec = (parent, name, data, size, colour, sw, fill) => { const v = figma.createVector(); v.name = name; if (parent) parent.appendChild(v); v.x = 0; v.y = 0;
  v.vectorPaths = [{ windingRule: 'NONZERO', data: sc(data, size / 24) }];
  if (fill) { v.fills = [D.paint(colour)]; v.strokes = []; } else { v.fills = []; v.strokes = [D.paint(colour)]; v.strokeWeight = sw; v.strokeCap = 'ROUND'; v.strokeJoin = 'ROUND'; }
  const nums = sc(data, size / 24).match(/-?\d*\.?\d+/g).map(Number); let mx = 1e9, my = 1e9; for (let i = 0; i < nums.length; i += 2) { mx = Math.min(mx, nums[i]); my = Math.min(my, nums[i + 1]); } v.x = mx; v.y = my; return v; };
const prim = (f, kind, x, y, w, h, r, colour, sw, k, fill) => { const n = kind === 'e' ? figma.createEllipse() : figma.createRectangle(); f.appendChild(n); n.x = x * k; n.y = y * k; n.resize(Math.max(0.5, w * k), Math.max(0.5, h * k)); if (kind !== 'e') n.cornerRadius = r * k;
  if (fill) { n.fills = [D.paint(colour)]; } else { n.fills = []; n.strokes = [D.paint(colour)]; n.strokeWeight = sw; n.strokeAlign = 'CENTER'; } return n; };
D.ico = (parent, kind, size, colour, sw) => { colour = colour || 'ink'; const k = size / 24; const w = (sw || 1.75) * k;
  const drawn = ['keyboard', 'torch', 'backspace', 'personcheck', 'qr', 'qrslash', 'shieldcheck', 'pot', 'camslash', 'check'];
  if (!drawn.includes(kind)) return D.icon(parent, kind, size, colour);
  const f = figma.createFrame(); f.name = 'Icon / ' + kind; f.resize(size, size); f.fills = []; f.clipsContent = false; if (parent) parent.appendChild(f);
  const V = (d, fill) => D.vec(f, 'Path', d, size, colour, w, fill);
  if (kind === 'keyboard') { prim(f, 'r', 2, 5, 20, 14, 3.2, colour, w, k); for (const x of [5.6, 11.1, 16.6]) prim(f, 'e', x, 9, 1.8, 1.8, 0, colour, w, k, true); prim(f, 'r', 8, 13.6, 8, 1.7, 0.85, colour, w, k, true); }
  if (kind === 'torch') V('M6 3 L18 3 L18 7 L14.5 11.5 L14.5 21 L9.5 21 L9.5 11.5 L6 7 Z M6 7 L18 7');
  if (kind === 'backspace') V('M9 5 L21 5 L21 19 L9 19 L3 12 Z M12.5 9 L17.5 15 M17.5 9 L12.5 15');
  if (kind === 'personcheck') { prim(f, 'e', 6, 3, 8, 8, 0, colour, w, k); V('M3 21 C3 16.5 6 14 10 14 C11.6 14 13 14.4 14 15.1 M14.5 18.5 L17 21 L22 15.5'); }
  if (kind === 'qr' || kind === 'qrslash') { for (const [x, y] of [[3, 3], [14, 3], [3, 14]]) prim(f, 'r', x, y, 7, 7, 0.6, colour, w, k); prim(f, 'r', 14.5, 14.5, 2.6, 2.6, 0, colour, w, k, true); prim(f, 'r', 18.4, 18.4, 2.6, 2.6, 0, colour, w, k, true); if (kind === 'qrslash') V('M3 21 L21 3'); }
  if (kind === 'shieldcheck') V('M12 2.5 L19.5 5.5 L19.5 11 C19.5 15.8 16.4 19.3 12 21.5 C7.6 19.3 4.5 15.8 4.5 11 L4.5 5.5 Z M8.5 12 L11 14.5 L15.5 9.5');
  if (kind === 'pot') V('M4 10 L20 10 L20 18 C20 19.7 18.7 21 17 21 L7 21 C5.3 21 4 19.7 4 18 Z M8 3.5 L8 6.5 M12 3.5 L12 6.5 M16 3.5 L16 6.5');
  if (kind === 'camslash') { const c = D.icon(f, 'camera', size, colour); c.x = 0; c.y = 0; V('M3 3 L21 21'); }
  if (kind === 'check') V('M4.5 12.5 L9.8 17.8 L19.5 6.8');
  return f; };
D.brackets = (parent, w, h, colour, sw) => { const a = 46, r = 20, s = sw / 2 + 1, q = 9; const P = (...v) => v.join(' ');
  const d = [P('M', s, a, 'L', s, r + s, 'C', s, s + q, s + q, s, r + s, s, 'L', a, s),
    P('M', w - a, s, 'L', w - r - s, s, 'C', w - s - q, s, w - s, s + q, w - s, r + s, 'L', w - s, a),
    P('M', s, h - a, 'L', s, h - r - s, 'C', s, h - s - q, s + q, h - s, r + s, h - s, 'L', a, h - s),
    P('M', w - s, h - a, 'L', w - s, h - r - s, 'C', w - s, h - s - q, w - s - q, h - s, w - r - s, h - s, 'L', w - a, h - s)].join(' ');
  return D.vec(parent, 'Brackets', d, 24, colour, sw); };
D.ds = async (parent, key, variant, texts) => { const s = await figma.getNodeByIdAsync(D.DS[key]); let c = s; if (s.type === 'COMPONENT_SET') c = variant ? (s.children.find(x => x.name === variant) || s.defaultVariant) : s.defaultVariant;
  const i = c.createInstance(); if (parent) parent.appendChild(i);
  if (texts) for (const [nm, v] of Object.entries(texts)) { const t = i.findOne(n => n.type === 'TEXT' && n.name === nm); if (t) await D.setText(t, v); }
  return i; };
D.logoRow = async (parent) => { const src = await figma.getNodeByIdAsync('1853:125831'); const lr = src.findOne(n => n.name === 'Logo row').clone(); if (parent) parent.appendChild(lr); if (parent && parent.layoutMode) lr.layoutSizingHorizontal = 'FILL';
  const av = lr.findOne(n => n.name.startsWith('Avatar')); av.name = 'Avatar · SK'; const t = av.findOne(n => n.type === 'TEXT'); await D.setText(t, 'SK'); t.name = 'SK'; t.fills = [D.paint('on-hero')]; return lr; };
D.boxes = async (parent, items, o) => { o = o || {}; const r = D.frame(parent, 'Code boxes', { dir: 'H', gap: o.gap || 12 }); r.layoutSizingHorizontal = 'FILL';
  for (let i = 0; i < 4; i++) { const it = items[i] || ''; const b = D.frame(r, 'Box ' + (i + 1), { dir: 'H', radius: 18, fill: o.fill || 'surface' }); b.counterAxisSizingMode = 'FIXED'; b.resize(70, o.h || 72); b.layoutSizingHorizontal = 'FILL'; b.primaryAxisAlignItems = 'CENTER'; b.counterAxisAlignItems = 'CENTER';
    if (o.stroke !== false) { b.strokes = [D.paint(o.error ? 'urgent' : (it ? 'border-control' : 'border'))]; b.strokeWeight = o.error ? 2 : 1.5; b.strokeAlign = 'INSIDE'; }
    if (it === '•') { const d = figma.createEllipse(); d.name = 'Dot'; d.resize(18, 18); d.fills = [D.paint('ink')]; b.appendChild(d); }
    else if (it) await D.t(b, it, 'ML/Metric', 'ink', { name: 'Digit' }); }
  return r; };
D.screen = async (pg, name, x, y, o) => { o = o || {}; const r = await baseA(pg, name, x, y, Object.assign({}, o, { noTab: true, notes: o.notes, time: o.time || '12:55' }));
  r.f.findAll(n => n.name === 'Scroll edge fade').forEach(n => n.remove());
  if (o.tab) { const tb = await D.ds(r.f, 'tab', 'Selected=' + o.tab); tb.name = 'Tab Bar'; tb.x = Math.round((393 - tb.width) / 2); tb.y = 852 - 34 - tb.height; r.c.paddingBottom = 124; }
  const names = ['Status Bar', 'Nav Header', 'Tab Bar', 'Home Indicator']; const ch = r.f.children.filter(n => names.includes(n.name)); for (const n of ch) r.f.appendChild(n); r.f.numberOfFixedChildren = ch.length;
  return r; };
D.hot = async (f, name, x, y, w, h, id) => { const h0 = figma.createFrame(); h0.name = 'Hotspot · ' + name; h0.fills = []; h0.resize(w, h); f.appendChild(h0); h0.x = x; h0.y = y; if (id) await D.go(h0, id); return h0; };
D.go = async (node, id, o) => { const rs = (node.reactions || []).filter(r => r.trigger.type !== 'ON_CLICK'); rs.push({ trigger: { type: 'ON_CLICK' }, actions: [D.nav(id, o)] }); await node.setReactionsAsync(rs); return node; };
D.goBack = async node => { await node.setReactionsAsync([{ trigger: { type: 'ON_CLICK' }, actions: [{ type: 'BACK' }] }]); return node; };
D.after = async (f, id, s) => { const rs = (f.reactions || []).filter(r => r.trigger.type !== 'AFTER_TIMEOUT'); rs.push({ trigger: { type: 'AFTER_TIMEOUT', timeout: s || 1 }, actions: [D.nav(id)] }); await f.setReactionsAsync(rs); };
D.sim = async (f, text) => { const p = f.parent; const t = await D.t(p, 'Simulated: ' + text, 'ML/Footnote', 'ink-secondary', { name: 'Note / Simulated' }); t.textAutoResize = 'HEIGHT'; t.resize(393, t.height); t.x = f.x; t.y = f.y + 1010; return t; };
D.toast = async (f, msg, y) => { const t = await D.inst(f, '75:225', { Type: 'Success' }, { Message: msg }); t.name = 'Toast'; t.x = Math.round((393 - t.width) / 2); t.y = y || 676; return t; };
return D;
