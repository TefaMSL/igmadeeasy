import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { supabase } from '../lib/supabase';

export const SampleDownload = () => {
  const { t, lightbox, toast } = useApp();
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [downloaded, setDownloaded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setDownloaded(true);

    // Save lead to Supabase
    try {
      await supabase.from('leads').insert([
        {
          name: formData.name,
          phone: formData.phone,
          student_age: 'Free Sample Download',
        },
      ]);
      console.log('✅ Lead saved to Supabase!');
    } catch (err) {
      console.warn('Lead capture note:', err);
    }

    toast.show(
      t(
        'تم إرسال رابط تحميل العينة بنجاح! جاري التنزيل...',
        'Sample download link generated successfully! Downloading...'
      )
    );

    // Simulate instant download trigger
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '/book-inside.jpg';
      link.download = 'IG-Made-Easy-Sample-Chapter.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1000);
  };

  return (
    <section id="sample" className="relative py-20 bg-slate-50/70 dark:bg-slate-900/50 border-y border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Form Column */}
          <div className="lg:col-span-6">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800/80 mb-4">
              {t('عينة مجانية فورية', 'Instant Free Sample')}
            </span>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
              <span>{t('شوف الكتاب بنفسك ', 'See the Book Yourself ')}</span>
              <span className="text-orange-500">{t('قبل ما تشتري', 'Before You Buy')}</span>
            </h2>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2.5 text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium">
                <span className="text-emerald-500 font-bold text-lg">✅</span>
                <span>{t('عينة من فصل كامل مع التمارين مجاناً', 'Free full chapter sample with exercises')}</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium">
                <span className="text-emerald-500 font-bold text-lg">✅</span>
                <span>{t('نموذج امتحان IGCSE حقيقي مع نموذج الإجابة', 'Real IGCSE exam model with answer key')}</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium">
                <span className="text-emerald-500 font-bold text-lg">✅</span>
                <span>{t('شرح مبسط وأمثلة تفاعلية تناسب جيل اليوم', 'Simple explanations & relatable modern examples')}</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium">
                <span className="text-emerald-500 font-bold text-lg">✅</span>
                <span>{t('تنزيل فوري بدون أي التزام بالشراء', 'Instant download with zero purchase commitment')}</span>
              </li>
            </ul>

            {/* Sample Form */}
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800/80 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    {t('اسمك الكريم', 'Your Name')}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t('اكتب اسمك هنا', 'Your Name')}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    {t('رقم الموبايل (واتساب)', 'WhatsApp Number')}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+20 / +966 / +971 ..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full btn-gradient py-3.5 text-base"
              >
                <span>{downloaded ? t('جاري التنزيل... 📥', 'Downloading... 📥') : t('حمّل العينة المجانية الآن 📥', 'Download Free Sample Now 📥')}</span>
              </button>
            </form>
          </div>

          {/* Right Image Preview Column */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div
              onClick={() => lightbox.open(1)}
              className="group relative cursor-zoom-in max-w-md rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 transition-all duration-300 hover:scale-[1.02]"
            >
              <img
                src="/book-inside.jpg"
                alt="IG Made Easy Inside Pages"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              {/* Tap to Zoom Badge */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-xs font-bold shadow-xl flex items-center gap-2 border border-white/20 whitespace-nowrap">
                <span>🔍</span>
                <span>{t('اضغط لتكبير وتصفح صفحات الكتاب ↔', 'Tap to zoom & explore book pages ↔')}</span>
              </div>
            </div>
            <p className="mt-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
              {t('📖 منهج تفاعلي ورسومات مبهجة تلائم جيل اليوم', '📖 Interactive modern lessons designed for today’s kids')}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SampleDownload;
