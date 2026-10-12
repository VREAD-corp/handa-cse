// Verbal ability items V-001 to V-055. Original items written for Handa CSE (not taken from any CSC test or reviewer).

const P1 = `When the deep well in Barangay Talisay ran dry during the summer of last year, the barangay council looked for a solution that would not depend on the town's overstretched water district. Councilor Mylene Bautista proposed a rainwater collection program. Under her plan, each household that attended a two-hour seminar would receive a 200-liter drum fitted with a mesh filter and a tap. The seminar taught residents how to clean their roofs and gutters, how to keep mosquitoes out of the drums, and why the collected water should be boiled before drinking.

At first, only forty families signed up. Many residents doubted that rain alone could supply their needs, and some worried that the drums would become breeding grounds for dengue mosquitoes. By the end of the rainy season, however, the participating households reported that they had bought far less water from delivery trucks. Their stories spread quickly, and more than 150 families joined the second round of seminars. The council now plans to install larger tanks at the elementary school and the health center.`;

const P2 = `For years, applicants for business permits in the Municipality of Kalinaw lined up outside the municipal hall before dawn, hoping to be served before the noon break. In January, the Business Permits Office introduced an online appointment system. Applicants now choose a thirty-minute slot on the municipal website and receive a text message confirming the time. The office reports that the average waiting time has dropped from four hours to about forty minutes.

Not everyone has benefited equally. Owners of small sari-sari stores, many of them older women without smartphones, found the website hard to use. Some paid younger relatives or neighbors to book slots for them, while others simply arrived without an appointment and were asked to come back another day. After complaints reached the municipal council, the office set aside two windows every morning for walk-in clients and placed a staff member at the entrance to help applicants register on the spot.

The head of the office admits that the system is still imperfect. Still, she points out that the old line, with its long hours under the sun, was far harder on elderly applicants than any website.`;

const P3 = `Walk into almost any sari-sari store and you will find shampoo, coffee, and cooking oil sold in single-use sachets. For families who earn a daily wage, the sachet makes sense: it lets them buy only what they can afford that day, even if the price per gram is higher than that of a large bottle. Manufacturers, for their part, have built a huge market by selling in small units to millions of households.

The trouble begins after the product is used. Sachets are made of thin layers of plastic and aluminum fused together, which makes them very hard to recycle. Most end up in canals and rivers, where they block the flow of water and worsen flooding during heavy rain. Some towns have tried banning sachets outright, but store owners complain that their customers simply buy the same products in the next town.

A more promising approach may be refill stations, where customers bring their own containers and pay for exactly the amount they need. A pilot station in Barangay Malaya sells dishwashing liquid by the 50-milliliter scoop at roughly the same price per milliliter as a large bottle. Whether such stations can spread depends on whether they stay as convenient and as cheap as the sachets they hope to replace.`;

const P4 = `Every June, before the first typhoon of the season, Lola Pacing performs the same ritual. She climbs onto a wooden stool, takes down the old biscuit tin from the top of her cabinet, and checks its contents one by one: a flashlight, spare batteries, candles, a box of matches wrapped in plastic, and a small bundle of photocopied documents. Her grandchildren used to laugh at the tin. They called it her "treasure chest" and teased her for guarding matches as if they were gold.

They stopped laughing the year a strong typhoon cut the power in their town for nine days. While neighbors lined up at the only open store for candles that had already run out, Lola Pacing calmly lit her lamp and brought out the family's documents, safe and dry, for the barangay relief registration. Now it is her eldest grandson who climbs the stool each June, and the tin has grown into two plastic boxes.`;

const P5 = `Noong kasagsagan ng pandemya, napansin ni Kapitana Lorna Villareal na maraming pamilya sa Barangay Bagong Silang ang hindi na makabili ng sapat na gulay. Kaya ipinasya ng sangguniang barangay na gawing taniman ang bakanteng lote sa likod ng covered court. Bawat purok ay binigyan ng sariling bahagi ng lupa, at ang mga residente ang nagsalitan sa pagdidilig at pag-aalis ng damo.

Hindi naging madali ang simula. Matigas at mabato ang lupa, at ilang beses na sinira ng mga ligaw na manok ang mga punla. Gayunman, sa tulong ng isang agriculturist mula sa munisipyo, natuto ang mga residente na gumawa ng compost mula sa mga tirang pagkain at tuyong dahon. Pagsapit ng ikatlong buwan, umaani na sila ng pechay, talong, at sitaw.

Ngayon, kahit tapos na ang pandemya, patuloy pa rin ang gulayan. Ang sobrang ani ay ipinagbibili sa murang halaga, at ang kinikita ay ginagamit sa pagbili ng binhi at kagamitan. Para kay Kapitana Lorna, higit pa sa pagkain ang naibigay ng proyekto: muling natutong magtulungan ang magkakapitbahay.`;

