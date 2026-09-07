'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', labelEn: 'Home', labelAr: 'الرئيسية' },
  { href: '/about', labelEn: 'About', labelAr: 'من نحن' },
  { href: '/solutions', labelEn: 'Solutions', labelAr: 'الحلول' },
  { href: '/products', labelEn: 'Products', labelAr: 'المنتجات' },
  { href: '/projects', labelEn: 'Projects', labelAr: 'المشاريع' },
  { href: '/services', labelEn: 'Services', labelAr: 'الخدمات' },
];

export function Header({ lang }: { lang: 'en' | 'ar' }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
  }, [pathname]);

  const toggleLang = () => {
    // Basic lang switcher logic based on path
    const targetLang = lang === 'en' ? 'ar' : 'en';
    const cleanPath = pathname.replace(`/${lang}`, '') || '/';
    return `/${targetLang}${cleanPath === '/' ? '' : cleanPath}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[var(--color-brand-gray)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href={`/${lang}`} className="flex items-center">
              <Image src="/logo.svg" alt="IRIS Energy Logo" width={120} height={36} className="h-10 w-auto" />
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8 rtl:space-x-reverse">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${lang}${link.href === '/' ? '' : link.href}`}
                className={`text-sm font-medium transition-colors hover:text-[var(--color-brand-blue)] ${pathname === `/${lang}${link.href === '/' ? '' : link.href}` ? 'text-[var(--color-brand-blue)]' : 'text-[var(--color-brand-dark-gray)]'}`}
              >
                {lang === 'en' ? link.labelEn : link.labelAr}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            <Link href={toggleLang()} className="text-sm font-medium text-[var(--color-brand-dark-gray)] hover:text-[var(--color-brand-blue)]">
              {lang === 'en' ? 'العربية' : 'English'}
            </Link>
            <Link
              href={`/${lang}/request-study`}
              className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-md text-white bg-[var(--color-brand-blue)] hover:bg-blue-700 transition-colors"
            >
              {lang === 'en' ? 'Request a Study' : 'طلب دراسة مشروع'}
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[var(--color-brand-dark-gray)] hover:text-[var(--color-brand-navy)] focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-[var(--color-brand-gray)]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${lang}${link.href === '/' ? '' : link.href}`}
                className="block px-3 py-2 rounded-md text-base font-medium text-[var(--color-brand-dark-gray)] hover:text-[var(--color-brand-blue)] hover:bg-[var(--color-brand-light)]"
              >
                {lang === 'en' ? link.labelEn : link.labelAr}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-[var(--color-brand-gray)]">
              <Link
                href={toggleLang()}
                className="block px-3 py-2 rounded-md text-base font-medium text-[var(--color-brand-dark-gray)] hover:text-[var(--color-brand-blue)] hover:bg-[var(--color-brand-light)]"
              >
                {lang === 'en' ? 'العربية (Arabic)' : 'English'}
              </Link>
              <Link
                href={`/${lang}/request-study`}
                className="mt-2 block w-full text-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[var(--color-brand-blue)] hover:bg-blue-700 transition-colors"
              >
                {lang === 'en' ? 'Request a Study' : 'طلب دراسة مشروع'}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
