/* ============================================================
   Rise to Power — Interactive Systems
   The engine handles the passive yearly tick; this file handles
   ACTIVE player actions taken from menus: school, careers, crime,
   relationships, assets, casino, health, and the power tracks.
   Each action returns { ok, text, ... } and applies effects.
   ============================================================ */
(function () {
  const RTP = (window.RTP = window.RTP || {});
  const E = () => RTP.Engine;
  const data = () => RTP.data || {};
  const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
  const rng = () => RTP.rng;
  const fmt = (n) => RTP.Engine.fmt(n);

  // ---------------------------------------------------------------------
  //  EDUCATION
  // ---------------------------------------------------------------------
  const SCHOOL_STAGES = [
    { id: 'elementary', name: 'Elementary School', start: 6, end: 10 },
    { id: 'middle', name: 'Middle School', start: 11, end: 13 },
    { id: 'high', name: 'High School', start: 14, end: 17 }
  ];
  const eduSystem = {
    yearly(state, yearLog) {
      const ch = state.char, ed = ch.education;
      // auto-enroll & graduate through K-12
      const stage = SCHOOL_STAGES.find((s) => ch.age >= s.start && ch.age <= s.end);
      if (stage && !ed.dropout) {
        if (ed.stage !== stage.id) { ed.stage = stage.id; ed.inSchool = true; ed.schoolType = stage.name; }
        if (ch.age === stage.end) {
          // graduation
          yearLog.push({ text: `Graduated ${stage.name}.`, type: 'school' });
          if (stage.id === 'high') {
            ed.degrees.push('High School Diploma');
            ed.inSchool = false; ed.stage = 'graduated_hs';
          }
        }
      }
      // university auto-progress
      if (ed.stage === 'university') {
        ed._uniYears = (ed._uniYears || 0) + 1;
        if (ed._uniYears >= (ed._uniLength || 4)) {
          ed.degrees.push(ed._uniDegree || "Bachelor's Degree");
          E().applyEffect(state, { smarts: +6, happiness: +4 });
          yearLog.push({ text: `Graduated university with a ${ed._uniDegree || "Bachelor's Degree"}.`, type: 'school' });
          ed.inSchool = false; ed.stage = 'graduated_uni'; ed._uniYears = 0;
        }
      }
    },
    enrollUniversity(state, major) {
      const ch = state.char, ed = ch.education;
      if (ch.age < 18) return { ok: false, text: 'You must finish high school first.' };
      if (ed.inSchool && ed.stage === 'university') return { ok: false, text: 'You are already in university.' };
      if (!ed.degrees.includes('High School Diploma')) return { ok: false, text: 'You need a high school diploma.' };
      const cost = rng().int(8000, 40000);
      ed.stage = 'university'; ed.inSchool = true; ed.schoolType = 'University';
      ed._uniYears = 0; ed._uniLength = 4;
      ed._uniDegree = (major && major.degree) || "Bachelor's Degree";
      ed._uniField = (major && major.field) || 'General Studies';
      E().addMoney(state, -cost);
      return { ok: true, text: `Enrolled in university (${ed._uniField}). Tuition: ${ch.currency}${fmt(cost)}/yr.` };
    },
    study(state) {
      if (!state.char.education.inSchool) return { ok: false, text: 'You are not in school.' };
      E().applyEffect(state, { smarts: rng().int(2, 5), happiness: -1 });
      return { ok: true, text: 'You hit the books. Smarts improved.' };
    },
    dropOut(state) {
      const ed = state.char.education;
      if (!ed.inSchool) return { ok: false, text: 'You are not in school.' };
      ed.inSchool = false; ed.dropout = true; ed.stage = 'dropout';
      E().applyEffect(state, { smarts: -3, happiness: +2 });
      return { ok: true, text: 'You dropped out of school.' };
    }
  };

  // ---------------------------------------------------------------------
  //  CAREERS
  // ---------------------------------------------------------------------
  const careerSystem = {
    listOpenJobs(state) {
      const ch = state.char;
      const jobs = (data().careers || []).filter((j) => {
        if (ch.age < (j.minAge || 18)) return false;
        if (j.reqDegree && !ch.education.degrees.some((d) => d.includes(j.reqDegree))) return false;
        if (j.reqSmarts && ch.stats.smarts < j.reqSmarts) return false;
        return true;
      });
      // present a rotating sample so it feels like a job board
      return rng().sample(jobs, Math.min(8, jobs.length)).map((j) => ({
        id: j.id, title: j.title, company: companyName(j), category: j.category,
        salary: jobSalary(j), reqDegree: j.reqDegree, _base: j
      }));
    },
    apply(state, jobOffer) {
      const ch = state.char;
      const base = jobOffer._base || (data().careers || []).find((c) => c.id === jobOffer.id);
      if (!base) return { ok: false, text: 'That job is no longer available.' };
      // interview success scales with smarts/looks vs requirement
      const need = (base.reqSmarts || 30);
      const score = ch.stats.smarts * 0.6 + ch.stats.looks * 0.2 + rng().int(0, 40);
      if (score < need) return { ok: false, text: `You interviewed for ${base.title} but didn't get an offer.` };
      ch.job = { id: base.id, title: base.title, company: jobOffer.company || companyName(base), category: base.category, salary: jobOffer.salary || jobSalary(base), level: 1, performance: 50, years: 0 };
      ch.salary = ch.job.salary;
      return { ok: true, text: `Hired as ${base.title} at ${ch.job.company} for ${ch.currency}${fmt(ch.job.salary)}/yr!` };
    },
    workHarder(state) {
      if (!state.char.job) return { ok: false, text: 'You are unemployed.' };
      state.char.job.performance = clamp(state.char.job.performance + rng().int(3, 9), 0, 100);
      E().applyEffect(state, { happiness: -2, health: -1 });
      return { ok: true, text: 'You put in extra hours. Performance up.' };
    },
    askRaise(state) {
      const j = state.char.job;
      if (!j) return { ok: false, text: 'You are unemployed.' };
      if (j.performance > 60 && rng().chance(0.55 + j.performance / 300)) {
        const pct = rng().int(5, 18);
        j.salary = Math.round(j.salary * (1 + pct / 100)); state.char.salary = j.salary;
        return { ok: true, text: `Raise approved! +${pct}% → ${state.char.currency}${fmt(j.salary)}/yr.` };
      }
      E().applyEffect(state, { happiness: -3 });
      return { ok: false, text: 'Your raise request was denied.' };
    },
    promote(state) {
      const j = state.char.job;
      if (!j) return { ok: false, text: 'You are unemployed.' };
      if (j.performance >= 65 && rng().chance(0.4 + j.performance / 250)) {
        j.level += 1; j.salary = Math.round(j.salary * 1.25); j.performance = 50; state.char.salary = j.salary;
        j.title = j.title.replace(/^(Senior |Lead |Junior )/, '');
        const prefix = j.level >= 4 ? 'Director of ' : j.level >= 3 ? 'Lead ' : 'Senior ';
        j.title = prefix + j.title;
        return { ok: true, text: `Promoted to ${j.title}! Salary ${state.char.currency}${fmt(j.salary)}/yr.` };
      }
      return { ok: false, text: 'You were passed over for promotion.' };
    },
    quit(state) {
      if (!state.char.job) return { ok: false, text: 'You are unemployed.' };
      const t = state.char.job.title; state.char.job = null; state.char.salary = 0;
      return { ok: true, text: `You quit your job as ${t}.` };
    }
  };
  function jobSalary(j) {
    const lo = j.salaryMin || 20000, hi = j.salaryMax || lo * 1.6;
    return Math.round(rng().int(lo, hi) / 500) * 500;
  }
  function companyName(j) {
    const cos = (data().companies && data().companies.length) ? data().companies : ['Globex', 'Initech', 'Acme', 'Hooli', 'Vandelay', 'Stark Inc', 'Wayne Co', 'Soylent', 'Umbrella'];
    return rng().pick(cos) + (j.companySuffix || '');
  }

  // ---------------------------------------------------------------------
  //  CRIME / PRISON
  // ---------------------------------------------------------------------
  const crimeSystem = {
    listCrimes(state) {
      return (data().crimes || []).filter((c) => state.char.age >= (c.minAge || 12) && (!c.cond || E().meetsCond(state, c.cond)));
    },
    commit(state, crime) {
      const ch = state.char;
      const base = (data().crimes || []).find((c) => c.id === crime.id) || crime;
      const skill = (ch.stats.smarts * 0.4 + ch.power.crime.respect * 0.3 + rng().int(0, 50));
      const success = skill > (base.difficulty || 40);
      if (success) {
        const loot = rng().int(base.lootMin || 50, base.lootMax || 500);
        E().applyEffect(state, { money: loot, karma: base.karma != null ? base.karma : -6, notoriety: base.noto || 3, happiness: +2 });
        return { ok: true, success: true, text: `${base.name}: success! You got away with ${ch.currency}${fmt(loot)}.` };
      } else {
        // caught?
        if (rng().chance(base.catchChance || 0.45)) {
          const yrs = rng().int(base.minSentence || 1, base.maxSentence || 5);
          E().sentence(state, yrs, base.name);
          return { ok: true, success: false, jailed: true, text: `${base.name}: caught! Sentenced to ${yrs} years.` };
        }
        E().applyEffect(state, { karma: -3, happiness: -4 });
        return { ok: true, success: false, jailed: false, text: `${base.name} failed, but you escaped.` };
      }
    },
    prisonYear(state, yearLog) {
      const ch = state.char;
      // small chance of parole, riot, or extended sentence
      const r = rng().f();
      if (r < 0.06) { ch.criminal.sentence = Math.max(ch.criminal.served, ch.criminal.sentence - 1); yearLog.push({ text: 'Good behavior shaved a year off your sentence.', type: 'crime' }); }
      else if (r < 0.12) { E().applyEffect(state, { health: -10, notoriety: +4 }); yearLog.push({ text: 'A prison riot broke out. You got hurt.', type: 'crime' }); }
    },
    escape(state) {
      const ch = state.char;
      if (!ch.criminal.inPrison) return { ok: false, text: 'You are not in prison.' };
      if (rng().chance(0.25 + ch.stats.smarts / 400)) {
        ch.criminal.inPrison = false; ch.criminal.escapes += 1; ch.criminal.notoriety = clamp(ch.criminal.notoriety + 15, 0, 100);
        return { ok: true, text: 'You escaped from prison! You are now a fugitive.' };
      }
      ch.criminal.sentence += rng().int(1, 4);
      E().applyEffect(state, { health: -8 });
      return { ok: false, text: 'Your escape failed. Years were added to your sentence.' };
    }
  };

  // ---------------------------------------------------------------------
  //  RELATIONSHIPS
  // ---------------------------------------------------------------------
  const loveSystem = {
    findDate(state) {
      const ch = state.char;
      if (ch.age < 14) return { ok: false, text: 'You are too young to date.' };
      if (E().partner(ch)) return { ok: false, text: 'You are already in a relationship. Break up first.' };
      const prefs = (ch.attractedTo && ch.attractedTo.length) ? ch.attractedTo : ['male', 'female'];
      const sx = rng().pick(prefs);
      const nm = (data().names && (data().names[ch.country] || data().names.default)) || { male: ['Alex'], female: ['Sam'], last: ['Lee'] };
      const first = rng().pick(sx === 'female' ? nm.female : nm.male);
      const cand = { id: '_cand', name: first + ' ' + rng().pick(nm.last), sex: sx, age: clamp(ch.age + rng().int(-4, 4), 16, 90), looks: rng().int(20, 95), rel: rng().int(20, 60) };
      return { ok: true, candidate: cand, text: `You met ${cand.name} (${cand.age}).` };
    },
    meetPerson(state) {
      const ch = state.char;
      const sx = rng().chance(0.5) ? 'male' : 'female';
      const nm = (data().names && (data().names[ch.country] || data().names.default)) || { male: ['Alex'], female: ['Sam'], last: ['Lee'] };
      const first = rng().pick(sx === 'female' ? nm.female : nm.male);
      const friend = E().addRelationship(ch, { type: 'friend', name: first + ' ' + rng().pick(nm.last), sex: sx, age: clamp(ch.age + rng().int(-6, 6), 1, 95), rel: rng().int(30, 65), met: ch.age });
      E().applyEffect(state, { happiness: 3 });
      return { ok: true, text: `You met ${friend.name} and made a new friend.`, friend };
    },
    breakUp(state, relId) {
      const ch = state.char;
      const r = (relId && ch.relationships.find((x) => x.id === relId)) || E().partner(ch);
      if (!r || !['partner', 'spouse', 'fiance'].includes(r.type)) return { ok: false, text: 'You have no partner to break up with.' };
      if (r.type === 'spouse') {
        const split = Math.round(Math.max(0, ch.money) * 0.4);
        E().addMoney(state, -split);
        r.type = 'ex'; r.rel = clamp(r.rel - 40, 0, 100);
        E().applyEffect(state, { happiness: -12 });
        return { ok: true, text: `You divorced ${r.name}. The settlement cost you ${ch.currency}${fmt(split)}.` };
      }
      r.type = 'ex'; r.rel = clamp(r.rel - 25, 0, 100);
      E().applyEffect(state, { happiness: -6 });
      return { ok: true, text: `You broke up with ${r.name}.` };
    },
    cheat(state) {
      const ch = state.char;
      const p = E().partner(ch);
      if (!p) return { ok: false, text: 'You have no partner to cheat on.' };
      const caught = rng().chance(Math.max(0.12, 0.5 - ch.stats.smarts / 400));
      if (caught) {
        E().changeRel(ch, p, -rng().int(30, 60));
        E().applyEffect(state, { happiness: -10, karma: -8 });
        if (rng().chance(0.5)) { p.type = 'ex'; return { ok: true, caught: true, text: `You cheated on ${p.name} — and got caught. They left you.` }; }
        return { ok: true, caught: true, text: `You cheated on ${p.name} and got caught. The relationship is badly damaged.` };
      }
      ch.flags.cheater = (ch.flags.cheater || 0) + 1;
      E().applyEffect(state, { happiness: 4, karma: -6 });
      return { ok: true, caught: false, text: `You cheated on ${p.name}. Nobody found out... this time.` };
    },
    askOut(state, cand) {
      const ch = state.char;
      const chance = 0.3 + ch.stats.looks / 250 + (cand.looks < ch.stats.looks ? 0.15 : -0.05);
      if (rng().chance(chance)) {
        const p = E().addRelationship(ch, { type: 'partner', name: cand.name, sex: cand.sex, age: cand.age, rel: rng().int(45, 70), met: ch.age });
        return { ok: true, text: `${cand.name} said yes! You're now dating.`, rel: p };
      }
      E().applyEffect(state, { happiness: -4 });
      return { ok: false, text: `${cand.name} turned you down.` };
    },
    interact(state, relId, kind) {
      const ch = state.char;
      const r = ch.relationships.find((x) => x.id === relId);
      if (!r || !r.alive) return { ok: false, text: 'They are not available.' };
      const moves = {
        compliment: { d: rng().int(3, 8), t: `You complimented ${r.name}.` },
        gift: { d: rng().int(5, 14), money: -rng().int(20, 400), t: `You gave ${r.name} a gift.` },
        argue: { d: -rng().int(6, 15), t: `You argued with ${r.name}.` },
        spendTime: { d: rng().int(4, 10), happy: +3, t: `You spent quality time with ${r.name}.` },
        insult: { d: -rng().int(10, 22), t: `You insulted ${r.name}.` }
      };
      const m = moves[kind] || moves.compliment;
      E().changeRel(ch, r, m.d);
      if (m.money) E().addMoney(state, m.money);
      if (m.happy) E().applyEffect(state, { happiness: m.happy });
      return { ok: true, text: m.t + ` (${m.d >= 0 ? '+' : ''}${m.d} relationship)` };
    },
    propose(state, relId) {
      const ch = state.char;
      const r = ch.relationships.find((x) => x.id === relId) || E().partner(ch);
      if (!r) return { ok: false, text: 'You have no partner.' };
      if (r.rel < 55) return { ok: false, text: `${r.name} said no. Build the relationship more.` };
      const cost = rng().int(2000, 30000);
      if (ch.money < cost) return { ok: false, text: `You can't afford a ring (${ch.currency}${fmt(cost)}).` };
      E().addMoney(state, -cost);
      r.type = 'spouse'; r.rel = clamp(r.rel + 10, 0, 100); r.married = ch.age;
      E().applyEffect(state, { happiness: +12 });
      return { ok: true, text: `${r.name} said YES! You're married. 💍` };
    },
    haveChild(state) {
      const ch = state.char;
      const p = E().partner(ch);
      if (ch.age < 16) return { ok: false, text: 'You are too young.' };
      if (!p) return { ok: false, text: 'You need a partner to have a child the normal way.' };
      const sx = rng().chance(0.5) ? 'male' : 'female';
      const nm = (data().names && (data().names[ch.country] || data().names.default)) || { male: ['Alex'], female: ['Sam'] };
      const first = rng().pick(sx === 'female' ? nm.female : nm.male);
      const kid = E().addRelationship(ch, { type: 'child', name: first + ' ' + ch.last, sex: sx, age: 0, rel: rng().int(70, 95), met: ch.age });
      E().applyEffect(state, { happiness: +10 });
      return { ok: true, text: `You had a baby, ${kid.name}! 👶`, child: kid };
    }
  };

  // ---------------------------------------------------------------------
  //  ASSETS + CASINO
  // ---------------------------------------------------------------------
  const assetSystem = {
    listForSale(state, kind) {
      const pool = (data().assets || []).filter((a) => a.kind === kind && state.char.age >= (a.minAge || 16));
      return rng().sample(pool, Math.min(6, pool.length)).map((a) => ({ ...a, price: Math.round(a.price * (0.9 + rng().f() * 0.3)) }));
    },
    buy(state, item) {
      const ch = state.char;
      if (ch.money < item.price) return { ok: false, text: `You can't afford ${item.name} (${ch.currency}${fmt(item.price)}).` };
      E().addMoney(state, -item.price);
      E().addAsset(state, { kind: item.kind, name: item.name, value: item.price, baseValue: item.price });
      E().applyEffect(state, { happiness: +Math.min(12, 3 + item.price / 50000) });
      return { ok: true, text: `You bought ${item.name} for ${ch.currency}${fmt(item.price)}.` };
    },
    sell(state, assetId) {
      const ch = state.char;
      const i = ch.assets.findIndex((a) => a.id === assetId);
      if (i < 0) return { ok: false, text: 'Asset not found.' };
      const a = ch.assets[i];
      E().addMoney(state, a.value);
      ch.assets.splice(i, 1);
      return { ok: true, text: `Sold ${a.name} for ${ch.currency}${fmt(a.value)}.` };
    }
  };
  const casinoSystem = {
    play(state, game, bet) {
      const ch = state.char;
      bet = Math.max(1, Math.round(bet));
      if (ch.money < bet) return { ok: false, text: "You don't have enough to bet that." };
      const odds = { slots: { p: 0.32, mul: 2.6 }, blackjack: { p: 0.47, mul: 2 }, roulette: { p: 0.45, mul: 2.1 }, horses: { p: 0.28, mul: 4 } };
      const g = odds[game] || odds.slots;
      if (rng().chance(g.p)) {
        const win = Math.round(bet * g.mul) - bet;
        E().addMoney(state, win);
        E().applyEffect(state, { happiness: +5 });
        return { ok: true, won: true, text: `${game}: you WON ${ch.currency}${fmt(win)}!` };
      }
      E().addMoney(state, -bet);
      E().applyEffect(state, { happiness: -4 });
      return { ok: true, won: false, text: `${game}: you lost ${ch.currency}${fmt(bet)}.` };
    }
  };

  // ---------------------------------------------------------------------
  //  ACTIVITIES (Mind & Body, Doctor, etc.)
  // ---------------------------------------------------------------------
  const activitySystem = {
    list(state) {
      return (data().activities || []).filter((a) => state.char.age >= (a.minAge || 0) && (!a.cond || E().meetsCond(state, a.cond)));
    },
    doActivity(state, act) {
      const base = (data().activities || []).find((a) => a.id === act.id) || act;
      const ch = state.char;
      if (base.cost && ch.money < base.cost) return { ok: false, text: `You can't afford ${base.name}.` };
      if (base.cost) E().addMoney(state, -base.cost);
      let eff = base.eff || {};
      if (base.outcomes) { const o = rng().weighted(base.outcomes, (x) => x.w || 1); eff = o.eff || {}; return finishActivity(state, base, eff, o.text); }
      return finishActivity(state, base, eff, base.resultText);
    }
  };
  function finishActivity(state, base, eff, text) {
    E().applyEffect(state, eff);
    return { ok: true, text: text || `You did: ${base.name}.` };
  }

  // ---------------------------------------------------------------------
  //  POWER TRACKS — the "Rise to Power" spine
  // ---------------------------------------------------------------------
  const CRIME_RANKS = ['Associate', 'Soldier', 'Capo', 'Underboss', 'Boss', 'Kingpin'];
  const OFFICES = [
    { id: 'council', name: 'City Council', level: 1, cost: 5000, salary: 40000 },
    { id: 'mayor', name: 'Mayor', level: 2, cost: 50000, salary: 90000 },
    { id: 'governor', name: 'Governor', level: 3, cost: 500000, salary: 150000 },
    { id: 'senator', name: 'Senator', level: 4, cost: 2000000, salary: 200000 },
    { id: 'president', name: 'President', level: 5, cost: 20000000, salary: 400000 }
  ];
  const powerSystem = {
    OFFICES, CRIME_RANKS,
    joinGang(state) {
      const ch = state.char;
      if (ch.power.crime.member) return { ok: false, text: 'You are already in an organization.' };
      if (ch.age < 16) return { ok: false, text: 'Too young for that life.' };
      const orgs = (data().orgs && data().orgs.length) ? data().orgs : [{ name: 'The Syndicate' }, { name: 'Los Muertos' }, { name: 'The Firm' }];
      const org = rng().pick(orgs);
      ch.power.crime.member = true; ch.power.crime.org = org.name; ch.power.crime.rank = 0; ch.power.crime.rankName = CRIME_RANKS[0];
      E().applyEffect(state, { karma: -10, notoriety: +8 });
      return { ok: true, text: `You joined ${org.name} as an ${CRIME_RANKS[0]}.` };
    },
    riseRank(state) {
      const ch = state.char, c = ch.power.crime;
      if (!c.member) return { ok: false, text: 'You are not in an organization.' };
      if (c.rank >= CRIME_RANKS.length - 1) return { ok: false, text: 'You already rule the organization.' };
      const need = (c.rank + 1) * 20;
      if (c.respect >= need && rng().chance(0.5)) {
        c.rank += 1; c.rankName = CRIME_RANKS[c.rank]; c.respect = clamp(c.respect - need / 2, 0, 100);
        E().applyEffect(state, { notoriety: +6, money: c.rank * 25000 });
        return { ok: true, text: `You rose to ${c.rankName} of ${c.org}!` };
      }
      return { ok: false, text: `Not enough respect to rise (need ${need}). Do more jobs for the family.` };
    },
    startBusiness(state, name, industry) {
      const ch = state.char;
      const cost = rng().int(10000, 80000);
      if (ch.money < cost) return { ok: false, text: `You need ${ch.currency}${fmt(cost)} of capital to start a business.` };
      E().addMoney(state, -cost);
      const biz = { id: 'b' + Date.now() % 1e6, name: name || 'NewCo', industry: industry || 'Retail', value: cost, revenue: 0, founded: ch.age };
      ch.power.business.companies.push(biz);
      recomputeEmpire(ch);
      return { ok: true, text: `You founded ${biz.name} (${biz.industry}).`, business: biz };
    },
    growBusiness(state, bizId) {
      const ch = state.char;
      const biz = ch.power.business.companies.find((b) => b.id === bizId) || ch.power.business.companies[0];
      if (!biz) return { ok: false, text: 'You have no business.' };
      const growth = rng().normal(0.18, 0.4); // can lose money
      biz.value = Math.max(0, Math.round(biz.value * (1 + growth)));
      const profit = Math.round(biz.value * 0.12 * (rng().f() - 0.3));
      E().addMoney(state, profit);
      recomputeEmpire(ch);
      if (biz.value <= 0) { ch.power.business.companies = ch.power.business.companies.filter((b) => b.id !== biz.id); return { ok: true, text: `${biz.name} went bankrupt.` }; }
      return { ok: true, text: `${biz.name} ${profit >= 0 ? 'profited' : 'lost'} ${ch.currency}${fmt(Math.abs(profit))}. Valuation: ${ch.currency}${fmt(biz.value)}.` };
    },
    runForOffice(state, officeId) {
      const ch = state.char, pol = ch.power.politics;
      const office = OFFICES.find((o) => o.id === officeId);
      if (!office) return { ok: false, text: 'Unknown office.' };
      if (office.level > 1 && pol.level < office.level - 1) return { ok: false, text: `You must hold a lower office first.` };
      if (ch.money < office.cost) return { ok: false, text: `Campaign costs ${ch.currency}${fmt(office.cost)}.` };
      E().addMoney(state, -office.cost);
      const win = clamp(0.5 + (ch.stats.looks - 50) / 200 + pol.approval / 200 - ch.criminal.notoriety / 150, 0.05, 0.95);
      if (rng().chance(win)) {
        pol.inOffice = true; pol.office = office.name; pol.level = office.level;
        ch.job = { id: 'office_' + office.id, title: office.name, company: 'Government', category: 'Politics', salary: office.salary, level: office.level, performance: 50, years: 0 };
        ch.salary = office.salary;
        let extra = '';
        if (office.id === 'president') {
          ch.flags.headOfState = true;
          if (RTP.statecraftSystem) RTP.statecraftSystem.overview(state); // init world model
          extra = ' You now command the nation — statecraft, armies, and war are yours.';
        }
        return { ok: true, won: true, text: `You WON the election! You are now ${office.name}.` + extra };
      }
      E().applyEffect(state, { happiness: -8 });
      return { ok: true, won: false, text: `You lost the race for ${office.name}.` };
    },
    politicalAction(state, kind) {
      const ch = state.char, pol = ch.power.politics;
      if (!pol.inOffice) return { ok: false, text: 'You must hold office to do that.' };
      if (kind === 'speech') {
        const d = rng().int(-3, 10); pol.approval = clamp(pol.approval + d, 0, 100);
        return { ok: true, text: d >= 0 ? `Your speech inspired the public. Approval +${d} (now ${pol.approval}%).` : `Your speech fell flat. Approval ${d} (now ${pol.approval}%).` };
      }
      if (kind === 'bill') {
        const d = rng().int(2, 12); pol.approval = clamp(pol.approval + d, 0, 100);
        if (state.world && RTP.worldUtil) { const me = RTP.worldUtil.playerNationObj(state); if (me) me.treasury = Math.max(0, me.treasury - me.gdp * 0.005); }
        E().applyEffect(state, { karma: 2 });
        return { ok: true, text: `You passed popular legislation. Approval +${d} (now ${pol.approval}%).` };
      }
      if (kind === 'rally') {
        const cost = rng().int(1000, 20000);
        if (ch.money < cost) return { ok: false, text: `A rally costs ${ch.currency}${fmt(cost)}.` };
        E().addMoney(state, -cost);
        const d = rng().int(-2, 14); pol.approval = clamp(pol.approval + d, 0, 100);
        return { ok: true, text: `You held a rally (${ch.currency}${fmt(cost)}). Approval ${d >= 0 ? '+' : ''}${d} (now ${pol.approval}%).` };
      }
      if (kind === 'scandal') {
        if (rng().chance(0.5)) { ch.power.fame.scandal = Math.max(0, (ch.power.fame.scandal || 0) - 1); return { ok: true, text: 'You buried the scandal. Crisis averted.' }; }
        pol.approval = clamp(pol.approval - rng().int(5, 15), 0, 100);
        return { ok: true, text: `The scandal blew up in your face. Approval now ${pol.approval}%.` };
      }
      return { ok: false, text: 'Unknown action.' };
    },
    goViral(state) {
      const ch = state.char;
      const hit = rng().chance(0.25 + ch.stats.looks / 300);
      if (hit) {
        const f = rng().int(1000, 500000);
        ch.power.fame.followers += f;
        E().addFame(state, rng().int(3, 12));
        E().applyEffect(state, { happiness: +6, money: Math.round(f * 0.02) });
        return { ok: true, text: `Your post went viral! +${fmt(f)} followers.` };
      }
      return { ok: false, text: 'Your post flopped. Nobody cared.' };
    }
  };
  function recomputeEmpire(ch) { ch.power.business.empireValue = ch.power.business.companies.reduce((s, b) => s + b.value, 0); }

  // expose
  RTP.eduSystem = eduSystem;
  RTP.careerSystem = careerSystem;
  RTP.crimeSystem = crimeSystem;
  RTP.loveSystem = loveSystem;
  RTP.assetSystem = assetSystem;
  RTP.casinoSystem = casinoSystem;
  RTP.activitySystem = activitySystem;
  RTP.powerSystem = powerSystem;
})();
