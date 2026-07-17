import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "../../site";
import { ComparisonChart, ImagePlaceholder } from "../../components/Illustrations";
import { JsonLd, buildBreadcrumb, buildArticle } from "../../components/JsonLd";
import { ConversionCTA } from "../../components/ConversionCTA";
import { languageAlternates, localePath } from "../../i18n";

const PATH = "/vs-cctv";

export const metadata: Metadata = {
  title: "Video đóng gói vs CCTV - Khác nhau như thế nào?",
  description:
    "So sánh nhanh sự khác biệt giữa video đóng gói và camera giám sát (CCTV) thông thường tại cửa hàng. Tìm hiểu khác biệt về tìm kiếm theo mã vận đơn, chính sách lưu trữ video, thời gian xử lý khiếu nại và chi phí.",
  alternates: {
    canonical: localePath("vi", PATH),
    languages: languageAlternates(PATH, ["ko", "ja", "zh-tw", "vi"]),
  },
  openGraph: {
    title: "Hướng dẫn so sánh video đóng gói vs CCTV",
    description:
      "CCTV có đủ để giải quyết khiếu nại giao hàng không? Tổng hợp khác biệt về thời gian tìm kiếm, cách lưu trữ và giá trị làm bằng chứng giữa video đóng gói và CCTV.",
    url: localePath("vi", PATH),
    locale: "vi_VN",
  },
};

const TABLE = [
  {
    item: "Cách tìm kiếm",
    cctv: "Ước lượng khung giờ quay rồi tua thủ công",
    pv: "Tìm tức thì 1:1 theo mã vận đơn",
  },
  {
    item: "Thời gian tìm đúng video",
    cctv: "Trung bình 30 phút ~ vài giờ",
    pv: "Trung bình 3 giây",
  },
  {
    item: "Lập chỉ mục video",
    cctv: "Chỉ có dòng thời gian (không có metadata)",
    pv: "Tự động lập chỉ mục theo mã vận đơn・mã đơn hàng・ngày",
  },
  {
    item: "Xử lý khiếu nại",
    cctv: "Tự cắt và gửi video, tốn nhiều thời gian",
    pv: "Gửi ngay chỉ với một liên kết chia sẻ",
  },
  {
    item: "Chính sách lưu trữ",
    cctv: "Thường tự ghi đè sau 7~30 ngày",
    pv: "Lưu trên đám mây theo từng đơn hàng 90 ngày trở lên",
  },
  {
    item: "Truy cập từ xa",
    cctv: "Phụ thuộc DVR/NVR, mất video khi gặp sự cố",
    pv: "Dựa trên đám mây, xem ngay từ bất cứ đâu",
  },
  {
    item: "Chi phí ban đầu",
    cctv: "Hàng chục triệu đồng (DVR + HDD dung lượng lớn + thi công)",
    pv: "0đ (mỗi bàn đóng gói 599.000đ/tháng)",
  },
  {
    item: "Giá trị làm bằng chứng pháp lý",
    cctv: "Khó chứng minh thời điểm・tính liên kết",
    pv: "Khớp 1:1 với mã vận đơn nên chứng minh rõ ràng",
  },
];

const FAQ = [
  {
    q: "Tôi đã có CCTV rồi, vậy có cần thêm video đóng gói không?",
    a: "CCTV hiệu quả cho mục đích an ninh và chống trộm, nhưng rất khó tìm nhanh quá trình đóng gói của một đơn hàng cụ thể. Video đóng gói được tìm kiếm tức thì theo mã vận đơn nên tốc độ xử lý khiếu nại nhanh hơn không thể so sánh. Hai hệ thống có mục đích khác nhau, và với những người bán có chi phí khiếu nại lớn thì video đóng gói là cần thiết riêng biệt.",
  },
  {
    q: "Có thể làm cho video CCTV cũng tìm được theo mã vận đơn không?",
    a: "Về mặt kỹ thuật là rất khó. CCTV thông thường ghi hình theo khung giờ và không có metadata theo từng đơn hàng. Video đóng gói ngay từ đầu được liên kết với việc quét mã vạch và được thiết kế để gắn đơn hàng - video theo tỉ lệ 1:1.",
  },
  {
    q: "Chẳng phải video đóng gói đắt hơn CCTV sao?",
    a: "Nếu so sánh chi phí ban đầu thì video đóng gói rẻ hơn nhiều. CCTV tốn hàng chục triệu đồng cho DVR・HDD・chi phí thi công, trong khi video đóng gói chỉ 599.000đ/tháng cho mỗi bàn đóng gói và không có chi phí ban đầu riêng. Phần lớn người bán chỉ cần giảm được 1 khiếu nại là đã thu hồi được chi phí của cả tháng.",
  },
];

