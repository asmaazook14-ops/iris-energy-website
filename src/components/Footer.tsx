import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { href: '/solutions', labelEn: 'Solutions', labelAr: 'الحلول' },
  { href: '/products', labelEn: 'Products', labelAr: 'المنتجات' },
  { href: '/projects', labelEn: 'Projects', labelAr: 'المشاريع' },
  { href: '/services', labelEn: 'Engineering Process', labelAr: 'العملية الهندسية' },
  { href: '/about', labelEn: 'About IRIS', labelAr: 'عن إيريس' },
];

export function Footer({ lang }: { lang: 'en' | 'ar' }) {
  const isEn = lang === 'en';

  return (
    <footer className="bg-[#0B192C] text-white pt-24 pb-12 border-t border-white/10 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[var(--color-brand-blue)]/50 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
          
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <Link href={`/${lang}`} className="mb-6 block">
              <Image src="/logo.svg" alt="IRIS Energy Logo" width={150} height={51} className="h-10 w-auto" />
            </Link>
            <p className="text-slate-400 max-w-md mt-4 text-lg font-light leading-relaxed">
              {isEn 
                ? 'Engineering efficient air-to-water heat-pump solutions for projects that require dependable heating, cooling, and intelligent thermal integration.' 
                : 'تطوير حلول هندسية متكاملة لمضخات الحرارة (هواء-ماء) للمشاريع التي تتطلب تدفئة وتبريد موثوقين وتكاملاً حرارياً ذكياً.'}
            </p>
          </div>

          {/* Links Col */}
          <div>
            <h3 className="text-[var(--color-brand-gold)] font-bold mb-6 text-sm tracking-wider uppercase">
              {isEn ? 'Platform' : 'المنصة'}
            </h3>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${lang}${link.href}`}
                    className="text-slate-300 hover:text-white hover:translate-x-1 inline-block transition-all"
                  >
                    {isEn ? link.labelEn : link.labelAr}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Col */}
          <div>
            <h3 className="text-[var(--color-brand-gold)] font-bold mb-6 text-sm tracking-wider uppercase">
              {isEn ? 'Start a Project' : 'ابدأ مشروعاً'}
            </h3>
            <p className="text-slate-300 mb-6 text-sm leading-relaxed">
              {isEn
                ? 'Request a professional technical study to determine the optimal thermal solution for your application.'
                : 'اطلب دراسة فنية متخصصة لتحديد الحل الحراري الأمثل لتطبيقك.'}
            </p>
            <Link
              href={`/${lang}/request-study`}
              className="inline-flex items-center justify-center px-6 py-3 border border-[var(--color-brand-blue)] text-sm font-bold rounded-lg text-white bg-[var(--color-brand-blue)]/20 hover:bg-[var(--color-brand-blue)] hover:border-transparent transition-all w-full sm:w-auto"
            >
              {isEn ? 'Request a Technical Study' : 'طلب دراسة فنية'}
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm font-medium">
            &copy; {new Date().getFullYear()} IRIS Energy. {isEn ? 'All rights reserved.' : 'جميع الحقوق محفوظة.'}
          </p>
          <div className="flex space-x-6 rtl:space-x-reverse text-sm font-medium text-slate-500">
            <span className="hover:text-slate-300 transition-colors cursor-not-allowed">
              {isEn ? 'Privacy Policy' : 'سياسة الخصوصية'}
            </span>
            <span className="hover:text-slate-300 transition-colors cursor-not-allowed">
              {isEn ? 'Terms of Service' : 'شروط الخدمة'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
