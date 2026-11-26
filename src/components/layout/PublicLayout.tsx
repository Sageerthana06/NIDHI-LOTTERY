import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileBottomNav } from './MobileBottomNav';
import { usePrefersReducedMotion } from '../../hooks/useReducedMotion';

function decodeHashTarget(hash: string): string {
  try {
    return decodeURIComponent(hash.slice(1));
  } catch {
    return hash.slice(1);
  }
}

export function PublicLayout({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();
  const location = useLocation();
  const navigationType = useNavigationType();
  const scrollPositions = useRef(new Map<string, number>());
  const activeLocationKey = useRef(location.key);
  const previousLocation = useRef(location);

  useLayoutEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    const saveScrollPosition = () => {
      scrollPositions.current.set(activeLocationKey.current, window.scrollY);
    };

    window.addEventListener('scroll', saveScrollPosition, { passive: true });
    return () => {
      window.removeEventListener('scroll', saveScrollPosition);
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);

  useLayoutEffect(() => {
    const previous = previousLocation.current;
    activeLocationKey.current = location.key;

    if (navigationType === 'POP') {
      const savedPosition = scrollPositions.current.get(location.key);
      if (savedPosition !== undefined) {
        window.scrollTo(0, savedPosition);
      } else if (location.hash) {
        const targetId = decodeHashTarget(location.hash);
        window.requestAnimationFrame(() => {
          document.getElementById(targetId)?.scrollIntoView();
        });
      } else {
        window.scrollTo(0, 0);
      }
    } else if (
      location.pathname === previous.pathname &&
      location.search === previous.search &&
      location.hash !== previous.hash &&
      location.hash
    ) {
      const targetId = decodeHashTarget(location.hash);
      window.requestAnimationFrame(() => {
        document.getElementById(targetId)?.scrollIntoView();
      });
    } else {
      window.scrollTo(0, 0);
    }

    previousLocation.current = location;
  }, [location.key, location.pathname, location.search, location.hash, navigationType]);

  return (
    <div className="flex min-h-screen flex-col bg-lightbg text-charcoal">
      <Header />
      <motion.main
        key={location.pathname}
        className="flex-1"
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reducedMotion ? 0 : 0.2, ease: 'easeOut' }}
      >
        {children}
      </motion.main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
