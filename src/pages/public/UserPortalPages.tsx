import { Link } from 'react-router-dom';
import { Bell, History, User } from 'lucide-react';
import { LuxuryCard } from '../../components/ui/LuxuryCard';
import { LegalGateBadge, SampleDataBadge } from '../../components/ui/Badges';

export function UserDashboardPage() {
  return (
    <div className="section-light min-h-[75vh] py-10">
      <div className="mx-auto max-w-5xl space-y-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2">
          <SampleDataBadge label="USER DASHBOARD" />
          <LegalGateBadge label="Wallets & Purchases Disabled" />
        </div>
        <h1 className="font-display text-3xl font-bold text-charcoal">User Dashboard</h1>

        <div className="grid gap-5 sm:grid-cols-3">
          <Link to="/booking-history">
            <LuxuryCard interactive className="space-y-2">
              <History className="h-6 w-6 text-chillired" />
              <h2 className="font-display text-lg font-bold text-charcoal">Booking History</h2>
              <p className="text-xs text-slate-600">
                NON-TRANSACTIONAL log. Online ticket booking is disabled.
              </p>
            </LuxuryCard>
          </Link>
          <Link to="/profile">
            <LuxuryCard interactive className="space-y-2">
              <User className="h-6 w-6 text-chillired" />
              <h2 className="font-display text-lg font-bold text-charcoal">Profile</h2>
              <p className="text-xs text-slate-600">View PROFILE & DPDP privacy controls.</p>
            </LuxuryCard>
          </Link>
          <Link to="/updates">
            <LuxuryCard interactive className="space-y-2">
              <Bell className="h-6 w-6 text-metallicgold-dark" />
              <h2 className="font-display text-lg font-bold text-charcoal">Notifications</h2>
              <p className="text-xs text-slate-600">View announcement centre & update alerts.</p>
            </LuxuryCard>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function BookingHistoryPage() {
  return (
    <div className="section-light min-h-[75vh] py-10">
      <div className="mx-auto max-w-4xl space-y-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2">
          <SampleDataBadge label="NON-TRANSACTIONAL" />
          <LegalGateBadge label="Ticket Sales & Wallets Disabled" />
        </div>
        <h1 className="font-display text-3xl font-bold text-charcoal">
          Booking & Cart Preview (Disabled)
        </h1>
        <LuxuryCard className="space-y-2">
          <p className="text-sm font-semibold text-charcoal">
            Online ticket purchasing, booking, wallet deposits, and withdrawals are disabled.
          </p>
          <p className="text-xs text-slate-600">
            This page exists strictly as a non-transactional UI placeholder pending applicable
            Kerala & Indian legal permissions.
          </p>
        </LuxuryCard>
      </div>
    </div>
  );
}

export function ProfilePage() {
  return (
    <div className="section-light min-h-[75vh] py-10">
      <div className="mx-auto max-w-3xl space-y-6 px-4 sm:px-6 lg:px-8">
        <SampleDataBadge label="PROFILE" />
        <h1 className="font-display text-3xl font-bold text-charcoal">Profile</h1>
        <LuxuryCard className="space-y-3 text-sm">
          <p>
            <strong className="text-charcoal">Display Name:</strong> Portal Visitor
          </p>
          <p>
            <strong className="text-charcoal">Status:</strong> Informational Portal Preview (No
            real account stored)
          </p>
        </LuxuryCard>
      </div>
    </div>
  );
}
