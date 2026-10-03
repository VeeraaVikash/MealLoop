// Run 3 R2-4 build helpers (stored as mealloop/h24). Body of async function(figma, args) -> H (helper object).
// Usage: const H = await new AF('figma','args', figma.root.getSharedPluginData('mealloop','h24'))(figma, {});
//  H.paint(varId), H.loadAll(node), H.strip(node), H.setP(inst, {PropName: value}) (name before '#'),
//  H.setT(text, chars, mono=true): sets text on its first non-mono style, then numbers/times/units in mono,
//  H.txt(root, layerName, chars, mono), H.go(node, destId, 'drill'|'diss'|'back'|'timeout'|'moveout'),
//  H.frame9(name, x, y): new staff frame cloned from MS-C2 (Task top bar, Back -> MS-E), Content cleared, Footer cleared,
//  H.frame10(name, x, y, srcId): new admin frame cloned from srcId, 'Admin / Content' cleared,
//  H.ann(pageId, frame, label, momentTime), H.put(id, parent): clone a node into parent (links stripped, FILL width),
//  H.audit(parent, rows): AuditRow instances [{state, time, title, detail, pill, line}].
figma.skipInvisibleInstanceChildren = false;
const H = {};
H.V = async id => figma.variables.getVariableByIdAsync('VariableID:' + id);
H.paint = async id => figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 1 }, 'color', await H.V(id));
H.styles = await figma.getLocalTextStylesAsync();
H.S = n => H.styles.find(s => s.name === n);
H.loadAll = async root => { const ts = root.type === 'TEXT' ? [root] : ('findAllWithCriteria' in root ? root.findAllWithCriteria({ types: ['TEXT'] }) : []); const m = new Map(); for (const t of ts) for (const s of t.getStyledTextSegments(['fontName'])) m.set(s.fontName.family + '|' + s.fontName.style, s.fontName); await Promise.all([...m.values()].map(f => figma.loadFontAsync(f))); };
H.strip = async n => { const all = [n, ...('findAll' in n ? n.findAll(x => x.reactions && x.reactions.length) : [])]; for (const x of all) if (x.reactions && x.reactions.length) { try { await x.setReactionsAsync([]); } catch (e) {} } };
H.setP = (inst, obj) => { const o = {}; for (const [n, v] of Object.entries(obj)) { const k = Object.keys(inst.componentProperties).find(x => x.split('#')[0] === n); if (!k) throw new Error('No prop ' + n + ' on ' + inst.name); o[k] = v; } inst.setProperties(o); return inst; };
H.MONO = { 'ML/Secondary': 'ML/Mono Body', 'ML/Secondary Medium': 'ML/Mono Body', 'ML/Eyebrow': 'ML/Mono Body', 'ML/Footnote': 'ML/Mono Footnote', 'ML/Body': 'ML/Mono Body', 'ML/Body Medium': 'ML/Mono Body', 'ML/Headline': 'ML/Mono Body' };
H.RX = /[−+]?\d+(?:[:.,]\d+)*(?:–\d+(?:[:.,]\d+)*)?(?:%|\s?(?:AM|PM|kg|L|g|min|kcal))?/g;
H.setT = async (t, chars, mono) => {
  await H.loadAll(t);
  const segs = t.getStyledTextSegments(['textStyleId', 'fontName']);
  let base = segs.find(s => s.textStyleId && H.styles.find(x => x.id === s.textStyleId) && !/Mono/.test(H.styles.find(x => x.id === s.textStyleId).name));
  if (!base) base = segs.find(s => !/Mono/.test(s.fontName.family)) || segs[0];
  const fills = t.getRangeFills(0, 1);
  if (base.textStyleId) await t.setRangeTextStyleIdAsync(0, t.characters.length, base.textStyleId); else t.setRangeFontName(0, t.characters.length, base.fontName);
  t.characters = chars; if (fills !== figma.mixed) t.fills = fills;
  if (mono !== false && base.textStyleId) { const bn = H.styles.find(x => x.id === base.textStyleId).name; const ms = H.S(H.MONO[bn]); if (ms) { await figma.loadFontAsync(ms.fontName); let m; H.RX.lastIndex = 0; while ((m = H.RX.exec(chars))) if (m[0].length) await t.setRangeTextStyleIdAsync(m.index, m.index + m[0].length, ms.id); } }
  return t;
};
H.txt = async (root, name, chars, mono) => { const t = root.findOne(n => n.type === 'TEXT' && n.name === name); if (!t) throw new Error('no text ' + name + ' in ' + root.name); return H.setT(t, chars, mono); };
H.drill = JSON.parse(JSON.stringify((await figma.getNodeByIdAsync('1291:8351')).reactions[0].actions[0].transition));
H.go = async (node, dest, kind) => {
  if (kind === 'back') return node.setReactionsAsync([{ trigger: { type: 'ON_CLICK' }, actions: [{ type: 'BACK' }] }]);
  const tr = kind === 'drill' ? H.drill : kind === 'moveout' ? { type: 'MOVE_OUT', direction: 'RIGHT', matchLayers: false, easing: { type: 'EASE_OUT' }, duration: 0.3 } : kind === 'timeout' ? { type: 'SMART_ANIMATE', easing: { type: 'EASE_OUT' }, duration: 0.25 } : { type: 'DISSOLVE', easing: { type: 'EASE_OUT' }, duration: 0.25 };
  const trig = kind === 'timeout' ? { type: 'AFTER_TIMEOUT', timeout: 1.2 } : { type: 'ON_CLICK' };
  return node.setReactionsAsync([{ trigger: trig, actions: [{ type: 'NODE', destinationId: dest, navigation: 'NAVIGATE', transition: tr, preserveScrollPosition: false, resetVideoPosition: false }] }]);
};
H.put = async (id, parent, idx) => { const s = await figma.getNodeByIdAsync(id); const c = s.clone(); if (idx === undefined) parent.appendChild(c); else parent.insertChild(idx, c); await H.strip(c); await H.loadAll(c); if (parent.layoutMode && parent.layoutMode !== 'NONE') { try { c.layoutSizingHorizontal = 'FILL'; } catch (e) {} } return c; };
H.frame9 = async (name, x, y) => {
  const p = await figma.getNodeByIdAsync('732:2'); await figma.setCurrentPageAsync(p);
  const f = (await figma.getNodeByIdAsync('756:596')).clone(); p.appendChild(f); f.name = name; f.x = x; f.y = y; await H.strip(f);
  const content = f.findOne(n => n.name === 'Content'); for (const c of [...content.children]) c.remove();
  const footer = f.findOne(n => n.name === 'Footer'); for (const c of [...footer.children]) c.remove();
  const top = f.findOne(n => n.name === 'Top bar'); await H.loadAll(top); await H.go(top.findOne(n => n.name === 'Back'), '775:84867', 'moveout');
  return { f, content, footer, top };
};
H.frame10 = async (name, x, y, srcId) => {
  const p = await figma.getNodeByIdAsync('811:21055'); await figma.setCurrentPageAsync(p);
  const f = (await figma.getNodeByIdAsync(srcId)).clone(); p.appendChild(f); f.name = name; f.x = x; f.y = y; await H.strip(f);
  const content = f.findOne(n => n.name === 'Admin / Content'); for (const c of [...content.children]) c.remove();
  return { f, content };
};
H.ANN = { '732:2': ['775:85052', '775:85053', '775:85056'], '811:21055': ['1321:10928', '1321:10929', '1321:10932'] };
H.ann = async (pageId, f, label, time) => {
  const p = await figma.getNodeByIdAsync(pageId); const [l, m, s] = H.ANN[pageId];
  const l2 = (await figma.getNodeByIdAsync(l)).clone(); p.appendChild(l2); await H.loadAll(l2); l2.characters = label; l2.name = 'Label / ' + label; l2.x = f.x; l2.y = f.y - 36;
  const m2 = (await figma.getNodeByIdAsync(m)).clone(); p.appendChild(m2); m2.x = f.x; m2.y = f.y + 868; await H.loadAll(m2);
  const mt = m2.findAll(n => n.type === 'TEXT').find(t => /Moment:/.test(t.characters)); mt.characters = 'Moment: Wed ' + time; m2.name = 'Moment / Moment: Wed ' + time;
  const s2 = (await figma.getNodeByIdAsync(s)).clone(); p.appendChild(s2); s2.x = f.x; s2.y = f.y + 940;
  return [l2, m2, s2];
};
H.AR = await figma.getNodeByIdAsync('1028:1887');
H.audit = async (parent, rows) => {
  const out = [];
  for (let i = 0; i < rows.length; i++) { const r = rows[i]; const v = H.AR.children.find(c => c.name === 'State=' + (r.state || 'Done')); const a = v.createInstance(); parent.appendChild(a); await H.loadAll(a);
    try { a.layoutSizingHorizontal = 'FILL'; } catch (e) {}
    H.setP(a, { Time: r.time || '', Title: r.title, Detail: r.detail || '', 'Show detail': !!r.detail, 'Show time': r.time !== undefined, 'Show line': r.line !== undefined ? r.line : i < rows.length - 1, 'Show pill': !!r.pill });
    a.name = r.name || ('Row · ' + r.title); out.push(a); }
  return out;
};
return H;
