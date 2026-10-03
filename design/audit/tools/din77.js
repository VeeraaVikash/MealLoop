// Run 2 Stage 3b: dinner Meal detail answer frames (stored as mealloop/din77). Body of async function(figma, args) -> report.
// args: { pageId, md (dinner Meal detail on that page), plan: [[srcId, name, label, heroProps|null]], x0, y, labelSrc, momentSrc, sampleSrc }.
// Clones each lunch answer frame next to the row (x0 + k*493), swaps the MealHero to dinner (Question, Menu, Meal; optional
// State/Selected variant), replaces the lunch "Dishes" list by a clone of the dinner Meal detail's list (its links travel with it),
// sets Nav title "Dinner", status time 2:00, and any remaining "lunch" in the hero to "dinner". Adds label, Moment and sample note.
figma.skipInvisibleInstanceChildren = false;
const loadAll = async root => { const ts = root.type === 'TEXT' ? [root] : root.findAllWithCriteria({ types: ['TEXT'] }); const m = new Map(); for (const t of ts) for (const s of t.getStyledTextSegments(['fontName'])) m.set(s.fontName.family + '|' + s.fontName.style, s.fontName); await Promise.all([...m.values()].map(x => figma.loadFontAsync(x))); };
const setP = (inst, obj) => { const o = {}; for (const [n, v] of Object.entries(obj)) { const k = Object.keys(inst.componentProperties).find(x => x.split('#')[0] === n); if (!k) throw new Error('No prop ' + n + ' on ' + inst.name); o[k] = v; } inst.setProperties(o); };
const page = await figma.getNodeByIdAsync(args.pageId); await page.loadAsync();
const md = await figma.getNodeByIdAsync(args.md); const mdC = md.children.find(c => /Content$/.test(c.name)); const dinDishes = mdC.children.find(c => c.name === 'Dishes');
const mdHero = mdC.children.find(c => c.name === 'Meal Hero'); const hp = Object.fromEntries(Object.entries(mdHero.componentProperties).map(([a, b]) => [a.split('#')[0], b.value]));
const labelSrc = await figma.getNodeByIdAsync(args.labelSrc), momentSrc = await figma.getNodeByIdAsync(args.momentSrc), sampleSrc = await figma.getNodeByIdAsync(args.sampleSrc);
await loadAll(labelSrc); await loadAll(momentSrc); await loadAll(sampleSrc);
const flows0 = page.flowStartingPoints.length;
const rep = [];
for (let k = 0; k < args.plan.length; k++) {
  const [srcId, name, label, heroProps] = args.plan[k];
  const src = await figma.getNodeByIdAsync(srcId); const f = src.clone(); page.appendChild(f);
  f.x = args.x0 + k * 493; f.y = args.y; f.name = name; await loadAll(f);
  const c = f.children.find(x => /Content$/.test(x.name));
  const hero = c.children.find(x => x.name === 'Meal Hero');
  if (heroProps) hero.setProperties(heroProps);
  await loadAll(hero);
  setP(hero, { Question: hp.Question, Menu: hp.Menu, Meal: hp.Meal });
  for (const t of hero.findAll(n => n.type === 'TEXT' && /lunch/i.test(n.characters))) { await loadAll(t); t.characters = t.characters.replace(/lunch/g, 'dinner').replace(/Lunch/g, 'Dinner'); }
  const TITLE = { 'State=Skipping, Selected=None': 'Skipping dinner', 'State=Not sure yet, Selected=None': "Not sure yet · we'll ask again at 4:30", 'State=In, Selected=None': "You're in for dinner" };
  for (const t of hero.findAll(n => n.type === 'TEXT')) { if (t.name === 'Title' && TITLE[hero.mainComponent.name]) t.characters = TITLE[hero.mainComponent.name]; if (t.name === 'Meta' && /Change till/.test(t.characters)) t.characters = 'Change till 6 PM'; }
  const old = c.children.find(x => x.name === 'Dishes'); const i = c.children.indexOf(old); const nd = dinDishes.clone(); c.insertChild(i, nd); old.remove();
  const nav = f.children.find(x => x.name === 'Nav Header'); await loadAll(nav); setP(nav, { Title: 'Dinner' });
  const sb = f.children.find(x => x.name === 'Status Bar'); await loadAll(sb); setP(sb, { Time: '2:00' });
  // annotations
  const lb = labelSrc.clone(); page.appendChild(lb); lb.characters = label; lb.name = 'Label / ' + label; lb.x = f.x; lb.y = f.y - 36;
  const mo = momentSrc.clone(); page.appendChild(mo); mo.x = f.x; mo.y = f.y + 868; for (const t of mo.findAll(n => n.type === 'TEXT' && /\d:\d\d/.test(n.characters))) { t.characters = t.characters.replace(/\d{1,2}:\d{2} (AM|PM)/, '2:00 PM'); t.name = t.characters; } mo.name = 'Moment / Moment: Wed 2:00 PM';
  const sa = sampleSrc.clone(); page.appendChild(sa); sa.x = f.x; sa.y = f.y + 940;
  const lastHero = hero.mainComponent.name;
  rep.push({ id: f.id, name, hero: lastHero, texts: [...new Set(hero.findAll(n => n.type === 'TEXT' && n.visible).map(t => t.characters))].join(' | '), dishes: nd.children.length });
}
// never copy a flow start
const fl = page.flowStartingPoints; const made = new Set(rep.map(r => r.id));
if (fl.length !== flows0) page.flowStartingPoints = fl.filter(x => !made.has(x.nodeId));
return { flows: [flows0, page.flowStartingPoints.length], rep };
