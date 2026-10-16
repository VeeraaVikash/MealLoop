// GUARDIAN-VIDEO helpers (stored as mealloop/gvh). Body of async function(figma, args) -> G (extends adm A).
// G.gv(parent, key, variant) instance of a gv_ids component; G.gScreen guardian page (backdrop, logo row + language pill);
// G.wScreen warden page (WB header, WardenTabBar4); G.darken dark page; G.title / G.sub / G.link / G.links / G.note;
// G.timer(frame, destId, s); G.fixChrome(frame).
// Note: G.link builds an underlined text link (it shadows S.link); wire with setReactionsAsync + G.nav instead.
const AF = Object.getPrototypeOf(async function(){}).constructor;
const G = await new AF('figma', 'args', figma.root.getSharedPluginData('mealloop', 'adm'))(figma, {});
G.GV = JSON.parse(figma.root.getSharedPluginData('mealloop', 'gv_ids') || '{}');
G.gv = async (parent, key, variant) => { const s = await figma.getNodeByIdAsync(G.GV[key]); const c = s.type === 'COMPONENT_SET' ? (variant ? s.children.find(x => x.name === variant) : s.defaultVariant) : s; const i = c.createInstance(); if (parent) parent.appendChild(i); return i; };
G.txt = async (root, nodeName, chars) => { const t = root.findOne(n => n.type === 'TEXT' && n.name === nodeName); if (t) await G.setText(t, chars); return t; };
G.fixChrome = (f) => { const names = ['Status Bar', 'Nav Header', 'Scroll edge fade', 'Tab Bar', 'Home Indicator']; const ch = f.children.filter(n => names.includes(n.name)); for (const n of ch) f.appendChild(n); f.numberOfFixedChildren = ch.length; };
G.darken = (f) => { const b = f.findOne(n => n.name === 'OrbitBackdrop'); if (b) b.remove(); f.fills = [G.paint('hero-bg')];
  for (const nm of ['Status Bar', 'Home Indicator']) { const s = f.findOne(n => n.name === nm); if (s) for (const n of s.findAll(n => n.type !== 'FRAME' && n.type !== 'INSTANCE' && 'fills' in n && n.fills.length)) n.fills = [G.paint('on-hero')]; }
  const lr = f.findOne(n => n.name === 'Logo row'); if (lr) lr.remove(); const fd = f.findOne(n => n.name === 'Scroll edge fade'); if (fd) fd.remove(); f.numberOfFixedChildren = f.children.filter(n => ['Status Bar', 'Home Indicator'].includes(n.name)).length; };
G.gScreen = async (pg, name, x, y, o) => { o = o || {}; const r = await G.screen(pg, name, x, y, { noTab: true, noNav: true, time: o.time || '7:41', moment: o.moment, gap: o.gap === undefined ? 16 : o.gap, notes: o.notes });
  const src = await figma.getNodeByIdAsync('1928:6'); const lr = src.findOne(n => n.name === 'Logo row').clone(); r.c.insertChild(0, lr); lr.layoutSizingHorizontal = 'FILL';
  if (o.dark) G.darken(r.f); return r; };
G.wScreen = async (pg, name, x, y, o) => { o = o || {}; const r = await G.screen(pg, name, x, y, { noTab: true, noNav: true, time: o.time || '10:00', moment: o.moment, gap: o.gap === undefined ? 16 : o.gap });
  const src = await figma.getNodeByIdAsync('1853:125831'); const hd = src.findOne(n => n.name === 'Header').clone(); r.c.insertChild(0, hd); hd.layoutSizingHorizontal = 'FILL'; hd.paddingLeft = hd.paddingRight = 0; hd.paddingTop = hd.paddingBottom = 0;
  await G.setText(hd.findOne(n => n.name === 'Title'), o.title || ''); const st = hd.findOne(n => n.name === 'Subtitle'); if (o.subtitle) await G.setText(st, o.subtitle); else st.remove();
  if (o.tab) { const tb = await G.gv(r.f, 'wardenTab', 'Selected=' + o.tab); tb.name = 'Tab Bar'; tb.x = 20; tb.y = 746; G.fixChrome(r.f); }
  return r; };
G.title = async (c, s) => G.t(c, s, 'ML/Large Title', 'ink', { fill: true, name: 'Title' });
G.sub = async (c, s) => G.t(c, s, 'ML/Secondary', 'ink-secondary', { fill: true, name: 'Subtitle' });
G.link = async (parent, label, o) => { o = o || {}; const l = G.frame(parent, 'Link / ' + label, { dir: 'H' }); l.counterAxisAlignItems = 'CENTER'; l.primaryAxisAlignItems = 'CENTER'; l.resize(10, 44); l.counterAxisSizingMode = 'FIXED'; l.primaryAxisSizingMode = 'AUTO'; const t = await G.t(l, label, o.style || 'ML/Secondary Medium', o.colour || 'ink'); t.textDecoration = 'UNDERLINE'; return l; };
G.links = async (c, labels) => { const r = G.frame(c, 'Links', { dir: 'H', gap: 32 }); r.layoutSizingHorizontal = 'FILL'; r.primaryAxisAlignItems = 'CENTER'; const out = []; for (const l of labels) out.push(await G.link(r, l)); return out; };
G.note = async (c, s, o) => { o = o || {}; const t = await G.t(c, s, o.style || 'ML/Secondary', o.colour || 'ink-secondary', { fill: true, name: o.name || 'Note' }); t.textAlignHorizontal = o.align || 'CENTER'; return t; };
G.timer = async (f, id, s) => { const rs = (f.reactions || []).filter(r => r.trigger.type !== 'AFTER_TIMEOUT'); rs.push({ trigger: { type: 'AFTER_TIMEOUT', timeout: s || 1.2 }, actions: [G.nav(id)] }); await f.setReactionsAsync(rs); };
return G;
