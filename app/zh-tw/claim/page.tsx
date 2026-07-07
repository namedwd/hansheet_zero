import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "../../site";
import { ImagePlaceholder } from "../../components/Illustrations";
import { JsonLd, buildBreadcrumb, buildArticle } from "../../components/JsonLd";
import { ConversionCTA } from "../../components/ConversionCTA";
import { languageAlternates, localePath } from "../../i18n";

const PATH = "/claim";

export const metadata: Metadata = {
  title: "宅配客訴處理 - 用一支包裝影片就能結案的方法",
  description:
    "商品缺件、寄錯、破損、空箱主張 — 提供宅配客訴 6 大類型的處理方法，以及用包裝影片即時化解爭議的標準客服話術。",
  alternates: {
    canonical: localePath("zh-tw", PATH),
    languages: languageAlternates(PATH, ["ko", "ja", "zh-tw"]),
  },
  openGraph: {
    title: "宅配客訴處理指南",
    description:
      "用包裝影片，以一支影片化解宅配爭議的方法與客服話術。",
    url: localePath("zh-tw", PATH),
    locale: "zh_TW",
  },
};

const CASES = [
  {
    type: "商品缺件",
    claim: "裡面沒有商品",
    solution:
      "從包裝影片中擷取商品被放進箱子的畫面，連同連結一併傳送。大多數情況可立即結案。",
  },
  {
    type: "寄錯商品",
    claim: "收到的是別的商品",
    solution:
      "從包裝影片中確認託運單與箱內商品一致 → 傳送影片連結。同時也能作為釐清配送途中遺失／調包可能性的依據。",
  },
  {
    type: "破損",
    claim: "箱子凹陷變形才送到",
    solution:
      "包裝影片中顯示箱子是以正常狀態出貨，責任即可轉移至運送途中的事故。向物流業者申請理賠時是決定性的證據。",
  },
  {
    type: "收到空箱",
    claim: "箱子裡什麼都沒有",
    solution:
      "包裝影片會錄下商品放入箱子並封箱的整個過程，因此空箱的主張可立即被反駁。",
  },
  {
    type: "尺寸・顏色不符",
    claim: "這不是我訂的顏色",
    solution:
      "在包裝影片的驗貨階段，將商品的顏色與尺寸清楚錄製下來，即可阻擋單純改變心意的退款要求。",
  },
  {
    type: "數量短缺",
    claim: "我訂了 2 個，卻只收到 1 個",
    solution:
      "包裝影片中確認數量的驗貨畫面是關鍵證據，同時也一併釐清配送途中缺件的可能性。",
  },
];

const SCRIPT = [
  {
    step: "第 1 步 — 受理客訴",
    body:
      "「造成您的不便，非常抱歉。我們會立即依物流單號，為您確認出貨當下的包裝影片。」",
  },
  {
    step: "第 2 步 — 傳送影片連結",
    body:
      "「[物流單號 1234-5678] 這是包裝影片連結：https://… 麻煩您確認商品放入箱中的畫面，約在 0:35 附近。」",
  },
  {
    step: "第 3 步 — 後續處理說明",
    body:
      "（影片無問題）「包裝影片確認為正常出貨，我們將進一步向物流業者確認是否於配送途中遺失，後續再為您說明。」\n（確實缺件）「為您確認後，影片中確實有商品缺件的情形。我們會立即為您重新出貨。」",
  },
];

const FAQ = [
  {
    q: "所有客訴都能用包裝影片結案嗎？",
    a: "大多數單純爭議（缺件・空箱・破損主張）只要傳送影片連結即可結案。但若是配送途中的事故，或雙方皆有責任的情況，則需物流業者額外調查。",
  },
  {
    q: "把包裝影片給顧客看，會有個資問題嗎？",
    a: "包裝影片中只會出現商品與託運單標籤，相機角度設定上不會拍到作業人員的臉或其他訂單資訊。託運單資訊本來就是寄送給顧客本人的，因此不會額外洩漏個資。",
  },
  {
    q: "在電商平台的爭議調解中，包裝影片會被認可為證據嗎？",
    a: "會。在蝦皮、momo、PChome 等主要電商平台的爭議調解程序中，包裝影片被認可為決定性證據。影片上同時顯示物流單號與時間，因此也能證明其完整性。",
  },
];

