import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "../../site";
import { ImagePlaceholder } from "../../components/Illustrations";
import { JsonLd, buildBreadcrumb } from "../../components/JsonLd";
import { ConversionCTA } from "../../components/ConversionCTA";
import { languageAlternates, localePath } from "../../i18n";

const PATH = "/cases";

export const metadata: Metadata = {
  title: "包裝影片導入案例 - 5 家賣家的實際成效數據",
  description:
    "食品、服飾、美妝、電子產品、書籍 5 家賣家的包裝影片導入案例。以量化數據整理導入前後的客訴件數、退款成本與處理時間變化。",
  alternates: {
    canonical: localePath("zh-tw", PATH),
    languages: languageAlternates(PATH, ["ko", "ja", "zh-tw"]),
  },
  openGraph: {
    title: "包裝影片導入案例 - 5 家賣家的實際成效",
    description:
      "5 個品類賣家的包裝影片導入前後比較。客訴下降率、ROI 回收期間、營運變化。",
    url: localePath("zh-tw", PATH),
    locale: "zh_TW",
  },
};

type Case = {
  id: string;
  category: string;
  scale: string;
  bizType: string;
  beforeQuote: string;
  afterQuote: string;
  metrics: { label: string; before: string; after: string; delta: string }[];
  takeaway: string;
};

