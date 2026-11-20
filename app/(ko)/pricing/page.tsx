import type { Metadata } from "next";
import { languageAlternates } from "../../i18n";
import Link from "next/link";
import { SITE_URL, SERVICE_URL, STORAGE_GB } from "../../site";
import { JsonLd, buildBreadcrumb } from "../../components/JsonLd";
import { ConversionCTA } from "../../components/ConversionCTA";
import { publicMoney, publicPrice } from "../../publicPricing";
import { StationPriceTable } from "../../components/Pricing";

// 금액은 app/publicPricing.js(제로패킹과 같은 가격표)에서만 가져옵니다.
const CURRENCY = "KRW";
const PRICE = publicMoney(CURRENCY);
const ANNUAL = publicMoney(CURRENCY, "yearly");
// 부가세 10%를 더한 월 결제 금액.
const PRICE_WITH_VAT = `${Math.round(publicPrice(CURRENCY) * 1.1).toLocaleString("en-US")}원`;

const PATH = "/pricing";

export const metadata: Metadata = {
  title: `포장영상 요금 - 포장대 1개당 월 ${PRICE}, 모든 기능 포함`,
  description:
    `제로패킹 포장영상은 단일 요금제 — 포장대 1개당 월 ${PRICE}(부가세 별도)으로 WMS·API 연동을 포함한 모든 기능을 사용할 수 있습니다. 연간 결제는 10개월 요금으로 12개월 이용, 15일 무료체험.`,
  alternates: { canonical: PATH, languages: languageAlternates(PATH) },
  openGraph: {
    images: ["/packing-video-hero.webp"],
    title: `포장영상 요금 - 월 ${PRICE}, 모든 기능 포함`,
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
  `${STORAGE_GB}GB 저장 용량`,
  "고객 영상 링크 공유",
  "WMS·OMS API 연동",
  "쇼피파이 연동(요청 시 연결)",
  "Webhook 이벤트",
  "이메일 지원",
];

const FAQ = [
  {
    q: "포장영상 요금에 부가세가 포함되어 있나요?",
    a: `표시 가격 ${PRICE}은 부가세 별도입니다. 결제 시 부가세 10%가 추가되어 총 ${PRICE_WITH_VAT}이 청구됩니다.`,
  },
  {
    q: "연간 결제 요금은 얼마인가요?",
    a: `연간 결제는 10개월 요금(${ANNUAL}, 부가세 별도)으로 12개월을 이용합니다.`,
  },
  {
    q: "무료체험 후 자동으로 결제되나요?",
    a: "아니요. 무료체험은 카드 등록 없이 시작하며, 15일 후 자동 결제되지 않습니다. 계속 이용하시려면 직접 결제 정보를 등록하시면 됩니다.",
  },
  {
    q: "중간에 해지하면 환불되나요?",
    a: "월 결제는 해당 이용 기간의 남은 기간에 대한 환불이 없습니다. 연간 결제는 결제 금액에서 '월 정가 × 이용 개월 수'를 뺀 금액을 환불하며, 이용 개월 수는 월 단위로 올림합니다. 결제일로부터 7일 이내이고 서비스를 이용하지 않았다면 전액 환불을 요청할 수 있습니다.",
  },
  {
    q: "포장대가 늘어나면 요금이 어떻게 되나요?",
    a: `포장대 1개 단위로 추가됩니다. 같은 사업장의 여러 포장대를 동시에 운영할 수 있으며, 각 포장대에 카메라 한 대가 설치됩니다. 예) 포장대 3개 운영 시 월 ${publicMoney(CURRENCY, "monthly", 3)}.`,
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
          "@type": "Service",
          serviceType: "포장영상 자동 촬영 및 클라우드 보관 서비스",
          name: "제로패킹 포장영상",
          description:
            `택배 포장영상을 자동 촬영하고 클라우드에 보관하는 SaaS 서비스. 운송장 번호로 즉시 검색. 포장대 1개당 월 ${PRICE}(부가세 별도).`,
          provider: { "@type": "Organization", name: "제로패킹", url: SERVICE_URL },
          areaServed: "KR",
          url: `${SERVICE_URL}/checkout`,
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
            요금제를 비교할 필요가 없습니다. 포장대 1개당 월 {PRICE}에 WMS·API
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
              <span className="text-5xl font-bold text-black dark:text-white">{PRICE}</span>
              <span className="ml-2 text-base text-zinc-500">/ 포장대 / 월</span>
              <p className="mt-2 text-sm text-zinc-500">부가세 별도 · 연간 결제는 {ANNUAL}으로 12개월 이용</p>
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
          <StationPriceTable
            currency={CURRENCY}
            head={["포장대 수", "월 결제 (VAT 별도)", "연간 결제 (12개월 이용, VAT 별도)"]}
            stations={(count) => `포장대 ${count}개`}
          />
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
              포장영상 한 달 요금 {PRICE}은 부당 환불 1건만 줄여도 회수됩니다.
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

        <ConversionCTA title="요금이 확인됐다면, 도입은 이렇게 진행됩니다" />
      </main>
    </>
  );
}
