import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CalendarDays, ChevronLeft, ChevronRight, Crown, Pause, Play } from 'lucide-react';
import {
  DEMO_MONTHLY_SCHEMES,
  DEMO_SPECIAL_SCHEMES,
  DEMO_UPCOMING_ATTRACTIONS,
  type CarouselSchemeCard,
} from '../../data/placeholderData';
import { usePrefersReducedMotion } from '../../hooks/useReducedMotion';

interface SchemeCarouselProps {
  title: string;
  viewAllTo: string;
  items: CarouselSchemeCard[];
  notchBgClass?: string;
}

type SchemeFilterTab = 'ALL' | 'WEEKLY' | 'MONTHLY' | 'SPECIAL';

const ALL_SCHEMES: CarouselSchemeCard[] = [
  ...DEMO_UPCOMING_ATTRACTIONS,
  ...DEMO_MONTHLY_SCHEMES,
  ...DEMO_SPECIAL_SCHEMES,
];

const FILTER_TABS: { key: SchemeFilterTab; label: string; items: CarouselSchemeCard[] }[] = [
  { key: 'ALL', label: 'All Lotteries', items: ALL_SCHEMES },
  { key: 'WEEKLY', label: 'Weekly Lotteries', items: DEMO_UPCOMING_ATTRACTIONS },
  { key: 'MONTHLY', label: 'Monthly Lotteries', items: DEMO_MONTHLY_SCHEMES },
  { key: 'SPECIAL', label: 'Special Lotteries', items: DEMO_SPECIAL_SCHEMES },
];

