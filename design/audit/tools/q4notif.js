// Polish Q4 notification cards (stored as mealloop/q4notif). Body of async function(figma, args). args: { ids: [frameId] }
// Per design/reference/polish_2026-10/P01: no app logo; 36 pt type circle top-aligned with the text block; 15 pt title + right-aligned 13 pt time on one line;
// body 13 pt (two lines at most); title and body share one left edge. Reactions of each old card are copied to its new card.
const AF = Object.getPrototypeOf(async function(){}).constructor;
const S = await new AF('figma', 'args', figma.root.getSharedPluginData('mealloop', 'srh'))(figma, {});
const SPEC = {
  'Your guardian approved your outing': { kind: 'lime', icon: 'checkmark', time: '6:52 AM', title: 'Guardian approved', body: 'Your Sat 17 Aug outing, 2–8 PM. Now waiting for the warden.' },
  'Breakfast today?': { kind: 'ink', icon: 'fork.knife', time: '5:30 AM', title: 'Breakfast today?', body: 'Tell us by 6 AM so the kitchen can plan.' },
  'The kitchen saw your feedback': { kind: 'outline', icon: 'text.bubble', time: 'Yesterday', title: 'Feedback seen', body: 'The kitchen saw it. 6 others said the sambar was too salty.' },
  'Special pass on Wednesday': { kind: 'outline', icon: 'ticket', time: 'Mon', title: 'Special pass', body: 'Wednesday 14 Aug, 12–2 PM at the pass desk.' } };
const out = [];
for (const id of args.ids) { const f = await figma.getNodeByIdAsync(id);
  for (const old of f.findAll(n => n.type === 'FRAME' && n.name.startsWith('Notification / '))) { const key = old.name.slice(15); const sp = SPEC[key]; if (!sp) { out.push('skip ' + key); continue; }
    const par = old.parent, idx = par.children.indexOf(old); const R = old.reactions;
    const cd = S.frame(null, 'Notification / ' + sp.title, { dir: 'H', gap: 16, fill: 'surface', radius: 24 }); par.insertChild(idx, cd); cd.layoutSizingHorizontal = 'FILL'; cd.counterAxisAlignItems = 'MIN';
    cd.paddingLeft = cd.paddingRight = 16; cd.paddingTop = cd.paddingBottom = 16;
    const ci = S.frame(cd, 'Type circle · ' + sp.kind, { dir: 'H', radius: 18 }); ci.resize(36, 36); ci.layoutSizingHorizontal = 'FIXED'; ci.layoutSizingVertical = 'FIXED'; ci.primaryAxisAlignItems = 'CENTER'; ci.counterAxisAlignItems = 'CENTER';
    if (sp.kind === 'lime') { ci.fills = [S.paint('lime')]; ci.strokes = [S.paint('lime-outline')]; ci.strokeWeight = 1.5; ci.strokeAlign = 'INSIDE'; S.icon(ci, sp.icon, 18, 'on-lime'); }
    else if (sp.kind === 'ink') { ci.fills = [S.paint('ink')]; S.icon(ci, sp.icon, 18, 'on-hero'); }
    else { ci.fills = []; ci.strokes = [S.paint('ink')]; ci.strokeWeight = 1.5; ci.strokeAlign = 'INSIDE'; S.icon(ci, sp.icon, 18, 'ink'); }
    const tx = S.frame(cd, 'Text', { gap: 2 }); tx.layoutGrow = 1; tx.layoutSizingHorizontal = 'FILL';
    const top = S.frame(tx, 'Title row', { dir: 'H', gap: 8 }); top.layoutSizingHorizontal = 'FILL'; top.counterAxisAlignItems = 'BASELINE';
    const ti = await S.text(top, sp.title, 'iOS/Subheadline Emphasized', 'ink'); ti.layoutGrow = 1; ti.textAutoResize = 'HEIGHT';
    await S.text(top, sp.time, /\d/.test(sp.time) ? 'ML/Mono Footnote' : 'ML/Footnote', 'ink-secondary');
    const bb = await S.text(tx, sp.body, 'iOS/Footnote', 'ink-secondary'); bb.layoutSizingHorizontal = 'FILL'; bb.textAutoResize = 'HEIGHT';
    if (R && R.length) await cd.setReactionsAsync(R);
    old.remove(); out.push(f.name + ' / ' + sp.title + ' lines ' + Math.round(bb.height / 18));
  } }
return out;
