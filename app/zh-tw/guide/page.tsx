import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SITE_URL } from "../../site";
import { JsonLd, buildBreadcrumb, buildArticle } from "../../components/JsonLd";
import { ConversionCTA } from "../../components/ConversionCTA";
import { languageAlternates, localePath } from "../../i18n";

const PATH = "/guide";

export const metadata: Metadata = {
  title: "包裝影片導入指南 2026 — 從攝影機安裝到日常運作完整整理",
  description:
    "為首次導入包裝影片的賣家準備的 2026 最新分步指南。攝影機安裝位置・角度、包裝台設定、條碼串接、員工教育、客訴應對，到各產業導入要點，全都整理在同一頁。",
  keywords: [
    "包裝影片導入",
    "包裝影片安裝",
    "包裝影片攝影機位置",
    "包裝影片開始",
    "包裝影片自動錄影安裝",
    "包裝台攝影機安裝",
    "宅配包裝影片導入方法",
  ],
  alternates: {
    canonical: localePath("zh-tw", PATH),
    languages: languageAlternates(PATH, ["ko", "ja", "zh-tw"]),
  },
  openGraph: {
    title: "包裝影片導入指南 2026 — 從攝影機安裝到日常運作",
    description:
      "第一次接觸包裝影片，看這一篇就夠了。攝影機位置・角度、條碼串接、員工教育、各產業導入要點。",
    url: localePath("zh-tw", PATH),
    locale: "zh_TW",
  },
};

const STEPS = [
  {
    n: "01",
    t: "檢查包裝台環境",
    body: "確認包裝作業動線是否固定、箱子上方是否能被攝影機清楚拍到。包裝台上方 80~120cm 高度需要有可安裝攝影機的空間。",
    tip: "常見錯誤 — 在經常移動包裝台的環境只固定攝影機，會讓畫面拍不到。請先固定包裝台的位置。",
  },
  {
    n: "02",
    t: "決定攝影機安裝位置",
    body: "將攝影機裝在包裝台正中央的天花板或支架上。為了能看清箱內的內容物，一般會傾斜約 30~45 度。同時請檢查照明，避免產生陰影。",
    tip: "檢查重點 — 若以直角（90 度）裝在天花板上，會看不到箱子內部。30~45 度傾斜 ＋ 攝影機旁加裝輔助照明才是正解。",
  },
  {
    n: "03",
    t: "連接條碼掃描器",
    body: "連接與包裝影片系統相容的 USB 或無線條碼掃描器。只要掃描一次託運單或訂單編號的條碼，包裝影片便會自動開始錄影。",
    tip: "檢查重點 — 無線掃描器在電池沒電時容易造成漏錄。出貨量大的場所建議使用有線 USB 掃描器。",
  },
  {
    n: "04",
    t: "WMS・OMS 串接（選用）",
    body: "若您正在使用 Shopify・Cyberbiz 等電商系統或自建 WMS，可透過 API 串接自動比對託運單。不串接也能使用，但串接後運作效率會大幅提升。",
    tip: "參考 — 串接方式請參閱另行整理的包裝影片 API・WMS 串接指南。Shopify・Cyberbiz 等電商系統皆以標準 API 支援。",
  },
  {
    n: "05",
    t: "員工教育（10 分鐘就夠）",
    body: "原本的包裝作業流程維持不變，只要多加一個「再掃一次條碼」的動作即可。透過畫面回應與 LED 訊號，任何人都能確認錄影狀態，幾乎沒有學習負擔。",
    tip: "常見錯誤 — 省略驗貨（確認數量・顏色）的畫面，會在發生爭議時削弱證據力。請養成「把商品在攝影機前展示一次再裝箱」的習慣。",
  },
  {
    n: "06",
    t: "測試出貨 5 筆",
    body: "實際測試 5 筆出貨，確認包裝影片是否與託運單正確比對、畫質・角度是否合適。必要時微調攝影機位置。",
    tip: "檢查重點 — 請務必確認託運單上的文字在影片中是否清晰可讀。若無法辨識託運單，搜尋與舉證能力都會下降。",
  },
  {
    n: "07",
    t: "建立客訴應對標準",
    body: "把客戶發生客訴時的「搜尋託運單 → 複製影片連結 → 傳送通訊軟體／簡訊」流程做成公司內部手冊。應對時間可從平均 30 分鐘縮短到 1 分鐘以內。",
    tip: "參考 — 各類型的應對話術已整理在宅配客訴解決指南中，可直接複製使用。",
  },
  {
    n: "08",
    t: "監測運作數據",
    body: "量測每月客訴件數與退款成本，將包裝影片導入前後的成效量化。大多數賣家在 1~2 個月內就能確認 ROI。",
    tip: "檢查重點 — 先記錄導入前 1 個月的客訴數據，導入後就能精準比較成效。",
  },
];

