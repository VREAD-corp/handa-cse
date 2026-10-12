// Validates the question bank: node content/validate.mjs [file ...]   (no args = every file in content/questions)
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
export const TOPICS = {
  verbal: ['word-meaning', 'sentence-completion', 'error-recognition', 'sentence-structure', 'paragraph-organization', 'reading-comprehension'],
  numerical: ['basic-operations', 'number-sequence', 'word-problems'],
  analytical: ['word-analogy', 'symbolic-logic', 'assumptions-conclusions', 'data-interpretation'],
  clerical: ['filing', 'spelling'],
  geninfo: ['constitution', 'ra6713', 'peace-human-rights', 'environment'],
};
const PREFIX = { verbal: 'V', numerical: 'N', analytical: 'A', clerical: 'C', geninfo: 'G' };
const BANNED = /\b(delve|delves|seamless|unlock|elevate|leverage|tapestry|testament|pivotal|crucial|furthermore|moreover)\b|—/i;

export function validate(items, file = '') {
  const errs = [];
  const ids = new Set();
  const stems = new Set();
  items.forEach((it, i) => {
    const at = `${file}#${i} ${it && it.id}`;
    const e = (m) => errs.push(`${at}: ${m}`);
    if (!it || typeof it !== 'object') return e('not an object');
    const allowed = ['id', 'section', 'topic', 'lang', 'stim', 'q', 'choices', 'answer', 'why', 'src', 'level'];
    Object.keys(it).forEach((k) => { if (!allowed.includes(k)) e(`unknown field ${k}`); });
    if (!TOPICS[it.section]) e(`bad section ${it.section}`);
    else {
      if (!TOPICS[it.section].includes(it.topic)) e(`bad topic ${it.topic}`);
      if (!new RegExp(`^${PREFIX[it.section]}-\\d{3}$`).test(it.id)) e(`id must look like ${PREFIX[it.section]}-001`);
    }
    if (ids.has(it.id)) e('duplicate id'); ids.add(it.id);
    if (!['en', 'fil'].includes(it.lang)) e('lang must be en or fil');
    if (it.lang === 'fil' && it.section !== 'verbal') e('only verbal items may be in Filipino (official scope)');
    if (it.stim !== undefined && (typeof it.stim !== 'string' || it.stim.length < 20 || it.stim.length > 2500)) e('stim must be a 20-2500 char string when present');
    if (typeof it.q !== 'string' || it.q.length < 5 || it.q.length > 600) e('q must be 5-600 chars');
    if (stems.has((it.stim || '') + it.q)) e('duplicate stem'); stems.add((it.stim || '') + it.q);
    if (!Array.isArray(it.choices) || it.choices.length !== 4) e('need exactly 4 choices');
    else {
      if (new Set(it.choices.map((c) => String(c).trim().toLowerCase())).size !== 4) e('choices must be distinct');
      it.choices.forEach((c) => { if (typeof c !== 'string' || !c.trim() || c.length > 300) e('choice must be a 1-300 char string'); });
      if (it.choices.some((c) => /^(all|none) of the above$/i.test(c.trim()))) e('no "all/none of the above"');
    }
    if (!Number.isInteger(it.answer) || it.answer < 0 || it.answer > 3) e('answer must be 0-3');
    if (typeof it.why !== 'string' || it.why.length < 30 || it.why.length > 900) e('why must be 30-900 chars');
    if (it.section === 'geninfo') {
      if (!it.src || typeof it.src.label !== 'string' || !/^https:\/\//.test(it.src.url || '')) e('geninfo needs src {label, url}');
    } else if (it.src !== undefined && it.src !== null && (!it.src.label || !/^https:\/\//.test(it.src.url || ''))) e('src must be {label, url} when present');
    if (it.level !== undefined && !['both', 'pro', 'sub'].includes(it.level)) e('level must be both|pro|sub when present');
    const text = [it.stim, it.q, ...(it.choices || []), it.why].join(' ');
    const m = text.match(BANNED); if (m) e(`banned word or em dash: "${m[0]}"`);
  });
  return errs;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const files = process.argv.slice(2).length ? process.argv.slice(2) : fs.readdirSync(path.join(here, 'questions')).filter((f) => f.endsWith('.mjs')).map((f) => path.join(here, 'questions', f));
  let all = [], errs = [];
  for (const f of files) {
    const items = (await import(pathToFileURL(path.resolve(f)).href + '?t=' + Date.now())).default;
    errs = errs.concat(validate(items, path.basename(f)));
    all = all.concat(items);
  }
  errs = errs.concat(validate(all, 'ALL').filter((x) => /duplicate/.test(x)));
  const count = {};
  all.forEach((it) => { const k = `${it.section}/${it.topic}${it.lang === 'fil' ? ' (fil)' : ''}`; count[k] = (count[k] || 0) + 1; });
  const ans = [0, 0, 0, 0]; all.forEach((it) => ans[it.answer]++);
  console.log(JSON.stringify(count, null, 1));
  console.log('total', all.length, 'answer-position spread', ans.join('/'));
  if (errs.length) { console.error(errs.join('\n')); process.exit(1); }
  console.log('OK');
}
