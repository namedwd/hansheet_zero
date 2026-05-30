import Link from "next/link";
import { SERVICE_URL, INQUIRY_URL } from "../site";

const NAV_LINKS = [
  { href: "/compare", label: "업체 비교" },
  { href: "/vs-cctv", label: "CCTV 비교" },
  { href: "/cases", label: "도입 사례" },
  { href: "/claim", label: "클레임 해결" },
  { href: "/pricing", label: "요금" },
  { href: "/blog", label: "블로그" },
];

export function Nav() {
  return (
    <nav
      aria-label="주요 메뉴"
      className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-black/80"
    >
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-6 py-3 sm:px-10">
        <Link href="/" className="text-base font-bold text-black dark:text-white">
          한시트 <span className="font-medium text-zinc-500">포장영상</span>
        </Link>

        {/* 데스크탑 메뉴 */}
        <ul className="hidden items-center gap-5 text-sm sm:flex">
          {NAV_LINKS.map((l) => (
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
            <a
              href={`${SERVICE_URL}/checkout`}
              className="inline-flex h-9 items-center justify-center rounded-full bg-black px-4 text-xs font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              무료체험
            </a>
          </li>
        </ul>

        {/* 모바일 햄버거 메뉴 (zero-JS, <details>) */}
        <details className="group relative sm:hidden">
          <summary
            className="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-md text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
            aria-label="메뉴 열기"
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
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block rounded-lg px-3 py-2 text-sm text-zinc-800 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="mt-1 border-t border-zinc-200 pt-1 dark:border-zinc-800">
              <a
                href={`${SERVICE_URL}/checkout`}
                className="block rounded-lg bg-black px-3 py-2 text-center text-sm font-medium text-white dark:bg-white dark:text-black"
              >
                무료체험 시작
              </a>
            </li>
          </ul>
        </details>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-3xl px-6 py-10 text-sm text-zinc-600 dark:text-zinc-400 sm:px-10">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-500">
              포장영상 토픽
            </h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-black dark:hover:text-white">포장영상이란?</Link></li>
              <li><Link href="/compare" className="hover:text-black dark:hover:text-white">업체 비교</Link></li>
              <li><Link href="/vs-cctv" className="hover:text-black dark:hover:text-white">포장영상 vs CCTV</Link></li>
              <li><Link href="/guide" className="hover:text-black dark:hover:text-white">도입 가이드</Link></li>
              <li><Link href="/cases" className="hover:text-black dark:hover:text-white">도입 사례</Link></li>
              <li><Link href="/claim" className="hover:text-black dark:hover:text-white">택배 클레임 해결</Link></li>
              <li><Link href="/blog" className="hover:text-black dark:hover:text-white">블로그</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-500">
              제품
            </h3>
            <ul className="space-y-2">
              <li><Link href="/api" className="hover:text-black dark:hover:text-white">API · WMS 연동</Link></li>
              <li><Link href="/pricing" className="hover:text-black dark:hover:text-white">요금제</Link></li>
              <li><a href={`${SERVICE_URL}/checkout`} className="hover:text-black dark:hover:text-white">15일 무료체험</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-500">
              한시트
            </h3>
            <ul className="space-y-2">
              <li>
                <a href={INQUIRY_URL} target="_blank" rel="noopener" className="hover:text-black dark:hover:text-white">
                  도입 문의하기
                </a>
              </li>
              <li><a href={SERVICE_URL} className="hover:text-black dark:hover:text-white">제로패킹 서비스</a></li>
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
          <p className="mt-4">
            © {new Date().getFullYear()} 한시트 · 택배 포장영상 자동 촬영
            가이드 사이트. 실제 서비스 이용은{" "}
            <a href={SERVICE_URL} className="underline hover:text-black dark:hover:text-white">
              제로패킹 (zeropacking.com)
            </a>
            에서 가능합니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
