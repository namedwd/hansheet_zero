import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SITE_URL } from "../../site";
import { JsonLd, buildBreadcrumb, buildArticle } from "../../components/JsonLd";
import { ConversionCTA } from "../../components/ConversionCTA";
import { languageAlternates, localePath } from "../../i18n";

const PATH = "/guide";

export const metadata: Metadata = {
  title: "Hướng dẫn triển khai video đóng gói 2026 - Từ lắp camera đến vận hành",
  description:
    "Hướng dẫn từng bước mới nhất 2026 dành cho nhà bán hàng lần đầu triển khai video đóng gói. Vị trí・góc lắp camera, thiết lập bàn đóng gói, kết nối mã vạch, đào tạo nhân viên, xử lý khiếu nại và điểm lưu ý triển khai theo từng ngành hàng — tất cả gói gọn trong một trang.",
  keywords: [
    "triển khai video đóng gói",
    "lắp đặt video đóng gói",
    "vị trí camera video đóng gói",
    "bắt đầu video đóng gói",
    "lắp đặt quay tự động video đóng gói",
    "lắp camera trên bàn đóng gói",
    "cách triển khai video đóng gói cho vận chuyển",
  ],
  alternates: {
    canonical: localePath("vi", PATH),
    languages: languageAlternates(PATH, ["ko", "ja", "zh-tw", "vi"]),
  },
  openGraph: {
    title: "Hướng dẫn triển khai video đóng gói 2026 - Từ lắp camera đến vận hành",
    description:
      "Lần đầu dùng video đóng gói? Một bài viết này là đủ. Vị trí・góc camera, kết nối mã vạch, đào tạo nhân viên và điểm lưu ý theo ngành hàng.",
    url: localePath("vi", PATH),
    locale: "vi_VN",
  },
};

const STEPS = [
  {
    n: "01",
    t: "Kiểm tra môi trường bàn đóng gói",
    body: "Kiểm tra xem luồng thao tác đóng gói có ổn định không và mặt trên của thùng có hiện rõ trên camera không. Cần có khoảng không gian phía trên bàn đóng gói ở độ cao 80~120cm để lắp camera.",
    tip: "Lỗi thường gặp — Nếu môi trường thường xuyên di chuyển bàn đóng gói mà chỉ cố định camera thì sẽ lệch ra ngoài vùng quay. Hãy cố định vị trí bàn đóng gói trước.",
  },
  {
    n: "02",
    t: "Quyết định vị trí lắp camera",
    body: "Gắn camera lên trần hoặc giá đỡ ngay chính giữa bàn đóng gói. Thông thường nên nghiêng khoảng 30~45 độ để nhìn thấy được phần bên trong thùng. Đồng thời kiểm tra ánh sáng để không tạo ra bóng đổ.",
    tip: "Điểm kiểm tra — Nếu gắn vuông góc (90 độ) với trần thì sẽ không nhìn được bên trong thùng. Nghiêng 30~45 độ + đèn phụ trợ bên cạnh camera mới là đáp án đúng.",
  },
  {
    n: "03",
    t: "Kết nối máy quét mã vạch",
    body: "Kết nối máy quét mã vạch USB hoặc không dây tương thích với hệ thống video đóng gói. Chỉ cần quét mã vạch của mã vận đơn hoặc mã đơn hàng một lần là video đóng gói sẽ tự động bắt đầu ghi.",
    tip: "Điểm kiểm tra — Máy quét không dây có thể gây bỏ sót ghi hình khi hết pin. Cơ sở có sản lượng xuất hàng cao nên dùng máy quét USB có dây.",
  },
  {
    n: "04",
    t: "Kết nối WMS・OMS (tùy chọn)",
    body: "Nếu bạn đang dùng Shopify・Haravan・Sapo hoặc WMS riêng, có thể đối chiếu mã vận đơn tự động qua kết nối API. Vẫn dùng được mà không cần kết nối, nhưng nếu kết nối thì hiệu quả vận hành tăng lên đáng kể.",
    tip: "Tham khảo — Cách kết nối được tổng hợp riêng trong hướng dẫn kết nối API・WMS của video đóng gói. Shopify・Haravan・Sapo đều được hỗ trợ qua API tiêu chuẩn.",
  },
  {
    n: "05",
    t: "Đào tạo nhân viên (10 phút là đủ)",
    body: "Giữ nguyên luồng thao tác đóng gói hiện tại, chỉ cần thêm thao tác 'quét mã vạch thêm một lần'. Trạng thái ghi hình được hiển thị qua phản hồi trên màn hình・tín hiệu LED nên ai cũng kiểm tra được, gần như không có gánh nặng học việc.",
    tip: "Lỗi thường gặp — Nếu bỏ qua cảnh kiểm hàng (kiểm tra số lượng・màu sắc) thì khả năng làm bằng chứng khi tranh chấp sẽ yếu đi. Hãy tạo thói quen 'đưa sản phẩm ra trước camera một lần rồi mới cho vào thùng'.",
  },
  {
    n: "06",
    t: "Xuất thử 5 đơn",
    body: "Hãy xuất thử 5 đơn thực tế để kiểm tra xem video đóng gói có khớp chính xác với mã vận đơn không, chất lượng hình・góc quay có phù hợp không. Nếu cần thì tinh chỉnh vị trí camera.",
    tip: "Điểm kiểm tra — Hãy chắc chắn kiểm tra xem chữ trên vận đơn có đọc rõ trong video không. Nếu không nhận diện được vận đơn thì khả năng tìm kiếm・làm bằng chứng đều giảm.",
  },
  {
    n: "07",
    t: "Xây dựng chuẩn xử lý khiếu nại",
    body: "Hãy biến quy trình tìm mã vận đơn → sao chép liên kết video → gửi qua Zalo/tin nhắn khi khách hàng khiếu nại thành cẩm nang nội bộ. Thời gian xử lý giảm từ trung bình 30 phút xuống dưới 1 phút.",
    tip: "Tham khảo — Kịch bản xử lý theo từng loại được tổng hợp trong hướng dẫn giải quyết khiếu nại vận chuyển. Bạn có thể sao chép dùng ngay.",
  },
  {
    n: "08",
    t: "Theo dõi dữ liệu vận hành",
    body: "Đo lường số lượng khiếu nại và chi phí hoàn tiền theo tháng để định lượng hiệu quả trước và sau khi triển khai video đóng gói. Phần lớn nhà bán hàng xác nhận ROI trong vòng 1~2 tháng.",
    tip: "Điểm kiểm tra — Nếu ghi lại trước dữ liệu khiếu nại của 1 tháng trước khi triển khai, bạn có thể so sánh chính xác hiệu quả sau khi triển khai.",
  },
];

