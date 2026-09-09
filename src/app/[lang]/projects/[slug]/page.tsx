import { getProjectBySlug, projectsEn } from '@/data/projects';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Building2, Zap, Settings2 } from 'lucide-react';

export function generateStaticParams() {
  return projectsEn.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProjectCaseStudy(props: { params: Promise<{ lang: 'en' | 'ar', slug: string }> }) {
  const params = await props.params;
  const { lang, slug } = params;
  const isEn = lang === 'en';

  const project = getProjectBySlug(slug, lang);

  if (!project) {
    notFound();
  }

  return (
    <div className="bg-[#0B192C] min-h-screen">
      
      {/* Back Navigation */}
      <div className="border-b border-white/10 bg-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href={`/${lang}/projects`} className="inline-flex items-center text-slate-400 hover:text-white transition-colors text-sm font-medium">
            <ArrowLeft className={`w-4 h-4 ${isEn ? 'mr-2' : 'ml-2 rtl:rotate-180'}`} />
            {isEn ? 'Back to Portfolio' : 'العودة إلى معرض الأعمال'}
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-end pb-24">
        <div className="absolute inset-0 z-0">
          <Image
            src={project.img}
            alt={project.name}
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-[#0B192C]/80 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <span className="inline-block py-1.5 px-4 rounded-full bg-[var(--color-brand-gold)]/20 border border-[var(--color-brand-gold)]/50 text-xs font-bold tracking-widest mb-6 text-[var(--color-brand-gold)] uppercase backdrop-blur-md">
              {isEn ? 'Case Study' : 'دراسة حالة'}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {project.name}
            </h1>
          </div>
        </div>
      </section>

      {/* Technical Overview */}
      <section className="py-24 relative -mt-16 z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="grid md:grid-cols-3 gap-8 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-white/10 rtl:divide-x-reverse">
              
              <div className="pt-8 md:pt-0">
                <div className="flex items-center gap-3 mb-4 text-slate-400">
                  <Building2 className="w-5 h-5" />
                  <span className="text-sm font-bold uppercase tracking-widest">{isEn ? 'Sector' : 'القطاع'}</span>
                </div>
                <div className="text-2xl font-bold text-white">{project.sector}</div>
              </div>

              <div className="pt-8 md:pt-0 md:px-12">
                <div className="flex items-center gap-3 mb-4 text-slate-400">
                  <Zap className="w-5 h-5" />
                  <span className="text-sm font-bold uppercase tracking-widest">{isEn ? 'System Capacity' : 'سعة النظام'}</span>
                </div>
                <div className="text-2xl font-bold text-[var(--color-brand-gold)] font-mono">{project.data}</div>
              </div>

              <div className="pt-8 md:pt-0 md:px-12">
                <div className="flex items-center gap-3 mb-4 text-slate-400">
                  <Settings2 className="w-5 h-5" />
                  <span className="text-sm font-bold uppercase tracking-widest">{isEn ? 'Technology' : 'التكنولوجيا'}</span>
                </div>
                <div className="text-2xl font-bold text-white">{isEn ? 'IRIS Heat-Pump System' : 'نظام إيريس للمضخات الحرارية'}</div>
              </div>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
