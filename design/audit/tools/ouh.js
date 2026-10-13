// Outings run helpers (stored as mealloop/ouh). Body of async function(figma, args) -> H (bs17 plus the helpers below).
// H.icon(parent, name, size, colour) -> Symbol-set instance recoloured to a bound token.
// H.pill(parent, label, state) -> StatusPill instance.  H.btn(parent, label, style, w, h, opts) -> Button instance, fixed size.
// H.t(parent, chars, style, colour, w) -> shorthand for H.text with optional width.  H.row(parent, name, gap) -> horizontal hug frame.
// H.fill(n) -> layoutSizingHorizontal FILL.  H.dash(n, colour) -> dashed 1.5 pt stroke.
const AF = Object.getPrototypeOf(async function(){}).constructor;
const H = await new AF('figma', 'args', figma.root.getSharedPluginData('mealloop', 'bs17'))(figma, {});
const sym = await figma.getNodeByIdAsync('73:163');
H.sym = n => sym.children.find(c => c.name === 'Name=' + n);
H.icon = (parent, name, size, colour) => { const c = H.sym(name); if (!c) throw new Error('icon ' + name); const i = c.createInstance(); i.resize(size, size); if (parent) parent.appendChild(i); i.name = 'Icon / ' + name;
  if (colour) for (const v of i.findAll(n => 'fills' in n && n.type !== 'INSTANCE' && n.type !== 'FRAME')) { if (v.fills && v.fills.length) v.fills = [H.paint(colour)]; if (v.strokes && v.strokes.length) v.strokes = [H.paint(colour)]; }
  return i; };
H.pill = async (parent, label, state) => H.inst(parent, '808:86801', { State: state }, { Label: label });
H.btn = async (parent, label, style, w, h, o = {}) => { const b = await H.inst(parent, '74:81', { Style: style || 'Primary', State: o.state || 'Default' }, { Label: label, 'Show Icon': !!o.icon }); if (w === 'fill') { b.layoutSizingHorizontal = 'FILL'; } else if (w) b.resize(w, h || 56); if (h) { b.resize(b.width, h); } b.name = 'Button / ' + label; return b; };
H.t = async (parent, chars, style, colour, w) => { const t = await H.text(parent, chars, 'ML/' + style, colour || 'ink', w ? { w } : {}); t.name = chars.slice(0, 40); return t; };
H.row = (parent, name, gap, o = {}) => H.frame(parent, name, Object.assign({ dir: 'H', gap: gap || 8 }, o));
H.fill = n => { n.layoutSizingHorizontal = 'FILL'; return n; };
H.dash = (n, colour) => { n.strokes = [H.paint(colour || 'ink')]; n.strokeWeight = 1.5; n.dashPattern = [6, 4]; return n; };
H.arc = (parent, d, a0, a1, inner, colour) => { const e = figma.createEllipse(); e.resize(d, d); e.arcData = { startingAngle: a0, endingAngle: a1, innerRadius: inner }; e.fills = [H.paint(colour)]; if (parent) parent.appendChild(e); return e; };
return H;
