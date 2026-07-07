import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "../../site";
import { ImagePlaceholder } from "../../components/Illustrations";
import { JsonLd, buildBreadcrumb, buildArticle } from "../../components/JsonLd";
import { ConversionCTA } from "../../components/ConversionCTA";
import { languageAlternates, localePath } from "../../i18n";

const PATH = "/compare";

export const metadata: Metadata = {
  title: "So sánh các nhà cung cấp video đóng gói - Giá, tính năng, lưu trữ trong một bảng",
  description:
    "So sánh giá, thời gian lưu trữ, tích hợp WMS, API và điều khoản cam kết của 4 loại dịch vụ video đóng gói (Zeropacking + Công ty A·B·C) trong một bảng. Kèm ma trận gợi ý theo quy mô doanh nghiệp.",
  alternates: {
    canonical: localePath("vi", PATH),
    languages: languageAlternates(PATH, ["ko", "ja", "zh-tw", "vi"]),
  },
  openGraph: {
    title: "So sánh các nhà cung cấp video đóng gói - Giá, tính năng trong một bảng",
    description:
      "Bảng so sánh 4 loại dịch vụ video đóng gói + hướng dẫn gợi ý theo quy mô doanh nghiệp.",
    url: localePath("vi", PATH),
    locale: "vi_VN",
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
    name: "Zeropacking",
    badge: "Hansheet gợi ý",
    type: "SaaS chuyên dụng cho video đóng gói",
    price: "30.000 won",
    priceNote: "mỗi bàn đóng gói / tháng (chưa gồm VAT)",
    storage: "3 tháng",
    quality: "HD",
    search: "Tra cứu tức thì bằng mã vận đơn (trung bình 3 giây)",
    wms: "✅ Bao gồm sẵn",
    api: "✅ REST + Webhook bao gồm sẵn",
    camera: "Mua riêng (tương thích webcam USB từ 50.000~100.000 won)",
    contract: "Theo tháng (không cam kết), giảm 17% khi thanh toán theo năm",
    trial: "Dùng thử miễn phí 15 ngày (không cần đăng ký thẻ)",
    bestFor: "Người bán có 200~5.000 đơn xuất/tháng, muốn giảm gánh nặng xử lý khiếu nại",
  },
  {
    id: "vendor-a",
    name: "Công ty A (SaaS logistics lớn)",
    type: "Mô-đun video trong gói tổng hợp WMS·OMS",
    price: "50.000~80.000 won + α",
    priceNote: "mỗi bàn đóng gói / tháng, giấy phép WMS chính tính riêng",
    storage: "1~3 tháng (tùy gói cước)",
    quality: "HD~FHD",
    search: "Có thể tra cứu mã vận đơn (sau khi tích hợp hệ thống)",
    wms: "✅ Liên kết chặt với WMS riêng",
    api: "✅ Có cung cấp (ưu tiên WMS riêng)",
    camera: "Khuyến nghị mua riêng camera theo gói",
    contract: "Thường cam kết 12 tháng, phí thiết lập ban đầu tính riêng",
    trial: "Theo demo/PoC (thương lượng với kinh doanh)",
    bestFor: "Vận hành logistics lớn từ 10.000 đơn/tháng trở lên, khi muốn triển khai tích hợp cả WMS·video·đối soát",
  },
  {
    id: "vendor-b",
    name: "Công ty B (giải pháp tự phát triển)",
    type: "On-premise + gói camera",
    price: "100.000~150.000 won",
    priceNote: "mỗi bàn đóng gói / tháng + phí lắp đặt ban đầu từ 1.000.000 won",
    storage: "6 tháng (phụ thuộc NVR riêng)",
    quality: "FHD",
    search: "Tra cứu theo dòng thời gian DVR (hỗ trợ một phần lập chỉ mục mã vận đơn)",
    wms: "△ Khi thêm mô-đun riêng",
    api: "△ Hạn chế",
    camera: "Bắt buộc mua camera IP chuyên dụng (300.000~500.000 won mỗi cái)",
    contract: "Cam kết 12~24 tháng, không hoàn phí lắp đặt",
    trial: "Đăng ký demo riêng",
    bestFor: "Môi trường nhạy cảm về bảo mật không dùng được đám mây bên ngoài, trung tâm logistics lớn",
  },
  {
    id: "vendor-c",
    name: "Công ty C (startup / beta)",
    type: "Dịch vụ mới ở giai đoạn đầu",
    price: "0 won~15.000 won",
    priceNote: "mỗi bàn đóng gói / tháng (giai đoạn beta)",
    storage: "1 tháng",
    quality: "HD (một phần SD)",
    search: "Tra cứu theo khung giờ cơ bản, lập chỉ mục mã vận đơn một phần",
    wms: "❌ Chưa hỗ trợ (trong lộ trình)",
    api: "❌ Chưa hỗ trợ",
    camera: "Dùng điện thoại thông minh hoặc webcam USB",
    contract: "Theo tháng, có thể tăng giá khi kết thúc beta",
    trial: "Beta miễn phí",
    bestFor: "Người bán cá nhân dưới 100 đơn xuất/tháng, muốn triển khai nhẹ nhàng trước",
  },
];

