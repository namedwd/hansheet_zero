import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SITE_URL, SERVICE_URL, STORAGE_GB, inquiryUrl, serviceLandingUrl } from "../site";
import { StepIllustration } from "../components/Illustrations";
import { NeedsFigure } from "../components/NeedsFigure";
import { ConversionCTA } from "../components/ConversionCTA";
import { languageAlternates } from "../i18n";
import { publicMoney } from "../publicPricing";

// 제로패킹과 같은 가격표(app/publicPricing.js)의 금액.
const ZP_PRICE = publicMoney("KRW");

export const metadata: Metadata = {
  title: {
    absolute:
      "포장영상 자동 촬영·운송장 검색·도입 가이드 | 한시트",
  },
  description:
    "포장영상이란 택배 출고 시점의 포장 과정을 촬영한 동영상입니다. 한시트를 운영하는 제로패킹은 포장영상을 자동 촬영하고 운송장 번호로 즉시 검색하여, 출고 당시 상품과 포장 상태를 확인할 수 있도록 돕습니다. 월 30,000원, 15일 무료체험.",
  alternates: {
    canonical: "/",
    languages: languageAlternates("/"),
  },
  openGraph: {
    images: ["/packing-video-hero.webp"],
    title: "포장영상 자동 촬영·운송장 검색 가이드 | 한시트",
    description:
      "택배 포장영상을 자동 촬영·클라우드 보관하고 운송장으로 검색하여 출고 당시 상품과 포장 상태를 확인합니다.",
    url: "/",
    type: "website",
  },
};

const FAQ = [
  {
    q: "포장영상이란 무엇인가요?",
    a: "포장영상은 택배·이커머스 상품의 출고 직전 포장 과정을 녹화한 영상입니다. 어떤 상품이 어떤 상태로 박스에 담겼는지, 운송장이 부착되는 순간까지를 그대로 담아 두기 때문에 고객 클레임이 발생했을 때 객관적인 증거로 활용됩니다.",
  },
  {
    q: "포장영상을 왜 자동으로 촬영해야 하나요?",
    a: "수동 촬영은 누락이 잦고, 영상 파일을 운송장과 매칭해 보관하는 작업도 부담입니다. 자동 포장영상 서비스는 출고 전 스캔으로 촬영을 시작하고 포장 후 다시 스캔해 종료하며, 운송장 번호와 연결해 해당 주문의 영상을 찾을 수 있습니다.",
  },
  {
    q: "포장영상은 몇 개월간 보관되나요?",
    a: "기본 3개월 동안 클라우드에 안전하게 보관됩니다. 더 긴 보관 기간이 필요한 경우 별도 문의로 안내해 드리며, 영상은 HD 화질로 저장됩니다.",
  },
  {
    q: "포장영상으로 어떤 클레임을 해결할 수 있나요?",
    a: "상품 누락, 오배송, 파손, 사이즈·색상 불일치, 빈 박스 수령 주장 등 거의 모든 형태의 택배 분쟁에 대응할 수 있습니다. 포장영상은 출고 사실을 확인하는 자료이며, 처리 결과는 주문 내역과 배송 상황 등 추가 자료에 따라 달라집니다.",
  },
  {
    q: "기존 WMS·OMS와 연동되나요?",
    a: "예. 제로패킹 포장영상은 WMS 연동과 API 제공을 안내하고 있습니다. 사용 중인 시스템과 필요한 연동 범위는 도입 전에 확인해 주세요.",
  },
  {
    q: "포장영상 도입 비용은 얼마인가요?",
    a: `포장대 1개 기준 월 ${ZP_PRICE}(부가세 별도)이며, 연간 결제는 10개월 요금으로 12개월을 이용합니다. 15일 무료체험 후 결제 여부를 결정할 수 있습니다.`,
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: "한시트",
      alternateName: ["Hansheet", "제로패킹"],
      url: SITE_URL,

      description:
        "포장영상으로 택배 클레임을 줄이는 셀러를 위한 가이드 사이트. 운영사 제로패킹의 포장영상 자동 촬영 SaaS를 안내합니다.",
      contactPoint: {
        "@type": "ContactPoint",
        email: "contact@zeropacking.com",
        contactType: "customer service",
        areaServed: "KR",
        availableLanguage: ["Korean"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      url: SITE_URL,
      name: "한시트",
      alternateName: "한시트 포장영상 가이드",
      inLanguage: "ko-KR",
      publisher: { "@id": `${SITE_URL}#organization` },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: "포장영상 자동 촬영 서비스 - 택배 클레임 해결",
      isPartOf: { "@id": `${SITE_URL}#website` },
      about: { "@id": `${SITE_URL}#service` },
      primaryImageOfPage: `${SITE_URL}/packing-video-hero.webp`,
      inLanguage: "ko-KR",
      description:
        "포장영상 자동 촬영으로 택배 파손·오배송·분실 클레임을 운송장 번호 한 번으로 해결하는 서비스 안내.",
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}#service`,
      serviceType: "포장영상 자동 촬영 및 클라우드 보관 서비스",
      name: "제로패킹 포장영상",
      provider: { "@id": `${SITE_URL}#organization` },
      areaServed: "KR",
      url: `${SERVICE_URL}/pricing`,
      description:
        "포장영상을 자동 촬영하고 운송장 번호로 즉시 검색할 수 있도록 클라우드에 보관합니다. 택배 클레임·분쟁 해결을 위한 영상 증거 솔루션입니다. 포장대 1개당 월 30,000원.",
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}#faq`,
      mainEntity: FAQ.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "홈",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "포장영상",
          item: `${SITE_URL}/`,
        },
      ],
    },
  ],
};

