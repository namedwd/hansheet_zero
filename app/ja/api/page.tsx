import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "../../site";
import { ImagePlaceholder } from "../../components/Illustrations";
import { JsonLd, buildBreadcrumb, buildArticle } from "../../components/JsonLd";
import { ConversionCTA } from "../../components/ConversionCTA";
import { languageAlternates, localePath } from "../../i18n";

const PATH = "/api";

export const metadata: Metadata = {
  title: "梱包動画API・WMS連携 - Shopify、BASE、自社システム対応",
  description:
    "梱包動画を既存のWMS・OMS・ECシステムと連携する方法。標準REST APIとバーコードインターフェースで、Shopify・BASE・futureshop・自社開発システムまですべて対応します。",
  alternates: {
    canonical: localePath("ja", PATH),
    languages: languageAlternates(PATH, ["ko", "ja"]),
  },
  openGraph: {
    title: "梱包動画API・WMS連携ガイド",
    description:
      "標準REST APIで梱包動画を既存のWMS・OMS・ECに統合。送り状番号の自動マッチングと動画リンクの自動送信。",
    url: localePath("ja", PATH),
    locale: "ja_JP",
  },
};

const ENDPOINTS = [
  {
    method: "POST",
    path: "/v1/recordings",
    desc: "送り状番号と一緒に梱包動画の録画開始をリクエスト。バーコードスキャナーの代わりにシステムから直接トリガーする場合に使用。",
  },
  {
    method: "GET",
    path: "/v1/recordings/{trackingNo}",
    desc: "送り状番号で梱包動画のメタデータ（URL、長さ、撮影日時）を取得。",
  },
  {
    method: "GET",
    path: "/v1/recordings/{trackingNo}/share-link",
    desc: "顧客共有用の梱包動画リンクを生成（有効期限の設定が可能）。",
  },
  {
    method: "POST",
    path: "/v1/webhooks",
    desc: "梱包動画の録画完了・アップロード完了イベントをユーザーシステムへプッシュ。",
  },
];

const INTEGRATIONS = [
  { name: "Shopify", desc: "注文発送時に送り状番号を自動マッチング、動画リンクをメモへ自動登録" },
  { name: "BASE", desc: "注文管理 → 発送完了タイミングのトリガーで動画をインデックス" },
  { name: "futureshop", desc: "標準APIで送り状番号の登録時に同期" },
  { name: "メルカリShops", desc: "一括発送後の送り状番号マッピングを自動化" },
  { name: "自社WMS", desc: "REST API + Webhookでどんなシステムとも連携" },
  { name: "ERP（SAP、勘定奉行など）", desc: "発送完了トリガーをERPに接続し、会計締めと連携" },
];

const FAQ = [
  {
    q: "API呼び出しに別途費用はかかりますか？",
    a: "API・Webhookの利用は単一料金プラン（月30,000ウォン／梱包台）に含まれており、一般的なECショップの規模では追加費用は発生しません。呼び出し量が非常に多いエンタープライズ規模の場合は別途お問い合わせいただければご案内いたします。",
  },
  {
    q: "API連携にはどのくらいの開発リソースが必要ですか？",
    a: "REST API標準のため、バックエンドエンジニア1名で0.5〜1日あれば基本連携を完了できます。Shopify・BASEなどの主要ソリューションにはガイド文書を別途ご用意しています。",
  },
  {
    q: "Webhookではどのようなイベントを受け取れますか？",
    a: "録画開始、録画完了、クラウドアップロード完了、動画閲覧発生など主要なライフサイクルイベントをWebhookでプッシュ受信できます。",
  },
];

export default function ApiPage() {
  const today = new Date().toISOString();
  return (
    <>
      <JsonLd
        data={buildBreadcrumb(SITE_URL, [
          { name: "ホーム", path: "/" },
          { name: "API・WMS連携", path: PATH },
        ])}
      />
      <JsonLd
        data={buildArticle({
          siteUrl: SITE_URL,
          path: PATH,
          headline: "梱包動画API・WMS連携",
          description:
            "標準REST APIで梱包動画をShopify・BASE・自社WMSに統合するガイド。",
          datePublished: today,
          dateModified: today,
        })}
      />

      <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-10 sm:py-24">
        <nav aria-label="現在地" className="mb-6 text-sm text-zinc-500">
          <Link href={localePath("ja", "/")} className="hover:text-black dark:hover:text-white">ホーム</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-700 dark:text-zinc-300">API・WMS連携</span>
        </nav>

        <header className="mb-12">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-zinc-500">
            開発者・システム連携
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
            梱包動画API
            <br />
            <span className="text-zinc-500">既存システムにそのまま組み込めます</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            ゼロパッキングは標準REST APIとバーコードインターフェースを提供し、
            Shopify・BASE・futureshop・メルカリShopsから自社開発WMSまで、どんな
            システムとも連携します。送り状番号の自動マッチング、動画リンクの自動
            送信、Webhookイベントの購読まですべて可能です。
          </p>
        </header>

        <section className="mb-14">
          <figure>
            <ImagePlaceholder
              label="API連携ダイアグラム (WMS ↔ 梱包動画 ↔ クラウド)"
              ratio="16/9"
            />
            <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              システム連携ダイアグラム（実写の例は追加予定）
            </figcaption>
          </figure>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            主要エンドポイント
          </h2>
          <ul className="mt-6 space-y-3">
            {ENDPOINTS.map((e) => (
              <li
                key={e.path}
                className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded px-2 py-0.5 font-mono text-xs font-bold ${
                      e.method === "GET"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                        : "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                    }`}
                  >
                    {e.method}
                  </span>
                  <code className="font-mono text-sm text-black dark:text-white">{e.path}</code>
                </div>
                <p className="mt-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">{e.desc}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            例 — 送り状番号で動画を取得
          </h2>
          <pre className="mt-6 overflow-x-auto rounded-2xl bg-zinc-900 p-5 text-sm text-zinc-100">
            <code>{`curl -H "Authorization: Bearer YOUR_TOKEN" \\
  https://api.zeropacking.com/v1/recordings/1234567890

{
  "trackingNo": "1234567890",
  "recordedAt": "2026-05-10T14:23:11+09:00",
  "duration": 47,
  "url": "https://cdn.zeropacking.com/v/abc123",
  "shareLink": "https://zeropacking.com/v/abc123",
  "thumbnail": "https://cdn.zeropacking.com/t/abc123.jpg"
}`}</code>
          </pre>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            対応システム
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {INTEGRATIONS.map((i) => (
              <li key={i.name} className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800">
                <h3 className="text-base font-semibold text-black dark:text-zinc-50">{i.name}</h3>
                <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{i.desc}</p>
              </li>
            ))}
          </ul>
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

        <ConversionCTA locale="ja" title="既存システムとの連携、1対1でご案内します" description="Shopify・BASE・自社WMSなど、どんなシステムとも連携できます。導入のお問い合わせをいただければ、お使いのシステムに合った連携方法をご案内します。" />

        <nav aria-label="関連記事" className="mt-14 grid gap-3 sm:grid-cols-2">
          <Link href={localePath("ja", "/guide")} className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">関連記事</span>
            <p className="mt-1 font-semibold text-black dark:text-white">梱包動画 導入ガイド</p>
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
