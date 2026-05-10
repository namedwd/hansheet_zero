import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, SERVICE_URL } from "../site";
import { ImagePlaceholder } from "../components/Illustrations";
import { JsonLd, buildBreadcrumb, buildArticle } from "../components/JsonLd";

const PATH = "/guide";

export const metadata: Metadata = {
  title: "포장영상 도입 가이드 - 시작부터 운영까지",
  description:
    "포장영상을 처음 도입하는 셀러를 위한 단계별 가이드. 카메라 설치 위치, 포장대 세팅, 바코드 연동, 직원 교육, 클레임 응대 절차까지 한 페이지에 정리했습니다.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "포장영상 도입 가이드 - 시작부터 운영까지",
    description:
      "포장영상 처음이라면 이 글 한 편으로 충분합니다. 카메라 위치, 바코드 연동, 직원 교육 노하우.",
    url: PATH,
  },
};

const STEPS = [
  {
    n: "01",
    t: "포장대 환경 점검",
    body: "포장 작업 동선이 일정한지, 박스 상단이 카메라에 잘 보이는지 확인합니다. 포장대 위 80~120cm 높이에 카메라를 설치할 수 있는 공간이 필요합니다.",
  },
  {
    n: "02",
    t: "카메라 설치 위치 결정",
    body: "포장대 정중앙 천장 또는 거치대에 카메라를 부착합니다. 박스 안쪽 내용물이 보이도록 약 30~45도 각도로 기울이는 것이 일반적입니다. 그림자가 생기지 않도록 조명도 함께 점검합니다.",
  },
  {
    n: "03",
    t: "바코드 스캐너 연결",
    body: "포장영상 시스템과 호환되는 USB 또는 무선 바코드 스캐너를 연결합니다. 운송장 또는 주문번호 바코드 한 번이면 포장영상 녹화가 자동 시작됩니다.",
  },
  {
    n: "04",
    t: "WMS·OMS 연동 (선택)",
    body: "카페24·고도몰·자체 WMS 등을 사용 중이라면 API 연동으로 운송장 자동 매칭이 가능합니다. 연동 없이도 사용 가능하지만, 연동하면 운영 효율이 크게 올라갑니다.",
  },
  {
    n: "05",
    t: "직원 교육 (10분이면 충분)",
    body: "기존 포장 작업 흐름은 그대로 유지하고, '바코드 한 번 더 스캔'만 추가하면 됩니다. 화면 응답·LED 신호로 녹화 상태를 누구나 확인할 수 있어 학습 부담이 거의 없습니다.",
  },
  {
    n: "06",
    t: "테스트 출고 5건",
    body: "실제 출고 5건을 테스트해 포장영상이 운송장과 정확히 매칭되는지, 화질·각도가 적절한지 확인합니다. 필요 시 카메라 위치를 미세 조정합니다.",
  },
  {
    n: "07",
    t: "클레임 응대 표준 만들기",
    body: "고객 클레임 발생 시 운송장 검색 → 영상 링크 복사 → 카톡/문자 전송 절차를 사내 매뉴얼로 만듭니다. 응대 시간이 평균 30분에서 1분 이내로 줄어듭니다.",
  },
  {
    n: "08",
    t: "운영 데이터 모니터링",
    body: "월별 클레임 건수와 환불 비용을 측정해 포장영상 도입 전후 효과를 정량화합니다. 대부분의 셀러가 1~2개월 안에 ROI를 확인합니다.",
  },
];

const FAQ = [
  {
    q: "포장영상 도입에 며칠이 걸리나요?",
    a: "카메라 설치부터 정상 운영까지 평균 1일이면 충분합니다. WMS 연동을 포함해도 3~5일이면 완료됩니다.",
  },
  {
    q: "포장영상을 위해 별도의 PC가 필요한가요?",
    a: "기존 포장대 PC에 클라이언트만 설치하면 됩니다. 별도 서버나 PC가 필요 없으며, 영상 처리·저장은 모두 클라우드에서 처리됩니다.",
  },
  {
    q: "조명이 부족한 창고에서도 포장영상이 잘 찍히나요?",
    a: "예. 저조도 환경에서도 인식이 가능한 카메라 옵션을 제공합니다. 다만 운송장 글자가 또렷이 보이는 정도의 조명은 권장됩니다.",
  },
];

