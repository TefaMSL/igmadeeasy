export const navLinks = [
  { id: 'features', label: { ar: 'المميزات', en: 'Features' }, href: '#features' },
  { id: 'comparison', label: { ar: 'السعر والتوفير', en: 'Pricing' }, href: '#comparison' },
  { id: 'ages', label: { ar: 'الفئات العمرية', en: 'Age Groups' }, href: '#ages' },
  { id: 'sample', label: { ar: 'عينة مجانية', en: 'Free Sample' }, href: '#sample' },
  { id: 'testimonials', label: { ar: 'آراء أولياء الأمور', en: 'Reviews' }, href: '#testimonials' },
  { id: 'faq', label: { ar: 'الأسئلة الشائعة', en: 'FAQ' }, href: '#faq' },
];

export const heroMetrics = [
  {
    icon: '📚',
    value: '85%+',
    label: { ar: 'توفير في السعر', en: 'Price Savings' },
    color: 'orange',
  },
  {
    icon: '👦',
    value: '10–15',
    label: { ar: 'سنة فئة عمرية', en: 'Target Age Range' },
    color: 'navy',
  },
  {
    icon: '🌍',
    value: '100%',
    label: { ar: 'بديل عربي معتمد', en: 'Arab Alternative' },
    color: 'emerald',
  },
];

export const problemData = [
  {
    id: 'p1',
    icon: '💸',
    title: { ar: 'سعر باهظ بالعملات الأجنبية', en: 'Expensive Foreign Currency Price' },
    desc: {
      ar: 'تصل لـ 15–25 يورو للكتاب الواحد — تكلفة مجهدة ومبالغ فيها على ميزانية أي أسرة عربية.',
      en: '€15–25 per imported book — An exorbitant burden on any family’s educational budget.',
    },
    tag: { ar: 'مكلف جداً', en: 'High Cost' },
  },
  {
    id: 'p2',
    icon: '🌍',
    featured: true,
    title: { ar: 'صعوبة الشحن الدولي والجمارك', en: 'International Shipping & Customs' },
    desc: {
      ar: 'تأخير لأسابيع في الشحن، ومصاريف جمارك وتوصيل دولية تضاعف سعر الكتاب عدة مرات.',
      en: 'Weeks of shipping delays and steep customs fees that double the final cost.',
    },
    tag: { ar: 'تأخير وجمارك', en: 'Weeks of Delay' },
  },
  {
    id: 'p3',
    icon: '📖',
    title: { ar: 'شرح معقد لا يراعي الطالب العربي', en: 'Disconnected Foreign Curricula' },
    desc: {
      ar: 'المناهج الأجنبية لا تراعي خلفية الطالب العربي ولغته وأسلوبها جامد وغير محبب.',
      en: 'Foreign textbooks aren’t tailored for Arab students and feature rigid, unengaging styles.',
    },
    tag: { ar: 'أسلوب جاف', en: 'Rigid Style' },
  },
];

