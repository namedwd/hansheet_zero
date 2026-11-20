import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, SERVICE_URL, STORAGE_GB, serviceLandingUrl, storageNote } from "../../../site";
import { JsonLd, buildBreadcrumb } from "../../../components/JsonLd";
import { ConversionCTA } from "../../../components/ConversionCTA";
import { languageAlternates, localePath } from "../../../i18n";
import { PAYMENT_GUIDANCE, publicMoney, publicPrice } from "../../../publicPricing";
import { PaymentNote, StationPriceTable } from "../../../components/Pricing";

// 금액과 결제 안내는 app/publicPricing.js(제로패킹과 같은 가격표)에서만 가져옵니다.
const CURRENCY = "JPY";
const PRICE = publicMoney(CURRENCY);
const ANNUAL = publicMoney(CURRENCY, "yearly");
const PAY = PAYMENT_GUIDANCE.ja;
const ANNUAL_LINE = PAY.annual.replace("{price}", ANNUAL);

const PATH = "/pricing";

export const metadata: Metadata = {
  title: `梱包動画の料金 - 月額${PRICE}｜誤出荷対策にかかる費用`,
  description:
    `誤出荷・クレーム対策の梱包動画はシンプルな単一プラン — 梱包台1台あたり月額${PRICE}で、WMS・API連携を含むすべての機能をご利用いただけます。年間プランは10か月分の料金で12か月利用、15日間の無料トライアル。`,
  keywords: [
    "梱包動画 料金",
    "誤出荷対策 費用",
    "出荷 録画 システム 価格",
    "梱包動画 いくら",
  ],
  alternates: {
    canonical: localePath("ja", PATH),
    languages: languageAlternates(PATH),
  },
  openGraph: {
    images: ["/packing-video-hero.webp"],
    title: `梱包動画の料金 - 月額${PRICE}、全機能込み`,
    description:
      "単一プランでWMS・API・HD録画・3か月クラウド保管まですべてご利用可能。カード登録なしで無料トライアルできます。",
    url: localePath("ja", PATH),
    locale: "ja_JP",
  },
};

const FEATURES = [
  "梱包動画の自動撮影",
  "送り状番号の自動インデックス",
  "HD画質録画",
  "3か月クラウド保管",
  `${STORAGE_GB}GBストレージ容量`,
  "顧客向け動画リンク共有",
  "WMS・OMS API連携",
  "Shopify連携（ご依頼で接続）",
  "Webhookイベント",
  "メールサポート",
];

