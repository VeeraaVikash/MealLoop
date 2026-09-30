// Sheet-frame skeleton on the H14 pattern (stored as mealloop/sheethelp). Body of async function(figma, H, args):
//   args { bgId, x, y, name, title } -> clone of the background screen (links stripped, overflow NONE),
//   Scrim (scrim token), "Dismiss · tap outside" (BACK), GlassSheet Detent=Medium at y 432 with Close (BACK),
//   an empty "Sheet Content" auto-layout frame at (20, 496), Home Indicator on top. D1: removes any flow start on the clone.
const { bgId, x, y, name, title } = args;
const bg = await figma.getNodeByIdAsync(bgId);
await H.loadAll(bg);
const f = bg.clone();
figma.currentPage.appendChild(f); f.x = x; f.y = y; f.name = name;
await H.strip(f);
f.overflowDirection = 'NONE';
const home = f.children.find(c => c.name === 'Home Indicator');
const scrimVar = await figma.variables.getVariableByIdAsync('VariableID:73:12');
const scrim = figma.createRectangle(); scrim.name = 'Scrim'; scrim.resize(393, 852);
scrim.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 1 }, 'color', scrimVar)];
f.appendChild(scrim); scrim.x = 0; scrim.y = 0;
const dismiss = figma.createFrame(); dismiss.name = 'Dismiss · tap outside'; dismiss.resize(393, 852); dismiss.fills = [];
f.appendChild(dismiss); dismiss.x = 0; dismiss.y = 0;
await dismiss.setReactionsAsync([{ trigger: { type: 'ON_CLICK' }, actions: [{ type: 'BACK' }] }]);
const gsSet = await figma.getNodeByIdAsync('74:275');
const gs = gsSet.children.find(c => c.name === 'Detent=Medium').createInstance();
await H.loadAll(gs);
f.appendChild(gs); gs.x = 0; gs.y = 432; gs.name = 'Sheet';
H.set(gs, { Title: title, 'Show Close': true });
const close = gs.findOne(n => n.name === 'Close');
await close.setReactionsAsync([{ trigger: { type: 'ON_CLICK' }, actions: [{ type: 'BACK' }] }]);
const sc = figma.createAutoLayout('VERTICAL', { name: 'Sheet Content', itemSpacing: 12 }); sc.fills = [];
f.appendChild(sc); sc.x = 20; sc.y = 496; sc.resize(353, 10); sc.primaryAxisSizingMode = 'AUTO'; sc.counterAxisSizingMode = 'FIXED';
if (home) f.appendChild(home);
f.numberOfFixedChildren = 0;
const fl = figma.currentPage.flowStartingPoints.filter(p => p.nodeId !== f.id);
if (fl.length !== figma.currentPage.flowStartingPoints.length) figma.currentPage.flowStartingPoints = fl;
return { frame: f, content: sc, close, dismiss };
