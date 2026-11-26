import { BRAND } from '../../config/featureGates';
import { LuxuryCard } from '../../components/ui/LuxuryCard';
import { LegalGateBadge } from '../../components/ui/Badges';

export function DisclaimerPage() {
  return (
    <div className="section-band-gold-navy min-h-[75vh] py-12">
      <div className="mx-auto max-w-4xl space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-3">
          <LegalGateBadge label="Legal Disclaimer" />
          <h1 className="font-display text-4xl font-bold text-midnight sm:text-5xl">Disclaimer</h1>
        </div>

        <LuxuryCard className="space-y-4 text-sm leading-relaxed text-slate-600">
          <h2 className="font-display text-xl font-bold text-midnight">
            1. Independent Informational Portal
          </h2>
          <p>{BRAND.disclaimer}</p>
          <h2 className="font-display text-xl font-bold text-midnight">
            2. Official Verification Required
          </h2>
          <p>
            Always verify official lottery schedules, draw outcomes, and claim procedures directly
            with the Kerala Government Gazette and Directorate of Kerala State Lotteries.
          </p>
          <h2 className="font-display text-xl font-bold text-midnight">3. INFORMATIONAL DATA Notice</h2>
          <p>
            All sample records shown during frontend development are explicitly marked Info and do
            not represent real lottery draws or real winners.
          </p>
        </LuxuryCard>
      </div>
    </div>
  );
}
