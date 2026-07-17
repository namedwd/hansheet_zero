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

// UTM 추적 — 한시트에서 제로패킹으로 나가는 링크에 자동으로 붙입니다.
// 제로패킹 쪽 GA에서 "어느 언어 사이트의 어느 버튼이 문의를 만들었나"를 볼 수 있습니다.
//   utm_source=hansheet · utm_medium=microsite · utm_campaign=<로케일> · utm_content=<버튼 위치>
// 주의: 문의 URL에는 #inquiry 앵커가 있으므로 쿼리는 반드시 해시 '앞'에 넣어야 앵커가 살아 있습니다.
function withUtm(rawUrl: string, locale: Locale, content: string): string {
  const [base, hash] = rawUrl.split("#");
  const url = new URL(base);
  url.searchParams.set("utm_source", "hansheet");
  url.searchParams.set("utm_medium", "microsite");
  url.searchParams.set("utm_campaign", locale);
  url.searchParams.set("utm_content", content);
  return hash ? `${url.toString()}#${hash}` : url.toString();
}

// content = 버튼 위치(top-bar, nav, hero, cta, footer 등). 어디서 눌렀는지 추적용.
export function inquiryUrl(locale: Locale, content = "inquiry"): string {
  return withUtm(LOCALE_INQUIRY[locale] ?? INQUIRY_URL, locale, content);
}

// 무료체험/서비스 랜딩. 해외 로케일은 해당 언어 랜딩으로.
const LOCALE_LANDING: Partial<Record<Locale, string>> = {
  ja: "https://www.zeropacking.com/ja",
  "zh-tw": "https://www.zeropacking.com/zh-tw",
  vi: "https://www.zeropacking.com/vi",
};

export function serviceLandingUrl(locale: Locale, content = "trial"): string {
  return withUtm(LOCALE_LANDING[locale] ?? `${SERVICE_URL}/checkout`, locale, content);
}
