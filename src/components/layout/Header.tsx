import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Bell,
  Home,
  Ticket,
  FileText,
  Trophy,
  ShoppingCart,
  Menu,
  X,
  ShieldCheck,
} from 'lucide-react';
import { BRAND } from '../../config/featureGates';
import { usePrefersReducedMotion } from '../../hooks/useReducedMotion';

const PRIMARY_LINKS = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/lotteries', label: 'Lotteries', icon: Ticket },
  { to: '/results', label: 'Results', icon: FileText },
  { to: '/winners', label: 'Winners', icon: Trophy },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduced = usePrefersReducedMotion();

  return (
    <motion.header
      initial={reduced ? false : { y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: reduced ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-40 bg-white/95 shadow-sm backdrop-blur-md"
    >
      {/* Main Header */}
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-2.5 py-1 focus:outline-none">
          <img
            src={BRAND.logoSrc}
            alt={BRAND.name}
            className="h-10 w-auto max-w-[115px] object-contain transition-transform duration-200 group-hover:scale-105 sm:h-12 sm:max-w-[135px]"
          />
          <div className="hidden sm:block">
            <span className="block font-display text-base font-bold leading-none tracking-wide text-charcoal">
              {BRAND.name}
            </span>
            <span className="mt-0.5 block text-[10px] font-bold uppercase tracking-[0.14em] text-chillired">
              {BRAND.tagline}
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
          {PRIMARY_LINKS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `relative inline-flex items-center gap-1.5 py-1 text-sm font-semibold transition-colors ${
                  isActive ? 'text-chillired' : 'text-charcoal hover:text-chillired'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className="h-4 w-4 text-chillired" aria-hidden="true" />
                  <span>{label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-chillired" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right Controls */}
        <div className="hidden items-center gap-3 lg:flex">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-charcoal">
            <Link to="/login" className="hover:text-chillired">
              Log In
            </Link>
            <span className="text-slate-400">/</span>
            <Link to="/register" className="hover:text-chillired">
              Register
            </Link>
          </div>

          <Link
            to="/booking-history"
            className="relative inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-ivory px-3 py-1.5 text-xs font-bold text-charcoal hover:border-chillired hover:text-chillired"
            title="Saved Items"
          >
            <ShoppingCart className="h-4 w-4 text-chillired" aria-hidden="true" />
            <span>Cart</span>
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-chillired text-[10px] font-bold text-white">
              0
            </span>
          </Link>

          <Link
            to="/admin"
            className="inline-flex items-center gap-1 rounded-xl bg-chillired px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-chillired-dark"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-metallicgold" aria-hidden="true" />
            Admin
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-xl border border-metallicgold/50 bg-ivory p-2 text-chillired lg:hidden"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Legal Disclaimer Bar + Smooth Single-Pass Announcement Ticker */}
      <div className="border-t border-metallicgold/40 bg-ivory px-4 py-1 text-center text-[11px] font-semibold text-charcoal">
        <strong className="text-chillired">Informational Only:</strong> {BRAND.name} is not
        affiliated with the Government of Kerala. No ticket sales, bookings, or payments.
      </div>
      <div
        className="flex min-h-[36px] w-full items-center overflow-hidden border-y border-metallicgold/40 bg-[#FFF8E7] py-1 text-[11px] font-medium text-charcoal sm:min-h-[40px] sm:text-xs md:text-[13px]"
        role="region"
        aria-label="Latest lottery announcements"
      >
        <div className="nidhi-marquee-track">
          <div className="flex shrink-0 items-center gap-2 whitespace-nowrap px-4">
            <Bell className="h-3.5 w-3.5 shrink-0 text-chillired" aria-hidden="true" />
            <span>
              <strong className="font-bold text-chillired">Stay Updated!</strong> Explore Upcoming
              Lottery Draws, Check the{' '}
              <strong className="font-bold text-chillired">Latest Results</strong>, and Never Miss
              an Important Update!
            </span>
            <Trophy className="ml-1 h-3.5 w-3.5 shrink-0 text-metallicgold-dark" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={reduced ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={reduced ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: reduced ? 0 : 0.2, ease: 'easeOut' }}
            className="overflow-hidden border-t border-slate-200 bg-white px-4 py-4 shadow-lg lg:hidden"
          >
            <nav className="grid gap-1.5" aria-label="Mobile navigation drawer">
              {[
                { to: '/', label: 'Home' },
                { to: '/lotteries', label: 'All Lotteries' },
                { to: '/daily-lotteries', label: 'Daily Lotteries' },
                { to: '/weekly-lotteries', label: 'Weekly Lotteries' },
                { to: '/monthly-lotteries', label: 'Monthly Lotteries' },
                { to: '/results', label: 'Latest Results' },
                { to: '/previous-results', label: 'Previous Results' },
                { to: '/winners', label: 'Winners' },
                { to: '/draw-calendar', label: 'Draw Calendar' },
                { to: '/search', label: 'Global Search' },
                { to: '/information-centre', label: 'Info Centre' },
                { to: '/login', label: 'Log In / Register' },
                { to: '/dashboard', label: 'User Dashboard' },
                { to: '/faq', label: 'FAQ' },
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact Us' },
                { to: '/admin', label: 'Admin Dashboard' },
              ].map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-3 py-2 text-sm font-semibold ${
                      isActive
                        ? 'bg-chillired/10 text-chillired'
                        : 'text-slate-700 hover:bg-ivory'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
