// ADMIN-REDESIGN X8 wiring helpers (stored as mealloop/x8wire). Body of async function(figma, args); returns W.
// W.link(frame, layerName|RegExp, targetFrameName): ON_CLICK navigate (dissolve 0.25 s), no self-links; W.timer: AFTER_TIMEOUT;
// W.back: BACK action on the "Back" layer; W.close: the sheet's Close returns to the page underneath. Missing layers go to W.log.
figma.skipInvisibleInstanceChildren = false;
const W = {}; W.pg = await figma.getNodeByIdAsync('2237:2');
W.frames = W.pg.children.filter(n => n.type === 'FRAME' && Math.abs(n.width - 393) < 1);
W.F = name => { const f = W.frames.find(n => n.name === name); if (!f) throw new Error('frame ' + name); return f; };
W.act = (id) => ({ type: 'NODE', destinationId: id, navigation: 'NAVIGATE', transition: { type: 'DISSOLVE', easing: { type: 'EASE_OUT' }, duration: 0.25 }, resetVideoPosition: false, resetScrollPosition: true });
W.log = [];
W.find = (f, q) => f.findOne(n => typeof q === 'string' ? n.name === q : q.test(n.name));
W.link = async (f, q, target) => { const fr = typeof f === 'string' ? W.F(f) : f; const n = W.find(fr, q); if (!n) { W.log.push('MISSING ' + fr.name + ' / ' + q); return; } const t = W.F(target); if (t === fr) return; await n.setReactionsAsync([{ trigger: { type: 'ON_CLICK' }, actions: [W.act(t.id)] }]); };
W.timer = async (f, target, sec) => { const fr = W.F(f); await fr.setReactionsAsync([{ trigger: { type: 'AFTER_TIMEOUT', timeout: sec || 0.8 }, actions: [W.act(W.F(target).id)] }]); };
W.back = async (fr) => { const b = W.find(fr, 'Back'); if (b) await b.setReactionsAsync([{ trigger: { type: 'ON_CLICK' }, actions: [{ type: 'BACK' }] }]); };
W.close = async (f, target) => { const fr = W.F(f); const sh = W.find(fr, 'Sheet'); const c = sh && sh.findOne(n => n.name === 'Close'); if (c) await c.setReactionsAsync([{ trigger: { type: 'ON_CLICK' }, actions: [W.act(W.F(target).id)] }]); else W.log.push('NO CLOSE ' + f); };
return W;
