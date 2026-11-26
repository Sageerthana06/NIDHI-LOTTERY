import { LuxuryCard } from '../../components/ui/LuxuryCard';
import { LegalGateBadge } from '../../components/ui/Badges';

export function PrivacyPolicyPage() {
  return (
    <div className="section-band-electric min-h-[75vh] py-12">
      <div className="mx-auto max-w-4xl space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-3">
          <LegalGateBadge label="Draft — Pending Counsel Review" />
          <h1 className="font-display text-4xl font-bold text-midnight sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-600">
            Aligned with India&apos;s Digital Personal Data Protection Act, 2023 (DPDP Act).
          </p>
        </div>

        <LuxuryCard className="space-y-4 text-sm leading-relaxed text-slate-600">
          <h2 className="font-display text-xl font-bold text-midnight">1. Data Minimization</h2>
          <p>
            This informational portal does not require user accounts, wallets, or payment details.
            Contact form submissions collect only the fields you explicitly provide with consent.
          </p>
          <h2 className="font-display text-xl font-bold text-midnight">
            2. Winner Privacy Controls
          </h2>
          <p>
            Any winner information feature (currently gated pending legal review) defaults to
            anonymized display with PII redacted. Identifiable details require verified written
            consent and can be revoked at any time.
          </p>
          <h2 className="font-display text-xl font-bold text-midnight">
            3. Security & Auditability
          </h2>
          <p>
            Administrative access is governed by role-based access control, mandatory MFA for
            SUPER_ADMIN accounts, and tamper-evident audit logging in production architecture.
          </p>
        </LuxuryCard>
      </div>
    </div>
  );
}
