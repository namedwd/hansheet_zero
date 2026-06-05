import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 다국어 로케일 분기.
// 기본 언어는 한국어(접두어 없는 루트)이므로, 영어를 우선하는 브라우저가 "/"에 들어오면
// "/en"으로 보냅니다. matcher가 "/" 한 경로만 대상으로 하므로 나머지 페이지/자산은 전혀 건드리지 않습니다.

function prefersEnglishOverKorean(acceptLanguage: string): boolean {
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

  // ko / en 중 더 높은 우선순위가 무엇인지 확인.
  for (const l of ranked) {
    if (l.base === "ko") return false;
    if (l.base === "en") return true;
  }
  return false; // 둘 다 없으면 기본(한국어) 유지
}

export function proxy(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language") || "";
  if (prefersEnglishOverKorean(acceptLanguage)) {
    const url = request.nextUrl.clone();
    url.pathname = "/en";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  // 오직 루트("/")에서만 동작. 기존 한국어 페이지·정적 자산에는 영향 없음.
  matcher: "/",
};
