import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 다국어 로케일 분기.
// 기본 언어는 한국어(접두어 없는 루트)이므로, 한국어보다 영어/일본어를 우선하는 브라우저가
// "/"에 들어오면 각각 "/en"·"/ja"로 보냅니다.
// matcher가 "/" 한 경로만 대상으로 하므로 나머지 페이지/자산은 전혀 건드리지 않습니다.

// accept-language를 q값 기준으로 정렬해, ko/en/ja/zh-tw/vi 중 가장 우선하는 언어를 고릅니다.
function preferredLocale(acceptLanguage: string): "ko" | "en" | "ja" | "zh-tw" | "vi" {
  const ranked = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const qParam = params.find((p) => p.trim().startsWith("q="));
      const q = qParam ? parseFloat(qParam.split("=")[1]) : 1;
      return {
        base: tag.trim().toLowerCase().split("-")[0],
        q: Number.isNaN(q) ? 1 : q,
      };
    })
    .filter((l) => l.base)
    .sort((a, b) => b.q - a.q);

  for (const l of ranked) {
    if (l.base === "ko") return "ko";
    if (l.base === "en") return "en";
    if (l.base === "ja") return "ja";
    if (l.base === "zh") return "zh-tw"; // 중국어권은 번체(대만) 페이지로
    if (l.base === "vi") return "vi";
  }
  return "ko"; // 아무것도 없으면 기본(한국어) 유지
}

export function proxy(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language") || "";
  const locale = preferredLocale(acceptLanguage);
  if (locale !== "ko") {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}`;
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  // 오직 루트("/")에서만 동작. 기존 한국어 페이지·정적 자산에는 영향 없음.
  matcher: "/",
};
