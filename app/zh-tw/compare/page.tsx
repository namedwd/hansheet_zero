import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "../../site";
import { ImagePlaceholder } from "../../components/Illustrations";
import { JsonLd, buildBreadcrumb, buildArticle } from "../../components/JsonLd";
import { ConversionCTA } from "../../components/ConversionCTA";
import { languageAlternates, localePath } from "../../i18n";

const PATH = "/compare";

export const metadata: Metadata = {
  title: "包裝影片業者比較 - 價格・功能・保存期間一覽整理",
  description:
    "包裝影片服務 4 種類型（Zeropacking + A公司・B公司・C公司）的價格、保存期間、WMS 整合、API、合約條件以一張表完整比較。附事業規模別推薦矩陣。",
  alternates: {
    canonical: localePath("zh-tw", PATH),
    languages: languageAlternates(PATH, ["ko", "ja", "zh-tw"]),
  },
  openGraph: {
    title: "包裝影片業者比較 - 價格・功能一覽",
    description:
      "包裝影片 4 種服務類型比較表 + 事業規模別推薦指南。",
    url: localePath("zh-tw", PATH),
    locale: "zh_TW",
  },
};

type Vendor = {
  id: string;
  name: string;
  badge?: string;
  type: string;
  price: string;
  priceNote: string;
  storage: string;
  quality: string;
  search: string;
  wms: string;
  api: string;
  camera: string;
  contract: string;
  trial: string;
  bestFor: string;
};

const VENDORS: Vendor[] = [
  {
    id: "zeropacking",
    name: "Zeropacking",
    badge: "Hansheet 推薦",
    type: "包裝影片專用 SaaS",
    price: "30,000 韓元",
    priceNote: "每包裝台 / 月（未含營業稅）",
    storage: "3 個月",
    quality: "HD",
    search: "物流單號／追蹤號碼即時查詢（平均 3 秒）",
    wms: "✅ 基本內含",
    api: "✅ REST + Webhook 基本內含",
    camera: "另計（相容 USB 網路攝影機，5～10 萬韓元起）",
    contract: "月繳（無合約綁約）, 年繳享 17% 折扣",
    trial: "15 天免費試用（免綁信用卡）",
    bestFor: "每月出貨 200～5,000 件的賣家，想減輕客訴應對負擔者",
  },
  {
    id: "vendor-a",
    name: "A公司（大型物流 SaaS）",
    type: "WMS・OMS 綜合套裝中的影片模組",
    price: "50,000～80,000 韓元 + α",
    priceNote: "每包裝台 / 月，WMS 主授權另計",
    storage: "1～3 個月（依方案差異）",
    quality: "HD～FHD",
    search: "可依物流單號查詢（系統整合後）",
    wms: "✅ 與自家 WMS 強耦合",
    api: "✅ 提供（以自家 WMS 為優先）",
    camera: "建議另購套裝攝影機",
    contract: "一般 12 個月合約, 另計初期建置費",
    trial: "Demo／PoC 為單位（需業務洽談）",
    bestFor: "每月 1 萬件以上的大型物流營運，需整合導入 WMS・影片・帳務者",
  },
  {
    id: "vendor-b",
    name: "B公司（自行開發型解決方案）",
    type: "地端部署 + 攝影機套裝",
    price: "100,000～150,000 韓元",
    priceNote: "每包裝台 / 月 + 初期安裝費 100 萬韓元起",
    storage: "6 個月（依賴自家 NVR）",
    quality: "FHD",
    search: "DVR 時間軸查詢（物流單號索引部分支援）",
    wms: "△ 需另加購模組",
    api: "△ 有限",
    camera: "必須採購專用 IP 攝影機（每台 30～50 萬韓元）",
    contract: "12～24 個月合約, 安裝費不可退",
    trial: "需另行申請 Demo",
    bestFor: "無法使用外部雲端的資安敏感環境、大型物流中心",
  },
  {
    id: "vendor-c",
    name: "C公司（新創／Beta）",
    type: "初期階段的新服務",
    price: "0 韓元～15,000 韓元",
    priceNote: "每包裝台 / 月（Beta 期間）",
    storage: "1 個月",
    quality: "HD（部分 SD）",
    search: "基本時間區段查詢，物流單號索引部分支援",
    wms: "❌ 不支援（規劃中）",
    api: "❌ 不支援",
    camera: "可運用智慧型手機或 USB 網路攝影機",
    contract: "月繳, Beta 結束後可能調漲",
    trial: "免費 Beta",
    bestFor: "每月出貨 100 件以下的一人賣家，想先輕量導入者",
  },
];