// Danh sách kiểm tra vật tư chuẩn bị trước khi triển khai
const PREP = [
  { item: "PC bàn đóng gói (có thể tận dụng cái sẵn có)", note: "Không cần máy chủ riêng, chỉ cài client" },
  { item: "Camera (webcam USB hoặc camera IP)", note: "Tương thích từ webcam USB tầm 1~2 triệu won" },
  { item: "Giá đỡ camera hoặc ngàm gắn trần", note: "Cố định ở độ cao 80~120cm trên bàn đóng gói" },
  { item: "Máy quét mã vạch", note: "Khuyến nghị USB có dây (loại không dây cần quản lý pin)" },
  { item: "Đèn phụ trợ (tùy chọn)", note: "Kho thiếu sáng thì lắp bên cạnh camera" },
  { item: "Kết nối Internet", note: "Dùng để tải lên đám mây, Internet thông thường là đủ" },
];

// Điểm lưu ý triển khai theo từng ngành hàng
const INDUSTRIES = [
  {
    name: "Thực phẩm・hàng tươi sống",
    point: "Khiếu nại về hạn sử dụng・độ tươi xảy ra nhiều, nên ưu tiên kiểm tra chất lượng hình・ánh sáng của camera để nhãn sản phẩm và tình trạng đóng gói hiện rõ.",
  },
  {
    name: "Quần áo・thời trang",
    point: "Tranh chấp về size・màu sắc nhiều nên bước kiểm hàng là then chốt. Hãy chuẩn hóa luồng trải sản phẩm ra cho thấy rõ tem màu sắc・size rồi mới cho vào thùng.",
  },
  {
    name: "Mỹ phẩm・làm đẹp",
    point: "Khiếu nại thiếu hàng mẫu thử・quà tặng kèm xảy ra thường xuyên. Hãy chắc chắn đưa cả sản phẩm chính và mẫu thử ra kiểm tra trước camera vào trong video.",
  },
  {
    name: "Thiết bị điện tử・hàng giá trị cao",
    point: "Giá trị đơn hàng cao nên tổn thất từ một khiếu nại là lớn. Nếu đưa cảnh kiểm tra nguồn・hoạt động ngay trước khi đóng gói vào video thì việc phân định lỗi sản phẩm vs trách nhiệm người dùng sẽ rõ ràng.",
  },
];

