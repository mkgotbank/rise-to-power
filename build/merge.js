/* ============================================================
   Rise to Power — content build/merge
   Reads AI-generated JSON from .gen/, validates every object
   against the engine's DSL allowlists, drops flagged/broken/dupe
   items, merges with the hand-authored seeds, and rewrites the
   final data/*.js files. Deterministic — safe to re-run.
   Usage: node build/merge.js
   ============================================================ */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const gen = path.join(root, '.gen');
const dataDir = path.join(root, 'data');

// ---- DSL allowlists (must mirror engine.js) ----
const EFF_KEYS = new Set(['health', 'happiness', 'smarts', 'looks', 'karma', 'money', 'moneyMul', 'salary', 'salaryMul', 'flag', 'flagInc', 'rel', 'relAll', 'addAsset', 'loseAssetKind', 'addCondition', 'cureCondition', 'notoriety', 'jail', 'crimeName', 'fame', 'followers', 'respect', 'approval', 'addTrait', 'die', 'dieCause']);
const COND_KEYS = new Set(['minAge', 'maxAge', 'sex', 'hasJob', 'noJob', 'inSchool', 'notSchool', 'married', 'single', 'hasKids', 'noKids', 'inPrison', 'notPrison', 'minMoney', 'maxMoney', 'country', 'hasFlag', 'notFlag', 'minStat', 'maxStat', 'hasPartnerKind', 'famous']);
const NUM_EFF = new Set(['health', 'happiness', 'smarts', 'looks', 'karma', 'money', 'moneyMul', 'salary', 'salaryMul', 'relAll', 'notoriety', 'jail', 'fame', 'followers', 'respect', 'approval']);
const TYPES = new Set(['event', 'crime', 'love', 'family', 'health', 'money', 'school', 'war']);

const isObj = (x) => x && typeof x === 'object' && !Array.isArray(x);
const num = (x, d) => (typeof x === 'number' && isFinite(x) ? x : d);

// drops from review
let DROP = new Set();
const dropFile = path.join(gen, '_drops.json');
if (fs.existsSync(dropFile)) {
  try { DROP = new Set(JSON.parse(fs.readFileSync(dropFile, 'utf8'))); } catch (e) {}
}

// ---- load existing seed data via the same shim as the game ----
function loadSeeds() {
  const store = {};
  const sb = { console, performance: { now: () => 1 }, localStorage: { getItem: () => null, setItem() {}, removeItem() {} }, Math, JSON, Date, parseInt, parseFloat, isNaN };
  sb.window = sb; const ctx = vm.createContext(sb);
  ['countries', 'names', 'careers', 'activities', 'events', 'crimes', 'health', 'assets', 'orgs', 'missions', 'world'].forEach((k) => {
    const f = path.join(dataDir, k + '.js');
    if (fs.existsSync(f)) vm.runInContext(fs.readFileSync(f, 'utf8'), ctx, { filename: k + '.js' });
  });
  return sb.RTP.data || {};
}

function readGen(prefix) {
  const out = [];
  if (!fs.existsSync(gen)) return out;
  fs.readdirSync(gen).filter((f) => f.startsWith(prefix) && f.endsWith('.json')).sort().forEach((f) => {
    try {
      const arr = JSON.parse(fs.readFileSync(path.join(gen, f), 'utf8'));
      if (Array.isArray(arr)) out.push(...arr.map((o) => ({ __src: f, ...o })));
      else console.warn(`  ! ${f} is not a JSON array, skipped`);
    } catch (e) { console.warn(`  ! ${f} failed to parse: ${e.message}`); }
  });
  return out;
}

