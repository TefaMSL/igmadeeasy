/* ====================================================
   VIION GROUP v2 — Premium Interactive Engine
   ==================================================== */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

/* ═══════════════════════════════════════════
   1. PARTICLE CANVAS
═══════════════════════════════════════════ */
const canvas = document.getElementById('hero-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H, nodes;
  const mouse = { x: null, y: null, r: 160 };

  function resize() {
    W = canvas.width  = canvas.parentElement.offsetWidth;
    H = canvas.height = canvas.parentElement.offsetHeight;
  }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.r  = Math.random() * 1.8 + 0.4;
      this.a0 = Math.random() * 0.45 + 0.08;
      this.a  = this.a0;
      const hues = [210, 215, 195, 220, 230];
      this.h = hues[Math.floor(Math.random() * hues.length)];
      this.s = 75 + Math.random() * 25;
      this.l = 52 + Math.random() * 22;
    }
    update() {
      if (mouse.x !== null) {
        const dx = this.x - mouse.x, dy = this.y - mouse.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < mouse.r) {
          const f = (mouse.r - d) / mouse.r;
          this.vx += (dx / d) * f * 0.14;
          this.vy += (dy / d) * f * 0.14;
          this.a = Math.min(this.a0 + f * 0.55, 0.95);
        } else {
          this.a += (this.a0 - this.a) * 0.04;
        }
      }
      this.x += this.vx; this.y += this.vy;
      this.vx *= 0.994; this.vy *= 0.994;
      if (this.x < 0) this.x = W; if (this.x > W) this.x = 0;
      if (this.y < 0) this.y = H; if (this.y > H) this.y = 0;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.h},${this.s}%,${this.l}%,${this.a})`;
      ctx.fill();
    }
  }

  function init() {
    const n = Math.min(Math.floor(W * H / 6500), 160);
    nodes = Array.from({ length: n }, () => new Particle());
  }

  function drawConnections() {
    const MAX = 145;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < MAX) {
          const a = (1 - d / MAX) * 0.08;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(59,130,246,${a})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    nodes.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(animate);
  }

  canvas.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  });
  canvas.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

  resize(); init(); animate();
  let rt;
  window.addEventListener('resize', () => {
    clearTimeout(rt); rt = setTimeout(() => { resize(); init(); }, 250);
  });
}

/* ═══════════════════════════════════════════
   2. AURORA MOUSE PARALLAX
═══════════════════════════════════════════ */
const blobs = document.querySelectorAll('.aurora-blob');
document.addEventListener('mousemove', e => {
  const cx = window.innerWidth  / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;
  blobs.forEach((b, i) => {
    const f = (i + 1) * 12;
    b.style.transform = `translate(${dx * f}px, ${dy * f}px)`;
  });
});

/* ═══════════════════════════════════════════
   3. TYPEWRITER EFFECT
═══════════════════════════════════════════ */
const twTarget = document.getElementById('typewriter-target');
if (twTarget) {
  const words = [
    'Digital Infrastructure',
    'Secure EHR Systems',
    'HIPAA Compliance',
    'Clinical IT Solutions',
    'Cloud Environments',
    'Data Center Security',
  ];
  let wi = 0, ci = 0, deleting = false;
  const speed = { type: 65, delete: 35, pause: 2000 };

  function typeLoop() {
    const word = words[wi];
    if (!deleting) {
      twTarget.textContent = word.slice(0, ++ci);
      if (ci === word.length) { deleting = true; setTimeout(typeLoop, speed.pause); return; }
    } else {
      twTarget.textContent = word.slice(0, --ci);
      if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
    }
    setTimeout(typeLoop, deleting ? speed.delete : speed.type);
  }
  setTimeout(typeLoop, 1200);
}

/* ═══════════════════════════════════════════
   4. NAVBAR + SCROLL
═══════════════════════════════════════════ */
const navbar = document.getElementById('navbar');
const btt    = document.getElementById('btt');

function onScroll() {
  const y = window.scrollY;
  if (navbar) navbar.classList.toggle('scrolled', y > 60);
  if (btt)    btt.classList.toggle('visible', y > 600);
  updateNavDots();
  highlightNavLinks();
}
window.addEventListener('scroll', onScroll, { passive: true });

function highlightNavLinks() {
  const secs  = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a:not(.nav-cta)');
  let cur = '';
  secs.forEach(s => { if (window.scrollY >= s.offsetTop - 160) cur = s.id; });
  links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${cur}`));
}