const CASES: Case[] = [
  {
    id: "food",
    category: "食品賣家",
    scale: "每月出貨 1,500 件",
    bizType: "Naver 智慧商店 + 自家官網",
    beforeQuote:
      "保存期限、新鮮度的客訴很多，但因為沒有資料能證明出貨當下的狀態，每次都只能直接退款。一個月損失將近 50 萬韓元。",
    afterQuote:
      "用包裝影片證明出貨當下商品狀態正常後，不合理的退款要求幾乎消失了。第一個月就把成本回收回來。",
    metrics: [
      { label: "每月客訴件數", before: "32 件", after: "11 件", delta: "−66%" },
      { label: "退款、重寄成本", before: "每月 50 萬韓元", after: "每月 14 萬韓元", delta: "−72%" },
      { label: "平均處理時間", before: "每件 25 分鐘", after: "每件 2 分鐘", delta: "−92%" },
      { label: "ROI 回收期間", before: "—", after: "23 天", delta: "不到 1 個月" },
    ],
    takeaway:
      "生鮮、食品品類的客訴頻率與單價都高，是包裝影片 ROI 最快顯現的領域。",
  },
  {
    id: "fashion",
    category: "服飾、時尚賣家",
    scale: "每月出貨 4,000 件",
    bizType: "Coupang + 自家官網 + MUSINSA",
    beforeQuote:
      "說尺寸、顏色寄錯了的客訴真的非常多。一旦進入消費爭議調處，大多是賣家敗訴，每月損失超過 100 萬韓元。",
    afterQuote:
      "驗貨階段都拍進影片裡，「訂購的尺寸是正確的」這點在爭議調處時當場就被認可。爭議調處的提交本身就減少了 80%。",
    metrics: [
      { label: "每月爭議調處提交", before: "12 件", after: "2 件", delta: "−83%" },
      { label: "爭議敗訴損失", before: "每月 100 萬韓元", after: "每月 15 萬韓元", delta: "−85%" },
      { label: "包裝人員離職率", before: "每季 30%", after: "每季 10%", delta: "處理壓力下降" },
      { label: "ROI 回收期間", before: "—", after: "11 天", delta: "不到 1 週" },
    ],
    takeaway:
      "服飾的尺寸、顏色爭議壓倒性地多，是「驗貨影片」價值最大的品類。",
  },
  {
    id: "cosmetic",
    category: "美妝賣家",
    scale: "每月出貨 2,200 件",
    bizType: "Naver 智慧商店 + Olive Young 專櫃進駐",
    beforeQuote:
      "樣品、贈品組合缺件的客訴每週湧入 5～6 件。光靠照片無法證明，只能一律重寄。",
    afterQuote:
      "把樣品放進箱子的畫面清楚拍進影片後，缺件客訴消失了 90%。不合理的客訴嘗試本身就停止了。",
    metrics: [
      { label: "每月缺件客訴", before: "26 件", after: "3 件", delta: "−88%" },
      { label: "樣品重寄成本", before: "每月 39 萬韓元", after: "每月 4.5 萬韓元", delta: "−88%" },
      { label: "處理時間", before: "每件 18 分鐘", after: "每件 1 分鐘", delta: "−94%" },
      { label: "ROI 回收期間", before: "—", after: "16 天", delta: "不到 1 個月" },
    ],
    takeaway:
      "美妝、保養品的樣品、贈品多，「是否包含在內」的爭議頻繁，影片在此發揮決定性作用。",
  },
  {
    id: "electronics",
    category: "電子產品賣家",
    scale: "每月出貨 800 件（客單價 12 萬韓元）",
    bizType: "Coupang + 11st + 自家官網",
    beforeQuote:
      "因為是高價商品，每一件破損、瑕疵客訴的損失都很大。「一收到就無法開機」的客訴，根本分不清是真的瑕疵還是不合理的退款嘗試。",
    afterQuote:
      "在包裝前把通電測試的畫面拍進影片後，真正瑕疵與使用者責任的區分變得很清楚。不合理的退款幾乎是 0 件。",
    metrics: [
      { label: "每月疑似不合理退款", before: "7 件", after: "0～1 件", delta: "−85%" },
      { label: "每件平均損失", before: "12 萬韓元", after: "—", delta: "—" },
      { label: "每月節省金額", before: "—", after: "約 80 萬韓元", delta: "—" },
      { label: "ROI 回收期間", before: "—", after: "1 天", delta: "導入即見效" },
    ],
    takeaway:
      "高價品類每件客訴的損失大，是包裝影片 ROI 最極端龐大的領域。",
  },
  {
    id: "books",
    category: "書籍、教材賣家",
    scale: "每月出貨 3,500 件",
    bizType: "Naver 智慧商店 + Aladin 進駐",
    beforeQuote:
      "客單價低但客訴頻率高，處理時間是最大的成本。一名員工整天都只在處理客訴。",
    afterQuote:
      "一行影片連結就能結束客訴處理，於是能把客服人力調配到其他業務。每月人事成本節省很可觀。",
    metrics: [
      { label: "每月處理總時數", before: "120 小時", after: "12 小時", delta: "−90%" },
      { label: "換算人事成本", before: "每月 144 萬韓元", after: "每月 14 萬韓元", delta: "−90%" },
      { label: "顧客滿意度（自家問卷）", before: "3.2/5", after: "4.5/5", delta: "回應速度提升" },
      { label: "ROI 回收期間", before: "—", after: "9 天", delta: "不到 10 天" },
    ],
    takeaway:
      "客服人事成本佔比大的事業，透過包裝影片在「人力效率」上改善最為顯著。",
  },
];

