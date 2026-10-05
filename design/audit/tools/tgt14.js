// Final-3 H1 target check, ALL layer names (stored as mealloop/tgt14). Body of async function(figma, args).
// args: { pageId, from, to, min (default 44), section (bool), list (bool) }
// Counts every visible node with a click / press / hover / drag reaction (any type, any name) on each 393 pt phone
// frame, skipping: the frame itself, timer-only reactions, nodes under a sheet's scrim, and nodes whose own hit area
// (a "… hit area …" layer with the same destination) is at least `min` in both directions.
// A target is small when min(width, height) < min. Returns { frames, targets, small, byName, list }.
figma.skipInvisibleInstanceChildren = false;
const page = await figma.getNodeByIdAsync(args.pageId); const MIN = args.min || 44;
let all = page.children.filter(n => n.type === 'FRAME' && Math.abs(n.width - 393) < 1);
if (args.section) for (const s of page.children.filter(n => n.type === 'SECTION')) all = all.concat(s.children.filter(n => n.type === 'FRAME' && Math.abs(n.width - 393) < 1));
const frames = all.slice(args.from || 0, args.to || 9999);
const key = n => JSON.stringify((n.reactions || []).map(x => (x.actions || []).map(a => a.destinationId || a.type)));
let targets = 0; const small = []; const byName = {};
for (const f of frames) {
  const vis = n => { let p = n; while (p && p !== f) { if (p.visible === false || p.opacity === 0) return false; p = p.parent; } return true; };
  const si = f.children.findIndex(c => c.name === 'Scrim' && c.visible);
  const under = n => { if (si < 0) return false; let t = n; while (t.parent !== f) t = t.parent; return f.children.indexOf(t) < si; };
  const hits = f.findAll(n => /hit area/i.test(n.name) && vis(n) && n.reactions && n.reactions.length);
  for (const n of f.findAll(x => x.reactions && x.reactions.length)) {
    if (!vis(n) || under(n) || /hit area/i.test(n.name)) continue;
    if (n.reactions.every(x => x.trigger && x.trigger.type === 'AFTER_TIMEOUT')) continue;
    targets++;
    if (Math.min(n.width, n.height) >= MIN) continue;
    const k = key(n); if (hits.some(h => key(h) === k && Math.min(h.width, h.height) >= MIN)) continue;
    const cls = n.name.replace(/[·\-–—/].*$/, '').trim().split(' ')[0] || n.type;
    byName[cls] = (byName[cls] || 0) + 1;
    small.push(f.name + ' :: ' + n.name.slice(0, 32) + ' ' + Math.round(n.width) + '×' + Math.round(n.height));
  }
}
return { frames: frames.length, targets, small: small.length, byName, list: args.list ? small : undefined };
