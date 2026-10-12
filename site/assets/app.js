/* Handa CSE client: practice, timed mock, early-access form. Progress stays in localStorage. */
(function () {
  'use strict';
  var B = '/handa-cse/';
  var ENDPOINT = 'https://script.google.com/macros/s/AKfycby4di9DZaiESNkujLeJtDkmL6JPXDNV9aQoXAEhDmCCtrKG205rHYL_yoKfT4cqHtmi6g/exec';
  var CONSENT = 'ea-2026-10-13';
  var MAIL = 'octave@vread.fr';
  var V = document.documentElement.getAttribute('data-v') || '';
  var SECTIONS = {
    verbal: { name: 'Verbal ability', levels: ['pro', 'sub'] },
    analytical: { name: 'Analytical ability', levels: ['pro'] },
    clerical: { name: 'Clerical ability', levels: ['sub'] },
    numerical: { name: 'Numerical ability', levels: ['pro', 'sub'] },
    geninfo: { name: 'General information', levels: ['pro', 'sub'] },
  };
  var ORDER = ['verbal', 'analytical', 'clerical', 'numerical', 'geninfo'];
  var LEVELS = { pro: { name: 'Professional', n: 150, min: 190 }, sub: { name: 'Subprofessional', n: 145, min: 160 } };

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var track = function (e) { try { window.hTrack && window.hTrack(e); } catch (x) { /* ignore */ } };
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function pct(c, n) { return n ? Math.round((100 * c) / n) : 0; }

  /* ---------- storage (never required: the site works without it) ---------- */
  function load(k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* private mode */ } }
  function del(k) { try { localStorage.removeItem(k); } catch (e) { /* ignore */ } }
  var P = load('handa.v1', null) || { s: {}, mocks: [] };
  if (!P.s) P.s = {};
  if (!P.mocks) P.mocks = [];
  function record(id, ok) {
    var r = P.s[id] || [0, 0, 0];
    r[0]++; if (ok) r[1]++; r[2] = ok ? 1 : 0;
    P.s[id] = r;
  }
  function persist() { save('handa.v1', P); }

  /* ---------- question bank ---------- */
  var bankP = null;
  function bank() {
    if (!bankP) {
      bankP = fetch(B + 'assets/q.json?v=' + V).then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); }).then(function (d) {
        d.items.forEach(function (it) { it.stimText = it.stim >= 0 ? d.stims[it.stim] : ''; });
        d.byId = {}; d.items.forEach(function (it) { d.byId[it.id] = it; });
        return d;
      });
    }
    return bankP;
  }
  function inLevel(it, level) { return SECTIONS[it.section].levels.indexOf(level) >= 0 && (!it.level || it.level === 'both' || it.level === level); }

  /* ---------- prices (variant a/b) ---------- */
  $$('.js-price').forEach(function (el) { el.textContent = '₱' + (window.hPrice || 149); });

  /* ---------- question rendering ---------- */
  function qHtml(it, n, total) {
    var isTable = it.stimText && /\|/.test(it.stimText);
    return '<div class="qmeta"><span>' + (n ? 'Tanong ' + n + ' / ' + total : esc(it.id)) + '</span><span>' + esc(SECTIONS[it.section].name) + '</span>' + (it.lang === 'fil' ? '<span>Filipino</span>' : '') + '<span>' + esc(it.id) + '</span></div>' +
      (it.stimText ? '<div class="stim' + (isTable ? ' table' : '') + '" tabindex="0">' + esc(it.stimText) + '</div>' : '') +
      '<p class="qtext">' + esc(it.q) + '</p><ul class="choices">' +
      it.choices.map(function (c, i) { return '<li><button type="button" class="choice" data-i="' + i + '" aria-pressed="false"><span class="bubble">' + 'ABCD'[i] + '</span><span>' + esc(c) + '</span></button></li>'; }).join('') + '</ul>';
  }
  function whyHtml(it, picked) {
    var ok = picked === it.answer;
    return '<div class="why"><p>' + (picked === null || picked === undefined ? '<b class="no">Walang sagot.</b> ' : ok ? '<b class="ok">Tama!</b> ' : '<b class="no">Mali.</b> Tamang sagot: ' + 'ABCD'[it.answer] + '. ') + '<b>Paliwanag:</b> ' + esc(it.why) + '</p>' +
      (it.src ? '<p class="src">Source: <a href="' + esc(it.src.url) + '" rel="noopener" target="_blank">' + esc(it.src.label) + '</a></p>' : '') + '</div>';
  }
  function reportLink(it) {
    return '<a class="linkbtn" data-mesure="report_q" href="mailto:' + MAIL + '?subject=' + encodeURIComponent('Handa CSE: problem with ' + it.id) + '&body=' + encodeURIComponent('Question ' + it.id + '\nWhat looks wrong:\n') + '">I-report ang tanong</a>';
  }
  function reveal(box, it, picked) {
    $$('.choice', box).forEach(function (b) {
      var i = +b.getAttribute('data-i');
      b.disabled = true;
      if (i === it.answer) b.classList.add('right');
      else if (i === picked) b.classList.add('wrong');
    });
  }

  /* ---------- home: sample question + progress ---------- */
  function initHome() {
    var card = $('#sample');
    if (card) {
      var why = $('.why', card);
      var ans = +why.getAttribute('data-answer');
      $$('.choice', card).forEach(function (b) {
        b.addEventListener('click', function () {
          var i = +b.getAttribute('data-i');
          reveal(card, { answer: ans }, i);
          why.insertAdjacentHTML('afterbegin', '<p><b class="' + (i === ans ? 'ok">Tama!' : 'no">Mali.') + '</b> ' + (i === ans ? '' : 'Tamang sagot: ' + 'ABCD'[ans] + '.') + '</p>');
          why.classList.remove('hidden');
          track('drill_start');
        });
      });
    }
    var box = $('#progress-home');
    var seen = Object.keys(P.s).length;
    if (box && (seen || P.mocks.length)) {
      var c = 0, n = 0;
      Object.keys(P.s).forEach(function (k) { n++; if (P.s[k][2]) c++; });
      var last = P.mocks[P.mocks.length - 1];
      box.innerHTML = '<div class="note"><b>Ang iyong progress:</b> ' + seen + ' items answered, ' + pct(c, n) + '% right on the last try' + (last ? '. Last mock (' + LEVELS[last.level].name + '): ' + pct(last.c, last.n) + '%' : '') + '. <a href="' + B + 'practice/">Ituloy</a></div>';
      box.classList.remove('hidden');
    }
  }

  /* ---------- practice ---------- */
  function initPractice() {
    var form = $('#setup');
    var q = new URLSearchParams(location.search);
    if (q.get('level') === 'sub') $('input[name=level][value=sub]', form).checked = true;
    if (q.get('part') && $('input[name=part][value="' + q.get('part') + '"]', form)) $('input[name=part][value="' + q.get('part') + '"]', form).checked = true;
    function syncParts() {
      var lvl = $('input[name=level]:checked', form).value;
      $$('#parts .opt[data-levels]').forEach(function (o) {
        var okL = o.getAttribute('data-levels').indexOf(lvl) >= 0;
        o.classList.toggle('hidden', !okL);
        var inp = $('input', o);
        if (!okL && inp.checked) $('input[name=part][value=all]', form).checked = true;
      });
    }
    $$('input[name=level]', form).forEach(function (i) { i.addEventListener('change', syncParts); });
    syncParts();
    showProgress();
    bank().catch(function () { $('#setup-msg').textContent = 'Could not load the questions. Check your connection and reload.'; });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var lvl = $('input[name=level]:checked', form).value;
      var part = $('input[name=part]:checked', form).value;
      var n = +$('input[name=n]:checked', form).value;
      var mode = $('input[name=mode]:checked', form).value;
      bank().then(function (d) {
        var pool = d.items.filter(function (it) { return inLevel(it, lvl) && (part === 'all' || it.section === part); });
        if (mode === 'wrong') {
          pool = pool.filter(function (it) { return P.s[it.id] && P.s[it.id][2] === 0; });
          if (!pool.length) { $('#setup-msg').textContent = 'Wala ka pang mali dito. Choose "Bago muna".'; return; }
          shuffle(pool);
        } else {
          shuffle(pool);
          pool.sort(function (a, b) { return (P.s[a.id] ? P.s[a.id][0] : 0) - (P.s[b.id] ? P.s[b.id][0] : 0); });
        }
        $('#setup-msg').textContent = '';
        runDrill(pool.slice(0, n), lvl);
      }).catch(function () { $('#setup-msg').textContent = 'Could not load the questions. Check your connection and reload.'; });
    });
  }

  function runDrill(items, lvl) {
    var box = $('#drill');
    var form = $('#setup');
    var i = 0, right = 0;
    form.classList.add('hidden');
    box.classList.remove('hidden');
    track('drill_start');
    function show() {
      var it = items[i];
      box.innerHTML = '<div class="card">' + qHtml(it, i + 1, items.length) + '<div class="answer-slot"></div><div class="qfoot">' + reportLink(it) + '<span class="row"><button type="button" class="btn ghost small" data-act="stop">Tapusin</button><button type="button" class="btn small hidden" data-act="next">' + (i + 1 < items.length ? 'Susunod' : 'Tingnan ang score') + '</button></span></div></div>';
      $$('.choice', box).forEach(function (b) {
        b.addEventListener('click', function () {
          var picked = +b.getAttribute('data-i');
          var ok = picked === it.answer;
          if (ok) right++;
          record(it.id, ok); persist();
          reveal(box, it, picked);
          $('.answer-slot', box).innerHTML = whyHtml(it, picked);
          var nx = $('[data-act=next]', box); nx.classList.remove('hidden'); nx.focus();
        });
      });
      $('[data-act=next]', box).addEventListener('click', function () { i++; if (i < items.length) { show(); box.scrollIntoView({ block: 'start' }); } else done(); });
      $('[data-act=stop]', box).addEventListener('click', done);
      box.scrollIntoView({ block: 'start' });
    }
    function done() {
      var answered = Object.keys(P.s).length;
      track('drill_done');
      box.innerHTML = '<div class="card"><h2 style="margin-top:0">' + right + ' / ' + (i >= items.length ? items.length : i + (box.querySelector('.why') ? 1 : 0)) + ' tama</h2><p>You have now answered ' + answered + ' different items on this device.</p><div class="row"><button class="btn" type="button" data-act="again">Isa pang set</button><a class="btn ghost" href="' + B + 'mock/">Take the timed mock</a></div></div>';
      $('[data-act=again]', box).addEventListener('click', function () { box.classList.add('hidden'); form.classList.remove('hidden'); showProgress(); form.scrollIntoView(); });
      showProgress();
    }
    show();
  }

  function sectionStats(d) {
    var st = {};
    ORDER.forEach(function (s) { st[s] = { seen: 0, right: 0, total: 0 }; });
    d.items.forEach(function (it) {
      var r = P.s[it.id];
      st[it.section].total++;
      if (r) { st[it.section].seen++; if (r[2]) st[it.section].right++; }
    });
    return st;
  }
  function showProgress() {
    if (!Object.keys(P.s).length) return;
    bank().then(function (d) {
      var st = sectionStats(d);
      $('#progress-body').innerHTML = '<div class="bars">' + ORDER.map(function (s) {
        var x = st[s];
        return '<div class="bar"><span>' + SECTIONS[s].name.replace(' ability', '') + '</span><span class="track" title="' + x.seen + ' of ' + x.total + ' seen"><span class="fill" style="width:' + pct(x.right, x.total) + '%"></span></span><span>' + x.right + '/' + x.total + '</span></div>';
      }).join('') + '</div><p class="muted">Bar = items you got right on your last try, out of all items in that part. <button class="linkbtn" type="button" id="reset">I-reset ang progress</button></p>';
      $('#reset').addEventListener('click', function () { if (confirm('Delete all practice and mock results on this device?')) { P = { s: {}, mocks: [] }; persist(); del('handa.mock'); location.reload(); } });
      $('#progress').classList.remove('hidden');
    }).catch(function () { /* offline and never loaded */ });
  }

  /* ---------- mock exam ---------- */
  function buildMock(d, lvl) {
    var target = LEVELS[lvl].n;
    var secs = ORDER.filter(function (s) { return SECTIONS[s].levels.indexOf(lvl) >= 0; });
    var pools = {}, size = 0;
    secs.forEach(function (s) { pools[s] = d.items.filter(function (it) { return it.section === s && inLevel(it, lvl); }); size += pools[s].length; });
    var quota = {}, sum = 0;
    secs.forEach(function (s) { quota[s] = Math.floor((target * pools[s].length) / size); sum += quota[s]; });
    secs.slice().sort(function (a, b) { return pools[b].length - pools[a].length; }).forEach(function (s) { if (sum < target && quota[s] < pools[s].length) { quota[s]++; sum++; } });
    var ids = [];
    secs.forEach(function (s) {
      // keep items that share a passage or table together
      var units = {}, list = [];
      pools[s].forEach(function (it) { var k = it.stim >= 0 ? 's' + it.stim : it.id; if (!units[k]) { units[k] = []; list.push(units[k]); } units[k].push(it); });
      shuffle(list);
      var got = [];
      list.forEach(function (u) { if (got.length + u.length <= quota[s]) got = got.concat(u); });
      if (got.length < quota[s]) list.forEach(function (u) { u.forEach(function (it) { if (got.length < quota[s] && got.indexOf(it) < 0) got.push(it); }); });
      ids = ids.concat(got.map(function (it) { return it.id; }));
    });
    return ids;
  }

  function initMock() {
    var st = load('handa.mock', null);
    var resume = $('#resume');
    if (st && st.ids) {
      resume.innerHTML = 'You have a ' + LEVELS[st.level].name + ' mock in progress. <button class="btn small" type="button" id="resume-btn">Ituloy</button> <button class="linkbtn" type="button" id="drop-btn">Discard it</button>';
      resume.classList.remove('hidden');
      $('#resume-btn').addEventListener('click', function () { bank().then(function (d) { runMock(d, st); }); });
      $('#drop-btn').addEventListener('click', function () { del('handa.mock'); resume.classList.add('hidden'); });
    }
    $$('[data-start]').forEach(function (b) {
      b.addEventListener('click', function () {
        var lvl = b.getAttribute('data-start');
        if (st && st.ids && !confirm('Start a new mock? The one in progress will be discarded.')) return;
        b.disabled = true;
        bank().then(function (d) {
          var now = Date.now();
          var s = { level: lvl, ids: buildMock(d, lvl), ans: {}, flags: {}, start: now, end: now + LEVELS[lvl].min * 60000, cur: 0 };
          save('handa.mock', s);
          track('mock_start');
          runMock(d, s);
        }).catch(function () { b.disabled = false; alert('Could not load the questions. Check your connection and reload.'); });
      });
    });
    showHistory();
  }

  function fmt(ms) {
    var t = Math.max(0, Math.round(ms / 1000)), h = Math.floor(t / 3600), m = Math.floor((t % 3600) / 60), s = t % 60;
    return h + ':' + (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }

  function runMock(d, s) {
    var intro = $('#mock-intro'), box = $('#exam');
    intro.classList.add('hidden'); box.classList.remove('hidden');
    var items = s.ids.map(function (id) { return d.byId[id]; }).filter(Boolean);
    var timer;
    box.innerHTML = '<div class="examhead"><div class="row"><b>' + LEVELS[s.level].name + ' mock</b><span>Natitirang oras: <span class="timer" id="timer"></span></span><button class="btn small" type="button" id="submit">Ipasa</button></div></div><div class="card" id="qbox"></div><details class="nav card" style="margin-top:12px"' + (innerWidth >= 820 ? ' open' : '') + '><summary>Answer sheet (<span id="nans">0</span>/' + items.length + ' answered)</summary><div class="grid" id="grid">' +
      items.map(function (it, i) { return '<button type="button" data-q="' + i + '" aria-label="Item ' + (i + 1) + '">' + (i + 1) + '</button>'; }).join('') + '</div></details>';
    function tick() {
      var left = s.end - Date.now();
      var el = $('#timer'); if (!el) return;
      el.textContent = fmt(left);
      el.classList.toggle('low', left < 10 * 60000);
      if (left <= 0) finish(true);
    }
    function paintGrid() {
      var n = 0;
      $$('#grid button').forEach(function (b, i) {
        var id = items[i].id;
        var a = s.ans[id] !== undefined; if (a) n++;
        b.classList.toggle('done', a); b.classList.toggle('flag', !!s.flags[id]); b.classList.toggle('cur', i === s.cur);
      });
      $('#nans').textContent = n;
    }
    function show() {
      var it = items[s.cur];
      var sec = SECTIONS[it.section].name;
      $('#qbox').innerHTML = qHtml(it, s.cur + 1, items.length).replace('<span>' + esc(sec) + '</span>', '<span>' + esc(sec) + '</span>') +
        '<div class="qfoot"><button type="button" class="btn ghost small" data-act="prev"' + (s.cur ? '' : ' disabled') + '>Bumalik</button><label class="check" style="align-items:center"><input type="checkbox" id="flag"' + (s.flags[it.id] ? ' checked' : '') + '> Balikan mamaya</label><button type="button" class="btn small" data-act="next">' + (s.cur + 1 < items.length ? 'Susunod' : 'Review') + '</button></div>';
      var picked = s.ans[it.id];
      $$('#qbox .choice').forEach(function (b) {
        var i = +b.getAttribute('data-i');
        if (i === picked) { b.classList.add('picked'); b.setAttribute('aria-pressed', 'true'); }
        b.addEventListener('click', function () {
          s.ans[it.id] = i; save('handa.mock', s);
          $$('#qbox .choice').forEach(function (x) { x.classList.remove('picked'); x.setAttribute('aria-pressed', 'false'); });
          b.classList.add('picked'); b.setAttribute('aria-pressed', 'true');
          paintGrid();
        });
      });
      $('#flag').addEventListener('change', function (e) { if (e.target.checked) s.flags[it.id] = 1; else delete s.flags[it.id]; save('handa.mock', s); paintGrid(); });
      $('#qbox [data-act=prev]').addEventListener('click', function () { if (s.cur) { s.cur--; save('handa.mock', s); show(); } });
      $('#qbox [data-act=next]').addEventListener('click', function () {
        if (s.cur + 1 < items.length) { s.cur++; save('handa.mock', s); show(); } else { $('#grid').scrollIntoView({ block: 'center' }); }
      });
      paintGrid();
      window.scrollTo(0, 0);
    }
    $('#grid').addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; s.cur = +b.getAttribute('data-q'); save('handa.mock', s); show(); });
    $('#submit').addEventListener('click', function () {
      var left = items.length - Object.keys(s.ans).length;
      if (confirm(left ? left + ' items have no answer. Ipasa na? (Submit now?)' : 'Ipasa na ang exam? (Submit now?)')) finish(false);
    });
    function finish(timeUp) {
      clearInterval(timer);
      var by = {}, c = 0;
      items.forEach(function (it) {
        var ok = s.ans[it.id] === it.answer;
        if (!by[it.section]) by[it.section] = [0, 0];
        by[it.section][1]++; if (ok) { by[it.section][0]++; c++; }
        if (s.ans[it.id] !== undefined) record(it.id, ok);
      });
      var res = { level: s.level, at: Date.now(), c: c, n: items.length, by: by, used: Math.min(Date.now(), s.end) - s.start, timeUp: timeUp };
      P.mocks.push(res); if (P.mocks.length > 30) P.mocks.shift();
      persist(); del('handa.mock');
      track('mock_submit');
      results(items, s, res);
    }
    timer = setInterval(tick, 1000);
    tick();
    if (Date.now() < s.end) show();
  }

  function results(items, s, res) {
    var box = $('#exam');
    box.innerHTML = '<div class="card"><p class="muted" style="margin:0">' + LEVELS[res.level].name + ' mock' + (res.timeUp ? ' · time ran out' : '') + ' · time used ' + fmt(res.used) + '</p><p class="stat">' + res.c + ' / ' + res.n + ' (' + pct(res.c, res.n) + '%)</p>' +
      '<div class="bars">' + ORDER.filter(function (k) { return res.by[k]; }).map(function (k) { var x = res.by[k]; return '<div class="bar"><span>' + SECTIONS[k].name.replace(' ability', '') + '</span><span class="track"><span class="fill" style="width:' + pct(x[0], x[1]) + '%"></span></span><span>' + x[0] + '/' + x[1] + '</span></div>'; }).join('') + '</div>' +
      '<p>The CSC passing mark is a general rating of 80.00. The CSC does not publish how raw scores become a rating, so read this percentage as practice feedback, not a forecast.</p>' +
      '<div class="row"><a class="btn" href="' + B + 'practice/?level=' + res.level + '">Practice your weak parts</a><a class="btn ghost" href="' + B + 'pass/" data-mesure="pass_open">More mock forms: Handa Pass</a></div></div>' +
      '<h2>Review</h2><p class="muted">Green = right, red = wrong or blank. Tap a number to see the explanation.</p><div class="grid" id="rgrid">' +
      items.map(function (it, i) { return '<button type="button" data-q="' + i + '" class="' + (s.ans[it.id] === it.answer ? 'right' : 'wrong') + '">' + (i + 1) + '</button>'; }).join('') + '</div><div id="rbox" class="card" style="margin-top:12px"></div>';
    function rshow(i) {
      var it = items[i];
      var rb = $('#rbox');
      rb.innerHTML = qHtml(it, i + 1, items.length) + whyHtml(it, s.ans[it.id]) + '<div class="qfoot">' + reportLink(it) + '</div>';
      reveal(rb, it, s.ans[it.id]);
    }
    $('#rgrid').addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) rshow(+b.getAttribute('data-q')); });
    var firstWrong = items.findIndex(function (it) { return s.ans[it.id] !== it.answer; });
    rshow(firstWrong < 0 ? 0 : firstWrong);
    window.scrollTo(0, 0);
  }

  function showHistory() {
    if (!P.mocks.length) return;
    $('#history-body').innerHTML = '<table class="facts">' + P.mocks.slice(-10).reverse().map(function (m) {
      return '<tr><th scope="row">' + new Date(m.at).toLocaleDateString('en-PH', { day: 'numeric', month: 'short', year: 'numeric' }) + ', ' + LEVELS[m.level].name + '</th><td>' + m.c + ' / ' + m.n + ' (' + pct(m.c, m.n) + '%), ' + fmt(m.used) + '</td></tr>';
    }).join('') + '</table>';
    $('#history').classList.remove('hidden');
  }

  /* ---------- Handa Pass early access ---------- */
  function initPass() {
    var f = $('#signup'), msg = $('#signup-msg');
    track('pass_view');
    // Card pre-order: the shared octave-global-checkout module (Stripe) loads only on click; it counts its own checkout_view and checkout_start.
    var open = $('#buy-open');
    if (open) open.addEventListener('click', function () {
      open.disabled = true;
      var price = window.hVariant === 'b' ? 299 : 149;
      var s = document.createElement('script');
      s.src = B + 'assets/og-checkout.js?v=' + V;
      s.onload = function () {
        open.classList.add('hidden');
        window.OctaveCheckout.mount('#buy', {
          product: 'handa-pass-' + price + '-php', amount: price * 100, currency: 'php', venture: 'as-ph-05', lang: 'en', country: 'PH',
          appearance: { variables: { colorPrimary: '#0d6b4d', borderRadius: '10px' } },
        });
      };
      s.onerror = function () { open.disabled = false; alert('Could not load the payment form. Check your connection and try again.'); };
      document.head.appendChild(s);
    });
    $$('input[name=pay]', f).forEach(function (r) { r.addEventListener('change', function () { $('#pay-other-wrap').classList.toggle('hidden', f.pay.value !== 'other'); }); });
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = f.email.value.trim();
      var err = !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email) ? 'Pakilagay ang tamang e-mail (enter a valid e-mail).' : !f.pay.value ? 'Pumili ng payment method (pick how you would pay).' : !f.consent.checked ? 'Please tick the consent box.' : '';
      if (err) { msg.className = 'msg err'; msg.textContent = err; return; }
      var btn = $('button[type=submit]', f); btn.disabled = true;
      msg.className = 'muted'; msg.textContent = 'Sending…';
      var q = new URLSearchParams(location.search);
      var body = { action: 'signup', email: email, pay: f.pay.value, pay_other: f.pay_other.value, level: f.level.value || 'unsure', sitting: f.sitting.value || 'unsure', variant: window.hVariant || 'a', consent: true, consent_version: CONSENT, page: location.pathname, website: f.website.value, ref_domain: document.referrer.split('/')[2] || '', utm_source: q.get('utm_source') || '' };
      fetch(ENDPOINT, { method: 'POST', body: JSON.stringify(body), credentials: 'omit' }).then(function (r) { return r.json(); }).then(function (r) {
        if (!r.ok) throw new Error(r.error || 'error');
        msg.className = 'msg ok';
        msg.innerHTML = '<b>Salamat! You are on the list.</b> We will e-mail ' + esc(email) + ' once, when Handa Pass opens. Meanwhile, the free <a href="' + B + 'mock/">mock exam</a> is ready.';
        f.reset();
      }).catch(function () {
        btn.disabled = false;
        msg.className = 'msg err';
        msg.innerHTML = 'Hindi na-save (not saved). Try again in a minute, or e-mail <a href="mailto:' + MAIL + '?subject=Handa%20Pass%20early%20access">' + MAIL + '</a>.';
      });
    });
  }

  var page = document.body.getAttribute('data-page');
  if (page === 'home') initHome();
  if (page === 'practice') initPractice();
  if (page === 'mock') initMock();
  if (page === 'pass') initPass();
})();
