import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Hướng dẫn video đóng gói | Hansheet",
    template: "%s | Hansheet Video đóng gói",
  },
};

export default function VietnameseLayout({ children }: { children: React.ReactNode }) {
  return <div lang="vi">{children}</div>;
}
