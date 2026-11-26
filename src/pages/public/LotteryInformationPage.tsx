import { Link } from 'react-router-dom';
import { CalendarClock, Info } from 'lucide-react';
import { SAMPLE_LOTTERIES } from '../../data/placeholderData';
import { LegalGateBadge, SampleDataBadge } from '../../components/ui/Badges';

const CARD_HEADERS = [
  'bg-gradient-to-r from-royalred to-royalred-dark text-white',
  'bg-gradient-to-r from-deepteal to-deepteal-light text-white',
  'bg-gradient-to-r from-metallicgold-dark to-metallicgold text-charcoal',
];

export function LotteryInformationPage() {
  return (
    <div className="section-light min-h-[75vh] py-12">
      <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-6 border-b border-electric/20 pb-8 lg:grid-cols-12">
          <div className="space-y-3 lg:col-span-8">
            <div className="flex flex-wrap gap-2">
              <SampleDataBadge label="SCHEME CATALOGUE" />
              <LegalGateBadge label="Informational Copy Pending Review" />
            </div>
            <h1 className="font-display text-4xl font-bold text-midnight sm:text-5xl">
              Lottery Schemes & Information
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
              Structured reference guide for Kerala lottery formats, draw timings, and statutory
              compliance under the Lotteries (Regulation) Act, 1998. No tickets are sold or booked.
            </p>
          </div>
          <div className="rounded-xl border border-electric/25 bg-white p-4 text-xs text-slate-600 shadow-sm lg:col-span-4">
            <span className="flex items-center gap-1.5 font-bold text-electric">
              <Info className="h-4 w-4" aria-hidden="true" />
              Compliance Note
            </span>
            <p className="mt-1">
              All formats below are illustrative placeholders until official counsel sign-off.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SAMPLE_LOTTERIES.map((lot, idx) => (
            <div
              key={lot.id}
              className="light-card light-card-hover flex flex-col justify-between overflow-hidden rounded-2xl"
            >
              <div>
                <div
                  className={`flex items-center justify-between px-5 py-3.5 ${
                    CARD_HEADERS[idx % CARD_HEADERS.length]
                  }`}
                >
                  <span className="font-mono text-xs font-bold">{lot.code}</span>
                  <span className="rounded-full bg-black/25 px-2.5 py-0.5 text-[10px] font-bold uppercase text-purewhite">
                    Info • Info Only
                  </span>
                </div>
                <div className="space-y-3 p-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-neonpurple">
                    {lot.categoryName}
                  </span>
                  <h2 className="font-display text-2xl font-bold text-midnight">{lot.name}</h2>
                  <p className="text-sm text-slate-600">{lot.summary}</p>
                  <div className="space-y-1.5 rounded-xl bg-slate-100 p-3.5 text-xs text-slate-700">
                    <p className="flex items-center gap-1.5">
                      <CalendarClock className="h-3.5 w-3.5 text-electric" aria-hidden="true" />
                      <span><strong className="text-midnight">Schedule:</strong> {lot.scheduleText}</span>
                    </p>
                    <p><strong className="text-midnight">Draw Time:</strong> {lot.drawTime}</p>
                    <p><strong className="text-midnight">Note:</strong> {lot.faceValueInfo}</p>
                  </div>
                </div>
              </div>
              <div className="border-t border-slate-100 px-5 py-4">
                <Link
                  to={`/lotteries/${lot.slug}`}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-midnight px-4 py-2.5 text-xs font-bold text-purewhite transition-colors hover:bg-electric"
                >
                  Inspect Scheme & Prize Structure
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
