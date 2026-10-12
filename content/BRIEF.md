# Question-writing brief (Handa CSE)

Handa CSE is a free web reviewer for the Philippine Career Service Examination, Pen and Paper Test (CSE-PPT), Professional and Subprofessional levels. It is published by READ FRANCE SAS (Paris) and built by Octave, an AI agent. It is NOT affiliated with the Civil Service Commission (CSC).

## Official scope (the only thing we follow)

Source: CSC Examination Advisory No. 10, s. 2026, part D, and Examination Announcement No. 03, s. 2026, part F (read 2026-10-13).

- General Information (in English): Philippine Constitution; Code of Conduct and Ethical Standards for Public Officials and Employees (R.A. 6713); Peace and Human Rights Issues and Concepts; Environment Management and Protection.
- Verbal Ability (in English and Filipino): word meaning; sentence completion; error recognition; sentence structure; paragraph organization; reading comprehension.
- Numerical Ability (in English): basic operations; number sequence; word problems.
- Analytical Ability (Professional only, in English): word analogy; symbolic logic/abstract reasoning; identifying assumptions and drawing conclusions; data interpretation.
- Clerical Ability (Subprofessional only, in English): filing; spelling.
- Calculators are banned in the exam room, so every numerical item must be solvable by hand in about 1 minute.

## Copyright rule (hard)

Write every item from scratch. Do NOT open, search for or paraphrase CSC test questions, "leaked" items, other reviewer apps, reviewer books, PDFs, Facebook groups or websites. Do not reuse well-known reviewer items. Reading passages and data tables are written by you, about invented or everyday situations (barangay, LGU office, jeepney routes, sari-sari store, typhoon preparedness, etc.). Use invented Filipino names for people and places when needed (no real living persons, no real politicians).

## File format

Each file is an ES module: `export default [ {...}, ... ];` Fields:

| field | rule |
|---|---|
| `id` | `V-001` verbal, `N-001` numerical, `A-001` analytical, `C-001` clerical, `G-001` general information. Unique, 3 digits, use your assigned range |
| `section` | `verbal` / `numerical` / `analytical` / `clerical` / `geninfo` |
| `topic` | one of the official subtopic slugs: verbal `word-meaning`, `sentence-completion`, `error-recognition`, `sentence-structure`, `paragraph-organization`, `reading-comprehension`; numerical `basic-operations`, `number-sequence`, `word-problems`; analytical `word-analogy`, `symbolic-logic`, `assumptions-conclusions`, `data-interpretation`; clerical `filing`, `spelling`; geninfo `constitution`, `ra6713`, `peace-human-rights`, `environment` |
| `lang` | `en`, or `fil` for items written in Filipino (verbal only) |
| `stim` | optional shared stimulus shown above the question: a reading passage, a data table (plain text, use a simple aligned layout with `|` separators, one row per line), a filing list. Several items may repeat the exact same `stim` string |
| `q` | the question stem |
| `choices` | exactly 4 strings, distinct, plausible distractors, no "all/none of the above" |
| `answer` | index 0-3 of the correct choice. Spread positions evenly across your file (roughly 25% each) |
| `why` | explanation in plain English (also for Filipino items), 1 to 4 sentences: why the key is right, and the trap in the most tempting wrong choice. For numbers, show the working |
| `src` | REQUIRED for geninfo: `{ label: '1987 Constitution, Art. VII, Sec. 4', url: 'https://lawphil.net/consti/cons1987.html' }` pointing to the primary text (lawphil.net or another official/primary source you actually fetched). Optional elsewhere |

## Style

- Plain, exam-like English. American/Philippine spelling consistent with Philippine usage.
- No em dashes (use commas, colons or parentheses). Do not use: delve, seamless, unlock, elevate, leverage, tapestry, testament, pivotal, crucial, furthermore, moreover.
- Difficulty mix: about 30% easy, 50% medium, 20% hard.
- One unambiguous correct answer. If two choices could be argued, rewrite.

## Check before you finish

Run `node /home/vincent/clients/v-read/dev/handa-cse/content/validate.mjs <your file>` until it prints OK. For numerical/analytical items, also recompute every answer with a small script in your scratchpad (not in the repo) and fix any mismatch.
