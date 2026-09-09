import Link from 'next/link';
import Image from 'next/image';
import {
  Zap,
  ThermometerSnowflake,
  HardHat,
  Cpu,
  Wrench,
  Factory,
  ArrowRight
} from 'lucide-react';

const solutionsDataEn = [
  {
    title: 'Efficient Heat-Pump Technology',
    desc: 'Significantly reduces energy consumption and operational costs by transferring heat rather than generating it. Our technology is engineered to maximize COP (Coefficient of Performance) across diverse environmental conditions.',
    icon: Zap
  },
  {
    title: 'Heating & Cooling Solutions',
    desc: 'Dual-action performance for year-round comfort. Our systems provide reliable heating in winter and efficient cooling in summer, all managed through a single integrated thermal system.',
    icon: ThermometerSnowflake
  },
  {
    title: 'Engineering Support & Sizing',
    desc: 'Custom system design and sizing tailored to your precise thermal load requirements. We analyze your application to recommend the exact capacity and hydraulic configuration needed.',
    icon: HardHat
  },
  {
    title: 'Smart Control & Automation',
    desc: 'Advanced automation and remote access capabilities. Intelligent controllers optimize compressor operation, manage multiple units, and integrate seamlessly with existing building management systems (BMS).',
    icon: Cpu
  },
  {
    title: 'Comprehensive After-Sales Support',
    desc: 'Reliable maintenance and servicing by certified technicians. We ensure long-term system efficiency through scheduled maintenance and responsive technical support.',
    icon: Wrench
  },
  {
    title: 'Scalable Capacities',
    desc: 'From private residences requiring single units to massive industrial facilities requiring multi-unit cascades. Our solutions scale dynamically to meet any thermal demand.',
    icon: Factory
  }
];

const solutionsDataAr = [
  {
    title: 'تكنولوجيا مضخات حرارية عالية الكفاءة',
    desc: 'تقلل بشكل كبير من استهلاك الطاقة وتكاليف التشغيل عن طريق نقل الحرارة بدلاً من توليدها. تم تصميم تكنولوجيتنا لزيادة معامل الأداء (COP) عبر ظروف بيئية متنوعة.',
    icon: Zap
  },
  {
    title: 'حلول للتدفئة والتبريد',
    desc: 'أداء مزدوج لراحة على مدار العام. توفر أنظمتنا تدفئة موثوقة في الشتاء وتبريداً فعالاً في الصيف، يتم إدارتها جميعاً من خلال نظام حراري متكامل.',
    icon: ThermometerSnowflake
  },
  {
    title: 'دعم هندسي وتحديد السعة',
    desc: 'تصميم وحسابات مخصصة للأنظمة لتتناسب تماماً مع متطلبات الأحمال الحرارية الخاصة بك. نقوم بتحليل تطبيقك لتقديم السعة الدقيقة والتكوين الهيدروليكي المطلوب.',
    icon: HardHat
  },
  {
    title: 'خيارات تحكم ذكية وأتمتة',
    desc: 'قدرات أتمتة متقدمة وتحكم عن بعد. تعمل وحدات التحكم الذكية على تحسين عمل الضاغط، وإدارة وحدات متعددة، والتكامل بسلاسة مع أنظمة إدارة المباني (BMS).',
    icon: Cpu
  },
  {
    title: 'دعم شامل لما بعد البيع',
    desc: 'صيانة وخدمة موثوقة من قبل فنيين معتمدين. نحن نضمن كفاءة النظام على المدى الطويل من خلال الصيانة المجدولة والدعم الفني السريع.',
    icon: Wrench
  },
  {
    title: 'قدرات واسعة النطاق وقابلة للتطوير',
    desc: 'من المساكن الخاصة التي تتطلب وحدات فردية إلى المرافق الصناعية الضخمة التي تتطلب أنظمة متعددة الوحدات. تتوسع حلولنا ديناميكياً لتلبية أي طلب حراري.',
    icon: Factory
  }
];

