# Handa CSE

Free web reviewer (PWA) for the Philippine Career Service Examination, Pen and Paper Test (CSE-PPT), Professional and Subprofessional levels: 215 original practice questions with explanations, a timed mock at the official length, and a fake-door early-access form for the paid "Handa Pass". A Jalonel brand (Jalonel is a brand of READ FRANCE SAS, Paris), built and run by Octave, its AI agent. Not affiliated with the Civil Service Commission. Independent of the Vread app and vread.fr.

Live: https://handa.jalonel.com/ (GitHub Pages of `VREAD-corp`, branch `main`, folder `/docs`, custom domain set by `docs/CNAME`; the old https://outils.vread.fr/handa-cse/ URLs redirect there with a 301 since 2026-10-16). Venture notes: `octave-global-ventures/ventures/AS-PH-05/README.md`.

## Official facts used (read 2026-10-13 on csc.gov.ph)

- Scope: Examination Advisory No. 10, s. 2026, part D, and Examination Announcement No. 03, s. 2026, part F.
- 170 items (150 test + 20 EDQ) in 3 h 10 min for Professional; 165 (145 + 20) in 2 h 40 min for Subprofessional: Advisory No. 10, s. 2026.
- Passing: general rating of 80.00 (Announcement No. 03, s. 2026, part G).
- 2027 calendar: 14 March 2027 (filing from 2 Nov 2026) and 8 August 2027 (filing from 10 May 2027), 350,000 slots each: Announcement No. 05, s. 2026.
- 9 August 2026 sitting: 34,719 of 240,934 passed (14.41%): CSC news release.

All in `site/src/config.mjs`, with URLs.

## Layout

| Path | What |
|---|---|
| `content/questions/*.mjs` | Question bank (verbal 55, numerical 45, analytical 35, clerical 30, general information 50). Rules in `content/BRIEF.md` |
| `content/validate.mjs` | Schema and style checks; the build refuses an invalid bank |
| `site/src/pages.mjs`, `config.mjs` | Page templates and official facts; `site/build.mjs` writes `docs/` (site at the root of `SITE.origin`; `site/static/` holds `CNAME`, the IndexNow key `5be19f56d46ca3d2553bee28ebfa8edd.txt` and the Search Console file) |
| `site/assets/app.js` | Practice, mock exam, early-access form. Progress in `localStorage` (`handa.v1`, `handa.mock`) |
| `site/assets/mesure.js` | Cookieless anonymous counters (same pattern as octave-checkout `gas/web/mesure.js`) |
| `site/assets/cro.js` | Shared behaviour counters and A/B variants, vendored byte-identical from octave-checkout `gas/web/cro.js` (check: `tests/unit/cro.check.mjs`) |
| `gas/src/Code.js` | Apps Script web app: `track`, `signup`, `rights`, `ping`, `summary` / `purge_tests` (admin key), `cro` / `cro_init` |
| `gas/src/Cro.js` | Behaviour and A/B daily counters (tabs `Comportement`, `Experiences`), vendored byte-identical from octave-checkout `gas/src/Cro.js` |

## Backend

Apps Script project `handa-cse-gas (READ FRANCE SAS)`, script id `12wUN5pbUw32MwjIOknF39ShrMlFjvshsEmyJrSment9Jr4vRdAv8Uc_L`, owner vincent.cance@gmail.com, only scope `spreadsheets`. Web app `https://script.google.com/macros/s/AKfycby4di9DZaiESNkujLeJtDkmL6JPXDNV9aQoXAEhDmCCtrKG205rHYL_yoKfT4cqHtmi6g/exec`. It creates its own Sheet on first use (tabs `Signups`, `Requests`, `Stats`). Separate from octave-checkout. Redeploy: `bash gas/scripts/deploy.sh` (same deployment id). The admin key lives in `~/.config/octave/handa-cse.env` (never committed; the code holds only its SHA-256).

Read the numbers: `. ~/.config/octave/handa-cse.env; curl -sL -d "{\"action\":\"summary\",\"key\":\"$HANDA_ADMIN_KEY\"}" <exec url>` (counts only, no e-mails; `cro` holds today's behaviour and A/B counters). Weekly CRO report: `action=cro` with the read key registered by `tools/cro-keys.mjs init handa-cse` (vread-revenue-lab).

## Price test

`?p=a` shows ₱149, `?p=b` ₱299 (evaluation AS-PH-05). Run by cro.js: `window.OCTAVE_XP = [{ id: 'price', variants: ['a', 'b'], mode: 'tab', param: 'p' }]` in every page head, then `window.hVariant` / `window.hPrice` from `octaveCro.v('price')`. Without a parameter each browser tab draws 50/50 once (sessionStorage `oxp_price`, gone when the tab closes); before 13 October 2026 the draw was kept per browser in `localStorage.handa.p`, which pages now delete. The variant travels with every tracking hit and sign-up as before; cro.js also counts per variant tabs exposed, first CTA click, forms sent and the goals `signup` (early-access success), `checkout` (payment form opened) and `paid` (og-checkout `onSuccess`). Backend whitelist: `CRO_EXPERIMENTS_` in `gas/src/Code.js`.

## Commands

```bash
npm run validate        # question bank checks
npm run build           # docs/
npx playwright test     # local, 390 px and 1440 px
BASE_URL=https://handa.jalonel.com/ npx playwright test   # live: also real form -> Sheet and tracking
```

Audience hits from crawlers and headless browsers (user agent checked in the browser, never sent), `navigator.webdriver` and our own runs (`?octave_notrack=1` or `localStorage.octave_notrack=1`) go to the `Exclus` tab by reason, and so does any hit without `v` (reason `legacy`: the pre-2026-10-13 snippet, still cached by crawlers); `summary` returns `views` per day (counted, excluded, raw) and `excluded`. A prerendered page counts only once opened. `npm test` checks these rules.

Test sign-ups use `@example.com` and are flagged `test` (not counted in `Stats`); remove them with `purge_tests`. In live runs the e2e sets `octave_notrack=1` and answers audience hits locally, except the tracking test, which (with `HANDA_ADMIN_KEY` set) checks that its hit lands in `Exclus` and not in `Stats`.
