import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SAMPLE_FAQS } from '../../data/placeholderData';
import { LuxuryCard } from '../../components/ui/LuxuryCard';

export function FaqPage() {
  const [openId, setOpenId] = useState<string | null>(SAMPLE_FAQS[0]?.id ?? null);

  return (
    <div className="section-band-turquoise min-h-[75vh] py-12">
      <div className="mx-auto max-w-4xl space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-2">
          <h1 className="font-display text-4xl font-bold text-midnight sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-slate-600">
            Answers regarding our informational scope, legal gates, and privacy protections.
          </p>
        </div>

        <div className="space-y-3">
          {SAMPLE_FAQS.map((faq, idx) => {
            const isOpen = openId === faq.id;
            return (
              <LuxuryCard key={faq.id} delay={idx * 0.04} className="p-0">
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  aria-expanded={isOpen}
                >
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-royalblue">
                      {faq.category}
                    </span>
                    <span className="mt-1 block font-display text-lg font-bold text-midnight">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-electricpurple transition-transform ${
                      isOpen ? 'rotate-180 text-coralpink' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-slate-100 px-5 py-4 text-sm leading-relaxed text-slate-600">
                    {faq.answer}
                  </div>
                )}
              </LuxuryCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}
