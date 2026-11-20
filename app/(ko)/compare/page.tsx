import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, SERVICE_URL, STORAGE_GB } from "../../site";
import { languageAlternates } from "../../i18n";
import { JsonLd, buildBreadcrumb } from "../../components/JsonLd";
import { ConversionCTA } from "../../components/ConversionCTA";
import { publicMoney } from "../../publicPricing";
import { SiteImage, figureCaption } from "../../components/Figures";

// 제로패킹과 같은 가격표(app/publicPricing.js)의 금액.
const ZP_PRICE = publicMoney("KRW");

const PATH = "/compare";
const title = "포장영상 업체 비교 가이드 - 촬영 방식·비용·보관 확인";
const description = "수동 촬영, CCTV, 포장영상 전용 서비스, WMS 연동 방식의 차이를 비교하고 업체 견적에서 확인할 비용·보관·검색 항목을 정리합니다.";
export const metadata: Metadata = {
  title, description,
  alternates: { canonical: PATH, languages: languageAlternates(PATH) },
  openGraph: {
    images: ["/packing-video-hero.webp"], title, description, url: PATH },
};
const METHODS = [
  { name: "스마트폰·수동 촬영", workflow: "작업자가 촬영을 시작·종료하고 주문별로 파일을 정리", search: "파일명이나 폴더를 주문번호와 연결하는 운영 규칙 필요", cost: "기존 장비 활용 여부, 저장 공간, 정리·검색에 드는 인건비", check: "바쁜 시간에도 촬영과 파일 정리를 빠뜨리지 않을 수 있는지" },
  { name: "일반 CCTV·NVR", workflow: "설정에 따라 작업 공간을 연속 또는 이벤트 촬영", search: "시간대 검색 중심. 주문번호 연동은 제품·추가 구성 확인", cost: "카메라·녹화기·저장 장치, 설치비와 유지보수", check: "포장대 사각지대, 저장 용량에 따른 덮어쓰기 시점" },
  { name: "포장영상 전용 서비스", workflow: "바코드 등 출고 작업과 주문별 촬영을 연결", search: "주문번호·운송장 검색과 공유 기능을 실제 데모에서 확인", cost: "포장대별 요금, 장비, 저장 용량, 추가 보관 비용", check: "스캔 누락·네트워크 장애 시 처리와 업로드 완료 확인" },
  { name: "WMS 연동 구성", workflow: "창고 관리 시스템의 주문·검수·출고 정보와 영상 연결", search: "연동 범위와 식별자 매칭 방식에 따라 달라짐", cost: "WMS 라이선스, 연동 개발·설정, 유지보수와 영상 보관", check: "기존 시스템 버전, API 범위, 오류 처리 담당자" },
];
const QUESTIONS = [
  ["총 비용", "월 요금 외에 카메라·설치·연동·추가 저장 비용을 같은 조건으로 받아 비교하세요."],
  ["보관과 반출", "보관 기간과 용량 한도 중 무엇이 먼저 적용되는지, 해지 후 영상을 내려받을 수 있는지 확인하세요."],
  ["검색과 공유", "실제 주문번호로 검색하고, 공유 링크의 접근 권한·만료·회수 기능을 확인하세요."],
  ["촬영 안정성", "연속 주문, 재스캔, 인터넷 단절 상황을 시험하고 누락을 어떻게 발견하는지 확인하세요."],
  ["계약과 지원", "최소 약정, 자동 결제, 해지 조건, 장애 대응 시간과 해외 지원 언어를 확인하세요."],
];

export default function ComparePage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16 sm:px-10 sm:py-24">
      <JsonLd data={buildBreadcrumb(SITE_URL, [{ name: "홈", path: "/" }, { name: "포장영상 비교", path: PATH }])} />
      <nav aria-label="현재 위치" className="mb-6 text-sm text-zinc-500"><Link href="/">홈</Link> / 도입 방식 비교</nav>
      <header className="mb-12">
        <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">포장영상 업체 비교<br /><span className="text-zinc-500">촬영 방식과 운영 조건부터</span></h1>
        <p className="mt-6 text-lg leading-8">{description}</p>
        <p className="mt-4 text-sm leading-6 text-zinc-500">한시트는 제로패킹이 운영하는 가이드입니다. 아래 표는 도입 방식의 차이를 설명하며, 특정 업체의 순위나 실측 성능 비교가 아닙니다.</p>
      </header>

      <section className="mb-12">
        <figure>
          <SiteImage name="compare" locale="ko" />
          <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
            {figureCaption("compare", "ko")}
          </figcaption>
        </figure>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold">네 가지 도입 방식 비교</h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <table className="w-full min-w-[760px] text-left text-sm leading-6">
            <caption className="sr-only">촬영 방식별 작업 흐름, 검색, 비용과 확인 사항</caption>
            <thead className="bg-zinc-50 dark:bg-zinc-950"><tr>{["방식", "촬영·정리", "검색", "비용 항목", "확인할 점"].map(label => <th key={label} scope="col" className="p-4">{label}</th>)}</tr></thead>
            <tbody>{METHODS.map(method => <tr key={method.name} className="border-t border-zinc-200 align-top dark:border-zinc-800"><th scope="row" className="p-4">{method.name}</th><td className="p-4">{method.workflow}</td><td className="p-4">{method.search}</td><td className="p-4">{method.cost}</td><td className="p-4">{method.check}</td></tr>)}</tbody>
          </table>
        </div>
      </section>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold">견적 요청 시 확인할 다섯 가지</h2>
        <dl className="mt-6 space-y-5">{QUESTIONS.map(([label, detail]) => <div key={label}><dt className="font-semibold">{label}</dt><dd className="mt-2 leading-7">{detail}</dd></div>)}</dl>
      </section>
      <section className="mb-12 rounded-2xl bg-zinc-50 p-6 dark:bg-zinc-950">
        <h2 className="text-2xl font-semibold">제로패킹 공개 요금과 기능</h2>
        <p className="mt-4 leading-7">포장대 1개당 월 {ZP_PRICE}(부가세 별도), 3개월 보관, {STORAGE_GB}GB 저장, HD 화질, 링크 공유, WMS 연동 및 API 제공이 공식 사이트에 안내되어 있습니다. 연간 결제 할인과 15일 무료체험도 안내되어 있습니다.</p>
        <p className="mt-4 leading-7">실제 연동 가능한 시스템, 카메라 호환성, 해외 결제·지원 조건은 도입 환경을 전달하고 확인하세요.</p>
        <p className="mt-4 text-sm text-zinc-500">출처: <a href={SERVICE_URL} className="underline">제로패킹 공식 서비스 안내</a> · 확인일 <time dateTime="2026-11-20">2026년 11월 20일</time></p>
      </section>
      <ConversionCTA title="우리 출고 환경에 맞는 구성을 확인하세요" />
      <nav aria-label="관련 가이드" className="mt-10 flex flex-wrap gap-6 underline"><Link href="/vs-cctv">포장영상과 CCTV 차이</Link><Link href="/cases">업종별 활용 사례</Link><Link href="/guide">설치·운영 가이드</Link></nav>
    </main>
  );
}
