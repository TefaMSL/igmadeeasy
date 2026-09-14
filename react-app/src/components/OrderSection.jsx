import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { countriesList, levelsList } from '../data/siteData';
import { supabase } from '../lib/supabase';

export const OrderSection = () => {
  const { t, toast } = useApp();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    country: 'مصر — Egypt',
    address: '',
    level: 'المستوى المتوسط (12-13 سنة)',
    qty: 1,
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleQtyChange = (delta) => {
    setForm((prev) => ({
      ...prev,
      qty: Math.max(1, Math.min(50, prev.qty + delta)),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Save to Supabase DB
      try {
        const { error: sbError } = await supabase.from('orders').insert([
          {
            full_name: form.name,
            phone: form.phone,
            country: form.country,
            address: form.address,
            bundle_type: form.level,
            quantity: form.qty,
            payment_method: 'cash_on_delivery',
            order_status: 'pending',
          },
        ]);

        if (sbError) {
          console.warn('Supabase orders notice:', sbError.message);
        } else {
          console.log('✅ Order saved to Supabase!');
        }
      } catch (sbErr) {
        console.warn('Supabase insert note:', sbErr);
      }

      // Store in local storage as reliable backup
      const existingLeads = JSON.parse(localStorage.getItem('ig_orders') || '[]');
      existingLeads.push({
        ...form,
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem('ig_orders', JSON.stringify(existingLeads));

      setSubmitted(true);
      toast.show(
        t(
          'تم استلام طلبك بنجاح! سنتواصل معك خلال 24 ساعة لترتيب الشحن 🎉',
          'Order received successfully! We will contact you within 24 hours 🎉'
        )
      );
    } catch (err) {
      console.error(err);
      toast.show(t('حدث خطأ بسيط، يمكنك الطلب عبر واتساب مباشرة', 'An error occurred, you can order via WhatsApp'));
    } finally {
      setLoading(false);
    }
  };

  const whatsappUrl = `https://wa.me/201000000000?text=${encodeURIComponent(
    `أهلاً بك، أريد طلب كتاب IG Made Easy.
الاسم: ${form.name || 'عميل جديد'}
الدولة: ${form.country}
المستوى: ${form.level}
عدد النسخ: ${form.qty}`
  )}`;

  return (
    <section id="order" className="relative py-24 overflow-hidden">
      {/* Subtle Blobs */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Info Column */}
          <div className="lg:col-span-6">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800/80 mb-4">
              {t('اطلب الكتاب الآن', 'Order the Book')}
            </span>

            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
              <span>{t('ابدأ رحلة ابنك مع الإنجليزية ', "Start Your Child's Journey ")}</span>
              <span className="gradient-text">{t('دلوقتي', 'Today')}</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
              {t(
                'شحن سريع ومباشر لكافة محافظات مصر ودول الشرق الأوسط (السعودية، الإمارات، الكويت، قطر، عُمان، الأردن، وغيرها).',
                'Fast direct delivery across Egypt and the Middle East (KSA, UAE, Kuwait, Qatar, Oman, Jordan & more).'
              )}
            </p>

            {/* Payment Methods */}
            <div className="mb-8">
              <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                {t('وسائل الدفع المتاحة:', 'Available Payment Methods:')}
              </span>
              <div className="flex flex-wrap gap-2.5">
                <span className="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-white/80 dark:bg-slate-800/80 border border-white/60 dark:border-white/10 shadow-sm text-slate-700 dark:text-slate-200">
                  {t('💳 فيزا / مدى / ماستركارد', '💳 Visa / Mada / Mastercard')}
                </span>
                <span className="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-white/80 dark:bg-slate-800/80 border border-white/60 dark:border-white/10 shadow-sm text-slate-700 dark:text-slate-200">
                  {t('📱 محافظ إلكترونية / إنستا باي', '📱 Mobile Wallets / InstaPay')}
                </span>
                <span className="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-white/80 dark:bg-slate-800/80 border border-white/60 dark:border-white/10 shadow-sm text-slate-700 dark:text-slate-200">
                  {t('🚚 الدفع عند الاستلام', '🚚 Cash on Delivery (COD)')}
                </span>
              </div>
            </div>

            {/* Quality Guarantee Card */}
            <div className="p-5 rounded-2xl bg-amber-500/10 dark:bg-amber-950/40 border border-amber-300/60 dark:border-amber-800/60 flex items-start gap-3.5 shadow-sm">
              <span className="text-2xl shrink-0">🛡️</span>
              <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200 leading-relaxed font-medium">
                {t(
                  'ضمان الجودة الذهبي: لو المحتوى مش مناسب لمستوى ابنك، تواصل معنا فوراً وهنساعدك باستبدال المستوى أو حلها بكل سرور.',
                  'Quality Guarantee: If the content doesn’t suit your child’s level, contact us and we will promptly exchange or assist.'
                )}
              </p>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-6">
            <div className="bg-white/90 dark:bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-white/60 dark:border-white/10 shadow-2xl relative">
              {submitted ? (
                <div className="text-center py-8 space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-500 text-3xl flex items-center justify-center mx-auto shadow-md">
                    ✓
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                    {t('تم استلام طلبك بنجاح! 🎉', 'Order Received Successfully! 🎉')}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                    {t(
                      `شكراً لك يا ${form.name || 'صديقنا'}، سنتواصل معك على الرقم ${form.phone} خلال 24 ساعة لتأكيد موعد التوصيل.`,
                      `Thank you ${form.name || 'friend'}, we will contact you at ${form.phone} within 24 hours to confirm delivery.`
                    )}
                  </p>
                  <div className="pt-4 flex flex-col gap-3">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gradient py-3 text-sm font-bold flex items-center justify-center gap-2"
                    >
                      <span>{t('تأكيد فوري عبر واتساب 💬', 'Instant WhatsApp Confirmation 💬')}</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="text-xs font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                    >
                      {t('طلب نسخة إضافية', 'Order Another Copy')}
                    </button>
                  </div>
                </div>
              ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                  <span>📦</span>
                  <span>{t('فورم الطلب المباشر', 'Direct Order Form')}</span>
                </h3>

                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {t('الاسم الكامل', 'Full Name')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={t('اكتب اسمك هنا', 'Enter your full name')}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {t('رقم الموبايل (مع كود الدولة واتساب)', 'Phone Number (with country code)')} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+20 / +966 / +971 ..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {t('الدولة', 'Country')} *
                  </label>
                  <select
                    value={form.country}
                    onChange={(e) => setForm({ ...form, country: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                  >
                    {countriesList.map((c, i) => (
                      <option key={i} value={c.value}>
                        {t(c.label.ar, c.label.en)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Detailed Address */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {t('المدينة / العنوان بالتفصيل', 'City / Detailed Address')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder={t('المدينة، الحي، اسم الشارع وعنوان التوصيل', 'City, street, delivery address')}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                  />
                </div>

                {/* Level */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {t('المستوى العمري المطلوب', 'Required Age Level')} *
                  </label>
                  <select
                    value={form.level}
                    onChange={(e) => setForm({ ...form, level: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                  >
                    {levelsList.map((lvl, idx) => (
                      <option key={idx} value={lvl.value}>
                        {t(lvl.label.ar, lvl.label.en)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {t('عدد النسخ', 'Quantity')}
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleQtyChange(-1)}
                      className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-200 text-lg flex items-center justify-center"
                    >
                      −
                    </button>
                    <span className="w-12 text-center font-bold text-lg text-slate-900 dark:text-white">
                      {form.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleQtyChange(1)}
                      className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-200 text-lg flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-gradient py-4 text-base sm:text-lg font-bold mt-2"
                >
                  <span>
                    {loading
                      ? t('جاري إرسال الطلب...', 'Submitting Order...')
                      : t('🛒 أرسل الطلب الآن', '🛒 Submit Order Now')}
                  </span>
                </button>

                {/* WhatsApp Alternative */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-emerald-500/50 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-sm transition-all"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span>{t('أو اطلب عبر واتساب مباشرة 💬', 'Or Order Directly via WhatsApp 💬')}</span>
                </a>
              </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OrderSection;
