import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, SERVICE_URL, serviceLandingUrl } from "../../../site";
import { JsonLd, buildBreadcrumb } from "../../../components/JsonLd";
import { ConversionCTA } from "../../../components/ConversionCTA";
import { languageAlternates, localePath } from "../../../i18n";
import { PAYMENT_GUIDANCE, publicMoney, publicPrice } from "../../../publicPricing";
import { PaymentNote, StationPriceTable } from "../../../components/Pricing";

// 금액과 결제 안내는 app/publicPricing.js(제로패킹과 같은 가격표)에서만 가져옵니다.
// 베트남 고객도 달러로 결제하므로 달러로 표시합니다.
const CURRENCY = "USD";
const PRICE = publicMoney(CURRENCY);
const ANNUAL = publicMoney(CURRENCY, "yearly");
const PAY = PAYMENT_GUIDANCE.vi;
const ANNUAL_LINE = PAY.annual.replace("{price}", ANNUAL);

const PATH = "/pricing";

export const metadata: Metadata = {
  title: `Chi phí video đóng gói - ${PRICE}/tháng cho mỗi bàn đóng gói, bao gồm mọi tính năng`,
  description:
    `Video đóng gói Zeropacking dùng gói duy nhất — ${PRICE}/tháng cho mỗi bàn đóng gói, bao gồm tất cả tính năng kể cả tích hợp WMS·API. Gói năm trả phí 10 tháng dùng 12 tháng, dùng thử miễn phí 15 ngày.`,
  alternates: {
    canonical: localePath("vi", PATH),
    languages: languageAlternates(PATH),
  },
  openGraph: {
    images: ["/packing-video-hero.webp"],
    title: `Chi phí video đóng gói - ${PRICE}/tháng, bao gồm mọi tính năng`,
    description:
      "Gói duy nhất bao gồm cả WMS·API·ghi hình HD·lưu trữ đám mây 3 tháng. Dùng thử miễn phí không cần đăng ký thẻ.",
    url: localePath("vi", PATH),
    locale: "vi_VN",
  },
};

const FEATURES = [
  "Tự động quay video đóng gói",
  "Tự động lập chỉ mục theo mã vận đơn",
  "Ghi hình chất lượng HD",
  "Lưu trữ đám mây 3 tháng",
  "Dung lượng lưu trữ 30GB",
  "Chia sẻ link video cho khách hàng",
  "Tích hợp API WMS·OMS",
  "Sự kiện Webhook",
  "Hỗ trợ qua email",
];

