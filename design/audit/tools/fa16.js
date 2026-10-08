// Brand audit Part B per-frame audit driver (stored as mealloop/fa16). Body of async function(figma, args). Report only.
// args: { pageId, from, to, section (bool), store (key prefix) }
// Frames: every 393 pt phone frame on the page (and in its sections when section), skipping any frame whose name or
// whose parent section's name contains "Deprecated". Pages 99 and 11 are never passed in (caller's rule).
// Runs mealloop/fa1 on each frame (fill, 20 pt clearance, small text, mono words, lime count, horizontal overflow, tall
// non-hero cards, hero count, detached, raw paints, unstyled text, ListRow count, dead chevrons, Back destinations) and adds:
//  wash (frame gradient or "Meal wash" layer), limeEls (top-level lime elements), limeTextLight (lime text not on a dark
//  surface), contrast (visible texts under 4.5:1, or 3:1 for 18 pt+ / 14 pt+ bold, against the composited background in
//  the text's own ML Color mode), banned words (served / inside / overdue / redeem / forecast with their text), backs
//  (visible nodes named Back and whether each is a GlassButton instance), tabRoot (Tab Bar visible), sheet (Scrim),
//  grab (a Grabber / handle layer) and close (a Close / Done / Cancel / Not now control) for sheets, statusTag (StatusTag
//  instances), starts (flow starts on this frame).
// Rows are stored compactly under shared plugin data mealloop/<store>_<pageId>_<from>.
figma.skipInvisibleInstanceChildren = false;
const AF = Object.getPrototypeOf(async function(){}).constructor;
const FA = new AF('figma', 'args', figma.root.getSharedPluginData('mealloop', 'fa1'));
const COL = 'VariableCollectionId:45:2', LM = '45:0', DM = '45:1', LIME = 'VariableID:45:15';
const page = await figma.getNodeByIdAsync(args.pageId);
let all = page.children.filter(n => n.type === 'FRAME' && Math.abs(n.width - 393) < 1 && !/Deprecated/i.test(n.name));
if (args.section) for (const s of page.children.filter(n => n.type === 'SECTION' && !/Deprecated/i.test(n.name))) all = all.concat(s.children.filter(n => n.type === 'FRAME' && Math.abs(n.width - 393) < 1 && !/Deprecated/i.test(n.name)));
const frames = all.slice(args.from || 0, args.to || 9999);
const rows = await FA(figma, { frameIds: frames.map(f => f.id) });
const vv = {};
const res1 = async (id, mode, g = 0) => { const v = await figma.variables.getVariableByIdAsync(id); if (!v) return null; let x = v.valuesByMode[mode] !== undefined ? v.valuesByMode[mode] : Object.values(v.valuesByMode)[0]; if (x && x.type === 'VARIABLE_ALIAS' && g < 5) return res1(x.id, mode, g + 1); return x; };
const colOf = async (p, mode) => { const b = p.boundVariables && p.boundVariables.color; let c = p.color, a = 1; if (b) { const k = b.id + mode; if (!(k in vv)) vv[k] = await res1(b.id, mode); const x = vv[k]; if (x && 'r' in x) { c = x; a = x.a === undefined ? 1 : x.a; } } return { r: c.r, g: c.g, b: c.b, a: a * (p.opacity === undefined ? 1 : p.opacity) }; };
const lum = c => { const f = x => x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b); };
const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
const over = (fg, bg) => ({ r: fg.r * fg.a + bg.r * (1 - fg.a), g: fg.g * fg.a + bg.g * (1 - fg.a), b: fg.b * fg.a + bg.b * (1 - fg.a), a: 1 });
const solid = n => { const fs = n.fills; if (!Array.isArray(fs)) return null; const v = fs.filter(p => p.visible !== false && p.type === 'SOLID'); return v.length ? v[v.length - 1] : null; };
const isBox = s => ['FRAME', 'RECTANGLE', 'COMPONENT', 'INSTANCE'].includes(s.type) || (s.type === 'ELLIPSE' && !(s.arcData && (s.arcData.innerRadius > 0 || Math.abs(s.arcData.endingAngle - s.arcData.startingAngle) < 6.28)));
const covers = (a, b) => a && b && a.x <= b.x + 0.5 && a.y <= b.y + 0.5 && a.x + a.width >= b.x + b.width - 0.5 && a.y + a.height >= b.y + b.height - 0.5;
const BANNED = /\b(served|inside|overdue|redeem(?:ed|ing)?|forecast)\b/i;
const out = [];
for (const r of rows) {
  const f = await figma.getNodeByIdAsync(r.id);
  const vis = n => { let p = n; while (p && p !== f) { if (p.visible === false || p.opacity === 0) return false; p = p.parent; } return true; };
  const modeOf = n => { let p = n; while (p && p.type !== 'PAGE') { const m = p.explicitVariableModes && p.explicitVariableModes[COL]; if (m) return m; p = p.parent; } return LM; };
  const grad = (f.fills || []).find(p => p.type === 'GRADIENT_LINEAR' && p.visible !== false);
  const wash = !!grad || f.children.some(c => /wash/i.test(c.name) && c.visible);
  const els = new Set(); const limeTextLight = [];
  const all = f.findAll(() => true).filter(vis);
  const scrimIdx = f.children.findIndex(c => c.name === 'Scrim' && c.visible);
  const underScrim = n => { if (scrimIdx < 0) return false; let t = n; while (t.parent !== f) t = t.parent; return f.children.indexOf(t) < scrimIdx; };
  const contrast = []; const banned = []; const backs = []; let statusTag = 0, grab = false, close = false;
  for (const n of all) {
    const paints = [...(Array.isArray(n.fills) ? n.fills : []), ...(n.strokes || [])].filter(p => p.visible !== false);
    if (paints.some(p => p.boundVariables && p.boundVariables.color && p.boundVariables.color.id === LIME)) { let top = n, p = n.parent; while (p && p !== f) { if (p.type === 'INSTANCE') top = p; p = p.parent; } els.add(top.id); }
    if (n.type === 'INSTANCE' && n.mainComponent && n.mainComponent.parent && n.mainComponent.parent.name === 'StatusTag') statusTag++;
    if (/Grabber|grab handle|Handle/i.test(n.name)) grab = true;
    if (/^(Close|Done|Cancel|Not now|Dismiss)/i.test(n.name) || (n.type === 'TEXT' && /^(Close|Done|Cancel|Not now)$/.test(n.characters))) close = true;
    if (n.name === 'Back' && !underScrim(n)) backs.push(n.type === 'INSTANCE' && n.mainComponent && n.mainComponent.parent && n.mainComponent.parent.id === '74:101' ? 'G' : n.type);
    if (n.type !== 'TEXT' || underScrim(n)) continue;
    if (BANNED.test(n.characters)) banned.push(n.characters.slice(0, 50));
    const fp = solid(n); if (!fp) continue;
    // background stack
    const tb = n.absoluteBoundingBox; const stack = []; let q = n, done = false;
    while (q && q !== f && !done) { const p = q.parent; if (!p) break; const idx = p.children.indexOf(q);
      for (let i = idx - 1; i >= 0 && !done; i--) { const s = p.children[i]; if (!vis(s) || !isBox(s)) continue; const sp = solid(s); if (sp && covers(s.absoluteBoundingBox, tb)) { stack.push([sp, modeOf(s)]); if ((await colOf(sp, modeOf(s))).a > 0.95) done = true; } }
      if (done) break; const pp = solid(p); if (pp && isBox(p)) { stack.push([pp, modeOf(p)]); if ((await colOf(pp, modeOf(p))).a > 0.95) done = true; } q = p; }
    const md = modeOf(n);
    let bg = md === DM ? { r: 17 / 255, g: 17 / 255, b: 17 / 255, a: 1 } : { r: 237 / 255, g: 237 / 255, b: 232 / 255, a: 1 };
    for (let i = stack.length - 1; i >= 0; i--) bg = over(await colOf(stack[i][0], stack[i][1]), bg);
    const fg = await colOf(fp, md); fg.a *= n.opacity; const cr = ratio(over(fg, bg), bg);
    const size = n.fontSize === figma.mixed ? 0 : n.fontSize; const bold = n.fontName !== figma.mixed && /Bold|Semi/.test(n.fontName.style);
    const need = size >= 18 || (size >= 14 && bold) ? 3 : 4.5;
    if (cr < need) contrast.push(Math.round(cr * 100) / 100 + ' "' + n.characters.slice(0, 24) + '" ' + size);
    if (fp.boundVariables && fp.boundVariables.color && fp.boundVariables.color.id === LIME && lum(bg) > 0.4) limeTextLight.push(n.characters.slice(0, 20));
  }
  const tabRoot = f.children.some(c => /Tab Bar/.test(c.name) && c.visible);
  const starts = page.flowStartingPoints.filter(s => s.nodeId === f.id).map(s => s.name);
  out.push({ id: r.id, n: r.name, fill: r.fill, clear: r.clear, scroll: r.scroll, small: r.small, mono: r.mono.length, lime: els.size, ltl: limeTextLight, wash, hovf: r.hovf, tall: r.tall, heroes: r.heroes, det: r.detached, raw: r.raw, uns: r.unstyled, lr: r.listrow, dead: r.deadChev, backNav: r.backNav, sheet: r.sheet, grab, close, tab: tabRoot, backs, cr: contrast.slice(0, 6), crN: contrast.length, ban: banned.slice(0, 6), st: statusTag, starts, h: Math.round(f.height) });
}
if (args.store) figma.root.setSharedPluginData('mealloop', args.store + '_' + args.pageId.replace(':', '_') + '_' + (args.from || 0), JSON.stringify(out));
return { n: out.length };
