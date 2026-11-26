import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from 'react';
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
  approveWinner,
  archiveWinner,
  createWinnerDraft as createWinnerDraftApi,
  deleteWinnerDraft as deleteWinnerDraftApi,
  getWinnerAuditEvents,
  getWinnerProof,
  listAdminWinners,
  listCeoWinners,
  publishWinner,
  rejectWinner,
  submitWinnerForApproval,
  unpublishWinner,
  updateWinnerDraft as updateWinnerDraftApi,
  uploadWinnerProof,
  validateAccessToken,
  verifyWinner,
  type WinnerApiRecord,
  type WinnerApiSession,
  type WinnerAuditEvent,
  type WinnerDraftInput,
} from '../../services/winnerApi';
import {
  SAMPLE_ANNOUNCEMENTS,
  SAMPLE_CATEGORIES,
  SAMPLE_DRAW_SCHEDULES,
  SAMPLE_FAQS,
  SAMPLE_LOTTERIES,
  SAMPLE_RESULTS_PLACEHOLDER,
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

const DEMO_MESSAGES: { id: string; sender: string; subject: string; status: string }[] = [];

const EMPTY_WINNER_FORM: WinnerDraftInput = {
  drawName: '',
  drawDate: '',
  prizeCategory: '1st Prize Tier',
  prizeAmount: '',
  ticketNumber: '',
};

function WinnerStatusBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-electricpurple/25 bg-electricpurple/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-electricpurple">
      {children}
    </span>
  );
}

