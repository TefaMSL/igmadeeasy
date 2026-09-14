import React from 'react';
import { useApp } from '../context/AppContext';
import { featuresBento } from '../data/siteData';

export const Features = () => {
  const { t } = useApp();

  return (
    <section id="features" className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Glass Frame */}
        <div className="section-head glass-panel p-6 sm:p-8 rounded-3xl border border-white/60 dark:border-white/15 bg-white/85 dark:bg-slate-900/85 shadow-md text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100/80 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800/80 mb-4">
            {t('الحل المتكامل', 'The Solution')}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            <span className="gradient-text">IG Made Easy</span> —{' '}
            <span>{t('كل اللي محتاجه في مكان واحد', 'Everything in One Place')}</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            {t(
              'صمّمناه خصيصًا للطالب في العالم العربي بجودة عالمية وسعر في متناول يدك وبدون تعقيدات.',
              'Designed specifically for students across the Arab world — world-class quality, accessible price.'
            )}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresBento.map((bento) => {
            const isLarge = bento.size === 'large';
            return (
              <div
                key={bento.id}
                className={`group relative p-8 rounded-3xl transition-all duration-300 border border-white/60 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 hover:shadow-xl hover:-translate-y-1 overflow-hidden ${
                  isLarge ? 'md:col-span-2 lg:col-span-2 bg-gradient-to-br from-orange-500/10 to-white/80 dark:from-slate-800/60 dark:to-slate-900/80' : ''
                }`}
              >
                {/* Glow Accent */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 transition-opacity group-hover:opacity-40"
                  style={{ backgroundColor: bento.accentColor }}
                />

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm"
                        style={{
                          backgroundColor: `${bento.accentColor}18`,
                          color: bento.accentColor,
                        }}
                      >
                        {bento.icon}
                      </div>
                      {bento.badge && (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-100 dark:bg-orange-950/70 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800">
                          {t(bento.badge.ar, bento.badge.en)}
                        </span>
                      )}
                    </div>

                    <h3 className={`font-bold text-slate-900 dark:text-white mb-3 ${isLarge ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>
                      {t(bento.title.ar, bento.title.en)}
                    </h3>

                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                      {t(bento.desc.ar, bento.desc.en)}
                    </p>
                  </div>

                  {isLarge && (
                    <div className="mt-8 pt-6 border-t border-slate-200/60 dark:border-slate-700/60 flex flex-wrap gap-4 text-xs font-bold text-slate-600 dark:text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <span className="text-emerald-500">✓</span> {t('شرح القواعد التأسيسية', 'Grammar Foundations')}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="text-emerald-500">✓</span> {t('مهارات الـ Writing الإبداعي', 'Creative Writing')}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="text-emerald-500">✓</span> {t('فهم ونقد النصوص Reading', 'Reading Comprehension')}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="text-emerald-500">✓</span> {t('نماذج امتحانات IGCSE حقيقية', 'Mock Exam Papers')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Features;
