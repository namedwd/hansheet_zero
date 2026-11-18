import { Noto_Sans_JP } from "next/font/google";

// 일본어 본문 글꼴. 한국어 글꼴로 일본어를 그리면 한자 모양이 한국식으로 나오고,
// 한국어 글꼴에 없는 한자는 다른 글꼴로 섞여 보입니다.
export const sans = Noto_Sans_JP({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