export const featuresBento = [
  {
    id: 'bento-1',
    size: 'large',
    icon: '🎓',
    accentColor: '#F97316',
    title: { ar: 'منهج IG معتمد دولياً', en: 'IGCSE Aligned Curriculum' },
    desc: {
      ar: 'محتوى مطابق لمتطلبات منهج Cambridge IGCSE الدولي بالكامل مع تغطية شاملة لكل الوحدات والمهارات الأساسية (Reading, Writing, Grammar, Vocabulary).',
      en: 'Fully aligned with Cambridge IGCSE international curriculum, covering all units and core skills comprehensively.',
    },
    badge: { ar: 'مطابق للمنهج', en: 'Cambridge Aligned' },
  },
  {
    id: 'bento-2',
    size: 'small',
    icon: '💡',
    accentColor: '#3B82F6',
    title: { ar: 'شرح مبسط لجيل اليوم', en: 'Simple for Today’s Generation' },
    desc: {
      ar: 'أمثلة عصرية ورسومات مبهجة قريبة من اهتمامات وحياة أطفالنا اليوم.',
      en: 'Modern examples and vibrant visual guides relevant to kids’ daily lives.',
    },
  },
  {
    id: 'bento-3',
    size: 'small',
    icon: '📝',
    accentColor: '#10B981',
    title: { ar: 'امتحانات وتمارين مرفقة', en: 'Practice Exams Included' },
    desc: {
      ar: 'نماذج امتحانات بنفس صيغة IGCSE الرسمية مع إجابات نموذجية وتدريبات بعد كل درس.',
      en: 'Same format as real IGCSE exams with model answers and unit exercises.',
    },
  },
  {
    id: 'bento-4',
    size: 'small',
    icon: '👦',
    accentColor: '#8B5CF6',
    title: { ar: 'مناسب للأعمار 10–15 سنة', en: 'Ages 10–15 Years' },
    desc: {
      ar: '3 مستويات متدرجة تلائم المرحلة التأسيسية والإعدادية حتى أبواب الامتحان الدولي.',
      en: '3 progressive levels catering to foundation, intermediate, and exam-ready students.',
    },
  },
  {
    id: 'bento-5',
    size: 'small',
    icon: '🌍',
    accentColor: '#F97316',
    title: { ar: 'صُمم للعالم العربي', en: 'Tailored for the Arab World' },
    desc: {
      ar: 'شحن سريع ومباشر لمصر والسعودية والإمارات والكويت وكافة دول الشرق الأوسط.',
      en: 'Fast direct delivery across Egypt, KSA, UAE, Kuwait, and all Arab countries.',
    },
  },
  {
    id: 'bento-6',
    size: 'small',
    icon: '⭐',
    accentColor: '#F59E0B',
    title: { ar: 'جودة طباعة فاخرة', en: 'World-Class Standards' },
    desc: {
      ar: 'غلاف مقوى ألوان عالية الدقة، ورق فاخر لا يشف، وتجليد يدوم لسنوات.',
      en: 'Hardcover, high-res color printing, premium thick paper, and durable binding.',
    },
  },
];

export const comparisonRows = [
  {
    criteria: { ar: 'السعر', en: 'Price' },
    them: { ar: '15–25 يورو (مستورد)', en: '€15–25 (Imported)' },
    themBad: true,
    us: { ar: 'سعر عربي عادل ومناسب 💰', en: 'Fair Regional Price 💰' },
    usGood: true,
  },
  {
    criteria: { ar: 'وقت التوصيل والجمارك', en: 'Delivery Time & Customs' },
    them: { ar: 'أسابيع انتظار + جمارك ❌', en: 'Weeks of wait + customs ❌' },
    themBad: true,
    us: { ar: '2-5 أيام بمصر والشرق الأوسط ✅', en: '2-5 Days across Egypt & ME ✅' },
    usGood: true,
  },
  {
    criteria: { ar: 'ملاءمة الطالب العربي', en: 'Tailored for Arab Students' },
    them: { ar: 'شرح جاف وغير مخصص ❌', en: 'Rigid & disconnected ❌' },
    themBad: true,
    us: { ar: 'مبسط ومصمم بأسلوب محبب ✅', en: 'Tailored with engaging style ✅' },
    usGood: true,
  },
  {
    criteria: { ar: 'امتحانات ونماذج إجابة', en: 'Exams & Model Answers' },
    them: { ar: 'تتطلب شراء ملحقات إضافية ❌', en: 'Requires separate purchases ❌' },
    themBad: true,
    us: { ar: 'شاملة بالكامل داخل الكتاب ✅', en: 'Fully included inside the book ✅' },
    usGood: true,
  },
  {
    criteria: { ar: 'نسبة التوفير الحقيقية', en: 'Real Savings Rate' },
    them: { ar: '0% توفير', en: '0% Savings' },
    themBad: true,
    us: { ar: 'توفير أكثر من 85% من التكلفة 🎉', en: 'Save over 85% in total cost 🎉' },
    usGood: true,
    isHighlight: true,
  },
];

