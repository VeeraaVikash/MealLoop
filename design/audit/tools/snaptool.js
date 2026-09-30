// MealLoop snapshot + diff tool (body of an async function(figma, args)).
// Stored in root shared plugin data: mealloop / snaptool. Call pattern:
//   const AF = Object.getPrototypeOf(async function(){}).constructor;
//   return await new AF('figma','args', figma.root.getSharedPluginData('mealloop','snaptool'))
//     (figma, { pageId: '44:5359', stage: 'st77', prev: 'st76', store: true });
// args.pageId  page to read (one page per call; fan out in parallel)
// args.stage   key prefix to store under (chunks: <stage>_<pageId with - >_<i>)
// args.prev    snapshot to compare against: 'st75' (legacy format, hash-free fields only) or st76+ (full)
// args.store   true to store this snapshot under args.stage
// Node signature (one per top-level node):
//   id|type|name|x|y|w|h|kids|instances|texts|textHash|fills|modes|overflow|fixed|childIds
// Link signature (one per action):
//   topName|topId|layerName|layerId|trigger[:timeout]|actionType|destId|navigation|transition|resetScroll|extra
const pageId = args.pageId, stage = args.stage, prev = args.prev, store = args.store;
const page = await figma.getNodeByIdAsync(pageId);
await figma.setCurrentPageAsync(page);
const H = function (s) { let x = 5381; for (let i = 0; i < s.length; i++) x = (Math.imul(x, 33) + s.charCodeAt(i)) | 0; return (x >>> 0).toString(36); };
const safe = function (v) { try { return v === figma.mixed ? 'mixed' : H(JSON.stringify(v)); } catch (e) { return 'err'; } };
const F = ['id', 'type', 'name', 'x', 'y', 'w', 'h', 'kids', 'inst', 'texts', 'textHash', 'fills', 'modes', 'overflow', 'fixed', 'childIds'];
const sigOf = function (n) {
  const kids = 'children' in n ? n.children : null;
  const texts = kids ? n.findAllWithCriteria({ types: ['TEXT'] }) : (n.type === 'TEXT' ? [n] : []);
  return [n.id, n.type, n.name, Math.round(n.x), Math.round(n.y), Math.round(n.width), Math.round(n.height),
    kids ? kids.length : '', kids ? n.findAllWithCriteria({ types: ['INSTANCE'] }).length : '',
    texts.length, texts.length ? H(texts.map(function (t) { return t.characters; }).join('\u0001')) : '',
    'fills' in n ? safe(n.fills) : '', 'explicitVariableModes' in n ? safe(n.explicitVariableModes) : '',
    'overflowDirection' in n ? n.overflowDirection : '', 'numberOfFixedChildren' in n ? n.numberOfFixedChildren : '',
    kids ? H(kids.map(function (c) { return c.id; }).join(',')) : ''].join('|');
};
const sigs = page.children.map(sigOf);
const topOf = function (n) { let p = n; while (p.parent && p.parent.type !== 'PAGE') p = p.parent; return p; };
const tr = function (t) { return t ? [t.type, t.direction || '', t.duration, t.easing ? t.easing.type : ''].join(':') : 'none'; };
const links = [], legacy = [];
let reactions = 0, actions = 0;
const withR = page.findAll(function (n) { try { return 'reactions' in n && n.reactions.length > 0; } catch (e) { return false; } });
for (const n of withR) {
  const tp = topOf(n);
  for (const r of n.reactions) {
    reactions++;
    const trig = r.trigger ? r.trigger.type + (r.trigger.timeout != null ? ':' + r.trigger.timeout : '') : 'none';
    const acts = r.actions || (r.action ? [r.action] : []);
    for (const a of acts) {
      actions++;
      const extra = (a.type === 'CONDITIONAL' || a.type === 'SET_VARIABLE') ? safe(a) : '';
      links.push([tp.name, tp.id, n.name, n.id, trig, a.type, a.destinationId || '', a.navigation || '', tr(a.transition), a.resetScrollPosition ? 'reset' : '', extra].join('|'));
      legacy.push([tp.name, n.name, r.trigger ? r.trigger.type : '', a.type, a.navigation || ''].join('|'));
    }
  }
}
links.sort(); legacy.sort();
const flows = (page.flowStartingPoints || []).map(function (f) { return f.nodeId + ':' + f.name; }).sort();
const g = function (k) { return figma.root.getSharedPluginData('mealloop', k); };
const key = function (st) { return st + '_' + pageId.replace(':', '-'); };
const multisetDiff = function (a, b) { // items in a not in b (with multiplicity)
  const m = {}; for (const x of b) m[x] = (m[x] || 0) + 1;
  const out = []; for (const x of a) { if (m[x]) m[x]--; else out.push(x); } return out;
};
const out = { page: page.name, nodes: sigs.length, reactions: reactions, actions: actions, flows: flows };
if (prev) {
  let oldSigs, oldLinks, oldFlows, legacyMode = false;
  if (prev === 'st75') {
    let s = ''; for (let i = 0; i < 10; i++) { const c = g('st75_' + i); if (!c) break; s += c; }
    const o = JSON.parse(s);
    oldSigs = o.snap[page.name] || []; oldLinks = o.links[page.name] || []; oldFlows = (o.flows[page.name] || []).slice().sort();
    legacyMode = true;
  } else {
    let s = ''; for (let i = 0; i < 20; i++) { const c = g(key(prev) + '_' + i); if (!c) break; s += c; }
    if (!s) throw new Error('No stored snapshot ' + prev + ' for ' + page.name);
    const o = JSON.parse(s); oldSigs = o.sigs; oldLinks = o.links; oldFlows = o.flows;
  }
  const oldM = {}; for (const x of oldSigs) { const p = x.split('|'); oldM[p[0]] = p; }
  const newM = {}; for (const x of sigs) { const p = x.split('|'); newM[p[0]] = p; }
  const advisory = page.name === '03 Components' ? { 8: 1, 9: 1, 10: 1 } : {};
  const added = [], removed = [], changed = [];
  for (const id in newM) if (!oldM[id]) added.push(id + ' ' + newM[id][2]);
  for (const id in oldM) if (!newM[id]) removed.push(id + ' ' + oldM[id][2]);
  for (const id in newM) {
    const o = oldM[id]; if (!o) continue; const nw = newM[id];
    const fields = [], adv = [];
    if (legacyMode) {
      // hash fields differ in method; compare only hash-free fields that st75 recorded
      const idxs = o.length === 10 ? [1, 2, 3, 4, 5, 6, 7] : [1, 2, 3, 4, 5, 6, 7, 8, 9, 13, 14];
      for (const i of idxs) if (o[i] !== '' && o[i] !== undefined && String(o[i]) !== String(nw[i])) fields.push(F[i] + ':' + o[i] + '>' + nw[i]);
    } else {
      for (let i = 1; i < F.length; i++) if (String(o[i]) !== String(nw[i])) (advisory[i] ? adv : fields).push(F[i] + (i < 10 && i !== 2 ? ':' + o[i] + '>' + nw[i] : ''));
    }
    if (fields.length || adv.length) changed.push({ id: id, name: nw[2], fields: fields, advisory: adv });
  }
  const curLinks = legacyMode ? legacy : links;
  const la = multisetDiff(curLinks, oldLinks), lr = multisetDiff(oldLinks, curLinks);
  out.vs = {
    prev: prev, oldNodes: oldSigs.length, oldLinks: oldLinks.length,
    added: added.length, removed: removed.length, changedStable: changed.filter(function (c) { return c.fields.length; }).length,
    changedAdvisoryOnly: changed.filter(function (c) { return !c.fields.length; }).length,
    addedList: added.slice(0, 60), removedList: removed.slice(0, 60),
    changedList: changed.filter(function (c) { return c.fields.length; }).slice(0, 40),
    linksAdded: la.length, linksRemoved: lr.length, linksAddedList: la.slice(0, 40), linksRemovedList: lr.slice(0, 40),
    flowsAdded: multisetDiff(flows, oldFlows), flowsRemoved: multisetDiff(oldFlows, flows)
  };
}
if (store) {
  const data = JSON.stringify({ sigs: sigs, links: links, flows: flows });
  let i = 0;
  for (; i * 90000 < data.length; i++) figma.root.setSharedPluginData('mealloop', key(stage) + '_' + i, data.slice(i * 90000, (i + 1) * 90000));
  for (let j = i; j < i + 3; j++) if (g(key(stage) + '_' + j)) figma.root.setSharedPluginData('mealloop', key(stage) + '_' + j, '');
  out.stored = key(stage) + ' x' + i;
}
return out;
