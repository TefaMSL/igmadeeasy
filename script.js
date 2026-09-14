/* ======================================================
   IG Made Easy — Script v2
   ====================================================== */

'use strict';

/* ── Supabase Config ── */
const sbConfig = window.SUPABASE_CONFIG || {};
const SUPABASE_URL  = sbConfig.url || 'https://your-project.supabase.co';
const SUPABASE_ANON = sbConfig.anonKey || 'your-anon-key';
let sb = null;
if (window.supabase) {
  try { sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON); } catch(e) {}
}

/* ── i18n (Bilingual) ── */
let LANG = localStorage.getItem('igLang') || 'en';

function applyLang(lang) {
  LANG = lang;
  localStorage.setItem('igLang', lang);
  const isAr = lang === 'ar';
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', isAr ? 'rtl' : 'ltr');
  const langLabel = document.getElementById('lang-label');
  if (langLabel) langLabel.textContent = isAr ? 'EN' : 'AR';

  // Translate all data-ar / data-en elements
  document.querySelectorAll('[data-ar]').forEach(el => {
    const txt = el.getAttribute(`data-${lang}`);
    if (txt) el.textContent = txt;
  });
  // Placeholders
  document.querySelectorAll('[data-ar-placeholder]').forEach(el => {
    const ph = el.getAttribute(`data-${lang}-placeholder`);
    if (ph) el.placeholder = ph;
  });
  // Page title
  const titleEl = document.querySelector('title');
  if (titleEl) {
    const titleTxt = titleEl.getAttribute(`data-${lang}`);
    if (titleTxt) titleEl.textContent = titleTxt;
  }
  // Chatbot welcome
  const firstBot = document.querySelector('#chatbot-greeting span') || document.querySelector('.chat-msg.bot span');
  if (firstBot) {
    firstBot.textContent = isAr
      ? '👋 أهلاً بك! أنا المساعد الذكي لكتاب IG Made Easy — البديل العربي الأول لمناهج IGCSE. كيف أقدر أساعدك اليوم؟'
      : '👋 Hello! I\'m the IG Made Easy smart assistant — the #1 Arab alternative for IGCSE. How can I help you today?';
  }
  // Chatbot input placeholder
  const chatInput = document.getElementById('chatbot-input');
  if (chatInput) chatInput.placeholder = isAr ? 'اكتب استفسارك هنا...' : 'Type your question here...';

  // Synchronize chatbot quick options in active language
  if (typeof renderChatOptions === 'function') {
    renderChatOptions();
  }

  // Synchronize lightbox if open
  if (typeof updateLightboxDisplay === 'function') {
    updateLightboxDisplay();
  }
}

const langToggle = document.getElementById('lang-toggle');
if (langToggle) {
  langToggle.addEventListener('click', () => {
    applyLang(LANG === 'ar' ? 'en' : 'ar');
  });
}

/* ── Theme Toggle (Default: Light Mode) ── */
const saved = localStorage.getItem('igTheme') || 'light';
document.documentElement.setAttribute('data-theme', saved);

const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('igTheme', next);
  });
}

/* ── Custom Cursor with Multiple Interactive Shapes (Instant Real-time Follow) ── */
const cursor = document.getElementById('custom-cursor');
if (cursor) {
  let isMoving = false;

  window.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
    if (!isMoving) {
      cursor.classList.add('active');
      isMoving = true;
    }
  });

  window.addEventListener('mouseleave', () => {
    cursor.classList.remove('active');
    isMoving = false;
  });

  window.addEventListener('mouseenter', () => {
    cursor.classList.add('active');
  });

  // Shape 1: Buttons, Links, Clickables
  document.querySelectorAll('a, button, .btn, .lang-btn, .theme-btn, .nav-cta, .chat-widget-btn, .chat-opt-btn, .chat-send-btn, .chat-close, .thumb-btn').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.className = 'active hover-btn';
    });
    el.addEventListener('mouseleave', () => {
      cursor.className = 'active';
    });
  });

  // Shape 2: Cards, Bento, FAQ items
  document.querySelectorAll('.bento-card, .metric-card, .problem-card, .age-card, .preview-card, .faq-item, .price-card, .test-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.className = 'active hover-card';
    });
    el.addEventListener('mouseleave', () => {
      cursor.className = 'active';
    });
  });

  // Shape 3: Text & Inputs
  document.querySelectorAll('input, textarea, select').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.className = 'active hover-text';
    });
    el.addEventListener('mouseleave', () => {
      cursor.className = 'active';
    });
  });

  // Shape 4: Book cover & Real previews
  document.querySelectorAll('.book-stage, .sample-real-card, .book-glow').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.className = 'active hover-book';
    });
    el.addEventListener('mouseleave', () => {
      cursor.className = 'active';
    });
  });

  // Click bounce
  window.addEventListener('mousedown', () => cursor.classList.add('clicking'));
  window.addEventListener('mouseup', () => cursor.classList.remove('clicking'));
}

