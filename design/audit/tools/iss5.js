// Run 2 Stage 5: Issues views (stored as mealloop/iss5). Body of async function(figma, args) -> report.
// args: { frameId, view: 'dishes' | 'community' }. Rebuilds the frame in place on the tab-root shell (ins3a.reset):
// header "Issues" / "Wed lunch · All messes · 1 safety open", pills SOS · 1 / Dishes · 4 / Community · 5, a question
// hero cloned from AD-3a SOS (HeroActions: lime primary, outlined secondary), then
//  dishes:    white card "Complaints this week" / "of 712 entered · dashed = fix on trial", four ranked rows with
//             ChartBar bars drawn to the counts (24 pt per complaint; Sambar = Kind=Gap, dashed, fix on trial).
//  community: "Open · 5" with the student IssueCard (unchanged) and an owner line under each card.
const AF = Object.getPrototypeOf(async function(){}).constructor;
const B = await new AF('figma', figma.root.getSharedPluginData('mealloop', 'ins3a'))(figma);
const f = await figma.getNodeByIdAsync(args.frameId); await B.loadAll(f);
const { content } = await B.reset(f, 'Issues', 'Wed lunch · All messes · 1 safety open');
const pills = await B.pills(content, ['SOS · 1', 'Dishes · 4', 'Community · 5'], args.view === 'dishes' ? 1 : 2);
for (const t of pills.findAll(n => n.type === 'TEXT')) { await B.loadAll(t); await B.mono(t, 'ML/Footnote'); }
const sos = await figma.getNodeByIdAsync('849:564'); const hsrc = sos.findOne(n => n.name === 'Hero · Safety'); await B.loadAll(hsrc);
const hero = hsrc.clone(); content.appendChild(hero); hero.layoutSizingHorizontal = 'FILL'; await B.strip(hero); await B.loadAll(hero);
const H = args.view === 'dishes'
  ? { name: 'Hero · Dish fix', eyebrow: 'Dish · Main Mess', q: 'Will the sambar\nfix hold?', line: 'Salt cut by a third · recheck Fri lunch', a: 'Review fix', b: 'See reports' }
  : { name: 'Hero · Merge', eyebrow: 'Community · Main Mess', q: 'Merge the 3\nlong-wait reports?', line: 'Look alike · 81 students in all', a: 'Compare and merge', b: 'Not now' };
