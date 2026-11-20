const faqEntries = [
  {
    matches: /\b(contact|email|e-mail|reach|linkedin|facebook|social links?)\b|যোগাযোগ|ইমেইল|মেইল|লিংকডইন|ফেসবুক|jogajog|email.*ki|kothay.*(contact|pabo)|github.*(link|profile)/i,
    answers: {
      en: 'Email: emdadulhaqueemu2@gmail.com. GitHub: https://github.com/emumondol. LinkedIn: https://www.linkedin.com/in/emdadul-haque-emu-93574b256. Facebook is linked in the portfolio contact section.',
      bn: 'ইমেইল: emdadulhaqueemu2@gmail.com। GitHub: https://github.com/emumondol। LinkedIn: https://www.linkedin.com/in/emdadul-haque-emu-93574b256। Facebook লিংকটি পোর্টফোলিওর Contact অংশে আছে।',
      banglish: 'Email: emdadulhaqueemu2@gmail.com. GitHub: https://github.com/emumondol. LinkedIn: https://www.linkedin.com/in/emdadul-haque-emu-93574b256. Facebook link portfolio-r Contact section-e ache.'
    }
  },
  {
    matches: /\b(education|stud(y|ies)|university|degree|academic|department|SWE|DIU|Daffodil)\b|শিক্ষা|বিশ্ববিদ্যালয়|বিশ্ববিদ্যালয়|পড়াশোনা|পড়াশোনা|বিভাগ|শিক্ষার্থী|porashona|kothay pori/i,
    answers: {
      en: 'Emdadul is a Software Engineering (SWE) student at Daffodil International University. His expected completion date is December 31, 2028.',
      bn: 'এমদাদুল Daffodil International University-এর Software Engineering (SWE) বিভাগের শিক্ষার্থী। প্রত্যাশিত সমাপ্তির তারিখ ৩১ ডিসেম্বর ২০২৮।',
      banglish: 'Emdadul Daffodil International University-r Software Engineering (SWE) department-er student. Expected completion December 31, 2028.'
    }
  },
  {
    matches: /\b(certificates?|certifications?|seminar|intellipaat|SQL course|achievements?|awards?)\b|সার্টিফিকেট|সনদ|সেমিনার|অর্জন|certificate|sonod/i,
    answers: {
      en: 'Emu has an Intellipaat Free SQL Certification Course certificate, issued March 24, 2026 (ID: 25871-443-619275). He also participated in DIU’s Day Long Seminar on Career Planning Roadmap on April 16, 2026.',
      bn: 'এমদাদুলের Intellipaat Free SQL Certification Course-এর সনদ ২৪ মার্চ ২০২৬ তারিখে ইস্যু করা হয়েছে (ID: 25871-443-619275)। তিনি ১৬ এপ্রিল ২০২৬-এ DIU-এর Day Long Seminar on Career Planning Roadmap-এ অংশ নেন।',
      banglish: 'Emu-r Intellipaat Free SQL Certification Course certificate issue hoy March 24, 2026 (ID: 25871-443-619275). Tini April 16, 2026-e DIU Day Long Seminar on Career Planning Roadmap-e participate korechen.'
    }
  },
  {
    matches: /\b(projects?|github|repositories|repos|portfolio work)\b|প্রজেক্ট|প্রকল্প|রিপোজিটরি|কাজের নমুনা|project/i,
    answers: {
      en: 'The GitHub profile currently has no public repositories. The portfolio shows project concepts as ideas, not as completed projects.',
      bn: 'GitHub প্রোফাইলে বর্তমানে কোনো public repository নেই। পোর্টফোলিওতে দেখানো project concept-গুলো ধারণা—সম্পন্ন প্রজেক্ট নয়।',
      banglish: 'GitHub profile-e ekhon kono public repository nei. Portfolio-r project concept-gulo idea, completed project hisebe dekhano hoyni.'
    }
  },
  {
    matches: /\b(experience|employment|employer|job|career|roles?|responsibilit(y|ies)|work history)\b|চাকরি|অভিজ্ঞতা|কাজের ইতিহাস|দায়িত্ব|দায়িত্ব|chakri|oviggota/i,
    answers: {
      en: 'No employer, job title, or employment dates are verified. Emu is focused on practical software projects and developing his technical skills.',
      bn: 'কোনো নিয়োগকর্তা, চাকরির পদ বা চাকরির সময়কাল যাচাই করা নেই। এমদাদুল বর্তমানে সফটওয়্যার প্রজেক্ট ও প্রযুক্তিগত দক্ষতা উন্নয়নে মনোযোগী।',
      banglish: 'Kono employer, job title, ba employment date verify kora nei. Emdadul practical software project ar technical skill develop korar upor focus korchen.'
    }
  },
  {
    matches: /\b(skills?|technologies|tech stack|programming languages?|proficiency|percentages?)\b|দক্ষতা|স্কিল|প্রযুক্তি|টেকনোলজি|দক্ষতার|percentage|koto percent/i,
    answers: {
      en: 'Emu’s self-reported skill estimates are HTML 85%, JavaScript 70%, Java 75%, CSS 80%, and C 85%. He also completed Intellipaat’s Free SQL Certification Course.',
      bn: 'এমদাদুলের দেওয়া দক্ষতার শতাংশ: HTML ৮৫%, JavaScript ৭০%, Java ৭৫%, CSS ৮০% এবং C ৮৫%। তিনি Intellipaat-এর Free SQL Certification Course-ও সম্পন্ন করেছেন।',
      banglish: 'Emu-r deya skill estimate: HTML 85%, JavaScript 70%, Java 75%, CSS 80%, ar C 85%. Tini Intellipaat Free SQL Certification Course-o complete korechen.'
    }
  },
  {
    matches: /\b(about emu|about emdadul|about him|who is|introduce|biography|background)\b|এমদাদুল.{0,15}সম্পর্কে|এমুর.{0,15}সম্পর্কে|সম্পর্কে.{0,15}এমদাদুল|সম্পর্কে.{0,15}এমু|(?:my|your|his|Emu'?s|Emdadul'?s|this)\s+portfolio|portfolio.{0,20}(?:Emu|Emdadul|his|my|your)|আমার পোর্টফোলিও|তোমার পোর্টফোলিও|এই পোর্টফোলিও|amar portfolio|tomar portfolio|ei portfolio|tumi ke/i,
    answers: {
      en: 'Emdadul Haque Emu is a Software Engineering student at Daffodil International University who is interested in useful software, problem solving, and continuous learning.',
      bn: 'এমদাদুল হক এমু Daffodil International University-এর Software Engineering বিভাগের শিক্ষার্থী। তিনি কার্যকর সফটওয়্যার, সমস্যা সমাধান ও ধারাবাহিক শেখার প্রতি আগ্রহী।',
      banglish: 'Emdadul Haque Emu Daffodil International University-r Software Engineering student. Tini useful software, problem solving, ar continuous learning-e interested.'
    }
  }
];

