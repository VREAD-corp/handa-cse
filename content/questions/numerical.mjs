// Handa CSE: Numerical Ability (basic operations, number sequence, word problems). Original items, N-001 to N-045.
export default [
  {
    "id": "N-001",
    "section": "numerical",
    "topic": "basic-operations",
    "lang": "en",
    "q": "What is 3/4 + 5/6?",
    "choices": [
      "1 7/12",
      "8/10",
      "15/24",
      "1 5/12"
    ],
    "answer": 0,
    "why": "Use the common denominator 12: 3/4 = 9/12 and 5/6 = 10/12, so the sum is 19/12 = 1 7/12. The trap 8/10 comes from adding numerators and denominators separately, and 15/24 comes from multiplying instead of adding."
  },
  {
    "id": "N-002",
    "section": "numerical",
    "topic": "basic-operations",
    "lang": "en",
    "q": "Evaluate: 48 − 6 × 5 + 12 ÷ 4",
    "choices": [
      "15",
      "55.5",
      "21",
      "7.5"
    ],
    "answer": 2,
    "why": "Multiply and divide first: 6 × 5 = 30 and 12 ÷ 4 = 3. Then 48 − 30 + 3 = 21. Working left to right without the order of operations gives 55.5, and subtracting the sum (48 − 33) gives 15."
  },
  {
    "id": "N-003",
    "section": "numerical",
    "topic": "basic-operations",
    "lang": "en",
    "q": "What is 2.5 × 0.04?",
    "choices": [
      "1",
      "0.1",
      "0.01",
      "0.001"
    ],
    "answer": 1,
    "why": "25 × 4 = 100, and the factors have 1 + 2 = 3 decimal places, so the product is 0.100 = 0.1. Counting only two decimal places gives 1, and counting four gives 0.01."
  },
  {
    "id": "N-004",
    "section": "numerical",
    "topic": "basic-operations",
    "lang": "en",
    "q": "What is 35% of 240?",
    "choices": [
      "72",
      "96",
      "8.4",
      "84"
    ],
    "answer": 3,
    "why": "10% of 240 is 24, so 30% is 72 and 5% is 12; 72 + 12 = 84. 72 is only 30%, and 8.4 comes from misplacing the decimal point."
  },
  {
    "id": "N-005",
    "section": "numerical",
    "topic": "basic-operations",
    "lang": "en",
    "q": "15 is what percent of 60?",
    "choices": [
      "4%",
      "40%",
      "75%",
      "25%"
    ],
    "answer": 3,
    "why": "15 ÷ 60 = 1/4 = 25%. Dividing the other way (60 ÷ 15 = 4) leads to 4%, and 75% is the part of 60 that is not 15."
  },
  {
    "id": "N-006",
    "section": "numerical",
    "topic": "basic-operations",
    "lang": "en",
    "q": "Evaluate: (−8) × (−3) − (−5)",
    "choices": [
      "19",
      "29",
      "−19",
      "−29"
    ],
    "answer": 1,
    "why": "A negative times a negative is positive: (−8) × (−3) = 24. Subtracting a negative means adding: 24 − (−5) = 24 + 5 = 29. Treating \"− (−5)\" as \"− 5\" gives the trap answer 19."
  },
  {
    "id": "N-007",
    "section": "numerical",
    "topic": "basic-operations",
    "lang": "en",
    "q": "What is 7.2 ÷ 0.08?",
    "choices": [
      "90",
      "9",
      "0.9",
      "900"
    ],
    "answer": 0,
    "why": "Move both decimal points two places to the right: 7.2 ÷ 0.08 = 720 ÷ 8 = 90. Misreading 0.08 as 0.8 gives 9, and as 0.008 gives 900."
  },
  {
    "id": "N-008",
    "section": "numerical",
    "topic": "basic-operations",
    "lang": "en",
    "q": "What is (2/3) ÷ (4/9)?",
    "choices": [
      "8/27",
      "2/3",
      "1 1/2",
      "1 1/3"
    ],
    "answer": 2,
    "why": "Dividing by a fraction means multiplying by its reciprocal: 2/3 × 9/4 = 18/12 = 3/2 = 1 1/2. Multiplying the fractions directly (2/3 × 4/9) gives the trap 8/27."
  },
  {
    "id": "N-009",
    "section": "numerical",
    "topic": "basic-operations",
    "lang": "en",
    "q": "If a : b = 3 : 4 and b : c = 2 : 5, what is a : c?",
    "choices": [
      "3 : 5",
      "3 : 10",
      "6 : 5",
      "2 : 5"
    ],
    "answer": 1,
    "why": "Make the b terms equal: b : c = 2 : 5 = 4 : 10, so a : b : c = 3 : 4 : 10 and a : c = 3 : 10. Simply pairing the first and last numbers (3 : 5) ignores that b has different values in the two ratios."
  },
  {
    "id": "N-010",
    "section": "numerical",
    "topic": "basic-operations",
    "lang": "en",
    "q": "Evaluate: 5 + 3² × 2 − (10 − 4) ÷ 3",
    "choices": [
      "26",
      "17",
      "15",
      "21"
    ],
    "answer": 3,
    "why": "Parentheses first (10 − 4 = 6), then the exponent (3² = 9), then 9 × 2 = 18 and 6 ÷ 3 = 2. So 5 + 18 − 2 = 21. Adding 5 + 9 before multiplying gives 26, and forgetting to divide 6 by 3 gives 17."
  },
  {
    "id": "N-011",
    "section": "numerical",
    "topic": "basic-operations",
    "lang": "en",
    "q": "Which fraction is equal to 0.375?",
    "choices": [
      "3/5",
      "5/8",
      "3/8",
      "7/20"
    ],
    "answer": 2,
    "why": "0.375 = 375/1000; dividing both by 125 gives 3/8. 3/5 = 0.6 and 5/8 = 0.625 come from guessing from the digits, and 7/20 = 0.35 is close but not equal."
  },
  {
    "id": "N-012",
    "section": "numerical",
    "topic": "basic-operations",
    "lang": "en",
    "q": "Which of the following has the greatest value?",
    "choices": [
      "5/8",
      "0.61",
      "62%",
      "7/12"
    ],
    "answer": 0,
    "why": "Convert all to decimals: 5/8 = 0.625, 0.61, 62% = 0.62, and 7/12 is about 0.583. The greatest is 5/8. 62% is the tempting choice because it looks like the largest number, but 0.62 is less than 0.625."
  },
  {
    "id": "N-013",
    "section": "numerical",
    "topic": "basic-operations",
    "lang": "en",
    "q": "A price goes up from ₱80 to ₱100. What is the percent increase?",
    "choices": [
      "25%",
      "20%",
      "80%",
      "125%"
    ],
    "answer": 0,
    "why": "Percent increase = increase ÷ original = 20 ÷ 80 = 25%. Dividing by the new price (20 ÷ 100 = 20%) is the common mistake, and 125% is the new price as a percent of the old one."
  },
  {
    "id": "N-014",
    "section": "numerical",
    "topic": "basic-operations",
    "lang": "en",
    "q": "What is 5 1/4 − 2 2/3?",
    "choices": [
      "3 5/12",
      "2 5/12",
      "2 7/12",
      "3 1/12"
    ],
    "answer": 2,
    "why": "Convert to twelfths: 5 1/4 = 63/12 and 2 2/3 = 32/12, so the difference is 31/12 = 2 7/12. Subtracting the smaller fraction from the larger (2/3 − 1/4 = 5/12) and writing 3 5/12 is the usual trap; you must borrow 1 from the whole number."
  },
  {
    "id": "N-015",
    "section": "numerical",
    "topic": "basic-operations",
    "lang": "en",
    "q": "Evaluate: (0.5)² + 1/4 × 0.8 − 0.1",
    "choices": [
      "0.3",
      "0.35",
      "0.6",
      "1.1"
    ],
    "answer": 1,
    "why": "(0.5)² = 0.25 and 1/4 × 0.8 = 0.2, so 0.25 + 0.2 − 0.1 = 0.35. Adding 0.25 + 1/4 before multiplying gives 0.3, and treating (0.5)² as 0.5 gives 0.6."
  },
  {
    "id": "N-016",
    "section": "numerical",
    "topic": "number-sequence",
    "lang": "en",
    "q": "What is the next number? 7, 12, 17, 22, ___",
    "choices": [
      "28",
      "26",
      "32",
      "27"
    ],
    "answer": 3,
    "why": "Each term is 5 more than the one before: 22 + 5 = 27. 32 would mean adding 10, which does not fit any step in the series."
  },
  {
    "id": "N-017",
    "section": "numerical",
    "topic": "number-sequence",
    "lang": "en",
    "q": "What is the next number? 95, 88, 81, 74, ___",
    "choices": [
      "68",
      "66",
      "60",
      "67"
    ],
    "answer": 3,
    "why": "The series goes down by 7 each time: 74 − 7 = 67. 60 subtracts 14, which skips a term."
  },
  {
    "id": "N-018",
    "section": "numerical",
    "topic": "number-sequence",
    "lang": "en",
    "q": "What is the next number? 2, 6, 18, 54, ___",
    "choices": [
      "108",
      "162",
      "72",
      "216"
    ],
    "answer": 1,
    "why": "Each term is multiplied by 3: 54 × 3 = 162. 108 doubles 54 instead of tripling it, and 72 adds 18 as if the series were arithmetic."
  },
  {
    "id": "N-019",
    "section": "numerical",
    "topic": "number-sequence",
    "lang": "en",
    "q": "What is the next number? 1, 4, 9, 16, 25, ___",
    "choices": [
      "36",
      "30",
      "34",
      "49"
    ],
    "answer": 0,
    "why": "These are the perfect squares 1², 2², 3², 4², 5², so the next is 6² = 36. The differences 3, 5, 7, 9 also point to +11. 30 adds 5 again, which ignores the growing differences."
  },
  {
    "id": "N-020",
    "section": "numerical",
    "topic": "number-sequence",
    "lang": "en",
    "q": "What is the next number? 5, 7, 11, 17, 25, ___",
    "choices": [
      "33",
      "37",
      "35",
      "41"
    ],
    "answer": 2,
    "why": "The differences are 2, 4, 6, 8, so the next difference is 10: 25 + 10 = 35. 33 repeats the last difference of 8."
  },
  {
    "id": "N-021",
    "section": "numerical",
    "topic": "number-sequence",
    "lang": "en",
    "q": "What is the next number? 4, 8, 6, 12, 10, 20, ___",
    "choices": [
      "40",
      "18",
      "22",
      "16"
    ],
    "answer": 1,
    "why": "The rule alternates \"multiply by 2\" and \"subtract 2\": 4 × 2 = 8, 8 − 2 = 6, 6 × 2 = 12, 12 − 2 = 10, 10 × 2 = 20, so next is 20 − 2 = 18. 40 doubles twice in a row and breaks the alternation."
  },
  {
    "id": "N-022",
    "section": "numerical",
    "topic": "number-sequence",
    "lang": "en",
    "q": "What is the next number? 3, 20, 6, 18, 9, 16, 12, ___",
    "choices": [
      "15",
      "13",
      "24",
      "14"
    ],
    "answer": 3,
    "why": "Two series are interleaved. The 1st, 3rd, 5th, 7th terms go 3, 6, 9, 12 (+3), and the 2nd, 4th, 6th terms go 20, 18, 16 (−2). The 8th term belongs to the second series: 16 − 2 = 14. 15 continues the wrong series (12 + 3)."
  },
  {
    "id": "N-023",
    "section": "numerical",
    "topic": "number-sequence",
    "lang": "en",
    "q": "What is the next number? 1, 50, 2, 45, 4, 40, 8, ___",
    "choices": [
      "16",
      "30",
      "35",
      "36"
    ],
    "answer": 2,
    "why": "Odd-position terms double (1, 2, 4, 8) and even-position terms drop by 5 (50, 45, 40). The next term is in the even-position series: 40 − 5 = 35. 16 is the trap: it is the next term of the doubling series, which comes one place later."
  },
  {
    "id": "N-024",
    "section": "numerical",
    "topic": "number-sequence",
    "lang": "en",
    "q": "What is the next number? 81, 27, 9, 3, ___",
    "choices": [
      "1",
      "0",
      "1/3",
      "−3"
    ],
    "answer": 0,
    "why": "Each term is divided by 3: 3 ÷ 3 = 1. 0 and −3 assume a subtraction pattern, which does not fit 81 to 27."
  },
  {
    "id": "N-025",
    "section": "numerical",
    "topic": "number-sequence",
    "lang": "en",
    "q": "What is the next number? 1, 8, 27, 64, ___",
    "choices": [
      "125",
      "100",
      "81",
      "216"
    ],
    "answer": 0,
    "why": "These are cubes: 1³, 2³, 3³, 4³, so the next is 5³ = 125. 100 and 81 are squares (10² and 9²), and 216 = 6³ skips a term."
  },
  {
    "id": "N-026",
    "section": "numerical",
    "topic": "number-sequence",
    "lang": "en",
    "q": "What number is missing? 2, 5, ___, 17, 26, 37",
    "choices": [
      "11",
      "9",
      "10",
      "12"
    ],
    "answer": 2,
    "why": "Each term is a perfect square plus 1: 1+1, 4+1, 9+1, 16+1, 25+1, 36+1. The missing term is 9 + 1 = 10. The differences 3, 5, 7, 9, 11 confirm it (5 + 5 = 10 and 10 + 7 = 17)."
  },
  {
    "id": "N-027",
    "section": "numerical",
    "topic": "number-sequence",
    "lang": "en",
    "q": "What is the next number? 5, 10, 13, 26, 29, ___",
    "choices": [
      "32",
      "58",
      "55",
      "52"
    ],
    "answer": 1,
    "why": "The rule alternates \"multiply by 2\" and \"add 3\": 5 × 2 = 10, 10 + 3 = 13, 13 × 2 = 26, 26 + 3 = 29, so next is 29 × 2 = 58. 32 adds 3 twice in a row."
  },
  {
    "id": "N-028",
    "section": "numerical",
    "topic": "word-problems",
    "lang": "en",
    "q": "Aling Rosa buys 3 dozen eggs at ₱90 per dozen and sells every egg at ₱9 each. What is her total profit if she sells all the eggs?",
    "choices": [
      "₱18",
      "₱270",
      "₱324",
      "₱54"
    ],
    "answer": 3,
    "why": "Cost: 3 × ₱90 = ₱270. Sales: 36 eggs × ₱9 = ₱324. Profit: ₱324 − ₱270 = ₱54. ₱18 is the profit on only one dozen, and ₱324 is the total sales, not the profit."
  },
  {
    "id": "N-029",
    "section": "numerical",
    "topic": "word-problems",
    "lang": "en",
    "q": "A rice cooker is priced at ₱2,400. During a sale it is offered at 15% off. What is the sale price?",
    "choices": [
      "₱360",
      "₱2,385",
      "₱2,160",
      "₱2,040"
    ],
    "answer": 3,
    "why": "15% of ₱2,400 = ₱360, so the sale price is ₱2,400 − ₱360 = ₱2,040. ₱360 is only the discount, and ₱2,385 subtracts ₱15 instead of 15%."
  },
  {
    "id": "N-030",
    "section": "numerical",
    "topic": "word-problems",
    "lang": "en",
    "q": "A school bag tagged at ₱1,500 is sold with a 20% discount, and members get an additional 10% off the discounted price. How much does a member pay?",
    "choices": [
      "₱1,050",
      "₱1,080",
      "₱1,200",
      "₱1,350"
    ],
    "answer": 1,
    "why": "After 20% off: ₱1,500 × 0.80 = ₱1,200. Another 10% off: ₱1,200 × 0.90 = ₱1,080. Adding the discounts to get 30% off (₱1,050) is the trap, because the 10% is taken from the already reduced price."
  },
  {
    "id": "N-031",
    "section": "numerical",
    "topic": "word-problems",
    "lang": "en",
    "q": "A cooperative lends ₱20,000 to a member at 6% simple interest per year. How much interest is due after 2 years and 6 months?",
    "choices": [
      "₱3,000",
      "₱2,400",
      "₱3,600",
      "₱23,000"
    ],
    "answer": 0,
    "why": "Simple interest = principal × rate × time = ₱20,000 × 0.06 × 2.5 = ₱3,000. Using 2 years gives ₱2,400, and ₱23,000 is the total amount (principal plus interest), not the interest."
  },
  {
    "id": "N-032",
    "section": "numerical",
    "topic": "word-problems",
    "lang": "en",
    "q": "A deposit of ₱15,000 earns ₱1,800 in simple interest after 3 years. What is the annual interest rate?",
    "choices": [
      "12%",
      "3%",
      "4%",
      "6%"
    ],
    "answer": 2,
    "why": "Rate = interest ÷ (principal × time) = ₱1,800 ÷ (₱15,000 × 3) = ₱1,800 ÷ ₱45,000 = 0.04 = 4%. Forgetting to divide by the 3 years gives 12%, which is the total over three years."
  },
  {
    "id": "N-033",
    "section": "numerical",
    "topic": "word-problems",
    "lang": "en",
    "q": "Kiko can paint the barangay hall fence alone in 6 hours. Lito can paint it alone in 12 hours. Working together at these rates, how long will they take?",
    "choices": [
      "9 hours",
      "4 hours",
      "18 hours",
      "3 hours"
    ],
    "answer": 1,
    "why": "Kiko does 1/6 of the job per hour and Lito 1/12, together 2/12 + 1/12 = 3/12 = 1/4 per hour, so the job takes 4 hours. 9 hours is the average of 6 and 12, which would be slower than Kiko working alone."
  },
  {
    "id": "N-034",
    "section": "numerical",
    "topic": "word-problems",
    "lang": "en",
    "q": "An inlet pipe can fill a water tank in 4 hours, and a drain can empty the full tank in 6 hours. If the tank starts empty and both are open, how long will it take to fill the tank?",
    "choices": [
      "2.4 hours",
      "10 hours",
      "5 hours",
      "12 hours"
    ],
    "answer": 3,
    "why": "Net rate = 1/4 − 1/6 = 3/12 − 2/12 = 1/12 of the tank per hour, so filling takes 12 hours. Adding the rates (1/4 + 1/6 = 5/12, about 2.4 hours) is the trap: the drain works against the pipe."
  },
  {
    "id": "N-035",
    "section": "numerical",
    "topic": "word-problems",
    "lang": "en",
    "q": "A jeepney travels 45 km from Barangay Dalisay to the town proper at an average speed of 30 km per hour. How long is the trip?",
    "choices": [
      "1 hour 50 minutes",
      "1 hour 15 minutes",
      "1 hour 30 minutes",
      "2 hours"
    ],
    "answer": 2,
    "why": "Time = distance ÷ speed = 45 ÷ 30 = 1.5 hours = 1 hour 30 minutes. Reading 1.5 hours as \"1 hour 50 minutes\" is the common error; half an hour is 30 minutes."
  },
  {
    "id": "N-036",
    "section": "numerical",
    "topic": "word-problems",
    "lang": "en",
    "q": "A bus travels the first 60 km of a trip at 60 km per hour and the next 60 km at 40 km per hour. What is its average speed for the whole 120 km?",
    "choices": [
      "48 km per hour",
      "50 km per hour",
      "45 km per hour",
      "52 km per hour"
    ],
    "answer": 0,
    "why": "Time for the first part: 60 ÷ 60 = 1 hour; second part: 60 ÷ 40 = 1.5 hours. Average speed = total distance ÷ total time = 120 ÷ 2.5 = 48 km per hour. Averaging the two speeds (50) is wrong because the bus spends more time at the slower speed."
  },
  {
    "id": "N-037",
    "section": "numerical",
    "topic": "word-problems",
    "lang": "en",
    "q": "Mrs. Dimaculangan is now 4 times as old as her son. In 20 years, she will be twice as old as her son. How old is Mrs. Dimaculangan now?",
    "choices": [
      "40",
      "10",
      "60",
      "30"
    ],
    "answer": 0,
    "why": "Let the son be s, so the mother is 4s. In 20 years: 4s + 20 = 2(s + 20), so 4s + 20 = 2s + 40 and s = 10. The mother is 4 × 10 = 40. 10 is the son's age and 60 is the mother's age 20 years from now."
  },
  {
    "id": "N-038",
    "section": "numerical",
    "topic": "word-problems",
    "lang": "en",
    "q": "The sum of the ages of Ben and his sister is 30. Ben is 6 years older than his sister. How old is Ben?",
    "choices": [
      "12",
      "24",
      "18",
      "15"
    ],
    "answer": 2,
    "why": "Sister = x, Ben = x + 6, so 2x + 6 = 30 and x = 12. Ben is 12 + 6 = 18. 12 is the sister's age, and 24 adds 6 to 18 by mistake."
  },
  {
    "id": "N-039",
    "section": "numerical",
    "topic": "word-problems",
    "lang": "en",
    "q": "A canteen has 12 liters of a juice drink that is 25% concentrate. How many liters of water must be added so that the drink becomes 20% concentrate?",
    "choices": [
      "15 liters",
      "3 liters",
      "0.6 liters",
      "2.4 liters"
    ],
    "answer": 1,
    "why": "The concentrate is 25% of 12 = 3 liters and does not change. For it to be 20% of the total, the total must be 3 ÷ 0.20 = 15 liters, so add 15 − 12 = 3 liters of water. 15 liters is the new total volume, not the water to add."
  },
  {
    "id": "N-040",
    "section": "numerical",
    "topic": "word-problems",
    "lang": "en",
    "q": "A store mixes 10 kg of rice costing ₱50 per kg with 15 kg of rice costing ₱40 per kg. What is the cost per kilogram of the mixture?",
    "choices": [
      "₱45",
      "₱46",
      "₱42",
      "₱44"
    ],
    "answer": 3,
    "why": "Total cost: 10 × ₱50 + 15 × ₱40 = ₱500 + ₱600 = ₱1,100 for 25 kg, so ₱1,100 ÷ 25 = ₱44 per kg. Taking the simple average of ₱50 and ₱40 (₱45) ignores that there is more of the cheaper rice."
  },
  {
    "id": "N-041",
    "section": "numerical",
    "topic": "word-problems",
    "lang": "en",
    "q": "Joy's scores in four quizzes are 85, 90, 78 and 92. What score must she get on the fifth quiz to have an average of 88 for all five?",
    "choices": [
      "88",
      "90",
      "86",
      "95"
    ],
    "answer": 3,
    "why": "An average of 88 over five quizzes needs a total of 5 × 88 = 440. Her four scores add up to 85 + 90 + 78 + 92 = 345, so she needs 440 − 345 = 95. Answering 88 assumes the fifth score only has to equal the target average."
  },
  {
    "id": "N-042",
    "section": "numerical",
    "topic": "word-problems",
    "lang": "en",
    "q": "A municipality has a ₱12,000,000 development fund. It gives 40% to infrastructure and 25% to health, and splits the rest equally between education and agriculture. How much goes to education?",
    "choices": [
      "₱4,200,000",
      "₱2,100,000",
      "₱3,000,000",
      "₱1,750,000"
    ],
    "answer": 1,
    "why": "Infrastructure and health take 40% + 25% = 65%, leaving 35%. Education gets half of that, 17.5%: ₱12,000,000 × 0.175 = ₱2,100,000. ₱4,200,000 is the whole remainder before splitting it, and ₱3,000,000 is the health share."
  },
  {
    "id": "N-043",
    "section": "numerical",
    "topic": "word-problems",
    "lang": "en",
    "q": "A barangay divides ₱450,000 among three puroks in the ratio 2 : 3 : 4. How much does the purok with the largest share receive?",
    "choices": [
      "₱200,000",
      "₱150,000",
      "₱100,000",
      "₱180,000"
    ],
    "answer": 0,
    "why": "There are 2 + 3 + 4 = 9 parts, so one part is ₱450,000 ÷ 9 = ₱50,000. The largest share is 4 × ₱50,000 = ₱200,000. ₱150,000 is an equal three-way split (and also the middle share), and ₱100,000 is the smallest share."
  },
  {
    "id": "N-044",
    "section": "numerical",
    "topic": "word-problems",
    "lang": "en",
    "q": "A provincial office has 240 employees, and 45% of them are women. How many of the employees are men?",
    "choices": [
      "108",
      "120",
      "132",
      "195"
    ],
    "answer": 2,
    "why": "Men make up 100% − 45% = 55% of the staff: 240 × 0.55 = 132. 108 is the number of women (45% of 240), which answers the wrong question."
  },
  {
    "id": "N-045",
    "section": "numerical",
    "topic": "word-problems",
    "lang": "en",
    "q": "A sari-sari store sells a can of sardines for ₱39, which is the cost plus a 30% markup on cost. What is the cost of one can?",
    "choices": [
      "₱27.30",
      "₱30",
      "₱9",
      "₱50.70"
    ],
    "answer": 1,
    "why": "Selling price = cost × 1.30, so cost = ₱39 ÷ 1.3 = ₱30 (check: ₱30 + 30% of ₱30 = ₱39). Taking 30% off the selling price (₱39 × 0.70 = ₱27.30) is the trap, because the markup is based on cost, not on the selling price."
  },
];