export default function VsCCTVPage() {
  const today = "2026-06-14T00:00:00.000Z";
  return (
    <>
      <JsonLd
        data={buildBreadcrumb(SITE_URL, [
          { name: "Trang chủ", path: localePath("vi", "/") },
          { name: "Video đóng gói vs CCTV", path: localePath("vi", PATH) },
        ])}
      />
      <JsonLd
        data={buildArticle({
          siteUrl: SITE_URL,
          path: localePath("vi", PATH),
          headline: "Video đóng gói vs CCTV - Khác nhau như thế nào?",
          description:
            "Hướng dẫn so sánh sự khác biệt giữa video đóng gói và CCTV thông thường qua 8 hạng mục như thời gian tìm kiếm, chính sách lưu trữ, chi phí.",
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

      <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-10 sm:py-24">
        <nav aria-label="Vị trí hiện tại" className="mb-6 text-sm text-zinc-500">
          <Link href={localePath("vi", "/")} className="hover:text-black dark:hover:text-white">Trang chủ</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-700 dark:text-zinc-300">Video đóng gói vs CCTV</span>
        </nav>

        <header className="mb-12">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
            Video đóng gói vs CCTV
            <br />
            <span className="text-zinc-500">Khác nhau như thế nào?</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            Bạn cho rằng đã có CCTV thì không cần video đóng gói? Hai hệ thống này
            hoàn toàn khác nhau về mục đích và cấu trúc. Bài viết này tổng hợp sự
            khác biệt giữa video đóng gói và CCTV qua 8 hạng mục, giúp bạn đánh giá
            giải pháp nào phù hợp với cơ sở kinh doanh của mình.
          </p>
        </header>

        <section className="mb-14">
          <figure className="overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
            <ComparisonChart className="h-auto w-full" />
            <figcaption className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
              Giá trị trung bình do Zeropacking tự đo lường. Có thể thay đổi tùy theo môi trường thực tế.
            </figcaption>
          </figure>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            8 khác biệt nhìn trong nháy mắt
          </h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 text-left dark:bg-zinc-900">
                <tr>
                  <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">Hạng mục</th>
                  <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">CCTV thông thường</th>
                  <th className="px-4 py-3 font-semibold text-black dark:text-white">Video đóng gói (Zeropacking)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {TABLE.map((row) => (
                  <tr key={row.item}>
                    <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">{row.item}</td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{row.cctv}</td>
                    <td className="px-4 py-3 text-zinc-900 dark:text-zinc-100">{row.pv}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            Vì sao CCTV là không đủ
          </h2>
          <div className="mt-5 space-y-4 text-base leading-7 text-zinc-700 dark:text-zinc-300">
            <p>
              Hạn chế cốt lõi của CCTV là không có "chỉ mục theo từng đơn hàng". Khi
              một khách hàng khiếu nại rằng "hộp nhận được trống rỗng", để xử lý bằng
              CCTV bạn phải trải qua các bước sau.
            </p>
            <ol className="list-decimal space-y-2 pl-6">
              <li>Ước lượng ngày・giờ xuất hàng theo mã vận đơn.</li>
              <li>Tìm bản ghi CCTV của khung giờ đó.</li>
              <li>Tự mắt tìm "chiếc hộp này" trong video của khung giờ đó.</li>
              <li>Cắt riêng đoạn đó rồi chuyển thành video.</li>
              <li>Gửi cho khách hàng.</li>
            </ol>
            <p>
              Mỗi vụ tốn trung bình hơn 30 phút. Nếu mỗi ngày có 5 khiếu nại thì
              5 ngày/tuần × 30 phút ≈ 12 giờ bị mất đi. Video đóng gói rút gọn quá
              trình này thành nhập mã vận đơn → sao chép liên kết video → gửi
              (khoảng 30 giây).
            </p>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            Cơ sở kinh doanh phù hợp với video đóng gói
          </h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              { t: "Xuất hơn 500 đơn/tháng", d: "Người bán chịu gánh nặng chi phí lớn khi khiếu nại tích lũy" },
              { t: "Người bán trên sàn TMĐT", d: "Tranh chấp thường xuyên trên Shopee・Lazada・TikTok Shop" },
              { t: "Kinh doanh sản phẩm giá trị cao", d: "Hàng điện tử・mỹ phẩm・thực phẩm thường có tranh chấp hư hỏng" },
              { t: "Môi trường nhiều người đóng gói", d: "Cần truy vết trách nhiệm khi có nhiều nhân viên đóng gói" },
            ].map((item) => (
              <li key={item.t} className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
                <h3 className="text-base font-semibold text-black dark:text-zinc-50">{item.t}</h3>
                <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{item.d}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-14">
          <figure>
            <ImagePlaceholder
              label="So sánh màn hình tìm kiếm video đóng gói thực tế vs màn hình dòng thời gian CCTV"
              ratio="16/9"
            />
            <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              (Sẽ bổ sung ảnh chụp màn hình so sánh thực tế)
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

        <ConversionCTA locale="vi" title="Nếu CCTV là không đủ, hãy bắt đầu với video đóng gói" />

        <nav aria-label="Bài viết liên quan" className="mt-14 grid gap-3 sm:grid-cols-2">
          <Link href={localePath("vi", "/guide")} className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">Bài tiếp theo</span>
            <p className="mt-1 font-semibold text-black dark:text-white">Hướng dẫn triển khai video đóng gói</p>
          </Link>
          <Link href={localePath("vi", "/claim")} className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">Bài liên quan</span>
            <p className="mt-1 font-semibold text-black dark:text-white">Cách giải quyết khiếu nại giao hàng</p>
          </Link>
        </nav>
      </main>
    </>
  );
}
