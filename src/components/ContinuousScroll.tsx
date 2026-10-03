'use client';

import { useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const mainPages = [
  '',
  '/solutions',
  '/products',
  '/projects',
  '/services',
  '/about'
];

export function ContinuousScroll({ lang }: { lang: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const isNavigating = useRef(false);
  
  // Track scroll and touch
  const touchStartY = useRef(0);
  const touchCurrentY = useRef(0);
  const isAtTopStart = useRef(false);
  const isAtBottomStart = useRef(false);

  // Wheel tracking
  const wheelAccumulator = useRef(0);

  useEffect(() => {
    isNavigating.current = false;
    wheelAccumulator.current = 0;
    
    const scrollDirection = sessionStorage.getItem('scrollDirection');
    if (scrollDirection) {
      sessionStorage.removeItem('scrollDirection');
      if (scrollDirection === 'up') {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' });
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }

    // Resolve the view transition AFTER scrolling, so the captured new state is correct
    if (typeof window !== 'undefined' && (window as any).__resolveTransition) {
      // Small delay to let Next.js render pass complete
      requestAnimationFrame(() => {
        (window as any).__resolveTransition();
        delete (window as any).__resolveTransition;
      });
    }
  }, [pathname]);

  useEffect(() => {
    // Generate full paths for current language
    const paths = mainPages.map(p => `/${lang}${p}`);
    
    // Normalize pathname (remove trailing slash if present)
    const normalizedPathname = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
    
    // Find current index
    const currentIndex = paths.findIndex(p => p === normalizedPathname || `${p}/` === normalizedPathname);
    
    if (currentIndex === -1) return;

    const prevPage = currentIndex > 0 ? paths[currentIndex - 1] : null;
    const nextPage = currentIndex < paths.length - 1 ? paths[currentIndex + 1] : null;

    const navigateTo = (path: string, direction: 'up' | 'down') => {
      if (isNavigating.current) return;
      isNavigating.current = true;
      sessionStorage.setItem('scrollDirection', direction);
      
      const doc = document as any;
      if (!doc.startViewTransition) {
        router.push(path, { scroll: false });
        return;
      }

      document.documentElement.setAttribute('data-transition-direction', direction);
      
      doc.startViewTransition(async () => {
        router.push(path, { scroll: false });
        // Wait for Next.js to update the DOM before finishing the transition setup
        await new Promise<void>(resolve => {
          (window as any).__resolveTransition = resolve;
          // Fallback in case Next.js routing fails or takes too long
          setTimeout(resolve, 1500);
        });
      });
    };

    const handleWheel = (e: WheelEvent) => {
      if (isNavigating.current) return;
      
      const isAtTop = window.scrollY <= 0;
      const isAtBottom = Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight - 5;

      if (isAtTop && e.deltaY < 0 && prevPage) {
        wheelAccumulator.current += Math.abs(e.deltaY);
        if (wheelAccumulator.current > 150) {
          navigateTo(prevPage, 'up');
        }
      } else if (isAtBottom && e.deltaY > 0 && nextPage) {
        wheelAccumulator.current += Math.abs(e.deltaY);
        if (wheelAccumulator.current > 150) {
          navigateTo(nextPage, 'down');
        }
      } else {
        // Reset if scrolling within the page
        wheelAccumulator.current = 0;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      touchCurrentY.current = e.touches[0].clientY;
      wheelAccumulator.current = 0;
      
      isAtTopStart.current = window.scrollY <= 0;
      isAtBottomStart.current = Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight - 5;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isNavigating.current) return;
      touchCurrentY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      if (isNavigating.current) return;

      const deltaY = touchCurrentY.current - touchStartY.current;

      // Positive deltaY means swipe down (pulling page down, intending to go up a page)
      // Negative deltaY means swipe up (pulling page up, intending to go down a page)

      if (isAtTopStart.current && deltaY > 100 && prevPage) {
        navigateTo(prevPage, 'up');
      } else if (isAtBottomStart.current && deltaY < -100 && nextPage) {
        navigateTo(nextPage, 'down');
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [pathname, lang, router]);

  return null;
}
