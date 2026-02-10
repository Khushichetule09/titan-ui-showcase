'use client';

import { useEffect } from 'react';

export default function LenisScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Lightweight smooth scroll for preview stability
    if (typeof window === 'undefined') return;

    let targetScroll = window.scrollY;
    let currentScroll = window.scrollY;
    let isAnimating = false;
    let rafId: number | null = null;

    const friction = 0.1; // 0-1, lower = smoother but slower
    const minDelta = 0.5; // Threshold to stop animating

    const handleWheel = (e: WheelEvent) => {
      targetScroll = Math.max(
        0,
        Math.min(targetScroll + e.deltaY, document.documentElement.scrollHeight - window.innerHeight)
      );
      isAnimating = true;
    };

    const animate = () => {
      const diff = targetScroll - currentScroll;

      if (Math.abs(diff) > minDelta) {
        currentScroll += diff * friction;
        window.scrollTo(0, currentScroll);
        rafId = requestAnimationFrame(animate);
      } else {
        currentScroll = targetScroll;
        window.scrollTo(0, currentScroll);
        isAnimating = false;
      }
    };

    const handleScroll = () => {
      if (!isAnimating) {
        targetScroll = window.scrollY;
        currentScroll = window.scrollY;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return <>{children}</>;
}