const RECOMMENDATION = [
  {
    profile: "一人賣家（每月 100 件以下）",
    pick: "C公司或 Zeropacking",
    why: "初期可從 C公司 Beta 開始。當客訴開始增加時，建議立即轉移到 Zeropacking。兩項服務皆無綁約，轉換成本低。",
  },
  {
    profile: "成長期賣家（每月 200～5,000 件）",
    pick: "Zeropacking",
    why: "無綁約月繳、WMS・API 基本內含、攝影機自由選擇。此規模是 ROI 回收最快的區間。",
  },
  {
    profile: "大型物流（每月 10,000 件以上）",
    pick: "Zeropacking（多包裝台）或 A公司",
    why: "若已在使用 WMS・OMS，可評估 A公司的整合套裝。若只想快速導入影片，Zeropacking 的多包裝台更單純也更便宜。",
  },
  {
    profile: "資安敏感／政府・大企業供應",
    pick: "B公司（地端部署）",
    why: "在限制使用外部雲端的環境下，像 B公司這樣以自家 NVR 為基礎較為合適。但須承擔初期成本與合約負擔。",
  },
];

const FAQ = [
  {
    q: "為什麼價格會有「+α」或範圍？",
    a: "A公司・B公司的價格會依套裝組合或合約期間有很大差異。本比較是以市場一般資料為基礎的推估範圍，正確報價請直接向各公司業務團隊確認。",
  },
  {
    q: "為什麼推薦 Zeropacking？",
    a: "Hansheet 與 Zeropacking 為同一營運公司，但比較評估是依客觀標準（價格、保存期間、WMS・API 是否基本內含、合約條件）進行。結論是對每月 200～5,000 件規模的賣家而言，成本效益最高。",
  },
  {
    q: "其他公司就沒有更好的地方嗎？",
    a: "有的。A公司在大型物流整合營運上、B公司在資安敏感環境上、C公司在初期免費導入上各有優勢。請參考推薦矩陣，依自身情況做出選擇。",
  },
  {
    q: "比較資料的來源是哪裡？",
    a: "為截至 2026 年 5 月，綜合各公司公開資料、賣家社群評價、電商平台進駐報價資料的市場一般推估值。正確的目前價格仍需直接向各業者確認。",
  },
];

