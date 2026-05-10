export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function buildBreadcrumb(
  siteUrl: string,
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${siteUrl}${it.path}`,
    })),
  };
}

export function buildArticle(args: {
  siteUrl: string;
  path: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: { "@type": "WebPage", "@id": `${args.siteUrl}${args.path}` },
    headline: args.headline,
    description: args.description,
    inLanguage: "ko-KR",
    datePublished: args.datePublished,
    dateModified: args.dateModified,
    author: { "@type": "Organization", name: "제로패킹" },
    publisher: {
      "@type": "Organization",
      name: "제로패킹",
      logo: { "@type": "ImageObject", url: `${args.siteUrl}/logo.png` },
    },
  };
}

export function buildFAQ(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
