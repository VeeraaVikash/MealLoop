// Student-redesign P5 wiring (stored as mealloop/srp5wire). Body of async function(figma, args).
// args {fam:{Lunch:{U, Send, In, Why, Picked, Skipped, NS, Off, Fail, FailSkip, CutIn, CutNA, CutSk}, Breakfast:{…}, Dinner:{…}}, entry:{Live, Refreshing, Offline, Scanned, Already, Wrong, Walk}}
// Answer flows (I'm in → Saving → I'm in; Skip → Why skipping → reason → Skipped; Not sure), nav Back on every frame, Entry Live / Walk-in card → Scanned, Refreshing → Live after 1.5 s.
// Same logic as the stored copy; self links are skipped (Figma rejects NAVIGATE to the same frame).
const AF = Object.getPrototypeOf(async function(){}).constructor;
const S = await new AF('figma', 'args', figma.root.getSharedPluginData('mealloop', 'srh'))(figma, {});
const g = id => figma.getNodeByIdAsync(id); let n = 0;
const L = async (fid, pred, dest) => { if (!fid || !dest || dest === fid) return; const f = await g(fid); const x = f.findOne(pred); if (x) { await S.link(x, dest); n++; } };
const byName = nm => x => x.name === nm;
const backAll = async fid => { const f = await g(fid); const nav = f.findOne(x => x.name === 'Nav Header'); if (!nav) return; const b = nav.findOne(x => /^Back/.test(x.name)) || nav.findOne(x => x.type === 'INSTANCE' && /chevron/.test(x.name)); if (b) { await S.back(b); n++; } };
for (const [slot, F] of Object.entries(args.fam)) {
  const first = F.Send || F.In;
  await L(F.U, byName("Button / I'm in"), first); await L(F.U, byName('Button / Skip'), F.Why); await L(F.U, byName('Button / Not sure'), F.NS);
  if (F.Send) { const f = await g(F.Send); await f.setReactionsAsync([{ trigger: { type: 'AFTER_TIMEOUT', timeout: 1.2 }, actions: [S.nav(F.In)] }]); n++; }
  await L(F.In, byName('Button / Change answer'), F.U); await L(F.Skipped, byName('Button / Change answer'), F.U);
  for (const w of [F.Why, F.Picked]) { if (!w) continue; await L(w, byName('Reason / Eating elsewhere'), F.Picked || null); await L(w, byName('Button / Skip meal'), F.Skipped || F.U); await L(w, byName('Link / Skip without a reason'), F.Skipped || F.U); }
  await L(F.NS, byName("Button / I'm in"), F.In); await L(F.NS, byName('Button / Skip'), F.Why);
  await L(F.Off, byName("Button / I'm in"), F.In); await L(F.Off, byName('Button / Skip'), F.Why); await L(F.Off, byName('Button / Not sure'), F.NS);
  for (const fl of [F.Fail, F.FailSkip]) await L(fl, byName("Button / I'm in"), first);
  for (const id of Object.values(F)) await backAll(id);
}
const E = args.entry;
for (const id of Object.values(E)) await backAll(id);
await L(E.Live, byName('EntryQRCard'), E.Scanned); await L(E.Walk, byName('EntryQRCard'), E.Scanned);
if (E.Refreshing) { const f = await g(E.Refreshing); await f.setReactionsAsync([{ trigger: { type: 'AFTER_TIMEOUT', timeout: 1.5 }, actions: [S.nav(E.Live)] }]); n++; }
for (const p of figma.root.children) p.flowStartingPoints = p.flowStartingPoints.filter(s => !/^Flow \d+$/.test(s.name));
return n;
