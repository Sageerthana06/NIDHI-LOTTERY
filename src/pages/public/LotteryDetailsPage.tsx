import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  Clock,
  Crown,
  ExternalLink,
  FileCheck2,
  FileText,
  Grid3X3,
  HelpCircle,
  Info,
  Scale,
  ShieldCheck,
  Ticket,
  Trophy,
} from 'lucide-react';
import {
  DEMO_MONTHLY_SCHEMES,
  DEMO_SPECIAL_SCHEMES,
  DEMO_UPCOMING_ATTRACTIONS,
  SAMPLE_LOTTERIES,
  SAMPLE_RESULTS_PLACEHOLDER,
} from '../../data/placeholderData';
import { BRAND } from '../../config/featureGates';
import { GoldButton } from '../../components/ui/GoldButton';
import { NonGovBadge, SampleDataBadge } from '../../components/ui/Badges';
import { usePrefersReducedMotion } from '../../hooks/useReducedMotion';

const ALL_LOTTERY_CARDS = [
  ...DEMO_UPCOMING_ATTRACTIONS,
  ...DEMO_MONTHLY_SCHEMES,
  ...DEMO_SPECIAL_SCHEMES,
];

const IMPORTANT_RULES = [
  {
    title: 'Prize Claim Procedures & Deadlines',
    detail:
      'Prize claims must be submitted directly to the authorized State Lottery Directorate or designated bank/office within the statutory claim window printed on the official ticket and Government Gazette.',
    icon: CheckCircle2,
  },
  {
    title: 'Required Documents',
    detail:
      'Claimants typically require the original intact winning ticket (signed on the reverse), a valid government-issued photo ID, PAN card, passport-size photographs, and the official claim form of the issuing authority.',
    icon: FileText,
  },
  {
    title: 'Tax Deductions',
    detail:
      'Lottery winnings exceeding the statutory threshold are subject to Tax Deducted at Source (TDS) under Section 194B of the Income Tax Act, 1961, as administered by the issuing authority.',
    icon: Scale,
  },
  {
    title: 'Ticket Validity & Draw Date Changes',
    detail:
      'Damaged, torn, or altered tickets are invalid under standard paper lottery regulations. Official draw dates or timings may be revised by the issuing State authority through formal public notice.',
    icon: Info,
  },
];

const OFFICIAL_AUTHORITY_LINKS = [
  {
    label: 'Directorate of Kerala State Lotteries (Official Website)',
    href: 'https://statelottery.kerala.gov.in/',
    desc: 'Authorized source for official Kerala lottery schedules, rules, and Gazette notifications.',
  },
  {
    label: 'Lotteries (Regulation) Act, 1998 — India Code',
    href: 'https://www.indiacode.nic.in/',
    desc: 'Central legislation governing state-organized paper lotteries across India.',
  },
];