/* ── Hero Book Thumbnail Switcher & Auto-Slideshow (تقليب الصور تلقائياً) ── */
const heroBookImg = document.getElementById('hero-book-main');
const thumbBtns = document.querySelectorAll('.thumb-btn');
let currentBookIndex = 0;
let bookCycleTimer = null;

function switchBookImage(index) {
  if (!thumbBtns.length || !heroBookImg) return;
  currentBookIndex = index;
  thumbBtns.forEach((b, i) => {
    b.classList.toggle('active', i === index);
  });

  const btn = thumbBtns[index];
  const newSrc = btn.getAttribute('data-img');

  heroBookImg.classList.add('fading');
  setTimeout(() => {
    heroBookImg.src = newSrc;
    heroBookImg.classList.remove('fading');
  }, 180);
}

function startBookAutoCycle() {
  stopBookAutoCycle();
  bookCycleTimer = setInterval(() => {
    const nextIndex = (currentBookIndex + 1) % thumbBtns.length;
    switchBookImage(nextIndex);
  }, 3200);
}

function stopBookAutoCycle() {
  if (bookCycleTimer) {
    clearInterval(bookCycleTimer);
    bookCycleTimer = null;
  }
}

thumbBtns.forEach((btn, idx) => {
  btn.addEventListener('click', () => {
    switchBookImage(idx);
    startBookAutoCycle();
  });
});

const heroBookArea = document.querySelector('.hero-book');
if (heroBookArea) {
  heroBookArea.addEventListener('mouseenter', stopBookAutoCycle);
  heroBookArea.addEventListener('mouseleave', startBookAutoCycle);
}

// Start auto slideshow
if (thumbBtns.length > 1) {
  startBookAutoCycle();
}

/* ── Navbar scroll + Back-to-top ── */
const navbar = document.getElementById('navbar');
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60);
  if (backTop) backTop.classList.toggle('visible', window.scrollY > 400);
});

/* ── Hamburger ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => { hamburger.classList.remove('open'); navLinks.classList.remove('open'); });
  });
}

/* ── Smooth Scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const targetId = a.getAttribute('href');
    if (targetId && targetId !== '#') {
      const t = document.querySelector(targetId);
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    }
  });
});

/* ── Reveal on Scroll (Bulletproof) ── */
const revealEls = document.querySelectorAll('.reveal');

function checkReveals() {
  const windowHeight = window.innerHeight;
  revealEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top <= windowHeight * 0.94) {
      el.classList.add('visible');
    }
  });
}

if ('IntersectionObserver' in window) {
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
  revealEls.forEach(el => revealObs.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('visible'));
  window.addEventListener('scroll', checkReveals, { passive: true });
}

// Initial check to ensure initial sections are visible
checkReveals();

