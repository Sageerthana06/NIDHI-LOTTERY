import { Link } from 'react-router-dom';
import { Award, Lock } from 'lucide-react';
import { SAMPLE_WINNERS_PLACEHOLDER } from '../../data/placeholderData';

const CARD_THEMES = [
  'bg-[#E59E0D] text-white',
  'bg-[#0E2F2C] text-white',
  'bg-[#7D101B] text-white',
  'bg-[#1B6B2E] text-white',
];

export function WinnersGallery() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="w-16" />
        <h2 className="text-center font-display text-2xl font-bold text-charcoal sm:text-3xl">
          Winners Gallery
        </h2>
        <Link to="/winners" className="text-xs font-bold text-chillired hover:underline">
          View All →
        </Link>
      </div>

      {SAMPLE_WINNERS_PLACEHOLDER.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-[#FFFDF8] p-8 text-center">
          <p className="font-display text-base font-bold text-charcoal">
            No Verified Records Available
          </p>
          <p className="mx-auto mt-1 max-w-xl text-sm text-slate-600">
            Winner records remain protected under DPDP privacy safeguards and will be published
            only after official verification and written consent.
          </p>
        </div>
      ) : (
        <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-4">
          {SAMPLE_WINNERS_PLACEHOLDER.slice(0, 4).map((w, idx) => (
            <div
              key={`${w.id}-${idx}`}
              className={`relative flex w-[230px] shrink-0 snap-start flex-col items-center justify-between rounded-2xl px-4 py-5 text-center shadow-md lg:w-auto ${
                CARD_THEMES[idx % CARD_THEMES.length]
              }`}
            >
              <span className="rounded-full bg-black/25 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-metallicgold">
                Pending Review
              </span>

              <p className="mt-2 font-display text-xl font-bold text-metallicgold">
                {w.prizeCategory}
              </p>

              <div className="my-4 flex h-24 w-24 flex-col items-center justify-center rounded-full border-4 border-white bg-ivory text-charcoal shadow-inner">
                <Award className="h-9 w-9 text-chillired" aria-hidden="true" />
                <span className="mt-0.5 inline-flex items-center gap-0.5 text-[9px] font-bold text-slate-600">
                  <Lock className="h-2.5 w-2.5" /> DPDP
                </span>
              </div>

              <div className="space-y-1 text-xs">
                <p className="font-bold text-white">{w.displayTitle}</p>
                <p className="text-white/85">{w.schemeName}</p>
                <p className="font-mono text-[11px] text-metallicgold">Draw: {w.drawDate}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
