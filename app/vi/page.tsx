import type { Metadata } from "next";
import { SITE_URL } from "../site";
import { StepIllustration, ImagePlaceholder } from "../components/Illustrations";
import { ConversionCTA } from "../components/ConversionCTA";
import { languageAlternates, localePath } from "../i18n";

export const metadata: Metadata = {
  title: {
    absolute: "Hansheet — Tự động ghi video đóng gói, giải quyết khiếu nại giao hàng",
  },
  description:
    "Video đóng gói là đoạn video ghi lại quá trình đóng gói ngay khi xuất hàng. Zeropacking do Hansheet giới thiệu tự động ghi mọi video đóng gói, tìm kiếm tức thì theo mã vận đơn và lưu trên đám mây — giải quyết khiếu nại hư hỏng, giao sai, thiếu hàng chỉ với một video.",
  alternates: {
    canonical: localePath("vi", "/"),
    languages: languageAlternates("/", ["ko", "en", "ja", "zh-tw", "vi"]),
  },
  openGraph: {
    title: "Dịch vụ tự động ghi video đóng gói — giải quyết tranh chấp khiếu nại | Zeropacking",
    description:
      "Tự động ghi và lưu video đóng gói trên đám mây. Tìm kiếm tức thì theo mã vận đơn và đóng khiếu nại nhanh chóng.",
    url: localePath("vi", "/"),
    type: "website",
    locale: "vi_VN",
  },
};