/* ── Particle Canvas ── */
const canvas = document.getElementById('hero-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H, pts, mouse = { x: null, y: null };
  const DARK = () => document.documentElement.getAttribute('data-theme') === 'dark';

  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  window.addEventListener('resize', resize); resize();

  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

  // Parallax aurora orbs
  const orbs = document.querySelectorAll('.aurora-orb');
  window.addEventListener('mousemove', e => {
    const ox = (e.clientX / window.innerWidth - 0.5) * 120;
    const oy = (e.clientY / window.innerHeight - 0.5) * 120;
    orbs.forEach((orb, i) => {
      const f = (i + 1) * -1.3;
      orb.style.transform = `translate(${ox * f}px, ${oy * f}px)`;
    });
  });

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.r  = Math.random() * 1.5 + 0.5;
      this.alpha = Math.random() * 0.5 + 0.1;
    }
    update() {
      if (mouse.x !== null) {
        const dx = mouse.x - this.x, dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) { this.vx -= (dx / dist) * 0.08; this.vy -= (dy / dist) * 0.08; }
      }
      this.x += this.vx; this.y += this.vy;
      this.vx *= 0.99; this.vy *= 0.99;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      const col = DARK() ? `rgba(249,115,22,${this.alpha})` : `rgba(22,36,71,${this.alpha * 0.4})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = col;
      ctx.fill();
    }
  }

  pts = Array.from({ length: 80 }, () => new Particle());

  function drawLines() {
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 120) {
          const a = (1 - d / 120) * 0.12;
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = DARK() ? `rgba(249,115,22,${a})` : `rgba(22,36,71,${a * 0.4})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(loop);
  }
  loop();
}

/* ── FAQ ── */
function toggleFaq(item) {
  const open = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!open) item.classList.add('open');
}

/* ── Qty ── */
function changeQty(d) {
  const inp = document.getElementById('order-qty');
  inp.value = Math.max(1, Math.min(50, parseInt(inp.value) + d));
}

/* ── Toast ── */
function showToast(msg, dur = 3500) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), dur);
}

/* ── Supabase: save lead ── */
async function saveLead(data) {
  if (!sb) {
    console.warn('⚠️ Supabase client not initialized yet. Please check supabase-config.js');
    return;
  }
  try {
    if (data.type === 'order') {
      const orderPayload = {
        full_name: data.name,
        phone: data.phone,
        country: data.country,
        address: data.address,
        bundle_type: data.level,
        quantity: data.qty || 1,
        payment_method: 'cash_on_delivery',
        order_status: 'pending'
      };
      const { error } = await sb.from('orders').insert([orderPayload]);
      if (error) {
        await sb.from('ig_leads').insert([data]);
      } else {
        console.log('✅ Order saved to Supabase orders table!');
      }
    } else {
      const leadPayload = {
        name: data.name,
        phone: data.phone,
        student_age: 'Free Sample Download'
      };
      const { error } = await sb.from('leads').insert([leadPayload]);
      if (error) {
        await sb.from('ig_leads').insert([data]);
      } else {
        console.log('✅ Lead saved to Supabase leads table!');
      }
    }
  } catch(e) {
    console.error('❌ Supabase Exception:', e);
  }
}

/* ── Sample Download Form ── */
function handleSampleDownload(e) {
  e.preventDefault();
  const name  = document.getElementById('sample-name').value.trim();
  const phone = document.getElementById('sample-phone').value.trim();
  if (!name || !phone) { showToast(LANG === 'ar' ? '⚠️ اكتب اسمك ورقمك' : '⚠️ Please fill in name and phone'); return; }
  const btn = document.getElementById('download-sample-btn');
  btn.disabled = true;
  btn.querySelector('span').textContent = LANG === 'ar' ? '⏳ جارٍ...' : '⏳ Loading...';
  saveLead({ name, phone, type: 'sample', lang: LANG, created_at: new Date().toISOString() });
  setTimeout(() => {
    showToast(LANG === 'ar' ? `✅ شكراً ${name}! هيتواصل معاك فريقنا قريباً 📚` : `✅ Thanks ${name}! Our team will contact you shortly 📚`);
    btn.querySelector('span').textContent = LANG === 'ar' ? '✅ تم الإرسال!' : '✅ Sent!';
    setTimeout(() => {
      btn.disabled = false;
      btn.querySelector('span').textContent = LANG === 'ar' ? 'حمّل العينة المجانية' : 'Download Free Sample';
      document.getElementById('sampleForm').reset();
    }, 3000);
  }, 1500);
}