const applicationsDataEn = [
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

const applicationsDataAr = [
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

export default async function EngineeringSolutionsPage(props: { params: Promise<{ lang: 'en' | 'ar' }> }) {
  const params = await props.params;
  const lang = params.lang;
  const isEn = lang === 'en';
  
  const solutions = isEn ? solutionsDataEn : solutionsDataAr;
  const applications = isEn ? applicationsDataEn : applicationsDataAr;

  return (
    <div className="bg-[#0B192C] min-h-screen">
      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-96 h-96 border-[1px] border-[var(--color-brand-blue)] rounded-full border-dashed animate-[spin_120s_linear_infinite]" />
          <div className="absolute top-20 left-20 w-72 h-72 border-[1px] border-[var(--color-brand-gold)] rounded-full animate-[spin_90s_linear_infinite_reverse]" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {isEn ? 'Engineering Solutions' : 'الحلول الهندسية'}
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed mb-10">
              {isEn 
                ? 'We do not simply supply equipment. We engineer the right thermal solution for your application through advanced heat-pump technology, precise system sizing, and intelligent control integration.'
                : 'نحن لا نقوم بتوريد المعدات فحسب. بل نصمم الحل الحراري المناسب لتطبيقك من خلال تكنولوجيا المضخات الحرارية المتقدمة، وتحديد حجم النظام بدقة، وتكامل التحكم الذكي.'}
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((sol, idx) => {
              const Icon = sol.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-[var(--color-brand-blue)]/50 transition-all duration-300 group flex flex-col backdrop-blur-sm"
                >
                  <div className="w-16 h-16 bg-[var(--color-brand-blue)]/10 border border-[var(--color-brand-blue)]/20 rounded-xl flex items-center justify-center mb-8 group-hover:bg-[var(--color-brand-blue)] group-hover:text-white transition-colors duration-300">
                    <Icon className="w-8 h-8 text-[var(--color-brand-blue)] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 leading-snug">{sol.title}</h3>
                  <p className="text-slate-300 leading-relaxed flex-grow mb-8">
                    {sol.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Restored Target Applications Section - Alternating Layout with All 5 Blocks */}
      <section className="py-24 bg-white/5 border-t border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-[var(--color-brand-blue)] font-bold tracking-wider uppercase text-sm mb-3">
              {isEn ? 'Target Applications' : 'التطبيقات المستهدفة'}
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              {isEn ? 'Where We Apply Our Solutions' : 'أين نطبق حلولنا'}
            </h3>
          </div>

          <div className="space-y-24">
            {applications.map((app, idx) => {
              const isReversed = idx % 2 !== 0;
              return (
                <div key={idx} className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}>
                  <div className="w-full lg:w-1/2 relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                    <Image
                      src={app.img}
                      alt={app.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="w-full lg:w-1/2">
                    <h4 className="text-3xl font-bold text-white mb-6">
                      {app.title}
                    </h4>
                    <p className="text-lg text-slate-300 leading-relaxed mb-6">
                      {app.desc}
                    </p>
                    <Link href={`/${lang}/projects`} className="inline-flex items-center text-[var(--color-brand-blue)] font-bold hover:text-white transition-colors">
                      {isEn ? 'View Projects' : 'عرض المشاريع'} <ArrowRight className={`w-5 h-5 ${isEn ? 'ml-2' : 'mr-2 rtl:rotate-180'}`} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA to Process */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-[#0B192C] to-white/5 border border-white/10 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-brand-gold)]/10 rounded-full blur-[80px]" />
            <h3 className="text-3xl font-bold text-white mb-6 relative z-10">{isEn ? 'Understand Our Workflow' : 'افهم سير عملنا'}</h3>
            <p className="text-lg text-slate-300 mb-10 relative z-10">
              {isEn ? 'Discover how we take a project from early thermal assessment through to installation and after-sales support.' : 'اكتشف كيف نأخذ المشروع من التقييم الحراري المبكر إلى التركيب ودعم ما بعد البيع.'}
            </p>
            <Link href={`/${lang}/services`} className="inline-flex items-center justify-center px-8 py-4 bg-[var(--color-brand-gold)] text-[#0B192C] font-bold rounded-xl hover:bg-yellow-400 transition-colors relative z-10">
              {isEn ? 'View Engineering Process' : 'عرض العملية الهندسية'} <ArrowRight className={`w-5 h-5 ${isEn ? 'ml-2' : 'mr-2 rtl:rotate-180'}`} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
