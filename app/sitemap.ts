import type { MetadataRoute } from "next";
import { SITE_URL } from "./site";
import { POSTS } from "./blog/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const corePages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/vs-cctv", priority: 0.9, changeFrequency: "monthly" },
    { path: "/guide", priority: 0.9, changeFrequency: "monthly" },
    { path: "/cases", priority: 0.9, changeFrequency: "monthly" },
    { path: "/claim", priority: 0.9, changeFrequency: "monthly" },
    { path: "/api", priority: 0.8, changeFrequency: "monthly" },
    { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  ];

  const blogPosts = POSTS.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...corePages.map((p) => ({
      url: `${SITE_URL}${p.path}`,
      lastModified,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    ...blogPosts,
  ];
}
