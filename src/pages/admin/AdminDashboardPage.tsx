import { useState } from 'react';
import {
  Award,
  Bell,
  CalendarDays,
  FileText,
  FolderKanban,
  HelpCircle,
  History,
  Image as ImageIcon,
  Mail,
  Scale,
  ScrollText,
  Search,
  ShieldAlert,
  Trophy,
} from 'lucide-react';
import { BRAND } from '../../config/featureGates';
import { LuxuryCard } from '../../components/ui/LuxuryCard';
import { LegalGateBadge, SampleDataBadge } from '../../components/ui/Badges';
import { GoldButton } from '../../components/ui/GoldButton';
import {
  SAMPLE_ANNOUNCEMENTS,
  SAMPLE_CATEGORIES,
  SAMPLE_DRAW_SCHEDULES,
  SAMPLE_FAQS,
  SAMPLE_LOTTERIES,
  SAMPLE_RESULTS_PLACEHOLDER,
  SAMPLE_WINNERS_PLACEHOLDER,
} from '../../data/placeholderData';

const ADMIN_TABS = [
  { id: 'overview', label: 'Overview', icon: ShieldAlert },
  { id: 'lotteries', label: 'Scheme Management', icon: FileText },
  { id: 'categories', label: 'Categories', icon: FolderKanban },
  { id: 'results', label: 'Results Management (Gated)', icon: Trophy },
  { id: 'previousResults', label: 'Previous Results (Gated)', icon: History },
  { id: 'schedules', label: 'Draw Management', icon: CalendarDays },
  { id: 'winners', label: 'Winners Management (Gated)', icon: Award },
  { id: 'customers', label: 'Customer Management', icon: ShieldAlert },
  { id: 'bookings', label: 'Booking Management (Disabled)', icon: FolderKanban },
  { id: 'analytics', label: 'Reports & Analytics', icon: Trophy },
  { id: 'media', label: 'Banners & Media', icon: ImageIcon },
  { id: 'announcements', label: 'Notifications & News', icon: Bell },
  { id: 'faq', label: 'FAQ', icon: HelpCircle },
  { id: 'messages', label: 'Support Management', icon: Mail },
  { id: 'audit', label: 'Audit Logs', icon: ScrollText },
] as const;

type TabId = (typeof ADMIN_TABS)[number]['id'];

const DEMO_AUDIT_LOGS: { id: string; actor: string; role: string; action: string; entity: string }[] = [];

const DEMO_MESSAGES: { id: string; sender: string; subject: string; status: string }[] = [];