// ---- validators ----
function cleanEff(eff) {
  if (!isObj(eff)) return {};
  const out = {};
  for (const k of Object.keys(eff)) {
    if (!EFF_KEYS.has(k)) continue;
    const v = eff[k];
    if (NUM_EFF.has(k)) { if (typeof v === 'number' && isFinite(v)) out[k] = v; }
    else if (k === 'die') { if (v === true) out[k] = true; }
    else if (['flag', 'flagInc', 'rel', 'addAsset'].includes(k)) { if (isObj(v)) out[k] = v; }
    else out[k] = v; // strings: addCondition, cureCondition, crimeName, dieCause, loseAssetKind, addTrait
  }
  return out;
}
function cleanCond(cond) {
  if (!isObj(cond)) return undefined;
  const out = {};
  for (const k of Object.keys(cond)) if (COND_KEYS.has(k)) out[k] = cond[k];
  return Object.keys(out).length ? out : undefined;
}
function cleanChoice(c) {
  if (!isObj(c) || typeof c.text !== 'string' || !c.text.trim()) return null;
  const out = { text: c.text.trim() };
  if (Array.isArray(c.outcomes) && c.outcomes.length) {
    out.outcomes = c.outcomes.filter((o) => isObj(o) && typeof o.text === 'string').map((o) => ({ w: num(o.w, 1), text: o.text, eff: cleanEff(o.eff) }));
    if (!out.outcomes.length) out.eff = cleanEff(c.eff);
  } else {
    out.eff = cleanEff(c.eff);
  }
  return out;
}
function cleanEvent(e, seen) {
  if (!isObj(e) || typeof e.id !== 'string' || !e.id.trim()) return null;
  const id = e.id.trim();
  if (DROP.has(id) || seen.has(id)) return null;
  if (typeof e.text !== 'string' || !e.text.trim()) return null;
  seen.add(id);
  const out = { id, cat: typeof e.cat === 'string' ? e.cat : 'random', type: TYPES.has(e.type) ? e.type : 'event', weight: num(e.weight, 3), text: e.text.trim() };
  if (e.once === true) out.once = true;
  const cond = cleanCond(e.cond); if (cond) out.cond = cond;
  if (Array.isArray(e.choices) && e.choices.length) {
    const choices = e.choices.map(cleanChoice).filter(Boolean);
    if (choices.length) out.choices = choices; else out.eff = cleanEff(e.eff);
  } else {
    out.eff = cleanEff(e.eff);
  }
  return out;
}

// catalog validators
function cleanCareer(c, seen) {
  if (!isObj(c) || typeof c.id !== 'string' || typeof c.title !== 'string') return null;
  if (seen.has(c.id)) return null; seen.add(c.id);
  const lo = num(c.salaryMin, 20000), hi = Math.max(lo, num(c.salaryMax, lo * 1.6));
  const o = { id: c.id, title: c.title, category: typeof c.category === 'string' ? c.category : 'General', minAge: num(c.minAge, 18), salaryMin: lo, salaryMax: hi };
  if (typeof c.reqDegree === 'string') o.reqDegree = c.reqDegree;
  if (typeof c.reqSmarts === 'number') o.reqSmarts = c.reqSmarts;
  return o;
}
function cleanCrime(c, seen) {
  if (!isObj(c) || typeof c.id !== 'string' || typeof c.name !== 'string') return null;
  if (seen.has(c.id)) return null; seen.add(c.id);
  const o = { id: c.id, name: c.name, desc: typeof c.desc === 'string' ? c.desc : '', minAge: num(c.minAge, 14), difficulty: num(c.difficulty, 40), lootMin: num(c.lootMin, 50), lootMax: Math.max(num(c.lootMin, 50), num(c.lootMax, 500)), karma: num(c.karma, -5), noto: num(c.noto, 3), catchChance: Math.min(1, Math.max(0, num(c.catchChance, 0.45))), minSentence: num(c.minSentence, 1), maxSentence: Math.max(num(c.minSentence, 1), num(c.maxSentence, 5)) };
  const cond = cleanCond(c.cond); if (cond) o.cond = cond;
  return o;
}
function cleanActivity(a, seen) {
  if (!isObj(a) || typeof a.id !== 'string' || typeof a.name !== 'string') return null;
  if (seen.has(a.id)) return null; seen.add(a.id);
  const o = { id: a.id, name: a.name, desc: typeof a.desc === 'string' ? a.desc : '', minAge: num(a.minAge, 0) };
  if (typeof a.cost === 'number') o.cost = a.cost;
  if (Array.isArray(a.outcomes) && a.outcomes.length) o.outcomes = a.outcomes.filter((x) => isObj(x)).map((x) => ({ w: num(x.w, 1), eff: cleanEff(x.eff), text: typeof x.text === 'string' ? x.text : '' }));
  else o.eff = cleanEff(a.eff);
  if (typeof a.resultText === 'string') o.resultText = a.resultText;
  return o;
}
function cleanAsset(a, seen) {
  if (!isObj(a) || !['car', 'realestate', 'possession'].includes(a.kind) || typeof a.name !== 'string') return null;
  const key = a.kind + '|' + a.name; if (seen.has(key)) return null; seen.add(key);
  const price = num(a.price, 0); if (price <= 0) return null;
  return { kind: a.kind, name: a.name, price, desc: typeof a.desc === 'string' ? a.desc : '', minAge: num(a.minAge, 16) };
}
function cleanHealth(h, seen) {
  if (!isObj(h) || typeof h.id !== 'string' || typeof h.name !== 'string') return null;
  if (seen.has(h.id)) return null; seen.add(h.id);
  return { id: h.id, name: h.name, kind: ['illness', 'addiction', 'chronic', 'mental'].includes(h.kind) ? h.kind : 'illness', severity: Math.min(3, Math.max(1, num(h.severity, 1))), minAge: num(h.minAge, 0), weight: num(h.weight, 3), onset: cleanEff(h.onset) };
}
function cleanMission(m, seen) {
  if (!isObj(m) || typeof m.id !== 'string' || typeof m.name !== 'string') return null;
  if (seen.has(m.id)) return null; seen.add(m.id);
  return { id: m.id, name: m.name, branch: ['army', 'navy', 'air', 'agency', 'any'].includes(m.branch) ? m.branch : 'any', minRank: num(m.minRank, 0), difficulty: num(m.difficulty, 50), reward: num(m.reward, 5000), kills: num(m.kills, 0), lethal: Math.min(1, Math.max(0, num(m.lethal, 0.1))), medal: typeof m.medal === 'string' ? m.medal : undefined };
}

