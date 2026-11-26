import { motion } from 'framer-motion';
import { Sparkles, Star } from 'lucide-react';
import { usePrefersReducedMotion } from '../../hooks/useReducedMotion';

const ART_BALLS = [
  {
    num: '07',
    bg: 'bg-[radial-gradient(circle_at_30%_28%,#F25C69_0%,#C21825_58%,#7A0A14_100%)]',
    ring: 'ring-metallicgold/75',
    size: 'h-16 w-16 sm:h-20 sm:w-20 text-lg sm:text-xl',
    pos: '-translate-y-2',
  },
  {
    num: '18',
    bg: 'bg-[radial-gradient(circle_at_30%_28%,#FFFFFF_0%,#F4EBD0_60%,#C9B27C_100%)]',
    ring: 'ring-chillired/45',
    size: 'h-14 w-14 sm:h-16 sm:w-16 text-base sm:text-lg',
    pos: 'translate-y-4',
    darkText: true,
  },
  {
    num: '32',
    bg: 'bg-[radial-gradient(circle_at_30%_28%,#FFF3B0_0%,#D4AF37_55%,#8E6F12_100%)]',
    ring: 'ring-chillired/50',
    size: 'h-20 w-20 sm:h-24 sm:w-24 text-xl sm:text-2xl',
    pos: '-translate-y-4',
    darkText: true,
  },
  {
    num: '45',
    bg: 'bg-[radial-gradient(circle_at_30%_28%,#F25C69_0%,#C21825_58%,#7A0A14_100%)]',
    ring: 'ring-white',
    size: 'h-14 w-14 sm:h-16 sm:w-16 text-base sm:text-lg',
    pos: 'translate-y-3',
  },
  {
    num: '50',
    bg: 'bg-[radial-gradient(circle_at_30%_28%,#C21825_0%,#8F0F1A_60%,#4D060C_100%)]',
    ring: 'ring-metallicgold/75',
    size: 'h-16 w-16 sm:h-18 sm:w-18 text-base sm:text-lg',
    pos: '-translate-y-1',
  },
];

export function Hero3DFallback() {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="relative flex h-full min-h-[230px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#FFF9E6] via-white to-[#FDF0F1] p-5">
      <div className="pointer-events-none absolute -left-8 -top-8 h-36 w-36 rounded-full bg-metallicgold/25 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-8 -right-8 h-36 w-36 rounded-full bg-chillired/15 blur-2xl" />

      <Star
        className="pointer-events-none absolute left-6 top-6 h-5 w-5 fill-metallicgold/60 text-metallicgold"
        aria-hidden="true"
      />
      <Sparkles
        className="pointer-events-none absolute bottom-6 right-6 h-5 w-5 text-royalred/50"
        aria-hidden="true"
      />

      <div className="relative z-10 flex items-center justify-center gap-2.5 sm:gap-4">
        {ART_BALLS.map((b, i) => (
          <motion.div
            key={b.num}
            animate={reduced ? undefined : { y: [0, -6, 0] }}
            transition={
              reduced
                ? undefined
                : { duration: 3.2 + i * 0.35, repeat: Infinity, ease: 'easeInOut' }
            }
            className={`relative flex shrink-0 items-center justify-center rounded-full ring-2 ${b.bg} ${b.ring} ${b.size} ${b.pos} shadow-[0_14px_26px_-8px_rgba(6,78,74,0.38)]`}
          >
            <span
              className={`flex h-[54%] w-[54%] items-center justify-center rounded-full bg-white/95 font-mono font-bold shadow-inner ${
                b.darkText ? 'text-royalred' : 'text-charcoal'
              }`}
            >
              {b.num}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 h-2 w-48 rounded-full bg-gradient-to-r from-transparent via-metallicgold/35 to-transparent blur-sm" />
    </div>
  );
}
