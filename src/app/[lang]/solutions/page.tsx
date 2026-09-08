import Image from 'next/image';

const solutionsEn = [
  {
    title: 'Swimming Pools & Spas',
    desc: 'IRIS heat-pump systems provide heating and cooling for private pools, hotel pools, schools, clubs and spa applications. System selection should consider pool volume, target temperature, ambient conditions, operating season and pool-cover use.',
    img: '/images/Homepage/homepage-residential-pool-heat-pump.webp'
  },
  {
    title: 'Commercial Pools & Industrial Basins',
    desc: 'Large-capacity and multi-unit systems can be configured for commercial and industrial water applications. The engineering study determines capacity, hydraulic integration, controls and redundancy requirements.',
    img: '/images/Homepage/homepage-commercial-pool.webp'
  },
  {
    title: 'Domestic Hot Water',
    desc: 'Air-to-water heat-pump technology can support efficient domestic hot-water generation for suitable residential and commercial applications.',
    img: '/images/Technical/technical-control-panel-wiring.webp'
  },
  {
    title: 'Building Heating & Cooling',
    desc: 'IRIS Energy solutions can be applied to residential building heating and cooling where system design, emitters and water temperatures are compatible with heat-pump operation.',
    img: '/images/Projects/project-protected-outdoor-installation.webp'
  },
  {
    title: 'Pool Covers & Rollers',
    desc: 'Thermal pool covers help reduce heat loss, limit contamination and reduce chemical demand. Available covers may be adapted to different pool shapes, colours and landscape requirements, with roller systems for easier handling.',
    img: '/images/Projects/project-louvered-enclosure-front.webp'
  }
];

const solutionsAr = [
  {
    title: 'حمامات السباحة والمنتجعات',
    desc: 'توفر أنظمة إيريس للمضخات الحرارية التدفئة والتبريد للمسابح الخاصة، ومسابح الفنادق، والمدارس، والنوادي، وتطبيقات المنتجعات. يعتمد اختيار النظام على حجم المسبح، والحرارة المستهدفة، والظروف المحيطة، وموسم التشغيل، واستخدام غطاء المسبح.',
    img: '/images/Homepage/homepage-residential-pool-heat-pump.webp'
  },
  {
    title: 'المسابح التجارية والأحواض الصناعية',
    desc: 'يمكن تكوين أنظمة ذات سعة كبيرة ومتعددة الوحدات لتطبيقات المياه التجارية والصناعية. تحدد الدراسة الهندسية السعة، والتكامل الهيدروليكي، والتحكم، ومتطلبات التكرار لضمان الموثوقية.',
    img: '/images/Homepage/homepage-commercial-pool.webp'
  },
  {
    title: 'المياه الساخنة المنزلية',
    desc: 'يمكن لتكنولوجيا المضخات الحرارية هواء-ماء أن تدعم توليد المياه الساخنة المنزلية بكفاءة للتطبيقات السكنية والتجارية المناسبة.',
    img: '/images/Technical/technical-control-panel-wiring.webp'
  },
  {
    title: 'تدفئة وتبريد المباني',
    desc: 'يمكن تطبيق حلول إيريس إنرجي على تدفئة وتبريد المباني السكنية حيث يتوافق تصميم النظام، والمشعات، ودرجات حرارة المياه مع عمل المضخات الحرارية.',
    img: '/images/Projects/project-protected-outdoor-installation.webp'
  },
  {
    title: 'أغطية المسابح والبكرات',
    desc: 'تساعد أغطية المسابح الحرارية على تقليل فقد الحرارة، والحد من التلوث، وتقليل الحاجة للمواد الكيميائية. يمكن تكييف الأغطية مع مختلف أشكال المسابح والألوان ومتطلبات الموقع، مع أنظمة بكرات لسهولة التعامل.',
    img: '/images/Projects/project-louvered-enclosure-front.webp'
  }
];

export default async function Solutions(props: { params: Promise<{ lang: 'en' | 'ar' }> }) {
  const params = await props.params;
  const lang = params.lang;
  const solutions = lang === 'en' ? solutionsEn : solutionsAr;

  return (
    <div className="py-24 bg-[var(--color-brand-light)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-brand-navy)] mb-6">
            {lang === 'en' ? 'Heat Pump Applications' : 'تطبيقات المضخات الحرارية'}
          </h1>
          <p className="text-lg text-[var(--color-brand-dark-gray)]">
            {lang === 'en' 
              ? 'Explore heating and cooling solutions for pools, basins, domestic hot water and buildings.'
              : 'استكشف حلول التدفئة والتبريد للمسابح، والأحواض، والمياه الساخنة المنزلية، والمباني.'}
          </p>
        </div>

        <div className="space-y-24">
          {solutions.map((sol, idx) => (
            <div key={idx} className={`flex flex-col md:flex-row gap-12 items-center ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className="flex-1 w-full img-container-standard rounded-2xl overflow-hidden shadow-lg border border-[var(--color-brand-gray)]">
                <Image
                  src={sol.img}
                  alt={sol.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-[var(--color-brand-navy)] mb-6">{sol.title}</h2>
                <p className="text-lg text-[var(--color-brand-dark-gray)] leading-relaxed">
                  {sol.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
