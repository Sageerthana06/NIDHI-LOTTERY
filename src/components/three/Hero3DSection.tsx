import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion, useWebGLSupport } from '../../hooks/useReducedMotion';
import { Hero3DFallback } from './Hero3DFallback';

const LuxuryHeroCanvas = lazy(() => import('./LuxuryHeroCanvas'));

export function Hero3DSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);
  const [isTabVisible, setIsTabVisible] = useState(
    typeof document !== 'undefined' ? document.visibilityState === 'visible' : true,
  );
  const reducedMotion = usePrefersReducedMotion();
  const webglSupported = useWebGLSupport();

  useEffect(() => {
    const onVisibility = () => setIsTabVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const shouldRender3D = webglSupported && !reducedMotion;

  return (
    <div
      ref={containerRef}
      className="relative h-[240px] w-full overflow-hidden rounded-3xl border border-metallicgold/65 bg-gradient-to-br from-[#FFF9E6] via-white to-[#FDF0F1] shadow-[0_18px_42px_-14px_rgba(194,24,37,0.2)] sm:h-[320px] lg:h-[360px]"
    >
      {shouldRender3D ? (
        <Suspense fallback={<Hero3DFallback />}>
          <LuxuryHeroCanvas isVisible={isInView && isTabVisible} />
        </Suspense>
      ) : (
        <Hero3DFallback />
      )}
    </div>
  );
}
