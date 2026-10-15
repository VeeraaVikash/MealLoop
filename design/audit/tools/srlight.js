// Student-redesign light restyle (stored as mealloop/srlight). Body of async function(figma, args).
// args {ids:[...]} or {pageId, re:'regex on frame name'}: puts OrbitBackdrop (Full) at the bottom of each frame, replacing an old
// "Meal wash" / wash / HeaderBackdrop layer if present, and sets the frame fill to the canvas token. Layout and links are untouched.
const AF = Object.getPrototypeOf(async function(){}).constructor;
const S = await new AF('figma', 'args', figma.root.getSharedPluginData('mealloop', 'srh'))(figma, {});
let ids = args.ids || [];
if (args.pageId) { const pg = await figma.getNodeByIdAsync(args.pageId); const re = new RegExp(args.re); ids = pg.children.filter(n => n.type === 'FRAME' && n.width === 393 && re.test(n.name)).map(n => n.id); }
const out = [];
for (const id of ids) { const f = await figma.getNodeByIdAsync(id); if (!f) continue;
  if (f.findOne(n => n.name === 'OrbitBackdrop' && n.parent === f)) { out.push(f.name + ' (had)'); continue; }
  const old = f.children.find(n => /wash|HeaderBackdrop|Header backdrop/i.test(n.name) && n.width >= 390); const idx = old ? f.children.indexOf(old) : 0;
  const b = await S.v(S.ID.backdrop, { Style: args.style || 'Full' }); f.insertChild(idx, b); b.name = 'OrbitBackdrop';
  if (f.layoutMode && f.layoutMode !== 'NONE') b.layoutPositioning = 'ABSOLUTE'; b.x = 0; b.y = 0;
  const on = old ? old.name : ''; if (old) old.remove(); f.fills = [S.paint('canvas')]; out.push(f.name + (on ? ' (replaced ' + on + ')' : ''));
}
return out;
