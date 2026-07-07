import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "../../site";
import { ImagePlaceholder } from "../../components/Illustrations";
import { JsonLd, buildBreadcrumb, buildArticle } from "../../components/JsonLd";
import { ConversionCTA } from "../../components/ConversionCTA";
import { languageAlternates, localePath } from "../../i18n";

const PATH = "/compare";

export const metadata: Metadata = {
  title: "梱包動画サービス比較 - 価格・機能・保存期間を一覧で整理",
  description:
    "梱包動画サービス4タイプ（ゼロパッキング + A社・B社・C社）の価格、保存期間、WMS連携、API、契約条件を1つの表で比較します。事業規模別のおすすめマトリクス付き。",
  alternates: {
    canonical: localePath("ja", PATH),
    languages: languageAlternates(PATH, ["ko", "ja"]),
  },
  openGraph: {
    title: "梱包動画サービス比較 - 価格・機能を一覧で",
    description:
      "梱包動画4サービスタイプの比較表 + 事業規模別おすすめガイド。",
    url: localePath("ja", PATH),
    locale: "ja_JP",
  },
};

type Vendor = {
  id: string;
  name: string;
  badge?: string;
  type: string;
  price: string;
  priceNote: string;
  storage: string;
  quality: string;
  search: string;
  wms: string;
  api: string;
  camera: string;
  contract: string;
  trial: string;
  bestFor: string;
};

const VENDORS: Vendor[] = [
  {
    id: "zeropacking",
    name: "ゼロパッキング",
    badge: "ハンシートおすすめ",
    type: "梱包動画専用SaaS",
    price: "30,000ウォン",
    priceNote: "梱包台あたり / 月（税別）",
    storage: "3か月",
    quality: "HD",
    search: "送り状番号で即検索（平均3秒）",
    wms: "✅ 標準搭載",
    api: "✅ REST + Webhook標準搭載",
    camera: "別売（USBウェブカメラ5〜10万ウォンから対応）",
    contract: "月単位（契約縛りなし）、年間払いで17%割引",
    trial: "15日間無料体験（カード登録不要）",
    bestFor: "月間出荷200〜5,000件のセラー、クレーム対応の負担を減らしたい場合",
  },
  {
    id: "vendor-a",
    name: "A社（大型物流SaaS）",
    type: "WMS・OMS総合パッケージの動画モジュール",
    price: "50,000〜80,000ウォン + α",
    priceNote: "梱包台あたり / 月、WMS本ライセンス別途",
    storage: "1〜3か月（料金プランにより差あり）",
    quality: "HD〜FHD",
    search: "送り状検索可能（システム統合後）",
    wms: "✅ 自社WMSと強連携",
    api: "✅ 提供（自社WMS優先）",
    camera: "パッケージカメラの別途購入を推奨",
    contract: "12か月契約が一般的、初期セットアップ費別途",
    trial: "デモ/PoC単位（営業相談）",
    bestFor: "月間1万件以上の大型物流運営、WMS・動画・精算まで統合導入する場合",
  },
  {
    id: "vendor-b",
    name: "B社（自社開発型ソリューション）",
    type: "オンプレミス + カメラパッケージ",
    price: "100,000〜150,000ウォン",
    priceNote: "梱包台あたり / 月 + 初期設置費100万ウォン〜",
    storage: "6か月（自社NVR依存）",
    quality: "FHD",
    search: "DVRタイムライン検索（送り状インデックス一部対応）",
    wms: "△ 別途モジュール追加時",
    api: "△ 限定的",
    camera: "専用IPカメラの必須購入（1台30〜50万ウォン）",
    contract: "12〜24か月契約、設置費は返金不可",
    trial: "別途デモ申込",
    bestFor: "外部クラウドを利用できないセキュリティ重視環境、大型物流センター",
  },
  {
    id: "vendor-c",
    name: "C社（スタートアップ / ベータ）",
    type: "初期段階の新規サービス",
    price: "0ウォン〜15,000ウォン",
    priceNote: "梱包台あたり / 月（ベータ期間）",
    storage: "1か月",
    quality: "HD（一部SD）",
    search: "基本の時間帯検索、送り状インデックス一部",
    wms: "❌ 未対応（ロードマップ）",
    api: "❌ 未対応",
    camera: "スマートフォンまたはUSBウェブカメラを活用",
    contract: "月単位、ベータ終了時に値上げの可能性あり",
    trial: "無料ベータ",
    bestFor: "月間出荷100件以下の個人セラー、まずは手軽に導入したい場合",
  },
];

