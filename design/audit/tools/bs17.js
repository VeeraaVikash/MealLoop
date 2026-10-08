// Brand audit A7 brand-sheet helpers (stored as mealloop/bs17). Body of async function(figma, args) -> H.
// H.v(name) -> ML Color / ML Layout variable by name. H.paint(name) -> SOLID paint bound to that colour variable.
// H.frame(parent, name, {dir:'V'|'H', gap, pad, fill, radius, wrap, w, stroke}) -> auto-layout frame (hug unless w).
// H.text(parent, chars, styleName, colourName, {w}) -> text with the local text style applied and a bound fill.
// H.inst(parent, setId, variantProps, props) -> instance of a component set variant (or a component) with properties.
const vars = {}; for (const c of await figma.variables.getLocalVariableCollectionsAsync()) if (/^ML /.test(c.name)) for (const id of c.variableIds) { const v = await figma.variables.getVariableByIdAsync(id); vars[v.name] = v; }
const styles = {}; for (const s of await figma.getLocalTextStylesAsync()) { styles[s.name] = s; }
const H = {};
H.vars = vars; H.styles = styles;
H.v = n => vars[n];
H.paint = n => figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', vars[n]);
H.frame = (parent, name, o = {}) => { const f = figma.createFrame(); f.name = name; f.layoutMode = o.dir === 'H' ? 'HORIZONTAL' : 'VERTICAL'; f.itemSpacing = o.gap || 0;
  const p = o.pad || 0; f.paddingTop = f.paddingBottom = f.paddingLeft = f.paddingRight = p; f.fills = o.fill ? [H.paint(o.fill)] : []; f.cornerRadius = o.radius || 0;
  if (o.stroke) { f.strokes = [H.paint(o.stroke)]; f.strokeWeight = 1; }
  if (parent) parent.appendChild(f);
  f.primaryAxisSizingMode = 'AUTO'; f.counterAxisSizingMode = 'AUTO';
  if (o.wrap) f.layoutWrap = 'WRAP';
  if (o.w) { if (f.layoutMode === 'HORIZONTAL') { f.primaryAxisSizingMode = 'FIXED'; f.resize(o.w, f.height || 10); } else { f.counterAxisSizingMode = 'FIXED'; f.resize(o.w, f.height || 10); } }
  return f; };
H.text = async (parent, chars, styleName, colour, o = {}) => { const s = styles[styleName]; await figma.loadFontAsync(s.fontName); const t = figma.createText(); t.fontName = s.fontName; t.characters = chars; await t.setTextStyleIdAsync(s.id);
  t.fills = [H.paint(colour || 'ink')]; if (parent) parent.appendChild(t); if (o.w) { t.textAutoResize = 'HEIGHT'; t.resize(o.w, t.height); } return t; };
H.inst = async (parent, setId, vp, props) => { const s = await figma.getNodeByIdAsync(setId); let m = s;
  if (s.type === 'COMPONENT_SET') { m = s.children.find(c => Object.entries(vp || {}).every(([k, v]) => c.variantProperties[k] === v)) || s.defaultVariant; }
  const i = m.createInstance(); if (parent) parent.appendChild(i);
  if (props) { const set = {}; for (const [k, v] of Object.entries(props)) { const key = Object.keys(i.componentProperties).find(x => x.split('#')[0] === k); if (key) set[key] = v; } if (Object.keys(set).length) i.setProperties(set); }
  return i; };
return H;