export default function Home() {
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
              한시트 · 포장영상 가이드 사이트
            </p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
              포장영상 자동 촬영으로
              <br />
              출고 기록을 주문별로 확인하세요
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              포장영상은 택배 출고 시점의 포장 과정을 그대로 담은 동영상입니다.
              한시트를 운영하는 제로패킹은 모든 포장영상을 자동 촬영하고
              클라우드에 안전하게 보관하여, 운송장 번호 한 번으로 해당 포장영상을
              즉시 찾아 보여 드립니다. 포장영상 촬영은 포장대 카메라 한 대로
              시작되며, 더 이상 파손·오배송·누락 분쟁에 시간을 빼앗기지 마세요.
            </p>

            <figure className="mt-8 overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
              <Image
                src="/packing-video-webtoon.png"
                alt="포장영상으로 부당 클레임을 해결하는 4컷 웹툰 — ① 고객이 '빈 박스가 왔다'며 환불 요구 ② 포장대 카메라가 바코드 스캔과 동시에 포장영상 자동 촬영 ③ 운송장 번호로 포장영상을 조회해 고객에게 전송 ④ 부당 클레임 종결, 고객 만족"
                width={1254}
                height={1254}
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="h-auto w-full"
              />
              <figcaption className="border-t border-zinc-200 bg-white px-4 py-3 text-xs text-zinc-600 dark:border-zinc-800 dark:bg-black dark:text-zinc-400">
                포장영상 활용을 설명한 웹툰입니다. 실제 고객 사례나 처리 결과를 나타내지 않습니다.
              </figcaption>
            </figure>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={inquiryUrl("ko", "hero")}
                target="_blank"
                rel="noopener"
                className="flex h-12 items-center justify-center rounded-full bg-black px-7 text-base font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                포장영상 도입 문의하기
              </a>
              <a
                href={serviceLandingUrl("ko", "hero-trial")}
                className="flex h-12 items-center justify-center rounded-full border border-zinc-200 px-7 text-base font-medium text-black transition-colors hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:text-white dark:hover:bg-zinc-900"
              >
                15일 무료체험 (카드 등록 없음)
              </a>
            </div>
            <p className="mt-3 text-sm text-zinc-500">
              도입 문의를 남기면 제로패킹 담당자가 영업일 1일 내 연락드립니다.
              무료체험은 카드 등록 없이 바로 시작할 수 있습니다.
            </p>
          </header>

          <section className="mb-16 border-t border-zinc-200 pt-12 dark:border-zinc-800">
            <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
              포장영상이란 무엇인가요?
            </h2>
            <div className="mt-5 space-y-4 text-base leading-7 text-zinc-700 dark:text-zinc-300">
              <p>
                포장영상은 이커머스·택배 셀러가 상품을 박스에 담고 운송장을
                부착하는 일련의 포장 과정을 녹화한 영상을 말합니다. 단순한
                CCTV와 달리, 포장영상은 운송장 번호와 1:1로 연결되어 보관되기
                때문에 분쟁이 발생했을 때 해당 주문의 영상을 즉시 찾아낼 수
                있습니다.
              </p>
              <p>
                &quot;상품을 받았는데 비어 있었다&quot;, &quot;잘못된 상품이 왔다&quot;,
                &quot;파손되어 있었다&quot;는 클레임은 셀러에게 가장 큰 비용 중
                하나입니다. 포장영상은 이 모든 주장에 대해 출고 시점의
                객관적인 증거를 제공합니다.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
              왜 포장영상을 자동으로 촬영해야 할까요?
            </h2>
            <ul className="mt-6 space-y-5">
              <li className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
                <h3 className="text-lg font-semibold text-black dark:text-zinc-50">
                  주문별 영상으로 출고 사실 확인
                </h3>
                <p className="mt-2 text-base leading-7 text-zinc-700 dark:text-zinc-300">
                  운송장 번호로 영상을 찾아 상품 종류·수량·포장 상태를 확인하고,
                  고객에게 출고 당시 상황을 설명할 수 있습니다.
                </p>
              </li>
              <li className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
                <h3 className="text-lg font-semibold text-black dark:text-zinc-50">
                  출고 작업과 촬영을 연결
                </h3>
                <p className="mt-2 text-base leading-7 text-zinc-700 dark:text-zinc-300">
                  출고 전 스캔으로 녹화를 시작하고 포장 후 다시 스캔해 종료합니다.
                  작업자는 촬영 상태와 업로드 완료 여부를 확인합니다.
                </p>
              </li>
              <li className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
                <h3 className="text-lg font-semibold text-black dark:text-zinc-50">
                  시간대 대신 운송장 번호로 검색
                </h3>
                <p className="mt-2 text-base leading-7 text-zinc-700 dark:text-zinc-300">
                  제로패킹은 영상을 운송장 번호와 연결해 해당 주문을 찾도록 돕습니다.
                  실제 검색 속도는 네트워크와 사용 환경에서 확인해 보세요.
                </p>
              </li>
              <li className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
                <h3 className="text-lg font-semibold text-black dark:text-zinc-50">
                  환불·재발송 판단에 필요한 기록
                </h3>
                <p className="mt-2 text-base leading-7 text-zinc-700 dark:text-zinc-300">
                  영상과 주문 내역을 대조해 누락·오배송 여부를 확인합니다.
                  도입 효과는 응대 시간과 환불·재발송 비용을 기록해 비교하세요.
                </p>
              </li>
            </ul>
          </section>

          <NeedsFigure locale="ko" />

          <section className="mb-16">
            <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
              포장영상 자동 촬영, 이렇게 작동합니다
            </h2>
            <ol className="mt-6 grid gap-5 sm:grid-cols-2">
              {[
                {
                  n: 1 as const,
                  title: "바코드 스캔으로 포장영상 시작",
                  desc: "출고 직전 운송장 또는 주문 바코드를 스캔하면 포장영상 녹화가 자동으로 시작됩니다.",
                },
                {
                  n: 2 as const,
                  title: "포장 과정 HD 화질로 녹화",
                  desc: "상품 검수, 박스 포장, 운송장 부착의 전 과정이 HD 화질의 포장영상으로 기록됩니다.",
                },
                {
                  n: 3 as const,
                  title: "운송장 번호로 클라우드 자동 색인",
                  desc: "포장 후 다시 스캔하면 녹화가 종료되고 운송장 번호와 함께 클라우드에 저장됩니다.",
                },
                {
                  n: 4 as const,
                  title: "클레임 발생 시 영상 링크 한 줄 전송",
                  desc: "해당 주문의 영상을 확인하고 필요한 장면을 고객과 공유하여 출고 사실을 설명합니다.",
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
                  <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
                    <StepIllustration step={s.n} locale="ko" />
                  </div>
                  <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                    {s.desc}
                  </p>
                </li>
              ))}
            </ol>

            <div className="mt-10 rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
              <h3 className="text-lg font-semibold">무료체험에서 직접 확인할 순서</h3>
              <ol className="mt-4 list-decimal space-y-3 pl-5 leading-7">
                <li>테스트 주문의 바코드를 스캔하고 녹화 시작 여부를 확인합니다.</li>
                <li>상품 라벨·수량·완충재가 가리지 않게 포장한 뒤 다시 스캔합니다.</li>
                <li>업로드 완료 후 같은 주문번호로 검색해 처음부터 끝까지 재생합니다.</li>
                <li>영상 누락, 라벨 식별 여부, 검색 시간과 공유 범위를 확인합니다.</li>
              </ol>
              <p className="mt-4 text-sm text-zinc-500">실제 촬영 환경으로 확인하세요. 조명·카메라 위치·네트워크에 따라 결과가 달라집니다.</p>
            </div>
          </section>

          <section className="mb-16 rounded-3xl bg-zinc-50 p-8 dark:bg-zinc-950 sm:p-10">
            <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
              포장영상 요금
            </h2>
            <p className="mt-3 text-base leading-7 text-zinc-700 dark:text-zinc-300">
              포장대 1개 기준 월 <strong>{ZP_PRICE}</strong> (부가세 별도) ·
              연간 결제는 10개월 요금으로 12개월 이용 · 15일 무료체험.
              <br />
              3개월 클라우드 보관, {STORAGE_GB}GB 저장, HD 화질, 영상 링크 공유 기능 모두 포함. 쇼피파이 매장은 요청하시면 연결해 드립니다.
            </p>
            <p className="mt-4 text-sm text-zinc-500">출처: <a href={SERVICE_URL} className="underline">제로패킹 공식 안내</a> · 확인일 <time dateTime="2026-11-20">2026년 11월 20일</time></p>
            <div className="mt-6">
              <a
                href={`${SERVICE_URL}/pricing`}
                className="inline-flex h-11 items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                포장영상 요금제 자세히 보기
              </a>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
              포장영상에 관해 자주 묻는 질문
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

          <section className="mb-16">
            <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
              포장영상 더 알아보기
            </h2>
            <p className="mt-3 text-base leading-7 text-zinc-700 dark:text-zinc-300">
              도입 전에 꼭 확인하면 좋은 포장영상 가이드와 비교 자료를 정리했습니다.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                { href: "/guide", title: "포장영상 도입 가이드", desc: "카메라 설치부터 운영까지 8단계로 정리한 시작 가이드." },
                { href: "/vs-cctv", title: "포장영상 vs CCTV", desc: "운송장 번호 검색이 왜 CCTV보다 빠른지 8개 항목 비교." },
                { href: "/compare", title: "포장영상 업체 비교", desc: "촬영 방식별 차이와 업체 견적에서 확인할 항목." },
                { href: "/cases", title: "포장영상 도입 사례", desc: "업종별 촬영 항목과 도입 효과를 측정하는 방법." },
                { href: "/claim", title: "택배 클레임 해결", desc: "유형별 클레임 응대 스크립트와 영상 증거 활용법." },
                { href: "/pricing", title: "포장영상 요금", desc: `포장대 1개 월 ${ZP_PRICE}부터, 연간 결제는 10개월 요금으로 12개월 이용.` },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="block h-full rounded-2xl border border-zinc-200 p-5 transition-colors hover:border-black dark:border-zinc-800 dark:hover:border-white"
                  >
                    <p className="font-semibold text-black dark:text-white">{l.title}</p>
                    <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{l.desc}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <ConversionCTA title="지금 포장영상 도입을 시작하세요" />
        </main>
      </div>
    </>
  );
}
