/* Handa CSE offline cache 42adb6728f */
const C='handa-42adb6728f',PRE=["/handa-cse/","/handa-cse/practice/","/handa-cse/mock/","/handa-cse/pass/","/handa-cse/about/","/handa-cse/privacy/","/handa-cse/terms/","/handa-cse/assets/style.css","/handa-cse/assets/app.js","/handa-cse/assets/mesure.js","/handa-cse/assets/rights.js","/handa-cse/assets/q.json","/handa-cse/assets/icon.svg","/handa-cse/manifest.webmanifest"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(PRE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C&&k.startsWith('handa-')).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET'||u.origin!==location.origin||!u.pathname.startsWith('/handa-cse/'))return;
if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(u.pathname,cp));return res}).catch(()=>caches.match(u.pathname).then(m=>m||caches.match('/handa-cse/'))));return}
e.respondWith(caches.match(r,{ignoreSearch:true}).then(m=>m||fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res})))});
