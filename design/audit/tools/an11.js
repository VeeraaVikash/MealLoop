// Final-2 G11 annotation tool (stored as mealloop/an11). Body of async function(figma, args).
// args: { frameId, label, moment } -> adds "Label / <label>" at y - 36, "Moment / Moment: <moment>" at y + 868 and
// a SampleNote ("All data is sample") at y + 940 next to a phone frame on any page. Templates are taken from the same
// page when it has them, else from page 04 (Label 89:7454, Moment 153:49848, SampleNote 89:7455). Replaces its own
// earlier annotations for the same frame (shared plugin data mealloop/an11 = frame id).
const f = await figma.getNodeByIdAsync(args.frameId); const page = (() => { let p = f; while (p.type !== 'PAGE') p = p.parent; return p; })();
const host = f.parent;
for (const k of host.children.slice()) if (k.getSharedPluginData('mealloop', 'an11') === f.id) k.remove();
const pick = async (re, type, fallback) => { const n = page.children.find(k => re.test(k.name) && k.type === type); return n || await figma.getNodeByIdAsync(fallback); };
const L = await pick(/^Label \/ /, 'TEXT', '89:7454'), M = await pick(/^Moment \/ Moment: /, 'FRAME', '153:49848'), S = await pick(/^Sample note$/, 'INSTANCE', '89:7455');
await figma.loadFontAsync(L.fontName);
const l = L.clone(); host.appendChild(l); l.characters = args.label; l.name = 'Label / ' + args.label; l.x = f.x; l.y = f.y - 36;
const m = M.clone(); host.appendChild(m); const mt = m.findAllWithCriteria({ types: ['TEXT'] }).find(t => /^Moment: /.test(t.characters));
await figma.loadFontAsync(mt.fontName); mt.characters = 'Moment: ' + args.moment; m.name = 'Moment / Moment: ' + args.moment; m.x = f.x; m.y = f.y + 868;
const s = S.clone(); host.appendChild(s); s.x = f.x; s.y = f.y + 940;
for (const k of [l, m, s]) k.setSharedPluginData('mealloop', 'an11', f.id);
return [l.id, m.id, s.id];
