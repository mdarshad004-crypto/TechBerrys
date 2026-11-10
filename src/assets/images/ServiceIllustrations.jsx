function ShopifyIllustration() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true">
      <path d="M30 86V36c0-6 5-11 11-11h38c6 0 11 5 11 11v50c0 6-5 11-11 11H41c-6 0-11-5-11-11Z" fill="#dfeeff" />
      <path d="M46 24c8-8 18-12 30-12 12 0 21 6 26 16-8-2-17-2-25 0-9 2-17 7-25 14l-6-18Z" fill="#1b7df8" opacity=".7" />
      <path d="M53 28c0 0 16 8 23 21 7 12 12 28 12 28H45c0 0-8-13-8-23 0-12 7-26 16-26Z" fill="#ecf7ff" />
      <path d="M54 41h16v14H54zM52 59h20v14H52z" fill="#1f9bff" />
    </svg>
  );
}

function WebsiteIllustration() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true">
      <rect x="24" y="18" width="72" height="52" rx="8" fill="#dfeeff" />
      <rect x="30" y="24" width="60" height="40" rx="6" fill="#1a2c66" />
      <path d="M54 62h12M38 84h44l8 12H30l8-12Z" fill="#7ac8ff" />
      <path d="m46 36-10 12 10 10M72 36l10 12-10 10M62 28l-8 28" stroke="#dff6ff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AppIllustration() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true">
      <rect x="42" y="18" width="36" height="84" rx="10" fill="#dfeeff" />
      <rect x="48" y="26" width="24" height="68" rx="8" fill="#1a2c66" />
      <circle cx="60" cy="52" r="9" fill="#44c8ff" />
      <path d="M44 78h32M50 88h20" stroke="#1f73f0" strokeWidth="4" strokeLinecap="round" />
      <path d="m30 40-10 12 10 10M90 40l10 12-10 10M54 26l-7 26M66 26l7 26" stroke="#9cd3ff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SeoIllustration() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true">
      <rect x="24" y="26" width="72" height="58" rx="10" fill="#dfeeff" />
      <path d="M34 76c10-10 18-16 26-16 15 0 25 12 36 12v18H34V76Z" fill="#2bb7ff" opacity=".9" />
      <path d="m34 68 12-14 16 18 20-26 12 12v26H34V68Z" fill="#0b5fd3" opacity=".7" />
      <circle cx="58" cy="42" r="10" fill="#eff9ff" />
      <path d="M92 88h18M76 90h16" stroke="#0c75ff" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

function MarketingIllustration() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true">
      <path d="M28 66c12-10 22-16 36-16 8 0 15 2 23 7l11 8-15 9-17 10-22-4-16-14Z" fill="#dfeeff" />
      <path d="M30 56h16v20H30zM64 42h20v34H64zM90 28h16v48H90z" fill="#1d8cff" opacity=".8" />
      <path d="M20 88h80" stroke="#1a2c66" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

function UiUxIllustration() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true">
      <rect x="22" y="22" width="76" height="60" rx="10" fill="#dfeeff" />
      <rect x="28" y="28" width="64" height="48" rx="8" fill="#0a1d4f" />
      <path d="M40 42h36M40 55h24M42 70h18M76 70h12" stroke="#bfe8ff" strokeWidth="5" strokeLinecap="round" />
      <circle cx="82" cy="64" r="15" fill="#1f9bff" />
      <path d="m78 64 6 7 12-16" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26 86h68" stroke="#6bc8ff" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

function CloudIllustration() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true">
      <path d="M36 72c-11 0-20-9-20-20 0-10 7-18 17-19 5-12 17-20 31-20 18 0 32 13 34 30 8 2 14 9 14 18 0 10-8 18-18 18H36Z" fill="#dfeeff" />
      <path d="M40 70h40v14H40zM50 52h24v8H50z" fill="#169af9" />
      <rect x="18" y="82" width="84" height="14" rx="7" fill="#0d285d" opacity=".8" />
    </svg>
  );
}

function ConsultingIllustration() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true">
      <circle cx="42" cy="44" r="16" fill="#dfeeff" />
      <circle cx="72" cy="36" r="14" fill="#a8dcff" />
      <circle cx="88" cy="58" r="12" fill="#dfeeff" />
      <path d="M64 82c0-11 10-20 22-20s22 9 22 20" fill="#dfeeff" />
      <path d="M14 84c0-12 9-20 20-20 12 0 20 8 20 20" fill="#a9d9ff" />
      <path d="M42 70c0-8 6-14 14-14s14 6 14 14" fill="#1a68ef" opacity=".75" />
      <rect x="30" y="88" width="68" height="10" rx="5" fill="#10285a" />
    </svg>
  );
}

const illustrations = {
  shopify: ShopifyIllustration,
  website: WebsiteIllustration,
  app: AppIllustration,
  seo: SeoIllustration,
  marketing: MarketingIllustration,
  uiux: UiUxIllustration,
  cloud: CloudIllustration,
  consulting: ConsultingIllustration,
};

export default function ServiceIllustration({ type }) {
  const Illustration = illustrations[type] || WebsiteIllustration;
  return <Illustration />;
}
