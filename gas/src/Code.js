/**
 * Handa CSE web app (READ FRANCE SAS). Standalone Apps Script with its own Sheet.
 * Separate from octave-checkout and from every other Octave project.
 *
 * Actions (POST text/plain JSON, or GET with the same fields as query parameters):
 *   track        cookieless, anonymous daily counters (Stats tab), same pattern as octave-checkout Track.js.
 *                A hit flagged `excluded` by mesure.js (crawler or headless user agent, navigator.webdriver, or
 *                our own tests with octave_notrack=1) goes to the Exclus tab by reason instead, so the summary
 *                shows counted and raw views side by side. A hit without `v` (old snippet, e.g. cached by a
 *                crawler) is counted there too, as `legacy`.
 *   signup       "Handa Pass" early-access sign-up (fake door: nothing is sold or charged) (Signups tab)
 *   rights       data-subject request under R.A. 10173: withdraw | erase | access | correct (Requests tab)
 *   ping         health check
 *   summary      counts for the operator (admin key; never returns e-mails)
 *   purge_tests  deletes rows created by automated tests (admin key)
 *
 * The spreadsheet is created on first use and its id kept in Script Properties (SHEET_ID).
 * Only scope: spreadsheets. No e-mail is sent from here.
 */

var APP = {
  name: 'Handa CSE',
  tz: 'Asia/Manila',
  consentVersion: 'ea-2026-10-13',
  adminHash: 'a3fa8460047014dd7e261efdef4c00681f7a2c3393f2d7a0b718cf5e3956b829',
  sites: ['handa-cse'],
  events: ['view', 'cta_click', 'drill_start', 'drill_done', 'mock_start', 'mock_submit', 'pass_view', 'pass_open', 'checkout_open', 'signup_submit', 'signup_ok', 'install', 'report_q'],
  ownHosts: ['outils.vread.fr', 'vread-corp.github.io'],
  prices: { a: 149, b: 299 },
  levels: ['pro', 'sub', 'both', 'unsure'],
  sittings: ['2027-03', '2027-08', 'later', 'unsure'],
  pays: ['gcash', 'maya', 'card', 'other'],
  ratePerMin: 240,
  signupRatePerMin: 20,
};

var SIGNUP_HEADER = ['created_at', 'updated_at', 'email', 'level', 'sitting', 'pay', 'pay_other', 'variant', 'price_php', 'consent_version', 'page', 'source', 'status', 'test'];
var REQUEST_HEADER = ['created_at', 'type', 'email_sha256', 'message', 'matched_rows', 'status', 'test'];
var STATS_HEADER = ['date', 'site', 'page', 'event', 'variant', 'source', 'medium', 'campaign', 'count', 'mobile', 'desktop', 'updated_at'];
var STATS_KEYS = 8;
var EXCL_HEADER = ['date', 'site', 'page', 'event', 'reason', 'count', 'mobile', 'desktop', 'updated_at'];
var EXCL_KEYS = 5;
// legacy: a hit without v (snippet before 2026-10-13, still cached by search-engine renderers) cannot be screened.
var EXCL_REASONS = ['webdriver', 'bot', 'notrack', 'legacy'];

function doGet(e) { return handle_(e, (e && e.parameter) || {}); }

function doPost(e) {
  var req = {};
  try { req = JSON.parse((e && e.postData && e.postData.contents) || '{}') || {}; } catch (err) { return json_({ ok: false, error: 'bad_json' }); }
  if (typeof req !== 'object' || Array.isArray(req)) return json_({ ok: false, error: 'bad_json' });
  return handle_(e, req);
}

function handle_(e, req) {
  var action = String((e && e.parameter && e.parameter.action) || req.action || '');
  try {
    switch (action) {
      case 'track': return json_(track_(req));
      case 'signup': return json_(signup_(req));
      case 'rights': return json_(rights_(req));
      case 'summary': return json_(summary_(req));
      case 'purge_tests': return json_(purgeTests_(req));
      case 'ping': return json_({ ok: true, app: APP.name, consentVersion: APP.consentVersion });
      default: return json_({ ok: false, error: 'unknown_action' });
    }
  } catch (err) {
    if (err && err.userError) return json_({ ok: false, error: err.code, field: err.field || '' });
    console.error(String((err && err.stack) || err));
    return json_({ ok: false, error: 'server_error' });
  }
}

