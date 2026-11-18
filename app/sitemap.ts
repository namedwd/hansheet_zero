import type { MetadataRoute } from "next";
import { SITE_URL } from "./site";
import { POSTS } from "./(ko)/blog/posts";
import { availableLocales, languageAlternates, localePath, TRANSLATED_PATHS } from "./i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  // 실제 변경 이력이 없는 페이지에는 빌드 날짜를 수정일로 표시하지 않습니다.
  const pages = [...TRANSLATED_PATHS, "/blog"].flatMap((path) => {
    const languages = Object.fromEntries(
      Object.entries(languageAlternates(path)).map(([lang, href]) => [lang, new URL(href, SITE_URL).href]),
    );
    return availableLocales(path).map((locale) => ({
      url: new URL(localePath(locale, path), SITE_URL).href,
      alternates: { languages },
    }));
  });
  return [
    ...pages,
    ...POSTS.map((post) => ({
      url: new URL("/blog/" + post.slug, SITE_URL).href,
      lastModified: post.updatedAt,
    })),
  ];
}
