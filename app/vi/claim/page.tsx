import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "../../site";
import { ImagePlaceholder } from "../../components/Illustrations";
import { JsonLd, buildBreadcrumb, buildArticle } from "../../components/JsonLd";
import { ConversionCTA } from "../../components/ConversionCTA";
import { languageAlternates, localePath } from "../../i18n";

const PATH = "/claim";

export const metadata: Metadata = {
  title: "Giải quyết khiếu nại giao hàng - Đóng vụ việc chỉ với một video đóng gói",
  description:
    "Thiếu hàng, giao sai, hư hỏng, hộp rỗng — phương pháp xử lý theo 6 dạng khiếu nại giao hàng, kèm kịch bản phản hồi chuẩn giúp dùng video đóng gói để đóng tranh chấp ngay lập tức.",
  alternates: {
    canonical: localePath("vi", PATH),
    languages: languageAlternates(PATH, ["ko", "ja", "zh-tw", "vi"]),
  },
  openGraph: {
    title: "Hướng dẫn giải quyết khiếu nại giao hàng",
    description:
      "Cách dùng video đóng gói để đóng tranh chấp giao hàng chỉ với một video, kèm kịch bản phản hồi.",
    url: localePath("vi", PATH),
    locale: "vi_VN",
  },
};

const CASES = [
  {
    type: "Thiếu hàng",
    claim: "Trong hộp không có sản phẩm",
    solution:
      "Chụp lại khoảnh khắc sản phẩm được cho vào hộp trong video đóng gói rồi gửi kèm liên kết. Hầu hết trường hợp được đóng ngay lập tức.",
  },
  {
    type: "Giao sai",
    claim: "Tôi nhận được sản phẩm khác",
    solution:
      "Trong video đóng gói, xác nhận mã vận đơn khớp với sản phẩm trong hộp → gửi liên kết video. Đây là căn cứ để cùng kiểm tra khả năng thất lạc/tráo hàng trong quá trình vận chuyển.",
  },
  {
    type: "Hư hỏng",
    claim: "Hộp bị móp méo khi đến nơi",
    solution:
      "Khi video đóng gói cho thấy hộp được xuất đi trong tình trạng bình thường, trách nhiệm sẽ chuyển sang sự cố trong vận chuyển. Đây là bằng chứng quyết định khi yêu cầu đơn vị vận chuyển bồi thường.",
  },
  {
    type: "Nhận hộp rỗng",
    claim: "Trong hộp không có gì cả",
    solution:
      "Video đóng gói ghi lại toàn bộ quá trình cho sản phẩm vào hộp và niêm phong, nên có thể phản bác ngay lập tức cáo buộc hộp rỗng.",
  },
  {
    type: "Sai kích thước・màu sắc",
    claim: "Đây không phải màu tôi đã đặt",
    solution:
      "Ghi lại bước kiểm hàng sao cho màu sắc・kích thước của sản phẩm hiển thị rõ ràng trong video đóng gói. Có thể ngăn các yêu cầu hoàn tiền chỉ vì đổi ý.",
  },
  {
    type: "Thiếu số lượng",
    claim: "Tôi đặt 2 cái nhưng chỉ nhận 1 cái",
    solution:
      "Cảnh kiểm hàng xác nhận số lượng trong video đóng gói là bằng chứng cốt lõi. Đồng thời kiểm tra cả khả năng thất lạc trong quá trình giao hàng.",
  },
];

const SCRIPT = [
  {
    step: "Bước 1 — Tiếp nhận khiếu nại",
    body:
      "“Thành thật xin lỗi vì sự bất tiện này. Tôi sẽ kiểm tra ngay video đóng gói tại thời điểm xuất hàng theo mã vận đơn của Quý khách.”",
  },
  {
    step: "Bước 2 — Gửi liên kết video",
    body:
      "“[Mã vận đơn 1234-5678] đây là liên kết video đóng gói: https://… Quý khách vui lòng xem khoảng phút 0:35, cảnh sản phẩm được cho vào hộp.”",
  },
  {
    step: "Bước 3 — Hướng dẫn xử lý tiếp theo",
    body:
      "(Video không có vấn đề) “Video đóng gói xác nhận hàng đã được xuất đi bình thường, chúng tôi sẽ kiểm tra thêm với đơn vị vận chuyển về khả năng thất lạc rồi thông báo lại.”\n(Thực sự thiếu hàng) “Sau khi kiểm tra, đúng là sản phẩm bị thiếu trong video. Chúng tôi sẽ xử lý gửi lại hàng ngay lập tức.”",
  },
];

const FAQ = [
  {
    q: "Video đóng gói có giải quyết được mọi khiếu nại không?",
    a: "Phần lớn các tranh chấp đơn giản (thiếu hàng・hộp rỗng・cáo buộc hư hỏng) được đóng chỉ bằng việc gửi liên kết video. Tuy nhiên, với sự cố trong vận chuyển hoặc trường hợp cả hai bên đều có trách nhiệm thì cần thêm điều tra từ đơn vị vận chuyển.",
  },
  {
    q: "Cho khách hàng xem video đóng gói có vấn đề về thông tin cá nhân không?",
    a: "Video đóng gói chỉ hiển thị sản phẩm và nhãn vận đơn; góc camera được thiết lập để không lọt khuôn mặt nhân viên hay thông tin đơn hàng khác. Thông tin vận đơn vốn đã được gửi đến chính khách hàng, nên không có thêm thông tin cá nhân nào bị lộ.",
  },
  {
    q: "Video đóng gói có được công nhận làm bằng chứng trong hòa giải tranh chấp trên sàn TMĐT không?",
    a: "Có. Trong quy trình hòa giải tranh chấp của các sàn lớn như Shopee・Lazada・TikTok Shop, video đóng gói được công nhận là bằng chứng quyết định. Vì video hiển thị kèm mã vận đơn và thời gian nên cũng chứng minh được tính toàn vẹn.",
  },
];

