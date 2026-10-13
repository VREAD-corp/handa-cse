// The shared cro.js on every page: loaded before anything reads the price variant, price test ported from the old
// per-browser draw (localStorage handa.p) to OCTAVE_XP (mode 'tab', ?p=a|b forces), and the vendored copies of
// cro.js / Cro.js byte-identical to octave-checkout (checked when that repo sits next to this one).
import { test } from 'node:test';
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import * as P from '../../site/src/pages.mjs';
import { SITE } from '../../site/src/config.mjs';

const root = new URL('../../', import.meta.url);
const read = (p) => fs.readFileSync(new URL(p, root), 'utf8');
const CRO = read('site/assets/cro.js');
const sample = { id: 'G-019', section: 'geninfo', q: 'Q?', choices: ['a', 'b', 'c', 'd'], answer: 0, why: 'w' };
const counts = { total: 1, verbal: 0, numerical: 0, analytical: 0, clerical: 0, geninfo: 1 };
const PAGES = { home: P.home(sample, counts), practice: P.practice(counts), mock: P.mock(), pass: P.pass(), about: P.about(counts), privacy: P.privacy(), terms: P.terms(), notFound: P.notFound() };

test('every page loads cro.js synchronously, after OCTAVE_XP and before the variant is read', () => {
  for (const [name, html] of Object.entries(PAGES)) {
    const head = html.slice(0, html.indexOf('</head>'));
    const xp = head.indexOf('window.OCTAVE_XP='), tag = head.indexOf('/assets/cro.js'), read = head.indexOf("octaveCro.v('price')");
    assert.ok(xp > 0 && tag > xp && read > tag, name);
    const m = head.match(/<script src="[^"]*\/assets\/cro\.js[^"]*"([^>]*)><\/script>/);
    assert.ok(m, name);
    assert.ok(!/\b(defer|async|type=)/.test(m[1]), `${name}: classic blocking script`);
    assert.match(m[1], new RegExp(`data-site="handa-cse" data-api="${SITE.endpoint.replace(/[.?]/g, '\\$&')}" data-hosts="outils\\.vread\\.fr vread-corp\\.github\\.io"`));
    assert.ok(html.indexOf('/assets/mesure.js') > html.indexOf('</head>'), `${name}: mesure.js (reads hVariant) comes later`);
    assert.ok(!/handa\.p'\)|getItem\('handa\.p'/.test(html.replace("removeItem('handa.p')", '')), `${name}: no old draw left`);
  }
});

// Runs the head scripts (OCTAVE_XP, cro.js, the hVariant/hPrice line) in a minimal fake browser.
function head({ search = '', local = {}, session = {}, random = 0.2 } = {}) {
  const html = PAGES.pass;
  const scripts = [...html.slice(0, html.indexOf('</head>')).matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)];
  const attrs = {};
  const store = (o) => ({ getItem: (k) => (k in o ? o[k] : null), setItem: (k, v) => { o[k] = String(v); }, removeItem: (k) => { delete o[k]; } });
  const doc = { readyState: 'loading', currentScript: null, documentElement: { setAttribute: (k, v) => { attrs[k] = v; } }, querySelectorAll: () => [], addEventListener: () => {} };
  const ctx = {
    navigator: { userAgent: 'Mozilla/5.0 Chrome/141.0.0.0', webdriver: false }, location: { search, hostname: 'localhost', pathname: '/handa-cse/pass/' },
    document: doc, localStorage: store(local), sessionStorage: store(session), URLSearchParams, Math: Object.assign(Object.create(Math), { random: () => random }),
    addEventListener: () => {}, fetch: () => { throw new Error('nothing is sent from localhost'); },
  };
  ctx.window = ctx;
  vm.createContext(ctx);
  for (const [, a, body] of scripts) {
    if (/src="[^"]*\/assets\/cro\.js/.test(a)) {
      doc.currentScript = { dataset: Object.fromEntries([...a.matchAll(/data-([a-z]+)="([^"]*)"/g)].map((m) => [m[1], m[2]])) };
      vm.runInContext(CRO, ctx);
      doc.currentScript = null;
    } else if (body.trim()) vm.runInContext(body, ctx);
  }
  return { v: ctx.hVariant, price: ctx.hPrice, attrs, local, session };
}

test('price test: ?p forces, else one 50/50 draw per tab kept in sessionStorage; old localStorage key removed', () => {
  let r = head({ search: '?p=b', local: { 'handa.p': 'a' } });
  assert.deepEqual([r.v, r.price, r.attrs['data-xp-price'], r.session.oxp_price], ['b', SITE.prices.b, 'b', 'b']);
  assert.ok(!('handa.p' in r.local), 'old per-browser key cleaned up');
  r = head({ search: '?p=a', session: { oxp_price: 'b' } });
  assert.deepEqual([r.v, r.price], ['a', SITE.prices.a]);
  assert.equal(head({ random: 0.2 }).v, 'a');
  assert.equal(head({ random: 0.7 }).price, SITE.prices.b);
  r = head({ random: 0.2, session: { oxp_price: 'b' } });
  assert.deepEqual([r.v, r.price], ['b', SITE.prices.b], 'same tab keeps its variant');
  assert.equal(head({ local: { 'handa.p': 'b' }, random: 0.2 }).v, 'a', 'the old per-browser draw is no longer read');
  assert.deepEqual(Object.keys(head({ random: 0.7 }).local), [], 'nothing kept per browser');
});

test('backend whitelist matches the site experiment', () => {
  const code = read('gas/src/Code.js');
  assert.match(code, /var CRO_EXPERIMENTS_ = \{ price: \['a', 'b'\] \}/);
  assert.match(PAGES.home, /window\.OCTAVE_XP=\[\{id:'price',variants:\['a','b'\],mode:'tab',param:'p'\}\]/);
  assert.match(code, /req\.kind === 'cro' \? croTrack_\(req\) : track_\(req\)/);
});

test('vendored cro.js and Cro.js are byte-identical to octave-checkout', (t) => {
  const canon = new URL('octave-checkout/gas/', new URL('../../../', import.meta.url).href.replace(/worktrees\/$/, ''));
  const pairs = [['site/assets/cro.js', 'web/cro.js'], ['gas/src/Cro.js', 'src/Cro.js'], ['tests/unit/cro.check.mjs', 'web/cro.check.mjs'], ['tests/unit/cro-gas.check.mjs', 'web/cro-gas.check.mjs']];
  if (!fs.existsSync(new URL('web/cro.js', canon))) { t.skip('octave-checkout not checked out next to this repo'); return; }
  for (const [mine, theirs] of pairs) assert.equal(read(mine), fs.readFileSync(new URL(theirs, canon), 'utf8'), mine);
});
