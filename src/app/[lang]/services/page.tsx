import {
  Wrench,
  BookOpen,
  Settings,
  Lightbulb,
  GraduationCap,
  CheckCircle2,
  Factory,
  ArrowRight,
  ArrowDown,
  ClipboardCheck,
  Ruler,
  Cog,
  Headphones,
} from 'lucide-react';

const servicesEn = [
  {
    number: '01',
    icon: BookOpen,
    title: 'Project Study',
    shortTitle: 'Understand the project',
    desc: 'Every project starts with understanding the real operating conditions. We review the application, dimensions, climate, operating season, target temperature and usage pattern.',
    result: 'A clear picture of the project requirements before system selection.',
  },
  {
    number: '02',
    icon: Ruler,
    title: 'System Sizing',
    shortTitle: 'Match the right capacity',
    desc: 'We determine the appropriate system capacity, number of units and overall arrangement based on the project requirements and expected operating conditions.',
    result: 'A properly sized system designed around the actual application.',
  },
  {
    number: '03',
    icon: Lightbulb,
    title: 'Technical Advice',
    shortTitle: 'Plan the integration',
    desc: 'We provide technical guidance on how the selected equipment should integrate with the existing pool, hot-water or building system.',
    result: 'A practical integration approach that fits the existing installation.',
  },
  {
    number: '04',
    icon: Wrench,
    title: 'Installation & Commissioning',
    shortTitle: 'Bring the system online',
    desc: 'We support equipment placement, connections, testing and commissioning to make sure the system is ready for operation.',
    result: 'A tested system prepared for reliable day-to-day operation.',
  },
  {
    number: '05',
    icon: GraduationCap,
    title: 'Knowledge Transfer',
    shortTitle: 'Equip your team',
    desc: 'We guide operators and maintenance teams through correct equipment use, essential checks and the basic practices required for routine operation.',
    result: 'A team that understands how to operate and monitor the system correctly.',
  },
  {
    number: '06',
    icon: CheckCircle2,
    title: 'Maintenance',
    shortTitle: 'Keep performance on track',
    desc: 'Our technical support covers planned maintenance as well as corrective service when attention is required.',
    result: 'Ongoing technical support throughout the operating life of the system.',
  },
  {
    number: '07',
    icon: Factory,
    title: 'Spare-Parts Follow-Up',
    shortTitle: 'Support beyond installation',
    desc: 'We support spare-parts requirements as part of the system’s ongoing operational support, helping customers identify the parts needed for service and maintenance.',
    result: 'Better continuity of maintenance and long-term system support.',
  },
];

