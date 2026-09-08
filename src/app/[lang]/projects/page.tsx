import Image from 'next/image';

const projectsEn = [
  { name: 'British School of Egypt - Sheikh Zayed', sector: 'School', data: '2 x 100 kW', img: '/images/Projects/project-multi-unit-heat-pump-system.webp' },
  { name: 'American School of Egypt - 6 October', sector: 'School', data: '3 x 125 kW', img: '/images/Projects/project-protected-equipment-bank.webp' },
  { name: 'British School of Egypt - Banha', sector: 'School', data: '2 x 55 kW', img: '/images/Projects/project-protected-outdoor-installation.webp' },
  { name: 'Safir Hotel - Dahab', sector: 'Hotel', data: '2 x 200 kW and 1 x 25 kW', img: '/images/Projects/project-multi-unit-heat-pump-system.webp' },
  { name: 'Al Moudira Hotel - Luxor', sector: 'Hotel', data: '8 x 35 kW and 1 x 250 kW', img: '/images/Projects/project-protected-equipment-bank.webp' },
  { name: 'Cairo Country Seasons', sector: 'Sporting facility', data: '4 x 60 kW', img: '/images/Projects/project-protected-outdoor-installation.webp' },
  { name: 'El Gouna Hotel Group References', sector: 'Hotels and resorts', data: 'Three main pools', img: '/images/Projects/project-louvered-enclosure-front.webp' },
  { name: 'Hurghada Villa Portfolio', sector: 'Residential', data: 'Approximately 30 pools; mainly 30 and 35 kW', img: '/images/Projects/project-louvered-enclosure-side-a.webp' }
];

const projectsAr = [
  { name: 'المدرسة البريطانية بمصر - الشيخ زايد', sector: 'مدرسة', data: '2 × 100 كيلو وات', img: '/images/Projects/project-multi-unit-heat-pump-system.webp' },
  { name: 'المدرسة الأمريكية بمصر - 6 أكتوبر', sector: 'مدرسة', data: '3 × 125 كيلو وات', img: '/images/Projects/project-protected-equipment-bank.webp' },
  { name: 'المدرسة البريطانية بمصر - بنها', sector: 'مدرسة', data: '2 × 55 كيلو وات', img: '/images/Projects/project-protected-outdoor-installation.webp' },
  { name: 'فندق سفير - دهب', sector: 'فندق', data: '2 × 200 كيلو وات و 1 × 25 كيلو وات', img: '/images/Projects/project-multi-unit-heat-pump-system.webp' },
  { name: 'فندق المديرة - الأقصر', sector: 'فندق', data: '8 × 35 كيلو وات و 1 × 250 كيلو وات', img: '/images/Projects/project-protected-equipment-bank.webp' },
  { name: 'كايرو كانتري سيزونز', sector: 'منشأة رياضية', data: '4 × 60 كيلو وات', img: '/images/Projects/project-protected-outdoor-installation.webp' },
  { name: 'مجموعة فنادق الجونة', sector: 'فنادق ومنتجعات', data: 'ثلاثة مسابح رئيسية', img: '/images/Projects/project-louvered-enclosure-front.webp' },
  { name: 'فيلات الغردقة', sector: 'سكني', data: 'حوالي 30 مسبحاً؛ معظمها 30 و 35 كيلو وات', img: '/images/Projects/project-louvered-enclosure-side-a.webp' }
];

export default async function Projects(props: { params: Promise<{ lang: 'en' | 'ar' }> }) {
  const params = await props.params;
  const lang = params.lang;
  const projects = lang === 'en' ? projectsEn : projectsAr;

  return (
    <div className="py-24 bg-[var(--color-brand-light)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-brand-navy)] mb-6">
            {lang === 'en' ? 'Our Projects' : 'مشاريعنا'}
          </h1>
          <p className="text-lg text-[var(--color-brand-dark-gray)]">
            {lang === 'en'
              ? 'IRIS Energy heat-pump systems have been applied across residential and commercial projects in Egypt. Projects range from single-unit residential installations to multi-unit systems serving large pools.'
              : 'تم تطبيق أنظمة المضخات الحرارية من إيريس إنرجي في العديد من المشاريع السكنية والتجارية في مصر. تتراوح المشاريع من تركيبات سكنية بوحدة واحدة إلى أنظمة متعددة الوحدات تخدم المسابح الكبيرة.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md border border-[var(--color-brand-gray)] overflow-hidden flex flex-col group hover:shadow-lg transition-shadow">
              <div className="img-container-video overflow-hidden">
                <Image
                  src={project.img}
                  alt={project.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-[var(--color-brand-blue)] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                  {project.sector}
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-[var(--color-brand-navy)] mb-3 leading-snug">{project.name}</h3>
                <div className="mt-auto pt-4 border-t border-[var(--color-brand-gray)] flex items-center justify-between">
                  <span className="text-sm text-[var(--color-brand-dark-gray)] font-medium">{lang === 'en' ? 'Capacity / Detail' : 'القدرة / التفاصيل'}:</span>
                  <span className="text-sm font-bold text-[var(--color-brand-blue)]">{project.data}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
