import { projectsEn, projectsAr } from '@/data/projects';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

export default async function ProjectsHub(props: { params: Promise<{ lang: 'en' | 'ar' }> }) {
  const params = await props.params;
  const lang = params.lang;
  const isEn = lang === 'en';
  
  const projects = isEn ? projectsEn : projectsAr;

  return (
    <div className="bg-[#0B192C] min-h-screen">
      {/* Header Section */}
      <section className="py-24 relative overflow-hidden border-b border-white/10">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[linear-gradient(to_left,rgba(245,158,11,0.03)_1px,transparent_1px)] bg-[size:1rem_1rem] -z-10 [mask-image:linear-gradient(to_left,#000_10%,transparent_100%)] border-r border-[var(--color-brand-gold)]/20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {isEn ? 'Engineering Portfolio' : 'معرض أعمالنا الهندسية'}
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-10">
              {isEn 
                ? 'IRIS Energy heat-pump systems have been deployed across demanding residential and commercial projects. Explore our proven experience across different sectors and operating conditions.'
                : 'تم نشر أنظمة المضخات الحرارية من إيريس إنرجي في العديد من المشاريع السكنية والتجارية التي تتطلب كفاءة عالية. استكشف خبرتنا المثبتة في مختلف القطاعات وظروف التشغيل.'}
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid - Premium Masonry / Featured Layout */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
            
            {projects.map((project, idx) => {
              // Create visual variety by making every 3rd project span full width or 2 columns
              const isLarge = idx === 0 || idx === 3 || idx === 6;
              const spanClass = isLarge 
                ? 'lg:col-span-8 md:col-span-2' 
                : 'lg:col-span-4 md:col-span-1';
              const heightClass = isLarge ? 'h-[500px] lg:h-[600px]' : 'h-[400px] lg:h-[600px]';

              return (
                <Link 
                  href={`/${lang}/projects/${project.slug}`} 
                  key={idx} 
                  className={`group relative rounded-3xl overflow-hidden border border-white/10 hover:border-[var(--color-brand-gold)]/50 transition-all duration-500 block ${spanClass} ${heightClass}`}
                >
                  <Image
                    src={project.img}
                    alt={project.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-70 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-[#0B192C]/40 to-transparent opacity-90 transition-opacity duration-300" />
                  
                  <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between z-10">
                    <div className="flex justify-between items-start">
                      <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-white tracking-widest uppercase">
                        {project.sector}
                      </span>
                      <div className="w-12 h-12 rounded-full bg-[var(--color-brand-gold)]/90 flex items-center justify-center opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                        <ArrowUpRight className={`w-6 h-6 text-[#0B192C] ${isEn ? '' : 'rtl:-scale-x-100'}`} />
                      </div>
                    </div>
                    
                    <div>
                      <h2 className={`${isLarge ? 'text-3xl lg:text-5xl' : 'text-2xl lg:text-3xl'} font-bold text-white mb-4 leading-tight`}>
                        {project.name}
                      </h2>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-px bg-[var(--color-brand-gold)]" />
                        <span className="text-[var(--color-brand-gold)] font-mono font-bold">
                          {project.data}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            {isEn ? 'Have a similar project in mind?' : 'هل لديك مشروع مشابه في ذهنك؟'}
          </h2>
          <Link 
            href={`/${lang}/request-study`}
            className="inline-flex justify-center items-center px-8 py-4 bg-[var(--color-brand-gold)] text-[#0B192C] font-bold rounded-xl hover:bg-yellow-400 transition-colors"
          >
            {isEn ? 'Request a Technical Study' : 'طلب دراسة فنية'}
            <ArrowRight className={`w-5 h-5 ${isEn ? 'ml-2' : 'mr-2 rtl:rotate-180'}`} />
          </Link>
        </div>
      </section>
    </div>
  );
}
