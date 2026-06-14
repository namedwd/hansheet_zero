"use client";

import { usePathname } from "next/navigation";
import { inquiryUrl } from "../site";
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
  ja: {
    text: "梱包動画の導入をご検討中ですか？",
    cta: "お問い合わせ",
  },
  "zh-tw": {
    text: "正在評估導入出貨包裝影片嗎？",
    cta: "聯絡我們",
  },
  vi: {
    text: "Bạn đang cân nhắc triển khai video đóng gói?",
    cta: "Liên hệ",
  },
};

export function InquiryBar() {
  const pathname = usePathname() || "/";
  const locale = localeFromPathname(pathname);
  const c = COPY[locale];

  return (
    <div className="bg-black text-white dark:bg-white dark:text-black">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-6 py-2 sm:px-10">
        <p className="text-sm font-medium">{c.text}</p>
        <a
          href={inquiryUrl(locale)}
          target="_blank"
          rel="noopener"
          className="inline-flex h-8 flex-none items-center justify-center gap-1 rounded-full bg-white px-4 text-xs font-semibold text-black transition-colors hover:bg-zinc-200 dark:bg-black dark:text-white dark:hover:bg-zinc-800"
        >
          {c.cta}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}
