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
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-brand-navy)] mb-6">
            {lang === 'en' ? 'Our Products' : 'منتجاتنا'}
          </h1>
          <p className="text-lg text-[var(--color-brand-dark-gray)] mb-8">
            {lang === 'en'
              ? 'The IRIS Energy portfolio includes residential, commercial and industrial full-inverter heat pumps.'
              : 'تضم مجموعة منتجات إيريس إنرجي مضخات حرارية بتقنية الانفرتر الكامل (Full Inverter) للتطبيقات السكنية والتجارية والصناعية.'}
          </p>
        </div>

        {/* Product Ranges */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {categories.map((cat, idx) => (
            <div key={idx} className="bg-[var(--color-brand-light)] border border-[var(--color-brand-gray)] rounded-xl overflow-hidden shadow-sm flex flex-col">
              <div className="relative h-64">
                <Image
                  src={idx === 0 ? '/images/Products/product-iris-pool-heat-pump.webp' : (idx === 1 ? '/images/Projects/project-multi-unit-heat-pump-system.webp' : '/images/Products/product-showroom-unit.webp')}
                  alt={cat.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 flex-grow">
                <h2 className="text-2xl font-bold text-[var(--color-brand-navy)] mb-6 border-b border-[var(--color-brand-gray)] pb-4">{cat.title}</h2>
                <ul className="space-y-4 text-[var(--color-brand-dark-gray)]">
                  <li className="flex justify-between items-center">
                    <span className="font-semibold">{lang === 'en' ? 'Range' : 'الموديلات'}:</span>
                    <span>{cat.models}</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-semibold">{lang === 'en' ? 'Capacity' : 'القدرة'}:</span>
                    <span>{cat.capacity}</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-semibold">{lang === 'en' ? 'Models' : 'عدد الموديلات'}:</span>
                    <span>{cat.count}</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-semibold">{lang === 'en' ? 'Technology' : 'التكنولوجيا'}:</span>
                    <span>{cat.tech}</span>
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
          <h2 className="text-3xl font-bold text-[var(--color-brand-navy)] mb-10 text-center">
            {lang === 'en' ? 'Referenced Technical Features' : 'المواصفات الفنية'}
          </h2>
          <div className="bg-white rounded-xl shadow-md border border-[var(--color-brand-gray)] overflow-hidden">
            <div className="divide-y divide-[var(--color-brand-gray)]">
              {features.map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row p-6 hover:bg-[var(--color-brand-light)] transition-colors">
                  <div className="sm:w-1/3 font-bold text-[var(--color-brand-navy)] mb-2 sm:mb-0">
                    {item.feature}
                  </div>
                  <div className="sm:w-2/3 text-[var(--color-brand-dark-gray)]">
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
