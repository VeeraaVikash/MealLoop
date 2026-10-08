// Brand audit render check (stored as mealloop/px15). Body of async function(figma, args).
// args: { ids: [nodeId...], tag, compare (tag to compare with, optional), scale (default 1) }
// Exports each node as PNG at `scale`, hashes the bytes (FNV-1a 32 + length) and stores the list under shared plugin
// data mealloop/px_<tag>. With `compare`, returns which nodes differ from the stored run. Identical bytes mean identical
// pixels (the PNG encoder is deterministic); a node that differs is then screenshotted and compared by eye/pixels.
const h = b => { let x = 0x811c9dc5; for (let i = 0; i < b.length; i++) { x ^= b[i]; x = Math.imul(x, 0x01000193) >>> 0; } return x.toString(16) + ':' + b.length; };
const out = {}; const res = {};
for (const id of args.ids) { const n = await figma.getNodeByIdAsync(id); if (!n) { res[id] = 'missing'; continue; }
  const b = await n.exportAsync({ format: 'PNG', constraint: { type: 'SCALE', value: args.scale || 1 } }); res[id] = h(b); }
figma.root.setSharedPluginData('mealloop', 'px_' + args.tag, JSON.stringify(res));
if (args.compare) { const old = JSON.parse(figma.root.getSharedPluginData('mealloop', 'px_' + args.compare) || '{}');
  out.same = 0; out.diff = []; for (const id in res) { if (old[id] === res[id]) out.same++; else out.diff.push(id + ' ' + old[id] + ' → ' + res[id]); } }
out.n = Object.keys(res).length; return out;
