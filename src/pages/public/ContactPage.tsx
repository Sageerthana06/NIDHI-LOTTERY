import { useState, type FormEvent } from 'react';
import { LuxuryCard } from '../../components/ui/LuxuryCard';
import { GoldButton } from '../../components/ui/GoldButton';

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="section-band-pink-gold min-h-[75vh] py-12">
      <div className="mx-auto max-w-4xl space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-2">
          <h1 className="font-display text-4xl font-bold text-midnight sm:text-5xl">Contact Us</h1>
          <p className="text-sm text-slate-600">
            Send an informational inquiry. In this frontend-only prototype, form submission is a
            local UI preview.
          </p>
        </div>

        <LuxuryCard>
          {submitted ? (
            <div className="space-y-3 py-6 text-center">
              <h2 className="font-display text-2xl font-bold text-royalblue">
                UI Preview: Inquiry Recorded Locally
              </h2>
              <p className="text-sm text-slate-600">
                No network request was sent in frontend-only mode.
              </p>
              <GoldButton type="button" variant="outline" onClick={() => setSubmitted(false)}>
                Reset Form
              </GoldButton>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-bold text-midnight">Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Your name"
                    className="w-full rounded-xl border border-royalblue/25 bg-lightbg px-3.5 py-2.5 text-sm text-midnight focus:border-electricpurple focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold text-midnight">Email</label>
                  <input
                    required
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-royalblue/25 bg-lightbg px-3.5 py-2.5 text-sm text-midnight focus:border-electricpurple focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold text-midnight">Subject</label>
                <input
                  required
                  type="text"
                  placeholder="Informational inquiry"
                  className="w-full rounded-xl border border-royalblue/25 bg-lightbg px-3.5 py-2.5 text-sm text-midnight focus:border-electricpurple focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold text-midnight">Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can we help?"
                  className="w-full rounded-xl border border-royalblue/25 bg-lightbg px-3.5 py-2.5 text-sm text-midnight focus:border-electricpurple focus:outline-none"
                />
              </div>
              <label className="flex items-start gap-2 text-xs text-slate-600">
                <input required type="checkbox" className="mt-0.5 accent-[#315CFF]" />
                <span>
                  I consent to the processing of my inquiry details in accordance with the Privacy
                  Policy (DPDP Act, 2023).
                </span>
              </label>
              <GoldButton type="submit" variant="primary">
                Submit Inquiry (UI Preview)
              </GoldButton>
            </form>
          )}
        </LuxuryCard>
      </div>
    </div>
  );
}
