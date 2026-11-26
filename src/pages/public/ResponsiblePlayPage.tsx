import { LuxuryCard } from '../../components/ui/LuxuryCard';
import { LegalGateBadge } from '../../components/ui/Badges';

export function ResponsiblePlayPage() {
  return (
    <div className="section-band-turquoise min-h-[75vh] py-12">
      <div className="mx-auto max-w-4xl space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-3">
          <LegalGateBadge label="Responsible Information" />
          <h1 className="font-display text-4xl font-bold text-midnight sm:text-5xl">
            Responsible Play
          </h1>
        </div>

        <LuxuryCard className="space-y-4 text-sm leading-relaxed text-slate-600">
          <h2 className="font-display text-xl font-bold text-midnight">
            1. No Online Betting or Ticket Sales
          </h2>
          <p>
            NIDHI LOTTERY does not sell lottery tickets, accept bets, or operate wallets or payment
            systems.
          </p>
          <h2 className="font-display text-xl font-bold text-midnight">
            2. Legal & Financial Awareness
          </h2>
          <p>
            Participation in state-authorized paper lotteries is restricted to adults (18+) under
            applicable Indian law. Never borrow money or treat lotteries as a source of guaranteed
            income.
          </p>
        </LuxuryCard>
      </div>
    </div>
  );
}
