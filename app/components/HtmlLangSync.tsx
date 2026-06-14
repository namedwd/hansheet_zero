"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { HREFLANG, localeFromPathname } from "../i18n";

// 루트 레이아웃은 정적 렌더링을 유지하려고 <html lang="ko">로 고정돼 있습니다.
// (headers()로 로케일을 읽으면 전 페이지가 동적 렌더링으로 deopt 됩니다.)
// 그래서 클라이언트에서 현재 경로의 로케일에 맞춰 <html lang>을 교정합니다.
// /en → "en", /ja → "ja-JP", 그 외 → "ko-KR".
export function HtmlLangSync() {
  const pathname = usePathname() || "/";

  useEffect(() => {
    const locale = localeFromPathname(pathname);
    document.documentElement.lang = HREFLANG[locale];
  }, [pathname]);

  return null;
}
