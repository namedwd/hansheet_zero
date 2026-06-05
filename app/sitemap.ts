import type { MetadataRoute } from "next";
import { SITE_URL } from "./site";
import { POSTS } from "./blog/posts";
import { localePath } from "./i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const corePages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/compare", priority: 0.95, changeFrequency: "monthly" },
    { path: "/vs-cctv", priority: 0.9, changeFrequency: "monthly" },
    { path: "/guide", priority: 0.9, changeFrequency: "monthly" },
    { path: "/cases", priority: 0.9, changeFrequency: "monthly" },
    { path: "/claim", priority: 0.9, changeFrequency: "monthly" },
    { path: "/api", priority: 0.8, changeFrequency: "monthly" },
    { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  ];

  // 영어로 번역되어 존재하는 경로(ko 기준). 페이지를 번역할 때마다 여기에 추가하세요.
  const translatedToEn = new Set<string>(["/"]);

  const blogPosts = POSTS.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // 한국어(기본) 페이지. 영어 버전이 있으면 hreflang alternates를 함께 선언합니다.
  const koEntries = corePages.map((p) => {
    const hasEn = translatedToEn.has(p.path);
    return {
      url: `${SITE_URL}${localePath("ko", p.path)}`,
      lastModified,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
      ...(hasEn
        ? {
            alternates: {
              languages: {
                "ko-KR": `${SITE_URL}${localePath("ko", p.path)}`,
                en: `${SITE_URL}${localePath("en", p.path)}`,
              },
            },
          }
        : {}),
    };
  });

  // 영어 페이지(현재 홈만).
  const enEntries = corePages
    .filter((p) => translatedToEn.has(p.path))
    .map((p) => ({
      url: `${SITE_URL}${localePath("en", p.path)}`,
      lastModified,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
      alternates: {
        languages: {
          "ko-KR": `${SITE_URL}${localePath("ko", p.path)}`,
          en: `${SITE_URL}${localePath("en", p.path)}`,
        },
      },
    }));

  return [...koEntries, ...enEntries, ...blogPosts];
}