const FAQ = [
  {
    q: "Triển khai video đóng gói mất bao nhiêu ngày?",
    a: "Từ lắp camera đến vận hành bình thường trung bình 1 ngày là đủ. Kể cả khi bao gồm kết nối WMS thì 3~5 ngày là hoàn tất.",
  },
  {
    q: "Có cần PC riêng cho video đóng gói không?",
    a: "Chỉ cần cài client lên PC bàn đóng gói sẵn có. Không cần máy chủ hay PC riêng, toàn bộ việc xử lý・lưu trữ video đều được xử lý trên đám mây.",
  },
  {
    q: "Ở kho thiếu ánh sáng thì video đóng gói có quay rõ không?",
    a: "Có. Chúng tôi cung cấp tùy chọn camera có thể nhận diện cả trong môi trường thiếu sáng. Tuy nhiên vẫn khuyến nghị mức ánh sáng đủ để chữ trên vận đơn hiện rõ.",
  },
  {
    q: "Nên mua camera loại nào?",
    a: "Nhà bán hàng cá nhân・quy mô nhỏ thì webcam USB tầm 1~2 triệu won là đủ. Nếu có từ 3 bàn đóng gói trở lên thì khuyến nghị camera công nghiệp FHD hoặc camera IP PoE. Tiêu chí chọn camera theo quy mô cơ sở được tổng hợp chi tiết trong bài viết gợi ý camera video đóng gói.",
  },
  {
    q: "Camera nên lắp ở độ cao・góc nào?",
    a: "Thông thường lắp ở độ cao 80~120cm trên bàn đóng gói, nghiêng 30~45 độ từ chính giữa. Góc tốt nhất là góc thấy được cả nội dung bên trong thùng và nhãn vận đơn trên cùng một màn hình.",
  },
  {
    q: "Video đóng gói được lưu trong bao lâu?",
    a: "Mặc định được lưu trên đám mây trong 3 tháng. Khoảng 90% khiếu nại vận chuyển xảy ra trong vòng 30 ngày sau khi xuất hàng nên 3 tháng là đủ cover phần lớn. Tiêu chí chọn thời gian lưu trữ vui lòng tham khảo bài viết về thời gian lưu trữ video đóng gói.",
  },
  {
    q: "Đổi nhân viên thì vận hành có vấn đề gì không?",
    a: "Video đóng gói có cấu trúc chỉ thêm 'quét mã vạch một lần' nên nhân viên mới cũng quen trong 5~10 phút. Trạng thái ghi hình được hiển thị qua màn hình・LED nên ai cũng kiểm tra được hoạt động bình thường.",
  },
  {
    q: "Đã có CCTV rồi thì có cần video đóng gói nữa không?",
    a: "CCTV chỉ tìm kiếm được theo khung giờ, còn video đóng gói thì tìm kiếm ngay lập tức bằng số vận đơn. Sự khác biệt giữa hai hệ thống được tổng hợp thành 8 mục trong bài so sánh video đóng gói vs CCTV.",
  },
  {
    q: "Có nhiều bàn đóng gói thì có phải lắp hết không?",
    a: "Video đóng gói có cấu trúc 1 camera + 30.000 won/tháng cho mỗi bàn đóng gói. Cũng có thể ưu tiên triển khai trước ở bàn đóng gói tập trung nhiều khiếu nại rồi mở rộng dần theo từng giai đoạn.",
  },
  {
    q: "Chi phí triển khai có thực sự đáng so với hiệu quả không?",
    a: "Chi phí một tháng của video đóng gói (30.000 won) chỉ cần giảm được 1 đơn hoàn tiền không chính đáng là đã thu hồi được. Mô phỏng số tiền tiết kiệm thực tế theo mức 1.000 đơn xuất hàng/tháng có thể xem trong bài mô phỏng chi phí khiếu nại.",
  },
];

