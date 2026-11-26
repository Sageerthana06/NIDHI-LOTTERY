import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../../hooks/useReducedMotion';

interface CountUpValueProps {
  end: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
}

export function CountUpValue({
  end,
  decimals = 0,
  prefix = '',
  suffix = '',
  durationMs = 900,
}: CountUpValueProps) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<number>(reduced ? end : 0);
  const [started, setStarted] = useState<boolean>(reduced);

  useEffect(() => {
    if (reduced) {
      setDisplay(end);
      return;
    }
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setStarted(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, reduced]);

  useEffect(() => {
    if (!started || reduced) return;
    let rafId = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(end * eased);
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [started, end, durationMs, reduced]);

  return (
    <span ref={ref} className="tabular-nums-strict">
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
