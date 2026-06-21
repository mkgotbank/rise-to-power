<h1 align="center">👑 Rise to Power</h1>

<p align="center">
  <b>A free, open-source life simulator.</b><br>
  Live thousands of lives. Build a dynasty. Rise from a newborn nobody to the ruler of nations.
</p>

<p align="center">
  <a href="#play"><b>▶ Play in your browser</b></a> ·
  <a href="#features">Features</a> ·
  <a href="#how-it-works">How it works</a> ·
  <a href="DATA_SPEC.md">Add content</a>
</p>

---

A BitLife-style life sim, reimagined and **100% free with everything unlocked** — no paywalls, no ads, no "Bitizen." Play in any browser, on phone or desktop. Your save lives in your browser.

## Play

Open the live site (GitHub Pages), or run it locally:

```bash
git clone <this-repo>
cd rise-to-power
python3 -m http.server 8000   # then open http://localhost:8000
```

No build step, no dependencies — it's plain HTML/CSS/JS.

## Features

**The full life, birth to death:**
- 🍼 Born into a random country, family, and fortune — or design a custom character
- 📊 Core stats: Health, Happiness, Smarts, Looks, plus Karma — that drift and respond to your choices
- 🎓 Education from elementary through university and beyond
- 💼 A deep career system — dozens of jobs, raises, promotions, performance
- ❤️ Relationships: meet people, date, marry, have children, friends, family, pets — each with their own bond. Break up, divorce, or cheat (with consequences). Set your **sexual orientation** (drives who you date).
- 🏥 Health & medicine: illnesses, conditions, addictions, doctors, therapy
- 🏠 Assets & money: cars, real estate, luxury goods, investments, and the casino
- 🎲 Hundreds of randomized life events with branching, weighted outcomes

**Your touches — the "Rise to Power" spine:**
- 👑 **Legacy / Dynasty** — when you die, continue as your heir. Inherit wealth and estates, and watch your family climb across generations.
- 🔫 **Organized crime** — join a syndicate and rise from Associate to Kingpin
- 🏢 **Business empires** — found companies and grow them into fortunes
- 🗳️ **Politics** — run for City Council, Mayor, Governor, Senator... President
- 🌟 **Fame** — go viral, build a following, become an icon
- 🎖️ **Military** — enlist in the Army, Navy, Air Force, or an intelligence agency; run missions, earn rank and medals
- 🌍 **Statecraft** — once you lead a nation, command a treasury and army: forge alliances, sign trade deals, sanction rivals, **declare war, and annex other countries into your empire**

**Sandbox & control (the ☰ menu):**
- ⚡ **God Mode** — drag sliders to set any stat, set/add cash, heal everything, wipe your criminal record, even revive after death
- ⏪ **Go Back in Time** — rewind to any earlier age; everything after is undone
- 🌈 Change your orientation any time
- 💾 **Auto-save after every action** to your browser — close the tab and your life is right where you left it

## How it works

The game is **data-driven**: a small engine interprets pure-data content.

```
index.html            script load order
css/styles.css        the look
js/rng.js             seeded RNG (reproducible lives)
js/engine.js          state, the effect/condition DSL, aging, money, legacy, save/load
js/systems.js         interactive actions: school, careers, crime, love, assets, casino, power
js/statecraft.js      military service + geopolitics (war, alliances, annexation)
js/ui.js              all screens and menus
data/*.js             the content: events, careers, crimes, assets, missions, nations, ...
```

Want to add a life event, job, or crime? You only touch `data/*.js` — see **[DATA_SPEC.md](DATA_SPEC.md)**. Much of the content library was generated and reviewed by an AI content pipeline (`build/merge.js`) against that same contract.

## License

[MIT](LICENSE) — free to play, fork, and build on.
