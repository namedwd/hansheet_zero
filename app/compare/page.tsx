import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "../site";
import { ImagePlaceholder } from "../components/Illustrations";
import { JsonLd, buildBreadcrumb, buildArticle } from "../components/JsonLd";
import { ConversionCTA } from "../components/ConversionCTA";

const PATH = "/compare";

export const metadata: Metadata = {
  title: "포장영상 업체 비교 - 가격·기능·보관 한눈에 정리",
  description:
    "포장영상 서비스 4개 유형(제로패킹 + A·B·C사)의 가격, 보관 기간, WMS 연동, API, 약정 조건을 한 표로 비교합니다. 사업장 규모별 추천 매트릭스 포함.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "포장영상 업체 비교 - 가격·기능 한눈에",
    description:
      "포장영상 4개 서비스 유형 비교표 + 사업장 규모별 추천 가이드.",
    url: PATH,
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
    name: "제로패킹",
    badge: "한시트 추천",
    type: "포장영상 전용 SaaS",
    price: "30,000원",
    priceNote: "포장대당 / 월 (VAT 별도)",
    storage: "3개월",
    quality: "HD",
    search: "운송장 번호 즉시 (평균 3초)",
    wms: "✅ 기본 포함",
    api: "✅ REST + Webhook 기본 포함",
    camera: "별도 (USB 웹캠 5~10만원부터 호환)",
    contract: "월 단위 (약정 없음), 연간 결제 시 17% 할인",
    trial: "15일 무료체험 (카드 등록 없음)",
    bestFor: "월 출고 200~5,000건 셀러, 클레임 응대 부담을 줄이고 싶은 경우",
  },
  {
    id: "vendor-a",
    name: "A사 (대형 물류 SaaS)",
    type: "WMS·OMS 종합 패키지의 영상 모듈",
    price: "50,000~80,000원 + α",
    priceNote: "포장대당 / 월, WMS 본 라이선스 별도",
    storage: "1~3개월 (요금제 차등)",
    quality: "HD~FHD",
    search: "운송장 검색 가능 (시스템 통합 후)",
    wms: "✅ 자체 WMS와 강결합",
    api: "✅ 제공 (자체 WMS 우선)",
    camera: "패키지 카메라 별도 구매 권장",
    contract: "12개월 약정 일반, 초기 셋업비 별도",
    trial: "데모/PoC 단위 (영업 협의)",
    bestFor: "월 1만 건 이상 대형 물류 운영, WMS·영상·정산까지 통합 도입할 경우",
  },
  {
    id: "vendor-b",
    name: "B사 (자체 개발형 솔루션)",
    type: "온프레미스 + 카메라 패키지",
    price: "100,000~150,000원",
    priceNote: "포장대당 / 월 + 초기 설치비 100만원~",
    storage: "6개월 (자체 NVR 의존)",
    quality: "FHD",
    search: "DVR 타임라인 검색 (운송장 색인 부분 지원)",
    wms: "△ 별도 모듈 추가 시",
    api: "△ 제한적",
    camera: "전용 IP 카메라 필수 구매 (대당 30~50만원)",
    contract: "12~24개월 약정, 설치비 환불 불가",
    trial: "별도 데모 신청",
    bestFor: "외부 클라우드를 쓸 수 없는 보안 민감 환경, 대형 물류센터",
  },
  {
    id: "vendor-c",
    name: "C사 (스타트업 / 베타)",
    type: "초기 단계 신규 서비스",
    price: "0원~15,000원",
    priceNote: "포장대당 / 월 (베타 기간)",
    storage: "1개월",
    quality: "HD (일부 SD)",
    search: "기본 시간대 검색, 운송장 색인 일부",
    wms: "❌ 미지원 (로드맵)",
    api: "❌ 미지원",
    camera: "스마트폰 또는 USB 웹캠 활용",
    contract: "월 단위, 베타 종료 시 가격 인상 가능",
    trial: "무료 베타",
    bestFor: "월 출고 100건 이하 1인 셀러, 일단 가벼운 도입을 원하는 경우",
  },
];

