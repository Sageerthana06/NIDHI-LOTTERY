import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FEATURE_GATES } from '../../config/featureGates';
import { SAMPLE_LOTTERIES, SAMPLE_RESULTS_PLACEHOLDER } from '../../data/placeholderData';
import { LegalGatePanel } from '../../components/ui/LegalGatePanel';
import { LuxuryCard } from '../../components/ui/LuxuryCard';
import { LegalGateBadge, SampleDataBadge } from '../../components/ui/Badges';

const PAGE_SIZE = 2;

export function PreviousResultsPage() {
  const [scheme, setScheme] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [drawCode, setDrawCode] = useState('');
  const [page, setPage] = useState(1);

  const filtered = SAMPLE_RESULTS_PLACEHOLDER.filter((r) => {
    const matchScheme = scheme === 'all' || r.schemeSlug === scheme;
    const matchDate = !dateFilter || r.drawDate.includes(dateFilter);
    const matchCode = !drawCode || r.drawCode.toLowerCase().includes(drawCode.toLowerCase());
    return matchScheme && matchDate && matchCode;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <div className="section-band-electric min-h-[75vh] py-12">
      <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <LegalGateBadge label="Pending Legal Review" />
            <SampleDataBadge label="ARCHIVE" />
          </div>
          <h1 className="font-display text-4xl font-bold text-midnight sm:text-5xl">
            Previous Results Archive
          </h1>
          <p className="max-w-2xl text-sm text-slate-600">
            Historical draw archive search. Real results remain gated pending
            legal review.
          </p>
        </div>

        {!FEATURE_GATES.PUBLIC_RESULTS && (
          <LegalGatePanel
            featureName="Previous Results Archive"
            flagName="VITE_FEATURE_PUBLIC_RESULTS"
            description="Historical results remain disabled until legal counsel approves results republication."
          />
        )}

        <LuxuryCard className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-3">
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => {
                setDateFilter(e.target.value);
                setPage(1);
              }}
              aria-label="Filter archive by date"
              className="rounded-xl border border-royalblue/25 bg-lightbg px-3.5 py-2 text-xs font-medium text-midnight focus:border-electricpurple focus:outline-none"
            />
            <select
              value={scheme}
              onChange={(e) => {
                setScheme(e.target.value);
                setPage(1);
              }}
              aria-label="Filter archive by scheme"
              className="rounded-xl border border-royalblue/25 bg-lightbg px-3.5 py-2 text-xs font-medium text-midnight focus:border-electricpurple focus:outline-none"
            >
              <option value="all">All Schemes</option>
              {SAMPLE_LOTTERIES.map((l) => (
                <option key={l.id} value={l.slug}>
                  {l.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={drawCode}
              onChange={(e) => {
                setDrawCode(e.target.value);
                setPage(1);
              }}
              placeholder="Search draw code..."
              className="rounded-xl border border-royalblue/25 bg-lightbg px-3.5 py-2 text-xs font-medium text-midnight focus:border-electricpurple focus:outline-none"
            />
          </div>

          {paged.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-lightbg p-8 text-center">
              <p className="font-display text-base font-bold text-midnight">
                No Verified Results Available
              </p>
              <p className="mx-auto mt-1 max-w-xl text-sm text-slate-600">
                Official result information will appear here only after verification and legal
                approval.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {paged.map((r) => (
                <div
                  key={r.id}
                  className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm"
                >
                  <div>
                    <p className="font-bold text-midnight">{r.lotteryName}</p>
                    <p className="font-mono text-xs text-electricpurple">
                      {r.drawCode} • {r.drawDate}
                    </p>
                  </div>
                  <Link
                    to={`/results/${r.id}`}
                    className="rounded-xl bg-royalblue/10 px-3 py-1.5 text-xs font-bold text-royalblue hover:bg-royalblue/20"
                  >
                    Open Detail →
                  </Link>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-600">
            <span>
              Page {safePage} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={safePage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="rounded-lg border border-slate-300 px-3 py-1 font-semibold text-midnight disabled:opacity-40"
              >
                Prev
              </button>
              <button
                type="button"
                disabled={safePage >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="rounded-lg border border-slate-300 px-3 py-1 font-semibold text-midnight disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </LuxuryCard>
      </div>
    </div>
  );
}
