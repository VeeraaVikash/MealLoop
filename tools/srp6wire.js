// Student-redesign P6 Community wiring (stored as mealloop/srp6wire). Body of async function(figma, args).
// args {ids:{L, LS, LB, LF, LO, FX, FXE, E, INFO, I, IS, IB, IO, IH, Comments, Report}}
const AF = Object.getPrototypeOf(async function(){}).constructor;
const S = await new AF('figma', 'args', figma.root.getSharedPluginData('mealloop', 'srh'))(figma, {});
const g = id => figma.getNodeByIdAsync(id); let n = 0; const W = args.ids;
const L = async (fid, node, dest) => { if (!node || !dest || dest === fid) return; await S.link(node, dest); n++; };
const seg = (f, label) => { const tabs = f.findOne(x => x.name === 'Tabs'); if (!tabs) return null; const t = tabs.findOne(x => x.type === 'TEXT' && x.characters === label); return t ? t.parent : null; };
const info = f => { const nav = f.findOne(x => x.name === 'Nav Header'); if (!nav) return null; const ic = nav.findAll(x => x.name === 'Icon' && x.type === 'INSTANCE'); return ic.length ? (ic[ic.length - 1].parent || ic[ic.length - 1]) : null; };
for (const k of ['L', 'LS', 'LB', 'LF', 'LO', 'E']) { const id = W[k]; if (!id) continue; const f = await g(id);
  await L(id, seg(f, 'Fixed'), W.FX); await L(id, info(f), W.INFO); await L(id, f.findOne(x => x.name === 'Button / Report a problem'), W.Report);
  const cards = f.findAll(x => x.name && x.name.startsWith('IssueCard / '));
  for (const c of cards) { if (c.name.endsWith('Long wait at counter 3 after 1 PM')) await L(id, c, W.I);
    const me = c.findOne(x => x.name === 'Button / Me too'); if (me) await L(id, me, k === 'LO' ? W.LB : W.LS);
    const tr = c.findOne(x => x.name === 'Button / Failed'); if (tr) await L(id, tr, W.LS);
    const u = c.findOne(x => x.name === 'Undo'); if (u) await L(id, u, W.L); } }
for (const k of ['FX', 'FXE']) { const id = W[k]; if (!id) continue; const f = await g(id); await L(id, seg(f, 'Open'), W.L); await L(id, info(f), W.INFO); }
if (W.LS) { const f = await g(W.LS); await f.setReactionsAsync([{ trigger: { type: 'AFTER_TIMEOUT', timeout: 1.2 }, actions: [S.nav(W.LB)] }]); n++; }
if (W.IS) { const f = await g(W.IS); await f.setReactionsAsync([{ trigger: { type: 'AFTER_TIMEOUT', timeout: 1.2 }, actions: [S.nav(W.IB)] }]); n++; }
for (const k of ['I', 'IS', 'IB', 'IO', 'IH']) { const id = W[k]; if (!id) continue; const f = await g(id);
  const nav = f.findOne(x => x.name === 'Nav Header'); const b = nav && (nav.findOne(x => /^Back/.test(x.name))); if (b) { await S.back(b); n++; }
  await L(id, f.findOne(x => x.name === 'Button / Me too'), k === 'IO' ? W.IB : W.IS); await L(id, f.findOne(x => x.name === 'Undo'), W.I); await L(id, f.findOne(x => x.name === 'Comments row'), W.Comments); }
for (const p of figma.root.children) p.flowStartingPoints = p.flowStartingPoints.filter(s => !/^Flow \d+$/.test(s.name));
return n;