const RECOMMENDATION = [
  {
    profile: "Người bán cá nhân (dưới 100 đơn/tháng)",
    pick: "Công ty C hoặc Zeropacking",
    why: "Giai đoạn đầu có thể bắt đầu với beta của Công ty C. Khi khiếu nại bắt đầu tăng, khuyến nghị chuyển ngay sang Zeropacking. Cả hai dịch vụ đều không cam kết nên chi phí chuyển đổi thấp.",
  },
  {
    profile: "Người bán giai đoạn tăng trưởng (200~5.000 đơn/tháng)",
    pick: "Zeropacking",
    why: "Theo tháng không cam kết, bao gồm sẵn WMS·API, tự do chọn camera. Đây là khoảng quy mô cho ROI nhanh nhất.",
  },
  {
    profile: "Logistics lớn (từ 10.000 đơn/tháng)",
    pick: "Zeropacking (nhiều bàn đóng gói) hoặc Công ty A",
    why: "Nếu đã dùng WMS·OMS thì cân nhắc gói tích hợp của Công ty A. Nếu chỉ muốn triển khai nhanh phần video thì nhiều bàn đóng gói của Zeropacking đơn giản và rẻ hơn.",
  },
  {
    profile: "Nhạy cảm bảo mật / cung cấp cho chính phủ·tập đoàn lớn",
    pick: "Công ty B (on-premise)",
    why: "Ở môi trường hạn chế dùng đám mây bên ngoài, nền tảng NVR riêng như Công ty B là phù hợp. Tuy nhiên phải chấp nhận gánh nặng chi phí ban đầu và cam kết.",
  },
];

const FAQ = [
  {
    q: "Vì sao giá có ‘+α’ hoặc có khoảng giá?",
    a: "Công ty A·B có giá thay đổi nhiều tùy cấu hình gói hoặc thời hạn cam kết. So sánh này dựa trên tài liệu thị trường chung và là khoảng ước tính; để có báo giá chính xác, vui lòng liên hệ trực tiếp đội kinh doanh của từng công ty.",
  },
  {
    q: "Vì sao Zeropacking được gợi ý?",
    a: "Hansheet là đơn vị vận hành cùng với Zeropacking, nhưng việc đánh giá so sánh được thực hiện theo tiêu chí khách quan (giá, thời gian lưu trữ, có bao gồm sẵn WMS·API hay không, điều khoản cam kết). Kết luận là với người bán quy mô 200~5.000 đơn/tháng thì hiệu quả trên chi phí là lớn nhất.",
  },
  {
    q: "Các công ty khác không có điểm nào tốt hơn sao?",
    a: "Có. Công ty A mạnh ở vận hành tích hợp logistics lớn, Công ty B mạnh ở môi trường nhạy cảm bảo mật, Công ty C mạnh ở triển khai miễn phí ban đầu. Bạn hãy tham khảo ma trận gợi ý để lựa chọn phù hợp với tình huống của mình.",
  },
  {
    q: "Nguồn của dữ liệu so sánh ở đâu?",
    a: "Đây là ước tính thị trường chung tổng hợp từ tài liệu công khai của từng công ty, đánh giá từ cộng đồng người bán và tài liệu báo giá khi mở gian hàng trên sàn thương mại điện tử, tính đến tháng 5/2026. Giá hiện tại chính xác cần xác nhận trực tiếp với từng nhà cung cấp.",
  },
];

