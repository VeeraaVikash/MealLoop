// Brand audit A3 unstyled-text scan and exact-match apply (stored as mealloop/txt15). Body of async function(figma, args).
// args: { pageId, from, to, section (bool), top (bool: every top-level node, for page 03), apply (bool) }
// A TEXT node counts when it is a loose layer (not inside an instance) or an instance child whose textStyleId is
// overridden. Unstyled = textStyleId === '' (single style) ; mixed = figma.mixed (several runs, reported only).
// An unstyled node matches a local text style only when family, style, size, line height (unit and value), letter
// spacing (unit and value), text case, decoration, paragraph spacing and paragraph indent are all equal. apply sets
// the style on exact matches only (fonts loaded first), which changes no glyph.
figma.skipInvisibleInstanceChildren = false;
const styles = await figma.getLocalTextStylesAsync();
const eq = (a, b) => Math.abs(a - b) < 0.01;
const sig = t => [t.fontName.family, t.fontName.style, t.fontSize, t.lineHeight.unit, t.lineHeight.unit === 'AUTO' ? 0 : Math.round(t.lineHeight.value * 100) / 100, t.letterSpacing.unit, Math.round(t.letterSpacing.value * 100) / 100, t.textCase, t.textDecoration, t.paragraphSpacing || 0, t.paragraphIndent || 0].join('|');
const bySig = {}; for (const s of styles) bySig[sig(s)] = s;
const page = await figma.getNodeByIdAsync(args.pageId);
let roots = page.children.filter(n => args.top ? 'findAll' in n : (n.type === 'FRAME' && Math.abs(n.width - 393) < 1));
if (args.section) for (const s of page.children.filter(n => n.type === 'SECTION')) roots = roots.concat(s.children.filter(n => n.type === 'FRAME' || n.type === 'COMPONENT'));
roots = roots.slice(args.from || 0, args.to || 99999);
const out = { roots: roots.length, texts: 0, styled: 0, unstyled: 0, mixed: 0, match: 0, applied: 0, bySize: {}, matches: {}, noMatch: {}, failed: [], frames: {} };
const inInst = n => { let p = n.parent; while (p && p.type !== 'PAGE') { if (p.type === 'INSTANCE') return p; p = p.parent; } return null; };
for (const r of roots) {
  const texts = r.type === 'TEXT' ? [r] : r.findAll(n => n.type === 'TEXT');
  for (const t of texts) {
    const ins = inInst(t);
    if (ins) { let top = ins; let p = ins.parent; while (p && p.type !== 'PAGE') { if (p.type === 'INSTANCE') top = p; p = p.parent; }
      const ov = (top.overrides || []).find(o => o.id === t.id); if (!ov || !ov.overriddenFields.includes('textStyleId') && !ov.overriddenFields.includes('fontSize') && !ov.overriddenFields.includes('fontName')) continue; }
    out.texts++;
    if (t.textStyleId === figma.mixed) { out.mixed++; continue; }
    if (t.textStyleId) { out.styled++; continue; }
    if (t.fontName === figma.mixed || t.fontSize === figma.mixed || t.lineHeight === figma.mixed || t.letterSpacing === figma.mixed) { out.mixed++; continue; }
    out.unstyled++;
    out.bySize[t.fontSize] = (out.bySize[t.fontSize] || 0) + 1;
    const fk = r.name.slice(0, 36); out.frames[fk] = (out.frames[fk] || 0) + 1;
    const k = sig(t); const s = bySig[k];
    if (!s) { const nk = t.fontName.family + ' ' + t.fontName.style + ' ' + t.fontSize + '/' + (t.lineHeight.unit === 'AUTO' ? 'auto' : Math.round(t.lineHeight.value * 10) / 10 + (t.lineHeight.unit === 'PERCENT' ? '%' : '')) + (t.textCase !== 'ORIGINAL' ? ' ' + t.textCase : ''); out.noMatch[nk] = (out.noMatch[nk] || 0) + 1; continue; }
    out.match++; out.matches[s.name] = (out.matches[s.name] || 0) + 1;
    if (args.apply) { try { await figma.loadFontAsync(t.fontName); await figma.loadFontAsync(s.fontName); await t.setTextStyleIdAsync(s.id); out.applied++; } catch (e) { out.failed.push(t.id + ' ' + e.message.slice(0, 60)); } }
  }
}
if (!args.frames) delete out.frames;
return out;
