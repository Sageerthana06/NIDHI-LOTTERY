import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Clock } from 'lucide-react';
import { SAMPLE_DRAW_SCHEDULES, SAMPLE_LOTTERIES } from '../../data/placeholderData';
import { LuxuryCard } from '../../components/ui/LuxuryCard';
import { SampleDataBadge } from '../../components/ui/Badges';

export function DrawCalendarPage() {
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'UPCOMING_DEMO' | 'PAST_DEMO'>('ALL');
  const [schemeFilter, setSchemeFilter] = useState<string>('all');

  const items = SAMPLE_DRAW_SCHEDULES.filter((s) => {
    const matchStatus = filterStatus === 'ALL' || s.status === filterStatus;
    const matchScheme = schemeFilter === 'all' || s.schemeSlug === schemeFilter;
    return matchStatus && matchScheme;
  });

  return (
    <div className="section-band-electric min-h-[75vh] py-12">
      <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-3">
          <SampleDataBadge label="Info DRAW CALENDAR" />
          <h1 className="font-display text-4xl font-bold text-midnight sm:text-5xl">
            Monthly Draw Calendar
          </h1>
          <p className="max-w-2xl text-sm text-slate-600">
            Upcoming and past illustrative draw dates by scheme. All dates and codes below are
            clearly marked Info placeholders.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {(['ALL', 'UPCOMING_DEMO', 'PAST_DEMO'] as const).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setFilterStatus(st)}
                className={`rounded-xl border px-4 py-2 text-xs font-bold transition-all ${
                  filterStatus === st
                    ? 'border-transparent bg-gradient-to-r from-royalblue to-electricpurple text-white shadow-md'
                    : 'border-royalblue/25 bg-white text-slate-700 hover:border-electricpurple'
                }`}
              >
                {st === 'ALL'
                  ? 'All Draws'
                  : st === 'UPCOMING_DEMO'
                    ? 'Upcoming'
                    : 'Past'}
              </button>
            ))}
          </div>

          <select
            value={schemeFilter}
            onChange={(e) => setSchemeFilter(e.target.value)}
            aria-label="Filter by lottery scheme"
            className="rounded-xl border border-royalblue/25 bg-white px-3.5 py-2 text-xs font-semibold text-midnight shadow-sm focus:border-electricpurple focus:outline-none"
          >
            <option value="all">All Schemes</option>
            {SAMPLE_LOTTERIES.map((l) => (
              <option key={l.id} value={l.slug}>
                {l.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item, idx) => (
            <LuxuryCard
              key={item.id}
              interactive
              delay={idx * 0.05}
              className="flex flex-col justify-between gap-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                      item.status === 'UPCOMING_DEMO'
                        ? 'bg-turquoise/20 text-teal-800'
                        : 'bg-electricpurple/15 text-electricpurple'
                    }`}
                  >
                    {item.status === 'UPCOMING_DEMO' ? 'Upcoming' : 'Past'}
                  </span>
                  <h2 className="font-display text-xl font-bold text-midnight">
                    {item.schemeName}
                  </h2>
                </div>
                <span className="font-mono text-xs font-bold text-royalblue">{item.drawCode}</span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3 text-xs text-slate-600">
                <span className="inline-flex items-center gap-1.5 font-semibold text-midnight">
                  <CalendarDays className="h-4 w-4 text-electricpurple" aria-hidden="true" />
                  {item.drawDate}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-coralpink" aria-hidden="true" />
                  {item.drawTime}
                </span>
                <Link
                  to={`/lotteries/${item.schemeSlug}`}
                  className="font-bold text-royalblue hover:text-electricpurple"
                >
                  Scheme Details →
                </Link>
              </div>
            </LuxuryCard>
          ))}
        </div>
      </div>
    </div>
  );
}