/* ---------- helpers ---------- */

function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
function userError_(code, field) { var e = new Error(code); e.userError = true; e.code = code; e.field = field; return e; }
function now_() { return new Date(); }
function phDate_(d) { return Utilities.formatDate(d, APP.tz, 'yyyy-MM-dd'); }
/** Text cell: a leading quote stops formula injection (=, +, -, @). */
function txt_(v) { var s = String(v === undefined || v === null ? '' : v); return /^[=+\-@]/.test(s) ? "'" + s : s; }
function cell_(v) { return v instanceof Date ? Utilities.formatDate(v, APP.tz, 'yyyy-MM-dd') : String(v); }
function sha256Hex_(s) {
  return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(s), Utilities.Charset.UTF_8)
    .map(function (b) { return ('0' + (b & 255).toString(16)).slice(-2); }).join('');
}
function clean_(v, max) { return String(v === undefined || v === null ? '' : v).replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max); }
function token_(v, max) { return String(v === undefined || v === null ? '' : v).toLowerCase().replace(/[^a-z0-9._ -]+/g, '').replace(/\s+/g, ' ').trim().slice(0, max); }
function pick_(v, list, dflt) { v = String(v || ''); return list.indexOf(v) >= 0 ? v : dflt; }
function isTestEmail_(email) { return /@example\.(com|org)$/.test(email); }
function checkAdmin_(req) { if (!req.key || sha256Hex_(String(req.key)) !== APP.adminHash) throw userError_('forbidden'); }

function ss_() {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty('SHEET_ID');
  if (id) return SpreadsheetApp.openById(id);
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    id = props.getProperty('SHEET_ID');
    if (id) return SpreadsheetApp.openById(id);
    var ss = SpreadsheetApp.create('Handa CSE: early access and stats (READ FRANCE SAS)');
    ss.setSpreadsheetTimeZone(APP.tz);
    props.setProperty('SHEET_ID', ss.getId());
    return ss;
  } finally { lock.releaseLock(); }
}

function tab_(name, header) {
  var ss = ss_();
  var sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.getRange(1, 1, 1, header.length).setValues([header]).setFontWeight('bold');
    sh.setFrozenRows(1);
    var def = ss.getSheetByName('Sheet1') || ss.getSheetByName('Feuille 1');
    if (def && ss.getSheets().length > 1 && def.getLastRow() === 0) ss.deleteSheet(def);
  }
  return sh;
}

function rateOk_(bucket, max) {
  var cache = CacheService.getScriptCache();
  var k = 'rl:' + bucket + ':' + Math.floor(now_().getTime() / 60000);
  var n = Number(cache.get(k) || 0);
  if (n >= max) return false;
  cache.put(k, String(n + 1), 120);
  return true;
}

function withLock_(fn) {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(15000)) throw userError_('busy');
  try { return fn(); } finally { lock.releaseLock(); }
}

/* ---------- tracking (cookieless, anonymous daily counters) ---------- */