/* ── Order Form ── */
function handleOrder(e) {
  e.preventDefault();
  const name    = document.getElementById('order-name').value.trim();
  const phone   = document.getElementById('order-phone').value.trim();
  const country = document.getElementById('order-country') ? document.getElementById('order-country').value : '';
  const gov     = document.getElementById('order-gov').value.trim();
  const level   = document.getElementById('order-level').value;
  const qty     = document.getElementById('order-qty').value;
  if (!name || !phone || !country || !gov || !level) {
    showToast(LANG === 'ar' ? '⚠️ من فضلك اكمل كل الحقول واختيار الدولة' : '⚠️ Please fill in all fields and select country');
    return;
  }
  saveLead({ name, phone, country, address: gov, level, qty: parseInt(qty), type: 'order', lang: LANG, created_at: new Date().toISOString() });
  const msg = encodeURIComponent(
    `📚 ${LANG === 'ar' ? 'طلب جديد — IG Made Easy (الشرق الأوسط)' : 'New Order — IG Made Easy (Middle East)'}\n\n` +
    `👤 ${name}\n📱 ${phone}\n🌍 ${country}\n📍 ${gov}\n📊 ${level}\n🔢 ${qty}`
  );
  window.open(`https://wa.me/201000000000?text=${msg}`, '_blank');
  showToast(LANG === 'ar' ? '✅ يتم تحويلك للواتساب...' : '✅ Redirecting to WhatsApp...');
}

/* ── CHATBOT ── */
const chatToggle = document.getElementById('chatbot-toggle');
const chatWindow = document.getElementById('chatbot-window');
const chatClose  = document.getElementById('chatbot-close');
const chatInput  = document.getElementById('chatbot-input');
const chatSend   = document.getElementById('chatbot-send');
const chatBody   = document.getElementById('chatbot-body');
const chatNotif  = document.querySelector('.chat-notif');

chatToggle.addEventListener('click', () => {
  chatWindow.classList.toggle('hidden');
  if (chatNotif) chatNotif.style.display = 'none';
  if (!chatWindow.classList.contains('hidden')) {
    renderChatOptions();
    if (chatInput) chatInput.focus();
  }
});
chatClose.addEventListener('click', () => chatWindow.classList.add('hidden'));

const CHAT_OPTIONS = {
  ar: [
    { label: 'سعر الكتاب وتوفير 85% 💰', id: 'price' },
    { label: 'طريقة الطلب والشحن 🚚', id: 'order' },
    { label: 'المستويات والأعمار المناسبة 🎯', id: 'levels' },
    { label: 'مطابقة منهج Cambridge 2026 🎓', id: 'curriculum' },
    { label: 'تحميل وتصفح عينة مجانية 📖', id: 'sample' }
  ],
  en: [
    { label: 'Book Price & 85% Savings 💰', id: 'price' },
    { label: 'Instant Order & Delivery 🚚', id: 'order' },
    { label: 'Target Age & Levels 🎯', id: 'levels' },
    { label: 'Cambridge 2026 Alignment 🎓', id: 'curriculum' },
    { label: 'Preview Free Sample PDF 📖', id: 'sample' }
  ]
};

