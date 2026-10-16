// Polish Q5 swipe to remind (stored as mealloop/q5swipe). Body of async function(figma, args).
// args: { pid, y, cases: [{ normal, target: 'HeroCard'|'AnswerRow', label, at }] } -> builds Revealed, Reminder set, Reminder fired per case (P02) and wires them.
// Normal frame: On drag on the target (Smart animate) -> Revealed; Revealed after 0.7 s -> Reminder set; Undo -> Normal; Reminder set status bar (time skip) -> Reminder fired.
// Note: node.clone() does not carry the frame-level prototype links; after this tool the normal frame's links were copied onto the
// Reminder set / Reminder fired clones by layer path (one-off step logged in polish/decisions.md 19).
const AF = Object.getPrototypeOf(async function(){}).constructor;
const S = await new AF('figma', 'args', figma.root.getSharedPluginData('mealloop', 'srh'))(figma, {});
const pg = await figma.getNodeByIdAsync(args.pid); const out = []; let x = 0;
const T = (f, n) => f.findOne(m => m.name.startsWith(n) && m.parent && m.parent.name === 'Content');
const R = (d, trig, s) => ({ trigger: trig === 'drag' ? { type: 'ON_DRAG' } : trig === 'after' ? { type: 'AFTER_TIMEOUT', timeout: s || 0.7 } : { type: 'ON_CLICK' }, actions: [{ type: 'NODE', destinationId: d, navigation: 'NAVIGATE', transition: trig === 'drag' ? { type: 'SMART_ANIMATE', easing: { type: 'EASE_OUT' }, duration: 0.3 } : { type: 'DISSOLVE', easing: { type: 'EASE_OUT' }, duration: 0.25 }, resetVideoPosition: false, resetScrollPosition: false }] });
const setTime = (f, t) => { const st = f.findOne(n => n.name === 'Status Bar'); if (st) { const k = Object.keys(st.componentProperties).find(k => k.startsWith('Time')); if (k) st.setProperties({ [k]: t }); } };
for (const cs of args.cases) {
  const nf = await figma.getNodeByIdAsync(cs.normal);
  const mk = (suffix) => { const g = nf.clone(); pg.appendChild(g); g.x = x; g.y = args.y; x += 493; g.name = 'Home · ' + cs.label + ' · ' + suffix + ' · new'; return g; };
  const a = mk('Swipe revealed'); const ta = T(a, cs.target); const rad = typeof ta.cornerRadius === 'number' ? ta.cornerRadius : 24; const off = 180;
  const box = S.frame(null, 'Swipe / ' + cs.target, {}); const ca = a.findOne(n => n.name === 'Content'); ca.insertChild(ca.children.indexOf(ta), box); box.layoutMode = 'NONE'; box.resize(ta.width, ta.height); box.cornerRadius = rad; box.clipsContent = true; box.fills = [];
  const hero = cs.target === 'HeroCard';
  const pn = S.frame(box, 'Remind panel', { dir: hero ? 'V' : 'H', gap: 10, fill: 'lime', radius: rad }); pn.resize(ta.width, ta.height); pn.x = 0; pn.y = 0; pn.strokes = [S.paint('lime-outline')]; pn.strokeWeight = 1.5; pn.strokeAlign = 'INSIDE';
  pn.paddingLeft = 24; pn.primaryAxisAlignItems = hero ? 'CENTER' : 'MIN'; pn.counterAxisAlignItems = hero ? 'MIN' : 'CENTER';
  S.icon(pn, 'clock', hero ? 32 : 24, 'on-lime'); const lt = await S.text(pn, 'Remind me in 1 hr', 'iOS/Body Emphasized', 'on-lime'); lt.textAutoResize = 'HEIGHT'; lt.resize(off - 24 - (hero ? 12 : 46), lt.height);
  box.appendChild(ta); ta.x = off; ta.y = 0; await ta.setReactionsAsync([]);
  const b = mk('Reminder set'); const tb = T(b, cs.target); const cb = b.findOne(n => n.name === 'Content'); const card = S.frame(null, 'Reminder set', { dir: 'H', gap: 16, fill: 'surface', radius: 24 }); cb.insertChild(cb.children.indexOf(tb), card); card.layoutSizingHorizontal = 'FILL'; card.counterAxisAlignItems = 'CENTER'; card.paddingLeft = card.paddingRight = card.paddingTop = card.paddingBottom = 16;
  const ci = S.frame(card, 'Clock circle', { dir: 'H', fill: 'fill-quiet', radius: 20 }); ci.resize(40, 40); ci.layoutSizingHorizontal = 'FIXED'; ci.layoutSizingVertical = 'FIXED'; ci.primaryAxisAlignItems = 'CENTER'; ci.counterAxisAlignItems = 'CENTER'; S.icon(ci, 'clock', 20, 'ink');
  const tx = S.frame(card, 'Text', { gap: 2 }); tx.layoutGrow = 1; await S.text(tx, 'Reminder set', 'iOS/Body Emphasized', 'ink'); const sub = await S.text(tx, "We'll ask again at " + cs.at, 'ML/Secondary', 'ink-secondary'); sub.layoutSizingHorizontal = 'FILL'; sub.textAutoResize = 'HEIGHT';
  const uh = S.frame(card, 'Undo · hit area', { dir: 'H' }); uh.minHeight = 44; uh.minWidth = 44; uh.primaryAxisAlignItems = 'CENTER'; uh.counterAxisAlignItems = 'CENTER'; const u = await S.text(uh, 'Undo', 'ML/Secondary Medium', 'ink'); u.textDecoration = 'UNDERLINE';
  tb.remove();
  const c = mk('Reminder fired'); setTime(c, cs.at.replace(/ (AM|PM)$/, '')); const tc = T(c, cs.target); const cc = c.findOne(n => n.name === 'Content');
  const chip = S.frame(null, 'Reminder chip', { dir: 'H', gap: 6, radius: 16 }); cc.insertChild(cc.children.indexOf(tc), chip); chip.paddingLeft = 10; chip.paddingRight = 12; chip.paddingTop = chip.paddingBottom = 6; chip.counterAxisAlignItems = 'CENTER'; chip.strokes = [S.paint('ink')]; chip.strokeWeight = 1.5; chip.strokeAlign = 'INSIDE'; chip.fills = [S.paint('surface')];
  S.icon(chip, 'clock', 16, 'ink'); await S.text(chip, 'Reminder', 'ML/Tag', 'ink');
  const tn = T(nf, cs.target); const keep = (tn.reactions || []).filter(r => r.trigger.type !== 'ON_DRAG').map(r => ({ trigger: r.trigger, actions: r.actions }));
  await tn.setReactionsAsync([...keep, R(a.id, 'drag')]);
  const tcd = T(c, cs.target); await tcd.setReactionsAsync([...keep, R(a.id, 'drag')]);
  await a.setReactionsAsync([R(b.id, 'after', 0.7)]);
  await uh.setReactionsAsync([R(nf.id)]);
  const sb = b.findOne(n => n.name === 'Status Bar'); if (sb) await sb.setReactionsAsync([R(c.id)]);
  out.push(cs.label + ': ' + [a.id, b.id, c.id].join(', '));
}
return out;
