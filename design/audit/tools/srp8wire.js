// Student-redesign P8 SOS wiring (stored as mealloop/srp8wire). Body of async function(figma, args).
// args {pageId, ids:{C, CU, CAM, CNG, CD, R, RNG, RNP, RO, RF, SENT}, ext:{home}}
// Choose → Camera (shutter) → Review → Send SOS → Sent → Done → Home; unwell → Review without photo; camera denied → Send without photo.
// Also points every Home "SOS" header button and every feedback "Unsafe or unwell? Use SOS" link on the page to Choose.
const AF = Object.getPrototypeOf(async function(){}).constructor;
const S = await new AF('figma', 'args', figma.root.getSharedPluginData('mealloop', 'srh'))(figma, {});
const g = id => figma.getNodeByIdAsync(id); let n = 0; const W = args.ids, X = args.ext;
const L = async (fid, pred, dest) => { if (!fid || !dest || dest === fid) return; const f = await g(fid); const x = typeof pred === 'string' ? f.findOne(y => y.name === pred) : f.findOne(pred); if (x) { await S.link(x, dest); n++; } };
const back = async (fid, nm) => { const f = await g(fid); const nav = f.findOne(y => y.name === 'Nav Header'); const b = nm ? f.findOne(y => y.name === nm) : nav && nav.findOne(y => /^Back/.test(y.name)); if (b) { await S.back(b); n++; } };
for (const id of [W.C, W.CU, W.R, W.RNG, W.RNP, W.RO, W.RF]) await back(id);
for (const id of [W.CAM, W.CNG, W.CD]) await back(id, 'Close');
await L(W.C, 'Button / Next', W.CAM); await L(W.C, 'Option / I feel unwell after eating', W.CU);
await L(W.CU, 'Button / Next', W.CAM); await L(W.CU, 'Button / Send without photo', W.RNP); await L(W.CU, 'Option / Found something in my food', W.C);
await L(W.CAM, 'Shutter', W.R); await L(W.CNG, 'Shutter', W.RNG); await L(W.CD, 'Button / Send without photo', W.RNP);
for (const r of [W.R, W.RNG, W.RNP, W.RO, W.RF]) { await L(r, 'Button / Send SOS', W.SENT); const f = await g(r); const pc = f.findOne(y => y.name === 'ProofCard'); if (pc) { const lk = pc.findOne(y => y.name === 'Link'); if (lk && r !== W.RNP) { await S.link(lk, W.CAM); n++; } } }
await L(W.SENT, 'Button / Done', X.home);
const pg = await g(args.pageId);
for (const f of pg.children.filter(y => y.type === 'FRAME' && /^Home/.test(y.name))) { const sos = f.findOne(y => y.name === 'SOS'); if (sos) { await S.link(sos, W.C); n++; } }
for (const f of pg.children.filter(y => y.type === 'FRAME' && /^Feedback/.test(y.name))) for (const lk of f.findAll(y => y.name === 'Link / Unsafe or unwell? Use SOS')) { await S.link(lk, W.C); n++; }
for (const p of figma.root.children) p.flowStartingPoints = p.flowStartingPoints.filter(s => !/^Flow \d+$/.test(s.name));
return n;
