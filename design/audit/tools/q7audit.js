// Polish Q7 spacing / alignment audit (stored as mealloop/q7audit). Body of async function(figma, args). Measure only.
// args: { pageId, from, to, store } -> rows stored under mealloop/<store>_<page>_<from>
// Per 393 pt frame: margin (content stack left inset, children whose left edge is off the 20 pt margin by > 1),
// dead band (non-scrolling frames: last content bottom to tab bar top, or to 818 when there is no tab bar), gaps between cards,
// card paddings, list-row heights, centre axis of centred texts (centred pages), text style size overrides, two-column widths.
figma.skipInvisibleInstanceChildren = false;
const pg = await figma.getNodeByIdAsync(args.pageId);
const frames = pg.children.filter(n => n.type === 'FRAME' && Math.abs(n.width - 393) < 1).slice(args.from || 0, args.to || 9999);
const vis = (n, f) => { let q = n; while (q && q !== f) { if (q.visible === false || q.opacity === 0) return false; q = q.parent; } return true; };
const styles = new Map((await figma.getLocalTextStylesAsync()).map(s => [s.id, s]));
const rows = [];
for (const f of frames) {
  const r = { id: f.id, n: f.name };
  const c = f.children.find(n => /Content$/.test(n.name) && n.type === 'FRAME' && n.visible);
  if (!c) { r.noContent = 1; rows.push(r); continue; }
  const fb = f.absoluteBoundingBox;
  r.sheet = f.children.some(n => n.name === 'Scrim' && n.visible) ? 1 : 0;
  r.pad = [c.paddingLeft, c.paddingRight];
  const kids = c.children.filter(k => vis(k, f));
  r.off = []; for (const k of kids) { const b = k.absoluteBoundingBox; if (!b) continue; const dx = b.x - fb.x; const centred = c.counterAxisAlignItems === 'CENTER' || k.layoutAlign === 'CENTER'; if (!centred && Math.abs(dx - 20) > 1 && b.width < 392) r.off.push(k.name.slice(0, 24) + '@' + Math.round(dx)); }
  r.gap = c.itemSpacing;
  const tb = f.children.find(n => n.name === 'Tab Bar' && n.visible); const limit = tb ? tb.y : 818;
  let bottom = 0; for (const k of kids) { const b = k.absoluteBoundingBox; if (b) bottom = Math.max(bottom, b.y + b.height - fb.y); }
  r.bottom = Math.round(bottom); r.limit = Math.round(limit); r.scrolls = bottom > limit + 0.5 ? 1 : 0; r.dead = r.scrolls ? 0 : Math.round(limit - bottom);
  r.cardPad = []; r.rows = [];
  for (const k of kids) { if (k.type === 'FRAME' && k.layoutMode && k.layoutMode !== 'NONE' && Array.isArray(k.fills) && k.fills.some(p => p.visible !== false) && (k.cornerRadius || 0) >= 12) { const p = [k.paddingTop, k.paddingRight, k.paddingBottom, k.paddingLeft]; if (p.some(v => ![12, 16, 20].includes(v))) r.cardPad.push(k.name.slice(0, 20) + ':' + p.join('/')); } }
  for (const k of f.findAll(n => /^Row \//.test(n.name) && vis(n, f))) if (![52, 56].includes(Math.round(k.height))) r.rows.push(k.name.slice(0, 20) + ':' + Math.round(k.height));
  r.cols = []; for (const k of f.findAll(n => n.type === 'FRAME' && n.layoutMode === 'HORIZONTAL' && vis(n, f) && n.children.filter(x => vis(x, f)).length === 2 && n.children.every(x => x.layoutGrow === 1))) { const [a, b2] = k.children; if (Math.abs(a.width - b2.width) > 1) r.cols.push(k.name.slice(0, 16) + ':' + Math.round(a.width) + '/' + Math.round(b2.width)); }
  r.sz = []; for (const t of f.findAll(n => n.type === 'TEXT' && vis(n, f) && !(() => { let q = n.parent; while (q && q !== f) { if (/^(Tab Bar|Status Bar|Lock Screen)/.test(q.name)) return true; q = q.parent; } return false; })())) { const s = t.textStyleId && typeof t.textStyleId === 'string' ? styles.get(t.textStyleId) : null; if (s && t.fontSize !== figma.mixed && t.fontSize !== s.fontSize) r.sz.push(s.name + ' ' + s.fontSize + '→' + t.fontSize); if (t.fontSize !== figma.mixed && t.fontSize < 12) r.sz.push('small ' + t.fontSize + ' ' + t.characters.slice(0, 12)); }
  r.sz = [...new Set(r.sz)];
  r.centre = []; if (c.counterAxisAlignItems === 'CENTER') for (const t of c.findAll(n => n.type === 'TEXT' && vis(n, f) && n.textAlignHorizontal === 'CENTER')) { const b = t.absoluteBoundingBox; const cx = b.x + b.width / 2 - fb.x; if (Math.abs(cx - 196.5) > 1) r.centre.push(t.characters.slice(0, 14) + '@' + cx.toFixed(1)); }
  rows.push(r);
}
if (args.store) figma.root.setSharedPluginData('mealloop', args.store + '_' + args.pageId.replace(':', '_') + '_' + (args.from || 0), JSON.stringify(rows));
return { n: rows.length, sample: rows.slice(0, 2) };