function trackPage_(page) {
  var p = String(page === undefined || page === null ? '' : page).slice(0, 300).toLowerCase().replace(/[?#].*$/, '');
  if (!/^\/[a-z0-9\/._%~-]*$/.test(p)) return null;
  if (p === '/handa-cse' || p.indexOf('/handa-cse/') === 0) p = p.slice('/handa-cse'.length) || '/';
  p = p.replace(/\/index\.html$/, '/').replace(/\.html$/, '').replace(/\/{2,}/g, '/');
  return p.slice(0, 80) || '/';
}

function sourceOf_(req) {
  var ref = String(req.ref_domain || '').toLowerCase().replace(/^www\./, '');
  if (ref && !/^[a-z0-9.-]{1,100}$/.test(ref)) ref = '';
  if (APP.ownHosts.indexOf(ref) >= 0) ref = '(internal)';
  return token_(req.utm_source, 50) || ref || '(direct)';
}

function validateTrack_(req) {
  var site = String(req.site || '');
  if (APP.sites.indexOf(site) < 0) throw userError_('bad_request', 'site');
  var event = String(req.event || '');
  if (APP.events.indexOf(event) < 0) throw userError_('bad_request', 'event');
  var page = trackPage_(req.page);
  if (page === null) throw userError_('bad_request', 'page');
  if (req.ts !== undefined && req.ts !== null && req.ts !== '') {
    var ts = Number(req.ts);
    if (!isFinite(ts) || Math.abs(ts - now_().getTime()) > 2 * 86400 * 1000) throw userError_('bad_request', 'ts');
  }
  return {
    date: phDate_(now_()), site: site, page: page, event: event,
    variant: req.variant === 'a' || req.variant === 'b' ? req.variant : '',
    source: sourceOf_(req), medium: token_(req.utm_medium, 30), campaign: token_(req.utm_campaign, 50),
    device: req.device === 'mobile' || req.device === 'desktop' ? req.device : '',
    reason: req.excluded ? (EXCL_REASONS.indexOf(String(req.excluded)) >= 0 ? String(req.excluded) : 'bot') : (req.v ? '' : 'legacy'),
  };
}

function track_(req) {
  var hit = validateTrack_(req);
  if (!rateOk_('track', APP.ratePerMin)) return { ok: false, error: 'rate_limited' };
  withLock_(function () { if (hit.reason) incrementExcluded_(hit); else incrementStat_(hit); });
  return { ok: true };
}

/** Caller holds the script lock. */
function incrementStat_(h) {
  incrementRow_('Stats', STATS_HEADER, STATS_KEYS, [h.date, h.site, h.page, h.event, h.variant, h.source, h.medium, h.campaign], h.device);
}

/** Hits that are not visits: same daily counters, keyed by reason. Caller holds the script lock. */
function incrementExcluded_(h) {
  incrementRow_('Exclus', EXCL_HEADER, EXCL_KEYS, [h.date, h.site, h.page, h.event, h.reason], h.device);
}

/** Daily counter row `keys` (first is the date) in tab `name`: incremented, or appended. */
function incrementRow_(name, header, nKeys, keys, device) {
  var sh = tab_(name, header);
  var key = keys.join('\u001f');
  var last = sh.getLastRow();
  var rowNum = 0;
  var n = Math.min(Math.max(last - 1, 0), 3000);
  if (n > 0) {
    var vals = sh.getRange(last - n + 1, 1, n, nKeys).getValues();
    for (var i = vals.length - 1; i >= 0; i--) {
      if (cell_(vals[i][0]) < keys[0]) break;
      if (vals[i].map(cell_).join('\u001f') === key) { rowNum = last - n + 1 + i; break; }
    }
  }
  var stamp = now_().toISOString();
  if (!rowNum) {
    sh.appendRow(keys.map(txt_).concat([1, device === 'mobile' ? 1 : 0, device === 'desktop' ? 1 : 0, stamp]));
  } else {
    var c = sh.getRange(rowNum, nKeys + 1, 1, 3).getValues()[0];
    sh.getRange(rowNum, nKeys + 1, 1, 4).setValues([[Number(c[0] || 0) + 1, Number(c[1] || 0) + (device === 'mobile' ? 1 : 0), Number(c[2] || 0) + (device === 'desktop' ? 1 : 0), stamp]]);
  }
}

/* ---------- Handa Pass early access (fake door) ---------- */

function validEmail_(v) {
  var s = clean_(v, 254).toLowerCase();
  if (!/^[a-z0-9._%+'-]+@[a-z0-9.-]+\.[a-z]{2,24}$/.test(s) || s.indexOf('..') >= 0) throw userError_('bad_request', 'email');
  return s;
}

function signup_(req) {
  if (req.website) return { ok: true }; // honeypot: silently ignore bots
  if (req.consent !== true && req.consent !== 'true') throw userError_('consent_required', 'consent');
  if (String(req.consent_version || '') !== APP.consentVersion) throw userError_('consent_outdated', 'consent_version');
  var email = validEmail_(req.email);
  var variant = req.variant === 'a' || req.variant === 'b' ? req.variant : '';
  if (!variant) throw userError_('bad_request', 'variant');
  var pay = String(req.pay || '');
  if (APP.pays.indexOf(pay) < 0) throw userError_('bad_request', 'pay');
  var rec = {
    email: email, level: pick_(req.level, APP.levels, 'unsure'), sitting: pick_(req.sitting, APP.sittings, 'unsure'),
    pay: pay, payOther: pay === 'other' ? clean_(req.pay_other, 60) : '', variant: variant, price: APP.prices[variant],
    page: trackPage_(req.page) || '', source: sourceOf_(req), test: isTestEmail_(email),
  };
  if (!rateOk_('signup', APP.signupRatePerMin)) throw userError_('rate_limited');
  var updated = withLock_(function () {
    var sh = tab_('Signups', SIGNUP_HEADER);
    var stamp = now_().toISOString();
    var last = sh.getLastRow();
    var row = 0;
    if (last >= 2) {
      var emails = sh.getRange(2, 3, last - 1, 1).getValues();
      for (var i = emails.length - 1; i >= 0; i--) if (String(emails[i][0]) === email) { row = i + 2; break; }
    }
    var values = [txt_(rec.email), rec.level, rec.sitting, rec.pay, txt_(rec.payOther), rec.variant, rec.price, APP.consentVersion, txt_(rec.page), txt_(rec.source), 'active', rec.test ? 'yes' : ''];
    if (row) {
      sh.getRange(row, 2, 1, 1 + values.length).setValues([[stamp].concat(values)]);
    } else {
      sh.appendRow([stamp, stamp].concat(values));
    }
    if (!row && !rec.test) incrementStat_({ date: phDate_(now_()), site: 'handa-cse', page: '/pass/', event: 'signup_ok', variant: rec.variant, source: '(server)', medium: '', campaign: '', device: '' });
    return !!row;
  });
  return { ok: true, updated: updated };
}

/* ---------- data-subject requests (R.A. 10173) ---------- */

function rights_(req) {
  if (req.website) return { ok: true };
  var type = String(req.type || '');
  if (['withdraw', 'erase', 'access', 'correct'].indexOf(type) < 0) throw userError_('bad_request', 'type');
  var email = validEmail_(req.email);
  var message = clean_(req.message, 1000);
  if (!rateOk_('rights', 20)) throw userError_('rate_limited');
  return withLock_(function () {
    var matched = 0;
    var sh = tab_('Signups', SIGNUP_HEADER);
    var last = sh.getLastRow();
    if ((type === 'withdraw' || type === 'erase') && last >= 2) {
      var rows = sh.getRange(2, 1, last - 1, SIGNUP_HEADER.length).getValues();
      for (var i = 0; i < rows.length; i++) {
        if (String(rows[i][2]) !== email) continue;
        matched++;
        // Withdrawal and erasure both stop all use: the e-mail is replaced by a short hash at once.
        sh.getRange(i + 2, 2, 1, 2).setValues([[now_().toISOString(), '(erased) ' + sha256Hex_(email).slice(0, 16)]]);
        sh.getRange(i + 2, 7).setValue('');
        sh.getRange(i + 2, 13).setValue(type === 'erase' ? 'erased' : 'withdrawn');
      }
    } else if (last >= 2) {
      var em = sh.getRange(2, 3, last - 1, 1).getValues();
      for (var j = 0; j < em.length; j++) if (String(em[j][0]) === email) matched++;
    }
    var status = (type === 'withdraw' || type === 'erase') ? 'done_automatically' : 'to_answer_by_email';
    tab_('Requests', REQUEST_HEADER).appendRow([now_().toISOString(), type, sha256Hex_(email), txt_(message), matched, status, isTestEmail_(email) ? 'yes' : '']);
    return { ok: true, type: type, matched: matched > 0, status: status };
  });
}

/* ---------- operator views (admin key) ---------- */

function summary_(req) {
  checkAdmin_(req);
  var out = { ok: true, sheetUrl: ss_().getUrl(), signups: { real: 0, test: 0, active: 0, byVariant: {}, byPay: {}, byLevel: {} }, requests: { real: 0, test: 0, open: 0 }, stats: {} };
  var su = tab_('Signups', SIGNUP_HEADER);
  if (su.getLastRow() >= 2) su.getRange(2, 1, su.getLastRow() - 1, SIGNUP_HEADER.length).getValues().forEach(function (r) {
    var test = r[13] === 'yes';
    out.signups[test ? 'test' : 'real']++;
    if (!test && r[12] === 'active') {
      out.signups.active++;
      var v = r[7] + ' (PHP ' + r[8] + ')';
      out.signups.byVariant[v] = (out.signups.byVariant[v] || 0) + 1;
      out.signups.byPay[r[5]] = (out.signups.byPay[r[5]] || 0) + 1;
      out.signups.byLevel[r[3]] = (out.signups.byLevel[r[3]] || 0) + 1;
    }
  });
  var rq = tab_('Requests', REQUEST_HEADER);
  if (rq.getLastRow() >= 2) rq.getRange(2, 1, rq.getLastRow() - 1, REQUEST_HEADER.length).getValues().forEach(function (r) {
    var test = r[6] === 'yes';
    out.requests[test ? 'test' : 'real']++;
    if (!test && r[5] === 'to_answer_by_email') out.requests.open++;
  });
  var st = tab_('Stats', STATS_HEADER);
  if (st.getLastRow() >= 2) st.getRange(2, 1, st.getLastRow() - 1, STATS_HEADER.length).getValues().forEach(function (r) {
    var k = cell_(r[0]) + ' ' + r[3] + (r[4] ? ' ' + r[4] : '');
    out.stats[k] = (out.stats[k] || 0) + Number(r[8] || 0);
  });
  // Hits that are not visits (crawlers, automated browsers, our tests), and views per day: counted vs raw.
  out.excluded = {};
  out.views = {};
  var day = function (d) { return out.views[d] || (out.views[d] = { counted: 0, excluded: 0, raw: 0 }); };
  Object.keys(out.stats).forEach(function (k) {
    var p = k.split(' ');
    if (p[1] === 'view') { day(p[0]).counted += out.stats[k]; day(p[0]).raw += out.stats[k]; }
  });
  var ex = tab_('Exclus', EXCL_HEADER);
  if (ex.getLastRow() >= 2) ex.getRange(2, 1, ex.getLastRow() - 1, EXCL_HEADER.length).getValues().forEach(function (r) {
    var d = cell_(r[0]);
    var k = d + ' ' + r[3] + ' ' + r[4];
    out.excluded[k] = (out.excluded[k] || 0) + Number(r[5] || 0);
    if (r[3] === 'view') { day(d).excluded += Number(r[5] || 0); day(d).raw += Number(r[5] || 0); }
  });
  if (req.email) out.hasEmail = su.getLastRow() >= 2 && su.getRange(2, 3, su.getLastRow() - 1, 1).getValues().some(function (r) { return String(r[0]) === String(req.email).toLowerCase(); });
  return out;
}

function purgeTests_(req) {
  checkAdmin_(req);
  return withLock_(function () {
    var n = 0;
    [['Signups', SIGNUP_HEADER, 13], ['Requests', REQUEST_HEADER, 6]].forEach(function (t) {
      var sh = tab_(t[0], t[1]);
      for (var r = sh.getLastRow(); r >= 2; r--) if (sh.getRange(r, t[2] + 1).getValue() === 'yes') { sh.deleteRow(r); n++; }
    });
    return { ok: true, deleted: n };
  });
}
