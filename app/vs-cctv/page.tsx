import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "../site";
import { ComparisonChart, ImagePlaceholder } from "../components/Illustrations";
import { JsonLd, buildBreadcrumb, buildArticle } from "../components/JsonLd";
import { ConversionCTA } from "../components/ConversionCTA";

const PATH = "/vs-cctv";

export const metadata: Metadata = {
  title: "포장영상 vs CCTV - 무엇이 어떻게 다른가요?",
  description:
    "포장영상과 일반 매장 CCTV의 차이를 한눈에 비교합니다. 운송장 번호 검색, 영상 보관 정책, 클레임 대응 시간, 비용 측면에서 어떤 차이가 있는지 알아보세요.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "포장영상 vs CCTV 비교 가이드",
    description:
      "택배 클레임 해결을 위해 CCTV로 충분할까요? 포장영상과 CCTV의 검색 시간, 보관 방식, 증거 능력 차이를 정리했습니다.",
    url: PATH,
  },
};

const TABLE = [
  {
    item: "검색 방식",
    cctv: "촬영 시간대를 추정해 직접 스크러빙",
    pv: "운송장 번호로 1:1 즉시 검색",
  },
  {
    item: "해당 영상 찾는 시간",
    cctv: "평균 30분 ~ 수 시간",
    pv: "평균 3초",
  },
  {
    item: "영상 색인",
    cctv: "타임라인뿐 (메타데이터 없음)",
    pv: "운송장·주문번호·날짜 자동 색인",
  },
  {
    item: "클레임 응대",
    cctv: "직접 영상 잘라 전송, 시간 소요 큼",
    pv: "공유 링크 한 줄로 즉시 전달",
  },
  {
    item: "보관 정책",
    cctv: "보통 7~30일 자동 덮어씀",
    pv: "주문 단위 90일+ 클라우드 보관",
  },
  {
    item: "원격 접근",
    cctv: "DVR/NVR 의존, 장애 시 영상 분실",
    pv: "클라우드 기반, 어디서나 즉시 열람",
  },
  {
    item: "초기 비용",
    cctv: "수백만 원 (DVR + 고용량 HDD + 시공)",
    pv: "0원 (포장대당 월 30,000원)",
  },
  {
    item: "법적 증거 능력",
    cctv: "시점·연결성 입증 어려움",
    pv: "운송장과 1:1 매칭으로 입증 명확",
  },
];

const FAQ = [
  {
    q: "이미 CCTV가 있는데 포장영상이 또 필요한가요?",
    a: "CCTV는 보안과 도난 방지에는 효과적이지만, 특정 주문의 포장 과정을 빠르게 찾기 어렵습니다. 포장영상은 운송장 번호로 즉시 검색되므로 클레임 대응 속도가 비교할 수 없을 만큼 빠릅니다. 두 시스템은 목적이 다르며, 클레임 비용이 큰 셀러에게는 포장영상이 별도로 필요합니다.",
  },
  {
    q: "CCTV 영상도 운송장으로 검색되게 만들 수 있나요?",
    a: "기술적으로 어렵습니다. 일반 CCTV는 시간대 기반 녹화이며 주문 단위 메타데이터를 갖지 않습니다. 포장영상은 처음부터 바코드 스캔과 연동되어 주문-영상이 1:1로 묶이도록 설계되어 있습니다.",
  },
  {
    q: "CCTV보다 포장영상이 더 비싸지 않나요?",
    a: "초기 비용을 비교하면 포장영상이 훨씬 저렴합니다. CCTV는 DVR·HDD·시공비로 수백만 원이 들지만, 포장영상은 포장대 1개 기준 월 30,000원이며 별도 초기 비용이 없습니다. 클레임 1건만 줄여도 한 달 비용이 회수되는 셀러가 대부분입니다.",
  },
];

