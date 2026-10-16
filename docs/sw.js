/* Handa CSE offline cache 7e5c95035b */
const C='handa-7e5c95035b',PRE=["/","/practice/","/mock/","/pass/","/about/","/privacy/","/terms/","/assets/style.css","/assets/app.js","/assets/cro.js","/assets/mesure.js","/assets/rights.js","/assets/q.json","/assets/icon.svg","/manifest.webmanifest"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(PRE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C&&k.startsWith('handa-')).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET'||u.origin!==location.origin||!u.pathname.startsWith('/'))return;
if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(u.pathname,cp));return res}).catch(()=>caches.match(u.pathname).then(m=>m||caches.match('/'))));return}
e.respondWith(caches.match(r,{ignoreSearch:true}).then(m=>m||fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res})))});
