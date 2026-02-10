'use client';

import { useEffect } from 'react';

let targetScroll = 0;
let currentScroll = 0;
let rafId: number | null = null;
let isInitialized = false;

const easeOutCubic = (t: number): number => {
  return 1 - Math.pow(1 - t, 3);
};

export default function LenisScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize only once
    if (isInitialized) return;
    isInitialized = true;

    let lastTime = Date.now();
    const friction = 0.15; // Smooth scroll friction (0-1, lower = smoother)

    const handleWheel = (e: WheelEvent) => {
      targetScroll += e.deltaY;
      targetScroll = Math.max(0, Math.min(targetScroll, document.documentElement.scrollHeight - window.innerHeight));
    };

    const animate = () => {
      const now = Date.now();
      const deltaTime = Math.min(now - lastTime, 16);
      lastTime = now;

      // Smooth interpolation towards target scroll
      const diff = targetScroll - currentScroll;
      const step = diff * friction;
      currentScroll += step;

      // Apply scroll position
      window.scrollTo(0, currentScroll);

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (rafId !== null) cancelAnimationFrame(rafId);
      isInitialized = false;
    };
  }, []);

  return <>{children}</>;
}
