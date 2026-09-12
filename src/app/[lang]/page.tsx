import { getDictionary } from '@/dictionaries';
import Image from 'next/image';
import Link from 'next/link';
import HeroCTA from '@/components/HeroCTA';
import {
  Droplets,
  Building2,
  Factory,
  Home as HomeIcon,
  Waves,
  Shield,
  Zap,
  ThermometerSnowflake,
  HardHat,
  Cpu,
  Wrench,
  ArrowRight,
  Globe2,
  CalendarDays,
  Activity,
  FileText
} from 'lucide-react';

export default async function Home(props: { params: Promise<{ lang: 'en' | 'ar' }> }) {
  const params = await props.params;
  const lang = params.lang;
  const dict = await getDictionary(lang);
  const isEn = lang === 'en';

  // Verified Applications Data
  const applications = [
    { title: isEn ? 'Swimming Pools & Spas' : 'حمامات السباحة والمنتجعات', desc: isEn ? 'Efficient year-round temperature control for private and shared pools.' : 'تحكم فعال في درجة الحرارة على مدار العام للمسابح الخاصة والمشتركة.', icon: Waves },
    { title: isEn ? 'Commercial Facilities' : 'المرافق التجارية', desc: isEn ? 'Scalable systems for hotels, resorts, clubs and schools.' : 'أنظمة قابلة للتطوير للفنادق والمنتجعات والنوادي والمدارس.', icon: Building2 },
    { title: isEn ? 'Industrial Basins' : 'الأحواض الصناعية', desc: isEn ? 'Engineered heating and cooling for large-volume water applications.' : 'هندسة التدفئة والتبريد لتطبيقات المياه ذات الأحجام الكبيرة.', icon: Factory },
    { title: isEn ? 'Domestic Hot Water' : 'المياه الساخنة المنزلية', desc: isEn ? 'Air-to-water technology for reliable hot-water generation.' : 'تكنولوجيا هواء-ماء لتوليد مياه ساخنة موثوقة.', icon: Droplets },
    { title: isEn ? 'Buildings' : 'المباني', desc: isEn ? 'Heating and cooling solutions tailored to residential applications.' : 'حلول تدفئة وتبريد مصممة خصيصًا للتطبيقات السكنية.', icon: HomeIcon },
    { title: isEn ? 'Pool Covers' : 'أغطية المسابح', desc: isEn ? 'Thermal covers and roller systems that support heat retention and cleanliness.' : 'أغطية حرارية وأنظمة بكرات تدعم الاحتفاظ بالحرارة والنظافة.', icon: Shield }
  ];

  // Verified Solutions Data
  const engineeringSolutions = [
    { title: isEn ? 'Efficient heat-pump technology' : 'تكنولوجيا مضخات حرارية', desc: isEn ? 'Significantly reduces energy consumption and operational costs.' : 'تقلل استهلاك الطاقة وتكاليف التشغيل.', icon: Zap },
    { title: isEn ? 'Heating & Cooling' : 'التدفئة والتبريد', desc: isEn ? 'Dual-action performance for year-round comfort.' : 'أداء مزدوج لراحة على مدار العام.', icon: ThermometerSnowflake },
    { title: isEn ? 'Engineering Support' : 'دعم هندسي مخصص', desc: isEn ? 'Custom system design and sizing tailored to your needs.' : 'تصميم وحسابات مخصصة للأنظمة.', icon: HardHat },
    { title: isEn ? 'Smart Control' : 'تحكم ذكي', desc: isEn ? 'Advanced automation and remote access capabilities.' : 'أتمتة متقدمة وتحكم عن بعد.', icon: Cpu },
    { title: isEn ? 'Comprehensive After-Sales' : 'دعم ما بعد البيع', desc: isEn ? 'Reliable maintenance and servicing by certified technicians.' : 'صيانة وخدمة موثوقة.', icon: Wrench },
    { title: isEn ? 'Scalable Capacities' : 'قدرات قابلة للتطوير', desc: isEn ? 'From private residences to massive industrial facilities.' : 'من المساكن إلى المرافق الصناعية.', icon: Factory }
  ];

  // Verified Projects Data
  const projects = [
    { src: '/images/Projects/project-louvered-enclosure-front.webp', title: isEn ? 'Private Villa' : 'فيلا خاصة', location: isEn ? 'Cairo' : 'القاهرة' },
    { src: '/images/Projects/project-multi-unit-heat-pump-system.webp', title: isEn ? 'Sporting Club' : 'نادي رياضي', location: isEn ? 'Alexandria' : 'الإسكندرية' },
    { src: '/images/Projects/project-protected-equipment-bank.webp', title: isEn ? 'Commercial Resort' : 'منتجع تجاري', location: isEn ? 'Red Sea' : 'البحر الأحمر' },
    { src: '/images/Projects/project-louvered-enclosure-side-b.webp', title: isEn ? 'Hotel Facility' : 'منشأة فندقية', location: isEn ? 'Giza' : 'الجيزة' },
    { src: '/images/Projects/project-protected-outdoor-installation.webp', title: isEn ? 'Industrial Complex' : 'مجمع صناعي', location: isEn ? '10th of Ramadan' : 'العاشر من رمضان' },
    { src: '/images/Projects/project-louvered-enclosure-side-a.webp', title: isEn ? 'Residential Compound' : 'مجمع سكني', location: isEn ? 'New Cairo' : 'القاهرة الجديدة' }
  ];

  // Verified Engineering Process (from /services)
  const engineeringProcess = [
    { num: '1', title: isEn ? 'Early Stage Consultation' : 'الاستشارة المبدئية', desc: isEn ? 'Understanding project requirements from the beginning.' : 'فهم متطلبات المشروع من البداية.' },
    { num: '2', title: isEn ? 'System Selection' : 'اختيار النظام', desc: isEn ? 'Identifying the optimal components and configuration.' : 'تحديد المكونات والتكوين الأمثل.' },
    { num: '3', title: isEn ? 'Technical Studies' : 'الدراسات الفنية', desc: isEn ? 'Balancing performance, budget, and energy efficiency.' : 'موازنة الأداء والميزانية وكفاءة الطاقة.' },
    { num: '4', title: isEn ? 'Installation & Support' : 'التركيب والدعم', desc: isEn ? 'Comprehensive setup and ongoing maintenance services.' : 'إعداد شامل وخدمات صيانة مستمرة.' }
  ];

  // Verified Products Data
  const productCategories = [
    { title: isEn ? 'Residential Series' : 'سلسلة سكني', capacity: '10-65 kW', tech: 'Full Inverter' },
    { title: isEn ? 'Commercial Series' : 'سلسلة تجاري', capacity: '75-150 kW', tech: 'Full Inverter' },
    { title: isEn ? 'Industrial Series' : 'سلسلة صناعي', capacity: '160-475 kW', tech: 'Full Inverter' }
  ];

  return (
    <div className="bg-[#0B192C]">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center border-b border-white overflow-hidden">
        {/* Background Engineering Schematic Graphics */}
        <div className="absolute inset-0 z-0 bg-[#0B192C]">
          <Image
            src="/images/Homepage/figma-hero-bg.png"
            alt="IRIS Energy Commercial Pool Installation"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(11,25,44,0.75)] to-[rgba(11,25,44,0.85)]" />
          
          <div className="absolute top-1/4 right-10 w-[800px] h-[800px] border-[1px] border-[var(--color-brand-blue)]/20 rounded-full border-dashed animate-[spin_120s_linear_infinite]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-4xl">
            <span className="inline-flex items-center py-1 px-4 rounded-full bg-[var(--color-brand-blue)]/10 border border-[var(--color-brand-blue)]/30 text-xs font-bold tracking-widest mb-6 text-blue-300 uppercase">
              {dict.hero.eyebrow}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              {isEn ? 'Engineering High-Efficiency Thermal & Heat-Pump Solutions.' : 'تصميم حلول حرارية ومضخات حرارية عالية الكفاءة.'}
            </h1>
            <p className="text-lg md:text-2xl text-slate-300 mb-10 max-w-2xl font-light leading-relaxed">
              {isEn ? 'From thermal assessment and system sizing to supply, integration, commissioning, and long-term efficiency support.' : 'من التقييم الحراري وتحديد حجم النظام إلى التوريد والتكامل والتشغيل ودعم الكفاءة على المدى الطويل.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <HeroCTA primaryCtaText={dict.hero.primaryCta} lang={lang} />
              <Link
                href={`/${lang}/request-study`}
                className="inline-flex justify-center items-center px-8 py-4 border border-slate-200 text-base font-bold rounded-md text-white bg-[#f59e0b] hover:opacity-90 transition-all"
              >
                {isEn ? 'Request a Technical Study' : 'طلب دراسة فنية'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VERIFIED TRUST METRICS */}
      <section className="border-b border-white bg-[#122238]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 divide-x divide-white/10 rtl:divide-x-reverse">
            <div className="text-center px-4">
              <CalendarDays className="w-6 h-6 text-[var(--color-brand-gold)] mx-auto mb-3" />
              <h4 className="text-2xl font-bold text-white">2011</h4>
              <p className="text-sm text-slate-400 mt-1">{isEn ? 'Established in France' : 'تأسست في فرنسا'}</p>
            </div>
            <div className="text-center px-4">
              <Building2 className="w-6 h-6 text-[var(--color-brand-gold)] mx-auto mb-3" />
              <h4 className="text-2xl font-bold text-white">2020</h4>
              <p className="text-sm text-slate-400 mt-1">{isEn ? 'Operating in Egypt' : 'تعمل في مصر'}</p>
            </div>
            <div className="text-center px-4">
              <Globe2 className="w-6 h-6 text-[var(--color-brand-gold)] mx-auto mb-3" />
              <h4 className="text-2xl font-bold text-white">3</h4>
              <p className="text-sm text-slate-400 mt-1">{isEn ? 'Continents Served' : 'قارات نخدمها'}</p>
            </div>
            <div className="text-center px-4">
              <Zap className="w-6 h-6 text-[var(--color-brand-gold)] mx-auto mb-3" />
              <h4 className="text-2xl font-bold text-white">A+++</h4>
              <p className="text-sm text-slate-400 mt-1">{isEn ? 'Efficiency Class' : 'فئة الكفاءة'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SOLUTIONS (What IRIS Provides) */}
      <section className="py-32 relative border-b border-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-[var(--color-brand-gold)] font-bold tracking-wider uppercase text-sm mb-3">
                {isEn ? 'Our Engineering Solutions' : 'حلولنا الهندسية'}
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                {isEn ? 'What We Provide' : 'ماذا نقدم'}
              </h3>
            </div>
            <Link href={`/${lang}/solutions`} className="inline-flex items-center text-[var(--color-brand-blue)] font-bold hover:text-blue-400 whitespace-nowrap">
              {isEn ? 'Explore All Solutions' : 'استكشف جميع الحلول'} <ArrowRight className={`w-5 h-5 ${isEn ? 'ml-2' : 'mr-2 rtl:rotate-180'}`} />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {engineeringSolutions.map((sol, idx) => {
              const Icon = sol.icon;
              return (
                <div key={idx} className="bg-[#122238] border border-white p-8 rounded-2xl hover:border-[var(--color-brand-blue)]/50 transition-colors">
                  <Icon className="w-8 h-8 text-[var(--color-brand-blue)] mb-6" />
                  <h4 className="text-xl font-bold text-white mb-3">{sol.title}</h4>
                  <p className="text-slate-300 leading-relaxed">{sol.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. APPLICATIONS (Where IRIS is Used) - Vertical List Layout */}
      <section className="py-32 relative border-b border-white bg-[#122238]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <h2 className="text-[#8ec5ff] font-bold text-xs uppercase tracking-widest">
                  {isEn ? 'Target Applications' : 'التطبيقات المستهدفة'}
                </h2>
                <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                  {isEn ? 'Where Our Systems Operate' : 'أين تعمل أنظمتنا'}
                </h3>
                <p className="text-slate-300 leading-relaxed mb-8">
                  {isEn 
                    ? 'Engineered for diverse operating environments, from private residences to massive industrial facilities.' 
                    : 'مصممة لبيئات التشغيل المتنوعة، من المساكن الخاصة إلى المرافق الصناعية الضخمة.'}
                </p>
                <Link href={`/${lang}/solutions`} className="inline-flex items-center justify-center px-8 py-4 border border-[var(--color-brand-blue)] rounded-xl text-[var(--color-brand-blue)] font-bold hover:bg-[var(--color-brand-blue)] hover:text-white transition-all w-full md:w-auto">
                  {isEn ? 'Explore All Applications' : 'استكشف جميع التطبيقات'}
                </Link>
              </div>
            </div>
            
            <div className="lg:col-span-2 space-y-4">
              {applications.map((app, idx) => {
                const Icon = app.icon;
                return (
                  <Link href={`/${lang}/solutions`} key={idx} className="group block bg-[#0B192C] p-6 md:p-8 rounded-2xl border border-white hover:border-[var(--color-brand-blue)]/50 transition-all">
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      <div className="w-16 h-16 bg-[#122238] rounded-xl flex items-center justify-center shrink-0 border border-white/5 group-hover:bg-[var(--color-brand-blue)]/10 group-hover:border-[var(--color-brand-blue)]/30 transition-colors">
                        <Icon className="w-8 h-8 text-white opacity-70 group-hover:opacity-100 group-hover:text-[var(--color-brand-blue)] transition-colors" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-xl font-bold text-white mb-2">{app.title}</h4>
                        <p className="text-slate-400 leading-relaxed">{app.desc}</p>
                      </div>
                      <div className="hidden md:flex shrink-0 w-12 h-12 rounded-full bg-[#122238] items-center justify-center group-hover:bg-[var(--color-brand-blue)] transition-colors">
                        <ArrowRight className={`w-5 h-5 text-white ${isEn ? '' : 'rtl:rotate-180'}`} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. ENGINEERING PROCESS (How IRIS Executes) - Horizontal Flow */}
      <section className="py-32 relative border-b border-white overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-[linear-gradient(to_left,rgba(245,158,11,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(245,158,11,0.03)_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none [mask-image:linear-gradient(to_left,#000_10%,transparent_100%)]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-[var(--color-brand-gold)] font-bold tracking-wider uppercase text-sm mb-3">
              {isEn ? 'Engineering Process' : 'العملية الهندسية'}
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {isEn ? 'How We Execute Projects' : 'كيف ننفذ المشاريع'}
            </h3>
          </div>
          
          <div className="flex flex-col gap-6 max-w-3xl mx-auto mb-16 relative">
            {engineeringProcess.map((step, idx) => {
              return (
                <div key={idx} className="flex flex-row items-center gap-6 bg-[#0B192C] p-6 rounded-xl border border-white group hover:border-[var(--color-brand-gold)] transition-colors">
                  <div className="flex items-center justify-center px-6 py-3 rounded-md bg-[#f59e0b]">
                    <span className="text-3xl font-bold text-[#0f172a]">{step.num}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="text-xl font-bold text-white">{step.title}</h4>
                    <p className="text-slate-400">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="text-center">
            <Link href={`/${lang}/services`} className="inline-flex items-center text-[var(--color-brand-gold)] font-bold hover:text-yellow-400 text-lg">
              {isEn ? 'View Complete 7-Step Lifecycle' : 'عرض دورة الحياة الكاملة'} <ArrowRight className={`w-5 h-5 ${isEn ? 'ml-2' : 'mr-2 rtl:rotate-180'}`} />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. PRODUCTS (What IRIS Offers) - Stacked Horizontal Rows */}
      <section className="py-32 relative border-b border-white bg-[#122238]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[var(--color-brand-blue)] font-bold tracking-wider uppercase text-sm mb-3">
              {isEn ? 'Heat-Pump Technology' : 'تكنولوجيا المضخات الحرارية'}
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              {isEn ? 'Our Products' : 'منتجاتنا'}
            </h3>
          </div>
          
          <div className="max-w-5xl mx-auto space-y-4">
            {productCategories.map((prod, idx) => (
              <Link href={`/${lang}/products`} key={idx} className="flex flex-col md:flex-row md:items-center justify-between bg-[#0B192C] border border-white rounded-2xl p-6 md:p-8 hover:border-[var(--color-brand-blue)]/50 transition-all group">
                <div className="flex items-center gap-6 mb-4 md:mb-0">
                  <div className="w-16 h-16 bg-[#122238] rounded-xl flex items-center justify-center shrink-0 border border-white/5">
                    <ThermometerSnowflake className="w-8 h-8 text-white opacity-70 group-hover:opacity-100 group-hover:text-[var(--color-brand-blue)] transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-2">{prod.title}</h4>
                    <span className="inline-block px-3 py-1 bg-[#122238] border border-white rounded-full text-xs font-medium text-slate-300">
                      {prod.tech}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between md:justify-end gap-8 border-t border-white md:border-none pt-4 md:pt-0">
                  <div className="text-right rtl:text-left">
                    <div className="text-sm text-slate-400 mb-1">{isEn ? 'Capacity' : 'السعة'}</div>
                    <div className="text-[var(--color-brand-blue)] font-mono font-bold text-xl">{prod.capacity}</div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[#122238] flex items-center justify-center group-hover:bg-[var(--color-brand-blue)] transition-colors shrink-0">
                    <ArrowRight className={`w-5 h-5 text-white ${isEn ? '' : 'rtl:rotate-180'}`} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PROJECTS (What IRIS Has Delivered) - Asymmetrical Layout */}
      <section className="relative py-32 bg-transparent text-white overflow-hidden border-b border-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-[var(--color-brand-gold)] font-bold tracking-wider uppercase text-sm mb-3">
                {isEn ? 'Our Portfolio' : 'معرض أعمالنا'}
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                {isEn ? 'Proven Project Experience' : 'خبرة مشاريع مثبتة'}
              </h3>
            </div>
            <Link
              href={`/${lang}/projects`}
              className="inline-flex items-center text-[var(--color-brand-gold)] font-bold hover:text-yellow-400 whitespace-nowrap text-lg"
            >
              {isEn ? 'View All Projects' : 'عرض جميع المشاريع'} <ArrowRight className={`w-5 h-5 ${isEn ? 'ml-2' : 'mr-2 rtl:rotate-180'}`} />
            </Link>
          </div>

          {/* Asymmetrical Grid: 1 large, 2 small stacked */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Large Featured Project */}
            {projects[0] && (
              <Link href={`/${lang}/projects`} className="group relative h-[400px] lg:h-[600px] lg:col-span-2 rounded-3xl overflow-hidden border border-white">
                <Image
                  src={projects[0].src}
                  alt={projects[0].title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-[#0B192C]/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                  <h4 className="text-3xl font-bold text-white mb-2">{projects[0].title}</h4>
                  <p className="text-[var(--color-brand-gold)] font-bold text-lg flex items-center">
                    {projects[0].location}
                  </p>
                </div>
              </Link>
            )}

            {/* Two Smaller Projects Stacked */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 lg:h-[600px]">
              {projects.slice(1, 3).map((project, idx) => (
                <Link href={`/${lang}/projects`} key={idx} className="group relative h-[300px] lg:h-[calc(300px-12px)] rounded-3xl overflow-hidden border border-white">
                  <Image
                    src={project.src}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-[#0B192C]/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h4 className="text-2xl font-bold text-white mb-2">{project.title}</h4>
                    <p className="text-[var(--color-brand-gold)] font-bold flex items-center">
                      {project.location}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="relative py-32 bg-transparent overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--color-brand-blue)]/5 to-transparent border-t border-[var(--color-brand-blue)]/20" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-[#122238] backdrop-blur-md rounded-3xl p-12 md:p-20 text-center shadow-2xl relative overflow-hidden border border-white">
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {isEn ? 'Ready to Optimize Your Energy Use?' : 'هل أنت مستعد لتحسين استخدامك للطاقة؟'}
              </h2>
              <p className="text-xl text-slate-300 mb-10">
                {isEn 
                  ? 'Get a complimentary technical assessment for your project. Our engineers will help you find the most efficient heating and cooling solution.'
                  : 'احصل على تقييم فني مجاني لمشروعك. سيساعدك مهندسونا في العثور على حل التدفئة والتبريد الأكثر كفاءة.'}
              </p>
              <Link
                href={`/${lang}/request-study`}
                className="inline-flex justify-center items-center px-10 py-5 text-lg font-bold rounded-xl text-[var(--color-brand-navy)] bg-[var(--color-brand-gold)] hover:bg-yellow-400 transition-all shadow-xl"
              >
                {isEn ? 'Request Your Technical Study' : 'اطلب دراستك الفنية'}
                <ArrowRight className={`w-5 h-5 ${isEn ? 'ml-3' : 'mr-3 rtl:rotate-180'}`} />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
