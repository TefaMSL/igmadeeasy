// IG Made Easy — Full Translation Dictionary (AR/EN)
const translations = {
  // ── Navbar ──
  navFeatures: { ar: 'المميزات', en: 'Features' },
  navPricing: { ar: 'السعر', en: 'Pricing' },
  navAges: { ar: 'الفئات العمرية', en: 'Age Groups' },
  navReviews: { ar: 'آراء العملاء', en: 'Reviews' },
  navFaq: { ar: 'الأسئلة الشائعة', en: 'FAQ' },
  navCta: { ar: 'اطلب الكتاب 🛒', en: 'Order Now 🛒' },

  // ── Hero ──
  heroPill: { ar: '🌟 البديل العربي الأول لمناهج IGCSE', en: '🌟 The #1 Arab Alternative for IGCSE' },
  heroTitle1: { ar: 'تعلّم الإنجليزية', en: 'Learn English' },
  heroTitle2: { ar: 'بجودة عالمية، وبسعر عربي في متناولك', en: 'World-Class Quality, Accessible Arab Price' },
  heroDesc: {
    ar: 'شرح مبسط وعصري لجيل اليوم، امتحانات وتمارين مرفقة، مناسب للأعمار من 10 لـ 15 سنة. البديل العربي الأمثل للمناهج الأجنبية المكلفة التي يصل سعرها إلى 25 يورو.',
    en: "Simple, modern explanations for today's generation. Practice exams included. For ages 10–15. The leading Arab alternative to expensive foreign books costing up to €25."
  },
  heroOrderBtn: { ar: 'اطلب دلوقتي', en: 'Order Now' },
  heroSampleBtn: { ar: 'حمّل عينة مجانية', en: 'Free Sample' },
  metricSavings: { ar: 'توفير في السعر', en: 'Price Savings' },
  metricAge: { ar: 'سنة فئة عمرية', en: 'Age Range' },
  metricAlt: { ar: 'بديل عربي معتمد', en: 'Arab Alternative' },
  badgeSave: { ar: 'وفّر 85%+', en: 'Save 85%+' },
  badgeIG: { ar: 'منهج IG معتمد', en: 'IG Aligned' },
  thumbCover: { ar: 'الغلاف', en: 'Cover' },
  thumbInside: { ar: 'داخل الكتاب', en: 'Inside' },
  thumbLevels: { ar: 'المستويات', en: 'Levels' },
  thumbStudents: { ar: 'مع الطلاب', en: 'Students' },
  hint3d: { ar: 'اسحب لتدوير الكتاب 360° ثلاثي الأبعاد', en: 'Drag to rotate book 360° in 3D' },
  hintZoom: { ar: 'اضغط للتكبير والتصفح ↔', en: 'Tap to zoom & slide ↔' },

  // ── Problem ──
  problemTag: { ar: 'المشكلة', en: 'The Problem' },
  problemTitle: { ar: 'الكتب الأجنبية…', en: 'Imported Books…' },
  problemTitleHighlight: { ar: 'أسعارها مبالغ فيها', en: 'Way Too Expensive' },
  problemDesc: {
    ar: 'كل سنة أولياء الأمور في الشرق الأوسط ومصر بيتحملوا مبالغ ضخمة لشراء مناهج أجنبية معقدة',
    en: 'Every year, parents across the Middle East face exorbitant costs for rigid imported books'
  },
  problemCard1Title: { ar: 'سعر باهظ بالعملات الأجنبية', en: 'Expensive Foreign Currency Price' },
  problemCard1Desc: { ar: 'تصل لـ 15–25 يورو للكتاب الواحد — تكلفة مجهدة ومبالغ فيها على ميزانية أي أسرة عربية', en: '€15–25 per imported book — An exorbitant burden on any family\'s educational budget' },
  problemCard2Title: { ar: 'صعوبة الشحن الدولي والجمارك', en: 'International Shipping & Customs' },
  problemCard2Desc: { ar: 'تأخير لأسابيع في الشحن، ومصاريف جمارك وتوصيل دولية تضاعف سعر الكتاب', en: 'Weeks of shipping delays and steep customs fees that double the final cost' },
  problemCard3Title: { ar: 'شرح معقد لا يراعي الطالب العربي', en: 'Disconnected Foreign Curricula' },
  problemCard3Desc: { ar: 'المناهج الأجنبية لا تراعي خلفية الطالب العربي ولغته وأسلوبها جامد وغير محبب', en: "Foreign textbooks aren't tailored for Arab students and feature rigid, unengaging styles" },

  // ── Features ──
  featuresTag: { ar: 'الحل', en: 'The Solution' },
  featuresTitle: { ar: 'كل اللي محتاجه في مكان واحد', en: 'Everything You Need in One Book' },
  featuresDesc: { ar: 'صمّمناه خصيصًا للطالب في العالم العربي بجودة عالمية وسعر في المتناول', en: 'Designed specifically for students in the Arab World — world-class quality, accessible price' },
  feat1Title: { ar: 'منهج IG معتمد دولياً', en: 'IGCSE Aligned Curriculum' },
  feat1Desc: { ar: 'محتوى مطابق لمتطلبات منهج Cambridge IGCSE الدولي بالكامل مع تغطية شاملة لكل الوحدات والمهارات الأساسية', en: 'Fully aligned with Cambridge IGCSE international curriculum, covering all units and core skills' },
  feat2Title: { ar: 'شرح مبسط لجيل اليوم', en: "Simple for Today's Gen" },
  feat2Desc: { ar: 'أمثلة عصرية قريبة من واقع واهتمامات الأطفال', en: "Modern examples relevant to kids' lives" },
  feat3Title: { ar: 'امتحانات وتمارين مرفقة', en: 'Practice Exams Included' },
  feat3Desc: { ar: 'بنفس نمط IGCSE الحقيقي مع نماذج إجابة', en: 'Same format as real IGCSE exams with model answers' },
  feat4Title: { ar: 'مناسب 10–15 سنة', en: 'Ages 10–15' },
  feat4Desc: { ar: '3 مستويات متدرجة لكل مرحلة عمرية', en: '3 progressive levels for every age group' },
  feat5Title: { ar: 'صُمم للعالم العربي', en: 'Tailored for the Arab World' },
  feat5Desc: { ar: 'شحن سريع لمصر ودول الخليج والشرق الأوسط', en: 'Fast regional delivery across Egypt & the Gulf' },
  feat6Title: { ar: 'جودة عالمية معتمدة', en: 'World-Class Standards' },
  feat6Desc: { ar: 'صمّمه خبراء ومعلمون متخصصون في IGCSE', en: 'Designed by expert Cambridge IGCSE educators' },

  // ── Comparison ──
  compTag: { ar: 'مقارنة الأسعار', en: 'Price Comparison' },
  compTitle: { ar: 'وفّر فلوسك،', en: 'Save Your Money,' },
  compTitleHighlight: { ar: 'ماتدفعش أكتر من اللازم', en: "Don't Overpay" },
  compLabel: { ar: 'المقارنة', en: 'Comparison' },
  compThem: { ar: '📦 الكتب المستوردة الباهظة', en: '📦 Overpriced Imported Books' },
  compUs: { ar: '📚 IG Made Easy', en: '📚 IG Made Easy' },
  compBest: { ar: '✓ البديل العربي الأول', en: '✓ #1 Arab Alternative' },
  compPrice: { ar: 'السعر', en: 'Price' },
  compPriceThem: { ar: '15–25 يورو ❌', en: '€15–25 ❌' },
  compPriceUs: { ar: 'سعر عربي تنافسي 💰', en: 'Fair Regional Price 💰' },
  compDelivery: { ar: 'وقت التوصيل', en: 'Delivery Time' },
  compDeliveryThem: { ar: 'أسابيع مع جمارك ❌', en: 'Weeks + Customs ❌' },
  compDeliveryUs: { ar: '2-5 أيام لمصر والشرق الأوسط ✅', en: '2-5 Days in Egypt & ME ✅' },
  compFit: { ar: 'ملائم للطالب العربي', en: 'Fits Arab Students' },
  compFitThem: { ar: 'صعب وغير مخصص ❌', en: 'Rigid & Alien ❌' },
  compFitUs: { ar: 'صُمّم خصيصاً للشرق الأوسط ✅', en: 'Tailored for Arab World ✅' },
  compExams: { ar: 'امتحانات ونماذج حل', en: 'Practice Exams' },
  compExamsThem: { ar: 'تتطلب شراء ملحقات ❌', en: 'Requires Extra Purchases ❌' },
  compExamsUs: { ar: 'شاملة داخل الكتاب ✅', en: 'Included Inside ✅' },
  compSaving: { ar: 'نسبة التوفير', en: 'Savings Rate' },
  compSavingVal: { ar: 'وفّر أكتر من 85% 🎉', en: 'Save over 85% 🎉' },

  // ── Age Groups ──
  agesTag: { ar: 'الفئات العمرية', en: 'Age Groups' },
  agesTitle: { ar: 'الكتاب المناسب', en: 'The Right Book' },
  agesTitleHighlight: { ar: 'لكل مرحلة', en: 'for Every Stage' },
  age1Range: { ar: '10 – 11 سنة', en: 'Ages 10–11' },
  age1Title: { ar: 'المستوى الأساسي', en: 'Beginner Level' },
  age1Items: {
    ar: ['المفردات والجمل الأساسية', 'قراءة وكتابة بسيطة', 'قواعد Grammar مبسطة', 'تمارين ممتعة'],
    en: ['Basic vocabulary & sentences', 'Simple reading & writing', 'Simplified grammar rules', 'Fun exercises']
  },
  age2Popular: { ar: 'الأكثر طلباً ⭐', en: 'Most Popular ⭐' },
  age2Range: { ar: '12 – 13 سنة', en: 'Ages 12–13' },
  age2Title: { ar: 'المستوى المتوسط', en: 'Intermediate Level' },
  age2Items: {
    ar: ['نصوص أطول وأعمق', 'كتابة مقالات وقصص', 'قواعد Grammar متوسطة', 'امتحانات نمط IGCSE', 'Listening & Speaking'],
    en: ['Longer, deeper texts', 'Writing essays & stories', 'Intermediate grammar', 'IGCSE-style exams', 'Listening & Speaking']
  },
  age3Range: { ar: '14 – 15 سنة', en: 'Ages 14–15' },
  age3Title: { ar: 'المستوى المتقدم', en: 'Advanced Level' },
  age3Items: {
    ar: ['تحليل نقدي', 'كتابة Academic وCreative', 'قواعد Grammar متقدمة', 'تحضير كامل لـ IGCSE'],
    en: ['Critical analysis', 'Academic & Creative writing', 'Advanced grammar', 'Full IGCSE preparation']
  },

  // ── Free Sample ──
  sampleTag: { ar: 'عينة مجانية', en: 'Free Sample' },
  sampleTitle: { ar: 'شوف الكتاب بنفسك', en: 'See the Book' },
  sampleTitleHighlight: { ar: 'قبل ما تشتري', en: 'Before You Buy' },
  sampleChecks: {
    ar: ['✅ عينة من فصل كامل مجاناً', '✅ نموذج امتحان IGCSE حقيقي', '✅ شرح مبسط وأمثلة عملية', '✅ بدون أي التزام للشراء'],
    en: ['✅ Free full chapter sample', '✅ Real IGCSE exam model', '✅ Simple explanations & examples', '✅ No purchase commitment']
  },
  sampleNamePh: { ar: 'اسمك', en: 'Your name' },
  samplePhonePh: { ar: 'رقم موبايلك', en: 'Your phone' },
  sampleDownload: { ar: 'حمّل العينة المجانية', en: 'Download Free Sample' },
  sampleHint: { ar: '📖 منهج تفاعلي ورسومات مبهجة تلائم جيل اليوم', en: "📖 Interactive modern lessons designed for today's kids" },
  sampleZoomHint: { ar: 'اضغط لتكبير وتصفح صفحات الكتاب ↔', en: 'Tap to zoom & explore book pages ↔' },

  // ── Testimonials ──
  testTag: { ar: 'آراء العملاء', en: 'Reviews' },
  testTitle: { ar: 'آباء وأمهات', en: 'Parents Who' },
  testTitleHighlight: { ar: 'وثقوا فيه', en: 'Trusted It' },
  testRating: { ar: '4.9 / 5 من آراء أولياء الأمور', en: '4.9 / 5 from parent reviews' },

  // ── FAQ ──
  faqTag: { ar: 'الأسئلة الشائعة', en: 'FAQ' },
  faqTitle: { ar: 'عندك سؤال؟', en: 'Have a Question?' },
  faqTitleHighlight: { ar: 'احنا هنا', en: "We're Here" },

  // ── Order ──
  orderTag: { ar: 'اطلب الكتاب', en: 'Order the Book' },
  orderTitle: { ar: 'ابدأ رحلة ابنك مع الإنجليزية', en: "Start Your Child's English Journey" },
  orderTitleHighlight: { ar: 'دلوقتي', en: 'Today' },
  orderDesc: {
    ar: 'شحن سريع ومباشر لكافة محافظات مصر ودول الشرق الأوسط (السعودية، الإمارات، الكويت، قطر، عُمان، الأردن، وغيرها)',
    en: 'Fast direct delivery across Egypt & the Middle East (KSA, UAE, Kuwait, Qatar, Oman, Jordan & more)'
  },
  orderPayLabel: { ar: 'وسائل الدفع المتاحة:', en: 'Available Payment Methods:' },
  orderPayVisa: { ar: '💳 فيزا / مدى / ماستركارد', en: '💳 Visa / Mada / Mastercard' },
  orderPayMobile: { ar: '📱 محافظ إلكترونية / إنستا باي', en: '📱 Mobile Wallets / InstaPay' },
  orderPayCod: { ar: '🚚 الدفع عند الاستلام', en: '🚚 Cash on Delivery (COD)' },
  orderGuarantee: {
    ar: 'ضمان الجودة الذهبي: لو المحتوى مش مناسب لابنك، تواصل معنا وهنحلها فوراً',
    en: "Quality Guarantee: If the content doesn't match your expectations, contact us and we'll resolve it immediately"
  },
  orderFormTitle: { ar: '📦 فورم الطلب المباشر', en: '📦 Direct Order Form' },
  orderName: { ar: 'الاسم الكامل', en: 'Full Name' },
  orderNamePh: { ar: 'اكتب اسمك هنا', en: 'Write your name' },
  orderPhone: { ar: 'رقم الموبايل (مع كود الدولة)', en: 'Phone Number (with Country Code)' },
  orderCountry: { ar: 'الدولة', en: 'Country' },
  orderCountryPh: { ar: 'اختر دولتك', en: 'Select your country' },
  orderAddress: { ar: 'المدينة / المنطقة بالتفصيل', en: 'City / Detailed Address' },
  orderAddressPh: { ar: 'المدينة والحي وعنوان التوصيل', en: 'City, district, and delivery address' },
  orderLevel: { ar: 'المستوى العمري المطلوب', en: 'Required Age Level' },
  orderLevelPh: { ar: 'اختر المستوى', en: 'Select level' },
  orderLevelBeginner: { ar: 'المستوى الأساسي (10-11 سنة)', en: 'Beginner Level (10-11 yrs)' },
  orderLevelIntermediate: { ar: 'المستوى المتوسط (12-13 سنة)', en: 'Intermediate Level (12-13 yrs)' },
  orderLevelAdvanced: { ar: 'المستوى المتقدم (14-15 سنة)', en: 'Advanced Level (14-15 yrs)' },
  orderQty: { ar: 'عدد النسخ', en: 'Quantity' },
  orderSubmit: { ar: '🛒 أرسل الطلب الآن', en: '🛒 Submit Order Now' },
  orderWhatsapp: { ar: 'أو اطلب عبر واتساب مباشرة', en: 'Or Order Directly via WhatsApp' },

  // ── Countries ──
  countryEgypt: { ar: '🇪🇬 مصر', en: '🇪🇬 Egypt' },
  countryKsa: { ar: '🇸🇦 المملكة العربية السعودية', en: '🇸🇦 Saudi Arabia' },
  countryUae: { ar: '🇦🇪 الإمارات العربية المتحدة', en: '🇦🇪 United Arab Emirates' },
  countryKuwait: { ar: '🇰🇼 الكويت', en: '🇰🇼 Kuwait' },
  countryQatar: { ar: '🇶🇦 قطر', en: '🇶🇦 Qatar' },
  countryOman: { ar: '🇴🇲 سلطنة عُمان', en: '🇴🇲 Oman' },
  countryBahrain: { ar: '🇧🇭 البحرين', en: '🇧🇭 Bahrain' },
  countryJordan: { ar: '🇯🇴 الأردن', en: '🇯🇴 Jordan' },
  countryOther: { ar: '🌍 دولة عربية أخرى', en: '🌍 Other Arab Country' },

  // ── Footer ──
  footerDesc: { ar: 'كتابك الإنجليزي لمنهج IGCSE. البديل العربي الأول بجودة عالمية وسعر في متناول يدك.', en: 'Your English book for IGCSE. The #1 Arab alternative with world-class quality at an accessible price.' },
  footerQuickLinks: { ar: 'روابط سريعة', en: 'Quick Links' },
  footerBookFeatures: { ar: 'مميزات الكتاب', en: 'Book Features' },
  footerPricing: { ar: 'مقارنة الأسعار', en: 'Price Comparison' },
  footerAgeGroups: { ar: 'الفئات العمرية', en: 'Age Groups' },
  footerSample: { ar: 'عينة مجانية', en: 'Free Sample' },
  footerContact: { ar: 'تواصل معنا', en: 'Contact Us' },
  footerOrderNow: { ar: 'اطلب الآن 🛒', en: 'Order Now 🛒' },
  footerRights: { ar: 'جميع الحقوق محفوظة', en: 'All rights reserved' },
  footerDisclaimer: { ar: 'منتج مستقل وغير مرتبط رسمياً بهيئة Cambridge / IGCSE', en: 'Independent product, not officially affiliated with Cambridge / IGCSE' },

  // ── Chatbot ──
  chatbotName: { ar: 'مساعد IG Made Easy', en: 'IG Made Easy Assistant' },
  chatbotStatus: { ar: 'متصل الآن • البديل العربي الأول', en: 'Online • #1 Arab Alternative' },
  chatbotGreeting: {
    ar: '👋 أهلاً بك! أنا المساعد الذكي لكتاب IG Made Easy — البديل العربي الأول لمناهج IGCSE. كيف أقدر أساعدك اليوم؟',
    en: "👋 Hello! I'm the IG Made Easy smart assistant — the #1 Arab alternative for IGCSE. How can I help you today?"
  },
  chatbotInputPh: { ar: 'اكتب استفسارك هنا...', en: 'Type your question here...' },

  // ── Lightbox ──
  lightboxTitle: { ar: 'معرض صور الكتاب التفاعلي', en: 'Interactive Book Gallery' },
  lightboxSwipeHint: { ar: 'اسحب لليمين واليسار للتنقل ↔', en: 'Swipe left / right to slide ↔' },

  // ── Toast ──
  toastOrderSuccess: { ar: '✅ تم إرسال طلبك بنجاح! هنتواصل معاك قريباً.', en: '✅ Order submitted successfully! We\'ll contact you soon.' },
  toastSampleSuccess: { ar: '✅ تم تسجيل طلبك للعينة المجانية!', en: '✅ Your free sample request has been registered!' },
  toastError: { ar: '❌ حصل خطأ، حاول تاني.', en: '❌ Something went wrong, please try again.' },

  // ── Page Title & Meta ──
  pageTitle: { ar: 'IG Made Easy — البديل العربي الأول لمناهج IGCSE بسعر في متناول الجميع', en: 'IG Made Easy — The #1 Arab Alternative to Imported IGCSE Books' },
  metaDesc: {
    ar: 'IG Made Easy هو البديل العربي الأول لكتب منهج Cambridge IGCSE في مصر والشرق الأوسط. شرح مبسط، امتحانات حقيقية، شحن سريع لكافة الدول العربية.',
    en: 'IG Made Easy is the #1 Arab alternative to Cambridge IGCSE curriculum books in Egypt and the Middle East. Simple explanations, real exams, fast shipping across all Arab countries.'
  },
};

export default translations;
