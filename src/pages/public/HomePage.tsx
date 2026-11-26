import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Award,
  BookOpenCheck,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  FileCheck2,
  HelpCircle,
  Layers,
  Lock,
  Mail,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { BRAND, FEATURE_GATES } from '../../config/featureGates';
import {
  DEMO_MONTHLY_SCHEMES,
  DEMO_UPCOMING_ATTRACTIONS,
  SAMPLE_FAQS,
  SAMPLE_RESULTS_PLACEHOLDER,
} from '../../data/placeholderData';
import { SchemeCarousel } from '../../components/sections/SchemeCarousel';
import { WinnersGallery } from '../../components/sections/WinnersGallery';
import { TestimonialsSection } from '../../components/sections/TestimonialsSection';
import { GoldButton } from '../../components/ui/GoldButton';
import { SampleDataBadge } from '../../components/ui/Badges';
import { LegalGatePanel } from '../../components/ui/LegalGatePanel';
import { usePrefersReducedMotion } from '../../hooks/useReducedMotion';

const HERO_SLIDES = [
  {
    id: 'slide-1',
    badge: 'INFORMATIONAL ONLY',
    taglineLine: 'Informational Guide • Official Verification',
    subtitle: 'Your Window to Lottery Results',
    highlightLabel: 'Official Schedule & Gazette Guide',
    desc: 'Explore Kerala lottery schedules, scheme details, and official Gazette verification guides. Zero ticket sales or payments.',
  },
  {
    id: 'slide-2',
    badge: 'GAZETTE VERIFICATION GUIDE',
    taglineLine: 'Verify • Track • Stay Informed',
    subtitle: 'Check Published Results Safely',
    highlightLabel: 'Pending Legal Review',
    desc: 'Learn how official draw results and prize claims work under Kerala paper lottery rules.',
  },
];

const HERO_GOLD_PARTICLES = [
  { left: '12%', top: '18%', size: 4, delay: 0 },
  { left: '78%', top: '14%', size: 5, delay: 0.6 },
  { left: '88%', top: '42%', size: 3, delay: 1.1 },
  { left: '22%', top: '76%', size: 4, delay: 0.4 },
  { left: '66%', top: '82%', size: 5, delay: 1.4 },
  { left: '46%', top: '24%', size: 3, delay: 0.9 },
];

const QUICK_HIGHLIGHTS = [
  { label: 'Official Gazette Guide', sub: 'Verification steps', icon: FileCheck2, to: '/information-centre' },
  { label: 'Draw Calendar', sub: 'Upcoming schedules', icon: CalendarDays, to: '/draw-calendar' },
  { label: 'DPDP Privacy', sub: 'Winner protection', icon: Lock, to: '/privacy-policy' },
  { label: 'No Ticket Sales', sub: '100% Informational', icon: ShieldCheck, to: '/disclaimer' },
];

const CATEGORY_CARDS = [
  {
    title: 'Weekly Lotteries',
    desc: 'Weekly draw schedules, first prize details, and draw timings.',
    to: '/weekly-lotteries',
    accent: 'border-chillired/30',
    image: '/assets/weekly-lotteries.png',
  },
  {
    title: 'Monthly Lotteries',
    desc: 'Monthly draw schedules and informational prize tier summaries.',
    to: '/monthly-lotteries',
    accent: 'border-metallicgold/60',
    image: '/assets/monthly-lotteries.png',
  },
  {
    title: 'Special Lotteries',
    desc: 'Special & festive series guides with official draw schedules.',
    to: '/lotteries',
    accent: 'border-[#0E1738]/25',
    image: '/assets/special-lotteries.png',
  },
];