export function TicketSchemeCard({
  item,
  index,
  isActive = false,
  notchBgClass = 'bg-[#FFFDF8]',
  className = '',
}: {
  item: CarouselSchemeCard;
  index: number;
  isActive?: boolean;
  notchBgClass?: string;
  className?: string;
}) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: reducedMotion ? 0 : 0.3,
        delay: reducedMotion ? 0 : index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group flex h-full flex-col overflow-hidden rounded-2xl shadow-md transition-all duration-200 hover:-translate-y-1.5 hover:shadow-xl ${
        isActive ? 'ring-2 ring-metallicgold' : ''
      } ${className}`}
    >
      {/* Upper Two-Tone Block: Scheme Name & First Prize */}
      <div className={`flex flex-1 flex-col justify-between p-5 text-center ${item.topColor}`}>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2 text-[11px] font-semibold uppercase tracking-wider opacity-90">
            <span className="inline-flex items-center gap-1">
              <Crown className="h-3.5 w-3.5 text-metallicgold-light" aria-hidden="true" />
              NIDHI LOTTERY
            </span>
            <span className="rounded-full bg-black/20 px-2 py-0.5 text-[10px] font-bold">
              {item.badgeLabel}
            </span>
          </div>
          <h3 className="font-display text-base font-bold leading-snug">{item.title}</h3>
        </div>

        <div className="mt-4 border-t border-white/20 pt-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider opacity-85">
            First Prize
          </p>
          <p className="mt-1 font-display text-[26px] font-bold leading-tight tabular-nums sm:text-[28px]">
            {item.prizeDemoLabel}
          </p>
        </div>
      </div>

      {/* Semi-Circular Cutouts + White Dashed Perforation Line */}
      <div className={`relative flex items-center ${item.topColor}`}>
        <span
          aria-hidden="true"
          className={`absolute -left-3 z-10 h-6 w-6 rounded-full ${notchBgClass}`}
        />
        <div className="w-full border-t-2 border-dashed border-white/85" />
        <span
          aria-hidden="true"
          className={`absolute -right-3 z-10 h-6 w-6 rounded-full ${notchBgClass}`}
        />
      </div>

      {/* Lower Two-Tone Block: Informational Details & Action */}
      <div className={`flex flex-col items-center justify-between gap-3 p-5 text-center ${item.bottomColor}`}>
        <div className="space-y-1 text-xs font-medium">
          <p className="flex items-center justify-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>
              Draw: {item.drawDateLabel} • {item.drawTimeLabel}
            </span>
          </p>
          <p className="text-[11px] font-semibold opacity-90">
            Ticket Price: {item.ticketPriceDemo}
          </p>
        </div>

        <Link
          to={`/lotteries/${item.slug}`}
          className={`inline-flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-full px-4 py-2 font-display text-xs font-bold shadow-sm transition-all duration-200 group-hover:shadow-md ${
            item.buttonColor ?? 'bg-chillired text-white hover:bg-chillired-dark'
          }`}
        >
          {item.ctaLabel}
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </motion.article>
  );
}

export function LotterySchemesSection() {
  const [activeTab, setActiveTab] = useState<SchemeFilterTab>('ALL');
  const reducedMotion = usePrefersReducedMotion();
  const currentGroup = FILTER_TABS.find((t) => t.key === activeTab) ?? FILTER_TABS[0];

  return (
    <div className="space-y-8">
      {/* Category Header: Clean light cream/white, centered title, Weekly / Monthly / Special pills */}
      <div className="rounded-2xl border border-slate-200/80 bg-white px-4 py-6 text-center shadow-sm sm:px-6">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFFDF8] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-chillired ring-1 ring-chillired/20">
          <Crown className="h-3.5 w-3.5 text-metallicgold-dark" aria-hidden="true" />
          Informational Scheme Guide
        </span>
        <h2 className="mt-2 font-display text-3xl font-bold text-charcoal lg:text-[36px]">
          Lotteries
        </h2>
        <p className="mx-auto mt-1 max-w-xl text-sm text-slate-600">
          Explore weekly, monthly, and special draw schedules. Zero ticket sales or payments.
        </p>

        <div
          role="tablist"
          aria-label="Filter lottery schemes by category"
          className="mt-5 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-slate-200 bg-[#FFFDF8] p-1.5"
        >
          {FILTER_TABS.map((tab) => {
            const selected = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveTab(tab.key)}
                className={`relative min-h-[44px] rounded-full px-5 py-2 font-display text-sm font-semibold transition-colors ${
                  selected ? 'text-white' : 'text-charcoal hover:text-chillired'
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="schemeFilterPill"
                    transition={
                      reducedMotion
                        ? { duration: 0 }
                        : { type: 'spring', stiffness: 380, damping: 30 }
                    }
                    className="absolute inset-0 rounded-full bg-chillired shadow-sm"
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Responsive 4-Column Ticket Card Grid or Empty State */}
      <AnimatePresence mode="wait">
        {currentGroup.items.length === 0 ? (
          <motion.div
            key={`${currentGroup.key}-empty`}
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: reducedMotion ? 0 : 0.22, ease: 'easeOut' }}
            className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm"
          >
            <p className="font-display text-lg font-bold text-charcoal">Information Coming Soon</p>
            <p className="mx-auto mt-1 max-w-xl text-sm text-slate-600">
              No verified {currentGroup.label.toLowerCase()} records are currently available.
              Schedules and prize details will appear here once officially confirmed.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key={currentGroup.key}
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: reducedMotion ? 0 : 0.22, ease: 'easeOut' }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {currentGroup.items.map((item, idx) => (
              <TicketSchemeCard
                key={item.id}
                item={item}
                index={idx}
                notchBgClass="bg-[#FFFDF8]"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-center">
        <Link
          to="/lotteries"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-charcoal/30 bg-white px-7 py-2.5 font-display text-sm font-semibold text-charcoal shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-chillired hover:bg-chillired hover:text-white"
        >
          View All Schemes
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

export function SchemeCarousel({
  title,
  viewAllTo,
  items,
  notchBgClass = 'bg-[#FFFDF8]',
}: SchemeCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [paused, setPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const isAutoPlaying = !reducedMotion && !paused;

  useEffect(() => {
    if (!isAutoPlaying || items.length <= 1) return;
    const timer = window.setInterval(() => {
      if (typeof document !== 'undefined' && document.visibilityState !== 'visible') return;
      setActiveIndex((prev) => {
        const next = (prev + 1) % items.length;
        if (trackRef.current) {
          const cardWidth = trackRef.current.firstElementChild?.clientWidth ?? 272;
          trackRef.current.scrollTo({ left: next * (cardWidth + 16), behavior: 'smooth' });
        }
        return next;
      });
    }, 4500);
    return () => window.clearInterval(timer);
  }, [isAutoPlaying, items.length]);

  const scrollToIdx = (idx: number) => {
    const safe = (idx + items.length) % items.length;
    setActiveIndex(safe);
    if (trackRef.current) {
      const cardWidth = trackRef.current.firstElementChild?.clientWidth ?? 272;
      trackRef.current.scrollTo({
        left: safe * (cardWidth + 16),
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div className="w-8 sm:w-24" />
        <h2 className="flex items-center justify-center gap-2 text-center font-display text-2xl font-bold text-charcoal sm:text-3xl">
          <Crown className="h-5 w-5 text-metallicgold-dark" aria-hidden="true" />
          {title}
        </h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? `Resume ${title}` : `Pause ${title}`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-charcoal hover:border-chillired"
          >
            {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
          </button>
          <button
            type="button"
            onClick={() => scrollToIdx(activeIndex - 1)}
            aria-label={`Previous ${title}`}
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-charcoal hover:border-chillired sm:inline-flex"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollToIdx(activeIndex + 1)}
            aria-label={`Next ${title}`}
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-charcoal hover:border-chillired sm:inline-flex"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-[#FFFDF8] p-8 text-center">
          <p className="font-display text-base font-bold text-charcoal">Information Coming Soon</p>
          <p className="mx-auto mt-1 max-w-xl text-sm text-slate-600">
            No verified records available for {title.toLowerCase()} at this time.
          </p>
        </div>
      ) : (
        <div
          ref={trackRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible"
        >
          {items.map((item, idx) => (
            <TicketSchemeCard
              key={item.id}
              item={item}
              index={idx}
              isActive={idx === activeIndex}
              notchBgClass={notchBgClass}
              className="w-[272px] shrink-0 snap-start lg:w-full"
            />
          ))}
        </div>
      )}

      <div className="flex justify-center">
        <Link
          to={viewAllTo}
          className="inline-flex min-h-[44px] items-center rounded-full border border-charcoal/40 bg-white px-6 py-2 text-xs font-bold text-charcoal transition-colors hover:border-chillired hover:bg-chillired hover:text-white"
        >
          View All
        </Link>
      </div>
    </div>
  );
}