export default function ClaimPage() {
  const today = "2026-06-14T00:00:00.000Z";
  return (
    <>
      <JsonLd
        data={buildBreadcrumb(SITE_URL, [
          { name: "Trang chủ", path: localePath("vi", "/") },
          { name: "Giải quyết khiếu nại giao hàng", path: localePath("vi", PATH) },
        ])}
      />
      <JsonLd
        data={buildArticle({
          siteUrl: SITE_URL,
          path: localePath("vi", PATH),
          headline: "Giải quyết khiếu nại giao hàng - Đóng vụ việc chỉ với một video đóng gói",
          description:
            "Phương pháp xử lý theo 6 dạng khiếu nại giao hàng và kịch bản phản hồi chuẩn dựa trên video đóng gói.",
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
          <span className="text-zinc-700 dark:text-zinc-300">Giải quyết khiếu nại giao hàng</span>
        </nav>

        <header className="mb-12">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-zinc-500">
            Hướng dẫn giải quyết khiếu nại
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
            Đóng khiếu nại giao hàng
            <br />
            bằng video đóng gói
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            "Trong hộp không có sản phẩm", "Hộp bị móp méo khi đến nơi", "Tôi nhận
            được sản phẩm khác" — bất kỳ người bán nào cũng từng gặp những khiếu
            nại như vậy. Bài viết này cung cấp phương pháp xử lý theo 6 dạng khiếu
            nại giao hàng, kèm kịch bản phản hồi chuẩn giúp dùng video đóng gói để
            đóng tranh chấp ngay lập tức.
          </p>
        </header>

        <section className="mb-14">
          <figure>
            <ImagePlaceholder
              label="Ví dụ màn hình phản hồi tin nhắn đóng khiếu nại ngay lập tức nhờ video đóng gói"
              ratio="3/2"
            />
            <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              Luồng xử lý tranh chấp được đóng chỉ với một dòng liên kết video (sẽ bổ sung ảnh chụp thực tế)
            </figcaption>
          </figure>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            6 dạng khiếu nại giao hàng — Cách xử lý bằng video đóng gói
          </h2>
          <ul className="mt-6 space-y-4">
            {CASES.map((c) => (
              <li
                key={c.type}
                className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800"
              >
                <div className="flex items-baseline gap-3">
                  <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-white dark:bg-white dark:text-black">
                    {c.type}
                  </span>
                </div>
                <p className="mt-3 text-sm italic text-zinc-500">
                  Khách hàng: “{c.claim}”
                </p>
                <p className="mt-3 text-base leading-7 text-zinc-700 dark:text-zinc-300">
                  <strong className="text-black dark:text-white">Xử lý bằng video đóng gói:</strong>{" "}
                  {c.solution}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            Kịch bản phản hồi chuẩn (sao chép và sử dụng)
          </h2>
          <ol className="mt-6 space-y-5">
            {SCRIPT.map((s) => (
              <li key={s.step} className="rounded-2xl bg-zinc-50 p-5 dark:bg-zinc-950">
                <h3 className="text-base font-semibold text-black dark:text-zinc-50">{s.step}</h3>
                <p className="mt-2 whitespace-pre-line font-mono text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-14 rounded-3xl border border-zinc-200 p-8 dark:border-zinc-800">
          <blockquote className="text-lg italic leading-8 text-zinc-800 dark:text-zinc-200">
            "Trước đây mỗi yêu cầu hoàn tiền vì hộp rỗng tôi phải gọi điện cả 30
            phút, nhưng từ khi áp dụng video đóng gói, chỉ cần gửi một dòng liên
            kết video qua tin nhắn là xong. Với hàng COD, các yêu cầu hoàn tiền vô
            lý cũng giảm hẳn."
          </blockquote>
          <p className="mt-4 text-sm text-zinc-500">— Anh K., người bán ngành thực phẩm</p>
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

        <ConversionCTA locale="vi" title="Giảm gánh nặng khiếu nại ngay từ hôm nay" />

        <nav aria-label="Bài viết liên quan" className="mt-14 grid gap-3 sm:grid-cols-2">
          <Link href={localePath("vi", "/vs-cctv")} className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">Bài viết liên quan</span>
            <p className="mt-1 font-semibold text-black dark:text-white">Video đóng gói vs CCTV</p>
          </Link>
          <Link href={localePath("vi", "/guide")} className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">Bài viết liên quan</span>
            <p className="mt-1 font-semibold text-black dark:text-white">Hướng dẫn triển khai video đóng gói</p>
          </Link>
        </nav>
      </main>
    </>
  );
}
