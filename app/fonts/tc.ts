import { Noto_Sans_TC } from "next/font/google";

// 번체 중국어(대만) 본문 글꼴.
export const sans = Noto_Sans_TC({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
