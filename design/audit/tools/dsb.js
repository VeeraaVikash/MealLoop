// DOOR-SCANNER page builders (stored as mealloop/dsb). Body of async function(figma, args) -> D (extends dsh).
// D.F / D.save(): frame IDs in plugin data mealloop/ds_frames. D.section(name, y, w) section on page 09.
// D.titles, D.mealChip (lime chip with ink dot), D.reportRow, D.valueRow, D.home(section, name, x, {state:'Before'|'During'|'After', card, sos, offline, ...}).
const D = await new (Object.getPrototypeOf(async function(){}).constructor)('figma','args',figma.root.getSharedPluginData('mealloop','dsh'))(figma,{});
D.F = JSON.parse(figma.root.getSharedPluginData('mealloop','ds_frames') || '{}');
D.save = () => figma.root.setSharedPluginData('mealloop','ds_frames', JSON.stringify(D.F));
D.section = async (name, y, w) => { const pg = await figma.getNodeByIdAsync('732:2'); await pg.loadAsync(); let s = pg.children.find(n => n.type === 'SECTION' && n.name === name); if (!s) { s = figma.createSection(); s.name = name; pg.appendChild(s); s.x = 0; s.y = y; s.resizeWithoutConstraints(w || 5000, 1260); } return s; };
D.titles = async (c, title, sub) => { const g = D.frame(c, 'Title group', { gap: 4 }); g.layoutSizingHorizontal = 'FILL'; const t = await D.t(g, title, 'ML/Large Title', 'ink', { fill: true, name: 'Title' }); if (sub) await D.t(g, sub, 'ML/Secondary', 'ink-secondary', { fill: true, name: 'Subtitle' }); return g; };
D.mealChip = async (c, label) => { const ch = await D.chip(c, label, 'lime', { px: 14, py: 7 }); const d = figma.createEllipse(); d.name = 'Dot'; d.resize(8, 8); d.fills = [D.paint('ink')]; ch.insertChild(0, d); ch.itemSpacing = 8; return ch; };
D.reportRow = async (c) => { /* surface card: 44 circle with warning icon, "Report a problem", chevron */ };
D.valueRow = async (c, title, value) => { /* A.row with a mono value and a chevron */ };
D.home = async (sec, name, x, o) => { /* Home in three meal states; see the full body in shared plugin data mealloop/dsb */ };
return D;
(Abbreviated: the full code is kept in shared plugin data mealloop/dsb; dsh.js holds the drawing helpers.)
