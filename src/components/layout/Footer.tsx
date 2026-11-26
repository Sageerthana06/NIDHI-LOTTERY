import { Link } from 'react-router-dom';
import { ShieldCheck, Smartphone } from 'lucide-react';
import { BRAND } from '../../config/featureGates';

const SOCIAL_LINKS = [
  'Facebook',
  'Telegram',
  'Instagram',
  'Twitter',
  'WhatsApp',
  'YouTube (Goa)',
  'YouTube (Mizoram)',
];

export function Footer() {
  return (
    <footer className="relative bg-lightbg pt-3">
      {/* Zigzag Sawtooth Border */}
      <div className="zigzag-top h-3 w-full" aria-hidden="true" />

      <div className="bg-[#0E1738] pb-24 pt-12 text-white lg:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-6">
            {/* Brand + 18+ */}
            <div className="space-y-4 lg:col-span-1">
              <div className="inline-flex rounded-xl bg-white p-1.5 shadow-md">
                <img
                  src={BRAND.logoSrc}
                  alt={BRAND.name}
                  className="h-11 w-auto object-contain"
                />
              </div>
              <p className="text-xs leading-relaxed text-slate-300">{BRAND.disclaimer}</p>
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-charcoal">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-chillired text-[10px] font-bold text-white">
                  18+
                </span>
                18+ only, play responsibly
              </div>
            </div>

            {/* Know Us */}
            <div>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-metallicgold">
                Know Us
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li><Link to="/about" className="hover:text-metallicgold">About</Link></li>
                <li><Link to="/terms" className="hover:text-metallicgold">Terms of Use</Link></li>
                <li><Link to="/privacy-policy" className="hover:text-metallicgold">Privacy Policy</Link></li>
                <li><Link to="/responsible-play" className="hover:text-metallicgold">18 Plus Only</Link></li>
                <li><Link to="/disclaimer" className="hover:text-metallicgold">Disclaimer</Link></li>
              </ul>
            </div>

            {/* Government Policy */}
            <div>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-metallicgold">
                Government Policy
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li>
                  <Link to="/information-centre" className="hover:text-metallicgold">
                    Lotteries (Regulation) Act, 1998
                  </Link>
                </li>
                <li>
                  <Link to="/information-centre" className="hover:text-metallicgold">
                    The Lotteries (Regulation) Rules, 2010
                  </Link>
                </li>
                <li>
                  <Link to="/information-centre" className="hover:text-metallicgold">
                    Mizoram Claim Form
                  </Link>
                </li>
                <li>
                  <Link to="/information-centre" className="hover:text-metallicgold">
                    Goa Claim Form
                  </Link>
                </li>
              </ul>
            </div>

            {/* Help */}
            <div>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-metallicgold">
                Help
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li><Link to="/faq" className="hover:text-metallicgold">FAQs</Link></li>
                <li><Link to="/contact" className="hover:text-metallicgold">Contact Us</Link></li>
                <li><Link to="/results" className="hover:text-metallicgold">Latest Results</Link></li>
                <li><Link to="/previous-results" className="hover:text-metallicgold">Previous Results</Link></li>
              </ul>
            </div>

            {/* Social Platforms */}
            <div>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-metallicgold">
                Social Platforms
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {SOCIAL_LINKS.map((platform) => (
                  <li key={platform}>
                    <Link to="/contact" className="hover:text-metallicgold">
                      {platform}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* App Download + Compliance Notice */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-metallicgold/50 bg-white/5 p-4">
                <h3 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-metallicgold">
                  <Smartphone className="h-4 w-4" aria-hidden="true" />
                  Download Our App!
                </h3>
                <p className="mt-1.5 text-xs text-slate-300">
                  Download the {BRAND.name} app for schedules and result updates.
                </p>
                <Link
                  to="/information-centre"
                  className="mt-3 inline-flex min-h-[38px] w-full items-center justify-center rounded-full bg-chillired px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-chillired-dark"
                >
                  Download the NIDHI LOTTERY app
                </Link>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/5 p-3 text-[11px] text-slate-300">
                <p className="flex items-center gap-1.5 font-bold text-metallicgold">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  Informational Only
                </p>
                <p className="mt-1 leading-relaxed">
                  No real ticket sales, wallets, or payments. Verify official results through
                  authorized Government Gazette publications.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/15 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center">
            <span>Copyright 2026 @ All Rights Reserved.</span>
            <span className="text-metallicgold">
              Not affiliated with Govt. of Kerala • 18+ only • Informational Portal
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
