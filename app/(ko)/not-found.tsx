import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다",
  description:
    "요청하신 페이지를 찾을 수 없습니다. 홈으로 돌아가거나 포장영상 관련 다른 글을 둘러보세요.",
  robots: { index: false, follow: true },
};

const SUGGESTED = [
  { href: "/", label: "홈 — 포장영상 자동 촬영 서비스 소개" },
  { href: "/vs-cctv", label: "포장영상 vs CCTV — 무엇이 다른가" },
  { href: "/claim", label: "택배 클레임 해결 — 영상 한 편으로 종결" },
  { href: "/pricing", label: "포장영상 요금 — 월 30,000원부터" },
  { href: "/blog", label: "블로그 — 셀러를 위한 인사이트" },
];

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col px-6 py-24 sm:px-10">
      <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
        404
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
        찾으시는 페이지가 없습니다
      </h1>
      <p className="mt-5 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
        주소가 변경됐거나 잘못된 링크일 수 있습니다. 아래 페이지 중 찾으시던
        내용이 있을지 확인해 보세요.
      </p>

      <ul className="mt-10 divide-y divide-zinc-200 dark:divide-zinc-800">
        {SUGGESTED.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="flex items-center justify-between gap-4 py-4 text-base text-black hover:underline dark:text-zinc-50"
            >
              <span>{item.label}</span>
              <span aria-hidden="true" className="text-zinc-400">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="/"
        className="mt-10 inline-flex h-12 w-fit items-center justify-center rounded-full bg-black px-7 text-base font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
      >
        홈으로 돌아가기
      </Link>
    </main>
  );
}