const RECOMMENDATION = [
  {
    profile: "1인 셀러 (월 100건 이하)",
    pick: "C사 또는 제로패킹",
    why: "초기에는 C사 베타로 시작 가능. 클레임이 늘기 시작하면 즉시 제로패킹으로 이전 권장. 두 서비스 모두 약정이 없어 전환 비용이 낮음.",
  },
  {
    profile: "성장기 셀러 (월 200~5,000건)",
    pick: "제로패킹",
    why: "약정 없는 월 단위, WMS·API 기본 포함, 카메라 자유 선택. 이 규모에서 가장 ROI가 빠르게 나오는 구간.",
  },
  {
    profile: "대형 물류 (월 10,000건 이상)",
    pick: "제로패킹 (다중 포장대) 또는 A사",
    why: "이미 WMS·OMS를 쓰고 있다면 A사 통합 패키지 검토. 영상만 빠르게 도입하려면 제로패킹 다중 포장대가 더 단순하고 저렴.",
  },
  {
    profile: "보안 민감 / 정부·대기업 납품",
    pick: "B사 (온프레미스)",
    why: "외부 클라우드 사용이 제한된 환경에서는 B사처럼 자체 NVR 기반이 적합. 다만 초기 비용·약정 부담을 감수해야 함.",
  },
];

const FAQ = [
  {
    q: "왜 가격에 ‘+α’ 또는 범위가 있나요?",
    a: "A·B사는 패키지 구성이나 약정 기간에 따라 가격이 크게 달라집니다. 본 비교는 시장 일반 자료를 기반으로 한 추정 범위이며, 정확한 견적은 각 사 영업팀에 직접 확인하시기 바랍니다.",
  },
  {
    q: "제로패킹이 추천되는 이유는?",
    a: "한시트는 제로패킹과 같은 운영사이지만, 비교 평가는 객관적 기준(가격, 보관 기간, WMS·API 기본 포함 여부, 약정 조건)으로 진행했습니다. 월 200~5,000건 규모 셀러에게는 비용 대비 효과가 가장 크다는 결론입니다.",
  },
  {
    q: "다른 회사들은 더 좋은 점이 없나요?",
    a: "있습니다. A사는 대형 물류 통합 운영에서, B사는 보안 민감 환경에서, C사는 초기 무료 도입에서 각각 강점이 있습니다. 추천 매트릭스를 참고해 본인 상황에 맞는 선택을 하시면 됩니다.",
  },
  {
    q: "비교 데이터의 출처는 어디인가요?",
    a: "2026년 5월 기준 각 사 공개 자료, 셀러 커뮤니티 후기, 오픈마켓 입점 견적 자료를 종합한 시장 일반 추정치입니다. 정확한 현재 가격은 각 업체에 직접 확인이 필요합니다.",
  },
];

