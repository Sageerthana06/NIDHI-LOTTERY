import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Check, Printer, Share2 } from 'lucide-react';
import { SAMPLE_RESULTS_PLACEHOLDER } from '../../data/placeholderData';
import { LuxuryCard } from '../../components/ui/LuxuryCard';
import { GoldButton } from '../../components/ui/GoldButton';
import { LegalGateBadge, SampleDataBadge } from '../../components/ui/Badges';

export function ResultDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [copied, setCopied] = useState(false);

  const result =
    SAMPLE_RESULTS_PLACEHOLDER.find((r) => r.id === id) ?? SAMPLE_RESULTS_PLACEHOLDER[0];

  if (!result) {
    return (
      <div className="section-band-gold-navy min-h-[75vh] py-12">
        <div className="mx-auto max-w-4xl space-y-6 px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
            <SampleDataBadge label="NO VERIFIED RECORDS AVAILABLE" />
            <h1 className="mt-3 font-display text-2xl font-bold text-midnight sm:text-3xl">
              Information Coming Soon
            </h1>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600">
              Official published results and winning numbers are not available and remain gated
              pending legal review.
            </p>
            <div className="mt-6 flex justify-center">
              <GoldButton to="/results" variant="outline">
                ← Back to Results
              </GoldButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="section-band-gold-navy min-h-[75vh] py-12">
      <div className="mx-auto max-w-4xl space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              <SampleDataBadge label="RESULT DETAIL" />
              <LegalGateBadge label={result.status} />
            </div>
            <h1 className="font-display text-3xl font-bold text-midnight sm:text-4xl">
              {result.lotteryName}
            </h1>
            <p className="font-mono text-xs font-semibold text-electricpurple">
              Draw Code: {result.drawCode} • Date: {result.drawDate}
            </p>
          </div>

          <div className="no-print flex flex-wrap gap-2">
            <GoldButton type="button" variant="outline" onClick={handleShare}>
              {copied ? <Check className="h-4 w-4 text-teal-600" /> : <Share2 className="h-4 w-4" />}
              {copied ? 'Link Copied' : 'Share'}
            </GoldButton>
            <GoldButton type="button" variant="emerald" onClick={() => window.print()}>
              <Printer className="h-4 w-4" />
              Print-Friendly
            </GoldButton>
          </div>
        </div>

        <LuxuryCard className="space-y-4">
          <h2 className="font-display text-xl font-bold text-midnight">
            Prize Category Breakdown
          </h2>
          <p className="text-xs text-slate-600">{result.note}</p>
          <div className="divide-y divide-slate-100">
            {result.prizeBreakdown.map((tier) => (
              <div key={tier.tier} className="flex flex-col justify-between gap-2 py-3 sm:flex-row">
                <div>
                  <p className="font-bold text-midnight">{tier.tier}</p>
                  <p className="text-xs text-slate-500">{tier.amountInfo}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tier.numbers.map((n) => (
                    <span
                      key={n}
                      className="rounded-lg border border-royalblue/25 bg-lightbg px-2.5 py-1 font-mono text-xs font-bold text-royalblue"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </LuxuryCard>

        <div className="no-print flex flex-wrap gap-3">
          <GoldButton to="/results" variant="outline">
            ← Published Results
          </GoldButton>
          <GoldButton to="/previous-results" variant="outline">
            Previous Results Archive
          </GoldButton>
        </div>
      </div>
    </div>
  );
}
