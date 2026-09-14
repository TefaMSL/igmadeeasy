import React from 'react';
import { useApp } from '../context/AppContext';
import { problemData } from '../data/siteData';

export const Problem = () => {
  const { t } = useApp();

  return (
    <section id="problem" className="relative py-20 bg-slate-50/50 dark:bg-slate-900/40 border-y border-slate-200/50 dark:border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Glass Frame */}
        <div className="section-head glass-panel p-6 sm:p-8 rounded-3xl border border-white/60 dark:border-white/15 bg-white/85 dark:bg-slate-900/85 shadow-md text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-red-100/80 dark:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/80 mb-4">
            {t('المشكلة الحقيقية', 'The Real Problem')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            {t('الكتب الأجنبية… ', 'Imported Textbooks… ')}
            <span className="text-orange-500">
              {t('أسعارها مبالغ فيها', 'Way Too Expensive')}
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            {t(
              'كل سنة أولياء الأمور في الشرق الأوسط ومصر بيتحملوا مبالغ ضخمة لشراء مناهج أجنبية معقدة وغير مناسبة للبيئة العربية.',
              'Every year, parents across Egypt and the Middle East face exorbitant costs for rigid imported textbooks.'
            )}
          </p>
        </div>

        {/* 3 Problem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problemData.map((item) => (
            <div
              key={item.id}
              className={`relative p-8 rounded-3xl transition-all duration-300 ${
                item.featured
                  ? 'bg-orange-500/10 dark:bg-orange-950/40 border-2 border-orange-400/60 shadow-xl shadow-orange-500/10 scale-105'
                  : 'bg-white/80 dark:bg-slate-900/80 border border-white/60 dark:border-white/10 shadow-md hover:shadow-lg hover:-translate-y-1'
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-slate-700 flex items-center justify-center text-3xl mb-6">
                {item.icon}
              </div>
              <span className="inline-block px-3 py-1 rounded-lg text-xs font-extrabold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 mb-3">
                {t(item.tag.ar, item.tag.en)}
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {t(item.title.ar, item.title.en)}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                {t(item.desc.ar, item.desc.en)}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Problem;
