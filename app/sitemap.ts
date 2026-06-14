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

  // 각 언어로 번역되어 존재하는 경로(ko 기준). 페이지를 번역할 때마다 여기에 추가하세요.
  const translatedToEn = new Set<string>(["/"]);
  const coreTranslated = [
    "/",
    "/compare",
    "/vs-cctv",
    "/guide",
    "/cases",
    "/claim",
    "/api",
    "/pricing",
  ];
  const translatedToJa = new Set<string>(coreTranslated);
  const translatedToZhTw = new Set<string>(coreTranslated);
  const translatedToVi = new Set<string>(coreTranslated);

  // 해당 경로에 존재하는 모든 언어의 hreflang 맵을 만듭니다.
  const altLanguages = (path: string) => {
    const languages: Record<string, string> = {
      "ko-KR": `${SITE_URL}${localePath("ko", path)}`,
    };
    if (translatedToEn.has(path)) languages["en"] = `${SITE_URL}${localePath("en", path)}`;
    if (translatedToJa.has(path)) languages["ja-JP"] = `${SITE_URL}${localePath("ja", path)}`;
    if (translatedToZhTw.has(path)) languages["zh-TW"] = `${SITE_URL}${localePath("zh-tw", path)}`;
    if (translatedToVi.has(path)) languages["vi-VN"] = `${SITE_URL}${localePath("vi", path)}`;
    return languages;
  };

  const blogPosts = POSTS.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // 한국어(기본) 페이지. 다른 언어 버전이 있으면 hreflang alternates를 함께 선언합니다.
  const koEntries = corePages.map((p) => {
    const hasAlt =
      translatedToEn.has(p.path) ||
      translatedToJa.has(p.path) ||
      translatedToZhTw.has(p.path) ||
      translatedToVi.has(p.path);
    return {
      url: `${SITE_URL}${localePath("ko", p.path)}`,
      lastModified,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
      ...(hasAlt ? { alternates: { languages: altLanguages(p.path) } } : {}),
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
      alternates: { languages: altLanguages(p.path) },
    }));

  // 일본어 페이지.
  const jaEntries = corePages
    .filter((p) => translatedToJa.has(p.path))
    .map((p) => ({
      url: `${SITE_URL}${localePath("ja", p.path)}`,
      lastModified,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
      alternates: { languages: altLanguages(p.path) },
    }));

  // 번체 중국어(대만) 페이지.
  const zhTwEntries = corePages
    .filter((p) => translatedToZhTw.has(p.path))
    .map((p) => ({
      url: `${SITE_URL}${localePath("zh-tw", p.path)}`,
      lastModified,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
      alternates: { languages: altLanguages(p.path) },
    }));

  // 베트남어 페이지.
  const viEntries = corePages
    .filter((p) => translatedToVi.has(p.path))
    .map((p) => ({
      url: `${SITE_URL}${localePath("vi", p.path)}`,
      lastModified,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
      alternates: { languages: altLanguages(p.path) },
    }));

  return [...koEntries, ...enEntries, ...jaEntries, ...zhTwEntries, ...viEntries, ...blogPosts];
}
