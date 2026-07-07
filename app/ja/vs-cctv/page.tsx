import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "../../site";
import { ComparisonChart, ImagePlaceholder } from "../../components/Illustrations";
import { JsonLd, buildBreadcrumb, buildArticle } from "../../components/JsonLd";
import { ConversionCTA } from "../../components/ConversionCTA";
import { languageAlternates, localePath } from "../../i18n";

const PATH = "/vs-cctv";

export const metadata: Metadata = {
  title: "梱包動画 vs CCTV - 何がどう違うのか？",
  description:
    "梱包動画と一般的な店舗用CCTV（防犯カメラ）の違いを一目で比較します。送り状番号での検索、動画の保管ポリシー、クレーム対応時間、コストの観点でどのような違いがあるのかをご確認ください。",
  alternates: {
    canonical: localePath("ja", PATH),
    languages: languageAlternates(PATH, ["ko", "ja"]),
  },
  openGraph: {
    title: "梱包動画 vs CCTV 比較ガイド",
    description:
      "宅配クレームの解決にCCTV（防犯カメラ）だけで十分でしょうか？梱包動画とCCTVの検索時間、保管方式、証拠能力の違いをまとめました。",
    url: localePath("ja", PATH),
    locale: "ja_JP",
  },
};

const TABLE = [
  {
    item: "検索方式",
    cctv: "撮影された時間帯を推測して手作業でスクラビング",
    pv: "送り状番号で1対1の即時検索",
  },
  {
    item: "該当動画を見つけるまでの時間",
    cctv: "平均30分～数時間",
    pv: "平均3秒",
  },
  {
    item: "動画のインデックス",
    cctv: "タイムラインのみ（メタデータなし）",
    pv: "送り状・注文番号・日付を自動インデックス",
  },
  {
    item: "クレーム対応",
    cctv: "手作業で動画を切り出して送信、時間がかかる",
    pv: "共有リンク一行で即時に共有",
  },
  {
    item: "保管ポリシー",
    cctv: "通常7～30日で自動上書き",
    pv: "注文単位で90日以上クラウド保管",
  },
  {
    item: "リモートアクセス",
    cctv: "DVR/NVRに依存、障害時に動画を喪失",
    pv: "クラウドベースで、どこからでも即時閲覧",
  },
  {
    item: "初期費用",
    cctv: "数百万ウォン（DVR + 大容量HDD + 工事）",
    pv: "0ウォン（梱包台1台あたり月30,000ウォン）",
  },
  {
    item: "法的証拠能力",
    cctv: "時点・関連性の立証が困難",
    pv: "送り状と1対1のマッチングで立証が明確",
  },
];

const FAQ = [
  {
    q: "すでにCCTVがあるのに、梱包動画も必要なのですか？",
    a: "CCTV（防犯カメラ）はセキュリティや盗難防止には効果的ですが、特定の注文の梱包過程を素早く見つけることは困難です。梱包動画は送り状番号で即座に検索できるため、クレーム対応のスピードが比較にならないほど速くなります。両者は目的が異なり、クレームコストの大きい事業者には梱包動画が別途必要です。",
  },
  {
    q: "CCTVの映像も送り状番号で検索できるようにできますか？",
    a: "技術的に困難です。一般的なCCTVは時間帯ベースの録画であり、注文単位のメタデータを持っていません。梱包動画は最初からバーコードのスキャンと連動し、注文と動画が1対1で紐づくように設計されています。",
  },
  {
    q: "CCTVより梱包動画の方が高くつくのではありませんか？",
    a: "初期費用を比較すると、梱包動画の方がはるかに安価です。CCTVはDVR・HDD・工事費で数百万ウォンかかりますが、梱包動画は梱包台1台あたり月30,000ウォンで、別途の初期費用はありません。クレームを1件減らすだけで1か月分の費用が回収できる事業者がほとんどです。",
  },
];