export const ageGroupsData = [
  {
    id: 'stage-1',
    range: { ar: '10 – 11 سنة', en: 'Ages 10–11' },
    level: { ar: 'المستوى الأساسي', en: 'Beginner Level' },
    emoji: '🌱',
    color: '#06B6D4',
    tag: 'Beginner',
    features: [
      { ar: 'المفردات والجمل الأساسية واليومية', en: 'Basic daily vocabulary & sentences' },
      { ar: 'مهارات قراءة وكتابة بسيطة ومشوقة', en: 'Engaging simple reading & writing' },
      { ar: 'قواعد Grammar بطريقة تفاعلية ومصورة', en: 'Illustrated interactive grammar' },
      { ar: 'تمارين وألعاب ذهنية لتعزيز الاستيعاب', en: 'Mind games and retention exercises' },
    ],
  },
  {
    id: 'stage-2',
    popular: true,
    range: { ar: '12 – 13 سنة', en: 'Ages 12–13' },
    level: { ar: 'المستوى المتوسط (الأكثر طلباً)', en: 'Intermediate Level (Most Popular)' },
    emoji: '🚀',
    color: '#F97316',
    tag: 'Intermediate',
    features: [
      { ar: 'نصوص أطول وأعمق وتفكير نقدي', en: 'Longer comprehension & critical thought' },
      { ar: 'كتابة مقالات، إيميلات، وقصص قصيرة', en: 'Essays, emails & story writing' },
      { ar: 'قواعد Grammar متقدمة لأساس قوي', en: 'Intermediate-to-advanced grammar' },
      { ar: 'امتحانات تمهيدية بنمط IGCSE الحقيقي', en: 'Introductory IGCSE format exams' },
      { ar: 'تطوير مهارات Listening & Speaking', en: 'Listening & speaking activities' },
    ],
  },
  {
    id: 'stage-3',
    range: { ar: '14 – 15 سنة', en: 'Ages 14–15' },
    level: { ar: 'المستوى المتقدم (تحضير IGCSE)', en: 'Advanced Level (IGCSE Prep)' },
    emoji: '🏆',
    color: '#8B5CF6',
    tag: 'Advanced',
    features: [
      { ar: 'تحليل نقدي وأدبي متكامل للنصوص', en: 'Comprehensive textual analysis' },
      { ar: 'كتابة Academic و Creative احترافية', en: 'High-scoring academic & creative writing' },
      { ar: 'إتقان تام لكل قواعد ومصطلحات المنهج', en: 'Mastery of all syllabus grammar & idioms' },
      { ar: 'محاكاة كاملة لاختبارات Cambridge IGCSE', en: 'Full Cambridge IGCSE mock exam papers' },
    ],
  },
];

export const testimonialsData = [
  {
    id: 'test-1',
    stars: 5,
    quote: {
      ar: '"ابني اتحسن في الإنجليزي بشكل ملحوظ خلال شهرين. الكتاب بيشرح بطريقة سهلة وواضحة جداً بعيداً عن تعقيد المناهج الأجنبية!"',
      en: '"My son improved noticeably in English within two months. The book explains things simply and clearly without foreign book complications!"',
    },
    name: { ar: 'أم أحمد', en: "Ahmed's Mom" },
    info: { ar: 'القاهرة — ابنها في مرحلة 12 سنة', en: 'Cairo — son is 12 years old' },
    initial: 'أ',
    gradient: 'from-orange-500 to-amber-500',
  },
  {
    id: 'test-2',
    stars: 5,
    featured: true,
    quote: {
      ar: '"كنت بدفع مبالغ ضخمة على كتب أجنبية مستوردة تتعدى 15 و20 يورو غير الشحن. كتاب IG Made Easy وصلني في يومين وجودة الطباعة والمحتوى أفضل بمراحل!"',
      en: '"I used to spend hefty amounts on imported books exceeding €15-20 plus shipping. IG Made Easy arrived in 2 days and the structure is far superior!"',
    },
    name: { ar: 'أب محمود', en: "Mahmoud's Dad" },
    info: { ar: 'ولي أمر — طالب IGCSE (السعودية)', en: 'Parent — IGCSE Student (KSA)' },
    initial: 'م',
    gradient: 'from-blue-600 to-cyan-500',
  },
  {
    id: 'test-3',
    stars: 5,
    quote: {
      ar: '"الامتحانات التفاعلية جوا الكتاب بالظبط زي الامتحانات الحقيقية. وفرت علينا دروس خصوصية ومراجعات كتيرة."',
      en: '"The practice exams inside the book are identical to real exam questions. It saved us significant tutoring costs."',
    },
    name: { ar: 'أم هنا', en: "Hana's Mom" },
    info: { ar: 'الجيزة — بنتها 15 سنة', en: 'Giza — daughter is 15' },
    initial: 'ه',
    gradient: 'from-purple-600 to-pink-500',
  },
  {
    id: 'test-4',
    stars: 5,
    quote: {
      ar: '"كمعلمة لغة إنجليزية لمرحلة IG، بنصح به لكل طلابي. المنهج منظم، الألوان تفتح النفس، والسعر محترم جداً مقارنة بالسوق."',
      en: '"As an English teacher for IG students, I recommend it to all my classes. Highly organized, appealing visuals, and fair price."',
    },
    name: { ar: 'مس سارة الشريف', en: 'Ms. Sara El-Sherif' },
    info: { ar: 'معلمة لغة إنجليزية IGCSE — الإسكندرية', en: 'IGCSE English Teacher — Alexandria' },
    initial: 'س',
    gradient: 'from-emerald-600 to-teal-500',
  },
];

