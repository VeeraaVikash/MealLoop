// GUARDIAN-VIDEO V5 spacing audit (stored as mealloop/gvspace). args: { pageId }. Per phone frame on the page:
// margin (left edge of each top-level content block), band (empty space above the tab bar or the 818 safe area, non-scrolling
// frames only; frames with a sheet are skipped), gap (content itemSpacing), pad (card paddings), rows (row heights), title size.
const CHROME = /^(OrbitBackdrop|Status ?Bar|Home ?Indicator|Tab Bar|Scroll edge fade|Nav Header|Scrim|Sheet|Sheet Content|Too dark overlay|Banner|Loading|No connection|Back · hit area.*)$/;
const pg = await figma.getNodeByIdAsync(args.pageId); await pg.loadAsync();
const frames = pg.findAll(n => n.type === 'FRAME' && Math.abs(n.width - 393) < 1 && n.parent && (n.parent.type === 'PAGE' || n.parent.type === 'SECTION') && !/^Moment/.test(n.name));
const out = [];
for (const f of frames) { if (!f.visible) continue; const r = { name: f.name, id: f.id }; const sheet = !!f.children.find(n => n.name === 'Sheet');
  const blocks = f.children.filter(n => n.visible && !CHROME.test(n.name.split(' (')[0]) && !/^Status Bar/.test(n.name));
  const lefts = new Set(); let bottom = 0;
  for (const b of blocks) { if (b.layoutMode && b.layoutMode !== 'NONE' && b.width >= 380) { lefts.add(Math.round(b.x + b.paddingLeft)); const kids = b.children.filter(k => k.visible && k.layoutPositioning !== 'ABSOLUTE'); for (const k of kids) bottom = Math.max(bottom, b.y + k.y + k.height); } else { lefts.add(Math.round(b.x)); bottom = Math.max(bottom, b.y + b.height); } }
  r.margins = [...lefts]; const tb = f.children.find(n => n.name === 'Tab Bar'); const limit = tb ? tb.y : 818; r.bottom = Math.round(bottom); r.limit = limit;
  r.band = sheet ? null : (bottom <= limit ? Math.round(limit - bottom) : -Math.round(bottom - limit));
  const c = blocks.find(b => b.layoutMode === 'VERTICAL' && b.width >= 380); if (c) r.gap = c.itemSpacing;
  const pads = new Set(); for (const k of f.findAll(n => n.type === 'FRAME' && n.layoutMode && n.layoutMode !== 'NONE' && n.cornerRadius >= 16 && n.fills && n.fills.length && n.width > 200)) pads.add(k.paddingTop + '/' + k.paddingLeft); r.pads = [...pads];
  const rows = new Set(); for (const k of f.findAll(n => /^Row \/|^OutNowRow|^HistoryRow/.test(n.name) && n.visible)) rows.add(Math.round(k.height)); r.rows = [...rows];
  let big = null; for (const t of f.findAll(n => n.type === 'TEXT' && n.visible && n.absoluteTransform[1][2] - f.absoluteTransform[1][2] < 260)) { if (!big || t.fontSize > big.fontSize) big = t; } r.title = big ? (big.fontSize + ' ' + big.characters.slice(0, 18).replace(/\n/g, ' ')) : null;
  out.push(r); }
return out;
