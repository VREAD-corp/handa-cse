import { test, expect } from '@playwright/test';

const LIVE = !!process.env.BASE_URL;
const EP = /script\.google\.com\/macros\/s\/AKfycby4di9DZ/;
const shot = (page, name) => page.screenshot({ path: `test-results/shots/${name}-${page.viewportSize().width}.png`, fullPage: true });

async function noHScroll(page) {
  const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(over).toBeLessThanOrEqual(0);
}
async function mockEndpoint(page, bodies) {
  await page.route(EP, async (route) => {
    const req = route.request();
    if (req.method() === 'POST') { try { bodies.push(JSON.parse(req.postData() || '{}')); } catch { bodies.push({}); } }
    const b = bodies[bodies.length - 1] || {};
    const res = b.action === 'rights' ? { ok: true, type: b.type, matched: true, status: 'done_automatically' } : { ok: true };
    await route.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify(res) });
  });
}

test('home: facts, disclaimers, sample question, light page', async ({ page }) => {
  const res = await page.goto('./');
  expect(res.status()).toBe(200);
  await expect(page.locator('h1')).toContainText('Civil Service Exam');
  await expect(page.locator('.facts')).toContainText('14 March 2027');
  await expect(page.locator('.facts')).toContainText('3 hours 10 minutes');
  await expect(page.locator('.facts')).toContainText('14.41%');
  const foot = page.locator('footer');
  for (const t of ['READ FRANCE SAS', '988 741 773', 'octave@vread.fr', 'Paris', 'not affiliated with', 'Civil Service Commission', 'R.A. 10173', 'Terms of use']) await expect(foot).toContainText(t);
  await page.locator('#sample .choice').first().click();
  await expect(page.locator('#sample .why')).toBeVisible();
  await expect(page.locator('#sample .choice.right')).toHaveCount(1);
  await noHScroll(page);
  const bytes = await page.evaluate(() => performance.getEntriesByType('resource').concat(performance.getEntriesByType('navigation')).filter((e) => e.name.includes('/handa-cse/')).reduce((s, e) => s + (e.decodedBodySize || 0), 0));
  expect(bytes).toBeLessThan(80 * 1024); // home never loads the question bank
  await shot(page, 'home');
});

test('practice: 10-item drill with explanations, progress kept', async ({ page }) => {
  await page.goto('practice/');
  await expect(page.locator('#parts .opt[data-levels="sub"]')).toBeHidden(); // clerical hidden for Professional
  await page.locator('label.opt', { hasText: 'Subprofessional' }).click();
  await expect(page.locator('#parts .opt[data-levels="pro"]')).toBeHidden(); // analytical hidden for Subprofessional
  await page.locator('label.opt', { hasText: 'Professional' }).first().click();
  await page.getByRole('button', { name: 'Simulan' }).click();
  for (let i = 1; i <= 10; i++) {
    await expect(page.locator('#drill .qmeta')).toContainText(`Tanong ${i} / 10`);
    await page.locator('#drill .choice').nth(i % 4).click();
    await expect(page.locator('#drill .why')).toContainText('Paliwanag');
    await expect(page.locator('#drill a.linkbtn')).toHaveAttribute('href', /mailto:octave@vread\.fr/);
    if (i === 3) await shot(page, 'practice-question');
    await page.locator('#drill [data-act=next]').click();
  }
  await expect(page.locator('#drill h2')).toContainText('/ 10 tama');
  const n = await page.evaluate(() => Object.keys(JSON.parse(localStorage.getItem('handa.v1')).s).length);
  expect(n).toBe(10);
  await page.reload();
  await expect(page.locator('#progress')).toBeVisible();
  await noHScroll(page);
  await shot(page, 'practice-progress');
  await page.goto('./');
  await expect(page.locator('#progress-home')).toContainText('10 items answered');
});

test('practice: review mistakes only', async ({ page }) => {
  await page.goto('practice/?level=sub&part=clerical');
  await page.locator('label.opt', { hasText: 'Balikan ang mga mali' }).click();
  await page.getByRole('button', { name: 'Simulan' }).click();
  await expect(page.locator('#setup-msg')).toContainText('Wala ka pang mali');
});

for (const [lvl, n, clock, label] of [['pro', 150, /^3:(09|10):/, 'Professional'], ['sub', 145, /^2:(39|40):/, 'Subprofessional']]) {
  test(`mock ${lvl}: ${n} items, official clock, resume, submit, review`, async ({ page }) => {
    await page.goto('mock/');
    await page.locator(`[data-start=${lvl}]`).click();
    await expect(page.locator('#grid button')).toHaveCount(n);
    await expect(page.locator('#timer')).toHaveText(clock);
    await page.locator('#qbox .choice').nth(1).click();
    await page.locator('#flag').check();
    if (page.viewportSize().width < 820) await page.locator('details.nav summary').click();
    await page.locator('#qbox [data-act=next]').click();
    await page.locator('#qbox .choice').nth(2).click();
    await expect(page.locator('#nans')).toHaveText('2');
    await expect(page.locator('#grid button').first()).toHaveClass(/flag/);
    await noHScroll(page);
    await shot(page, `mock-${lvl}-exam`);
    await page.reload();
    await expect(page.locator('#resume')).toContainText(label);
    await page.locator('#resume-btn').click();
    await expect(page.locator('#nans')).toHaveText('2');
    const sections = await page.evaluate(() => { const s = JSON.parse(localStorage.getItem('handa.mock')); return s.ids.map((id) => id[0]); });
    expect(sections.length).toBe(n);
    expect(sections.includes(lvl === 'pro' ? 'C' : 'A')).toBe(false); // no clerical in Professional, no analytical in Subprofessional
    page.once('dialog', (d) => d.accept());
    await page.locator('#submit').click();
    await expect(page.locator('.stat')).toContainText(`/ ${n}`);
    await expect(page.locator('#rgrid button')).toHaveCount(n);
    await expect(page.locator('#rbox .why')).toBeVisible();
    await shot(page, `mock-${lvl}-results`);
    await page.goto('mock/');
    await expect(page.locator('#history')).toContainText(label);
  });
}

