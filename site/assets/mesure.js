/*! Handa CSE anonymous audience: no cookie, no identifier, no IP stored. Same pattern as octave-checkout gas/web/mesure.js */
((n,l,d)=>{let q=new URLSearchParams(l.search),A=(k,f)=>d.addEventListener(k,f,!0),b,t;
window.hTrack=()=>{};
if(n.doNotTrack=='1'||n.globalPrivacyControl||!/^(outils\.vread\.fr|vread-corp\.github\.io)$/.test(l.hostname))return;
b={site:'handa-cse',page:l.pathname,ref_domain:d.referrer.split('/')[2],device:innerWidth<768?'mobile':'desktop',variant:window.hVariant||''};
for(let g of['source','medium','campaign'])b['utm_'+g]=q.get('utm_'+g);
t=v=>{b.event=v;b.ts=Date.now();try{fetch('https://script.google.com/macros/s/AKfycby4di9DZaiESNkujLeJtDkmL6JPXDNV9aQoXAEhDmCCtrKG205rHYL_yoKfT4cqHtmi6g/exec?action=track',{method:'POST',keepalive:!0,credentials:'omit',redirect:'manual',body:JSON.stringify(b)}).catch(e=>0)}catch{}};
window.hTrack=t;t('view');
A('click',e=>{let a=e.target.closest?.('a,button'),h=a?.dataset.mesure;h&&t(h)});
addEventListener('appinstalled',()=>t('install'))})(navigator,location,document)
