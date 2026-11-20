import type { Locale } from "./i18n";

// 마이크로사이트 자체 도메인 (canonical, sitemap, OG URL 등에 사용).
// 환경변수 NEXT_PUBLIC_SITE_URL 로 덮어쓸 수 있습니다.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.hansheet.com";

// 본 서비스(제로패킹) URL — CTA 링크가 향하는 곳. 마이크로사이트와 분리됩니다.
export const SERVICE_URL = "https://zeropacking.com";

// 포장대 1대에 매달 포함되는 촬영 용량(GB). 제로패킹과 같은 값이어야 합니다
// (zeroweb lib/constants.js STORAGE.PER_STATION_GB, 2026-11-20에 30 → 50).
export const STORAGE_GB = 50;

// 그 용량이 영상 몇 건인지 한 줄로. 기본 화질(HD 720p)은 1분에 약 18.75MB이고, 100건 단위로 내려서 적습니다.
// 계산과 문구는 제로패킹과 같습니다(zeroweb lib/constants.js videosPerStationMonth, components/StorageNote.js).
const STORAGE_VIDEOS = Math.floor((STORAGE_GB * 1000) / 18.75 / 100) * 100;
const STORAGE_NOTE: Record<Locale, (count: string) => string> = {
  ko: (count) => `${STORAGE_GB}GB는 HD 화질 1분 영상 약 ${count}건 분량입니다. (포장대 1대, 한 달 기준)`,
  en: (count) => `${STORAGE_GB} GB holds about ${count} one-minute HD videos, per station per month.`,
  ja: (count) => `${STORAGE_GB}GBは、HD画質の1分動画で約${count}本分です（梱包台1台・1か月あたり）。`,
  "zh-tw": (count) => `${STORAGE_GB}GB 約可存放 ${count} 部 1 分鐘的 HD 影片（每台、每月）。`,
  vi: (count) => `${STORAGE_GB}GB chứa được khoảng ${count} video HD dài 1 phút, cho mỗi trạm mỗi tháng.`,
};
const NUMBER_LOCALE: Record<Locale, string> = { ko: "ko-KR", en: "en-US", ja: "ja-JP", "zh-tw": "zh-TW", vi: "vi-VN" };
export function storageNote(locale: Locale): string {
  return STORAGE_NOTE[locale](STORAGE_VIDEOS.toLocaleString(NUMBER_LOCALE[locale]));
}

// 도입 문의 링크 — 이 사이트를 본 업체가 도입 문의를 남기는 곳.
export const INQUIRY_URL = "https://www.zeropacking.com/#inquiry";

// 로케일별 제로패킹 첫 화면. 외국어 페이지에서 나가는 링크는 반드시 같은 언어 화면으로 보냅니다.
// (한국어 홈으로 보내면 일본어·영어 방문자가 한글 화면을 만납니다.)
const LOCALE_HOME: Partial<Record<Locale, string>> = {
  en: "https://www.zeropacking.com/en",
  ja: "https://www.zeropacking.com/ja",
  "zh-tw": "https://www.zeropacking.com/zh-tw",
  vi: "https://www.zeropacking.com/vi",
};

// "제로패킹" 이름에 거는 링크(푸터 등). 한국어는 기존 홈 그대로.
export function serviceHomeUrl(locale: Locale): string {
  return LOCALE_HOME[locale] ?? SERVICE_URL;
}

// 로케일별 문의/서비스 진입점. 해외 유입은 각 언어 창구로 보내야
// "그래서 어디에 문의?"가 끊기지 않습니다.
const LOCALE_INQUIRY: Partial<Record<Locale, string>> = {
  en: "https://www.zeropacking.com/en#inquiry",
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
export function serviceLandingUrl(locale: Locale, content = "trial"): string {
  return withUtm(LOCALE_HOME[locale] ?? `${SERVICE_URL}/checkout`, locale, content);
}
