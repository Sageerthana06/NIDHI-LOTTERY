import { useEffect, useState } from 'react';
import {
  DEMO_MONTHLY_SCHEMES,
  DEMO_SPECIAL_SCHEMES,
  DEMO_UPCOMING_ATTRACTIONS,
} from '../../data/placeholderData';
import { TicketSchemeCard } from '../../components/sections/SchemeCarousel';
import { SampleDataBadge } from '../../components/ui/Badges';

type CatalogueFilter = 'ALL' | 'WEEKLY' | 'MONTHLY' | 'SPECIAL';

interface LotteriesFilterPageProps {
  initialFilter?: CatalogueFilter | 'DAILY';
}

const ALL_SCHEMES = [
  ...DEMO_UPCOMING_ATTRACTIONS,
  ...DEMO_MONTHLY_SCHEMES,
  ...DEMO_SPECIAL_SCHEMES,
];

const FILTER_OPTIONS: { key: CatalogueFilter; label: string }[] = [
  { key: 'ALL', label: 'All Lotteries' },
  { key: 'WEEKLY', label: 'Weekly Lotteries' },
  { key: 'MONTHLY', label: 'Monthly Lotteries' },
  { key: 'SPECIAL', label: 'Special Lotteries' },
];

export function LotteriesFilterPage({ initialFilter = 'ALL' }: LotteriesFilterPageProps) {
  const normalizedInitial: CatalogueFilter = initialFilter === 'DAILY' ? 'ALL' : initialFilter;
  const [filter, setFilter] = useState<CatalogueFilter>(normalizedInitial);

  useEffect(() => {
    setFilter(initialFilter === 'DAILY' ? 'ALL' : initialFilter);
  }, [initialFilter]);

  const items =
    filter === 'ALL' ? ALL_SCHEMES : ALL_SCHEMES.filter((s) => s.frequency === filter);

  const heading =
    filter === 'ALL'
      ? 'All Lotteries'
      : `${filter.charAt(0) + filter.slice(1).toLowerCase()} Lotteries`;

  return (
    <div className="section-light min-h-[75vh] py-10">
      <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-2">
          <SampleDataBadge label="LOTTERY CATALOGUE" />
          <h1 className="font-display text-3xl font-bold text-charcoal sm:text-4xl">{heading}</h1>
          <p className="max-w-2xl text-sm text-slate-600">
            Browse informational schemes by draw frequency. No tickets are sold or booked on this
            portal.
          </p>
        </div>

        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter lotteries">
          {FILTER_OPTIONS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={filter === tab.key}
              onClick={() => setFilter(tab.key)}
              className={`min-h-[44px] rounded-full border px-4 py-2 text-xs font-bold transition-colors ${
                filter === tab.key
                  ? 'border-chillired bg-chillired text-white'
                  : 'border-slate-300 bg-white text-charcoal hover:border-chillired'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
            <p className="font-display text-lg font-bold text-charcoal">Information Coming Soon</p>
            <p className="mx-auto mt-1 max-w-xl text-sm text-slate-600">
              No verified lottery records are currently available for this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item, idx) => (
              <TicketSchemeCard
                key={item.id}
                item={item}
                index={idx}
                notchBgClass="bg-[#FFFDF8]"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
