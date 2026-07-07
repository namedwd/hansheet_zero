import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "../site";
import { ImagePlaceholder } from "../components/Illustrations";
import { JsonLd, buildBreadcrumb, buildArticle } from "../components/JsonLd";
import { ConversionCTA } from "../components/ConversionCTA";

const PATH = "/claim";

export const metadata: Metadata = {
  title: "택배 클레임 해결 - 포장영상 한 편으로 종결하는 법",
  description:
    "상품 누락, 오배송, 파손, 빈 박스 주장 — 택배 클레임 6가지 유형별 해결 방법과, 포장영상으로 분쟁을 즉시 종결하는 표준 응대 스크립트를 제공합니다.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "택배 클레임 해결 가이드",
    description:
      "포장영상으로 택배 분쟁을 한 편의 영상으로 종결하는 방법과 응대 스크립트.",
    url: PATH,
  },
};

const CASES = [
  {
    type: "상품 누락",
    claim: "상품이 들어 있지 않았어요",
    solution:
      "포장영상에서 상품이 박스에 담기는 장면을 캡처해 링크와 함께 전송. 대부분 즉시 종결됩니다.",
  },
  {
    type: "오배송",
    claim: "다른 상품이 왔어요",
    solution:
      "포장영상에서 운송장과 박스 안 상품이 일치함을 확인 → 영상 링크 전송. 배송 중 분실/교체 가능성을 함께 확인할 근거가 됩니다.",
  },
  {
    type: "파손",
    claim: "박스가 찌그러져서 왔어요",
    solution:
      "포장영상에서 박스가 정상 상태로 출고된 것을 보여주면, 운송 중 사고로 책임이 이전됩니다. 택배사 보상 청구 시 결정적 증거.",
  },
  {
    type: "빈 박스 수령",
    claim: "박스에 아무것도 없었어요",
    solution:
      "포장영상은 상품을 박스에 넣고 봉인하는 전 과정이 녹화되므로, 빈 박스 주장은 즉시 반박 가능합니다.",
  },
  {
    type: "사이즈·색상 불일치",
    claim: "주문한 색이 아니에요",
    solution:
      "포장영상에서 상품의 색·사이즈가 또렷이 보이도록 검수 단계를 녹화. 단순 변심 환불 요청을 차단할 수 있습니다.",
  },
  {
    type: "수량 부족",
    claim: "2개 주문했는데 1개만 왔어요",
    solution:
      "포장영상에서 수량을 확인하는 검수 장면이 핵심 증거. 배송 중 누락 가능성도 함께 확인합니다.",
  },
];

const SCRIPT = [
  {
    step: "1단계 — 클레임 접수",
    body:
      "“불편을 드려 죄송합니다. 운송장 번호로 출고 당시 포장 영상을 바로 확인해 드리겠습니다.”",
  },
  {
    step: "2단계 — 영상 링크 전송",
    body:
      "“[운송장 1234-5678] 포장영상 링크입니다: https://… 박스에 상품이 들어가는 장면 0:35 부근을 확인 부탁드립니다.”",
  },
  {
    step: "3단계 — 후속 조치 안내",
    body:
      "(영상에 문제 없음) “포장영상상 정상 출고가 확인되어, 택배사 측 분실 여부 추가 확인 후 안내드리겠습니다.”\n(실제 누락) “확인해 보니 영상에서 상품이 누락된 것이 맞습니다. 즉시 재발송 처리해 드리겠습니다.”",
  },
];

const FAQ = [
  {
    q: "포장영상으로 모든 클레임이 종결되나요?",
    a: "대부분의 단순 분쟁(누락·빈 박스·파손 주장)은 영상 링크 전송만으로 종결됩니다. 다만 배송 중 사고나 양 측 모두 책임이 있는 경우는 택배사 조사가 추가로 필요합니다.",
  },
  {
    q: "포장영상을 고객에게 보여주면 개인정보 문제가 없나요?",
    a: "포장영상에는 상품과 운송장 라벨만 노출되며, 작업자 얼굴이나 다른 주문 정보는 포함되지 않도록 카메라 각도가 설정됩니다. 운송장 정보는 이미 고객 본인에게 발송된 것이므로 개인정보 추가 노출이 없습니다.",
  },
  {
    q: "오픈마켓 분쟁 조정에 포장영상이 증거로 인정되나요?",
    a: "예. 쿠팡·11번가·스마트스토어 등 주요 오픈마켓의 분쟁 조정 절차에서 포장영상은 결정적 증거로 인정됩니다. 영상에 운송장 번호와 시간이 함께 표시되므로 무결성도 입증됩니다.",
  },
];

