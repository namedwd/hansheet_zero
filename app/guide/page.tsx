import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SITE_URL } from "../site";
import { JsonLd, buildBreadcrumb, buildArticle } from "../components/JsonLd";
import { ConversionCTA } from "../components/ConversionCTA";

const PATH = "/guide";

export const metadata: Metadata = {
  title: "포장영상 도입 가이드 2026 - 카메라 설치부터 운영까지 완벽 정리",
  description:
    "포장영상을 처음 도입하는 셀러를 위한 2026년 최신 단계별 가이드. 카메라 설치 위치·각도, 포장대 세팅, 바코드 연동, 직원 교육, 클레임 응대, 업종별 도입 포인트까지 한 페이지에 정리했습니다.",
  keywords: [
    "포장영상 도입",
    "포장영상 설치",
    "포장영상 카메라 위치",
    "포장영상 시작",
    "포장 영상 자동 촬영 설치",
    "포장대 카메라 설치",
    "택배 포장영상 도입 방법",
  ],
  alternates: { canonical: PATH },
  openGraph: {
    title: "포장영상 도입 가이드 2026 - 카메라 설치부터 운영까지",
    description:
      "포장영상 처음이라면 이 글 한 편으로 충분합니다. 카메라 위치·각도, 바코드 연동, 직원 교육, 업종별 도입 포인트.",
    url: PATH,
  },
};

const STEPS = [
  {
    n: "01",
    t: "포장대 환경 점검",
    body: "포장 작업 동선이 일정한지, 박스 상단이 카메라에 잘 보이는지 확인합니다. 포장대 위 80~120cm 높이에 카메라를 설치할 수 있는 공간이 필요합니다.",
    tip: "흔한 실수 — 포장대를 자주 옮기는 환경에서 카메라만 고정하면 촬영 영역을 벗어납니다. 포장대 위치를 먼저 고정하세요.",
  },
  {
    n: "02",
    t: "카메라 설치 위치 결정",
    body: "포장대 정중앙 천장 또는 거치대에 카메라를 부착합니다. 박스 안쪽 내용물이 보이도록 약 30~45도 각도로 기울이는 것이 일반적입니다. 그림자가 생기지 않도록 조명도 함께 점검합니다.",
    tip: "체크포인트 — 천장에 직각(90도)으로 달면 박스 안쪽이 안 보입니다. 30~45도 기울임 + 카메라 옆 보조 조명이 정답입니다.",
  },
  {
    n: "03",
    t: "바코드 스캐너 연결",
    body: "포장영상 시스템과 호환되는 USB 또는 무선 바코드 스캐너를 연결합니다. 운송장 또는 주문번호 바코드 한 번이면 포장영상 녹화가 자동 시작됩니다.",
    tip: "체크포인트 — 무선 스캐너는 배터리 방전 시 녹화 누락의 원인이 됩니다. 고출고 사업장은 유선 USB 스캐너를 권장합니다.",
  },
  {
    n: "04",
    t: "WMS·OMS 연동 (선택)",
    body: "카페24·고도몰·자체 WMS 등을 사용 중이라면 API 연동으로 운송장 자동 매칭이 가능합니다. 연동 없이도 사용 가능하지만, 연동하면 운영 효율이 크게 올라갑니다.",
    tip: "참고 — 연동 방법은 별도 정리한 포장영상 API·WMS 연동 가이드를 확인하세요. 카페24·고도몰·메이크샵 모두 표준 API로 지원됩니다.",
  },
  {
    n: "05",
    t: "직원 교육 (10분이면 충분)",
    body: "기존 포장 작업 흐름은 그대로 유지하고, '바코드 한 번 더 스캔'만 추가하면 됩니다. 화면 응답·LED 신호로 녹화 상태를 누구나 확인할 수 있어 학습 부담이 거의 없습니다.",
    tip: "흔한 실수 — 검수(수량·색상 확인) 장면을 생략하면 분쟁 시 증거력이 약해집니다. '상품을 카메라 앞에서 한 번 보여주고 박스에 넣기'를 습관화하세요.",
  },
  {
    n: "06",
    t: "테스트 출고 5건",
    body: "실제 출고 5건을 테스트해 포장영상이 운송장과 정확히 매칭되는지, 화질·각도가 적절한지 확인합니다. 필요 시 카메라 위치를 미세 조정합니다.",
    tip: "체크포인트 — 운송장 글자가 영상에서 또렷이 읽히는지 반드시 확인하세요. 운송장 식별이 안 되면 검색·증거 능력이 모두 떨어집니다.",
  },
  {
    n: "07",
    t: "클레임 응대 표준 만들기",
    body: "고객 클레임 발생 시 운송장 검색 → 영상 링크 복사 → 카톡/문자 전송 절차를 사내 매뉴얼로 만듭니다. 응대 시간이 평균 30분에서 1분 이내로 줄어듭니다.",
    tip: "참고 — 유형별 응대 스크립트는 택배 클레임 해결 가이드에 정리되어 있습니다. 복사해서 바로 쓸 수 있습니다.",
  },
  {
    n: "08",
    t: "운영 데이터 모니터링",
    body: "월별 클레임 건수와 환불 비용을 측정해 포장영상 도입 전후 효과를 정량화합니다. 대부분의 셀러가 1~2개월 안에 ROI를 확인합니다.",
    tip: "체크포인트 — 도입 전 1개월치 클레임 데이터를 먼저 기록해 두면, 도입 후 효과를 정확히 비교할 수 있습니다.",
  },
];

