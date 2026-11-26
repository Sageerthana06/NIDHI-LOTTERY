import { Lock, Scale } from 'lucide-react';
import { LuxuryCard } from './LuxuryCard';
import { LegalGateBadge } from './Badges';
import { GoldButton } from './GoldButton';

interface LegalGatePanelProps {
  featureName: string;
  flagName: string;
  description: string;
}

export function LegalGatePanel({ featureName, flagName, description }: LegalGatePanelProps) {
  return (
    <LuxuryCard className="border-metallicgold/60 bg-gradient-to-br from-white via-ivory to-[#FDF0F1]">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <LegalGateBadge label="Pending Legal Review — Disabled" />
            <span className="rounded-full border border-royalred/30 bg-royalred/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-royalred">
              {flagName}=false
            </span>
          </div>
          <h2 className="font-display text-2xl font-bold text-charcoal sm:text-3xl">
            {featureName} Is Currently Gated
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-600">{description}</p>
          <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-medium text-slate-600">
            <span className="inline-flex items-center gap-1.5 text-royalred">
              <Scale className="h-4 w-4" aria-hidden="true" />
              Requires written Indian legal counsel clearance
            </span>
            <span className="inline-flex items-center gap-1.5 text-deepteal">
              <Lock className="h-4 w-4" aria-hidden="true" />
              No real results or personal winner data exposed
            </span>
          </div>
        </div>
        <div className="shrink-0">
          <GoldButton to="/lottery-information" variant="emerald">
            View Informational Guide
          </GoldButton>
        </div>
      </div>
    </LuxuryCard>
  );
}
