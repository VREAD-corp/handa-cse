/*! Handa CSE anonymous audience: no cookie, no identifier, no IP stored. Same pattern as octave-checkout gas/web/mesure.js */
((n,l,d)=>{let q=new URLSearchParams(l.search),A=(k,f)=>d.addEventListener(k,f,!0),b,t,x='',s,go;
window.hTrack=()=>{};
if(n.doNotTrack=='1'||n.globalPrivacyControl||!/^(outils\.vread\.fr|vread-corp\.github\.io)$/.test(l.hostname))return;
// Not a visit (counted apart as "excluded"): our tests (?octave_notrack=1, kept in this browser, =0 clears), automated browsers, crawlers. The user agent is read here only, never sent.
try{s=localStorage;q.has('octave_notrack')&&(q.get('octave_notrack')=='1'?s.setItem('octave_notrack','1'):s.removeItem('octave_notrack'));s.getItem('octave_notrack')=='1'&&(x='notrack')}catch{}
x=x||(q.get('octave_notrack')=='1'?'notrack':n.webdriver?'webdriver':/bot\b|crawl|spider|slurp|headless|lighthouse|pagespeed|inspectiontool|googleother|mediapartners|bingpreview|phantom|puppeteer|playwright|selenium/i.test(n.userAgent||'')?'bot':'');
b={site:'handa-cse',page:l.pathname,ref_domain:d.referrer.split('/')[2],device:innerWidth<768?'mobile':'desktop',variant:window.hVariant||''};
for(let g of['source','medium','campaign'])b['utm_'+g]=q.get('utm_'+g);
if(x)b.excluded=x;
t=v=>{b.event=v;b.ts=Date.now();try{fetch('https://script.google.com/macros/s/AKfycby4di9DZaiESNkujLeJtDkmL6JPXDNV9aQoXAEhDmCCtrKG205rHYL_yoKfT4cqHtmi6g/exec?action=track',{method:'POST',keepalive:!0,credentials:'omit',redirect:'manual',body:JSON.stringify(b)}).catch(e=>0)}catch{}};
window.hTrack=t;
// A prerendered or prefetched page counts only once the visitor actually opens it.
go=()=>t('view');
if(d.prerendering)d.addEventListener('prerenderingchange',go,{once:!0});
else if(d.visibilityState=='prerender'){let v=()=>{if(d.visibilityState!='prerender'){d.removeEventListener('visibilitychange',v);go()}};d.addEventListener('visibilitychange',v)}
else go();
A('click',e=>{let a=e.target.closest?.('a,button'),h=a?.dataset.mesure;h&&t(h)});
addEventListener('appinstalled',()=>t('install'))})(navigator,location,document)
