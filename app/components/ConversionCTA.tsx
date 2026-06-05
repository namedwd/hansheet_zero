import { SERVICE_URL, INQUIRY_URL } from "../site";
import type { Locale } from "../i18n";

// 도입 절차 4단계 — "그래서 어떻게 써야 되는데?"에 답하는 핵심 섹션 (로케일별)
const STEPS: Record<Locale, { n: string; t: string; d: string }[]> = {
  ko: [
    { n: "1", t: "도입 문의", d: "도입 문의를 남기면 제로패킹 담당자가 영업일 기준 1일 내 연락드립니다." },
    { n: "2", t: "무료 상담·견적", d: "포장대 수·업종에 맞는 구성과 견적을 1:1로 안내받습니다." },
    { n: "3", t: "카메라 설치", d: "포장대에 카메라를 설치하고 바코드를 연동합니다. 평균 1일이면 완료." },
    { n: "4", t: "운영 시작", d: "바코드 스캔 한 번이면 포장영상이 자동 촬영·클라우드 보관됩니다." },
  ],
  en: [
    { n: "1", t: "Contact sales", d: "Leave an inquiry and a Zeropacking specialist gets back to you within one business day." },
    { n: "2", t: "Free consultation & quote", d: "Get a setup and quote tailored to your number of packing stations and product category." },
    { n: "3", t: "Camera setup", d: "Mount the camera over the packing station and connect the barcode scanner — about one day on average." },
    { n: "4", t: "Go live", d: "A single barcode scan auto-records the packing video and stores it in the cloud." },
  ],
};

const COPY: Record<
  Locale,
  { title: string; description: string; inquiry: string; freeTrial: string; note: string }
> = {
  ko: {
    title: "포장영상, 이렇게 시작하세요",
    description:
      "문의부터 운영까지 평균 1~3일이면 충분합니다. 카드 등록 없이 무료체험으로 먼저 경험해 볼 수도 있습니다.",
    inquiry: "도입 문의하기",
    freeTrial: "15일 무료체험",
    note: "도입 문의는 제로패킹(zeropacking.com) 문의 폼으로 연결됩니다. 무료체험은 카드 등록 없이 시작할 수 있습니다.",
  },
  en: {
    title: "Here's how to get started with packing video",
    description:
      "From inquiry to going live takes 1–3 days on average. You can also try it first with a free trial — no card required.",
    inquiry: "Contact sales",
    freeTrial: "15-day free trial",
    note: "The contact link goes to the Zeropacking (zeropacking.com) inquiry form. The free trial starts with no card required.",
  },
};

export function ConversionCTA({
  locale = "ko",
  title,
  description,
}: {
  locale?: Locale;
  title?: string;
  description?: string;
}) {
  const c = COPY[locale];
  const steps = STEPS[locale];
  return (
    <section className="mt-16 rounded-3xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-950 sm:p-10">
      <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
        {title ?? c.title}
      </h2>
      <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-700 dark:text-zinc-300">
        {description ?? c.description}
      </p>

      <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <li
            key={s.n}
            className="relative rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-black"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm font-semibold text-white dark:bg-white dark:text-black">
              {s.n}
            </span>
            <h3 className="mt-3 text-base font-semibold text-black dark:text-zinc-50">
              {s.t}
            </h3>
            <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              {s.d}
            </p>
            {i < steps.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute right-3 top-6 hidden text-zinc-300 lg:block dark:text-zinc-700"
              >
                →
              </span>
            )}
          </li>
        ))}
      </ol>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a
          href={INQUIRY_URL}
          target="_blank"
          rel="noopener"
          className="inline-flex h-12 items-center justify-center rounded-full bg-black px-7 text-base font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          {c.inquiry}
        </a>
        <a
          href={`${SERVICE_URL}/checkout`}
          className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 px-7 text-base font-medium text-black transition-colors hover:bg-white dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-900"
        >
          {c.freeTrial}
        </a>
      </div>
      <p className="mt-3 text-xs text-zinc-500">{c.note}</p>
    </section>
  );
}
