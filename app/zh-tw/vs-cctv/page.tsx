import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "../../site";
import { ComparisonChart, ImagePlaceholder } from "../../components/Illustrations";
import { JsonLd, buildBreadcrumb, buildArticle } from "../../components/JsonLd";
import { ConversionCTA } from "../../components/ConversionCTA";
import { languageAlternates, localePath } from "../../i18n";

const PATH = "/vs-cctv";

export const metadata: Metadata = {
  title: "包裝影片 vs CCTV － 兩者究竟差在哪裡？",
  description:
    "一次看懂包裝影片與一般賣場 CCTV（監視器）的差異。從物流單號檢索、影片保存政策、客訴處理時間到成本各方面，了解兩者究竟有何不同。",
  alternates: {
    canonical: localePath("zh-tw", PATH),
    languages: languageAlternates(PATH, ["ko", "ja", "zh-tw"]),
  },
  openGraph: {
    title: "包裝影片 vs CCTV 比較指南",
    description:
      "想解決宅配客訴，只靠 CCTV 就夠了嗎？本文整理了包裝影片與 CCTV 在檢索時間、保存方式與舉證能力上的差異。",
    url: localePath("zh-tw", PATH),
    locale: "zh_TW",
  },
};

const TABLE = [
  {
    item: "檢索方式",
    cctv: "推估拍攝時段後自行拖曳尋找",
    pv: "以物流單號 1:1 即時檢索",
  },
  {
    item: "找到該段影片所需時間",
    cctv: "平均 30 分鐘 ～ 數小時",
    pv: "平均 3 秒",
  },
  {
    item: "影片索引",
    cctv: "僅有時間軸（無中繼資料）",
    pv: "依物流單號・訂單編號・日期自動建立索引",
  },
  {
    item: "客訴回應",
    cctv: "需自行剪輯影片傳送，耗時甚多",
    pv: "一條分享連結即時送出",
  },
  {
    item: "保存政策",
    cctv: "通常 7～30 天自動覆寫",
    pv: "以訂單為單位雲端保存 90 天以上",
  },
  {
    item: "遠端存取",
    cctv: "依賴 DVR/NVR，故障時影片遺失",
    pv: "雲端為基礎，隨時隨地即時調閱",
  },
  {
    item: "初期成本",
    cctv: "數百萬韓元（DVR ＋ 大容量硬碟 ＋ 施工）",
    pv: "0 韓元（每個包裝台每月 30,000 韓元）",
  },
  {
    item: "法律舉證能力",
    cctv: "時間點與關聯性難以證明",
    pv: "與物流單號 1:1 對應，舉證明確",
  },
];

const FAQ = [
  {
    q: "已經有 CCTV 了，還需要包裝影片嗎？",
    a: "CCTV 對於保全與防盜很有效，但要快速找到特定訂單的包裝過程卻很困難。包裝影片可透過物流單號即時檢索，因此客訴處理速度遠非 CCTV 可比。兩套系統目的不同，對於客訴成本較高的賣家而言，包裝影片是另外必要的工具。",
  },
  {
    q: "能讓 CCTV 影片也能用物流單號檢索嗎？",
    a: "技術上相當困難。一般 CCTV 是以時間為基礎錄影，並不具備以訂單為單位的中繼資料。包裝影片從一開始就與條碼掃描連動，設計成讓訂單與影片 1:1 綁定。",
  },
  {
    q: "包裝影片難道不會比 CCTV 更貴嗎？",
    a: "比較初期成本，包裝影片反而便宜許多。CCTV 光是 DVR・硬碟・施工費就要數百萬韓元，而包裝影片以單一包裝台計算為每月 30,000 韓元，且沒有額外的初期費用。大多數賣家只要少一件客訴，一個月的費用就能回收。",
  },
];

