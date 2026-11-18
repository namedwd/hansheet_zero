import { Noto_Sans_KR } from "next/font/google";

// 한국어 본문 글꼴. 영어·베트남어 페이지도 이 글꼴의 라틴 글자를 씁니다.
// 글꼴마다 파일을 나눈 이유: 한 파일에 모으면 모든 언어 페이지가 세 글꼴을 다 받습니다.
export const sans = Noto_Sans_KR({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
