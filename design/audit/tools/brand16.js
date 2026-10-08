// Brand audit A6 component-level brand scan (stored as mealloop/brand16). Body of async function(figma, args).
// args: { ids: [component or set ids] (default: every component / set on page 03 outside "Deprecated"), from, to }
// For every visible node in each variant (instance children included, since they render):
//  - lime: a SOLID paint bound to lime / chart-current / pass-border / live/1-bg, or raw #D4F25A / #D4F259.
//    Reported with node type, layer path and the background under it (Light), and "text" when it is a text fill.
//  - wash: a MealWash instance or a ScrollEdgeFade Style=Wash instance inside the component (the wash belongs to the
//    frame, not to components).
//  - contrast: each visible TEXT's fill against the background under it, resolved in Light and Dark (ML Color modes;
//    raw paints stay the same in both). The background is the stack of box-like layers (frames, rectangles, full
//    ellipses; not arcs or vectors) under the text that cover it, composited down to the first opaque one (the
//    canvas, #EDEDE8 / #111111, if none). Translucent glass and text / paint opacity are composited.
// Returns per component: lime list, wash list, and the lowest contrast pairs (Light / Dark).
figma.skipInvisibleInstanceChildren = false;
const COL = 'VariableCollectionId:45:2', L = '45:0', D = '45:1';
const col = await figma.variables.getVariableCollectionByIdAsync(COL);
const vv = {}; const nameOf = {};
const res1 = async (id, mode, g = 0) => { const v = await figma.variables.getVariableByIdAsync(id); if (!v) return null; let x = v.valuesByMode[mode] !== undefined ? v.valuesByMode[mode] : Object.values(v.valuesByMode)[0]; if (x && x.type === 'VARIABLE_ALIAS' && g < 5) return res1(x.id, mode, g + 1); return x; };
for (const id of col.variableIds) { const v = await figma.variables.getVariableByIdAsync(id); nameOf[id] = v.name; if (v.resolvedType === 'COLOR') vv[id] = { l: await res1(id, L), d: await res1(id, D) }; }
const LIME = new Set(Object.keys(nameOf).filter(id => ['lime', 'chart-current', 'pass-border', 'live/1-bg'].includes(nameOf[id])));
const hex = c => '#' + [c.r, c.g, c.b].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('').toUpperCase();
const col4 = (p, dark) => { const b = p.boundVariables && p.boundVariables.color; let c = p.color, a = 1; if (b && vv[b.id]) { const x = dark ? vv[b.id].d : vv[b.id].l; if (x) { c = x; a = x.a === undefined ? 1 : x.a; } } return { r: c.r, g: c.g, b: c.b, a: a * (p.opacity === undefined ? 1 : p.opacity) }; };
const lum = c => { const f = x => x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b); };
const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
const over = (fg, bg) => ({ r: fg.r * fg.a + bg.r * (1 - fg.a), g: fg.g * fg.a + bg.g * (1 - fg.a), b: fg.b * fg.a + bg.b * (1 - fg.a), a: 1 });
const solid = n => { const fs = n.fills; if (!Array.isArray(fs)) return null; const v = fs.filter(p => p.visible !== false && p.type === 'SOLID'); return v.length ? v[v.length - 1] : null; };
const visible = (n, root) => { let p = n; while (p && p !== root.parent) { if (p.visible === false || p.opacity === 0) return false; p = p.parent; } return true; };
const box = n => n.absoluteBoundingBox;
const covers = (a, b) => a && b && a.x <= b.x + 0.5 && a.y <= b.y + 0.5 && a.x + a.width >= b.x + b.width - 0.5 && a.y + a.height >= b.y + b.height - 0.5;
const isBox = s => ['FRAME', 'RECTANGLE', 'COMPONENT', 'INSTANCE', 'COMPONENT_SET'].includes(s.type) || (s.type === 'ELLIPSE' && !(s.arcData && (s.arcData.innerRadius > 0 || Math.abs(s.arcData.endingAngle - s.arcData.startingAngle) < 6.28)));
// Background stack under a text: layers that cover it, from the top down, until one is opaque in both modes.
const bgOf = (t, root) => { const tb = box(t); const stack = []; let n = t;
  const push = (s, sp) => { stack.push(sp); return col4(sp, false).a > 0.95 && col4(sp, true).a > 0.95; };
  while (n && n !== root.parent) { const p = n.parent; if (!p) break;
    if (p.children) { const idx = p.children.indexOf(n); for (let i = idx - 1; i >= 0; i--) { const s = p.children[i]; if (!visible(s, root) || !isBox(s)) continue; const sp = solid(s); if (sp && covers(box(s), tb) && push(s, sp)) return stack; } }
    if (p === root.parent || p.type === 'PAGE') break; const pp = solid(p); if (pp && push(p, pp)) return stack; n = p; }
  return stack.length ? stack : null; };
