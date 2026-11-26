export type LegalReviewStatus = 'NOT_SUBMITTED' | 'PENDING' | 'APPROVED' | 'REJECTED';
export type ContentStatus = 'DRAFT' | 'PENDING_LEGAL_REVIEW' | 'LEGAL_APPROVED' | 'PUBLISHED' | 'ARCHIVED' | 'REJECTED';
export type ConsentStatus = 'NOT_OBTAINED' | 'VERIFIED_WRITTEN' | 'ANONYMIZED_ONLY' | 'REVOKED';

export interface LotteryCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  frequencyLabel: string;
  isSample: boolean;
}

export interface LotteryInfoItem {
  id: string;
  categorySlug: string;
  categoryName: string;
  name: string;
  slug: string;
  code: string;
  summary: string;
  scheduleText: string;
  drawDay: string;
  drawTime: string;
  faceValueInfo: string;
  rulesSummary: string;
  prizeTiers: { rank: string; label: string; amountInfo: string }[];
  isSample: boolean;
  legalReviewStatus: LegalReviewStatus;
}

export interface SampleResultPlaceholder {
  id: string;
  schemeSlug: string;
  lotteryName: string;
  drawCode: string;
  drawDate: string;
  prizeCategory: string;
  sampleNumbers: string[];
  status: ContentStatus;
  isSample: true;
  note: string;
  prizeBreakdown: { tier: string; amountInfo: string; numbers: string[] }[];
}

export interface SampleWinnerPlaceholder {
  id: string;
  displayTitle: string;
  schemeName: string;
  drawDate: string;
  prizeCategory: string;
  districtOrRegion: string;
  prizeHighlight: string;
  consentStatus: ConsentStatus;
  anonymizedDisplay: true;
  isSample: true;
}

export interface DrawScheduleEntry {
  id: string;
  schemeSlug: string;
  schemeName: string;
  drawCode: string;
  drawDate: string;
  drawTime: string;
  status: 'UPCOMING_DEMO' | 'PAST_DEMO';
  isSample: true;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  body: string;
  type: 'LEGAL_NOTICE' | 'NOTICE' | 'PROMO';
  dateLabel: string;
  isSample: boolean;
  pendingLegalReview: boolean;
}

export interface FaqEntry {
  id: string;
  category: string;
  question: string;
  answer: string;
}
