import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "../site";
import { POSTS } from "./posts";
import { JsonLd, buildBreadcrumb } from "../components/JsonLd";

const PATH = "/blog";

export const metadata: Metadata = {
  title: "포장영상 블로그 - 택배 클레임·분쟁 해결 인사이트",
  description:
    "포장영상으로 택배 분쟁을 해결하는 셀러를 위한 인사이트. 쿠팡·스마트스토어 클레임 대응, 택배 파손 보상, 빈박스 분쟁 등 실전 노하우를 정리합니다.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "포장영상 블로그",
    description: "택배 클레임·분쟁 해결을 위한 셀러 인사이트.",
    url: PATH,
  },
};

export default function BlogIndex() {
  const sorted = [...POSTS].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt)
  );

  return (
    <>
      <JsonLd
        data={buildBreadcrumb(SITE_URL, [
          { name: "홈", path: "/" },
          { name: "블로그", path: PATH },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "제로패킹 포장영상 블로그",
          url: `${SITE_URL}${PATH}`,
          inLanguage: "ko-KR",
          blogPost: sorted.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: `${SITE_URL}/blog/${p.slug}`,
            datePublished: p.publishedAt,
            dateModified: p.updatedAt,
            description: p.description,
          })),
        }}
      />

      <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-10 sm:py-24">
        <nav aria-label="현재 위치" className="mb-6 text-sm text-zinc-500">
          <Link href="/" className="hover:text-black dark:hover:text-white">홈</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-700 dark:text-zinc-300">블로그</span>
        </nav>

        <header className="mb-12">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-zinc-500">
            포장영상 블로그
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
            택배 클레임을 줄이는
            <br />
            셀러를 위한 인사이트
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            쿠팡·스마트스토어 클레임 대응, 택배 파손 보상, 빈박스 분쟁,
            포장영상 카메라 추천 등 실전 노하우를 정리합니다.
          </p>
        </header>

        <ul className="space-y-6">
          {sorted.map((post) => (
            <li key={post.slug}>
              <article className="rounded-2xl border border-zinc-200 p-6 transition-colors hover:border-black dark:border-zinc-800 dark:hover:border-white">
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="mb-3 flex items-center gap-3 text-xs text-zinc-500">
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <span aria-hidden="true">·</span>
                    <span>{post.readingMinutes}분 읽기</span>
                  </div>
                  <h2 className="text-xl font-semibold text-black group-hover:underline dark:text-zinc-50 sm:text-2xl">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-base leading-7 text-zinc-700 dark:text-zinc-300">
                    {post.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                      >
                        #{t}
                      </li>
                    ))}
                  </ul>
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