const FAQ = [
  {
    q: "梱包動画の料金に消費税は含まれていますか？",
    a: PAY.tax,
  },
  {
    q: "年間プランの料金はいくらですか？",
    a: `年間プランは10か月分の料金（${ANNUAL}）で12か月ご利用いただけます。`,
  },
  {
    q: "無料トライアル後、自動的に課金されますか？",
    a: `いいえ。無料トライアルはカード登録なしで開始できます。${PAY.body}`,
  },
  {
    q: "途中で解約した場合は返金されますか？",
    a: "月額プランは、その利用期間の残りについての返金はありません。年間プランの返金額は「お支払い金額 −（月額定価 × 利用月数）」で、利用月数は月単位で切り上げます。お支払いから7日以内でサービスを利用していない場合は、全額返金を請求できます。",
  },
  {
    q: "梱包台が増えると料金はどうなりますか？",
    a: `梱包台1台単位で追加されます。同じ事業所内の複数の梱包台を同時に運用でき、各梱包台にカメラを1台設置します。例）梱包台3台運用時は月額${publicMoney(CURRENCY, "monthly", 3)}。`,
  },
  {
    q: "WMSやAPI連携も同じ価格に含まれますか？",
    a: "はい。すべての機能（WMS連携、API、Webhook、HD録画、クラウド保管、動画共有）が単一プランにすべて含まれます。別途の追加費用はありません。",
  },
  {
    q: "保管期間をさらに長く延長できますか？",
    a: "基本の保管期間は3か月です。より長い保管（6か月・12か月）が必要な場合は、別途お問い合わせいただければご案内いたします。",
  },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumb(SITE_URL, [
          { name: "ホーム", path: localePath("ja", "/") },
          { name: "梱包動画の料金", path: localePath("ja", PATH) },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "梱包動画の自動撮影およびクラウド保管サービス",
          name: "ゼロパッキング 梱包動画",
          description:
            `宅配の梱包動画を自動撮影し、クラウドに保管するSaaSサービス。送り状番号で即座に検索。梱包台1台あたり月額${PRICE}。`,
          provider: { "@type": "Organization", name: "ゼロパッキング", url: SERVICE_URL },
          areaServed: "JP",
          url: "https://www.zeropacking.com/ja",
          offers: {
            "@type": "Offer",
            price: publicPrice(CURRENCY),
            priceCurrency: CURRENCY,
            url: "https://www.zeropacking.com/ja",
            description: "梱包台1台あたりの月額。年間プランは10か月分の料金で12か月利用。",
          },
        }}
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
          <span className="text-zinc-700 dark:text-zinc-300">梱包動画の料金</span>
        </nav>

        <header className="mb-12 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-zinc-500">
            料金
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
            シンプルな料金、全機能込み
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            プランを比較する必要はありません。梱包台1台あたり月額{PRICE}で、WMS・API連携を含むすべての機能をご利用いただけます。カード登録なしの15日間無料トライアルでお始めください。
          </p>
        </header>

        <section className="mb-14">
          <article className="relative mx-auto max-w-md rounded-3xl border-2 border-black bg-white p-8 shadow-xl dark:border-white dark:bg-zinc-950">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-300 px-3 py-1 text-xs font-bold text-black">
              全機能込み
            </span>

            <h2 className="text-lg font-bold text-black dark:text-white">梱包動画 単一プラン</h2>

            <div className="mt-5">
              <span className="text-5xl font-bold text-black dark:text-white">{PRICE}</span>
              <span className="ml-2 text-base text-zinc-500">/ 梱包台 / 月</span>
              <p className="mt-2 text-sm text-zinc-500">{ANNUAL_LINE}</p>
              <p className="mt-2 text-sm text-zinc-500">複数台・大規模運用のお見積りはお問い合わせください。</p>
            </div>

            <ul className="mt-7 space-y-3 text-sm">
              {FEATURES.map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="text-emerald-500">✓</span>
                  <span className="text-zinc-800 dark:text-zinc-200">{f}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-5 text-zinc-500 dark:text-zinc-400" data-storage-note>
              {storageNote("ja")}
            </p>

            <a
              href={serviceLandingUrl("ja", "pricing-trial")}
              target="_blank"
              rel="noopener"
              className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-full bg-black px-5 text-base font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              15日間の無料トライアルを始める
            </a>
            <p className="mt-3 text-center text-xs text-zinc-500">
              カード登録なしですぐに開始 · 自動課金なし
            </p>
          </article>
          <PaymentNote language="ja" />
        </section>

        <section className="mb-14 rounded-3xl bg-zinc-50 p-8 dark:bg-zinc-950 sm:p-10">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            梱包台の台数別の想定料金
          </h2>
          <StationPriceTable
            currency={CURRENCY}
            head={["梱包台の台数", "月額プラン", "年間プラン（12か月利用）"]}
            stations={(count) => `梱包台 ${count}台`}
          />
          <p className="mt-4 text-sm text-zinc-500">
            すべての梱包台に同一の機能（WMS・API・HD録画・3か月保管など）が適用されます。
          </p>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            梱包動画はコストか、投資か
          </h2>
          <div className="mt-5 space-y-4 text-base leading-7 text-zinc-700 dark:text-zinc-300">
            <p>
              梱包動画の1か月分の料金{PRICE}は、不当な返金を1件減らすだけで回収できます。平均的なセラーの場合、1〜2か月以内にROIが得られ、クレーム対応の時間削減まで加味すると実質的な効果はさらに大きくなります。
            </p>
            <p>
              リスティング広告のクリック数回分にも満たない金額で、出荷1件ごとの客観的な証拠が残ります。
            </p>
          </div>
          <p className="mt-5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            月1,000件のセラーを想定したクレーム費用のシミュレーションもご用意しています。
          </p>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            料金に関するよくある質問
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

        <ConversionCTA locale="ja" title="料金をご確認いただけたら、導入はこのように進みます" />
      </main>
    </>
  );
}