/* ═══════════════════════════════════════════
   5. NAV DOTS
═══════════════════════════════════════════ */
const dots = document.querySelectorAll('.nav-dot');

// Now that dots are defined, we can safely call onScroll for the first time
onScroll();

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const el = document.getElementById(dot.dataset.target);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });
});

function updateNavDots() {
  let cur = '';
  dots.forEach(dot => {
    const el = document.getElementById(dot.dataset.target);
    if (el && window.scrollY >= el.offsetTop - 200) cur = dot.dataset.target;
  });
  dots.forEach(d => d.classList.toggle('active', d.dataset.target === cur));
}

/* ═══════════════════════════════════════════
   6. MOBILE MENU
═══════════════════════════════════════════ */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}

/* ═══════════════════════════════════════════
   7. SMOOTH SCROLL
═══════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth' });
  });
});

/* Back to top */
if (btt) btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ═══════════════════════════════════════════
   8. SCROLL REVEAL
═══════════════════════════════════════════ */
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); }
  });
}, { threshold: 0.07, rootMargin: '0px 0px -28px 0px' });
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

/* ═══════════════════════════════════════════
   9. COUNTER ANIMATION
═══════════════════════════════════════════ */
const co = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { tick(e.target); co.unobserve(e.target); } });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => co.observe(el));

function tick(el) {
  const target = parseInt(el.dataset.count);
  const suf = el.dataset.suffix || '';
  const dur = 1800, start = performance.now();
  (function loop(now) {
    const p = Math.min((now - start) / dur, 1);
    const e = 1 - Math.pow(1 - p, 4);
    el.textContent = Math.round(target * e) + suf;
    if (p < 1) requestAnimationFrame(loop);
    else el.textContent = target + suf;
  })(start);
}

/* ═══════════════════════════════════════════
   10. CARD TILT
═══════════════════════════════════════════ */
document.querySelectorAll('.why-card, .vm-card, .glass-card.wide').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const rx = ((y - r.height/2) / r.height) * -4;
    const ry = ((x - r.width/2)  / r.width)  *  4;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-5px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

/* ═══════════════════════════════════════════
   11. INTERACTIVE TERMINAL
═══════════════════════════════════════════ */
const termBody  = document.getElementById('term-body');
const termInput = document.getElementById('term-input');
const termClock = document.getElementById('term-clock');

// Live clock
if (termClock) {
  function updateClock() {
    const now = new Date();
    termClock.textContent = now.toLocaleTimeString('en-GB', { hour12: false }) + ' | Cairo, EG';
  }
  updateClock(); setInterval(updateClock, 1000);
}