const BOT_INTENT_REPLIES = {
  price: {
    ar: 'الكتاب هو البديل العربي الأول المعتمد لمناهج IGCSE، بسعر رمزي وفي متناول الجميع مقارنة بالكتب المستوردة التي تصل إلى 15 يورو وأكثر. نوفر خصومات للطلبات المجمعة وشحناً مخفضاً لكافة دول العالم العربي والخليج! تواصل معنا على الواتساب لمعرفة السعر بدقة بعملتك المحلية 💬',
    en: 'The book is the #1 Arab alternative for IGCSE, exceptionally affordable compared to imported books exceeding €15. We provide group/school discounts and low-cost shipping across Egypt and all Middle East & Gulf nations! Message us on WhatsApp for your local currency pricing 💬'
  },
  order: {
    ar: 'تقدر تطلب فوراً عبر فورم الموقع باختيار دولتك ومدينتك، أو مراسلتنا مباشرة على الواتساب (+20 100 000 0000). الشحن سريع ويصلك في 2-5 أيام عمل لكافة محافظات مصر ودول الخليج والشرق الأوسط! 🚚📦',
    en: 'You can order immediately via the website form by selecting your country and city, or message us directly on WhatsApp (+20 100 000 0000). Express shipping delivers in 2-5 business days across Egypt and all Gulf & Middle East countries! 🚚📦'
  },
  levels: {
    ar: 'السلسلة تشمل 3 مستويات احترافية: المستوى الأساسي (10-11 سنة)، المستوى المتوسط (12-13 سنة)، والمستوى المتقدم (14-15 سنة). كل كتاب مصمم بعناية لتأسيس الطالب واجتياز اختبارات IGCSE بأعلى الدرجات 🎯',
    en: 'The series features 3 dedicated levels: Beginner (ages 10-11), Intermediate (ages 12-13), and Advanced (ages 14-15). Each stage systematically prepares students to excel in international IGCSE exams 🎯'
  },
  curriculum: {
    ar: 'الكتاب متوافق تماماً مع متطلبات منهج Cambridge IGCSE English Second Language، ويغطي مهارات القراءة والكتابة والاستماع والتحدث بنماذج واقعية وتدريبات مكثفة. (ملاحظة: منتج أكاديمي مستقل بجودة عالمية) 🎓',
    en: 'The book is 100% aligned with Cambridge IGCSE English Second Language curriculum guidelines, comprehensively training students in Reading, Writing, Listening & Speaking. (Independent academic publication) 🎓'
  },
  sample: {
    ar: 'بكل تأكيد! يمكنك تحميل وتصفح عينة مجانية تشمل فصلاً كاملاً وتمارين تطبيقية. املأ بياناتك في قسم "العينة المجانية" بالصفحة أو تواصل معنا عبر الواتساب لإرسال ملف PDF فوراً 📄✨',
    en: 'Absolutely! You can preview and download a complete sample chapter with exam exercises. Simply fill in your details in the "Free Sample" section or contact us on WhatsApp to receive the PDF immediately 📄✨'
  },
  greeting: {
    ar: 'أهلاً وسهلاً بك! أنا مساعد IG Made Easy الذكي — البديل العربي الأول لمناهج IGCSE. يسعدني مساعدتك في الإجابة عن أي استفسار أو ترتيب طلبك. اختر من الأزرار أو اكتب سؤالك! 😊',
    en: 'Welcome! I am the IG Made Easy smart assistant — the #1 Arab alternative to IGCSE books. I am here to help with pricing, regional shipping, or ordering. Feel free to choose an option below or ask me anything! 😊'
  },
  default: {
    ar: 'شكراً لتواصلك معنا! يسعدنا الإجابة على أي سؤال حول الكتاب، أسعار العملات، أو الشحن لبلدك. يمكنك اختيار أي خيار أدناه أو التحدث مباشرة مع فريقنا عبر الواتساب (+20 100 000 0000) 💬',
    en: 'Thank you for reaching out! We are glad to assist with any questions regarding book levels, pricing, or shipping to your region. Pick an option below or chat directly with our team on WhatsApp (+20 100 000 0000) 💬'
  }
};

