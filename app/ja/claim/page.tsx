import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "../../site";
import { ImagePlaceholder } from "../../components/Illustrations";
import { JsonLd, buildBreadcrumb, buildArticle } from "../../components/JsonLd";
import { ConversionCTA } from "../../components/ConversionCTA";
import { languageAlternates, localePath } from "../../i18n";

const PATH = "/claim";

export const metadata: Metadata = {
  title: "宅配クレーム解決 - 梱包動画一本で完結させる方法",
  description:
    "商品の欠品、誤配送、破損、空箱の主張 — 宅配クレーム6つのタイプ別の解決方法と、梱包動画で紛争を即座に終わらせる標準対応スクリプトを提供します。",
  alternates: {
    canonical: localePath("ja", PATH),
    languages: languageAlternates(PATH, ["ko", "ja"]),
  },
  openGraph: {
    title: "宅配クレーム解決ガイド",
    description:
      "梱包動画で宅配紛争を一本の動画で完結させる方法と対応スクリプト。",
    url: localePath("ja", PATH),
    locale: "ja_JP",
  },
};

const CASES = [
  {
    type: "商品の欠品",
    claim: "商品が入っていませんでした",
    solution:
      "梱包動画から商品が箱に入れられる場面をキャプチャし、リンクとともに送付。ほとんどの場合、即座に完結します。",
  },
  {
    type: "誤配送",
    claim: "違う商品が届きました",
    solution:
      "梱包動画で送り状と箱の中の商品が一致していることを確認 → 動画リンクを送付。配送中の紛失・すり替えの可能性を併せて確認する根拠になります。",
  },
  {
    type: "破損",
    claim: "箱がへこんで届きました",
    solution:
      "梱包動画で箱が正常な状態で出荷されたことを示せば、運送中の事故へと責任が移ります。配送業者への補償請求時に決定的な証拠となります。",
  },
  {
    type: "空箱の受領",
    claim: "箱に何も入っていませんでした",
    solution:
      "梱包動画は商品を箱に入れて封をするまでの全工程が録画されるため、空箱だという主張は即座に反論できます。",
  },
  {
    type: "サイズ・色の不一致",
    claim: "注文した色と違います",
    solution:
      "梱包動画で商品の色・サイズがはっきり見えるように検品段階を録画。単なる気変わりによる返金要求を防ぐことができます。",
  },
  {
    type: "数量不足",
    claim: "2個注文したのに1個しか届きませんでした",
    solution:
      "梱包動画で数量を確認する検品場面が核心的な証拠です。配送中の欠品の可能性も併せて確認します。",
  },
];

const SCRIPT = [
  {
    step: "ステップ1 — クレーム受付",
    body:
      "「ご不便をおかけし申し訳ございません。送り状番号より、出荷時の梱包動画をただ今すぐに確認いたします。」",
  },
  {
    step: "ステップ2 — 動画リンクの送付",
    body:
      "「[送り状 1234-5678] 梱包動画のリンクでございます: https://… 商品が箱に入れられる場面、0:35付近をご確認いただけますでしょうか。」",
  },
  {
    step: "ステップ3 — 後続対応のご案内",
    body:
      "(動画に問題なしの場合)「梱包動画上で正常な出荷が確認できましたので、配送業者側での紛失の有無を追加で確認のうえ、改めてご案内いたします。」\n(実際に欠品の場合)「確認いたしましたところ、動画でも商品が欠品しているのを確認いたしました。直ちに再発送の手配をいたします。」",
  },
];

const FAQ = [
  {
    q: "梱包動画ですべてのクレームが完結しますか？",
    a: "ほとんどの単純な紛争(欠品・空箱・破損の主張)は、動画リンクの送付だけで完結します。ただし配送中の事故や、双方に責任がある場合は、配送業者の調査が追加で必要になります。",
  },
  {
    q: "梱包動画をお客様に見せても個人情報の問題はありませんか？",
    a: "梱包動画には商品と送り状ラベルのみが映り、作業者の顔や他の注文情報は含まれないようカメラの角度が設定されます。送り状の情報はすでにお客様ご本人に送られたものなので、個人情報の追加的な露出はありません。",
  },
  {
    q: "ECモールの紛争調停で梱包動画は証拠として認められますか？",
    a: "はい。Amazon.co.jp・楽天市場・Yahoo!ショッピングなど主要ECモールの紛争調停手続きにおいて、梱包動画は決定的な証拠として認められます。動画に送り状番号と時刻が併せて表示されるため、改ざんされていないことも証明できます。",
  },
];

export default function ClaimPage() {
  const today = new Date().toISOString();
  return (
    <>
      <JsonLd
        data={buildBreadcrumb(SITE_URL, [
          { name: "ホーム", path: "/" },
          { name: "宅配クレーム解決", path: PATH },
        ])}
      />
      <JsonLd
        data={buildArticle({
          siteUrl: SITE_URL,
          path: PATH,
          headline: "宅配クレーム解決 - 梱包動画一本で完結させる方法",
          description:
            "宅配クレーム6つのタイプ別の対応方法と、梱包動画に基づく標準対応スクリプト。",
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
        <nav aria-label="現在の位置" className="mb-6 text-sm text-zinc-500">
          <Link href={localePath("ja", "/")} className="hover:text-black dark:hover:text-white">ホーム</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-700 dark:text-zinc-300">宅配クレーム解決</span>
        </nav>

        <header className="mb-12">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-zinc-500">
            クレーム解決ガイド
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
            宅配クレームを
            <br />
            梱包動画で完結させましょう
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            「商品が入っていなかった」「箱がへこんで届いた」「違う商品が
            届いた」 — 出店者なら誰もが経験するクレームです。この記事では、宅配クレーム6つの
            タイプ別の解決方法と、梱包動画で紛争を即座に終わらせる標準対応
            スクリプトを提供します。
          </p>
        </header>

        <section className="mb-14">
          <figure>
            <ImagePlaceholder
              label="梱包動画でクレームが即座に完結するチャット対応画面の例"
              ratio="3/2"
            />
            <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              動画リンク一行で完結する紛争対応の流れ(実写キャプチャは追加予定)
            </figcaption>
          </figure>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            宅配クレーム6つのタイプ — 梱包動画での対応法
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
                  お客様:「{c.claim}」
                </p>
                <p className="mt-3 text-base leading-7 text-zinc-700 dark:text-zinc-300">
                  <strong className="text-black dark:text-white">梱包動画での対応:</strong>{" "}
                  {c.solution}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            標準対応スクリプト(コピーしてご利用ください)
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
            「以前は空箱の返金要求一件につき30分も電話していましたが、梱包動画を
            導入してからはチャットで動画リンクを一行送るだけで終わります。不当な返金も
            確実に減りました。」
          </blockquote>
          <p className="mt-4 text-sm text-zinc-500">— 食品出店者 鈴木代表</p>
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

        <ConversionCTA locale="ja" title="今日からクレームの負担を減らしましょう" />

        <nav aria-label="関連記事" className="mt-14 grid gap-3 sm:grid-cols-2">
          <Link href={localePath("ja", "/vs-cctv")} className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">関連記事</span>
            <p className="mt-1 font-semibold text-black dark:text-white">梱包動画 vs CCTV</p>
          </Link>
          <Link href={localePath("ja", "/guide")} className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">関連記事</span>
            <p className="mt-1 font-semibold text-black dark:text-white">梱包動画 導入ガイド</p>
          </Link>
        </nav>
      </main>
    </>
  );
}