const CMD_RESPONSES = {
  help: () => [
    { t: 'info',    v: '╔══════════════════════════════════╗' },
    { t: 'info',    v: '║    VIION CLI v2.4  —  Help Menu   ║' },
    { t: 'info',    v: '╚══════════════════════════════════╝' },
    { t: '',        v: '' },
    { t: 'success', v: '  services    →  List all VIION services' },
    { t: 'success', v: '  about       →  Company overview' },
    { t: 'success', v: '  contact     →  Contact information' },
    { t: 'success', v: '  status      →  Live system status' },
    { t: 'success', v: '  connect     →  Simulate VPN connection' },
    { t: 'success', v: '  portfolio   →  Our client case studies' },
    { t: 'success', v: '  compliance  →  HIPAA & GAHAR info' },
    { t: 'success', v: '  clear       →  Clear terminal' },
    { t: '',        v: '' },
    { t: 'dim',     v: '  Press ↑ to recall previous command' },
  ],

  services: () => [
    { t: 'info',    v: '[ VIION Services ]' },
    { t: '',        v: '' },
    { t: 'success', v: '  ■  IT Infrastructure       — Server & network design' },
    { t: 'success', v: '  ■  EHR / EMR Support       — Electronic health records' },
    { t: 'success', v: '  ■  Cloud & Virtualization  — Azure, AWS, on-premise' },
    { t: 'success', v: '  ■  Compliance Support      — HIPAA, GAHAR, ISO' },
    { t: 'success', v: '  ■  Help Desk & Support     — 24/7 technical support' },
    { t: 'success', v: '  ■  Network & Connectivity  — VPN, LAN/WAN, Firewall' },
    { t: 'success', v: '  ■  IT Strategy & Consulting— Roadmaps, FRD, BA' },
    { t: 'success', v: '  ■  Security & Encryption   — SSL/TLS, endpoint security' },
    { t: '',        v: '' },
    { t: 'dim',     v: '  Type "contact" to get a quote →' },
  ],

  about: () => [
    { t: 'info',    v: '[ VIION Group — Company Overview ]' },
    { t: '',        v: '' },
    { t: 'success', v: '  Name       :  VIION Group' },
    { t: 'success', v: '  Founded    :  2018, Cairo, Egypt' },
    { t: 'success', v: '  Focus      :  100% Healthcare IT' },
    { t: 'success', v: '  Experience :  19+ years combined' },
    { t: 'success', v: '  Clients    :  5+ healthcare organizations' },
    { t: 'success', v: '  Standards  :  HIPAA ✓  GAHAR ✓  ISO ✓' },
    { t: '',        v: '' },
    { t: 'dim',     v: '  We bridge the gap between clinical needs' },
    { t: 'dim',     v: '  and technology solutions.' },
  ],

  contact: () => [
    { t: 'info',    v: '[ Contact Information ]' },
    { t: '',        v: '' },
    { t: 'success', v: '  Consultant :  Ahmed Mahmoud' },
    { t: 'success', v: '  Role       :  HIS Consultant' },
    { t: 'success', v: '  Phone      :  +20 155 666 1772' },
    { t: 'success', v: '  Email      :  a_mahmoud@viiongroup.com' },
    { t: 'success', v: '  Web        :  www.viiongroup.com' },
    { t: '',        v: '' },
    { t: 'warn',    v: '  Available: Sun–Thu, 9:00 AM – 6:00 PM EET' },
  ],

  status: () => {
    const uptime = Math.floor(Math.random() * 1000) + 8760;
    const lat    = Math.floor(Math.random() * 8) + 8;
    return [
      { t: 'info',    v: '[ System Status — Live ]' },
      { t: '',        v: '' },
      { t: 'success', v: '  ● EHR Gateway        ONLINE    ✓' },
      { t: 'success', v: '  ● VPN Tunnel         ACTIVE    ✓' },
      { t: 'success', v: '  ● Firewall           SECURED   ✓' },
      { t: 'success', v: '  ● Cloud Sync         RUNNING   ✓' },
      { t: 'success', v: '  ● HIPAA Monitor      COMPLIANT ✓' },
      { t: 'success', v: '  ● Data Backup        COMPLETE  ✓' },
      { t: '',        v: '' },
      { t: 'info',    v: `  Uptime: ${uptime} hrs  |  Latency: ${lat}ms  |  Uptime: 99.98%` },
    ];
  },

  connect: () => [
    { t: 'info',    v: '  Initializing VIION secure connection...' },
    { t: 'dim',     v: '  Loading encryption keys...' },
    { t: 'dim',     v: '  Authenticating with HIPAA gateway...' },
    { t: 'success', v: '  ✔ VPN tunnel established' },
    { t: 'success', v: '  ✔ HIPAA compliance verified' },
    { t: 'success', v: '  ✔ Firewall rules applied' },
    { t: 'success', v: '  ✔ EHR bridge active [847 records synced]' },
    { t: 'dim',     v: '  Endpoint: 192.168.1.0/24 encrypted' },
    { t: 'dim',     v: '  Protocol: AES-256-GCM | TLS 1.3' },
  ],

  portfolio: () => [
    { t: 'info',    v: '[ VIION Portfolio — Key Clients ]' },
    { t: '',        v: '' },
    { t: 'success', v: '  1. El Gamal Group           — Multi-site VPN + EHR' },
    { t: 'success', v: '  2. Consolto Egypt           — Medical tourism platform' },
    { t: 'success', v: '  3. Obour Specialized Hosp  — Infrastructure + FRD' },
    { t: 'success', v: '  4. Cairo Cure Medical Ctr  — IT overhaul + DC' },
    { t: '',        v: '' },
    { t: 'dim',     v: '  Scroll down to view full case studies →' },
  ],

  compliance: () => [
    { t: 'info',    v: '[ Compliance & Standards ]' },
    { t: '',        v: '' },
    { t: 'success', v: '  ✔ HIPAA   — Health Insurance Portability & Accountability' },
    { t: 'success', v: '  ✔ GAHAR   — General Authority for Healthcare Accreditation' },
    { t: 'success', v: '  ✔ ISO 27001 — Information Security Management' },
    { t: 'success', v: '  ✔ NIST    — Cybersecurity Framework' },
    { t: '',        v: '' },
    { t: 'dim',     v: '  All VIION solutions are compliance-first by design.' },
  ],

  clear: () => '__CLEAR__',
};

