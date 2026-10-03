// Run 3 R2-1 brand audit (stored as mealloop/brand1). Body of async function(figma, args) -> rows.
// args: { pageId }. Per 393-wide frame: wash (frame-fill gradient bound to the wash tokens, or a MealWash layer),
// sheet (visible Scrim), and the distinct lime ELEMENTS: each visible node painted with `lime` (45:15) counts once,
// grouped by its outermost instance inside the frame (a whole instance is one element). Also flags lime TEXT.
figma.skipInvisibleInstanceChildren = false;
const LIME = 'VariableID:45:15';
const page = await figma.getNodeByIdAsync(args.pageId); await page.loadAsync();
const rows = [];
for (const f of page.children.filter(n => n.type === 'FRAME' && Math.abs(n.width - 393) < 1)) {
  const visible = n => { let p = n; while (p && p !== f) { if (p.visible === false || p.opacity === 0) return false; p = p.parent; } return true; };
  const grad = (f.fills || []).find(p => p.type === 'GRADIENT_LINEAR' && p.visible !== false);
  const wash = !!grad || f.children.some(c => c.name === 'Meal wash' && c.visible);
  const sheet = f.children.some(c => c.name === 'Scrim' && c.visible);
  const els = new Map(); const limeText = [];
  for (const n of f.findAll(x => true)) {
    if (!visible(n)) continue;
    const paints = [...((n.fills && n.fills !== figma.mixed) ? n.fills : []), ...(n.strokes || [])].filter(p => p.visible !== false);
    if (!paints.some(p => p.boundVariables && p.boundVariables.color && p.boundVariables.color.id === LIME)) continue;
    if (n.type === 'TEXT') limeText.push(n.characters.slice(0, 20));
    let top = n, p = n.parent; while (p && p !== f) { if (p.type === 'INSTANCE') top = p; p = p.parent; }
    els.set(top.id, top.name);
  }
  rows.push({ id: f.id, name: f.name, wash, sheet, lime: [...els.values()], limeText });
}
return rows;
