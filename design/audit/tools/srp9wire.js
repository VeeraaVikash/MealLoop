// Student-redesign P9 wiring (stored as mealloop/srp9wire). Body of async function(figma, args).
// args {ids:{you[], outings, credits, attendance, spending, my, help, terms, signout, creditsAll[], getting, ticket, history, balance, spendingAll[], addexp, notif[], answerB, pass, all[]}}
const AF = Object.getPrototypeOf(async function(){}).constructor;
const S = await new AF('figma', 'args', figma.root.getSharedPluginData('mealloop', 'srh'))(figma, {});
const g = id => figma.getNodeByIdAsync(id); let n = 0; const W = args.ids;
const L = async (fid, nm, dest) => { if (!fid || !dest || dest === fid) return; const f = await g(fid); for (const x of f.findAll(y => y.name === nm)) { await S.link(x, dest); n++; } };
const back = async fid => { const f = await g(fid); const nav = f.findOne(y => y.name === 'Nav Header'); const b = nav && nav.findOne(y => /^Back/.test(y.name)); if (b) { await S.back(b); n++; } };
for (const id of W.all) await back(id);
for (const y of W.you) { await L(y, 'Row / Outings', W.outings); await L(y, 'Row / Credits', W.credits); await L(y, 'Row / Attendance', W.attendance); await L(y, 'Row / Spending', W.spending); await L(y, 'Row / My feedback', W.my); await L(y, 'Row / Help', W.help); await L(y, 'Row / Terms and privacy', W.terms); await L(y, 'Row / Sign out', W.signout); }
for (const cdt of W.creditsAll) { await L(cdt, 'Button / Juice', W.getting); await L(cdt, 'Button / Ice cream', W.getting); await L(cdt, 'Row / History', W.history); await L(cdt, 'Row / Something wrong with your balance?', W.balance); }
if (W.getting) { const f = await g(W.getting); await f.setReactionsAsync([{ trigger: { type: 'AFTER_TIMEOUT', timeout: 1.2 }, actions: [S.nav(W.ticket)] }]); n++; }
for (const sp of W.spendingAll) await L(sp, 'Button / Add spending', W.addexp);
for (const nf of W.notif) { await L(nf, 'Notification / Your guardian approved your outing', W.outings); await L(nf, 'Notification / Breakfast today?', W.answerB); await L(nf, 'Notification / The kitchen saw your feedback', W.my); await L(nf, 'Notification / Special pass on Wednesday', W.pass); }
for (const p of figma.root.children) p.flowStartingPoints = p.flowStartingPoints.filter(s => !/^Flow \d+$/.test(s.name));
return n;
