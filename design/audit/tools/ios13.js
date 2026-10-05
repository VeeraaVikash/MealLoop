// Final-2 G13 iOS check (stored as mealloop/ios13). Body of async function(figma, args). Report only, changes nothing.
// args: { pageId, from, to, minTarget (44 or 56), section (bool: include frames inside sections), rootRe (extra root names) }
// Per phone frame (393 wide): root (a tab destination), sheet (visible Scrim), Back near 16,58, Close, tab bar items,
// tab actions, grab handle on sheets, small targets without a hit area, status bar / home indicator above content,
// truncated text, drag gestures (and whether they start within 20 pt of the left edge).
figma.skipInvisibleInstanceChildren = false;
const page = await figma.getNodeByIdAsync(args.pageId);
let all = page.children.filter(n => n.type === 'FRAME' && Math.abs(n.width - 393) < 1);
if (args.section) for (const s of page.children.filter(n => n.type === 'SECTION')) all = all.concat(s.children.filter(n => n.type === 'FRAME' && Math.abs(n.width - 393) < 1));
const frames = all.slice(args.from || 0, args.to || 9999);
const topOf = async id => { let n = await figma.getNodeByIdAsync(id); while (n && n.parent && n.parent.type !== 'PAGE' && n.parent.type !== 'SECTION') n = n.parent; return n ? n.id : null; };
const roots = new Set();
for (const f of all) for (const n of f.findAll(x => x.reactions && x.reactions.length && /^Tab \//.test(x.name))) for (const r of n.reactions) for (const a of r.actions || []) if (a.destinationId) roots.add(await topOf(a.destinationId));
const min = args.minTarget || 44; const rows = [];
for (const f of frames) {
  const vis = n => { let p = n; while (p && p !== f) { if (p.visible === false || p.opacity === 0) return false; p = p.parent; } return true; };
  const abs = n => { const t = n.absoluteTransform, ft = f.absoluteTransform; return { x: t[0][2] - ft[0][2], y: t[1][2] - ft[1][2] }; };
  const si = f.children.findIndex(c => c.name === 'Scrim' && c.visible);
  const above = n => { if (si < 0) return true; let t = n; while (t.parent !== f) t = t.parent; return f.children.indexOf(t) > si; };
  const r = { n: f.name, root: roots.has(f.id) || (args.rootRe ? new RegExp(args.rootRe).test(f.name) : false), sheet: si >= 0 };
  const backs = f.findAll(n => n.name === 'Back' && vis(n) && above(n));
  r.back = backs.some(b => { const p = abs(b); return p.x < 30 && p.y > 40 && p.y < 80; });
  r.close = f.findAll(n => /^Close/.test(n.name) && vis(n) && above(n)).length > 0;
  const tb = f.children.find(c => /Tab Bar/.test(c.name) && c.visible && (si < 0 || f.children.indexOf(c) > si));
  r.tab = !!tb; r.tabItems = tb ? tb.findAll(n => /^Tab \//.test(n.name) && vis(n)).length : 0;
  r.tabNonNav = tb ? tb.findAll(n => /^Tab \//.test(n.name) && n.reactions && n.reactions.some(x => (x.actions || []).some(a => a.type !== 'NODE' || a.navigation !== 'NAVIGATE'))).length : 0;
  if (r.sheet) { const sh = f.children.slice(si + 1); r.handle = sh.some(c => (c.type === 'INSTANCE' && c.mainComponent && /GlassSheet|Sheet/.test((c.mainComponent.parent && c.mainComponent.parent.name) || c.mainComponent.name)) || ('findOne' in c && c.findOne(x => /Grabber|Handle|Drag indicator/i.test(x.name)))); }
  const hits = f.findAll(n => /hit area/i.test(n.name) && vis(n));
  const small = [];
  for (const n of f.findAll(x => x.reactions && x.reactions.length && x.type !== 'TEXT')) { if (!vis(n) || !above(n) || n === f || /hit area/i.test(n.name)) continue; if (/^Tab \/|^Gallery · /.test(n.name)) continue; if (n.reactions.every(x => x.trigger && x.trigger.type === 'AFTER_TIMEOUT')) continue; if (Math.min(n.width, n.height) >= min) continue;
    const d = JSON.stringify(n.reactions.map(x => (x.actions || []).map(a => a.destinationId || a.type)));
    if (hits.some(h => JSON.stringify(h.reactions.map(x => (x.actions || []).map(a => a.destinationId || a.type))) === d)) continue;
    small.push(n.name.slice(0, 24) + ' ' + Math.round(n.width) + 'x' + Math.round(n.height)); }
  r.small = small;
  const ci = f.children.findIndex(c => /Content$/.test(c.name) && c.visible);
  const layer = re => { const n = f.findOne(x => re.test(x.name) && vis(x)); if (!n) return -1; let t = n; while (t.parent !== f) t = t.parent; return f.children.indexOf(t); };
  const sb = layer(/^Status ?Bar/), hi = layer(/^Home ?Indicator/);
  const C = ci >= 0 ? f.children[ci] : null; const lastVis = C ? C.children.filter(k => k.visible) : []; const cTop = C ? C.y + (lastVis.length ? Math.min(...lastVis.map(k => k.y)) : 0) : 999; const cBot = C ? C.y + (lastVis.length ? Math.max(...lastVis.map(k => k.y + k.height)) : 0) : 0;
  r.statusBar = sb >= 0 && (ci < 0 || sb > ci || cTop >= 54); r.homeInd = hi >= 0 && (ci < 0 || hi > ci || (f.overflowDirection !== 'VERTICAL' && cBot <= 818));
  r.scroll = f.overflowDirection === 'VERTICAL'; r.fixedOk = !r.scroll || (f.numberOfFixedChildren > 0);
  r.trunc = f.findAllWithCriteria({ types: ['TEXT'] }).filter(t => vis(t) && t.textTruncation === 'ENDING').map(t => t.characters.slice(0, 20));
  r.drag = f.findAll(n => n.reactions && n.reactions.some(x => x.trigger && x.trigger.type === 'ON_DRAG')).map(n => n.name.slice(0, 20) + '@' + Math.round(abs(n).x));
  rows.push(r);
}
return rows;
