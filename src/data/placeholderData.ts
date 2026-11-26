import type {
  AnnouncementItem,
  DrawScheduleEntry,
  FaqEntry,
  LotteryCategory,
  LotteryInfoItem,
  SampleResultPlaceholder,
  SampleWinnerPlaceholder,
} from '../types';

/**
 * Clearly labelled DEMO / illustrative data for frontend-only prototype.
 * Contains ZERO real lottery results and ZERO fictional real-world winners.
 */
export const SAMPLE_CATEGORIES: LotteryCategory[] = [];

export const SAMPLE_LOTTERIES: LotteryInfoItem[] = [];

export const SAMPLE_RESULTS_PLACEHOLDER: SampleResultPlaceholder[] = [];

export const SAMPLE_WINNERS_PLACEHOLDER: SampleWinnerPlaceholder[] = [];

export const SAMPLE_DRAW_SCHEDULES: DrawScheduleEntry[] = [];

export const SAMPLE_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'ann-legal-1',
    title: 'Informational Portal & Legal Compliance Notice',
    body: 'NIDHI LOTTERY is an independent informational platform under development. Online ticket sales, booking, payments, and wallets are strictly disabled.',
    type: 'LEGAL_NOTICE',
    dateLabel: 'Active Notice',
    isSample: false,
    pendingLegalReview: false,
  },
  {
    id: 'ann-notice-2',
    title: 'Results & Winner Modules Pending Legal Review',
    body: 'Published results, historical archives, and winner spotlights are gated off until qualified Indian legal counsel completes compliance review.',
    type: 'NOTICE',
    dateLabel: 'Compliance Gate',
    isSample: false,
    pendingLegalReview: true,
  },
];

export const SAMPLE_FAQS: FaqEntry[] = [
  {
    id: 'faq-1',
    category: 'Legal & Compliance',
    question: 'Can I buy or book lottery tickets on NIDHI LOTTERY?',
    answer:
      'No. Online lottery ticket sales, booking, number selection, payments, wallets, and draw participation are strictly disabled. This website is strictly informational.',
  },
  {
    id: 'faq-2',
    category: 'Affiliation',
    question: 'Is this an official Kerala Government website?',
    answer:
      'No. NIDHI LOTTERY is an independent informational portal and is not affiliated with, endorsed by, or operated by the Government of Kerala or the Directorate of Kerala State Lotteries.',
  },
  {
    id: 'faq-3',
    category: 'Results & Winners',
    question: 'Why are Published Results and Winner sections currently gated?',
    answer:
      'Under our compliance policy, displaying lottery results, winning numbers, promotional banners, and winner information is marked Pending Legal Review and remains disabled until written legal clearance is obtained.',
  },
  {
    id: 'faq-4',
    category: 'Privacy',
    question: 'How is winner privacy protected under DPDP Act, 2023?',
    answer:
      'Winner entries default to anonymized display with PII redacted, require verified written consent before any identifiable publication, and support immediate revocation.',
  },
];

export interface CarouselSchemeCard {
  id: string;
  slug: string;
  title: string;
  frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'SPECIAL';
  prizeDemoLabel: string;
  drawDateLabel: string;
  drawTimeLabel: string;
  ticketPriceDemo: string;
  badgeLabel: string;
  topColor: string;
  bottomColor: string;
  buttonColor?: string;
  variant: 'ticket-purple' | 'holo-dark' | 'teal-cyan' | 'gold-royal';
  ctaLabel: string;
  description?: string;
}

