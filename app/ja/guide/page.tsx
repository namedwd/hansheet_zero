import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SITE_URL } from "../../site";
import { JsonLd, buildBreadcrumb, buildArticle } from "../../components/JsonLd";
import { ConversionCTA } from "../../components/ConversionCTA";
import { languageAlternates, localePath } from "../../i18n";

const PATH = "/guide";

export const metadata: Metadata = {
  title: "誤出荷対策の梱包動画 導入ガイド2026 - カメラ設置から運用まで",
  description:
    "誤出荷・クレーム対策として梱包動画を初めて導入するセラーのための2026年最新ステップ別ガイド。カメラの設置位置・角度、梱包台のセッティング、バーコード連携、スタッフ教育、クレーム対応、業種別の導入ポイントまで1ページにまとめました。",
  keywords: [
    "誤出荷対策 導入",
    "誤出荷 防止 カメラ",
    "出荷 録画 導入",
    "梱包動画 導入",
    "梱包動画 設置",
    "梱包動画 カメラ 位置",
    "梱包台 カメラ 設置",
    "出荷検品 カメラ 設置",
  ],
  alternates: {
    canonical: localePath("ja", PATH),
    languages: languageAlternates(PATH, ["ko", "ja"]),
  },
  openGraph: {
    title: "梱包動画 導入ガイド2026 - カメラ設置から運用まで",
    description:
      "梱包動画が初めてなら、この記事1本で十分です。カメラの位置・角度、バーコード連携、スタッフ教育、業種別の導入ポイント。",
    url: localePath("ja", PATH),
    locale: "ja_JP",
  },
};

const STEPS = [
  {
    n: "01",
    t: "梱包台の環境チェック",
    body: "梱包作業の動線が一定か、箱の上面がカメラにしっかり映るかを確認します。梱包台の上80〜120cmの高さにカメラを設置できるスペースが必要です。",
    tip: "よくある失敗 — 梱包台を頻繁に動かす環境でカメラだけを固定すると、撮影範囲から外れてしまいます。まず梱包台の位置を固定しましょう。",
  },
  {
    n: "02",
    t: "カメラの設置位置を決める",
    body: "梱包台の真上の天井、または専用スタンドにカメラを取り付けます。箱の中の内容物が見えるよう、約30〜45度の角度で傾けるのが一般的です。影ができないよう照明も併せてチェックします。",
    tip: "チェックポイント — 天井に直角(90度)で取り付けると箱の中が見えません。30〜45度の傾き+カメラ脇の補助照明が正解です。",
  },
  {
    n: "03",
    t: "バーコードスキャナーの接続",
    body: "梱包動画システムに対応したUSBまたはワイヤレスのバーコードスキャナーを接続します。送り状または注文番号のバーコードを一度読み取るだけで、梱包動画の録画が自動で始まります。",
    tip: "チェックポイント — ワイヤレススキャナーはバッテリー切れの際に録画漏れの原因になります。出荷量の多い事業所には有線USBスキャナーを推奨します。",
  },
  {
    n: "04",
    t: "WMS・OMS連携(任意)",
    body: "Shopify・BASE等のECカートや自社WMSを利用中であれば、API連携で送り状の自動マッチングが可能です。連携なしでも利用できますが、連携すると運用効率が大きく向上します。",
    tip: "参考 — 連携方法は別途まとめた梱包動画API・WMS連携ガイドをご確認ください。主要なECカートや自社WMSも標準APIで対応します。",
  },
  {
    n: "05",
    t: "スタッフ教育(10分で十分)",
    body: "既存の梱包作業の流れはそのまま維持し、「バーコードをもう一度スキャンする」だけを追加すればOKです。画面の応答・LEDの信号で録画状態を誰でも確認できるため、習得の負担はほとんどありません。",
    tip: "よくある失敗 — 検品(数量・色の確認)の場面を省略すると、トラブル時の証拠力が弱くなります。「商品をカメラの前で一度見せてから箱に入れる」を習慣化しましょう。",
  },
  {
    n: "06",
    t: "テスト出荷5件",
    body: "実際の出荷5件をテストし、梱包動画が送り状と正確にマッチングするか、画質・角度が適切かを確認します。必要に応じてカメラの位置を微調整します。",
    tip: "チェックポイント — 送り状の文字が動画ではっきり読めるか必ず確認してください。送り状が識別できないと、検索能力も証拠能力も低下します。",
  },
  {
    n: "07",
    t: "クレーム対応の標準づくり",
    body: "顧客からクレームが発生した際の「送り状検索 → 動画リンクのコピー → メール/メッセージ送信」の手順を社内マニュアルにします。対応時間が平均30分から1分以内に短縮されます。",
    tip: "参考 — タイプ別の対応スクリプトは宅配クレーム解決ガイドにまとめています。コピーしてそのまま使えます。",
  },
  {
    n: "08",
    t: "運用データのモニタリング",
    body: "月別のクレーム件数と返金コストを計測し、梱包動画の導入前後の効果を定量化します。ほとんどのセラーが1〜2か月以内にROIを確認できます。",
    tip: "チェックポイント — 導入前1か月分のクレームデータを先に記録しておくと、導入後の効果を正確に比較できます。",
  },
];