test('mock: time running out submits automatically', async ({ page }) => {
  await page.goto('mock/');
  await page.locator('[data-start=sub]').click();
  await expect(page.locator('#grid button')).toHaveCount(145);
  await page.evaluate(() => { const s = JSON.parse(localStorage.getItem('handa.mock')); s.end = Date.now() - 1000; localStorage.setItem('handa.mock', JSON.stringify(s)); });
  await page.reload();
  await page.locator('#resume-btn').click();
  await expect(page.locator('#exam')).toContainText('time ran out');
});

test('Handa Pass: price variant, payment question, early-access POST', async ({ page }) => {
  const bodies = [];
  if (!LIVE) await mockEndpoint(page, bodies);
  await page.goto('pass/?p=b');
  await expect(page.locator('.price .js-price')).toHaveText('₱299');
  await page.goto('pass/?p=a');
  await expect(page.locator('.price .js-price')).toHaveText('₱149');
  await page.getByRole('button', { name: 'Join the list (free)' }).click();
  await expect(page.locator('#signup-msg')).toContainText('e-mail');
  await page.fill('#email', `e2e-${page.viewportSize().width}-${Date.now()}@example.com`);
  await page.locator('label.opt', { hasText: 'Iba pa' }).click();
  await expect(page.locator('#pay_other')).toBeVisible();
  await page.fill('#pay_other', 'ShopeePay');
  await page.getByRole('button', { name: 'Join the list (free)' }).click();
  await expect(page.locator('#signup-msg')).toContainText('consent');
  await page.locator('label.opt', { hasText: 'GCash' }).click();
  await page.locator('label.opt', { hasText: 'Subprofessional' }).click();
  await page.locator('label.opt', { hasText: '14 March 2027' }).click();
  await page.locator('input[name=consent]').check();
  await noHScroll(page);
  await shot(page, 'pass-form');
  await page.getByRole('button', { name: 'Join the list (free)' }).click();
  await expect(page.locator('#signup-msg')).toContainText('Salamat', { timeout: 30_000 });
  if (!LIVE) {
    const b = bodies.find((x) => x.action === 'signup');
    expect(b).toMatchObject({ pay: 'gcash', level: 'sub', sitting: '2027-03', variant: 'a', consent: true, consent_version: 'ea-2026-10-13' });
  }
  await shot(page, 'pass-done');
});

test('privacy: notice and rights request', async ({ page }) => {
  const bodies = [];
  if (!LIVE) await mockEndpoint(page, bodies);
  await page.goto('privacy/');
  for (const t of ['R.A. 10173', 'National Privacy Commission', 'local storage', '31 October 2027']) await expect(page.locator('main')).toContainText(t);
  await page.fill('#r-email', `e2e-${Date.now()}@example.com`);
  await page.getByRole('button', { name: 'Send request' }).click();
  await expect(page.locator('#rights-msg')).toContainText('Done', { timeout: 30_000 });
  await noHScroll(page);
});

test('other pages render without overflow', async ({ page }) => {
  for (const p of ['about/', 'terms/', 'mock/', 'does-not-exist/']) {
    await page.goto(p);
    await expect(page.locator('h1')).toBeVisible();
    await noHScroll(page);
    await shot(page, p.replace(/\W/g, '') || 'x');
  }
});

test('PWA: manifest, service worker, works offline', async ({ page, context }) => {
  await page.goto('./');
  const man = await (await page.request.get('manifest.webmanifest')).json();
  expect(man.display).toBe('standalone');
  expect(man.icons.length).toBeGreaterThanOrEqual(2);
  await page.waitForFunction(() => navigator.serviceWorker && navigator.serviceWorker.controller !== null || navigator.serviceWorker.ready.then(() => true), null, { timeout: 15_000 });
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.reload();
  await page.waitForFunction(() => !!navigator.serviceWorker.controller);
  await page.waitForTimeout(1500); // let precache finish
  await context.setOffline(true);
  await page.goto('practice/');
  await page.getByRole('button', { name: 'Simulan' }).click();
  await expect(page.locator('#drill .choice')).toHaveCount(4);
  await context.setOffline(false);
});

test('tracking: anonymous, cookieless hits only on the real host', async ({ page }) => {
  const hits = [];
  page.on('request', (r) => { if (EP.test(r.url()) && r.url().includes('action=track')) hits.push(r); });
  await page.goto('./');
  await page.waitForTimeout(1500);
  if (!LIVE) { expect(hits.length).toBe(0); return; }
  expect(hits.length).toBeGreaterThanOrEqual(1);
  const body = JSON.parse(hits[0].postData());
  expect(Object.keys(body).sort()).toEqual(['device', 'event', 'page', 'ref_domain', 'site', 'ts', 'utm_campaign', 'utm_medium', 'utm_source', 'variant'].sort());
  expect(body.site).toBe('handa-cse');
  expect(await page.context().cookies()).toHaveLength(0);
});
