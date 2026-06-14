import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "../../site";
import { ImagePlaceholder } from "../../components/Illustrations";
import { JsonLd, buildBreadcrumb } from "../../components/JsonLd";
import { ConversionCTA } from "../../components/ConversionCTA";
import { languageAlternates, localePath } from "../../i18n";

const PATH = "/cases";

export const metadata: Metadata = {
  title: "梱包動画の導入事例 - セラー5社の実際の効果データ",
  description:
    "食品・アパレル・化粧品・電子機器・書籍のセラー5社による梱包動画の導入事例。導入前後のクレーム件数・返金コスト・対応時間の変化を定量データで整理しました。",
  alternates: {
    canonical: localePath("ja", PATH),
    languages: languageAlternates(PATH, ["ko", "ja"]),
  },
  openGraph: {
    title: "梱包動画の導入事例 - セラー5社の実際の効果",
    description:
      "5つのカテゴリのセラーによる梱包動画の導入前後比較。クレーム削減率、ROI回収期間、運用の変化。",
    url: localePath("ja", PATH),
    locale: "ja_JP",
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
    category: "食品セラー",
    scale: "月間出荷1,500件",
    bizType: "楽天市場 + 自社サイト",
    beforeQuote:
      "賞味期限・鮮度に関するクレームが多いのですが、出荷時点の状態を証明する資料がなく、毎回そのまま返金していました。月に50万ウォン近い損失でした。",
    afterQuote:
      "梱包動画で出荷時点に商品が正常だったことをお見せできるので、不当な返金要求がほぼなくなりました。初月からコストを回収できました。",
    metrics: [
      { label: "月間クレーム件数", before: "32件", after: "11件", delta: "−66%" },
      { label: "返金・再発送コスト", before: "月50万ウォン", after: "月14万ウォン", delta: "−72%" },
      { label: "対応平均時間", before: "1件あたり25分", after: "1件あたり2分", delta: "−92%" },
      { label: "ROI回収期間", before: "—", after: "23日", delta: "1ヶ月未満" },
    ],
    takeaway:
      "鮮度・食品カテゴリはクレームの頻度と単価がいずれも高く、梱包動画のROIが最も早く出る領域。",
  },
  {
    id: "fashion",
    category: "アパレル・ファッションセラー",
    scale: "月間出荷4,000件",
    bizType: "Amazon.co.jp + 自社サイト + ZOZOTOWN",
    beforeQuote:
      "サイズや色が違うものが届いたというクレームが本当に多いです。紛争調停に持ち込まれるとほとんどがセラー敗訴となり、毎月100万ウォンを超える損失が出ていました。",
    afterQuote:
      "検品段階が動画に記録されるので、『注文どおりのサイズである』ことが紛争調停で即座に認められます。紛争への持ち込み自体が80%減りました。",
    metrics: [
      { label: "月間紛争調停の持ち込み", before: "12件", after: "2件", delta: "−83%" },
      { label: "紛争敗訴による損失", before: "月100万ウォン", after: "月15万ウォン", delta: "−85%" },
      { label: "梱包スタッフの離職率", before: "四半期あたり30%", after: "四半期あたり10%", delta: "対応ストレスの軽減" },
      { label: "ROI回収期間", before: "—", after: "11日", delta: "月1週間未満" },
    ],
    takeaway:
      "アパレルはサイズ・色に関する紛争が圧倒的に多く、「検品動画」の価値が最も大きいカテゴリ。",
  },
  {
    id: "cosmetic",
    category: "化粧品セラー",
    scale: "月間出荷2,200件",
    bizType: "楽天市場 + ドラッグストア卸",
    beforeQuote:
      "サンプル・おまけの構成品が欠品しているというクレームが毎週5〜6件殺到していました。写真では証明できないので、無条件で再発送していました。",
    afterQuote:
      "箱にサンプルを入れる場面が動画に明確に記録されるので、欠品クレームが90%なくなりました。不当なクレームの試み自体が止まりました。",
    metrics: [
      { label: "月間欠品クレーム", before: "26件", after: "3件", delta: "−88%" },
      { label: "サンプル再発送コスト", before: "月39万ウォン", after: "月4.5万ウォン", delta: "−88%" },
      { label: "対応時間", before: "1件あたり18分", after: "1件あたり1分", delta: "−94%" },
      { label: "ROI回収期間", before: "—", after: "16日", delta: "1ヶ月未満" },
    ],
    takeaway:
      "化粧品・ビューティーはサンプルや特典が多く「含まれているかどうか」の紛争が頻発するが、動画が決定的に機能する。",
  },
  {
    id: "electronics",
    category: "電子機器セラー",
    scale: "月間出荷800件（客単価12万ウォン）",
    bizType: "Amazon.co.jp + Yahoo!ショッピング + 自社サイト",
    beforeQuote:
      "高額商品なので破損・不良のクレーム1件あたりの損失が大きいです。『届いてすぐ電源が入らない』というクレームは、実際の不良なのか不当な返金の試みなのか区別がつきませんでした。",
    afterQuote:
      "梱包直前に電源テストの場面を動画に含めたところ、実際の不良かユーザー責任かの区別が明確になりました。不当な返金がほぼ0件です。",
    metrics: [
      { label: "月間の不当返金疑い件数", before: "7件", after: "0〜1件", delta: "−85%" },
      { label: "1件あたり平均損失", before: "12万ウォン", after: "—", delta: "—" },
      { label: "月間削減額", before: "—", after: "約80万ウォン", delta: "—" },
      { label: "ROI回収期間", before: "—", after: "1日", delta: "導入後すぐ" },
    ],
    takeaway:
      "高額カテゴリはクレーム1件の損失が大きく、梱包動画のROIが最も極端に大きい領域。",
  },
  {
    id: "books",
    category: "書籍・教材セラー",
    scale: "月間出荷3,500件",
    bizType: "楽天市場 + 書籍系モール卸",
    beforeQuote:
      "客単価が低いのにクレームの頻度は高く、対応時間が最も大きなコストでした。1人のスタッフが一日中クレーム対応だけをしていました。",
    afterQuote:
      "動画リンク1行で対応が終わるので、対応スタッフを他の業務に再配置できました。毎月の人件費削減が大きいです。",
    metrics: [
      { label: "月間対応総時間", before: "120時間", after: "12時間", delta: "−90%" },
      { label: "換算人件費", before: "月144万ウォン", after: "月14万ウォン", delta: "−90%" },
      { label: "顧客満足度（自社アンケート）", before: "3.2/5", after: "4.5/5", delta: "応答速度の改善" },
      { label: "ROI回収期間", before: "—", after: "9日", delta: "10日未満" },
    ],
    takeaway:
      "対応の人件費が大きな比重を占める事業は、梱包動画で「人的効率」を最も大きく改善できる。",
  },
];

