import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "包裝錄影導入指南 | Hansheet",
    template: "%s | Hansheet 包裝錄影",
  },
};

export default function TraditionalChineseLayout({ children }: { children: React.ReactNode }) {
  return <div lang="zh-TW">{children}</div>;
}
