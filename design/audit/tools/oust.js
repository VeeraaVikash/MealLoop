// Outings student frame helpers (stored as mealloop/oust). Body of async function(figma, args) -> S (ouh helpers plus):
// S.base(name, x, y, title, o) clones 04 "Help" (94:11356): wash, status bar, inline NavHeader with the BackButton, fade, TabBar (You), home indicator;
//   removes its content and adds "Outings / Content" (V, gap 16, pad 20) as a scroll container from y 110 to the frame bottom
//   (bottom pad 124 = tab bar + 20 pt clearance). o.noTab removes the tab bar; o.noBack hides the Back.
// S.notes(frame, label, moment) adds the grid label (-36), Moment note (+868) and Sample note (+940), cloned from page 09.
// S.card(parent, name, o) white card (surface, border, radius 20, pad 16).  S.listRow(parent, name, reason, pill, state, qty).
// S.sheet(frame, title, detent) adds Scrim + GlassSheet + "Sheet Content" like 04 "Intent · Reason failed".
const AF = Object.getPrototypeOf(async function(){}).constructor;
const S = await new AF('figma', 'args', figma.root.getSharedPluginData('mealloop', 'ouh'))(figma, {});
const help = await figma.getNodeByIdAsync('94:11356');
const mom = await figma.getNodeByIdAsync('1508:101'), smp = await figma.getNodeByIdAsync('1508:107'), lab = await figma.getNodeByIdAsync('1508:100');
S.base = async (name, x, y, title, o = {}) => { const f = help.clone(); f.name = name; f.x = x; f.y = y; if (o.parent) o.parent.appendChild(f);
  f.findOne(n => n.name === 'O8 / Content').remove();
  const nav = f.findOne(n => n.name === 'Nav Header'); const set = {}; for (const k of Object.keys(nav.componentProperties)) { if (k.startsWith('Title')) set[k] = title; if (k.startsWith('Show Back') && o.noBack) set[k] = false; } nav.setProperties(set);
  if (o.noTab) { const tb = f.findOne(n => n.name === 'Tab Bar'); if (tb) tb.remove(); }
  const c = S.frame(null, 'Outings / Content', { gap: 16 }); f.insertChild(1, c); c.paddingLeft = c.paddingRight = 20; c.paddingTop = 8; c.paddingBottom = o.noTab ? 54 : 124;
  c.counterAxisSizingMode = 'FIXED'; c.primaryAxisSizingMode = 'FIXED'; c.resize(393, 852 - 110); c.x = 0; c.y = 110; c.clipsContent = true; c.overflowDirection = 'VERTICAL';
  return { f, c }; };
S.notes = async (f, label, moment) => { const p = f.parent; const l = lab.clone(); p.appendChild(l); await figma.loadFontAsync(l.fontName); l.characters = label; l.name = 'Label / ' + label; l.x = f.x; l.y = f.y - 36;
  const m = mom.clone(); p.appendChild(m); m.name = 'Moment / Moment: ' + moment; const mt = m.findAll(n => n.type === 'TEXT'); await figma.loadFontAsync(mt[1].fontName); mt[1].characters = 'Moment: ' + moment; m.x = f.x; m.y = f.y + 868;
  const s = smp.clone(); p.appendChild(s); s.x = f.x; s.y = f.y + 940; return [l, m, s]; };
S.card = (parent, name, o = {}) => { const c = S.frame(parent, name, { gap: o.gap === undefined ? 8 : o.gap, fill: o.fill || 'surface', radius: o.radius || 20, stroke: o.stroke === undefined ? 'border' : o.stroke, dir: o.dir }); c.paddingLeft = c.paddingRight = c.paddingTop = c.paddingBottom = o.pad === undefined ? 16 : o.pad; if (parent && parent.layoutMode) c.layoutSizingHorizontal = 'FILL'; return c; };
S.listRow = async (parent, name, reason, pill, state, qty) => { const r = await S.inst(parent, '764:84422', { Layout: 'Stacked', Divider: 'Off' }, { Name: name, Reason: reason, Quantity: qty || '', 'Show status': !!pill, 'Show chevron': true, 'Show reason': true });
  if (pill) { const st = r.findOne(n => n.name === 'Status'); st.setProperties({ State: state }); const lt = st.findOne(n => n.type === 'TEXT'); await figma.loadFontAsync(lt.fontName); lt.characters = pill; }
  if (parent && parent.layoutMode) r.layoutSizingHorizontal = 'FILL'; r.name = 'Row / ' + name; return r; };
S.sheet = async (f, title, detent) => { const sc = figma.createRectangle(); sc.name = 'Scrim'; sc.resize(393, 852); sc.fills = [S.paint('scrim')]; f.appendChild(sc);
  const sh = await S.inst(f, '74:275', { Detent: detent || 'Medium' }, { Title: title, 'Show Close': true }); sh.name = 'Sheet'; sh.x = 0; sh.y = 852 - sh.height;
  const sc2 = S.frame(f, 'Sheet Content', { gap: 14 }); sc2.paddingLeft = sc2.paddingRight = 20; sc2.counterAxisSizingMode = 'FIXED'; sc2.resize(393, 10); sc2.x = 0; sc2.y = sh.y + 72;
  const hi = f.findOne(n => n.name === 'Home Indicator'); if (hi) f.appendChild(hi); return { sc, sh, c: sc2 }; };
return S;
