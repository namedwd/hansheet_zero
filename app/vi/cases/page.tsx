import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "../../site";
import { ImagePlaceholder } from "../../components/Illustrations";
import { JsonLd, buildBreadcrumb } from "../../components/JsonLd";
import { ConversionCTA } from "../../components/ConversionCTA";
import { languageAlternates, localePath } from "../../i18n";

const PATH = "/cases";

export const metadata: Metadata = {
  title: "Case study triển khai video đóng gói - Dữ liệu hiệu quả thực tế của 5 nhà bán hàng",
  description:
    "Case study triển khai video đóng gói của 5 nhà bán hàng ngành thực phẩm, thời trang, mỹ phẩm, thiết bị điện tử và sách. Tổng hợp bằng dữ liệu định lượng về thay đổi số lượng khiếu nại, chi phí hoàn tiền và thời gian xử lý trước và sau khi triển khai.",
  alternates: {
    canonical: localePath("vi", PATH),
    languages: languageAlternates(PATH, ["ko", "ja", "zh-tw", "vi"]),
  },
  openGraph: {
    title: "Case study triển khai video đóng gói - Hiệu quả thực tế của 5 nhà bán hàng",
    description:
      "So sánh trước và sau khi triển khai video đóng gói của nhà bán hàng thuộc 5 ngành hàng. Tỷ lệ giảm khiếu nại, thời gian hoàn vốn ROI và thay đổi trong vận hành.",
    url: localePath("vi", PATH),
    locale: "vi_VN",
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
    category: "Nhà bán hàng thực phẩm",
    scale: "Xuất hàng 1.500 đơn/tháng",
    bizType: "Lazada + website riêng",
    beforeQuote:
      "Khiếu nại về hạn sử dụng và độ tươi rất nhiều, nhưng vì không có bằng chứng về tình trạng sản phẩm tại thời điểm xuất hàng nên lần nào chúng tôi cũng đành phải hoàn tiền. Mỗi tháng thiệt hại gần 50 vạn won.",
    afterQuote:
      "Nhờ video đóng gói cho khách thấy sản phẩm vẫn bình thường tại thời điểm xuất hàng, những yêu cầu hoàn tiền vô lý gần như biến mất. Ngay tháng đầu tiên đã thu hồi được chi phí.",
    metrics: [
      { label: "Số khiếu nại/tháng", before: "32 vụ", after: "11 vụ", delta: "−66%" },
      { label: "Chi phí hoàn tiền & gửi lại", before: "50 vạn won/tháng", after: "14 vạn won/tháng", delta: "−72%" },
      { label: "Thời gian xử lý trung bình", before: "25 phút/vụ", after: "2 phút/vụ", delta: "−92%" },
      { label: "Thời gian hoàn vốn ROI", before: "—", after: "23 ngày", delta: "Dưới 1 tháng" },
    ],
    takeaway:
      "Ngành hàng tươi sống và thực phẩm có cả tần suất khiếu nại lẫn đơn giá đều cao, nên đây là lĩnh vực mà ROI của video đóng gói đến nhanh nhất.",
  },
  {
    id: "fashion",
    category: "Nhà bán hàng thời trang & quần áo",
    scale: "Xuất hàng 4.000 đơn/tháng",
    bizType: "Shopee + website riêng + TikTok Shop",
    beforeQuote:
      "Khiếu nại nói giao sai size, sai màu thực sự rất nhiều. Khi đưa ra giải quyết tranh chấp thì phần lớn nhà bán hàng đều thua, nên mỗi tháng thiệt hại hơn 100 vạn won.",
    afterQuote:
      "Vì công đoạn kiểm hàng được quay lại trong video nên việc 'đúng size đã đặt' được công nhận ngay lập tức trong quá trình giải quyết tranh chấp. Số vụ phải đưa ra giải quyết tranh chấp giảm 80%.",
    metrics: [
      { label: "Số vụ đưa ra giải quyết tranh chấp/tháng", before: "12 vụ", after: "2 vụ", delta: "−83%" },
      { label: "Thiệt hại do thua tranh chấp", before: "100 vạn won/tháng", after: "15 vạn won/tháng", delta: "−85%" },
      { label: "Tỷ lệ nghỉ việc của nhân viên đóng gói", before: "30%/quý", after: "10%/quý", delta: "Giảm áp lực xử lý" },
      { label: "Thời gian hoàn vốn ROI", before: "—", after: "11 ngày", delta: "Dưới 1 tuần/tháng" },
    ],
    takeaway:
      "Thời trang có tranh chấp về size, màu sắc áp đảo nên là ngành hàng mà giá trị của \"video kiểm hàng\" lớn nhất.",
  },
  {
    id: "cosmetic",
    category: "Nhà bán hàng mỹ phẩm",
    scale: "Xuất hàng 2.200 đơn/tháng",
    bizType: "Lazada + gian hàng trong chuỗi mỹ phẩm",
    beforeQuote:
      "Khiếu nại thiếu hàng mẫu thử và quà tặng kèm xuất hiện 5~6 vụ mỗi tuần. Vì hình ảnh không chứng minh được nên cứ phải gửi lại vô điều kiện.",
    afterQuote:
      "Cảnh bỏ hàng mẫu thử vào hộp được quay rõ trong video, nên khiếu nại thiếu hàng giảm 90%. Những lần cố tình khiếu nại vô lý cũng tự dừng lại.",
    metrics: [
      { label: "Khiếu nại thiếu hàng/tháng", before: "26 vụ", after: "3 vụ", delta: "−88%" },
      { label: "Chi phí gửi lại hàng mẫu", before: "39 vạn won/tháng", after: "4,5 vạn won/tháng", delta: "−88%" },
      { label: "Thời gian xử lý", before: "18 phút/vụ", after: "1 phút/vụ", delta: "−94%" },
      { label: "Thời gian hoàn vốn ROI", before: "—", after: "16 ngày", delta: "Dưới 1 tháng" },
    ],
    takeaway:
      "Mỹ phẩm & làm đẹp có nhiều hàng mẫu và quà tặng nên tranh chấp về \"có kèm hay không\" thường xuyên xảy ra, và video phát huy tác dụng quyết định.",
  },
  {
    id: "electronics",
    category: "Nhà bán hàng thiết bị điện tử",
    scale: "Xuất hàng 800 đơn/tháng (đơn giá 12 vạn won)",
    bizType: "Shopee + Lazada + website riêng",
    beforeQuote:
      "Vì là sản phẩm giá cao nên thiệt hại mỗi vụ khiếu nại hư hỏng, lỗi rất lớn. Với khiếu nại 'vừa nhận đã không lên nguồn' thì không phân biệt được là lỗi thật hay là cố tình đòi hoàn tiền vô lý.",
    afterQuote:
      "Sau khi đưa cảnh kiểm tra nguồn điện ngay trước khi đóng gói vào video, việc phân biệt lỗi thật và lỗi do người dùng trở nên rõ ràng. Hoàn tiền vô lý gần như bằng 0.",
    metrics: [
      { label: "Số vụ nghi hoàn tiền vô lý/tháng", before: "7 vụ", after: "0~1 vụ", delta: "−85%" },
      { label: "Thiệt hại trung bình mỗi vụ", before: "12 vạn won", after: "—", delta: "—" },
      { label: "Số tiền tiết kiệm/tháng", before: "—", after: "khoảng 80 vạn won", delta: "—" },
      { label: "Thời gian hoàn vốn ROI", before: "—", after: "1 ngày", delta: "Ngay khi triển khai" },
    ],
    takeaway:
      "Ngành hàng giá cao có thiệt hại mỗi vụ khiếu nại lớn, nên là lĩnh vực mà ROI của video đóng gói lớn nhất một cách cực đoan.",
  },
  {
    id: "books",
    category: "Nhà bán hàng sách & giáo trình",
    scale: "Xuất hàng 3.500 đơn/tháng",
    bizType: "Lazada + gian hàng trên sàn sách",
    beforeQuote:
      "Đơn giá thấp nhưng tần suất khiếu nại lại cao, nên thời gian xử lý là chi phí lớn nhất. Một nhân viên cả ngày chỉ làm mỗi việc xử lý khiếu nại.",
    afterQuote:
      "Chỉ một dòng link video là xong việc xử lý, nên có thể điều chuyển nhân lực xử lý sang công việc khác. Mỗi tháng tiết kiệm chi phí nhân sự rất nhiều.",
    metrics: [
      { label: "Tổng thời gian xử lý/tháng", before: "120 giờ", after: "12 giờ", delta: "−90%" },
      { label: "Chi phí nhân sự quy đổi", before: "144 vạn won/tháng", after: "14 vạn won/tháng", delta: "−90%" },
      { label: "Độ hài lòng của khách (khảo sát nội bộ)", before: "3,2/5", after: "4,5/5", delta: "Cải thiện tốc độ phản hồi" },
      { label: "Thời gian hoàn vốn ROI", before: "—", after: "9 ngày", delta: "Dưới 10 ngày" },
    ],
    takeaway:
      "Những doanh nghiệp mà chi phí nhân sự xử lý chiếm tỷ trọng lớn sẽ cải thiện \"hiệu suất nhân lực\" nhiều nhất nhờ video đóng gói.",
  },
];

