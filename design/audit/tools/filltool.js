// MealLoop fill-floor tool (body of an async function(figma, args)); stored as mealloop/filltool.
// args.frameIds: page-10 frames to measure at rest (scroll 0).
// Fill % = bottom edge of the lowest visible item in 'Admin / Content' at rest, clipped to the
//   tab-bar top (y 748), divided by 748. The floor is 75% (bottom at y >= 561). A frame whose
//   content runs past 748 (it scrolls) reads 100%.
// Empty check: an EmptyState item's vertical centre vs the midpoint of the free band, which runs
//   from the bottom of whatever sits above it in the content column (header controls, banner)
//   or the content top, down to 748. 'centred' when the offset is within 8 pt.
const page = await figma.getNodeByIdAsync('811:21055');
await figma.setCurrentPageAsync(page);
const TAB = 748, FLOOR = 0.75;
const out = [];
for (const id of args.frameIds) {
  const f = await figma.getNodeByIdAsync(id);
  const content = f.children.find(c => c.name === 'Admin / Content');
  if (!content) { out.push({ id, name: f.name, err: 'no content' }); continue; }
  const items = content.children.filter(c => c.visible);
  let bottom = 0, lowest = '';
  for (const c of items) { const b = content.y + c.y + c.height; if (b > bottom) { bottom = b; lowest = c.name; } }
  const fill = Math.min(bottom, TAB) / TAB;
  const row = { id, name: f.name, bottom: Math.round(bottom), lowest, fill: Math.round(fill * 100), meets: fill >= FLOOR };
  const empty = items.find(c => c.type === 'INSTANCE' && c.mainComponent && /EmptyState/.test(c.mainComponent.parent && c.mainComponent.parent.type === 'COMPONENT_SET' ? c.mainComponent.parent.name : c.mainComponent.name));
  if (empty) {
    const idx = items.indexOf(empty);
    const above = idx > 0 ? content.y + items[idx - 1].y + items[idx - 1].height : content.y;
    const mid = (above + TAB) / 2, centre = content.y + empty.y + empty.height / 2;
    row.empty = { bandTop: Math.round(above), centre: Math.round(centre), bandMid: Math.round(mid), offset: Math.round(centre - mid), centred: Math.abs(centre - mid) <= 8 };
  }
  out.push(row);
}
return out;
