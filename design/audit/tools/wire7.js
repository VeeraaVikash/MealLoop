// Final-fix F7 wiring manifest (stored as mealloop/wire7). Body of async function(figma, args) -> lines.
// args: { pageId, from, to }. One line per tappable element: frame \t element \t destination \t status.
// Tappable = has a reaction, or looks tappable: Button, GlassButton, ListRow / SettingsRow / SearchResultRow, IntentChoice,
// ReasonPicker, pill-bar pills, MenuDishTile, BentoTile with a chevron, tab-bar items, Back, Close, avatar, search,
// any visible chevron.right. Status: linked | missing | disabled (dashed or State=Disabled) | display only (inside a
// "display only" group) | background (under a sheet's scrim) | covered (inside a linked parent).
figma.skipInvisibleInstanceChildren = false;
const page = await figma.getNodeByIdAsync(args.pageId);
const frames = page.children.filter(n => n.type === 'FRAME' && Math.abs(n.width - 393) < 1).slice(args.from || 0, args.to || 9999);
const ids = new Set(page.children.filter(n => n.type === 'FRAME').map(f => f.id)); const names = new Map(page.children.map(f => [f.id, f.name]));
const cache = new Map(); const topOf = async id => { if (ids.has(id)) return id; if (cache.has(id)) return cache.get(id); const n = await figma.getNodeByIdAsync(id); let t = n; while (t && t.parent && t.parent.type !== 'PAGE') t = t.parent; const r = t ? t.id : null; cache.set(id, r); return r; };
const SETS = /^(Button|GlassButton|ListRow|SettingsRow|SearchResultRow|IntentChoice|ReasonPicker|MenuDishTile|Pill|FilterPill|SegmentedControl)$/;
const lines = [];
for (const f of frames) {
  const vis = n => { let p = n; while (p && p !== f) { if (p.visible === false) return false; p = p.parent; } return true; };
  const si = f.children.findIndex(c => c.name === 'Scrim' && c.visible);
  const under = n => { if (si < 0) return false; let t = n; while (t.parent !== f) t = t.parent; return f.children.indexOf(t) < si; };
  const linkedAnc = n => { let p = n.parent; while (p && p !== f) { if (p.reactions && p.reactions.length) return true; p = p.parent; } return false; };
  const setName = n => n.type === 'INSTANCE' && n.mainComponent ? (n.mainComponent.parent && n.mainComponent.parent.type === 'COMPONENT_SET' ? n.mainComponent.parent.name : n.mainComponent.name) : '';
  const seen = new Set();
  const dest = async n => { const out = []; for (const r of n.reactions || []) for (const a of r.actions || []) { if (a.type === 'BACK') out.push('Back'); else if (a.type === 'CLOSE') out.push('Close overlay'); else if (a.type === 'NODE' && a.destinationId) { const t = await topOf(a.destinationId); out.push((r.trigger && r.trigger.type === 'AFTER_TIMEOUT' ? '(after delay) ' : '') + (names.get(t) || ('other page ' + t))); } else if (a.type === 'URL') out.push('URL'); } return out.join(' + '); };
  if (f.reactions && f.reactions.length) lines.push([f.name, '(frame timer)', await dest(f), 'linked'].join('\t'));
  for (const n of f.findAll(x => true)) {
    if (!vis(n) || seen.has(n.id)) continue;
    const hasR = n.reactions && n.reactions.length; const sn = setName(n);
    const looks = hasR || SETS.test(sn) || /^(Back|Close|Search|Avatar|Tab \/|Pill · |Tile · |Row · |Destination · |Card · |Primary · |Secondary · |Chip · )/.test(n.name) || (n.type === 'INSTANCE' && n.mainComponent && n.mainComponent.name === 'Name=chevron.right');
    if (!looks) continue;
    if (n.type === 'INSTANCE' && n.mainComponent && n.mainComponent.name === 'Name=chevron.right' && linkedAnc(n)) continue;
    let p = n.parent; let inner = false; while (p && p !== f) { if (seen.has(p.id)) { inner = true; break; } p = p.parent; } if (inner && !hasR) continue;
    seen.add(n.id);
    let status;
    if (hasR) status = 'linked'; else if (under(n)) status = 'background'; else if (linkedAnc(n)) status = 'covered';
    else { let q = n, disp = false, dis = false; while (q && q !== f) { if (/display only/i.test(q.name)) disp = true; if ((q.dashPattern && q.dashPattern.length && q.type !== 'TEXT') || /Disabled|needs a connection/i.test(q.name)) dis = true; q = q.parent; }
      if (sn === 'Button' && n.mainComponent && /State=Disabled/.test(n.mainComponent.name)) dis = true;
      status = disp ? 'display only' : dis ? 'disabled' : 'missing'; }
    if (status === 'background' || status === 'covered') continue;
    const label = (n.type === 'TEXT' ? n.characters : ('findOne' in n ? (n.findOne(x => x.type === 'TEXT' && x.visible && x.characters.trim()) || {}).characters : '')) || '';
    lines.push([f.name, (n.name + (label && !n.name.includes(label.slice(0, 12)) ? ' “' + label.slice(0, 30).replace(/\n/g, ' ') + '”' : '')).replace(/\t/g, ' '), hasR ? await dest(n) : '—', status].join('\t'));
  }
}
return lines;
