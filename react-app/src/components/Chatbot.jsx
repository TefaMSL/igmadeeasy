import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import MascotSvg from './MascotSvg';

// Lightweight cheerful sound synthesizer using Web Audio API
const playSound = (type = 'receive') => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    if (type === 'send') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(720, now + 0.08);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(580, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    }
  } catch {
    // Audio context may be restricted by browser policy before first interaction
  }
};

export const Chatbot = () => {
  const { t, lang } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showQuickOptions, setShowQuickOptions] = useState(true);
  const [input, setInput] = useState('');
  const [currentSection, setCurrentSection] = useState('hero');

  // Mascot dynamic facial reactions
  const [isBlinking, setIsBlinking] = useState(false);
  const [mascotMood, setMascotMood] = useState('happy'); // 'happy' | 'thinking' | 'talking'
  const [lookOffset, setLookOffset] = useState({ x: 0, y: 0 });

  const messagesEndRef = useRef(null);
  const chatWindowRef = useRef(null);
  const inputRef = useRef(null);

  // Detect active section asynchronously without scroll event overhead or layout reflows
  useEffect(() => {
    const sections = ['problem', 'features', 'comparison', 'pricing', 'sample', 'faq'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Natural blinking interval
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 3800);
    return () => clearInterval(blinkInterval);
  }, []);

  // Mascot eyes track mouse movement smoothly
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isOpen) return;
      const winW = window.innerWidth;
      const winH = window.innerHeight;
      const nx = (e.clientX / winW - 0.5) * 4;
      const ny = (e.clientY / winH - 0.5) * 3;
      setLookOffset({ x: nx, y: ny });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isOpen]);

  // Comprehensive, un-truncated quick questions list
  const quickQuestions = [
    {
      id: 'price',
      icon: '💰',
      ar: 'كم سعر الكتاب والتوفير (85%)؟',
      en: 'What is the price & 85% savings?',
    },
    {
      id: 'curriculum',
      icon: '📚',
      ar: 'هل مطابق لمنهج Cambridge 2026؟',
      en: 'Is it 100% Cambridge 2026 aligned?',
    },
    {
      id: 'age',
      icon: '🎯',
      ar: 'هل يناسب سن وتدرج مستوى ابني؟',
      en: 'Does it fit my child’s age & grade?',
    },
    {
      id: 'shipping',
      icon: '🚚',
      ar: 'مدة الشحن لمصر ودول الخليج؟',
      en: 'Shipping time to Egypt & GCC?',
    },
    {
      id: 'sample',
      icon: '📖',
      ar: 'أقدر أتصفح عينة مجانية PDF؟',
      en: 'Can I preview a free PDF sample?',
    },
    {
      id: 'order',
      icon: '⚡',
      ar: 'طريقة الطلب الفوري وتأكيد الحجز؟',
      en: 'How to order instantly via WhatsApp?',
    },
  ];

  // Dynamic context-aware greeting
  const getContextGreeting = () => {
    if (lang === 'ar') {
      if (currentSection === 'pricing') {
        return '👋 أهلاً بك! لاحظت إنك تتصفح قسم الأسعار — وفرك مع IG Made Easy يتجاوز 85% مقارنة بالكتب المستوردة (25 يورو) مع شحن سريع وبدون جمارك! تحب تعرف تفاصيل الباقات؟';
      }
      if (currentSection === 'sample') {
        return '👋 مرحباً! هل تحب تطلع على نموذج من فصول الكتاب ونماذج امتحانات Cambridge المحلولة؟ اضغط على زر العينة المجانية في الأسفل!';
      }
      if (currentSection === 'comparison') {
        return '👋 مرحباً! كتاب IG Made Easy يجمع بين صرامة معايير Cambridge وسهولة الشرح باللغة العربية للكلمات المفتاحية الصعبة. كيف أساعدك في المقارنة؟';
      }
      return '👋 أهلاً بك! أنا المساعد الذكي لكتاب IG Made Easy — البديل العربي الأول لمناهج IGCSE. كيف أقدر أساعدك اليوم في رحلة تفوق ابنك؟';
    } else {
      if (currentSection === 'pricing') {
        return '👋 Welcome! Noticed you’re viewing our Pricing — IG Made Easy saves over 85% compared to €25+ imported textbooks with fast local delivery! Want bundle details?';
      }
      if (currentSection === 'sample') {
        return '👋 Hello! Would you like to preview authentic sample chapters and solved Cambridge past paper styles? Ask below!';
      }
      return "👋 Hello! I'm the IG Made Easy smart assistant — the #1 Arab alternative for Cambridge IGCSE. How can I help you today?";
    }
  };

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: getContextGreeting(),
      action: null,
    },
  ]);

  // Re-sync greeting if user switches language and hasn't messaged yet
  useEffect(() => {
    if (messages.length === 1 && messages[0].sender === 'bot') {
      setMessages([
        {
          sender: 'bot',
          text: getContextGreeting(),
          action: null,
        },
      ]);
    }
  }, [lang]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isOpen]);

  const handleSend = (textToSend, customAction = null) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    if (soundEnabled) playSound('send');
    setShowTooltip(false);

    // Append user message
    const userMsg = { sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setMascotMood('thinking');

    // Make mascot look down towards message typing
    setLookOffset({ x: 0, y: 2 });

    // Intelligent AI response calculation
    setTimeout(() => {
      let reply = '';
      let action = customAction;
      const q = query.toLowerCase();

      if (q.includes('سعر') || q.includes('كام') || q.includes('توفير') || q.includes('price') || q.includes('cost') || q.includes('saving')) {
        reply =
          lang === 'ar'
            ? '💰 **توفير حقيقي يفوق 85%:**\nالكتب المستوردة تكلف ما بين 25 إلى 35 يورو (أكثر من 1,500 إلى 2,000 جنيه) بالإضافة لمصاريف الشحن والجمارك.\n\nكتاب **IG Made Easy** يأتيك بسعر اقتصادي جداً شامل التمارين ونماذج الامتحانات بدون أي جمارك مع إمكانية استرداد كامل خلال 14 يوماً!'
            : '💰 **Save Over 85%:**\nImported Cambridge textbooks cost €25 - €35+ plus steep international freight and customs.\n\n**IG Made Easy** provides full curriculum coverage, exercises, and exams at a fraction of the cost, with a 14-day money-back guarantee!';
        action = {
          type: 'scroll',
          target: '#order-form',
          label: lang === 'ar' ? '🔥 احجز نسختك ووفر 85% الآن' : '🔥 Order Now & Save 85%',
        };
      } else if (q.includes('منهج') || q.includes('cambridge') || q.includes('مطابق') || q.includes('curriculum') || q.includes('syllabus')) {
        reply =
          lang === 'ar'
            ? '📚 **مطابقة تامة 100% لمعايير Cambridge IGCSE 2026:**\n• يغطي كافة المهارات المطلوبة (Reading, Writing, Summary, Directed Writing).\n• يحتوي على تدريبات من امتحانات حقيقية (Past Papers).\n• مصمم خصيصاً للتغلب على صعوبات الترجمة والمصطلحات الإنجليزية لدى الطلاب العرب.'
            : '📚 **100% Aligned with Cambridge IGCSE 2026:**\n• Covers all tested core skills (Reading, Summary, Directed Writing).\n• Includes authentic past-paper practice questions and examiner tips.\n• Crafted specifically to eliminate language barriers for Arab learners.';
        action = {
          type: 'scroll',
          target: '#features',
          label: lang === 'ar' ? '✨ استكشف تفاصيل المنهج والفصول' : '✨ Explore Full Curriculum',
        };
      } else if (q.includes('سن') || q.includes('عمر') || q.includes('صف') || q.includes('grade') || q.includes('age') || q.includes('level')) {
        reply =
          lang === 'ar'
            ? '🎯 **الفئات المستهدفة:**\n• طلاب الصف التاسع والعاشر والحادي عشر (Grades 9, 10 & 11).\n• الطلاب من عمر 13 إلى 17 سنة.\n• الطلاب الجدد في نظام الـ IGCSE الراغبين في التأسيس السليم دون تعقيد.'
            : '🎯 **Target Audience:**\n• Grades 9, 10, and 11 students.\n• Ages 13 to 17 years old.\n• Newcomers to IGCSE seeking clear, confidence-building foundation without textbook intimidation.';
        action = {
          type: 'scroll',
          target: '#comparison',
          label: lang === 'ar' ? '📊 شاهد مقارنة التأسيس مع الكتب الأخرى' : '📊 View Alternative Comparison',
        };
      } else if (q.includes('شحن') || q.includes('توصيل') || q.includes('shipping') || q.includes('delivery')) {
        reply =
          lang === 'ar'
            ? '🚚 **شحن سريع ومضمون حتى باب البيت:**\n• **داخل مصر:** من 2 إلى 3 أيام عمل لجميع المحافظات.\n• **دول الخليج (السعودية، الإمارات، قطر، الكويت، عمان):** من 3 إلى 5 أيام عمل شحن جوي سريع ومباشر.\n• الدفع عند الاستلام متاح في مصر!'
            : '🚚 **Fast Doorstep Shipping:**\n• **Across Egypt:** 2–3 business days with Cash on Delivery available.\n• **GCC Countries (KSA, UAE, Qatar, Kuwait, Oman):** 3–5 business days express air shipping!';
        action = {
          type: 'scroll',
          target: '#order-form',
          label: lang === 'ar' ? '📦 أدخل عنوانك واحسب التوصيل' : '📦 Enter Address for Shipping',
        };
      } else if (q.includes('عينة') || q.includes('sample') || q.includes('pdf') || q.includes('تحميل')) {
        reply =
          lang === 'ar'
            ? '📖 **عينة مجانية بصيغة PDF:**\nتقدر تطلع على فصل كامل من الكتاب ونماذج من التمارين والشروحات قبل الشراء، عشان تتأكد بنفسك من جودة الطباعة وسلاسة الشرح!'
            : '📖 **Free PDF Chapter Sample:**\nPreview an entire chapter with practice exercises and answer rubrics to experience the clarity and formatting firsthand!';
        action = {
          type: 'scroll',
          target: '#sample',
          label: lang === 'ar' ? '📥 اطلب وتصفح العينة المجانية' : '📥 Download & Preview Sample',
        };
      } else if (q.includes('واتساب') || q.includes('طلب') || q.includes('order') || q.includes('whatsapp') || q.includes('حجز')) {
        reply =
          lang === 'ar'
            ? '⚡ **خيارات الطلب الفوري:**\nتقدر تسجل بياناتك في ثوانٍ في نموذج الطلب أسفل الموقع، أو تتواصل مباشرة مع فريق خدمة العملاء على واتساب لتأكيد الشحن فوراً والإجابة على أي استفسار خاص.'
            : '⚡ **Instant Ordering:**\nFill in your details in seconds in our online order form below, or chat directly with our support team on WhatsApp for instant confirmation!';
        action = {
          type: 'whatsapp',
          target: 'https://wa.me/201000000000?text=' + encodeURIComponent('مرحباً، أود الاستفسار وحجز نسخة من كتاب IG Made Easy'),
          label: lang === 'ar' ? '💬 محادثة مباشرة عبر واتساب' : '💬 Chat via WhatsApp Now',
        };
      } else {
        reply =
          lang === 'ar'
            ? 'شكراً لتواصلك! كتاب **IG Made Easy** صُمم ليكون المرجع الأول والأسهل لكل طالب وولي أمر في نظام IGCSE. يمكنك اختيار أي من الأسئلة السريعة بالأعلى أو كتابة سؤالك بالتفصيل.'
            : 'Thank you for reaching out! **IG Made Easy** is built to give students the highest grades in Cambridge IGCSE with zero stress. Pick any quick question above or ask anything!';
        action = {
          type: 'scroll',
          target: '#order-form',
          label: lang === 'ar' ? '🛒 حجز الكتاب الآن' : '🛒 Order Your Copy',
        };
      }

      setIsTyping(false);
      setMascotMood('talking');
      setTimeout(() => setMascotMood('happy'), 1200);

      setMessages((prev) => [...prev, { sender: 'bot', text: reply, action }]);
      if (soundEnabled) playSound('receive');
    }, 650);
  };

  const handleActionClick = (action) => {
    if (!action) return;
    if (action.type === 'scroll') {
      const el = document.querySelector(action.target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (action.type === 'whatsapp') {
      window.open(action.target, '_blank');
    }
  };

  return (
    <>
      {/* Floating Interactive Mascot Trigger & Speech Bubble */}
      <div className="fixed bottom-6 end-6 z-40 flex flex-col items-end gap-2 pointer-events-none select-none">
        
        {/* Animated Speech Bubble Tooltip */}
        {showTooltip && !isOpen && (
          <div className="pointer-events-auto max-w-[240px] sm:max-w-[280px] p-3 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-orange-500/30 shadow-xl shadow-orange-500/10 text-slate-800 dark:text-slate-100 text-xs sm:text-sm animate-bounce cursor-pointer flex items-center gap-2 group transition-transform hover:scale-105"
            onClick={() => {
              setIsOpen(true);
              setShowTooltip(false);
            }}
          >
            <span className="text-base">💡</span>
            <div className="leading-tight">
              <span className="font-bold text-orange-600 dark:text-orange-400 block text-[11px] sm:text-xs">
                {t('مساعدك الذكي متصل!', 'Smart Assistant Online!')}
              </span>
              <span className="text-[11px] text-slate-600 dark:text-slate-300">
                {t('اسأل عن السعر، المنهج، أو احصل على عينة مجانية', 'Ask about price, syllabus or free sample')}
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs p-1"
              aria-label="Close Tip"
            >
              ✕
            </button>
          </div>
        )}

        {/* Floating Toggle Button */}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltip(false);
            if (!isOpen) {
              setTimeout(() => inputRef.current?.focus(), 250);
            }
          }}
          className="pointer-events-auto relative p-3.5 rounded-full bg-gradient-to-tr from-orange-500 via-amber-500 to-orange-600 shadow-2xl shadow-orange-500/50 text-white hover:scale-110 active:scale-95 transition-all focus:outline-none flex items-center justify-center group ring-4 ring-orange-400/20 hover:ring-orange-400/40"
          aria-label="Toggle Assistant"
        >
          {/* Animated Halo Pulse */}
          <span className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-25" />
          
          <div className="relative">
            <MascotSvg
              className="w-11 h-11 drop-shadow-lg transition-transform group-hover:rotate-6"
              lookOffset={lookOffset}
              isBlinking={isBlinking}
              mood={mascotMood}
            />
            {/* Unread Alert Indicator */}
            {!isOpen && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-black flex items-center justify-center border-2 border-white dark:border-slate-900 shadow animate-pulse">
                !
              </span>
            )}
          </div>
        </button>
      </div>

      {/* Spacious, Ultra-Modern Chat Window */}
      {isOpen && (
        <div
          ref={chatWindowRef}
          className="fixed bottom-24 end-4 sm:end-6 z-50 w-[95vw] sm:w-[460px] md:w-[480px] h-[600px] sm:h-[640px] max-h-[86vh] flex flex-col bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border-2 border-orange-500/25 dark:border-slate-800 rounded-3xl shadow-2xl shadow-orange-950/20 overflow-hidden animate-slideUp transition-all"
        >
          {/* Header Bar */}
          <div className="px-4 py-3.5 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white flex items-center justify-between shadow-md relative overflow-hidden">
            {/* Subtle ambient light glow */}
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />

            <div className="flex items-center gap-3 relative z-10">
              <div className="w-11 h-11 rounded-2xl bg-white/20 p-1 flex items-center justify-center shadow-inner ring-2 ring-white/30 shrink-0">
                <MascotSvg
                  className="w-full h-full"
                  lookOffset={lookOffset}
                  isBlinking={isBlinking}
                  mood={isTyping ? 'thinking' : mascotMood}
                />
              </div>
              <div>
                <h4 className="font-bold text-sm sm:text-base leading-tight tracking-tight flex items-center gap-1.5">
                  {t('مساعد IG Made Easy الذكي', 'IG Made Easy Smart Assistant')}
                  <span className="text-[10px] uppercase font-black tracking-wider bg-white/25 px-1.5 py-0.5 rounded-full">
                    AI
                  </span>
                </h4>
                <div className="flex items-center gap-2 text-[11px] text-orange-100 mt-0.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span>
                    {currentSection !== 'hero'
                      ? t(`يتفاعل معك في [${currentSection}]`, `Active in [${currentSection}]`)
                      : t('متصل الآن • البديل العربي الأول', 'Online • #1 Arab Alternative')}
                  </span>
                </div>
              </div>
            </div>

            {/* Header Control Buttons */}
            <div className="flex items-center gap-1.5 relative z-10">
              {/* Sound Toggle */}
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors text-xs"
                title={soundEnabled ? 'كتم الصوت' : 'تشغيل الصوت'}
                aria-label="Toggle Sound"
              >
                {soundEnabled ? '🔔' : '🔕'}
              </button>

              {/* Clear Chat */}
              <button
                onClick={() => {
                  setMessages([
                    {
                      sender: 'bot',
                      text: getContextGreeting(),
                      action: null,
                    },
                  ]);
                }}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors text-xs"
                title={t('بدء محادثة جديدة', 'Reset Chat')}
                aria-label="Reset Chat"
              >
                🔄
              </button>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/25 text-white transition-colors text-sm font-bold"
                aria-label="Close Chat"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 sm:p-5 space-y-4 overflow-y-auto text-sm bg-slate-50/70 dark:bg-slate-950/50 scroll-smooth">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'} transition-all`}
              >
                <div
                  className={`max-w-[86%] px-4 py-3 rounded-2xl leading-relaxed text-xs sm:text-sm shadow-sm ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-tr from-orange-500 to-amber-500 text-white rounded-br-none shadow-orange-500/20'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/80 rounded-bl-none shadow-slate-200/50 dark:shadow-none whitespace-pre-line'
                  }`}
                >
                  {m.text}
                </div>

                {/* Optional Action Card attached to Bot Message */}
                {m.action && (
                  <button
                    onClick={() => handleActionClick(m.action)}
                    className="mt-2 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-bold shadow-md shadow-orange-500/30 hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    <span>{m.action.label}</span>
                    <span className="rtl:rotate-180">➜</span>
                  </button>
                )}
              </div>
            ))}

            {/* Living Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2">
                <div className="px-4 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-bl-none shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 ms-2 font-medium">
                    {t('المساعد يكتب الآن...', 'Typing response...')}
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions & FAQs Chips (Spacious & Wrapped, Never Chopped Off) */}
          <div className="p-3 bg-slate-100/90 dark:bg-slate-800/90 border-t border-slate-200/90 dark:border-slate-800/90 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                <span>⚡</span>
                <span>{t('أسئلة مقترحة وسريعة:', 'Suggested Quick Questions:')}</span>
              </span>
              <button
                onClick={() => setShowQuickOptions(!showQuickOptions)}
                className="text-[10px] text-orange-600 dark:text-orange-400 hover:underline font-semibold"
              >
                {showQuickOptions ? t('إخفاء ▲', 'Hide ▲') : t('إظهار ▼', 'Show ▼')}
              </button>
            </div>

            {showQuickOptions && (
              <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
                {quickQuestions.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => handleSend(t(q.ar, q.en))}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-700/80 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-600 border border-slate-200 dark:border-slate-600/80 text-slate-700 dark:text-slate-200 font-medium text-xs shadow-sm hover:shadow-md hover:border-transparent transition-all active:scale-95 text-start"
                  >
                    <span>{q.icon}</span>
                    <span>{t(q.ar, q.en)}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Message Input & Send Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setLookOffset({ x: 0, y: 1.5 })}
              onBlur={() => setLookOffset({ x: 0, y: 0 })}
              placeholder={t('اكتب استفسارك هنا وسأجيبك فوراً...', 'Type your question here...')}
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs sm:text-sm placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold transition-all shrink-0 shadow-md shadow-orange-500/20 active:scale-95"
              aria-label="Send Message"
            >
              <svg className="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>

        </div>
      )}
    </>
  );
};

export default Chatbot;
