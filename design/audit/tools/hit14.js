// Final-3 H1 hit areas (stored as mealloop/hit14). Body of async function(figma, args).
// args: { pageId, from, to, min (44), section (bool), apply (bool), skipRe (names to leave, e.g. menu dish rows) }
// For every small target found as in tgt14, adds an invisible frame "<name> · hit area 44 pt" to the phone frame's top
// level, centred on the control, at least `min` × `min`, and moves the control's reactions onto it. The control keeps
// its size and look. The hit area goes in the fixed group when the control sits in a fixed layer (status bar, nav,
// tab bar, bottom action), else just under the fixed group, so it scrolls with the content. When the grown rect would
// newly cover another tappable, that side is trimmed back to the neighbour's edge (reported as "trimmed"); if a side
// can't reach `min`, the overlap is kept and reported. In-place variant swaps (CHANGE_TO) and nodes inside horizontal
// scrollers are skipped and reported. Dry run unless apply.
figma.skipInvisibleInstanceChildren = false;
const page = await figma.getNodeByIdAsync(args.pageId); const MIN = args.min || 44;
let all = page.children.filter(n => n.type === 'FRAME' && Math.abs(n.width - 393) < 1);
if (args.section) for (const s of page.children.filter(n => n.type === 'SECTION')) all = all.concat(s.children.filter(n => n.type === 'FRAME' && Math.abs(n.width - 393) < 1));
const frames = all.slice(args.from || 0, args.to || 9999);
const key = n => JSON.stringify((n.reactions || []).map(x => (x.actions || []).map(a => a.destinationId || a.type)));
const out = { made: 0, trimmed: [], overlap: [], skipped: [], fixed: 0, ids: [] };
for (const f of frames) {
  const vis = n => { let p = n; while (p && p !== f) { if (p.visible === false || p.opacity === 0) return false; p = p.parent; } return true; };
  const si = f.children.findIndex(c => c.name === 'Scrim' && c.visible);
  const topOf = n => { let t = n; while (t.parent !== f) t = t.parent; return t; };
  const under = n => si >= 0 && f.children.indexOf(topOf(n)) < si;
  const rect = n => { const t = n.absoluteTransform, ft = f.absoluteTransform; return { x: t[0][2] - ft[0][2], y: t[1][2] - ft[1][2], w: n.width, h: n.height }; };
  const hits = f.findAll(n => /hit area/i.test(n.name) && vis(n) && n.reactions && n.reactions.length);
  const reactive = f.findAll(x => x.reactions && x.reactions.length && x !== f && vis(x) && !under(x) && !x.reactions.every(r => r.trigger && r.trigger.type === 'AFTER_TIMEOUT'));
  const smalls = reactive.filter(n => !/hit area/i.test(n.name) && Math.min(n.width, n.height) < MIN && !(args.skipRe && new RegExp(args.skipRe).test(n.name)) && !hits.some(h => key(h) === key(n) && Math.min(h.width, h.height) >= MIN));
  for (const n of smalls) {
    if (n.reactions.some(r => (r.actions || []).some(a => a.navigation === 'CHANGE_TO'))) { out.skipped.push(f.name + ' :: ' + n.name + ' (CHANGE_TO)'); continue; }
    let q = n.parent, hscroll = false; while (q && q !== f) { if (q.overflowDirection === 'HORIZONTAL' || q.overflowDirection === 'BOTH') hscroll = true; q = q.parent; }
    if (hscroll) { out.skipped.push(f.name + ' :: ' + n.name + ' (horizontal scroller)'); continue; }
    const r = rect(n); const W = Math.max(r.w, MIN), H = Math.max(r.h, MIN);
    let x0 = Math.min(Math.max(0, r.x - (W - r.w) / 2), 393 - W), y0 = r.y - (H - r.h) / 2, x1 = x0 + W, y1 = y0 + H;
    const rel = m => { let p = m; while (p) { if (p === n) return true; p = p.parent; } p = n; while (p) { if (p === m) return true; p = p.parent; } return false; };
    let over = false;
    for (const m of reactive.concat(hits)) { if (m === n || rel(m)) continue; const o = rect(m); if (key(m) === key(n)) continue;
      const ix = Math.min(x1, o.x + o.w) - Math.max(x0, o.x), iy = Math.min(y1, o.y + o.h) - Math.max(y0, o.y); if (ix <= 0.5 || iy <= 0.5) continue;
      const ox = Math.min(r.x + r.w, o.x + o.w) - Math.max(r.x, o.x), oy = Math.min(r.y + r.h, o.y + o.h) - Math.max(r.y, o.y); if (ox > 0.5 && oy > 0.5) continue;
      if (o.y >= r.y + r.h - 0.5 && o.y - y0 >= MIN) { y1 = o.y; } else if (o.y + o.h <= r.y + 0.5 && y1 - (o.y + o.h) >= MIN) { y0 = o.y + o.h; }
      else if (o.x >= r.x + r.w - 0.5 && o.x - x0 >= MIN) { x1 = o.x; } else if (o.x + o.w <= r.x + 0.5 && x1 - (o.x + o.w) >= MIN) { x0 = o.x + o.w; }
      else { over = true; out.overlap.push(f.name + ' :: ' + n.name + ' ↔ ' + m.name); continue; }
      out.trimmed.push(f.name + ' :: ' + n.name + ' (by ' + m.name.slice(0, 20) + ')'); }
    const t = topOf(n); const nf = f.numberOfFixedChildren || 0; const isFixed = f.children.indexOf(t) >= f.children.length - nf;
    if (isFixed) out.fixed++;
    out.made++;
    if (!args.apply) continue;
    const h = figma.createFrame(); h.name = n.name + ' · hit area 44 pt'; h.fills = []; h.strokes = []; h.clipsContent = false;
    h.resize(x1 - x0, y1 - y0);
    if (isFixed) { f.appendChild(h); f.numberOfFixedChildren = nf + 1; } else { f.insertChild(f.children.length - nf, h); }
    h.x = x0; h.y = y0;
    await h.setReactionsAsync(n.reactions); await n.setReactionsAsync([]); out.ids.push(h.id);
  }
}
return out;
