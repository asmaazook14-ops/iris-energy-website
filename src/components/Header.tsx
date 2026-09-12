'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export function Header({ lang }: { lang: 'en' | 'ar' }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isEn = lang === 'en';

  useEffect(() => {
    // Close mobile menu on route change
    // eslint-disable-next-line
    setIsOpen(false);
  }, [pathname]);

  const toggleLang = () => {
    const targetLang = lang === 'en' ? 'ar' : 'en';
    const cleanPath = pathname.replace(`/${lang}`, '') || '/';
    return `/${targetLang}${cleanPath === '/' ? '' : cleanPath}`;
  };

  const primaryLinks = [
    { href: '/solutions', label: isEn ? 'Solutions' : 'الحلول' },
    { href: '/products', label: isEn ? 'Products' : 'المنتجات' },
    { href: '/projects', label: isEn ? 'Projects' : 'المشاريع' },
    { href: '/services', label: isEn ? 'Engineering Process' : 'العملية الهندسية' },
    { href: '/about', label: isEn ? 'About' : 'من نحن' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0B192C] backdrop-blur-lg border-b border-white/10 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href={`/${lang}`} className="flex-shrink-0 flex items-center">
              <Image 
                src="/logo.png" 
                alt="IRIS Energy Logo" 
                width={150} 
                height={51} 
                className="h-10 w-auto" 
                priority 
              />
            </Link>
          </div>
          
          <nav className="hidden lg:flex space-x-8 rtl:space-x-reverse h-full items-center">
            {primaryLinks.map((link) => (
              <Link 
                key={link.href}
                href={`/${lang}${link.href}`}
                className="text-sm font-semibold text-slate-300 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-6 rtl:space-x-reverse">
            <Link 
              href={toggleLang()}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors uppercase tracking-wider"
            >
              {isEn ? 'عربي' : 'EN'}
            </Link>
            <Link 
              href={`/${lang}/request-study`}
              className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-bold rounded-lg text-white bg-[var(--color-brand-blue)] hover:bg-blue-700 transition-colors shadow-lg"
            >
              {isEn ? 'Request a Technical Study' : 'طلب دراسة فنية'}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <Link 
              href={toggleLang()}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors uppercase tracking-wider mr-4 rtl:mr-0 rtl:ml-4"
            >
              {isEn ? 'عربي' : 'EN'}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-white/5 focus:outline-none transition-colors"
              aria-expanded={isOpen}
            >
              <span className="sr-only">{isEn ? 'Open main menu' : 'فتح القائمة الرئيسية'}</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-[#0B192C] border-b border-white/10 shadow-xl overflow-y-auto max-h-[calc(100vh-80px)]">
          <div className="px-4 pt-4 pb-6 space-y-4">
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${lang}${link.href}`}
                className="block px-3 py-3 rounded-md text-base font-bold text-white hover:bg-white/5 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-6 border-t border-white/10">
              <Link 
                href={`/${lang}/request-study`}
                className="w-full flex justify-center items-center px-4 py-4 border border-transparent text-base font-bold rounded-lg text-white bg-[var(--color-brand-blue)] hover:bg-blue-700 transition-colors shadow-lg"
              >
                {isEn ? 'Request a Technical Study' : 'طلب دراسة فنية'}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
