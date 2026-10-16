// GUARDIAN-VIDEO V1 component builder (run once on page 03; ids stored in shared plugin data mealloop/gv_ids).
// Body of async function(figma, args). Builds, as flagged component sets ("GUARDIAN VIDEO 2026-10 (new). …"):
//   MethodTag (Live / Please watch / Photo and text / Confirmed by call / No video)
//   StepList (Sub=Yes / No), WardenTabBar4 (Selected=Queue / Out now / Escalated / History)
//   OutNowRow (Chip=Late / Due soon / Due), HistoryRow (Method=Video / Photo and text / Call / No video)
//   PhraseCard (Surface=Dark / Light), DecisionButtons (State=Default / Disabled)
//   VideoRecorder (Time=0:00 / 0:03 / 0:07 / 0:10), EvidenceCard (Method=Live / Please watch / Photo and text / Confirmed by call / Video expired)
// Fixes applied after the first run: StepList variants set to hug height (resize() had fixed it); the per-variant labels of
// MethodTag and OutNowRow are not bound to a shared text property (a shared default overwrote every variant's label);
// VideoRecorder camera clips its silhouette.
const AF = Object.getPrototypeOf(async function(){}).constructor;
const A = await new AF('figma', 'args', figma.root.getSharedPluginData('mealloop', 'adm'))(figma, {});
const p3 = await figma.getNodeByIdAsync('44:5355');
const ids = JSON.parse(figma.root.getSharedPluginData('mealloop', 'gv_ids') || '{}');
const FLAG = 'GUARDIAN VIDEO 2026-10 (new). ';
const mkSet = async (name, builds, x, y, desc, props) => { const comps = [];
  for (const [vn, fn] of builds) { const f = figma.createFrame(); f.fills = []; p3.appendChild(f); await fn(f); const c = figma.createComponentFromNode(f); c.name = vn; comps.push(c); }
  const set = figma.combineAsVariants(comps, p3); set.name = name; set.description = FLAG + desc;
  let cx = 24, h = 0; for (const c of set.children) { c.x = cx; c.y = 24; cx += c.width + 40; h = Math.max(h, c.height); }
  set.resizeWithoutConstraints(cx - 16, h + 48); set.x = x; set.y = y; set.fills = [A.paint('canvas')];
  for (const [p, def] of (props || [])) { const key = set.addComponentProperty(p, 'TEXT', def); for (const v of set.children) { const t = v.findOne(n => n.type === 'TEXT' && n.name === p); if (t) t.componentPropertyReferences = { characters: key }; } }
  return set; };
// Tag look: lime (ink outline), outline, dashed, quiet (ink-secondary outline).
const tagStyle = (c, k) => { c.fills = []; c.strokes = []; c.dashPattern = [];
  if (k === 'lime') { c.fills = [A.paint('lime')]; c.strokes = [A.paint('ink')]; c.strokeWeight = 1.5; }
  else if (k === 'outline') { c.strokes = [A.paint('ink')]; c.strokeWeight = 1.5; }
  else if (k === 'dashed') { c.strokes = [A.paint('ink')]; c.strokeWeight = 1.5; c.dashPattern = [5, 4]; }
  else if (k === 'quiet') { c.strokes = [A.paint('ink-secondary')]; c.strokeWeight = 1.5; }
  c.strokeAlign = 'INSIDE'; };
// The full builders for each set are the ones run in the session (see guardian_video/decisions.md D1–D6 for the rules
// they follow): sizes 353 wide for cards and rows, rows 56 pt, tab bar 353 × 66, recorder 353 × (404 camera + time,
// caption, 84 pt ring), evidence card 313 wide (inside a 20 pt padded queue card). Checks are ink-outlined circles,
// never lime, so a queue card stays within 3 lime elements (Live tag only). The four viewfinder brackets are one
// vector (one lime element). Mono only for digits: code 4 7 2 (ML/Metric), REC time, step numbers.
return ids;