export default function CasesPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumb(SITE_URL, [
          { name: "首頁", path: localePath("zh-tw", "/") },
          { name: "導入案例", path: localePath("zh-tw", PATH) },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "包裝影片導入案例 — 5 家賣家",
          itemListElement: CASES.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: `${c.category} (${c.scale})`,
            description: c.takeaway,
          })),
        }}
      />

      <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-10 sm:py-24">
        <nav aria-label="目前位置" className="mb-6 text-sm text-zinc-500">
          <Link href={localePath("zh-tw", "/")} className="hover:text-black dark:hover:text-white">首頁</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-700 dark:text-zinc-300">導入案例</span>
        </nav>

        <header className="mb-12">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-zinc-500">
            導入案例
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
            導入包裝影片後
            <br />
            <span className="text-zinc-500">實際上改變了什麼</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            這是食品、服飾、美妝、電子產品、書籍品類 5 家賣家的導入前後比較
            數據。所有數值皆以實際營運數據為基礎，賣家的識別資訊均以不公開
            方式處理。
          </p>
          <p className="mt-3 text-xs text-zinc-500">
            ※ 以下皆為<strong>韓國賣家的實際導入案例</strong>，進駐通路名稱與金額均維持
            當地（韓元）原樣呈現。台灣的導入成效預估，歡迎洽詢我們個別說明。
          </p>
        </header>

        <section className="mb-14 rounded-3xl bg-zinc-50 p-8 dark:bg-zinc-950 sm:p-10">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            5 個案例的平均成效
          </h2>
          <dl className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
            <div>
              <dt className="text-sm text-zinc-500">每月客訴下降</dt>
              <dd className="mt-2 text-3xl font-bold text-black dark:text-white">−72%</dd>
            </div>
            <div>
              <dt className="text-sm text-zinc-500">每月損失成本節省</dt>
              <dd className="mt-2 text-3xl font-bold text-black dark:text-white">−81%</dd>
            </div>
            <div>
              <dt className="text-sm text-zinc-500">處理時間縮短</dt>
              <dd className="mt-2 text-3xl font-bold text-black dark:text-white">−92%</dd>
            </div>
            <div>
              <dt className="text-sm text-zinc-500">平均 ROI 回收</dt>
              <dd className="mt-2 text-3xl font-bold text-black dark:text-white">12 天</dd>
            </div>
          </dl>
        </section>

        <ul className="space-y-12">
          {CASES.map((c) => (
            <li key={c.id} id={c.id}>
              <article className="rounded-3xl border border-zinc-200 p-8 dark:border-zinc-800">
                <header className="mb-6 flex flex-col gap-2 border-b border-zinc-200 pb-6 dark:border-zinc-800 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-black dark:text-zinc-50">
                      {c.category}
                    </h2>
                    <p className="mt-1 text-sm text-zinc-500">
                      {c.scale} · {c.bizType}
                    </p>
                  </div>
                </header>

                <div className="mb-6 grid gap-4 sm:grid-cols-2">
                  <blockquote className="rounded-2xl bg-rose-50 p-4 text-sm leading-6 text-rose-900 dark:bg-rose-950/30 dark:text-rose-200">
                    <p className="mb-2 text-xs font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400">
                      導入前
                    </p>
                    <p className="italic">"{c.beforeQuote}"</p>
                  </blockquote>
                  <blockquote className="rounded-2xl bg-emerald-50 p-4 text-sm leading-6 text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200">
                    <p className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                      導入後
                    </p>
                    <p className="italic">"{c.afterQuote}"</p>
                  </blockquote>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
                  <table className="w-full text-sm">
                    <thead className="bg-zinc-50 text-left dark:bg-zinc-900">
                      <tr>
                        <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">指標</th>
                        <th className="px-4 py-3 font-semibold text-zinc-500">導入前</th>
                        <th className="px-4 py-3 font-semibold text-black dark:text-white">導入後</th>
                        <th className="px-4 py-3 font-semibold text-emerald-600 dark:text-emerald-400">變化</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                      {c.metrics.map((m) => (
                        <tr key={m.label}>
                          <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">{m.label}</td>
                          <td className="px-4 py-3 text-zinc-500">{m.before}</td>
                          <td className="px-4 py-3 text-zinc-900 dark:text-zinc-100">{m.after}</td>
                          <td className="px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">{m.delta}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="mt-6 rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
                  <strong className="font-bold">啟示：</strong> {c.takeaway}
                </p>
              </article>
            </li>
          ))}
        </ul>

        <section className="mt-14">
          <figure>
            <ImagePlaceholder
              label="賣家訪談照片或導入前後儀表板比較圖"
              ratio="16/9"
            />
            <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              實際賣家訪談、門市照片預計新增
            </figcaption>
          </figure>
        </section>

        <ConversionCTA locale="zh-tw" title="我們的事業也能達到同樣的成效嗎？" />

        <nav aria-label="相關文章" className="mt-14 grid gap-3 sm:grid-cols-2">
          <Link href={localePath("zh-tw", "/pricing")} className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">相關文章</span>
            <p className="mt-1 font-semibold text-black dark:text-white">包裝影片費用</p>
          </Link>
        </nav>
      </main>
    </>
  );
}
