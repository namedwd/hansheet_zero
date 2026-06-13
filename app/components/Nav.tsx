"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SERVICE_URL, INQUIRY_URL } from "../site";
import { localeFromPathname, localePath, type Locale } from "../i18n";

// 로케일별 Nav/Footer 문구 사전.
// 영어는 현재 홈만 번역되어 있어, 영어 Nav 링크는 비워 두고 페이지가 번역될 때마다 추가합니다.
const DICT: Record<
  Locale,
  {
    brandSuffix: string;
    links: { href: string; label: string }[];
    freeTrial: string;
    inquiry: string;
    inquiryMobile: string;
    freeTrialMobile: string;
    openMenu: string;
    switchTo: string; // 언어 전환 버튼 라벨
    footer: {
      topicsTitle: string;
      productTitle: string;
      companyTitle: string;
      topics: { href: string; label: string }[];
      product: { href: string; label: string; external?: boolean }[];
      inquiryLink: string;
      serviceLink: string;
      rightsNote: (year: number) => React.ReactNode;
    };
  }
> = {
  ko: {
    brandSuffix: "포장영상",
    links: [
      { href: "/compare", label: "업체 비교" },
      { href: "/vs-cctv", label: "CCTV 비교" },
      { href: "/guide", label: "도입 가이드" },
      { href: "/cases", label: "도입 사례" },
      { href: "/claim", label: "클레임 해결" },
      { href: "/pricing", label: "요금" },
      { href: "/blog", label: "블로그" },
    ],
    freeTrial: "무료체험",
    inquiry: "도입 문의",
    inquiryMobile: "도입 문의하기",
    freeTrialMobile: "15일 무료체험",
    openMenu: "메뉴 열기",
    switchTo: "EN",
    footer: {
      topicsTitle: "포장영상 토픽",
      productTitle: "제품",
      companyTitle: "한시트",
      topics: [
        { href: "/", label: "포장영상이란?" },
        { href: "/compare", label: "업체 비교" },
        { href: "/vs-cctv", label: "포장영상 vs CCTV" },
        { href: "/guide", label: "도입 가이드" },
        { href: "/cases", label: "도입 사례" },
        { href: "/claim", label: "택배 클레임 해결" },
        { href: "/blog", label: "블로그" },
      ],
      product: [
        { href: "/api", label: "API · WMS 연동" },
        { href: "/pricing", label: "요금제" },
        { href: `${SERVICE_URL}/checkout`, label: "15일 무료체험", external: true },
      ],
      inquiryLink: "도입 문의하기",
      serviceLink: "제로패킹 서비스",
      rightsNote: (year) => (
        <>
          © {year} 한시트 · 택배 포장영상 자동 촬영 가이드 사이트. 실제 서비스
          이용은{" "}
          <a href={SERVICE_URL} className="underline hover:text-black dark:hover:text-white">
            제로패킹 (zeropacking.com)
          </a>
          에서 가능합니다.
        </>
      ),
    },
  },
  en: {
    brandSuffix: "Packing Video",
    // 영어 페이지가 늘어나면 여기에 링크를 추가하세요 (현재는 홈만 번역됨).
    links: [],
    freeTrial: "Free trial",
    inquiry: "Contact sales",
    inquiryMobile: "Contact sales",
    freeTrialMobile: "15-day free trial",
    openMenu: "Open menu",
    switchTo: "한국어",
    footer: {
      topicsTitle: "Packing video",
      productTitle: "Product",
      companyTitle: "Hansheet",
      topics: [{ href: "/en", label: "What is a packing video?" }],
      product: [
        { href: `${SERVICE_URL}/checkout`, label: "15-day free trial", external: true },
      ],
      inquiryLink: "Contact sales",
      serviceLink: "Zeropacking service",
      rightsNote: (year) => (
        <>
          © {year} Hansheet · Guide to automatic packing-video recording for
          parcel shipping. The actual service is provided by{" "}
          <a href={SERVICE_URL} className="underline hover:text-black dark:hover:text-white">
            Zeropacking (zeropacking.com)
          </a>
          .
        </>
      ),
    },
  },
};