function detectIntent(text) {
  const lower = (text || '').toLowerCase().trim();
  if (!lower) return 'default';
  if (/سعر|فلوس|تكلف|بكام|كام|جنيه|ريال|درهم|دينار|دولار|يورو|price|cost|how much|fee|euro|rate|cheap|pricing/i.test(lower)) {
    return 'price';
  }
  if (/طلب|شحن|توصيل|شراء|اشتري|ازاي اشتري|عايز نسخه|دول الخليج|سعودي|امارات|كويت|قطر|عمان|بحرين|اردن|مصر|order|ship|delivery|buy|purchase|how to order|courier/i.test(lower)) {
    return 'order';
  }
  if (/مستو|سن|عمر|اعمار|أعمار|سنة|سنه|صف|مرحله|مرحلة|ابتدائي|اعدادي|level|age|grade|year|beginner|intermediate|advanced/i.test(lower)) {
    return 'levels';
  }
  if (/منهج|كامبريدج|كمبريدج|كامبردج|بريطاني|مهارات|امتحان|اختبار|حلول|إنجليزي|انجليزي|curriculum|cambridge|igcse|exam|test|skills|syllabus/i.test(lower)) {
    return 'curriculum';
  }
  if (/عين|عينه|عينة|فصل|تجرب|مجاني|تحميل|pdf|بي دي اف|sample|preview|free|trial|download|chapter/i.test(lower)) {
    return 'sample';
  }
  if (/سلام|أهلا|اهلا|مرحبا|صباح|مساء|ازيك|عامل ايه|hi|hello|hey|good morning|greetings/i.test(lower)) {
    return 'greeting';
  }
  return 'default';
}

