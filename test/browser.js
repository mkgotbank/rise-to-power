/* Real-browser smoke test via playwright-core + system Chrome. */
const { chromium } = require('playwright-core');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const URL = 'http://localhost:8731/';

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME, headless: true });
  const page = await browser.newPage({ viewport: { width: 414, height: 896 } });
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));

  const log = (s) => console.log(s);
  await page.goto(URL, { waitUntil: 'networkidle' });

  // 1. Title screen
  await page.waitForSelector('#title');
  const title = await page.textContent('.title');
  log('Title screen: "' + title + '"');
  await page.screenshot({ path: 'test/shot-title.png' });

  // 2. Start a life
  await page.click('#newLifeBtn');
  await page.waitForSelector('#ageBtn');
  log('Game started. Sub: ' + (await page.textContent('#subline')));

  // 3. Age up ~30 years, resolving any interactive events
  let eventsHandled = 0, ages = 0, died = false;
  async function drain() {
    for (let g = 0; g < 10; g++) {
      const choice = await page.$('#overlay .choice');
      if (choice) { await choice.click({ force: true }).catch(() => {}); eventsHandled++; await page.waitForTimeout(130); }
      else { await page.waitForTimeout(120); if (!(await page.$('#overlay .choice'))) break; }
    }
  }
  for (let i = 0; i < 30; i++) {
    await drain();
    if (await page.$('.death-screen')) { died = true; break; }
    const ab = await page.$('#ageBtn');
    if (!ab) { died = true; break; }
    await ab.click({ force: true }).catch(() => {});
    ages++;
    await page.waitForTimeout(160);
    await drain();
    if (await page.$('.death-screen')) { died = true; break; }
  }
  log(`Aged ${ages} years, resolved ${eventsHandled} interactive events, died=${died}`);

  // 4. If alive, open every category menu and confirm each renders
  if (!died && (await page.$('#ageBtn'))) {
    const cats = await page.$$eval('.cat', (els) => els.map((e) => e.dataset.cat));
    for (const c of cats) {
      await page.click(`.cat[data-cat="${c}"]`);
      await page.waitForSelector('#overlay .sheet h2', { timeout: 3000 });
      const h = await page.textContent('#overlay .sheet h2');
      log(`  menu ${c.padEnd(11)} -> ${h.trim()}`);
      await page.evaluate(() => { const o = document.getElementById('overlay'); if (o) o.remove(); });
      await page.waitForTimeout(40);
    }
    await page.screenshot({ path: 'test/shot-game.png' });
    // exercise a couple real actions
    await page.click('.cat[data-cat="activities"]');
    await page.waitForSelector('#overlay');
    const actBtn = await page.$('#overlay [data-act]');
    if (actBtn) { await actBtn.click(); log('  did an activity OK'); }
    await page.evaluate(() => { const o = document.getElementById('overlay'); if (o) o.remove(); });

    // NEW: menu -> God Mode (move a slider)
    await page.click('#menuBtn');
    await page.waitForSelector('#overlay [data-m="god"]');
    await page.click('#overlay [data-m="god"]');
    await page.waitForSelector('.god-range');
    await page.$eval('.god-range[data-stat="smarts"]', (el) => { el.value = 95; el.dispatchEvent(new Event('input', { bubbles: true })); });
    const smarts = await page.$eval('#gv_smarts', (e) => e.textContent);
    log('  God Mode slider set smarts -> ' + smarts);
    await page.click('#overlay [data-g="m1"]');
    log('  God Mode +$1M OK');
    await page.evaluate(() => { const o = document.getElementById('overlay'); if (o) o.remove(); });

    // NEW: Love -> Meet Someone
    await page.click('.cat[data-cat="love"]');
    await page.waitForSelector('#overlay [data-a="meet"]');
    await page.click('#overlay [data-a="meet"]');
    log('  Met someone new OK');
    await page.evaluate(() => { const o = document.getElementById('overlay'); if (o) o.remove(); });

    // NEW: Time travel
    await page.click('#menuBtn');
    await page.waitForSelector('#overlay [data-m="time"]');
    await page.click('#overlay [data-m="time"]');
    const ttBtn = await page.$('#overlay [data-tt]');
    if (ttBtn) {
      const ageBefore = await page.textContent('#subline');
      await ttBtn.click();
      await page.waitForSelector('#ageBtn');
      log('  Time travel OK ("' + ageBefore.trim() + '" -> "' + (await page.textContent('#subline')).trim() + '")');
    }
  }

  // 5. localStorage save check
  const hasSave = await page.evaluate(() => !!localStorage.getItem('riseToPower.save.v1'));
  log('Save persisted: ' + hasSave);

  await browser.close();

  console.log('\n=== BROWSER TEST ' + (errors.length ? 'FOUND ' + errors.length + ' ERRORS ===' : 'PASSED (no console/page errors) ==='));
  errors.slice(0, 20).forEach((e) => console.log('  ✗ ' + e));
  process.exit(errors.length ? 1 : 0);
})().catch((e) => { console.error('TEST CRASHED:', e.message); process.exit(2); });
