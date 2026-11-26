import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { SAMPLE_LOTTERIES, SAMPLE_RESULTS_PLACEHOLDER } from '../../data/placeholderData';
import { LuxuryCard } from '../../components/ui/LuxuryCard';
import { LegalGateBadge, SampleDataBadge } from '../../components/ui/Badges';

export function SearchPage() {
  const [scheme, setScheme] = useState('all');
  const [drawDate, setDrawDate] = useState('');
  const [drawNumber, setDrawNumber] = useState('');
  const [winningNumber, setWinningNumber] = useState('');
  const [prizeCategory, setPrizeCategory] = useState('all');

  const results = SAMPLE_RESULTS_PLACEHOLDER.filter((r) => {
    const matchScheme = scheme === 'all' || r.schemeSlug === scheme;
    const matchDate = !drawDate || r.drawDate.includes(drawDate);
    const matchCode = !drawNumber || r.drawCode.toLowerCase().includes(drawNumber.toLowerCase());
    const matchNum =
      !winningNumber ||
      r.sampleNumbers.some((n) => n.includes(winningNumber.trim())) ||
      r.prizeBreakdown.some((b) =>
        b.numbers.some((num) => num.toLowerCase().includes(winningNumber.trim().toLowerCase())),
      );
    const matchPrize = prizeCategory === 'all' || r.prizeCategory === prizeCategory;
    return matchScheme && matchDate && matchCode && matchNum && matchPrize;
  });

  return (
    <div className="section-band-turquoise min-h-[75vh] py-12">
      <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <SampleDataBadge label="GLOBAL SEARCH" />
            <LegalGateBadge label="Results Gated Pending Legal Review" />
          </div>
          <h1 className="font-display text-4xl font-bold text-midnight sm:text-5xl">
            Global Search
          </h1>
          <p className="max-w-2xl text-sm text-slate-600">
            Search across SCHEME placeholders, draw dates, draw numbers, sample numbers, and
            prize categories. Real winning numbers remain disabled pending legal review.
          </p>
        </div>

        <LuxuryCard className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <select
            value={scheme}
            onChange={(e) => setScheme(e.target.value)}
            aria-label="Lottery scheme"
            className="rounded-xl border border-royalblue/25 bg-lightbg px-3 py-2 text-xs font-medium text-midnight focus:border-electricpurple focus:outline-none"
          >
            <option value="all">All Schemes</option>
            {SAMPLE_LOTTERIES.map((l) => (
              <option key={l.id} value={l.slug}>
                {l.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={drawDate}
            onChange={(e) => setDrawDate(e.target.value)}
            aria-label="Draw date"
            className="rounded-xl border border-royalblue/25 bg-lightbg px-3 py-2 text-xs font-medium text-midnight focus:border-electricpurple focus:outline-none"
          />

          <input
            type="text"
            value={drawNumber}
            onChange={(e) => setDrawNumber(e.target.value)}
            placeholder="Draw code (e.g. REF-001)"
            className="rounded-xl border border-royalblue/25 bg-lightbg px-3 py-2 text-xs font-medium text-midnight focus:border-electricpurple focus:outline-none"
          />

          <input
            type="text"
            value={winningNumber}
            onChange={(e) => setWinningNumber(e.target.value)}
            placeholder="Sample number (e.g. 07)"
            className="rounded-xl border border-royalblue/25 bg-lightbg px-3 py-2 text-xs font-medium text-midnight focus:border-electricpurple focus:outline-none"
          />

          <select
            value={prizeCategory}
            onChange={(e) => setPrizeCategory(e.target.value)}
            aria-label="Prize category"
            className="rounded-xl border border-royalblue/25 bg-lightbg px-3 py-2 text-xs font-medium text-midnight focus:border-electricpurple focus:outline-none"
          >
            <option value="all">All Prize Tiers</option>
            <option value="1st Prize">1st Prize</option>
            <option value="2nd Prize">2nd Prize</option>
          </select>
        </LuxuryCard>

        {results.length === 0 ? (
          <LuxuryCard className="py-10 text-center">
            <Search className="mx-auto h-8 w-8 text-royalblue" aria-hidden="true" />
            <p className="mt-3 font-display text-lg font-bold text-midnight">
              No matching records found
            </p>
            <p className="mt-1 text-xs text-slate-500">Try clearing one or more filters above.</p>
          </LuxuryCard>
        ) : (
          <div className="space-y-3">
            {results.map((r, idx) => (
              <LuxuryCard
                key={r.id}
                interactive
                delay={idx * 0.04}
                className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <SampleDataBadge label="INFO" />
                    <span className="font-mono text-xs font-bold text-royalblue">{r.drawCode}</span>
                    <span className="text-xs font-semibold text-electricpurple">{r.drawDate}</span>
                  </div>
                  <h2 className="font-display text-xl font-bold text-midnight">{r.lotteryName}</h2>
                  <p className="text-xs text-slate-600">{r.note}</p>
                </div>
                <Link
                  to={`/results/${r.id}`}
                  className="shrink-0 rounded-xl bg-gradient-to-r from-royalblue to-electricpurple px-4 py-2 text-xs font-bold text-white shadow-sm hover:opacity-90"
                >
                  Open Result Detail →
                </Link>
              </LuxuryCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
