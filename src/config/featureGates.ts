/**
 * Legal & Compliance Feature Gates.
 * All features pending legal counsel review MUST remain false by default.
 */
export const FEATURE_GATES = {
  PUBLIC_RESULTS: import.meta.env.VITE_FEATURE_PUBLIC_RESULTS === 'true',
  PUBLIC_WINNERS: import.meta.env.VITE_FEATURE_PUBLIC_WINNERS === 'true',
  PROMO_BANNERS: import.meta.env.VITE_FEATURE_PROMO_BANNERS === 'true',
  ALLOW_SAMPLE_DATA: import.meta.env.VITE_ALLOW_SAMPLE_DATA === 'true',
} as const;

export const BRAND = {
  name: 'NIDHI LOTTERY',
  shortName: 'NIDHI LOTTERY',
  tagline: 'Your Window to Lottery Results',
  logoSrc: '/assets/nidhi-lottery-logo.png',
  disclaimer:
    'NIDHI LOTTERY is an independent informational portal only. Not affiliated with the Government of Kerala or Kerala State Lotteries. No ticket sales, bookings, payments, or draw participation.',
} as const;
