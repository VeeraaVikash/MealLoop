// GUARDIAN-VIDEO V5 spacing fixer (stored as mealloop/gvfix). Body of async function(figma, args) -> F.
// F.anchor(frame, startPred): wraps the trailing children of the content stack (from the first child matching startPred, after the
//   heading block) into "Bottom actions" (grows, aligned to the bottom) and makes the content stack end 16 pt above the limit
//   (tab bar top, or the 818 safe area), so the empty band above the bottom is 16 pt. Returns [before, after] bands or null.
// F.band(frame) -> empty band above the limit for the content stack.
const F = {};
F.content = f => f.children.find(n => n.type === 'FRAME' && n.layoutMode === 'VERTICAL' && n.width >= 380 && n.visible && !/^Sheet/.test(n.name));
F.limit = f => { const tb = f.children.find(n => n.name === 'Tab Bar'); return tb ? tb.y : 818; };
F.bottom = c => { let b = 0; for (const k of c.children) if (k.visible && k.layoutPositioning !== 'ABSOLUTE') b = Math.max(b, c.y + k.y + k.height); return b; };
F.band = f => { const c = F.content(f); if (!c) return null; return Math.round(F.limit(f) - F.bottom(c)); };
F.anchor = (f, startPred, minIndex) => { const c = F.content(f); if (!c) return null; const before = F.band(f); if (before === null || before <= 24) return [before, before];
  const kids = c.children.filter(k => k.layoutPositioning !== 'ABSOLUTE'); let i = kids.findIndex((k, j) => j >= (minIndex || 2) && startPred(k)); if (i < 0) return [before, 'no trailing group'];
  const g = figma.createFrame(); g.name = 'Bottom actions'; g.fills = []; g.layoutMode = 'VERTICAL'; g.itemSpacing = c.itemSpacing; g.primaryAxisAlignItems = 'MAX'; g.counterAxisAlignItems = 'MIN';
  c.insertChild(c.children.indexOf(kids[i]), g); for (const k of kids.slice(i)) { const fillW = k.layoutSizingHorizontal === 'FILL'; g.appendChild(k); if (fillW) k.layoutSizingHorizontal = 'FILL'; }
  g.layoutSizingHorizontal = 'FILL'; g.layoutGrow = 1;
  const lim = F.limit(f); c.primaryAxisSizingMode = 'FIXED'; c.paddingBottom = 16; c.resize(c.width, lim - c.y); g.layoutGrow = 1;
  return [before, Math.round(lim - (c.y + g.y + g.height))]; };
F.grow = (f, node, by) => { const before = F.band(f); node.resize(node.width, node.height + by); return [before, F.band(f)]; };
return F;