const HOW_TO_PLAY_STEPS = [
  {
    caption: 'Lottery Schemes',
    image: '/assets/how-to-play/step-01-schemes.png',
    imagePosition: 'center',
  },
  {
    caption: 'Draw Schedules',
    image: '/assets/how-to-play/step-02-schedule.png',
    imagePosition: 'center',
  },
  {
    caption: 'Browse Online',
    image: '/assets/how-to-play/step-03-browse-online.png',
    imagePosition: 'center',
  },
  {
    caption: 'Results Verification',
    image: '/assets/how-to-play/step-04-gazette.png',
    imagePosition: '58% center',
  },
  {
    caption: 'Prize Claims',
    image: '/assets/how-to-play/step-05-claim.png',
    imagePosition: '58% center',
  },
  {
    caption: 'Required Documents',
    image: '/assets/how-to-play/step-06-documents.png',
    imagePosition: 'center',
  },
];

export function HomePage() {
  const [heroSlide, setHeroSlide] = useState(0);
  const [winnerSlide, setWinnerSlide] = useState(0);
  const reduced = usePrefersReducedMotion();
  const activeHero = HERO_SLIDES[heroSlide];

  return (
    <div className="bg-[#FFFDF8]">
      {/* 4. Hero Section + Quick Highlights */}
      <section aria-label="NIDHI LOTTERY Hero" className="px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="grid overflow-hidden rounded-2xl border border-metallicgold/65 bg-[#4A060C] shadow-xl lg:grid-cols-12">
            {/* LEFT: Full-cover HD promotional photograph */}
            <div className="relative aspect-[1005/738] overflow-hidden bg-[#4A060C] lg:col-span-7 lg:aspect-auto lg:min-h-[450px]">
              <motion.img
                src="/assets/hero-banner-uploaded.jpg"
                alt="NIDHI LOTTERY promotional visual featuring a smiling woman, sewing machine, and lottery balls"
                width={1005}
                height={738}
                decoding="async"
                fetchPriority="high"
                initial={reduced ? false : { scale: 1.03 }}
                animate={reduced ? undefined : { scale: 1 }}
                transition={{ duration: 1.1, ease: 'easeOut' }}
                className="block h-full w-full select-none object-cover object-center"
              />
            </div>

            {/* RIGHT: Clean dark ruby red content panel with subtle gold lighting & particles */}
            <div className="relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#6B0D16] via-[#8E111E] to-[#4A060C] p-6 text-white sm:p-8 lg:col-span-5 lg:p-9">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-metallicgold/15 blur-2xl"
              />
              {!reduced &&
                HERO_GOLD_PARTICLES.map((p, idx) => (
                  <motion.span
                    key={idx}
                    aria-hidden="true"
                    style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
                    animate={{ y: [0, -10, 0], opacity: [0.3, 0.85, 0.3] }}
                    transition={{
                      duration: 3.6 + idx * 0.4,
                      delay: p.delay,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="pointer-events-none absolute rounded-full bg-metallicgold-light shadow-[0_0_8px_rgba(232,201,90,0.8)]"
                  />
                ))}

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeHero.id}
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: reduced ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10 space-y-4"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-metallicgold/65 bg-black/25 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-metallicgold">
                      {activeHero.badge}
                    </span>
                    <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold text-white">
                      Not Govt. Affiliated
                    </span>
                  </div>

                  <p className="font-display text-sm font-semibold text-metallicgold-light sm:text-base">
                    {activeHero.taglineLine}
                  </p>

                  <h1 className="font-display text-2xl font-bold leading-[1.12] text-white sm:text-3xl lg:text-[34px]">
                    {activeHero.subtitle}
                  </h1>

                  <p className="font-display text-xl font-bold text-metallicgold sm:text-2xl">
                    {activeHero.highlightLabel}
                  </p>

                  <p className="max-w-lg text-sm leading-relaxed text-white/90">{activeHero.desc}</p>

                  <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                    <GoldButton to="/results" variant="emerald" className="w-full sm:w-auto">
                      Latest Results <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </GoldButton>
                    <GoldButton to="/search" variant="outline" className="w-full sm:w-auto">
                      <Search className="h-4 w-4" aria-hidden="true" />
                      Global Search
                    </GoldButton>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="relative z-10 mt-6 flex items-center gap-3 border-t border-white/15 pt-4">
                <button
                  type="button"
                  onClick={() => setHeroSlide((s) => (s === 0 ? 1 : 0))}
                  aria-label="Previous hero slide"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/25 text-white transition-colors hover:border-metallicgold"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-2">
                  {HERO_SLIDES.map((s, idx) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setHeroSlide(idx)}
                      aria-label={`Hero banner slide ${idx + 1}`}
                      className={`h-2 rounded-full transition-all ${
                        heroSlide === idx ? 'w-6 bg-metallicgold' : 'w-2 bg-white/40'
                      }`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setHeroSlide((s) => (s === 0 ? 1 : 0))}
                  aria-label="Next hero slide"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/25 text-white transition-colors hover:border-metallicgold"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Highlights */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {QUICK_HIGHLIGHTS.map(({ label, sub, icon: Icon, to }) => (
              <Link
                key={label}
                to={to}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-metallicgold hover:shadow-md"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-chillired/10 text-chillired">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-charcoal">{label}</p>
                  <p className="text-xs text-slate-600">{sub}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Upcoming Attractions */}
      <section className="border-t border-slate-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SchemeCarousel
            title="Upcoming Attractions"
            viewAllTo="/lotteries"
            items={DEMO_UPCOMING_ATTRACTIONS}
            notchBgClass="bg-white"
          />
        </div>
      </section>

      {/* 6. Results Section */}
      <motion.section
        initial={reduced ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative isolate flex min-h-[40rem] items-center overflow-hidden border-y border-slate-200 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      >
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
          <div
            className="absolute inset-0 bg-cover bg-no-repeat bg-[position:92%_center] brightness-[1.18] contrast-[1.08] saturate-[1.08] sm:bg-[position:70%_center] lg:bg-center"
            style={{ backgroundImage: "url('/assets/golden-lottery-balls.png')" }}
          />
          <div className="absolute inset-0 bg-[#06142D]/15" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <div className="space-y-6 rounded-3xl border border-metallicgold/50 bg-[#07182E]/50 p-5 text-white shadow-[0_28px_80px_-38px_rgba(3,13,30,0.72)] backdrop-blur-sm sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-3xl font-bold text-white lg:text-[36px]">
                  Latest Results
                </h2>
                <p className="mt-1 text-sm text-slate-200">
                  Published draw archive and verification status.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <GoldButton to="/previous-results" variant="outline">
                  Previous Results
                </GoldButton>
                <GoldButton to="/results" variant="primary">
                  View All Results <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </GoldButton>
              </div>
            </div>

            {!FEATURE_GATES.PUBLIC_RESULTS && (
              <LegalGatePanel
                featureName="Published Results & Winning Numbers"
                flagName="VITE_FEATURE_PUBLIC_RESULTS"
                description="Real winning numbers remain disabled pending legal counsel review."
              />
            )}

            {SAMPLE_RESULTS_PLACEHOLDER.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center shadow-sm">
                <SampleDataBadge label="NO VERIFIED RECORDS AVAILABLE" />
                <h3 className="mt-2 font-display text-lg font-bold text-charcoal">
                  Information Coming Soon
                </h3>
                <p className="mx-auto mt-1 max-w-xl text-sm text-slate-600">
                  Official draw results and winning numbers will be displayed here only after Gazette
                  verification and legal clearance.
                </p>
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="space-y-1">
                    <SampleDataBadge label="PENDING LEGAL REVIEW" />
                    <h3 className="pt-1 font-display text-xl font-bold text-charcoal">
                      {SAMPLE_RESULTS_PLACEHOLDER[0].lotteryName}
                    </h3>
                    <p className="font-mono text-xs text-slate-600">
                      {SAMPLE_RESULTS_PLACEHOLDER[0].drawCode} •{' '}
                      {SAMPLE_RESULTS_PLACEHOLDER[0].drawDate}
                    </p>
                  </div>
                  <GoldButton to={`/results/${SAMPLE_RESULTS_PLACEHOLDER[0].id}`} variant="outline">
                    Open Result Detail
                  </GoldButton>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* 7. Lottery Categories Section */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-10">
          <div className="grid items-stretch gap-6 md:grid-cols-3">
            {CATEGORY_CARDS.map((cat) => (
              <Link
                key={cat.title}
                to={cat.to}
                className={`group relative flex h-full min-h-[14rem] flex-col overflow-hidden rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${cat.accent}`}
              >
                <span className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
                  <span
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ backgroundImage: `url('${cat.image}')` }}
                  />
                  <span className="absolute inset-0 bg-gradient-to-br from-[#06142D]/80 via-[#06142D]/60 to-[#06142D]/75" />
                </span>
                <div className="relative z-10 flex flex-1 flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <Layers className="h-6 w-6 text-metallicgold-light" aria-hidden="true" />
                    <h3 className="font-display text-xl font-bold text-white">{cat.title}</h3>
                    <p className="text-sm text-slate-100">{cat.desc}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-metallicgold-light">
                    Explore Category <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Winners Section (Celebration Preview + Winners Gallery) */}
      <section className="border-y border-slate-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="relative overflow-hidden rounded-2xl border border-metallicgold/60 bg-[#2D080E] p-6 text-white shadow-lg sm:p-8">
            <img
              src="/assets/winners-trophy-celebration.jpg"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-50"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#2D080E]/80 via-[#6D101B]/75 to-[#0E1738]/85" />
            <div className="relative z-10 flex flex-col items-center justify-between gap-6 md:flex-row">
              <div className="space-y-2 md:pl-20">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-metallicgold/25 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-metallicgold">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  Winner Celebration Preview
                </span>
                <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                  {winnerSlide === 0
                    ? 'Privacy-Protected Winner Showcase'
                    : 'DPDP Act 2023 Consent Verified'}
                </h2>
                <p className="max-w-xl text-sm text-white/90">
                  Real winner identities remain hidden and gated (`Pending Legal Review`) until
                  counsel clearance and written consent are recorded.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setWinnerSlide((s) => (s === 0 ? 1 : 0))}
                  aria-label="Previous celebration slide"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-black/25 text-white hover:border-metallicgold"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <GoldButton to="/winners" variant="emerald">
                  <Award className="h-4 w-4" aria-hidden="true" />
                  Winners Gallery
                </GoldButton>
                <button
                  type="button"
                  onClick={() => setWinnerSlide((s) => (s === 0 ? 1 : 0))}
                  aria-label="Next celebration slide"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-black/25 text-white hover:border-metallicgold"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <WinnersGallery />
        </div>
      </section>

      {/* 9. Testimonials Section */}
      <TestimonialsSection />

      {/* 10. Monthly Lottery Section */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SchemeCarousel
            title="Monthly Lotteries"
            viewAllTo="/monthly-lotteries"
            items={DEMO_MONTHLY_SCHEMES}
            notchBgClass="bg-[#FFFDF8]"
          />
        </div>
      </section>

      {/* 11. How to Play Lottery Section (Informational Guide) */}
      <section className="border-y border-slate-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-chillired/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-chillired">
              <BookOpenCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Informational Guide Only
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold text-charcoal lg:text-[36px]">
              How to Play Lottery
            </h2>
            <p className="mx-auto mt-1 max-w-2xl text-sm text-slate-600">
              Step-by-step informational guide to Kerala paper lottery schemes, offline purchases,
              Gazette verification, and statutory prize claims. No online ticket sales or payments.
            </p>
            <p
              id="how-to-play-image-note"
              role="note"
              className="mx-auto mt-4 max-w-4xl rounded-xl border border-metallicgold/40 bg-[#0E1738]/[0.03] px-4 py-3 text-xs leading-relaxed text-slate-600 sm:text-sm"
            >
              The images below are generated illustrations, not official government publications.
              Any seals, ticket details, dates, numbers, or prize amounts shown in them are fictional
              and unverified.
            </p>
          </div>

          <div className="grid auto-rows-fr items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
            {HOW_TO_PLAY_STEPS.map((item) => (
              <article
                key={item.caption}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-metallicgold/45 bg-[#0E1738] shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-metallicgold/75 hover:shadow-xl motion-reduce:transform-none motion-reduce:transition-none"
              >
                <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-[#07182E]">
                  <img
                    src={item.image}
                    alt={`Illustrative artwork for ${item.caption}`}
                    aria-describedby="how-to-play-image-note"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                    style={{ objectPosition: item.imagePosition }}
                  />
                  <span className="absolute right-3 top-3 rounded-full border border-white/50 bg-[#07182E]/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
                    Illustrative · Not Official
                  </span>
                </div>
                <p className="flex min-h-12 flex-1 items-center border-t border-metallicgold/25 px-4 py-3 text-sm font-semibold text-white">
                  {item.caption}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 12. How Lottery Information Works */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-charcoal lg:text-[36px]">
              How Lottery Information Works
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Official verification and prize claim guidance for Kerala paper lotteries.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col justify-between rounded-2xl bg-[#0E1738] p-6 text-white shadow-md">
              <div className="space-y-2">
                <BookOpenCheck className="h-7 w-7 text-metallicgold" aria-hidden="true" />
                <h3 className="font-display text-xl font-bold">Official Gazette Verification</h3>
                <p className="text-sm text-slate-300">
                  Always cross-check draw numbers with the official Kerala Government Gazette
                  before making any claim.
                </p>
              </div>
              <div className="pt-4">
                <GoldButton to="/information-centre" variant="emerald">
                  Open Information Centre
                </GoldButton>
              </div>
            </div>
            <div className="flex flex-col justify-between rounded-2xl border border-metallicgold/50 bg-white p-6 shadow-sm">
              <div className="space-y-2">
                <FileCheck2 className="h-7 w-7 text-chillired" aria-hidden="true" />
                <h3 className="font-display text-xl font-bold text-charcoal">
                  Prize Claim Procedure
                </h3>
                <p className="text-sm text-slate-600">
                  Learn about statutory claim timelines, required ID/PAN documents, and authorized
                  submission offices.
                </p>
              </div>
              <div className="pt-4">
                <GoldButton to="/information-centre" variant="outline">
                  Read Claim Guide
                </GoldButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 13. FAQ Section */}
      <section className="border-t border-slate-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-6">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-bold text-charcoal lg:text-[36px]">
              Frequently Asked Questions
            </h2>
            <Link to="/faq" className="text-sm font-bold text-chillired hover:underline">
              All FAQs →
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {SAMPLE_FAQS.slice(0, 4).map((faq) => (
              <div
                key={faq.id}
                className="rounded-2xl border border-slate-200 bg-[#FFFDF8] p-5 shadow-sm"
              >
                <h3 className="flex items-start gap-2 font-display text-sm font-bold text-charcoal">
                  <HelpCircle
                    className="mt-0.5 h-4 w-4 shrink-0 text-chillired"
                    aria-hidden="true"
                  />
                  {faq.question}
                </h3>
                <p className="mt-2 pl-6 text-sm text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. Support Section */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <div className="flex flex-col items-center justify-center space-y-4 rounded-2xl bg-[#0E1738] p-8 text-center text-white shadow-lg">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Talk to our support team
            </h2>
            <p className="max-w-sm text-sm text-slate-300">
              Got a question about {BRAND.name}? Get in touch with our informational support desk.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <GoldButton to="/contact" variant="primary">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Chat with us
              </GoldButton>
              <GoldButton to="/contact" variant="emerald">
                <Mail className="h-4 w-4" aria-hidden="true" />
                Email us
              </GoldButton>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center space-y-4 rounded-2xl border border-metallicgold/60 bg-gradient-to-br from-metallicgold-light via-metallicgold to-metallicgold-dark p-8 text-center text-charcoal shadow-lg">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              We would love to hear from you
            </h2>
            <p className="max-w-sm text-sm text-charcoal/85">
              Share feedback or explore our FAQ and Draw Calendar guides.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <GoldButton to="/contact" variant="primary">
                Give Feedback
              </GoldButton>
              <GoldButton to="/draw-calendar" variant="outline">
                Draw Calendar
              </GoldButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
