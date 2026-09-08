import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { href: '/', labelEn: 'Home', labelAr: 'الرئيسية' },
  { href: '/about', labelEn: 'About', labelAr: 'من نحن' },
  { href: '/solutions', labelEn: 'Solutions', labelAr: 'الحلول' },
  { href: '/products', labelEn: 'Products', labelAr: 'المنتجات' },
  { href: '/projects', labelEn: 'Projects', labelAr: 'المشاريع' },
  { href: '/services', labelEn: 'Services', labelAr: 'الخدمات' },
];

export function Footer({ lang }: { lang: 'en' | 'ar' }) {
  return (
    <footer className="bg-[var(--color-brand-navy)] text-white pt-16 pb-8 border-t border-[var(--color-brand-blue)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <Link href={`/${lang}`} className="mb-4 block">
              <Image src="/logo.png" alt="IRIS Energy Logo" width={150} height={51} className="h-12 w-auto brightness-0 invert" />
            </Link>
            <p className="text-[var(--color-brand-gray)] max-w-md mt-4">
              {lang === 'en' 
                ? 'Specializing in efficient air-to-water heat-pump technology for projects that require dependable heating, cooling and efficient energy use.' 
                : 'متخصصون في تكنولوجيا المضخات الحرارية (هواء-ماء) عالية الكفاءة للمشاريع التي تتطلب تدفئة وتبريد موثوقين واستخدام فعال للطاقة.'}
            </p>
          </div>

          {/* Links Col */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">
              {lang === 'en' ? 'Quick Links' : 'روابط سريعة'}
            </h3>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${lang}${link.href === '/' ? '' : link.href}`}
                    className="text-[var(--color-brand-gray)] hover:text-white transition-colors"
                  >
                    {lang === 'en' ? link.labelEn : link.labelAr}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Col */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">
              {lang === 'en' ? 'Start a Project' : 'ابدأ مشروعاً'}
            </h3>
            <p className="text-[var(--color-brand-gray)] mb-6">
              {lang === 'en'
                ? 'Share your project details to receive an initial technical assessment.'
                : 'شارك تفاصيل مشروعك للحصول على تقييم فني أولي.'}
            </p>
            <Link
              href={`/${lang}/request-study`}
              className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-md text-[var(--color-brand-navy)] bg-[var(--color-brand-gold)] hover:bg-yellow-400 transition-colors w-full sm:w-auto"
            >
              {lang === 'en' ? 'Request a Study' : 'طلب دراسة مشروع'}
            </Link>
          </div>
        </div>

        <div className="border-t border-[var(--color-brand-dark-gray)] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[var(--color-brand-gray)] text-sm">
            &copy; {new Date().getFullYear()} IRIS Energy. {lang === 'en' ? 'All rights reserved.' : 'جميع الحقوق محفوظة.'}
          </p>
          {/* Note: NO social links as they could expose contact details unless explicitly provided. Since none were provided, I omit them. */}
        </div>
      </div>
    </footer>
  );
}
