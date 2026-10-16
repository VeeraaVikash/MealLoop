// Polish Q6 ticket page (stored as mealloop/q6ticket). Body of async function(figma, args). args: { items: [spec] }
// spec: { id, title, subtitle, time, tab?, top, codeLabel?, code?, dim?, big?, bigSub?, colour?: {label, bg, fg, outline?}, changes?, item, chip: 'Valid'|'Used'|label, noteTitle, noteBody }
// Per design/reference/polish_2026-10/P04: one centred axis; the ticket card fills the page down to the note; Code, large mono code, Colour, colour pill,
// "Changes in 9 s", perforation with side notches, stub (name and masked ID, item, chip), note below. Rebuilt in place (S.reframe);
// frame-level timers, the Back destination and the status-bar time skip are restored.
const AF = Object.getPrototypeOf(async function(){}).constructor;
const S = await new AF('figma', 'args', figma.root.getSharedPluginData('mealloop', 'srh'))(figma, {});
const out = [];
for (const it of args.items) {
  const f = await figma.getNodeByIdAsync(it.id);
  const keepFrame = (f.reactions || []).map(r => ({ trigger: r.trigger, actions: r.actions }));
  const ob = f.findOne(n => n.name === 'Back' && n.reactions && n.reactions.length); const backR = ob ? ob.reactions.map(r => ({ trigger: r.trigger, actions: r.actions })) : null;
  const os = f.findOne(n => n.name === 'Status Bar' && n.reactions && n.reactions.length); const sbR = os ? os.reactions.map(r => ({ trigger: r.trigger, actions: r.actions })) : null;
  const { c } = await S.reframe(f, { title: it.title, subtitle: it.subtitle, back: true, tab: it.tab || 'Home', time: it.time });
  c.itemSpacing = 16; c.counterAxisAlignItems = 'CENTER';
  const card = S.frame(c, 'Ticket', { gap: 0, fill: 'surface', radius: 28 }); card.layoutSizingHorizontal = 'FILL'; card.counterAxisAlignItems = 'CENTER'; card.clipsContent = false;
  const top = S.frame(card, 'Code area', { gap: 8 }); top.layoutSizingHorizontal = 'FILL'; top.counterAxisAlignItems = 'CENTER'; top.primaryAxisAlignItems = 'CENTER'; top.paddingLeft = top.paddingRight = 24; top.paddingTop = 24; top.paddingBottom = 16;
  const t0 = await S.text(top, it.top, 'ML/Secondary', 'ink-secondary'); t0.textAlignHorizontal = 'CENTER';
  const sp = figma.createFrame(); sp.name = 'Space'; sp.fills = []; sp.resize(1, 8); top.appendChild(sp);
  await S.text(top, it.codeLabel || 'Code', 'ML/Secondary', 'ink-secondary');
  if (it.code) { const cd = await S.text(top, it.code, 'ML/Hero Metric', it.dim ? 'ink-secondary' : 'ink'); cd.fontSize = 80; cd.name = 'Code'; }
  if (it.big) { const bg = await S.text(top, it.big, 'ML/Title', 'ink'); bg.name = 'Opens'; if (it.bigSub) await S.text(top, it.bigSub, 'ML/Metric Unit', 'ink-secondary'); }
  const sp2 = figma.createFrame(); sp2.name = 'Space'; sp2.fills = []; sp2.resize(1, 4); top.appendChild(sp2);
  if (it.colour) { await S.text(top, 'Colour', 'ML/Secondary', 'ink-secondary'); const p = S.frame(top, 'Colour pill · ' + it.colour.label, { dir: 'H', radius: 28 }); p.resize(220, 56); p.layoutSizingHorizontal = 'FIXED'; p.layoutSizingVertical = 'FIXED'; p.primaryAxisAlignItems = 'CENTER'; p.counterAxisAlignItems = 'CENTER';
    p.fills = [S.paint(it.colour.bg)]; if (it.colour.outline) { p.strokes = [S.paint('lime-outline')]; p.strokeWeight = 1.5; p.strokeAlign = 'INSIDE'; } await S.text(p, it.colour.label, 'ML/Section', it.colour.fg); }
  if (it.changes) { const ch = await S.text(top, it.changes, 'ML/Secondary', 'ink-secondary'); ch.textAlignHorizontal = 'CENTER'; }
  const pf = figma.createFrame(); pf.name = 'Perforation'; pf.fills = []; pf.layoutMode = 'NONE'; card.appendChild(pf); pf.layoutSizingHorizontal = 'FILL'; pf.resize(353, 24); pf.clipsContent = false;
  const ln = figma.createLine(); ln.name = 'Perforation line'; pf.appendChild(ln); ln.x = 24; ln.y = 12; ln.resize(305, 0); ln.strokes = [S.paint('border')]; ln.strokeWeight = 1.5; ln.dashPattern = [6, 5];
  for (const [nm, x] of [['Notch left', -12], ['Notch right', 341]]) { const e = figma.createEllipse(); e.name = nm; e.resize(24, 24); e.x = x; e.y = 0; e.fills = [S.paint('canvas')]; pf.appendChild(e); }
  const st = S.frame(card, 'Stub', { dir: 'H', gap: 12 }); st.layoutSizingHorizontal = 'FILL'; st.counterAxisAlignItems = 'CENTER'; st.paddingLeft = st.paddingRight = 24; st.paddingTop = 16; st.paddingBottom = 24;
  const sc = S.frame(st, 'Stub text', { gap: 4 }); sc.layoutGrow = 1; await S.text(sc, 'Aarav ••0238', 'ML/Section', 'ink'); const si = await S.text(sc, it.item, 'ML/Secondary', 'ink-secondary'); si.layoutSizingHorizontal = 'FILL'; si.textAutoResize = 'HEIGHT';
  const chp = S.frame(st, 'Chip · ' + it.chip, { dir: 'H', radius: 22 }); chp.paddingLeft = chp.paddingRight = 16; chp.paddingTop = chp.paddingBottom = 8; chp.counterAxisAlignItems = 'CENTER';
  if (it.chip === 'Valid') { chp.fills = [S.paint('lime')]; chp.strokes = [S.paint('lime-outline')]; chp.strokeWeight = 1.5; chp.strokeAlign = 'INSIDE'; await S.text(chp, 'Valid', 'ML/Secondary Medium', 'on-lime'); }
  else if (it.chip === 'Used') { chp.fills = [S.paint('fill-quiet')]; await S.text(chp, 'Used', 'ML/Secondary Medium', 'ink-secondary'); }
  else { chp.fills = []; S.dash(chp, 'ink'); await S.text(chp, it.chip, 'ML/Secondary Medium', 'ink'); }
  const nt = S.frame(c, 'Note', { gap: 4 }); nt.layoutSizingHorizontal = 'FILL'; nt.counterAxisAlignItems = 'CENTER';
  const n1 = await S.text(nt, it.noteTitle, 'iOS/Body Emphasized', 'ink'); n1.textAlignHorizontal = 'CENTER'; const n2 = await S.text(nt, it.noteBody, 'ML/Secondary', 'ink-secondary'); n2.textAlignHorizontal = 'CENTER'; n2.layoutSizingHorizontal = 'FILL'; n2.textAutoResize = 'HEIGHT';
  const tb = f.findOne(n => n.name === 'Tab Bar'); const target = (tb ? tb.y : 818) - 20; const top0 = c.y + c.paddingTop;
  const H = Math.max(420, Math.round(target - top0 - 16 - nt.height)); card.layoutSizingVertical = 'FIXED'; card.resize(card.width, H); top.layoutGrow = 1;
  const fd = f.findOne(n => n.name === 'Scroll edge fade'); if (fd) fd.visible = false;
  if (keepFrame.length) await f.setReactionsAsync(keepFrame);
  const nb = f.findOne(n => n.name === 'Back' || /BackButton/.test(n.name)); if (nb) { if (backR) await nb.setReactionsAsync(backR); else await S.back(nb); }
  const ns = f.findOne(n => n.name === 'Status Bar'); if (ns && sbR) await ns.setReactionsAsync(sbR);
  out.push(f.name + ' card ' + H + ' note bottom ' + Math.round(c.y + c.height - c.paddingBottom));
}
return out;