export default function VsCCTVPage() {
  const today = new Date().toISOString();
  return (
    <>
      <JsonLd
        data={buildBreadcrumb(SITE_URL, [
          { name: "首頁", path: localePath("zh-tw", "/") },
          { name: "包裝影片 vs CCTV", path: localePath("zh-tw", PATH) },
        ])}
      />
      <JsonLd
        data={buildArticle({
          siteUrl: SITE_URL,
          path: localePath("zh-tw", PATH),
          headline: "包裝影片 vs CCTV － 兩者究竟差在哪裡？",
          description:
            "從檢索時間、保存政策到成本等 8 個項目，比較包裝影片與一般 CCTV 差異的指南。",
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
          <span className="text-zinc-700 dark:text-zinc-300">包裝影片 vs CCTV</span>
        </nav>

        <header className="mb-12">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
            包裝影片 vs CCTV
            <br />
            <span className="text-zinc-500">兩者究竟差在哪裡？</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            您是否覺得既然有了 CCTV，就不需要包裝影片？這兩套系統的目的與結構
            完全不同。本文將包裝影片與 CCTV 的差異整理成 8 個項目，幫助您判斷
            自家營運場所究竟需要哪一種解決方案。
          </p>
        </header>

        <section className="mb-14">
          <figure className="overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
            <ComparisonChart className="h-auto w-full" />
            <figcaption className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
              Zeropacking 自行量測之平均值。實際數值可能因環境而異。
            </figcaption>
          </figure>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            一次看懂 8 大差異
          </h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 text-left dark:bg-zinc-900">
                <tr>
                  <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">項目</th>
                  <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">一般 CCTV</th>
                  <th className="px-4 py-3 font-semibold text-black dark:text-white">包裝影片（Zeropacking）</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {TABLE.map((row) => (
                  <tr key={row.item}>
                    <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">{row.item}</td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{row.cctv}</td>
                    <td className="px-4 py-3 text-zinc-900 dark:text-zinc-100">{row.pv}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            為什麼光靠 CCTV 還不夠
          </h2>
          <div className="mt-5 space-y-4 text-base leading-7 text-zinc-700 dark:text-zinc-300">
            <p>
              CCTV 的核心限制在於沒有「以訂單為單位的索引」。當某位客戶
              提出「收到的箱子是空的」這類客訴時，若要用 CCTV 處理，就必須
              經過以下步驟。
            </p>
            <ol className="list-decimal space-y-2 pl-6">
              <li>以物流單號推估出貨日期與時間。</li>
              <li>找出該時段的 CCTV 錄影檔。</li>
              <li>在該時段的影片中，親自用眼睛找出「這個箱子」。</li>
              <li>只把該段區間剪輯轉成影片。</li>
              <li>傳送給客戶。</li>
            </ol>
            <p>
              每一件平均要耗費 30 分鐘以上。如果一天有 5 件客訴，每週 5 天×30 分鐘
              ≈ 就有 12 小時憑空消失。包裝影片把這整個流程縮短為：輸入物流單號 → 複製影片
              連結 → 傳送（約 30 秒）。
            </p>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            適合導入包裝影片的營運場所
          </h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              { t: "每月出貨 500 件以上", d: "客訴累積後成本負擔沉重的賣家" },
              { t: "進駐開放平台的賣家", d: "蝦皮・momo・PChome 糾紛頻繁" },
              { t: "經手高價商品", d: "電子產品・化妝品・食品等破損糾紛頻繁" },
              { t: "多人包裝環境", d: "包裝人員多人時需追蹤責任歸屬" },
            ].map((item) => (
              <li key={item.t} className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
                <h3 className="text-base font-semibold text-black dark:text-zinc-50">{item.t}</h3>
                <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{item.d}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-14">
          <figure>
            <ImagePlaceholder
              label="實際包裝影片檢索畫面 vs CCTV 時間軸畫面比較"
              ratio="16/9"
            />
            <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              （實拍比較截圖即將補上）
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

        <ConversionCTA locale="zh-tw" title="如果 CCTV 不夠用，就從包裝影片開始吧" />

        <nav aria-label="相關文章" className="mt-14 grid gap-3 sm:grid-cols-2">
          <Link href={localePath("zh-tw", "/guide")} className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">下一篇</span>
            <p className="mt-1 font-semibold text-black dark:text-white">包裝影片導入指南</p>
          </Link>
          <Link href={localePath("zh-tw", "/claim")} className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">相關文章</span>
            <p className="mt-1 font-semibold text-black dark:text-white">宅配客訴解決方法</p>
          </Link>
        </nav>
      </main>
    </>
  );
}
