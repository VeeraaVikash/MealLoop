// FIX-2 R4 Edit day builder (stored as mealloop/fx2menu). Body of async function(figma, args). args: { items: [spec] }
// spec: { name, x, y, meal ('Breakfast'|'Lunch'|'Snacks'|'Dinner'), dishes: [[name, highlight 0/1, nonveg 0/1, check 0/1]], undo (bool),
//   lifted (index being dragged), swipe (index showing Delete), banner (text under the tools), adding (typed text or ''), chips [..],
//   tell (bool, default true), toast (text), time, moment }
// Layout per F04: Back + "Thu 15 Aug" title, meal segments, "Copy last Thursday" link + Undo, "Highlight · Veg" caption, dish rows
// (drag handle, name, ring "!" for a word to check, star = highlight, DietMark = veg / non-veg), Add a dish field + suggestion chips,
// then a fixed bottom bar: "Tell students about this change" switch and Save changes.
const AF = Object.getPrototypeOf(async function(){}).constructor;
const A = await new AF('figma', 'args', figma.root.getSharedPluginData('mealloop', 'adm'))(figma, {});
const pg = await figma.getNodeByIdAsync('2237:2'); const out = [];
const hit = (parent, name, w) => { const h = A.frame(parent, name, { dir: 'H' }); h.resize(w || 44, 44); h.primaryAxisSizingMode = 'FIXED'; h.counterAxisSizingMode = 'FIXED'; h.primaryAxisAlignItems = 'CENTER'; h.counterAxisAlignItems = 'CENTER'; return h; };
const star = (parent, on) => { const c = A.frame(parent, on ? 'Star · on' : 'Star · off', { dir: 'H', radius: 18 }); c.resize(36, 36); c.primaryAxisSizingMode = 'FIXED'; c.counterAxisSizingMode = 'FIXED'; c.primaryAxisAlignItems = 'CENTER'; c.counterAxisAlignItems = 'CENTER';
  if (on) { c.fills = [A.paint('hero-bg')]; c.strokes = []; } else { c.fills = []; c.strokes = [A.paint('border')]; } c.strokeWeight = 1.5; c.strokeAlign = 'INSIDE';
  const s = figma.createStar(); s.pointCount = 5; s.innerRadius = 0.45; s.resize(18, 18); s.name = 'Star'; c.appendChild(s);
  if (on) { s.fills = [A.paint('on-hero')]; } else { s.fills = []; s.strokes = [A.paint('ink-secondary')]; s.strokeWeight = 1.5; } return c; };
