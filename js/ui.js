/* ============================================================
   Rise to Power — UI Controller
   Renders all screens and wires player actions to the systems.
   Pure vanilla DOM. Subscribes to engine events.
   ============================================================ */
(function () {
  const RTP = (window.RTP = window.RTP || {});
  const E = () => RTP.Engine;
  const fmt = (n) => RTP.Engine.fmt(n);
  const $ = (sel, root) => (root || document).querySelector(sel);
  const app = () => document.getElementById('app');
  let state = null;
  let eventQueue = [];

  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // ---------------------------------------------------------------------
  //  TITLE / START
  // ---------------------------------------------------------------------
  function showTitle() {
    const hasSave = E().hasSave();
    app().innerHTML = `
      <div class="screen" id="title">
        <div class="crown">👑</div>
        <div class="title">Rise to Power</div>
        <div class="tagline">From a newborn nobody to ruler of nations. Live, scheme, build a dynasty — and seize the world. 100% free.</div>
        ${hasSave ? `<button class="big-btn" id="continueBtn">Continue Life</button>` : ''}
        <button class="big-btn ${hasSave ? 'ghost' : ''}" id="newLifeBtn">New Life</button>
        <button class="big-btn ghost" id="customBtn">Custom Character</button>
        <div class="fineprint">Open-source • No paywalls • Everything unlocked</div>
      </div>`;
    if (hasSave) $('#continueBtn').onclick = () => { state = E().load(); RTP._state = state; renderGame(); };
    $('#newLifeBtn').onclick = () => startNewLife({});
    $('#customBtn').onclick = customCharacterSheet;
  }

  function startNewLife(opts) {
    state = E().newState(opts);
    RTP._state = state;
    E().createCharacter(state, opts);
    renderGame();
  }

  function customCharacterSheet() {
    const countries = (RTP.data.countries || []).map((c) => c.name);
    openSheet(`
      <h2>👶 Custom Character</h2>
      <div class="lead">Design your origin. Everything else is up to fate.</div>
      <input class="field" id="cFirst" placeholder="First name (optional)" />
      <input class="field" id="cLast" placeholder="Last name (optional)" />
      <select class="field" id="cSex"><option value="">Random sex</option><option value="male">Male</option><option value="female">Female</option></select>
      <select class="field" id="cCountry"><option value="">Random country</option>${countries.map((c) => `<option>${esc(c)}</option>`).join('')}</select>
      <div class="btn-row"><button class="btn" id="cStart">Begin Life</button><button class="btn ghost" id="cCancel">Cancel</button></div>
    `);
    $('#cStart').onclick = () => {
      const opts = { first: $('#cFirst').value.trim() || null, last: $('#cLast').value.trim() || null, sex: $('#cSex').value || null, country: $('#cCountry').value || null };
      closeSheet(); startNewLife(opts);
    };
    $('#cCancel').onclick = closeSheet;
  }

  // ---------------------------------------------------------------------
  //  MAIN GAME SCREEN
  // ---------------------------------------------------------------------
  const CATS = [
    { id: 'career', ico: '💼', name: 'Career' },
    { id: 'school', ico: '🎓', name: 'School' },
    { id: 'love', ico: '❤️', name: 'Love' },
    { id: 'activities', ico: '🧘', name: 'Activities' },
    { id: 'assets', ico: '🏠', name: 'Assets' },
    { id: 'crime', ico: '🔫', name: 'Crime' },
    { id: 'power', ico: '👑', name: 'Power', power: true },
    { id: 'military', ico: '🎖️', name: 'Military' }
  ];

  function renderGame() {
    if (state.settings && state.settings.reduceMotion) app().classList.add('reduced');
    app().innerHTML = `
      <div class="topbar">
        <div class="who">
          <div class="name">${esc(state.char.first)} ${esc(state.char.last)} <span style="font-size:0.8em">${state.char.flag}</span>
            ${state.dynasty.generation > 1 ? `<span class="gen-badge">GEN ${state.dynasty.generation}</span>` : ''}</div>
          <div class="sub" id="subline"></div>
        </div>
        <div class="networth"><div class="nv" id="nw"></div><div class="nl">Net Worth</div></div>
      </div>
      <div class="stats" id="stats"></div>
      <div class="log" id="log"></div>
      <div class="actions">
        <div class="action-row">
          <button class="age-btn" id="ageBtn"><small>Age</small><span>+1</span></button>
          <div class="cat-grid">
            ${CATS.map((c) => `<button class="cat ${c.power ? 'power' : ''}" data-cat="${c.id}"><span class="ico">${c.ico}</span>${c.name}</button>`).join('')}
          </div>
        </div>
      </div>`;
    $('#ageBtn').onclick = onAgeUp;
    app().querySelectorAll('.cat').forEach((b) => (b.onclick = () => openCategory(b.dataset.cat)));
    renderStats();
    renderLog(true);
  }

  function renderStats() {
    const ch = state.char;
    const sub = [`Age ${ch.age}`, ch.job ? ch.job.title : (ch.education.inSchool ? ch.education.schoolType : 'Unemployed'), ch.city || ch.country].filter(Boolean).join(' • ');
    $('#subline').textContent = sub;
    $('#nw').textContent = ch.currency + fmt(E().netWorth(ch));
    const defs = [
      { k: 'health', label: 'Health' }, { k: 'happiness', label: 'Happiness' },
      { k: 'smarts', label: 'Smarts' }, { k: 'looks', label: 'Looks' }
    ];
    let html = defs.map((d) => {
      const v = ch.stats[d.k];
      return `<div class="stat ${v < 25 ? 'low' : ''}"><div class="lab"><span>${d.label}</span><b>${v}%</b></div><div class="bar ${d.k}"><i style="width:${v}%"></i></div></div>`;
    }).join('');
    // karma + money quick line
    const km = ch.stats.karma;
    html += `<div class="stat"><div class="lab"><span>Karma</span><b>${km > 0 ? '+' : ''}${km}</b></div><div class="bar karma"><i style="width:${Math.abs(km)}%"></i></div></div>`;
    html += `<div class="stat"><div class="lab"><span>Cash</span><b style="color:var(--gold)">${ch.currency}${fmt(ch.money)}</b></div><div class="bar"><i style="width:${Math.min(100, Math.log10(Math.max(1, ch.money)) * 14)}%;background:var(--grad-power)"></i></div></div>`;
    $('#stats').innerHTML = html;
  }

  function renderLog(scroll) {
    const logEl = $('#log');
    if (!logEl) return;
    logEl.innerHTML = state.char.log.map((l) => `<div class="entry ${l.type || 'event'}"><span class="age">AGE ${l.age}</span><div>${esc(l.text)}</div></div>`).join('');
    if (scroll) logEl.scrollTop = logEl.scrollHeight;
  }

  function onAgeUp() {
    if (!state.char.alive) return;
    const res = E().ageUp(state);
    renderStats();
    renderLog(true);
    if (eventQueue.length) { presentNextEvent(); return; }
    if (res.dead) showDeath();
  }

  // ---------------------------------------------------------------------
  //  INTERACTIVE EVENTS
  // ---------------------------------------------------------------------
  function presentNextEvent() {
    if (!eventQueue.length) { if (!state.char.alive) showDeath(); return; }
    const ev = eventQueue.shift();
    openSheet(`
      <h2>${eventIcon(ev)} ${esc(ev.title || 'Life Event')}</h2>
      <div class="lead">${esc(E().resolveText(state, ev.text))}</div>
      <div id="choices"></div>
    `, { dismissable: false });
    const cbox = $('#choices');
    ev.choices.forEach((ch, i) => {
      const b = document.createElement('button');
      b.className = 'choice';
      b.innerHTML = `<span>${esc(E().resolveText(state, ch.text))}</span>`;
      b.onclick = () => {
        const out = E().resolveChoice(state, ev, ch);
        renderStats(); renderLog(true);
        closeSheet();
        toast(out);
        setTimeout(() => { if (eventQueue.length) presentNextEvent(); else if (!state.char.alive) showDeath(); }, 250);
      };
      cbox.appendChild(b);
    });
  }
  function eventIcon(ev) {
    const m = { crime: '🚔', love: '❤️', family: '👪', health: '🏥', money: '💰', school: '🎓', war: '⚔️' };
    return m[ev.type] || '🎲';
  }

  // ---------------------------------------------------------------------
  //  CATEGORY SHEETS
  // ---------------------------------------------------------------------
  function openCategory(cat) {
    if (!state.char.alive) return;
    const ch = state.char;
    if (ch.criminal.inPrison && !['crime', 'activities'].includes(cat)) { toast('You are in prison.'); return; }
    ({ career: catCareer, school: catSchool, love: catLove, activities: catActivities, assets: catAssets, crime: catCrime, power: catPower, military: catMilitary })[cat]();
  }

  function actionResult(res) {
    renderStats(); renderLog(false);
    if (res && res.text) toast(res.text);
    if (state.char && !state.char.alive) { closeSheet(); showDeath(); }
  }

  // ---- Career ----
  function catCareer() {
    const ch = state.char;
    let html = `<h2>💼 Career</h2>`;
    if (ch.job) {
      html += `<div class="list-item"><div class="li-main"><div class="li-title">${esc(ch.job.title)}</div><div class="li-sub">${esc(ch.job.company)} • Performance ${ch.job.performance}%</div></div><div class="li-val">${ch.currency}${fmt(ch.job.salary)}/yr</div></div>
        <div class="btn-row">
          <button class="btn" data-a="harder">Work Harder</button>
          <button class="btn" data-a="raise">Ask for Raise</button>
          <button class="btn" data-a="promote">Seek Promotion</button>
          <button class="btn danger" data-a="quit">Quit</button>
        </div>`;
    } else {
      html += `<div class="lead">You're unemployed. Find work below.</div>`;
    }
    html += `<div class="section-title">Job Board</div><div id="jobs"></div>`;
    openSheet(html);
    if (ch.job) app().querySelectorAll('[data-a]').forEach((b) => (b.onclick = () => {
      const a = b.dataset.a;
      const r = a === 'harder' ? RTP.careerSystem.workHarder(state) : a === 'raise' ? RTP.careerSystem.askRaise(state) : a === 'promote' ? RTP.careerSystem.promote(state) : RTP.careerSystem.quit(state);
      actionResult(r); catCareer();
    }));
    const jobs = RTP.careerSystem.listOpenJobs(state);
    $('#jobs').innerHTML = jobs.length ? jobs.map((j, i) => `<div class="list-item"><div class="li-main"><div class="li-title">${esc(j.title)}</div><div class="li-sub">${esc(j.company)}${j.reqDegree ? ' • needs ' + esc(j.reqDegree) : ''}</div></div><button class="btn" data-job="${i}">${ch.currency}${fmt(j.salary)}</button></div>`).join('') : `<div class="lead">No jobs available for you yet — get educated or grow up.</div>`;
    app().querySelectorAll('[data-job]').forEach((b) => (b.onclick = () => { const r = RTP.careerSystem.apply(state, jobs[+b.dataset.job]); actionResult(r); if (r.ok) catCareer(); }));
  }

  // ---- School ----
  function catSchool() {
    const ch = state.char, ed = ch.education;
    let html = `<h2>🎓 Education</h2><div class="lead">${ed.inSchool ? 'Currently: ' + esc(ed.schoolType) : 'Not enrolled.'} ${ed.degrees.length ? '<br>Degrees: ' + ed.degrees.map(esc).join(', ') : ''}</div>`;
    html += `<div class="btn-row">`;
    if (ed.inSchool) html += `<button class="btn" data-a="study">Study Harder</button><button class="btn danger" data-a="drop">Drop Out</button>`;
    if (ch.age >= 18 && ed.degrees.includes('High School Diploma') && !(ed.inSchool && ed.stage === 'university')) html += `<button class="btn" data-a="uni">Enroll in University</button>`;
    html += `</div>`;
    if (!ed.inSchool && ch.age < 6) html += `<div class="lead">You're too young for school.</div>`;
    openSheet(html);
    const map = {
      study: () => RTP.eduSystem.study(state),
      drop: () => RTP.eduSystem.dropOut(state),
      uni: () => RTP.eduSystem.enrollUniversity(state, RTP.rng.pick((RTP.data.majors) || [{ field: 'Business', degree: "Bachelor's in Business" }, { field: 'Medicine', degree: 'Pre-Med Degree' }, { field: 'Law', degree: 'Pre-Law Degree' }, { field: 'Engineering', degree: "Bachelor's in Engineering" }, { field: 'Arts', degree: "Bachelor's in Arts" }]))
    };
    app().querySelectorAll('[data-a]').forEach((b) => (b.onclick = () => { const r = map[b.dataset.a](); actionResult(r); catSchool(); }));
  }

  // ---- Love / Relationships ----
  function catLove() {
    const ch = state.char;
    let html = `<h2>❤️ Relationships</h2>`;
    const rels = ch.relationships.filter((r) => r.alive);
    html += `<div class="section-title">Your People</div>`;
    html += rels.length ? rels.map((r) => `<div class="list-item"><div class="li-main"><div class="li-title">${esc(r.name)} <span class="pill">${esc(E().labelRel(r))}</span></div><div class="li-sub">Age ${r.age} • Relationship ${r.rel}%</div></div><button class="btn ghost" data-rel="${r.id}">Interact</button></div>`).join('') : `<div class="lead">You're all alone in this world.</div>`;
    html += `<div class="btn-row" style="margin-top:12px">`;
    if (ch.age >= 14 && !E().partner(ch)) html += `<button class="btn" data-a="date">Find Love</button>`;
    if (E().partner(ch)) { html += `<button class="btn" data-a="propose">Propose 💍</button><button class="btn" data-a="child">Have a Child 👶</button>`; }
    html += `</div>`;
    openSheet(html);
    app().querySelectorAll('[data-rel]').forEach((b) => (b.onclick = () => interactSheet(b.dataset.rel)));
    const acts = {
      date: () => { const r = RTP.loveSystem.findDate(state); if (r.ok) dateSheet(r.candidate); else actionResult(r); },
      propose: () => { actionResult(RTP.loveSystem.propose(state, E().partner(ch).id)); catLove(); },
      child: () => { actionResult(RTP.loveSystem.haveChild(state)); catLove(); }
    };
    app().querySelectorAll('[data-a]').forEach((b) => (b.onclick = acts[b.dataset.a]));
  }
  function dateSheet(cand) {
    openSheet(`<h2>💘 ${esc(cand.name)}</h2><div class="lead">Age ${cand.age} • Looks ${cand.looks}%. Shoot your shot?</div><div class="btn-row"><button class="btn" id="ask">Ask Them Out</button><button class="btn ghost" id="pass">Pass</button></div>`);
    $('#ask').onclick = () => { actionResult(RTP.loveSystem.askOut(state, cand)); catLove(); };
    $('#pass').onclick = catLove;
  }
  function interactSheet(relId) {
    const r = state.char.relationships.find((x) => x.id === relId);
    if (!r) return;
    openSheet(`<h2>${esc(r.name)}</h2><div class="lead">${esc(E().labelRel(r))} • Relationship ${r.rel}%</div>
      <div class="btn-row">
        <button class="btn" data-k="spendTime">Spend Time</button>
        <button class="btn" data-k="compliment">Compliment</button>
        <button class="btn" data-k="gift">Give Gift</button>
        <button class="btn danger" data-k="argue">Argue</button>
        <button class="btn danger" data-k="insult">Insult</button>
      </div>`);
    app().querySelectorAll('[data-k]').forEach((b) => (b.onclick = () => { actionResult(RTP.loveSystem.interact(state, relId, b.dataset.k)); interactSheet(relId); }));
  }

  // ---- Activities (Mind & Body, Doctor, Casino) ----
  function catActivities() {
    const ch = state.char;
    let html = `<h2>🧘 Activities</h2>`;
    const acts = RTP.activitySystem.list(state);
    html += acts.length ? acts.map((a, i) => `<div class="list-item"><div class="li-main"><div class="li-title">${esc(a.name)}</div><div class="li-sub">${esc(a.desc || '')}</div></div><button class="btn ghost" data-act="${i}">${a.cost ? ch.currency + fmt(a.cost) : 'Do'}</button></div>`).join('') : '';
    html += `<div class="section-title">Vices & Chance</div>
      <div class="btn-row"><button class="btn" data-c="casino">🎰 Casino</button><button class="btn" data-c="doctor">🏥 Doctor</button></div>`;
    openSheet(html);
    app().querySelectorAll('[data-act]').forEach((b) => (b.onclick = () => { actionResult(RTP.activitySystem.doActivity(state, acts[+b.dataset.act])); catActivities(); }));
    $('[data-c="casino"]').onclick = casinoSheet;
    $('[data-c="doctor"]').onclick = doctorSheet;
  }
  function casinoSheet() {
    const ch = state.char;
    openSheet(`<h2>🎰 Casino</h2><div class="lead">Cash: ${ch.currency}${fmt(ch.money)}. Place your bets.</div>
      <input class="field" id="bet" type="number" placeholder="Bet amount" value="${Math.max(10, Math.round(ch.money * 0.1))}" />
      <div class="btn-row">
        <button class="btn" data-g="slots">Slots</button>
        <button class="btn" data-g="blackjack">Blackjack</button>
        <button class="btn" data-g="roulette">Roulette</button>
        <button class="btn" data-g="horses">Horses</button>
      </div>`);
    app().querySelectorAll('[data-g]').forEach((b) => (b.onclick = () => { const bet = +$('#bet').value || 0; actionResult(RTP.casinoSystem.play(state, b.dataset.g, bet)); casinoSheet(); }));
  }
  function doctorSheet() {
    const ch = state.char;
    let html = `<h2>🏥 Doctor</h2>`;
    html += ch.conditions.length ? `<div class="section-title">Conditions</div>` + ch.conditions.map((c) => `<div class="list-item"><div class="li-main"><div class="li-title">${esc(c.name)}</div><div class="li-sub">${esc(c.kind)} • severity ${c.severity}</div></div><button class="btn" data-cure="${esc(c.id)}">Treat</button></div>`).join('') : `<div class="lead">You're in good health. Nothing to treat.</div>`;
    html += `<div class="btn-row" style="margin-top:10px"><button class="btn ghost" data-a="checkup">Full Checkup (${ch.currency}500)</button></div>`;
    openSheet(html);
    app().querySelectorAll('[data-cure]').forEach((b) => (b.onclick = () => {
      const cost = RTP.rng.int(500, 8000);
      if (ch.money < cost) { toast(`Treatment costs ${ch.currency}${fmt(cost)} — you can't afford it.`); return; }
      E().addMoney(state, -cost);
      if (RTP.rng.chance(0.7)) { E().applyEffect(state, { cureCondition: b.dataset.cure, health: +12 }); toast('Treatment successful!'); }
      else toast('Treatment failed. Try again later.');
      actionResult({}); doctorSheet();
    }));
    $('[data-a="checkup"]').onclick = () => { if (ch.money < 500) { toast("Can't afford it."); return; } E().addMoney(state, -500); E().applyEffect(state, { health: +5 }); actionResult({ text: 'Checkup done. Health improved.' }); doctorSheet(); };
  }

  // ---- Assets ----
  function catAssets() {
    const ch = state.char;
    let html = `<h2>🏠 Assets</h2>`;
    html += ch.assets.length ? `<div class="section-title">Owned</div>` + ch.assets.map((a) => `<div class="list-item"><div class="li-main"><div class="li-title">${esc(a.name)}</div><div class="li-sub">${esc(a.kind)} • worth ${ch.currency}${fmt(a.value)}</div></div><button class="btn ghost" data-sell="${esc(a.id)}">Sell</button></div>`).join('') : `<div class="lead">You own nothing of value yet.</div>`;
    html += `<div class="section-title">Marketplace</div><div class="btn-row"><button class="btn" data-shop="car">🚗 Cars</button><button class="btn" data-shop="realestate">🏡 Real Estate</button><button class="btn" data-shop="possession">💎 Luxury</button></div>`;
    openSheet(html);
    app().querySelectorAll('[data-sell]').forEach((b) => (b.onclick = () => { actionResult(RTP.assetSystem.sell(state, b.dataset.sell)); catAssets(); }));
    app().querySelectorAll('[data-shop]').forEach((b) => (b.onclick = () => shopSheet(b.dataset.shop)));
  }
  function shopSheet(kind) {
    const ch = state.char;
    const items = RTP.assetSystem.listForSale(state, kind);
    openSheet(`<h2>🛒 ${kind === 'realestate' ? 'Real Estate' : kind === 'car' ? 'Cars' : 'Luxury'}</h2><div class="lead">Cash: ${ch.currency}${fmt(ch.money)}</div>` +
      (items.length ? items.map((it, i) => `<div class="list-item"><div class="li-main"><div class="li-title">${esc(it.name)}</div><div class="li-sub">${esc(it.desc || '')}</div></div><button class="btn" data-buy="${i}">${ch.currency}${fmt(it.price)}</button></div>`).join('') : `<div class="lead">Nothing for sale right now.</div>`));
    app().querySelectorAll('[data-buy]').forEach((b) => (b.onclick = () => { actionResult(RTP.assetSystem.buy(state, items[+b.dataset.buy])); }));
  }

  // ---- Crime ----
  function catCrime() {
    const ch = state.char;
    let html = `<h2>🔫 Crime</h2>`;
    if (ch.criminal.inPrison) {
      html += `<div class="lead">You're in prison. Sentence: ${ch.criminal.sentence}y, served ${ch.criminal.served}y.</div><div class="btn-row"><button class="btn danger" data-a="escape">Attempt Escape</button></div>`;
      openSheet(html);
      $('[data-a="escape"]').onclick = () => { actionResult(RTP.crimeSystem.escape(state)); catCrime(); };
      return;
    }
    html += `<div class="lead">Notoriety: ${ch.criminal.notoriety}/100 • Record: ${ch.criminal.record.length} convictions</div><div class="section-title">Jobs</div>`;
    const crimes = RTP.crimeSystem.listCrimes(state);
    html += crimes.length ? crimes.map((c, i) => `<div class="list-item"><div class="li-main"><div class="li-title">${esc(c.name)}</div><div class="li-sub">${esc(c.desc || '')}</div></div><button class="btn danger" data-crime="${i}">Do it</button></div>`).join('') : `<div class="lead">No opportunities right now.</div>`;
    openSheet(html);
    app().querySelectorAll('[data-crime]').forEach((b) => (b.onclick = () => { const r = RTP.crimeSystem.commit(state, crimes[+b.dataset.crime]); actionResult(r); catCrime(); }));
  }

  // ---- Power ----
  function catPower() {
    const ch = state.char, p = ch.power;
    let html = `<h2>👑 Rise to Power</h2>`;
    if (statecraftUnlocked()) { html += `<div class="btn-row"><button class="btn" data-a="statecraft">🌍 Command Your Nation</button></div>`; }
    // Crime org
    html += `<div class="section-title">Organized Crime</div>`;
    if (p.crime.member) html += `<div class="list-item"><div class="li-main"><div class="li-title">${esc(p.crime.rankName)} of ${esc(p.crime.org)}</div><div class="li-sub">Respect ${p.crime.respect}/100</div></div><button class="btn" data-a="rise">Rise Up</button></div>`;
    else html += `<div class="btn-row"><button class="btn" data-a="joingang">Join an Organization</button></div>`;
    // Business
    html += `<div class="section-title">Business Empire</div>`;
    if (p.business.companies.length) html += p.business.companies.map((b) => `<div class="list-item"><div class="li-main"><div class="li-title">${esc(b.name)}</div><div class="li-sub">${esc(b.industry)} • valuation ${ch.currency}${fmt(b.value)}</div></div><button class="btn" data-grow="${esc(b.id)}">Grow</button></div>`).join('');
    html += `<div class="btn-row"><button class="btn" data-a="startbiz">Start a Business</button></div>`;
    // Politics
    html += `<div class="section-title">Politics</div>`;
    if (p.politics.inOffice) html += `<div class="list-item"><div class="li-main"><div class="li-title">${esc(p.politics.office)}</div><div class="li-sub">Approval ${p.politics.approval}%</div></div></div>`;
    html += `<div class="btn-row" id="offices"></div>`;
    // Fame
    html += `<div class="section-title">Fame</div><div class="list-item"><div class="li-main"><div class="li-title">${p.fame.title || 'Unknown'}</div><div class="li-sub">${fmt(p.fame.followers)} followers</div></div><button class="btn" data-a="viral">Post Content</button></div>`;
    openSheet(html);
    const offices = RTP.powerSystem.OFFICES.filter((o) => o.level <= (ch.power.politics.level + 1));
    $('#offices').innerHTML = offices.map((o) => `<button class="btn ghost" data-office="${o.id}">Run: ${o.name} (${ch.currency}${fmt(o.cost)})</button>`).join('');
    const acts = {
      joingang: () => RTP.powerSystem.joinGang(state),
      rise: () => RTP.powerSystem.riseRank(state),
      startbiz: () => { const n = prompt('Company name?', 'NewCo'); return RTP.powerSystem.startBusiness(state, n || 'NewCo', RTP.rng.pick(['Tech', 'Retail', 'Finance', 'Media', 'Energy', 'Real Estate'])); },
      viral: () => RTP.powerSystem.goViral(state),
      statecraft: () => { statecraftSheet(); return null; }
    };
    app().querySelectorAll('[data-a]').forEach((b) => (b.onclick = () => { const r = acts[b.dataset.a](); if (r) { actionResult(r); catPower(); } }));
    app().querySelectorAll('[data-grow]').forEach((b) => (b.onclick = () => { actionResult(RTP.powerSystem.growBusiness(state, b.dataset.grow)); catPower(); }));
    app().querySelectorAll('[data-office]').forEach((b) => (b.onclick = () => { actionResult(RTP.powerSystem.runForOffice(state, b.dataset.office)); catPower(); }));
  }
  function statecraftUnlocked() { return !!state.char.flags.headOfState; }

  // ---- Military ----
  function catMilitary() {
    const ch = state.char;
    let html = `<h2>🎖️ Military</h2>`;
    if (ch.military && ch.military.active) {
      const mil = ch.military;
      html += `<div class="list-item"><div class="li-main"><div class="li-title">${esc(mil.rankName)}</div><div class="li-sub">${RTP.militarySystem.branches().find((b) => b.id === mil.branch).name} • ${mil.missions} missions • ${mil.medals.length} medals</div></div></div>`;
      html += `<div class="section-title">Available Missions</div>`;
      const ms = RTP.militarySystem.listMissions(state);
      html += ms.map((m, i) => `<div class="list-item"><div class="li-main"><div class="li-title">${esc(m.name)}</div><div class="li-sub">Difficulty ${m.difficulty || 50} • risk ${Math.round((m.lethal || 0.1) * 100)}%</div></div><button class="btn danger" data-m="${i}">Deploy</button></div>`).join('');
      html += `<div class="btn-row" style="margin-top:10px"><button class="btn ghost" data-a="discharge">Leave Service</button></div>`;
      openSheet(html);
      app().querySelectorAll('[data-m]').forEach((b) => (b.onclick = () => { const r = RTP.militarySystem.runMission(state, ms[+b.dataset.m]); actionResult(r); if (state.char.alive) catMilitary(); }));
      $('[data-a="discharge"]').onclick = () => { actionResult(RTP.militarySystem.discharge(state)); catMilitary(); };
    } else {
      html += `<div class="lead">Serve your country. Climb the ranks. Run missions for glory and pay.</div><div class="section-title">Enlist</div>`;
      html += RTP.militarySystem.branches().map((b) => `<div class="list-item"><div class="li-main"><div class="li-title">${b.icon} ${esc(b.name)}</div><div class="li-sub">${esc(b.desc)}</div></div><button class="btn" data-b="${b.id}">Enlist</button></div>`).join('');
      openSheet(html);
      app().querySelectorAll('[data-b]').forEach((b) => (b.onclick = () => { actionResult(RTP.militarySystem.enlist(state, b.dataset.b)); catMilitary(); }));
    }
  }

  // ---- Statecraft (head of state) ----
  function statecraftSheet() {
    const ov = RTP.statecraftSystem.overview(state);
    const me = ov.me, ch = state.char;
    let html = `<h2>🌍 Statecraft</h2><div class="lead">${esc(me.name)} ${me.flag} — you rule.</div>`;
    html += `<div>`;
    html += `<span class="pill power">Treasury ${fmt(me.treasury)}</span><span class="pill">GDP ${fmt(me.gdp)}</span><span class="pill">Military ${me.military}/100</span><span class="pill">Stability ${me.stability}%</span>`;
    if (ov.empire.conquered.length) html += `<span class="pill power">Empire: ${ov.empire.conquered.length + 1} nations</span>`;
    html += `</div>`;
    html += `<div class="btn-row" style="margin-top:12px">
        <button class="btn" data-a="taxes">Collect Taxes</button>
        <button class="btn" data-a="invest">Invest</button>
        <button class="btn" data-a="army">Build Army</button>
      </div>`;
    if (ov.wars.length) { html += `<div class="section-title">Active Wars</div>` + ov.wars.map((w) => `<div class="list-item"><div class="li-main"><div class="li-title">⚔️ ${esc(w.name)}</div><div class="li-sub">${w.momentum >= 0 ? 'Advancing' : 'Retreating'} • cost ${fmt(w.cost)}</div></div></div>`).join(''); }
    html += `<div class="section-title">The World</div><div id="nations"></div>`;
    openSheet(html);
    const acts = {
      taxes: () => RTP.statecraftSystem.collectTaxes(state),
      invest: () => { const sec = prompt('Invest in: economy, infrastructure, education, or tech?', 'economy'); const amt = Math.round(me.treasury * 0.3); return RTP.statecraftSystem.invest(state, sec || 'economy', amt); },
      army: () => RTP.statecraftSystem.buildArmy(state, Math.round(me.treasury * 0.4))
    };
    app().querySelectorAll('[data-a]').forEach((b) => (b.onclick = () => { actionResult(acts[b.dataset.a]()); statecraftSheet(); }));
    $('#nations').innerHTML = ov.others.map((n) => `<div class="list-item"><div class="li-main"><div class="li-title">${n.flag} ${esc(n.name)} ${n.ally ? '<span class="pill good">ally</span>' : ''}</div><div class="li-sub">Mil ${n.military} • Rel ${ov.relations[n.id]}%</div></div><button class="btn ghost" data-n="${esc(n.id)}">Engage</button></div>`).join('');
    app().querySelectorAll('[data-n]').forEach((b) => (b.onclick = () => nationSheet(b.dataset.n)));
  }
  function nationSheet(nid) {
    const w = state.world; const n = w.nations[nid];
    openSheet(`<h2>${n.flag} ${esc(n.name)}</h2><div class="lead">Relations ${w.relations[nid]}% • Military ${n.military}/100 • Stability ${n.stability}%</div>
      <div class="btn-row">
        <button class="btn" data-d="summit">Summit</button>
        <button class="btn" data-d="tradeDeal">Trade Deal</button>
        <button class="btn" data-d="alliance">Form Alliance 🤝</button>
        <button class="btn danger" data-d="sanction">Sanction</button>
        <button class="btn danger" data-d="war">Declare War ⚔️</button>
      </div>`);
    app().querySelectorAll('[data-d]').forEach((b) => (b.onclick = () => {
      const d = b.dataset.d;
      const r = d === 'war' ? RTP.statecraftSystem.declareWar(state, nid) : RTP.statecraftSystem.diplomacy(state, nid, d);
      actionResult(r); statecraftSheet();
    }));
  }

  // ---------------------------------------------------------------------
  //  DEATH + LEGACY
  // ---------------------------------------------------------------------
  function showDeath() {
    const ch = state.char;
    const canLegacy = E().canContinueLegacy(state);
    const heirs = E().children(ch).filter((c) => c.alive);
    app().innerHTML = `
      <div class="screen death-screen">
        <div class="tombstone">🪦</div>
        <div class="title" style="font-size:1.6rem">${esc(ch.first)} ${esc(ch.last)}</div>
        <div class="tagline">${ch.birthYear}–${ch.birthYear + ch.age} • Died at ${ch.age} from ${esc(ch.causeOfDeath || 'unknown causes')}</div>
        <div class="summary">
          <div class="row"><span>Final Net Worth</span><b>${ch.currency}${fmt(E().netWorth(ch))}</b></div>
          <div class="row"><span>Top Title</span><b>${esc(E().bestTitle(ch) || 'Commoner')}</b></div>
          <div class="row"><span>Generation</span><b>${state.dynasty.generation}</b></div>
          <div class="row"><span>Dynasty Wealth (all-time)</span><b>${ch.currency}${fmt(state.dynasty.netWorthEver)}</b></div>
          <div class="row"><span>Relationships</span><b>${ch.relationships.filter((r) => r.alive).length}</b></div>
        </div>
        ${canLegacy ? `<button class="big-btn" id="legacyBtn">👑 Continue as Your Heir</button>` : `<div class="tagline">No living heirs — the dynasty ends here.</div>`}
        <button class="big-btn ghost" id="newBtn">Start a New Life</button>
      </div>`;
    if (canLegacy) $('#legacyBtn').onclick = () => {
      if (heirs.length > 1) heirPicker(heirs);
      else { E().continueAsHeir(state, heirs[0].id); renderGame(); }
    };
    $('#newBtn').onclick = () => { E().wipe(); showTitle(); };
  }
  function heirPicker(heirs) {
    app().innerHTML = `<div class="screen"><div class="crown">👑</div><div class="title" style="font-size:1.5rem">Choose Your Heir</div><div class="tagline">Who continues the legacy?</div><div class="summary" id="heirs"></div></div>`;
    $('#heirs').innerHTML = heirs.map((h) => `<div class="row"><span>${esc(h.name)} (${h.age}, ${h.sex})</span><button class="btn" data-h="${h.id}">Choose</button></div>`).join('');
    app().querySelectorAll('[data-h]').forEach((b) => (b.onclick = () => { E().continueAsHeir(state, b.dataset.h); renderGame(); }));
  }

  // ---------------------------------------------------------------------
  //  SHEET / TOAST PRIMITIVES
  // ---------------------------------------------------------------------
  function openSheet(html, opts) {
    opts = opts || {};
    closeSheet();
    const ov = document.createElement('div');
    ov.className = 'overlay'; ov.id = 'overlay';
    ov.innerHTML = `<div class="sheet"><div class="grip"></div>${html}</div>`;
    app().appendChild(ov);
    if (opts.dismissable !== false) ov.onclick = (e) => { if (e.target === ov) closeSheet(); };
  }
  function closeSheet() { const ov = $('#overlay'); if (ov) ov.remove(); }
  let toastTimer = null;
  function toast(msg) {
    if (!msg) return;
    const old = $('.toast'); if (old) old.remove();
    const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg;
    app().appendChild(t);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.remove(), 2600);
  }

  // ---------------------------------------------------------------------
  //  ENGINE EVENT SUBSCRIPTIONS
  // ---------------------------------------------------------------------
  RTP.UI = {
    boot() {
      E().on((type, payload) => {
        if (type === 'events') { eventQueue.push(...payload.events); }
      });
      const saved = E().hasSave();
      showTitle();
    },
    showTitle, renderGame
  };
})();
