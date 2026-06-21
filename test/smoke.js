/* Headless smoke test — shims browser globals and auto-plays lives. */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const store = {};
const sandbox = {
  console,
  performance: { now: () => Date.now() + Math.random() },
  localStorage: {
    getItem: (k) => (k in store ? store[k] : null),
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: (k) => { delete store[k]; }
  },
  Math, JSON, Date, parseInt, parseFloat, isNaN
};
sandbox.window = sandbox;
const ctx = vm.createContext(sandbox);

const files = [
  'js/rng.js',
  'data/countries.js', 'data/names.js', 'data/careers.js', 'data/activities.js',
  'data/events.js', 'data/crimes.js', 'data/health.js', 'data/assets.js',
  'data/orgs.js', 'data/missions.js', 'data/world.js',
  'js/engine.js', 'js/systems.js', 'js/statecraft.js'
];
for (const f of files) {
  vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });
}

const RTP = sandbox.RTP;
const E = RTP.Engine;
let interactiveSeen = 0;
E.on((type, payload) => {
  if (type === 'events') {
    // auto-resolve interactive events by always picking a random choice
    payload.events.forEach((ev) => {
      interactiveSeen++;
      const choice = ev.choices[Math.floor(Math.random() * ev.choices.length)];
      E.resolveChoice(payload.state, ev, choice);
    });
  }
});

function playLife(state, maxYears) {
  let years = 0;
  while (state.char.alive && years < maxYears) {
    // sprinkle in player actions at certain ages
    const ch = state.char;
    try {
      if (ch.age === 18) RTP.eduSystem.enrollUniversity(state, RTP.data.majors[0]);
      if (ch.age === 23) { const jobs = RTP.careerSystem.listOpenJobs(state); if (jobs[0]) RTP.careerSystem.apply(state, jobs[0]); }
      if (ch.age === 25 && ch.job) RTP.careerSystem.askRaise(state);
      if (ch.age === 20) RTP.militarySystem.enlist(state, 'army');
      if (ch.age >= 21 && ch.age <= 30 && ch.military && ch.military.active) { const ms = RTP.militarySystem.listMissions(state); if (ms[0]) RTP.militarySystem.runMission(state, ms[0]); }
      if (ch.age === 24) { const c = RTP.crimeSystem.listCrimes(state)[0]; if (c) RTP.crimeSystem.commit(state, c); }
      if (ch.age === 28) { const d = RTP.loveSystem.findDate(state); if (d.ok) { const a = RTP.loveSystem.askOut(state, d.candidate); } }
      if (ch.age === 30 && E.partner(ch)) RTP.loveSystem.propose(state, E.partner(ch).id);
      if (ch.age === 32 && E.partner(ch)) RTP.loveSystem.haveChild(state);
      if (ch.age === 35) RTP.powerSystem.startBusiness(state, 'TestCo', 'Tech');
      if (ch.age === 40) RTP.powerSystem.joinGang(state);
      // climb politics
      RTP.powerSystem.OFFICES.forEach((o) => { if (ch.age === 45 + o.level && ch.money < o.cost) E.addMoney(state, o.cost); });
      if (ch.age >= 46 && ch.age <= 55) { const next = RTP.powerSystem.OFFICES.find((o) => o.level === ch.power.politics.level + 1); if (next) { if (ch.money < next.cost) E.addMoney(state, next.cost); RTP.powerSystem.runForOffice(state, next.id); } }
      // statecraft once leader
      if (ch.flags.headOfState) {
        RTP.statecraftSystem.collectTaxes(state);
        const ov = RTP.statecraftSystem.overview(state);
        if (ov.others[0]) RTP.statecraftSystem.declareWar(state, ov.others[0].id);
        const me = RTP.worldUtil.playerNationObj(state);
        if (me.treasury > 1e8) RTP.statecraftSystem.buildArmy(state, me.treasury * 0.5);
      }
    } catch (e) {
      console.error(`CRASH at age ${ch.age}:`, e.message, '\n', e.stack);
      process.exit(1);
    }
    E.ageUp(state);
    years++;
  }
  return state;
}

let lives = 0, generations = 0, conquests = 0, presidents = 0;
for (let i = 0; i < 25; i++) {
  let state = E.newState({ seed: 'smoke-' + i });
  E.createCharacter(state, {});
  playLife(state, 120);
  lives++;
  // try legacy continuation a couple times
  let legacyTries = 0;
  while (E.canContinueLegacy(state) && legacyTries < 3) {
    E.continueAsHeir(state, null);
    generations++;
    playLife(state, 120);
    legacyTries++;
  }
  // tally
  Object.values(state.world ? state.world.nations : {}).forEach((n) => { if (n.annexedBy) conquests++; });
  if (state.dynasty.members.some((m) => m.title && m.title.includes('President')) || state.char.flags.headOfState) presidents++;
}

console.log(`\n=== SMOKE TEST PASSED ===`);
console.log(`Lives played: ${lives}`);
console.log(`Legacy generations: ${generations}`);
console.log(`Interactive events resolved: ${interactiveSeen}`);
console.log(`Nations conquered across all runs: ${conquests}`);
console.log(`Runs reaching head-of-state: ${presidents}`);
console.log(`Total events in pool: ${RTP.data.events.length}, careers: ${RTP.data.careers.length}, crimes: ${RTP.data.crimes.length}`);
