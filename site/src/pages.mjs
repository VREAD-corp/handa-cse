import { SITE, SOURCES, EXAM, SECTIONS } from './config.mjs';

const B = SITE.base;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const cite = (k) => `<a href="${esc(SOURCES[k].url)}" rel="noopener" target="_blank">${esc(SOURCES[k].label)}</a>`;
const LOGO = `<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="16" cy="16" r="8.5" fill="#0d6b4d"/><path d="M12 16.2l3 3 5.4-6.2" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

// Price test (a = PHP 149, b = PHP 299), run by the shared cro.js (octave-checkout gas/web/cro.js): ?p=a|b forces a
// variant, else a 50/50 draw once per browser tab (sessionStorage oxp_price, gone when the tab closes). cro.js loads
// synchronously before anything reads window.hVariant / window.hPrice. The one-line cleanup removes the old per-browser
// key (localStorage handa.p, before 13 October 2026).
const XP = `<script>window.OCTAVE_XP=[{id:'price',variants:['a','b'],mode:'tab',param:'p'}]</script>
<script src="${B}assets/cro.js?v=__V__" data-site="handa-cse" data-api="${SITE.endpoint}" data-hosts="handa.jalonel.com outils.vread.fr vread-corp.github.io" data-cta="[data-mesure]"></script>
<script>(function(){var v=window.octaveCro&&octaveCro.v('price');if(v!=='a'&&v!=='b')v='a';window.hVariant=v;window.hPrice=v==='b'?${SITE.prices.b}:${SITE.prices.a};try{localStorage.removeItem('handa.p')}catch(e){}})()</script>`;

export function layout({ path, title, desc, body, active = '', app = '', noindex = false }) {
  const url = SITE.origin + B + path;
  const nav = [['', 'Home'], ['practice/', 'Practice'], ['mock/', 'Mock exam'], ['pass/', 'Handa Pass'], ['about/', 'About']]
    .map(([p, l]) => `<a href="${B}${p}"${active === p ? ' aria-current="page"' : ''}>${l}</a>`).join('');
  return `<!doctype html>