const servicesAr = [
  {
    number: '01',
    icon: BookOpen,
    title: 'دراسة المشروع',
    shortTitle: 'نفهم المشروع أولًا',
    desc: 'يبدأ كل مشروع بفهم ظروف التشغيل الفعلية. نراجع طبيعة التطبيق والأبعاد والمناخ وموسم التشغيل ودرجة الحرارة المستهدفة ونمط الاستخدام.',
    result: 'صورة واضحة عن متطلبات المشروع قبل اختيار النظام.',
  },
  {
    number: '02',
    icon: Ruler,
    title: 'تحديد حجم النظام',
    shortTitle: 'نحدد القدرة المناسبة',
    desc: 'نحدد القدرة المناسبة للنظام وعدد الوحدات والترتيب العام وفقًا لمتطلبات المشروع وظروف التشغيل المتوقعة.',
    result: 'نظام بالحجم المناسب ومصمم وفقًا للتطبيق الفعلي.',
  },
  {
    number: '03',
    icon: Lightbulb,
    title: 'الاستشارات الفنية',
    shortTitle: 'نخطط للتكامل',
    desc: 'نقدم التوجيه الفني اللازم لدمج المعدات المختارة مع نظام المسبح أو المياه الساخنة أو نظام المبنى القائم.',
    result: 'طريقة تكامل عملية تتناسب مع النظام الموجود.',
  },
  {
    number: '04',
    icon: Wrench,
    title: 'التركيب والتشغيل',
    shortTitle: 'نحوّل التصميم إلى نظام يعمل',
    desc: 'ندعم عمليات وضع المعدات والتوصيلات والاختبارات والتشغيل الأولي للتأكد من جاهزية النظام للعمل.',
    result: 'نظام تم اختباره وأصبح جاهزًا للتشغيل اليومي.',
  },
  {
    number: '05',
    icon: GraduationCap,
    title: 'نقل المعرفة',
    shortTitle: 'نجهز فريق التشغيل',
    desc: 'نوجه المشغلين وفرق الصيانة حول الاستخدام الصحيح للمعدات والفحوصات الأساسية والممارسات اللازمة للتشغيل الروتيني.',
    result: 'فريق يعرف كيفية تشغيل النظام ومتابعته بالشكل الصحيح.',
  },
  {
    number: '06',
    icon: CheckCircle2,
    title: 'الصيانة',
    shortTitle: 'نحافظ على استمرارية التشغيل',
    desc: 'يشمل الدعم الفني الصيانة المخططة بالإضافة إلى خدمات الصيانة التصحيحية عند الحاجة.',
    result: 'دعم فني مستمر طوال فترة تشغيل النظام.',
  },
  {
    number: '07',
    icon: Factory,
    title: 'متابعة قطع الغيار',
    shortTitle: 'دعم ما بعد التركيب',
    desc: 'ندعم احتياجات قطع الغيار ضمن خدمات التشغيل والصيانة المستمرة، ونساعد في تحديد القطع المطلوبة لأعمال الخدمة والصيانة.',
    result: 'استمرارية أفضل لأعمال الصيانة والدعم على المدى الطويل.',
  },
];

