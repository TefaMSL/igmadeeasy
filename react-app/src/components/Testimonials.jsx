import React from 'react';
import { useApp } from '../context/AppContext';
import { testimonialsData } from '../data/siteData';

export const Testimonials = () => {
  const { t } = useApp();

  return (
    <section id="testimonials" className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Glass Frame */}
        <div className="section-head glass-panel p-6 sm:p-8 rounded-3xl border border-white/60 dark:border-white/15 bg-white/85 dark:bg-slate-900/85 shadow-md text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100/80 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800/80 mb-4">
            {t('آراء أولياء الأمور والمعلمين', 'Reviews & Testimonials')}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            <span>{t('آباء وأمهات ', 'Parents & Teachers ')}</span>
            <span className="gradient-text">{t('وثقوا فيه', 'Who Trusted It')}</span>
          </h2>
          {/* Star Summary */}
          <div className="flex items-center justify-center gap-2 text-sm sm:text-base font-bold text-slate-600 dark:text-slate-300">
            <span className="text-amber-400 text-lg">⭐⭐⭐⭐⭐</span>
            <span>{t('4.9 / 5 من تقييمات أولياء الأمور في مصر والخليج', '4.9 / 5 average rating from parents')}</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonialsData.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col justify-between p-6 rounded-3xl border transition-all duration-300 ${
                item.featured
                  ? 'bg-orange-500/10 dark:bg-orange-950/40 border-orange-400/60 shadow-xl shadow-orange-500/10 scale-105'
                  : 'bg-white/80 dark:bg-slate-900/80 border-white/60 dark:border-white/10 shadow-md hover:shadow-lg hover:-translate-y-1'
              }`}
            >
              <div>
                <div className="text-amber-400 mb-3 text-sm">⭐⭐⭐⭐⭐</div>
                <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed mb-6">
                  {t(item.quote.ar, item.quote.en)}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-700/60">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-tr ${item.gradient} text-white font-black flex items-center justify-center shadow-sm shrink-0`}
                >
                  {item.initial}
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">
                    {t(item.name.ar, item.name.en)}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    {t(item.info.ar, item.info.en)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
