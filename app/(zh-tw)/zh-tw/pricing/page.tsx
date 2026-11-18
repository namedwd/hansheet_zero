import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, SERVICE_URL, serviceLandingUrl } from "../../../site";
import { JsonLd, buildBreadcrumb } from "../../../components/JsonLd";
import { ConversionCTA } from "../../../components/ConversionCTA";
import { languageAlternates, localePath } from "../../../i18n";
import { PAYMENT_GUIDANCE, publicMoney, publicPrice } from "../../../publicPricing";
import { PaymentNote, StationPriceTable } from "../../../components/Pricing";

// 금액과 결제 안내는 app/publicPricing.js(제로패킹과 같은 가격표)에서만 가져옵니다.
// 대만 고객도 달러로 결제하므로 달러로 표시합니다.
const CURRENCY = "USD";
const PRICE = publicMoney(CURRENCY);
const ANNUAL = publicMoney(CURRENCY, "yearly");
const PAY = PAYMENT_GUIDANCE["zh-tw"];
const ANNUAL_LINE = PAY.annual.replace("{price}", ANNUAL);

const PATH = "/pricing";

export const metadata: Metadata = {
  title: `包裝影片費用 - 每個包裝台每月 ${PRICE}，全功能包含`,
  description:
    `Zeropacking 包裝影片採單一方案 — 每個包裝台每月 ${PRICE}，即可使用包含 WMS、API 串接在內的所有功能。年繳方案付 10 個月費用即可使用 12 個月，15 天免費試用。`,
  alternates: {
    canonical: localePath("zh-tw", PATH),
    languages: languageAlternates(PATH),
  },
  openGraph: {
    images: ["/packing-video-hero.webp"],
    title: `包裝影片費用 - 每月 ${PRICE}，全功能包含`,
    description:
      "單一方案即可使用 WMS、API、HD 錄影、3 個月雲端保存等所有功能。無需登錄信用卡即可免費試用。",
    url: localePath("zh-tw", PATH),
    locale: "zh_TW",
  },
};

const FEATURES = [
  "包裝影片自動拍攝",
  "託運單號自動索引",
  "HD 畫質錄影",
  "3 個月雲端保存",
  "30GB 儲存容量",
  "客戶影片連結分享",
  "WMS、OMS API 串接",
  "Webhook 事件",
  "電子郵件支援",
];