function addBotMsg(txt) {
  const div = document.createElement('div');
  div.className = 'chat-msg bot';
  div.textContent = txt;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function addUserMsg(txt) {
  const div = document.createElement('div');
  div.className = 'chat-msg user';
  div.textContent = txt;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function showTyping() {
  const d = document.createElement('div');
  d.className = 'typing';
  d.innerHTML = '<span></span><span></span><span></span>';
  chatBody.appendChild(d);
  chatBody.scrollTop = chatBody.scrollHeight;
  return d;
}

function renderChatOptions() {
  // Remove existing option containers
  document.querySelectorAll('.chat-opts').forEach(el => el.remove());
  
  const currentLang = LANG === 'ar' ? 'ar' : 'en';
  const opts = CHAT_OPTIONS[currentLang] || CHAT_OPTIONS.en;
  
  const wrap = document.createElement('div');
  wrap.className = 'chat-opts';
  opts.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'chat-opt-btn';
    btn.textContent = opt.label;
    btn.type = 'button';
    btn.addEventListener('click', () => {
      sendUserMsg(opt.label, opt.id);
    });
    wrap.appendChild(btn);
  });
  chatBody.appendChild(wrap);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function sendUserMsg(txt, explicitIntent) {
  if (!txt) return;
  addUserMsg(txt);
  chatInput.value = '';
  
  // Hide option buttons while waiting for reply
  document.querySelectorAll('.chat-opts').forEach(el => el.remove());
  
  const typing = showTyping();
  setTimeout(() => {
    if (typing.parentNode) typing.parentNode.removeChild(typing);
    
    const intent = explicitIntent || detectIntent(txt);
    const intentObj = BOT_INTENT_REPLIES[intent] || BOT_INTENT_REPLIES.default;
    const currentLang = LANG === 'ar' ? 'ar' : 'en';
    const replyText = intentObj[currentLang] || intentObj.en;
    
    addBotMsg(replyText);
    renderChatOptions();
  }, Math.random() * 500 + 450);
}

chatSend.addEventListener('click', () => sendUserMsg(chatInput.value.trim()));
chatInput.addEventListener('keypress', e => { 
  if (e.key === 'Enter') {
    e.preventDefault();
    sendUserMsg(chatInput.value.trim()); 
  }
});

// Initial options render after 600ms
setTimeout(() => {
  renderChatOptions();
}, 600);

/* ── IMAGE LIGHTBOX GALLERY (تكبير الصور وتصفحها / السلايد) ── */
const GALLERY_ITEMS = [
  {
    src: 'book-mockup.jpg',
    title_ar: 'غلاف الكتاب الخارجي — البديل العربي الأول لمناهج IGCSE',
    title_en: 'IG Made Easy — 3D Book Cover (Arab Edition)',
    desc_ar: 'تصميم راقٍ بمقاييس نشر دولية، مخصص لطلاب الشرق الأوسط بسعر رمزي وجودة طباعة فائقة.',
    desc_en: 'World-class publishing quality tailored for Middle East students at an accessible price.'
  },
  {
    src: 'book-inside.jpg',
    title_ar: 'من داخل الكتاب — شرح مبسط ورسومات تفاعلية',
    title_en: 'Inside the Book — Simplified Explanations & Visual Exercises',
    desc_ar: 'تنسيق عصري مبهج يجذب انتباه الطالب مع تدريبات وخرائط ذهنية تغطي المهارات الأساسية.',
    desc_en: 'Modern interactive layout with mind maps and practice questions covering core skills.'
  },
  {
    src: 'book-levels.jpg',
    title_ar: 'المستويات الثلاثة — تغطية شاملة للأعمار 10–15 سنة',
    title_en: 'The 3 Progressive Levels (Ages 10–15)',
    desc_ar: 'تدرج أكاديمي متكامل يبدأ من التأسيس وصولاً للتدريب على نماذج امتحانات IGCSE الحقيقية.',
    desc_en: 'Comprehensive academic progression from foundation to authentic IGCSE exam models.'
  },
  {
    src: 'student-reading.jpg',
    title_ar: 'تجربة طلابنا الواقعية — متعة وسهولة المذاكرة',
    title_en: 'Real Student Experience — Engaging & Effective Learning',
    desc_ar: 'يساعد آلاف الطلاب على حب الإنجليزية والتفوق في اختبارات كامبريدج بثقة تامة.',
    desc_en: 'Helping thousands of students master English and achieve top Cambridge grades with confidence.'
  }
];

let currentGalleryIdx = 0;
const lightboxEl        = document.getElementById('image-lightbox');
const lightboxImg       = document.getElementById('lightbox-img');
const lightboxTitle     = document.getElementById('lightbox-title');
const lightboxDesc      = document.getElementById('lightbox-desc');
const lightboxCounter   = document.getElementById('lightbox-counter');
const lightboxThumbs    = document.getElementById('lightbox-thumbs');
const lightboxClose     = document.getElementById('lightbox-close');
const lightboxBackdrop  = document.getElementById('lightbox-backdrop');
const lightboxPrev      = document.getElementById('lightbox-prev');
const lightboxNext      = document.getElementById('lightbox-next');
const lightboxTouchArea = document.getElementById('lightbox-touch-area');

function initLightboxThumbs() {
  if (!lightboxThumbs) return;
  lightboxThumbs.innerHTML = '';
  GALLERY_ITEMS.forEach((item, idx) => {
    const btn = document.createElement('button');
    btn.className = `lightbox-thumb-btn ${idx === currentGalleryIdx ? 'active' : ''}`;
    btn.setAttribute('aria-label', `Go to slide ${idx + 1}`);
    btn.innerHTML = `<img src="${item.src}" alt="Thumb ${idx + 1}" loading="lazy">`;
    btn.addEventListener('click', () => {
      setLightboxImage(idx);
    });
    lightboxThumbs.appendChild(btn);
  });
}

function updateLightboxDisplay() {
  if (!lightboxEl || lightboxEl.classList.contains('hidden')) return;
  const item = GALLERY_ITEMS[currentGalleryIdx];
  if (!item) return;

  const isAr = LANG === 'ar';
  if (lightboxCounter) lightboxCounter.textContent = `${currentGalleryIdx + 1} / ${GALLERY_ITEMS.length}`;
  if (lightboxTitle) lightboxTitle.textContent = isAr ? item.title_ar : item.title_en;
  if (lightboxDesc) lightboxDesc.textContent = isAr ? item.desc_ar : item.desc_en;

  if (lightboxThumbs) {
    const thumbs = lightboxThumbs.querySelectorAll('.lightbox-thumb-btn');
    thumbs.forEach((t, i) => t.classList.toggle('active', i === currentGalleryIdx));
  }
}

function setLightboxImage(idx) {
  currentGalleryIdx = (idx + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
  const item = GALLERY_ITEMS[currentGalleryIdx];
  if (!item || !lightboxImg) return;

  lightboxImg.style.opacity = '0.3';
  lightboxImg.style.transform = 'scale(0.96)';
  setTimeout(() => {
    lightboxImg.src = item.src;
    lightboxImg.style.opacity = '1';
    lightboxImg.style.transform = 'scale(1)';
    updateLightboxDisplay();
  }, 120);

  // Synchronize hero book view
  if (typeof switchBookImage === 'function' && currentGalleryIdx < thumbBtns.length) {
    switchBookImage(currentGalleryIdx);
  }
}

function openLightbox(idx = 0) {
  if (!lightboxEl) return;
  initLightboxThumbs();
  setLightboxImage(idx);
  lightboxEl.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightboxEl) return;
  lightboxEl.classList.add('hidden');
  document.body.style.overflow = '';
}

function nextLightboxImage() {
  setLightboxImage(currentGalleryIdx + 1);
}

function prevLightboxImage() {
  setLightboxImage(currentGalleryIdx - 1);
}

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
if (lightboxNext) lightboxNext.addEventListener('click', nextLightboxImage);
if (lightboxPrev) lightboxPrev.addEventListener('click', prevLightboxImage);

window.addEventListener('keydown', e => {
  if (!lightboxEl || lightboxEl.classList.contains('hidden')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') {
    if (LANG === 'ar') prevLightboxImage();
    else nextLightboxImage();
  }
  if (e.key === 'ArrowLeft') {
    if (LANG === 'ar') nextLightboxImage();
    else prevLightboxImage();
  }
});

// Mobile Touch Swipe
if (lightboxTouchArea) {
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  lightboxTouchArea.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  lightboxTouchArea.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;
    if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        if (LANG === 'ar') prevLightboxImage();
        else nextLightboxImage();
      } else {
        if (LANG === 'ar') nextLightboxImage();
        else prevLightboxImage();
      }
    }
  }, { passive: true });
}

