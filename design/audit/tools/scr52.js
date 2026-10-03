// Run 2 Stage 3a: gap 52 scroll treatment (stored as mealloop/scr52). Body of async function(figma, args) -> report.
// args.frameIds: page-07 inline-title frames that overflow without scrolling. Applies the R9 + R9c inline pattern exactly
// as on Meals · Meal detail (221:62964): the MealWash layer becomes the fixed frame-fill wash (canvas + wash/top -> wash/clear
// at 300 pt, both bound), HeaderBackdrop and ScrollEdgeFade Style=Status ("Top edge fade") are cloned in above the content,
// the content's bottom padding gives R9b clearance (20 pt above the tab bar, or above a sticky footer when there is one),
// overflowDirection = VERTICAL and every layer except the content is fixed. Links are untouched.
const src = await figma.getNodeByIdAsync('221:62964');
const sb = src.children.find(c => c.name === 'Header backdrop'), sf = src.children.find(c => c.name === 'Top edge fade');
const rep = [];
for (const id of args.frameIds) {
  const f = await figma.getNodeByIdAsync(id); const r = { id, name: f.name };
  const content = f.children.find(c => /Content$/.test(c.name));
  const wash = f.children.find(c => c.name === 'Meal wash');
  if (wash) { f.fills = src.fills; wash.remove(); r.wash = 'frame fill'; }
  if (!f.children.find(c => c.name === 'Header backdrop')) {
    const i = f.children.indexOf(content);
    const b = sb.clone(); f.insertChild(i + 1, b); b.x = sb.x; b.y = sb.y;
    const t = sf.clone(); f.insertChild(i + 2, t); t.relativeTransform = sf.relativeTransform;
  }
  const tab = f.children.find(c => c.visible && c.name === 'Tab Bar'), foot = f.children.find(c => c.visible && c.name === 'Footer');
  const limit = Math.min(tab ? tab.y - 20 : 9999, foot ? foot.y - 20 : 9999, f.height - 34 - 20);
  content.paddingBottom = f.height - limit;
  // content must sit below every other child except nothing: move it to index 0
  f.insertChild(0, content);
  f.overflowDirection = 'VERTICAL'; f.clipsContent = true;
  f.numberOfFixedChildren = f.children.length - 1;
  const vis = content.children.filter(c => c.visible); const last = vis[vis.length - 1];
  const range = Math.max(0, content.y + content.height - f.height);
  r.pb = content.paddingBottom; r.range = Math.round(range); r.lastAtMax = Math.round(content.y + last.y + last.height - range); r.limit = limit; r.fixed = f.numberOfFixedChildren;
  r.order = f.children.map(c => c.name).join(' / ');
  rep.push(r);
}
return rep;
