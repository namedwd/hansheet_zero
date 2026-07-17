import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "../../site";
import { ImagePlaceholder } from "../../components/Illustrations";
import { JsonLd, buildBreadcrumb, buildArticle } from "../../components/JsonLd";
import { ConversionCTA } from "../../components/ConversionCTA";
import { languageAlternates, localePath } from "../../i18n";

const PATH = "/api";

export const metadata: Metadata = {
  title: "包裝影片 API · WMS 串接 - Shopify、Cyberbiz、自建系統相容",
  description:
    "將包裝影片與既有 WMS·OMS·電商系統串接的方法。透過標準 REST API 與條碼介面，全面支援 Shopify·Cyberbiz·91APP 等電商系統與自建開發系統。",
  alternates: {
    canonical: localePath("zh-tw", PATH),
    languages: languageAlternates(PATH, ["ko", "ja", "zh-tw"]),
  },
  openGraph: {
    title: "包裝影片 API · WMS 串接指南",
    description:
      "以標準 REST API 將包裝影片整合至既有 WMS·OMS·電商系統。物流單號自動配對與影片連結自動發送。",
    url: localePath("zh-tw", PATH),
    locale: "zh_TW",
  },
};

const ENDPOINTS = [
  {
    method: "POST",
    path: "/v1/recordings",
    desc: "連同物流單號要求開始錄製包裝影片。當需要由系統直接觸發、而非使用條碼掃描器時使用。",
  },
  {
    method: "GET",
    path: "/v1/recordings/{trackingNo}",
    desc: "以物流單號查詢包裝影片的中繼資料（URL、長度、拍攝日期時間）。",
  },
  {
    method: "GET",
    path: "/v1/recordings/{trackingNo}/share-link",
    desc: "產生供客戶分享用的包裝影片連結（可設定到期期限）。",
  },
  {
    method: "POST",
    path: "/v1/webhooks",
    desc: "將包裝影片錄製完成·上傳完成的事件推送至使用者系統。",
  },
];

const INTEGRATIONS = [
  { name: "Shopify", desc: "訂單出貨時自動配對物流單號，並自動將影片連結登錄為備註" },
  { name: "Cyberbiz", desc: "於訂單管理 → 出貨完成的時間點觸發，建立影片索引" },
  { name: "91APP", desc: "登錄物流單號時透過標準 API 同步" },
  { name: "蝦皮", desc: "Excel 批次出貨後自動化物流單號對應" },
  { name: "自建 WMS", desc: "以 REST API + Webhook 與任何系統串接" },
  { name: "ERP（SAP 等）", desc: "將出貨完成觸發連結至 ERP，與會計結帳串接" },
];

const FAQ = [
  {
    q: "呼叫 API 是否有額外費用？",
    a: "API·Webhook 的使用已包含在單一方案（每包裝台每月 990 元）中，在一般網路商店規模下不會產生額外費用。呼叫量極大的企業級規模，請另行洽詢，我們將為您說明。",
  },
  {
    q: "API 串接需要多少開發人力？",
    a: "由於採用 REST API 標準，1 名後端工程師約 0.5～1 天即可完成基本串接。Shopify·Cyberbiz 等主要電商系統另外提供指南文件。",
  },
  {
    q: "可透過 Webhook 接收哪些事件？",
    a: "可透過 Webhook 推送接收錄製開始、錄製完成、雲端上傳完成、影片被查看等主要生命週期事件。",
  },
];

export default function ApiPage() {
  const today = "2026-06-14T00:00:00.000Z";
  return (
    <>
      <JsonLd
        data={buildBreadcrumb(SITE_URL, [
          { name: "首頁", path: localePath("zh-tw", "/") },
          { name: "API · WMS 串接", path: PATH },
        ])}
      />
      <JsonLd
        data={buildArticle({
          siteUrl: SITE_URL,
          path: PATH,
          headline: "包裝影片 API · WMS 串接",
          description:
            "以標準 REST API 將包裝影片整合至 Shopify·Cyberbiz·自建 WMS 的指南。",
          datePublished: today,
          dateModified: today,
        })}
      />

      <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-10 sm:py-24">
        <nav aria-label="目前位置" className="mb-6 text-sm text-zinc-500">
          <Link href={localePath("zh-tw", "/")} className="hover:text-black dark:hover:text-white">首頁</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-700 dark:text-zinc-300">API · WMS 串接</span>
        </nav>

        <header className="mb-12">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-zinc-500">
            開發者 · 系統串接
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
            包裝影片 API
            <br />
            <span className="text-zinc-500">直接接上既有系統</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            Zeropacking 提供標準 REST API 與條碼介面，從 Shopify·
            Cyberbiz·91APP·蝦皮到自建開發的 WMS，都能與任何系統
            串接。物流單號自動配對、影片連結自動發送、訂閱 Webhook 事件
            全部都做得到。
          </p>
        </header>

        <section className="mb-14">
          <figure>
            <ImagePlaceholder
              label="API 串接示意圖 (WMS ↔ 包裝影片 ↔ 雲端)"
              ratio="16/9"
            />
            <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              系統串接示意圖（實拍範例待補）
            </figcaption>
          </figure>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            核心端點
          </h2>
          <ul className="mt-6 space-y-3">
            {ENDPOINTS.map((e) => (
              <li
                key={e.path}
                className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded px-2 py-0.5 font-mono text-xs font-bold ${
                      e.method === "GET"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                        : "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                    }`}
                  >
                    {e.method}
                  </span>
                  <code className="font-mono text-sm text-black dark:text-white">{e.path}</code>
                </div>
                <p className="mt-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">{e.desc}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            範例 — 以物流單號查詢影片
          </h2>
          <pre className="mt-6 overflow-x-auto rounded-2xl bg-zinc-900 p-5 text-sm text-zinc-100">
            <code>{`curl -H "Authorization: Bearer YOUR_TOKEN" \\
  https://api.zeropacking.com/v1/recordings/1234567890

{
  "trackingNo": "1234567890",
  "recordedAt": "2026-05-10T14:23:11+09:00",
  "duration": 47,
  "url": "https://cdn.zeropacking.com/v/abc123",
  "shareLink": "https://zeropacking.com/v/abc123",
  "thumbnail": "https://cdn.zeropacking.com/t/abc123.jpg"
}`}</code>
          </pre>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            支援的系統
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {INTEGRATIONS.map((i) => (
              <li key={i.name} className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800">
                <h3 className="text-base font-semibold text-black dark:text-zinc-50">{i.name}</h3>
                <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{i.desc}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            常見問題
          </h2>
          <div className="mt-6 divide-y divide-zinc-200 dark:divide-zinc-800">
            {FAQ.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-black dark:text-zinc-50">
                  {f.q}
                  <span className="text-zinc-400 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-base leading-7 text-zinc-700 dark:text-zinc-300">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <ConversionCTA locale="zh-tw" title="既有系統串接，我們提供一對一說明" description="無論是 Shopify·Cyberbiz·自建 WMS 等任何系統都能串接。留下導入諮詢，即可獲得符合貴公司系統的串接方案說明。" />

        <nav aria-label="相關文章" className="mt-14 grid gap-3 sm:grid-cols-2">
          <Link href={localePath("zh-tw", "/guide")} className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">相關文章</span>
            <p className="mt-1 font-semibold text-black dark:text-white">包裝影片導入指南</p>
          </Link>
          <Link href={localePath("zh-tw", "/pricing")} className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">相關文章</span>
            <p className="mt-1 font-semibold text-black dark:text-white">包裝影片費用</p>
          </Link>
        </nav>
      </main>
    </>
  );
}
