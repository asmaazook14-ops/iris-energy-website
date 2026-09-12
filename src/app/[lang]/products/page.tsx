import Image from 'next/image';
import ProductMatrix from '@/components/ProductMatrix';

const categoriesEn = [
  {
    title: 'Residential',
    models: 'IRv-010 to IRv-060',
    capacity: '10-65 kW',
    count: '9 Models',
    tech: 'Full Inverter'
  },
  {
    title: 'Commercial',
    models: 'IRv-075 to IRv-150',
    capacity: '75-150 kW',
    count: '4 Models',
    tech: 'Full Inverter'
  },
  {
    title: 'Industrial',
    models: 'IRv-160 to IRv-500',
    capacity: '160-475 kW',
    count: '5 Models',
    tech: 'Full Inverter'
  }
];

const categoriesAr = [
  {
    title: 'سكني',
    models: 'IRv-010 إلى IRv-060',
    capacity: '10-65 كيلو وات',
    count: '9 موديلات',
    tech: 'انفرتر كامل (Full Inverter)'
  },
  {
    title: 'تجاري',
    models: 'IRv-075 إلى IRv-150',
    capacity: '75-150 كيلو وات',
    count: '4 موديلات',
    tech: 'انفرتر كامل (Full Inverter)'
  },
  {
    title: 'صناعي',
    models: 'IRv-160 إلى IRv-500',
    capacity: '160-475 كيلو وات',
    count: '5 موديلات',
    tech: 'انفرتر كامل (Full Inverter)'
  }
];

const featuresEn = [
  { feature: 'Coefficient of Performance', spec: 'COP 6.15-16.11 W/W' },
  { feature: 'Compressors', spec: 'Panasonic, Copeland or equivalent branded' },
  { feature: 'Fan Motor', spec: 'DC fan motor' },
  { feature: 'Refrigerants', spec: 'R410A, R32 or R290 (depending on model)' },
  { feature: 'Efficiency Class', spec: 'A+++' },
  { feature: 'Heat Exchanger', spec: 'PVC/titanium heat exchanger' },
  { feature: 'Controls', spec: 'Colour-screen smart control panel with Wi-Fi function' },
  { feature: 'Sound Level', spec: '50-58 dB(A) at one metre (depending on model)' },
];

const featuresAr = [
  { feature: 'معامل الأداء', spec: 'COP 6.15-16.11 W/W' },
  { feature: 'الضواغط', spec: 'Panasonic، Copeland أو ما يعادلها' },
  { feature: 'محرك المروحة', spec: 'محرك تيار مستمر (DC)' },
  { feature: 'وسائط التبريد', spec: 'R410A، R32 أو R290 (حسب الموديل)' },
  { feature: 'فئة الكفاءة', spec: 'A+++' },
  { feature: 'المبادل الحراري', spec: 'مبادل حراري من PVC/التيتانيوم' },
  { feature: 'التحكم', spec: 'لوحة تحكم ذكية بشاشة ملونة مع وظيفة Wi-Fi' },
  { feature: 'مستوى الصوت', spec: '50-58 ديسيبل (A) على بعد متر واحد (حسب الموديل)' },
];

export default async function Products(props: { params: Promise<{ lang: 'en' | 'ar' }> }) {
  const params = await props.params;
  const lang = params.lang;
  const categories = lang === 'en' ? categoriesEn : categoriesAr;
  const features = lang === 'en' ? featuresEn : featuresAr;

  return (
    <div className="py-24 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {lang === 'en' ? 'Our Products' : 'منتجاتنا'}
          </h1>
          <p className="text-lg text-slate-300 mb-8">
            {lang === 'en'
              ? 'The IRIS Energy portfolio includes residential, commercial and industrial full-inverter heat pumps.'
              : 'تضم مجموعة منتجات إيريس إنرجي مضخات حرارية بتقنية الانفرتر الكامل (Full Inverter) للتطبيقات السكنية والتجارية والصناعية.'}
          </p>
        </div>

        {/* Product Ranges */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {categories.map((cat, idx) => (
            <div key={idx} className="bg-[#122238] border border-white/10 hover:border-[var(--color-brand-blue)]/40 transition-colors duration-300 rounded-xl overflow-hidden shadow-xl flex flex-col group relative">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-brand-blue)]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              <div className="img-container-standard border-b border-white/10 relative">
                <div className="absolute inset-0 bg-[#0B192C]/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                <Image
                  src={idx === 0 ? '/images/Products/product-iris-pool-heat-pump.webp' : (idx === 1 ? '/images/Projects/project-multi-unit-heat-pump-system.webp' : '/images/Products/product-showroom-unit.webp')}
                  alt={cat.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-8 flex-grow flex flex-col relative bg-[#122238]">
                <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4 flex items-center justify-between">
                  {cat.title}
                  <span className="text-[10px] uppercase tracking-widest text-[var(--color-brand-blue)] font-mono border border-[var(--color-brand-blue)]/30 px-2 py-1 rounded bg-[#0B192C]">
                    Series
                  </span>
                </h2>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-sm">{lang === 'en' ? 'Range' : 'الموديلات'}:</span>
                    <span className="font-mono text-[var(--color-brand-gold)] font-medium">{cat.models}</span>
                  </li>
                  <li className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-sm">{lang === 'en' ? 'Capacity' : 'القدرة'}:</span>
                    <span className="font-mono text-white font-medium">{cat.capacity}</span>
                  </li>
                  <li className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-sm">{lang === 'en' ? 'Models' : 'عدد الموديلات'}:</span>
                    <span className="font-mono text-white font-medium">{cat.count}</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-sm">{lang === 'en' ? 'Technology' : 'التكنولوجيا'}:</span>
                    <span className="text-sm font-semibold text-[var(--color-brand-blue)]">{cat.tech}</span>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Product Matrix */}
        <div className="mb-24">
          <ProductMatrix />
        </div>

        {/* Technical Features */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">
            {lang === 'en' ? 'Referenced Technical Features' : 'المواصفات الفنية'}
          </h2>
          <div className="bg-white/5 border border-white/10 hover:border-[var(--color-brand-blue)]/50 rounded-xl shadow-md overflow-hidden transition-colors">
            <div className="divide-y divide-white/10">
              {features.map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row p-6 hover:bg-white/5 transition-colors">
                  <div className="sm:w-1/3 font-bold text-white mb-2 sm:mb-0">
                    {item.feature}
                  </div>
                  <div className="sm:w-2/3 text-slate-300 font-mono text-sm">
                    {item.spec}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
