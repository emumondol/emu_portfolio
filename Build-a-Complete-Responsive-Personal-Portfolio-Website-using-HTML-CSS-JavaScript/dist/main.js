(() => {
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  document.documentElement.classList.add('js-enabled');

  // Keep the starter's Typed.js headline without making the rest of the page wait on its CDN.
  const startTypedHeadline = () => {
    if (typeof Typed !== 'undefined') new Typed('.text', {
      strings: ['Full-Stack Developer', 'Software Developer', 'Technology Enthusiast'],
      typeSpeed: 75, backSpeed: 45, backDelay: 1300, loop: true
    });
  };
  const typedScript = document.createElement('script');
  typedScript.src = 'https://unpkg.com/typed.js@2.0.15/dist/typed.umd.js';
  typedScript.onload = startTypedHeadline;
  document.head.append(typedScript);

  const header = $('.header');
  const nav = $('.navbar');
  const menuToggle = $('#menu-toggle');
  const closeMenu = () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    $('i', menuToggle).className = 'bx bx-menu';
  };
  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    $('i', menuToggle).className = open ? 'bx bx-x' : 'bx bx-menu';
    nav.classList.toggle('open', open);
  });
  $$('.navbar a').forEach(link => link.addEventListener('click', closeMenu));

  const themeButton = $('.theme-toggle');
  const themeColor = $('meta[name="theme-color"]');
  const savedTheme = localStorage.getItem('emu-theme');
  if (savedTheme === 'light' || savedTheme === 'dark') document.documentElement.dataset.theme = savedTheme;
  const updateThemeButton = () => {
    const light = document.documentElement.dataset.theme === 'light';
    themeButton.setAttribute('aria-label', `Switch to ${light ? 'dark' : 'light'} theme`);
    $('i', themeButton).className = light ? 'bx bx-moon' : 'bx bx-sun';
    themeColor?.setAttribute('content', light ? '#edf3fb' : '#081b29');
  };
  updateThemeButton();
  themeButton.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('emu-theme', next);
    updateThemeButton();
  });

  const sectionLinks = $$('.navbar a');
  const sections = $$('main section[id]');
  if ('IntersectionObserver' in window) {
    const activeObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      sectionLinks.forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
    }), { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach(section => activeObserver.observe(section));
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }), { threshold: .08 });
    $$('.section:not(.home) .section-wrap').forEach(frame => {
      frame.classList.add('reveal'); revealObserver.observe(frame);
    });
  }

  const progress = $('.scroll-progress');
  const updateProgress = () => {
    const range = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${range > 0 ? window.scrollY / range * 100 : 0}%`;
    header.classList.toggle('scrolled', window.scrollY > 30);
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
  $('#year').textContent = new Date().getFullYear();

  $('#contact-form').addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const subject = encodeURIComponent(String(data.get('subject')).trim());
    const body = encodeURIComponent(`Name: ${String(data.get('name')).trim()}\nEmail: ${String(data.get('email')).trim()}\n\n${String(data.get('message')).trim()}`);
    $('#form-status').textContent = 'Opening your email app with a prepared draft…';
    window.location.href = `mailto:emdadulhaqueemu2@gmail.com?subject=${subject}&body=${body}`;
  });

  const certificateModal = $('#certificate-modal');
  const certificateFrame = $('iframe', certificateModal);
  $$('[data-certificate]').forEach(button => button.addEventListener('click', () => {
    certificateFrame.src = button.dataset.certificate;
    certificateFrame.title = button.dataset.certificateTitle;
    certificateModal.showModal();
  }));
  $('#certificate-close').addEventListener('click', () => certificateModal.close());
  certificateModal.addEventListener('click', event => { if (event.target === certificateModal) certificateModal.close(); });

  // SENTI uses only facts verified from the supplied profile details, public GitHub profile, and certificate.
  const launcher = $('#senti-launcher');
  const chatBox = $('#senti-chat-box');
  const input = $('#senti-input');
  const messages = $('#senti-messages');
  const sentiForm = $('#senti-form');
  let history = [];
  const greeting = "Hi! I'm SENTI, Emdadul's personal AI portfolio assistant. I can help you explore his skills, projects, education, certifications, and professional background. What would you like to know?";
  const greetingBn = 'হাই! আমি SENTI, এমদাদুলের ব্যক্তিগত পোর্টফোলিও সহকারী। তাঁর দক্ষতা, প্রজেক্ট, শিক্ষা, সার্টিফিকেট এবং পেশাগত অভিজ্ঞতা সম্পর্কে জানতে সাহায্য করতে পারি। কী জানতে চান?';
  const detectLanguage = text => /[\u0980-\u09ff]/.test(text) ? 'Bangla' :
    (/\b(ami|apni|tumi|tar|er|ki|kemon|koren|gula|kothay|jante|bolun|ache|ase|bhalo|dhonnobad)\b/i.test(text) ? 'Banglish' : 'English');
  const localReply = (question, language) => {
    const q = question.toLowerCase();
    const asksContact = /contact|email|reach|যোগাযোগ|ইমেইল|kotha bol/.test(q);
    const asksProject = /project|repo|github|প্রজেক্ট|প্রকল্প|repository/.test(q);
    const asksSkills = /skill|technology|technolog|tech stack|দক্ষতা|স্কিল|টেকনোলজি|প্রযুক্তি|sql/.test(q);
    const asksEducation = /education|study|university|degree|শিক্ষা|বিশ্ববিদ্যালয়|পড়াশোনা/.test(q);
    const asksCertificate = /certif|certificate|সার্টিফিকেট|সনদ/.test(q);
    const asksWork = /experience|job|work|চাকরি|অভিজ্ঞতা/.test(q);
    if (language === 'Bangla') {
      if (asksContact) return 'ইমেইল: emdadulhaqueemu2@gmail.com। GitHub: github.com/emumondol। LinkedIn ও Facebook-এর লিংক Contact অংশে আছে।';
      if (asksProject) return 'GitHub বর্তমানে এই অ্যাকাউন্টে কোনো public repository দেখায় না, তাই যাচাইকৃত প্রজেক্টের বিবরণ এখনো নেই।';
      if (asksSkills) return 'এমদাদুল HTML, JavaScript, Java, CSS ও C দক্ষতা হিসেবে উল্লেখ করেছেন। তিনি Intellipaat-এর Free SQL Certification Course-ও সম্পন্ন করেছেন।';
      if (asksEducation) return 'এমদাদুল Daffodil International University-এর Software Engineering (SWE) বিভাগের শিক্ষার্থী। প্রত্যাশিত সমাপ্তির তারিখ ৩১ ডিসেম্বর ২০২৮।';
      if (asksCertificate) return 'এমদাদুল DIU-এর Day Long Seminar on Career Planning Roadmap-এ ১৬ এপ্রিল ২০২৬ তারিখে অংশ নেন। তাঁর Intellipaat Free SQL Certification Course-এর সনদও রয়েছে।';
      if (asksWork) return 'এমদাদুল বর্তমানে সফটওয়্যার প্রজেক্ট তৈরি, প্রযুক্তিগত দক্ষতা বাড়ানো এবং বাস্তব কাজের অভিজ্ঞতা অর্জনে মনোযোগী।';
      return 'আমি SENTI, এমদাদুলের পোর্টফোলিও সহকারী। প্রজেক্ট, দক্ষতা, শিক্ষা, সার্টিফিকেট বা যোগাযোগ সম্পর্কে জানতে পারেন।';
    }
    if (language === 'Banglish') {
      if (asksContact) return 'Email: emdadulhaqueemu2@gmail.com. GitHub: github.com/emumondol. LinkedIn ar Facebook link Contact section-e ache.';
      if (asksProject) return 'GitHub-e ei account-er kono public repository dekhacche na, tai verified project details ekhono nei.';
      if (asksSkills) return 'Emdadul HTML, JavaScript, Java, CSS, ar C skill hisebe list korechen. Tini Intellipaat-er Free SQL Certification Course-o complete korechen.';
      if (asksEducation) return 'Emdadul Daffodil International University-r Software Engineering (SWE) department-er student. Expected completion December 31, 2028.';
      if (asksCertificate) return 'Emdadul DIU Day Long Seminar on Career Planning Roadmap-e April 16, 2026-e participate korechen. Intellipaat Free SQL Certification Course-er certificate-o ache.';
      if (asksWork) return 'Emdadul practical software project, skills improve kora, ar real-world experience gain korar upor focus korchen.';
      return 'Ami SENTI, Emdadul-er portfolio assistant. Project, skills, education, certificate, ba contact niye jiggesh korte paren.';
    }
    if (asksContact) return 'Email: emdadulhaqueemu2@gmail.com. GitHub: github.com/emumondol. LinkedIn and Facebook links are in the Contact section.';
    if (asksProject) return 'GitHub currently reports no public repositories for this account, so verified project details are not listed yet.';
    if (asksSkills) return 'Emu lists HTML, JavaScript, Java, CSS, and C as skills. He also completed Intellipaat’s Free SQL Certification Course on March 24, 2026.';
    if (asksEducation) return 'Emu is a Software Engineering (SWE) student at Daffodil International University, with expected completion on December 31, 2028.';
    if (asksCertificate) return 'Emu participated in DIU’s Day Long Seminar on Career Planning Roadmap on April 16, 2026. He also completed Intellipaat’s Free SQL Certification Course; both certificates are in the Certifications section.';
    if (asksWork) return 'Emu is currently focused on practical software projects, strengthening technical capabilities, and gaining real-world development experience.';
    return 'I’m SENTI, Emdadul’s portfolio assistant. I can help you explore verified details about his skills, projects, education, certificate, and contact information.';
  };
  const escapeText = text => text.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const addMessage = (text, sender) => {
    const item = document.createElement('div');
    item.className = `senti-message ${sender}`;
    item.innerHTML = escapeText(text).replace(/(https?:\/\/[^\s]+|github\.com\/emumondol)/g, url => `<a href="${url.startsWith('http') ? url : `https://${url}`}" target="_blank" rel="noreferrer">${url}</a>`).replace(/\n/g, '<br>');
    messages.append(item); messages.scrollTop = messages.scrollHeight;
  };
  const openChat = open => {
    chatBox.classList.toggle('active', open);
    chatBox.setAttribute('aria-hidden', String(!open));
    launcher.setAttribute('aria-expanded', String(open));
    if (open) { if (!messages.children.length) addMessage((navigator.language || '').toLowerCase().startsWith('bn') ? greetingBn : greeting, 'assistant'); input.focus(); }
  };
  launcher.addEventListener('click', () => openChat(!chatBox.classList.contains('active')));
  $('#senti-close').addEventListener('click', () => openChat(false));
  $('#senti-reset').addEventListener('click', () => { history = []; messages.replaceChildren(); addMessage(greeting, 'assistant'); });
  $$('.senti-suggestions button').forEach(button => button.addEventListener('click', () => { input.value = button.dataset.prompt; sentiForm.requestSubmit(); }));
  sentiForm.addEventListener('submit', async event => {
    event.preventDefault();
    const question = input.value.trim();
    if (!question || question.length > 1000) return;
    addMessage(question, 'user'); input.value = '';
    const typing = document.createElement('div');
    typing.className = 'senti-message assistant senti-typing'; typing.setAttribute('aria-label', 'SENTI is typing');
    typing.innerHTML = '<i></i><i></i><i></i>'; messages.append(typing); messages.scrollTop = messages.scrollHeight;
    chatBox.classList.add('is-thinking');
    let answer;
    try {
      const response = await fetch('/.netlify/functions/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: question, history: history.slice(-8) }) });
      if (!response.ok) throw new Error('AI function unavailable');
      const result = await response.json();
      answer = typeof result.reply === 'string' && result.reply.trim() ? result.reply.trim() : localReply(question, detectLanguage(question));
    } catch { answer = localReply(question, detectLanguage(question)); }
    chatBox.classList.remove('is-thinking');
    typing.remove(); addMessage(answer, 'assistant');
    history.push({ role: 'user', text: question }, { role: 'assistant', text: answer });
  });
})();