export function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [demoResults, setDemoResults] = useState(SAMPLE_RESULTS_PLACEHOLDER);
  const [newDrawCode, setNewDrawCode] = useState('');
  const [newLotteryName, setNewLotteryName] = useState('');
  const q = searchQuery.trim().toLowerCase();

  const handleAddDemoResult = () => {
    if (!newDrawCode.trim() || !newLotteryName.trim()) return;
    setDemoResults((prev) => [
      {
        id: `res-REF-${Date.now()}`,
        schemeSlug: 'sample-weekly-format-a',
        lotteryName: `${newLotteryName.trim()}`,
        drawCode: newDrawCode.trim().toUpperCase(),
        drawDate: '2026-11-25',
        prizeCategory: '1st Prize',
        sampleNumbers: ['07', '18', '32'],
        status: 'PENDING_LEGAL_REVIEW',
        isSample: true,
        note: 'Added in local UI state only (not persisted).',
        prizeBreakdown: [],
      },
      ...prev,
    ]);
    setNewDrawCode('');
    setNewLotteryName('');
  };

  return (
    <div className="section-band-electric min-h-[75vh] py-10">
      <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
        <LuxuryCard className="border-electricpurple/30 bg-gradient-to-r from-white via-[#F5F3FF] to-[#E8FBF8]">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <img
                src={BRAND.logoSrc}
                alt={BRAND.name}
                className="h-14 w-auto shrink-0 object-contain"
              />
              <div className="space-y-1.5">
                <div className="flex flex-wrap gap-2">
                  <SampleDataBadge label="Info PROTOTYPE — MOCK DATA ONLY" />
                  <LegalGateBadge label="No Backend / No Auth Enabled" />
                </div>
                <h1 className="font-display text-2xl font-bold text-midnight sm:text-3xl">
                  {BRAND.name} — Admin Dashboard UI Prototype
                </h1>
                <p className="text-xs text-slate-600">
                  Frontend-only interactive prototype using mock INFORMATIONAL DATA. Authentication, database
                  persistence, and API calls are intentionally omitted.
                </p>
              </div>
            </div>
            <GoldButton to="/" variant="outline">
              Return to Public Site
            </GoldButton>
          </div>
        </LuxuryCard>

        <div className="grid gap-6 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <LuxuryCard className="space-y-1 p-3">
              {ADMIN_TABS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setActiveTab(id);
                    setSearchQuery('');
                  }}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-bold transition-colors ${
                    activeTab === id
                      ? 'bg-gradient-to-r from-royalblue to-electricpurple text-white shadow-sm'
                      : 'text-slate-600 hover:bg-lightbg hover:text-midnight'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {label}
                </button>
              ))}
            </LuxuryCard>
          </aside>

          <div className="space-y-6 lg:col-span-9">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-3">
                  <LuxuryCard>
                    <span className="text-xs font-semibold text-slate-500">Legal Gates Active</span>
                    <p className="mt-1 font-display text-3xl font-bold text-royalblue">
                      3 / 3 Locked
                    </p>
                    <span className="text-[11px] font-medium text-teal-700">
                      Results, Winners, Promos
                    </span>
                  </LuxuryCard>
                  <LuxuryCard>
                    <span className="text-xs font-semibold text-slate-500">
                      Lottery Entries
                    </span>
                    <p className="mt-1 font-display text-3xl font-bold text-electricpurple">
                      {SAMPLE_LOTTERIES.length}
                    </p>
                    <span className="text-[11px] text-slate-500">Mock Frontend Records</span>
                  </LuxuryCard>
                  <LuxuryCard>
                    <span className="text-xs font-semibold text-slate-500">
                      Commercial Features
                    </span>
                    <p className="mt-1 font-display text-3xl font-bold text-coralpink">Disabled</p>
                    <span className="text-[11px] text-slate-500">
                      No Sales, Payments, or Wallets
                    </span>
                  </LuxuryCard>
                </div>

                <LuxuryCard className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-xl font-bold text-midnight">
                      Recent Audit Activity
                    </h2>
                    <SampleDataBadge label="INFO" />
                  </div>
                  <div className="divide-y divide-slate-100 text-xs">
                    {DEMO_AUDIT_LOGS.map((log) => (
                      <div
                        key={log.id}
                        className="flex flex-wrap items-center justify-between gap-2 py-2.5"
                      >
                        <div>
                          <span className="font-mono font-bold text-royalblue">{log.action}</span>
                          <span className="ml-2 text-slate-600">on {log.entity}</span>
                        </div>
                        <span className="text-slate-500">
                          {log.actor} ({log.role})
                        </span>
                      </div>
                    ))}
                  </div>
                </LuxuryCard>
              </div>
            )}

            {activeTab !== 'overview' && (
              <LuxuryCard className="space-y-5">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <SampleDataBadge label="INFORMATIONAL DATA" />
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-electricpurple">
                        <Scale className="h-3.5 w-3.5" aria-hidden="true" />
                        Legal Review Required
                      </span>
                    </div>
                    <h2 className="font-display text-2xl font-bold text-midnight">
                      {ADMIN_TABS.find((t) => t.id === activeTab)?.label}
                    </h2>
                  </div>
                  <div className="relative w-full sm:w-64">
                    <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Filter items..."
                      className="w-full rounded-xl border border-royalblue/25 bg-lightbg py-2 pl-9 pr-3 text-xs font-medium text-midnight focus:border-electricpurple focus:outline-none"
                    />
                  </div>
                </div>

                {activeTab === 'lotteries' && (
                  <div className="divide-y divide-slate-100 text-sm">
                    {SAMPLE_LOTTERIES.filter((l) => l.name.toLowerCase().includes(q)).map((l) => (
                      <div
                        key={l.id}
                        className="flex flex-wrap items-center justify-between gap-2 py-3"
                      >
                        <div>
                          <p className="font-bold text-midnight">{l.name}</p>
                          <p className="text-xs text-slate-500">{l.scheduleText}</p>
                        </div>
                        <LegalGateBadge label={l.legalReviewStatus} />
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'categories' && (
                  <div className="divide-y divide-slate-100 text-sm">
                    {SAMPLE_CATEGORIES.filter((c) => c.name.toLowerCase().includes(q)).map((c) => (
                      <div key={c.id} className="flex items-center justify-between py-3">
                        <div>
                          <p className="font-bold text-midnight">{c.name}</p>
                          <p className="text-xs text-slate-500">{c.frequencyLabel}</p>
                        </div>
                        <SampleDataBadge label="INFO" />
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'results' && (
                  <div className="space-y-4">
                    <div className="grid gap-2 rounded-xl border border-metallicgold/45 bg-ivory p-3 sm:grid-cols-3">
                      <input
                        value={newLotteryName}
                        onChange={(e) => setNewLotteryName(e.target.value)}
                        placeholder="SCHEME Name"
                        className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs text-charcoal"
                      />
                      <input
                        value={newDrawCode}
                        onChange={(e) => setNewDrawCode(e.target.value)}
                        placeholder="Draw Code (e.g. REF-004)"
                        className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs text-charcoal"
                      />
                      <button
                        type="button"
                        onClick={handleAddDemoResult}
                        className="rounded-lg bg-royalred px-3 py-1.5 text-xs font-bold text-white hover:bg-royalred-dark"
                      >
                        + Add Info Entry
                      </button>
                    </div>
                    {demoResults.map((r) => (
                      <div
                        key={r.id}
                        className="rounded-xl border border-slate-200 bg-lightbg p-4"
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-midnight">
                            {r.lotteryName} ({r.drawCode})
                          </p>
                          <LegalGateBadge label="PENDING LEGAL REVIEW" />
                        </div>
                        <p className="mt-1 text-xs text-slate-600">{r.note}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'previousResults' && (
                  <div className="divide-y divide-slate-100 text-sm">
                    {SAMPLE_RESULTS_PLACEHOLDER.filter((r) =>
                      r.lotteryName.toLowerCase().includes(q),
                    ).map((r) => (
                      <div key={r.id} className="flex items-center justify-between py-3">
                        <div>
                          <p className="font-bold text-midnight">{r.lotteryName}</p>
                          <p className="font-mono text-xs text-royalblue">
                            {r.drawCode} • {r.drawDate}
                          </p>
                        </div>
                        <LegalGateBadge label="GATED" />
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'schedules' && (
                  <div className="divide-y divide-slate-100 text-sm">
                    {SAMPLE_DRAW_SCHEDULES.filter((s) =>
                      s.schemeName.toLowerCase().includes(q),
                    ).map((s) => (
                      <div key={s.id} className="flex items-center justify-between py-3">
                        <div>
                          <p className="font-bold text-midnight">{s.schemeName}</p>
                          <p className="text-xs text-slate-500">
                            {s.drawDate} • {s.drawTime}
                          </p>
                        </div>
                        <SampleDataBadge label={s.status} />
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'winners' && (
                  <div className="space-y-3">
                    {SAMPLE_WINNERS_PLACEHOLDER.map((w) => (
                      <div
                        key={w.id}
                        className="rounded-xl border border-slate-200 bg-lightbg p-4"
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-midnight">{w.displayTitle}</p>
                          <span className="text-xs font-bold text-teal-700">
                            Consent: {w.consentStatus}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-slate-600">{w.districtOrRegion}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'customers' && (
                  <div className="rounded-xl border border-slate-200 bg-lightbg p-5 text-xs text-slate-600">
                    Info Customer Management Preview — No real customer PII is collected or stored in
                    informational-only mode.
                  </div>
                )}

                {activeTab === 'bookings' && (
                  <div className="rounded-xl border border-chillired/30 bg-chillired/5 p-5 text-xs text-chillired">
                    Booking, payments, and wallet management are permanently disabled until
                    applicable legal and payment permissions are verified.
                  </div>
                )}

                {activeTab === 'analytics' && (
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-xl border border-slate-200 bg-lightbg p-4">
                      <p className="text-xs text-slate-500">Info Page Views</p>
                      <p className="mt-1 font-display text-2xl font-bold text-charcoal">1,240</p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-lightbg p-4">
                      <p className="text-xs text-slate-500">Info Searches</p>
                      <p className="mt-1 font-display text-2xl font-bold text-chillired">385</p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-lightbg p-4">
                      <p className="text-xs text-slate-500">Legal Gates</p>
                      <p className="mt-1 font-display text-2xl font-bold text-charcoal">Active</p>
                    </div>
                  </div>
                )}

                {activeTab === 'media' && (
                  <div className="rounded-xl border border-dashed border-royalblue/30 bg-lightbg p-8 text-center text-xs text-slate-600">
                    Info Banner & Media Upload UI Preview — Uploads require legal review and backend
                    storage (not connected in frontend-only mode).
                  </div>
                )}

                {activeTab === 'announcements' && (
                  <div className="divide-y divide-slate-100 text-sm">
                    {SAMPLE_ANNOUNCEMENTS.filter((a) => a.title.toLowerCase().includes(q)).map(
                      (a) => (
                        <div key={a.id} className="py-3">
                          <p className="font-bold text-midnight">{a.title}</p>
                          <p className="mt-1 text-xs text-slate-600">{a.body}</p>
                        </div>
                      ),
                    )}
                  </div>
                )}

                {activeTab === 'faq' && (
                  <div className="divide-y divide-slate-100 text-sm">
                    {SAMPLE_FAQS.filter((f) => f.question.toLowerCase().includes(q)).map((f) => (
                      <div key={f.id} className="py-3">
                        <p className="font-bold text-midnight">{f.question}</p>
                        <p className="mt-1 text-xs text-slate-600">{f.answer}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'messages' && (
                  <div className="divide-y divide-slate-100 text-sm">
                    {DEMO_MESSAGES.filter((m) => m.subject.toLowerCase().includes(q)).map((m) => (
                      <div key={m.id} className="flex items-center justify-between py-3">
                        <div>
                          <p className="font-bold text-midnight">{m.subject}</p>
                          <p className="text-xs text-slate-500">From: {m.sender}</p>
                        </div>
                        <span className="rounded-full bg-royalblue/10 px-2.5 py-0.5 text-[11px] font-bold text-royalblue">
                          {m.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'audit' && (
                  <div className="divide-y divide-slate-100 text-xs">
                    {DEMO_AUDIT_LOGS.filter((l) => l.action.toLowerCase().includes(q)).map((l) => (
                      <div key={l.id} className="flex items-center justify-between py-3">
                        <span className="font-mono font-bold text-royalblue">{l.action}</span>
                        <span className="text-slate-600">{l.entity}</span>
                        <span className="text-slate-500">{l.actor}</span>
                      </div>
                    ))}
                  </div>
                )}
              </LuxuryCard>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
