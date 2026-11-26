import { ShieldAlert, Scale, Sparkles } from 'lucide-react';

export function SampleDataBadge({ label = 'INFORMATIONAL PREVIEW' }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-metallicgold/70 bg-metallicgold/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-chillired">
      <Sparkles className="h-3 w-3 text-metallicgold-dark" aria-hidden="true" />
      {label}
    </span>
  );
}

export function LegalGateBadge({ label = 'Pending Legal Review' }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-chillired/30 bg-chillired/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-chillired">
      <Scale className="h-3 w-3 text-chillired" aria-hidden="true" />
      {label}
    </span>
  );
}

export function NonGovBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-chillired/35 bg-chillired/10 px-3 py-1 text-[11px] font-bold text-chillired">
      <ShieldAlert className="h-3.5 w-3.5 text-chillired" aria-hidden="true" />
      Independent Informational Portal
    </span>
  );
}
