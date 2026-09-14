import React from 'react';
import { useApp } from '../context/AppContext';
import { ageGroupsData } from '../data/siteData';

export const Ages = () => {
  const { t } = useApp();

  return (
    <section id="ages" className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Glass Frame */}
        <div className="section-head glass-panel p-6 sm:p-8 rounded-3xl border border-white/60 dark:border-white/15 bg-white/85 dark:bg-slate-900/85 shadow-md text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100/80 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800/80 mb-4">
            {t('الفئات العمرية', 'Age Groups')}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            <span>{t('الكتاب المناسب ', 'The Right Book ')}</span>
            <span className="gradient-text">{t('لكل مرحلة', 'for Every Stage')}</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            {t(
              'اختر المرحلة العمرية المناسبة لابنك للحصول على أفضل استيعاب وتأسيس متين.',
              'Choose the appropriate age bracket for your child to ensure optimal retention and mastery.'
            )}
          </p>
        </div>

        {/* 3 Age Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {ageGroupsData.map((group) => {
            return (
              <div
                key={group.id}
                className={`relative flex flex-col justify-between p-8 rounded-3xl border transition-all duration-300 ${
                  group.popular
                    ? 'bg-orange-500/10 dark:bg-orange-950/40 border-2 border-orange-500 shadow-2xl shadow-orange-500/15 md:-translate-y-4'
                    : 'bg-white/80 dark:bg-slate-900/80 border-white/60 dark:border-white/10 shadow-md hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                {/* Popular Ribbon */}
                {group.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold shadow-md">
                    {t('الأكثر طلباً ⭐', 'Most Popular ⭐')}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl">{group.emoji}</span>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold"
                      style={{
                        backgroundColor: `${group.color}15`,
                        color: group.color,
                      }}
                    >
                      {group.tag}
                    </span>
                  </div>

                  <div className="text-2xl font-black text-slate-900 dark:text-white mb-1">
                    {t(group.range.ar, group.range.en)}
                  </div>

                  <div className="text-sm font-bold text-orange-600 dark:text-orange-400 mb-6">
                    {t(group.level.ar, group.level.en)}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {group.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                        <span className="text-emerald-500 font-bold shrink-0">✓</span>
                        <span>{t(feat.ar, feat.en)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#order"
                  className={`w-full py-3 rounded-xl font-bold text-center text-sm transition-all ${
                    group.popular
                      ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/25'
                      : 'bg-slate-100 dark:bg-slate-700 hover:bg-orange-50 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 hover:text-orange-600'
                  }`}
                >
                  {t('اطلب هذا المستوى 🛒', 'Order This Level 🛒')}
                </a>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Ages;
