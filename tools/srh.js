// Student-redesign helpers (stored as mealloop/srh). Body of async function(figma, args) -> S.
// Extends oust (base, notes, card, listRow, sheet) and ouh (icon, pill, btn, t, row, fill, dash, paint, paintA).
// S.ID: component sets added in run STUDENT-REDESIGN. S.v(id, {Prop:'Value'}, {Text:'…'}) -> instance.
// S.screen(pg, name, x, y, {title, subtitle, back, tab, noTab, noNav, inline, backdrop:'Full'|'Quiet'|'None'}) -> {f, c}
//   frame 393×852 (overflow vertical), OrbitBackdrop at index 0, content stack "Content" (pad 20, gap 16), chrome fixed on top.
// S.setText(node, chars) loads fonts first. S.dish(name) -> {pic, diet} by the keyword rule.
const AF = Object.getPrototypeOf(async function(){}).constructor;
const S = await new AF('figma', 'args', figma.root.getSharedPluginData('mealloop', 'oust'))(figma, {});
S.ID = { backdrop: '2129:2343', diet: '2129:2198', orbit: '2129:2211', appicon: '2129:2240', pic: '2129:2299', glyph: '2129:2324', chip: '2132:2197', tile: '2132:2406', seg: '2133:2323', ticket: '2133:2374', crowd: '2133:2427', hero: '2135:2336', answer: '2135:2382', face: '2136:2321', problem: '2136:2360', sev: '2136:2382', proof: '2137:2399', checks: '2137:2448', clock: '1902:2358', rule: '1902:2194', date: '78:1710', tab: '74:236', nav: '74:136', sheet: '74:275', button: '74:81', status: '808:86801', toast: '75:225', offline: '75:187', empty: '75:270', notif: '75:408', listrow: '764:84422' };
S.v = async (id, vp, props, parent) => { const i = await S.inst(parent || null, id, vp || {}, props || null); return i; };
S.setText = async (t, chars) => { if (t.fontName === figma.mixed) { for (const f of t.getRangeAllFontNames(0, t.characters.length)) await figma.loadFontAsync(f); } else await figma.loadFontAsync(t.fontName); t.characters = chars; return t; };
S.screen = async (pg, name, x, y, o = {}) => {
  const { f, c } = await S.base(name, x, y, o.title || '', { parent: pg, noTab: o.noTab, noBack: !o.back });
  const wash = f.findOne(n => n.name === 'Meal wash'); if (wash) wash.remove();
  if (o.backdrop !== 'None') { const b = await S.v(S.ID.backdrop, { Style: o.backdrop || 'Full' }); f.insertChild(0, b); b.x = 0; b.y = 0; b.name = 'OrbitBackdrop'; }
  f.fills = [S.paint('canvas')];
  const nav = f.findOne(n => n.name === 'Nav Header');
  c.name = 'Content';
  if (o.noNav) { nav.remove(); c.y = 54; c.resize(393, 852 - 54); c.paddingTop = 8; }
  else { const set = {}; for (const k of Object.keys(nav.componentProperties)) { if (k.startsWith('Subtitle')) set[k] = o.subtitle || ''; if (k.startsWith('Show Subtitle')) set[k] = !!o.subtitle; } set.Type = o.inline ? 'Inline Title' : 'Large Title'; nav.setProperties(set); nav.fills = [];
    const ny = 54 + nav.height; c.y = ny; c.resize(393, 852 - ny); }
  if (!o.noTab) { const tb = f.findOne(n => n.name === 'Tab Bar'); if (tb) tb.setProperties({ Selected: o.tab || 'Home' }); }
  const kids = f.children.length; const chrome = f.children.filter(n => ['Status Bar', 'Nav Header', 'Scroll edge fade', 'Tab Bar', 'Home Indicator'].includes(n.name));
  for (const n of chrome) f.appendChild(n); f.numberOfFixedChildren = chrome.length;
  return { f, c };
};
S.KEY = [[/dosa|idli|idly|chap+at+h?i|paratha|poori|bhature|bhatura|idiyappam|bread/i, 'Bread'], [/rice|pulao|briyani|biryani/i, 'Rice'], [/pan+eer/i, 'Paneer'], [/curd|raita|butter ?milk|ice cream/i, 'Curd']];
S.pic = n => { for (const [re, t] of S.KEY) if (re.test(n)) return t; return 'Curry'; };
S.tile = async (parent, dish, size, fill, nv) => { const t = await S.v(S.ID.tile, { Size: size, Fill: fill || 'Default', Diet: nv ? 'Non-veg' : 'Veg' }, { Dish: dish }, parent);
  const p = t.findOne(n => n.name === 'DishPictogram'); p.setProperties({ Type: S.pic(dish), Tone: fill === 'Highlight' ? 'Light' : 'Ink' }); t.name = 'DishTile / ' + dish; return t; };
return S;