// 導入前準備物品檢查清單
const PREP = [
  { item: "包裝台電腦（可沿用現有設備）", note: "不需另設伺服器，只需安裝用戶端" },
  { item: "攝影機（USB 網路攝影機或 IP 攝影機）", note: "從數千韓元等級的 USB 網路攝影機起即相容" },
  { item: "攝影機支架或天花板吊架", note: "固定於包裝台上方 80~120cm" },
  { item: "條碼掃描器", note: "建議使用有線 USB（無線需管理電池）" },
  { item: "輔助照明（選用）", note: "若是低照度倉庫，請裝在攝影機旁" },
  { item: "網路連線", note: "用於雲端上傳，一般網路即足夠" },
];

// 各產業導入要點
const INDUSTRIES = [
  {
    name: "食品・生鮮",
    point: "保存期限・新鮮度的客訴頻繁，請優先檢查攝影機畫質與照明，讓商品標籤與包裝狀態都清晰可見。",
  },
  {
    name: "服飾・時尚",
    point: "尺寸・顏色的爭議多，驗貨環節是關鍵。請將商品攤開、讓顏色・尺寸吊牌可見後再裝箱的流程標準化。",
  },
  {
    name: "美妝・保養",
    point: "贈品・試用品缺件的客訴頻繁。請務必把正品與試用品都在攝影機前確認的畫面納入影片。",
  },
  {
    name: "電子產品・高價品",
    point: "客單價高，一筆客訴的損失就很大。在包裝前把電源・運作測試的畫面拍進影片，就能清楚區分是瑕疵或使用者責任。",
  },
];

const FAQ = [
  {
    q: "導入包裝影片要幾天？",
    a: "從攝影機安裝到正常運作，平均一天就夠了。即使包含 WMS 串接，3~5 天也能完成。",
  },
  {
    q: "為了包裝影片需要另外準備一台電腦嗎？",
    a: "只要在現有的包裝台電腦上安裝用戶端即可，不需另設伺服器或電腦，影片處理・儲存全都在雲端完成。",
  },
  {
    q: "照明不足的倉庫也能拍好包裝影片嗎？",
    a: "可以。我們提供在低照度環境也能辨識的攝影機選項。不過仍建議照明達到能清楚看見託運單文字的程度。",
  },
  {
    q: "應該買哪種攝影機？",
    a: "個人・小型賣家用數千韓元等級的 USB 網路攝影機就足夠。若有 3 個以上的包裝台，建議使用 FHD 工業級攝影機或 PoE IP 攝影機。各規模場所的攝影機選擇基準，已詳細整理在包裝影片攝影機推薦文章中。",
  },
  {
    q: "攝影機要裝在什麼高度・角度？",
    a: "一般會裝在包裝台上方 80~120cm 高度、從正中央傾斜 30~45 度。能讓箱內內容物與託運單標籤同時出現在一個畫面的角度最理想。",
  },
  {
    q: "包裝影片會保存多久？",
    a: "預設在雲端保存 3 個月。宅配客訴約有 90% 發生在出貨後 30 天內，因此 3 個月大多能涵蓋。保存期間的選擇基準，請參考包裝影片保存期間文章。",
  },
  {
    q: "就算員工換人，運作上也沒問題嗎？",
    a: "包裝影片是只多加「掃描一次條碼」的架構，新進員工 5~10 分鐘就能上手。畫面・LED 會顯示錄影狀態，任何人都能確認是否正常運作。",
  },
  {
    q: "已經有監視器（CCTV）了，還需要包裝影片嗎？",
    a: "CCTV 只能依時間區段搜尋，但包裝影片能以物流單號即時搜尋。兩套系統的差異，已在包裝影片 vs CCTV 比較文章中以 8 個項目整理。",
  },
  {
    q: "有多個包裝台，全部都要安裝嗎？",
    a: "包裝影片是每個包裝台 1 台攝影機 ＋ 每月 30,000 韓元的架構。也可以先從客訴集中的包裝台優先導入，再分階段擴大。",
  },
  {
    q: "導入成本相比成效真的划算嗎？",
    a: "包裝影片一個月的費用（30,000 韓元）只要減少 1 筆不當退款就能回本。以每月 1,000 筆出貨為基準的實際節省金額模擬，可在客訴成本模擬文章中查看。",
  },
];

