/* ============================================================
   Rise to Power — Military & Statecraft
   The endgame of the power fantasy:
   • MILITARY: enlist in a branch or intelligence agency, run
     missions, earn rank/medals, get deployed.
   • STATECRAFT: once you lead a country, command a national
     treasury & army — forge alliances, invest, build forces,
     declare war, and ANNEX other nations into your empire.
   ============================================================ */
(function () {
  const RTP = (window.RTP = window.RTP || {});
  const E = () => RTP.Engine;
  const data = () => RTP.data || {};
  const rng = () => RTP.rng;
  const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
  const fmt = (n) => RTP.Engine.fmt(n);

  // ---------------------------------------------------------------------
  //  WORLD MODEL (lazy-initialized, persisted in state.world)
  // ---------------------------------------------------------------------
  function ensureWorld(state) {
    if (state.world) return state.world;
    const nations = (data().world && data().world.length) ? data().world : DEFAULT_NATIONS;
    const playerNation = state.char.country;
    const world = { nations: {}, relations: {}, wars: [], year: state.char.birthYear + state.char.age, playerNation };
    nations.forEach((n) => {
      world.nations[n.id] = {
        id: n.id, name: n.name, flag: n.flag || '🏳️',
        gdp: n.gdp, military: n.military, population: n.population,
        stability: n.stability != null ? n.stability : 60,
        treasury: Math.round(n.gdp * 0.02),
        annexedBy: null, isPlayer: n.name === playerNation
      };
      // default relations: neutral-ish
      world.relations[n.id] = n.name === playerNation ? 100 : rng().int(30, 70);
    });
    // make sure the player's nation exists
    if (!Object.values(world.nations).some((n) => n.isPlayer)) {
      const id = 'player_nation';
      world.nations[id] = { id, name: playerNation, flag: state.char.flag, gdp: rng().int(2e11, 2e13), military: rng().int(40, 75), population: rng().int(5e6, 8e7), stability: 60, treasury: 0, annexedBy: null, isPlayer: true };
      world.nations[id].treasury = Math.round(world.nations[id].gdp * 0.02);
      world.relations[id] = 100;
    }
    state.world = world;
    return world;
  }
  function playerNationObj(state) {
    const w = ensureWorld(state);
    return Object.values(w.nations).find((n) => n.isPlayer);
  }

  // ---------------------------------------------------------------------
  //  MILITARY SERVICE
  // ---------------------------------------------------------------------
  const RANKS = {
    army: ['Private', 'Corporal', 'Sergeant', 'Lieutenant', 'Captain', 'Major', 'Colonel', 'General'],
    navy: ['Seaman', 'Petty Officer', 'Ensign', 'Lieutenant', 'Commander', 'Captain', 'Admiral'],
    air: ['Airman', 'Sergeant', 'Lieutenant', 'Captain', 'Major', 'Colonel', 'Air Marshal'],
    agency: ['Recruit', 'Field Agent', 'Senior Agent', 'Station Chief', 'Director']
  };
  const militarySystem = {
    RANKS,
    branches() {
      return [
        { id: 'army', name: 'Army', icon: '🪖', desc: 'Boots on the ground.' },
        { id: 'navy', name: 'Navy', icon: '⚓', desc: 'Rule the seas.' },
        { id: 'air', name: 'Air Force', icon: '✈️', desc: 'Own the skies.' },
        { id: 'agency', name: 'Intelligence Agency', icon: '🕵️', desc: 'Espionage & black ops.' }
      ];
    },
    enlist(state, branchId) {
      const ch = state.char;
      if (ch.military && ch.military.active) return { ok: false, text: 'You are already serving.' };
      if (ch.age < 18) return { ok: false, text: 'You must be 18 to enlist.' };
      if (branchId === 'agency' && ch.stats.smarts < 60) return { ok: false, text: 'The agency only recruits the brightest (Smarts 60+).' };
      if (ch.stats.health < 45 && branchId !== 'agency') return { ok: false, text: 'You failed the physical (Health 45+).' };
      ch.military = { branch: branchId, rank: 0, rankName: RANKS[branchId][0], active: true, missions: 0, medals: [], kills: 0, deployments: 0 };
      const pay = branchId === 'agency' ? 65000 : 38000;
      ch.job = { id: 'mil_' + branchId, title: `${RANKS[branchId][0]}, ${this.branches().find((b) => b.id === branchId).name}`, company: 'Armed Forces', category: 'Military', salary: pay, level: 1, performance: 50, years: 0 };
      ch.salary = pay;
      return { ok: true, text: `You enlisted in the ${this.branches().find((b) => b.id === branchId).name} as a ${RANKS[branchId][0]}.` };
    },
    listMissions(state) {
      const ch = state.char;
      if (!ch.military || !ch.military.active) return [];
      const branch = ch.military.branch;
      const pool = (data().missions || []).filter((m) => (!m.branch || m.branch === branch || m.branch === 'any') && (ch.military.rank >= (m.minRank || 0)));
      return pool.length ? rng().sample(pool, Math.min(5, pool.length)) : DEFAULT_MISSIONS(branch);
    },
    runMission(state, mission) {
      const ch = state.char, mil = ch.military;
      if (!mil || !mil.active) return { ok: false, text: 'You are not in service.' };
      const skill = ch.stats.smarts * 0.4 + ch.stats.health * 0.3 + mil.rank * 8 + rng().int(0, 40);
      const success = skill > (mission.difficulty || 50);
      mil.missions += 1;
      if (success) {
        mil.kills += mission.kills || 0;
        const reward = mission.reward || rng().int(2000, 15000);
        E().applyEffect(state, { money: reward, happiness: +5, health: -rng().int(0, 8) });
        // promotion check
        let promo = '';
        if (mil.missions % 3 === 0 && mil.rank < RANKS[mil.branch].length - 1) {
          mil.rank += 1; mil.rankName = RANKS[mil.branch][mil.rank];
          if (ch.job) { ch.job.title = `${mil.rankName}, ${this.branches().find((b) => b.id === mil.branch).name}`; ch.job.salary = Math.round(ch.job.salary * 1.3); ch.salary = ch.job.salary; }
          promo = ` Promoted to ${mil.rankName}!`;
        }
        if (mission.medal && rng().chance(0.3)) { mil.medals.push(mission.medal); promo += ` Awarded the ${mission.medal}.`; }
        return { ok: true, success: true, text: `${mission.name}: SUCCESS. +${ch.currency}${fmt(reward)}.${promo}` };
      } else {
        // failure: injury or death
        if (rng().chance(mission.lethal || 0.12)) { E().die(state, `killed in action (${mission.name})`); return { ok: true, success: false, dead: true, text: `${mission.name}: You were killed in action.` }; }
        E().applyEffect(state, { health: -rng().int(10, 30), happiness: -8 });
        return { ok: true, success: false, text: `${mission.name}: FAILED. You were wounded.` };
      }
    },
    discharge(state) {
      const ch = state.char;
      if (!ch.military || !ch.military.active) return { ok: false, text: 'You are not serving.' };
      ch.military.active = false;
      if (ch.job && ch.job.category === 'Military') { ch.job = null; ch.salary = 0; }
      return { ok: true, text: `You were honorably discharged as ${ch.military.rankName}.` };
    }
  };
  function DEFAULT_MISSIONS(branch) {
    return [
      { id: 'patrol', name: 'Border Patrol', branch: 'any', difficulty: 35, reward: 4000, lethal: 0.04 },
      { id: 'raid', name: 'Compound Raid', branch: 'any', difficulty: 60, reward: 12000, kills: 2, lethal: 0.16, medal: 'Bronze Star' },
      { id: 'recon', name: 'Deep Recon', branch: 'agency', difficulty: 55, reward: 9000, lethal: 0.1 }
    ];
  }

  // ---------------------------------------------------------------------
  //  STATECRAFT — for heads of state (President / Supreme Leader)
  //  Unlocked when state.char.flags.headOfState is set (see powerSystem).
  // ---------------------------------------------------------------------
  const statecraftSystem = {
    isLeader(state) { return !!state.char.flags.headOfState; },
    overview(state) {
      const w = ensureWorld(state);
      const me = playerNationObj(state);
      const others = Object.values(w.nations).filter((n) => !n.isPlayer && !n.annexedBy);
      return { me, others, relations: w.relations, wars: w.wars.filter((wr) => !wr.over), empire: empireStats(state) };
    },
    invest(state, sector, amount) {
      const me = playerNationObj(state);
      amount = Math.min(amount, me.treasury);
      if (amount <= 0) return { ok: false, text: 'The national treasury is empty.' };
      me.treasury -= amount;
      const mult = { economy: 4, infrastructure: 3, education: 2, tech: 5 }[sector] || 3;
      const growth = Math.round(amount * (mult / 10) * (0.6 + rng().f()));
      me.gdp += growth;
      me.stability = clamp(me.stability + rng().int(1, 5), 0, 100);
      return { ok: true, text: `Invested ${fmt(amount)} in ${sector}. GDP +${fmt(growth)}, stability up.` };
    },
    collectTaxes(state) {
      const me = playerNationObj(state);
      const rev = Math.round(me.gdp * 0.015 * (me.stability / 100));
      me.treasury += rev;
      me.stability = clamp(me.stability - rng().int(1, 4), 0, 100);
      return { ok: true, text: `Collected ${fmt(rev)} in taxes. Treasury: ${fmt(me.treasury)}.` };
    },
    buildArmy(state, amount) {
      const me = playerNationObj(state);
      amount = Math.min(amount, me.treasury);
      if (amount < 1e8) return { ok: false, text: 'Building forces costs at least 100M.' };
      me.treasury -= amount;
      const gain = Math.round(amount / 1e9 * 2);
      me.military = clamp(me.military + Math.max(1, gain), 0, 100);
      return { ok: true, text: `Military buildup complete. Strength now ${me.military}/100.` };
    },
    diplomacy(state, nationId, action) {
      const w = ensureWorld(state);
      const target = w.nations[nationId];
      if (!target) return { ok: false, text: 'Unknown nation.' };
      const rel = w.relations[nationId];
      if (action === 'summit') { w.relations[nationId] = clamp(rel + rng().int(5, 15), 0, 100); return { ok: true, text: `Diplomatic summit with ${target.name}. Relations improved.` }; }
      if (action === 'tradeDeal') {
        const me = playerNationObj(state);
        me.gdp += Math.round(target.gdp * 0.01); w.relations[nationId] = clamp(rel + 8, 0, 100);
        return { ok: true, text: `Signed a trade deal with ${target.name}. Both economies grow.` };
      }
      if (action === 'sanction') { w.relations[nationId] = clamp(rel - rng().int(10, 25), 0, 100); target.stability = clamp(target.stability - 8, 0, 100); return { ok: true, text: `Sanctioned ${target.name}. Their economy suffers; relations sour.` }; }
      if (action === 'alliance') {
        if (rel < 60) return { ok: false, text: `${target.name} won't ally with you yet (relations too low).` };
        target.ally = true; w.relations[nationId] = clamp(rel + 10, 0, 100);
        return { ok: true, text: `🤝 Alliance formed with ${target.name}! They'll fight at your side.` };
      }
      return { ok: false, text: 'Unknown diplomatic action.' };
    },
    declareWar(state, nationId) {
      const w = ensureWorld(state);
      const me = playerNationObj(state), target = w.nations[nationId];
      if (!target || target.annexedBy) return { ok: false, text: 'Invalid target.' };
      if (w.wars.some((x) => x.target === nationId && !x.over)) return { ok: false, text: `You are already at war with ${target.name}.` };
      w.wars.push({ target: nationId, name: target.name, startYear: w.year, over: false, momentum: 0, cost: 0 });
      w.relations[nationId] = 0;
      me.stability = clamp(me.stability - 10, 0, 100);
      return { ok: true, text: `⚔️ You declared WAR on ${target.name}! The world watches.` };
    },
    // resolve a year of every active war (called from the yearly tick)
    warTick(state, yearLog) {
      if (!state.world) return;
      const w = state.world, me = playerNationObj(state);
      w.year = state.char.birthYear + state.char.age;
      w.wars.filter((war) => !war.over).forEach((war) => {
        const target = w.nations[war.target];
        if (!target) { war.over = true; return; }
        let myPower = me.military + (me.gdp / 1e12);
        // allies pitch in
        Object.values(w.nations).forEach((n) => { if (n.ally && !n.annexedBy) myPower += n.military * 0.4; });
        const theirPower = target.military + (target.gdp / 1e12);
        const swing = (myPower - theirPower) / Math.max(10, myPower + theirPower) + rng().normal(0, 0.18);
        war.momentum += swing;
        const cost = Math.round(me.gdp * 0.01);
        me.treasury = Math.max(0, me.treasury - cost); war.cost += cost;
        me.stability = clamp(me.stability - 2, 0, 100);
        if (war.momentum > 1) {
          // victory — annex
          war.over = true; war.won = true; target.annexedBy = me.id;
          me.gdp += Math.round(target.gdp * 0.8); me.population += target.population; me.military = clamp(me.military + 5, 0, 100);
          yearLog.push({ text: `🏆 You CONQUERED ${target.name} and annexed it into your empire!`, type: 'war' });
        } else if (war.momentum < -1) {
          war.over = true; war.won = false;
          me.stability = clamp(me.stability - 15, 0, 100); me.gdp = Math.round(me.gdp * 0.9);
          yearLog.push({ text: `🏳️ Your invasion of ${target.name} failed. The war is lost.`, type: 'war' });
        } else {
          yearLog.push({ text: `The war with ${target.name} grinds on (${war.momentum >= 0 ? 'you advance' : 'you retreat'}).`, type: 'war' });
        }
      });
    }
  };
  function empireStats(state) {
    const w = ensureWorld(state);
    const annexed = Object.values(w.nations).filter((n) => n.annexedBy);
    const me = playerNationObj(state);
    return { nations: 1 + annexed.length, conquered: annexed.map((n) => n.name), gdp: me.gdp, population: me.population, military: me.military };
  }

  // ---------------------------------------------------------------------
  //  DEFAULT WORLD (used if data/world.js is absent)
  // ---------------------------------------------------------------------
  const DEFAULT_NATIONS = [
    { id: 'us', name: 'United States', flag: '🇺🇸', gdp: 25e12, military: 95, population: 332e6, stability: 70 },
    { id: 'cn', name: 'China', flag: '🇨🇳', gdp: 18e12, military: 88, population: 1.41e9, stability: 65 },
    { id: 'ru', name: 'Russia', flag: '🇷🇺', gdp: 2e12, military: 82, population: 144e6, stability: 50 },
    { id: 'uk', name: 'United Kingdom', flag: '🇬🇧', gdp: 3e12, military: 70, population: 67e6, stability: 72 },
    { id: 'in', name: 'India', flag: '🇮🇳', gdp: 3.5e12, military: 75, population: 1.4e9, stability: 60 },
    { id: 'br', name: 'Brazil', flag: '🇧🇷', gdp: 2e12, military: 55, population: 214e6, stability: 55 }
  ];

  RTP.militarySystem = militarySystem;
  RTP.statecraftSystem = statecraftSystem;
  RTP.worldUtil = { ensureWorld, playerNationObj, empireStats };
})();