export const DEMO_UPCOMING_ATTRACTIONS: CarouselSchemeCard[] = [
  {
    id: 'wk-1',
    slug: 'nidhi-night-weekly',
    title: 'NIDHI Night Weekly',
    frequency: 'WEEKLY',
    prizeDemoLabel: '₹10,000',
    drawDateLabel: '25.11.2026',
    drawTimeLabel: '9:00 PM',
    ticketPriceDemo: '₹10',
    badgeLabel: 'Weekly',
    topColor: 'bg-[#9B1B30] text-white',
    bottomColor: 'bg-[#E8C95A] text-[#252525]',
    buttonColor: 'bg-[#9B1B30] text-white hover:bg-[#7A1224]',
    variant: 'gold-royal',
    ctaLabel: 'View Details',
    description:
      'Weekly evening reference draw schedule featuring first prize overview, draw timing, and official Gazette verification guidance.',
  },
  {
    id: 'wk-2',
    slug: 'nidhi-2-25-pm',
    title: 'NIDHI 2.25 PM',
    frequency: 'WEEKLY',
    prizeDemoLabel: '₹10,000',
    drawDateLabel: '26.11.2026',
    drawTimeLabel: '2:25 PM',
    ticketPriceDemo: '₹12',
    badgeLabel: 'Weekly',
    topColor: 'bg-[#0F6B63] text-white',
    bottomColor: 'bg-[#EA7317] text-white',
    buttonColor: 'bg-[#0A4F49] text-white hover:bg-[#083D38]',
    variant: 'teal-cyan',
    ctaLabel: 'View Details',
    description:
      'Afternoon weekly reference schedule with listed draw date, timing, and ticket face-value information.',
  },
  {
    id: 'wk-3',
    slug: 'nidhi-10-evening',
    title: 'NIDHI 10 Evening',
    frequency: 'WEEKLY',
    prizeDemoLabel: '₹10,000',
    drawDateLabel: '26.11.2026',
    drawTimeLabel: '5:40 PM',
    ticketPriceDemo: '₹10',
    badgeLabel: 'Weekly',
    topColor: 'bg-[#0E1738] text-white',
    bottomColor: 'bg-[#65A30D] text-white',
    buttonColor: 'bg-[#0E1738] text-white hover:bg-[#19285C]',
    variant: 'holo-dark',
    ctaLabel: 'View Details',
    description:
      'Early evening weekly reference schedule with first prize summary, draw time, and informational compliance notes.',
  },
  {
    id: 'wk-4',
    slug: 'nidhi-50-weekly',
    title: 'NIDHI 50 Weekly',
    frequency: 'WEEKLY',
    prizeDemoLabel: '₹21 Lakhs',
    drawDateLabel: '26.11.2026',
    drawTimeLabel: '7:30 PM',
    ticketPriceDemo: '₹50',
    badgeLabel: 'Weekly',
    topColor: 'bg-[#5B1676] text-white',
    bottomColor: 'bg-[#E05347] text-white',
    buttonColor: 'bg-[#45105A] text-white hover:bg-[#320B42]',
    variant: 'ticket-purple',
    ctaLabel: 'View Details',
    description:
      'Weekly reference draw schedule highlighting the ₹21 Lakhs first prize tier, draw schedule, and verification guidelines.',
  },
  {
    id: 'wk-5',
    slug: 'nidhi-8pm',
    title: 'NIDHI 8pm',
    frequency: 'WEEKLY',
    prizeDemoLabel: '₹10,000',
    drawDateLabel: '26.11.2026',
    drawTimeLabel: '8:00 PM',
    ticketPriceDemo: '₹12',
    badgeLabel: 'Weekly',
    topColor: 'bg-[#9B1B30] text-white',
    bottomColor: 'bg-[#E8C95A] text-[#252525]',
    buttonColor: 'bg-[#9B1B30] text-white hover:bg-[#7A1224]',
    variant: 'gold-royal',
    ctaLabel: 'View Details',
    description:
      'Prime-time 8:00 PM weekly reference draw information including draw date, ticket price reference, and result verification steps.',
  },
];

export const DEMO_MONTHLY_SCHEMES: CarouselSchemeCard[] = [
  {
    id: 'mo-1',
    slug: 'nidhi-50-monthly',
    title: 'NIDHI 50 Monthly',
    frequency: 'MONTHLY',
    prizeDemoLabel: '₹30 Lakhs',
    drawDateLabel: '26.11.2026',
    drawTimeLabel: '6:30 PM',
    ticketPriceDemo: '₹50',
    badgeLabel: 'Monthly',
    topColor: 'bg-[#9B1B30] text-white',
    bottomColor: 'bg-[#E8C95A] text-[#252525]',
    buttonColor: 'bg-[#9B1B30] text-white hover:bg-[#7A1224]',
    variant: 'gold-royal',
    ctaLabel: 'View Details',
    description:
      'Monthly series reference draw schedule featuring a ₹30 Lakhs first prize overview, draw date and time, and claim rules.',
  },
];