export default function VsCCTVPage() {
  const today = "2026-06-14T00:00:00.000Z";
  return (
    <>
      <JsonLd
        data={buildBreadcrumb(SITE_URL, [
          { name: "ホーム", path: "/" },
          { name: "梱包動画 vs CCTV", path: PATH },
        ])}
      />
      <JsonLd
        data={buildArticle({
          siteUrl: SITE_URL,
          path: PATH,
          headline: "梱包動画 vs CCTV - 何がどう違うのか？",
          description:
            "梱包動画と一般的なCCTVの違いを、検索時間・保管ポリシー・コストなど8項目で比較したガイド。",
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
        <nav aria-label="現在地" className="mb-6 text-sm text-zinc-500">
          <Link href={localePath("ja", "/")} className="hover:text-black dark:hover:text-white">ホーム</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-700 dark:text-zinc-300">梱包動画 vs CCTV</span>
        </nav>

        <header className="mb-12">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
            梱包動画 vs CCTV
            <br />
            <span className="text-zinc-500">何がどう違うのか？</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            CCTVがあるから梱包動画は必要ないとお考えではありませんか？両者は目的も
            構造もまったく異なります。この記事では梱包動画とCCTVの違いを8項目で
            整理し、自社の事業所にどのソリューションが必要かを判断できるよう手助けします。
          </p>
        </header>

        <section className="mb-14">
          <figure className="overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
            <ComparisonChart className="h-auto w-full" />
            <figcaption className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
              ゼロパッキング自社測定の平均値。実際の環境により異なる場合があります。
            </figcaption>
          </figure>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            一目でわかる8つの違い
          </h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 text-left dark:bg-zinc-900">
                <tr>
                  <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">項目</th>
                  <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">一般的なCCTV</th>
                  <th className="px-4 py-3 font-semibold text-black dark:text-white">梱包動画（ゼロパッキング）</th>
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
            なぜCCTVだけでは不十分なのか
          </h2>
          <div className="mt-5 space-y-4 text-base leading-7 text-zinc-700 dark:text-zinc-300">
            <p>
              CCTVの核心的な限界は「注文単位のインデックス」がないという点です。ある顧客が
              「届いた箱が空だった」とクレームを入れた場合、CCTVで対応するには次の
              過程を踏まなければなりません。
            </p>
            <ol className="list-decimal space-y-2 pl-6">
              <li>送り状番号から出荷日・時刻を推測する。</li>
              <li>該当する時間帯のCCTV録画を探す。</li>
              <li>その時間帯の映像の中から「この箱」を直接目で探す。</li>
              <li>該当する区間だけを切り出して動画に変換する。</li>
              <li>顧客に送信する。</li>
            </ol>
            <p>
              1件あたり平均30分以上を要します。クレームが1日5件なら、週5日×30分
              ≈ 12時間が消えていきます。梱包動画はこの過程を、送り状番号の入力 → 動画
              リンクのコピー → 送信（約30秒）にまで短縮します。
            </p>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            梱包動画が適している事業所
          </h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              { t: "月間出荷500件以上", d: "クレームが累積するとコスト負担が大きい事業者" },
              { t: "モール出店の事業者", d: "Amazon.co.jp・楽天市場・Yahoo!ショッピングでの紛争が頻繁" },
              { t: "高額商品の取り扱い", d: "電子製品・化粧品・食品など破損紛争が多い" },
              { t: "複数人での梱包環境", d: "梱包スタッフが複数いる場合の責任追跡が必要" },
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
              label="実際の梱包動画の検索画面 vs CCTVのタイムライン画面の比較"
              ratio="16/9"
            />
            <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              （実機比較スクリーンショットを追加予定）
            </figcaption>
          </figure>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            よくある質問
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

        <ConversionCTA locale="ja" title="CCTVでは足りないなら、梱包動画を始めましょう" />

        <nav aria-label="関連記事" className="mt-14 grid gap-3 sm:grid-cols-2">
          <Link href={localePath("ja", "/guide")} className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">次の記事</span>
            <p className="mt-1 font-semibold text-black dark:text-white">梱包動画の導入ガイド</p>
          </Link>
          <Link href={localePath("ja", "/claim")} className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">関連記事</span>
            <p className="mt-1 font-semibold text-black dark:text-white">宅配クレームの解決方法</p>
          </Link>
        </nav>
      </main>
    </>
  );
}