const FAQ = [
  {
    q: "Video đóng gói là gì?",
    a: "Video đóng gói là đoạn ghi lại quá trình đóng gói của đơn hàng thương mại điện tử/giao hàng ngay trước khi xuất kho. Nó ghi lại sản phẩm nào được cho vào hộp, trong tình trạng ra sao, cho đến khoảnh khắc dán vận đơn — nên trở thành bằng chứng khách quan khi khách hàng khiếu nại.",
  },
  {
    q: "Vì sao nên ghi video đóng gói tự động?",
    a: "Ghi thủ công dễ bị bỏ sót, và việc khớp từng video với mã vận đơn để lưu trữ cũng rất tốn công. Dịch vụ video đóng gói tự động bắt đầu và kết thúc ghi chỉ bằng một lần quét mã vạch, sau đó lập chỉ mục theo mã vận đơn để bạn tìm được video trong khoảng 3 giây.",
  },
  {
    q: "Video đóng gói được lưu trong bao lâu?",
    a: "Mặc định lưu an toàn trên đám mây trong 3 tháng. Nếu cần thời gian lưu lâu hơn, chúng tôi sẽ tư vấn riêng, và video được lưu ở chất lượng HD.",
  },
  {
    q: "Video đóng gói giải quyết được những khiếu nại nào?",
    a: "Thiếu hàng, giao sai, hư hỏng, sai kích cỡ/màu sắc, khiếu nại 'nhận được hộp rỗng' — gần như mọi loại tranh chấp giao hàng. Chỉ cần chia sẻ link video đóng gói cho khách hàng là phần lớn khiếu nại được đóng ngay lập tức.",
  },
  {
    q: "Có tích hợp được với WMS/OMS hiện có không?",
    a: "Có. Video đóng gói của Zeropacking cung cấp API chuẩn và giao tiếp mã vạch, tích hợp được với hầu hết các hệ thống thương mại điện tử hoặc WMS tự xây dựng.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: "Hansheet",
      alternateName: ["한시트", "ハンシート", "Zeropacking"],
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      description:
        "Trang hướng dẫn dành cho người bán giảm khiếu nại giao hàng bằng video đóng gói. Giới thiệu dịch vụ tự động ghi video đóng gói của đơn vị vận hành Zeropacking.",
      contactPoint: {
        "@type": "ContactPoint",
        email: "contact@zeropacking.com",
        contactType: "customer service",
        availableLanguage: ["Vietnamese", "Korean", "English"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      url: SITE_URL,
      name: "Hansheet",
      inLanguage: "vi-VN",
      publisher: { "@id": `${SITE_URL}#organization` },
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}#service-vi`,
      serviceType: "Dịch vụ tự động ghi và lưu trữ đám mây video đóng gói",
      name: "Zeropacking Video đóng gói",
      provider: { "@id": `${SITE_URL}#organization` },
      url: "https://www.zeropacking.com/vi",
      description:
        "Tự động ghi video đóng gói và lưu trên đám mây, tìm kiếm tức thì theo mã vận đơn. Giải pháp bằng chứng video để giải quyết khiếu nại và tranh chấp giao hàng.",
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/vi#faq`,
      mainEntity: FAQ.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export default function HomeVi() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">
        <main className="mx-auto w-full max-w-3xl flex-1 bg-white px-6 py-16 dark:bg-black sm:px-10 sm:py-24">
          <header className="mb-14">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-zinc-500">
              Hansheet · Hướng dẫn video đóng gói
            </p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
              Tự động ghi video đóng gói
              <br />
              giải quyết khiếu nại giao hàng
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              Video đóng gói là đoạn video ghi lại nguyên vẹn quá trình đóng gói
              tại thời điểm xuất hàng. Zeropacking do Hansheet giới thiệu tự động
              ghi mọi video đóng gói và lưu an toàn trên đám mây, chỉ cần một mã
              vận đơn là tìm ngay được video tương ứng. Đừng để các tranh chấp hư
              hỏng, giao sai, thiếu hàng làm mất thời gian của bạn nữa.
            </p>

            <figure className="mt-8 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
              <ImagePlaceholder
                label="Camera bàn đóng gói → đám mây → tìm theo mã vận đơn"
                ratio="16/9"
              />
              <figcaption className="border-t border-zinc-200 bg-white px-4 py-3 text-xs text-zinc-600 dark:border-zinc-800 dark:bg-black dark:text-zinc-400">
                Hình minh họa: camera phía trên bàn đóng gói tự động ghi từng
                video đóng gói, lưu lên đám mây và cho phép tìm theo mã vận đơn.
              </figcaption>
            </figure>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://www.zeropacking.com/vi"
                target="_blank"
                rel="noopener"
                className="flex h-12 items-center justify-center rounded-full bg-black px-7 text-base font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                Dùng thử miễn phí
              </a>
              <a
                href="https://www.zeropacking.com/vi"
                target="_blank"
                rel="noopener"
                className="flex h-12 items-center justify-center rounded-full border border-zinc-200 px-7 text-base font-medium text-black transition-colors hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:text-white dark:hover:bg-zinc-900"
              >
                Xem cách hoạt động
              </a>
            </div>
          </header>

          <section className="mb-16 border-t border-zinc-200 pt-12 dark:border-zinc-800">
            <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
              Video đóng gói là gì?
            </h2>
            <div className="mt-5 space-y-4 text-base leading-7 text-zinc-700 dark:text-zinc-300">
              <p>
                Video đóng gói là bản ghi toàn bộ quá trình người bán thương mại
                điện tử/giao hàng cho sản phẩm vào hộp và dán vận đơn. Khác với
                camera giám sát (CCTV) thông thường, video đóng gói được lưu gắn
                1:1 với mã vận đơn, nên khi xảy ra tranh chấp bạn tìm ngay được
                video của đúng đơn hàng đó.
              </p>
              <p>
                &quot;Nhận được hộp rỗng&quot;, &quot;giao nhầm sản phẩm&quot;,
                &quot;hàng bị hư hỏng&quot; là những khiếu nại tốn kém bậc nhất
                với người bán. Video đóng gói cung cấp bằng chứng khách quan tại
                thời điểm xuất hàng cho tất cả các trường hợp đó.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
              Vì sao nên ghi video đóng gói tự động?
            </h2>
            <ul className="mt-6 space-y-5">
              <li className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
                <h3 className="text-lg font-semibold text-black dark:text-zinc-50">
                  Giảm 90% thời gian xử lý tranh chấp
                </h3>
                <p className="mt-2 text-base leading-7 text-zinc-700 dark:text-zinc-300">
                  Chỉ cần gửi cho khách hàng link video đóng gói tìm được theo mã
                  vận đơn là phần lớn khiếu nại được đóng ngay.
                </p>
              </li>
              <li className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
                <h3 className="text-lg font-semibold text-black dark:text-zinc-50">
                  Con người có thể quên, video thì không
                </h3>
                <p className="mt-2 text-base leading-7 text-zinc-700 dark:text-zinc-300">
                  Chỉ một lần quét mã vạch, video đóng gói tự động bắt đầu và kết
                  thúc, nên không bỏ sót ngay cả trong giờ xuất hàng cao điểm.
                </p>
              </li>
              <li className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
                <h3 className="text-lg font-semibold text-black dark:text-zinc-50">
                  Tìm trong 3 giây — điều CCTV không làm được
                </h3>
                <p className="mt-2 text-base leading-7 text-zinc-700 dark:text-zinc-300">
                  CCTV chỉ tìm được theo khung giờ, còn video đóng gói Zeropacking
                  được lập chỉ mục theo mã vận đơn và hiện ra video của đúng đơn
                  hàng trong khoảng 3 giây.
                </p>
              </li>
              <li className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
                <h3 className="text-lg font-semibold text-black dark:text-zinc-50">
                  Giảm chi phí trả hàng và hoàn tiền
                </h3>
                <p className="mt-2 text-base leading-7 text-zinc-700 dark:text-zinc-300">
                  Người bán dùng video đóng gói cho biết chi phí trả hàng và hoàn
                  tiền do khiếu nại không chính đáng giảm trung bình trên 30%.
                </p>
              </li>
            </ul>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
              Ghi video đóng gói tự động hoạt động thế nào
            </h2>
            <ol className="mt-6 grid gap-5 sm:grid-cols-2">
              {[
                {
                  n: 1 as const,
                  title: "Quét mã vạch để bắt đầu ghi",
                  desc: "Quét mã vận đơn hoặc mã đơn hàng ngay trước khi xuất hàng, video đóng gói sẽ tự động bắt đầu ghi.",
                },
                {
                  n: 2 as const,
                  title: "Ghi quá trình đóng gói ở chất lượng HD",
                  desc: "Toàn bộ quá trình kiểm hàng, đóng hộp, dán vận đơn được ghi lại thành video đóng gói chất lượng HD.",
                },
                {
                  n: 3 as const,
                  title: "Tự động lập chỉ mục lên đám mây theo mã vận đơn",
                  desc: "Video đóng gói hoàn tất được lưu trên đám mây kèm mã vận đơn, ai cũng có thể tìm và chia sẻ tức thì.",
                },
                {
                  n: 4 as const,
                  title: "Khi có khiếu nại chỉ cần gửi một link video",
                  desc: "Khi xảy ra tranh chấp, chỉ cần gửi link video đóng gói của mã vận đơn đó là phần lớn khiếu nại được đóng.",
                },
              ].map((s) => (
                <li
                  key={s.n}
                  className="flex flex-col gap-3 rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-black text-sm font-semibold text-white dark:bg-white dark:text-black">
                      {s.n}
                    </span>
                    <h3 className="text-base font-semibold text-black dark:text-zinc-50">
                      {s.title}
                    </h3>
                  </div>
                  <div className="h-32 rounded-lg bg-zinc-50 p-3 dark:bg-zinc-950">
                    <StepIllustration step={s.n} />
                  </div>
                  <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                    {s.desc}
                  </p>
                </li>
              ))}
            </ol>

            <figure className="mt-10">
              <ImagePlaceholder
                label="Minh họa màn hình tìm kiếm video đóng gói (khuyến nghị 1200×750)"
                ratio="16/10"
              />
              <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                Màn hình minh họa — nhập mã vận đơn là video đóng gói tương ứng
                phát ngay lập tức.
              </figcaption>
            </figure>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
              Câu hỏi thường gặp về video đóng gói
            </h2>
            <div className="mt-6 divide-y divide-zinc-200 dark:divide-zinc-800">
              {FAQ.map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-black dark:text-zinc-50">
                    {item.q}
                    <span className="text-zinc-400 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-base leading-7 text-zinc-700 dark:text-zinc-300">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          <ConversionCTA locale="vi" title="Bắt đầu dùng video đóng gói ngay hôm nay" />
        </main>
      </div>
    </>
  );
}
