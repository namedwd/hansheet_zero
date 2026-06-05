// 다국어(i18n) 설정 — 기본 언어(한국어)는 접두어 없이 루트에, 그 외 언어는 /<locale> 하위에 둡니다.
// 예: 한국어 /guide ↔ 영어 /en/guide. 일본어·베트남어는 LOCALES에 추가만 하면 동일하게 확장됩니다.

export const LOCALES = ["ko", "en"] as const;
export type Locale = (typeof LOCALES)[number];

// 기본(접두어 없는) 언어. 운영 중인 한국어 사이트가 그대로 루트에 유지됩니다.
export const DEFAULT_LOCALE: Locale = "ko";

// hreflang 표준 태그 매핑. 검색엔진에 "이 URL은 무슨 언어인지"를 알립니다.
export const HREFLANG: Record<Locale, string> = {
  ko: "ko-KR",
  en: "en",
};

// OpenGraph locale 매핑.
export const OG_LOCALE: Record<Locale, string> = {
  ko: "ko_KR",
  en: "en_US",
};

// 특정 로케일에서의 경로를 만듭니다. path는 항상 "ko 기준 경로"("/", "/guide" 등).
export function localePath(locale: Locale, path: string): string {
  const clean = path === "/" ? "" : path;
  if (locale === DEFAULT_LOCALE) return clean || "/";
  return `/${locale}${clean}`;
}

// 현재 pathname에서 로케일을 추출합니다. (클라이언트 Nav 등에서 사용)
export function localeFromPathname(pathname: string): Locale {
  const seg = pathname.split("/")[1] ?? "";
  return (LOCALES as readonly string[]).includes(seg) && seg !== DEFAULT_LOCALE
    ? (seg as Locale)
    : DEFAULT_LOCALE;
}

// Metadata.alternates.languages 에 넣을 hreflang 맵을 만듭니다.
// available = 해당 페이지가 실제로 번역되어 존재하는 로케일 목록.
//   - 한국어만 있는 페이지: languageAlternates("/guide") → ko-KR + x-default
//   - 한+영 모두 있는 페이지: languageAlternates("/", ["ko", "en"])
export function languageAlternates(
  path: string,
  available: Locale[] = ["ko"]
): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const l of available) {
    languages[HREFLANG[l]] = localePath(l, path);
  }
  // x-default는 기본 언어(한국어)를 가리킵니다.
  languages["x-default"] = localePath(DEFAULT_LOCALE, path);
  return languages;
}
