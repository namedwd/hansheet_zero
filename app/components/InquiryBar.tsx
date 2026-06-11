"use client";

import { usePathname } from "next/navigation";
import { INQUIRY_URL } from "../site";
import { localeFromPathname, type Locale } from "../i18n";

// 본문 제일 상단의 슬림 문의 바.
// 헤더 메뉴의 "도입 문의" 버튼은 긴 콘텐츠를 읽는 고객 눈에 잘 띄지 않아,
// "그래서 문의를 어디로?"에 즉시 답하도록 모든 페이지 상단에 공통으로 노출합니다.
const COPY: Record<Locale, { text: string; cta: string }> = {
  ko: {
    text: "포장영상 도입을 검토 중이신가요?",
    cta: "문의하기",
  },
  en: {
    text: "Considering packing video for your team?",
    cta: "Contact sales",
  },
};

export function InquiryBar() {
  const pathname = usePathname() || "/";
  const locale = localeFromPathname(pathname);
  const c = COPY[locale];

  return (
    <div className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-6 py-2.5 sm:px-10">
        <p className="text-sm text-zinc-700 dark:text-zinc-300">{c.text}</p>
        <a
          href={INQUIRY_URL}
          target="_blank"
          rel="noopener"
          className="inline-flex h-8 flex-none items-center justify-center rounded-full bg-black px-4 text-xs font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          {c.cta}
        </a>
      </div>
    </div>
  );
}