export default function GuidePage() {
  const today = new Date().toISOString();
  return (
    <>
      <JsonLd
        data={buildBreadcrumb(SITE_URL, [
          { name: "홈", path: "/" },
          { name: "포장영상 도입 가이드", path: PATH },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "포장영상 도입 가이드",
          description:
            "포장영상을 처음 도입하는 셀러를 위한 8단계 가이드. 카메라 설치부터 운영 모니터링까지.",
          step: STEPS.map((s, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            name: s.t,
            text: s.body,
          })),
        }}
      />
      <JsonLd
        data={buildArticle({
          siteUrl: SITE_URL,
          path: PATH,
          headline: "포장영상 도입 가이드 - 시작부터 운영까지",
          description:
            "포장영상 도입을 위한 8단계 체크리스트. 카메라 위치, 바코드 연동, 직원 교육, 클레임 응대 표준화까지.",
          datePublished: today,
          dateModified: today,
        })}
      />

      <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-10 sm:py-24">
        <nav aria-label="현재 위치" className="mb-6 text-sm text-zinc-500">
          <Link href="/" className="hover:text-black dark:hover:text-white">홈</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-700 dark:text-zinc-300">포장영상 도입 가이드</span>
        </nav>

        <header className="mb-12">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-zinc-500">
            가이드 · 8단계
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
            포장영상 도입 가이드
            <br />
            <span className="text-zinc-500">시작부터 운영까지 한 번에</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            포장영상을 처음 도입하는 셀러를 위한 단계별 가이드입니다. 카메라
            설치 위치, 포장대 세팅, 바코드 연동, 직원 교육, 클레임 응대까지
            8개 단계로 정리했습니다. 처음부터 끝까지 따라 하면 1일 안에
            포장영상 운영을 시작할 수 있습니다.
          </p>
        </header>

        <section className="mb-12">
          <figure>
            <ImagePlaceholder
              label="포장대 + 카메라 설치 예시 사진"
              ratio="16/9"
            />
            <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              실제 포장대 카메라 설치 사례 (실사 사진 추가 예정)
            </figcaption>
          </figure>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            8단계 체크리스트
          </h2>
          <ol className="mt-8 space-y-6">
            {STEPS.map((s) => (
              <li key={s.n} className="flex gap-5 border-l-2 border-zinc-200 pl-5 dark:border-zinc-800">
                <span className="flex-none font-mono text-sm font-bold text-zinc-400">
                  {s.n}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-black dark:text-zinc-50">
                    {s.t}
                  </h3>
                  <p className="mt-2 text-base leading-7 text-zinc-700 dark:text-zinc-300">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-14 rounded-3xl bg-zinc-50 p-8 dark:bg-zinc-950 sm:p-10">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            도입 효과 — 평균적인 셀러 기준
          </h2>
          <dl className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <dt className="text-sm font-medium text-zinc-500">클레임 응대 시간</dt>
              <dd className="mt-2 text-3xl font-bold text-black dark:text-white">−95%</dd>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">30분 → 1분 이내</p>
            </div>
            <div>
              <dt className="text-sm font-medium text-zinc-500">부당 환불</dt>
              <dd className="mt-2 text-3xl font-bold text-black dark:text-white">−30%</dd>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">증거 영상으로 종결</p>
            </div>
            <div>
              <dt className="text-sm font-medium text-zinc-500">ROI 회수</dt>
              <dd className="mt-2 text-3xl font-bold text-black dark:text-white">1~2개월</dd>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">대부분의 셀러 기준</p>
            </div>
          </dl>
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

        <section className="rounded-3xl border border-zinc-200 p-8 dark:border-zinc-800">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
            오늘 바로 포장영상을 시작하세요
          </h2>
          <p className="mt-3 text-base leading-7 text-zinc-700 dark:text-zinc-300">
            15일 무료체험으로 카메라 설치 안내부터 클레임 응대까지 직접 경험해
            보세요.
          </p>
          <a
            href={`${SERVICE_URL}/checkout`}
            className="mt-5 inline-flex h-12 items-center justify-center rounded-full bg-black px-7 text-base font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            포장영상 무료체험 신청
          </a>
        </section>

        <nav aria-label="관련 글" className="mt-14 grid gap-3 sm:grid-cols-2">
          <Link href="/api" className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">다음 글</span>
            <p className="mt-1 font-semibold text-black dark:text-white">포장영상 API · WMS 연동</p>
          </Link>
          <Link href="/pricing" className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">관련 글</span>
            <p className="mt-1 font-semibold text-black dark:text-white">포장영상 요금</p>
          </Link>
        </nav>
      </main>
    </>
  );
}
