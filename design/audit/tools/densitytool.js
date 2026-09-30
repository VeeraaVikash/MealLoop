// MealLoop density tool (body of an async function(figma, args)); stored as mealloop/densitytool.
// args.frameIds: page-10 frames to measure at rest.
// Text layers: visible, non-empty TEXT nodes (including inside instances) whose clipped bounds intersect
//   y 54–748 and x 0–393; status bar, tab bar and home indicator excluded; in sheet frames only layers above the Scrim count.
// Blocks: direct children of 'Admin / Content' above the fold, excluding eyebrow text, page dots and control rows
//   (Filter chips, Header controls, the meal Segmented control).
const page = await figma.getNodeByIdAsync('811:21055');
await figma.setCurrentPageAsync(page);
const EXCL = { 'Status Bar': 1, 'Tab Bar': 1, 'Home Indicator': 1 };
const CONTROL = /^(Filter chips|Header controls|Segmented · Breakfast)/;
const out = [];
for (const id of args.frameIds) {
  const f = await figma.getNodeByIdAsync(id);
  const fx = f.absoluteTransform[0][2], fy = f.absoluteTransform[1][2];
  const kids = f.children;
  const scrimIdx = kids.findIndex(c => c.name === 'Scrim');
  const top = scrimIdx >= 0 ? kids.slice(scrimIdx + 1) : kids;
  const texts = [];
  for (const k of top) {
    if (EXCL[k.name] || !k.visible) continue;
    const ts = k.type === 'TEXT' ? [k] : ('findAllWithCriteria' in k ? k.findAllWithCriteria({ types: ['TEXT'] }) : []);
    for (const t of ts) {
      if (!t.characters.trim()) continue;
      let vis = true, p = t;
      while (p && p !== f) { if (!p.visible || p.opacity === 0) { vis = false; break; } p = p.parent; }
      if (!vis) continue;
      const b = t.absoluteBoundingBox; if (!b) continue;
      let x0 = b.x - fx, y0 = b.y - fy, x1 = x0 + b.width, y1 = y0 + b.height;
      p = t.parent;
      while (p && p !== f) { if (p.clipsContent && p.absoluteBoundingBox) { const a = p.absoluteBoundingBox; x0 = Math.max(x0, a.x - fx); y0 = Math.max(y0, a.y - fy); x1 = Math.min(x1, a.x - fx + a.width); y1 = Math.min(y1, a.y - fy + a.height); } p = p.parent; }
      x0 = Math.max(x0, 0); x1 = Math.min(x1, 393); y0 = Math.max(y0, 54); y1 = Math.min(y1, 748);
      if (x1 - x0 > 1 && y1 - y0 > 1) texts.push(t.characters.replace(/\n/g, ' ').slice(0, 28));
    }
  }
  const content = kids.find(c => c.name === 'Admin / Content');
  const blocks = [], controls = [];
  if (content && scrimIdx < 0) for (const c of content.children) {
    if (!c.visible) continue;
    const y = content.y + c.y;
    if (y >= 748 || y + c.height <= 54) continue;
    if ((c.type === 'TEXT' && c.name === 'Eyebrow') || c.name === 'Page dots') continue;
    (CONTROL.test(c.name) ? controls : blocks).push(c.name.slice(0, 30));
  }
  out.push({ id, name: f.name, blocks: blocks.length, blockList: blocks, controls, texts: texts.length, textList: texts });
}
return out;