export default function ComparePage() {
  const today = new Date().toISOString();
  return (
    <>
      <JsonLd
        data={buildBreadcrumb(SITE_URL, [
          { name: "홈", path: "/" },
          { name: "포장영상 비교", path: PATH },
        ])}
      />
      <JsonLd
        data={buildArticle({
          siteUrl: SITE_URL,
          path: PATH,
          headline: "포장영상 업체 비교 - 가격·기능·보관 한눈에 정리",
          description:
            "포장영상 4개 서비스 유형의 가격·보관·기능·약정을 비교한 가이드.",
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
        <nav aria-label="현재 위치" className="mb-6 text-sm text-zinc-500">
          <Link href="/" className="hover:text-black dark:hover:text-white">홈</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-700 dark:text-zinc-300">포장영상 비교</span>
        </nav>

        <header className="mb-12">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-zinc-500">
            포장영상 업체 비교
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
            포장영상 서비스 비교
            <br />
            <span className="text-zinc-500">제로패킹 vs A사·B사·C사</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            포장영상을 도입하려는데 어떤 서비스를 골라야 할지 막막하신가요?
            한시트가 시장의 대표적인 포장영상 솔루션 4개 유형을 가격, 보관 기간,
            WMS·API 연동, 약정 조건 등 핵심 항목별로 비교했습니다. 본인 사업장
            규모에 맞는 선택지를 찾아 보세요.
          </p>
          <p className="mt-3 text-xs text-zinc-500">
            본 비교는 2026년 5월 기준 시장 일반 자료를 토대로 한 객관적 분석이며,
            A·B·C사는 카테고리 대표 익명 표기입니다. 정확한 현재 가격은 각 업체에
            직접 확인하시기 바랍니다.
          </p>
        </header>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            한눈에 보는 비교표
          </h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full min-w-[800px] text-sm">
              <thead className="bg-zinc-50 text-left dark:bg-zinc-900">
                <tr>
                  <th className="sticky left-0 bg-zinc-50 px-4 py-3 font-semibold text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                    항목
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
                  { label: "유형", key: "type" as const },
                  { label: "가격", key: "price" as const, secondary: "priceNote" as const },
                  { label: "영상 보관 기간", key: "storage" as const },
                  { label: "녹화 화질", key: "quality" as const },
                  { label: "영상 검색", key: "search" as const },
                  { label: "WMS·OMS 연동", key: "wms" as const },
                  { label: "API·Webhook", key: "api" as const },
                  { label: "카메라", key: "camera" as const },
                  { label: "약정·결제", key: "contract" as const },
                  { label: "무료체험", key: "trial" as const },
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
            각 솔루션 상세 분석
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
                  <strong className="text-black dark:text-white">적합한 셀러:</strong>{" "}
                  {v.bestFor}
                </p>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
                  <div>
                    <dt className="text-zinc-500">가격</dt>
                    <dd className="mt-1 font-semibold text-black dark:text-white">{v.price}</dd>
                  </div>
                  <div>
                    <dt className="text-zinc-500">보관</dt>
                    <dd className="mt-1 font-semibold text-black dark:text-white">{v.storage}</dd>
                  </div>
                  <div>
                    <dt className="text-zinc-500">WMS</dt>
                    <dd className="mt-1 font-semibold text-black dark:text-white">{v.wms}</dd>
                  </div>
                  <div>
                    <dt className="text-zinc-500">약정</dt>
                    <dd className="mt-1 font-semibold text-black dark:text-white">{v.contract.split(",")[0]}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            사업장 규모별 추천 매트릭스
          </h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 text-left dark:bg-zinc-900">
                <tr>
                  <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">사업장 프로필</th>
                  <th className="px-4 py-3 font-semibold text-black dark:text-white">추천</th>
                  <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">이유</th>
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
            도입 결정 시 꼭 확인해야 할 5가지
          </h2>
          <ol className="mt-6 list-decimal space-y-3 pl-5 text-base leading-7 text-zinc-700 dark:text-zinc-300">
            <li>
              <strong className="text-black dark:text-white">총 비용</strong>: 월 요금만 보지 말고
              초기 설치비, 카메라 비용, WMS 모듈 추가비를 모두 합산하세요.
            </li>
            <li>
              <strong className="text-black dark:text-white">약정 기간</strong>: 12개월 약정 제품은
              중도 해지가 어렵습니다. 월 단위 결제가 유연성 면에서 유리합니다.
            </li>
            <li>
              <strong className="text-black dark:text-white">영상 보관 기간</strong>: 클레임은 출고
              후 평균 30일 안에 90% 발생합니다. 최소 3개월 이상이 안전합니다.
            </li>
            <li>
              <strong className="text-black dark:text-white">검색 방식</strong>: 운송장 번호로
              직접 검색되는지 반드시 확인. 시간대 검색만 가능하면 사실상 CCTV와 다를 바 없습니다.
            </li>
            <li>
              <strong className="text-black dark:text-white">무료체험 조건</strong>: 카드 등록 없이
              시작 가능한지, 자동 결제 전환이 없는지 확인하세요.
            </li>
          </ol>
        </section>

        <section className="mb-14">
          <figure>
            <ImagePlaceholder
              label="비교 인포그래픽 또는 4개 솔루션 대시보드 스크린샷"
              ratio="16/9"
            />
            <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              비교 인포그래픽 추가 예정
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

        <ConversionCTA title="비교를 마쳤다면, 제로패킹으로 시작하세요" />

        <nav aria-label="관련 글" className="mt-14 grid gap-3 sm:grid-cols-2">
          <Link href="/vs-cctv" className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">관련 글</span>
            <p className="mt-1 font-semibold text-black dark:text-white">포장영상 vs CCTV</p>
          </Link>
          <Link href="/cases" className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">관련 글</span>
            <p className="mt-1 font-semibold text-black dark:text-white">실제 도입 사례 5건</p>
          </Link>
        </nav>
      </main>
    </>
  );
}
