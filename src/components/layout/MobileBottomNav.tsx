import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Layers, Trophy, CalendarDays, Compass } from 'lucide-react';
import { usePrefersReducedMotion } from '../../hooks/useReducedMotion';

const MOBILE_TABS = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/lottery-information', label: 'Schemes', icon: Layers },
  { to: '/results', label: 'Results', icon: Trophy },
  { to: '/draw-calendar', label: 'Calendar', icon: CalendarDays },
  { to: '/information-centre', label: 'Info', icon: Compass },
];

export function MobileBottomNav() {
  const reduced = usePrefersReducedMotion();

  return (
    <nav
      aria-label="Mobile bottom navigation"
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-metallicgold/40 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-6px_24px_rgba(6,78,74,0.12)] backdrop-blur-md lg:hidden"
    >
      <div className="grid grid-cols-5">
        {MOBILE_TABS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `relative flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-bold transition-colors ${
                isActive ? 'text-royalred' : 'text-slate-500 hover:text-deepteal'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId={reduced ? undefined : 'mobileNavIndicator'}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute top-0 h-0.5 w-8 rounded-full bg-gradient-to-r from-royalred to-metallicgold"
                  />
                )}
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