export function LotteryDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const reduced = usePrefersReducedMotion();
  const [showAllNumbers, setShowAllNumbers] = useState(false);

  const cardMatch = ALL_LOTTERY_CARDS.find((c) => c.slug === slug);
  const legacyMatch = SAMPLE_LOTTERIES.find((l) => l.slug === slug);

  if (!cardMatch && !legacyMatch) {
    return (
      <div className="min-h-[75vh] bg-[#FFFDF8] py-12">
        <div className="mx-auto max-w-4xl space-y-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <GoldButton to="/lotteries" variant="outline" className="px-5">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Lotteries
            </GoldButton>
            <NonGovBadge />
          </div>
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
            <SampleDataBadge label="NO VERIFIED RECORDS AVAILABLE" />
            <h1 className="mt-3 font-display text-2xl font-bold text-charcoal sm:text-3xl">
              Information Coming Soon
            </h1>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600">
              Verified lottery schedule, prize structure, and official draw details are not yet
              available for this entry. {BRAND.disclaimer}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const item = cardMatch ?? {
    id: legacyMatch!.id,
    slug: legacyMatch!.slug,
    title: legacyMatch!.name,
    frequency: 'WEEKLY' as const,
    prizeDemoLabel: 'Information not available',
    drawDateLabel: legacyMatch!.drawDay,
    drawTimeLabel: legacyMatch!.drawTime,
    ticketPriceDemo: 'Information not available',
    badgeLabel: 'Weekly',
    topColor: 'bg-[#9B1B30] text-white',
    bottomColor: 'bg-[#E8C95A] text-[#252525]',
    variant: 'gold-royal' as const,
    ctaLabel: 'View Details',
    description: legacyMatch!.summary,
  };
  const displayName = item.title;
  const displayCategory = cardMatch
    ? cardMatch.frequency
    : legacyMatch?.categorySlug.includes('bumper')
      ? 'SPECIAL'
      : 'WEEKLY';
  const displayPrice = item.ticketPriceDemo;
  const displayFirstPrize = item.prizeDemoLabel;
  const displayDate = item.drawDateLabel;
  const displayTime = item.drawTimeLabel;
  const displaySummary = item.description ?? 'Informational draw schedule and prize tier summary.';

  // Verified ticket numbers are only rendered if actual verified records exist
  const verifiedTicketNumbers: string[] = [];
  const visibleNumbers = showAllNumbers
    ? verifiedTicketNumbers
    : verifiedTicketNumbers.slice(0, 12);

  const relatedHistory = SAMPLE_RESULTS_PLACEHOLDER.filter((r) =>
    displayCategory === 'SPECIAL'
      ? r.schemeSlug === 'sample-seasonal-bumper'
      : r.schemeSlug === 'sample-weekly-format-a',
  );

  return (
    <div className="min-h-[75vh] bg-[#FFFDF8] py-10 sm:py-12">
      <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6 lg:px-8">
        {/* Top Back Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <GoldButton to="/lotteries" variant="outline" className="px-5">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Lotteries
          </GoldButton>
          <NonGovBadge />
        </div>

        {/* 1. Lottery Overview */}
        <motion.section
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-2xl border border-metallicgold/50 bg-white shadow-md"
        >
          <div className="grid items-center gap-6 md:grid-cols-12">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#4A060C] md:col-span-5 md:aspect-auto md:h-full md:min-h-[290px]">
              <img
                src="/assets/hero-banner-uploaded.jpg"
                alt={`${displayName} banner`}
                className="h-full w-full object-cover object-left"
              />
              <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-charcoal shadow-sm">
                <img src={BRAND.logoSrc} alt="" className="h-4 w-auto object-contain" />
                <span>{BRAND.name}</span>
              </div>
            </div>

            <div className="space-y-4 p-6 md:col-span-7 md:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-chillired px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                  <Crown className="h-3 w-3 text-metallicgold-light" aria-hidden="true" />
                  {displayCategory}
                </span>
                <SampleDataBadge label="LOTTERY OVERVIEW" />
              </div>

              <h1 className="font-display text-3xl font-bold text-charcoal sm:text-4xl">
                {displayName}
              </h1>

              <p className="text-sm leading-relaxed text-slate-600">{displaySummary}</p>

              <div className="grid grid-cols-2 gap-3 pt-1 sm:grid-cols-4">
                <div className="rounded-xl border border-slate-200 bg-[#FFFDF8] p-3">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    First Prize
                  </span>
                  <span className="mt-0.5 block font-display text-base font-bold text-chillired tabular-nums">
                    {displayFirstPrize}
                  </span>
                </div>
                <div className="rounded-xl border border-slate-200 bg-[#FFFDF8] p-3">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Ticket Price (Ref)
                  </span>
                  <span className="mt-0.5 block font-display text-base font-bold text-charcoal tabular-nums">
                    {displayPrice}
                  </span>
                </div>
                <div className="rounded-xl border border-slate-200 bg-[#FFFDF8] p-3">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Draw Date
                  </span>
                  <span className="mt-0.5 block font-display text-sm font-bold text-charcoal tabular-nums">
                    {displayDate}
                  </span>
                </div>
                <div className="rounded-xl border border-slate-200 bg-[#FFFDF8] p-3">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Draw Time
                  </span>
                  <span className="mt-0.5 block font-display text-sm font-bold text-charcoal tabular-nums">
                    {displayTime}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Ticket-Style Summary Card */}
        <motion.section
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: reduced ? 0 : 0.3 }}
          aria-label="Lottery Information Card"
          className="overflow-hidden rounded-2xl shadow-lg"
        >
          <div className={`p-6 sm:p-8 ${item.topColor}`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider opacity-95">
                <Ticket className="h-4 w-4 text-metallicgold-light" aria-hidden="true" />
                <span>{BRAND.name} • Reference Schedule</span>
              </div>
              <span className="rounded-full bg-black/20 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                {displayCategory}
              </span>
            </div>

            <div className="mt-5 grid gap-6 sm:grid-cols-3 sm:items-end">
              <div className="sm:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-wider opacity-85">
                  Lottery Name
                </p>
                <h2 className="mt-1 font-display text-2xl font-bold sm:text-3xl">{displayName}</h2>
              </div>
              <div className="sm:text-right">
                <p className="text-xs font-semibold uppercase tracking-wider opacity-85">
                  First Prize
                </p>
                <p className="mt-1 font-display text-3xl font-bold tabular-nums sm:text-4xl">
                  {displayFirstPrize}
                </p>
              </div>
            </div>
          </div>

          <div className={`relative flex items-center ${item.topColor}`}>
            <span
              aria-hidden="true"
              className="absolute -left-3.5 z-10 h-7 w-7 rounded-full bg-[#FFFDF8]"
            />
            <div className="w-full border-t-2 border-dashed border-white/85" />
            <span
              aria-hidden="true"
              className="absolute -right-3.5 z-10 h-7 w-7 rounded-full bg-[#FFFDF8]"
            />
          </div>

          <div className={`p-6 sm:p-8 ${item.bottomColor}`}>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex items-center gap-2.5 text-sm font-semibold">
                <CalendarDays className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Draw Date: {displayDate}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold">
                <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Draw Time: {displayTime}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold">
                <Ticket className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Ticket Price: {displayPrice}</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 2. Ticket Number Information */}
        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-charcoal">
                <Grid3X3 className="h-5 w-5 text-chillired" aria-hidden="true" />
                Ticket Number Information
              </h2>
              <p className="text-sm text-slate-600">
                Verified ticket-number examples are displayed only when official draw records are
                published.
              </p>
            </div>
            {verifiedTicketNumbers.length > 12 && (
              <button
                type="button"
                onClick={() => setShowAllNumbers((prev) => !prev)}
                className="min-h-[44px] rounded-full border border-chillired px-4 py-2 text-xs font-bold text-chillired transition-colors hover:bg-chillired hover:text-white"
              >
                {showAllNumbers ? 'Show Fewer Numbers' : 'View More Numbers'}
              </button>
            )}
          </div>

          {verifiedTicketNumbers.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6">
              {visibleNumbers.map((num) => (
                <div
                  key={num}
                  className="rounded-xl border border-slate-200 bg-[#FFFDF8] px-3 py-2.5 text-center font-mono text-sm font-bold text-charcoal"
                >
                  {num}
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 bg-[#FFFDF8] p-5 text-sm text-slate-600">
              <p className="font-semibold text-charcoal">
                Verified ticket-number samples are currently unavailable for {displayName}.
              </p>
              <p className="mt-1">
                NIDHI LOTTERY is an informational portal only — ticket selection, booking, and
                online purchasing are not supported.
              </p>
            </div>
          )}
        </section>

        {/* 3. How to Play? (Educational Format Overview) */}
        <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="space-y-1">
            <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-charcoal">
              <HelpCircle className="h-5 w-5 text-chillired" aria-hidden="true" />
              How to Play? (Educational Format Guide)
            </h2>
            <p className="text-sm text-slate-600">
              General informational overview of paper lottery ticket structure and draw formats.
              Refer to the official issuing authority for scheme-specific terms.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-[#FFFDF8] p-4">
              <h3 className="font-display text-base font-bold text-[#0E1738]">
                1. Draw Category & Schedule
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                <strong>{displayName}</strong> is listed under the{' '}
                <strong>{displayCategory}</strong> schedule ({displayDate} at {displayTime}).
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-[#FFFDF8] p-4">
              <h3 className="font-display text-base font-bold text-[#0E1738]">
                2. Ticket-Number Structure
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                Authorized Indian paper lottery tickets generally carry a series prefix paired with
                a unique multi-digit serial number printed on the physical ticket.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-[#FFFDF8] p-4">
              <h3 className="font-display text-base font-bold text-[#0E1738]">
                3. Series & Bunch System
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                Tickets are typically grouped into lettered or numbered series and distributed in
                bunches through authorized state agents. This portal does not sell tickets.
              </p>
            </div>
          </div>
        </section>

        {/* 4. How to Match Ticket Numbers with Results? (Prize Breakdown Table) */}
        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="space-y-1">
            <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-charcoal">
              <Trophy className="h-5 w-5 text-chillired" aria-hidden="true" />
              How to Match Ticket Numbers with Results?
            </h2>
            <p className="text-sm text-slate-600">
              Verified prize summary only. Unverified secondary prize tiers are marked as
              information not available.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-[#0E1738] text-xs uppercase tracking-wider text-white">
                <tr>
                  <th className="px-4 py-3">Prize Category</th>
                  <th className="px-4 py-3">Prize Amount</th>
                  <th className="px-4 py-3">Winning Results</th>
                  <th className="px-4 py-3">Example Number Format</th>
                  <th className="px-4 py-3">Matching Instructions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
                <tr>
                  <td className="px-4 py-3.5 font-display font-bold text-charcoal">1st Prize</td>
                  <td className="px-4 py-3.5 font-display font-bold text-chillired tabular-nums">
                    {displayFirstPrize}
                  </td>
                  <td className="px-4 py-3.5 text-slate-500">Information not available</td>
                  <td className="px-4 py-3.5 text-slate-500">Information not available</td>
                  <td className="px-4 py-3.5">
                    Verify the complete series and ticket number against the official Government
                    Gazette.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3.5 font-display font-semibold text-charcoal">
                    2nd &amp; Lower Prize Tiers
                  </td>
                  <td className="px-4 py-3.5 text-slate-500">Information not available</td>
                  <td className="px-4 py-3.5 text-slate-500">Information not available</td>
                  <td className="px-4 py-3.5 text-slate-500">Information not available</td>
                  <td className="px-4 py-3.5 text-slate-500">
                    Refer to the official Gazette result sheet published by the issuing authority.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 5. Important Rules & Key Points */}
        <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="space-y-1">
            <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-charcoal">
              <BookOpenCheck className="h-5 w-5 text-chillired" aria-hidden="true" />
              Important Rules &amp; Key Points
            </h2>
            <p className="text-sm text-slate-600">
              General statutory principles for Indian paper lotteries. Always consult the issuing
              State authority for official claim rules.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {IMPORTANT_RULES.map(({ title, detail, icon: Icon }) => (
              <div
                key={title}
                className="flex gap-3 rounded-xl border border-slate-200 bg-[#FFFDF8] p-4"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-chillired/10 text-chillired">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-charcoal">{title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Official Information & Authority Links */}
        <section className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 font-display text-xl font-bold text-charcoal">
              <FileCheck2 className="h-5 w-5 text-chillired" aria-hidden="true" />
              Official Information Sources
            </h2>
            <div className="space-y-3">
              {OFFICIAL_AUTHORITY_LINKS.map((src) => (
                <a
                  key={src.href}
                  href={src.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl border border-slate-200 bg-[#FFFDF8] p-3.5 transition-colors hover:border-chillired"
                >
                  <span className="flex items-center justify-between gap-2 text-sm font-bold text-[#0E1738]">
                    <span>{src.label}</span>
                    <ExternalLink className="h-4 w-4 shrink-0 text-chillired" aria-hidden="true" />
                  </span>
                  <span className="mt-1 block text-xs text-slate-600">{src.desc}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border border-metallicgold/50 bg-[#0E1738] p-6 text-white shadow-sm">
            <h2 className="flex items-center gap-2 font-display text-xl font-bold text-metallicgold">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              Portal Compliance &amp; Related Records
            </h2>
            <p className="text-sm leading-relaxed text-slate-200">
              {BRAND.disclaimer} No ticket sales, bookings, wallets, or payments are available on
              this website.
            </p>
            {relatedHistory.length > 0 && (
              <div className="space-y-2 border-t border-white/15 pt-3">
                <p className="text-xs font-bold uppercase tracking-wider text-metallicgold">
                  Related Result Archive Links
                </p>
                {relatedHistory.map((h) => (
                  <Link
                    key={h.id}
                    to={`/results/${h.id}`}
                    className="flex items-center justify-between rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white hover:border-metallicgold"
                  >
                    <span className="font-mono">
                      {h.drawCode} • {h.drawDate}
                    </span>
                    <span className="text-metallicgold">View Result →</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Bottom Actions */}
        <div className="flex flex-wrap gap-3">
          <GoldButton to="/lotteries" variant="outline">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Lotteries
          </GoldButton>
          <GoldButton to="/results" variant="primary">
            Latest Results
          </GoldButton>
          <GoldButton to="/draw-calendar" variant="emerald">
            View Draw Calendar
          </GoldButton>
        </div>
      </div>
    </div>
  );
}
