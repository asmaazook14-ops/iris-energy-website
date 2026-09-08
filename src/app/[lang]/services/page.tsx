import Link from 'next/link';
import { Wrench, BookOpen, Settings, Lightbulb, GraduationCap, CheckCircle2, Factory, ArrowRight, ArrowLeft } from 'lucide-react';

const servicesEn = [
  { icon: BookOpen, title: 'Project Study', desc: 'Review application, dimensions, operating season, climate, target temperature and usage pattern.' },
  { icon: Settings, title: 'System Sizing', desc: 'Select suitable capacity, unit quantity, hydraulic arrangement and supporting equipment.' },
  { icon: Lightbulb, title: 'Technical Advice', desc: 'Coordinate integration with the pool, hot-water or building system.' },
  { icon: Wrench, title: 'Installation & Commissioning', desc: 'Support equipment placement, connection, testing and operational handover.' },
  { icon: GraduationCap, title: 'Knowledge Transfer', desc: 'Guide operators and maintenance teams on correct use and routine checks.' },
  { icon: CheckCircle2, title: 'Maintenance', desc: 'Provide planned and corrective service through qualified technical teams.' },
  { icon: Factory, title: 'Spare-Parts Follow-Up', desc: 'Commitment to long-term operational support and parts availability.' }
];

const servicesAr = [
  { icon: BookOpen, title: 'دراسة المشروع', desc: 'مراجعة التطبيق والأبعاد وموسم التشغيل والمناخ والحرارة المستهدفة ونمط الاستخدام.' },
  { icon: Settings, title: 'تحديد حجم النظام', desc: 'اختيار القدرة المناسبة، وكمية الوحدات، والترتيب الهيدروليكي والمعدات الداعمة.' },
  { icon: Lightbulb, title: 'المشورة الفنية', desc: 'تنسيق التكامل مع نظام المسبح أو المياه الساخنة أو المبنى.' },
  { icon: Wrench, title: 'التركيب والتشغيل', desc: 'دعم وضع المعدات وتوصيلها واختبارها وتسليمها للتشغيل.' },
  { icon: GraduationCap, title: 'نقل المعرفة', desc: 'توجيه المشغلين وفرق الصيانة حول الاستخدام الصحيح والفحوصات الروتينية.' },
  { icon: CheckCircle2, title: 'الصيانة', desc: 'تقديم خدمات الصيانة المخططة والتصحيحية من خلال فرق فنية مؤهلة.' },
  { icon: Factory, title: 'متابعة قطع الغيار', desc: 'الالتزام بالدعم التشغيلي طويل الأجل وتوافر قطع الغيار.' }
];

export default async function Services(props: { params: Promise<{ lang: 'en' | 'ar' }> }) {
  const params = await props.params;
  const lang = params.lang;
  const isEn = lang === 'en';
  const services = isEn ? servicesEn : servicesAr;

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-brand-navy)] mb-6">
            {isEn ? 'Engineering Services' : 'الخدمات الهندسية'}
          </h1>
          <p className="text-lg text-[var(--color-brand-dark-gray)]">
            {isEn
              ? 'IRIS Energy supports the full project lifecycle, from early concept and system selection to installation and continued operation.'
              : 'تدعم آيريس إنرجي دورة حياة المشروع بالكامل، بدءًا من الفكرة الأولى واختيار النظام وحتى التركيب والتشغيل المستمر.'}
          </p>
        </div>

        {/* Services Grid */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 mb-16">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div key={idx} className="flex gap-6 p-8 bg-[var(--color-brand-light)] border border-[var(--color-brand-gray)] rounded-xl hover:shadow-md transition-shadow">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm border border-[var(--color-brand-gray)] text-[var(--color-brand-blue)]">
                    <Icon className="w-7 h-7" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-brand-navy)] mb-3">{service.title}</h3>
                  <p className="text-[var(--color-brand-dark-gray)] leading-relaxed">{service.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recommended Service CTA Section */}
        <div className="max-w-5xl mx-auto bg-[var(--color-brand-light)] border border-[var(--color-brand-blue)]/20 p-8 md:p-10 rounded-2xl shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-bold tracking-wider uppercase text-[var(--color-brand-blue)] mb-2 block">
                {isEn ? 'RECOMMENDED SERVICE CTA' : 'طلب خدمة موصى به'}
              </span>
              <h2 className="text-2xl font-bold text-[var(--color-brand-navy)] mb-3">
                {isEn ? 'REQUEST A PROJECT STUDY' : 'طلب دراسة مشروع'}
              </h2>
              <p className="text-[var(--color-brand-dark-gray)] leading-relaxed">
                {isEn
                  ? 'Provide the project type, location, water volume, target temperature and available drawings so the engineering team can review the requirement.'
                  : 'يرجى تزويدنا بنوع المشروع، والموقع، وحجم المياه، ودرجة الحرارة المستهدفة، والمخططات المتاحة حتى يتمكن الفريق الهندسي من مراجعة المتطلبات.'}
              </p>
            </div>
            
            <div className="flex-shrink-0">
              <Link
                href={`/${lang}/request-study`}
                className="inline-flex items-center gap-2 bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-navy)] text-white font-semibold px-6 py-3.5 rounded-lg transition-colors text-sm"
              >
                <span>{isEn ? 'Request a Study' : 'طلب دراسة'}</span>
                {isEn ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}