/* =============================================
   VIION GROUP — Ultra Premium Scripts v3 (Arabic RTL)
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ═══════════ CUSTOM CURSOR ═══════════
  const customCursor = document.getElementById('custom-cursor');
  if (customCursor) {
    window.addEventListener('mousemove', e => {
      customCursor.style.left = `${e.clientX}px`;
      customCursor.style.top = `${e.clientY}px`;
    });
    
    // Add hover effect on clickable elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => customCursor.classList.add('hovering'));
      el.addEventListener('mouseleave', () => customCursor.classList.remove('hovering'));
    });
  }

  // ═══════════ CHAT BOT LOGIC (Arabic) ═══════════
  const chatToggle = document.getElementById('chatbot-toggle');
  const chatWindow = document.getElementById('chatbot-window');
  const chatClose = document.getElementById('chatbot-close');
  const chatInput = document.getElementById('chatbot-input');
  const chatSend = document.getElementById('chatbot-send');
  const chatBody = document.getElementById('chatbot-body');

  if (chatToggle && chatWindow) {
    chatToggle.addEventListener('click', (e) => {
      e.preventDefault();
      chatWindow.classList.toggle('hidden');
    });
    chatClose.addEventListener('click', () => {
      chatWindow.classList.add('hidden');
    });

    let messageCount = 0;
    const botReplies = [
      "فهمت. فريقنا المتخصص في البنية التحتية لديه خبرة واسعة في المنشآت الصحية تحديداً.",
      "هل يمكنك توضيح عدد العيادات أو الفروع الموجودة حالياً في شبكتك؟",
      "منطقي جداً. يمكننا بالتأكيد تبسيط هذه العملية وضمان التوافق الكامل مع معايير حماية البيانات.",
      "هل تودّ أن أرتب لك مكالمة مباشرة مع م. أحمد محمود لمناقشة التفاصيل؟"
    ];

    const specificReplies = {
      "دعم السجلات الطبية": "لدينا خبرة واسعة في دمج ودعم أنظمة السجلات الصحية والطبية الإلكترونية الرائدة لضمان سير العمل السريري بسلاسة والتوافق مع معايير GAHAR. كم فرع لديكم في الشبكة؟",
      "البنية التحتية": "حلول البنية التحتية لدينا مصممة خصيصاً لمتطلبات التوفر العالي والأمان في المنشآت الصحية الحديثة. هل تبحثون عن ترقية بنية تحتية قائمة؟",
      "الحوسبة السحابية": "نقدم خدمات نقل سحابية آمنة ومتوافقة مع HIPAA مصممة للمستشفيات، تضمن عدم توقف العمل وتخزين قابل للتوسع. هل لديكم مزود خدمة سحابية مفضل؟",
      "الأمن السيبراني": "بيانات الرعاية الصحية حساسة للغاية. نحن ننفذ بروتوكولات أمان قوية تشمل حماية النقاط الطرفية والشبكات المشفرة. هل تودون تقييم أمني مجاني؟"
    };

    const sendUserMessage = (text) => {
      const userMsg = document.createElement('div');
      userMsg.className = 'chat-message user';
      userMsg.textContent = text;
      chatBody.appendChild(userMsg);
      chatInput.value = '';
      chatBody.scrollTop = chatBody.scrollHeight;

      // Show Typing Indicator
      const typingDiv = document.createElement('div');
      typingDiv.className = 'typing-indicator';
      typingDiv.innerHTML = '<span></span><span></span><span></span>';
      chatBody.appendChild(typingDiv);
      chatBody.scrollTop = chatBody.scrollHeight;

      // Simulate AI typing delay
      const delay = Math.random() * 1500 + 1000;
      setTimeout(() => {
        chatBody.removeChild(typingDiv);
        
        const botMsg = document.createElement('div');
        botMsg.className = 'chat-message bot';
        
        if (specificReplies[text]) {
           botMsg.textContent = specificReplies[text];
           delete specificReplies[text];
        } else if (text === "القائمة الرئيسية") {
           botMsg.textContent = "بالطبع! كيف يمكنني مساعدتك؟ اختر من الخيارات التالية:";
        } else if (text === "تحدث مع المبيعات") {
           botMsg.textContent = "ممتاز! سأقوم بتحويلك لفريق المبيعات. يمكنك التواصل مباشرة مع م. أحمد محمود على الرقم: +20 155 666 1772";
        } else if (messageCount < botReplies.length) {
           botMsg.textContent = botReplies[messageCount];
           messageCount++;
        } else {
           botMsg.textContent = "شكراً لك! لقد أرسلت هذه التفاصيل لفريقنا. سنتواصل معك قريباً.";
        }
        
        chatBody.appendChild(botMsg);
        
        if (text === "القائمة الرئيسية") {
          appendOptions(["دعم السجلات الطبية", "البنية التحتية", "الحوسبة السحابية", "الأمن السيبراني"]);
        } else {
          appendOptions(["القائمة الرئيسية", "تحدث مع المبيعات"]);
        }
        
        chatBody.scrollTop = chatBody.scrollHeight;
      }, delay);
    };

    const sendMessage = () => {
      const text = chatInput.value.trim();
      if (!text) return;
      sendUserMessage(text);
    };

    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') sendMessage();
    });

    const appendOptions = (optionsArray) => {
      const optionsDiv = document.createElement('div');
      optionsDiv.className = 'chat-options';
      optionsArray.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'chat-option-btn';
        btn.textContent = opt;
        btn.addEventListener('click', () => {
          sendUserMessage(opt);
          optionsDiv.style.display = 'none';
        });
        if (customCursor) {
          btn.addEventListener('mouseenter', () => customCursor.classList.add('hovering'));
          btn.addEventListener('mouseleave', () => customCursor.classList.remove('hovering'));
        }
        optionsDiv.appendChild(btn);
      });
      chatBody.appendChild(optionsDiv);
      chatBody.scrollTop = chatBody.scrollHeight;
    };

    // Initialize first options (Arabic)
    appendOptions(["دعم السجلات الطبية", "البنية التحتية", "الحوسبة السحابية", "الأمن السيبراني"]);
  }

  // ═══════════ THEME TOGGLE ═══════════
  const themeToggle = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme');
  
  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      let theme = document.documentElement.getAttribute('data-theme');
      if (theme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      }
    });
  }

  // ═══════════ PARTICLE NETWORK CANVAS ═══════════
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height, particles, mouse;

    mouse = { x: null, y: null, radius: 250 };

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    const orbs = document.querySelectorAll('.aurora-orb');

    window.addEventListener('mousemove', e => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if(orbs.length) {
        const x = (e.clientX / window.innerWidth - 0.5) * 180;
        const y = (e.clientY / window.innerHeight - 0.5) * 180;
        orbs.forEach((orb, index) => {
          const factor = (index + 1) * -1.2;
          orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
        });
      }
    });
    window.addEventListener('mouseleave', () => { 
      mouse.x = null; 
      mouse.y = null; 
      orbs.forEach(orb => orb.style.transform = 'translate(0, 0)');
    });

    class Node {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.radius = Math.random() * 1.8 + 0.5;
        this.baseAlpha = Math.random() * 0.5 + 0.15;
        this.alpha = this.baseAlpha;
        this.hue = Math.random() > 0.6 ? 199 : (Math.random() > 0.5 ? 220 : 240);
        this.sat = 70 + Math.random() * 20;
        this.light = 60 + Math.random() * 15;
      }

      update() {
        if (mouse.x !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.vx += (dx / dist) * force * 0.15;
            this.vy += (dy / dist) * force * 0.15;
            this.alpha = Math.min(this.baseAlpha + force * 0.4, 0.9);
          } else {
            this.alpha += (this.baseAlpha - this.alpha) * 0.05;
          }
        }

        this.x += this.vx;
        this.y += this.vy;

        this.vx *= 0.995;
        this.vy *= 0.995;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, ${this.sat}%, ${this.light}%, ${this.alpha})`;
        ctx.fill();
      }
    }

    function initNodes() {
      const count = Math.min(Math.floor((width * height) / 4000), 250);
      particles = Array.from({ length: count }, () => new Node());
    }

    function drawLines() {
      const maxDist = 200;
      for (let i = 0; i < particles.length; i++) {
        if (mouse.x !== null) {
          const dxM = particles[i].x - mouse.x;
          const dyM = particles[i].y - mouse.y;
          const distM = Math.sqrt(dxM * dxM + dyM * dyM);
          if (distM < mouse.radius) {
            const alphaM = (1 - distM / mouse.radius) * 0.35;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alphaM})`;
            ctx.lineWidth = 1.0;
            ctx.stroke();
          }
        }

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => { p.update(); p.draw(); });
      drawLines();
      requestAnimationFrame(animate);
    }

    resize();
    initNodes();
    animate();

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { resize(); initNodes(); }, 250);
    });
  }

  // ═══════════ NAVBAR SCROLL ═══════════
  const navbar = document.getElementById('navbar');
  const btt = document.getElementById('backToTop');

  function onScroll() {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 60);
    btt.classList.toggle('visible', y > 500);
    highlightNav();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ═══════════ ACTIVE NAV ═══════════
  function highlightNav() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-links a:not(.nav-cta-btn):not(.lang-switch-btn)');
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 150) current = s.id;
    });
    links.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
    });
  }

  // ═══════════ MOBILE MENU ═══════════
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

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

  // ═══════════ BACK TO TOP ═══════════
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ═══════════ SMOOTH SCROLL ═══════════
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ═══════════ SCROLL REVEAL (Intersection Observer) ═══════════
  const reveals = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  reveals.forEach(el => revealObs.observe(el));

  // ═══════════ ANIMATED COUNTERS ═══════════
  const counters = document.querySelectorAll('[data-count]');
  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        runCounter(e.target);
        counterObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObs.observe(el));

  function runCounter(el) {
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 2200;
    const start = performance.now();

    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(target * ease) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(tick);
  }

  // ═══════════ CONTACT FORM (Arabic) ═══════════
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.btn-primary');
    const original = btn.innerHTML;
    btn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
      تم الإرسال بنجاح!
    `;
    btn.style.background = 'linear-gradient(135deg, #34d399, #059669)';
    setTimeout(() => { btn.innerHTML = original; btn.style.background = ''; form.reset(); }, 3000);
  });

  // ═══════════ TILT EFFECT ON HERO METRICS (RTL-aware) ═══════════
  document.querySelectorAll('.hero-metric').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * -4; // Flipped for RTL
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateX(8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ═══════════ MAGNETIC EFFECT ON BENTO CARDS ═══════════
  document.querySelectorAll('.bento-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });
  });

  // ═══════════ CMS PORTFOLIO FETCH (Supabase - Arabic) ═══════════
  async function fetchPortfolio() {
    if (typeof supabaseClient === 'undefined' || !supabaseClient) return;
    try {
      const { data, error } = await supabaseClient.from('portfolio_projects').select('*').order('created_at', { ascending: false });
      if (error || !data || data.length === 0) return; // Fallback to hardcoded HTML

      const casesStack = document.querySelector('.cases-stack');
      if (!casesStack) return;
      casesStack.innerHTML = ''; // Clear hardcoded

      data.forEach((proj, index) => {
        const block = document.createElement('div');
        block.className = 'case-block reveal revealed';
        
        const colorVar = `var(--${proj.theme_color || 'cyan'})`;
        block.style.setProperty('--card-glow', colorVar);
        
        let bulletsHtml = proj.bullets_ar.map(b => `
          <li>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${colorVar}" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            ${b}
          </li>
        `).join('');

        block.innerHTML = `
          <span class="case-tag" style="background: rgba(var(--${proj.theme_color || 'cyan'}-rgb, 56,189,248), 0.1); color: ${colorVar}">${proj.tag_ar}</span>
          <h3>${proj.title_ar}</h3>
          <ul class="case-list">
            ${bulletsHtml}
          </ul>
        `;
        casesStack.appendChild(block);
      });
    } catch(err) {
      console.log('CMS fetch failed, using hardcoded fallback.');
    }
  }
  
  fetchPortfolio();

  // ══════════ PRICING CALCULATOR LOGIC ══════════
  const setupCalculator = (isAR) => {
    const suffix = isAR ? 'AR' : '';
    const deviceInput = document.getElementById('deviceCount' + suffix);
    const deviceValue = document.getElementById('deviceValue' + suffix);
    const networkRadios = document.querySelectorAll(`input[name="networkType${suffix}"]`);
    const priceMin = document.getElementById('priceMin' + suffix);
    const priceMax = document.getElementById('priceMax' + suffix);

    if (!deviceInput || !priceMin) return;

    let currentMin = parseInt(priceMin.innerText.replace(/,/g, ''));
    let currentMax = parseInt(priceMax.innerText.replace(/,/g, ''));

    const calculatePrice = () => {
      const devices = parseInt(deviceInput.value);
      deviceValue.innerText = devices;

      let networkType = 'local';
      networkRadios.forEach(radio => {
        if (radio.checked) networkType = radio.value;
      });

      let basePrice = devices * 50; // $50 per device
      let total = basePrice;

      if (networkType === 'multi') {
        total = (basePrice + 500) * 1.2; // Add VPN overhead and 20% complexity
      }

      const newMin = Math.floor(total * 0.9);
      const newMax = Math.ceil(total * 1.1);

      animateValue(priceMin, currentMin, newMin);
      animateValue(priceMax, currentMax, newMax);
      
      currentMin = newMin;
      currentMax = newMax;
    };

    deviceInput.addEventListener('input', calculatePrice);
    networkRadios.forEach(radio => radio.addEventListener('change', calculatePrice));

    calculatePrice();
  };

  // We only declare animateValue once globally if needed, but since it's enclosed we can declare it here.
  // Wait, if it's already in script.js and both are loaded? No, they run on separate pages.
  function animateValue(obj, start, end) {
    let startTimestamp = null;
    const duration = 300; // ms
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const current = Math.floor(progress * (end - start) + start);
      obj.innerHTML = current.toLocaleString();
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  setupCalculator(true); // Arabic
});