const flat = (stack, dark) => { let c = dark ? { r: 17 / 255, g: 17 / 255, b: 17 / 255, a: 1 } : { r: 237 / 255, g: 237 / 255, b: 232 / 255, a: 1 }; /* the page canvas behind translucent layers */ for (let i = stack.length - 1; i >= 0; i--) c = over(col4(stack[i], dark), c); return c; };
const nm = p => p.boundVariables && p.boundVariables.color ? nameOf[p.boundVariables.color.id] : hex(p.color);
const p3 = await figma.getNodeByIdAsync('44:5355');
let comps = args.ids ? await Promise.all(args.ids.map(id => figma.getNodeByIdAsync(id))) : p3.children.filter(n => n.type === 'COMPONENT_SET' || n.type === 'COMPONENT');
comps = comps.slice(args.from || 0, args.to || 9999);
const out = [];
for (const c of comps) {
  const vars = c.type === 'COMPONENT_SET' ? c.children : [c]; const lime = {}, wash = {}, low = [];
  for (const v of vars) {
    for (const n of v.findAll(() => true)) {
      if (!visible(n, v)) continue;
      if (n.type === 'INSTANCE' && n.mainComponent) { const mc = n.mainComponent; const nm = (mc.parent && mc.parent.type === 'COMPONENT_SET' ? mc.parent.name + ' ' + mc.name : mc.name); if (/^MealWash/.test(nm) || /ScrollEdgeFade.*Wash/.test(nm)) wash[nm] = (wash[nm] || 0) + 1; }
      for (const prop of ['fills', 'strokes']) { const ps = n[prop]; if (!Array.isArray(ps)) continue; for (const p of ps) { if (p.visible === false || p.type !== 'SOLID') continue; const b = p.boundVariables && p.boundVariables.color; const isL = (b && LIME.has(b.id)) || (!b && /^#D4F25[9A]$/.test(hex(p.color)));
        if (isL) { const bg = bgOf(n, v); const bgc = bg ? hex(flat(bg, false)) : 'none'; const k = (n.type === 'TEXT' ? 'TEXT ' : '') + prop + ' ' + n.name.slice(0, 22) + ' on ' + bgc; lime[k] = (lime[k] || 0) + 1; } } }
      if (n.type === 'TEXT') { const fp = solid(n); if (!fp) continue; const bg = bgOf(n, v); if (!bg) continue;
        for (const dark of [false, true]) { const bgc = flat(bg, dark); const fg = col4(fp, dark); fg.a *= n.opacity; const r = ratio(over(fg, bgc), bgc);
          low.push({ r: Math.round(r * 100) / 100, m: dark ? 'D' : 'L', t: v.name.slice(0, 28) + ' :: ' + n.name.slice(0, 20) + ' "' + n.characters.slice(0, 16) + '"', fg: (fp.boundVariables && fp.boundVariables.color ? nameOf[fp.boundVariables.color.id] : hex(fp.color)), bg: bg.map(nm).join('/'), size: n.fontSize === figma.mixed ? 0 : n.fontSize }); } }
    }
  }
  low.sort((a, b) => a.r - b.r);
  out.push({ name: c.name, id: c.id, lime, wash, lowL: low.filter(x => x.m === 'L').slice(0, 3), lowD: low.filter(x => x.m === 'D').slice(0, 3) });
}
return out;