export function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [demoResults, setDemoResults] = useState(SAMPLE_RESULTS_PLACEHOLDER);
  const [newDrawCode, setNewDrawCode] = useState('');
  const [newLotteryName, setNewLotteryName] = useState('');
  const [accessTokenDraft, setAccessTokenDraft] = useState('');
  const [winnerAccessToken, setWinnerAccessToken] = useState('');
  const [winnerSession, setWinnerSession] = useState<WinnerApiSession | null>(null);
  const [winnerRecords, setWinnerRecords] = useState<WinnerApiRecord[]>([]);
  const [winnerAuditEvents, setWinnerAuditEvents] = useState<WinnerAuditEvent[]>([]);
  const [winnerForm, setWinnerForm] = useState<WinnerDraftInput>(EMPTY_WINNER_FORM);
  const [editingWinnerId, setEditingWinnerId] = useState<string | null>(null);
  const [pendingProof, setPendingProof] = useState<File | null>(null);
  const [proofPreview, setProofPreview] = useState<{
    winnerId: string;
    url: string;
    mimeType: string;
    fileName: string;
  } | null>(null);
  const [winnerNotice, setWinnerNotice] = useState('');
  const [winnerError, setWinnerError] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isLoadingWinners, setIsLoadingWinners] = useState(false);
  const [isSavingWinner, setIsSavingWinner] = useState(false);
  const q = searchQuery.trim().toLowerCase();
  const visibleWinnerRecords = winnerRecords
    .filter((record) => winnerSession?.role === 'ADMIN' || record.approvalStatus !== 'DRAFT')
    .filter((record) => `${record.drawName} ${record.prizeCategory}`.toLowerCase().includes(q));
  const editingWinnerRecord = editingWinnerId
    ? winnerRecords.find((record) => record.id === editingWinnerId)
    : undefined;

  useEffect(
    () => () => {
      if (proofPreview) URL.revokeObjectURL(proofPreview.url);
    },
    [proofPreview],
  );

  const resetWinnerForm = () => {
    setWinnerForm(EMPTY_WINNER_FORM);
    setEditingWinnerId(null);
    setPendingProof(null);
    setWinnerError('');
  };

  const refreshWinnerData = async (
    token = winnerAccessToken,
    role = winnerSession?.role,
  ) => {
    if (!token || (role !== 'ADMIN' && role !== 'CEO')) return;
    setIsLoadingWinners(true);
    try {
      const [records, events] = await Promise.all([
        role === 'ADMIN' ? listAdminWinners(token) : listCeoWinners(token),
        getWinnerAuditEvents(token),
      ]);
      setWinnerRecords(records);
      setWinnerAuditEvents(events);
    } catch (error) {
      setWinnerError(error instanceof Error ? error.message : 'Could not load winner records.');
    } finally {
      setIsLoadingWinners(false);
    }
  };

  const handleWinnerConnect = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = accessTokenDraft.trim();
    if (!token) return;

    setIsConnecting(true);
    setWinnerError('');
    setWinnerNotice('');
    try {
      const session = await validateAccessToken(token);
      if (session.role !== 'ADMIN' && session.role !== 'CEO') {
        throw new Error('This winner workflow requires an ADMIN or CEO access token.');
      }
      setWinnerAccessToken(token);
      setWinnerSession(session);
      await refreshWinnerData(token, session.role);
      setAccessTokenDraft('');
    } catch (error) {
      setWinnerError(error instanceof Error ? error.message : 'Could not validate this access token.');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWinnerSession = () => {
    setWinnerAccessToken('');
    setWinnerSession(null);
    setWinnerRecords([]);
    setWinnerAuditEvents([]);
    setAccessTokenDraft('');
    setWinnerNotice('');
    resetWinnerForm();
    if (proofPreview) URL.revokeObjectURL(proofPreview.url);
    setProofPreview(null);
  };

  const runWinnerAction = async (action: () => Promise<unknown>, successMessage: string) => {
    setWinnerError('');
    try {
      await action();
      setWinnerNotice(successMessage);
      await refreshWinnerData();
    } catch (error) {
      setWinnerError(error instanceof Error ? error.message : 'The winner action could not be completed.');
    }
  };

  const handleWinnerProofChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = '';
    if (!file) return;

    const acceptedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
    if (!acceptedTypes.includes(file.type)) {
      setWinnerError('Choose a PDF, JPEG, PNG, or WebP proof file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setWinnerError('Proof files must be 5 MB or smaller.');
      return;
    }

    setPendingProof(file);
    setWinnerError('');
  };

  const handleSaveWinnerDraft = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!winnerAccessToken || winnerSession?.role !== 'ADMIN') {
      setWinnerError('Connect with an Admin access token to manage drafts.');
      return;
    }

    const input: WinnerDraftInput = {
      ...winnerForm,
      drawName: winnerForm.drawName.trim(),
      prizeCategory: winnerForm.prizeCategory.trim(),
      prizeAmount: winnerForm.prizeAmount.trim(),
      ticketNumber: winnerForm.ticketNumber.trim(),
    };

    setIsSavingWinner(true);
    setWinnerError('');
    try {
      const record = editingWinnerId
        ? await updateWinnerDraftApi(winnerAccessToken, editingWinnerId, input)
        : await createWinnerDraftApi(winnerAccessToken, input);

      if (!editingWinnerId) setEditingWinnerId(record.id);
      if (pendingProof) {
        await uploadWinnerProof(winnerAccessToken, record.id, pendingProof);
        setPendingProof(null);
      }
      await refreshWinnerData();
      resetWinnerForm();
      setWinnerNotice(editingWinnerId ? 'Draft updated in PostgreSQL.' : 'Draft created in PostgreSQL.');
    } catch (error) {
      setWinnerError(error instanceof Error ? error.message : 'The draft could not be saved.');
    } finally {
      setIsSavingWinner(false);
    }
  };

  const handleEditWinnerDraft = (record: WinnerApiRecord) => {
    setWinnerForm({
      drawName: record.drawName,
      drawDate: record.drawDate,
      prizeCategory: record.prizeCategory,
      prizeAmount: record.prizeAmount,
      ticketNumber: record.ticketNumber,
    });
    setPendingProof(null);
    setEditingWinnerId(record.id);
    setWinnerNotice('');
    setWinnerError('');
  };

  const handleProofReview = async (record: WinnerApiRecord) => {
    if (!winnerAccessToken || !record.proof) return;
    setWinnerError('');
    try {
      const file = await getWinnerProof(winnerAccessToken, record.id);
      if (proofPreview) URL.revokeObjectURL(proofPreview.url);
      setProofPreview({
        winnerId: record.id,
        url: URL.createObjectURL(file),
        mimeType: record.proof.mimeType,
        fileName: record.proof.fileName,
      });
    } catch (error) {
      setWinnerError(error instanceof Error ? error.message : 'Could not load the proof document.');
    }
  };
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
                    {winnerAuditEvents.slice(0, 6).map((log) => (
                      <div
                        key={log.id}
                        className="flex flex-wrap items-center justify-between gap-2 py-2.5"
                      >
                        <div>
                          <span className="font-mono font-bold text-royalblue">{log.action}</span>
                          <span className="ml-2 text-slate-600">on {log.winnerLabel}</span>
                        </div>
                        <span className="text-slate-500">
                          {log.actorRole} · {new Date(log.timestamp).toLocaleString()}
                        </span>
                      </div>
                    ))}
                    {winnerAuditEvents.length === 0 && (
                      <p className="py-3 text-xs text-slate-500">No winner actions have been recorded in this session.</p>
                    )}
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
                  <div className="space-y-5">
                    {!winnerSession ? (
                      <div className="space-y-4 rounded-xl border border-metallicgold/50 bg-ivory p-5">
                        <div className="flex flex-wrap items-center gap-2">
                          <SampleDataBadge label="BACKEND WORKFLOW" />
                          <LegalGateBadge label="Trusted Admin/CEO Token Required" />
                        </div>
                        <div>
                          <h3 className="font-display text-lg font-bold text-midnight">Connect to Winner Management</h3>
                          <p className="mt-2 text-xs leading-relaxed text-slate-700">
                            Provide a short-lived access token issued by the configured trusted authentication service.
                            The backend validates its role. This page keeps the token in memory only; no token is issued
                            or saved by this frontend.
                          </p>
                        </div>
                        <form onSubmit={handleWinnerConnect} className="flex flex-col gap-3 sm:flex-row">
                          <label className="flex-1 space-y-1 text-xs font-semibold text-slate-700">
                            <span className="block">Admin or CEO access token</span>
                            <input
                              required
                              type="password"
                              autoComplete="off"
                              value={accessTokenDraft}
                              onChange={(event) => setAccessTokenDraft(event.target.value)}
                              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                            />
                          </label>
                          <button
                            type="submit"
                            disabled={isConnecting}
                            className="self-end rounded-lg bg-royalblue px-4 py-2 text-xs font-bold text-white disabled:opacity-50"
                          >
                            {isConnecting ? 'Checking token…' : 'Connect'}
                          </button>
                        </form>
                        {winnerError && <p role="alert" className="text-xs font-semibold text-royalred">{winnerError}</p>}
                      </div>
                    ) : (
                      <>
                        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-teal-700/20 bg-teal-50 p-4">
                          <div>
                            <p className="text-sm font-bold text-teal-800">Connected as {winnerSession.role}</p>
                            <p className="mt-1 text-xs text-slate-600">
                              Winner actions and access are checked by the backend. Data and audit history come from PostgreSQL.
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={disconnectWinnerSession}
                            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700"
                          >
                            Disconnect
                          </button>
                        </div>

                        {winnerError && <p role="alert" className="text-xs font-semibold text-royalred">{winnerError}</p>}
                        {winnerNotice && <p role="status" className="text-xs font-semibold text-teal-700">{winnerNotice}</p>}

                        {winnerSession.role === 'ADMIN' && (
                          <form
                            onSubmit={handleSaveWinnerDraft}
                            className="space-y-4 rounded-xl border border-slate-200 bg-lightbg p-4"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <h3 className="font-display text-lg font-bold text-midnight">
                                {editingWinnerId ? 'Edit Winner Draft' : 'Add Winner Draft'}
                              </h3>
                              <WinnerStatusBadge>{editingWinnerId ? 'Editing Draft' : 'Draft'}</WinnerStatusBadge>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">
                              <label className="space-y-1 text-xs font-semibold text-slate-700">
                                <span className="block">Draw name</span>
                                <input required maxLength={160} value={winnerForm.drawName}
                                  onChange={(event) => setWinnerForm((current) => ({ ...current, drawName: event.target.value }))}
                                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" />
                              </label>
                              <label className="space-y-1 text-xs font-semibold text-slate-700">
                                <span className="block">Draw date</span>
                                <input required type="date" value={winnerForm.drawDate}
                                  onChange={(event) => setWinnerForm((current) => ({ ...current, drawDate: event.target.value }))}
                                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" />
                              </label>
                              <label className="space-y-1 text-xs font-semibold text-slate-700">
                                <span className="block">Prize category</span>
                                <select required value={winnerForm.prizeCategory}
                                  onChange={(event) => setWinnerForm((current) => ({ ...current, prizeCategory: event.target.value }))}
                                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm">
                                  <option>1st Prize Tier</option><option>2nd Prize Tier</option>
                                  <option>3rd Prize Tier</option><option>Other</option>
                                </select>
                              </label>
                              <label className="space-y-1 text-xs font-semibold text-slate-700">
                                <span className="block">Prize amount (informational)</span>
                                <input required maxLength={80} value={winnerForm.prizeAmount}
                                  onChange={(event) => setWinnerForm((current) => ({ ...current, prizeAmount: event.target.value }))}
                                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" />
                              </label>
                              <label className="space-y-1 text-xs font-semibold text-slate-700 sm:col-span-2">
                                <span className="block">Ticket number (private to Admin/CEO)</span>
                                <input required maxLength={160} value={winnerForm.ticketNumber}
                                  onChange={(event) => setWinnerForm((current) => ({ ...current, ticketNumber: event.target.value }))}
                                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" />
                              </label>
                            </div>

                            <label className="block space-y-1 text-xs font-semibold text-slate-700">
                              <span className="block">Official result proof for CEO review</span>
                              <input type="file" accept="application/pdf,image/jpeg,image/png,image/webp"
                                onChange={handleWinnerProofChange}
                                className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-ivory file:px-3 file:py-1 file:font-semibold" />
                              <span className="block font-normal text-slate-500">
                                PDF, JPEG, PNG, or WebP, up to 5 MB. The backend validates file content and stores it privately.
                              </span>
                            </label>
                            <p className="text-xs text-slate-600">
                              {pendingProof
                                ? `Selected, not yet uploaded: ${pendingProof.name}`
                                : editingWinnerRecord?.proof
                                  ? `Current proof: ${editingWinnerRecord.proof.fileName}`
                                  : 'No proof attached. Proof is required before submission.'}
                            </p>

                            <div className="flex flex-wrap gap-2">
                              <button type="submit" disabled={isSavingWinner}
                                className="rounded-lg bg-royalred px-4 py-2 text-xs font-bold text-white hover:bg-royalred-dark disabled:opacity-50">
                                {isSavingWinner ? 'Saving…' : editingWinnerId ? 'Update Draft' : 'Create Draft'}
                              </button>
                              {editingWinnerId && (
                                <button type="button" onClick={resetWinnerForm}
                                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700">
                                  Cancel Edit
                                </button>
                              )}
                            </div>
                          </form>
                        )}

                        <div className="flex items-center justify-between gap-3">
                          <h3 className="font-display text-lg font-bold text-midnight">
                            {winnerSession.role === 'ADMIN' ? 'Admin Drafts & Submissions' : 'CEO Review Queue'}
                          </h3>
                          <WinnerStatusBadge>{visibleWinnerRecords.length} Records</WinnerStatusBadge>
                        </div>

                        {isLoadingWinners ? (
                          <div className="rounded-xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-600">Loading winner records…</div>
                        ) : visibleWinnerRecords.length === 0 ? (
                          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-600">
                            {winnerSession.role === 'CEO'
                              ? 'No submitted winner records are waiting for CEO review.'
                              : 'No winner drafts or submissions match this search.'}
                          </div>
                        ) : (
                          visibleWinnerRecords.map((record) => {
                            const canEditDraft = winnerSession.role === 'ADMIN' &&
                              (record.approvalStatus === 'DRAFT' || record.approvalStatus === 'REJECTED');
                            return (
                              <article key={record.id} className="space-y-4 rounded-xl border border-slate-200 bg-white p-4">
                                <div className="flex flex-wrap items-start justify-between gap-3">
                                  <div>
                                    <h3 className="font-display text-lg font-bold text-midnight">{record.drawName}</h3>
                                    <p className="text-xs text-slate-600">{record.drawDate} · {record.prizeCategory} · {record.prizeAmount}</p>
                                    <p className="mt-1 text-xs text-slate-500">Ticket: {record.ticketNumber}</p>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    <WinnerStatusBadge>Proof: {record.verificationStatus}</WinnerStatusBadge>
                                    <WinnerStatusBadge>Approval: {record.approvalStatus.replace('_', ' ')}</WinnerStatusBadge>
                                    {record.isPublished && <SampleDataBadge label="PUBLISHED" />}
                                  </div>
                                </div>

                                <div className="rounded-lg border border-slate-200 bg-lightbg p-3">
                                  <div className="flex flex-wrap items-center justify-between gap-2">
                                    <p className="text-xs font-semibold text-slate-700">
                                      Official proof: {record.proof?.fileName || 'No file attached'}
                                    </p>
                                    {record.proof && (
                                      <button type="button" onClick={() => void handleProofReview(record)}
                                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700">
                                        {proofPreview?.winnerId === record.id ? 'Refresh proof' : 'Review proof'}
                                      </button>
                                    )}
                                  </div>
                                  {proofPreview?.winnerId === record.id && (
                                    <div className="mt-3 space-y-2">
                                      {proofPreview.mimeType.startsWith('image/') ? (
                                        <img src={proofPreview.url} alt="Privately retrieved official proof"
                                          className="max-h-96 max-w-full rounded-lg object-contain" />
                                      ) : (
                                        <iframe title={`Proof document ${proofPreview.fileName}`} src={proofPreview.url}
                                          className="h-96 w-full rounded-lg border border-slate-200" />
                                      )}
                                      <button type="button" onClick={() => {
                                        URL.revokeObjectURL(proofPreview.url);
                                        setProofPreview(null);
                                      }} className="text-xs font-bold text-slate-600 underline">Close proof</button>
                                    </div>
                                  )}
                                </div>

                                {record.rejectionReason && (
                                  <p className="rounded-lg border border-royalred/20 bg-royalred/5 p-3 text-xs text-royalred">
                                    CEO rejection reason: {record.rejectionReason}
                                  </p>
                                )}
                                {record.approvalReason && (
                                  <p className="rounded-lg border border-teal-700/20 bg-teal-50 p-3 text-xs text-teal-800">
                                    CEO approval reason: {record.approvalReason}
                                  </p>
                                )}

                                <div className="flex flex-wrap items-end gap-3">
                                  {canEditDraft && (
                                    <>
                                      <button type="button" onClick={() => handleEditWinnerDraft(record)}
                                        className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700">
                                        {record.approvalStatus === 'REJECTED' ? 'Revise Draft' : 'Edit Draft'}
                                      </button>
                                      {record.approvalStatus === 'DRAFT' && (
                                        <button type="button" onClick={() => {
                                          if (window.confirm('Delete this draft from PostgreSQL?')) {
                                            void runWinnerAction(() => deleteWinnerDraftApi(winnerAccessToken, record.id), 'Draft deleted.');
                                          }
                                        }} className="rounded-lg border border-royalred/30 px-3 py-2 text-xs font-bold text-royalred">
                                          Delete Draft
                                        </button>
                                      )}
                                    </>
                                  )}
                                  {winnerSession.role === 'ADMIN' && record.approvalStatus === 'DRAFT' && (
                                    <button type="button" disabled={!record.proof || isLoadingWinners}
                                      onClick={() => void runWinnerAction(
                                        () => submitWinnerForApproval(winnerAccessToken, record.id),
                                        'Submitted for CEO approval.',
                                      )} className="rounded-lg bg-royalblue px-3 py-2 text-xs font-bold text-white disabled:opacity-40">
                                      Submit for CEO Approval
                                    </button>
                                  )}
                                  {winnerSession.role === 'CEO' && record.approvalStatus === 'PENDING_APPROVAL' && (
                                    <>
                                      {record.verificationStatus !== 'VERIFIED' && (
                                        <button type="button" disabled={!record.proof || isLoadingWinners}
                                          onClick={() => void runWinnerAction(
                                            () => verifyWinner(winnerAccessToken, record.id),
                                            'Official proof verified.',
                                          )} className="rounded-lg bg-royalblue px-3 py-2 text-xs font-bold text-white disabled:opacity-40">
                                          Verify Official Proof
                                        </button>
                                      )}
                                      {record.verificationStatus === 'VERIFIED' && (
                                        <button type="button" onClick={() => {
                                          const reason = window.prompt('Enter the approval reason:');
                                          if (reason?.trim()) {
                                            void runWinnerAction(
                                              () => approveWinner(winnerAccessToken, record.id, reason),
                                              'Winner approved.',
                                            );
                                          }
                                        }} className="rounded-lg bg-teal-700 px-3 py-2 text-xs font-bold text-white">
                                          Approve Winner
                                        </button>
                                      )}
                                      <button type="button" onClick={() => {
                                        const reason = window.prompt('Enter a reason for rejecting this submission:');
                                        if (reason?.trim()) {
                                          void runWinnerAction(
                                            () => rejectWinner(winnerAccessToken, record.id, reason),
                                            'Submission rejected and reason recorded.',
                                          );
                                        }
                                      }} className="rounded-lg border border-royalred/30 px-3 py-2 text-xs font-bold text-royalred">
                                        Reject Record
                                      </button>
                                    </>
                                  )}
                                  {winnerSession.role === 'CEO' && record.approvalStatus === 'APPROVED' && (
                                    <>
                                      {record.isPublished ? (
                                        <button type="button" onClick={() => void runWinnerAction(
                                          () => unpublishWinner(winnerAccessToken, record.id), 'Winner unpublished.',
                                        )} className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700">
                                          Unpublish Winner
                                        </button>
                                      ) : (
                                        <button type="button" onClick={() => void runWinnerAction(
                                          () => publishWinner(winnerAccessToken, record.id), 'Winner published.',
                                        )} className="rounded-lg bg-teal-700 px-3 py-2 text-xs font-bold text-white">
                                          Publish Approved Winner
                                        </button>
                                      )}
                                      <button type="button" onClick={() => {
                                        if (window.confirm('Archive this winner and remove it from public results?')) {
                                          void runWinnerAction(() => archiveWinner(winnerAccessToken, record.id), 'Winner archived.');
                                        }
                                      }} className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700">
                                        Archive Record
                                      </button>
                                    </>
                                  )}
                                </div>
                              </article>
                            );
                          })
                        )}
                      </>
                    )}
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
                    {winnerAuditEvents
                      .filter((event) =>
                        `${event.action} ${event.winnerLabel} ${event.actorRole}`.toLowerCase().includes(q),
                      )
                      .map((event) => (
                      <div key={event.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                        <div>
                          <span className="font-mono font-bold text-royalblue">{event.action}</span>
                          <span className="ml-2 text-slate-600">{event.winnerLabel}</span>
                          {event.details && <p className="mt-1 text-slate-500">{event.details}</p>}
                        </div>
                        <span className="text-slate-500">
                          {event.actorRole} · {new Date(event.timestamp).toLocaleString()}
                        </span>
                      </div>
                    ))}
                    {winnerAuditEvents.filter((event) =>
                      `${event.action} ${event.winnerLabel} ${event.actorRole}`.toLowerCase().includes(q),
                    ).length === 0 && (
                      <p className="py-3 text-slate-500">No matching session audit events.</p>
                    )}
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
