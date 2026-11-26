import { BookOpenCheck, CheckCircle2, FileCheck2, Scale, ShieldAlert } from 'lucide-react';
import { LuxuryCard } from '../../components/ui/LuxuryCard';
import { GoldButton } from '../../components/ui/GoldButton';
import { LegalGateBadge } from '../../components/ui/Badges';

const GUIDES = [
  {
    title: 'How Kerala Lottery Results Work',
    icon: BookOpenCheck,
    iconBg: 'bg-royalblue/15 text-royalblue',
    body: 'Authorized Kerala State paper lotteries conduct scheduled draws under state supervision. Official winning numbers are published in the Kerala Government Gazette and official Directorate channels.',
  },
  {
    title: 'Official Result Verification Guidance',
    icon: FileCheck2,
    iconBg: 'bg-turquoise/20 text-teal-800',
    body: 'Always cross-check any ticket serial number against the official Kerala Government Gazette or authorized Directorate of Kerala State Lotteries publications before taking action.',
  },
  {
    title: 'Prize Claim Procedure Information',
    icon: CheckCircle2,
    iconBg: 'bg-goldyellow/25 text-amber-800',
    body: 'Claims for authorized Kerala paper lotteries must be submitted within statutory timelines with the intact physical ticket, valid photo ID, and required tax/PAN documentation to designated offices or banks.',
  },
  {
    title: 'Rules, Regulations & Responsible Play',
    icon: Scale,
    iconBg: 'bg-coralpink/20 text-rose-700',
    body: 'Private online ticket sales, booking, and number-selection betting are prohibited. Treat lotteries strictly within legal bounds and never spend beyond affordable limits.',
  },
];

export function InformationCentrePage() {
  return (
    <div className="section-band-gold-navy min-h-[75vh] py-12">
      <div className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6 lg:px-8">
        <div className="space-y-3">
          <LegalGateBadge label="Informational Guide — Pending Legal Review" />
          <h1 className="font-display text-4xl font-bold text-midnight sm:text-5xl">
            Information Centre
          </h1>
          <p className="max-w-2xl text-sm text-slate-600">
            Guidance on how draws operate, official verification, prize claim rules, and
            responsible-play principles.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {GUIDES.map(({ title, icon: Icon, iconBg, body }, idx) => (
            <LuxuryCard key={title} interactive delay={idx * 0.05} className="space-y-3">
              <div className="flex items-center gap-3">
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="font-display text-xl font-bold text-midnight">{title}</h2>
              </div>
              <p className="text-sm leading-relaxed text-slate-600">{body}</p>
            </LuxuryCard>
          ))}
        </div>

        <LuxuryCard className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-coralpink" aria-hidden="true" />
            <div>
              <h3 className="font-display text-lg font-bold text-midnight">
                Need Answers or Legal Policies?
              </h3>
              <p className="text-xs text-slate-600">
                Read our FAQ or Responsible Play & Disclaimer pages for full details.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <GoldButton to="/faq" variant="outline">
              View FAQ
            </GoldButton>
            <GoldButton to="/responsible-play" variant="emerald">
              Responsible Play
            </GoldButton>
          </div>
        </LuxuryCard>
      </div>
    </div>
  );
}
