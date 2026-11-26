import { useState, type FormEvent } from 'react';
import { Bell, MailCheck } from 'lucide-react';
import { SAMPLE_ANNOUNCEMENTS } from '../../data/placeholderData';
import { LuxuryCard } from '../../components/ui/LuxuryCard';
import { GoldButton } from '../../components/ui/GoldButton';
import { LegalGateBadge, SampleDataBadge } from '../../components/ui/Badges';

export function UpdatesPage() {
  const [email, setEmail] = useState('');
  const [subscribedPreview, setSubscribedPreview] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubscribedPreview(true);
  };

  return (
    <div className="section-band-pink-gold min-h-[75vh] py-12">
      <div className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6 lg:px-8">
        <div className="space-y-3">
          <SampleDataBadge label="ANNOUNCEMENT CENTRE" />
          <h1 className="font-display text-4xl font-bold text-midnight sm:text-5xl">
            Notifications & Updates
          </h1>
          <p className="max-w-2xl text-sm text-slate-600">
            Official portal notices, compliance status updates, and announcement history.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-7">
            <h2 className="font-display text-2xl font-bold text-midnight">Announcement History</h2>
            {SAMPLE_ANNOUNCEMENTS.map((ann, idx) => (
              <LuxuryCard key={ann.id} delay={idx * 0.05} className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-electricpurple">
                    <Bell className="h-3.5 w-3.5" aria-hidden="true" />
                    {ann.dateLabel}
                  </span>
                  {ann.pendingLegalReview && <LegalGateBadge />}
                </div>
                <h3 className="font-display text-xl font-bold text-midnight">{ann.title}</h3>
                <p className="text-sm text-slate-600">{ann.body}</p>
              </LuxuryCard>
            ))}
          </div>

          <div className="lg:col-span-5">
            <LuxuryCard className="space-y-4 border-coralpink/30">
              <SampleDataBadge label="UI PREVIEW ONLY — NO BACKEND" />
              <h2 className="font-display text-2xl font-bold text-midnight">
                Result Update Alerts (Preview)
              </h2>
              <p className="text-xs leading-relaxed text-slate-600">
                Email subscription is a frontend UI preview only. No emails are stored or
                transmitted until a verified backend integration is connected.
              </p>

              {subscribedPreview ? (
                <div className="rounded-xl border border-turquoise/45 bg-turquoise/10 p-4 text-center">
                  <MailCheck className="mx-auto h-7 w-7 text-teal-700" aria-hidden="true" />
                  <p className="mt-2 text-sm font-bold text-midnight">UI Preview Recorded Locally</p>
                  <p className="mt-1 text-xs text-slate-600">
                    Backend notification delivery is not active in frontend-only mode.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-royalblue/25 bg-lightbg px-3.5 py-2.5 text-sm text-midnight focus:border-electricpurple focus:outline-none"
                  />
                  <GoldButton type="submit" variant="primary" className="w-full">
                    Preview Subscription UI
                  </GoldButton>
                </form>
              )}
            </LuxuryCard>
          </div>
        </div>
      </div>
    </div>
  );
}
