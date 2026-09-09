export type Project = {
  slug: string;
  name: string;
  sector: string;
  data: string;
  img: string;
};

export const projectsEn: Project[] = [
  { slug: 'british-school-sheikh-zayed', name: 'British School of Egypt - Sheikh Zayed', sector: 'School', data: '2 x 100 kW', img: '/images/Projects/project-multi-unit-heat-pump-system.webp' },
  { slug: 'american-school-6-october', name: 'American School of Egypt - 6 October', sector: 'School', data: '3 x 125 kW', img: '/images/Projects/project-protected-equipment-bank.webp' },
  { slug: 'british-school-banha', name: 'British School of Egypt - Banha', sector: 'School', data: '2 x 55 kW', img: '/images/Projects/project-protected-outdoor-installation.webp' },
  { slug: 'safir-hotel-dahab', name: 'Safir Hotel - Dahab', sector: 'Hotel', data: '2 x 200 kW and 1 x 25 kW', img: '/images/Projects/project-louvered-enclosure-side-b.webp' },
  { slug: 'al-moudira-hotel-luxor', name: 'Al Moudira Hotel - Luxor', sector: 'Hotel', data: '8 x 35 kW and 1 x 250 kW', img: '/images/Homepage/homepage-commercial-pool.webp' },
  { slug: 'cairo-country-seasons', name: 'Cairo Country Seasons', sector: 'Sporting facility', data: '4 x 60 kW', img: '/images/Products/product-iris-pool-heat-pump.webp' },
  { slug: 'el-gouna-hotel-group', name: 'El Gouna Hotel Group References', sector: 'Hotels and resorts', data: 'Three main pools', img: '/images/Projects/project-louvered-enclosure-front.webp' },
  { slug: 'hurghada-villa-portfolio', name: 'Hurghada Villa Portfolio', sector: 'Residential', data: 'Approximately 30 pools; mainly 30 and 35 kW', img: '/images/Projects/project-louvered-enclosure-side-a.webp' }
];

export const projectsAr: Project[] = [
  { slug: 'british-school-sheikh-zayed', name: 'المدرسة البريطانية بمصر - الشيخ زايد', sector: 'مدرسة', data: '2 × 100 كيلو وات', img: '/images/Projects/project-multi-unit-heat-pump-system.webp' },
  { slug: 'american-school-6-october', name: 'المدرسة الأمريكية بمصر - 6 أكتوبر', sector: 'مدرسة', data: '3 × 125 كيلو وات', img: '/images/Projects/project-protected-equipment-bank.webp' },
  { slug: 'british-school-banha', name: 'المدرسة البريطانية بمصر - بنها', sector: 'مدرسة', data: '2 × 55 كيلو وات', img: '/images/Projects/project-protected-outdoor-installation.webp' },
  { slug: 'safir-hotel-dahab', name: 'فندق سفير - دهب', sector: 'فندق', data: '2 × 200 كيلو وات و 1 × 25 كيلو وات', img: '/images/Projects/project-louvered-enclosure-side-b.webp' },
  { slug: 'al-moudira-hotel-luxor', name: 'فندق المديرة - الأقصر', sector: 'فندق', data: '8 × 35 كيلو وات و 1 × 250 كيلو وات', img: '/images/Homepage/homepage-commercial-pool.webp' },
  { slug: 'cairo-country-seasons', name: 'كايرو كانتري سيزونز', sector: 'منشأة رياضية', data: '4 × 60 كيلو وات', img: '/images/Products/product-iris-pool-heat-pump.webp' },
  { slug: 'el-gouna-hotel-group', name: 'مجموعة فنادق الجونة', sector: 'فنادق ومنتجعات', data: 'ثلاثة مسابح رئيسية', img: '/images/Projects/project-louvered-enclosure-front.webp' },
  { slug: 'hurghada-villa-portfolio', name: 'فيلات الغردقة', sector: 'سكني', data: 'حوالي 30 مسبحاً؛ معظمها 30 و 35 كيلو وات', img: '/images/Projects/project-louvered-enclosure-side-a.webp' }
];

export function getProjectBySlug(slug: string, lang: 'en' | 'ar'): Project | undefined {
  const projects = lang === 'en' ? projectsEn : projectsAr;
  return projects.find(p => p.slug === slug);
}