const FAQ = [
  {
    q: "包裝影片費用是否含稅？",
    a: PAY.tax,
  },
  {
    q: "年繳方案的費用是多少？",
    a: `年繳方案付 10 個月的費用（${ANNUAL}）即可使用 12 個月。`,
  },
  {
    q: "免費試用後會自動扣款嗎？",
    a: `不會。免費試用無需登錄信用卡即可開始。${PAY.body}`,
  },
  {
    q: "中途取消會退款嗎？",
    a: "月繳方案不退還當期剩餘期間的費用。年繳方案的退款金額為「已付金額 −（月繳定價 × 已使用月數）」，使用月數以月為單位無條件進位。付款後 7 天內且尚未使用服務時，可申請全額退款。",
  },
  {
    q: "包裝台增加時費用如何計算？",
    a: `以每個包裝台為單位增加。同一營業場所可同時運作多個包裝台，每個包裝台會安裝一台攝影機。例如：運作 3 個包裝台時每月 ${publicMoney(CURRENCY, "monthly", 3)}。`,
  },
  {
    q: "WMS 或 API 串接也包含在相同價格中嗎？",
    a: "是的。所有功能（WMS 串接、API、Webhook、HD 錄影、雲端保存、影片分享）皆包含在單一方案中，無需另外付費。",
  },
  {
    q: "可以延長保存期間嗎？",
    a: "基本保存期間為 3 個月。若需要更長的保存期間（6 個月、12 個月），請另行洽詢，我們將為您說明。",
  },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumb(SITE_URL, [
          { name: "首頁", path: localePath("zh-tw", "/") },
          { name: "包裝影片費用", path: localePath("zh-tw", PATH) },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "包裝影片自動拍攝及雲端保存服務",
          name: "Zeropacking 包裝影片",
          description:
            `自動拍攝宅配包裝影片並保存至雲端的 SaaS 服務。可透過託運單號即時搜尋。每個包裝台每月 ${PRICE}。`,
          provider: { "@type": "Organization", name: "Zeropacking", url: SERVICE_URL },
          areaServed: "TW",
          url: "https://www.zeropacking.com/zh-tw",
          offers: {
            "@type": "Offer",
            price: publicPrice(CURRENCY),
            priceCurrency: CURRENCY,
            url: "https://www.zeropacking.com/zh-tw",
            description: "每個包裝台每月費用。年繳方案付 10 個月費用即可使用 12 個月。",
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />

      <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-10 sm:py-24">
        <nav aria-label="目前位置" className="mb-6 text-sm text-zinc-500">
          <Link href={localePath("zh-tw", "/")} className="hover:text-black dark:hover:text-white">首頁</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-700 dark:text-zinc-300">包裝影片費用</span>
        </nav>

        <header className="mb-12 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-zinc-500">
            費用
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
            單純的費用，全功能包含
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            無需比較各種方案。每個包裝台每月 {PRICE}，即可使用包含 WMS、API
            串接在內的所有功能。無需登錄信用卡，立即以 15 天免費試用開始吧。
          </p>
        </header>

        <section className="mb-14">
          <article className="relative mx-auto max-w-md rounded-3xl border-2 border-black bg-white p-8 shadow-xl dark:border-white dark:bg-zinc-950">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-300 px-3 py-1 text-xs font-bold text-black">
              全功能包含
            </span>

            <h2 className="text-lg font-bold text-black dark:text-white">包裝影片單一方案</h2>

            <div className="mt-5">
              <span className="text-5xl font-bold text-black dark:text-white">{PRICE}</span>
              <span className="ml-2 text-base text-zinc-500">/ 包裝台 / 月</span>
              <p className="mt-2 text-sm text-zinc-500">{ANNUAL_LINE}</p>
              <p className="mt-2 text-sm text-zinc-500">多台或大規模運用的報價，歡迎洽詢。</p>
            </div>

            <ul className="mt-7 space-y-3 text-sm">
              {FEATURES.map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="text-emerald-500">✓</span>
                  <span className="text-zinc-800 dark:text-zinc-200">{f}</span>
                </li>
              ))}
            </ul>

            <a
              href={serviceLandingUrl("zh-tw", "pricing-trial")}
              target="_blank"
              rel="noopener"
              className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-full bg-black px-5 text-base font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              開始 15 天免費試用
            </a>
            <p className="mt-3 text-center text-xs text-zinc-500">
              無需登錄信用卡即可立即開始 · 不會自動扣款
            </p>
          </article>
          <PaymentNote language="zh-tw" />
        </section>

        <section className="mb-14 rounded-3xl bg-zinc-50 p-8 dark:bg-zinc-950 sm:p-10">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            各包裝台數量的預估費用
          </h2>
          <StationPriceTable
            currency={CURRENCY}
            head={["包裝台數", "月繳方案", "年繳方案（使用 12 個月）"]}
            stations={(count) => `包裝台 ${count} 個`}
          />
          <p className="mt-4 text-sm text-zinc-500">
            所有包裝台皆適用相同功能（WMS、API、HD 錄影、3 個月保存等）。
          </p>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            包裝影片是費用，還是投資
          </h2>
          <div className="mt-5 space-y-4 text-base leading-7 text-zinc-700 dark:text-zinc-300">
            <p>
              包裝影片每月費用 {PRICE}，只要減少 1 件不當退款即可回本。
              以一般賣家為基準，1～2 個月內即可產生 ROI，再加上客訴應對時間的節省，實際效益遠遠更大。
            </p>
            <p>
              這個金額不到關鍵字廣告幾次點擊的費用，卻能為每一筆出貨留下客觀證據。
            </p>
          </div>
          <span className="mt-5 inline-flex items-center text-sm font-medium text-zinc-700 dark:text-zinc-300">
            每月 1,000 件賣家的客訴成本模擬
          </span>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            費用常見問題
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

        <ConversionCTA locale="zh-tw" title="若已確認費用，導入流程如下" />
      </main>
    </>
  );
}