const cmdHistory = [];
let histIdx = -1;

function termPrint(lines, instant = false) {
  if (lines === '__CLEAR__') { termBody.innerHTML = ''; return; }
  const delay = instant ? 0 : 18;
  lines.forEach((line, i) => {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 't-line';
      const cls = line.t ? ` class="t-${line.t}"` : '';
      el.innerHTML = `<span${cls}>${escapeHtml(line.v)}</span>`;
      termBody.appendChild(el);
      termBody.scrollTop = termBody.scrollHeight;
    }, i * delay);
  });
}

function termPrintPrompt(cmd) {
  const el = document.createElement('div');
  el.className = 't-line';
  el.innerHTML = `<span class="t-prompt">viion@hq:~$&nbsp;</span><span>${escapeHtml(cmd)}</span>`;
  termBody.appendChild(el);
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function handleTermCmd(raw) {
  const cmd = raw.trim().toLowerCase();
  if (!cmd) return;
  cmdHistory.unshift(cmd); histIdx = -1;
  termPrintPrompt(cmd);

  const blank = { t: '', v: '' };
  if (CMD_RESPONSES[cmd]) {
    const res = CMD_RESPONSES[cmd]();
    if (res === '__CLEAR__') { termPrint('__CLEAR__'); return; }
    termPrint([blank, ...res, blank]);
  } else {
    termPrint([blank,
      { t: 'error', v: `  Command not found: "${cmd}"` },
      { t: 'dim',   v: '  Type "help" to see available commands.' },
      blank,
    ]);
  }
}

// Boot sequence
const bootLines = [
  { t: 'dim',     v: '  VIION Healthcare CLI v2.4.0' },
  { t: 'dim',     v: '  Copyright 2018–2026 VIION Group. All rights reserved.' },
  { t: '',        v: '' },
  { t: 'success', v: '  ✔ Healthcare IT systems loaded' },
  { t: 'success', v: '  ✔ HIPAA compliance module active' },
  { t: 'success', v: '  ✔ Secure connection established' },
  { t: '',        v: '' },
  { t: 'info',    v: '  Welcome. Type "help" to see available commands.' },
  { t: '',        v: '' },
];
termPrint(bootLines, true);

if (termInput) {
  termInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const val = termInput.value;
      termInput.value = '';
      handleTermCmd(val);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (histIdx < cmdHistory.length - 1) termInput.value = cmdHistory[++histIdx];
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx > 0) termInput.value = cmdHistory[--histIdx];
      else { histIdx = -1; termInput.value = ''; }
    }
  });

  // Click anywhere on terminal to focus input
  document.getElementById('terminal-wrap')?.addEventListener('click', () => termInput.focus());
}