export default [
  // ---------- word-meaning (10: 6 en, 4 fil) ----------
  {
    id: 'V-001', section: 'verbal', topic: 'word-meaning', lang: 'en',
    q: "Choose the word or phrase closest in meaning to the word in capital letters: The barangay captain gave a TERSE reply to the reporter's question.",
    choices: ['brief and abrupt', 'angry and loud', 'vague and confusing', 'polite and formal'],
    answer: 0,
    why: "Terse means using very few words, often in a curt way. 'Angry and loud' is tempting because a terse reply can sound unfriendly, but the word describes length and bluntness, not volume or anger.",
  },
  {
    id: 'V-002', section: 'verbal', topic: 'word-meaning', lang: 'en',
    q: 'Choose the word or phrase closest in meaning to the word in capital letters: The new procedure will EXPEDITE the release of business permits.',
    choices: ['delay', 'speed up', 'examine closely', 'make free of charge'],
    answer: 1,
    why: "To expedite is to make a process happen faster. 'Delay' is the opposite, and 'examine closely' describes a review, not a change in speed.",
  },
  {
    id: 'V-003', section: 'verbal', topic: 'word-meaning', lang: 'en',
    q: "Choose the word or phrase closest in meaning to the word in capital letters: Her account of the flood was so METICULOUS that the engineers used it in their technical report.",
    choices: ['emotional and moving', 'short and general', 'careful and exact in every detail', 'widely shared'],
    answer: 2,
    why: "Meticulous means showing great attention to detail. The context supports this: engineers would use an account because it is precise. 'Emotional and moving' fits a dramatic story, but that would not make it useful for a technical report.",
  },
  {
    id: 'V-004', section: 'verbal', topic: 'word-meaning', lang: 'en',
    q: "Which word is most nearly OPPOSITE in meaning to 'frugal'?",
    choices: ['thrifty', 'careful', 'modest', 'wasteful'],
    answer: 3,
    why: "Frugal means sparing with money or resources, so its opposite is wasteful. 'Thrifty' is a synonym, which is the usual trap when a question asks for the opposite.",
  },
  {
    id: 'V-005', section: 'verbal', topic: 'word-meaning', lang: 'en',
    q: "Choose the word or phrase closest in meaning to the word in capital letters: The treasurer's long explanation only served to OBFUSCATE the issue.",
    choices: ['make unclear', 'settle', 'make public', 'simplify'],
    answer: 0,
    why: "To obfuscate is to make something confusing or hard to understand. 'Simplify' is the exact opposite, and the phrase 'only served to' signals that the explanation made things worse, not better.",
  },
  {
    id: 'V-006', section: 'verbal', topic: 'word-meaning', lang: 'en',
    q: 'Choose the word or phrase closest in meaning to the word in capital letters: Despite repeated warnings, the vendor remained RECALCITRANT about moving his stall off the sidewalk.',
    choices: ['apologetic', 'unaware of the rule', 'stubbornly resistant to authority', 'short of money'],
    answer: 2,
    why: "Recalcitrant describes someone who stubbornly refuses to obey or cooperate. 'Unaware of the rule' does not fit because the vendor had received repeated warnings, so he knew the rule and still resisted.",
  },
  {
    id: 'V-007', section: 'verbal', topic: 'word-meaning', lang: 'fil',
    q: "Ano ang kahulugan ng salitang nasa malalaking titik? MASIGASIG si Aling Rosa sa pag-aalaga ng kaniyang halamanan kahit tag-init.",
    choices: ['tamad at mabagal', 'masipag at puspusan', 'malungkot at tahimik', 'mayabang at palalo'],
    answer: 1,
    why: "Masigasig means diligent and persistent, working hard at something. 'Tamad at mabagal' (lazy and slow) is its opposite, and the clue 'kahit tag-init' (even in the hot season) shows she keeps working despite difficulty.",
  },
  {
    id: 'V-008', section: 'verbal', topic: 'word-meaning', lang: 'fil',
    q: 'Ano ang kahulugan ng salitang nasa malalaking titik? Hindi MAIKAKAILA ng kalihim na nahuli siya sa pagsusumite ng ulat.',
    choices: ['maipagmamalaki', 'maipapaliwanag', 'maitatama', 'maitatanggi'],
    answer: 3,
    why: "Maikakaila comes from 'kaila' (to deny or hide), so 'hindi maikakaila' means 'cannot deny'. 'Maipapaliwanag' (can be explained) is tempting because the secretary might explain the delay, but the sentence is about being unable to deny it.",
  },
  {
    id: 'V-009', section: 'verbal', topic: 'word-meaning', lang: 'fil',
    q: "Alin ang KASALUNGAT ng salitang 'marangya' sa pangungusap: Marangya ang handaan sa kaarawan ng anak ng negosyante.",
    choices: ['magarbo', 'maluho', 'payak', 'makulay'],
    answer: 2,
    why: "Marangya means lavish or luxurious, so its opposite is payak (simple, plain). 'Magarbo' and 'maluho' are synonyms of marangya, the usual trap in an opposite-meaning item.",
  },
  {
    id: 'V-010', section: 'verbal', topic: 'word-meaning', lang: 'fil',
    q: 'Ano ang kahulugan ng salitang nasa malalaking titik? NAGPUPUYOS ang kaniyang damdamin nang malaman niyang ninakaw ang kaniyang bisikleta.',
    choices: ['nag-aalab sa galit', 'nagagalak', 'nalulungkot nang tahimik', 'nagtataka'],
    answer: 0,
    why: "Nagpupuyos describes a feeling that burns or rages, usually anger. 'Nalulungkot nang tahimik' (quietly sad) is a possible reaction to theft, but puyos suggests intense, burning emotion, not quiet sadness.",
  },

  // ---------- sentence-completion (9: 6 en, 3 fil) ----------
  {
    id: 'V-011', section: 'verbal', topic: 'sentence-completion', lang: 'en',
    q: 'The municipal office will remain closed on Monday ______ the typhoon signal is lifted before noon.',
    choices: ['because', 'unless', 'although', 'so that'],
    answer: 1,
    why: "'Unless' introduces the one condition under which the office would open: the closure stands except if the signal is lifted. 'Because' would make the lifting of the signal the reason for closing, which is illogical.",
  },
  {
    id: 'V-012', section: 'verbal', topic: 'sentence-completion', lang: 'en',
    q: 'Neither the clerk nor the supervisors ______ aware of the new memo.',
    choices: ['was', 'is', 'has been', 'were'],
    answer: 3,
    why: "With 'neither...nor', the verb agrees with the nearer subject. 'Supervisors' is plural, so the plural past form 'were' is correct. 'Was' would agree with 'clerk', which is the farther subject.",
  },
  {
    id: 'V-013', section: 'verbal', topic: 'sentence-completion', lang: 'en',
    q: 'By the time the rescue team arrived, the floodwater ______ to waist level.',
    choices: ['had risen', 'rises', 'has risen', 'will rise'],
    answer: 0,
    why: "'By the time' plus a past event (arrived) calls for the past perfect, which shows an action completed before another past action. 'Has risen' is present perfect and does not fit a sequence set entirely in the past.",
  },
  {
    id: 'V-014', section: 'verbal', topic: 'sentence-completion', lang: 'en',
    q: 'Ms. Galang has been working at the municipal hall ______ seven years.',
    choices: ['since', 'during', 'for', 'within'],
    answer: 2,
    why: "Use 'for' with a length of time (seven years) and 'since' with a starting point (since 2019). 'Since' is the common trap because it also goes with the present perfect, but it cannot take a duration.",
  },
  {
    id: 'V-015', section: 'verbal', topic: 'sentence-completion', lang: 'en',
    q: "The mayor's speech was so ______ that even residents who had opposed the project began to nod in agreement.",
    choices: ['tedious', 'inaudible', 'ambiguous', 'persuasive'],
    answer: 3,
    why: "Opponents starting to agree shows the speech convinced them, so 'persuasive' fits. 'Ambiguous' might explain mixed reactions, but an unclear speech would not win over people who had opposed the project.",
  },
  {
    id: 'V-016', section: 'verbal', topic: 'sentence-completion', lang: 'en',
    q: 'Because the evidence against the accused was only ______, the judge said it could not by itself support a conviction.',
    choices: ['circumstantial', 'conclusive', 'irrefutable', 'overwhelming'],
    answer: 0,
    why: "Circumstantial evidence suggests a fact indirectly, so it may be too weak alone to convict. 'Only' and 'could not by itself' point to weak evidence; 'conclusive', 'irrefutable' and 'overwhelming' all describe strong evidence and contradict the sentence.",
  },
  {
    id: 'V-017', section: 'verbal', topic: 'sentence-completion', lang: 'fil',
    q: '______ malakas ang ulan, itinuloy pa rin ng mga mag-aaral ang paglilinis ng plaza.',
    choices: ['Dahil', 'Bagaman', 'Upang', 'Kapag'],
    answer: 1,
    why: "'Bagaman' (although) shows contrast: the students continued despite the heavy rain, which matches 'pa rin' (still). 'Dahil' (because) would make the rain the reason for continuing, which is illogical.",
  },
  {
    id: 'V-018', section: 'verbal', topic: 'sentence-completion', lang: 'fil',
    q: '______ ng pandesal si Mang Ernesto tuwing umaga mula pa noong isang taon.',
    choices: ['Bumili', 'Bibili', 'Bumibili', 'Bilhin'],
    answer: 2,
    why: "'Tuwing umaga' (every morning) and 'mula pa noong isang taon' (since last year) describe a habit that is still going on, so the imperfective aspect 'bumibili' is needed. 'Bumili' is completed aspect and cannot express a continuing habit.",
  },
  {
    id: 'V-019', section: 'verbal', topic: 'sentence-completion', lang: 'fil',
    q: 'Ipinagpaliban ang pulong ng sangguniang barangay ______ hindi dumating ang karamihan sa mga kagawad.',
    choices: ['ngunit', 'kung', 'samantalang', 'sapagkat'],
    answer: 3,
    why: "'Sapagkat' (because) gives the reason for the postponement: most councilors did not come. 'Ngunit' (but) signals contrast, yet there is nothing contrasting between a postponement and the absence of members.",
  },

  // ---------- error-recognition (9: 7 en, 2 fil) ----------
  {
    id: 'V-020', section: 'verbal', topic: 'error-recognition', lang: 'en',
    q: "Which part of the sentence contains an error? '(A) Each of the volunteers were (B) given a raincoat (C) and a flashlight (D) before the evacuation drill.'",
    choices: ['(A) Each of the volunteers were', '(B) given a raincoat', '(C) and a flashlight', '(D) before the evacuation drill'],
    answer: 0,
    why: "The subject is 'each', which is singular, so the verb should be 'was'. The plural 'volunteers' sits next to the verb and makes 'were' sound right, which is the trap.",
  },
  {
    id: 'V-021', section: 'verbal', topic: 'error-recognition', lang: 'en',
    q: "Which part of the sentence contains an error? '(A) Mr. Dizon asked (B) my brother and I (C) to help him carry (D) the sacks of rice.'",
    choices: ['(A) Mr. Dizon asked', '(B) my brother and I', '(C) to help him carry', '(D) the sacks of rice'],
    answer: 1,
    why: "'My brother and I' is the object of 'asked', so the object pronoun 'me' is required: 'asked my brother and me'. A quick test: drop 'my brother and' and you would say 'asked me', not 'asked I'.",
  },
  {
    id: 'V-022', section: 'verbal', topic: 'error-recognition', lang: 'en',
    q: "Which part of the sentence contains an error? '(A) Last Saturday, the residents (B) of Purok 3 (C) clean the drainage canal (D) along Mabini Street.'",
    choices: ['(A) Last Saturday, the residents', '(B) of Purok 3', '(C) clean the drainage canal', '(D) along Mabini Street'],
    answer: 2,
    why: "'Last Saturday' places the action in the past, so the verb must be 'cleaned'. The other parts are correct; the time marker in part A is what makes the present-tense verb wrong.",
  },
  {
    id: 'V-023', section: 'verbal', topic: 'error-recognition', lang: 'en',
    q: "Which part of the sentence contains an error? '(A) Of the two proposals, (B) the one submitted by (C) Engineer Salonga is (D) the most practical.'",
    choices: ['(A) Of the two proposals,', '(B) the one submitted by', '(C) Engineer Salonga is', '(D) the most practical'],
    answer: 3,
    why: "When only two things are compared, use the comparative form: 'the more practical'. The superlative 'most' is for three or more, and part A ('Of the two proposals') is the clue.",
  },
  {
    id: 'V-024', section: 'verbal', topic: 'error-recognition', lang: 'en',
    q: "Which part of the sentence contains an error? '(A) After the long night shift, (B) the nurse went home (C) and laid down (D) for an hour.'",
    choices: ['(A) After the long night shift,', '(B) the nurse went home', '(C) and laid down', '(D) for an hour'],
    answer: 2,
    why: "The nurse is resting, not placing an object, so the verb is 'lie', whose past tense is 'lay': 'and lay down'. 'Laid' is the past of 'lay' (to put something down) and needs an object, as in 'laid the bag down'.",
  },
  {
    id: 'V-025', section: 'verbal', topic: 'error-recognition', lang: 'en',
    q: "Which part of the sentence contains an error? '(A) The supervisor insisted for (B) the immediate submission (C) of all time records (D) by the end of the month.'",
    choices: ['(A) The supervisor insisted for', '(B) the immediate submission', '(C) of all time records', '(D) by the end of the month'],
    answer: 0,
    why: "The verb 'insist' takes the preposition 'on': 'insisted on the immediate submission'. 'Insisted for' is a common local error, perhaps influenced by 'asked for'.",
  },
  {
    id: 'V-026', section: 'verbal', topic: 'error-recognition', lang: 'en',
    q: "Which part of the sentence contains an error? '(A) Neither of the two applicants (B) have completed (C) the required training (D) for the position.'",
    choices: ['(A) Neither of the two applicants', '(B) have completed', '(C) the required training', '(D) for the position'],
    answer: 1,
    why: "'Neither' used as a pronoun is singular, so the verb should be 'has completed'. The plural noun 'applicants' inside the 'of' phrase is not the subject.",
  },
  {
    id: 'V-027', section: 'verbal', topic: 'error-recognition', lang: 'fil',
    q: "Aling bahagi ng pangungusap ang may mali? '(A) Upang marinig ng lahat, (B) lumapit sa mikropono (C) ang kapitan at (D) nagsalita ng malakas.'",
    choices: ['(A) Upang marinig ng lahat,', '(B) lumapit sa mikropono', '(C) ang kapitan at', '(D) nagsalita ng malakas'],
    answer: 3,
    why: "'Nang' is used to show how an action is done (manner), so it should be 'nagsalita nang malakas'. 'Ng' in part A is correct because it marks the doer of 'marinig' ('ng lahat').",
  },
  {
    id: 'V-028', section: 'verbal', topic: 'error-recognition', lang: 'fil',
    q: "Aling bahagi ng pangungusap ang may mali? '(A) Dumalo sa pulong (B) ang kalihim ng barangay, (C) at dumalo din (D) ang ingat-yaman.'",
    choices: ['(A) Dumalo sa pulong', '(B) ang kalihim ng barangay,', '(C) at dumalo din', '(D) ang ingat-yaman.'],
    answer: 2,
    why: "In standard Filipino, 'rin' follows a word ending in a vowel (or w/y) and 'din' follows a consonant. 'Dumalo' ends in the vowel o, so it should be 'dumalo rin'.",
  },

  // ---------- sentence-structure (7, en) ----------
  {
    id: 'V-029', section: 'verbal', topic: 'sentence-structure', lang: 'en',
    q: 'Which sentence is correctly constructed?',
    choices: [
      'Walking along Rizal Avenue, the new mall caught my attention.',
      'Walking along Rizal Avenue, the new mall was noticed by me.',
      'The new mall caught my attention, walking along Rizal Avenue.',
      'While walking along Rizal Avenue, I noticed the new mall.',
    ],
    answer: 3,
    why: "The modifier 'walking along Rizal Avenue' must attach to the person who walked. Only the last sentence makes 'I' the subject. The other three make it sound as if the mall was walking (a dangling modifier).",
  },
  {
    id: 'V-030', section: 'verbal', topic: 'sentence-structure', lang: 'en',
    q: 'Which sentence is correctly punctuated?',
    choices: [
      'The power went out at noon; the generator started a few seconds later.',
      'The power went out at noon, the generator started a few seconds later.',
      'The power went out at noon the generator started a few seconds later.',
      'The power went out at noon, then the generator started a few seconds later.',
    ],
    answer: 0,
    why: "Two independent clauses can be joined by a semicolon. A comma alone creates a comma splice, no punctuation creates a run-on, and 'then' is an adverb, not a conjunction, so ', then' is still a comma splice.",
  },
  {
    id: 'V-031', section: 'verbal', topic: 'sentence-structure', lang: 'en',
    q: 'Which sentence uses parallel structure correctly?',
    choices: [
      'The training covers first aid, how to evacuate, and to communicate during emergencies.',
      'The training covers giving first aid, evacuation, and to communicate during emergencies.',
      'The training covers first aid, evacuation, and emergency communication.',
      'The training covers first aid, evacuating, and how communication works in emergencies.',
    ],
    answer: 2,
    why: "Items in a series should share the same grammatical form. The correct sentence lists three nouns (first aid, evacuation, communication). The others mix nouns, gerunds, infinitives and clauses.",
  },
  {
    id: 'V-032', section: 'verbal', topic: 'sentence-structure', lang: 'en',
    q: 'Which sentence places its modifier correctly so that the meaning is clear?',
    choices: [
      'The clerk returned the form to the applicant with a missing signature.',
      'The clerk returned to the applicant the form that had a missing signature.',
      'With a missing signature, the clerk returned the form to the applicant.',
      'The clerk with a missing signature returned the form to the applicant.',
    ],
    answer: 1,
    why: "The missing signature belongs to the form, and only the second sentence puts the modifier right next to 'the form'. The first sentence suggests the applicant is missing a signature, and the last two attach it to the clerk.",
  },
  {
    id: 'V-033', section: 'verbal', topic: 'sentence-structure', lang: 'en',
    q: 'Which of the following is a complete sentence?',
    choices: [
      'Because the bridge was closed for repairs.',
      'The bridge, which was closed for repairs after the earthquake.',
      'Closed for repairs after the earthquake last July.',
      'The bridge was closed for repairs after the earthquake.',
    ],
    answer: 3,
    why: "A complete sentence needs a subject and a main verb and must express a complete thought. The first is a dependent clause, the second has a subject but no main verb, and the third has no subject.",
  },
  {
    id: 'V-034', section: 'verbal', topic: 'sentence-structure', lang: 'en',
    q: 'Which sentence states the idea most clearly, with no ambiguous pronoun?',
    choices: [
      'Mrs. Reyes told Ms. Tan, "Your application has been approved."',
      'When Mrs. Reyes met Ms. Tan, she told her that her application was approved.',
      'Mrs. Reyes told Ms. Tan that her application had been approved by her.',
      'She told Ms. Tan, Mrs. Reyes, that her application had been approved.',
    ],
    answer: 0,
    why: "The direct quotation makes it plain whose application was approved: Ms. Tan's. In the other sentences, 'she' and 'her' could refer to either woman.",
  },
  {
    id: 'V-035', section: 'verbal', topic: 'sentence-structure', lang: 'en',
    q: 'Which sentence follows the standard order of adjectives in English?',
    choices: [
      'She bought a red small plastic basin.',
      'She bought a plastic small red basin.',
      'She bought a small red plastic basin.',
      'She bought a small plastic red basin.',
    ],
    answer: 2,
    why: "English adjectives usually follow the order size, then color, then material: small, red, plastic. The last choice gets size first but puts material before color.",
  },

  // ---------- paragraph-organization (6, en) ----------
  {
    id: 'V-036', section: 'verbal', topic: 'paragraph-organization', lang: 'en',
    stim: "1. After paying, wait for your name to be called so you can sign the clearance.\n2. First, fill out the request form at the front desk of the barangay hall.\n3. Getting a barangay clearance in San Isidro takes only a few steps.\n4. Next, bring the completed form to the treasurer's window and pay the fee.",
    q: 'What is the most logical order of the sentences?',
    choices: ['3-2-4-1', '2-4-1-3', '3-4-2-1', '2-3-4-1'],
    answer: 0,
    why: "Sentence 3 introduces the topic, then the signal words give the sequence: 'First' (2), 'Next' (4), and 'After paying' (1), which must follow the payment in 4.",
  },
  {
    id: 'V-037', section: 'verbal', topic: 'paragraph-organization', lang: 'en',
    stim: '1. Because of this, the municipal office now sends text alerts two days before a storm is expected.\n2. In past years, many families in coastal Barangay Malinao were caught off guard by sudden typhoons.\n3. These early alerts give households enough time to secure their boats and move to higher ground.\n4. Warnings often reached them only a few hours before the winds grew strong.',
    q: 'What is the most logical order of the sentences?',
    choices: ['2-1-4-3', '4-2-1-3', '2-4-1-3', '2-4-3-1'],
    answer: 2,
    why: "Sentence 2 states the problem and 4 explains it ('them' refers to the families). 'Because of this' (1) introduces the response, and 'These early alerts' (3) must come after the alerts are mentioned in 1.",
  },
  {
    id: 'V-038', section: 'verbal', topic: 'paragraph-organization', lang: 'en',
    stim: '1. Within a month, her sales had nearly doubled.\n2. Aling Nena noticed that customers often left her store without buying anything because she could not give change for large bills.\n3. With enough change on hand, she no longer had to turn buyers away.\n4. To solve the problem, she began exchanging her large bills for coins at the bank every Monday.',
    q: 'What is the most logical order of the sentences?',
    choices: ['2-3-4-1', '4-2-3-1', '2-4-1-3', '2-4-3-1'],
    answer: 3,
    why: "The paragraph moves from problem (2) to solution (4, 'To solve the problem'), to the immediate effect (3, enough change on hand), to the final result (1, sales doubled). Putting 1 before 3 reports the outcome before the change that caused it.",
  },
  {
    id: 'V-039', section: 'verbal', topic: 'paragraph-organization', lang: 'en',
    stim: '1. First, they weaken storm waves before the water reaches houses.\n2. For these reasons, the town council has banned the cutting of mangroves along the bay.\n3. Mangrove forests protect coastal communities in several ways.\n4. Their thick roots also trap mud, slowing the erosion of the coastline.',
    q: 'What is the most logical order of the sentences?',
    choices: ['3-4-1-2', '3-1-4-2', '1-4-3-2', '3-1-2-4'],
    answer: 1,
    why: "Sentence 3 is the topic sentence. 'First' (1) gives the first benefit and 'also' (4) adds another, and 'For these reasons' (2) concludes after all the reasons are given.",
  },
  {
    id: 'V-040', section: 'verbal', topic: 'paragraph-organization', lang: 'en',
    stim: "1. Officials said the change would ease the heavy traffic in front of the market.\n2. After two meetings, both sides agreed on a shorter route that still avoided the crowded market road.\n3. The drivers' association, however, argued that the new route was longer and would raise fuel costs.\n4. Last June, the city announced that jeepneys on the Poblacion route would no longer pass through the public market.",
    q: 'What is the most logical order of the sentences?',
    choices: ['4-3-1-2', '4-1-3-2', '1-4-3-2', '4-1-2-3'],
    answer: 1,
    why: "The announcement (4) comes first, then the officials' reason for it (1). 'However' (3) introduces the drivers' objection to that reason, and the agreement (2) resolves the dispute at the end.",
  },
  {
    id: 'V-041', section: 'verbal', topic: 'paragraph-organization', lang: 'en',
    stim: '1. When the provincial capitol started its paper recycling program, few employees took part.\n2. Instead, they were thrown out with food waste and ended up at the dumpsite.\n3. Once separate bins were placed beside every printer, the amount of recycled paper rose steadily.\n4. Used sheets were rarely carried to the single collection point on the ground floor.',
    q: 'What is the most logical order of the sentences?',
    choices: ['1-2-4-3', '4-2-1-3', '1-4-3-2', '1-4-2-3'],
    answer: 3,
    why: "In sentence 2, 'Instead' and 'they' refer back to the used sheets in sentence 4, so 4 must come right before 2. The paragraph opens with the program (1) and ends with the fix and its result (3).",
  },

  // ---------- reading-comprehension (14: 11 en, 3 fil) ----------
  {
    id: 'V-042', section: 'verbal', topic: 'reading-comprehension', lang: 'en', stim: P1,
    q: 'Which statement best expresses the main idea of the passage?',
    choices: [
      "A barangay's rainwater program overcame early doubts and grew once residents saw its benefits.",
      'Dengue mosquitoes are the main danger of storing water at home.',
      'The town water district failed to supply Barangay Talisay during the summer.',
      'Councilor Bautista deserves an award for her proposal.',
    ],
    answer: 0,
    why: "The passage follows the program from its proposal, through early doubts, to its growth after the first season. The water district and the dengue worry are details, and the passage never says the councilor deserves an award.",
  },
  {
    id: 'V-043', section: 'verbal', topic: 'reading-comprehension', lang: 'en', stim: P1,
    q: 'According to the passage, what did a household have to do to receive a drum?',
    choices: ['Pay a small fee to the council', 'Attend a two-hour seminar', 'Clean the barangay gutters', 'Buy its own mesh filter'],
    answer: 1,
    why: "The passage states that each household that attended a two-hour seminar would receive a drum. The drum already came with a mesh filter, and gutter cleaning was something taught in the seminar, not a requirement.",
  },
  {
    id: 'V-044', section: 'verbal', topic: 'reading-comprehension', lang: 'en', stim: P1,
    q: 'Which of the following can best be inferred about why more families joined the second round of seminars?',
    choices: [
      'The council made the seminar shorter.',
      'The barangay required every household to join.',
      'Reports from the first participants about buying less water persuaded others.',
      'Dengue cases in the barangay dropped sharply.',
    ],
    answer: 2,
    why: "Right after describing the savings, the passage says 'Their stories spread quickly' and that more families joined. Nothing is said about a shorter seminar, a requirement, or dengue figures.",
  },
  {
    id: 'V-045', section: 'verbal', topic: 'reading-comprehension', lang: 'en', stim: P2,
    q: 'What problem were the two walk-in windows meant to address?',
    choices: [
      'The website stopped working during busy hours.',
      'Text messages were not reaching applicants.',
      'Relatives were charging high fees to book slots.',
      'Applicants who could not easily book online were being sent home.',
    ],
    answer: 3,
    why: "The passage says some applicants arrived without an appointment and were asked to come back another day, and the walk-in windows followed the complaints. The passage mentions relatives booking slots for pay, but not that the fees were high or that this was the problem being fixed.",
  },
  {
    id: 'V-046', section: 'verbal', topic: 'reading-comprehension', lang: 'en', stim: P2,
    q: 'Which best describes the attitude of the head of the office toward the new system?',
    choices: [
      'Realistic about its flaws but convinced it is an improvement',
      'Regretful about replacing the old line',
      'Defensive and dismissive of complaints',
      'Indifferent to the needs of elderly applicants',
    ],
    answer: 0,
    why: "She 'admits the system is still imperfect' yet argues the old line was harder on the elderly. Admitting flaws rules out 'dismissive', and her concern for elderly applicants rules out 'indifferent'.",
  },
  {
    id: 'V-047', section: 'verbal', topic: 'reading-comprehension', lang: 'en', stim: P2,
    q: 'Which of the following is NOT mentioned as part of the online appointment system?',
    choices: [
      'Choosing a thirty-minute time slot',
      'Receiving a text message confirming the time',
      'Paying the permit fee online',
      'Booking through the municipal website',
    ],
    answer: 2,
    why: "The passage describes choosing a slot on the municipal website and getting a text confirmation, but it never mentions paying fees online. Readers may assume online payment because many systems include it.",
  },
  {
    id: 'V-048', section: 'verbal', topic: 'reading-comprehension', lang: 'en', stim: P3,
    q: 'According to the passage, why do families who earn a daily wage often prefer sachets?',
    choices: [
      'Sachets cost less per gram than large bottles.',
      'Sachets let them buy only what they can afford that day.',
      'Sachets are easier to recycle than bottles.',
      'Large bottles are not sold in sari-sari stores.',
    ],
    answer: 1,
    why: "The passage says the sachet 'lets them buy only what they can afford that day'. The first choice is the trap: the passage says the price per gram is actually higher than that of a large bottle.",
  },
  {
    id: 'V-049', section: 'verbal', topic: 'reading-comprehension', lang: 'en', stim: P3,
    q: "The author mentions the store owners' complaint mainly to show that",
    choices: [
      'banning sachets in one town may only shift the buying to another town',
      'store owners earn more from sachets than from bottles',
      'customers prefer large bottles to sachets',
      'manufacturers oppose refill stations',
    ],
    answer: 0,
    why: "The complaint is that customers 'simply buy the same products in the next town', which shows a local ban does not reduce sachet use. Nothing in the passage compares store owners' earnings or reports manufacturers' views on refill stations.",
  },
  {
    id: 'V-050', section: 'verbal', topic: 'reading-comprehension', lang: 'en', stim: P3,
    q: 'With which statement would the author most likely agree?',
    choices: [
      'Refill stations will surely replace sachets within a few years.',
      'Sachets should be banned nationwide at once.',
      'Families should stop buying products in small amounts.',
      'Refill stations can spread only if they stay as convenient and cheap as sachets.',
    ],
    answer: 3,
    why: "The last sentence says the spread of refill stations depends on whether they remain as convenient and cheap as sachets. The author calls them 'more promising', not certain, and describes buying small amounts as sensible for daily-wage families.",
  },
  {
    id: 'V-051', section: 'verbal', topic: 'reading-comprehension', lang: 'en', stim: P4,
    q: 'What is the main point of the passage?',
    choices: [
      'Stores in the town never keep enough candles.',
      'Grandchildren should always obey their grandparents.',
      "Lola Pacing's careful preparation, once teased, proved its worth and was taken up by her family.",
      'Typhoons in the town usually cause blackouts that last nine days.',
    ],
    answer: 2,
    why: "The passage moves from the grandchildren teasing her, to the typhoon that proved her right, to the grandson continuing the habit. The moral about obeying grandparents is never stated, and the nine-day blackout happened once, not usually.",
  },
  {
    id: 'V-052', section: 'verbal', topic: 'reading-comprehension', lang: 'en', stim: P4,
    q: "The sentence 'They stopped laughing the year a strong typhoon cut the power' suggests that the grandchildren",
    choices: [
      'were scolded by their grandmother',
      'came to see the value of her preparations',
      'were too frightened by the storm to speak',
      'lost interest in the biscuit tin',
    ],
    answer: 1,
    why: "During the blackout, Lola Pacing had light and dry documents while neighbors had none, and later her grandson took over the yearly check. This shows a change of mind, not fear or loss of interest.",
  },
  {
    id: 'V-053', section: 'verbal', topic: 'reading-comprehension', lang: 'fil', stim: P5,
    q: 'Ayon sa teksto, ano ang dahilan kung bakit sinimulan ang gulayan sa barangay?',
    choices: [
      'Upang magkaroon ng kita ang sangguniang barangay',
      'Upang magamit ang compost mula sa tirang pagkain',
      'Dahil iniutos ito ng munisipyo',
      'Dahil maraming pamilya ang hindi makabili ng sapat na gulay',
    ],
    answer: 3,
    why: "The first paragraph says the captain noticed many families could no longer buy enough vegetables, so the council turned the vacant lot into a garden. Selling surplus and making compost came later and were not the reason the project started.",
  },
  {
    id: 'V-054', section: 'verbal', topic: 'reading-comprehension', lang: 'fil', stim: P5,
    q: 'Ano ang naging tulong ng agriculturist mula sa munisipyo?',
    choices: [
      'Tinuruan niya ang mga residente na gumawa ng compost.',
      'Itinaboy niya ang mga ligaw na manok.',
      'Nagbigay siya ng binhi ng pechay, talong, at sitaw.',
      'Siya ang nagdilig ng mga halaman tuwing umaga.',
    ],
    answer: 0,
    why: "The passage says that with the agriculturist's help, residents learned to make compost from food scraps and dry leaves. Seeds are bought with the garden's income, and the residents themselves took turns watering.",
  },
  {
    id: 'V-055', section: 'verbal', topic: 'reading-comprehension', lang: 'fil', stim: P5,
    q: 'Para kay Kapitana Lorna, ano ang pinakamahalagang naibigay ng proyekto bukod sa pagkain?',
    choices: [
      'Ang malaking kita mula sa pagbebenta ng gulay',
      'Ang muling pagtutulungan ng magkakapitbahay',
      'Ang pagkatuto ng mga residente sa pagtatanim',
      'Ang paggamit ng bakanteng lote sa likod ng covered court',
    ],
    answer: 1,
    why: "The last sentence says the project gave more than food: neighbors learned to help one another again. Learning to farm is true but is not what she names, and the passage says the produce sells at a low price, not for big profit.",
  },
];