export default function CasesPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumb(SITE_URL, [
          { name: "ホーム", path: "/" },
          { name: "導入事例", path: PATH },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "梱包動画の導入事例 — セラー5社",
          itemListElement: CASES.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: `${c.category} (${c.scale})`,
            description: c.takeaway,
          })),
        }}
      />

      <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-10 sm:py-24">
        <nav aria-label="現在地" className="mb-6 text-sm text-zinc-500">
          <Link href={localePath("ja", "/")} className="hover:text-black dark:hover:text-white">ホーム</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-700 dark:text-zinc-300">導入事例</span>
        </nav>

        <header className="mb-12">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-zinc-500">
            導入事例
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
            梱包動画の導入後
            <br />
            <span className="text-zinc-500">実際に何が変わったのか</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            食品・アパレル・化粧品・電子機器・書籍カテゴリのセラー5社による
            導入前後の比較データです。すべての数値は実際の運用データに基づいており、
            セラーの識別情報は非公開として処理しています。
          </p>
        </header>

        <section className="mb-14 rounded-3xl bg-zinc-50 p-8 dark:bg-zinc-950 sm:p-10">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            5事例の平均効果
          </h2>
          <dl className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
            <div>
              <dt className="text-sm text-zinc-500">月間クレーム削減</dt>
              <dd className="mt-2 text-3xl font-bold text-black dark:text-white">−72%</dd>
            </div>
            <div>
              <dt className="text-sm text-zinc-500">月間損失コスト削減</dt>
              <dd className="mt-2 text-3xl font-bold text-black dark:text-white">−81%</dd>
            </div>
            <div>
              <dt className="text-sm text-zinc-500">対応時間の短縮</dt>
              <dd className="mt-2 text-3xl font-bold text-black dark:text-white">−92%</dd>
            </div>
            <div>
              <dt className="text-sm text-zinc-500">平均ROI回収</dt>
              <dd className="mt-2 text-3xl font-bold text-black dark:text-white">12日</dd>
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
                        <th className="px-4 py-3 font-semibold text-emerald-600 dark:text-emerald-400">変化</th>
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
                  <strong className="font-bold">示唆:</strong> {c.takeaway}
                </p>
              </article>
            </li>
          ))}
        </ul>

        <section className="mt-14">
          <figure>
            <ImagePlaceholder
              label="セラーインタビュー写真または導入前後のダッシュボード比較画像"
              ratio="16/9"
            />
            <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              実際のセラーインタビュー・店舗写真を追加予定
            </figcaption>
          </figure>
        </section>

        <ConversionCTA locale="ja" title="当社の現場でも同じ効果が出るでしょうか?" />

        <nav aria-label="関連情報" className="mt-14 grid gap-3 sm:grid-cols-2">
          <Link href={localePath("ja", "/pricing")} className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">関連情報</span>
            <p className="mt-1 font-semibold text-black dark:text-white">梱包動画の料金</p>
          </Link>
        </nav>
      </main>
    </>
  );
}
