import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { POSTS, type Section } from "../posts";
import { SITE_URL, SERVICE_URL } from "../../site";
import { JsonLd, buildBreadcrumb, buildArticle } from "../../components/JsonLd";

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  const path = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: path,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

function renderSection(section: Section, index: number) {
  switch (section.type) {
    case "h2":
      return (
        <h2
          key={index}
          className="mt-12 text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl"
        >
          {section.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          key={index}
          className="mt-8 text-lg font-semibold text-black dark:text-zinc-50"
        >
          {section.text}
        </h3>
      );
    case "p":
      return (
        <p
          key={index}
          className="mt-5 text-base leading-7 text-zinc-700 dark:text-zinc-300"
        >
          {section.text}
        </p>
      );
    case "list":
      return (
        <ul key={index} className="mt-5 space-y-2 pl-5">
          {section.items.map((item, i) => (
            <li
              key={i}
              className="list-disc text-base leading-7 text-zinc-700 dark:text-zinc-300"
            >
              {item}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={index} className="mt-5 space-y-2 pl-5">
          {section.items.map((item, i) => (
            <li
              key={i}
              className="list-decimal text-base leading-7 text-zinc-700 dark:text-zinc-300"
            >
              {item}
            </li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote
          key={index}
          className="mt-8 rounded-2xl border-l-4 border-zinc-300 bg-zinc-50 p-5 italic text-zinc-800 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200"
        >
          <p>{section.text}</p>
          {section.cite && (
            <footer className="mt-3 text-sm not-italic text-zinc-500">
              — {section.cite}
            </footer>
          )}
        </blockquote>
      );
    case "callout":
      return (
        <aside
          key={index}
          className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900/40 dark:bg-amber-950/20"
        >
          <h4 className="text-sm font-bold text-amber-900 dark:text-amber-300">
            {section.title}
          </h4>
          <p className="mt-2 text-sm leading-6 text-amber-900 dark:text-amber-200">
            {section.text}
          </p>
        </aside>
      );
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const path = `/blog/${post.slug}`;
  const related = POSTS.filter((p) => p.slug !== slug)
    .filter((p) => p.tags.some((t) => post.tags.includes(t)))
    .slice(0, 2);

  return (
    <>
      <JsonLd
        data={buildBreadcrumb(SITE_URL, [
          { name: "홈", path: "/" },
          { name: "블로그", path: "/blog" },
          { name: post.title, path },
        ])}
      />
      <JsonLd
        data={buildArticle({
          siteUrl: SITE_URL,
          path,
          headline: post.title,
          description: post.description,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt,
        })}
      />

      <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-10 sm:py-24">
        <nav aria-label="현재 위치" className="mb-6 text-sm text-zinc-500">
          <Link href="/" className="hover:text-black dark:hover:text-white">홈</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-black dark:hover:text-white">블로그</Link>
          <span className="mx-2">/</span>
          <span className="line-clamp-1 inline-block text-zinc-700 dark:text-zinc-300">
            {post.title}
          </span>
        </nav>

        <article>
          <header className="mb-10">
            <div className="mb-4 flex items-center gap-3 text-xs text-zinc-500">
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
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              {post.description}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                >
                  #{t}
                </li>
              ))}
            </ul>
          </header>

          <div className="prose prose-zinc dark:prose-invert">
            {post.sections.map((s, i) => renderSection(s, i))}
          </div>
        </article>

        <section className="mt-16 rounded-3xl border border-zinc-200 p-8 dark:border-zinc-800">
          <h2 className="text-xl font-semibold text-black dark:text-zinc-50">
            포장영상 15일 무료체험
          </h2>
          <p className="mt-2 text-base leading-7 text-zinc-700 dark:text-zinc-300">
            카드 등록 없이 포장영상의 모든 기능을 체험해 보세요.
          </p>
          <a
            href={`${SERVICE_URL}/checkout`}
            className="mt-4 inline-flex h-11 items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            무료체험 시작
          </a>
        </section>

        {related.length > 0 && (
          <nav aria-label="관련 글" className="mt-12">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-zinc-500">
              관련 글
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/blog/${r.slug}`}
                    className="block rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white"
                  >
                    <p className="font-semibold text-black dark:text-white">
                      {r.title}
                    </p>
                    <p className="mt-2 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
                      {r.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </main>
    </>
  );
}
