import type { Metadata } from "next";
import { SITE_URL, SERVICE_URL } from "../site";
import { StepIllustration, ImagePlaceholder } from "../components/Illustrations";
import { ConversionCTA } from "../components/ConversionCTA";
import { languageAlternates, localePath } from "../i18n";

export const metadata: Metadata = {
  title: {
    absolute: "Hansheet — Automatic packing video that ends parcel claim disputes",
  },
  description:
    "A packing video records the moment each parcel is packed and shipped. Zeropacking, recommended by Hansheet, auto-records every packing video and lets you find any order instantly by tracking number — settling damage, wrong-item and lost-package claims with a single clip. From ₩30,000/month, 15-day free trial.",
  alternates: {
    canonical: localePath("en", "/"),
    languages: languageAlternates("/", ["ko", "en"]),
  },
  openGraph: {
    title: "Automatic packing video service — settle claim disputes | Zeropacking",
    description:
      "Auto-record and cloud-store every parcel packing video. Find any order instantly by tracking number and close claims fast.",
    url: localePath("en", "/"),
    type: "website",
  },
};

const FAQ = [
  {
    q: "What is a packing video?",
    a: "A packing video records the packing process of an e-commerce or parcel order right before it ships. It captures which product went into the box, in what condition, all the way to the moment the shipping label is applied — so it works as objective evidence when a customer raises a claim.",
  },
  {
    q: "Why record packing videos automatically?",
    a: "Manual recording is easy to forget, and matching each clip to its tracking number for storage is a burden. An automatic packing-video service starts and stops recording with a single barcode scan, then indexes the clip by tracking number so you find it in about 3 seconds.",
  },
  {
    q: "How long are packing videos stored?",
    a: "Clips are stored securely in the cloud for 3 months by default. If you need longer retention we can arrange it on request, and videos are saved in HD quality.",
  },
  {
    q: "What kinds of claims can a packing video resolve?",
    a: "Missing items, wrong shipments, damage, size or color mismatches, and 'I received an empty box' claims — nearly every type of parcel dispute. Sharing the packing-video link with the customer settles most claims immediately.",
  },
  {
    q: "Does it integrate with our WMS/OMS?",
    a: "Yes. Zeropacking's packing video offers a standard API and barcode interface, integrating with Cafe24, Godomall, in-house WMS and most other systems.",
  },
  {
    q: "How much does it cost?",
    a: "₩30,000 per packing station per month (excl. VAT), with a 17% discount on annual billing. A 15-day free trial lets you decide before paying.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: "Hansheet",
      alternateName: ["한시트", "Zeropacking"],
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      description:
        "A guide for online sellers reducing parcel claims with packing video. Introduces operator Zeropacking's automatic packing-video SaaS.",
      contactPoint: {
        "@type": "ContactPoint",
        email: "contact@zeropacking.com",
        contactType: "customer service",
        areaServed: "KR",
        availableLanguage: ["Korean", "English"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      url: SITE_URL,
      name: "Hansheet",
      inLanguage: "en-US",
      publisher: { "@id": `${SITE_URL}#organization` },
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}#service-en`,
      serviceType: "Automatic packing-video recording and cloud storage",
      name: "Zeropacking Packing Video",
      provider: { "@id": `${SITE_URL}#organization` },
      areaServed: "KR",
      url: `${SERVICE_URL}/pricing`,
      description:
        "Automatically records packing videos and stores them in the cloud, searchable instantly by tracking number. A video-evidence solution for resolving parcel claims and disputes. ₩30,000 per packing station per month.",
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/en#faq`,
      mainEntity: FAQ.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export default function HomeEn() {
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
              Hansheet · Packing video guide
            </p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
              End parcel claim disputes
              <br />
              with automatic packing video
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              A packing video captures the exact packing process at the moment a
              parcel ships. Zeropacking, recommended by Hansheet, auto-records
              every packing video and stores it safely in the cloud — so a single
              tracking number pulls up the right clip instantly. Stop losing time
              to damage, wrong-shipment and missing-item disputes.
            </p>

            <figure className="mt-8 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
              <ImagePlaceholder
                label="Packing station camera → cloud → search by tracking number"
                ratio="16/9"
              />
              <figcaption className="border-t border-zinc-200 bg-white px-4 py-3 text-xs text-zinc-600 dark:border-zinc-800 dark:bg-black dark:text-zinc-400">
                A camera over the packing station auto-records each packing video,
                stores it in the cloud, and makes it searchable by tracking number.
              </figcaption>
            </figure>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={`${SERVICE_URL}/checkout`}
                className="flex h-12 items-center justify-center rounded-full bg-black px-7 text-base font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                Start free for 15 days
              </a>
              <a
                href={`${SERVICE_URL}/packing-video`}
                className="flex h-12 items-center justify-center rounded-full border border-zinc-200 px-7 text-base font-medium text-black transition-colors hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:text-white dark:hover:bg-zinc-900"
              >
                See how it works
              </a>
            </div>
          </header>

          <section className="mb-16 border-t border-zinc-200 pt-12 dark:border-zinc-800">
            <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
              What is a packing video?
            </h2>
            <div className="mt-5 space-y-4 text-base leading-7 text-zinc-700 dark:text-zinc-300">
              <p>
                A packing video is a recording of the full packing process — an
                online or parcel seller placing the product in the box and
                applying the shipping label. Unlike ordinary CCTV, a packing video
                is stored linked one-to-one with the tracking number, so when a
                dispute arises you can pull up that exact order&apos;s clip
                instantly.
              </p>
              <p>
                &quot;The box was empty,&quot; &quot;the wrong item arrived,&quot;
                &quot;it was damaged&quot; — these claims are among a seller&apos;s
                biggest costs. A packing video provides objective evidence from the
                moment of shipping for every one of them.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
              Why record packing videos automatically?
            </h2>
            <ul className="mt-6 space-y-5">
              <li className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
                <h3 className="text-lg font-semibold text-black dark:text-zinc-50">
                  90% less time spent on disputes
                </h3>
                <p className="mt-2 text-base leading-7 text-zinc-700 dark:text-zinc-300">
                  Just send the customer a packing-video link searchable by tracking
                  number, and most claims close immediately.
                </p>
              </li>
              <li className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
                <h3 className="text-lg font-semibold text-black dark:text-zinc-50">
                  People forget — the video doesn&apos;t
                </h3>
                <p className="mt-2 text-base leading-7 text-zinc-700 dark:text-zinc-300">
                  One barcode scan starts and stops the packing video automatically,
                  so nothing is missed even during your busiest shipping hours.
                </p>
              </li>
              <li className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
                <h3 className="text-lg font-semibold text-black dark:text-zinc-50">
                  Found in 3 seconds — what CCTV can&apos;t do
                </h3>
                <p className="mt-2 text-base leading-7 text-zinc-700 dark:text-zinc-300">
                  CCTV is searchable only by time window, but Zeropacking packing
                  videos are indexed by tracking number and surface the right
                  order&apos;s clip in about 3 seconds.
                </p>
              </li>
              <li className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
                <h3 className="text-lg font-semibold text-black dark:text-zinc-50">
                  Lower return and refund costs
                </h3>
                <p className="mt-2 text-base leading-7 text-zinc-700 dark:text-zinc-300">
                  Sellers using packing video report cutting return and refund costs
                  from unjustified claims by 30% or more on average.
                </p>
              </li>
            </ul>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
              How automatic packing video works
            </h2>
            <ol className="mt-6 grid gap-5 sm:grid-cols-2">
              {[
                {
                  n: 1 as const,
                  title: "Scan a barcode to start recording",
                  desc: "Scan the tracking or order barcode right before shipping and the packing video starts recording automatically.",
                },
                {
                  n: 2 as const,
                  title: "Record the packing process in HD",
                  desc: "Item inspection, boxing and label application are all captured as an HD packing video.",
                },
                {
                  n: 3 as const,
                  title: "Auto-index to the cloud by tracking number",
                  desc: "The finished clip is stored in the cloud with its tracking number so anyone can search and share it instantly.",
                },
                {
                  n: 4 as const,
                  title: "Send one link when a claim arrives",
                  desc: "When a dispute comes up, sending that tracking number's packing-video link by message closes most claims.",
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
                label="Actual packing-video search screen (1200×750 recommended)"
                ratio="16/10"
              />
              <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                The real search screen — enter a tracking number and the matching
                packing video plays right away.
              </figcaption>
            </figure>
          </section>

          <section className="mb-16 rounded-3xl bg-zinc-50 p-8 dark:bg-zinc-950 sm:p-10">
            <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
              Packing video pricing
            </h2>
            <p className="mt-3 text-base leading-7 text-zinc-700 dark:text-zinc-300">
              <strong>₩30,000</strong> per packing station per month (excl. VAT) ·
              17% off on annual billing · 15-day free trial.
              <br />
              Includes 3-month cloud retention, 30GB storage, HD quality and
              video-link sharing.
            </p>
            <div className="mt-6">
              <a
                href={`${SERVICE_URL}/pricing`}
                className="inline-flex h-11 items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                See full pricing
              </a>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
              Frequently asked questions
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

          <ConversionCTA locale="en" title="Start using packing video today" />
        </main>
      </div>
    </>
  );
}