const FAQ = [
  {
    q: "Chi phí video đóng gói đã bao gồm VAT chưa?",
    a: PAY.tax,
  },
  {
    q: "Gói năm có giá bao nhiêu?",
    a: `Gói năm trả phí 10 tháng (${ANNUAL}) để dùng 12 tháng.`,
  },
  {
    q: "Sau khi dùng thử miễn phí có tự động thanh toán không?",
    a: `Không. Bản dùng thử miễn phí bắt đầu mà không cần đăng ký thẻ. ${PAY.body}`,
  },
  {
    q: "Nếu hủy giữa chừng có được hoàn tiền không?",
    a: "Gói tháng không hoàn tiền cho thời gian còn lại của kỳ đang dùng. Gói năm hoàn lại số tiền đã trả trừ đi (giá gói tháng × số tháng đã dùng), số tháng được làm tròn lên. Trong vòng 7 ngày kể từ khi thanh toán và chưa sử dụng dịch vụ, bạn có thể yêu cầu hoàn tiền toàn bộ.",
  },
  {
    q: "Khi tăng số bàn đóng gói thì chi phí thế nào?",
    a: `Được cộng theo từng đơn vị 1 bàn đóng gói. Bạn có thể vận hành nhiều bàn đóng gói cùng lúc tại một cơ sở, mỗi bàn đóng gói lắp một camera. Ví dụ) vận hành 3 bàn đóng gói là ${publicMoney(CURRENCY, "monthly", 3)}/tháng.`,
  },
  {
    q: "Tích hợp WMS hay API có được bao gồm trong cùng mức giá không?",
    a: "Có. Tất cả tính năng (tích hợp WMS, API, Webhook, ghi hình HD, lưu trữ đám mây, chia sẻ video) đều được bao gồm trong gói duy nhất. Không có chi phí phát sinh thêm.",
  },
  {
    q: "Có thể kéo dài thời gian lưu trữ hơn không?",
    a: "Thời gian lưu trữ mặc định là 3 tháng. Nếu cần lưu lâu hơn (6 tháng·12 tháng), vui lòng liên hệ riêng để được tư vấn.",
  },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumb(SITE_URL, [
          { name: "Trang chủ", path: localePath("vi", "/") },
          { name: "Chi phí video đóng gói", path: PATH },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Dịch vụ tự động quay và lưu trữ đám mây video đóng gói",
          name: "Video đóng gói Zeropacking",
          description:
            `Dịch vụ SaaS tự động quay video đóng gói bưu kiện và lưu trên đám mây. Tìm kiếm tức thì theo mã vận đơn. ${PRICE} mỗi bàn đóng gói / tháng.`,
          provider: { "@type": "Organization", name: "Zeropacking", url: SERVICE_URL },
          areaServed: "VN",
          url: "https://www.zeropacking.com/vi",
          offers: {
            "@type": "Offer",
            price: publicPrice(CURRENCY),
            priceCurrency: CURRENCY,
            url: "https://www.zeropacking.com/vi",
            description:
              "Mỗi bàn đóng gói / tháng. Gói năm trả phí 10 tháng dùng 12 tháng.",
          },
        }}
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
        <nav aria-label="Vị trí hiện tại" className="mb-6 text-sm text-zinc-500">
          <Link href={localePath("vi", "/")} className="hover:text-black dark:hover:text-white">Trang chủ</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-700 dark:text-zinc-300">Chi phí video đóng gói</span>
        </nav>

        <header className="mb-12 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-zinc-500">
            Chi phí
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
            Giá đơn giản, bao gồm mọi tính năng
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            Bạn không cần so sánh các gói. Với {PRICE}/tháng cho mỗi bàn đóng
            gói, bạn được dùng tất cả tính năng kể cả tích hợp WMS·API. Hãy bắt
            đầu với bản dùng thử miễn phí 15 ngày không cần đăng ký thẻ.
          </p>
        </header>

        <section className="mb-14">
          <article className="relative mx-auto max-w-md rounded-3xl border-2 border-black bg-white p-8 shadow-xl dark:border-white dark:bg-zinc-950">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-300 px-3 py-1 text-xs font-bold text-black">
              Bao gồm mọi tính năng
            </span>

            <h2 className="text-lg font-bold text-black dark:text-white">Gói duy nhất cho video đóng gói</h2>

            <div className="mt-5">
              <span className="text-5xl font-bold text-black dark:text-white">{PRICE}</span>
              <span className="ml-2 text-base text-zinc-500">/ bàn đóng gói / tháng</span>
              <p className="mt-2 text-sm text-zinc-500">{ANNUAL_LINE}</p>
              <p className="mt-2 text-sm text-zinc-500">Vui lòng liên hệ để nhận báo giá cho nhiều bàn đóng gói hoặc quy mô lớn.</p>
            </div>

            <ul className="mt-7 space-y-3 text-sm">
              {FEATURES.map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="text-emerald-500">✓</span>
                  <span className="text-zinc-800 dark:text-zinc-200">{f}</span>
                </li>
              ))}
            </ul>

            <a
              href={serviceLandingUrl("vi", "pricing-trial")}
              target="_blank"
              rel="noopener"
              className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-full bg-black px-5 text-base font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Bắt đầu dùng thử miễn phí 15 ngày
            </a>
            <p className="mt-3 text-center text-xs text-zinc-500">
              Bắt đầu ngay không cần đăng ký thẻ · Không tự động thanh toán
            </p>
          </article>
          <PaymentNote language="vi" />
        </section>

        <section className="mb-14 rounded-3xl bg-zinc-50 p-8 dark:bg-zinc-950 sm:p-10">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            Chi phí dự kiến theo số lượng bàn đóng gói
          </h2>
          <StationPriceTable
            currency={CURRENCY}
            head={["Số bàn đóng gói", "Gói tháng", "Gói năm (dùng 12 tháng)"]}
            stations={(count) => `${count} bàn đóng gói`}
          />
          <p className="mt-4 text-sm text-zinc-500">
            Mọi bàn đóng gói đều được áp dụng cùng các tính năng (WMS·API·ghi hình HD·lưu trữ 3 tháng, v.v.).
          </p>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            Video đóng gói là chi phí hay là đầu tư
          </h2>
          <div className="mt-5 space-y-4 text-base leading-7 text-zinc-700 dark:text-zinc-300">
            <p>
              Chi phí một tháng video đóng gói {PRICE} được thu hồi chỉ cần
              giảm 1 trường hợp hoàn tiền bất hợp lý. Với người bán trung bình,
              ROI phát sinh trong vòng 1~2 tháng, và nếu cộng thêm thời gian tiết
              kiệm khi xử lý khiếu nại thì hiệu quả thực tế còn lớn hơn nhiều.
            </p>
            <p>
              Số tiền này còn chưa bằng vài lượt nhấp quảng cáo, nhưng để lại
              bằng chứng khách quan cho từng đơn xuất hàng.
            </p>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            Câu hỏi thường gặp về chi phí
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

        <ConversionCTA locale="vi" title="Nếu đã nắm được chi phí, việc triển khai diễn ra như sau" />
      </main>
    </>
  );
}