export default function ComparePage() {
  const today = "2026-06-14T00:00:00.000Z";
  return (
    <>
      <JsonLd
        data={buildBreadcrumb(SITE_URL, [
          { name: "Trang chủ", path: localePath("vi", "/") },
          { name: "So sánh video đóng gói", path: localePath("vi", PATH) },
        ])}
      />
      <JsonLd
        data={buildArticle({
          siteUrl: SITE_URL,
          path: localePath("vi", PATH),
          headline: "So sánh các nhà cung cấp video đóng gói - Giá, tính năng, lưu trữ trong một bảng",
          description:
            "Hướng dẫn so sánh giá·lưu trữ·tính năng·cam kết của 4 loại dịch vụ video đóng gói.",
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
        <nav aria-label="Vị trí hiện tại" className="mb-6 text-sm text-zinc-500">
          <Link href={localePath("vi", "/")} className="hover:text-black dark:hover:text-white">Trang chủ</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-700 dark:text-zinc-300">So sánh video đóng gói</span>
        </nav>

        <header className="mb-12">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-zinc-500">
            So sánh các nhà cung cấp video đóng gói
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
            So sánh dịch vụ video đóng gói
            <br />
            <span className="text-zinc-500">Zeropacking vs Công ty A·B·C</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            Bạn muốn triển khai video đóng gói nhưng băn khoăn không biết chọn
            dịch vụ nào? Hansheet đã so sánh 4 loại giải pháp video đóng gói tiêu
            biểu trên thị trường theo từng hạng mục cốt lõi như giá, thời gian lưu
            trữ, tích hợp WMS·API, điều khoản cam kết. Hãy tìm lựa chọn phù hợp với
            quy mô doanh nghiệp của bạn.
          </p>
          <p className="mt-3 text-xs text-zinc-500">
            So sánh này là phân tích khách quan dựa trên tài liệu thị trường chung
            tính đến tháng 5/2026, và Công ty A·B·C là cách ghi ẩn danh đại diện
            cho từng nhóm. Giá hiện tại chính xác vui lòng xác nhận trực tiếp với
            từng nhà cung cấp.
          </p>
        </header>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            Bảng so sánh trong một cái nhìn
          </h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full min-w-[800px] text-sm">
              <thead className="bg-zinc-50 text-left dark:bg-zinc-900">
                <tr>
                  <th className="sticky left-0 bg-zinc-50 px-4 py-3 font-semibold text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                    Hạng mục
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
                  { label: "Loại", key: "type" as const },
                  { label: "Giá", key: "price" as const, secondary: "priceNote" as const },
                  { label: "Thời gian lưu trữ video", key: "storage" as const },
                  { label: "Chất lượng ghi hình", key: "quality" as const },
                  { label: "Tra cứu video", key: "search" as const },
                  { label: "Tích hợp WMS·OMS", key: "wms" as const },
                  { label: "API·Webhook", key: "api" as const },
                  { label: "Camera", key: "camera" as const },
                  { label: "Cam kết·thanh toán", key: "contract" as const },
                  { label: "Dùng thử miễn phí", key: "trial" as const },
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
            Phân tích chi tiết từng giải pháp
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
                  <strong className="text-black dark:text-white">Người bán phù hợp:</strong>{" "}
                  {v.bestFor}
                </p>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
                  <div>
                    <dt className="text-zinc-500">Giá</dt>
                    <dd className="mt-1 font-semibold text-black dark:text-white">{v.price}</dd>
                  </div>
                  <div>
                    <dt className="text-zinc-500">Lưu trữ</dt>
                    <dd className="mt-1 font-semibold text-black dark:text-white">{v.storage}</dd>
                  </div>
                  <div>
                    <dt className="text-zinc-500">WMS</dt>
                    <dd className="mt-1 font-semibold text-black dark:text-white">{v.wms}</dd>
                  </div>
                  <div>
                    <dt className="text-zinc-500">Cam kết</dt>
                    <dd className="mt-1 font-semibold text-black dark:text-white">{v.contract.split(",")[0]}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            Ma trận gợi ý theo quy mô doanh nghiệp
          </h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 text-left dark:bg-zinc-900">
                <tr>
                  <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">Hồ sơ doanh nghiệp</th>
                  <th className="px-4 py-3 font-semibold text-black dark:text-white">Gợi ý</th>
                  <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">Lý do</th>
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
            5 điều nhất định phải kiểm tra khi quyết định triển khai
          </h2>
          <ol className="mt-6 list-decimal space-y-3 pl-5 text-base leading-7 text-zinc-700 dark:text-zinc-300">
            <li>
              <strong className="text-black dark:text-white">Tổng chi phí</strong>: Đừng chỉ nhìn phí
              hàng tháng, hãy cộng tất cả phí lắp đặt ban đầu, chi phí camera và phí thêm mô-đun WMS.
            </li>
            <li>
              <strong className="text-black dark:text-white">Thời hạn cam kết</strong>: Sản phẩm cam kết
              12 tháng rất khó hủy giữa chừng. Thanh toán theo tháng có lợi hơn về tính linh hoạt.
            </li>
            <li>
              <strong className="text-black dark:text-white">Thời gian lưu trữ video</strong>: Phần lớn khiếu nại
              đến trong vòng một tháng, nhưng khiếu nại đổi hàng, gửi lại hay đến muộn vẫn phát sinh sau đó. CCTV (ghi đè sau 7~30 ngày)
              hay dịch vụ chỉ lưu một tháng dễ bỏ lỡ, nên hãy kiểm tra xem có lưu 3 tháng như Zeropacking không.
            </li>
            <li>
              <strong className="text-black dark:text-white">Cách tra cứu</strong>: Nhất định kiểm tra xem
              có tra cứu trực tiếp bằng mã vận đơn được không. Nếu chỉ tra cứu được theo khung giờ thì thực chất không khác gì CCTV.
            </li>
            <li>
              <strong className="text-black dark:text-white">Điều kiện dùng thử miễn phí</strong>: Kiểm tra xem
              có thể bắt đầu mà không cần đăng ký thẻ không, và có bị tự động chuyển sang thanh toán không.
            </li>
          </ol>
        </section>

        <section className="mb-14">
          <figure>
            <ImagePlaceholder
              label="Infographic so sánh hoặc ảnh chụp màn hình dashboard của 4 giải pháp"
              ratio="16/9"
            />
            <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              Infographic so sánh sẽ được bổ sung
            </figcaption>
          </figure>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            Câu hỏi thường gặp
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

        <ConversionCTA locale="vi" title="So sánh xong rồi, hãy bắt đầu với Zeropacking" />

        <nav aria-label="Bài viết liên quan" className="mt-14 grid gap-3 sm:grid-cols-2">
          <Link href={localePath("vi", "/vs-cctv")} className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">Bài viết liên quan</span>
            <p className="mt-1 font-semibold text-black dark:text-white">Video đóng gói vs CCTV</p>
          </Link>
          <Link href={localePath("vi", "/cases")} className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">Bài viết liên quan</span>
            <p className="mt-1 font-semibold text-black dark:text-white">5 trường hợp triển khai thực tế</p>
          </Link>
        </nav>
      </main>
    </>
  );
}
