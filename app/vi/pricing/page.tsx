import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, SERVICE_URL } from "../../site";
import { JsonLd, buildBreadcrumb } from "../../components/JsonLd";
import { ConversionCTA } from "../../components/ConversionCTA";
import { languageAlternates, localePath } from "../../i18n";

const PATH = "/pricing";

export const metadata: Metadata = {
  title: "Chi phí video đóng gói - 30,000 won/tháng cho mỗi bàn đóng gói, bao gồm mọi tính năng",
  description:
    "Video đóng gói Zeropacking dùng gói duy nhất — 30,000 won/tháng cho mỗi bàn đóng gói (chưa gồm thuế GTGT), bao gồm tất cả tính năng kể cả tích hợp WMS·API. Giảm 17% khi thanh toán theo năm, dùng thử miễn phí 15 ngày.",
  alternates: {
    canonical: localePath("vi", PATH),
    languages: languageAlternates(PATH, ["ko", "ja", "zh-tw", "vi"]),
  },
  openGraph: {
    title: "Chi phí video đóng gói - 30,000 won/tháng, bao gồm mọi tính năng",
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
    q: "Chi phí video đóng gói đã bao gồm thuế GTGT chưa?",
    a: "Giá hiển thị 30,000 won là chưa gồm thuế GTGT. Khi thanh toán sẽ cộng thêm 10% thuế GTGT, tổng cộng bị tính 33,000 won.",
  },
  {
    q: "Thanh toán theo năm được giảm bao nhiêu?",
    a: "Thanh toán theo năm được giảm 17%. Mức 30,000 won/tháng còn 24,900 won, nên thanh toán theo năm khoảng 298,800 won.",
  },
  {
    q: "Sau khi dùng thử miễn phí có tự động thanh toán không?",
    a: "Không. Bản dùng thử miễn phí bắt đầu mà không cần đăng ký thẻ, và sau 15 ngày sẽ không tự động thanh toán. Nếu muốn tiếp tục sử dụng, bạn chỉ cần tự đăng ký thông tin thanh toán.",
  },
  {
    q: "Nếu hủy giữa chừng có được hoàn tiền không?",
    a: "Thanh toán theo tháng sẽ tự động kết thúc vào kỳ thanh toán kế tiếp. Thanh toán theo năm có thể được hoàn tiền theo tỷ lệ cho khoảng thời gian chưa sử dụng.",
  },
  {
    q: "Khi tăng số bàn đóng gói thì chi phí thế nào?",
    a: "Được cộng theo từng đơn vị 1 bàn đóng gói. Bạn có thể vận hành nhiều bàn đóng gói cùng lúc tại một cơ sở, mỗi bàn đóng gói lắp một camera. Ví dụ) vận hành 3 bàn đóng gói là 90,000 won/tháng.",
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
            "Dịch vụ SaaS tự động quay video đóng gói bưu kiện và lưu trên đám mây. Tìm kiếm tức thì theo mã vận đơn. 30,000 won/tháng cho mỗi bàn đóng gói (chưa gồm thuế GTGT).",
          provider: { "@type": "Organization", name: "Zeropacking", url: SERVICE_URL },
          areaServed: "KR",
          url: `${SERVICE_URL}/checkout`,
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
            Bạn không cần so sánh các gói. Với 30,000 won/tháng cho mỗi bàn đóng
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
              <span className="text-5xl font-bold text-black dark:text-white">30,000 won</span>
              <span className="ml-2 text-base text-zinc-500">/ bàn đóng gói / tháng</span>
              <p className="mt-2 text-sm text-zinc-500">Chưa gồm thuế GTGT · Giảm 17% khi thanh toán theo năm</p>
              <p className="mt-2 text-sm text-zinc-500">Vui lòng liên hệ để biết chi phí và báo giá tại Việt Nam.</p>
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
              href={`${SERVICE_URL}/checkout`}
              className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-full bg-black px-5 text-base font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Bắt đầu dùng thử miễn phí 15 ngày
            </a>
            <p className="mt-3 text-center text-xs text-zinc-500">
              Bắt đầu ngay không cần đăng ký thẻ · Không tự động thanh toán
            </p>
          </article>
        </section>

        <section className="mb-14 rounded-3xl bg-zinc-50 p-8 dark:bg-zinc-950 sm:p-10">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            Chi phí dự kiến theo số lượng bàn đóng gói
          </h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 text-left dark:bg-zinc-900">
                <tr>
                  <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">Số bàn đóng gói</th>
                  <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">Thanh toán theo tháng (chưa gồm GTGT)</th>
                  <th className="px-4 py-3 font-semibold text-emerald-600 dark:text-emerald-400">Thanh toán theo năm (giảm 17%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {[
                  { count: 1, monthly: 30000, yearlyMonthly: 24900 },
                  { count: 2, monthly: 60000, yearlyMonthly: 49800 },
                  { count: 3, monthly: 90000, yearlyMonthly: 74700 },
                  { count: 5, monthly: 150000, yearlyMonthly: 124500 },
                  { count: 10, monthly: 300000, yearlyMonthly: 249000 },
                ].map((row) => (
                  <tr key={row.count}>
                    <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">
                      {row.count} bàn đóng gói
                    </td>
                    <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                      {row.monthly.toLocaleString()} won/tháng
                    </td>
                    <td className="px-4 py-3 font-semibold text-emerald-600 dark:text-emerald-400">
                      {row.yearlyMonthly.toLocaleString()} won/tháng ({(row.yearlyMonthly * 12).toLocaleString()} won/năm)
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
              Chi phí một tháng video đóng gói 30,000 won được thu hồi chỉ cần
              giảm 1 trường hợp hoàn tiền bất hợp lý. Với người bán trung bình,
              ROI phát sinh trong vòng 1~2 tháng, và nếu cộng thêm thời gian tiết
              kiệm khi xử lý khiếu nại thì hiệu quả thực tế còn lớn hơn nhiều.
            </p>
            <p>
              Nếu bạn chi gần 20,000 won cho mỗi lần nhấp vào một từ khóa quảng
              cáo Google, thì chi phí một tháng video đóng gói chỉ tương đương
              chi phí của 1,5 lần nhấp quảng cáo.
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
