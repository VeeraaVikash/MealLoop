// Final-2 staff builder (stored as mealloop/sb2). Body of async function(figma, args) -> B (helper object).
// Page 09 grid: x = col * 473, y = row * 1092 (393 frame + 80 gap; 852 frame + 240 row gap).
// B.frame(name, col, row, bg 'wash'|'lime'|'black') -> frame with StatusBar + HomeIndicator.
// B.nav(f, title, {back, close, dark}) -> NavHeader Inline Title (centred title) at y 54; Back round 44 at 16,58; Close (x) top-right.
// B.head(f, title, sub, y) -> large greeting header. B.content(f, y) -> 353-wide vertical stack at x 20.
// B.text(parent, chars, style, paint, {hug, align, mono:false, name}); numbers/times/units in mono by size.
// B.al(parent, dir, {gap, pad, padX, padY, fill, r, name, stroke, dashed, hug, align}).
// B.button(target, label, kind 'black'|'lime'|'outline'|'dashed'|'white', {y, h}) -> Button instance, 353 x 60.
// B.tile(parent, {value, unit, title, line, large, dashed, icon}); B.row(parent) -> horizontal pair.
// B.pill(parent, label, kind 'lime'|'black'|'outline'|'dashed'|'white', {icon}); B.icon(parent, name, size, paint).
// B.stepper(parent, value, unit); B.listRow(parent, title, sub, {chev, value}); B.tab(f, 'Home'|'Alerts'|'Me').
// B.circle(parent, size, fill, iconName, iconPaint, {ring}); B.banner(parent, text) (offline banner, dashed).
// B.ann(f, label, time); B.go = H.go.
figma.skipInvisibleInstanceChildren = false;
const AF = Object.getPrototypeOf(async function(){}).constructor;
const H = await new AF('figma', 'args', figma.root.getSharedPluginData('mealloop', 'h24'))(figma, {});
const B = { H, go: H.go };
B.page = await figma.getNodeByIdAsync(args && args.pageId ? args.pageId : '732:2');
B.C = {};
const CV = { ink: '45:6', ink2: '45:7', surface: '45:4', border: '45:8', bctl: '45:9', lime: '45:15', hero: '51:3', onHero: '45:28', onHero2: '51:5', onLime: '58:2', glass: '58:4', canvas: '45:3', quiet: '45:13' };
for (const k of Object.keys(CV)) B.C[k] = await H.paint(CV[k]);
B.wash = JSON.parse(figma.root.getSharedPluginData('mealloop', 'wash9'));
B.symSet = await figma.getNodeByIdAsync('73:163');
B.symId = n => { const v = B.symSet.children.find(c => c.name === 'Name=' + n); if (!v) throw new Error('no symbol ' + n); return v; };
B.recolor = (root, paint) => { const all = [root, ...('findAll' in root ? root.findAll(() => true) : [])]; for (const n of all) { if ('fills' in n && n.fills !== figma.mixed && n.fills.length && n.type !== 'FRAME' && n.type !== 'INSTANCE' && n.type !== 'COMPONENT') n.fills = [paint]; if ('strokes' in n && n.strokes.length && n.type !== 'FRAME' && n.type !== 'INSTANCE') n.strokes = [paint]; } };
B.icon = (parent, name, size, paint) => { const i = B.symId(name).createInstance(); parent.appendChild(i); i.resize(size || 24, size || 24); if (paint) B.recolor(i, paint); i.name = 'Icon / ' + name; return i; };
B.frame = async (name, col, row, bg) => {
  const f = figma.createFrame(); B.page.appendChild(f); f.name = name; f.resize(393, 852); f.x = col * 473; f.y = row * 1092; f.clipsContent = true;
  f.fills = bg === 'lime' ? [B.C.lime] : bg === 'black' ? [B.C.hero] : B.wash;
  const sb = (await figma.getNodeByIdAsync('74:2')).createInstance(); f.appendChild(sb); sb.x = 0; sb.y = 0;
  const hi = (await figma.getNodeByIdAsync('74:21')).createInstance(); f.appendChild(hi); hi.x = 0; hi.y = 818;
  if (bg === 'black') { await H.loadAll(sb); B.recolor(sb, B.C.onHero); B.recolor(hi, B.C.onHero); }
  return f;
};
B.MONO = { 17: 'ML/Code', 15: 'ML/Mono Body', 13: 'ML/Mono Footnote', 12: 'ML/Mono Footnote' };
B.RX = /[−+]?\d+(?:[:.,]\d+)*(?:–\d+(?:[:.,]\d+)*)?(?:%|\s?(?:AM|PM|kg|L|g|min|pts|s)\b)?/g;
B.text = async (parent, chars, style, paint, o) => {
  o = o || {}; const st = H.S(style); if (!st) throw new Error('no style ' + style);
  const t = figma.createText(); parent.appendChild(t); await figma.loadFontAsync(st.fontName); await t.setTextStyleIdAsync(st.id); t.characters = chars; t.fills = [paint || B.C.ink]; t.name = o.name || chars.slice(0, 40);
  if (parent.layoutMode && parent.layoutMode !== 'NONE') { if (o.hug) { t.layoutSizingHorizontal = 'HUG'; t.textAutoResize = 'WIDTH_AND_HEIGHT'; } else { t.layoutSizingHorizontal = 'FILL'; t.textAutoResize = 'HEIGHT'; } } else t.textAutoResize = o.w ? 'HEIGHT' : 'WIDTH_AND_HEIGHT';
  if (o.w) { t.resize(o.w, t.height); t.textAutoResize = 'HEIGHT'; }
  if (o.align) t.textAlignHorizontal = o.align;
  const ms = o.mono === false ? null : H.S(B.MONO[st.fontSize]);
  if (ms) { await figma.loadFontAsync(ms.fontName); let m; B.RX.lastIndex = 0; while ((m = B.RX.exec(chars))) if (m[0].length && /\d/.test(m[0])) await t.setRangeTextStyleIdAsync(m.index, m.index + m[0].length, ms.id); }
  return t;
};
B.al = (parent, dir, o) => {
  o = o || {}; const fr = figma.createFrame(); parent.appendChild(fr); fr.layoutMode = dir; fr.primaryAxisSizingMode = 'AUTO'; fr.counterAxisSizingMode = 'AUTO';
  fr.itemSpacing = o.gap !== undefined ? o.gap : 12; const px = o.padX !== undefined ? o.padX : (o.pad || 0), py = o.padY !== undefined ? o.padY : (o.pad || 0);
  fr.paddingLeft = px; fr.paddingRight = px; fr.paddingTop = py; fr.paddingBottom = py; fr.fills = o.fill ? [o.fill] : []; fr.cornerRadius = o.r || 0; fr.name = o.name || 'Group'; fr.clipsContent = false;
  if (o.align) fr.counterAxisAlignItems = o.align; if (o.main) fr.primaryAxisAlignItems = o.main;
  if (parent.layoutMode && parent.layoutMode !== 'NONE') { fr.layoutSizingHorizontal = o.hug ? 'HUG' : 'FILL'; }
  if (o.stroke) { fr.strokes = [o.stroke]; fr.strokeWeight = o.sw || 1.5; if (o.dashed) fr.dashPattern = [6, 4]; }
  return fr;
};
B.content = (f, y, name) => { const c = figma.createFrame(); f.appendChild(c); c.name = name || 'Content'; c.layoutMode = 'VERTICAL'; c.primaryAxisSizingMode = 'AUTO'; c.counterAxisSizingMode = 'FIXED'; c.resize(353, 10); c.primaryAxisSizingMode = 'AUTO'; c.x = 20; c.y = y; c.itemSpacing = 12; c.fills = []; c.clipsContent = false; return c; };
B.nav = async (f, title, o) => {
  o = o || {}; const nh = (await figma.getNodeByIdAsync('74:124')).createInstance(); f.appendChild(nh); nh.x = 0; nh.y = 54; await H.loadAll(nh);
  H.setP(nh, { Title: title, 'Show Back': o.back !== false, 'Show Trailing': !!o.close }); nh.name = 'Nav · ' + title;
  const back = nh.findOne(n => n.name === 'Back'); let close = null;
  if (o.close) { close = nh.findOne(n => n.name === 'Trailing'); H.setP(close, { Icon: B.symId('xmark').id }); close.name = 'Close'; }
  if (o.dark) { const t = nh.findOne(n => n.type === 'TEXT' && n.name === 'Title'); t.fills = [B.C.onHero]; }
  return { nh, back, close };
};
B.head = async (f, title, sub, y) => { const g = figma.createFrame(); f.appendChild(g); g.name = 'Header'; g.layoutMode = 'VERTICAL'; g.primaryAxisSizingMode = 'AUTO'; g.counterAxisSizingMode = 'FIXED'; g.resize(353, 10); g.primaryAxisSizingMode = 'AUTO'; g.x = 20; g.y = y || 66; g.itemSpacing = 4; g.fills = [];
  await B.text(g, title, 'ML/Large Title', B.C.ink, { name: 'Title' }); if (sub) await B.text(g, sub, 'ML/Secondary', B.C.ink2, { name: 'Subtitle' }); return g; };
