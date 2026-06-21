/* ============================================================
   Rise to Power — Core Engine
   Owns: game state, the declarative EFFECT/CONDITION DSL, aging,
   money, relationships, crime/prison, legacy (generational) play,
   and save/load. All content (events, careers, etc.) is pure DATA
   that the engine interprets — see DATA_SPEC.md for the contract.
   ============================================================ */
(function () {
  const RTP = (window.RTP = window.RTP || {});
  const data = () => RTP.data || {};
  const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
  const STAT_KEYS = ['health', 'happiness', 'smarts', 'looks', 'karma'];

  // -------- listeners (UI subscribes) --------
  const listeners = [];
  function emit(type, payload) { listeners.forEach((fn) => fn(type, payload)); }

  // =====================================================================
  //  STATE
  // =====================================================================
  function blankChar() {
    return {
      first: '', last: '', sex: 'male', age: 0, alive: true, causeOfDeath: null,
      orientation: 'straight', attractedTo: ['female'],
      country: 'United States', city: '', currency: '$', flag: '🌎',
      birthYear: 2026,
      stats: { health: 80, happiness: 70, smarts: 50, looks: 50, karma: 0 },
      money: 0, salary: 0,
      job: null,                 // { id, title, company, salary, level, performance, years }
      education: { stage: 'none', gpa: 3.0, degrees: [], inSchool: false, schoolType: null, dropout: false },
      relationships: [],         // see addRelationship
      assets: [],                // { id, kind, name, value, baseValue, year, condition }
      conditions: [],            // health conditions / addictions: { id, name, kind, severity }
      criminal: { record: [], inPrison: false, sentence: 0, served: 0, notoriety: 0, escapes: 0 },
      power: {
        crime:    { member: false, org: null, rank: 0, rankName: null, respect: 0 },
        business: { companies: [], empireValue: 0 },
        politics: { inOffice: false, office: null, level: 0, approval: 50, party: null },
        fame:     { level: 0, title: null, followers: 0, scandal: 0 }
      },
      traits: [],                // personality flavor: { id, name }
      flags: {},                 // arbitrary booleans/counters set by events
      log: []                    // [{ age, text, type }]
    };
  }

  function newState(opts) {
    opts = opts || {};
    const seed = opts.seed != null ? String(opts.seed) : String(Math.floor((performance.now() % 1) * 1e9) + Date.now() % 1e9);
    RTP.rng = new RTP.RNG(seed);
    resetHistory();
    return {
      version: 1,
      seed,
      createdAt: Date.now(),
      dynasty: {
        generation: 1,
        surname: '',
        founded: null,
        netWorthEver: 0,
        members: [],          // brief records of past lives in this dynasty
        achievements: []
      },
      char: blankChar(),
      settings: { reduceMotion: false }
    };
  }

  // =====================================================================
  //  CHARACTER CREATION
  // =====================================================================
  function pickCountry(rng) {
    const list = (data().countries && data().countries.length) ? data().countries : [
      { name: 'United States', currency: '$', flag: '🇺🇸', lifeExp: 79 }
    ];
    return rng.weighted(list, (c) => c.weight || 1);
  }

  function nameFor(rng, sex, country) {
    const names = data().names || {};
    const cKey = (country && names[country]) ? country : 'default';
    const pool = names[cKey] || names.default || { male: ['Alex'], female: ['Sam'], last: ['Doe'] };
    const firstPool = sex === 'female' ? (pool.female || pool.male) : (pool.male || pool.female);
    return {
      first: rng.pick(firstPool || ['Jordan']),
      last: rng.pick(pool.last || ['Smith'])
    };
  }

  function createCharacter(state, opts) {
    opts = opts || {};
    const rng = RTP.rng;
    const ch = blankChar();
    const country = opts.country
      ? (data().countries || []).find((c) => c.name === opts.country) || pickCountry(rng)
      : pickCountry(rng);
    ch.country = country.name;
    ch.currency = country.currency || '$';
    ch.flag = country.flag || '🌎';
    ch.city = country.cities ? rng.pick(country.cities) : '';
    ch.sex = opts.sex || (rng.chance(0.5) ? 'male' : 'female');
    // sexual orientation — drives who shows up when dating
    ch.orientation = opts.orientation || rng.weighted([{ o: 'straight', w: 80 }, { o: 'gay', w: 10 }, { o: 'bisexual', w: 10 }]).o;
    setAttraction(ch);
    const generated = nameFor(rng, ch.sex, ch.country);
    ch.first = opts.first || generated.first;
    ch.last = opts.last || generated.last;
    ch.birthYear = new Date().getFullYear();

    // starting stats — randomized with a believable spread
    ch.stats.health = clamp(Math.round(rng.normal(85, 12)), 40, 100);
    ch.stats.happiness = clamp(Math.round(rng.normal(75, 12)), 35, 100);
    ch.stats.smarts = clamp(Math.round(rng.normal(50, 20)), 5, 100);
    ch.stats.looks = clamp(Math.round(rng.normal(50, 20)), 5, 100);
    ch.stats.karma = 0;

    // family — parents + maybe siblings
    const wealth = rng.weighted(
      [ { tier: 'poor', w: 25, money: rng.int(0, 4000) },
        { tier: 'working', w: 40, money: rng.int(4000, 30000) },
        { tier: 'middle', w: 25, money: rng.int(30000, 120000) },
        { tier: 'rich', w: 9, money: rng.int(120000, 900000) },
        { tier: 'elite', w: 1, money: rng.int(1e6, 8e6) } ]
    );
    ch.flags.familyWealth = wealth.tier;
    ch.money = 0; // children don't hold the family money

    const dadName = nameFor(rng, 'male', ch.country);
    const momName = nameFor(rng, 'female', ch.country);
    addRelationship(ch, { type: 'father', name: dadName.first + ' ' + ch.last, sex: 'male', age: rng.int(20, 45), rel: rng.int(55, 95) });
    addRelationship(ch, { type: 'mother', name: momName.first + ' ' + ch.last, sex: 'female', age: rng.int(18, 43), rel: rng.int(60, 98) });
    const sibs = rng.weighted([{ n: 0, w: 35 }, { n: 1, w: 35 }, { n: 2, w: 20 }, { n: 3, w: 10 }]).n;
    for (let i = 0; i < sibs; i++) {
      const sx = rng.chance(0.5) ? 'male' : 'female';
      const sn = nameFor(rng, sx, ch.country);
      addRelationship(ch, { type: 'sibling', name: sn.first + ' ' + ch.last, sex: sx, age: rng.int(0, 6) * (rng.chance(0.5) ? 1 : -1), rel: rng.int(40, 90) });
    }

    state.char = ch;
    if (!state.dynasty.surname) {
      state.dynasty.surname = ch.last;
      state.dynasty.founded = ch.birthYear;
    }
    log(state, `${ch.first} ${ch.last} was born ${genderWord(ch.sex, 'a boy', 'a girl')} in ${ch.city ? ch.city + ', ' : ''}${ch.country}. ${ch.flag}`, 'birth');
    log(state, familyIntro(state), 'family');
    emit('newlife', state);
    return state;
  }

  function familyIntro(state) {
    const tierText = {
      poor: 'into a struggling household — money is tight.',
      working: 'into a hard-working family getting by.',
      middle: 'into a comfortable middle-class home.',
      rich: 'into a wealthy family — opportunity everywhere.',
      elite: 'into an elite dynasty of staggering wealth.'
    };
    return 'Born ' + (tierText[state.char.flags.familyWealth] || 'into a family.');
  }

  // =====================================================================
  //  RELATIONSHIPS
  // =====================================================================
  let _relId = 1;
  function addRelationship(ch, r) {
    const rel = Object.assign(
      { id: 'r' + (_relId++), type: 'friend', name: 'Someone', sex: 'male', age: 0, rel: 50, alive: true, traits: [], met: 0 },
      r
    );
    ch.relationships.push(rel);
    return rel;
  }
  function relsOfType(ch, type) { return ch.relationships.filter((r) => r.type === type && r.alive); }
  function partner(ch) { return ch.relationships.find((r) => (r.type === 'partner' || r.type === 'spouse' || r.type === 'fiance') && r.alive); }
  function children(ch) { return relsOfType(ch, 'child'); }

  function changeRel(ch, target, delta) {
    // target can be a relationship id, a type, or an object
    let rels = [];
    if (typeof target === 'string') {
      rels = ch.relationships.filter((r) => r.id === target || r.type === target);
    } else if (target && target.id) {
      rels = [target];
    }
    rels.forEach((r) => { if (r.alive) r.rel = clamp(r.rel + delta, 0, 100); });
  }

  // =====================================================================
  //  EFFECT INTERPRETER  (the heart of the data-driven design)
  //  An `eff` object can contain any of these keys. See DATA_SPEC.md.
  // =====================================================================
  function applyEffect(state, eff, ctx) {
    if (!eff) return;
    const ch = state.char;
    ctx = ctx || {};

    // direct stat deltas
    STAT_KEYS.forEach((k) => {
      if (eff[k] != null) ch.stats[k] = clamp(ch.stats[k] + eff[k], k === 'karma' ? -100 : 0, k === 'karma' ? 100 : 100);
    });

    if (eff.money != null) addMoney(state, eff.money);
    if (eff.moneyMul != null) ch.money = Math.round(ch.money * eff.moneyMul);
    if (eff.salary != null) { if (ch.job) ch.job.salary = Math.max(0, ch.job.salary + eff.salary); ch.salary = ch.job ? ch.job.salary : ch.salary; }
    if (eff.salaryMul != null && ch.job) { ch.job.salary = Math.round(ch.job.salary * eff.salaryMul); ch.salary = ch.job.salary; }

    // flags
    if (eff.flag) Object.keys(eff.flag).forEach((k) => { ch.flags[k] = eff.flag[k]; });
    if (eff.flagInc) Object.keys(eff.flagInc).forEach((k) => { ch.flags[k] = (ch.flags[k] || 0) + eff.flagInc[k]; });

    // relationships
    if (eff.rel) Object.keys(eff.rel).forEach((k) => changeRel(ch, k, eff.rel[k]));
    if (eff.relAll != null) ch.relationships.forEach((r) => { if (r.alive) r.rel = clamp(r.rel + eff.relAll, 0, 100); });

    // assets
    if (eff.addAsset) addAsset(state, eff.addAsset);
    if (eff.loseAssetKind) { ch.assets = ch.assets.filter((a) => a.kind !== eff.loseAssetKind); }

    // health
    if (eff.addCondition) addCondition(state, eff.addCondition);
    if (eff.cureCondition) ch.conditions = ch.conditions.filter((c) => c.id !== eff.cureCondition && c.kind !== eff.cureCondition);

    // crime / notoriety
    if (eff.notoriety != null) ch.criminal.notoriety = clamp(ch.criminal.notoriety + eff.notoriety, 0, 100);
    if (eff.jail) sentence(state, eff.jail, eff.crimeName || ctx.crimeName || 'a crime');

    // power tracks
    if (eff.fame != null) addFame(state, eff.fame);
    if (eff.followers != null) ch.power.fame.followers = Math.max(0, ch.power.fame.followers + eff.followers);
    if (eff.respect != null) ch.power.crime.respect = clamp(ch.power.crime.respect + eff.respect, 0, 100);
    if (eff.approval != null) ch.power.politics.approval = clamp(ch.power.politics.approval + eff.approval, 0, 100);

    // traits
    if (eff.addTrait) addTrait(ch, eff.addTrait);

    // death from an event
    if (eff.die) { die(state, eff.dieCause || ctx.cause || 'misfortune'); }

    emit('state', state);
  }

  function addTrait(ch, t) {
    const id = typeof t === 'string' ? t : t.id;
    if (!ch.traits.find((x) => x.id === id)) ch.traits.push(typeof t === 'string' ? { id, name: id } : t);
  }

  // =====================================================================
  //  CONDITION EVALUATOR  (predicate over state for events/actions)
  // =====================================================================
  function meetsCond(state, cond) {
    if (!cond) return true;
    const ch = state.char;
    const a = ch.age;
    if (cond.minAge != null && a < cond.minAge) return false;
    if (cond.maxAge != null && a > cond.maxAge) return false;
    if (cond.sex && cond.sex !== ch.sex) return false;
    if (cond.hasJob && !ch.job) return false;
    if (cond.noJob && ch.job) return false;
    if (cond.inSchool && !ch.education.inSchool) return false;
    if (cond.notSchool && ch.education.inSchool) return false;
    if (cond.married && !partner(ch)) return false;
    if (cond.single && partner(ch)) return false;
    if (cond.hasKids && children(ch).length === 0) return false;
    if (cond.noKids && children(ch).length > 0) return false;
    if (cond.inPrison && !ch.criminal.inPrison) return false;
    if (cond.notPrison && ch.criminal.inPrison) return false;
    if (cond.minMoney != null && ch.money < cond.minMoney) return false;
    if (cond.maxMoney != null && ch.money > cond.maxMoney) return false;
    if (cond.country && ch.country !== cond.country) return false;
    if (cond.hasFlag && !ch.flags[cond.hasFlag]) return false;
    if (cond.notFlag && ch.flags[cond.notFlag]) return false;
    if (cond.minStat) for (const k in cond.minStat) if ((ch.stats[k] || 0) < cond.minStat[k]) return false;
    if (cond.maxStat) for (const k in cond.maxStat) if ((ch.stats[k] || 0) > cond.maxStat[k]) return false;
    if (cond.hasPartnerKind) { const p = partner(ch); if (!p || p.type !== cond.hasPartnerKind) return false; }
    if (cond.famous && ch.power.fame.level < 1) return false;
    return true;
  }

  // =====================================================================
  //  MONEY / ASSETS
  // =====================================================================
  function addMoney(state, amt) {
    state.char.money = Math.round(state.char.money + amt);
    if (state.char.money > state.dynasty.netWorthEver) {
      // track peak liquid as a rough dynasty metric (net worth recomputed elsewhere)
    }
  }
  function netWorth(ch) {
    return Math.round(ch.money + ch.assets.reduce((s, a) => s + (a.value || 0), 0) + (ch.power.business.empireValue || 0));
  }
  let _assetId = 1;
  function addAsset(state, a) {
    const asset = Object.assign(
      { id: 'a' + (_assetId++), kind: 'possession', name: 'Item', value: 0, baseValue: 0, year: state.char.birthYear + state.char.age, condition: 100 },
      a
    );
    asset.baseValue = asset.baseValue || asset.value;
    state.char.assets.push(asset);
    return asset;
  }

  // =====================================================================
  //  HEALTH
  // =====================================================================
  function addCondition(state, c) {
    const cond = typeof c === 'string' ? { id: c, name: c, kind: 'illness', severity: 1 } : Object.assign({ kind: 'illness', severity: 1 }, c);
    if (!state.char.conditions.find((x) => x.id === cond.id)) state.char.conditions.push(cond);
  }

  // =====================================================================
  //  CRIME / PRISON
  // =====================================================================
  function sentence(state, years, crimeName) {
    const ch = state.char;
    ch.criminal.inPrison = true;
    ch.criminal.sentence = years;
    ch.criminal.served = 0;
    ch.criminal.record.push({ crime: crimeName, age: ch.age, years });
    ch.criminal.notoriety = clamp(ch.criminal.notoriety + 5 + years, 0, 100);
    if (ch.job) { log(state, `Convicted of ${crimeName} — ${years} year sentence. You lost your job.`, 'crime'); ch.job = null; ch.salary = 0; }
    else log(state, `Convicted of ${crimeName} — sentenced to ${years} years.`, 'crime');
  }

  // =====================================================================
  //  POWER / FAME
  // =====================================================================
  function addFame(state, delta) {
    const f = state.char.power.fame;
    f.level = clamp((f.level || 0) + delta, 0, 100);
    const tiers = [[1, 'Up-and-comer'], [15, 'Known'], [35, 'Famous'], [60, 'Star'], [85, 'Icon']];
    let t = null;
    tiers.forEach(([thr, name]) => { if (f.level >= thr) t = name; });
    f.title = t;
  }

  // =====================================================================
  //  AGING — the core yearly tick
  // =====================================================================
  function ageUp(state) {
    const ch = state.char;
    if (!ch.alive) return { dead: true };
    snapshot(state); // capture pre-age state so the player can rewind
    ch.age += 1;
    const yearLog = [];

    // ---- prison time ----
    if (ch.criminal.inPrison) {
      ch.criminal.served += 1;
      if (RTP.crimeSystem && RTP.crimeSystem.prisonYear) RTP.crimeSystem.prisonYear(state, yearLog);
      if (ch.criminal.served >= ch.criminal.sentence) {
        ch.criminal.inPrison = false;
        yearLog.push({ text: `Released from prison after serving ${ch.criminal.served} years.`, type: 'crime' });
      }
    }

    // ---- passive stat drift ----
    driftStats(state);

    // ---- schooling auto-progress ----
    if (RTP.eduSystem && RTP.eduSystem.yearly) RTP.eduSystem.yearly(state, yearLog);

    // ---- job: salary income, raises, performance ----
    if (ch.job && !ch.criminal.inPrison) {
      addMoney(state, Math.round(ch.job.salary * 0.78)); // post-tax-ish take-home
      ch.job.years = (ch.job.years || 0) + 1;
    }

    // ---- politics: approval actually moves while you hold office ----
    if (ch.power.politics.inOffice) {
      const pol = ch.power.politics;
      let d = RTP.rng.normal(-1.5, 4); // incumbency erosion + noise
      if (ch.stats.happiness > 70) d += 1;
      if ((ch.power.fame.scandal || 0) > 0) d -= ch.power.fame.scandal;
      if (state.world && RTP.worldUtil) { const me = RTP.worldUtil.playerNationObj(state); if (me) d += (me.stability - 50) / 20; }
      pol.approval = clamp(pol.approval + d, 0, 100);
      if (pol.approval <= 8 && RTP.rng.chance(0.5)) {
        yearLog.push({ text: `Your approval collapsed — you were forced out of office as ${pol.office}.`, type: 'war' });
        pol.inOffice = false;
        if (ch.job && ch.job.category === 'Politics') { ch.job = null; ch.salary = 0; }
      }
    }

    // ---- relationships age & drift ----
    ch.relationships.forEach((r) => {
      if (!r.alive) return;
      r.age += 1;
      // natural drift toward neutrality, slight decay if neglected
      r.rel = clamp(r.rel - RTP.rng.int(0, 2), 0, 100);
      // elderly relatives may pass
      const mortal = r.age > 60 ? (r.age - 60) * 0.012 : 0;
      if (mortal > 0 && RTP.rng.chance(mortal)) {
        r.alive = false;
        yearLog.push({ text: `${r.name} (your ${labelRel(r)}) passed away at ${r.age}.`, type: 'death' });
        if (['mother', 'father'].includes(r.type)) maybeInherit(state, r, yearLog);
      }
    });

    // ---- asset depreciation / appreciation ----
    ch.assets.forEach((a) => {
      if (a.kind === 'car') a.value = Math.round(a.value * 0.91);
      else if (a.kind === 'realestate') a.value = Math.round(a.value * (1 + RTP.rng.normal(0.04, 0.06)));
    });

    // ---- health risk from conditions / age ----
    healthCheck(state, yearLog);

    // ---- statecraft: resolve any active wars (heads of state) ----
    if (RTP.statecraftSystem && state.world) RTP.statecraftSystem.warTick(state, yearLog);

    // ---- random life events ----
    if (ch.alive) runYearlyEvents(state, yearLog);

    // ---- write the year's log ----
    yearLog.forEach((l) => log(state, l.text, l.type || 'event'));

    // ---- natural death check ----
    if (ch.alive) mortalityCheck(state);

    emit('state', state);
    save(state);
    return { dead: !ch.alive, log: yearLog };
  }

  function driftStats(state) {
    const ch = state.char, rng = RTP.rng, s = ch.stats;
    // health declines slowly with age, faster when old or low-happiness
    let hd = 0;
    if (ch.age > 50) hd -= (ch.age - 50) * 0.18;
    if (ch.age > 30) hd -= 0.3;
    if (s.happiness < 30) hd -= 1.2;
    ch.conditions.forEach((c) => { hd -= (c.severity || 1) * (c.kind === 'addiction' ? 1.5 : 1.0); });
    s.health = clamp(Math.round(s.health + hd + rng.normal(0, 1)), 0, 100);
    // happiness gently regresses to ~60
    s.happiness = clamp(Math.round(s.happiness + (60 - s.happiness) * 0.06 + rng.normal(0, 2)), 0, 100);
    // looks decline slowly after 30
    if (ch.age > 28) s.looks = clamp(Math.round(s.looks - rng.f() * 0.6), 0, 100);
    // smarts grow in school years, plateau after
    if (ch.education.inSchool) s.smarts = clamp(Math.round(s.smarts + rng.f() * 1.4), 0, 100);
  }

  function healthCheck(state, yearLog) {
    const ch = state.char, rng = RTP.rng;
    if (ch.stats.health <= 0 && ch.alive) { die(state, 'poor health'); return; }
    // random new illness chance scales down with health
    const base = ch.age > 45 ? 0.05 : 0.02;
    if (rng.chance(base + (100 - ch.stats.health) / 1000)) {
      const pool = (data().health && data().health.length) ? data().health : null;
      if (pool) {
        const c = rng.weighted(pool.filter((h) => ch.age >= (h.minAge || 0)), (h) => h.weight || 1);
        if (c && !ch.conditions.find((x) => x.id === c.id)) {
          ch.conditions.push({ id: c.id, name: c.name, kind: c.kind || 'illness', severity: c.severity || 1 });
          applyEffect(state, c.onset || { health: -8, happiness: -5 });
          yearLog.push({ text: `You were diagnosed with ${c.name}.`, type: 'health' });
        }
      }
    }
  }

  function mortalityCheck(state) {
    const ch = state.char, rng = RTP.rng;
    const country = (data().countries || []).find((c) => c.name === ch.country);
    const lifeExp = (country && country.lifeExp) || 79;
    let p = 0;
    if (ch.age > lifeExp - 25) p += Math.pow((ch.age - (lifeExp - 25)) / 55, 2.6) * 0.5;
    if (ch.stats.health < 25) p += (25 - ch.stats.health) / 220;
    p += ch.conditions.reduce((s, c) => s + (c.severity || 1) * 0.004, 0);
    if (ch.age > 110) p = 1;
    if (rng.chance(clamp(p, 0, 1))) die(state, naturalCause(ch));
  }

  function naturalCause(ch) {
    if (ch.age > 85) return 'old age';
    const lethal = ch.conditions.find((c) => c.severity >= 3);
    if (lethal) return lethal.name;
    return ch.stats.health < 20 ? 'failing health' : 'natural causes';
  }

  // =====================================================================
  //  EVENTS — selection & resolution
  // =====================================================================
  function eligibleEvents(state) {
    const all = data().events || [];
    return all.filter((e) => meetsCond(state, e.cond) && !(e.once && state.char.flags['evt_' + e.id]));
  }

  function runYearlyEvents(state, yearLog) {
    // Auto-resolving (narration) events get applied immediately; interactive
    // events are queued for the UI to present.
    const rng = RTP.rng;
    const pool = eligibleEvents(state);
    const interactive = [];
    const count = rng.weighted([{ n: 0, w: 12 }, { n: 1, w: 40 }, { n: 2, w: 34 }, { n: 3, w: 14 }]).n;
    const chosen = rng.sample(pool, count);
    chosen.forEach((e) => {
      if (e.once) state.char.flags['evt_' + e.id] = true;
      if (e.choices && e.choices.length) {
        interactive.push(e);
      } else {
        // narrative auto event
        if (e.eff) applyEffect(state, e.eff, { cause: e.cause });
        yearLog.push({ text: resolveText(state, e.text), type: e.type || 'event' });
      }
    });
    if (interactive.length) emit('events', { state, events: interactive });
  }

  // Resolve a choice the player made on an interactive event.
  function resolveChoice(state, event, choice) {
    let outcomeText = choice.text;
    let eff = choice.eff;
    if (choice.outcomes && choice.outcomes.length) {
      const o = RTP.rng.weighted(choice.outcomes, (x) => x.w || 1);
      eff = o.eff;
      outcomeText = o.text || outcomeText;
    }
    if (eff) applyEffect(state, eff, { cause: event.cause });
    log(state, resolveText(state, outcomeText), event.type || 'event');
    save(state);
    emit('state', state);
    return outcomeText;
  }

  // Simple templating in event text: {first} {last} {country} {pronoun} etc.
  function resolveText(state, text) {
    if (!text) return '';
    const ch = state.char;
    return text
      .replace(/\{first\}/g, ch.first)
      .replace(/\{last\}/g, ch.last)
      .replace(/\{country\}/g, ch.country)
      .replace(/\{city\}/g, ch.city || ch.country)
      .replace(/\{he\}/g, genderWord(ch.sex, 'he', 'she'))
      .replace(/\{him\}/g, genderWord(ch.sex, 'him', 'her'))
      .replace(/\{his\}/g, genderWord(ch.sex, 'his', 'her'));
  }

  // =====================================================================
  //  DEATH + LEGACY (generational continuation)
  // =====================================================================
  function die(state, cause) {
    const ch = state.char;
    if (!ch.alive) return;
    ch.alive = false;
    ch.causeOfDeath = cause;
    const worth = netWorth(ch);
    state.dynasty.netWorthEver += Math.max(0, worth);
    state.dynasty.members.push({
      name: ch.first + ' ' + ch.last, age: ch.age, cause, netWorth: worth,
      generation: state.dynasty.generation, year: ch.birthYear + ch.age,
      title: bestTitle(ch)
    });
    log(state, `${ch.first} ${ch.last} died at age ${ch.age} from ${cause}. Net worth: ${ch.currency}${fmt(worth)}.`, 'death');
    emit('death', state);
    save(state);
  }

  function bestTitle(ch) {
    if (ch.power.politics.office) return ch.power.politics.office;
    if (ch.power.crime.rankName) return ch.power.crime.rankName;
    if (ch.power.fame.title) return ch.power.fame.title;
    if (ch.job) return ch.job.title;
    return null;
  }

  // Continue the dynasty as the player's eldest living child.
  function canContinueLegacy(state) {
    return children(state.char).some((c) => c.alive);
  }

  function continueAsHeir(state, heirId) {
    const prev = state.char;
    const heirs = children(prev).filter((c) => c.alive);
    const heir = heirs.find((h) => h.id === heirId) || heirs.sort((a, b) => b.age - a.age)[0];
    if (!heir) return null;

    const inheritance = Math.round(netWorth(prev) * 0.55); // estate tax + split
    const rng = RTP.rng;
    const ch = blankChar();
    const parts = heir.name.split(' ');
    ch.first = parts[0];
    ch.last = parts.slice(1).join(' ') || prev.last;
    ch.sex = heir.sex;
    ch.age = heir.age > 0 ? heir.age : 18;
    ch.country = prev.country; ch.currency = prev.currency; ch.flag = prev.flag; ch.city = prev.city;
    ch.birthYear = (prev.birthYear + prev.age) - ch.age;
    ch.money = inheritance;
    // heirs inherit a slice of upbringing — stat bonuses from a wealthy/famous parent
    ch.stats.smarts = clamp(50 + Math.round((prev.stats.smarts - 50) * 0.3) + rng.int(-10, 15), 5, 100);
    ch.stats.looks = clamp(50 + Math.round((prev.stats.looks - 50) * 0.3) + rng.int(-10, 15), 5, 100);
    ch.stats.health = clamp(Math.round(rng.normal(85, 10)), 40, 100);
    ch.flags.familyWealth = inheritance > 1e6 ? 'elite' : inheritance > 1e5 ? 'rich' : inheritance > 2e4 ? 'middle' : 'working';
    // carry forward inherited real estate
    prev.assets.filter((a) => a.kind === 'realestate').forEach((a) => ch.assets.push(Object.assign({}, a, { id: 'a' + (_assetId++) })));

    state.dynasty.generation += 1;
    state.char = ch;
    resetHistory(); // a new generation starts its own timeline
    log(state, `— Generation ${state.dynasty.generation} —`, 'legacy');
    log(state, `${ch.first} ${ch.last} inherits ${ch.currency}${fmt(inheritance)} and the family legacy.`, 'legacy');
    emit('newlife', state);
    emit('state', state);
    save(state);
    return state;
  }

  function maybeInherit(state, deceasedRel, yearLog) {
    // a parent dying may leave a small inheritance to the player
    const amt = RTP.rng.int(0, 60000);
    if (amt > 1000) {
      addMoney(state, amt);
      yearLog.push({ text: `You inherited ${state.char.currency}${fmt(amt)} from ${deceasedRel.name}.`, type: 'money' });
    }
  }

  // =====================================================================
  //  LOG + HELPERS
  // =====================================================================
  function log(state, text, type) {
    state.char.log.push({ age: state.char.age, text, type: type || 'event' });
  }
  function genderWord(sex, m, f) { return sex === 'female' ? f : m; }
  function setAttraction(ch) {
    const opp = ch.sex === 'female' ? 'male' : 'female';
    if (ch.orientation === 'bisexual') ch.attractedTo = ['male', 'female'];
    else if (ch.orientation === 'gay') ch.attractedTo = [ch.sex];
    else { ch.orientation = ch.orientation || 'straight'; ch.attractedTo = [opp]; }
    return ch.attractedTo;
  }
  function labelRel(r) {
    const map = { father: 'father', mother: 'mother', sibling: 'sibling', partner: 'partner', spouse: 'spouse', fiance: 'fiancé', child: 'child', friend: 'friend', pet: 'pet', coworker: 'coworker' };
    return map[r.type] || r.type;
  }
  function fmt(n) {
    n = Math.round(n);
    if (Math.abs(n) >= 1e9) return (n / 1e9).toFixed(2).replace(/\.00$/, '') + 'B';
    if (Math.abs(n) >= 1e6) return (n / 1e6).toFixed(2).replace(/\.00$/, '') + 'M';
    if (Math.abs(n) >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
    return String(n);
  }

  // =====================================================================
  //  SAVE / LOAD  (localStorage)
  // =====================================================================
  const SAVE_KEY = 'riseToPower.save.v1';
  const HIST_KEY = 'riseToPower.history.v1';
  const MAX_HISTORY = 30;
  let history = []; // in-memory snapshots for time travel

  function clone(o) {
    try { return structuredClone(o); } catch (e) { return JSON.parse(JSON.stringify(o)); }
  }
  function save(state) {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); } catch (e) {}
  }
  function load() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return null;
      const st = JSON.parse(raw);
      RTP.rng = new RTP.RNG(st.seed);
      try { const h = localStorage.getItem(HIST_KEY); history = h ? JSON.parse(h) : []; } catch (e) { history = []; }
      return st;
    } catch (e) { return null; }
  }
  function hasSave() { try { return !!localStorage.getItem(SAVE_KEY); } catch (e) { return false; } }
  function wipe() { try { localStorage.removeItem(SAVE_KEY); localStorage.removeItem(HIST_KEY); } catch (e) {} history = []; }

  // ---- time travel ----
  function snapshot(state) {
    history.push(clone(state));
    if (history.length > MAX_HISTORY) history = history.slice(-MAX_HISTORY);
    try { localStorage.setItem(HIST_KEY, JSON.stringify(history)); } catch (e) { /* quota: keep in memory */ }
  }
  function resetHistory() { history = []; try { localStorage.removeItem(HIST_KEY); } catch (e) {} }
  function timeline() {
    return history.map((s, i) => ({ idx: i, age: s.char.age, name: s.char.first + ' ' + s.char.last, gen: s.dynasty.generation, alive: s.char.alive }));
  }
  function canTimeTravel() { return history.length > 0; }
  // restore to snapshot idx; discard everything after it
  function timeTravel(idx) {
    if (idx < 0 || idx >= history.length) return null;
    const restored = clone(history[idx]);
    history = history.slice(0, idx); // can't redo forward
    RTP.rng = new RTP.RNG(restored.seed + ':tt' + restored.char.age);
    try { localStorage.setItem(HIST_KEY, JSON.stringify(history)); } catch (e) {}
    save(restored);
    emit('newlife', restored);
    emit('state', restored);
    return restored;
  }

  // ---- god mode ----
  function godSet(state, patch) {
    const ch = state.char;
    if (patch.stats) for (const k in patch.stats) if (STAT_KEYS.includes(k)) ch.stats[k] = clamp(Math.round(patch.stats[k]), k === 'karma' ? -100 : 0, 100);
    if (patch.money != null) ch.money = Math.round(patch.money);
    if (patch.addMoney != null) addMoney(state, patch.addMoney);
    if (patch.orientation) { ch.orientation = patch.orientation; setAttraction(ch); }
    if (patch.first) ch.first = patch.first;
    if (patch.last) ch.last = patch.last;
    if (patch.healAll) { ch.conditions = []; ch.stats.health = 100; }
    if (patch.clearRecord) { ch.criminal.record = []; ch.criminal.inPrison = false; ch.criminal.sentence = 0; ch.criminal.notoriety = 0; }
    if (patch.revive && !ch.alive) { ch.alive = true; ch.causeOfDeath = null; ch.stats.health = Math.max(ch.stats.health, 60); }
    emit('state', state); save(state);
  }

  // =====================================================================
  //  PUBLIC API
  // =====================================================================
  RTP.Engine = {
    STAT_KEYS, clamp,
    newState, createCharacter, blankChar,
    ageUp, resolveChoice, applyEffect, meetsCond, eligibleEvents,
    addRelationship, changeRel, relsOfType, partner, children,
    addMoney, addAsset, netWorth, addCondition, sentence, addFame, addTrait,
    die, canContinueLegacy, continueAsHeir, bestTitle,
    log, resolveText, fmt, labelRel, genderWord, setAttraction,
    save, load, hasSave, wipe,
    snapshot, timeline, canTimeTravel, timeTravel, resetHistory, godSet,
    on: (fn) => listeners.push(fn), emit
  };
})();