// ---- writer ----
function writeData(key, varName, header, arr) {
  const body = JSON.stringify(arr, null, 2).replace(/\n/g, '\n  ');
  const js = `/* ${header}\n   ${arr.length} entries — hand-authored seeds + AI-generated content.\n   See DATA_SPEC.md for the schema. Built by build/merge.js. */\n(function () {\n  const D = ((window.RTP = window.RTP || {}).data = (window.RTP.data || {}));\n  D.${varName} = ${body};\n})();\n`;
  fs.writeFileSync(path.join(dataDir, key + '.js'), js);
}

// ---- run ----
function mergeArr(seedArr, genItems, cleaner, header) {
  const seen = new Set();
  const out = [];
  (seedArr || []).forEach((s) => { const c = cleaner(s, seen); if (c) out.push(c); });
  let added = 0;
  genItems.forEach((g) => { const c = cleaner(g, seen); if (c) { out.push(c); added++; } });
  return { out, added, seeds: (seedArr || []).length };
}

console.log('Loading seeds...');
const seeds = loadSeeds();
console.log(`Dropping ${DROP.size} flagged ids.\n`);

const report = [];
function run(key, varName, header, prefix, cleaner) {
  const genItems = readGen(prefix);
  const { out, added, seeds: sc } = mergeArr(seeds[key], genItems, cleaner, header);
  writeData(key, varName, header, out);
  report.push({ file: key + '.js', seeds: sc, generated: genItems.length, added, total: out.length });
}

run('events', 'events', 'EVENTS — random life-event pool.', 'events_', (e, seen) => cleanEvent(e, seen));
run('careers', 'careers', 'CAREERS — job board pool.', 'cat_careers', (c, seen) => cleanCareer(c, seen));
run('crimes', 'crimes', 'CRIMES — committable offenses.', 'cat_crimes', (c, seen) => cleanCrime(c, seen));
run('activities', 'activities', 'ACTIVITIES — lifestyle actions.', 'cat_activities', (a, seen) => cleanActivity(a, seen));
run('assets', 'assets', 'ASSETS — purchasable items.', 'cat_assets', (a, seen) => cleanAsset(a, seen));
run('health', 'health', 'HEALTH — conditions.', 'cat_health', (h, seen) => cleanHealth(h, seen));
run('missions', 'missions', 'MISSIONS — military & agency ops.', 'cat_missions', (m, seen) => cleanMission(m, seen));

// careers.js also carries companies + majors — re-append them from seeds
(function preserveCareerExtras() {
  const f = path.join(dataDir, 'careers.js');
  let js = fs.readFileSync(f, 'utf8');
  const extras = `  D.companies = ${JSON.stringify(seeds.companies || [], null, 2).replace(/\n/g, '\n  ')};\n  D.majors = ${JSON.stringify(seeds.majors || [], null, 2).replace(/\n/g, '\n  ')};\n`;
  js = js.replace('})();\n', extras + '})();\n');
  fs.writeFileSync(f, js);
})();

console.log('=== BUILD REPORT ===');
report.forEach((r) => console.log(`  ${r.file.padEnd(16)} seeds:${String(r.seeds).padStart(3)}  gen:${String(r.generated).padStart(4)}  added:${String(r.added).padStart(4)}  total:${String(r.total).padStart(4)}`));
console.log(`\nTotal events: ${report[0].total}`);
