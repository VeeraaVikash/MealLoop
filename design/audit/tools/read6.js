// Final-fix F6 readability pass (stored as mealloop/read6). Body of async function(figma, args) -> { rows, summary }.
// args: { pageId, from, to, apply, skipRe }  (frames sliced [from, to) to stay under the time limit)
// Checks per frame (393-wide, name not matching skipRe):
//  T1 text under 12 pt (tab labels excepted)                  -> fix: ML/Footnote (13) or ML/Mono Footnote (13)
//  T2 mono times / numbers under 13 pt                          -> fix: ML/Mono Footnote (13)
//  C1 grey text lighter than #6B6B66 on white or the wash        -> fix: ink 2 (45:7, #5C5C58, 6.6:1 on white)
//  D1 faded text (node or ancestor opacity < 0.95, not a scrim) -> fix: opacity 1; faded Button/DecisionActions get a dashed ink-2 outline
//  W1 truncated text                                            -> fix: wrap (truncation off, height grows)
//  H1 tappable rows or buttons under 44 pt tall (pills and chips excepted) -> report only
figma.skipInvisibleInstanceChildren = false;
const page = await figma.getNodeByIdAsync(args.pageId);
const styles = await figma.getLocalTextStylesAsync(); const S = n => styles.find(s => s.name === n);
const FOOT = S('ML/Footnote'), MONO13 = S('ML/Mono Footnote');
const V = async id => figma.variables.getVariableByIdAsync('VariableID:' + id);
const ink2 = await V('45:7');
const lum = c => { const f = v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b); };
const LIMIT = lum({ r: 0x6B / 255, g: 0x6B / 255, b: 0x66 / 255 });
const resolve = async p => { if (!p || p.type !== 'SOLID') return null; if (p.boundVariables && p.boundVariables.color) { let v = await figma.variables.getVariableByIdAsync(p.boundVariables.color.id); let val; for (let i = 0; i < 5 && v; i++) { const col = await figma.variables.getVariableCollectionByIdAsync(v.variableCollectionId); val = v.valuesByMode[col.defaultModeId]; if (val && val.type === 'VARIABLE_ALIAS') v = await figma.variables.getVariableByIdAsync(val.id); else break; } return val && 'r' in val ? val : p.color; } return p.color; };
const bgOf = async (n, f) => { let p = n.parent; while (p && p !== f.parent) { if ('fills' in p && p.fills !== figma.mixed && p.fills.length) { const vis = p.fills.filter(x => x.visible !== false); const top = vis[vis.length - 1]; if (top && top.type === 'SOLID' && (top.opacity === undefined || top.opacity > 0.5)) return await resolve(top); if (top && top.type !== 'SOLID') return { r: 0.92, g: 0.95, b: 0.85 }; } p = p.parent; } return { r: 0.93, g: 0.93, b: 0.91 }; };
const frames = page.children.filter(n => n.type === 'FRAME' && Math.abs(n.width - 393) < 1 && !(args.skipRe && new RegExp(args.skipRe).test(n.name))).slice(args.from || 0, args.to || 9999);
const rows = []; const sum = { T1: 0, T2: 0, C1: 0, D1: 0, W1: 0, H1: 0 };
const RX = /\d+(?:[:.,]\d+)*(?:\s?(?:AM|PM))?/;
for (const f of frames) {
  const vis = n => { let p = n; while (p && p !== f) { if (p.visible === false) return false; p = p.parent; } return true; };
  const inTab = n => { let p = n.parent; while (p && p !== f) { if (p.name === 'Tab Bar' || /^Tab \//.test(p.name)) return true; p = p.parent; } return false; };
  const sheetBg = (() => { const si = f.children.findIndex(c => c.name === 'Scrim' && c.visible); return n => { if (si < 0) return false; let t = n; while (t.parent !== f) t = t.parent; return f.children.indexOf(t) < si; }; })();
  const r = { frame: f.name, T1: [], T2: [], C1: [], D1: [], W1: [], H1: [] };
  for (const t of f.findAllWithCriteria({ types: ['TEXT'] })) {
    if (!vis(t) || inTab(t) || !t.characters.trim() || sheetBg(t)) continue;
    const segs = t.getStyledTextSegments(['fontSize', 'fontName', 'textStyleId']);
    for (const s of segs) {
      const mono = /Mono/.test(s.fontName.family);
      if (s.fontSize < 12) { r.T1.push(s.characters.slice(0, 24) + ' ' + s.fontSize + '→13'); if (args.apply) { const st = mono ? MONO13 : FOOT; await figma.loadFontAsync(st.fontName); await t.setRangeTextStyleIdAsync(s.start, s.end, st.id); } }
      else if (mono && s.fontSize < 13 && RX.test(s.characters)) { r.T2.push(s.characters.slice(0, 24) + ' ' + s.fontSize + '→13'); if (args.apply) { await figma.loadFontAsync(MONO13.fontName); await t.setRangeTextStyleIdAsync(s.start, s.end, MONO13.id); } }
    }
    const fills = t.fills !== figma.mixed ? t.fills : t.getRangeFills(0, 1); const c = fills && fills !== figma.mixed && fills[0] ? await resolve(fills[0]) : null;
    if (c) { const bg = await bgOf(t, f); const lb = bg ? lum(bg) : 1; const lc = lum(c); const op = (fills[0].opacity === undefined ? 1 : fills[0].opacity);
      if (lb > 0.5 && (lc > LIMIT + 0.002 || op < 0.95)) { r.C1.push(t.characters.slice(0, 24)); if (args.apply) t.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', ink2)]; } }
    if (t.textTruncation === 'ENDING') { r.W1.push(t.characters.slice(0, 24)); if (args.apply) { t.textTruncation = 'DISABLED'; try { t.textAutoResize = 'HEIGHT'; } catch (e) {} } }
  }
  for (const n of f.findAll(x => 'opacity' in x && x.opacity < 0.95 && x.opacity > 0 && !/Scrim|fade|Fade|Dismiss|Track|Ghost|ghost|Hairline|Divider|Line|Rule|Card · edge|Grid/.test(x.name))) {
    if (!vis(n) || sheetBg(n) || inTab(n)) continue; const hasText = n.type === 'TEXT' || ('findOne' in n && n.findOne(x => x.type === 'TEXT' && x.visible && x.characters.trim()));
    if (!hasText) continue; r.D1.push(n.name.slice(0, 30) + ' ' + n.opacity.toFixed(2));
    if (args.apply) { n.opacity = 1; if (n.type === 'INSTANCE' && /Button|Primary|Secondary|Approve|Decline|Disabled/i.test(n.name)) { n.strokes = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', ink2)]; n.strokeWeight = 1.5; n.dashPattern = [6, 4]; } }
  }
  for (const n of f.findAll(x => x.reactions && x.reactions.length && x.type !== 'TEXT')) {
    if (!vis(n) || inTab(n) || sheetBg(n) || n === f) continue; if (/Pill|Chip|Tab|Dot|dot|Scope|Rules|Info|Dismiss|Search|Avatar|Icon|Link|Votes|Back/.test(n.name)) continue;
    if (n.height < 44) { r.H1.push(n.name.slice(0, 30) + ' ' + Math.round(n.height)); }
  }
  for (const k of Object.keys(sum)) sum[k] += r[k].length;
  if (r.T1.length + r.T2.length + r.C1.length + r.D1.length + r.W1.length + r.H1.length) rows.push(r);
}
return { frames: frames.length, rows, sum };