const RECOMMENDATION = [
  {
    profile: "個人セラー（月間100件以下）",
    pick: "C社またはゼロパッキング",
    why: "初期はC社のベータで始められます。クレームが増え始めたら、すぐにゼロパッキングへの移行を推奨。両サービスとも契約縛りがなく、乗り換えコストが低いです。",
  },
  {
    profile: "成長期セラー（月間200〜5,000件）",
    pick: "ゼロパッキング",
    why: "契約縛りのない月単位、WMS・API標準搭載、カメラを自由に選択可能。この規模で最もROIが早く出る領域です。",
  },
  {
    profile: "大型物流（月間10,000件以上）",
    pick: "ゼロパッキング（複数梱包台）またはA社",
    why: "すでにWMS・OMSを使っているならA社の統合パッケージを検討。動画だけを素早く導入するなら、ゼロパッキングの複数梱包台のほうがシンプルで低コストです。",
  },
  {
    profile: "セキュリティ重視 / 官公庁・大企業向け納品",
    pick: "B社（オンプレミス）",
    why: "外部クラウドの利用が制限される環境では、B社のような自社NVRベースが適しています。ただし初期費用・契約の負担を受け入れる必要があります。",
  },
];

const FAQ = [
  {
    q: "なぜ価格に「+α」や範囲があるのですか？",
    a: "A社・B社はパッケージ構成や契約期間によって価格が大きく変わります。本比較は市場の一般資料に基づく推定範囲であり、正確な見積もりは各社の営業チームに直接ご確認ください。",
  },
  {
    q: "ゼロパッキングがおすすめされる理由は？",
    a: "ハンシートはゼロパッキングと同じ運営会社ですが、比較評価は客観的な基準（価格、保存期間、WMS・APIの標準搭載有無、契約条件）で行いました。月間200〜5,000件規模のセラーにとっては、費用対効果が最も大きいという結論です。",
  },
  {
    q: "他社にもっと優れた点はないのですか？",
    a: "あります。A社は大型物流の統合運営で、B社はセキュリティ重視環境で、C社は初期の無料導入で、それぞれに強みがあります。おすすめマトリクスを参考に、ご自身の状況に合った選択をしてください。",
  },
  {
    q: "比較データの出典はどこですか？",
    a: "2026年5月時点の各社公開資料、セラーコミュニティのレビュー、オンラインモール出店の見積もり資料を総合した市場一般の推定値です。正確な現在の価格は各社に直接ご確認ください。",
  },
];

