import assert from "node:assert/strict";

// Run against a production build: node scripts/check-seo.mjs http://localhost:3100
const base = new URL(process.argv[2] ?? "http://localhost:3100");
const local = (url) => new URL(new URL(url, base).pathname, base);
const attr = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
const response = await fetch(new URL("/sitemap.xml", base));
assert.equal(response.status, 200, "sitemap must be accessible");
const xml = await response.text();
const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => {
  const url = match[1].match(/<loc>(.*?)<\/loc>/)?.[1];
  assert.ok(url, "sitemap entry needs a URL");
  const alternates = [...match[1].matchAll(/<xhtml:link\b[^>]*>/g)].map(([tag]) => [attr(tag, "hreflang"), attr(tag, "href")]);
  if (!new URL(url).pathname.startsWith("/blog/")) assert.ok(!match[1].includes("<lastmod>"), "untracked pages must not claim a new modification date");
  return { url, alternates };
});
assert.ok(entries.length > 30, "localized and blog pages should remain discoverable");
assert.equal(new Set(entries.map(entry => entry.url)).size, entries.length, "duplicate sitemap URL");
const known = new Set(entries.map(entry => new URL(entry.url).pathname));
const images = new Set();
for (const language of ["", "en-US,en;q=0.9", "ja-JP", "zh-TW", "vi-VN", "ko-KR"]) {
  const page = await fetch(base, { headers: { "Accept-Language": language, "User-Agent": "Googlebot" }, redirect: "manual" });
  assert.equal(page.status, 200, `Korean home must not redirect for ${language}`);
  assert.ok((await page.text()).includes("출고 기록을 주문별로 확인하세요"));
}
for (let offset = 0; offset < entries.length; offset += 4) {
  await Promise.all(entries.slice(offset, offset + 4).map(async ({ url, alternates }) => {
    const page = await fetch(local(url), { redirect: "manual" });
    assert.equal(page.status, 200, url);
    const html = await page.text();
    if (/^\/(en|ja|zh-tw|vi)(\/|$)/.test(new URL(url).pathname)) {
      assert.ok(!html.match(/<title>(.*?)<\/title>/)?.[1].includes("한시트"), `Korean title leaked into translation: ${url}`);
    }
    const links = [...html.matchAll(/<link\b[^>]*>/g)].map(([tag]) => tag);
    const canonical = links.find(tag => attr(tag, "rel") === "canonical");
    const canonicalUrl = attr(canonical ?? "", "href");
    assert.ok(canonicalUrl, `missing canonical: ${url}`);
    assert.equal(new URL(canonicalUrl).href, new URL(url).href, `self canonical: ${url}`);
    for (const [lang, href] of alternates) {
      assert.ok(known.has(new URL(href).pathname), `missing translation: ${href}`);
      const htmlAlt = links.find(tag => attr(tag, "hrefLang") === lang || attr(tag, "hreflang") === lang);
      const alternateUrl = attr(htmlAlt ?? "", "href");
      assert.ok(alternateUrl, `missing language alternate: ${url} ${lang}`);
      assert.equal(new URL(alternateUrl).href, new URL(href).href, `HTML/sitemap language mismatch: ${url} ${lang}`);
    }
    for (const [tag] of html.matchAll(/<meta\b[^>]*>/g)) {
      if (attr(tag, "property") === "og:image") images.add(attr(tag, "content"));
      if (attr(tag, "name") === "robots") assert.ok(!attr(tag, "content")?.includes("noindex"), url);
    }
    assert.ok(html.includes('property="og:image"'), `missing share image: ${url}`);
    for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(match[1]);
    assert.ok(!html.includes("/logo.png") && !html.includes("/og-image.png"), `broken legacy asset: ${url}`);
  }));
}
for (const image of images) {
  const result = await fetch(local(image));
  assert.equal(result.status, 200, image);
  assert.ok(result.headers.get("content-type")?.startsWith("image/"), image);
}
console.log(`SEO checks passed: ${entries.length} pages, 6 language header conditions, ${images.size} share images, canonical URLs, hreflang, JSON-LD and sitemap.`);