<html lang="en-PH" data-v="__V__">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
${noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${url}">`}
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:type" content="website">
<meta property="og:image" content="${SITE.origin}${B}assets/og.png">
<meta name="theme-color" content="#0d6b4d">
<link rel="manifest" href="${B}manifest.webmanifest">
<link rel="icon" href="${B}assets/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${B}assets/icon-192.png">
<link rel="stylesheet" href="${B}assets/style.css?v=__V__">
${XP}
</head>
<body${app ? ` data-page="${app}"` : ''}>
<a class="skip" href="#main">Skip to content</a>
<header class="top"><div class="wrap"><a class="logo" href="${B}">${LOGO}Handa CSE</a><nav class="main" aria-label="Main">${nav}</nav></div></header>
<main id="main"><div class="wrap">
${body}
</div></main>
<footer class="site"><div class="wrap">
<p class="disclaim">Handa CSE is an independent reviewer. It is not affiliated with or endorsed by the Civil Service Commission (CSC). Practice items are original and are not actual CSE questions.</p>
<p class="brand"><a href="https://jalonel.com/en/">A Jalonel brand</a></p>
<p>Published by ${SITE.company.name} (SIREN ${SITE.company.siren}), ${SITE.company.address}. Built and run by Octave, the company's AI agent. Contact: <a href="mailto:${SITE.email}">${SITE.email}</a></p>
<p><a href="${B}privacy/">Privacy notice (R.A. 10173)</a> · <a href="${B}terms/">Terms of use</a> · <a href="${B}about/">Sources and method</a> · Updated ${SITE.updated}</p>
</div></footer>
${app ? `<script src="${B}assets/app.js?v=__V__" defer></script>` : ''}
<script src="${B}assets/mesure.js?v=__V__" defer></script>
<script>if('serviceWorker'in navigator)addEventListener('load',function(){navigator.serviceWorker.register('${B}sw.js').catch(function(){})})</script>
</body>
</html>
`;
}

const factsTable = () => `<table class="facts">
<tr><th scope="row">Next exam</th><td><b>${EXAM.next.label}</b>, Professional and Subprofessional, pen and paper. <span class="cite">${cite('ann05')}</span></td></tr>
<tr><th scope="row">Filing</th><td>From ${EXAM.next.filing}, first come, first served, until the ${EXAM.next.slots} slots are filled. Results target: ${EXAM.next.results}. <span class="cite">${cite('ann05')}</span></td></tr>
<tr><th scope="row">The one after</th><td>${EXAM.after.label}, filing from ${EXAM.after.filing}. <span class="cite">${cite('ann05')}</span></td></tr>
<tr><th scope="row">Number of items</th><td>Professional: ${EXAM.levels.pro.items} (${EXAM.levels.pro.scored} test items + ${EXAM.levels.pro.edq} EDQ, a questionnaire about you). Subprofessional: ${EXAM.levels.sub.items} (${EXAM.levels.sub.scored} + ${EXAM.levels.sub.edq}). <span class="cite">${cite('adv10')}</span></td></tr>
<tr><th scope="row">Time limit</th><td>Professional: ${EXAM.levels.pro.time} (${EXAM.levels.pro.proper}). Subprofessional: ${EXAM.levels.sub.time} (${EXAM.levels.sub.proper}). <span class="cite">${cite('adv10')}</span></td></tr>
<tr><th scope="row">To pass</th><td>A general rating of at least ${EXAM.passing}. <span class="cite">${cite('ann03')}</span></td></tr>
<tr><th scope="row">Last result</th><td>${EXAM.lastResult.passers} of ${EXAM.lastResult.takers} examinees passed the ${EXAM.lastResult.sitting} exam: <b>${EXAM.lastResult.rate}</b>. <span class="cite">${cite('results0826')}</span></td></tr>
<tr><th scope="row">Calculator</th><td>Not allowed in the room, so our numerical items are built to be solved by hand. <span class="cite">${cite('adv10')}</span></td></tr>
</table>`;

const scopeList = (lvl) => {
  const sub = {
    verbal: 'word meaning, sentence completion, error recognition, sentence structure, paragraph organization, reading comprehension (English and Filipino)',
    analytical: 'word analogy, symbolic logic and abstract reasoning, assumptions and conclusions, data interpretation',
    clerical: 'filing, spelling',
    numerical: 'basic operations, number sequence, word problems',
    geninfo: 'Philippine Constitution, R.A. 6713, peace and human rights, environment management and protection',
  };
  return `<ul>${Object.entries(SECTIONS).filter(([, s]) => s.levels.includes(lvl)).map(([k, s]) => `<li><b>${s.name}:</b> ${sub[k]}</li>`).join('')}</ul>`;
};

export function home(sample, counts) {
  const total = counts.total;
  return layout({
    path: '', active: '', app: 'home',
    title: 'Handa CSE: free Civil Service Exam reviewer (2027)',
    desc: `Free CSE-PPT reviewer for the ${EXAM.next.label} exam: ${total} original practice questions with explanations and a timed mock at the official length. Professional and Subprofessional.`,
    body: `
<section class="hero" id="hero">
<div>
<span class="kicker">Next exam: ${EXAM.next.label} · filing opens ${EXAM.next.filing}</span>
<h1>Free reviewer for the Civil Service Exam, Professional and Subprofessional</h1>
<p class="lead">${total} practice questions written for the official CSE-PPT scope, each with an explanation. A timed mock at the official length: ${EXAM.levels.pro.scored} items in ${EXAM.levels.pro.time} for Professional, ${EXAM.levels.sub.scored} items in ${EXAM.levels.sub.time} for Subprofessional.</p>
<p>Libre, walang sign-up. Your progress stays on this phone. After the first visit it works offline, and you can add it to your home screen.</p>
<div class="row"><a class="btn" href="${B}practice/" data-mesure="cta_click">Simulan ang practice</a><a class="btn ghost" href="${B}mock/" data-mesure="cta_click">Take the timed mock</a></div>
<div id="progress-home" class="hidden" style="margin-top:18px"></div>
</div>
<div class="card" id="sample" data-id="${esc(sample.id)}">
<div class="qmeta"><span>Sample question</span><span>${esc(SECTIONS[sample.section].name)}</span></div>
${sample.stim ? `<div class="stim">${esc(sample.stim)}</div>` : ''}
<p class="qtext">${esc(sample.q)}</p>
<ul class="choices">${sample.choices.map((c, i) => `<li><button type="button" class="choice" data-i="${i}"><span class="bubble">${'ABCD'[i]}</span><span>${esc(c)}</span></button></li>`).join('')}</ul>
<div class="why hidden" data-answer="${sample.answer}"><p>${esc(sample.why)}</p>${sample.src ? `<p class="src">Source: <a href="${esc(sample.src.url)}" rel="noopener" target="_blank">${esc(sample.src.label)}</a></p>` : ''}</div>
<noscript><p class="muted">Answer: ${'ABCD'[sample.answer]}. ${esc(sample.why)}</p></noscript>
</div>
</section>

<h2 data-section="facts">The 2027 exam in numbers</h2>
<p>All figures below come from CSC issuances we read on ${SITE.updated}. Each line links to its source, so you can check it yourself.</p>
${factsTable()}
<p class="note">If your 9 August 2026 exam in NCR, or in some testing centers of Region IV and CAR, was suspended because of the Habagat rains, the CSC reset it to 22 November 2026. <span class="cite">${cite('adv16')}</span></p>

<h2 data-section="levels">What each level covers</h2>
<div class="levels">
<div class="card"><h3>Professional</h3><p class="muted">${EXAM.levels.pro.scored} test items · ${EXAM.levels.pro.time}</p>${scopeList('pro')}<a class="btn small" href="${B}practice/?level=pro">Practice Professional</a></div>
<div class="card"><h3>Subprofessional</h3><p class="muted">${EXAM.levels.sub.scored} test items · ${EXAM.levels.sub.time}</p>${scopeList('sub')}<a class="btn small" href="${B}practice/?level=sub">Practice Subprofessional</a></div>
</div>
<p class="cite">Scope as published in ${cite('adv10')}. Verbal items are in English and Filipino; the other parts are in English.</p>

<h2 data-section="reviewer">What is in the free reviewer</h2>
<div class="two">
<div>
<p>The bank has ${counts.verbal} verbal, ${counts.numerical} numerical, ${counts.analytical} analytical, ${counts.clerical} clerical and ${counts.geninfo} general-information items. Every general-information answer cites the article of the 1987 Constitution or the section of the law it comes from, with a link to the full text.</p>
<p>Practice mode shows the explanation right after you answer. "Balikan ang mga mali" brings back only the items you missed. The mock exam hides the answers until you submit, runs on the official clock, and gives you a score per part.</p>
<p>What it does not do: it has no actual CSE questions (nobody outside the CSC has them, and pages that sell "leaked" items are scams), and a good mock score is not a guarantee. The CSC computes a general rating and does not publish how raw scores convert, so treat our percentage as practice feedback.</p>
</div>
<div class="card" data-section="offer">
<h3 style="margin-top:0">Handa Pass, pre-order</h3>
<p>Full mock exams, 1,500 questions and a score predictor. <b><span class="js-price">₱${SITE.prices.a}</span> one time</b>, until your 2027 exam.</p>
<p class="muted">Access by 15 January 2027, or your money back automatically. Card now; GCash and Maya list for later.</p>
<a class="btn small" href="${B}pass/" data-mesure="pass_open">See Handa Pass</a>
</div>
</div>

<h2 data-section="about">Who makes this</h2>
<p>Handa CSE is made by ${SITE.company.name}, a small software company in Paris, France. Octave, the company's AI agent, wrote the questions from the scope the CSC published for the August 2026 exam, and checked each general-information item against the text of the law on lawphil.net. No item is copied from the CSC or from another reviewer. If you find a mistake, tap "I-report" under the question, or write to <a href="mailto:${SITE.email}">${SITE.email}</a>. We fix it and note the change on the <a href="${B}about/">sources page</a>.</p>
`,
  });
}

export function practice(counts) {
  return layout({
    path: 'practice/', active: 'practice/', app: 'practice',
    title: 'CSE practice questions with explanations | Handa CSE',
    desc: `Free CSE practice by part: verbal, numerical, analytical, clerical and general information. ${counts.total} original items with explanations and sources.`,
    body: `
<div class="narrow" style="margin:0 auto">
<h1>Practice</h1>
<p>Pick your level and a part. You see the explanation right after each answer, and your results stay on this device.</p>
<form id="setup" class="setup">
<fieldset><legend>Level</legend><div class="opts">
<label class="opt"><input type="radio" name="level" value="pro" checked> Professional</label>
<label class="opt"><input type="radio" name="level" value="sub"> Subprofessional</label>
</div></fieldset>
<fieldset><legend>Part</legend><div class="opts" id="parts">
<label class="opt"><input type="radio" name="part" value="all" checked> Lahat (all parts)</label>
${Object.entries(SECTIONS).map(([k, s]) => `<label class="opt" data-levels="${s.levels.join(' ')}"><input type="radio" name="part" value="${k}"> ${s.name}</label>`).join('')}
</div></fieldset>
<fieldset><legend>Ilan? (how many)</legend><div class="opts">
<label class="opt"><input type="radio" name="n" value="10" checked> 10</label>
<label class="opt"><input type="radio" name="n" value="20"> 20</label>
<label class="opt"><input type="radio" name="n" value="40"> 40</label>
</div></fieldset>
<fieldset><legend>Which items</legend><div class="opts">
<label class="opt"><input type="radio" name="mode" value="new" checked> Bago muna (unseen first)</label>
<label class="opt"><input type="radio" name="mode" value="wrong"> Balikan ang mga mali</label>
</div></fieldset>
<button class="btn" type="submit">Simulan</button> <span id="setup-msg" class="muted"></span>
</form>
<div id="drill" class="hidden"></div>
<section id="progress" class="hidden"><h2>Ang iyong progress</h2><div id="progress-body"></div></section>
<noscript><p class="msg err">Practice needs JavaScript. The questions load once, then work offline.</p></noscript>
</div>`,
  });
}

export function mock() {
  const p = EXAM.levels.pro, s = EXAM.levels.sub;
  return layout({
    path: 'mock/', active: 'mock/', app: 'mock',
    title: 'Timed CSE mock exam, official length | Handa CSE',
    desc: `Free timed CSE-PPT mock: ${p.scored} items in ${p.time} (Professional) or ${s.scored} items in ${s.time} (Subprofessional), scored by part.`,
    body: `
<div id="mock-intro" class="narrow" style="margin:0 auto">
<h1>Timed mock exam</h1>
<p>Same length and clock as the real pen-and-paper test. Answers stay hidden until you submit, then you get a score per part and every explanation.</p>
<table class="facts">
<tr><th scope="row">Professional</th><td>${p.scored} items, ${p.time}. The real booklet has ${p.items} items: ${p.scored} test items plus ${p.edq} EDQ questions about yourself, which are not scored. We keep the full ${p.time}.</td></tr>
<tr><th scope="row">Subprofessional</th><td>${s.scored} items, ${s.time} (real booklet: ${s.items} items including ${s.edq} EDQ).</td></tr>
<tr><th scope="row">Parts</th><td>In booklet order: verbal, analytical (Professional) or clerical (Subprofessional), numerical, general information. The CSC does not publish how many items each part has, so our split follows the size of each part in our bank.</td></tr>
<tr><th scope="row">Rules we copy</th><td>No calculator, no phone. Use scratch paper. <span class="cite">${cite('adv10')}</span></td></tr>
</table>
<p id="resume" class="note hidden"></p>
<div class="row" style="margin-top:16px">
<button class="btn" type="button" data-start="pro">Start Professional mock (${p.scored} items, 3:10)</button>
<button class="btn ghost" type="button" data-start="sub">Start Subprofessional mock (${s.scored} items, 2:40)</button>
</div>
<p class="muted" style="margin-top:12px">The timer keeps running if you close the tab, like the real exam. Your answers are saved on this device as you go.</p>
<section id="history" class="hidden"><h2>Past mocks on this device</h2><div id="history-body"></div></section>
<noscript><p class="msg err">The mock exam needs JavaScript.</p></noscript>
</div>
<div id="exam" class="hidden"></div>`,
  });
}

export function pass() {
  return layout({
    path: 'pass/', active: 'pass/', app: 'pass',
    title: 'Handa Pass: full CSE mock exams and 1,500 questions | Handa CSE',
    desc: 'Handa Pass pre-order: full CSE mock exams, 1,500 questions and a score predictor for the 2027 exam. Card pre-order with access by 15 January 2027, or join the GCash/Maya list.',
    body: `
<div class="two">
<div data-section="hero">
<span class="kicker">Pre-order · access by 15 January 2027</span>
<h1>Handa Pass: full mock exams, 1,500 questions and a score predictor</h1>
<p class="price"><span class="js-price">₱${SITE.prices.a}</span> <small class="muted" style="font-size:1rem;font-weight:400">one time, until your 2027 exam</small></p>
<p>The free reviewer has one question bank and one mock. Handa Pass is what we plan to add on top:</p>
<ul class="plain">
<li><b>Full mock exams:</b> separate forms at the official length (${EXAM.levels.pro.scored} or ${EXAM.levels.sub.scored} items), with different items in each, so a retake measures you and not your memory.</li>
<li><b>1,500 questions</b> across every part of the official scope, with explanations and, for general information, the article or section they come from.</li>
<li><b>Score predictor:</b> an estimate from your mock results, per part, with the range of uncertainty shown. It is our model, not the CSC's rating method, which is not public.</li>
<li>A weak-area plan that sends you back to the subtopics you miss most.</li>
</ul>
<p>Payment is one time. No subscription, no auto-renewal.</p>
<p class="note">Handa Pass is being built. If you pre-order, we e-mail your access on or before <b>15 January 2027</b>, two months before the ${EXAM.next.label} exam. If we miss that date, we refund the full amount to your card without you having to ask, and you can get a full refund any time before delivery by replying to the receipt e-mail.</p>
</div>
<div>
<div class="card" id="buy-card" data-section="pricing">
<h2 style="margin-top:0">Pre-order by card</h2>
<p><b><span class="js-price">₱${SITE.prices.a}</span></b>, charged in pesos by ${SITE.company.name}. Visa, Mastercard and other cards. You get a receipt by e-mail.</p>
<p><button class="btn" type="button" id="buy-open" data-mesure="checkout_open">Pre-order for <span class="js-price">₱${SITE.prices.a}</span></button></p>
<div id="buy"></div>
<p class="muted" style="font-size:.88rem;margin-bottom:0">Buyers in the EU cannot order.</p>
</div>
<div class="card" id="signup-card" data-section="waitlist" style="margin-top:16px">
<h2 style="margin-top:0">No card? Join the GCash and Maya list</h2>
<p class="muted">We cannot take GCash or Maya yet. Tell us how you would pay and we e-mail you once when it works. Free, no commitment.</p>
<form id="signup" novalidate>
<label class="field" for="email">E-mail</label>
<input id="email" name="email" type="email" autocomplete="email" required placeholder="juan@example.com">
<fieldset style="margin-top:12px"><legend>Paano ka magbabayad? (How would you pay?)</legend><div class="opts">
<label class="opt"><input type="radio" name="pay" value="gcash" required> GCash</label>
<label class="opt"><input type="radio" name="pay" value="maya"> Maya</label>
<label class="opt"><input type="radio" name="pay" value="card"> Card, later</label>
<label class="opt"><input type="radio" name="pay" value="other"> Iba pa (other)</label>
</div>
<div id="pay-other-wrap" class="hidden" style="margin-top:8px"><label class="field" for="pay_other">Which one?</label><input id="pay_other" name="pay_other" type="text" maxlength="60" placeholder="e.g. 7-Eleven CLiQQ, ShopeePay, bank transfer"></div>
</fieldset>
<fieldset><legend>Level</legend><div class="opts">
<label class="opt"><input type="radio" name="level" value="pro"> Professional</label>
<label class="opt"><input type="radio" name="level" value="sub"> Subprofessional</label>
<label class="opt"><input type="radio" name="level" value="unsure"> Hindi pa sigurado</label>
</div></fieldset>
<fieldset><legend>When is your exam?</legend><div class="opts">
<label class="opt"><input type="radio" name="sitting" value="2027-03"> 14 March 2027</label>
<label class="opt"><input type="radio" name="sitting" value="2027-08"> 8 August 2027</label>
<label class="opt"><input type="radio" name="sitting" value="later"> Later</label>
</div></fieldset>
<div class="hp" aria-hidden="true"><label>Website <input name="website" tabindex="-1" autocomplete="off"></label></div>
<label class="check"><input type="checkbox" name="consent" required> <span>I agree that ${SITE.company.name} keeps my e-mail and these answers to tell me when Handa Pass opens, as explained in the <a href="${B}privacy/">privacy notice</a>. I can withdraw at any time.</span></label>
<p style="margin-top:14px"><button class="btn" type="submit" data-mesure="signup_submit">Join the list (free)</button></p>
<div id="signup-msg" role="status" aria-live="polite"></div>
</form>
</div>
</div>
</div>
<h2 data-section="faq">Questions</h2>
<h3>Why a pre-order?</h3>
<p>We build the 1,500 questions and the extra mock forms only if enough people want them, and we would rather say so than pretend they exist. Paying now reserves the launch price; the refund promise above is written on your receipt.</p>
<h3>Why only cards?</h3>
<p>READ FRANCE SAS is a French company and can only take cards for now. Most reviewers in the Philippines pay with GCash or Maya, so your answer to "Paano ka magbabayad?" decides what we set up next.</p>
<h3>Is the free reviewer going away?</h3>
<p>No. Practice and the mock exam stay free, with no sign-up.</p>
<h3>Is this from the CSC?</h3>
<p>No. Handa CSE is independent and has no access to actual exam items. See the <a href="${B}about/">sources and method</a>.</p>`,
  });
}

export function about(counts) {
  return layout({
    path: 'about/', active: 'about/',
    title: 'Sources and method | Handa CSE',
    desc: 'How the Handa CSE questions are written, which CSC issuances we follow, and how we correct mistakes.',
    body: `
<div class="narrow">
<h1>Sources and method</h1>
<p>Handa CSE follows the scope the Civil Service Commission published for the 9 August 2026 CSE-PPT. When the CSC publishes the announcement for the ${EXAM.next.label} exam (it says it will, three weeks before filing opens on ${EXAM.next.filing}), we compare it line by line and update this page.</p>
<h2>CSC issuances we used</h2>
<ul class="plain">
${['adv10', 'ann03', 'ann05', 'results0826', 'adv16'].map((k) => `<li>${cite(k)}</li>`).join('')}
</ul>
<p>We read them on ${SITE.updated}. The official list of passers is only the one on csc.gov.ph; the CSC says so in its announcements.</p>
<h2>How the ${counts.total} questions were made</h2>
<p>Octave, the AI agent of ${SITE.company.name}, wrote every item from scratch for one of the official subtopics. Reading passages, tables and names are invented. We did not use CSC test items, "leaked" questions, reviewer books, other apps or Facebook groups, and we never will.</p>
<p>General-information items were written from the primary text: the 1987 Constitution, R.A. 6713 and the environmental and human-rights laws named in each explanation, as published on lawphil.net. Each one cites the article or section. Numerical and analytical answers were recomputed by a script. A human Filipino reviewer has not checked the bank yet, so if something looks wrong, it may be wrong: report it.</p>
<h2>Corrections</h2>
<p>Tap "I-report" under any question, or write to <a href="mailto:${SITE.email}">${SITE.email}</a> with the question number (for example V-012). We fix confirmed errors and list them here.</p>
<p class="muted">No corrections yet (site opened ${SITE.updated}).</p>
<h2>Who we are</h2>
<p>${SITE.company.name}, ${SITE.company.address}, SIREN ${SITE.company.siren} (${SITE.company.rcs}). Publication director: ${SITE.company.president}. Jalonel is a brand of ${SITE.company.name}. Octave, an AI agent, builds and runs this site for the company and answers e-mail as an AI; a person at the company takes over when needed. We are not affiliated with the Civil Service Commission.</p>
</div>`,
  });
}

export function privacy() {
  return layout({
    path: 'privacy/', active: '',
    title: 'Privacy notice | Handa CSE',
    desc: 'What Handa CSE collects, why, for how long, and your rights under the Data Privacy Act of 2012 (R.A. 10173).',
    body: `
<div class="narrow">
<h1>Privacy notice</h1>
<p>Last updated ${SITE.updated}.</p>
<h2>Who is responsible</h2>
<p>${SITE.company.name}, ${SITE.company.address} (SIREN ${SITE.company.siren}) runs Handa CSE and is the personal information controller for the early-access list, under the Philippine ${cite('dpa')} and, as a French company, under the EU GDPR. Contact for any privacy question or request: <a href="mailto:${SITE.email}">${SITE.email}</a>. We reply within 15 days. Jalonel is a brand of ${SITE.company.name}.</p>
<h2>Practice and mock results stay on your device</h2>
<p>Your answers, scores and mock history are saved in your browser's local storage on this device. They are never sent to us. Clearing your browser data deletes them.</p>
<h2>Anonymous visit and usage counts</h2>
<p>We measure how the site is used, in aggregate, without cookies and without any identifier, only to improve this site. Each page sends the page path, the event (for example "mock submitted"), the domain of the site that sent you, the campaign tags in the link (utm_source, utm_medium, utm_campaign), the price variant you saw (a or b) and whether your screen is narrower than 768 pixels.</p>
<p>Once per page, the site also sends anonymous behaviour counts: how far down the page you scrolled (25, 50, 75 or 100%), which sections you reached, how long it took before your first click on a main button (in broad ranges), which forms were started or sent and, when a form is left unfinished, the <em>name</em> of the last field used (for example "email"), never what you typed. It also counts the questions or panels you open, the domain of links to other sites you follow, technical errors (as an anonymous fingerprint of the error message), how fast the page loaded and responded (Core Web Vitals) and repeated clicks on one spot.</p>
<p>All of this is added into daily totals per page; we keep no row per visit. We do not send or keep your IP address, browser details, any ID or anything you type, we do not follow you across other sites, and we do not combine these counts with the early-access list, sell them or share them. If your browser sends "Do Not Track" or "Global Privacy Control", nothing is sent. Search-engine robots and automated browsers (recognised inside your browser; their signature is not sent) are counted separately or not at all, and a page your browser preloads counts only if you open it.</p>
<h2>Price test (A/B)</h2>
<p>To choose the Handa Pass price, some visitors see ₱${SITE.prices.a} (version a) and others ₱${SITE.prices.b} (version b). The version is drawn at random when you open the site (or set by the link you followed) and kept only for this browser tab, in its session storage, which your browser deletes when you close the tab. It is never linked to you; only the totals per version (pages seen, button clicks, sign-ups, pre-orders) are counted. The price you pay is always the price displayed on the page and on the payment form.</p>
<h2>Early-access list for Handa Pass</h2>
<ul class="plain">
<li><b>What we collect:</b> your e-mail address, the payment method you would use, your level and your exam date, the price you were shown, and the page and campaign you came from.</li>
<li><b>Why:</b> to e-mail you when Handa Pass opens (or to tell you it will not), and to decide which payment methods to set up. Legal basis: your consent (R.A. 10173, Sec. 12(a)).</li>
<li><b>Where:</b> a Google Sheet in ${SITE.company.name}'s Google account, written by a Google Apps Script. Google LLC stores it, possibly outside the Philippines.</li>
<li><b>How long:</b> until Handa Pass opens and we have e-mailed you, and at the latest until 31 October 2027 (after the August 2027 exam). Then we delete it.</li>
<li><b>Who sees it:</b> ${SITE.company.name} only. We do not sell or share it, and we do not use it for advertising.</li>
</ul>
<h2>Card pre-orders</h2>
<p>If you pre-order Handa Pass, the checkout asks for your e-mail, name and country (and a company name and tax ID if you buy for a company). Stripe Payments Europe processes the card payment; we never see the card number. We keep the order, your e-mail and the receipt in ${SITE.company.name}'s Google account for as long as French accounting law requires (10 years for receipts), and use your e-mail only to deliver Handa Pass, send the receipt and handle refunds. Legal basis: the contract (R.A. 10173, Sec. 12(b)).</p>
<h2>Your rights</h2>
<p>Under R.A. 10173 you can be informed, access your data, object, have it corrected, have it erased or blocked, get a copy, and claim damages. Use the form below or write to <a href="mailto:${SITE.email}">${SITE.email}</a>. Withdrawal and erasure take effect at once. You can also complain to the ${cite('npc')}.</p>
<form id="rights" class="card" novalidate data-app="rights">
<label class="field" for="r-email">E-mail you signed up with</label>
<input id="r-email" name="email" type="email" required autocomplete="email">
<fieldset style="margin-top:12px"><legend>Request</legend><div class="opts">
<label class="opt"><input type="radio" name="type" value="erase" checked> Delete my data</label>
<label class="opt"><input type="radio" name="type" value="withdraw"> Withdraw consent</label>
<label class="opt"><input type="radio" name="type" value="access"> Send me a copy</label>
<label class="opt"><input type="radio" name="type" value="correct"> Correct my data</label>
</div></fieldset>
<label class="field" for="r-msg">Details (optional)</label>
<textarea id="r-msg" name="message" rows="3" maxlength="1000"></textarea>
<div class="hp" aria-hidden="true"><label>Website <input name="website" tabindex="-1" autocomplete="off"></label></div>
<p style="margin-top:12px"><button class="btn" type="submit">Send request</button></p>
<div id="rights-msg" role="status" aria-live="polite"></div>
</form>
<h2>Hosting</h2>
<p>The site is hosted by GitHub, Inc. (GitHub Pages), 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA. Like any web host, GitHub may process technical connection data such as IP addresses to run and secure the service, under its own privacy statement.</p>
</div>
<script src="${B}assets/rights.js?v=__V__" defer></script>`,
  });
}

export function terms() {
  return layout({
    path: 'terms/', active: '',
    title: 'Terms of use | Handa CSE',
    desc: 'Terms of use of the Handa CSE free reviewer.',
    body: `
<div class="narrow">
<h1>Terms of use</h1>
<p>Last updated ${SITE.updated}.</p>
<p>Handa CSE is a free practice tool published by ${SITE.company.name}, ${SITE.company.address} (SIREN ${SITE.company.siren}, ${SITE.company.rcs}). Publication director: ${SITE.company.president}. Jalonel is a brand of ${SITE.company.name}. Contact: <a href="mailto:${SITE.email}">${SITE.email}</a>.</p>
<h2>Not affiliated with the CSC</h2>
<p>Handa CSE is not affiliated with or endorsed by the Civil Service Commission. It does not contain actual examination items. For official information, rely on csc.gov.ph only. Exam dates and rules on this site are copied from CSC issuances with a link; if they differ, the CSC issuance prevails.</p>
<h2>No guarantee</h2>
<p>The practice items are original and are written to follow the published scope. They may contain mistakes, and a score on this site does not predict your CSC rating. Use of the site is free and at your own risk, to the extent the law allows.</p>
<h2>Content</h2>
<p>The questions, explanations and code are © ${SITE.company.name} 2026. You may use them for your own study and share links to them. Do not copy the question bank to another site, app or paid product. Legal texts quoted in explanations are public documents.</p>
<h2>Handa Pass</h2>
<p>Handa Pass is sold as a pre-order: it is still being built. The price is shown before payment and is charged once, in Philippine pesos. ${SITE.company.name} delivers access by e-mail on or before 15 January 2027; if it does not, it refunds the full amount automatically. Before delivery you can cancel and get a full refund by replying to the receipt e-mail. Joining the GCash and Maya list is free and does not commit you to buy.</p>
<h2>Law</h2>
<p>These terms are governed by French law, without prejudice to the mandatory consumer protections of the Philippines where you live.</p>
</div>`,
  });
}

export function notFound() {
  return layout({
    path: '404.html', noindex: true,
    title: 'Page not found | Handa CSE',
    desc: 'Page not found.',
    body: `<div class="narrow"><h1>Page not found</h1><p>This page does not exist. Go to the <a href="${B}">home page</a>, <a href="${B}practice/">practice</a> or the <a href="${B}mock/">mock exam</a>.</p></div>`,
  });
}
