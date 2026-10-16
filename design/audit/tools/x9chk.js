// ADMIN-REDESIGN X9 checks (stored as mealloop/x9chk). Body of async function(figma, args). args: { from, to } (run in chunks of 25).
// Per 393 pt frame on page 12: contrast (text fill vs the nearest solid ancestor fill, lowest 15), words in mono, lime element count (> 3),
// lime text on light, OrbitBackdrop present, text under 12 pt outside the tab bar, linked layers under 44 pt, truncation, horizontal overflow,
// unbound solid paints, banned content (kcal, nutrition, cook instructions, "or" between dishes).
// Known miss (X10): the mono-word filter strips units first, so a mono "of 3,500" passed; fixed by hand in StatBars (decision 36).
figma.skipInvisibleInstanceChildren = true;
const pg = await figma.getNodeByIdAsync('2237:2'); const frames = pg.findAll(n => n.type === 'FRAME' && Math.abs(n.width - 393) < 1 && n.parent && (n.parent.type === 'PAGE' || n.parent.type === 'SECTION') && !/^Moment/.test(n.name)).slice(args.from, args.to); // FIX-2: page 12 frames now sit in sections
const V = {}; for (const c of await figma.variables.getLocalVariableCollectionsAsync()) if (/^ML /.test(c.name)) for (const id of c.variableIds) { const v = await figma.variables.getVariableByIdAsync(id); V[v.id] = v; }
const col = p => { if (!p || p.type !== 'SOLID' || p.visible === false) return null; const b = p.boundVariables && p.boundVariables.color; if (b) { const v = V[b.id]; if (v) { const val = v.valuesByMode[Object.keys(v.valuesByMode)[0]]; if (val && val.r !== undefined) return { c: val, name: v.name, a: (val.a === undefined ? 1 : val.a) * (p.opacity === undefined ? 1 : p.opacity) }; } } return { c: p.color, name: null, a: p.opacity === undefined ? 1 : p.opacity }; };
const lum = c => { const f = x => x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b); };
const ratio = (a, b) => { const l1 = lum(a), l2 = lum(b); return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05); };
const vis = (n, f) => { let q = n; while (q && q !== f) { if (q.visible === false || q.opacity === 0) return false; q = q.parent; } return true; };
const inBackdrop = (n, f) => { let q = n; while (q && q !== f) { if (/^(OrbitBackdrop|OrbitMark|Status Bar|Home Indicator)/.test(q.name)) return true; q = q.parent; } return false; };
const bgOf = (n, f) => { let q = n.parent; while (q) { if ('fills' in q && Array.isArray(q.fills)) { for (let i = q.fills.length - 1; i >= 0; i--) { const c = col(q.fills[i]); if (c && c.a > 0.9) return c; } } if (q === f) break; q = q.parent; } return { c: { r: 0.93, g: 0.93, b: 0.91 }, name: 'canvas' }; };
const R = { frames: frames.length, texts: 0, contrast: [], mono: [], lime: [], noBackdrop: [], small: [], targets: [], trunc: [], overflow: [], raw: 0, rawEx: [], banned: [], limeOnLight: [] };
for (const f of frames) {
  if (!f.children.some(n => n.name === 'OrbitBackdrop')) R.noBackdrop.push(f.name);
  const fb = f.absoluteBoundingBox; const sheet = f.children.some(n => n.name === 'Scrim' && n.visible);
  let limeN = 0;
  for (const n of f.findAll(x => true)) { if (!vis(n, f) || inBackdrop(n, f)) continue;
    if (n.type === 'TEXT') { R.texts++; const fs = n.fontSize === figma.mixed ? 99 : n.fontSize; const fam = n.fontName === figma.mixed ? '' : n.fontName.family;
      let inTab = false; let q = n.parent; while (q && q !== f) { if (q.name === 'Tab Bar') inTab = true; q = q.parent; }
      if (fs < 12 && !inTab) R.small.push(f.name.slice(0, 30) + ': ' + n.characters.slice(0, 20) + ' ' + fs);
      if (/Mono/.test(fam)) { const w = n.characters.replace(/\b(AM|PM|L|kg|min|h|pts?|g)\b/g, '').replace(/[0-9.,:%→+−\-–•· \/~±m]/g, ''); if (/[A-Za-z]{2,}/.test(w)) R.mono.push(f.name.slice(0, 25) + ': ' + n.characters.slice(0, 24)); }
      if (n.textTruncation === 'ENDING') R.trunc.push(f.name.slice(0, 25) + ': ' + n.characters.slice(0, 20));
      if (/kcal|calori|nutrition|\bcook (\d|[a-z]+ litres)|planned quantity/i.test(n.characters) || /[a-z] or [A-Z][a-z]+ (Briyani|Biryani|Curry|Dal)/.test(n.characters)) R.banned.push(f.name.slice(0, 25) + ': ' + n.characters.slice(0, 30));
      const fc = Array.isArray(n.fills) ? col(n.fills[0]) : null; if (fc && !sheet) { const bg = bgOf(n, f); const r = ratio(fc.c, bg.c); if (r < 7) R.contrast.push([+r.toFixed(2), f.name.slice(0, 28) + ': ' + n.characters.slice(0, 18) + ' (' + fc.name + ' on ' + bg.name + ')']); if (fc.name === 'lime' && lum(bg.c) > 0.5) R.limeOnLight.push(f.name.slice(0, 25) + ': ' + n.characters.slice(0, 18)); } }
    if ('fills' in n && Array.isArray(n.fills)) for (const p of n.fills) { if (p.type === 'SOLID' && p.visible !== false && !(p.boundVariables && p.boundVariables.color)) { let inInst = false; let q = n.parent; while (q && q !== f) { if (q.type === 'INSTANCE') inInst = true; q = q.parent; } if (!inInst && n.type !== 'INSTANCE') { R.raw++; if (R.rawEx.length < 8) R.rawEx.push(f.name.slice(0, 20) + '/' + n.name.slice(0, 20)); } } }
    const isLime = ('fills' in n && Array.isArray(n.fills) && n.fills.some(p => { const c = col(p); return c && c.name === 'lime'; })) || ('strokes' in n && Array.isArray(n.strokes) && n.strokes.some(p => { const c = col(p); return c && c.name === 'lime'; }));
    if (isLime && n.type !== 'TEXT') { let anc = false; let q = n.parent; while (q && q !== f) { if ('fills' in q && Array.isArray(q.fills) && q.fills.some(p => { const c = col(p); return c && c.name === 'lime'; })) anc = true; q = q.parent; } if (!anc) limeN++; }
    if (isLime && n.type === 'TEXT') limeN++;
    if (n.reactions && n.reactions.length && n !== f && n.name !== 'Status Bar') { const b = n.absoluteBoundingBox; if (b && (b.width < 43.5 || b.height < 43.5)) R.targets.push(f.name.slice(0, 25) + ': ' + n.name.slice(0, 24) + ' ' + Math.round(b.width) + 'x' + Math.round(b.height)); }
    if (n.type !== 'FRAME' || n.parent !== f) { const b = n.absoluteBoundingBox; if (b && n.type !== 'ELLIPSE' && !/Notch|Line|Perforation|Scrim|Sheet/.test(n.name) && (b.x + b.width > fb.x + 393.5 || b.x < fb.x - 0.5) && b.width < 392) R.overflow.push(f.name.slice(0, 25) + ': ' + n.name.slice(0, 20)); }
  }
  if (limeN > 3) R.lime.push(f.name.slice(0, 32) + ' ' + limeN);
}
R.contrast.sort((a, b) => a[0] - b[0]); R.contrast = R.contrast.slice(0, 15); R.overflow = [...new Set(R.overflow)].slice(0, 20); R.targets = [...new Set(R.targets)].slice(0, 30);
return R;