// 導入前の準備物チェックリスト
const PREP = [
  { item: "梱包台のPC(既存のものを活用可能)", note: "別途サーバー不要、クライアントのみインストール" },
  { item: "カメラ(USBウェブカメラまたはIPカメラ)", note: "5,000〜10,000円台のUSBウェブカメラから対応" },
  { item: "カメラスタンドまたは天井マウント", note: "梱包台の上80〜120cmに固定" },
  { item: "バーコードスキャナー", note: "有線USB推奨(ワイヤレスはバッテリー管理が必要)" },
  { item: "補助照明(任意)", note: "暗い倉庫ならカメラの脇に設置" },
  { item: "インターネット接続", note: "クラウドアップロード用、一般的なインターネットで十分" },
];

// 業種別の導入ポイント
const INDUSTRIES = [
  {
    name: "食品・生鮮",
    point: "賞味期限・鮮度に関するクレームが多いため、商品ラベルと梱包状態がはっきり見えるよう、カメラの画質・照明を優先的にチェックしてください。",
  },
  {
    name: "アパレル・ファッション",
    point: "サイズ・色のトラブルが多く、検品の段階が肝心です。商品を広げて色・サイズのタグが見えるようにしてから箱に詰める流れを標準化しましょう。",
  },
  {
    name: "化粧品・ビューティー",
    point: "サンプル・ノベルティの欠品クレームが頻繁に起こります。本品とサンプルをすべてカメラの前で確認する場面を必ず動画に含めてください。",
  },
  {
    name: "電子機器・高額品",
    point: "客単価が高く、クレーム1件の損失が大きくなります。梱包直前の電源・動作テストの場面を動画に収めると、不良 vs ユーザー責任の区別が明確になります。",
  },
];

const FAQ = [
  {
    q: "梱包動画の導入には何日かかりますか?",
    a: "カメラの設置から正常運用まで平均1日あれば十分です。WMS連携を含めても3〜5日で完了します。",
  },
  {
    q: "梱包動画のために別途のPCが必要ですか?",
    a: "既存の梱包台PCにクライアントをインストールするだけです。別途サーバーやPCは不要で、動画の処理・保存はすべてクラウドで処理されます。",
  },
  {
    q: "照明が不足している倉庫でも梱包動画はきれいに撮れますか?",
    a: "はい。低照度の環境でも認識可能なカメラオプションを提供しています。ただし、送り状の文字がはっきり見える程度の照明は推奨されます。",
  },
  {
    q: "どのカメラを買えばよいですか?",
    a: "個人・小規模セラーは5,000〜10,000円台のUSBウェブカメラで十分です。梱包台が3台以上なら、FHDの産業用カメラやPoE IPカメラを推奨します。事業所規模別のカメラ選びの基準は、梱包動画カメラのおすすめ記事に詳しくまとめています。",
  },
  {
    q: "カメラはどの高さ・角度で設置すべきですか?",
    a: "梱包台の上80〜120cmの高さ、真上から30〜45度傾けて設置するのが一般的です。箱の中の内容物と送り状ラベルが1画面にすべて映る角度が最適です。",
  },
  {
    q: "梱包動画はどれくらいの期間保管されますか?",
    a: "標準で3か月間クラウドに保管されます。多くのクレームは出荷後1か月以内に寄せられますが、交換・再配送が絡んだり、遅れて申し立てられる紛争も少なくありません。CCTVや保管期間が1か月にとどまるサービスではこうした遅いクレームに対応できませんが、ゼロパッキングは3か月保管するため、後から来る紛争まで安全にカバーします。",
  },
  {
    q: "スタッフが変わっても運用に問題はありませんか?",
    a: "梱包動画は「バーコードスキャンを1回」追加するだけの仕組みなので、新人スタッフも5〜10分で慣れます。画面・LEDで録画状態が表示され、誰でも正常な動作を確認できます。",
  },
  {
    q: "既存のCCTVがありますが、梱包動画もまた必要ですか?",
    a: "CCTVは時間帯での検索しかできませんが、梱包動画は送り状番号で即座に検索できます。両システムの違いは梱包動画 vs CCTV比較の記事で8項目にまとめました。",
  },
  {
    q: "梱包台が複数あるのですが、すべてに設置すべきですか?",
    a: "梱包動画は梱包台1台につきカメラ1台+月4,980円の構成です。クレームが集中する梱包台から優先的に導入し、段階的に拡大する方法も可能です。",
  },
  {
    q: "導入コストに見合う効果は本当にありますか?",
    a: "梱包動画の1か月の費用(4,980円)は、不当な返金を1件減らすだけで回収できます。月1,000件出荷を基準とした実際の削減額シミュレーションもご用意しています。",
  },
];