export default function ComparePage() {
  const today = "2026-06-14T00:00:00.000Z";
  return (
    <>
      <JsonLd
        data={buildBreadcrumb(SITE_URL, [
          { name: "首頁", path: "/" },
          { name: "包裝影片比較", path: PATH },
        ])}
      />
      <JsonLd
        data={buildArticle({
          siteUrl: SITE_URL,
          path: PATH,
          headline: "包裝影片業者比較 - 價格・功能・保存期間一覽整理",
          description:
            "比較包裝影片 4 種服務類型的價格・保存・功能・合約的指南。",
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

      <main className="mx-auto w-full max-w-4xl px-6 py-16 sm:px-10 sm:py-24">
        <nav aria-label="目前位置" className="mb-6 text-sm text-zinc-500">
          <Link href={localePath("zh-tw", "/")} className="hover:text-black dark:hover:text-white">首頁</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-700 dark:text-zinc-300">包裝影片比較</span>
        </nav>

        <header className="mb-12">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-zinc-500">
            包裝影片業者比較
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
            包裝影片服務比較
            <br />
            <span className="text-zinc-500">Zeropacking vs A公司・B公司・C公司</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            想導入包裝影片卻不知道該選哪一項服務嗎？
            Hansheet 將市場上具代表性的 4 種包裝影片解決方案類型，以價格、保存期間、
            WMS・API 整合、合約條件等核心項目逐一比較。請找出最適合您事業規模的
            選項。
          </p>
          <p className="mt-3 text-xs text-zinc-500">
            本比較是以截至 2026 年 5 月的市場一般資料為基礎的客觀分析，
            A公司・B公司・C公司為各類別代表的匿名標示。正確的目前價格請直接向各業者
            確認。
          </p>
        </header>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            一覽比較表
          </h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full min-w-[800px] text-sm">
              <thead className="bg-zinc-50 text-left dark:bg-zinc-900">
                <tr>
                  <th className="sticky left-0 bg-zinc-50 px-4 py-3 font-semibold text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                    項目
                  </th>
                  {VENDORS.map((v) => (
                    <th
                      key={v.id}
                      className={`px-4 py-3 font-semibold ${
                        v.badge
                          ? "bg-amber-50 text-black dark:bg-amber-950/30 dark:text-white"
                          : "text-zinc-700 dark:text-zinc-300"
                      }`}
                    >
                      <div className="flex flex-col gap-1">
                        <span>{v.name}</span>
                        {v.badge && (
                          <span className="inline-flex w-fit rounded-full bg-amber-300 px-2 py-0.5 text-[10px] font-bold text-black">
                            {v.badge}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {[
                  { label: "類型", key: "type" as const },
                  { label: "價格", key: "price" as const, secondary: "priceNote" as const },
                  { label: "影片保存期間", key: "storage" as const },
                  { label: "錄影畫質", key: "quality" as const },
                  { label: "影片查詢", key: "search" as const },
                  { label: "WMS・OMS 整合", key: "wms" as const },
                  { label: "API・Webhook", key: "api" as const },
                  { label: "攝影機", key: "camera" as const },
                  { label: "合約・付款", key: "contract" as const },
                  { label: "免費試用", key: "trial" as const },
                ].map((row) => (
                  <tr key={row.label}>
                    <td className="sticky left-0 bg-white px-4 py-3 font-medium text-zinc-900 dark:bg-black dark:text-zinc-100">
                      {row.label}
                    </td>
                    {VENDORS.map((v) => (
                      <td
                        key={v.id}
                        className={`px-4 py-3 align-top ${
                          v.badge
                            ? "bg-amber-50/50 text-zinc-900 dark:bg-amber-950/10 dark:text-zinc-100"
                            : "text-zinc-700 dark:text-zinc-300"
                        }`}
                      >
                        <div className="font-medium">{v[row.key]}</div>
                        {"secondary" in row && row.secondary && (
                          <div className="mt-1 text-xs text-zinc-500">
                            {v[row.secondary]}
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            各解決方案詳細分析
          </h2>
          <ul className="mt-6 space-y-5">
            {VENDORS.map((v) => (
              <li
                key={v.id}
                className={`rounded-2xl border p-6 ${
                  v.badge
                    ? "border-black bg-white shadow-md dark:border-white dark:bg-zinc-950"
                    : "border-zinc-200 dark:border-zinc-800"
                }`}
              >
                <div className="mb-2 flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-bold text-black dark:text-white">{v.name}</h3>
                  {v.badge && (
                    <span className="rounded-full bg-amber-300 px-2 py-0.5 text-[10px] font-bold text-black">
                      {v.badge}
                    </span>
                  )}
                  <span className="text-xs text-zinc-500">{v.type}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                  <strong className="text-black dark:text-white">適合的賣家：</strong>{" "}
                  {v.bestFor}
                </p>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
                  <div>
                    <dt className="text-zinc-500">價格</dt>
                    <dd className="mt-1 font-semibold text-black dark:text-white">{v.price}</dd>
                  </div>
                  <div>
                    <dt className="text-zinc-500">保存</dt>
                    <dd className="mt-1 font-semibold text-black dark:text-white">{v.storage}</dd>
                  </div>
                  <div>
                    <dt className="text-zinc-500">WMS</dt>
                    <dd className="mt-1 font-semibold text-black dark:text-white">{v.wms}</dd>
                  </div>
                  <div>
                    <dt className="text-zinc-500">合約</dt>
                    <dd className="mt-1 font-semibold text-black dark:text-white">{v.contract.split(",")[0]}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            事業規模別推薦矩陣
          </h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 text-left dark:bg-zinc-900">
                <tr>
                  <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">事業樣貌</th>
                  <th className="px-4 py-3 font-semibold text-black dark:text-white">推薦</th>
                  <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">理由</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {RECOMMENDATION.map((r) => (
                  <tr key={r.profile}>
                    <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">{r.profile}</td>
                    <td className="px-4 py-3 font-bold text-black dark:text-white">{r.pick}</td>
                    <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">{r.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-14 rounded-3xl bg-zinc-50 p-8 dark:bg-zinc-950 sm:p-10">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            導入決策時務必確認的 5 件事
          </h2>
          <ol className="mt-6 list-decimal space-y-3 pl-5 text-base leading-7 text-zinc-700 dark:text-zinc-300">
            <li>
              <strong className="text-black dark:text-white">總成本</strong>：別只看月費，
              請把初期安裝費、攝影機費用、WMS 模組加購費全部加總。
            </li>
            <li>
              <strong className="text-black dark:text-white">合約期間</strong>：12 個月綁約的產品
              中途解約困難。月繳在彈性上較有利。
            </li>
            <li>
              <strong className="text-black dark:text-white">影片保存期間</strong>：多數客訴在一個月內
              提出，但換貨、重新出貨、延遲提出的客訴之後仍會發生。監視器（7～30 天覆寫）或保存一個月的服務容易漏接，
              建議確認是否像 Zeropacking 一樣保存 3 個月。
            </li>
            <li>
              <strong className="text-black dark:text-white">查詢方式</strong>：務必確認是否能以
              物流單號直接查詢。若只能依時間區段查詢，實際上與 CCTV 沒有兩樣。
            </li>
            <li>
              <strong className="text-black dark:text-white">免費試用條件</strong>：確認是否能免綁
              信用卡即可開始，以及是否沒有自動轉為付費扣款。
            </li>
          </ol>
        </section>

        <section className="mb-14">
          <figure>
            <ImagePlaceholder
              label="比較資訊圖表或 4 種解決方案的儀表板截圖"
              ratio="16/9"
            />
            <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              比較資訊圖表將陸續新增
            </figcaption>
          </figure>
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

        <ConversionCTA locale="zh-tw" title="比較完成後，就用 Zeropacking 開始吧" />

        <nav aria-label="相關文章" className="mt-14 grid gap-3 sm:grid-cols-2">
          <Link href={localePath("zh-tw", "/vs-cctv")} className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">相關文章</span>
            <p className="mt-1 font-semibold text-black dark:text-white">包裝影片 vs CCTV</p>
          </Link>
          <Link href={localePath("zh-tw", "/cases")} className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">相關文章</span>
            <p className="mt-1 font-semibold text-black dark:text-white">5 件實際導入案例</p>
          </Link>
        </nav>
      </main>
    </>
  );
}