export default async function Services(
  props: { params: Promise<{ lang: 'en' | 'ar' }> }
) {
  const params = await props.params;
  const lang = params.lang;
  const isArabic = lang === 'ar';

  const services = isArabic ? servicesAr : servicesEn;

  const content = isArabic
    ? {
        eyebrow: 'OUR ENGINEERING SERVICES',
        title: 'From Project Concept to Long-Term Support',
        subtitle:
          'Engineering support built around your project — from understanding the application and selecting the right system to installation, commissioning and ongoing technical support.',
        lifecycleTitle: 'One Engineering Process. Every Stage Covered.',
        lifecycleSubtitle:
          'We stay involved throughout the project lifecycle, helping move your system from an initial requirement to reliable operation.',
        serviceTitle: 'How We Support Your Project',
        serviceSubtitle:
          'Our services are structured around the decisions and technical requirements that matter at every stage of the project.',
        resultLabel: 'WHAT YOU GET',
        ctaEyebrow: 'START WITH YOUR PROJECT',
        ctaTitle: 'Let’s understand your requirements.',
        ctaText:
          'Share the basic details of your project and our engineering team can review the requirements and determine the right next step.',
        ctaButton: 'Request a Project Study',
        contactNote:
          'Project type • Location • Water volume • Target temperature • Available drawings',
      }
    : {
        eyebrow: 'OUR ENGINEERING SERVICES',
        title: 'من فكرة المشروع إلى الدعم المستمر',
        subtitle:
          'دعم هندسي مصمم حول احتياجات مشروعك — بدايةً من فهم التطبيق واختيار النظام المناسب، وصولًا إلى التركيب والتشغيل والدعم الفني المستمر.',
        lifecycleTitle: 'منهج هندسي متكامل يغطي كل المراحل',
        lifecycleSubtitle:
          'نظل على اتصال بالمشروع خلال مراحله المختلفة، بدايةً من تحديد الاحتياج وحتى الوصول إلى تشغيل موثوق.',
        serviceTitle: 'كيف ندعم مشروعك',
        serviceSubtitle:
          'خدماتنا مصممة لتغطية القرارات والمتطلبات الفنية المهمة في كل مرحلة من مراحل المشروع.',
        resultLabel: 'النتيجة',
        ctaEyebrow: 'ابدأ بمشروعك',
        ctaTitle: 'خلينا نفهم احتياجات مشروعك.',
        ctaText:
          'شاركنا البيانات الأساسية لمشروعك ليقوم فريقنا الهندسي بمراجعة المتطلبات وتحديد الخطوة المناسبة التالية.',
        ctaButton: 'اطلب دراسة مشروع',
        contactNote:
          'نوع المشروع • الموقع • حجم المياه • درجة الحرارة المطلوبة • الرسومات المتاحة',
      };

  return (
    <main
      dir={isArabic ? 'rtl' : 'ltr'}
      className="bg-white text-[var(--color-brand-navy)]"
    >
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden bg-[var(--color-brand-light)]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/70 blur-3xl" />
          <div className="absolute -bottom-40 -left-32 w-96 h-96 rounded-full bg-[var(--color-brand-blue)]/10 blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="min-h-[560px] flex items-center py-24">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-3 mb-7">
                <span className="w-10 h-px bg-[var(--color-brand-blue)]" />
                <span className="text-sm font-bold tracking-[0.2em] text-[var(--color-brand-blue)]">
                  {content.eyebrow}
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-8">
                {content.title}
              </h1>

              <p className="text-xl md:text-2xl leading-relaxed max-w-3xl text-[var(--color-brand-dark-gray)]">
                {content.subtitle}
              </p>

              <div className="mt-12 flex flex-wrap gap-4">
                <a
                  href="#project-study"
                  className="inline-flex items-center gap-3 px-7 py-4 rounded-lg bg-[var(--color-brand-navy)] text-white font-semibold hover:opacity-90 transition-opacity"
                >
                  {content.ctaButton}
                  <ArrowRight
                    className={`w-5 h-5 ${isArabic ? 'rotate-180' : ''}`}
                  />
                </a>

                <a
                  href="#services"
                  className="inline-flex items-center gap-3 px-7 py-4 rounded-lg border border-[var(--color-brand-navy)]/20 bg-white/60 font-semibold hover:bg-white transition-colors"
                >
                  {isArabic ? 'استكشف خدماتنا' : 'Explore Our Services'}
                  <ArrowDown className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          ENGINEERING LIFECYCLE
      ========================================================= */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <p className="text-sm font-bold tracking-[0.18em] text-[var(--color-brand-blue)] mb-4">
              {isArabic ? 'PROJECT LIFECYCLE' : 'PROJECT LIFECYCLE'}
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {content.lifecycleTitle}
            </h2>

            <p className="text-lg leading-relaxed text-[var(--color-brand-dark-gray)]">
              {content.lifecycleSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <div key={service.number} className="relative group">
                  <div className="h-full p-5 rounded-2xl border border-[var(--color-brand-gray)] bg-[var(--color-brand-light)] group-hover:bg-white group-hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-between mb-7">
                      <span className="text-sm font-bold text-[var(--color-brand-blue)]">
                        {service.number}
                      </span>

                      <Icon className="w-5 h-5 text-[var(--color-brand-blue)]" />
                    </div>

                    <h3 className="font-bold leading-snug mb-2">
                      {service.shortTitle}
                    </h3>

                    <p className="text-xs text-[var(--color-brand-dark-gray)] leading-relaxed">
                      {service.title}
                    </p>
                  </div>

                  {index < services.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 z-10">
                      <ArrowRight
                        className={`w-5 h-5 text-[var(--color-brand-gray)] ${
                          isArabic ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          SERVICES
      ========================================================= */}
      <section
        id="services"
        className="py-24 bg-[var(--color-brand-light)]"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <p className="text-sm font-bold tracking-[0.18em] text-[var(--color-brand-blue)] mb-4">
              {isArabic ? 'ENGINEERING SUPPORT' : 'ENGINEERING SUPPORT'}
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {content.serviceTitle}
            </h2>

            <p className="text-lg text-[var(--color-brand-dark-gray)] leading-relaxed">
              {content.serviceSubtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.number}
                  className="group bg-white border border-[var(--color-brand-gray)] rounded-2xl p-8 md:p-10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-2xl bg-[var(--color-brand-light)] border border-[var(--color-brand-gray)] flex items-center justify-center group-hover:bg-[var(--color-brand-blue)] group-hover:text-white transition-colors duration-300">
                        <Icon className="w-7 h-7" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-sm font-bold text-[var(--color-brand-blue)]">
                          {service.number}
                        </span>

                        <span className="h-px w-8 bg-[var(--color-brand-gray)]" />
                      </div>

                      <h3 className="text-2xl font-bold mb-4">
                        {service.title}
                      </h3>

                      <p className="text-[var(--color-brand-dark-gray)] leading-7 mb-7">
                        {service.desc}
                      </p>

                      <div className="pt-5 border-t border-[var(--color-brand-gray)]">
                        <div className="flex gap-3">
                          <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-[var(--color-brand-blue)] mt-0.5" />

                          <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-blue)] mb-1">
                              {content.resultLabel}
                            </p>

                            <p className="text-sm leading-relaxed text-[var(--color-brand-dark-gray)]">
                              {service.result}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          WHAT THIS MEANS FOR THE CLIENT
      ========================================================= */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: ClipboardCheck,
                  title: isArabic
                    ? 'دراسة قبل القرار'
                    : 'Study before selection',
                  text: isArabic
                    ? 'نفهم ظروف المشروع أولًا حتى يكون اختيار النظام مبنيًا على احتياج حقيقي.'
                    : 'We understand the application first, so system selection is based on actual project requirements.',
                },
                {
                  icon: Cog,
                  title: isArabic
                    ? 'هندسة متكاملة'
                    : 'Integrated engineering',
                  text: isArabic
                    ? 'نربط بين اختيار المعدات والتكامل والتركيب والتشغيل بدل التعامل مع كل مرحلة بشكل منفصل.'
                    : 'We connect equipment selection, integration, installation and commissioning as one engineering process.',
                },
                {
                  icon: Headphones,
                  title: isArabic
                    ? 'دعم مستمر'
                    : 'Ongoing support',
                  text: isArabic
                    ? 'الدعم لا يتوقف عند التركيب، بل يمتد إلى التشغيل والصيانة واحتياجات قطع الغيار.'
                    : 'Support continues beyond installation through operation, maintenance and spare-parts follow-up.',
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="p-8 rounded-2xl border border-[var(--color-brand-gray)]"
                  >
                    <Icon className="w-8 h-8 text-[var(--color-brand-blue)] mb-6" />

                    <h3 className="text-xl font-bold mb-4">
                      {item.title}
                    </h3>

                    <p className="text-[var(--color-brand-dark-gray)] leading-7">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PROJECT STUDY CTA
      ========================================================= */}
      <section
        id="project-study"
        className="pb-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="container mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-[var(--color-brand-navy)] text-white p-10 md:p-16 lg:p-20">
            <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-white/5" />
            <div className="absolute -left-20 -bottom-32 w-96 h-96 rounded-full bg-[var(--color-brand-blue)]/20" />

            <div className="relative max-w-4xl">
              <p className="text-sm font-bold tracking-[0.18em] text-white/60 mb-5">
                {content.ctaEyebrow}
              </p>

              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {content.ctaTitle}
              </h2>

              <p className="text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl mb-8">
                {content.ctaText}
              </p>

              <div className="flex flex-wrap items-center gap-5">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-3 px-7 py-4 rounded-lg bg-white text-[var(--color-brand-navy)] font-bold hover:opacity-90 transition-opacity"
                >
                  {content.ctaButton}

                  <ArrowRight
                    className={`w-5 h-5 ${
                      isArabic ? 'rotate-180' : ''
                    }`}
                  />
                </a>

                <span className="text-sm text-white/55">
                  {content.contactNote}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}