// Expose lightbox globally
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.setLightboxImage = setLightboxImage;
window.nextLightboxImage = nextLightboxImage;
window.prevLightboxImage = prevLightboxImage;

/* ── Hero Book View & Thumbnail Switcher (Interactive 3D vs High-Res Photos) ── */
const thumbBtns    = document.querySelectorAll('.thumb-btn');
const hero3dCanvas = document.getElementById('hero-3d-canvas-container');
const hero3dHint   = document.getElementById('hero-3d-hint');
const heroBookMain = document.getElementById('hero-book-main');
let currentBookIndex = 0;

function switchBookImage(idx) {
  currentBookIndex = (idx + thumbBtns.length) % thumbBtns.length;
  thumbBtns.forEach((btn, i) => {
    btn.classList.toggle('active', i === currentBookIndex);
  });

  if (currentBookIndex === 0) {
    // 3D Model view
    if (hero3dCanvas) hero3dCanvas.classList.remove('hidden');
    if (hero3dHint) hero3dHint.classList.remove('hidden');
    if (heroBookMain) heroBookMain.classList.add('hidden');
  } else {
    // 2D Real Photo view
    if (hero3dCanvas) hero3dCanvas.classList.add('hidden');
    if (hero3dHint) hero3dHint.classList.add('hidden');
    if (heroBookMain) {
      heroBookMain.classList.remove('hidden');
      const targetImg = thumbBtns[currentBookIndex]?.getAttribute('data-img') || GALLERY_ITEMS[currentBookIndex]?.src;
      if (targetImg) {
        heroBookMain.classList.add('fading');
        setTimeout(() => {
          heroBookMain.src = targetImg;
          heroBookMain.classList.remove('fading');
        }, 120);
      }
    }
  }
}

window.switchBookImage = switchBookImage;

thumbBtns.forEach((btn, idx) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    switchBookImage(idx);
  });
});

if (heroBookMain) {
  heroBookMain.addEventListener('click', (e) => {
    e.stopPropagation();
    openLightbox(currentBookIndex);
  });
}

const sampleCardEl = document.getElementById('sample-real-card');
if (sampleCardEl) {
  sampleCardEl.addEventListener('click', () => {
    openLightbox(1);
  });
}

/* ── Scroll Reveal Animations ── */
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -30px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });

  document.documentElement.classList.add('js-reveal-ready');
}

/* ── Init lang & theme ── */
applyLang(LANG);

