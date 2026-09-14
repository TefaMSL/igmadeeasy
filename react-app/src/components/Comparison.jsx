import React from 'react';
import { useApp } from '../context/AppContext';
import { comparisonRows } from '../data/siteData';

export const Comparison = () => {
  const { t } = useApp();

  return (
    <section id="comparison" className="relative py-20 bg-slate-50/60 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Glass Frame */}
        <div className="section-head glass-panel p-6 sm:p-8 rounded-3xl border border-white/60 dark:border-white/15 bg-white/85 dark:bg-slate-900/85 shadow-md text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100/80 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800/80 mb-4">
            {t('مقارنة الأسعار والتوفير', 'Price & Value Comparison')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            <span>{t('وفّر فلوسك، ', 'Save Your Money, ')}</span>
            <span className="text-orange-500">{t('ماتدفعش أكتر من اللازم', "Don't Overpay")}</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            {t(
              'مقارنة مباشرة بين تكلفة الكتب الأجنبية المستوردة وكتاب IG Made Easy البديل العربي الأول.',
              'A direct comparison between imported foreign textbooks and IG Made Easy Arab alternative.'
            )}
          </p>
        </div>

        {/* Comparison Card / Table */}
        <div className="bg-white/85 dark:bg-slate-900/85 rounded-3xl border border-white/60 dark:border-white/10 shadow-xl overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-white/20 dark:bg-slate-900/40 p-4 sm:p-6 border-b border-white/30 dark:border-white/10 text-sm sm:text-base font-bold text-slate-700 dark:text-slate-300">
            <div className="col-span-4 flex items-center">{t('المقارنة والمعيار', 'Comparison Criteria')}</div>
            <div className="col-span-4 text-center text-slate-500 dark:text-slate-400 font-semibold flex items-center justify-center gap-1.5">
              <span>📦</span>
              <span className="hidden sm:inline">{t('الكتب المستوردة الباهظة', 'Imported Books')}</span>
              <span className="sm:hidden">{t('المستوردة', 'Imported')}</span>
            </div>
            <div className="col-span-4 text-center text-orange-600 dark:text-orange-400 font-bold flex items-center justify-center gap-1.5 bg-orange-500/10 dark:bg-orange-500/20 py-2 rounded-xl border border-orange-500/30">
              <span>📚</span>
              <span>IG Made Easy</span>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-slate-100 dark:divide-slate-700/60">
            {comparisonRows.map((row, idx) => (
              <div
                key={idx}
                className={`grid grid-cols-12 p-4 sm:p-6 items-center text-xs sm:text-base transition-colors ${
                  row.isHighlight
                    ? 'bg-orange-50/50 dark:bg-orange-950/20 font-bold'
                    : 'hover:bg-slate-50/80 dark:hover:bg-slate-700/30'
                }`}
              >
                <div className="col-span-4 font-bold text-slate-800 dark:text-slate-200">
                  {t(row.criteria.ar, row.criteria.en)}
                </div>

                <div className="col-span-4 text-center text-slate-500 dark:text-slate-400">
                  {t(row.them.ar, row.them.en)}
                </div>

                <div className="col-span-4 text-center font-bold text-orange-600 dark:text-orange-400 flex items-center justify-center">
                  {row.isHighlight ? (
                    <span className="inline-block px-3 py-1 rounded-full bg-emerald-500 text-white shadow-md text-xs sm:text-sm">
                      {t(row.us.ar, row.us.en)}
                    </span>
                  ) : (
                    <span>{t(row.us.ar, row.us.en)}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA below comparison */}
        <div className="mt-8 text-center">
          <a
            href="#order"
            className="btn-gradient px-8 py-3.5 text-base sm:text-lg"
          >
            <span>{t('احجز نسختك ووفر أكتر من 85% 🛒', 'Order & Save Over 85% 🛒')}</span>
          </a>
        </div>

      </div>
    </section>
  );
};

export default Comparison;
