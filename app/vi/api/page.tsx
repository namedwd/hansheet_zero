import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "../../site";
import { ImagePlaceholder } from "../../components/Illustrations";
import { JsonLd, buildBreadcrumb, buildArticle } from "../../components/JsonLd";
import { ConversionCTA } from "../../components/ConversionCTA";
import { languageAlternates, localePath } from "../../i18n";

const PATH = "/api";

export const metadata: Metadata = {
  title: "API video đóng gói · Tích hợp WMS - Tương thích Shopify, Haravan, Sapo, hệ thống riêng",
  description:
    "Cách tích hợp video đóng gói với hệ thống WMS·OMS·thương mại điện tử hiện có. API REST chuẩn và giao diện mã vạch hỗ trợ Shopify·Haravan·Sapo·hệ thống tự phát triển.",
  alternates: {
    canonical: localePath("vi", PATH),
    languages: languageAlternates(PATH, ["ko", "ja", "zh-tw", "vi"]),
  },
  openGraph: {
    title: "API video đóng gói · Hướng dẫn tích hợp WMS",
    description:
      "Tích hợp video đóng gói vào WMS·OMS·thương mại điện tử hiện có bằng API REST chuẩn. Tự động khớp mã vận đơn và gửi liên kết video tự động.",
    url: localePath("vi", PATH),
    locale: "vi_VN",
  },
};

const ENDPOINTS = [
  {
    method: "POST",
    path: "/v1/recordings",
    desc: "Yêu cầu bắt đầu quay video đóng gói kèm mã vận đơn. Dùng khi kích hoạt trực tiếp từ hệ thống thay vì máy quét mã vạch.",
  },
  {
    method: "GET",
    path: "/v1/recordings/{trackingNo}",
    desc: "Truy vấn metadata video đóng gói (URL, thời lượng, thời điểm quay) theo mã vận đơn.",
  },
  {
    method: "GET",
    path: "/v1/recordings/{trackingNo}/share-link",
    desc: "Tạo liên kết video đóng gói để chia sẻ với khách hàng (có thể đặt thời hạn hết hạn).",
  },
  {
    method: "POST",
    path: "/v1/webhooks",
    desc: "Đẩy các sự kiện hoàn tất quay·hoàn tất tải lên video đóng gói về hệ thống của người dùng.",
  },
];

const INTEGRATIONS = [
  { name: "Shopify", desc: "Tự động khớp mã vận đơn khi gửi đơn, tự động ghi liên kết video vào ghi chú" },
  { name: "Haravan", desc: "Kích hoạt tại thời điểm hoàn tất giao hàng trong quản lý đơn để lập chỉ mục video" },
  { name: "Sapo", desc: "Đồng bộ khi đăng ký mã vận đơn qua API chuẩn của nền tảng" },
  { name: "Shopee", desc: "Tự động ánh xạ mã vận đơn sau khi gửi hàng loạt bằng Excel" },
  { name: "WMS riêng", desc: "Tích hợp với bất kỳ hệ thống nào bằng REST API + Webhook" },
  { name: "ERP (SAP, v.v.)", desc: "Kết nối trigger hoàn tất giao hàng vào ERP, liên kết với chốt sổ kế toán" },
];

const FAQ = [
  {
    q: "Việc gọi API có tính phí riêng không?",
    a: "Việc sử dụng API·Webhook đã bao gồm trong gói cước duy nhất (30.000 won/tháng/bàn đóng gói), nên với quy mô cửa hàng thông thường sẽ không phát sinh chi phí thêm. Với quy mô doanh nghiệp có lượng gọi rất lớn, vui lòng liên hệ riêng để được tư vấn.",
  },
  {
    q: "Tích hợp API cần bao nhiêu nhân lực phát triển?",
    a: "Vì là chuẩn REST API, một lập trình viên backend có thể hoàn tất tích hợp cơ bản trong 0,5~1 ngày. Các nền tảng chính như Shopify·Haravan có tài liệu hướng dẫn riêng.",
  },
  {
    q: "Có thể nhận những sự kiện nào qua Webhook?",
    a: "Bạn có thể nhận đẩy qua Webhook các sự kiện vòng đời chính như bắt đầu quay, hoàn tất quay, hoàn tất tải lên đám mây, phát sinh lượt xem video.",
  },
];

