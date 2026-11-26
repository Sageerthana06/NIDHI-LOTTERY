import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileBottomNav } from './MobileBottomNav';
import { usePrefersReducedMotion } from '../../hooks/useReducedMotion';

export function PublicLayout({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen flex-col bg-lightbg text-charcoal">
      <Header />
      <motion.main
        key={pathname}
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
