import type { Metadata, Viewport } from "next";
import { Geist_Mono, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "./site";
import { Nav, Footer } from "./components/Nav";

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
    default: "포장영상 자동 촬영 서비스 | 제로패킹 - 택배 클레임 분쟁 해결",
    template: "%s | 제로패킹 포장영상",
  },
  description:
    "포장영상을 자동으로 촬영하고 클라우드에 보관합니다. 운송장 번호로 즉시 검색되는 택배 포장영상으로 클레임 분쟁을 한 번에 해결하세요. 월 30,000원, 15일 무료체험.",
  keywords: [
    "포장영상",
    "택배 포장영상",
    "포장 영상 자동 촬영",
    "포장영상 클라우드",
    "택배 클레임 영상",
    "운송장 포장영상",
    "택배 분쟁 해결",
    "포장 동영상",
    "제로패킹",
    "zeropacking",
  ],
  authors: [{ name: "제로패킹" }],
  creator: "제로패킹",
  publisher: "제로패킹",
  applicationName: "제로패킹 포장영상",
  category: "물류 솔루션",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: "제로패킹 포장영상",
    title: "포장영상 자동 촬영 서비스 | 제로패킹",
    description:
      "택배 포장영상을 자동으로 촬영·보관하여 운송장 번호로 즉시 검색합니다. 클레임 분쟁을 영상 한 편으로 해결하세요.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "제로패킹 포장영상 - 택배 포장 자동 촬영 클라우드 서비스",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "포장영상 자동 촬영 서비스 | 제로패킹",
    description:
      "택배 포장영상을 자동으로 촬영·보관하여 운송장 번호로 즉시 검색합니다.",
    images: ["/og-image.png"],
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
        <Nav />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
