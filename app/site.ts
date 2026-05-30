// 마이크로사이트 자체 도메인 (canonical, sitemap, OG URL 등에 사용).
// 환경변수 NEXT_PUBLIC_SITE_URL 로 덮어쓸 수 있습니다.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.hansheet.com";

// 본 서비스(제로패킹) URL — CTA 링크가 향하는 곳. 마이크로사이트와 분리됩니다.
export const SERVICE_URL = "https://zeropacking.com";

// 도입 문의 링크 — 이 사이트를 본 업체가 도입 문의를 남기는 곳.
export const INQUIRY_URL = "https://www.zeropacking.com/#inquiry";