hero.name = H.name;
const er = hero.findOne(n => n.name === 'Eyebrow row'); const et = er.findOne(n => n.type === 'TEXT'); et.characters = H.eyebrow;
hero.findOne(n => n.name === 'Question').characters = H.q;
const ln = hero.findOne(n => n.name === 'Line'); ln.characters = H.line; await B.mono(ln, 'ML/Secondary');
const ha = hero.findOne(n => n.name === 'HeroActions');
const labs = ha.findAll(n => n.type === 'TEXT' && n.name === 'Label'); labs[0].characters = H.a; labs[1].characters = H.b;
const iconOff = [];
for (const inst of ha.findAll(n => n.type === 'INSTANCE')) for (const [k, v] of Object.entries(inst.componentProperties)) if (v.type === 'BOOLEAN' && /icon/i.test(k) && v.value) { inst.setProperties({ [k]: false }); iconOff.push(inst.name); }
for (const n of ha.findAll(n => /^Primary|^Secondary/.test(n.name))) n.name = n.name.split(' · ')[0] + ' · ' + (/^Primary/.test(n.name) ? H.a : H.b);
const rep = { hero: Math.round(hero.height), iconOff, actions: ha.findAll(n => /^Primary|^Secondary/.test(n.name)).map(n => n.name) };
if (args.view === 'dishes') {
  const card = B.frame(content, 'Complaints this week', 'VERTICAL', 12, [16, 16, 16, 16]); card.fills = [await B.paint(B.C.surface)]; card.cornerRadius = 24;
  const hd = B.frame(card, 'Heading', 'VERTICAL', 2);
  await B.text(hd, 'Title', 'Complaints this week', 'ML/Card Heading', B.C.ink);
  await B.text(hd, 'Subtitle', 'of 712 entered · dashed = fix on trial', 'ML/Footnote', B.C.ink2);
  const ROWS = [['Sambar', 'Too salty', 6, true], ['Rice', 'Undercooked', 4], ['Paneer butter masala', 'Too oily', 3], ['Curd', 'Sour', 2]];
  const PER = 24; rep.rows = [];
  for (const [dish, why, n, trial] of ROWS) {
    const r = B.frame(card, 'Row · ' + dish, 'HORIZONTAL', 8); r.counterAxisAlignItems = 'CENTER';
    const l = B.frame(r, 'Dish', 'VERTICAL', 0); l.layoutSizingHorizontal = 'FIXED'; l.resize(132, 10); l.layoutSizingVertical = 'HUG';
    const dn = await B.text(l, 'Name', dish, 'ML/Secondary Medium', B.C.ink);
    await B.text(l, 'Reason', why + (trial ? ' · fix on trial' : ''), 'ML/Footnote', B.C.ink2);
    const track = B.frame(r, 'Bar track', 'HORIZONTAL', 0); track.layoutSizingHorizontal = 'FILL'; track.counterAxisAlignItems = 'CENTER';
    const bar = await B.chartBar(track, trial ? 'Gap' : 'Expected', n * PER, 12, 'Bar · ' + n);
    const ct = await B.text(r, 'Count', String(n), 'ML/Mono Body', B.C.ink, { mono: false, fill: false }); ct.textAlignHorizontal = 'RIGHT'; ct.resize(24, ct.height); ct.textAutoResize = 'HEIGHT';
    rep.rows.push(dish + ' ' + n + ' → ' + bar.width + ' pt' + (trial ? ' dashed' : '') + ' (track ' + Math.round(track.width) + ')');
    if (dish === 'Paneer butter masala') { dn.textAutoResize = 'HEIGHT'; }
  }
} else {
  const comm = await figma.getNodeByIdAsync('221:63630');
  await B.text(content, 'Section · Open', 'Open · 5', 'ML/Section', B.C.ink);
  const list = B.frame(content, 'Open · 5', 'VERTICAL', 12);
  const ITEMS = [['Long wait at counter 3 after 1 PM', 'Seen', '64', 'UPDATED 5H AGO', 'Ravi'], ['Sambar too watery at dinner', 'Working on it', '38', 'UPDATED 2D AGO', 'Ravi'], ['Curd runs out by 8:45 PM', 'Sent', '21', 'UPDATED 1D AGO', 'Devi'], ['Rice undercooked on Mondays', 'Need more info', '17', 'UPDATED 3D AGO', 'Ravi'], ['More breakfast options', 'Seen', '112', 'UPDATED 1D AGO', 'Devi']];
  const src = comm.findOne(n => n.type === 'INSTANCE' && n.mainComponent.parent && n.mainComponent.parent.name === 'IssueCard'); const set = src.mainComponent.parent;
  rep.cards = [];
  for (const [title, step, count, upd, owner] of ITEMS) {
    const w = B.frame(list, 'Card · ' + title, 'VERTICAL', 6);
    const v = set.children.find(c => c.name === 'Step=' + step); await B.loadAll(v); const ic = v.createInstance(); w.appendChild(ic); ic.layoutSizingHorizontal = 'FILL'; await B.loadAll(ic);
    B.setP(ic, { Title: title, Count: count, Updated: upd }); ic.name = 'Issue / ' + title;
    const o = await B.text(w, 'Owner', 'Owner · ' + owner, 'ML/Footnote', B.C.ink2); o.layoutSizingHorizontal = 'FILL';
    const ow = B.frame(w, 'Owner line', 'HORIZONTAL', 0, [0, 16, 0, 16]); ow.appendChild(o);
    rep.cards.push(title + ' · ' + step + ' · ' + count + ' · ' + owner);
  }
}
const vis = content.children.filter(n => n.visible); const last = vis[vis.length - 1];
rep.bottom = Math.round(content.y + last.y + last.height); rep.contentH = Math.round(content.height);
return rep;
