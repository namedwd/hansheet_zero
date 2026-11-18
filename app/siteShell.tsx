import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL } from "./site";
import { OG_LOCALE, type Locale } from "./i18n";
import { Nav, Footer } from "./components/Nav";
import { InquiryBar } from "./components/InquiryBar";

// 언어마다 루트 레이아웃이 따로 있습니다: app/(ko), app/(en), app/(ja), app/(zh-tw), app/(vi).
// 그래야 서버가 보내는 HTML부터 <html lang>과 글꼴이 그 언어에 맞습니다.
// (예전에는 전부 lang="ko" + 한국어 글꼴로 나간 뒤 브라우저에서 고쳤습니다.)
// 이 파일은 그 레이아웃들이 함께 쓰는 것만 모아 둡니다.

// <html lang> 값.
export const HTML_LANG: Record<Locale, string> = {
  ko: "ko",
  en: "en",
  ja: "ja",
  "zh-tw": "zh-TW",
  vi: "vi",
};

// 외국어 페이지의 기본 메타데이터에 한글이 남지 않도록 언어별로 둡니다.
// 각 페이지가 제목·설명·OG를 따로 정하면 그 값이 우선합니다.
const BRAND: Record<Locale, { name: string; category: string; description: string }> = {
  ko: {
    name: "한시트",
    category: "물류 솔루션",
    description:
      "한시트는 제로패킹이 운영하는 포장영상 가이드입니다. 자동 촬영, 클라우드 보관, 운송장 검색부터 촬영 방식 비교와 업종별 활용 방법까지 안내합니다.",
  },
  en: {
    name: "Hansheet",
    category: "Logistics",
    description:
      "Hansheet is a guide for online sellers who cut parcel claims with packing video. Auto-record every package, store it in the cloud, and find any order instantly by tracking number.",
  },
  ja: {
    name: "ハンシート",
    category: "物流ソリューション",
    description: "ハンシートは、ゼロパッキングが運営する梱包動画のガイドサイトです。自動撮影、クラウド保管、番号での検索から導入方法までご案内します。",
  },
  "zh-tw": {
    name: "Hansheet",
    category: "物流解決方案",
    description: "Hansheet 是由 Zeropacking 營運的包裝影片指南網站，從自動錄影、雲端保存、單號搜尋到導入方式一次說明。",
  },
  vi: {
    name: "Hansheet",
    category: "Giải pháp logistics",
    description: "Hansheet là trang hướng dẫn về video đóng gói do Zeropacking vận hành: tự động quay, lưu trên đám mây, tìm theo mã và cách triển khai.",
  },
};

const SHARED: Metadata = {
  metadataBase: new URL(SITE_URL),
  twitter: {
    card: "summary_large_image",
    images: ["/packing-video-hero.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "TxP6lqDsuskNqy3mznQc4J17LQDEyGfXCLsUekyA0Ik",
    other: {
      "naver-site-verification": "48719cac8e8a9a4b8c6a4ead613dde88c31ca73f",
    },
  },
};

export function siteMetadata(locale: Locale): Metadata {
  const brand = BRAND[locale];
  const base: Metadata = {
    ...SHARED,
    description: brand.description,
    authors: [{ name: brand.name }],
    creator: brand.name,
    publisher: brand.name,
    applicationName: brand.name,
    category: brand.category,
  };
  if (locale !== "ko") {
    return {
      ...base,
      openGraph: {
        type: "website",
        locale: OG_LOCALE[locale],
        siteName: brand.name,
        images: [{ url: "/packing-video-hero.webp", width: 1672, height: 941, alt: brand.name }],
      },
    };
  }
  return {
    ...base,
    title: {
      default: "한시트 - 포장영상 자동 촬영 가이드 | 택배 클레임 해결",
      template: "%s | 한시트 포장영상",
    },
    keywords: [
      "포장영상",
      "한시트",
      "hansheet",
      "택배 포장영상",
      "포장 영상 자동 촬영",
      "포장영상 클라우드",
      "택배 클레임 영상",
      "운송장 포장영상",
      "택배 분쟁 해결",
      "포장 동영상",
      "제로패킹",
    ],
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "ko_KR",
      url: SITE_URL,
      siteName: "한시트",
      title: "한시트 - 포장영상 자동 촬영 가이드",
      description: "택배 포장영상 자동 촬영·보관·운송장 검색과 출고 기록 활용 방법을 확인하세요.",
      images: [
        {
          url: "/packing-video-hero.webp",
          width: 1672,
          height: 941,
          alt: "한시트 - 포장영상 자동 촬영 가이드 사이트",
        },
      ],
    },
  };
}

export const siteViewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

// <body> 안쪽: 상단 문의 바 · 메뉴 · 본문 · 푸터 · 방문 집계.
export function SiteBody({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-30">
        <InquiryBar />
        <Nav />
      </header>
      <div className="flex-1">{children}</div>
      <Footer />
      {/* Vercel Web Analytics — 방문 수 집계(쿠키 없음). */}
      <Analytics />
    </>
  );
}