/* ═══════════════════════════════════════════
   12. CHATBOT
═══════════════════════════════════════════ */
const chatWidget  = document.getElementById('chatWidget');
const chatMessages= document.getElementById('chatMessages');
const chatInput   = document.getElementById('chatInput');
const chatSend    = document.getElementById('chatSend');
const chatClose   = document.getElementById('chatClose');
const fabChat     = document.getElementById('fabChat');
const quickReplies= document.getElementById('quickReplies');

const BOT_KB = {
  'services':     'VIION offers 8 core services: IT Infrastructure, EHR/EMR Support, Cloud & Virtualization, Compliance Support, 24/7 Help Desk, Network & Connectivity, IT Strategy & Consulting, and Security & Encryption. Which one interests you most?',
  'help':         'VIION helps hospitals and clinics by improving operational efficiency, ensuring real-time connectivity, guaranteeing HIPAA/GAHAR compliance, and providing end-to-end ongoing support. We become your long-term IT partner.',
  'hospital':     'VIION helps hospitals by designing and maintaining their entire IT infrastructure — from networks and servers to EHR systems and data centers. We reduce downtime and ensure your patient data is always secure.',
  'hipaa':        'Yes, VIION is fully aligned with HIPAA regulations. We implement encryption, access controls, audit logs, and data governance policies that meet all HIPAA privacy and security requirements.',
  'gahar':        'GAHAR (General Authority for Healthcare Accreditation) compliance is built into all our healthcare IT solutions. We help facilities document processes, secure patient data, and meet all GAHAR IT standards.',
  'compliance':   'VIION supports HIPAA, GAHAR, ISO 27001, and NIST compliance frameworks. Our compliance-first approach means every solution we deliver is designed to meet the highest regulatory standards.',
  'ehr':          'Our EHR/EMR support includes full integration, configuration, staff training, ongoing optimization, and 24/7 technical support. We work with all major EHR platforms and ensure GAHAR alignment.',
  'vpn':          'We design and deploy site-to-site VPN solutions using enterprise-grade encryption (AES-256, TLS 1.3). This allows your hospital branches and remote teams to securely access patient records and systems.',
  'cloud':        'VIION offers cloud migration and hybrid infrastructure solutions tailored for healthcare. Whether you need Azure, AWS, or an on-premise setup, we design it for scalability, security, and HIPAA compliance.',
  'security':     'Our security suite includes multi-layer firewall deployment, endpoint protection, VPN encryption, SSL/TLS implementation, network segmentation, and continuous security monitoring.',
  'started':      'Getting started with VIION is simple! \n1. Contact us via +20 155 666 1772 or a_mahmoud@viiongroup.com\n2. We schedule a free IT assessment\n3. Our team designs a custom solution\n4. We deploy with zero downtime\nWould you like to reach out now?',
  'price':        'Our pricing is customized based on your organization\'s size, infrastructure, and specific needs. Contact us at +20 155 666 1772 for a free consultation and tailored quote.',
  'quote':        'To get a quote, please contact:\n📞 +20 155 666 1772\n✉  a_mahmoud@viiongroup.com\nWe\'ll schedule a free assessment and provide a detailed proposal.',
  'contact':      'You can reach VIION at:\n📞 +20 155 666 1772\n✉  a_mahmoud@viiongroup.com\n🌐 www.viiongroup.com\nOur team is available Sun–Thu, 9AM–6PM Cairo time.',
  'hello':        'Hello! 👋 Welcome to VIION Group. I\'m your Healthcare IT assistant. How can I help you today? You can ask me about our services, compliance, pricing, or how to get started.',
  'hi':           'Hi there! 👋 I\'m the VIION Assistant. Ask me anything about our Healthcare IT services, compliance standards, or how we can help your organization.',
  'thanks':       'You\'re welcome! 😊 Is there anything else I can help you with? Don\'t hesitate to ask.',
};

function matchBotResponse(msg) {
  const m = msg.toLowerCase();
  for (const [key, resp] of Object.entries(BOT_KB)) {
    if (m.includes(key)) return resp;
  }
  return "I'd be happy to help! For specific questions about VIION's healthcare IT services, please try asking about: **services**, **HIPAA**, **GAHAR**, **EHR**, **cloud**, **security**, or **pricing**. You can also reach us directly at +20 155 666 1772.";
}

