import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, SERVICE_URL } from "../site";
import { JsonLd, buildBreadcrumb } from "../components/JsonLd";

const PATH = "/pricing";

export const metadata: Metadata = {
  title: "포장영상 요금 - 포장대 1개당 월 30,000원, 모든 기능 포함",
  description:
    "제로패킹 포장영상은 단일 요금제 — 포장대 1개당 월 30,000원(부가세 별도)으로 WMS·API 연동을 포함한 모든 기능을 사용할 수 있습니다. 연간 결제 시 17% 할인, 15일 무료체험.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "포장영상 요금 - 월 30,000원, 모든 기능 포함",
    description:
      "단일 요금제로 WMS·API·HD 녹화·3개월 클라우드 보관까지 모두 사용. 카드 등록 없이 무료체험 가능.",
    url: PATH,
  },
};

const FEATURES = [
  "포장영상 자동 촬영",
  "운송장 번호 자동 색인",
  "HD 화질 녹화",
  "3개월 클라우드 보관",
  "30GB 저장 용량",
  "고객 영상 링크 공유",
  "WMS·OMS API 연동",
  "Webhook 이벤트",
  "이메일 지원",
];

const FAQ = [
  {
    q: "포장영상 요금에 부가세가 포함되어 있나요?",
    a: "표시 가격 30,000원은 부가세 별도입니다. 결제 시 부가세 10%가 추가되어 총 33,000원이 청구됩니다.",
  },
  {
    q: "연간 결제 할인은 얼마나 되나요?",
    a: "연간 결제 시 17% 할인됩니다. 월 30,000원이 24,900원으로 적용되어, 연간 결제 시 약 298,800원입니다.",
  },
  {
    q: "무료체험 후 자동으로 결제되나요?",
    a: "아니요. 무료체험은 카드 등록 없이 시작하며, 15일 후 자동 결제되지 않습니다. 계속 이용하시려면 직접 결제 정보를 등록하시면 됩니다.",
  },
  {
    q: "중간에 해지하면 환불되나요?",
    a: "월 결제는 다음 결제일에 자동 종료됩니다. 연간 결제는 미사용 기간에 대해 일할 환불이 가능합니다.",
  },
  {
    q: "포장대가 늘어나면 요금이 어떻게 되나요?",
    a: "포장대 1개 단위로 추가됩니다. 같은 사업장의 여러 포장대를 동시에 운영할 수 있으며, 각 포장대에 카메라 한 대가 설치됩니다. 예) 포장대 3개 운영 시 월 90,000원.",
  },
  {
    q: "WMS나 API 연동도 같은 가격에 포함되나요?",
    a: "예. 모든 기능(WMS 연동, API, Webhook, HD 녹화, 클라우드 보관, 영상 공유)이 단일 요금제에 모두 포함됩니다. 별도 추가 비용이 없습니다.",
  },
  {
    q: "보관 기간을 더 길게 늘릴 수 있나요?",
    a: "기본 보관 기간은 3개월입니다. 더 긴 보관(6개월·12개월)이 필요한 경우 별도 문의 주시면 안내해 드립니다.",
  },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumb(SITE_URL, [
          { name: "홈", path: "/" },
          { name: "포장영상 요금", path: PATH },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: "제로패킹 포장영상",
          description:
            "택배 포장영상을 자동 촬영하고 클라우드에 보관하는 SaaS 서비스. 운송장 번호로 즉시 검색.",
          brand: { "@type": "Brand", name: "제로패킹" },
          offers: {
            "@type": "Offer",
            price: "30000",
            priceCurrency: "KRW",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "30000",
              priceCurrency: "KRW",
              unitText: "포장대 1개 / 월",
            },
            availability: "https://schema.org/InStock",
            url: `${SERVICE_URL}/checkout`,
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
        <nav aria-label="현재 위치" className="mb-6 text-sm text-zinc-500">
          <Link href="/" className="hover:text-black dark:hover:text-white">홈</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-700 dark:text-zinc-300">포장영상 요금</span>
        </nav>

        <header className="mb-12 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-zinc-500">
            요금
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
            단순한 요금, 모든 기능 포함
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            요금제를 비교할 필요가 없습니다. 포장대 1개당 월 30,000원에 WMS·API
            연동을 포함한 모든 기능을 사용할 수 있습니다. 카드 등록 없이 15일
            무료체험으로 시작하세요.
          </p>
        </header>

        <section className="mb-14">
          <article className="relative mx-auto max-w-md rounded-3xl border-2 border-black bg-white p-8 shadow-xl dark:border-white dark:bg-zinc-950">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-300 px-3 py-1 text-xs font-bold text-black">
              모든 기능 포함
            </span>

            <h2 className="text-lg font-bold text-black dark:text-white">포장영상 단일 요금제</h2>

            <div className="mt-5">
              <span className="text-5xl font-bold text-black dark:text-white">30,000원</span>
              <span className="ml-2 text-base text-zinc-500">/ 포장대 / 월</span>
              <p className="mt-2 text-sm text-zinc-500">부가세 별도 · 연간 결제 시 17% 할인</p>
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
              href={`${SERVICE_URL}/checkout`}
              className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-full bg-black px-5 text-base font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              15일 무료체험 시작
            </a>
            <p className="mt-3 text-center text-xs text-zinc-500">
              카드 등록 없이 바로 시작 · 자동 결제 없음
            </p>
          </article>
        </section>

        <section className="mb-14 rounded-3xl bg-zinc-50 p-8 dark:bg-zinc-950 sm:p-10">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            포장대 개수별 예상 요금
          </h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 text-left dark:bg-zinc-900">
                <tr>
                  <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">포장대 수</th>
                  <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">월 결제 (VAT 별도)</th>
                  <th className="px-4 py-3 font-semibold text-emerald-600 dark:text-emerald-400">연간 결제 (17% 할인)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {[
                  { count: 1, monthly: 30000, yearlyMonthly: 24900 },
                  { count: 2, monthly: 60000, yearlyMonthly: 49800 },
                  { count: 3, monthly: 90000, yearlyMonthly: 74700 },
                  { count: 5, monthly: 150000, yearlyMonthly: 124500 },
                  { count: 10, monthly: 300000, yearlyMonthly: 249000 },
                ].map((row) => (
                  <tr key={row.count}>
                    <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">
                      포장대 {row.count}개
                    </td>
                    <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                      월 {row.monthly.toLocaleString()}원
                    </td>
                    <td className="px-4 py-3 font-semibold text-emerald-600 dark:text-emerald-400">
                      월 {row.yearlyMonthly.toLocaleString()}원 (연 {(row.yearlyMonthly * 12).toLocaleString()}원)
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-zinc-500">
            모든 포장대에 동일한 기능(WMS·API·HD 녹화·3개월 보관 등)이 적용됩니다.
          </p>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            포장영상은 비용일까, 투자일까
          </h2>
          <div className="mt-5 space-y-4 text-base leading-7 text-zinc-700 dark:text-zinc-300">
            <p>
              포장영상 한 달 요금 30,000원은 부당 환불 1건만 줄여도 회수됩니다.
              평균적인 셀러 기준 1~2개월 안에 ROI가 발생하며, 클레임 응대
              시간 절감까지 더하면 실질 효과는 훨씬 큽니다.
            </p>
            <p>
              구글 광고로 키워드 1회 클릭당 평균 2만 원 가까이 지출하시는
              경우, 포장영상 한 달 비용은 광고 클릭 1.5회 비용에 불과합니다.
            </p>
          </div>
          <Link
            href="/blog/claim-cost-simulation"
            className="mt-5 inline-flex items-center text-sm font-medium text-black underline dark:text-white"
          >
            월 1,000건 셀러의 클레임 비용 시뮬레이션 보기 →
          </Link>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            요금제 자주 묻는 질문
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

        <section className="rounded-3xl border border-zinc-200 p-8 dark:border-zinc-800">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
            카드 없이 15일 무료체험
          </h2>
          <p className="mt-3 text-base leading-7 text-zinc-700 dark:text-zinc-300">
            결제 정보 등록 없이 포장영상의 모든 기능을 체험할 수 있습니다.
          </p>
          <a
            href={`${SERVICE_URL}/checkout`}
            className="mt-5 inline-flex h-12 items-center justify-center rounded-full bg-black px-7 text-base font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            지금 무료로 시작하기
          </a>
        </section>
      </main>
    </>
  );
}