export default function ApiPage() {
  const today = "2026-06-14T00:00:00.000Z";
  return (
    <>
      <JsonLd
        data={buildBreadcrumb(SITE_URL, [
          { name: "Trang chủ", path: localePath("vi", "/") },
          { name: "API · Tích hợp WMS", path: PATH },
        ])}
      />
      <JsonLd
        data={buildArticle({
          siteUrl: SITE_URL,
          path: PATH,
          headline: "API video đóng gói · Tích hợp WMS",
          description:
            "Hướng dẫn tích hợp video đóng gói vào Shopify·Haravan·WMS riêng bằng API REST chuẩn.",
          datePublished: today,
          dateModified: today,
        })}
      />

      <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-10 sm:py-24">
        <nav aria-label="Vị trí hiện tại" className="mb-6 text-sm text-zinc-500">
          <Link href={localePath("vi", "/")} className="hover:text-black dark:hover:text-white">Trang chủ</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-700 dark:text-zinc-300">API · Tích hợp WMS</span>
        </nav>

        <header className="mb-12">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-zinc-500">
            Lập trình viên · Tích hợp hệ thống
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
            API video đóng gói
            <br />
            <span className="text-zinc-500">Gắn thẳng vào hệ thống hiện có</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            Zeropacking cung cấp API REST chuẩn và giao diện mã vạch, nên có thể
            tích hợp với mọi hệ thống — từ Shopify·Haravan·Sapo·Shopee cho đến
            WMS tự phát triển. Tự động khớp mã vận đơn, tự động gửi liên kết
            video, đăng ký nhận sự kiện Webhook — tất cả đều khả thi.
          </p>
        </header>

        <section className="mb-14">
          <figure>
            <ImagePlaceholder
              label="Sơ đồ tích hợp API (WMS ↔ video đóng gói ↔ đám mây)"
              ratio="16/9"
            />
            <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              Sơ đồ tích hợp hệ thống (sẽ bổ sung ví dụ thực tế)
            </figcaption>
          </figure>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            Endpoint cốt lõi
          </h2>
          <ul className="mt-6 space-y-3">
            {ENDPOINTS.map((e) => (
              <li
                key={e.path}
                className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded px-2 py-0.5 font-mono text-xs font-bold ${
                      e.method === "GET"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                        : "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                    }`}
                  >
                    {e.method}
                  </span>
                  <code className="font-mono text-sm text-black dark:text-white">{e.path}</code>
                </div>
                <p className="mt-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">{e.desc}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            Ví dụ — Truy vấn video theo mã vận đơn
          </h2>
          <pre className="mt-6 overflow-x-auto rounded-2xl bg-zinc-900 p-5 text-sm text-zinc-100">
            <code>{`curl -H "Authorization: Bearer YOUR_TOKEN" \\
  https://api.zeropacking.com/v1/recordings/1234567890

{
  "trackingNo": "1234567890",
  "recordedAt": "2026-05-10T14:23:11+09:00",
  "duration": 47,
  "url": "https://cdn.zeropacking.com/v/abc123",
  "shareLink": "https://zeropacking.com/v/abc123",
  "thumbnail": "https://cdn.zeropacking.com/t/abc123.jpg"
}`}</code>
          </pre>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            Hệ thống được hỗ trợ
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {INTEGRATIONS.map((i) => (
              <li key={i.name} className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800">
                <h3 className="text-base font-semibold text-black dark:text-zinc-50">{i.name}</h3>
                <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{i.desc}</p>
              </li>
            ))}
          </ul>
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

        <ConversionCTA locale="vi" title="Tích hợp hệ thống hiện có, chúng tôi tư vấn 1:1" description="Tích hợp được với mọi hệ thống như Shopify·Haravan·WMS riêng. Để lại yêu cầu tư vấn để nhận phương án tích hợp phù hợp với hệ thống của bạn." />

        <nav aria-label="Bài viết liên quan" className="mt-14 grid gap-3 sm:grid-cols-2">
          <Link href={localePath("vi", "/guide")} className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">Bài viết liên quan</span>
            <p className="mt-1 font-semibold text-black dark:text-white">Hướng dẫn triển khai video đóng gói</p>
          </Link>
          <Link href={localePath("vi", "/pricing")} className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">Bài viết liên quan</span>
            <p className="mt-1 font-semibold text-black dark:text-white">Bảng giá video đóng gói</p>
          </Link>
        </nav>
      </main>
    </>
  );
}