export function Nav() {
  const pathname = usePathname() || "/";
  const locale = localeFromPathname(pathname);
  const t = DICT[locale];
  // 언어 전환 대상. 대응되는 번역 페이지가 항상 있는 건 아니므로 홈으로 보냅니다.
  const switchHref = locale === "ko" ? localePath("en", "/") : localePath("ko", "/");

  return (
    <nav
      aria-label={locale === "ko" ? "주요 메뉴" : "Main menu"}
      className="border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-black/80"
    >
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-6 py-3 sm:px-10">
        <Link
          href={localePath(locale, "/")}
          className="text-base font-bold text-black dark:text-white"
        >
          한시트 <span className="font-medium text-zinc-500">{t.brandSuffix}</span>
        </Link>

        {/* 데스크탑 메뉴 */}
        <ul className="hidden items-center gap-4 text-sm lg:flex">
          {t.links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-white"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href={switchHref}
              hrefLang={locale === "ko" ? "en" : "ko"}
              className="text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white"
            >
              {t.switchTo}
            </Link>
          </li>
          <li>
            <a
              href={`${SERVICE_URL}/checkout`}
              className="inline-flex h-9 items-center justify-center rounded-full border border-zinc-300 px-4 text-xs font-medium text-black hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-900"
            >
              {t.freeTrial}
            </a>
          </li>
          <li>
            <a
              href={INQUIRY_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex h-9 items-center justify-center rounded-full bg-black px-4 text-xs font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              {t.inquiry}
            </a>
          </li>
        </ul>

        {/* 모바일·태블릿 햄버거 메뉴 (zero-JS, <details>) */}
        <details className="group relative lg:hidden">
          <summary
            className="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-md text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
            aria-label={t.openMenu}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="group-open:hidden"
              aria-hidden="true"
            >
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="hidden group-open:block"
              aria-hidden="true"
            >
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="6" y1="18" x2="18" y2="6" />
            </svg>
          </summary>

          <ul className="absolute right-0 top-12 w-56 rounded-2xl border border-zinc-200 bg-white p-2 shadow-lg dark:border-zinc-800 dark:bg-black">
            {t.links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block rounded-lg px-3 py-2 text-sm text-zinc-800 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={switchHref}
                hrefLang={locale === "ko" ? "en" : "ko"}
                className="block rounded-lg px-3 py-2 text-sm text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
              >
                {t.switchTo}
              </Link>
            </li>
            <li className="mt-1 border-t border-zinc-200 pt-2 dark:border-zinc-800">
              <a
                href={INQUIRY_URL}
                target="_blank"
                rel="noopener"
                className="block rounded-lg bg-black px-3 py-2 text-center text-sm font-medium text-white dark:bg-white dark:text-black"
              >
                {t.inquiryMobile}
              </a>
            </li>
            <li className="mt-2">
              <a
                href={`${SERVICE_URL}/checkout`}
                className="block rounded-lg border border-zinc-300 px-3 py-2 text-center text-sm font-medium text-black dark:border-zinc-700 dark:text-white"
              >
                {t.freeTrialMobile}
              </a>
            </li>
          </ul>
        </details>
      </div>
    </nav>
  );
}

export function Footer() {
  const pathname = usePathname() || "/";
  const locale = localeFromPathname(pathname);
  const f = DICT[locale].footer;

  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-3xl px-6 py-10 text-sm text-zinc-600 dark:text-zinc-400 sm:px-10">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-500">
              {f.topicsTitle}
            </h3>
            <ul className="space-y-2">
              {f.topics.map((l) => (
                <li key={l.href + l.label}>
                  <Link href={l.href} className="hover:text-black dark:hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-500">
              {f.productTitle}
            </h3>
            <ul className="space-y-2">
              {f.product.map((l) =>
                l.external ? (
                  <li key={l.href + l.label}>
                    <a href={l.href} className="hover:text-black dark:hover:text-white">
                      {l.label}
                    </a>
                  </li>
                ) : (
                  <li key={l.href + l.label}>
                    <Link href={l.href} className="hover:text-black dark:hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-500">
              {f.companyTitle}
            </h3>
            <ul className="space-y-2">
              <li>
                <a href={INQUIRY_URL} target="_blank" rel="noopener" className="hover:text-black dark:hover:text-white">
                  {f.inquiryLink}
                </a>
              </li>
              <li><a href={SERVICE_URL} className="hover:text-black dark:hover:text-white">{f.serviceLink}</a></li>
              <li>
                <a href="mailto:contact@zeropacking.com" className="hover:text-black dark:hover:text-white">
                  contact@zeropacking.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-zinc-200 pt-6 text-xs text-zinc-500 dark:border-zinc-800">
          <address className="not-italic">
            <p className="font-semibold text-zinc-700 dark:text-zinc-300">한시트 (운영: 제로패킹)</p>
            <p className="mt-1">대표자: 이완동 · 사업자등록번호: 564-44-01128</p>
            <p>통신판매업신고: 2026-서울강북-0102</p>
            <p className="mt-1">이메일: contact@zeropacking.com · 운영시간: 평일 09:00~18:00 (점심시간 제외)</p>
          </address>
          <p className="mt-4">{f.rightsNote(new Date().getFullYear())}</p>
        </div>
      </div>
    </footer>
  );
}
