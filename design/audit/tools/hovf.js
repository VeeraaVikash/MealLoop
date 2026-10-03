// Horizontal-overflow audit (stored as mealloop/hovf). Body of async function(figma, args) -> per-frame issues.
// args.frameIds: frames on any page. Flags a frame or any visible descendant that scrolls horizontally, and any visible
// layer whose bounds leave the frame's x range (0–393); "clipped-wide" when a clipping ancestor inside the frame hides it.
figma.skipInvisibleInstanceChildren = false;
const out = [];
for (const id of args.frameIds) {
  const f = await figma.getNodeByIdAsync(id); if (!f) { out.push({ id, missing: true }); continue; }
  const fx = f.absoluteTransform[0][2];
  const issues = [];
  if (f.overflowDirection === 'HORIZONTAL' || f.overflowDirection === 'BOTH') issues.push('frame scrolls ' + f.overflowDirection);
  for (const n of f.findAll(x => x.visible !== false)) {
    let p = n, vis = true; while (p && p !== f) { if (!p.visible) { vis = false; break; } p = p.parent; } if (!vis) continue;
    if ('overflowDirection' in n && (n.overflowDirection === 'HORIZONTAL' || n.overflowDirection === 'BOTH')) issues.push('scroll ' + n.name);
    const b = n.absoluteBoundingBox; if (!b) continue;
    const l = b.x - fx, r = b.x + b.width - fx;
    if (l < -0.5 || r > 393.5) { let q = n.parent, clipped = false; while (q && q !== f) { if (q.clipsContent) { const qb = q.absoluteBoundingBox; if (qb && qb.x - fx >= -0.5 && qb.x + qb.width - fx <= 393.5) { clipped = true; break; } } q = q.parent; } issues.push((clipped ? 'clipped-wide ' : 'wide ') + n.name + ' [' + Math.round(l) + '..' + Math.round(r) + ']'); }
  }
  const uniq = [...new Set(issues)];
  out.push({ id, name: f.name, page: (() => { let p = f; while (p.type !== 'PAGE') p = p.parent; return p.name.slice(0, 2); })(), n: uniq.length, issues: uniq.slice(0, 8) });
}
return out;
