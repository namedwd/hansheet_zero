import { inquiryUrl, serviceLandingUrl } from "../site";
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
  ja: [
    { n: "1", t: "お問い合わせ", d: "お問い合わせいただくと、ゼロパッキング担当者が営業日1日以内にご連絡します。" },
    { n: "2", t: "無料相談・お見積り", d: "梱包台の数や商材に合わせた構成とお見積りを1対1でご案内します。" },
    { n: "3", t: "カメラ設置", d: "梱包台にカメラを設置し、バーコードを連携します。平均1日で完了。" },
    { n: "4", t: "運用開始", d: "バーコードを一度スキャンするだけで梱包動画が自動撮影・クラウド保管されます。" },
  ],
  "zh-tw": [
    { n: "1", t: "聯絡我們", d: "送出諮詢後，Zeropacking 專人將於一個工作天內與您聯繫。" },
    { n: "2", t: "免費諮詢・報價", d: "依您的包裝台數量與商品類別，提供一對一的方案與報價。" },
    { n: "3", t: "安裝攝影機", d: "在包裝台架設攝影機並串接條碼，平均一天即可完成。" },
    { n: "4", t: "開始使用", d: "只要掃描一次條碼，包裝影片便會自動錄影並儲存於雲端。" },
  ],
  vi: [
    { n: "1", t: "Liên hệ", d: "Sau khi gửi yêu cầu, nhân viên Zeropacking sẽ liên hệ trong vòng 1 ngày làm việc." },
    { n: "2", t: "Tư vấn & báo giá miễn phí", d: "Nhận cấu hình và báo giá 1:1 phù hợp với số bàn đóng gói và ngành hàng của bạn." },
    { n: "3", t: "Lắp đặt camera", d: "Lắp camera trên bàn đóng gói và kết nối máy quét mã vạch — trung bình hoàn tất trong 1 ngày." },
    { n: "4", t: "Bắt đầu vận hành", d: "Chỉ cần quét mã vạch một lần, video đóng gói sẽ tự động ghi và lưu trên đám mây." },
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
  ja: {
    title: "梱包動画、こうして始められます",
    description:
      "お問い合わせから運用開始まで平均1〜3日。まずは無料トライアルでお試しいただくこともできます。",
    inquiry: "お問い合わせ",
    freeTrial: "無料で試す",
    note: "お問い合わせはゼロパッキング（zeropacking.com）の日本語窓口につながります。",
  },
  "zh-tw": {
    title: "包裝影片，這樣開始就對了",
    description:
      "從諮詢到正式上線平均只要 1〜3 天。也可以先用免費試用體驗看看。",
    inquiry: "聯絡我們",
    freeTrial: "免費試用",
    note: "諮詢將連結至 Zeropacking（zeropacking.com）的繁體中文窗口。",
  },
  vi: {
    title: "Bắt đầu với video đóng gói như thế này",
    description:
      "Từ lúc liên hệ đến khi vận hành trung bình chỉ 1–3 ngày. Bạn cũng có thể dùng thử miễn phí trước.",
    inquiry: "Liên hệ",
    freeTrial: "Dùng thử miễn phí",
    note: "Liên hệ sẽ dẫn đến cổng tiếng Việt của Zeropacking (zeropacking.com).",
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
          href={inquiryUrl(locale, "cta")}
          target="_blank"
          rel="noopener"
          className="inline-flex h-12 items-center justify-center rounded-full bg-black px-7 text-base font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          {c.inquiry}
        </a>
        <a
          href={serviceLandingUrl(locale, "cta-trial")}
          className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 px-7 text-base font-medium text-black transition-colors hover:bg-white dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-900"
        >
          {c.freeTrial}
        </a>
      </div>
      <p className="mt-3 text-xs text-zinc-500">{c.note}</p>
    </section>
  );
}
