import "../globals.css";
import { sans } from "../fonts/kr";
import { mono } from "../fonts/mono";
import { HTML_LANG, SiteBody, siteMetadata, siteViewport } from "../siteShell";

// "ko" 페이지의 루트 레이아웃. 공통 내용은 app/siteShell.tsx 에 있습니다.
export const metadata = siteMetadata("ko");
export const viewport = siteViewport;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={HTML_LANG["ko"]} className={`${sans.variable} ${mono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SiteBody>{children}</SiteBody>
      </body>
    </html>
  );
}