export default function GuidePage() {
  const today = "2026-06-14T00:00:00.000Z";
  return (
    <>
      <JsonLd
        data={buildBreadcrumb(SITE_URL, [
          { name: "ホーム", path: "/" },
          { name: "梱包動画 導入ガイド", path: PATH },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "梱包動画 導入ガイド",
          description:
            "梱包動画を初めて導入するセラーのための8ステップガイド。カメラの設置から運用モニタリングまで。",
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
          headline: "梱包動画 導入ガイド - 開始から運用まで",
          description:
            "梱包動画の導入のための8ステップチェックリスト。カメラの位置、バーコード連携、スタッフ教育、クレーム対応の標準化まで。",
          datePublished: today,
          dateModified: today,
        })}
      />

      <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-10 sm:py-24">
        <nav aria-label="現在地" className="mb-6 text-sm text-zinc-500">
          <Link href={localePath("ja", "/")} className="hover:text-black dark:hover:text-white">ホーム</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-700 dark:text-zinc-300">梱包動画 導入ガイド</span>
        </nav>

        <header className="mb-12">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-zinc-500">
            ガイド · 2026最新版 · 8ステップ
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
            誤出荷対策 梱包動画 導入ガイド
            <br />
            <span className="text-zinc-500">カメラ設置から運用まで一気に</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            梱包動画を初めて導入するセラーのための2026年最新ステップ別ガイドです。
            導入前の準備物、カメラの設置位置・角度、梱包台のセッティング、バーコード連携、
            スタッフ教育、クレーム対応、業種別の導入ポイントまで漏れなくまとめました。
            最初から最後まで沿って進めれば、1日以内に梱包動画の運用を始められます。
          </p>
        </header>

        <section className="mb-12">
          <figure>
            <Image
              src="/packing-video-hero.webp"
              alt="梱包台のカメラが宅配商品の梱包過程を撮影する様子を表したイメージ画像"
              width={1672}
              height={941}
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="h-auto w-full rounded-2xl border border-zinc-200 dark:border-zinc-800"
            />
            <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              イメージ画像 — バーコードスキャンと同時に梱包動画の録画が始まる様子を表したものです。
            </figcaption>
          </figure>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            導入前の準備物チェックリスト
          </h2>
          <p className="mt-3 text-base leading-7 text-zinc-700 dark:text-zinc-300">
            梱包動画の導入に必要な準備物です。ほとんどが既存の機材を活用できるため、
            追加コストの負担が少なくて済みます。
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
            カメラ選びに迷ったら、梱包動画カメラのおすすめガイドで事業所規模別の推奨モデルをご確認ください。
          </p>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            8ステップ導入チェックリスト
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
            業種別の導入ポイント
          </h2>
          <p className="mt-3 text-base leading-7 text-zinc-700 dark:text-zinc-300">
            同じ梱包動画でも、業種によって気をつけるべき部分は異なります。自社の
            事業カテゴリに合ったポイントを確認してください。
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
            導入効果 — 平均的なセラー基準
          </h2>
          <dl className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <dt className="text-sm font-medium text-zinc-500">クレーム対応時間</dt>
              <dd className="mt-2 text-3xl font-bold text-black dark:text-white">−95%</dd>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">30分 → 1分以内</p>
            </div>
            <div>
              <dt className="text-sm font-medium text-zinc-500">不当な返金</dt>
              <dd className="mt-2 text-3xl font-bold text-black dark:text-white">−30%</dd>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">証拠動画で解決</p>
            </div>
            <div>
              <dt className="text-sm font-medium text-zinc-500">ROI回収</dt>
              <dd className="mt-2 text-3xl font-bold text-black dark:text-white">1〜2か月</dd>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">ほとんどのセラー基準</p>
            </div>
          </dl>
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

        <ConversionCTA locale="ja" title="ガイドを読んだら、今日すぐに始められます" />

        <nav aria-label="関連記事" className="mt-14 grid gap-3 sm:grid-cols-2">
          <Link href={localePath("ja", "/api")} className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">次の記事</span>
            <p className="mt-1 font-semibold text-black dark:text-white">梱包動画 API · WMS連携</p>
          </Link>
          <Link href={localePath("ja", "/vs-cctv")} className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">関連記事</span>
            <p className="mt-1 font-semibold text-black dark:text-white">梱包動画 vs CCTV</p>
          </Link>
          <Link href={localePath("ja", "/pricing")} className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">関連記事</span>
            <p className="mt-1 font-semibold text-black dark:text-white">梱包動画 料金</p>
          </Link>
        </nav>
      </main>
    </>
  );
}