const ring = (parent) => { const c = A.frame(parent, 'Word to check', { dir: 'H', radius: 12 }); c.resize(24, 24); c.primaryAxisSizingMode = 'FIXED'; c.counterAxisSizingMode = 'FIXED'; c.primaryAxisAlignItems = 'CENTER'; c.counterAxisAlignItems = 'CENTER'; c.strokes = [A.paint('ink')]; c.strokeWeight = 1.5; c.strokeAlign = 'INSIDE'; return c; };
const handle = (parent) => { const h = hit(parent, 'Drag handle', 32); h.layoutMode = 'VERTICAL'; h.itemSpacing = 4; for (let i = 0; i < 3; i++) { const r = figma.createRectangle(); r.resize(18, 2); r.cornerRadius = 1; r.fills = [A.paint('ink-secondary')]; h.appendChild(r); } return h; };
for (const it of args.items) {
  const { f, c } = await A.screen(pg, it.name, it.x, it.y, { title: 'Thu 15 Aug', subtitle: 'Edit day · week of 12 – 18 Aug', back: true, noTab: true, time: it.time || '11:10', gap: 12, moment: it.moment });
  const fd = f.findOne(n => n.name === 'Scroll edge fade'); if (fd) fd.visible = false;
  // meal segments
  const s = A.frame(c, 'Meals', { dir: 'H', gap: 0, radius: 999, fill: 'fill-quiet' }); s.layoutSizingHorizontal = 'FILL'; s.paddingLeft = s.paddingRight = s.paddingTop = s.paddingBottom = 4;
  for (const l of ['Breakfast', 'Lunch', 'Snacks', 'Dinner']) { const b = A.frame(s, 'Meal · ' + l, { dir: 'H', radius: 999 }); b.layoutGrow = 1; b.layoutSizingHorizontal = 'FILL'; b.counterAxisSizingMode = 'FIXED'; b.resize(80, 44); b.primaryAxisAlignItems = 'CENTER'; b.counterAxisAlignItems = 'CENTER'; if (l === it.meal) b.fills = [A.paint('hero-bg')]; await A.t(b, l, 'ML/Secondary Medium', l === it.meal ? 'on-hero' : 'ink-secondary'); }
  // tools row
  const tr = A.frame(c, 'Tools', { dir: 'H', gap: 8 }); tr.layoutSizingHorizontal = 'FILL'; tr.counterAxisAlignItems = 'CENTER';
  const cp = hit(tr, 'Copy last Thursday', 10); cp.primaryAxisSizingMode = 'AUTO'; cp.primaryAxisAlignItems = 'MIN'; const ct = await A.t(cp, 'Copy last Thursday', 'ML/Body', 'ink'); ct.textDecoration = 'UNDERLINE';
  const sp = A.frame(tr, 'Space', {}); sp.resize(1, 1); sp.layoutGrow = 1;
  const un = hit(tr, 'Undo', 56); un.primaryAxisAlignItems = 'MAX'; await A.t(un, 'Undo', 'ML/Body', it.undo ? 'ink' : 'ink-secondary'); un.opacity = it.undo ? 1 : 0.6;
  if (it.banner) { const bn = A.card(c, 'Banner', { gap: 4, pad: 14, radius: 16, fill: 'fill-quiet' }); await A.t(bn, it.banner, 'ML/Secondary', 'ink', { fill: true }); }
  const cap = await A.t(c, 'Highlight · Veg', 'ML/Footnote', 'ink-secondary', { fill: true }); cap.textAlignHorizontal = 'RIGHT';
  // dishes
  const list = A.frame(c, 'Dishes', { gap: 0 }); list.layoutSizingHorizontal = 'FILL'; list.clipsContent = false;
  for (let i = 0; i < it.dishes.length; i++) { const [nm, hl, nv, chk] = it.dishes[i];
    const r = A.frame(list, 'Dish / ' + nm, { dir: 'H', gap: 6 }); r.layoutSizingHorizontal = 'FILL'; r.counterAxisAlignItems = 'CENTER'; r.minHeight = 56; r.paddingTop = r.paddingBottom = 4;
    r.strokes = [A.paint('border')]; r.strokeTopWeight = 1; r.strokeBottomWeight = 0; r.strokeLeftWeight = 0; r.strokeRightWeight = 0; r.strokeAlign = 'INSIDE';
    handle(r); const t = await A.t(r, nm, 'ML/Body', 'ink', { name: 'Name' }); t.layoutGrow = 1; t.textAutoResize = 'HEIGHT';
    if (chk) { const h = hit(r, 'Check word', 36); const g = ring(h); await A.t(g, '!', 'ML/Footnote', 'ink'); }
    const sh = hit(r, 'Highlight'); star(sh, hl);
    const vh = hit(r, 'Veg mark', 40); const dm = await A.v(A.ID.diet, { Diet: nv ? 'Non-veg' : 'Veg' }, null, vh); dm.name = 'DietMark';
    if (it.lifted === i) { r.fills = [A.paint('surface')]; r.cornerRadius = 16; r.strokes = []; r.effects = [{ type: 'DROP_SHADOW', color: { r: 0, g: 0, b: 0, a: 0.16 }, offset: { x: 0, y: 8 }, radius: 20, spread: 0, visible: true, blendMode: 'NORMAL' }]; r.paddingLeft = r.paddingRight = 8; r.name = 'Dish / ' + nm + ' · lifted'; }
    if (it.swipe === i) { r.name = 'Dish / ' + nm + ' · swiped'; const h0 = Math.max(56, Math.round(r.height));
      const wrap = figma.createFrame(); wrap.name = 'Swipe · ' + nm; wrap.fills = []; wrap.clipsContent = true; list.insertChild(list.children.indexOf(r), wrap); wrap.resize(353, h0); wrap.layoutSizingHorizontal = 'FILL';
      const del = A.frame(wrap, 'Button / Delete', { dir: 'H', fill: 'hero-bg' }); del.resize(96, h0); del.primaryAxisSizingMode = 'FIXED'; del.counterAxisSizingMode = 'FIXED'; del.x = 353 - 96; del.y = 0; del.primaryAxisAlignItems = 'CENTER'; del.counterAxisAlignItems = 'CENTER'; del.itemSpacing = 6; A.icon(del, 'trash', 18, 'on-hero'); await A.t(del, 'Delete', 'ML/Secondary Medium', 'on-hero');
      wrap.appendChild(r); r.primaryAxisSizingMode = 'FIXED'; r.resize(353, h0); r.x = -96; r.y = 0; r.fills = [A.paint('canvas')]; }
  }
  A.sep(list);
  // add a dish
  const add = A.frame(c, 'Add a dish', { dir: 'H', gap: 12, radius: 999 }); add.layoutSizingHorizontal = 'FILL'; add.counterAxisAlignItems = 'CENTER'; add.paddingLeft = 12; add.paddingRight = 20; add.minHeight = 56; add.strokes = [A.paint(it.adding !== undefined ? 'ink' : 'border')]; add.strokeWeight = it.adding !== undefined ? 1.5 : 1.5; add.strokeAlign = 'INSIDE';
  const pl = A.frame(add, 'Plus', { dir: 'H', radius: 16, fill: 'hero-bg' }); pl.resize(32, 32); pl.primaryAxisSizingMode = 'FIXED'; pl.counterAxisSizingMode = 'FIXED'; pl.primaryAxisAlignItems = 'CENTER'; pl.counterAxisAlignItems = 'CENTER'; A.icon(pl, 'plus', 16, 'on-hero');
  if (it.adding) { await A.t(add, it.adding, 'ML/Body', 'ink'); const cur = figma.createRectangle(); cur.name = 'Caret'; cur.resize(2, 22); cur.fills = [A.paint('ink')]; add.appendChild(cur); }
  else await A.t(add, 'Add a dish', 'ML/Body', 'ink-secondary');
  const chips = A.frame(c, 'From earlier weeks', { dir: 'H', gap: 8 }); chips.layoutSizingHorizontal = 'FILL'; chips.layoutWrap = 'WRAP'; chips.counterAxisSpacing = 8;
  for (const l of (it.chips || ['Curd Rice', 'Jeera Pulao', 'Poriyal'])) { const ch = await A.chip(chips, l, 'outline', { py: 11, px: 16, style: 'ML/Body' }); ch.name = 'Suggestion · ' + l; }
  const sp2 = A.frame(c, 'Space for the bar', {}); sp2.resize(1, 132);
  // fixed bottom bar
  const bar = A.frame(f, 'Bottom bar', { gap: 12, fill: 'canvas' }); bar.resize(393, 10); bar.paddingLeft = bar.paddingRight = 20; bar.paddingTop = 12; bar.paddingBottom = 34; bar.counterAxisSizingMode = 'FIXED'; bar.primaryAxisSizingMode = 'AUTO';
  const tg = A.frame(bar, 'Tell students', { dir: 'H', gap: 12 }); tg.layoutSizingHorizontal = 'FILL'; tg.counterAxisAlignItems = 'CENTER'; tg.minHeight = 44;
  const tl = await A.t(tg, 'Tell students about this change', 'ML/Body', 'ink'); tl.layoutGrow = 1;
  const on = it.tell !== false; const sw = A.frame(tg, on ? 'Switch · on' : 'Switch · off', { dir: 'H', radius: 16 }); sw.resize(56, 32); sw.primaryAxisSizingMode = 'FIXED'; sw.counterAxisSizingMode = 'FIXED'; sw.paddingLeft = sw.paddingRight = 3; sw.counterAxisAlignItems = 'CENTER'; sw.primaryAxisAlignItems = on ? 'MAX' : 'MIN';
  if (on) { sw.fills = [A.paint('lime')]; sw.strokes = [A.paint('ink')]; sw.strokeWeight = 1.5; sw.strokeAlign = 'INSIDE'; } else sw.fills = [A.paint('track')];
  const kn = figma.createEllipse(); kn.name = 'Knob'; kn.resize(26, 26); kn.fills = [A.paint(on ? 'ink' : 'surface')]; sw.appendChild(kn);
  await A.btn(bar, 'Save changes', 'black', { h: 60 });
  bar.y = 852 - bar.height; bar.x = 0;
  const k0 = f.numberOfFixedChildren; const ci = f.children.indexOf(c); f.insertChild(ci + 1, bar); f.numberOfFixedChildren = k0 + 1; f.overflowDirection = 'VERTICAL';
  if (it.toast) { const t = A.frame(f, 'Toast', { dir: 'H', gap: 10, radius: 999, fill: 'hero-bg' }); t.paddingLeft = 18; t.paddingRight = 22; t.paddingTop = t.paddingBottom = 14; t.counterAxisAlignItems = 'CENTER'; A.icon(t, it.toastIcon || 'checkmark.circle', 20, 'on-hero'); await A.t(t, it.toast, 'ML/Secondary Medium', 'on-hero');
    if (it.toastAction) { const u = hit(t, 'Toast action', 56); await A.t(u, it.toastAction, 'ML/Secondary Medium', 'lime'); }
    t.x = Math.round((393 - t.width) / 2); t.y = bar.y - t.height - 12; f.numberOfFixedChildren = k0 + 2; }
  out.push(f.id + ' ' + f.name + ' content ' + Math.round(c.y + c.height));
}
return out;
