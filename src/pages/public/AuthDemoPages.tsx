import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { LuxuryCard } from '../../components/ui/LuxuryCard';
import { GoldButton } from '../../components/ui/GoldButton';
import { LegalGateBadge, SampleDataBadge } from '../../components/ui/Badges';

export function LoginPage() {
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setDone(true);
  };

  return (
    <div className="section-band-electric min-h-[75vh] py-12">
      <div className="mx-auto max-w-md space-y-6 px-4">
        <div className="space-y-2 text-center">
          <div className="flex justify-center gap-2">
            <SampleDataBadge label="Info AUTH UI" />
            <LegalGateBadge label="Non-Transactional" />
          </div>
          <h1 className="font-display text-3xl font-bold text-charcoal">Log In</h1>
          <p className="text-xs text-slate-600">
            Frontend UI preview only. Real authentication is not enabled in this informational
            phase.
          </p>
        </div>

        <LuxuryCard>
          {done ? (
            <div className="space-y-4 py-4 text-center">
              <p className="font-display text-lg font-bold text-chillired">
                Info Preview Submitted
              </p>
              <p className="text-xs text-slate-600">
                No credentials were transmitted or verified.
              </p>
              <GoldButton to="/dashboard" variant="primary" className="w-full">
                Open User Dashboard
              </GoldButton>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-bold text-charcoal">Email</label>
                <input
                  required
                  type="email"
                  placeholder="Info@nidhilottery.invalid"
                  className="w-full rounded-xl border border-slate-300 bg-ivory px-3.5 py-2 text-sm text-charcoal"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold text-charcoal">Password</label>
                <input
                  required
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-300 bg-ivory px-3.5 py-2 text-sm text-charcoal"
                />
              </div>
              <GoldButton type="submit" variant="primary" className="w-full">
                Continue (Info Preview)
              </GoldButton>
              <p className="text-center text-xs text-slate-600">
                New visitor?{' '}
                <Link to="/register" className="font-bold text-chillired hover:underline">
                  Register
                </Link>
              </p>
            </form>
          )}
        </LuxuryCard>
      </div>
    </div>
  );
}

export function RegisterPage() {
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setDone(true);
  };

  return (
    <div className="section-band-pink-gold min-h-[75vh] py-12">
      <div className="mx-auto max-w-md space-y-6 px-4">
        <div className="space-y-2 text-center">
          <SampleDataBadge label="Info REGISTRATION UI" />
          <h1 className="font-display text-3xl font-bold text-charcoal">Create Account</h1>
          <p className="text-xs text-slate-600">
            UI preview only — no personal data is stored or used for ticket purchases.
          </p>
        </div>

        <LuxuryCard>
          {done ? (
            <div className="space-y-4 py-4 text-center">
              <p className="font-display text-lg font-bold text-chillired">
                Info Registration Preview
              </p>
              <GoldButton to="/login" variant="outline" className="w-full">
                Go to Log In
              </GoldButton>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-bold text-charcoal">Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-xl border border-slate-300 bg-ivory px-3.5 py-2 text-sm text-charcoal"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold text-charcoal">Email</label>
                <input
                  required
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-300 bg-ivory px-3.5 py-2 text-sm text-charcoal"
                />
              </div>
              <label className="flex items-start gap-2 text-xs text-slate-600">
                <input required type="checkbox" className="mt-0.5 accent-[#C21825]" />
                <span>I confirm I am 18+ and understand this portal is informational only.</span>
              </label>
              <GoldButton type="submit" variant="primary" className="w-full">
                Create Account (Info Preview)
              </GoldButton>
            </form>
          )}
        </LuxuryCard>
      </div>
    </div>
  );
}
