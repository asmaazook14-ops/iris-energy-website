import { getDictionary } from '@/dictionaries';
import Image from 'next/image';
import {
  MessageSquare,
  SlidersHorizontal,
  FileText,
  Wrench,
  ShieldCheck,
  Zap,
  Settings,
  Headphones,
  Globe2,
  CalendarDays,
  Building
} from 'lucide-react';
import { ElementType } from 'react';

export default async function About(props: { params: Promise<{ lang: 'en' | 'ar' }> }) {
  const params = await props.params;
  const lang = params.lang;
  const dict = await getDictionary(lang);
  const isEn = lang === 'en';

  type AboutDict = {
    title: string;
    p1: string;
    p2: string;
    whatWeDoTitle?: string;
    p3: string;
    valuesTitle?: string;
    values?: { value: string; meaning: string }[];
  };

  const aboutDict = dict.about as AboutDict;

  const workflowSteps = [
    {
      title: isEn ? 'Early Stage Consultation' : 'الاستشارة في المرحلة المبكرة',
      desc: isEn ? 'Understanding project requirements from the beginning.' : 'فهم متطلبات المشروع منذ البداية.',
      icon: MessageSquare
    },
    {
      title: isEn ? 'System Selection' : 'اختيار النظام',
      desc: isEn ? 'Identifying the optimal components and configuration.' : 'تحديد المكونات والإعدادات المثلى.',
      icon: SlidersHorizontal
    },
    {
      title: isEn ? 'Technical Studies' : 'الدراسات الفنية',
      desc: isEn ? 'Balancing performance, budget, and energy efficiency.' : 'موازنة الأداء والميزانية وكفاءة الطاقة.',
      icon: FileText
    },
    {
      title: isEn ? 'Installation & Support' : 'التركيب والدعم',
      desc: isEn ? 'Comprehensive setup and ongoing maintenance services.' : 'إعداد شامل وخدمات صيانة مستمرة.',
      icon: Wrench
    }
  ];

  // We map the values from dictionary but add hardcoded icons
  const valueIcons = [Settings, ShieldCheck, Zap, Headphones];
  const values = aboutDict.values?.map((item: { value: string; meaning: string }, index: number) => ({
    ...item,
    icon: valueIcons[index] || Settings
  })) || [];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 1. Hero / Introduction Section */}
      <section className="relative z-10 py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="order-2 lg:order-1 space-y-10">
              <div>
                <h2 className="text-[var(--color-brand-blue)] font-bold tracking-wider uppercase text-sm mb-3">
                  {isEn ? 'Our Heritage' : 'تراثنا'}
                </h2>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  {aboutDict.title}
                </h1>
                <p className="text-lg text-slate-300 leading-relaxed">
                  {aboutDict.p1}
                </p>
                <p className="text-lg text-slate-300 leading-relaxed mt-4">
                  {aboutDict.p2}
                </p>
              </div>

              {/* Milestone Badges */}
              <div className="grid sm:grid-cols-2 gap-4 pt-6 border-t border-white/10">
                <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-sm hover:border-[var(--color-brand-blue)]/50 transition-colors">
                  <div className="p-3 bg-[var(--color-brand-blue)]/20 text-[var(--color-brand-blue)] rounded-lg">
                    <Globe2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xl">2011</h4>
                    <p className="text-sm text-slate-400 font-medium">{isEn ? 'Established in France' : 'تأسست في فرنسا'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-sm hover:border-[var(--color-brand-blue)]/50 transition-colors">
                  <div className="p-3 bg-[var(--color-brand-blue)]/20 text-[var(--color-brand-blue)] rounded-lg">
                    <Building className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xl">2020</h4>
                    <p className="text-sm text-slate-400 font-medium">{isEn ? 'Egyptian Market Entry (AOI-ABD)' : 'دخول السوق المصري (AOI-ABD)'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <Image
                  src="/images/Projects/project-protected-outdoor-installation.webp"
                  alt="IRIS Energy Installation"
                  fill
                  className="object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0B192C]/60 to-transparent" />
              </div>
              
              <div className={`absolute -bottom-8 ${isEn ? '-left-8' : '-right-8'} bg-slate-900/80 backdrop-blur-md p-6 rounded-xl shadow-xl max-w-xs border border-white/10 hover:border-[var(--color-brand-gold)]/50 transition-colors hidden sm:block`}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[var(--color-brand-gold)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <CalendarDays className="w-6 h-6 text-[var(--color-brand-gold)]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{isEn ? 'Decade of Excellence' : 'عقد من التميز'}</h4>
                    <p className="text-xs text-slate-400 mt-1">{isEn ? 'Proven track record in Europe, Africa & Middle East' : 'سجل حافل في أوروبا وإفريقيا والشرق الأوسط'}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. "What We Do" Section - 4-Step Engineering Workflow */}
      <section className="relative z-10 py-24 text-white overflow-hidden border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[var(--color-brand-gold)] font-bold tracking-wider uppercase text-sm mb-3">
              {isEn ? 'Our Process' : 'عمليتنا'}
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              {aboutDict.whatWeDoTitle || (isEn ? 'What We Do' : 'ماذا نفعل')}
            </h3>
            <p className="text-lg text-slate-300 leading-relaxed">
              {aboutDict.p3}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflowSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="relative group">
                  {/* Connection Line (hidden on small screens) */}
                  {idx !== workflowSteps.length - 1 && (
                    <div className={`hidden lg:block absolute top-8 ${isEn ? 'left-full -translate-x-4' : 'right-full translate-x-4'} w-full h-[2px] bg-gradient-to-r from-[var(--color-brand-blue)] to-transparent opacity-30 z-0`} />
                  )}
                  
                  <div className="relative z-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-[var(--color-brand-blue)]/50 transition-all duration-300 h-full">
                    <div className="w-16 h-16 bg-[var(--color-brand-blue)]/20 rounded-xl flex items-center justify-center mb-6 text-[var(--color-brand-blue)] font-bold text-xl relative">
                      <Icon className="w-8 h-8" />
                      <div className="absolute -top-3 -right-3 w-8 h-8 bg-[var(--color-brand-gold)] text-[var(--color-brand-navy)] rounded-full flex items-center justify-center text-sm border-4 border-[#0B192C]">
                        {idx + 1}
                      </div>
                    </div>
                    <h4 className="text-xl font-bold mb-3 text-white">{step.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. "Suggested Values" Section - 2x2 Grid / 4-Column Layout */}
      <section className="relative z-10 py-24 border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[var(--color-brand-blue)] font-bold tracking-wider uppercase text-sm mb-3">
              {isEn ? 'Core Principles' : 'المبادئ الأساسية'}
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white">
              {aboutDict.valuesTitle || (isEn ? 'Our Values' : 'قيمنا')}
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value: { value: string; meaning: string; icon: ElementType }, idx: number) => {
              const Icon = value.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-white/5 rounded-2xl p-8 border border-white/10 shadow-sm hover:border-[var(--color-brand-gold)]/50 transition-all duration-300 transform hover:-translate-y-1 group backdrop-blur-sm"
                >
                  <div className="w-14 h-14 bg-[var(--color-brand-blue)]/20 text-[var(--color-brand-blue)] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[var(--color-brand-blue)] group-hover:text-white transition-colors duration-300">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">
                    {value.value}
                  </h4>
                  <p className="text-slate-300 leading-relaxed text-sm">
                    {value.meaning}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
