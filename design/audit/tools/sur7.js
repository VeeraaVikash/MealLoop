// Run 2 Stage 7: Surplus oversight (stored as mealloop/sur7). Body of async function(figma, args) -> report.
// args: { frameId, state: 'Offered' | 'Accepted' | 'Collected' | 'Late' }. On an AD-6d frame: removes "Log pickup",
// replaces the dot progress in the hero by a three-step track Offered → Accepted → Collected with times, sets the
// ResultCard for the state, adds "Pickups are logged by the supervisor." under the hero; Late adds a lime "Call Ravi"
// (HeroActions primary, secondary hidden). Dishes ("4 dishes") and the dishes row stay.
const AF = Object.getPrototypeOf(async function(){}).constructor;
const B = await new AF('figma', figma.root.getSharedPluginData('mealloop', 'ins3a'))(figma);
const f = await figma.getNodeByIdAsync(args.frameId); await B.loadAll(f);
const c = f.children.find(k => /Content$/.test(k.name)); const hero = c.findOne(n => n.name === 'Hero · Pickup');
const lp = c.findOne(n => n.name === 'Button · Log pickup'); if (lp) lp.remove();
const ST = {
  Offered:   { rc: ['Hold', 'Awaiting partner', 'Partner NGO · offered 2:10 PM'], steps: [['Offered', '2:10 PM', 'done'], ['Accepted', 'waiting', 'current'], ['Collected', 'by 3:00 PM', 'todo']] },
  Accepted:  { rc: ['Hold', 'Awaiting pickup', 'Partner NGO · by 3:00 PM'], steps: [['Offered', '2:10 PM', 'done'], ['Accepted', '2:14 PM', 'done'], ['Collected', 'by 3:00 PM', 'current']] },
  Collected: { rc: ['Success', 'Collected', 'Partner NGO · collected 3:05 PM'], steps: [['Offered', '2:10 PM', 'done'], ['Accepted', '2:14 PM', 'done'], ['Collected', '3:05 PM', 'done']] },
  Late:      { rc: ['Stop', 'Late', 'Pickup is late · call Ravi'], steps: [['Offered', '2:10 PM', 'done'], ['Accepted', '2:14 PM', 'done'], ['Collected', 'due 3:00 PM', 'late']] }
}[args.state];
const rc = hero.findOne(n => n.name === 'ResultCard'); rc.swapComponent(rc.mainComponent.parent.children.find(v => v.name === 'State=' + ST.rc[0])); await B.loadAll(rc);
B.setP(rc, { Tag: ST.rc[1], Fact: ST.rc[2] }); const ft = rc.findOne(n => n.name === 'Fact'); if (ft) await B.mono(ft, 'ML/Secondary');
const old = hero.findOne(n => n.name === 'Progress') || hero.findOne(n => n.name === 'Steps · Offered → Accepted → Collected'); const idx = old ? hero.children.indexOf(old) : hero.children.length; if (old) old.remove();
const steps = figma.createAutoLayout('VERTICAL', { name: 'Steps · Offered → Accepted → Collected', itemSpacing: 8 }); steps.fills = []; hero.insertChild(idx, steps);
steps.paddingLeft = hero.paddingLeft ? 0 : 20; steps.paddingRight = steps.paddingLeft; steps.layoutSizingHorizontal = 'FILL';
const track = figma.createAutoLayout('HORIZONTAL', { name: 'Track', itemSpacing: 6 }); track.fills = []; track.counterAxisAlignItems = 'CENTER'; steps.appendChild(track); track.layoutSizingHorizontal = 'FILL';
const dot = async (st, name) => { const e = figma.createEllipse(); e.name = name; e.resize(12, 12); track.appendChild(e);
  if (st === 'done') e.fills = [await B.paint(B.C.onHero)];
  else if (st === 'current') e.fills = [await B.paint(B.C.lime)];
  else if (st === 'late') { e.fills = []; e.strokes = [await B.paint(B.C.lime)]; e.strokeWeight = 2; e.strokeAlign = 'INSIDE'; e.dashPattern = [3, 2]; }
  else { e.fills = []; e.strokes = [await B.paint(B.C.onHero2)]; e.strokeWeight = 1.5; e.strokeAlign = 'INSIDE'; } return e; };
const line = async (done, name) => { const r = figma.createRectangle(); r.name = name; r.resize(40, 2); r.cornerRadius = 1; track.appendChild(r); r.layoutSizingHorizontal = 'FILL'; r.fills = [await B.paint(done ? B.C.onHero : B.C.onHero2)]; if (!done) r.opacity = 0.5; return r; };
for (let i = 0; i < 3; i++) { const [lab, , st] = ST.steps[i]; await dot(st, 'Step ' + (i + 1) + ' · ' + lab + ' · ' + st); if (i < 2) await line(ST.steps[i + 1][2] === 'done', 'Line ' + (i + 1) + '–' + (i + 2)); }
const labels = figma.createAutoLayout('HORIZONTAL', { name: 'Labels', itemSpacing: 8 }); labels.fills = []; labels.primaryAxisAlignItems = 'SPACE_BETWEEN'; steps.appendChild(labels); labels.layoutSizingHorizontal = 'FILL';
for (let i = 0; i < 3; i++) { const [lab, tm, st] = ST.steps[i]; const col = figma.createAutoLayout('VERTICAL', { name: 'Step · ' + lab, itemSpacing: 0 }); col.fills = []; labels.appendChild(col); col.counterAxisAlignItems = ['MIN', 'CENTER', 'MAX'][i];
  const a = await B.text(col, 'Label', lab, 'ML/Footnote', st === 'todo' ? B.C.onHero2 : B.C.onHero, { fill: false }); a.textAlignHorizontal = ['LEFT', 'CENTER', 'RIGHT'][i];
  const b = await B.text(col, 'Time', tm, 'ML/Footnote', B.C.onHero2, { fill: false }); b.textAlignHorizontal = ['LEFT', 'CENTER', 'RIGHT'][i]; }
// Late: lime Call Ravi
const prevHa = hero.findOne(n => n.name === 'HeroActions'); if (prevHa) prevHa.remove();
if (args.state === 'Late') { const sos = await figma.getNodeByIdAsync('849:564'); const ha0 = sos.findOne(n => n.name === 'HeroActions'); await B.loadAll(ha0); const ha = ha0.clone(); hero.appendChild(ha); ha.layoutSizingHorizontal = 'FILL'; await B.strip(ha); const sec = ha.findOne(n => /^Secondary/.test(n.name)); sec.visible = false; }
// supervisor line
if (!c.findOne(n => n.name === 'Note · supervisor logs')) { const t = await B.text(c, 'Note · supervisor logs', 'Pickups are logged by the supervisor.', 'ML/Footnote', B.C.ink2); c.insertChild(c.children.indexOf(hero) + 1, t); }
const v = c.children.filter(n => n.visible); const l = v[v.length - 1];
return { state: args.state, hero: Math.round(hero.height), heroPad: hero.paddingLeft, bottom: Math.round(c.y + l.y + l.height), kids: c.children.map(k => k.name) };
