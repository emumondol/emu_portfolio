import { getPortfolioFaqReply } from './faq.mjs';

(() => {
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  document.documentElement.classList.add('js-enabled');

  // Keep the starter's Typed.js headline without making the rest of the page wait on its CDN.
  const startTypedHeadline = () => {
    if (typeof window.Typed !== 'undefined') new window.Typed('.text', {
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

  const launcher = $('#senti-launcher');
  const chatBox = $('#senti-chat-box');
  const input = $('#senti-input');
  const messages = $('#senti-messages');
  const sentiForm = $('#senti-form');
  const greeting = "Hi! I'm SENTI. I answer questions only about Emdadul's portfolio: skills, education, projects, certificates, experience, and contact details.";
  const greetingBn = 'হাই! আমি SENTI। আমি শুধু এমদাদুলের পোর্টফোলিও—দক্ষতা, পড়াশোনা, প্রজেক্ট, সনদ, অভিজ্ঞতা ও যোগাযোগ—সম্পর্কিত প্রশ্নের উত্তর দিই।';
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
  $('#senti-reset').addEventListener('click', () => { messages.replaceChildren(); addMessage(greeting, 'assistant'); });
  $$('.senti-suggestions button').forEach(button => button.addEventListener('click', () => { input.value = button.dataset.prompt; sentiForm.requestSubmit(); }));
  sentiForm.addEventListener('submit', event => {
    event.preventDefault();
    const question = input.value.trim();
    if (!question || question.length > 1000) return;
    const answer = getPortfolioFaqReply(question);
    addMessage(question, 'user'); input.value = '';
    const typing = document.createElement('div');
    typing.className = 'senti-message assistant senti-typing'; typing.setAttribute('aria-label', 'SENTI is typing');
    typing.innerHTML = '<i></i><i></i><i></i>'; messages.append(typing); messages.scrollTop = messages.scrollHeight;
    chatBox.classList.add('is-thinking');
    window.setTimeout(() => {
      chatBox.classList.remove('is-thinking');
      typing.remove();
      addMessage(answer, 'assistant');
    }, 180);
  });
})();
