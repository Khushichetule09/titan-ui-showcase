'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

let lenisInstance: Lenis | null = null;
let rafId: number | null = null;

export default function LenisScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Lenis only once globally
    if (lenisInstance) return;

    lenisInstance = new Lenis({
      duration: 1.0, // Optimal duration in 0.9-1.1 range
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothWheel: true, // Enable smooth wheel scrolling
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      syncTouch: false,
    });

    const raf = (time: number) => {
      lenisInstance?.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      // Keep Lenis instance to avoid reinit
    };
  }, []);

  return <>{children}</>;
}