const outOfScope = {
  en: 'I can only answer questions about Emdadul’s portfolio, such as his skills, education, projects, certificates, experience, and contact details.',
  bn: 'আমি শুধু এমদাদুলের পোর্টফোলিও—যেমন দক্ষতা, পড়াশোনা, প্রজেক্ট, সনদ, অভিজ্ঞতা ও যোগাযোগ—সম্পর্কিত প্রশ্নের উত্তর দিতে পারি।',
  banglish: 'Ami sudhu Emdadul-er portfolio—skills, education, project, certificate, experience, ar contact—niye prosner uttor dite pari.'
};

const detectLanguage = question => {
  if (/[\u0980-\u09ff]/.test(question)) return 'bn';
  if (/\b(ami|amar|apni|apnar|tumi|tomar|tar|ki|kemon|kothay|porashona|jogajog|bolun|ache|ase|kore|koren|koro|gula|gulo|niye|hoy|hobe|koto)\b/i.test(question)) return 'banglish';
  return 'en';
};

export function getPortfolioFaqReply(question) {
  const text = typeof question === 'string' ? question.trim() : '';
  const language = detectLanguage(text);
  if (!text) return outOfScope[language];
  const asksGeneralQuestion = /\b(what (is|are|does|do)|how (to|do i|can i)|define|explain|teach me|tutorial|recipe|capital of|weather|joke)\b/i.test(text);
  const mentionsPortfolioOwner = /\b(Emu|Emdadul|his|him|your|you|my)\b|(?:amar|tomar|tar)\b|আমার|তোমার|তার|এমু|এমদাদুল/i.test(text);
  if (asksGeneralQuestion && !mentionsPortfolioOwner) return outOfScope[language];
  const answers = faqEntries
    .filter(entry => entry.matches.test(text))
    .map(entry => entry.answers[language]);
  return answers.length ? answers.join('\n\n') : outOfScope[language];
}
