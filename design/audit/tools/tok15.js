// Brand audit A2 raw-colour scan and bind (stored as mealloop/tok15). Body of async function(figma, args).
// args: { pageId, from, to, apply (bool), section (bool, include frames inside sections), top (bool: scan top-level
//         non-phone nodes too, e.g. page 03 components and boards) }
// Walks every SOLID fill and stroke on loose layers (not inside an instance) plus instance overrides of fills/strokes.
// A paint is "bound" when paint.boundVariables.color is set. For a raw paint, the frame's ML Color mode (Light 45:0 /
// Dark 45:1, from the nearest explicit mode) is looked up and the paint is matched against a role table: the
// preferred token for that role (text / fill / stroke) whose resolved value in that mode equals the raw hex and
// opacity. Only an exact match binds (apply). Everything else is returned as an exception, counted by hex.
figma.skipInvisibleInstanceChildren = false;
const COL = 'VariableCollectionId:45:2', DARK = '45:1', LIGHT = '45:0';
const ROLE = {
  text: ['ink', 'ink-secondary', 'on-hero', 'on-hero-secondary', 'success', 'warning', 'urgent', 'on-lime', 'on-action', 'on-hero-error'],
  fill: ['surface', 'canvas', 'fill-quiet', 'hero-bg', 'lime', 'border', 'success-tint', 'warning-tint', 'urgent-tint', 'success', 'warning', 'urgent', 'ink-secondary', 'hero-pill', 'surface-raised', 'scrim', 'tab-selected', 'glass-fill', 'wash/top'],
  stroke: ['border', 'border-control', 'lime', 'success', 'warning', 'urgent', 'ink-secondary', 'card-edge', 'on-hero']
};
const col = await figma.variables.getVariableCollectionByIdAsync(COL);
const vars = {}; for (const id of col.variableIds) { const v = await figma.variables.getVariableByIdAsync(id); vars[v.name] = v; }
const resolve = async (v, mode) => { let x = v.valuesByMode[mode]; let g = 0; while (x && x.type === 'VARIABLE_ALIAS' && g++ < 5) { const w = await figma.variables.getVariableByIdAsync(x.id); x = w.valuesByMode[Object.keys(w.valuesByMode).includes(mode) ? mode : Object.keys(w.valuesByMode)[0]]; } return x; };
const key = (c, o) => '#' + [c.r, c.g, c.b].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('').toUpperCase() + (o < 0.999 ? '@' + Math.round(o * 100) : '');
const table = {}; // mode -> role -> hexkey -> varName
for (const mode of [LIGHT, DARK]) { table[mode] = {}; for (const role in ROLE) { table[mode][role] = {}; for (const nm of ROLE[role]) { const v = vars[nm]; if (!v) continue; const c = await resolve(v, mode); if (!c || !('r' in c)) continue; const k = key(c, c.a === undefined ? 1 : c.a); if (!table[mode][role][k]) table[mode][role][k] = nm; } } }
const page = await figma.getNodeByIdAsync(args.pageId);
let roots = page.children.filter(n => args.top ? true : (n.type === 'FRAME' && Math.abs(n.width - 393) < 1));
if (args.section) for (const s of page.children.filter(n => n.type === 'SECTION')) roots = roots.concat(s.children.filter(n => n.type === 'FRAME' || n.type === 'COMPONENT'));
roots = roots.slice(args.from || 0, args.to || 99999);
const modeOf = n => { let p = n; while (p && p.type !== 'PAGE') { const m = p.explicitVariableModes && p.explicitVariableModes[COL]; if (m) return m; p = p.parent; } return LIGHT; };
const out = { roots: roots.length, solid: 0, bound: 0, raw: 0, bindable: 0, applied: 0, gradient: 0, byToken: {}, exc: {}, failed: [] };
const visit = async (n, inInst, ov) => {
  if (n.type === 'INSTANCE' && !inInst) {
    const m = new Map(); for (const o of n.overrides || []) m.set(o.id, new Set(o.overriddenFields));
    const all = [n].concat(n.findAll(() => true));
    for (const k of all) { const s = m.get(k.id); if (s && (s.has('fills') || s.has('strokes'))) await visit(k, true, s); }
    return;
  }
  const consider = !inInst || ov; // instances: only overridden fills/strokes count (the rest belong to the main component)
  if (consider) for (const prop of ['fills', 'strokes']) {
    if (inInst && !(ov.has(prop))) continue;
    const ps = n[prop]; if (!Array.isArray(ps) || !ps.length) continue;
    let changed = false; const np = ps.slice();
    for (let i = 0; i < ps.length; i++) { const p = ps[i];
      if (p.type !== 'SOLID') { if (/GRADIENT/.test(p.type)) out.gradient++; continue; }
      out.solid++;
      if (p.boundVariables && p.boundVariables.color) { out.bound++; continue; }
      out.raw++;
      const role = prop === 'strokes' ? 'stroke' : (n.type === 'TEXT' ? 'text' : 'fill');
      const mode = modeOf(n) === DARK ? DARK : LIGHT;
      const k = key(p.color, p.opacity === undefined ? 1 : p.opacity);
      const nm = table[mode][role][k];
      if (!nm) { const ek = role + ' ' + k + (mode === DARK ? ' (dark)' : ''); out.exc[ek] = (out.exc[ek] || 0) + 1; continue; }
      out.bindable++; out.byToken[role + '→' + nm + (mode === DARK ? ' (dark)' : '')] = (out.byToken[role + '→' + nm + (mode === DARK ? ' (dark)' : '')] || 0) + 1;
      if (args.apply) { try { np[i] = figma.variables.setBoundVariableForPaint(p, 'color', vars[nm]); changed = true; } catch (e) { out.failed.push(n.id + ' ' + e.message.slice(0, 60)); } }
    }
    if (changed) { try { n[prop] = np; out.applied += np.filter((q, j) => q !== ps[j]).length; } catch (e) { out.failed.push(n.id + ' set ' + e.message.slice(0, 60)); } }
  }
  if (!inInst && 'children' in n) for (const c of n.children) await visit(c, false, null);
};
for (const r of roots) await visit(r, false, null);
return out;
