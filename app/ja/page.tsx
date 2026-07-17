import type { Metadata } from "next";
import { SITE_URL, inquiryUrl, serviceLandingUrl } from "../site";
import { StepIllustration, ImagePlaceholder } from "../components/Illustrations";
import { ConversionCTA } from "../components/ConversionCTA";
import { languageAlternates, localePath } from "../i18n";

export const metadata: Metadata = {
  title: {
    absolute: "誤出荷・クレーム対策に｜出荷時の梱包動画を自動記録 - ハンシート",
  },
  description:
    "誤出荷やクレームが起きても、出荷時点の梱包動画が残っていれば動画1本で解決できます。ハンシートが推奨するゼロパッキングは、バーコードを一度スキャンするだけで梱包動画を自動撮影し、送り状番号で即座に検索。破損・誤配送・欠品の対策に。",
  keywords: [
    "誤出荷 対策",
    "誤出荷防止",
    "誤出荷 クレーム",
    "出荷ミス 対策",
    "梱包動画",
    "出荷 動画 記録",
    "出荷検品 動画",
    "通販 クレーム 対策",
    "誤配送 証拠",
  ],
  alternates: {
    canonical: localePath("ja", "/"),
    languages: languageAlternates("/", ["ko", "en", "ja", "zh-tw", "vi"]),
  },
  openGraph: {
    title: "誤出荷・クレーム対策 — 出荷時の梱包動画を自動記録 | ゼロパッキング",
    description:
      "宅配の梱包動画を自動撮影・クラウド保管。送り状番号ですぐに検索し、誤出荷やクレームを素早く解決します。",
    url: localePath("ja", "/"),
    type: "website",
    locale: "ja_JP",
  },
};