export const faqData = [
  {
    id: 'faq-1',
    question: { ar: 'هل الكتاب مطابق لمنهج IG وIGCSE؟', en: 'Is the book fully aligned with IGCSE?' },
    answer: {
      ar: 'نعم، متوافق 100% مع معايير ومخرجات Cambridge IGCSE English كبديل عربي شامل ومبسط، ويغطي مهارات القراءة والكتابة والقواعد ونماذج الامتحانات.',
      en: 'Yes, 100% aligned with Cambridge IGCSE English requirements as a comprehensive Arab alternative covering reading, writing, grammar and past papers.',
    },
  },
  {
    id: 'faq-2',
    question: { ar: 'إزاي أستلم الكتاب ومواعيد الشحن؟', en: 'How do I receive the book & delivery timeframe?' },
    answer: {
      ar: 'بعد تسجيل طلبك، يتم التواصل معك خلال 24 ساعة لتأكيد العنوان والشحن. التوصيل يستغرق 2-3 أيام داخل مصر، و3-5 أيام لدول الخليج والشرق الأوسط.',
      en: 'After ordering, our support team contacts you within 24 hours. Delivery takes 2-3 days in Egypt and 3-5 days across GCC and Arab countries.',
    },
  },
  {
    id: 'faq-3',
    question: { ar: 'إيه وسائل الدفع المتاحة؟', en: 'What payment methods are available?' },
    answer: {
      ar: 'نوفر الدفع عند الاستلام (COD)، والمحافظ الإلكترونية (فودافون كاش، أورانج، وي)، وإنستا باي (InstaPay)، والبطاقات البنكية ومدى.',
      en: 'We offer Cash on Delivery (COD), Mobile Wallets (Vodafone Cash), InstaPay, Bank Cards (Visa/Mastercard), and Mada.',
    },
  },
  {
    id: 'faq-4',
    question: { ar: 'هل توجد نماذج امتحانات وإجابات داخل الكتاب؟', en: 'Are there mock exams and answer keys inside?' },
    answer: {
      ar: 'نعم! يحتوي الكتاب على امتحانات تحاكي الامتحان الدولي بدقة، مع نماذج إجابة وشرح استراتيجيات حل أسئلة الامتحان.',
      en: 'Yes! The book contains real-style mock exams with model answers and strategies to tackle exam questions effectively.',
    },
  },
  {
    id: 'faq-5',
    question: { ar: 'كيف أختار المستوى المناسب لابني؟', en: 'How do I pick the right level for my child?' },
    answer: {
      ar: 'الكتاب مقسم لـ 3 مراحل عمرية: (10-11 سنة للمستوى التأسيسي)، (12-13 سنة للمستوى المتوسط)، و(14-15 سنة للتحضير النهائي للامتحان).',
      en: 'The book is divided into 3 levels: Ages 10-11 for Beginner Foundation, 12-13 for Intermediate, and 14-15 for Final IGCSE Prep.',
    },
  },
  {
    id: 'faq-6',
    question: { ar: 'هل يمكن الشراء بالجملة للمدارس والمراكز التعليمية؟', en: 'Can schools and learning centers order in bulk?' },
    answer: {
      ar: 'بالتأكيد! نوفر خصومات حصرية للمدارس والمدرسين والمراكز التعليمية مع إمكانية التنسيق المباشر عبر واتساب.',
      en: 'Absolutely! We offer special bulk discounts for schools, tutors, and learning centers via direct WhatsApp coordination.',
    },
  },
];

