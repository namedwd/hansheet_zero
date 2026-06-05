import type { Metadata } from "next";
import { OG_LOCALE } from "../i18n";

// 영어 하위 트리(/en/**)의 기본 메타데이터. <html>/<body>는 루트 레이아웃이 렌더링하고,
// 여기서는 영어 기본 제목·설명·OG locale만 덮어씁니다.
export const metadata: Metadata = {
  title: {
    default: "Hansheet — Automatic packing video that ends parcel claim disputes",
    template: "%s | Hansheet Packing Video",
  },
  description:
    "Hansheet is a guide for online sellers who cut parcel claims with packing video. Auto-record every package, store it in the cloud, and find any order instantly by tracking number.",
  openGraph: {
    locale: OG_LOCALE.en,
    siteName: "Hansheet",
  },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  // lang="en"으로 영어 콘텐츠 영역을 표시 (스크린리더·번역 도구 힌트).
  return <div lang="en">{children}</div>;
}