export default function ClaimPage() {
  const today = "2026-06-14T00:00:00.000Z";
  return (
    <>
      <JsonLd
        data={buildBreadcrumb(SITE_URL, [
          { name: "首頁", path: localePath("zh-tw", "/") },
          { name: "宅配客訴處理", path: localePath("zh-tw", PATH) },
        ])}
      />
      <JsonLd
        data={buildArticle({
          siteUrl: SITE_URL,
          path: localePath("zh-tw", PATH),
          headline: "宅配客訴處理 - 用一支包裝影片就能結案的方法",
          description:
            "宅配客訴 6 大類型的因應方法，以及以包裝影片為基礎的標準客服話術。",
          datePublished: today,
          dateModified: today,
        })}
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
          <span className="text-zinc-700 dark:text-zinc-300">宅配客訴處理</span>
        </nav>

        <header className="mb-12">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-zinc-500">
            客訴處理指南
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
            宅配客訴，
            <br />
            用包裝影片來結案
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            「裡面沒有商品」、「箱子凹陷變形才送到」、「收到的是別的商品」
            — 只要是賣家，誰都會遇到這些客訴。本文提供宅配客訴 6 大類型的處理方法，
            以及用包裝影片即時化解爭議的標準客服話術。
          </p>
        </header>

        <section className="mb-14">
          <figure>
            <ImagePlaceholder
              label="用包裝影片即時結案的客服對話畫面範例"
              ratio="3/2"
            />
            <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              一行影片連結就能結案的爭議處理流程（實拍截圖將陸續補上）
            </figcaption>
          </figure>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            宅配客訴 6 大類型 — 包裝影片因應法
          </h2>
          <ul className="mt-6 space-y-4">
            {CASES.map((c) => (
              <li
                key={c.type}
                className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800"
              >
                <div className="flex items-baseline gap-3">
                  <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-white dark:bg-white dark:text-black">
                    {c.type}
                  </span>
                </div>
                <p className="mt-3 text-sm italic text-zinc-500">
                  顧客：「{c.claim}」
                </p>
                <p className="mt-3 text-base leading-7 text-zinc-700 dark:text-zinc-300">
                  <strong className="text-black dark:text-white">包裝影片因應：</strong>{" "}
                  {c.solution}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            標準客服話術（可直接複製使用）
          </h2>
          <ol className="mt-6 space-y-5">
            {SCRIPT.map((s) => (
              <li key={s.step} className="rounded-2xl bg-zinc-50 p-5 dark:bg-zinc-950">
                <h3 className="text-base font-semibold text-black dark:text-zinc-50">{s.step}</h3>
                <p className="mt-2 whitespace-pre-line font-mono text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-14 rounded-3xl border border-zinc-200 p-8 dark:border-zinc-800">
          <blockquote className="text-lg italic leading-8 text-zinc-800 dark:text-zinc-200">
            「以前光是一筆空箱退款要求就要通話 30 分鐘，導入包裝影片後，
            只要用通訊軟體傳一行影片連結就搞定。不當退款也確實減少了。」
          </blockquote>
          <p className="mt-4 text-sm text-zinc-500">— 食品賣家 林姓負責人</p>
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

        <ConversionCTA locale="zh-tw" title="從今天起減輕客訴負擔" />

        <nav aria-label="相關文章" className="mt-14 grid gap-3 sm:grid-cols-2">
          <Link href={localePath("zh-tw", "/vs-cctv")} className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">相關文章</span>
            <p className="mt-1 font-semibold text-black dark:text-white">包裝影片 vs CCTV</p>
          </Link>
          <Link href={localePath("zh-tw", "/guide")} className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">相關文章</span>
            <p className="mt-1 font-semibold text-black dark:text-white">包裝影片導入指南</p>
          </Link>
        </nav>
      </main>
    </>
  );
}
