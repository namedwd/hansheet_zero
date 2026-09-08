import type { Metadata, Viewport } from "next";
import { Geist_Mono, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "./site";
import { Nav, Footer } from "./components/Nav";
import { InquiryBar } from "./components/InquiryBar";
import { HtmlLangSync } from "./components/HtmlLangSync";

// 한국어 본문 폰트 — Noto Sans KR
// 한국어 가독성과 검색엔진 친화도를 위해 라틴+한글 모두 지원하는 폰트로 통일.
const notoSansKR = Noto_Sans_KR({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "한시트 - 포장영상 자동 촬영 가이드 | 택배 클레임 해결",
    template: "%s | 한시트 포장영상",
  },
  description:
    "한시트는 제로패킹이 운영하는 포장영상 가이드입니다. 자동 촬영, 클라우드 보관, 운송장 검색부터 촬영 방식 비교와 업종별 활용 방법까지 안내합니다.",
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
  authors: [{ name: "한시트" }],
  creator: "한시트",
  publisher: "한시트",
  applicationName: "한시트",
  category: "물류 솔루션",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: "한시트",
    title: "한시트 - 포장영상 자동 촬영 가이드",
    description:
      "택배 포장영상 자동 촬영·보관·운송장 검색과 출고 기록 활용 방법을 확인하세요.",
    images: [
      {
        url: "/packing-video-hero.webp",
        width: 1672,
        height: 941,
        alt: "한시트 - 포장영상 자동 촬영 가이드 사이트",
      },
    ],
  },
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

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${notoSansKR.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <HtmlLangSync />
        <header className="sticky top-0 z-30">
          <InquiryBar />
          <Nav />
        </header>
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
