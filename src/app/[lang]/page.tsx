import { getDictionary } from '@/dictionaries';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home(props: { params: Promise<{ lang: 'en' | 'ar' }> }) {
  const params = await props.params;
  const lang = params.lang;
  const dict = await getDictionary(lang);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-[var(--color-brand-navy)] overflow-hidden">
        {/* Background Image Setup */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Homepage/homepage-commercial-pool.webp"
            alt="IRIS Energy Commercial Pool Installation"
            fill
            className="object-cover opacity-40 mix-blend-overlay"
            priority
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <div className="max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-[var(--color-brand-blue)]/20 text-[var(--color-brand-blue)] border border-[var(--color-brand-blue)]/30 text-sm font-semibold tracking-wider mb-6 bg-white/10 backdrop-blur-sm text-white">
              {dict.hero.eyebrow}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {dict.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl">
              {dict.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${lang}/request-study`}
                className="inline-flex justify-center items-center px-8 py-4 border border-transparent text-base font-semibold rounded-md text-[var(--color-brand-navy)] bg-[var(--color-brand-gold)] hover:bg-yellow-400 transition-colors"
              >
                {dict.hero.primaryCta}
              </Link>
              <Link
                href={`/${lang}/solutions`}
                className="inline-flex justify-center items-center px-8 py-4 border border-white text-base font-semibold rounded-md text-white bg-transparent hover:bg-white/10 transition-colors"
              >
                {dict.hero.secondaryCta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[var(--color-brand-navy)] mb-6">
                {lang === 'en' ? 'Engineered for Efficiency' : 'مصممة للكفاءة'}
              </h2>
              <p className="text-lg text-[var(--color-brand-dark-gray)] mb-6 leading-relaxed">
                {lang === 'en' 
                  ? "IRIS Energy specializes in air-to-water heat-pump technology for projects that require dependable heating, cooling and efficient energy use. From private pools to hotels, schools, clubs and industrial applications, each system is selected around the project's operating conditions and performance requirements."
                  : "تتخصص إيريس إنرجي في تكنولوجيا المضخات الحرارية (هواء-ماء) للمشاريع التي تتطلب تدفئة وتبريد موثوقين واستخدام فعال للطاقة. من المسابح الخاصة إلى الفنادق والمدارس والنوادي والتطبيقات الصناعية، يتم اختيار كل نظام بناءً على ظروف التشغيل ومتطلبات الأداء الخاصة بالمشروع."}
              </p>
            </div>
            <div className="img-container-standard rounded-2xl shadow-2xl">
              <Image
                src="/images/Homepage/homepage-residential-pool-heat-pump.webp"
                alt="IRIS Energy Residential Pool Heat Pump"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Applications / Solutions Preview */}
      <section className="py-24 bg-[var(--color-brand-light)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-[var(--color-brand-navy)] mb-6">
              {lang === 'en' ? 'Applications' : 'التطبيقات'}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* We will just hardcode the applications from the markdown here for speed, and to ensure accuracy */}
            {[
              {
                title: lang === 'en' ? 'Swimming Pools & Spas' : 'حمامات السباحة والمنتجعات',
                desc: lang === 'en' ? 'Efficient year-round temperature control for private and shared pools.' : 'تحكم فعال في درجة الحرارة على مدار العام للمسابح الخاصة والمشتركة.'
              },
              {
                title: lang === 'en' ? 'Commercial Facilities' : 'المرافق التجارية',
                desc: lang === 'en' ? 'Scalable systems for hotels, resorts, clubs and schools.' : 'أنظمة قابلة للتطوير للفنادق والمنتجعات والنوادي والمدارس.'
              },
              {
                title: lang === 'en' ? 'Industrial Basins' : 'الأحواض الصناعية',
                desc: lang === 'en' ? 'Engineered heating and cooling for large-volume water applications.' : 'هندسة التدفئة والتبريد لتطبيقات المياه ذات الأحجام الكبيرة.'
              },
              {
                title: lang === 'en' ? 'Domestic Hot Water' : 'المياه الساخنة المنزلية',
                desc: lang === 'en' ? 'Air-to-water technology for reliable hot-water generation.' : 'تكنولوجيا هواء-ماء لتوليد مياه ساخنة موثوقة.'
              },
              {
                title: lang === 'en' ? 'Buildings' : 'المباني',
                desc: lang === 'en' ? 'Heating and cooling solutions tailored to residential applications.' : 'حلول تدفئة وتبريد مصممة خصيصًا للتطبيقات السكنية.'
              },
              {
                title: lang === 'en' ? 'Pool Covers' : 'أغطية المسابح',
                desc: lang === 'en' ? 'Thermal covers and roller systems that support heat retention and cleanliness.' : 'أغطية حرارية وأنظمة بكرات تدعم الاحتفاظ بالحرارة والنظافة.'
              }
            ].map((app, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-[var(--color-brand-gray)]">
                <h3 className="text-xl font-bold text-[var(--color-brand-navy)] mb-4">{app.title}</h3>
                <p className="text-[var(--color-brand-dark-gray)]">{app.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why IRIS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-[var(--color-brand-navy)] mb-6">
              {lang === 'en' ? 'Why IRIS' : 'لماذا إيريس'}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              lang === 'en' ? 'Efficient heat-pump technology' : 'تكنولوجيا مضخات حرارية عالية الكفاءة',
              lang === 'en' ? 'Heating and cooling capability' : 'قدرات للتدفئة والتبريد',
              lang === 'en' ? 'Project-specific engineering support' : 'دعم هندسي مخصص لكل مشروع',
              lang === 'en' ? 'Smart control options' : 'خيارات تحكم ذكية',
              lang === 'en' ? 'Installation and after-sales support' : 'دعم التركيب وما بعد البيع',
              lang === 'en' ? 'Residential through industrial capacities' : 'قدرات تبدأ من الاستخدام السكني إلى الصناعي'
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-[var(--color-brand-light)] p-6 rounded-lg">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[var(--color-brand-blue)]" />
                <span className="text-lg font-medium text-[var(--color-brand-navy)]">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Proof */}
      <section className="py-24 bg-[var(--color-brand-navy)] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">
            {lang === 'en' ? 'Proven Project Experience' : 'خبرة مشاريع مثبتة'}
          </h2>
          <p className="text-lg text-[var(--color-brand-gray)] mb-10 leading-relaxed">
            {lang === 'en' 
              ? 'IRIS Energy systems support residential and commercial projects across Egypt, including villas, hotels, resorts, schools and sporting facilities.'
              : 'تدعم أنظمة إيريس إنرجي المشاريع السكنية والتجارية في جميع أنحاء مصر، بما في ذلك الفيلات والفنادق والمنتجعات والمدارس والمرافق الرياضية.'}
          </p>
          <Link
            href={`/${lang}/projects`}
            className="inline-flex justify-center items-center px-8 py-4 border border-[var(--color-brand-blue)] text-base font-semibold rounded-md text-white bg-[var(--color-brand-blue)] hover:bg-blue-700 transition-colors"
          >
            {lang === 'en' ? 'View Our Projects' : 'شاهد مشاريعنا'}
          </Link>
        </div>
      </section>
    </div>
  );
}
