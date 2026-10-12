// Builds the static site into docs/ (GitHub Pages, branch main, folder /docs). node site/build.mjs
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { SITE } from './src/config.mjs';
import * as P from './src/pages.mjs';
import { validate } from '../content/validate.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, '..');
const out = path.join(root, 'docs');
const SAMPLE_ID = 'G-019';

// 1. Question bank: validate, then compact JSON with shared passages stored once.
const qdir = path.join(root, 'content', 'questions');
let items = [];
for (const f of fs.readdirSync(qdir).filter((f) => f.endsWith('.mjs')).sort()) {
  const list = (await import(pathToFileURL(path.join(qdir, f)).href)).default;
  const errs = validate(list, f);
  if (errs.length) { console.error(errs.join('\n')); process.exit(1); }
  items = items.concat(list);
}
const dup = validate(items, 'ALL').filter((e) => /duplicate/.test(e));
if (dup.length) { console.error(dup.join('\n')); process.exit(1); }
const stims = [];
const bank = {
  stims,
  items: items.map((it) => {
    let s = -1;
    if (it.stim) { s = stims.indexOf(it.stim); if (s < 0) { stims.push(it.stim); s = stims.length - 1; } }
    const o = { id: it.id, section: it.section, topic: it.topic, lang: it.lang, stim: s, q: it.q, choices: it.choices, answer: it.answer, why: it.why };
    if (it.src) o.src = it.src;
    if (it.level && it.level !== 'both') o.level = it.level;
    return o;
  }),
};
const counts = { total: items.length };
for (const it of items) counts[it.section] = (counts[it.section] || 0) + 1;
for (const k of ['verbal', 'numerical', 'analytical', 'clerical', 'geninfo']) counts[k] = counts[k] || 0;
const sample = items.find((it) => it.id === SAMPLE_ID) || items.find((it) => it.section === 'geninfo' && !it.stim) || items[0];

// 2. Version hash of everything the browser caches.
const assetsDir = path.join(here, 'assets');
const qjson = JSON.stringify(bank);
const h = crypto.createHash('sha256').update(qjson);
for (const f of fs.readdirSync(assetsDir).sort()) h.update(fs.readFileSync(path.join(assetsDir, f)));
h.update(fs.readFileSync(path.join(here, 'src', 'pages.mjs')));
h.update(fs.readFileSync(path.join(here, 'src', 'config.mjs')));
const V = h.digest('hex').slice(0, 10);

// 3. Pages.
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(path.join(out, 'assets'), { recursive: true });
fs.cpSync(assetsDir, path.join(out, 'assets'), { recursive: true });
fs.writeFileSync(path.join(out, 'assets', 'q.json'), qjson);
const PAGES = [
  ['index.html', '', P.home(sample, counts), '1.0'],
  ['practice/index.html', 'practice/', P.practice(counts), '0.9'],
  ['mock/index.html', 'mock/', P.mock(), '0.9'],
  ['pass/index.html', 'pass/', P.pass(), '0.6'],
  ['about/index.html', 'about/', P.about(counts), '0.5'],
  ['privacy/index.html', 'privacy/', P.privacy(), '0.2'],
  ['terms/index.html', 'terms/', P.terms(), '0.2'],
  ['404.html', null, P.notFound(), null],
];
for (const [file, , html] of PAGES) {
  fs.mkdirSync(path.dirname(path.join(out, file)), { recursive: true });
  fs.writeFileSync(path.join(out, file), html.replaceAll('__V__', V));
}

// 4. PWA: manifest + service worker (pages network-first, assets cache-first, all precached).
fs.writeFileSync(path.join(out, 'manifest.webmanifest'), JSON.stringify({
  name: 'Handa CSE: Civil Service Exam reviewer',
  short_name: 'Handa CSE',
  description: 'Free practice questions and a timed mock for the Philippine Civil Service Exam (CSE-PPT).',
  lang: 'en-PH',
  start_url: SITE.base + '?source=pwa',
  scope: SITE.base,
  display: 'standalone',
  background_color: '#fbf8f1',
  theme_color: '#0d6b4d',
  icons: [
    { src: 'assets/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: 'assets/icon-512.png', sizes: '512x512', type: 'image/png' },
    { src: 'assets/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  ],
}, null, 1));
const B = SITE.base;
const precache = PAGES.filter(([, p]) => p !== null).map(([, p]) => B + p)
  .concat(['assets/style.css', 'assets/app.js', 'assets/mesure.js', 'assets/rights.js', 'assets/q.json', 'assets/icon.svg', 'manifest.webmanifest'].map((a) => B + a));
fs.writeFileSync(path.join(out, 'sw.js'), `/* Handa CSE offline cache ${V} */
const C='handa-${V}',PRE=${JSON.stringify(precache)};
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(PRE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C&&k.startsWith('handa-')).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET'||u.origin!==location.origin||!u.pathname.startsWith('${B}'))return;
if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(u.pathname,cp));return res}).catch(()=>caches.match(u.pathname).then(m=>m||caches.match('${B}'))));return}
e.respondWith(caches.match(r,{ignoreSearch:true}).then(m=>m||fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res})))});
`);

// 5. Search: sitemap (submitted in Search Console), IndexNow key, Pages config.
const today = SITE.updatedIso;
fs.writeFileSync(path.join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.filter(([, p]) => p !== null).map(([, p, , pr]) => `<url><loc>${SITE.origin}${B}${p}</loc><lastmod>${today}</lastmod><priority>${pr}</priority></url>`).join('\n')}
</urlset>
`);
fs.writeFileSync(path.join(out, SITE.indexNowKey + '.txt'), SITE.indexNowKey);
fs.writeFileSync(path.join(out, '.nojekyll'), '');
const extra = path.join(here, 'static');
if (fs.existsSync(extra)) fs.cpSync(extra, out, { recursive: true });
const kb = (f) => (fs.statSync(path.join(out, f)).size / 1024).toFixed(1) + ' KB';
console.log(`built ${PAGES.length} pages, ${items.length} questions, v=${V}; index ${kb('index.html')}, q.json ${kb('assets/q.json')}, app.js ${kb('assets/app.js')}`);
