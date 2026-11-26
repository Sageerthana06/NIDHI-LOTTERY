import { useState } from 'react';
import { SAMPLE_CATEGORIES, SAMPLE_LOTTERIES } from '../../data/placeholderData';
import { LuxuryCard } from '../../components/ui/LuxuryCard';
import { GoldButton } from '../../components/ui/GoldButton';
import { SampleDataBadge } from '../../components/ui/Badges';

const TOP_BARS = [
  'bg-gradient-to-r from-royalblue to-electricpurple',
  'bg-gradient-to-r from-turquoise to-skyblue',
  'bg-gradient-to-r from-coralpink to-goldyellow',
];

export function LotteryCategoriesPage() {
  const [selectedSlug, setSelectedSlug] = useState<string>('all');

  const filtered =
    selectedSlug === 'all'
      ? SAMPLE_LOTTERIES
      : SAMPLE_LOTTERIES.filter((l) => l.categorySlug === selectedSlug);

  return (
    <div className="section-band-turquoise min-h-[75vh] py-12">
      <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
        <div className="space-y-3">
          <SampleDataBadge label="CATEGORIES" />
          <h1 className="font-display text-4xl font-bold text-midnight sm:text-5xl">
            Lottery Categories
          </h1>
          <p className="max-w-2xl text-sm text-slate-600">
            Filter informational series by category. All entries below are clearly labelled informational
            placeholders.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedSlug('all')}
            className={`rounded-xl border px-4 py-2 text-xs font-bold transition-all ${
              selectedSlug === 'all'
                ? 'border-transparent bg-gradient-to-r from-royalblue via-electricpurple to-coralpink text-white shadow-md'
                : 'border-royalblue/25 bg-white text-slate-700 hover:border-electricpurple'
            }`}
          >
            All Categories
          </button>
          {SAMPLE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedSlug(cat.slug)}
              className={`rounded-xl border px-4 py-2 text-xs font-bold transition-all ${
                selectedSlug === cat.slug
                  ? 'border-transparent bg-gradient-to-r from-royalblue via-electricpurple to-coralpink text-white shadow-md'
                  : 'border-royalblue/25 bg-white text-slate-700 hover:border-electricpurple'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {filtered.map((item, idx) => (
            <LuxuryCard
              key={item.id}
              interactive
              delay={idx * 0.05}
              className="flex flex-col justify-between gap-4 overflow-hidden p-0"
            >
              <div>
                <div className={`h-2.5 w-full ${TOP_BARS[idx % TOP_BARS.length]}`} />
                <div className="space-y-2 p-5">
                  <span className="text-xs font-bold text-electricpurple">{item.categoryName}</span>
                  <h2 className="font-display text-2xl font-bold text-midnight">{item.name}</h2>
                  <p className="text-sm text-slate-600">{item.summary}</p>
                </div>
              </div>
              <div className="px-5 pb-5">
                <GoldButton to={`/lotteries/${item.slug}`} variant="emerald" className="w-full">
                  Open Details
                </GoldButton>
              </div>
            </LuxuryCard>
          ))}
        </div>
      </div>
    </div>
  );
}
