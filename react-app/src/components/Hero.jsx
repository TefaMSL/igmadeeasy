import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { heroMetrics, galleryData } from '../data/siteData';
import HeroBook3D from './HeroBook3D';

export const Hero = () => {
  const { t, lightbox } = useApp();
  const [activeTab, setActiveTab] = useState(0); // 0: 3D Cover, 1: Inside, 2: Levels, 3: Student

  return (
    <section id="hero" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Translucent Frosted Glass Container Revealing 3D Background */}
          <div className="lg:col-span-7 flex justify-center lg:justify-start z-10">
            <div className="hero-text glass-panel p-6 sm:p-10 lg:p-11 rounded-[32px] max-w-2xl w-full border border-white/60 dark:border-white/15 ring-1 ring-black/5 dark:ring-white/10 shadow-[0_20px_50px_rgba(15,23,42,0.06),0_0_0_1px_rgba(255,255,255,0.7)_inset] bg-white/85 dark:bg-slate-900/85 transition-all duration-300">
              
              {/* Top Badge Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 dark:bg-orange-500/20 border border-orange-500/30 text-orange-600 dark:text-orange-400 text-xs sm:text-sm font-bold shadow-sm mb-6">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                <span>{t('🌟 البديل العربي الأول لمناهج IGCSE', '🌟 The #1 Arab Alternative for IGCSE')}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.2] text-slate-900 dark:text-white mb-5">
                <span>{t('تعلّم الإنجليزية', 'Learn English with')}</span> <br />
                <span className="gradient-text">IG Made Easy</span> <br />
                <span className="text-2xl sm:text-4xl font-extrabold text-slate-800 dark:text-slate-100">
                  {t('بجودة عالمية، وبسعر عربي في متناولك', 'World-Class Quality at an Accessible Price')}
                </span>
              </h1>

              {/* Subtitle Description */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                {t(
                  'شرح مبسط وعصري لجيل اليوم، امتحانات وتمارين مرفقة، مناسب للأعمار من 10 لـ 15 سنة. البديل العربي الأمثل للمناهج الأجنبية المكلفة التي يصل سعرها إلى 25 يورو.',
                  'Simple, modern explanations for today’s generation. Practice exams included. For ages 10–15. The leading Arab alternative to expensive foreign books costing up to €25.'
                )}
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-8 w-full sm:w-auto">
                <a
                  href="#order"
                  className="btn-gradient w-full sm:w-auto text-base sm:text-lg"
                >
                  <span>{t('اطلب دلوقتي 🛒', 'Order Now 🛒')}</span>
                  <svg className="w-5 h-5 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>

                <a
                  href="#sample"
                  className="btn-outline-brand w-full sm:w-auto text-base sm:text-lg"
                >
                  <span>{t('حمّل عينة مجانية 📖', 'Download Free Sample 📖')}</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>
              </div>

              {/* Metrics Row Inside the Frame */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full pt-6 border-t border-white/40 dark:border-white/10">
                {heroMetrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 sm:p-3.5 text-center rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-white/50 dark:border-white/10 shadow-sm"
                  >
                    <div className="text-xl sm:text-2xl mb-1">{metric.icon}</div>
                    <div className="text-base sm:text-xl font-black text-slate-900 dark:text-white">
                      {metric.value}
                    </div>
                    <div className="text-[11px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {t(metric.label.ar, metric.label.en)}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Right Column: Original 3D Book Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center z-10">
            <div className="relative w-full max-w-[480px]">
              
              {/* Radial Book Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/25 via-amber-500/20 to-blue-500/25 rounded-full blur-3xl opacity-75 -z-10 pointer-events-none" />

              {/* Floating Value Badges */}
              <div className="absolute -top-3 -right-2 z-20 px-3.5 py-1.5 rounded-2xl bg-white/90 dark:bg-slate-800/90 border border-orange-400/60 text-orange-600 dark:text-orange-400 font-bold text-xs sm:text-sm shadow-xl flex items-center gap-1.5 animate-bounce">
                <span>💰</span>
                <span>{t('وفّر 85%+', 'Save 85%+')}</span>
              </div>

              <div className="absolute bottom-24 -left-2 z-20 px-3.5 py-1.5 rounded-2xl bg-white/90 dark:bg-slate-800/90 border border-blue-400/60 text-blue-600 dark:text-blue-400 font-bold text-xs sm:text-sm shadow-xl flex items-center gap-1.5">
                <span>✅</span>
                <span>{t('منهج IG معتمد', 'IG Aligned')}</span>
              </div>

              {/* Book Stage Container */}
              <div
                className="relative w-full h-[460px] sm:h-[520px] rounded-[32px] overflow-hidden glass-panel p-3 sm:p-4 flex items-center justify-center shadow-[0_20px_50px_rgba(15,23,42,0.06),0_0_0_1px_rgba(255,255,255,0.7)_inset] border border-white/50 dark:border-white/15 bg-white/80 dark:bg-slate-900/80"
                onClick={() => {
                  if (activeTab !== 0) lightbox.open(activeTab);
                }}
              >
                {activeTab === 0 ? (
                  <HeroBook3D />
                ) : (
                  <div className="relative w-full h-full flex items-center justify-center cursor-zoom-in group/img">
                    <img
                      src={galleryData[activeTab].src}
                      alt={galleryData[activeTab].alt}
                      className="max-h-full max-w-full object-contain rounded-2xl drop-shadow-2xl transition-transform duration-500 group-hover/img:scale-105"
                    />
                    {/* Zoom Overlay Indicator */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-xs font-bold shadow-xl flex items-center gap-2 border border-white/20 whitespace-nowrap">
                      <span>🔍</span>
                      <span>{t('اضغط للتكبير والتصفح ↔', 'Tap to zoom & slide ↔')}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Angle / Position Switcher Buttons */}
              <div className="grid grid-cols-4 gap-2 mt-4">
                {galleryData.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`flex flex-col items-center justify-center p-2 rounded-2xl border transition-all ${
                      activeTab === idx
                        ? 'bg-orange-500 text-white border-orange-500 shadow-lg scale-105'
                        : 'bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm border-white/40 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-orange-400'
                    }`}
                  >
                    <span className="text-xl mb-0.5">{item.emoji}</span>
                    <span className="text-[11px] font-bold truncate max-w-full">
                      {idx === 0
                        ? t('الغلاف 3D', '3D Cover')
                        : idx === 1
                        ? t('الداخل', 'Inside')
                        : idx === 2
                        ? t('المستويات', 'Levels')
                        : t('الطلاب', 'Students')}
                    </span>
                  </button>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
