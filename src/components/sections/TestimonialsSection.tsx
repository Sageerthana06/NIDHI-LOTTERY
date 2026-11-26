import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { DEMO_TESTIMONIALS } from '../../data/placeholderData';
import { usePrefersReducedMotion } from '../../hooks/useReducedMotion';

export function TestimonialsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIdx = (idx: number) => {
    const safe = (idx + DEMO_TESTIMONIALS.length) % DEMO_TESTIMONIALS.length;
    setActiveIndex(safe);
    if (trackRef.current) {
      const cardWidth = trackRef.current.firstElementChild?.clientWidth ?? 300;
      trackRef.current.scrollTo({
        left: safe * (cardWidth + 16),
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
    }
  };

  return (
    <section className="border-b border-metallicgold/30 bg-gradient-to-br from-[#FBF7E9] via-ivory to-[#FDF0F1] px-3 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="inline-block rounded-full border border-metallicgold/60 bg-metallicgold/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-royalred">
              Reader Feedback
            </span>
            <h2 className="font-display text-2xl font-bold text-charcoal sm:text-3xl">
              What People Say About Us
            </h2>
            <p className="text-xs text-slate-600 sm:text-sm">
              Experiences and feedback about the NIDHI LOTTERY information platform.
            </p>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollToIdx(activeIndex - 1)}
              aria-label="Previous testimonial"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-metallicgold/50 bg-white text-charcoal shadow-sm transition-colors hover:border-royalred hover:text-royalred"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollToIdx(activeIndex + 1)}
              aria-label="Next testimonial"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-metallicgold/50 bg-white text-charcoal shadow-sm transition-colors hover:border-royalred hover:text-royalred"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {DEMO_TESTIMONIALS.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-metallicgold/50 bg-white p-8 text-center shadow-sm">
            <p className="font-display text-base font-bold text-charcoal">
              No Verified Records Available
            </p>
            <p className="mx-auto mt-1 max-w-xl text-sm text-slate-600">
              Verified reader feedback will be displayed here once collected and approved.
            </p>
          </div>
        ) : (
          <div
            ref={trackRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
          >
            {DEMO_TESTIMONIALS.map((item, idx) => (
              <motion.article
                key={item.id}
                initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: reducedMotion ? 0 : 0.3, delay: reducedMotion ? 0 : idx * 0.06 }}
                className="light-card light-card-hover flex w-[260px] shrink-0 snap-start flex-col justify-between gap-4 rounded-2xl bg-white p-5 sm:w-[340px]"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <Quote className="h-6 w-6 text-neonpurple/45" aria-hidden="true" />
                  </div>
                  <p className="text-sm leading-relaxed text-slate-700">&ldquo;{item.quote}&rdquo;</p>
                </div>

                <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-royalred to-deepteal text-xs font-bold text-white">
                      {item.initials}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-charcoal">{item.displayName}</p>
                      <p className="text-[11px] text-slate-500">{item.roleLabel}</p>
                    </div>
                  </div>

                  {typeof item.verifiedRating === 'number' && (
                    <div className="flex items-center gap-0.5 text-goldyellow" aria-label={`Verified rating ${item.verifiedRating} out of 5`}>
                      {Array.from({ length: item.verifiedRating }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                      ))}
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        )}

        <div className="flex items-center justify-center gap-1.5">
          {DEMO_TESTIMONIALS.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToIdx(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                activeIndex === idx ? 'w-5 bg-neonpurple' : 'w-1.5 bg-indigo-200'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
