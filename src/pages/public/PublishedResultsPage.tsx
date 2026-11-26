import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FEATURE_GATES } from '../../config/featureGates';
import { SAMPLE_LOTTERIES, SAMPLE_RESULTS_PLACEHOLDER } from '../../data/placeholderData';
import { LegalGatePanel } from '../../components/ui/LegalGatePanel';
import { LuxuryCard } from '../../components/ui/LuxuryCard';
import { LegalGateBadge, SampleDataBadge } from '../../components/ui/Badges';

export function PublishedResultsPage() {
  const [scheme, setScheme] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [query, setQuery] = useState('');

  const filtered = SAMPLE_RESULTS_PLACEHOLDER.filter((r) => {
    const matchScheme = scheme === 'all' || r.schemeSlug === scheme;
    const matchDate = !dateFilter || r.drawDate.includes(dateFilter);
    const q = query.trim().toLowerCase();
    const matchQ =
      !q ||
      r.drawCode.toLowerCase().includes(q) ||
      r.lotteryName.toLowerCase().includes(q) ||
      r.sampleNumbers.some((n) => n.includes(q));
    return matchScheme && matchDate && matchQ;
  });

  return (
    <div className="section-band-gold-navy min-h-[75vh] py-12">
      <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <LegalGateBadge label="Pending Legal Review" />
            <SampleDataBadge label="NO REAL RESULTS SHOWN" />
          </div>
          <h1 className="font-display text-4xl font-bold text-midnight sm:text-5xl">
            Published Results
          </h1>
          <p className="max-w-2xl text-sm text-slate-600">
            Displaying real lottery results or winning numbers remains gated pending legal counsel
            review. Below is the interactive filter & result terminal preview.
          </p>
        </div>

        {!FEATURE_GATES.PUBLIC_RESULTS && (
          <LegalGatePanel
            featureName="Published Results & Winning Numbers"
            flagName="VITE_FEATURE_PUBLIC_RESULTS"
            description="This module is disabled until qualified Indian legal counsel provides written clearance for results republication."
          />
        )}

        <LuxuryCard className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-3">
            <select
              value={scheme}
              onChange={(e) => setScheme(e.target.value)}
              aria-label="Filter by scheme"
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
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              aria-label="Filter by draw date"
              className="rounded-xl border border-royalblue/25 bg-lightbg px-3 py-2 text-xs font-medium text-midnight focus:border-electricpurple focus:outline-none"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search draw code or number..."
              className="rounded-xl border border-royalblue/25 bg-lightbg px-3 py-2 text-xs font-medium text-midnight focus:border-electricpurple focus:outline-none"
            />
          </div>

          {filtered.length === 0 ? (
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
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-xs uppercase text-royalblue">
                    <th className="py-2.5 pr-4">Draw</th>
                    <th className="py-2.5 pr-4">Code</th>
                    <th className="py-2.5 pr-4">Date</th>
                    <th className="py-2.5 pr-4">Status</th>
                    <th className="py-2.5">Detail</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filtered.map((res) => (
                    <tr key={res.id}>
                      <td className="py-3 pr-4 font-bold text-midnight">{res.lotteryName}</td>
                      <td className="py-3 pr-4 font-mono font-semibold text-electricpurple">
                        {res.drawCode}
                      </td>
                      <td className="py-3 pr-4 text-xs">{res.drawDate}</td>
                      <td className="py-3 pr-4 text-xs">{res.status}</td>
                      <td className="py-3">
                        <Link
                          to={`/results/${res.id}`}
                          className="text-xs font-bold text-royalblue hover:text-coralpink"
                        >
                          View Details →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </LuxuryCard>
      </div>
    </div>
  );
}
