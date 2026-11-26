import { useState, type MouseEvent, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/useReducedMotion';

interface LuxuryCardProps {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  featured?: boolean;
  delay?: number;
}

export function LuxuryCard({
  children,
  className = '',
  interactive = false,
  featured = false,
  delay = 0,
}: LuxuryCardProps) {
  const reduced = usePrefersReducedMotion();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!interactive || reduced) return;
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -py * 4, y: px * 4 });
  };

  const handleMouseLeave = () => {
    if (tilt.x !== 0 || tilt.y !== 0) setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: reduced ? 0 : 0.36,
        delay: reduced ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        interactive && !reduced
          ? {
              transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            }
          : undefined
      }
      className={`neon-panel rounded-2xl p-5 sm:p-6 ${
        interactive ? 'neon-panel-hover hover:-translate-y-0.5' : ''
      } ${
        featured
          ? 'border-metallicgold shadow-[0_14px_38px_-12px_rgba(212,175,55,0.38)]'
          : ''
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}
