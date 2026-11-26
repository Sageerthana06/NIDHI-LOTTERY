import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { BRAND } from './config/featureGates';
import { PublicLayout } from './components/layout/PublicLayout';
import { HomePage } from './pages/public/HomePage';
import { LotteryInformationPage } from './pages/public/LotteryInformationPage';
import { LotteryCategoriesPage } from './pages/public/LotteryCategoriesPage';
import { LotteryDetailsPage } from './pages/public/LotteryDetailsPage';
import { PublishedResultsPage } from './pages/public/PublishedResultsPage';
import { PreviousResultsPage } from './pages/public/PreviousResultsPage';
import { WinnersPage } from './pages/public/WinnersPage';

const ResultDetailPage = lazy(() =>
  import('./pages/public/ResultDetailPage').then((m) => ({ default: m.ResultDetailPage })),
);
const DrawCalendarPage = lazy(() =>
  import('./pages/public/DrawCalendarPage').then((m) => ({ default: m.DrawCalendarPage })),
);
const UpdatesPage = lazy(() =>
  import('./pages/public/UpdatesPage').then((m) => ({ default: m.UpdatesPage })),
);
const SearchPage = lazy(() =>
  import('./pages/public/SearchPage').then((m) => ({ default: m.SearchPage })),
);
const InformationCentrePage = lazy(() =>
  import('./pages/public/InformationCentrePage').then((m) => ({
    default: m.InformationCentrePage,
  })),
);
const AboutPage = lazy(() =>
  import('./pages/public/AboutPage').then((m) => ({ default: m.AboutPage })),
);
const ContactPage = lazy(() =>
  import('./pages/public/ContactPage').then((m) => ({ default: m.ContactPage })),
);
const FaqPage = lazy(() =>
  import('./pages/public/FaqPage').then((m) => ({ default: m.FaqPage })),
);
const PrivacyPolicyPage = lazy(() =>
  import('./pages/public/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage })),
);
const TermsPage = lazy(() =>
  import('./pages/public/TermsPage').then((m) => ({ default: m.TermsPage })),
);
const DisclaimerPage = lazy(() =>
  import('./pages/public/DisclaimerPage').then((m) => ({ default: m.DisclaimerPage })),
);
const ResponsiblePlayPage = lazy(() =>
  import('./pages/public/ResponsiblePlayPage').then((m) => ({ default: m.ResponsiblePlayPage })),
);
const LotteriesFilterPage = lazy(() =>
  import('./pages/public/LotteriesFilterPage').then((m) => ({ default: m.LotteriesFilterPage })),
);
const LoginPage = lazy(() =>
  import('./pages/public/AuthDemoPages').then((m) => ({ default: m.LoginPage })),
);
const RegisterPage = lazy(() =>
  import('./pages/public/AuthDemoPages').then((m) => ({ default: m.RegisterPage })),
);
const UserDashboardPage = lazy(() =>
  import('./pages/public/UserPortalPages').then((m) => ({ default: m.UserDashboardPage })),
);
const BookingHistoryPage = lazy(() =>
  import('./pages/public/UserPortalPages').then((m) => ({ default: m.BookingHistoryPage })),
);
const ProfilePage = lazy(() =>
  import('./pages/public/UserPortalPages').then((m) => ({ default: m.ProfilePage })),
);
const AdminDashboardPage = lazy(() =>
  import('./pages/admin/AdminDashboardPage').then((m) => ({ default: m.AdminDashboardPage })),
);

const PAGE_TITLES: Record<string, string> = {
  '/': 'Home',
  '/lottery-information': 'Lottery Schemes',
  '/schemes': 'Lottery Schemes',
  '/lotteries': 'All Lotteries',
  '/daily-lotteries': 'Daily Lotteries',
  '/weekly-lotteries': 'Weekly Lotteries',
  '/monthly-lotteries': 'Monthly Lotteries',
  '/categories': 'Lottery Categories',
  '/results': 'Published Results',
  '/results-vault': 'Results Vault',
  '/previous-results': 'Previous Results',
  '/winners': 'Winners Information',
  '/draw-calendar': 'Draw Calendar',
  '/calendar': 'Draw Calendar',
  '/updates': 'Notifications & Updates',
  '/notifications': 'Notifications & Updates',
  '/search': 'Global Search',
  '/information-centre': 'Information Centre',
  '/info': 'Information Centre',
  '/login': 'Log In (DEMO)',
  '/register': 'Register (DEMO)',
  '/dashboard': 'User Dashboard (DEMO)',
  '/booking-history': 'Booking History (DEMO)',
  '/profile': 'Profile (DEMO)',
  '/about': 'About Us',
  '/contact': 'Contact Us',
  '/faq': 'FAQ',
  '/privacy-policy': 'Privacy Policy',
  '/terms': 'Terms & Conditions',
  '/disclaimer': 'Disclaimer',
  '/responsible-play': 'Responsible Play',
  '/admin': 'Admin Dashboard UI Prototype',
};

function DocumentTitleSync() {
  const { pathname } = useLocation();
  useEffect(() => {
    let pageTitle = PAGE_TITLES[pathname] ?? 'Informational Portal';
    if (pathname.startsWith('/lotteries/')) pageTitle = 'Scheme Details';
    if (pathname.startsWith('/results/')) pageTitle = 'Result Detail';
    document.title = `${pageTitle} — ${BRAND.name}`;
  }, [pathname]);
  return null;
}

function PageLoader() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="h-44 animate-pulse rounded-2xl bg-white/80 shadow-sm" />
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <DocumentTitleSync />
      <PublicLayout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/lottery-information" element={<LotteryInformationPage />} />
            <Route path="/schemes" element={<LotteryInformationPage />} />
            <Route path="/lotteries" element={<LotteriesFilterPage initialFilter="ALL" />} />
            <Route path="/daily-lotteries" element={<LotteriesFilterPage initialFilter="DAILY" />} />
            <Route path="/weekly-lotteries" element={<LotteriesFilterPage initialFilter="WEEKLY" />} />
            <Route path="/monthly-lotteries" element={<LotteriesFilterPage initialFilter="MONTHLY" />} />
            <Route path="/categories" element={<LotteryCategoriesPage />} />
            <Route path="/lotteries/:slug" element={<LotteryDetailsPage />} />
            <Route path="/results" element={<PublishedResultsPage />} />
            <Route path="/results-vault" element={<PublishedResultsPage />} />
            <Route path="/results/:id" element={<ResultDetailPage />} />
            <Route path="/previous-results" element={<PreviousResultsPage />} />
            <Route path="/winners" element={<WinnersPage />} />
            <Route path="/draw-calendar" element={<DrawCalendarPage />} />
            <Route path="/calendar" element={<DrawCalendarPage />} />
            <Route path="/updates" element={<UpdatesPage />} />
            <Route path="/notifications" element={<UpdatesPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/information-centre" element={<InformationCentrePage />} />
            <Route path="/info" element={<InformationCentrePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<UserDashboardPage />} />
            <Route path="/booking-history" element={<BookingHistoryPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />
            <Route path="/responsible-play" element={<ResponsiblePlayPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </PublicLayout>
    </BrowserRouter>
  );
}

export default App;
