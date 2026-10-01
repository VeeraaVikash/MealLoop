// Overnight Stage 3 builder helpers (stored as mealloop/ovhelp). Body of async function(figma, H) -> helpers.
// Every edit targets nodes inside NEW cloned frames; source frames are only read.
const page = await figma.getNodeByIdAsync('811:21055');
await figma.setCurrentPageAsync(page);
figma.skipInvisibleInstanceChildren = false;
const styles = await figma.getLocalTextStylesAsync();
const S = n => styles.find(s => s.name === n);
const sym = await figma.getNodeByIdAsync('73:163');
const icon = n => sym.children.find(c => c.name === 'Name=' + n);
const annOf = f => page.children.filter(n => n.x === f.x && [f.y - 36, f.y + 868, f.y + 940].includes(n.y));
const X = {};
X.page = page; X.S = S; X.icon = icon; X.annOf = annOf;
X.content = f => f.children.find(c => c.name === 'Admin / Content');
X.clone = async (srcId, name, x, y) => { const src = await figma.getNodeByIdAsync(srcId); await H.loadAll(src); const f = src.clone(); page.appendChild(f); f.name = name; f.x = x; f.y = y; return f; };
X.annotate = async (f, srcId, label) => { const src = await figma.getNodeByIdAsync(srcId); const made = []; for (const a of annOf(src)) { const c = a.clone(); page.appendChild(c); c.x = f.x + (a.x - src.x); c.y = f.y + (a.y - src.y); if (a.type === 'TEXT') { await figma.loadFontAsync(a.fontName); c.characters = label; c.name = 'Label / ' + label; } made.push(c.id); } return made; };
X.banner = async (f, text, index) => { const src = (await figma.getNodeByIdAsync('1085:94067')).findOne(n => n.name === 'Offline banner'); await H.loadAll(src); const b = src.clone(); const c = X.content(f); c.insertChild(index, b); b.layoutSizingHorizontal = 'FILL'; await H.loadAll(b); b.setProperties({ [Object.keys(b.componentProperties).find(k => k.startsWith('Message'))]: text }); return b; };
X.hide = (f, names) => { const hidden = []; for (const nm of names) { const n = f.findOne(x => x.name === nm); if (!n) throw new Error('hide: not found ' + nm + ' in ' + f.name); n.visible = false; hidden.push(nm); } return hidden; };
X.stripHidden = async f => { let k = 0; for (const n of f.findAll(x => x.reactions && x.reactions.length)) { let p = n, hid = false; while (p && p !== f) { if (!p.visible) { hid = true; break; } p = p.parent; } if (hid) { await n.setReactionsAsync([]); k++; } } return k; };
X.retarget = async (f, map) => { let k = 0; for (const n of f.findAll(x => x.reactions && x.reactions.length)) { const rs = n.reactions.map(r => ({ trigger: r.trigger, actions: (r.actions || []).map(a => (a.destinationId && map[a.destinationId] !== undefined) ? Object.assign({}, a, { destinationId: map[a.destinationId] }) : a) })); const drop = rs.some(r => r.actions.some(a => a.destinationId === null)); if (JSON.stringify(rs) !== JSON.stringify(n.reactions.map(r => ({ trigger: r.trigger, actions: r.actions })))) { await n.setReactionsAsync(drop ? [] : rs); k++; } } return k; };
X.disable = async (f, name) => { const b = f.findOne(x => x.name === name); await H.loadAll(b); H.set(b, { State: 'Disabled' }); await b.setReactionsAsync([]); for (const x of b.findAll(y => y.reactions && y.reactions.length)) await x.setReactionsAsync([]); return b; };
X.props = async (f, name, props) => { const n = f.findOne(x => x.name === name); await H.loadAll(n); H.set(n, props); return n; };
X.group = (f, names, gname, gap) => { const c = X.content(f); const nodes = names.map(nm => c.children.find(x => x.name === nm)); if (nodes.some(n => !n)) throw new Error('group: missing ' + names.filter((nm, i) => !nodes[i]).join(',') + ' in ' + f.name); const idx = c.children.indexOf(nodes[0]); const g = figma.createAutoLayout('VERTICAL', { name: gname, itemSpacing: gap == null ? 12 : gap }); g.fills = []; c.insertChild(idx, g); g.layoutSizingHorizontal = 'FILL'; for (const n of nodes) { g.appendChild(n); if ('layoutSizingHorizontal' in n) { try { n.layoutSizingHorizontal = 'FILL'; } catch (e) {} } } return g; };
X.empty = async (f, title, body, iconName) => { const es = (await figma.getNodeByIdAsync('75:270')).createInstance(); es.name = 'Empty · ' + title; const c = X.content(f); c.appendChild(es); es.layoutSizingHorizontal = 'FILL'; await H.loadAll(es); H.set(es, { Title: title, Body: body, 'Show Action': false, Icon: icon(iconName).id }); return es; };
X.centre = (f, es) => { const c = X.content(f); const vis = c.children.filter(x => x.visible); const i = vis.indexOf(es); const above = i > 0 ? c.y + vis[i - 1].y + vis[i - 1].height : c.y; if (i > 0) { c.itemSpacing = Math.max(12, Math.round((748 - above - es.height) / 2)); } else { c.paddingTop = Math.round((748 - c.y - es.height) / 2); } };
X.sum = f => { const c = X.content(f); return c.children.filter(x => x.visible).map(x => [x.name, Math.round(c.y + x.y), Math.round(c.y + x.y + x.height)]); };
return X;
