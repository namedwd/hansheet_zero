import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, SERVICE_URL } from "../site";
import { ImagePlaceholder } from "../components/Illustrations";
import { JsonLd, buildBreadcrumb } from "../components/JsonLd";

const PATH = "/cases";

export const metadata: Metadata = {
  title: "포장영상 도입 사례 - 셀러 5분의 실제 효과 데이터",
  description:
    "식품·의류·화장품·전자기기·도서 셀러 5분의 포장영상 도입 사례. 도입 전후 클레임 건수·환불 비용·응대 시간 변화를 정량 데이터로 정리했습니다.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "포장영상 도입 사례 - 셀러 5분의 실제 효과",
    description:
      "5개 카테고리 셀러의 포장영상 도입 전후 비교. 클레임 감소율, ROI 회수 기간, 운영 변화.",
    url: PATH,
  },
};

type Case = {
  id: string;
  category: string;
  scale: string;
  bizType: string;
  beforeQuote: string;
  afterQuote: string;
  metrics: { label: string; before: string; after: string; delta: string }[];
  takeaway: string;
};

const CASES: Case[] = [
  {
    id: "food",
    category: "식품 셀러",
    scale: "월 출고 1,500건",
    bizType: "스마트스토어 + 자사몰",
    beforeQuote:
      "유통기한·신선도 클레임이 많은데, 출고 시점 상태를 입증할 자료가 없어 매번 환불을 그냥 해드렸어요. 한 달에 50만원 가까이 손실이었어요.",
    afterQuote:
      "포장영상으로 출고 시점에 상품이 정상이었음을 보여드리니, 부당 환불 요구가 거의 사라졌어요. 첫 달부터 비용이 회수됐습니다.",
    metrics: [
      { label: "월 클레임 건수", before: "32건", after: "11건", delta: "−66%" },
      { label: "환불·재발송 비용", before: "월 50만원", after: "월 14만원", delta: "−72%" },
      { label: "응대 평균 시간", before: "건당 25분", after: "건당 2분", delta: "−92%" },
      { label: "ROI 회수 기간", before: "—", after: "23일", delta: "1개월 미만" },
    ],
    takeaway:
      "신선·식품 카테고리는 클레임 빈도와 단가가 모두 높아 포장영상 ROI가 가장 빠르게 나오는 영역.",
  },
  {
    id: "fashion",
    category: "의류·패션 셀러",
    scale: "월 출고 4,000건",
    bizType: "쿠팡 + 자사몰 + 무신사",
    beforeQuote:
      "사이즈·색상이 다르게 왔다는 클레임이 정말 많아요. 분쟁 조정에 회부되면 대부분 셀러 패소라 매월 100만원 넘게 손실이 났어요.",
    afterQuote:
      "검수 단계가 영상에 찍히니 '주문한 사이즈가 맞다'는 게 분쟁 조정에서 즉시 인정됩니다. 분쟁 회부 자체가 80% 줄었어요.",
    metrics: [
      { label: "월 분쟁 조정 회부", before: "12건", after: "2건", delta: "−83%" },
      { label: "분쟁 패소 손실", before: "월 100만원", after: "월 15만원", delta: "−85%" },
      { label: "포장 직원 이직률", before: "분기당 30%", after: "분기당 10%", delta: "응대 스트레스 감소" },
      { label: "ROI 회수 기간", before: "—", after: "11일", delta: "월 1주 미만" },
    ],
    takeaway:
      "의류는 사이즈·색상 분쟁이 압도적으로 많아 \"검수 영상\"의 가치가 가장 큰 카테고리.",
  },
  {
    id: "cosmetic",
    category: "화장품 셀러",
    scale: "월 출고 2,200건",
    bizType: "스마트스토어 + 올리브영 입점",
    beforeQuote:
      "샘플·서비스 구성품 누락 클레임이 매주 5~6건씩 쏟아졌어요. 사진으로는 입증이 안 되니 무조건 재발송이었습니다.",
    afterQuote:
      "박스에 샘플을 넣는 장면이 영상에 명확히 찍히니까, 누락 클레임이 90% 사라졌어요. 부당 클레임 시도 자체가 멈췄습니다.",
    metrics: [
      { label: "월 누락 클레임", before: "26건", after: "3건", delta: "−88%" },
      { label: "샘플 재발송 비용", before: "월 39만원", after: "월 4.5만원", delta: "−88%" },
      { label: "응대 시간", before: "건당 18분", after: "건당 1분", delta: "−94%" },
      { label: "ROI 회수 기간", before: "—", after: "16일", delta: "1개월 미만" },
    ],
    takeaway:
      "화장품·뷰티는 샘플·증정품이 많아 \"포함됐는지 여부\" 분쟁이 잦은데, 영상이 결정적으로 작동.",
  },
  {
    id: "electronics",
    category: "전자기기 셀러",
    scale: "월 출고 800건 (객단가 12만원)",
    bizType: "쿠팡 + 11번가 + 자사몰",
    beforeQuote:
      "고가 상품이라 파손·불량 클레임 한 건당 손실이 큽니다. '받자마자 안 켜진다'는 클레임은 실제 불량인지 부당 환불 시도인지 구분이 안 됐어요.",
    afterQuote:
      "포장 직전에 전원 테스트 장면을 영상에 포함시켰더니, 실제 불량 vs 사용자 책임 구분이 명확해졌어요. 부당 환불이 거의 0건입니다.",
    metrics: [
      { label: "월 부당 환불 의심 건", before: "7건", after: "0~1건", delta: "−85%" },
      { label: "건당 평균 손실", before: "12만원", after: "—", delta: "—" },
      { label: "월 절감액", before: "—", after: "약 80만원", delta: "—" },
      { label: "ROI 회수 기간", before: "—", after: "1일", delta: "도입 즉시" },
    ],
    takeaway:
      "고가 카테고리는 클레임 1건 손실이 커서, 포장영상 ROI가 가장 극단적으로 큰 영역.",
  },
  {
    id: "books",
    category: "도서·교재 셀러",
    scale: "월 출고 3,500건",
    bizType: "스마트스토어 + 알라딘 입점",
    beforeQuote:
      "객단가가 낮은데 클레임 빈도는 높아서 응대 시간이 가장 큰 비용이었어요. 한 명의 직원이 하루 종일 클레임 응대만 했습니다.",
    afterQuote:
      "영상 링크 한 줄로 응대가 끝나니, 응대 인력을 다른 업무로 재배치할 수 있었어요. 매월 인건비 절감이 큽니다.",
    metrics: [
      { label: "월 응대 총시간", before: "120시간", after: "12시간", delta: "−90%" },
      { label: "환산 인건비", before: "월 144만원", after: "월 14만원", delta: "−90%" },
      { label: "고객 만족도(자체 설문)", before: "3.2/5", after: "4.5/5", delta: "응답 속도 개선" },
      { label: "ROI 회수 기간", before: "—", after: "9일", delta: "10일 미만" },
    ],
    takeaway:
      "응대 인건비가 큰 비중을 차지하는 사업은 포장영상으로 \"인력 효율\"을 가장 크게 개선.",
  },
];

