import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, SERVICE_URL } from "../site";
import { JsonLd, buildBreadcrumb } from "../components/JsonLd";

const PATH = "/pricing";

export const metadata: Metadata = {
  title: "포장영상 요금 - 포장대 1개당 월 30,000원, 15일 무료체험",
  description:
    "제로패킹 포장영상 요금제 안내. 포장대 1개당 월 30,000원(부가세 별도), 연간 결제 시 17% 할인, 15일 무료체험 제공. 모든 요금제에 클라우드 보관·HD 화질·링크 공유 포함.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "포장영상 요금 - 월 30,000원, 15일 무료체험",
    description:
      "제로패킹 포장영상의 투명한 요금제. 포장대 1개 기준, 부가세 별도. 카드 등록 없이 무료체험 가능.",
    url: PATH,
  },
};

const PLANS = [
  {
    name: "스타터",
    price: "30,000",
    unit: "원 / 포장대 / 월",
    badge: null as string | null,
    features: [
      "포장영상 자동 촬영",
      "운송장 번호 자동 색인",
      "HD 화질 녹화",
      "3개월 클라우드 보관",
      "30GB 저장 용량",
      "고객 영상 링크 공유",
      "이메일 지원",
    ],
    cta: "무료체험 시작",
    highlight: false,
  },
  {
    name: "프로",
    price: "55,000",
    unit: "원 / 포장대 / 월",
    badge: "가장 인기",
    features: [
      "스타터의 모든 기능",
      "FHD (1080p) 녹화",
      "6개월 클라우드 보관",
      "100GB 저장 용량",
      "WMS·OMS API 연동",
      "Webhook 이벤트",
      "우선 채팅 지원",
    ],
    cta: "프로 무료체험",
    highlight: true,
  },
  {
    name: "엔터프라이즈",
    price: "맞춤",
    unit: "별도 견적",
    badge: null,
    features: [
      "프로의 모든 기능",
      "12개월+ 보관 (사용자 정의)",
      "무제한 저장 용량",
      "전담 매니저 배정",
      "SLA 99.9% 보장",
      "온프레미스 옵션",
      "맞춤 통합 개발 지원",
    ],
    cta: "도입 문의",
    highlight: false,
  },
];

const FAQ = [
  {
    q: "포장영상 요금에 부가세가 포함되어 있나요?",
    a: "표시 가격은 부가세 별도입니다. 결제 시 부가세 10%가 추가됩니다.",
  },
  {
    q: "연간 결제 할인은 얼마나 되나요?",
    a: "연간 결제 시 17% 할인됩니다. 스타터 기준 월 30,000원이 24,900원으로 적용됩니다.",
  },
  {
    q: "무료체험 후 자동으로 결제되나요?",
    a: "아니요. 무료체험은 카드 등록 없이 시작하며, 15일 후 자동 결제되지 않습니다. 계속 이용하시려면 직접 결제 정보를 등록하시면 됩니다.",
  },
  {
    q: "중간에 해지하면 환불되나요?",
    a: "월 결제는 다음 결제일에 자동 종료됩니다. 연간 결제는 미사용 기간에 대해 일할 환불 가능합니다.",
  },
  {
    q: "포장대가 늘어나면 요금이 어떻게 되나요?",
    a: "포장대 1개 단위로 추가됩니다. 같은 사업장의 여러 포장대를 동시에 운영할 수 있으며, 각 포장대에 카메라 한 대가 설치됩니다.",
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
          offers: PLANS.filter((p) => p.price !== "맞춤").map((p) => ({
            "@type": "Offer",
            name: `${p.name} 요금제`,
            price: p.price.replace(/,/g, ""),
            priceCurrency: "KRW",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: p.price.replace(/,/g, ""),
              priceCurrency: "KRW",
              unitText: "포장대 1개 / 월",
            },
            availability: "https://schema.org/InStock",
            url: `${SERVICE_URL}/checkout`,
          })),
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

      <main className="mx-auto w-full max-w-4xl px-6 py-16 sm:px-10 sm:py-24">
        <nav aria-label="현재 위치" className="mb-6 text-sm text-zinc-500">
          <Link href="/" className="hover:text-black dark:hover:text-white">홈</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-700 dark:text-zinc-300">포장영상 요금</span>
        </nav>

        <header className="mb-12 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-zinc-500">
            요금제
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
            투명한 포장영상 요금
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            포장대 1개 기준 월 30,000원부터. 모든 요금제에 클라우드 보관·HD
            화질·고객 영상 공유 기능이 포함됩니다. 카드 등록 없이 15일 무료체험
            가능합니다.
          </p>
        </header>

        <section className="mb-14 grid gap-5 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <article
              key={plan.name}
              className={`relative flex flex-col rounded-3xl border p-7 ${
                plan.highlight
                  ? "border-black bg-black text-white shadow-xl dark:border-white dark:bg-white dark:text-black"
                  : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
              }`}
            >
              {plan.badge && (
                <span className={`absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-bold ${
                  plan.highlight ? "bg-amber-300 text-black" : "bg-black text-white"
                }`}>
                  {plan.badge}
                </span>
              )}
              <h2 className="text-lg font-bold">{plan.name}</h2>
              <div className="mt-4">
                <span className="text-4xl font-bold">
                  {plan.price === "맞춤" ? "맞춤" : `${plan.price}원`}
                </span>
                <p className={`mt-1 text-sm ${plan.highlight ? "opacity-80" : "text-zinc-500"}`}>
                  {plan.unit} (부가세 별도)
                </p>
              </div>
              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className={plan.highlight ? "text-amber-300" : "text-green-500"}>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href={plan.price === "맞춤" ? "mailto:contact@zeropacking.com" : `${SERVICE_URL}/checkout`}
                className={`mt-7 inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium ${
                  plan.highlight
                    ? "bg-white text-black hover:bg-zinc-100 dark:bg-black dark:text-white dark:hover:bg-zinc-900"
                    : "bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                }`}
              >
                {plan.cta}
              </a>
            </article>
          ))}
        </section>

        <section className="mb-14 rounded-3xl bg-zinc-50 p-8 dark:bg-zinc-950 sm:p-10">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            연간 결제 시 17% 할인
          </h2>
          <p className="mt-3 text-base leading-7 text-zinc-700 dark:text-zinc-300">
            연간 결제를 선택하시면 모든 요금제에서 17% 할인됩니다. 스타터 기준
            월 <s className="text-zinc-500">30,000원</s>{" "}
            <strong className="text-black dark:text-white">24,900원</strong>
            (연 298,800원).
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
              경우, 포장영상 요금은 광고 클릭 1.5회 비용에 불과합니다.
            </p>
          </div>
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
