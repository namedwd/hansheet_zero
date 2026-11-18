import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "../../site";
import { languageAlternates } from "../../i18n";
import { JsonLd, buildBreadcrumb } from "../../components/JsonLd";
import { ConversionCTA } from "../../components/ConversionCTA";

const PATH = "/cases";
const title = "포장영상 활용 사례 - 업종별 촬영 항목과 효과 측정";
const description = "식품·의류·화장품·전자기기·도서 포장 시 무엇을 촬영하고 확인해야 하는지, 도입 효과를 어떻게 측정할지 정리한 운영 가이드입니다.";
export const metadata: Metadata = {
  title, description,
  alternates: { canonical: PATH, languages: languageAlternates(PATH) },
  openGraph: {
    images: ["/packing-video-hero.webp"], title, description, url: PATH },
};
const CASES = [
  { id: "food", category: "식품", issue: "상품 종류·수량과 포장 상태 확인",
    record: "제품 표시사항, 수량, 보냉재 배치, 박스 봉인 과정을 촬영합니다. 작은 글씨는 실제 재생 화면에서 읽히는지 확인합니다.",
    check: "출고 당시 외관과 포장 상태를 확인하는 데 활용합니다. 영상만으로 내부 품질이나 배송 중 온도까지 확인할 수는 없습니다." },
  { id: "fashion", category: "의류·패션", issue: "주문 옵션과 실제 포장 상품 대조",
    record: "색상, 사이즈 라벨, 수량을 카메라에 보여준 뒤 포장합니다. 손이나 포장재가 라벨을 가리지 않도록 동선을 정합니다.",
    check: "주문 옵션과 촬영된 라벨을 대조합니다. 조명에 따른 색상 차이가 있으므로 영상 색상만으로 판단하지 않습니다." },
  { id: "cosmetic", category: "화장품", issue: "본품·증정품·세트 구성 확인",
    record: "박스에 넣기 전 구성품을 펼쳐 보이고, 하나씩 담는 과정부터 봉인까지 연속 촬영합니다.",
    check: "상품별 수량과 증정 조건을 주문 내역과 함께 확인합니다. 가려진 물품은 영상에서 식별되지 않을 수 있습니다." },
  { id: "electronics", category: "전자기기", issue: "모델·부속품·완충 포장 확인",
    record: "모델명, 부속품, 제품 외관과 완충재 배치를 기록합니다. 출고 전 작동 검사를 한다면 그 장면도 연결해 남깁니다.",
    check: "촬영 시점의 외관과 검사 장면을 확인합니다. 모든 기능의 정상 동작이나 배송 이후 상태를 보장하는 자료는 아닙니다." },
  { id: "books", category: "도서·교재", issue: "권수·판본·모서리 상태 확인",
    record: "표지와 판본, 세트 권수, 모서리 상태가 보이도록 촬영한 뒤 완충재를 넣고 봉인합니다.",
    check: "잘못된 판본이나 수량 누락 여부를 확인합니다. 촬영되지 않은 내부 페이지의 상태는 별도로 확인해야 합니다." },
];

export default function CasesPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-10 sm:py-24">
      <JsonLd data={buildBreadcrumb(SITE_URL, [{ name: "홈", path: "/" }, { name: "포장영상 활용 사례", path: PATH }])} />
      <nav aria-label="현재 위치" className="mb-6 text-sm text-zinc-500"><Link href="/">홈</Link> / 활용 사례</nav>
      <header className="mb-12">
        <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">포장영상 활용 사례<br /><span className="text-zinc-500">우리 상품은 무엇을 촬영할까요?</span></h1>
        <p className="mt-6 text-lg leading-8">{description}</p>
        <p className="mt-4 text-sm leading-6 text-zinc-500">아래 내용은 업종별 운영 예시입니다. 고객 인터뷰나 도입 성과를 측정한 통계가 아닙니다.</p>
      </header>
      <div className="space-y-6">
        {CASES.map((item) => (
          <section key={item.id} id={item.id} className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
            <h2 className="text-2xl font-semibold">{item.category}: {item.issue}</h2>
            <h3 className="mt-5 font-semibold">촬영할 장면</h3><p className="mt-2 leading-7">{item.record}</p>
            <h3 className="mt-5 font-semibold">확인할 수 있는 범위</h3><p className="mt-2 leading-7">{item.check}</p>
          </section>
        ))}
      </div>
      <section className="my-12 rounded-2xl bg-zinc-50 p-6 dark:bg-zinc-950">
        <h2 className="text-2xl font-semibold">도입 효과를 직접 측정하는 방법</h2>
        <p className="mt-4 leading-7">도입 전후에 같은 길이의 기간을 정하고 출고량·상품 구성·담당 인원을 함께 기록하세요. 클레임 건수는 출고량 대비 비율로 비교하면 물량 변화의 영향을 구분하기 쉽습니다.</p>
        <ul className="mt-4 list-disc space-y-3 pl-5 leading-7">
          <li>영상 누락률: 영상이 없는 출고 건수 ÷ 전체 출고 건수</li>
          <li>검색 시간: 문의 접수 후 해당 주문의 영상을 찾기까지 걸린 시간</li>
          <li>응대 시간: 자료 확인·고객 설명·후속 처리에 쓴 총시간</li>
          <li>총 운영 비용: 서비스·장비·설치·인건비와 환불·재발송 비용</li>
        </ul>
        <p className="mt-4 text-sm leading-6 text-zinc-500">영상은 출고 사실을 확인하는 자료입니다. 분쟁 결과나 비용 절감률은 개별 상황에 따라 달라집니다.</p>
      </section>
      <ConversionCTA title="우리 상품에 맞는 촬영 구성을 상담하세요" />
      <nav aria-label="관련 가이드" className="mt-10 flex flex-wrap gap-6 underline"><Link href="/guide">카메라 설치·운영 가이드</Link><Link href="/compare">도입 방식 비교</Link><Link href="/pricing">요금 확인</Link></nav>
    </main>
  );
}
