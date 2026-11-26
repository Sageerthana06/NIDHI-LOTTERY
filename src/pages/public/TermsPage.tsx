import { LuxuryCard } from '../../components/ui/LuxuryCard';
import { LegalGateBadge } from '../../components/ui/Badges';

export function TermsPage() {
  return (
    <div className="section-band-electric min-h-[75vh] py-12">
      <div className="mx-auto max-w-4xl space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-3">
          <LegalGateBadge label="Draft — Pending Counsel Review" />
          <h1 className="font-display text-4xl font-bold text-midnight sm:text-5xl">
            Terms & Conditions
          </h1>
        </div>

        <LuxuryCard className="space-y-4 text-sm leading-relaxed text-slate-600">
          <h2 className="font-display text-xl font-bold text-midnight">
            1. Informational Purpose Only
          </h2>
          <p>
            This website provides informational content only. It does not offer online lottery
            ticket sales, ticket booking, number selection, payment processing, or draw
            participation.
          </p>
          <h2 className="font-display text-xl font-bold text-midnight">
            2. No Government Affiliation
          </h2>
          <p>
            This portal is independent and is not affiliated with the Government of Kerala or the
            Directorate of Kerala State Lotteries.
          </p>
          <h2 className="font-display text-xl font-bold text-midnight">3. Legal Review Gate</h2>
          <p>
            Results, winning numbers, winner spotlights, and promotional announcements remain
            disabled until qualified Indian legal counsel completes compliance review under the
            Lotteries (Regulation) Act, 1998 and Kerala rules.
          </p>
        </LuxuryCard>
      </div>
    </div>
  );
}