export default function ClaimPage() {
  const today = "2026-06-14T00:00:00.000Z";
  return (
    <>
      <JsonLd
        data={buildBreadcrumb(SITE_URL, [
          { name: "홈", path: "/" },
          { name: "택배 클레임 해결", path: PATH },
        ])}
      />
      <JsonLd
        data={buildArticle({
          siteUrl: SITE_URL,
          path: PATH,
          headline: "택배 클레임 해결 - 포장영상 한 편으로 종결하는 법",
          description:
            "택배 클레임 6가지 유형별 대응 방법과 포장영상 기반 표준 응대 스크립트.",
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

      <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-10 sm:py-24">
        <nav aria-label="현재 위치" className="mb-6 text-sm text-zinc-500">
          <Link href="/" className="hover:text-black dark:hover:text-white">홈</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-700 dark:text-zinc-300">택배 클레임 해결</span>
        </nav>

        <header className="mb-12">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-zinc-500">
            클레임 해결 가이드
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
            택배 클레임을
            <br />
            포장영상으로 종결하세요
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            "상품이 안 들어 있었다", "박스가 찌그러져 왔다", "다른 상품이
            왔다" — 셀러라면 누구나 겪는 클레임입니다. 이 글은 택배 클레임 6가지
            유형별 해결 방법과, 포장영상으로 분쟁을 즉시 종결하는 표준 응대
            스크립트를 제공합니다.
          </p>
        </header>

        <section className="mb-14">
          <figure>
            <ImagePlaceholder
              label="포장영상으로 클레임이 즉시 종결되는 카톡 응대 화면 예시"
              ratio="3/2"
            />
            <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              영상 링크 한 줄로 종결되는 분쟁 응대 흐름 (실사 캡처 추가 예정)
            </figcaption>
          </figure>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            택배 클레임 6가지 유형 — 포장영상 대응법
          </h2>
          <ul className="mt-6 space-y-4">
            {CASES.map((c) => (
              <li
                key={c.type}
                className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800"
              >
                <div className="flex items-baseline gap-3">
                  <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-white dark:bg-white dark:text-black">
                    {c.type}
                  </span>
                </div>
                <p className="mt-3 text-sm italic text-zinc-500">
                  고객: “{c.claim}”
                </p>
                <p className="mt-3 text-base leading-7 text-zinc-700 dark:text-zinc-300">
                  <strong className="text-black dark:text-white">포장영상 대응:</strong>{" "}
                  {c.solution}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            표준 응대 스크립트 (복사해서 사용하세요)
          </h2>
          <ol className="mt-6 space-y-5">
            {SCRIPT.map((s) => (
              <li key={s.step} className="rounded-2xl bg-zinc-50 p-5 dark:bg-zinc-950">
                <h3 className="text-base font-semibold text-black dark:text-zinc-50">{s.step}</h3>
                <p className="mt-2 whitespace-pre-line font-mono text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-14 rounded-3xl border border-zinc-200 p-8 dark:border-zinc-800">
          <blockquote className="text-lg italic leading-8 text-zinc-800 dark:text-zinc-200">
            "예전엔 빈 박스 환불 요청 한 건에 30분씩 통화했는데, 포장영상
            도입 후 카톡으로 영상 링크 한 줄만 보내면 끝납니다. 부당 환불도
            확실히 줄었어요."
          </blockquote>
          <p className="mt-4 text-sm text-zinc-500">— 식품 셀러 김OO 대표</p>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            자주 묻는 질문
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

        <ConversionCTA title="오늘부터 클레임 부담을 줄이세요" />

        <nav aria-label="관련 글" className="mt-14 grid gap-3 sm:grid-cols-2">
          <Link href="/vs-cctv" className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">관련 글</span>
            <p className="mt-1 font-semibold text-black dark:text-white">포장영상 vs CCTV</p>
          </Link>
          <Link href="/guide" className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">관련 글</span>
            <p className="mt-1 font-semibold text-black dark:text-white">포장영상 도입 가이드</p>
          </Link>
        </nav>
      </main>
    </>
  );
}