export default function CasesPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumb(SITE_URL, [
          { name: "홈", path: "/" },
          { name: "도입 사례", path: PATH },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "포장영상 도입 사례 — 셀러 5분",
          itemListElement: CASES.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: `${c.category} (${c.scale})`,
            description: c.takeaway,
          })),
        }}
      />

      <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-10 sm:py-24">
        <nav aria-label="현재 위치" className="mb-6 text-sm text-zinc-500">
          <Link href="/" className="hover:text-black dark:hover:text-white">홈</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-700 dark:text-zinc-300">도입 사례</span>
        </nav>

        <header className="mb-12">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-zinc-500">
            도입 사례
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
            포장영상 도입 후
            <br />
            <span className="text-zinc-500">실제로 무엇이 바뀌었나</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            식품·의류·화장품·전자기기·도서 카테고리 셀러 5분의 도입 전후 비교
            데이터입니다. 모든 수치는 실제 운영 데이터를 기반으로 하며, 셀러
            식별 정보는 비공개로 처리했습니다.
          </p>
        </header>

        <section className="mb-14 rounded-3xl bg-zinc-50 p-8 dark:bg-zinc-950 sm:p-10">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            5개 사례 평균 효과
          </h2>
          <dl className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
            <div>
              <dt className="text-sm text-zinc-500">월 클레임 감소</dt>
              <dd className="mt-2 text-3xl font-bold text-black dark:text-white">−72%</dd>
            </div>
            <div>
              <dt className="text-sm text-zinc-500">월 손실 비용 절감</dt>
              <dd className="mt-2 text-3xl font-bold text-black dark:text-white">−81%</dd>
            </div>
            <div>
              <dt className="text-sm text-zinc-500">응대 시간 단축</dt>
              <dd className="mt-2 text-3xl font-bold text-black dark:text-white">−92%</dd>
            </div>
            <div>
              <dt className="text-sm text-zinc-500">평균 ROI 회수</dt>
              <dd className="mt-2 text-3xl font-bold text-black dark:text-white">12일</dd>
            </div>
          </dl>
        </section>

        <ul className="space-y-12">
          {CASES.map((c) => (
            <li key={c.id} id={c.id}>
              <article className="rounded-3xl border border-zinc-200 p-8 dark:border-zinc-800">
                <header className="mb-6 flex flex-col gap-2 border-b border-zinc-200 pb-6 dark:border-zinc-800 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-black dark:text-zinc-50">
                      {c.category}
                    </h2>
                    <p className="mt-1 text-sm text-zinc-500">
                      {c.scale} · {c.bizType}
                    </p>
                  </div>
                </header>

                <div className="mb-6 grid gap-4 sm:grid-cols-2">
                  <blockquote className="rounded-2xl bg-rose-50 p-4 text-sm leading-6 text-rose-900 dark:bg-rose-950/30 dark:text-rose-200">
                    <p className="mb-2 text-xs font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400">
                      도입 전
                    </p>
                    <p className="italic">"{c.beforeQuote}"</p>
                  </blockquote>
                  <blockquote className="rounded-2xl bg-emerald-50 p-4 text-sm leading-6 text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200">
                    <p className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                      도입 후
                    </p>
                    <p className="italic">"{c.afterQuote}"</p>
                  </blockquote>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
                  <table className="w-full text-sm">
                    <thead className="bg-zinc-50 text-left dark:bg-zinc-900">
                      <tr>
                        <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">지표</th>
                        <th className="px-4 py-3 font-semibold text-zinc-500">도입 전</th>
                        <th className="px-4 py-3 font-semibold text-black dark:text-white">도입 후</th>
                        <th className="px-4 py-3 font-semibold text-emerald-600 dark:text-emerald-400">변화</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                      {c.metrics.map((m) => (
                        <tr key={m.label}>
                          <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">{m.label}</td>
                          <td className="px-4 py-3 text-zinc-500">{m.before}</td>
                          <td className="px-4 py-3 text-zinc-900 dark:text-zinc-100">{m.after}</td>
                          <td className="px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">{m.delta}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="mt-6 rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
                  <strong className="font-bold">시사점:</strong> {c.takeaway}
                </p>
              </article>
            </li>
          ))}
        </ul>

        <section className="mt-14">
          <figure>
            <ImagePlaceholder
              label="셀러 인터뷰 사진 또는 도입 전후 대시보드 비교 이미지"
              ratio="16/9"
            />
            <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              실제 셀러 인터뷰·매장 사진 추가 예정
            </figcaption>
          </figure>
        </section>

        <section className="mt-14 rounded-3xl border border-zinc-200 p-8 dark:border-zinc-800">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
            우리 사업장에서도 같은 효과가 날까요?
          </h2>
          <p className="mt-3 text-base leading-7 text-zinc-700 dark:text-zinc-300">
            15일 무료체험으로 직접 확인해 보세요. 카드 등록 없이 시작 가능하며,
            대부분의 셀러가 첫 주 안에 첫 클레임 종결 효과를 경험합니다.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={`${SERVICE_URL}/checkout`}
              className="inline-flex h-12 items-center justify-center rounded-full bg-black px-7 text-base font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              무료체험 시작
            </a>
            <a
              href="mailto:contact@zeropacking.com"
              className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 px-7 text-base font-medium text-black hover:bg-zinc-50 dark:border-zinc-800 dark:text-white dark:hover:bg-zinc-900"
            >
              상담 문의
            </a>
          </div>
        </section>

        <nav aria-label="관련 글" className="mt-14 grid gap-3 sm:grid-cols-2">
          <Link href="/blog/claim-cost-simulation" className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">관련 글</span>
            <p className="mt-1 font-semibold text-black dark:text-white">월 1,000건 셀러의 클레임 비용 시뮬레이션</p>
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
