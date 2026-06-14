import type { Locale } from "./i18n";

// 마이크로사이트 자체 도메인 (canonical, sitemap, OG URL 등에 사용).
// 환경변수 NEXT_PUBLIC_SITE_URL 로 덮어쓸 수 있습니다.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.hansheet.com";

// 본 서비스(제로패킹) URL — CTA 링크가 향하는 곳. 마이크로사이트와 분리됩니다.
export const SERVICE_URL = "https://zeropacking.com";

// 도입 문의 링크 — 이 사이트를 본 업체가 도입 문의를 남기는 곳.
export const INQUIRY_URL = "https://www.zeropacking.com/#inquiry";

// 로케일별 문의/서비스 진입점. 해외 유입은 각 언어 창구로 보내야
// "그래서 어디에 문의?"가 끊기지 않습니다. 한국어/영어는 기존 한국 창구를 공유.
const LOCALE_INQUIRY: Partial<Record<Locale, string>> = {
  ja: "https://www.zeropacking.com/ja#inquiry",
  "zh-tw": "https://www.zeropacking.com/zh-tw#inquiry",
  vi: "https://www.zeropacking.com/vi#inquiry",
};

export function inquiryUrl(locale: Locale): string {
  return LOCALE_INQUIRY[locale] ?? INQUIRY_URL;
}

// 무료체험/서비스 랜딩. 해외 로케일은 해당 언어 랜딩으로.
const LOCALE_LANDING: Partial<Record<Locale, string>> = {
  ja: "https://www.zeropacking.com/ja",
  "zh-tw": "https://www.zeropacking.com/zh-tw",
  vi: "https://www.zeropacking.com/vi",
};

export function serviceLandingUrl(locale: Locale): string {
  return LOCALE_LANDING[locale] ?? `${SERVICE_URL}/checkout`;
}