export const DEMO_SPECIAL_SCHEMES: CarouselSchemeCard[] = [
  {
    id: 'sp-1',
    slug: 'nidhi-250',
    title: 'NIDHI 250',
    frequency: 'SPECIAL',
    prizeDemoLabel: '₹1 Crore',
    drawDateLabel: '01.12.2026',
    drawTimeLabel: '6:30 PM',
    ticketPriceDemo: '₹250',
    badgeLabel: 'Special',
    topColor: 'bg-[#9B1B30] text-white',
    bottomColor: 'bg-[#E8C95A] text-[#252525]',
    buttonColor: 'bg-[#9B1B30] text-white hover:bg-[#7A1224]',
    variant: 'gold-royal',
    ctaLabel: 'View Details',
    description:
      'Special series reference draw featuring a ₹1 Crore first prize overview, scheduled draw details, and Gazette verification guidance.',
  },
  {
    id: 'sp-2',
    slug: 'nidhi-100',
    title: 'NIDHI 100',
    frequency: 'SPECIAL',
    prizeDemoLabel: '₹50 Lakhs',
    drawDateLabel: '03.12.2026',
    drawTimeLabel: '6:30 PM',
    ticketPriceDemo: '₹100',
    badgeLabel: 'Special',
    topColor: 'bg-[#0F6B63] text-white',
    bottomColor: 'bg-[#EA7317] text-white',
    buttonColor: 'bg-[#0A4F49] text-white hover:bg-[#083D38]',
    variant: 'teal-cyan',
    ctaLabel: 'View Details',
    description:
      'Special series informational entry highlighting the ₹50 Lakhs first prize, draw schedule, and regulatory notes.',
  },
  {
    id: 'sp-3',
    slug: 'nidhi-500',
    title: 'NIDHI 500',
    frequency: 'SPECIAL',
    prizeDemoLabel: '₹1.25 Crore',
    drawDateLabel: '08.12.2026',
    drawTimeLabel: '6:30 PM',
    ticketPriceDemo: '₹500',
    badgeLabel: 'Special',
    topColor: 'bg-[#0E1738] text-white',
    bottomColor: 'bg-[#65A30D] text-white',
    buttonColor: 'bg-[#0E1738] text-white hover:bg-[#19285C]',
    variant: 'holo-dark',
    ctaLabel: 'View Details',
    description:
      'Special reference draw schedule featuring ₹1.25 Crore first prize details, draw date and timing, and verification rules.',
  },
  {
    id: 'sp-4',
    slug: 'nidhi-150',
    title: 'NIDHI 150',
    frequency: 'SPECIAL',
    prizeDemoLabel: '₹40 Lakhs',
    drawDateLabel: '10.12.2026',
    drawTimeLabel: '6:30 PM',
    ticketPriceDemo: '₹150',
    badgeLabel: 'Special',
    topColor: 'bg-[#5B1676] text-white',
    bottomColor: 'bg-[#E05347] text-white',
    buttonColor: 'bg-[#45105A] text-white hover:bg-[#320B42]',
    variant: 'ticket-purple',
    ctaLabel: 'View Details',
    description:
      'Special reference draw schedule entry with ₹40 Lakhs first prize summary, scheduled draw timing, and informational overview.',
  },
  {
    id: 'sp-5',
    slug: 'nidhi-300',
    title: 'NIDHI 300',
    frequency: 'SPECIAL',
    prizeDemoLabel: '₹1.11 Crore',
    drawDateLabel: '15.12.2026',
    drawTimeLabel: '6:30 PM',
    ticketPriceDemo: '₹300',
    badgeLabel: 'Special',
    topColor: 'bg-[#9B1B30] text-white',
    bottomColor: 'bg-[#E8C95A] text-[#252525]',
    buttonColor: 'bg-[#9B1B30] text-white hover:bg-[#7A1224]',
    variant: 'gold-royal',
    ctaLabel: 'View Details',
    description:
      'Special series reference draw featuring a ₹1.11 Crore first prize overview, draw date and time, and verification notice.',
  },
  {
    id: 'sp-6',
    slug: 'nidhi-200',
    title: 'NIDHI 200',
    frequency: 'SPECIAL',
    prizeDemoLabel: '₹75 Lakhs',
    drawDateLabel: '17.12.2026',
    drawTimeLabel: '6:30 PM',
    ticketPriceDemo: '₹200',
    badgeLabel: 'Special',
    topColor: 'bg-[#0F6B63] text-white',
    bottomColor: 'bg-[#EA7317] text-white',
    buttonColor: 'bg-[#0A4F49] text-white hover:bg-[#083D38]',
    variant: 'teal-cyan',
    ctaLabel: 'View Details',
    description:
      'Special draw information page covering ₹75 Lakhs first prize summary, draw date, timing, and ticket face value.',
  },
  {
    id: 'sp-7',
    slug: 'nidhi-christmas-special',
    title: 'NIDHI Christmas Special',
    frequency: 'SPECIAL',
    prizeDemoLabel: '₹1.21 Crore',
    drawDateLabel: '31.12.2026',
    drawTimeLabel: '6:30 PM',
    ticketPriceDemo: '₹400',
    badgeLabel: 'Special',
    topColor: 'bg-[#5B1676] text-white',
    bottomColor: 'bg-[#E05347] text-white',
    buttonColor: 'bg-[#45105A] text-white hover:bg-[#320B42]',
    variant: 'ticket-purple',
    ctaLabel: 'View Details',
    description:
      'Year-end festive special reference draw schedule featuring ₹1.21 Crore first prize details, draw date and time, and claim rules.',
  },
];

export const DEMO_INFO_HIGHLIGHTS = [
  {
    id: 'ih-1',
    title: 'Official Gazette Verification',
    tag: 'Verified Guidance',
    text: 'Always cross-check draw numbers against the official Kerala Government Gazette before making any claim.',
  },
  {
    id: 'ih-2',
    title: 'DPDP Privacy Protection',
    tag: 'Privacy First',
    text: 'Winner spotlights remain gated and anonymized by default to protect personal privacy under Indian law.',
  },
  {
    id: 'ih-3',
    title: 'Strictly Informational Portal',
    tag: 'Non-Commercial',
    text: 'NIDHI LOTTERY provides schedules and educational guides only — zero ticket sales, bookings, or wallets.',
  },
];

export interface TestimonialItem {
  id: string;
  quote: string;
  displayName: string;
  initials: string;
  roleLabel: string;
  verifiedRating?: number;
  isDemo: true;
}

export const DEMO_TESTIMONIALS: TestimonialItem[] = [];