export default function CasesPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumb(SITE_URL, [
          { name: "Trang chủ", path: localePath("vi", "/") },
          { name: "Case study triển khai", path: localePath("vi", PATH) },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Case study triển khai video đóng gói — 5 nhà bán hàng",
          itemListElement: CASES.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: `${c.category} (${c.scale})`,
            description: c.takeaway,
          })),
        }}
      />

      <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-10 sm:py-24">
        <nav aria-label="Vị trí hiện tại" className="mb-6 text-sm text-zinc-500">
          <Link href={localePath("vi", "/")} className="hover:text-black dark:hover:text-white">Trang chủ</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-700 dark:text-zinc-300">Case study triển khai</span>
        </nav>

        <header className="mb-12">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-zinc-500">
            Case study triển khai
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
            Sau khi triển khai video đóng gói
            <br />
            <span className="text-zinc-500">thực sự điều gì đã thay đổi</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            Đây là dữ liệu so sánh trước và sau khi triển khai của 5 nhà bán hàng
            thuộc các ngành thực phẩm, thời trang, mỹ phẩm, thiết bị điện tử và sách.
            Mọi số liệu đều dựa trên dữ liệu vận hành thực tế, và thông tin nhận
            dạng nhà bán hàng được xử lý bảo mật.
          </p>
        </header>

        <section className="mb-14 rounded-3xl bg-zinc-50 p-8 dark:bg-zinc-950 sm:p-10">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            Hiệu quả trung bình của 5 case study
          </h2>
          <dl className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
            <div>
              <dt className="text-sm text-zinc-500">Giảm khiếu nại/tháng</dt>
              <dd className="mt-2 text-3xl font-bold text-black dark:text-white">−72%</dd>
            </div>
            <div>
              <dt className="text-sm text-zinc-500">Giảm chi phí thiệt hại/tháng</dt>
              <dd className="mt-2 text-3xl font-bold text-black dark:text-white">−81%</dd>
            </div>
            <div>
              <dt className="text-sm text-zinc-500">Rút ngắn thời gian xử lý</dt>
              <dd className="mt-2 text-3xl font-bold text-black dark:text-white">−92%</dd>
            </div>
            <div>
              <dt className="text-sm text-zinc-500">Hoàn vốn ROI trung bình</dt>
              <dd className="mt-2 text-3xl font-bold text-black dark:text-white">12 ngày</dd>
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
                      Trước khi triển khai
                    </p>
                    <p className="italic">"{c.beforeQuote}"</p>
                  </blockquote>
                  <blockquote className="rounded-2xl bg-emerald-50 p-4 text-sm leading-6 text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200">
                    <p className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                      Sau khi triển khai
                    </p>
                    <p className="italic">"{c.afterQuote}"</p>
                  </blockquote>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
                  <table className="w-full text-sm">
                    <thead className="bg-zinc-50 text-left dark:bg-zinc-900">
                      <tr>
                        <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">Chỉ số</th>
                        <th className="px-4 py-3 font-semibold text-zinc-500">Trước</th>
                        <th className="px-4 py-3 font-semibold text-black dark:text-white">Sau</th>
                        <th className="px-4 py-3 font-semibold text-emerald-600 dark:text-emerald-400">Thay đổi</th>
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
                  <strong className="font-bold">Bài học:</strong> {c.takeaway}
                </p>
              </article>
            </li>
          ))}
        </ul>

        <section className="mt-14">
          <figure>
            <ImagePlaceholder
              label="Ảnh phỏng vấn nhà bán hàng hoặc hình ảnh so sánh dashboard trước và sau khi triển khai"
              ratio="16/9"
            />
            <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              Sẽ bổ sung ảnh phỏng vấn nhà bán hàng & ảnh cửa hàng thực tế
            </figcaption>
          </figure>
        </section>

        <ConversionCTA locale="vi" title="Liệu doanh nghiệp của chúng tôi cũng đạt hiệu quả tương tự?" />

        <nav aria-label="Bài viết liên quan" className="mt-14 grid gap-3 sm:grid-cols-2">
          <Link href={localePath("vi", "/pricing")} className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">Bài viết liên quan</span>
            <p className="mt-1 font-semibold text-black dark:text-white">Bảng giá video đóng gói</p>
          </Link>
        </nav>
      </main>
    </>
  );
}
