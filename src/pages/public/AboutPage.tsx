import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { BRAND } from '../../config/featureGates';
import { LuxuryCard } from '../../components/ui/LuxuryCard';
import { NonGovBadge } from '../../components/ui/Badges';

const QUICK_RESOURCE_LINKS = [
  { to: '/information-centre', label: 'Information Centre & Rules' },
  { to: '/updates', label: 'News & Announcements' },
  { to: '/contact', label: 'Contact & Support' },
  { to: '/faq', label: 'Frequently Asked Questions' },
  { to: '/disclaimer', label: 'Disclaimer' },
  { to: '/responsible-play', label: 'Responsible Play' },
  { to: '/terms', label: 'Terms & Conditions' },
  { to: '/privacy-policy', label: 'Privacy Policy' },
];

export function AboutPage() {
  return (
    <div className="section-band-electric min-h-[75vh] py-12">
      <div className="mx-auto max-w-4xl space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-3">
          <NonGovBadge />
          <h1 className="font-display text-4xl font-bold text-midnight sm:text-5xl">
            About {BRAND.name}
          </h1>
          <p className="text-sm leading-relaxed text-slate-600">
            {BRAND.name} — {BRAND.tagline}. An independent informational portal designed to present
            structured, accessible reference information for audiences in Kerala, India.
          </p>
        </div>

        <LuxuryCard className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-midnight">
            Non-Government & Non-Commercial Commitment
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600">
            <li>We are not affiliated with the Government of Kerala or Kerala State Lotteries.</li>
            <li>We do not sell, book, reserve, or facilitate online lottery tickets.</li>
            <li>We do not process payments, wallets, deposits, or prize disbursements.</li>
            <li>
              All results, winner spotlights, and promotional features remain gated until legal
              counsel review.
            </li>
          </ul>
        </LuxuryCard>

        <LuxuryCard className="divide-y divide-slate-100 overflow-hidden p-0">
          <div className="border-b border-slate-100 bg-slate-50 px-5 py-3.5">
            <h2 className="font-display text-lg font-bold text-midnight">
              Portal Directory & Legal
            </h2>
          </div>
          {QUICK_RESOURCE_LINKS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center justify-between px-5 py-3.5 text-sm font-semibold text-midnight transition-colors hover:bg-lightbg"
            >
              <span>{item.label}</span>
              <ChevronRight className="h-4 w-4 text-royalblue" aria-hidden="true" />
            </Link>
          ))}
        </LuxuryCard>
      </div>
    </div>
  );
}
