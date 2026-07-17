import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, SERVICE_URL, serviceLandingUrl } from "../../site";
import { JsonLd, buildBreadcrumb } from "../../components/JsonLd";
import { ConversionCTA } from "../../components/ConversionCTA";
import { languageAlternates, localePath } from "../../i18n";

const PATH = "/pricing";

export const metadata: Metadata = {
  title: "梱包動画の料金 - 月額4,980円｜誤出荷対策にかかる費用",
  description:
    "誤出荷・クレーム対策の梱包動画はシンプルな単一プラン — 梱包台1台あたり月額4,980円（税別）で、WMS・API連携を含むすべての機能をご利用いただけます。年額払いで17%割引、15日間の無料トライアル。",
  keywords: [
    "梱包動画 料金",
    "誤出荷対策 費用",
    "出荷 録画 システム 価格",
    "梱包動画 いくら",
  ],
  alternates: {
    canonical: localePath("ja", PATH),
    languages: languageAlternates(PATH, ["ko", "ja"]),
  },
  openGraph: {
    title: "梱包動画の料金 - 月額4,980円、全機能込み",
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
  "30GBストレージ容量",
  "顧客向け動画リンク共有",
  "WMS・OMS API連携",
  "Webhookイベント",
  "メールサポート",
];

const FAQ = [
  {
    q: "梱包動画の料金に消費税は含まれていますか？",
    a: "表示価格の4,980円は税別です。日本国内のお客様の消費税の取り扱いおよび請求方法については、お問い合わせいただければ個別にご案内いたします。",
  },
  {
    q: "年額払いの割引はどのくらいですか？",
    a: "年額払いで17%割引となります。月額4,980円が月あたり4,130円に適用され、年額払いの場合は年間49,560円です。",
  },
  {
    q: "無料トライアル後、自動的に課金されますか？",
    a: "いいえ。無料トライアルはカード登録なしで開始でき、15日後に自動課金されることはありません。継続してご利用になる場合は、ご自身でお支払い情報をご登録ください。",
  },
  {
    q: "途中で解約した場合は返金されますか？",
    a: "月額払いは次回のお支払い日に自動終了します。年額払いは未使用期間について日割りでの返金が可能です。",
  },
  {
    q: "梱包台が増えると料金はどうなりますか？",
    a: "梱包台1台単位で追加されます。同じ事業所内の複数の梱包台を同時に運用でき、各梱包台にカメラを1台設置します。例）梱包台3台運用時は月額14,940円。",
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
            "宅配の梱包動画を自動撮影し、クラウドに保管するSaaSサービス。送り状番号で即座に検索。梱包台1台あたり月額4,980円（税別）。",
          provider: { "@type": "Organization", name: "ゼロパッキング", url: SERVICE_URL },
          areaServed: "JP",
          url: "https://www.zeropacking.com/ja",
          offers: {
            "@type": "Offer",
            price: 4980,
            priceCurrency: "JPY",
            url: "https://www.zeropacking.com/ja",
            description: "梱包台1台あたり月額（税別）。年額払いで17%割引。",
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
            プランを比較する必要はありません。梱包台1台あたり月額4,980円で、WMS・API連携を含むすべての機能をご利用いただけます。カード登録なしの15日間無料トライアルでお始めください。
          </p>
        </header>

        <section className="mb-14">
          <article className="relative mx-auto max-w-md rounded-3xl border-2 border-black bg-white p-8 shadow-xl dark:border-white dark:bg-zinc-950">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-300 px-3 py-1 text-xs font-bold text-black">
              全機能込み
            </span>

            <h2 className="text-lg font-bold text-black dark:text-white">梱包動画 単一プラン</h2>

            <div className="mt-5">
              <span className="text-5xl font-bold text-black dark:text-white">4,980円</span>
              <span className="ml-2 text-base text-zinc-500">/ 梱包台 / 月</span>
              <p className="mt-2 text-sm text-zinc-500">税別 · 年額払いで17%割引</p>
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
        </section>

        <section className="mb-14 rounded-3xl bg-zinc-50 p-8 dark:bg-zinc-950 sm:p-10">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            梱包台の台数別の想定料金
          </h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 text-left dark:bg-zinc-900">
                <tr>
                  <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">梱包台の台数</th>
                  <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">月額払い（税別）</th>
                  <th className="px-4 py-3 font-semibold text-emerald-600 dark:text-emerald-400">年額払い（17%割引）</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {[
                  { count: 1, monthly: 4980, yearlyMonthly: 4130 },
                  { count: 2, monthly: 9960, yearlyMonthly: 8260 },
                  { count: 3, monthly: 14940, yearlyMonthly: 12390 },
                  { count: 5, monthly: 24900, yearlyMonthly: 20650 },
                  { count: 10, monthly: 49800, yearlyMonthly: 41300 },
                ].map((row) => (
                  <tr key={row.count}>
                    <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">
                      梱包台 {row.count}台
                    </td>
                    <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                      月 {row.monthly.toLocaleString()}円
                    </td>
                    <td className="px-4 py-3 font-semibold text-emerald-600 dark:text-emerald-400">
                      月 {row.yearlyMonthly.toLocaleString()}円（年 {(row.yearlyMonthly * 12).toLocaleString()}円）
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
              梱包動画の1か月分の料金4,980円は、不当な返金を1件減らすだけで回収できます。平均的なセラーの場合、1〜2か月以内にROIが得られ、クレーム対応の時間削減まで加味すると実質的な効果はさらに大きくなります。
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
