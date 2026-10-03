// Run 3 R2-3 navigation audit (stored as mealloop/nav3). Body of async function(figma, args) -> report.
// args: { pageId, home | homes: [ids], roots: [ids], rootRe, stateRe }. State frames (name ends in (Empty), (Offline), (Sent)...) are listed apart. Over the page's link graph (393-wide frames):
//  depth = fewest TAPS from home (ON_CLICK / ON_PRESS / ON_DRAG cost 1; AFTER_TIMEOUT costs 0; 0-1 BFS);
//  wayBack: a root (in args.roots) needs a tab bar; a sheet (visible Scrim) needs a Close / Dismiss link;
//           any other screen needs a visible Back node with a link (BACK or NODE);
//  orphan sheets: sheets with no inbound link from another frame;
//  dead chevrons: visible chevron.right with no reaction on itself or any ancestor;
//  swipe rows: frames whose content holds a horizontally overflowing auto-layout row (scroll HORIZONTAL) — need page dots and tap.
figma.skipInvisibleInstanceChildren = false;
const page = await figma.getNodeByIdAsync(args.pageId); await page.loadAsync();
const frames = page.children.filter(n => n.type === 'FRAME' && Math.abs(n.width - 393) < 1);
const ids = new Set(frames.map(f => f.id)); const byId = new Map(frames.map(f => [f.id, f]));
const topOf = async id => { if (ids.has(id)) return id; const n = await figma.getNodeByIdAsync(id); if (!n) return null; let t = n; while (t.parent && t.parent.type !== 'PAGE') t = t.parent; return ids.has(t.id) ? t.id : null; };
const edges = new Map(); const inbound = new Map();
const visible = (n, f) => { let p = n; while (p && p !== f) { if (p.visible === false) return false; p = p.parent; } return true; };
const info = {};
for (const f of frames) {
  const out = []; let backOK = false, closeOK = false;
  for (const n of [f, ...f.findAll(x => x.reactions && x.reactions.length)]) for (const r of (n.reactions || [])) for (const a of (r.actions || [])) {
    const cost = r.trigger && r.trigger.type === 'AFTER_TIMEOUT' ? 0 : 1;
    if (a.type === 'NODE' && a.destinationId) { const d = await topOf(a.destinationId); if (d && d !== f.id) { out.push([d, cost]); inbound.set(d, (inbound.get(d) || 0) + 1); } }
    if (/^Back$/i.test(n.name) && visible(n, f)) backOK = true;
    if (/Close|Dismiss|Cancel/i.test(n.name) && visible(n, f)) closeOK = true;
  }
  edges.set(f.id, out);
  const sheet = f.children.some(c => c.name === 'Scrim' && c.visible);
  const tab = f.children.some(c => c.name === 'Tab Bar' && c.visible);
  const backNode = f.findAll(x => /^Back$/i.test(x.name) && visible(x, f));
  let deadChev = 0; const scrimIdx = f.children.findIndex(c => c.name === 'Scrim' && c.visible);
  const overSheet = c => { if (scrimIdx < 0) return true; let t = c; while (t.parent !== f) t = t.parent; return f.children.indexOf(t) > scrimIdx; };
  for (const c of f.findAll(x => x.type === 'INSTANCE' && x.mainComponent && x.mainComponent.name === 'Name=chevron.right' && visible(x, f) && overSheet(x))) { let p = c, ok = false; while (p && p !== f.parent) { if (p.reactions && p.reactions.length) { ok = true; break; } p = p.parent; } if (!ok) deadChev++; }
  const swipe = f.findAll(x => 'overflowDirection' in x && (x.overflowDirection === 'HORIZONTAL') && visible(x, f)).map(x => x.name);
  info[f.id] = { sheet, tab, backOK, closeOK, backNodes: backNode.length, deadChev, swipe };
}
// 0-1 BFS from home
const homes = args.homes || [args.home]; const dist = new Map(homes.map(h => [h, 0])); const dq = [...homes];
while (dq.length) { const u = dq.shift(); for (const [v, w] of (edges.get(u) || [])) { const nd = dist.get(u) + w; if (!dist.has(v) || nd < dist.get(v)) { dist.set(v, nd); if (w === 0) dq.unshift(v); else dq.push(v); } } }
const roots = new Set(args.roots || [args.home]);
const isRoot = f => roots.has(f.id) || f.children.some(c => c.name === 'Tab-root header' || c.name === 'Greeting header') || (args.rootRe && new RegExp(args.rootRe).test(f.name));
const stateRe = new RegExp(args.stateRe || '\\((Empty|Offline|Sending|Sent|Saved|Failed|Changed|Declining|Approved|Vote open|Notified|Confirmed|Ready|Open|Read-only|Offered|Collected|Late|Add)\\)$');
const rep = { page: page.name, frames: frames.length, reached: dist.size, deep: [], deepStates: [], unreachable: [], unreachableStates: [], noBack: [], orphanSheets: [], deadChev: [], swipe: [] };
for (const f of frames) { const i = info[f.id]; const d = dist.get(f.id);
  const st = stateRe.test(f.name);
  if (d === undefined) (st ? rep.unreachableStates : rep.unreachable).push(f.name); else if (d > 3) (st ? rep.deepStates : rep.deep).push(f.name + ' (' + d + ')');
  if (i.sheet) { if (!i.closeOK) rep.noBack.push(f.name + ' [sheet: no Close link]'); if (!inbound.get(f.id)) rep.orphanSheets.push(f.name); }
  else if (isRoot(f)) { if (!i.tab) rep.noBack.push(f.name + ' [root: no tab bar]'); }
  else if (!i.backOK) rep.noBack.push(f.name + (i.backNodes ? ' [Back not linked]' : (i.tab ? ' [no Back; tab bar only]' : ' [no Back]')));
  if (i.deadChev) rep.deadChev.push(f.name + ' ' + i.deadChev);
  if (i.swipe.length) rep.swipe.push(f.name + ': ' + i.swipe.join(','));
}
rep.depthHist = {}; for (const d of dist.values()) rep.depthHist[d] = (rep.depthHist[d] || 0) + 1;
return rep;
