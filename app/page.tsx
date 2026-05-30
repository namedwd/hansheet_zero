import type { Metadata } from "next";
import { SITE_URL, SERVICE_URL } from "./site";
import {
  HeroIllustration,
  StepIllustration,
  ImagePlaceholder,
} from "./components/Illustrations";
import { ConversionCTA } from "./components/ConversionCTA";

export const metadata: Metadata = {
  title: {
    absolute:
      "한시트 - 포장영상 자동 촬영으로 택배 클레임을 한 번에 해결",
  },
  description:
    "포장영상이란 택배 출고 시점의 포장 과정을 촬영한 동영상입니다. 한시트가 추천하는 제로패킹은 포장영상을 자동 촬영하고 운송장 번호로 즉시 검색하여, 파손·오배송·분실 클레임을 영상 한 편으로 해결합니다. 월 30,000원, 15일 무료체험.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "포장영상 자동 촬영 서비스 - 클레임 분쟁 해결 | 제로패킹",
    description:
      "택배 포장영상을 자동 촬영·클라우드 보관. 운송장으로 즉시 검색하여 클레임을 빠르게 종결합니다.",
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
    a: "수동 촬영은 누락이 잦고, 영상 파일을 운송장과 매칭해 보관하는 작업도 부담입니다. 자동 포장영상 서비스는 바코드 스캔 한 번으로 촬영을 시작·종료하고, 운송장 번호로 자동 색인하여 평균 3초 안에 해당 영상을 찾아냅니다.",
  },
  {
    q: "포장영상은 몇 개월간 보관되나요?",
    a: "기본 3개월 동안 클라우드에 안전하게 보관됩니다. 더 긴 보관 기간이 필요한 경우 별도 문의로 안내해 드리며, 영상은 HD 화질로 저장됩니다.",
  },
  {
    q: "포장영상으로 어떤 클레임을 해결할 수 있나요?",
    a: "상품 누락, 오배송, 파손, 사이즈·색상 불일치, 빈 박스 수령 주장 등 거의 모든 형태의 택배 분쟁에 대응할 수 있습니다. 포장영상 링크를 고객에게 공유하면 대부분의 클레임이 즉시 종결됩니다.",
  },
  {
    q: "기존 WMS·OMS와 연동되나요?",
    a: "예. 제로패킹 포장영상은 표준 API와 바코드 인터페이스를 제공하여 카페24·고도몰·자체 WMS 등 대부분의 시스템과 연동됩니다.",
  },
  {
    q: "포장영상 도입 비용은 얼마인가요?",
    a: "포장대 1개 기준 월 30,000원(부가세 별도)이며, 연간 결제 시 17% 할인됩니다. 15일 무료체험 후 결제 여부를 결정할 수 있습니다.",
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
      logo: `${SITE_URL}/logo.png`,
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
              택배 클레임을 한 번에 해결하세요
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              포장영상은 택배 출고 시점의 포장 과정을 그대로 담은 동영상입니다.
              한시트가 추천하는 제로패킹은 모든 포장영상을 자동 촬영하고
              클라우드에 안전하게 보관하여, 운송장 번호 한 번으로 해당 포장영상을
              즉시 찾아 보여 드립니다. 더 이상 파손·오배송·누락 분쟁에 시간을
              빼앗기지 마세요.
            </p>

            <figure className="mt-8 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
              <HeroIllustration className="h-auto w-full" />
              <figcaption className="border-t border-zinc-200 bg-white px-4 py-3 text-xs text-zinc-600 dark:border-zinc-800 dark:bg-black dark:text-zinc-400">
                포장대 위 카메라가 포장영상을 자동 촬영하여 클라우드에 저장하고,
                운송장 번호로 즉시 검색되는 구조도.
              </figcaption>
            </figure>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={`${SERVICE_URL}/checkout`}
                className="flex h-12 items-center justify-center rounded-full bg-black px-7 text-base font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                15일 무료로 포장영상 시작하기
              </a>
              <a
                href={`${SERVICE_URL}/packing-video`}
                className="flex h-12 items-center justify-center rounded-full border border-zinc-200 px-7 text-base font-medium text-black transition-colors hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:text-white dark:hover:bg-zinc-900"
              >
                포장영상 가이드 보기
              </a>
            </div>
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
                "상품을 받았는데 비어 있었다", "잘못된 상품이 왔다",
                "파손되어 있었다"는 클레임은 셀러에게 가장 큰 비용 중
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
                  분쟁 해결 시간 90% 단축
                </h3>
                <p className="mt-2 text-base leading-7 text-zinc-700 dark:text-zinc-300">
                  운송장 번호로 검색되는 포장영상 링크를 고객에게 보내는 것만으로
                  대부분의 클레임이 즉시 종결됩니다.
                </p>
              </li>
              <li className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
                <h3 className="text-lg font-semibold text-black dark:text-zinc-50">
                  사람이 깜빡해도 영상은 남는다
                </h3>
                <p className="mt-2 text-base leading-7 text-zinc-700 dark:text-zinc-300">
                  바코드 스캔 한 번으로 포장영상이 자동 시작·종료되므로,
                  바쁜 출고 시간에도 영상 누락이 발생하지 않습니다.
                </p>
              </li>
              <li className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
                <h3 className="text-lg font-semibold text-black dark:text-zinc-50">
                  CCTV로는 못 찾는 영상, 3초 만에 검색
                </h3>
                <p className="mt-2 text-base leading-7 text-zinc-700 dark:text-zinc-300">
                  CCTV는 시간대로만 검색되지만, 제로패킹 포장영상은 운송장
                  번호로 색인되어 평균 3초 안에 해당 주문의 영상을 찾아 줍니다.
                </p>
              </li>
              <li className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
                <h3 className="text-lg font-semibold text-black dark:text-zinc-50">
                  반품·환불 비용 감소
                </h3>
                <p className="mt-2 text-base leading-7 text-zinc-700 dark:text-zinc-300">
                  포장영상이 도입된 셀러는 평균적으로 부당 클레임으로 인한
                  반품·환불 비용을 30% 이상 줄였다고 보고합니다.
                </p>
              </li>
            </ul>
          </section>

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
                  desc: "완료된 포장영상은 운송장 번호와 함께 클라우드에 저장되어 누구나 즉시 검색·공유할 수 있습니다.",
                },
                {
                  n: 4 as const,
                  title: "클레임 발생 시 영상 링크 한 줄 전송",
                  desc: "분쟁 발생 시 해당 운송장의 포장영상 링크를 카톡·문자로 보내는 것만으로 대부분의 클레임이 종결됩니다.",
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

            {/* TODO: 사용자가 실사 사진 추가 후 ImagePlaceholder를 next/image 로 교체 */}
            <figure className="mt-10">
              <ImagePlaceholder
                label="실제 포장영상 검색 화면 스크린샷 (1200×750 권장)"
                ratio="16/10"
              />
              <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                실제 포장영상 검색 화면 — 운송장 번호 입력 즉시 해당 포장영상이
                재생됩니다.
              </figcaption>
            </figure>
          </section>

          <section className="mb-16 rounded-3xl bg-zinc-50 p-8 dark:bg-zinc-950 sm:p-10">
            <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
              포장영상 요금
            </h2>
            <p className="mt-3 text-base leading-7 text-zinc-700 dark:text-zinc-300">
              포장대 1개 기준 월 <strong>30,000원</strong> (부가세 별도) ·
              연간 결제 시 17% 할인 · 15일 무료체험.
              <br />
              3개월 클라우드 보관, 30GB 저장, HD 화질, 영상 링크 공유 기능 모두 포함.
            </p>
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

          <ConversionCTA title="지금 포장영상 도입을 시작하세요" />
        </main>
      </div>
    </>
  );
}
