// Student-redesign P7 Feedback wiring (stored as mealloop/srp7wire). Body of async function(figma, args).
// args {ids:{G, T, D, DM, WS, WP, WI, WO, WM, N, SND, SNT, FL, OFF, MY, MYB, MYE, MYO}, ext:{home, issue, community, sos}}
const AF = Object.getPrototypeOf(async function(){}).constructor;
const S = await new AF('figma', 'args', figma.root.getSharedPluginData('mealloop', 'srh'))(figma, {});
const g = id => figma.getNodeByIdAsync(id); let n = 0; const W = args.ids, X = args.ext;
const L = async (fid, pred, dest) => { if (!fid || !dest || dest === fid) return; const f = await g(fid); const x = typeof pred === 'string' ? f.findOne(y => y.name === pred) : f.findOne(pred); if (x) { await S.link(x, dest); n++; } };
const backs = async fid => { const f = await g(fid); for (const b of f.findAll(y => y.name === 'Back' || (y.name === 'Close' && y.type === 'INSTANCE'))) { await S.back(b); n++; } const nav = f.findOne(y => y.name === 'Nav Header'); if (nav) { const b = nav.findOne(y => /^Back/.test(y.name)); if (b) { await S.back(b); n++; } } };
for (const id of Object.values(W)) await backs(id);
await L(W.G, 'FaceButton / Good', W.T); await L(W.G, 'FaceButton / Not good', W.D);
await L(W.T, 'Button / Done', X.home); await L(W.SNT, 'Button / Done', X.home); await L(W.SNT, 'Link / See it in My feedback', W.MY);
for (const d of [W.D, W.DM]) { await L(d, 'Button / Me too', X.issue); await L(d, 'DishTile / Millet Idli', W.WI); await L(d, 'DishTile / Pongal', W.WP); await L(d, 'DishTile / Sambar', W.WS); await L(d, 'More dishes', W.DM); await L(d, 'Service', X.community); await L(d, 'Link / Unsafe or unwell? Use SOS', X.sos);
  await L(d, 'Dish chip / Milk', W.WM); await L(d, 'Dish chip / Masala Omelet', W.WO); }
for (const w of [W.WS, W.WP, W.WI, W.WO, W.WM, W.N, W.FL, W.OFF]) { await L(w, 'Button / Send', w === W.OFF ? W.MY : W.SND); await L(w, 'Link / Unsafe or unwell? Use SOS', X.sos); }
await L(W.WS, 'Link / Add a note', W.N);
if (W.SND) { const f = await g(W.SND); await f.setReactionsAsync([{ trigger: { type: 'AFTER_TIMEOUT', timeout: 1.2 }, actions: [S.nav(W.SNT)] }]); n++; }
await L(W.MY, 'Button / Better', W.MYB); await L(W.MY, 'Button / Same', W.MYB);
for (const p of figma.root.children) p.flowStartingPoints = p.flowStartingPoints.filter(s => !/^Flow \d+$/.test(s.name));
return n;
