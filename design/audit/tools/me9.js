// Run 2 Stage 9: "Me too" control states (stored as mealloop/me9). Body of async function(figma, args) -> report.
// args: { frameId, state: 'Sending' | 'Backed' | 'Failed' | 'Offline' }. On a clone of Community · Suggestion: drives the
// IssueHero (and its nested IntentChoice "Support") into the state:
//  Sending: IssueHero State=Sending, Support -> IntentChoice State=Sending (spinner), neutral fill, opacity 0.6 (dimmed).
//  Backed:  IssueHero State=Supported, count 113, label "You backed this · tap to undo" (Undo hidden); black pill
//           (hero-bg) with a 1.5 pt on-hero outline and an on-hero check.
//  Failed:  Support dashed on-hero-secondary outline, no fill, label "Try again"; line under the hero "Didn't send."
//  Offline: Support State=Disabled ("Me too"); line under the hero "Needs a connection".
const AF = Object.getPrototypeOf(async function(){}).constructor;
const B = await new AF('figma', figma.root.getSharedPluginData('mealloop', 'ins3a'))(figma);
const f = await figma.getNodeByIdAsync(args.frameId); await B.loadAll(f);
const c = f.children.find(k => /Content$/.test(k.name)); const hero = c.findOne(n => n.name === 'Issue hero');
const icSet = await figma.getNodeByIdAsync('77:183'); const IC = s => (icSet.type === 'COMPONENT_SET' ? icSet : icSet.parent).children.find(v => v.name === 'Surface=On dark, State=' + s);
const keep = { title: hero.findOne(n => n.name === 'Title').characters };
const st = args.state;
hero.setProperties({ State: st === 'Sending' ? 'Sending' : st === 'Backed' ? 'Supported' : 'Support' }); await B.loadAll(hero);
hero.findOne(n => n.name === 'Title').characters = keep.title;
const sup = hero.findOne(n => n.name === 'Support'); const lab = () => sup.findOne(n => n.name === 'Label');
const setLabel = async s => { const l = lab(); await B.loadAll(l); l.characters = s; };
if (st === 'Sending') { sup.swapComponent(IC('Sending')); await B.loadAll(sup); sup.fills = [await B.paint('45:29')]; sup.opacity = 0.6; await setLabel('Me too'); hero.findOne(n => n.name === 'Count value').characters = '112'; }
if (st === 'Backed') { hero.findOne(n => n.name === 'Count value').characters = '113'; await setLabel('You backed this · tap to undo'); const u = hero.findOne(n => n.name === 'Undo'); if (u) u.visible = false;
  sup.fills = [await B.paint(B.C.heroBg)]; sup.strokes = [await B.paint(B.C.onHero)]; sup.strokeWeight = 1.5; sup.strokeAlign = 'INSIDE'; lab().fills = [await B.paint(B.C.onHero)];
  for (const v of sup.findAll(n => n.type === 'VECTOR')) { if (v.strokes.length) v.strokes = [await B.paint(B.C.onHero)]; if (v.fills.length) v.fills = [await B.paint(B.C.onHero)]; } }
if (st === 'Failed') { sup.fills = []; sup.strokes = [await B.paint(B.C.onHero2)]; sup.strokeWeight = 1.5; sup.strokeAlign = 'INSIDE'; sup.dashPattern = [4, 3]; await setLabel('Try again'); lab().fills = [await B.paint(B.C.onHero)]; }
if (st === 'Offline') { sup.swapComponent(IC('Disabled')); await B.loadAll(sup); await setLabel('Me too'); }
const old = c.findOne(n => n.name === 'Me too · line'); if (old) old.remove();
if (st === 'Failed' || st === 'Offline') { const t = await B.text(c, 'Me too · line', st === 'Failed' ? 'Didn’t send.' : 'Needs a connection', 'ML/Footnote', B.C.ink2); t.textAlignHorizontal = 'CENTER'; c.insertChild(c.children.indexOf(hero) + 1, t); }
return { state: st, hero: hero.mainComponent.name, support: sup.mainComponent.name, texts: hero.findAll(n => n.type === 'TEXT' && n.visible).map(t => t.characters).join(' | ') };
