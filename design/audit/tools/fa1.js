// Run 2 Stage 12 audit collector (stored as mealloop/fa1). Body of async function(figma, args) -> rows. Report only.
// args: { frameIds }. Generalises the fill and density tools (FA-0) to any page: content = the child named /Content$/,
// bar = Tab Bar top (or Footer, or frame bottom - 34). Per frame:
//  fill %, small text (< 12 pt, tab labels excepted), mono words (mono runs containing letters other than units),
//  lime uses (visible nodes painted with lime), horizontal overflow, tall non-hero cards (> 25% of 852 = 213 pt),
//  hero count, detached instances, raw (unbound) solid paints outside instances, unstyled text outside instances,
//  ListRow count, dead chevrons (chevron.right with no reaction on it or an ancestor), Back links that are not BACK.
figma.skipInvisibleInstanceChildren = false;
const LIME = 'VariableID:45:15', HERO = 'VariableID:51:3', SURF = 'VariableID:45:4';
const UNITS = /^(?:[\d\s.,:–\-+−%₹•]|AM|PM|kg|g|L|ml|mg|pcs|pts|pt|kcal|min|h|d|x|×|of|\/)+$/;
const rows = [];
for (const id of args.frameIds) {
  const f = await figma.getNodeByIdAsync(id); if (!f) continue;
  const r = { id, name: f.name };
  const inInst = n => { let p = n.parent; while (p && p !== f) { if (p.type === 'INSTANCE') return true; p = p.parent; } return false; };
  const visible = n => { let p = n; while (p && p !== f) { if (p.visible === false || p.opacity === 0) return false; p = p.parent; } return true; };
  const inTab = n => { let p = n.parent; while (p && p !== f) { if (p.name === 'Tab Bar') return true; p = p.parent; } return false; };
  const content = f.children.find(c => /Content$/.test(c.name) && c.visible);
  const tab = f.children.find(c => c.name === 'Tab Bar' && c.visible), foot = f.children.find(c => c.name === 'Footer' && c.visible);
  const sheet = f.children.some(c => c.name === 'Scrim' && c.visible);
  const bar = tab ? tab.y : foot ? foot.y : f.height - 34;
  if (content) { const v = content.children.filter(c => c.visible); const last = v[v.length - 1]; const bottom = last ? content.y + last.y + last.height : content.y; r.fill = Math.round(Math.min(bottom, bar) / bar * 100); r.scroll = f.overflowDirection === 'VERTICAL';
    const range = r.scroll ? Math.max(0, content.y + content.height - f.height) : 0; r.lastAtMax = Math.round(bottom - range); r.clear = Math.round(bar - (bottom - range));
    r.heroes = v.filter(c => c.fills && c.fills !== figma.mixed && c.fills.some(p => p.boundVariables && p.boundVariables.color && p.boundVariables.color.id === HERO)).length;
    r.tall = v.filter(c => c.height > 213 && !(c.fills && c.fills !== figma.mixed && c.fills.some(p => p.boundVariables && p.boundVariables.color && p.boundVariables.color.id === HERO)) && c.fills && c.fills !== figma.mixed && c.fills.some(p => p.boundVariables && p.boundVariables.color && p.boundVariables.color.id === SURF)).map(c => c.name.slice(0, 30) + ' ' + Math.round(c.height));
  }
  r.sheet = sheet;
  const texts = f.findAllWithCriteria({ types: ['TEXT'] }).filter(visible);
  r.small = []; r.mono = []; r.unstyled = 0;
  for (const t of texts) {
    if (!t.characters.trim()) continue;
    if (!inTab(t)) for (const s of t.getStyledTextSegments(['fontSize'])) if (s.fontSize < 12) r.small.push(t.characters.slice(0, 24) + ' ' + s.fontSize);
    for (const s of t.getStyledTextSegments(['fontName'])) if (/Mono/.test(s.fontName.family) && /[A-Za-z]/.test(s.characters) && !UNITS.test(s.characters.trim())) r.mono.push(s.characters.trim().slice(0, 24));
    if (!inInst(t) && (t.textStyleId === '' )) r.unstyled++;
  }
  r.small = [...new Set(r.small)].slice(0, 6); r.mono = [...new Set(r.mono)].slice(0, 6);
  let lime = 0, raw = 0, detached = 0, listrow = 0, deadChev = 0, badBack = [];
  for (const n of f.findAll(n => true)) {
    if (!visible(n)) continue;
    const paints = [...((n.fills && n.fills !== figma.mixed) ? n.fills : []), ...((n.strokes) ? n.strokes : [])].filter(p => p.visible !== false);
    if (paints.some(p => p.boundVariables && p.boundVariables.color && p.boundVariables.color.id === LIME) && !inInst(n)) lime++;
    else if (paints.some(p => p.boundVariables && p.boundVariables.color && p.boundVariables.color.id === LIME) && n.parent && n.parent.type === 'INSTANCE' && !inInst(n.parent)) lime++;
    if (!inInst(n) && n.type !== 'INSTANCE' && paints.some(p => p.type === 'SOLID' && !(p.boundVariables && p.boundVariables.color))) raw++;
    if (n.detachedInfo) detached++;
    if (n.type === 'INSTANCE' && n.mainComponent && n.mainComponent.parent && n.mainComponent.parent.name === 'ListRow' && !inInst(n)) listrow++;
    if (n.type === 'INSTANCE' && n.mainComponent && n.mainComponent.name === 'Name=chevron.right') { let p = n, ok = false; while (p && p !== f.parent) { if (p.reactions && p.reactions.length) { ok = true; break; } p = p.parent; } if (!ok) deadChev++; }
    if (n.name === 'Back' && n.reactions && n.reactions.length) { const a = n.reactions[0].actions && n.reactions[0].actions[0]; if (a && a.type === 'NODE') { const d = await figma.getNodeByIdAsync(a.destinationId); badBack.push(d ? d.name.slice(0, 30) : a.destinationId); } }
  }
  Object.assign(r, { lime, raw, detached, listrow, deadChev, backNav: badBack });
  // horizontal overflow
  const fx = f.absoluteTransform[0][2]; let wide = 0;
  for (const n of f.findAll(x => x.visible !== false)) { const b = n.absoluteBoundingBox; if (!b || !visible(n)) continue; if (b.x - fx < -0.5 || b.x + b.width - fx > 393.5) { let q = n.parent, clipped = false; while (q && q !== f) { if (q.clipsContent) { clipped = true; break; } q = q.parent; } if (!clipped) wide++; } }
  r.hovf = wide;
  rows.push(r);
}
return rows;