export default function ComparePage() {
  const today = "2026-06-14T00:00:00.000Z";
  return (
    <>
      <JsonLd
        data={buildBreadcrumb(SITE_URL, [
          { name: "ホーム", path: "/" },
          { name: "梱包動画比較", path: PATH },
        ])}
      />
      <JsonLd
        data={buildArticle({
          siteUrl: SITE_URL,
          path: PATH,
          headline: "梱包動画サービス比較 - 価格・機能・保存期間を一覧で整理",
          description:
            "梱包動画4サービスタイプの価格・保存・機能・契約を比較したガイド。",
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

      <main className="mx-auto w-full max-w-4xl px-6 py-16 sm:px-10 sm:py-24">
        <nav aria-label="現在の位置" className="mb-6 text-sm text-zinc-500">
          <Link href={localePath("ja", "/")} className="hover:text-black dark:hover:text-white">ホーム</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-700 dark:text-zinc-300">梱包動画比較</span>
        </nav>

        <header className="mb-12">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-zinc-500">
            梱包動画サービス比較
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
            梱包動画サービス比較
            <br />
            <span className="text-zinc-500">ゼロパッキング vs A社・B社・C社</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            梱包動画を導入したいけれど、どのサービスを選べばよいか迷っていませんか？
            ハンシートが市場を代表する梱包動画ソリューション4タイプを、価格、保存期間、
            WMS・API連携、契約条件など、重要な項目ごとに比較しました。ご自身の事業
            規模に合った選択肢を見つけてください。
          </p>
          <p className="mt-3 text-xs text-zinc-500">
            本比較は2026年5月時点の市場一般資料をもとにした客観的な分析であり、
            A社・B社・C社はカテゴリー代表の匿名表記です。正確な現在の価格は各社に
            直接ご確認ください。
          </p>
        </header>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            一覧で見る比較表
          </h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full min-w-[800px] text-sm">
              <thead className="bg-zinc-50 text-left dark:bg-zinc-900">
                <tr>
                  <th className="sticky left-0 bg-zinc-50 px-4 py-3 font-semibold text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                    項目
                  </th>
                  {VENDORS.map((v) => (
                    <th
                      key={v.id}
                      className={`px-4 py-3 font-semibold ${
                        v.badge
                          ? "bg-amber-50 text-black dark:bg-amber-950/30 dark:text-white"
                          : "text-zinc-700 dark:text-zinc-300"
                      }`}
                    >
                      <div className="flex flex-col gap-1">
                        <span>{v.name}</span>
                        {v.badge && (
                          <span className="inline-flex w-fit rounded-full bg-amber-300 px-2 py-0.5 text-[10px] font-bold text-black">
                            {v.badge}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {[
                  { label: "タイプ", key: "type" as const },
                  { label: "価格", key: "price" as const, secondary: "priceNote" as const },
                  { label: "動画保存期間", key: "storage" as const },
                  { label: "録画画質", key: "quality" as const },
                  { label: "動画検索", key: "search" as const },
                  { label: "WMS・OMS連携", key: "wms" as const },
                  { label: "API・Webhook", key: "api" as const },
                  { label: "カメラ", key: "camera" as const },
                  { label: "契約・支払い", key: "contract" as const },
                  { label: "無料体験", key: "trial" as const },
                ].map((row) => (
                  <tr key={row.label}>
                    <td className="sticky left-0 bg-white px-4 py-3 font-medium text-zinc-900 dark:bg-black dark:text-zinc-100">
                      {row.label}
                    </td>
                    {VENDORS.map((v) => (
                      <td
                        key={v.id}
                        className={`px-4 py-3 align-top ${
                          v.badge
                            ? "bg-amber-50/50 text-zinc-900 dark:bg-amber-950/10 dark:text-zinc-100"
                            : "text-zinc-700 dark:text-zinc-300"
                        }`}
                      >
                        <div className="font-medium">{v[row.key]}</div>
                        {"secondary" in row && row.secondary && (
                          <div className="mt-1 text-xs text-zinc-500">
                            {v[row.secondary]}
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            各ソリューションの詳細分析
          </h2>
          <ul className="mt-6 space-y-5">
            {VENDORS.map((v) => (
              <li
                key={v.id}
                className={`rounded-2xl border p-6 ${
                  v.badge
                    ? "border-black bg-white shadow-md dark:border-white dark:bg-zinc-950"
                    : "border-zinc-200 dark:border-zinc-800"
                }`}
              >
                <div className="mb-2 flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-bold text-black dark:text-white">{v.name}</h3>
                  {v.badge && (
                    <span className="rounded-full bg-amber-300 px-2 py-0.5 text-[10px] font-bold text-black">
                      {v.badge}
                    </span>
                  )}
                  <span className="text-xs text-zinc-500">{v.type}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                  <strong className="text-black dark:text-white">適したセラー：</strong>{" "}
                  {v.bestFor}
                </p>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
                  <div>
                    <dt className="text-zinc-500">価格</dt>
                    <dd className="mt-1 font-semibold text-black dark:text-white">{v.price}</dd>
                  </div>
                  <div>
                    <dt className="text-zinc-500">保存</dt>
                    <dd className="mt-1 font-semibold text-black dark:text-white">{v.storage}</dd>
                  </div>
                  <div>
                    <dt className="text-zinc-500">WMS</dt>
                    <dd className="mt-1 font-semibold text-black dark:text-white">{v.wms}</dd>
                  </div>
                  <div>
                    <dt className="text-zinc-500">契約</dt>
                    <dd className="mt-1 font-semibold text-black dark:text-white">{v.contract.split("、")[0]}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            事業規模別おすすめマトリクス
          </h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 text-left dark:bg-zinc-900">
                <tr>
                  <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">事業プロフィール</th>
                  <th className="px-4 py-3 font-semibold text-black dark:text-white">おすすめ</th>
                  <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">理由</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {RECOMMENDATION.map((r) => (
                  <tr key={r.profile}>
                    <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">{r.profile}</td>
                    <td className="px-4 py-3 font-bold text-black dark:text-white">{r.pick}</td>
                    <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">{r.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-14 rounded-3xl bg-zinc-50 p-8 dark:bg-zinc-950 sm:p-10">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            導入を決める際に必ず確認すべき5つのこと
          </h2>
          <ol className="mt-6 list-decimal space-y-3 pl-5 text-base leading-7 text-zinc-700 dark:text-zinc-300">
            <li>
              <strong className="text-black dark:text-white">総コスト</strong>：月額料金だけを見ず、
              初期設置費、カメラ費用、WMSモジュール追加費をすべて合算してください。
            </li>
            <li>
              <strong className="text-black dark:text-white">契約期間</strong>：12か月契約の製品は
              途中解約が難しいです。月単位の支払いのほうが柔軟性の面で有利です。
            </li>
            <li>
              <strong className="text-black dark:text-white">動画保存期間</strong>：クレームの多くは
              1か月以内に寄せられますが、交換・再配送・遅れて来るクレームはその後も発生します。CCTV（7〜30日で上書き）や
              保管1か月のサービスでは見逃しやすいため、ゼロパッキングのように3か月保管されるか確認しましょう。
            </li>
            <li>
              <strong className="text-black dark:text-white">検索方法</strong>：送り状番号で
              直接検索できるか必ず確認してください。時間帯検索しかできない場合、実質的にCCTVと変わりません。
            </li>
            <li>
              <strong className="text-black dark:text-white">無料体験の条件</strong>：カード登録なしで
              始められるか、自動課金への切り替えがないか確認してください。
            </li>
          </ol>
        </section>

        <section className="mb-14">
          <figure>
            <ImagePlaceholder
              label="比較インフォグラフィックまたは4ソリューションのダッシュボードスクリーンショット"
              ratio="16/9"
            />
            <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              比較インフォグラフィックを追加予定
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

        <ConversionCTA locale="ja" title="比較を終えたら、ゼロパッキングで始めましょう" />

        <nav aria-label="関連記事" className="mt-14 grid gap-3 sm:grid-cols-2">
          <Link href={localePath("ja", "/vs-cctv")} className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">関連記事</span>
            <p className="mt-1 font-semibold text-black dark:text-white">梱包動画 vs CCTV</p>
          </Link>
          <Link href={localePath("ja", "/cases")} className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">関連記事</span>
            <p className="mt-1 font-semibold text-black dark:text-white">実際の導入事例5件</p>
          </Link>
        </nav>
      </main>
    </>
  );
}
