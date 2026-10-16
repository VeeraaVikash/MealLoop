// Polish Q7 spacing fixer (stored as mealloop/q7fix). Body of async function(figma, args). args: { pageId, from, to, store, dry }
// Rules (brief Q7): content gap -> 8/12/16/24; card padding -> 12/16/20 (sides 8+ only); single-line "Row /" frames -> 56 high;
// two-column pairs -> equal widths; dead band (non-scrolling, not a state screen, not a sheet) > 24 -> grow the dominant card
// (FRAME, >= 40% of the content height) so the last item ends 20 pt above the tab bar / safe area; else NEEDS REVIEW. Logs before -> after.
// Note: list-card grows on Help, Settings · System off, W-3 and GA-7 were reverted by hand afterwards (they read as filler); see polish/spacing.md.
figma.skipInvisibleInstanceChildren = false;
const pg = await figma.getNodeByIdAsync(args.pageId);
const frames = pg.children.filter(n => n.type === 'FRAME' && Math.abs(n.width - 393) < 1).slice(args.from || 0, args.to || 9999);
const vis = (n, f) => { let q = n; while (q && q !== f) { if (q.visible === false || q.opacity === 0) return false; q = q.parent; } return true; };
const EXEMPT = /Empty|Error|Loading|Offline|Not eligible|Unavailable|Expired|Already used|Wrong mess|Not published|No menu|Sending|Sent|Receipt|Failed|failed|denied|Search|Lock|Recheck · (Lock|Inbox)|Gallery|Not enabled|reference|Verifying|Sign in|Confirm profile|Verify code|Done|Activate|Confirm link|Decision recorded|Camera|SRM down|Session expired|Saving|Deleting|Getting/;
const snapGap = g => g === 10 ? 12 : g === 14 ? 16 : g === 20 ? 16 : g === 18 ? 16 : g === 22 ? 24 : g === 28 ? 24 : g;
const snapPad = v => v < 8 ? v : v <= 13 ? 12 : v <= 17 ? 16 : 20;
const log = [];
for (const f of frames) {
  const c = f.children.find(n => /Content$/.test(n.name) && n.type === 'FRAME' && n.visible); if (!c || c.layoutMode !== 'VERTICAL') continue;
  const sheet = f.children.some(n => n.name === 'Scrim' && n.visible); const L = { f: f.name, id: f.id, ch: [] };
  const g0 = c.itemSpacing, g1 = snapGap(g0); if (g1 !== g0 && !args.dry) { c.itemSpacing = g1; } if (g1 !== g0) L.ch.push('gap ' + g0 + '→' + g1);
  for (const k of c.children.filter(k => vis(k, f))) {
    if (k.type === 'FRAME' && k.layoutMode && k.layoutMode !== 'NONE' && Array.isArray(k.fills) && k.fills.some(p => p.visible !== false) && (k.cornerRadius || 0) >= 12) {
      const P = ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft']; const b = P.map(p => k[p]);
      if (b.every(v => v >= 8) && b.some(v => ![12, 16, 20].includes(v))) { const a = b.map(snapPad); if (!args.dry) P.forEach((p, i) => k[p] = a[i]); L.ch.push('pad ' + k.name.slice(0, 18) + ' ' + b.join('/') + '→' + a.join('/')); }
    } }
  for (const r of f.findAll(n => /^Row \//.test(n.name) && n.type === 'FRAME' && n.layoutMode && n.layoutMode !== 'NONE' && vis(n, f))) {
    const h = Math.round(r.height); if ([52, 56].includes(h)) continue; const inner = r.height - r.paddingTop - r.paddingBottom;
    if (inner <= 44) { const p = Math.max(6, Math.round((56 - inner) / 2)); if (!args.dry) { r.paddingTop = r.paddingBottom = p; r.minHeight = 56; } L.ch.push('row ' + r.name.slice(0, 18) + ' ' + h + '→56'); } else L.ch.push('REVIEW row ' + r.name.slice(0, 18) + ' ' + h + ' (two lines)'); }
  for (const k of f.findAll(n => n.type === 'FRAME' && n.layoutMode === 'HORIZONTAL' && vis(n, f) && n.children.filter(x => vis(x, f)).length === 2 && n.children.every(x => x.layoutGrow === 1))) {
    const [a, b] = k.children; if (Math.abs(a.width - b.width) > 1) { const w = (k.width - k.paddingLeft - k.paddingRight - k.itemSpacing) / 2; if (!args.dry) for (const x of [a, b]) { x.layoutGrow = 0; x.layoutSizingHorizontal = 'FIXED'; x.resize(w, x.height); } L.ch.push('cols ' + k.name.slice(0, 14) + ' ' + Math.round(a.width) + '/' + Math.round(b.width) + '→' + Math.round(w) + '/' + Math.round(w)); } }
  // dead band
  const fb = f.absoluteBoundingBox; const tb = f.children.find(n => n.name === 'Tab Bar' && n.visible); const limit = tb ? tb.y : 818;
  const kids = c.children.filter(k => vis(k, f)); let bottom = 0; for (const k of kids) { const b = k.absoluteBoundingBox; if (b) bottom = Math.max(bottom, b.y + b.height - fb.y); }
  const dead = Math.round(limit - bottom);
  if (!sheet && bottom <= limit && dead > 24) {
    if (EXEMPT.test(f.name)) L.ch.push('exempt dead ' + dead);
    else { const cardH = kids.filter(k => k.type === 'FRAME' && Array.isArray(k.fills) && k.fills.some(p => p.visible !== false) && k.layoutMode === 'VERTICAL').sort((x, y) => y.height - x.height)[0];
      const total = bottom - (c.absoluteBoundingBox.y - fb.y);
      if (cardH && cardH.height >= 0.4 * total && dead - 20 <= 100) { const grow = dead - 20; const h0 = Math.round(cardH.height); if (!args.dry) { cardH.layoutSizingVertical = 'FIXED'; cardH.resize(cardH.width, cardH.height + grow); cardH.primaryAxisAlignItems = 'CENTER'; } L.ch.push('dead ' + dead + '→20 (grow ' + cardH.name.slice(0, 18) + ' ' + h0 + '→' + (h0 + grow) + ')'); }
      else L.ch.push('REVIEW dead ' + dead); } }
  if (L.ch.length) log.push(L);
}
if (args.store) figma.root.setSharedPluginData('mealloop', args.store + '_' + args.pageId.replace(':', '_') + '_' + (args.from || 0), JSON.stringify(log));
return { frames: frames.length, changed: log.length };