export default function GuidePage() {
  const today = new Date().toISOString();
  return (
    <>
      <JsonLd
        data={buildBreadcrumb(SITE_URL, [
          { name: "首頁", path: "/" },
          { name: "包裝影片導入指南", path: PATH },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "包裝影片導入指南",
          description:
            "為首次導入包裝影片的賣家準備的 8 步驟指南。從攝影機安裝到運作監測。",
          step: STEPS.map((s, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            name: s.t,
            text: s.body,
          })),
        }}
      />
      <JsonLd
        data={buildArticle({
          siteUrl: SITE_URL,
          path: PATH,
          headline: "包裝影片導入指南 — 從開始到日常運作",
          description:
            "包裝影片導入的 8 步驟檢查清單。攝影機位置、條碼串接、員工教育，到客訴應對標準化。",
          datePublished: today,
          dateModified: today,
        })}
      />

      <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-10 sm:py-24">
        <nav aria-label="目前位置" className="mb-6 text-sm text-zinc-500">
          <Link href={localePath("zh-tw", "/")} className="hover:text-black dark:hover:text-white">首頁</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-700 dark:text-zinc-300">包裝影片導入指南</span>
        </nav>

        <header className="mb-12">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-zinc-500">
            指南 · 2026 最新版 · 8 步驟
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
            包裝影片導入指南
            <br />
            <span className="text-zinc-500">從攝影機安裝到日常運作一次搞定</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            這是為首次導入包裝影片的賣家準備的 2026 最新分步指南。
            從導入前的準備物品、攝影機安裝位置・角度、包裝台設定、條碼串接、
            員工教育、客訴應對，到各產業導入要點，全都完整整理。
            只要從頭跟著做，就能在一天內開始運作包裝影片。
          </p>
        </header>

        <section className="mb-12">
          <figure>
            <Image
              src="/packing-video-hero.webp"
              alt="包裝台攝影機正在拍攝宅配商品包裝過程的示意圖"
              width={1672}
              height={941}
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="h-auto w-full rounded-2xl border border-zinc-200 dark:border-zinc-800"
            />
            <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              示意圖 — 呈現掃描條碼的同時包裝影片便開始錄影的情景。
            </figcaption>
          </figure>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            導入前準備物品檢查清單
          </h2>
          <p className="mt-3 text-base leading-7 text-zinc-700 dark:text-zinc-300">
            這是導入包裝影片所需的準備物品。大多可沿用既有設備，
            額外成本負擔很小。
          </p>
          <ul className="mt-6 divide-y divide-zinc-200 dark:divide-zinc-800">
            {PREP.map((p) => (
              <li key={p.item} className="flex items-start gap-3 py-4">
                <span className="mt-0.5 flex-none text-emerald-500">✓</span>
                <div>
                  <p className="font-medium text-black dark:text-zinc-50">{p.item}</p>
                  <p className="mt-0.5 text-sm text-zinc-500">{p.note}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
            若還在煩惱攝影機怎麼選，可在包裝影片攝影機推薦指南中，
            查看各規模場所的推薦機型。
          </p>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            8 步驟導入檢查清單
          </h2>
          <ol className="mt-8 space-y-6">
            {STEPS.map((s) => (
              <li key={s.n} className="flex gap-5 border-l-2 border-zinc-200 pl-5 dark:border-zinc-800">
                <span className="flex-none font-mono text-sm font-bold text-zinc-400">
                  {s.n}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-black dark:text-zinc-50">
                    {s.t}
                  </h3>
                  <p className="mt-2 text-base leading-7 text-zinc-700 dark:text-zinc-300">
                    {s.body}
                  </p>
                  <p className="mt-2 rounded-lg bg-zinc-50 px-3 py-2 text-sm leading-6 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
                    💡 {s.tip}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            各產業導入要點
          </h2>
          <p className="mt-3 text-base leading-7 text-zinc-700 dark:text-zinc-300">
            就算是同樣的包裝影片，依產業不同需要留意的地方也不一樣。請確認
            符合您場所類別的要點。
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {INDUSTRIES.map((ind) => (
              <li key={ind.name} className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
                <h3 className="text-base font-semibold text-black dark:text-zinc-50">{ind.name}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{ind.point}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-14 rounded-3xl bg-zinc-50 p-8 dark:bg-zinc-950 sm:p-10">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            導入成效 — 以一般賣家為基準
          </h2>
          <dl className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <dt className="text-sm font-medium text-zinc-500">客訴應對時間</dt>
              <dd className="mt-2 text-3xl font-bold text-black dark:text-white">−95%</dd>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">30 分鐘 → 1 分鐘以內</p>
            </div>
            <div>
              <dt className="text-sm font-medium text-zinc-500">不當退款</dt>
              <dd className="mt-2 text-3xl font-bold text-black dark:text-white">−30%</dd>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">以證據影片結案</p>
            </div>
            <div>
              <dt className="text-sm font-medium text-zinc-500">ROI 回收</dt>
              <dd className="mt-2 text-3xl font-bold text-black dark:text-white">1~2 個月</dd>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">以多數賣家為基準</p>
            </div>
          </dl>
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

        <ConversionCTA locale="zh-tw" title="看完指南，今天就能立刻開始" />

        <nav aria-label="相關文章" className="mt-14 grid gap-3 sm:grid-cols-2">
          <Link href={localePath("zh-tw", "/api")} className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">下一篇</span>
            <p className="mt-1 font-semibold text-black dark:text-white">包裝影片 API・WMS 串接</p>
          </Link>
          <Link href={localePath("zh-tw", "/vs-cctv")} className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">相關文章</span>
            <p className="mt-1 font-semibold text-black dark:text-white">包裝影片 vs CCTV</p>
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