export default function VsCCTVPage() {
  const today = "2026-06-14T00:00:00.000Z";
  return (
    <>
      <JsonLd
        data={buildBreadcrumb(SITE_URL, [
          { name: "홈", path: "/" },
          { name: "포장영상 vs CCTV", path: PATH },
        ])}
      />
      <JsonLd
        data={buildArticle({
          siteUrl: SITE_URL,
          path: PATH,
          headline: "포장영상 vs CCTV - 무엇이 어떻게 다른가요?",
          description:
            "포장영상과 일반 CCTV의 차이를 검색 시간, 보관 정책, 비용 등 8개 항목으로 비교한 가이드.",
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
          <span className="text-zinc-700 dark:text-zinc-300">포장영상 vs CCTV</span>
        </nav>

        <header className="mb-12">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
            포장영상 vs CCTV
            <br />
            <span className="text-zinc-500">무엇이 어떻게 다른가요?</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            CCTV가 있으니 포장영상은 필요 없다고 생각하시나요? 두 시스템은 목적과
            구조가 완전히 다릅니다. 이 글은 포장영상과 CCTV의 차이를 8개 항목으로
            정리해, 우리 사업장에 어떤 솔루션이 필요한지 판단할 수 있도록 돕습니다.
          </p>
        </header>

        <section className="mb-14">
          <figure className="overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
            <ComparisonChart className="h-auto w-full" />
            <figcaption className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
              제로패킹 자체 측정 평균값. 실제 환경에 따라 달라질 수 있음.
            </figcaption>
          </figure>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            한눈에 보는 8가지 차이
          </h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 text-left dark:bg-zinc-900">
                <tr>
                  <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">항목</th>
                  <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">일반 CCTV</th>
                  <th className="px-4 py-3 font-semibold text-black dark:text-white">포장영상 (제로패킹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {TABLE.map((row) => (
                  <tr key={row.item}>
                    <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">{row.item}</td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{row.cctv}</td>
                    <td className="px-4 py-3 text-zinc-900 dark:text-zinc-100">{row.pv}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            왜 CCTV로는 충분하지 않은가
          </h2>
          <div className="mt-5 space-y-4 text-base leading-7 text-zinc-700 dark:text-zinc-300">
            <p>
              CCTV의 핵심 한계는 "주문 단위 색인"이 없다는 점입니다. 어떤 고객이
              "받은 박스가 비어 있었다"고 클레임을 걸면, CCTV로 대응하려면 다음
              과정을 거쳐야 합니다.
            </p>
            <ol className="list-decimal space-y-2 pl-6">
              <li>운송장 번호로 출고 일자·시각을 추정한다.</li>
              <li>해당 시간대의 CCTV 녹화본을 찾는다.</li>
              <li>그 시간대의 영상에서 "이 박스"를 직접 눈으로 찾는다.</li>
              <li>해당 구간만 잘라 영상으로 변환한다.</li>
              <li>고객에게 전송한다.</li>
            </ol>
            <p>
              한 건당 평균 30분 이상이 소요됩니다. 클레임이 하루 5건이면 주 5일×30분
              ≈ 12시간이 사라집니다. 포장영상은 이 과정을 운송장 번호 입력 → 영상
              링크 복사 → 전송 (약 30초)으로 줄입니다.
            </p>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            포장영상이 적합한 사업장
          </h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              { t: "월 출고 500건 이상", d: "클레임 누적 시 비용 부담이 큰 셀러" },
              { t: "오픈마켓 입점 셀러", d: "쿠팡·11번가·스마트스토어 분쟁 빈번" },
              { t: "고가 상품 취급", d: "전자제품·화장품·식품 등 파손 분쟁 잦음" },
              { t: "다인 포장 환경", d: "포장 직원이 여러 명일 때 책임 추적 필요" },
            ].map((item) => (
              <li key={item.t} className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
                <h3 className="text-base font-semibold text-black dark:text-zinc-50">{item.t}</h3>
                <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{item.d}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-14">
          <figure>
            <ImagePlaceholder
              label="실제 포장영상 검색 화면 vs CCTV 타임라인 화면 비교"
              ratio="16/9"
            />
            <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              (실사 비교 스크린샷 추가 예정)
            </figcaption>
          </figure>
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

        <ConversionCTA title="CCTV로 부족하다면, 포장영상을 시작하세요" />

        <nav aria-label="관련 글" className="mt-14 grid gap-3 sm:grid-cols-2">
          <Link href="/guide" className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">다음 글</span>
            <p className="mt-1 font-semibold text-black dark:text-white">포장영상 도입 가이드</p>
          </Link>
          <Link href="/claim" className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">관련 글</span>
            <p className="mt-1 font-semibold text-black dark:text-white">택배 클레임 해결 방법</p>
          </Link>
        </nav>
      </main>
    </>
  );
}
