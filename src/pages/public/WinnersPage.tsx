import { useState } from 'react';
import { Trophy } from 'lucide-react';
import { FEATURE_GATES } from '../../config/featureGates';
import { SAMPLE_WINNERS_PLACEHOLDER } from '../../data/placeholderData';
import { LegalGatePanel } from '../../components/ui/LegalGatePanel';
import { LuxuryCard } from '../../components/ui/LuxuryCard';
import { LegalGateBadge, SampleDataBadge } from '../../components/ui/Badges';

export function WinnersPage() {
  const [prizeFilter, setPrizeFilter] = useState('all');

  const filtered =
    prizeFilter === 'all'
      ? SAMPLE_WINNERS_PLACEHOLDER
      : SAMPLE_WINNERS_PLACEHOLDER.filter((w) => w.prizeCategory === prizeFilter);

  return (
    <div className="section-band-pink-gold min-h-[75vh] py-12">
      <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <LegalGateBadge label="Pending Legal Review" />
            <SampleDataBadge label="DPDP PRIVACY PROTECTED" />
          </div>
          <h1 className="font-display text-4xl font-bold text-midnight sm:text-5xl">
            Winners Information
          </h1>
          <p className="max-w-2xl text-sm text-slate-600">
            Winner information is strictly gated behind legal review and DPDP Act, 2023 consent
            verification. Fictional winners are never displayed as real winners.
          </p>
        </div>

        {!FEATURE_GATES.PUBLIC_WINNERS && (
          <LegalGatePanel
            featureName="Winner Spotlights & Announcements"
            flagName="VITE_FEATURE_PUBLIC_WINNERS"
            description="Public winner spotlights are disabled until legal counsel approval and verified written consent (or strict anonymization) are recorded."
          />
        )}

        <div className="flex flex-wrap gap-2">
          {['all', '1st Prize Tier', '2nd Prize Tier'].map((tier) => (
            <button
              key={tier}
              type="button"
              onClick={() => setPrizeFilter(tier)}
              className={`rounded-xl border px-4 py-2 text-xs font-bold transition-all ${
                prizeFilter === tier
                  ? 'border-transparent bg-gradient-to-r from-coralpink to-electricpurple text-white shadow-md'
                  : 'border-royalblue/25 bg-white text-slate-700 hover:border-electricpurple'
              }`}
            >
              {tier === 'all' ? 'All Prize Categories' : tier}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((w, idx) => (
            <LuxuryCard key={w.id} interactive delay={idx * 0.05} className="space-y-3">
              <div className="flex items-center justify-between">
                <SampleDataBadge label="INFO" />
                <span className="text-xs font-bold text-teal-700">Consent: {w.consentStatus}</span>
              </div>
              <div className="flex items-center gap-3 pt-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-goldyellow via-coralpink to-electricpurple text-white shadow-md">
                  <Trophy className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-midnight">{w.displayTitle}</h2>
                  <p className="text-xs text-slate-500">
                    {w.schemeName} • {w.drawDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">{w.districtOrRegion}</span>
                <span className="font-bold text-electricpurple">{w.prizeCategory}</span>
              </div>
            </LuxuryCard>
          ))}
        </div>
      </div>
    </div>
  );
}