// 도입 전 준비물 체크리스트
const PREP = [
  { item: "포장대 PC (기존 것 활용 가능)", note: "별도 서버 불필요, 클라이언트만 설치" },
  { item: "카메라 (USB 웹캠 또는 IP 카메라)", note: "5~10만원대 USB 웹캠부터 호환" },
  { item: "카메라 거치대 또는 천장 마운트", note: "포장대 위 80~120cm 고정" },
  { item: "바코드 스캐너", note: "유선 USB 권장 (무선은 배터리 관리 필요)" },
  { item: "보조 조명 (선택)", note: "저조도 창고라면 카메라 옆에 설치" },
  { item: "인터넷 연결", note: "클라우드 업로드용, 일반 인터넷이면 충분" },
];

// 업종별 도입 포인트
const INDUSTRIES = [
  {
    name: "식품·신선",
    point: "유통기한·신선도 클레임이 잦으므로, 상품 라벨과 포장 상태가 또렷이 보이도록 카메라 화질·조명을 우선 점검하세요.",
  },
  {
    name: "의류·패션",
    point: "사이즈·색상 분쟁이 많아 검수 단계가 핵심입니다. 상품을 펼쳐 색상·사이즈 태그가 보이게 한 뒤 박스에 담는 흐름을 표준화하세요.",
  },
  {
    name: "화장품·뷰티",
    point: "샘플·증정품 누락 클레임이 빈번합니다. 본품과 샘플을 모두 카메라 앞에서 확인하는 장면을 반드시 영상에 포함하세요.",
  },
  {
    name: "전자기기·고가품",
    point: "객단가가 높아 클레임 1건 손실이 큽니다. 포장 직전 전원·작동 테스트 장면을 영상에 담으면 불량 vs 사용자 책임 구분이 명확해집니다.",
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
  {
    q: "어떤 카메라를 사야 하나요?",
    a: "1인·소규모 셀러는 5~10만원대 USB 웹캠으로 충분합니다. 포장대 3개 이상이면 FHD 산업용 카메라나 PoE IP 카메라를 권장합니다. 사업장 규모별 카메라 선택 기준은 포장영상 카메라 추천 글에 자세히 정리되어 있습니다.",
  },
  {
    q: "카메라는 어느 높이·각도로 설치해야 하나요?",
    a: "포장대 위 80~120cm 높이, 정중앙에서 30~45도 기울여 설치하는 것이 일반적입니다. 박스 안쪽 내용물과 운송장 라벨이 한 화면에 모두 보이는 각도가 가장 좋습니다.",
  },
  {
    q: "포장영상은 얼마나 오래 보관되나요?",
    a: "기본 3개월간 클라우드에 보관됩니다. 대부분의 클레임은 출고 후 한 달 안에 접수되지만, 교환·재배송이 얽히거나 뒤늦게 제기되는 분쟁도 적지 않습니다. CCTV나 보관 기간이 1개월에 그치는 서비스는 이런 늦은 클레임을 놓치지만, 제로패킹은 3개월을 보관해 뒤늦은 분쟁까지 안전하게 커버합니다.",
  },
  {
    q: "직원이 바뀌어도 운영에 문제가 없나요?",
    a: "포장영상은 '바코드 스캔 한 번'만 추가하는 구조라 신규 직원도 5~10분이면 익숙해집니다. 화면·LED로 녹화 상태가 표시되어 누구나 정상 작동을 확인할 수 있습니다.",
  },
  {
    q: "기존 CCTV가 있는데 포장영상이 또 필요한가요?",
    a: "CCTV는 시간대 검색만 가능하지만 포장영상은 운송장 번호로 즉시 검색됩니다. 두 시스템의 차이는 포장영상 vs CCTV 비교 글에서 8개 항목으로 정리했습니다.",
  },
  {
    q: "포장대가 여러 개인데 모두 설치해야 하나요?",
    a: "포장영상은 포장대 1개당 카메라 1대 + 월 30,000원 구조입니다. 클레임이 집중되는 포장대부터 우선 도입한 뒤 단계적으로 확대하는 방식도 가능합니다.",
  },
  {
    q: "도입 비용 대비 효과가 정말 있나요?",
    a: "포장영상 한 달 비용(30,000원)은 부당 환불 1건만 줄여도 회수됩니다. 월 1,000건 출고 기준 실제 절감액 시뮬레이션은 클레임 비용 시뮬레이션 글에서 확인할 수 있습니다.",
  },
];

export default function GuidePage() {
  const today = "2026-06-14T00:00:00.000Z";
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
            가이드 · 2026 최신판 · 8단계
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
            포장영상 도입 가이드
            <br />
            <span className="text-zinc-500">카메라 설치부터 운영까지 한 번에</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            포장영상을 처음 도입하는 셀러를 위한 2026년 최신 단계별 가이드입니다.
            도입 전 준비물, 카메라 설치 위치·각도, 포장대 세팅, 바코드 연동,
            직원 교육, 클레임 응대, 업종별 도입 포인트까지 빠짐없이 정리했습니다.
            처음부터 끝까지 따라 하면 1일 안에 포장영상 운영을 시작할 수 있습니다.
          </p>
        </header>

        <section className="mb-12">
          <figure>
            <Image
              src="/packing-video-hero.webp"
              alt="포장대 카메라가 택배 상품의 포장 과정을 촬영하는 모습을 표현한 예시 이미지"
              width={1672}
              height={941}
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="h-auto w-full rounded-2xl border border-zinc-200 dark:border-zinc-800"
            />
            <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              예시 이미지 — 바코드 스캔과 동시에 포장영상 녹화가 시작되는 모습을 표현한 것입니다.
            </figcaption>
          </figure>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            도입 전 준비물 체크리스트
          </h2>
          <p className="mt-3 text-base leading-7 text-zinc-700 dark:text-zinc-300">
            포장영상 도입에 필요한 준비물입니다. 대부분 기존 장비를 활용할 수
            있어 추가 비용 부담이 적습니다.
          </p>
          <ul className="mt-6 divide-y divide-zinc-200 dark:divide-zinc-800">
            {PREP.map((p) => (
              <li key={p.item} className="flex items-start gap-3 py-4">
                <span className="mt-0.5 flex-none text-emerald-500">✓</span>
                <div>
                  <p className="font-medium text-black dark:text-zinc-50">{p.item}</p>
                  <p className="mt-0.5 text-sm text-zinc-500">{p.note}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
            카메라 선택이 고민이라면{" "}
            <Link href="/blog/packing-camera" className="font-medium text-black underline dark:text-white">
              포장영상 카메라 추천 가이드
            </Link>
            에서 사업장 규모별 추천 모델을 확인하세요.
          </p>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            8단계 도입 체크리스트
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
                  <p className="mt-2 rounded-lg bg-zinc-50 px-3 py-2 text-sm leading-6 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
                    💡 {s.tip}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            업종별 도입 포인트
          </h2>
          <p className="mt-3 text-base leading-7 text-zinc-700 dark:text-zinc-300">
            같은 포장영상이라도 업종에 따라 신경 써야 할 부분이 다릅니다. 우리
            사업장 카테고리에 맞는 포인트를 확인하세요.
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {INDUSTRIES.map((ind) => (
              <li key={ind.name} className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
                <h3 className="text-base font-semibold text-black dark:text-zinc-50">{ind.name}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{ind.point}</p>
              </li>
            ))}
          </ul>
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

        <ConversionCTA title="가이드를 봤다면, 오늘 바로 시작할 수 있습니다" />

        <nav aria-label="관련 글" className="mt-14 grid gap-3 sm:grid-cols-2">
          <Link href="/api" className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">다음 글</span>
            <p className="mt-1 font-semibold text-black dark:text-white">포장영상 API · WMS 연동</p>
          </Link>
          <Link href="/blog/packing-camera" className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">관련 글</span>
            <p className="mt-1 font-semibold text-black dark:text-white">포장영상 카메라 추천</p>
          </Link>
          <Link href="/vs-cctv" className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">관련 글</span>
            <p className="mt-1 font-semibold text-black dark:text-white">포장영상 vs CCTV</p>
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
