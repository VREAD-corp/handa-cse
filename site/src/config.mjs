export const SITE = {
  brand: 'Handa CSE',
  origin: 'https://handa.jalonel.com',
  base: '/',
  endpoint: 'https://script.google.com/macros/s/AKfycby4di9DZaiESNkujLeJtDkmL6JPXDNV9aQoXAEhDmCCtrKG205rHYL_yoKfT4cqHtmi6g/exec',
  indexNowKey: '5be19f56d46ca3d2553bee28ebfa8edd',
  consentVersion: 'ea-2026-10-13',
  updated: '13 October 2026',
  updatedIso: '2026-10-13',
  email: 'octave@vread.fr',
  company: {
    name: 'READ FRANCE SAS',
    address: '11 rue Rouvet, 75019 Paris, France',
    siren: '988 741 773',
    rcs: 'RCS Paris',
    capital: '€1,000',
    president: 'Tanguy Warsmann',
  },
  // Price test from evaluations/AS-PH-05.md: Pass Pack at PHP 149 vs PHP 299.
  prices: { a: 149, b: 299 },
};

// Official facts, read on csc.gov.ph on 2026-10-13. Every number on the site comes from here.
export const SOURCES = {
  adv10: {
    label: 'CSC Examination Advisory No. 10, s. 2026 (09 August 2026 CSE-PPT), part D',
    url: 'https://csc.gov.ph/examination-advisories/examination-advisory-no-10-s-2026-school-assignment-and-important-reminders-for-examinees-of-the-09-august-2026-career-service-examination-pen-and-paper-test-cse-ppt',
  },
  ann03: {
    label: 'CSC Examination Announcement No. 03, s. 2026, parts F and G',
    url: 'https://csc.gov.ph/phocadownload/userupload/erpo/announcements/2026/ExamAnn_2026_03_Conduct%20of%2009%20Aug%202026%20CSE-PPT_orig%20signed.pdf',
  },
  ann05: {
    label: 'CSC Examination Announcement No. 05, s. 2026 (calendar of pen-and-paper tests for 2027)',
    url: 'https://csc.gov.ph/examination-advisories/examination-announcement-no-05-s-2026-calendar-of-civil-service-examinations-pen-and-paper-test-for-cy-2027',
  },
  results0826: {
    label: 'CSC news release on the 9 August 2026 CSE-PPT results',
    url: 'https://csc.gov.ph/9-august-2026-career-service-exam-out-region-iii-records-most-passers',
  },
  adv16: {
    label: 'CSC Examination Advisory No. 16, s. 2026 (reset exam on 22 November 2026)',
    url: 'https://csc.gov.ph/examination-advisories/examination-advisory-no-16-s-2026-reset-of-the-suspended-09-august-2026-examination-in-ncr-and-select-areas-in-region-iv-and-car-to-22-november-2026',
  },
  npc: { label: 'National Privacy Commission', url: 'https://privacy.gov.ph/' },
  dpa: { label: 'Data Privacy Act of 2012 (R.A. 10173)', url: 'https://privacy.gov.ph/data-privacy-act/' },
};

export const EXAM = {
  next: { date: '2027-03-14', label: '14 March 2027', filing: '2 November 2026', results: '11 May 2027', slots: '350,000' },
  after: { date: '2027-08-08', label: '8 August 2027', filing: '10 May 2027', results: '5 October 2027', slots: '350,000' },
  levels: {
    pro: { name: 'Professional', items: 170, scored: 150, edq: 20, minutes: 190, time: '3 hours 10 minutes', proper: '8:00 to 11:10 a.m.' },
    sub: { name: 'Subprofessional', items: 165, scored: 145, edq: 20, minutes: 160, time: '2 hours 40 minutes', proper: '8:00 to 10:40 a.m.' },
  },
  passing: '80.00',
  fee: 'PHP 500',
  lastResult: { sitting: '9 August 2026', takers: '240,934', passers: '34,719', rate: '14.41%' },
};

// Mock-exam sections in booklet order. The CSC does not publish how many items each part has.
export const SECTIONS = {
  verbal: { name: 'Verbal ability', short: 'Verbal', levels: ['pro', 'sub'] },
  analytical: { name: 'Analytical ability', short: 'Analytical', levels: ['pro'] },
  clerical: { name: 'Clerical ability', short: 'Clerical', levels: ['sub'] },
  numerical: { name: 'Numerical ability', short: 'Numerical', levels: ['pro', 'sub'] },
  geninfo: { name: 'General information', short: 'Gen. info', levels: ['pro', 'sub'] },
};
