// Final-fix F4 back pass (stored as mealloop/back4). Body of async function(figma, args) -> rows.
// args: { pageId, homes: [ids], rootTitle: { prefix: title }, short: [[regex, title]], skip: regex, apply: bool }
// Drill-in = 393 frame that is not a root, not a sheet (visible Scrim), not matched by args.skip.
// Parent = BFS parent from the homes over the link graph, skipping frames of the same family (name before " — " or " (").
// Label = parent's short title if <= 13 characters, else "Back". Base frames: Back = BACK. State frames
// (family has an earlier member): Back = navigate to the family's parent (Move out). Sheets: Close + Dismiss = BACK.
figma.skipInvisibleInstanceChildren = false;
const page = await figma.getNodeByIdAsync(args.pageId); await figma.setCurrentPageAsync(page);
const frames = page.children.filter(n => n.type === 'FRAME' && Math.abs(n.width - 393) < 1); const ids = new Set(frames.map(f => f.id)); const byId = new Map(frames.map(f => [f.id, f]));
const cache = new Map(); const topOf = async id => { if (ids.has(id)) return id; if (cache.has(id)) return cache.get(id); const n = await figma.getNodeByIdAsync(id); let t = n; while (t && t.parent && t.parent.type !== 'PAGE') t = t.parent; const r = t && ids.has(t.id) ? t.id : null; cache.set(id, r); return r; };
const edges = new Map(); for (const f of frames) { const o = []; for (const n of [f, ...f.findAll(x => x.reactions && x.reactions.length)]) { if (/^Back$/.test(n.name)) continue; for (const r of n.reactions || []) for (const a of r.actions || []) if (a.type === 'NODE' && a.destinationId) { const d = await topOf(a.destinationId); if (d && d !== f.id && !o.includes(d)) o.push(d); } } edges.set(f.id, o); }
const depth = new Map(args.homes.map(h => [h, 0])); const q = [...args.homes]; while (q.length) { const u = q.shift(); for (const v of edges.get(u) || []) if (!depth.has(v)) { depth.set(v, depth.get(u) + 1); q.push(v); } }
const preds = new Map(); for (const [u, vs] of edges) for (const v of vs) { if (!preds.has(v)) preds.set(v, []); preds.get(v).push(u); }
const low = f => args.lowPri && new RegExp(args.lowPri).test(f.name);
const par = new Map(); for (const f of frames) { const ps = (preds.get(f.id) || []).filter(u => depth.has(u) && depth.get(u) < (depth.has(f.id) ? depth.get(f.id) + 1 : 1e9)); ps.sort((a, b) => ((low(byId.get(a)) ? 1 : 0) - (low(byId.get(b)) ? 1 : 0)) || (depth.get(a) - depth.get(b))); if (ps.length) par.set(f.id, ps[0]); }
const fam = f => (args.famStrip ? f.name.replace(/^[A-Z]+-[A-Za-z0-9-]+ · /, '') : f.name).split(' — ')[0].split(' (')[0].replace(/ · new$/, '');
const sheet = f => f.children.some(c => c.name === 'Scrim' && c.visible);
const title = f => { for (const [k, t] of Object.entries(args.rootTitle || {})) if (f.name.startsWith(k)) return t; for (const [re, t] of args.short || []) if (new RegExp(re).test(f.name)) return t;
  const nh = f.findOne(n => n.type === 'INSTANCE' && n.mainComponent && n.mainComponent.parent && n.mainComponent.parent.name === 'NavHeader'); if (nh) { const k = Object.keys(nh.componentProperties).find(x => x.startsWith('Title')); return nh.componentProperties[k].value; }
  const h = f.children.find(c => /header/i.test(c.name) && c.type === 'FRAME'); const t = h && h.findOne(n => n.type === 'TEXT' && n.name === 'Title'); return t ? t.characters : f.name; };
