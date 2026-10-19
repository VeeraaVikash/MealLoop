// KITCHEN pack v2 W5 Record waste changes in place (page 09). Body of async function(figma, args); loads ktw as D.
// Every Record waste frame: the "Chip · progress" becomes plain text "Done N of M" (ML/Body, ink-secondary); "Review and send" becomes "Review and save".
// Check and send -> Check and save ("Enter 2 more" blocked; "You can edit this later." + Save report). Sent for review -> Report saved (Saved 2:40 PM).
const D = await new (Object.getPrototypeOf(async function(){}).constructor)('figma','args',figma.root.getSharedPluginData('mealloop','ktw'))(figma,{});
const KF = D.KF; const out = []; let chips = 0, bars = 0;
const keys = ['wNS','wDraft','qPulao','wPulao','wPulaoZ','wPulaoN','qChap','wAll','qOver','qNaN','qNeg','cBlocked','cSend','unsaved','addSheet','wAdded','wSOS','sent'];
const txt = async (f, from, to) => { const t = f.findOne(n => n.type === 'TEXT' && n.characters === from); if (!t) { out.push('missing «' + from + '» in ' + f.name); return null; } await D.setText(t, to); if (t.name === from) t.name = to; return t; };
const btn = async (f, from, to, nm) => { const b = f.findOne(n => n.name === 'Button / ' + from); if (!b) { out.push('missing button ' + from + ' in ' + f.name); return null; } b.name = 'Button / ' + (nm || to); const t = b.findOne(n => n.type === 'TEXT'); await D.setText(t, to); t.name = to; return b; };
const relabel = async (f, oldName, newName, note) => { const sec = f.parent; f.name = newName;
  for (const n of sec.children) { if (n.type !== 'TEXT' || Math.abs(n.x - f.x) > 2) continue;
    if (n.name === 'Label / ' + oldName) { n.name = 'Label / ' + newName; await D.setText(n, newName); }
    if (note && n.name === 'Note / Simulated') await D.setText(n, note); } };
for (const k of keys) { const f = await figma.getNodeByIdAsync(KF[k]);
  const ch = f.findOne(n => n.name === 'Chip · progress');
  if (ch) { const s = ch.findAll(n => n.type === 'TEXT').map(n => n.characters).join(' '); const p = ch.parent; const i = p.children.indexOf(ch);
    const t = await D.t(p, s, 'ML/Body', 'ink-secondary', { fill: true, name: 'Progress' }); p.insertChild(i, t); ch.remove(); chips++; }
  if (f.findOne(n => n.name === 'Button / Review and send')) { await btn(f, 'Review and send', 'Review and save'); bars++; } }
// Check and save, blocked
{ const f = await figma.getNodeByIdAsync(KF.cBlocked); await txt(f, 'Check and send', 'Check and save');
  const b = f.findOne(n => n.name.startsWith('Button / Enter 2 more')); b.name = 'Button / Enter 2 more (blocked)'; const t = b.findOne(n => n.type === 'TEXT'); await D.setText(t, 'Enter 2 more'); t.name = 'Enter 2 more';
  await relabel(f, 'KS-3 · Check and send — Enter 2 more', 'KS-3 · Check and save — Enter 2 more', 'Simulated: two dishes are not entered; saving is blocked until each has an amount, None left or Not made.'); }
// Check and save
{ const f = await figma.getNodeByIdAsync(KF.cSend); await txt(f, 'Check and send', 'Check and save'); await txt(f, 'Ravi reviews this. You can edit it until he does.', 'You can edit this later.');
  await btn(f, 'Send to Ravi for review', 'Save report');
  await relabel(f, 'KS-3 · Check and send', 'KS-3 · Check and save', 'Simulated: Save report stores the report on the meal service; nothing syncs in Figma. No review or approval follows.'); }
// Report saved
{ const f = await figma.getNodeByIdAsync(KF.sent); await txt(f, 'Sent to Ravi for review', 'Report saved');
  const rs = f.findOne(n => n.name === 'ResultScreen'); const body = rs.findAll(n => n.type === 'TEXT').find(n => /Waiting|Ravi|edit/.test(n.characters)); if (body) await D.setText(body, 'You can edit it until 8:40 PM.'); else out.push('no result body');
  const row = f.findOne(n => n.name === 'Row / Sent'); row.name = 'Row / Saved'; await D.setText(row.findOne(n => n.name === 'Label'), 'Saved'); await D.setText(row.findOne(n => n.name === 'Value'), '2:40 PM');
  const sb = f.findOne(n => n.name === 'Status Bar'); const tk = Object.keys(sb.componentProperties).find(k => /^Time/i.test(k)); if (tk) sb.setProperties({ [tk]: '2:40' }); else { const tt = sb.findOne(n => n.type === 'TEXT' && /^\d+:\d\d$/.test(n.characters)); if (tt) await D.setText(tt, '2:40'); }
  await relabel(f, 'KS-3 · Sent for review', 'KS-3 · Report saved', 'Simulated: the server saved the report at 2:40 PM; editing stays open for 6 hours (until 8:40 PM). Nothing syncs in Figma.');
  out.push('result texts: ' + rs.findAll(n => n.type === 'TEXT').map(n => n.characters).join(' / ')); }
out.push('chips ' + chips + ', bars ' + bars); return out;
