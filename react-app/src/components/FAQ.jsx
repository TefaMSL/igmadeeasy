import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { faqData } from '../data/siteData';

export const FAQ = () => {
  const { t } = useApp();
  const [openIndex, setOpenIndex] = useState(0); // Open first by default

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative py-20 bg-slate-50/70 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Glass Frame */}
        <div className="section-head glass-panel p-6 sm:p-8 rounded-3xl border border-white/60 dark:border-white/15 bg-white/85 dark:bg-slate-900/85 shadow-md text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100/80 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800/80 mb-4">
            {t('الأسئلة الشائعة', 'FAQ')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            <span>{t('عندك سؤال؟ ', 'Have a Question? ')}</span>
            <span className="text-orange-500">{t('احنا هنا للإجابة', "We're Here")}</span>
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300">
            {t(
              'كل ما تريد معرفته عن كتاب IG Made Easy، الشحن، والمحتوى التعليمي.',
              'Everything you need to know regarding IG Made Easy, delivery, and curriculum.'
            )}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqData.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-white/90 dark:bg-slate-900/90 border-orange-400 dark:border-orange-500 shadow-md'
                    : 'bg-white/80 dark:bg-slate-900/80 border-white/50 dark:border-white/10 hover:border-orange-400/50'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-4 text-start flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                    {t(item.question.ar, item.question.en)}
                  </span>
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-orange-500 text-white rotate-45'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-3 animate-fadeIn">
                    {t(item.answer.ar, item.answer.en)}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