const isRoot = f => Object.keys(args.rootTitle || {}).some(k => f.name.startsWith(k)) || args.homes.includes(f.id);
const tr = { type: 'MOVE_OUT', direction: 'RIGHT', matchLayers: false, easing: { type: 'EASE_OUT' }, duration: 0.3 };
const rows = [];
for (const f of frames) {
  if (args.skip && new RegExp(args.skip).test(f.name)) { rows.push([f.name, 'skipped (' + (args.skipWhy || 'flow step') + ')', '', '']); continue; }
  if (sheet(f)) { const cl = f.findAll(n => /^(Close|Dismiss · tap outside|Cancel)$/.test(n.name) && n.visible !== false); const done = [];
    for (const n of cl) { if (n.name === 'Cancel' && n.reactions && n.reactions.some(r => r.actions.some(a => a.type === 'NODE'))) { done.push('Cancel (kept)'); continue; } if (args.apply) await n.setReactionsAsync([{ trigger: { type: 'ON_CLICK' }, actions: [{ type: 'BACK' }] }]); done.push(n.name); }
    rows.push([f.name, 'sheet', 'grab handle + ' + done.join(', '), 'Back (closes the sheet)']); continue; }
  if (isRoot(f)) { rows.push([f.name, 'tab root', 'no Back', '—']); continue; }
  let p = par.get(f.id); const hop = () => { let g = 0; while (p && byId.get(p) && (fam(byId.get(p)) === fam(f) || sheet(byId.get(p))) && g++ < 20) p = par.get(p); }; hop();
  if (!p) { const base = frames.find(o => o !== f && fam(o) === fam(f) && par.get(o.id)); if (base) { p = par.get(base.id); hop(); } }
  let first = par.get(f.id); const isState = first && byId.get(first) && fam(byId.get(first)) === fam(f);
  const pt = p ? title(byId.get(p)) : null; const label = pt && pt.length <= 13 ? pt : 'Back';
  let old = 'none', ctl = null;
  const nh = f.findOne(n => n.type === 'INSTANCE' && n.mainComponent && n.mainComponent.parent && n.mainComponent.parent.name === 'NavHeader' && n.visible);
  const dh = f.children.find(c => c.name === 'Drill-in header'); const stb = f.findOne(n => n.type === 'INSTANCE' && n.name === 'Top bar' && n.mainComponent && n.mainComponent.name === 'Type=Task');
  if (nh) { const bk = Object.keys(nh.componentProperties).find(x => x === 'Back'); old = nh.componentProperties.Back && nh.componentProperties.Back.value === 'Titled' ? 'titled back' : 'glass circle back (icon only)'; if (args.apply) nh.setProperties({ Back: 'Titled' }); ctl = nh.findOne(n => n.name === 'Back'); }
  else if (dh) { old = 'titled back (F1)'; ctl = dh.findOne(n => n.name === 'Back'); }
  else if (stb) { old = 'glass circle back (icon only) → shift home'; ctl = stb.findOne(n => n.name === 'Back'); }
  if (!ctl) { rows.push([f.name, old, 'NO BACK CONTROL FOUND', p ? byId.get(p).name : '—']); continue; }
  if (args.apply) { const k = Object.keys(ctl.componentProperties).find(x => x.startsWith('Label')); const o = {}; o[k] = label; ctl.setProperties(o); ctl.visible = true;
    if (isState && p) await ctl.setReactionsAsync([{ trigger: { type: 'ON_CLICK' }, actions: [{ type: 'NODE', destinationId: p, navigation: 'NAVIGATE', transition: tr, preserveScrollPosition: false, resetVideoPosition: false }] }]);
    else await ctl.setReactionsAsync([{ trigger: { type: 'ON_CLICK' }, actions: [{ type: 'BACK' }] }]); }
  rows.push([f.name, old, '< ' + label, isState && p ? 'navigate to ' + byId.get(p).name : (p ? 'Back (opened from ' + byId.get(p).name + ')' : 'Back (no inbound link found)')]);
}
return rows;