export const galleryData = [
  {
    id: 'g1',
    src: '/book-mockup.jpg',
    alt: 'IG Made Easy Book 3D Cover',
    title: { ar: 'غلاف الكتاب الخارجي الفاخر', en: 'Deluxe Hardcover Book' },
    desc: {
      ar: 'تصميم راقٍ بمقاييس نشر دولية مع لمسات برتقالية وذهبية ومحتوى منظم ومعتمد.',
      en: 'World-class publishing design tailored for Middle East students with premium finish.',
    },
    emoji: '📖',
    tag: { ar: 'الغلاف الخارجي (عرض ثلاثي الأبعاد)', en: '3D Cover View' },
  },
  {
    id: 'g2',
    src: '/book-inside.jpg',
    alt: 'IG Made Easy Inside Lessons',
    title: { ar: 'من داخل الكتاب (شرح وتمارين)', en: 'Inside Lessons & Exercises' },
    desc: {
      ar: 'صفحات ملونة مبهجة وشرح مبسط مع تمارين تفاعلية ونماذج تطبيقية من واقع الطالب.',
      en: 'Vibrant color pages with bite-sized explanations, interactive tasks, and real-life examples.',
    },
    emoji: '📄',
    tag: { ar: 'من داخل الكتاب (شرح وتمارين)', en: 'Inside Lessons & Exercises' },
  },
  {
    id: 'g3',
    src: '/book-levels.jpg',
    alt: 'IG Made Easy 3 Levels Stack',
    title: { ar: 'المستويات الثلاثة المتدرجة', en: '3 Progressive Levels' },
    desc: {
      ar: 'حزمة متكاملة تغطي المراحل العمرية من 10 إلى 15 سنة بتسلسل منهجي سلس.',
      en: 'Three progressive stages covering ages 10 to 15 with seamless pedagogical sequence.',
    },
    emoji: '📚',
    tag: { ar: 'المستويات الثلاثة (10–15 سنة)', en: '3 Levels Stack (10–15 yrs)' },
  },
  {
    id: 'g4',
    src: '/student-reading.jpg',
    alt: 'Student Reading IG Made Easy',
    title: { ar: 'طالبنا المتميز أثناء المذاكرة', en: 'Real Student Experience' },
    desc: {
      ar: 'أبناؤنا يتعلمون بشغف وسعادة مع منهج صُمم ليفهموه بدون تعقيد.',
      en: 'Students learning with passion and joy through a curriculum crafted specifically for them.',
    },
    emoji: '👦',
    tag: { ar: 'طالبنا المتميز أثناء المذاكرة', en: 'Real Student Experience' },
  },
];

export const countriesList = [
  { value: 'مصر — Egypt', label: { ar: '🇪🇬 مصر', en: '🇪🇬 Egypt' } },
  { value: 'السعودية — KSA', label: { ar: '🇸🇦 المملكة العربية السعودية', en: '🇸🇦 Saudi Arabia' } },
  { value: 'الإمارات — UAE', label: { ar: '🇦🇪 الإمارات العربية المتحدة', en: '🇦🇪 United Arab Emirates' } },
  { value: 'الكويت — Kuwait', label: { ar: '🇰🇼 الكويت', en: '🇰🇼 Kuwait' } },
  { value: 'قطر — Qatar', label: { ar: '🇶🇦 قطر', en: '🇶🇦 Qatar' } },
  { value: 'عُمان — Oman', label: { ar: '🇴🇲 سلطنة عُمان', en: '🇴🇲 Oman' } },
  { value: 'البحرين — Bahrain', label: { ar: '🇧🇭 البحرين', en: '🇧🇭 Bahrain' } },
  { value: 'الأردن — Jordan', label: { ar: '🇯🇴 الأردن', en: '🇯🇴 Jordan' } },
  { value: 'دولة عربية أخرى', label: { ar: '🌍 دولة عربية أخرى', en: '🌍 Other Arab Country' } },
];

export const levelsList = [
  { value: 'المستوى الأساسي (10-11 سنة)', label: { ar: '🌱 المستوى الأساسي (10-11 سنة)', en: '🌱 Beginner Level (10-11 yrs)' } },
  { value: 'المستوى المتوسط (12-13 سنة)', label: { ar: '🚀 المستوى المتوسط (12-13 سنة) — الأكثر طلباً', en: '🚀 Intermediate Level (12-13 yrs) — Most Popular' } },
  { value: 'المستوى المتقدم (14-15 سنة)', label: { ar: '🏆 المستوى المتقدم (14-15 سنة)', en: '🏆 Advanced Level (14-15 yrs)' } },
];