B.button = async (target, label, kind, o) => {
  o = o || {}; const v = await figma.getNodeByIdAsync(kind === 'white' || kind === 'outline' || kind === 'dashed' ? '74:47' : '74:30'); const b = v.createInstance(); target.appendChild(b); await H.loadAll(b);
  H.setP(b, { Label: label, 'Show Icon': false }); b.name = 'Button · ' + label;
  if (target.layoutMode && target.layoutMode !== 'NONE') { b.layoutSizingHorizontal = 'FILL'; b.layoutSizingVertical = 'FIXED'; b.resize(b.width, o.h || 60); } else { b.resize(o.w || 353, o.h || 60); b.x = o.x !== undefined ? o.x : 20; b.y = o.y; }
  b.primaryAxisAlignItems = 'CENTER';
  const lab = b.findOne(n => n.type === 'TEXT');
  if (kind === 'lime') { b.fills = [B.C.lime]; lab.fills = [B.C.onLime]; }
  if (kind === 'outline') { b.fills = []; b.strokes = [B.C.ink]; b.strokeWeight = 1.5; }
  if (kind === 'outline-dark') { b.fills = []; b.strokes = [B.C.onHero]; b.strokeWeight = 1.5; lab.fills = [B.C.onHero]; }
  if (kind === 'dashed') { b.fills = []; b.strokes = [B.C.ink2]; b.strokeWeight = 1.5; b.dashPattern = [6, 4]; lab.fills = [B.C.ink2]; }
  return b;
};
B.tile = async (parent, o) => {
  const t = B.al(parent, 'VERTICAL', { gap: 4, pad: 16, fill: o.dashed ? null : (o.dark ? B.C.hero : B.C.surface), r: 24, name: 'Tile · ' + o.title, stroke: o.dashed ? B.C.ink2 : null, dashed: o.dashed });
  t.minHeight = o.large ? 176 : 132; const fg = o.dark ? B.C.onHero : B.C.ink, fg2 = o.dark ? B.C.onHero2 : B.C.ink2;
  if (o.icon) B.icon(t, o.icon, 28, o.dashed ? B.C.ink2 : fg);
  if (o.value !== undefined) { const r = B.al(t, 'HORIZONTAL', { gap: 4, name: 'Value row', align: 'BASELINE' }); await B.text(r, o.value, o.large ? 'ML/Hero Metric' : 'ML/Metric', o.dashed ? B.C.ink2 : fg, { hug: true, mono: false, name: 'Value' }); if (o.unit) await B.text(r, o.unit, 'ML/Metric Unit', fg2, { hug: true, mono: false, name: 'Unit' }); }
  await B.text(t, o.title, 'ML/Body Semibold', o.dashed ? B.C.ink : fg, { name: 'Title' });
  if (o.line) await B.text(t, o.line, 'iOS/Caption', fg2, { name: 'Line' });
  return t;
};
B.row = (parent, gap) => B.al(parent, 'HORIZONTAL', { gap: gap !== undefined ? gap : 12, name: 'Row' });
B.grow = n => { n.layoutSizingHorizontal = 'FILL'; return n; };
B.pill = async (parent, label, kind, o) => {
  o = o || {}; const fill = kind === 'lime' ? B.C.lime : kind === 'black' ? B.C.hero : kind === 'white' ? B.C.surface : null;
  const p = B.al(parent, 'HORIZONTAL', { gap: 6, padX: 14, padY: 8, fill, r: 999, hug: true, name: 'Pill · ' + label, stroke: kind === 'outline' ? B.C.ink : kind === 'outline-dark' ? B.C.onHero : kind === 'dashed' ? B.C.ink2 : null, dashed: kind === 'dashed', align: 'CENTER' });
  const fg = kind === 'lime' ? B.C.onLime : kind === 'black' || kind === 'outline-dark' ? B.C.onHero : kind === 'dashed' ? B.C.ink2 : B.C.ink;
  if (o.icon) B.icon(p, o.icon, 16, fg); await B.text(p, label, o.style || 'ML/Tag', fg, { hug: true, name: 'Label' }); return p;
};
B.circle = (parent, size, fill, iconName, iconPaint, o) => { o = o || {}; const c = figma.createFrame(); parent.appendChild(c); c.resize(size, size); c.cornerRadius = size / 2; c.fills = fill ? [fill] : []; if (o.ring) { c.strokes = [o.ring]; c.strokeWeight = o.sw || 6; } c.layoutMode = 'HORIZONTAL'; c.primaryAxisAlignItems = 'CENTER'; c.counterAxisAlignItems = 'CENTER'; c.primaryAxisSizingMode = 'FIXED'; c.counterAxisSizingMode = 'FIXED'; c.name = o.name || 'Circle'; if (iconName) B.icon(c, iconName, Math.round(size * 0.46), iconPaint); return c; };
B.stepper = async (parent, value, unit, o) => {
  o = o || {}; const r = B.al(parent, 'HORIZONTAL', { gap: 12, name: 'Stepper', align: 'CENTER', main: 'SPACE_BETWEEN', fill: B.C.surface, r: 28, pad: 12 });
  const m = B.circle(r, 72, B.C.quiet, 'minus', B.C.ink, { name: 'Stepper · Less' });
  const v = B.al(r, 'HORIZONTAL', { gap: 6, hug: true, name: 'Amount', align: 'BASELINE' }); await B.text(v, value, 'ML/Hero Metric', B.C.ink, { hug: true, mono: false, name: 'Value' }); if (unit) await B.text(v, unit, 'ML/Hero Unit', B.C.ink2, { hug: true, mono: false, name: 'Unit' });
  const p = B.circle(r, 72, B.C.quiet, 'plus', B.C.ink, { name: 'Stepper · More' }); return r;
};
B.listRow = async (parent, title, sub, o) => {
  o = o || {}; const r = B.al(parent, 'HORIZONTAL', { gap: 12, padX: 16, padY: 14, fill: o.fill === null ? null : B.C.surface, r: 20, name: 'Row · ' + title, align: 'CENTER', stroke: o.dashed ? B.C.ink2 : null, dashed: o.dashed });
  r.minHeight = 64; if (o.icon) B.icon(r, o.icon, 24, B.C.ink);
  const tx = B.al(r, 'VERTICAL', { gap: 2, name: 'Text' }); await B.text(tx, title, o.titleStyle || 'ML/Body Semibold', B.C.ink, { name: 'Title' }); if (sub) await B.text(tx, sub, 'ML/Footnote', B.C.ink2, { name: 'Line' });
  if (o.value) await B.text(r, o.value, o.valueStyle || 'ML/Code', B.C.ink, { hug: true, name: 'Value', mono: o.valueMono }); if (o.pill) await B.pill(r, o.pill, o.pillKind || 'outline');
  if (o.chev !== false) B.icon(r, 'chevron.right', 20, B.C.ink2);
  return r;
};
B.tab = async (f, sel) => { const set = await figma.getNodeByIdAsync('1507:120513'); const i = set.children.find(v => v.name === 'Selected=' + sel).createInstance(); f.appendChild(i); i.x = Math.round((393 - i.width) / 2); i.y = 746; i.name = 'Tab Bar'; return i; };
B.banner = async (parent, text) => { const b = B.al(parent, 'HORIZONTAL', { gap: 10, padX: 16, padY: 12, fill: B.C.surface, r: 16, name: 'Offline banner', stroke: B.C.ink2, dashed: true, align: 'CENTER' }); B.icon(b, 'wifi.slash', 20, B.C.ink); await B.text(b, text, 'ML/Body Semibold', B.C.ink, { name: 'Message' }); return b; };
B.ann = async (f, label, time) => H.ann(B.page.id === '732:2' ? '732:2' : '811:21055', f, label, time);
B.bottom = (f, hasTab) => hasTab ? 746 - 16 - 60 : 818 - 8 - 60;
return B;
// Later patches applied to the stored copy (Final-2 G2):
// B.fix(f, content): if the content ends below the tab-bar top − 20 (726; 798 without a tab bar), content gets 126 pt bottom
//   padding, the frame scrolls vertically, and StatusBar / Tab Bar / HomeIndicator become fixed children.
// B.home(name, col, row, job, {alert, banner, tiles: [[tile, tile], [tile]], rows: [[title, line, icon]], endLine}):
//   greeting "Hi Ravi", subtitle "Main Mess · Lunch shift · <job>", optional black alert card with lime "Open alert",
//   tile rows (tiles in a pair stretch to equal height), list rows, an "End shift" row, StaffTabBar Home, B.fix.