function formatTime() {
  return new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true });
}

function appendMessage(text, from = 'bot') {
  const msg = document.createElement('div');
  msg.className = `chat-msg ${from}`;
  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble';
  bubble.textContent = text;
  const time = document.createElement('div');
  time.className = 'msg-time';
  time.textContent = formatTime();
  msg.appendChild(bubble);
  msg.appendChild(time);
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTyping() {
  const ti = document.createElement('div');
  ti.className = 'chat-msg bot';
  ti.id = 'typingIndicator';
  ti.innerHTML = `<div class="typing-indicator"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>`;
  chatMessages.appendChild(ti);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTyping() {
  const ti = document.getElementById('typingIndicator');
  if (ti) ti.remove();
}

function sendUserMessage(text) {
  if (!text.trim()) return;
  appendMessage(text, 'user');
  if (chatInput) chatInput.value = '';
  // Remove quick replies after first message
  if (quickReplies) quickReplies.style.display = 'none';
  showTyping();
  setTimeout(() => {
    hideTyping();
    appendMessage(matchBotResponse(text), 'bot');
  }, 800 + Math.random() * 600);
}

if (fabChat) {
  fabChat.addEventListener('click', () => {
    chatWidget.classList.toggle('open');
    // Remove badge on open
    const badge = fabChat.querySelector('.fab-chat-badge');
    if (badge) badge.style.display = 'none';
    if (chatWidget.classList.contains('open')) {
      // Show welcome message if first open
      if (chatMessages.children.length === 0) {
        setTimeout(() => {
          showTyping();
          setTimeout(() => {
            hideTyping();
            appendMessage("Hello! 👋 I'm the VIION Healthcare IT Assistant. How can I help you today?", 'bot');
          }, 800);
        }, 200);
      }
      if (chatInput) chatInput.focus();
    }
  });
}

if (chatClose) chatClose.addEventListener('click', () => chatWidget.classList.remove('open'));

if (chatSend) {
  chatSend.addEventListener('click', () => { if (chatInput) sendUserMessage(chatInput.value); });
}
if (chatInput) {
  chatInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendUserMessage(chatInput.value); });
}

// Quick replies
if (quickReplies) {
  quickReplies.querySelectorAll('.quick-reply').forEach(btn => {
    btn.addEventListener('click', () => sendUserMessage(btn.dataset.msg));
  });
}

/* ═══════════════════════════════════════════
   13. CONTACT MODAL
═══════════════════════════════════════════ */
const contactModal = document.getElementById('contactModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose   = document.getElementById('modalClose');
const fabContact   = document.getElementById('fabContact');

function openModal()  { if (contactModal) contactModal.classList.add('open'); }
function closeModal() { if (contactModal) contactModal.classList.remove('open'); }

if (fabContact)   fabContact.addEventListener('click', openModal);
if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
if (modalClose)   modalClose.addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ═══════════════════════════════════════════
   14. CONTACT FORM
═══════════════════════════════════════════ */
const cf = document.getElementById('contactForm');
if (cf) {
  cf.addEventListener('submit', e => {
    e.preventDefault();
    const btn = document.getElementById('cfSubmit');
    const orig = btn.innerHTML;
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg> Message Sent!`;
    btn.style.background = 'linear-gradient(135deg,#10b981,#059669)';
    setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; cf.reset(); }, 3500);
  });
}

/* ═══════════════════════════════════════════
   15. PROCESS STEP HOVER TRAIL
═══════════════════════════════════════════ */
const pSteps = document.querySelectorAll('.p-step');
pSteps.forEach((step, i) => {
  step.addEventListener('mouseenter', () => {
    pSteps.forEach((s, j) => {
      const n = s.querySelector('.p-num');
      if (n) n.style.borderColor = j <= i ? 'rgba(37,99,235,0.7)' : '';
    });
  });
  step.addEventListener('mouseleave', () => {
    pSteps.forEach(s => { const n = s.querySelector('.p-num'); if (n) n.style.borderColor = ''; });
  });
});

}); // DOMContentLoaded
