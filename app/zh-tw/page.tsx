import type { Metadata } from "next";
import { SITE_URL } from "../site";
import { StepIllustration, ImagePlaceholder } from "../components/Illustrations";
import { ConversionCTA } from "../components/ConversionCTA";
import { languageAlternates, localePath } from "../i18n";

export const metadata: Metadata = {
  title: {
    absolute: "Hansheet — 用包裝影片自動錄影，一次解決宅配客訴",
  },
  description:
    "包裝影片是商品出貨當下的包裝過程錄影。Hansheet 推薦的 Zeropacking 會自動錄製每一支包裝影片，並依物流單號即時搜尋、雲端保存，讓破損、寄錯、缺件等客訴用一支影片就能解決。",
  alternates: {
    canonical: localePath("zh-tw", "/"),
    languages: languageAlternates("/", ["ko", "en", "ja", "zh-tw", "vi"]),
  },
  openGraph: {
    title: "包裝影片自動錄影服務 — 一次解決客訴爭議 | Zeropacking",
    description:
      "宅配包裝影片自動錄影、雲端保存。依物流單號即時搜尋，快速結案客訴。",
    url: localePath("zh-tw", "/"),
    type: "website",
    locale: "zh_TW",
  },
};

const FAQ = [
  {
    q: "什麼是包裝影片？",
    a: "包裝影片是指電商／宅配商品在出貨前的包裝過程錄影。它完整記錄了哪一項商品以什麼狀態裝箱、直到貼上託運單的瞬間，因此當客戶提出客訴時，可作為客觀的證據。",
  },
  {
    q: "為什麼一定要自動錄製包裝影片？",
    a: "人工錄影容易漏拍，且要把影片檔與物流單號一一對應保存也很費力。自動包裝影片服務只要掃描一次條碼即可開始與結束錄影，並以物流單號自動建立索引，平均 3 秒就能找到該筆影片。",
  },
  {
    q: "包裝影片會保存多久？",
    a: "預設於雲端安全保存 3 個月。若需要更長的保存期間可另行洽詢，影片以 HD 畫質儲存。",
  },
  {
    q: "包裝影片可以解決哪些客訴？",
    a: "商品缺件、寄錯、破損、尺寸或顏色不符、主張「收到空箱」等，幾乎所有宅配爭議都能應對。將包裝影片連結分享給客戶，多數客訴可立即結案。",
  },
  {
    q: "可以與現有的 WMS／OMS 串接嗎？",
    a: "可以。Zeropacking 的包裝影片提供標準 API 與條碼介面，可與各類電商系統或自建 WMS 串接。",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: "Hansheet",
      alternateName: ["한시트", "ハンシート", "Zeropacking"],
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      description:
        "為以包裝影片減少宅配客訴的賣家而設的指南網站。介紹營運方 Zeropacking 的包裝影片自動錄影服務。",
      contactPoint: {
        "@type": "ContactPoint",
        email: "contact@zeropacking.com",
        contactType: "customer service",
        availableLanguage: ["Chinese", "Korean", "English", "Japanese"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      url: SITE_URL,
      name: "Hansheet",
      inLanguage: "zh-TW",
      publisher: { "@id": `${SITE_URL}#organization` },
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}#service-zhtw`,
      serviceType: "包裝影片自動錄影與雲端保存服務",
      name: "Zeropacking 包裝影片",
      provider: { "@id": `${SITE_URL}#organization` },
      url: "https://www.zeropacking.com/zh-tw",
      description:
        "自動錄製包裝影片並保存於雲端，可依物流單號即時搜尋。為解決宅配客訴與爭議而生的影片證據解決方案。",
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/zh-tw#faq`,
      mainEntity: FAQ.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export default function HomeZhTw() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">
        <main className="mx-auto w-full max-w-3xl flex-1 bg-white px-6 py-16 dark:bg-black sm:px-10 sm:py-24">
          <header className="mb-14">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-zinc-500">
              Hansheet · 包裝影片指南
            </p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
              用包裝影片自動錄影
              <br />
              一次解決宅配客訴
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              包裝影片是完整記錄商品出貨當下包裝過程的影片。Hansheet 推薦的
              Zeropacking 會自動錄製所有包裝影片並安全保存於雲端，只要輸入物流
              單號，就能立即調出對應的包裝影片。別再為破損、寄錯、缺件的爭議
              耗費時間了。
            </p>

            <figure className="mt-8 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
              <ImagePlaceholder
                label="包裝台攝影機 → 雲端 → 依物流單號搜尋"
                ratio="16/9"
              />
              <figcaption className="border-t border-zinc-200 bg-white px-4 py-3 text-xs text-zinc-600 dark:border-zinc-800 dark:bg-black dark:text-zinc-400">
                包裝台上方的攝影機自動錄製每一支包裝影片並保存於雲端，可依
                物流單號搜尋的運作示意圖。
              </figcaption>
            </figure>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://www.zeropacking.com/zh-tw"
                target="_blank"
                rel="noopener"
                className="flex h-12 items-center justify-center rounded-full bg-black px-7 text-base font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                免費試用
              </a>
              <a
                href="https://www.zeropacking.com/zh-tw"
                target="_blank"
                rel="noopener"
                className="flex h-12 items-center justify-center rounded-full border border-zinc-200 px-7 text-base font-medium text-black transition-colors hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:text-white dark:hover:bg-zinc-900"
              >
                了解運作方式
              </a>
            </div>
          </header>

          <section className="mb-16 border-t border-zinc-200 pt-12 dark:border-zinc-800">
            <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
              什麼是包裝影片？
            </h2>
            <div className="mt-5 space-y-4 text-base leading-7 text-zinc-700 dark:text-zinc-300">
              <p>
                包裝影片是指電商／宅配賣家把商品裝箱、貼上託運單這一連串包裝
                過程的錄影。與一般監視器（CCTV）不同，包裝影片會與物流單號
                一對一綁定保存，因此一旦發生爭議，就能立即找出該筆訂單的影片。
              </p>
              <p>
                「收到的箱子是空的」「寄來的是別的商品」「商品破損」這類客訴，
                是賣家最大的成本之一。包裝影片能針對上述每一種主張，提供出貨
                當下的客觀證據。
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
              為什麼要自動錄製包裝影片？
            </h2>
            <ul className="mt-6 space-y-5">
              <li className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
                <h3 className="text-lg font-semibold text-black dark:text-zinc-50">
                  客訴處理時間縮短 90%
                </h3>
                <p className="mt-2 text-base leading-7 text-zinc-700 dark:text-zinc-300">
                  只要把可依物流單號搜尋的包裝影片連結傳給客戶，多數客訴便能
                  立即結案。
                </p>
              </li>
              <li className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
                <h3 className="text-lg font-semibold text-black dark:text-zinc-50">
                  人會忘記，影片不會
                </h3>
                <p className="mt-2 text-base leading-7 text-zinc-700 dark:text-zinc-300">
                  只要掃描一次條碼，包裝影片就會自動開始與結束，即使在最忙碌的
                  出貨時段也不會漏拍。
                </p>
              </li>
              <li className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
                <h3 className="text-lg font-semibold text-black dark:text-zinc-50">
                  監視器找不到的影片，3 秒就能搜到
                </h3>
                <p className="mt-2 text-base leading-7 text-zinc-700 dark:text-zinc-300">
                  監視器只能用時間區間搜尋，而 Zeropacking 包裝影片以物流單號
                  建立索引，平均 3 秒就能找出該筆訂單的影片。
                </p>
              </li>
              <li className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
                <h3 className="text-lg font-semibold text-black dark:text-zinc-50">
                  降低退貨・退款成本
                </h3>
                <p className="mt-2 text-base leading-7 text-zinc-700 dark:text-zinc-300">
                  導入包裝影片的賣家回報，因不當客訴造成的退貨・退款成本平均
                  降低了 30% 以上。
                </p>
              </li>
            </ul>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
              包裝影片自動錄影，這樣運作
            </h2>
            <ol className="mt-6 grid gap-5 sm:grid-cols-2">
              {[
                {
                  n: 1 as const,
                  title: "掃描條碼開始錄影",
                  desc: "出貨前掃描託運單或訂單條碼，包裝影片便會自動開始錄製。",
                },
                {
                  n: 2 as const,
                  title: "以 HD 畫質錄下包裝過程",
                  desc: "商品驗貨、裝箱、貼託運單的整個過程都會以 HD 畫質的包裝影片記錄下來。",
                },
                {
                  n: 3 as const,
                  title: "依物流單號自動建立雲端索引",
                  desc: "完成的包裝影片會連同物流單號保存於雲端，任何人都能立即搜尋與分享。",
                },
                {
                  n: 4 as const,
                  title: "客訴發生時只要傳一條影片連結",
                  desc: "發生爭議時，只要把該物流單號的包裝影片連結傳出去，多數客訴即可結案。",
                },
              ].map((s) => (
                <li
                  key={s.n}
                  className="flex flex-col gap-3 rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-black text-sm font-semibold text-white dark:bg-white dark:text-black">
                      {s.n}
                    </span>
                    <h3 className="text-base font-semibold text-black dark:text-zinc-50">
                      {s.title}
                    </h3>
                  </div>
                  <div className="h-32 rounded-lg bg-zinc-50 p-3 dark:bg-zinc-950">
                    <StepIllustration step={s.n} />
                  </div>
                  <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                    {s.desc}
                  </p>
                </li>
              ))}
            </ol>

            <figure className="mt-10">
              <ImagePlaceholder
                label="包裝影片搜尋畫面示意（建議 1200×750）"
                ratio="16/10"
              />
              <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                示意畫面 — 輸入物流單號後，對應的包裝影片即會立即播放。
              </figcaption>
            </figure>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
              包裝影片常見問題
            </h2>
            <div className="mt-6 divide-y divide-zinc-200 dark:divide-zinc-800">
              {FAQ.map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-black dark:text-zinc-50">
                    {item.q}
                    <span className="text-zinc-400 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-base leading-7 text-zinc-700 dark:text-zinc-300">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          <ConversionCTA locale="zh-tw" title="立即開始使用包裝影片" />
        </main>
      </div>
    </>
  );
}