const FAQ = [
  {
    q: "梱包動画とは何ですか？",
    a: "梱包動画とは、EC・宅配の商品を発送する直前の梱包工程を録画した動画です。どの商品がどのような状態で箱に入れられ、送り状が貼られる瞬間までをそのまま記録するため、お客様からクレームが発生した際の客観的な証拠として活用できます。",
  },
  {
    q: "なぜ梱包動画を自動で撮影する必要があるのですか？",
    a: "手動の撮影は撮り忘れが多く、動画ファイルを追跡番号と紐づけて保管する作業も負担です。自動の梱包動画サービスなら、バーコードを一度スキャンするだけで撮影が開始・終了し、追跡番号で自動的に索引されるため、平均3秒で該当の動画を見つけられます。",
  },
  {
    q: "梱包動画はどのくらい保管されますか？",
    a: "標準で3か月間クラウドに安全に保管されます。より長い保管が必要な場合は個別にご案内し、動画はHD画質で保存されます。",
  },
  {
    q: "梱包動画でどのようなクレームを解決できますか？",
    a: "商品の欠品、誤配送、破損、サイズ・色違い、「空箱が届いた」という主張など、ほぼすべての宅配トラブルに対応できます。梱包動画のリンクをお客様に共有すれば、多くのクレームがその場で解決します。",
  },
  {
    q: "既存のWMS・OMSと連携できますか？",
    a: "はい。ゼロパッキングの梱包動画は標準APIとバーコードインターフェースを備えており、各種の通販システムや自社WMSと連携できます。",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: "ハンシート",
      alternateName: ["Hansheet", "한시트", "Zeropacking"],
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      description:
        "梱包動画で宅配クレームを減らす事業者向けのガイドサイト。運営元ゼロパッキングの梱包動画 自動撮影サービスを紹介します。",
      contactPoint: {
        "@type": "ContactPoint",
        email: "contact@zeropacking.com",
        contactType: "customer service",
        availableLanguage: ["Japanese", "Korean", "English"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      url: SITE_URL,
      name: "ハンシート",
      inLanguage: "ja-JP",
      publisher: { "@id": `${SITE_URL}#organization` },
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}#service-ja`,
      serviceType: "梱包動画の自動撮影およびクラウド保管サービス",
      name: "ゼロパッキング 梱包動画",
      provider: { "@id": `${SITE_URL}#organization` },
      url: "https://www.zeropacking.com/ja",
      description:
        "梱包動画を自動撮影し、追跡番号ですぐに検索できるようクラウドに保管します。宅配クレーム・トラブル解決のための動画証拠ソリューションです。",
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/ja#faq`,
      mainEntity: FAQ.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export default function HomeJa() {
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
              ハンシート · 梱包動画ガイド
            </p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
              誤出荷・クレーム対策は
              <br />
              出荷時の「梱包動画」で
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              誤出荷や「商品が入っていない」というクレームは、出荷時点の状態を
              証明できるかどうかで結果が変わります。梱包動画とは、その出荷時の
              梱包工程をそのまま記録した動画です。ハンシートが推奨するゼロパッキングは、
              すべての梱包動画を自動撮影してクラウドに安全に保管。送り状番号を
              入力するだけで該当の梱包動画をすぐに呼び出せるので、誤出荷・破損・
              欠品のトラブルに時間を奪われることがなくなります。
            </p>

            <figure className="mt-8 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
              <ImagePlaceholder
                label="梱包台のカメラ → クラウド → 追跡番号で検索"
                ratio="16/9"
              />
              <figcaption className="border-t border-zinc-200 bg-white px-4 py-3 text-xs text-zinc-600 dark:border-zinc-800 dark:bg-black dark:text-zinc-400">
                梱包台の上のカメラが各梱包動画を自動撮影してクラウドに保管し、
                追跡番号で検索できるようにする仕組みのイメージです。
              </figcaption>
            </figure>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={inquiryUrl("ja", "hero")}
                target="_blank"
                rel="noopener"
                className="flex h-12 items-center justify-center rounded-full bg-black px-7 text-base font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                お問い合わせ
              </a>
              <a
                href={serviceLandingUrl("ja", "hero-trial")}
                target="_blank"
                rel="noopener"
                className="flex h-12 items-center justify-center rounded-full border border-zinc-200 px-7 text-base font-medium text-black transition-colors hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:text-white dark:hover:bg-zinc-900"
              >
                無料で試す
              </a>
            </div>
          </header>

          <section className="mb-16 border-t border-zinc-200 pt-12 dark:border-zinc-800">
            <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
              梱包動画とは？
            </h2>
            <div className="mt-5 space-y-4 text-base leading-7 text-zinc-700 dark:text-zinc-300">
              <p>
                梱包動画とは、EC・宅配の事業者が商品を箱に入れて送り状を貼るまでの
                一連の梱包工程を録画した動画のことです。一般的な防犯カメラ（CCTV）
                と違い、梱包動画は追跡番号と1対1で紐づけて保管されるため、トラブルが
                発生したときに該当注文の動画をすぐに見つけられます。
              </p>
              <p>
                「商品が届いたが空だった」「違う商品が届いた」「破損していた」と
                いったクレームは、事業者にとって大きなコストの一つです。梱包動画は、
                こうした主張のすべてに対して発送時点の客観的な証拠を提供します。
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
              なぜ梱包動画を自動で撮影するのか
            </h2>
            <ul className="mt-6 space-y-5">
              <li className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
                <h3 className="text-lg font-semibold text-black dark:text-zinc-50">
                  トラブル対応の時間を90%短縮
                </h3>
                <p className="mt-2 text-base leading-7 text-zinc-700 dark:text-zinc-300">
                  追跡番号で検索できる梱包動画のリンクをお客様に送るだけで、
                  多くのクレームがその場で解決します。
                </p>
              </li>
              <li className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
                <h3 className="text-lg font-semibold text-black dark:text-zinc-50">
                  人は忘れても、動画は残る
                </h3>
                <p className="mt-2 text-base leading-7 text-zinc-700 dark:text-zinc-300">
                  バーコードを一度スキャンするだけで梱包動画が自動で開始・終了する
                  ため、忙しい発送時間帯でも撮り逃しがありません。
                </p>
              </li>
              <li className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
                <h3 className="text-lg font-semibold text-black dark:text-zinc-50">
                  CCTVでは探せない動画を、3秒で検索
                </h3>
                <p className="mt-2 text-base leading-7 text-zinc-700 dark:text-zinc-300">
                  CCTVは時間帯でしか検索できませんが、ゼロパッキングの梱包動画は
                  追跡番号で索引され、平均3秒で該当注文の動画を見つけ出します。
                </p>
              </li>
              <li className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
                <h3 className="text-lg font-semibold text-black dark:text-zinc-50">
                  返品・返金コストの削減
                </h3>
                <p className="mt-2 text-base leading-7 text-zinc-700 dark:text-zinc-300">
                  梱包動画を導入した事業者は、不当なクレームによる返品・返金
                  コストを平均30%以上削減したと報告しています。
                </p>
              </li>
            </ul>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
              梱包動画の自動撮影、こう動きます
            </h2>
            <ol className="mt-6 grid gap-5 sm:grid-cols-2">
              {[
                {
                  n: 1 as const,
                  title: "バーコードのスキャンで撮影開始",
                  desc: "発送直前に送り状または注文のバーコードをスキャンすると、梱包動画の録画が自動的に始まります。",
                },
                {
                  n: 2 as const,
                  title: "梱包工程をHD画質で録画",
                  desc: "商品の検品、箱詰め、送り状の貼付までの全工程がHD画質の梱包動画として記録されます。",
                },
                {
                  n: 3 as const,
                  title: "追跡番号でクラウドに自動索引",
                  desc: "完了した梱包動画は追跡番号とともにクラウドに保管され、誰でもすぐに検索・共有できます。",
                },
                {
                  n: 4 as const,
                  title: "クレーム時は動画リンクを1本送るだけ",
                  desc: "トラブル発生時、その追跡番号の梱包動画リンクをメッセージで送るだけで、多くのクレームが解決します。",
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
                label="梱包動画の検索画面イメージ（1200×750 推奨）"
                ratio="16/10"
              />
              <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                イメージ画面 — 追跡番号を入力すると、該当の梱包動画がすぐに
                再生される様子を表したものです。
              </figcaption>
            </figure>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
              梱包動画に関するよくある質問
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

          <ConversionCTA locale="ja" title="今すぐ梱包動画を始めましょう" />
        </main>
      </div>
    </>
  );
}