export default function GuidePage() {
  const today = new Date().toISOString();
  return (
    <>
      <JsonLd
        data={buildBreadcrumb(SITE_URL, [
          { name: "Trang chủ", path: "/" },
          { name: "Hướng dẫn triển khai video đóng gói", path: PATH },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "Hướng dẫn triển khai video đóng gói",
          description:
            "Hướng dẫn 8 bước dành cho nhà bán hàng lần đầu triển khai video đóng gói. Từ lắp camera đến theo dõi vận hành.",
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
          headline: "Hướng dẫn triển khai video đóng gói - Từ khi bắt đầu đến vận hành",
          description:
            "Danh sách kiểm tra 8 bước để triển khai video đóng gói. Vị trí camera, kết nối mã vạch, đào tạo nhân viên và chuẩn hóa xử lý khiếu nại.",
          datePublished: today,
          dateModified: today,
        })}
      />

      <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-10 sm:py-24">
        <nav aria-label="Vị trí hiện tại" className="mb-6 text-sm text-zinc-500">
          <Link href={localePath("vi", "/")} className="hover:text-black dark:hover:text-white">Trang chủ</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-700 dark:text-zinc-300">Hướng dẫn triển khai video đóng gói</span>
        </nav>

        <header className="mb-12">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-zinc-500">
            Hướng dẫn · Bản mới nhất 2026 · 8 bước
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
            Hướng dẫn triển khai video đóng gói
            <br />
            <span className="text-zinc-500">Từ lắp camera đến vận hành chỉ trong một lần</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            Đây là hướng dẫn từng bước mới nhất 2026 dành cho nhà bán hàng lần đầu
            triển khai video đóng gói. Vật tư chuẩn bị trước khi triển khai, vị trí・góc
            lắp camera, thiết lập bàn đóng gói, kết nối mã vạch, đào tạo nhân viên,
            xử lý khiếu nại, điểm lưu ý triển khai theo từng ngành hàng — đều được
            tổng hợp đầy đủ. Làm theo từ đầu đến cuối, bạn có thể bắt đầu vận hành
            video đóng gói trong vòng 1 ngày.
          </p>
        </header>

        <section className="mb-12">
          <figure>
            <Image
              src="/packing-video-hero.webp"
              alt="Hình ảnh minh họa camera trên bàn đóng gói đang quay quá trình đóng gói sản phẩm vận chuyển"
              width={1672}
              height={941}
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="h-auto w-full rounded-2xl border border-zinc-200 dark:border-zinc-800"
            />
            <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              Hình ảnh minh họa — thể hiện cảnh video đóng gói bắt đầu ghi hình ngay khi quét mã vạch.
            </figcaption>
          </figure>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            Danh sách kiểm tra vật tư chuẩn bị trước khi triển khai
          </h2>
          <p className="mt-3 text-base leading-7 text-zinc-700 dark:text-zinc-300">
            Đây là những vật tư cần thiết để triển khai video đóng gói. Phần lớn có thể
            tận dụng thiết bị sẵn có nên ít gánh nặng chi phí phát sinh.
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
            Nếu bạn còn băn khoăn về việc chọn camera, hãy xem các mẫu được gợi ý theo
            quy mô cơ sở trong hướng dẫn gợi ý camera video đóng gói.
          </p>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            Danh sách kiểm tra triển khai 8 bước
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
            Điểm lưu ý triển khai theo từng ngành hàng
          </h2>
          <p className="mt-3 text-base leading-7 text-zinc-700 dark:text-zinc-300">
            Dù cùng là video đóng gói, phần cần lưu ý lại khác nhau tùy ngành hàng. Hãy
            kiểm tra điểm lưu ý phù hợp với danh mục cơ sở của bạn.
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
            Hiệu quả triển khai — theo mức nhà bán hàng trung bình
          </h2>
          <dl className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <dt className="text-sm font-medium text-zinc-500">Thời gian xử lý khiếu nại</dt>
              <dd className="mt-2 text-3xl font-bold text-black dark:text-white">−95%</dd>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">30 phút → dưới 1 phút</p>
            </div>
            <div>
              <dt className="text-sm font-medium text-zinc-500">Hoàn tiền không chính đáng</dt>
              <dd className="mt-2 text-3xl font-bold text-black dark:text-white">−30%</dd>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Kết thúc bằng video bằng chứng</p>
            </div>
            <div>
              <dt className="text-sm font-medium text-zinc-500">Thu hồi ROI</dt>
              <dd className="mt-2 text-3xl font-bold text-black dark:text-white">1~2 tháng</dd>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Theo mức phần lớn nhà bán hàng</p>
            </div>
          </dl>
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

        <ConversionCTA locale="vi" title="Đã xem hướng dẫn rồi, bạn có thể bắt đầu ngay hôm nay" />

        <nav aria-label="Bài viết liên quan" className="mt-14 grid gap-3 sm:grid-cols-2">
          <Link href={localePath("vi", "/api")} className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">Bài tiếp theo</span>
            <p className="mt-1 font-semibold text-black dark:text-white">Kết nối API・WMS video đóng gói</p>
          </Link>
          <Link href={localePath("vi", "/vs-cctv")} className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">Bài liên quan</span>
            <p className="mt-1 font-semibold text-black dark:text-white">Video đóng gói vs CCTV</p>
          </Link>
          <Link href={localePath("vi", "/pricing")} className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">Bài liên quan</span>
            <p className="mt-1 font-semibold text-black dark:text-white">Bảng giá video đóng gói</p>
          </Link>
        </nav>
      </main>
    </>
  );
}
